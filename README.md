# Personal Portfolio

A dependency-light portfolio website built with modern frontend and backend practices.

## Run Locally

```bash
npm run dev
```

Then open the Vite URL shown in the terminal.

To test the production-style Node server:

```bash
npm run build
npm run start
```

Then open `http://localhost:3000`.

## What Is Included

- Semantic, responsive frontend with accessible navigation and forms
- Backend contact API with request size limits, validation, basic rate limiting, and security headers
- Gated product demo hub for high-value AI applications
- Static asset caching for production-friendly delivery
- Environment-based contact message destination

## Contact Messages

Contact messages are sent to `hamu.dxb@gmail.com` through Web3Forms.

The frontend uses the Web3Forms access key in `public/index.html`, so no SMTP setup is required for the live contact form.

The Node backend still supports SMTP as a fallback if you want to move email delivery server-side later.

By default, messages are written to the server console during local development. In production, configure SMTP environment variables so the backend can send the message as email:

```bash
CONTACT_EMAIL=hamu.dxb@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM=your-gmail-address@gmail.com
```

For Gmail, use an app password rather than your normal Google account password.

You can also set `CONTACT_WEBHOOK_URL` to forward messages to a webhook endpoint instead of SMTP.

## Product Demo Strategy

The portfolio presents Aura Command, Documind, Siteflow, and SecureOps as commercial SaaS products. Live app access should be issued only through gated, expiring demo accounts with seeded data, audit logs, and restricted export/API/admin features.

On the public live site, visitors can view case studies, screenshots, product walkthrough videos, brochures, and request a guided demo. The live portfolio must not expose direct launch buttons or seeded credentials for the SaaS apps.

When the portfolio is opened on `localhost`, `127.0.0.1`, or `::1`, it shows local-only launch buttons for the sibling app repos:

- Aura Command: `http://127.0.0.1:8031/`
- Documind: `http://127.0.0.1:8032/`
- Siteflow: `http://127.0.0.1:8033/`
- SecureOps: `http://127.0.0.1:8024/`

Use each app README for seeded local demo accounts. Do not place seeded credentials in the public portfolio bundle.

Product walkthrough videos live in `static/assets/trailers/`. Run `node bin/generate-product-videos.cjs` to regenerate the long WebM walkthroughs and posters for the live site.

## SaaS Product Showcase

The portfolio now positions the demo hub as a business SaaS ecosystem:

- Aura Command: AI WhatsApp Revenue & Business Command Center
- SecureOps: AI Cybersecurity, Compliance & SIEM-Ready Operations Dashboard
- Documind: AI Document Intelligence Platform for UAE Businesses
- Siteflow: AI Construction Operations & Site Management Platform

Each product card should communicate product overview, target industry, business value, subscription tiers, integration capabilities, executive dashboard, health score, security, API framework, workflow automation, enterprise features, tech stack, and roadmap. Screenshot and social export planning folders live in `portfolio-screenshots/` and `social-post-assets/`.

## Enterprise SaaS Layer

The portfolio now highlights the cross-product SaaS capabilities expected by small businesses, medium businesses, and enterprise buyers:

- Integration Marketplace
- Custom API Builder
- OAuth Connector Framework
- Webhook Builder
- Workflow Automation Engine
- Developer Portal and API Documentation
- API Key Management and Integration Logs
- Usage Analytics and Product Analytics
- Executive Dashboard and Health Scores
- White Label Support and Customer Portal
- Feature Usage Tracking, Audit Logs, Scheduled Reports, AI Copilot, Guided Onboarding, and Demo Data Mode

## Product Quality Gate

Portfolio and app claims must distinguish complete features from framework-ready architecture. A feature should only be presented as complete when it works correctly, is responsive, secure, documented, polished, integrated into reporting, role-aware, tenant-scoped, and tested or otherwise verifiable.

The portfolio positions Hamees Momin as a full-stack software engineer, SaaS product builder, cybersecurity professional, and enterprise application developer. Project pages and sections should demonstrate business value, technical depth, security considerations, integration readiness, scalability, and real-world applicability without blurring the separate product identities.

## Executive Dashboards And Health Scores

Each SaaS product has separate operational and executive dashboard positioning plus a proprietary score system:

- Aura Command: Revenue Operations Health Score
- SecureOps: Security Posture Score
- Documind: Document Compliance Score
- Siteflow: Project Health Score

Scores use green/yellow/red bands, score history, trend analysis, factor breakdowns, and are intended for executive dashboards, PDF exports, scheduled reports, monthly summaries, email reports, and AI summaries.

## Product Brochures

Detailed company-owner brochures are generated in `product-brochures/`:

- `aura-command-brochure.pdf`
- `secureops-brochure.pdf`
- `documind-brochure.pdf`
- `siteflow-brochure.pdf`

Run `node scripts/generate-product-brochures.mjs` to regenerate the editable HTML and PDF versions.
