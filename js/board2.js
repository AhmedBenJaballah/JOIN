
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
function templateRenderTask(idInitials,i,category,title,description,subtasks,id,progressPercentage,matchedSubtasksNumber) {
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
      await handleTaskCreation(taskTitle, taskDescription, taskDate, category);
    }
  }
  
  /**
   *  this function is used to create a Task if everything is checked
   * @param {div} taskTitle 
   * @param {div} taskDescription 
   * @param {div} taskDate 
   * @param {div} category 
   */
  async function handleTaskCreation(taskTitle, taskDescription, taskDate, category) {
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
      id: idCounter});
    await setItem("tasks", JSON.stringify(tasks));
    await setItem("idCounter", JSON.stringify(idCounter));
    tasks = JSON.parse(await getItem("tasks"));
    contacts = JSON.parse(await getItem("contacts"));
    styleTaskAfterRendering()
    let i = tasks.length - 1;
    renderAllTasks(selectedTaskCategory, i, tasks, task);
    successfullyCreatedInBoar();
    subtasks = [];
    renderHTML();
  }

  /**
   * this function is used to style the task
   */
  function styleTaskAfterRendering() {
    const task = document.getElementById(selectedTaskCategory);
    task.classList.remove("createdTask3");
    task.classList.add("newCreatedTask");
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
  function templatePopupDiv(category,title,description,date,priority,taskId,index) {
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
  </div>`;
  }
  
  /**
   * this function is used to show the initials in popup
   * @param {number} taskId the task id
   * @param {string} assigned the task assigned contacts
   */
  function showInitial(taskId, assigned) {
    let assignedInitials = document.getElementById(`popup${taskId}`);
    for (let j = 0; j < assigned.length; j++) {
      const optionInitials = contacts[assigned[j]].name.split(" ")
        .map((word) => word[0].toUpperCase()).join("");
      assignedInitials.innerHTML += /*html*/ `
        <div class="alignContact">
                  <div class="roundNameDropdownTask" style="background-color:${contacts[assigned[j]].color}">
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
        </div>`;
    }
  }
  
  /**
   * this function is used to show the seleted task
   * @param {number} id the task id
   */
  async function showTask(id) {
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
    showPopupToo(category,title,description,date,priority,taskId,index,assigned,subtasks);
  }

  /**
   * this function is used to show the popup
   * @param {string} category 
   * @param {string} title 
   * @param {string} description 
   * @param {string} date 
   * @param {string} priority 
   * @param {string} taskId 
   * @param {number} index 
   * @param {array} assigned 
   * @param {array} subtasks 
   */
  function showPopupToo(category,title,description,date,priority,taskId,index,assigned,subtasks) {
    const popupDiv = document.createElement("div");
    popupDiv.className = "popup-div";
    popupDiv.innerHTML = templatePopupDiv(category,title,description,date,priority,taskId,index);
    setTimeout(async () => {
      showInitial(taskId, assigned);
      showSubtasks(taskId, subtasks);
    }, 200);
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
  const taskIdVierElemente = checkecdSubtasks.filter((subtask) => subtask.taskId == taskId);
  const anzahlDerElementeMitTaskIdVier = taskIdVierElemente.length;
  const progressPercentage = (anzahlDerElementeMitTaskIdVier / subtasks) * 100;
  progressBar.style.width = `${progressPercentage}%`;
  progressBar.setAttribute("aria-valuenow", anzahlDerElementeMitTaskIdVier);
  progressBar.setAttribute("aria-valuemax", subtasks);
  let displayNumber = document.getElementById(`displaysubs${taskId}`);
  displayNumber.innerHTML = `
  ${anzahlDerElementeMitTaskIdVier}/${subtasks}Subtasks`;
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
  if (checkbox.checked) { checkecdSubtasks.push({
      taskId: taskId,
      k: k });
  } else {
    const index = checkecdSubtasks.findIndex((subtask) => subtask.taskId === taskId && subtask.k === k);
    if (index > -1) {
      checkecdSubtasks.splice(index, 1);
    }
  }
  //checkecdSubtasks=[]
  await setItem("checkecdSubtasks", JSON.stringify(checkecdSubtasks));
  updateProgressAfterCheckbox(taskId, subtasks);
}
  