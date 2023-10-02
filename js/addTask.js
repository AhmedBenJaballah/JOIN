// Funktion, um eine Aufgabe zu erstellen und anzeigen
function createTask() {
    // Aufgabe aus Formularfeldern erfassen
    var title = document.getElementById("task-title").value;
    var description = document.getElementById("task-description").value;
    var dueDate = document.getElementById("task-date").value;
    var priority = document.querySelector('input[name="options-outlined"]:checked').nextElementSibling.textContent;
    var assignedTo = document.querySelector('.assigned-select').value;
    var category = document.querySelector('.category-select').value;

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
}
