import { describe, expect, it } from "vitest";
import { normalizeConfig } from "../src/models/schema.js";
import type { HassEntities, HassEntity } from "../src/types/home-assistant.js";
import { computeCssColor, resolveNodeVisualState, resolveOverlayStyle } from "../src/utils/entity.js";

function entity(entity_id: string, state: string, attributes: Record<string, unknown> = {}): HassEntity {
  return { entity_id, state, attributes, last_changed: "", last_updated: "" };
}

function states(...list: HassEntity[]): HassEntities {
  return Object.fromEntries(list.map((e) => [e.entity_id, e]));
}

describe("resolveNodeVisualState", () => {
  it("uses hvac_action for climate entities", () => {
    const s = states(
      entity("climate.idle", "heat", { hvac_action: "idle" }),
      entity("climate.heating", "heat", { hvac_action: "heating" })
    );
    expect(resolveNodeVisualState(s, { entity_id: "climate.idle" }).active).toBe(false);
    expect(resolveNodeVisualState(s, { entity_id: "climate.heating" }).active).toBe(true);
  });

  it("treats on/heat/open as active by default and respects an explicit active_state", () => {
    const s = states(entity("valve.zone", "open"), entity("select.mode", "boost"));
    expect(resolveNodeVisualState(s, { entity_id: "valve.zone" }).active).toBe(true);
    expect(resolveNodeVisualState(s, { entity_id: "select.mode", active_state: "boost" }).active).toBe(true);
  });

  it("reads position from current_position and a value from value_attribute", () => {
    const s = states(entity("valve.mix", "open", { current_position: 42, current_temperature: 21.5 }));
    const state = resolveNodeVisualState(s, { entity_id: "valve.mix", value_attribute: "current_temperature" });
    expect(state.position).toBe(42);
    expect(state.numeric).toBe(21.5);
    expect(state.fromAttribute).toBe(true);
  });
});

describe("resolveOverlayStyle", () => {
  const overlay = (below?: number, above?: number) => ({
    id: "o",
    position: { x: 0, y: 0 },
    entity_id: "sensor.t",
    rules: [{ condition: "numeric" as const, below, above, effect: { color: "red" } }],
  });

  it("requires all numeric bounds like numeric_state", () => {
    const s = states(entity("sensor.t", "25"));
    expect(resolveOverlayStyle(s, overlay(30, 20)).color).toBe("var(--red-color)");
    expect(resolveOverlayStyle(s, overlay(30, 26)).color).toBeUndefined();
  });

  it("passes CSS colors through", () => {
    expect(computeCssColor("#ff0000")).toBe("#ff0000");
  });
});

describe("normalizeConfig", () => {
  it("maps merged legacy device types and keeps dashboard keys", () => {
    const config = normalizeConfig({
      type: "custom:heating-visualizer-card",
      grid_options: { columns: 6 },
      schema: {
        nodes: [{ id: "u", type: "outdoor_unit", position: { x: 0, y: 0 } }],
        edges: [],
        overlays: [],
      },
    });
    expect(config.schema?.nodes[0].type).toBe("heat_pump");
    expect(config.grid_options).toEqual({ columns: 6 });
  });
});
