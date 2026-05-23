import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.join(root, 'product-brochures');

const shared = {
  author: 'Hamees Momin',
  role: 'Full-Stack Software Engineer | SaaS Product Builder | Cybersecurity Professional | Enterprise Application Developer',
  location: 'UAE-ready commercial SaaS product ecosystem',
  contact: 'Request a private product demo',
};

const products = [
  {
    slug: 'aura-command',
    name: 'Aura Command',
    short: 'Aura',
    category: 'AI WhatsApp Revenue & Business Command Center',
    position: 'An AI WhatsApp Operations Employee for lead handling, sales follow-up, CRM workflows, and revenue visibility.',
    audience: 'Company owners, sales directors, real estate teams, service businesses, call centers, and WhatsApp-heavy operations teams.',
    promise: 'Turn WhatsApp conversations and lead follow-up into a measurable revenue operations system.',
    theme: {
      ink: '#082f2a',
      accent: '#0f766e',
      accent2: '#22c55e',
      soft: '#e7f7f1',
      paper: '#fbfffd',
      muted: '#4b635c',
      grid: '#d7eee6',
    },
    icon: 'WA',
    stats: [
      ['Revenue Health', '92', 'Lead response and follow-up quality'],
      ['Pipeline Value', 'AED 4.8M', 'Visible revenue opportunities'],
      ['Missed Leads', '-38%', 'Early alerts reduce leakage'],
      ['Time Saved', '18 hrs/wk', 'AI summaries and automation'],
    ],
    differentiators: [
      ['AI Employee Modes', 'Sales, support, collections, booking, real estate, and operations agents with tone, rules, escalation, and handoff logic.'],
      ['WhatsApp Revenue OS', 'Shared inbox, SLA timers, lead lifecycle, agent assignment, follow-up calendar, templates, and conversion scoring.'],
      ['Business Outcome Tracking', 'Tracks conversations handled, follow-ups automated, deals influenced, manual work reduced, and revenue opportunities.'],
      ['Integration Studio', 'CRM, website forms, WhatsApp Business API, Google Sheets, Zapier, Make, n8n, custom APIs, and field mapping.'],
    ],
    market: [
      'UAE businesses rely heavily on WhatsApp for customer communication, sales, support, bookings, and collections.',
      'Most companies still manage conversations manually across phones, spreadsheets, and disconnected CRMs.',
      'Owners want direct visibility into missed opportunities, team performance, response time, and revenue impact.',
    ],
    whyBuy: [
      'Recover missed leads and improve response speed.',
      'Give management one operating view of WhatsApp revenue activity.',
      'Replace scattered manual follow-up with governed automation.',
      'Connect WhatsApp operations to CRM, reporting, and executive decisions.',
    ],
    modules: [
      ['Shared WhatsApp Inbox', 'Centralize conversations, owners, SLA status, priority, and customer timeline.'],
      ['Lead Pipeline', 'Track New, Assigned, In Conversation, Follow-up Needed, Won, Lost, and Closed.'],
      ['Missed Lead Detector', 'Detect unanswered leads, overdue follow-ups, and stalled hot opportunities.'],
      ['Voice Note Intelligence', 'Transcription-ready structure, intent detection, suggested replies, and optional voice response path.'],
      ['AI Reply Engine', 'Generate summaries, replies, next-best actions, and escalation recommendations.'],
      ['Revenue Analytics', 'Measure pipeline, conversion, velocity, team activity, customer sentiment, and attribution.'],
    ],
    workflow: ['Lead captured', 'AI qualifies inquiry', 'Agent assigned', 'WhatsApp response suggested', 'Follow-up automated', 'CRM synced', 'Manager sees revenue impact'],
    health: {
      name: 'Revenue Operations Health Score',
      factors: ['Average response time', 'Missed leads', 'Follow-up completion', 'Lead conversion', 'Agent activity', 'Pipeline velocity', 'CRM sync success', 'Customer engagement'],
      executive: ['Pipeline value', 'Active leads', 'Conversion rate', 'Team performance', 'Missed opportunity alerts', 'Revenue forecast'],
    },
    integrations: ['WhatsApp Business API', 'HubSpot', 'Zoho CRM', 'Salesforce', 'Pipedrive', 'Website Forms', 'Email', 'Google Sheets', 'Zapier', 'Make', 'n8n', 'Custom CRM API'],
    tiers: [
      ['Starter', 'Up to 3 users', ['Shared inbox', 'Lead management', 'Basic reports', 'Basic AI summaries', 'Revenue Health Score']],
      ['Business', 'Up to 25 users', ['CRM integrations', 'Workflow automation', 'Lead scoring', 'Team analytics', 'API access', 'Webhooks', 'Forecasting']],
      ['Enterprise', 'Unlimited users', ['SSO-ready', 'White label', 'Multiple WhatsApp channels', 'Custom integrations', 'Advanced workflows', 'Custom reports']],
    ],
    demo: ['Open WhatsApp Revenue Dashboard', 'Show shared inbox and SLA timer', 'Assign a lead to an agent', 'Trigger AI reply suggestion', 'Simulate missed follow-up automation', 'Review Revenue Health Score and forecast'],
    roadmap: ['WhatsApp campaign governance', 'Advanced lead source attribution', 'AI quality coaching for agents', 'Predictive win probability', 'Multi-branch revenue operations'],
    mockLabels: ['Inbox', 'Hot Leads', 'Revenue', 'Follow-ups'],
  },
  {
    slug: 'siteflow',
    name: 'SiteFlow',
    short: 'Site',
    category: 'AI Construction Command Center for UAE Contractors',
    position: 'An AI project director that watches projects, contractors, approvals, materials, safety, budgets, and delay risks.',
    audience: 'Construction owners, real estate developers, project managers, consultants, contractors, site engineers, and UAE operations teams.',
    promise: 'Bring site reporting, project control, contractor accountability, and executive visibility into one construction operations platform.',
    theme: {
      ink: '#432300',
      accent: '#b45309',
      accent2: '#f59e0b',
      soft: '#fff4de',
      paper: '#fffdf8',
      muted: '#67513a',
      grid: '#f4dfbc',
    },
    icon: 'SF',
    stats: [
      ['Project Health', '86', 'Budget, schedule, safety, and progress'],
      ['Delay Risk', '3 sites', 'Early escalation before cost impact'],
      ['Open Snags', '41', 'Assigned with owner and evidence'],
      ['Report Time', '-70%', 'AI daily summaries and exports'],
    ],
    differentiators: [
      ['AI Site Reporting', 'Text, photo, voice, and daily progress entries become site reports, summaries, delay warnings, and safety observations.'],
      ['UAE Workflows', 'Municipality approvals, consultant inspections, variation orders, subcontractor tracking, delivery logs, and safety checklists.'],
      ['Delay Prediction', 'Forecast material, subcontractor, inspection, timeline, and budget risks before they surprise management.'],
      ['Client-Ready Reporting', 'Executive PDFs, project health, contractor rankings, evidence, photos, and milestone progress for stakeholders.'],
    ],
    market: [
      'Construction teams often rely on WhatsApp, Excel, paper reports, and disconnected photo folders.',
      'Owners need a simple view of which projects are delayed, why, and what requires management attention.',
      'UAE contractors and developers need stronger evidence, approvals, site visibility, and client-ready reporting.',
    ],
    whyBuy: [
      'Reduce delay surprises and improve site accountability.',
      'Create management-ready daily and weekly reports faster.',
      'Track contractors, materials, approvals, snags, safety, and budgets in one place.',
      'Give executives a clear Project Health Score across sites.',
    ],
    modules: [
      ['Project Dashboard', 'Track milestones, budgets, contractors, risks, issues, photos, approvals, and progress.'],
      ['Daily Site Reports', 'Capture manpower, weather, site conditions, photos, progress, and notes.'],
      ['Snag & Punch List', 'Assign severity, responsibility, due dates, photos, and closure evidence.'],
      ['Contractor Management', 'Score performance, task quality, safety, delivery reliability, and responsiveness.'],
      ['Material & Approval Control', 'Manage material requests, deliveries, RFIs, submittals, consultant approvals, and variation orders.'],
      ['AI Project Director', 'Answers what is delayed, why, who is underperforming, and what needs approval this week.'],
    ],
    workflow: ['Site update submitted', 'AI creates daily report', 'Risks detected', 'Responsible party assigned', 'Manager approves action', 'Client report exported', 'Executive forecast updated'],
    health: {
      name: 'Project Health Score',
      factors: ['Budget variance', 'Timeline variance', 'Open site issues', 'Contractor performance', 'Safety incidents', 'Inspection completion', 'Material delays', 'Milestone completion'],
      executive: ['Budget performance', 'Timeline performance', 'Delay risks', 'Contractor rankings', 'Safety overview', 'Forecast completion date'],
    },
    integrations: ['ERP', 'Procurement Tools', 'Accounting Systems', 'Real Estate CRM', 'Google Drive', 'SharePoint', 'Email', 'Custom API', 'Webhooks'],
    tiers: [
      ['Starter', 'Core site teams', ['Projects', 'Daily reports', 'Contractors', 'Site photos', 'Materials tracking', 'Project Health Score']],
      ['Business', 'Growing contractors', ['Budget tracking', 'Approval workflows', 'Timeline management', 'Client reporting', 'API access', 'AI summaries']],
      ['Enterprise', 'Developers and multi-company groups', ['ERP integration', 'Procurement integration', 'Multi-company management', 'White label', 'Advanced analytics', 'Custom workflows']],
    ],
    demo: ['Open Project Health dashboard', 'Create daily site report', 'Review AI delay warning', 'Assign snag responsibility', 'Check material delivery risk', 'Export client-ready report'],
    roadmap: ['AI photo progress comparison', 'Subcontractor risk benchmarking', 'Consultant approval analytics', 'Procurement variance forecasts', 'Developer portfolio view'],
    mockLabels: ['Projects', 'Snags', 'Materials', 'Approvals'],
  },
  {
    slug: 'documind',
    name: 'DocuMind',
    short: 'Doc',
    category: 'AI Business Document Intelligence Platform',
    position: 'A company document brain for UAE records, contracts, licenses, renewals, compliance files, invoices, and approvals.',
    audience: 'Business owners, HR, finance, compliance, legal, operations, procurement, and document-heavy UAE companies.',
    promise: 'Make company documents searchable, reviewable, renewal-ready, and useful for executive decisions.',
    theme: {
      ink: '#10295f',
      accent: '#1d4ed8',
      accent2: '#38bdf8',
      soft: '#eaf2ff',
      paper: '#fbfdff',
      muted: '#43536f',
      grid: '#d7e5ff',
    },
    icon: 'DM',
    stats: [
      ['Compliance Score', '89', 'Document health and renewal readiness'],
      ['Expiring Soon', '17', 'Licenses, contracts, IDs, and records'],
      ['Review Backlog', '-46%', 'AI classification and approval flow'],
      ['Search Time', '-80%', 'Source-grounded Q&A and metadata'],
    ],
    differentiators: [
      ['UAE Document Intelligence', 'Emirates ID, trade license, VAT certificate, tenancy contract, RERA documents, invoices, contracts, HR, and supplier files.'],
      ['AI Risk Scoring', 'Flags missing information, expiry risk, compliance risk, duplicates, contract risk, and required action.'],
      ['Document Knowledge Graph', 'Connects companies, employees, contracts, suppliers, invoices, obligations, ownership, and expiry dates.'],
      ['Renewal Operations', 'License expiry alerts, contract reminders, payment obligations, missing document alerts, and compliance checklists.'],
    ],
    market: [
      'Companies lose time and risk compliance issues because critical records live in inboxes, folders, drives, and manual trackers.',
      'UAE businesses manage trade licenses, IDs, tenancy contracts, VAT files, HR records, vendor files, and contracts with frequent renewals.',
      'Executives need document risk visibility without reading every contract or chasing every department.',
    ],
    whyBuy: [
      'Reduce missed renewals, missing files, and contract blind spots.',
      'Make business records searchable and auditable.',
      'Give teams AI summaries, extracted fields, and approval workflows.',
      'Turn documents into operational intelligence instead of passive storage.',
    ],
    modules: [
      ['Secure Upload Flow', 'Upload documents with categories, owners, folders, tags, validation, and review status.'],
      ['OCR & Classification', 'OCR-ready pipeline for contracts, licenses, IDs, invoices, HR files, and compliance records.'],
      ['AI Extraction', 'Extract dates, parties, amounts, renewal terms, obligations, risky clauses, and required actions.'],
      ['Expiry Tracking', 'Detect expiring records and create reminders before business risk appears.'],
      ['Knowledge Graph', 'Connect records across companies, employees, suppliers, invoices, contracts, and obligations.'],
      ['Source-Grounded Q&A', 'Ask questions against uploaded documents with business context and auditability.'],
    ],
    workflow: ['Document uploaded', 'AI classifies file', 'Fields extracted', 'Risk scored', 'Reviewer approves', 'Renewal task created', 'Executive dashboard updated'],
    health: {
      name: 'Document Compliance Score',
      factors: ['Expired documents', 'Missing documents', 'Approval completion', 'Processing backlog', 'OCR confidence', 'Contract review completion', 'Renewal readiness'],
      executive: ['Expiring soon', 'Missing documentation', 'Approval bottlenecks', 'Contract risk summary', 'Renewal forecast', 'AI recommendations'],
    },
    integrations: ['Google Drive', 'SharePoint', 'OneDrive', 'Dropbox-ready', 'CRM', 'ERP', 'HR Systems', 'Email Ingestion', 'Custom API'],
    tiers: [
      ['Starter', 'Core document teams', ['Document upload', 'OCR-ready flow', 'Classification', 'AI summaries', 'Search', 'Approval workflow', 'Compliance Score']],
      ['Business', 'Department operations', ['Drive integrations', 'SharePoint', 'Expiry reminders', 'Contract analysis', 'Bulk processing', 'API access']],
      ['Enterprise', 'Multi-department governance', ['ERP/HR integrations', 'Custom models', 'Redaction workflows', 'White label', 'Advanced compliance reporting']],
    ],
    demo: ['Upload a sample contract', 'Show extracted fields and summary', 'Review AI risk score', 'Open knowledge graph', 'Ask renewal question', 'Show Compliance Score and report'],
    roadmap: ['Arabic/English contract intelligence', 'Advanced redaction workflows', 'Procurement document matching', 'Department-level compliance maps', 'Custom extraction models'],
    mockLabels: ['Library', 'Risks', 'Renewals', 'Approvals'],
  },
  {
    slug: 'secureops',
    name: 'SecureOps',
    short: 'Sec',
    category: 'AI Virtual CISO and Compliance Command Center',
    position: 'A virtual CISO for SMBs and enterprises that centralizes cyber risk, compliance, incidents, evidence, vulnerabilities, and executive reporting.',
    audience: 'Company owners, IT managers, cybersecurity teams, compliance officers, auditors, risk managers, and executives.',
    promise: 'Make security posture, risk, compliance, and incident readiness understandable to both technical teams and management.',
    theme: {
      ink: '#2f1308',
      accent: '#7c2d12',
      accent2: '#ef4444',
      soft: '#fff0ea',
      paper: '#fffdfb',
      muted: '#634338',
      grid: '#f2d4c7',
    },
    icon: 'SO',
    stats: [
      ['Cyber Risk Score', '84', 'Vulnerabilities, access, controls, and incidents'],
      ['Critical Items', '6', 'Prioritized remediation required'],
      ['Compliance Ready', '73%', 'Evidence and control coverage'],
      ['Report Time', '-65%', 'Board and monthly summaries'],
    ],
    differentiators: [
      ['AI Virtual CISO', 'Explains current risk, biggest weaknesses, priority fixes, compliance gaps, and executive recommendations in plain language.'],
      ['Compliance Readiness', 'ISO 27001, NIST, CIS Controls, SOC 2 readiness, and UAE business security checklist with evidence tracking.'],
      ['Security Evidence Vault', 'Policies, audit evidence, screenshots, vendor documents, compliance files, reports, and responsible owners.'],
      ['Vendor and Employee Risk', 'Vendor register, employee access review, offboarding checklist, MFA tracking, and password policy tracking.'],
    ],
    market: [
      'Small and medium businesses increasingly need security reporting, compliance readiness, and incident visibility without a full internal security department.',
      'Executives need board-level security clarity, while IT teams need practical remediation workflows.',
      'Compliance evidence is often scattered until audit deadlines create urgent operational risk.',
    ],
    whyBuy: [
      'Give management a clear view of current cyber risk.',
      'Centralize vulnerabilities, incidents, evidence, controls, vendors, and remediation.',
      'Prepare for compliance and audit conversations earlier.',
      'Grow from standalone risk tracking into SIEM/API integrations.',
    ],
    modules: [
      ['Cyber Risk Dashboard', 'Track posture, incidents, vulnerabilities, controls, open risks, and remediation status.'],
      ['Incident Timeline', 'Record investigation steps, severity, affected assets, evidence, owner, and closure.'],
      ['Compliance Center', 'Manage controls, evidence, frameworks, owners, gaps, and recommended next steps.'],
      ['Evidence Vault', 'Store policies, audit evidence, reports, screenshots, vendor files, and security documents.'],
      ['Vendor & Access Risk', 'Track vendor risk, employee access reviews, MFA, offboarding, and password policy readiness.'],
      ['SIEM Connector Hub', 'Enterprise-ready structure for Splunk, Wazuh, Sentinel, Elastic, QRadar, API, syslog, email, Teams, and Slack.'],
    ],
    workflow: ['Risk or alert logged', 'Severity calculated', 'Owner assigned', 'Evidence attached', 'AI suggests remediation', 'Compliance gap updated', 'Executive report generated'],
    health: {
      name: 'Cyber Risk Score',
      factors: ['Vulnerabilities', 'Patch status', 'Access risks', 'Compliance status', 'Security incidents', 'Backup readiness', 'User awareness', 'Control coverage'],
      executive: ['Compliance status', 'Open risks', 'Critical vulnerabilities', 'Incident trends', 'Executive risk summary', 'Board-level security report'],
    },
    integrations: ['Splunk', 'Wazuh', 'Microsoft Sentinel', 'Elastic SIEM', 'QRadar', 'Generic Syslog/API', 'Email Alerts', 'Slack', 'Microsoft Teams', 'Custom Webhooks'],
    tiers: [
      ['Starter', 'Security foundations', ['Risk register', 'Incident tracking', 'Vulnerability register', 'Audit logs', 'Compliance dashboard', 'Cyber Risk Score']],
      ['Business', 'Managed operations', ['Asset inventory', 'Remediation tracking', 'Compliance workflows', 'Executive reports', 'AI security assistant', 'API access']],
      ['Enterprise', 'Advanced security leadership', ['SIEM integrations', 'MITRE mapping', 'Custom frameworks', 'Multi-entity management', 'Board reporting', 'Vendor assessments']],
    ],
    demo: ['Open Virtual CISO dashboard', 'Review Cyber Risk Score', 'Open incident timeline', 'Attach evidence', 'Run compliance readiness review', 'Export board-level report'],
    roadmap: ['Threat intelligence enrichment', 'Managed service provider console', 'Automated control evidence checks', 'Security questionnaire automation', 'Advanced executive benchmarking'],
    mockLabels: ['Risks', 'Incidents', 'Evidence', 'Controls'],
  },
];

