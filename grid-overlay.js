(function () {
  const COLUMNS = 12;
  const GUTTER = 24;
  const COLOR = 'rgba(255, 0, 0, 0.08)';
  const BORDER_COLOR = 'rgba(255, 0, 0, 0.25)';

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
      max-width: 1392px;
      padding-inline: 96px;
      display: grid;
      grid-template-columns: repeat(${COLUMNS}, 1fr);
      gap: ${GUTTER}px;
      height: 100%;
      box-sizing: border-box;
    }
    @media (max-width: 1199px) {
      #grid-overlay-inner {
        max-width: none;
        padding-inline: 32px;
      }
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
      border-left: 1px solid ${BORDER_COLOR};
      border-right: 1px solid ${BORDER_COLOR};
      height: 100%;
    }
    #grid-toggle {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 10000;
      background: rgba(20, 20, 20, 0.85);
      color: #fff;
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 8px;
      padding: 8px 14px;
      font-size: 12px;
      font-family: 'Nunito', sans-serif;
      cursor: pointer;
      backdrop-filter: blur(8px);
      user-select: none;
      transition: background 0.15s;
    }
    #grid-toggle:hover {
      background: rgba(40, 40, 40, 0.95);
    }
    #grid-toggle.active {
      border-color: rgba(255, 0, 0, 0.5);
      color: #ff6666;
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

  const btn = document.createElement('button');
  btn.id = 'grid-toggle';
  btn.textContent = 'Grid  G';
  document.body.appendChild(btn);

  function toggle() {
    const on = overlay.classList.toggle('visible');
    btn.classList.toggle('active', on);
  }

  btn.addEventListener('click', toggle);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'g' && !e.metaKey && !e.ctrlKey && !e.altKey &&
        !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
      toggle();
    }
  });
})();
