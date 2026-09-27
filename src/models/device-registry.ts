import type { AddonSpec } from "./addons.js";
import type { DeviceDefinition, PortDefinition, SchemaNode } from "./schema.js";

export const TANK_TEMPERATURE_SLOTS = ["top", "upper", "middle", "lower", "bottom"];
export const BOILER_TEMPERATURE_SLOTS = ["top", "middle", "bottom"];

const ALARM: AddonSpec = { type: "alarm", max: 1 };
const MODE: AddonSpec = { type: "mode", max: 1 };
const SETPOINT: AddonSpec = { type: "setpoint", max: 1 };
const values = (max: number): AddonSpec => ({ type: "value", max });
const temperatures = (...slots: string[]): AddonSpec => ({ type: "temperature", max: slots.length, slots });

function hasAddon(node: SchemaNode, type: string): boolean {
  return node.addons?.some((a) => a.type === type) ?? false;
}

export const VALVE_3WAY: DeviceDefinition = {
  type: "valve_3way",
  labelKey: "devices.valve_3way.name",
  width: 100,
  height: 100,
  ports: [
    {
      id: "in",
      labelKey: "devices.valve_3way.ports.in",
      kind: "inlet",
      position: { x: 0, y: 50 },
    },
    {
      id: "out_a",
      labelKey: "devices.valve_3way.ports.out_a",
      kind: "outlet",
      position: { x: 100, y: 25 },
    },
    {
      id: "out_b",
      labelKey: "devices.valve_3way.ports.out_b",
      kind: "outlet",
      position: { x: 100, y: 75 },
    },
  ],
  addons: [values(1), ALARM],
};

const BOILER_HEIGHT = 140;
const BOILER_EXCHANGER_HEIGHT = 180;

export const BOILER: DeviceDefinition = {
  type: "boiler",
  labelKey: "devices.boiler.name",
  width: 100,
  height: BOILER_HEIGHT,
  ports: [
    {
      id: "coil_in",
      labelKey: "devices.boiler.ports.coil_in",
      kind: "inlet",
      position: { x: 0, y: 50 },
    },
    {
      id: "coil_out",
      labelKey: "devices.boiler.ports.coil_out",
      kind: "outlet",
      position: { x: 0, y: 100 },
    },
    {
      id: "hot_out",
      labelKey: "devices.boiler.ports.hot_out",
      kind: "outlet",
      position: { x: 100, y: 30 },
    },
    {
      id: "cold_in",
      labelKey: "devices.boiler.ports.cold_in",
      kind: "inlet",
      position: { x: 100, y: 118 },
    },
  ],
  addons: [
    temperatures(...BOILER_TEMPERATURE_SLOTS),
    values(2),
    { type: "electric_heater", max: 2 },
    { type: "pump", max: 1 },
    MODE,
    SETPOINT,
    ALARM,
    { type: "heat_exchanger", max: 1 },
  ],
  // A second heat exchanger (e.g. solar) adds its own connections below the first one.
  resolve: (node) =>
    hasAddon(node, "heat_exchanger")
      ? {
          ...BOILER,
          height: BOILER_EXCHANGER_HEIGHT,
          ports: [
            ...BOILER.ports.map((p) => (p.id === "cold_in" ? { ...p, position: { x: 100, y: 158 } } : p)),
            { id: "coil2_in", labelKey: "devices.boiler.ports.coil2_in", kind: "inlet", position: { x: 0, y: 122 } },
            { id: "coil2_out", labelKey: "devices.boiler.ports.coil2_out", kind: "outlet", position: { x: 0, y: 160 } },
          ],
        }
      : BOILER,
};

