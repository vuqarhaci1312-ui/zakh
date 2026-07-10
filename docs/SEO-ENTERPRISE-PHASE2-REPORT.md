# SEO Enterprise Phase 2 Report — Zakher Travel

**Date:** 2026-07-10  
**Site:** https://zakher.travel  
**Scope:** Advanced enterprise SEO on top of Phase 1 (robots, sitemap, canonical, hreflang, metadata, core JSON-LD, locale routing). Phase 1 features were **not** rewritten.

---

## 1. Applied Optimizations

### Crawl Budget
- Country overview cards on `/tour-packages` are crawlable `LocaleLink`s to `/destinations/{slug}` (was `<button>` filter-only).
- Footer “Destinations” column: 6 hub links with diversified anchors (Tours / Packages / Travel).
- Branch detail → destination cross-link when a matching country hub exists.
- Related destinations expanded from 2 → 4.
- `?edit=1` CMS mode: `X-Robots-Tag: noindex, nofollow` + home `generateMetadata` robots override.
- Thin hubs (0 tours: UAE, Czech Republic): sitemap priority **0.65** (others 0.85).

### Index Budget
- Destination FAQs: country-specific FAQs merged with general booking FAQs (deduped).
- FAQPage JSON-LD only includes real Q&A (`isRealFaqQuestion`); tour-listing-style “questions” stay visible but are excluded from schema.
- Tour detail pages: generated FAQ blocks + FAQPage schema from tour meta/inclusions/booking.

### Advanced Entity SEO & Schema
New builders in `src/components/seo/JsonLd.tsx` + `@id` graph in `src/lib/seo/entity-ids.ts`:

| Schema | Pages |
|--------|--------|
| TouristDestination + Place + GeoCoordinates | Destination hubs |
| ItemList | Tour packages, destination tours, events |
| CollectionPage | Tour packages |
| Offer + PriceSpecification | Tours with `price` |
| PostalAddress + GeoCoordinates | Branch detail |
| Service / OfferCatalog | Our services |
| DefinedTermSet | Our services taxonomy |
| Event (via ItemList) | Our events |
| ImageObject | Destination/tour heroes |
| Speakable | Home, tour-packages, destinations |

### GEO / AI Search
- FaqAccordion: semantic `<dl>/<dt>/<dd>` + `.faq-answer`.
- Destination root: `<article>`; FAQ `<h2>`; tour cards `<h3>`.
- `AnswerBlocks`: Key facts + summary on tour detail.
- `data-seo-summary` markers for citation-friendly excerpts.

### Image SEO & CWV Advanced
- TourGallery first slide: `next/image` + `priority` + `fetchPriority="high"`.
- `next.config.ts`: explicit `formats: ['image/avif', 'image/webp']`.
- Hero poster: `/hero/hero-poster.webp` + `<link rel="preload">`.
- `preconnect` to `storage.googleapis.com`.
- Speculation Rules API: prerender top destinations; prefetch locale paths.

### Internal Authority Flow
- Footer destination hubs, branch↔destination links, related hubs ×4, crawlable country cards, diversified anchors.

### Monitoring Prep
- `.github/workflows/lighthouse.yml`
- `lighthouserc.js` (SEO assert ≥ 0.9)
- `scripts/seo-validate.ts` + `npm run seo:validate` / `seo:lighthouse`

---

## 2. Not Applied (Architecture / Policy)

| Item | Reason |
|------|--------|
| AggregateRating / Review | Elfsight widget; Google policy risk without verified Business Profile data |
| VideoObject | Hero CDN video lacks license/creator metadata |
| Dataset | No public dataset on site |
| SearchResultsPage | No dedicated search results route |
| Priority Hints HTTP header | CDN/platform level; `fetchPriority` attribute used instead |
| Partial hydration rewrite | App Router defaults already stream; no custom RSC split needed |
| Home RelatedPackages expansion | Design/content decision — left as-is |
| New programmatic city/category routes | Requires CMS content + routing project (see §5) |

---

## 3. Server / CDN / GSC / DevOps Only

1. Google Search Console: submit sitemap, verify property, monitor coverage.
2. Vercel/DNS: confirm apex primary + www 301 (middleware already redirects).
3. CDN: Brotli, HTTP/3, cache headers, Importance hints.
4. `@vercel/speed-insights` / RUM for Core Web Vitals field data.
5. IndexNow / Bing Webmaster (optional).
6. Bulk JPEG compression pipeline for `public/tours/**/tourphoto`.
7. GSC verification meta / DNS TXT (not in app code).

---

## 4. Content / CMS Dependencies

| Gap | Need |
|-----|------|
| UAE & Czech Republic hubs | Add tour child pages or enrich unique copy |
| Saudi Arabia | Destination hub missing (branch-only) |
| Poland / Ukraine branches | Real street addresses (placeholders hurt LocalBusiness) |
| `/social-media` | More indexable prose (currently widget-heavy) |
| Multi-country combo landings | Dedicated URLs for “1 Trip 2/3 Countries” |
| City / category landings | Content for Istanbul, Moscow, Golf, Shopping, Visa, Insurance |
| FAQ i18n for generated tour FAQs | Currently English fallbacks from `buildTourFaqs` |

---

## 5. Search Intent Mapping

