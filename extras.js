// My Family, First Aid Kit, Learn (quiz and certificate) and the printable cards.
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ICO = {
  bolt: '<svg viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z" fill="currentColor"/></svg>',
  family: '<svg viewBox="0 0 24 24"><circle cx="8" cy="7" r="3" fill="currentColor"/><circle cx="17" cy="9" r="2.4" fill="currentColor"/><path d="M2 20c0-4 3-7 6-7s6 3 6 7zm11.5 0c.3-2.6 1.6-5 3.5-5 2.3 0 4 2.3 4 5z" fill="currentColor"/></svg>',
  kit: '<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="3" fill="currentColor"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M11 10h2v3h3v2h-3v3h-2v-3H8v-2h3z" fill="#fff"/></svg>',
  learn: '<svg viewBox="0 0 24 24"><path d="M12 3 1 9l11 6 9-4.9V17h2V9z" fill="currentColor"/><path d="M5 13v4c2 2 4.5 3 7 3s5-1 7-3v-4l-7 3.8z" fill="currentColor"/></svg>',
  print: '<svg viewBox="0 0 24 24"><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
};

function tabbar(active) {
  const t = (id, href, label, icon) => `<a class="tab${active === id ? ' on' : ''}" href="${href}">${icon}<span>${label}</span></a>`;
  return `<nav class="tabbar">${t('sos', '#/', 'Emergency', ICO.bolt)}${t('family', '#/family', 'My Family', ICO.family)}${t('kit', '#/kit', 'First Aid Kit', ICO.kit)}${t('learn', '#/learn', 'Learn', ICO.learn)}</nav>`;
}
function page(title, sub, body, active) {
  document.title = title + ' · First Minutes';
  app.innerHTML = `<div class="home tabbed"><header class="top"><div class="brand">${LOGO}<span>${title}</span></div><a class="call mini" href="tel:911" aria-label="Call 911">${I.phone}<span>911</span></a></header>${sub ? `<p class="lead">${sub}</p>` : ''}${body}</div>${tabbar(active)}`;
  window.scrollTo(0, 0);
}

// ---------- My Family (bonus: Family Emergency Card, Babysitter and Grandparent cards) ----------
const FAM_DEFAULT = { address: '', homePhone: '', members: [], contacts: [{ name: '', relation: '', phone: '' }, { name: '', relation: '', phone: '' }], doctor: '', doctorPhone: '', kitWhere: '', medsWhere: '', notes: '' };
const fam = () => Object.assign({}, FAM_DEFAULT, store.get('family', {}));
const saveFam = f => store.set('family', f);

