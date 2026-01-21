// Quick verification script for the multi-page site.
// Usage (from repo root):
//   node Webpage/js/verify_site.mjs

import fs from 'node:fs';
import path from 'node:path';

const webpageDir = path.resolve('C:/Users/jeanna/WebstormProjects/CCC-NTU/Webpage');

const requiredPages = [
  'index.html',
  'about.html',
  'events.html',
  'registration.html',
  'gallery.html',
  'faq.html',
  'contact.html'
];

const requiredFontPreloads = [
  './font/Body-YanZhenQingDuoBaoTaBei-2.ttf',
  './font/Title-SongHuiZongShouJinJiaCuBan.ttf'
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const p of requiredPages) {
  const full = path.join(webpageDir, p);
  assert(fs.existsSync(full), `Missing page: ${p}`);
  const content = fs.readFileSync(full, 'utf8');

  for (const preload of requiredFontPreloads) {
    assert(content.includes(preload), `Missing font preload (${preload}) in ${p}`);
  }
}

const cssPath = path.join(webpageDir, 'styles.css');
assert(fs.existsSync(cssPath), 'Missing styles.css');
const css = fs.readFileSync(cssPath, 'utf8');
assert(css.includes("font-family: 'YanZhenBody'"), 'Expected YanZhenBody font-face in styles.css');
assert(css.includes("font-family: 'SongHuiTitle'"), 'Expected SongHuiTitle font-face in styles.css');
assert(css.includes("url('./font/Body-YanZhenQingDuoBaoTaBei-2.ttf')"), 'Expected Body font path to ./font in styles.css');
assert(css.includes("url('./font/Title-SongHuiZongShouJinJiaCuBan.ttf')"), 'Expected Title font path to ./font in styles.css');

console.log('OK: pages exist');
console.log('OK: font preloads present on all pages');
console.log('OK: styles.css uses ./font for both @font-face rules');
