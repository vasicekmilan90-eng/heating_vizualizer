import { svg } from "lit";
import type { DeviceDefinition } from "../../models/schema.js";
import type { Translator } from "../../i18n/translations.js";
import type { NodeVisualState } from "../../utils/entity.js";
import {
  ACCENT,
  ACTIVE_COLOR,
  CARD_FILL,
  HEATER_ACTIVE_COLOR,
  NEUTRAL_STROKE,
  RETURN_COLOR,
  SUPPLY_COLOR,
  type SvgResult,
  frameStroke,
  frameWidth,
  numericValue,
  renderPortStubs,
  renderPorts,
} from "./common.js";

/** Fuel-agnostic boiler: three heat waves that glow while it is heating. */
function renderHeatSource(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): SvgResult {
  const cx = def.width / 2 - 4;
  const cy = def.height / 2 + 14;
  const value = numericValue(state);
  const waveColor = state.active ? HEATER_ACTIVE_COLOR : NEUTRAL_STROKE;
  const waves = [-14, 0, 14].map((dx) => {
    const x = cx + dx;
    return svg`
      <path d="M ${x} ${cy + 18} C ${x - 6} ${cy + 10}, ${x + 6} ${cy + 2}, ${x} ${cy - 6}
        C ${x - 6} ${cy - 14}, ${x + 6} ${cy - 20}, ${x} ${cy - 26}"
        fill="none" stroke="${waveColor}" stroke-width="2.5" stroke-linecap="round" />
    `;
  });

  return svg`
    <g class="device device-heat-source">
      ${renderPortStubs(def, 12)}
      <rect x="8" y="10" width="${def.width - 20}" height="${def.height - 20}" rx="8"
        fill="${CARD_FILL}" stroke="${frameStroke(state, selected, HEATER_ACTIVE_COLOR)}"
        stroke-width="${frameWidth(selected)}" />
      ${value ? svg`<text x="${cx}" y="30" text-anchor="middle" class="device-value">${value}</text>` : svg``}
      ${waves}
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

function renderHydraulicSeparator(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): SvgResult {
  const left = 25;
  const right = def.width - 25;
  const top = 8;
  const bottom = def.height - 8;
  const middle = def.height / 2;
  const value = numericValue(state);
  return svg`
    <g class="device device-hydraulic-separator">
      ${renderPortStubs(def, left)}
      <rect x="${left}" y="${top}" width="${right - left}" height="${middle - top}" fill="${SUPPLY_COLOR}" opacity="0.25" />
      <rect x="${left}" y="${middle}" width="${right - left}" height="${bottom - middle}" fill="${RETURN_COLOR}" opacity="0.25" />
      <rect x="${left}" y="${top}" width="${right - left}" height="${bottom - top}" rx="${(right - left) / 2}"
        fill="none" stroke="${frameStroke(state, selected)}" stroke-width="${frameWidth(selected)}" />
      ${value ? svg`<text x="${def.width / 2}" y="${middle + 4}" text-anchor="middle" class="device-value">${value}</text>` : svg``}
      ${renderPorts(def, t)}
    </g>
  `;
}

function renderPlateHeatExchanger(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): SvgResult {
  const left = 22;
  const right = def.width - 22;
  const plates: SvgResult[] = [];
  for (let x = left + 7, i = 0; x < right - 3; x += 7, i++) {
    plates.push(svg`<line x1="${x}" y1="18" x2="${x}" y2="${def.height - 18}"
      stroke="${i % 2 === 0 ? SUPPLY_COLOR : RETURN_COLOR}" stroke-width="2" opacity="0.8" />`);
  }
  return svg`
    <g class="device device-plate-heat-exchanger">
      ${renderPortStubs(def, left)}
      <rect x="${left}" y="10" width="${right - left}" height="${def.height - 20}" rx="4"
        fill="${CARD_FILL}" stroke="${frameStroke(state, selected)}" stroke-width="${frameWidth(selected)}" />
      ${plates}
      ${renderPorts(def, t)}
    </g>
  `;
}

function renderExpansionVessel(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): SvgResult {
  const cx = def.width / 2;
  const top = 8;
  const bottom = 86;
  const membrane = (top + bottom) / 2;
  const value = numericValue(state);
  return svg`
    <g class="device device-expansion-vessel">
      <line x1="${cx}" y1="${bottom}" x2="${cx}" y2="${def.height}" stroke="${NEUTRAL_STROKE}" stroke-width="2" />
      <rect x="13" y="${membrane}" width="${def.width - 26}" height="${bottom - membrane - 8}" fill="${RETURN_COLOR}" opacity="0.2" />
      <rect x="12" y="${top}" width="${def.width - 24}" height="${bottom - top}" rx="${(def.width - 24) / 2}"
        fill="none" stroke="${frameStroke(state, selected)}" stroke-width="${frameWidth(selected)}" />
      <path d="M 13 ${membrane} Q ${cx} ${membrane + 8} ${def.width - 13} ${membrane}"
        fill="none" stroke="${NEUTRAL_STROKE}" stroke-width="1.5" stroke-dasharray="3 2" />
      ${value ? svg`<text x="${cx}" y="${membrane - 10}" text-anchor="middle" class="device-value">${value}</text>` : svg``}
      ${renderPorts(def, t)}
    </g>
  `;
}

function renderSafetyValve(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): SvgResult {
  const stroke = frameStroke(state, selected, SUPPLY_COLOR);
  const width = frameWidth(selected);
  const cx = 30;
  const cy = 56;
  return svg`
    <g class="device device-safety-valve">
      <line x1="${cx}" y1="${cy + 14}" x2="${cx}" y2="${def.height}" stroke="${NEUTRAL_STROKE}" stroke-width="2" />
      <line x1="${cx + 14}" y1="${cy}" x2="${def.width}" y2="${cy}" stroke="${NEUTRAL_STROKE}" stroke-width="2" />
      <path d="M ${cx - 12} ${cy + 14} L ${cx + 12} ${cy + 14} L ${cx} ${cy} Z M ${cx + 14} ${cy - 12} L ${cx + 14} ${cy + 12} L ${cx} ${cy} Z"
        fill="${state.active ? SUPPLY_COLOR : CARD_FILL}" fill-opacity="${state.active ? 0.5 : 1}"
        stroke="${stroke}" stroke-width="${width}" stroke-linejoin="round" />
      <path d="M ${cx} ${cy} L ${cx} ${cy - 8} L ${cx - 7} ${cy - 12} L ${cx + 7} ${cy - 18} L ${cx - 7} ${cy - 24}
        L ${cx + 7} ${cy - 30} L ${cx - 7} ${cy - 36} L ${cx} ${cy - 40}"
        fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linejoin="round" />
      ${renderPorts(def, t)}
    </g>
  `;
}

function renderZoneValve(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): SvgResult {
  const stroke = frameStroke(state, selected);
  const width = frameWidth(selected);
  const cx = def.width / 2;
  const cy = 50;
  return svg`
    <g class="device device-zone-valve">
      <line x1="0" y1="${cy}" x2="${cx - 16}" y2="${cy}" stroke="${NEUTRAL_STROKE}" stroke-width="2" />
      <line x1="${cx + 16}" y1="${cy}" x2="${def.width}" y2="${cy}" stroke="${NEUTRAL_STROKE}" stroke-width="2" />
      <path d="M ${cx - 16} ${cy - 11} L ${cx} ${cy} L ${cx - 16} ${cy + 11} Z M ${cx + 16} ${cy - 11} L ${cx} ${cy} L ${cx + 16} ${cy + 11} Z"
        fill="${state.active ? ACTIVE_COLOR : CARD_FILL}" fill-opacity="${state.active ? 0.45 : 1}"
        stroke="${stroke}" stroke-width="${width}" stroke-linejoin="round" />
      <line x1="${cx}" y1="${cy}" x2="${cx}" y2="30" stroke="${stroke}" stroke-width="2" />
      <rect x="${cx - 12}" y="10" width="24" height="20" rx="3"
        fill="${state.active ? ACTIVE_COLOR : CARD_FILL}" stroke="${stroke}" stroke-width="${width}" />
      ${renderPorts(def, t)}
    </g>
  `;
}

function renderRadiator(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): SvgResult {
  const value = numericValue(state);
  const fins: SvgResult[] = [];
  for (let x = 26; x <= def.width - 24; x += 10) {
    fins.push(svg`<line x1="${x}" y1="22" x2="${x}" y2="58" stroke="${NEUTRAL_STROKE}" stroke-width="1.5" />`);
  }
  return svg`
    <g class="device device-radiator">
      <path d="M 0 66 L 16 66 L 16 62 M ${def.width - 16} 62 L ${def.width - 16} 66 L ${def.width} 66"
        fill="none" stroke="${NEUTRAL_STROKE}" stroke-width="2" />
      <rect x="16" y="16" width="${def.width - 32}" height="46" rx="4"
        fill="${state.active ? HEATER_ACTIVE_COLOR : CARD_FILL}" fill-opacity="${state.active ? 0.2 : 1}"
        stroke="${frameStroke(state, selected, HEATER_ACTIVE_COLOR)}" stroke-width="${frameWidth(selected)}" />
      ${fins}
      <rect x="4" y="26" width="10" height="18" rx="3" fill="${CARD_FILL}" stroke="${NEUTRAL_STROKE}" stroke-width="1.5" />
      ${value ? svg`<text x="${def.width / 2}" y="10" text-anchor="middle" class="device-value">${value}</text>` : svg``}
      ${renderPorts(def, t)}
    </g>
  `;
}

function renderFancoil(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): SvgResult {
  const value = numericValue(state);
  const cx = 46;
  const cy = 38;
  const blade = "M 0 0 C 4 -7, 13 -9, 17 -4 C 12 -1, 5 0, 0 0 Z";
  return svg`
    <g class="device device-fancoil">
      <path d="M 0 66 L 16 66 M ${def.width - 16} 66 L ${def.width} 66" stroke="${NEUTRAL_STROKE}" stroke-width="2" />
      <rect x="16" y="12" width="${def.width - 32}" height="54" rx="6"
        fill="${CARD_FILL}" stroke="${frameStroke(state, selected)}" stroke-width="${frameWidth(selected)}" />
      <circle cx="${cx}" cy="${cy}" r="20" fill="none" stroke="${NEUTRAL_STROKE}" stroke-width="1.5" />
      <g class="fan ${state.active ? "spinning" : ""}">
        ${[0, 90, 180, 270].map((angle) => svg`
          <path d="${blade}" transform="translate(${cx} ${cy}) rotate(${angle})" fill="${ACCENT}" opacity="0.75" />
        `)}
        <circle cx="${cx}" cy="${cy}" r="3.5" fill="${ACCENT}" />
      </g>
      <path d="M 76 50 L 104 50 M 76 56 L 104 56" stroke="${NEUTRAL_STROKE}" stroke-width="1.5" />
      ${value ? svg`<text x="90" y="36" text-anchor="middle" class="device-value">${value}</text>` : svg``}
      ${renderPorts(def, t)}
    </g>
  `;
}

function renderOutdoorTemperature(
  def: DeviceDefinition,
  selected: boolean,
  state: NodeVisualState
): SvgResult {
  const stroke = selected ? ACCENT : NEUTRAL_STROKE;
  return svg`
    <g class="device device-outdoor-temperature">
      <rect x="2" y="6" width="${def.width - 4}" height="${def.height - 12}" rx="${(def.height - 12) / 2}"
        fill="${CARD_FILL}" stroke="${stroke}" stroke-width="${frameWidth(selected)}" />
      <circle cx="22" cy="${def.height / 2}" r="6" fill="none" stroke="#ffb300" stroke-width="1.5" />
      <path d="M 22 13 V 16 M 22 34 V 37 M 10 25 H 13 M 31 25 H 34 M 14 17 L 16 19 M 28 31 L 30 33 M 14 33 L 16 31 M 28 19 L 30 17"
        stroke="#ffb300" stroke-width="1.5" stroke-linecap="round" />
      <text x="${def.width / 2 + 14}" y="${def.height / 2 + 4}" text-anchor="middle" class="device-value">
        ${state.value ?? "—"}
      </text>
    </g>
  `;
}

function dropPath(cx: number, cy: number): string {
  return `M ${cx} ${cy - 7} C ${cx + 5} ${cy - 1}, ${cx + 5} ${cy + 6}, ${cx} ${cy + 6} C ${cx - 5} ${cy + 6}, ${cx - 5} ${cy - 1}, ${cx} ${cy - 7} Z`;
}

function renderWaterSupply(def: DeviceDefinition, t: Translator, selected: boolean, state: NodeVisualState): SvgResult {
  const cy = def.height / 2;
  return svg`
    <g class="device device-water-supply">
      <line x1="36" y1="${cy}" x2="${def.width}" y2="${cy}" stroke="${RETURN_COLOR}" stroke-width="3" />
      <circle cx="22" cy="${cy}" r="16" fill="${CARD_FILL}" stroke="${frameStroke(state, selected, RETURN_COLOR)}"
        stroke-width="${frameWidth(selected)}" />
      <path d="${dropPath(22, cy)}" fill="${RETURN_COLOR}" opacity="0.85" />
      <path d="M 50 ${cy - 8} L 62 ${cy + 8} M 50 ${cy + 8} L 62 ${cy - 8} M 50 ${cy - 8} V ${cy + 8} M 62 ${cy - 8} V ${cy + 8}"
        stroke="${NEUTRAL_STROKE}" stroke-width="1.5" />
      ${renderPorts(def, t)}
    </g>
  `;
}

function renderDhwOutlet(def: DeviceDefinition, t: Translator, selected: boolean, state: NodeVisualState): SvgResult {
  const cy = def.height / 2;
  const color = state.active ? SUPPLY_COLOR : NEUTRAL_STROKE;
  return svg`
    <g class="device device-dhw-outlet">
      <line x1="0" y1="${cy}" x2="40" y2="${cy}" stroke="${SUPPLY_COLOR}" stroke-width="3" />
      <path d="M 40 ${cy - 6} H 58 Q 66 ${cy - 6} 66 ${cy + 2} V ${cy + 6} M 40 ${cy + 6} H 54 Q 58 ${cy + 6} 58 ${cy + 10}"
        fill="none" stroke="${selected ? ACCENT : NEUTRAL_STROKE}" stroke-width="${frameWidth(selected) + 1}" stroke-linecap="round" />
      <path d="M 46 ${cy - 6} V ${cy - 14} M 42 ${cy - 14} H 50" stroke="${NEUTRAL_STROKE}" stroke-width="2" stroke-linecap="round" />
      <path d="${dropPath(62, cy + 18)}" fill="${color}" opacity="0.85" />
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
    case "heating_boiler":
      return renderHeatSource(def, t, selected, state);
    case "solar_collector":
      return renderSolarCollector(def, t, selected, state);
    case "hydraulic_separator":
      return renderHydraulicSeparator(def, t, selected, state);
    case "plate_heat_exchanger":
      return renderPlateHeatExchanger(def, t, selected, state);
    case "expansion_vessel":
      return renderExpansionVessel(def, t, selected, state);
    case "safety_valve":
      return renderSafetyValve(def, t, selected, state);
    case "zone_valve":
      return renderZoneValve(def, t, selected, state);
    case "radiator":
      return renderRadiator(def, t, selected, state);
    case "fancoil":
      return renderFancoil(def, t, selected, state);
    case "outdoor_temperature":
      return renderOutdoorTemperature(def, selected, state);
    case "water_supply":
      return renderWaterSupply(def, t, selected, state);
    case "dhw_outlet":
      return renderDhwOutlet(def, t, selected, state);
    default:
      return undefined;
  }
}
