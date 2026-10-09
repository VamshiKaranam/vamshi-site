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
  var viewHint = root.querySelector('[data-view-hint]');
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

  // Model grid: 30 km x 20 km at 12 cells per km.
  var W = 360, H = 240, KM = 12;
  var NU = 0.25, BBL_PER_M3 = 6.2898;
  var BANDS = {
    X: { cm: 1.55, name: 'X-band (TerraSAR-X)' },
    C: { cm: 2.77, name: 'C-band (Sentinel-1)' },
    L: { cm: 11.9, name: 'L-band (NISAR)' }
  };
  var band = 'C';
  var MAX_WELLS = 12;

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
  // Displacement: red for sinking, blue for rising, pale at zero.
  var divLut = makeLut([
    [0.00, 158, 1, 66], [0.17, 230, 86, 60], [0.34, 251, 172, 98], [0.50, 248, 246, 238],
    [0.66, 164, 214, 152], [0.83, 61, 148, 189], [1.00, 84, 64, 160]
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

  function compute() {
    los.fill(0);
    for (var w = 0; w < wells.length; w++) {
      var wl = wells[w], d = wl.depth * KM, dm = wl.depth * 1000;
      var amp = wl.sign * 100 * (1 - NU) * wl.volume * 1e6 / (Math.PI * dm * dm);
      for (var y = 0; y < H; y++) {
        var dy = y - wl.y;
        for (var x = 0; x < W; x++) {
          var dx = x - wl.x, R2 = dx * dx + dy * dy + d * d;
          los[y * W + x] += amp * (d * d / (R2 * Math.sqrt(R2))) * (d * cosI + dx * sinI * 0.55);
        }
      }
    }
    lo = 0; hi = 0;
    for (var n = 0; n < los.length; n++) { if (los[n] < lo) lo = los[n]; if (los[n] > hi) hi = los[n]; }
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

    for (var w = 0; w < wells.length; w++) {
      var px = wells[w].x * sx, py = wells[w].y * sx, r = 10 * u;
      ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.fill();
      ctx.lineWidth = 2 * u; ctx.strokeStyle = '#1a1c20'; ctx.stroke();
      ctx.beginPath();
      var s = (wells[w].sign < 0 ? 1 : -1) * u;
      ctx.moveTo(px, py - 5.5 * s); ctx.lineTo(px, py + 4.5 * s);
      ctx.moveTo(px - 4 * u, py + 1 * s); ctx.lineTo(px, py + 5.5 * s); ctx.lineTo(px + 4 * u, py + 1 * s);
      ctx.stroke();
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
    // Saturate at about half the peak, as published maps do, so bowls read clearly.
    var limit = niceLimit(0.5 * Math.max(Math.abs(lo), Math.abs(hi)));
    paint(mapCtx, canvas, view, limit, dpr);
    ifgScale.textContent = 'One colour cycle = ' + BANDS[band].cm + ' cm, ' + BANDS[band].name;
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
    wells.push({ x: x, y: y, depth: parseFloat(depthInput.value), volume: parseFloat(volInput.value), sign: mode === 'extract' ? -1 : 1 });
    if (wells.length > MAX_WELLS) wells.shift();
    update();
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
  group(bandButtons, 'data-wband', function (v) { band = v; draw(); });
  group(viewButtons, 'data-view-btn', function (v) {
    view = v;
    legends.ifg.hidden = v !== 'ifg';
    legends.disp.hidden = v !== 'disp';
    viewHint.textContent = v === 'ifg' ? 'what the satellite records' : 'what it is processed into';
    draw();
  });
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
    { x: W * 0.38, y: H * 0.56, depth: 1.5, volume: 2, sign: -1 },
    { x: W * 0.70, y: H * 0.38, depth: 1, volume: 0.5, sign: 1 }
  ];
  function reset() { wells = startWells.map(function (w) { return Object.assign({}, w); }); }

  // Static preview on the card: the starting wells as an interferogram.
  reset(); compute();
  if (preview && preview.getContext) paint(preview.getContext('2d'), preview, 'ifg', 1, 0);

  // The pop-up.
  var dialog = root.closest('dialog');
  Array.prototype.forEach.call(openBtns, function (b) {
    b.addEventListener('click', function () {
      depthLabel(); volLabel();
      dialog.showModal();
      document.documentElement.classList.add('lightbox-open');
      fit(); update();
    });
  });
  dialog.querySelector('[data-wells-close]').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('close', function () { document.documentElement.classList.remove('lightbox-open'); });
  dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  window.addEventListener('resize', function () { if (dialog.open) { fit(); draw(); } });
})();
