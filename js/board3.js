/**
 * this function is used to close the popup
 */
function closePopup() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  const popupDiv = document.querySelector(".popup-div");
  popupDiv.classList.remove("show");
  setTimeout(() => {
    popupDiv.remove();
  }, 300);
}

/**
 * this function is used to delete a task
 * @param {number} index
 */
async function deleteTask(index) {
  const popupDiv = document.querySelector(".popup-div");
  const overlayDiv = document.querySelector(".overlay");
  if (popupDiv && overlayDiv) {
    popupDiv.classList.remove("show");
    setTimeout(() => {
      popupDiv.remove();
    }, 300);
    overlayDiv.style.display = "none";
    const todelete = tasks[index]["id"];
    const taskContainer = document.getElementById(`showTask-${todelete}`);
    if (taskContainer) {taskContainer.remove();}
    tasks.splice(index, 1);
    await setItem("tasks", JSON.stringify(tasks));
    renderHTML();
  }
}

/**
 * this function is used to render the task by clicking on edit
 * @param {number} id task id
 * @returns
 */
function renderTaskByEdit(id) {
  return /*html*/ `
  <img onclick="closePopup2()" class="popup-close-button" src="/grafiken/close.png"> 
  <div w3-include-html="includes/add-task-template.html"></div>
  <button class="apply-button" onclick="applyModifications(${id})">Ok <img src="/grafiken/check.png"></button> 
  </div>
`;
}

/**
 * this function is used to render the assigned contacts after clicking on edit
 * @param {array} assigned array that contains the assigned contacts
 */
function renderAssignedByEdit(assigned) {
  const assignedInitials = document.getElementById(`dropdown`);
  for (let j = 0; j < assigned.length; j++) {
    const optionInitials = contacts[assigned[j]].name.split(" ")
      .map((word) => word[0].toUpperCase()).join("");
    assignedInitials.innerHTML += /*html*/ `
                <div class="roundNameDropdownTask2" style="background-color:${
                  contacts[assigned[j]].color}">
                  ${optionInitials} </div>`;}
  checkecdContacts = [];
  for (let i = 0; i < assigned.length; i++) {
    checkecdContacts.push(assigned[i]);
  }
  assignedInitials.style.flexDirection = "row";
}

/**
 * this function is used to render the subtasks after clicking on edit
 * @param {number} id task id
 */
function renderSubtaskbyEdit(id) {
  subtasks = [];
  idForEditSubtask=id;
  const subtaskSection = document.getElementById("subtask-section");
  const subtask = tasks[id]["subtasks"];
  for (let i = 0; i < subtask.length; i++) {
    subtaskSection.innerHTML += /*html*/ `
    <div class="subEditCon" onmouseenter="displayPopup(this)" onmouseleave="hidePopup(this)">
    <input id='inputSubtask${i}' class="hoverToEdit" value='${subtask[i]}' disabled>  
    <div class="popupToEdit"><img onclick="editSubtask(${i})" src="../grafiken/edit.png">|<img onclick="deleteSubtask(${i})" src="../grafiken/delete.png"></div>
    </div>
    `;
  }
}

/**
 * this function is used to create a subtask in edit
 */
function createdInEdit() {
  if(isClickedEdit){
    const subtaskCreated = document.getElementById("subtasks").value;
    const subtask = tasks[idForEditSubtask]["subtasks"];
    const subtaskSection = document.getElementById("subtask-section");
    let counterForEditSubtask= subtask.length ;
  if (subtask.value==''){subtask.style.borderBottom='1px solid red'}
  else{
    subtask.push(subtaskCreated);
    subtaskSection.innerHTML +=createdInEditTemplate(counterForEditSubtask,subtask)  
  }
  }
}

/**
 * this function is used to create a html template to create a subtask in edit
 * @param {number} counterForEditSubtask 
 * @param {array} subtask 
 * @returns 
 */
function createdInEditTemplate(counterForEditSubtask,subtask) {
  return/*html*/ `
  <div class="subEditCon" onmouseenter="displayPopup(this)" onmouseleave="hidePopup(this)">
  <input id='inputSubtask${counterForEditSubtask}' class="hoverToEdit" value='${subtask[counterForEditSubtask]}' disabled>  
  <div class="popupToEdit">
    <img onclick="editSubtask(${counterForEditSubtask})" src="../grafiken/edit.png">
    | 
    <img onclick="deleteSubtask(${counterForEditSubtask})" src="../grafiken/delete.png">
  </div>
  </div>
  `;
}

/**
 * this function is used to display popup
 * @param {div} element the selected element
 */
function displayPopup(element) {
  const popup = element.querySelector(".popupToEdit");
  popup.style.display = "block";
}

/**
 * this function is used to hide the popup
 * @param {div} element the selected element
 */
function hidePopup(element) {
  const popup = element.querySelector(".popupToEdit");
  popup.style.display = "none";
}

/**
 * this function is used to edit the subtask
 * @param {number} subtaskIndex the subtask index
 */
