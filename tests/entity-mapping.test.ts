import { describe, expect, it } from "vitest";
import { guessAddonType, guessDeviceType, suggestAddons } from "../src/models/entity-mapping.js";
import type { HassEntity, HomeAssistant } from "../src/types/home-assistant.js";

function entity(entity_id: string, state: string, attributes: Record<string, unknown> = {}): HassEntity {
  return { entity_id, state, attributes, last_changed: "", last_updated: "" };
}

describe("guessDeviceType", () => {
  it("uses keywords before domain defaults", () => {
    expect(guessDeviceType(entity("climate.tepelne_cerpadlo", "heat"))).toBe("heat_pump");
    expect(guessDeviceType(entity("climate.obyvak", "heat"))).toBe("radiator");
    expect(guessDeviceType(entity("water_heater.x", "eco"))).toBe("tank_dhw");
    expect(guessDeviceType(entity("sensor.p", "1.5", { device_class: "pressure" }))).toBe("pipe_sensor");
    expect(guessDeviceType(entity("light.kitchen", "on"))).toBeUndefined();
  });

  it("ignores diacritics in the friendly name", () => {
    expect(guessDeviceType(entity("switch.x", "on", { friendly_name: "Oběhové čerpadlo" }))).toBe("circulation_pump");
  });
});

describe("guessAddonType", () => {
  it("recognises common add-on entities", () => {
    expect(guessAddonType(entity("binary_sensor.hp_defrost", "off"))).toBe("defrost");
    expect(guessAddonType(entity("binary_sensor.hp_fault", "off", { device_class: "problem" }))).toBe("alarm");
    expect(guessAddonType(entity("select.hp_mode", "auto"))).toBe("mode");
    expect(guessAddonType(entity("sensor.t", "40", { device_class: "temperature" }))).toBe("temperature");
    expect(guessAddonType(entity("sensor.power", "1200"))).toBe("value");
  });
});

describe("suggestAddons", () => {
  const states = [
    entity("climate.hp", "heat"),
    entity("sensor.hp_vratka", "30", { device_class: "temperature" }),
    entity("sensor.hp_outdoor", "5", { device_class: "temperature" }),
    entity("binary_sensor.hp_defrost", "off"),
    entity("sensor.other_device", "1", { device_class: "temperature" }),
  ];
  const hass = {
    states: Object.fromEntries(states.map((s) => [s.entity_id, s])),
    entities: Object.fromEntries(
      states.map((s) => [s.entity_id, { entity_id: s.entity_id, device_id: s.entity_id.includes("other") ? "d2" : "d1" }])
    ),
  } as unknown as HomeAssistant;

  it("suggests entities of the same device with matching slots", () => {
    const node = { id: "hp", type: "heat_pump", position: { x: 0, y: 0 }, entity_id: "climate.hp" };
    expect(suggestAddons(hass, node)).toEqual([
      { type: "defrost", entity_id: "binary_sensor.hp_defrost" },
      { type: "temperature", entity_id: "sensor.hp_outdoor", slot: "outdoor" },
      { type: "temperature", entity_id: "sensor.hp_vratka", slot: "return" },
    ]);
  });

  it("skips bound entities and devices without a main entity", () => {
    const node = {
      id: "hp",
      type: "heat_pump",
      position: { x: 0, y: 0 },
      entity_id: "climate.hp",
      addons: [{ type: "defrost" as const, entity_id: "binary_sensor.hp_defrost" }],
    };
    expect(suggestAddons(hass, node).map((a) => a.entity_id)).not.toContain("binary_sensor.hp_defrost");
    expect(suggestAddons(hass, { id: "x", type: "heat_pump", position: { x: 0, y: 0 } })).toEqual([]);
  });

  it("splits one HA device between the heat pump and its DHW tank", () => {
    const shared = [
      entity("sensor.midea_outdoor_temperature", "5", { device_class: "temperature" }),
      entity("sensor.midea_dhw_tank_temperature", "48", { device_class: "temperature" }),
      entity("switch.midea_dhw_backup_heater", "off"),
    ];
    const sharedHass = {
      states: Object.fromEntries(shared.map((s) => [s.entity_id, s])),
      entities: Object.fromEntries(shared.map((s) => [s.entity_id, { entity_id: s.entity_id, device_id: "midea" }])),
      devices: { midea: { id: "midea", name: "Midea heat pump" } },
    } as unknown as HomeAssistant;
    const at = { x: 0, y: 0 };

    const pump = suggestAddons(sharedHass, { id: "hp", type: "heat_pump", position: at, device_id: "midea" });
    expect(pump.map((a) => a.entity_id)).toEqual(["sensor.midea_outdoor_temperature"]);

    const dhwTank = {
      id: "dhw",
      type: "tank",
      position: at,
      device_id: "midea",
      addons: [{ type: "heat_exchanger" as const }, { type: "dhw" as const }],
    };
    const tank = suggestAddons(sharedHass, dhwTank);
    expect(tank).toEqual([
      { type: "temperature", entity_id: "sensor.midea_dhw_tank_temperature", slot: "top" },
      { type: "electric_heater", entity_id: "switch.midea_dhw_backup_heater" },
    ]);

    const taken = new Set(["sensor.midea_dhw_tank_temperature"]);
    expect(suggestAddons(sharedHass, dhwTank, taken)).toHaveLength(1);

    // A buffer tank on the same HA device does not get the DHW sensors.
    const buffer = { ...dhwTank, id: "buf", addons: [{ type: "direct_source" as const }] };
    expect(suggestAddons(sharedHass, buffer)).toEqual([]);
  });
});
