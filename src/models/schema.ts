import type { EntityNameConfig } from "../types/home-assistant.js";

export type PortKind = "inlet" | "outlet";

export interface PortDefinition {
  id: string;
  labelKey: string;
  /** Placeholder values for `labelKey`, e.g. the loop number. */
  labelArgs?: string[];
  kind: PortKind;
  /** Offset from node origin in device-local coordinates */
  position: { x: number; y: number };
}

/** Repeated sub-elements of a device, e.g. manifold loops with their actuators. */
export interface ChannelSpec {
  /** `switch` channels show on/off state, `sensor` channels show the entity value. */
  kind: "switch" | "sensor";
  titleKey: string;
  itemKey: string;
  min: number;
  max: number;
  default: number;
}

export interface DeviceDefinition {
  type: string;
  labelKey: string;
  width: number;
  height: number;
  ports: PortDefinition[];
  channels?: ChannelSpec;
  /** Device can contain an electric heating element with its own entity. */
  heater?: boolean;
  /** Device shows its entity value: `only` = value display, `with_state` = value plus on/off. */
  valueDisplay?: "only" | "with_state";
  /** Builds the node-specific geometry, e.g. from the channel count. */
  resolve?: (node: SchemaNode) => DeviceDefinition;
}

export interface SchemaNode {
  id: string;
  type: string;
  /** Custom label; defaults to the translated device type name. */
  name?: string;
  position: { x: number; y: number };
  rotation?: number;
  state?: NodeStateBinding;
  channels?: ChannelBinding[];
  heater?: NodeStateBinding;
}

export interface ChannelBinding extends NodeStateBinding {
  name?: string;
}

export interface NodeStateBinding {
  entity_id?: string;
  active_state?: string;
  /** Attribute displayed instead of the state, e.g. `current_temperature`. */
  value_attribute?: string;
  mode_attribute?: string;
  branch_a_value?: string;
  branch_b_value?: string;
}

export interface PortRef {
  nodeId: string;
  portId: string;
}

export interface SchemaEdge {
  id: string;
  from: PortRef;
  to: PortRef;
}

export type OverlayConditionType = "state" | "numeric";

export interface OverlayStateRule {
  condition: OverlayConditionType;
  /** Defaults to the overlay entity. */
  entity?: string;
  state?: string;
  below?: number;
  above?: number;
  effect: {
    /** HA `ui_color` name (e.g. `red`, `primary`) or any CSS color. */
    color?: string;
    class?: string;
    visible?: boolean;
  };
}

export interface SchemaOverlay {
  id: string;
  position: { x: number; y: number };
  entity_id: string;
  /** Passed to `formatEntityName`; ignored when `labelKey` is set. */
  name?: EntityNameConfig;
  labelKey?: string;
  template?: string;
  rules?: OverlayStateRule[];
}

export interface HeatingSchema {
  nodes: SchemaNode[];
  edges: SchemaEdge[];
  overlays: SchemaOverlay[];
}

export type TranslationMap = Record<string, string>;

export type TranslationsConfig = Record<string, TranslationMap>;

export interface HeatingVisualizerConfig {
  type: string;
  schema?: HeatingSchema;
  /** Falls back to the Home Assistant user language when unset. */
  language?: string;
  translations?: TranslationsConfig;
  /** Keys managed by the dashboard (grid_options, visibility, view_layout, …). */
  [key: string]: unknown;
}

export const DEFAULT_LANGUAGE = "en";

export const EMPTY_SCHEMA: HeatingSchema = {
  nodes: [],
  edges: [],
  overlays: [],
};

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

export function normalizeSchema(schema?: Partial<HeatingSchema>): HeatingSchema {
  return {
    nodes: (schema?.nodes ?? []).map((node) =>
      LEGACY_TYPES[node.type] ? { ...node, type: LEGACY_TYPES[node.type] } : node
    ),
    edges: [...(schema?.edges ?? [])],
    overlays: [...(schema?.overlays ?? [])],
  };
}

export function normalizeConfig(
  config: Partial<HeatingVisualizerConfig>
): HeatingVisualizerConfig {
  return {
    ...config,
    type: "custom:heating-visualizer-card",
    schema: normalizeSchema(config.schema),
  };
}

export function generateId(prefix: string): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
