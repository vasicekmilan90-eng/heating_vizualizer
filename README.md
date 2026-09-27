# Heating Visualizer Card

Custom Lovelace card for Home Assistant **2026.9+**. Design heating schemas by connecting device nodes and display live sensor values as overlays.

- Visual editor: place devices, drag them on a grid, rotate them, connect ports with pipes.
- Every device can be bound to a Home Assistant entity (state, value or attribute).
- Floor heating manifolds, buffer tanks and outdoor units have repeatable sub-elements (loops, sensors, values), each with its own entity.
- Overlays show any entity value anywhere on the schema, with conditional colors or visibility.
- Values are formatted with the user's Home Assistant locale; the card follows the Home Assistant language (English and Czech built in, all texts can be overridden).
- Works in masonry and sections dashboards.

## Installation

### HACS (recommended)

1. HACS → ⋮ → **Custom repositories** → add `https://github.com/vasicekmilan90-eng/heating_vizualizer`, category **Dashboard**.
2. Install **Heating Visualizer Card** and reload the browser.

### Manual

1. Copy `heating-visualizer-card.js` to `<config>/www/`.
2. Settings → Dashboards → ⋮ → **Resources** → add `/local/heating-visualizer-card.js` as **JavaScript module**.

## Usage

Add the card from the card picker (**Heating Visualizer**) and build the schema in the visual editor:

- **Schema** tab – add devices, drag them, rotate (↻), click an outlet port and then an inlet port to draw a pipe. Click a pipe or device and use *Delete selected* to remove it. Selecting a device shows its entity bindings.
- **Overlays** tab – value labels with an entity, optional name, template and conditional rules.
- **Translations** tab – override any built-in text for the current language.

### YAML example

```yaml
type: custom:heating-visualizer-card
schema:
  nodes:
    - id: hp
      type: heat_pump
      position: { x: 80, y: 80 }
      state:
        entity_id: climate.heat_pump
    - id: tank
      type: buffer_tank
      position: { x: 300, y: 40 }
      channels:
        - name: Top
          entity_id: sensor.tank_top_temperature
        - name: Bottom
          entity_id: sensor.tank_bottom_temperature
      heater:
        entity_id: switch.tank_heater
  edges:
    - id: e1
      from: { nodeId: hp, portId: hot_out }
      to: { nodeId: tank, portId: source_in }
  overlays:
    - id: o1
      entity_id: sensor.outdoor_temperature
      position: { x: 40, y: 20 }
      rules:
        - condition: numeric
          below: 0
          effect: { color: blue }
```

### Card options

| Option | Description |
| --- | --- |
| `schema.nodes` | Placed devices (`id`, `type`, `position`, optional `name`, `rotation` in 90° steps, `state`, `channels`, `heater`). |
| `schema.edges` | Pipes: `from` (outlet) and `to` (inlet), each `{ nodeId, portId }`. |
| `schema.overlays` | Value labels: `entity_id`, `position`, optional `name`, `template`, `rules`. |
| `language` | Card language; defaults to the Home Assistant user language. |
| `translations` | Text overrides per language, e.g. `{ cs: { "devices.boiler.name": "Zásobník TV" } }`. |

### Entity bindings (`state`, `channels[]`, `heater`)

| Field | Meaning |
| --- | --- |
| `entity_id` | Bound entity. |
| `active_state` | State that means "running". Without it the device is active when `hvac_action` is `heating`/`preheating`, otherwise when the state is `on`, `heat` or `open`. |
| `value_attribute` | Attribute shown instead of the state, e.g. `current_temperature`. |
| `mode_attribute` | 3-way valve: attribute with the branch position (default `position`). Mixing valve: attribute with the opening in % (default `current_position`, then the state). |
| `branch_a_value` / `branch_b_value` | 3-way valve: values of `mode_attribute` for branch A / B. |
| `name` | Channels only: label shown in the editor and as a tooltip. |

### Overlay templates and rules

- `template`: `{{ state }}` and `{{ attr('attribute') }}`; without a template the value is formatted by Home Assistant.
- `rules`: `condition: state` (with `state`) or `condition: numeric` (with `above` and/or `below`, all bounds must hold, like `numeric_state`). `entity` defaults to the overlay entity. `effect` supports `color` (theme color name such as `red` or any CSS color), `visible` and `class`.

### Device types

| Type | Ports | Extras |
| --- | --- | --- |
| `heat_pump` | `hot_out`, `cold_in` | spinning fan, 0–4 value channels |
| `heating_boiler` | `supply_out`, `return_in` | value |
| `solar_collector` | `hot_out`, `cold_in` | value |
| `boiler` (DHW tank) | `coil_in`, `coil_out`, `hot_out`, `cold_in` | 0–2 temperature sensors, electric heater |
| `buffer_tank` | `source_in`, `source_out`, `supply_out`, `return_in` | 1–5 temperature sensors, electric heater |
| `hydraulic_separator`, `plate_heat_exchanger` | `primary_in`, `primary_out`, `secondary_out`, `secondary_in` | value (separator) |
| `expansion_vessel` | `connection` | value (pressure) |
| `safety_valve` | `in`, `discharge` | |
| `valve_3way` | `in`, `out_a`, `out_b` | active branch |
| `mixing_valve` | `hot_in`, `return_in`, `mixed_out` | opening in % |
| `zone_valve` | `in`, `out` | |
| `circulation_pump` | `in`, `out` | spinning impeller |
| `manifold` | `supply_in`, `return_out`, `loop_<n>_out`, `loop_<n>_in` | 1–12 loops with actuators |
| `floor_heating` | `in`, `out` | |
| `radiator`, `fancoil` | `in`, `out` | value |
| `electric_heater` | `in`, `out` | |
| `junction` | `in`, `out_top`, `out_bottom` | |
| `pipe_sensor` | `in`, `out` | value; icon follows the entity `device_class` (temperature, pressure, flow, energy/power) |
| `outdoor_temperature` | – | value |

Devices only model what Home Assistant can observe – e.g. a boiler has no fuel type. Use the node `name` to tell devices of the same type apart ("DHW circulation", "Floor heating pump").

## Development

```bash
npm ci
npm run typecheck
npm run build   # writes heating-visualizer-card.js for HACS
```
