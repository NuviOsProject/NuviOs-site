/**
 * NuviOS — Official Website JavaScript
 * Version: 1.0.0
 * Pure JavaScript — No frameworks or libraries
 */

'use strict';

/* ============================================================
   PARTICLES CANVAS
   ============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let W, H;

  const CONFIG = {
    count: 80,
    maxRadius: 2.5,
    minRadius: 0.5,
    speed: 0.4,
    connectionDistance: 120,
    colors: ['rgba(0,212,255,', 'rgba(0,102,255,', 'rgba(0,255,204,'],
  };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    const colorBase = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
    return {
      x:      Math.random() * W,
      y:      Math.random() * H,
      vx:     (Math.random() - 0.5) * CONFIG.speed,
      vy:     (Math.random() - 0.5) * CONFIG.speed,
      r:      Math.random() * (CONFIG.maxRadius - CONFIG.minRadius) + CONFIG.minRadius,
      alpha:  Math.random() * 0.6 + 0.2,
      color:  colorBase,
    };
  }

  function initParticleList() {
    particles = [];
    for (let i = 0; i < CONFIG.count; i++) {
      particles.push(createParticle());
    }
  }

  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color + p.alpha + ')';
    ctx.fill();
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.connectionDistance) {
          const alpha = (1 - dist / CONFIG.connectionDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function update() {
    ctx.clearRect(0, 0, W, H);

    drawConnections();

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      drawParticle(p);
    });

    animationId = requestAnimationFrame(update);
  }

  function start() {
    resize();
    initParticleList();
    update();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(animationId);
      start();
    }, 200);
  });

  // Pause when tab is hidden to save resources
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      update();
    }
  });

  start();
})();

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  // Only on non-touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  let rafId;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    rafId = requestAnimationFrame(animateFollower);
  }

  animateFollower();

  const hoverTargets = 'a, button, [role="button"], input, textarea, select, .galeria__item, .faq__question, .feature-card, .social-card, .donation-card';

  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });
})();

/* ============================================================
   SMART NAVBAR
   ============================================================ */
(function initNavbar() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav__link');
  if (!header) return;

  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;

    // Add scrolled class for glass effect
    if (scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!header.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = document.querySelector(`.nav__link[href="#${id}"]`);

      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

/* ============================================================
   COUNTER ANIMATION (Hero Stats)
   ============================================================ */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
})();

/* ============================================================
   PROGRESS BAR (Donation Goal)
   ============================================================ */
(function initProgressBar() {
  const bar     = document.getElementById('metaBar');
  const percent = document.getElementById('metaPercent');
  if (!bar || !percent) return;

  const CURRENT = 847;
  const GOAL    = 4500;
  const PCT     = Math.round((CURRENT / GOAL) * 100);

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            bar.style.width = PCT + '%';

            // Animate percentage text
            let count = 0;
            const interval = setInterval(() => {
              count++;
              percent.textContent = count + '%';
              if (count >= PCT) clearInterval(interval);
            }, 1500 / PCT);
          }, 300);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(bar);
})();

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
(function initFAQ() {
  const questions = document.querySelectorAll('.faq__question');
  if (!questions.length) return;

  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answerId   = btn.getAttribute('aria-controls');
      const answer     = document.getElementById(answerId);

      // Close all others
      questions.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherId = otherBtn.getAttribute('aria-controls');
          const other   = document.getElementById(otherId);
          if (other) other.hidden = true;
        }
      });

      // Toggle current
      const newState = !isExpanded;
      btn.setAttribute('aria-expanded', String(newState));
      if (answer) answer.hidden = !newState;
    });

    // Keyboard support
    btn.addEventListener('keydown', e => {
      const items = Array.from(questions);
      const idx   = items.indexOf(btn);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = items[idx + 1] || items[0];
        next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = items[idx - 1] || items[items.length - 1];
        prev.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        items[0].focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1].focus();
      }
    });
  });
})();

/* ============================================================
   GALLERY LIGHTBOX
   ============================================================ */
