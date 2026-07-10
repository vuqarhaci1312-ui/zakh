import { SITE_URL } from "@/lib/seo/site-config";
import { absoluteUrl } from "@/lib/seo/metadata";
import { localePath } from "@/lib/i18n/locale-path";
import type { Locale } from "@/lib/seo/site-config";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_ID = `${SITE_URL}/#logo`;
export const NAV_ID = `${SITE_URL}/#main-navigation`;

export function destinationEntityId(slug: string) {
  return `${SITE_URL}/destinations/${slug}#destination`;
}

export function tourEntityId(countrySlug: string, tourSlug: string) {
  return `${SITE_URL}/destinations/${countrySlug}/${tourSlug}#tour`;
}

export function branchEntityId(slug: string) {
  return `${SITE_URL}/our-branches/${slug}#branch`;
}

export function imageEntityId(path: string) {
  const absolute = path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  return `${absolute}#image`;
}

export function offerEntityId(countrySlug: string, tourSlug: string) {
  return `${SITE_URL}/destinations/${countrySlug}/${tourSlug}#offer`;
}

export function serviceEntityId(slug: string) {
  return `${SITE_URL}/our-services#service-${slug}`;
}

export function webpageEntityId(locale: Locale, path: string) {
  return `${absoluteUrl(localePath(locale, path))}#webpage`;
}

export const DESTINATION_GEO: Record<
  string,
  { lat: number; lng: number; countryCode: string }
> = {
  azerbaijan: { lat: 40.4093, lng: 49.8671, countryCode: "AZ" },
  turkiye: { lat: 41.0082, lng: 28.9784, countryCode: "TR" },
  georgia: { lat: 41.7151, lng: 44.8271, countryCode: "GE" },
  uae: { lat: 25.2048, lng: 55.2708, countryCode: "AE" },
  kazakhstan: { lat: 43.222, lng: 76.8512, countryCode: "KZ" },
  uzbekistan: { lat: 41.2995, lng: 69.2401, countryCode: "UZ" },
  kyrgyzstan: { lat: 42.8746, lng: 74.5698, countryCode: "KG" },
  russia: { lat: 55.7558, lng: 37.6173, countryCode: "RU" },
  "czech-republic": { lat: 50.0755, lng: 14.4378, countryCode: "CZ" },
  poland: { lat: 52.2297, lng: 21.0122, countryCode: "PL" },
  ukraine: { lat: 50.4501, lng: 30.5234, countryCode: "UA" },
};

export const BRANCH_GEO: Record<
  string,
  { lat: number; lng: number; countryCode: string }
> = {
  ...DESTINATION_GEO,
  "saudi-arabia": { lat: 24.7136, lng: 46.6753, countryCode: "SA" },
};
