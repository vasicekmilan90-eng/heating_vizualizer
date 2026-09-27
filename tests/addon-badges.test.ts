import { describe, expect, it } from "vitest";
import { badgeAddons, layoutBadges } from "../src/renderer/devices/addon-badges.js";
import type { ResolvedAddon } from "../src/renderer/devices/common.js";
import type { AddonType } from "../src/models/addons.js";

const addon = (type: AddonType, value = "42 °C", entity = true): ResolvedAddon => ({
  config: { type, entity_id: entity ? `sensor.${type}` : undefined },
  state: { active: false, value },
});

describe("add-on badges", () => {
  it("skips add-ons drawn by the device, without entity, or without drawing", () => {
    const addons = [
      addon("temperature"),
      addon("defrost"),
      addon("pump", "on"),
      addon("alarm", "off", false),
      { config: { type: "heat_exchanger" as const }, state: { active: false } },
    ];
    expect(badgeAddons("heat_pump", addons).map((a) => a.config.type)).toEqual(["pump"]);
    expect(badgeAddons("radiator", addons).map((a) => a.config.type)).toEqual(["temperature", "defrost", "pump"]);
  });

  it("wraps badges into rows within the device width", () => {
    const { boxes, height } = layoutBadges([addon("temperature"), addon("setpoint"), addon("value")], 120);
    expect(boxes[0].y).toBe(0);
    expect(boxes.some((b) => b.y > 0)).toBe(true);
    expect(boxes.every((b) => b.x + b.width <= 120 || b.x === 0)).toBe(true);
    expect(height).toBeGreaterThan(18);
  });

  it("shows binary add-ons as icons only", () => {
    const { boxes } = layoutBadges([addon("pump", "on")], 120);
    expect(boxes[0].text).toBeUndefined();
  });
});
