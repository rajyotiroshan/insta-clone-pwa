var CACHE_STATIC_NAME = "static-v9";
var CACHE_DYNAMIC_NAME = "dynamic-v5  ";
//listen for events and react.
//self refer to the service worker
//install event is fired when browser install the new sw.
self.addEventListener("install", event => {
  console.log("Service worker installing the sw...", event);
  //wait installation until caches open
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(cache => {
      //open an existing or create new one
      //cache reference to that cache.
      //Here cache the app cell.
      //pass the url
      //path with relative to the root .
      //fetch the passed url and store th eresponse resources
      //into to
      /*       cache.addAll([
        '/',
        '/index.html',
        '/src/js/app.js',
        '/src/js/feed.js',
        '/src/js/material.min.js',
        '/src/css/app.css',
        'src/css/feed.css',
        'src/images/main-images.jpg',
        'https://fonts.googleapis.com/css?family=Roboto:400,700',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
      ]); */
      cache.add("/");
      cache.add("/index.html");
      cache.add("/src/js/app.js");
      cache.add("/src/js/feed.js");
      cache.add("/src/js/material.min.js");
      cache.add("/src/css/app.css");
      cache.add("/src/css/feed.css");
      cache.add("/offline.html");
    })
  );
});
/** */

self.addEventListener("activate", event => {
  console.log("Service worker Activating the sw...", event);
  //clean up the old cache.
  //here because new sw will be activated only when all tab are closed
  //by the user.
  //
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log("removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim(); //making sure that service worker is activated or loaded correctly.
});

/* self.addEventListener("fetch",(event)=>{
  event.respondWith(
    caches.match(event.request)
    .then((response)=>{
      if(response) return response; 
      else {
        return fetch(event.request)
              .then(function(res){
                return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache){
                  cache.put(event.request.url, res.clone());
                  return res;
                });
                //return res;
              })
              .catch((err)=>{
                 return caches.open(CACHE_STATIC_NAME)
                .then((cache)=>{
                  return cache.match('/offline.html');
                });
              }); 
      }
    })
  );
});  */

/** 
 * cache then networking, and dynamic caching.
 */
self.addEventListener("fetch",(event)=>{
  let url  = "https://httpbin.org/get";
  if(event.request.url.indexOf(url) > -1) {
    //found something.
    event.respondWith(
      caches.open(CACHE_DYNAMIC_NAME)
      .then((cache)=>{
        return fetch(event.request)
        .then((res)=>{
          cache.put(event.request, res.clone());
          return res;
        })
      })
    );
}else {
  caches.match(event.request)
  .then((response)=>{
    if(response) return response; 
    else {
      return fetch(event.request)
            .then(function(res){
              return caches.open(CACHE_DYNAMIC_NAME)
              .then(function(cache){
                cache.put(event.request.url, res.clone());
                return res;
              });
              //return res;
            })
            .catch((err)=>{
               return caches.open(CACHE_STATIC_NAME)
              .then((cache)=>{
                if(request.url.indexOf('\help')) {
                    return cache.match('/offline.html'); 
                }
               
              });
            }); 
    }
  })
}
}); 

/**
 * cache only strategy.
 */
/* self.addEventListener("fetch",(event)=>{
  event.respondWith(
    caches.match(event.request)
  );
}); */

/**
 * network only
 */

/* self.addEventListener("fetch",(event)=>{
  event.respondWith(
    fetch(event.request)
  );
}); */

/**
 * network with Cache Fallback.
 * problem in poor connection, will complete full circle then only
 * fetch from cache.
 */

/* self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
    .then((res)=>{
      return caches.open(CACHE_DYNAMIC_NAME)
      .then((cache)=>{
        cache.put(event.request.url, res.clone());
        return res;
      })

    })
    .catch((error)=>{
      return caches.match(event.request)    
    })
  );
}); */

/**
 * Cache then Network
 */

