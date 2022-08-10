function add(array) {
    let sum = 0;
    for(let i = 0; i < array.length; i++) {
        sum += parseInt(array[i]);
    }
    return roundResult(sum);
}

function subtract(array) {
    let diff = parseInt(array[0]) - parseInt(array[1]);
    for(let i = 2; i < array.length; i++) {
        diff -= parseInt(array[i]);
    }
    return roundResult(diff);
}

function multiply(array) {
    let prod = 1;
	for(let i = 0; i < array.length; i++) {
        prod *= parseInt(array[i]);
  }
  return roundResult(prod);
}

function divide(array) {
    let div = parseInt(array[0]) / parseInt(array[1]);
    for(let i = 2; i < array.length; i++) {
        div /= parseInt(array[i]);
    }
    if (div === Infinity) return 'Division by 0 :c';
    return roundResult(div);
}

function modulo(array){
    let mod = array[0] % array[1];
    return roundResult(mod);
}

function operator(operator, array) {
    if (operator === 'x') return multiply(array);
    if (operator === '÷') return divide(array);
    if (operator === '+') return add(array);
    if (operator === '-') return subtract(array);
    if (operator === '%') return modulo(array);
    return 'Please enter a valid operator.';
}

let result = document.querySelector('#result');
let calculation = document.querySelector('#calculation');
let tempCalc = document.querySelector('#tempCalc');

let numbers = [];
let operators = [];
let tempResult = '';

let chain = false;
let canUseOperator = false;

let tempFirstEntry;
let tempFirstOp = '';
/**
 * ========
 * TODO: 
 * - hotkey support
 * - what does AC do
 * - decimal input support
 * =======
 */
/**
 * Depending on key pressed, puts corresponding result to the display
 * 
 * @param {*} value of a key
 * @returns 
 */
function putOnDisplay(key) {
    if (key.getAttribute('value') === '+/-' || key.getAttribute('value') === 'AC') return;
    if ((key.classList.contains('operator') || key.getAttribute('value') === '=') && canUseOperator === false) return;
    key.classList.toggle('pressed');
    let value = key.getAttribute('value');
    if (key.classList.contains('operator')) {
        numbers.push(parseInt(number));
        console.log(numbers);
        number = '';
        if(chain) {
            calculate();
        }
        chain = true;
        tempFirstEntry = numbers[0];
        console.log(tempFirstOp);
        clearArrays();
        canUseOperator = false;
    }
    if (value === '=' && canUseOperator) {
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

const keyCodes = [48,49,50,51,52,53,54,55,56,57,171,173,68,88,190,13,77,20,27]
function docKeyDown (e) {
    if(keyCodes.includes(e.keyCode)) {
        console.log(e.keyCode);
        let domElement = document.querySelector(`.key[data="${e.keyCode}"]`);
        console.log(domElement);
        if (e.keyCode >= 48 && e.keyCode <= 57)  {
            handleNumbers(domElement);
        }
        else if (e.keyCode > 57) {
            handleOperators(domElement);
        }
        putOnDisplay(domElement);
 }
}

document.addEventListener('keydown', docKeyDown);

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

/**
 * Uses Number.EPSILON to make a more accurate rounding
 */
function roundResult(res) {
    if(res % 1 === 0) {
        return res;
    }
    return Math.round((res + Number.EPSILON) * 100) / 100;
}

const config = document.querySelectorAll('.config');
config.forEach((conf) => {
    conf.addEventListener('click', () => {
        if (conf.getAttribute('value') === '+/-') {

            if (number.charAt(0) === '-'){
                number = number.slice(1, number.length);
            }
            else {
                number = '-' + number;
            }
            calculation.innerText = number;
        }
    })
});

const keys = document.querySelectorAll('.key');
keys.forEach((key) => {
    key.addEventListener('transitionend', () => {key.classList.remove('pressed')});
    key.addEventListener('click', () => {putOnDisplay(key);});
});

let number = ''
const numbs = document.querySelectorAll('.number');
numbs.forEach(num => {
    num.addEventListener('click', () => {
        handleNumbers(num);
    });
});

function handleNumbers(num) {
    canUseOperator = true;
    number += num.getAttribute('value')
    console.log(number);
}

let cut = false;
const ops = document.querySelectorAll('.operator');
ops.forEach((op) => {
    op.addEventListener('click', () => {
        handleOperators(op);
        canUseOperator = false;
    })
});

function handleOperators(op) {
    if (canUseOperator === false) return;
    if (cut) {
        calculation.innerText = '';
        calculation.innerText = op.getAttribute('value');
    }
    cut = true;
    let opr = op.getAttribute('value');
    operators.push(opr);
    tempFirstOp = operators[0];
    console.log(operators);
}
