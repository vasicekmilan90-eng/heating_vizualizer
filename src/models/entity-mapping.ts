import type { HassEntity, HomeAssistant } from "../types/home-assistant.js";
import { addonLimit, type AddonType } from "./addons.js";
import { getDeviceDefinition, presetOf } from "./device-registry.js";
import type { AddonConfig, SchemaNode } from "./schema.js";

/** Lower-case words of the entity id and name without diacritics, e.g. ` tc vratka teplota `. */
function words(entity: HassEntity): string {
  const name = typeof entity.attributes.friendly_name === "string" ? entity.attributes.friendly_name : "";
  return normalizeWords(`${entity.entity_id} ${name}`);
}

function normalizeWords(value: string): string {
  const text = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ");
  return ` ${text} `;
}

const has = (text: string, pattern: string): boolean => new RegExp(` (?:${pattern})`).test(text);

function domainOf(entity: HassEntity): string {
  return entity.entity_id.split(".", 1)[0];
}

function deviceClassOf(entity: HassEntity): string | undefined {
  const value = entity.attributes.device_class;
  return typeof value === "string" ? value : undefined;
}

/** Keyword → device preset (see `DEVICE_PRESETS`), checked in order; English and Czech (without diacritics). */
const DEVICE_KEYWORDS: [string, string][] = [
  ["heat ?pump|heatpump|tepeln\\w* cerpadl|tc ", "heat_pump"],
  ["buffer|akumul|nadrz", "tank_buffer"],
  ["boiler|dhw|hot ?water|tuv|bojler|zasobnik", "tank_dhw"],
  ["kotel|furnace|gas ", "heating_boiler"],
  ["solar|kolektor", "solar_collector"],
  ["manifold|rozdelovac", "manifold"],
  ["floor|podlah", "floor_heating"],
  ["fan ?coil|fancoil|konvektor", "fancoil"],
  ["radiator|trv|hlavic", "radiator"],
  ["mixing|smesov", "mixing_valve"],
  ["3 ?way|diverter|trojcest|tricest|prepinac", "valve_3way"],
  ["pump|cerpadl", "circulation_pump"],
  ["outdoor|outside|venkov", "outdoor_temperature"],
];

const PIPE_SENSOR_CLASSES = new Set(["temperature", "pressure", "volume_flow_rate", "energy", "power"]);

/** Words like "pump" or "outdoor" also appear in names of other devices' entities, so they do not claim ownership. */
const GENERIC_KEYWORD_TYPES = new Set(["circulation_pump", "outdoor_temperature"]);

/** Device preset named in a text, e.g. `tank_dhw` for "Heat pump DHW tank temperature". */
function namedDeviceType(text: string): string | undefined {
  const type = DEVICE_KEYWORDS.find(([pattern]) => has(text, pattern))?.[1];
  return type && !GENERIC_KEYWORD_TYPES.has(type) ? type : undefined;
}

const HEAT_SOURCE_TYPES = new Set(["heat_pump", "heating_boiler", "solar_collector"]);

/** Device preset that most likely matches an entity; `undefined` when nothing fits. */
export function guessDeviceType(entity: HassEntity): string | undefined {
  const text = words(entity);
  const domain = domainOf(entity);
  const keyword = DEVICE_KEYWORDS.find(([pattern]) => has(text, pattern))?.[1];
  if (keyword) return keyword;
  if (domain === "water_heater") return "tank_dhw";
  if (domain === "climate") return "radiator";
  if (domain === "valve") return "zone_valve";
  if (domain === "fan") return "fancoil";
  if (domain === "sensor" && PIPE_SENSOR_CLASSES.has(deviceClassOf(entity) ?? "")) return "pipe_sensor";
  return undefined;
}

/** Add-on type of an entity that belongs to an existing device. */
export function guessAddonType(entity: HassEntity): AddonType | undefined {
  const text = words(entity);
  const domain = domainOf(entity);
  const deviceClass = deviceClassOf(entity);

  if (deviceClass === "problem" || has(text, "alarm|fault|error|porucha|chyba")) return "alarm";
  if (deviceClass === "window" || deviceClass === "opening" || has(text, "window|okno")) return "window";
  if (has(text, "defrost|odmraz|odtav")) return "defrost";
  if (has(text, "heater|heating element|backup|booster|spiral|topn\\w* tyc|bivalen")) return "electric_heater";
  if (has(text, "pump|cerpadl")) return "pump";
  if (domain === "fan" || has(text, "fan|ventilator")) return "fan";
  if (domain === "select" || domain === "input_select" || deviceClass === "enum" || has(text, "mode|rezim")) {
    return "mode";
  }
  if (domain === "number" || domain === "input_number" || has(text, "setpoint|target|pozadovan|zadan")) {
    return "setpoint";
  }
  if (domain === "valve" || has(text, "actuator|pohon|valve|ventil")) return "actuator";
  if (deviceClass === "temperature") return "temperature";
  if (domain === "sensor" && Number.isFinite(Number(entity.state))) return "value";
  return undefined;
}

