import { describe, expect, it } from "vitest";
import { getNodeDefinition } from "../src/models/device-registry.js";
import type { SchemaNode } from "../src/models/schema.js";
import { getAbsolutePort, getNodeBounds, normalizeRotation } from "../src/utils/geometry.js";

const node = (rotation?: number): SchemaNode => ({
  id: "v",
  type: "valve_3way",
  position: { x: 100, y: 100 },
  rotation,
});

describe("geometry", () => {
  it("normalizes rotation", () => {
    expect(normalizeRotation(undefined)).toBe(0);
    expect(normalizeRotation(450)).toBe(90);
    expect(normalizeRotation(-90)).toBe(270);
  });

  it("places ports without rotation", () => {
    const port = getAbsolutePort(node(), "in");
    expect(port).toMatchObject({ x: 100, y: 140, direction: { x: -1, y: 0 } });
  });

  it("rotates ports and their direction around the device center", () => {
    // valve_3way is 80x80, inlet on the left edge; after 90° it sits on the top edge.
    const port = getAbsolutePort(node(90), "in");
    expect(port?.x).toBeCloseTo(140);
    expect(port?.y).toBeCloseTo(100);
    expect(port?.direction).toEqual({ x: 0, y: -1 });
  });

  it("swaps bounds for quarter turns", () => {
    const heatPump: SchemaNode = { id: "hp", type: "heat_pump", position: { x: 0, y: 0 }, rotation: 90 };
    const def = getNodeDefinition(heatPump)!;
    const bounds = getNodeBounds(heatPump, def);
    expect(bounds.width).toBe(def.height);
    expect(bounds.height).toBe(def.width);
  });

  it("builds manifold geometry from the loop count", () => {
    const manifold: SchemaNode = {
      id: "m",
      type: "manifold",
      position: { x: 0, y: 0 },
      addons: Array.from({ length: 6 }, () => ({ type: "loop" as const })),
    };
    const ports = getNodeDefinition(manifold)!.ports.map((p) => p.id);
    expect(ports).toContain("loop_6_out");
    expect(ports).not.toContain("loop_7_out");
  });
});
