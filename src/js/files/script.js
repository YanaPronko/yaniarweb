// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from './functions.js';
import { bodyUnlock, bodyLock } from './functions.js';
// Підключення списку активних модулів
import { flsModules } from './modules.js';
import Swiper from 'swiper';

window.addEventListener('DOMContentLoaded', () => {
  // Menu
  const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close'),
    overlay = document.querySelector('.menu__overlay');

  menu.addEventListener('click', handleLinksClick);

  hamburger.addEventListener('click', () => {
    menu.classList.add('active');
    bodyLock();
  });

  closeElem.addEventListener('click', () => {
    closeMenu();
  });

  overlay.addEventListener('click', closeMenu);

  function handleLinksClick(e) {
    const target = e.target.closest('.menu__link');
    if (target) {
      closeMenu();
    }
  }

  function closeMenu() {
    menu.classList.remove('active');
    bodyUnlock();
  }

  const counters = document.querySelectorAll('.skills__ratings-counter'),
    lines = document.querySelectorAll('.skills__ratings-line span');

  counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
  });

  // THEME

  const savedTheme = handleLocalStorage('getItem', 'user-theme');
  console.log(savedTheme);
  const rootElement = document.documentElement;
  const actionTheme = document.querySelector('.sidepanel__action');
  const resetBtn = document.querySelector('.reset');

  actionTheme ? actionTheme.addEventListener('click', handleAction) : null;

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const savedTheme = handleLocalStorage('getItem', 'user-theme');
    !savedTheme ? changeUserTheme() : null;
  });

  function loadTheme() {
    if (!savedTheme) {
      const systemTheme = getSystemTheme();
      rootElement.classList.add(systemTheme);
    } else {
      rootElement.classList.add(savedTheme);
      resetBtn ? resetBtn.classList.add('active') : null;
    }
  }



  function handleAction(e) {
    const themeBtn = e.target.closest('.theme');
    const resetTargetBtn = e.target.closest('.reset')
    if (themeBtn) {
      changeUserTheme(true);
    }
    if (resetTargetBtn) {
      resetTheme(resetTargetBtn);
    }
  }

  function changeUserTheme(saveTheme = false) {
    const currentTheme = rootElement.classList.contains('dark')
      ? 'dark'
      : 'light';

    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    changeRootElemClass(currentTheme, newTheme)
    resetBtn ? resetBtn.classList.add('active') : null;
    saveTheme ? handleLocalStorage('setItem', 'user-theme', newTheme) : null;
  }

  function resetTheme(btn) {
    const savedTheme = handleLocalStorage('getItem')
    handleLocalStorage('removeItem');
    btn.classList.remove('active');
    const systemTheme = getSystemTheme();
    changeRootElemClass(savedTheme, systemTheme);

  }

  function handleLocalStorage(action, key = "user-theme", value = '') {
    switch (action) {
      case 'setItem':
        localStorage.setItem(key, value);
        break;
      case 'getItem':
        return localStorage.getItem(key);
      case 'removeItem':
        localStorage.removeItem(key);
        break;
    }
  }

  function changeRootElemClass(oldClass, newClass) {
    rootElement.classList.remove(oldClass);
    rootElement.classList.add(newClass);
  }

  loadTheme();

});
