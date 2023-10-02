
function getInitials() {
    const kanban = document.getElementById("kanban");

    kanban.innerHTML += `<div onclick="goToLogIn()" id="initials">

    </div>`
}

function goToLogIn(){
    window.location.href = 'logIn.html';
}