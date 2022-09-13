const display = document.querySelector('.display-container #display');
const displayOperation = document.querySelector('.display-container #operation')
const decimalBtn = document.querySelector('.keypad-container #decimal');
const backspaceBtn = document.querySelector('.keypad-container #backspace');
const clearAllBtn = document.querySelector('.keypad-container #clear');
const changeSignBtn = document.querySelector('.keypad-container #change-sign');
const equalBtn = document.querySelector('.keypad-container #equal');

function isNumber (num) {
/* isNumber filter e.target to just capture numeric keypad*/
  if (num.length > 1) return false;
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
    case '+' : return add;
    case '-' : return subt;
    case '*' : return mult;
    case '/' : return division;
  };
};

let decimalActive = false;
let currentInput = '0';
let previousInput = null;
let totalResult = '0';
let sign;
let keypadActive = false;
let pendingOperation = null;

function inputNumberKeypad (e) {
// Event listener to capture pressed keypad numbers

  let target;
  if (e.type === 'pointerdown') {
    target = e.target;
    target = target.textContent;
  } else if (e.type === 'keypress') {
    target = e.key;
  };

  if (isNumber(target)) {
    keypadActive = true;
    if (currentInput === '0' && target !== '0') {
      currentInput = target;
      display.textContent = currentInput;
    } else if (target === '0' && currentInput === '0') {
      return
    } else {
        currentInput += target;
        display.textContent = currentInput;
    };
  };
}

function setDecimalPoint () {
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
}

function clearAll () {
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
}

function deleteLastInput () {
// Delete the last number of the current input

  if (currentInput.length === 1) {
    currentInput = '0';
    decimalActive = false;
    display.textContent = '0';

  } else if (currentInput !== '0') {
      if (currentInput[currentInput.length - 1] === '.') decimalActive = false;
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput;
  };
}

function getTotal () {
//To be used with the = button or Enter key

  totalResult = pendingOperation(previousInput, currentInput);
  display.textContent = totalResult;
  displayOperation.textContent = `${previousInput} ${sign} 
        ${(currentInput === '0' ? '' : currentInput)}`;
  previousInput = totalResult;
  currentInput = '0';
  pendingOperation = null;
}

function solveOperation (operation) {
  if (previousInput === null && keypadActive === true) {
    keypadActive = false;
    previousInput = currentInput;
    currentInput = '0';
    displayOperation.textContent = `${previousInput} ${operation}`;
  };

  if (previousInput !== null && pendingOperation === null) {
    pendingOperation = operate(operation);
    sign = operation;
    decimalActive = false;
  } else if (previousInput !== null && pendingOperation !== null) {
      totalResult = pendingOperation(previousInput, currentInput);
      displayOperation.textContent = `${previousInput} ${sign} 
      ${(currentInput === '0' ? '' : currentInput)}`;
      previousInput = totalResult;
      display.textContent = totalResult;
      currentInput = '0';
      pendingOperation = operate(operation);
      sign = operation;
      decimalActive = false;
    };
}

addEventListener('pointerdown', (e) => inputNumberKeypad(e));
addEventListener('keypress', (e) => inputNumberKeypad(e))

changeSignBtn.addEventListener('pointerdown', () => {
  let changedSingNum = toFromNegative(currentInput);
  display.textContent = changedSingNum;
  currentInput = changedSingNum;
});

decimalBtn.addEventListener('pointerdown', setDecimalPoint);
addEventListener('keypress', (e) => {
  if (e.key === '.') setDecimalPoint();
});

clearAllBtn.addEventListener('pointerdown', clearAll);
addEventListener('keydown', (e) => {
  if (e.key === 'Delete' || e.key === 'Escape') {
    clearAll()
  }
})

backspaceBtn.addEventListener('pointerdown', deleteLastInput);
addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    deleteLastInput()
  }
})

equalBtn.addEventListener('pointerdown', getTotal);
addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    getTotal()
  }
})

addEventListener('pointerdown', (e) => {
// Fire up one of the math operations

  let target = e.target;
  let operation = target.textContent;
  if (['+', '-', '*', '/'].includes(operation)) {
    solveOperation(operation)
  };
});

addEventListener('keypress', (e) => {
  let operation = e.key;

  if (['+', '-', '*', '/'].includes(operation)) {
    solveOperation(operation)
  };
})