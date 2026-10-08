// Shared behaviour: theme switch and the mobile menu.
(function () {
  var root = document.documentElement;

  // Theme: follows the device setting until the visitor chooses one.
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable: theme lasts for this page only */ }
      document.dispatchEvent(new CustomEvent('themechange', { detail: next }));
    });
  }

  // Mobile menu
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  // On smaller screens, hide the top bar while scrolling down and bring it
  // back as soon as the visitor scrolls up, like a phone browser's address bar.
  var header = document.querySelector('.site-header');
  var small = window.matchMedia('(max-width: 1039px)');
  if (header) {
    var lastY = window.scrollY;
    var show = function () { header.classList.remove('is-hidden'); };
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      var menuOpen = nav && nav.classList.contains('is-open');
      if (!small.matches || menuOpen || y <= header.offsetHeight) { show(); }
      else if (y > lastY + 6) { header.classList.add('is-hidden'); }
      else if (y < lastY - 6) { show(); }
      if (Math.abs(y - lastY) > 6) lastY = y;
    }, { passive: true });
    header.addEventListener('focusin', show);
    small.addEventListener('change', show);
  }
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.textContent = open ? 'Close' : 'Menu';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = 'Menu';
        navToggle.focus();
      }
    });
  }
})();
