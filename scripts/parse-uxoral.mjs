import fs from "fs";

const html = fs.readFileSync("tmp-uxoral.html", "utf8");
const marker = "We Strive to Innovate";
const idx = html.indexOf(marker);
const sectionStart = html.lastIndexOf("<section", idx);
const gridEnd = html.indexOf("</div></div></div></section>", html.indexOf("mission-grid", idx));
const chunk = html.slice(sectionStart, gridEnd + 30);
fs.writeFileSync("tmp-uxoral-mission.html", chunk);
console.log("length", chunk.length);
