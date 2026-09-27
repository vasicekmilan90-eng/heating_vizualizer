import { describe, expect, it } from "vitest";
import { filterOptions } from "../src/editor/filter.js";

const options = [
  { value: "sensor.tc_vratka", label: "TČ Vratka" },
  { value: "sensor.bojler_teplota", label: "Bojler – teplota nahoře" },
  { value: "switch.bojler_patrona", label: "Bojler patrona" },
];

describe("filterOptions", () => {
  it("matches all words in the id or name, ignoring case and diacritics", () => {
    expect(filterOptions(options, "bojler").map((o) => o.value)).toEqual([
      "sensor.bojler_teplota",
      "switch.bojler_patrona",
    ]);
    expect(filterOptions(options, "BOJLER nahore").map((o) => o.value)).toEqual(["sensor.bojler_teplota"]);
    expect(filterOptions(options, "tč vratka").map((o) => o.value)).toEqual(["sensor.tc_vratka"]);
  });

  it("returns everything for an empty query and respects the limit", () => {
    expect(filterOptions(options, "  ")).toHaveLength(3);
    expect(filterOptions(options, "", 2)).toHaveLength(2);
  });
});
