const localStorageKey = "to-do-list";
const itemsPerPage = 6;
let currentPage = 1;

function validatedIfExistesNewTask(inputValue) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let exists = values.find((x) => x.name === inputValue);
  return exists ? true : false;
}

function newTask() {
  let input = document.getElementById("input-new-task");
  input.style.border = "";

  // Validation
  if (!input.value) {
    input.style.border = "1px solid red";
    alert("Enter something to add to your list");
  } else if (validatedIfExistesNewTask(input.value)) {
    alert("A task with this name already exists");
  } else {
    // Update localStorage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    values.push({
      name: input.value,
    });
    localStorage.setItem(localStorageKey, JSON.stringify(values));

    // Clear input after adding
    input.value = "";

    // Update displayed list
    showValues();
  }
}

function showValues() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let list = document.getElementById("to-do-list");

  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;

  list.innerHTML = "";

  for (let i = startIndex; i < endIndex && i < values.length; i++) {
    list.innerHTML += `<li>${values[i]["name"]} <button id='btn-ok' onclick='removeItem("${values[i].name}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/></svg></button></li>`;
  }
}

function removeItem(data) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let index = values.findIndex((x) => x.name === data);
  values.splice(index, 1);
  localStorage.setItem(localStorageKey, JSON.stringify(values));
  showValues();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePageNumber();
    showValues();
  }
}

function nextPage() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let totalPages = Math.ceil(values.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    updatePageNumber();
    showValues();
  } else {
    currentPage = totalPages;
    showValues();
  }
}

function updatePageNumber() {
  const pageNumberElement = document.getElementById("page-number");
  pageNumberElement.textContent = currentPage;
}

document
  .getElementById("input-new-task")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      newTask();
    }
  });

// Initial call to display any existing tasks
showValues();
