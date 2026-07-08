import { svg } from "lit";
import type { DeviceDefinition, PortDefinition } from "../../models/schema.js";
import type { Translator } from "../../i18n/translations.js";

export function renderHeatPump(
  def: DeviceDefinition,
  t: Translator,
  selected: boolean
): ReturnType<typeof svg> {
  const stroke = selected ? "var(--primary-color, #03a9f4)" : "var(--divider-color, #888)";
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
      ${def.ports.map((port: PortDefinition) => svg`
        <circle
          class="port port-${port.kind}"
          data-port-id="${port.id}"
          cx="${port.position.x}" cy="${port.position.y}" r="5"
          fill="var(--card-background-color, #1c1c1c)"
          stroke="${port.kind === "inlet" ? "#4fc3f7" : "#ff8a65"}"
          stroke-width="2"
        />
        <title>${t.t(port.labelKey)}</title>
      `)}
    </g>
  `;
}

export function renderDeviceByType(
  type: string,
  def: DeviceDefinition,
  t: Translator,
  selected: boolean
): ReturnType<typeof svg> | undefined {
  switch (type) {
    case "heat_pump":
      return renderHeatPump(def, t, selected);
    default:
      return undefined;
  }
}
