// Typing animation for hero title
const typingTarget = document.getElementById("hero-typing");
const typingText = "Data Analyst & Machine Learning Enthusiast";
const typingSpeed = 70; // ms per character
let typingIndex = 0;

function typeHeroTitle() {
  if (!typingTarget) return;
  if (typingIndex <= typingText.length) {
    typingTarget.textContent = typingText.slice(0, typingIndex);
    typingIndex += 1;
    setTimeout(typeHeroTitle, typingSpeed);
  }
}

// Start typing when page is loaded
window.addEventListener("load", () => {
  typeHeroTitle();

  // 👇 أضف السطرين دول
  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.add("show");
  });
});

// Scroll "Learn More" button to About
const learnMoreBtn = document.getElementById("learn-more-btn");
if (learnMoreBtn) {
  learnMoreBtn.addEventListener("click", () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// Animate skill bars on scroll using Intersection Observer
const skillBars = document.querySelectorAll(".skill-bar");

if ("IntersectionObserver" in window) {
  const skillsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.getAttribute("data-level") || "0";
          bar.style.width = level + "%";
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach((bar) => skillsObserver.observe(bar));
} else {
  // Fallback: show immediately
  skillBars.forEach((bar) => {
    const level = bar.getAttribute("data-level") || "0";
    bar.style.width = level + "%";
  });
}

// Contact form: show thank you message & clear form
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // هنا ممكن تبعت داتا حقيقية لو عندك باك إند
    contactForm.reset();
    if (formStatus) {
      formStatus.textContent = "Thanks! Your message has been sent.";
      setTimeout(() => {
        formStatus.textContent = "";
      }, 4000);
    }
  });
}

revealElements.forEach((el) => revealObserver.observe(el));

// Smooth scroll for in-page navigation + CTA
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
// Scroll "Learn More" button to About
const learnMoreBtn = document.getElementById("learn-more-btn");
if (learnMoreBtn) {
  learnMoreBtn.addEventListener("click", () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// Animate skill bars on scroll using Intersection Observer
const skillBars = document.querySelectorAll(".skill-bar");

if ("IntersectionObserver" in window) {
  const skillsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.getAttribute("data-level") || "0";
          bar.style.width = level + "%";
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach((bar) => skillsObserver.observe(bar));
} else {
  // Fallback: show immediately
  skillBars.forEach((bar) => {
    const level = bar.getAttribute("data-level") || "0";
    bar.style.width = level + "%";
  });
}

// Contact form: show thank you message & clear form
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // هنا ممكن تبعت داتا حقيقية لو عندك باك إند
    contactForm.reset();
    if (formStatus) {
      formStatus.textContent = "Thanks! Your message has been sent.";
      setTimeout(() => {
        formStatus.textContent = "";
      }, 4000);
    }
  });
}
    // Optional: update nav active state
    if (anchor.classList.contains("nav-link")) {
      document
        .querySelectorAll(".nav-link")
        .forEach((link) => link.classList.remove("active"));
      anchor.classList.add("active");
    }
  });
});
