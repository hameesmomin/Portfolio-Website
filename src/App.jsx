import { useEffect, useMemo, useState } from "react";

const contactEmail = "hamu.dxb@gmail.com";

const projects = [
  {
    name: "Skywing Real Estate",
    description: "A high-end property discovery platform featuring immersive 3D tours and complex filtering systems built for a seamless user journey.",
    href: "https://skywingrealty.com/",
    image: "/assets/skywing-project-1600.webp",
    imageSet: "/assets/skywing-project-900.webp 900w, /assets/skywing-project-1600.webp 1600w",
    tags: ["React", "Tailwind"],
    className: "project-card-skywing"
  },
  {
    name: "Purewealth",
    description: "Secure, high-performance wealth management dashboard with real-time data visualization.",
    href: "https://purewealth.me/",
    image: "/assets/purewealth-project-1600.webp",
    imageSet: "/assets/purewealth-project-900.webp 900w, /assets/purewealth-project-1600.webp 1600w",
    tags: ["Next.js"],
    className: "project-card-purewealth",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-8M15 21v-8" />
      </svg>
    )
  },
  {
    name: "Varaa Realty",
    description: "A corporate identity and digital presence overhaul for a leading commercial real estate firm, focusing on institutional trust and modern aesthetics.",
    href: "https://varaarealty.com/",
    image: "/assets/varaa-project-1600.webp",
    imageSet: "/assets/varaa-project-900.webp 900w, /assets/varaa-project-1600.webp 1600w",
    tags: ["Vue.js", "Webflow"],
    className: "project-card-varaa",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 17l9.2-9.2M17 17V7H7" />
      </svg>
    )
  }
];

const skills = [
  {
    title: "Frontend engineering",
    levelClass: "skill-level-94",
    copy: "Accessible React interfaces, responsive systems, polished motion, and performance-aware implementation.",
    tags: ["React", "CSS", "Accessibility", "Performance"]
  },
  {
    title: "Backend engineering",
    levelClass: "skill-level-88",
    copy: "API design, validation, secure contact flows, deployment structure, logging, and practical maintainability.",
    tags: ["Node.js", "APIs", "Security", "Email"]
  },
  {
    title: "Product delivery",
    levelClass: "skill-level-91",
    copy: "Clear user journeys, focused scope, credible presentation, and launch-ready digital products.",
    tags: ["UX flow", "SEO", "Content", "Launch"]
  }
];

