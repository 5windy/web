let n = 0;

const root = document.getElementById('root');
const ul = document.createElement('ul');
ul.addEventListener('click', e => {
    if(e.target.className === 'delete') {
        deleteTodo(e.target.parentElement);
    }
});
root.append(ul);

const form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault(); 
    addTodo();
});

const title = document.querySelector('h1');
const userName = window.localStorage.getItem('user');
if(userName) {
    title.innerText = `${userName}의 Todo List`;
}

// 미션 
// ㄴ 오브젝트 배열을 활용하여
// ㄴ 추가 또는 삭제되는 todo 를 관리하고
// ㄴ localStorage에 데이터를 업데이트 
// ㄴ 데이터가 업데이트가 되면 -> 문서(ul)를 다시 그리기
// ㄴ 각 투두 항목에 체크박스 추가 (done 여부에 따라 체크 또는 해제)  

function addTodo() {
    const todo = form.querySelector('#todo').value;

    if(todo === '')
        return;

    const li = document.createElement('li');
    li.id = `todo${++ n}`;

    const p = document.createElement('p');
    p.innerText = todo;

    const button = document.createElement('button');
    // button.addEventListener('click', e => {
    //     // 이벤트 처리 -> 
    //     // 버블링을 활용한 이벤트 위임 처리하려면 
    //     // 자식을 감싼 부모 엘리먼트에게 이벤트 리스너 달기 (ul)
    // })
    button.innerText = 'X';
    button.className = 'delete';

    // 생성한 엘리먼트를 조립 
    li.append(p);
    li.append(button);

    ul.append(li);
}

function removeTodo(id) {
    const li = document.getElementById(id);
    ul.removeChild(li);
}

function deleteTodo(target) {
    target.remove();
}