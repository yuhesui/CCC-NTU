// Minimal static server for local smoke testing (no dependencies).
// Usage (from Webpage/):
//   node js/dev_server.mjs
// Then open: http://localhost:5173

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const port = 5173;

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.ttf': 'font/ttf',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.mp3': 'audio/mpeg'
};

function safeJoin(urlPath) {
  const decoded = decodeURIComponent(urlPath);
  const cleaned = decoded.replace(/\0/g, '');
  const joined = path.join(root, cleaned);
  // prevent path traversal
  if (!joined.startsWith(root)) return null;
  return joined;
}

http
  .createServer((req, res) => {
    const raw = (req.url || '/').split('?')[0];
    const urlPath = raw === '/' ? '/index.html' : raw;

    const file = safeJoin(urlPath);
    if (!file) {
      res.statusCode = 400;
      res.end('Bad request');
      return;
    }

    fs.readFile(file, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('404');
        return;
      }

      const ext = path.extname(file).toLowerCase();
      res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream');
      res.end(data);
    });
  })
  .listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Serving Webpage on http://localhost:${port}`);
  });
