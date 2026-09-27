# Heating Visualizer Card

Custom Lovelace card for Home Assistant **2026.9+**. Draw your heating system from devices and pipes and see it live: temperatures, running pumps, valve positions, defrosting, alarms.

- **Visual editor** – add devices from a list, straight from an entity, or from a template; the editor suggests add-ons from the same Home Assistant device.
- **Add-ons** describe parts of a physical device (tank sensors, backup heater, defrost, …), no matter which integration provides the entity.
- **Right-angled pipes** (or curved), automatic arrangement in flow direction, drawing mode with drag & drop.
- **Actions** – tap, hold and double tap use the standard Home Assistant actions (more info, toggle, navigate, …).
- Follows the Home Assistant language and number formatting; keyboard and screen reader friendly; masonry and sections dashboards.

## Installation

### HACS (recommended)

1. HACS → ⋮ → **Custom repositories** → add `https://github.com/vasicekmilan90-eng/heating_vizualizer`, category **Dashboard**.
2. Install **Heating Visualizer Card** and reload the browser.

### Manual

1. Copy `heating-visualizer-card.js` to `<config>/www/`.
2. Settings → Dashboards → ⋮ → **Resources** → add `/local/heating-visualizer-card.js` as **JavaScript module**.

## Using the editor

Add the card from the card picker (**Heating Visualizer**).

**Schema tab – device list**

- *Add device* by type, *Insert template* (heat pump + floor heating, heat pump + DHW tank + floor heating, heat pump + buffer tank + radiators, boiler + radiators) or *Add from entity* – pick the main entity and the device type is suggested.
- *Arrange automatically* places devices in columns from the heat source along the pipes; *Undo arrangement* restores the previous positions.
- *Drawing mode* (✎) enables dragging devices and connecting two ports by clicking them. Without it the preview only selects, so scrolling on a phone never moves anything. Arrow keys move the selected device (Shift = faster).

**Device detail** (click a device row)

- Name, main entity and its state options.
- *Add-ons* – only the types the device supports, with the number still available. *Suggested add-ons* lists other entities of the same Home Assistant device with a guessed type and position.
- *Connections* per port – remove with ×, add with *Connect to…* (only compatible ports are offered).
- *Actions*, position (X/Y, arrows, rotate) and *Delete device*.

**Overlays tab** – value labels anywhere on the schema with a template, conditional colors/visibility and actions.

## YAML

```yaml
type: custom:heating-visualizer-card
schema_version: 2
nodes:
  - id: hp
    type: heat_pump
    name: Heat pump
    position: { x: 40, y: 60 }
    entity_id: climate.heat_pump
    hold_action:
      action: navigate
      navigation_path: /lovelace/heating
    addons:
      - type: temperature
        slot: outdoor
        entity_id: sensor.heat_pump_outdoor_temperature
      - type: defrost
        entity_id: binary_sensor.heat_pump_defrost
      - type: electric_heater
        entity_id: switch.heat_pump_backup_heater
  - id: tank
    type: buffer_tank
    position: { x: 300, y: 20 }
    addons:
      # Wired to the heat pump, but physically part of the tank.
      - type: temperature
        slot: top
        entity_id: sensor.heat_pump_tank_top
      - type: temperature
        slot: bottom
        entity_id: sensor.heat_pump_tank_bottom
connections:
  - { from: hp.hot_out, to: tank.source_in }
  - { from: tank.source_out, to: hp.cold_in }
overlays:
  - id: o1
    entity_id: sensor.outdoor_temperature
    position: { x: 40, y: 0 }
    rules:
      - condition: numeric
        below: 0
        effect: { color: blue }
```

### Card options

| Option | Description |
| --- | --- |
| `nodes` | Devices: `id`, `type`, `position`, optional `name`, `rotation` (90° steps), entity binding, `addons`, actions. |
| `connections` | Pipes from an outlet to an inlet, written as `node_id.port_id`. |
| `overlays` | Value labels: `entity_id`, `position`, optional `name`, `template`, `rules`, actions. |
| `pipe_style` | `orthogonal` (default) or `curved`. |
| `schema_version` | Written by the editor. Configurations of 0.3 (`schema:` with `edges`, `channels`, `heater`) are converted automatically when loaded. |

### Entity binding (devices and add-ons)

| Field | Meaning |
| --- | --- |
| `entity_id` | Bound entity. |
| `active_state` | State that means "running". Without it the device is active when `hvac_action` is `heating`/`preheating`, otherwise when the state is `on`, `heat` or `open`. |
| `value_attribute` | Attribute shown instead of the state, e.g. `current_temperature`. |
| `mode_attribute` | 3-way valve: attribute with the branch position (default `position`). Mixing valve and actuators: attribute with the opening in % (default `current_position`, then the state). |
| `branch_a_value` / `branch_b_value` | 3-way valve: values for branch A / B (default `a` / `b`). |

