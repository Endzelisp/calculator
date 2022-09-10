const display = document.querySelector('.display-container #display');
const decimal = document.querySelector('.keypad-container #decimal');
const backspace = document.querySelector('.keypad-container #backspace')
const clearAllBtn = document.querySelector('.keypad-container #clear')
const addBtn = document.querySelector('.keypad-container #add');
const subtBtn = document.querySelector('.keypad-container #subt');
const multBtn = document.querySelector('.keypad-container #mult');
const divisionBtn = document.querySelector('.keypad-container #division');
const equalBtn = document.querySelector('.keypad-container #equal')



// isNumber capture a string and compare it against a regular expression
// to determine if it is a number between the valid range

function isNumber (num) {
  sequence = new RegExp(/[0-9]/g);
  return sequence.test(num);
}

function add (numOne, numtwo) {
  let result = parseFloat(numOne) + parseFloat(numtwo);
  return result.toString()
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

clearAllBtn.addEventListener('pointerdown', () => {
  display.textContent = '0';
  currentStringValue = '0';
  decimalActive = false;
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