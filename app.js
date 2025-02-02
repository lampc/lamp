// Set Decimal.js precision
Decimal.set({ precision: 1000000000 });

let displayElement = document.getElementById('display');
let historyListElement = document.getElementById('history-list');

function clearDisplay() {
  displayElement.textContent = '0';
}

function deleteLast() {
  displayElement.textContent = displayElement.textContent.slice(0, -1) || '0';
}

function appendNumber(number) {
  if (displayElement.textContent === '0') {
    displayElement.textContent = number;
  } else {
    displayElement.textContent += number;
  }
}

function appendOperator(operator) {
  let current = displayElement.textContent;
  if ('+-×÷%'.includes(current.slice(-1))) {
    displayElement.textContent = current.slice(0, -1) + operator;
  } else {
    displayElement.textContent += operator;
  }
}

function calculateResult() {
  try {
    let expression = displayElement.textContent.replace(/÷/g, '/').replace(/×/g, '*');

    // Split into tokens (numbers and operators)
    let tokens = expression.match(/(\d+\.?\d*)|([\+\-\*\/\%])/g);

    // First pass: Handle multiplication and division
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] === '*' || tokens[i] === '/') {
        let num1 = new Decimal(tokens[i - 1]);
        let num2 = new Decimal(tokens[i + 1]);
        let result = (tokens[i] === '*') ? num1.times(num2) : num1.dividedBy(num2);
        tokens.splice(i - 1, 3, result.toString()); // Replace the operation with the result
        i -= 2; // Adjust index after splicing
      }
    }

    // Second pass: Handle addition and subtraction
    let result = new Decimal(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      let operator = tokens[i];
      let nextNumber = new Decimal(tokens[i + 1]);

      switch (operator) {
        case '+': result = result.plus(nextNumber); break;
        case '-': result = result.minus(nextNumber); break;
        default: throw new Error('Invalid operator');
      }
    }

    // Display result
    let resultString = result.toFixed(10);
    addToHistory(displayElement.textContent + ' = ' + resultString);
    displayElement.textContent = resultString;
  } catch (e) {
    displayElement.textContent = 'Error';
  }
}

function addToHistory(entry) {
  let newItem = document.createElement('div');
  newItem.textContent = entry;
  newItem.classList.add('history-item');
  historyListElement.appendChild(newItem);
}

function toggleHistory() {
  historyListElement.classList.toggle('hidden');
}

document.addEventListener('keydown', function(event) {
  const key = event.key;

  if (key >= '0' && key <= '9') {
    appendNumber(key);
  } else if (key === '.') {
    appendNumber('.');
  } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
    appendOperator(key === '/' ? '÷' : key === '*' ? '×' : key);
  } else if (key === 'Enter' || key === '=') {
    calculateResult();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});


  
  pupil.style.transform = `translateX(${R - r +"px"}) rotate(${angle + "deg"})`;
  pupil.style.transformOrigin = `${r +"px"} center`;
});

