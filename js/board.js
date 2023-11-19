let currentDraggedElement;
let path = "";
let selectedTaskCategory = "";
let amountToDo = 0;
let amountInProgress = 0;
let amountAawaitFeedback = 0;
let amountDone = 0;
let totalTasks = 0;
let amount = [{
    totalTasks: totalTasks,
    amountToDo: amountToDo,
    amountInProgress: amountInProgress,
    amountAawaitFeedback: amountAawaitFeedback,
    amountDone: amountDone}];
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
          setStyleBoardSidebarUnder(boardSidebar);
        } else {
          setStyleBoardSidebarOver(boardSidebar);
        }
      }
    }, 200);
  }
  checkTaskSection();
}

/**
 * this function is used to set the style of the sidebare if more than 1040px 
 * @param {div} boardSidebar sidebar ate board.html
 */
function setStyleBoardSidebarUnder(boardSidebar){
  boardSidebar.style.backgroundColor = "transparent";
  boardSidebar.style.color = "#337aec";
}

/**
 * this function is used to set the style of the sidebare if less than 1040px
 * @param {div} boardSidebar sidebar ate board.html
 */
function setStyleBoardSidebarOver(boardSidebar){
  boardSidebar.style.backgroundColor = "#D2E3FF";
  boardSidebar.style.borderRadius = "8px";
  boardSidebar.style.color = "#42526E";
}

/**
 * this function is used to check the task section
 */
function checkTaskSection() {
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
if(task){
  task.classList.remove("createdTask3");
  task.classList.add("newCreatedTask");
  task.innerHTML = "";
  if (category.length == 0) {
    task.innerHTML = /*html */ `<div class="createdTask2"> No Tasks </div>`;
  }
  for (let i = 0; i < category.length; i++) {
    renderAllTasks(categorySting, i, category, task);
  }}
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
    const optionInitials = contacts[assigned[j]].name.split(" ")
      .map((word) => word[0].toUpperCase()).join("");
    assignedInitials.innerHTML += /*html*/ `
              <div class="roundNameDropdownTask" style="background-color:${
                contacts[assigned[j]].color}">${optionInitials}</div>`;}
  if (assigned.length > 3) {
    assignedInitials.innerHTML += /*html*/ `
      <div style="color:#ccc; margin-left:4px" class='pointsPerson'>  . . .</div>`;
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
    id);
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
  amount = [{
      totalTasks: totalTasks,
      amountToDo: amountToDo,
      amountInProgress: amountInProgress,
      amountAawaitFeedback: amountAawaitFeedback,
      amountDone: amountDone,}];
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