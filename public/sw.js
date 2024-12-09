const CACHE_NAME = "web-resume-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/experience.html",
  "/testimonials.html",
  "/contact.html",
  "/styles.css",
  "/index.js",
  "/images/abdullahi.webp",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
