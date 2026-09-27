import type { DeviceDefinition, PortDefinition, SchemaNode } from "./schema.js";

export const HEAT_PUMP: DeviceDefinition = {
  type: "heat_pump",
  labelKey: "devices.heat_pump.name",
  width: 120,
  height: 100,
  ports: [
    {
      id: "cold_in",
      labelKey: "devices.heat_pump.ports.cold_in",
      kind: "inlet",
      position: { x: 0, y: 70 },
    },
    {
      id: "hot_out",
      labelKey: "devices.heat_pump.ports.hot_out",
      kind: "outlet",
      position: { x: 120, y: 30 },
    },
  ],
};

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
};

export const BOILER: DeviceDefinition = {
  type: "boiler",
  labelKey: "devices.boiler.name",
  width: 90,
  height: 140,
  heater: true,
  ports: [
    {
      id: "cold_in",
      labelKey: "devices.boiler.ports.cold_in",
      kind: "inlet",
      position: { x: 0, y: 110 },
    },
    {
      id: "hot_out",
      labelKey: "devices.boiler.ports.hot_out",
      kind: "outlet",
      position: { x: 90, y: 30 },
    },
  ],
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
};

export const MANIFOLD_LOOP_SPACING = 36;
export const MANIFOLD_LOOP_START = 50;
const MANIFOLD_HEIGHT = 130;
const MANIFOLD_DEFAULT_LOOPS = 4;

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
  channels: {
    kind: "switch",
    titleKey: "devices.manifold.channels",
    itemKey: "devices.manifold.channel",
    min: 1,
    max: 12,
    default: MANIFOLD_DEFAULT_LOOPS,
  },
  resolve: (node) => manifoldDefinition(node.channels?.length || MANIFOLD_DEFAULT_LOOPS),
};

export const BUFFER_TANK: DeviceDefinition = {
  type: "buffer_tank",
  labelKey: "devices.buffer_tank.name",
  width: 100,
  height: 186,
  heater: true,
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
  channels: {
    kind: "sensor",
    titleKey: "devices.buffer_tank.channels",
    itemKey: "devices.buffer_tank.channel",
    min: 1,
    max: 5,
    default: 3,
  },
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
};

export const OUTDOOR_UNIT: DeviceDefinition = {
  type: "outdoor_unit",
  labelKey: "devices.outdoor_unit.name",
  width: 170,
  height: 120,
  ports: [
    {
      id: "hot_out",
      labelKey: "devices.outdoor_unit.ports.hot_out",
      kind: "outlet",
      position: { x: 170, y: 40 },
    },
    {
      id: "cold_in",
      labelKey: "devices.outdoor_unit.ports.cold_in",
      kind: "inlet",
      position: { x: 170, y: 90 },
    },
  ],
  channels: {
    kind: "sensor",
    titleKey: "devices.outdoor_unit.channels",
    itemKey: "devices.outdoor_unit.channel",
    min: 0,
    max: 4,
    default: 0,
  },
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
  };
}

export const PIPE_SENSOR = inlineSensor("pipe_sensor");

export const DEVICE_TYPES: string[] = [
  HEAT_PUMP.type,
  VALVE_3WAY.type,
  BOILER.type,
  JUNCTION.type,
  CIRCULATION_PUMP.type,
  FLOOR_HEATING.type,
  MANIFOLD.type,
  BUFFER_TANK.type,
  MIXING_VALVE.type,
  ELECTRIC_HEATER.type,
  OUTDOOR_UNIT.type,
  PIPE_SENSOR.type,
];

const REGISTRY = new Map<string, DeviceDefinition>([
  [HEAT_PUMP.type, HEAT_PUMP],
  [VALVE_3WAY.type, VALVE_3WAY],
  [BOILER.type, BOILER],
  [JUNCTION.type, JUNCTION],
  [CIRCULATION_PUMP.type, CIRCULATION_PUMP],
  [FLOOR_HEATING.type, FLOOR_HEATING],
  [MANIFOLD.type, MANIFOLD],
  [BUFFER_TANK.type, BUFFER_TANK],
  [MIXING_VALVE.type, MIXING_VALVE],
  [ELECTRIC_HEATER.type, ELECTRIC_HEATER],
  [OUTDOOR_UNIT.type, OUTDOOR_UNIT],
  [PIPE_SENSOR.type, PIPE_SENSOR],
]);

export function getDeviceDefinition(type: string): DeviceDefinition | undefined {
  return REGISTRY.get(type);
}

/** Definition with node-specific geometry (channel count etc.). */
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
