import { describe, expect, it } from "vitest";
import { createTranslator, resolveLanguage } from "../src/i18n/translations.js";
import cs from "../src/translations/cs.json";
import en from "../src/translations/en.json";

type Tree = { [key: string]: string | Tree };

function keys(tree: Tree, prefix = ""): string[] {
  return Object.entries(tree).flatMap(([key, value]) =>
    typeof value === "string" ? [`${prefix}${key}`] : keys(value, `${prefix}${key}.`)
  );
}

describe("translations", () => {
  it("resolves regional HA language codes to bundled languages", () => {
    expect(resolveLanguage("cs")).toBe("cs");
    expect(resolveLanguage("en-GB")).toBe("en");
    expect(resolveLanguage("de")).toBe("en");
    expect(resolveLanguage(undefined)).toBe("en");
  });

  it("falls back to English and then to the key", () => {
    expect(createTranslator("de").t("devices.boiler.name")).toBe(createTranslator("en").t("devices.boiler.name"));
    expect(createTranslator("cs").t("does.not.exist")).toBe("does.not.exist");
  });

  it("replaces placeholders", () => {
    expect(createTranslator("en").t("devices.manifold.channel", "3")).toBe("Loop 3");
  });

  it("keeps every language file complete", () => {
    expect(keys(cs as Tree).sort()).toEqual(keys(en as Tree).sort());
  });
});
