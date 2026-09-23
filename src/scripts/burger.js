let isBurgerOpen = false;
const burger = document.querySelector('.burger-menu');
const nav = document.querySelector('.header-nav');

function closeBurger() {
  isBurgerOpen = false;
  burger.classList.remove('open');
  nav.classList.remove('open');
  enableScroll();
}

function handleScroll(event) {
  event.preventDefault();
}

function disableScroll() {
  document.addEventListener('scroll', handleScroll, { passive: false });
  document.addEventListener('wheel', handleScroll, { passive: false });
  document.addEventListener('touchmove', handleScroll, { passive: false });
}

function enableScroll() {
  document.removeEventListener('wheel', handleScroll);
  document.removeEventListener('scroll', handleScroll);
  document.removeEventListener('touchmove', handleScroll);
}

burger.addEventListener('click', () => {
  isBurgerOpen = !isBurgerOpen;
  if (isBurgerOpen) {
    nav.classList.add('transition');
    burger.classList.add('open');
    nav.classList.add('open');
    disableScroll();
  } else {
    closeBurger();
  }
});

nav.addEventListener('click', (event) => {
  const { target } = event;
  if (target.tagName === 'A') {
    closeBurger();
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'Escape') {
    closeBurger();
  }
});

window.addEventListener('resize', () => {
  if (document.body.offsetWidth >= 769) {
    nav.classList.remove('transition');
    closeBurger();
  }
});
