import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCard, LovelaceCardEditor } from "./types/home-assistant.js";
import {
  EMPTY_SCHEMA,
  normalizeConfig,
  type HeatingVisualizerConfig,
} from "./models/schema.js";
import { createTranslator } from "./i18n/index.js";
import "./renderer/schema-canvas.js";
import "./editor/card-editor.js";

@customElement("heating-visualizer-card")
export class HeatingVisualizerCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config!: HeatingVisualizerConfig;

  static styles = css`
    :host {
      display: block;
    }
    ha-card {
      overflow: hidden;
    }
    .empty {
      padding: 24px;
      text-align: center;
      opacity: 0.8;
      font-family: var(--ha-font-family, sans-serif);
      color: var(--primary-text-color, #e0e0e0);
    }
  `;

  public setConfig(config: HeatingVisualizerConfig): void {
    if (!config || typeof config !== "object") {
      throw new Error("Invalid card configuration");
    }
    this._config = normalizeConfig(config);
  }

  public getCardSize(): number {
    return 1;
  }

  static getConfigElement(): LovelaceCardEditor {
    return document.createElement("heating-visualizer-editor") as LovelaceCardEditor;
  }

  static getStubConfig(): Record<string, unknown> {
    return {
      type: "custom:heating-visualizer-card",
      language: "cs",
      schema: EMPTY_SCHEMA,
      translations: {},
    };
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;

    const schema = this._config.schema!;
    const t = createTranslator(this._config.language, this._config.translations);

    return html`
      <ha-card>
        ${!schema.nodes.length && !schema.overlays.length
          ? html`<div class="empty">${t.t("card.empty")}</div>`
          : html`
            <heating-schema-canvas
              .hass="${this.hass}"
              .config="${this._config}"
              .schema="${schema}"
              .editable="${false}"
            ></heating-schema-canvas>
          `}
      </ha-card>
    `;
  }
}

interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
  documentationURL?: string;
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
  }
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: "heating-visualizer-card",
  name: "Heating Visualizer",
  description: "Design and visualize heating system schemas with live sensor overlays.",
  preview: true,
});

// Expose for debugging and HA tooling (2026.x custom card convention)
(window as unknown as { HeatingVisualizerCard: typeof HeatingVisualizerCard }).HeatingVisualizerCard =
  HeatingVisualizerCard;

console.info(
  "%c HEATING-VISUALIZER-CARD %c v0.1.0 · HA 2026.7 ",
  "color: white; background: #039be5; font-weight: bold;",
  "color: #039be5; background: white; font-weight: bold;"
);
