import fs from "fs";
import path from "path";

const COUNT_UPDATES = {
  "stats.STAT_CARDS.0.count": "2100",
  "stats.STAT_CARDS.1.count": "10",
  "stats.STAT_CARDS.2.count": "400",
  "stats.STAT_CARDS.3.count": "60000",
  "stats.STAT_CARDS.4.count": "60",
};

const flatFiles = [
  "public/i18n/en.json",
  "public/i18n/az.json",
  "public/i18n/ru.json",
  "public/i18n/ar.json",
];

for (const file of flatFiles) {
  const fullPath = path.resolve(file);
  const data = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  for (const [key, value] of Object.entries(COUNT_UPDATES)) {
    data[key] = value;
  }
  fs.writeFileSync(fullPath, JSON.stringify(data));
  console.log("updated", file);
}

const seedFlatFiles = [
  "server/prisma/seeds/en.json",
  "server/prisma/seeds/az.json",
  "server/prisma/seeds/ru.json",
  "server/prisma/seeds/ar.json",
];

for (const file of seedFlatFiles) {
  const fullPath = path.resolve(file);
  const data = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  for (const [key, value] of Object.entries(COUNT_UPDATES)) {
    if (key in data) data[key] = value;
  }
  fs.writeFileSync(fullPath, JSON.stringify(data));
  console.log("updated", file);
}

const translationsPath = path.resolve("server/prisma/seeds/translations.json");
const translations = JSON.parse(fs.readFileSync(translationsPath, "utf8"));
let changed = 0;
for (const entry of translations) {
  if (entry.key in COUNT_UPDATES) {
    entry.value = COUNT_UPDATES[entry.key];
    changed++;
  }
}
fs.writeFileSync(translationsPath, JSON.stringify(translations, null, 2));
console.log("updated translations.json entries:", changed);
