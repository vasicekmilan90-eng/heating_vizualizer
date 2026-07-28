import type { HomeAssistant } from "../types/home-assistant.js";
import type { NodeStateBinding, OverlayStateRule, SchemaOverlay } from "../models/schema.js";

export function formatOverlayValue(
  hass: HomeAssistant | undefined,
  overlay: SchemaOverlay
): string {
  if (!hass || !overlay.entity_id) return "—";

  const state = hass.states[overlay.entity_id];
  if (!state) return "—";

  if (overlay.template) {
    return interpolateTemplate(overlay.template, state.state, state.attributes);
  }

  const unit = state.attributes.unit_of_measurement as string | undefined;
  return unit ? `${state.state} ${unit}` : state.state;
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
  hass: HomeAssistant | undefined,
  overlay: SchemaOverlay
): { color?: string; className?: string; visible: boolean } {
  let color: string | undefined;
  let className: string | undefined;
  let visible = true;

  if (!hass || !overlay.rules?.length) {
    return { color, className, visible };
  }

  for (const rule of overlay.rules) {
    if (matchesRule(hass, rule)) {
      if (rule.effect.color) color = rule.effect.color;
      if (rule.effect.class) className = rule.effect.class;
      if (rule.effect.visible !== undefined) visible = rule.effect.visible;
    }
  }

  return { color, className, visible };
}

function matchesRule(hass: HomeAssistant, rule: OverlayStateRule): boolean {
  const entity = hass.states[rule.entity];
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
  hass: HomeAssistant | undefined,
  binding: NodeStateBinding | undefined
): NodeVisualState {
  if (!hass || !binding?.entity_id) {
    return { active: false };
  }

  const entity = hass.states[binding.entity_id];
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
