"use strict";

// Tạo functino giúp clean code
let id = (id) => document.getElementById(id);
// Tạo biến
const submitBtn = id("submit-btn"),
  idInput = id("input-id"),
  nameInput = id("input-name"),
  ageInput = id("input-age"),
  typeInput = id("input-type"),
  weightInput = id("input-weight"),
  lengthInput = id("input-length"),
  colorInput = id("input-color-1"),
  breedInput = id("input-breed"),
  vaccinatedInput = id("input-vaccinated"),
  dewormedInput = id("input-dewormed"),
  sterilizedInput = id("input-sterilized"),
  tableBodyEl = id("tbody"),
  calculateBMI = id("calculateBMI-btn"),
  formEl = id("container-form");
renderTableData(petArr);
console.log(petArr);
// * Bắt sự kiện khi ấn vào chọn typeInput để hiện thị đúng loại
typeInput.addEventListener("click", renderBreed);
// * Hiển thị các loại giống đúng theo Cat và Dog
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";

  // If is Dog
  if (typeInput.value === "Dog") {
    const breedDog = breedArr.filter((breedItem) => breedItem.type === "Dog");
    breedDog.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  } else if (typeInput.value === "Cat") {
    const breedCat = breedArr.filter((breedItem) => breedItem.type === "Cat");
    breedCat.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}
// Hiển thị danh sách Pets
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  petArr.forEach((pet) => {
    const row = document.createElement("tr"); // Create tr
    row.innerHTML = `
    <th scope="row">${pet.id}</th>
    <td>${pet.name}</td>
    <td>${pet.age}</td>
    <td>${pet.type}</td>
    <td>${pet.weight} kg</td>
    <td>${pet.lengthcao} cm</td>
    <td>${pet.breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${pet.color}">
      </i>
    </td>

    <td><i class="bi ${
      pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>

    <td><i class="bi ${
      pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>

    <td><i class="bi ${
      pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>
    ${pet.date.substring(0, 10)}
    </td>
    <td>
    <button class="btn btn-danger" style = "background-color: yellow; color: black; border: none" onclick="editPet('${
      pet.id
    }')">Edit</button>
  </td>
    `;
    tableBodyEl.appendChild(row);
  });
}
// Hàm chỉnh sửa dữ liệu thông tin thú cưng
function editPet(id) {
  // Hiện lại form nhập dữ liệu
  formEl.classList.remove("hide");
  // find data the pet need to edit
  // Chức năng
  const pet = petArr.find((petItem) => petItem.id === id);
  // Display informations in form
  idInput.value = id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.lengthcao;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilizedInput;

  // hien thi dung cac loai giong cho tung loai Dog -Cat
  renderBreed();
  // Hiển thị dữ liệu loại giống thú cưng (dữ liệu ban đầu trước khi edit)
  breedInput.value = `${pet.breed}`;
}

submitBtn.addEventListener("click", function () {
  // Lấy giá trị nhập liệu từ các trường dữ liệu
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    lengthcao: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  const validate = validateData(data);
  if (validate) {
    //FindIndex trả về vị trí phần tử thỏa mãn
    const index = petArr.findIndex((pet) => pet.id === data.id);
    // Vẫn giữ ngày thêm thú cưng như cũ
    data.date = petArr[index].date;
    //update data
    petArr[index] = data;
    // Cap nhat du lieu duoi dang local storage
    saveToStorage("petArr", petArr);
    formEl.classList.add("hide");
    renderTableData(petArr);
  }
});
//Create function validate du lieu
function validateData(data) {
  // Khai bao bien du lieu
  let isValidate = true;

  if (data.name.trim() === "") {
    alert("Please Input for name");
    isValidate = false;
  }
  if (isNaN(data.age)) {
    alert("Please Input for age");
    isValidate = false;
  }
  if (isNaN(data.weight)) {
    alert("Please Input for weight");
    isValidate = false;
  }
  if (isNaN(data.lengthcao)) {
    alert("Please Input for lenghth");
    isValidate = false;
  }
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15");
    isValidate = false;
  }
  if (data.weiht < 1 || data.weiht > 15) {
    alert("Age must be between 1 and 15");
    isValidate = false;
  }
  if (data.lenthcao < 1 || data.lenthcao > 100) {
    alert("Age must be between 1 and 100");
    isValidate = false;
  }
  if (data.type === "Select Type") {
    alert("please select Type");
    isValidate = false;
  }
  if (data.breed === "Select Breed") {
    alert("Please Input for breed");
    isValidate = false;
  }

  return isValidate;
}

function clearInput() {
  (idInput.value = ""),
    (nameInput.value = ""),
    (ageInput.value = ""),
    (typeInput.value = "Select type"),
    (weightInput.value = ""),
    (lengthInput.value = ""),
    (breedInput.value = "Select type"),
    (vaccinatedInput.checked = ""),
    (dewormedInput.checked = ""),
    (sterilizedInput.checked = "");
}
