"use strict";
const tableBodyEl = document.getElementById("tbody");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
renderTableBreed(breedArr);
console.log(breedArr);
// Get data from form
btnSubmit.addEventListener("click", function () {
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  const validate = validateData(data);
  console.log(validate);
  if (validate) {
    breedArr.push(data);
    // Cap nhat du lieu duoi dang local storage
    saveToStorage("breedArr", breedArr);
    renderTableBreed(breedArr);

    // delete form
    clearInput();
  }
});
function renderTableBreed() {
  tableBodyEl.innerHTML = "";
  // Cứ mỗi loại breed ta sẽ thêm 1 row xuống dưới
  breedArr.forEach(function (breedItem, index) {
    const row = document.createElement("tr"); // Create tr
    row.innerHTML = `
    <th scope="row">${index + 1}</th>
    <td>${breedItem.breed}</td>
    <td>${breedItem.type}</td>
    <td>
    <button class="btn btn-danger" onclick="deleteBreed('${
      breedItem.breed
    }')">Delete</button>
  </td>
      `;
    tableBodyEl.appendChild(row);
  });
}

function validateData(data) {
  let isValidate = true;
  if (data.breed.trim() === "") {
    alert("Please Input for breed");
    isValidate = false;
  }
  if (data.type.trim() === "") {
    alert("Please Input for type");
    isValidate = false;
  }
  return isValidate;
}
function clearInput() {
  (breedInput.value = ""), (typeInput.value = "Select Type");
}

function deleteBreed(breed) {
  // Xac nhan xoa
  const isDelete = confirm("Are you sure?");
  if (isDelete) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        //Xóa khởi mảng
        breedArr.splice(i, 1);
        // Cap nhat du lieu duoi dang local storage
        saveToStorage("breedArr", breedArr);
        renderTableBreed(breedArr);
        break;
      }
    }
  }
}
