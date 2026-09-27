import { svg } from "lit";
import type { AddonType } from "../../models/addons.js";
import { ADDON_TYPES } from "../../models/addons.js";
import type { Translator } from "../../i18n/translations.js";
import {
  ACCENT,
  ACTIVE_COLOR,
  CARD_FILL,
  HEATER_ACTIVE_COLOR,
  NEUTRAL_STROKE,
  temperatureColor,
  type ResolvedAddon,
  type SvgResult,
} from "./common.js";

/** Add-ons a device drawing shows by itself; all others are drawn as badges. */
const DRAWN_BY_DEVICE: Record<string, AddonType[]> = {
  heat_pump: ["temperature", "value"],
  boiler: ["temperature", "electric_heater"],
  buffer_tank: ["temperature", "electric_heater"],
  manifold: ["loop"],
};

const ACTIVE_COLORS: Partial<Record<AddonType, string>> = {
  electric_heater: HEATER_ACTIVE_COLOR,
  defrost: "#4fc3f7",
  alarm: "var(--error-color, #db4437)",
  window: "var(--warning-color, #ffa600)",
};

const BADGE_HEIGHT = 18;
const BADGE_GAP = 4;
const ICON_WIDTH = 16;
const CHAR_WIDTH = 6.5;
const TEXT_PADDING = 6;

export function badgeAddons(deviceType: string, addons: ResolvedAddon[]): ResolvedAddon[] {
  const drawn = DRAWN_BY_DEVICE[deviceType] ?? [];
  return addons.filter(
    (a) => a.config.entity_id && !ADDON_TYPES[a.config.type].entityless && !drawn.includes(a.config.type)
  );
}

function badgeText(addon: ResolvedAddon): string | undefined {
  const { state } = addon;
  switch (ADDON_TYPES[addon.config.type].display) {
    case "binary":
      return undefined;
    case "position":
      return state.position !== undefined ? `${Math.round(state.position)} %` : (state.value ?? "—");
    default:
      return state.value ?? "—";
  }
}

function badgeColor(addon: ResolvedAddon): string {
  const { type } = addon.config;
  const display = ADDON_TYPES[type].display;
  if (type === "temperature") return temperatureColor(addon.state.numeric);
  if (display === "value" || display === "text") return ACCENT;
  return addon.state.active || (display === "position" && (addon.state.position ?? 0) > 0)
    ? (ACTIVE_COLORS[type] ?? ACTIVE_COLOR)
    : NEUTRAL_STROKE;
}

function iconPath(type: AddonType, cx: number, cy: number): string {
  switch (type) {
    case "temperature":
      return `M ${cx - 1.5} ${cy + 1} V ${cy - 5} A 1.5 1.5 0 0 1 ${cx + 1.5} ${cy - 5} V ${cy + 1} M ${cx - 3} ${cy + 3} A 3 3 0 1 0 ${cx + 3} ${cy + 3} A 3 3 0 1 0 ${cx - 3} ${cy + 3}`;
    case "setpoint":
      return `M ${cx - 5} ${cy} A 5 5 0 1 0 ${cx + 5} ${cy} A 5 5 0 1 0 ${cx - 5} ${cy} M ${cx - 1.5} ${cy} A 1.5 1.5 0 1 0 ${cx + 1.5} ${cy} A 1.5 1.5 0 1 0 ${cx - 1.5} ${cy}`;
    case "pump":
      return `M ${cx - 5} ${cy} A 5 5 0 1 0 ${cx + 5} ${cy} A 5 5 0 1 0 ${cx - 5} ${cy} M ${cx - 2} ${cy - 3} L ${cx + 3} ${cy} L ${cx - 2} ${cy + 3} Z`;
    case "fan":
      return `M ${cx} ${cy} L ${cx} ${cy - 5} M ${cx} ${cy} L ${cx + 4.3} ${cy + 2.5} M ${cx} ${cy} L ${cx - 4.3} ${cy + 2.5}`;
    case "electric_heater":
      return `M ${cx - 5} ${cy + 2} L ${cx - 3} ${cy - 3} L ${cx - 1} ${cy + 2} L ${cx + 1} ${cy - 3} L ${cx + 3} ${cy + 2} L ${cx + 5} ${cy - 3}`;
    case "defrost":
      return `M ${cx} ${cy - 5} V ${cy + 5} M ${cx - 4.3} ${cy - 2.5} L ${cx + 4.3} ${cy + 2.5} M ${cx - 4.3} ${cy + 2.5} L ${cx + 4.3} ${cy - 2.5}`;
    case "alarm":
      return `M ${cx} ${cy - 5} L ${cx + 5} ${cy + 4} L ${cx - 5} ${cy + 4} Z M ${cx} ${cy - 1.5} V ${cy + 1.5}`;
    case "window":
      return `M ${cx - 4} ${cy - 4} H ${cx + 4} V ${cy + 4} H ${cx - 4} Z M ${cx} ${cy - 4} V ${cy + 4} M ${cx - 4} ${cy} H ${cx + 4}`;
    case "actuator":
      return `M ${cx - 4} ${cy + 4} H ${cx + 4} M ${cx} ${cy + 4} V ${cy - 2} M ${cx - 3} ${cy - 2} H ${cx + 3} V ${cy - 5} H ${cx - 3} Z`;
    case "mode":
      return `M ${cx - 5} ${cy - 3} H ${cx + 5} M ${cx - 5} ${cy} H ${cx + 5} M ${cx - 5} ${cy + 3} H ${cx + 5}`;
    case "loop":
      return `M ${cx - 5} ${cy - 3} V ${cy + 3} H ${cx + 5} V ${cy - 3}`;
    default:
      return `M ${cx - 2.5} ${cy} A 2.5 2.5 0 1 0 ${cx + 2.5} ${cy} A 2.5 2.5 0 1 0 ${cx - 2.5} ${cy} Z`;
  }
}

