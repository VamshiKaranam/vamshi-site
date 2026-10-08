// Builds the site into dist/. No dependencies: run `node build.mjs`.
import { mkdirSync, rmSync, cpSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { page } from './src/layout.mjs';
import { html } from './src/html.mjs';
import { site } from './content/site.mjs';

import * as home from './src/pages/home.mjs';
import * as research from './src/pages/research.mjs';
import * as publications from './src/pages/publications.mjs';
import * as group from './src/pages/group.mjs';
import * as teaching from './src/pages/teaching.mjs';
import * as news from './src/pages/news.mjs';
import * as about from './src/pages/about.mjs';
import * as contact from './src/pages/contact.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
const buildDate = new Date();

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(root, 'static'), dist, { recursive: true });

// Add a short content hash to CSS/JS links so browsers pick up changes.
const hashes = new Map();
function assets(path) {
  if (!hashes.has(path)) {
    const file = join(dist, path);
    const h = existsSync(file) ? createHash('sha1').update(readFileSync(file)).digest('hex').slice(0, 8) : 'dev';
    hashes.set(path, h);
  }
  return `${path}?v=${hashes.get(path)}`;
}

const pages = [home, research, publications, group, teaching, news, about, contact];

for (const p of pages) {
  const out = page({
    route: p.route,
    title: p.title,
    description: p.description,
    body: p.body(),
    scripts: p.scripts || [],
    jsonLd: p.jsonLd || null,
    assets,
    buildDate,
  });
  writeFileSync(join(dist, p.file), out);
}

// 404 page
writeFileSync(
  join(dist, '404.html'),
  page({
    route: '/404',
    title: 'Page not found',
    description: 'That page does not exist.',
    body: html`<header class="page-head"><div class="wrap">
      <h1>Page not found</h1>
      <p class="lede">That address doesn’t match a page on this site. It may have moved when the site was rebuilt.</p>
      <p class="actions"><a class="btn" href="/">Go to the home page</a> <a class="btn btn-quiet" href="/publications">Publications</a></p>
    </div></header>`,
    assets,
    buildDate,
  }),
);

// sitemap.xml and robots.txt
const day = buildDate.toISOString().slice(0, 10);
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    pages.map((p) => `  <url><loc>${site.url}${p.route === '/' ? '/' : p.route}</loc><lastmod>${day}</lastmod></url>`).join('\n') +
    `\n</urlset>\n`,
);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

console.log(`Built ${pages.length + 1} pages into dist/`);
