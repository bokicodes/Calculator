// ALL GLOBAL VARIABLES OF BUTTONS
const screen = document.querySelector(".screen");
const btnClear = document.querySelector(".clear");
const btnDelete = document.querySelector(".delete");
    //numbers
const btn1 = document.querySelector(".btn-1");
const btn2 = document.querySelector(".btn-2");
const btn3 = document.querySelector(".btn-3");
const btn4 = document.querySelector(".btn-4");
const btn5 = document.querySelector(".btn-5");
const btn6 = document.querySelector(".btn-6");
const btn7 = document.querySelector(".btn-7");
const btn8 = document.querySelector(".btn-8");
const btn9 = document.querySelector(".btn-9");
    //operators
const btnPlus = document.querySelector(".btnPlus");
const btnMinus = document.querySelector(".btnMinus");
const btnTimes = document.querySelector(".btnTimes");
const btnOver = document.querySelector(".btnOver");
        //dot and equals
const btnDot = document.querySelector(".btnDot");
const btnEquals = document.querySelector(".btnEquals");
    //all buttons nodelist except screen,clear and delete
const btnsNumbers = document.querySelectorAll(".btn");
    //all operators
const btnsOperators = document.querySelectorAll(".btnOp");

console.log(btnsNumbers);
console.log(btnsOperators);

function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    if(b != 0){
        return a/b;
    }
    else{
        console.log("can't divide with 0");
    }
}

function operate(a,b,op){
    let aNum = Number(a);
    let bNum = Number(b);
    let result;
    switch(op){
        case '+':
            result = add(aNum,bNum);
            break;
        case '-':
            result = subtract(aNum,bNum);
            break;
        case 'x':
            result = multiply(aNum,bNum);
            break;
        case '/':
            result = divide(aNum,bNum);
            break;
        default:
            console.log("invalid operator");
            return;
    }
    return result;
}


let displayValueFirst;
let displayValueSecond;
let defaultScreenZero = true;
let operatorClicked = false;

// NUMBER BUTTONS
for(let i = 0; i < btnsNumbers.length; i++){
    btnsNumbers[i].addEventListener("click", () => {
        if(defaultScreenZero){
            screen.innerText = "";
            defaultScreenZero = false; //it isn't there anymore
        }
        screen.innerText += btnsNumbers[i].innerText;
        if(!operatorClicked){
            displayValueFirst = screen.innerText;
            console.log(displayValueFirst);
        }
        if(operatorClicked){
            displayValueSecond = screen.innerText.substring(displayValueFirst.length+1);
            console.log(displayValueSecond);
        }
    });
}

// CLEAR BUTTON
btnClear.addEventListener("click", () => {
    screen.innerText = "0";
    defaultScreenZero = true;
    displayValueFirst = 0;
    displayValueSecond = 0;
    operatorClicked = false;
});

// OPERATOR BUTTONS
let operator;
let numerator = 0;
for(let i = 0; i < btnsOperators.length; i++){
    btnsOperators[i].addEventListener("click", () => {
        numerator++;
        if(numerator === 2){
            screen.innerText = operate(displayValueFirst,displayValueSecond,operator);
            displayValueFirst = screen.innerText;
            console.log(displayValueFirst);
            displayValueSecond = "";
            numerator = 1;
        }
        operatorClicked = true;
        operator = btnsOperators[i].innerText;
        screen.innerText += operator;
    });
}

// EQUALS BUTTON
btnEquals.addEventListener("click", () => {
    console.log(displayValueFirst);
    console.log(displayValueSecond);
    console.log(operator);
    if(displayValueFirst !== "" && displayValueSecond !== "" && operator !== ""){
        screen.innerText = operate(displayValueFirst,displayValueSecond,operator);
        displayValueFirst = screen.innerText;
        console.log(displayValueFirst);
        displayValueSecond = "";
    }
});


