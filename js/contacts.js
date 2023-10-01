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

function closeSidebar2(){
    let sidebar=document.getElementById("sidebarLeft")
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

    let element = document.getElementById(`${(nameC.value[0]).toUpperCase()}`);
    element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    let alleDivs = element.getElementsByTagName('div');
    let letztesDiv = alleDivs[alleDivs.length - 1];
    letztesDiv.parentElement.parentElement.style.backgroundColor="#4589ff";
    letztesDiv.style.color="white";
    letztesDiv.parentElement.parentElement.style.color="white";
    letztesDiv.parentElement.parentElement.style.borderRadius="15px"

    document.addEventListener('click', function(event) {
        var geklicktesElement = event.target;
        if (geklicktesElement !== letztesDiv) {
            letztesDiv.parentElement.parentElement.style.backgroundColor = "white";
            letztesDiv.style.color = "#4589ff";
            letztesDiv.parentElement.parentElement.style.color = "black"; 
            letztesDiv.parentElement.parentElement.style.borderRadius = "";
        }
    });
    successfullyCreated();
}

function renderContactList(name,color,email,phone){
    const contactlist=document.getElementById("contactList")
    const letter = document.getElementById(`${(name[0]).toUpperCase()}`)
    if(letter){
        letter.innerHTML+=templatePersonWithLetter(name,color,email,phone)
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
    // document.addEventListener('click', function(event) {

    //     event.target.style.backgroundColor="#4589ff";
    //     event.target.style.color="white";
    //     event.target.style.borderRadius="15px"
    // });
    const display= document.getElementById("displayContact")
    display.innerHTML=/*html*/`
    <div class="renderContacts">
        <div class="displayRoundName" style="background-color:${color}">${initials(name)}</div>
        <div class="renderName">
            <div class="renderOnlyName">${name}</div>
            <div class="editAndDelete">
                <div class="alignImg" onclick="modification('${name}','${email}','${color}','${phone}')"><img src="grafiken/edit.png">Edit</div>
                <div class="alignImg" onclick="deleteContact('${name}','${email}','${color}','${phone}')" ><img src="grafiken/delete.png">Delete</div>
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
    const editForm = document.getElementById("editForm");

    dialog.classList.remove("displayNone");
    dialog.classList.add("addSidebar");
    sidebarRight.classList.add("displayNone");
    sidebarLeft.classList.remove("displayNone");
    dialog.style.justifyContent="flex-start";
    setTimeout(() => {
        sidebarLeft.style.transition = "width 0.1s ease";
        sidebarLeft.style.width = "45vw";
    }, 50);
    editForm.innerHTML= templatEdit(name,color,email,phone);
    const nameEdit = document.getElementById("nameEdit");
    const emailEdit = document.getElementById("emailEdit");
    const phoneEdit = document.getElementById("phoneEdit");
  
    nameEdit.value=name
    emailEdit.value=email
    phoneEdit.value=phone

}

function templatEdit(name,color,email,phone){
    return /*html*/`
    <div class="displayRoundName" style="background-color:${color}">${initials(name)}</div>
    <form id="formContacts" onsubmit="editPerson('${name}','${email}','${color}','${phone}'); return false;">
        <input type="name" id="nameEdit" placeholder="Name" class="inputContact" required >
        <input type="email" id="emailEdit" placeholder="Email" class="inputContact" required>
        <input type="phone" id="phoneEdit" placeholder="Phone" class="inputContact" required>
        <div class="btns">
            <button type="button"  class="btn btn-outline-primary" onclick="deleteContact('${name}','${email}','${color}','${phone}')">Delete <i class="bi bi-x"></i></button>
            <button  type="submit" id="createBtn" class="btn btn-primary">Save <i class="bi bi-check-lg"></i></button>
        </div>
    </form>
    `
}

async function editPerson(name,email,color,phone){
    let contact = contacts.find(u =>u.name==name &&  u.email==email && u.phone== phone)
    if(contact){
       console.log(contact)
       contact.name=nameEdit.value;
       contact.email=emailEdit.value;
       contact.phone=phoneEdit.value;
    }
    await setItem('contacts', JSON.stringify(contacts));
    const contactList=document.getElementById("contactList");
    contactList.innerHTML = "";
    const display= document.getElementById("displayContact")
    display.innerHTML="";
    await loadContacts();
}

async function deleteContact(name,email,color,phone){
    const index = contacts.findIndex(c => c.name == name &&  c.email==email && c.phone== phone);
    contacts.splice(index, 1);
    await setItem('contacts', JSON.stringify(contacts));
    const contactList=document.getElementById("contactList");
    contactList.innerHTML = "";
    const display= document.getElementById("displayContact")
    display.innerHTML="";
    await loadContacts();
}

function successfullyCreated() {
    const success = document.getElementById("contactCreated");
    success.style.display = "flex";
    success.style.transition = "top 0.5s ease, transform 0.5s ease";
    setTimeout(() => {
        success.style.top = "50%"; 
    }, 50);
    setTimeout(() => {
        success.style.top = "100%"; 
    }, 1500);
    setTimeout(() => {
        success.style.display = "none";
    }, 1800); 
}