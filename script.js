/* =====================================================
   SWET DUBEY PORTFOLIO — script.js
   Handles: custom cursor, navbar scroll, active links,
   mobile menu, typed animation, scroll reveal
   ===================================================== */

/* ─── CUSTOM CURSOR ─────────────────────────────── */
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  // Dot snaps immediately
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth follower via RAF
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

/* ─── NAVBAR — scroll state ─────────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveLink();
}, { passive: true });

/* ─── ACTIVE NAV LINK on scroll ─────────────────── */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

/* ─── SMOOTH SCROLL for nav links ───────────────── */
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Close mobile menu if open
      navLinksEl.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
});

/* ─── HAMBURGER / MOBILE MENU ────────────────────── */
const hamburger  = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

/* ─── TYPED TEXT ANIMATION ───────────────────────── */
const typedEl   = document.getElementById('typedText');
const phrases   = [
  'modern web technologies.',
  'clean HTML, CSS & JavaScript.',
  'Shopify Liquid & custom themes.',
  'real-world, production-ready code.',
];
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingSpeed = 65;

function typeLoop() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
    typedEl.textContent = current.substring(0, charIndex);
    typingSpeed = 35;
  } else {
    charIndex++;
    typedEl.textContent = current.substring(0, charIndex);
    typingSpeed = 65;
  }

  if (!isDeleting && charIndex === current.length) {
    // Pause at end of phrase
    isDeleting = true;
    typingSpeed = 1600;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400;
  }

  setTimeout(typeLoop, typingSpeed);
}

// Start after initial animations settle
setTimeout(typeLoop, 1800);

/* ─── SCROLL REVEAL ──────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // reveal once
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

/* ─── HERO INITIAL ANIMATION TRIGGER ────────────── */
// Trigger hero reveals immediately on load
window.addEventListener('DOMContentLoaded', () => {
  // Small delay so CSS transitions fire properly
  requestAnimationFrame(() => {
    document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 100);
    });
  });
});
