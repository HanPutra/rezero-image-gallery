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
document.addEventListener("DOMContentLoaded", function () {
  const galleryItem = document.querySelectorAll(".gallery-item");

  galleryItem.forEach((container) => {
    const image = container.querySelector("img");
    const divOverlay = document.createElement("div");
    const divImageText = document.createElement("div");
    divOverlay.classList.add("overlay");
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
});

// end of gallery

// for a while (ntar dihapus)
popup.style.display = "none";
