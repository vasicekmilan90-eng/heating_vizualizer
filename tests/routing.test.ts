import { describe, expect, it } from "vitest";
import { getAllDeviceDefinitions, getNodeDefinition, PORT_GRID } from "../src/models/device-registry.js";
import type { AddonConfig, SchemaNode } from "../src/models/schema.js";
import {
  draggableSegments,
  moveSegment,
  pathFromPoints,
  routePoints,
  routeSkeleton,
  type AbsolutePort,
  type Point,
} from "../src/utils/geometry.js";

const at = { x: 0, y: 0 };
const allTankModules: AddonConfig[] = [
  { type: "direct_source" },
  { type: "heat_exchanger" },
  { type: "heat_exchanger" },
  { type: "dhw" },
  { type: "direct_heating" },
  { type: "circulation" },
];

describe("port grid", () => {
  const samples: SchemaNode[] = [
    ...getAllDeviceDefinitions().map((d) => ({ id: d.type, type: d.type, position: at })),
    { id: "merge", type: "junction", position: at, variant: "merge" },
    { id: "loops", type: "manifold", position: at, addons: Array.from({ length: 7 }, () => ({ type: "loop" as const })) },
    ...[50, 120, 200, 500, 1000].map((volume) => ({ id: `tank${volume}`, type: "tank", position: at, volume, addons: allTankModules })),
  ];

  it.each(samples.map((n) => [n.id, n] as const))("%s has all ports on the grid", (_id, node) => {
    for (const port of getNodeDefinition(node)?.ports ?? []) {
      expect(port.position.x % PORT_GRID, `${port.id} x`).toBe(0);
      expect(port.position.y % PORT_GRID, `${port.id} y`).toBe(0);
    }
  });

  it("keeps tank ports apart", () => {
    for (const volume of [50, 1000]) {
      const ports = getNodeDefinition({ id: "t", type: "tank", position: at, volume, addons: allTankModules })!.ports;
      for (const side of [0, 100]) {
        const ys = ports.filter((p) => p.position.x === side).map((p) => p.position.y);
        expect(new Set(ys).size, `${volume} l, x=${side}`).toBe(ys.length);
      }
    }
  });
});

const port = (x: number, y: number, direction: Point): AbsolutePort => ({ nodeId: "n", portId: "p", x, y, kind: "outlet", direction });
const RIGHT = { x: 1, y: 0 };
const LEFT = { x: -1, y: 0 };

const orthogonal = (points: Point[]): boolean =>
  points.every((p, i) => i === 0 || p.x === points[i - 1].x || p.y === points[i - 1].y);

describe("pipe editing", () => {
  it("bends a straight pipe when its only segment is dragged", () => {
    const from = port(0, 50, RIGHT);
    const to = port(200, 50, LEFT);
    const skeleton = routeSkeleton(from, to);
    expect(draggableSegments(skeleton)).toEqual([1]);

    const route = moveSegment(skeleton, 1, 37);
    expect(route).toEqual([
      [20, 90],
      [180, 90],
    ]);
    const points = routePoints(from, to, route);
    expect(orthogonal(points)).toBe(true);
    expect(points[0]).toEqual({ x: 0, y: 50 });
    expect(points[points.length - 1]).toEqual({ x: 200, y: 50 });
  });

  it("keeps a drawn route orthogonal after a device moves", () => {
    const route: [number, number][] = [
      [100, 50],
      [100, 150],
    ];
    const points = routePoints(port(0, 70, RIGHT), port(200, 130, LEFT), route);
    expect(orthogonal(points)).toBe(true);
    expect(points.some((p) => p.x === 100)).toBe(true);
    expect(points[points.length - 1]).toEqual({ x: 200, y: 130 });
  });

  it("moves an inner segment without touching the ports", () => {
    const from = port(0, 50, RIGHT);
    const to = port(200, 150, LEFT);
    const skeleton = routeSkeleton(from, to);
    const vertical = draggableSegments(skeleton).find((i) => skeleton[i].x === skeleton[i + 1].x)!;
    const points = routePoints(from, to, moveSegment(skeleton, vertical, 42));
    expect(orthogonal(points)).toBe(true);
    expect(points.some((p) => p.x === 140)).toBe(true);
  });
});

describe("pipe crossings", () => {
  it("draws a hop where a horizontal pipe crosses a vertical one", () => {
    const d = pathFromPoints(
      [
        { x: 0, y: 50 },
        { x: 200, y: 50 },
      ],
      () => [100]
    );
    expect(d).toBe("M 0 50 L 95 50 A 5 5 0 0 1 105 50 L 200 50");
  });

  it("skips hops too close to a bend", () => {
    const d = pathFromPoints(
      [
        { x: 0, y: 50 },
        { x: 100, y: 50 },
        { x: 100, y: 150 },
      ],
      () => [96]
    );
    expect(d).not.toContain(" A ");
  });
});
