import { html, raw, esc, doiUrl } from './html.mjs';
import { laea, equalEarth, fit, pathFrom, graticule, loadGeo, formatLatLon } from './geo.mjs';
import { site } from '../content/site.mjs';
import { publications } from '../content/publications.mjs';
import { sites, home, themes } from '../content/research.mjs';
import { journey, journeyLegs } from '../content/about.mjs';

// ── Placeholders ───────────────────────────────────────────────────────────
// Shown only while site.showPlaceholders is true.
export function todo(text) {
  if (!site.showPlaceholders) return '';
  return html`<p class="todo"><span class="todo-tag">To add</span> ${text}</p>`;
}

export function figure(fig, fallbackAlt) {
  if (fig && fig.src) {
    return html`<figure class="fig">
  <img src="${fig.src}" alt="${fig.alt || fallbackAlt}" loading="lazy">
  ${fig.caption ? html`<figcaption>${fig.caption}</figcaption>` : ''}
</figure>`;
  }
  if (!site.showPlaceholders) return '';
  return html`<figure class="fig fig-empty">
  <div class="fig-slot" role="img" aria-label="Image placeholder">
    <span class="todo-tag">Image to add</span>
    <span class="fig-suggest">${fig?.suggestion || 'Research figure'}</span>
  </div>
</figure>`;
}

// ── Portrait ───────────────────────────────────────────────────────────────
export function portrait(cls = '') {
  return html`<picture class="portrait ${cls}">
  <source type="image/webp" srcset="/assets/img/vamshi-karanam-480.webp 480w, /assets/img/vamshi-karanam-800.webp 800w" sizes="(min-width: 860px) 320px, 60vw">
  <img src="/assets/img/vamshi-karanam-800.jpg" srcset="/assets/img/vamshi-karanam-480.jpg 480w, /assets/img/vamshi-karanam-800.jpg 800w" sizes="(min-width: 860px) 320px, 60vw" width="800" height="1000" alt="Portrait of Vamshi Karanam">
</picture>`;
}

// ── Publications ───────────────────────────────────────────────────────────
const byDoi = new Map(publications.filter((p) => p.doi).map((p) => [p.doi, p]));
export const findPub = (doi) => byDoi.get(doi);

function authorsHtml(authors) {
  // Bold the site owner's name wherever it appears in the author list.
  return raw(esc(authors).replace(/Karanam, V\./g, '<strong>Karanam, V.</strong>'));
}

export function pubHref(p) {
  return p.doi ? doiUrl(p.doi) : p.url || null;
}

export function pubItem(p, { compact = false } = {}) {
  const href = pubHref(p);
  const title = href ? html`<a href="${href}" target="_blank" rel="noopener">${p.title}</a>` : p.title;
  const text = [p.authors, p.title, p.venue, p.year].filter(Boolean).join(' ').toLowerCase();
  return html`<li class="pub" data-type="${p.type}" data-themes="${(p.themes || []).join(' ')}" data-text="${text}">
  <p class="pub-title">${title}</p>
  <p class="pub-meta">${authorsHtml(p.authors)}${p.year ? ` (${p.year}).` : p.authors.endsWith('.') ? '' : '.'}${p.venue ? html` <cite>${p.venue}</cite>${p.details ? `, ${p.details}` : ''}.` : ''}</p>
  ${!compact && (p.note || p.doi) ? html`<p class="pub-tags">${p.note ? html`<span class="tag">${p.note}</span>` : ''}${p.doi ? html`<span class="doi">doi:${p.doi}</span>` : ''}</p>` : ''}
</li>`;
}

// ── Maps ───────────────────────────────────────────────────────────────────
const themeName = Object.fromEntries(themes.map((t) => [t.id, t.title]));

function marker([x, y], { id, name, side = 'right', kind = 'site', sub = null }) {
  const dx = side === 'left' ? -12 : 12;
  const anchor = side === 'left' ? 'end' : 'start';
  const shape = kind === 'home'
    ? html`<rect x="${(x - 4.5).toFixed(1)}" y="${(y - 4.5).toFixed(1)}" width="9" height="9" class="map-home"/>`
    : html`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="13" class="map-halo"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5.5" class="map-dot"/>`;
  return html`<g class="map-site map-${kind}"${id ? raw(` data-site="${esc(id)}"`) : ''}>
    ${shape}
    <text x="${(x + dx).toFixed(1)}" y="${(y + 4.5).toFixed(1)}" text-anchor="${anchor}" class="map-label">${name}</text>
    ${sub ? html`<text x="${(x + dx).toFixed(1)}" y="${(y + 19).toFixed(1)}" text-anchor="${anchor}" class="map-sub">${sub}</text>` : ''}
  </g>`;
}