const productDemos = [
  {
    key: "aura-command",
    name: "Aura Command",
    logoType: "aura",
    outcome: "Never lose a WhatsApp lead again.",
    description: "A governed WhatsApp command center for shared inboxes, AI follow-up, CRM handoff, team accountability, and revenue visibility.",
    problem: "Sales teams lose warm leads when chats sit inside one person’s phone, replies get delayed, or nobody knows who owns the next move.",
    importance: "Aura Command turns messy WhatsApp conversations into a managed revenue workflow, so every inquiry has context, ownership, follow-up, and a visible path to closing.",
    fit: "Real estate teams, clinics, agencies, and service businesses",
    status: "Strongest commercial potential",
    badges: ["WhatsApp revenue ops", "CRM-ready", "SLA follow-ups", "AI replies", "Revenue attribution"],
    businessValue: "Protects paid leads, shortens response time, improves agent accountability, and gives owners a clear view of revenue follow-up.",
    standaloneMode: "Manual lead intake, shared inbox workflow, agent assignment, lifecycle stages, follow-up calendar, AI summaries, and business reporting.",
    integratedMode: "WhatsApp Business API, website forms, HubSpot, Zoho CRM, Salesforce, Pipedrive, Google Sheets, Zapier, Make, n8n, and custom CRM APIs.",
    securityMeasures: ["Tenant-scoped data", "RBAC", "Audit logs", "Encrypted provider tokens", "Rate-limited APIs"],
    subscriptionModel: "Starter for small teams, Business for CRM/API automation, Enterprise for SSO-ready controls, white-label, and custom CRM connectors.",
    techStack: ["Laravel", "React", "TypeScript", "Sanctum", "Reverb-ready", "MySQL"],
    roadmap: ["Template manager", "Broadcast campaign controls", "Revenue attribution reports", "Advanced CRM sync"],
    localUrl: "http://127.0.0.1:8031/",
    credentials: { email: "aisha@example.com", password: "password" },
    videoSrc: "/assets/trailers/aura-command-walkthrough-20260520.webm",
    posterSrc: "/assets/trailers/aura-command-poster-20260520.png",
    trailerGif: "/assets/trailers/aura-command-linkedin.gif",
    reel: ["WhatsApp lead captured", "AI qualifies intent", "Team owner assigned", "Follow-up never missed"],
    faq: [
      ["Can my team use it without changing how customers message us?", "Yes. The pitch is simple: keep WhatsApp as the customer channel, but add structure, routing, visibility, and AI assistance behind the scenes."],
      ["What makes it valuable to a business owner?", "It protects the leads they already paid to generate. Fewer missed replies, clearer accountability, and faster follow-up can turn directly into recovered revenue."],
      ["Is it meant to replace a CRM?", "Not necessarily. It can act as the WhatsApp command layer and either feed a CRM or handle lighter CRM needs for teams that want one focused workspace."]
    ]
  },
  {
    key: "documind",
    name: "Documind",
    logoType: "documind",
    outcome: "Know every document expiry before it costs you money.",
    description: "An AI document workspace for UAE licenses, IDs, contracts, invoices, renewals, source-grounded answers, and audit-ready access.",
    problem: "Important documents are scattered across drives, inboxes, and folders until an expiry date, compliance request, or missing contract becomes an expensive surprise.",
    importance: "Documind gives operations teams a single place to store, search, understand, and act on documents before deadlines turn into penalties.",
    fit: "SMEs, HR teams, operations teams, document-heavy businesses",
    status: "Easiest to explain and sell",
    badges: ["Expiry intelligence", "OCR-ready", "Secure search", "Approval workflows", "Source Q&A"],
    businessValue: "Reduces fines, missed renewals, document confusion, and time lost searching across inboxes, drives, and folders.",
    standaloneMode: "Secure uploads, document classification, metadata extraction, expiry tracking, review queues, approvals, search, and reports.",
    integratedMode: "Google Drive, SharePoint, OneDrive, Dropbox-ready storage, CRM, ERP, HR systems, email ingestion, and custom document APIs.",
    securityMeasures: ["Private storage", "Signed downloads", "RBAC", "Audit trail", "Tenant isolation"],
    subscriptionModel: "Starter for document control, Business for bulk upload and integrations, Enterprise for SSO-ready retention and advanced audit controls.",
    techStack: ["Laravel", "Inertia React", "Tailwind", "Database queues", "SQLite/MySQL"],
    roadmap: ["Real OCR provider", "Redaction workflow", "Duplicate detection", "Email ingestion"],
    localUrl: "http://127.0.0.1:8032/",
    credentials: { email: "owner@documind.test", password: "password" },
    videoSrc: "/assets/trailers/documind-walkthrough-20260520.webm",
    posterSrc: "/assets/trailers/documind-poster-20260520.png",
    trailerGif: "/assets/trailers/documind-linkedin.gif",
    reel: ["Documents uploaded", "AI extracts expiry dates", "Renewal risk sorted", "Team notified before penalties"],
    faq: [
      ["What problem does Documind solve first?", "Expiry awareness. It helps teams spot renewals, licenses, IDs, contracts, and critical dates before they become stressful last-minute work."],
      ["Why would a company pay for this?", "Because document mistakes create real costs: fines, delayed approvals, lost time, compliance pressure, and team confusion."],
      ["Can it answer questions from uploaded documents?", "Yes. The product direction is source-grounded document intelligence, so teams can ask practical questions and trace answers back to the right files."]
    ]
  },
  {
    key: "siteflow",
    name: "Siteflow",
    logoType: "siteflow",
    outcome: "Turn daily site chaos into signed reports.",
    description: "A construction operations system for daily reports, snags, attendance, materials, contractors, approvals, and PDF-ready reporting.",
    problem: "Site updates often live in WhatsApp messages, photos, notebooks, and memory, making it hard to prove what happened, who approved it, and what changed.",
    importance: "Siteflow gives construction teams a cleaner record of the day, turning scattered field activity into accountable reports that clients and managers can trust.",
    fit: "Contractors, consultants, project managers, site teams",
    status: "Focused niche SaaS",
    badges: ["Daily reports", "Snag tracking", "Contractors", "Approvals", "Client PDFs"],
    businessValue: "Turns scattered field updates into accountable records, reducing disputes, delays, reporting friction, and management blind spots.",
    standaloneMode: "Projects, site reports, snags, materials, attendance, approvals, photos, safety issues, contractor scoring, and PDF-ready reports.",
    integratedMode: "ERP, procurement tools, accounting systems, real estate CRM, document storage, email, custom APIs, and webhooks.",
    securityMeasures: ["Company-scoped projects", "Role permissions", "Audit logs", "Private uploads", "Rate-limited imports"],
    subscriptionModel: "Starter for small project teams, Business for approvals and advanced reports, Enterprise for ERP integrations and on-premise-ready deployments.",
    techStack: ["Laravel", "React", "Tailwind", "Sanctum", "Database queues", "MySQL/SQLite"],
    roadmap: ["Gantt timeline", "RFI/submittal module", "Budget variance", "Weather and site condition logs"],
    localUrl: "http://127.0.0.1:8033/",
    credentials: { email: "owner@siteflow.test", password: "password" },
    videoSrc: "/assets/trailers/siteflow-walkthrough-20260520.webm",
    posterSrc: "/assets/trailers/siteflow-poster-20260520.png",
    trailerGif: "/assets/trailers/siteflow-linkedin.gif",
    reel: ["Site notes collected", "Snags and materials logged", "Daily report compiled", "Client-ready PDF approved"],
    faq: [
      ["Who is Siteflow for?", "Contractors, consultants, and project teams that need daily visibility without chasing updates across ten separate chat threads."],
      ["What is the business benefit?", "Better proof, cleaner handovers, faster reporting, and fewer disputes about what happened on site."],
      ["Can it support client-ready reporting?", "Yes. The core idea is to convert daily field inputs into structured records and polished reports that are easier to review and approve."]
    ]
  },
  {
    key: "secureops",
    name: "SecureOps",
    logoType: "secureops",
    outcome: "See your business security risks before attackers or auditors do.",
    description: "A defensive AI security operations dashboard for risk posture, vulnerabilities, incidents, audit logs, reports, and executive summaries.",
    problem: "Small and mid-sized companies are expected to look secure, but often lack a clear view of risks, evidence, vulnerabilities, and what leadership should fix first.",
    importance: "SecureOps packages security posture into language a business can act on, helping teams prioritize risks, prepare for audits, and show clients they take security seriously.",
    fit: "SMEs, regulated teams, IT providers, compliance-driven firms",
    status: "High-ticket potential",
    badges: ["SIEM-ready", "Risk scoring", "Incidents", "Compliance", "Executive reports"],
    businessValue: "Helps businesses see risks, prove security work, prepare for audits, and explain technical exposure in executive language.",
    standaloneMode: "Asset inventory, vulnerability register, incident timeline, risk scoring, evidence locker, controls, remediation tasks, and reports.",
    integratedMode: "Splunk, Wazuh, Microsoft Sentinel, Elastic SIEM, QRadar, generic syslog/API ingestion, email alerts, and custom webhooks.",
    securityMeasures: ["RBAC", "Audit logs", "Private evidence", "Defensive AI guardrails", "Signed report access"],
    subscriptionModel: "Starter for readiness tracking, Business for incident/compliance reports, Enterprise for SIEM connectors and board reporting.",
    techStack: ["Laravel", "React", "Tailwind", "Sanctum", "DomPDF", "Database queues"],
    roadmap: ["MITRE mapping", "Security questionnaire module", "Custom frameworks", "Monthly board report generator"],
    localUrl: "http://127.0.0.1:8024/",
    credentials: { email: "owner@secureops.demo", password: "Password123!" },
    videoSrc: "/assets/trailers/secureops-walkthrough-20260520.webm",
    posterSrc: "/assets/trailers/secureops-poster-20260520.png",
    trailerGif: "/assets/trailers/secureops-linkedin.gif",
    reel: ["Assets scanned", "Risks prioritized", "AI explains business impact", "Executive report prepared"],
    faq: [
      ["Is SecureOps a hacking tool?", "No. It is positioned as defensive readiness: visibility, prioritization, reporting, and risk communication for business teams."],
      ["Why is it high-ticket?", "Security affects trust, contracts, audits, and insurance. A clear risk dashboard can support bigger buying decisions than a simple productivity tool."],
      ["What would prospects see in the demo?", "A guided view of assets, risk posture, issue prioritization, audit-style evidence, and executive summaries that make security easier to understand."]
    ]
  }
];

