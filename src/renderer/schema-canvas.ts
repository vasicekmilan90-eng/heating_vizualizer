import { css, html, LitElement, nothing, svg, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import type {
  HassEntities,
  HomeAssistantFormatters,
  HomeAssistantInternationalization,
} from "../types/home-assistant.js";
import type { Connection, HeatingSchema, PipeStyle, SchemaNode } from "../models/schema.js";
import { connectionId, parsePortRef } from "../models/schema.js";
import { getNodeDefinition } from "../models/device-registry.js";
import { createTranslator } from "../i18n/index.js";
import type { Translator } from "../i18n/translations.js";
import {
  buildOrthogonalPipePath,
  buildPipePath,
  getAbsolutePort,
  getNodeBounds,
  normalizeRotation,
  snapToGrid,
  type Point,
  type Rect,
} from "../utils/geometry.js";
import {
  formatOverlayName,
  formatOverlayValue,
  resolveNodeVisualState,
  resolveOverlayStyle,
} from "../utils/entity.js";
import { HA_CONTEXT, HassContextConsumer } from "../utils/context.js";
import { actionTarget, canTap, hasAction, type ActionHandlerConfig, type ActionKind } from "../utils/actions.js";
import { renderDeviceByType } from "./devices/heat-pump.js";
import { badgeAddons, layoutBadges, renderAddonBadges } from "./devices/addon-badges.js";
import type { ResolvedAddon } from "./devices/common.js";
import { activeFromAddons, withNumericActivity } from "./devices/common.js";
import { ADDON_TYPES } from "../models/addons.js";
import { nodeDescription } from "./a11y.js";

const BADGE_OFFSET = 6;
const BADGE_MIN_WIDTH = 120;

// Same timings as the Home Assistant action handler.
const HOLD_MS = 500;
const DOUBLE_TAP_MS = 250;
const MOVE_TOLERANCE = 10;

interface Press {
  key: string;
  config: ActionHandlerConfig;
  x: number;
  y: number;
  timer?: number;
  held: boolean;
}

const GRID_SIZE = 10;
const NUDGE_STEP = GRID_SIZE;
const NUDGE_STEP_LARGE = GRID_SIZE * 5;

const ARROW_KEYS: Record<string, Point> = {
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
};

@customElement("heating-schema-canvas")
export class HeatingSchemaCanvas extends LitElement {
  @property({ attribute: false }) public schema: HeatingSchema = {
    nodes: [],
    connections: [],
    overlays: [],
  };
  @property({ type: Boolean }) public editable = false;
  /** Dragging devices and connecting ports; off by default so scrolling on touch screens cannot move anything. */
  @property({ type: Boolean }) public drawing = false;
  @property({ attribute: false }) public pipeStyle: PipeStyle = "orthogonal";
  @property({ attribute: false }) public selectedNodeId?: string;
  @property({ attribute: false }) public selectedEdgeId?: string;
  @property({ attribute: false }) public selectedPort?: { nodeId: string; portId: string };

  static styles = css`
    :host {
      display: block;
      width: 100%;
      overflow: auto;
    }
    svg {
      width: 100%;
      min-height: 280px;
      background: var(--ha-card-background, var(--card-background-color, #1c1c1c));
      border-radius: var(--ha-card-border-radius, 12px);
      user-select: none;
    }
    .pipe {
      fill: none;
      stroke: #78909c;
      stroke-width: 4;
      stroke-linecap: round;
    }
    .pipe.selected {
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 6;
    }
    .pipe-hit {
      fill: none;
      stroke: transparent;
      stroke-width: 16;
      pointer-events: stroke;
      cursor: pointer;
    }
    .grid-dot {
      fill: var(--divider-color, #555);
    }
    .spinning {
      transform-box: fill-box;
      transform-origin: center;
      animation: spin 1.6s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .spinning {
        animation: none;
      }
    }
    .device-label {
      fill: var(--primary-text-color, #e0e0e0);
      font-size: var(--ha-font-size-xs, 11px);
      pointer-events: none;
    }
    .device-value {
      fill: var(--primary-text-color, #e0e0e0);
      font-size: var(--ha-font-size-s, 12px);
      font-weight: var(--ha-font-weight-medium, 500);
      pointer-events: none;
    }
    .node {
      cursor: default;
    }
    :host([editable]) .node {
      cursor: pointer;
    }
    :host([drawing]) .node {
      cursor: grab;
    }
    :host([drawing]) .node.dragging {
      cursor: grabbing;
    }
    :host([drawing]) svg {
      touch-action: none;
    }
    svg:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 2px;
    }
    .actionable:focus {
      outline: none;
    }
    .actionable:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 4px;
    }
    .overlay-group {
      pointer-events: none;
    }
    :host(:not([editable])) .actionable {
      cursor: pointer;
    }
    :host(:not([editable])) .overlay-group.actionable {
      pointer-events: auto;
    }
    .addon-value {
      font-size: var(--ha-font-size-xs, 11px);
    }
    .heating-rod.active {
      filter: drop-shadow(0 0 3px #ff7043);
    }
    .overlay-bg {
      fill: var(--card-background-color, #1c1c1c);
      stroke: var(--divider-color, #555);
      stroke-width: 1;
      opacity: 0.92;
    }
    .overlay-text {
      fill: var(--primary-text-color, #e0e0e0);
      font-size: var(--ha-font-size-s, 12px);
    }
    .port-highlight {
      stroke: var(--primary-color, #03a9f4) !important;
      stroke-width: 3 !important;
    }
  `;

  private _dragNodeId?: string;
  private _press?: Press;
  private _pendingTap?: { key: string; timer: number };
  private _dragOffset?: Point;
  // Frozen while dragging so the coordinate system does not shift under the pointer.
  private _dragBounds?: Rect;

  private _states = new HassContextConsumer<HassEntities>(this, HA_CONTEXT.states);
  private _formatters = new HassContextConsumer<HomeAssistantFormatters>(
    this,
    HA_CONTEXT.formatters
  );
  private _i18n = new HassContextConsumer<HomeAssistantInternationalization>(
    this,
    HA_CONTEXT.internationalization
  );

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("editable")) {
      this.toggleAttribute("editable", this.editable);
    }
    if (changed.has("drawing") || changed.has("editable")) {
      this.toggleAttribute("drawing", this.editable && this.drawing);
    }
  }

  protected render(): TemplateResult {
    const t = this._translator();
    const { nodes, connections, overlays } = this.schema;
    const bounds = this._dragBounds ?? this._computeBounds(nodes);

    return html`
      <svg
        viewBox="${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}"
        role="group"
        aria-label="${t.t("a11y.schema")}"
        tabindex="${this.editable ? "0" : nothing}"
        @keydown="${this._onKeyDown}"
        @pointerdown="${this._onCanvasPointerDown}"
        @pointermove="${this._onCanvasPointerMove}"
        @pointerup="${this._onCanvasPointerUp}"
        @pointerleave="${this._onCanvasPointerLeave}"
        @pointercancel="${this._onCanvasPointerLeave}"
      >
        ${this.editable && this.drawing
          ? svg`
            <defs>
              <pattern id="grid" width="${GRID_SIZE * 2}" height="${GRID_SIZE * 2}" patternUnits="userSpaceOnUse">
                <circle class="grid-dot" cx="0" cy="0" r="1" />
              </pattern>
            </defs>
            <rect x="${bounds.x}" y="${bounds.y}" width="${bounds.width}" height="${bounds.height}" fill="url(#grid)" aria-hidden="true" />
          `
          : nothing}
        ${connections.map((connection) => this._renderConnection(connection))}
        ${nodes.map((node) => this._renderNode(node, t))}
        ${overlays.map((overlay) => this._renderOverlay(overlay))}
      </svg>
    `;
  }

  private _translator(): Translator {
    return createTranslator(this._i18n.value?.language);
  }

  private _computeBounds(nodes: SchemaNode[]): {
    x: number;
    y: number;
    width: number;
    height: number;
  } {
    if (!nodes.length) {
      return { x: 0, y: 0, width: 800, height: 400 };
    }

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const node of nodes) {
      const def = getNodeDefinition(node);
      if (!def) continue;
      const rect = getNodeBounds(node, def);
      const badges = layoutBadges(badgeAddons(node.type, this._resolveAddons(node)), this._badgeWidth(rect));
      minX = Math.min(minX, rect.x);
      minY = Math.min(minY, rect.y - 20);
      maxX = Math.max(maxX, rect.x + Math.max(rect.width, badges.height ? this._badgeWidth(rect) : 0));
      maxY = Math.max(maxY, rect.y + rect.height + 10 + (badges.height ? badges.height + BADGE_OFFSET : 0));
    }

    const pad = 40;
    return {
      x: minX - pad,
      y: minY - pad,
      width: maxX - minX + pad * 2,
      height: maxY - minY + pad * 2,
    };
  }

  private _renderConnection(connection: Connection): TemplateResult {
    const fromRef = parsePortRef(connection.from);
    const toRef = parsePortRef(connection.to);
    const fromNode = this.schema.nodes.find((n) => n.id === fromRef?.nodeId);
    const toNode = this.schema.nodes.find((n) => n.id === toRef?.nodeId);
    if (!fromRef || !toRef || !fromNode || !toNode) return html``;

    const from = getAbsolutePort(fromNode, fromRef.portId);
    const to = getAbsolutePort(toNode, toRef.portId);
    if (!from || !to) return html``;

    const d = this.pipeStyle === "curved" ? buildPipePath(from, to) : buildOrthogonalPipePath(from, to);
    const id = connectionId(connection);
    const selected = this.selectedEdgeId === id;
    return svg`
      <path class="pipe ${selected ? "selected" : ""}" d="${d}" aria-hidden="true" />
      ${this.editable ? svg`<path class="pipe-hit" data-edge-id="${id}" d="${d}" />` : nothing}
    `;
  }

  private _resolveAddons(node: SchemaNode): ResolvedAddon[] {
    const states = this._states.value;
    const formatters = this._formatters.value;
    return (node.addons ?? []).map((config, index) => {
      const state = { ...resolveNodeVisualState(states, config, formatters), label: config.name };
      return {
        config,
        index,
        state: ADDON_TYPES[config.type]?.display === "binary" ? withNumericActivity(config, state) : state,
      };
    });
  }

  private _isActionable(target: Parameters<typeof actionTarget>[1]): boolean {
    if (this.editable) return false;
    const config = actionTarget(this.schema, target);
    return config !== undefined && (canTap(config) || hasAction(config.hold_action) || hasAction(config.double_tap_action));
  }

  private _badgeWidth(rect: Rect): number {
    return Math.max(rect.width, BADGE_MIN_WIDTH);
  }

  private _renderNode(node: SchemaNode, t: Translator): TemplateResult {
    const def = getNodeDefinition(node);
    if (!def) return html``;

    const selected = this.selectedNodeId === node.id;
    const addons = this._resolveAddons(node);
    const visualState = resolveNodeVisualState(this._states.value, node, this._formatters.value);
    if (!node.entity_id) visualState.active = activeFromAddons(addons);
    const deviceSvg = renderDeviceByType(node.type, def, t, selected, visualState, { addons });
    if (!deviceSvg) return html``;

    const rotation = normalizeRotation(node.rotation);
    const rect = getNodeBounds(node, def);
    const labelY = rect.y - node.position.y - 4;
    const badges = badgeAddons(node.type, addons);
    const name = node.name || t.t(def.labelKey);
    const actionable = this._isActionable({ nodeId: node.id });

    return svg`
      <g
        class="node ${this._dragNodeId === node.id ? "dragging" : ""} ${actionable ? "actionable" : ""}"
        data-node-id="${node.id}"
        role="${actionable ? "button" : "img"}"
        tabindex="${actionable ? "0" : nothing}"
        aria-label="${nodeDescription(name, visualState, Boolean(node.entity_id), addons, t)}"
        transform="translate(${node.position.x} ${node.position.y})"
      >
        <g transform="rotate(${rotation} ${def.width / 2} ${def.height / 2})">
          ${deviceSvg}
        </g>
        <text x="${def.width / 2}" y="${labelY}" text-anchor="middle" class="device-label">
          ${name}
        </text>
        ${badges.length
          ? renderAddonBadges(
              badges,
              t,
              rect.x - node.position.x,
              rect.y - node.position.y + rect.height + BADGE_OFFSET,
              this._badgeWidth(rect)
            )
          : nothing}
      </g>
    `;
  }

  private _renderOverlay(overlay: HeatingSchema["overlays"][number]): TemplateResult {
    const states = this._states.value;
    const formatters = this._formatters.value;
    const text = formatOverlayValue(states, formatters, overlay);
    const style = resolveOverlayStyle(states, overlay);
    if (!style.visible) return html``;

    const label = formatOverlayName(states, formatters, overlay);
    const display = `${label}: ${text}`;
    const width = Math.max(80, display.length * 7 + 16);
    const actionable = this._isActionable({ overlayId: overlay.id });

    return svg`
      <g
        class="overlay-group ${style.className ?? ""} ${actionable ? "actionable" : ""}"
        data-overlay-id="${overlay.id}"
        role="${actionable ? "button" : "img"}"
        tabindex="${actionable ? "0" : nothing}"
        aria-label="${display}"
        transform="translate(${overlay.position.x} ${overlay.position.y})"
      >
        <rect class="overlay-bg" x="0" y="0" width="${width}" height="22" rx="4" />
        <text class="overlay-text" x="8" y="15" style="${style.color ? `fill: ${style.color}` : ""}">
          ${display}
        </text>
      </g>
    `;
  }

  private _onCanvasPointerDown(ev: PointerEvent): void {
    if (!this.editable) {
      this._startPress(ev);
      return;
    }

    const target = ev.target as SVGElement | null;
    const edgeId = target?.getAttribute?.("data-edge-id");
    if (edgeId) {
      this.dispatchEvent(
        new CustomEvent("edge-select", {
          detail: { edgeId },
          bubbles: true,
          composed: true,
        })
      );
      return;
    }

    const nodeEl = target?.closest?.("[data-node-id]") as SVGGraphicsElement | null;
    if (!nodeEl) {
      this._dispatchSelect(undefined);
      return;
    }

    const nodeId = nodeEl.getAttribute("data-node-id");
    if (!nodeId) return;

    const node = this.schema.nodes.find((n) => n.id === nodeId);
    if (!node) return;

    const portEl = target?.closest?.("[data-port-id]") as SVGElement | null;
    if (portEl && this.drawing) {
      const portId = portEl.getAttribute("data-port-id");
      if (portId) {
        this._dispatchPortClick(nodeId, portId);
        ev.stopPropagation();
        return;
      }
    }

    if (!this.drawing) {
      this._dispatchSelect(nodeId);
      return;
    }

    this._dragNodeId = nodeId;
    const local = this._toLocal(ev);
    this._dragOffset = local
      ? { x: local.x - node.position.x, y: local.y - node.position.y }
      : { x: 0, y: 0 };
    this._dragBounds = this._computeBounds(this.schema.nodes);
    nodeEl.setPointerCapture(ev.pointerId);
    this._dispatchSelect(nodeId);
    ev.preventDefault();
  }

  /** Arrow keys move the selected device by one grid step, with Shift by five. */
  private _onKeyDown(ev: KeyboardEvent): void {
    if (!this.editable) {
      this._onActionKey(ev);
      return;
    }
    const direction = ARROW_KEYS[ev.key];
    const node = this.schema.nodes.find((n) => n.id === this.selectedNodeId);
    if (!this.editable || !direction || !node) return;
    ev.preventDefault();
    const step = ev.shiftKey ? NUDGE_STEP_LARGE : NUDGE_STEP;
    this.dispatchEvent(
      new CustomEvent("node-move", {
        detail: {
          nodeId: node.id,
          position: {
            x: snapToGrid(node.position.x + direction.x * step, GRID_SIZE),
            y: snapToGrid(node.position.y + direction.y * step, GRID_SIZE),
          },
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  /** Enter or Space on a focused device or overlay acts like a tap. */
  private _onActionKey(ev: KeyboardEvent): void {
    if (ev.key !== "Enter" && ev.key !== " ") return;
    const el = ev.target as Element | null;
    const nodeId = el?.getAttribute?.("data-node-id") ?? undefined;
    const overlayId = el?.getAttribute?.("data-overlay-id") ?? undefined;
    if (!nodeId && !overlayId) return;
    const config = actionTarget(this.schema, { nodeId, overlayId });
    if (!config || !canTap(config)) return;
    ev.preventDefault();
    this._fireAction(config, "tap");
  }

  private _toLocal(ev: PointerEvent): Point | undefined {
    const svgEl = this.renderRoot.querySelector("svg");
    const ctm = svgEl?.getScreenCTM();
    if (!svgEl || !ctm) return undefined;
    const pt = svgEl.createSVGPoint();
    pt.x = ev.clientX;
    pt.y = ev.clientY;
    return pt.matrixTransform(ctm.inverse());
  }

  private _onCanvasPointerMove(ev: PointerEvent): void {
    const press = this._press;
    if (press && Math.hypot(ev.clientX - press.x, ev.clientY - press.y) > MOVE_TOLERANCE) this._cancelPress();
    if (!this.editable || !this._dragNodeId) return;

    const node = this.schema.nodes.find((n) => n.id === this._dragNodeId);
    const local = this._toLocal(ev);
    if (!node || !local) return;

    const offset = this._dragOffset ?? { x: 0, y: 0 };
    const position = {
      x: snapToGrid(local.x - offset.x, GRID_SIZE),
      y: snapToGrid(local.y - offset.y, GRID_SIZE),
    };
    if (position.x === node.position.x && position.y === node.position.y) return;

    this.dispatchEvent(
      new CustomEvent("node-move", {
        detail: { nodeId: node.id, position },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onCanvasPointerUp(ev: PointerEvent): void {
    if (this._press) {
      this._endPress();
      return;
    }
    if (this._dragNodeId) {
      const nodeEl = this.renderRoot.querySelector(
        `[data-node-id="${this._dragNodeId}"]`
      ) as SVGGraphicsElement | null;
      nodeEl?.releasePointerCapture(ev.pointerId);
      this._dragNodeId = undefined;
      this._dragOffset = undefined;
      this._dragBounds = undefined;
      this.requestUpdate();
    }
  }

  private _onCanvasPointerLeave(ev: PointerEvent): void {
    this._cancelPress();
    this._onCanvasPointerUp(ev);
  }

  private _startPress(ev: PointerEvent): void {
    const el = ev.target as Element | null;
    const nodeId = el?.closest?.("[data-node-id]")?.getAttribute("data-node-id") ?? undefined;
    const overlayId = el?.closest?.("[data-overlay-id]")?.getAttribute("data-overlay-id") ?? undefined;
    const addon = el?.closest?.("[data-addon-index]")?.getAttribute("data-addon-index") ?? undefined;
    const config = actionTarget(this.schema, {
      nodeId,
      overlayId,
      addonIndex: addon === undefined || addon === "" ? undefined : Number(addon),
    });
    if (!config) return;

    const press: Press = { key: `${overlayId ?? nodeId}/${addon ?? ""}`, config, x: ev.clientX, y: ev.clientY, held: false };
    if (hasAction(config.hold_action)) {
      press.timer = window.setTimeout(() => {
        press.held = true;
        this._fireAction(config, "hold");
      }, HOLD_MS);
    }
    this._press = press;
  }

  private _cancelPress(): void {
    window.clearTimeout(this._press?.timer);
    this._press = undefined;
  }

  private _endPress(): void {
    const press = this._press;
    this._cancelPress();
    if (!press || press.held) return;
    const { config, key } = press;

    if (!hasAction(config.double_tap_action)) {
      if (canTap(config)) this._fireAction(config, "tap");
      return;
    }
    if (this._pendingTap?.key === key) {
      window.clearTimeout(this._pendingTap.timer);
      this._pendingTap = undefined;
      this._fireAction(config, "double_tap");
      return;
    }
    window.clearTimeout(this._pendingTap?.timer);
    this._pendingTap = {
      key,
      timer: window.setTimeout(() => {
        this._pendingTap = undefined;
        if (canTap(config)) this._fireAction(config, "tap");
      }, DOUBLE_TAP_MS),
    };
  }

  private _fireAction(config: ActionHandlerConfig, action: ActionKind): void {
    this.dispatchEvent(new CustomEvent("hass-action", { detail: { config, action }, bubbles: true, composed: true }));
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._cancelPress();
    window.clearTimeout(this._pendingTap?.timer);
    this._pendingTap = undefined;
  }

  private _dispatchSelect(nodeId: string | undefined): void {
    this.dispatchEvent(
      new CustomEvent("node-select", {
        detail: { nodeId },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _dispatchPortClick(nodeId: string, portId: string): void {
    this.dispatchEvent(
      new CustomEvent("port-click", {
        detail: { nodeId, portId },
        bubbles: true,
        composed: true,
      })
    );
  }
}
