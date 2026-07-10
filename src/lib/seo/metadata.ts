import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  LOCALES,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  THEME_COLOR,
  type Locale,
} from "@/lib/seo/site-config";
import { localePath } from "@/lib/i18n/locale-path";

type BuildPageMetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function buildLanguageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[locale] = absoluteUrl(localePath(locale, path));
  }
  languages["x-default"] = absoluteUrl(localePath(DEFAULT_LOCALE, path));
  return languages;
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  image = OG_IMAGE,
  noIndex = false,
  type = "website",
}: BuildPageMetadataInput): Metadata {
  const canonicalPath = localePath(locale, path);
  const canonical = absoluteUrl(canonicalPath);
  const ogImage = absoluteUrl(image);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
    openGraph: {
      type,
      locale,
      url: canonical,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description:
      "Professional travel agency in Azerbaijan offering Baku city tours, Azerbaijan tour packages, visa support and unforgettable travel experiences across the Caucasus.",
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: { telephone: true, email: true, address: true },
    icons: {
      icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
      apple: [{ url: "/apple-icon.png" }],
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      images: [{ url: absoluteUrl(OG_IMAGE), width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
    },
    other: {
      "theme-color": THEME_COLOR,
    },
  };
}
