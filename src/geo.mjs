// Map drawing without any libraries: two projections, a fitter, and SVG path
// builders. Coastlines come from src/geo/*.json (Natural Earth, public domain).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
export const loadGeo = (name) => JSON.parse(readFileSync(join(here, 'geo', `${name}.json`), 'utf8'));

const D = Math.PI / 180;

// Lambert azimuthal equal-area, centred on (lat0, lon0). Good for one region.
export function laea(lat0, lon0) {
  const p0 = lat0 * D, s0 = Math.sin(p0), c0 = Math.cos(p0);
  return ([lon, lat]) => {
    const p = lat * D, l = (lon - lon0) * D;
    const k = Math.sqrt(2 / (1 + s0 * Math.sin(p) + c0 * Math.cos(p) * Math.cos(l)));
    return [k * Math.cos(p) * Math.sin(l), -k * (c0 * Math.sin(p) - s0 * Math.cos(p) * Math.cos(l))];
  };
}

// Equal Earth, for the world strip.
export function equalEarth(lon0 = 0) {
  const A1 = 1.340264, A2 = -0.081106, A3 = 0.000893, A4 = 0.003796, M = Math.sqrt(3) / 2;
  return ([lon, lat]) => {
    const t = Math.asin(M * Math.sin(lat * D)), t2 = t * t, t6 = t2 * t2 * t2;
    const x = ((lon - lon0) * D * Math.cos(t)) / (M * (A1 + 3 * A2 * t2 + t6 * (7 * A3 + 9 * A4 * t2)));
    const y = t * (A1 + A2 * t2 + t6 * (A3 + A4 * t2));
    return [x, -y];
  };
}

// Scale a projection so the lon/lat box [w, s, e, n] fills `width` pixels.
// Pass `height` to get a frame of exactly that size with the box centred in it.
// Returns { project, width, height }.
export function fit(proj, [w, s, e, n], width, height = null) {
  const pts = [];
  for (let i = 0; i <= 24; i++) {
    const f = i / 24;
    pts.push(proj([w + (e - w) * f, s]), proj([w + (e - w) * f, n]), proj([w, s + (n - s) * f]), proj([e, s + (n - s) * f]));
  }
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const k = height ? Math.min(width / (x1 - x0), height / (y1 - y0)) : width / (x1 - x0);
  const h = height || Math.round((y1 - y0) * k);
  const ox = (width - (x1 - x0) * k) / 2, oy = (h - (y1 - y0) * k) / 2;
  return {
    width,
    height: h,
    project: (ll) => { const [x, y] = proj(ll); return [(x - x0) * k + ox, (y - y0) * k + oy]; },
  };
}

const n1 = (v) => (Math.round(v * 10) / 10).toString();

export function pathFrom(lines, project, closed) {
  let d = '';
  for (const line of lines) {
    let prev = '';
    line.forEach((ll, i) => {
      const [x, y] = project(ll);
      const s = `${n1(x)},${n1(y)}`;
      if (s === prev) return;
      d += (i === 0 ? 'M' : 'L') + s;
      prev = s;
    });
    if (closed) d += 'Z';
  }
  return d;
}

// Lines of latitude and longitude every `step` degrees inside the box.
export function graticule([w, s, e, n], step) {
  const lines = [];
  for (let lon = Math.ceil(w / step) * step; lon <= e; lon += step) {
    const l = []; for (let lat = s; lat <= n; lat += 1) l.push([lon, lat]); lines.push(l);
  }
  for (let lat = Math.ceil(s / step) * step; lat <= n; lat += step) {
    const l = []; for (let lon = w; lon <= e; lon += 1) l.push([lon, lat]); lines.push(l);
  }
  return lines;
}

// Points along the great circle from a to b ([lon, lat] pairs).
export function greatCircle(a, b, steps = 48) {
  const toV = ([lon, lat]) => [Math.cos(lat * D) * Math.cos(lon * D), Math.cos(lat * D) * Math.sin(lon * D), Math.sin(lat * D)];
  const va = toV(a), vb = toV(b);
  const dot = Math.min(1, Math.max(-1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]));
  const om = Math.acos(dot);
  if (om < 1e-9) return [a, b];
  const out = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps, ka = Math.sin((1 - t) * om) / Math.sin(om), kb = Math.sin(t * om) / Math.sin(om);
    const v = [ka * va[0] + kb * vb[0], ka * va[1] + kb * vb[1], ka * va[2] + kb * vb[2]];
    out.push([Math.atan2(v[1], v[0]) / D, Math.atan2(v[2], Math.hypot(v[0], v[1])) / D]);
  }
  return out;
}

export function formatLatLon(lat, lon) {
  const f = (v, pos, neg) => `${Math.abs(v).toFixed(1)}°${v >= 0 ? pos : neg}`;
  return `${f(lat, 'N', 'S')}, ${f(lon, 'E', 'W')}`;
}
