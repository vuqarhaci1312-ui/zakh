export const LANGUAGES = [
  { code: "az", label: "Azərbaycan", short: "AZ" },
  { code: "en", label: "English", short: "EN" },
  { code: "ru", label: "Русский", short: "RU" },
  { code: "ar", label: "العربية", short: "AR" },
] as const;

export type Locale = (typeof LANGUAGES)[number]["code"];

export const DEFAULT_LOCALE: Locale = "az";
export const LOCALE_STORAGE_KEY = "zakher-locale";

export function isRtlLocale(locale: Locale) {
  return locale === "ar";
}

export function getLanguageByCode(code: Locale) {
  return LANGUAGES.find((language) => language.code === code) ?? LANGUAGES[0];
}
