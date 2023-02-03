# <center>기능 구현</center>
<br/>

```js
const $allCheckItems = document.querySelector('.new_todo > button');
const $newTodo = document.querySelector('#new_todo');
const $itemList = document.querySelector('.item_list');
const $itemKindsBtns = document.querySelectorAll('.item_kinds > button');
const $itemCount = document.querySelector('.itme_count > p');
const $clearItemsBtn = document.querySelector('.item_clear > button');
```

### 전역으로 사용할 태그들 변수 선언
<br/>

```html
<button class="all on" onclick="listPagesTab('all')">All</button>
<button class="active" onclick="listPagesTab('active')">Active</button>
<button class="completed" onclick="listPagesTab('completed')">Completed</button>
```

```js
// tab 효과 및 list item 분류
function listPagesTab(state) {
  $itemKindsBtns.forEach(elm => elm.classList.remove('on'));
  document.querySelector(`.item_kinds > .${state}`).classList.add('on');

  const $pTagItems = document.querySelectorAll('.item > p');
  if(state === 'all') {
    ItemClassificationAll($pTagItems);
  } else if(state === 'active') {
    ItemClassificationActive($pTagItems);
  } else if(state === 'completed') {
    ItemClassificationCompleted($pTagItems);
  }
}
```

### tab 메뉴에 따라 할일들을 전체, 완료, 진행 중 으로 구분하기 위해 각 button태그의 클래스를 파라미터로 받아와 각 클래스에 따라 함수를 호출 했습니다. 또한 클릭한 button의 스타일을 변경하기 위한 코드도 작성 했습니다.
<br/>

```js
// tab All일 경우 아이템 분류
function ItemClassificationAll($pTagItems) {
  $pTagItems.forEach(elm => elm.parentNode.classList.remove('none'));
}

// tab Active일 경우 아이템 분류
function ItemClassificationActive($pTagItems) {
  $pTagItems.forEach(elm => {
    elm.parentNode.classList.remove('none');
    if(elm.classList.contains('completed')) elm.parentNode.classList.add('none');
  });
}

// tab Completed일 경우 아이템 분류
function ItemClassificationCompleted($pTagItems) {
  $pTagItems.forEach(elm => {
    elm.parentNode.classList.remove('none');
    if(!elm.classList.contains('completed')) elm.parentNode.classList.add('none');
  });
}
```

### tab 메뉴의 상태에 따라 아이템들을 분류하는 코드 입니다.
<br/>

```js
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
  $itemList.scrollTop = $itemList.scrollHeight;

  stateOfItemLeft();
}

// $itemList에 item 제작 및 삽입
function CreateItem(inputValue) {
  const $item = document.createElement('div');
  $item.setAttribute('class', 'item');

  const $img = document.createElement('img');
  $img.setAttribute('src', './images/check_img1.png');
  $img.setAttribute('alt', "");

  const $p = document.createElement('p');
  $p.setAttribute('class', 'on');
  $p.innerText = inputValue;

  const $input = document.createElement('input');
  $input.setAttribute('type', 'text');

  const $button = document.createElement('button');
  $button.innerText = 'X';

  $item.append($img ,$p, $input, $button);
  $itemList.append($item);
}
```

### 할일을 작성했을때 공백 문자만 있을 경우 목록에 추가될 수 없도록 했고 띄어쓰기는 모두 한칸으로 조정하는 함수와 할일 작성이 규격에 맞다면 태그를 생성하여 내용을 넣고 부모 태그에 삽입하는 함수입니다.
<br/>

