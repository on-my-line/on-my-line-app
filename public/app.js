"use strict";
(function() {
	if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("./serviceWorkers.js").then(function() {
                console.log("Service Worker Registered");
            })
            .catch(err => console.log("service worker failed to register", err));
    }
})();
