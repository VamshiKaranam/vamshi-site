// One-off helper: turns Natural Earth GeoJSON (public domain, naturalearthdata.com)
// into the small coastline files in src/geo/. You only need to run this if you
// want to change the map extents. Usage:
//   node scripts/prepare-geo.mjs /path/to/natural-earth-vector/geojson
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const src = process.argv[2];
if (!src) { console.error('Pass the folder that holds the Natural Earth geojson files.'); process.exit(1); }
const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'geo');
const load = (f) => JSON.parse(readFileSync(join(src, f), 'utf8'));

// Sutherland–Hodgman clip of one ring against a lon/lat box.
function clipRing(ring, [w, s, e, n]) {
  const edges = [
    [(p) => p[0] >= w, (a, b) => [w, a[1] + ((b[1] - a[1]) * (w - a[0])) / (b[0] - a[0])]],
    [(p) => p[0] <= e, (a, b) => [e, a[1] + ((b[1] - a[1]) * (e - a[0])) / (b[0] - a[0])]],
    [(p) => p[1] >= s, (a, b) => [a[0] + ((b[0] - a[0]) * (s - a[1])) / (b[1] - a[1]), s]],
    [(p) => p[1] <= n, (a, b) => [a[0] + ((b[0] - a[0]) * (n - a[1])) / (b[1] - a[1]), n]],
  ];
  let pts = ring;
  for (const [inside, cut] of edges) {
    const next = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length];
      const ia = inside(a), ib = inside(b);
      if (ia && ib) next.push(b);
      else if (ia && !ib) next.push(cut(a, b));
      else if (!ia && ib) { next.push(cut(a, b)); next.push(b); }
    }
    pts = next;
    if (!pts.length) break;
  }
  return pts;
}

// Clip an open line: keep the runs of points that fall inside the box.
function clipLine(line, [w, s, e, n]) {
  const runs = []; let run = [];
  for (const p of line) {
    if (p[0] >= w && p[0] <= e && p[1] >= s && p[1] <= n) run.push(p);
    else { if (run.length > 1) runs.push(run); run = []; }
  }
  if (run.length > 1) runs.push(run);
  return runs;
}

const round = (pts, d) => {
  const f = 10 ** d, outPts = [];
  for (const [x, y] of pts) {
    const p = [Math.round(x * f) / f, Math.round(y * f) / f];
    const q = outPts[outPts.length - 1];
    if (!q || q[0] !== p[0] || q[1] !== p[1]) outPts.push(p);
  }
  return outPts;
};

function polygons(fc, box, digits, filter = () => true) {
  const rings = [];
  for (const f of fc.features) {
    if (!filter(f)) continue;
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const poly of polys) {
      const r = round(clipRing(poly[0], box), digits); // outer ring only
      if (r.length >= 4) rings.push(r);
    }
  }
  return rings;
}

function lines(fc, box, digits, filter = () => true) {
  const res = [];
  for (const f of fc.features) {
    if (!filter(f)) continue;
    const ls = f.geometry.type === 'LineString' ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const l of ls) for (const run of clipLine(l, box)) res.push(round(run, digits));
  }
  return res;
}

const land110 = load('ne_110m_land.geojson');
const land50 = load('ne_50m_land.geojson');
const lakes50 = load('ne_50m_lakes.geojson');
const states110 = load('ne_110m_admin_1_states_provinces_lines.geojson');

const maps = {
  // World strip used for the career map on the About page.
  world: { box: [-180, -60, 180, 84], land: polygons(land110, [-180, -60, 180, 84], 1) },
  // North America panel: coastline, the largest lakes, and US state lines.
  northAmerica: {
    box: [-180, 5, -40, 80],
    land: polygons(land110, [-180, 5, -40, 80], 1),
    lakes: polygons(lakes50, [-180, 5, -40, 80], 1, (f) => f.properties.scalerank === 0),
    lines: lines(states110, [-180, 5, -40, 80], 1),
  },
  // South Asia panel: coastline only, no political boundaries.
  southAsia: { box: [50, -5, 110, 46], land: polygons(land50, [50, -5, 110, 46], 2) },
};

for (const [name, data] of Object.entries(maps)) {
  const file = join(out, `${name}.json`);
  writeFileSync(file, JSON.stringify(data));
  const n = (data.land || []).reduce((a, r) => a + r.length, 0);
  console.log(name, `${n} coastline points`, `${Math.round(JSON.stringify(data).length / 1024)} KB`);
}
