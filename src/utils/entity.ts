import type { HassEntities, HassEntity, HomeAssistantFormatters } from "../types/home-assistant.js";
import type { NodeStateBinding, OverlayStateRule, SchemaOverlay } from "../models/schema.js";

export function formatOverlayValue(
  states: HassEntities | undefined,
  formatters: HomeAssistantFormatters | undefined,
  overlay: SchemaOverlay
): string {
  if (!states || !overlay.entity_id) return "—";

  const state = states[overlay.entity_id];
  if (!state) return "—";

  if (overlay.template) {
    return interpolateTemplate(overlay.template, state.state, state.attributes);
  }

  if (formatters) return formatters.formatEntityState(state);

  const unit = state.attributes.unit_of_measurement as string | undefined;
  return unit ? `${state.state} ${unit}` : state.state;
}

export function formatOverlayName(
  states: HassEntities | undefined,
  formatters: HomeAssistantFormatters | undefined,
  overlay: SchemaOverlay
): string {
  const state = states?.[overlay.entity_id];
  if (state && formatters) return formatters.formatEntityName(state, overlay.name);
  if (typeof overlay.name === "string") return overlay.name;
  return overlay.entity_id;
}

function interpolateTemplate(
  template: string,
  state: string,
  attributes: Record<string, unknown>
): string {
  return template
    .replace(/\{\{\s*state\s*\}\}/g, state)
    .replace(
      /\{\{\s*attr\(['"](\w+)['"]\)\s*\}\}/g,
      (_match, key: string) => String(attributes[key] ?? "")
    );
}

export function resolveOverlayStyle(
  states: HassEntities | undefined,
  overlay: SchemaOverlay
): { color?: string; className?: string; visible: boolean } {
  let color: string | undefined;
  let className: string | undefined;
  let visible = true;

  if (!states || !overlay.rules?.length) {
    return { color, className, visible };
  }

  for (const rule of overlay.rules) {
    if (matchesRule(states, rule, overlay.entity_id)) {
      if (rule.effect.color) color = computeCssColor(rule.effect.color);
      if (rule.effect.class) className = rule.effect.class;
      if (rule.effect.visible !== undefined) visible = rule.effect.visible;
    }
  }

  return { color, className, visible };
}

/** Theme color names offered by the HA `ui_color` selector. */
const THEME_COLORS = new Set([
  "primary", "accent", "disabled", "red", "pink", "purple", "deep-purple", "indigo",
  "blue", "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow",
  "amber", "orange", "deep-orange", "brown", "light-grey", "grey", "dark-grey",
  "blue-grey", "black", "white",
]);

export function computeCssColor(color: string): string {
  return THEME_COLORS.has(color) ? `var(--${color}-color)` : color;
}

// Mirrors HA `numeric_state`: every configured bound must hold.
function matchesRule(states: HassEntities, rule: OverlayStateRule, fallbackEntity: string): boolean {
  const entity = states[rule.entity || fallbackEntity];
  if (!entity) return false;

  if (rule.condition === "state") {
    return rule.state !== undefined && entity.state === rule.state;
  }

  if (rule.above === undefined && rule.below === undefined) return false;
  const value = Number(entity.state);
  if (Number.isNaN(value)) return false;
  if (rule.above !== undefined && !(value > rule.above)) return false;
  if (rule.below !== undefined && !(value < rule.below)) return false;
  return true;
}

export interface NodeVisualState {
  active: boolean;
  valveBranch?: "a" | "b";
  /** Localized state including unit, e.g. "45.2 °C". */
  value?: string;
  numeric?: number;
  /** Actuator opening 0–100 %. */
  position?: number;
  /** User-defined channel name, used as tooltip. */
  label?: string;
  unit?: string;
  /** Value comes from `value_attribute` rather than the entity state. */
  fromAttribute?: boolean;
}

/** `hvac_action` values of climate / water_heater entities that mean "heating now". */
const HEATING_ACTIONS = new Set(["heating", "preheating"]);

function isActive(entity: HassEntity, activeState: string | undefined): boolean {
  if (activeState !== undefined) return entity.state === activeState;
  const hvacAction = entity.attributes.hvac_action;
  if (typeof hvacAction === "string") return HEATING_ACTIONS.has(hvacAction);
  return entity.state === "on" || entity.state === "heat";
}

export function resolveNodeVisualState(
  states: HassEntities | undefined,
  binding: NodeStateBinding | undefined,
  formatters?: HomeAssistantFormatters
): NodeVisualState {
  if (!states || !binding?.entity_id) {
    return { active: false };
  }

  const entity = states[binding.entity_id];
  if (!entity) {
    return { active: false };
  }

  const attribute = binding.value_attribute;
  const attrValue = attribute !== undefined ? entity.attributes[attribute] : undefined;
  const fromAttribute = attrValue !== undefined;
  const rawValue = fromAttribute ? attrValue : entity.state;
  const numeric = Number(rawValue);
  const unit = entity.attributes.unit_of_measurement as string | undefined;
  let value: string;
  if (attribute !== undefined && fromAttribute) {
    value = formatters
      ? formatters.formatEntityAttributeValue(entity, attribute)
      : String(attrValue);
  } else {
    value = formatters
      ? formatters.formatEntityState(entity)
      : unit ? `${entity.state} ${unit}` : entity.state;
  }

  const active = isActive(entity, binding.active_state);

  const modeAttribute = binding.mode_attribute ?? "position";
  const modeValue = String(entity.attributes[modeAttribute] ?? entity.state ?? "");
  const branchA = binding.branch_a_value ?? "a";
  const branchB = binding.branch_b_value ?? "b";

  let valveBranch: "a" | "b" | undefined;
  if (modeValue === branchA) valveBranch = "a";
  if (modeValue === branchB) valveBranch = "b";

  return {
    active,
    valveBranch,
    value,
    numeric: String(rawValue ?? "").trim() !== "" && Number.isFinite(numeric) ? numeric : undefined,
    position: resolvePosition(entity, binding.mode_attribute),
    unit,
    fromAttribute,
  };
}

// HA `valve` entities expose `current_position`; other entities report the opening as state.
function resolvePosition(entity: HassEntity, attribute: string | undefined): number | undefined {
  const raw = attribute
    ? entity.attributes[attribute]
    : (entity.attributes.current_position ?? entity.state);
  const position = Number(raw);
  if (raw === undefined || raw === null || raw === "" || !Number.isFinite(position)) return undefined;
  return Math.min(100, Math.max(0, position));
}