(function initLightbox() {
  const items    = document.querySelectorAll('.galeria__item');
  const lightbox = document.getElementById('lightbox');
  const lbImage  = document.getElementById('lightboxImage');
  const lbCaption = document.getElementById('lightboxCaption');
  const lbClose  = document.getElementById('lightboxClose');

  if (!lightbox || !items.length) return;

  let lastFocused = null;

  function openLightbox(img, caption) {
    lastFocused = document.activeElement;
    lbImage.src = img.src;
    lbImage.alt = img.alt;
    lbCaption.textContent = caption;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    lbImage.src = '';
    if (lastFocused) lastFocused.focus();
  }

  items.forEach(item => {
    const img     = item.querySelector('img');
    const caption = item.querySelector('.galeria__caption span');

    item.addEventListener('click', () => {
      if (img) openLightbox(img, caption ? caption.textContent : '');
    });

    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (img) openLightbox(img, caption ? caption.textContent : '');
      }
    });
  });

  lbClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
})();

/* ============================================================
   PIX KEY COPY
   ============================================================ */
(function initPixCopy() {
  const copyBtn = document.getElementById('copyPix');
  const pixKey  = document.getElementById('pixKey');
  if (!copyBtn || !pixKey) return;

  copyBtn.addEventListener('click', async () => {
    const text = pixKey.textContent.trim();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity  = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }

      const originalHTML = copyBtn.innerHTML;
      copyBtn.classList.add('copied');
      copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copiado!`;

      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = originalHTML;
      }, 2500);

    } catch (err) {
      console.warn('Clipboard copy failed:', err);
    }
  });
})();

/* ============================================================
   FORM VALIDATION — CONTACT
   ============================================================ */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  function getField(id)    { return document.getElementById(id); }
  function getError(id)    { return document.getElementById(id + '-error'); }

  function showError(fieldId, msg) {
    const field = getField(fieldId);
    const error = getError(fieldId);
    if (field) field.classList.add('error');
    if (error) error.textContent = msg;
  }

  function clearError(fieldId) {
    const field = getField(fieldId);
    const error = getError(fieldId);
    if (field) field.classList.remove('error');
    if (error) error.textContent = '';
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validate() {
    let valid = true;

    const name    = getField('contactName');
    const email   = getField('contactEmail');
    const message = getField('contactMessage');

    clearError('contactName');
    clearError('contactEmail');
    clearError('contactMessage');

    if (!name || !name.value.trim()) {
      showError('contactName', 'Por favor, informe seu nome.');
      valid = false;
    } else if (name.value.trim().length < 2) {
      showError('contactName', 'O nome deve ter pelo menos 2 caracteres.');
      valid = false;
    }

    if (!email || !email.value.trim()) {
      showError('contactEmail', 'Por favor, informe seu e-mail.');
      valid = false;
    } else if (!validateEmail(email.value.trim())) {
      showError('contactEmail', 'Por favor, informe um e-mail válido.');
      valid = false;
    }

    if (!message || !message.value.trim()) {
      showError('contactMessage', 'Por favor, escreva sua mensagem.');
      valid = false;
    } else if (message.value.trim().length < 10) {
      showError('contactMessage', 'A mensagem deve ter pelo menos 10 caracteres.');
      valid = false;
    }

    return valid;
  }

  // Live validation
  ['contactName', 'contactEmail', 'contactMessage'].forEach(id => {
    const field = getField(id);
    if (field) {
      field.addEventListener('input', () => clearError(id));
      field.addEventListener('blur',  () => {
        if (id === 'contactEmail' && field.value && !validateEmail(field.value)) {
          showError(id, 'Por favor, informe um e-mail válido.');
        }
      });
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!validate()) return;

    const btn = form.querySelector('.form__submit');
    const originalHTML = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Enviando...`;

    // Simulate async send (replace with real API call)
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalHTML;
      form.reset();
      if (success) {
        success.hidden = false;
        setTimeout(() => { success.hidden = true; }, 6000);
      }
    }, 1800);
  });
})();

/* ============================================================
   NEWSLETTER FORMS
   ============================================================ */
(function initNewsletterForms() {
  function setupNewsletter(formId, feedbackId) {
    const form     = document.getElementById(formId);
    const feedback = feedbackId ? document.getElementById(feedbackId) : null;
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (!emailInput) return;

      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        if (feedback) {
          feedback.textContent = 'Por favor, informe um e-mail válido.';
          feedback.className = 'newsletter__feedback error';
        }
        emailInput.focus();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '...';
      }

      // Simulate subscription (replace with real API)
      setTimeout(() => {
        emailInput.value = '';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Cadastrar';
        }
        if (feedback) {
          feedback.textContent = 'Cadastrado com sucesso! Obrigado pelo interesse.';
          feedback.className = 'newsletter__feedback success';
          setTimeout(() => {
            feedback.textContent = '';
            feedback.className = 'newsletter__feedback';
          }, 5000);
        }
      }, 1200);
    });
  }

  setupNewsletter('newsletterForm', 'newsletter-feedback');
  setupNewsletter('footerNewsletterForm', null);
})();

