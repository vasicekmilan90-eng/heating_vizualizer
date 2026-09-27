import type { EntityNameConfig } from "../types/home-assistant.js";
import type { AddonSpec, AddonType } from "./addons.js";

export const SCHEMA_VERSION = 2;

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

export interface DeviceDefinition {
  type: string;
  labelKey: string;
  width: number;
  height: number;
  ports: PortDefinition[];
  addons?: AddonSpec[];
  /** Device shows its entity value: `only` = value display, `with_state` = value plus on/off. */
  valueDisplay?: "only" | "with_state";
  /** Builds the node-specific geometry, e.g. from the number of loops. */
  resolve?: (node: SchemaNode) => DeviceDefinition;
}

/** Entity binding shared by devices and add-ons. */
export interface NodeStateBinding {
  entity_id?: string;
  active_state?: string;
  /** Attribute displayed instead of the state, e.g. `current_temperature`. */
  value_attribute?: string;
  mode_attribute?: string;
  branch_a_value?: string;
  branch_b_value?: string;
}

export interface AddonConfig extends NodeStateBinding {
  type: AddonType;
  slot?: string;
  name?: string;
  /** Loops only: optional room temperature. */
  temperature_entity_id?: string;
}

export interface SchemaNode extends NodeStateBinding {
  id: string;
  type: string;
  /** Custom label; defaults to the translated device type name. */
  name?: string;
  position: { x: number; y: number };
  rotation?: number;
  addons?: AddonConfig[];
}

export interface PortRef {
  nodeId: string;
  portId: string;
}

/** Pipe from an outlet to an inlet, both written as `node_id.port_id`. */
export interface Connection {
  from: string;
  to: string;
}

export function formatPortRef(ref: PortRef): string {
  return `${ref.nodeId}.${ref.portId}`;
}

export function parsePortRef(value: string): PortRef | undefined {
  const dot = value.lastIndexOf(".");
  if (dot <= 0 || dot === value.length - 1) return undefined;
  return { nodeId: value.slice(0, dot), portId: value.slice(dot + 1) };
}

export function connectionId(connection: Connection): string {
  return `${connection.from}>${connection.to}`;
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
  /** Passed to `formatEntityName`. */
  name?: EntityNameConfig;
  template?: string;
  rules?: OverlayStateRule[];
}

export interface HeatingSchema {
  nodes: SchemaNode[];
  connections: Connection[];
  overlays: SchemaOverlay[];
}

export type PipeStyle = "orthogonal" | "curved";

export interface HeatingVisualizerConfig extends Partial<HeatingSchema> {
  type: string;
  schema_version?: number;
  /** Defaults to `orthogonal`. */
  pipe_style?: PipeStyle;
  /** Keys managed by the dashboard (grid_options, visibility, view_layout, …). */
  [key: string]: unknown;
}

export const EMPTY_SCHEMA: HeatingSchema = {
  nodes: [],
  connections: [],
  overlays: [],
};

export function schemaOf(config: HeatingVisualizerConfig): HeatingSchema {
  return {
    nodes: config.nodes ?? [],
    connections: config.connections ?? [],
    overlays: config.overlays ?? [],
  };
}

export function generateId(prefix: string): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
