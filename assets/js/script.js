// author: Handika Putra
// github account: https://github.com/HanPutra

// age gate
const yes = document.querySelector("#age-yes");
const no = document.querySelector("#age-no");
const ageGate = document.querySelector(".age-gate");

//while confirm yes onclick
yes.addEventListener("click", function () {
  //set opacity to 0 after 0.3s
  setTimeout(function () {
    ageGate.style.opacity = "0";
    //set display to none after 0.3s
    setTimeout(function () {
      ageGate.style.display = "none";
    }, 300); // after wait 0.3s, display will be none while opacity animated for 300ms (in css)
  }, 300); // while click, wait 0.3s then animate opacity from 1 to 0
});

// while confirm no onclick
no.addEventListener("click", function () {
  // while click and wait for 300ms, the windows is closing immediately
  setTimeout(function () {
    window.history.back(); // back to history before if windows can't close
    window.close(); //close windows
  }, 300);
});
// end of age gate

// gallery
const galleryItem = document.querySelectorAll(".gallery-item");

galleryItem.forEach((container) => {
  const image = container.querySelector("img");
  const divOverlay = document.createElement("div");
  const divImageText = document.createElement("div");
  divOverlay.classList.add("gallery-overlay");
  divImageText.classList.add("image-text");
  divImageText.innerText = image.alt;

  container.appendChild(divOverlay);
  container.appendChild(divImageText);

  container.addEventListener("mouseover", () => {
    divOverlay.style.opacity = 1;
    divImageText.style.opacity = 1;
  });
  container.addEventListener("mouseout", () => {
    divOverlay.style.opacity = 0;
    divImageText.style.opacity = 0;
  });
});
// end of gallery

// overlay
const overlay = document.querySelector("#overlay");
const closeButton = document.createElement("span");
const overlayContent = document.createElement("div");
const overlayImage = document.createElement("img");
const overlayText = document.createElement("div");
const overlayTitle = document.createElement("h2");
const overlayDesc = document.createElement("p");
const leftArrow = document.createElement("span");
const rightArrow = document.createElement("span");

overlayContent.classList.add("overlay-content");
closeButton.classList.add("close-button");
overlayImage.classList.add("overlay-image");
overlayText.classList.add("overlay-text");
overlayTitle.classList.add("overlay-title");
overlayDesc.classList.add("overlay-desc");
leftArrow.classList.add("left-arrow");
rightArrow.classList.add("right-arrow");

overlay.appendChild(overlayContent);
overlay.appendChild(closeButton);
overlayContent.appendChild(overlayImage);
overlayContent.appendChild(overlayText);
overlayText.appendChild(overlayTitle);
overlayText.appendChild(overlayDesc);
overlay.appendChild(leftArrow);
overlay.appendChild(rightArrow);

closeButton.innerHTML = "&times;";
leftArrow.innerHTML = "&lt;";
rightArrow.innerHTML = "&gt;";

let currentIndex = 0;

function showOverlay(index) {
  const galleryImg = galleryItem[index];
  const img = galleryImg.querySelector("img");
  overlayImage.src = img.src;
  overlayTitle.innerText = img.alt;
  overlayDesc.innerText = img.getAttribute("data-description");
  overlay.style.display = "flex";
  currentIndex = index;

  // limit max character on overlay-desc
  const maxCharacters = 400;
  const originalText = overlayDesc.innerText;
  if (originalText.length > maxCharacters) {
    const truncatedText = originalText.substring(0, maxCharacters) + "...";
    overlayDesc.innerText = truncatedText;
  }
}

function hideOverlay() {
  overlay.style.display = "none";
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % galleryItem.length;
  showOverlay(currentIndex);
}

function showPreviousImage() {
  currentIndex = (currentIndex - 1 + galleryItem.length) % galleryItem.length;
  showOverlay(currentIndex);
}

galleryItem.forEach((galleryImg, index) => {
  galleryImg.addEventListener("click", () => showOverlay(index));
});

closeButton.addEventListener("click", hideOverlay);
leftArrow.addEventListener("click", showPreviousImage);
rightArrow.addEventListener("click", showNextImage);

overlay.addEventListener("wheel", (event) => {
  event.preventDefault();
  if (event.deltaY > 0) {
    showNextImage();
  } else {
    showPreviousImage();
  }
});

// end of overlay

// for a while (ntar dihapus)
// popup.style.display = "none";
