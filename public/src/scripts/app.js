if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceWorker.js')
      .then(function (reg) {
        console.log(`Service Worker Registered. Scope: ${reg.scope}`);
      });
  }
  