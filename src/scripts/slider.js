import items from '../data/slides.json';

let currentSlide = 1;
const prevSlideButton = document.querySelector('.slider_control.prev');
const nextSlideButton = document.querySelector('.slider_control.next');
const sliderMarkers = document.querySelector('.slider-markers');
const slidesList = document.querySelector('.slides-list');

function prevSlide() {}

function nextSlide() {}

function selectSlide(slideIndex) {}

prevSlideButton.addEventListener('click', prevSlide);
nextSlideButton.addEventListener('click', nextSlide);

function getSlideItem(item) {
  const element = document.createElement('li');
  element.classList.add('slides-list_item');
  element.innerHTML = `<div class="slider-item">
                        <div class="slider-item_image image-wrapper">
                          <img src="./src/assets/images/slider/${item.image}" alt="item.name">
                        </div>
                        <div class="slider-item_info">
                          <h3 class="slider-item_title">${item.name}</h3>
                          <p class="slider-item_description">${item.description}</p>
                          <h3 class="slider-item_price">${item.price}</h3>
                        </div>
                      </div>`;
  return element;
}
