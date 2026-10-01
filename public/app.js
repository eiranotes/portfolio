const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() {
  toggle?.setAttribute('aria-expanded', 'false');
  nav?.classList.remove('is-open');
  const mark = toggle?.querySelector('span');
  if (mark) mark.textContent = '＋';
}
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  toggle.querySelector('span').textContent = open ? '−' : '＋';
});
nav?.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('click', (event) => { if (!event.target.closest('.header')) closeMenu(); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); }
});
matchMedia('(min-width: 768px)').addEventListener('change', closeMenu);

// Keep the reader at the equivalent section when switching language.
document.querySelectorAll('.lang-switch a').forEach(link => {
  link.addEventListener('click', () => {
    if (!location.hash || link.getAttribute('href').includes('#')) return;
    link.setAttribute('href', link.getAttribute('href') + location.hash);
  }, {once:true});
});

const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const largeImage = lightbox.querySelector('img');
  const caption = document.querySelector('#lightbox-caption');
  const imageError = lightbox.querySelector('.lightbox-error');
  let trigger = null;
  document.querySelectorAll('[data-lightbox]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0 || !lightbox.showModal) return;
      event.preventDefault();
      trigger = link;
      imageError.hidden = true;
      largeImage.hidden = false;
      largeImage.alt = link.querySelector('img').alt;
      caption.textContent = link.dataset.caption || largeImage.alt;
      lightbox.dataset.theme = link.dataset.theme || '';
      largeImage.style.maxWidth = link.dataset.width ? `${Math.round(link.dataset.width * 1.6)}px` : '';
      largeImage.src = link.href;
      lightbox.showModal();
    });
  });
  largeImage.addEventListener('error', () => { largeImage.hidden = true; imageError.hidden = false; });
  lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    if (event.target !== lightbox) return;
    const box = lightbox.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) lightbox.close();
  });
  lightbox.addEventListener('close', () => { largeImage.removeAttribute('src'); trigger?.focus({preventScroll:true}); });
}