const esc = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const list = (items) => items.map((item) => `<li>${esc(item)}</li>`).join('');
const badges = (items) => items.map((item) => `<span class="badge">${esc(item)}</span>`).join('');

function flow(items) {
  return items.map((item, index) => `
    <div class="flow-step">
      <span>${String(index + 1).padStart(2, '0')}</span>
      <strong>${esc(item)}</strong>
    </div>
  `).join('');
}

function statCards(product) {
  return product.stats.map(([label, value, text]) => `
    <article class="stat">
      <div>${esc(label)}</div>
      <strong>${esc(value)}</strong>
      <span>${esc(text)}</span>
    </article>
  `).join('');
}

function moduleCards(product) {
  return product.modules.map(([title, text]) => `
    <article class="module">
      <span class="mini-icon">${esc(title.split(' ').map((word) => word[0]).slice(0, 2).join(''))}</span>
      <h3>${esc(title)}</h3>
      <p>${esc(text)}</p>
    </article>
  `).join('');
}

function differentiatorCards(product) {
  return product.differentiators.map(([title, text]) => `
    <article class="feature-card">
      <h3>${esc(title)}</h3>
      <p>${esc(text)}</p>
      <div class="feature-meta">
        <span>Business value</span>
        <span>AI-native</span>
        <span>ROI impact</span>
      </div>
    </article>
  `).join('');
}

