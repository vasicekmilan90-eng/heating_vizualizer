import { svg } from "lit";
import type { DeviceDefinition } from "../../models/schema.js";
import { TANK_TEMPERATURE_SLOTS } from "../../models/device-registry.js";
import type { Translator } from "../../i18n/translations.js";
import type { NodeVisualState } from "../../utils/entity.js";
import {
  HEATER_ACTIVE_COLOR,
  RETURN_COLOR,
  SUPPLY_COLOR,
  addonStates,
  heaterStates,
  isAddonActive,
  renderHeaterCoil,
  renderHeatingRod,
  renderPorts,
  renderTemperatureBands,
  renderValueLabel,
  spinDuration,
  temperatureColor,
  temperatureSlots,
  type DeviceExtras,
} from "./common.js";
import { renderExtraDevice } from "./extra.js";

const TANK_LEFT = 14;
const TANK_RIGHT = 86;
const COIL_DEPTH = 32;
const COIL_PITCH = 8;

/** Heat exchanger coil from its supply port down to its return port. */
function coilPath(y1: number, y2: number): string {
  const turns = Math.max(2, Math.floor((y2 - y1) / COIL_PITCH));
  const step = (y2 - y1) / turns;
  let d = `M ${TANK_LEFT} ${y1}`;
  for (let i = 1; i < turns; i++) {
    d += ` L ${i % 2 ? TANK_LEFT + COIL_DEPTH : TANK_LEFT + 4} ${y1 + i * step}`;
  }
  return `${d} L ${TANK_LEFT} ${y2}`;
}

