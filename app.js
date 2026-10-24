// First Minutes: screens, navigation, voice and the CPR beat.
const app = document.getElementById('app');
const store = {
  get(k, d) { try { const v = localStorage.getItem('fm.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('fm.' + k, JSON.stringify(v)); } catch (e) { } },
};

const I = {
  home: '<svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5M5.5 9.5V20h13V9.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M6.6 2.8 9.5 2l2 5-2.4 1.6a12 12 0 0 0 6.3 6.3l1.6-2.4 5 2-.8 2.9c-.3 1.1-1.3 1.8-2.4 1.7C10.4 18.6 5.4 13.6 4.9 5.2c-.1-1.1.6-2.1 1.7-2.4z" fill="currentColor"/></svg>',
  spk: '<svg viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  mute: '<svg viewBox="0 0 24 24"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path d="m16 9.5 5 5m0-5-5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  chev: '<svg class="chev" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M12 11v6M12 7.2v.1" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="m15.5 15.5 5 5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
};
const LOGO = '<svg viewBox="0 0 40 40" class="logo"><rect width="40" height="40" rx="11" fill="#14935F"/><path d="M16 8h8v8h8v8h-8v8h-8v-8H8v-8h8z" fill="#fff"/></svg>';

// Crops that turn a full scene into a tile thumbnail.
const CROP = { chokeSign: '50 12 150 112', cprPush: '34 66 290 216', bleedPress: '60 40 240 179' };
const thumb = id => art(id).replace('viewBox="0 0 360 260"', `viewBox="${CROP[id] || '0 0 360 260'}" preserveAspectRatio="xMidYMid slice"`);

// ---------- voice: a recorded clip for every screen (audio/<key>.mp3) ----------
let voiceOn = store.get('voice', true), audio = null, voiceSrc = null, playToken = 0;
const clips = new Map();
function ctx() {
  if (!audio) {
    audio = new (window.AudioContext || window.webkitAudioContext)();
    // Keeps sound on when an iPhone is switched to silent.
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) { }
  }
  if (audio.state === 'suspended') audio.resume().catch(() => { });
  return audio;
}
async function clip(key) {
  if (!clips.has(key)) clips.set(key, fetch('audio/' + key + '.mp3').then(r => r.arrayBuffer()).then(b => ctx().decodeAudioData(b)));
  return clips.get(key);
}
async function speak(key) {
  stopSpeak();
  if (!voiceOn || !key) return;
  const token = playToken;
  try {
    const buf = await clip(key);
    if (token !== playToken || !voiceOn) return;
    const s = ctx().createBufferSource();
    s.buffer = buf; s.connect(audio.destination); s.start();
    voiceSrc = s;
  } catch (e) { clips.delete(key); }
}
function stopSpeak() {
  playToken++;
  if (voiceSrc) { try { voiceSrc.stop(); } catch (e) { } voiceSrc = null; }
}

// ---------- routing ----------
const link = (...p) => '#/f/' + p.join('/');
function route() {
  stopMetro(); stopSpeak();
  const [root, fid, vid, sid] = location.hash.replace(/^#\/?/, '').split('/');
  const flow = FLOWS[fid];
  if (root !== 'f' || !flow) return home();
  if (!vid) return flow.who ? who(fid, flow) : location.replace(link(fid, 'all', 1));
  const v = flow[vid];
  if (!v) return home();
  if (!sid) return v.check ? check(fid, vid, flow, v) : location.replace(link(fid, vid, 1));
  if (sid === 'cough') return step(fid, vid, flow, v, v.cough, -1);
  const i = parseInt(sid, 10) - 1;
  return v.steps[i] ? step(fid, vid, flow, v, v.steps[i], i) : home();
}

function whoLabel(flow, vid) {
  if (vid === 'breathing') return 'Breathing';
  const w = (flow.who || []).find(w => w.id === vid);
  return w ? w.label : '';
}

function shell(o, body, nav = '') {
  document.title = o.title + ' · First Minutes';
  app.innerHTML = `<div class="screen">
    <header class="bar">
      <a class="ib" href="#/" aria-label="Home">${I.home}</a>
      <div class="crumb"><b>${o.title}</b>${o.sub ? `<span>${o.sub}</span>` : ''}</div>
      <button class="ib voice" type="button" aria-pressed="${voiceOn}" aria-label="Read the steps aloud">${voiceOn ? I.spk : I.mute}</button>
      <a class="call" href="tel:911" aria-label="Call 911">${I.phone}<span>911</span></a>
    </header>
    ${o.progress != null ? `<div class="prog" aria-hidden="true"><i style="width:${o.progress}%"></i></div>` : ''}
    <main class="body">${body}</main>${nav}
  </div>`;
  window.scrollTo(0, 0);
  app.querySelector('.voice').addEventListener('click', e => {
    voiceOn = !voiceOn; store.set('voice', voiceOn);
    e.currentTarget.setAttribute('aria-pressed', voiceOn);
    e.currentTarget.innerHTML = voiceOn ? I.spk : I.mute;
    voiceOn ? speak(o.say) : stopSpeak();
  });
}

// ---------- screens ----------
function home() {
  document.title = 'First Minutes';
  app.innerHTML = `<div class="home">
    <header class="top"><div class="brand">${LOGO}<span>First Minutes</span></div><span class="tag">Prototype</span></header>
    <a class="call911" href="tel:911">${I.phone}<span><b>Call 911</b><small>If a life is in danger, call first.</small></span></a>
    <label class="search">${I.search}<input id="q" type="search" placeholder="What’s happening?" autocomplete="off" enterkeyhint="search" aria-label="Search emergencies"></label>
    <div id="results" class="results" hidden></div>
    <div id="main">
      <h2 class="label">Tap the emergency</h2>
      <div class="tiles">${Object.entries(FLOWS).map(([id, f]) => tile(id, f)).join('')}</div>
      <section class="coming"><h2 class="label">Coming in the full version</h2><div class="chips">${COMING.map(c => `<span>${c}</span>`).join('')}</div></section>
      <section class="install"><h2>Save it before you need it</h2><p><b>iPhone:</b> tap Share, then Add to Home Screen. <b>Android:</b> tap the menu, then Add to Home screen. It opens even without internet.</p></section>
      <p class="fine">First Minutes is a first aid guide written by a nurse, based on the 2025 American Heart Association guidelines, American Red Cross first aid and Stop the Bleed. It does not replace calling 911, a doctor, or a hands on CPR class.</p>
    </div>
  </div>`;
  const q = app.querySelector('#q'), res = app.querySelector('#results'), main = app.querySelector('#main');
  q.addEventListener('input', () => {
    const words = q.value.toLowerCase().replace(/[^a-z\s']/g, ' ').split(/\s+/).filter(w => w.length > 1);
    if (!words.length) { res.hidden = true; main.hidden = false; return; }
    const hit = Object.entries(FLOWS).filter(([, f]) => words.some(w => (f.title + ' ' + f.keys).toLowerCase().includes(w)));
    const soon = COMING.filter(c => words.some(w => c.toLowerCase().includes(w)));
    res.innerHTML = hit.map(([id, f]) => tile(id, f)).join('') +
      soon.map(c => `<div class="soon"><b>${c}</b><small>Coming in the full version. If it’s serious, call 911.</small></div>`).join('') +
      (hit.length || soon.length ? '' : `<div class="soon"><b>No match</b><small>Try another word, like “choking” or “bleeding”. If it’s serious, call 911.</small></div>`);
    res.hidden = false; main.hidden = true;
  });
}
const tile = (id, f) => `<a class="tile" href="#/f/${id}"><span class="tart">${thumb(f.icon)}</span><span class="tx"><b>${f.title}</b><small>${f.sub}</small></span>${I.chev}</a>`;

function who(fid, flow) {
  const say = 'who-' + fid;
  shell({ title: flow.title, sub: 'Who needs help?', say }, `<div class="pad">
    <h1 class="q">Who needs help?</h1>
    <div class="who">${flow.who.map(w => `<a class="whob" href="${link(fid, w.id)}"><span class="wart">${art(w.art)}</span><span class="tx"><b>${w.label}</b><small>${w.sub}</small></span>${I.chev}</a>`).join('')}</div>
  </div>`);
  speak(say);
}

function check(fid, vid, flow, v) {
  const say = `check-${fid}-${vid}`;
  shell({ title: flow.title, sub: whoLabel(flow, vid), say }, `<div class="pad">
    <h1 class="q">${v.check.q}</h1>
    <div class="answers">
      <a class="ans no" href="${link(fid, vid, 1)}"><b>${v.check.no}</b><small>Start the steps now</small></a>
      <a class="ans yes" href="${link(fid, vid, 'cough')}"><b>${v.check.yes}</b><small>Let them cough</small></a>
    </div>
  </div>`);
  speak(say);
}

function step(fid, vid, flow, v, s, i) {
  const n = v.steps.length, cough = i < 0, last = !cough && i === n - 1;
  const back = cough ? link(fid, vid) : i > 0 ? link(fid, vid, i) : v.check ? link(fid, vid) : vid === 'breathing' ? link('cpr') : flow.who ? link(fid) : '#/';
  const next = cough ? null : last ? '#/' : link(fid, vid, i + 2);
  const say = cough ? `cough-${fid}-${vid}` : `${fid}-${vid}-${i + 1}`;
  shell({ title: flow.title, sub: whoLabel(flow, vid), progress: cough ? null : Math.round((i + 1) / n * 100), say }, `
    <div class="art">${art(s.art)}</div>
    <div class="txt">
      ${cough ? '' : `<p class="count">Step ${i + 1} of ${n}</p>`}
      <h1>${s.t}</h1>
      <p class="d">${s.d}</p>
      ${s.metro ? metroHTML(s.metro) : ''}
      ${s.more ? `<p class="more">${I.info}<span>${s.more}</span></p>` : ''}
      ${s.branch ? `<a class="branch" href="${s.branch.go}"><span>${s.branch.label}</span>${I.chev}</a>` : ''}
      ${s.cta ? `<a class="cta" href="${s.cta.go}">${s.cta.label}</a>` : ''}
    </div>`,
    `<nav class="nav"><a class="back" href="${back}">Back</a>${next ? `<a class="next" href="${next}">${last ? 'Done' : 'Next'}${last ? '' : I.chev}</a>` : ''}</nav>`);
  if (s.metro) wireMetro(s.metro);
  swipe(back, next && !last ? next : null);
  speak(say);
  if (!cough && !last) clip(`${fid}-${vid}-${i + 2}`).catch(() => { });
}

function swipe(back, next) {
  const el = app.querySelector('.art');
  if (!el) return;
  let x0 = null, y0 = null;
  el.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  el.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) location.hash = dx < 0 ? (next || location.hash) : back;
    x0 = null;
  });
}

// ---------- CPR beat: 110 pushes a minute ----------
let metro = null;
const breathsKey = mode => mode === 'adult' ? 'breaths' : 'kidBreaths';
function metroHTML(mode) {
  const word = mode === 'baby' ? 'puffs' : 'breaths';
  const breaths = store.get(breathsKey(mode), mode !== 'adult');
  return `<div class="metro">
    <button class="beat" type="button" aria-label="Start the CPR beat"><span class="pulse"></span><span class="num">Start</span><span class="hint">the beat</span></button>
    <div class="mside">
      <p class="mtime">0:00</p>
      <p class="mstate">Tap and push on every beat.</p>
      <label class="tog"><input type="checkbox" ${breaths ? 'checked' : ''}><span>${mode === 'adult' ? 'I’m trained: 2 breaths every 30 pushes' : `I know how: 2 ${word} every 30 pushes`}</span></label>
    </div>
  </div>`;
}
function click(accent) {
  try {
    ctx();
    const o = audio.createOscillator(), g = audio.createGain(), t = audio.currentTime;
    o.frequency.value = accent ? 1320 : 880;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.5, t + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
    o.connect(g).connect(audio.destination); o.start(t); o.stop(t + 0.08);
  } catch (e) { }
}
function wireMetro(mode) {
  const box = app.querySelector('.metro'), btn = box.querySelector('.beat'), num = box.querySelector('.num'), hint = box.querySelector('.hint');
  const time = box.querySelector('.mtime'), state = box.querySelector('.mstate'), tog = box.querySelector('.tog input');
  const word = mode === 'baby' ? 'puffs' : 'breaths';
  let breaths = tog.checked;
  tog.addEventListener('change', () => { breaths = tog.checked; store.set(breathsKey(mode), breaths); });
  btn.addEventListener('click', () => {
    if (metro) return stopMetro();
    let count = 0, pause = 0, lastSwitch = 0;
    const t0 = Date.now();
    metro = { box, lock: null };
    if (navigator.wakeLock) navigator.wakeLock.request('screen').then(l => { if (metro) metro.lock = l; else l.release(); }).catch(() => { });
    box.classList.add('on'); hint.textContent = 'tap to stop';
    const tick = () => {
      const secs = Math.floor((Date.now() - t0) / 1000);
      time.textContent = Math.floor(secs / 60) + ':' + String(secs % 60).padStart(2, '0');
      if (pause > 0) { pause--; if (pause === 0) { state.textContent = 'Push on every beat.'; hint.textContent = 'tap to stop'; box.classList.remove('rest'); } return; }
      count++;
      const c = breaths ? ((count - 1) % 30) + 1 : count;
      num.textContent = c;
      click(c === 1);
      if (navigator.vibrate) navigator.vibrate(25);
      box.classList.remove('hit'); void box.offsetWidth; box.classList.add('hit');
      if (breaths && c === 30) {
        pause = 9; box.classList.add('rest'); num.textContent = '2'; hint.textContent = word;
        state.textContent = `Give 2 ${word} now.`; speak('metro-' + word);
      } else if (secs - lastSwitch >= 120) {
        lastSwitch = secs;
        state.textContent = '2 minutes. Switch if someone can take over.'; speak('metro-switch');
      }
    };
    tick();
    metro.timer = setInterval(tick, 60000 / 110);
  });
}
function stopMetro() {
  if (!metro) return;
  clearInterval(metro.timer);
  if (metro.lock) metro.lock.release().catch(() => { });
  const b = metro.box;
  b.classList.remove('on', 'rest', 'hit');
  b.querySelector('.num').textContent = 'Start'; b.querySelector('.hint').textContent = 'the beat';
  metro = null;
}

// ---------- start ----------
window.addEventListener('hashchange', route);
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT') return;
  const a = app.querySelector(e.key === 'ArrowRight' ? '.nav .next' : e.key === 'ArrowLeft' ? '.nav .back' : null);
  if (a) location.hash = a.getAttribute('href');
});
// Phones only allow sound that starts from a tap, so every tap makes sure audio is awake.
['touchend', 'click'].forEach(ev => document.addEventListener(ev, () => {
  try {
    const c = ctx(), b = c.createBuffer(1, 1, 22050), s = c.createBufferSource();
    s.buffer = b; s.connect(c.destination); s.start(0);
  } catch (e) { }
}, true));
route();
if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => { });
