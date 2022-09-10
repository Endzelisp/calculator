const display = document.querySelector('.display-container #display');
const displayOperation = document.querySelector('.display-container #operation')
const decimal = document.querySelector('.keypad-container #decimal');
const backspace = document.querySelector('.keypad-container #backspace')
const clearAllBtn = document.querySelector('.keypad-container #clear')
const equalBtn = document.querySelector('.keypad-container #equal');


function isNumber (num) {
/* isNumber filter e.target to just capture numeric keypad*/

  sequence = new RegExp(/[0-9]/g);
  return sequence.test(num);
}

function add (numOne, numtwo) {
  let result = parseFloat(numOne) + parseFloat(numtwo);
  return result.toString()
};

function subt (numOne, numtwo) {
  let result = parseFloat(numOne) - parseFloat(numtwo);
  return result.toString()
}

function mult (numOne, numtwo) {
  let result = parseFloat(numOne) * parseFloat(numtwo);
  return result.toString()
}

function division (numOne, numtwo) {
  if (numtwo === '0') return 'Division by zero is not allowed'
  let result = parseFloat(numOne) / parseFloat(numtwo);
  return result.toString()
}

function operate (numOne, numtwo, operation) {
  switch (operation) {
    case 'add' : return add(numOne, numtwo);
    case 'subt' : return subt(numOne, numtwo);
    case 'mult' : return mult(numOne, numtwo);
    case 'division' : return division(numOne, numtwo);
  }
}

function equal () {
  let result = operate(totalResult, currentInput, pendingOperation);
  displayOperation.textContent = `${totalResult} ${currentInput}`
  display.textContent = result;
  currentInput = result;
}

let decimalActive = false;
let currentInput = '0';
let totalResult = '0';
let pendingOperation;



addEventListener('pointerdown', (e) => {
// Event listener to capture pressed keypad numbers

  let target = e.target;
  if (isNumber(target.textContent) && target.nodeName === 'BUTTON') {
    if (currentInput === '0' && target.textContent !== '0') {
      currentInput = target.textContent;
      display.textContent = currentInput;
    } else if (target.textContent === '0' && currentInput === '0') {
      currentInput = '0';
    } else {
        currentInput += target.textContent;
        display.textContent = currentInput;
    };
  };
});

decimal.addEventListener('pointerdown', () => {
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

  display.textContent = '0';
  currentInput = '0';
  totalResult = '0';
  displayOperation.textContent = '';
  pendingOperation = null;
  decimalActive = false;
});

backspace.addEventListener('pointerdown', () => {
// Delete the last number of the current input

  if (currentInput.length === 1) {
    currentInput = '0'
    display.textContent = currentInput;
  } else if (currentInput !== '0') {
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput;
  }
})

addEventListener('pointerdown', (e) => {
// Fire up one of the math operations

  target = e.target;

  if (['add', 'subt', 'mult', 'division'].includes(target.id)) {
    totalResult = currentInput;
    currentInput = '0';
    pendingOperation = target.id;
  }
})

equalBtn.addEventListener('pointerdown', equal)