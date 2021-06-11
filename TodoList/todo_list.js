if ((document.readyState = "loading")) {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  let btnadd = document.getElementById("enter");
  btnadd.addEventListener("click", createList);
}
createList = () => {
  let ul = document.querySelector("ul");
  let li = document.createElement("li");
  let input = document.getElementById("userInput");
  if (input.value != "") {
    // li.appendChild(document.createTextNode(input.value));
    li.innerHTML = `<span class="name"> ${input.value}</span>`;
    ul.appendChild(li);
    let button = document.createElement("button");
    button.appendChild(document.createTextNode("Delete"));
    // Tạo nút Edit
    let btnEdit = document.createElement("button");
    btnEdit.appendChild(document.createTextNode("Edit"));
    let CreateInput = document.createElement("input");
    CreateInput.setAttribute("type", "hidden");
    CreateInput.setAttribute("value", input.value);
    CreateInput.classList.add("edit");
    li.appendChild(button);
    li.appendChild(btnEdit);
    li.appendChild(CreateInput);
    input.value = "";
    button.addEventListener("click", deleteList);
    btnEdit.addEventListener("click", editList);
  } else {
    alert("bạn chưa tạo việc cần làm");
  }
};
deleteList = () => {
  let li = document.querySelector("li");
  li.classList.add("delete");
  document.getElementsByClassName("delete")[0].remove();
};
editList = () => {
  let li = event.target.parentElement;
  li.getElementsByClassName("edit")[0].setAttribute("type", "text");
  li.getElementsByClassName("edit")[0].setAttribute("onblur", "updateList()");
  // console.log(a);
};
updateList = () => {
  let liParent = event.target.parentElement;
  let inputNew = liParent.getElementsByClassName("edit")[0].value;
  if (inputNew) {
    liParent.getElementsByClassName("name")[0].innerHTML = inputNew;
    liParent.getElementsByClassName("edit")[0].setAttribute("type", "hidden");
  }
};
// SEARCH FILTER
