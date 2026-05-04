/* ============================================================
   RALPH LAWAL GROUP — main.js
   Features: Navbar, Mobile Menu, Scroll Reveal,
             FAQ Accordion, Portfolio Filter, Form Validation
   ============================================================ */

'use strict';

/* ── NAVBAR STICKY ── */
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ── MOBILE MENU ── */
(function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── SMOOTH SCROLL ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();

/* ── SCROLL REVEAL ── */
(function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(item => observer.observe(item));
})();

/* ── FAQ ACCORDION ── */
(function initFAQ() {
  const faqs = document.querySelectorAll('.faq-question');
  if (!faqs.length) return;

  faqs.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        if (q.nextElementSibling) q.nextElementSibling.classList.remove('open');
      });

      // Toggle clicked
      if (!isOpen) {
        btn.classList.add('active');
        if (answer) answer.classList.add('open');
      }
    });
  });
})();

/* ── PORTFOLIO FILTER ── */
(function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      items.forEach(item => {
        const cat = item.dataset.category;
        if (filter === 'all' || cat === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'none';
          item.offsetHeight; // reflow
          item.style.animation = 'fadeInItem 0.4s ease forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
})();

/* ── CONTACT / BOOKING FORM VALIDATION ── */
(function initFormValidation() {
  const forms = document.querySelectorAll('.validate-form');
  if (!forms.length) return;

  forms.forEach(form => {
    form.addEventListener('submit', e => {
      let valid = true;

      // Clear previous errors
      form.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
      });

      // Validate required fields
      form.querySelectorAll('[required]').forEach(field => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          valid = false;
          if (group) group.classList.add('error');
        }
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
          const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRe.test(field.value.trim())) {
            valid = false;
            if (group) group.classList.add('error');
            const msg = group && group.querySelector('.form-error-msg');
            if (msg) msg.textContent = 'Please enter a valid email address.';
          }
        }
      });

      if (!valid) {
        e.preventDefault();
        const firstError = form.querySelector('.form-group.error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
})();

/* ── ACTIVE NAV LINK ── */
(function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-menu a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href') || '';
    // Normalize: strip trailing slash
    const linkPath = href.replace(/\/$/, '');
    const currentPath = path.replace(/\/$/, '');
    if (
      (linkPath && currentPath.endsWith(linkPath)) ||
      (linkPath === '' && (currentPath === '' || currentPath.endsWith('index.html')))
    ) {
      link.classList.add('active');
    }
  });
})();

/* ── STYLE ANIMATION KEYFRAMES (injected) ── */
(function injectKeyframes() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInItem {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
})();
