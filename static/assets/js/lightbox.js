// Opens research figures in a full-screen viewer. Without JavaScript the
// figure links still open the full-resolution image in a new tab.
(function () {
  const figs = document.querySelectorAll('.fig-link, .fig-schematic');
  if (!figs.length || typeof HTMLDialogElement === 'undefined') return;

  const dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.setAttribute('aria-label', 'Figure');
  dlg.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close">×</button><div class="lightbox-body"></div><p class="lightbox-caption"></p>';
  document.body.appendChild(dlg);
  const body = dlg.querySelector('.lightbox-body');
  const cap = dlg.querySelector('.lightbox-caption');

  function open(fig, content) {
    body.replaceChildren(content);
    const fc = fig.querySelector('figcaption');
    cap.textContent = fc ? fc.textContent.trim() : '';
    cap.hidden = !cap.textContent;
    dlg.showModal();
    document.documentElement.classList.add('lightbox-open');
  }

  dlg.addEventListener('close', () => {
    document.documentElement.classList.remove('lightbox-open');
    body.replaceChildren();
  });
  // Any click closes it, except on the caption text.
  dlg.addEventListener('click', (e) => { if (!cap.contains(e.target)) dlg.close(); });

  figs.forEach((el) => {
    const fig = el.closest('figure');
    if (el.classList.contains('fig-link')) {
      el.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return; // let new-tab clicks through
        e.preventDefault();
        const img = new Image();
        const thumb = el.querySelector('img');
        img.src = thumb.currentSrc || thumb.src; // show at once, then swap to full size
        img.alt = thumb.alt;
        const full = new Image();
        full.onload = () => { img.src = full.src; };
        full.src = el.href;
        open(fig, img);
      });
    } else {
      const svg = el.querySelector('svg');
      if (!svg) return;
      el.tabIndex = 0;
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', 'Enlarge figure');
      const go = () => {
        const copy = svg.cloneNode(true);
        copy.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
        copy.removeAttribute('aria-labelledby');
        copy.setAttribute('aria-hidden', 'true');
        const wrap = document.createElement('div');
        wrap.className = 'lightbox-svg';
        wrap.appendChild(copy);
        open(fig, wrap);
      };
      el.addEventListener('click', go);
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    }
  });
})();
