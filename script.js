const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

buttons.addEventListener('click', e => {
  if (!e.target.matches('button')) return;
  const btn = e.target;
  const action = btn.dataset.action;
  const btnContent = btn.textContent;
  let current = display.textContent;

  switch (action) {
    case 'clear':
      display.textContent = '0';
      break;
    case 'backspace':
      display.textContent = current.length > 1
        ? current.slice(0, -1)
        : '0';
      break;
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      if (!/[+\-×÷]$/.test(current)) {
        const symbol = action === 'add'       ? '+' :
                       action === 'subtract'  ? '-' :
                       action === 'multiply'  ? '*' :
                                                  '/';
        display.textContent = current + symbol;
      }
      break;
    case 'equals':
      try {
        const result = eval(current);
        display.textContent = String(result);
      } catch {
        display.textContent = 'Error';
      }
      break;
    default:
      // numbers and decimal
      if (current === '0' && btnContent !== '.') {
        display.textContent = btnContent;
      } else if (btnContent === '.' && current.includes('.')) {
        // prevent multiple decimals
      } else {
        display.textContent = current + btnContent;
      }
  }
});
