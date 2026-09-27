import { css, html, LitElement, nothing, type TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "../types/home-assistant.js";
import { ADDON_TYPES, addonLimit, type AddonSpec, type AddonType } from "../models/addons.js";
import {
  DEVICE_TYPES,
  getDeviceDefinition,
  getNodeDefinition,
  HEAT_PUMP,
  MANIFOLD,
  MANIFOLD_DEFAULT_LOOPS,
} from "../models/device-registry.js";
import {
  candidatePorts,
  connectedPortCount,
  findPort,
  hasConnection,
  invalidConnections,
  makeConnection,
  otherEnd,
  portConnections,
  pruneNodeConnections,
  renumberLoops,
} from "../models/connections.js";
import { normalizeConfig } from "../models/migrate.js";
import { guessDeviceType, suggestAddons } from "../models/entity-mapping.js";
import { instantiateTemplate, SCHEMA_TEMPLATES } from "../models/templates.js";
import { autoLayout } from "../models/layout.js";
import {
  connectionId,
  formatPortRef,
  generateId,
  parsePortRef,
  SCHEMA_VERSION,
  schemaOf,
  type AddonConfig,
  type Connection,
  type HeatingSchema,
  type HeatingVisualizerConfig,
  type OverlayStateRule,
  type PortRef,
  type SchemaNode,
  type SchemaOverlay,
} from "../models/schema.js";
import { createTranslator, type Translator } from "../i18n/index.js";
import { normalizeRotation } from "../utils/geometry.js";
import type { FieldKind, FieldOption } from "./controls.js";
import {
  attributeOptions,
  describeEntity,
  deviceName,
  entityOptions,
  stateOptions,
  type EntityPreference,
} from "./suggestions.js";
import "./controls.js";
import "../renderer/schema-canvas.js";

type EditorTab = "schema" | "overlays";

type EditorView =
  | { kind: "list" }
  | { kind: "node"; nodeId: string }
  | { kind: "addon"; nodeId: string; index: number };

type BindingKey =
  | "entity_id"
  | "active_state"
  | "value_attribute"
  | "mode_attribute"
  | "branch_a_value"
  | "branch_b_value"
  | "temperature_entity_id";

type Binding = Partial<Record<BindingKey, string>>;

interface BindingField {
  key: BindingKey;
  label: string;
  helper?: string;
}

const ENTITY: BindingField = { key: "entity_id", label: "editor.entity" };
const ACTIVE_STATE: BindingField = { key: "active_state", label: "editor.active_state", helper: "editor.active_state_helper" };
const VALUE_ATTRIBUTE: BindingField = {
  key: "value_attribute",
  label: "editor.value_attribute",
  helper: "editor.value_attribute_helper",
};
const POSITION_ATTRIBUTE: BindingField = {
  key: "mode_attribute",
  label: "editor.position_attribute",
  helper: "editor.position_attribute_helper",
};

/** Fields of the device's main entity, matching `resolveNodeVisualState`. */
function nodeFields(type: string): BindingField[] {
  const valueDisplay = getDeviceDefinition(type)?.valueDisplay;
  if (valueDisplay === "only") return [ENTITY, VALUE_ATTRIBUTE];
  if (valueDisplay === "with_state") return [ENTITY, ACTIVE_STATE, VALUE_ATTRIBUTE];
  if (type === "mixing_valve") return [{ ...ENTITY, label: "editor.actuator_entity" }, POSITION_ATTRIBUTE];
  if (type === "valve_3way") {
    return [
      ENTITY,
      ACTIVE_STATE,
      { key: "mode_attribute", label: "editor.valve_attribute", helper: "editor.valve_attribute_helper" },
      { key: "branch_a_value", label: "editor.branch_a", helper: "editor.branch_a_helper" },
      { key: "branch_b_value", label: "editor.branch_b", helper: "editor.branch_b_helper" },
    ];
  }
  return [ENTITY, ACTIVE_STATE];
}

function addonFields(type: AddonType): BindingField[] {
  if (type === "loop") {
    return [
      { ...ENTITY, label: "editor.actuator_entity" },
      ACTIVE_STATE,
      { key: "temperature_entity_id", label: "editor.loop_temperature" },
    ];
  }
  switch (ADDON_TYPES[type].display) {
    case "value":
    case "text":
      return [ENTITY, VALUE_ATTRIBUTE];
    case "binary":
      return [ENTITY, ACTIVE_STATE];
    case "position":
      return [ENTITY, POSITION_ATTRIBUTE];
    default:
      return [];
  }
}

const NEW_NODE_GRID = { columns: 4, stepX: 200, stepY: 180, originX: 40, originY: 40 };
const NUDGE_STEP = 10;

/** Domains offered first when a device is added from an entity. */
const DEVICE_ENTITY_DOMAINS = ["climate", "water_heater", "valve", "fan", "switch", "sensor", "binary_sensor"];

/** HA `ui_color` names accepted by overlay rules. */
const UI_COLORS = [
  "primary",
  "accent",
  "red",
  "pink",
  "purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deep-orange",
  "brown",
  "grey",
  "blue-grey",
];

type FieldEvent = CustomEvent<{ value?: string | number | boolean }>;

const asText = (ev: FieldEvent): string | undefined =>
  typeof ev.detail.value === "string" ? ev.detail.value : undefined;
const asNumber = (ev: FieldEvent): number | undefined =>
  typeof ev.detail.value === "number" && Number.isFinite(ev.detail.value) ? ev.detail.value : undefined;

@customElement("heating-visualizer-editor")
export class HeatingVisualizerEditor extends LitElement implements LovelaceCardEditor {
  @state() private _hass?: HomeAssistant;
  @state() private _config?: HeatingVisualizerConfig;
  @state() private _tab: EditorTab = "schema";
  @state() private _view: EditorView = { kind: "list" };
  @state() private _selectedNodeId?: string;
  @state() private _selectedEdgeId?: string;
  @state() private _pendingPort?: PortRef;
  @state() private _newDeviceType = HEAT_PUMP.type;
  @state() private _newAddonType?: AddonType;
  @state() private _entityToAdd?: string;
  @state() private _entityDeviceType?: string;
  @state() private _templateId = SCHEMA_TEMPLATES[0].id;
  /** Positions before the last automatic layout; cleared by any other change. */
  @state() private _layoutUndo?: Record<string, { x: number; y: number }>;
  @state() private _drawing = false;

  public set hass(hass: HomeAssistant | undefined) {
    this._hass = hass;
  }

  public get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  public setConfig(config: HeatingVisualizerConfig): void {
    this._config = normalizeConfig(config);
  }

  static styles = css`
    :host {
      display: block;
    }
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 0;
    }
    h3 {
      margin: 8px 0 6px;
      font-size: var(--ha-font-size-m, 14px);
      font-weight: var(--ha-font-weight-medium, 500);
      color: var(--primary-text-color);
    }
    button {
      min-height: 36px;
      padding: 6px 12px;
      font: inherit;
      color: var(--primary-text-color);
      background: transparent;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
      cursor: pointer;
    }
    button:focus-visible,
    select:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
    button.primary {
      color: var(--text-primary-color, #fff);
      background: var(--primary-color);
      border-color: var(--primary-color);
    }
    button.danger {
      color: var(--error-color, #db4437);
      border-color: var(--error-color, #db4437);
    }
    button.icon {
      min-width: 36px;
      padding: 4px 8px;
    }
    select {
      min-height: 36px;
      padding: 6px 10px;
      font: inherit;
      color: var(--primary-text-color);
      background: var(--ha-color-form-background, var(--secondary-background-color));
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
    }
    .tabs {
      display: flex;
      gap: 4px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--divider-color);
    }
    .tabs button {
      flex: 1;
      border: none;
    }
    .tabs button[aria-selected="true"] {
      color: var(--text-primary-color, #fff);
      background: var(--primary-color);
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }
    .toolbar select {
      flex: 1;
      min-width: 160px;
    }
    .header {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .header h3 {
      flex: 1;
      margin: 0;
    }
    .hint {
      margin: 0;
      font-size: var(--ha-font-size-s, 12px);
      color: var(--secondary-text-color);
    }
    .notice {
      margin: 0;
      font-size: var(--ha-font-size-s, 12px);
      color: var(--primary-color);
    }
    .warning {
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: space-between;
      margin: 0;
      color: var(--warning-color, #ffa600);
    }
    ul.list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    ul.list li {
      display: flex;
      gap: 6px;
    }
    .row {
      display: flex;
      flex: 1;
      gap: 8px;
      align-items: center;
      text-align: start;
    }
    .row.selected {
      border-color: var(--primary-color);
    }
    .row.static {
      padding: 6px 12px;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
    }
    .row-main {
      display: flex;
      flex: 1;
      flex-direction: column;
      min-width: 0;
    }
    .row-sub {
      overflow: hidden;
      font-size: var(--ha-font-size-s, 12px);
      color: var(--secondary-text-color);
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    section.card {
      padding: 10px;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px);
    }
    .grid2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .port {
      padding: 6px 0;
      border-top: 1px solid var(--divider-color);
    }
    .port-label {
      margin-bottom: 4px;
      font-size: var(--ha-font-size-s, 12px);
      color: var(--secondary-text-color);
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 6px;
    }
    .chip {
      display: inline-flex;
      gap: 4px;
      align-items: center;
      padding: 2px 4px 2px 10px;
      background: var(--secondary-background-color);
      border-radius: 16px;
    }
    .chip button {
      min-width: 28px;
      min-height: 28px;
      padding: 0;
      border: none;
      border-radius: 50%;
    }
    .port select {
      width: 100%;
    }
    .rule {
      margin-top: 8px;
      padding: 8px;
      background: var(--secondary-background-color);
      border-radius: var(--ha-border-radius-md, 8px);
    }
  `;

  protected render(): TemplateResult {
    if (!this._config) return html``;
    const t = createTranslator(this._hass?.language);
    const schema = schemaOf(this._config);

    return html`
      <div class="editor">
        <div class="tabs" role="tablist">
          ${this._renderTab(t, "schema", "editor.schema_tab")}
          ${this._renderTab(t, "overlays", "editor.overlay_tab")}
        </div>
        ${this._tab === "schema" ? this._renderSchemaTab(t, schema) : this._renderOverlaysTab(t, schema)}
      </div>
    `;
  }

  private _renderTab(t: Translator, tab: EditorTab, label: string): TemplateResult {
    return html`
      <button
        type="button"
        role="tab"
        aria-selected="${this._tab === tab}"
        @click="${() => {
          this._tab = tab;
        }}"
      >${t.t(label)}</button>
    `;
  }

  // ---------------------------------------------------------------- schema tab

  private _renderSchemaTab(t: Translator, schema: HeatingSchema): TemplateResult {
    const view = this._view;
    const node = view.kind === "list" ? undefined : schema.nodes.find((n) => n.id === view.nodeId);
    if (node && view.kind === "addon") {
      const addon = node.addons?.[view.index];
      if (addon) return this._renderAddonView(t, schema, node, addon, view.index);
    }
    if (node) return this._renderNodeView(t, schema, node);
    return this._renderListView(t, schema);
  }

  private _renderCanvas(t: Translator, schema: HeatingSchema): TemplateResult {
    return html`
      <div class="toolbar">
        <button
          type="button"
          class="${this._drawing ? "primary" : ""}"
          aria-pressed="${this._drawing}"
          @click="${this._toggleDrawing}"
        >✎ ${t.t("editor.drawing_mode")}</button>
        <span class="hint" style="flex: 1">
          ${t.t(this._drawing ? "editor.drawing_hint" : "editor.select_hint")}
        </span>
      </div>
      <heating-schema-canvas
        .schema="${schema}"
        .editable="${true}"
        .drawing="${this._drawing}"
        .selectedNodeId="${this._selectedNodeId}"
        .selectedEdgeId="${this._selectedEdgeId}"
        .selectedPort="${this._pendingPort}"
        @node-select="${this._onNodeSelect}"
        @edge-select="${this._onEdgeSelect}"
        @node-move="${this._onNodeMove}"
        @port-click="${this._onPortClick}"
      ></heating-schema-canvas>
      ${this._pendingPort
        ? html`<p class="notice" role="status">
            ${t.t("editor.connection_pending", this._portRefLabel(t, schema, this._pendingPort))}
          </p>`
        : nothing}
      ${this._selectedEdgeId
        ? html`<div class="toolbar">
            <button type="button" class="danger" @click="${this._deleteSelectedConnection}">
              ${t.t("editor.delete_connection")}
            </button>
          </div>`
        : nothing}
    `;
  }

  private _renderListView(t: Translator, schema: HeatingSchema): TemplateResult {
    const invalid = invalidConnections(schema);
    return html`
      <div class="toolbar">
        <select
          aria-label="${t.t("editor.device_type")}"
          @change="${(ev: Event) => {
            this._newDeviceType = (ev.target as HTMLSelectElement).value;
          }}"
        >
          ${DEVICE_TYPES.map(
            (type) => html`<option value="${type}" ?selected="${type === this._newDeviceType}">
              ${t.t(`devices.${type}.name`)}
            </option>`
          )}
        </select>
        <button type="button" class="primary" @click="${() => this._addDevice(this._newDeviceType)}">
          ${t.t("editor.add_device")}
        </button>
      </div>
      <div class="toolbar">
        <select
          aria-label="${t.t("editor.template")}"
          @change="${(ev: Event) => {
            this._templateId = (ev.target as HTMLSelectElement).value;
          }}"
        >
          ${SCHEMA_TEMPLATES.map(
            (template) => html`<option value="${template.id}" ?selected="${template.id === this._templateId}">
              ${t.t(`templates.${template.id}`)}
            </option>`
          )}
        </select>
        <button type="button" @click="${this._insertTemplate}">${t.t("editor.insert_template")}</button>
      </div>
      ${schema.nodes.length > 1
        ? html`<div class="toolbar">
            <button type="button" @click="${this._autoLayout}">${t.t("editor.auto_layout")}</button>
            ${this._layoutUndo
              ? html`<button type="button" @click="${this._undoLayout}">${t.t("editor.undo_layout")}</button>`
              : nothing}
          </div>`
        : nothing}
      ${this._renderAddFromEntity(t)}

      ${this._renderCanvas(t, schema)}

      ${invalid.length
        ? html`<p class="warning" role="alert">
            ${t.t("editor.invalid_connections", String(invalid.length))}
            <button type="button" @click="${() => this._removeConnections(invalid)}">
              ${t.t("editor.remove_invalid")}
            </button>
          </p>`
        : nothing}

      ${schema.nodes.length
        ? html`
            <h3>${t.t("editor.devices_title")}</h3>
            <ul class="list">
              ${schema.nodes.map((node) => this._renderNodeRow(t, schema, node))}
            </ul>
          `
        : html`<p class="hint">${t.t("editor.empty_hint")}</p>`}
    `;
  }

  private _renderAddFromEntity(t: Translator): TemplateResult | typeof nothing {
    const hass = this._hass;
    if (!hass) return nothing;
    const entity = this._entityToAdd ? hass.states[this._entityToAdd] : undefined;
    const type = this._entityDeviceType ?? (entity ? guessDeviceType(entity) : undefined);

    return html`
      <section class="card">
        <hv-field
          kind="combo"
          .label="${t.t("editor.add_from_entity")}"
          .helper="${describeEntity(hass, this._entityToAdd) ?? t.t("editor.add_from_entity_helper")}"
          .options="${entityOptions(hass, { domains: DEVICE_ENTITY_DOMAINS })}"
          .value="${this._entityToAdd}"
          @hv-change="${(ev: FieldEvent) => {
            this._entityToAdd = asText(ev);
            this._entityDeviceType = undefined;
          }}"
        ></hv-field>
        ${entity
          ? html`<div class="toolbar">
              <select
                aria-label="${t.t("editor.device_type")}"
                @change="${(ev: Event) => {
                  this._entityDeviceType = (ev.target as HTMLSelectElement).value || undefined;
                }}"
              >
                ${type ? nothing : html`<option value="" selected>${t.t("editor.choose_type")}</option>`}
                ${DEVICE_TYPES.map(
                  (option) => html`<option value="${option}" ?selected="${option === type}">
                    ${t.t(`devices.${option}.name`)}
                  </option>`
                )}
              </select>
              <button
                type="button"
                class="primary"
                ?disabled="${!type}"
                @click="${() => {
                  if (type) this._addDevice(type, entity.entity_id);
                }}"
              >${t.t("editor.add_device")}</button>
            </div>`
          : nothing}
      </section>
    `;
  }

  private _renderNodeRow(t: Translator, schema: HeatingSchema, node: SchemaNode): TemplateResult {
    const [connected, total] = connectedPortCount(schema, node);
    const details = [
      node.entity_id ? (describeEntity(this._hass, node.entity_id) ?? node.entity_id) : t.t("editor.no_entity"),
    ];
    if (total) details.push(t.t("editor.ports_connected", String(connected), String(total)));
    if (node.addons?.length) details.push(t.t("editor.addon_count", String(node.addons.length)));

    return html`
      <li>
        <button
          type="button"
          class="row ${node.id === this._selectedNodeId ? "selected" : ""}"
          @click="${() => this._openNode(node.id)}"
        >
          <span class="row-main">
            <span>${this._nodeName(t, node)}</span>
            <span class="row-sub">${details.join(" · ")}</span>
          </span>
          <span aria-hidden="true">›</span>
        </button>
      </li>
    `;
  }

  private _renderHeader(t: Translator, title: string, back: () => void): TemplateResult {
    return html`
      <div class="header">
        <button type="button" class="icon" aria-label="${t.t("editor.back")}" @click="${back}">‹</button>
        <h3>${title}</h3>
      </div>
    `;
  }

  private _renderNodeView(t: Translator, schema: HeatingSchema, node: SchemaNode): TemplateResult {
    const binding = node as Binding;
    return html`
      ${this._renderHeader(t, this._nodeName(t, node), () => this._openList())}
      ${this._renderCanvas(t, schema)}

      <section class="card">
        <hv-field
          .label="${t.t("editor.name")}"
          .helper="${t.t("editor.name_helper")}"
          .placeholder="${t.t(`devices.${node.type}.name`)}"
          .value="${node.name}"
          @hv-change="${(ev: FieldEvent) => this._patchNode(node.id, { name: asText(ev) })}"
        ></hv-field>
        ${this._renderBinding(t, binding, nodeFields(node.type), {}, (patch) => this._patchNode(node.id, patch))}
      </section>

      ${this._renderAddons(t, node)}
      ${this._renderSuggestions(t, node)}
      ${this._renderConnections(t, schema, node)}

      <section class="card">
        <h3>${t.t("editor.position_title")}</h3>
        <div class="grid2">
          <hv-field
            kind="number"
            label="X"
            .value="${node.position.x}"
            @hv-change="${(ev: FieldEvent) => this._moveNode(node.id, { x: asNumber(ev) })}"
          ></hv-field>
          <hv-field
            kind="number"
            label="Y"
            .value="${node.position.y}"
            @hv-change="${(ev: FieldEvent) => this._moveNode(node.id, { y: asNumber(ev) })}"
          ></hv-field>
        </div>
        <div class="toolbar">
          <button type="button" class="icon" aria-label="${t.t("editor.move_left")}" @click="${() => this._nudge(node, -1, 0)}">←</button>
          <button type="button" class="icon" aria-label="${t.t("editor.move_up")}" @click="${() => this._nudge(node, 0, -1)}">↑</button>
          <button type="button" class="icon" aria-label="${t.t("editor.move_down")}" @click="${() => this._nudge(node, 0, 1)}">↓</button>
          <button type="button" class="icon" aria-label="${t.t("editor.move_right")}" @click="${() => this._nudge(node, 1, 0)}">→</button>
          <button type="button" @click="${() => this._rotateNode(node.id)}">↻ ${t.t("editor.rotate")}</button>
          <button type="button" class="danger" @click="${() => this._deleteNode(node.id)}">
            ${t.t("editor.delete_device")}
          </button>
        </div>
      </section>
    `;
  }

  private _renderBinding(
    t: Translator,
    binding: Binding,
    fields: BindingField[],
    preference: EntityPreference,
    onChange: (patch: Binding) => void
  ): TemplateResult {
    return html`${fields.map((field) => {
      const { kind, options, helper } = this._fieldSource(t, binding, field, preference);
      return html`
        <hv-field
          .kind="${kind}"
          .label="${t.t(field.label)}"
          .helper="${helper}"
          .options="${options}"
          .value="${binding[field.key]}"
          @hv-change="${(ev: FieldEvent) => onChange({ [field.key]: asText(ev) })}"
        ></hv-field>
      `;
    })}`;
  }

  private _fieldSource(
    t: Translator,
    binding: Binding,
    field: BindingField,
    preference: EntityPreference
  ): { kind: FieldKind; options: FieldOption[]; helper?: string } {
    const hass = this._hass;
    const helper = field.helper ? t.t(field.helper) : undefined;
    switch (field.key) {
      case "entity_id":
      case "temperature_entity_id":
        return {
          kind: "combo",
          options: entityOptions(hass, preference),
          helper: describeEntity(hass, binding[field.key]) ?? helper,
        };
      case "value_attribute":
      case "mode_attribute":
        return { kind: "combo", options: attributeOptions(hass, binding.entity_id), helper };
      case "branch_a_value":
      case "branch_b_value":
        return { kind: "combo", options: stateOptions(hass, binding.entity_id, binding.mode_attribute), helper };
      default:
        return { kind: "combo", options: stateOptions(hass, binding.entity_id), helper };
    }
  }

  private _renderAddons(t: Translator, node: SchemaNode): TemplateResult | typeof nothing {
    const specs = getDeviceDefinition(node.type)?.addons ?? [];
    if (!specs.length) return nothing;
    const addons = node.addons ?? [];
    const available = specs.filter((spec) => this._remaining(node, spec) > 0);
    const selected = available.find((s) => s.type === this._newAddonType)?.type ?? available[0]?.type;

    return html`
      <section class="card">
        <h3>${t.t("editor.addons_title")}</h3>
        ${addons.length
          ? html`<ul class="list">
              ${addons.map((addon, index) => html`
                <li>
                  <button type="button" class="row" @click="${() => this._openAddon(node.id, index)}">
                    <span class="row-main">
                      <span>${this._addonName(t, node, addon, index)}</span>
                      <span class="row-sub">${this._addonSummary(t, addon)}</span>
                    </span>
                    <span aria-hidden="true">›</span>
                  </button>
                  <button
                    type="button"
                    class="icon danger"
                    aria-label="${t.t("editor.remove_addon")}"
                    @click="${() => this._removeAddon(node.id, index)}"
                  >×</button>
                </li>
              `)}
            </ul>`
          : html`<p class="hint">${t.t("editor.addons_empty")}</p>`}
        ${selected
          ? html`<div class="toolbar" style="margin-top: 8px">
              <select
                aria-label="${t.t("editor.addon_type")}"
                @change="${(ev: Event) => {
                  this._newAddonType = (ev.target as HTMLSelectElement).value as AddonType;
                }}"
              >
                ${available.map((spec) => html`
                  <option value="${spec.type}" ?selected="${spec.type === selected}">
                    ${t.t(`addons.${spec.type}.name`)} (${t.t("editor.remaining", String(this._remaining(node, spec)))})
                  </option>
                `)}
              </select>
              <button type="button" @click="${() => this._addAddon(node.id, selected)}">
                ${t.t("editor.add_addon")}
              </button>
            </div>`
          : nothing}
      </section>
    `;
  }

  /** Other entities of the same HA device, offered as add-ons. */
  private _renderSuggestions(t: Translator, node: SchemaNode): TemplateResult | typeof nothing {
    const suggestions = suggestAddons(this._hass, node);
    if (!suggestions.length) return nothing;
    const label = (addon: AddonConfig): string =>
      addon.slot
        ? `${t.t(`addons.${addon.type}.name`)} – ${t.t(`slots.${addon.slot}`)}`
        : t.t(`addons.${addon.type}.name`);

    return html`
      <section class="card">
        <div class="header">
          <h3>${t.t("editor.suggested_title")}</h3>
          <button type="button" @click="${() => this._addAddons(node.id, suggestions)}">
            ${t.t("editor.add_all")}
          </button>
        </div>
        <p class="hint">${t.t("editor.suggested_hint")}</p>
        <ul class="list" style="margin-top: 8px">
          ${suggestions.map((addon) => html`
            <li>
              <div class="row static">
                <span class="row-main">
                  <span>${label(addon)}</span>
                  <span class="row-sub">${describeEntity(this._hass, addon.entity_id) ?? addon.entity_id}</span>
                </span>
              </div>
              <button
                type="button"
                class="icon"
                aria-label="${t.t("editor.add_addon")}"
                @click="${() => this._addAddons(node.id, [addon])}"
              >+</button>
            </li>
          `)}
        </ul>
      </section>
    `;
  }

  private _renderAddonView(
    t: Translator,
    schema: HeatingSchema,
    node: SchemaNode,
    addon: AddonConfig,
    index: number
  ): TemplateResult {
    const spec = getDeviceDefinition(node.type)?.addons?.find((s) => s.type === addon.type);
    const definition = ADDON_TYPES[addon.type];
    const usedSlots = new Set((node.addons ?? []).filter((a, i) => i !== index && a.type === addon.type).map((a) => a.slot));
    const slotOptions = (spec?.slots ?? [])
      .filter((slot) => !usedSlots.has(slot))
      .map((slot) => ({ value: slot, label: t.t(`slots.${slot}`) }));
    const preference: EntityPreference = {
      domains: definition.domains,
      deviceClasses: definition.deviceClasses,
      relatedTo: node.entity_id,
    };

    return html`
      ${this._renderHeader(t, this._addonName(t, node, addon, index), () => this._openNode(node.id))}
      ${this._renderCanvas(t, schema)}
      <section class="card">
        <p class="hint">${this._nodeName(t, node)} › ${t.t(`addons.${addon.type}.name`)}</p>
        ${slotOptions.length
          ? html`<hv-field
              kind="select"
              .label="${t.t("editor.slot")}"
              .options="${slotOptions}"
              .value="${addon.slot}"
              @hv-change="${(ev: FieldEvent) => this._patchAddon(node.id, index, { slot: asText(ev) })}"
            ></hv-field>`
          : nothing}
        <hv-field
          .label="${t.t("editor.name")}"
          .helper="${t.t("editor.addon_name_helper")}"
          .value="${addon.name}"
          @hv-change="${(ev: FieldEvent) => this._patchAddon(node.id, index, { name: asText(ev) })}"
        ></hv-field>
        ${definition.entityless
          ? html`<p class="hint">${t.t(`addons.${addon.type}.hint`)}</p>`
          : this._renderBinding(t, addon as Binding, addonFields(addon.type), preference, (patch) =>
              this._patchAddon(node.id, index, patch)
            )}
      </section>
      <div class="toolbar">
        <button type="button" class="danger" @click="${() => this._removeAddon(node.id, index)}">
          ${t.t("editor.remove_addon")}
        </button>
      </div>
    `;
  }

  private _renderConnections(t: Translator, schema: HeatingSchema, node: SchemaNode): TemplateResult | typeof nothing {
    const ports = getNodeDefinition(node)?.ports ?? [];
    if (!ports.length) return nothing;

    return html`
      <section class="card">
        <h3>${t.t("editor.connections_title")}</h3>
        ${ports.map((port) => {
          const ref: PortRef = { nodeId: node.id, portId: port.id };
          const connections = portConnections(schema, ref);
          const candidates = candidatePorts(schema, ref);
          return html`
            <div class="port">
              <div class="port-label">
                ${port.kind === "outlet" ? "→" : "←"} ${t.t(port.labelKey, ...(port.labelArgs ?? []))}
              </div>
              <div class="chips">
                ${connections.length
                  ? connections.map((connection) => {
                      const other = otherEnd(connection, ref);
                      return html`<span class="chip">
                        ${other ? this._portRefLabel(t, schema, other) : "?"}
                        <button
                          type="button"
                          aria-label="${t.t("editor.disconnect")}"
                          @click="${() => this._removeConnections([connection])}"
                        >×</button>
                      </span>`;
                    })
                  : html`<span class="hint">${t.t("editor.not_connected")}</span>`}
              </div>
              ${candidates.length
                ? html`<select
                    aria-label="${t.t("editor.connect_to")}"
                    @change="${(ev: Event) => {
                      const select = ev.target as HTMLSelectElement;
                      const target = parsePortRef(select.value);
                      select.value = "";
                      if (target) this._connect(ref, target);
                    }}"
                  >
                    <option value="">${t.t("editor.connect_to")}…</option>
                    ${candidates.map(
                      (c) => html`<option value="${formatPortRef(c)}">${this._portRefLabel(t, schema, c)}</option>`
                    )}
                  </select>`
                : nothing}
            </div>
          `;
        })}
      </section>
    `;
  }

  // -------------------------------------------------------------- overlays tab

  private _renderOverlaysTab(t: Translator, schema: HeatingSchema): TemplateResult {
    return html`
      <div class="toolbar">
        <button type="button" class="primary" @click="${this._addOverlay}">${t.t("editor.add_overlay")}</button>
      </div>
      <heating-schema-canvas .schema="${schema}" .editable="${false}"></heating-schema-canvas>
      ${schema.overlays.length ? nothing : html`<p class="hint">${t.t("editor.overlays_empty")}</p>`}
      ${schema.overlays.map((overlay, index) => this._renderOverlay(t, overlay, index))}
    `;
  }

  private _renderOverlay(t: Translator, overlay: SchemaOverlay, index: number): TemplateResult {
    const hass = this._hass;
    const patch = (value: Partial<SchemaOverlay>): void => this._patchOverlay(overlay.id, value);
    const customName = overlay.name !== undefined && typeof overlay.name !== "string";

    return html`
      <section class="card">
        <div class="header">
          <h3>${overlay.entity_id || t.t("editor.overlay_n", String(index + 1))}</h3>
          <button
            type="button"
            class="icon danger"
            aria-label="${t.t("editor.remove_overlay")}"
            @click="${() => this._removeOverlay(overlay.id)}"
          >×</button>
        </div>
        <hv-field
          kind="combo"
          .label="${t.t("overlay.entity")}"
          .options="${entityOptions(hass)}"
          .helper="${describeEntity(hass, overlay.entity_id)}"
          .value="${overlay.entity_id}"
          @hv-change="${(ev: FieldEvent) => patch({ entity_id: asText(ev) ?? "" })}"
        ></hv-field>
        <hv-field
          .label="${t.t("overlay.name")}"
          .helper="${customName ? t.t("overlay.name_yaml") : t.t("overlay.name_helper")}"
          .value="${typeof overlay.name === "string" ? overlay.name : undefined}"
          @hv-change="${(ev: FieldEvent) => patch({ name: asText(ev) })}"
        ></hv-field>
        <hv-field
          .label="${t.t("overlay.template")}"
          .helper="${t.t("overlay.template_helper")}"
          .value="${overlay.template}"
          @hv-change="${(ev: FieldEvent) => patch({ template: asText(ev) })}"
        ></hv-field>
        <div class="grid2">
          <hv-field
            kind="number"
            label="X"
            .value="${overlay.position.x}"
            @hv-change="${(ev: FieldEvent) => patch({ position: { ...overlay.position, x: asNumber(ev) ?? 0 } })}"
          ></hv-field>
          <hv-field
            kind="number"
            label="Y"
            .value="${overlay.position.y}"
            @hv-change="${(ev: FieldEvent) => patch({ position: { ...overlay.position, y: asNumber(ev) ?? 0 } })}"
          ></hv-field>
        </div>

        <div class="header">
          <h3>${t.t("overlay.rules")}</h3>
          <button type="button" @click="${() => this._addRule(overlay)}">${t.t("overlay.add_rule")}</button>
        </div>
        ${(overlay.rules ?? []).map((rule, ruleIndex) => this._renderRule(t, overlay, rule, ruleIndex))}
      </section>
    `;
  }

  private _renderRule(t: Translator, overlay: SchemaOverlay, rule: OverlayStateRule, index: number): TemplateResult {
    const update = (next: (rule: OverlayStateRule) => OverlayStateRule | undefined): void =>
      this._updateRule(overlay.id, index, next);
    const entity = rule.entity || overlay.entity_id;

    return html`
      <div class="rule">
        <div class="header">
          <hv-field
            style="flex: 1"
            kind="select"
            .label="${t.t("overlay.rule.condition")}"
            .options="${[
              { value: "state", label: t.t("overlay.rule.condition_state") },
              { value: "numeric", label: t.t("overlay.rule.condition_numeric") },
            ]}"
            .value="${rule.condition}"
            @hv-change="${(ev: FieldEvent) =>
              update((r) => ({
                condition: asText(ev) === "numeric" ? "numeric" : "state",
                entity: r.entity,
                effect: r.effect,
              }))}"
          ></hv-field>
          <button
            type="button"
            class="icon danger"
            aria-label="${t.t("overlay.remove_rule")}"
            @click="${() => update(() => undefined)}"
          >×</button>
        </div>
        <hv-field
          kind="combo"
          .label="${t.t("overlay.rule.entity")}"
          .helper="${t.t("overlay.rule.entity_helper")}"
          .options="${entityOptions(this._hass)}"
          .value="${rule.entity}"
          @hv-change="${(ev: FieldEvent) => update((r) => ({ ...r, entity: asText(ev) }))}"
        ></hv-field>
        ${rule.condition === "state"
          ? html`<hv-field
              kind="combo"
              .label="${t.t("overlay.rule.state")}"
              .options="${stateOptions(this._hass, entity)}"
              .value="${rule.state}"
              @hv-change="${(ev: FieldEvent) => update((r) => ({ ...r, state: asText(ev) }))}"
            ></hv-field>`
          : html`<div class="grid2">
              <hv-field
                kind="number"
                .label="${t.t("overlay.rule.above")}"
                .value="${rule.above}"
                @hv-change="${(ev: FieldEvent) => update((r) => ({ ...r, above: asNumber(ev) }))}"
              ></hv-field>
              <hv-field
                kind="number"
                .label="${t.t("overlay.rule.below")}"
                .value="${rule.below}"
                @hv-change="${(ev: FieldEvent) => update((r) => ({ ...r, below: asNumber(ev) }))}"
              ></hv-field>
            </div>`}
        <hv-field
          kind="combo"
          .label="${t.t("overlay.rule.color")}"
          .helper="${t.t("overlay.rule.color_helper")}"
          .options="${UI_COLORS.map((value) => ({ value }))}"
          .value="${rule.effect.color}"
          @hv-change="${(ev: FieldEvent) => update((r) => ({ ...r, effect: { ...r.effect, color: asText(ev) } }))}"
        ></hv-field>
        <hv-field
          kind="boolean"
          .label="${t.t("overlay.rule.hide")}"
          .value="${rule.effect.visible === false}"
          @hv-change="${(ev: FieldEvent) =>
            update((r) => ({ ...r, effect: { ...r.effect, visible: ev.detail.value ? false : undefined } }))}"
        ></hv-field>
      </div>
    `;
  }

  // ------------------------------------------------------------------- labels

  private _nodeName(t: Translator, node: SchemaNode): string {
    return node.name || t.t(`devices.${node.type}.name`);
  }

  private _addonName(t: Translator, node: SchemaNode, addon: AddonConfig, index: number): string {
    if (addon.name) return addon.name;
    const typeName = t.t(`addons.${addon.type}.name`);
    if (addon.slot) return `${typeName} – ${t.t(`slots.${addon.slot}`)}`;
    const sameType = (node.addons ?? []).filter((a) => a.type === addon.type);
    if (sameType.length < 2) return typeName;
    const number = (node.addons ?? []).slice(0, index + 1).filter((a) => a.type === addon.type).length;
    return `${typeName} ${number}`;
  }

  private _addonSummary(t: Translator, addon: AddonConfig): string {
    if (ADDON_TYPES[addon.type].entityless) return t.t(`addons.${addon.type}.hint`);
    if (!addon.entity_id) return t.t("editor.no_entity");
    return describeEntity(this._hass, addon.entity_id) ?? addon.entity_id;
  }

  private _portRefLabel(t: Translator, schema: HeatingSchema, ref: PortRef): string {
    const node = schema.nodes.find((n) => n.id === ref.nodeId);
    const port = findPort(schema, ref);
    const portName = port ? t.t(port.labelKey, ...(port.labelArgs ?? [])) : ref.portId;
    return node ? `${this._nodeName(t, node)} › ${portName}` : formatPortRef(ref);
  }

  // --------------------------------------------------------------- navigation

  private _openList(): void {
    this._view = { kind: "list" };
  }

  private _openNode(nodeId: string): void {
    this._view = { kind: "node", nodeId };
    this._selectedNodeId = nodeId;
    this._selectedEdgeId = undefined;
  }

  private _openAddon(nodeId: string, index: number): void {
    this._view = { kind: "addon", nodeId, index };
  }

  // ---------------------------------------------------------------- mutations

  /** Applies a change to a copy of the schema and emits the new config. */
  private _update(mutate: (schema: HeatingSchema) => void): void {
    if (!this._config) return;
    this._layoutUndo = undefined;
    const schema = structuredClone(schemaOf(this._config));
    mutate(schema);
    // JSON round-trip drops undefined values, which the dashboard YAML serializer rejects.
    const config = JSON.parse(
      JSON.stringify({ ...this._config, ...schema, schema_version: SCHEMA_VERSION })
    ) as HeatingVisualizerConfig;
    this._config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true }));
  }

  private _patchNode(nodeId: string, patch: Partial<SchemaNode>): void {
    this._update((schema) => {
      const node = schema.nodes.find((n) => n.id === nodeId);
      if (node) Object.assign(node, patch);
    });
  }

  private _moveNode(nodeId: string, position: { x?: number; y?: number }): void {
    this._update((schema) => {
      const node = schema.nodes.find((n) => n.id === nodeId);
      if (node) node.position = { x: position.x ?? node.position.x, y: position.y ?? node.position.y };
    });
  }

  private _nudge(node: SchemaNode, dx: number, dy: number): void {
    this._moveNode(node.id, { x: node.position.x + dx * NUDGE_STEP, y: node.position.y + dy * NUDGE_STEP });
  }

  private _toggleDrawing(): void {
    this._drawing = !this._drawing;
    this._pendingPort = undefined;
  }

  private _rotateNode(nodeId: string): void {
    this._update((schema) => {
      const node = schema.nodes.find((n) => n.id === nodeId);
      if (node) node.rotation = normalizeRotation((node.rotation ?? 0) + 90) || undefined;
    });
  }

  private _addDevice(type: string, entityId?: string): void {
    if (!getDeviceDefinition(type)) return;
    const id = generateId(type);
    this._update((schema) => {
      const count = schema.nodes.length;
      const node: SchemaNode = {
        id,
        type,
        name: deviceName(this._hass, entityId),
        entity_id: entityId,
        position: {
          x: NEW_NODE_GRID.originX + (count % NEW_NODE_GRID.columns) * NEW_NODE_GRID.stepX,
          y: NEW_NODE_GRID.originY + Math.floor(count / NEW_NODE_GRID.columns) * NEW_NODE_GRID.stepY,
        },
      };
      if (type === MANIFOLD.type) {
        node.addons = Array.from({ length: MANIFOLD_DEFAULT_LOOPS }, () => ({ type: "loop" as const }));
      }
      schema.nodes.push(node);
    });
    this._entityToAdd = undefined;
    this._entityDeviceType = undefined;
    this._openNode(id);
  }

  private _autoLayout(): void {
    if (!this._config) return;
    const previous = Object.fromEntries(schemaOf(this._config).nodes.map((n) => [n.id, { ...n.position }]));
    this._update((schema) => {
      schema.nodes = autoLayout(schema);
    });
    this._layoutUndo = previous;
  }

  private _undoLayout(): void {
    const previous = this._layoutUndo;
    if (!previous) return;
    this._update((schema) => {
      for (const node of schema.nodes) node.position = previous[node.id] ?? node.position;
    });
  }

  private _insertTemplate(): void {
    const template = SCHEMA_TEMPLATES.find((tpl) => tpl.id === this._templateId);
    if (!template) return;
    this._update((schema) => {
      const part = instantiateTemplate(template, schema, (localId) => generateId(localId));
      schema.nodes.push(...part.nodes);
      schema.connections.push(...part.connections);
    });
  }

  private _addAddons(nodeId: string, addons: AddonConfig[]): void {
    this._update((schema) => {
      const node = schema.nodes.find((n) => n.id === nodeId);
      if (node) node.addons = [...(node.addons ?? []), ...addons];
    });
  }

  private _deleteNode(nodeId: string): void {
    this._update((schema) => {
      schema.nodes = schema.nodes.filter((n) => n.id !== nodeId);
      schema.connections = schema.connections.filter(
        (c) => parsePortRef(c.from)?.nodeId !== nodeId && parsePortRef(c.to)?.nodeId !== nodeId
      );
    });
    this._selectedNodeId = undefined;
    this._pendingPort = undefined;
    this._openList();
  }

  private _remaining(node: SchemaNode, spec: AddonSpec): number {
    const used = (node.addons ?? []).filter((a) => a.type === spec.type).length;
    return addonLimit(spec) - used;
  }

  private _addAddon(nodeId: string, type: AddonType): void {
    let index = -1;
    this._update((schema) => {
      const node = schema.nodes.find((n) => n.id === nodeId);
      const spec = node && getDeviceDefinition(node.type)?.addons?.find((s) => s.type === type);
      if (!node || !spec || this._remaining(node, spec) <= 0) return;
      const used = new Set((node.addons ?? []).filter((a) => a.type === type).map((a) => a.slot));
      const addon: AddonConfig = { type, slot: spec.slots?.find((slot) => !used.has(slot)) };
      node.addons = [...(node.addons ?? []), addon];
      index = node.addons.length - 1;
    });
    if (index >= 0 && !ADDON_TYPES[type].entityless) this._openAddon(nodeId, index);
  }

  private _patchAddon(nodeId: string, index: number, patch: Partial<AddonConfig>): void {
    this._update((schema) => {
      const addon = schema.nodes.find((n) => n.id === nodeId)?.addons?.[index];
      if (addon) Object.assign(addon, patch);
    });
  }

  private _removeAddon(nodeId: string, index: number): void {
    this._update((schema) => {
      const node = schema.nodes.find((n) => n.id === nodeId);
      const addon = node?.addons?.[index];
      if (!node?.addons || !addon) return;
      if (addon.type === "loop") {
        const loopNumber = node.addons.slice(0, index + 1).filter((a) => a.type === "loop").length;
        schema.connections = renumberLoops(schema, nodeId, loopNumber);
      }
      node.addons = node.addons.filter((_, i) => i !== index);
      if (!node.addons.length) node.addons = undefined;
      schema.connections = pruneNodeConnections(schema, nodeId);
    });
    this._openNode(nodeId);
  }

  private _connect(a: PortRef, b: PortRef): void {
    this._update((schema) => {
      const connection = makeConnection(schema, a, b);
      if (connection && !hasConnection(schema, connection)) schema.connections.push(connection);
    });
  }

  private _removeConnections(connections: Connection[]): void {
    const ids = new Set(connections.map(connectionId));
    this._update((schema) => {
      schema.connections = schema.connections.filter((c) => !ids.has(connectionId(c)));
    });
  }

  private _deleteSelectedConnection(): void {
    const id = this._selectedEdgeId;
    if (!id) return;
    this._update((schema) => {
      schema.connections = schema.connections.filter((c) => connectionId(c) !== id);
    });
    this._selectedEdgeId = undefined;
  }

  private _addOverlay(): void {
    this._update((schema) => {
      schema.overlays.push({
        id: generateId("ov"),
        position: { x: 40, y: 40 + schema.overlays.length * 30 },
        entity_id: "",
        template: "{{ state }}",
      });
    });
  }

  private _removeOverlay(id: string): void {
    this._update((schema) => {
      schema.overlays = schema.overlays.filter((o) => o.id !== id);
    });
  }

  private _patchOverlay(id: string, patch: Partial<SchemaOverlay>): void {
    this._update((schema) => {
      const overlay = schema.overlays.find((o) => o.id === id);
      if (overlay) Object.assign(overlay, patch);
    });
  }

  private _addRule(overlay: SchemaOverlay): void {
    this._update((schema) => {
      const target = schema.overlays.find((o) => o.id === overlay.id);
      if (target) target.rules = [...(target.rules ?? []), { condition: "state", effect: {} }];
    });
  }

  private _updateRule(
    overlayId: string,
    index: number,
    next: (rule: OverlayStateRule) => OverlayStateRule | undefined
  ): void {
    this._update((schema) => {
      const overlay = schema.overlays.find((o) => o.id === overlayId);
      const rule = overlay?.rules?.[index];
      if (!overlay?.rules || !rule) return;
      const updated = next(rule);
      overlay.rules = updated
        ? overlay.rules.map((r, i) => (i === index ? updated : r))
        : overlay.rules.filter((_, i) => i !== index);
      if (!overlay.rules.length) overlay.rules = undefined;
    });
  }

  // ------------------------------------------------------------ canvas events

  private _onNodeSelect(ev: CustomEvent<{ nodeId?: string }>): void {
    const { nodeId } = ev.detail;
    this._selectedEdgeId = undefined;
    if (this._view.kind !== "list" && nodeId) {
      if (nodeId !== this._view.nodeId) this._openNode(nodeId);
      return;
    }
    this._selectedNodeId = nodeId;
  }

  private _onEdgeSelect(ev: CustomEvent<{ edgeId: string }>): void {
    this._selectedEdgeId = ev.detail.edgeId;
    this._pendingPort = undefined;
  }

  private _onNodeMove(ev: CustomEvent<{ nodeId: string; position: { x: number; y: number } }>): void {
    this._moveNode(ev.detail.nodeId, ev.detail.position);
  }

  private _onPortClick(ev: CustomEvent<PortRef>): void {
    const click: PortRef = { nodeId: ev.detail.nodeId, portId: ev.detail.portId };
    const pending = this._pendingPort;
    if (!pending) {
      this._pendingPort = click;
      return;
    }
    this._pendingPort = undefined;
    if (pending.nodeId !== click.nodeId || pending.portId !== click.portId) this._connect(pending, click);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "heating-visualizer-editor": HeatingVisualizerEditor;
  }
}
