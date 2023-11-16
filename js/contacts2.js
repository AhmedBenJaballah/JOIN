
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
    resetColor()
    const display = document.getElementById("displayContact");
    const selected = document.getElementById(`${name}${email}${color}${phone}`);
    console.log(selected)
    const selectedMail = document.getElementById(`${name}${email}${color}${phone}Email`);
    selected.style.backgroundColor = "#4589ff";
    selected.style.color = "white";
    selectedMail.style.color = "white";
    selected.style.borderRadius = "15px";
    selected.classList.remove('person');
    selected.classList.add('personAlt');
    const winWidth = window.innerWidth;
    if (winWidth > 1040)
    { display.style.display = "none";
    display.style.alignItems='flex-end'
    
   setTimeout(() => {
    display.style.display = "flex";
   }, 200);
  
   setTimeout(() => {
    display.style.alignItems='center'
   }, 250);
  
   setTimeout(() => {
    display.style.alignItems='flex-start'
   }, 300);}
   else{
    display.style.display = "flex";
    display.style.alignItems='center';
   }
    display.innerHTML = renderInfoTemplate(name, email, color, phone);
    const scroll = document.getElementById("scrollContacts");
    const arrow = document.getElementById("backToCon");
    if (winWidth < 1040) {
      arrow.style.display = "flex";
      scroll.style.display = "none";
    }
  }
  
  /**
   * this function is used to reset the color
   */
  function resetColor() {
    const allElementsAlt = document.querySelectorAll('.personAlt');
    allElementsAlt.forEach(element => {
      element.classList.remove('personAlt');
      element.classList.add('person');
    });
  
    const allElements = document.querySelectorAll('.person'); 
    allElements.forEach(element => {
      element.style.backgroundColor = 'white'; 
      element.style.color = "black"; 
    });
  
    const allElementsEmail = document.querySelectorAll('.emailPerson'); 
    allElementsEmail.forEach(element => {
      element.style.color = "#4589ff"; 
    });
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
      <div id='rC' class="renderContacts">
          <div class="displayRoundName" style="background-color:${color}">${initials(
      name
    )}</div>
          <div class="renderName">
              <div class="renderOnlyName" id='${name}${email}${color}${phone}EditTask1'>${name}</div>
              <div class="editAndDelete">
                  <div class="alignImg" onclick="modification('${name}','${email}','${color}','${phone}')"><img src="grafiken/edit.png">Edit</div>
                  <div class="alignImg" onclick="deleteContact('${name}','${email}','${color}','${phone}')" ><img src="grafiken/delete.png">Delete</div>
              </div>
          </div>
      </div>
      <div id='rEP' class="renderEmailAndPhone">
          <h4 id='contactInformation'>Contact Information</h4>
          <h5>Email</h5>
          <div style="color:#4589ff" id='${name}${email}${color}${phone}EditTask2'>${email}</div>
          <h5>Phone</h5>
          <div id='${name}${email}${color}${phone}EditTask3'>${phone}</div>
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
          <input type="tel" id="phoneEdit" placeholder="Phone" class="inputContact" required pattern="[0-9]+">
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
  
    const display = document.getElementById("displayContact");
    display.innerHTML = renderInfoTemplate(nameEdit.value,emailEdit.value, color, phoneEdit.value);
  
  }
  
  /**
   * this function is used to render after the contact has been editted
   */
  function rendeAfterEdit() {
    const contactList = document.getElementById("contactList");
    contactList.innerHTML = "";
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
  