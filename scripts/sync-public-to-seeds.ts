import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public", "i18n");
const seedsDir = path.join(root, "server", "prisma", "seeds");
const LOCALES = ["en", "az", "ru", "ar"] as const;

type SeedItem = { key: string; locale: string; value: string; namespace: string };

function toSeedItems(locale: string, dict: Record<string, string>): SeedItem[] {
  return Object.entries(dict).map(([key, value]) => ({
    key,
    locale,
    value,
    namespace: key.split(".")[0],
  }));
}

function main() {
  const combined: SeedItem[] = [];

  for (const locale of LOCALES) {
    const publicPath = path.join(publicDir, `${locale}.json`);
    if (!fs.existsSync(publicPath)) continue;

    const dict = JSON.parse(fs.readFileSync(publicPath, "utf8")) as Record<string, string>;
    const items = toSeedItems(locale, dict);
    combined.push(...items);

    fs.writeFileSync(path.join(seedsDir, `${locale}.json`), JSON.stringify(items, null, 2));
    console.log(`${locale}: ${items.length} keys synced to seeds/${locale}.json`);
  }

  fs.writeFileSync(path.join(seedsDir, "translations.json"), JSON.stringify(combined, null, 2));
  console.log(`Combined ${combined.length} items → seeds/translations.json`);
}

main();
