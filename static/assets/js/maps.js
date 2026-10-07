// Links the study-area markers on the maps to the list beside them.
(function () {
  document.querySelectorAll('[data-sitemap]').forEach(function (box) {
    function activate(id, on) {
      box.querySelectorAll('[data-site="' + id + '"]').forEach(function (el) {
        el.classList.toggle('is-active', on);
      });
    }
    box.querySelectorAll('[data-site]').forEach(function (el) {
      var id = el.getAttribute('data-site');
      el.addEventListener('pointerenter', function () { activate(id, true); });
      el.addEventListener('pointerleave', function () { activate(id, false); });
      el.addEventListener('focusin', function () { activate(id, true); });
      el.addEventListener('focusout', function () { activate(id, false); });
    });
    // Clicking a marker scrolls its description into view (useful on phones).
    box.querySelectorAll('svg [data-site]').forEach(function (g) {
      g.addEventListener('click', function () {
        var li = box.querySelector('li[data-site="' + g.getAttribute('data-site') + '"]');
        if (!li) return;
        box.querySelectorAll('.is-active').forEach(function (el) { el.classList.remove('is-active'); });
        box.querySelectorAll('[data-site="' + g.getAttribute('data-site') + '"]').forEach(function (el) { el.classList.add('is-active'); });
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        li.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
      });
    });
  });
})();
