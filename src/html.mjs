// Tiny HTML templating helpers. Values interpolated into html`…` are escaped
// automatically; wrap a string in raw() only when it is already safe HTML.

class Raw {
  constructor(s) { this.s = s; }
  toString() { return this.s; }
}

export const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const raw = (s) => new Raw(String(s ?? ''));

function render(v) {
  if (v == null || v === false || v === true) return '';
  if (v instanceof Raw) return v.s;
  if (Array.isArray(v)) return v.map(render).join('');
  return esc(v);
}

export function html(strings, ...vals) {
  let out = '';
  strings.forEach((str, i) => {
    out += str;
    if (i < vals.length) out += render(vals[i]);
  });
  return new Raw(out);
}

export const doiUrl = (doi) => `https://doi.org/${doi}`;

// "2024-08-07" → "7 August 2024"; "2025" stays "2025".
export function formatDate(d) {
  if (!d) return '';
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d);
  if (!m) return d;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${Number(m[3])} ${months[Number(m[2]) - 1]} ${m[1]}`;
}

// External links open in a new tab; internal ones don't.
export function link(href, label, cls = '') {
  const ext = /^https?:\/\//.test(href);
  return html`<a href="${href}"${cls ? raw(` class="${esc(cls)}"`) : ''}${ext ? raw(' target="_blank" rel="noopener"') : ''}>${label}</a>`;
}
