let cacheName = "MyLine"
let dataCacheName = "secondLine"
let Lines = ["1", "2", "3", "4", "5", "6", "7", "A", "C", "E", "F", "G", "M", "N", "Q", "R", "J", "Z", "L", "S"]

self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open(cacheName).then(function(cache) {
			return cache.addAll([
				'/index.html',
				'/images/event-hover.svg',
				'/images/event.svg',
				'/images/happy.svg',
				'/images/happy2.jpg',
				'/images/location.svg',
				'/images/place-yellow.svg',
				'/images/place.svg',
				'/nyc-streets.json',
				'/images/restaurant_white.svg',
				'/images/restaurant_white.png',
				'/images/icon-48.png',
				'/images/icon-120.png',
				'/images/icon-128.png',
				'/images/icon-144.png',
				'/images/icon-152.png',
				'/images/icon-192.png',
				'/style.css',
				'/bundle.js'
			]);
		})
	);
});

self.addEventListener("activate", function(event) {});


self.addEventListener("fetch", function(event) {
	let currentLine = event.request.referrer.slice(event.request.referrer.lastIndexOf("/") + 1) || "Index";

	event.respondWith(
		caches.match(event.request).then(function(response) {

			if (response) {
				return response
			} else {
	
			return fetch(event.request)
				.then(function(fetchRes) {
					if (!fetchRes || fetchRes.status !== 200 || fetchRes.type !== "basic") {
						return fetchRes;
					}

					let responseToCache = fetchRes.clone();
					return caches.open(currentLine).then(function(cache) {
						cache.put(event.request, fetchRes.clone());
						return fetchRes;
					});
				})
				.catch(() =>
					caches.match("http://localhost:1337/nyc-streets.json")
				)
				.catch((err) => console.error(err))

			}
		})
	)
});