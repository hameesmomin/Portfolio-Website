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
    outcome: "Never lose a WhatsApp lead again.",
    description: "A governed WhatsApp command center for shared inboxes, AI follow-up, CRM handoff, team accountability, and revenue visibility.",
    fit: "Real estate teams, clinics, agencies, and service businesses",
    status: "Strongest commercial potential",
    localUrl: "http://127.0.0.1:8031/",
    credentials: { email: "aisha@example.com", password: "password" },
    videoSrc: "/assets/trailers/aura-command-demo.webm",
    trailerGif: "/assets/trailers/aura-command-linkedin.gif",
    reel: ["WhatsApp lead captured", "AI qualifies intent", "Team owner assigned", "Follow-up never missed"]
  },
  {
    key: "documind",
    name: "Documind",
    outcome: "Know every document expiry before it costs you money.",
    description: "An AI document workspace for UAE licenses, IDs, contracts, invoices, renewals, source-grounded answers, and audit-ready access.",
    fit: "SMEs, HR teams, operations teams, document-heavy businesses",
    status: "Easiest to explain and sell",
    localUrl: "http://127.0.0.1:8032/",
    credentials: { email: "owner@documind.test", password: "password" },
    videoSrc: "/assets/trailers/documind-demo.webm",
    trailerGif: "/assets/trailers/documind-linkedin.gif",
    reel: ["Documents uploaded", "AI extracts expiry dates", "Renewal risk sorted", "Team notified before penalties"]
  },
  {
    key: "siteflow",
    name: "Siteflow",
    outcome: "Turn daily site chaos into signed reports.",
    description: "A construction operations system for daily reports, snags, attendance, materials, contractors, approvals, and PDF-ready reporting.",
    fit: "Contractors, consultants, project managers, site teams",
    status: "Focused niche SaaS",
    localUrl: "http://127.0.0.1:8033/",
    credentials: { email: "owner@siteflow.test", password: "password" },
    videoSrc: "/assets/trailers/siteflow-demo.webm",
    trailerGif: "/assets/trailers/siteflow-linkedin.gif",
    reel: ["Site notes collected", "Snags and materials logged", "Daily report compiled", "Client-ready PDF approved"]
  },
  {
    key: "secureops",
    name: "SecureOps",
    outcome: "See your business security risks before attackers or auditors do.",
    description: "A defensive AI security operations dashboard for risk posture, vulnerabilities, incidents, audit logs, reports, and executive summaries.",
    fit: "SMEs, regulated teams, IT providers, compliance-driven firms",
    status: "High-ticket potential",
    localUrl: "http://127.0.0.1:8024/",
    credentials: { email: "owner@secureops.demo", password: "Password123!" },
    videoSrc: "/assets/trailers/secureops-demo.webm",
    trailerGif: "/assets/trailers/secureops-linkedin.gif",
    reel: ["Assets scanned", "Risks prioritized", "AI explains business impact", "Executive report prepared"]
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
        <video className="demo-video-file" src={product.videoSrc} controls autoPlay muted loop playsInline preload="metadata" />
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
        <div className="product-grid">
          {productDemos.map((product, index) => (
            <article className="product-card" key={product.name} data-reveal>
              <div className="product-card-top">
                <span className="skill-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="product-status">{product.status}</span>
              </div>
              <button className="product-preview" type="button" onClick={() => setSelectedProduct(product)} aria-label={`Watch ${product.name} demo video`}>
                <img src={product.trailerGif} alt="" loading="lazy" />
                <span>Watch trailer</span>
              </button>
              <h3>{product.name}</h3>
              <p className="product-outcome">{product.outcome}</p>
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
                <button className="primary-button" type="button" onClick={() => setSelectedProduct(product)}>Watch demo video</button>
                {isLocalDemo && <a className="local-app-button" href={product.localUrl}>Open local app</a>}
                <a className="ghost-button" href="#demo-request" onClick={() => setSelectedProduct(product)}>Request gated demo</a>
              </div>
            </article>
          ))}
        </div>
        <div className="demo-request-grid" id="demo-request" data-reveal>
          <DemoVideoPanel product={selectedProduct} />
          <div className="demo-request-copy">
            <span className="section-kicker">LOCKED LOCAL DEMO</span>
            <h3>{selectedProduct.name}</h3>
            <p className="product-outcome">{selectedProduct.outcome}</p>
            <p>{selectedProduct.description}</p>
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
              <meta itemProp="url" content="https://hameesmomin.com/" />
              
              <div className="hero-description">
                <p itemProp="description">Specializing in high-performance web applications and tactile user interfaces. I weave code and design into seamless, premium products.</p>
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