const trustSignals = [
  {
    title: "Outcome-first demos",
    copy: "Each product is framed around a business headache, not a feature list, so decision-makers instantly understand the value."
  },
  {
    title: "Private by design",
    copy: "Live app access stays local and gated. Public visitors see polished walkthroughs and request access before touching sensitive workflows."
  },
  {
    title: "Built for operators",
    copy: "The apps speak the language of leads, expiries, site reports, and risk, which makes them easier to sell to real businesses."
  }
];

const deliveryStandards = [
  {
    title: "Security-first setup",
    copy: "Forms, headers, gated demos, and deployment settings are treated as part of the product, not an afterthought.",
    proof: "CSP, validation, private demos"
  },
  {
    title: "Performance that feels premium",
    copy: "Pages are built to load quickly, stay responsive, and keep motion smooth across phone, tablet, and desktop screens.",
    proof: "Responsive checks, optimized assets"
  },
  {
    title: "Business-readable UX",
    copy: "The interface explains outcomes clearly, so owners and managers understand what the software does without needing a technical tour.",
    proof: "Outcome copy, guided walkthroughs"
  },
  {
    title: "Launch-ready handoff",
    copy: "SEO files, transfer notes, build scripts, and local test paths are kept organized so the project can move from demo to deployment cleanly.",
    proof: "SEO schema, transfer guide"
  }
];

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.14 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <a className="brand-mark" href="#home" onClick={close} aria-label="Go to home">
          <span>Hamees Momin</span>
        </a>

        <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((value) => !value)}>
          <span className="sr-only">Open navigation</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        <nav className={`site-nav ${open ? "is-open" : ""}`} id="site-nav" aria-label="Main navigation">
          {[
            ["work", "work"],
            ["products", "products"],
            ["case-studies", "case studies"],
            ["about", "about"],
            ["contact", "contact"]
          ].map(([href, label]) => (
            <a key={href} href={`#${href}`} onClick={close} className={href === "work" ? "active" : ""}>
              {label}
            </a>
          ))}
        </nav>

        <a className="primary-button cta-button" href="#contact" onClick={close}>
          HIRE ME
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </header>
  );
}

