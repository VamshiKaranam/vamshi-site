// "Drill a well": an interactive interferogram on the Research page.
// Each well is a point pressure source (Mogi model) at the chosen depth.
// Extraction lowers pressure and the ground sinks; injection raises it and
// the ground rises. The field is shown as wrapped Sentinel-1 C-band phase.
// A simulation for illustration, not data.
(function () {
  var fig = document.querySelector('[data-wells]');
  if (!fig) return;
  var canvas = fig.querySelector('canvas');
  var ctx = canvas.getContext && canvas.getContext('2d');
  if (!ctx) return;
  var modeButtons = fig.querySelectorAll('[data-mode]');
  var depthInput = fig.querySelector('[data-depth]');
  var depthOut = fig.querySelector('[data-depth-out]');
  var readout = fig.querySelector('[data-readout]');
  var clearBtn = fig.querySelector('[data-clear]');
  var randomBtn = fig.querySelector('[data-random]');

  // Model grid: 12 km x 8 km at 1/30 km per cell, drawn smoothly onto the canvas.
  var W = 360, H = 240, KM = 30;               // cells per km
  var FRINGE_CM = 2.77;                         // half the C-band wavelength
  var PEAK_CM_AT_1KM = 10;                      // peak motion of one well at 1 km depth
  var MAX_WELLS = 12;
  var buf = document.createElement('canvas');
  buf.width = W; buf.height = H;
  var bctx = buf.getContext('2d');
  var img = bctx.createImageData(W, H);

  // Same colour cycle as the home-page interferogram.
  var stops = [
    [0.00, 122, 80, 184], [0.20, 61, 127, 196], [0.40, 55, 167, 160],
    [0.62, 216, 191, 71], [0.80, 224, 112, 63], [0.91, 207, 80, 144], [1.00, 122, 80, 184]
  ];
  var lut = new Uint8Array(256 * 3);
  for (var i = 0; i < 256; i++) {
    var t = i / 255, k = 0;
    while (k < stops.length - 2 && t > stops[k + 1][0]) k++;
    var a = stops[k], b = stops[k + 1], f = (t - a[0]) / (b[0] - a[0]);
    lut[i * 3] = a[1] + (b[1] - a[1]) * f;
    lut[i * 3 + 1] = a[2] + (b[2] - a[2]) * f;
    lut[i * 3 + 2] = a[3] + (b[3] - a[3]) * f;
  }

  // A little atmosphere and speckle so it looks like a real interferogram.
  var noise = new Float32Array(W * H);
  var seed = 11;
  function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  for (var y = 0; y < H; y++) {
    for (var x = 0; x < W; x++) {
      noise[y * W + x] = 0.08 * Math.sin(x / 57 + 0.4) * Math.cos(y / 43 + 1.1) +
        0.05 * Math.sin((x - y) / 71) + (rnd() - 0.5) * 0.08;
    }
  }

  // Line-of-sight displacement (cm) of one Mogi source. Peak vertical motion
  // falls off with depth squared for a fixed volume change.
  var INC = 0.68, sinI = Math.sin(INC), cosI = Math.cos(INC);
  var los = new Float32Array(W * H);
  var wells = [];
  var mode = 'extract';

  function compute() {
    los.fill(0);
    for (var w = 0; w < wells.length; w++) {
      var wl = wells[w], d = wl.depth * KM;
      var amp = wl.sign * PEAK_CM_AT_1KM / (wl.depth * wl.depth);
      for (var y = 0; y < H; y++) {
        var dy = y - wl.y;
        for (var x = 0; x < W; x++) {
          var dx = x - wl.x, R2 = dx * dx + dy * dy + d * d;
          var q = d * d / (R2 * Math.sqrt(R2));   // d^2 / R^3
          los[y * W + x] += amp * q * (d * cosI + dx * sinI * 0.55);
        }
      }
    }
  }

  function draw() {
    var dd = img.data, lo = 0, hi = 0;
    for (var n = 0; n < los.length; n++) {
      var v = los[n];
      if (v < lo) lo = v;
      if (v > hi) hi = v;
      var p = v / FRINGE_CM + noise[n] + 0.12;
      p -= Math.floor(p);
      var c = (p * 255) | 0, o = n * 4;
      dd[o] = lut[c * 3]; dd[o + 1] = lut[c * 3 + 1]; dd[o + 2] = lut[c * 3 + 2]; dd[o + 3] = 255;
    }
    bctx.putImageData(img, 0, 0);
    var cw = canvas.width, ch = canvas.height, sx = cw / W, u = dpr;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(buf, 0, 0, cw, ch);

    // Well markers: a dark ring with a down (extract) or up (inject) arrow.
    for (var w = 0; w < wells.length; w++) {
      var px = wells[w].x * sx, py = wells[w].y * sx, r = 11 * u;
      ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.fill();
      ctx.lineWidth = 2 * u; ctx.strokeStyle = '#1a1c20'; ctx.stroke();
      ctx.beginPath();
      var s = (wells[w].sign < 0 ? 1 : -1) * u;   // arrow points down for extraction
      ctx.moveTo(px, py - 6 * s); ctx.lineTo(px, py + 5 * s);
      ctx.moveTo(px - 4.5 * u, py + 1 * s); ctx.lineTo(px, py + 6 * s); ctx.lineTo(px + 4.5 * u, py + 1 * s);
      ctx.stroke();
    }

    // Scale bar: 2 km.
    var bar = 2 * KM * sx, bx = 12 * u, by = ch - 12 * u;
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillRect(bx - 6 * u, by - 20 * u, bar + 12 * u, 27 * u);
    ctx.fillStyle = '#1a1c20';
    ctx.fillRect(bx, by, bar, 3 * u);
    ctx.font = '600 ' + (12 * u) + 'px Archivo, system-ui, sans-serif';
    ctx.fillText('2 km', bx, by - 5 * u);

    if (!wells.length) {
      readout.textContent = 'Click or tap the map to drill a well.';
    } else {
      var peak = Math.abs(lo) > hi ? lo : hi;
      var fr = Math.abs(peak) / FRINGE_CM;
      readout.textContent = wells.length + (wells.length === 1 ? ' well' : ' wells') +
        '. Largest motion ' + (peak > 0 ? '+' : '−') + (Math.round(Math.abs(peak) * 10) / 10) + ' cm (' +
        (peak > 0 ? 'rising' : 'sinking') + '), about ' + (Math.round(fr * 10) / 10) + ' fringes.';
    }
  }

  function update() { compute(); draw(); }

  // Match the canvas to its displayed size so markers and text stay crisp.
  var dpr = 1;
  function fit() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
    if (w && h && (w !== canvas.width || h !== canvas.height)) { canvas.width = w; canvas.height = h; }
  }
  window.addEventListener('resize', function () { fit(); draw(); });

  function addWell(x, y) {
    wells.push({ x: x, y: y, depth: parseFloat(depthInput.value), sign: mode === 'extract' ? -1 : 1 });
    if (wells.length > MAX_WELLS) wells.shift();
    update();
  }

  canvas.addEventListener('click', function (e) {
    var r = canvas.getBoundingClientRect();
    addWell((e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H);
  });
  Array.prototype.forEach.call(modeButtons, function (b) {
    b.addEventListener('click', function () {
      mode = b.getAttribute('data-mode');
      Array.prototype.forEach.call(modeButtons, function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
    });
  });
  function depthLabel() { depthOut.textContent = parseFloat(depthInput.value).toFixed(1) + ' km'; }
  depthInput.addEventListener('input', depthLabel);
  clearBtn.addEventListener('click', function () { wells = []; update(); });
  randomBtn.addEventListener('click', function () { addWell(30 + Math.random() * (W - 60), 30 + Math.random() * (H - 60)); });

  // Start with one production well and one injection well so the idea is clear.
  depthLabel();
  fit();
  wells = [
    { x: W * 0.40, y: H * 0.55, depth: 1.2, sign: -1 },
    { x: W * 0.72, y: H * 0.38, depth: 0.9, sign: 1 }
  ];
  update();
})();
