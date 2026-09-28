/**
 * Add-ons describe parts of a physical device (a sensor in a tank, the backup heater of a heat pump, …).
 * The entity can come from any integration: a tank sensor wired to the heat pump is still a tank add-on.
 */
export type AddonType =
  | "temperature"
  | "value"
  | "electric_heater"
  | "pump"
  | "actuator"
  | "fan"
  | "mode"
  | "setpoint"
  | "defrost"
  | "alarm"
  | "window"
  | "heat_exchanger"
  | "direct_source"
  | "direct_heating"
  | "dhw"
  | "circulation"
  | "loop";

/** How an add-on is shown: a measured value, an on/off indicator, an opening in % or a state text. */
export type AddonDisplay = "value" | "binary" | "position" | "text" | "none";

export interface AddonTypeDefinition {
  type: AddonType;
  display: AddonDisplay;
  /** Preferred entity domains, listed first in the entity picker. */
  domains?: string[];
  /** Preferred device classes, listed first in the entity picker. */
  deviceClasses?: string[];
  /** The add-on only changes the drawing (e.g. extra ports) and has no entity. */
  entityless?: boolean;
}

export const ADDON_TYPES: Record<AddonType, AddonTypeDefinition> = {
  temperature: { type: "temperature", display: "value", domains: ["sensor"], deviceClasses: ["temperature"] },
  value: { type: "value", display: "value", domains: ["sensor", "number"] },
  electric_heater: {
    type: "electric_heater",
    display: "binary",
    domains: ["switch", "binary_sensor", "sensor", "input_boolean"],
    deviceClasses: ["power", "heat", "running"],
  },
  pump: { type: "pump", display: "binary", domains: ["switch", "binary_sensor", "sensor"], deviceClasses: ["running"] },
  actuator: { type: "actuator", display: "position", domains: ["valve", "switch", "binary_sensor", "number", "sensor"] },
  fan: { type: "fan", display: "binary", domains: ["fan", "sensor", "binary_sensor"] },
  mode: {
    type: "mode",
    display: "text",
    domains: ["select", "sensor", "input_select", "climate", "water_heater"],
    deviceClasses: ["enum"],
  },
  setpoint: {
    type: "setpoint",
    display: "value",
    domains: ["number", "input_number", "climate", "water_heater", "sensor"],
    deviceClasses: ["temperature"],
  },
  defrost: { type: "defrost", display: "binary", domains: ["binary_sensor", "sensor"] },
  alarm: { type: "alarm", display: "binary", domains: ["binary_sensor", "sensor"], deviceClasses: ["problem"] },
  window: { type: "window", display: "binary", domains: ["binary_sensor"], deviceClasses: ["window", "opening"] },
  heat_exchanger: { type: "heat_exchanger", display: "none", entityless: true },
  // Tank connections: they only add ports to the drawing.
  direct_source: { type: "direct_source", display: "none", entityless: true },
  direct_heating: { type: "direct_heating", display: "none", entityless: true },
  dhw: { type: "dhw", display: "none", entityless: true },
  circulation: { type: "circulation", display: "none", entityless: true },
  loop: { type: "loop", display: "binary", domains: ["valve", "switch", "binary_sensor", "climate"] },
};

/** Add-ons a device type accepts. `slots` fix the drawing position; without slots up to `max` are allowed. */
export interface AddonSpec {
  type: AddonType;
  max: number;
  slots?: string[];
}

export function addonLimit(spec: AddonSpec): number {
  return spec.slots ? spec.slots.length : spec.max;
}
