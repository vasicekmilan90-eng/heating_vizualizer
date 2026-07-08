import type { PortDefinition, PortRef, SchemaNode } from "../models/schema.js";
import { getDeviceDefinition } from "../models/device-registry.js";

export interface AbsolutePort {
  nodeId: string;
  portId: string;
  x: number;
  y: number;
  kind: PortDefinition["kind"];
}

export function getAbsolutePort(node: SchemaNode, portId: string): AbsolutePort | undefined {
  const def = getDeviceDefinition(node.type);
  if (!def) return undefined;

  const port = def.ports.find((p) => p.id === portId);
  if (!port) return undefined;

  return {
    nodeId: node.id,
    portId: port.id,
    x: node.position.x + port.position.x,
    y: node.position.y + port.position.y,
    kind: port.kind,
  };
}

export function buildPipePath(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const midX = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
}

export function portRefsEqual(a: PortRef, b: PortRef): boolean {
  return a.nodeId === b.nodeId && a.portId === b.portId;
}

export function snapToGrid(value: number, grid = 10): number {
  return Math.round(value / grid) * grid;
}
