// Chat menu

function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}

let popup = document.getElementById("popup");
let popupContainer = document.querySelector(".popupContainer");

function openPopup() {
  //   popupContainer.classList.add("popupOpenedStyle");

  popup.classList.add("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
  //   popupContainer.classList.remove("popupOpenedStyle");
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    openPopup();
  }, 3000);
});
