//listen for events and react.
//self refer to the service worker
//install event is fired when browser install the new sw.
self.addEventListener("install", (event)=>{
  console.log("Service worker installing the sw...", event);
});

self.addEventListener("activate", (event)=>{
  console.log("Service worker Activating the sw...", event);
  return self.clients.claim();//making sure that service worker is activated or loaded correctly.
});

self.addEventListener("fetch",(event)=>{
  event.respondWith(fetch(event.request));
});


