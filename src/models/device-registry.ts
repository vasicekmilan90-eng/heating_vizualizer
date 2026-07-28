import type { DeviceDefinition } from "./schema.js";

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

export const DEVICE_TYPES: string[] = [
  HEAT_PUMP.type,
  VALVE_3WAY.type,
  BOILER.type,
  JUNCTION.type,
  CIRCULATION_PUMP.type,
  FLOOR_HEATING.type,
];

const REGISTRY = new Map<string, DeviceDefinition>([
  [HEAT_PUMP.type, HEAT_PUMP],
  [VALVE_3WAY.type, VALVE_3WAY],
  [BOILER.type, BOILER],
  [JUNCTION.type, JUNCTION],
  [CIRCULATION_PUMP.type, CIRCULATION_PUMP],
  [FLOOR_HEATING.type, FLOOR_HEATING],
]);

export function getDeviceDefinition(type: string): DeviceDefinition | undefined {
  return REGISTRY.get(type);
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
