import fs from "fs";

const html = fs.readFileSync("tmp-uxoral.html", "utf8");

// Webflow embeds page interactions in script tags
const matches = [...html.matchAll(/<script[^>]*type="text\/javascript"[^>]*>([\s\S]*?)<\/script>/g)];
console.log("script blocks", matches.length);

for (const m of matches) {
  const body = m[1];
  if (body.includes("1b42a88d") || body.includes("mission") || body.includes("counter-wrap")) {
    console.log("HIT len", body.length);
    fs.writeFileSync("tmp-wf-interactions.js", body);
  }
}

// Also search inline data attributes animation style
const ids = [
  "1b42a88d-e9c5-49cc-dc2e-f060e6aa803b",
  "1b42a88d-e9c5-49cc-dc2e-f060e6aa804c",
  "1b42a88d-e9c5-49cc-dc2e-f060e6aa804d",
  "1b42a88d-e9c5-49cc-dc2e-f060e6aa8098",
  "1b42a88d-e9c5-49cc-dc2e-f060e6aa80da",
];

for (const id of ids) {
  const idx = html.indexOf(id);
  console.log(id.slice(-4), idx);
}

// Fetch chunk from cdn if webflow js url present
const jsUrls = [...html.matchAll(/src="(https:\/\/[^"]*webflow[^"]*\.js)"/g)].map((x) => x[1]);
console.log("js urls", jsUrls);
