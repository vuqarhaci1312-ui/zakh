import fs from "fs";

const html = fs.readFileSync("tmp-uxoral.html", "utf8");
const id = "1b42a88d-e9c5-49cc-dc2e-f060e6aa804c";
let pos = 0;
while (true) {
  const idx = html.indexOf(id, pos);
  if (idx === -1) break;
  const start = Math.max(0, idx - 200);
  const end = Math.min(html.length, idx + 400);
  console.log("--- at", idx, "---");
  console.log(html.slice(start, end));
  pos = idx + 1;
}

const jsonMatch = html.match(/<script type="text\/json" data-wf-page[^>]*>([\s\S]*?)<\/script>/);
if (jsonMatch) {
  const data = JSON.parse(jsonMatch[1]);
  const dom = JSON.stringify(data);
  const hits = ["804d", "8098", "80da", "counter-wrap"];
  for (const h of hits) {
    const i = dom.indexOf(h);
    console.log(h, i > -1 ? "found" : "missing");
  }
  fs.writeFileSync("tmp-wf-page.json", JSON.stringify(data, null, 2));
  console.log("wrote tmp-wf-page.json");
}
