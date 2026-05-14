import { useEffect, useMemo, useRef, useState } from "react";

const projects = [
  {
    name: "Skywing Real Estate",
    type: "Real Estate",
    description: "A polished real estate website focused on property discovery, trust-building content, and clear lead generation paths.",
    href: "https://skywingrealty.com/",
    image: "/assets/skywing-thumbnail.svg",
    tags: ["Frontend", "SEO", "Lead flow"]
  },
  {
    name: "Purewealth",
    type: "Wealth Platform",
    description: "A digital presence for wealth-focused services, designed around credibility, content clarity, and confident user journeys.",
    href: "https://purewealth.me/",
    image: "/assets/purewealth-thumbnail.svg",
    tags: ["Web design", "Performance", "UX"]
  },
  {
    name: "Varaa Realty",
    type: "Real Estate",
    description: "A real estate brand website with structured service content, mobile-first layouts, and conversion-ready contact points.",
    href: "https://varaarealty.com/",
    image: "/assets/varaa-thumbnail.svg",
    tags: ["Responsive UI", "Brand site", "Contact flow"]
  }
];

const skills = [
  {
    title: "Frontend engineering",
    level: 94,
    copy: "Accessible UI, design systems, responsive layouts, performance budgets, and browser-tested interactions.",
    tags: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    title: "Backend engineering",
    level: 88,
    copy: "API design, validation, auth-ready architecture, database modeling, logging, and deployment-minded structure.",
    tags: ["Node.js", "APIs", "Security", "Email flow"]
  },
  {
    title: "Product thinking",
    level: 91,
    copy: "Clear user flows, measurable outcomes, pragmatic scope decisions, and launch-ready presentation.",
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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function WaterBackground() {
  return (
    <div className="water-scene" aria-hidden="true">
      <div className="water-orbit water-orbit-a" />
      <div className="water-orbit water-orbit-b" />
      <div className="water-orbit water-orbit-c" />
      <div className="water-ribbon ribbon-one" />
      <div className="water-ribbon ribbon-two" />
      <div className="water-ribbon ribbon-three" />
      <div className="water-grid" />
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`nav-shell ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#home" onClick={close} aria-label="Go to home">
        <img src="/assets/logo.svg" alt="" aria-hidden="true" />
        <span>Hamees Momin</span>
      </a>

      <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((value) => !value)}>
        <span className="sr-only">Open navigation</span>
        <span aria-hidden="true" />
      </button>

      <nav className={`site-nav ${open ? "is-open" : ""}`} id="site-nav">
        {["work", "skills", "process", "contact"].map((item) => (
          <a key={item} href={`#${item}`} onClick={close}>
            {item[0].toUpperCase() + item.slice(1)}
          </a>
        ))}
      </nav>
    </header>
  );
}

function StackedProjectCard({ project, index }) {
  const cardRef = useRef(null);

  function handlePointerMove(event) {
    const card = cardRef.current;
    if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    card.style.setProperty("--tilt-x", `${(-y * 10).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${(x * 12).toFixed(2)}deg`);
    card.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
  }

  function resetTilt() {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <article
      className="project-stack-card"
      data-reveal
      ref={cardRef}
      style={{ "--stack-index": index }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="stack-shadow stack-shadow-one" />
      <div className="stack-shadow stack-shadow-two" />
      <a className="project-thumb" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.name}`}>
        <img src={project.image} alt={`${project.name} website thumbnail`} />
      </a>
      <div className="project-copy">
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
    <article className="skill-flow-card" data-reveal style={{ "--level": `${skill.level}%` }}>
      <div className="skill-flow-top">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <h3>{skill.title}</h3>
      </div>
      <p>{skill.copy}</p>
      <div className="skill-line" aria-hidden="true">
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

  const contactEmail = "hamu.dxb@gmail.com";

  async function revealEmail() {
    setEmailOpen((value) => !value);
    if (!emailOpen && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(contactEmail);
        setStatus(`${contactEmail} copied`);
      } catch {
        setStatus(contactEmail);
      }
    } else if (!emailOpen) {
      setStatus(contactEmail);
    }
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
        <div data-reveal>
          <p className="eyebrow">Contact</p>
          <h2>Have a project in mind?</h2>
          <p>Send a few details and I will respond with next steps. You can also reach me directly through the buttons below.</p>
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
      <WaterBackground />
      <Navbar />
      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">Frontend clarity. Backend discipline.</p>
              <h1>I build polished web experiences backed by reliable systems.</h1>
              <p>I am Hamees Momin, a full-stack developer creating fast, accessible, maintainable websites and digital products for real businesses.</p>
              <div className="hero-actions">
                <a className="primary-button" href="#work">View work</a>
                <a className="ghost-button" href="#contact">Start a project</a>
              </div>
            </div>
            <aside className="hero-metrics" data-reveal aria-label="Portfolio highlights">
              <div><strong>3+</strong><span>Featured projects</span></div>
              <div><strong>98</strong><span>Performance target</span></div>
              <div><strong>4 yrs</strong><span>Full-stack delivery</span></div>
            </aside>
          </div>
        </section>

        <section className="section projects-section" id="work">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Selected work</p>
              <h2>Projects stacked with real business outcomes.</h2>
            </div>
            <div className="project-stack-grid">
              {projects.map((project, index) => (
                <StackedProjectCard key={project.name} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="container skills-grid">
            <div className="section-heading sticky-copy" data-reveal>
              <p className="eyebrow">Capabilities</p>
              <h2>Skills that move together like one smooth flow.</h2>
              <p>Interface polish, backend reliability, and product clarity are designed as one connected experience.</p>
            </div>
            <div className="skills-flow">
              {skills.map((skill, index) => (
                <SkillCard key={skill.title} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="section process-section" id="process">
          <div className="container">
            <div className="section-heading compact" data-reveal>
              <p className="eyebrow">How I work</p>
              <h2>Calm process, clean delivery.</h2>
            </div>
            <ol className="timeline">
              {["Clarify", "Build", "Refine"].map((item, index) => (
                <li key={item} data-reveal>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item}</h3>
                  <p>{index === 0 ? "Define the audience, constraints, success metrics, and core flows before writing code." : index === 1 ? "Ship usable slices with tested interfaces, readable implementation, and thoughtful edge states." : "Measure performance, polish the experience, and prepare the system for deployment and maintenance."}</p>
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
            <a href="#contact">Email</a>
            <a href="https://wa.me/971502877142" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