### Add-ons

Each add-on has a `type`, optional `slot` (position on the drawing), `name` and the entity binding above. Loops also accept `temperature_entity_id` (room temperature).

| Type | Shown as |
| --- | --- |
| `temperature` | value colored from blue to red |
| `value` | any value (power, pressure, flow, COP, …) |
| `electric_heater`, `pump`, `fan`, `defrost`, `alarm`, `window` | on/off indicator |
| `actuator` | opening in % |
| `mode` | state text |
| `setpoint` | value |
| `heat_exchanger` | no entity – adds a heat exchanger and its ports |
| `loop` | manifold loop with actuator; each loop adds `loop_<n>_out` / `loop_<n>_in` ports |

Tank and DHW tank sensors, their heaters, heat pump values and manifold loops are drawn inside the device; other add-ons appear as badges below it. Tapping a badge opens more info of its entity.

### Devices

| Type | Ports | Add-ons (slots / maximum) |
| --- | --- | --- |
| `heat_pump` | `hot_out`, `cold_in` | temperature (supply, return, outdoor, evaporator), value 6, electric heater 3, pump, fan, mode, setpoint, defrost, alarm |
| `heating_boiler` | `supply_out`, `return_in` | temperature (supply, return), value 4, pump, mode, setpoint, alarm |
| `solar_collector` | `hot_out`, `cold_in` | temperature (collector), value 2, pump, alarm |
| `boiler` (DHW tank) | `coil_in`, `coil_out`, `hot_out`, `cold_in` (+ `coil2_in`, `coil2_out`) | temperature (top, middle, bottom), value 2, electric heater 2, pump, mode, setpoint, alarm, heat exchanger |
| `buffer_tank` | `source_in`, `source_out`, `supply_out`, `return_in` (+ `coil_in`, `coil_out`) | temperature (top, upper, middle, lower, bottom), value 2, electric heater 2, alarm, heat exchanger |
| `hydraulic_separator`, `plate_heat_exchanger` | `primary_in`, `primary_out`, `secondary_out`, `secondary_in` | temperature (primary/secondary supply/return), value 2 |
| `expansion_vessel` | `connection` | value, alarm |
| `safety_valve` | `in`, `discharge` | alarm |
| `valve_3way` | `in`, `out_a`, `out_b` | value, alarm |
| `mixing_valve` | `hot_in`, `return_in`, `mixed_out` | temperature (mixed, return), value, setpoint, alarm |
| `zone_valve` | `in`, `out` | temperature (room), alarm |
| `circulation_pump` | `in`, `out` | value 3, mode, alarm |
| `manifold` | `supply_in`, `return_out`, `loop_<n>_out`, `loop_<n>_in` | loop 12 (4 by default), temperature (supply, return), value 2, pump |
| `floor_heating` | `in`, `out` | temperature (room, floor), actuator, setpoint, window |
| `radiator` | `in`, `out` | temperature (room), actuator, setpoint, alarm, window |
| `fancoil` | `in`, `out` | temperature (room, supply), actuator, fan, mode, setpoint, alarm |
| `electric_heater` | `in`, `out` | temperature (inlet, outlet), value 2, mode, alarm |
| `junction` | `in`, `out_top`, `out_bottom` | – |
| `pipe_sensor` | `in`, `out` | – (icon follows the entity `device_class`) |
| `outdoor_temperature` | – | value |

Devices only model what Home Assistant can observe – a boiler has no fuel type. Use `name` to tell devices of the same type apart.

### Actions

`tap_action`, `hold_action` and `double_tap_action` on devices and overlays accept the standard [Home Assistant actions](https://www.home-assistant.io/dashboards/actions/). Tap defaults to more info of the bound entity; hold and double tap do nothing unless configured. Focused devices react to Enter and Space.

### Overlay templates and rules

- `template`: `{{ state }}` and `{{ attr('attribute') }}`; without a template the value is formatted by Home Assistant.
- `rules`: `condition: state` (with `state`) or `condition: numeric` (with `above` and/or `below`; all bounds must hold, like `numeric_state`). `entity` defaults to the overlay entity. `effect` supports `color` (theme color such as `red` or any CSS color), `visible` and `class`.

## Translations

The card follows the Home Assistant language. Texts live in [`src/translations/`](src/translations); add a language by adding `<language>.json` with the same keys as `en.json` (a test checks that all files have the same keys).

## Development

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run build   # writes heating-visualizer-card.js for HACS
```
