const wrap = document.querySelector('.wrap');
const icon = document.querySelector('#icon');
const max = document.querySelector('.max');
const min = document.querySelector('.min');

// header event
for(let head of document.querySelectorAll('.head')) {
  head.addEventListener('click', (e) => {
    if(e.target.id === 'minimization' || e.target.parentNode.id === 'minimization') {
      wrap.classList.remove('minimizationOn');
      wrap.classList.add('minimization');
      setTimeout(() => {
        wrap.classList.add('none')
      }, 300)
    }
    if(e.target.id === 'maximize' || e.target.parentNode.id === 'maximize') {
      wrap.classList.toggle('maximize');
      max.classList.toggle('none');
      min.classList.toggle('none');
    }
    if(e.target.id === 'close' || e.target.parentNode.id === 'close') {
      icon.classList.remove('on');
      for(let i of wrap.classList) {
        if(i === 'minimization' || i === 'minimizationOn') {
          wrap.classList.remove('minimization');
          wrap.classList.remove('minimizationOn');
        }
      }
      wrap.classList.add('close');
      setTimeout(() => {
        wrap.classList.add('none')
      }, 300)
    }
  })
}

// footer event
icon.addEventListener('click', () => {
  icon.classList.add('on');
  for(let i of wrap.classList) {
    if(i === 'minimization') {
      wrap.classList.remove('none');
      setTimeout(() => {
        wrap.classList.add('minimizationOn');
      })
      setTimeout(() => {
        wrap.classList.remove('minimization');
        wrap.classList.remove('minimizationOn');
      }, 500)
    } 
    if(i === 'close') {
      wrap.classList.remove('minimization');
      wrap.classList.remove('minimizationOn');
      wrap.classList.remove('none');
      wrap.classList.remove('close');
    }
  }
});

// 계산기 event
let $operator = document.querySelector('#operator');
let $result = document.querySelector('#result');
let numOne = '';
let operator = '';
let numTwo = '';
let result = '';

document.addEventListener('keydown', (e) => {
  target = e.key;
  let num = /[0-9]/
  if(target == num) {
    console.log(target);
  }
});

const saveNum = () => (e) => {
  let target = e.target.innerText;
  if(!operator) {
    numOne += target;
    $result.value = numOne; 
  } else {
    numTwo += target;
    $result.value = numTwo;
  }
  if(operator && result) {
    result = '';
    numTwo = '';
    numTwo += target;
    $result.value = numTwo;
  }
  
  // console.log(`num1 : ${numOne}`)
  // console.log(`num2 : ${numTwo}`)
}

const saveOperator = () => (e) => {
  if(numOne) {
    let target = e.target.innerText;
    operator = target;
    $operator.value = `${numOne} ${target}`;
  }
}

function plusMinus() {
  if(!numTwo && numOne) {
    numOne = parseFloat(numOne) * -1;
    $result.value = numOne;
  } else {
    numTwo = parseFloat(numTwo) * -1;
    $result.value = numTwo;
  }
}

const saveResult = () => (e) => {
  let target = e.target.innerText;
  if(target === '=') {
    if(operator === '+') {
      result = parseFloat(numOne) + parseFloat(numTwo);
    } else if(operator === '-') {
      result = parseFloat(numOne) - parseFloat(numTwo);
    } else if(operator === '*') {
      result = parseFloat(numOne) * parseFloat(numTwo);
    } else if(operator === '/') {
      result = parseFloat(numOne) / parseFloat(numTwo);
    }
  }
  $operator.value = `${numOne} ${operator} ${numTwo} ${target}`;
  $result.value = result;
  numOne = result;
  // console.log(`result : ${result}`)
}

function clear() {
  numOne = '';
  operator = '';
  numTwo = '';
  $operator.value = '';
  $result.value = '0';
}

function remove() {
  if(!numTwo && !operator && numOne) {
    numOne = numOne.slice(0, -1);
    if(numOne.length <= 0) {
      $result.value = '0';
    } else {
      $result.value = numOne;
    }
  } else {
    numTwo = numTwo.slice(0, -1);
    if(numTwo.length <= 0) {
      $result.value = '0';
    } else {
      $result.value = numTwo;
    }
  }
}

for(let num of document.querySelectorAll('.num')) {
  num.addEventListener('click', saveNum());
}
for(let operator of document.querySelectorAll('.operator')) {
  operator.addEventListener('click', saveOperator());
}
document.querySelector('#plus-minus').addEventListener('click', plusMinus);
document.querySelector('.result').addEventListener('click', saveResult());
document.querySelector('#clear').addEventListener('click', clear);
document.querySelector('#remove').addEventListener('click', remove);