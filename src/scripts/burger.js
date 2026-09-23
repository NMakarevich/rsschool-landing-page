let isBurgerOpen = false;
const burger = document.querySelector('.burger-menu');
const nav = document.querySelector('.header-nav');

burger.addEventListener('click', () => {
  isBurgerOpen = !isBurgerOpen;
  if (isBurgerOpen) {
    burger.classList.add('open');
    nav.classList.add('open');
  } else {
    burger.classList.remove('open');
    nav.classList.remove('open');
  }
});

nav.addEventListener('click', (event) => {
  const { target } = event;
  if (target.tagName === 'A') {
    isBurgerOpen = false;
    burger.classList.remove('open');
    nav.classList.remove('open');
  }
});
