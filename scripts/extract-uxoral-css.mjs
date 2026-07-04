import fs from "fs";

const css = fs.readFileSync("tmp-uxoral.css", "utf8");

const selectors = [
  ":root",
  ".section",
  ".w-layout-blockcontainer",
  ".container",
  ".w-container",
  ".inner-wrappar",
  ".space-xxxl",
  ".misson-top-wrappar",
  ".services-header-left",
  ".font-size-xsm",
  ".highlight-text",
  ".heading-style-h2",
  ".font-size-sm",
  ".max-width-29",
  ".text-span-2",
  ".spacing-md",
  ".misson-right",
  ".btn-primary",
  ".button-arrow-main",
  ".spacing-20xl",
  ".mission-grid",
  ".mission-contain-card",
  ".mission-top-card",
  ".top-card-item",
  ".image-wrapper",
  ".reviewer-img",
  ".top-content",
  ".contain-bottom-card",
  ".bottom-top-contant",
  ".inverted-comma",
  ".font-size-base",
  ".satisfication-percentise",
  ".robot-image-wrapper",
  ".robot-image",
  ".counter-main",
  ".card-icon-wrap",
  ".card-icon",
  ".counter-wrapper-main",
  ".svg-3",
  ".arrow-wrapper",
  ".arrow-icon",
  ".counter-value",
  ".counter-item",
  ".counter-text",
  ".counter-col",
  ".counter-wrap",
  ".w-layout-grid",
];

function extractRule(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`${escaped}[^{]*\\{[^}]*\\}`, "g");
  return css.match(re) ?? [];
}

const out = [];
for (const sel of selectors) {
  out.push(...extractRule(sel));
}

// media queries containing mission/counter/misson
const mediaBlocks = css.match(/@media[^{]+\{[\s\S]*?\n\}/g) ?? [];
for (const block of mediaBlocks) {
  if (/mission|misson|counter-col|contain-bottom|robot-image|reviewer-img/.test(block)) {
    out.push(block);
  }
}

fs.writeFileSync("src/styles/uxoral-mission.extracted.css", [...new Set(out)].join("\n\n"));
console.log("rules", out.length);
