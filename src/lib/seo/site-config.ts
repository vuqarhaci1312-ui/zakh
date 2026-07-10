import { DEFAULT_LOCALE, LANGUAGES, type Locale } from "@/lib/i18n/language-data";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://zakher.travel";

export const SITE_NAME = "Zakher Travel";
export const SITE_TAGLINE =
  "Your online and offline supplier in the world since 2016";

export const LOCALES = LANGUAGES.map((language) => language.code);
export { DEFAULT_LOCALE };
export type { Locale };

export const OG_IMAGE = "/og/default.png";
export const THEME_COLOR = "#ff8c00";

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: "Zakher Travel Group of Companies",
  url: SITE_URL,
  logo: `${SITE_URL}/hero/ztravel.png`,
  foundingDate: "2016",
  email: "info@zakher.travel",
  telephone: ["+994123100932", "+994502532209", "+971565902100"],
  address: {
    "@type": "PostalAddress" as const,
    streetAddress: "Huseyn Javid Ave 73",
    addressLocality: "Baku",
    postalCode: "AZ1073",
    addressCountry: "AZ",
  },
  sameAs: [
    "https://www.facebook.com/zakher.travel/",
    "https://www.instagram.com/zakher.travel",
    "https://www.linkedin.com/company/zakher-travel/",
    "https://www.youtube.com/@zakher.travel",
    "https://www.tiktok.com/@zakher.travel",
    "https://x.com/ZakherTravel",
    "https://www.snapchat.com/add/zakher.travel",
  ],
  areaServed: [
    "Azerbaijan",
    "Türkiye",
    "Georgia",
    "UAE",
    "Kazakhstan",
    "Uzbekistan",
    "Kyrgyzstan",
    "Russia",
    "Czech Republic",
    "Poland",
    "Ukraine",
  ],
  knowsAbout: [
    "Tour packages",
    "Destination management",
    "Travel agency services",
    "Visa support",
    "Corporate travel",
  ],
};

export const STATIC_PATHS = [
  "",
  "/about",
  "/who-we-are",
  "/our-services",
  "/our-branches",
  "/our-events",
  "/tour-packages",
  "/social-media",
  "/contact-us",
  "/privacy-policy",
  "/terms",
] as const;

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
