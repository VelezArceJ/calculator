const calculator = document.querySelector('#calculator');
const keys = document.querySelector(".calc-keys");
const display = document.querySelector('#calc-display');



keys.addEventListener('click', event => {
    const key = event.target;
    const keyValue = event.target.innerHTML;
    const displayValue = display.innerHTML;
    const { type } = key.dataset;
    const { previousKeyType } = calculator.dataset;

    if (type == 'number') {
        if (displayValue === '0') {
            display.innerHTML = keyValue;
        } else if (previousKeyType == 'operator' || previousKeyType == 'equal') {
            display.innerHTML = keyValue;
        }else {
            display.innerHTML = displayValue + keyValue;
        }
    }
    

    if (type == 'operator') {
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
        operatorKeys.forEach( el => el.dataset.state = '');
        key.dataset.state = 'selected';

        calculator.dataset.firstNumber = displayValue;
        calculator.dataset.operator = key.dataset.key;
    }

    if (type == 'equal') {
        const firstNumber = calculator.dataset.firstNumber;
        const operator = calculator.dataset.operator;
        const secondNumber = displayValue;
        display.innerHTML = calculate(firstNumber, operator, secondNumber);
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
        operatorKeys.forEach( el => el.dataset.state = '');
    }

    if (type == 'clear') {
        display.innerHTML = 0;
        const operatorKeys = keys.querySelectorAll('[data-type="operator"]');
        operatorKeys.forEach( el => el.dataset.state = '');
    }
    
    calculator.dataset.previousKeyType = type;

})



























function calculate(firstNumber, operator, secondNumber) {
    let result = '';
    firstNumber = parseInt(firstNumber);
    secondNumber = parseInt(secondNumber);

    if (operator === 'plus') {
        return result = firstNumber + secondNumber
    }
    if (operator === 'subtract') {
        return result = firstNumber - secondNumber
    }
    if (operator === 'multiply') {
        return result = firstNumber * secondNumber
    }
    if (operator === 'divide') {
        if (secondNumber == 0) {
            return result = "Holy Guacamole!"
        }
        return result = firstNumber / secondNumber
    }
}