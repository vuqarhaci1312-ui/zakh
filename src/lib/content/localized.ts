export type Locale = "az" | "en" | "ru" | "ar";
export const LOCALES: Locale[] = ["az", "en", "ru", "ar"];

export type LocalizedText = Record<Locale, string>;

export function emptyLocalized(): LocalizedText {
  return { az: "", en: "", ru: "", ar: "" };
}

export function isLocalizedComplete(value: unknown): value is LocalizedText {
  if (!value || typeof value !== "object") return false;
  const obj = value as Record<string, string>;
  return LOCALES.every((locale) => typeof obj[locale] === "string" && obj[locale].trim().length > 0);
}

export function pickLocalized(value: LocalizedText | null | undefined, locale: Locale): string {
  if (!value) return "";
  return value[locale]?.trim() || value.en?.trim() || value.az?.trim() || "";
}

export function missingLocales(value: unknown): Locale[] {
  if (!value || typeof value !== "object") return [...LOCALES];
  const obj = value as Record<string, string>;
  return LOCALES.filter((locale) => !obj[locale]?.trim());
}

export type LocalizedFaq = { question: LocalizedText; answer: LocalizedText };
export type LocalizedStat = { label: LocalizedText; value: LocalizedText };
export type LocalizedMeta = { label: LocalizedText; value: LocalizedText };
export type LocalizedSection = { heading?: LocalizedText; body: LocalizedText };

export function validateLocalizedFields(
  fields: { path: string; value: unknown }[],
): string[] {
  const errors: string[] = [];
  for (const field of fields) {
    if (!isLocalizedComplete(field.value)) {
      const missing = missingLocales(field.value);
      errors.push(`${field.path}: missing ${missing.join(", ")}`);
    }
  }
  return errors;
}

export function resolveLocalizedDeep<T>(value: T, locale: Locale): T {
  if (value == null) return value;
  if (Array.isArray(value)) {
    return value.map((item) => resolveLocalizedDeep(item, locale)) as T;
  }
  if (typeof value === "object" && isLocalizedShape(value)) {
    return pickLocalized(value as LocalizedText, locale) as T;
  }
  if (typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      result[key] = resolveLocalizedDeep(nested, locale);
    }
    return result as T;
  }
  return value;
}

function isLocalizedShape(value: object): value is LocalizedText {
  const keys = Object.keys(value);
  return keys.length === 4 && LOCALES.every((locale) => locale in value);
}
