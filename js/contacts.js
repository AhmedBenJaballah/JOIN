let contacts=[];
loadContacts();

async function loadContacts(){
    try {
        contacts = JSON.parse(await getItem('contacts'));
        for (let i = 0; i < contacts.length; i++) {
            const name=contacts[i]["name"];
            const color=contacts[i]["color"];
            const email=contacts[i]["email"];
            renderContactList(name,color,email);
        }
    } catch(e){
        console.error('Loading error:', e);
    }
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
    renderContactList(nameC.value,color,emailC.value);
  
}

function renderContactList(name,color,email){
    const contactlist=document.getElementById("contactList")
    const letter = document.getElementById(`${(name[0]).toUpperCase()}`)
    if(letter){
        letter.innerHTML+=templatePersonWithLetter(name,color,email)
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
    contactlist.innerHTML+=templatePersonWithOutLetter(name,color,email);
    }
    sortAlpha(contactlist,letter);
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

function templatePersonWithLetter(name,color,email){
return     /*html*/`                   
    <div class="person" onclick="renderInfo(event)">
        <div class="roundName" style="background-color:${color}">${initials(name)}</div>
        <div class="info">
            <div class="namePerson">${name}</div>
            <div class="emailPerson">${email}</div>
        </div>
    </div>
`
}

function templatePersonWithOutLetter(name,color,email){
return /*html*/`                   
    <div class="letter" id="${(name[0]).toUpperCase()}">
        <div class="firstLetter">${(name[0]).toUpperCase()}</div>
        <div class="person" onclick="renderInfo(event)">
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

function renderInfo(event){
    const display= document.getElementById("displayContact")
    const clickedElement = event.currentTarget;


    const name = clickedElement.querySelector('.namePerson').textContent;
    const email = clickedElement.querySelector('.emailPerson').textContent;
   const color = clickedElement.style

    console.log('Name:', name);
    console.log('E-Mail:', email);
   console.log('E-Mail:', color);
    display.innerHTML+=/*html*/`
    <div class="roundName">${initials(name)}</div>
    `
}