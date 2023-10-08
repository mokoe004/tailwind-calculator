const display = document.getElementById("display");
display.placeholder = "0";
const displayTop = document.getElementById("display-top");

let Operation = {
  op1: "",
  op2: "",
  operator: "",
};

let allowedChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
let allowedOps = ["+", "-", "/", "*"];

let isDisplayEmpty = () => display.value.length === 0;
let lastChar = () => display.value[display.value.length - 1];

function appendToDisplay(elem) {
  display.value += elem;
  displayTop.appendChild(document.createTextNode(elem));
  Operation.op2 = Operation.op2 + elem;
}

function clearDisplay() {
  display.placeholder = "0";
  display.value = "";
  displayTop.innerHTML = "";
  Operation.op1 = "";
  Operation.op2 = "";
  Operation.operator = "";
}

function operate(elem) {
  if (!isDisplayEmpty()) {
    //Append if last char is not an operator, else change the last char
    if (allowedChars.includes(display.value[display.value.length - 1])) {

      appendToDisplay(elem);
      Operation.operator = elem;
      Operation.op1 = Operation.op2;
      Operation.op2 = "";
    } else {
      display.value = display.value.slice(0, -1);
      displayTop.innerHTML = displayTop.innerHTML.slice(0, -1);
      appendToDisplay(elem);
      Operation.operator = elem;
    }
  } else if (elem === "-") {
    appendToDisplay(elem);
  } else if (elem === ".") {
    //funktioniert nicht wegen Typumwandlung in appendToDisplay
    appendToDisplay("0");
    appendToDisplay(".");
  }
  console.log(Operation);
}

function calculate() {
  let result = 0;
  switch (Operation.operator) {
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
  display.value = result;
  Operation.op2 = result;
  Operation.op1 = "";
  Operation.operator = "";
}

function erase() {
  if (!isDisplayEmpty()) {
    if(allowedOps.includes(lastChar())){
      Operation.operator = "";
     }
    display.value = display.value.slice(0, -1); 
    Operation.op2 = Operation.op2.slice(0, -1);
    displayTop.innerHTML = displayTop.innerHTML.slice(0, -1);
  }
}

//Switch sign of the number at the Display
function switchSign() {
  if (!isDisplayEmpty()) {
    if (display.value[0] === "-") {
      display.value = display.value.slice(1);
      Operation.op2 = Operation.op2.slice(1);
      displayTop.innerHTML = displayTop.innerHTML.slice(1);
    } else {
      display.value = "-" + display.value;
      Operation.op2 = "-" + Operation.op2;
      displayTop.innerHTML = "-" + displayTop.innerHTML;
    }
  }
}

//Keyboard funktion
document.onkeydown = function (event) {
  let key = event.key;
  console.log(key);
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
