import { svg } from "lit";
import type { DeviceDefinition, PortDefinition } from "../../models/schema.js";
import type { Translator } from "../../i18n/translations.js";
import type { NodeVisualState } from "../../utils/entity.js";

export type SvgResult = ReturnType<typeof svg>;

export const SUPPLY_COLOR = "#ef5350";
export const RETURN_COLOR = "#42a5f5";
export const ACTIVE_COLOR = "#4caf50";
export const HEATER_ACTIVE_COLOR = "#ff7043";
export const CARD_FILL = "var(--card-background-color, #1c1c1c)";
export const NEUTRAL_STROKE = "var(--divider-color, #888)";
export const ACCENT = "var(--primary-color, #03a9f4)";

/** Temperatures mapped onto the blue → red scale. */
const TEMP_COLD = 20;
const TEMP_HOT = 60;

export function temperatureColor(value: number | undefined): string {
  if (value === undefined) return NEUTRAL_STROKE;
  const f = Math.min(1, Math.max(0, (value - TEMP_COLD) / (TEMP_HOT - TEMP_COLD)));
  return `hsl(${Math.round(220 * (1 - f))}, 75%, 50%)`;
}

export function frameStroke(state: NodeVisualState, selected: boolean, activeColor = ACTIVE_COLOR): string {
  if (state.active) return activeColor;
  return selected ? ACCENT : NEUTRAL_STROKE;
}

export function frameWidth(selected: boolean): number {
  return selected ? 2.5 : 1.5;
}

export function renderPorts(def: DeviceDefinition, t: Translator): SvgResult[] {
  return def.ports.map((port: PortDefinition) => svg`
    <circle
      class="port port-${port.kind}"
      data-port-id="${port.id}"
      cx="${port.position.x}" cy="${port.position.y}" r="5"
      fill="${CARD_FILL}"
      stroke="${port.kind === "inlet" ? "#4fc3f7" : "#ff8a65"}"
      stroke-width="2"
    ><title>${t.t(port.labelKey, ...(port.labelArgs ?? []))}</title></circle>
  `);
}

/** Zig-zag heating element; glows when the bound entity is active. */
export function renderHeaterCoil(x: number, y: number, width: number, heater: NodeVisualState): SvgResult {
  const steps = 6;
  const step = width / steps;
  let d = `M ${x} ${y}`;
  for (let i = 1; i <= steps; i++) {
    d += ` L ${x + i * step} ${y + (i % 2 === 0 ? 0 : -8)}`;
  }
  const color = heater.active ? HEATER_ACTIVE_COLOR : NEUTRAL_STROKE;
  return svg`
    <path class="heater ${heater.active ? "active" : ""}" d="${d}" fill="none"
      stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
  `;
}

/** Short pipe stubs from each port towards the device body. */
export function renderPortStubs(def: DeviceDefinition, length: number): SvgResult[] {
  return def.ports.map((p) => {
    const { x, y } = p.position;
    const dx = x === 0 ? length : x === def.width ? -length : 0;
    const dy = y === 0 ? length : y === def.height ? -length : 0;
    return svg`<line x1="${x}" y1="${y}" x2="${x + dx}" y2="${y + dy}" stroke="${NEUTRAL_STROKE}" stroke-width="2" />`;
  });
}

/** Value text shown only for numeric states, e.g. a temperature. */
export function numericValue(state: NodeVisualState): string | undefined {
  return state.numeric !== undefined || state.fromAttribute ? state.value : undefined;
}
