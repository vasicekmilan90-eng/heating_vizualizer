import type { HeatingVisualizerConfig } from "../models/schema.js";

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  localize(key: string, ...args: unknown[]): string;
  language: string;
}

/** Lovelace card contract used by Home Assistant 2026.x */
export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: HeatingVisualizerConfig): void;
  getCardSize?(): number;
}

/** Visual card editor shown in dashboard card settings (HA 2026.x) */
export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: HeatingVisualizerConfig): void;
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-card": HTMLElement;
    "ha-entity-picker": HTMLElement;
  }
}

export {};
