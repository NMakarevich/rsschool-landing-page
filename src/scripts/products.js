import products from '../data/products.json' with { type: 'json' };
import { MenuItem } from './menuItem.js';
import { Modal } from './modal.js';

const MIN_CATEGORY_SIZE_FOR_LOAD_MORE = 5;

class Products {
  categories = this.getCategories();
  currentCategoryButton = document.querySelector(
    `[data-category="${Object.keys(this.categories)[0]}"]`
  );
  tabControls = document.querySelector('.tabs-controls');
  menuList = document.querySelector('.menu-list');
  loadMoreButton = document.querySelector('.load-more');

  constructor() {
    this.modal = new Modal();
  }

  init = () => {
    this.setLoadMoreButtonStyle();
    this.renderCategoryItems();
    this.eventListeners();
  };

  getCurrentCategory = () => {
    return this.currentCategoryButton.dataset.category;
  };

  getCategories() {
    return products.reduce((acc, product) => {
      if (acc[product['category']]) {
        acc[product['category']].push(product);
      } else {
        acc[product['category']] = [product];
      }
      return acc;
    }, {});
  }

  setLoadMoreButtonStyle() {
    if (this.categories[this.getCurrentCategory()].length < MIN_CATEGORY_SIZE_FOR_LOAD_MORE) {
      this.loadMoreButton.style.display = 'none';
    } else {
      this.loadMoreButton.style = '';
    }
  }

  renderCategoryItems() {
    this.categories[this.getCurrentCategory()].forEach((item) =>
      new MenuItem(item, this.modal).render()
    );
  }

  changeCategory = (event) => {
    const { target } = event;

    if (target.tagName !== 'BUTTON') return;

    this.currentCategoryButton.classList.remove('active');
    this.currentCategoryButton = target;
    this.currentCategoryButton.classList.add('active');

    this.menuList.classList.remove('show-all');
    this.menuList.innerHTML = '';
    this.setLoadMoreButtonStyle();
    this.renderCategoryItems();
  };

  eventListeners = () => {
    this.tabControls.addEventListener('click', this.changeCategory);

    this.loadMoreButton.addEventListener('click', () => {
      this.menuList.classList.add('show-all');
    });
  };
}

const productsClass = new Products();
productsClass.init();
