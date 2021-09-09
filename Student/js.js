if ((document.readyState = "loading")) {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  let btn_submit = document.getElementById("submit");
  btn_submit.addEventListener("click", createList);
  let btnEdit = document.getElementsByClassName("edit");
  for (let index = 0; index < btnEdit.length; index++) {
    btnEdit[index].addEventListener("click", editList);
  }
  let btnDelete = document.getElementsByClassName("delete");
  for (let index = 0; index < btnDelete.length; index++) {
    btnDelete[index].addEventListener("click", deleteList);
  }
}
let students = [];

function validate() {
  let user_code = document.getElementById("masv").value;
  let userName = document.getElementById("userName").value;
  let address = document.getElementById("address").value;
  let phoneNumber = document.getElementById("phone").value;
  let errorCode = document.getElementById("errorCode");
  let errorName = document.getElementById("errorName");
  let errorAddress = document.getElementById("errorAddress");
  let student_code;
  let student_name;
  let student_phone;
  let student_address;
  !user_code
    ? (errorCode.innerHTML = "mã số sinh viên không được để trống")
    : user_code.substring(0, 4) == "20IT" &&
      user_code.length == 7 &&
      !isNaN(user_code.substring(4, 7))
    ? (student_code = user_code) && (errorCode.innerHTML = "")
    : (errorCode.innerHTML =
        "Mã sinh viên: có dạng 20ITx (với x là số có 3 chữ số)");
  !userName
    ? (errorName.innerHTML = "Tên sinh viên không được để trống")
    : (student_name = userName) && (errorName.innerHTML = "");
  !address
    ? (errorAddress.innerHTML = "Địa chỉ không được để trống")
    : (student_address = address) && (errorAddress.innerHTML = "");
  !phoneNumber
    ? (errorPhone.innerHTML = "SĐT không được để trống")
    : phoneNumber.length < 6 || phoneNumber.length > 10
    ? (errorPhone.innerHTML = "SĐT không được nhỏ hơn 6 và lớn hơn 10")
    : (student_phone = phoneNumber) && (errorPhone.innerHTML = "");
  if (
    student_code !== undefined &&
    student_name !== undefined &&
    student_address !== undefined &&
    student_phone !== undefined
  ) {
    return { student_code, student_name, student_address, student_phone };
  }
}
function Table_student() {
  let tableTemplate = `<tr>
        <th>#</th>
        <th>Mã SV</th>
        <th>Tên Sv</th>
        <th>Địa Chỉ</th>
        <th>SĐT</th>
        <th colspan="2">Actions</th>
      </tr>`;
  students.forEach((student, index) => {
    tableTemplate += `<tr>
      <td  id=${index} class="id">${index + 1}</td>
      <td class="code">${student.student_code}</td>
      <td class="name">${student.student_name}</td>
      <td class="address">${student.student_address}</td>
      <td class="phone">${student.student_phone}</td>
      <td><button class="edit">🖋</button></td>
      <td><button class="delete" onclick="return confirm('bạn chắc chắn xóa sinh viên ${
        student.student_name
      } ra khỏi hệ thống?');">❌</button></td>
    </tr>`;
  });
  document.getElementById("table_list").innerHTML = tableTemplate;
  let btnEdit = document.getElementsByClassName("edit");
  for (let index = 0; index < btnEdit.length; index++) {
    btnEdit[index].addEventListener("click", editList);
  }
  let btnDelete = document.getElementsByClassName("delete");
  for (let index = 0; index < btnDelete.length; index++) {
    btnDelete[index].addEventListener("click", deleteList);
  }
}
function createList() {
  if (validate()) {
    student_code = validate().student_code;
    student_name = validate().student_name;
    student_address = validate().student_address;
    student_phone = validate().student_phone;
    student = {
      student_code,
      student_name,
      student_address,
      student_phone,
    };
    const check_student_Code = students.find(
      (e) => e.student_code === student_code
    );
    check_student_Code
      ? Swal.fire({
          icon: "error",
          title: "Mã Sv Đã tồn tại...",
        })
      : students.push(student) &&
        Swal.fire("Success!", "Thêm Sinh Viên thành công!", "success");

    if (!check_student_Code) {
      document.getElementById("masv").value = "";
      document.getElementById("userName").value = "";
      document.getElementById("address").value = "";
      document.getElementById("phone").value = "";
    }
    Table_student();
  }
}
function editList() {
  let tr = event.target.parentElement.parentElement;
  let user_Id = tr.getElementsByClassName("id")[0].getAttribute("id");
  let user_code = tr.getElementsByClassName("code")[0].innerText;
  let user_name = tr.getElementsByClassName("name")[0].innerText;
  let user_address = tr.getElementsByClassName("address")[0].innerText;
  let user_phone = tr.getElementsByClassName("phone")[0].innerText;
  document.getElementById("masv").value = user_code;
  document.getElementById("userName").value = user_name;
  document.getElementById("address").value = user_address;
  document.getElementById("phone").value = parseInt(user_phone);
  document.getElementById("submit").style.display = "none";
  let btnEdit = event.target;
  btnEdit.style.display = "none";
  let buttonUpdate = document.createElement("button");
  buttonUpdate.classList.add("update");
  buttonUpdate.appendChild(document.createTextNode("OK"));
  buttonUpdate.innerHTML = `<span>✔️</span>`;
  event.target.parentElement.appendChild(buttonUpdate);
  buttonUpdate.addEventListener("click", () => {
    updateStudent(user_Id);
  });
}

function updateStudent(user_Id) {
  const check_student_Code = students.find(
    (e, i) =>
      e.student_code === validate()?.student_code && i !== parseInt(user_Id)
  );
  if (check_student_Code) {
    let el = event.target.parentElement;
    Swal.fire({
      icon: "error",
      title: "Mã Sv Đã tồn tại...",
    });
    document.getElementById("masv").value = "";
    document.getElementById("userName").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    el.style.display = "none";
    elEdit = el.parentElement.getElementsByClassName("edit")[0];
    elEdit.style.display = "block";
    return;
  }
  if (validate()) {
    student_code = validate().student_code;
    student_name = validate().student_name;
    student_address = validate().student_address;
    student_phone = validate().student_phone;
    students[user_Id] = {
      student_code,
      student_name,
      student_address,
      student_phone,
    };
    Swal.fire(
      "Success!",
      `Cập nhật thông tin sinh viên ${student_name} thành công!`,
      "success"
    );
    Table_student();
    document.getElementById("masv").value = "";
    document.getElementById("userName").value = "";
    document.getElementById("address").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("submit").style.display = "block";
  }
}
function deleteList() {
  let tr = event.target.parentElement.parentElement;
  let user_Id = tr.getElementsByClassName("id")[0].getAttribute("id");
  students.splice(user_Id, 1);
  Table_student();
}
