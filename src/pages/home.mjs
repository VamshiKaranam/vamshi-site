import { html, link, doiUrl } from '../html.mjs';
import { band } from '../layout.mjs';
import { portrait, siteMaps, findPub, pubItem } from '../components.mjs';
import { site } from '../../content/site.mjs';
import { publications } from '../../content/publications.mjs';
import { media, stories } from '../../content/media.mjs';
import { updates } from '../../content/about.mjs';

export const route = '/';
export const file = 'index.html';
export const title = site.name;
export const description = site.description;
export const scripts = ['/assets/js/fringe.js', '/assets/js/maps.js'];

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

export function body() {
  const featured = findPub(stories.blowouts.doi);
  const blowoutOutlets = [...new Set(media.filter((m) => m.story === 'blowouts').map((m) => m.outlet))];
  const journals = publications.filter((p) => p.type === 'journal');
  const talks = publications.filter((p) => p.type === 'conference');
  const recent = journals.slice(0, 3);

  return html`
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-text">
      <h1>Measuring how the ground moves, from orbit.</h1>
      <p class="hero-lede">I’m Vamshi Karanam, ${site.title} at the ${site.institution}. I use satellite radar to find land that is sinking, rising or slipping, and physical models to work out what is driving it underground.</p>
      <p class="actions">
        <a class="btn" href="/research">Explore the research</a>
        <a class="btn btn-quiet" href="${site.cv}">Download CV</a>
      </p>
    </div>
    <figure class="fringe" data-fringe>
      <div class="fringe-frame"><canvas width="720" height="540" aria-hidden="true"></canvas></div>
      <figcaption>
        <div class="fringe-control">
          <label for="fringe-range">Peak ground motion</label>
          <input id="fringe-range" type="range" min="0" max="30" step="0.5" value="14">
          <output for="fringe-range" data-fringe-out>14 cm is 5.1 fringes</output>
        </div>
        <p>A simulated interferogram: sinking ground beside a patch of uplift, as a radar satellite would see them. Each full cycle of colour is 2.8 cm of motion along the line of sight of Sentinel-1. Drag the slider to deepen the bowl.</p>
      </figcaption>
    </figure>
  </div>
</section>

${band({
  title: 'About',
  body: html`<div class="about-grid">
    ${portrait()}
    <div>
      <p class="large">I study how human activity reshapes the ground beneath cities and energy basins: groundwater pumping in Delhi, oil and gas production in West Texas, coal fires in eastern India.</p>
      <p>The tools are satellite radar interferometry (InSAR), GNSS and GIS, combined with poroelastic models of the subsurface. I joined UA Little Rock in 2026 after a Ph.D. in Geophysics at Southern Methodist University, where I held a NASA FINESST award.</p>
      <dl class="facts">
        <div><dt>Journal articles</dt><dd>${journals.length}</dd></div>
        <div><dt>Conference presentations</dt><dd>${talks.length}</dd></div>
        <div><dt>News stories on the work</dt><dd>${media.length}</dd></div>
      </dl>
      <p class="actions"><a href="/about">More about me</a></p>
    </div>
  </div>`,
})}

${band({
  title: 'Where I work',
  wide: true,
  body: html`<p class="band-intro">Each marker is a place where the ground is moving, and where knowing how fast matters to the people living and working on it.</p>
  ${siteMaps()}`,
})}

${band({
  title: 'Featured study',
  body: html`<article class="feature">
    <div>
      <h3>Why old oil wells in West Texas are blowing out</h3>
      <p>Across the Permian Basin, long-abandoned wells have started to leak and, in some cases, erupt. Using satellite radar and subsurface modeling, this study traced the blowouts to wastewater injection by the oil and gas industry.</p>
      <ul class="plain pub-list">${pubItem(featured, { compact: true })}</ul>
      <p class="actions">
        ${link(doiUrl(featured.doi), 'Read the paper', 'btn')}
        <a class="btn btn-quiet" href="/news">See the coverage</a>
      </p>
    </div>
    <aside class="feature-press" aria-label="News outlets that reported on the study">
      <p class="feature-press-head">Reported by</p>
      <ul class="plain">${blowoutOutlets.map((o) => html`<li>${o}</li>`)}</ul>
    </aside>
  </article>`,
})}

${band({
  title: 'Recent papers',
  body: html`<ul class="plain pub-list">${recent.map((p) => pubItem(p, { compact: true }))}</ul>
  <p class="actions"><a href="/publications">All publications</a></p>`,
})}

${band({
  title: 'Latest',
  body: html`<ul class="plain updates">
    ${updates.map((u) => html`<li><span class="when">${u.year}</span><span>${u.url ? link(u.url, u.text) : u.text}</span></li>`)}
  </ul>`,
})}

${band({
  title: 'Work with me',
  body: html`<p class="large">I’m building a research group in ${site.group.focus.toLowerCase()} at ${site.institutionShort}.</p>
  <p>Students interested in satellite remote sensing, GIS or geophysical modeling are welcome to get in touch.</p>
  <p class="actions">
    <a class="btn" href="/group">About the group</a>
    <a class="btn btn-quiet" href="mailto:${site.email}">Email me</a>
  </p>`,
})}
`;
}
