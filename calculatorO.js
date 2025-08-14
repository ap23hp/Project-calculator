let num1;
let num2
let operator;
const anyButton=document.querySelectorAll('.btn')


const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};


// const multiply = function (...arg) {
//   return arg.reduce((acc,curr)=>acc*curr,1);
// };

const multiply=function(a,b){
    return a*b
}

const divide=function(a,b){
    return a/b
}

console.log(add(2,3))
console.log(subtract(2,3))
console.log(multiply(2,3))
console.log(divide(3,3))

const operate=function(num1,num2,operator){
if(operator==="+"){
    return add(num1,num2)
}
if(operator==="-"){
    return subtract(num1,num2)
}
if(operator==="*"){
    return multiply(num1,num2)
}
if(operator==="/"){
    return divide(num1,num2)
}

}


anyButton.forEach((btn)=>{
    return btn.addEventListener("click",function(){
        console.log(`button is clicked`)
        console.log(typeof(btn.textContent))
    })
})