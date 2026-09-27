import { css, html, LitElement, nothing, svg, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import type {
  HassEntities,
  HomeAssistantFormatters,
  HomeAssistantInternationalization,
} from "../types/home-assistant.js";
import type { Connection, HeatingSchema, SchemaNode } from "../models/schema.js";
import { connectionId, parsePortRef } from "../models/schema.js";
import { getNodeDefinition } from "../models/device-registry.js";
import { createTranslator } from "../i18n/index.js";
import type { Translator } from "../i18n/translations.js";
import {
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
import { renderDeviceByType } from "./devices/heat-pump.js";

const GRID_SIZE = 10;

@customElement("heating-schema-canvas")
export class HeatingSchemaCanvas extends LitElement {
  @property({ attribute: false }) public schema: HeatingSchema = {
    nodes: [],
    connections: [],
    overlays: [],
  };
  @property({ type: Boolean }) public editable = false;
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
      cursor: grab;
    }
    :host([editable]) .node.dragging {
      cursor: grabbing;
    }
    .overlay-group {
      pointer-events: none;
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
  }

  protected render(): TemplateResult {
    const t = this._translator();
    const { nodes, connections, overlays } = this.schema;
    const bounds = this._dragBounds ?? this._computeBounds(nodes);

    return html`
      <svg
        viewBox="${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}"
        @pointerdown="${this._onCanvasPointerDown}"
        @pointermove="${this._onCanvasPointerMove}"
        @pointerup="${this._onCanvasPointerUp}"
        @pointerleave="${this._onCanvasPointerUp}"
      >
        ${this.editable
          ? svg`
            <defs>
              <pattern id="grid" width="${GRID_SIZE * 2}" height="${GRID_SIZE * 2}" patternUnits="userSpaceOnUse">
                <circle class="grid-dot" cx="0" cy="0" r="1" />
              </pattern>
            </defs>
            <rect x="${bounds.x}" y="${bounds.y}" width="${bounds.width}" height="${bounds.height}" fill="url(#grid)" />
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
      minX = Math.min(minX, rect.x);
      minY = Math.min(minY, rect.y - 20);
      maxX = Math.max(maxX, rect.x + rect.width);
      maxY = Math.max(maxY, rect.y + rect.height + 10);
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

    const d = buildPipePath(from, to);
    const id = connectionId(connection);
    const selected = this.selectedEdgeId === id;
    return svg`
      <path class="pipe ${selected ? "selected" : ""}" d="${d}" />
      ${this.editable ? svg`<path class="pipe-hit" data-edge-id="${id}" d="${d}" />` : nothing}
    `;
  }

  private _renderNode(node: SchemaNode, t: Translator): TemplateResult {
    const def = getNodeDefinition(node);
    if (!def) return html``;

    const selected = this.selectedNodeId === node.id;
    const states = this._states.value;
    const formatters = this._formatters.value;
    const visualState = resolveNodeVisualState(states, node, formatters);
    const addons = (node.addons ?? []).map((config) => ({
      config,
      state: { ...resolveNodeVisualState(states, config, formatters), label: config.name },
    }));
    const deviceSvg = renderDeviceByType(node.type, def, t, selected, visualState, { addons });
    if (!deviceSvg) return html``;

    const rotation = normalizeRotation(node.rotation);
    const rect = getNodeBounds(node, def);
    const labelY = rect.y - node.position.y - 4;

    return svg`
      <g
        class="node ${this._dragNodeId === node.id ? "dragging" : ""}"
        data-node-id="${node.id}"
        transform="translate(${node.position.x} ${node.position.y})"
      >
        <g transform="rotate(${rotation} ${def.width / 2} ${def.height / 2})">
          ${deviceSvg}
        </g>
        <text x="${def.width / 2}" y="${labelY}" text-anchor="middle" class="device-label">
          ${node.name || t.t(def.labelKey)}
        </text>
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

    return svg`
      <g class="overlay-group ${style.className ?? ""}" transform="translate(${overlay.position.x} ${overlay.position.y})">
        <rect class="overlay-bg" x="0" y="0" width="${width}" height="22" rx="4" />
        <text class="overlay-text" x="8" y="15" style="${style.color ? `fill: ${style.color}` : ""}">
          ${display}
        </text>
      </g>
    `;
  }

  private _onCanvasPointerDown(ev: PointerEvent): void {
    if (!this.editable) return;

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
    if (portEl) {
      const portId = portEl.getAttribute("data-port-id");
      if (portId) {
        this._dispatchPortClick(nodeId, portId);
        ev.stopPropagation();
        return;
      }
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
