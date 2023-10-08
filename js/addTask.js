//tryContact();

let checkecdContacts = [];
let tasks = [];
let subtasks = [];
let priority = "";
loadtasks();

async function loadtasks() {
  try {
    tasks = JSON.parse(await getItem("tasks"));
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

  //const assignedTo = document.querySelector(".assigned-select").value;
  //Ahmed:hallo chihad hier brauchst du assigned to nicht zu speichern es sind in der Variable
  //Ahmed:checkecdContacts gespeichert
  const category = document.querySelector(".category-select").value;
  //const subtasks = document.getElementById("subtasks").value;

  // Erstelle eine HTML-Ausgabe mit den erfassten Daten
  const outputHTML = `<div class="createdTask">
      <h2>Task Details</h2>
      <p><strong>Title:</strong> ${taskTitle}</p>
      <p><strong>Description:</strong> ${taskDescription}</p>
      <p><strong>Due Date:</strong> ${taskDate}</p>

      
      <p><strong>Category:</strong> ${category}</p>
      <
      </div>
    `;
  //Ahmed: hier können wir direkt speichern
  tasks.push({
    title: taskTitle,
    description: taskDescription,
    date: taskDate,
    priority: priority,
    assigned: checkecdContacts,
    category: category,
    subtasks: subtasks,
    taskCategory: 'toDo'
  });
  await setItem("tasks", JSON.stringify(tasks));

  //Ahmed: hier direkt zu board kannsk deine animation anpassen

  //document.getElementById("output").innerHTML = outputHTML;

  const popup = document.getElementById("popup");
  popup.classList.add("show");
  setTimeout(function () {
    popup.classList.remove("show");
    window.location.href = "board.html";
  }, 1000);
}

function clearTask() {
  document.getElementById("task-title").value = "";

  document.getElementById("task-description").value = "";

  document.getElementById("task-date").value = "";

  const radioButtons = document.querySelectorAll(
    'input[name="options-outlined"]'
  );
  radioButtons.forEach((radioButton) => {
    radioButton.checked = false;
  });

  const assignedSelect = document.querySelector(".assigned-select");
  assignedSelect.selectedIndex = 0;

  const categorySelect = document.querySelector(".category-select");
  categorySelect.selectedIndex = 0;

  document.getElementById("subtasks").value = "";
}

const clearButton = document.querySelector(".btn-outline-secondary");
clearButton.addEventListener("click", clearTask);

// contact.js

/*let contacts = [];

// Lade die Kontakte beim Start der Seite
loadContacts();

// Funktion zum Laden der Kontakte
async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

// Funktion zum Anzeigen der Kontakte
function displayContacts() {
    const contactList = document.getElementById("contact-list");
    contactList.innerHTML = "";

    contacts.forEach((contact, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = contact.name;
        listItem.addEventListener("click", () => {
            displayContactDetails(index);
        });
        contactList.appendChild(listItem);
    });
}

// Funktion zum Anzeigen der Details eines ausgewählten Kontakts
function displayContactDetails(index) {
    const contactDetails = document.getElementById("contact-details");
    contactDetails.innerHTML = "";

    const selectedContact = contacts[index];
    const contactInfo = document.createElement("div");
    contactInfo.innerHTML = `
        <h2>${selectedContact.name}</h2>
        <p>Email: ${selectedContact.email}</p>
        <p>Phone: ${selectedContact.phone}</p>
    `;
    contactDetails.appendChild(contactInfo);
}

// Event-Listener für das Laden der Kontakte
document.addEventListener("DOMContentLoaded", () => {
    displayContacts();
});*/
