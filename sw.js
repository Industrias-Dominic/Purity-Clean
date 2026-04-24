const CACHE_NAME = 'purity-clean-v1';
const RUNTIME_CACHE = 'purity-clean-runtime-v1';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/js/config.js',
  '/favicon.svg',
  '/robots.txt',
  '/sitemap.xml',
  '/manifest.json',
  '/offline.html',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
  '/icons/icon-512-maskable.svg'
];

const OFFLINE_PAGE = '/offline.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_URLS.filter(url => {
          return !url.includes('plausible.io') && !url.includes('googleapis.com') && !url.includes('cdnjs.cloudflare.com');
        }));
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
            })
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin !== location.origin && !url.hostname.includes('fonts.googleapis.com') && !url.hostname.includes('fonts.gstatic.com') && !url.hostname.includes('cdnjs.cloudflare.com') && !url.hostname.includes('youtube-nocookie.com')) {
    return;
  }

  if (request.method !== 'GET') {
    return;
  }

  if (url.hostname === 'plausible.io' || url.hostname === 'www.google.com' || url.hostname === 'googleadservices.com') {
    return;
  }

  if (url.hostname.includes('youtube-nocookie.com') || url.hostname.includes('youtube.com')) {
    event.respondWith(
      fetch(request)
        .catch(() => {
          return caches.match('/favicon.svg');
        })
    );
    return;
  }

  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE)
            .then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(() => {
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              if (url.pathname !== '/' && url.pathname !== '/index.html') {
                return caches.match('/index.html');
              }
              return caches.match(OFFLINE_PAGE).catch(() => {
                return new Response(
                  '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Sin conexión</title></head><body><h1>Sin conexión</h1><p>No se pudo conectar al servidor. Intenta de nuevo más tarde.</p><a href="/">Volver al inicio</a></body></html>',
                  { headers: { 'Content-Type': 'text/html' } }
                );
              });
            });
        })
    );
    return;
  }

  if (request.destination === 'style' || request.destination === 'script' || request.destination === 'font' || request.destination === 'image') {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            event.waitUntil(
              fetch(request)
                .then((networkResponse) => {
                  if (networkResponse && networkResponse.status === 200) {
                    caches.open(RUNTIME_CACHE)
                      .then((cache) => cache.put(request, networkResponse.clone()));
                  }
                })
                .catch(() => {})
            );
            return cachedResponse;
          }

          return fetch(request)
            .then((response) => {
              if (response && response.status === 200) {
                const responseClone = response.clone();
                caches.open(RUNTIME_CACHE)
                  .then((cache) => cache.put(request, responseClone));
              }
              return response;
            })
            .catch(() => {
              if (request.destination === 'image') {
                return caches.match('/favicon.svg');
              }
              if (request.destination === 'font') {
                return new Response('', { status: 200 });
              }
              return new Response('', { status: 200 });
            });
        })
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .catch(() => caches.match(request))
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
