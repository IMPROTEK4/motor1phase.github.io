
// ---- FUNCTION FOR ALLOW BUTTON START

const numberInput = document.getElementById('box_Mspeed');
const startButton = document.getElementById('button_start');

numberInput.addEventListener('input', function () {
    const inputValue = parseInt(numberInput.value, 10);
    if (!isNaN(inputValue)=="" ) {
        startButton.disabled = false;
        // startButton.style.backgroundColor = 'green';
    }
    else if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 50) {
        startButton.disabled = false;
        // startButton.style.backgroundColor = 'yellow';
    } 
    else {
      startButton.disabled = true;
    //   startButton.style.backgroundColor = 'red';
    }
});


