// Filtering for the Publications and Media pages.
// Items carry data-type, data-themes (optional) and data-text attributes.
(function () {
  document.querySelectorAll('[data-filter]').forEach(function (scope) {
    var chips = scope.querySelectorAll('[data-filter-type]');
    var themeSel = scope.querySelector('[data-filter-theme]');
    var textInput = scope.querySelector('[data-filter-text]');
    var status = scope.querySelector('[data-filter-status]');
    var empty = scope.querySelector('[data-filter-empty]');
    var items = scope.querySelectorAll('[data-type][data-text]');
    var groups = scope.querySelectorAll('[data-filter-group]');
    var state = { type: 'all', theme: 'all', text: '' };

    function apply() {
      var shown = 0;
      items.forEach(function (el) {
        var ok = (state.type === 'all' || el.getAttribute('data-type') === state.type) &&
          (state.theme === 'all' || (' ' + (el.getAttribute('data-themes') || '') + ' ').indexOf(' ' + state.theme + ' ') !== -1) &&
          (!state.text || el.getAttribute('data-text').indexOf(state.text) !== -1);
        el.hidden = !ok;
        if (ok) shown++;
      });
      groups.forEach(function (g) {
        g.hidden = !g.querySelector('[data-type][data-text]:not([hidden])');
      });
      if (empty) empty.hidden = shown !== 0;
      if (status) {
        status.textContent = shown === items.length ? 'Showing all ' + items.length + '.' : 'Showing ' + shown + ' of ' + items.length + '.';
      }
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        state.type = chip.getAttribute('data-filter-type');
        chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
        apply();
      });
    });
    if (themeSel) themeSel.addEventListener('change', function () { state.theme = themeSel.value; apply(); });
    if (textInput) textInput.addEventListener('input', function () { state.text = textInput.value.trim().toLowerCase(); apply(); });
    apply();
  });
})();
