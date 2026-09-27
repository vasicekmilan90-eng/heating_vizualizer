import type { DeviceDefinition, PortDefinition, PortRef, SchemaNode } from "../models/schema.js";
import { getNodeDefinition } from "../models/device-registry.js";

export interface Point {
  x: number;
  y: number;
}

export interface Rect extends Point {
  width: number;
  height: number;
}

export interface AbsolutePort {
  nodeId: string;
  portId: string;
  x: number;
  y: number;
  kind: PortDefinition["kind"];
  /** Unit vector pointing away from the device. */
  direction: Point;
}

export function normalizeRotation(rotation: number | undefined): number {
  return (((rotation ?? 0) % 360) + 360) % 360;
}

/** Rotates a vector clockwise (SVG coordinates) by the given angle. */
function rotateVector(v: Point, degrees: number): Point {
  const rad = (degrees * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x: Math.round((v.x * cos - v.y * sin) * 1000) / 1000,
    y: Math.round((v.x * sin + v.y * cos) * 1000) / 1000,
  };
}

function portDirection(def: DeviceDefinition, port: PortDefinition): Point {
  const { x, y } = port.position;
  const candidates: Array<[number, Point]> = [
    [x, { x: -1, y: 0 }],
    [def.width - x, { x: 1, y: 0 }],
    [y, { x: 0, y: -1 }],
    [def.height - y, { x: 0, y: 1 }],
  ];
  candidates.sort((a, b) => a[0] - b[0]);
  return candidates[0][1];
}

export function getAbsolutePort(node: SchemaNode, portId: string): AbsolutePort | undefined {
  const def = getNodeDefinition(node);
  if (!def) return undefined;

  const port = def.ports.find((p) => p.id === portId);
  if (!port) return undefined;

  const rotation = normalizeRotation(node.rotation);
  const center = { x: def.width / 2, y: def.height / 2 };
  const offset = rotateVector(
    { x: port.position.x - center.x, y: port.position.y - center.y },
    rotation
  );

  return {
    nodeId: node.id,
    portId: port.id,
    x: node.position.x + center.x + offset.x,
    y: node.position.y + center.y + offset.y,
    kind: port.kind,
    direction: rotateVector(portDirection(def, port), rotation),
  };
}

/** Axis-aligned bounds of a node after rotation around its center. */
export function getNodeBounds(node: SchemaNode, def: DeviceDefinition): Rect {
  const quarterTurn = normalizeRotation(node.rotation) % 180 !== 0;
  const width = quarterTurn ? def.height : def.width;
  const height = quarterTurn ? def.width : def.height;
  return {
    x: node.position.x + (def.width - width) / 2,
    y: node.position.y + (def.height - height) / 2,
    width,
    height,
  };
}

export function buildPipePath(from: AbsolutePort, to: AbsolutePort): string {
  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  const reach = Math.max(30, distance / 2);
  const c1 = { x: from.x + from.direction.x * reach, y: from.y + from.direction.y * reach };
  const c2 = { x: to.x + to.direction.x * reach, y: to.y + to.direction.y * reach };
  return `M ${from.x} ${from.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${to.x} ${to.y}`;
}

export function portRefsEqual(a: PortRef, b: PortRef): boolean {
  return a.nodeId === b.nodeId && a.portId === b.portId;
}

export function snapToGrid(value: number, grid = 10): number {
  return Math.round(value / grid) * grid;
}
