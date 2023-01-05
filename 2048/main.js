const $tileContainer = document.querySelector('#tile-container');

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

// 타일 위치 생성
function createPositionNumber() {
  let posNumArray = Array(4).fill().map((elm, idx) => idx + 1);
  let posRandom = Math.floor(Math.random() * posNumArray.length);
  return posNumArray[posRandom];
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
  tile.setAttribute('class', `tile tile-${tileInnerNum} tile-position-${createPositionNumber()}-${createPositionNumber()} tile-new`);

  // .tile = .tile-inner
  tile.append(tileInner);
  return tile;
}

function KeydownEvent(e) {
  const $tile = document.querySelectorAll('.tile')
  $tile.forEach(element => {
    let replaceNumberOne;
    let replaceNumberTwo;



    // classList[2]는 'tile-position-N-N' classList[2][14]는 N-? classList[2][16]은 ?-N
    if(e.key === 'ArrowUp') {
      if(element.classList.contains('tile-new')) element.classList.remove('tile-new');

      replaceNumberOne = parseInt(element.classList[2][14]) - 1;
      if(replaceNumberOne <= 0) replaceNumberOne = 1;
      replaceNumberTwo = element.classList[2][16];

      element.classList.replace(element.classList[2], `tile-position-${replaceNumberOne}-${replaceNumberTwo}`);
    }
    if(e.key === 'ArrowRight') {
      if(element.classList.contains('tile-new')) element.classList.remove('tile-new');
      
      replaceNumberOne = element.classList[2][14];
      replaceNumberTwo = parseInt(element.classList[2][16]) + 1;
      if(replaceNumberTwo >= 5) replaceNumberTwo = 4;

      element.classList.replace(element.classList[2], `tile-position-${replaceNumberOne}-${replaceNumberTwo}`);
    }
    if(e.key === 'ArrowDown') {
      if(element.classList.contains('tile-new')) element.classList.remove('tile-new');

      replaceNumberOne = parseInt(element.classList[2][14]) + 1;
      if(replaceNumberOne >= 5) replaceNumberOne = 4;
      replaceNumberTwo = element.classList[2][16];

      element.classList.replace(element.classList[2], `tile-position-${replaceNumberOne}-${replaceNumberTwo}`);
    }
    if(e.key === 'ArrowLeft') {
      if(element.classList.contains('tile-new')) element.classList.remove('tile-new');

      replaceNumberOne = element.classList[2][14];
      replaceNumberTwo = parseInt(element.classList[2][16]) - 1;
      if(replaceNumberTwo <= 0) replaceNumberTwo = 1;

      element.classList.replace(element.classList[2], `tile-position-${replaceNumberOne}-${replaceNumberTwo}`);
    }
  });
}
window.addEventListener('keydown', KeydownEvent);