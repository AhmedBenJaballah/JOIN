
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
loadtasks();
loadAmount();
loadid();

setTimeout(() => {
  getInitials();
}, 1000);

async function loadAmount() {
  try {
    amount = JSON.parse(await getItem("amount"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}
async function loadtasks() {
  try {
    tasks = JSON.parse(await getItem("tasks"));
    contacts = JSON.parse(await getItem("contacts"));

    renderHTML();
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

function renderHTML() {
  let toDo = tasks.filter((t) => t["taskCategory"] == "toDo");
  const task = document.getElementById("toDo");
  task.classList.remove("createdTask");
  task.classList.add("newCreatedTask");
  task.innerHTML = "";
  amountToDo = toDo.length;
  for (let i = 0; i < toDo.length; i++) {
    console.log(toDo[i]["id"]);
    renderAllTasks("todo", i, toDo, task);
  }

  let inProgress = tasks.filter((t) => t["taskCategory"] == "inProgress");
  const task2 = document.getElementById("inProgress");
  task2.classList.remove("createdTask");
  task2.classList.add("newCreatedTask");
  task2.innerHTML = "";
  amountInProgress = inProgress.length;
  for (let i = 0; i < inProgress.length; i++) {
    console.log(inProgress[i]["id"]);
    renderAllTasks("inProgress", i, inProgress, task2);
  }

  let awaitFeedback = tasks.filter((t) => t["taskCategory"] == "awaitFeedback");
  const task3 = document.getElementById("awaitFeedback");
  task3.classList.remove("createdTask");
  task3.classList.add("newCreatedTask");
  task3.innerHTML = "";
  amountAawaitFeedback = awaitFeedback.length;
  for (let i = 0; i < awaitFeedback.length; i++) {
    console.log(awaitFeedback[i]["id"]);
    renderAllTasks("awaitFeedback", i, awaitFeedback, task3);
  }

  let done = tasks.filter((t) => t["taskCategory"] == "done");
  const task4 = document.getElementById("done");
  task4.classList.remove("createdTask");
  task4.classList.add("newCreatedTask");
  task4.innerHTML = "";
  amountDone = done.length;
  for (let i = 0; i < done.length; i++) {
    console.log(done[i]["id"]);
    renderAllTasks("dones", i, done, task4);
  }
}

function renderAllTasks(idInitials, i, tasks, task) {
  const title = tasks[i]["title"];
  const description = tasks[i]["description"];
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
    description,
    subtasks,
    id
  );
  assignedInitials = document.getElementById(`${idInitials}${i}`);
  for (let j = 0; j < assigned.length; j++) {
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
}

function startDragging(id) {
  currentDraggedElement = id - 1;

  console.log(currentDraggedElement);
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(category) {
  console.log(currentDraggedElement);
  tasks[currentDraggedElement]["taskCategory"] = category;
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
  await setItem("amount", JSON.stringify(amount));
}

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
      path = "grafiken/Capa2-prio.png";
      break;
  }
}

function renderTask(idInitials, i, category, title, description, subtasks, id) {
  return /*html*/ `
  <div class="newTask" draggable="true" ondragstart="startDragging(${id})" onclick="showTask(${id})" id="showTask(${id})">
   <div class="${
     category === "Technical Task" ? "blueStyle" : "orangeStyle"
   }">${category}</div>
   <div class="taskTitle">${title}</div>
   <div class="descTask">${description}</div>
   <div class="subtaskProgress">
       <div class="progress">
       <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
       </div>
       <div>0/${subtasks}Subtasks</div>
   </div>
   <div class="namePriority">
       <div id="${idInitials}${i}" class="names"></div>
       <img src=${path}>
   </div>
   </div>
   `;
}

function addSidebar(aTaskCategory) {
  const dialog = document.getElementById("dialog");
  selectedTaskCategory = aTaskCategory;
  dialog.classList.remove("displayNone");
  dialog.classList.add("addSidebar");
  dialog.style.justifyContent = "flex-end";

  let sidebar = document.getElementById("sidebarRight");
  sidebar.classList.remove("displayNone");

  setTimeout(() => {
    sidebar.style.transition = "width 0.1s ease";
    sidebar.style.width = "450px";
  }, 50);
}

function closeSidebar() {
  let sidebar = document.getElementById("sidebarRight");
  sidebar.style.width = "0px";
  setTimeout(() => {
    dialog.classList.add("displayNone");
  }, 50);
}

function doNotClose(event) {
  event.stopPropagation();
}

async function createTask2(selectedTaskCategory) {
  const taskTitle = document.getElementById("task-title").value;
  const taskDescription = document.getElementById("task-description").value;
  const taskDate = document.getElementById("task-date").value;
  const category = document.querySelector(".category-select").value;

  
  idCounter++;
  tasks.push({
    title: taskTitle,
    description: taskDescription,
    date: taskDate,
    priority: priority,
    assigned: checkecdContacts,
    category: category,
    subtasks: subtasks,
    taskCategory: selectedTaskCategory,
    id: idCounter,
  });
  await setItem("tasks", JSON.stringify(tasks));
  await setItem("idCounter", JSON.stringify(idCounter));
  tasks = JSON.parse(await getItem("tasks"));
  contacts = JSON.parse(await getItem("contacts"));
  const task = document.getElementById(selectedTaskCategory);
  task.classList.remove("createdTask");
  task.classList.add("newCreatedTask");
  //task.innerHTML = "";
  let i = tasks.length - 1;

  renderAllTasks(selectedTaskCategory, i, tasks, task);

  const popup = document.getElementById("popup");
  popup.classList.add("show");

  setTimeout(function () {
    popup.classList.remove("show");
    closeSidebar();
  }, 1000);
}

function showTask(id) {
  console.log(id)
  index=tasks.findIndex(c => c.id == id);
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";
  const task = tasks[index];
  const title = task["title"];
  const category = task["category"];
 const taskId=task["id"];
  const description = task["description"];
  const priority = task["priority"];
  const date = task["date"];
  const assigned = task["assigned"];
  const subtasks = task["subtasks"];
  selectPath(priority);
  
  const popupDiv = document.createElement("div");
  popupDiv.className = "popup-div";
  popupDiv.innerHTML = /*html*/ `
    <div class="task-container">
      <div class="${
        category === "Technical Task" ? "blueStyle" : "orangeStyle"
      }">${category} 
      </div> 
      <button class="close-button" onclick="closePopup()"><img src="/grafiken/close.png"></button> 
    </div>
    
    <div class="taskTitle">${title} </div>
    <div class="descTask">${description}</div>
    <div> Due date:${date}</div>
    <div> Priority: ${priority}<img src=${path}></div>

    <div> Assigned to : <div> 
    <div id="popup${taskId}"></div> 
    
    <div>
        <div id="subtasks${taskId}">Subtasks:</div>
    </div>

    <div class="popup-buttons"> 
        <button class="delete-button" onclick="deleteTask(${index})"><img src="/grafiken/delete-popup.png"> Delete</button> 
        <button class="edit-button" onclick="editTask(${index})">Edit</button>
    </div>
  `;

    setTimeout(() => {
      assignedInitials = document.getElementById(`popup${taskId}`);
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
                  <div>${contacts[assigned[j]].name}</div>
                  </div>`;
      }

    }, 200);


    console.log(subtasks)
      document.body.appendChild(popupDiv);
      setTimeout(() => {
        popupDiv.classList.add("show");
      }, 50);

}

overlay.addEventListener("click", closePopup);

function closePopup() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  const popupDiv = document.querySelector(".popup-div");
  popupDiv.classList.remove("show");
  setTimeout(() => {
    popupDiv.remove();
  }, 300);
}

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