| Intent | URLs |
|--------|------|
| Navigational | `/`, `/contact-us`, `/our-branches`, `/our-branches/[slug]` |
| Commercial | `/tour-packages`, `/destinations/[slug]`, `/destinations/[slug]/[tour]`, `/our-services` |
| Informational | `/about`, `/who-we-are`, `/our-events`, `/social-media`, `/privacy-policy`, `/terms` |
| Transactional | Reservation modal only (client; not a separate indexable URL) |

**Misaligned / weak fit**
- `/social-media` — informational shell, commercial discovery potential; thin text.
- `/our-events` — informational gallery; Event schema now present, but no per-event URLs.
- Thin hubs UAE / Czech Republic — commercial intent URL with thin spoke depth.

---

## 6. Topic Cluster Strategy

### Existing (code-backed)
- **Destination cluster:** 11 hubs → 46 tour spokes (hub-and-spoke).
- **Branch cluster:** 12 local offices under `/our-branches`.
- **Services cluster:** Tourist / Real estate / Medical / MICE on `/our-services`.

### Missing clusters (content required)
1. Visa support hub + FAQ
2. Travel insurance
3. Multi-country combo packages
4. City pages (Baku, Istanbul, Tbilisi, Almaty, Moscow, …)
5. Category landings (Golf, Jeep safari, Shopping, Silk Road)
6. Corporate / MICE dedicated landing (beyond services section)

---

## 7. Programmatic SEO Audit

**Ready data:** `TourDetail.meta` (City, Category, Duration), `COUNTRY_TOURS`, `BRANCH_DETAILS`, i18n keys.

**Feasible auto-pages (future project):**
- `/destinations/{country}/cities/{city}`
- `/categories/{category}`
- `/packages/{combo-slug}`
- `/services/visa`, `/services/insurance`

**Constraint:** Do not change current routing without CMS content + design. Express CMS backend can seed these later; App Router `generateStaticParams` pattern already proven.

---

## 8. Crawl Depth Summary

```
Depth 0  /[locale]
Depth 1  static hubs + tour-packages + our-branches
Depth 2  /destinations/[slug]  |  /our-branches/[slug]
Depth 3  /destinations/[slug]/[tour]
```

Max depth remains **3**. New HTML links from tour-packages → hubs close the previous JS-only gap.

---

## 9. Key Files Added / Changed

```
src/lib/seo/entity-ids.ts
src/components/seo/AnswerBlocks.tsx
src/components/seo/SpeculationRules.tsx
src/components/seo/JsonLd.tsx
scripts/seo-validate.ts
lighthouserc.js
.github/workflows/lighthouse.yml
docs/SEO-ENTERPRISE-PHASE2-REPORT.md
(+ crawl/GEO/image updates across TourPackages, Footer, Destination*, middleware, sitemap, next.config, layouts)
```

---

## 10. Validation Checklist

- [ ] `npm run seo:validate`
- [ ] `npm run build`
- [ ] Rich Results Test: destination hub, tour with price, branch with geo
- [ ] Lighthouse mobile: `/az`, `/az/tour-packages`, one tour
- [ ] Confirm `?edit=1` returns noindex
- [ ] Confirm country cards link to `/destinations/{slug}`

---

## 11. Phase 3 — AI Discovery, Knowledge Graph, Head & Hints

### AI Discovery Standards

| File | Status | Notes |
|------|--------|-------|
| `/llms.txt` | Added | Curated Markdown map for AI agents |
| `/humans.txt` | Added | Team/contact/site credits |
| `/.well-known/security.txt` | Added | RFC 9116; Contact: info@ / incoming@ |
| `host-meta` / `host-meta.json` | **Not added** | XRD/JRD for WebFinger/OpenID federation — site has no federated identity or WebFinger endpoints; would be empty/misleading |

Middleware skips `/llms.txt`, `/humans.txt`, `/.well-known/*` (no locale redirect).

### JSON-LD Knowledge Graph

- `JsonLd` arrays emit a single `{ "@context", "@graph": [...] }` document.
- Stable `@id`s: Organization, WebSite, Logo ImageObject, Navigation, Destination, Tour, Branch, Offer, Service, Image, Collection.
- Cross-links: `publisher` / `about` / `provider` / `parentOrganization` / `isPartOf` / `hasPart` / `primaryImageOfPage` / `itinerary` / `areaServed` / `offers` → `@id`.
- Tour `Offer` extracted as sibling graph node via `expandTourGraphNodes`.

### sameAs Expansion

- Added verified Snapchat: `https://www.snapchat.com/add/zakher.travel`
- **Not added:** Tripadvisor (generic homepage, not a verified business profile), Telegram/WeChat (QR image paths, not public profile URLs)

### SearchAction & Navigation

- **Removed** artificial `SearchAction` (`?country=` filter is not a site search).
- **Added** `SiteNavigationElement` ItemList (`#main-navigation`) linked from WebSite `hasPart`.

### HTML Head Audit

- Removed per-page duplicate `metadataBase` and `theme-color` from `buildPageMetadata` (kept once in `rootMetadata`).
- OG image `alt` now uses page title instead of always `SITE_NAME`.

### Resource Hint Optimization

- Removed redundant `dns-prefetch` where `preconnect` already exists.
- Moved hero poster `preload` and Elfsight `preconnect` to **home page only** (were global).
- Kept global `preconnect` for Webflow CDN + GCS (used across media).