```js
// 여러 addEventListener동작 및 할일 수정 중 해당 아이템을 제외한 곳을 클릭하면 수정 종료
window.addEventListener('click', (e) => {
  const $itemsPTag = document.querySelectorAll('.item p');
  const $inputTargets = document.querySelectorAll('.item_list > .item > input.on');
  const $itemsCheckBox = document.querySelectorAll('.item_list > .item > img');
  const $deleteItemBtn = document.querySelectorAll('.item > button');

  $itemsPTag.forEach(elm => elm.addEventListener('dblclick', itemTextModifyDblclick));
  $inputTargets.forEach(elm => elm.addEventListener('keydown', itemTextModifyEnter));

  $inputTargets.forEach(elm => {
    if(e.target !== elm) {
      elm.classList.remove('on');
      elm.previousSibling.classList.add('on');
      elm.previousSibling.innerText = elm.value;
    }
  });

  $itemsCheckBox.forEach(elm => elm.addEventListener('click', itemCompleted));
  $deleteItemBtn.forEach(elm => elm.addEventListener('click', deleteItem));
}, true);

// 할일 더블 클릭할 경우 할일 수정 제공
function itemTextModifyDblclick(e) {
  const $itemInputTag = e.target.nextSibling;

  e.target.classList.remove('on');
  $itemInputTag.value = e.target.innerText;
  $itemInputTag.classList.add('on');
}

// 할일 수정 후 Enter키를 통한 완료
function itemTextModifyEnter(e) {
  if(e.keyCode !== 13) return;
  const $itemPTag = e.target.previousSibling;

  e.target.classList.remove('on');
  $itemPTag.innerText = e.target.value;
  $itemPTag.classList.add('on');
}

// 개별 아이템 체크 효과
function itemCompleted() {
  if(this.getAttribute('src') === './images/check_img1.png') {
    this.setAttribute('src', './images/check_img2.png');
    this.nextSibling.classList.add('completed');
  } else if(this.getAttribute('src') === './images/check_img2.png') {
    this.setAttribute('src', './images/check_img1.png');
    this.nextSibling.classList.remove('completed');
  }

  const $pTagItems = document.querySelectorAll('.item > p');
  const $completedItems = document.querySelectorAll('.item > p.completed');
  if($completedItems.length !== $pTagItems.length) {
    $allCheckItems.style.color = '#e6e6e6';
  } else if($completedItems.length === $pTagItems.length) {
    $allCheckItems.style.color = '#737373';
  }

  const $itemKindsOnBtn = document.querySelector('.item_kinds > button.on'); 
  if($itemKindsOnBtn.classList[0] === 'all') {
    ItemClassificationAll($pTagItems);
  } else if($itemKindsOnBtn.classList[0] === 'active') {
    ItemClassificationActive($pTagItems);
  } else if($itemKindsOnBtn.classList[0] === 'completed') {
    ItemClassificationCompleted($pTagItems);
  }

  stateOfItemLeft();
}

// item 개별 삭제
function deleteItem() {
  this.parentNode.remove();
  stateOfItemLeft();
}
```

### 할일을 수정하고 완료할때 필요한 함수들 입니다. 할일 수정은 p태그를 더블클릭할 경우만 가능하게 했고 할일 작성 완료는 enter key를 누르거나 input태그 영역 외의 부분을 클릭했을때 가능하도록 작성 했습니다. 또한 할일 완료는 img태그를 클릭할 경우 가능하도록 작성 했습니다.
<br/>

```js
$clearItemsBtn.addEventListener('click', clearItems);

// 체크된 아이템 전부 삭제
function clearItems() {
  const $completedItems = document.querySelectorAll('.item > p.completed');
  $completedItems.forEach(elm => elm.parentNode.remove());
  stateOfItemLeft();
}
```

### 완료된 할일들을 삭제하는 함수 입니다.
<br/>

```js
$allCheckItems.addEventListener('click', allCheckItems);

// 아이템 전부 체크 및 해제
function allCheckItems() {
  const $pTagItems = document.querySelectorAll('.item > p');
  const $completedItems = document.querySelectorAll('.item > p.completed');
  const $itemsCheckBox = document.querySelectorAll('.item_list > .item > img');

  $itemsCheckBox.forEach(elm => {
    if($completedItems.length < $pTagItems.length) {
      $allCheckItems.style.color = '#737373';
      elm.setAttribute('src', './images/check_img2.png');
      elm.nextSibling.classList.add('completed');
    } else if($completedItems.length === $pTagItems.length) {
      $allCheckItems.style.color = '#e6e6e6';
      elm.setAttribute('src', './images/check_img1.png');
      elm.nextSibling.classList.remove('completed');
    }
  });
  stateOfItemLeft();
}
```

### 할일들을 전체 완료 또는 전체 진행 중으로 상태를 변경하는 함수 입니다.
<br/>

```js
// 완료되지 않은 일정 개수 체크
function stateOfItemLeft() {
  const $pTagItems = document.querySelectorAll('.item > p');
  const $completedItems = document.querySelectorAll('.item > p.completed');
  $itemCount.innerText =  `${$pTagItems.length - $completedItems.length} items left`;
}
```

### 완료되지 않은 일정 개수를 체크하여 보여주는 함수 입니다.
<br/>