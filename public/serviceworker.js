const FONTS = [
  'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLDz8Z1JlFd2JQEl8qw.woff2',
  'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLDz8Z1xlFd2JQEk.woff2',
  'https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJnecnFHGPezSQ.woff2',
  'https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2',
  'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLCz7Z1JlFd2JQEl8qw.woff2',
  'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLCz7Z1xlFd2JQEk.woff2',
  'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLBT5Z1JlFd2JQEl8qw.woff2',
  'https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLBT5Z1xlFd2JQEk.woff2',
];

const STATIC_ASSETS = [...FONTS, '/init-sw.js', '/favicon.ico'];

const CACHE_NAME = {
  ASSETS: 'assets-v2',
};

const offlineResponse = () => new Response('Offline', { status: 503 });

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME.ASSETS).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME.ASSETS)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Navigation requests get a simple offline fallback.
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => offlineResponse()));
    return;
  }

  // Subresource requests must also resolve to a Response object.
  // If network fails, return cache when possible and never reject.
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).catch(() => offlineResponse());
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