function InquiryForm({ selectedProduct = "", compact = false }) {
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const nextErrors = {};

    if (String(payload.name || "").trim().length < 2) nextErrors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(payload.email || ""))) nextErrors.email = "Enter a valid email.";
    if (String(payload.message || "").trim().length < 20) nextErrors.message = "Write at least 20 characters.";

    setErrors(nextErrors);
    setStatus("");
    if (Object.keys(nextErrors).length) return;

    setSending(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData
      });
      const text = await response.text();
      let result = {};
      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        result = {};
      }
      if (!response.ok) throw new Error(result.message || "Please try again.");
      form.reset();
      setStatus("Thanks. Your message was sent.");
    } catch (error) {
      setStatus(error.message || "The form could not be sent.");
    } finally {
      setSending(false);
    }
  }

  return (
        <form className={`contact-form ${compact ? "contact-form-compact" : ""}`} data-reveal={!compact} onSubmit={handleSubmit} noValidate>
          <input type="hidden" name="access_key" value="8cb166ec-6273-4e16-b4ea-7128fc4f34df" />
          <input type="hidden" name="subject" value="New portfolio inquiry for Hamees Momin" />
          <input type="hidden" name="product_demo" value={selectedProduct} />
          <input type="checkbox" name="botcheck" className="botcheck" tabIndex="-1" autoComplete="off" />
          <div className="form-group">
            <label>
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" />
              {errors.name && <small>{errors.name}</small>}
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" />
              {errors.email && <small>{errors.email}</small>}
            </label>
          </div>
          <label>
            <span>Message</span>
            <textarea name="message" rows="4" />
            {errors.message && <small>{errors.message}</small>}
          </label>
          <button className="submit-button" type="submit" disabled={sending}>
            {sending ? "SENDING..." : "SEND MESSAGE"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>
  );
}