function family() {
  const f = fam();
  const field = (key, label, ph, type = 'text') => `<label class="fld"><span>${label}</span><input data-k="${key}" type="${type}" value="${esc(f[key])}" placeholder="${ph}" autocomplete="off"></label>`;
  const member = (m, i) => `<div class="card member" data-i="${i}">
      <div class="row"><input data-m="name" value="${esc(m.name)}" placeholder="Name" class="big"><input data-m="born" value="${esc(m.born)}" placeholder="Age or birthday" class="small"></div>
      <label class="fld"><span>Allergies</span><input data-m="allergies" value="${esc(m.allergies)}" placeholder="Peanuts, penicillin, bee stings... or none"></label>
      <label class="fld"><span>Medicines</span><input data-m="meds" value="${esc(m.meds)}" placeholder="Name and dose"></label>
      <label class="fld"><span>Health conditions</span><input data-m="conditions" value="${esc(m.conditions)}" placeholder="Asthma, diabetes, heart, seizures..."></label>
      <button class="ghost del" type="button" data-del="${i}">${ICO.trash}Remove</button>
    </div>`;
  page('My Family', 'Fill this in once. It stays only on this phone. Print it for the fridge, your wallet and anyone who watches the kids.', `
    <section class="cards3">
      <a class="pcard" href="#/print/fridge">${ICO.print}<b>Fridge card</b><small>For the whole family</small></a>
      <a class="pcard" href="#/print/wallet">${ICO.print}<b>Wallet card</b><small>Cut and fold</small></a>
      <a class="pcard" href="#/print/sitter">${ICO.print}<b>Babysitter sheet</b><small>For sitters and grandparents</small></a>
    </section>
    <h2 class="label">Home</h2>
    <div class="card">${field('address', 'Home address (what you say to 911)', '123 Oak Street, Springfield')}${field('homePhone', 'Home phone', '(555) 123 4567', 'tel')}</div>
    <h2 class="label">People in the family</h2>
    <div id="members">${f.members.map(member).join('')}</div>
    <button class="add" type="button" id="addm">${ICO.plus}Add a person</button>
    <h2 class="label">Emergency contacts</h2>
    <div class="card">${f.contacts.map((c, i) => `<div class="row"><input data-c="${i}" data-ck="name" value="${esc(c.name)}" placeholder="Name"><input data-c="${i}" data-ck="relation" value="${esc(c.relation)}" placeholder="Relation" class="small"></div><input data-c="${i}" data-ck="phone" type="tel" value="${esc(c.phone)}" placeholder="Phone" class="full">`).join('<hr>')}</div>
    <h2 class="label">Doctor and where things are</h2>
    <div class="card">${field('doctor', 'Doctor or pediatrician', 'Dr. Smith')}${field('doctorPhone', 'Doctor’s phone', '(555) 987 6543', 'tel')}${field('kitWhere', 'First aid kit is', 'Hall closet, top shelf')}${field('medsWhere', 'Medicines are', 'Kitchen cabinet above the fridge')}${field('notes', 'Anything else', 'Spare key, pets, gate code...')}</div>
    <p class="fine">Saved automatically, only on this phone. Nothing is sent anywhere.</p>`, 'family');

  const save = () => {
    const g = fam();
    app.querySelectorAll('[data-k]').forEach(el => g[el.dataset.k] = el.value);
    g.members = [...app.querySelectorAll('.member')].map(card => { const m = {}; card.querySelectorAll('[data-m]').forEach(el => m[el.dataset.m] = el.value); return m; });
    g.contacts = g.contacts.map((c, i) => { const o = { ...c }; app.querySelectorAll(`[data-c="${i}"]`).forEach(el => o[el.dataset.ck] = el.value); return o; });
    saveFam(g);
  };
  app.querySelector('.home').addEventListener('input', save);
  app.querySelector('#addm').addEventListener('click', () => { save(); const g = fam(); g.members.push({ name: '', born: '', allergies: '', meds: '', conditions: '' }); saveFam(g); family(); setTimeout(() => { const all = app.querySelectorAll('.member input.big'); all[all.length - 1].focus(); }, 50); });
  app.querySelectorAll('[data-del]').forEach(b => b.addEventListener('click', () => { save(); const g = fam(); g.members.splice(+b.dataset.del, 1); saveFam(g); family(); }));
}

// ---------- First Aid Kit (bonus: Home Medicine Cabinet and First Aid Kit Checklist) ----------
const KIT = [
  ['First aid kit', [
    ['bandages', 'Adhesive bandages, several sizes'], ['gauze', 'Gauze pads and a gauze roll'], ['tape', 'Medical tape'], ['elastic', 'Elastic bandage (for sprains)'],
    ['gloves', 'Disposable gloves'], ['scissors', 'Scissors and tweezers'], ['coldpack', 'Instant cold packs'], ['thermometer', 'Thermometer'],
    ['shield', 'CPR face shield or mask'], ['tourniquet', 'Tourniquet (commercial, with a windlass)'], ['wrap', 'Plastic wrap (to cover burns)'], ['blanket', 'Emergency blanket'],
    ['wipes', 'Antiseptic wipes or clean water and soap'], ['flashlight', 'Flashlight with batteries']]],
  ['Medicine cabinet', [
    ['pain', 'Pain and fever medicine for adults'], ['painkids', 'Pain and fever medicine made for children (if you have kids)'], ['antihist', 'Allergy medicine (antihistamine)'],
    ['aspirin', 'Aspirin, 325 mg or 81 mg (for a possible heart attack in adults)'], ['ointment', 'Antibiotic ointment'], ['hydro', 'Hydrocortisone cream (itching, rashes)'],
    ['ors', 'Oral rehydration salts'], ['eyewash', 'Saline eye wash'], ['glucose', 'Glucose tablets (if someone has diabetes)'], ['naloxone', 'Naloxone nasal spray (sold without a prescription)']]],
  ['Personal and prescribed', [
    ['epi', 'Epinephrine auto injectors for anyone with severe allergies (2 of them)'], ['inhaler', 'Rescue inhalers and spacers for anyone with asthma'], ['list', 'A list of everyone’s medicines and allergies (see My Family)']]],
];
function kit() {
  const have = store.get('kit', {});
  const total = KIT.reduce((n, [, items]) => n + items.length, 0), done = Object.values(have).filter(Boolean).length;
  page('First Aid Kit', 'What to keep at home, so anyone can find it fast. Tick what you already have.', `
    <div class="card prog2"><b>${done} of ${total} ready</b><div class="bar"><i style="width:${Math.round(done / total * 100)}%"></i></div></div>
    ${KIT.map(([group, items]) => `<h2 class="label">${group}</h2><div class="card checks">${items.map(([id, label]) => `<label class="check"><input type="checkbox" data-id="${id}" ${have[id] ? 'checked' : ''}><span>${label}</span></label>`).join('')}</div>`).join('')}
    <h2 class="label">Keep it safe and ready</h2>
    <div class="card tips"><p>Keep the kit in one place everyone knows, up high and away from children. Keep medicines in their original boxes and follow the label or ask your pharmacist for doses.</p><p>Twice a year, check expiration dates and replace anything used. Keep a small kit in the car too.</p></div>
    <a class="cta soft" href="#/print/kit">${ICO.print}Print this checklist</a>`, 'kit');
  app.querySelectorAll('[data-id]').forEach(c => c.addEventListener('change', () => { const h = store.get('kit', {}); h[c.dataset.id] = c.checked; store.set('kit', h); kit(); }));
}

