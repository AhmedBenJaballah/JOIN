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
      let summarySidebar = document.getElementById("contactsSidebar");
      const windowWidth = window.innerWidth;

      if (windowWidth < 1040) {
        summarySidebar.style.backgroundColor = "transparent";
        summarySidebar.style.color = "#337aec";
      } else {
        summarySidebar.style.backgroundColor = "#D2E3FF";
        summarySidebar.style.borderRadius = "8px";
        summarySidebar.style.color = "#42526E";
      }
    }, 200);
  }
  setResolution();
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
    if (
      winWidth <= 1040 &&
      displayContact.style.display == "flex" &&
      scroll.style.display == "flex"
    ) {
      scroll.style.display = "none";
      arrow.style.display = "flex";
    } else if (
      winWidth > 1040 &&
      displayContact.style.display == "flex" &&
      scroll.style.display == "none"
    ) {
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
  let sidebar = document.getElementById("sidebarRight");
  sidebar.classList.remove("displayNone");

  updateSidebarWidthRight();
  window.addEventListener("resize", updateSidebarWidthRight);
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
    color: color,
  });
  await setItem("contacts", JSON.stringify(contacts));
  closeSidebar();
  renderContactList(nameC.value, color, emailC.value, phoneC.value);
  scrollAndChangeColor(nameC.value);
  successfullyCreated();
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
  document.addEventListener("click", function (event) {
    var selectedElement = event.target;
    if (selectedElement !== lastDiv) {
      resetBackgrounColor(lastDiv);
    }
  });
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
  } else {
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
    <div class="person" onclick="renderInfo('${name}','${email}','${color}','${phone}')">
        <div class="roundName" style="background-color:${color}">${initials(
    name
  )}</div>
        <div class="info">
            <div class="namePerson">${name}</div>
            <div class="emailPerson">${email}</div>
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
        <div class="person" onclick="renderInfo('${name}','${email}','${color}','${phone}')">
            <div class="roundName" style="background-color:${color}">${initials(
    name
  )}</div>
            <div class="info">
                <div class="namePerson">${name}</div>
                <div class="emailPerson">${email}</div>
            </div>
        </div>
    </div>`;
}

/**
 * this function is used to get the contacts initials
 * @param {string} name name of the contact
 * @returns
 */
function initials(name) {
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
}

/**
 * this function is used the generate a random color for the initials background
 * @returns
 */
function getRandomBrightColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * this function is used to render informations of the clicked contact
 * @param {string} name name of the newest contact
 * @param {string} color backgrund color of the newest contact's initial
 * @param {string} email email of the newest contact
 * @param {string} phone phone of the newest contact
 */
function renderInfo(name, email, color, phone) {
  const display = document.getElementById("displayContact");
  display.style.display = "flex";
  display.innerHTML = renderInfoTemplate(name, email, color, phone);
  const winWidth = window.innerWidth;
  const scroll = document.getElementById("scrollContacts");
  const arrow = document.getElementById("backToCon");
  if (winWidth < 1040) {
    arrow.style.display = "flex";
    scroll.style.display = "none";
  }
}

/**
 * this function is used to create the html part of the information rendering
 * @param {string} name name of the newest contact
 * @param {string} color backgrund color of the newest contact's initial
 * @param {string} email email of the newest contact
 * @param {string} phone phone of the newest contact
 * @returns
 */
function renderInfoTemplate(name, email, color, phone) {
  return /*html*/ `
    <div class="renderContacts">
        <div class="displayRoundName" style="background-color:${color}">${initials(
    name
  )}</div>
        <div class="renderName">
            <div class="renderOnlyName">${name}</div>
            <div class="editAndDelete">
                <div class="alignImg" onclick="modification('${name}','${email}','${color}','${phone}')"><img src="grafiken/edit.png">Edit</div>
                <div class="alignImg" onclick="deleteContact('${name}','${email}','${color}','${phone}')" ><img src="grafiken/delete.png">Delete</div>
            </div>
        </div>
    </div>
    <div class="renderEmailAndPhone">
        <h4 id='contactInformation'>Contact Information</h4>
        <h5>Email</h5>
        <div style="color:#4589ff">${email}</div>
        <h5>Phone</h5>
        <div>${phone}</div>
    </div>
    <div id="backToCon"  style="display:none" onclick='backToCon()'> <img src='grafiken/arrow-left-line.png'> </div>
      `;
}

/**
 * this function is used to go back to the contact list if the resolution is too small
 */
function backToCon() {
  const winWidth = window.innerWidth;
  const scroll = document.getElementById("scrollContacts");
  const displayContact = document.getElementById("displayContact");
  if (winWidth < 1040) {
    scroll.style.display = "flex";
    displayContact.style.display = "none";
  }
}

/**
 * this function is used to open the edit sidebar and edit a contact
 * @param {string} name name of the newest contact
 * @param {string} color backgrund color of the newest contact's initial
 * @param {string} email email of the newest contact
 * @param {string} phone phone of the newest contact
 */
function modification(name, email, color, phone) {
  const dialog = document.getElementById("dialog");
  const sidebarLeft = document.getElementById("sidebarLeft");
  const sidebarRight = document.getElementById("sidebarRight");
  const editForm = document.getElementById("editForm");
  dialog.classList.remove("displayNone");
  dialog.classList.add("addSidebar");
  sidebarRight.classList.add("displayNone");
  sidebarLeft.classList.remove("displayNone");
  dialog.style.justifyContent = "flex-start";
  setTimeout(() => {
    sidebarLeft.style.transition = "width 0.1s ease";
    sidebarLeft.style.width = "45vw";
    updateSidebarWidthLeft();
    window.addEventListener("resize", updateSidebarWidthLeft);
  }, 50);
  editTheSelected(name, email, color, phone, editForm);
}

/**
 * this function is used to edit a contact
 * @param {string} name name of the newest contact
 * @param {string} color backgrund color of the newest contact's initial
 * @param {string} email email of the newest contact
 * @param {string} phone phone of the newest contact
 * @param {div} editForm fields of the contact' s informations
 */
function editTheSelected(name, email, color, phone, editForm) {
  editForm.innerHTML = templatEdit(name, color, email, phone);
  const nameEdit = document.getElementById("nameEdit");
  const emailEdit = document.getElementById("emailEdit");
  const phoneEdit = document.getElementById("phoneEdit");
  nameEdit.value = name;
  emailEdit.value = email;
  phoneEdit.value = phone;
}

/**
 * this function is used to generate the HTML field for the editting
 * @param {string} name name of the newest contact
 * @param {string} color backgrund color of the newest contact's initial
 * @param {string} email email of the newest contact
 * @param {string} phone phone of the newest contact
 * @returns
 */
function templatEdit(name, color, email, phone) {
  return /*html*/ `
    <div class="displayRoundName" style="background-color:${color}">${initials(
    name
  )}</div>
    <form id="formContacts" onsubmit="editPerson('${name}','${email}','${color}','${phone}'); return false;">
        <input type="name" id="nameEdit" placeholder="Name" class="inputContact" required >
        <input type="email" id="emailEdit" placeholder="Email" class="inputContact" required>
        <input type="phone" id="phoneEdit" placeholder="Phone" class="inputContact" required>
        <div class="btns">
            <button type="button"  class="btn btn-outline-primary" onclick="deleteContact('${name}','${email}','${color}','${phone}')">Delete <i class="bi bi-x"></i></button>
            <button  type="submit" id="createBtn" class="btn btn-primary">Save <i class="bi bi-check-lg"></i></button>
        </div>
    </form>
    `;
}

/**
 * this function is used to edit a contact
 * @param {string} name name of the newest contact
 * @param {string} color backgrund color of the newest contact's initial
 * @param {string} email email of the newest contact
 * @param {string} phone phone of the newest contact
 */
async function editPerson(name, email, color, phone) {
  let contact = contacts.find(
    (u) => u.name == name && u.email == email && u.phone == phone
  );
  if (contact) {
    console.log(contact);
    contact.name = nameEdit.value;
    contact.email = emailEdit.value;
    contact.phone = phoneEdit.value;
  }
  await setItem("contacts", JSON.stringify(contacts));
  rendeAfterEdit();
  await loadContacts();
}

/**
 * this function is used to render after the contact has been editted
 */
function rendeAfterEdit() {
  const contactList = document.getElementById("contactList");
  contactList.innerHTML = "";
  const display = document.getElementById("displayContact");
  display.innerHTML = "";
  display.style.display = "none";
  const scroll = document.getElementById("scrollContacts");
  scroll.style.display = "flex";
  closeSidebar2();
}

/**
 * this function is used to delete a contact
 * @param {string} name name of the newest contact
 * @param {string} color backgrund color of the newest contact's initial
 * @param {string} email email of the newest contact
 * @param {string} phone phone of the newest contact
 */
async function deleteContact(name, email, color, phone) {
  const index = contacts.findIndex(
    (c) => c.name == name && c.email == email && c.phone == phone
  );
  contacts.splice(index, 1);
  await setItem("contacts", JSON.stringify(contacts));
  const contactList = document.getElementById("contactList");
  contactList.innerHTML = "";
  const display = document.getElementById("displayContact");
  display.innerHTML = "";
  display.style.display = "none";
  const scroll = document.getElementById("scrollContacts");
  scroll.style.display = "flex";
  closeSidebar2();
  await loadContacts();
}

/**
 * this function is used to animate a div to confirm the adding of a new contact
 */
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
