import { describe, expect, it } from "vitest";
import { flowingConnections, pipeMedia, type FlowNodeState } from "../src/models/hydraulics.js";
import { connectionId, type HeatingSchema } from "../src/models/schema.js";
import { instantiateTemplate, SCHEMA_TEMPLATES } from "../src/models/templates.js";

function template(id: string): HeatingSchema {
  const tpl = SCHEMA_TEMPLATES.find((t) => t.id === id)!;
  const empty: HeatingSchema = { nodes: [], connections: [], overlays: [] };
  return { ...empty, ...instantiateTemplate(tpl, empty, (local) => local) };
}

const pipe = (from: string, to: string): string => connectionId({ from, to });

describe("pipeMedia", () => {
  it("colors heating supply and return, passing through valves and pumps", () => {
    const media = pipeMedia(template("heat_pump_dhw_floor"));
    expect(media.get(pipe("hp.hot_out", "valve.in"))).toBe("supply");
    expect(media.get(pipe("valve.out_a", "dhw.coil_in"))).toBe("supply");
    expect(media.get(pipe("valve.out_b", "pump.in"))).toBe("supply");
    expect(media.get(pipe("dhw.coil_out", "hp.cold_in"))).toBe("return");
    expect(media.get(pipe("manifold.return_out", "hp.cold_in"))).toBe("return");
  });

  it("tells hot and cold water apart", () => {
    const schema: HeatingSchema = {
      nodes: [
        { id: "mains", type: "water_supply", position: { x: 0, y: 0 } },
        { id: "dhw", type: "tank", position: { x: 0, y: 0 }, addons: [{ type: "dhw" }] },
        { id: "tap", type: "dhw_outlet", position: { x: 0, y: 0 } },
      ],
      connections: [
        { from: "mains.out", to: "dhw.cold_in" },
        { from: "dhw.hot_out", to: "tap.in" },
      ],
      overlays: [],
    };
    const media = pipeMedia(schema);
    expect(media.get(pipe("mains.out", "dhw.cold_in"))).toBe("cold_water");
    expect(media.get(pipe("dhw.hot_out", "tap.in"))).toBe("hot_water");
  });
});

describe("flowingConnections", () => {
  const schema = template("heat_pump_dhw_floor");
  const states =
    (overrides: Record<string, FlowNodeState>) =>
    (node: { id: string }): FlowNodeState =>
      overrides[node.id] ?? { active: false };

  it("follows the active branch of the 3-way valve back to the heat pump", () => {
    const flowing = flowingConnections(schema, states({ hp: { active: true }, valve: { active: false, valveBranch: "a" } }));
    expect([...flowing].sort()).toEqual(
      [pipe("hp.hot_out", "valve.in"), pipe("valve.out_a", "dhw.coil_in"), pipe("dhw.coil_out", "hp.cold_in")].sort()
    );
  });

  it("flows through the floor heating on branch B and stops when the heat pump is off", () => {
    const branchB = flowingConnections(schema, states({ hp: { active: true }, valve: { active: false, valveBranch: "b" } }));
    expect(branchB.has(pipe("pump.out", "manifold.supply_in"))).toBe(true);
    expect(branchB.has(pipe("manifold.return_out", "hp.cold_in"))).toBe(true);
    expect(branchB.has(pipe("valve.out_a", "dhw.coil_in"))).toBe(false);

    expect(flowingConnections(schema, states({})).size).toBe(0);
  });

  it("is stopped by closed manifold loops", () => {
    const closed = flowingConnections(
      schema,
      states({ pump: { active: true }, manifold: { active: false, loops: [false, false, false, false] } })
    );
    expect(closed.has(pipe("pump.out", "manifold.supply_in"))).toBe(true);
    expect(closed.has(pipe("manifold.return_out", "hp.cold_in"))).toBe(false);
  });

  it("runs cold water into the tank while a hot water tap is open", () => {
    const water: HeatingSchema = {
      nodes: [
        { id: "mains", type: "water_supply", position: { x: 0, y: 0 } },
        { id: "dhw", type: "tank", position: { x: 0, y: 0 }, addons: [{ type: "dhw" }] },
        { id: "tap", type: "dhw_outlet", position: { x: 0, y: 0 } },
      ],
      connections: [
        { from: "mains.out", to: "dhw.cold_in" },
        { from: "dhw.hot_out", to: "tap.in" },
      ],
      overlays: [],
    };
    expect(flowingConnections(water, states({})).size).toBe(0);
    expect(flowingConnections(water, states({ tap: { active: true } })).size).toBe(2);
  });
});
