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
        <p>I study how the ground deforms in response to human activity: groundwater pumping beneath Delhi, oil and gas production and wastewater injection in West Texas, coal fires in eastern India. I measure the motion with satellite radar interferometry (InSAR) and GNSS, and use poroelastic models to work out what is driving it underground.</p>
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
      <p>My work falls into four areas. Each combines satellite measurements of ground motion with models of the processes underneath.</p>
      <ul class="plain theme-list">
        ${themes.map((t) => html`<li><a href="/research#${t.id}">${t.title}</a>${t.place ? html`<i class="place">${t.place}</i>` : ''}</li>`)}
      </ul>
    </div>
    <figure class="fringe" data-fringe>
      <div class="fringe-frame"><canvas width="720" height="540" aria-hidden="true"></canvas></div>
      <figcaption>
        <div class="fringe-control">
          <label for="fringe-range">Peak ground motion</label>
          <input id="fringe-range" type="range" min="0" max="30" step="0.5" value="14">
          <output for="fringe-range" data-fringe-out>14 cm is 5.1 fringes</output>
        </div>
        <p>A simulated interferogram of sinking ground beside a patch of uplift. Each full cycle of colour is 2.8 cm of motion along the line of sight of Sentinel-1. Drag the slider to change the amount of motion.</p>
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
