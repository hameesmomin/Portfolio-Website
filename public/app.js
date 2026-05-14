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

function validateContactForm(payload) {
  const errors = {};
  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const message = String(payload.message || "").trim();

  if (name.length < 2 || name.length > 80) {
    errors.name = "Enter a name between 2 and 80 characters.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (message.length < 20 || message.length > 1500) {
    errors.message = "Enter a message between 20 and 1500 characters.";
  }

  return errors;
}

async function readResponse(response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      message: response.ok
        ? "Thanks. Your message was sent."
        : "The form service returned an unexpected response. Please try again."
    };
  }
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrors();

  const submitButton = contactForm.querySelector("button[type='submit']");
  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());
  const errors = validateContactForm(payload);

  if (Object.keys(errors).length > 0) {
    for (const [field, message] of Object.entries(errors)) {
      setFieldError(field, message);
    }

    formStatus.textContent = "Please check the highlighted fields.";
    formStatus.classList.add("error");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Accept": "application/json"
      },
      body: formData
    });

    const result = await readResponse(response);

    if (!response.ok) {
      if (result.fields) {
        for (const [field, message] of Object.entries(result.fields)) {
          setFieldError(field, message);
        }
      }

      throw new Error(result.message || "Please check the form and try again.");
    }

    contactForm.reset();
    formStatus.textContent = "Thanks. Your message was sent.";
  } catch (error) {
    formStatus.textContent = error.message;
    formStatus.classList.add("error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send message";
  }
});
