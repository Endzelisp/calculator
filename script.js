const display = document.querySelector('.display-container #display')




// isNumber capture a string and compare it against a regular expression
// to determine if it is a number between the valid range

function isNumber (num) {
  sequence = new RegExp(/[0-9]/g)
  return sequence.test(num)
}


let currentStringValue = ''

// Event listeners

addEventListener('pointerdown', (e) => {
  let target = e.target;

  if (isNumber(target.textContent) && target.nodeName === 'BUTTON') {
    currentStringValue += target.textContent;
    display.textContent = currentStringValue;
  }
})

addEventListener('pointerdown', (e) => {
  let target = e.target;

  if (target.id === 'clear' && target.nodeName === 'BUTTON') {
    display.textContent = 0;
    currentStringValue = ''
  }
})