
 
let checkecdContacts = [];
let tasks = [];
let subtasks = [];
let priority = "";
let idCounter = 0;
loadtasks();
loadid();

if (window.location.href.includes('addTask')) {
  setTimeout(() => {
    let summarySie = document.getElementById('addTaskSidebar');
    summarySie.style.backgroundColor = '#D2E3FF';
    summarySie.style.borderRadius = '8px';
  }, 200);
}

async function loadtasks() {
  try {
    tasks = JSON.parse(await getItem("tasks"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

async function loadid() {
  try {
    idCounter = JSON.parse(await getItem("idCounter"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

async function tryContact() {
  const contacts = JSON.parse(await getItem("contacts"));
  const icon = document.getElementById("dropIcon");
  let select = document.getElementById("dropdown");
  select.innerHTML = "";
  if (icon.classList.contains("bi-caret-down-fill")) {
    icon.classList.remove("bi-caret-down-fill");
    icon.classList.add("bi-caret-up-fill");
    select.style.maxHeight = "300px";
    select.style.flexDirection = "column";

    for (let i = 0; i < contacts.length; i++) {
      const optionInitials = contacts[i].name
        .split(" ")
        .map((word) => word[0].toUpperCase())
        .join("");
      let isChecked = checkecdContacts.includes(i); // Überprüfen, ob der Kontakt ausgewählt ist

      select.innerHTML += /*html*/ `
        <div class="dropdownItem">
          <div class="nameAndInitiales">
            <div class="roundNameDropdown" style="background-color:${
              contacts[i].color
            }">${optionInitials}</div>
            <div>${contacts[i].name}</div>
          </div>
          <input type="checkbox" onclick="getcha(${i})" id="${i}" ${
        isChecked ? "checked" : ""
      }>
        </div>
      `;
    }
    select.innerHTML += /*html*/ `
    <button
    id="addContactTask"
    class="btn btn-primary"
    onclick="addContact()"
  >
    Add new contact <img src="grafiken/person_add.png" />
  </button>
    `;
  } else if (icon.classList.contains("bi-caret-up-fill")) {
    icon.classList.remove("bi-caret-up-fill");
    icon.classList.add("bi-caret-down-fill");
    select.innerHTML = "";
    select.style.height = "auto";
    select.style.flexDirection = "initial";
    for (let j = 0; j < checkecdContacts.length; j++) {
      console.log(checkecdContacts[j]);
      console.log(contacts[checkecdContacts[j]]);

      const optionInitials = contacts[checkecdContacts[j]].name
        .split(" ")
        .map((word) => word[0].toUpperCase())
        .join("");
      select.innerHTML += /*html*/ `
      <div class="roundNameDropdown" style="background-color:${
        contacts[checkecdContacts[j]].color
      }">
        ${optionInitials}
      </div>`;
    }
  }
}

async function getcha(i) {
  let checkbox = document.getElementById(`${i}`);

  if (checkbox.checked) {
    checkecdContacts.push(i);
    console.log(checkecdContacts);
  } else {
    const index = checkecdContacts.indexOf(i);
    if (index > -1) {
      checkecdContacts.splice(index, 1);
      console.log(checkecdContacts);
    }
  }
}

function getPriority(selected) {
  low = document.getElementById("low");
  medium = document.getElementById("medium");
  urgent = document.getElementById("urgent");
  lowImg = document.getElementById("imgLow");
  mediumImg = document.getElementById("imgMedium");
  urgentImg = document.getElementById("imgUrgent");

  switch (selected) {
    case "low":
      if (
        low.style.backgroundColor == "white" ||
        low.style.backgroundColor == ""
      ) {
        priority = "low";
        low.style.color = "white";
        low.style.backgroundColor = "yellowgreen";
        lowImg.classList.add("white-image");
        medium.style.backgroundColor = "white";
        urgent.style.backgroundColor = "white";
        medium.style.color = "black";
        urgent.style.color = "black";
        mediumImg.classList.remove("white-image");
        urgentImg.classList.remove("white-image");
        break;
      } else {
        low.style.backgroundColor = "white";
        low.style.color = "black";
        lowImg.classList.remove("white-image");
        priority = "";
        break;
      }
    case "medium":
      if (
        medium.style.backgroundColor == "white" ||
        medium.style.backgroundColor == ""
      ) {
        priority = "medium";
        medium.style.color = "white";
        medium.style.backgroundColor = "#FFA800";
        mediumImg.classList.add("white-image");
        low.style.backgroundColor = "white";
        urgent.style.backgroundColor = "white";
        low.style.color = "black";
        urgent.style.color = "black";
        lowImg.classList.remove("white-image");
        urgentImg.classList.remove("white-image");
        break;
      } else {
        medium.style.backgroundColor = "white";
        medium.style.color = "black";
        mediumImg.classList.remove("white-image");
        priority = "";
        break;
      }
    case "urgent":
      if (
        urgent.style.backgroundColor == "white" ||
        urgent.style.backgroundColor == ""
      ) {
        priority = "urgent";
        urgent.style.color = "white";
        urgent.style.backgroundColor = "orangered";
        urgentImg.classList.add("white-image");
        medium.style.backgroundColor = "white";
        low.style.backgroundColor = "white";
        medium.style.color = "black";
        low.style.color = "black";
        mediumImg.classList.remove("white-image");
        lowImg.classList.remove("white-image");
        break;
      } else {
        urgent.style.backgroundColor = "white";
        urgent.style.color = "black";
        urgentImg.classList.remove("white-image");
        priority = "";
        break;
      }
  }
}

function addSubtask() {
  const subtask = document.getElementById("subtasks");
  const subtaskSection = document.getElementById("subtask-section");
  subtasks.push(subtask.value);

  console.log(subtasks);
  subtaskSection.innerHTML += /*html*/ `
<div>${subtask.value} </div>
`;
  subtask.value = "";
}
/////////////////////////////////////////Ahmed//////////////////////////////////

async function createTask() {
  const taskTitle = document.getElementById("task-title").value;
  const taskDescription = document.getElementById("task-description").value;
  const taskDate = document.getElementById("task-date").value;
  idCounter++;
  const category = document.querySelector(".category-select").value;
  tasks.push({
    title: taskTitle,
    description: taskDescription,
    date: taskDate,
    priority: priority,
    assigned: checkecdContacts,
    category: category,
    subtasks: subtasks,
    taskCategory: "toDo",
    id: idCounter,
  });
  await setItem("tasks", JSON.stringify(tasks));
  await setItem("idCounter", JSON.stringify(idCounter));

  const popup = document.getElementById("popup");
  popup.classList.add("show");
  setTimeout(function () {
    popup.classList.remove("show");
    window.location.href = "board.html";
  }, 1000);
  
}

// Definieren Sie die Funktion clearTask, aber fügen Sie den Eventlistener erst hinzu, nachdem das Dokument vollständig geladen wurde.
function clearTask() {
  // Eingabefeld "task-title" zurücksetzen
  const taskTitle = document.getElementById("task-title");
  taskTitle.value = "";

  // Eingabefeld "task-description" zurücksetzen
  const taskDescription = document.getElementById("task-description");
  taskDescription.value = "";

  // Eingabefeld "task-date" zurücksetzen
  const taskDate = document.getElementById("task-date");
  taskDate.value = "";

  // Radio-Buttons zurücksetzen
  const radioButtons = document.querySelectorAll('.radioBtn');
  radioButtons.forEach((radioButton) => {
    // Überprüfen, ob das Radio-Button ausgewählt ist, und es abwählen
    if (radioButton.style.backgroundColor !== "white" && radioButton.style.backgroundColor !== "") {
      radioButton.style.backgroundColor = "white";
      radioButton.style.color = "black";
      // Hier können Sie auch die Bilder zurücksetzen, falls erforderlich
    }
  });

  // Select-Feld "assigned" zurücksetzen
  const dropdown = document.getElementById("dropdown");
  while (dropdown.firstChild) {
    dropdown.removeChild(dropdown.firstChild);
    clearSelection();
  }
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Select-Feld "category-select" zurücksetzen
  const categorySelect = document.querySelector(".category-select");
  categorySelect.selectedIndex = 0;

  // Eingabefeld "subtasks" zurücksetzen
  const subtasks = document.getElementById("subtasks");
  subtasks.value = "";
}

// Fügen Sie den Eventlistener erst hinzu, wenn das Dokument vollständig geladen ist
document.addEventListener("DOMContentLoaded", function () {
  const clearButton = document.querySelector(".btn-outline-secondary");
  clearButton.addEventListener("click", clearTask);
});

let checkboxStatus = {}; // Objekt zur Speicherung des Checkbox-Status

// Funktion zum Speichern des Checkbox-Status
function saveCheckboxStatus() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkboxStatus[checkbox.id] = checkbox.checked;
  });
}

// Funktion zum Wiederherstellen des Checkbox-Status
function restoreCheckboxStatus() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    if (checkbox.id in checkboxStatus) {
      checkbox.checked = checkboxStatus[checkbox.id];
    } else {
      checkbox.checked = false; // Standardmäßig auf nicht ausgewählt setzen
    }
  });
}

// Funktion, die aufgerufen wird, wenn das Dropdown-Menü geöffnet wird
function openDropdown() {
  saveCheckboxStatus();
  // Hier öffnen Sie das Dropdown-Menü
}

// Funktion, die aufgerufen wird, wenn das Dropdown-Menü geschlossen wird
function closeDropdown() {
  restoreCheckboxStatus();
  // Hier schließen Sie das Dropdown-Menü
}

function clearSelection() {
  const dropdown = document.getElementById("dropdown");

  // Dropdown-Liste zurücksetzen
  while (dropdown.firstChild) {
    dropdown.removeChild(dropdown.firstChild);
  }

  // Auswahl zurücksetzen
  selectedContact = null;
}
