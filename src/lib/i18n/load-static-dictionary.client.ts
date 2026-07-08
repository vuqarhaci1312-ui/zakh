import type { Locale } from "./language-data";
import type { TranslationDictionary } from "./create-translator";

export async function fetchStaticDictionary(locale: Locale): Promise<TranslationDictionary> {
  const res = await fetch(`/api/i18n/${locale}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to load static dictionary for ${locale}`);
  }

  return (await res.json()) as TranslationDictionary;
}
