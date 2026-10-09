import { html, link, formatDate } from '../html.mjs';
import { band } from '../layout.mjs';
import { portrait, pubItem } from '../components.mjs';
import { site } from '../../content/site.mjs';
import { publications } from '../../content/publications.mjs';
import { media } from '../../content/media.mjs';
import { updates } from '../../content/about.mjs';
import { themes } from '../../content/research.mjs';

export const route = '/';
export const file = 'index.html';
export const title = site.name;
export const description = site.description;
export const scripts = ['/assets/js/fringe.js'];

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.title,
  affiliation: { '@type': 'CollegeOrUniversity', name: site.institution, url: site.institutionUrl },
  email: `mailto:${site.email}`,
  url: site.url,
  image: `${site.url}/assets/img/vamshi-karanam-square.jpg`,
  sameAs: site.profiles.map((p) => p.url),
  knowsAbout: ['InSAR', 'Satellite geodesy', 'Land subsidence', 'Poroelastic modeling', 'Geohazards', 'GIS', 'Remote sensing'],
};

const sortKey = (d) => (d.length === 4 ? `${d}-12-31` : d);

export function body() {
  const recent = publications.filter((p) => p.type === 'journal').slice(0, 4);
  const press = media.filter((m) => m.featured).sort((a, b) => sortKey(b.date).localeCompare(sortKey(a.date))).slice(0, 4);
  const profile = (label) => site.profiles.find((p) => p.label === label);

  return html`
<section class="intro">
  <div class="wrap intro-grid">
    ${portrait()}
    <div>
      <h1>${site.name}</h1>
      <p class="intro-role"><strong>${site.title}</strong><br>${site.department}, ${site.institution}</p>
      <div class="intro-bio">
        <p>I study how the ground deforms when fluids are pumped out of or into the subsurface. Most of my work is in the Permian Basin of West Texas and New Mexico, where oil and gas production and wastewater injection make the land sink and rise, reactivate faults and push old wells to blow out. I measure the motion with satellite radar interferometry (InSAR) and GNSS, and use geomechanical models to work out what is driving it underground. I have also worked on groundwater-driven subsidence beneath Delhi and coal fires in eastern India.</p>
        <p>I joined UA Little Rock in 2026 after a Ph.D. in Geophysics at Southern Methodist University, where I held a NASA FINESST award.</p>
      </div>
      <ul class="intro-links">
        <li><a href="mailto:${site.email}">${site.email}</a></li>
        <li><a href="${site.cv}">CV</a></li>
        ${['Google Scholar', 'ORCID'].map((l) => (profile(l) ? html`<li>${link(profile(l).url, l)}</li>` : ''))}
        <li><a href="/about">More about me</a></li>
      </ul>
    </div>
  </div>
</section>

${band({
  title: 'Research',
  body: html`<div class="research-grid">
    <div>
      <p>My main focus is fluid-driven deformation in the Permian Basin. Each area combines satellite measurements of ground motion with models of the processes underneath.</p>
      <ul class="plain theme-list">
        ${themes.map((t) => html`<li><a href="/research#${t.id}">${t.title}</a>${t.place ? html`<i class="place">${t.place}</i>` : ''}</li>`)}
      </ul>
    </div>
    <figure class="fringe" data-fringe>
      <div class="fringe-frame"><canvas width="720" height="540" aria-hidden="true"></canvas></div>
      <figcaption>
        <div class="band-switch" role="group" aria-label="Radar band">
          <button type="button" class="chip" data-band="X" aria-pressed="false">X-band</button>
          <button type="button" class="chip" data-band="C" aria-pressed="true">C-band</button>
          <button type="button" class="chip" data-band="L" aria-pressed="false">L-band</button>
        </div>
        <div class="fringe-control">
          <label for="fringe-range">Peak ground motion</label>
          <input id="fringe-range" type="range" min="0" max="30" step="0.5" value="14">
          <output for="fringe-range" data-fringe-out>14 cm is 5.1 fringes in C-band (Sentinel-1)</output>
        </div>
        <p>A simulated interferogram: sinking ground beside a patch of uplift. One colour cycle is half the radar wavelength.</p>
        <p class="fringe-more"><a class="try-btn" href="/research#drill">Try drilling your own wells <span aria-hidden="true">→</span></a></p>
      </figcaption>
    </figure>
  </div>`,
})}

${band({
  title: 'Recent publications',
  body: html`<ul class="plain pub-list">${recent.map((p) => pubItem(p, { compact: true }))}</ul>
  <p class="actions"><a href="/publications">All publications</a></p>`,
})}

${band({
  title: 'In the news',
  body: html`<ul class="plain news-list">
    ${press.map((m) => html`<li class="news-item">
      <p class="news-outlet">${m.outlet} <span class="when">${formatDate(m.date)}</span></p>
      <p class="news-title"><a href="${m.url}" target="_blank" rel="noopener">${m.title}</a></p>
    </li>`)}
  </ul>
  <p class="actions"><a href="/news">All ${media.length} stories</a></p>`,
})}

${band({
  title: 'Updates',
  body: html`<ul class="plain updates">
    ${updates.map((u) => html`<li><span class="when">${u.year}</span><span>${u.url ? link(u.url, u.text) : u.text}</span></li>`)}
  </ul>`,
})}

${band({
  title: 'Lab',
  body: html`<p>${site.group.name ? html`I lead the <a href="/group">${site.group.name}</a> at ${site.institutionShort}, a new group working on` : html`I’m building a <a href="/group">research group</a> at ${site.institutionShort} working on`} ${site.group.focus.toLowerCase()}.</p>`,
})}
`;
}
