import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type {
  HomeAssistantInternationalization,
  LovelaceCard,
  LovelaceCardEditor,
  LovelaceGridOptions,
} from "./types/home-assistant.js";
import { EMPTY_SCHEMA, SCHEMA_VERSION, schemaOf, type HeatingVisualizerConfig } from "./models/schema.js";
import { normalizeConfig } from "./models/migrate.js";
import { createTranslator } from "./i18n/index.js";
import { HA_CONTEXT, HassContextConsumer } from "./utils/context.js";
import "./renderer/schema-canvas.js";
import "./editor/card-editor.js";

const CARD_VERSION = "0.4.0";
const DOCUMENTATION_URL = "https://github.com/vasicekmilan90-eng/heating_vizualizer";

@customElement("heating-visualizer-card")
export class HeatingVisualizerCard extends LitElement implements LovelaceCard {
  @state() private _config!: HeatingVisualizerConfig;

  private _i18n = new HassContextConsumer<HomeAssistantInternationalization>(
    this,
    HA_CONTEXT.internationalization
  );

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
    return 6;
  }

  // Rows are left undefined so the card height follows the SVG aspect ratio.
  public getGridOptions(): LovelaceGridOptions {
    return {
      columns: 12,
      min_columns: 6,
    };
  }

  static getConfigElement(): LovelaceCardEditor {
    return document.createElement("heating-visualizer-editor") as LovelaceCardEditor;
  }

  static getStubConfig(): Record<string, unknown> {
    return {
      schema_version: SCHEMA_VERSION,
      ...EMPTY_SCHEMA,
    };
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;

    const schema = schemaOf(this._config);
    const t = createTranslator(this._i18n.value?.language);

    return html`
      <ha-card>
        ${!schema.nodes.length && !schema.overlays.length
          ? html`<div class="empty">${t.t("card.empty")}</div>`
          : html`
            <heating-schema-canvas
              .schema="${schema}"
              .pipeStyle="${this._config.pipe_style ?? "orthogonal"}"
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
  documentationURL: DOCUMENTATION_URL,
});

console.info(
  `%c HEATING-VISUALIZER-CARD %c v${CARD_VERSION} `,
  "color: white; background: #039be5; font-weight: bold;",
  "color: #039be5; background: white; font-weight: bold;"
);
