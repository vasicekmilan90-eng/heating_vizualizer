import { describe, expect, it } from "vitest";
import { detailDescription, heatPumpDetail } from "../src/renderer/devices/heat-pump-detail.js";
import type { ResolvedAddon } from "../src/renderer/devices/common.js";
import type { AddonConfig } from "../src/models/schema.js";
import type { NodeVisualState } from "../src/utils/entity.js";
import { createTranslator } from "../src/i18n/index.js";

function addon(config: Partial<AddonConfig> & Pick<AddonConfig, "type">, state: Partial<NodeVisualState>): ResolvedAddon {
  return { config: { entity_id: `sensor.${config.type}_${config.slot ?? ""}`, ...config }, state: { active: false, ...state } };
}

const t = createTranslator("en");

describe("heatPumpDetail", () => {
  const addons = [
    addon({ type: "temperature", slot: "outdoor" }, { value: "3.4 °C", numeric: 3.4 }),
    addon({ type: "temperature", slot: "suction", name: "TH" }, { value: "1.8 °C", numeric: 1.8 }),
    addon({ type: "value", slot: "high_pressure" }, { value: "26.1 bar", numeric: 26.1 }),
    addon({ type: "compressor" }, { active: true, value: "58 Hz", numeric: 58 }),
    addon({ type: "pump" }, { active: false }),
    addon({ type: "temperature", slot: "return" }, {}),
    { config: { type: "temperature", slot: "supply" }, state: { active: false } },
  ];

  it("collects readings by slot with user names, slot names and temperature colors", () => {
    const detail = heatPumpDetail("HP", undefined, { active: true, operation: "heating" }, addons, t);
    expect(detail.temperatures.outdoor).toMatchObject({ label: "Outdoor", text: "3.4 °C" });
    expect(detail.temperatures.outdoor.color).toMatch(/^hsl/);
    expect(detail.temperatures.suction.label).toBe("TH");
    expect(detail.values.high_pressure).toMatchObject({ label: "High pressure", text: "26.1 bar" });
    expect(detail.temperatures.return.text).toBe("—");
    // Add-ons without an entity are not drawn.
    expect(detail.temperatures.supply).toBeUndefined();
  });

  it("takes the compressor frequency from the compressor add-on and the water flow from the pump", () => {
    const detail = heatPumpDetail("HP", "split", { active: true }, addons, t);
    expect(detail.values.frequency).toMatchObject({ label: "Compressor frequency", text: "58 Hz", numeric: 58 });
    expect(detail.pump.active).toBe(false);
    expect(detail.split).toBe(true);
    expect(detail.heater).toBeUndefined();
  });

  it("describes the operation and readings for screen readers", () => {
    const detail = heatPumpDetail("HP", undefined, { active: true, operation: "defrost" }, addons, t);
    expect(detailDescription(detail, t)).toContain("HP; Defrosting; Outdoor: 3.4 °C");
  });
});
