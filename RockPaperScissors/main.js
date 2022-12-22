let $computer = document.querySelector('.computer');
let $rock = document.querySelector('#rock');
let $btn = document.querySelectorAll('.btn')
let $paper = document.querySelector('#paper');
let $scissors = document.querySelector('#scissors');
let $score = document.querySelector('.score');
let $computerScore = document.querySelector('#computerScore');
let $myScore = document.querySelector('#myScore');
let $allResult = document.querySelectorAll('.result');
let $victory = document.querySelector('#victory');
let $defeat = document.querySelector('#defeat');
let $reset = document.querySelectorAll('.reset');

const computerImg = {
  rock: 'url(./images/rock.png)',
  paper: 'url(./images/paper.png)',
  scissors: 'url(./images/scissors.png)'
}

let computerImgLink = 'rock';

let changeComputerHand = () => {
  if(computerImgLink === 'rock') {
    computerImgLink = 'paper';

  } else if(computerImgLink === 'paper') {
    computerImgLink = 'scissors';

  } else if(computerImgLink === 'scissors') {
    computerImgLink = 'rock';

  }
  $computer.style.backgroundImage = computerImg[computerImgLink];
}

let changeImgInfiniteloop = setInterval(changeComputerHand, 100);

const scoreTable = {
  rock: 0,
  paper: -1,
  scissors: 1
}

// 클릭 이벤트
let clickable = true;
let computer = 0;
let me = 0;
const clickBtn = (e) => {
  if(clickable) {
    clickable = false;
    
    e.target.classList.add('on');
    for(let i of $btn) {
      i.removeEventListener('click', clickBtn);
    }
    clearInterval(changeImgInfiniteloop);

    const myChoice = e.target.id === 'rock'
      ? 'rock'
      : e.target.id === 'paper'
        ? 'paper'
        : 'scissors';
    const myScore = scoreTable[myChoice];
    const computerScore = scoreTable[computerImgLink];
    const diff = myScore - computerScore;
    // || 를 includes로 대체
    if([-1, 2].includes(diff)) {
      me++;
      $myScore.innerText = me;
    } else if([1, -2].includes(diff)) {
      computer++;
      $computerScore.innerText = computer;
    }

    console.log(computer, me)
  }

  if(me >= 3) {
    setTimeout(() => {
      clickable = true;
      $victory.classList.remove('none');
    }, 1000);
    for(let i of $reset) {
      i.addEventListener('click', resetGame(clickable, computer, me));
    }
    computer = 0;
    me = 0;
  } else if(computer >= 3) {
    setTimeout(() => {
      clickable = true;
      $defeat.classList.remove('none');
    }, 1000);
    for(let i of $reset) {
      i.addEventListener('click', resetGame(clickable, computer, me));
    }
    computer = 0;
    me = 0;
  } else {
    setTimeout(() => {
      clickable = true;
      for(let i of $btn) {
        i.classList.remove('on');
        i.addEventListener('click', clickBtn);
      }
      clearInterval(changeImgInfiniteloop);
      changeImgInfiniteloop = setInterval(changeComputerHand, 100);
    }, 1000);
  }
}

const resetGame = (clickable, computer, me) => () => {
  console.log(clickable)
  for(let i of $allResult) {
    i.classList.add('none');
  }
  computer = 0;
  me = 0;
  $computerScore.innerText = '0';
  $myScore.innerText = '0';
  for(let i of $btn) {
    i.classList.remove('on');
    i.addEventListener('click', clickBtn);
  }
  clearInterval(changeImgInfiniteloop);
  changeImgInfiniteloop = setInterval(changeComputerHand, 100);
}

$rock.addEventListener('click', clickBtn);
$paper.addEventListener('click', clickBtn);
$scissors.addEventListener('click', clickBtn);