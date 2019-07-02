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

//prompt homescreen banner install 
window.addEventListener("beforeinstallprompt", (event)=>{
  event.preventDefault();//donot let chrome promt the banner by default.
  console.log("beforeinstallprompt event is fired");
  deferredPrompt = event;
  return false;//not to anything on this event.
});

