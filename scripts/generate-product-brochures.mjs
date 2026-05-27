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
      paper: '#f2fbf7',
      card: '#f6fffb',
      muted: '#213f38',
      grid: '#d7eee6',
    },
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
      paper: '#fff8ea',
      card: '#fffaf0',
      muted: '#3f2a12',
      grid: '#f4dfbc',
    },
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
      paper: '#f1f6ff',
      card: '#f7fbff',
      muted: '#1f355f',
      grid: '#d7e5ff',
    },
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
      ink: '#0f1f2e',
      accent: '#2563eb',
      accent2: '#14b8a6',
      soft: '#e8f3ff',
      paper: '#f0f7fb',
      card: '#f7fbff',
      muted: '#1e3448',
      grid: '#cfe2f3',
    },
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

const implementationStatus = {
  'aura-command': [
    ['Implemented', 'Standalone revenue CRM', 'Manual lead creation, contact management, shared inbox workflow, pipeline stages, team assignment, follow-up tasks, templates, notes, reports, audit logs, and demo data work without Meta WhatsApp connected.', 'No external API required'],
    ['Implemented when configured', 'WhatsApp Cloud API', 'Webhook verification, inbound/outbound messaging, template handoff, delivery status, and failure handling are provider-backed integration workflows.', 'Meta WhatsApp Cloud API credentials required'],
    ['Beta', 'Voice Note Intelligence', 'Audio upload/storage and manual transcript fallback are demo-safe. Live transcription is connected through Whisper or Azure Speech when credentials are provided.', 'OpenAI Whisper or Azure Speech required for live transcription'],
    ['Beta', 'Revenue Health, SLA, missed leads', 'Internal scoring and gap-analysis use response activity, failed messages, unassigned leads, follow-up activity, lead aging, and assignment signals.', 'No external API required; WhatsApp events improve accuracy'],
    ['Roadmap / client-funded', 'CRM synchronization', 'HubSpot, Zoho, Salesforce, and Pipedrive are represented through connector readiness and manual import/export. Production bidirectional sync, mapping, logs, and conflicts require provider setup.', 'CRM OAuth/API credentials required'],
  ],
  siteflow: [
    ['Implemented', 'Standalone construction operations', 'Projects, daily reports, snags, materials, contractors, safety observations, approvals, tasks, photos/files, reports, audit logs, and manual project mode work without Procore or ERP.', 'No external API required'],
    ['Beta', 'Delay Prediction Engine', 'Deterministic delay risk uses project schedule status, open snags, material delays, approval delays, and contractor score data.', 'No external API required; weather/provider data can improve forecasts'],
    ['Beta', 'UAE Workflow Engine', 'Approval records, owners, statuses, comments, and templates for municipality, consultant, safety, snag, and variation approvals are workflow-ready.', 'No external API required'],
    ['Beta', 'Client-ready reporting and contractor scoring', 'PDF/report categories, executive summaries, progress snapshots, contractor rankings, pending tasks, and risk indicators are generated from internal project data.', 'No external API required'],
    ['Roadmap / client-funded', 'Voice site updates and enterprise integrations', 'Manual transcript/rough notes and photo reports work today. Live voice transcription, Autodesk, Procore, ERP, accounting, and WhatsApp intake require provider setup.', 'Speech, ERP, Procore/Autodesk, or Aura/WhatsApp credentials required'],
  ],
  documind: [
    ['Implemented', 'Standalone document platform', 'Manual upload, categories, tags, secure storage, manual metadata, expiry tracking, review queue, search, notes, audit logs, dashboard analytics, and demo UAE documents work locally.', 'No external API required'],
    ['Beta', 'OCR Pipeline', 'OCR abstraction, processing job, confidence scores, review queue status, error handling, and manual metadata fallback are present.', 'Azure Document Intelligence, Google Document AI, AWS Textract, or Tesseract setup required for production OCR'],
    ['Beta', 'Source-grounded Q&A', 'Answers use extracted/demo text with source document IDs and query history. Stronger citation confidence and chunk persistence are marked as in progress.', 'AI provider optional; stronger production answers need configured model/provider'],
    ['Beta', 'AI Risk Scoring', 'Expiry risk, low-confidence review signals, compliance dashboard widgets, and executive recommendations are generated from internal document data.', 'No external API required'],
    ['Roadmap', 'Knowledge graph and bilingual processing', 'Graph nodes/edges, visual graph view, Arabic OCR/search analyzers, and mixed-language extraction are not presented as finished production modules.', 'OCR/search provider and implementation work required'],
  ],
  secureops: [
    ['Implemented', 'Standalone defensive GRC', 'Asset inventory, risk register, incidents, vulnerabilities, controls, evidence files, policy library, executive dashboard, audit logs, reports, API keys, and manual security posture mode work without SIEM.', 'No external API required'],
    ['Beta', 'AI Virtual CISO', 'Plain-language executive risk summaries, weekly recommendations, board-ready explanations, compliance guidance, and action plans are generated from internal risk and incident data.', 'AI provider optional'],
    ['Beta', 'Vendor and employee risk', 'Vendor-access risks, employee training status, policy acknowledgements, phishing signals, employee scores, and department scores are demo/backend-backed.', 'No external API required'],
    ['Roadmap', 'MITRE ATT&CK mapping', 'Technique associations, incident/control mapping, matrix UI, and coverage heatmap are clearly roadmap until the structured mapping layer is completed.', 'No external API required, but implementation work required'],
    ['Roadmap / client-funded', 'SIEM connector hub', 'Manual security event mode works today. Wazuh, Splunk, Elastic, and Microsoft Sentinel ingestion require provider credentials and paid integration work.', 'SIEM/API credentials required'],
  ],
};

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

