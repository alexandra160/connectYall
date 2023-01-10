// Hobby buttons select

// const buttonHobbies = document.querySelectorAll(".hobbiesBtn");

// buttonHobbies.addEventListener("click", function () {
//   if (this.classList.contains("activeBtn")) {
//     this.classList.remove("activeBtn");
//   } else {
//     this.classList.add("activeBtn");
//   }
// });
let prevButton = null;
const wrapper = document.querySelector(".hobbies");

wrapper.addEventListener("click", (e) => {
  const isButton = e.target.nodeName === "BUTTON";

  if (!isButton) {
    return;
  }

  e.target.classList.toggle("activeBtn"); // Add .active CSS Class
});
