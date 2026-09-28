import { getNodeDefinition } from "./device-registry.js";
import { connectionId, formatPortRef, parsePortRef, type HeatingSchema, type SchemaNode } from "./schema.js";

/** What flows in a pipe; decides its color. */
export type Medium = "supply" | "return" | "hot_water" | "cold_water";

const TERMINAL: Record<string, Medium> = { in: "supply", out: "return" };
const FOUR_PORT: Record<string, Medium> = {
  primary_in: "supply",
  primary_out: "return",
  secondary_out: "supply",
  secondary_in: "return",
};

/** Ports that fix the medium; devices without an entry pass the medium of their pipes on. */
const PORT_MEDIA: Record<string, Record<string, Medium>> = {
  heat_pump: { hot_out: "supply", cold_in: "return" },
  heating_boiler: { supply_out: "supply", return_in: "return" },
  solar_collector: { hot_out: "supply", cold_in: "return" },
  tank: {
    source_in: "supply",
    source_out: "return",
    coil_in: "supply",
    coil_out: "return",
    coil2_in: "supply",
    coil2_out: "return",
    supply_out: "supply",
    return_in: "return",
    hot_out: "hot_water",
    cold_in: "cold_water",
    circulation_in: "hot_water",
  },
  manifold: { supply_in: "supply", return_out: "return" },
  floor_heating: TERMINAL,
  radiator: TERMINAL,
  fancoil: TERMINAL,
  mixing_valve: { hot_in: "supply", return_in: "return", mixed_out: "supply" },
  hydraulic_separator: FOUR_PORT,
  plate_heat_exchanger: FOUR_PORT,
  electric_heater: { out: "supply" },
  water_supply: { out: "cold_water" },
  dhw_outlet: { in: "hot_water" },
};

const LOOP_PORT = /^loop_(\d+)_(in|out)$/;

function portMedium(node: SchemaNode, portId: string): Medium | undefined {
  if (node.type === "manifold") {
    const loop = LOOP_PORT.exec(portId);
    if (loop) return loop[2] === "out" ? "supply" : "return";
  }
  return PORT_MEDIA[node.type]?.[portId];
}

/** Medium of every pipe, keyed by `connectionId`; pipes that cannot be classified are left out. */
export function pipeMedia(schema: HeatingSchema): Map<string, Medium> {
  const nodes = new Map(schema.nodes.map((n) => [n.id, n]));
  const media = new Map<string, Medium>();
  const byNode = new Map<string, string[]>();

  for (const c of schema.connections) {
    const from = parsePortRef(c.from);
    const to = parsePortRef(c.to);
    const fromNode = from && nodes.get(from.nodeId);
    const toNode = to && nodes.get(to.nodeId);
    if (!from || !to || !fromNode || !toNode) continue;
    const id = connectionId(c);
    const medium = portMedium(fromNode, from.portId) ?? portMedium(toNode, to.portId);
    if (medium) media.set(id, medium);
    for (const nodeId of [from.nodeId, to.nodeId]) byNode.set(nodeId, [...(byNode.get(nodeId) ?? []), id]);
  }

  // Pumps, valves and junctions carry the medium of the pipes around them.
  const passThrough = schema.nodes.filter((n) => !PORT_MEDIA[n.type]);
  let changed = true;
  while (changed) {
    changed = false;
    for (const node of passThrough) {
      const pipes = byNode.get(node.id) ?? [];
      const known = pipes.map((id) => media.get(id)).find((m) => m !== undefined);
      if (!known) continue;
      for (const id of pipes) {
        if (!media.has(id)) {
          media.set(id, known);
          changed = true;
        }
      }
    }
  }
  return media;
}

/** Runtime facts about a device that decide where water can flow. */
export interface FlowNodeState {
  active: boolean;
  valveBranch?: "a" | "b";
  /** A pump add-on is running. */
  pumpActive?: boolean;
  /** Manifold loops in order; `false` = closed. */
  loops?: boolean[];
}

/** Devices that move water while they are active. */
const MOVERS = new Set(["circulation_pump", "heat_pump", "heating_boiler", "solar_collector"]);

const TANK_FLOW: Record<string, string[]> = {
  coil_in: ["coil_out"],
  coil2_in: ["coil2_out"],
  source_in: ["source_out"],
  return_in: ["supply_out"],
  cold_in: ["hot_out"],
  circulation_in: ["hot_out"],
};
const FOUR_PORT_FLOW: Record<string, string[]> = {
  primary_in: ["primary_out"],
  secondary_in: ["secondary_out"],
};

/** Outlets water entering `inlet` can leave through. */
function outletsFrom(node: SchemaNode, inlet: string, state: FlowNodeState): string[] {
  const outlets = (getNodeDefinition(node)?.ports ?? []).filter((p) => p.kind === "outlet").map((p) => p.id);
  switch (node.type) {
    case "tank":
      return (TANK_FLOW[inlet] ?? []).filter((id) => outlets.includes(id));
    case "hydraulic_separator":
    case "plate_heat_exchanger":
      return FOUR_PORT_FLOW[inlet] ?? [];
    case "valve_3way":
      return state.valveBranch ? [`out_${state.valveBranch}`] : outlets;
    case "zone_valve":
      return node.entity_id && !state.active ? [] : outlets;
    case "manifold": {
      if (LOOP_PORT.test(inlet)) return ["return_out"];
      const open = outlets.filter((id) => {
        const match = LOOP_PORT.exec(id);
        return match && state.loops?.[Number(match[1]) - 1] !== false;
      });
      // Loops drawn without pipes still carry water from the supply to the return bar.
      return open.length ? [...open, "return_out"] : [];
    }
    default:
      return outlets;
  }
}

/**
 * Pipes water flows through: from every running pump or heat source downstream along the pipes, only
 * through open valves and the active branch of 3-way valves. An open hot water tap makes the cold water
 * supply the source of its circuit.
 */
export function flowingConnections(
  schema: HeatingSchema,
  stateOf: (node: SchemaNode) => FlowNodeState
): Set<string> {
  const states = new Map(schema.nodes.map((n) => [n.id, stateOf(n)]));
  const nodes = new Map(schema.nodes.map((n) => [n.id, n]));
  const outgoing = new Map<string, typeof schema.connections>();
  for (const c of schema.connections) outgoing.set(c.from, [...(outgoing.get(c.from) ?? []), c]);

  const tapOpen = schema.nodes.some((n) => n.type === "dhw_outlet" && states.get(n.id)?.active);
  const movers = schema.nodes.filter((n) => {
    const state = states.get(n.id);
    if (n.type === "water_supply") return tapOpen;
    return (MOVERS.has(n.type) && state?.active) || state?.pumpActive;
  });

  const flowing = new Set<string>();
  const queue = movers.flatMap((n) =>
    (getNodeDefinition(n)?.ports ?? []).filter((p) => p.kind === "outlet").map((p) => formatPortRef({ nodeId: n.id, portId: p.id }))
  );
  while (queue.length) {
    const ref = queue.pop() as string;
    for (const c of outgoing.get(ref) ?? []) {
      const id = connectionId(c);
      if (flowing.has(id)) continue;
      flowing.add(id);
      const to = parsePortRef(c.to);
      const node = to && nodes.get(to.nodeId);
      if (!to || !node) continue;
      const state = states.get(node.id) ?? { active: false };
      for (const outlet of outletsFrom(node, to.portId, state)) queue.push(formatPortRef({ nodeId: node.id, portId: outlet }));
    }
  }
  return flowing;
}