// ---------- Learn: quiz and Certificate of Completion ----------
const QUIZ = [
  ['An adult is choking and can’t cough, talk or breathe. What do you do?', ['Give them water', '5 back blows, then 5 belly thrusts, and repeat', 'Wait for it to pass'], 1, 'Alternate 5 back blows and 5 belly thrusts until it comes out or they pass out.'],
  ['A baby under 1 year is choking. What do you do?', ['Belly thrusts like an adult', 'Hold the baby upside down by the feet', '5 back blows face down, then 5 chest thrusts face up'], 2, 'Babies get back blows face down on your forearm, then chest thrusts face up.'],
  ['How fast do you push during CPR?', ['100 to 120 times a minute', 'About 60 times a minute', 'As slow as you can'], 0, 'Fast: 100 to 120 a minute. The beat in the app keeps you on rhythm.'],
  ['How deep do you push on an adult’s chest?', ['About 1 inch', 'At least 2 inches', 'Just a light press'], 1, 'At least 2 inches, and let the chest come all the way back up.'],
  ['Someone collapsed and is gasping. That means:', ['They are breathing fine', 'It’s not normal breathing: call 911 and start CPR', 'They are asleep'], 1, 'Gasping is not normal breathing. Start CPR.'],
  ['You never learned rescue breaths. An adult needs CPR. You:', ['Don’t do anything', 'Push hard and fast in the center of the chest without stopping', 'Only give breaths'], 1, 'For an adult, pushing matters most. Hands only CPR is what to do.'],
  ['Blood soaks through the cloth on a deep cut. You:', ['Lift it to look', 'Put more cloth on top and keep pressing hard', 'Wash it under the tap'], 1, 'Don’t lift. Add more cloth on top and keep pressing.'],
  ['Someone burned their hand on the stove. First:', ['Cool running water for 5 to 20 minutes', 'Butter or toothpaste', 'Ice directly on the skin'], 0, 'Cool running water, right away, for 5 to 20 minutes.'],
  ['Face drooping, a weak arm and slurred speech can mean:', ['A stroke: call 911 right away', 'They are tired', 'Low blood sugar only'], 0, 'Face, Arms, Speech: Time to call 911.'],
  ['During a seizure you should:', ['Hold them down', 'Put something in their mouth', 'Protect their head, time it, never hold them down'], 2, 'Move hard things away, cushion the head, time it. Call 911 after 5 minutes.'],
  ['A child swallowed pills from the cabinet. You:', ['Make them throw up', 'Call Poison Control at 1 800 222 1222', 'Give milk and wait'], 1, 'Call Poison Control. Don’t make them vomit.'],
  ['Someone with severe allergies has a swollen throat and has an EpiPen. You:', ['Help them use it on the outer thigh and call 911', 'Give an allergy pill and wait', 'Have them walk it off'], 0, 'Epinephrine in the outer thigh, then call 911.'],
];
const PASS = 10;
function learn() {
  const cert = store.get('cert', null);
  const order = ['cpr', 'choking', 'bleeding', 'heart', 'stroke', 'allergy', 'seizure', 'fainting', 'burns', 'poisoning', 'head', 'bone', 'drowning', 'sugar', 'asthma', 'heat', 'cold', 'electric', 'nosebleed', 'bite', 'eye'];
  page('Learn', 'Practice before you need it. Walk through any emergency calmly, then take the quiz.', `
    <div class="card certcard">${ICO.learn}<div><b>Certificate of Completion</b><small>${cert ? `Earned by ${esc(cert.name)}` : `Answer ${PASS} of ${QUIZ.length} questions right to earn it.`}</small></div></div>
    <a class="cta" href="#/quiz">${cert ? 'Take the quiz again' : 'Take the quiz'}</a>
    ${cert ? `<a class="cta soft" href="#/cert">${ICO.print}See my certificate</a>` : ''}
    <h2 class="label">Walk through each emergency</h2>
    <div class="grid2">${order.filter(id => FLOWS[id]).map(id => miniTile(id, FLOWS[id])).join('')}</div>`, 'learn');
}

