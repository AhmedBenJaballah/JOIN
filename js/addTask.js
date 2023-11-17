let checkecdContacts = [];
let tasks = [];
let subtasks = [];
let priority = "";
let idCounter = 0;
loadtasks();
loadid();
isClickedEdit= false;
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
    if(isClickedEdit){createdInEdit();}
    setTimeout(() => {
      let addTaskSidebar = document.getElementById("addTaskSidebar");
      const windowWidth = window.innerWidth;
      if (addTaskSidebar)
      {if (windowWidth < 1040) {
        styleSidebarUnderAT(addTaskSidebar);
      } else {
        styleSidebarOverAT(addTaskSidebar)
      }}
    }, 200);
  }
}

/**
 * this function is used to style the sidebar if the width is less than 1040px
 * @param {div} addTaskSidebar sidebar in addTask.html
 */
function styleSidebarUnderAT(addTaskSidebar) {
  addTaskSidebar.style.backgroundColor = "transparent";
  addTaskSidebar.style.color = "#337aec";
}

/**
 * this function is used to style the sidebar if the width is more than 1040px
 * @param {div} addTaskSidebar sidebar in addTask.html
 */
function styleSidebarOverAT(addTaskSidebar) {
  addTaskSidebar.style.backgroundColor = "#D2E3FF";
  addTaskSidebar.style.borderRadius = "8px";
  addTaskSidebar.style.color = "#42526E";
}

/**
 * this function is used to creat subtasks in edit 
 */
function createdInEdit(){
  if(isClickedEdit){
    const subtaskCreated = document.getElementById("subtasks").value;
    const subtask = tasks[idForEditSubtask]["subtasks"];
    const subtaskSection = document.getElementById("subtask-section");
    let counterForEditSubtask= subtask.length ;
  if (subtask.value==''){subtask.style.borderBottom='1px solid red'}
  else{
    subtask.push(subtaskCreated);
    subtaskSection.innerHTML += createdInEditTemplate(counterForEditSubtask,subtask)}
  } 
}

/**
 * this function is used to generate a template html for edit task
 * @param {number} counterForEditSubtask number of subtasks
 * @returns 
 */
function createdInEditTemplate(counterForEditSubtask, subtask) {
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const initialPopupDisplay = screenWidth <= 361 ? 'block' : 'none';
  return /*html*/ `
    <div class="subEditCon" onmouseenter="displayPopup(this)" onmouseleave="hidePopup(this)">
      <input id='inputSubtask${counterForEditSubtask}' class="hoverToEdit" value='${subtask[counterForEditSubtask]}' disabled>  
      <div class="popupToEdit" style="display: ${initialPopupDisplay};">
        <img onclick="editSubtask(${counterForEditSubtask})" src="../grafiken/edit.png">
        |
        <img onclick="deleteSubtask(${counterForEditSubtask})" src="../grafiken/delete.png">
      </div>
    </div>
  `;
}


/**
 * this function is used to prevent selecting a past date
 */
function setDate() {
  const taskDateInput = document.getElementById("task-date");
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  if(taskDateInput){
    taskDateInput.setAttribute("min", formattedDate);
  }
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
  toggleIconAndStyles(icon, select);
  renderDropdownMenu(select, contacts);
}

/**
 * this function is used to toggle the dropdown menu
 * @param {div} icon arrow of the dropdown menu
 * @param {div} select the box of the dropdown menu
 */
function toggleIconAndStyles(icon, select) {
  icon.classList.remove("bi-caret-down-fill");
  icon.classList.add("bi-caret-up-fill");
  select.style.maxHeight = "300px";
  select.style.flexDirection = "column";
}

/**
 * this function is used to render the dropdown menu
 * @param {div} select the box of the dropdown menu
 * @param {JSON} contacts the list of contacts
 */
function renderDropdownMenu(select, contacts) {
  for (let i = 0; i < contacts.length; i++) {
    const optionInitials = contacts[i].name.split(" ")
      .map((word) => word[0].toUpperCase()).join("");
    let isChecked = checkecdContacts.includes(i);
    select.innerHTML += showTheDropdownMenu(contacts,optionInitials,isChecked,i);
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
    const optionInitials = contacts[checkecdContacts[j]].name.split(" ")
      .map((word) => word[0].toUpperCase()).join("");
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

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("dropdown");
    const icon = document.getElementById("dropIcon");
      if(dropdown){
            if (!dropdown.contains(event.target) && event.target !== icon) {
              if (icon.classList.contains("bi-caret-up-fill")) {
                dropdownNotShown(icon, dropdown, contacts);
              }
            }
      }
  });
});


/**
 * this function is used to verify is the checkbox is selected or not
 * @param {number} i the contact's index
 */
async function getcha(i) {
  let checkbox = document.getElementById(`${i}`);
  if (checkbox.checked) {
    checkecdContacts.push(i);
  } else {
    const index = checkecdContacts.indexOf(i);
    if (index > -1) {
      checkecdContacts.splice(index, 1);
    }
  }
}
