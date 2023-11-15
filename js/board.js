let currentDraggedElement;
let path = "";
let selectedTaskCategory = "";
let amountToDo = 0;
let amountInProgress = 0;
let amountAawaitFeedback = 0;
let amountDone = 0;
let totalTasks = 0;
let amount = [
  {
    totalTasks: totalTasks,
    amountToDo: amountToDo,
    amountInProgress: amountInProgress,
    amountAawaitFeedback: amountAawaitFeedback,
    amountDone: amountDone,
  },
];
let checkecdSubtasks = [];
let isClickedEdit=false;
let idForEditSubtask;
loadcheckecdSubtasks();
loadtasks();
loadAmount();
loadid();
setTimeout(() => {
  setSidebarStyles()
}, 2000);
window.addEventListener("resize", setSidebarStyles);
setTimeout(() => {
  getInitials();
}, 1000);

/**
 * this function is used to style the Sidebar based on the screen resolution
 */
function setSidebarStyles() {
  if (window.location.href.includes("board")) {
    setTimeout(() => {
      let boardSidebar = document.getElementById("boardSidebar");
      const windowWidth = window.innerWidth;
      if (boardSidebar) {
        if (windowWidth < 1040) {
          boardSidebar.style.backgroundColor = "transparent";
          boardSidebar.style.color = "#337aec";
        } else {
          boardSidebar.style.backgroundColor = "#D2E3FF";
          boardSidebar.style.borderRadius = "8px";
          boardSidebar.style.color = "#42526E";
        }
      }
    }, 200);
  }
  let taskSection = document.querySelector('.add-task-section');
  if(taskSection){
    taskSection.style.justifyContent = 'flex-start';
  }
}

/**
 * this function is used to load the checked subtasks
 */
