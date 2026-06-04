# GEO Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished customer-facing GEO marketing landing page with an instant diagnosis preview and full report lead capture flow.

**Architecture:** Implement a dependency-free static frontend so the page can run in an empty workspace without package installation. `index.html` owns semantic content, `styles.css` owns responsive visual design, `script.js` owns URL validation, deterministic preview generation, CTA scrolling, and form success state.

**Tech Stack:** HTML, CSS, vanilla JavaScript, optional local static server via `python3 -m http.server`.

---

## File Structure

- Create `index.html`: single-page landing page markup, sections, form fields, and accessible IDs/classes.
- Create `styles.css`: professional B2B styling, responsive layout, diagnosis card, forms, FAQ, and mobile breakpoints.
- Create `script.js`: frontend-only interaction logic for diagnosis preview and lead form.
- Create `tests/smoke.test.js`: Node-based smoke checks for required DOM hooks and expected JavaScript functions.
- Keep `docs/superpowers/specs/2026-06-03-geo-landing-page-design.md`: approved spec, no implementation edits required.

## Task 1: Static Page Skeleton

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `script.js`
- Create: `tests/smoke.test.js`

- [ ] **Step 1: Create minimal HTML, CSS, and JS files**

Create `index.html` with the full page landmarks and required DOM hooks:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>GEO 诊断报告 | 生成式搜索优化</title>
    <meta name="description" content="输入官网，获取 GEO 可见度诊断预览，并申请完整版 GEO 诊断报告。">
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="#top" aria-label="GEO 诊断首页">GEO Audit</a>
      <nav class="nav" aria-label="页面导航">
        <a href="#why-geo">为什么需要 GEO</a>
        <a href="#coverage">报告内容</a>
        <a href="#report-form">获取报告</a>
      </nav>
    </header>

    <main id="top">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-copy">
          <p class="eyebrow">Generative Engine Optimization</p>
          <h1 id="hero-title">看看你的品牌是否正在被 AI 搜索看见</h1>
          <p class="hero-text">输入官网，立即查看一份 GEO 可见度诊断预览。我们会从 AI 引用机会、品牌实体清晰度、内容可回答性和竞品差距判断你的增长缺口。</p>
          <form id="diagnosis-form" class="diagnosis-form" novalidate>
            <label for="website-input">公司官网</label>
            <div class="input-row">
              <input id="website-input" name="website" type="text" autocomplete="url" placeholder="例如 example.com">
              <button type="submit">生成诊断预览</button>
            </div>
            <p id="website-error" class="field-error" aria-live="polite"></p>
          </form>
          <div class="hero-actions">
            <a class="text-link" href="#coverage">查看诊断维度</a>
            <button id="hero-report-cta" class="ghost-button" type="button">获取完整版报告</button>
          </div>
        </div>

        <aside class="diagnosis-card" aria-live="polite" aria-labelledby="preview-title">
          <div class="card-topline">
            <span id="preview-domain">等待输入官网</span>
            <span id="preview-risk" class="risk-tag neutral">未诊断</span>
          </div>
          <h2 id="preview-title">GEO 诊断预览</h2>
          <div class="score-row">
            <strong id="preview-score">--</strong>
            <span>GEO 可见度评分</span>
          </div>
          <div class="score-bar" aria-hidden="true">
            <span id="preview-bar"></span>
          </div>
          <ul class="metric-list">
            <li><span>AI 引用准备度</span><strong id="metric-citation">待检测</strong></li>
            <li><span>品牌实体清晰度</span><strong id="metric-entity">待检测</strong></li>
            <li><span>内容可信度缺口</span><strong id="metric-trust">待检测</strong></li>
          </ul>
          <div>
            <h3>优先建议</h3>
            <ul id="recommendation-list" class="recommendation-list">
              <li>输入官网后生成诊断预览。</li>
            </ul>
          </div>
          <button id="preview-report-cta" class="primary-button" type="button">获取完整版 GEO 诊断报告</button>
        </aside>
      </section>

      <section id="why-geo" class="section">
        <div class="section-heading">
          <p class="eyebrow">Why GEO</p>
          <h2>传统 SEO 排名，不等于 AI 答案里的品牌可见度</h2>
          <p>生成式搜索会直接总结答案、引用来源、推荐品牌。GEO 帮助你的内容更容易被 AI 理解、信任和引用。</p>
        </div>
      </section>

      <section id="coverage" class="section">
        <div class="section-heading">
          <p class="eyebrow">Report Coverage</p>
          <h2>完整版报告会诊断什么</h2>
          <p>报告覆盖从品牌实体到内容结构的关键可见度信号。</p>
        </div>
      </section>

      <section id="report-form" class="section lead-section">
        <div class="section-heading">
          <p class="eyebrow">Full Report</p>
          <h2>获取完整版 GEO 诊断报告</h2>
          <p>留下联系方式，我们会基于你的官网信息整理完整诊断建议。</p>
        </div>
        <form id="lead-form" class="lead-form" novalidate>
          <label for="lead-name">姓名</label>
          <input id="lead-name" name="name" type="text" autocomplete="name" required>
          <label for="lead-company">公司</label>
          <input id="lead-company" name="company" type="text" autocomplete="organization" required>
          <label for="lead-contact">邮箱或电话</label>
          <input id="lead-contact" name="contact" type="text" autocomplete="email" required>
          <label for="lead-website">官网</label>
          <input id="lead-website" name="website" type="text" autocomplete="url" required>
          <label for="lead-note">补充说明</label>
          <textarea id="lead-note" name="note" rows="4"></textarea>
          <p id="lead-error" class="field-error" aria-live="polite"></p>
          <button type="submit" class="primary-button">提交并获取报告</button>
          <p id="lead-success" class="success-message" aria-live="polite"></p>
        </form>
      </section>

      <section class="section faq-section" aria-labelledby="faq-title">
        <div class="section-heading">
          <p class="eyebrow">FAQ</p>
          <h2 id="faq-title">常见问题</h2>
        </div>
      </section>
    </main>

    <script src="script.js"></script>
  </body>
