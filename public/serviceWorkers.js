var CACHE_NAME = 'my-app-cache-v1'
var filesToCache = [
  '/manifest.json ',
  '/index.html',
  '/main.js',
  '/src/styles/style.css',
  '/public/src/assets/icons/icon-144x144.png',
  '/public/src/assets/icons/icon-192x192.png',
  '/public/src/assets/sounds/stop.mp3',
  '/public/src/assets/sounds/worktime.mp3'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      try {
        cache_obj = await caches.open(cache)
        cache_obj.addAll(filesToCache)
      }
      catch {
        console.log("error occured while caching...", console.error())
      }
    })()
  )
});

self.addEventListener('fetch', function (event) {
  console.log('service worker - fetching', event);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  )
});
