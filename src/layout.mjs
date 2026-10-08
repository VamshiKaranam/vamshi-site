import { html, raw, esc } from './html.mjs';
import { site, nav } from '../content/site.mjs';

const icon = {
  sun: raw('<svg class="i-sun" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'),
  moon: raw('<svg class="i-moon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M20 14.2A8 8 0 0 1 9.8 4a8 8 0 1 0 10.2 10.2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>'),
};

// The site mark: a subsidence bowl drawn as contour lines.
const mark = raw('<svg viewBox="0 0 64 64" width="30" height="30" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="4"><circle cx="32" cy="32" r="28"/><circle cx="29" cy="34.5" r="19.5"/><circle cx="26.5" cy="36.5" r="11"/><circle cx="24.5" cy="38" r="3" fill="currentColor" stroke="none"/></svg>');

// Runs before first paint so the saved theme never flashes.
const themeScript = raw(`<script>(function(){var d=document.documentElement;d.classList.remove('no-js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.setAttribute('data-theme',t);}catch(e){}})();</script>`);

export function page({ route, title, description, body, assets, scripts = [], jsonLd = null, buildDate }) {
  const fullTitle = route === '/' ? `${site.name} | ${site.title}, ${site.institutionShort}` : `${title} | ${site.name}`;
  const desc = description || site.description;
  const canonical = site.url + (route === '/' ? '/' : route);
  const year = buildDate.getFullYear();
  const updated = buildDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return html`<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${fullTitle}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${fullTitle}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}/assets/img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#111318" media="(prefers-color-scheme: dark)">
<link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">
<link rel="icon" type="image/png" sizes="48x48" href="/assets/img/favicon-48.png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/fonts/archivo-var.woff2">
<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/fonts/source-serif-4-var.woff2">
<link rel="stylesheet" href="${assets('/assets/css/site.css')}">
${themeScript}
${jsonLd ? raw(`<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`) : ''}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap header-row">
    <a class="brand" href="/"${route === '/' ? raw(' aria-current="page"') : ''}>
      ${mark}
      <span>${site.name}</span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
    <nav id="site-nav" class="site-nav" aria-label="Main">
      <ul>
        ${nav.map((n) => html`<li><a href="${n.href}"${route === n.href ? raw(' aria-current="page"') : ''}>${n.label}</a></li>`)}
      </ul>
    </nav>
    <button class="theme-toggle" type="button" aria-label="Switch between light and dark theme" title="Switch theme">${icon.sun}${icon.moon}</button>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <p class="footer-name">${site.name}</p>
      <p>${site.title}<br>${site.department}<br>${site.institution}</p>
    </div>
    <div>
      <p class="footer-head">Contact</p>
      <p><a href="mailto:${site.email}">${site.email}</a><br>${site.phone}<br>${site.office.room}, ${site.office.lines[1]}<br>${site.office.lines[2]}</p>
    </div>
    <div>
      <p class="footer-head">Elsewhere</p>
      <ul class="plain">
        ${site.profiles.map((p) => html`<li><a href="${p.url}" target="_blank" rel="noopener">${p.label}</a></li>`)}
        <li><a href="${site.cv}">Curriculum vitae (PDF)</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap footer-compact">
    <p class="footer-name">${site.name}</p>
    <p>${site.title}, ${site.institutionShort}</p>
    <p><a href="mailto:${site.email}">${site.email}</a></p>
    <ul class="footer-links">
      ${site.profiles.map((p) => html`<li><a href="${p.url}" target="_blank" rel="noopener">${p.label}</a></li>`)}
      <li><a href="${site.cv}">CV</a></li>
    </ul>
  </div>
  <div class="wrap">
    <p class="footer-base">© ${year} ${site.name}. Last updated ${updated}.</p>
  </div>
</footer>
<script src="${assets('/assets/js/site.js')}" defer></script>
${scripts.map((s) => html`<script src="${assets(s)}" defer></script>`)}
</body>
</html>
`.toString();
}

// A band is the page's basic section: a title in the margin, content beside it.
export function band({ title, id = null, body, wide = false, cls = '' }) {
  return html`<section class="band${cls ? ' ' + cls : ''}"${id ? raw(` id="${esc(id)}"`) : ''}>
  <div class="wrap band-grid${wide ? ' band-wide' : ''}">
    <h2 class="band-title">${title}</h2>
    <div class="band-body">${body}</div>
  </div>
</section>`;
}

export function pageHead({ title, lede = null }) {
  return html`<header class="page-head">
  <div class="wrap">
    <h1>${title}</h1>
    ${lede ? html`<p class="lede">${lede}</p>` : ''}
  </div>
</header>`;
}