function pricingRows(product) {
  const rows = [
    ['Best fit', product.tiers[0][1], product.tiers[1][1], product.tiers[2][1]],
    ['AI features', product.tiers[0][2][3] ?? 'Core AI', product.tiers[1][2].includes('AI summaries') ? 'AI summaries and analytics' : 'Advanced AI insights', 'Advanced AI, custom reporting, and executive intelligence'],
    ['Integrations', 'Manual and core product setup', 'API access, webhooks, and priority integrations', 'Custom integrations, SSO-ready, white label, and enterprise governance'],
    ['Reporting', 'Executive Dashboard Lite', 'Scheduled reports and advanced analytics', 'Board-ready reports, custom reports, and enterprise executive suite'],
    ['Security', 'RBAC and tenant isolation', 'Audit logs, usage limits, and integration controls', 'SSO-ready, retention policies, advanced audit center, and custom security controls'],
  ];

  return rows.map(([feature, starter, business, enterprise]) => `
    <tr>
      <th>${esc(feature)}</th>
      <td>${esc(starter)}</td>
      <td>${esc(business)}</td>
      <td>${esc(enterprise)}</td>
    </tr>
  `).join('');
}

function executiveMockup(product) {
  return `
    <div class="mockup">
      <div class="mock-top">
        <div>
          <span class="mock-kicker">Executive dashboard</span>
          <strong>${esc(product.health.name)}</strong>
        </div>
        <span class="score">${esc(product.stats[0][1])}</span>
      </div>
      <div class="mock-grid">
        ${product.mockLabels.map((label, index) => `
          <div class="mock-card">
            <span>${esc(label)}</span>
            <strong>${index === 0 ? product.stats[1][1] : index === 1 ? product.stats[2][1] : index === 2 ? product.stats[3][1] : 'Live'}</strong>
            <i style="width:${72 - index * 9}%"></i>
          </div>
        `).join('')}
      </div>
      <div class="chart">
        <span style="height:36%"></span>
        <span style="height:58%"></span>
        <span style="height:44%"></span>
        <span style="height:72%"></span>
        <span style="height:63%"></span>
        <span style="height:82%"></span>
        <span style="height:76%"></span>
      </div>
      <div class="insight">
        <b>AI recommendation</b>
        <p>${esc(product.whyBuy[0])} ${esc(product.whyBuy[1])}</p>
      </div>
    </div>
  `;
}