export function addonLabel(addon: ResolvedAddon, t: Translator): string {
  if (addon.config.name) return addon.config.name;
  const type = t.t(`addons.${addon.config.type}.name`);
  return addon.config.slot ? `${type} – ${t.t(`slots.${addon.config.slot}`)}` : type;
}

interface BadgeBox {
  addon: ResolvedAddon;
  text?: string;
  x: number;
  y: number;
  width: number;
}

/** Badges in rows no wider than `maxWidth`, relative to the top-left of the strip. */
export function layoutBadges(addons: ResolvedAddon[], maxWidth: number): { boxes: BadgeBox[]; height: number } {
  const boxes: BadgeBox[] = [];
  let x = 0;
  let y = 0;
  for (const addon of addons) {
    const text = badgeText(addon);
    const width = ICON_WIDTH + (text ? text.length * CHAR_WIDTH + TEXT_PADDING : 2);
    if (x > 0 && x + width > maxWidth) {
      x = 0;
      y += BADGE_HEIGHT + BADGE_GAP;
    }
    boxes.push({ addon, text, x, y, width });
    x += width + BADGE_GAP;
  }
  return { boxes, height: boxes.length ? y + BADGE_HEIGHT : 0 };
}

export function renderAddonBadges(
  addons: ResolvedAddon[],
  t: Translator,
  originX: number,
  originY: number,
  maxWidth: number
): SvgResult {
  const { boxes } = layoutBadges(addons, maxWidth);
  return svg`
    <g class="addon-badges" transform="translate(${originX} ${originY})">
      ${boxes.map(({ addon, text, x, y, width }) => {
        const color = badgeColor(addon);
        const cy = y + BADGE_HEIGHT / 2;
        const filled = addon.config.type === "pump" || addon.config.type === "alarm";
        return svg`
          <g
            class="addon-badge addon-${addon.config.type} ${addon.state.active ? "active" : ""}"
            data-addon-index="${addon.index ?? ""}"
          >
            <title>${addonLabel(addon, t)}: ${addon.state.value ?? "—"}</title>
            <rect x="${x}" y="${y}" width="${width}" height="${BADGE_HEIGHT}" rx="${BADGE_HEIGHT / 2}"
              fill="${CARD_FILL}" stroke="${color}" stroke-width="1" />
            <path d="${iconPath(addon.config.type, x + 9, cy)}" fill="${filled && addon.state.active ? color : "none"}"
              stroke="${color}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
            ${text
              ? svg`<text x="${x + ICON_WIDTH}" y="${cy + 4}" class="device-value addon-value">${text}</text>`
              : svg``}
          </g>
        `;
      })}
    </g>
  `;
}