/** Slot keywords; slots are matched in the order the device lists them. */
const SLOT_KEYWORDS: Record<string, string> = {
  top: "top|nahore|horni",
  upper: "upper",
  middle: "middle|stred|uprostred",
  lower: "lower",
  bottom: "bottom|dole|spodni|dolni",
  supply: "supply|flow|outlet|leaving|vystup|privod|topna voda",
  return: "return|inlet|entering|vratk|zpatec|vstup",
  outdoor: "outdoor|outside|ambient|venkov",
  evaporator: "evaporator|vyparnik",
  room: "room|indoor|inside|mistnost|pokoj|vnitrni",
  floor: "floor|podlah",
  mixed: "mixed|smis",
  inlet: "inlet|vstup",
  outlet: "outlet|vystup",
  collector: "collector|panel|kolektor",
};

function guessSlot(entity: HassEntity, slots: string[], used: Set<string | undefined>): string | undefined {
  const text = words(entity);
  const free = slots.filter((slot) => !used.has(slot));
  return free.find((slot) => SLOT_KEYWORDS[slot] && has(text, SLOT_KEYWORDS[slot])) ?? free[0];
}

/**
 * Add-ons for the other entities of the node's HA device, e.g. tank sensors wired to the heat pump.
 * Entities naming another device type (a "DHW tank" sensor for a heat pump node) and entities in `taken`
 * are skipped; the device's add-on limits and free slots are respected.
 */
export function suggestAddons(
  hass: HomeAssistant | undefined,
  node: SchemaNode,
  taken: ReadonlySet<string> = new Set()
): AddonConfig[] {
  const device = node.device_id ?? (node.entity_id ? hass?.entities?.[node.entity_id]?.device_id : undefined);
  const specs = getDeviceDefinition(node.type)?.addons ?? [];
  if (!hass || !device || !specs.length) return [];

  const addons = [...(node.addons ?? [])];
  const bound = new Set([node.entity_id, ...addons.map((a) => a.entity_id), ...addons.map((a) => a.temperature_entity_id)]);
  const suggestions: AddonConfig[] = [];
  const deviceEntry = hass.devices?.[device];
  const deviceType = namedDeviceType(normalizeWords(deviceEntry?.name_by_user || deviceEntry?.name || ""));
  // Entities that name no device belong to the HA device itself, e.g. the heat pump.
  const primary = deviceType ? presetOf(node) === deviceType : HEAT_SOURCE_TYPES.has(node.type);

  const candidates = Object.values(hass.entities ?? {})
    .filter((entry) => entry.device_id === device && !bound.has(entry.entity_id) && !taken.has(entry.entity_id))
    .map((entry) => hass.states[entry.entity_id])
    .filter((entity): entity is HassEntity => entity !== undefined)
    .filter((entity) => {
      const owner = namedDeviceType(words(entity));
      return owner ? owner === presetOf(node) : primary;
    })
    .sort((a, b) => a.entity_id.localeCompare(b.entity_id));

  for (const entity of candidates) {
    const guessed = guessAddonType(entity);
    // A temperature the device has no slot for is still worth showing as a value.
    const types: AddonType[] = guessed === "temperature" ? ["temperature", "value"] : guessed ? [guessed] : [];
    for (const type of types) {
      const spec = specs.find((s) => s.type === type);
      const same = addons.filter((a) => a.type === type);
      if (!spec || same.length >= addonLimit(spec)) continue;
      const addon: AddonConfig = { type: spec.type, entity_id: entity.entity_id };
      if (spec.slots) addon.slot = guessSlot(entity, spec.slots, new Set(same.map((a) => a.slot)));
      addons.push(addon);
      suggestions.push(addon);
      break;
    }
  }
  return suggestions;
}
