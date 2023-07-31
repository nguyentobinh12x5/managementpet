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
  healthyPet = id("healthy-btn");
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
    date: new Date(),
    bmi: "?",
  };
  const validate = validateData(data);
  console.log(validate);
  if (validate) {
    petArr.push(data);
    // Cap nhat du lieu duoi dang local storage
    saveToStorage("petArr", petArr);
    clearInput();
    renderTableData(petArr);
  }
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
    ${displayTime(pet.date).substring(0, 10)}
    </td>
    <td>
    <button class="btn btn-danger" onclick="deletePet('${
      pet.id
    }')">Delete</button>
  </td>
    `;
    tableBodyEl.appendChild(row);
  });
}
// Function display time
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}
//Create function validate du lieu
function validateData(data) {
  // Khai bao bien du lieu
  let isValidate = true;

  if (data.id.trim() === "") {
    alert("Please Input for id");
    isValidate = false;
  }
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
  // Kiểm tra ID
  // Duyệt qua các mảng kiểm tra xem id có bị trùng không
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique");
      isValidate = false;
      //Nếu trùng id lập tức dừng vòng lặp for lại
      break;
    }
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
const deletePet = (PetId) => {
  //Confirm before deletePet
  if (confirm("Are you sure?")) {
    //Thuc Hien Buoc Xoa
    for (let i = 0; i < petArr.length; i++) {
      if (PetId === petArr[i].id) {
        //Xóa khởi mảng
        petArr.splice(i, 1);
        // Cap nhat du lieu duoi dang local storage
        saveToStorage("petArr", petArr);
        renderTableData(petArr);
      }
    }
  }
};

let healthyCheck = true;
healthyPet.addEventListener(`click`, function () {
  if (healthyCheck === true) {
    //Hiển thị thú cứng khỏe mạnh
    //Đổi thông tin nút
    let healthyPetArr = [];
    //lọc ra những thú cưng khỏe mạnh
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        // Thêm thú cưng vào mảng
        healthyPetArr.push(petArr[i]);
      }
    }
    //Gọi hàm hiển thị
    renderTableData(healthyPetArr);
    //Đổi nút thành tên khác
    healthyPet.textContent = "Show All Pets";
    // Đổi lại biến cờ hiệu
    healthyCheck = false;
  } else {
    //Hiển thị toàn bộ thú cưng
    renderTableData(petArr);
    healthyPet.textContent = "Show Healthy Pets";
    healthyCheck = true;
  }
});
