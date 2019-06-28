var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');

function openCreatePostModal() {
  createPostArea.style.display = 'block';
  if(deferedPrompt) {//deferredPrompt is set.
    //show the banner.
    deferedPrompt.prompt();
    //listen for user choice
    //whether the user install it to the homescreen or not.
    deferedPrompt.userChoice.then((choiceResult)=>{
      console.log(choiceResult.outcome);

      if(choiceResult.outcome === "dismissed") {
        console.log("User canceled installation");
      }else {
        console.log("User installed to the home screen ");
      }
    });
    deferedPrompt = nul;

  }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);
