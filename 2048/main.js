const $tileContainer = document.querySelector('#tile-container');
const $newGameBtn = document.querySelector('#reset-wrap > button');
const $gmaeMessage = document.querySelectorAll('.game-message');
const $gmaeOver = document.querySelector('.gmae-over');
const $gmaeWin = document.querySelector('.gmae-win');
const $tryBtn = document.querySelectorAll('.try');
const $row = document.querySelectorAll('.row');
const $currentScoreBox = document.querySelector('.score-box');
const $currentScore = document.querySelector('.score-box > p');
const $bestScoreBox = document.querySelector('.best-box');
const $bestScore = document.querySelector('.best-box > p');

// 상태관리 배열
function stateManagement() {
  const $tile = document.querySelectorAll('.tile');
  let stateArray = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]];

  $tile.forEach((elm) => {
    let elmNumber = elm.textContent;
    let posNumberOne = elm.classList[2][14] - 1;
    let posNumberTwo = elm.classList[2][16] - 1;
    stateArray[posNumberOne].splice(posNumberTwo, 1, parseInt(elmNumber));
  });
  return stateArray;
}

// 타일 위치 생성
function createPositionNumber() {
  let stateArray = stateManagement();
  let emptyTilePos = [];
  stateArray.forEach((elm, i) => {
    stateArray.forEach((elm, j) => {
      if(stateArray[i][j] !== 0) return;
      emptyTilePos.push([i, j]);
    });
  });
  return emptyTilePos;
}

// 타일 숫자 생성
function createTileNumber() {
  let tileValueArray = Array(8).fill(2).concat(Array(2).fill(4));
  let tileRandom = Math.floor(Math.random() * tileValueArray.length);
  return tileValueArray[tileRandom];
}

// 타일 생성
function createTileElement() {
  // .tile-inner 생성
  let tileInnerNum = createTileNumber();
  let tileInner = document.createElement('div');
  tileInner.setAttribute('class', 'tile-inner');
  tileInner.textContent = tileInnerNum;

  // .tile 생성
  let tile = document.createElement('div');
  let emptyTilePos = createPositionNumber();
  let emptyRandom = Math.floor(Math.random() * emptyTilePos.length);
  tile.setAttribute('class', `tile tile-${tileInnerNum} tile-position-${parseInt(emptyTilePos[emptyRandom][0]) + 1}-${parseInt(emptyTilePos[emptyRandom][1]) + 1} tile-new`);
  
  // .tile = .tile-inner
  tile.append(tileInner);
  return tile;
}

// 시작: 2개의 타일 배치
function startGameSet() {
  if($tileContainer.innerText) return;

  let fragment = new DocumentFragment();
  let firstTile = createTileElement();
  let secondTile = createTileElement();
  while(firstTile.classList[2] === secondTile.classList[2]) {
    secondTile = createTileElement();
  }
  fragment.append(firstTile);
  $tileContainer.append(fragment);
  fragment.append(secondTile);
  $tileContainer.append(fragment);
}
startGameSet();

// 타일 합치기
const tileMerged = (replaceTile, replaceNumberOne, replaceNumberTwo) => {
  let tileInner = document.createElement('div');
  tileInner.setAttribute('class', 'tile-inner');
  tileInner.textContent = parseInt(replaceTile.textContent) + parseInt(replaceTile.textContent);

  let tile = document.createElement('div');
  tile.setAttribute('class', `tile tile-${tileInner.textContent} tile-position-${replaceNumberOne}-${replaceNumberTwo} tile-merged`);
  tile.append(tileInner);

  let fragment = new DocumentFragment();
  fragment.append(tile);

  // 스코어 애니메이션
  let currentScoreBoxDiv = document.querySelectorAll('.score-box > div');
  currentScoreBoxDiv.forEach(elm => {elm.remove()});
  let currentScoreDiv = document.createElement('div');

  currentScoreDiv.textContent = `+${tileInner.textContent}`;
  $currentScoreBox.append(currentScoreDiv);
  $currentScore.textContent = parseInt($currentScore.textContent) + parseInt(tileInner.textContent);

  if(parseInt($currentScore.textContent) >= parseInt($bestScore.textContent)) {
    let bestScoreBoxDiv = document.querySelectorAll('.best-box > div');
    bestScoreBoxDiv.forEach(elm => {elm.remove()});
    let bestScoreDiv = document.createElement('div');
    bestScoreDiv.textContent = `+${tileInner.textContent}`;
    $bestScoreBox.append(bestScoreDiv);
    $bestScore.textContent = $currentScore.textContent;
  }
  
  $tileContainer.append(fragment);
}

