// 미션
// ㄴ 오브젝트 배열을 활용하여
// ㄴ 추가 또는 삭제되는 todo 를 관리하고
// ㄴ localStorage에 데이터를 업데이트
// ㄴ 데이터가 업데이트가 되면 -> 문서(ul)를 다시 그리기
// ㄴ 각 투두 항목에 체크박스 추가 (done 여부에 따라 체크 또는 해제)

// * todo object는
// ㄴ prototype 또는 class 정의할 것!

// * checkbox 엘리먼트의 속성 중, .checked
// ㄴ boolean

let n = 0;
let data = [];

class Todo {
  constructor(id, todo) {
    this.id = id;
    this.todo = todo;
    this.done = false;
  }
}

const root = document.getElementById("root");
const ul = document.createElement("ul");

ul.addEventListener("click", (e) => {
  if (e.target.className === "delete") {
    deleteTodo(e.target.parentElement);
  } else if (e.target.tagName === "INPUT") {
    flipCheckBox(e.target.parentNode.id);
  }
});
root.append(ul);

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

load();

const title = document.querySelector("h1");
const userName = window.localStorage.getItem("user");
if (userName) {
  title.innerText = `${userName}의 Todo List`;
}

function addTodo() {
  const todo = form.querySelector("#todo").value;

  if (todo === "") return;

  const id = `todo${++n}`;
  const todoObj = new Todo(id, todo);

  data.push(todoObj);
  updateList();
}

function updateList() {
  save();
  drawListElements();
}

function drawListElements() {
  ul.innerHTML = "";

  data.forEach((todoObj) => {
    const li = document.createElement("li");
    li.id = todoObj.id;

    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.checked = todoObj.done;

    const p = document.createElement("p");
    p.innerText = todoObj.todo;

    const button = document.createElement("button");
    button.innerText = "X";
    button.className = "delete";

    // 생성한 엘리먼트를 조립
    li.append(checkBox);
    li.append(p);
    li.append(button);

    ul.append(li);
  });
}

function save() {
  localStorage.setItem("data", JSON.stringify(data));
}

function load() {
  const dataStr = localStorage.getItem("data");

  if (dataStr) {
    data = JSON.parse(dataStr);

    const lastObj = data[data.length - 1];
    const id = lastObj.id; // todo#

    n = parseInt(id.split("todo")[1]);

    drawListElements();
  }
}

function deleteTodo(target) {
  let delIdx = -1;
  
  for (let i = 0; i < data.length; i++) {
    const todoObj = data[i];
    if (target.id === todoObj.id) {
      delIdx = i;
      break;
    }
  }

  data.splice(delIdx, 1);
  save();

  target.remove();
}

function flipCheckBox(id) {
  for (index in data) {
    const targetObj = data[index];

    if (targetObj.id === id) {
      console.log("save!");
      targetObj.done = !targetObj.done;
      save();
      break;
    }
  }
}
