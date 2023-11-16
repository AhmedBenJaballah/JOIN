let contacts = [];
loadContacts();
setSidebarStyles();
window.addEventListener("resize", setSidebarStyles);
setTimeout(() => {
  getInitials();
}, 1000);

/**
 * this function is used to style the Sidebar based on the screen resolution
 */
function setSidebarStyles() {
  if (window.location.href.includes("contacts")) {
    setTimeout(() => {
      let contactSidebar = document.getElementById("contactsSidebar");
      const display = document.getElementById("displayContact");
      const windowWidth = window.innerWidth;
      if (contactSidebar){      
        if (windowWidth < 1040) {
          styleSidebarUnderC(contactSidebar);
      } else {
        styleSidebarOverC(contactSidebar,display);
      }}}, 200);
  }
  setResolution();
}

function styleSidebarUnderC(contactSidebar){
  contactSidebar.style.backgroundColor = "transparent";
  contactSidebar.style.color = "#337aec";
}

function styleSidebarOverC(contactSidebar,display) {
  contactSidebar.style.backgroundColor = "#D2E3FF";
  contactSidebar.style.borderRadius = "8px";
  contactSidebar.style.color = "#42526E";
  display.style.alignItems='center';
}

/**
 * this function is used to set the resolution while going throught 350px to 2000px
 */
function setResolution() {
  const winWidth = window.innerWidth;
  const scroll = document.getElementById("scrollContacts");
  const displayContact = document.getElementById("displayContact");
  const arrow = document.getElementById("backToCon");
  if (scroll && displayContact && arrow) {
    if (winWidth <= 1040 &&displayContact.style.display == "flex" &&scroll.style.display == "flex") {
      scroll.style.display = "none";
      arrow.style.display = "flex";
    } else if (winWidth > 1040 &&displayContact.style.display == "flex" &&scroll.style.display == "none") {
      scroll.style.display = "flex";
      arrow.style.display = "none";
    }
  }
}

/**
 * this function is used to load the contacts from the backend
 */