/* ============================================================
   BACK TO TOP BUTTON
   ============================================================ */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  function toggleBtn() {
    if (window.scrollY > 400) {
      btn.hidden = false;
    } else {
      btn.hidden = true;
    }
  }

  window.addEventListener('scroll', toggleBtn, { passive: true });
  toggleBtn();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   FOOTER YEAR
   ============================================================ */
(function setFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ============================================================
   PARALLAX EFFECT (Hero)
   ============================================================ */
(function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroGlows = document.querySelectorAll('.hero__glow');
  if (!heroGlows.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        heroGlows.forEach((glow, i) => {
          const speed = i === 0 ? 0.3 : 0.2;
          glow.style.transform = `translateY(${scrollY * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ============================================================
   SMOOTH SCROLL for anchor links
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height') || '72',
        10
      );

      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ============================================================
   SPIN ANIMATION (for loading states)
   ============================================================ */
(function addSpinStyle() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    .spin { animation: spin 0.8s linear infinite; }
  `;
  document.head.appendChild(style);
})();

/* ============================================================
   FEATURE CARDS — Stagger reveal
   ============================================================ */
(function initFeatureStagger() {
  const cards = document.querySelectorAll('.feature-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.07}s`;
  });
})();

/* ============================================================
   ROADMAP — Animate items on scroll
   ============================================================ */
(function initRoadmapItems() {
  const items = document.querySelectorAll('.roadmap__item');
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.08}s`;
  });
})();

/* ============================================================
   KEYBOARD TRAP for Lightbox
   ============================================================ */
(function initLightboxTrap() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  lightbox.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;

    const focusable = lightbox.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
})();

/* ============================================================
   HERO IMAGE — Subtle float animation
   ============================================================ */
(function initHeroFloat() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroImg = document.querySelector('.hero__image-wrapper');
  if (!heroImg) return;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes heroFloat {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-12px); }
    }
    .hero__image-wrapper {
      animation: heroFloat 6s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================================
   DONATION CARDS — Hover glow effect
   ============================================================ */
(function initDonationGlow() {
  const cards = document.querySelectorAll('.donation-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });
})();

/* ============================================================
   SECTION DIVIDERS — Animated gradient lines
   ============================================================ */
(function initSectionDividers() {
  const style = document.createElement('style');
  style.textContent = `
    .section + .section::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 10%;
      right: 10%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent);
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================================
   PERFORMANCE: Lazy load images with fade-in
   ============================================================ */
(function initLazyImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  if (!images.length) return;

  const style = document.createElement('style');
  style.textContent = `
    img[loading="lazy"] { opacity: 0; transition: opacity 0.4s ease; }
    img[loading="lazy"].loaded { opacity: 1; }
  `;
  document.head.appendChild(style);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
          if (img.complete) img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    images.forEach(img => observer.observe(img));
  } else {
    images.forEach(img => img.classList.add('loaded'));
  }
})();

/* ============================================================
   ACCESSIBILITY: Skip to main content
   ============================================================ */
(function initSkipLink() {
  const skip = document.createElement('a');
  skip.href = '#main-content';
  skip.textContent = 'Pular para o conteúdo principal';
  skip.style.cssText = `
    position: fixed;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-primary);
    color: var(--color-bg);
    padding: 12px 24px;
    border-radius: 0 0 8px 8px;
    font-weight: 700;
    font-size: 14px;
    z-index: 9999;
    transition: top 0.2s;
    text-decoration: none;
  `;

  skip.addEventListener('focus', () => { skip.style.top = '0'; });
  skip.addEventListener('blur',  () => { skip.style.top = '-100%'; });

  document.body.insertBefore(skip, document.body.firstChild);
})();

/* ============================================================
   INIT LOG
   ============================================================ */
(function initLog() {
  const style = [
    'background: linear-gradient(135deg, #00d4ff, #0066ff)',
    'color: #050508',
    'font-weight: bold',
    'font-size: 14px',
    'padding: 8px 16px',
    'border-radius: 4px',
  ].join(';');

  console.log('%c NuviOS Website v1.0.0 ', style);
  console.log('%cO Sistema Operacional do Futuro', 'color: #00d4ff; font-size: 12px;');
})();