async function loadcheckecdSubtasks() {
  try {
    checkecdSubtasks = JSON.parse(await getItem("checkecdSubtasks"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * this function is used to load the number of tasks for summary
 */
async function loadAmount() {
  try {
    amount = JSON.parse(await getItem("amount"));
    console.log(amount);
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * this function is used to load the tasks
 */
async function loadtasks() {
  try {
    tasks = JSON.parse(await getItem("tasks"));
    contacts = JSON.parse(await getItem("contacts"));

    renderHTML();
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * this function is used to load the id
 */
async function loadid() {
  try {
    idCounter = JSON.parse(await getItem("idCounter"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * this function is used to render all the tasks in a specific category
 * @param {JSON} category filtered tasks tha share the same category
 * @param {string} categorySting the category name
 */
function rendTaskCategory(category, categorySting) {
  const task = document.getElementById(categorySting);
  task.classList.remove("createdTask3");
  task.classList.add("newCreatedTask");
  task.innerHTML = "";

  if (category.length == 0) {
    task.innerHTML = /*html */ `<div class="createdTask2"> No Tasks </div>`;
  }
  for (let i = 0; i < category.length; i++) {
    //console.log(category[i]["id"]);
    renderAllTasks(categorySting, i, category, task);
  }
}

/**
 * this function is used to render the container for the tasks
 */
function renderHTML() {
  let toDo = tasks.filter((t) => t["taskCategory"] === "toDo");
  rendTaskCategory(toDo, "toDo");
  let inProgress = tasks.filter((t) => t["taskCategory"] === "inProgress");
  rendTaskCategory(inProgress, "inProgress");
  let awaitFeedback = tasks.filter((t) => t["taskCategory"] === "awaitFeedback");
  rendTaskCategory(awaitFeedback, "awaitFeedback");
  let done = tasks.filter((t) => t["taskCategory"] === "done");
  rendTaskCategory(done, "done");
  amountAawaitFeedback = awaitFeedback.length;
  amountInProgress = inProgress.length;
  amountToDo = toDo.length;
  amountDone = done.length;
}

/**
 * this function is used to style the description in the rendered task
 * @param {JSON} tasks the tasks
 * @param {number} i the task index
 * @returns
 */
function styleDescription(tasks, i) {
  let description = tasks[i]["description"].replace(/\n/g, "<br>");
  const descriptionLines = description.split("<br>");
  if (descriptionLines.length > 2) {
    description = descriptionLines.slice(0, 2).join("<br>") + "...";
  }
  return description;
}

/**
 * this function is used to set the initials for every contact tha is involved on the current task
 * @param {string} idInitials the initials of all contacts in that task
 * @param {number} i the task index
 * @param {Array} assigned array tha contains the assigned contacts
 */
function personInials(idInitials, i, assigned) {
  let assignedInitials = document.getElementById(`${idInitials}${i}`);
  for (let j = 0; j < Math.min(assigned.length, 3); j++) {
    const optionInitials = contacts[assigned[j]].name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
    assignedInitials.innerHTML += /*html*/ `
              <div class="roundNameDropdownTask" style="background-color:${
                contacts[assigned[j]].color
              }">
                ${optionInitials}
              </div>`;
  }
  if (assigned.length > 3) {
    assignedInitials.innerHTML += /*html*/ `
              <div style="color:#ccc; margin-left:4px" class='pointsPerson'>
                . . .
              </div>`;
  }
}

/**
 * this function is used to render all tasks
 * @param {string} idInitials the initials of all contacts in that task
 * @param {number} i the task index
 * @param {JSON} tasks  all tasks
 * @param {JSON} task the taks of the same category
 */
function renderAllTasks(idInitials, i, tasks, task) {
  const title = tasks[i]["title"];
  const date = tasks[i]["date"];
  const priority = tasks[i]["priority"];
  const assigned = tasks[i]["assigned"];
  const category = tasks[i]["category"];
  const subtask = tasks[i]["subtasks"];
  const subtasks = subtask.length;
  const id = tasks[i]["id"];
  selectPath(priority);
  task.innerHTML += renderTask(
    idInitials,
    i,
    category,
    title,
    styleDescription(tasks, i),
    subtasks,
    id
  );
  personInials(idInitials, i, assigned);
}

/**
 * this function is used to drag a task
 * @param {number} id the task id
 */
function startDragging(id) {
  currentDraggedElement = id;
}

/**
 * this task is used to drop the task
 * @param {*} ev
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 *  this task is used to change the category name
 * @param {string} category the moved to task category
 */
async function moveTo(category) {
  removeHighlight(category);
  const index = tasks.findIndex((c) => c.id == currentDraggedElement);
  tasks[index]["taskCategory"] = category;
  renderHTML();
  await setItem("tasks", JSON.stringify(tasks));
  totalTasks =
    amountToDo + amountInProgress + amountAawaitFeedback + amountDone;
  amount = [
    {
      totalTasks: totalTasks,
      amountToDo: amountToDo,
      amountInProgress: amountInProgress,
      amountAawaitFeedback: amountAawaitFeedback,
      amountDone: amountDone,
    },
  ];
  console.log(amount);
  await setItem("amount", JSON.stringify(amount));
}

/**
 * this task is used to set the priority image of the task
 * @param {string} priority the priority case
 */
function selectPath(priority) {
  switch (priority) {
    case "low":
      path = "grafiken/Capa2-low.png";
      break;
    case "medium":
      path = "grafiken/Capa2-medium.png";
      break;
    case "urgent":
      path = "grafiken/Capa2-prio.png";
      break;
    default:
      path = "grafiken/Capa2-low.png";
      break;
  }
}

/**
 * this function is used to render a single task
 * @param {string} idInitials the initials of all contacts in that task
 * @param {number} i the task index
 * @param {string} category the task category
 * @param {string} title  the task title
 * @param {string} description the task description
 * @param {Array} subtasks the task subtasks
 * @param {number} id the task id
 * @returns
 */
function renderTask(idInitials, i, category, title, description, subtasks, id) {
  const matchedSubtasks = checkecdSubtasks.filter(
    (subtask) => subtask.taskId == id
  );
  const matchedSubtasksNumber = matchedSubtasks.length;
  const progressPercentage = (matchedSubtasksNumber / subtasks) * 100;
  return templateRenderTask(
    idInitials,
    i,
    category,
    title,
    description,
    subtasks,
    id,
    progressPercentage,
    matchedSubtasksNumber
  );
}

/**
 * this task is used to generate the HTML templae for renderTask
 * @param {*} idInitials the initials of all contacts in that task
 * @param {number} i the task index
 * @param {string} category the task category
 * @param {string} title  the task title
 * @param {string} description the task description
 * @param {Array} subtasks the task subtasks
 * @param {number} id the task id
 * @param {number} progressPercentage the % of completed subtasks
 * @param {number} matchedSubtasksNumber number of subtasks
 * @returns
 */
function templateRenderTask(
  idInitials,
  i,
  category,
  title,
  description,
  subtasks,
  id,
  progressPercentage,
  matchedSubtasksNumber
) {
  // Überprüfen, ob subtasks gleich 0 ist
  const subtaskProgressHTML = subtasks !== 0 ? `
   <div class="subtaskProgress">
       <div class="progress">
       <div class="progress-bar" role="progressbar" aria-valuenow="${matchedSubtasksNumber}" aria-valuemin="0" aria-valuemax="${subtasks}" id="progressBar${id}" style="width:${progressPercentage}%"></div>
       </div>
       <div id="displaysubs${id}" class="progressSubtasksInfo">${matchedSubtasksNumber}/${subtasks} Subtasks</div>
   </div>` : '';

  return /*html*/ `
  <div class="newTask" draggable="true" ondragstart="startDragging(${id})" onclick="showTask(${id})" id="showTask-${id}">
   <div class="${category === "Technical Task" ? "blueStyle" : "orangeStyle"}">${category}</div>
   <div class="renderedTaskTitle">
    <div class="taskTitle">${title}</div>
    <div class="descTask">${description}</div>
   </div>
   ${subtaskProgressHTML}
   <div class="namePriority">
       <div id="${idInitials}${i}" class="names"></div>
       <img src=${path}>
   </div>
   </div>
   `;
}

/**
 * this function is used to open the add task sidebar
 * @param {string} aTaskCategory the task cateory of the new created task
 */
function addSidebar(aTaskCategory) {
  clearTask();
  const dialog = document.getElementById("dialog");
  selectedTaskCategory = aTaskCategory;
  console.log(selectedTaskCategory);
  dialog.classList.remove("displayNone");
  dialog.classList.add("addSidebar");
  dialog.style.justifyContent = "flex-end";
  let sidebar = document.getElementById("sidebarRight");
  sidebar.classList.remove("displayNone");
  setTimeout(() => {
    sidebar.style.transition = "width 0.1s ease";
    sidebar.style.width = "450px";
  }, 50);
  setDate();
}

/**
 * this function is used to close the sidebar
 */
function closeSidebar() {
  let sidebar = document.getElementById("sidebarRight");
  sidebar.style.width = "0px";
  setTimeout(() => {
    dialog.classList.add("displayNone");
  }, 50);
}

/**
 * this function is used to not close the sidebar
 * @param {*} event
 */
function doNotClose(event) {
  event.stopPropagation();
}

/**
 * this function is used to confirm the creation of the new task
 */
function successfullyCreatedInBoar() {
  const popup = document.getElementById("popup");
  popup.classList.add("show");

  setTimeout(function () {
    popup.classList.remove("show");
    closeSidebar();
  }, 1000);
}
/**
 * this function is used to create a task in board.html
 */
async function createTask2() {
  setDate();
  
  const taskTitle = document.getElementById("task-title");
  const taskDescription = document.getElementById("task-description").value;
  const taskDate = document.getElementById("task-date");
  const category = document.querySelector(".category-select");
  if (requiredNotFilled(taskTitle, taskDate, category)) {
    isFilled(taskTitle.value, taskTitle);
    isFilled(taskDate.value, taskDate);
    isFilled(category.value, category);
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
      taskCategory: selectedTaskCategory,
      id: idCounter,
    });
    await setItem("tasks", JSON.stringify(tasks));
    await setItem("idCounter", JSON.stringify(idCounter));
    tasks = JSON.parse(await getItem("tasks"));
    contacts = JSON.parse(await getItem("contacts"));
    const task = document.getElementById(selectedTaskCategory);
    task.classList.remove("createdTask3");
    task.classList.add("newCreatedTask");
    let i = tasks.length - 1;
    renderAllTasks(selectedTaskCategory, i, tasks, task);
    successfullyCreatedInBoar();
    subtasks = [];
    renderHTML();
  }
}

/**
 * this function is used to create the edit button
 * @param {number} index task index
 */
function creatEdit(index) {
  const editButton = document.createElement("button");
  editButton.className = "edit-button";
  editButton.innerHTML = '<img src="/grafiken/edit.png"> Edit';
  editButton.onclick = function () {
    editTask(index);
  };
}

/**
 * this function is used to create the HTML template for the popup
 * @param {string} category the task category
 * @param {string} title the task title
 * @param {string} description the task description
 * @param {string} date the task date
 * @param {string} priority the task priority case
 * @param {number} taskId the task id
 * @param {number} index the task index
 * @returns
 */
function templatePopupDiv(
  category,
  title,
  description,
  date,
  priority,
  taskId,
  index
) {
  return /*html*/ `
<div class="task-container" id="taskContainer-id">
<div class="${
    category === "Technical Task" ? "blueStyle" : "orangeStyle"
  }">${category} 
</div> 
<button class="close-button" onclick="closePopup()"><img src="/grafiken/close.png"></button> 
</div>

<div class="taskTitle" id="taskTitle">${title} </div>
<div class="descTask" id="taskDesc">${description}</div>
<div class="task-date" id="taskDate"> Due date:<span style="color:black;font-weight:400; margin-left:10px">${date}</span></div>
<div class="task-priority" id="taskPriority"> Priority:  <span style="color:black ;font-weight:400;margin-left:10px">${priority}</span><img src=${path} style='margin-left:10px'></div>
<div class="task-assigned" id="taskAssigned"> Assigned to : <div> 
<div class="noEffect" id="popup${taskId}"></div> 

<div class="popup-subtasks" id="taskSubtasks">Subtasks:</div>
<div class="noEffect" id="subtasks${taskId}">
</div>

<div class="popup-buttons"> 
  <button class="delete-button" onclick="deleteTask(${index})"><img src="/grafiken/delete-popup.png"> Delete</button> 
  <div class="divider"><img  src="/grafiken/Vector 3.png"></div>
  <button class="edit-button"  id="edit_button" onclick="editTask(${index})"><img src="/grafiken/edit.png">Edit</button>
  
</div>
`;
}

/**
 * this function is used to show the initials in popup
 * @param {number} taskId the task id
 * @param {string} assigned the task assigned contacts
 */
function showInitial(taskId, assigned) {
  let assignedInitials = document.getElementById(`popup${taskId}`);
  for (let j = 0; j < assigned.length; j++) {
    const optionInitials = contacts[assigned[j]].name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
    assignedInitials.innerHTML += /*html*/ `
      <div class="alignContact">
                <div class="roundNameDropdownTask" style="background-color:${
                  contacts[assigned[j]].color
                }">
                  ${optionInitials} 
                </div>
                <div style="color:black">${contacts[assigned[j]].name}</div>
                </div>`;
  }
}

/**
 * this function is used to show the subtasks im popup
 * @param {number} taskId the task id
 * @param {Array} subtasks the task subtasks
 */
function showSubtasks(taskId, subtasks) {
  let subs = document.getElementById(`subtasks${taskId}`);
  for (let k = 0; k < subtasks.length; k++) {
    let isCheckedS = checkecdSubtasks.some(
      (subtask) => subtask.k === k && subtask.taskId === taskId
    );
    subs.innerHTML += /*html*/ `
      <div style='color:black'>
       <input type="checkbox" onclick="updateProgress(${
         subtasks.length
       },${taskId},${k})" class="check${taskId}"
       ${isCheckedS ? "checked" : ""} id="checkbox${taskId}${k}">
       ${subtasks[k]} 
      
      </div>
    `;
  }
}

/**
 * this function is used to show the seleted task
 * @param {number} id the task id
 */
async function showTask(id) {
  console.log(id);
  const index = tasks.findIndex((c) => c.id == id);
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";
  const task = tasks[index];
  const title = task["title"];
  const category = task["category"];
  const taskId = task["id"];
  const description = task["description"];
  const priority = task["priority"];
  const date = task["date"];
  const assigned = task["assigned"];
  const subtasks = task["subtasks"];
  selectPath(priority);
  creatEdit(index);
  const popupDiv = document.createElement("div");
  popupDiv.className = "popup-div";
  popupDiv.innerHTML = templatePopupDiv(
    category,
    title,
    description,
    date,
    priority,
    taskId,
    index
  );
  setTimeout(async () => {
    showInitial(taskId, assigned);
    showSubtasks(taskId, subtasks);
  }, 200);
  console.log(subtasks);
  document.body.appendChild(popupDiv);
  setTimeout(() => {
    popupDiv.classList.add("show");
  }, 50);
}

/**
 * this function is used to update the progressbar fter using the checkbox
 * @param {number} taskId task id
 * @param {array} subtasks task subtasks
 */
function updateProgressAfterCheckbox(taskId, subtasks) {
  let progressBar = document.getElementById(`progressBar${taskId}`);
  const taskIdVierElemente = checkecdSubtasks.filter(
    (subtask) => subtask.taskId == taskId
  );
  const anzahlDerElementeMitTaskIdVier = taskIdVierElemente.length;
  const progressPercentage = (anzahlDerElementeMitTaskIdVier / subtasks) * 100;
  progressBar.style.width = `${progressPercentage}%`;
  progressBar.setAttribute("aria-valuenow", anzahlDerElementeMitTaskIdVier);
  progressBar.setAttribute("aria-valuemax", subtasks);
  let displayNumber = document.getElementById(`displaysubs${taskId}`);
  displayNumber.innerHTML = `
  ${anzahlDerElementeMitTaskIdVier}/${subtasks}Subtasks
  `;
  overlay.addEventListener("click", closePopup);
}

/**
 * this function is used  to update the checkbox and progressbar
 * @param {array} subtasks task subtask
 * @param {number} taskId task id
 * @param {number} k subtask index
 */
async function updateProgress(subtasks, taskId, k) {
  let checkbox = document.getElementById(`checkbox${taskId}${k}`);
  if (checkbox.checked) {
    checkecdSubtasks.push({
      taskId: taskId,
      k: k,
    });
    console.log(checkecdSubtasks);
  } else {
    const index = checkecdSubtasks.findIndex(
      (subtask) => subtask.taskId === taskId && subtask.k === k
    );
    if (index > -1) {
      checkecdSubtasks.splice(index, 1);
      console.log(checkecdSubtasks);
    }
  }
  //checkecdSubtasks=[]
  await setItem("checkecdSubtasks", JSON.stringify(checkecdSubtasks));
  updateProgressAfterCheckbox(taskId, subtasks);
}

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
    if (taskContainer) {
      taskContainer.remove();
    }
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
    const optionInitials = contacts[assigned[j]].name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
    assignedInitials.innerHTML += /*html*/ `
                <div class="roundNameDropdownTask2" style="background-color:${
                  contacts[assigned[j]].color
                }">
                  ${optionInitials} 
                </div>
                `;
  }
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
  if (subtask.value==''){
    subtask.style.borderBottom='1px solid red'
  }
  else{
    subtask.push(subtaskCreated);
    console.log(counterForEditSubtask);
    console.log(subtaskCreated);
    subtaskSection.innerHTML += /*html*/ `
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
  }
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
      element.disabled = true;
    }
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
  const assigned = tasks[id]["assigned"];
  console.log(assigned);
  renderAssignedByEdit(assigned);
  renderSubtaskbyEdit(id);
  setDate();
}

/**
 * this function is used to apply the modification after editting
 * @param {number} id task id
 */
async function applyModifications(id) {
  console.log("mod");
  isClickedEdit=false;
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
  let toDeleteSubtasks = [];
  let lengthSubtasks = tasks[id]["subtasks"].length;

  for (let i = 0; i < lengthSubtasks; i++) {
    console.log(lengthSubtasks);
    const te = document.getElementById(`inputSubtask${i}`);
    console.log(te);
    if (te) {
      tasks[id]["subtasks"][i] = te.value;
    } else{
      toDeleteSubtasks.push(i);
    }
  }
  for (let i = toDeleteSubtasks.length - 1; i >= 0; i--) {
    tasks[id]["subtasks"].splice(toDeleteSubtasks[i], 1);
  }
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
      console.log(tasks[i]["title"]);
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
