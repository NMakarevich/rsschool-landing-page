import slides from '../data/slides.json' with { type: 'json' };
import { createElement } from './utils.js';

const MIN_TOUCH_MOVE = 100;

class Slider {
  currentSlide = 1;
  container = document.querySelector('.slider');
  sliderInner = this.container.querySelector('.slider-inner');
  slidesList = this.container.querySelector('.slides-list');
  sliderMarkersContainer = this.container.querySelector('.slider-markers');
  prevButton = this.container.querySelector('.slider_control.prev');
  nextButton = this.container.querySelector('.slider_control.next');
  slides = slides;
  disableSlider = false;

  render() {
    this.sliderMarkersContainer.append(...this.createMarkers());
    const slidesElements = [
      this.slides[this.slides.length - 1],
      ...this.slides,
      this.slides[0],
    ].map((slide) => this.createSlide(slide));
    this.slidesList.append(...slidesElements);
    this.slidesList.style.width = `${slidesElements.length * 100}%`;
    this.slidesList.style.transform = `translateX(-${this.sliderInner.offsetWidth * this.currentSlide}px)`;

    this.eventListeners();
  }

  createSlide(item) {
    const element = createElement('li', 'slides-list_item');
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

  createMarkers() {
    const markers = Array(this.slides.length).fill(null);
    return markers.map((_, index) => {
      const marker = createElement('li', 'slider-control', 'slider-marker');
      if (index + 1 === this.currentSlide) {
        marker.classList.add('active');
      }
      marker.dataset.slide = String(index + 1);
      return marker;
    });
  }

  prevSlide = () => {
    if (this.disableSlider) return;
    this.disableSlider = true;
    this.deleteActiveClass();
    this.currentSlide -= 1;
    this.slidesList.classList.add('transition');
    this.slidesList.style.transform = `translateX(-${this.currentSlide * this.sliderInner.offsetWidth}px)`;
  };

  nextSlide = () => {
    if (this.disableSlider) return;
    this.disableSlider = true;
    this.deleteActiveClass();
    this.currentSlide += 1;
    this.slidesList.classList.add('transition');
    this.slidesList.style.transform = `translateX(-${this.currentSlide * this.sliderInner.offsetWidth}px)`;
  };

  deleteActiveClass() {
    this.sliderMarkersContainer
      .querySelector(`[data-slide="${this.currentSlide}"]`)
      .classList.remove('active');
  }

  selectSlide = (event) => {
    const { target } = event;
    if (target.tagName !== 'LI') return;

    this.disableSlider = true;
    this.deleteActiveClass();
    this.currentSlide = Number(target.dataset.slide);
    this.slidesList.classList.add('transition');
    this.slidesList.style.transform = `translateX(-${this.currentSlide * this.sliderInner.offsetWidth}px)`;
  };

  handleTransitionStart = () => {
    const index =
      this.currentSlide === 0
        ? this.slides.length
        : this.currentSlide === this.slides.length + 1
          ? 1
          : this.currentSlide;
    this.sliderMarkersContainer.querySelector(`[data-slide="${index}"]`).classList.add('active');
  };

  handleTransitionEnd = () => {
    this.slidesList.classList.remove('transition');
    if (this.currentSlide === 0) {
      this.currentSlide = this.slides.length;
    } else if (this.currentSlide === this.slides.length + 1) {
      this.currentSlide = 1;
    }
    this.slidesList.style.transform = `translateX(-${this.currentSlide * this.sliderInner.offsetWidth}px)`;
    this.disableSlider = false;
  };

  handleScreenResize = () => {
    this.slidesList.style.transform = `translateX(-${this.currentSlide * this.sliderInner.offsetWidth}px)`;
  };

  sliderSwipeEvent = () => {
    let startX = null;

    const handleTouchStart = (event) => {
      event.preventDefault();

      const { changedTouches } = event;
      startX = changedTouches[0].clientX;
    };

    const handleTouchEnd = (event) => {
      event.preventDefault();

      const { changedTouches } = event;
      const endX = changedTouches[0].clientX;

      if (Math.abs(endX - startX) < MIN_TOUCH_MOVE) return;

      if (endX - startX < 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    };

    this.sliderInner.addEventListener('touchstart', handleTouchStart);
    this.sliderInner.addEventListener('touchend', handleTouchEnd);
  };

  eventListeners = () => {
    this.prevButton.addEventListener('click', this.prevSlide);
    this.nextButton.addEventListener('click', this.nextSlide);
    this.sliderMarkersContainer.addEventListener('click', this.selectSlide);
    this.sliderSwipeEvent();
    this.slidesList.addEventListener('transitionstart', this.handleTransitionStart);
    this.slidesList.addEventListener('transitionend', this.handleTransitionEnd);
    window.addEventListener('resize', this.handleScreenResize);
  };
}

const slider = new Slider();
slider.render();
