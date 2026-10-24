// Keeps First Minutes working with no signal: serve from cache, refresh in the background.
const CACHE = 'fm-v2';
const FILES = ['./', 'index.html', 'art.js', 'art-baby.js', 'content.js', 'app.js', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png',
  'audio/bleeding-all-1.mp3', 'audio/bleeding-all-2.mp3', 'audio/bleeding-all-3.mp3', 'audio/bleeding-all-4.mp3', 'audio/bleeding-all-5.mp3', 'audio/check-choking-adult.mp3', 'audio/check-choking-baby.mp3', 'audio/choking-adult-1.mp3', 'audio/choking-adult-2.mp3', 'audio/choking-adult-3.mp3', 'audio/choking-adult-4.mp3', 'audio/choking-adult-5.mp3', 'audio/choking-baby-1.mp3', 'audio/choking-baby-2.mp3', 'audio/choking-baby-3.mp3', 'audio/choking-baby-4.mp3', 'audio/cough-choking-adult.mp3', 'audio/cough-choking-baby.mp3', 'audio/cpr-adult-1.mp3', 'audio/cpr-adult-2.mp3', 'audio/cpr-adult-3.mp3', 'audio/cpr-adult-4.mp3', 'audio/cpr-adult-5.mp3', 'audio/cpr-adult-6.mp3', 'audio/cpr-adult-7.mp3', 'audio/cpr-baby-1.mp3', 'audio/cpr-baby-2.mp3', 'audio/cpr-baby-3.mp3', 'audio/cpr-baby-4.mp3', 'audio/cpr-baby-5.mp3', 'audio/cpr-breathing-1.mp3', 'audio/cpr-child-1.mp3', 'audio/cpr-child-2.mp3', 'audio/cpr-child-3.mp3', 'audio/cpr-child-4.mp3', 'audio/cpr-child-5.mp3', 'audio/cpr-child-6.mp3', 'audio/metro-breaths.mp3', 'audio/metro-puffs.mp3', 'audio/metro-switch.mp3', 'audio/who-choking.mp3', 'audio/who-cpr.mp3'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(e.request, { ignoreSearch: true });
    const net = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  }));
});
