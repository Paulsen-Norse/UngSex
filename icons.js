// Usage: <hg-icon name="home-01"></hg-icon>
// Optional attrs: size="24" color="currentColor"
// Icons from @hugeicons/core-free-icons via jsDelivr

const BASE = 'https://cdn.jsdelivr.net/npm/@hugeicons/core-free-icons@4.2.0/dist/esm/';
const cache = {};

function toModuleName(name) {
  return name.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('') + 'Icon.js';
}

async function fetchIcon(name) {
  if (cache[name]) return cache[name];
  const url = BASE + toModuleName(name);
  try {
    const mod = await import(url);
    const data = mod.default;
    cache[name] = data;
    return data;
  } catch (e) {
    console.warn('[hg-icon] not found:', name);
    return null;
  }
}

function buildSVG(data, size, color) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('overflow', 'visible');
  svg.style.display = 'block';
  svg.style.flexShrink = '0';

  for (const [tag, attrs] of data) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'key') continue;
      const attr = k.replace(/([A-Z])/g, '-$1').toLowerCase();
      if (k === 'strokeWidth') { el.setAttribute('stroke-width', '2'); continue; }
      el.setAttribute(attr, k === 'stroke' && v === 'currentColor' ? color : v);
    }
    svg.appendChild(el);
  }
  return svg;
}

class HgIcon extends HTMLElement {
  connectedCallback() { this._render(); }
  attributeChangedCallback() { this._render(); }
  static get observedAttributes() { return ['name', 'size', 'color']; }

  async _render() {
    const name = this.getAttribute('name');
    if (!name) return;
    const size = this.getAttribute('size') || '24';
    const color = this.getAttribute('color') || 'currentColor';
    const data = await fetchIcon(name);
    if (!data) return;
    this.innerHTML = '';
    this.appendChild(buildSVG(data, size, color));
  }
}

customElements.define('hg-icon', HgIcon);
