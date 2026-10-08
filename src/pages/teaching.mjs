import { html } from '../html.mjs';
import { band, pageHead } from '../layout.mjs';
import { todo } from '../components.mjs';
import { site } from '../../content/site.mjs';
import { courses, earlierTeaching, teachingApproach, teachingStatement } from '../../content/teaching.mjs';

export const route = '/teaching';
export const file = 'teaching.html';
export const title = 'Teaching';
export const description =
  'Courses taught by Vamshi Karanam at the University of Arkansas at Little Rock: Earth and the Environment, its lab, and GIS I.';

export function body() {
  return html`
${pageHead({
  title: 'Teaching',
  lede: `At ${site.institutionShort} I teach introductory earth science and geographic information systems.`,
})}

${band({
  cls: 'band-first',
  title: `Courses at ${site.institutionShort}`,
  body: html`${teachingStatement ? html`<p class="large">${teachingStatement}</p>` : todo('A short teaching statement in your own words (optional).')}
  <ul class="plain course-list">
    ${courses.map((c) => {
      const missing = [!c.code && 'course number', !c.terms && 'terms taught', !c.syllabus && 'syllabus link'].filter(Boolean);
      return html`<li class="course">
        <h3>${c.name}</h3>
        ${c.code || c.level || c.terms ? html`<p class="course-meta">${[c.code, c.level, c.terms].filter(Boolean).join(', ')}</p>` : ''}
        <p>${c.description}</p>
        ${c.syllabus ? html`<p><a href="${c.syllabus}">Syllabus</a></p>` : ''}
        ${missing.length ? todo(`${missing.join(', ')}.`.replace(/^./, (ch) => ch.toUpperCase())) : ''}
      </li>`;
    })}
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
