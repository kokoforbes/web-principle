const CACHE_NAME = "web-resume-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/index.js",
  "/personal-logo.svg",
  // Add other assets to cache
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
