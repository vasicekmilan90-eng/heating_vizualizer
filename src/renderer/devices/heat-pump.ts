import { svg } from "lit";
import type { DeviceDefinition, PortDefinition } from "../../models/schema.js";
import type { Translator } from "../../i18n/translations.js";
import type { NodeVisualState } from "../../utils/entity.js";

function renderPorts(def: DeviceDefinition, t: Translator): ReturnType<typeof svg>[] {
  return def.ports.map((port: PortDefinition) => svg`
    <circle
      class="port port-${port.kind}"
      data-port-id="${port.id}"
      cx="${port.position.x}" cy="${port.position.y}" r="5"
      fill="var(--card-background-color, #1c1c1c)"
      stroke="${port.kind === "inlet" ? "#4fc3f7" : "#ff8a65"}"
      stroke-width="2"
    ><title>${t.t(port.labelKey, ...(port.labelArgs ?? []))}</title></circle>
  `);
}

const SUPPLY_COLOR = "#ef5350";
const RETURN_COLOR = "#42a5f5";

/** Temperatures mapped onto the blue → red scale. */
const TEMP_COLD = 20;
const TEMP_HOT = 60;

function temperatureColor(value: number | undefined): string {
  if (value === undefined) return "var(--divider-color, #888)";
  const f = Math.min(1, Math.max(0, (value - TEMP_COLD) / (TEMP_HOT - TEMP_COLD)));
  return `hsl(${Math.round(220 * (1 - f))}, 75%, 50%)`;
}

function renderBufferTank(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState,
  channels: NodeVisualState[],
  heater?: NodeVisualState
): ReturnType<typeof svg> {
  const stroke = state.active
    ? "#4caf50"
    : selected
      ? "var(--primary-color, #03a9f4)"
      : "var(--divider-color, #888)";
  const strokeWidth = selected ? 2.5 : 1.5;
  const top = 16;
  const bottom = def.height - 10;
  const count = channels.length;
  const sensorY = channels.map((_, i) =>
    count === 1 ? (top + bottom) / 2 : top + 18 + (i * (bottom - top - 36)) / (count - 1)
  );

  return svg`
    <g class="device device-buffer-tank">
      ${def.ports.map((p) => svg`
        <line x1="${p.position.x}" y1="${p.position.y}" x2="${p.position.x === 0 ? 14 : 86}" y2="${p.position.y}"
          stroke="var(--divider-color, #888)" stroke-width="2" />
      `)}
      <rect x="14" y="10" width="72" height="${def.height - 14}" rx="10"
        fill="var(--card-background-color, #1c1c1c)" stroke="${stroke}" stroke-width="${strokeWidth}" />
      ${channels.map((channel, i) => {
        const y0 = i === 0 ? top : (sensorY[i - 1] + sensorY[i]) / 2;
        const y1 = i === count - 1 ? bottom : (sensorY[i] + sensorY[i + 1]) / 2;
        const color = temperatureColor(channel.numeric);
        return svg`
          <rect x="17" y="${y0}" width="66" height="${y1 - y0}" fill="${color}" opacity="0.3" />
          <circle cx="18" cy="${sensorY[i]}" r="3" fill="${color}" />
          <text x="52" y="${sensorY[i] + 4}" text-anchor="middle" class="device-value">
            ${channel.value ?? "—"}
          </text>
        `;
      })}
      ${heater ? renderHeaterCoil(28, bottom - 8, 44, heater) : svg``}
      ${renderPorts(def, t)}
    </g>
  `;
}

function renderManifold(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState,
  channels: NodeVisualState[]
): ReturnType<typeof svg> {
  const stroke = state.active
    ? "#4caf50"
    : selected
      ? "var(--primary-color, #03a9f4)"
      : "var(--divider-color, #888)";
  const strokeWidth = selected ? 2.5 : 1.5;
  const barWidth = def.width - 8;
  const loops = def.ports.filter((p) => p.id.startsWith("loop_") && p.kind === "outlet");

  return svg`
    <g class="device device-manifold">
      <rect x="2" y="18" width="${def.width - 4}" height="94" rx="6"
        fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-dasharray="4 3" />
      <rect x="4" y="22" width="${barWidth}" height="16" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${SUPPLY_COLOR}" stroke-width="2" />
      <rect x="4" y="92" width="${barWidth}" height="16" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${RETURN_COLOR}" stroke-width="2" />
      ${loops.map((port, i) => {
        const x = port.position.x;
        const active = channels[i]?.active ?? false;
        return svg`
          <line x1="${x}" y1="0" x2="${x}" y2="22" stroke="${SUPPLY_COLOR}" stroke-width="2" />
          <rect class="actuator ${active ? "active" : ""}" x="${x - 7}" y="6" width="14" height="11" rx="2"
            fill="${active ? "#4caf50" : "var(--card-background-color, #1c1c1c)"}"
            stroke="${active ? "#4caf50" : "var(--divider-color, #888)"}" stroke-width="1.5" />
          <line x1="${x}" y1="108" x2="${x}" y2="${def.height}" stroke="${RETURN_COLOR}" stroke-width="2" />
          <text x="${x}" y="69" text-anchor="middle" class="device-label">${i + 1}</text>
        `;
      })}
      ${renderPorts(def, t)}
    </g>
  `;
}

