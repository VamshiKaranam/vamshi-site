import { html } from '../html.mjs';
import { pageHead } from '../layout.mjs';
import { pubItem } from '../components.mjs';
import { site } from '../../content/site.mjs';
import { publications, publicationTypes } from '../../content/publications.mjs';
import { themes } from '../../content/research.mjs';

export const route = '/publications';
export const file = 'publications.html';
export const title = 'Publications';
export const description =
  'Journal articles, conference presentations and work in preparation by Vamshi Karanam on InSAR, land subsidence, induced seismicity and geohazards.';
export const scripts = ['/assets/js/filter.js'];

export function body() {
  const scholar = site.profiles.find((p) => p.label === 'Google Scholar');
  const order = ['journal', 'preparation', 'thesis', 'conference'];
  const count = (t) => publications.filter((p) => p.type === t).length;

  return html`
${pageHead({
  title: 'Publications',
  lede: html`${count('journal')} journal articles and ${count('conference')} conference presentations. Citation counts are on ${scholar ? html`<a href="${scholar.url}" target="_blank" rel="noopener">Google Scholar</a>` : 'Google Scholar'}.`,
})}

<section class="band band-first" data-filter>
  <div class="wrap filter-layout">
    <form class="filters" role="search" aria-label="Filter publications" onsubmit="return false">
      <div class="filter-group" role="group" aria-label="Type">
        <button type="button" class="chip" data-filter-type="all" aria-pressed="true">All</button>
        <button type="button" class="chip" data-filter-type="journal" aria-pressed="false">Journal articles</button>
        <button type="button" class="chip" data-filter-type="conference" aria-pressed="false">Conference</button>
        <button type="button" class="chip" data-filter-type="preparation" aria-pressed="false">In preparation</button>
      </div>
      <div class="filter-row">
        <label class="field">
          <span>Topic</span>
          <select data-filter-theme>
            <option value="all">All topics</option>
            ${themes.map((t) => html`<option value="${t.id}">${t.title}</option>`)}
          </select>
        </label>
        <label class="field field-grow">
          <span>Search</span>
          <input type="search" data-filter-text placeholder="Title, author or venue" autocomplete="off">
        </label>
      </div>
      <p class="filter-status" data-filter-status aria-live="polite"></p>
    </form>

    <div class="filter-results">
    ${order.map((t) => html`<section class="pub-group" data-filter-group>
      <h2>${publicationTypes[t]}</h2>
      <ul class="plain pub-list">
        ${publications.filter((p) => p.type === t).map((p) => pubItem(p))}
      </ul>
    </section>`)}
    <p class="filter-empty" data-filter-empty hidden>No publications match. Clear the search or choose “All”.</p>
    </div>
  </div>
</section>
`;
}
