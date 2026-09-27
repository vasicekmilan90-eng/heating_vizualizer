import type { TranslationsConfig } from "../models/schema.js";
import { DEFAULT_LANGUAGE } from "../models/schema.js";

/** Built-in fallback strings; user translations in card config override these. */
export const BUILTIN_TRANSLATIONS: TranslationsConfig = {
  en: {
    "devices.heat_pump.name": "Heat pump",
    "devices.heat_pump.ports.cold_in": "Cold inlet",
    "devices.heat_pump.ports.hot_out": "Hot outlet",
    "devices.valve_3way.name": "3-way valve",
    "devices.valve_3way.ports.in": "Inlet",
    "devices.valve_3way.ports.out_a": "Outlet A",
    "devices.valve_3way.ports.out_b": "Outlet B",
    "devices.boiler.name": "Boiler",
    "devices.boiler.ports.cold_in": "Cold inlet",
    "devices.boiler.ports.hot_out": "Hot outlet",
    "devices.junction.name": "Junction",
    "devices.junction.ports.in": "Inlet",
    "devices.junction.ports.out_top": "Top outlet",
    "devices.junction.ports.out_bottom": "Bottom outlet",
    "devices.circulation_pump.name": "Circulation pump",
    "devices.circulation_pump.ports.in": "Inlet",
    "devices.circulation_pump.ports.out": "Outlet",
    "devices.floor_heating.name": "Floor heating",
    "devices.floor_heating.ports.in": "Supply",
    "devices.floor_heating.ports.out": "Return",
    "devices.manifold.name": "Floor heating manifold",
    "devices.manifold.ports.supply_in": "Supply",
    "devices.manifold.ports.return_out": "Return",
    "devices.manifold.ports.loop_out": "Loop {0} supply",
    "devices.manifold.ports.loop_in": "Loop {0} return",
    "devices.manifold.channels": "Loops (actuators)",
    "devices.manifold.channel": "Loop {0}",
    "devices.buffer_tank.name": "Buffer tank",
    "devices.buffer_tank.ports.source_in": "From heat source",
    "devices.buffer_tank.ports.source_out": "Back to heat source",
    "devices.buffer_tank.ports.supply_out": "To heating system",
    "devices.buffer_tank.ports.return_in": "Return from heating system",
    "devices.buffer_tank.channels": "Temperature sensors (top → bottom)",
    "devices.buffer_tank.channel": "Sensor {0}",
    "devices.mixing_valve.name": "Mixing valve",
    "devices.mixing_valve.ports.hot_in": "Hot branch",
    "devices.mixing_valve.ports.return_in": "Return (bypass)",
    "devices.mixing_valve.ports.mixed_out": "Mixed water",
    "devices.electric_heater.name": "Electric flow heater",
    "devices.electric_heater.ports.in": "Inlet",
    "devices.electric_heater.ports.out": "Outlet",
    "editor.heater_title": "Electric heating element",
    "devices.outdoor_unit.name": "Heat pump outdoor unit",
    "devices.outdoor_unit.ports.hot_out": "Heating water out",
    "devices.outdoor_unit.ports.cold_in": "Heating water return",
    "devices.outdoor_unit.channels": "Displayed values",
    "devices.outdoor_unit.channel": "Value {0}",
    "devices.inline.ports.in": "Inlet",
    "devices.inline.ports.out": "Outlet",
    "devices.pipe_sensor.name": "Pipe sensor",
    "editor.node_value_entity": "Value entity",
    "editor.node_value_attribute": "Displayed attribute",
    "editor.node_value_attribute_helper": "Empty = entity state, e.g. current_temperature",
    "devices.heat_source.ports.supply_out": "Supply",
    "devices.heat_source.ports.return_in": "Return",
    "devices.gas_boiler.name": "Gas boiler",
    "devices.electric_boiler.name": "Electric boiler",
    "devices.solid_fuel_boiler.name": "Solid fuel boiler / stove",
    "devices.solar_collector.name": "Solar collector",
    "devices.solar_collector.ports.hot_out": "Hot outlet",
    "devices.solar_collector.ports.cold_in": "Cold inlet",
    "devices.four_port.ports.primary_in": "Primary supply",
    "devices.four_port.ports.primary_out": "Primary return",
    "devices.four_port.ports.secondary_out": "Secondary supply",
    "devices.four_port.ports.secondary_in": "Secondary return",
    "devices.hydraulic_separator.name": "Hydraulic separator",
    "devices.plate_heat_exchanger.name": "Plate heat exchanger",
    "devices.expansion_vessel.name": "Expansion vessel",
    "devices.expansion_vessel.ports.connection": "Connection",
    "devices.safety_valve.name": "Safety valve",
    "devices.safety_valve.ports.in": "Inlet",
    "devices.safety_valve.ports.discharge": "Discharge",
    "devices.zone_valve.name": "Zone valve",
    "devices.terminal.ports.in": "Supply",
    "devices.terminal.ports.out": "Return",
    "devices.radiator.name": "Radiator",
    "devices.fancoil.name": "Fan coil / convector",
    "devices.dhw_circulation_pump.name": "DHW circulation pump",
    "devices.flow_meter.name": "Flow meter",
    "devices.pressure_gauge.name": "Pressure gauge",
    "devices.heat_meter.name": "Heat meter",
    "devices.outdoor_temperature.name": "Outdoor temperature",
    "editor.node_state_position_entity": "Actuator entity",
    "editor.node_state_position_attribute": "Position attribute (%)",
    "editor.node_state_position_helper": "Empty = current_position or the entity state",
    "editor.channel_name": "Name",
    "editor.title": "Schema editor",
    "editor.add_device": "Add device",
    "editor.device_type": "Device type",
    "editor.add_selected_device": "Add selected device",
    "editor.add_heat_pump": "Heat pump",
    "editor.delete_selected": "Delete selected",
    "editor.rotate_selected": "Rotate",
    "editor.empty_hint": "Add a device to start building your schema.",
    "editor.language": "Language",
    "editor.translations": "Translations",
    "editor.schema_tab": "Schema",
    "editor.overlay_tab": "Overlays",
    "editor.overlays_empty": "No overlays yet. Switch to overlay tab to add sensor labels.",
    "editor.add_overlay": "Add overlay",
    "editor.connection_pending": "Connecting from {0} — click a compatible port",
    "editor.node_state_title": "Selected device state binding",
    "editor.node_state_entity": "State entity",
    "editor.node_state_active": "Active state",
    "editor.node_state_mode_attribute": "Valve mode attribute",
    "editor.node_state_branch_a": "Valve branch A value",
    "editor.node_state_branch_b": "Valve branch B value",
    "editor.language_auto": "Home Assistant language",
    "editor.default_value": "Default: {0}",
    "overlay.entity": "Entity",
    "overlay.name": "Name",
    "overlay.template": "Display template",
    "overlay.rules": "Conditional rules",
    "overlay.add_rule": "Add rule",
    "overlay.rule.condition": "Condition",
    "overlay.rule.condition_state": "State equals",
    "overlay.rule.condition_numeric": "Numeric value",
    "overlay.rule.entity": "Entity",
    "overlay.rule.entity_helper": "Empty = overlay entity",
    "overlay.rule.state": "State",
    "overlay.rule.above": "Above",
    "overlay.rule.below": "Below",
    "overlay.rule.color": "Text color",
    "overlay.rule.hide": "Hide overlay",
    "card.empty": "No schema configured. Edit this card to design your heating layout.",
  },
  cs: {
    "devices.heat_pump.name": "Tepelné čerpadlo",
    "devices.heat_pump.ports.cold_in": "Studená voda – vstup",
    "devices.heat_pump.ports.hot_out": "Teplá voda – výstup",
    "devices.valve_3way.name": "Třícestný ventil",
    "devices.valve_3way.ports.in": "Vstup",
    "devices.valve_3way.ports.out_a": "Výstup A",
    "devices.valve_3way.ports.out_b": "Výstup B",
    "devices.boiler.name": "Bojler",
    "devices.boiler.ports.cold_in": "Studená voda – vstup",
    "devices.boiler.ports.hot_out": "Teplá voda – výstup",
    "devices.junction.name": "Uzel",
    "devices.junction.ports.in": "Vstup",
    "devices.junction.ports.out_top": "Horní výstup",
    "devices.junction.ports.out_bottom": "Spodní výstup",
    "devices.circulation_pump.name": "Oběhové čerpadlo",
    "devices.circulation_pump.ports.in": "Vstup",
    "devices.circulation_pump.ports.out": "Výstup",
    "devices.floor_heating.name": "Podlahové topení",
    "devices.floor_heating.ports.in": "Přívod",
    "devices.floor_heating.ports.out": "Vratka",
    "devices.manifold.name": "Rozdělovač podlahového topení",
    "devices.manifold.ports.supply_in": "Přívod",
    "devices.manifold.ports.return_out": "Vratka",
    "devices.manifold.ports.loop_out": "Okruh {0} – přívod",
    "devices.manifold.ports.loop_in": "Okruh {0} – vratka",
    "devices.manifold.channels": "Okruhy (termopohony)",
    "devices.manifold.channel": "Okruh {0}",
    "devices.buffer_tank.name": "Akumulační nádrž",
    "devices.buffer_tank.ports.source_in": "Od zdroje tepla",
    "devices.buffer_tank.ports.source_out": "Zpět ke zdroji tepla",
    "devices.buffer_tank.ports.supply_out": "Do topného systému",
    "devices.buffer_tank.ports.return_in": "Vratka z topného systému",
    "devices.buffer_tank.channels": "Teplotní čidla (shora dolů)",
    "devices.buffer_tank.channel": "Čidlo {0}",
    "devices.mixing_valve.name": "Směšovací ventil",
    "devices.mixing_valve.ports.hot_in": "Teplá větev",
    "devices.mixing_valve.ports.return_in": "Vratka (bypass)",
    "devices.mixing_valve.ports.mixed_out": "Smíšená voda",
    "devices.electric_heater.name": "Průtokový elektrický ohřívač",
    "devices.electric_heater.ports.in": "Vstup",
    "devices.electric_heater.ports.out": "Výstup",
    "editor.heater_title": "Elektrická topná spirála",
    "devices.outdoor_unit.name": "Venkovní jednotka TČ",
    "devices.outdoor_unit.ports.hot_out": "Výstup topné vody",
    "devices.outdoor_unit.ports.cold_in": "Vratka topné vody",
    "devices.outdoor_unit.channels": "Zobrazené hodnoty",
    "devices.outdoor_unit.channel": "Hodnota {0}",
    "devices.inline.ports.in": "Vstup",
    "devices.inline.ports.out": "Výstup",
    "devices.pipe_sensor.name": "Čidlo na potrubí",
    "editor.node_value_entity": "Entita hodnoty",
    "editor.node_value_attribute": "Zobrazený atribut",
    "editor.node_value_attribute_helper": "Prázdné = stav entity, např. current_temperature",
    "devices.heat_source.ports.supply_out": "Přívod",
    "devices.heat_source.ports.return_in": "Vratka",
    "devices.gas_boiler.name": "Plynový kotel",
    "devices.electric_boiler.name": "Elektrokotel",
    "devices.solid_fuel_boiler.name": "Kotel na tuhá paliva / krb",
    "devices.solar_collector.name": "Solární kolektor",
    "devices.solar_collector.ports.hot_out": "Teplý výstup",
    "devices.solar_collector.ports.cold_in": "Studený vstup",
    "devices.four_port.ports.primary_in": "Primár – přívod",
    "devices.four_port.ports.primary_out": "Primár – vratka",
    "devices.four_port.ports.secondary_out": "Sekundár – přívod",
    "devices.four_port.ports.secondary_in": "Sekundár – vratka",
    "devices.hydraulic_separator.name": "Hydraulický vyrovnávač",
    "devices.plate_heat_exchanger.name": "Deskový výměník",
    "devices.expansion_vessel.name": "Expanzní nádoba",
    "devices.expansion_vessel.ports.connection": "Připojení",
    "devices.safety_valve.name": "Pojistný ventil",
    "devices.safety_valve.ports.in": "Vstup",
    "devices.safety_valve.ports.discharge": "Výtok",
    "devices.zone_valve.name": "Zónový ventil",
    "devices.terminal.ports.in": "Přívod",
    "devices.terminal.ports.out": "Vratka",
    "devices.radiator.name": "Radiátor",
    "devices.fancoil.name": "Fancoil / konvektor",
    "devices.dhw_circulation_pump.name": "Cirkulační čerpadlo TV",
    "devices.flow_meter.name": "Průtokoměr",
    "devices.pressure_gauge.name": "Tlakoměr",
    "devices.heat_meter.name": "Měřič tepla",
    "devices.outdoor_temperature.name": "Venkovní teplota",
    "editor.node_state_position_entity": "Entita pohonu",
    "editor.node_state_position_attribute": "Atribut polohy (%)",
    "editor.node_state_position_helper": "Prázdné = current_position nebo stav entity",
    "editor.channel_name": "Název",
    "editor.title": "Editor schématu",
    "editor.add_device": "Přidat zařízení",
    "editor.device_type": "Typ zařízení",
    "editor.add_selected_device": "Přidat vybrané zařízení",
    "editor.add_heat_pump": "Tepelné čerpadlo",
    "editor.delete_selected": "Smazat vybrané",
    "editor.rotate_selected": "Otočit",
    "editor.empty_hint": "Přidejte zařízení a začněte sestavovat schéma.",
    "editor.language": "Jazyk",
    "editor.translations": "Překlady",
    "editor.schema_tab": "Schéma",
    "editor.overlay_tab": "Popisky",
    "editor.overlays_empty": "Zatím žádné popisky. Přepněte na záložku Popisky.",
    "editor.add_overlay": "Přidat popisek",
    "editor.connection_pending": "Napojování z {0} — klikněte na kompatibilní port",
    "editor.node_state_title": "Stavové napojení vybraného zařízení",
    "editor.node_state_entity": "Entita stavu",
    "editor.node_state_active": "Aktivní stav",
    "editor.node_state_mode_attribute": "Atribut režimu ventilu",
    "editor.node_state_branch_a": "Hodnota větve A",
    "editor.node_state_branch_b": "Hodnota větve B",
    "editor.language_auto": "Jazyk Home Assistantu",
    "editor.default_value": "Výchozí: {0}",
    "overlay.entity": "Entita",
    "overlay.name": "Název",
    "overlay.template": "Šablona zobrazení",
    "overlay.rules": "Podmíněná pravidla",
    "overlay.add_rule": "Přidat pravidlo",
    "overlay.rule.condition": "Podmínka",
    "overlay.rule.condition_state": "Stav je roven",
    "overlay.rule.condition_numeric": "Číselná hodnota",
    "overlay.rule.entity": "Entita",
    "overlay.rule.entity_helper": "Prázdné = entita popisku",
    "overlay.rule.state": "Stav",
    "overlay.rule.above": "Nad",
    "overlay.rule.below": "Pod",
    "overlay.rule.color": "Barva textu",
    "overlay.rule.hide": "Skrýt popisek",
    "card.empty": "Schéma není nakonfigurováno. Upravte kartu a navrhněte topné schéma.",
  },
};

