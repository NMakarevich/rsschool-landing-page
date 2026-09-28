import { disableScroll, enableScroll } from './utils.js';

const TABLET_SIZE = 768;

class Burger {
  isBurgerOpen = false;
  burger = document.querySelector('.burger-menu');
  nav = document.querySelector('.header-nav');

  init() {
    this.eventListeners();
  }

  closeBurger = () => {
    this.isBurgerOpen = false;
    this.burger.classList.remove('open');
    this.nav.classList.remove('open');
    enableScroll();
  };

  handleBurgerClick = () => {
    this.isBurgerOpen = !this.isBurgerOpen;
    if (this.isBurgerOpen) {
      this.nav.classList.add('transition');
      this.burger.classList.add('open');
      this.nav.classList.add('open');
      disableScroll();
    } else {
      this.closeBurger();
    }
  };

  handleNavClick = (event) => {
    const { target } = event;
    if (target.tagName === 'A') {
      this.closeBurger();
    }
  };

  handleKeyUp = (event) => {
    if (event.code === 'Escape') {
      this.closeBurger();
    }
  };

  handleResize = () => {
    if (document.body.offsetWidth > TABLET_SIZE) {
      this.nav.classList.remove('transition');
      this.closeBurger();
    }
  };

  eventListeners = () => {
    this.burger.addEventListener('click', this.handleBurgerClick);
    this.nav.addEventListener('click', this.handleNavClick);
    document.addEventListener('keydown', this.handleKeyUp);
    window.addEventListener('resize', this.handleResize);
  };
}

const burger = new Burger();
burger.init();
