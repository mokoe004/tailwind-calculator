const display = document.getElementById("display");
display.placeholder = "0";
const displayTop = document.getElementById("display-top");

let topFree = true;
let opFree = true;

let allowedChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
let allowedOps = ["+", "-", "/", "*"];

let isDisplayEmpty = () => display.value.length === 0;
let lastChar = () => display.value[display.value.length - 1];

function appendToDisplay(elem) {
  display.value += elem;
  if(topFree){
    displayTop.appendChild(document.createTextNode(elem));
  }
}

function clearDisplay() {
  display.placeholder = "0";
  display.value = "";
  displayTop.innerHTML = "";
  topFree = true;
}

function operate(elem) {
  if (!isDisplayEmpty()) {
    //Append if last char is not an operator, else change the last char
    if (allowedChars.includes(lastChar()) && opFree) {
      appendToDisplay(elem);
      console.log("case 1");
    }
    if(allowedOps.includes(lastChar())){
      display.value = display.value.slice(0, -1);
      if(topFree){
        displayTop.innerHTML = displayTop.innerHTML.slice(0, -1);
      }
      appendToDisplay(elem);
      console.log("case 2");
    }
    console.log("opFree: " + opFree);
    opFree = false;
  } else if ((elem === "-") && allowedChars.includes(lastChar())) {
    appendToDisplay(elem);
  } else if (elem === ".") {
    //funktioniert nicht wegen Typumwandlung in appendToDisplay
    appendToDisplay("0");
    appendToDisplay(".");
  }
}

function calculate() {
  let result = 0;
  let r = parseOperation(display.value);
  switch (r.operator) {
    case "+":
      result = parseFloat(r.operand1) + parseFloat(r.operand2);
      break;
    case "-":
      result = parseFloat(r.operand1) - parseFloat(r.operand2);
      break;
    case "*":
      result = parseFloat(r.operand1) * parseFloat(r.operand2);
      break;
    case "/":
      result = parseFloat(r.operand1) / parseFloat(r.operand2);
      break;
  }
  display.value = result;
  if(!topFree){
    displayTop.innerHTML = r.operand1 + r.operator + r.operand2;
  }else{
    topFree = false;
  }
  opFree = true;
}

function erase() {
  if (!isDisplayEmpty()) {
    if(allowedOps.includes(lastChar()) && !opFree){
      opFree = true;
    }
    display.value = display.value.slice(0, -1); 
    if(topFree){
    displayTop.innerHTML = displayTop.innerHTML.slice(0, -1);
    }
  }
}

//Switch sign of the number at the Display
function switchSign() {
  if (!isDisplayEmpty()) {
    if (display.value[0] === "-") {
      display.value = display.value.slice(1);
      if(topFree){
        displayTop.innerHTML = displayTop.innerHTML.slice(1);
      }
    } else {
      display.value = "-" + display.value;
      if(topFree){
        displayTop.innerHTML = "-" + displayTop.innerHTML;
      }
    }
  }
}

//Keyboard funktion
document.onkeydown = function (event) {
  let key = event.key;
  if (allowedChars.includes(key)) {
    appendToDisplay(key);
  }
  if (allowedOps.includes(key)) {
    operate(key);
  }
  if (key === "Enter") {
    calculate();
  }
  if (key === "Backspace") {
    erase();
  }
  if (key === "delete") {
    clearDisplay();
  }
};

function parseOperation(str) {
  let operator = "";
  let operand1 = "";
  let minus = false;
  let operand2 = "";

  if(str[0] === "-"){
    str = str.slice(1,str.length);
    minus = true;
  }
  for (let i = 0; i < str.length; i++) {
    if (allowedOps.includes(str[i])) {
      operator = str[i];
      operand1 = str.slice(0, i);
      operand2 = str.slice(i + 1);
      break;
    }
  }

  if(minus){
    operand1 = "-" + operand1;
  }
  return { operator, operand1, operand2 };
}

