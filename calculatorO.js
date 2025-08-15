let num1;
let num2;
let operator;
let step = 1; //→ waiting for first number
//Step= 2 → waiting for second number
//Step 3 → waiting for operator
//Step 4 → if another number is clicked → calculate result

const anyButton = document.querySelectorAll(".btn");
const displayscreen = document.querySelector(".display");

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

// const multiply = function (...arg) {
//   return arg.reduce((acc,curr)=>acc*curr,1);
// };

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

// console.log(add(2,3))
// console.log(subtract(2,3))
// console.log(multiply(2,3))
// console.log(divide(3,3))

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
  if (operator == "/") {
    return divide(num1, num2);
  }
};

anyButton.forEach((btn) => {
  btn.addEventListener("click", function () {
    console.log(`button of any number is clicked`);
    // STEP 1: num1 ko build karo (multi-digit allowed)
    if (
      step == 1 &&
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
        btn.textContent
      )
    ) {
      if (num1 === undefined) {
        console.log(`step one is started................. `);
        let num = Number(btn.textContent);
        num1 = num;
        step = 1;
        console.log(`this is num1 : ${num1} `);
      } else {
        console.log(`again user has clicked on a number ...................`);
        num1 = Number(String(num1) + btn.textContent);
        console.log(`second digit is concatenated with number 1 digit`);
      }
      displayscreen.textContent = String(num1);
    }
    // STEP 1 -> STEP 2: operator aaya to step badlo
    else if (
      step == 1 &&
      ["+", "-", "/", "X"].includes(btn.textContent) &&
      num1 !== undefined
    ) {
      console.log(
        `step 2 has started to select operator.......................`
      );
      let operatorUse = btn.textContent;
      operator = operatorUse;
      step = 2;
      displayscreen.textContent = String(num1);
      console.log(
        `this is operator type user selected : ${operator} and stepincreased to  step number : ${step}`
      );
    } else if (
      step == 2 &&
      ["+", "-", "/", "X"].includes(btn.textContent) &&
      num2 == undefined
    ) {
      let operatorUse = btn.textContent;
      operator = operatorUse;
      step = 2;
      displayscreen.textContent = String(num1);
      console.log(
        `another operator is pressed again by user`,
        `this is operator type user selected again: ${operator}`,`operator replaced from ${operator} to ${btn.textContent}`
      );
    } else if (
      step == 2 &&
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
        btn.textContent
      ) &&
      operator !== undefined
    ) {
      console.log(`step 2 has started...................`);
      if (num2 === undefined) {
        num2 = Number(btn.textContent);
      } else {
        num2 = Number(String(num2) + btn.textContent);
      }
      displayscreen.textContent = String(num2);
      console.log(`this is num2 : ${num2} and this is step number : ${step}`);
    }

    // STEP 2 -> STEP 3: '=' button press (calculation)
    else if (step === 2 && btn.textContent === "=" && num2 !== undefined) {
      console.log(
        `equal to sign is clicked to check result....................`
      );
      let result = operate(num1, operator, num2);
      displayscreen.textContent = result;
      num1 = undefined
      num2 = undefined;
      step = 1;

      console.log(num1, "num1 became after result");
    } else if (
      step === 2 &&
      ["+", "-", "/", "X"].includes(btn.textContent) &&
      num2 !== undefined
    ) {
      console.log(
        `another operator is clicked so we will evaluate result ....................`
      );
      let result = operate(num1, operator, num2);
      displayscreen.textContent = result;
      num1 = result;
      num2 = undefined;
      operator = btn.textContent;
      step = 2;
    }
    if (btn.textContent == "C") {
      console.log(`clear is pressed`);
      displayscreen.textContent = "";
      num1 = undefined;
      num2 = undefined;
      operator = undefined;
      step = 1;
    }
    if (operator === "/" && Number(num2) === 0) {
      displayscreen.textContent = "Nice try, Einstein 🙃";
      num1 = undefined;
      num2 = undefined;
      operator = undefined;
      step = 1;
      return; // stop further calculation
    }
  });
});
