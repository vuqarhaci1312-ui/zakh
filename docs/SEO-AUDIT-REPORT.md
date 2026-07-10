# SEO Audit Report — Zakher Travel

**Date:** 2026-07-10  
**Site:** https://zakher.travel (canonical; `www` → non-www 301 via middleware)  
**Stack:** Next.js 16.2.9 App Router, React 19, SSG for destinations/tours/branches

---

## Summary

Enterprise technical SEO was implemented across infrastructure, locale URL routing (`/az|en|ru|ar`), metadata, JSON-LD, internal linking, accessibility markup, and Core Web Vitals code-level improvements. Production build succeeds with **335 static pages** generated plus `robots.txt` and `sitemap.xml`.

---

## Problems Solved

### Technical SEO
- Added [`src/app/robots.ts`](src/app/robots.ts) — allows public routes, disallows `/admin` and `/api`
- Added [`src/app/sitemap.ts`](src/app/sitemap.ts) — locale × static + destinations + tours + branches (~320 URLs)
- Canonical URLs + hreflang via [`src/lib/seo/metadata.ts`](src/lib/seo/metadata.ts)
- `www.` → apex redirect in [`src/middleware.ts`](src/middleware.ts)
- Locale prefix routing; bare paths redirect to `/az/...` (or cookie locale)
- `/destinations` → `/az/tour-packages` (middleware + `next.config` redirects)
- Admin `noindex` metadata + `X-Robots-Tag` header
- Query params (`?from=`, `?country=`) no longer create separate indexable URLs in sitemap; canonicals omit tracking params

### Meta & Social
- Server-side `generateMetadata` on all public pages (replaces client-only `LocaleDocumentMeta`)
- Open Graph, Twitter Card, theme-color, icons, web manifest
- Default OG image: `/og/default.png`
- Unique titles/descriptions per locale from i18n JSON

### Structured Data (JSON-LD)
- Organization + TravelAgency
- WebSite + SearchAction
- WebPage
- BreadcrumbList (destination, tour, branch)
- FAQPage (country FAQs)
- TouristTrip (tour detail)
- LocalBusiness / TravelAgency (branch detail)
- ContactPoint on Organization

### Internal Linking & Orphans
- Footer: Who We Are, Privacy Policy, Terms (removed duplicate brochures link)
- Locale-aware `LocaleLink` across Navigation, Footer, Hero, Tour Packages, Destinations, Branches
- `test.zakher.travel` href removed from ExploreDestinations data

### Semantic / A11y / CWV
- Meaningful `alt` on tour overview cards and Who We Are hero
- Decorative icons marked `aria-hidden`
- Font `display: swap`; reduced font weights
- CDN `preconnect` / `dns-prefetch`
- Elfsight reviews script loads on intersection (`lazyOnload`)
- Image width/height on nav/footer logos

### E-E-A-T
- New pages: `/[locale]/privacy-policy`, `/[locale]/terms`
- Organization entity: foundingDate 2016, areaServed, knowsAbout, contact

---

## Key Files Changed / Added

| Area | Paths |
|------|--------|
| SEO lib | `src/lib/seo/*`, `src/lib/i18n/locale-path.ts` |
| Routing | `src/middleware.ts`, `src/app/[locale]/**`, `next.config.ts` |
| Meta/UI | `src/app/layout.tsx`, `src/components/LocaleLink.tsx`, Navigation, Footer, LanguageContext |
| Schema | `src/components/seo/JsonLd.tsx` |
| Assets | `public/manifest.webmanifest`, `public/og/default.png`, `public/icon.png`, `public/apple-icon.png` |
| Legal | `src/app/[locale]/privacy-policy/page.tsx`, `src/app/[locale]/terms/page.tsx` |
| Report | `docs/SEO-AUDIT-REPORT.md` |

**Removed from runtime:** client `LocaleDocumentMeta` (no longer mounted in Providers).

---

## Remaining / Server-Side Items

These require hosting/GSC/ops — not fully solvable in app code alone:

1. **Vercel/DNS:** confirm apex + www domain settings match middleware (apex primary)
2. **Google Search Console:** submit `https://zakher.travel/sitemap.xml`; set preferred domain
3. **CDN/cache headers, Brotli, HTTP/3** — platform defaults
4. **AggregateRating JSON-LD** — intentionally omitted (Elfsight widget; Google policy risk without verified Business Profile data)
5. **Image compression pipeline** for large `tourphoto` JPEGs / OG assets (optional CI step)
6. **URL-prefix i18n for CMS edit mode** — language edit now opens `/az/?edit=1`
7. **Lighthouse CI** in pipeline — run manually after deploy
8. **Next.js middleware → proxy migration** — framework deprecation warning; future upgrade

---

## Validation Performed

- `npm run build` — success
- Routes include `/robots.txt`, `/sitemap.xml`, all `/[locale]/*` public pages
- 335 static pages generated

## Recommended Post-Deploy Checks

1. Rich Results Test: home, one destination FAQ, one tour, one branch
2. Lighthouse mobile: `/az`, `/az/tour-packages`, one tour detail
3. Confirm `/about` → 308 → `/az/about`
4. Confirm `www.zakher.travel` → 301 → `zakher.travel`
