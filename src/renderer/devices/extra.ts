import { svg } from "lit";
import type { DeviceDefinition } from "../../models/schema.js";
import type { Translator } from "../../i18n/translations.js";
import type { NodeVisualState } from "../../utils/entity.js";
import {
  CARD_FILL,
  HEATER_ACTIVE_COLOR,
  NEUTRAL_STROKE,
  type SvgResult,
  frameStroke,
  frameWidth,
  numericValue,
  renderHeaterCoil,
  renderPortStubs,
  renderPorts,
} from "./common.js";

type HeatSourceIcon = "flame" | "coil" | "logs";

function flamePath(cx: number, cy: number, scale = 1): string {
  const s = (v: number): number => v * scale;
  return `M ${cx} ${cy + s(16)} C ${cx - s(13)} ${cy + s(16)}, ${cx - s(13)} ${cy}, ${cx - s(4)} ${cy - s(16)}
    C ${cx - s(2)} ${cy - s(6)}, ${cx + s(4)} ${cy - s(4)}, ${cx + s(4)} ${cy - s(10)}
    C ${cx + s(12)} ${cy - s(2)}, ${cx + s(13)} ${cy + s(16)}, ${cx} ${cy + s(16)} Z`;
}

function renderFlame(cx: number, cy: number, active: boolean, scale = 1): SvgResult {
  return svg`
    <path d="${flamePath(cx, cy, scale)}"
      fill="${active ? HEATER_ACTIVE_COLOR : "none"}" fill-opacity="0.85"
      stroke="${active ? HEATER_ACTIVE_COLOR : NEUTRAL_STROKE}" stroke-width="1.5" stroke-linejoin="round" />
  `;
}

function renderHeatSource(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState,
  icon: HeatSourceIcon
): SvgResult {
  const cx = def.width / 2 - 4;
  const cy = def.height / 2 + 14;
  const value = numericValue(state);
  let iconSvg: SvgResult;
  if (icon === "coil") {
    iconSvg = renderHeaterCoil(cx - 20, cy + 6, 40, state);
  } else if (icon === "logs") {
    iconSvg = svg`
      ${renderFlame(cx, cy - 6, state.active, 0.8)}
      <path d="M ${cx - 18} ${cy + 18} L ${cx + 18} ${cy + 10} M ${cx - 18} ${cy + 10} L ${cx + 18} ${cy + 18}"
        stroke="#8d6e63" stroke-width="5" stroke-linecap="round" />
    `;
  } else {
    iconSvg = renderFlame(cx, cy, state.active);
  }

  return svg`
    <g class="device device-heat-source">
      ${renderPortStubs(def, 12)}
      <rect x="8" y="10" width="${def.width - 20}" height="${def.height - 20}" rx="8"
        fill="${CARD_FILL}" stroke="${frameStroke(state, selected, HEATER_ACTIVE_COLOR)}"
        stroke-width="${frameWidth(selected)}" />
      ${value ? svg`<text x="${cx}" y="34" text-anchor="middle" class="device-value">${value}</text>` : svg``}
      ${iconSvg}
      ${renderPorts(def, t)}
    </g>
  `;
}

const SOLAR_ACTIVE_COLOR = "#ffb300";

function renderSolarCollector(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): SvgResult {
  const stroke = frameStroke(state, selected, SOLAR_ACTIVE_COLOR);
  const value = numericValue(state);
  return svg`
    <g class="device device-solar-collector">
      <path d="M 124 22 L ${def.width} 22 M 100 84 L ${def.width} 84" stroke="${NEUTRAL_STROKE}" stroke-width="2" />
      <path d="M 10 84 L 36 22 L 124 22 L 100 84 Z" fill="${CARD_FILL}"
        stroke="${stroke}" stroke-width="${frameWidth(selected)}" stroke-linejoin="round" />
      <path d="M 58 22 L 32 84 M 80 22 L 54 84 M 102 22 L 76 84 M 23 53 L 112 53"
        stroke="${NEUTRAL_STROKE}" stroke-width="1" />
      <circle cx="20" cy="14" r="6" fill="${state.active ? SOLAR_ACTIVE_COLOR : "none"}" stroke="${SOLAR_ACTIVE_COLOR}" stroke-width="1.5" />
      ${value ? svg`<text x="67" y="${def.height - 2}" text-anchor="middle" class="device-value">${value}</text>` : svg``}
      ${renderPorts(def, t)}
    </g>
  `;
}

/** Renderers for devices added after the initial set. */
export function renderExtraDevice(
  type: string,
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): SvgResult | undefined {
  switch (type) {
    case "gas_boiler":
      return renderHeatSource(def, t, selected, state, "flame");
    case "electric_boiler":
      return renderHeatSource(def, t, selected, state, "coil");
    case "solid_fuel_boiler":
      return renderHeatSource(def, t, selected, state, "logs");
    case "solar_collector":
      return renderSolarCollector(def, t, selected, state);
    default:
      return undefined;
  }
}
