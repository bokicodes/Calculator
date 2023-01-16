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
    let res = a+b;
    let finalRes = Number(Math.round(res+'e'+5)+'e-'+5);
    return finalRes;
}
function subtract(a,b){
    let res = a-b;
    let finalRes = Number(Math.round(res+'e'+5)+'e-'+5);
    return finalRes;
}
function multiply(a,b){
    let res = a*b;
    let finalRes = Number(Math.round(res+'e'+5)+'e-'+5);
    return finalRes;
}
function divide(a,b){
    if(b != 0){
        let res = a/b;
        let finalRes = Number(Math.round(res+'e'+5)+'e-'+5);
        return finalRes;
    }else{
        return "Cannot divide by 0";
    }
}

function operate(a,b,op){
    console.log(a); console.log(b); console.log(op);
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
            break;
    }
    return result;
}


let displayValueFirst = "";
let displayValueSecond = "";
let defaultScreenZero = true;
let operatorClicked = false;

// NUMBER BUTTONS
for(let i = 0; i < btnsNumbers.length; i++){
    btnsNumbers[i].addEventListener("click", () => {
        if(defaultScreenZero){
            screen.innerText = "";
            defaultScreenZero = false; //it isn't there anymore
        }
        if(screen.innerText === "Cannot divide by 0"){
            return;
        }
        if(screen.innerText.length === 15){
            return;
        }
        screen.innerText += btnsNumbers[i].innerText;
        if(!operatorClicked){
            displayValueFirst = screen.innerText;
        }
        if(operatorClicked){
            displayValueSecond = screen.innerText.substring(displayValueFirst.length+1);
            console.log("Second value: "+ displayValueSecond);
        }
    });
}

// CLEAR BUTTON
btnClear.addEventListener("click", () => {
    screen.innerText = "0";
    defaultScreenZero = true;
    displayValueFirst = "";
    displayValueSecond = "";
    operatorClicked = false;
    opNumerator = 0;
    dotNumerator = 0;
});

// OPERATOR BUTTONS
let operator;
let opNumerator = 0;
for(let i = 0; i < btnsOperators.length; i++){
    btnsOperators[i].addEventListener("click", () => {
        if(screen.innerText.endsWith("x") && btnsOperators[i].innerText === "-"){
            screen.innerText += "-"
            return;
        }
        if(screen.innerText.endsWith(".") || screen.innerText.endsWith("+") || screen.innerText.endsWith("-") ||
           screen.innerText.endsWith("x") || screen.innerText.endsWith("/") || screen.innerText === "Cannot divide by 0"){
            return;
        }

        if(defaultScreenZero){
            displayValueFirst = "0";
            defaultScreenZero = false;
            console.log(defaultScreenZero);
        }
        opNumerator++;

        if(opNumerator === 2){

            screen.innerText = operate(displayValueFirst,displayValueSecond,operator);

            if(screen.innerText === "Cannot divide by 0"){
                displayValueFirst = "";
                displayValueSecond = "";
                opNumerator = 0;
                dotNumerator = 0;
                return;
            }

            displayValueFirst = screen.innerText;
            displayValueSecond = "";
            opNumerator = 1;
            
            if(screen.innerText.includes("."))
                dotNumerator = 1;
            else
                dotNumerator = 0;

        }
        operatorClicked = true;
        operator = btnsOperators[i].innerText;
        screen.innerText += operator;

        
    });
}

// EQUALS BUTTON
btnEquals.addEventListener("click", () => {
    
    if(screen.innerText.endsWith(".") || screen.innerText.endsWith("+") || screen.innerText.endsWith("-") ||
           screen.innerText.endsWith("x") || screen.innerText.endsWith("/") || screen.innerText === "Cannot divide by 0"){
            return;
        }

    if(displayValueFirst !== "" && displayValueSecond !== "" && operator !== ""){
        screen.innerText = operate(displayValueFirst,displayValueSecond,operator);
        if(screen.innerText === "Cannot divide by 0"){
            displayValueFirst = "";
        }
        else{
            displayValueFirst = screen.innerText;
        }
        displayValueSecond = "";
        opNumerator = 0;
        operatorClicked = false;

        if(screen.innerText.includes(".")){
            dotNumerator = 1;
        }
        else{
            dotNumerator = 0;
        }

        if(screen.innerText == "0"){
            defaultScreenZero = true;
        }
    }
});

// BUTTON DOT
let dotNumerator = 0;
btnDot.addEventListener("click", () =>{
    dotNumerator++;
    if(screen.innerText === "Cannot divide by 0"){
        return;
    }
    if(dotNumerator === 2 && !operatorClicked){
        dotNumerator = 1;
        return;
    }
    if(screen.innerText.substring(displayValueFirst.length+1).includes(".")){
        return;
    }
    if(operatorClicked && displayValueSecond === ""){
        screen.innerText = screen.innerText + "0" + btnDot.innerText;
    }
    else
        screen.innerText += btnDot.innerText;

    defaultScreenZero = false;
});







/* EVO STA TI JE OSTALO ZA SADA DA URADIS: 
You should round answers with long decimals so that they don’t overflow the screen.
(VIDI ZA OVO DA I KAD KUCA IMA NEKI MAXIMUM A NE DA IZLAZI IZ KALKULATORA!!!);

Add a “backspace” button, so the user can undo if they click the wrong number.*/