</html>
```

Create `styles.css` with a minimal reset and visible layout shell:

```css
:root {
  color-scheme: light;
  font-family: Inter, "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
  color: #17201b;
  background: #f7f8f4;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #f7f8f4;
}

.site-header,
.hero,
.section {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
}

.site-header {
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand,
.nav a,
.text-link {
  color: inherit;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 22px;
  font-size: 14px;
}

.hero {
  min-height: calc(100vh - 72px);
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
  gap: 48px;
  align-items: center;
  padding: 48px 0 72px;
}

.eyebrow {
  margin: 0 0 12px;
  color: #1f6f61;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  overflow-wrap: anywhere;
}

h1 {
  margin: 0;
  max-width: 760px;
  font-size: clamp(40px, 7vw, 76px);
  line-height: 1.02;
  letter-spacing: 0;
}

.hero-text,
.section-heading p {
  color: #475467;
  line-height: 1.7;
}

.diagnosis-card,
.lead-form {
  background: #ffffff;
  border: 1px solid #dde5df;
  border-radius: 8px;
  padding: 24px;
}
```

Create `script.js` with a placeholder readiness marker:

```js
(() => {
  const app = {
    initialized: true,
  };

  window.geoLandingPage = app;
})();
```

- [ ] **Step 2: Add smoke test for required hooks**

Create `tests/smoke.test.js`:

```js
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

assert(js.includes("window.geoLandingPage"), "Missing global readiness marker");

console.log("Smoke checks passed");
```

- [ ] **Step 3: Run smoke test**

Run: `node tests/smoke.test.js`

Expected: `Smoke checks passed`

## Task 2: Complete Landing Page Content

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add problem cards, report coverage cards, process strip, and FAQ details**

Replace the simple `#why-geo`, `#coverage`, and FAQ sections in `index.html` with:

```html
<section id="why-geo" class="section">
  <div class="section-heading">
    <p class="eyebrow">Why GEO</p>
    <h2>传统 SEO 排名，不等于 AI 答案里的品牌可见度</h2>
    <p>生成式搜索会直接总结答案、引用来源、推荐品牌。GEO 帮助你的内容更容易被 AI 理解、信任和引用。</p>
  </div>
  <div class="insight-grid">
    <article class="insight-card">
      <span>01</span>
      <h3>AI 会重组用户入口</h3>
      <p>客户不一定再点击搜索结果页，而是在 AI 答案里直接看到品牌、观点和推荐来源。</p>
    </article>
    <article class="insight-card">
      <span>02</span>
      <h3>排名高不代表会被引用</h3>
      <p>页面如果缺少清晰结构、可信来源和答案型表达，AI 可能读得到却不愿意引用。</p>
    </article>
    <article class="insight-card">
      <span>03</span>
      <h3>品牌实体需要更清楚</h3>
      <p>业务范围、产品能力、行业定位和权威证明越明确，越容易被模型识别成可靠答案。</p>
    </article>
  </div>
</section>

<section id="coverage" class="section">
  <div class="section-heading">
    <p class="eyebrow">Report Coverage</p>
    <h2>完整版报告会诊断什么</h2>
    <p>报告覆盖从品牌实体到内容结构的关键可见度信号，并给出优先级明确的优化路线。</p>
  </div>
  <div class="coverage-grid">
    <article><h3>AI 可见度机会</h3><p>判断品牌是否容易出现在生成式答案、推荐列表和引用来源中。</p></article>
    <article><h3>品牌实体清晰度</h3><p>检查官网是否清楚表达品牌、产品、行业、服务地区和差异化能力。</p></article>
    <article><h3>内容可回答性</h3><p>识别哪些页面缺少直接回答、定义、对比、步骤和场景化说明。</p></article>
    <article><h3>技术可发现性</h3><p>评估基础结构、语义标签和结构化信息是否支持机器理解。</p></article>
    <article><h3>可信度信号</h3><p>检查案例、作者、来源、数据、资质和外部证明是否足够支撑引用。</p></article>
    <article><h3>竞品差距</h3><p>对比同类品牌在 AI 搜索语境中的内容覆盖和引用机会。</p></article>
  </div>
  <div class="process-strip">
    <div><strong>1</strong><span>输入官网</span></div>
    <div><strong>2</strong><span>查看预览</span></div>
    <div><strong>3</strong><span>提交信息</span></div>
    <div><strong>4</strong><span>获得报告</span></div>
  </div>
</section>

<section class="section faq-section" aria-labelledby="faq-title">
  <div class="section-heading">
    <p class="eyebrow">FAQ</p>
    <h2 id="faq-title">常见问题</h2>
  </div>
  <div class="faq-list">
    <details open>
      <summary>GEO 是什么？</summary>
      <p>GEO 是生成式搜索优化，关注品牌如何被 AI 搜索、问答系统和答案引擎理解、引用和推荐。</p>
    </details>
    <details>
      <summary>GEO 和 SEO 有什么不同？</summary>
      <p>SEO 更关注搜索结果排名和点击，GEO 更关注内容是否能被模型理解为可信答案，并在生成式回复中出现。</p>
    </details>
    <details>
      <summary>诊断报告包含什么？</summary>
      <p>报告包含 GEO 可见度评分、内容结构问题、品牌实体信号、可信度缺口、竞品差距和优先优化建议。</p>
    </details>
    <details>
      <summary>多久能收到完整版报告？</summary>
      <p>提交信息后，我们会在 1-2 个工作日内联系你确认需求，并发送适合你业务场景的诊断建议。</p>
    </details>
    <details>
      <summary>一定需要技术改造吗？</summary>
      <p>不一定。很多 GEO 改进可以先从内容结构、页面表达、案例证明和品牌实体信息开始。</p>
    </details>
    <details>
      <summary>适合哪些公司？</summary>
      <p>适合希望通过 AI 搜索、内容营销、行业问答和品牌推荐获得更多客户线索的 B2B 或高客单业务。</p>
    </details>
  </div>
</section>
```

- [ ] **Step 2: Run smoke test**

Run: `node tests/smoke.test.js`

Expected: `Smoke checks passed`

## Task 3: Responsive Visual Design

**Files:**
- Modify: `styles.css`

- [ ] **Step 1: Replace `styles.css` with complete styling**

Use this full stylesheet:

```css
:root {
  color-scheme: light;
  --ink: #17201b;
  --muted: #5f6f66;
  --line: #dce5df;
  --paper: #ffffff;
  --wash: #f7f8f4;
  --accent: #1f6f61;
  --accent-dark: #155348;
  --warning: #c75c1b;
  --soft: #eef4ef;
  font-family: Inter, "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
  color: var(--ink);
  background: var(--wash);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background:
    linear-gradient(135deg, rgba(31, 111, 97, 0.09), transparent 34%),
    linear-gradient(225deg, rgba(199, 92, 27, 0.08), transparent 30%),
    var(--wash);
}

button,
input,
textarea {
  font: inherit;
}

.site-header,
.hero,
.section {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
}

.site-header {
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  color: var(--ink);
  text-decoration: none;
  font-weight: 800;
}

.nav {
  display: flex;
  gap: 22px;
  font-size: 14px;
}

.nav a,
.text-link {
  color: var(--muted);
  text-decoration: none;
}

.nav a:hover,
.text-link:hover {
  color: var(--accent);
}

.hero {
  min-height: calc(100vh - 72px);
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
  gap: 48px;
  align-items: center;
  padding: 48px 0 72px;
}

.eyebrow {
  margin: 0 0 12px;
  color: var(--accent);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1,
h2,
h3,
p,
summary,
label,
button,
input,
textarea {
  overflow-wrap: anywhere;
}

h1 {
  margin: 0;
  max-width: 760px;
  font-size: clamp(40px, 7vw, 76px);
  line-height: 1.02;
  letter-spacing: 0;
}

h2 {
  margin: 0;
  font-size: clamp(28px, 4vw, 46px);
  line-height: 1.12;
  letter-spacing: 0;
}

h3 {
  margin: 0 0 10px;
  font-size: 18px;
  line-height: 1.25;
}

.hero-text,
.section-heading p,
.insight-card p,
.coverage-grid p,
.faq-list p {
  color: var(--muted);
  line-height: 1.7;
}

.hero-text {
  max-width: 680px;
  font-size: 18px;
}

.diagnosis-form {
  margin-top: 28px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 700;
}

.input-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
}

input,
textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
  color: var(--ink);
  padding: 13px 14px;
  outline: none;
}

input:focus,
textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(31, 111, 97, 0.16);
}

button,
.primary-button,
.ghost-button {
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 800;
}

.input-row button,
.primary-button {
  background: var(--accent);
  color: #fff;
  padding: 13px 18px;
}

.input-row button:hover,
.primary-button:hover {
  background: var(--accent-dark);
}

.ghost-button {
  background: transparent;
  border: 1px solid var(--line);
  color: var(--ink);
  padding: 11px 15px;
}

.hero-actions {
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.field-error {
  min-height: 22px;
  margin: 8px 0 0;
  color: #b42318;
  font-size: 14px;
}

.success-message {
  margin: 12px 0 0;
  color: var(--accent-dark);
  font-weight: 700;
}

.diagnosis-card,
.lead-form,
.insight-card,
.coverage-grid article,
.faq-list details {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: 0 18px 60px rgba(23, 32, 27, 0.08);
}

.diagnosis-card {
  padding: 26px;
}

.card-topline,
.metric-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.card-topline {
  color: var(--muted);
  font-size: 14px;
}

.risk-tag {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 800;
}

.risk-tag.neutral {
  background: #eef2f6;
  color: #475467;
}

.risk-tag.low {
  background: #e6f4ed;
  color: #12633f;
}

.risk-tag.medium {
  background: #fff4e5;
  color: #9a4a12;
}

.risk-tag.high {
  background: #ffe8e5;
  color: #b42318;
}

.score-row {
  display: flex;
  align-items: end;
  gap: 12px;
  margin: 20px 0 12px;
}

.score-row strong {
  font-size: 64px;
  line-height: 0.9;
}

.score-row span {
  color: var(--muted);
  padding-bottom: 7px;
}

.score-bar {
  height: 10px;
  overflow: hidden;
  border-radius: 999px;
  background: #e9eee9;
}

.score-bar span {
  display: block;
  width: 0%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--warning), var(--accent));
  transition: width 220ms ease;
}

.metric-list,
.recommendation-list {
  list-style: none;
  padding: 0;
}

.metric-list {
  display: grid;
  gap: 10px;
  margin: 22px 0;
}

.metric-list li {
  border-bottom: 1px solid #edf1ee;
  padding-bottom: 10px;
}

.metric-list span {
  color: var(--muted);
}

.recommendation-list {
  display: grid;
  gap: 10px;
  margin: 0 0 22px;
}

.recommendation-list li {
  border-left: 3px solid var(--accent);
  background: var(--soft);
  border-radius: 6px;
  padding: 10px 12px;
  line-height: 1.55;
}

.section {
  padding: 72px 0;
}

.section-heading {
  max-width: 760px;
  margin-bottom: 30px;
}

.insight-grid,
.coverage-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.insight-card,
.coverage-grid article {
  padding: 22px;
}

.insight-card span {
  display: inline-flex;
  margin-bottom: 32px;
  color: var(--accent);
  font-weight: 900;
}

.process-strip {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
  background: var(--paper);
}

.process-strip div {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px;
  border-right: 1px solid var(--line);
}

.process-strip div:last-child {
  border-right: 0;
}

.process-strip strong {
  color: var(--accent);
}

.lead-section {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 42px;
  align-items: start;
}

.lead-form {
  display: grid;
  gap: 12px;
  padding: 26px;
}

.faq-list {
  display: grid;
  gap: 12px;
}

.faq-list details {
  padding: 18px 20px;
}

.faq-list summary {
  cursor: pointer;
  font-weight: 800;
}

@media (max-width: 860px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
    padding: 18px 0;
  }

  .nav {
    width: 100%;
    justify-content: space-between;
    gap: 12px;
    font-size: 13px;
  }

  .hero,
  .lead-section {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: auto;
    padding: 36px 0 48px;
  }

  .input-row,
  .insight-grid,
  .coverage-grid,
  .process-strip {
    grid-template-columns: 1fr;
  }

  .process-strip div {
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .process-strip div:last-child {
    border-bottom: 0;
  }
}
```

- [ ] **Step 2: Run smoke test**

Run: `node tests/smoke.test.js`

Expected: `Smoke checks passed`

## Task 4: Diagnosis Preview Logic

**Files:**
- Modify: `script.js`
- Modify: `tests/smoke.test.js`

- [ ] **Step 1: Replace `script.js` with deterministic preview logic**

Use this full JavaScript file:

```js
(() => {
  const diagnosisForm = document.querySelector("#diagnosis-form");
  const websiteInput = document.querySelector("#website-input");
  const websiteError = document.querySelector("#website-error");
  const previewDomain = document.querySelector("#preview-domain");
  const previewRisk = document.querySelector("#preview-risk");
  const previewScore = document.querySelector("#preview-score");
  const previewBar = document.querySelector("#preview-bar");
  const metricCitation = document.querySelector("#metric-citation");
  const metricEntity = document.querySelector("#metric-entity");
  const metricTrust = document.querySelector("#metric-trust");
  const recommendationList = document.querySelector("#recommendation-list");
  const heroReportCta = document.querySelector("#hero-report-cta");
  const previewReportCta = document.querySelector("#preview-report-cta");
  const leadWebsite = document.querySelector("#lead-website");
  const leadForm = document.querySelector("#lead-form");
  const leadError = document.querySelector("#lead-error");
  const leadSuccess = document.querySelector("#lead-success");

  function normalizeDomain(value) {
    const trimmed = value.trim();
    if (!trimmed) {
      return "";
    }

    const withoutProtocol = trimmed.replace(/^https?:\/\//i, "");
    return withoutProtocol.split("/")[0].replace(/^www\./i, "").toLowerCase();
  }

  function isLikelyDomain(domain) {
    return /^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}$/i.test(domain);
  }

  function hashDomain(domain) {
    return domain.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  }

  function buildDiagnosis(domain) {
    const hash = hashDomain(domain);
    const score = 48 + (hash % 34);
    const risk = score >= 72 ? "low" : score >= 60 ? "medium" : "high";
    const riskLabel = risk === "low" ? "低风险" : risk === "medium" ? "中风险" : "高风险";

    return {
      domain,
      score,
      risk,
      riskLabel,
      citation: score >= 72 ? "较强" : score >= 60 ? "一般" : "偏弱",
      entity: hash % 3 === 0 ? "需强化" : "可识别",
      trust: score >= 68 ? "中等" : "明显",
      recommendations: [
        "补充能被 AI 直接引用的问答型内容，覆盖客户高频问题。",
        "强化品牌实体信息，包括业务范围、服务对象、案例和资质证明。",
        "为核心页面增加清晰的小标题、定义、对比和步骤化说明。",
      ],
    };
  }

  function renderDiagnosis(result) {
    previewDomain.textContent = result.domain;
    previewRisk.textContent = result.riskLabel;
    previewRisk.className = `risk-tag ${result.risk}`;
    previewScore.textContent = String(result.score);
    previewBar.style.width = `${result.score}%`;
    metricCitation.textContent = result.citation;
    metricEntity.textContent = result.entity;
    metricTrust.textContent = result.trust;
    recommendationList.innerHTML = result.recommendations.map((item) => `<li>${item}</li>`).join("");
    leadWebsite.value = result.domain;
  }

  function scrollToLeadForm() {
    document.querySelector("#report-form").scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      document.querySelector("#lead-name").focus({ preventScroll: true });
    }, 450);
  }

  diagnosisForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const domain = normalizeDomain(websiteInput.value);

    if (!domain) {
      websiteError.textContent = "请先输入公司官网。";
      websiteInput.focus();
      return;
    }

    if (!isLikelyDomain(domain)) {
      websiteError.textContent = "请输入有效官网，例如 example.com。";
      websiteInput.focus();
      return;
    }

    websiteError.textContent = "";
    renderDiagnosis(buildDiagnosis(domain));
  });

  heroReportCta.addEventListener("click", scrollToLeadForm);
  previewReportCta.addEventListener("click", scrollToLeadForm);

  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const requiredFields = ["#lead-name", "#lead-company", "#lead-contact", "#lead-website"];
    const missingField = requiredFields.map((selector) => document.querySelector(selector)).find((field) => !field.value.trim());

    if (missingField) {
      leadSuccess.textContent = "";
      leadError.textContent = "请填写姓名、公司、联系方式和官网。";
      missingField.focus();
      return;
    }

    leadError.textContent = "";
    leadSuccess.textContent = "已收到你的申请，我们会尽快发送完整版 GEO 诊断报告。";
    leadForm.reset();
  });

  window.geoLandingPage = {
    buildDiagnosis,
    hashDomain,
    isLikelyDomain,
    normalizeDomain,
  };
})();
```

- [ ] **Step 2: Update smoke test for JS functions**

Replace `tests/smoke.test.js` with:

```js
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
```

- [ ] **Step 3: Run smoke test**

Run: `node tests/smoke.test.js`

Expected: `Smoke checks passed`

## Task 5: Browser Validation and Polish Pass

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `script.js`

- [ ] **Step 1: Start a local static server**

Run: `python3 -m http.server 4173`

Expected: terminal shows a server listening on `http://0.0.0.0:4173/` or `http://[::]:4173/`.

- [ ] **Step 2: Open the page in Browser**

Open: `http://localhost:4173`

Expected:
- Page loads without console errors.
- First viewport shows the GEO headline, website input, preview card, and report CTA.

- [ ] **Step 3: Validate empty input**

Action:
- Click `生成诊断预览` with an empty website field.

Expected:
- The message `请先输入公司官网。` appears.
- Focus remains on the website input.

- [ ] **Step 4: Validate invalid domain**

Action:
- Type `abc`.
- Click `生成诊断预览`.

Expected:
- The message `请输入有效官网，例如 example.com。` appears.

- [ ] **Step 5: Validate diagnosis generation**

Action:
- Type `openai.com`.
- Click `生成诊断预览`.

Expected:
- Preview domain changes to `openai.com`.
- Score changes from `--` to a number.
- Risk tag changes from `未诊断`.
- Recommendation list contains three recommendations.
- Lead form website field is prefilled with `openai.com`.

- [ ] **Step 6: Validate CTA scroll**

Action:
- Click `获取完整版 GEO 诊断报告` in the preview card.

Expected:
- Browser scrolls to the lead form.
- Name field receives focus after the scroll.

- [ ] **Step 7: Validate lead form required fields**

Action:
- Submit the lead form with required fields empty.

Expected:
- The message `请填写姓名、公司、联系方式和官网。` appears.

- [ ] **Step 8: Validate lead form success**

Action:
- Fill `姓名`, `公司`, `邮箱或电话`, and `官网`.
- Submit the form.

Expected:
- The message `已收到你的申请，我们会尽快发送完整版 GEO 诊断报告。` appears.
- Required fields are cleared after submission.

- [ ] **Step 9: Validate responsive layout**

Check desktop width around `1440px` and mobile width around `390px`.

Expected:
- No text overlaps.
- Header navigation wraps or fits without covering content.
- Hero input and button stack cleanly on mobile.
- Diagnosis card remains readable.
- Lead form fields fit within the viewport.

- [ ] **Step 10: Run smoke test again**

Run: `node tests/smoke.test.js`

Expected: `Smoke checks passed`

## Task 6: Final Verification Notes

**Files:**
- Create: `docs/superpowers/validation/2026-06-03-geo-landing-page.md`

- [ ] **Step 1: Create validation evidence document**

Create `docs/superpowers/validation/2026-06-03-geo-landing-page.md`:

```markdown
# GEO Landing Page Validation

## Commands

- `node tests/smoke.test.js`
- `python3 -m http.server 4173`

## Browser Scenarios

- Initial page load: pass
- Empty URL validation: pass
- Invalid domain validation: pass
- Diagnosis preview generation: pass
- CTA scroll to lead form: pass
- Lead form required-field validation: pass
- Lead form success state: pass
- Desktop responsive check: pass
- Mobile responsive check: pass

## Notes

- The page is frontend-only.
- Diagnosis results are deterministic simulated previews.
- Lead form submission is an in-page confirmation and does not send data to a backend.
```

- [ ] **Step 2: Confirm final file list**

Run: `find . -maxdepth 3 -type f | sort`

Expected output includes:

```text
./docs/superpowers/plans/2026-06-03-geo-landing-page.md
./docs/superpowers/specs/2026-06-03-geo-landing-page-design.md
./docs/superpowers/validation/2026-06-03-geo-landing-page.md
./index.html
./script.js
./styles.css
./tests/smoke.test.js
```

## Self-Review

### Spec Coverage

- Customer-facing marketing landing page: covered by Tasks 1-3.
- Website input and immediate diagnosis preview: covered by Tasks 1 and 4.
- Simulated deterministic diagnosis result: covered by Task 4.
- GEO value explanation and report coverage: covered by Task 2.
- Lead capture form and success state: covered by Tasks 1 and 4.
- FAQ: covered by Task 2.
- Responsive desktop and mobile layout: covered by Tasks 3 and 5.
- Frontend-only scope: covered by architecture and Task 4.
- Browser validation: covered by Task 5.

### Implementation Notes

- This plan uses no package manager and no network downloads.
- The workspace is not a git repository, so commit steps are omitted.
- If the workspace is later initialized as git, commit after each task with a focused message.
