import { getNodeDefinition } from "./device-registry.js";
import {
  formatPortRef,
  parsePortRef,
  type Connection,
  type HeatingSchema,
  type PortDefinition,
  type PortRef,
  type SchemaNode,
} from "./schema.js";

export function findPort(schema: HeatingSchema, ref: PortRef): PortDefinition | undefined {
  const node = schema.nodes.find((n) => n.id === ref.nodeId);
  return node ? getNodeDefinition(node)?.ports.find((p) => p.id === ref.portId) : undefined;
}

/** Orders two ports as outlet → inlet; `undefined` when both have the same direction. */
export function makeConnection(schema: HeatingSchema, a: PortRef, b: PortRef): Connection | undefined {
  if (a.nodeId === b.nodeId && a.portId === b.portId) return undefined;
  const portA = findPort(schema, a);
  const portB = findPort(schema, b);
  if (!portA || !portB || portA.kind === portB.kind) return undefined;
  return portA.kind === "outlet"
    ? { from: formatPortRef(a), to: formatPortRef(b) }
    : { from: formatPortRef(b), to: formatPortRef(a) };
}

export function hasConnection(schema: HeatingSchema, connection: Connection): boolean {
  return schema.connections.some((c) => c.from === connection.from && c.to === connection.to);
}

/** Connections attached to one port. */
export function portConnections(schema: HeatingSchema, ref: PortRef): Connection[] {
  const id = formatPortRef(ref);
  return schema.connections.filter((c) => c.from === id || c.to === id);
}

/** The port on the other end of a connection. */
export function otherEnd(connection: Connection, ref: PortRef): PortRef | undefined {
  const id = formatPortRef(ref);
  return parsePortRef(connection.from === id ? connection.to : connection.from);
}

/** Ports of other nodes that can be connected to `ref` (opposite direction, not yet connected). */
export function candidatePorts(schema: HeatingSchema, ref: PortRef): PortRef[] {
  const port = findPort(schema, ref);
  if (!port) return [];
  const result: PortRef[] = [];
  for (const node of schema.nodes) {
    if (node.id === ref.nodeId) continue;
    for (const other of getNodeDefinition(node)?.ports ?? []) {
      if (other.kind === port.kind) continue;
      const candidate = { nodeId: node.id, portId: other.id };
      const connection = makeConnection(schema, ref, candidate);
      if (connection && !hasConnection(schema, connection)) result.push(candidate);
    }
  }
  return result;
}

/** Number of connected ports and all ports of a node. */
export function connectedPortCount(schema: HeatingSchema, node: SchemaNode): [number, number] {
  const ports = getNodeDefinition(node)?.ports ?? [];
  const connected = ports.filter((p) => portConnections(schema, { nodeId: node.id, portId: p.id }).length).length;
  return [connected, ports.length];
}

/** Connections whose ends do not exist or do not go from an outlet to an inlet. */
export function invalidConnections(schema: HeatingSchema): Connection[] {
  return schema.connections.filter((c) => {
    const from = parsePortRef(c.from);
    const to = parsePortRef(c.to);
    if (!from || !to) return true;
    return findPort(schema, from)?.kind !== "outlet" || findPort(schema, to)?.kind !== "inlet";
  });
}

/** Removes connections to ports a node no longer has, e.g. after removing its heat exchanger. */
export function pruneNodeConnections(schema: HeatingSchema, nodeId: string): Connection[] {
  const node = schema.nodes.find((n) => n.id === nodeId);
  const ports = new Set(node ? (getNodeDefinition(node)?.ports ?? []).map((p) => p.id) : []);
  return schema.connections.filter((c) =>
    [c.from, c.to].every((end) => {
      const ref = parsePortRef(end);
      return !ref || ref.nodeId !== nodeId || ports.has(ref.portId);
    })
  );
}

const LOOP_PORT = /^loop_(\d+)_(in|out)$/;

/**
 * Loop ports are numbered by position, so removing loop `removed` (1-based) drops its connections
 * and shifts the following loops down by one.
 */
export function renumberLoops(schema: HeatingSchema, nodeId: string, removed: number): Connection[] {
  const shift = (end: string): string | undefined => {
    const ref = parsePortRef(end);
    const match = ref?.nodeId === nodeId ? LOOP_PORT.exec(ref.portId) : null;
    if (!ref || !match) return end;
    const number = Number(match[1]);
    if (number === removed) return undefined;
    if (number < removed) return end;
    return formatPortRef({ nodeId, portId: `loop_${number - 1}_${match[2]}` });
  };
  const result: Connection[] = [];
  for (const c of schema.connections) {
    const from = shift(c.from);
    const to = shift(c.to);
    if (from && to) result.push({ ...c, from, to });
  }
  return result;
}
