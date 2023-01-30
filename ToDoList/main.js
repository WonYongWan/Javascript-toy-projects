const $newTodo = document.querySelector('#new_todo');
const $itemList = document.querySelector('.item_list');

$newTodo.addEventListener('keyup', inputValueProcess);

// 내용 입력시 Enter Key만 허용, 공백문자 차단, 텍스트 사이 공백 조정, 텍스트 앞 뒤 공백 제거
function inputValueProcess(e) {
  if(e.keyCode !== 13) return;
  if(this.value === '') return;
  let valueTexts = this.value;
  let blankCount = 0;
  for(let i of valueTexts) {if(i.charCodeAt() === 32) blankCount++;}
  if(blankCount === valueTexts.length) return;
  valueTexts = valueTexts.replace(/ +/g, " ");

  let inputValue = valueTexts.trim();
  CreateItem(inputValue);
  $newTodo.value = '';
}

// $itemList에 item 제작 및 삽입
function CreateItem(inputValue) {
  const $item = document.createElement('div');
  $item.setAttribute('class', 'item');

  const $p = document.createElement('p');
  $p.setAttribute('class', 'on');
  $p.innerText = inputValue;

  const $input = document.createElement('input');
  $input.setAttribute('type', 'text');

  const $button = document.createElement('button');
  $button.innerText = 'X';

  $item.append($p, $input, $button);
  $itemList.append($item);

  // P태그 더블클릭 이벤트!
  const $itemsPTag = document.querySelectorAll('.item p');
  $itemsPTag.forEach(elm => elm.addEventListener('click', itemTextModifyStart));
}

// P태그 더블클릭 이벤트!
function itemTextModifyStart(e) {
  const $itemInputTag = e.target.nextSibling;

  e.target.classList.remove('on');
  $itemInputTag.value = e.target.innerText;
  $itemInputTag.classList.add('on');
}

function itemCompleted() {

}

function stateOfItemLeft() {

}

