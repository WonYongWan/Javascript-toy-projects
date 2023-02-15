const $contentsWrap = document.querySelector('.contents_wrap');
const $pageInfo = document.querySelector('.page_info');
const $ul = document.querySelector('.page_info > ul');
const $prevBtn = document.querySelector('.page_info > button.prev');
const $nextBtn = document.querySelector('.page_info > button.next');

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

// start page
function startPage(pageLength, processingData) {
  startPageContent(processingData);
  const $li = startPageIndex(processingData);
  $li.forEach(elm => elm.addEventListener('click', PageIndexChange(pageLength, processingData, null)));
  $prevBtn.addEventListener('click', PageIndexChange(pageLength, processingData, 'minus'));
  $nextBtn.addEventListener('click', PageIndexChange(pageLength, processingData, 'plus'));
}

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

// page index 상태 관리
const PageIndexChange = (pageLength, processingData, targetInfo) => (e) => {
  let targetIndex = parseInt(e.target.textContent);

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

  if(targetIndex === 1 && $prevBtn.classList.contains('on')) $prevBtn.classList.replace('on', 'none');
  else if(targetIndex > 1 && $prevBtn.classList.contains('none')) $prevBtn.classList.replace('none', 'on');

  if(targetIndex === pageLength && $nextBtn.classList.contains('on')) $nextBtn.classList.replace('on', 'none');
  else if(targetIndex < pageLength && $nextBtn.classList.contains('none')) $nextBtn.classList.replace('none', 'on');

  $ul.innerHTML = '';

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

  PageContentsChange(targetIndex, processingData);

  const $nextLi = document.querySelectorAll('.page_info > ul > li');
  $nextLi.forEach(elm => elm.addEventListener('click', PageIndexChange(pageLength, processingData, null)));
}

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