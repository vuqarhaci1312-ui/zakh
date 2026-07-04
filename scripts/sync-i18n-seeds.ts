/**
 * Merges locale seed files into translations.json and public/i18n/*.json
 * Run: npx tsx scripts/sync-i18n-seeds.ts
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const seedsDir = path.join(root, "server", "prisma", "seeds");
const publicDir = path.join(root, "public", "i18n");

type SeedItem = { key: string; locale: string; value: string; namespace: string };

const LOCALES = ["en", "az", "ru", "ar"] as const;

function readSeed(locale: string): SeedItem[] {
  const filePath = path.join(seedsDir, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as SeedItem[];
}

function main() {
  const combined: SeedItem[] = [];

  for (const locale of LOCALES) {
    const items = readSeed(locale);
    if (!items.length && locale !== "en") {
      console.warn(`Warning: no seed file for ${locale}`);
      continue;
    }
    combined.push(...items);

    const dict = Object.fromEntries(items.map((item) => [item.key, item.value]));
    fs.mkdirSync(publicDir, { recursive: true });
    fs.writeFileSync(path.join(publicDir, `${locale}.json`), JSON.stringify(dict));
    console.log(`${locale}: ${items.length} keys → public/i18n/${locale}.json`);
  }

  fs.writeFileSync(path.join(seedsDir, "translations.json"), JSON.stringify(combined, null, 2));
  console.log(`Combined ${combined.length} items → server/prisma/seeds/translations.json`);
}

main();
