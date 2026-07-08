import { readFileSync } from "fs";
import path from "path";
import type { Locale } from "./language-data";
import type { TranslationDictionary } from "./create-translator";

export function loadStaticDictionaryFromDisk(locale: Locale): TranslationDictionary {
  const filePath = path.join(process.cwd(), "public", "i18n", `${locale}.json`);
  return JSON.parse(readFileSync(filePath, "utf8")) as TranslationDictionary;
}
