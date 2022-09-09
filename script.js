const display = document.querySelector('.display-container #display')




function isNumber (num) {
  sequence = new RegExp(/[0-9]/g)
  return sequence.test(num)
}


let currentNumValue;
let currentStringValue = ''

// main event

addEventListener('pointerdown', (e) => {
  let target = e.target;

  if (isNumber(target.textContent) && target.nodeName === 'BUTTON') {
    currentStringValue += target.textContent;
    display.textContent = currentStringValue;
  }
})