import { stat, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const brochureDir = path.join(root, 'product-brochures');

const products = {
  'aura-command': {
    name: 'Aura Command',
    competitors: ['HubSpot', 'Respond.io', 'Zoho CRM'],
    claims: ['WhatsApp-native revenue tracking', 'Voice note transcription and intent', 'Revenue Health Score dashboard'],
  },
  documind: {
    name: 'DocuMind',
    competitors: ['SharePoint', 'Google Drive', 'DocuSign CLM'],
    claims: ['Document Compliance Score', 'Source-grounded document Q&A', 'Knowledge graph for entities and obligations'],
  },
  secureops: {
    name: 'SecureOps',
    competitors: ['Splunk', 'Microsoft Sentinel', 'Vanta'],
    claims: ['Executive Cyber Risk Score', 'AI Virtual CISO guidance', 'MITRE ATT&CK coverage mapping'],
  },
  siteflow: {
    name: 'SiteFlow',
    competitors: ['Procore', 'Autodesk Build', 'Monday.com'],
    claims: ['UAE site daily report workflow', 'AI delay prediction and risk drivers', 'Contractor performance scoring'],
  },
};

const requiredSections = [
  'Executive Summary',
  'Business Problem',
  'Market Challenges',
  'Product Solution',
  'Hero Features',
  'Core Features',
  'Advanced AI Features',
  'Integrations',
  'Business Benefits',
  'Competitive Advantage',
  'Competitive Landscape',
  'Competitor Pricing Comparison',
  'Subscription Tiers',
  'Enterprise Features',
  'Implementation Status',
  'Security Features',
  'Future Roadmap',
  'Closing',
];

const requiredCopy = [
  'Why investors should back',
  'Feature-by-feature comparison against the closest named market alternatives',
  'Investor insight',
  'Competitor and pricing comparison',
  'Pricing architecture',
  'Subscription path from small business to enterprise',
  'Traditional solution vs our product',
  'API / webhook Integration Studio',
];

function countPages(html) {
  return [...html.matchAll(/<section class="page\b/g)].length;
}

function includesAll(haystack, needles) {
  return needles.filter((needle) => !haystack.includes(needle));
}

async function auditProduct(slug, product) {
  const htmlPath = path.join(brochureDir, `${slug}-brochure.html`);
  const pdfPath = path.join(brochureDir, `${slug}-brochure.pdf`);
  const html = (await readFile(htmlPath, 'utf8'))
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
  const pdfInfo = await stat(pdfPath);

  const failures = [];
  const pageCount = countPages(html);

  if (pageCount < 19) {
    failures.push(`Expected at least 19 HTML pages, found ${pageCount}.`);
  }

  if (pdfInfo.size < 1_000_000) {
    failures.push(`PDF file looks too small for the full investor brochure: ${pdfInfo.size} bytes.`);
  }

  const missingSections = includesAll(html, requiredSections);
  const missingCopy = includesAll(html, requiredCopy);
  const missingCompetitors = includesAll(html, product.competitors);
  const missingClaims = includesAll(html, product.claims);

  if (missingSections.length) failures.push(`Missing sections: ${missingSections.join(', ')}`);
  if (missingCopy.length) failures.push(`Missing required copy: ${missingCopy.join(', ')}`);
  if (missingCompetitors.length) failures.push(`Missing competitor names: ${missingCompetitors.join(', ')}`);
  if (missingClaims.length) failures.push(`Missing product claims: ${missingClaims.join(', ')}`);

  return {
    slug,
    name: product.name,
    pageCount,
    pdfBytes: pdfInfo.size,
    failures,
  };
}

const results = [];

for (const [slug, product] of Object.entries(products)) {
  results.push(await auditProduct(slug, product));
}

let failed = false;

for (const result of results) {
  if (result.failures.length) {
    failed = true;
    console.error(`\n${result.name}: FAILED`);
    console.error(`Pages: ${result.pageCount}; PDF: ${result.pdfBytes} bytes`);
    for (const failure of result.failures) {
      console.error(`- ${failure}`);
    }
  } else {
    console.log(`${result.name}: OK (${result.pageCount} pages, ${result.pdfBytes} bytes)`);
  }
}

if (failed) {
  console.error('\nBrochure audit failed. Regenerate brochures and restore missing investor-critical content before publishing.');
  process.exit(1);
}

console.log('\nBrochure audit passed. All product brochures include the required investor, competitive landscape, pricing, and product-claim sections.');
