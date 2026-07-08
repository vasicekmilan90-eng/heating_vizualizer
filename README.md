# Heating Visualizer Card

Custom Lovelace card for Home Assistant **2026.7+**. Design heating schemas by connecting device nodes and display live sensor values as overlays.

Installable via [HACS](https://hacs.xyz/) from a GitHub repository.

## Features (v0.1)

- Visual schema editor in **card settings** (separate from dashboard view)
- Heat pump device with cold inlet and hot outlet ports
- Connect ports between devices (outlet → inlet)
- Text overlays linked to Home Assistant entities
- Editable translations (`en`, `cs` built-in, custom overrides in card config)
- Pure SVG rendering, minimal dependencies (Lit 3 only)

## HACS installation

1. In HACS go to **Frontend** → **⋮** → **Custom repositories**
2. Add your GitHub repository URL
3. Category: **Lovelace**
4. Install **Heating Visualizer Card**
5. Reload Home Assistant (or clear browser cache)

HACS registers the resource automatically. If needed, add manually:

```yaml
# configuration.yaml (usually not required with HACS)
lovelace:
  resources:
    - url: /hacsfiles/heating-visualizer-card/heating-visualizer-card.js
      type: module
```

## Manual installation (without HACS)

1. Copy `heating-visualizer-card.js` to `/config/www/heating-visualizer-card/`
2. Add the resource:

```yaml
lovelace:
  resources:
    - url: /local/heating-visualizer-card/heating-visualizer-card.js
      type: module
```

3. Reload Lovelace

## Add card to dashboard

1. Edit dashboard → **Add card**
2. Search for **Heating Visualizer**
3. Configure in the visual editor (tabs: Schema, Overlays, Translations)

### Example YAML config

```yaml
type: custom:heating-visualizer-card
language: cs
schema:
  nodes:
    - id: hp_a1b2c3d4
      type: heat_pump
      position: { x: 100, y: 80 }
  edges: []
  overlays:
    - id: ov_e5f6g7h8
      position: { x: 40, y: 40 }
      entity_id: sensor.outdoor_temperature
      template: "{{ state }} °C"
translations:
  cs:
    devices.heat_pump.name: "TČ Nibe"
```

> Schema is normally created in the visual editor; YAML is shown for reference and backup.

## Development

```bash
npm install
npm run build      # creates heating-visualizer-card.js at repo root
npm run watch      # rebuild on changes
npm run typecheck
```

**Before pushing to GitHub**, run `npm run build` and commit `heating-visualizer-card.js`. HACS installs the built bundle directly from the repository.

## Project structure

```
├── heating-visualizer-card.js   # built bundle (committed for HACS)
├── hacs.json                    # HACS metadata
├── src/
│   ├── heating-visualizer-card.ts
│   ├── editor/card-editor.ts    # visual config editor (card settings)
│   ├── renderer/                # SVG canvas & devices
│   ├── models/                  # schema & device registry
│   └── i18n/                    # translations
└── package.json
```

## Roadmap

- [ ] More device types (3-way valve, tank, pump, junction)
- [ ] Overlay state rules UI
- [ ] Device state reactions (animation, colors)
- [ ] Drag-to-position overlays in editor

## License

MIT