export const JUNCTION: DeviceDefinition = {
  type: "junction",
  labelKey: "devices.junction.name",
  width: 60,
  height: 60,
  ports: [
    {
      id: "in",
      labelKey: "devices.junction.ports.in",
      kind: "inlet",
      position: { x: 0, y: 30 },
    },
    {
      id: "out_top",
      labelKey: "devices.junction.ports.out_top",
      kind: "outlet",
      position: { x: 60, y: 15 },
    },
    {
      id: "out_bottom",
      labelKey: "devices.junction.ports.out_bottom",
      kind: "outlet",
      position: { x: 60, y: 45 },
    },
  ],
};

export const CIRCULATION_PUMP: DeviceDefinition = {
  type: "circulation_pump",
  labelKey: "devices.circulation_pump.name",
  width: 90,
  height: 90,
  ports: [
    {
      id: "in",
      labelKey: "devices.circulation_pump.ports.in",
      kind: "inlet",
      position: { x: 0, y: 45 },
    },
    {
      id: "out",
      labelKey: "devices.circulation_pump.ports.out",
      kind: "outlet",
      position: { x: 90, y: 45 },
    },
  ],
  addons: [values(3), MODE, ALARM],
};

export const FLOOR_HEATING: DeviceDefinition = {
  type: "floor_heating",
  labelKey: "devices.floor_heating.name",
  width: 140,
  height: 90,
  ports: [
    {
      id: "in",
      labelKey: "devices.floor_heating.ports.in",
      kind: "inlet",
      position: { x: 0, y: 45 },
    },
    {
      id: "out",
      labelKey: "devices.floor_heating.ports.out",
      kind: "outlet",
      position: { x: 140, y: 45 },
    },
  ],
  addons: [temperatures("room", "floor"), { type: "actuator", max: 1 }, SETPOINT, { type: "window", max: 1 }],
};

export const MANIFOLD_LOOP_SPACING = 36;
export const MANIFOLD_LOOP_START = 50;
const MANIFOLD_HEIGHT = 130;
export const MANIFOLD_DEFAULT_LOOPS = 4;
const MANIFOLD_MAX_LOOPS = 12;

function manifoldDefinition(loops: number): DeviceDefinition {
  const loopPorts: PortDefinition[] = [];
  for (let i = 0; i < loops; i++) {
    const x = MANIFOLD_LOOP_START + i * MANIFOLD_LOOP_SPACING;
    const number = String(i + 1);
    loopPorts.push(
      {
        id: `loop_${number}_out`,
        labelKey: "devices.manifold.ports.loop_out",
        labelArgs: [number],
        kind: "outlet",
        position: { x, y: 0 },
      },
      {
        id: `loop_${number}_in`,
        labelKey: "devices.manifold.ports.loop_in",
        labelArgs: [number],
        kind: "inlet",
        position: { x, y: MANIFOLD_HEIGHT },
      }
    );
  }
  return {
    ...MANIFOLD,
    width: MANIFOLD_LOOP_START + loops * MANIFOLD_LOOP_SPACING - 10,
    ports: [...MANIFOLD.ports, ...loopPorts],
  };
}

export const MANIFOLD: DeviceDefinition = {
  type: "manifold",
  labelKey: "devices.manifold.name",
  width: 184,
  height: MANIFOLD_HEIGHT,
  ports: [
    {
      id: "supply_in",
      labelKey: "devices.manifold.ports.supply_in",
      kind: "inlet",
      position: { x: 0, y: 30 },
    },
    {
      id: "return_out",
      labelKey: "devices.manifold.ports.return_out",
      kind: "outlet",
      position: { x: 0, y: 100 },
    },
  ],
  addons: [
    { type: "loop", max: MANIFOLD_MAX_LOOPS },
    temperatures("supply", "return"),
    values(2),
    { type: "pump", max: 1 },
  ],
  resolve: (node) =>
    manifoldDefinition(Math.max(1, node.addons?.filter((a) => a.type === "loop").length ?? 0)),
};

