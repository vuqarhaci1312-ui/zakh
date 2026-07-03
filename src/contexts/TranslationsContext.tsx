"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  createTranslator,
  type TranslateFn,
  type TranslationDictionary,
} from "@/lib/i18n/create-translator";
import type { Locale } from "@/lib/i18n/language-data";

type TranslationsContextValue = {
  t: TranslateFn;
  locale: Locale;
  loading: boolean;
  reload: () => Promise<void>;
};

const TranslationsContext = createContext<TranslationsContextValue | null>(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function fetchDictionary(locale: Locale): Promise<TranslationDictionary> {
  try {
    const res = await fetch(`${API_URL}/api/translations?locale=${locale}`, {
      credentials: "include",
    });
    if (res.ok) {
      const data = (await res.json()) as { translations: TranslationDictionary };
      return data.translations;
    }
  } catch {
    /* fallback below */
  }

  const res = await fetch(`/i18n/${locale}.json`);
  if (!res.ok) throw new Error("Translations unavailable");
  return (await res.json()) as TranslationDictionary;
}

export function TranslationsProvider({
  children,
  initialLocale,
  initialDictionary,
}: {
  children: ReactNode;
  initialLocale?: Locale;
  initialDictionary?: TranslationDictionary;
}) {
  const { locale: contextLocale } = useLanguage();
  const locale = initialLocale ?? contextLocale;
  const [dictionary, setDictionary] = useState<TranslationDictionary>(
    initialDictionary ?? {},
  );
  const [fallbackDictionary, setFallbackDictionary] = useState<TranslationDictionary>({});
  const [loading, setLoading] = useState(!initialDictionary);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const primary = await fetchDictionary(locale);
      setDictionary(primary);

      if (locale !== "en") {
        try {
          const en = await fetchDictionary("en");
          setFallbackDictionary(en);
        } catch {
          setFallbackDictionary({});
        }
      }
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    if (!initialDictionary || locale !== initialLocale) {
      void load();
    }
  }, [load, initialDictionary, initialLocale, locale]);

  const t = useMemo(
    () => createTranslator(dictionary, fallbackDictionary),
    [dictionary, fallbackDictionary],
  );

  const value = useMemo(
    () => ({ t, locale, loading, reload: load }),
    [t, locale, loading, load],
  );

  return (
    <TranslationsContext.Provider value={value}>{children}</TranslationsContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error("useTranslations must be used within TranslationsProvider");
  }
  return context.t;
}

export function useTranslationsState() {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error("useTranslationsState must be used within TranslationsProvider");
  }
  return context;
}