function editSubtask(subtaskIndex) {
  const allHoverToEditElements = document.querySelectorAll('.hoverToEdit');
  allHoverToEditElements.forEach((element) => {
    if (element.id !== `inputSubtask${subtaskIndex}`) {
      element.style.backgroundColor = 'transparent';
      element.style.borderBottom = 'none';
      element.disabled = true;}
  });
  const te = document.getElementById(`inputSubtask${subtaskIndex}`);
  te.disabled = false;
  te.style.backgroundColor='white'
  te.style.borderBottom='1px solid skyblue'
}

/**
 * this function is used to delete the subtask
 * @param {number} subtaskIndex 
 */
function deleteSubtask(subtaskIndex) {
  const te = document.getElementById(`inputSubtask${subtaskIndex}`);
  te.remove();
}

/**
 * this function is used to edit the selected task
 * @param {number} id task id
 */
async function editTask(id) {
  isClickedEdit=true;
  const addTaskSection = document.querySelector(".popup-div");
  let dialog = document.getElementById("dialog");
  dialog.remove();
  addTaskSection.innerHTML = renderTaskByEdit(id);
  await init();
  initTheEdit(id);
  const assigned = tasks[id]["assigned"];
  renderAssignedByEdit(assigned);
  renderSubtaskbyEdit(id);
  setDate();
}

/**
 * this function is used to initialise the edit task
 * @param {number} id index of the task
 */
function initTheEdit(id) {
  const title = document.getElementById("task-title");
  title.value = tasks[id]["title"];
  const description = document.getElementById("task-description");
  description.value = tasks[id]["description"];
  const date = document.getElementById("task-date");
  date.value = tasks[id]["date"];
  const priority = tasks[id]["priority"];
  getPriority(priority);
  const category = document.getElementById("catSel");
  category.value = tasks[id]["category"];
}

/**
 * this function is used to apply the modification after editting
 * @param {number} id task id
 */
async function applyModifications(id) {
  isClickedEdit=false;
  applySimpleModifications(id);
  applyModificationsSubtasks(id);
  await setItem("tasks", JSON.stringify(tasks));
  await loadtasks();
  await loadAmount();
  await loadid();
  await loadcheckecdSubtasks();
  await closePopup2();
  setTimeout(() => {
    renderHTML();
  }, 500);
}

/**
 * this function is used to apply the subtasks modification after editting
 * @param {number} id task id
 */
function applyModificationsSubtasks(id) {
  let toDeleteSubtasks = [];
  let lengthSubtasks = tasks[id]["subtasks"].length;
  for (let i = 0; i < lengthSubtasks; i++) {
    const te = document.getElementById(`inputSubtask${i}`);
    if (te) {
      tasks[id]["subtasks"][i] = te.value;
    } else{
      toDeleteSubtasks.push(i);
    }
  }
  for (let i = toDeleteSubtasks.length - 1; i >= 0; i--) {
    tasks[id]["subtasks"].splice(toDeleteSubtasks[i], 1);
  }
}

/**
 * this function is used to apply the modification after editting
 * @param {number} id task id
 */
function applySimpleModifications(id){
  const title = document.getElementById("task-title");
  tasks[id]["title"] = title.value;
  const description = document.getElementById("task-description");
  tasks[id]["description"] = description.value;
  const date = document.getElementById("task-date");
  tasks[id]["date"] = date.value;
  const category = document.getElementById("catSel");
  tasks[id]["category"] = category.value;
  tasks[id]["priority"] = priority;
  tasks[id]["assigned"] = checkecdContacts;
}

/**
 * this function is used to generate the HTML for the second popup
 * @returns
 */
function templateClosePopup() {
  return /*html*/ `
  <div id="dialog" class="displayNone" onclick="closeSidebar()">
  <div
  id="sidebarRight"
  class="contentsidebarRight"
  onclick="doNotClose(event)"
  >
  <div class="add-task-section">
    <div w3-include-html="includes/add-task-template.html"></div>
    <div class="buttons" id="btnsAddTask">
      <button type="button" class="btn btn-outline-secondary" onclick="clearTask()" aria-pressed="false"
          autocomplete="off">Clear <img src="/grafiken/VectorX.png"></button>
      <button type="button" class="btn btn-primary" onclick="createTask2()"> Create Task <img
              src="/grafiken/check.png" class="primary"></button>
  </div>
</div>
</div>`;
}

/**
 * this function is used to close the second popup
 */
async function closePopup2() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  const popupDiv = document.querySelector(".popup-div");
  popupDiv.classList.remove("show");
  setTimeout(() => {
    popupDiv.remove();
  }, 300);
  board = document.getElementById("board");
  board.innerHTML += templateClosePopup();
  await init();
  isClickedEdit=false;
}

/**
 * this function is used to find tasks
 */
function findTask() {
  findTaskInput = document.getElementById("findTaskInput");
  const search = findTaskInput.value.toUpperCase();
  for (let i = 0; i < tasks.length; i++) {
    const id = tasks[i]["id"];
    const taskElement = document.getElementById(`showTask-${id}`);
    if (tasks[i]["title"].toUpperCase().includes(search)) {
      taskElement.style.display = "flex";
    } else {
      taskElement.style.display = "none";
    }
  }
}

/**
 * this function is used to highlight the task while dragging
 * @param {number} id task id
 */
function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

/**
 * this task is used to stop the highlight after dragging
 * @param {number} id task id
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}
