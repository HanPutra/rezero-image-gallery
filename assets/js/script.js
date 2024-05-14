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