function problemCards(product) {
  return product.market.map((item, index) => `
    <article class="problem-card">
      <span>${String(index + 1).padStart(2, '0')}</span>
      <h3>${index === 0 ? 'Operational pressure' : index === 1 ? 'Decision gap' : 'Commercial risk'}</h3>
      <p>${esc(item)}</p>
    </article>
  `).join('');
}

function productFeatures(product) {
  const idealUser = product.audience.split(',').slice(0, 3).join(', ');
  const hero = product.differentiators.map(([title, text], index) => ({
    tier: 'Tier 1',
    title,
    what: text,
    value: product.whyBuy[index % product.whyBuy.length],
    user: idealUser,
    advantage: `Purpose-built for ${product.short} workflows instead of a generic dashboard or spreadsheet process.`,
    roi: product.stats[(index % 3) + 1][2],
  }));

  const core = product.modules.slice(0, 6).map(([title, text], index) => ({
    tier: 'Tier 2',
    title,
    what: text,
    value: product.whyBuy[index % product.whyBuy.length],
    user: product.audience.split(',')[index % product.audience.split(',').length].trim(),
    advantage: `Connects directly into ${product.name}'s operating workflow and executive reporting.`,
    roi: ['Less manual work', 'Faster decisions', 'Higher accountability', 'Better reporting', 'Reduced operational risk', 'Improved team visibility'][index],
  }));

  const supporting = [
    ['Integration Studio', 'Marketplace, OAuth apps, API keys, webhooks, event triggers, integration logs, and data mapping.'],
    ['Audit Center', 'Tracks who changed what, when, from where, and the previous and new values for sensitive actions.'],
    ['Scheduled Reports', 'Exports executive summaries and recurring reports for owners, managers, and stakeholders.'],
    ['Enterprise Controls', 'SSO-ready structure, retention policies, white label readiness, role governance, and API controls.'],
  ].map(([title, text], index) => ({
    tier: 'Tier 3',
    title,
    what: text,
    value: ['Improves implementation speed', 'Improves trust and accountability', 'Improves management visibility', 'Improves enterprise readiness'][index],
    user: ['Admins and integration owners', 'Owners, admins, auditors', 'Executives and department heads', 'Enterprise buyers and IT teams'][index],
    advantage: 'Built into the product architecture rather than handled as disconnected custom work.',
    roi: ['Lower integration cost', 'Lower audit effort', 'Less reporting time', 'Higher enterprise buyer confidence'][index],
  }));

  return { hero, core, supporting };
}

