
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
if(!isClickedEdit){
  const subtask = document.getElementById("subtasks");
  const subtaskSection = document.getElementById("subtask-section");
  if (subtask.value==''){subtask.style.borderBottom='1px solid red'}
  else{
    subtasks.push(subtask.value);
  subtaskSection.innerHTML += /*html*/ `<div class='toBeClearedSubtasks'>${subtask.value} </div>`; }
  subtask.value = "";}
}

/**
 * this function is used to style the required fields if not filled
 * @param {string} requiredFieldValue the value of the required field
 * @param {div} requiredField the required field
 */
function isFilled(requiredFieldValue,requiredField){
  if (requiredFieldValue === "" || requiredFieldValue ==="Select task category" || requiredFieldValue === "") {
    requiredField.style.borderBottom ="2px solid red";
    requiredField.style.color = "red"; 
  } else {
    requiredField.style.borderBottom ="1px solid black";
      requiredField.style.color = "black";
  }
}

/**
 * this function is used to check if the required fields are filled
 * @returns
 */
function requiredNotFilled(taskTitle,taskDate,category){
  return(    taskTitle.value === "" ||
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
 * this function is used to check the title
 */
function checkTitle(){
  const taskTitle = document.getElementById("task-title");
  isFilled(taskTitle.value,taskTitle);
}

/**
 * this function is used to check the Date
 */
function checkDate(){
  const taskDate = document.getElementById("task-date");
  isFilled(taskDate.value,taskDate);
}

/**
 * this function is used to check the select
 */
function checkSelect(){
  const category = document.querySelector(".category-select");
  isFilled(category.value,category);
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
 * this function is used to clear the input
 */
function clearInput(){
    const taskTitle = document.getElementById("task-title");
    taskTitle.value = "";
    const taskDescription = document.getElementById("task-description");
    taskDescription.value = "";
    const taskDate = document.getElementById("task-date");
    taskDate.value = "";
}

/**
 * this function is used to clear the radio buttons
 */
function clearRadio(){
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
}

/**
 * this function is used to clear the dropdown and checkbox
 */
function clearDropAndCheck(){
    const dropdown = document.getElementById("dropdown");
    while (dropdown.firstChild) {
      dropdown.removeChild(dropdown.firstChild);
      clearSelection();}
    checkecdContacts=[];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;}); 
}

/**
 * this function is used to clear the category and subtasks
 */
function clearCategoryAndSubtask() {
    const categorySelect = document.querySelector(".category-select");
    categorySelect.selectedIndex = 0;
    const subtasks = document.getElementById("subtasks");
    subtasks.value = "";
    const subtaskSection = document.getElementById("subtask-section");
    const toBeClearedSubtasks = subtaskSection.querySelectorAll('.toBeClearedSubtasks');
    toBeClearedSubtasks.forEach(subtask => subtask.remove());
}

/**
 * this function is used to clear the task
 */
function clearTask() {
    clearInput();
    clearRadio();
    clearDropAndCheck();
    clearCategoryAndSubtask();
}

document.addEventListener("DOMContentLoaded", function () {
  const clearButton = document.querySelector(".btn-outline-secondary");
  if(clearButton){
    clearButton.addEventListener("click", clearTask);
  }
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