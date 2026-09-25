import { createElement } from './utils.js';

export class MenuItem {
  constructor(item, modal) {
    this.item = item;
    this.modal = modal;
    this.container = document.querySelector('.menu-list');
    this.element = createElement('li', 'menu-list_item', 'item');
    this.eventListeners();
  }

  render() {
    this.element.innerHTML = `<div class="image-wrapper">
                    <img src="./src/assets/images/${this.item.category}/${this.item.image}" alt="${this.item.name}">
                  </div>
                  <div class="item-info">
                    <h3 class="item-info_title">${this.item.name}</h3>
                    <p class="item-info_description">
                      ${this.item.description}
                    </p>
                    <h3 class="item-info_price">$${this.item.price}</h3>
                  </div>`;
    this.container.appendChild(this.element);
  }

  handleClick = () => {
    this.modal.openModal(this.item);
  };

  eventListeners = () => {
    this.element.addEventListener('click', this.handleClick);
  };
}
