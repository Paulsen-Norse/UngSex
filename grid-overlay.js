(function () {
  const COLUMNS = 12;
  const GUTTER = 24;
  const COLOR = 'rgba(255, 0, 0, 0.12)';

  const style = document.createElement('style');
  style.textContent = `
    #grid-overlay {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
      display: none;
    }
    #grid-overlay.visible {
      display: flex;
      justify-content: center;
    }
    #grid-overlay-inner {
      width: 100%;
      padding-inline: 16px;
      display: grid;
      grid-template-columns: repeat(${COLUMNS}, 1fr);
      gap: ${GUTTER}px;
      height: 100%;
      box-sizing: border-box;
    }
    @media (min-width: 810px) {
      #grid-overlay-inner { padding-inline: 32px; }
    }
    @media (min-width: 1200px) {
      #grid-overlay-inner { padding-inline: max(96px, calc((100vw - 1200px) / 2)); }
    }
    @media (max-width: 809px) {
      #grid-overlay-inner {
        padding-inline: 16px;
        grid-template-columns: repeat(6, 1fr);
      }
      .grid-col:nth-child(n+7) {
        display: none;
      }
    }
    .grid-col {
      background: ${COLOR};
      height: 100%;
    }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement('div');
  overlay.id = 'grid-overlay';
  const inner = document.createElement('div');
  inner.id = 'grid-overlay-inner';
  for (let i = 0; i < COLUMNS; i++) {
    const col = document.createElement('div');
    col.className = 'grid-col';
    inner.appendChild(col);
  }
  overlay.appendChild(inner);
  document.body.appendChild(overlay);

  function toggle() {
    overlay.classList.toggle('visible');
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'g' && !e.metaKey && !e.ctrlKey && !e.altKey &&
        !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
      toggle();
    }
  });
})();
