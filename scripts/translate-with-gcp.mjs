/**
 * Translates en.json to professional AZ using Google Cloud Translation API.
 * Run: node scripts/translate-with-gcp.mjs
 * Requires: gcloud auth application-default login OR GOOGLE_APPLICATION_CREDENTIALS
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROJECT = process.env.GCP_PROJECT ?? "elevenmedia-em-2026";
const BATCH = 50;

function getAccessToken() {
  return execSync("gcloud auth print-access-token", { encoding: "utf8" }).trim();
}

async function translateBatch(texts, token) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=`;
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
        targetLanguageCode: "az",
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
  const azDict = {};
  const manualPath = path.join(root, "scripts/manual-az-overrides.json");
  const manual = fs.existsSync(manualPath)
    ? JSON.parse(fs.readFileSync(manualPath, "utf8"))
    : {};

  for (let i = 0; i < enItems.length; i += BATCH) {
    const batch = enItems.slice(i, i + BATCH);
    const toTranslate = [];
    const indices = [];

    for (let j = 0; j < batch.length; j++) {
      const item = batch[j];
      if (manual[item.key]) {
        azDict[item.key] = manual[item.key];
      } else {
        toTranslate.push(item.value);
        indices.push(j);
      }
    }

    if (toTranslate.length) {
      const translated = await translateBatch(toTranslate, token);
      translated.forEach((text, idx) => {
        azDict[batch[indices[idx]].key] = text;
      });
    }

    console.log(`Translated ${Math.min(i + BATCH, enItems.length)} / ${enItems.length}`);
    await new Promise((r) => setTimeout(r, 200));
  }

  const azItems = enItems.map((item) => ({
    key: item.key,
    locale: "az",
    value: azDict[item.key] ?? item.value,
    namespace: item.namespace,
  }));

  for (const [key, value] of Object.entries(manual)) {
    if (!azItems.some((item) => item.key === key)) {
      azItems.push({
        key,
        locale: "az",
        value,
        namespace: key.split(".")[0] ?? "general",
      });
    }
  }

  const seedsDir = path.join(root, "server/prisma/seeds");
  fs.writeFileSync(path.join(seedsDir, "az.json"), JSON.stringify(azItems, null, 2));

  const dict = Object.fromEntries(azItems.map((i) => [i.key, i.value]));
  fs.mkdirSync(path.join(root, "public/i18n"), { recursive: true });
  fs.writeFileSync(path.join(root, "public/i18n/az.json"), JSON.stringify(dict));

  const enDict = Object.fromEntries(enItems.map((i) => [i.key, i.value]));
  fs.writeFileSync(path.join(root, "public/i18n/en.json"), JSON.stringify(enDict));

  const combined = [...enItems, ...azItems];
  fs.writeFileSync(path.join(seedsDir, "translations.json"), JSON.stringify(combined, null, 2));

  console.log("Done. AZ dictionary written to public/i18n/az.json");
}

main().catch(console.error);
