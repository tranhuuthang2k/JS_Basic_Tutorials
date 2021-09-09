if ((document.readyState = "loading")) {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  let btnadd = document.getElementById("enter");
  btnadd.addEventListener("click", createList);
  if (localStorage.getItem("TODO")) {
    document.getElementsByClassName("list-todo")[0].innerHTML =
      localStorage.getItem("TODO"); // in ra sự lựa chọn màu
  }
  let btnEdit = document.getElementsByClassName("btnEdit");
  let btnDelete = document.getElementsByClassName("btnDelete");
  for (let index = 0; index < btnEdit.length; index++) {
    btnEdit[index].addEventListener("click", editList);
  }
  for (let index = 0; index < btnDelete.length; index++) {
    btnDelete[index].addEventListener("click", deleteList);
  }
}
createList = () => {
  let ul = document.querySelector("ul");
  let li = document.createElement("li");
  let input = document.getElementById("userInput");
  if (input.value != "") {
    // li.appendChild(document.createTextNode(input.value));
    li.innerHTML = `<span class="name"> ${input.value}</span>`;
    ul.appendChild(li);
    let buttonDelete = document.createElement("button");
    // button.appendChild(document.createTextNode("Delete"));
    buttonDelete.innerHTML = `<span class="btnDelete"> Delete</span>`;
    // Tạo nút Edit
    let btnEdit = document.createElement("button");
    btnEdit.innerHTML = `<span class="btnEdit"> Edit</span>`;
    // btnEdit.appendChild(document.createTextNode("Edit"));
    let CreateInput = document.createElement("input");
    CreateInput.setAttribute("type", "hidden");
    CreateInput.setAttribute("value", input.value);
    CreateInput.classList.add("edit");
    // Tạo nút Update
    let buttonUpdate = document.createElement("button");
    buttonUpdate.appendChild(document.createTextNode("OK"));
    buttonUpdate.innerHTML = `<span class="update" style="display:none"> Update </span>`;
    li.appendChild(buttonUpdate);
    li.appendChild(buttonDelete);
    li.appendChild(btnEdit);
    li.appendChild(CreateInput);
    input.value = "";
    buttonDelete.addEventListener("click", deleteList);
    btnEdit.addEventListener("click", editList);
    // save local
    let list = document.getElementsByClassName("list-todo")[0];
    localStorage.setItem("TODO", list.innerHTML);
  } else {
    alert("bạn chưa tạo việc cần làm");
  }
};
getTodoListFromLocal = () => {
  let list = document.getElementsByClassName("list-todo")[0];
  localStorage.setItem("TODO", list.innerHTML);
};

deleteList = () => {
  let li = document.querySelector("li");
  li.classList.add("delete");
  document.getElementsByClassName("delete")[0].remove();
  getTodoListFromLocal();
};
editList = () => {
  let li = event.target.parentElement.parentElement;
  li.getElementsByClassName("btnEdit")[0].style.display = "none";
  li.getElementsByClassName("edit")[0].setAttribute("type", "text");
  li.getElementsByClassName("update")[0].style.display = "block";
  li.getElementsByClassName("update")[0].addEventListener("click", updateList);
};
updateList = () => {
  let liParent = event.target.parentElement.parentElement;
  liParent.getElementsByClassName("btnEdit")[0].style.display = "block";
  liParent.getElementsByClassName("update")[0].style.display = "none";
  let inputNew = liParent.getElementsByClassName("edit")[0].value;
  if (inputNew) {
    liParent.getElementsByClassName("name")[0].innerHTML = inputNew;
    liParent.getElementsByClassName("edit")[0].setAttribute("type", "hidden");
  }
  getTodoListFromLocal();
};
