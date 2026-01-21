/*
  Webpage/js/site.js

  This is the multi-page replacement for Archived/v1/app.js + router.js.

  Why router.js was removed:
  - The archived site used hash-based routing and dynamic HTML injection into #app-view.
  - This rebuild is a clean multi-page static site (index.html, about.html, ...).
  - Navigation now uses real links; each page contains its own HTML content.
*/

import { i18n } from './i18n.js';
import { AudioPlayer } from './audio_player.js';

function verifyLocalFontsLoaded() {
  // Non-invasive verification: log once if our two local fonts aren't available.
  // Note: it doesn't block rendering; it just helps catch 404s / mis-paths.
  try {
    if (!document.fonts) return;

    const fontsToCheck = [
      { name: 'YanZhenBody', sample: '16px "YanZhenBody"' },
      { name: 'SongHuiTitle', sample: '16px "SongHuiTitle"' }
    ];

    const loadPromises = fontsToCheck.map(async (f) => {
      try {
        await document.fonts.load(f.sample);
      } catch {
        // ignore
      }
    });

    Promise.all(loadPromises).then(() => {
      const missing = fontsToCheck.filter((f) => !document.fonts.check(f.sample)).map((f) => f.name);
      if (missing.length) {
        console.warn(
          `[fonts] Missing/failed to load: ${missing.join(', ')}. Check that Webpage/font/*.ttf is reachable and preloaded.`
        );
      }
    });
  } catch (err) {
    console.warn('[fonts] verification failed', err);
  }
}

function applyI18nToDom() {
  const nodes = document.querySelectorAll('[data-i18n]');
  if (!nodes.length) return;

  nodes.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    el.textContent = i18n.t(key);
  });
}

function applyChineseFontOnce() {
  try {
    const hanRegex = /\p{Script=Han}/u;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    let node;
    const marked = new Set();

    while ((node = walker.nextNode())) {
      if (node.nodeValue && hanRegex.test(node.nodeValue)) {
        const el = node.parentElement;
        if (el && !marked.has(el)) {
          el.classList.add('chinese-text');
          marked.add(el);
        }
      }
    }
  } catch (err) {
    console.warn('applyChineseFont error', err);
  }
}

function revealAosElements() {
  // Matches the router behavior: prevent elements from staying at opacity:0.
  try {
    if (window.gsap) {
      window.gsap.fromTo(
        '[data-aos="fade-up"]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, delay: 0.06 }
      );
    } else {
      document.body.classList.add('visible');
    }
  } catch (e) {
    document.body.classList.add('visible');
  }
}

function pageKeyFromMeta() {
  const el = document.querySelector('meta[name="ccc-page"]');
  return el?.getAttribute('content') || 'home';
}

