import { html, raw } from '../html.mjs';
import { band, pageHead } from '../layout.mjs';
import { figure, siteMaps, findPub, pubItem } from '../components.mjs';
import { site } from '../../content/site.mjs';
import { themes, methods, software } from '../../content/research.mjs';
import { media } from '../../content/media.mjs';

export const route = '/research';
export const file = 'research.html';
export const title = 'Research';
export const description =
  'Research on fluid-driven deformation and geohazards in the Permian Basin using InSAR, GNSS and geomechanical modeling, along with work on Delhi, the Jharia Coalfields and beyond.';
export const scripts = ['/assets/js/maps.js', '/assets/js/lightbox.js', '/assets/js/wells.js'];

// How InSAR turns two radar passes into a measurement of ground motion.
const schematic = raw(`<svg class="schematic" viewBox="0 0 480 500" role="img" aria-labelledby="sch-t sch-d">
  <title id="sch-t">How radar interferometry measures ground motion</title>
  <desc id="sch-d">A satellite images the same ground on two passes. Where the ground has sunk between passes, the radar signal travels slightly farther. That extra distance shows up as a shift in the phase of the returning wave, which is mapped as coloured fringes.</desc>
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="sch-fill"/></marker>
  </defs>
  <!-- orbit and satellite -->
  <path d="M20,64 C110,30 210,30 330,60" class="sch-orbit"/>
  <g transform="translate(120,42) rotate(-8)">
    <rect x="-13" y="-8" width="26" height="16" rx="2" class="sch-sat"/>
    <rect x="-44" y="-5" width="27" height="10" class="sch-panel"/>
    <rect x="17" y="-5" width="27" height="10" class="sch-panel"/>
  </g>
  <text x="120" y="16" text-anchor="middle" class="sch-label">Same orbit, two passes</text>
  <!-- ground before and after -->
  <path d="M20,236 H220 C260,236 270,266 300,266 C330,266 340,236 380,236 H460 V310 H20 Z" class="sch-ground"/>
  <path d="M220,236 H380" class="sch-before"/>
  <path d="M20,236 H220 C260,236 270,266 300,266 C330,266 340,236 380,236 H460" class="sch-after"/>
  <!-- line of sight, pass 1 and pass 2 -->
  <line x1="126" y1="54" x2="293" y2="236" class="sch-ray sch-ray-1"/>
  <line x1="126" y1="54" x2="293" y2="265" class="sch-ray sch-ray-2"/>
  <text x="160" y="128" class="sch-note" transform="rotate(48 160 128)">radar line of sight</text>
  <!-- displacement -->
  <line x1="308" y1="241" x2="308" y2="261" class="sch-dim" marker-start="url(#arr)" marker-end="url(#arr)"/>
  <text x="300" y="292" text-anchor="middle" class="sch-label">the ground has sunk</text>
  <!-- legend -->
  <line x1="20" y1="336" x2="50" y2="336" class="sch-before"/>
  <text x="58" y="340" class="sch-note">surface at pass 1</text>
  <line x1="230" y1="336" x2="260" y2="336" class="sch-after"/>
  <text x="268" y="340" class="sch-note">surface at pass 2</text>
  <!-- phase panel -->
  <g transform="translate(20,384)">
    <text x="0" y="0" class="sch-label">The returning wave arrives shifted</text>
    <text x="0" y="26" class="sch-note">pass 1</text>
    <path d="M60,26 q10,-22 20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0" class="sch-wave sch-ray-1"/>
    <text x="0" y="70" class="sch-note">pass 2</text>
    <path d="M67,70 q10,-22 20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0" class="sch-wave sch-ray-2"/>
    <line x1="80" y1="32" x2="80" y2="76" class="sch-tick"/>
    <line x1="87" y1="32" x2="87" y2="76" class="sch-tick"/>
    <text x="0" y="104" class="sch-note">phase shift = extra distance travelled</text>
  </g>
</svg>`);

const papers = (dois) => (dois.length
  ? html`<h3>Papers</h3><ul class="plain pub-list">${dois.map((d) => findPub(d)).filter(Boolean).map((p) => pubItem(p, { compact: true }))}</ul>`
  : '');

function coverage(story) {
  const items = media.filter((m) => m.story === story);
  if (!items.length) return '';
  const outlets = [...new Set(items.filter((m) => m.featured).map((m) => m.outlet))].slice(0, 4);
  return html`<p class="study-press">In the news: ${outlets.join(', ')} and others. <a href="/news#story-${story}">All ${items.length} stories</a></p>`;
}

const hasFig = (f) => f?.src || site.showPlaceholders;

