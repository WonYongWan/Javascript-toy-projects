const $wrap = document.querySelector('#wrap');

createCards();

function createCards() {
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
          let flag = 0;
          let score = 0;
          let targetElms = [];
          $wrap.addEventListener('click', cardClickEvent(flag, targetElms, score));
        }, 1000);
      }
    }, 100); 
  }, 500);
}

const cardClickEvent = (flag, targetElms, score) => (e) => {
  let targetElm;
  if(e.target.parentNode !== document.body
    && e.target.parentNode !== $wrap
    && e.target.parentNode.style.transform !== 'rotateY(180deg)') {

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
}