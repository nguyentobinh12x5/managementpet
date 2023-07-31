const btnExport = document.getElementById("export-btn");
btnExport.addEventListener("click", function () {
  const isExport = confirm("Do you confirm to export data?");
  if (isExport) {
    saveStaticDataToFile();
  }
});
function saveStaticDataToFile() {
  // Get the data from storage
  const petArr = getFromStorage("petArr");

  // Convert the data to JSON
  const jsonData = JSON.stringify(petArr, null, 2);

  // Create a blob from the JSON data
  const blob = new Blob([jsonData], {
    type: "application/json",
  });
  // Save file
  saveAs(blob, "petArr.json");
}
