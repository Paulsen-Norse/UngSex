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

document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  initScrollReveal('.pg-anim');
});
