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
import { getLocaleDrafts, useEditModeOptional } from "@/contexts/EditModeContext";
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
const STATIC_CONTENT_PREFIXES = ["stats.STAT_CARDS.", "branches.", "hero.", "contact.", "brochures.BROCHURES.", "about.WHO_WE_ARE."];

function applyStaticContentOverrides(
  merged: TranslationDictionary,
  staticDict: TranslationDictionary,
): TranslationDictionary {
  const result = { ...merged };

  for (const key of Object.keys(staticDict)) {
    if (STATIC_CONTENT_PREFIXES.some((prefix) => key.startsWith(prefix))) {
      result[key] = staticDict[key];
    }
  }

  return result;
}

async function fetchDictionary(locale: Locale): Promise<TranslationDictionary> {
  let staticDict: TranslationDictionary = {};
  try {
    const staticRes = await fetch(`/i18n/${locale}.json`, { cache: "no-store" });
    if (staticRes.ok) {
      staticDict = (await staticRes.json()) as TranslationDictionary;
    }
  } catch {
    /* static fallback optional */
  }

  try {
    const res = await fetch(`${API_URL}/api/translations?locale=${locale}`, {
      credentials: "include",
      cache: "no-store",
    });
    if (res.ok) {
      const data = (await res.json()) as { translations: TranslationDictionary };
      const apiDict = data.translations;
      // EN/RU: static file wins conflicts to prevent cross-locale bleed from stale API data.
      // AZ and other locales: API/DB wins; static JSON fills missing keys.
      if (locale === "en" || locale === "ru" || locale === "ar") {
        return applyStaticContentOverrides({ ...apiDict, ...staticDict }, staticDict);
      }
      return applyStaticContentOverrides({ ...staticDict, ...apiDict }, staticDict);
    }
  } catch {
    /* fallback below */
  }

  return staticDict;
}

export function TranslationsProvider({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();
  const editMode = useEditModeOptional();
  const [dictionary, setDictionary] = useState<TranslationDictionary>({});
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const primary = await fetchDictionary(locale);
      setDictionary(primary);
    } finally {
      setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!editMode) return;
    editMode.onSaved(load);
  }, [editMode, load]);

  const effectiveDictionary = useMemo(() => {
    if (!editMode) return dictionary;
    const localeDrafts = getLocaleDrafts(editMode.drafts, locale);
    return { ...dictionary, ...localeDrafts };
  }, [dictionary, editMode, locale]);

  const t = useMemo(
    () => createTranslator(effectiveDictionary, locale),
    [effectiveDictionary, locale],
  );

  const value = useMemo(
    () => ({ t, locale, loading, reload: load }),
    [t, locale, loading, load],
  );

  return (
    <TranslationsContext.Provider value={value}>
      <div
        style={{
          visibility: loading && Object.keys(dictionary).length === 0 ? "hidden" : "visible",
        }}
      >
        {children}
      </div>
    </TranslationsContext.Provider>
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
