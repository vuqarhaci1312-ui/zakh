import type { Locale } from "./localized";

const REMOTE_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function fetchContent<T>(path: string, locale: Locale): Promise<T | null> {
  try {
    const res = await fetch(`${REMOTE_API_URL}${path}?locale=${locale}`, {
      next: { revalidate: 60, tags: [`content-${path.split("/")[2] ?? "all"}`] },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function fetchBrochuresContent(locale: Locale) {
  return fetchContent("/api/content/brochures", locale);
}

export function fetchCertificatesContent(locale: Locale) {
  return fetchContent("/api/content/certificates", locale);
}

export function fetchEventsContent(locale: Locale) {
  return fetchContent("/api/content/events", locale);
}

export function fetchSocialContent(locale: Locale) {
  return fetchContent("/api/content/social", locale);
}

export function fetchToursContent(locale: Locale) {
  return fetchContent("/api/content/tours", locale);
}

export function fetchTourDetailContent(locale: Locale, countrySlug: string, tourSlug: string) {
  return fetchContent(`/api/content/tours/${countrySlug}/${tourSlug}`, locale);
}
