import { DEFAULT_LOCALE, type Locale, isLocale } from "@/lib/seo/site-config";

const LOCALE_PREFIX_RE = /^\/(az|en|ru|ar)(?=\/|$)/;

/** Strip leading locale segment from a pathname. */
export function stripLocale(pathname: string): string {
  const cleaned = pathname.replace(LOCALE_PREFIX_RE, "") || "/";
  return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
}

/** Read locale from pathname, or null if missing/invalid. */
export function getLocaleFromPathname(pathname: string): Locale | null {
  const match = pathname.match(LOCALE_PREFIX_RE);
  if (!match) return null;
  return isLocale(match[1]) ? match[1] : null;
}

/**
 * Build a locale-prefixed path.
 * External URLs, mailto, tel, hashes, and already-prefixed paths are left alone.
 */
export function localePath(locale: Locale, href: string): string {
  if (
    !href ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#") ||
    href.startsWith("//")
  ) {
    return href;
  }

  const [pathPart, query = ""] = href.split("?");
  const [pathname, hash = ""] = pathPart.split("#");
  const bare = stripLocale(pathname || "/");
  const normalized = bare === "/" ? "" : bare.replace(/\/$/, "");
  const prefixed = `/${locale}${normalized}`;
  const withQuery = query ? `${prefixed}?${query}` : prefixed;
  return hash ? `${withQuery}#${hash}` : withQuery;
}

/** Swap locale in the current pathname while keeping the rest of the path. */
export function swapLocalePath(pathname: string, nextLocale: Locale): string {
  const bare = stripLocale(pathname);
  return localePath(nextLocale, bare);
}

export function withDefaultLocale(pathname: string): string {
  return localePath(DEFAULT_LOCALE, stripLocale(pathname));
}