export const BUFFER_TANK: DeviceDefinition = {
  type: "buffer_tank",
  labelKey: "devices.buffer_tank.name",
  width: 100,
  height: 186,
  ports: [
    {
      id: "source_in",
      labelKey: "devices.buffer_tank.ports.source_in",
      kind: "inlet",
      position: { x: 0, y: 40 },
    },
    {
      id: "source_out",
      labelKey: "devices.buffer_tank.ports.source_out",
      kind: "outlet",
      position: { x: 0, y: 150 },
    },
    {
      id: "supply_out",
      labelKey: "devices.buffer_tank.ports.supply_out",
      kind: "outlet",
      position: { x: 100, y: 40 },
    },
    {
      id: "return_in",
      labelKey: "devices.buffer_tank.ports.return_in",
      kind: "inlet",
      position: { x: 100, y: 150 },
    },
  ],
  addons: [
    temperatures(...TANK_TEMPERATURE_SLOTS),
    values(2),
    { type: "electric_heater", max: 2 },
    ALARM,
    { type: "heat_exchanger", max: 1 },
  ],
  resolve: (node) =>
    hasAddon(node, "heat_exchanger")
      ? {
          ...BUFFER_TANK,
          ports: [
            ...BUFFER_TANK.ports,
            { id: "coil_in", labelKey: "devices.buffer_tank.ports.coil_in", kind: "inlet", position: { x: 0, y: 80 } },
            { id: "coil_out", labelKey: "devices.buffer_tank.ports.coil_out", kind: "outlet", position: { x: 0, y: 118 } },
          ],
        }
      : BUFFER_TANK,
};

export const MIXING_VALVE: DeviceDefinition = {
  type: "mixing_valve",
  labelKey: "devices.mixing_valve.name",
  width: 100,
  height: 110,
  ports: [
    {
      id: "hot_in",
      labelKey: "devices.mixing_valve.ports.hot_in",
      kind: "inlet",
      position: { x: 0, y: 70 },
    },
    {
      id: "return_in",
      labelKey: "devices.mixing_valve.ports.return_in",
      kind: "inlet",
      position: { x: 50, y: 110 },
    },
    {
      id: "mixed_out",
      labelKey: "devices.mixing_valve.ports.mixed_out",
      kind: "outlet",
      position: { x: 100, y: 70 },
    },
  ],
  addons: [temperatures("mixed", "return"), values(1), SETPOINT, ALARM],
};

export const ELECTRIC_HEATER: DeviceDefinition = {
  type: "electric_heater",
  labelKey: "devices.electric_heater.name",
  width: 120,
  height: 60,
  ports: [
    {
      id: "in",
      labelKey: "devices.electric_heater.ports.in",
      kind: "inlet",
      position: { x: 0, y: 30 },
    },
    {
      id: "out",
      labelKey: "devices.electric_heater.ports.out",
      kind: "outlet",
      position: { x: 120, y: 30 },
    },
  ],
  addons: [temperatures("inlet", "outlet"), values(2), MODE, ALARM],
};

export const HEAT_PUMP: DeviceDefinition = {
  type: "heat_pump",
  labelKey: "devices.heat_pump.name",
  width: 170,
  height: 120,
  ports: [
    {
      id: "hot_out",
      labelKey: "devices.heat_pump.ports.hot_out",
      kind: "outlet",
      position: { x: 170, y: 40 },
    },
    {
      id: "cold_in",
      labelKey: "devices.heat_pump.ports.cold_in",
      kind: "inlet",
      position: { x: 170, y: 90 },
    },
  ],
  addons: [
    temperatures("supply", "return", "outdoor", "evaporator"),
    values(6),
    { type: "electric_heater", max: 3 },
    { type: "pump", max: 1 },
    { type: "fan", max: 1 },
    MODE,
    SETPOINT,
    { type: "defrost", max: 1 },
    ALARM,
  ],
};

