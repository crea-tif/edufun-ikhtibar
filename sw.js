const CACHE_NAME='edufun-ikhtibar-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./assets/edufun-logo.png','./assets/edufun-bg.png'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(CACHE_NAME);await c.addAll(ASSETS);self.skipWaiting();})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)));self.clients.claim();})())});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin===location.origin){e.respondWith((async()=>{const c=await caches.open(CACHE_NAME);const m=await c.match(e.request);if(m)return m;try{const r=await fetch(e.request);c.put(e.request,r.clone());return r;}catch(err){if(e.request.mode==='navigate')return c.match('./index.html');throw err;}})())}});
