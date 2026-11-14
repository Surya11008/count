const CACHE_NAME = "counter-pwa-v1";
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
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then(res => res || caches.match("./index.html")))
  );
});
