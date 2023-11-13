let checkecdContacts = [];
let tasks = [];
let subtasks = [];
let priority = "";
let idCounter = 0;
loadtasks();
loadid();
setSidebarStyles();
window.addEventListener("resize", setSidebarStyles);
setTimeout(() => {
  setDate();
}, 1000);
let checkboxStatus = {}; 

/**
 * this function is used to style the Sidebar based on the screen resolution
 */
function setSidebarStyles() {
  if (window.location.href.includes("addTask")) {
    setTimeout(() => {
      let addTaskSidebar = document.getElementById("addTaskSidebar");
      const windowWidth = window.innerWidth;
      if (addTaskSidebar)
      {if (windowWidth < 1040) {
        addTaskSidebar.style.backgroundColor = "transparent";
        addTaskSidebar.style.color = "#337aec";
      } else {
        addTaskSidebar.style.backgroundColor = "#D2E3FF";
        addTaskSidebar.style.borderRadius = "8px";
        addTaskSidebar.style.color = "#42526E";
      }}
    }, 200);
  }
}

/**
 * this function is used to prevent selecting a past date
 */
function setDate() {
  const taskDateInput = document.getElementById("task-date");
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  taskDateInput.setAttribute("min", formattedDate);
}

/**
 * this function is used to load tasks
 */
