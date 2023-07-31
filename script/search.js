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
  findBtn = id("find-btn"),
  formEl = id("container-form");
renderTableData(petArr);
console.log(petArr);
console.log(breedArr);
renderBreed();
// * Hiển thị các tất cả giá trị của trường Breed không phân biệt Dog và Cat
function renderBreed() {
  breedArr.forEach((breedItem) => {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
findBtn.addEventListener("click", function () {
  let petArrFind = petArr.filter(
    (pet) =>
      (idInput.value && pet.id.includes(idInput.value)) ||
      (nameInput.value && pet.name.includes(nameInput.value)) ||
      (typeInput.value !== "Select Type" &&
        pet.type.includes(typeInput.value)) ||
      (breedInput.value !== "Select Breed" &&
        pet.breed.includes(breedInput.value)) ||
      (vaccinatedInput.checked === true && pet.vaccinated === true) ||
      (dewormedInput.checked === true && pet.dewormed === true) ||
      (sterilizedInput.checked === true && pet.sterilized === true)
  );
  //   let petArrFind = petArr;
  //   if (idInput.value) {
  //     petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  //   }
  //   if (nameInput.value) {
  //     petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  //   }
  //   if (typeInput.value !== "Select Type") {
  //     petArrFind = petArrFind.filter((pet) => pet.type.includes(typeInput.value));
  //   }
  //   if (breedInput.value !== "Select Breed") {
  //     petArrFind = petArrFind.filter((pet) =>
  //       pet.breed.includes(breedInput.value)
  //     );
  //   }
  //   if (vaccinatedInput.checked === true) {
  //     petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  //   }
  //   if (dewormedInput.checked === true) {
  //     petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  //   }
  //   if (sterilizedInput.checked === true) {
  //     petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  //   }
  renderTableData(petArrFind);
});
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
    `;
    tableBodyEl.appendChild(row);
  });
}

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
