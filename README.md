# UngSex

Educational web platform about sex and health for young people, built for Norwegian schools.

## Pages

| File | Description |
|---|---|
| `index.html` | Front page — hero, topic overview |
| `page-one.html` | Topic list — side-by-side module cards |
| `page-two.html` | Module detail page — video, teacher resources |
| `article.html` | Article page |
| `snakk-om-sex.html` | Interactive game SPA (Kahoot-style quiz) |
| `style.html` | Design system / component styleguide |

## Game (`/snakk-om-sex`)

Single-page app with JS-driven screen switching — the URL never changes, similar to Kahoot.

**Screens in order:**
1. **Modul** — choose Klasserom or Hjemme
2. **Pin/QR** — waiting screen with player count
3. **Intro video** — module intro
4. **Question** — 4-answer multiple choice
5. **True/False** — Sant/Usant tiles
6. **Image reveal** — click the image to uncover 10% at a time, then pick an answer

## Stack

- Vanilla HTML, CSS, JS — no build step
- [Nunito](https://fonts.google.com/specimen/Nunito) via Google Fonts
- Custom `hg-icon` web component (`icons.js`)
- Shared utilities in `main.js` (nav toggle, scroll reveal, arrow icon injection)

## Dev

```bash
# Any static file server works, e.g.:
npx serve .
```

## Assets

- `assets/img/` — module and article images (`img-1.png` … `img-10.png`)
- `assets/floating_icons/` — decorative SVG icons used in hero sections
- `assets/favicon.svg` — purple circle with white "U"
- `style.css` — design tokens, components, layout
