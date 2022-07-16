function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'error';
    }
    return a / b;
}

function operator(operator, a, b) {
    if(operator === '*') {
        return multiply(a, b);
    }
    if (operator === '/') {
        return divide(a, b);
    }
    if(operator === '+') {
        return add(a, b);
    }
    if (operator === "-"){
        return subtract(a, b);
    }
    return 'Please enter a valid operator.';
}