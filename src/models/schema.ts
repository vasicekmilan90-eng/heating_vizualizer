export type PortKind = "inlet" | "outlet";

export interface PortDefinition {
  id: string;
  labelKey: string;
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
}

export interface SchemaNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  rotation?: number;
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
  entity: string;
  state?: string;
  below?: number;
  above?: number;
  effect: {
    color?: string;
    class?: string;
    visible?: boolean;
  };
}

export interface SchemaOverlay {
  id: string;
  position: { x: number; y: number };
  entity_id: string;
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
  language?: string;
  translations?: TranslationsConfig;
}

export const DEFAULT_LANGUAGE = "en";

export const EMPTY_SCHEMA: HeatingSchema = {
  nodes: [],
  edges: [],
  overlays: [],
};

export function normalizeConfig(
  config: Partial<HeatingVisualizerConfig>
): HeatingVisualizerConfig {
  return {
    type: "custom:heating-visualizer-card",
    schema: config.schema ?? EMPTY_SCHEMA,
    language: config.language ?? DEFAULT_LANGUAGE,
    translations: config.translations ?? {},
  };
}

export function generateId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
}
