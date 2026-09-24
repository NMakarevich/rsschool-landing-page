function createModal(item) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `<div class="modal-overlay"></div>
        <div class="item">
          <div class="image-wrapper">
            <img class="item-image" src="./src/assets/images/${item.category}/${item.image}" alt="${item.name}">
          </div>
          <div class="item-content">
            <div class="item-info">
              <h3 class="item-info_title">${item.name}</h3>
              <p class="item-info_description">${item.description}</p>
            </div>
            <div class="item-toggle-group size">
              <span class="item-toggle-group_label">Size</span>
              <ul class="item-toggle-group_list">${getSizeItems(item.sizes)}</ul>
            </div>
            <div class="item-toggle-group additives">
              <span class="item-toggle-group_label">Additives</span>
              <ul class="item-toggle-group_list">${getAdditivesItems(item.additives)}</ul>
            </div>
            <div class="item-total-price">
              <h3 class="item-total-price_title">Total:</h3>
              <h3 class="item-total-price_price"></h3>
            </div>
            <div class="item-alert">
            <span class="item-alert_icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 7.66663V11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 5.00667L8.00667 4.99926" stroke="currentColor" stroke-linecap="round"
                      stroke-linejoin="round"/>
                <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00004C14.6667 4.31814 11.6819 1.33337 8 1.33337C4.3181 1.33337 1.33333 4.31814 1.33333 8.00004C1.33333 11.6819 4.3181 14.6667 8 14.6667Z"
                      stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
              <p class="item-alert_message">
                The cost is not final. Download our mobile app to see the final price and place your order.
                Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
              </p>
            </div>
            <button type="button" class="button button-secondary modal-close">Close</button>
          </div>
        </div>`;
  return modal;
}

function createToggleGroupItem(iconValue, value, isActive = false) {
  return `<li class="item-toggle-group_item">
            <button type="button" class="button tab-control ${isActive ? 'active' : ''}" data-value="${iconValue}">
              <span class="tab-control_icon">${typeof iconValue === 'string' ? iconValue.toUpperCase() : iconValue}</span> ${value}
            </button>
          </li>`;
}

function getSizeItems(sizes) {
  return Object.entries(sizes).reduce(
    (acc, [size, value], index) => acc + createToggleGroupItem(size, value.size, index === 0),
    ''
  );
}

function getAdditivesItems(items) {
  return items.reduce((acc, item, index) => acc + createToggleGroupItem(index + 1, item.name), '');
}

function openModal(item) {
  const modal = createModal(item);
  document.body.appendChild(modal);
  disableScroll();
  const overlay = modal.querySelector('.modal-overlay');
  const closeButton = modal.querySelector('.modal-close');

  function closeModal(event) {
    if ((event.type === 'keyup' && event.key === 'Escape') || event.type === 'click') {
      enableScroll();
      modal.remove();
    }
  }

  overlay.addEventListener('click', closeModal);
  closeButton.addEventListener('click', closeModal);
  document.addEventListener('keyup', closeModal);
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
