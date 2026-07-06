/**
 * Translates en.json seed to a target locale via Google Cloud Translation API.
 * Run: node scripts/translate-with-gcp.mjs ru
 *      node scripts/translate-with-gcp.mjs az
 * Requires: gcloud auth application-default login OR GOOGLE_APPLICATION_CREDENTIALS
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROJECT = process.env.GCP_PROJECT ?? "elevenmedia-em-2026";
const BATCH = 50;
const targetLocale = (process.argv[2] ?? "az").toLowerCase();

const MANUAL_FILES = {
  az: "manual-az-overrides.json",
  ru: "manual-ru-overrides.json",
  ar: "manual-ar-overrides.json",
};

if (!MANUAL_FILES[targetLocale]) {
  console.error(`Unsupported locale: ${targetLocale}. Use one of: ${Object.keys(MANUAL_FILES).join(", ")}`);
  process.exit(1);
}

function getAccessToken() {
  return execSync("gcloud auth print-access-token", { encoding: "utf8" }).trim();
}

async function translateBatch(texts, token) {
  const res = await fetch(
    `https://translation.googleapis.com/v3/projects/${PROJECT}/locations/global:translateText`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "x-goog-user-project": PROJECT,
      },
      body: JSON.stringify({
        contents: texts,
        targetLanguageCode: targetLocale,
        sourceLanguageCode: "en",
        mimeType: "text/plain",
      }),
    },
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Translate API ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.translations.map((t) => t.translatedText);
}

async function main() {
  execSync(`gcloud services enable translate.googleapis.com --project=${PROJECT} --quiet`, {
    stdio: "inherit",
  });

  const enItems = JSON.parse(
    fs.readFileSync(path.join(root, "server/prisma/seeds/en.json"), "utf8"),
  );

  const token = getAccessToken();
  const translatedDict = {};
  const manualPath = path.join(root, "scripts", MANUAL_FILES[targetLocale]);
  const manual = fs.existsSync(manualPath)
    ? JSON.parse(fs.readFileSync(manualPath, "utf8"))
    : {};

  for (let i = 0; i < enItems.length; i += BATCH) {
    const batch = enItems.slice(i, i + BATCH);
    const toTranslate = [];
    const indices = [];

    for (let j = 0; j < batch.length; j++) {
      const item = batch[j];
      if (Object.prototype.hasOwnProperty.call(manual, item.key)) {
        translatedDict[item.key] = manual[item.key];
      } else {
        toTranslate.push(item.value);
        indices.push(j);
      }
    }

    if (toTranslate.length) {
      const translated = await translateBatch(toTranslate, token);
      translated.forEach((text, idx) => {
        translatedDict[batch[indices[idx]].key] = text;
      });
    }

    console.log(`Translated ${Math.min(i + BATCH, enItems.length)} / ${enItems.length}`);
    await new Promise((r) => setTimeout(r, 200));
  }

  const localeItems = enItems.map((item) => ({
    key: item.key,
    locale: targetLocale,
    value: translatedDict[item.key] ?? item.value,
    namespace: item.namespace,
  }));

  for (const [key, value] of Object.entries(manual)) {
    if (!localeItems.some((item) => item.key === key)) {
      localeItems.push({
        key,
        locale: targetLocale,
        value,
        namespace: key.split(".")[0] ?? "general",
      });
    }
  }

  const seedsDir = path.join(root, "server/prisma/seeds");
  fs.writeFileSync(
    path.join(seedsDir, `${targetLocale}.json`),
    JSON.stringify(localeItems, null, 2),
  );

  console.log(`Done. ${targetLocale.toUpperCase()} seed → server/prisma/seeds/${targetLocale}.json`);
}

main().catch(console.error);
