import { describe, expect, it } from "vitest";
import { getNodeDefinition, tankHeight } from "../src/models/device-registry.js";
import type { SchemaNode } from "../src/models/schema.js";
import { spinDuration, withNumericActivity } from "../src/renderer/devices/common.js";

const at = { x: 0, y: 0 };

describe("tank", () => {
  it("gets its ports from its modules", () => {
    const empty: SchemaNode = { id: "t", type: "tank", position: at };
    expect(getNodeDefinition(empty)!.ports).toEqual([]);

    const dhw: SchemaNode = { ...empty, addons: [{ type: "heat_exchanger" }, { type: "dhw" }, { type: "circulation" }] };
    const def = getNodeDefinition(dhw)!;
    expect(def.labelKey).toBe("devices.tank.name_dhw");
    const left = def.ports.filter((p) => p.position.x === 0);
    const right = def.ports.filter((p) => p.position.x === def.width);
    expect(left.map((p) => p.id)).toEqual(["coil_in", "coil_out"]);
    expect(right.map((p) => p.id)).toEqual(["hot_out", "circulation_in", "cold_in"]);
    // Ports on one side go from top to bottom without overlapping.
    expect(right[0].position.y).toBeLessThan(right[1].position.y);
    expect(right[1].position.y).toBeLessThan(right[2].position.y);
    expect(def.ports.find((p) => p.id === "coil_out")?.kind).toBe("outlet");
  });

  it("grows with its volume", () => {
    expect(tankHeight(50)).toBeLessThan(tankHeight(200));
    expect(tankHeight(200)).toBeLessThan(tankHeight(1000));
    expect(tankHeight(undefined)).toBe(tankHeight(200));
    expect(tankHeight(100_000)).toBe(300);
    const small = getNodeDefinition({ id: "t", type: "tank", position: at, volume: 50 })!;
    expect(small.height).toBe(tankHeight(50));
  });
});

describe("junction", () => {
  it("merges two inlets into one outlet", () => {
    const def = getNodeDefinition({ id: "j", type: "junction", position: at, variant: "merge" })!;
    expect(def.ports.map((p) => `${p.id}:${p.kind}`)).toEqual(["in_top:inlet", "in_bottom:inlet", "out:outlet"]);
  });
});

describe("speed and activity", () => {
  it("spins faster with higher speed", () => {
    expect(spinDuration({ active: true, numeric: 0 })).toBeUndefined();
    expect(spinDuration({ active: true, numeric: 300 })).toBe(2);
    expect(spinDuration({ active: true, numeric: 900 })).toBeCloseTo(0.67);
    expect(spinDuration({ active: true, numeric: 100, unit: "%" })).toBe(0.5);
  });

  it("treats numbers above zero as running unless an active state is set", () => {
    expect(withNumericActivity({ type: "fan" }, { active: false, numeric: 450 }).active).toBe(true);
    expect(withNumericActivity({ type: "fan" }, { active: true, numeric: 0 }).active).toBe(false);
    expect(withNumericActivity({ type: "fan", active_state: "on" }, { active: false, numeric: 450 }).active).toBe(false);
  });
});