function inlineSensor(type: string): DeviceDefinition {
  return {
    type,
    labelKey: `devices.${type}.name`,
    width: 80,
    height: 44,
    ports: [
      { id: "in", labelKey: "devices.inline.ports.in", kind: "inlet", position: { x: 0, y: 30 } },
      { id: "out", labelKey: "devices.inline.ports.out", kind: "outlet", position: { x: 80, y: 30 } },
    ],
    valueDisplay: "only",
  };
}

/** Temperature, pressure, flow or energy – the icon follows the entity's device class. */
export const PIPE_SENSOR = inlineSensor("pipe_sensor");

/** Informational element without pipe connections. */
export const OUTDOOR_TEMPERATURE: DeviceDefinition = {
  type: "outdoor_temperature",
  labelKey: "devices.outdoor_temperature.name",
  width: 100,
  height: 50,
  valueDisplay: "only",
  ports: [],
  addons: [values(1)],
};

/** Boiler-like heat source with supply/return on the right side. */
function heatSource(type: string): DeviceDefinition {
  return {
    type,
    labelKey: `devices.${type}.name`,
    width: 100,
    height: 130,
    valueDisplay: "with_state",
    ports: [
      {
        id: "supply_out",
        labelKey: "devices.heat_source.ports.supply_out",
        kind: "outlet",
        position: { x: 100, y: 35 },
      },
      {
        id: "return_in",
        labelKey: "devices.heat_source.ports.return_in",
        kind: "inlet",
        position: { x: 100, y: 105 },
      },
    ],
  };
}

// Fuel type is intentionally not modelled: Home Assistant cannot observe it.
export const HEATING_BOILER: DeviceDefinition = {
  ...heatSource("heating_boiler"),
  addons: [temperatures("supply", "return"), values(4), { type: "pump", max: 1 }, MODE, SETPOINT, ALARM],
};

export const SOLAR_COLLECTOR: DeviceDefinition = {
  type: "solar_collector",
  labelKey: "devices.solar_collector.name",
  width: 150,
  height: 100,
  valueDisplay: "with_state",
  ports: [
    {
      id: "hot_out",
      labelKey: "devices.solar_collector.ports.hot_out",
      kind: "outlet",
      position: { x: 150, y: 22 },
    },
    {
      id: "cold_in",
      labelKey: "devices.solar_collector.ports.cold_in",
      kind: "inlet",
      position: { x: 150, y: 84 },
    },
  ],
  addons: [temperatures("collector"), values(2), { type: "pump", max: 1 }, ALARM],
};

/** Primary circuit on the left, secondary circuit on the right. */
function fourPort(type: string, width: number, height: number): DeviceDefinition {
  const port = (id: string, kind: "inlet" | "outlet", x: number, y: number): PortDefinition => ({
    id,
    labelKey: `devices.four_port.ports.${id}`,
    kind,
    position: { x, y },
  });
  return {
    type,
    labelKey: `devices.${type}.name`,
    width,
    height,
    ports: [
      port("primary_in", "inlet", 0, 30),
      port("primary_out", "outlet", 0, height - 30),
      port("secondary_out", "outlet", width, 30),
      port("secondary_in", "inlet", width, height - 30),
    ],
  };
}

const CIRCUIT_TEMPERATURES = temperatures("primary_supply", "primary_return", "secondary_supply", "secondary_return");

export const HYDRAULIC_SEPARATOR: DeviceDefinition = {
  ...fourPort("hydraulic_separator", 80, 160),
  valueDisplay: "only",
  addons: [CIRCUIT_TEMPERATURES, values(2)],
};
export const PLATE_HEAT_EXCHANGER: DeviceDefinition = {
  ...fourPort("plate_heat_exchanger", 100, 120),
  addons: [CIRCUIT_TEMPERATURES, values(2)],
};

export const EXPANSION_VESSEL: DeviceDefinition = {
  type: "expansion_vessel",
  labelKey: "devices.expansion_vessel.name",
  width: 70,
  height: 110,
  valueDisplay: "only",
  ports: [
    {
      id: "connection",
      labelKey: "devices.expansion_vessel.ports.connection",
      kind: "inlet",
      position: { x: 35, y: 110 },
    },
  ],
  addons: [values(1), ALARM],
};

