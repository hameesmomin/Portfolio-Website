const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const year = document.querySelector("[data-year]");

year.textContent = new Date().getFullYear();

function closeNav() {
  document.body.classList.remove("nav-open");
  nav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  document.body.classList.toggle("nav-open", !isOpen);
  nav.classList.toggle("is-open", !isOpen);
  navToggle.setAttribute("aria-expanded", String(!isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) closeNav();
});

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
});

function setFieldError(name, message = "") {
  const error = contactForm.querySelector(`[data-error-for="${name}"]`);
  if (error) error.textContent = message;
}

function clearErrors() {
  for (const error of contactForm.querySelectorAll("[data-error-for]")) {
    error.textContent = "";
  }

  formStatus.textContent = "";
  formStatus.classList.remove("error");
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrors();

  const submitButton = contactForm.querySelector("button[type='submit']");
  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      if (result.fields) {
        for (const [field, message] of Object.entries(result.fields)) {
          setFieldError(field, message);
        }
      }

      throw new Error(result.error || "Please check the form and try again.");
    }

    contactForm.reset();
    formStatus.textContent = result.message || "Thanks. Your message was sent.";
  } catch (error) {
    formStatus.textContent = error.message;
    formStatus.classList.add("error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send message";
  }
});
