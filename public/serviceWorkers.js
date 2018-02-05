let cacheName = "MyLine"
let dataCacheName = "secondLine"
let Lines = ["1", "2", "3", "4", "5", "6", "7", "A", "C", "E", "F", "G", "M", "N", "Q", "R", "J", "Z", "L", "S"]

self.addEventListener("install", function(event) {
	console.log("[serviceWorker] Install");
	//only in production to we want to Install base cache
	event.waitUntil(
		//opens up the cache and passes all cachename files to cache (urls)
		caches.open(cacheName).then(function(cache) {
			console.log("[serviceWorker] Caching app shell");
			//.addAll is all or nothing (if one file fails, they all fail)
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
				'/style.css',
				'/bundle.js'
			]);
		})
	);
});

self.addEventListener("activate", function(event) {
	console.log("[serviceWorker] Activate")
	//service worker updates cache whenever any app shell files change (ie user preferences, not the data)
	//when app is complete, this fixes corner case (where app isnt returning latest data) - not necessary, just lets you activate service worker faster
});


self.addEventListener("fetch", function(event) {
	// later: lets add some logic to put all initial fetches in the same place (if undefined or / put it in the index)
	let currentLine = event.request.referrer.slice(event.request.referrer.lastIndexOf("/") + 1) || "Index";
	
	//let fetchRequest = event.request.clone()
	//console.log("Event object:", event);
	// it will still always fetch the bundle, css, and index b/c in the index html they are fetched?
	//console.log("WTF is the event???", event.request)
	event.respondWith(
		caches.match(event.request).then(function(response) {
			// Cache hit - return response
			//console.log("[ServiceWorker] Fetch START", event.request.url)
			
			if (response) {
                //console.log("response FROM the cache", response)
				return response
			} else {

			// caches.open(currentLine).then(function(cache) {
			// 	cache.add(event.request).then(function(thing){
			// 		console.log("we in da cash", thing)
			// 	})
			// 	.catch(err => console.error(err))
			// })
			//if the cache falls through, fetch the request from the network
	
			return fetch(event.request)
				.then(function(fetchRes) {
					//if the response is janky, dont add it to the cache
					if (!fetchRes || fetchRes.status !== 200 || fetchRes.type !== "basic") {
						//console.log("fetched response is janky?", fetchRes);
						return fetchRes;
					}

					let responseToCache = fetchRes.clone();
					//console.log("Response to cache clone", responseToCache )
					//serviceWorkers.js:62 Uncaught (in promise) TypeError: Failed to execute 'set' on 'Headers': Headers are immutable
					//responseToCache.headers.set('Cache-Control', 'no-store')
					return caches.open(currentLine).then(function(cache) {
						//console.log("response to fetched and SAVED TO cache: ", fetchRequest)
						cache.put(event.request, fetchRes.clone());
						return fetchRes;
					});
				})
				// .catch(() =>
				// 	caches.match("http://null:null@localhost:1337/nyc-streets.json")
				// )
				.catch(() =>
					caches.match("http://localhost:1337/nyc-streets.json")
				)
				.catch((err) => console.error(err))
			//no matter what return the response - if its from either the cache OR the fetch (doesnt matter) return it
			//return response
			}
		})
	)
});


/*what is getting stored in the cache: 
index, current line(current routes/current stops), things @ stop by stop id
*/


//ALL BAD THINGS BELOW: DO NOT UNCOMMENT EVER (but also do not delete for now)
// self.addEventListener("fetch", function(event) {
// 	let currentLine = event.request.referrer[event.request.referrer.length - 1];
// 	console.log("currentLine", currentLine)
// 	console.log("typeof", (typeof currentLine))
// 	caches.keys().then(cachenames => cachenames.forEach(cachename => {
// 		if (cachename === currentLine) {
// 			console.log("ITS MY LINEEEEEEEE") 
// 			event.respondWith(
		
// 			caches.match(event.request).then(function(response) {
// 			// Cache hit - return response

// 				console.log("RESPONSE", response);
// 				return response;
// 			}
// 			))
// 		} else if (cachename === "MyLine") {
// 			console.log("we reached MYLINE")	
// 		} else {
// 			caches.delete(cachename)
// 			var fetchRequest = event.request.clone();

// 			return fetch(fetchRequest).then(function(response) {
// 				// Check if we received a valid response

// 				if (!response || response.status !== 200 || response.type !== "basic") {
// 					console.log("fetched response", response);
// 					return response;
// 				}

// 				// IMPORTANT: Clone the response. A response is a stream
// 				// and because we want the browser to consume the response
// 				// as well as the cache consuming the response, we need
// 				// to clone it so we have two streams.
// 				var responseToCache = response.clone();

// 				caches
// 					.open(
// 						event.request.referrer[event.request.referrer.length - 1]
// 					)
// 					.then(function(cache) {
// 						console.log(`putting fetched ${event.request.url} in the cache`)
// 						console.log("WHERE ARE WEEE", currentLine);
// 						cache.put(event.request.url, responseToCache);
// 					});

// 				return response;

// 		}
// 	}
// 	))
	
// 	event.respondWith(
		
// 		caches.match(event.request).then(function(response) {
// 			// Cache hit - return response
// 			if (response) {
// 				console.log("RESPONSE", response);
// 				return response;
// 			} 
// 			// IMPORTANT: Clone the request. A request is a stream and
// 			// can only be consumed once. Since we are consuming this
// 			// once by cache and once by the browser for fetch, we need
// 			// to clone the response.
// 			var fetchRequest = event.request.clone();

// 			return fetch(fetchRequest).then(function(response) {
// 				// Check if we received a valid response

// 				if (!response || response.status !== 200 || response.type !== "basic") {
// 					console.log("fetched response", response);
// 					return response;
// 				}

// 				// IMPORTANT: Clone the response. A response is a stream
// 				// and because we want the browser to consume the response
// 				// as well as the cache consuming the response, we need
// 				// to clone it so we have two streams.
// 				var responseToCache = response.clone();

// 				caches
// 					.open(
// 						event.request.referrer[event.request.referrer.length - 1]
// 					)
// 					.then(function(cache) {
// 						console.log(`putting fetched ${event.request.url} in the cache`)
// 						console.log("WHERE ARE WEEE", currentLine);
// 						cache.put(event.request.url, responseToCache);
// 					});

// 				return response;
				
// 			});
// 		})
// 	);

// })
// });
