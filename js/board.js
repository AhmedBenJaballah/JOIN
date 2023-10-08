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
    idCounter=tasks.length
    renderHTML();
  } catch (e) {
    console.error("Loading error:", e);
  }
}

function renderHTML(){
    let toDo = tasks.filter(t => t['taskCategory'] == 'toDo');
    const task = document.getElementById("newTask");
    task.classList.remove("createdTask");
    task.classList.add("newCreatedTask");
    task.innerHTML = "";
    for (let i = 0; i < toDo.length; i++) {
      console.log(toDo[i]['id'])
    renderAllTasks('todo',i,toDo,task);
    }

    let inProgress = tasks.filter(t => t['taskCategory'] == 'inProgress');
    const task2 = document.getElementById('inProgress');
    task2.classList.remove("createdTask");
    task2.classList.add("newCreatedTask");
    task2.innerHTML = "";
    for (let i = 0; i < inProgress.length; i++) {
      console.log(inProgress[i]['id'])
    renderAllTasks('inProgress',i,inProgress,task2);
    }
}

function renderAllTasks(idInitials,i,tasks,task){
  
    const title = tasks[i]["title"];
    const description = tasks[i]["description"];
    const date = tasks[i]["date"];
    const priority = tasks[i]["priority"];
    const assigned = tasks[i]["assigned"];
    const category = tasks[i]["category"];
    const subtask = tasks[i]["subtasks"];
    const subtasks=subtask.length
    const id= tasks[i]["id"]
    selectPath(priority)
    task.innerHTML +=renderTask(idInitials,i,category,title,description,subtasks,id); 
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

function startDragging(id){
  currentDraggedElement=id-1

  console.log(currentDraggedElement)
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(category){

console.log(currentDraggedElement)
  tasks[currentDraggedElement]['taskCategory']=category;
  renderHTML();
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

function renderTask(idInitials,i,category,title,description,subtasks,id){
  return /*html*/ `
  <div class="newTask" draggable="true" ondragstart="startDragging(${id})" onclick="showTask(${i})" id="showTask">
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
       <div id="${idInitials}${i}" class="names"></div>
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

async function createTask2(){

    const taskTitle = document.getElementById("task-title").value;
    const taskDescription = document.getElementById("task-description").value;
    const taskDate = document.getElementById("task-date").value;
    const category = document.querySelector(".category-select").value;
    idCounter++
    tasks.push({
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
      priority: priority,
      assigned: checkecdContacts,
      category: category,
      subtasks: subtasks,
      taskCategory: 'inProgress',
      id:idCounter
    });
    await setItem("tasks", JSON.stringify(tasks));
    
    tasks = JSON.parse(await getItem("tasks"));
    contacts = JSON.parse(await getItem("contacts"));
    const task = document.getElementById("inProgress");
    task.classList.remove("createdTask");
    task.classList.add("newCreatedTask");
    //task.innerHTML = "";
    let i=tasks.length-1
      
  
      renderAllTasks('inProgress',i,tasks,task);
    
    
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
  
  
  