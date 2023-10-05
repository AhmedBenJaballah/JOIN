// Funktion, um eine Aufgabe zu erstellen und anzeigen
/*function createTask() {
    // Aufgabe aus Formularfeldern erfassen
    let title = document.getElementById("task-title").value;
    let description = document.getElementById("task-description").value;
    let dueDate = document.getElementById("task-date").value;
    let priority = document.querySelector('input[name="options-outlined"]:checked').nextElementSibling.textContent;
    let assignedTo = document.querySelector('.assigned-select').value;
    let category = document.querySelector('.category-select').value;

    // Hier sollten Sie eine Funktion aufrufen, um die Aufgabe auf dem Server oder in einer Datenbank zu speichern.
    // Dies kann eine AJAX-Anfrage oder eine serverseitige Funktion sein.

    // Dann können Sie die Aufgabe zur Sidebar hinzufügen
    addTaskToSidebar(title, description, dueDate, priority, assignedTo, category);

    // Formular zurücksetzen
    document.getElementById("task-form").reset();
}

// Funktion, um eine Aufgabe zur Sidebar hinzuzufügen
function addTaskToSidebar(title, description, dueDate, priority, assignedTo, category) {
    var taskList = document.getElementById("task-list");
    var listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${title}</strong><br>${description}<br>Due Date: ${dueDate}<br>Priority: ${priority}<br>Assigned To: ${assignedTo}<br>Category: ${category}`;
    taskList.appendChild(listItem);
}*/

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

    // Zeige die Ausgabe in das div "output"
    document.getElementById("output").innerHTML = outputHTML;
  }

