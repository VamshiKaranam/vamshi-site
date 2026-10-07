import { html, raw } from '../html.mjs';
import { band, pageHead } from '../layout.mjs';
import { figure, siteMaps, findPub, pubItem } from '../components.mjs';
import { themes, methods, software, collaborators } from '../../content/research.mjs';

export const route = '/research';
export const file = 'research.html';
export const title = 'Research';
export const description =
  'Research on land subsidence, fluid-driven deformation and geohazards using InSAR, GNSS and poroelastic modeling: the Permian Basin, Delhi, the Jharia Coalfields and beyond.';
export const scripts = ['/assets/js/maps.js'];

// How InSAR turns two radar passes into a measurement of ground motion.
const schematic = raw(`<svg class="schematic" viewBox="0 0 760 330" role="img" aria-labelledby="sch-t sch-d">
  <title id="sch-t">How radar interferometry measures ground motion</title>
  <desc id="sch-d">A satellite images the same ground on two passes. Where the ground has sunk between passes, the radar signal travels slightly farther. That extra distance shows up as a shift in the phase of the returning wave, which is mapped as coloured fringes.</desc>
  <defs>
    <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="sch-fill"/></marker>
  </defs>
  <!-- orbit and satellite -->
  <path d="M30,62 C120,30 220,30 330,58" class="sch-orbit"/>
  <g transform="translate(150,40) rotate(-8)">
    <rect x="-13" y="-8" width="26" height="16" rx="2" class="sch-sat"/>
    <rect x="-44" y="-5" width="27" height="10" class="sch-panel"/>
    <rect x="17" y="-5" width="27" height="10" class="sch-panel"/>
  </g>
  <text x="150" y="16" text-anchor="middle" class="sch-label">Same orbit, two passes</text>
  <!-- ground before and after -->
  <path d="M30,236 H300 C350,236 360,266 400,266 C440,266 450,236 500,236 H730 V312 H30 Z" class="sch-ground"/>
  <path d="M300,236 H500" class="sch-before"/>
  <path d="M30,236 H300 C350,236 360,266 400,266 C440,266 450,236 500,236 H730" class="sch-after"/>
  <!-- line of sight, pass 1 and pass 2 -->
  <line x1="156" y1="52" x2="393" y2="236" class="sch-ray sch-ray-1"/>
  <line x1="156" y1="52" x2="393" y2="265" class="sch-ray sch-ray-2"/>
  <text x="246" y="112" class="sch-note" transform="rotate(38 246 112)">radar line of sight</text>
  <!-- displacement -->
  <line x1="408" y1="241" x2="408" y2="261" class="sch-dim" marker-start="url(#arr)" marker-end="url(#arr)"/>
  <text x="400" y="292" text-anchor="middle" class="sch-label">the ground has sunk</text>
  <!-- legend -->
  <line x1="548" y1="270" x2="578" y2="270" class="sch-before"/>
  <text x="586" y="274" class="sch-note">surface at pass 1</text>
  <line x1="548" y1="292" x2="578" y2="292" class="sch-after"/>
  <text x="586" y="296" class="sch-note">surface at pass 2</text>
  <!-- phase panel -->
  <g transform="translate(520,36)">
    <text x="0" y="0" class="sch-label">The returning wave arrives shifted</text>
    <path d="M0,46 q10,-22 20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0" class="sch-wave sch-ray-1"/>
    <path d="M7,86 q10,-22 20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0 t20,0" class="sch-wave sch-ray-2"/>
    <text x="0" y="28" class="sch-note">pass 1</text>
    <text x="0" y="110" class="sch-note">pass 2</text>
    <line x1="20" y1="52" x2="20" y2="94" class="sch-tick"/>
    <line x1="27" y1="52" x2="27" y2="94" class="sch-tick"/>
    <text x="34" y="128" class="sch-note">phase shift = extra distance travelled</text>
  </g>
</svg>`);

export function body() {
  return html`
${pageHead({
  title: 'Research',
  lede: 'The ground moves when fluid is pumped out of it or pushed into it, when coal burns beneath it, and when rock and ice creep downslope. I measure that motion from space, down to millimetres per year, and model what is happening underneath to explain it.',
})}

${band({
  title: 'How it works',
  body: html`<p>A radar satellite images the same ground every week or two. If the surface has moved between two passes, the signal’s round trip changes by a fraction of a wavelength. Comparing the phase of the two images turns that fraction into a map of motion, called an interferogram. Stacking hundreds of them over years separates steady deformation from noise.</p>
  <figure class="fig fig-schematic">${schematic}<figcaption>Schematic, not to scale.</figcaption></figure>
  <p>Measuring is half the job. To explain the motion I build poroelastic models, which link changes in fluid pressure underground to stress in the rock and to movement at the surface. When a model reproduces what the satellite saw, it constrains the pressures, hydraulic properties and faults that cannot be observed directly.</p>`,
})}

${themes.map((t) => band({
  id: t.id,
  title: t.title,
  body: html`<div class="theme">
    ${t.place ? html`<p class="theme-place"><i class="place">${t.place}</i></p>` : ''}
    <p class="large">${t.summary}</p>
    ${figure(t.figure, t.title)}
    ${t.findings.length ? html`<h3>What we have found</h3><ul class="findings">${t.findings.map((f) => html`<li>${f}</li>`)}</ul>` : ''}
    ${t.dois.length ? html`<h3>Papers</h3><ul class="plain pub-list">${t.dois.map((d) => findPub(d)).filter(Boolean).map((p) => pubItem(p, { compact: true }))}</ul>` : ''}
  </div>`,
}))}

${band({
  title: 'Study areas',
  wide: true,
  body: siteMaps(),
})}

${band({
  title: 'Methods',
  body: html`<dl class="deflist">
    ${methods.map((m) => html`<div><dt>${m.name}</dt><dd>${m.detail}</dd></div>`)}
  </dl>
  <h3>Software</h3>
  <dl class="deflist deflist-tight">
    ${software.map((s) => html`<div><dt>${s.group}</dt><dd>${s.items.join(', ')}</dd></div>`)}
  </dl>`,
})}

${band({
  title: 'Collaborators',
  body: html`<p>This work is done with colleagues at ${collaborators.slice(0, -1).join(', ')} and ${collaborators[collaborators.length - 1]}.</p>`,
})}
`;
}
