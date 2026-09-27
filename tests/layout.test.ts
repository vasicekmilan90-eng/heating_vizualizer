import { describe, expect, it } from "vitest";
import { getNodeDefinition } from "../src/models/device-registry.js";
import { autoLayout, layoutColumns } from "../src/models/layout.js";
import type { HeatingSchema } from "../src/models/schema.js";
import { instantiateTemplate, SCHEMA_TEMPLATES } from "../src/models/templates.js";
import { getNodeBounds } from "../src/utils/geometry.js";

function templateSchema(id: string): HeatingSchema {
  const template = SCHEMA_TEMPLATES.find((tpl) => tpl.id === id)!;
  const schema: HeatingSchema = { nodes: [], connections: [], overlays: [] };
  const part = instantiateTemplate(template, schema, (local) => local);
  return { ...schema, ...part };
}

describe("autoLayout", () => {
  it("orders devices in flow direction and ignores return pipes", () => {
    const schema = templateSchema("heat_pump_dhw_floor");
    expect(layoutColumns(schema).columns).toEqual([["hp"], ["valve"], ["dhw", "pump"], ["manifold"]]);
  });

  it("starts from the heat source even when it is listed last", () => {
    const schema = templateSchema("heat_pump_buffer_radiators");
    schema.nodes.reverse();
    expect(layoutColumns(schema).columns[0]).toEqual(["hp"]);
  });

  it("places devices without overlaps and unconnected devices below", () => {
    const schema = templateSchema("heat_pump_dhw_floor");
    schema.nodes.push({ id: "vessel", type: "expansion_vessel", position: { x: 0, y: 0 }, rotation: 90 });
    const nodes = autoLayout(schema);
    const boxes = nodes.map((n) => ({ id: n.id, ...getNodeBounds(n, getNodeDefinition(n)!) }));

    for (const a of boxes) {
      for (const b of boxes) {
        if (a.id === b.id) continue;
        const overlap = a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
        expect(overlap, `${a.id} / ${b.id}`).toBe(false);
      }
    }
    const vessel = boxes.find((b) => b.id === "vessel")!;
    expect(vessel.y).toBeGreaterThan(Math.max(...boxes.filter((b) => b.id !== "vessel").map((b) => b.y)));
    expect(nodes.find((n) => n.id === "vessel")?.rotation).toBe(90);
  });
});
