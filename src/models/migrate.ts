import type { AddonConfig, Connection, HeatingVisualizerConfig, NodeStateBinding, SchemaNode, SchemaOverlay } from "./schema.js";
import { SCHEMA_VERSION } from "./schema.js";
import { BOILER_TEMPERATURE_SLOTS, TANK_TEMPERATURE_SLOTS } from "./device-registry.js";

const CARD_TYPE = "custom:heating-visualizer-card";

/** Device types merged in 0.3.1; port ids are identical, so pipes keep working. */
const LEGACY_TYPES: Record<string, string> = {
  outdoor_unit: "heat_pump",
  gas_boiler: "heating_boiler",
  electric_boiler: "heating_boiler",
  solid_fuel_boiler: "heating_boiler",
  flow_meter: "pipe_sensor",
  pressure_gauge: "pipe_sensor",
  heat_meter: "pipe_sensor",
  dhw_circulation_pump: "circulation_pump",
};

type V1Channel = NodeStateBinding & { name?: string };

interface V1Node {
  id: string;
  type: string;
  name?: string;
  position?: { x: number; y: number };
  rotation?: number;
  state?: NodeStateBinding;
  channels?: V1Channel[];
  heater?: NodeStateBinding;
}

interface V1Edge {
  from: { nodeId: string; portId: string };
  to: { nodeId: string; portId: string };
}

interface V1Schema {
  nodes?: V1Node[];
  edges?: V1Edge[];
  overlays?: (SchemaOverlay & { labelKey?: string })[];
}

/** v1 drew n tank sensors evenly from top to bottom; map them to the named slots. */
const TANK_SLOT_LAYOUT: Record<number, string[]> = {
  1: ["middle"],
  2: ["top", "bottom"],
  3: ["top", "middle", "bottom"],
  4: ["top", "upper", "lower", "bottom"],
  5: [...TANK_TEMPERATURE_SLOTS],
};

function channelsToAddons(type: string, channels: V1Channel[]): AddonConfig[] {
  if (type === "manifold") {
    return channels.map((c) => ({ ...c, type: "loop" as const }));
  }
  const withEntity = channels.filter((c) => c.entity_id);
  if (type === "buffer_tank") {
    const slots = TANK_SLOT_LAYOUT[Math.min(withEntity.length, 5)] ?? [];
    return withEntity.slice(0, 5).map((c, i) => ({ ...c, type: "temperature" as const, slot: slots[i] }));
  }
  if (type === "boiler") {
    const slots = [BOILER_TEMPERATURE_SLOTS[0], BOILER_TEMPERATURE_SLOTS[2]];
    return withEntity.slice(0, 2).map((c, i) => ({ ...c, type: "temperature" as const, slot: slots[i] }));
  }
  return withEntity.map((c) => ({ ...c, type: "value" as const }));
}

function migrateNode(node: V1Node): SchemaNode {
  const type = LEGACY_TYPES[node.type] ?? node.type;
  const addons: AddonConfig[] = [];
  if (node.channels?.length) addons.push(...channelsToAddons(type, node.channels));
  // v1 manifolds without channels were drawn with four loops.
  if (type === "manifold" && !node.channels?.length) {
    addons.push(...Array.from({ length: 4 }, () => ({ type: "loop" as const })));
  }
  if (node.heater?.entity_id) addons.push({ ...node.heater, type: "electric_heater" });

  return {
    id: node.id,
    type,
    name: node.name,
    position: node.position ?? { x: 0, y: 0 },
    rotation: node.rotation,
    ...node.state,
    addons: addons.length ? addons : undefined,
  };
}

function migrateV1(config: Record<string, unknown>): HeatingVisualizerConfig {
  const { schema, language: _language, translations: _translations, ...rest } = config as {
    schema?: V1Schema;
    language?: unknown;
    translations?: unknown;
  } & Record<string, unknown>;
  void _language;
  void _translations;

  const connections: Connection[] = (schema?.edges ?? []).map((edge) => ({
    from: `${edge.from.nodeId}.${edge.from.portId}`,
    to: `${edge.to.nodeId}.${edge.to.portId}`,
  }));
  const overlays: SchemaOverlay[] = (schema?.overlays ?? []).map(({ labelKey: _labelKey, ...overlay }) => {
    void _labelKey;
    return overlay;
  });

  return {
    ...rest,
    type: CARD_TYPE,
    schema_version: SCHEMA_VERSION,
    nodes: (schema?.nodes ?? []).map(migrateNode),
    connections,
    overlays,
  };
}

/** Brings any stored configuration to the current schema version; unknown keys are preserved. */
export function normalizeConfig(config: Partial<HeatingVisualizerConfig>): HeatingVisualizerConfig {
  const raw = config as Record<string, unknown>;
  const version = typeof raw.schema_version === "number" ? raw.schema_version : raw.schema ? 1 : SCHEMA_VERSION;
  const migrated = version < 2 ? migrateV1(raw) : ({ ...raw } as HeatingVisualizerConfig);

  return {
    ...migrated,
    type: typeof raw.type === "string" ? raw.type : CARD_TYPE,
    schema_version: SCHEMA_VERSION,
    nodes: (migrated.nodes ?? []).map((n) => (LEGACY_TYPES[n.type] ? { ...n, type: LEGACY_TYPES[n.type] } : n)),
    connections: migrated.connections ?? [],
    overlays: migrated.overlays ?? [],
  };
}
