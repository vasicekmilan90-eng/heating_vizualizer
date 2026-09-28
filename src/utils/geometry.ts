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
    x: Math.round((v.x * cos - v.y * sin) * 1000) / 1000 || 0,
    y: Math.round((v.x * sin + v.y * cos) * 1000) / 1000 || 0,
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

const PIPE_STUB = 20;
const PIPE_CORNER_RADIUS = 8;

const ahead = (value: number, origin: number, direction: number): boolean => (value - origin) * direction >= 0;

/** Bend points between the two stub ends; each stub end continues away from its device. */
function orthogonalRoute(a: Point, da: Point, b: Point, db: Point): Point[] {
  const horizontalA = da.x !== 0;
  const horizontalB = db.x !== 0;

  if (horizontalA && horizontalB) {
    const mx = (a.x + b.x) / 2;
    if (ahead(mx, a.x, da.x) && ahead(mx, b.x, db.x)) return [{ x: mx, y: a.y }, { x: mx, y: b.y }];
    const my = (a.y + b.y) / 2;
    return [{ x: a.x, y: my }, { x: b.x, y: my }];
  }
  if (!horizontalA && !horizontalB) {
    const my = (a.y + b.y) / 2;
    if (ahead(my, a.y, da.y) && ahead(my, b.y, db.y)) return [{ x: a.x, y: my }, { x: b.x, y: my }];
    const mx = (a.x + b.x) / 2;
    return [{ x: mx, y: a.y }, { x: mx, y: b.y }];
  }
  if (horizontalA) {
    const corner = { x: b.x, y: a.y };
    return ahead(corner.x, a.x, da.x) && ahead(corner.y, b.y, db.y) ? [corner] : [{ x: a.x, y: b.y }];
  }
  const corner = { x: a.x, y: b.y };
  return ahead(corner.y, a.y, da.y) && ahead(corner.x, b.x, db.x) ? [corner] : [{ x: b.x, y: a.y }];
}

/** Drops repeated and collinear points so only real bends remain. */
function simplify(points: Point[]): Point[] {
  const unique = points.filter((p, i) => i === 0 || p.x !== points[i - 1].x || p.y !== points[i - 1].y);
  return unique.filter((p, i) => {
    if (i === 0 || i === unique.length - 1) return true;
    const prev = unique[i - 1];
    const next = unique[i + 1];
    return (prev.x - p.x) * (next.y - p.y) !== (prev.y - p.y) * (next.x - p.x);
  });
}

export function orthogonalPoints(from: AbsolutePort, to: AbsolutePort): Point[] {
  return simplify(routeSkeleton(from, to));
}

/** User-drawn bend points of a pipe, `[x, y]` in schema coordinates. */
export type RoutePoint = [number, number];

function stubEnd(port: AbsolutePort): Point {
  return { x: port.x + port.direction.x * PIPE_STUB, y: port.y + port.direction.y * PIPE_STUB };
}

/**
 * Editable form of a pipe: port, stub end, bends, stub end, port. Without `route` the bends are chosen
 * automatically; with it, elbows are added where a device moved so the pipe stays orthogonal.
 */
export function routeSkeleton(from: AbsolutePort, to: AbsolutePort, route?: RoutePoint[]): Point[] {
  const a = stubEnd(from);
  const b = stubEnd(to);
  const bends = route?.length
    ? route.map(([x, y]) => ({ x, y }))
    : orthogonalRoute(a, from.direction, b, to.direction);
  const points: Point[] = [{ x: from.x, y: from.y }, a];
  const add = (p: Point, horizontalFirst: boolean): void => {
    const last = points[points.length - 1];
    if (last.x !== p.x && last.y !== p.y) points.push(horizontalFirst ? { x: p.x, y: last.y } : { x: last.x, y: p.y });
    points.push(p);
  };
  bends.forEach((p, i) => add(p, i === 0 ? from.direction.x !== 0 : true));
  // The last segment must reach the stub end along the inlet's axis.
  add(b, to.direction.x === 0);
  points.push({ x: to.x, y: to.y });

  const unique = points.filter((p, i) => i === 0 || p.x !== points[i - 1].x || p.y !== points[i - 1].y);
  // Stub ends are kept even when collinear: they anchor the segments users can drag.
  return unique.filter((p, i) => {
    if (i <= 1 || i >= unique.length - 2) return true;
    const prev = unique[i - 1];
    const next = unique[i + 1];
    return (prev.x - p.x) * (next.y - p.y) !== (prev.y - p.y) * (next.x - p.x);
  });
}