function featureCard(feature, variant = '') {
  return `
    <article class="explain-card ${variant}">
      <div class="feature-heading">
        <span>${esc(feature.tier)}</span>
        <h3>${esc(feature.title)}</h3>
      </div>
      <div class="explain-grid">
        <div><b>What it does</b><p>${esc(feature.what)}</p></div>
        <div><b>Business value</b><p>${esc(feature.value)}</p></div>
        <div><b>Ideal user</b><p>${esc(feature.user)}</p></div>
        <div><b>Competitive advantage</b><p>${esc(feature.advantage)}</p></div>
        <div><b>ROI impact</b><p>${esc(feature.roi)}</p></div>
      </div>
    </article>
  `;
}

function supportingFeatureGrid(features) {
  return features.map((feature) => `
    <article class="support-card">
      <span>${esc(feature.tier)}</span>
      <h3>${esc(feature.title)}</h3>
      <p><b>What it does:</b> ${esc(feature.what)}</p>
      <p><b>Value:</b> ${esc(feature.value)}</p>
      <p><b>ROI:</b> ${esc(feature.roi)}</p>
    </article>
  `).join('');
}

function statusClass(status) {
  const normalized = status.toLowerCase();
  if (normalized.includes('implemented')) return 'implemented';
  if (normalized.includes('roadmap')) return 'roadmap';
  return 'beta';
}

function implementationStatusCards(product) {
  return (implementationStatus[product.slug] ?? []).map(([status, title, explanation, requirement]) => `
    <article class="status-card ${statusClass(status)}">
      <div class="status-top">
        <span>${esc(status)}</span>
        <h3>${esc(title)}</h3>
      </div>
      <p>${esc(explanation)}</p>
      <div class="requirement"><b>API / setup requirement:</b> ${esc(requirement)}</div>
    </article>
  `).join('');
}

function comparison(product) {
  const map = {
    'aura-command': {
      traditional: ['Multiple employees checking separate phones', 'Slow responses and inconsistent ownership', 'Manual follow-ups, spreadsheets, and weak CRM discipline'],
      product: ['AI workforce modes inside WhatsApp operations', 'Instant visibility, SLA timers, assignment, and escalation', 'Automated workflows, CRM sync, health score, and revenue reporting'],
    },
    siteflow: {
      traditional: ['Manual site reports and scattered photos', 'Spreadsheet tracking for snags, materials, and approvals', 'Delayed decisions after budget or timeline damage is visible'],
      product: ['AI site reporting from text, photos, and voice updates', 'Live dashboards for projects, contractors, snags, safety, and materials', 'Predictive delay, budget, and subcontractor risk insights'],
    },
    documind: {
      traditional: ['Folder searching across drives and inboxes', 'Manual document review and renewal tracking', 'Compliance risk from missing, expired, or duplicated records'],
      product: ['AI search, classification, and source-grounded Q&A', 'Document intelligence with extraction, summaries, risk scores, and approvals', 'Automated expiry, obligation, and compliance tracking'],
    },
    secureops: {
      traditional: ['Expensive consultants and fragmented security tools', 'Complex technical dashboards that executives cannot act on', 'Manual compliance evidence collection and reporting'],
      product: ['AI Virtual CISO that explains risk in executive language', 'Unified cyber risk, incidents, vulnerabilities, evidence, and controls', 'Automated board reports, readiness scores, and remediation guidance'],
    },
  };

  return map[product.slug];
}