function renderTank(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState,
  slots: Map<string, NodeVisualState>,
  heaters: NodeVisualState[]
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
  const portY = (id: string): number | undefined => def.ports.find((p) => p.id === id)?.position.y;
  const coils = [["coil_in", "coil_out"], ["coil2_in", "coil2_out"]]
    .map(([a, b]) => [portY(a), portY(b)])
    .filter((pair): pair is [number, number] => pair[0] !== undefined && pair[1] !== undefined);
  // Heaters sit between the sensor positions so they never cover a temperature label.
  const sensorY = (i: number): number => top + 18 + i * step;
  const heaterY = [sensorY(3) + step / 2, sensorY(1) + step / 2];

  return svg`
    <g class="device device-tank">
      ${def.ports.map((p) => svg`
        <line x1="${p.position.x}" y1="${p.position.y}" x2="${p.position.x === 0 ? TANK_LEFT : TANK_RIGHT}" y2="${p.position.y}"
          stroke="var(--divider-color, #888)" stroke-width="2" />
      `)}
      <rect x="${TANK_LEFT}" y="10" width="${TANK_RIGHT - TANK_LEFT}" height="${def.height - 14}" rx="12"
        fill="var(--card-background-color, #1c1c1c)" stroke="${stroke}" stroke-width="${strokeWidth}" />
      ${renderTemperatureBands(TANK_LEFT + 3, TANK_RIGHT - TANK_LEFT - 6, top, bottom, sensors)}
      ${sensors.map((sensor) => svg`<circle cx="${TANK_LEFT + 4}" cy="${sensor.y}" r="3" fill="${temperatureColor(sensor.state.numeric)}" />`)}
      ${coils.map(([y1, y2], i) => svg`
        <path class="coil" d="${coilPath(y1, y2)}" fill="none" stroke="${SUPPLY_COLOR}"
          stroke-width="2" stroke-linejoin="round" opacity="${i === 0 ? 0.85 : 0.65}" />
      `)}
      ${heaters.slice(0, 2).map((heater, i) => renderHeatingRod(TANK_RIGHT, heaterY[i], 30, heater))}
      ${sensors.map((sensor) => renderValueLabel(58, sensor.y + 4, sensor.state, true))}
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
  const active = "#4caf50";
  const neutral = "var(--divider-color, #888)";
  const fill = "var(--card-background-color, #1c1c1c)";
  const branchA = state.valveBranch === "a";
  const branchB = state.valveBranch === "b";
  // Standard 3-way valve symbol: three seats meeting in the middle, actuator on top.
  return svg`
    <g class="device device-valve-3way">
      <path d="M 0 40 H 14" stroke="${neutral}" stroke-width="2" />
      <path d="M 66 40 H 80" stroke="${branchA ? active : neutral}" stroke-width="2" />
      <path d="M 40 66 V 80" stroke="${branchB ? active : neutral}" stroke-width="2" />
      <path d="M 40 40 V 18" stroke="${stroke}" stroke-width="1.5" />
      <rect x="30" y="6" width="20" height="12" rx="2" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" />
      <polygon points="14,28 14,52 40,40" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linejoin="round" />
      <polygon points="66,28 66,52 40,40" fill="${branchA ? active : fill}" fill-opacity="${branchA ? 0.8 : 1}"
        stroke="${branchA ? active : stroke}" stroke-width="${strokeWidth}" stroke-linejoin="round" />
      <polygon points="28,66 52,66 40,40" fill="${branchB ? active : fill}" fill-opacity="${branchB ? 0.8 : 1}"
        stroke="${branchB ? active : stroke}" stroke-width="${strokeWidth}" stroke-linejoin="round" />
      <text x="72" y="33" text-anchor="middle" class="device-label">A</text>
      <text x="50" y="77" text-anchor="middle" class="device-label">B</text>
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
  const mid = def.width / 2;
  return svg`
    <g class="device device-junction">
      ${def.ports.map((p) => svg`
        <line x1="${p.position.x}" y1="${p.position.y}" x2="${mid}" y2="${mid}"
          stroke="var(--divider-color, #888)" stroke-width="3" stroke-linecap="round" />
      `)}
      <circle cx="${mid}" cy="${mid}" r="4.5" fill="${stroke}" stroke="${stroke}" stroke-width="${strokeWidth}" />
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
  const c = def.width / 2;
  const r = 16;
  // Equilateral triangle pointing in the flow direction; its centroid is the circle center.
  const triangle = [0, 120, 240]
    .map((deg) => {
      const rad = (deg * Math.PI) / 180;
      return `${Math.round((c + r * Math.cos(rad)) * 10) / 10},${Math.round((c + r * Math.sin(rad)) * 10) / 10}`;
    })
    .join(" ");
  return svg`
    <g class="device device-circulation-pump">
      <path d="M 0 ${c} H ${c - 26} M ${c + 26} ${c} H ${def.width}" stroke="var(--divider-color, #888)" stroke-width="2" />
      <circle
        cx="${c}" cy="${c}" r="26"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${stroke}" stroke-width="${strokeWidth}"
      />
      <g class="impeller ${state.active ? "spinning" : ""}">
        <!-- Invisible circle keeps the bounding box centered, so the rotation does not wobble. -->
        <circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="none" />
        <polygon points="${triangle}" fill="var(--primary-color, #03a9f4)" fill-opacity="${state.active ? 0.85 : 0.35}"
          stroke="var(--primary-color, #03a9f4)" stroke-width="1.5" stroke-linejoin="round" />
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
        x="10" y="14" width="120" height="52" rx="8"
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
  extras: DeviceExtras
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
  const defrost = isAddonActive(extras, "defrost");
  const fan = addonStates(extras, "fan")[0];
  const fanActive = (state.active || isAddonActive(extras, "fan")) && !defrost;
  const duration = fan ? spinDuration(fan) : undefined;
  const fanColor = defrost ? "#4fc3f7" : "var(--primary-color, #03a9f4)";
  const heaters = heaterStates(extras);
  const rows = (extras.addons ?? []).filter(
    (a) => a.config.entity_id && (a.config.type === "temperature" || a.config.type === "value")
  );

  return svg`
    <g class="device device-outdoor-unit">
      <rect x="10" y="12" width="${def.width - 20}" height="${def.height - 24}" rx="6"
        fill="var(--card-background-color, #1c1c1c)" stroke="${stroke}" stroke-width="${strokeWidth}" />
      <circle cx="${cx}" cy="${cy}" r="34" fill="none" stroke="${defrost ? fanColor : "var(--divider-color, #888)"}" stroke-width="1.5" />
      <g class="fan ${fanActive ? "spinning" : ""}" style="${duration ? `animation-duration: ${duration}s` : ""}">
        ${[0, 90, 180, 270].map((angle) => svg`
          <path d="${blade}" transform="translate(${cx} ${cy}) rotate(${angle})"
            fill="${fanColor}" opacity="0.75" />
        `)}
        <circle cx="${cx}" cy="${cy}" r="5" fill="${fanColor}" />
      </g>
      ${defrost
        ? svg`<path class="defrost" d="M ${cx} ${cy - 44} v 14 M ${cx - 6} ${cy - 40} l 12 6 M ${cx - 6} ${cy - 34} l 12 -6"
            stroke="${fanColor}" stroke-width="2" stroke-linecap="round" />`
        : svg``}
      ${rows.slice(0, 6).map((row, i) => {
        const color = row.config.type === "temperature" ? temperatureColor(row.state.numeric) : "";
        const label = row.config.name ?? (row.config.slot ? t.t(`slots.${row.config.slot}`) : "");
        return svg`
          <text x="104" y="${30 + i * 15}" class="device-value" style="${color ? `fill: ${color}` : ""}">
            <title>${label}</title>${row.state.value ?? "—"}
          </text>
        `;
      })}
      ${heaters.slice(0, 3).map((heater, i) => svg`
        <g class="heating-rod ${heater.active ? "active" : ""}">
          ${renderHeaterCoil(24 + i * 34, def.height - 18, 26, heater)}
        </g>
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
      return renderOutdoorUnit(def, t, selected, state, extras);
    case "valve_3way":
      return renderValve3Way(def, t, selected, state);
    case "tank":
      return renderTank(def, t, selected, state, temperatureSlots(extras), heaterStates(extras));
    case "junction":
      return renderJunction(def, t, selected, state);
    case "circulation_pump":
      return renderCirculationPump(def, t, selected, state);
    case "floor_heating":
      return renderFloorHeating(def, t, selected, state);
    case "manifold":
      return renderManifold(def, t, selected, state, addonStates(extras, "loop"));
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
