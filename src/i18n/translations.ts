import cs from "../translations/cs.json";
import en from "../translations/en.json";

type TranslationTree = { [key: string]: string | TranslationTree };

export const DEFAULT_LANGUAGE = "en";

/** Bundled language files; add a new language by adding `src/translations/<lang>.json`. */
const LANGUAGES: Record<string, TranslationTree> = { en, cs };

function lookup(tree: TranslationTree | undefined, key: string): string | undefined {
  let node: string | TranslationTree | undefined = tree;
  for (const part of key.split(".")) {
    if (node === undefined || typeof node === "string") return undefined;
    node = node[part];
  }
  return typeof node === "string" ? node : undefined;
}

/** Maps HA language codes such as `en-GB` or `zh-Hans` to a bundled language. */
export function resolveLanguage(language: string | undefined): string {
  if (!language) return DEFAULT_LANGUAGE;
  if (LANGUAGES[language]) return language;
  const base = language.split("-")[0];
  return LANGUAGES[base] ? base : DEFAULT_LANGUAGE;
}

export class Translator {
  constructor(public readonly language: string) {}

  t(key: string, ...replacements: string[]): string {
    let text =
      lookup(LANGUAGES[this.language], key) ?? lookup(LANGUAGES[DEFAULT_LANGUAGE], key) ?? key;
    replacements.forEach((value, index) => {
      text = text.replace(`{${index}}`, value);
    });
    return text;
  }
}

export function createTranslator(language?: string): Translator {
  return new Translator(resolveLanguage(language));
}
