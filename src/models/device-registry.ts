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

const REGISTRY = new Map<string, DeviceDefinition>([
  [HEAT_PUMP.type, HEAT_PUMP],
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
