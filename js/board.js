loadtasks();

let currentDraggedElement
let path="";


setTimeout(() => {
  getInitials();
}, 1000);

async function loadtasks() {
  try {
    tasks = JSON.parse(await getItem("tasks"));
    contacts = JSON.parse(await getItem("contacts"));
    const task = document.getElementById("newTask");
    task.classList.remove("createdTask");
    task.classList.add("newCreatedTask");
    task.innerHTML = "";
    renderAllTasks(tasks,task);
  } catch (e) {
    console.error("Loading error:", e);
  }
}

function renderAllTasks(tasks,task){
  for (let i = 0; i < tasks.length; i++) {
    const title = tasks[i]["title"];
    const description = tasks[i]["description"];
    const date = tasks[i]["date"];
    const priority = tasks[i]["priority"];
    const assigned = tasks[i]["assigned"];
    const category = tasks[i]["category"];
    const subtask = tasks[i]["subtasks"];
    const subtasks=subtask.length
    selectPath(priority)
    task.innerHTML +=renderTask(i,category,title,description); 
    assignedInitials = document.getElementById(`optionInitials${i}`);
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
}

function startDragging(i){
  currentDraggedElement=i

  console.log(currentDraggedElement)
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(category){
  try {
    tasks = JSON.parse(await getItem("tasks"));
    contacts = JSON.parse(await getItem("contacts"));
    const task = document.getElementById("inProgress");
    task.classList.remove("createdTask");
    task.classList.add("newCreatedTask");
    task.innerHTML = "";
    renderAllTasks(tasks,task);
  } catch (e) {
    console.error("Loading error:", e);
  }
}

function selectPath(priority){

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

function renderTask(i,category,title,description,){
  return /*html*/ `
  <!-- jetzt kommen versuche --> <div class="newTask" draggable="true" ondragstart="startDragging(${i})" onclick="showTask(${i})" id="showTask">
   <div class="${
     category === "Technical Task" ? "blueStyle" : "orangeStyle"
   }">${category}</div>
   <div class="taskTitle">${title}</div>
   <div class="descTask">${description}</div>
   <div>
       <div class="progress">
       <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
       </div>
       <div>0/${subtasks}Subtasks</div>
   </div>
   <div class="namePriority">
       <div id="optionInitials${i}" class="names"></div>
       <img src=${path}>
   </div>
   </div>
   `;
}

function addSidebar() {
  const dialog = document.getElementById("dialog");

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

function showTask(index) {
    const task = tasks[index];
    const category = task["category"];
    const title = task["title"];
    const description = task["description"];
    const priority = task["priority"];
  
    const popupDiv = document.createElement("div");
    popupDiv.className = "popup-div";
    popupDiv.innerHTML = /*html*/ `
      <div class="${
        category === "Technical Task" ? "blueStyle" : "orangeStyle"
      }">${category} </div>  <button class="close-button" onclick="closePopup()"><img src="/grafiken/close.png"></button>
      <div class="descTask">${description}</div>
      <div class="taskTitle">${title} </div>
      <div class="descTask">${description}</div>
      <div>
          <div>Progress</div>
          <div>Subtasks</div>
      </div>
      <div class="namePriority">
          <div class="names">${priority}</div>
      </div>
     
    `;
  
    document.body.appendChild(popupDiv);
    setTimeout(() => {
      popupDiv.classList.add("show");
    }, 50);
  }
  
  function closePopup() {
    const popupDiv = document.querySelector(".popup-div");
    popupDiv.classList.remove("show");
    setTimeout(() => {
      popupDiv.remove();
    }, 300);
  }
  
  
  