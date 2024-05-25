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

// main
// create overlay when image on hover
const items = document.querySelectorAll(".item");
items.forEach((container) => {
  const image = container.querySelector("img"); //select image from div item
  const imageOverlay = document.createElement("div"); // create div overlay for image
  const imageText = document.createElement("p"); // create p element for image
  imageOverlay.classList.add("image-overlay"); // add class overlay for div
  imageText.classList.add("text"); // add class text for p
  imageText.innerText = image.alt; // create text for p from img alt attribute
  container.appendChild(imageOverlay); // add div into .item
  container.appendChild(imageText); // add p into .item
  // when mouse is hover on .item then run this
  container.addEventListener("mouseover", () => {
    imageOverlay.style.opacity = 1;
    imageText.style.opacity = 1;
  });
  // when mouse in not hover on .item then run this
  container.addEventListener("mouseout", () => {
    imageOverlay.style.opacity = 0;
    imageText.style.opacity = 0;
  });
});
// end of main

// overlay
const overlay = document.querySelector("#overlay"); // select overlay
const closeButton = document.createElement("span"); // create span for close button
const content = document.createElement("div"); // create div for content inside overlay
const contentImage = document.createElement("img"); // create img for content
const contentText = document.createElement("div"); // create div for text inside content
const contentTitle = document.createElement("h2"); // create h2 title for explaining what image it is
const contentDesc = document.createElement("p"); // create p for descrytion what image it is
const leftArrow = document.createElement("span"); // create span for left arrow
const rightArrow = document.createElement("span"); // create span for right arrow

// add classlist for elements in the overlay
content.classList.add("content");
closeButton.classList.add("close-button");
contentImage.classList.add("content-image");
contentText.classList.add("content-text");
contentTitle.classList.add("content-title");
contentDesc.classList.add("content-desc");
leftArrow.classList.add("left-arrow");
rightArrow.classList.add("right-arrow");

// add elements into overlay in html
overlay.appendChild(content); // add content into overlay
overlay.appendChild(closeButton); // add close button into overlay
content.appendChild(contentImage); // add image into content
content.appendChild(contentText); // add div text into content
contentText.appendChild(contentTitle); // add h2 title into div text
contentText.appendChild(contentDesc); // add p desc into div text
overlay.appendChild(leftArrow); // add left array into overlay
overlay.appendChild(rightArrow); // add right arrow into overlay

// add icon in navigation button
closeButton.innerHTML = "&times;"; // add x
leftArrow.innerHTML = "&lt;"; // add <
rightArrow.innerHTML = "&gt;"; // add >

// create function declaration named showOverlay
let currentIndex = 0;
function showOverlay(index) {
  const item = items[index]; // create var item from which item
  const image = item.querySelector("img"); // create var image which select from var item
  contentImage.src = image.src; // src image from var contentImage is same as src from var image
  contentTitle.innerText = image.alt; // create text for content title from alt owned by var image
  contentDesc.innerText = image.getAttribute("data-description"); // create text for content desc from attribute("data-description") owned by var image
  overlay.style.display = "flex"; // change style for overlay from i don't know to flex
  currentIndex = index; // now, current index is index from .item who has been click

  // limit max character for content-desc
  const maxCharacters = 400;
  const originalText = contentDesc.innerText;
  if (originalText.length > maxCharacters) {
    const truncatedText = originalText.substring(0, maxCharacters) + "...";
    contentDesc.innerText = truncatedText;
  }
}

// simply every .item if onclick, so run this function
items.forEach((item, index) => {
  item.addEventListener("click", () => showOverlay(index));
});

// for hide overlay
function hideOverlay() {
  overlay.style.display = "none";
}

// for go to next image based on current index and items.length
function showNextImage() {
  currentIndex = (currentIndex + 1) % items.length; // it is modulus because example if currentIndex (19-lastIndex) = (19 + 1) % 20 = 0, so it is back to first index. and example if 14 % 20 = 14, because 14 is less than 20 so simply like that
  showOverlay(currentIndex);
}

// for go to previous image based on current index and items.length
function showPreviousImage() {
  currentIndex = (currentIndex - 1 + items.length) % items.length; // same as function showNextImage
  showOverlay(currentIndex);
}

// if navigation onclick so run this function
closeButton.addEventListener("click", hideOverlay);
leftArrow.addEventListener("click", showPreviousImage);
rightArrow.addEventListener("click", showNextImage);

// when mouse on overlay, then mouse on scroll, so run this function
overlay.addEventListener("wheel", (event) => {
  event.preventDefault(); // for prevent default action (of course scroll this page).
  // deltaY is if > 0 then scroll up, if < 0 then scroll down
  if (event.deltaY > 0) {
    showNextImage();
  } else {
    showPreviousImage();
  }
});

// Adding touch event listeners for swipe functionality
let touchStartX = 0;
let touchEndX = 0;

overlay.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX; // get horizontal coordinate when event running (touchstart) [0] get from first touch
});

overlay.addEventListener("touchmove", (event) => {
  touchEndX = event.changedTouches[0].screenX; // get horizontal coordinate when event running (touchmove) [0] get from first touch
});

// if touchend in overlay so run this function
overlay.addEventListener("touchend", () => {
  if (touchEndX < touchStartX) {
    showNextImage();
  }
  if (touchEndX > touchStartX) {
    showPreviousImage();
  }
});
// end of overlay
