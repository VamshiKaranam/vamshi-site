import { html, link } from '../html.mjs';
import { band, pageHead } from '../layout.mjs';
import { portrait, journeyMap } from '../components.mjs';
import { site } from '../../content/site.mjs';
import { bio, journey, positions, education, awards, service } from '../../content/about.mjs';
import { jsonLd as person } from './home.mjs';

export const route = '/about';
export const file = 'about.html';
export const title = 'About';
export const description =
  'Vamshi Karanam trained as an architect, then in geospatial engineering and geophysics. He is now Assistant Professor of Geology at the University of Arkansas at Little Rock.';
export const jsonLd = person;

// One line per entry: what, where, when. An optional note runs underneath.
const row = (what, where, when, note = null) => html`<li>
  <p class="cv-role">${what}</p><p class="cv-org">${where}</p><p class="when">${when}</p>
  ${note ? html`<p class="cv-detail">${note}</p>` : ''}
</li>`;

export function body() {
  return html`
${pageHead({ title: 'About' })}

<section class="band band-first">
  <div class="wrap about-grid about-grid-page">
    ${portrait()}
    <div>
      ${bio.map((p, i) => html`<p${i === 0 ? html` class="large"` : ''}>${p}</p>`)}
      <p class="actions">
        <a class="btn" href="${site.cv}">Download CV (PDF)</a>
        <a class="btn btn-quiet" href="/contact">Contact</a>
      </p>
    </div>
  </div>
</section>

${band({
  title: 'Career path',
  wide: true,
  body: html`<div class="map-scroll" tabindex="0" role="group" aria-label="Career map">${journeyMap()}</div>
  <ol class="journey">
    ${journey.map((j) => html`<li>
      <p class="journey-place"><i class="place">${j.place}</i> <span class="when">${j.years}</span></p>
      <p>${j.what}</p>
    </li>`)}
  </ol>`,
})}

${band({
  title: 'Positions',
  wide: true,
  body: html`<ul class="plain cv-list">
    ${positions.map((p) => row(p.role, p.org, p.years))}
  </ul>`,
})}

${band({
  title: 'Education',
  wide: true,
  body: html`<ul class="plain cv-list">
    ${education.map((e) => row(e.degree, e.org, e.years, e.detail ? (e.url ? link(e.url, e.detail) : e.detail) : null))}
  </ul>`,
})}

${band({
  title: 'Grants and awards',
  wide: true,
  body: html`<ul class="plain cv-list">
    ${awards.map((a) => row(a.url ? link(a.url, a.name) : a.name, a.from, a.year))}
  </ul>`,
})}

${band({
  title: 'Service',
  body: html`<dl class="deflist">
    ${service.map((s) => html`<div><dt>${s.name}</dt><dd>${s.detail}</dd></div>`)}
  </dl>`,
})}
`;
}
