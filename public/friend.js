let beFriendBtn = document.querySelector("#befriendBtn");

document.addEventListener("click", function () {
  beFriendBtn.innerHTML = "Sent";
  beFriendBtn.classList.add("friendReqSent");
});
