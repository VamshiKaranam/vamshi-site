import { html, formatDate, doiUrl } from '../html.mjs';
import { pageHead } from '../layout.mjs';
import { findPub } from '../components.mjs';
import { media, stories } from '../../content/media.mjs';

export const route = '/news';
export const file = 'news.html';
export const title = 'Media';
export const description =
  'News coverage of research by Vamshi Karanam: Permian Basin well blowouts, induced earthquakes in West Texas, and land subsidence in Delhi.';
export const scripts = ['/assets/js/filter.js'];

const sortKey = (d) => (d.length === 4 ? `${d}-12-31` : d);

export function body() {
  const sorted = [...media].sort((a, b) => sortKey(b.date).localeCompare(sortKey(a.date)));
  const outlets = new Set(media.map((m) => m.outlet));
  const featured = sorted.filter((m) => m.featured);
  const storyOrder = Object.keys(stories).sort((a, b) => {
    const latest = (k) => sortKey(sorted.find((m) => m.story === k)?.date || '0');
    return latest(b).localeCompare(latest(a));
  });

  const item = (m) => html`<li class="news-item" data-type="${m.story}" data-text="${[m.title, m.outlet, m.author].filter(Boolean).join(' ').toLowerCase()}">
    <p class="news-outlet">${m.outlet} <span class="when">${formatDate(m.date)}</span></p>
    <p class="news-title"><a href="${m.url}" target="_blank" rel="noopener"${m.lang ? html` lang="${m.lang}"` : ''}>${m.title}</a></p>
    ${m.author && m.author !== m.outlet ? html`<p class="news-by">${m.author}</p>` : ''}
  </li>`;

  return html`
${pageHead({
  title: 'Media',
  lede: `${media.length} stories from ${outlets.size} outlets have reported on this research, from regional papers in Texas and New Mexico to Reuters, Bloomberg and the BBC.`,
})}

<section class="band band-first">
  <div class="wrap">
    <h2 class="visually-hidden">Selected coverage</h2>
    <ul class="plain headline-grid">
      ${featured.map((m) => html`<li>
        <p class="news-outlet">${m.outlet} <span class="when">${formatDate(m.date)}</span></p>
        <p class="headline"><a href="${m.url}" target="_blank" rel="noopener">${m.title}</a></p>
      </li>`)}
    </ul>
  </div>
</section>

<section class="band" data-filter>
  <div class="wrap filter-layout">
    <form class="filters" role="search" aria-label="Filter coverage" onsubmit="return false">
      <div class="filter-group" role="group" aria-label="Story">
        <button type="button" class="chip" data-filter-type="all" aria-pressed="true">All coverage</button>
        ${storyOrder.map((k) => html`<button type="button" class="chip" data-filter-type="${k}" aria-pressed="false">${stories[k].label}</button>`)}
      </div>
      <div class="filter-row">
        <label class="field field-grow">
          <span>Search</span>
          <input type="search" data-filter-text placeholder="Headline, outlet or reporter" autocomplete="off">
        </label>
      </div>
      <p class="filter-status" data-filter-status aria-live="polite"></p>
    </form>

    <div class="filter-results">
    ${storyOrder.map((k) => {
      const s = stories[k];
      const paper = s.doi ? findPub(s.doi) : null;
      return html`<section class="story" data-filter-group>
        <div class="story-head">
          <h2>${s.label}</h2>
          <p>${s.summary}</p>
          ${paper ? html`<p class="story-paper">The paper: <a href="${doiUrl(paper.doi)}" target="_blank" rel="noopener"><cite>${paper.venue}</cite>, ${paper.year}</a></p>` : ''}
        </div>
        <ul class="plain news-list">${sorted.filter((m) => m.story === k).map(item)}</ul>
      </section>`;
    })}
    <p class="filter-empty" data-filter-empty hidden>No stories match. Clear the search or choose “All coverage”.</p>
    </div>
  </div>
</section>
`;
}
