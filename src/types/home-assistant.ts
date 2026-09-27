import type { HeatingVisualizerConfig } from "../models/schema.js";

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export type HassEntities = Record<string, HassEntity>;

export type EntityNameItem =
  | { type: "entity" | "device" | "area" | "floor" }
  | { type: "text"; text: string };

export type EntityNameConfig = string | EntityNameItem | EntityNameItem[];

/** Value of the `hassFormatters` context (HA 2026.4+). */
export interface HomeAssistantFormatters {
  formatEntityState(stateObj: HassEntity, state?: string): string;
  formatEntityAttributeValue(stateObj: HassEntity, attribute: string, value?: unknown): string;
  formatEntityAttributeName(stateObj: HassEntity, attribute: string): string;
  formatEntityName(
    stateObj: HassEntity,
    name: EntityNameConfig | undefined,
    options?: { separator?: string }
  ): string;
}

/** Value of the `hassInternationalization` context (HA 2026.5+). */
export interface HomeAssistantInternationalization {
  language: string;
  localize(key: string, ...args: unknown[]): string;
}

export interface HomeAssistant extends HomeAssistantFormatters {
  states: HassEntities;
  language: string;
  localize(key: string, ...args: unknown[]): string;
}

/** Sizing rules for the sections view grid. */
export interface LovelaceGridOptions {
  columns?: number | "full";
  rows?: number | "auto";
  min_columns?: number;
  max_columns?: number;
  min_rows?: number;
  max_rows?: number;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: HeatingVisualizerConfig): void;
  getCardSize?(): number | Promise<number>;
  getGridOptions?(): LovelaceGridOptions;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: HeatingVisualizerConfig): void;
}

/** Subset of the `ha-form` schema used by the editor. */
export interface HaFormSelectorSchema {
  name: string;
  selector: Record<string, unknown>;
  required?: boolean;
  context?: Record<string, string>;
  /** Conditional visibility, available in ha-form since HA 2026.8. */
  visible?: { field: string; value: unknown };
}

export interface HaFormGridSchema {
  type: "grid";
  name: string;
  flatten?: boolean;
  column_min_width?: string;
  schema: HaFormSelectorSchema[];
}

export type HaFormSchema = HaFormSelectorSchema | HaFormGridSchema;

interface LovelaceCardHelpers {
  createCardElement(config: Record<string, unknown>): HTMLElement;
}

declare global {
  interface Window {
    loadCardHelpers?: () => Promise<LovelaceCardHelpers>;
  }
}

export {};
