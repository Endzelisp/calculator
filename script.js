const display = document.querySelector('.display-container #display');
const displayOperation = document.querySelector('.display-container #operation')
const decimalBtn = document.querySelector('.keypad-container #decimal');
const backspaceBtn = document.querySelector('.keypad-container #backspace');
const clearAllBtn = document.querySelector('.keypad-container #clear');
const changeSignBtn = document.querySelector('.keypad-container #change-sign');
const equalBtn = document.querySelector('.keypad-container #equal');

function isNumber (num) {
/* isNumber filter e.target to just capture numeric keypad*/

  sequence = new RegExp(/[0-9]/g);
  return sequence.test(num);
};

function toFromNegative (num) {
  return parseFloat(num) * -1;
};

function add (numOne, numtwo) {
  let result = parseFloat(numOne) + parseFloat(numtwo);
  return result.toString();
};

function subt (numOne, numtwo) {
  let result = parseFloat(numOne) - parseFloat(numtwo);
  return result.toString();
}

function mult (numOne, numtwo) {
  let result = parseFloat(numOne) * parseFloat(numtwo);
  return result.toString();
};

function division (numOne, numtwo) {
  if (numtwo === '0') return 'Division by zero is not allowed';
  let result = parseFloat(numOne) / parseFloat(numtwo);
  return result.toString();
};

function operate (operation) {
  switch (operation) {
    case 'add' : return add;
    case 'subt' : return subt;
    case 'mult' : return mult;
    case 'division' : return division;
  };
};

let decimalActive = false;
let currentInput = '0';
let previousInput = null;
let totalResult = '0';
let sign;
let keypadActive = false;
let pendingOperation = null;

addEventListener('pointerdown', (e) => {
// Event listener to capture pressed keypad numbers

  let target = e.target;
  if (isNumber(target.textContent) && target.nodeName === 'BUTTON') {
    keypadActive = true;

    if (currentInput === '0' && target.textContent !== '0') {
      currentInput = target.textContent;
      display.textContent = currentInput;
    } else if (target.textContent === '0' && currentInput === '0') {
      return
    } else {
        currentInput += target.textContent;
        display.textContent = currentInput;
    };
  };
});

changeSignBtn.addEventListener('pointerdown', () => {
  let changedSingNum = toFromNegative(currentInput);
  display.textContent = changedSingNum;
  currentInput = changedSingNum;
});

decimalBtn.addEventListener('pointerdown', () => {
// Add decimal point

  if (currentInput === '0' && decimalActive === false) {
    currentInput = '0.';
    display.textContent = currentInput;
    decimalActive = true;

  } else if (currentInput !== '0' && decimalActive === false) {
      currentInput += '.';
      display.textContent = currentInput;
      decimalActive = true;
  };
});

clearAllBtn.addEventListener('pointerdown', () => {
// Restore all values to their original state

  currentInput = '0';
  previousInput = null;
  totalResult = '0';
  decimalActive = false;
  display.textContent = '0';
  displayOperation.textContent = '';
  sign = '';
  keypadActive = false;
  pendingOperation = null;
});

backspaceBtn.addEventListener('pointerdown', () => {
// Delete the last number of the current input

  if (currentInput.length === 1) {
    currentInput = '0';
    decimalActive = false;
    display.textContent = '0';

  } else if (currentInput !== '0') {
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput;
  };
});

equalBtn.addEventListener('pointerdown', () => {
  totalResult = pendingOperation(previousInput, currentInput);
  display.textContent = totalResult;
  displayOperation.textContent = `${previousInput} ${sign} 
        ${(currentInput === '0' ? '' : currentInput)}`;
  previousInput = totalResult;
  currentInput = '0';
  pendingOperation = null;
})

addEventListener('pointerdown', (e) => {
// Fire up one of the math operations

  target = e.target;
  if (['add', 'subt', 'mult', 'division'].includes(target.id)) {

    if (previousInput === null && keypadActive === true) {
      keypadActive = false;
      previousInput = currentInput;
      currentInput = '0';
      displayOperation.textContent = `${previousInput} ${target.textContent}`;
    };

    if (previousInput !== null && pendingOperation === null) {
      pendingOperation = operate(target.id);
      sign = target.textContent;
    } else if (previousInput !== null && pendingOperation !== null) {
        totalResult = pendingOperation(previousInput, currentInput);
        displayOperation.textContent = `${previousInput} ${sign} 
        ${(currentInput === '0' ? '' : currentInput)}`;
        previousInput = totalResult;
        display.textContent = totalResult;
        currentInput = '0';
        pendingOperation = operate(target.id);
        sign = target.textContent;
      };
  };
});