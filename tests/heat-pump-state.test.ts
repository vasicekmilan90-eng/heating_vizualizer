import { describe, expect, it } from "vitest";
import { heatPumpFan, heatPumpPerformance, heatPumpState, operationFromText } from "../src/renderer/devices/heat-pump-state.js";
import { outdoorUnitRows } from "../src/renderer/devices/heat-pump.js";
import { createTranslator } from "../src/i18n/index.js";
import type { ResolvedAddon } from "../src/renderer/devices/common.js";
import type { AddonConfig } from "../src/models/schema.js";
import type { NodeVisualState } from "../src/utils/entity.js";

function addon(config: Partial<AddonConfig> & Pick<AddonConfig, "type">, state: Partial<NodeVisualState>): ResolvedAddon {
  return { config: { entity_id: `sensor.${config.type}`, ...config }, state: { active: false, ...state } };
}

describe("operationFromText", () => {
  it("reads status texts in several languages", () => {
    expect(operationFromText("Heating")).toBe("heating");
    expect(operationFromText("DHW")).toBe("dhw");
    expect(operationFromText("Ohřev TUV")).toBe("dhw");
    expect(operationFromText("Odmrazování")).toBe("defrost");
    expect(operationFromText("cooling")).toBe("cooling");
    expect(operationFromText("Stojí")).toBe("idle");
    expect(operationFromText("42")).toBeUndefined();
  });

  it("prefers hot water over heating in a mixed text", () => {
    expect(operationFromText("water_heating")).toBe("dhw");
  });
});

describe("heatPumpState", () => {
  const off: NodeVisualState = { active: false };
  const on: NodeVisualState = { active: true };

  it("falls back to the state entity when nothing more specific is bound", () => {
    expect(heatPumpState(on, [], true)).toEqual({ running: true, operation: undefined });
    expect(heatPumpState(off, [], true)).toEqual({ running: false, operation: undefined });
  });

  it("lets the compressor decide whether the unit runs", () => {
    const compressor = addon({ type: "compressor" }, { active: false, numeric: 0 });
    expect(heatPumpState(on, [compressor], true).running).toBe(false);
  });

  it("orders operations: defrost > hot water > heating", () => {
    const heating = addon({ type: "operation", slot: "heating" }, { active: true });
    const dhw = addon({ type: "operation", slot: "dhw" }, { active: true });
    const defrost = addon({ type: "defrost" }, { active: true });
    expect(heatPumpState(off, [heating], true)).toEqual({ running: true, operation: "heating" });
    expect(heatPumpState(off, [heating, dhw], true).operation).toBe("dhw");
    expect(heatPumpState(off, [heating, dhw, defrost], true).operation).toBe("defrost");
  });

  it("is idle when status entities report no mode", () => {
    const heating = addon({ type: "operation", slot: "heating" }, { active: false });
    expect(heatPumpState(on, [heating], true)).toEqual({ running: false, operation: "idle" });
  });

  it("reads a status text and a climate hvac_action", () => {
    const status = addon({ type: "operation", slot: "status" }, { raw: "DHW" });
    expect(heatPumpState(off, [status], true).operation).toBe("dhw");
    expect(heatPumpState({ active: true, hvacAction: "defrosting" }, [], true).operation).toBe("defrost");
  });
});

describe("heatPumpFan", () => {
  it("follows the fan add-on over the unit state", () => {
    const fan = addon({ type: "fan" }, { active: false, numeric: 0 });
    expect(heatPumpFan({ active: true }, [fan]).active).toBe(false);
  });

  it("stops while defrosting when there is no fan add-on", () => {
    expect(heatPumpFan({ active: true }, []).active).toBe(true);
    expect(heatPumpFan({ active: true, operation: "defrost" }, []).active).toBe(false);
  });
});

describe("heatPumpPerformance", () => {
  const water = [
    addon({ type: "temperature", slot: "hx_outlet" }, { numeric: 42.4, unit: "°C" }),
    addon({ type: "temperature", slot: "supply" }, { numeric: 45, unit: "°C" }),
    addon({ type: "temperature", slot: "return" }, { numeric: 36.1, unit: "°C" }),
    addon({ type: "value", slot: "flow" }, { numeric: 15.6, unit: "L/min" }),
    addon({ type: "value", slot: "power" }, { numeric: 1510, unit: "W" }),
  ];

  it("computes heat from flow and the temperature difference across the exchanger", () => {
    const result = heatPumpPerformance(water);
    expect(result.deltaT).toBeCloseTo(6.3, 5);
    expect(result.flowM3h).toBeCloseTo(0.936, 5);
    expect(result.powerKw).toBeCloseTo(1.51, 5);
    expect(result.heatKw).toBeCloseTo(0.936 * 1.163 * 6.3, 5);
    expect(result.cop).toBeCloseTo((0.936 * 1.163 * 6.3) / 1.51, 5);
  });

  it("prefers sensors for heat output and COP, and gives no COP while defrosting", () => {
    const sensors = [...water, addon({ type: "value", slot: "heat_output" }, { numeric: 6.2, unit: "kW" })];
    expect(heatPumpPerformance(sensors).heatKw).toBe(6.2);
    expect(heatPumpPerformance([...sensors, addon({ type: "value", slot: "cop" }, { numeric: 3.9 })]).cop).toBe(3.9);

    const defrost = water.map((a) => (a.config.slot === "hx_outlet" ? { ...a, state: { active: false, numeric: 31.4 } } : a));
    expect(heatPumpPerformance(defrost).heatKw).toBeLessThan(0);
    expect(heatPumpPerformance(defrost).cop).toBeUndefined();
  });
});

describe("outdoorUnitRows", () => {
  const t = createTranslator("en");

  it("puts key temperatures first, then the computed COP", () => {
    const rows = outdoorUnitRows(
      [
        addon({ type: "value", slot: "frequency" }, { value: "58 Hz", numeric: 58 }),
        addon({ type: "temperature", slot: "supply" }, { value: "42 °C", numeric: 42 }),
        addon({ type: "temperature", slot: "return" }, { value: "36 °C", numeric: 36 }),
        addon({ type: "value", slot: "flow" }, { value: "1 m³/h", numeric: 1, unit: "m³/h" }),
        addon({ type: "value", slot: "power" }, { value: "1.5 kW", numeric: 1.5, unit: "kW" }),
      ],
      t
    );
    expect(rows.map((r) => r.text)).toEqual(["42 °C", "36 °C", "COP 4.7", "58 Hz", "1 m³/h", "1.5 kW"]);
  });
});
