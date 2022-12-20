let $ballBox = document.querySelector('#ballBox');
let $reset = document.querySelector('button');
let count = 0;

let candidate = Array(45).fill().map((elm, idx) => idx + 1);
let shuffle = [];
while(candidate.length > 0) {
  const random = Math.floor(Math.random() * candidate.length);
  const spliceArray = candidate.splice(random, 1);
  const value = spliceArray[0];
  shuffle.push(value);
}
let winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
let bonus = shuffle[6];

for(let i = 0; i < winBalls.length; i++) {
  setTimeout(() => {
    let div = document.createElement('div');
    if(winBalls[i] < 10) {
      div.className = 'yellow';
    } else if(winBalls[i] < 20) {
      div.className = 'blue';
    } else if(winBalls[i] < 30) {
      div.className = 'red';
    } else if(winBalls[i] < 40) {
      div.className = 'gray';
    } else {
      div.className = 'green';
    }
    div.innerText = winBalls[i];
    $ballBox.appendChild(div);
  }, (i + 1) * 1000);
}
setTimeout(() => {
  let div = document.createElement('div');
  if(bonus < 10) {
      div.className = 'yellow';
    } else if(bonus < 20) {
      div.className = 'blue';
    } else if(bonus < 30) {
      div.className = 'red';
    } else if(bonus < 40) {
      div.className = 'gray';
    } else {
      div.className = 'green';
    }
    div.className += ' bonus';
  div.innerText = bonus;
  $ballBox.appendChild(div);
}, 7000);