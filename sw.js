const V='jt-shell-v1';
const SHELL=['./','./index.html','./manifest.json','./icon-180.png','./icon-192.png','./icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('jt-shell')&&k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  // map tiles: cache what you've viewed so it shows offline
  if(u.hostname.endsWith('tile.openstreetmap.org')){
    e.respondWith(caches.open('jt-tiles').then(async c=>{const hit=await c.match(r);if(hit)return hit;
      try{const res=await fetch(r);if(res.ok||res.type==='opaque')c.put(r,res.clone());return res}catch(err){return Response.error()}}));return}
  // weather + exchange rate: network first, fall back to last copy
  if(u.hostname.includes('open-meteo.com')||u.hostname.includes('er-api.com')){
    e.respondWith(fetch(r).then(res=>{const cl=res.clone();caches.open('jt-api').then(c=>c.put(r,cl));return res}).catch(()=>caches.match(r)));return}
  // the app page: network first so updates show up, offline copy otherwise
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{const cl=res.clone();caches.open(V).then(c=>c.put('./index.html',cl));return res}).catch(()=>caches.match('./index.html')));return}
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{
    if(res.ok&&(u.origin===location.origin||u.hostname==='cdnjs.cloudflare.com')){const cl=res.clone();caches.open(V).then(c=>c.put(r,cl))}return res})));
});
