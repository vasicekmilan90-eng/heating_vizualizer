import { describe, expect, it } from "vitest";
import { buildOrthogonalPipePath, orthogonalPoints, type AbsolutePort, type Point } from "../src/utils/geometry.js";

const port = (x: number, y: number, direction: Point): AbsolutePort => ({
  nodeId: "n",
  portId: "p",
  x,
  y,
  kind: "outlet",
  direction,
});

const RIGHT = { x: 1, y: 0 };
const LEFT = { x: -1, y: 0 };
const UP = { x: 0, y: -1 };

function isOrthogonal(points: Point[]): boolean {
  return points.every((p, i) => i === 0 || p.x === points[i - 1].x || p.y === points[i - 1].y);
}

describe("orthogonal pipes", () => {
  it("draws a straight pipe between aligned ports", () => {
    expect(orthogonalPoints(port(0, 50, RIGHT), port(200, 50, LEFT))).toEqual([
      { x: 0, y: 50 },
      { x: 200, y: 50 },
    ]);
  });

  it("bends in the middle between offset facing ports", () => {
    const points = orthogonalPoints(port(0, 50, RIGHT), port(200, 150, LEFT));
    expect(isOrthogonal(points)).toBe(true);
    expect(points).toContainEqual({ x: 100, y: 50 });
    expect(points).toContainEqual({ x: 100, y: 150 });
  });

  it("routes a return pipe around instead of through the middle", () => {
    // Outlet facing right, inlet to its left also facing right (e.g. a return to the heat pump).
    const points = orthogonalPoints(port(300, 100, RIGHT), port(100, 200, RIGHT));
    expect(isOrthogonal(points)).toBe(true);
    expect(points[1]).toEqual({ x: 320, y: 100 });
    expect(points[points.length - 2]).toEqual({ x: 120, y: 200 });
  });

  it("uses a single bend towards a port on the top edge", () => {
    expect(orthogonalPoints(port(0, -100, RIGHT), port(200, 0, UP))).toEqual([
      { x: 0, y: -100 },
      { x: 200, y: -100 },
      { x: 200, y: 0 },
    ]);
  });

  it("never enters a top port from below", () => {
    const points = orthogonalPoints(port(0, 100, RIGHT), port(200, 0, UP));
    expect(isOrthogonal(points)).toBe(true);
    expect(points[points.length - 2]).toEqual({ x: 200, y: -20 });
  });

  it("builds an SVG path with rounded bends", () => {
    const d = buildOrthogonalPipePath(port(0, 50, RIGHT), port(200, 150, LEFT));
    expect(d.startsWith("M 0 50")).toBe(true);
    expect(d).toContain("Q 100 50");
    expect(d.endsWith("L 200 150")).toBe(true);
  });
});
