// ── Shared nav toggle ────────────────────────────────────────────────────────
var FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusable(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE)).filter(function (el) {
    return el.offsetParent !== null;
  });
}

function initNavToggle() {
  var nav    = document.getElementById('nav');
  var toggle = document.getElementById('nav-toggle');
  if (!nav || !toggle) return;

  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    var menu = nav.querySelector('.nav__mobile-menu');
    if (menu) {
      var first = getFocusable(menu)[0];
      if (first) first.focus();
    }
  }

  toggle.setAttribute('aria-expanded', 'false');
  toggle.addEventListener('click', function () {
    nav.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  // Escape closes menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });

  // Tab trap inside mobile menu
  nav.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || !nav.classList.contains('is-open')) return;
    var menu = nav.querySelector('.nav__mobile-menu');
    if (!menu) return;
    var focusable = getFocusable(menu);
    focusable.unshift(toggle);
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

  window.addEventListener('resize', function () { if (window.innerWidth >= 810) closeMenu(); });
}

// ── Shared scroll-reveal (IntersectionObserver on .pg-anim elements) ─────────
function initScrollReveal(selector) {
  var els = Array.from(document.querySelectorAll(selector));
  if (!els.length) return;

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0 });

  requestAnimationFrame(function () {
    els.forEach(function (el) {
      if (el.getBoundingClientRect().bottom <= 0) { el.classList.add('is-visible'); }
      else { obs.observe(el); }
    });
  });
}

// ── Arrow icon injection for .btn--arrow buttons ──────────────────────────────
var BTN_ARROW_SVG = '<svg class="btn-icon" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="btn-icon__line" d="M1.5 6h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><g class="btn-icon__chevron"><path d="M3.5 2l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g></svg>';

function initArrowIcons() {
  document.querySelectorAll('.btn--arrow .btn-icon-wrap').forEach(function (wrap) {
    if (!wrap.innerHTML.trim()) wrap.innerHTML = BTN_ARROW_SVG;
  });
}

// ── Skip to content link ──────────────────────────────────────────────────────
function initSkipLink() {
  var skip = document.createElement('a');
  skip.className = 'skip-link';
  skip.href = '#main-content';
  skip.textContent = 'Hopp til innhold';
  skip.addEventListener('click', function (e) { handleSkip(e); });
  skip.addEventListener('keydown', function (e) { if (e.key === 'Enter') handleSkip(e); });
  document.body.prepend(skip);

  function handleSkip(e) {
    e.preventDefault();
    var main = document.getElementById('main-content');
    if (!main) return;
    var first = main.querySelector('a[href], button:not([disabled]), [tabindex="0"]');
    if (first) { first.focus(); } else { main.focus(); }
  }
}

// ── Page-wide focus loop (wraps Tab from last element back to first) ───────────
function initFocusLoop() {
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var focusable = Array.from(document.querySelectorAll(FOCUSABLE)).filter(function (el) {
      return el.offsetParent !== null;
    });
    if (focusable.length < 2) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  initScrollReveal('.pg-anim');
  initArrowIcons();
  initSkipLink();
  initFocusLoop();
});
