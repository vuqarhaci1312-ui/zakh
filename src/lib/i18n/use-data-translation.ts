import { useTranslations } from "@/contexts/TranslationsContext";

/** Resolve a translation key with English fallback text from data files. */
export function useDataTranslation() {
  const t = useTranslations();
  return (key: string, fallback: string) => t(key, fallback);
}

/** Shorthand alias used across section components. */
export function useDt() {
  return useDataTranslation();
}
