// The home-page interferogram.
// Draws a simulated wrapped-phase image for two buried sources: one causing
// subsidence (fluid taken out) and a smaller one causing uplift (fluid put in).
// It is an illustration of the method, not data.
(function () {
  var fig = document.querySelector('[data-fringe]');
  if (!fig) return;
  var canvas = fig.querySelector('canvas');
  var range = fig.querySelector('input[type="range"]');
  var out = fig.querySelector('[data-fringe-out]');
  var ctx = canvas.getContext && canvas.getContext('2d');
  if (!ctx) return;

  var W = 360, H = 270;                 // model grid; scaled up smoothly to the canvas
  // One fringe is half the radar wavelength.
  var BANDS = {
    X: { cm: 1.55, name: 'X-band (TerraSAR-X)' },    // 3.1 cm
    C: { cm: 2.77, name: 'C-band (Sentinel-1)' },    // 5.55 cm
    L: { cm: 11.9, name: 'L-band (NISAR)' }          // 23.8 cm
  };
  var band = 'C';
  var FRINGE_CM = BANDS[band].cm;
  var bandButtons = fig.querySelectorAll('[data-band]');
  var buf = document.createElement('canvas');
  buf.width = W; buf.height = H;
  var bctx = buf.getContext('2d');
  var img = bctx.createImageData(W, H);

  // One colour cycle, taken from the fringes in the site logo.
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

  // Line-of-sight response of a point source at depth d (Mogi model), unit peak.
  // The east-looking geometry is what makes real fringes slightly lopsided.
  var INC = 0.68, sinI = Math.sin(INC), cosI = Math.cos(INC);
  function source(x, y, cx, cy, d) {
    var dx = x - cx, dy = y - cy, r2 = dx * dx + dy * dy;
    var q = Math.pow(d * d / (d * d + r2), 1.5);
    return q * (cosI + (dx / d) * sinI * 0.55);
  }

  // Unit displacement field and a smooth "atmosphere", computed once.
  var unit = new Float32Array(W * H), atmo = new Float32Array(W * H), speckle = new Float32Array(W * H);
  var seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  var peak = 0;
  for (var y = 0; y < H; y++) {
    for (var x = 0; x < W; x++) {
      var n = y * W + x;
      var u = source(x, y, W * 0.44, H * 0.52, 46) - 0.42 * source(x, y, W * 0.80, H * 0.27, 26);
      unit[n] = u;
      if (u > peak) peak = u;
      atmo[n] = 0.10 * Math.sin(x / 61 + 1.3) * Math.cos(y / 47) + 0.07 * Math.sin((x + y) / 83);
      speckle[n] = (rnd() - 0.5) * 0.085;
    }
  }
  for (var m = 0; m < unit.length; m++) unit[m] /= peak;

  function draw(cm) {
    var cycles = cm / FRINGE_CM, d = img.data;
    for (var n = 0; n < unit.length; n++) {
      var p = unit[n] * cycles + atmo[n] + speckle[n] + 0.12;
      p -= Math.floor(p);
      var c = (p * 255) | 0, o = n * 4;
      d[o] = lut[c * 3]; d[o + 1] = lut[c * 3 + 1]; d[o + 2] = lut[c * 3 + 2]; d[o + 3] = 255;
    }
    bctx.putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(buf, 0, 0, canvas.width, canvas.height);
  }

  function label(cm) {
    var fr = cm / FRINGE_CM;
    var frText = fr < 0.05 ? 'no fringes' : (Math.round(fr * 10) / 10) + (Math.abs(fr - 1) < 0.05 ? ' fringe' : ' fringes');
    out.textContent = (Math.round(cm * 10) / 10) + ' cm is ' + frText + ' in ' + BANDS[band].name;
  }

  function set(cm) { draw(cm); label(cm); }

  var target = parseFloat(range.value);
  Array.prototype.forEach.call(bandButtons, function (b) {
    b.addEventListener('click', function () {
      band = b.getAttribute('data-band');
      FRINGE_CM = BANDS[band].cm;
      Array.prototype.forEach.call(bandButtons, function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
      cancelAnimationFrame(raf);
      started = true;
      set(parseFloat(range.value));
    });
  });
  range.addEventListener('input', function () {
    cancelAnimationFrame(raf);
    set(parseFloat(range.value));
  });

  // One entrance: the bowl deepens from flat ground to its starting value.
  // It waits until the figure is on screen, so visitors actually see it.
  var raf = 0, started = false;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function play() {
    if (started) return;
    started = true;
    var start = null, DURATION = 6000;
    var step = function (ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / DURATION);
      var cm = target * (1 - Math.pow(1 - t, 3));
      range.value = cm;
      set(cm);
      if (t < 1) raf = requestAnimationFrame(step);
      else { range.value = target; set(target); }
    };
    raf = requestAnimationFrame(step);
  }
  range.addEventListener('input', function () { started = true; });

  if (reduce || !('IntersectionObserver' in window)) {
    set(target);
  } else {
    range.value = 0;
    set(0);
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) { io.disconnect(); play(); }
    }, { threshold: 0.6 });
    io.observe(canvas);
  }
})();
