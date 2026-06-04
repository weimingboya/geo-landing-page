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
