# <center>기능 구현</center>
<br/>

```js
// 데이터 가공
getData();
async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());

  const cloneData = response.map(elm => elm);
  const processingData = [];

  const contentsLength = 8;
  const pageLength = Math.ceil(response.length / contentsLength);

  while(cloneData.length >= contentsLength) {
    processingData.push(cloneData.splice(0, 8));
  }
  processingData.push(cloneData.splice(0));
  startPage(pageLength, processingData);
}
```

### 한 페이지에 최대 8개의 컨텐츠 링크를 출력해야 하므로 빈 배열 processingData에 받아온 데이터가 8개 이상일 경우 8개씩 아닐 경우 나머지를 깊은복사 했습니다. 그리고 첫 화면을 그려줄 startPage에 page의 총 길이와 가공한 데이터 processingData를 파라미터로 전달 하였습니다.
<br/>

```js
// start page
function startPage(pageLength, processingData) {
  startPageContent(processingData);
  const $li = startPageIndex(processingData);
  $li.forEach(elm => elm.addEventListener('click', PageIndexChange(pageLength, processingData, null)));
  $prevBtn.addEventListener('click', PageIndexChange(pageLength, processingData, 'minus'));
  $nextBtn.addEventListener('click', PageIndexChange(pageLength, processingData, 'plus'));
}
```

### 첫화면에 뿌려줄 contents는 startPageContent(가공데이터)를 호출하여 page index는 const $li = startPageIndex(가공데이터)를 호출하였습니다. 그리고 page index click event, prevBtn click event, nextBtn click event를 걸어주었습니다.
<br/>

```js
// start page contents
function startPageContent(processingData) {
  const fragment = new DocumentFragment();

  for(let i = 0; i < processingData[0].length; i++) {
    const $item = document.createElement('div');
    const $img = document.createElement('div');
    const $contentInfo = document.createElement('div');
    const $h1 = document.createElement('h1');
    const $p = document.createElement('p');

    $item.setAttribute('class', 'item');
    $img.setAttribute('class', 'img');
    $contentInfo.setAttribute('class', 'content_info');
    $h1.innerText = `${processingData[0][i].id}. ${processingData[0][i].title}`;
    $p.innerText = processingData[0][i].body;

    $contentInfo.append($h1, $p);
    $item.append($img, $contentInfo);
    fragment.append($item);
  }
  $contentsWrap.append(fragment);
}
```

### 가공데이터의 첫번째 데이터를 담을 content elements을 만들어주고 출력하였습니다.
<br/>

```js
// start page index
function startPageIndex(processingData) {
  const fragment = new DocumentFragment();

  if(processingData.length >= 5) {
    for(let i = 1; i <= 5; i++) {
      const $li = document.createElement('li');
      $li.innerText = i;
      fragment.append($li);
    }
  } else if(processingData.length < 5) {
    for(let i = 1; i <= processingData.length; i++) {
      const $li = document.createElement('li');
      $li.innerText = i;
      fragment.append($li);
    }
  }
  $ul.append(fragment);

  const $li = document.querySelectorAll('.page_info > ul > li');
  $li[0].classList.add('on');

  return $li;
}
```
### 만약 데이터의 길이가 5보다 크거나 같을 경우 1~5번까지의 page index를 뿌려주고 5보다 작을 경우 가공데이터의 길이만큼 page index elements를 만들어 출력하였습니다.
<br/>

```js
// page index 상태 관리
const PageIndexChange = (pageLength, processingData, targetInfo) => (e) => {
  let targetIndex = parseInt(e.target.textContent);

  // 만약 클릭한 요소가 button일 경우
  // prev || next button click change targetIndex
  const $currentLi = document.querySelectorAll('.page_info > ul > li');
  let currentIndex;
  $currentLi.forEach(elm => {if(elm.classList.contains('on')) {currentIndex = parseInt(elm.textContent)}});

  if(targetInfo === 'plus') {
    if(currentIndex + 1 > pageLength) return;
    targetIndex = currentIndex + 1;

  } else if(targetInfo === 'minus') {
    if(currentIndex - 1 < 1) return;
    targetIndex = currentIndex - 1;
  }
  // =================================================

  // 버튼의 활성화 및 비활성화 코드
  if(targetIndex === 1 && $prevBtn.classList.contains('on')) $prevBtn.classList.replace('on', 'none');
  else if(targetIndex > 1 && $prevBtn.classList.contains('none')) $prevBtn.classList.replace('none', 'on');

  if(targetIndex === pageLength && $nextBtn.classList.contains('on')) $nextBtn.classList.replace('on', 'none');
  else if(targetIndex < pageLength && $nextBtn.classList.contains('none')) $nextBtn.classList.replace('none', 'on');

  $ul.innerHTML = '';

  // page index 상태 관리
  if(processingData.length >= 5) {
    if(targetIndex > 3 && targetIndex <= pageLength - 2) {
      for(let i = targetIndex - 2; i <= targetIndex + 2; i++) {
        const $li = document.createElement('li');
        $li.innerText = i;
        $ul.append($li);
      }
    } else if(targetIndex <= 3) {
      for(let i = 1; i <= 5; i++) {
        const $li = document.createElement('li');
        $li.innerText = i;
        $ul.append($li);
      }
    } else if(targetIndex >= pageLength - 2) {
      for(let i = pageLength - 4; i <= pageLength; i++) {
        const $li = document.createElement('li');
        $li.innerText = i;
        $ul.append($li);
      }
    }
  } else if(processingData.length < 5) {
    for(let i = 1; i <= processingData.length; i++) {
      const $li = document.createElement('li');
      $li.innerText = i;
      $ul.append($li);
    }
  }
  
  for(let i of $ul.childNodes) {if(parseInt(i.textContent) === targetIndex) i.classList.add('on')}

  // contents 상태 관리 함수 호출, 파라미터로 선택된 index정보와 가공 데이터 전달
  PageContentsChange(targetIndex, processingData);

  const $nextLi = document.querySelectorAll('.page_info > ul > li');
  // 상태 관리를 할때 li태그를 전부 삭제하고 새로우 li태그들이 들어가므로 새로 들어온 li들의 click event
  $nextLi.forEach(elm => elm.addEventListener('click', PageIndexChange(pageLength, processingData, null)));
}
```

```js
// page contents 상태 관리
function PageContentsChange(targetIndex, processingData) {
  const pageIndex = targetIndex - 1;
  const pageContents = processingData[pageIndex];

  const fragment = new DocumentFragment();
  $contentsWrap.innerHTML = '';

  for(let i = 0; i < processingData[pageIndex].length; i++) {
    const $item = document.createElement('div');
    const $img = document.createElement('div');
    const $contentInfo = document.createElement('div');
    const $h1 = document.createElement('h1');
    const $p = document.createElement('p');

    $item.setAttribute('class', 'item');
    $img.setAttribute('class', 'img');
    $contentInfo.setAttribute('class', 'content_info');
    $h1.innerText = `${pageContents[i].id}. ${pageContents[i].title}`;
    $p.innerText = pageContents[i].body;

    $contentInfo.append($h1, $p);
    $item.append($img, $contentInfo);
    fragment.append($item);
  }
  $contentsWrap.append(fragment);
}
```