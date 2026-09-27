import { css, html, LitElement, nothing, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type {
  HaFormSchema,
  HaFormSelectorSchema,
  HomeAssistant,
  LovelaceCardEditor,
} from "../types/home-assistant.js";
import {
  generateId,
  normalizeConfig,
  type HeatingSchema,
  type HeatingVisualizerConfig,
  type NodeStateBinding,
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
import type { Translator } from "../i18n/translations.js";
import { portRefsEqual } from "../utils/geometry.js";
import "../renderer/schema-canvas.js";

type EditorTab = "schema" | "overlays" | "translations";

type FormData = Record<string, unknown>;

const NODE_STATE_LABELS: Record<string, string> = {
  entity_id: "editor.node_state_entity",
  active_state: "editor.node_state_active",
  mode_attribute: "editor.node_state_mode_attribute",
  branch_a_value: "editor.node_state_branch_a",
  branch_b_value: "editor.node_state_branch_b",
};

/** Runtime defaults applied in `resolveNodeVisualState`. */
const NODE_STATE_DEFAULTS: Record<string, string> = {
  active_state: "on",
  mode_attribute: "position",
  branch_a_value: "a",
  branch_b_value: "b",
};

const OVERLAY_LABELS: Record<string, string> = {
  entity_id: "overlay.entity",
  name: "overlay.name",
  template: "overlay.template",
};

const OVERLAY_SCHEMA: HaFormSchema[] = [
  { name: "entity_id", selector: { entity: {} } },
  { name: "name", selector: { entity_name: {} }, context: { entity: "entity_id" } },
  { name: "template", selector: { text: {} } },
  {
    type: "grid",
    name: "position",
    schema: [
      { name: "x", selector: { number: { mode: "box" } } },
      { name: "y", selector: { number: { mode: "box" } } },
    ],
  },
];

function nodeStateSchema(nodeType: string): HaFormSchema[] {
  const schema: HaFormSchema[] = [
    { name: "entity_id", selector: { entity: {} } },
    { name: "active_state", selector: { state: {} }, context: { filter_entity: "entity_id" } },
  ];
  if (nodeType === "valve_3way") {
    const branchContext = { filter_entity: "entity_id", filter_attribute: "mode_attribute" };
    schema.push(
      { name: "mode_attribute", selector: { attribute: {} }, context: { filter_entity: "entity_id" } },
      { name: "branch_a_value", selector: { state: {} }, context: branchContext },
      { name: "branch_b_value", selector: { state: {} }, context: branchContext }
    );
  }
  return schema;
}

function compact(value: FormData): FormData {
  return Object.fromEntries(
    Object.entries(value).filter(([, v]) => v !== undefined && v !== null && v !== "")
  );
}

@customElement("heating-visualizer-editor")
export class HeatingVisualizerEditor extends LitElement implements LovelaceCardEditor {
  private _hass?: HomeAssistant;

  @state() private _config!: HeatingVisualizerConfig;
  @state() private _tab: EditorTab = "schema";
  @state() private _selectedNodeId?: string;
  @state() private _pendingPort?: PortRef;
  @state() private _selectedDeviceType = HEAT_PUMP.type;
  @state() private _translationEdits: TranslationMap = {};
  @state() private _formReady = customElements.get("ha-form") !== undefined;

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 0;
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

  public connectedCallback(): void {
    super.connectedCallback();
    if (!this._formReady) void this._loadHaForm();
  }

  public setConfig(config: HeatingVisualizerConfig): void {
    this._config = normalizeConfig(config);
    this._translationEdits = { ...this._translator().getEditableTranslations() };
    this.requestUpdate();
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;

    const t = this._translator();

    return html`
      <div class="editor">
        <div class="tabs">
          <button
            type="button"
            class="${this._tab === "schema" ? "active" : ""}"
            @click="${() => { this._tab = "schema"; }}"
          >${t.t("editor.schema_tab")}</button>
          <button
            type="button"
            class="${this._tab === "overlays" ? "active" : ""}"
            @click="${() => { this._tab = "overlays"; }}"
          >${t.t("editor.overlay_tab")}</button>
          <button
            type="button"
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

  private _renderSchemaTab(t: Translator): TemplateResult {
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
          .value="${this._config.language ?? ""}"
          @change="${this._onLanguageChange}"
        >
          <option value="">${t.t("editor.language_auto")}</option>
          ${t.getAvailableLanguages().map(
            (lang) => html`<option value="${lang}">${lang}</option>`
          )}
        </select>
        <button
          type="button"
          class="primary"
          @click="${(ev: Event) => this._onAddDeviceClick(ev)}"
        >
          ${t.t("editor.add_selected_device")}
        </button>
        <button
          type="button"
          class="primary"
          @click="${(ev: Event) => this._onAddHeatPumpClick(ev)}"
        >
          ${t.t("editor.add_heat_pump")}
        </button>
        ${this._selectedNodeId
          ? html`
            <button type="button" class="danger" @click="${(ev: Event) => this._onDeleteSelectedClick(ev)}">
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
            ${this._renderForm(
              t,
              nodeStateSchema(selectedNode.type),
              { ...(selectedNode.state ?? {}) },
              NODE_STATE_LABELS,
              (value) => this._setNodeState(selectedNode.id, value)
            )}
          </div>
        `
        : nothing}
    `;
  }

  private _renderOverlaysTab(t: Translator): TemplateResult {
    const overlays = this._config.schema?.overlays ?? [];

    return html`
      <div class="toolbar">
        <button type="button" class="primary" @click="${this._addOverlay}">
          ${t.t("editor.add_overlay")}
        </button>
      </div>

      ${!overlays.length
        ? html`<p class="hint">${t.t("editor.overlays_empty")}</p>`
        : nothing}

      <heating-schema-canvas
        .config="${this._config}"
        .schema="${this._config.schema!}"
        .editable="${false}"
      ></heating-schema-canvas>

      ${overlays.map((overlay, index) => html`
        <div class="overlay-item">
          <header>
            <span>${overlay.entity_id || `Overlay ${index + 1}`}</span>
            <button type="button" class="danger" @click="${() => this._removeOverlay(overlay.id)}">×</button>
          </header>
          ${this._renderForm(
            t,
            OVERLAY_SCHEMA,
            {
              entity_id: overlay.entity_id,
              name: overlay.name,
              template: overlay.template,
              position: overlay.position,
            },
            OVERLAY_LABELS,
            (value) => this._onOverlayFormChange(overlay.id, value)
          )}
        </div>
      `)}
    `;
  }

  private _renderForm(
    t: Translator,
    schema: HaFormSchema[],
    data: FormData,
    labels: Record<string, string>,
    onChange: (value: FormData) => void
  ): TemplateResult {
    const computeLabel = (field: HaFormSchema): string =>
      labels[field.name] ? t.t(labels[field.name]) : field.name.toUpperCase();
    const computeHelper = (field: HaFormSchema): string | undefined =>
      NODE_STATE_DEFAULTS[field.name] !== undefined
        ? t.t("editor.default_value", NODE_STATE_DEFAULTS[field.name])
        : undefined;

    if (this._formReady && this._hass) {
      return html`
        <ha-form
          .hass="${this._hass}"
          .data="${data}"
          .schema="${schema}"
          .computeLabel="${computeLabel}"
          .computeHelper="${computeHelper}"
          @value-changed="${(ev: CustomEvent<{ value: FormData }>) => {
            ev.stopPropagation();
            onChange(ev.detail.value);
          }}"
        ></ha-form>
      `;
    }

    return html`${schema.map((item) =>
      "schema" in item
        ? item.schema.map((field) =>
            this._renderFallbackField(field, item.name, data, computeLabel, onChange)
          )
        : this._renderFallbackField(item, undefined, data, computeLabel, onChange)
    )}`;
  }

  /** Plain input used only when `ha-form` could not be loaded. */
  private _renderFallbackField(
    field: HaFormSelectorSchema,
    group: string | undefined,
    data: FormData,
    computeLabel: (field: HaFormSchema) => string,
    onChange: (value: FormData) => void
  ): TemplateResult | typeof nothing {
    if ("entity_name" in field.selector) return nothing;

    const scope = group ? ((data[group] as FormData | undefined) ?? {}) : data;
    const isNumber = "number" in field.selector;
    return html`
      <div class="field">
        <label>${computeLabel(field)}</label>
        <input
          type="${isNumber ? "number" : "text"}"
          .value="${String(scope[field.name] ?? "")}"
          @change="${(ev: Event) => {
            const raw = (ev.target as HTMLInputElement).value;
            const next = { ...scope, [field.name]: isNumber ? Number(raw) : raw };
            onChange(group ? { ...data, [group]: next } : next);
          }}"
        />
      </div>
    `;
  }

  private _renderTranslationsTab(t: Translator): TemplateResult {
    const entries = Object.entries(this._translationEdits).sort(([a], [b]) =>
      a.localeCompare(b)
    );

    return html`
      <p class="hint">${t.t("editor.language")}: ${t.language}</p>
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
    // JSON round-trip drops undefined values, which the dashboard YAML serializer rejects.
    const config = JSON.parse(
      JSON.stringify(normalizeConfig({ ...this._config, ...extra, schema }))
    ) as HeatingVisualizerConfig;
    this._config = config;
    this.requestUpdate();
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onAddDeviceClick(ev: Event): void {
    ev.preventDefault();
    ev.stopPropagation();
    this._addDevice(this._selectedDeviceType);
  }

  private _onAddHeatPumpClick(ev: Event): void {
    ev.preventDefault();
    ev.stopPropagation();
    this._selectedDeviceType = HEAT_PUMP.type;
    this._addDevice(HEAT_PUMP.type);
  }

  private _onDeleteSelectedClick(ev: Event): void {
    ev.preventDefault();
    ev.stopPropagation();
    this._deleteSelected();
  }

  private _addDevice(type: string): void {
    if (!getDeviceDefinition(type)) return;

    const schema = this._cloneSchema();
    const offset = schema.nodes.length * 30;
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
    const next: HeatingVisualizerConfig = { ...this._config };
    if (language) {
      next.language = language;
    } else {
      delete next.language;
    }
    this._config = next;
    this._translationEdits = { ...this._translator().getEditableTranslations() };
    this._emitConfig(this._cloneSchema());
  }

  private _onTranslationInput(key: string, value: string): void {
    this._translationEdits = { ...this._translationEdits, [key]: value };
    const language = this._translator().language;
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

  private _setNodeState(nodeId: string, value: FormData): void {
    const state = compact(value) as NodeStateBinding;
    const schema = this._cloneSchema();
    schema.nodes = schema.nodes.map((n) =>
      n.id === nodeId
        ? { ...n, state: Object.keys(state).length ? state : undefined }
        : n
    );
    this._emitConfig(schema);
  }

  private _onOverlayFormChange(id: string, value: FormData): void {
    const fields = compact(value);
    const position = (fields.position ?? {}) as { x?: number; y?: number };
    this._updateOverlay(id, {
      entity_id: (fields.entity_id as string | undefined) ?? "",
      name: fields.name as SchemaOverlay["name"],
      template: fields.template as string | undefined,
      position: { x: Number(position.x ?? 0), y: Number(position.y ?? 0) },
    });
  }

  private _translator(): Translator {
    return createTranslator(
      this._config?.language ?? this._hass?.language,
      this._config?.translations
    );
  }

  // ha-form is lazy-loaded by HA; opening a built-in card editor registers it.
  private async _loadHaForm(): Promise<void> {
    try {
      const helpers = await window.loadCardHelpers?.();
      const card = helpers?.createCardElement({ type: "button" });
      const cardClass = card?.constructor as
        | { getConfigElement?: () => Promise<unknown> }
        | undefined;
      await cardClass?.getConfigElement?.();
      await customElements.whenDefined("ha-form");
      this._formReady = true;
    } catch {
      // Plain inputs remain as fallback.
    }
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

  private _portLabel(t: Translator, ref: PortRef): string {
    const node = this._config.schema?.nodes.find((n) => n.id === ref.nodeId);
    if (!node) return ref.portId;
    const def = getDeviceDefinition(node.type);
    const port = def?.ports.find((p) => p.id === ref.portId);
    return port ? t.t(port.labelKey) : ref.portId;
  }

  private _cloneSchema(): HeatingSchema {
    const s = this._config.schema ?? { nodes: [], edges: [], overlays: [] };
    return {
      nodes: (s.nodes ?? []).map((n) => ({
        ...n,
        position: { ...n.position },
        state: n.state ? { ...n.state } : undefined,
      })),
      edges: (s.edges ?? []).map((e) => ({
        ...e,
        from: { ...e.from },
        to: { ...e.to },
      })),
      overlays: (s.overlays ?? []).map((o) => ({
        ...o,
        position: { ...o.position },
        rules: o.rules?.map((r) => ({ ...r, effect: { ...r.effect } })),
      })),
    };
  }
}
