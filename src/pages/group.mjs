import { html } from '../html.mjs';
import { band, pageHead } from '../layout.mjs';
import { todo, portrait } from '../components.mjs';
import { site } from '../../content/site.mjs';
import { group } from '../../content/teaching.mjs';

export const route = '/group';
export const file = 'group.html';
export const title = site.group.name || 'Research group';
export const description =
  `${site.group.name || 'The research group'} at the University of Arkansas at Little Rock, led by Vamshi Karanam: earth observation, geospatial science and natural hazards.`;

export function body() {
  return html`
${pageHead({
  title: site.group.name || 'Research group',
  lede: site.group.focus + '.',
})}

${band({
  cls: 'band-first',
  title: 'What we do',
  body: html`<p class="large">${group.intro}</p>
  ${site.group.name ? '' : todo('A name for the group. Set it in content/site.mjs and it appears here and in the page title.')}
  <dl class="deflist">
    ${group.directions.map((d) => html`<div><dt>${d.name}</dt><dd>${d.detail}</dd></div>`)}
  </dl>
  <p><a href="/research">Read about current research</a></p>`,
})}

${band({
  title: 'People',
  body: html`<ul class="plain people">
    <li class="person">
      ${portrait('portrait-small')}
      <div>
        <p class="person-name">${site.name}</p>
        <p class="person-role">Principal investigator. ${site.title}, ${site.institutionShort}</p>
        <p><a href="/about">Biography</a></p>
      </div>
    </li>
    ${group.members.map((m) => html`<li class="person">
      ${m.photo ? html`<img class="portrait portrait-small" src="${m.photo}" alt="Portrait of ${m.name}" loading="lazy">` : html`<div class="portrait portrait-small portrait-empty" aria-hidden="true"></div>`}
      <div>
        <p class="person-name">${m.name}</p>
        <p class="person-role">${m.role}</p>
        ${m.topic ? html`<p>${m.topic}</p>` : ''}
      </div>
    </li>`)}
  </ul>
  ${group.members.length ? '' : todo('Students and collaborators, as they join. Add them in content/teaching.mjs.')}`,
})}

${band({
  title: 'Openings',
  body: group.openings
    ? html`<p class="large">${group.openings}</p>
  <p class="actions"><a class="btn" href="mailto:${site.email}?subject=Joining%20the%20lab">Email ${site.email}</a></p>`
    : html`<p>${group.noOpenings}</p>`,
})}
`;
}
