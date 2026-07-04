import fs from "fs";

const js = fs.readFileSync("tmp-webflow.js", "utf8");
const start = js.indexOf('"a-12":{');
let depth = 0;
let end = start;
for (let i = start; i < js.length; i++) {
  if (js[i] === "{") depth++;
  if (js[i] === "}") {
    depth--;
    if (depth === 0) {
      end = i + 1;
      break;
    }
  }
}
console.log(js.slice(start, end));

// find events using a-12
let pos = 0;
while (true) {
  const idx = js.indexOf("actionListId:\"a-12\"", pos);
  if (idx === -1) break;
  console.log("\n--- trigger ---");
  console.log(js.slice(idx - 500, idx + 300));
  pos = idx + 1;
}
