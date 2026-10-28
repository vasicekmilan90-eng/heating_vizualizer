import { describe, expect, it } from "vitest";
import { heatPumpFan, heatPumpState, operationFromText } from "../src/renderer/devices/heat-pump-state.js";
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
