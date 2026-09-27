import { describe, expect, it } from "vitest";
import { createTranslator } from "../src/i18n/translations.js";
import { nodeDescription } from "../src/renderer/a11y.js";

const t = createTranslator("en");

describe("nodeDescription", () => {
  it("combines the state and add-on values", () => {
    const text = nodeDescription(
      "Heat pump",
      { active: true, value: "Heat" },
      true,
      [
        { config: { type: "defrost", entity_id: "binary_sensor.d" }, state: { active: false, value: "Off" } },
        { config: { type: "temperature", slot: "return", entity_id: "sensor.t" }, state: { active: false, value: "30 °C" } },
        { config: { type: "heat_exchanger" }, state: { active: false } },
      ],
      t
    );
    expect(text).toBe("Heat pump: Heat, running; Defrost: Off; Temperature sensor – return: 30 °C");
  });

  it("uses only the name for devices without entity", () => {
    expect(nodeDescription("Junction", { active: false }, false, [], t)).toBe("Junction");
  });
});
