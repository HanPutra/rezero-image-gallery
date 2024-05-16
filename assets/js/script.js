// author: Handika Putra
// github account: https://github.com/HanPutra

// popup
const yes = document.querySelector("#confirm-yes");
const no = document.querySelector("#confirm-no");
const popup = document.querySelector(".popup");

yes.addEventListener("click", function () {
  setTimeout(function () {
    popup.style.opacity = "0";
    setTimeout(function () {
      popup.style.display = "none";
    }, 300);
  }, 300);
});

no.addEventListener("click", function () {
  window.history.back();
  window.close();
});
// end of popup

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

  // calc max-content width of overlay-title
  overlayTitle.style.width = "auto";
  const maxContentWidth = overlayTitle.scrollWidth;
  overlayTitle.style.width = `calc(${maxContentWidth}px + 2rem)`;

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

function showPrevImage() {
  currentIndex = currentIndex === 0 ? galleryItem.length - 1 : currentIndex - 1;
  showOverlay(currentIndex);
}

function showNextImage() {
  currentIndex = currentIndex === galleryItem.length - 1 ? 0 : currentIndex + 1;
  showOverlay(currentIndex);
}

galleryItem.forEach((galleryImg, index) => {
  galleryImg.addEventListener("click", () => showOverlay(index));
});

closeButton.addEventListener("click", hideOverlay);
leftArrow.addEventListener("click", showPrevImage);
rightArrow.addEventListener("click", showNextImage);

// end of overlay

// for a while (ntar dihapus)
popup.style.display = "none";
