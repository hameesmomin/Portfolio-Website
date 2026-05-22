import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(root, 'product-brochures');

const shared = {
  author: 'Hamees Momin',
  role: 'Full-Stack Software Engineer | SaaS Product Builder | Cybersecurity Professional',
  location: 'UAE-ready enterprise software ecosystem',
};

const products = [
  {
    slug: 'aura-command',
    name: 'Aura Command',
    category: 'AI WhatsApp Revenue & Business Command Center',
    accent: '#0f766e',
    dark: '#082f2a',
    audience: 'Company owners, sales directors, real estate teams, service businesses, and operations managers handling leads through WhatsApp, website forms, and CRM systems.',
    promise: 'Turn WhatsApp conversations and lead follow-up into a measurable revenue operations system.',
    problem: [
      'Leads arrive from WhatsApp, website forms, referrals, and CRM channels but ownership is unclear.',
      'Slow replies and missed follow-ups quietly reduce revenue.',
      'Management cannot see pipeline health, agent performance, or missed opportunities in one place.',
      'CRM sync and reporting often depend on manual spreadsheets.'
    ],
    outcome: [
      'Every lead has an owner, status, source, SLA, and follow-up path.',
      'Managers see revenue pipeline, conversion trends, missed opportunities, and team activity.',
      'Sales agents get AI reply suggestions and next-best-action guidance.',
      'Owners get a Revenue Operations Health Score that is understandable in under 30 seconds.'
    ],
    modules: [
      ['Shared WhatsApp Inbox', 'Centralize customer conversations, assignment, priority, and status tracking for sales teams.'],
      ['Lead Pipeline', 'Track inquiry lifecycle from New to Assigned, Conversation, Follow-up, Won, Lost, and Closed.'],
      ['Missed Lead Detector', 'Highlight leads with no response or overdue follow-up before revenue is lost.'],
      ['AI Sales Copilot', 'Generate summaries, suggested replies, sales notes, and follow-up recommendations.'],
      ['Revenue Analytics', 'Measure pipeline value, conversion rate, response speed, and agent productivity.'],
      ['Integration Studio', 'Connect CRM, website forms, WhatsApp Business API, Google Sheets, Zapier, Make, n8n, and custom APIs.']
    ],
    workflow: [
      'Lead is created from WhatsApp, website form, CRM, API, or manual entry.',
      'Aura assigns an agent based on rules, capacity, source, or manager choice.',
      'SLA timer starts and the shared inbox keeps the conversation visible.',
      'AI summarizes the customer need and suggests a reply or next best action.',
      'Follow-up task is created automatically when the lead needs a future touch.',
      'Manager reviews pipeline health, conversion, missed opportunities, and revenue forecast.'
    ],
    healthScore: {
      name: 'Revenue Operations Health Score',
      factors: ['Average lead response time', 'Missed leads', 'Follow-up completion rate', 'Lead conversion rate', 'Agent activity', 'Pipeline velocity', 'CRM sync success rate', 'Customer engagement rate'],
      kpis: ['Pipeline Value', 'Active Leads', 'Lead Conversion Rate', 'Team Performance', 'Missed Opportunity Alerts', 'Revenue Forecast']
    },
    integrations: ['WhatsApp Business API', 'HubSpot', 'Zoho CRM', 'Salesforce', 'Pipedrive', 'Website Forms', 'Email', 'Google Sheets', 'Zapier', 'Make', 'n8n', 'Custom CRM API'],
    tiers: [
      ['Starter', 'Up to 3 users, shared inbox, lead pipeline, basic reports, AI summaries, notifications, Revenue Health Score, Executive Dashboard Lite.'],
      ['Business', 'Up to 25 users, CRM integrations, workflow automation, lead scoring, team analytics, scheduled reports, API access, webhooks, forecasting.'],
      ['Enterprise', 'Unlimited users, SSO-ready structure, white label, multiple WhatsApp channels, custom integrations, advanced workflows, custom reports, dedicated onboarding.']
    ],
    demo: ['Show owner dashboard', 'Open shared inbox', 'Assign lead', 'Trigger follow-up', 'Review missed opportunities', 'Explain health score', 'Show Integration Studio data mapping']
  },
  {
    slug: 'secureops',
    name: 'SecureOps',
    category: 'AI Cybersecurity, Compliance & SIEM-Ready Operations Dashboard',
    accent: '#7c2d12',
    dark: '#2f1308',
    audience: 'Company owners, IT managers, cybersecurity teams, compliance officers, auditors, and executives who need security visibility without operational confusion.',
    promise: 'Centralize security events, risks, vulnerabilities, compliance evidence, and executive reporting.',
    problem: [
      'Security information is spread across emails, spreadsheets, tools, tickets, and manual reports.',
      'Executives need a clear risk picture, but technical data is often too noisy.',
      'Compliance evidence and audit readiness become stressful near deadline.',
      'SIEM integrations are valuable, but many businesses need standalone risk and incident tracking first.'
    ],
    outcome: [
      'Security teams manage incidents, risks, assets, vulnerabilities, controls, and evidence in one platform.',
      'Executives receive board-friendly summaries and a Security Posture Score.',
      'Compliance teams track control status, owners, evidence, and remediation.',
      'Enterprise customers can grow into SIEM/API integrations without redesign.'
    ],
    modules: [
      ['Security Events Dashboard', 'Track events, alerts, severity, source, owner, and triage status.'],
      ['Incident Timeline', 'Record investigation steps, affected assets, severity, evidence, remediation, and closure.'],
      ['Risk Register', 'Score, assign, accept, remediate, and report risks with clear ownership.'],
      ['Vulnerability Register', 'Track open vulnerabilities, severity, due dates, owners, and remediation progress.'],
      ['Compliance Center', 'Manage controls, evidence, policies, audit readiness, and framework coverage.'],
      ['SIEM Connector Hub', 'Enterprise-ready structure for Splunk, Wazuh, Sentinel, Elastic, QRadar, and generic API/syslog ingestion.']
    ],
    workflow: [
      'Security alert, risk, vulnerability, or compliance gap is logged.',
      'SecureOps assigns severity, owner, due date, and remediation status.',
      'Evidence and activity are captured in the audit trail.',
      'AI assistant summarizes the risk and suggests remediation tasks.',
      'Management reviews posture score, incident trends, compliance status, and open critical items.',
      'Executive report is exported or scheduled for leadership review.'
    ],
    healthScore: {
      name: 'Security Posture Score',
      factors: ['Open vulnerabilities', 'Critical incidents', 'Compliance status', 'Remediation completion rate', 'Asset coverage', 'SIEM alert volume', 'Risk acceptance levels', 'Security control coverage'],
      kpis: ['Compliance Status', 'Open Risks', 'Critical Vulnerabilities', 'Incident Trends', 'Executive Risk Summary', 'Board-Level Security Report']
    },
    integrations: ['Splunk', 'Wazuh', 'Microsoft Sentinel', 'Elastic SIEM', 'QRadar', 'Generic Syslog/API', 'Email Alerts', 'Slack', 'Microsoft Teams', 'Custom Webhooks'],
    tiers: [
      ['Starter', 'Risk register, incident tracking, vulnerability register, audit logs, compliance dashboard, Security Posture Score, Executive Dashboard Lite.'],
      ['Business', 'Asset inventory, remediation tracking, compliance workflows, executive reports, risk scoring, AI security assistant, API access, scheduled reports.'],
      ['Enterprise', 'SIEM integrations, MITRE ATT&CK-ready mapping, custom frameworks, multi-entity management, board reporting, vendor assessments, white label.']
    ],
    demo: ['Show executive security dashboard', 'Open incident timeline', 'Review risk register', 'Add evidence', 'Generate remediation recommendation', 'Show posture score', 'Show SIEM-ready Integration Studio']
  },
  {
    slug: 'documind',
    name: 'Documind',
    category: 'AI Document Intelligence Platform for UAE Businesses',
    accent: '#1d4ed8',
    dark: '#10295f',
    audience: 'Business owners, operations managers, HR teams, finance departments, compliance officers, legal teams, and document-heavy UAE companies.',
    promise: 'Make business documents searchable, reviewable, trackable, and renewal-ready.',
    problem: [
      'Important contracts, trade licenses, IDs, invoices, HR files, and vendor documents are scattered across folders and inboxes.',
      'Expired documents can create legal, compliance, or operational risk.',
      'Manual document review is slow and difficult to audit.',
      'Teams need AI help, but answers must stay grounded in uploaded business records.'
    ],
    outcome: [
      'Documents are uploaded, classified, searched, reviewed, and tracked in a secure workspace.',
      'Owners see expiring documents, missing records, approval bottlenecks, and contract risk.',
      'AI summarizes files, extracts key fields, and flags risky clauses or renewal deadlines.',
      'The company gains a Document Compliance Score for executive visibility.'
    ],
    modules: [
      ['Secure Upload Flow', 'Upload documents with validation, categories, owners, folders, tags, and review status.'],
      ['OCR & Classification', 'OCR-ready pipeline for invoices, contracts, IDs, licenses, tenancy agreements, HR files, and compliance records.'],
      ['AI Extraction & Summaries', 'Extract dates, parties, amounts, renewal terms, obligations, and key clauses.'],
      ['Expiry & Renewal Tracking', 'Detect expiring documents and create reminders before business risk appears.'],
      ['Approval Workflow', 'Route documents to reviewers with status, comments, and audit trail.'],
      ['Source-Grounded Search', 'Search business records and ask questions against uploaded documents.']
    ],
    workflow: [
      'User uploads contract, license, invoice, ID, or compliance document.',
      'Documind classifies the file and prepares OCR/extraction metadata.',
      'AI summarizes the document and highlights important fields or risks.',
      'Reviewer approves, requests changes, archives, or assigns owner.',
      'Renewal reminders and document timelines keep the record alive.',
      'Executives review compliance score, backlog, missing documents, and renewal forecast.'
    ],
    healthScore: {
      name: 'Document Compliance Score',
      factors: ['Expired documents', 'Missing documents', 'Approval completion rate', 'Processing backlog', 'OCR confidence', 'Contract review completion', 'Renewal readiness'],
      kpis: ['Documents Expiring Soon', 'Missing Documentation', 'Approval Bottlenecks', 'Contract Risk Summary', 'Renewal Forecast', 'AI Recommendations']
    },
    integrations: ['Google Drive', 'SharePoint', 'OneDrive', 'Dropbox-ready structure', 'CRM', 'ERP', 'HR Systems', 'Email Ingestion', 'Custom API'],
    tiers: [
      ['Starter', 'Document upload, OCR-ready flow, classification, AI summaries, search, approval workflow, Document Compliance Score, Executive Dashboard Lite.'],
      ['Business', 'Google Drive, SharePoint, expiry reminders, contract analysis, bulk processing, API access, scheduled reports.'],
      ['Enterprise', 'ERP/HR integrations, custom document models, redaction workflow-ready structure, white label, multi-department workspaces, advanced compliance reporting.']
    ],
    demo: ['Upload sample contract', 'Show summary and extracted fields', 'Review expiry reminder', 'Approve document', 'Ask AI a grounded question', 'Show compliance score', 'Show storage integration mapping']
  },
  {
    slug: 'siteflow',
    name: 'Siteflow',
    category: 'AI Construction Operations & Site Management Platform',
    accent: '#b45309',
    dark: '#432300',
    audience: 'Construction company owners, real estate developers, project managers, consultants, contractors, site engineers, and operations teams in the UAE.',
    promise: 'Bring projects, contractors, site reports, materials, safety, approvals, and executive visibility into one construction operations platform.',
    problem: [
      'Daily site progress, photos, snags, materials, approvals, safety, and contractor updates are often spread across WhatsApp, Excel, email, and paper.',
      'Owners need simple visibility into budget, timeline, quality, safety, and delay risk.',
      'Contractor performance is hard to measure consistently.',
      'Client-ready reporting takes too long at the end of each week or month.'
    ],
    outcome: [
      'Site teams manage daily reports, snags, photos, materials, approvals, and contractors in one workspace.',
      'Project managers see delay risks, budget variance, milestone status, and contractor performance.',
      'AI generates daily summaries and management-ready status updates.',
      'Owners get a Project Health Score and forecast completion view.'
    ],
    modules: [
      ['Project Dashboard', 'Track milestones, timelines, budgets, contractors, risks, and project status.'],
      ['Daily Site Reports', 'Capture progress, manpower, weather, site conditions, photos, and notes.'],
      ['Snag & Punch List Tracking', 'Assign responsibility, severity, due dates, photos, and closure evidence.'],
      ['Contractor Management', 'Track contractors, performance, tasks, safety issues, and delivery quality.'],
      ['Materials & Approvals', 'Manage material requests, deliveries, budget variance, RFIs, submittals, and approvals.'],
      ['Client-Ready Reports', 'Generate executive and client-friendly PDF reports from project data.']
    ],
    workflow: [
      'Project is created with contractor, client, budget, milestone, and team information.',
      'Site engineer submits daily report with photos, progress, safety, and material updates.',
      'Snags, issues, approvals, and material requests are assigned to responsible parties.',
      'AI produces a daily project summary and flags delay or safety risks.',
      'Managers review budget variance, timeline variance, and contractor rankings.',
      'Client-ready report is exported or scheduled for stakeholders.'
    ],
    healthScore: {
      name: 'Project Health Score',
      factors: ['Budget variance', 'Timeline variance', 'Open site issues', 'Contractor performance', 'Safety incidents', 'Inspection completion', 'Material delays', 'Milestone completion'],
      kpis: ['Budget Performance', 'Timeline Performance', 'Delay Risks', 'Contractor Rankings', 'Safety Overview', 'Forecast Completion Date']
    },
    integrations: ['ERP', 'Procurement Tools', 'Accounting Systems', 'Real Estate CRM', 'Google Drive', 'SharePoint', 'Email', 'Custom API/Webhooks'],
    tiers: [
      ['Starter', 'Projects, daily reports, contractors, site photos, materials tracking, Project Health Score, Executive Dashboard Lite.'],
      ['Business', 'Budget tracking, approval workflows, timeline management, client reporting, API access, AI project summaries, scheduled reports.'],
      ['Enterprise', 'ERP/procurement integrations, multi-company management, white label, advanced analytics, custom workflows, executive reporting suite.']
    ],
    demo: ['Open project dashboard', 'Create daily report', 'Review snag list', 'Show material request', 'Generate AI project summary', 'Review Project Health Score', 'Export client report']
  }
];

