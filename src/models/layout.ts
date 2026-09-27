import { getNodeDefinition } from "./device-registry.js";
import { parsePortRef, type HeatingSchema, type SchemaNode } from "./schema.js";
import { getNodeBounds, snapToGrid } from "../utils/geometry.js";

const HEAT_SOURCES = new Set(["heat_pump", "heating_boiler", "solar_collector"]);
const ORIGIN = 40;
const COLUMN_GAP = 80;
const ROW_GAP = 50;
const GRID = 10;

interface Edge {
  from: string;
  to: string;
  /** Outlet height on the source device, so branches keep their top-to-bottom order. */
  order: number;
}

function edgesOf(schema: HeatingSchema): Edge[] {
  const nodes = new Map(schema.nodes.map((n) => [n.id, n]));
  const edges: Edge[] = [];
  for (const c of schema.connections) {
    const from = parsePortRef(c.from);
    const to = parsePortRef(c.to);
    const node = from && nodes.get(from.nodeId);
    if (!from || !to || !node || !nodes.has(to.nodeId) || from.nodeId === to.nodeId) continue;
    const port = getNodeDefinition(node)?.ports.find((p) => p.id === from.portId);
    edges.push({ from: from.nodeId, to: to.nodeId, order: port?.position.y ?? 0 });
  }
  return edges;
}

/**
 * Columns in flow direction: heat sources first, then breadth-first along the pipes.
 * Return pipes lead back to already placed devices and are ignored, which breaks the circuit loops.
 */
export function layoutColumns(schema: HeatingSchema): { columns: string[][]; unconnected: string[] } {
  const edges = edgesOf(schema);
  const outgoing = new Map<string, Edge[]>();
  const incoming = new Set(edges.map((e) => e.to));
  const connected = new Set(edges.flatMap((e) => [e.from, e.to]));
  for (const edge of edges) outgoing.set(edge.from, [...(outgoing.get(edge.from) ?? []), edge]);
  for (const list of outgoing.values()) list.sort((a, b) => a.order - b.order);

  const layer = new Map<string, number>();
  const visit = (root: string): void => {
    let queue = [root];
    layer.set(root, 0);
    while (queue.length) {
      const next: string[] = [];
      for (const id of queue) {
        for (const edge of outgoing.get(id) ?? []) {
          if (layer.has(edge.to)) continue;
          layer.set(edge.to, (layer.get(id) ?? 0) + 1);
          next.push(edge.to);
        }
      }
      queue = next;
    }
  };

  const ordered = schema.nodes.filter((n) => connected.has(n.id));
  const rootCandidates = [
    ...ordered.filter((n) => HEAT_SOURCES.has(n.type)),
    ...ordered.filter((n) => !incoming.has(n.id)),
    ...ordered,
  ];
  for (const node of rootCandidates) {
    if (!layer.has(node.id)) visit(node.id);
  }

  const columns: string[][] = [];
  for (const [id, index] of layer) {
    columns[index] = [...(columns[index] ?? []), id];
  }
  return {
    columns: columns.filter((c) => c.length),
    unconnected: schema.nodes.filter((n) => !connected.has(n.id)).map((n) => n.id),
  };
}

function placeAt(node: SchemaNode, x: number, y: number): SchemaNode {
  const def = getNodeDefinition(node);
  if (!def) return node;
  const bounds = getNodeBounds({ ...node, position: { x: 0, y: 0 } }, def);
  return { ...node, position: { x: snapToGrid(x - bounds.x, GRID), y: snapToGrid(y - bounds.y, GRID) } };
}

function size(node: SchemaNode): { width: number; height: number } {
  const def = getNodeDefinition(node);
  return def ? getNodeBounds(node, def) : { width: 0, height: 0 };
}

/** New positions for all nodes; rotation, add-ons and connections are kept. */
export function autoLayout(schema: HeatingSchema): SchemaNode[] {
  const byId = new Map(schema.nodes.map((n) => [n.id, n]));
  const placed = new Map<string, SchemaNode>();
  const { columns, unconnected } = layoutColumns(schema);

  let x = ORIGIN;
  let bottom = ORIGIN;
  for (const column of columns) {
    let y = ORIGIN;
    let width = 0;
    for (const id of column) {
      const node = byId.get(id);
      if (!node) continue;
      const box = size(node);
      placed.set(id, placeAt(node, x, y));
      y += box.height + ROW_GAP;
      width = Math.max(width, box.width);
    }
    bottom = Math.max(bottom, y);
    x += width + COLUMN_GAP;
  }

  let rowX = ORIGIN;
  for (const id of unconnected) {
    const node = byId.get(id);
    if (!node) continue;
    placed.set(id, placeAt(node, rowX, bottom));
    rowX += size(node).width + COLUMN_GAP;
  }

  return schema.nodes.map((n) => placed.get(n.id) ?? n);
}
