/* ============================================================
   MAZEN ELKADY PORTFOLIO — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ──────────────────────────────────────────
     1. MOBILE MENU TOGGLE
  ────────────────────────────────────────── */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks   = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.textContent = isOpen ? '✕' : '☰';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuToggle.textContent = '☰';
        menuToggle.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        menuToggle.textContent = '☰';
        document.body.style.overflow = '';
      }
    });
  }


  /* ──────────────────────────────────────────
     2. NAVBAR SCROLL EFFECT
  ────────────────────────────────────────── */
  const header = document.querySelector('.main-header');

  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();


  /* ──────────────────────────────────────────
     3. ACTIVE NAV LINK ON SCROLL
  ────────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links li a:not(.nav-cta)');

  function setActiveNav() {
    let currentId = '';
    const scrollY = window.scrollY + 120;

    sections.forEach(function (sec) {
      if (scrollY >= sec.offsetTop) {
        currentId = sec.id;
      }
    });

    navItems.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();


  /* ──────────────────────────────────────────
     4. SCROLL REVEAL (reveal + stagger)
  ────────────────────────────────────────── */
  const revealEls  = document.querySelectorAll('.reveal');
  const staggerEls = document.querySelectorAll('.stagger');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(function (el)  { revealObserver.observe(el); });
  staggerEls.forEach(function (el) { revealObserver.observe(el); });


  /* ──────────────────────────────────────────
     5. SKILL BAR FILL ANIMATION
  ────────────────────────────────────────── */
  const skillCards = document.querySelectorAll('.skill-card');

  const skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillCards.forEach(function (card) { skillObserver.observe(card); });


  /* ──────────────────────────────────────────
     6. SMOOTH SCROLL FOR ANCHOR LINKS
  ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 70; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });


  /* ──────────────────────────────────────────
     7. CONTACT FORM SUBMISSION
  ────────────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  const formStatus  = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = contactForm.querySelector('.btn-submit');

      // Simple validation
      const name    = contactForm.querySelector('#name')?.value.trim();
      const email   = contactForm.querySelector('#email')?.value.trim();
      const message = contactForm.querySelector('#message')?.value.trim();

      if (!name || !email || !message) {
        formStatus.style.color = 'var(--pink)';
        formStatus.textContent = '⚠ Please fill in all required fields.';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formStatus.style.color = 'var(--pink)';
        formStatus.textContent = '⚠ Please enter a valid email address.';
        return;
      }

      // Simulate sending
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(function () {
        formStatus.style.color = 'var(--lime)';
        formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
        btn.textContent = 'Send Message ↗';
        btn.disabled = false;
        contactForm.reset();

        setTimeout(function () { formStatus.textContent = ''; }, 5000);
      }, 1200);
    });
  }


  /* ──────────────────────────────────────────
     8. TYPING EFFECT FOR HERO TITLE
  ────────────────────────────────────────── */
  const heroTitle = document.querySelector('.hero-title-text');
  if (heroTitle) {
    const words = [
      'Data Analyst & ML Engineer',
      'Python Developer',
      'Machine Learning Enthusiast',
      'Data-Driven Problem Solver'
    ];

    let wordIndex  = 0;
    let charIndex  = 0;
    let isDeleting = false;
    let typingTimeout;

    function type() {
      const currentWord = words[wordIndex];

      if (!isDeleting) {
        heroTitle.textContent = currentWord.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentWord.length) {
          isDeleting = true;
          typingTimeout = setTimeout(type, 2200);
          return;
        }
      } else {
        heroTitle.textContent = currentWord.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex  = (wordIndex + 1) % words.length;
        }
      }

      typingTimeout = setTimeout(type, isDeleting ? 60 : 90);
    }

    // Start after 1s
    setTimeout(type, 1000);
  }


  /* ──────────────────────────────────────────
     9. ANIMATED COUNTER FOR HERO STATS
  ────────────────────────────────────────── */
  const statNums = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.textContent.trim(); // e.g. "3+", "100%", "6+"
      const suffix = raw.replace(/[0-9]/g, '');
      const target = parseInt(raw);

      if (isNaN(target)) return;
      counterObserver.unobserve(el);

      let count = 0;
      const duration = 1200; // ms
      const step = Math.ceil(target / (duration / 16));

      function tick() {
        count = Math.min(count + step, target);
        el.textContent = count + suffix;
        if (count < target) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });

  statNums.forEach(function (el) { counterObserver.observe(el); });


  /* ──────────────────────────────────────────
     10. PROJECT CARD TILT ON HOVER (desktop)
  ────────────────────────────────────────── */
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.project-card, .skill-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        const rect   = card.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = (e.clientX - cx) / (rect.width  / 2);
        const dy     = (e.clientY - cy) / (rect.height / 2);
        const rotX   = -dy * 4;
        const rotY   =  dx * 4;
        card.style.transform = 'translateY(-6px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }


  /* ──────────────────────────────────────────
     11. SCROLL TO TOP ON LOGO CLICK
  ────────────────────────────────────────── */
  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.style.cursor = 'pointer';
    navLogo.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
