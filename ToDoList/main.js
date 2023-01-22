// // const toDoListWrap = document.getElementById('list');
// init()

// function init() {
//   document.getElementById('new_todo').addEventListener("keyup", inputValue);
//   document.getElementById('list').addEventListener("dblclick", editToDo);
// }

// function inputValue(e) {
//   if(e.keyCode === 13 && this.value !== "") {
//     addToDo(this.value);
//     this.value = "";
//   }
// }

// function addToDo(value) {
//   const ul = document.getElementById('list');
//   const li = document.createElement('li');
//   li.innerHTML = `<div class="view"><input type="text" value="${value}" disabled></div>`;
//   ul.appendChild(li);
// }

// function editToDo(e) {
//   let test = document.querySelectorAll('#list input');
//   for(let i of test) {
//     if(i.value !== e.target ) {
//       console.log('erew')
//     }
//   }
//   console.log(e.target)
//   // if(e.target.hasAttribute('disabled') !== true) {

//   // }
//   // console.log(e.target.hasAttribute('disabled'))
//   // // document.querySelectorAll('input').setAttribute('disabled')
//   e.target.removeAttribute('disabled')
//   // // document.querySelector('div.view > input').setAttribute('disabled')
// }

