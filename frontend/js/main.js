const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const contactForm = document.getElementById("contact-form");
const statusMessage = document.getElementById("form-status");
const submitButton = document.getElementById("submit-button");

const apiBaseUrl = (window.PORTFOLIO_CONFIG?.API_BASE_URL || "http://localhost:5000").replace(/\/$/, "");

if (window.AOS) {
  AOS.init({
    once: true,
    duration: 850,
    easing: "ease-out-cubic",
    offset: 60
  });
}

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    mobileNav.classList.toggle("hidden");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav?.classList.add("hidden");
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const activeId = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${activeId}`;
        link.classList.toggle("active", isActive);
      });
    });
  },
  {
    rootMargin: "-35% 0px -45% 0px",
    threshold: 0.1
  }
);

sections.forEach((section) => sectionObserver.observe(section));

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  statusMessage.textContent = "";
  statusMessage.className = "min-h-[1.5rem] text-sm font-semibold text-slate-300";
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(`${apiBaseUrl}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Unable to send your message right now.");
    }

    statusMessage.textContent = "Message sent successfully. Thanks for reaching out.";
    statusMessage.className = "min-h-[1.5rem] text-sm font-semibold text-cyanSoft";
    contactForm.reset();
  } catch (error) {
    statusMessage.textContent = error.message || "Something went wrong. Please try again.";
    statusMessage.className = "min-h-[1.5rem] text-sm font-semibold text-rose-300";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
  }
});

