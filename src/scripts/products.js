import products from '../data/products.json';
import { MenuItem } from './menuItem.js';
import { Modal } from './modal.js';

const MIN_CATEGORY_SIZE_FOR_LOAD_MORE = 5;

const modal = new Modal();
const categories = products.reduce((acc, product) => {
  if (acc[product['category']]) {
    acc[product['category']].push(product);
  } else {
    acc[product['category']] = [product];
  }
  return acc;
}, {});

let selectedCategory = Object.keys(categories)[0];

const tabControls = document.querySelector('.tabs-controls');
const menuList = document.querySelector('.menu-list');
const loadMoreButton = document.querySelector('.load-more');

function setLoadMoreButtonStyle() {
  if (categories[selectedCategory].length < MIN_CATEGORY_SIZE_FOR_LOAD_MORE) {
    loadMoreButton.style.display = 'none';
  } else {
    loadMoreButton.style = '';
  }
}

setLoadMoreButtonStyle();

categories[selectedCategory].forEach((item) => new MenuItem(item, modal).render());

function changeCategory(event) {
  const { target } = event;

  if (target.tagName !== 'BUTTON') return;

  document.querySelector(`[data-category="${selectedCategory}"]`).classList.remove('active');
  selectedCategory = target.dataset.category;
  target.classList.add('active');

  menuList.classList.remove('show-all');
  menuList.innerHTML = '';
  setLoadMoreButtonStyle();
  categories[selectedCategory].forEach((item) => new MenuItem(item, modal).render());
}

tabControls.addEventListener('click', changeCategory);

loadMoreButton.addEventListener('click', () => {
  menuList.classList.add('show-all');
});
