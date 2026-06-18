// ── Shared nav toggle ────────────────────────────────────────────────────────
function initNavToggle() {
  var nav    = document.getElementById('nav');
  var toggle = document.getElementById('nav-toggle');
  if (!nav || !toggle) return;

  function closeMenu() { nav.classList.remove('is-open'); }

  toggle.addEventListener('click', function () { nav.classList.toggle('is-open'); });
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

document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  initScrollReveal('.pg-anim');
  initArrowIcons();
});