function architectureDiagram(product) {
  return `
    <div class="architecture">
      <div class="arch-node">Customer workspace</div>
      <div class="arch-row">
        <div class="arch-node">Operational modules</div>
        <div class="arch-node">AI copilot</div>
        <div class="arch-node">Executive dashboard</div>
      </div>
      <div class="arch-row">
        <div class="arch-node">Integration Studio</div>
        <div class="arch-node">Workflow engine</div>
        <div class="arch-node">Audit Center</div>
      </div>
      <div class="arch-row">
        <div class="arch-node">API keys</div>
        <div class="arch-node">Webhooks</div>
        <div class="arch-node">Data mapping</div>
      </div>
      <div class="arch-footer">${esc(product.integrations.slice(0, 6).join(' | '))}</div>
    </div>
  `;
}

function page(product, label, inner, className = '') {
  return `
    <section class="page ${className}">
      <div class="page-mark">${esc(product.icon)}</div>
      ${inner}
      <footer>
        <span>${esc(product.name)}</span>
        <span>${esc(label)}</span>
      </footer>
    </section>
  `;
}

function render(product) {
  const t = product.theme;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(product.name)} Investor-Ready Product Brochure</title>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #e8e8e8; }
  body {
    color: ${t.ink};
    font-family: Inter, Aptos, Arial, Helvetica, sans-serif;
    font-size: 10.6pt;
    line-height: 1.42;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 210mm;
    height: 297mm;
    overflow: hidden;
    position: relative;
    page-break-after: always;
    background:
      radial-gradient(circle at 85% 8%, ${t.soft} 0, transparent 30%),
      linear-gradient(180deg, ${t.paper}, #ffffff 46%, ${t.soft});
    padding: 15mm 15mm 14mm;
  }
  .page:last-child { page-break-after: auto; }
  .cover {
    color: #fff;
    background:
      linear-gradient(135deg, ${t.ink}, ${t.accent} 58%, ${t.accent2}),
      ${t.ink};
    padding: 0;
  }
  .cover::before {
    content: "";
    position: absolute;
    inset: 18mm 14mm auto auto;
    width: 74mm;
    height: 74mm;
    border-radius: 28mm;
    border: 1px solid rgba(255,255,255,.28);
    background:
      linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px),
      linear-gradient(0deg, rgba(255,255,255,.12) 1px, transparent 1px);
    background-size: 9mm 9mm;
    transform: rotate(8deg);
  }
  .cover-inner {
    height: 100%;
    padding: 22mm 18mm 18mm;
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 12mm;
    position: relative;
    z-index: 1;
  }
  .eyebrow, .mock-kicker {
    text-transform: uppercase;
    letter-spacing: .14em;
    font-size: 7.5pt;
    font-weight: 800;
  }
  .cover .eyebrow { color: rgba(255,255,255,.76); }
  h1, h2, h3, p { margin: 0; }
  h1 {
    font-size: 43pt;
    line-height: .94;
    letter-spacing: 0;
    max-width: 128mm;
    margin-top: 9mm;
  }
  .subtitle {
    font-size: 16pt;
    line-height: 1.24;
    max-width: 142mm;
    margin-top: 6mm;
    color: rgba(255,255,255,.88);
  }
  .cover-grid {
    display: grid;
    grid-template-columns: 1fr 68mm;
    gap: 10mm;
    align-items: end;
  }
  .cover-promise {
    padding: 8mm;
    border-radius: 7mm;
    background: rgba(255,255,255,.12);
    border: 1px solid rgba(255,255,255,.22);
    backdrop-filter: blur(10px);
    font-size: 14pt;
    line-height: 1.3;
  }
  .cover-panel {
    border-radius: 7mm;
    background: rgba(255,255,255,.94);
    color: ${t.ink};
    padding: 6mm;
    box-shadow: 0 20px 55px rgba(0,0,0,.22);
  }
  .cover-panel strong { display: block; font-size: 28pt; line-height: 1; }
  .brand-row, .badge-row, .feature-meta, .tier-features {
    display: flex;
    flex-wrap: wrap;
    gap: 2.2mm;
  }
  .brand-chip, .badge, .feature-meta span, .tier-features span {
    border-radius: 999px;
    padding: 2.2mm 3.3mm;
    background: rgba(255,255,255,.14);
    border: 1px solid rgba(255,255,255,.2);
    color: inherit;
    font-size: 7.8pt;
    font-weight: 800;
  }
  .badge, .feature-meta span, .tier-features span {
    background: ${t.soft};
    border-color: ${t.grid};
    color: ${t.ink};
  }
  .byline {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 8mm;
    padding-top: 5mm;
    border-top: 1px solid rgba(255,255,255,.25);
    color: rgba(255,255,255,.82);
    font-size: 8.8pt;
  }
  .icon-seal {
    width: 19mm;
    height: 19mm;
    display: grid;
    place-items: center;
    border-radius: 6mm;
    background: #fff;
    color: ${t.accent};
    font-weight: 900;
    font-size: 13pt;
    margin-bottom: 7mm;
  }
  .page-mark {
    position: absolute;
    right: 10mm;
    top: 8mm;
    color: ${t.grid};
    font-size: 42pt;
    line-height: 1;
    font-weight: 900;
    opacity: .42;
  }
  h2 {
    color: ${t.ink};
    font-size: 21pt;
    line-height: 1.05;
    letter-spacing: 0;
    margin-bottom: 4mm;
    max-width: 144mm;
  }
  h3 {
    color: ${t.ink};
    font-size: 10.4pt;
    line-height: 1.22;
    margin-bottom: 2mm;
  }
  .lead {
    max-width: 156mm;
    color: ${t.muted};
    font-size: 11.4pt;
    margin-bottom: 5.5mm;
  }
  .section-title {
    display: flex;
    align-items: center;
    gap: 3mm;
    margin-bottom: 4mm;
  }
  .section-title::before {
    content: "";
    width: 9mm;
    height: 2.2mm;
    border-radius: 999px;
    background: ${t.accent};
  }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3.5mm; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; }
  .stack { display: grid; gap: 4mm; }
  .card, .feature-card, .module, .stat, .tier, .callout {
    border: 1px solid ${t.grid};
    background: rgba(255,255,255,.86);
    border-radius: 5mm;
    box-shadow: 0 10px 28px rgba(21, 28, 35, .05);
  }
  .card, .feature-card, .module, .tier, .callout { padding: 5mm; }
  .feature-card { min-height: 29mm; padding: 3.6mm; }
  .feature-card h3 { font-size: 9.4pt; margin-bottom: 1.1mm; }
  .feature-card p { font-size: 8.35pt; line-height: 1.28; }
  .feature-card p, .module p, .tier p, .card p { color: ${t.muted}; }
  .feature-meta { margin-top: 2mm; gap: 1.3mm; }
  .feature-meta span { font-size: 5.9pt; padding: 1.2mm 1.7mm; }
  .stat {
    padding: 4.5mm;
    min-height: 27mm;
    position: relative;
    overflow: hidden;
  }
  .stat::after {
    content: "";
    position: absolute;
    right: -8mm;
    top: -10mm;
    width: 25mm;
    height: 25mm;
    border-radius: 50%;
    background: ${t.soft};
  }
  .stat div { color: ${t.muted}; font-size: 7.8pt; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; }
  .stat strong { display: block; font-size: 18pt; line-height: 1.05; margin: 2mm 0; color: ${t.ink}; }
  .stat span { color: ${t.muted}; font-size: 8pt; }
  ul.clean {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 2.4mm;
  }
  ul.clean li {
    position: relative;
    padding-left: 6mm;
    color: ${t.muted};
  }
  ul.clean li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 2.3mm;
    width: 3mm;
    height: 3mm;
    border-radius: 50%;
    background: ${t.accent};
  }
  .module {
    min-height: 39mm;
    position: relative;
  }
  .mini-icon {
    display: grid;
    place-items: center;
    width: 10mm;
    height: 10mm;
    border-radius: 3mm;
    background: ${t.soft};
    color: ${t.accent};
    font-size: 7pt;
    font-weight: 900;
    margin-bottom: 3mm;
  }
  .flow {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2mm;
    margin: 6mm 0 8mm;
  }
  .flow-step {
    min-height: 25mm;
    border-radius: 4mm;
    padding: 3mm;
    color: #fff;
    background: linear-gradient(145deg, ${t.ink}, ${t.accent});
    display: grid;
    align-content: space-between;
  }
  .flow-step span { color: rgba(255,255,255,.64); font-size: 7pt; font-weight: 900; }
  .flow-step strong { font-size: 8pt; line-height: 1.16; }
  .callout {
    background: ${t.ink};
    color: #fff;
    border-color: ${t.ink};
  }
  .callout p, .callout li { color: rgba(255,255,255,.78); }
  .callout h3 { color: #fff; }
  .mockup {
    border-radius: 7mm;
    border: 1px solid ${t.grid};
    background: linear-gradient(180deg, #fff, ${t.soft});
    padding: 4mm;
    box-shadow: 0 24px 60px rgba(21, 28, 35, .12);
  }
  .mock-top {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 4mm;
  }
  .mock-top strong { display: block; font-size: 12pt; margin-top: 1mm; }
  .score {
    display: grid;
    place-items: center;
    width: 20mm;
    height: 20mm;
    border-radius: 50%;
    color: #fff;
    background: ${t.accent};
    font-size: 14pt;
    font-weight: 900;
  }
  .mock-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5mm; }
  .mock-card {
    min-height: 19mm;
    border-radius: 4mm;
    padding: 3mm;
    background: #fff;
    border: 1px solid ${t.grid};
  }
  .mock-card span { display: block; color: ${t.muted}; font-size: 7.4pt; font-weight: 800; }
  .mock-card strong { display: block; font-size: 12pt; margin: 1.3mm 0 2mm; }
  .mock-card i {
    display: block;
    height: 1.7mm;
    border-radius: 999px;
    background: ${t.accent};
  }
  .chart {
    height: 33mm;
    margin-top: 4mm;
    border-radius: 4mm;
    background:
      linear-gradient(90deg, ${t.grid} 1px, transparent 1px),
      linear-gradient(0deg, ${t.grid} 1px, transparent 1px),
      rgba(255,255,255,.7);
    background-size: 12mm 12mm;
    display: flex;
    gap: 3mm;
    align-items: end;
    padding: 5mm;
  }
  .chart span { flex: 1; border-radius: 2mm 2mm 0 0; background: linear-gradient(180deg, ${t.accent2}, ${t.accent}); }
  .insight {
    margin-top: 4mm;
    padding: 4mm;
    border-left: 1.4mm solid ${t.accent};
    background: #fff;
    border-radius: 3mm;
  }
  .insight p { color: ${t.muted}; margin-top: 1mm; }
  .architecture {
    display: grid;
    gap: 3mm;
    padding: 5mm;
    border: 1px solid ${t.grid};
    border-radius: 6mm;
    background: #fff;
  }
  .arch-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; }
  .arch-node {
    text-align: center;
    border-radius: 4mm;
    padding: 3.4mm;
    background: ${t.soft};
    border: 1px solid ${t.grid};
    color: ${t.ink};
    font-weight: 900;
    font-size: 8.4pt;
  }
  .arch-footer {
    border-radius: 4mm;
    padding: 3mm;
    text-align: center;
    background: ${t.ink};
    color: #fff;
    font-size: 8pt;
    font-weight: 800;
  }
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;
    border-radius: 5mm;
    border: 1px solid ${t.grid};
    background: #fff;
  }
  th, td {
    vertical-align: top;
    padding: 3.1mm;
    border-right: 1px solid ${t.grid};
    border-bottom: 1px solid ${t.grid};
    font-size: 7.9pt;
    color: ${t.muted};
  }
  th { color: ${t.ink}; background: ${t.soft}; text-align: left; width: 21%; }
  td:last-child, th:last-child { border-right: 0; }
  tr:last-child td, tr:last-child th { border-bottom: 0; }
  .tier { min-height: 56mm; }
  .tier strong { display: block; font-size: 14pt; margin-bottom: 1mm; }
  .tier em { display: block; color: ${t.muted}; font-style: normal; margin-bottom: 3mm; }
  .tier-features span { font-size: 7.2pt; padding: 1.7mm 2.2mm; }
  footer {
    position: absolute;
    left: 15mm;
    right: 15mm;
    bottom: 6.5mm;
    display: flex;
    justify-content: space-between;
    color: ${t.muted};
    font-size: 7.2pt;
    font-weight: 800;
    border-top: 1px solid ${t.grid};
    padding-top: 2.5mm;
  }
  code {
    color: ${t.accent};
    background: ${t.soft};
    border-radius: 1.5mm;
    padding: .6mm 1mm;
  }
