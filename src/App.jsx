import { useEffect, useMemo, useState } from "react";

const contactEmail = "hamu.dxb@gmail.com";

const projects = [
  {
    name: "Skywing Real Estate",
    type: "Real Estate",
    description: "Property discovery, credibility content, and conversion-ready lead paths for a Dubai real estate brand.",
    href: "https://skywingrealty.com/",
    image: "/assets/skywing-thumbnail.svg",
    tags: ["Frontend", "SEO", "Lead flow"],
    className: "project-card-a"
  },
  {
    name: "Purewealth",
    type: "Wealth Platform",
    description: "A trust-led digital presence shaped around clarity, calm content, and confident user journeys.",
    href: "https://purewealth.me/",
    image: "/assets/purewealth-thumbnail.svg",
    tags: ["Web design", "Performance", "UX"],
    className: "project-card-b"
  },
  {
    name: "Varaa Realty",
    type: "Real Estate",
    description: "A mobile-first real estate brand site with structured services and direct contact pathways.",
    href: "https://varaarealty.com/",
    image: "/assets/varaa-thumbnail.svg",
    tags: ["Responsive UI", "Brand site", "Contact flow"],
    className: "project-card-c"
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

const processSteps = [
  {
    title: "Pattern",
    copy: "Clarify the user journey, content hierarchy, trust signals, and the technical constraints before production work starts."
  },
  {
    title: "Stitch",
    copy: "Build the interface and backend in small, testable passes with clean components and secure defaults."
  },
  {
    title: "Finish",
    copy: "Refine responsiveness, performance, contact reliability, and deployment readiness until the site feels complete."
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

function StitchBackdrop() {
  return (
    <div className="stitch-backdrop" aria-hidden="true">
      <div className="fabric-grain" />
      <div className="thread-field thread-field-one" />
      <div className="thread-field thread-field-two" />
      <div className="thread-field thread-field-three" />
      <div className="thread-field thread-field-four" />
    </div>
  );
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
      <a className="brand-mark" href="#home" onClick={close} aria-label="Go to home">
        <img src="/assets/logo.svg" alt="" aria-hidden="true" />
        <span>Hamees Momin</span>
      </a>

      <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((value) => !value)}>
        <span className="sr-only">Open navigation</span>
        <span aria-hidden="true" />
      </button>

      <nav className={`site-nav ${open ? "is-open" : ""}`} id="site-nav" aria-label="Main navigation">
        {["work", "skills", "process", "contact"].map((item) => (
          <a key={item} href={`#${item}`} onClick={close}>
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}

function ProjectCard({ project }) {
  return (
    <article className={`project-card ${project.className}`} data-reveal>
      <a className="project-image" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name}`}>
        <img src={project.image} alt={`${project.name} website thumbnail`} loading="lazy" />
      </a>
      <div className="project-content">
        <p>{project.type}</p>
        <h3>{project.name}</h3>
        <span>{project.description}</span>
        <ul>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <a href={project.href} target="_blank" rel="noopener noreferrer">Visit site</a>
      </div>
    </article>
  );
}

function SkillCard({ skill, index }) {
  return (
    <article className={`skill-card ${skill.levelClass}`} data-reveal>
      <div className="skill-card-top">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <h3>{skill.title}</h3>
      </div>
      <p>{skill.copy}</p>
      <div className="thread-meter" aria-hidden="true">
        <span />
      </div>
      <ul>
        {skill.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  );
}

function Contact() {
  const [emailOpen, setEmailOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  async function revealEmail() {
    const nextOpen = !emailOpen;
    setEmailOpen(nextOpen);

    if (!nextOpen) return;

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(contactEmail);
        setStatus(`${contactEmail} copied`);
        return;
      } catch {
        setStatus(contactEmail);
        return;
      }
    }

    setStatus(contactEmail);
  }

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
          <p className="eyebrow">Contact</p>
          <h2>Start the next build.</h2>
          <p>Send project details through the secure form, or use the quick buttons for direct contact.</p>
          <div className="contact-buttons">
            <button type="button" onClick={revealEmail} aria-expanded={emailOpen} aria-controls="email-popover">Email</button>
            <a href="https://wa.me/971502877142" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
          {emailOpen && (
            <p className="email-popover" id="email-popover" role="status">{status || contactEmail}</p>
          )}
        </div>

        <form className="contact-form" data-reveal onSubmit={handleSubmit} noValidate>
          <input type="hidden" name="access_key" value="8cb166ec-6273-4e16-b4ea-7128fc4f34df" />
          <input type="hidden" name="subject" value="New portfolio inquiry for Hamees Momin" />
          <input type="checkbox" name="botcheck" className="botcheck" tabIndex="-1" autoComplete="off" />
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
          <label>
            <span>Project type</span>
            <select name="projectType" defaultValue="">
              <option value="">Select one</option>
              <option>Portfolio or personal site</option>
              <option>Business website</option>
              <option>Full-stack application</option>
              <option>Frontend cleanup</option>
            </select>
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows="5" />
            {errors.message && <small>{errors.message}</small>}
          </label>
          <button className="primary-button" type="submit" disabled={sending}>{sending ? "Sending..." : "Send message"}</button>
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
      <StitchBackdrop />
      <Navbar />
      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">Full-stack portfolio / Dubai</p>
              <h1>Crafting bespoke digital experiences with technical precision.</h1>
              <p>I am Hamees Momin, a full-stack developer building refined websites, responsive products, and reliable systems with a modern stitched-in level of care.</p>
              <div className="hero-actions">
                <a className="primary-button" href="#work">View work</a>
                <a className="ghost-button" href="#contact">Start a project</a>
              </div>
            </div>
            <aside className="atelier-panel" data-reveal aria-label="Portfolio highlights">
              <div className="atelier-badge">HM</div>
              <p>Digital atelier</p>
              <h2>Threaded UI, secure backend, smooth delivery.</h2>
              <div className="metric-grid">
                <div><strong>3+</strong><span>Featured projects</span></div>
                <div><strong>98</strong><span>Performance target</span></div>
                <div><strong>4 yrs</strong><span>Delivery practice</span></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="section projects-section" id="work">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Selected work</p>
              <h2>Project cards cut like a tactile archive.</h2>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="container skills-grid">
            <div className="section-heading sticky-copy" data-reveal>
              <p className="eyebrow">Capabilities</p>
              <h2>Skills shown as moving thread lines.</h2>
              <p>Frontend detail, backend reliability, and product thinking are treated as one connected fabric.</p>
            </div>
            <div className="skills-list">
              {skills.map((skill, index) => (
                <SkillCard key={skill.title} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="section process-section" id="process">
          <div className="container">
            <div className="section-heading compact" data-reveal>
              <p className="eyebrow">Process</p>
              <h2>A measured build rhythm.</h2>
            </div>
            <ol className="process-grid">
              {processSteps.map((step, index) => (
                <li key={step.title} data-reveal>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Contact />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <img src="/assets/logo.svg" alt="" aria-hidden="true" />
            <div>
              <strong>Hamees Momin</strong>
              <p>© {year} Full-stack portfolio. Built with care.</p>
            </div>
          </div>
          <div className="footer-actions">
            <button type="button" onClick={() => navigator.clipboard?.writeText(contactEmail)}>Email</button>
            <a href="https://wa.me/971502877142" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
