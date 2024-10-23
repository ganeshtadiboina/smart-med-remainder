const CACHE_NAME = "med-reminder-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/styles.css",
    "/script.js",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
];

// Install the service worker and cache all necessary files
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

// Serve cached content when offline
self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

// Handle push notifications
self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : { title: 'Medication Reminder', body: 'You have a medication to take!' };
    const options = {
        body: data.body,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-512x512.png'
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});