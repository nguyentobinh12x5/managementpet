"use strict";
const navEl = document.getElementById("sidebar");
navEl.addEventListener("click", function () {
  this.classList.toggle("active");
});
const data1 = {
  id: "H001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  lengthcao: 50,
  color: "red",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: false,
  bmi: "?",
  date: new Date(2022, 2, 1),
};
const data2 = {
  id: "H002",
  name: "Jerome",
  age: 3,
  type: "Dog",
  weight: 2,
  lengthcao: 30,
  color: "blue",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: false,
  bmi: "?",
  date: new Date(2022, 2, 1),
};
// data breed
const breed1 = {
  breed: "Mixed Breed",
  type: "Dog",
};

const breed2 = {
  breed: "Tabby",
  type: "Cat",
};
// Get data from petArr
if (!getFromStorage("petArr")) {
  // gan du lieu de test
  saveToStorage("petArr", [data1, data2]);
}

const petArr = getFromStorage("petArr");
console.log(typeof petArr);
console.log(petArr);
// Get data from BreedArr
if (!getFromStorage("breedArr")) {
  // gan du lieu de test
  saveToStorage("breedArr", [breed1, breed2]);
}

const breedArr = getFromStorage("breedArr");
console.log(typeof breedArr);
//Gọi hàm hiển thị
//* Assignment 2
// Store data
// Change object to string
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// Change string to initial bject
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
