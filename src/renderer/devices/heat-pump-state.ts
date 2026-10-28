import type { NodeVisualState, Operation } from "../../utils/entity.js";
import { activeFromAddons, spinDuration, type ResolvedAddon } from "./common.js";

/** Status words checked in priority order, without diacritics: defrost > hot water > cooling > heating > idle. */
const OPERATION_WORDS: [Operation, RegExp][] = [
  ["defrost", /defrost|odmraz|odtav|abtau/],
  ["dhw", /dhw|hot.?water|water.?heat|tuv|tepla voda|warmwasser|domestic/],
  ["cooling", /cool|chlaz|kuhl/],
  ["heating", /heat|topen|topi|heiz/],
  ["idle", /idle|off|standby|stand.?by|stoji|vypn|klid|aus|pause|stop/],
];

const HVAC_ACTIONS: Record<string, Operation> = {
  heating: "heating",
  preheating: "heating",
  cooling: "cooling",
  defrosting: "defrost",
  idle: "idle",
  off: "idle",
};

const PRIORITY: Operation[] = ["defrost", "dhw", "heating", "cooling"];

/** Operation named by a status text such as `Heating`, `DHW`, `Odmrazování`. */
export function operationFromText(text: string | undefined): Operation | undefined {
  if (!text) return undefined;
  const plain = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return OPERATION_WORDS.find(([, pattern]) => pattern.test(plain))?.[0];
}

function operationOf(state: NodeVisualState): Operation | undefined {
  return (state.hvacAction ? HVAC_ACTIONS[state.hvacAction] : undefined) ?? operationFromText(state.raw);
}

export interface HeatPumpState {
  running: boolean;
  operation?: Operation;
}

/**
 * The more specific source wins: the compressor says whether the unit runs, operating status entities
 * say what it does, and the device's own state entity is only the fallback.
 */
export function heatPumpState(main: NodeVisualState, addons: ResolvedAddon[], hasEntity: boolean): HeatPumpState {
  const bound = addons.filter((a) => a.config.entity_id);
  const ofType = (type: string): ResolvedAddon[] => bound.filter((a) => a.config.type === type);
  const statuses = ofType("operation");
  const compressor = ofType("compressor")[0];

  const flags = new Set<Operation>();
  if (ofType("defrost").some((a) => a.state.active)) flags.add("defrost");
  for (const addon of statuses) {
    const slot = addon.config.slot;
    if (slot && slot !== "status") {
      if (addon.state.active) flags.add(slot as Operation);
      continue;
    }
    const operation = operationOf(addon.state);
    if (operation) flags.add(operation);
  }
  if (!statuses.length && hasEntity) {
    const operation = main.hvacAction ? HVAC_ACTIONS[main.hvacAction] : undefined;
    if (operation) flags.add(operation);
  }

  const active = PRIORITY.find((o) => flags.has(o));
  let running: boolean;
  if (compressor) running = compressor.state.active;
  else if (statuses.length || flags.size) running = active !== undefined;
  else running = hasEntity ? main.active : activeFromAddons(addons);
  if (active === "defrost") running = true;

  const known = statuses.length > 0 || flags.size > 0;
  return { running, operation: active ?? (!running && known ? "idle" : undefined) };
}

/** Fan of the outdoor unit: its own add-on, otherwise it turns while the unit runs and is not defrosting. */
export function heatPumpFan(state: NodeVisualState, addons: ResolvedAddon[]): { active: boolean; duration?: number } {
  const fan = addons.find((a) => a.config.type === "fan" && a.config.entity_id);
  if (fan) return { active: fan.state.active, duration: spinDuration(fan.state) };
  return { active: state.active && state.operation !== "defrost" };
}

/** Bound add-on of a type in a slot. */
export function slotState(addons: ResolvedAddon[], type: string, slot: string): NodeVisualState | undefined {
  return addons.find((a) => a.config.type === type && a.config.slot === slot && a.config.entity_id)?.state;
}

/** Water: 4.186 kJ/(kg·K) × 1000 kg/m³ / 3600 s/h. */
const WATER_KWH_PER_M3K = 1.163;
const MIN_POWER_KW = 0.05;

function kilowatts(state: NodeVisualState | undefined): number | undefined {
  if (state?.numeric === undefined) return undefined;
  const unit = state.unit?.toLowerCase();
  if (unit === "w") return state.numeric / 1000;
  if (unit === "mw") return state.numeric * 1000;
  return state.numeric;
}

const FLOW_TO_M3H: Record<string, number> = {
  "m³/h": 1,
  "m3/h": 1,
  "l/min": 0.06,
  "l/h": 0.001,
  "l/s": 3.6,
  "m³/s": 3600,
};

function cubicMetersPerHour(state: NodeVisualState | undefined): number | undefined {
  if (state?.numeric === undefined) return undefined;
  const factor = state.unit ? FLOW_TO_M3H[state.unit.toLowerCase()] : 1;
  return factor === undefined ? undefined : state.numeric * factor;
}

export interface HeatPumpPerformance {
  /** Electric input. */
  powerKw?: number;
  /** Heat delivered to the water; negative while defrosting. */
  heatKw?: number;
  cop?: number;
  flowM3h?: number;
  /** Water outlet minus inlet, in kelvin. */
  deltaT?: number;
}

/**
 * Heat output and COP from sensors: a heat output or COP entity wins, otherwise heat is computed from the
 * water flow and the temperature difference across the unit.
 */
export function heatPumpPerformance(addons: ResolvedAddon[]): HeatPumpPerformance {
  const temperature = (slot: string): NodeVisualState | undefined => slotState(addons, "temperature", slot);
  const value = (slot: string): NodeVisualState | undefined => slotState(addons, "value", slot);
  const outlet = temperature("hx_outlet") ?? temperature("supply");
  const inlet = temperature("return");
  const fahrenheit = outlet?.unit === "°F";
  const deltaT =
    outlet?.numeric !== undefined && inlet?.numeric !== undefined
      ? (outlet.numeric - inlet.numeric) * (fahrenheit ? 5 / 9 : 1)
      : undefined;
  const flowM3h = cubicMetersPerHour(value("flow"));
  const powerKw = kilowatts(value("power"));
  const heatKw =
    kilowatts(value("heat_output")) ??
    (flowM3h !== undefined && deltaT !== undefined ? flowM3h * WATER_KWH_PER_M3K * deltaT : undefined);
  const copSensor = value("cop")?.numeric;
  const cop =
    copSensor ??
    (heatKw !== undefined && heatKw > 0 && powerKw !== undefined && powerKw > MIN_POWER_KW ? heatKw / powerKw : undefined);
  return { powerKw, heatKw, cop, flowM3h, deltaT };
}
