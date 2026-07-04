import fs from "fs";
import path from "path";

const COUNT_UPDATES = {
  "stats.STAT_CARDS.0.count": "2100",
  "stats.STAT_CARDS.1.count": "10",
  "stats.STAT_CARDS.2.count": "400",
  "stats.STAT_CARDS.3.count": "60000",
  "stats.STAT_CARDS.4.count": "60",
};

const seedFiles = [
  "server/prisma/seeds/en.json",
  "server/prisma/seeds/az.json",
  "server/prisma/seeds/ru.json",
  "server/prisma/seeds/ar.json",
];

for (const file of seedFiles) {
  const fullPath = path.resolve(file);
  const data = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  let changed = 0;

  for (const entry of data) {
    if (entry.key in COUNT_UPDATES) {
      entry.value = COUNT_UPDATES[entry.key];
      changed++;
    }
  }

  fs.writeFileSync(fullPath, JSON.stringify(data));
  console.log(file, "entries updated:", changed);
}
