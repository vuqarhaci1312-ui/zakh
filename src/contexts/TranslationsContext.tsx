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
import { fetchStaticDictionary } from "@/lib/i18n/load-static-dictionary.client";
import { mergeTranslationDictionaries } from "@/lib/i18n/merge-dictionaries";
import type { Locale } from "@/lib/i18n/language-data";

type TranslationsContextValue = {
  t: TranslateFn;
  locale: Locale;
  loading: boolean;
  reload: () => Promise<void>;
};

const TranslationsContext = createContext<TranslationsContextValue | null>(null);

async function fetchApiDictionary(locale: Locale): Promise<TranslationDictionary> {
  const res = await fetch(`/api/cms/api/translations?locale=${locale}`, {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Translation API error: ${res.status}`);
  }

  const data = (await res.json()) as { translations: TranslationDictionary };
  return data.translations;
}

async function fetchDictionary(locale: Locale): Promise<TranslationDictionary> {
  const [staticDict, enDict] = await Promise.all([
    fetchStaticDictionary(locale),
    locale === "en" ? Promise.resolve({} as TranslationDictionary) : fetchStaticDictionary("en"),
  ]);

  try {
    const apiDict = await fetchApiDictionary(locale);
    return mergeTranslationDictionaries(locale, apiDict, staticDict, enDict);
  } catch {
    return staticDict;
  }
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
