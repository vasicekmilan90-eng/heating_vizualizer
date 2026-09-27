import { describe, expect, it } from "vitest";
import { invalidConnections } from "../src/models/connections.js";
import { getDeviceDefinition } from "../src/models/device-registry.js";
import type { HeatingSchema } from "../src/models/schema.js";
import { instantiateTemplate, SCHEMA_TEMPLATES } from "../src/models/templates.js";
import en from "../src/translations/en.json";

describe("schema templates", () => {
  it.each(SCHEMA_TEMPLATES.map((tpl) => [tpl.id, tpl] as const))("%s is valid and translated", (id, template) => {
    let counter = 0;
    const schema: HeatingSchema = { nodes: [], connections: [], overlays: [] };
    const part = instantiateTemplate(template, schema, (local) => `${local}_${++counter}`);
    schema.nodes.push(...part.nodes);
    schema.connections.push(...part.connections);

    expect(part.nodes.every((n) => getDeviceDefinition(n.type))).toBe(true);
    expect(invalidConnections(schema)).toEqual([]);
    expect((en.templates as Record<string, string>)[id]).toBeTruthy();
  });

  it("places a template below existing nodes with unique ids", () => {
    const template = SCHEMA_TEMPLATES[0];
    const schema: HeatingSchema = {
      nodes: [{ id: "hp_1", type: "heat_pump", position: { x: 0, y: 100 } }],
      connections: [],
      overlays: [],
    };
    let counter = 0;
    const part = instantiateTemplate(template, schema, (local) => `${local}_${++counter}`);
    expect(part.nodes.map((n) => n.id)).not.toContain("hp_1");
    expect(Math.min(...part.nodes.map((n) => n.position.y))).toBeGreaterThan(220);
    expect(part.connections[0].from.startsWith(part.nodes[0].id)).toBe(true);
  });
});
