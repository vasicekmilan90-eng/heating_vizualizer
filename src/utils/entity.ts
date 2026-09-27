import type { HassEntities, HomeAssistantFormatters } from "../types/home-assistant.js";
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
    if (matchesRule(states, rule)) {
      if (rule.effect.color) color = rule.effect.color;
      if (rule.effect.class) className = rule.effect.class;
      if (rule.effect.visible !== undefined) visible = rule.effect.visible;
    }
  }

  return { color, className, visible };
}

function matchesRule(states: HassEntities, rule: OverlayStateRule): boolean {
  const entity = states[rule.entity];
  if (!entity) return false;

  if (rule.condition === "state") {
    return rule.state !== undefined && entity.state === rule.state;
  }

  const value = Number(entity.state);
  if (Number.isNaN(value)) return false;
  if (rule.below !== undefined && value < rule.below) return true;
  if (rule.above !== undefined && value > rule.above) return true;
  return false;
}

export interface NodeVisualState {
  active: boolean;
  valveBranch?: "a" | "b";
}

export function resolveNodeVisualState(
  states: HassEntities | undefined,
  binding: NodeStateBinding | undefined
): NodeVisualState {
  if (!states || !binding?.entity_id) {
    return { active: false };
  }

  const entity = states[binding.entity_id];
  if (!entity) {
    return { active: false };
  }

  const activeState = binding.active_state ?? "on";
  const active = entity.state === activeState || (activeState === "on" && entity.state === "heat");

  const modeAttribute = binding.mode_attribute ?? "position";
  const modeValue = String(entity.attributes[modeAttribute] ?? entity.state ?? "");
  const branchA = binding.branch_a_value ?? "a";
  const branchB = binding.branch_b_value ?? "b";

  let valveBranch: "a" | "b" | undefined;
  if (modeValue === branchA) valveBranch = "a";
  if (modeValue === branchB) valveBranch = "b";

  return { active, valveBranch };
}
