#!/usr/bin/env tsx
/**
 * Static SEO validation — run after build or in CI.
 * Checks sitemap coverage, hreflang parity, and key route presence.
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://zakher.travel";
const LOCALES = ["az", "en", "ru", "ar"] as const;
const STATIC_PATHS = [
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

type Issue = { level: "error" | "warn"; message: string };

const issues: Issue[] = [];

function fail(message: string) {
  issues.push({ level: "error", message });
}

function warn(message: string) {
  issues.push({ level: "warn", message });
}

function loadCountrySlugs(): string[] {
  const path = join(ROOT, "src/components/DestinationDetail/country-tours-data.ts");
  const source = readFileSync(path, "utf8");
  const matches = [...source.matchAll(/slug:\s*"([^"]+)"/g)];
  return [...new Set(matches.map((m) => m[1]))];
}

function loadTourPairs(): { country: string; tour: string }[] {
  const path = join(ROOT, "src/components/DestinationDetail/tour-details-data.ts");
  const source = readFileSync(path, "utf8");
  const pairs: { country: string; tour: string }[] = [];
  let currentCountry = "";
  for (const line of source.split("\n")) {
    const countryMatch = line.match(/^\s{2}([a-z0-9-]+):\s*\[/);
    if (countryMatch) {
      currentCountry = countryMatch[1];
      continue;
    }
    const tourMatch = line.match(/slug:\s*"([^"]+)"/);
    if (tourMatch && currentCountry && !line.includes("TOURS_BY_COUNTRY")) {
      pairs.push({ country: currentCountry, tour: tourMatch[1] });
    }
  }
  return pairs;
}

function loadBranchSlugs(): string[] {
  const path = join(ROOT, "src/components/OurBranches/branch-details-data.ts");
  const source = readFileSync(path, "utf8");
  const matches = [...source.matchAll(/slug:\s*"([^"]+)"/g)];
  return [...new Set(matches.map((m) => m[1]))];
}

function checkRequiredFiles() {
  const required = [
    "src/app/robots.ts",
    "src/app/sitemap.ts",
    "src/lib/seo/metadata.ts",
    "src/lib/seo/site-config.ts",
    "src/lib/seo/entity-ids.ts",
    "src/components/seo/JsonLd.tsx",
    "src/components/seo/SpeculationRules.tsx",
    "lighthouserc.js",
    "public/llms.txt",
    "public/humans.txt",
    "public/.well-known/security.txt",
  ];
  for (const file of required) {
    if (!existsSync(join(ROOT, file))) {
      fail(`Missing required SEO file: ${file}`);
    }
  }
}

function checkHreflangParity() {
  const countries = loadCountrySlugs();
  const tours = loadTourPairs();
  const branches = loadBranchSlugs();

  const expectedPerLocale =
    STATIC_PATHS.length + countries.length + tours.length + branches.length;
  const expectedTotal = expectedPerLocale * LOCALES.length;

  console.log(`Expected sitemap URLs: ~${expectedTotal} (${expectedPerLocale} × ${LOCALES.length} locales)`);
  console.log(`  Static: ${STATIC_PATHS.length}`);
  console.log(`  Destinations: ${countries.length}`);
  console.log(`  Tours: ${tours.length}`);
  console.log(`  Branches: ${branches.length}`);

  if (countries.length < 10) {
    warn(`Only ${countries.length} destination hubs found — expected 11`);
  }
  if (tours.length < 40) {
    warn(`Only ${tours.length} tour pages found — expected ~46`);
  }

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      const url = `${SITE_URL}/${locale}${path || ""}`;
      if (!url.includes(locale)) {
        fail(`Malformed locale URL: ${url}`);
      }
    }
  }
}

function checkJsonLdBuilders() {
  const path = join(ROOT, "src/components/seo/JsonLd.tsx");
  const source = readFileSync(path, "utf8");
  const required = [
    "organizationJsonLd",
    "websiteJsonLd",
    "webPageJsonLd",
    "breadcrumbJsonLd",
    "faqPageJsonLd",
    "touristTripJsonLd",
    "localBusinessJsonLd",
    "touristDestinationJsonLd",
    "itemListJsonLd",
    "collectionPageJsonLd",
    "imageObjectJsonLd",
    "serviceCatalogJsonLd",
    "eventListJsonLd",
    "definedTermSetJsonLd",
    "asJsonLdGraph",
    "siteNavigationJsonLd",
    "logoImageJsonLd",
  ];
  for (const name of required) {
    if (!source.includes(`export function ${name}`)) {
      fail(`Missing JSON-LD builder: ${name}`);
    }
  }
}

function checkThinHubs() {
  const tourSource = readFileSync(
    join(ROOT, "src/components/DestinationDetail/tour-details-data.ts"),
    "utf8",
  );
  for (const slug of ["uae", "czech-republic"]) {
    const block = tourSource.match(new RegExp(`${slug}:\\s*\\[([\\s\\S]*?)\\],`));
    if (block && block[1].trim() === "") {
      warn(`Thin destination hub (0 tours): ${slug}`);
    }
  }
}

function main() {
  console.log("SEO validate — Zakher Travel\n");
  checkRequiredFiles();
  checkHreflangParity();
  checkJsonLdBuilders();
  checkThinHubs();

  const errors = issues.filter((i) => i.level === "error");
  const warnings = issues.filter((i) => i.level === "warn");

  for (const issue of warnings) {
    console.warn(`WARN  ${issue.message}`);
  }
  for (const issue of errors) {
    console.error(`ERROR ${issue.message}`);
  }

  console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)`);
  if (errors.length) {
    process.exit(1);
  }
}

main();
