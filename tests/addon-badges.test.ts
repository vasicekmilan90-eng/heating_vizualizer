import { describe, expect, it } from "vitest";
import { badgeAddons, hideableOnSchema, layoutBadges } from "../src/renderer/devices/addon-badges.js";
import type { ResolvedAddon } from "../src/renderer/devices/common.js";
import type { AddonType } from "../src/models/addons.js";

const addon = (type: AddonType, value = "42 °C", entity = true): ResolvedAddon => ({
  config: { type, entity_id: entity ? `sensor.${type}` : undefined },
  state: { active: false, value },
});

describe("add-on badges", () => {
  it("skips add-ons drawn by the device, without entity, or without drawing", () => {
    const addons = [
      addon("temperature"),
      addon("defrost"),
      addon("pump", "on"),
      addon("alarm", "off", false),
      { config: { type: "heat_exchanger" as const }, state: { active: false } },
    ];
    expect(badgeAddons("heat_pump", addons).map((a) => a.config.type)).toEqual(["pump"]);
    expect(badgeAddons("radiator", addons).map((a) => a.config.type)).toEqual(["temperature", "defrost", "pump"]);
  });

  it("leaves out add-ons hidden in the schema", () => {
    const hidden = { ...addon("pump", "on"), config: { type: "pump" as const, entity_id: "switch.p", hidden: true } };
    expect(badgeAddons("heat_pump", [hidden, addon("setpoint")]).map((a) => a.config.type)).toEqual(["setpoint"]);
  });

  it("offers hiding only where the add-on is shown as a badge or a heat pump value", () => {
    expect(hideableOnSchema("heat_pump", "value")).toBe(true);
    expect(hideableOnSchema("heat_pump", "pump")).toBe(true);
    expect(hideableOnSchema("heat_pump", "fan")).toBe(false);
    expect(hideableOnSchema("tank", "temperature")).toBe(false);
    expect(hideableOnSchema("tank", "dhw")).toBe(false);
  });

  it("wraps badges into rows within the device width", () => {
    const { boxes, height } = layoutBadges([addon("temperature"), addon("setpoint"), addon("value")], 120);
    expect(boxes[0].y).toBe(0);
    expect(boxes.some((b) => b.y > 0)).toBe(true);
    expect(boxes.every((b) => b.x + b.width <= 120 || b.x === 0)).toBe(true);
    expect(height).toBeGreaterThan(18);
  });

  it("shows binary add-ons as icons only", () => {
    const { boxes } = layoutBadges([addon("pump", "on")], 120);
    expect(boxes[0].text).toBeUndefined();
  });
});
