/* ==============================
   TYPING EFFECT (Hero Title)
============================== */
const heroName = document.querySelector(".hero-name");
const typingText = "Mazen Elkady";
let index = 0;

function typeEffect() {
  if (!heroName) return;

  heroName.textContent = typingText.slice(0, index);
  index++;

  if (index <= typingText.length) {
    setTimeout(typeEffect, 100);
  }
}

window.addEventListener("load", typeEffect);


/* ==============================
   SCROLL REVEAL ANIMATION
============================== */
const revealElements = document.querySelectorAll(
  ".section, .skill-card, .why-card, .project-card, .service-card, .timeline-item"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition = "all 0.8s ease";
  revealObserver.observe(el);
});


/* ==============================
   ACTIVE NAV LINK ON SCROLL
============================== */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});


/* ==============================
   SMOOTH SCROLL
============================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
    });
  });
});


/* ==============================
   CONTACT FORM
============================== */
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    formStatus.textContent = "Sending...";
    formStatus.style.color = "#22d3ee";

    setTimeout(() => {
      formStatus.textContent = "Message sent successfully ✅";
      formStatus.style.color = "lightgreen";
      form.reset();
    }, 1500);
  });
}
