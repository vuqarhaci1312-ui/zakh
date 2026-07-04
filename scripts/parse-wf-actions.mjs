import fs from "fs";

const js = fs.readFileSync("tmp-webflow.js", "utf8");

const missionIds = [
  "1b42a88d-e9c5-49cc-dc2e-f060e6aa803b",
  "1b42a88d-e9c5-49cc-dc2e-f060e6aa8048",
  "1b42a88d-e9c5-49cc-dc2e-f060e6aa804c",
  "1b42a88d-e9c5-49cc-dc2e-f060e6aa804d",
  "1b42a88d-e9c5-49cc-dc2e-f060e6aa8098",
  "1b42a88d-e9c5-49cc-dc2e-f060e6aa80da",
];

for (const id of missionIds) {
  let pos = 0;
  while (true) {
    const idx = js.indexOf(id, pos);
    if (idx === -1) break;
    const start = Math.max(0, idx - 400);
    const end = Math.min(js.length, idx + 800);
    console.log("\n===", id.slice(-4), "at", idx, "===");
    console.log(js.slice(start, end));
    pos = idx + 1;
  }
}

// Extract action lists a-16 through a-20
for (const action of ["a-16", "a-17", "a-18", "a-19", "a-20", "a-21", "a-22", "a-23", "a-24", "a-25"]) {
  const key = `"${action}":`;
  const idx = js.indexOf(key);
  if (idx === -1) continue;
  console.log("\n### ACTION", action);
  console.log(js.slice(idx, idx + 2500));
}