function quiz() {
  let i = 0, score = 0;
  const show = () => {
    if (i >= QUIZ.length) return result();
    const [q, opts, right] = QUIZ[i];
    page('Quiz', `Question ${i + 1} of ${QUIZ.length}`, `<div class="card qcard"><h1 class="q">${q}</h1><div class="opts">${opts.map((o, k) => `<button class="opt" type="button" data-k="${k}">${o}</button>`).join('')}</div><p class="why" hidden></p></div><button class="cta next2" type="button" hidden>Next question</button>`, 'learn');
    app.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => {
      if (app.querySelector('.opt.right, .opt.wrong')) return;
      const k = +b.dataset.k;
      if (k === right) score++;
      app.querySelectorAll('.opt').forEach(x => { if (+x.dataset.k === right) x.classList.add('right'); });
      if (k !== right) b.classList.add('wrong');
      const why = app.querySelector('.why'); why.textContent = (k === right ? 'Correct. ' : 'Not quite. ') + QUIZ[i][3]; why.hidden = false;
      const nx = app.querySelector('.next2'); nx.hidden = false; nx.textContent = i === QUIZ.length - 1 ? 'See my result' : 'Next question';
    }));
    app.querySelector('.next2').addEventListener('click', () => { i++; show(); });
  };
  const result = () => {
    const pass = score >= PASS;
    page('Quiz', '', `<div class="card qcard"><h1 class="q">${score} of ${QUIZ.length} right</h1>
      <p class="d">${pass ? 'Well done. You know what to do in the first minutes. Type your name for your certificate.' : `You need ${PASS} to earn the certificate. Walk through the emergencies in Learn and try again.`}</p>
      ${pass ? `<label class="fld"><span>Your full name</span><input id="cname" value="${esc((store.get('cert', {}) || {}).name || '')}" placeholder="Mary Johnson" autocomplete="name"></label><button class="cta" type="button" id="mk">Get my certificate</button>` : `<a class="cta" href="#/quiz">Try again</a>`}</div>`, 'learn');
    if (pass) app.querySelector('#mk').addEventListener('click', () => {
      const name = app.querySelector('#cname').value.trim(); if (!name) return app.querySelector('#cname').focus();
      store.set('cert', { name, date: new Date().toISOString().slice(0, 10), score }); location.hash = '#/cert';
    });
  };
  show();
}

// ---------- printable pages ----------
function printShell(title, inner) {
  document.title = title + ' · First Minutes';
  app.innerHTML = `<div class="printwrap"><div class="pbar noprint"><a class="ib" href="javascript:history.back()" aria-label="Back">${I.home}</a><b>${title}</b><button class="cta mini" type="button" onclick="window.print()">${ICO.print}Print</button></div>${inner}<p class="fine noprint">On a phone, Print lets you save it as a PDF or send it to a printer.</p></div>`;
  window.scrollTo(0, 0);
}
const longDate = iso => new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const peopleRows = f => f.members.filter(m => m.name).map(m => `<tr><td><b>${esc(m.name)}</b>${m.born ? `<br><small>${esc(m.born)}</small>` : ''}</td><td>${esc(m.allergies) || ' '}</td><td>${esc(m.meds) || ' '}</td><td>${esc(m.conditions) || ' '}</td></tr>`).join('') || '<tr><td colspan="4"><small>Add your family in My Family.</small></td></tr>';
const contactsList = f => f.contacts.filter(c => c.name || c.phone).map(c => `<li><b>${esc(c.name)}</b>${c.relation ? ` (${esc(c.relation)})` : ''}: ${esc(c.phone)}</li>`).join('') || '<li><small>Add contacts in My Family.</small></li>';
const script911 = f => `<div class="say"><b>When you call 911, say:</b> “I need an ambulance at <u>${esc(f.address) || '_____________________'}</u>. [Name] is [what is happening].” Stay on the line and follow what they tell you.</div>`;

