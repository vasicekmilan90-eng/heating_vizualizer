import { css, html, LitElement, nothing, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "../types/home-assistant.js";
import {
  generateId,
  normalizeConfig,
  DEFAULT_LANGUAGE,
  type HeatingSchema,
  type HeatingVisualizerConfig,
  type PortRef,
  type SchemaEdge,
  type SchemaNode,
  type SchemaOverlay,
  type TranslationMap,
} from "../models/schema.js";
import {
  DEVICE_TYPES,
  getDeviceDefinition,
  HEAT_PUMP,
} from "../models/device-registry.js";
import { createTranslator } from "../i18n/index.js";
import { portRefsEqual } from "../utils/geometry.js";
import "../renderer/schema-canvas.js";

type EditorTab = "schema" | "overlays" | "translations";

@customElement("heating-visualizer-editor")
export class HeatingVisualizerEditor extends LitElement implements LovelaceCardEditor {
  private _hass?: HomeAssistant;

  @state() private _config!: HeatingVisualizerConfig;
  @state() private _tab: EditorTab = "schema";
  @state() private _selectedNodeId?: string;
  @state() private _pendingPort?: PortRef;
  @state() private _selectedDeviceType = HEAT_PUMP.type;
  @state() private _translationEdits: TranslationMap = {};

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 0;
      font-family: var(--ha-font-family, sans-serif);
    }
    .tabs {
      display: flex;
      gap: 4px;
      border-bottom: 1px solid var(--divider-color, #444);
      padding-bottom: 8px;
    }
    .tabs button {
      flex: 1;
      padding: 8px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: var(--primary-text-color, #e0e0e0);
      cursor: pointer;
    }
    .tabs button.active {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }
    .toolbar button,
    .toolbar select,
    .field input,
    .field select,
    .field textarea {
      font: inherit;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #555);
      background: var(--card-background-color, #1c1c1c);
      color: var(--primary-text-color, #e0e0e0);
    }
    .toolbar button {
      cursor: pointer;
    }
    .toolbar button.primary {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #fff;
    }
    .hint {
      opacity: 0.75;
      font-size: 0.9em;
      margin: 0;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 8px;
    }
    .field label {
      font-size: 0.85em;
      opacity: 0.85;
    }
    .overlay-item,
    .translation-item {
      border: 1px solid var(--divider-color, #444);
      border-radius: 8px;
      padding: 10px;
      margin-bottom: 8px;
    }
    .overlay-item header,
    .translation-item header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      font-size: 0.9em;
    }
    .overlay-item button.danger,
    .toolbar button.danger {
      background: transparent;
      border-color: #e57373;
      color: #e57373;
    }
    .connection-hint {
      font-size: 0.85em;
      color: var(--primary-color, #03a9f4);
      margin: 0;
    }
  `;

  public set hass(hass: HomeAssistant | undefined) {
    this._hass = hass;
    this.requestUpdate();
  }

  public get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  public setConfig(config: HeatingVisualizerConfig): void {
    this._config = normalizeConfig(config);
    const t = createTranslator(this._config.language, this._config.translations);
    this._translationEdits = { ...t.getEditableTranslations() };
    this.requestUpdate();
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;

    const t = createTranslator(this._config.language, this._config.translations);

    return html`
      <div class="editor">
        <div class="tabs">
          <button
            class="${this._tab === "schema" ? "active" : ""}"
            @click="${() => { this._tab = "schema"; }}"
          >${t.t("editor.schema_tab")}</button>
          <button
            class="${this._tab === "overlays" ? "active" : ""}"
            @click="${() => { this._tab = "overlays"; }}"
          >${t.t("editor.overlay_tab")}</button>
          <button
            class="${this._tab === "translations" ? "active" : ""}"
            @click="${() => { this._tab = "translations"; }}"
          >${t.t("editor.translations")}</button>
        </div>

        ${this._tab === "schema" ? this._renderSchemaTab(t) : nothing}
        ${this._tab === "overlays" ? this._renderOverlaysTab(t) : nothing}
        ${this._tab === "translations" ? this._renderTranslationsTab(t) : nothing}
      </div>
    `;
  }

  private _renderSchemaTab(t: ReturnType<typeof createTranslator>): TemplateResult {
    const schema = this._config.schema!;
    const selectedNode = schema.nodes.find((n) => n.id === this._selectedNodeId);

    return html`
      <div class="toolbar">
        <label>${t.t("editor.device_type")}</label>
        <select
          .value="${this._selectedDeviceType}"
          @change="${(ev: Event) => {
            this._selectedDeviceType = (ev.target as HTMLSelectElement).value;
          }}"
        >
          ${DEVICE_TYPES.map((deviceType) => html`
            <option value="${deviceType}">
              ${t.t(`devices.${deviceType}.name`)}
            </option>
          `)}
        </select>
        <select
          .value="${this._config.language ?? DEFAULT_LANGUAGE}"
          @change="${this._onLanguageChange}"
        >
          ${t.getAvailableLanguages().map(
            (lang) => html`<option value="${lang}">${lang}</option>`
          )}
        </select>
        <button class="primary" @click="${this._addDevice}">
          ${t.t("editor.add_selected_device")}
        </button>
        ${this._selectedNodeId
          ? html`
            <button class="danger" @click="${this._deleteSelected}">
              ${t.t("editor.delete_selected")}
            </button>
          `
          : nothing}
      </div>

      ${this._pendingPort
        ? html`<p class="connection-hint">
            ${t.t("editor.connection_pending", this._portLabel(t, this._pendingPort))}
          </p>`
        : nothing}

      ${!schema.nodes.length
        ? html`<p class="hint">${t.t("editor.empty_hint")}</p>`
        : nothing}

      <heating-schema-canvas
        .hass="${this.hass}"
        .config="${this._config}"
        .schema="${schema}"
        .editable="${true}"
        .selectedNodeId="${this._selectedNodeId}"
        @node-select="${this._onNodeSelect}"
        @node-move="${this._onNodeMove}"
        @port-click="${this._onPortClick}"
      ></heating-schema-canvas>

      ${selectedNode
        ? html`
          <div class="overlay-item">
            <header>
              <span>${t.t("editor.node_state_title")}</span>
              <span>${t.t(`devices.${selectedNode.type}.name`)}</span>
            </header>
            <div class="field">
              <label>${t.t("editor.node_state_entity")}</label>
              ${this._hass
                ? html`
                  <ha-entity-picker
                    .hass="${this._hass}"
                    .value="${selectedNode.state?.entity_id ?? ""}"
                    allow-custom-entity
                    @value-changed="${(ev: CustomEvent) =>
                      this._updateNodeState(selectedNode.id, {
                        entity_id: (ev.detail as { value: string }).value ?? "",
                      })}"
                  ></ha-entity-picker>
                `
                : html`
                  <input
                    .value="${selectedNode.state?.entity_id ?? ""}"
                    @change="${(ev: Event) =>
                      this._updateNodeState(selectedNode.id, {
                        entity_id: (ev.target as HTMLInputElement).value,
                      })}"
                  />
                `}
            </div>
            <div class="field">
              <label>${t.t("editor.node_state_active")}</label>
              <input
                .value="${selectedNode.state?.active_state ?? "on"}"
                @change="${(ev: Event) =>
                  this._updateNodeState(selectedNode.id, {
                    active_state: (ev.target as HTMLInputElement).value,
                  })}"
              />
            </div>
            ${selectedNode.type === "valve_3way"
              ? html`
                <div class="field">
                  <label>${t.t("editor.node_state_mode_attribute")}</label>
                  <input
                    .value="${selectedNode.state?.mode_attribute ?? "position"}"
                    @change="${(ev: Event) =>
                      this._updateNodeState(selectedNode.id, {
                        mode_attribute: (ev.target as HTMLInputElement).value,
                      })}"
                  />
                </div>
                <div class="field">
                  <label>${t.t("editor.node_state_branch_a")}</label>
                  <input
                    .value="${selectedNode.state?.branch_a_value ?? "a"}"
                    @change="${(ev: Event) =>
                      this._updateNodeState(selectedNode.id, {
                        branch_a_value: (ev.target as HTMLInputElement).value,
                      })}"
                  />
                </div>
                <div class="field">
                  <label>${t.t("editor.node_state_branch_b")}</label>
                  <input
                    .value="${selectedNode.state?.branch_b_value ?? "b"}"
                    @change="${(ev: Event) =>
                      this._updateNodeState(selectedNode.id, {
                        branch_b_value: (ev.target as HTMLInputElement).value,
                      })}"
                  />
                </div>
              `
              : nothing}
          </div>
        `
        : nothing}
    `;
  }

  private _renderOverlaysTab(t: ReturnType<typeof createTranslator>): TemplateResult {
    const overlays = this._config.schema?.overlays ?? [];

    return html`
      <div class="toolbar">
        <button class="primary" @click="${this._addOverlay}">
          ${t.t("editor.add_overlay")}
        </button>
      </div>

      ${!overlays.length
        ? html`<p class="hint">${t.t("editor.overlays_empty")}</p>`
        : nothing}

      <heating-schema-canvas
        .hass="${this.hass}"
        .config="${this._config}"
        .schema="${this._config.schema!}"
        .editable="${false}"
      ></heating-schema-canvas>

      ${overlays.map((overlay, index) => html`
        <div class="overlay-item">
          <header>
            <span>${overlay.entity_id || `Overlay ${index + 1}`}</span>
            <button class="danger" @click="${() => this._removeOverlay(overlay.id)}">×</button>
          </header>
          <div class="field">
            <label>${t.t("overlay.entity")}</label>
            ${this._hass
              ? html`
                <ha-entity-picker
                  .hass="${this._hass}"
                  .value="${overlay.entity_id}"
                  allow-custom-entity
                  @value-changed="${(ev: CustomEvent) =>
                    this._updateOverlay(overlay.id, {
                      entity_id: (ev.detail as { value: string }).value ?? "",
                    })}"
                ></ha-entity-picker>
              `
              : html`
                <input
                  .value="${overlay.entity_id}"
                  @change="${(ev: Event) =>
                    this._updateOverlay(overlay.id, {
                      entity_id: (ev.target as HTMLInputElement).value,
                    })}"
                />
              `}
          </div>
          <div class="field">
            <label>${t.t("overlay.template")}</label>
            <input
              placeholder="{{ state }} °C"
              .value="${overlay.template ?? ""}"
              @change="${(ev: Event) =>
                this._updateOverlay(overlay.id, {
                  template: (ev.target as HTMLInputElement).value || undefined,
                })}"
            />
          </div>
          <div class="field">
            <label>X / Y</label>
            <input
              type="number"
              .value="${String(overlay.position.x)}"
              @change="${(ev: Event) =>
                this._updateOverlay(overlay.id, {
                  position: {
                    ...overlay.position,
                    x: Number((ev.target as HTMLInputElement).value),
                  },
                })}"
            />
            <input
              type="number"
              .value="${String(overlay.position.y)}"
              @change="${(ev: Event) =>
                this._updateOverlay(overlay.id, {
                  position: {
                    ...overlay.position,
                    y: Number((ev.target as HTMLInputElement).value),
                  },
                })}"
            />
          </div>
        </div>
      `)}
    `;
  }

  private _renderTranslationsTab(t: ReturnType<typeof createTranslator>): TemplateResult {
    const entries = Object.entries(this._translationEdits).sort(([a], [b]) =>
      a.localeCompare(b)
    );

    return html`
      <p class="hint">${t.t("editor.language")}: ${this._config.language}</p>
      ${entries.map(([key, value]) => html`
        <div class="translation-item">
          <header><code>${key}</code></header>
          <input
            .value="${value}"
            @input="${(ev: Event) =>
              this._onTranslationInput(key, (ev.target as HTMLInputElement).value)}"
          />
        </div>
      `)}
    `;
  }

  private _emitConfig(schema: HeatingSchema, extra?: Partial<HeatingVisualizerConfig>): void {
    const config: HeatingVisualizerConfig = {
      ...this._config,
      ...extra,
      schema,
    };
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _addDevice(): void {
    const schema = this._cloneSchema();
    const offset = schema.nodes.length * 30;
    const type = this._selectedDeviceType;
    const node: SchemaNode = {
      id: generateId(type),
      type,
      position: { x: 80 + offset, y: 80 + offset },
    };
    schema.nodes.push(node);
    this._selectedNodeId = node.id;
    this._emitConfig(schema);
  }

  private _deleteSelected(): void {
    if (!this._selectedNodeId) return;
    const id = this._selectedNodeId;
    const schema = this._cloneSchema();
    schema.nodes = schema.nodes.filter((n) => n.id !== id);
    schema.edges = schema.edges.filter(
      (e) => e.from.nodeId !== id && e.to.nodeId !== id
    );
    this._selectedNodeId = undefined;
    this._pendingPort = undefined;
    this._emitConfig(schema);
  }

  private _addOverlay(): void {
    const schema = this._cloneSchema();
    const overlay: SchemaOverlay = {
      id: generateId("ov"),
      position: { x: 40, y: 40 + schema.overlays.length * 30 },
      entity_id: "",
      template: "{{ state }}",
    };
    schema.overlays.push(overlay);
    this._emitConfig(schema);
  }

  private _removeOverlay(id: string): void {
    const schema = this._cloneSchema();
    schema.overlays = schema.overlays.filter((o) => o.id !== id);
    this._emitConfig(schema);
  }

  private _updateOverlay(id: string, patch: Partial<SchemaOverlay>): void {
    const schema = this._cloneSchema();
    schema.overlays = schema.overlays.map((o) =>
      o.id === id ? { ...o, ...patch } : o
    );
    this._emitConfig(schema);
  }

  private _onLanguageChange(ev: Event): void {
    const language = (ev.target as HTMLSelectElement).value;
    const t = createTranslator(language, this._config.translations);
    this._translationEdits = { ...t.getEditableTranslations() };
    this._emitConfig(this._cloneSchema(), { language });
  }

  private _onTranslationInput(key: string, value: string): void {
    this._translationEdits = { ...this._translationEdits, [key]: value };
    const language = this._config.language ?? "en";
    const translations = {
      ...this._config.translations,
      [language]: {
        ...(this._config.translations?.[language] ?? {}),
        [key]: value,
      },
    };
    this._emitConfig(this._cloneSchema(), { translations });
  }

  private _onNodeSelect(ev: CustomEvent<{ nodeId?: string }>): void {
    this._selectedNodeId = ev.detail.nodeId;
  }

  private _onNodeMove(ev: CustomEvent<{ nodeId: string; position: { x: number; y: number } }>): void {
    const schema = this._cloneSchema();
    schema.nodes = schema.nodes.map((n) =>
      n.id === ev.detail.nodeId ? { ...n, position: ev.detail.position } : n
    );
    this._emitConfig(schema);
  }

  private _updateNodeState(
    nodeId: string,
    patch: Partial<NonNullable<SchemaNode["state"]>>
  ): void {
    const schema = this._cloneSchema();
    schema.nodes = schema.nodes.map((n) => {
      if (n.id !== nodeId) return n;
      return {
        ...n,
        state: {
          ...(n.state ?? {}),
          ...patch,
        },
      };
    });
    this._emitConfig(schema);
  }

  private _onPortClick(ev: CustomEvent<PortRef>): void {
    const { nodeId, portId } = ev.detail;
    const click: PortRef = { nodeId, portId };

    if (!this._pendingPort) {
      this._pendingPort = click;
      return;
    }

    if (portRefsEqual(this._pendingPort, click)) {
      this._pendingPort = undefined;
      return;
    }

    const schema = this._cloneSchema();
    const edge = this._createEdge(this._pendingPort, click, schema.edges);
    if (edge) {
      schema.edges.push(edge);
      this._emitConfig(schema);
    }
    this._pendingPort = undefined;
  }

  private _createEdge(
    a: PortRef,
    b: PortRef,
    existing: SchemaEdge[]
  ): SchemaEdge | undefined {
    const ordered = this._orderPorts(a, b);
    if (!ordered) return undefined;

    const duplicate = existing.some(
      (e) =>
        portRefsEqual(e.from, ordered.from) && portRefsEqual(e.to, ordered.to)
    );
    if (duplicate) return undefined;

    return {
      id: generateId("edge"),
      from: ordered.from,
      to: ordered.to,
    };
  }

  private _orderPorts(
    a: PortRef,
    b: PortRef
  ): { from: PortRef; to: PortRef } | undefined {
    const nodeA = this._config.schema?.nodes.find((n) => n.id === a.nodeId);
    const nodeB = this._config.schema?.nodes.find((n) => n.id === b.nodeId);
    if (!nodeA || !nodeB) return undefined;

    const defA = getDeviceDefinition(nodeA.type);
    const defB = getDeviceDefinition(nodeB.type);
    if (!defA || !defB) return undefined;

    const portA = defA.ports.find((p) => p.id === a.portId);
    const portB = defB.ports.find((p) => p.id === b.portId);
    if (!portA || !portB) return undefined;

    if (portA.kind === "outlet" && portB.kind === "inlet") {
      return { from: a, to: b };
    }
    if (portB.kind === "outlet" && portA.kind === "inlet") {
      return { from: b, to: a };
    }
    return undefined;
  }

  private _portLabel(t: ReturnType<typeof createTranslator>, ref: PortRef): string {
    const node = this._config.schema?.nodes.find((n) => n.id === ref.nodeId);
    if (!node) return ref.portId;
    const def = getDeviceDefinition(node.type);
    const port = def?.ports.find((p) => p.id === ref.portId);
    return port ? t.t(port.labelKey) : ref.portId;
  }

  private _cloneSchema(): HeatingSchema {
    const s = this._config.schema!;
    return {
      nodes: s.nodes.map((n) => ({
        ...n,
        position: { ...n.position },
        state: n.state ? { ...n.state } : undefined,
      })),
      edges: s.edges.map((e) => ({
        ...e,
        from: { ...e.from },
        to: { ...e.to },
      })),
      overlays: s.overlays.map((o) => ({
        ...o,
        position: { ...o.position },
        rules: o.rules?.map((r) => ({ ...r, effect: { ...r.effect } })),
      })),
    };
  }
}