export function renderHeatPump(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): ReturnType<typeof svg> {
  const stroke = state.active
    ? "#4caf50"
    : selected
      ? "var(--primary-color, #03a9f4)"
      : "var(--divider-color, #888)";
  const strokeWidth = selected ? 2.5 : 1.5;

  return svg`
    <g class="device device-heat-pump">
      <rect
        x="10" y="15" width="100" height="70" rx="8"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${stroke}" stroke-width="${strokeWidth}"
      />
      <circle cx="60" cy="50" r="22"
        fill="none" stroke="${stroke}" stroke-width="${strokeWidth}"
      />
      <path d="M 48 50 L 72 50 M 60 38 L 60 62"
        stroke="var(--primary-color, #03a9f4)" stroke-width="2" stroke-linecap="round"
      />
      ${renderPorts(def, t)}
    </g>
  `;
}

function renderValve3Way(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): ReturnType<typeof svg> {
  const stroke = state.active
    ? "#4caf50"
    : selected
      ? "var(--primary-color, #03a9f4)"
      : "var(--divider-color, #888)";
  const strokeWidth = selected ? 2.5 : 1.5;
  const branchAColor = state.valveBranch === "a" ? "#4caf50" : "var(--divider-color, #555)";
  const branchBColor = state.valveBranch === "b" ? "#4caf50" : "var(--divider-color, #555)";
  return svg`
    <g class="device device-valve-3way">
      <polygon
        points="10,50 45,15 45,35 90,35 90,65 45,65 45,85"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${stroke}" stroke-width="${strokeWidth}"
      />
      <line x1="45" y1="50" x2="90" y2="25" stroke="${branchAColor}" stroke-width="3" />
      <line x1="45" y1="50" x2="90" y2="75" stroke="${branchBColor}" stroke-width="3" />
      ${renderPorts(def, t)}
    </g>
  `;
}

function renderBoiler(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState,
  heater: NodeVisualState | undefined
): ReturnType<typeof svg> {
  const stroke = state.active
    ? "#4caf50"
    : selected
      ? "var(--primary-color, #03a9f4)"
      : "var(--divider-color, #888)";
  const strokeWidth = selected ? 2.5 : 1.5;
  return svg`
    <g class="device device-boiler">
      <rect
        x="10" y="10" width="70" height="120" rx="18"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${stroke}" stroke-width="${strokeWidth}"
      />
      <path d="M 30 35 L 60 35 M 30 55 L 60 55 M 30 75 L 60 75"
        stroke="var(--primary-color, #03a9f4)" stroke-width="2" stroke-linecap="round" />
      ${heater ? renderHeaterCoil(24, 100, 42, heater) : svg``}
      ${renderPorts(def, t)}
    </g>
  `;
}

const HEATER_ACTIVE_COLOR = "#ff7043";

/** Zig-zag heating element; glows when the bound entity is active. */
function renderHeaterCoil(
  x: number,
  y: number,
  width: number,
  heater: NodeVisualState
): ReturnType<typeof svg> {
  const steps = 6;
  const step = width / steps;
  let d = `M ${x} ${y}`;
  for (let i = 1; i <= steps; i++) {
    d += ` L ${x + i * step} ${y + (i % 2 === 0 ? 0 : -8)}`;
  }
  const color = heater.active ? HEATER_ACTIVE_COLOR : "var(--divider-color, #888)";
  return svg`
    <path class="heater ${heater.active ? "active" : ""}" d="${d}" fill="none"
      stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
  `;
}

function renderElectricHeater(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): ReturnType<typeof svg> {
  const stroke = state.active
    ? HEATER_ACTIVE_COLOR
    : selected
      ? "var(--primary-color, #03a9f4)"
      : "var(--divider-color, #888)";
  const strokeWidth = selected ? 2.5 : 1.5;
  return svg`
    <g class="device device-electric-heater">
      <rect x="10" y="12" width="${def.width - 20}" height="${def.height - 24}" rx="8"
        fill="var(--card-background-color, #1c1c1c)" stroke="${stroke}" stroke-width="${strokeWidth}" />
      ${renderHeaterCoil(24, def.height / 2 + 4, def.width - 48, state)}
      ${renderPorts(def, t)}
    </g>
  `;
}

