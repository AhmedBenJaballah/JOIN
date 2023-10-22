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
let checkecdSubtasks=[];


loadcheckecdSubtasks();
loadtasks();
loadAmount();
loadid();

//loadcheckecdSubtasks();


setTimeout(() => {
  getInitials();
}, 1000);



async function loadcheckecdSubtasks() {
  try {
    checkecdSubtasks = JSON.parse(await getItem("checkecdSubtasks"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

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
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(category) {
  console.log(currentDraggedElement);
  console.log(category);
  console.log(tasks[currentDraggedElement]["taskCategory"]);
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
    //default:
      //path = "grafiken/Capa2-prio.png";
      //break;
  }
}

function renderTask(idInitials, i, category, title, description, subtasks, id) {
  const taskIdVierElemente = checkecdSubtasks.filter(subtask => subtask.taskId == id);
  const  anzahlDerElementeMitTaskIdVier= taskIdVierElemente.length;
  const progressPercentage = (anzahlDerElementeMitTaskIdVier / subtasks) * 100;

 
  return /*html*/ `
  <div class="newTask" draggable="true" ondragstart="startDragging(${id})" onclick="showTask(${id})" id="showTask-${id}">
   <div class="${
     category === "Technical Task" ? "blueStyle" : "orangeStyle"
   }">${category}</div>
   <div class="taskTitle">${title}</div>
   <div class="descTask"anzahlDerElementeMitTaskIdVier>${description}</div>
   <div class="subtaskProgress">
       <div class="progress">
       <div class="progress-bar" role="progressbar" aria-valuenow="${anzahlDerElementeMitTaskIdVier}" aria-valuemin="0" aria-valuemax="${subtasks}" id="progressBar${id}" style="width:${progressPercentage}%"></div>
       </div>
       <div id="displaysubs${id}">${anzahlDerElementeMitTaskIdVier}/${subtasks}Subtasks</div>
   </div>
   <div class="namePriority">
       <div id="${idInitials}${i}" class="names"></div>
       <img src=${path}>
   </div>
   </div>
   `;

   ///// here change path for default  if else////////
}

function addSidebar(aTaskCategory) {
  const dialog = document.getElementById("dialog");
  selectedTaskCategory = aTaskCategory;
  console.log(selectedTaskCategory)
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

async function createTask2() {
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
  subtasks=[];
}

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

  const editButton = document.createElement("button");
  editButton.className = "edit-button";
  editButton.innerHTML = '<img src="/grafiken/edit.png"> Edit';
  editButton.onclick = function () {
    editTask(index); // Rufen Sie die editTask-Funktion auf, wenn der "Edit" -Button geklickt wird.
  };

  const popupDiv = document.createElement("div");
  popupDiv.className = "popup-div";
  popupDiv.innerHTML = /*html*/ `
    <div class="task-container" id="taskContainer-id">
      <div class="${
        category === "Technical Task" ? "blueStyle" : "orangeStyle"
      }">${category} 
      </div> 
      <button class="close-button" onclick="closePopup()"><img src="/grafiken/close.png"></button> 
    </div>
    
    <div class="taskTitle" id="taskTitle">${title} </div>
    <div class="descTask" id="taskDesc">${description}</div>
    <div class="task-date" id="taskDate"> Due date:${date}</div>
    <div class="task-priority" id="taskPriority"> Priority:  ${priority}<img src=${path}></div>
    <div class="task-assigned" id="taskAssigned"> Assigned to : <div> 
    <div id="popup${taskId}"></div> 
    
    <div class="popup-subtasks" id="taskSubtasks">Subtasks:</div>
    <div id="subtasks${taskId}"></div>
    

    <div class="popup-buttons"> 
        <button class="delete-button" onclick="deleteTask(${index})"><img src="/grafiken/delete-popup.png"> Delete</button> 
        <button class="edit-button"  id="edit_button" onclick="editTask(${index})">Edit</button>
        
    </div>
  `;

  setTimeout(async () => {
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
    subs = document.getElementById(`subtasks${taskId}`);


   

    for (let k = 0; k < subtasks.length; k++) {
      let isCheckedS = checkecdSubtasks.some(subtask => subtask.k === k && subtask.taskId === taskId);
      subs.innerHTML += /*html*/ `
        <div>
         <input type="checkbox" onclick="updateProgress(${
           subtasks.length
         },${taskId},${k})" class="check${taskId}"
         ${isCheckedS ? "checked" : ""} id="checkbox${taskId}${k}">
         ${subtasks[k]} 
        
        </div>
      `;
    }
  }, 200);

  console.log(subtasks);
  document.body.appendChild(popupDiv);
  setTimeout(() => {
    popupDiv.classList.add("show");
  }, 50);
}

async function updateProgress(subtasks, taskId, k) {
  let checkbox = document.getElementById(`checkbox${taskId}${k}`);

  if (checkbox.checked) {
    checkecdSubtasks.push({
      taskId: taskId,
      k: k
    });
    console.log(checkecdSubtasks);
} else {
    const index = checkecdSubtasks.findIndex(subtask => subtask.taskId === taskId && subtask.k === k);
    if (index > -1) {
      checkecdSubtasks.splice(index, 1);
      console.log(checkecdSubtasks);
    }
}
//checkecdSubtasks=[]
await setItem("checkecdSubtasks", JSON.stringify(checkecdSubtasks));



  //const checkboxes = document.querySelectorAll(`.check${taskId}`);
  let progressBar = document.getElementById(`progressBar${taskId}`);


  const taskIdVierElemente = checkecdSubtasks.filter(subtask => subtask.taskId == taskId);
  const anzahlDerElementeMitTaskIdVier = taskIdVierElemente.length;

 
  console.log(taskId);
  console.log(subtasks);
  console.log(anzahlDerElementeMitTaskIdVier / subtasks);
  console.log(progressBar);

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

async function editTask(id) {
  // Das AddTask-Template aufrufen und mit den ursprünglichen Werten füllen
  const addTaskSection = document.querySelector(".popup-div");
  let dialog=document.getElementById('dialog')
  dialog.remove();
  addTaskSection.innerHTML = `
  <div onclick="closePopup2()"> CLOSE </div>
  <div onclick="applyModifications(${id})"> mod </div>
    <div w3-include-html="includes/add-task-template.html"></div>

  `;
  
  await init();
  const title= document.getElementById('task-title');  
  title.value=tasks[id]["title"]

  const description= document.getElementById('task-description');  
  description.value=tasks[id]["description"];

  const date=document.getElementById('task-date');
  date.value=tasks[id]["date"];

  const priority = tasks[id]["priority"];
  getPriority(priority);

  const category =document.getElementById('catSel')
  category.value=tasks[id]["category"]

  const assigned = tasks[id]["assigned"];
  console.log(assigned);
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
  checkecdContacts=[];
  for (let i = 0; i < assigned.length; i++) {
    checkecdContacts.push(assigned[i]); 
  }

  assignedInitials.style.flexDirection='row'
  
  subtasks=[];
  const subtaskSection = document.getElementById("subtask-section");
  const subtask = tasks[id]["subtasks"];
  for (let i = 0; i < subtask.length; i++) {
    subtaskSection.innerHTML += /*html*/ `
    <div>${subtask[i]} </div>
    `;
  }

 
}

async function applyModifications(id){
  console.log('mod')
  const title= document.getElementById('task-title');  
 tasks[id]["title"]=title.value

  const description= document.getElementById('task-description');  
  tasks[id]["description"]=description.value

  const date=document.getElementById('task-date');
  tasks[id]["date"]=date.value;

  const category =document.getElementById('catSel');
  tasks[id]["category"]=category.value;
  tasks[id]["priority"]=priority;
  tasks[id]["assigned"]=checkecdContacts;
  
  //tasks[id]['subtasks']=subtasks,
  for(let i = 0; i < subtasks.length; i++) {
    tasks[id]['subtasks'].push(subtasks[i])
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

async function closePopup2(){
 
  const overlay = document.getElementById("overlay");
  overlay.style.display = "none";
  const popupDiv = document.querySelector(".popup-div");
  popupDiv.classList.remove("show");
  setTimeout(() => {
    popupDiv.remove();
  }, 300);

  board=document.getElementById('board');
  board.innerHTML+=`
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
</div>`

await init();
}

function findTask(){
  findTaskInput=document.getElementById('findTaskInput');
  const search = findTaskInput.value.toUpperCase();

  for (let i = 0; i < tasks.length; i++) {  
    const id= tasks[i]["id"];
    const taskElement = document.getElementById(`showTask-${id}`);  
    if(tasks[i]['title'].toUpperCase().includes(search)){
      console.log(tasks[i]['title']) 
      taskElement.style.display = 'block';
    }
    else{
      taskElement.style.display = 'none';
    }
  }

}
