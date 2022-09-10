const display = document.querySelector('.display-container #display');
const decimal = document.querySelector('.keypad-container #decimal');
const addBtn = document.querySelector('.keypad-container #add');
const backspace = document.querySelector('.keypad-container #backspace')




// isNumber capture a string and compare it against a regular expression
// to determine if it is a number between the valid range

function isNumber (num) {
  sequence = new RegExp(/[0-9]/g);
  return sequence.test(num);
}

function add (numOne, numtwo) {
  let result = numOne + numtwo;
  return toString(result)
};

let decimalActive = false;
let currentStringValue = '0';

// Event listeners

addEventListener('pointerdown', (e) => {
  let target = e.target;

  if (isNumber(target.textContent) && target.nodeName === 'BUTTON') {
    if (currentStringValue === '0' && target.textContent !== '0') {
      currentStringValue = target.textContent;
      display.textContent = currentStringValue;
    } else if (target.textContent === '0' && currentStringValue === '0') {
      currentStringValue = '0';
    } else {
        currentStringValue += target.textContent;
        display.textContent = currentStringValue;
    };
  };
});

decimal.addEventListener('pointerdown', () => {
  if (currentStringValue === '0' && decimalActive === false) {
    currentStringValue = '0.';
    display.textContent = currentStringValue;
    decimalActive = true;
  } else if (currentStringValue !== '0' && decimalActive === false) {
      currentStringValue += '.';
      display.textContent = currentStringValue;
      decimalActive = true;
  };
});

addEventListener('pointerdown', (e) => {
  let target = e.target;

  if (target.id === 'clear' && target.nodeName === 'BUTTON') {
    display.textContent = '0';
    currentStringValue = '0';
    decimalActive = false;
  };
});

backspace.addEventListener('pointerdown', () => {
  if (currentStringValue.length === 1) {
    currentStringValue = '0'
    display.textContent = currentStringValue;
  } else if (currentStringValue !== '0') {
      currentStringValue = currentStringValue.slice(0, -1);
      display.textContent = currentStringValue;
  }
})