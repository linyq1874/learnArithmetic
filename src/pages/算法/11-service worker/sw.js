self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('my-cache')
    .then(cache => cache.addAll(['./index.html', './sw.js']))
  )
})

self.addEventListener('fetch', e => {
  e.responseWith(
    caches.match(e.request)
    .then(res => {
      if (res) {
        return res;
      }
      console.log('fetch source');

    })
  )
})
