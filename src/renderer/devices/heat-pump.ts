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
    />
    <title>${t.t(port.labelKey)}</title>
  `);
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
      <text x="60" y="8" text-anchor="middle" class="device-label">
        ${t.t(def.labelKey)}
      </text>
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
      <text x="50" y="8" text-anchor="middle" class="device-label">${t.t(def.labelKey)}</text>
      ${renderPorts(def, t)}
    </g>
  `;
}

function renderBoiler(
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
    <g class="device device-boiler">
      <rect
        x="10" y="10" width="70" height="120" rx="18"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${stroke}" stroke-width="${strokeWidth}"
      />
      <path d="M 30 35 L 60 35 M 30 55 L 60 55 M 30 75 L 60 75"
        stroke="var(--primary-color, #03a9f4)" stroke-width="2" stroke-linecap="round" />
      <text x="45" y="8" text-anchor="middle" class="device-label">${t.t(def.labelKey)}</text>
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
      <text x="30" y="8" text-anchor="middle" class="device-label">${t.t(def.labelKey)}</text>
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
      <text x="45" y="8" text-anchor="middle" class="device-label">${t.t(def.labelKey)}</text>
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
      <text x="70" y="8" text-anchor="middle" class="device-label">${t.t(def.labelKey)}</text>
      ${renderPorts(def, t)}
    </g>
  `;
}

export function renderDeviceByType(
  type: string,
  def: DeviceDefinition,
  t: Translator,
  selected: boolean,
  state: NodeVisualState
): ReturnType<typeof svg> | undefined {
  switch (type) {
    case "heat_pump":
      return renderHeatPump(def, t, selected, state);
    case "valve_3way":
      return renderValve3Way(def, t, selected, state);
    case "boiler":
      return renderBoiler(def, t, selected, state);
    case "junction":
      return renderJunction(def, t, selected, state);
    case "circulation_pump":
      return renderCirculationPump(def, t, selected, state);
    case "floor_heating":
      return renderFloorHeating(def, t, selected, state);
    default:
      return undefined;
  }
}
