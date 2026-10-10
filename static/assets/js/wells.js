// "Drill a well": an interactive simulation on the Research page.
// It opens in a pop-up from a card under Approach. Each well is a point
// pressure source (Mogi model) at the chosen depth, with peak vertical
// motion (1 - nu) dV / (pi d^2) for a volume change dV (nu = 0.25).
// Two views of the same ground motion: the wrapped interferogram a radar
// satellite would record, and the displacement map it is processed into.
// A simulation for illustration, not data.
(function () {
  var root = document.querySelector('[data-wells]');
  var openBtns = document.querySelectorAll('[data-wells-open]');
  var preview = document.querySelector('[data-wells-preview]');
  if (!root || !openBtns.length || typeof HTMLDialogElement === 'undefined') return;

  var canvas = root.querySelector('[data-map]');
  var mapCtx = canvas.getContext('2d');
  var viewButtons = root.querySelectorAll('[data-view-btn]');
  var tabs = root.querySelectorAll('[data-tab]');
  var legends = { ifg: root.querySelector('[data-legend="ifg"]'), disp: root.querySelector('[data-legend="disp"]') };
  var view = 'ifg';
  var modeButtons = root.querySelectorAll('[data-mode]');
  var bandButtons = root.querySelectorAll('[data-wband]');
  var depthInput = root.querySelector('[data-depth]');
  var depthOut = root.querySelector('[data-depth-out]');
  var volInput = root.querySelector('[data-volume]');
  var volOut = root.querySelector('[data-volume-out]');
  var readout = root.querySelector('[data-readout]');
  var ifgScale = root.querySelector('[data-ifg-scale]');
  var dispTicks = root.querySelectorAll('[data-disp-tick]');
  var ifgTicks = root.querySelectorAll('[data-ifg-tick]');

  // Model grid: 30 km x 20 km at 12 cells per km.
  var W = 360, H = 240, KM = 12;
  var NU = 0.25, BBL_PER_M3 = 6.2898;
  var BANDS = {
    X: { cm: 1.55, name: 'X-band (TerraSAR-X)' },
    C: { cm: 2.77, name: 'C-band (Sentinel-1)' },
    L: { cm: 11.9, name: 'L-band (NISAR)' }
  };
  var band = 'C';

  function makeLut(stops) {
    var lut = new Uint8Array(256 * 3);
    for (var i = 0; i < 256; i++) {
      var t = i / 255, k = 0;
      while (k < stops.length - 2 && t > stops[k + 1][0]) k++;
      var a = stops[k], b = stops[k + 1], f = (t - a[0]) / (b[0] - a[0]);
      lut[i * 3] = a[1] + (b[1] - a[1]) * f;
      lut[i * 3 + 1] = a[2] + (b[2] - a[2]) * f;
      lut[i * 3 + 2] = a[3] + (b[3] - a[3]) * f;
    }
    return lut;
  }
  // Interferogram: the same cyclic colours as the home page.
  var phaseLut = makeLut([
    [0.00, 122, 80, 184], [0.20, 61, 127, 196], [0.40, 55, 167, 160],
    [0.62, 216, 191, 71], [0.80, 224, 112, 63], [0.91, 207, 80, 144], [1.00, 122, 80, 184]
  ]);
  // Displacement: the Spectral scale used in the research figures,
  // dark red for sinking through pale yellow to purple-blue for rising.
  var divLut = makeLut([
    [0.0, 158, 1, 66], [0.1, 213, 62, 79], [0.2, 244, 109, 67], [0.3, 253, 174, 97], [0.4, 254, 230, 160],
    [0.5, 255, 255, 255], [0.6, 232, 245, 172], [0.7, 171, 221, 164], [0.8, 102, 194, 165], [0.9, 50, 136, 189], [1.0, 94, 79, 162]
  ]);

  // A little atmosphere and speckle so the interferogram looks real.
  var noise = new Float32Array(W * H);
  var seed = 11;
  function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  for (var y = 0; y < H; y++) {
    for (var x = 0; x < W; x++) {
      noise[y * W + x] = 0.08 * Math.sin(x / 57 + 0.4) * Math.cos(y / 43 + 1.1) +
        0.05 * Math.sin((x - y) / 71) + (rnd() - 0.5) * 0.08;
    }
  }

  // Line-of-sight displacement (cm) from all wells.
  var INC = 0.68, sinI = Math.sin(INC), cosI = Math.cos(INC);
  var los = new Float32Array(W * H);
  var wells = [];
  var mode = 'extract';
  var lo = 0, hi = 0;

  // Add one well's motion to the running total, so any number of wells stays fast.
  function addField(wl) {
    var d = wl.depth * KM, dm = wl.depth * 1000;
    var amp = wl.sign * 100 * (1 - NU) * wl.volume * 1e6 / (Math.PI * dm * dm);
    for (var y = 0; y < H; y++) {
      var dy = y - wl.y;
      for (var x = 0; x < W; x++) {
        var dx = x - wl.x, R2 = dx * dx + dy * dy + d * d;
        los[y * W + x] += amp * (d * d / (R2 * Math.sqrt(R2))) * (d * cosI + dx * sinI * 0.55);
      }
    }
  }
  function range() {
    lo = 0; hi = 0;
    for (var n = 0; n < los.length; n++) { if (los[n] < lo) lo = los[n]; if (los[n] > hi) hi = los[n]; }
  }
  function compute() {
    los.fill(0);
    for (var w = 0; w < wells.length; w++) addField(wells[w]);
    range();
  }

  // A round colour-bar limit: 1, 2, 5, 10, 20, 50 ... cm.
  function niceLimit(v) {
    if (v <= 1) return 1;
    var p = Math.pow(10, Math.floor(Math.log10(v))), m = v / p;
    return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p;
  }

  var buf = document.createElement('canvas');
  buf.width = W; buf.height = H;
  var bctx = buf.getContext('2d');
  var img = bctx.createImageData(W, H);

  function paint(ctx, canvas, kind, limit, u) {
    var dd = img.data, fringe = BANDS[band].cm;
    for (var n = 0; n < los.length; n++) {
      var c, o = n * 4, lut;
      if (kind === 'ifg') {
        var p = los[n] / fringe + noise[n] + 0.12;
        p -= Math.floor(p);
        c = (p * 255) | 0; lut = phaseLut;
      } else {
        var v = los[n] / limit;
        v = v < -1 ? -1 : v > 1 ? 1 : v;
        c = ((v + 1) * 127.5) | 0; lut = divLut;
      }
      dd[o] = lut[c * 3]; dd[o + 1] = lut[c * 3 + 1]; dd[o + 2] = lut[c * 3 + 2]; dd[o + 3] = 255;
    }
    bctx.putImageData(img, 0, 0);
    var cw = canvas.width, ch = canvas.height, sx = cw / W;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(buf, 0, 0, cw, ch);
    if (!u) return;

    // Wells are small open triangles, so the fringes show through them:
    // pointing down where fluid is extracted, up where it is injected.
    ctx.lineJoin = 'round';
    for (var w = 0; w < wells.length; w++) {
      var px = wells[w].x * sx, py = wells[w].y * sx;
      var s = (wells[w].sign < 0 ? 1 : -1) * u;
      ctx.beginPath();
      ctx.moveTo(px - 5 * u, py - 3 * s); ctx.lineTo(px + 5 * u, py - 3 * s); ctx.lineTo(px, py + 6 * s);
      ctx.closePath();
      ctx.lineWidth = 4 * u; ctx.strokeStyle = 'rgba(255,255,255,0.9)'; ctx.stroke();
      ctx.lineWidth = 1.75 * u; ctx.strokeStyle = '#1a1c20'; ctx.stroke();
    }
    var bar = 5 * KM * sx, bx = 10 * u, by = ch - 10 * u;
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillRect(bx - 5 * u, by - 18 * u, bar + 10 * u, 24 * u);
    ctx.fillStyle = '#1a1c20';
    ctx.fillRect(bx, by, bar, 3 * u);
    ctx.font = '600 ' + (11 * u) + 'px Archivo, system-ui, sans-serif';
    ctx.fillText('5 km', bx, by - 5 * u);
  }

  function fmt(n) { return n >= 10 ? Math.round(n) : (Math.round(n * 10) / 10); }

  function draw() {
    // Fixed colour scale, -10 to +10 cm; larger motion saturates.
    var limit = 10;
    paint(mapCtx, canvas, view, limit, dpr);
    var cyc = BANDS[band].cm;
    ifgScale.textContent = 'Phase in radians (cm in brackets); one colour cycle = ' + cyc + ' cm in ' + BANDS[band].name;
    var phases = ['−π', '−π/2', '0', 'π/2', 'π'];
    Array.prototype.forEach.call(ifgTicks, function (t, i) {
      var v = cyc * (i - 2) / 4;
      t.textContent = i === 2 ? '0' : phases[i] + ' (' + (v > 0 ? '+' : '−') + Math.abs(v).toFixed(1) + ')';
    });
    var ticks = [-limit, -limit / 2, 0, limit / 2, limit];
    Array.prototype.forEach.call(dispTicks, function (t, i) {
      var v = ticks[i];
      t.textContent = (v > 0 ? '+' : v < 0 ? '−' : '') + fmt(Math.abs(v));
    });
    if (!wells.length) {
      readout.textContent = 'Click or tap the map to drill a well.';
    } else {
      var peak = Math.abs(lo) > hi ? lo : hi;
      readout.textContent = wells.length + (wells.length === 1 ? ' well. ' : ' wells. ') +
        'Largest motion ' + (peak > 0 ? '+' : '−') + fmt(Math.abs(peak)) + ' cm (' +
        (peak > 0 ? 'rising' : 'sinking') + '), about ' + fmt(Math.abs(peak) / BANDS[band].cm) + ' fringes.';
    }
  }

  function update() { compute(); draw(); }

  var dpr = 1;
  function fit() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
    if (w && h && (w !== canvas.width || h !== canvas.height)) { canvas.width = w; canvas.height = h; }
  }

  function addWell(x, y) {
    var wl = { x: x, y: y, depth: parseFloat(depthInput.value), volume: parseFloat(volInput.value), sign: mode === 'extract' ? -1 : 1 };
    wells.push(wl);
    addField(wl); range(); draw();
  }
  canvas.addEventListener('click', function (e) {
    var r = canvas.getBoundingClientRect();
    addWell((e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H);
  });
  function group(buttons, attr, set) {
    Array.prototype.forEach.call(buttons, function (b) {
      b.addEventListener('click', function () {
        set(b.getAttribute(attr));
        Array.prototype.forEach.call(buttons, function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
      });
    });
  }
  group(modeButtons, 'data-mode', function (v) { mode = v; });
  function setView(v) {
    view = v;
    legends.ifg.hidden = v !== 'ifg';
    legends.disp.hidden = v !== 'disp';
    Array.prototype.forEach.call(tabs, function (t) { t.classList.toggle('is-active', t.getAttribute('data-tab') === v); });
    Array.prototype.forEach.call(viewButtons, function (o) { o.setAttribute('aria-pressed', o.getAttribute('data-view-btn') === v ? 'true' : 'false'); });
    draw();
  }
  Array.prototype.forEach.call(viewButtons, function (b) {
    b.addEventListener('click', function () { setView(b.getAttribute('data-view-btn')); });
  });
  // Choosing a band also switches to the interferogram, where bands matter.
  group(bandButtons, 'data-wband', function (v) { band = v; setView('ifg'); });
  function depthLabel() { depthOut.textContent = parseFloat(depthInput.value).toFixed(1) + ' km'; }
  function volLabel() {
    var v = parseFloat(volInput.value);
    volOut.textContent = fmt(v) + ' million m³ (' + fmt(v * BBL_PER_M3) + ' million bbl)';
  }
  depthInput.addEventListener('input', depthLabel);
  volInput.addEventListener('input', volLabel);
  root.querySelector('[data-clear]').addEventListener('click', function () { wells = []; update(); });
  root.querySelector('[data-random]').addEventListener('click', function () {
    addWell(25 + Math.random() * (W - 50), 25 + Math.random() * (H - 50));
  });

  var startWells = [
    { x: W * 0.36, y: H * 0.58, depth: 1.2, volume: 0.4, sign: -1 },
    { x: W * 0.70, y: H * 0.36, depth: 0.8, volume: 0.2, sign: 1 }
  ];
  function reset() { wells = startWells.map(function (w) { return Object.assign({}, w); }); }

  // Static preview on the card: the starting wells as an interferogram.
  reset(); compute();
  if (preview && preview.getContext) paint(preview.getContext('2d'), preview, 'ifg', 1, 0);

  // The pop-up.
  var dialog = root.closest('dialog');
  function openSim() {
    depthLabel(); volLabel();
    dialog.showModal();
    document.documentElement.classList.add('lightbox-open');
    fit(); update();
  }
  Array.prototype.forEach.call(openBtns, function (b) { b.addEventListener('click', openSim); });
  // A link to /research#drill (from the home page) opens the simulation directly.
  if (location.hash === '#drill') {
    var card = document.getElementById('try-it');
    if (card) card.scrollIntoView();
    openSim();
  }
  dialog.querySelector('[data-wells-close]').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('close', function () { document.documentElement.classList.remove('lightbox-open'); });
  dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  window.addEventListener('resize', function () { if (dialog.open) { fit(); draw(); } });
})();
