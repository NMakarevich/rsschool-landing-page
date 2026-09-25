export function createElement(tag, ...classes) {
  const element = document.createElement(tag);
  element.classList.add(...classes);
  return element;
}

function handleScroll(event) {
  event.preventDefault();
}

export function disableScroll() {
  document.addEventListener('scroll', handleScroll, { passive: false });
  document.addEventListener('wheel', handleScroll, { passive: false });
  document.addEventListener('touchmove', handleScroll, { passive: false });
}

export function enableScroll() {
  document.removeEventListener('wheel', handleScroll);
  document.removeEventListener('scroll', handleScroll);
  document.removeEventListener('touchmove', handleScroll);
}
