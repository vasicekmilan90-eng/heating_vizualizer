import type { ActionBinding, ActionConfig, HeatingSchema } from "../models/schema.js";

/** Payload of the `hass-action` event, handled by the Home Assistant frontend. */
export interface ActionHandlerConfig extends ActionBinding {
  entity?: string;
}

export type ActionKind = "tap" | "hold" | "double_tap";

export function hasAction(action: ActionConfig | undefined): boolean {
  return action !== undefined && action.action !== "none";
}

/** Tap falls back to more-info, which needs an entity. */
export function canTap(config: ActionHandlerConfig): boolean {
  return config.tap_action ? hasAction(config.tap_action) : Boolean(config.entity);
}

/**
 * Action config of what was clicked: an add-on badge (more-info of its entity), a device or an overlay.
 * `addonIndex` refers to the node's add-on list.
 */
export function actionTarget(
  schema: HeatingSchema,
  target: { nodeId?: string; addonIndex?: number; overlayId?: string }
): ActionHandlerConfig | undefined {
  if (target.overlayId) {
    const overlay = schema.overlays.find((o) => o.id === target.overlayId);
    if (!overlay) return undefined;
    return {
      entity: overlay.entity_id || undefined,
      tap_action: overlay.tap_action,
      hold_action: overlay.hold_action,
      double_tap_action: overlay.double_tap_action,
    };
  }
  const node = schema.nodes.find((n) => n.id === target.nodeId);
  if (!node) return undefined;
  const addon = target.addonIndex !== undefined ? node.addons?.[target.addonIndex] : undefined;
  if (addon?.entity_id) return { entity: addon.entity_id };
  return {
    entity: node.entity_id,
    tap_action: node.tap_action,
    hold_action: node.hold_action,
    double_tap_action: node.double_tap_action,
  };
}
