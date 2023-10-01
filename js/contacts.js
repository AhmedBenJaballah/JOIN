let contacts=[];
loadContacts();

async function loadContacts(){
    try {
        contacts = JSON.parse(await getItem('contacts'));
        for (let i = 0; i < contacts.length; i++) {
            const name=contacts[i]["name"];
            const color=contacts[i]["color"];
            const email=contacts[i]["email"];
            const phone=contacts[i]["phone"];
            renderContactList(name,color,email,phone);
        }
    } catch(e){
        console.error('Loading error:', e);
    }
}

function addContact(){
    const dialog = document.getElementById("dialog");
    const sidebarLeft = document.getElementById("sidebarLeft");
    dialog.classList.remove("displayNone");
    dialog.classList.add("addSidebar");
    dialog.style.justifyContent="flex-end";
    sidebarLeft.classList.add("displayNone");
    let sidebar = document.getElementById("sidebarRight");
    sidebar.classList.remove("displayNone");
    
    setTimeout(() => {
        sidebar.style.transition = "width 0.1s ease";
        sidebar.style.width = "45vw";
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

async function createPerson(){
    let color=getRandomBrightColor();
    contacts.push({
        name: nameC.value,
        email: emailC.value,
        phone: phoneC.value,
        color:color
    });
    await setItem('contacts', JSON.stringify(contacts));
    closeSidebar();
    renderContactList(nameC.value,color,emailC.value,phoneC.value);
  
}

function renderContactList(name,color,email,phone){
    const contactlist=document.getElementById("contactList")
    const letter = document.getElementById(`${(name[0]).toUpperCase()}`)
    if(letter){
        letter.innerHTML+=templatePersonWithLetter(name,color,email,phone)
        //letter.scrollIntoView({ behavior: 'smooth', block: 'end' });
        //letter.style.backgroundColor="#4589ff"
        // let divs = Array.from(letter.querySelectorAll('.namePerson'));
        // divs.sort(function(a, b) {
        //     var idA = a.textContent;
        //     var idB = b.textContent;
        //     return idA.localeCompare(idB);
        // });
    
        // divs.forEach(function(div) {
        //     letter.appendChild(div);
        // });
    }
    else{
    contactlist.innerHTML+=templatePersonWithOutLetter(name,color,email,phone);
    }
    sortAlpha(contactlist);
}


function sortAlpha(contactlist){
    let divs = Array.from(document.querySelectorAll('.letter'));
    
    divs.sort(function(a, b) {
        var idA = a.textContent;
        var idB = b.textContent;
        return idA.localeCompare(idB);
    });

    divs.forEach(function(div) {
        contactlist.appendChild(div);
    });
}

function templatePersonWithLetter(name,color,email,phone){
return     /*html*/`                   
    <div class="person" onclick="renderInfo('${name}','${email}','${color}','${phone}')">
        <div class="roundName" style="background-color:${color}">${initials(name)}</div>
        <div class="info">
            <div class="namePerson">${name}</div>
            <div class="emailPerson">${email}</div>
        </div>
    </div>
`
}

function templatePersonWithOutLetter(name,color,email,phone){
return /*html*/`                   
    <div class="letter" id="${(name[0]).toUpperCase()}">
        <div class="firstLetter">${(name[0]).toUpperCase()}</div>
        <div class="person" onclick="renderInfo('${name}','${email}','${color}','${phone}')">
            <div class="roundName" style="background-color:${color}">${initials(name)}</div>
            <div class="info">
                <div class="namePerson">${name}</div>
                <div class="emailPerson">${email}</div>
            </div>
        </div>
    </div>`
}

function initials(name){
    return name.split(' ').map(word => word[0].toUpperCase()).join('')
}

function getRandomBrightColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function renderInfo(name,email,color,phone){
    const display= document.getElementById("displayContact")
    display.innerHTML=/*html*/`
    <div class="renderContacts">
        <div class="displayRoundName" style="background-color:${color}">${initials(name)}</div>
        <div class="renderName">
            <div class="renderOnlyName">${name}</div>
            <div class="editAndDelete">
                <div class="alignImg" onclick="modification('${name}','${email}','${color}','${phone}')"><img src="grafiken/edit.png">Edit</div>
                <div class="alignImg"><img src="grafiken/delete.png">Delete</div>
            </div>
        </div>
    </div>
    <div class="renderEmailAndPhone">
        <h4>Contact Information</h4>
        <h5>Email</h5>
        <div style="color:#4589ff">${email}</div>
        <h5>Phone</h5>
        <div>${phone}</div>
    </div>
      `
}
function modification(name,email,color,phone){
    const dialog = document.getElementById("dialog");
    const sidebarLeft = document.getElementById("sidebarLeft");
    const sidebarRight = document.getElementById("sidebarRight");
    dialog.classList.remove("displayNone");
    dialog.classList.add("addSidebar");
    sidebarRight.classList.add("displayNone");
    sidebarLeft.classList.remove("displayNone");
    dialog.style.justifyContent="flex-start";
    const nameEdit = document.getElementById("nameEdit");
    const emailEdit = document.getElementById("emailEdit");
    const phoneEdit = document.getElementById("phoneEdit");
  
    nameEdit.value=name
    emailEdit.value=email
    phoneEdit.value=phone

    
}   

function editPerson(){
    nameC.value="f"

}