const $screen = document.querySelector('#screen');
const $currentTime = document.querySelector('#screen > span');
const $rankingList = document.querySelector('#rankingList');
const $average = document.querySelector('#average');

let startTime;
let endTime;
let result = [];

const changeColor = (e) => {
  if(e.target.classList.contains('pending')) {
    $screen.classList.replace('pending', 'ready');

    setTimeout(() => {
      $screen.classList.replace('ready', 'action');
      // 시작 시간
      startTime = new Date();
    }, Math.floor(Math.random() * 1000 + 2000));

  } else if(e.target.classList.contains('ready')) {
    alert('성급한 클릭!');
    $screen.classList.replace('ready', 'pending')

  } else if(e.target.classList.contains('action')) {
    // 종료 시간
    endTime = new Date();
    $screen.classList.replace('action', 'pending');
    $currentTime.innerText = `Current: ${parseFloat(((endTime - startTime) / 1000).toFixed(2))}s`;
    result.push(parseFloat(((endTime - startTime) / 1000).toFixed(2)));
    result.sort();
    let average = parseFloat(result.reduce((a, c) => a + c).toFixed(2));

    $average.innerText = `${(average / result.length).toFixed(2)}s`;
    $rankingList.innerHTML = '';
    result.forEach((elm, idx) => {
      if(idx + 1 < 6) {
        $rankingList.innerHTML += `<li><div>${idx + 1}#</div><div>${elm}s</div></li>`;
      }
    });
  }
}

$screen.addEventListener('click', changeColor);