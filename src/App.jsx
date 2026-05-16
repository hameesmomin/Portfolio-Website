import { useEffect, useMemo, useState } from "react";

const contactEmail = "hamu.dxb@gmail.com";

const projects = [
  {
    name: "Skywing Real Estate",
    description: "A high-end property discovery platform featuring immersive 3D tours and complex filtering systems built for a seamless user journey.",
    href: "https://skywingrealty.com/",
    image: "/assets/skywing-new.png",
    tags: ["React", "Tailwind"],
    className: "project-card-skywing"
  },
  {
    name: "Purewealth",
    description: "Secure, high-performance wealth management dashboard with real-time data visualization.",
    href: "https://purewealth.me/",
    image: "/assets/purewealth-new.png",
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
    image: "/assets/varaa-new.png",
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
          {["work", "about", "contact"].map((item) => (
            <a key={item} href={`#${item}`} onClick={close} className={item === "work" ? "active" : ""}>
              {item}
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

function Contact() {
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
    <section className="section contact-section" id="contact">
      <div className="container contact-grid">
        <div className="contact-intro" data-reveal>
          <h2>Start a project</h2>
          <p>Send project details through the secure form, or reach out directly.</p>
        </div>

        <form className="contact-form" data-reveal onSubmit={handleSubmit} noValidate>
          <input type="hidden" name="access_key" value="8cb166ec-6273-4e16-b4ea-7128fc4f34df" />
          <input type="hidden" name="subject" value="New portfolio inquiry for Hamees Momin" />
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
      <main>
        <section className="hero" id="home">
          <div className="container">
            <div className="hero-content" data-reveal>
              <div className="availability-badge">
                <span className="dot" />
                AVAILABLE FOR NEW PROJECTS
              </div>
              
              <h1>Crafting <em className="accent">bespoke</em> digital<br />experiences with technical<br />precision.</h1>
              
              <div className="hero-description">
                <p>Specializing in high-performance web applications and tactile user interfaces.<br />I weave code and design into seamless, premium products.</p>
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
              <a href={projects[0].href} target="_blank" rel="noopener noreferrer" className={`bento-card ${projects[0].className}`} data-reveal>
                <div className="card-bg">
                   <img src={projects[0].image} alt={projects[0].name} loading="lazy" />
                   <div className="card-gradient" />
                </div>
                <div className="card-content">
                  <div className="tags">
                    {projects[0].tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  <h3>{projects[0].name}</h3>
                  <p>{projects[0].description}</p>
                </div>
              </a>

              {/* Purewealth (Top right card) */}
              <a href={projects[1].href} target="_blank" rel="noopener noreferrer" className={`bento-card ${projects[1].className}`} data-reveal>
                <div className="card-bg">
                   <img src={projects[1].image} alt={projects[1].name} loading="lazy" />
                   <div className="card-gradient" />
                </div>
                <div className="card-icon">{projects[1].icon}</div>
                <div className="card-content">
                  <div className="tags">
                    {projects[1].tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  <h3>{projects[1].name}</h3>
                  <p>{projects[1].description}</p>
                </div>
              </a>

              {/* Varaa (Bottom right card) */}
              <a href={projects[2].href} target="_blank" rel="noopener noreferrer" className={`bento-card ${projects[2].className}`} data-reveal>
                <div className="card-bg">
                   <img src={projects[2].image} alt={projects[2].name} loading="lazy" />
                   <div className="card-gradient" />
                </div>
                <div className="card-icon">{projects[2].icon}</div>
                <div className="card-content">
                  <div className="tags">
                    {projects[2].tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                  <h3>{projects[2].name}</h3>
                  <p>{projects[2].description}</p>
                </div>
              </a>
            </div>
          </div>
        </section>

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
