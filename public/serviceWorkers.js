let cacheName = "MyLine"
let dataCacheName = "MyNewLine"

//files to cache
let filesToCache = [
    '/',
    '/index.html',
    '/Stops.json'
]


self.addEventListener("install", function(e) {
	console.log("[serviceWorker] Install");
	e.waitUntil(
		//opens up the cache and passes all cachename files to cache (urls)
		caches.open(cacheName).then(function(cache) {
			console.log("[serviceWorker] Caching app shell");
			//.all is all or nothing (if one file fails, they all fail)
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('activate', (e) => {
    console.log("[ServiceWorker] Activate");
    return self.clients.claim()
})

//WHY DO U DELETE EVERYTHING EVERY TIME YOU UPDATE
// self.addEventListener('fetch', function(e) {
//     console.log('[ServiceWorker] Fetch', e.request.url)
//     var dataURL = new URL(e.request.url)
//     if (e.request.url.indexOf(dataURL) > -1) {
//         e.respondWith(
//             caches.open(dataCacheName).then(function(cache) {
//                 return fetch(e.request).then(function(response) {
//                     cache.put(e.request.url, response.clone())
//                     return response
//                 })
//             })
//         )
//     } else {
//         e.respondWith(
//             caches.match(e.request).then(function(response) {
//                 return response || fetch(e.request)
//             })
//         )
//     }

// })