export function routePoints(from: AbsolutePort, to: AbsolutePort, route?: RoutePoint[]): Point[] {
  return simplify(routeSkeleton(from, to, route));
}

/** Segments of a skeleton users can drag: all except the two stubs at the ports. */
export function draggableSegments(skeleton: Point[]): number[] {
  const indexes: number[] = [];
  for (let i = 1; i < skeleton.length - 2; i++) indexes.push(i);
  return indexes;
}

/**
 * Moves segment `index` (from point `index` to `index + 1`) across its direction and returns the new
 * route. Segments at a stub get an extra joint so the stub stays attached to its port.
 */
export function moveSegment(skeleton: Point[], index: number, delta: number, grid = 10): RoutePoint[] {
  const points = skeleton.map((p) => ({ ...p }));
  const horizontal = points[index].y === points[index + 1].y;
  let i = index;
  if (i === 1) {
    points.splice(1, 0, { ...points[1] });
    i++;
  }
  let j = i + 1;
  if (j === points.length - 2) points.splice(j + 1, 0, { ...points[j] });
  if (horizontal) {
    const y = snapToGrid(points[i].y + delta, grid);
    points[i].y = y;
    points[j].y = y;
  } else {
    const x = snapToGrid(points[i].x + delta, grid);
    points[i].x = x;
    points[j].x = x;
  }
  j = points.length - 2;
  return points.slice(2, j).map((p) => [p.x, p.y]);
}

const HOP_RADIUS = 5;

/**
 * Pipe through `points` with rounded bends. `hopsAt` returns x positions where a horizontal segment
 * jumps over another pipe with a small arc, the usual way to show crossing pipes that are not connected.
 */
export function pathFromPoints(points: Point[], hopsAt?: (p: Point, q: Point) => number[]): string {
  const straight = (s: Point, e: Point, p: Point, q: Point): string => {
    const xs = s.y === e.y && s.x !== e.x && hopsAt ? hopsAt(p, q) : [];
    if (!xs.length) return ` L ${e.x} ${e.y}`;
    const dir = Math.sign(e.x - s.x);
    let d = "";
    let cursor = s.x;
    for (const x of [...xs].sort((u, v) => (u - v) * dir)) {
      if ((x - cursor) * dir < HOP_RADIUS + 1 || (e.x - x) * dir < HOP_RADIUS + 1) continue;
      d += ` L ${x - HOP_RADIUS * dir} ${s.y} A ${HOP_RADIUS} ${HOP_RADIUS} 0 0 ${dir > 0 ? 1 : 0} ${x + HOP_RADIUS * dir} ${s.y}`;
      cursor = x + HOP_RADIUS * dir;
    }
    return `${d} L ${e.x} ${e.y}`;
  };

  let d = `M ${points[0].x} ${points[0].y}`;
  let cursor = points[0];
  for (let i = 1; i < points.length; i++) {
    const [prev, p, next] = [points[i - 1], points[i], points[i + 1]];
    if (!next) {
      d += straight(cursor, p, prev, p);
      break;
    }
    const inLength = Math.hypot(p.x - prev.x, p.y - prev.y);
    const outLength = Math.hypot(next.x - p.x, next.y - p.y);
    const r = Math.min(PIPE_CORNER_RADIUS, inLength / 2, outLength / 2);
    const start = { x: p.x - ((p.x - prev.x) / inLength) * r, y: p.y - ((p.y - prev.y) / inLength) * r };
    const end = { x: p.x + ((next.x - p.x) / outLength) * r, y: p.y + ((next.y - p.y) / outLength) * r };
    d += `${straight(cursor, start, prev, p)} Q ${p.x} ${p.y} ${end.x} ${end.y}`;
    cursor = end;
  }
  return d;
}

/** Pipe drawn with horizontal and vertical segments and rounded bends. */
export function buildOrthogonalPipePath(from: AbsolutePort, to: AbsolutePort): string {
  return pathFromPoints(orthogonalPoints(from, to));
}

export function portRefsEqual(a: PortRef, b: PortRef): boolean {
  return a.nodeId === b.nodeId && a.portId === b.portId;
}

export function snapToGrid(value: number, grid = 10): number {
  return Math.round(value / grid) * grid;
}