</style>
</head>
<body>
  <section class="page cover">
    <div class="cover-inner">
      <div>
        <div class="icon-seal">${esc(product.icon)}</div>
        <div class="eyebrow">Investor-ready commercial SaaS product brochure</div>
        <h1>${esc(product.name)}</h1>
        <p class="subtitle">${esc(product.category)}</p>
        <div class="brand-row" style="margin-top:7mm">
          <span class="brand-chip">Commercial SaaS</span>
          <span class="brand-chip">AI-native workflows</span>
          <span class="brand-chip">Executive dashboards</span>
          <span class="brand-chip">Enterprise-ready</span>
        </div>
      </div>
      <div class="cover-grid">
        <div class="cover-promise">${esc(product.promise)}</div>
        <div class="cover-panel">
          <span class="mock-kicker">Primary score</span>
          <strong>${esc(product.stats[0][1])}</strong>
          <p>${esc(product.health.name)}</p>
        </div>
      </div>
      <div class="byline">
        <div><b>${esc(shared.author)}</b><br>${esc(shared.role)}<br>${esc(shared.location)}</div>
        <div>${esc(shared.contact)}<br>Prepared for investors, enterprise buyers, business owners, partners, and product demonstrations.</div>
      </div>
    </div>
  </section>

  ${page(product, 'Executive Summary', `
    <div class="section-title"><span class="eyebrow">60 second overview</span></div>
    <h2>Built as a serious commercial product, not a demo dashboard.</h2>
    <p class="lead">${esc(product.position)}</p>
    <div class="grid-4">${statCards(product)}</div>
    <div class="grid-2" style="margin-top:7mm">
      <div class="callout">
        <h3>Product overview</h3>
        <p>${esc(product.promise)} The platform supports standalone operations first, then expands through integrations, automation, API access, executive reporting, and enterprise governance.</p>
      </div>
      <div class="card">
        <h3>Ideal customers</h3>
        <p>${esc(product.audience)}</p>
      </div>
    </div>
    <div class="grid-2" style="margin-top:5mm">
      <div class="card">
        <h3>Revenue opportunities</h3>
        <ul class="clean">${list(product.whyBuy)}</ul>
      </div>
      <div class="card">
        <h3>Competitive advantage</h3>
        <ul class="clean">${list(product.differentiators.map(([title]) => title))}</ul>
      </div>
    </div>
  `)}

  ${page(product, 'Market Opportunity', `
    <div class="section-title"><span class="eyebrow">Investor perspective</span></div>
    <h2>Market opportunity and why businesses will buy this.</h2>
    <p class="lead">The buying case is not just software convenience. The product converts operational friction into visibility, automation, accountability, and measurable business outcomes.</p>
    <div class="grid-3">
      ${product.market.map((item) => `<div class="card"><h3>Market signal</h3><p>${esc(item)}</p></div>`).join('')}
    </div>
    <div class="grid-2" style="margin-top:6mm">
      <div>
        <h3 style="margin-bottom:3mm">Business value drivers</h3>
        <ul class="clean">${list(product.whyBuy)}</ul>
      </div>
      ${executiveMockup(product)}
    </div>
  `)}

  ${page(product, 'AI Differentiation', `
    <div class="section-title"><span class="eyebrow">AI-native product design</span></div>
    <h2>AI is embedded inside the workflow, not bolted on as a generic chatbot.</h2>
    <p class="lead">${esc(product.name)} uses AI to explain data, recommend next actions, summarize activity, trigger workflows, and produce management-ready reporting.</p>
    <div class="grid-2">${differentiatorCards(product)}</div>
  `)}

  ${page(product, 'Core Modules', `
    <div class="section-title"><span class="eyebrow">Product architecture</span></div>
    <h2>Core modules focused on outcomes.</h2>
    <p class="lead">Each module exists to improve revenue, productivity, visibility, security, automation, or executive decision making.</p>
    <div class="grid-3">${moduleCards(product)}</div>
  `)}

  ${page(product, 'Workflow', `
    <div class="section-title"><span class="eyebrow">Operating model</span></div>
    <h2>From daily work to executive visibility.</h2>
    <p class="lead">The customer can start with standalone mode and later connect external systems. Integrations enhance the workflow but are not required for basic operations.</p>
    <div class="flow">${flow(product.workflow)}</div>
    <div class="grid-2">
      <div class="callout">
        <h3>Standalone mode</h3>
        <p>Manual records, demo data, dashboards, reports, guided onboarding, roles, audit activity, and product-specific workflows are usable immediately.</p>
      </div>
      <div class="callout">
        <h3>Integrated mode</h3>
        <p>Integration Studio adds marketplace connectors, OAuth apps, API keys, webhooks, event triggers, integration logs, and data mapping.</p>
      </div>
    </div>
    <div class="grid-4" style="margin-top:5mm">
      <div class="card"><h3>Customer pays</h3><p>Checkout begins subscription setup.</p></div>
      <div class="card"><h3>Workspace created</h3><p>Tenant data is scoped and isolated.</p></div>
      <div class="card"><h3>Roles created</h3><p>Owner, Admin, Manager, Analyst, Agent, Viewer.</p></div>
      <div class="card"><h3>Onboarding starts</h3><p>Demo data and guided setup reduce time to value.</p></div>
    </div>
  `)}

  ${page(product, 'Executive Intelligence', `
    <div class="section-title"><span class="eyebrow">Management view</span></div>
    <h2>${esc(product.health.name)} and executive reporting.</h2>
    <p class="lead">The score is designed to be understood in under 30 seconds and used in dashboards, monthly summaries, scheduled reports, AI summaries, and investor or owner conversations.</p>
    <div class="grid-2">
      ${executiveMockup(product)}
      <div class="stack">
        <div class="card">
          <h3>Score inputs</h3>
          <ul class="clean">${list(product.health.factors)}</ul>
        </div>
        <div class="card">
          <h3>Executive KPIs</h3>
          <ul class="clean">${list(product.health.executive)}</ul>
        </div>
      </div>
    </div>
  `)}

  ${page(product, 'Integration Studio', `
    <div class="section-title"><span class="eyebrow">Enterprise integration layer</span></div>
    <h2>Marketplace, API framework, webhooks, OAuth, logs, and data mapping.</h2>
    <p class="lead">Data mapping is treated as a first-class capability so companies can map external fields, such as <code>first_name</code>, into product-specific fields without painful custom work.</p>
    <div class="grid-2">
      ${architectureDiagram(product)}
      <div class="stack">
        <div class="card"><h3>API rate management</h3><p>Requests today, monthly requests, top endpoints, rate limit status, and webhook success rate.</p></div>
        <div class="card"><h3>Audit Trail System</h3><p>Who changed what, when, from where, previous value, and new value across sensitive business actions.</p></div>
        <div class="card"><h3>Enterprise controls</h3><p>SAML-ready, Azure AD, Microsoft Entra, Google Workspace SSO, Okta, retention, archive, and backup policy structure.</p></div>
      </div>
    </div>
    <div class="badge-row" style="margin-top:5mm">${badges(product.integrations)}</div>
  `)}

  ${page(product, 'Commercial Model', `
    <div class="section-title"><span class="eyebrow">Pricing architecture</span></div>
    <h2>Subscription path from small business to enterprise.</h2>
    <p class="lead">The tier model supports simple adoption, professional operations, advanced integrations, and enterprise security without requiring a major redesign.</p>
    <div class="grid-3">
      ${product.tiers.map(([name, fit, features]) => `
        <div class="tier">
          <strong>${esc(name)}</strong>
          <em>${esc(fit)}</em>
          <div class="tier-features">${features.map((item) => `<span>${esc(item)}</span>`).join('')}</div>
        </div>
      `).join('')}
    </div>
    <div style="margin-top:5mm">
      <table>
        <thead>
          <tr><th>Capability</th><th>Starter</th><th>Business</th><th>Enterprise</th></tr>
        </thead>
        <tbody>${pricingRows(product)}</tbody>
      </table>
    </div>
  `)}

  ${page(product, 'Scalability & Expansion', `
    <div class="section-title"><span class="eyebrow">Enterprise readiness</span></div>
    <h2>Designed to scale beyond a single customer demo.</h2>
    <p class="lead">The product foundation supports tenant provisioning, role-based operations, secure integrations, workflow automation, reporting, white label readiness, and customer success systems.</p>
    <div class="grid-2">
      <div class="card">
        <h3>Scalability</h3>
        <ul class="clean">
          <li>Multi-tenant company workspaces</li>
          <li>Scoped data access by customer workspace</li>
          <li>Usage limits and feature gating</li>
          <li>Scheduled reports and executive exports</li>
          <li>API and webhook extension layer</li>
        </ul>
      </div>
      <div class="card">
        <h3>Future expansion potential</h3>
        <ul class="clean">${list(product.roadmap)}</ul>
      </div>
    </div>
    <div class="grid-3" style="margin-top:5mm">
      <div class="card"><h3>Customer Success Center</h3><p>Knowledge base, guides, release notes, support tickets, feature requests, and product updates.</p></div>
      <div class="card"><h3>Enterprise Readiness Score</h3><p>Admin-only score for security, integrations, automation, reporting, data quality, and user adoption.</p></div>
      <div class="card"><h3>Notification Engine</h3><p>Email, WhatsApp, SMS, webhook, Slack, Microsoft Teams, and in-app notification structure.</p></div>
    </div>
  `)}

  ${page(product, 'Demo Agenda', `
    <div class="section-title"><span class="eyebrow">Presentation-ready walkthrough</span></div>
    <h2>Demo flow for owners, investors, partners, and enterprise buyers.</h2>
    <p class="lead">The demo should focus on business outcomes first, then show product depth, integrations, automation, and executive reporting.</p>
    <div class="flow">${flow(product.demo)}</div>
    <div class="grid-2">
      <div class="callout">
        <h3>Buyer message</h3>
        <p>${esc(product.name)} is a commercial SaaS product that can operate standalone, integrate with existing systems, support subscriptions, enforce security, and deliver executive-level visibility.</p>
      </div>
      <div class="card">
        <h3>Next step</h3>
        <p>Run a private demo using realistic business data, show the executive dashboard, explain the health score, and finish with Integration Studio plus enterprise controls.</p>
      </div>
    </div>
    <div class="grid-4" style="margin-top:5mm">
      <div class="stat"><div>Build</div><strong>SaaS</strong><span>Commercial architecture</span></div>
      <div class="stat"><div>Security</div><strong>RBAC</strong><span>Audit and isolation</span></div>
      <div class="stat"><div>AI</div><strong>Native</strong><span>Workflow recommendations</span></div>
      <div class="stat"><div>Scale</div><strong>API</strong><span>Integrations and webhooks</span></div>
    </div>
  `)}
