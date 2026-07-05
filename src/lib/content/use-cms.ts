"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Locale } from "./localized";

const API_BASE = typeof window !== "undefined" ? "/api/cms" : process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function fetchCms<T>(path: string, locale: Locale): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}?locale=${locale}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || (Array.isArray(data.items) && data.items.length === 0 && !data.section)) {
      return null;
    }
    return data as T;
  } catch {
    return null;
  }
}

export function useCmsContent<T>(path: string, enabled = true) {
  const { locale } = useLanguage();
  const [data, setData] = useState<T | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setLoaded(true);
      return;
    }
    setLoaded(false);
    void fetchCms<T>(path, locale as Locale).then((result) => {
      setData(result);
      setLoaded(true);
    });
  }, [path, locale, enabled]);

  return { data, loaded, hasCms: Boolean(data) };
}

export function useCmsTourDetail(countrySlug: string, tourSlug: string) {
  const { locale } = useLanguage();
  const [data, setData] = useState<{ country: { slug: string; name: string }; tour: Record<string, unknown> } | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    void fetchCms<{ country: { slug: string; name: string }; tour: Record<string, unknown> }>(
      `/api/content/tours/${countrySlug}/${tourSlug}`,
      locale as Locale,
    ).then((result) => {
      setData(result);
      setLoaded(true);
    });
  }, [countrySlug, tourSlug, locale]);

  return { data, loaded, hasCms: Boolean(data) };
}
