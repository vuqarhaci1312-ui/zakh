import type { Locale } from "./language-data";

export type TranslationDictionary = Record<string, string>;

export type TranslateFn = (key: string, fallback?: string) => string;

/**
 * Returns translations for a single locale only.
 * English source fallbacks (from *-data.ts) are used only when locale === "en".
 * This prevents AZ/RU/AR pages from showing mixed English text.
 */
export function createTranslator(
  dictionary: TranslationDictionary,
  locale: Locale,
): TranslateFn {
  return (key: string, fallback?: string) => {
    const value = dictionary[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }

    if (locale === "en") {
      return fallback ?? key;
    }

    return "";
  };
}

export function buildDictionaryFromSeed(
  items: { key: string; locale: string; value: string }[],
  locale: Locale,
): TranslationDictionary {
  return Object.fromEntries(
    items.filter((item) => item.locale === locale).map((item) => [item.key, item.value]),
  );
}
