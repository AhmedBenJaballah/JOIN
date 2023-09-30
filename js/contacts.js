function renderInfo(){
    const display= document.getElementById("displayContact")
    display.innerHTML+=/*html*/`
    <div id="roundName"> AM</div>
    `
}

function addContact(){
    const dialog = document.getElementById("dialog");
    dialog.classList.remove("displayNone");
    dialog.classList.add("addSidebar");
    let sidebar = document.getElementById("sidebarLeft");
    setTimeout(() => {
        sidebar.style.transition = "width 0.1s ease";
        sidebar.style.width = "45vw";
    }, 50);   
}

function closeSidebar(){
    let sidebar=document.getElementById("sidebarLeft")
    sidebar.style.width="0px"
    setTimeout(() => {
    dialog.classList.add("displayNone");
    }, 50);
}

function doNotClose(event){
    event.stopPropagation();
}