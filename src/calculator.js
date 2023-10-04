const display = document.getElementById("display");
display.placeholder = "0";
const displayTop = document.getElementById("display-top");

let Operation = {
    op1 : "",
    op2 : "",
    operator : ""
}

let allowedChars = ["0","1","2","3","4","5","6","7","8","9","."];
let allowedOps = ["+", "-", "/", "*"];

function appendToDisplay(elem){
    display.value += elem;
    displayTop.appendChild(document.createTextNode(elem));
    Operation.op2 = Operation.op2 + elem;
    console.log(Operation.op2);
}

function clearDisplay(){
    display.placeholder = "0";
    display.value="";
    Operation.op1 = "";
    Operation.op2 = "";
    Operation.operator = "";
}

function operate(elem){
    appendToDisplay(elem);
    Operation.operator = elem;
    Operation.op1 = Operation.op2;
    Operation.op2 = "";
    console.log(Operation);
}

function calculate(){
    let result = 0;
    switch(Operation.operator){
        case "+":
            result = parseFloat(Operation.op1) + parseFloat(Operation.op2);
            break;
        case "-":
            result = parseFloat(Operation.op1) - parseFloat(Operation.op2);
            break;
        case "*":
            result = parseFloat(Operation.op1) * parseFloat(Operation.op2);
            break;
        case "/":
            result = parseFloat(Operation.op1) / parseFloat(Operation.op2);
            break;
    }
    clearDisplay();
    display.value = result;
    Operation.op2 = result;
    Operation.op1 = "";
    Operation.operator = "";
}

function erase(){
    if(!(display.value.length === 0)){
        display.value = display.value.slice(0, -1);
        Operation.op2 = Operation.op2.slice(0, -1);
        displayTop.innerHTML = displayTop.innerHTML.slice(0, -1);
    };
}

document.onkeydown = function(event) {
	var key = event.key;
    console.log(key);
    if(allowedChars.includes(key)){
        appendToDisplay(key);
    }
    if(allowedOps.includes(key)){
        operate(key);
    }
    if(key === "Enter"){
        calculate();
    }
    if(key === "Backspace"){
        erase();
    }
    if(key === "delete"){
        clearDisplay();
    }
}