// 키보드 이벤트 발생 시 타일 배치
function playTile() {
  let fragment = new DocumentFragment();
  let playTile = createTileElement();
  fragment.append(playTile);
  $tileContainer.append(fragment);
}

// 새로운 게임 시작
function newGameStart() {
  window.addEventListener('keydown', KeydownEvent);
  $tileContainer.innerHTML = '';
  $gmaeMessage.forEach(elm => elm.classList.add('none'));
  $currentScore.textContent = '0';
  startGameSet();
}
$newGameBtn.addEventListener('click', newGameStart);

$tryBtn.forEach(elm => {
  elm.addEventListener('click', newGameStart);
});

// 게임 패배 또는 승리 체크
function gameOverOrWinCheck() {
  // 게임 승리 체크
  let zeroCheckArray = [];
  stateManagement().forEach(elm => {
    zeroCheckArray = zeroCheckArray.concat(elm);
  });

  // 게임 승리
  for(let i = 0; i < zeroCheckArray.length; i++) {
    if(zeroCheckArray[i] === 2048) {
      $gmaeWin.classList.remove('none');
      window.removeEventListener('keydown', KeydownEvent);
    }
  }

  // 게임 패배 체크
  let zeroCheckNum = 16;
  let gameOverCheck = 0;
  let stateArray = stateManagement();
  for(let i = 0; i < zeroCheckArray.length; i++) {
    if(zeroCheckArray[i] !== 0) {
      zeroCheckNum -= 1;
    }
  }
  if(zeroCheckNum === 0) {
    for(let i = 0; i <= 3; i++) {
      for(let j = 0; j <= 3; j++) {
        if(i < 3) {
          if(gameOverCheck >= 0) {
            if(stateArray[i][j] === stateArray[i + 1][j]) {
              gameOverCheck -= 1;
            };
          }
        }
        if(j < 3) {
          if(gameOverCheck >= 0) {
            if(stateArray[i][j] === stateArray[i][j + 1]) {
              gameOverCheck -= 1;
            };
          }
        }
      }
    }
    for(let i = 3; i >= 0; i--) {
      for(let j = 3; j >= 0; j--) {
        if(i > 0) {
          if(gameOverCheck >= 0) {
            if(stateArray[i][j] === stateArray[i - 1][j]) {
              gameOverCheck -= 1;
            };
          }
        }
        if(j > 0) {
          if(gameOverCheck >= 0) {
            if(stateArray[i][j] === stateArray[i][j - 1]) {
              gameOverCheck -= 1;
            };
          }
        }
      }
    }
    // 게임 패배
    if(gameOverCheck >= 0) {
      $gmaeOver.classList.remove('none');
      window.removeEventListener('keydown', KeydownEvent);
    } 
  }
}

