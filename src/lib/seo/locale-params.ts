import { LOCALES, isLocale, type Locale } from "@/lib/seo/site-config";

export type LocaleParams = { locale: string };

export function parseLocale(raw: string): Locale {
  return isLocale(raw) ? raw : "az";
}

export function localeStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function withLocales<T extends Record<string, string>>(
  items: T[],
): Array<T & { locale: Locale }> {
  return LOCALES.flatMap((locale) => items.map((item) => ({ ...item, locale })));
}