function renderJunction(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): ReturnType<typeof svg> {
  const stroke = state.active
    ? "#4caf50"
    : selected
      ? "var(--primary-color, #03a9f4)"
      : "var(--divider-color, #888)";
  const strokeWidth = selected ? 2.5 : 1.5;
  return svg`
    <g class="device device-junction">
      <circle
        cx="30" cy="30" r="18"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${stroke}" stroke-width="${strokeWidth}"
      />
      ${renderPorts(def, t)}
    </g>
  `;
}

function renderCirculationPump(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): ReturnType<typeof svg> {
  const stroke = state.active
    ? "#4caf50"
    : selected
      ? "var(--primary-color, #03a9f4)"
      : "var(--divider-color, #888)";
  const strokeWidth = selected ? 2.5 : 1.5;
  return svg`
    <g class="device device-circulation-pump">
      <circle
        cx="45" cy="45" r="28"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${stroke}" stroke-width="${strokeWidth}"
      />
      <path d="M 32 52 A 14 14 0 0 1 58 38"
        fill="none" stroke="var(--primary-color, #03a9f4)" stroke-width="2" stroke-linecap="round" />
      <polygon points="58,38 52,38 56,32" fill="var(--primary-color, #03a9f4)" />
      ${renderPorts(def, t)}
    </g>
  `;
}

function renderFloorHeating(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): ReturnType<typeof svg> {
  const stroke = state.active
    ? "#4caf50"
    : selected
      ? "var(--primary-color, #03a9f4)"
      : "var(--divider-color, #888)";
  const strokeWidth = selected ? 2.5 : 1.5;
  return svg`
    <g class="device device-floor-heating">
      <rect
        x="10" y="18" width="120" height="55" rx="8"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${stroke}" stroke-width="${strokeWidth}"
      />
      <path d="M 20 40 C 35 30, 50 50, 65 40 C 80 30, 95 50, 110 40 C 115 37, 120 37, 126 40"
        fill="none" stroke="var(--primary-color, #03a9f4)" stroke-width="2" />
      ${renderPorts(def, t)}
    </g>
  `;
}

function renderMixingValve(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): ReturnType<typeof svg> {
  const stroke = selected ? "var(--primary-color, #03a9f4)" : "var(--divider-color, #888)";
  const strokeWidth = selected ? 2.5 : 1.5;
  const position = state.position;
  const mixedColor =
    position === undefined ? "var(--divider-color, #888)" : `hsl(${Math.round(210 * (1 - position / 100))}, 75%, 55%)`;

  return svg`
    <g class="device device-mixing-valve">
      <line x1="0" y1="70" x2="22" y2="70" stroke="${SUPPLY_COLOR}" stroke-width="3" />
      <line x1="50" y1="96" x2="50" y2="${def.height}" stroke="${RETURN_COLOR}" stroke-width="3" />
      <line x1="78" y1="70" x2="${def.width}" y2="70" stroke="${mixedColor}" stroke-width="3" />
      <path d="M 22 56 L 50 70 L 22 84 Z M 78 56 L 50 70 L 78 84 Z M 36 98 L 50 70 L 64 98 Z"
        fill="var(--card-background-color, #1c1c1c)" stroke="${stroke}" stroke-width="${strokeWidth}"
        stroke-linejoin="round" />
      <line x1="50" y1="36" x2="50" y2="70" stroke="${stroke}" stroke-width="2" />
      <rect x="28" y="10" width="44" height="26" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${stroke}" stroke-width="${strokeWidth}" />
      ${position === undefined
        ? svg``
        : svg`<rect x="30" y="12" width="${(40 * position) / 100}" height="22" rx="3" fill="${mixedColor}" opacity="0.35" />`}
      <text x="50" y="27" text-anchor="middle" class="device-value">
        ${position === undefined ? "—" : `${Math.round(position)} %`}
      </text>
      ${renderPorts(def, t)}
    </g>
  `;
}

/** Node-specific states beyond the main binding. */
export interface DeviceExtras {
  channels?: NodeVisualState[];
  heater?: NodeVisualState;
}

export function renderDeviceByType(
  type: string,
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState,
  extras: DeviceExtras = {}
): ReturnType<typeof svg> | undefined {
  const channels = extras.channels ?? [];
  switch (type) {
    case "heat_pump":
      return renderHeatPump(def, t, selected, state);
    case "valve_3way":
      return renderValve3Way(def, t, selected, state);
    case "boiler":
      return renderBoiler(def, t, selected, state, extras.heater);
    case "junction":
      return renderJunction(def, t, selected, state);
    case "circulation_pump":
      return renderCirculationPump(def, t, selected, state);
    case "floor_heating":
      return renderFloorHeating(def, t, selected, state);
    case "manifold":
      return renderManifold(def, t, selected, state, channels);
    case "buffer_tank":
      return renderBufferTank(def, t, selected, state, channels, extras.heater);
    case "mixing_valve":
      return renderMixingValve(def, t, selected, state);
    case "electric_heater":
      return renderElectricHeater(def, t, selected, state);
    default:
      return undefined;
  }
}
