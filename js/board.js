setTimeout(() => {
    getInitials()
}, 1000);


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