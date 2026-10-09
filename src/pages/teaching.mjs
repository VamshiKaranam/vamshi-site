import { html } from '../html.mjs';
import { band, pageHead } from '../layout.mjs';
import { site } from '../../content/site.mjs';
import { courses, earlierTeaching, teachingApproach, fieldPhoto } from '../../content/teaching.mjs';

export const route = '/teaching';
export const file = 'teaching.html';
export const title = 'Teaching';
export const description =
  'Courses taught by Vamshi Karanam at the University of Arkansas at Little Rock: Earth and the Environment, its lab, and GIS I.';

export function body() {
  return html`
${pageHead({ title: 'Teaching' })}

${band({
  cls: 'band-first',
  title: `Courses at ${site.institutionShort}`,
  body: html`${fieldPhoto ? html`<figure class="fig field-photo">
    <picture>
      <source type="image/webp" srcset="${fieldPhoto.webp}">
      <img src="${fieldPhoto.src}" alt="${fieldPhoto.alt}" width="${fieldPhoto.width}" height="${fieldPhoto.height}" decoding="async">
    </picture>
    <figcaption>${fieldPhoto.caption}</figcaption>
  </figure>` : ''}
  <ul class="plain course-list">
    ${courses.map((c) => html`<li class="course">
      <h3>${c.name}</h3>
      ${c.code || c.level || c.terms ? html`<p class="course-meta">${[c.code, c.level, c.terms].filter(Boolean).join(', ')}</p>` : ''}
      <p>${c.description}</p>
    </li>`)}
  </ul>`,
})}

${band({
  title: 'Earlier teaching',
  body: html`<dl class="deflist">
    ${earlierTeaching.map((t) => html`<div><dt>${t.where}</dt><dd>${t.what}</dd></div>`)}
  </dl>
  <p>${teachingApproach}</p>`,
})}
`;
}
