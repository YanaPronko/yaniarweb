// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
import { bodyUnlock, bodyLock } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

window.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger"),
    menu = document.querySelector(".menu"),
    closeElem = document.querySelector(".menu__close");

  menu.addEventListener("click", handleLinksClick);

  hamburger.addEventListener("click", () => {
    menu.classList.add("active");
    bodyLock();
  });

  closeElem.addEventListener("click", () => {
    menu.classList.remove("active");
    bodyUnlock();
  });

  function handleLinksClick(e) {
    const target = e.target.closest(".menu__link");
    if (target) {
      menu.classList.remove('active');
      bodyUnlock();
    }
  }

  const counters = document.querySelectorAll(".skills__ratings-counter"),
    lines = document.querySelectorAll(".skills__ratings-line span");

  counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
  });
});
