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

(() => {
  const root = document.querySelector('[data-monthly-schedule]');
  if (!root) return;

  const locale = ['ko', 'ja', 'en'].includes(root.dataset.locale) ? root.dataset.locale : 'ko';
  const copy = {
    ko: {
      eyebrow: 'MONTHLY SCHEDULE',
      schedule: '월간 일정',
      weekdays: ['SUN','MON','TUE','WED','THU','FRI','SAT'],
      prev: '이전 달',
      next: '다음 달',
      current: '이번 달',
      noEvents: '등록된 일정이 없습니다.',
      agenda: '이번 달 일정',
      admin: '관리자 편집',
      add: '일정 추가',
      logout: '편집 종료',
      authTitle: '관리자 편집',
      authHelp: 'eiranotes/portfolio 저장소에 쓰기 권한이 있는 GitHub fine-grained token을 입력하세요. 토큰은 이 탭의 메모리에만 유지됩니다.',
      token: 'GitHub token',
      connect: '권한 확인',
      cancel: '취소',
      editTitle: '일정 수정',
      addTitle: '일정 추가',
      title: '텍스트',
      start: '시작일',
      end: '종료일',
      type: '표시',
      details: '상세 설명',
      link: '링크',
      save: '저장',
      remove: '삭제',
      saving: '저장 중…',
      scheduleType: '일정',
      majorType: '주요 일정',
      blockedType: '출고 불가',
      titleRequired: '일정 텍스트를 입력해 주세요.',
      permissionDenied: '저장소 쓰기 권한을 확인할 수 없습니다.',
      authFailed: 'GitHub 권한 확인에 실패했습니다.',
      saveFailed: '저장에 실패했습니다. 잠시 후 다시 시도해 주세요.',
      conflict: '다른 변경이 먼저 저장되었습니다. 새로고침 후 다시 편집해 주세요.',
      loading: '일정을 불러오는 중…',
      loadFailed: '일정을 불러오지 못했습니다.',
      updated: '저장되었습니다. 공개 페이지 반영에는 잠시 걸릴 수 있습니다.',
      shippingDefault: '주말과 ● 표시된 날짜는 출고가 어렵습니다. 구매에 참고 부탁드립니다.'
    },
    ja: {
      eyebrow: 'MONTHLY SCHEDULE',
      schedule: '月間スケジュール',
      weekdays: ['SUN','MON','TUE','WED','THU','FRI','SAT'],
      prev: '前の月',
      next: '次の月',
      current: '今月',
      noEvents: '登録された予定はありません。',
      agenda: '今月の予定',
      admin: '管理者編集',
      add: '予定を追加',
      logout: '編集終了',
      authTitle: '管理者編集',
      authHelp: 'eiranotes/portfolio リポジトリへの書き込み権限がある GitHub fine-grained token を入力してください。トークンはこのタブのメモリ内だけに保持されます。',
      token: 'GitHub token',
      connect: '権限を確認',
      cancel: 'キャンセル',
      editTitle: '予定を編集',
      addTitle: '予定を追加',
      title: 'テキスト',
      start: '開始日',
      end: '終了日',
      type: '表示',
      details: '詳細',
      link: 'リンク',
      save: '保存',
      remove: '削除',
      saving: '保存中…',
      scheduleType: '予定',
      majorType: '主要予定',
      blockedType: '発送不可',
      titleRequired: '予定のテキストを入力してください。',
      permissionDenied: 'リポジトリの書き込み権限を確認できません。',
      authFailed: 'GitHub の権限確認に失敗しました。',
      saveFailed: '保存に失敗しました。もう一度お試しください。',
      conflict: '別の変更が先に保存されています。再読み込みしてから編集してください。',
      loading: '予定を読み込み中…',
      loadFailed: '予定を読み込めませんでした。',
      updated: '保存しました。公開ページへの反映には少し時間がかかる場合があります。',
      shippingDefault: '週末と●印の日は発送をお休みします。'
    },
    en: {
      eyebrow: 'MONTHLY SCHEDULE',
      schedule: 'Monthly schedule',
      weekdays: ['SUN','MON','TUE','WED','THU','FRI','SAT'],
      prev: 'Previous month',
      next: 'Next month',
      current: 'This month',
      noEvents: 'No events are scheduled.',
      agenda: 'This month',
      admin: 'Admin edit',
      add: 'Add event',
      logout: 'Exit edit mode',
      authTitle: 'Admin edit',
      authHelp: 'Enter a GitHub fine-grained token with write access to eiranotes/portfolio. The token is kept only in this tab memory.',
      token: 'GitHub token',
      connect: 'Check access',
      cancel: 'Cancel',
      editTitle: 'Edit event',
      addTitle: 'Add event',
      title: 'Text',
      start: 'Start date',
      end: 'End date',
      type: 'Display',
      details: 'Details',
      link: 'Link',
      save: 'Save',
      remove: 'Delete',
      saving: 'Saving…',
      scheduleType: 'Schedule',
      majorType: 'Key date',
      blockedType: 'No shipping',
      titleRequired: 'Enter event text.',
      permissionDenied: 'Repository write access could not be verified.',
      authFailed: 'GitHub authorization failed.',
      saveFailed: 'Could not save the schedule. Try again.',
      conflict: 'Another change was saved first. Reload the page before editing again.',
      loading: 'Loading schedule…',
      loadFailed: 'Could not load the schedule.',
      updated: 'Saved. The public page may take a short time to refresh.',
      shippingDefault: 'Shipping is unavailable on weekends and dates marked ●.'
    }
  }[locale];

  const monthNames = locale === 'en'
    ? ['January','February','March','April','May','June','July','August','September','October','November','December']
    : null;

  const dataSrc = root.dataset.scheduleSrc;
  const dataFallback = root.dataset.scheduleFallback;
  const repo = root.dataset.repo || 'eiranotes/portfolio';
  const repoPath = root.dataset.repoPath || 'public/data/schedule.json';
  const branch = root.dataset.branch || 'main';
  const encodedRepoPath = repoPath.split('/').map(encodeURIComponent).join('/');

  let schedule = {schema:1, timezone:'Asia/Seoul', updatedAt:null, notice:{}, events:[]};
  let adminToken = '';
  let adminBaseSha = '';
  let isAdmin = false;
  let view = currentSeoulMonth();

  function currentSeoulMonth() {
    const parts = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Seoul', year:'numeric', month:'2-digit', day:'2-digit'}).formatToParts(new Date());
    const map = Object.fromEntries(parts.map(part => [part.type, part.value]));
    return {year:Number(map.year), month:Number(map.month)};
  }

  function currentSeoulDay() {
    const parts = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Seoul', year:'numeric', month:'2-digit', day:'2-digit'}).formatToParts(new Date());
    const map = Object.fromEntries(parts.map(part => [part.type, part.value]));
    return `${map.year}-${map.month}-${map.day}`;
  }

  function pad(value) { return String(value).padStart(2, '0'); }
  function iso(year, month, day) { return `${year}-${pad(month)}-${pad(day)}`; }
  function parts(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
    return match ? {year:Number(match[1]), month:Number(match[2]), day:Number(match[3])} : null;
  }
  function ordinal(value) {
    const p = parts(value);
    return p ? Math.floor(Date.UTC(p.year, p.month - 1, p.day) / 86400000) : NaN;
  }
  function fromOrdinal(value) {
    const date = new Date(value * 86400000);
    return iso(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
  }
  function daysInMonth(year, month) { return new Date(Date.UTC(year, month, 0)).getUTCDate(); }
  function weekday(year, month, day) { return new Date(Date.UTC(year, month - 1, day)).getUTCDay(); }
  function escapeHtml(value='') {
    return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
  }
  function safeUrl(value='') {
    const raw = String(value || '').trim();
    if (!raw) return '';
    try {
      const url = new URL(raw, location.href);
      return ['http:','https:'].includes(url.protocol) ? url.href : '';
    } catch { return ''; }
  }
  function eventEnd(event) { return event.end || event.start; }
  function intersects(event, start, end) {
    return ordinal(event.start) <= ordinal(end) && ordinal(eventEnd(event)) >= ordinal(start);
  }
  function monthLabel(year, month) {
    if (locale === 'ko') return `${year}년 ${month}월`;
    if (locale === 'ja') return `${year}年 ${month}月`;
    return `${monthNames[month - 1]} ${year}`;
  }
  function dateLabel(start, end) {
    const a = parts(start);
    const b = parts(end || start);
    if (!a || !b) return '';
    if (start === (end || start)) {
      if (locale === 'ko') return `${a.month}월 ${a.day}일`;
      if (locale === 'ja') return `${a.month}月${a.day}日`;
      return `${monthNames[a.month - 1]} ${a.day}`;
    }
    if (a.year === b.year && a.month === b.month) {
      if (locale === 'ko') return `${a.month}월 ${a.day}–${b.day}일`;
      if (locale === 'ja') return `${a.month}月${a.day}–${b.day}日`;
      return `${monthNames[a.month - 1]} ${a.day}–${b.day}`;
    }
    if (locale === 'ko') return `${a.month}월 ${a.day}일 – ${b.month}월 ${b.day}일`;
    if (locale === 'ja') return `${a.month}月${a.day}日 – ${b.month}月${b.day}日`;
    return `${monthNames[a.month - 1]} ${a.day} – ${monthNames[b.month - 1]} ${b.day}`;
  }

  function normalizedData(data) {
    const events = Array.isArray(data?.events) ? data.events.filter(event => parts(event.start) && parts(eventEnd(event))) : [];
    return {
      schema: 1,
      timezone: data?.timezone || 'Asia/Seoul',
      updatedAt: data?.updatedAt || null,
      notice: data?.notice && typeof data.notice === 'object' ? data.notice : {},
      events: events.map(event => ({
        id: String(event.id || crypto.randomUUID?.() || `event-${Date.now()}`),
        start: event.start,
        end: eventEnd(event),
        type: ['schedule','major','blocked'].includes(event.type) ? event.type : 'schedule',
        title: String(event.title || ''),
        details: String(event.details || ''),
        url: safeUrl(event.url || '')
      }))
    };
  }

  function eventsForMonth(year, month) {
    const start = iso(year, month, 1);
    const end = iso(year, month, daysInMonth(year, month));
    return schedule.events
      .filter(event => event.type !== 'blocked' && event.title.trim() && intersects(event, start, end))
      .sort((a, b) => ordinal(a.start) - ordinal(b.start) || ordinal(eventEnd(a)) - ordinal(eventEnd(b)));
  }

  function isBlocked(dayIso) {
    return schedule.events.some(event => event.type === 'blocked' && intersects(event, dayIso, dayIso));
  }

  function eventSegmentsForWeek(weekStart, weekEnd) {
    const segments = schedule.events
      .filter(event => event.type !== 'blocked' && event.title.trim() && intersects(event, weekStart, weekEnd))
      .map(event => {
        const start = Math.max(ordinal(event.start), ordinal(weekStart));
        const end = Math.min(ordinal(eventEnd(event)), ordinal(weekEnd));
        return {event, start, end};
      })
      .sort((a,b) => a.start - b.start || b.end - a.end);

    const laneEnds = [];
    for (const segment of segments) {
      let lane = laneEnds.findIndex(end => end < segment.start);
      if (lane < 0) lane = laneEnds.length;
      laneEnds[lane] = segment.end;
      segment.lane = lane;
    }
    return {segments, lanes:laneEnds.length};
  }

  function render() {
    const {year, month} = view;
    const first = iso(year, month, 1);
    const firstOrd = ordinal(first);
    const startOrd = firstOrd - weekday(year, month, 1);
    const totalDays = daysInMonth(year, month);
    const weekCount = Math.ceil((weekday(year, month, 1) + totalDays) / 7);
    const currentDay = currentSeoulDay();
    const monthEvents = eventsForMonth(year, month);
    const notice = schedule.notice?.[locale] || schedule.notice?.ko || copy.shippingDefault;

    const weekdayHtml = copy.weekdays.map((day, index) =>
      `<div class="schedule-weekday${index === 0 ? ' is-sun' : index === 6 ? ' is-sat' : ''}">${day}</div>`
    ).join('');

    let weeksHtml = '';
    for (let weekIndex = 0; weekIndex < weekCount; weekIndex += 1) {
      const weekStartOrd = startOrd + weekIndex * 7;
      const weekEndOrd = weekStartOrd + 6;
      const weekStart = fromOrdinal(weekStartOrd);
      const weekEnd = fromOrdinal(weekEndOrd);
      const {segments, lanes} = eventSegmentsForWeek(weekStart, weekEnd);
      const laneCount = Math.max(1, lanes);
      let daysHtml = '';
      for (let col = 0; col < 7; col += 1) {
        const dayIso = fromOrdinal(weekStartOrd + col);
        const p = parts(dayIso);
        const outside = p.month !== month;
        const blocked = !outside && isBlocked(dayIso);
        const today = dayIso === currentDay;
        const dayClasses = [
          'schedule-day',
          outside ? 'is-outside' : '',
          col === 0 ? 'is-sun' : '',
          col === 6 ? 'is-sat' : '',
          blocked ? 'is-blocked' : '',
          today ? 'is-today' : ''
        ].filter(Boolean).join(' ');
        daysHtml += `<div class="${dayClasses}" style="grid-column:${col + 1};grid-row:1/-1" aria-label="${escapeHtml(dayIso)}"><span class="schedule-day-number">${outside ? '' : p.day}</span></div>`;
      }

      const barsHtml = segments.map(segment => {
        const startCol = segment.start - weekStartOrd + 1;
        const endCol = segment.end - weekStartOrd + 2;
        const event = segment.event;
        const label = `${event.title} · ${dateLabel(event.start, eventEnd(event))}`;
        const classes = [
          'schedule-bar',
          `is-${event.type}`,
          segment.start === segment.end ? 'is-single' : '',
          ordinal(event.start) < segment.start ? 'continues-before' : '',
          ordinal(eventEnd(event)) > segment.end ? 'continues-after' : ''
        ].filter(Boolean).join(' ');
        const content = `<span>${escapeHtml(event.title)}</span>`;
        const style = `grid-column:${startCol}/${endCol};grid-row:${segment.lane + 2}`;
        if (isAdmin) return `<button class="${classes}" style="${style}" type="button" data-edit-event="${escapeHtml(event.id)}" aria-label="${escapeHtml(label)}">${content}</button>`;
        if (event.url) return `<a class="${classes}" style="${style}" href="${escapeHtml(event.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(label)}">${content}</a>`;
        return `<div class="${classes}" style="${style}" aria-label="${escapeHtml(label)}">${content}</div>`;
      }).join('');

      weeksHtml += `<div class="schedule-week" style="--lane-count:${laneCount}" role="row">${daysHtml}${barsHtml}</div>`;
    }

    const agendaHtml = monthEvents.length ? monthEvents.map(event => {
      const detail = event.details ? `<p>${escapeHtml(event.details)}</p>` : '';
      const title = `<span class="schedule-agenda-title">${escapeHtml(event.title)}</span>`;
      const content = `<span class="schedule-agenda-date">${escapeHtml(dateLabel(event.start, eventEnd(event)))}</span><div>${title}${detail}</div>`;
      if (isAdmin) return `<li><button type="button" data-edit-event="${escapeHtml(event.id)}">${content}</button></li>`;
      if (event.url) return `<li><a href="${escapeHtml(event.url)}" target="_blank" rel="noopener noreferrer">${content}</a></li>`;
      return `<li><div class="schedule-agenda-row">${content}</div></li>`;
    }).join('') : `<li class="schedule-empty">${copy.noEvents}</li>`;

    const adminButtons = isAdmin
      ? `<button class="schedule-admin-button is-active" type="button" data-add-event>＋ ${copy.add}</button><button class="schedule-admin-button" type="button" data-admin-logout>${copy.logout}</button>`
      : `<button class="schedule-admin-button" type="button" data-admin-login>${copy.admin}</button>`;

    root.innerHTML = `
      <div class="schedule-heading">
        <div>
          <p class="eyebrow">${copy.eyebrow}</p>
          <h2>${monthLabel(year, month)} <span>${copy.schedule}</span></h2>
        </div>
        <div class="schedule-actions">
          <div class="schedule-month-nav" aria-label="${escapeHtml(copy.schedule)}">
            <button type="button" data-month-prev aria-label="${escapeHtml(copy.prev)}">←</button>
            <button type="button" data-month-current>${copy.current}</button>
            <button type="button" data-month-next aria-label="${escapeHtml(copy.next)}">→</button>
          </div>
          <div class="schedule-admin-actions">${adminButtons}</div>
        </div>
      </div>
      <div class="schedule-calendar" role="grid" aria-label="${escapeHtml(monthLabel(year, month))}">
        <div class="schedule-weekdays" role="row">${weekdayHtml}</div>
        <div class="schedule-weeks">${weeksHtml}</div>
      </div>
      <div class="schedule-foot">
        <p class="schedule-shipping-note"><span aria-hidden="true">●</span> ${escapeHtml(notice)}</p>
      </div>
      <div class="schedule-agenda">
        <h3>${copy.agenda}</h3>
        <ol>${agendaHtml}</ol>
      </div>
      <p class="schedule-status" role="status" aria-live="polite"></p>
    `;

    bindRendered();
  }

  function changeMonth(delta) {
    let year = view.year;
    let month = view.month + delta;
    if (month < 1) { month = 12; year -= 1; }
    if (month > 12) { month = 1; year += 1; }
    view = {year, month};
    render();
  }

  function bindRendered() {
    root.querySelector('[data-month-prev]')?.addEventListener('click', () => changeMonth(-1));
    root.querySelector('[data-month-next]')?.addEventListener('click', () => changeMonth(1));
    root.querySelector('[data-month-current]')?.addEventListener('click', () => { view = currentSeoulMonth(); render(); });
    root.querySelector('[data-admin-login]')?.addEventListener('click', openAuthDialog);
    root.querySelector('[data-admin-logout]')?.addEventListener('click', () => {
      adminToken = '';
      adminBaseSha = '';
      isAdmin = false;
      render();
    });
    root.querySelector('[data-add-event]')?.addEventListener('click', () => openEventDialog());
    root.querySelectorAll('[data-edit-event]').forEach(button => {
      button.addEventListener('click', () => openEventDialog(schedule.events.find(event => event.id === button.dataset.editEvent)));
    });
  }

  function status(message, isError=false) {
    const node = root.querySelector('.schedule-status');
    if (!node) return;
    node.textContent = message;
    node.classList.toggle('is-error', isError);
  }

  function createDialog(className, title) {
    const dialog = document.createElement('dialog');
    dialog.className = `schedule-dialog ${className}`;
    dialog.innerHTML = `<div class="schedule-dialog-head"><h2>${escapeHtml(title)}</h2><button type="button" class="schedule-dialog-close" aria-label="${escapeHtml(copy.cancel)}">×</button></div><div class="schedule-dialog-body"></div>`;
    document.body.append(dialog);
    dialog.querySelector('.schedule-dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => dialog.remove());
    return dialog;
  }

  function openAuthDialog() {
    const dialog = createDialog('schedule-auth-dialog', copy.authTitle);
    const body = dialog.querySelector('.schedule-dialog-body');
    body.innerHTML = `
      <p class="schedule-dialog-help">${escapeHtml(copy.authHelp)}</p>
      <form class="schedule-auth-form">
        <label><span>${copy.token}</span><input type="password" name="token" autocomplete="off" spellcheck="false" required></label>
        <p class="schedule-dialog-error" role="alert"></p>
        <div class="schedule-dialog-actions"><button type="button" data-cancel>${copy.cancel}</button><button type="submit" class="primary">${copy.connect}</button></div>
      </form>
    `;
    body.querySelector('[data-cancel]').addEventListener('click', () => dialog.close());
    body.querySelector('form').addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.currentTarget;
      const token = form.elements.token.value.trim();
      const error = form.querySelector('.schedule-dialog-error');
      const submit = form.querySelector('[type="submit"]');
      error.textContent = '';
      submit.disabled = true;
      submit.textContent = copy.loading;
      try {
        const headers = githubHeaders(token);
        const repoResponse = await fetch(`https://api.github.com/repos/${repo}`, {headers});
        if (!repoResponse.ok) throw new Error('auth');
        const repoData = await repoResponse.json();
        const permissions = repoData.permissions || {};
        if (!(permissions.admin || permissions.maintain || permissions.push)) throw new Error('permission');

        const contentResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${encodedRepoPath}?ref=${encodeURIComponent(branch)}`, {headers});
        if (!contentResponse.ok) throw new Error('auth');
        const contentData = await contentResponse.json();
        schedule = normalizedData(JSON.parse(decodeBase64Utf8(contentData.content || '')));
        adminToken = token;
        adminBaseSha = contentData.sha || '';
        isAdmin = true;
        dialog.close();
        render();
      } catch (err) {
        error.textContent = err.message === 'permission' ? copy.permissionDenied : copy.authFailed;
        submit.disabled = false;
        submit.textContent = copy.connect;
      }
    });
    dialog.showModal();
    body.querySelector('input')?.focus();
  }

  function defaultEventDate() {
    const now = currentSeoulDay();
    const p = parts(now);
    if (p && p.year === view.year && p.month === view.month) return now;
    return iso(view.year, view.month, 1);
  }

  function openEventDialog(event) {
    if (!isAdmin) return;
    const editing = Boolean(event);
    const draft = event || {
      id: crypto.randomUUID?.() || `event-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
      start: defaultEventDate(),
      end: defaultEventDate(),
      type: 'schedule',
      title: '',
      details: '',
      url: ''
    };
    const dialog = createDialog('schedule-event-dialog', editing ? copy.editTitle : copy.addTitle);
    const body = dialog.querySelector('.schedule-dialog-body');
    body.innerHTML = `
      <form class="schedule-event-form">
        <div class="schedule-form-grid">
          <label class="wide"><span>${copy.title}</span><input name="title" type="text" value="${escapeHtml(draft.title)}" maxlength="160"></label>
          <label><span>${copy.start}</span><input name="start" type="date" value="${escapeHtml(draft.start)}" required></label>
          <label><span>${copy.end}</span><input name="end" type="date" value="${escapeHtml(eventEnd(draft))}" required></label>
          <label class="wide"><span>${copy.type}</span><select name="type">
            <option value="schedule"${draft.type === 'schedule' ? ' selected' : ''}>${copy.scheduleType}</option>
            <option value="major"${draft.type === 'major' ? ' selected' : ''}>${copy.majorType}</option>
            <option value="blocked"${draft.type === 'blocked' ? ' selected' : ''}>${copy.blockedType}</option>
          </select></label>
          <label class="wide"><span>${copy.details}</span><textarea name="details" rows="3" maxlength="500">${escapeHtml(draft.details || '')}</textarea></label>
          <label class="wide"><span>${copy.link}</span><input name="url" type="url" value="${escapeHtml(draft.url || '')}" placeholder="https://"></label>
        </div>
        <p class="schedule-dialog-error" role="alert"></p>
        <div class="schedule-dialog-actions">
          ${editing ? `<button type="button" class="danger" data-delete>${copy.remove}</button>` : '<span></span>'}
          <div><button type="button" data-cancel>${copy.cancel}</button><button type="submit" class="primary">${copy.save}</button></div>
        </div>
      </form>
    `;
    const form = body.querySelector('form');
    body.querySelector('[data-cancel]').addEventListener('click', () => dialog.close());
    body.querySelector('[data-delete]')?.addEventListener('click', async () => {
      const error = body.querySelector('.schedule-dialog-error');
      error.textContent = '';
      try {
        const next = structuredClone(schedule);
        next.events = next.events.filter(item => item.id !== draft.id);
        next.updatedAt = new Date().toISOString();
        await persistSchedule(next);
        schedule = normalizedData(next);
        dialog.close();
        render();
        status(copy.updated);
      } catch (err) {
        error.textContent = err.message === 'conflict' ? copy.conflict : copy.saveFailed;
      }
    });
    form.addEventListener('submit', async submitEvent => {
      submitEvent.preventDefault();
      const data = new FormData(form);
      const type = data.get('type');
      const title = String(data.get('title') || '').trim();
      const start = String(data.get('start') || '');
      const end = String(data.get('end') || start);
      const error = form.querySelector('.schedule-dialog-error');
      const saveButton = form.querySelector('[type="submit"]');
      error.textContent = '';
      if (type !== 'blocked' && !title) {
        error.textContent = copy.titleRequired;
        form.elements.title.focus();
        return;
      }
      if (!parts(start) || !parts(end) || ordinal(end) < ordinal(start)) {
        error.textContent = copy.saveFailed;
        return;
      }
      const nextEvent = {
        id: draft.id,
        start,
        end,
        type,
        title,
        details: String(data.get('details') || '').trim(),
        url: safeUrl(String(data.get('url') || '').trim())
      };
      const next = structuredClone(schedule);
      const index = next.events.findIndex(item => item.id === nextEvent.id);
      if (index >= 0) next.events[index] = nextEvent; else next.events.push(nextEvent);
      next.updatedAt = new Date().toISOString();
      saveButton.disabled = true;
      saveButton.textContent = copy.saving;
      try {
        await persistSchedule(next);
        schedule = normalizedData(next);
        const savedMonth = parts(start);
        if (savedMonth) view = {year:savedMonth.year, month:savedMonth.month};
        dialog.close();
        render();
        status(copy.updated);
      } catch (err) {
        error.textContent = err.message === 'conflict' ? copy.conflict : copy.saveFailed;
        saveButton.disabled = false;
        saveButton.textContent = copy.save;
      }
    });
    dialog.showModal();
    form.elements.title?.focus();
  }

  function githubHeaders(token) {
    return {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28'
    };
  }

  function decodeBase64Utf8(value) {
    const binary = atob(String(value).replace(/\s/g, ''));
    const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  function encodeBase64Utf8(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = '';
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }
    return btoa(binary);
  }

  async function persistSchedule(next) {
    if (!adminToken || !adminBaseSha) throw new Error('auth');
    const headers = githubHeaders(adminToken);
    const currentResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${encodedRepoPath}?ref=${encodeURIComponent(branch)}`, {headers});
    if (!currentResponse.ok) throw new Error('save');
    const current = await currentResponse.json();
    if (current.sha !== adminBaseSha) throw new Error('conflict');

    const body = {
      message: `chore(info): update monthly schedule ${new Date().toISOString().slice(0,10)}`,
      content: encodeBase64Utf8(JSON.stringify(next, null, 2) + '\n'),
      sha: current.sha,
      branch
    };
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${encodedRepoPath}`, {
      method: 'PUT',
      headers: {...headers, 'Content-Type':'application/json'},
      body: JSON.stringify(body)
    });
    if (response.status === 409) throw new Error('conflict');
    if (!response.ok) throw new Error('save');
    const result = await response.json();
    adminBaseSha = result.content?.sha || '';
  }

  async function loadSchedule() {
    root.innerHTML = `<div class="schedule-loading" role="status">${escapeHtml(copy.loading)}</div>`;
    const candidates = [dataSrc, dataFallback].filter(Boolean);
    for (const url of candidates) {
      try {
        const join = url.includes('?') ? '&' : '?';
        const response = await fetch(`${url}${join}v=${Date.now()}`, {cache:'no-store'});
        if (!response.ok) continue;
        schedule = normalizedData(await response.json());
        render();
        return;
      } catch {}
    }
    root.innerHTML = `<div class="schedule-load-error" role="alert">${escapeHtml(copy.loadFailed)}</div>`;
  }

  loadSchedule();
})();
