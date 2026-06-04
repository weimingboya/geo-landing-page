const fs = require("node:fs");
const assert = require("node:assert");

const html = fs.readFileSync("index.html", "utf8");
const js = fs.readFileSync("script.js", "utf8");

[
  "diagnosis-form",
  "website-input",
  "website-error",
  "preview-score",
  "preview-risk",
  "recommendation-list",
  "hero-report-cta",
  "preview-report-cta",
  "lead-form",
  "lead-success",
].forEach((id) => {
  assert(html.includes(`id="${id}"`), `Missing #${id}`);
});

[
  "function normalizeDomain",
  "function isLikelyDomain",
  "function buildDiagnosis",
  "function renderDiagnosis",
  "function scrollToLeadForm",
  "window.geoLandingPage",
].forEach((needle) => {
  assert(js.includes(needle), `Missing JS hook: ${needle}`);
});

assert(js.includes("请先输入公司官网。"), "Missing empty URL validation message");
assert(js.includes("已收到你的申请"), "Missing lead success message");

console.log("Smoke checks passed");
