import products from '../data/products.json';
import { MenuItem } from './menuItem.js';
import { Modal } from './modal.js';

const modal = new Modal();
const categories = {};

for (let product of products) {
  if (categories[product['category']]) {
    categories[product['category']].push(product);
  } else {
    categories[product['category']] = [product];
  }
}

let selectedCategory = Object.keys(categories)[0];

const tabControls = document.querySelector('.tabs-controls');
const menuList = document.querySelector('.menu-list');

menuList.append(...categories[selectedCategory].map((item) => new MenuItem(item, modal).render()));

function changeCategory(event) {
  const { target } = event;

  if (target.tagName !== 'BUTTON') return;

  document.querySelector(`[data-category="${selectedCategory}"]`).classList.remove('active');
  selectedCategory = target.dataset.category;
  target.classList.add('active');

  menuList.innerHTML = '';
  menuList.append(
    ...categories[selectedCategory].map((item) => new MenuItem(item, modal).render())
  );
}

tabControls.addEventListener('click', changeCategory);
