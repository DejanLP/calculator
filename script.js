function add(array) {
    let sum = 0;
    for(let i = 0; i < array.length; i++) {
        sum += parseInt(array[i]);
    }
    return sum;
}

function subtract(array) {
    let diff = parseInt(array[0]) - parseInt(array[1]);
    for(let i = 2; i < array.length; i++) {
        diff -= parseInt(array[i]);
    }
    return diff;
}

function multiply(array) {
    let prod = 1;
	for(let i = 0; i < array.length; i++) {
        prod *= parseInt(array[i]);
  }
  return prod;
}

function divide(array) {
    let div = parseInt(array[0]) / parseInt(array[1]);
    for(let i = 2; i < array.length; i++) {
        div /= parseInt(array[i]);
    }
    if (div === Infinity) return 'Division by 0 :c';
    return div;
}

function operator(operator, array) {
    if (operator === 'x') return multiply(array);
    if (operator === '/') return divide(array);
    if (operator === '+') return add(array);
    if (operator === '-') return subtract(array);
    return 'Please enter a valid operator.';
}

let result = document.querySelector('#result');
let calculation = document.querySelector('#calculation');
let tempCalc = document.querySelector('#tempCalc');
let numbers = [];
let operators = [];
let tempResult = 0;
let chain = false;
let canUseOperator = false;

let tempFirstEntry;
let tempFirstOp = '';

/**
 * Depending on key pressed, puts corresponding result to the display
 * 
 * @param {*} value of a key
 * @returns 
 */
function putOnDisplay(key) {
    let value = key.getAttribute('value');
    if (key.classList.contains('operator')) {
        numbers.push(parseInt(number));
        console.log(numbers);
        number = '';
        if(chain) {
            calculate();
            //calculation.innerText = value;
        }
        chain = true;
        tempFirstEntry = numbers[0];
        console.log(tempFirstOp);
        clearArrays();
    }
    if (value === '=') {
        numbers.push(parseInt(number));
        calculate();
        chain = false;
    }
    
    //resets the current data saved in variables
    if (value ===  'reset') return reset();
    calculation.innerText = calculation.innerText + "" + value;
}

/**
 * Conducts the calculation and displays it
 */
function calculate() {
    // unshift pushes element to first index of array
    numbers.unshift(tempFirstEntry);
    console.log(numbers);
    tempCalc.innerText = tempResult;
    tempResult = operator(tempFirstOp, numbers);
    result.innerText = tempResult;
    clearArrays();
    numbers.push(tempResult);
}

/**
 * Resets application to inital state
 */
function reset(){
    calculation.innerText = '';
    result.innerText = '0';
    clearArrays();
    chain = false;
    tempCalc.innerText = '';
    tempResult = '';
    number = '';
}

/**
 * Clears storage of numbers and operators to reset them
 */
function clearArrays() {
    numbers = [];
    operators = [];
}


const keys = document.querySelectorAll('.key');
keys.forEach((key) => {
    key.addEventListener('click', () => {
        if(key.classList.contains('operator') && canUseOperator === false) return;
        putOnDisplay(key)});
});

let number = "";
const numbs = document.querySelectorAll('.number');
numbs.forEach(num => {
    num.addEventListener('click', () => {
        canUseOperator = true;
        number += num.getAttribute('value')
        console.log(number);
    })
});

const ops = document.querySelectorAll('.operator');
ops.forEach((op) => {
    op.addEventListener('click', () => {
        if (canUseOperator === false) return;
        let opr = op.getAttribute('value');
        operators.push(opr);
        tempFirstOp = operators[0];
        console.log(operators);
        canUseOperator = false;
    })
});