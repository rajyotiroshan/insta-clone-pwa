var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
var sharedMomentsArea = document.querySelector("#shared-moments");
function openCreatePostModal() {
  createPostArea.style.display = 'block';
  if(window.deferredPrompt) {//deferredPrompt is set.
    //show the banner.
    window.deferredPrompt.prompt();
    //listen for user choice
    //whether the user install it to the homescreen or not.
    window.deferredPrompt.userChoice.then((choiceResult)=>{
      console.log(choiceResult.outcome);

      if(choiceResult.outcome === "dismissed") {
        console.log("User canceled installation");
      }else {
        console.log("User installed to the home screen ");
      }
    });
    window.deferredPrompt = nul;

  }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

//
/* onSaveButtonClick = (event)=>{
  console.log("click");
  if('caches' in window){
    caches.open("user-requested")
    .then((cache)=>{
      cache.add('https://httpbin.org/get');
      cache.add('/src/images/sf-boat.jpg');
    });
  }
} */

function createCard() {
  var cardWrapper = document.createElement('div');
  cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';
  var cardTitle = document.createElement('div');
  cardTitle.className = 'mdl-card__title';
  cardTitle.style.backgroundImage = 'url("/src/images/sf-boat.jpg")';
  cardTitle.style.backgroundSize = 'cover';
  cardTitle.style.height = '180px';
  cardWrapper.appendChild(cardTitle);
  var cardTitleTextElement = document.createElement('h2');
  cardTitleTextElement.style.color = "black";
  cardTitleTextElement.className = 'mdl-card__title-text';
  cardTitleTextElement.textContent = 'San Francisco Trip';
  cardTitle.appendChild(cardTitleTextElement);
  var cardSupportingText = document.createElement('div');
  cardSupportingText.className = 'mdl-card__supporting-text';
  cardSupportingText.textContent = 'In San Francisco';
  cardSupportingText.style.textAlign = 'center';
/*   var cardSaveButton = document.createElement("button");
  cardSaveButton.textContent = "Save";
  cardSaveButton.style.padding = "5px 10px";
  cardSaveButton.style.fontSize  = "1.2rem";
  cardSaveButton.addEventListener("click", onSaveButtonClick);
  cardSupportingText.appendChild(cardSaveButton); */
  cardWrapper.appendChild(cardSupportingText);
  componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}

fetch('https://httpbin.org/get')
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    createCard();
  });