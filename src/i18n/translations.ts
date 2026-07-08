import type { TranslationsConfig } from "../models/schema.js";
import { DEFAULT_LANGUAGE } from "../models/schema.js";

/** Built-in fallback strings; user translations in card config override these. */
export const BUILTIN_TRANSLATIONS: TranslationsConfig = {
  en: {
    "devices.heat_pump.name": "Heat pump",
    "devices.heat_pump.ports.cold_in": "Cold inlet",
    "devices.heat_pump.ports.hot_out": "Hot outlet",
    "editor.title": "Schema editor",
    "editor.add_device": "Add device",
    "editor.add_heat_pump": "Heat pump",
    "editor.delete_selected": "Delete selected",
    "editor.empty_hint": "Add a heat pump to start building your schema.",
    "editor.language": "Language",
    "editor.translations": "Translations",
    "editor.schema_tab": "Schema",
    "editor.overlay_tab": "Overlays",
    "editor.overlays_empty": "No overlays yet. Switch to overlay tab to add sensor labels.",
    "editor.add_overlay": "Add overlay",
    "editor.connection_pending": "Connecting from {0} — click a compatible port",
    "overlay.entity": "Entity",
    "overlay.template": "Display template",
    "card.empty": "No schema configured. Edit this card to design your heating layout.",
  },
  cs: {
    "devices.heat_pump.name": "Tepelné čerpadlo",
    "devices.heat_pump.ports.cold_in": "Studená voda – vstup",
    "devices.heat_pump.ports.hot_out": "Teplá voda – výstup",
    "editor.title": "Editor schématu",
    "editor.add_device": "Přidat zařízení",
    "editor.add_heat_pump": "Tepelné čerpadlo",
    "editor.delete_selected": "Smazat vybrané",
    "editor.empty_hint": "Přidejte tepelné čerpadlo a začněte sestavovat schéma.",
    "editor.language": "Jazyk",
    "editor.translations": "Překlady",
    "editor.schema_tab": "Schéma",
    "editor.overlay_tab": "Popisky",
    "editor.overlays_empty": "Zatím žádné popisky. Přepněte na záložku Popisky.",
    "editor.add_overlay": "Přidat popisek",
    "editor.connection_pending": "Napojování z {0} — klikněte na kompatibilní port",
    "overlay.entity": "Entita",
    "overlay.template": "Šablona zobrazení",
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
      ...(BUILTIN_TRANSLATIONS[this._language] ?? {}),
      ...(BUILTIN_TRANSLATIONS[DEFAULT_LANGUAGE] ?? {}),
      ...(this._userTranslations[this._language] ?? {}),
    };
    return merged;
  }
}

export function createTranslator(
  language?: string,
  userTranslations?: TranslationsConfig
): Translator {
  return new Translator(language ?? DEFAULT_LANGUAGE, userTranslations ?? {});
}
