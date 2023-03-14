const responseStream = require("union/lib/response-stream");

self.addEventListener('install', function(event) {
    console.log('service worker - installing', event);
    event.waitUntil(
        caches.open('static').then(function(cache) {
            console.log('precacheamento');
            cache.addAll([
              'manifest.json',
              'index.html',
              'scripts/main.js',
              'styles/style.css',
              'scripts/app.js',
              'scripts/main.js',
              'src/assets/icons/icon-144x144.png',
              'src/assets/icons/icon-192x192.png',
              'src/assets/icons/icon-512x512.png'
            ])
        })
    )
  });
  
  self.addEventListener('activate', function(event){
    console.log('service worker - activating', event);
  });
  
  self.addEventListener('fetch', function(event){
    console.log('service worker - fetching', event);
    event.respondWith(
      caches.match(event.request)
      .then(function(){
        if (respose) {
          return responseStream;
        } else {
          return fetch(event.request)
        }
      })
    )
  });
  