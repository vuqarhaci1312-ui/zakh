import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const eventsDir = path.join(root, "public", "events");

const FOLDER_TO_EVENT = {
  ATF2025: "event-17",
  ATM2024: "event-27",
  ATM2025: "event-13",
  EMITT2025: "event-12",
  GEORGIA2025: "event-16",
  "IBTM Barcelona 2025": "event-20",
  "IMEX Las Vegas 2025": "event-18",
  IMEXFRANKFURT2025: "event-14",
  ITBCHINA2025: "event-15",
  ITF2025: "event-09",
};

const imgExt = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);
const updates = {};

for (const [folder, eventId] of Object.entries(FOLDER_TO_EVENT)) {
  const dir = path.join(eventsDir, folder);
  const files = fs
    .readdirSync(dir)
    .filter((file) => imgExt.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  updates[eventId] = files.map(
    (file) => `/events/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`,
  );
}

const filePath = path.join(root, "src", "components", "OurEvents", "events-data.ts");
let content = fs.readFileSync(filePath, "utf8");

function setEventImages(source, eventId, images) {
  const regex = new RegExp(`("id": "${eventId}"[\\s\\S]*?"images": )\\[[\\s\\S]*?\\]`, "m");
  if (!regex.test(source)) {
    throw new Error(`Event not found: ${eventId}`);
  }

  const formatted = `[\n${images.map((url) => `      "${url}"`).join(",\n")}\n    ]`;
  return source.replace(regex, `$1${formatted}`);
}

for (const [eventId, images] of Object.entries(updates)) {
  content = setEventImages(content, eventId, images);
}

fs.writeFileSync(filePath, content);

for (const [eventId, images] of Object.entries(updates)) {
  console.log(`${eventId}: ${images.length} images`);
}
