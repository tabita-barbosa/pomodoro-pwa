self.addEventListener('install', function(event){
  console.log('service worker - installing', event);
});

self.addEventListener('activate', function(event){
  console.log('service worker - activating', event);
});

self.addEventListener('fetch', function(event){
  console.log('service worker - fetching', event);
});

// self.addEventListener('install', e => {
//     e.waitUntil(
//       caches.open('pomodoro').then(cache => {
//         return cache.addAll([
//           '',
//           'manifest.json',
//           'index.html',
//           'scripts/main.js',
//           'styles/style.css',
//           'assets/icons/icon-144x144.png',
//           'assets/icons/icon-192x192.png',
//           'assets/icons/icon-512x512.png',
//         //   'assets/images/volume_on.svg',
//         //   'assets/images/volume_muted.svg',
//         //   'assets/media/alarm.mp3'
//         ])
//           .then(() => self.skipWaiting());
//       })
//     )
//   });
  
  // self.addEventListener('activate', event => {
  //   event.waitUntil(self.clients.claim());
  // });
  
  // self.addEventListener('fetch', event => {
  //   event.respondWith(
  //     caches.match(event.request).then(response => {
  //       return response || fetch(event.request);
  //     })
  //   );
  // });