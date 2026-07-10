import { readFileSync } from "fs";
import path from "path";
import type { Locale } from "@/lib/seo/site-config";
import { DEFAULT_LOCALE } from "@/lib/seo/site-config";

type Dictionary = Record<string, string>;

const cache = new Map<Locale, Dictionary>();

function loadDictionary(locale: Locale): Dictionary {
  const cached = cache.get(locale);
  if (cached) return cached;

  const filePath = path.join(process.cwd(), "public", "i18n", `${locale}.json`);
  try {
    const raw = readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as Dictionary;
    cache.set(locale, parsed);
    return parsed;
  } catch {
    if (locale !== DEFAULT_LOCALE) {
      return loadDictionary(DEFAULT_LOCALE);
    }
    return {};
  }
}

export function getStaticTranslation(locale: Locale, key: string, fallback = ""): string {
  const dict = loadDictionary(locale);
  const value = dict[key];
  if (typeof value === "string" && value.trim()) return value;

  if (locale !== "en") {
    const en = loadDictionary("en");
    if (typeof en[key] === "string" && en[key].trim()) return en[key];
  }

  return fallback;
}