// 키보드 이벤트
function KeydownEvent(e) {
  if(e.key !== 'ArrowUp' && e.key !== 'ArrowLeft' && e.key !== 'ArrowDown' && e.key !== 'ArrowRight') return;

  const $tile = document.querySelectorAll('.tile');
  $tile.forEach(elm => {
    if(elm.classList.contains('tile-new')) elm.classList.remove('tile-new');
  });

  // tile-merged 제거 및 중복 타일 제거
  const $tileMerged = document.querySelectorAll('.tile-merged');
  $tileMerged.forEach(elm => {
    let $overlapTile = document.querySelectorAll(`.${elm.classList[2]}`);
    $overlapTile.forEach(elm => {
      if(elm.classList[3] === undefined) {
        elm.remove();
      }
    });
    elm.classList.remove('tile-merged');
  });

  // 타일 움직임 발생 시 새로운 타일 생성을 위한 플래그 변수
  let tileMovementCheck = false;
  let compareNum;

  // ArrowUp
  if(e.key === 'ArrowUp') {
    for(let i = 0; i <= 3; i++) {
      for(let j = 0; j <= 3; j++) {
        let stateArray = stateManagement();
        let replaceTile;
        let replaceNumberOne;
        let replaceNumberTwo;
        
        if(i > 0) {
          if(document.querySelector(`.tile-position-${i + 1}-${j + 1}`)) {
            replaceTile = document.querySelector(`.tile-position-${i + 1}-${j + 1}`);
            replaceNumberOne = parseInt(replaceTile.classList[2][14]);
            replaceNumberTwo = parseInt(replaceTile.classList[2][16]);
            compareNum = replaceNumberOne;
  
            for(let k = i - 1; k >= 0; k--) {
              if(stateArray[k][j] === 0) {
                replaceNumberOne -= 1;
                replaceTile.classList.replace(replaceTile.classList[2], `tile-position-${replaceNumberOne}-${replaceNumberTwo}`);
              }
            }
            
            if(replaceNumberOne > 1) {
              stateManagement();
              let findMergedTile = document.querySelectorAll(`.tile-position-${replaceNumberOne - 1}-${replaceNumberTwo}`);
              if(findMergedTile.length < 2) {
                // textContent를 얻기 위한 변수
                replaceTile = document.querySelector(`.tile-position-${replaceNumberOne}-${j + 1}`);

                if(stateArray[replaceNumberOne - 2][j] === parseInt(replaceTile.textContent)) {
                  replaceNumberOne -= 1;
                  replaceTile.classList.replace(replaceTile.classList[2], `tile-position-${replaceNumberOne}-${replaceNumberTwo}`);
                  tileMerged(replaceTile, replaceNumberOne, replaceNumberTwo);
                }
              }
            }

            if(replaceNumberOne !== compareNum) {
              tileMovementCheck = true;
            }
          }
        }
      }
    }
  }

  // ArrowLeft
  if(e.key === 'ArrowLeft') {
    for(let i = 0; i <= 3; i++) {
      for(let j = 0; j <= 3; j++) {
        let stateArray = stateManagement();
        let replaceTile;
        let replaceNumberOne;
        let replaceNumberTwo;
        
        if(j > 0) {
          if(document.querySelector(`.tile-position-${i + 1}-${j + 1}`)) {
            replaceTile = document.querySelector(`.tile-position-${i + 1}-${j + 1}`);
            replaceNumberOne = parseInt(replaceTile.classList[2][14]);
            replaceNumberTwo = parseInt(replaceTile.classList[2][16]);
            compareNum = replaceNumberTwo;
  
            for(let k = j - 1; k >= 0; k--) {
              if(stateArray[i][k] === 0) {
                replaceNumberTwo -= 1;
                replaceTile.classList.replace(replaceTile.classList[2], `tile-position-${replaceNumberOne}-${replaceNumberTwo}`);
              }
            }
            
            if(replaceNumberTwo > 1) {
              stateManagement();
              let findMergedTile = document.querySelectorAll(`.tile-position-${replaceNumberOne}-${replaceNumberTwo - 1}`);
              if(findMergedTile.length < 2) {
                // textContent를 얻기 위한 변수
                replaceTile = document.querySelector(`.tile-position-${replaceNumberOne}-${replaceNumberTwo}`);

                if(stateArray[i][replaceNumberTwo - 2] === parseInt(replaceTile.textContent)) {
                  replaceNumberTwo -= 1;
                  replaceTile.classList.replace(replaceTile.classList[2], `tile-position-${replaceNumberOne}-${replaceNumberTwo}`);
                  tileMerged(replaceTile, replaceNumberOne, replaceNumberTwo);
                }
              }
            }

            if(replaceNumberTwo !== compareNum) {
              tileMovementCheck = true;
            }
          }
        }
      }
    }
  }

  // ArrowDown
  if(e.key === 'ArrowDown') {
    for(let i = 3; i >= 0; i--) {
      for(let j = 0; j <= 3; j++) {
        let stateArray = stateManagement();
        let replaceTile;
        let replaceNumberOne;
        let replaceNumberTwo;
        
        if(i < 3) {
          if(document.querySelector(`.tile-position-${i + 1}-${j + 1}`)) {
            replaceTile = document.querySelector(`.tile-position-${i + 1}-${j + 1}`);
            replaceNumberOne = parseInt(replaceTile.classList[2][14]);
            replaceNumberTwo = parseInt(replaceTile.classList[2][16]);
            compareNum = replaceNumberOne;
  
            for(let k = i + 1; k <= 3; k++) {
              if(stateArray[k][j] === 0) {
                replaceNumberOne += 1;
                replaceTile.classList.replace(replaceTile.classList[2], `tile-position-${replaceNumberOne}-${replaceNumberTwo}`);
              }
            }
            
            if(replaceNumberOne < 4) {
              stateManagement();
              let findMergedTile = document.querySelectorAll(`.tile-position-${replaceNumberOne + 1}-${replaceNumberTwo}`);
              if(findMergedTile.length < 2) {
                // textContent를 얻기 위한 변수
                replaceTile = document.querySelector(`.tile-position-${replaceNumberOne}-${j + 1}`);

                if(stateArray[replaceNumberOne][j] === parseInt(replaceTile.textContent)) {
                  replaceNumberOne += 1;
                  replaceTile.classList.replace(replaceTile.classList[2], `tile-position-${replaceNumberOne}-${replaceNumberTwo}`);
                  tileMerged(replaceTile, replaceNumberOne, replaceNumberTwo);
                }
              }
            }

            if(replaceNumberOne !== compareNum) {
              tileMovementCheck = true;
            }
          }
        }
      }
    }
  }

  // ArrowRight
  if(e.key === 'ArrowRight') {
    for(let i = 0; i <= 3; i++) {
      for(let j = 3; j >= 0; j--) {
        let stateArray = stateManagement();
        let replaceTile;
        let replaceNumberOne;
        let replaceNumberTwo;
        
        if(j < 3) {
          if(document.querySelector(`.tile-position-${i + 1}-${j + 1}`)) {
            replaceTile = document.querySelector(`.tile-position-${i + 1}-${j + 1}`);
            replaceNumberOne = parseInt(replaceTile.classList[2][14]);
            replaceNumberTwo = parseInt(replaceTile.classList[2][16]);
            compareNum = replaceNumberTwo;
  
            for(let k = j + 1; k <= 3; k++) {
              if(stateArray[i][k] === 0) {
                replaceNumberTwo += 1;
                replaceTile.classList.replace(replaceTile.classList[2], `tile-position-${replaceNumberOne}-${replaceNumberTwo}`);
              }
            }
            
            if(replaceNumberTwo < 4) {
              stateManagement();
              let findMergedTile = document.querySelectorAll(`.tile-position-${replaceNumberOne}-${replaceNumberTwo + 1}`);
              if(findMergedTile.length < 2) {
                // textContent를 얻기 위한 변수
                replaceTile = document.querySelector(`.tile-position-${replaceNumberOne}-${replaceNumberTwo}`);

                if(stateArray[i][replaceNumberTwo] === parseInt(replaceTile.textContent)) {
                  replaceNumberTwo += 1;
                  replaceTile.classList.replace(replaceTile.classList[2], `tile-position-${replaceNumberOne}-${replaceNumberTwo}`);
                  tileMerged(replaceTile, replaceNumberOne, replaceNumberTwo);
                }
              }
            }

            if(replaceNumberTwo !== compareNum) {
              tileMovementCheck = true;
            }
          }
        }
      }
    }
  }
  // 새로운 타일 생성
  if(tileMovementCheck === true) {
    playTile();
  }
  // 게임 패배 또는 승리 체크
  gameOverOrWinCheck();
  
}
window.addEventListener('keydown', KeydownEvent);
