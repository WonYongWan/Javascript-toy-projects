let resultList = document.querySelector('.resultList');
let numList = document.querySelector('.numList');
let submitBtn = document.querySelector('.submit');
let billBoard = document.querySelector('#billBoard');
let scoreBoard = document.querySelector('#scoreBoard');
let baseball = document.querySelector('.baseball');
let scoreText = document.querySelector('.scoreText')

// 정답
let answer = [];
for(let i = 0; i < 4; i++) {
  let random = Math.floor(Math.random() * 9 + 1);
  if(answer.indexOf(random) === -1) {
    answer.push(random);
  } else {
    i--;
  }
}

// 유저에게 보이는 카드 목록
let numbers = [];
for(let i = 0; i < 9; i++) {
  numList.innerHTML += `<li class="num num-${i + 1} normal">${i + 1}</li>`;
}

// 유저 입력 값
let result = [];

// 유저 카드 선택
function userNumber(e) {
  for(let target of e.target.classList) {
    if(target === 'normal') {
      if(result.length < 4) {
        e.target.classList.remove('normal');
        e.target.classList.add('choice');
        result.push(parseInt(e.target.textContent));
        result = result.filter((elm, index) => result.indexOf(elm) === index);
      }
    }
    if(target === 'choice') {
      e.target.classList.remove('choice');
      e.target.classList.add('normal');
      for(let arrNum = 0; arrNum < result.length; arrNum++) {
        if(result[arrNum] === parseInt(e.target.textContent)) {
          result = result.filter((elm) => elm !== result[arrNum])
        }
      }
    }
  }
  if(result.length === 4) {
    billBoard.classList.add('submit');
    submitBtn.classList.remove('none');
  } else {
    billBoard.classList.remove('submit');
    submitBtn.classList.add('none');
  }
  userNumList(e);
} 

// 유저 선택 카드 목록
function userNumList(e) {
  for(let target of e.target.classList) {
    if(target === 'choice') {
      for(let i of result) {
        if(i === parseInt(e.target.textContent)) {
          resultList.innerHTML += `<li class='choiceNum'>${i}</li>`;
        }
      }
    }
    if(target === 'normal') {
      let choiceNums = document.querySelectorAll('.choiceNum')
      for(let choiceNum of choiceNums) {
        if(choiceNum.textContent === e.target.textContent) {
          choiceNum.remove();
        }
      }
    }
  }
}

// 유저 선택 카드 목록 제출 및 비교
let turn = 0;
function numCompare() {
  window.removeEventListener('mouseover', submitAni);
  billBoard.style.transform = 'translateY(-200px)';
  setTimeout(() => {
    window.addEventListener('mouseover', submitAni);
    resultList.innerHTML = '';
  }, 100)
  for(let numItem of num) {
    numItem.classList.remove('choice');
    numItem.classList.add('normal');
  }
  turn += 1;
  if(turn > 9) {
    setTimeout(() => {
      alert('게임종료')
    }, 3000);
  }
  let strike = 0;
  let ball = 0;
  submitBtn.classList.add('none');
  for(let i = 0; i < answer.length; i++) {
    const index = result.indexOf(answer[i]);
    if(index > -1) {
      if(index === i) {
        strike += 1;
        if(strike === 4) {
          alert('게임 승리');
        }
      } else {
        ball += 1;
      }
    }
  }
  gameScore(turn, strike, ball);
  gameRecord(result);
  baseballAni(strike, ball);
  result = [];
}
// 제출 후 야구공 애니메이션
function baseballAni(strike, ball) {
  if(strike === 0 && ball === 0) {
    baseball.classList.add('ani2');
    setTimeout(() => {
      scoreText.innerHTML = 'Safety!';
    }, 800);
    setTimeout(() => {
      baseball.classList.remove('ani2');
      setTimeout(() => {
        scoreText.innerHTML = '';
      }, 1000)
    }, 1200);
  } else {
    baseball.classList.add('ani1');
    setTimeout(() => {
      scoreText.innerHTML = `<span>${strike}</span> Strike  <span>${ball}</span> Ball`;
    }, 800);
    setTimeout(() => {
      baseball.classList.remove('ani1');
      setTimeout(() => {
        scoreText.innerHTML = '';
      }, 1000);
    }, 1200);
  }
  setTimeout(() => {
    numList.classList.remove('hide');
    billBoard.classList.remove('submit');
    billBoard.style.transform = 'translateY(0)';
  }, 2000)
}

// 전광판 스코어 정보
let scoreTurn = document.querySelectorAll('.score.turn > li');
let scoreStrike = document.querySelectorAll('.score.strike > li');
let scoreBall = document.querySelectorAll('.score.ball > li');

function gameScore(turn, strike, ball) {
  let span = document.createElement('span');
  for(let i = 0; i < turn; i++) {
    scoreTurn[i].append(span)
  }
  for(let i of scoreStrike) {
    i.innerHTML = '';
  }
  for(let i = 0; i < strike; i++) {
    scoreStrike[i].innerHTML += `<span></span>`;
  }
  for(let i of scoreBall) {
    i.innerHTML = '';
  }
  for(let i = 0; i < ball; i++) {
    scoreBall[i].innerHTML += `<span></span>`;
  }
}

// 전광판 기록 정보
let record = document.querySelector('#record > .scoreWrap');
let recordLi = document.createElement('li');
let scoreTurnWrap = document.querySelector('.score.turn');
let scoreStrikeWrap = document.querySelector('.score.strike');
let scoreBallWrap = document.querySelector('.score.ball');


function gameRecord(result) {
  let liClone = recordLi.cloneNode(true);
  let turnClone = scoreTurnWrap.cloneNode(true);
  let strikeClone = scoreStrikeWrap.cloneNode(true);
  let ballClone = scoreBallWrap.cloneNode(true);
  let resultListClone = resultList.cloneNode();
  for(let i of result) {
    resultListClone.innerHTML += `<li>${i}</li>`;
  }

  liClone.append(turnClone, strikeClone, ballClone, resultListClone);
  record.append(liClone);

  let recordLiAll = document.querySelectorAll('#record > .scoreWrap > li');
  
  record.scrollTop = record.scrollHeight;
  record.addEventListener('scroll', recordScroll(recordLiAll));
}

const recordScroll = (recordLiAll) => (e) => {
  for(let i of recordLiAll) {
    i.style.opacity = '.3';
    if(record.scrollTop >= i.offsetTop - 130 && record.scrollTop <= i.offsetTop + 30) {
      i.style.opacity = '1';
    }
  }
}

function submitAni(e) {
  if(e.target.className === 'submit') {
    numList.classList.add('hide');
    scoreBoard.classList.add('submit');
  } else {
    numList.classList.remove('hide');
    scoreBoard.classList.remove('submit');
  }
}

// 
let num = document.querySelectorAll('.num');
for(let numItem of num) {
  numItem.addEventListener('click', userNumber);
}
submitBtn.addEventListener('click', numCompare);
window.addEventListener('mouseover', submitAni);