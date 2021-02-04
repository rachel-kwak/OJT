"use strict";

// 1.
// alert("hello world");

// 2.
/*
var myContentsEl = document.getElementById("my-contents");
console.log(myContentsEl.getElementsByTagName("a"));
*/

// 3.
// 즉시 실행함수
// 변수의 스코프를 제한하기 위해서 사용
/*
(function () {
  document.getElementById("my-btn").addEventListener(
    "click",
    () => {
      alert(document.getElementById("my-input").value);
    },
    false
  );
})();
*/

// 4. Todo
var todoList = document.getElementById("todo-list");
var myInput = document.getElementById("my-input");
var myBtn = document.getElementById("my-btn");

var totalTodo = document.getElementById("total-todo");
var activeTodo = document.getElementById("active-todo");
var doneTodo = document.getElementById("done-todo");

var totalBtn = document.getElementById("total-btn");
var activeBtn = document.getElementById("active-btn");
var doneBtn = document.getElementById("done-btn");

(function () {
  function newTodo(text) {
    var todoItem = document.createElement("li");
    todoItem.className = "incomplete";
    todoItem.innerHTML = `<input type='checkbox'> ${text} <button>삭제</button>`;
    // 5.
    // 버블링 방지를 위해 checkbox에 stopPropagation을 설정해준다.
    /*
    todoItem.getElementsByTagName("input")[0].addEventListener(
      "click",
      (e) => {
        e.stopPropagation();
      },
      false
    );
    */
    todoItem
      .getElementsByTagName("button")[0]
      .addEventListener("click", deleteTodo, false);
    myInput.value = "";
    return todoItem;
  }

  function addTodo() {
    var todoItem = newTodo(myInput.value);
    todoItem.addEventListener("click", toggleCheck, false);
    todoList.appendChild(todoItem);
    calcTodo();
  }

  function toggleCheck(e) {
    var checkBox = this.getElementsByTagName("input")[0]; // HTML Collection이므로 객체를 찾아줘야함
    // 또는
    // var [checkBox] = this.getElementsByTagName('input');

    // 6.
    // stopPropagration을 쓰지 않고 버블링 해결하기
    // 이벤트 객체의 target 속성을 이용한다.
    if (e.target !== checkBox)
      // 또는 if (e.target.tagName !== 'INPUT')
      checkBox.checked = !checkBox.checked;

    // 7.
    // Todo 완료 여부에 따라 스타일 지정하기
    if (checkBox.checked) {
      this.className = "complete";
      calcTodo();
    } else {
      this.className = "incomplete";
      calcTodo();
    }
  }

  // 8.
  // QuerySelector로 Todo 개수 계산하기
  function calcTodo() {
    var total = document.querySelectorAll("li").length;
    var done = document.querySelectorAll(".complete").length;

    totalTodo.innerHTML = `전체: ${total}`;
    activeTodo.innerHTML = `진행: ${total - done}`;
    doneTodo.innerHTML = `완료: ${done}`;
  }

  // 9.
  // Todo 삭제하기
  function deleteTodo(e) {
    e.stopPropagation();
    todoList.removeChild(this.parentNode);
    calcTodo();
  }

  myBtn.addEventListener("click", addTodo, false);

  // 10.
  // 진행 상태에 따라 Todo 목록 전환하기
  document.querySelector("#counter").addEventListener("click", function (e) {
    switch (e.target.id) {
      case "done-todo": {
        todoList.className = "hide-incomplete";
        break;
      }
      case "active-todo": {
        todoList.className = "hide-complete";
        break;
      }
      default: {
        todoList.className = "";
        break;
      }
    }
  });
})();
