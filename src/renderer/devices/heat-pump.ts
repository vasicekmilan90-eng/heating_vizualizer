import { svg } from "lit";
import type { DeviceDefinition } from "../../models/schema.js";
import { BOILER_TEMPERATURE_SLOTS, TANK_TEMPERATURE_SLOTS } from "../../models/device-registry.js";
import type { Translator } from "../../i18n/translations.js";
import type { NodeVisualState } from "../../utils/entity.js";
import {
  HEATER_ACTIVE_COLOR,
  RETURN_COLOR,
  SUPPLY_COLOR,
  addonStates,
  heaterState,
  renderHeaterCoil,
  renderPorts,
  renderValueLabel,
  temperatureColor,
  temperatureSlots,
  type DeviceExtras,
} from "./common.js";
import { renderExtraDevice } from "./extra.js";

function renderBufferTank(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState,
  slots: Map<string, NodeVisualState>,
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
  const step = (bottom - top - 36) / (TANK_TEMPERATURE_SLOTS.length - 1);
  const sensors = TANK_TEMPERATURE_SLOTS.map((slot, i) => ({ y: top + 18 + i * step, state: slots.get(slot) }))
    .filter((s): s is { y: number; state: NodeVisualState } => s.state !== undefined);
  const hasCoil = def.ports.some((p) => p.id === "coil_in");

  return svg`
    <g class="device device-buffer-tank">
      ${def.ports.map((p) => svg`
        <line x1="${p.position.x}" y1="${p.position.y}" x2="${p.position.x === 0 ? 14 : 86}" y2="${p.position.y}"
          stroke="var(--divider-color, #888)" stroke-width="2" />
      `)}
      <rect x="14" y="10" width="72" height="${def.height - 14}" rx="10"
        fill="var(--card-background-color, #1c1c1c)" stroke="${stroke}" stroke-width="${strokeWidth}" />
      ${sensors.map((sensor, i) => {
        const y0 = i === 0 ? top : (sensors[i - 1].y + sensor.y) / 2;
        const y1 = i === sensors.length - 1 ? bottom : (sensor.y + sensors[i + 1].y) / 2;
        const color = temperatureColor(sensor.state.numeric);
        return svg`
          <rect x="17" y="${y0}" width="66" height="${y1 - y0}" fill="${color}" opacity="0.3" />
          <circle cx="18" cy="${sensor.y}" r="3" fill="${color}" />
        `;
      })}
      ${hasCoil
        ? svg`<path d="M 14 80 L 46 88 L 18 96 L 46 104 L 18 112 L 14 118" fill="none"
            stroke="${SUPPLY_COLOR}" stroke-width="2" stroke-linejoin="round" opacity="0.8" />`
        : svg``}
      ${sensors.map((sensor) => renderValueLabel(56, sensor.y + 4, sensor.state))}
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
  heater: NodeVisualState | undefined,
  slots: Map<string, NodeVisualState>
): ReturnType<typeof svg> {
  const stroke = state.active
    ? "#4caf50"
    : selected
      ? "var(--primary-color, #03a9f4)"
      : "var(--divider-color, #888)";
  const strokeWidth = selected ? 2.5 : 1.5;
  // Heat exchanger coil between coil_in (y=50) and coil_out (y=100).
  const coil = "M 0 50 H 24 L 58 58 L 24 66 L 58 74 L 24 82 L 58 90 L 24 98 L 24 100 H 0";
  const coil2 = "M 0 122 H 24 L 58 130 L 24 138 L 58 146 L 24 154 L 24 160 H 0";
  const hasCoil2 = def.ports.some((p) => p.id === "coil2_in");
  const coldY = def.ports.find((p) => p.id === "cold_in")?.position.y ?? 118;
  const sensorY: Record<string, number> = {
    [BOILER_TEMPERATURE_SLOTS[0]]: 34,
    [BOILER_TEMPERATURE_SLOTS[1]]: 78,
    [BOILER_TEMPERATURE_SLOTS[2]]: def.height - 26,
  };
  return svg`
    <g class="device device-boiler">
      <path d="M 88 30 H ${def.width} M 88 ${coldY} H ${def.width}" stroke="var(--divider-color, #888)" stroke-width="2" />
      <rect
        x="12" y="8" width="76" height="${def.height - 16}" rx="18"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${stroke}" stroke-width="${strokeWidth}"
      />
      <path d="${coil}" fill="none" stroke="${SUPPLY_COLOR}" stroke-width="2" stroke-linejoin="round" opacity="0.8" />
      ${hasCoil2
        ? svg`<path d="${coil2}" fill="none" stroke="${SUPPLY_COLOR}" stroke-width="2" stroke-linejoin="round" opacity="0.6" />`
        : svg``}
      ${BOILER_TEMPERATURE_SLOTS.map((slot) => {
        const sensor = slots.get(slot);
        return sensor ? renderValueLabel(50, sensorY[slot], sensor, true) : svg``;
      })}
      ${heater ? renderHeaterCoil(30, def.height - 14, 40, heater) : svg``}
      ${renderPorts(def, t)}
    </g>
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
      <g class="${state.active ? "spinning" : ""}">
        <path d="M 32 52 A 14 14 0 0 1 58 38"
          fill="none" stroke="var(--primary-color, #03a9f4)" stroke-width="2" stroke-linecap="round" />
        <polygon points="58,38 52,38 56,32" fill="var(--primary-color, #03a9f4)" />
      </g>
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

function renderOutdoorUnit(
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
  const cx = 58;
  const cy = 60;
  const blade = "M 0 0 C 6 -10, 20 -14, 26 -6 C 18 -2, 8 0, 0 0 Z";

  return svg`
    <g class="device device-outdoor-unit">
      <rect x="10" y="12" width="${def.width - 20}" height="${def.height - 24}" rx="6"
        fill="var(--card-background-color, #1c1c1c)" stroke="${stroke}" stroke-width="${strokeWidth}" />
      <circle cx="${cx}" cy="${cy}" r="34" fill="none" stroke="var(--divider-color, #888)" stroke-width="1.5" />
      <g class="fan ${state.active ? "spinning" : ""}">
        ${[0, 90, 180, 270].map((angle) => svg`
          <path d="${blade}" transform="translate(${cx} ${cy}) rotate(${angle})"
            fill="var(--primary-color, #03a9f4)" opacity="0.75" />
        `)}
        <circle cx="${cx}" cy="${cy}" r="5" fill="var(--primary-color, #03a9f4)" />
      </g>
      ${channels.slice(0, 6).map((channel, i) => svg`
        <text x="104" y="${30 + i * 15}" class="device-value">
          <title>${channel.label ?? ""}</title>${channel.value ?? "—"}
        </text>
      `)}
      ${renderPorts(def, t)}
    </g>
  `;
}

type InlineSensorIcon = "temperature" | "flow" | "pressure" | "energy" | "generic";

const DEVICE_CLASS_ICONS: Record<string, InlineSensorIcon> = {
  temperature: "temperature",
  pressure: "pressure",
  volume_flow_rate: "flow",
  energy: "energy",
  power: "energy",
};

function sensorIcon(state: NodeVisualState): InlineSensorIcon {
  const byClass = state.deviceClass ? DEVICE_CLASS_ICONS[state.deviceClass] : undefined;
  if (byClass) return byClass;
  return state.unit?.includes("°") ? "temperature" : "generic";
}

function inlineSensorIcon(icon: InlineSensorIcon, cx: number, cy: number): string {
  switch (icon) {
    case "temperature":
      return `M ${cx - 1.5} ${cy + 2} V ${cy - 6} A 1.5 1.5 0 0 1 ${cx + 1.5} ${cy - 6} V ${cy + 2} M ${cx - 3} ${cy + 4.5} A 3 3 0 1 0 ${cx + 3} ${cy + 4.5} A 3 3 0 1 0 ${cx - 3} ${cy + 4.5}`;
    case "flow":
      return `M ${cx - 6} ${cy} L ${cx + 5} ${cy} M ${cx + 1} ${cy - 4} L ${cx + 5} ${cy} L ${cx + 1} ${cy + 4}`;
    case "pressure":
      return `M ${cx - 6} ${cy + 3} A 6 6 0 1 1 ${cx + 6} ${cy + 3} M ${cx} ${cy + 1} L ${cx + 4} ${cy - 4}`;
    case "energy":
      return `M ${cx + 1} ${cy - 7} L ${cx - 4} ${cy + 1} L ${cx} ${cy + 1} L ${cx - 1} ${cy + 7} L ${cx + 4} ${cy - 1} L ${cx} ${cy - 1} Z`;
    case "generic":
      return `M ${cx - 3} ${cy} A 3 3 0 1 0 ${cx + 3} ${cy} A 3 3 0 1 0 ${cx - 3} ${cy} Z`;
  }
}

function renderInlineSensor(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): ReturnType<typeof svg> {
  const icon = sensorIcon(state);
  const cx = def.width / 2;
  const cy = def.height - 14;
  const color = selected
    ? "var(--primary-color, #03a9f4)"
    : icon === "temperature"
      ? temperatureColor(state.numeric)
      : "var(--primary-color, #03a9f4)";
  const filled = icon === "energy" || icon === "generic";

  return svg`
    <g class="device device-inline-sensor">
      <line x1="0" y1="${cy}" x2="${def.width}" y2="${cy}" stroke="var(--divider-color, #888)" stroke-width="3" />
      <circle cx="${cx}" cy="${cy}" r="11" fill="var(--card-background-color, #1c1c1c)"
        stroke="${color}" stroke-width="${selected ? 2.5 : 2}" />
      <path d="${inlineSensorIcon(icon, cx, cy)}" fill="${filled ? color : "none"}"
        stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <text x="${cx}" y="${cy - 17}" text-anchor="middle" class="device-value">${state.value ?? "—"}</text>
      ${renderPorts(def, t)}
    </g>
  `;
}

export function renderDeviceByType(
  type: string,
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState,
  extras: DeviceExtras = {}
): ReturnType<typeof svg> | undefined {
  switch (type) {
    case "heat_pump":
      return renderOutdoorUnit(def, t, selected, state, [
        ...addonStates(extras, "temperature"),
        ...addonStates(extras, "value"),
      ]);
    case "valve_3way":
      return renderValve3Way(def, t, selected, state);
    case "boiler":
      return renderBoiler(def, t, selected, state, heaterState(extras), temperatureSlots(extras));
    case "junction":
      return renderJunction(def, t, selected, state);
    case "circulation_pump":
      return renderCirculationPump(def, t, selected, state);
    case "floor_heating":
      return renderFloorHeating(def, t, selected, state);
    case "manifold":
      return renderManifold(def, t, selected, state, addonStates(extras, "loop"));
    case "buffer_tank":
      return renderBufferTank(def, t, selected, state, temperatureSlots(extras), heaterState(extras));
    case "mixing_valve":
      return renderMixingValve(def, t, selected, state);
    case "electric_heater":
      return renderElectricHeater(def, t, selected, state);
    case "pipe_sensor":
      return renderInlineSensor(def, t, selected, state);
    default:
      return renderExtraDevice(type, def, t, selected, state);
  }
}