</body>
</html>`;
}

async function assertNoOverflow(page, product) {
  const issues = await page.evaluate(() => {
    const result = [];
    document.querySelectorAll('.page').forEach((pageEl, index) => {
      const pageBox = pageEl.getBoundingClientRect();
      if (pageEl.scrollHeight > pageEl.clientHeight + 2 || pageEl.scrollWidth > pageEl.clientWidth + 2) {
        result.push(`page ${index + 1} scroll overflow`);
      }
      pageEl.querySelectorAll('*').forEach((el) => {
        const box = el.getBoundingClientRect();
        if (box.width === 0 || box.height === 0) return;
        if (box.right > pageBox.right + 2 || box.left < pageBox.left - 2 || box.bottom > pageBox.bottom + 2 || box.top < pageBox.top - 2) {
          result.push(`page ${index + 1} element ${el.tagName}.${el.className || ''} outside page bounds`);
        }
      });
    });
    return result.slice(0, 20);
  });

  if (issues.length > 0) {
    throw new Error(`${product.name} brochure layout issues:\n${issues.join('\n')}`);
  }
}

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();

for (const product of products) {
  const html = render(product);
  const htmlPath = path.join(outputDir, `${product.slug}-brochure.html`);
  const pdfPath = path.join(outputDir, `${product.slug}-brochure.pdf`);

  await writeFile(htmlPath, html, 'utf8');

  const pageInstance = await browser.newPage({ viewport: { width: 1240, height: 1754 }, deviceScaleFactor: 1 });
  await pageInstance.setContent(html, { waitUntil: 'networkidle' });
  await assertNoOverflow(pageInstance, product);
  await pageInstance.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
  });
  await pageInstance.close();
}

await browser.close();

console.log(`Generated ${products.length} investor-ready product brochures in ${outputDir}`);
