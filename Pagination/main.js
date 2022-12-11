import data from "./data.js";
let contListWrap = document.querySelector('.cont');
let pageListWrap = document.querySelector('.page .list');

// 데이터의 총 개수
let totalData = 60;
// 페이지의 총 개수
let totalPage = Math.ceil(totalData / 8);
// 한 화면에 보여질 페이지리스트 개수
let currentPage = Math.ceil(totalPage / 5);

for(let i = 0; i < totalPage; i++) {
  if(pageListWrap.childNodes.length < 5) {
    pageListWrap.innerHTML += `<li><a href="#none">${i + 1}</a></li>`;
  }
}
console.log(pageListWrap.childNodes.length);

// function pageIndex(length) {
//   for(let i = 0; i < length; i++) {
//     pageListWrap.innerHTML += `<li><a href="#none">${i + 1}</a></li>`;
//   }
//   let pageChilds = pageListWrap.childNodes;
// }
// pageIndex(pageLength);

// for(let i = 0; i < data.length; i++) {
//   let listIndex = 0;
//   if(i < 8) {
//     let listIndex = 8;
//     contListWrap.innerHTML += `<li><div></div><ul><li>${data[i].title}</li><li>${data[i].text}</li></ul></li>`;
//     if(i < listIndex + 8) {
//       contListWrap.innerHTML += `<li><div></div><ul><li>${data[i + listIndex].title}</li><li>${data[i + listIndex].text}</li></ul></li>`;
//       listIndex += 8;
//     }
//   }
// }
// const contList = contListWrap.childNodes.length;
// if(contList > 8) {

// }
