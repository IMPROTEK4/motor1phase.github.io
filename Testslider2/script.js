const slider = document.getElementById('mySlider');
const sliderValue = document.getElementById('sliderValue');

slider.addEventListener('input', updateSliderValue);

function updateSliderValue() {
  const value = slider.value;
  sliderValue.textContent = value;
}
