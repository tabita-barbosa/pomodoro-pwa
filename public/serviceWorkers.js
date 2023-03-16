var DYNAMIC = 'static-73'
var STATIC_CACHE = 'dynamic';
var STATIC_FILES = [
  '/manifest.json ',
  '/index.html',
  '/main.js',
  'src/styles/style.css',
  'src/assets/icons/icon-144x144.png',
  'src/assets/icons/icon-192x192.png',
  'src/assets/icons/icon-512x512.png',
  'src/assets/sounds/stop.mp3',
  'src/assets/sounds/worktime.mp3'
]

self.addEventListener('install', function (event) {
  console.log('service worker - installing', event);
  event.waitUntil(
    caches.open('static').then(function (cache) {
      console.log('precacheamento');
      cache.addAll(STATIC_FILES)
    })
  )
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        var promises = keyList.map(function (key) {
          if ((key !== STATIC_CACHE) && (key !== DYNAMIC_CACHE)) {
            return caches.delete(key);
          }
        })
        return Promise.all(promises);
      })
  )
  console.log('service worker - activating', event);
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
