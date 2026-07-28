import { css, html, LitElement, svg, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { HomeAssistant } from "../types/home-assistant.js";
import type { HeatingSchema, SchemaNode } from "../models/schema.js";
import { getDeviceDefinition } from "../models/device-registry.js";
import { createTranslator } from "../i18n/index.js";
import type { Translator } from "../i18n/translations.js";
import { buildPipePath, getAbsolutePort } from "../utils/geometry.js";
import { formatOverlayValue, resolveNodeVisualState, resolveOverlayStyle } from "../utils/entity.js";
import { renderDeviceByType } from "./devices/heat-pump.js";
import type { HeatingVisualizerConfig } from "../models/schema.js";

@customElement("heating-schema-canvas")
export class HeatingSchemaCanvas extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public schema: HeatingSchema = {
    nodes: [],
    edges: [],
    overlays: [],
  };
  @property({ attribute: false }) public config?: HeatingVisualizerConfig;
  @property({ type: Boolean }) public editable = false;
  @property({ attribute: false }) public selectedNodeId?: string;
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
    .device-label {
      fill: var(--primary-text-color, #e0e0e0);
      font-size: 11px;
      font-family: var(--ha-font-family, sans-serif);
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
      font-size: 12px;
      font-family: var(--ha-font-family, monospace);
    }
    .port-highlight {
      stroke: var(--primary-color, #03a9f4) !important;
      stroke-width: 3 !important;
    }
  `;

  private _dragNodeId?: string;

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("editable")) {
      this.toggleAttribute("editable", this.editable);
    }
  }

  protected render(): TemplateResult {
    const t = this._translator();
    const { nodes, edges, overlays } = this.schema;
    const bounds = this._computeBounds(nodes);

    return html`
      <svg
        viewBox="${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}"
        @pointerdown="${this._onCanvasPointerDown}"
        @pointermove="${this._onCanvasPointerMove}"
        @pointerup="${this._onCanvasPointerUp}"
        @pointerleave="${this._onCanvasPointerUp}"
      >
        ${edges.map((edge) => this._renderEdge(edge))}
        ${nodes.map((node) => this._renderNode(node, t))}
        ${overlays.map((overlay) => this._renderOverlay(overlay, t))}
      </svg>
    `;
  }

  private _translator(): Translator {
    return createTranslator(this.config?.language, this.config?.translations);
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
      const def = getDeviceDefinition(node.type);
      if (!def) continue;
      minX = Math.min(minX, node.position.x);
      minY = Math.min(minY, node.position.y - 20);
      maxX = Math.max(maxX, node.position.x + def.width);
      maxY = Math.max(maxY, node.position.y + def.height + 10);
    }

    const pad = 40;
    return {
      x: minX - pad,
      y: minY - pad,
      width: maxX - minX + pad * 2,
      height: maxY - minY + pad * 2,
    };
  }

  private _renderEdge(edge: HeatingSchema["edges"][number]): TemplateResult {
    const fromNode = this.schema.nodes.find((n) => n.id === edge.from.nodeId);
    const toNode = this.schema.nodes.find((n) => n.id === edge.to.nodeId);
    if (!fromNode || !toNode) return html``;

    const from = getAbsolutePort(fromNode, edge.from.portId);
    const to = getAbsolutePort(toNode, edge.to.portId);
    if (!from || !to) return html``;

    return svg`<path class="pipe" d="${buildPipePath(from, to)}" />`;
  }

  private _renderNode(node: SchemaNode, t: Translator): TemplateResult {
    const def = getDeviceDefinition(node.type);
    if (!def) return html``;

    const selected = this.selectedNodeId === node.id;
    const visualState = resolveNodeVisualState(this.hass, node.state);
    const deviceSvg = renderDeviceByType(node.type, def, t, selected, visualState);
    if (!deviceSvg) return html``;

    return svg`
      <g
        class="node ${this._dragNodeId === node.id ? "dragging" : ""}"
        data-node-id="${node.id}"
        transform="translate(${node.position.x} ${node.position.y})"
      >
        ${deviceSvg}
      </g>
    `;
  }

  private _renderOverlay(
    overlay: HeatingSchema["overlays"][number],
    t: Translator
  ): TemplateResult {
    const text = formatOverlayValue(this.hass, overlay);
    const style = resolveOverlayStyle(this.hass, overlay);
    if (!style.visible) return html``;

    const label = overlay.labelKey ? t.t(overlay.labelKey) : overlay.entity_id;
    const display = `${label}: ${text}`;
    const width = Math.max(80, display.length * 7 + 16);

    return svg`
      <g class="overlay-group ${style.className ?? ""}" transform="translate(${overlay.position.x} ${overlay.position.y})">
        <rect class="overlay-bg" x="0" y="0" width="${width}" height="22" rx="4" />
        <text class="overlay-text" x="8" y="15" fill="${style.color ?? "var(--primary-text-color, #e0e0e0)"}">
          ${display}
        </text>
      </g>
    `;
  }

  private _onCanvasPointerDown(ev: PointerEvent): void {
    if (!this.editable) return;

    const target = ev.target as SVGElement | null;
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
    nodeEl.setPointerCapture(ev.pointerId);
    this._dispatchSelect(nodeId);
    ev.preventDefault();
  }

  private _onCanvasPointerMove(ev: PointerEvent): void {
    if (!this.editable || !this._dragNodeId) return;

    const node = this.schema.nodes.find((n) => n.id === this._dragNodeId);
    if (!node) return;

    const svgEl = this.renderRoot.querySelector("svg");
    if (!svgEl) return;

    const pt = svgEl.createSVGPoint();
    pt.x = ev.clientX;
    pt.y = ev.clientY;
    const ctm = svgEl.getScreenCTM();
    if (!ctm) return;

    const local = pt.matrixTransform(ctm.inverse());
    this.dispatchEvent(
      new CustomEvent("node-move", {
        detail: {
          nodeId: node.id,
          position: { x: Math.round(local.x), y: Math.round(local.y) },
        },
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