const regions = {
  northAmerica: { title: 'North America', center: [45, -106], view: [-138, 24, -72, 63], step: 10 },
  southAsia: { title: 'South Asia', center: [22, 82], view: [65, 7, 100, 36], step: 10 },
};

export function regionMap(name) {
  const r = regions[name];
  const geo = loadGeo(name);
  const { project, width, height } = fit(laea(r.center[0], r.center[1]), r.view, 440, 450);
  const here = sites.filter((s) => s.region === name);
  const label = `Map of ${r.title} showing study sites: ${here.map((s) => s.name).join(', ')}.`;
  return html`<svg class="map" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <path class="map-grid" d="${pathFrom(graticule(geo.box, r.step), project, false)}"/>
  <path class="map-land" d="${pathFrom(geo.land, project, true)}"/>
  ${geo.lakes ? html`<path class="map-water" d="${pathFrom(geo.lakes, project, true)}"/>` : ''}
  ${geo.lines ? html`<path class="map-lines" d="${pathFrom(geo.lines, project, false)}"/>` : ''}
  ${name === 'northAmerica' ? marker(project([home.lon, home.lat]), { name: home.name, kind: 'home', side: home.label, sub: 'UA Little Rock' }) : ''}
  ${here.map((s) => marker(project([s.lon, s.lat]), { id: s.id, name: s.name, side: s.label }))}
</svg>`;
}

export function siteMaps() {
  return html`<div class="sitemap" data-sitemap>
  <div class="sitemap-maps">
    <figure class="map-panel">${regionMap('northAmerica')}<figcaption>North America</figcaption></figure>
    <figure class="map-panel">${regionMap('southAsia')}<figcaption>South Asia</figcaption></figure>
  </div>
  <ul class="sitemap-list plain">
    ${sites.map((s) => html`<li data-site="${s.id}">
      <p class="site-name"><i class="place">${s.name}</i> <span class="coords">${formatLatLon(s.lat, s.lon)}</span></p>
      <p class="site-what">${s.what}</p>
      <p class="site-theme"><a href="/research#${s.theme}">${themeName[s.theme]}</a></p>
    </li>`)}
  </ul>
</div>`;
}

export function journeyMap() {
  const geo = loadGeo('world');
  const view = [-128, 2, 102, 63];
  const { project, width, height } = fit(equalEarth(-13), view, 920);
  const pos = Object.fromEntries(journey.map((j) => [j.id, project([j.lon, j.lat])]));
  // Legs are drawn as gentle arcs in map space, in the order of the journey.
  let legs = '';
  for (const [from, to, bend] of journeyLegs) {
    const a = pos[from], b = pos[to];
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const bulge = Math.min(90, len * 0.22) * bend;
    legs += `M${a[0].toFixed(1)},${a[1].toFixed(1)}Q${mx.toFixed(1)},${(my - bulge).toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}`;
  }
  const label = `World map tracing the path from ${journey.map((j) => j.place).join(' to ')}.`;
  return html`<svg class="map map-journey" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <path class="map-grid" d="${pathFrom(graticule([-180, -60, 180, 84], 30), project, false)}"/>
  <path class="map-land" d="${pathFrom(geo.land, project, true)}"/>
  <path class="map-route" d="${legs}"/>
  ${journey.map((j, i) => {
    const [x, y] = pos[j.id];
    const dx = j.label === 'left' ? -15 : 15;
    return html`<g class="map-stop">
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="10" class="map-stop-dot"/>
      <text x="${x.toFixed(1)}" y="${(y + 4.3).toFixed(1)}" text-anchor="middle" class="map-stop-num">${i + 1}</text>
      <text x="${(x + dx).toFixed(1)}" y="${(y + 5).toFixed(1)}" text-anchor="${j.label === 'left' ? 'end' : 'start'}" class="map-label">${j.place.split(',')[0]}</text>
    </g>`;
  })}
</svg>`;
}
