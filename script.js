/* Calculator Operations */

function add(num1, num2){
    res = num1 + num2;
    return Math.round(res*1000)/1000;
}

function subtract(num1, num2){
    res = num1 - num2;
    return Math.round(res*1000)/1000;
}

function multiply(num1, num2){
    res = num1*num2;
    return Math.round(res*1000)/1000;
}

function divide(num1, num2){
    res = num1/num2;
    return Math.round(res*1000)/1000;
}

function operate(num1, num2, operator){
    if (operator == "+"){
        return add(num1, num2);
    }
    else if (operator == "-"){
        return subtract(num1, num2);
    }
    else if (operator == "*"){
        return multiply(num1, num2);
    }
    else if (operator == "/"){
        if (num2 == 0){
            return "Error"
        }
        return divide(num1, num2);
    }
}

/* Buttons Functionality */
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const equalButton = document.querySelector(".equal");
const displayContainer = document.querySelector(".display");
const result = document.querySelector(".result");
const decimalButton = document.querySelector(".decimal");
const allButtons = document.querySelectorAll("button");
const delButton = document.querySelector(".delete");
let num1 = "";
let num2 = "";
let operator = "";
let expression = `${num1} ${operator} ${num2}`;
let display = "";
let decimalCount = 0;

decimalButton.addEventListener('click', () => {
    if (operator == "" && !num1.includes(".")){
        if (num1 == ""){
            num1 = "0.";
            expression = `${num1} ${operator} ${num2}`;
            result.textContent = expression;
        }
        else{
            num1 += '.';
            expression = `${num1} ${operator} ${num2}`;
            result.textContent = expression;
        }
        
    }
    else if (!num2.includes(".") && operator != ""){
        if (num2 == ""){
            num2 = "0.";
            expression = `${num1} ${operator} ${num2}`;
            result.textContent = expression;
        }
        else{
            num2 += ".";
            expression = `${num1} ${operator} ${num2}`;
            result.textContent = expression;
        }
    }
    
})
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!operator){
            num1 += button.textContent;
            expression = `${num1} ${operator} ${num2}`
            console.log(expression);
            result.textContent = expression;
        }
        else{
            num2 += button.textContent;
            expression = `${num1} ${operator} ${num2}`
            console.log(expression);
            result.textContent = expression;
        }
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (num1 == ''){
            operator = button.textContent;
            num1 = 0;
            expression = `${num1} ${operator} ${num2}`
            console.log(expression);
            result.textContent = expression;
        }
        else if (num2 == ''){
            operator = button.textContent;
            expression = `${num1} ${operator} ${num2}`
            console.log(expression);
            result.textContent = expression;
        }
        else{
            res = operate(parseFloat(num1), parseFloat(num2), operator);
            toString(res);
            num1 = res;
            num2 = "";
            operator = button.textContent;
            expression = `${num1} ${operator} ${num2}`;
            console.log(expression);
            result.textContent = expression;
            
        }
        
    });
});

equalButton.addEventListener('click', () => {
    if (num2 != '' && operator != ''){
        res = operate(parseFloat(num1), parseFloat(num2), operator);
        toString(res);
        display = res;
        expression = `${num1} ${operator} ${num2} = `
        console.log(expression);
        console.log(display);
        result.textContent = expression;
        displayContainer.textContent = display;
        if (res == "Error"){
            num1 = '';
            num2 = '';
            operator = '';
            allButtons.addEventListener('click', () => {
                result.textContent = 0;
                displayContainer.textContent = 0;
            });
        }
        num1 = display;
        num2 = '';
        operator = '';
    }
    else if (num1 != '' && operator == '' && num2 == ''){
        displayContainer.textContent = num1;
    }
})

clearButton.addEventListener('click', () => {
    num1 = '';
    num2 = '';
    operator = '';
    result.textContent = "";
    displayContainer.textContent = 0;
})

delButton.addEventListener('click', () => {
    if (num2 != "" && operator != "" && num1 != ""){
        let len = num2.length;
        num2 = num2.slice(0, len-1);
        expression = `${num1} ${operator} ${num2}`;
        result.textContent = expression;
    }
    else if (num2 == "" && operator != "" && num1 != ""){
        operator = "";
        expression = `${num1} ${operator} ${num2}`;
        result.textContent = expression;
    }
    else if (num2 == "" && operator == "" && num1 != ""){
        let len = num1.length;
        num1 = num1.slice(0, len-1);
        expression = `${num1} ${operator} ${num2}`;
        result.textContent = expression;
    }
})