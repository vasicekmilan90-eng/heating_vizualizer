import { describe, expect, it } from "vitest";
import type { HeatingSchema } from "../src/models/schema.js";
import { actionTarget, canTap, hasAction } from "../src/utils/actions.js";

const schema: HeatingSchema = {
  nodes: [
    {
      id: "hp",
      type: "heat_pump",
      position: { x: 0, y: 0 },
      entity_id: "climate.hp",
      hold_action: { action: "navigate", navigation_path: "/heating" },
      addons: [{ type: "defrost", entity_id: "binary_sensor.defrost" }, { type: "heat_exchanger" }],
    },
    { id: "junction", type: "junction", position: { x: 0, y: 0 } },
  ],
  connections: [],
  overlays: [{ id: "o", entity_id: "sensor.t", position: { x: 0, y: 0 }, tap_action: { action: "none" } }],
};

describe("actions", () => {
  it("uses the device entity and its configured actions", () => {
    const config = actionTarget(schema, { nodeId: "hp" });
    expect(config).toMatchObject({ entity: "climate.hp", hold_action: { action: "navigate" } });
    expect(canTap(config!)).toBe(true);
    expect(hasAction(config!.hold_action)).toBe(true);
  });

  it("opens more-info of an add-on badge", () => {
    expect(actionTarget(schema, { nodeId: "hp", addonIndex: 0 })).toEqual({ entity: "binary_sensor.defrost" });
    // An add-on without entity falls back to the device.
    expect(actionTarget(schema, { nodeId: "hp", addonIndex: 1 })?.entity).toBe("climate.hp");
  });

  it("does not tap without entity or with action none", () => {
    expect(canTap(actionTarget(schema, { nodeId: "junction" })!)).toBe(false);
    expect(canTap(actionTarget(schema, { overlayId: "o" })!)).toBe(false);
    expect(actionTarget(schema, { nodeId: "missing" })).toBeUndefined();
  });
});
