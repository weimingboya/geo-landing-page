# GEO Optimization Landing Page Design

## Goal

Build a customer-facing marketing landing page for a GEO optimization service. The page should convert visitors by letting them enter a brand website, see an immediate GEO diagnosis preview, and then request a full GEO diagnosis report.

GEO means Generative Engine Optimization: improving how a brand is understood, surfaced, cited, or recommended by generative search and AI answer engines.

## Audience

The page is for prospective customers, especially business owners, marketing leaders, growth teams, and content operators who already care about search visibility but may not yet understand why traditional SEO is not enough for AI search.

## Primary Conversion

The primary CTA is:

```text
获取完整版 GEO 诊断报告
```

The landing page should guide visitors through this flow:

1. Visitor enters a brand website URL.
2. Visitor clicks to generate a diagnosis preview.
3. Page shows a simulated GEO diagnosis summary.
4. Visitor is prompted to leave contact details to get the full report.
5. Form submission shows an in-page success confirmation.

## Scope

### In Scope

- A polished single-page landing page.
- Hero section with website input and immediate diagnosis preview.
- Simulated diagnosis result based on the entered URL.
- Clear explanation of GEO's customer value.
- Diagnostic dimensions section showing what the report covers.
- Lead capture form for the full report.
- FAQ section.
- Responsive desktop and mobile layout.
- Frontend-only form success state.

### Out of Scope

- Real GEO analysis API integration.
- Email delivery.
- CRM integration.
- Database persistence.
- Payment or service package purchase flow.
- Authentication.
- Production deployment.

## Page Structure

### 1. Hero Diagnosis Tool

The first viewport should make the product/service concrete. It should include:

- A strong headline about being visible in AI search.
- Short supporting copy explaining that AI answer engines are changing discovery.
- A website URL input.
- A button to generate a diagnosis preview.
- A preview card that can show an empty state before input and a populated diagnosis state after generation.

Suggested headline direction:

```text
看看你的品牌是否正在被 AI 搜索看见
```

### 2. Diagnosis Preview

After the visitor generates a preview, show a simulated report summary with:

- GEO visibility score.
- Risk level.
- AI citation readiness.
- Content credibility gap.
- Entity clarity or brand recognition signal.
- Competitor visibility hint.
- 2-3 prioritized recommendations.

The result should feel deterministic and credible, but it should be clearly a preview rather than a real audited report.

### 3. Problem Section

Explain why GEO matters:

- AI search increasingly answers questions directly.
- Brands need content that AI systems can understand, trust, and cite.
- Traditional SEO pages may rank but still fail to appear in generative answers.
- GEO connects content clarity, entity signals, source credibility, and answer-ready structure.

### 4. Report Coverage Section

Show the major dimensions covered in the full diagnosis report:

- AI visibility and citation opportunity.
- Brand entity clarity.
- Content answerability.
- Structured data and technical discoverability.
- E-E-A-T and source credibility.
- Competitor comparison.
- Prioritized optimization roadmap.

### 5. Full Report Lead Form

The full report CTA should scroll or focus visitors to a form. Fields:

- Name.
- Company.
- Work email or phone.
- Website URL.
- Optional note.

On submit, show a success message confirming that the request was received.

### 6. FAQ

Include concise answers for:

- What is GEO?
- How is GEO different from SEO?
- What does the diagnosis report include?
- How long does it take to receive the full report?
- Do customers need engineering changes to start?
- What kinds of companies is this for?

## Interaction Requirements

- Website URL input should accept plain domains and full URLs.
- If the input is empty, generation should show a clear validation message.
- After generating a preview, the preview card should update without page reload.
- The generated preview should include a score and recommendations derived from the input in a stable frontend-only way.
- CTA buttons should move the visitor toward the full report form.
- Form submission should validate required fields and then show a success state.
- No real network submission is required.

## Visual Direction

Use a modern B2B SaaS and consulting-tool style:

- Calm, professional, conversion-oriented.
- Tool-first hero with input, score card, metrics, progress indicators, and risk tags.
- Avoid a generic marketing hero that is only text and decorative graphics.
- Avoid overly playful styling.
- Keep sections scannable and credible.
- Ensure mobile layouts do not crowd the hero input or diagnosis preview.

## Technical Direction

Because the current workspace is empty and not a git repository, implementation can start with a lightweight frontend app or static page. The implementation plan should inspect available runtime tooling before choosing the exact stack.

Recommended default:

- Create a Vite or plain static frontend if no framework exists.
- Keep the first implementation frontend-only.
- Use local component/state logic for URL validation, preview generation, CTA scrolling, and form success.
- Use CSS with responsive constraints for stable layout.

## Acceptance Criteria

- The page is available locally and renders without errors.
- The first screen clearly communicates GEO value and contains the diagnosis input.
- Entering a website and clicking the preview button updates the diagnosis card.
- Empty input shows a validation message.
- The full report CTA leads to the lead capture form.
- Required form fields validate before submission.
- Successful form submission shows an in-page confirmation.
- Layout works on desktop and mobile without overlapping text or broken controls.
- The page feels like a credible customer-facing marketing page, not an internal checklist or article.

## Validation Plan

- Run the relevant project checks after implementation, such as build, lint, or typecheck if available.
- Start the local app or open the static file.
- Use browser validation for:
  - Initial page load.
  - Empty URL validation.
  - Diagnosis preview generation.
  - CTA scroll/focus behavior.
  - Lead form validation.
  - Lead form success state.
  - Desktop and mobile responsive layouts.

## Risk Level

Low.

The work is frontend-only and does not change authentication, payments, production configuration, database schema, or external integrations.

## Rollback

Since this is a new page in an empty workspace, rollback is removing the generated app/page files.
