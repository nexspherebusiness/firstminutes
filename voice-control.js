// Talking to the app: say what is happening on the home screen, and say "next", "back", "repeat",
// "start", "stop" or "call 911" during the steps (hands free mode). Uses the phone's own speech recognition.
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const canListen = !!SR;
let handsFree = false, rec = null, lastSay = null, listenFails = 0;
const MIC = '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';
const STOPWORDS = new Set(['the', 'and', 'his', 'her', 'she', 'him', 'has', 'had', 'was', 'are', 'for', 'with', 'from', 'what', 'just', 'got', 'now', 'help', 'please', 'someone', 'somebody', 'person', 'they', 'their', 'there', 'this', 'that', 'out', 'very', 'really', 'can', 'all']);

function toast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('on');
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 3500);
}
function setListening(on) {
  document.querySelectorAll('.mic').forEach(b => b.classList.toggle('live', on));
  const pill = document.querySelector('.listening');
  if (pill) pill.hidden = !on;
}
function stopListening() {
  if (!rec) return;
  const r = rec; rec = null;
  r.onend = r.onresult = r.onerror = null;
  try { r.abort(); } catch (e) { }
  setListening(false);
}
function listen(onText, onEnd) {
  if (!canListen) return false;
  stopListening();
  const r = new SR();
  r.lang = 'en-US'; r.interimResults = false; r.maxAlternatives = 4; r.continuous = false;
  let heard = false;
  r.onresult = e => { heard = true; listenFails = 0; onText([...e.results[0]].map(a => a.transcript.toLowerCase().trim())); };
  r.onerror = e => {
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { handsFree = false; store.set('handsFree', false); toast('The microphone is blocked. Allow it in your browser settings, or just tap.'); refreshMicButtons(); }
    else if (e.error === 'network') toast('Voice needs an internet connection. Tap the screen instead.');
  };
  r.onend = () => { if (rec === r) { rec = null; setListening(false); } if (!heard) listenFails++; if (onEnd) onEnd(heard); };
  try { r.start(); rec = r; setListening(true); return true; } catch (e) { return false; }
}

// ---------- home: say what is happening ----------
function pickFlow(alts) {
  for (const t of alts) {
    const words = t.replace(/[^a-z\s']/g, ' ').split(/\s+/).filter(w => w.length > 2 && !STOPWORDS.has(w));
    // A word shared by several emergencies counts less ("fell"); ties go to the title match, then to the more urgent one.
    const ids = ORDER.filter(id => FLOWS[id]);
    const hays = ids.map(id => (FLOWS[id].title + ' ' + FLOWS[id].keys).toLowerCase().replace(/’/g, '\'').split(/\s+/));
    const hit = (hay, w) => hay.some(h => h === w || (w.length > 4 && h.startsWith(w.slice(0, -1))));
    const weight = w => 1 / Math.max(1, hays.filter(h => hit(h, w)).length);
    const scored = ids.map((id, rank) => {
      const title = FLOWS[id].title.toLowerCase(), hay = hays[rank].join(' ');
      let n = words.filter(w => hit(hays[rank], w)).reduce((sum, w) => sum + weight(w), 0);
      if (hay.includes(words.join(' ')) && words.length > 1) n += 2;
      if (words.some(w => title.split(/\s+/).includes(w))) n += 0.5;
      return [id, n, rank];
    }).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1] || a[2] - b[2]);
    if (!scored.length) continue;
    const id = scored[0][0], f = FLOWS[id];
    let v = '';
    if (f.who) {
      if (/\b(baby|infant|newborn)\b/.test(t) && f.baby) v = 'baby';
      else if (/\b(child|kid|son|daughter|toddler|boy|girl|grandson|granddaughter)\b/.test(t)) v = f.child ? 'child' : (f.adult ? 'adult' : '');
      else if (/\b(adult|man|woman|husband|wife|mom|dad|mother|father|grandma|grandpa|grandmother|grandfather)\b/.test(t) && f.adult) v = 'adult';
    }
    return '#/f/' + id + (v ? '/' + v : '');
  }
  return null;
}
function voiceSearch() {
  stopSpeak();
  const ok = listen(alts => {
    const q = app.querySelector('#q');
    if (q) { q.value = alts[0]; q.dispatchEvent(new Event('input')); }
    const go = pickFlow(alts);
    if (go) location.hash = go;
  }, heard => { if (!heard) toast('I didn’t catch that. Tap the mic and try again, or tap the emergency.'); });
  if (!ok) toast('Voice isn’t available in this browser. Tap the emergency instead.');
}

// ---------- steps: hands free ----------
function stepCommand(alts) {
  const t = ' ' + alts.join(' | ') + ' ';
  const tap = sel => { const el = app.querySelector(sel); if (el) { el.click(); return true; } return false; };
  if (/\b(call|nine one one|911|ambulance)\b/.test(t)) { location.href = 'tel:911'; return true; }
  if (/\b(stop|pause)\b/.test(t) && metro) { stopMetro(); return true; }
  if (/\b(stop|it stopped|stopped)\b/.test(t) && seizureCommand('stop')) return true;
  if (/\b(start|begin|timer)\b/.test(t) && seizureCommand('start')) return true;
  if (/\b(start|begin|beat)\b/.test(t) && !metro && tap('.beat')) return true;
  if (/\b(repeat|again|what|huh|sorry)\b/.test(t)) { speak(lastSay); return true; }
  if (/\b(back|previous)\b/.test(t)) return tap('.nav .back');
  if (/\b(home|menu)\b/.test(t)) { location.hash = '#/'; return true; }
  if (/\b(baby|infant)\b/.test(t)) return tap('.whob[href$="/baby"]');
  if (/\b(child|kid)\b/.test(t)) return tap('.whob[href$="/child"]') || tap('.whob[href$="/adult"]');
  if (/\b(adult|grown|man|woman)\b/.test(t)) return tap('.whob[href$="/adult"]');
  if (app.querySelector('.ans')) {
    if (/\b(no|not|can't|cannot|can not|weak)\b/.test(t)) return tap('.ans.no');
    if (/\b(yes|yeah|coughing|cough)\b/.test(t)) return tap('.ans.yes');
  }
  if (/\b(next|done|okay|ok|continue|ready|go on|got it)\b/.test(t)) return tap('.nav .next') || tap('.cta');
  return false;
}
function onStepScreen() { return /^#\/f\//.test(location.hash); }
function stepListen() {
  if (!handsFree || !canListen || !onStepScreen() || rec || voicePlaying()) return;
  if (listenFails > 40) return;
  const here = location.hash;
  listen(alts => { if (!stepCommand(alts)) toast('Say next, back, repeat, start, stop or call 911.'); },
    () => setTimeout(() => { if (location.hash === here || onStepScreen()) stepListen(); }, 350));
}
function refreshMicButtons() {
  document.querySelectorAll('.mic.hf').forEach(b => { b.setAttribute('aria-pressed', handsFree); b.classList.toggle('onhf', handsFree); });
}
function toggleHandsFree() {
  handsFree = !handsFree; store.set('handsFree', handsFree); refreshMicButtons();
  if (handsFree) { listenFails = 0; toast('Hands free on. Say next, back, repeat, start, stop or call 911.'); stepListen(); }
  else stopListening();
}
