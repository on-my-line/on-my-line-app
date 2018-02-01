let cacheName = "MyLine"
let dataCacheName = "secondLine"
let Lines = ["1", "2", "3", "4", "5", "6", "7", "A", "C", "E", "F", "G", "M", "N", "Q", "R", "J", "Z", "L", "S"]

self.addEventListener("install", function(event) {
	//console.log("[serviceWorker] Install");
	//only in production to we want to Install base cache
	// event.waitUntil(
	// 	//opens up the cache and passes all cachename files to cache (urls)
	// 	caches.open(cacheName).then(function(cache) {
	// 		console.log("[serviceWorker] Caching app shell");
	// 		//.addAll is all or nothing (if one file fails, they all fail)
	// 		return cache.addAll([
	// 			'/index.html',
	// 			'/images/icon-48.png',
	// 			'/images/icon-128.png',
	// 			'/images/icon-144.png',
	// 			'/images/icon-152.png',
	// 			'/images/icon-192.png',
	// 			'/style.css'
	// 		]);
	// 	})
	// );
});

self.addEventListener("activate", function(event) {
	//console.log("[serviceWorker] Activate")
	//service worker updates cache whenever any app shell files change (ie user preferences, not the data)
	//when app is complete, this fixes corner case (where app isnt returning latest data) - not necessary, just lets you activate service worker faster
});

self.addEventListener("fetch", function(event) {
	// later: lets add some logic to put all initial fetches in the same place (if undefined or / put it in the index)
	let currentLine = event.request.referrer.slice(event.request.referrer.lastIndexOf("/") + 1) || "Index";
	
	var fetchRequest = event.request.clone()
	//event.request.headers.set("Cache-Control", "no-store")
	//fetchRequest.headers.set("Cache-Control", "no-store")
	//console.log("Event object:", event);
	// it will still always fetch the bundle, css, and index b/c in the index html they are fetched?
	event.respondWith(
		
		caches.match(event.request).then(function(response) {
			// Cache hit - return response
			//console.log("[ServiceWorker] Fetch START", event.request.url)
			
			if (response) {
                //console.log("response FROM the cache", response)
				return response
			}

			
			//if the cache falls through, fetch the request from the network
			return fetch(fetchRequest).then(function(response) {
             //if the response is janky, dont add it to the cache  
			if (!response || response.status !== 200 || response.type !== "basic") {
                //console.log("fetched response is janky?", response);
				return response
			}
			let responseToCache = response.clone()
			//console.log("Response to cache clone", responseToCache )
			//serviceWorkers.js:62 Uncaught (in promise) TypeError: Failed to execute 'set' on 'Headers': Headers are immutable
			//responseToCache.headers.set('Cache-Control', 'no-store')
			caches.open(currentLine).then(function(cache) {
				//console.log(`response to ${event.request} fetched and SAVED TO cache`)
				cache.put(event.request, responseToCache)
				})

			})
			//no matter what return the response - if its from either the cache OR the fetch (doesnt matter) return it
			return response
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
