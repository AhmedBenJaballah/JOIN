
async function getInitials() {
    userInitial = (await getItem('userInitial'));
    
    const kanban = document.getElementById("kanban");
    console.log(userInitial)
    kanban.innerHTML += `<div onclick="displayOptions()" id="initials">
    ${userInitial}
    </div>`
}

function displayOptions(){
    const options = document.getElementById("options");
    if(options.classList.contains("dNone")){
        options.classList.remove("dNone")
       
        options.innerHTML = `
    <div class="option">Privacy Policy</div>
    <div class="option">Legal Notice</div>
    <div class="option" onclick="goToLogIn()">Log out</div>
    `
    }
    else{options.classList.add("dNone")}
    
}

function goToLogIn(){
    window.location.href = 'logIn.html';
}