export const SAFETY_VALVE: DeviceDefinition = {
  type: "safety_valve",
  labelKey: "devices.safety_valve.name",
  width: 70,
  height: 90,
  ports: [
    {
      id: "in",
      labelKey: "devices.safety_valve.ports.in",
      kind: "inlet",
      position: { x: 30, y: 90 },
    },
    {
      id: "discharge",
      labelKey: "devices.safety_valve.ports.discharge",
      kind: "outlet",
      position: { x: 70, y: 56 },
    },
  ],
  addons: [ALARM],
};

export const ZONE_VALVE: DeviceDefinition = {
  type: "zone_valve",
  labelKey: "devices.zone_valve.name",
  width: 80,
  height: 70,
  ports: [
    { id: "in", labelKey: "devices.inline.ports.in", kind: "inlet", position: { x: 0, y: 50 } },
    { id: "out", labelKey: "devices.inline.ports.out", kind: "outlet", position: { x: 80, y: 50 } },
  ],
  addons: [temperatures("room"), ALARM],
};

/** Room terminal unit with supply/return at the bottom corners. */
function terminalUnit(type: string): DeviceDefinition {
  return {
    type,
    labelKey: `devices.${type}.name`,
    width: 130,
    height: 80,
    valueDisplay: "with_state",
    ports: [
      { id: "in", labelKey: "devices.terminal.ports.in", kind: "inlet", position: { x: 0, y: 66 } },
      { id: "out", labelKey: "devices.terminal.ports.out", kind: "outlet", position: { x: 130, y: 66 } },
    ],
  };
}

export const RADIATOR: DeviceDefinition = {
  ...terminalUnit("radiator"),
  addons: [temperatures("room"), { type: "actuator", max: 1 }, SETPOINT, ALARM, { type: "window", max: 1 }],
};
export const FANCOIL: DeviceDefinition = {
  ...terminalUnit("fancoil"),
  addons: [
    temperatures("room", "supply"),
    { type: "actuator", max: 1 },
    { type: "fan", max: 1 },
    MODE,
    SETPOINT,
    ALARM,
  ],
};

const ALL_DEVICES: DeviceDefinition[] = [
  HEAT_PUMP,
  HEATING_BOILER,
  SOLAR_COLLECTOR,
  BOILER,
  BUFFER_TANK,
  HYDRAULIC_SEPARATOR,
  PLATE_HEAT_EXCHANGER,
  EXPANSION_VESSEL,
  SAFETY_VALVE,
  VALVE_3WAY,
  MIXING_VALVE,
  ZONE_VALVE,
  CIRCULATION_PUMP,
  MANIFOLD,
  FLOOR_HEATING,
  RADIATOR,
  FANCOIL,
  ELECTRIC_HEATER,
  JUNCTION,
  PIPE_SENSOR,
  OUTDOOR_TEMPERATURE,
];

export const DEVICE_TYPES: string[] = ALL_DEVICES.map((d) => d.type);

const REGISTRY = new Map<string, DeviceDefinition>(ALL_DEVICES.map((d) => [d.type, d]));

export function getDeviceDefinition(type: string): DeviceDefinition | undefined {
  return REGISTRY.get(type);
}

/** Definition with node-specific geometry (loop count, extra heat exchanger, …). */
export function getNodeDefinition(node: SchemaNode): DeviceDefinition | undefined {
  const def = REGISTRY.get(node.type);
  return def?.resolve ? def.resolve(node) : def;
}

export function getRegisteredDeviceTypes(): string[] {
  return [...REGISTRY.keys()];
}

export function getAllDeviceDefinitions(): DeviceDefinition[] {
  return [...REGISTRY.values()];
}

export function registerDevice(definition: DeviceDefinition): void {
  REGISTRY.set(definition.type, definition);
}
