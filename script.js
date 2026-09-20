const theme = localStorage.getItem('theme') || 'light';
const html = document.querySelector('html');
const radioLight = document.querySelector('#light');
const radioDark = document.querySelector('#dark');

if (theme === 'light') {
  radioLight.checked = true;
} else {
  html.classList.add('dark');
  radioDark.checked = true;
}

radioLight.addEventListener('change', (event) => {
  const { target } = event;
  if (target.checked) {
    html.classList.remove('dark');
    localStorage.setItem('theme', target.value);
  }
});

radioDark.addEventListener('change', (event) => {
  const { target } = event;
  if (target.checked) {
    html.classList.add(target.value);
    localStorage.setItem('theme', target.value);
  }
});
