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
import { usePathname, useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  LANGUAGES,
  type Locale,
  isRtlLocale,
} from "@/lib/i18n/language-data";
import { getLocaleFromPathname, swapLocalePath } from "@/lib/i18n/locale-path";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isValidLocale(value: string | null): value is Locale {
  return LANGUAGES.some((language) => language.code === value);
}

function applyLocale(locale: Locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir = isRtlLocale(locale) ? "rtl" : "ltr";
}

function persistLocale(locale: Locale) {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  document.cookie = `${LOCALE_STORAGE_KEY}=${locale};path=/;max-age=31536000;SameSite=Lax`;
}

export function LanguageProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const pathLocale = getLocaleFromPathname(pathname);
  const [locale, setLocaleState] = useState<Locale>(pathLocale ?? initialLocale);

  useEffect(() => {
    const next = pathLocale ?? initialLocale;
    setLocaleState(next);
    applyLocale(next);
    persistLocale(next);
  }, [pathLocale, initialLocale]);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      persistLocale(next);
      applyLocale(next);
      const target = swapLocalePath(pathname, next);
      if (target !== pathname) {
        router.push(target);
      }
    },
    [pathname, router],
  );

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