function renderHeaderFooter() {
  const header = document.getElementById('global-header');
  const footer = document.getElementById('global-footer');
  const lang = i18n.getLanguage();

  const items = [
    { key: 'nav_home', href: 'index.html' },
    { key: 'nav_about', href: 'about.html' },
    { key: 'nav_events', href: 'events.html' },
    { key: 'nav_reg', href: 'registration.html' },
    { key: 'nav_gallery', href: 'gallery.html' },
    { key: 'nav_faq', href: 'faq.html' },
    { key: 'nav_contact', href: 'contact.html' }
  ];

  if (header) {
    header.innerHTML = `
      <nav class="flex items-center justify-between px-6 md:px-12 py-4 bg-paper/80 backdrop-blur-md border-b border-sage-green/10">
        <a class="flex items-center gap-3" href="index.html" aria-label="Home">
          <img src="assets/logo/logo_beige_base.png" alt="CCC Logo" class="w-10 h-10 md:w-11 md:h-11 object-contain" loading="eager" decoding="async" />
          <div>
            <div class="font-bold text-midnight-blue leading-none text-lg">五行归序传</div>
            <p class="text-[9px] uppercase tracking-[0.2em] text-sage-green font-bold">Elemental Genesis</p>
          </div>
        </a>

        <ul class="hidden lg:flex gap-8 items-center text-xs font-bold text-midnight-blue uppercase tracking-widest">
          ${items
            .map(
              (item) =>
                `<li><a href="${item.href}" class="hover:text-gold transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-gold">${i18n.t(
                  item.key
                )}</a></li>`
            )
            .join('')}
        </ul>

        <div class="flex items-center gap-4">
          <button id="lang-btn" class="bg-midnight-blue text-paper-white px-5 py-2 rounded-full text-xs font-bold hover:bg-gold hover:text-midnight-blue transition-all">
            ${lang === 'en' ? '中文' : 'EN'}
          </button>
        </div>
      </nav>
    `;
  }

  if (footer) {
    footer.innerHTML = `
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div class="space-y-4">
          <a href="index.html" class="inline-flex items-center gap-3" aria-label="Home">
            <img src="assets/logo/logo_beige_base.png" alt="CCC Logo" class="w-9 h-9 object-contain" loading="lazy" decoding="async" />
            <div class="text-2xl text-gold">Elemental Genesis</div>
          </a>
          <p class="text-sm opacity-70 italic">\"${i18n.t('footer_quote')}\"</p>
        </div>
        <div class="space-y-4">
          <h4 class="text-lg text-gold font-bold">${i18n.t('footer_links_title')}</h4>
          <div class="grid grid-cols-2 gap-2 text-sm opacity-80">
            <a href="about.html" class="hover:text-gold">${i18n.t('nav_about')}</a>
            <a href="events.html" class="hover:text-gold">${i18n.t('nav_events')}</a>
            <a href="registration.html" class="hover:text-gold">${i18n.t('nav_reg')}</a>
            <a href="contact.html" class="hover:text-gold">${i18n.t('nav_contact')}</a>
          </div>
        </div>
        <div class="space-y-6 md:text-right">
          <div class="flex md:justify-end gap-4">
            <a href="#" class="p-2 border border-white/20 rounded-full hover:border-gold transition-colors"><i data-lucide="instagram" class="w-5 h-5"></i></a>
            <a href="#" class="p-2 border border-white/20 rounded-full hover:border-gold transition-colors"><i data-lucide="facebook" class="w-5 h-5"></i></a>
          </div>
          <p class="text-xs opacity-50">${i18n.t('footer_rights')}</p>
        </div>
      </div>
    `;
  }

  if (window.lucide?.createIcons) window.lucide.createIcons();
}

function setupLanguageToggle() {
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('#lang-btn')) {
      const nextLang = i18n.getLanguage() === 'en' ? 'zh' : 'en';
      i18n.setLanguage(nextLang);
    }
  });
}

function setupEventsPosterSwap() {
  // Uses data attributes so the HTML stays static.
  const swapImgs = document.querySelectorAll('[data-lang-src-en][data-lang-src-zh]');
  if (!swapImgs.length) return;

  const apply = () => {
    const lang = i18n.getLanguage();
    swapImgs.forEach((img) => {
      const next = lang === 'en' ? img.getAttribute('data-lang-src-en') : img.getAttribute('data-lang-src-zh');
      if (next) img.setAttribute('src', next);
    });

    const swapLinks = document.querySelectorAll('[data-lang-href-en][data-lang-href-zh]');
    swapLinks.forEach((a) => {
      const next = lang === 'en' ? a.getAttribute('data-lang-href-en') : a.getAttribute('data-lang-href-zh');
      if (next) a.setAttribute('href', next);
    });

    if (window.lucide?.createIcons) window.lucide.createIcons();
  };

  apply();
  window.addEventListener('languageChanged', apply);
}

function setupRegistration() {
  const regForm = document.getElementById('reg-form');
  if (!regForm) return;

  // Lazy-load the module: only needed on registration.html
  import('./registration.js')
    .then(({ Registration }) => {
      new Registration().init();
    })
    .catch((e) => console.warn('Registration module failed to load', e));
}

function setupHeaderScrollState() {
  const apply = () => {
    const atTop = window.scrollY <= 4;
    document.body.classList.toggle('at-top', atTop);
  };

  apply();
  window.addEventListener('scroll', apply, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeaderFooter();
  setupLanguageToggle();
  setupHeaderScrollState();

  // Per-page meta updates (keeps the old i18n behavior without SPA routing)
  i18n.updateMetaTags(pageKeyFromMeta());

  applyI18nToDom();

  verifyLocalFontsLoaded();

  // init audio
  new AudioPlayer().init();

  // page-specific behaviors
  setupEventsPosterSwap();
  setupRegistration();

  applyChineseFontOnce();
  revealAosElements();

  // Re-render global elements on language change
  window.addEventListener('languageChanged', () => {
    renderHeaderFooter();
    i18n.updateMetaTags(pageKeyFromMeta());
    applyI18nToDom();
    applyChineseFontOnce();
    setupEventsPosterSwap();

    // Re-check (useful when switching languages quickly)
    verifyLocalFontsLoaded();
  });
});