async function loadContacts() {
  try {
    contacts = JSON.parse(await getItem("contacts"));
    for (let i = 0; i < contacts.length; i++) {
      const name = contacts[i]["name"];
      const color = contacts[i]["color"];
      const email = contacts[i]["email"];
      const phone = contacts[i]["phone"];
      renderContactList(name, color, email, phone);
    }
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * this function is used to show the right Sidebar
 */
function addContact() {
  const dialog = document.getElementById("dialog");
  const sidebarLeft = document.getElementById("sidebarLeft");
  dialog.classList.remove("displayNone");
  dialog.classList.add("addSidebar");
  dialog.style.justifyContent = "flex-end";
  sidebarLeft.classList.add("displayNone");
  const sidebar = document.getElementById("sidebarRight");
  sidebar.classList.remove("displayNone");
  setTimeout(() => {
    sidebar.style.transition = "width 0.1s ease";
    sidebar.style.width = "45vw";
    updateSidebarWidthRight();
    window.addEventListener("resize", updateSidebarWidthRight);
  }, 50);
}

/**
 * this function is used to ajust the resulotion of the Sidebar
 * @param {div} sidebar could be the right or left sidebar
 */
function updateSidebarWidth(sidebar) {
  const winWidth = window.innerWidth;
  if (winWidth > 950) {
    sidebar.style.transition = "width 0.1s ease";
    sidebar.style.width = "45vw";
  } else {
    sidebar.style.transition = "width 0.1s ease";
    sidebar.style.width = "350px";
  }
}

/**
 * this function is used to ajust the resulotion of the Sidebar
 */
function updateSidebarWidthRight() {
  const sidebar = document.getElementById("sidebarRight");
  updateSidebarWidth(sidebar);
}

/**
 * this function is used to ajust the resulotion of the Sidebar
 */
function updateSidebarWidthLeft() {
  const sidebar = document.getElementById("sidebarLeft");
  updateSidebarWidth(sidebar);
}

/**
 * this function is used to close any sidebar
 * @param {div} sidebar could be the right or left sidebar
 */
function closeAnySidebar(sidebar) {
  let dialog = document.getElementById("dialog");
  sidebar.style.width = "0px";
  setTimeout(() => {
    dialog.classList.add("displayNone");
  }, 50);
}

/**
 * this function is used to close the add contact sidebar
 */
function closeSidebar() {
  let sidebar = document.getElementById("sidebarRight");
  closeAnySidebar(sidebar);
}

/**
 * this function is used to close the edit contact sidebar
 */
function closeSidebar2() {
  let sidebar = document.getElementById("sidebarLeft");
  closeAnySidebar(sidebar);
}

/**
 * this function is used to not close any sidebar while using it
 */
function doNotClose(event) {
  event.stopPropagation();
}

/**
 * this function is used to add a new contact the the rendered contat list
 */
async function createPerson() {
  let color = getRandomBrightColor();
  contacts.push({
    name: nameC.value,
    email: emailC.value,
    phone: phoneC.value,
    color: color});
  await setItem("contacts", JSON.stringify(contacts));
  closeSidebar();
  renderContactList(nameC.value, color, emailC.value, phoneC.value);
  resetColor()
  scrollAndChangeColor(nameC.value);
  successfullyCreated();
  nameC.value='';
  emailC.value='';
  phoneC.value='';
}

/**
 * this function is used to color the background of the newest created person and to scroll to that contact
 * @param {string} name name of the contact
 */
function scrollAndChangeColor(name) {
  let element = document.getElementById(`${name[0].toUpperCase()}`);
  element.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
  let allDivs = element.getElementsByTagName("div");
  let lastDiv = allDivs[allDivs.length - 1];
  setBackgrounColor(lastDiv);
}

/**
 * this function is used to color the background
 * @param {div} lastDiv the div of the newest contact
 */
function setBackgrounColor(lastDiv) {
  lastDiv.parentElement.parentElement.style.backgroundColor = "#4589ff";
  lastDiv.style.color = "white";
  lastDiv.parentElement.parentElement.style.color = "white";
  lastDiv.parentElement.parentElement.style.borderRadius = "15px";
}

/**
 * this function is used to color the background like the other contacts
 * @param {div} lastDiv the div of the newest contact
 */
function resetBackgrounColor(lastDiv) {
  lastDiv.parentElement.parentElement.style.backgroundColor = "white";
  lastDiv.style.color = "#4589ff";
  lastDiv.parentElement.parentElement.style.color = "black";
  lastDiv.parentElement.parentElement.style.borderRadius = "";
}

/**
 * this function is used to render every contact
 * @param {string} name name of the newest contact
 * @param {string} color backgrund color of the newest contact's initial
 * @param {string} email email of the newest contact
 * @param {string} phone phone of the newest contact
 */
function renderContactList(name, color, email, phone) {
  const contactlist = document.getElementById("contactList");
  const letter = document.getElementById(`${name[0].toUpperCase()}`);
  if (letter) {
    letter.innerHTML += templatePersonWithLetter(name, color, email, phone);
  } else if(contactlist){
    contactlist.innerHTML += templatePersonWithOutLetter(
      name,
      color,
      email,
      phone
    );
  }
  sortAlpha(contactlist);
}

/**
 * this function is used to sort the contact list alphabeticlly
 * @param {div} contactlist
 */
function sortAlpha(contactlist) {
  let divs = Array.from(document.querySelectorAll(".letter"));
  divs.sort(function (a, b) {
    var idA = a.textContent;
    var idB = b.textContent;
    return idA.localeCompare(idB);
  });
  divs.forEach(function (div) {
    contactlist.appendChild(div);
  });
}

/**
 * this function is used to render the nesest created contact
 * @param {string} name name of the newest contact
 * @param {string} color backgrund color of the newest contact's initial
 * @param {string} email email of the newest contact
 * @param {string} phone phone of the newest contact
 * @returns
 */
function templatePersonWithLetter(name, color, email, phone) {
  return /*html*/ `                   
    <div class="person" id="${name}${email}${color}${phone}" onclick="renderInfo('${name}','${email}','${color}','${phone}')">
        <div class="roundName" style="background-color:${color}">${initials(
    name
  )}</div>
        <div class="info">
            <div class="namePerson">${name}</div>
            <div  id="${name}${email}${color}${phone}Email" class="emailPerson">${email}</div>
        </div>
    </div>
`;
}

/**
 * this function is used to render the nesest created contact
 * @param {string} name name of the newest contact
 * @param {string} color backgrund color of the newest contact's initial
 * @param {string} email email of the newest contact
 * @param {string} phone phone of the newest contact
 * @returns
 */
function templatePersonWithOutLetter(name, color, email, phone) {
  return /*html*/ `                   
    <div class="letter" id="${name[0].toUpperCase()}">
        <div class="firstLetter">${name[0].toUpperCase()}</div>
        <div class="person" id="${name}${email}${color}${phone}" onclick="renderInfo('${name}','${email}','${color}','${phone}')">
            <div class="roundName" style="background-color:${color}">${initials(
    name
  )}</div>
            <div class="info">
                <div class="namePerson">${name}</div>
                <div id="${name}${email}${color}${phone}Email" class="emailPerson">${email}</div>
            </div>
        </div>
    </div>`;
}
