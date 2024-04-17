// 문제 
// ㄴ <button onClick="join()"></button>
// ㄴ 정의한 함수 join 의 역할 
// ㄴ 1) 브라우저에서 prompt 창을 띄워,
// ㄴ 2) 사용자에게 "id/password/name/age" 입력 받아 
// ㄴ 3) 문서 위에 유저 카드를 추가하여 출력

// * Prototype 또는 Class 정의하여 -> 활용할 것 

// * 문자열을 구분선 기준으로 끊어가기 
// ㄴ 문자열.split() 사용

// 문서의 생성된 엘리먼트를 붙잡아 -> 변수에 담을 수 있게 해준다
// const container = document.querySelector('#container');
const container = document.getElementById('container');

function User(id, password, name, age) {
    this.id = id;
    this.password = password;
    this.name = name;
    this.age = age;
}

function join() {
    const data = prompt("id/password/name/age");
    const info = data.split("/");

    const id = info[0];
    const password = info[1];
    const name = info[2];
    const age = parseInt(info[3]);

    const user = new User(id, password, name, age);
    
    createProfileCard(user);
}

function createProfileCard(user) {
    // container.innerHTML += `
    //     <div class="card">
    //         <div class="profile-image"></div>
    //         <div class="profile">
    //             <h2>${user.name}(${user.age})</h2>
    //             <span>${user.id}</span>
    //         </div>
    //     </div>
    // `;

    // createElement & append 를 사용하여 
    // container 에 카드 생성하기 

    const card = document.createElement('div');
    card.className = 'card';

    const image = document.createElement('div');
    image.className = 'profile-image';

    const profile = document.createElement('div');
    profile.className = 'profile';

    const name = document.createElement('h2');
    name.innerText = `${user.name}(${user.age})`;

    const id = document.createElement('span');
    id.innerText = user.id;

    // 조립 
    profile.append(name);
    profile.append(id);

    card.append(image);
    card.append(profile);

    container.append(card);

}