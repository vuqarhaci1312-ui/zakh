import type { Locale } from "./language-data";

export type TranslationDictionary = Record<string, string>;

export type TranslateFn = (key: string, fallback?: string) => string;

export function createTranslator(
  dictionary: TranslationDictionary,
  fallbackDictionary?: TranslationDictionary,
): TranslateFn {
  return (key: string, fallback?: string) => {
    if (key in dictionary) return dictionary[key];
    if (fallbackDictionary && key in fallbackDictionary) return fallbackDictionary[key];
    if (fallback !== undefined) return fallback;
    return key;
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
