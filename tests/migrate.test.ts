import { describe, expect, it } from "vitest";
import { normalizeConfig } from "../src/models/migrate.js";
import { SCHEMA_VERSION } from "../src/models/schema.js";

const CARD = "custom:heating-visualizer-card";

describe("normalizeConfig", () => {
  it("migrates a v1 config to v2", () => {
    const config = normalizeConfig({
      type: CARD,
      grid_options: { columns: 6 },
      language: "cs",
      translations: { cs: {} },
      schema: {
        nodes: [
          {
            id: "hp",
            type: "outdoor_unit",
            position: { x: 10, y: 20 },
            state: { entity_id: "climate.hp", active_state: "heat" },
            heater: { entity_id: "switch.backup" },
          },
          {
            id: "tank",
            type: "buffer_tank",
            position: { x: 200, y: 0 },
            channels: [{ entity_id: "sensor.t1" }, {}, { entity_id: "sensor.t3" }],
          },
          { id: "m", type: "manifold", position: { x: 400, y: 0 } },
        ],
        edges: [{ id: "e1", from: { nodeId: "hp", portId: "hot_out" }, to: { nodeId: "tank", portId: "source_in" } }],
        overlays: [{ id: "o", entity_id: "sensor.x", position: { x: 0, y: 0 }, labelKey: "old" }],
      },
    } as never);

    expect(config.schema_version).toBe(SCHEMA_VERSION);
    expect(config.type).toBe(CARD);
    expect(config.grid_options).toEqual({ columns: 6 });
    expect("schema" in config).toBe(false);
    expect("language" in config).toBe(false);
    expect("translations" in config).toBe(false);

    const [hp, tank, manifold] = config.nodes!;
    expect(hp.type).toBe("heat_pump");
    expect(hp.entity_id).toBe("climate.hp");
    expect(hp.active_state).toBe("heat");
    expect(hp.addons).toEqual([{ entity_id: "switch.backup", type: "electric_heater" }]);

    expect(tank.addons).toEqual([
      { entity_id: "sensor.t1", type: "temperature", slot: "top" },
      { entity_id: "sensor.t3", type: "temperature", slot: "bottom" },
    ]);
    expect(manifold.addons).toHaveLength(4);

    expect(config.connections).toEqual([{ from: "hp.hot_out", to: "tank.source_in" }]);
    expect(config.overlays![0]).not.toHaveProperty("labelKey");
  });

  it("keeps v2 configs and maps legacy device types", () => {
    const config = normalizeConfig({
      type: CARD,
      schema_version: 2,
      nodes: [{ id: "p", type: "dhw_circulation_pump", position: { x: 0, y: 0 } }],
    });
    expect(config.nodes![0].type).toBe("circulation_pump");
    expect(config.connections).toEqual([]);
    expect(config.overlays).toEqual([]);
  });

  it("treats a config without schema as an empty v2 config", () => {
    const config = normalizeConfig({ type: CARD });
    expect(config).toMatchObject({ schema_version: SCHEMA_VERSION, nodes: [], connections: [], overlays: [] });
  });
});
