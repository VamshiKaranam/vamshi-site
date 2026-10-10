// Noise for the simulated interferograms (home page and "Drill a well").
// Three things make a real interferogram imperfect, and each is modelled
// in a simple, physically motivated way:
//   1. Atmosphere: turbulent water vapour delays the signal by up to a
//      fraction of a centimetre, in smooth patches at every scale (a power-law
//      field), plus a gentle ramp like an orbit error. It is a delay in
//      centimetres, so it costs more fringes at short wavelengths.
//   2. Decorrelation: where the surface changes between passes (fields,
//      vegetation) the phase turns to noise. Coherence falls off as
//      gamma^((wavelength_C / wavelength)^2), so X-band loses these patches
//      entirely while L-band barely notices them.
//   3. Phase noise: for coherence gamma and L looks the phase scatter is
//      about sqrt((1 - gamma^2) / (2 L gamma^2)) radians.
// Steep fringes also decorrelate; the callers handle that with the local
// phase gradient. All of it is an illustration, not data.
(function () {
  var LOOKS = 4, C_CM = 2.77;

  function fbm(W, H, rnd, base, hurst) {
    var out = new Float32Array(W * H);
    for (var o = 0; base / Math.pow(2, o) >= 2; o++) {
      var cell = base / Math.pow(2, o), amp = Math.pow(2, -hurst * o);
      var gw = Math.ceil(W / cell) + 3, gh = Math.ceil(H / cell) + 3;
      var g = new Float32Array(gw * gh);
      for (var i = 0; i < g.length; i++) g[i] = rnd() * 2 - 1;
      var ox = rnd(), oy = rnd();
      for (var y = 0; y < H; y++) {
        var fy = y / cell + oy, iy = Math.floor(fy), ty = fy - iy;
        ty = ty * ty * (3 - 2 * ty);
        for (var x = 0; x < W; x++) {
          var fx = x / cell + ox, ix = Math.floor(fx), tx = fx - ix;
          tx = tx * tx * (3 - 2 * tx);
          var k = iy * gw + ix;
          var top = g[k] + (g[k + 1] - g[k]) * tx, bot = g[k + gw] + (g[k + gw + 1] - g[k + gw]) * tx;
          out[y * W + x] += amp * (top + (bot - top) * ty);
        }
      }
    }
    var mean = 0, sd = 0, n;
    for (n = 0; n < out.length; n++) mean += out[n];
    mean /= out.length;
    for (n = 0; n < out.length; n++) { out[n] -= mean; sd += out[n] * out[n]; }
    sd = Math.sqrt(sd / out.length) || 1;
    for (n = 0; n < out.length; n++) out[n] /= sd;
    return out;
  }

  window.ifgNoise = function (W, H, seed) {
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    var N = W * H, n, x, y;

    // Atmosphere and ramp, in centimetres of line-of-sight delay.
    var atm = fbm(W, H, rnd, W * 0.9, 5 / 6);
    var rx = (rnd() - 0.5) * 0.6, ry = (rnd() - 0.5) * 0.6;
    for (y = 0; y < H; y++) for (x = 0; x < W; x++) {
      n = y * W + x;
      atm[n] = 0.3 * atm[n] + rx * (x / W - 0.5) + ry * (y / H - 0.5);
    }

    // Coherence at C-band: dry open ground near 0.9, with patches of
    // fields and vegetation where it drops to about 0.3.
    var land = fbm(W, H, rnd, W * 0.28, 0.55), coh = new Float32Array(N);
    for (n = 0; n < N; n++) {
      var t = (land[n] - 1.05) / 0.35;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      coh[n] = 0.9 - 0.6 * t * t * (3 - 2 * t) - 0.06 * rnd();
    }

    // Unit Gaussian noise, one draw per pixel, so the picture never flickers.
    var gauss = new Float32Array(N);
    for (n = 0; n < N; n++) gauss[n] = Math.sqrt(-2 * Math.log(rnd() + 1e-9)) * Math.cos(6.2832 * rnd());

    // Phase scatter in cycles for a coherence of i / 255.
    var sigma = new Float32Array(256);
    for (var i = 0; i < 256; i++) {
      var g = i / 255, s = g <= 0 ? 1 : Math.sqrt((1 - g * g) / (2 * LOOKS * g * g)) / 6.2832;
      sigma[i] = s > 0.5 ? 0.5 : s;
    }

    var cache = {};
    return {
      atm: atm, gauss: gauss, sigma: sigma,
      // Coherence for a band whose fringe spacing (half wavelength) is cm.
      coherence: function (cm) {
        if (!cache[cm]) {
          var e = (C_CM / cm) * (C_CM / cm), out = new Float32Array(N);
          for (var n = 0; n < N; n++) out[n] = Math.pow(coh[n], e);
          cache[cm] = out;
        }
        return cache[cm];
      }
    };
  };
})();
