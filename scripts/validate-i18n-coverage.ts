/**
 * Validates i18n coverage: T/Dt keys exist, extract gaps, hardcoded aria-labels, AZ quality.
 * Run: npx tsx scripts/validate-i18n-coverage.ts
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "src");
const enPath = path.join(root, "server", "prisma", "seeds", "en.json");
const azPath = path.join(root, "server", "prisma", "seeds", "az.json");
const ruPath = path.join(root, "server", "prisma", "seeds", "ru.json");
const arPath = path.join(root, "server", "prisma", "seeds", "ar.json");

type SeedItem = { key: string; locale: string; value: string; namespace: string };

const TRANSLATABLE_KEYS = new Set([
  "label",
  "title",
  "description",
  "name",
  "value",
  "body",
  "heading",
  "excerpt",
  "question",
  "answer",
  "beforeAccent",
  "accent",
  "afterAccent",
  "text",
  "badge",
  "titleAccent",
  "alt",
  "imageAlt",
  "username",
  "language",
  "address",
  "tagline",
  "subtitle",
  "eyebrow",
  "cta",
  "price",
  "category",
  "location",
  "duration",
  "groupSize",
  "season",
  "note",
  "summary",
  "caption",
  "role",
  "company",
  "eventTitle",
  "locationLabel",
  "iconAlt",
  "countriesTitle",
  "toursTitle",
]);

const SKIP_KEYS = new Set([
  "href",
  "src",
  "slug",
  "image",
  "poster",
  "flag",
  "avatar",
  "id",
  "type",
  "external",
  "platform",
  "splineUrl",
  "imageSrcSet",
  "video",
  "embed",
  "phone",
  "phones",
  "email",
  "whatsapp",
  "map",
  "cdn",
  "url",
  "link",
  "path",
  "icon",
  "images",
  "gallery",
  "metaImage",
  "heroImage",
  "since",
  "year",
  "count",
  "number",
  "width",
  "height",
]);

function walkExpectedKeys(obj: unknown, prefix: string, expected: Set<string>) {
  if (obj == null) return;

  if (typeof obj === "string") {
    const trimmed = obj.trim();
    if (trimmed.length >= 2 || /^[.,!?;:…]$/.test(trimmed)) {
      expected.add(prefix);
    }
    return;
  }

  if (Array.isArray(obj)) {
    obj.forEach((entry, index) => walkExpectedKeys(entry, `${prefix}.${index}`, expected));
    return;
  }

  if (typeof obj === "object") {
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (SKIP_KEYS.has(key)) continue;

      const nextPrefix = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "string" && TRANSLATABLE_KEYS.has(key)) {
        expected.add(nextPrefix);
      } else if (typeof value === "object") {
        walkExpectedKeys(value, nextPrefix, expected);
      }
    }
  }
}

function collectComponentKeys(dir: string, keys: Set<string>) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "admin" || entry.name === "edit-mode") continue;
      collectComponentKeys(fullPath, keys);
      continue;
    }

    if (!/\.(tsx|jsx)$/.test(entry.name)) continue;

    const content = fs.readFileSync(fullPath, "utf8");
    const patterns = [
      /\bk=["'`]([^"'`]+)["'`]/g,
      /\bk=\{[`"']([^`"']+)[`"']\}/g,
      /\bk=\{`([^`$]+)`\}/g,
    ];

    for (const pattern of patterns) {
      let match: RegExpExecArray | null;
      while ((match = pattern.exec(content)) !== null) {
        const key = match[1];
        if (key.includes("${")) continue;
        keys.add(key);
      }
    }
  }
}

function findHardcodedAriaLabels(dir: string, hits: string[]) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "admin" || entry.name === "edit-mode") continue;
      findHardcodedAriaLabels(fullPath, hits);
      continue;
    }

    if (!/\.(tsx|jsx)$/.test(entry.name)) continue;

    const lines = fs.readFileSync(fullPath, "utf8").split("\n");
    lines.forEach((line, index) => {
      if (/aria-label=["'][A-Z]/.test(line)) {
        hits.push(`${path.relative(root, fullPath)}:${index + 1}: ${line.trim()}`);
      }
    });
  }
}

async function collectDataExpectedKeys() {
  const expected = new Set<string>();

  const modules: { prefix: string; loader: () => Promise<Record<string, unknown>> }[] = [
    {
      prefix: "nav",
      loader: async () => {
        const m = await import("../src/components/Navigation/navigation-data.ts");
        return {
          pillLinks: m.NAV_PILL_LINKS,
          links: m.NAV_LINKS,
          mobileTabs: m.MOBILE_TABS,
        };
      },
    },
    {
      prefix: "branches",
      loader: async () => ({
        ...(await import("../src/components/OurBranches/branches-data.ts")),
        details: (await import("../src/components/OurBranches/branch-details-data.ts")).BRANCH_DETAILS,
      }),
    },
    {
      prefix: "stats",
      loader: async () => import("../src/components/WhyChooseUs/stats-data.ts"),
    },
    {
      prefix: "tourPackages",
      loader: async () => import("../src/components/TourPackages/tour-packages-data.ts"),
    },
    {
      prefix: "languages",
      loader: async () => {
        const m = await import("../src/lib/i18n/language-data.ts");
        return { list: m.LANGUAGES };
      },
    },
  ];

  for (const mod of modules) {
    const data = await mod.loader();
    walkExpectedKeys(data, mod.prefix, expected);
  }

  return expected;
}

async function main() {
  let failed = false;

  const enItems: SeedItem[] = JSON.parse(fs.readFileSync(enPath, "utf8"));
  const azItems: SeedItem[] = JSON.parse(fs.readFileSync(azPath, "utf8"));
  const ruItems: SeedItem[] = fs.existsSync(ruPath)
    ? JSON.parse(fs.readFileSync(ruPath, "utf8"))
    : [];
  const arItems: SeedItem[] = fs.existsSync(arPath)
    ? JSON.parse(fs.readFileSync(arPath, "utf8"))
    : [];
  const enKeys = new Set(enItems.map((item) => item.key));
  const azMap = new Map(azItems.map((item) => [item.key, item.value]));

  const componentKeys = new Set<string>();
  collectComponentKeys(path.join(srcDir, "components"), componentKeys);

  const missingInEn: string[] = [];
  const optionalEmptyKeys = new Set(["hero.headline.beforeAccent"]);

  for (const key of componentKeys) {
    if (optionalEmptyKeys.has(key)) continue;
    if (!enKeys.has(key)) {
      missingInEn.push(key);
    }
  }

  console.log(`\n1. Component T/Dt keys in en.json: ${missingInEn.length === 0 ? "OK" : "FAIL"}`);
  if (missingInEn.length) {
    failed = true;
    missingInEn.sort().forEach((key) => console.log(`   missing: ${key}`));
  } else {
    console.log(`   checked ${componentKeys.size} keys`);
  }

  const ariaHits: string[] = [];
  findHardcodedAriaLabels(path.join(srcDir, "components"), ariaHits);
  console.log(`\n2. Hardcoded aria-label (public components): ${ariaHits.length === 0 ? "OK" : "FAIL"}`);
  if (ariaHits.length) {
    failed = true;
    ariaHits.forEach((hit) => console.log(`   ${hit}`));
  }

  const expectedDataKeys = await collectDataExpectedKeys();
  const missingFromExtract: string[] = [];
  for (const key of expectedDataKeys) {
    if (!enKeys.has(key)) {
      missingFromExtract.push(key);
    }
  }

  console.log(`\n3. Data TRANSLATABLE fields in extract output: ${missingFromExtract.length === 0 ? "OK" : "FAIL"}`);
  if (missingFromExtract.length) {
    failed = true;
    missingFromExtract.sort().slice(0, 30).forEach((key) => console.log(`   missing: ${key}`));
    if (missingFromExtract.length > 30) {
      console.log(`   ... and ${missingFromExtract.length - 30} more`);
    }
  } else {
    console.log(`   checked ${expectedDataKeys.size} expected data keys`);
  }

  const emptyAz = azItems.filter((item) => !item.value.trim());
  const emptyRu = ruItems.filter((item) => !item.value.trim());
  const identicalAz = azItems.filter((item) => {
    const en = enItems.find((entry) => entry.key === item.key);
    return en && en.value.trim() === item.value.trim();
  });
  const identicalRu = ruItems.filter((item) => {
    const en = enItems.find((entry) => entry.key === item.key);
    return en && en.value.trim() === item.value.trim();
  });

  console.log(`\n4. AZ translation quality:`);
  console.log(`   empty AZ keys: ${emptyAz.length}`);
  console.log(`   AZ identical to EN: ${identicalAz.length}`);

  console.log(`\n5. RU translation quality:`);
  console.log(`   empty RU keys: ${emptyRu.length}`);
  console.log(`   RU identical to EN: ${identicalRu.length}`);

  if (emptyAz.length) {
    failed = true;
    emptyAz.slice(0, 10).forEach((item) => console.log(`   empty AZ: ${item.key}`));
  }

  if (emptyRu.length) {
    failed = true;
    emptyRu.slice(0, 10).forEach((item) => console.log(`   empty RU: ${item.key}`));
  }

  const missingRuInEn = enItems.filter((item) => !ruItems.some((ru) => ru.key === item.key));
  if (missingRuInEn.length) {
    failed = true;
    console.log(`\n6. RU coverage vs EN: FAIL (${missingRuInEn.length} keys missing)`);
    missingRuInEn.slice(0, 10).forEach((item) => console.log(`   missing RU: ${item.key}`));
  } else {
    console.log(`\n6. RU coverage vs EN: OK (${ruItems.length} keys)`);
  }

  const emptyAr = arItems.filter((item) => !item.value.trim());
  const identicalAr = arItems.filter((item) => {
    const en = enItems.find((entry) => entry.key === item.key);
    return en && en.value.trim() === item.value.trim();
  });

  console.log(`\n7. AR translation quality:`);
  console.log(`   empty AR keys: ${emptyAr.length}`);
  console.log(`   AR identical to EN: ${identicalAr.length}`);

  if (emptyAr.length) {
    failed = true;
    emptyAr.slice(0, 10).forEach((item) => console.log(`   empty AR: ${item.key}`));
  }

  const missingArInEn = enItems.filter((item) => !arItems.some((ar) => ar.key === item.key));
  if (missingArInEn.length) {
    failed = true;
    console.log(`\n8. AR coverage vs EN: FAIL (${missingArInEn.length} keys missing)`);
    missingArInEn.slice(0, 10).forEach((item) => console.log(`   missing AR: ${item.key}`));
  } else {
    console.log(`\n8. AR coverage vs EN: OK (${arItems.length} keys)`);
  }

  console.log(`\nSummary: EN=${enItems.length}, AZ=${azItems.length}, RU=${ruItems.length}, AR=${arItems.length}, component keys=${componentKeys.size}`);

  if (failed) {
    process.exit(1);
  }

  console.log("\nAll i18n coverage checks passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
