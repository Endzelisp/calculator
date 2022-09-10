const display = document.querySelector('.display-container #display');
const operatorSign = document.querySelector('.display-container #operator');
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

function operate (numOne, numtwo, operation) {
  switch (operation) {
    case 'add' : return add(numOne, numtwo);
    case 'subt' : return subt(numOne, numtwo);
  }
}

let decimalActive = false;
let currentStringValue = '0';
let cacheStringValue = '0';
let pendingOperation;

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
  cacheStringValue = '0';
  operatorSign.textContent = '';
  displayOperation.textContent = '';
  pendingOperation = null;
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

addEventListener('pointerdown', (e) => {
  target = e.target;

  if (['add', 'subt', 'mult', 'division'].includes(target.id)) {
    cacheStringValue = currentStringValue;
    currentStringValue = '0';
    pendingOperation = target.id;
    operatorSign.textContent = target.textContent;
  }
})

equalBtn.addEventListener('pointerdown', () => {
  let result = operate(cacheStringValue, currentStringValue, pendingOperation);
  displayOperation.textContent = `${cacheStringValue} ${operatorSign.textContent} ${currentStringValue}`
  operatorSign.textContent = '';
  display.textContent = result;
  currentStringValue = result;
})