export class Translator {
  private readonly _language: string;
  private readonly _userTranslations: TranslationsConfig;

  constructor(language: string, userTranslations: TranslationsConfig = {}) {
    this._language = language;
    this._userTranslations = userTranslations;
  }

  get language(): string {
    return this._language;
  }

  t(key: string, ...replacements: string[]): string {
    let text = this._lookup(key);
    replacements.forEach((value, index) => {
      text = text.replace(`{${index}}`, value);
    });
    return text;
  }

  private _lookup(key: string): string {
    const userLang = this._userTranslations[this._language]?.[key];
    if (userLang !== undefined) return userLang;

    const builtinLang = BUILTIN_TRANSLATIONS[this._language]?.[key];
    if (builtinLang !== undefined) return builtinLang;

    const userDefault = this._userTranslations[DEFAULT_LANGUAGE]?.[key];
    if (userDefault !== undefined) return userDefault;

    const builtinDefault = BUILTIN_TRANSLATIONS[DEFAULT_LANGUAGE]?.[key];
    if (builtinDefault !== undefined) return builtinDefault;

    return key;
  }

  getAvailableLanguages(): string[] {
    const langs = new Set<string>([
      ...Object.keys(BUILTIN_TRANSLATIONS),
      ...Object.keys(this._userTranslations),
    ]);
    return [...langs].sort();
  }

  getEditableTranslations(): Record<string, string> {
    const merged: Record<string, string> = {
      ...(BUILTIN_TRANSLATIONS[DEFAULT_LANGUAGE] ?? {}),
      ...(BUILTIN_TRANSLATIONS[this._language] ?? {}),
      ...(this._userTranslations[this._language] ?? {}),
    };
    return merged;
  }
}

export function createTranslator(
  language?: string,
  userTranslations?: TranslationsConfig
): Translator {
  const translations = userTranslations ?? {};
  return new Translator(resolveLanguage(language, translations), translations);
}

/** Maps HA language codes such as `en-GB` to an available translation. */
function resolveLanguage(language: string | undefined, userTranslations: TranslationsConfig): string {
  if (!language) return DEFAULT_LANGUAGE;
  if (BUILTIN_TRANSLATIONS[language] || userTranslations[language]) return language;
  const base = language.split("-")[0];
  if (BUILTIN_TRANSLATIONS[base] || userTranslations[base]) return base;
  return language;
}