function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-grid">
        <div className="contact-intro" data-reveal>
          <h2>Start a project</h2>
          <p>Send project details through the secure form, or reach out directly.</p>
        </div>

        <InquiryForm />
      </div>
    </section>
  );
}

function ProductLogo({ product, compact = false }) {
  return (
    <div className={`product-logo ${compact ? "product-logo-compact" : ""} product-logo-${product.logoType}`} aria-hidden="true">
      {product.logoType === "aura" && (
        <>
          <span className="logo-aura-core" />
          <span className="logo-aura-ring logo-aura-ring-one" />
          <span className="logo-aura-ring logo-aura-ring-two" />
          <span className="logo-aura-ray logo-aura-ray-one" />
          <span className="logo-aura-ray logo-aura-ray-two" />
        </>
      )}
      {product.logoType === "documind" && (
        <>
          <span className="logo-doc-page" />
          <span className="logo-doc-line logo-doc-line-one" />
          <span className="logo-doc-line logo-doc-line-two" />
          <span className="logo-doc-lens" />
        </>
      )}
      {product.logoType === "siteflow" && (
        <>
          <span className="logo-site-block logo-site-block-one" />
          <span className="logo-site-block logo-site-block-two" />
          <span className="logo-site-block logo-site-block-three" />
          <span className="logo-site-flow-line" />
          <span className="logo-site-check" />
        </>
      )}
      {product.logoType === "secureops" && (
        <>
          <span className="logo-shield" />
          <span className="logo-shield-core" />
          <span className="logo-risk-dot logo-risk-dot-one" />
          <span className="logo-risk-dot logo-risk-dot-two" />
          <span className="logo-risk-dot logo-risk-dot-three" />
        </>
      )}
    </div>
  );
}

