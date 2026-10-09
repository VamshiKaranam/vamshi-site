import { html, link } from '../html.mjs';
import { band, pageHead } from '../layout.mjs';
import { portrait } from '../components.mjs';
import { site } from '../../content/site.mjs';
import { bio, candid, positions, education, awards, service } from '../../content/about.mjs';
import { jsonLd as person } from './home.mjs';

export const route = '/about';
export const file = 'about.html';
export const title = 'About';
export const description =
  'Vamshi Karanam trained as an architect, then in geospatial engineering and geophysics. He is now Assistant Professor of Geology at the University of Arkansas at Little Rock.';
export const jsonLd = person;

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
    ${candid ? html`<figure class="candid">
        <picture>
          <source type="image/webp" srcset="${candid.webp}">
          <img src="${candid.src}" alt="${candid.alt}" width="${candid.width}" height="${candid.height}" loading="lazy" decoding="async">
        </picture>
        <figcaption>${candid.caption}</figcaption>
      </figure>` : ''}
  </div>
</section>

${band({
  title: 'Positions',
  body: html`<ul class="plain cv-list">
    ${positions.map((p) => html`<li>
      <p class="when">${p.years}</p>
      <div><p class="cv-role">${p.role}</p><p class="cv-org">${p.org}</p>${p.detail ? html`<p class="cv-detail">${p.detail}</p>` : ''}</div>
    </li>`)}
  </ul>`,
})}

${band({
  title: 'Education',
  body: html`<ul class="plain cv-list">
    ${education.map((e) => html`<li>
      <p class="when">${e.years}</p>
      <div><p class="cv-role">${e.degree}</p><p class="cv-org">${e.org}</p>${e.detail ? html`<p class="cv-detail">${e.url ? link(e.url, e.detail) : e.detail}</p>` : ''}</div>
    </li>`)}
  </ul>`,
})}

${band({
  title: 'Grants and awards',
  body: html`<ul class="plain cv-list">
    ${awards.map((a) => html`<li>
      <p class="when">${a.year}</p>
      <div><p class="cv-role">${a.url ? link(a.url, a.name) : a.name}</p><p class="cv-org">${a.from}</p></div>
    </li>`)}
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
