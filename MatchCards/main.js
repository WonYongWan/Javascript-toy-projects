const $wrap = document.querySelector('#wrap');
const $success = document.querySelector('#success');

let targetElms = [];
let flag = 0;
let score = 0;
let startTime;
let endTime;
let totalTime;

// 카드 생성
function createCards() {
  $wrap.removeEventListener('click', cardClickEvent);
  let numOfCards = 0;
  let backgroundColor = ['yellow', 'red', 'blue', 'white', 'gray', 'green'];
  let backgroundColorClone = backgroundColor.concat(backgroundColor).sort();
  while(numOfCards < 12) {
    numOfCards++;
    $wrap.innerHTML += '<div class="card"><div class="front"></div><div class="back"></div></div>';
  }
  if(numOfCards === 12) {
    numOfCards = 0;
  }
  let cards = document.querySelectorAll('.card');
  cards.forEach(elm => {
    let random = Math.floor(Math.random() * backgroundColorClone.length);
    let randomColor = backgroundColorClone[random];
    backgroundColorClone.splice(random, 1)
    elm.style.background = randomColor;
  });
  setTimeout(() => {
    const cardAnswerInfo = setInterval(() => {
      if(numOfCards < 12) {
        cards[numOfCards].style.transform = 'rotateY(180deg)';
        numOfCards++;
      } else if(numOfCards === 12) {
        clearInterval(cardAnswerInfo);
        setTimeout(() => {
          cards.forEach(elm => {
            elm.style.transform = '';
          });
          $wrap.addEventListener('click', cardClickEvent);
        }, 1000);
      }
    }, 100); 
  }, 500);
}
createCards();

// 클릭 이벤트
function cardClickEvent(e) {
  let targetElm;
  if(e.target.parentNode !== document.body
    && e.target.parentNode !== $wrap
    && e.target.parentNode.style.transform !== 'rotateY(180deg)') {

    if(!startTime) startTime = new Date();
    targetElm = e.target.parentNode;
    targetElms.push(targetElm);
    targetElm.style.transform = 'rotateY(180deg)';
    flag++;
    if(flag > 2) {
      targetElm.style.transform = '';
    }
    if(targetElms.length === 2) {
      if(targetElms[0].style.background === targetElms[1].style.background) {
        score++;
      }
      setTimeout(() => {
        if(targetElms[0].style.background !== targetElms[1].style.background) {
          targetElms[0].style.transform = '';
          targetElms[1].style.transform = '';
        }
        targetElms.splice(0);
        flag = 0;
      }, 500);
    }
  }
  if(score === 6) {
    if(!endTime) endTime = new Date();
    totalTime = ((endTime - startTime) / 1000).toFixed(1);
    setTimeout(() => {
      $success.classList.add('on');
      $success.innerHTML += `<p>${totalTime}초 걸렸습니다!</p>`;
      $success.innerHTML += '<button id="reset">RESET</button>';
      const $reset = document.querySelector('#reset');
      $reset.addEventListener('click', gameReset);
    }, 1000);
  }
}

// 게임 초기화
function gameReset() {
  startTime = null;
  endTime = null;
  totalTime = null;
  $success.classList.remove('on');
  $success.innerHTML = '';
  $wrap.innerHTML = '';
  score = 0;
  createCards();
}