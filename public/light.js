'use strict';

// "Light through a small window": the signature section can be seen by day or by
// night, and a band of light runs across the foil lines of the pieces. Without
// this script the section is the same static daytime composition.
(() => {
  const section = document.getElementById('signature');
  const cluster = section && section.querySelector('.glass-cluster');
  if (!section || !cluster) return;
  const pieces = Array.from(cluster.querySelectorAll('.piece'));
  const lang = (document.documentElement.lang || 'ko').slice(0, 2);
  const copy = {
    ko: { group: '창의 시간', day: '낮의 창', night: '밤의 창' },
    ja: { group: '窓の時間', day: '昼の窓', night: '夜の窓' },
    en: { group: 'Window light', day: 'Day', night: 'Night' },
  }[lang] || { group: 'Window light', day: 'Day', night: 'Night' };

  // The light band is masked by each piece's own artwork, so it only touches the glass.
  pieces.forEach(piece => {
    const img = piece.querySelector('img');
    if (img) piece.style.setProperty('--piece-src', `url("${img.currentSrc || img.src}")`);
    piece.classList.add('has-sheen');
  });

  const toggle = document.createElement('div');
  toggle.className = 'light-toggle';
  toggle.setAttribute('role', 'group');
  toggle.setAttribute('aria-label', copy.group);
  toggle.innerHTML = `<button type="button" aria-pressed="true" data-time="day">${copy.day}</button>`
    + `<button type="button" aria-pressed="false" data-time="night">${copy.night}</button>`;
  const intro = section.querySelector('.glass-intro');
  (intro.querySelector('.glass-spec') || intro.lastElementChild).after(toggle);
  toggle.addEventListener('click', event => {
    const button = event.target.closest('button[data-time]');
    if (!button) return;
    const night = button.dataset.time === 'night';
    section.classList.toggle('is-night', night);
    toggle.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  });

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  // Background-position that puts the band's centre at the pointer's relative x (band is 300% wide).
  const setLight = ratio => cluster.style.setProperty('--light', `${Math.round(75 - Math.min(1, Math.max(0, ratio)) * 50)}%`);
  if (window.matchMedia('(hover: hover)').matches) {
    cluster.addEventListener('pointermove', event => {
      const r = cluster.getBoundingClientRect();
      setLight((event.clientX - r.left) / r.width);
    });
    cluster.addEventListener('pointerleave', () => cluster.style.removeProperty('--light'));
  }
  // On touch screens (and once on desktop) the light passes by as the section comes into view.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      cluster.classList.add('is-sweeping');
      setTimeout(() => cluster.classList.remove('is-sweeping'), 1700);
      observer.disconnect();
    }, { threshold: 0.4 });
    observer.observe(cluster);
  }
})();