function page(product, label, inner, className = '') {
  return `
    <section class="page ${className}">
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
  const features = productFeatures(product);
  const vs = comparison(product);
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
      radial-gradient(circle at 96% 0%, ${t.soft} 0, transparent 24%),
      linear-gradient(180deg, ${t.paper}, ${t.card ?? t.paper} 52%, ${t.soft});
    padding: 15mm 15mm 14mm;
  }
  .page > * {
    position: relative;
    z-index: 1;
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
  .cover .eyebrow { color: rgba(255,255,255,.9); }
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
    color: rgba(255,255,255,.96);
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
    background: ${t.card ?? t.paper};
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
    color: rgba(255,255,255,.92);
    font-size: 8.8pt;
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
    background: ${t.card ?? t.paper};
    border-radius: 5mm;
    box-shadow: 0 10px 28px rgba(21, 28, 35, .05);
  }
  .card, .feature-card, .module, .tier, .callout { padding: 4.4mm; }
  .feature-card { min-height: 29mm; padding: 3.6mm; }
  .feature-card h3 { font-size: 9.4pt; margin-bottom: 1.1mm; }
  .feature-card p { font-size: 8.35pt; line-height: 1.28; }
  .feature-card p, .module p, .tier p, .card p { color: ${t.muted}; }
  .feature-meta { margin-top: 2mm; gap: 1.3mm; }
  .feature-meta span { font-size: 5.9pt; padding: 1.2mm 1.7mm; }
  .problem-card {
    min-height: 38mm;
    padding: 4.5mm;
    border-radius: 5mm;
    background: ${t.card ?? t.paper};
    border: 1px solid ${t.grid};
    box-shadow: 0 10px 28px rgba(21, 28, 35, .05);
  }
  .problem-card span, .explain-card .feature-heading span, .support-card span {
    color: ${t.accent};
    font-size: 7pt;
    font-weight: 900;
    letter-spacing: .09em;
    text-transform: uppercase;
  }
  .problem-card p { color: ${t.muted}; margin-top: 2mm; }
  .explain-card {
    border: 1px solid ${t.grid};
    border-radius: 5mm;
    background: ${t.card ?? t.paper};
    padding: 4.3mm;
    box-shadow: 0 10px 28px rgba(21, 28, 35, .05);
  }
  .explain-card.hero {
    background: linear-gradient(145deg, ${t.card ?? t.paper}, ${t.soft});
    border-left: 1.7mm solid ${t.accent};
  }
  .feature-heading {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 4mm;
    margin-bottom: 3mm;
  }
  .feature-heading h3 {
    font-size: 12pt;
    margin: 0;
  }
  .explain-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.7mm;
  }
  .explain-grid div {
    padding: 3mm;
    border-radius: 3.5mm;
    background: rgba(255,255,255,.42);
    border: 1px solid ${t.grid};
  }
  .explain-grid b {
    display: block;
    color: ${t.ink};
    font-size: 7.4pt;
    text-transform: uppercase;
    letter-spacing: .07em;
    margin-bottom: 1mm;
  }
  .explain-grid p {
    color: ${t.muted};
    font-size: 8.15pt;
    line-height: 1.27;
  }
  .support-card {
    min-height: 39mm;
    padding: 4mm;
    border-radius: 5mm;
    border: 1px solid ${t.grid};
    background: ${t.card ?? t.paper};
  }
  .support-card p {
    color: ${t.muted};
    font-size: 8pt;
    line-height: 1.28;
    margin-top: 1.7mm;
  }
  .status-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3mm;
  }
  .status-card {
    border: 1px solid ${t.grid};
    border-left: 1.8mm solid ${t.accent};
    border-radius: 4.5mm;
    background: ${t.card ?? t.paper};
    padding: 3.5mm 4mm;
    box-shadow: 0 10px 26px rgba(21, 28, 35, .05);
  }
  .status-card.beta { border-left-color: #b7791f; }
  .status-card.roadmap { border-left-color: #64748b; }
  .status-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5mm;
    margin-bottom: 1.8mm;
  }
  .status-top span {
    flex: 0 0 auto;
    border-radius: 999px;
    padding: 1.5mm 2.4mm;
    background: ${t.soft};
    border: 1px solid ${t.grid};
    color: ${t.ink};
    font-size: 6.9pt;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: .06em;
  }
  .status-top h3 { margin: 0; font-size: 10.2pt; }
  .status-card p {
    color: ${t.muted};
    font-size: 8.3pt;
    line-height: 1.3;
  }
  .requirement {
    margin-top: 2mm;
    border-radius: 3mm;
    background: rgba(255,255,255,.48);
    border: 1px solid ${t.grid};
    color: ${t.muted};
    padding: 2mm 2.4mm;
    font-size: 7.8pt;
    line-height: 1.28;
  }
  .requirement b { color: ${t.ink}; }
  .vs-table {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5mm;
    margin-top: 5mm;
  }
  .vs-column {
    border-radius: 6mm;
    padding: 5mm;
    border: 1px solid ${t.grid};
    background: ${t.card ?? t.paper};
  }
  .vs-column.product {
    color: #fff;
    background: linear-gradient(145deg, ${t.ink}, ${t.accent});
    border-color: ${t.accent};
  }
  .vs-column.product h3, .vs-column.product li { color: #fff; }
  .vs-column h3 { font-size: 14pt; margin-bottom: 4mm; }
  .vs-column ul { margin: 0; padding-left: 5mm; display: grid; gap: 4mm; }
  .vs-column li { color: ${t.muted}; font-size: 11pt; }
  .stat {
    padding: 4mm;
    min-height: 25mm;
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
    z-index: 0;
    opacity: .55;
  }
  .stat > * {
    position: relative;
    z-index: 1;
  }
  .stat div { color: ${t.muted}; font-size: 7.8pt; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; }
  .stat strong { display: block; font-size: 18pt; line-height: 1.05; margin: 2mm 0; color: ${t.ink}; }
  .stat span { color: ${t.muted}; font-size: 8pt; }
  ul.clean {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 1.75mm;
  }
  ul.clean li {
    position: relative;
    padding-left: 6mm;
    color: ${t.muted};
    font-size: 9.4pt;
    line-height: 1.26;
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
  .flow-step span { color: rgba(255,255,255,.86); font-size: 7pt; font-weight: 900; }
  .flow-step strong { font-size: 8pt; line-height: 1.16; }
  .callout {
    background: ${t.ink};
    color: #fff;
    border-color: ${t.ink};
  }
  .callout p, .callout li { color: rgba(255,255,255,.9); }
  .callout h3 { color: #fff; }
  .mockup {
    border-radius: 7mm;
    border: 1px solid ${t.grid};
    background: linear-gradient(180deg, ${t.card ?? t.paper}, ${t.soft});
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
    background: ${t.paper};
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
      rgba(255,255,255,.35);
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
    background: ${t.card ?? t.paper};
    border-radius: 3mm;
  }
  .insight p { color: ${t.muted}; margin-top: 1mm; }
  .architecture {
    display: grid;
    gap: 3mm;
    padding: 5mm;
    border: 1px solid ${t.grid};
    border-radius: 6mm;
    background: ${t.card ?? t.paper};
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
    background: ${t.card ?? t.paper};
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
    display: flex;
    justify-content: space-between;
    color: ${t.muted};
    font-size: 7.2pt;
    font-weight: 800;
    border-top: 1px solid ${t.grid};
    padding-top: 2.5mm;
    margin-top: 4mm;
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
    <div class="grid-2" style="margin-top:5mm">
      <div class="callout">
        <h3>Product overview</h3>
        <p>${esc(product.promise)} The platform supports standalone operations first, then expands through integrations, automation, API access, executive reporting, and enterprise governance.</p>
      </div>
      <div class="card">
        <h3>Ideal customers</h3>
        <p>${esc(product.audience)}</p>
      </div>
    </div>
    <div class="grid-2" style="margin-top:3.5mm">
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

  ${page(product, 'Business Problem', `
    <div class="section-title"><span class="eyebrow">Problem</span></div>
    <h2>The current operating model is too fragmented for modern businesses.</h2>
    <p class="lead">The problem is not a lack of software. The problem is that daily work, decision data, reporting, and accountability are split across disconnected tools and manual habits.</p>
    <div class="grid-3">${problemCards(product)}</div>
    <div class="callout" style="margin-top:6mm">
      <h3>Investor lens</h3>
      <p>This creates a clear opportunity for a focused SaaS product that turns scattered operational work into structured workflows, executive visibility, and measurable outcomes.</p>
    </div>
  `)}

  ${page(product, 'Market Challenges', `
    <div class="section-title"><span class="eyebrow">Current market challenges</span></div>
    <h2>Why the market is ready for ${esc(product.name)}.</h2>
    <p class="lead">Companies want productivity, automation, security, and reporting without hiring large teams or paying for complicated enterprise platforms that are hard to adopt.</p>
    <div class="grid-2">
      <div class="card">
        <h3>Buying pressure</h3>
        <ul class="clean">${list(product.whyBuy)}</ul>
      </div>
      ${executiveMockup(product)}
    </div>
  `)}

  ${page(product, 'Product Solution', `
    <div class="section-title"><span class="eyebrow">Solution</span></div>
    <h2>${esc(product.name)} converts daily operations into an AI-native business system.</h2>
    <p class="lead">${esc(product.promise)} The platform starts as a standalone operating system and expands into integrations, automation, executive reporting, and enterprise controls.</p>
    <div class="flow">${flow(product.workflow)}</div>
    <div class="grid-2">
      <div class="callout">
        <h3>Standalone value</h3>
        <p>Teams can use the product immediately with manual records, guided onboarding, demo data, dashboards, reports, roles, and product-specific workflows.</p>
      </div>
      <div class="callout">
        <h3>Integrated value</h3>
        <p>Admins can connect existing systems through API keys, OAuth apps, webhooks, event triggers, integration logs, and data mapping.</p>
      </div>
    </div>
  `)}

  ${page(product, 'Hero Features', `
    <div class="section-title"><span class="eyebrow">Tier 1 feature explanations</span></div>
    <h2>Hero features that create the strongest buying reason.</h2>
    <p class="lead">These are the features that should lead investor and customer conversations because they explain differentiation, business value, and ROI impact quickly.</p>
    <div class="stack">
      ${features.hero.slice(0, 2).map((feature) => featureCard(feature, 'hero')).join('')}
    </div>
  `)}

  ${page(product, 'Core Features', `
    <div class="section-title"><span class="eyebrow">Tier 2 feature explanations</span></div>
    <h2>Core features that make the product useful every day.</h2>
    <p class="lead">These modules support the daily user workflow while still feeding executive dashboards, reports, audit trails, and AI recommendations.</p>
    <div class="grid-2">
      ${features.core.slice(0, 4).map((feature) => featureCard(feature)).join('')}
    </div>
  `)}

  ${page(product, 'Advanced AI Features', `
    <div class="section-title"><span class="eyebrow">AI-native capabilities</span></div>
    <h2>AI features explained for business owners and investors.</h2>
    <p class="lead">${esc(product.name)} uses AI to summarize activity, explain dashboard data, recommend next actions, flag risks or opportunities, and support workflow automation.</p>
    <div class="grid-2">
      ${features.hero.slice(2).concat(features.core.slice(4, 6)).map((feature) => featureCard(feature, 'hero')).join('')}
    </div>
  `)}

  ${page(product, 'Integrations', `
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

  ${page(product, 'Business Benefits', `
    <div class="section-title"><span class="eyebrow">Business benefits</span></div>
    <h2>Clear value for owners, teams, and executives.</h2>
    <p class="lead">The value story is designed to be understood quickly: less manual effort, better visibility, faster decisions, and stronger governance.</p>
    <div class="grid-2">
      ${features.supporting.map((feature) => featureCard(feature)).join('')}
    </div>
  `)}

  ${page(product, 'Competitive Advantage', `
    <div class="section-title"><span class="eyebrow">Traditional solution vs our product</span></div>
    <h2>Why ${esc(product.name)} is more compelling than manual operations or generic tools.</h2>
    <p class="lead">The competitive advantage is workflow depth: each product is designed around a specific business domain, with AI, dashboards, automation, integrations, and executive reporting built into the same operating model.</p>
    <div class="vs-table">
      <div class="vs-column">
        <h3>Traditional solution</h3>
        <ul>${list(vs.traditional)}</ul>
      </div>
      <div class="vs-column product">
        <h3>${esc(product.name)}</h3>
        <ul>${list(vs.product)}</ul>
      </div>
    </div>
    <div class="grid-3" style="margin-top:7mm">
      <div class="card"><h3>Defensible workflow depth</h3><p>Each capability is tied to a specific customer workflow, which makes the product harder to replace with a generic dashboard.</p></div>
      <div class="card"><h3>Executive-level clarity</h3><p>Health scores, KPI cards, AI recommendations, and reports make the product understandable to owners within minutes.</p></div>
      <div class="card"><h3>Expansion path</h3><p>Customers can start with standalone workflows, then expand into automation, integrations, API access, and enterprise controls.</p></div>
    </div>
  `)}

  ${page(product, 'Subscription Tiers', `
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

  ${page(product, 'Enterprise Features', `
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

  ${page(product, 'Implementation Status', `
    <div class="section-title"><span class="eyebrow">Readiness and API requirements</span></div>
    <h2>What is live today, what is Beta, and what needs client credentials.</h2>
    <p class="lead">This page prevents overpromising during investor and buyer conversations. The product can be shown as a standalone SaaS today, while provider-backed integrations are clearly marked for setup or paid implementation.</p>
    <div class="status-grid">
      ${implementationStatusCards(product)}
    </div>
  `)}

  ${page(product, 'Security Features', `
    <div class="section-title"><span class="eyebrow">Security and trust</span></div>
    <h2>Security features explained in business language.</h2>
    <p class="lead">Enterprise buyers need confidence that the product protects customer data, controls user access, records sensitive activity, and can support governance requirements.</p>
    <div class="grid-2">
      <div class="card"><h3>RBAC and tenant isolation</h3><p><b>What it does:</b> keeps each company workspace, users, records, reports, settings, and integrations scoped to that company.</p><p><b>Business value:</b> reduces cross-company data exposure risk and supports enterprise governance.</p></div>
      <div class="card"><h3>Audit Trail System</h3><p><b>What it does:</b> records who changed what, when, from where, and previous/new values for sensitive actions.</p><p><b>ROI impact:</b> lowers audit preparation effort and increases buyer confidence.</p></div>
      <div class="card"><h3>API and webhook security</h3><p><b>What it does:</b> supports scoped API keys, webhook signatures, event logs, retries, and rate management.</p><p><b>Competitive advantage:</b> makes integrations professional enough for enterprise buyers.</p></div>
      <div class="card"><h3>Enterprise controls</h3><p><b>What it does:</b> supports SSO-ready structure, retention policies, archive policies, backup policies, and white label readiness.</p><p><b>Ideal user:</b> owners, admins, IT teams, auditors, and enterprise customers.</p></div>
    </div>
  `)}

  ${page(product, 'Future Roadmap', `
    <div class="section-title"><span class="eyebrow">Future expansion</span></div>
    <h2>Roadmap that expands product depth without changing the core architecture.</h2>
    <p class="lead">The roadmap shows where the product can grow for enterprise buyers, investors, and larger customers after the core platform is adopted.</p>
    <div class="grid-2">
      <div class="card">
        <h3>Product roadmap</h3>
        <ul class="clean">${list(product.roadmap)}</ul>
      </div>
      <div class="card">
        <h3>Demo agenda</h3>
        <ul class="clean">${list(product.demo)}</ul>
      </div>
    </div>
    <div class="grid-4" style="margin-top:5mm">${statCards(product)}</div>
  `)}

  ${page(product, 'Closing', `
    <div class="section-title"><span class="eyebrow">Closing page</span></div>
    <h2>${esc(product.name)} is built to be shown to serious buyers.</h2>
    <p class="lead">${esc(product.name)} is positioned as a commercial SaaS product with a clear buyer, clear business value, clear AI differentiation, clear subscription model, and clear enterprise expansion path.</p>
    <div class="grid-2">
      <div class="callout">
        <h3>Final buyer message</h3>
        <p>${esc(product.promise)} It can operate standalone, integrate with existing systems, support subscriptions, enforce security, and deliver executive-level visibility.</p>
      </div>
      <div class="card">
        <h3>Best next conversation</h3>
        <p>Run a private product demo using realistic business data. Start with the executive dashboard, show the health score, walk through one workflow, then close with Integration Studio, security, and enterprise readiness.</p>
      </div>
    </div>
    <div class="grid-4" style="margin-top:7mm">
      <div class="stat"><div>Product</div><strong>SaaS</strong><span>Commercial subscription model</span></div>
      <div class="stat"><div>Workflow</div><strong>AI</strong><span>Recommendations and automation</span></div>
      <div class="stat"><div>Trust</div><strong>RBAC</strong><span>Audit trails and tenant isolation</span></div>
      <div class="stat"><div>Scale</div><strong>API</strong><span>Integrations, webhooks, and SSO-ready path</span></div>
    </div>
    <div class="callout" style="margin-top:7mm">
      <h3>Built by ${esc(shared.author)}</h3>
      <p>${esc(shared.role)}. This brochure is designed for investor conversations, enterprise sales meetings, product demonstrations, LinkedIn campaigns, and partner discussions.</p>
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
