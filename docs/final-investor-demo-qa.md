# Final Investor Demo QA

Date: 2026-06-02

This document records the latest cross-app readiness check for the portfolio and four commercial SaaS products.

## Validation Summary

| Project | Backend tests | Frontend build | Production-module routes | Stale beta/placeholder scan |
|---|---:|---:|---:|---:|
| Aura Command | Passed: 28 tests, 152 assertions | Passed | Passed: 5 routes | Passed |
| SecureOps | Passed: 19 tests, 185 assertions | Passed | Passed: 5 routes | Passed |
| DocuMind | Passed: 24 tests, 85 assertions | Passed | Passed: 2 routes | Passed |
| SiteFlow | Passed: 23 tests, 103 assertions | Passed | Passed: 3 routes | Passed |
| Live Portfolio | Not applicable | Passed | Not applicable | Passed |
| Local Portfolio | Not applicable | Passed | Not applicable | Passed |

## Brochure Audit

Both portfolio repos passed `npm run brochures:audit`.

Current brochure files include the required:

- Investor narrative
- Competitive landscape matrix
- Competitor and pricing comparison
- Pricing architecture
- Product claim sections
- Product-specific positioning

## Demo Access Rules

Live portfolio:

- Shows product pages, videos, screenshots, case-study wording, brochures, and request-demo CTAs.
- Does not expose runnable app links to public visitors.
- Positions Aura Command, SecureOps, DocuMind, and SiteFlow as commercial SaaS products.

Local portfolio:

- Keeps local app access buttons visible on localhost and 127.0.0.1.
- Links local demos to the configured app ports:
  - Aura Command: `http://127.0.0.1:8031/`
  - DocuMind: `http://127.0.0.1:8032/`
  - SiteFlow: `http://127.0.0.1:8033/`
  - SecureOps: `http://127.0.0.1:8024/`
- Keeps brochure status links pointed at `/api/brochure-gap-analysis`.

## Provider Credentials Required For Live Integrations

The core standalone workflows are designed to work from internal app data. These items require real customer/provider credentials before live sync or live provider processing:

- Aura Command: Meta WhatsApp Cloud API, OpenAI Whisper or Azure Speech for live voice transcription, HubSpot/Zoho/Salesforce/Pipedrive credentials for CRM sync.
- SecureOps: Wazuh, Splunk, Elastic, Microsoft Sentinel, Microsoft Defender, Google Workspace, AWS, Cloudflare, or endpoint provider credentials for live ingestion.
- DocuMind: Azure Document Intelligence, Google Document AI, AWS Textract, Tesseract server/language packs, Google Drive, SharePoint, Microsoft 365, or email ingestion credentials.
- SiteFlow: Autodesk, Procore, ERP, accounting, procurement, email, speech transcription, or Aura/WhatsApp integration credentials.

## Known Local Environment Warning

PHP startup currently reports missing XAMPP `imap` and `pdo_firebird` extensions. These warnings did not block tests, route checks, or builds. They should be resolved in production PHP configuration if those extensions are enabled in `php.ini`.

## Final Demo Checklist

- Open live portfolio and confirm public CTAs request a demo.
- Open local portfolio from localhost and confirm local app buttons are visible.
- Start each product app on its documented port before the live walkthrough.
- Use seeded demo accounts from each product README.
- Run `npm run brochures:audit` before sending brochures to investors.
- Mention provider-backed features as "ready to connect once credentials are supplied," not as already connected to a customer's live systems.