async function loadtasks() {
  try {
    tasks = JSON.parse(await getItem("tasks"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * this function is used to load the task's id
 */
async function loadid() {
  try {
    idCounter = JSON.parse(await getItem("idCounter"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * this function is used to render the contacts in the dropdown menu
 * @param {div} icon arrow of the dropdown menu
 * @param {div} select the box of the dropdown menu
 * @param {JSON} contacts the list of contacts
 */
function dropdownShown(icon, select, contacts) {
  icon.classList.remove("bi-caret-down-fill");
  icon.classList.add("bi-caret-up-fill");
  select.style.maxHeight = "300px";
  select.style.flexDirection = "column";

  for (let i = 0; i < contacts.length; i++) {
    const optionInitials = contacts[i].name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
    let isChecked = checkecdContacts.includes(i);
    select.innerHTML += showTheDropdownMenu(
      contacts,
      optionInitials,
      isChecked,
      i
    );
  }
  select.innerHTML += addContactButton();
}

/**
 * this function is used to render every contacst with its initial and checkbox
 * @param {JSON} contacts list of contacts
 * @param {string} optionInitials initials of the contact
 * @param {boolean} isChecked checks if the contact's checkbox has been checked
 * @param {number} i the contact's index
 * @returns
 */
function showTheDropdownMenu(contacts, optionInitials, isChecked, i) {
  return /*html*/ `
  <div class="dropdownItem">
    <div class="nameAndInitiales">
      <div class="roundNameDropdown" style="background-color:${
        contacts[i].color
      };border: 1px solid white;font-weight:400; font-size:18px">${optionInitials}</div>
      <div style='font-weight:400;color:black'>${contacts[i].name}</div>
    </div>
    <input type="checkbox" onclick="getcha(${i})" id="${i}" ${
    isChecked ? "checked" : ""
  }>
  </div>
`;
}

/**
 * this function is used to render the 'add contact' button
 * @returns
 */
function addContactButton() {
  return /*html*/ `
  <button
  id="addContactTask"
  class="btn btn-primary"
  onclick="addContact()"
>
  Add new contact <img src="grafiken/person_add.png" />
</button>
  `;
}

/**
 * this function is used to render the initials after checking the box
 * @param {div} icon arrow of the dropdown menu
 * @param {div} select the box of the dropdown menu
 * @param {JSON} contacts the list of contacts
 */
function dropdownNotShown(icon, select, contacts) {
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
    select.innerHTML += templateInitials(contacts, optionInitials, j);
  }
}

/**
 * this function is used to  generate the html foe the initials
 * @param {JSON} contacts list of contacts
 * @param {string} optionInitials initials of the contact
 * @param {number} j the contact's index
 * @returns
 */
function templateInitials(contacts, optionInitials, j) {
  return /*html*/ `
  <div class="roundNameDropdown" style="background-color:${
    contacts[checkecdContacts[j]].color
  };border: 1px solid white;font-weight:400; font-size:18px"">
    ${optionInitials}
  </div>`;
}

/**
 * this function is used to render the dropdown menu
 */
async function tryContact() {
  const contacts = JSON.parse(await getItem("contacts"));
  const icon = document.getElementById("dropIcon");
  let select = document.getElementById("dropdown");
  select.innerHTML = "";
  if (icon.classList.contains("bi-caret-down-fill")) {
    dropdownShown(icon, select, contacts);
  } else if (icon.classList.contains("bi-caret-up-fill")) {
    dropdownNotShown(icon, select, contacts);
  }
}

/**
 * this function is used to verify is the checkbox is selected or not
 * @param {number} i the contact's index
 */
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

/**
 * this function is used to set the style of the selected case 
 * @param {string} aCase the name of the selected case 
 * @param {div} chosenCase the selected case element
 * @param {string} colorCase the selected color of the element
 * @param {div} caseImage the selected image of the element
 * @param {div} otherCase1 the other not selected element
 * @param {div} otherCase2 the other not selected element
 * @param {div} otherCaseImage1 the other image of the not selected element
 * @param {div} otherCaseImage2 the other image of the not selected element
 */
function priorityCase(aCase, chosenCase,colorCase,caseImage,otherCase1,otherCase2,otherCaseImage1,otherCaseImage2){
priority= aCase;
chosenCase.style.color = "white";
chosenCase.style.backgroundColor = colorCase;
caseImage.classList.add("white-image");
otherCase1.style.backgroundColor = "white";
otherCase2.style.backgroundColor = "white";
otherCase1.style.color = "black";
otherCase2.style.color = "black";
otherCaseImage1.classList.remove("white-image");
otherCaseImage2.classList.remove("white-image");
}

/**
 * this function is used to style the element id its unselected
 * @param {div} selectedCase the selected case
 * @param {div} image the image of the selected case
 */
function notSelected(selectedCase,image) {
  selectedCase.style.backgroundColor = "white";
  selectedCase.style.color = "black";
  image.classList.remove("white-image");
  priority = "";
}

/**
 * this function is used to check if the case is not selected yet
 * @param {div} selectedCase the selected case
 * @returns 
 */
function firstSelction(selectedCase){
  return (selectedCase.style.backgroundColor == "white" ||
          selectedCase.style.backgroundColor == "")
}

/**
 * this functionis used to set the case of the task
 * @param {string} selected the selected case
 */
function getPriority(selected) {
  low = document.getElementById("low");
  medium = document.getElementById("medium");
  urgent = document.getElementById("urgent");
  lowImg = document.getElementById("imgLow");
  mediumImg = document.getElementById("imgMedium");
  urgentImg = document.getElementById("imgUrgent");

  switch (selected) {
    case "low":
      if ( firstSelction(low)) {
        priorityCase("low",low,"yellowgreen",lowImg,medium,urgent,mediumImg,urgentImg);
        break;
      } else {
        notSelected(low,lowImg);
        break;
      }
    case "medium":
      if (firstSelction(medium)) {
        priorityCase("medium",medium,"#FFA800",mediumImg,low,urgent,lowImg,urgentImg);
        break;
      } else {
        notSelected(medium,mediumImg);
        break;
      }
    case "urgent":
      if (firstSelction(urgent)) {
        priorityCase("urgent",urgent,"orangered",urgentImg,low,medium,lowImg,mediumImg);
        break;
      } else {
        notSelected(urgent,urgentImg);
        break;
      }
    default:
      priority = "low";
  }
}

/**
 *  this function is used to render the new subtasks
 */
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

/**
 * this function is used to style the required fields if not filled
 * @param {string} requiredFieldValue the value of the required field
 * @param {div} requiredField the required field
 */
function isFilled(requiredFieldValue,requiredField){
  
  if (requiredFieldValue === "" || requiredFieldValue ==="Select task category" || requiredField.placeholder === "Enter a title") {
    requiredField.style.borderBottom =
      "2px solid red";
      requiredField.style.color = "red";
     
  } else {
    requiredField.style.borderBottom =
      "1px solid black";
      requiredField.style.color = "black";
  }
}


/**
 * this function is used to check if the required fields are filled
 * @returns
 */
function requiredNotFilled(taskTitle,taskDate,category){
  return(    taskTitle.value === "Enter a title" ||
              taskDate.value === "" ||
              category.value === "Select task category"
)
}

/**
 * this function is used to confirm the creation of the task
 */
function successfullyCreated(){
  const popup = document.getElementById("popup");
  popup.classList.add("show");
  setTimeout(function () {
    popup.classList.remove("show");
    window.location.href = "board.html";
  }, 1000);
}

/**
 * this function is used to create a task
 */
async function createTask() {
  const taskTitle = document.getElementById("task-title");
  const taskDescription = document.getElementById("task-description").value;
  const taskDate = document.getElementById("task-date");
  const category = document.querySelector(".category-select");
  if (requiredNotFilled(taskTitle,taskDate,category)) {
    isFilled(taskTitle.value,taskTitle);
    isFilled(taskDate.value,taskDate);
    isFilled(category.value,category);
  } else {
    idCounter++;
    tasks.push({
      title: taskTitle.value,
      description: taskDescription,
      date: taskDate.value,
      priority: priority,
      assigned: checkecdContacts,
      category: category.value,
      subtasks: subtasks,
      taskCategory: "toDo",
      id: idCounter,
    });
    await setItem("tasks", JSON.stringify(tasks));
    await setItem("idCounter", JSON.stringify(idCounter));
    successfullyCreated();
  }
}

/**
 * this function is used to clear the task
 */
function clearTask() {
  const taskTitle = document.getElementById("task-title");
  taskTitle.value = "";
  const taskDescription = document.getElementById("task-description");
  taskDescription.value = "";
  const taskDate = document.getElementById("task-date");
  taskDate.value = "";
  const radioButtons = document.querySelectorAll(".radioBtn");
  radioButtons.forEach((radioButton) => {
    if (
      radioButton.style.backgroundColor !== "white" &&
      radioButton.style.backgroundColor !== ""
    ) {
      radioButton.style.backgroundColor = "white";
      radioButton.style.color = "black";
    }
  });
  const dropdown = document.getElementById("dropdown");
  while (dropdown.firstChild) {
    dropdown.removeChild(dropdown.firstChild);
    clearSelection();
  }
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  }); 
  const categorySelect = document.querySelector(".category-select");
  categorySelect.selectedIndex = 0;
  const subtasks = document.getElementById("subtasks");
  subtasks.value = "";
}

document.addEventListener("DOMContentLoaded", function () {
  const clearButton = document.querySelector(".btn-outline-secondary");
  clearButton.addEventListener("click", clearTask);
});

/**
 * this function is used to save the status of the checkbox
 */
function saveCheckboxStatus() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkboxStatus[checkbox.id] = checkbox.checked;
  });
}

/**
 * this function is used to restore the checkbox status
 */
function restoreCheckboxStatus() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    if (checkbox.id in checkboxStatus) {
      checkbox.checked = checkboxStatus[checkbox.id];
    } else {
      checkbox.checked = false; 
    }
  });
}

/**
 * this function is used to open the dropdown
 */
function openDropdown() {
  saveCheckboxStatus();

}

/**
 * this function is used to close the dropdown
 */
function closeDropdown() {
  restoreCheckboxStatus(); 
}

/**
 * this function is used to clear the dropdown menu
 */
function clearSelection() {
  const dropdown = document.getElementById("dropdown");
  while (dropdown.firstChild) {
    dropdown.removeChild(dropdown.firstChild);
  }
  selectedContact = null;
}