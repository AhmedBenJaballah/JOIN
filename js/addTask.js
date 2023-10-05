let tasks = [];

function createTask() {
    const taskTitle = document.getElementById("task-title").value;
    const taskDescription = document.getElementById("task-description").value;
    const taskDate = document.getElementById("task-date").value;

    // Überprüfen, ob ein Radio-Button ausgewählt ist
    const selectedRadioButton = document.querySelector('input[name="options-outlined"]:checked');
    let taskPriority = "";
    if (selectedRadioButton) {
      taskPriority = selectedRadioButton.nextElementSibling.textContent;
    }

    const assignedTo = document.querySelector(".assigned-select").value;
    const category = document.querySelector(".category-select").value;
    const subtasks = document.getElementById("subtasks").value;

    // Erstelle eine HTML-Ausgabe mit den erfassten Daten
    const outputHTML = `<div class="createdTask">
      <h2>Task Details</h2>
      <p><strong>Title:</strong> ${taskTitle}</p>
      <p><strong>Description:</strong> ${taskDescription}</p>
      <p><strong>Due Date:</strong> ${taskDate}</p>
      <p><strong>Priority:</strong> ${taskPriority}</p>
      <p><strong>Assigned To:</strong> ${assignedTo}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Subtasks:</strong> ${subtasks}</p>
      </div>
    `;

  
    document.getElementById("output").innerHTML = outputHTML;
  }

  
function clearTask() {
    
    document.getElementById("task-title").value = "";
  
   
    document.getElementById("task-description").value = "";
  
    document.getElementById("task-date").value = "";
  
    
    const radioButtons = document.querySelectorAll('input[name="options-outlined"]');
    radioButtons.forEach((radioButton) => {
      radioButton.checked = false;
    });
  
    n
    const assignedSelect = document.querySelector(".assigned-select");
    assignedSelect.selectedIndex = 0;
  
  
    const categorySelect = document.querySelector(".category-select");
    categorySelect.selectedIndex = 0;
  
    document.getElementById("subtasks").value = "";
  }
  
  
  const clearButton = document.querySelector('.btn-outline-secondary');
  clearButton.addEventListener('click', clearTask);
  
