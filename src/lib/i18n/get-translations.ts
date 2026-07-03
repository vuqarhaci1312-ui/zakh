import { unstable_cache } from "next/cache";
import type { Locale } from "./language-data";
import { createTranslator, type TranslateFn, type TranslationDictionary } from "./create-translator";

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

async function fetchDictionaryFromPublic(locale: Locale): Promise<TranslationDictionary> {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_URL ??
    "http://localhost:3000";
  const origin = base.startsWith("http") ? base : `https://${base}`;

  const res = await fetch(`${origin}/i18n/${locale}.json`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error(`Public dictionary missing for ${locale}`);
  }

  return (await res.json()) as TranslationDictionary;
}

async function loadDictionary(locale: Locale): Promise<TranslationDictionary> {
  try {
    return await fetchDictionaryFromApi(locale);
  } catch {
    return fetchDictionaryFromPublic(locale);
  }
}

export const getTranslations = unstable_cache(
  async (locale: Locale): Promise<TranslateFn> => {
    const primary = await loadDictionary(locale);
    let fallback: TranslationDictionary | undefined;

    if (locale !== "en") {
      try {
        fallback = await loadDictionary("en");
      } catch {
        fallback = undefined;
      }
    }

    return createTranslator(primary, fallback);
  },
  ["site-translations"],
  { revalidate: 300, tags: ["translations"] },
);

export async function getTranslationDictionary(locale: Locale) {
  return loadDictionary(locale);
}
