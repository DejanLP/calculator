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
    if (array.every((el)=> {el === 0})) {
        return 'error';
    }
    let div = parseInt(array[0]) / parseInt(array[1]);
    for(let i = 2; i < array.length; i++) {
        div /= parseInt(array[i]);
    }
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
let numbers = [];
let operators = [];
let tempResult = 0;

const keys = document.querySelectorAll('.key');
keys.forEach((key) => {
    key.addEventListener('click', () => {
        putOnDisplay(key.getAttribute('value'))});
});

let tempFirstEntry;
let tempFirstOp = '';
function putOnDisplay(value) {
    calculation.innerText = calculation.innerText + "" + value;
    if (value === '+' || value === '-' || value === '/' || value === 'x') {
        tempFirstEntry = numbers[0];
        console.log(tempFirstOp);
        numbers = [];
        operators = [];
        // if(tempResult === 0){
        //     result.innerText = operator(value, numbers);
        //     operators.push(value);
        //     console.log(operators);
        // }
        // else {
        //     numbers.push(tempResult);
        //     numbers.slice(0, numbers.length - 2);
        //     result.innerText = operator(value, numbers);
        // }
    }
    if (value === '=') {
        numbers.unshift(tempFirstEntry);
        console.log(numbers);
        tempResult = operator(tempFirstOp, numbers);
        result.innerText = tempResult;
        numbers = [];
        operators = [];
    } 
    //resets the current data saved in variables
    if (value ===  'reset') {
        calculation.innerText = '';
        result.innerText = '';
        numbers = [];
        operators = [];
    }
}

const numbs = document.querySelectorAll('.number');
numbs.forEach(num => {
    num.addEventListener('click', () => {
        numbers.push(parseInt(num.getAttribute('value')));
        console.log(numbers);
    })
});

const ops = document.querySelectorAll('.operator');
ops.forEach((op) => {
    op.addEventListener('click', () => {
        let opr = op.getAttribute('value');
        operators.push(opr);
        tempFirstOp = operators[0];
        console.log(operators);
    })
});