function DemoVideoPanel({ product }) {
  if (product.videoSrc) {
    return (
      <div className={`demo-video-shell demo-video-${product.key}`} aria-label={`${product.name} demo video`}>
        <div className="video-toolbar">
          <span />
          <span />
          <span />
          <strong>{product.name} Demo Video</strong>
        </div>
        <video
          key={product.key}
          className="demo-video-file"
          controls
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={product.posterSrc}
        >
          <source src={product.videoSrc} type="video/webm" />
          Your browser cannot play this walkthrough video. Please request demo access through the form.
        </video>
      </div>
    );
  }

  return (
    <div className={`demo-video-shell demo-video-${product.key}`} aria-label={`${product.name} demo video preview`}>
      <div className="video-toolbar">
        <span />
        <span />
        <span />
        <strong>{product.name} Demo Reel</strong>
      </div>
      <div className="video-stage">
        <div className="video-orbit" />
        <div className="video-card video-card-main">
          <span>{product.outcome}</span>
          <strong>{product.reel[0]}</strong>
        </div>
        <div className="video-card video-card-secondary">
          <span>AI workflow</span>
          <strong>{product.reel[1]}</strong>
        </div>
        <div className="video-card video-card-tertiary">
          <span>Business result</span>
          <strong>{product.reel[3]}</strong>
        </div>
        <div className="video-progress">
          {product.reel.map((step) => (
            <span key={step}>{step}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductDemoHub() {
  const [selectedProduct, setSelectedProduct] = useState(productDemos[0]);
  const isLocalDemo = typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname);

  return (
    <section className="section product-section" id="products">
      <div className="container">
        <div className="section-header" data-reveal>
          <div>
            <span className="section-kicker">PRIVATE PRODUCT DEMOS</span>
            <h2>AI systems packaged around business outcomes.</h2>
          </div>
          <a className="view-archive" href="#contact">REQUEST ACCESS &rarr;</a>
        </div>
        <div className="demo-pull-strip" data-reveal>
          {trustSignals.map((item) => (
            <div key={item.title}>
              <span>{item.title}</span>
              <p>{item.copy}</p>
            </div>
          ))}
        </div>
        <div className="product-grid">
          {productDemos.map((product, index) => (
            <article className="product-card" key={product.name} data-reveal>
              <div className="product-card-top">
                <ProductLogo product={product} compact />
                <span className="product-status">{product.status}</span>
              </div>
              <button className="product-preview" type="button" onClick={() => setSelectedProduct(product)} aria-label={`Watch ${product.name} demo video`}>
                <img src={product.posterSrc} alt="" loading="lazy" />
                <span>Watch walkthrough</span>
              </button>
              <h3>{product.name}</h3>
              <p className="product-outcome">{product.outcome}</p>
              <div className="product-badges" aria-label={`${product.name} feature badges`}>
                {product.badges.slice(0, 5).map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </div>
              <div className="readiness-flags">
                <span>Standalone-ready</span>
                <span>Integration-ready</span>
                <span>Subscription-ready</span>
                <span>Security-first</span>
              </div>
              <div className="problem-snapshot">
                <span>Problem solved</span>
                <p>{product.problem}</p>
              </div>
              <p>{product.description}</p>
              <div className="product-fit">{product.fit}</div>
              {isLocalDemo && (
                <div className="local-credentials" aria-label={`${product.name} local demo credentials`}>
                  <span>Local login</span>
                  <code>{product.credentials.email}</code>
                  <code>{product.credentials.password}</code>
                </div>
              )}
              <div className="product-actions">
                <a className="primary-button" href="#case-studies" onClick={() => setSelectedProduct(product)}>View case study</a>
                <a className="ghost-button" href="#screenshots" onClick={() => setSelectedProduct(product)}>View screenshots</a>
                {isLocalDemo && <a className="local-app-button" href={product.localUrl}>Open local app</a>}
                <a className="ghost-button" href="#demo-request" onClick={() => setSelectedProduct(product)}>Request gated demo</a>
              </div>
            </article>
          ))}
        </div>
        <ProductCaseStudy product={selectedProduct} />
        <ProductEcosystem />
        <TrustCenterPreview />
        <div className="demo-request-grid" id="demo-request" data-reveal>
          <DemoVideoPanel product={selectedProduct} />
          <div className="demo-request-copy">
            <span className="section-kicker">{isLocalDemo ? "LOCAL TEST DEMO" : "PRIVATE DEMO VIDEO"}</span>
            <div className="selected-product-brand">
              <ProductLogo product={selectedProduct} />
              <h3>{selectedProduct.name}</h3>
            </div>
            <p className="product-outcome">{selectedProduct.outcome}</p>
            <p>{selectedProduct.description}</p>
            <div className="demo-business-copy">
              <div>
                <span>Problem</span>
                <p>{selectedProduct.problem}</p>
              </div>
              <div>
                <span>Why businesses care</span>
                <p>{selectedProduct.importance}</p>
              </div>
            </div>
            <div className="product-faq">
              <span className="section-kicker">BUYER FAQ</span>
              {selectedProduct.faq.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
            {isLocalDemo && (
              <>
                <div className="local-credentials local-credentials-panel" aria-label={`${selectedProduct.name} local demo credentials`}>
                  <span>Local test credentials</span>
                  <code>{selectedProduct.credentials.email}</code>
                  <code>{selectedProduct.credentials.password}</code>
                </div>
                <a className="local-app-button local-app-button-wide" href={selectedProduct.localUrl}>Open {selectedProduct.name} locally</a>
              </>
            )}
            <InquiryForm selectedProduct={selectedProduct.name} compact />
          </div>
        </div>
        <div className="portfolio-close" data-reveal>
          <span>WHAT COMPANIES SHOULD FEEL HERE</span>
          <p>Not “nice website.” More like: this person understands how messy business operations really work, and can turn that mess into software people actually want to use.</p>
          <a className="primary-button" href="#contact">Start the conversation</a>
        </div>
      </div>
    </section>
  );
}

function ProductCaseStudy({ product }) {
  const screenshots = [
    `/assets/trailers/${product.key}-01-dashboard.png`,
    `/assets/trailers/${product.key}-screen.png`,
    product.posterSrc
  ];

  return (
    <section className="product-case-study" id="case-studies" data-reveal>
      <div className="case-study-header">
        <span className="section-kicker">BUSINESS SAAS PRODUCT I BUILT</span>
        <h2>{product.name}: {product.outcome}</h2>
        <p>{product.businessValue}</p>
      </div>

      <div className="case-study-grid">
        <article>
          <span>Problem</span>
          <p>{product.problem}</p>
        </article>
        <article>
          <span>Target users</span>
          <p>{product.fit}</p>
        </article>
        <article>
          <span>Solution</span>
          <p>{product.description}</p>
        </article>
        <article>
          <span>Subscription model</span>
          <p>{product.subscriptionModel}</p>
        </article>
      </div>

      <div className="mode-grid">
        <div>
          <span>Standalone mode</span>
          <p>{product.standaloneMode}</p>
        </div>
        <div>
          <span>Integrated mode</span>
          <p>{product.integratedMode}</p>
        </div>
      </div>

      <div className="case-study-lists">
        <div>
          <span>AI features</span>
          <ul>{product.reel.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <span>Security measures</span>
          <ul>{product.securityMeasures.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <span>Tech stack</span>
          <ul>{product.techStack.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <span>Roadmap</span>
          <ul>{product.roadmap.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>

      <div className="screenshot-strip" id="screenshots" aria-label={`${product.name} screenshots`}>
        {screenshots.map((src) => (
          <img key={src} src={src} alt={`${product.name} product screenshot`} loading="lazy" />
        ))}
      </div>
    </section>
  );
}

function ProductEcosystem() {
  return (
    <section className="ecosystem-section" data-reveal>
      <div>
        <span className="section-kicker">PRODUCT ECOSYSTEM</span>
        <h2>Four focused SaaS products, one business-ready architecture.</h2>
      </div>
      <div className="ecosystem-grid">
        <p><strong>Aura Command</strong> handles sales, WhatsApp, CRM, lead ownership, and revenue operations.</p>
        <p><strong>SecureOps</strong> centralizes security events, risks, vulnerabilities, compliance evidence, and executive reporting.</p>
        <p><strong>Documind</strong> manages documents, renewals, contracts, compliance files, secure search, and document intelligence.</p>
        <p><strong>Siteflow</strong> organizes construction sites, contractors, approvals, materials, daily reports, and project operations.</p>
      </div>
    </section>
  );
}

function TrustCenterPreview() {
  const trustItems = ["RBAC", "Audit logs", "API-ready", "Multi-tenant SaaS", "Subscription-ready", "Secure file handling", "Encrypted credentials", "Enterprise integrations"];

  return (
    <section className="trust-center-preview" id="trust" data-reveal>
      <div>
        <span className="section-kicker">TRUST CENTER</span>
        <h2>Security-first product engineering.</h2>
        <p>Each app is designed around tenant isolation, access control, auditability, safe integrations, and clear upgrade boundaries.</p>
      </div>
      <div className="trust-pill-grid">
        {trustItems.map((item) => <span key={item}>{item}</span>)}
      </div>
    </section>
  );
}

function DeliveryStandards() {
  return (
    <section className="section standards-section" id="standards">
      <div className="container">
        <div className="section-header" data-reveal>
          <div>
            <span className="section-kicker">DELIVERY STANDARD</span>
            <h2>Built to impress buyers and survive production.</h2>
          </div>
          <a href="#contact" className="view-archive">PLAN A BUILD &rarr;</a>
        </div>
        <div className="standards-grid">
          {deliveryStandards.map((standard, index) => (
            <article className="standard-card" key={standard.title} data-reveal>
              <span className="skill-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{standard.title}</h3>
              <p>{standard.copy}</p>
              <strong>{standard.proof}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  const year = useMemo(() => new Date().getFullYear(), []);
  useReveal();

  return (
    <>
      <div className="bg-overlay" />
      <Navbar />
      <main itemScope itemType="https://schema.org/Person">
        <section className="hero" id="home">
          <div className="container">
            <div className="hero-content" data-reveal>
              <div className="availability-badge">
                <span className="dot" />
                AVAILABLE FOR NEW PROJECTS
              </div>
              
              <h1><span itemProp="name">Hamees Momin</span> crafts <em className="accent">bespoke</em> digital experiences with technical precision.</h1>
              <meta itemProp="jobTitle" content="Full-Stack Developer" />
              <meta itemProp="email" content={contactEmail} />
              <meta itemProp="telephone" content="+971502877142" />
              <meta itemProp="url" content="https://portfoliowebsite.hamu-dxb.workers.dev/" />
              
              <div className="hero-description">
                <p itemProp="description">Specializing in secure, high-performance web applications, private AI product demos, and tactile user interfaces. I weave code and design into seamless, premium products.</p>
              </div>
            </div>

            <div className="metrics-row" data-reveal>
              <div className="metric">
                <strong>30+</strong>
                <span>PROJECTS SHIPPED</span>
              </div>
              <div className="metric">
                <strong>98%</strong>
                <span>PERFORMANCE SCORE</span>
              </div>
              <div className="metric">
                <strong>4 Yrs</strong>
                <span>CONSISTENT DELIVERY</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="container">
            <div className="section-header" data-reveal>
              <div className="header-title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="accent">
                  <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                  <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                </svg>
                <h2>Selected Work</h2>
              </div>
              <a href="#contact" className="view-archive">BOOK A BUILD &rarr;</a>
            </div>

            <div className="bento-grid">
              {/* Skywing (Large left card) */}
              <a href={projects[0].href} target="_blank" rel="noopener noreferrer" className={`bento-card ${projects[0].className}`} data-reveal itemProp="workExample" itemScope itemType="https://schema.org/CreativeWork">
                <div className="card-bg">
                   <img src={projects[0].image} srcSet={projects[0].imageSet} sizes="(max-width: 900px) calc(100vw - 32px), 52vw" alt={projects[0].name} loading="eager" fetchPriority="high" />
                   <div className="card-gradient" />
                </div>
                <div className="card-content">
                  <div className="tags">
                    {projects[0].tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  <h3 itemProp="name">{projects[0].name}</h3>
                  <p itemProp="description">{projects[0].description}</p>
                  <meta itemProp="url" content={projects[0].href} />
                </div>
              </a>

              {/* Purewealth (Top right card) */}
              <a href={projects[1].href} target="_blank" rel="noopener noreferrer" className={`bento-card ${projects[1].className}`} data-reveal itemProp="workExample" itemScope itemType="https://schema.org/CreativeWork">
                <div className="card-bg">
                   <img src={projects[1].image} srcSet={projects[1].imageSet} sizes="(max-width: 900px) calc(100vw - 32px), 42vw" alt={projects[1].name} loading="lazy" />
                   <div className="card-gradient" />
                </div>
                <div className="card-icon">{projects[1].icon}</div>
                <div className="card-content">
                  <div className="tags">
                    {projects[1].tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  <h3 itemProp="name">{projects[1].name}</h3>
                  <p itemProp="description">{projects[1].description}</p>
                  <meta itemProp="url" content={projects[1].href} />
                </div>
              </a>

              {/* Varaa (Bottom right card) */}
              <a href={projects[2].href} target="_blank" rel="noopener noreferrer" className={`bento-card ${projects[2].className}`} data-reveal itemProp="workExample" itemScope itemType="https://schema.org/CreativeWork">
                <div className="card-bg">
                   <img src={projects[2].image} srcSet={projects[2].imageSet} sizes="(max-width: 900px) calc(100vw - 32px), 42vw" alt={projects[2].name} loading="lazy" />
                   <div className="card-gradient" />
                </div>
                <div className="card-icon">{projects[2].icon}</div>
                <div className="card-content">
                  <div className="tags">
                    {projects[2].tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  <h3 itemProp="name">{projects[2].name}</h3>
                  <p itemProp="description">{projects[2].description}</p>
                  <meta itemProp="url" content={projects[2].href} />
                </div>
              </a>
            </div>
          </div>
        </section>

        <ProductDemoHub />

        <section className="section" id="about">
          <div className="container">
            <div className="section-header" data-reveal>
              <h2>Capabilities</h2>
            </div>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={skill.title} className="skill-item" data-reveal>
                  <div className="skill-header">
                    <span className="skill-number">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{skill.title}</h3>
                  </div>
                  <p>{skill.copy}</p>
                  <div className="tags">
                    {skill.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <DeliveryStandards />

        <Contact />
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <strong>Hamees Momin</strong>
          </div>
          <div className="footer-center">
            <p>(c) {year} Hamees Momin. Stitched with precision.</p>
          </div>
          <div className="footer-links">
            <a href={`mailto:${contactEmail}`}>EMAIL</a>
            <a href="https://wa.me/971502877142" target="_blank" rel="noopener noreferrer">WHATSAPP</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
