const CACHE_NAME = "counter-pwa-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./site-pages.css",
  "./manifest.webmanifest",
  "./Images/sni-logo.png",
  "./Images/favicon-32.png",
  "./Images/pwa-icon-192.png",
  "./Images/pwa-icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      for (const url of ASSETS) {
        try {
          const res = await fetch(url, { cache: "no-cache" });
          if (res.ok) await cache.put(url, res);
        } catch(e) {}
      }
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// Network-first with cache: "no-cache" to ensure fresh updates instantly
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request, { cache: "no-cache" }).then(res => {
      if (res && res.status === 200 && res.type === 'basic') {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(event.request, resClone));
      }
      return res;
    }).catch(() => caches.match(event.request).then(res => res || caches.match("./index.html")))
  );
});
