//registering service workers
//here because it is included in both the help index.html and main index.html
//check if service worker exist in the browser.
if("serviceWorker" in navigator) {
  //navigator ~~ browser.
  //registration is asynchronous process.
  //returns a promise.
  //register takes two args.
  navigator.serviceWorker
    .register('/sw.js', {scope: '/help/'})
    .then(function(){
      console.log("Service worker is registered");
    });

}