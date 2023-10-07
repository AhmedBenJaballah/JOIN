loadtasks();

setTimeout(() => {
    getInitials()
}, 1000);


async function loadtasks(){
    try {
        tasks= JSON.parse(await getItem('tasks'));
        for (let i = 0; i < tasks.length; i++) {
            const title=tasks[i]["title"];
            const description=tasks[i]["description"];
            const date=tasks[i]["date"];
            const priority=tasks[i]["priority"];
            const assigned=tasks[i]["assigned"];
            const category=tasks[i]["category"];
            const subtask=tasks[i]["subtasks"];

            console.log(title,date,description,priority,assigned,category,subtask);
            const task=document.getElementById("newTask");
            task.classList.remove("createdTask");
            task.classList.add("newCreatedTask");
            task.innerHTML=/*html*/`
            <div class="newTask">
            <div>${category}</div>
            </div>
            `
        }
    } catch(e){
        console.error('Loading error:', e);
    }
}

function addSidebar(){
    
    const dialog = document.getElementById("dialog");
    
    dialog.classList.remove("displayNone");
    dialog.classList.add("addSidebar");
    dialog.style.justifyContent="flex-end";

    let sidebar = document.getElementById("sidebarRight");
    sidebar.classList.remove("displayNone");
    
    setTimeout(() => {
        sidebar.style.transition = "width 0.1s ease";
        sidebar.style.width = "450px";

    }, 50);   
}

function closeSidebar(){
    let sidebar=document.getElementById("sidebarRight")
    sidebar.style.width="0px"
    setTimeout(() => {
    dialog.classList.add("displayNone");
    }, 50);
}

function doNotClose(event){
    event.stopPropagation();
}