function printView(kind) {
  const f = fam();
  if (kind === 'kit') {
    const have = store.get('kit', {});
    return printShell('First aid kit checklist', `<div class="sheet"><h1>${LOGO} Home First Aid Kit and Medicine Cabinet</h1>${KIT.map(([g, items]) => `<h2>${g}</h2><ul class="boxes">${items.map(([id, l]) => `<li class="${have[id] ? 'ok' : ''}">${l}</li>`).join('')}</ul>`).join('')}<p class="small">Check dates twice a year. Keep medicines up high, in their original boxes. Follow the label or ask your pharmacist for doses.</p></div>`);
  }
  if (kind === 'wallet') {
    return printShell('Wallet card', `<div class="wallet"><div class="wside"><h3>${LOGO} In case of emergency</h3><p><b>Address:</b> ${esc(f.address)}</p><ul class="plain">${contactsList(f)}</ul><p><b>Doctor:</b> ${esc(f.doctor)} ${esc(f.doctorPhone)}</p></div><div class="wside"><h3>Allergies and medicines</h3><ul class="plain">${f.members.filter(m => m.name).map(m => `<li><b>${esc(m.name)}:</b> ${esc(m.allergies) || 'no known allergies'}${m.meds ? `; ${esc(m.meds)}` : ''}${m.conditions ? `; ${esc(m.conditions)}` : ''}</li>`).join('') || '<li>Add your family in My Family.</li>'}</ul><p><b>Poison Control:</b> 1 800 222 1222</p></div></div><p class="fine noprint">Cut along the outside, fold in the middle.</p>`);
  }
  const header = `<h1>${LOGO} ${kind === 'sitter' ? 'For the babysitter and grandparents' : 'Family emergency card'}</h1>
    <div class="big911"><span>Emergency:</span> <b>911</b> <span>Poison Control:</span> <b>1 800 222 1222</b></div>${script911(f)}`;
  const info = `<table class="ptable"><thead><tr><th>Name</th><th>Allergies</th><th>Medicines</th><th>Health conditions</th></tr></thead><tbody>${peopleRows(f)}</tbody></table>
    <div class="cols2"><div><h2>Emergency contacts</h2><ul class="plain">${contactsList(f)}</ul><p><b>Doctor:</b> ${esc(f.doctor)} ${esc(f.doctorPhone)}</p></div>
    <div><h2>Where things are</h2><p><b>First aid kit:</b> ${esc(f.kitWhere)}</p><p><b>Medicines:</b> ${esc(f.medsWhere)}</p><p><b>Home phone:</b> ${esc(f.homePhone)}</p>${f.notes ? `<p><b>Notes:</b> ${esc(f.notes)}</p>` : ''}</div></div>`;
  const steps = kind === 'sitter' ? `<h2>If something happens</h2><div class="cols2 quick">
      <div><h3>Choking, child over 1</h3><p>Can’t cough, talk or breathe: 5 firm back blows, then 5 belly thrusts. Repeat until it comes out. Call 911.</p></div>
      <div><h3>Choking, baby under 1</h3><p>Face down on your forearm, head low: 5 back blows. Face up: 5 chest thrusts with the heel of one hand. Repeat. Call 911.</p></div>
      <div><h3>Not breathing</h3><p>Call 911 on speaker. Push hard and fast in the center of the chest, 100 to 120 a minute. Open First Minutes for the beat.</p></div>
      <div><h3>Bleeding</h3><p>Press hard with a clean cloth and don’t lift it. Add more cloth on top. Call 911 if it won’t stop.</p></div>
      <div><h3>Burn</h3><p>Cool running water for 5 to 20 minutes. Cover loosely. No butter or ice.</p></div>
      <div><h3>Swallowed something</h3><p>Call Poison Control at 1 800 222 1222. Don’t make them vomit.</p></div></div>` : '';
  printShell(kind === 'sitter' ? 'Babysitter sheet' : 'Fridge card', `<div class="sheet">${header}${info}${steps}<p class="small">Made with First Minutes. Keep it on the fridge. Update it when medicines or numbers change.</p></div>`);
}

function certView() {
  const c = store.get('cert', null);
  if (!c) { location.replace('#/learn'); return; }
  printShell('Certificate', `<div class="cert"><div class="cert-in">${LOGO}<p class="ck">Certificate of Completion</p><p class="cs">This recognizes that</p><p class="cn">${esc(c.name)}</p>
    <p class="cs">completed the <b>First Minutes Home Emergency Course</b>, covering 21 home emergencies,<br>on ${longDate(c.date)}.</p>
    <p class="cf">First Minutes is a self study first aid guide written by a nurse, based on the 2025 American Heart Association guidelines and American Red Cross first aid. This certificate shows completion of a self study course. It is not a CPR or first aid certification.</p></div></div>`);
}
