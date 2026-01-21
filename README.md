# CCC-NTU Website (Multi-page Static Site)

This repo contains the **11th Chinese Cultural Camp (CCC)** website.

The original archived implementation (`Archived/v1`) used an SPA/hash-router that injected HTML into a single container.
The current implementation under `Webpage/` is a **clean multi-page static site** (separate `.html` per page) designed to run on any normal static file server (e.g. VSCode Live Server).

## Pages

All pages live directly under `Webpage/`:

- `index.html` (Home)
- `about.html`
- `events.html`
- `registration.html`
- `gallery.html`
- `faq.html`
- `contact.html`

Shared layout elements (header/footer/audio) are provided by `Webpage/js/site.js`.

## How to run locally

Use any static server (recommended over opening `file://` URLs).

### Option A: VSCode Live Server

1. Open this repo in VSCode
2. Right-click `Webpage/index.html`
3. Choose **“Open with Live Server”**

### Option B: Any static server

Serve the `Webpage/` folder as the web root.

Expected structure:

```
Webpage/
  index.html
  about.html
  events.html
  registration.html
  gallery.html
  faq.html
  contact.html
  styles.css
  js/
    site.js
    i18n.js
    audio_player.js
    registration.js
  assets/
    posters/
    audio/
    logo/
  font/
    Body-YanZhenQingDuoBaoTaBei-2.ttf
    Title-SongHuiZongShouJinJiaCuBan.ttf
```

## Fonts (Chinese – local only)

Chinese typography is required to use the two provided local `.ttf` files.

### Canonical font location

**Canonical location:** `Webpage/font/`

- `Webpage/font/Body-YanZhenQingDuoBaoTaBei-2.ttf`
- `Webpage/font/Title-SongHuiZongShouJinJiaCuBan.ttf`

### How fonts are loaded

1. `Webpage/styles.css` defines:
   - `@font-face { font-family: 'YanZhenBody'; src: url('./font/Body-YanZhenQingDuoBaoTaBei-2.ttf') ... }`
   - `@font-face { font-family: 'SongHuiTitle'; src: url('./font/Title-SongHuiZongShouJinJiaCuBan.ttf') ... }`

2. Every page preloads both fonts in `<head>`:

   - `./font/Body-YanZhenQingDuoBaoTaBei-2.ttf`
   - `./font/Title-SongHuiZongShouJinJiaCuBan.ttf`

3. Font families are referenced via CSS variables:

- `--font-body: 'YanZhenBody', serif;`
- `--font-title: 'SongHuiTitle', serif;`

### No Google Fonts dependency

Google Fonts links for Chinese are **not used** in the `Webpage/` site.
Chinese rendering should not depend on any remote font provider.

### Runtime font verification

On page load, `Webpage/js/site.js` performs a lightweight check:

- `document.fonts.load(...)`
- `document.fonts.check(...)`

If either font fails to load, you’ll see a console warning like:

- `[fonts] Missing/failed to load: YanZhenBody, SongHuiTitle ...`

## Events page behavior (EN/ZH)

`Webpage/events.html` supports bilingual SEO/content using the language toggle:

- Poster images switch via data attributes:
  - `data-lang-src-en` / `data-lang-src-zh`
  - `data-lang-href-en` / `data-lang-href-zh`

- Text labels and event metadata switch using the i18n key mechanism:
  - `data-i18n="events_*"`
  - Strings live in `Webpage/js/i18n.js`

Poster sources are stored under:

- `Webpage/assets/posters/MalaysiaRoadshow_{E,C}.jpg`
- `Webpage/assets/posters/SingaporeRoadshow_{E,C}.jpg`

### OCR note

The task originally requested local OCR (Tesseract/Python) of the poster images.
In this environment, both `tesseract` and Python (`python`/`py`) were not available on PATH, so automated OCR could not be executed here.

If you want to OCR locally and update the Events strings, install Tesseract and run, for example:

```powershell
# Example (requires tesseract installed)
tesseract .\Webpage\assets\posters\MalaysiaRoadshow_E.jpg stdout
```

Then update the corresponding keys in:

- `Webpage/js/i18n.js` (keys `events_*` and `event_*`)

## UX improvements included

- **Home hero overlay**: uses a glassy blur overlay (`.hero-glass`) for improved depth/readability.
- **Header at top**: when scrolled to top, the header background is slightly lighter (via `body.at-top`) to avoid looking too dark over the hero.

## Troubleshooting

- **Fonts not loading / Chinese looks wrong**:
  - Open DevTools → Network tab → filter `ttf`
  - Confirm both font requests succeed (no 404)
  - Confirm you’re serving from a static server (not `file://`)

- **Icons missing**:
  - Lucide is loaded via CDN; ensure you have network access.

- **Animations not running**:
  - GSAP is loaded via CDN; ensure you have network access.