function study(st) {
  const wide = st.figure?.wide;
  return html`<div class="study" id="${st.id}">
  <div class="theme${wide ? ' theme-stack' : hasFig(st.figure) ? '' : ' theme-nofig'}">
    <div class="theme-top">
      <h3 class="study-title">${st.title}</h3>
      ${st.place ? html`<p class="theme-place"><i class="place">${st.place}</i></p>` : ''}
      ${st.text.map((t) => html`<p>${t}</p>`)}
    </div>
    ${!wide && hasFig(st.figure) ? html`<div class="theme-fig">${figure(st.figure, st.title)}</div>` : ''}
    <div class="theme-rest">
      ${wide ? figure(st.figure, st.title) : ''}
      ${papers(st.dois)}
      ${st.story ? coverage(st.story) : ''}
    </div>
  </div>
</div>`;
}

function themeBand(t) {
  return band({
    id: t.id,
    title: t.title,
    wide: true,
    body: html`<div class="theme${hasFig(t.figure) ? '' : ' theme-nofig'}">
    <div class="theme-top">
      ${t.place ? html`<p class="theme-place"><i class="place">${t.place}</i></p>` : ''}
      <p class="large">${t.summary}</p>
    </div>
    ${hasFig(t.figure) ? html`<div class="theme-fig">${figure(t.figure, t.title)}</div>` : ''}
    <div class="theme-rest">
      ${t.findings.length ? html`<h3>Key findings</h3><ul class="findings">${t.findings.map((f) => html`<li>${f}</li>`)}</ul>` : ''}
      ${papers(t.dois)}
    </div>
  </div>
  ${(t.studies || []).map(study)}`,
  });
}

export function body() {
  return html`
${pageHead({
  title: 'Research',
  lede: 'Most of my work is in the Permian Basin of West Texas and New Mexico, where I use satellite radar and geomechanical models to track how oil and gas production and wastewater injection move the ground, and what that means for faults, wells and infrastructure. I also study groundwater-driven subsidence in cities, mining and slope hazards, and methods for new radar missions.',
})}

${band({
  title: 'Approach',
  wide: true,
  body: html`<div class="theme theme-pair">
    <div class="theme-top">
      <p>A radar satellite images the same ground every week or two. If the surface has moved between two passes, the signal’s round trip changes by a fraction of a wavelength. Comparing the phase of the two images turns that fraction into a map of motion, called an interferogram. Stacking hundreds of them over years separates steady deformation from noise.</p>
      <p>To explain the motion I build poroelastic models, which link changes in fluid pressure underground to stress in the rock and to movement at the surface. When a model reproduces what the satellite saw, it constrains the pressures, hydraulic properties and faults that cannot be observed directly.</p>
    </div>
    <div class="theme-fig"><figure class="fig fig-schematic">${schematic}<figcaption>Schematic, not to scale.</figcaption></figure></div>
  </div>`,
})}

${band({
  title: 'Try it: drill a well',
  wide: true,
  body: html`<div class="wells">
    <div class="wells-text">
      <p>Pumping fluid out of the ground lowers the pressure in the rock and the surface sinks. Injecting fluid raises it and the surface rises. Click or tap the map to drill wells and watch the interferogram change.</p>
      <p>Choose whether each new well extracts or injects, and how deep it is. Deep sources spread their effect over a wider area with less motion; shallow ones make tight, intense bowls. Nearby wells add up, which is why real basins show such complex patterns.</p>
    </div>
    <figure class="fringe wells-fig" data-wells>
      <div class="wells-frame"><canvas width="900" height="600" aria-label="Simulated interferogram. Click to add a well." role="img"></canvas></div>
      <figcaption>
        <div class="wells-controls">
          <div class="band-switch" role="group" aria-label="Well type">
            <button type="button" class="chip" data-mode="extract" aria-pressed="true">Extract (ground sinks)</button>
            <button type="button" class="chip" data-mode="inject" aria-pressed="false">Inject (ground rises)</button>
          </div>
          <div class="fringe-control">
            <label for="wells-depth">Depth of the next well</label>
            <output for="wells-depth" data-depth-out>1.0 km</output>
            <input id="wells-depth" type="range" min="0.5" max="3" step="0.1" value="1" data-depth>
          </div>
          <p class="wells-status" data-readout aria-live="polite"></p>
          <p class="wells-buttons"><button type="button" class="btn btn-quiet" data-random>Add a well at random</button> <button type="button" class="btn btn-quiet" data-clear>Clear all wells</button></p>
        </div>
        <p>Simulation, not data: point pressure sources (the Mogi model) seen by a Sentinel-1-like C-band radar, where each colour cycle is 2.8 cm of motion toward or away from the satellite.</p>
      </figcaption>
    </figure>
  </div>`,
})}

${themeBand(themes[0])}

${band({
  title: 'Methods',
  wide: true,
  body: html`<dl class="deflist">
    ${methods.map((m) => html`<div><dt>${m.name}</dt><dd>${m.detail}</dd></div>`)}
  </dl>
  <h3>Software</h3>
  <dl class="deflist deflist-tight">
    ${software.map((s) => html`<div><dt>${s.group}</dt><dd>${s.items.join(', ')}</dd></div>`)}
  </dl>`,
})}

${themes.slice(1).map(themeBand)}

${band({
  title: 'Study areas',
  wide: true,
  body: siteMaps(),
})}
`;
}
