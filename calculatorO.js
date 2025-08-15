
let num1 = "";
let num2 = "";
let operator;
let step = 1;
let justCalculated = false; // tracks if last action was "="
const displayscreen = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");
const backSpacebtn=document.querySelector("#erase")


const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
 return a / b;

};

const operate = function (num1, operator, num2) {
  if (operator == "+") {
    return add(num1, num2);
  }
  if (operator == "-") {
    return subtract(num1, num2);
  }
  if (operator == "X") {
    return multiply(num1, num2);
  }
  if (operator == "/" && Number(num2) === 0) {
    return null
   
  }
    if (operator == "/" ) {
    return divide(num1, num2);
  }
  
};

function roundResult(num) {
  return Math.round(num * 1e4) / 1e4; // rounds to 4 decimal places
}
buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    console.log(`Step: ${step}, num1: ${num1}, num2: ${num2}, operator: ${operator}`);

    // --- NUMBER or DECIMAL handling ---
    if (   ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9","."].includes(
        btn.textContent) ){
            if (justCalculated) {
    num1 = "";
    num2 = "";
    operator = undefined;
    step = 1;
    justCalculated = false;
}
      if (step === 1) {
        if (btn.textContent === "." && num1.includes(".")) 
            return; 
        num1 += btn.textContent;
        displayscreen.textContent = num1;
      } 
      else if (step === 2) {
        if (btn.textContent === "." && num2.includes(".")) return;
        num2 += btn.textContent;
        displayscreen.textContent = num2;
      }
      return; // Stop here so it doesn’t fall into operator check
    }

    // --- OPERATOR handling ---
    if (["+", "-", "X", "/"].includes(btn.textContent)) {
          justCalculated = false;
      if (step === 1 && num1 !== "") {
        operator = btn.textContent;
        step = 2;
      } else if (step === 2 && num2 === "") {
        // replace operator if pressed again before num2 entered
        operator = btn.textContent;
      } else if (step === 2 && num2 !== "") {
        // Chain calculation
        num1 = String(operate( Number(num1), operator,Number(num2)));
        num2 = "";
        operator = btn.textContent;
        displayscreen.textContent = num1;
        step=2
      }
      return;
    }

    // --- EQUALS handling ---
    if (btn.textContent === "=") {
       justCalculated = true;
 if (num1 !== "" && num2 !== "" && operator) {
        let result = operate(Number(num1), operator, Number(num2));
          if (result === null) { // divide by zero detected
    displayscreen.textContent = "Nice try, Einstein 🙃";}

          else{    result = roundResult(result); // avoid overflow
        num1 = String(result);
        num2 = "";
        operator = undefined;
           displayscreen.textContent = num1;
        step = 1;
          }
      }else {
    // ❌ Do nothing if calculation is incomplete
    // Optional: show an error message or blink the screen
    console.warn("Incomplete calculation — ignoring '=' press");
  }
      return;
    }

    // --- CLEAR handling ---
    if (btn.textContent === "C") {
      num1 = "";
      num2 = "";
      operator = undefined;
      step = 1;
      displayscreen.textContent = "";
      return;
    }
  });
});

backSpacebtn.addEventListener("click", function(){
let lastelement=displayscreen.textContent.slice(0,-1)
displayscreen.textContent=lastelement
  if (step === 1) {
    num1 = num1.slice(0, -1);
  } else if (step === 2) {
    num2 = num2.slice(0, -1);
  }
})

