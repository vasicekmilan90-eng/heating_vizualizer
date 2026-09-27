import type { HassEntity, HomeAssistant } from "../types/home-assistant.js";
import type { FieldOption } from "./controls.js";

export interface EntityPreference {
  domains?: string[];
  deviceClasses?: string[];
  /** Entities of the same HA device as this one are listed first. */
  relatedTo?: string;
}

const MAX_ENTITY_OPTIONS = 300;

const HIDDEN_ATTRIBUTES = new Set([
  "friendly_name",
  "icon",
  "entity_picture",
  "supported_features",
  "device_class",
  "unit_of_measurement",
  "state_class",
  "attribution",
  "assumed_state",
  "restored",
  "editable",
  "id",
]);

/** Common states offered in addition to the entity's own values. */
const COMMON_STATES = ["on", "off", "heat", "heating", "open", "idle"];

/** Attributes whose value lists the states an entity can take. */
const OPTION_ATTRIBUTES = ["options", "hvac_modes", "operation_list", "preset_modes", "fan_modes"];

function friendlyName(entity: HassEntity): string {
  const name = entity.attributes.friendly_name;
  return typeof name === "string" && name ? name : entity.entity_id;
}

function deviceOf(hass: HomeAssistant, entityId: string | undefined): string | undefined {
  return entityId ? hass.entities?.[entityId]?.device_id ?? undefined : undefined;
}

/** Entity suggestions ordered by relevance: same device, then preferred domain and device class. */
export function entityOptions(hass: HomeAssistant | undefined, preference: EntityPreference = {}): FieldOption[] {
  if (!hass) return [];
  const device = deviceOf(hass, preference.relatedTo);
  const scored = Object.values(hass.states).map((entity) => {
    const domain = entity.entity_id.split(".", 1)[0];
    const deviceClass = entity.attributes.device_class;
    let score = 0;
    if (device && deviceOf(hass, entity.entity_id) === device) score += 4;
    if (preference.domains?.includes(domain)) score += 2;
    if (typeof deviceClass === "string" && preference.deviceClasses?.includes(deviceClass)) score += 1;
    return { entity, score, name: friendlyName(entity) };
  });
  scored.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  return scored
    .slice(0, MAX_ENTITY_OPTIONS)
    .map(({ entity, name }) => ({ value: entity.entity_id, label: name }));
}

export function attributeOptions(hass: HomeAssistant | undefined, entityId: string | undefined): FieldOption[] {
  const entity = entityId ? hass?.states[entityId] : undefined;
  if (!entity) return [];
  return Object.keys(entity.attributes)
    .filter((key) => !HIDDEN_ATTRIBUTES.has(key))
    .sort()
    .map((key) => ({ value: key, label: String(entity.attributes[key]) }));
}

/** Values the entity (or one of its attributes) can take. */
export function stateOptions(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
  attribute?: string
): FieldOption[] {
  const entity = entityId ? hass?.states[entityId] : undefined;
  const values = new Set<string>();
  if (entity) {
    const current = attribute ? entity.attributes[attribute] : entity.state;
    if (current !== undefined && current !== null) values.add(String(current));
    if (!attribute) {
      for (const key of OPTION_ATTRIBUTES) {
        const list = entity.attributes[key];
        if (Array.isArray(list)) list.forEach((v) => values.add(String(v)));
      }
      const action = entity.attributes.hvac_action;
      if (typeof action === "string") values.add(action);
    }
  }
  COMMON_STATES.forEach((s) => values.add(s));
  return [...values].map((value) => ({ value }));
}

/** Name of the HA device an entity belongs to. */
export function deviceName(hass: HomeAssistant | undefined, entityId: string | undefined): string | undefined {
  const device = hass ? deviceOf(hass, entityId) : undefined;
  const entry = device ? hass?.devices?.[device] : undefined;
  return entry?.name_by_user || entry?.name || undefined;
}

/** Short description of the entity's current state, e.g. `Tank top · 48.5 °C`. */
export function describeEntity(hass: HomeAssistant | undefined, entityId: string | undefined): string | undefined {
  const entity = entityId ? hass?.states[entityId] : undefined;
  if (!entity || !hass) return undefined;
  const value = typeof hass.formatEntityState === "function" ? hass.formatEntityState(entity) : entity.state;
  return `${friendlyName(entity)} · ${value}`;
}