function list(items) {
  return items.map((item) => `<li>${item}</li>`).join('');
}

function modules(items) {
  return items.map(([title, text]) => `
    <article class="module">
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `).join('');
}

function tiers(items) {
  return items.map(([title, text]) => `
    <article class="tier">
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `).join('');
}

function render(product) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${product.name} Product Brochure</title>
<style>
  @page { size: A4; margin: 15mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    color: #17201f;
    background: #f6f4ef;
    font-family: Inter, Arial, Helvetica, sans-serif;
    line-height: 1.45;
  }
  .page {
    min-height: 267mm;
    page-break-after: always;
    padding: 0;
    position: relative;
  }
  .page:last-child { page-break-after: auto; }
  .cover {
    background: linear-gradient(135deg, ${product.dark}, ${product.accent});
    color: #fff;
    border-radius: 18px;
    padding: 42px;
    min-height: 245mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .eyebrow {
    text-transform: uppercase;
    letter-spacing: .12em;
    font-size: 11px;
    font-weight: 800;
    color: rgba(255,255,255,.76);
  }
  h1 {
    font-size: 56px;
    line-height: 1;
    margin: 22px 0 14px;
    letter-spacing: 0;
  }
  h2 {
    font-size: 26px;
    margin: 0 0 14px;
    color: ${product.dark};
    letter-spacing: 0;
  }
  h3 {
    font-size: 15px;
    margin: 0 0 6px;
    color: ${product.dark};
  }
  p { margin: 0 0 11px; }
  .subtitle {
    font-size: 24px;
    max-width: 620px;
    color: rgba(255,255,255,.9);
  }
  .promise {
    font-size: 18px;
    padding: 18px 20px;
    background: rgba(255,255,255,.12);
    border: 1px solid rgba(255,255,255,.22);
    border-radius: 14px;
    max-width: 620px;
  }
  .cover-footer {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 20px;
    align-items: end;
  }
  .byline {
    border-top: 1px solid rgba(255,255,255,.28);
    padding-top: 16px;
    color: rgba(255,255,255,.84);
  }
  .sheet {
    background: #fffdfa;
    border: 1px solid #e7e0d4;
    border-radius: 16px;
    padding: 28px;
    min-height: 245mm;
  }
  .section {
    margin-bottom: 24px;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .three {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .card, .module, .tier {
    border: 1px solid #e7e0d4;
    border-radius: 12px;
    padding: 15px;
    background: #fff;
  }
  .module {
    break-inside: avoid;
  }
  .metric {
    background: #f7f4ed;
    border-left: 5px solid ${product.accent};
    border-radius: 10px;
    padding: 14px;
    font-weight: 800;
    color: ${product.dark};
  }
  ul {
    margin: 0;
    padding-left: 18px;
  }
  li {
    margin: 0 0 8px;
  }
  .workflow {
    counter-reset: step;
    list-style: none;
    padding: 0;
  }
  .workflow li {
    counter-increment: step;
    display: grid;
    grid-template-columns: 34px 1fr;
    gap: 10px;
    align-items: start;
    margin-bottom: 10px;
  }
  .workflow li::before {
    content: counter(step);
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: ${product.accent};
    color: #fff;
    font-weight: 800;
    font-size: 13px;
  }
  .badge-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  }
  .badge {
    border: 1px solid #ded5c6;
    background: #fbf8f1;
    color: ${product.dark};
    border-radius: 999px;
    padding: 7px 10px;
    font-size: 12px;
    font-weight: 700;
  }
  .callout {
    border-radius: 14px;
    padding: 18px;
    color: #fff;
    background: ${product.dark};
  }
  .small {
    font-size: 12px;
    color: #5f6865;
  }
  .footer {
    position: absolute;
    bottom: 2mm;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    color: #7a817d;
    font-size: 10px;
  }
  .toc {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 20px;
  }
  .toc div {
    padding: 14px;
    border: 1px solid rgba(255,255,255,.22);
    border-radius: 12px;
    background: rgba(255,255,255,.1);
  }
</style>
</head>
<body>
  <section class="page">
    <div class="cover">
      <div>
        <div class="eyebrow">Commercial SaaS Product Brochure</div>
        <h1>${product.name}</h1>
        <p class="subtitle">${product.category}</p>
        <div class="badge-row">
          <span class="badge">Standalone-ready</span>
          <span class="badge">Integration-ready</span>
          <span class="badge">Subscription-ready</span>
          <span class="badge">Security-first</span>
          <span class="badge">Executive dashboards</span>
        </div>
      </div>
      <div class="promise">${product.promise}</div>
      <div class="cover-footer">
        <div class="byline">
          <strong>${shared.author}</strong><br>
          ${shared.role}<br>
          ${shared.location}
        </div>
        <div class="small">Prepared for company owners, executives, and decision makers. Designed for clear business discussion, product demos, and investment-style evaluation.</div>
      </div>
    </div>
  </section>

  <section class="page">
    <div class="sheet">
      <div class="section">
        <h2>Executive Summary</h2>
        <p><strong>${product.name}</strong> is a commercial SaaS product built for businesses that need stronger visibility, workflow control, automation, reporting, and security without turning every improvement into a custom development project.</p>
        <p>${product.promise}</p>
      </div>
      <div class="grid section">
        <div class="card">
          <h3>Target Audience</h3>
          <p>${product.audience}</p>
        </div>
        <div class="card">
          <h3>Business Outcome</h3>
          <ul>${list(product.outcome)}</ul>
        </div>
      </div>
      <div class="section">
        <h2>Business Problems Solved</h2>
        <div class="grid">
          ${product.problem.map((text) => `<div class="metric">${text}</div>`).join('')}
        </div>
      </div>
      <div class="section">
        <h2>What Makes It Enterprise-Ready</h2>
        <div class="three">
          <div class="card"><h3>Multi-Tenant SaaS</h3><p>Each customer gets a separate workspace with scoped users, settings, subscriptions, reports, integrations, and audit activity.</p></div>
          <div class="card"><h3>Subscription Foundation</h3><p>Starter, Business, and Enterprise plans support feature gating, usage limits, billing events, and upgrade paths.</p></div>
          <div class="card"><h3>Security First</h3><p>RBAC, audit trails, secure API keys, tenant isolation, retention policies, webhook verification, and enterprise SSO-ready structure.</p></div>
        </div>
      </div>
    </div>
    <div class="footer"><span>${product.name}</span><span>Executive Summary</span></div>
  </section>

  <section class="page">
    <div class="sheet">
      <h2>Core Product Modules</h2>
      <p class="section">The product is organized around business workflows rather than isolated dashboard widgets. Each module exists to improve revenue, productivity, visibility, security, automation, or executive decision making.</p>
      <div class="grid">
        ${modules(product.modules)}
      </div>
    </div>
    <div class="footer"><span>${product.name}</span><span>Core Modules</span></div>
  </section>

  <section class="page">
    <div class="sheet">
      <h2>How The Workflow Works</h2>
      <p class="section">The customer can start in standalone mode with manual records and demo data, then add integrations when the business is ready. Integrations enhance the workflow but are not required for daily use.</p>
      <ol class="workflow">${list(product.workflow)}</ol>
      <div class="grid section">
        <div class="callout">
          <h3 style="color:#fff">Standalone Mode</h3>
          <p>Use the product immediately with manual records, internal users, dashboards, reports, demo data, onboarding, and built-in workflows.</p>
        </div>
        <div class="callout">
          <h3 style="color:#fff">Integrated Mode</h3>
          <p>Connect external systems through Integration Studio, API keys, OAuth apps, webhooks, data mapping, workflow triggers, and integration logs.</p>
        </div>
      </div>
      <h2>Tenant Provisioning</h2>
      <div class="grid">
        <div class="card"><h3>Customer Pays</h3><p>Checkout starts the subscription flow. Paid features are unlocked only after verified backend payment confirmation.</p></div>
        <div class="card"><h3>Workspace Created</h3><p>The tenant workspace is created with product-specific settings and isolated customer data scope.</p></div>
        <div class="card"><h3>Roles Created</h3><p>Owner, Admin, Manager, Analyst, Agent, and Viewer access patterns are prepared for the customer team.</p></div>
        <div class="card"><h3>Onboarding Starts</h3><p>Demo data loads, subscription activates, and the guided onboarding checklist helps users reach value quickly.</p></div>
      </div>
    </div>
    <div class="footer"><span>${product.name}</span><span>Workflow & Provisioning</span></div>
  </section>

  <section class="page">
    <div class="sheet">
      <h2>Executive Dashboard & Health Score</h2>
      <p>The executive dashboard is designed for owners and management to understand the business condition quickly. It separates daily operational work from leadership-level decisions.</p>
      <div class="section callout">
        <h3 style="color:#fff">${product.healthScore.name}</h3>
        <p>Green: 80-100. Yellow: 60-79. Red: 0-59. The score appears in dashboards, reports, monthly summaries, email report structure, and AI summaries.</p>
      </div>
      <div class="grid section">
        <div class="card">
          <h3>Score Factors</h3>
          <ul>${list(product.healthScore.factors)}</ul>
        </div>
        <div class="card">
          <h3>Executive KPIs</h3>
          <ul>${list(product.healthScore.kpis)}</ul>
        </div>
      </div>
      <h2>AI Copilot</h2>
      <p>The AI assistant is contextual to ${product.name}. It supports summaries, recommendations, risk signals, reporting assistance, and next actions inside the product workflow rather than acting as a generic chatbot.</p>
    </div>
    <div class="footer"><span>${product.name}</span><span>Executive Intelligence</span></div>
  </section>

  <section class="page">
    <div class="sheet">
      <h2>Integration Studio</h2>
      <p>Integration Studio gives admins one place to manage external systems, API access, webhooks, logs, event triggers, and data mapping.</p>
      <div class="grid section">
        <div class="card"><h3>Marketplace</h3><p>Browse available CRM, ERP, SIEM, storage, email, workspace, automation, and custom API connectors.</p></div>
        <div class="card"><h3>Data Mapping</h3><p>Map external fields into product fields, such as CRM <code>first_name</code> to an internal customer field, reducing integration pain.</p></div>
        <div class="card"><h3>Webhook Builder</h3><p>Create outbound event notifications with delivery logs, retry visibility, and signature-ready architecture.</p></div>
        <div class="card"><h3>API Key Management</h3><p>Generate scoped API keys, monitor usage, rotate keys, and revoke access when needed.</p></div>
      </div>
      <h2>Supported Integration Categories</h2>
      <div class="badge-row">${product.integrations.map((item) => `<span class="badge">${item}</span>`).join('')}</div>
      <div class="section"></div>
      <h2>Enterprise Controls</h2>
      <div class="three">
        <div class="card"><h3>SSO Ready</h3><p>Enterprise tier structure for SAML, Azure AD, Microsoft Entra, Google Workspace, and Okta.</p></div>
        <div class="card"><h3>Audit Center</h3><p>Track who changed what, when, from where, and previous/new values for sensitive actions.</p></div>
        <div class="card"><h3>Retention Policies</h3><p>Support for 30-day, 90-day, 1-year, and custom retention, archive, and backup policies.</p></div>
      </div>
    </div>
    <div class="footer"><span>${product.name}</span><span>Integrations & Controls</span></div>
  </section>

  <section class="page">
    <div class="sheet">
      <h2>Subscription Tiers</h2>
      <p class="section">The product supports a growth path from small business use to enterprise deployment without changing the core architecture.</p>
      <div class="grid">
        ${tiers(product.tiers)}
      </div>
      <div class="section"></div>
      <h2>Why Owners Care</h2>
      <div class="grid">
        <div class="metric">Revenue: clearer conversion, fewer missed actions, better follow-up, stronger reporting.</div>
        <div class="metric">Productivity: teams work from one system instead of scattered files, chats, and spreadsheets.</div>
        <div class="metric">Visibility: executives see KPIs, risks, forecasts, health scores, and recommendations.</div>
        <div class="metric">Security: tenant isolation, RBAC, audit trails, API controls, and enterprise policies.</div>
      </div>
    </div>
    <div class="footer"><span>${product.name}</span><span>Commercial Model</span></div>
  </section>

  <section class="page">
    <div class="sheet">
      <h2>Demo Agenda For Company Owners</h2>
      <p>This agenda keeps the product demo focused on business value, not just screens.</p>
      <ol class="workflow">${list(product.demo)}</ol>
      <div class="section"></div>
      <h2>Implementation Discussion</h2>
      <div class="grid">
        <div class="card"><h3>Day 1</h3><p>Create workspace, invite users, enable demo data, review dashboard, and confirm business workflow.</p></div>
        <div class="card"><h3>Week 1</h3><p>Configure roles, reports, onboarding, key workflows, import initial records, and validate security settings.</p></div>
        <div class="card"><h3>Weeks 2-4</h3><p>Connect priority integrations, data mapping, webhooks, scheduled reports, and executive views.</p></div>
        <div class="card"><h3>Enterprise Phase</h3><p>SSO, white label, custom domain, custom reporting, retention policies, integration logs, and advanced automation.</p></div>
      </div>
      <div class="section"></div>
      <div class="callout">
        <h3 style="color:#fff">Positioning Statement</h3>
        <p>${product.name} is positioned as a commercial SaaS product for real business operations, with standalone use, integration-ready architecture, subscription tiers, executive dashboards, health scoring, AI assistance, and security-first design.</p>
      </div>
    </div>
    <div class="footer"><span>${product.name}</span><span>Demo & Rollout</span></div>
  </section>
</body>
</html>`;
}

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();

for (const product of products) {
  const html = render(product);
  const htmlPath = path.join(outputDir, `${product.slug}-brochure.html`);
  const pdfPath = path.join(outputDir, `${product.slug}-brochure.pdf`);

  await writeFile(htmlPath, html, 'utf8');

  const page = await browser.newPage({ viewport: { width: 1240, height: 1754 } });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
  });
  await page.close();
}

await browser.close();

console.log(`Generated ${products.length} product brochures in ${outputDir}`);
