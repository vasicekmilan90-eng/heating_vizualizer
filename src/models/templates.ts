import { getNodeDefinition, MANIFOLD_DEFAULT_LOOPS } from "./device-registry.js";
import type { AddonConfig, Connection, HeatingSchema, SchemaNode } from "./schema.js";

interface TemplateNode {
  id: string;
  type: string;
  x: number;
  y: number;
  addons?: AddonConfig[];
}

export interface SchemaTemplate {
  id: string;
  nodes: TemplateNode[];
  /** `node.port` pairs from outlet to inlet, using the template's node ids. */
  connections: [string, string][];
}

const loops = (): AddonConfig[] => Array.from({ length: MANIFOLD_DEFAULT_LOOPS }, () => ({ type: "loop" as const }));

export const SCHEMA_TEMPLATES: SchemaTemplate[] = [
  {
    id: "heat_pump_floor",
    nodes: [
      { id: "hp", type: "heat_pump", x: 0, y: 20 },
      { id: "pump", type: "circulation_pump", x: 240, y: 15 },
      { id: "manifold", type: "manifold", x: 400, y: 30, addons: loops() },
    ],
    connections: [
      ["hp.hot_out", "pump.in"],
      ["pump.out", "manifold.supply_in"],
      ["manifold.return_out", "hp.cold_in"],
    ],
  },
  {
    id: "heat_pump_dhw_floor",
    nodes: [
      { id: "hp", type: "heat_pump", x: 0, y: 140 },
      { id: "valve", type: "valve_3way", x: 240, y: 130 },
      { id: "dhw", type: "tank", x: 420, y: 0, addons: [{ type: "heat_exchanger" }, { type: "dhw" }] },
      { id: "pump", type: "circulation_pump", x: 420, y: 220 },
      { id: "manifold", type: "manifold", x: 580, y: 220, addons: loops() },
    ],
    connections: [
      ["hp.hot_out", "valve.in"],
      ["valve.out_a", "dhw.coil_in"],
      ["dhw.coil_out", "hp.cold_in"],
      ["valve.out_b", "pump.in"],
      ["pump.out", "manifold.supply_in"],
      ["manifold.return_out", "hp.cold_in"],
    ],
  },
  {
    id: "heat_pump_buffer_radiators",
    nodes: [
      { id: "hp", type: "heat_pump", x: 0, y: 40 },
      {
        id: "buffer",
        type: "tank",
        x: 260,
        y: 0,
        addons: [{ type: "direct_source" }, { type: "direct_heating" }],
      },
      { id: "pump", type: "circulation_pump", x: 440, y: 0 },
      { id: "radiator", type: "radiator", x: 600, y: 20 },
    ],
    connections: [
      ["hp.hot_out", "buffer.source_in"],
      ["buffer.source_out", "hp.cold_in"],
      ["buffer.supply_out", "pump.in"],
      ["pump.out", "radiator.in"],
      ["radiator.out", "buffer.return_in"],
    ],
  },
  {
    id: "boiler_radiators",
    nodes: [
      { id: "boiler", type: "heating_boiler", x: 0, y: 0 },
      { id: "pump", type: "circulation_pump", x: 180, y: 0 },
      { id: "radiator", type: "radiator", x: 340, y: 10 },
    ],
    connections: [
      ["boiler.supply_out", "pump.in"],
      ["pump.out", "radiator.in"],
      ["radiator.out", "boiler.return_in"],
    ],
  },
];

const TEMPLATE_GAP = 60;

/** Lowest point of the existing drawing, so a template is placed below it. */
function bottomOf(nodes: SchemaNode[]): number {
  return nodes.reduce((max, node) => {
    const height = getNodeDefinition(node)?.height ?? 0;
    return Math.max(max, node.position.y + height + TEMPLATE_GAP);
  }, 0);
}

/** Template nodes and connections with ids that do not collide with the schema. */
export function instantiateTemplate(
  template: SchemaTemplate,
  schema: HeatingSchema,
  makeId: (localId: string) => string
): Pick<HeatingSchema, "nodes" | "connections"> {
  const taken = new Set(schema.nodes.map((n) => n.id));
  const ids = new Map<string, string>();
  for (const node of template.nodes) {
    let id = makeId(node.id);
    while (taken.has(id)) id = makeId(node.id);
    taken.add(id);
    ids.set(node.id, id);
  }

  const offsetY = bottomOf(schema.nodes);
  const nodes: SchemaNode[] = template.nodes.map((node) => ({
    id: ids.get(node.id) ?? node.id,
    type: node.type,
    position: { x: 40 + node.x, y: 40 + offsetY + node.y },
    addons: node.addons?.map((a) => ({ ...a })),
  }));

  const rename = (end: string): string => {
    const dot = end.indexOf(".");
    return `${ids.get(end.slice(0, dot)) ?? end.slice(0, dot)}${end.slice(dot)}`;
  };
  const connections: Connection[] = template.connections.map(([from, to]) => ({ from: rename(from), to: rename(to) }));
  return { nodes, connections };
}
