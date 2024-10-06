const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    '/offline.html',
    '/halaman.html',
    '/style.css',
    '/patners.html',
    '/index.html',
    '/192x192.png',
    '/512x512.png',
    '/Foto1.avif',
    '/Foto2.avif',
    '/Foto3.avif',
];

// Event install untuk caching
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Event fetch untuk mengambil resource dari cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request).catch(() => {
                    return caches.match('/offline.html'); // Perbaiki path jika perlu
                });
            })
    );
});


           