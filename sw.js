// Keeps First Minutes working with no signal: serve from cache, refresh in the background.
const CACHE = 'fm-v3';
const FILES = ['./', 'index.html', 'art.js', 'art-baby.js', 'content.js', 'app.js', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png',
  'voice/bleeding-all-1.mp3', 'voice/bleeding-all-2.mp3', 'voice/bleeding-all-3.mp3', 'voice/bleeding-all-4.mp3', 'voice/bleeding-all-5.mp3', 'voice/check-choking-adult.mp3', 'voice/check-choking-baby.mp3', 'voice/choking-adult-1.mp3', 'voice/choking-adult-2.mp3', 'voice/choking-adult-3.mp3', 'voice/choking-adult-4.mp3', 'voice/choking-adult-5.mp3', 'voice/choking-baby-1.mp3', 'voice/choking-baby-2.mp3', 'voice/choking-baby-3.mp3', 'voice/choking-baby-4.mp3', 'voice/cough-choking-adult.mp3', 'voice/cough-choking-baby.mp3', 'voice/cpr-adult-1.mp3', 'voice/cpr-adult-2.mp3', 'voice/cpr-adult-3.mp3', 'voice/cpr-adult-4.mp3', 'voice/cpr-adult-5.mp3', 'voice/cpr-adult-6.mp3', 'voice/cpr-adult-7.mp3', 'voice/cpr-baby-1.mp3', 'voice/cpr-baby-2.mp3', 'voice/cpr-baby-3.mp3', 'voice/cpr-baby-4.mp3', 'voice/cpr-baby-5.mp3', 'voice/cpr-breathing-1.mp3', 'voice/cpr-child-1.mp3', 'voice/cpr-child-2.mp3', 'voice/cpr-child-3.mp3', 'voice/cpr-child-4.mp3', 'voice/cpr-child-5.mp3', 'voice/cpr-child-6.mp3', 'voice/metro-breaths.mp3', 'voice/metro-puffs.mp3', 'voice/metro-switch.mp3', 'voice/who-choking.mp3', 'voice/who-cpr.mp3'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  const fresh = !/\.(mp3|png|svg)$/.test(url.pathname);
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(e.request, { ignoreSearch: true });
    const net = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; });
    if (fresh) return net.catch(() => hit);
    return hit || net;
  }));
});
