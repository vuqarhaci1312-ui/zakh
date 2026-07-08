import { unstable_cache } from "next/cache";
import type { Locale } from "./language-data";
import { createTranslator, type TranslateFn, type TranslationDictionary } from "./create-translator";
import { loadStaticDictionaryFromDisk } from "./load-static-dictionary.server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function fetchDictionaryFromApi(locale: Locale): Promise<TranslationDictionary> {
  const res = await fetch(`${API_URL}/api/translations?locale=${locale}`, {
    next: { revalidate: 300, tags: ["translations"] },
  });

  if (!res.ok) {
    throw new Error(`Translation API error: ${res.status}`);
  }

  const data = (await res.json()) as { translations: TranslationDictionary };
  return data.translations;
}

async function loadDictionary(locale: Locale): Promise<TranslationDictionary> {
  const staticDict = loadStaticDictionaryFromDisk(locale);

  try {
    const apiDict = await fetchDictionaryFromApi(locale);
    return { ...apiDict, ...staticDict };
  } catch {
    return staticDict;
  }
}

export const getTranslations = unstable_cache(
  async (locale: Locale): Promise<TranslateFn> => {
    const primary = await loadDictionary(locale);
    return createTranslator(primary, locale);
  },
  ["site-translations"],
  { revalidate: 300, tags: ["translations"] },
);

export async function getTranslationDictionary(locale: Locale) {
  return loadDictionary(locale);
}
