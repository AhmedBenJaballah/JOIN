let userInitial="" ;

/**
 * this function is used for activating the animation
 */
function startJoin() {
  const logIn = document.getElementById("logIn");
  logIn.innerHTML = /*html*/ `<img src="./grafiken/Capa 2 (1).png" id="joinStartImage">`;
  setTimeout(() => {
    putImageAside();
    createLogInContainer();
    signUpBtns();
    footer();
  }, 200);
}

/**
 * this function is used to positionate the "Join" image in the top left corner
 */
function putImageAside() {
  const joinStartImage = document.getElementById("joinStartImage");
  const logIn = document.getElementById("logIn");
  styleJoin(joinStartImage);
  setTimeout(() => {
    joinStartImage.src = "./grafiken/Capa 2.png";
  }, 800);
  logIn.style.transition = "background-color 1s ease";
  logIn.style.backgroundColor = "white";
}

/**
 * this function is used to style the join logo
 * @param {div} joinStartImage the Join logo
 */
function styleJoin(joinStartImage) {
joinStartImage.style.transition ="position 1s ease, top 1s ease, left 1s ease, width 1s ease, transform 1s ease";
joinStartImage.style.position = "absolute";
joinStartImage.style.top = "40px";
joinStartImage.style.left = "40px";
joinStartImage.style.width = "80px";
joinStartImage.style.transform = "none";
}

/**
 * this function is used to create the log in box
 */
function createLogInContainer() {
  const logIn = document.getElementById("logIn");
  setTimeout(() => {
    logIn.innerHTML += templateLogIn();
  }, 800);
}

/**
 * this function is used to create the log in HTML template
 */
function templateLogIn(){
return    /*html*/ `
<div id="logInContainer">
<div id="logInTitle">Log in</div>
<form id="formLogIn" onsubmit="logIn(); return false;">
    <input type="email" id="logInEmail" placeholder="Email" class="inputLogIn" required>
    <input type="password" id="logInPassword" placeholder="Password" class="inputLogIn" required>
    <div id="rememberMeContainer">
        <input type="checkbox" id="rememberMe">
        <label for="rememberMe">Remember me</label>
    </div>
    <div id="logInBtns">
        <button type="submit" class="btn btn-primary">Log In</button>
        <button type="button" class="btn btn-outline-primary" onclick="goToSummary()"> Guest Log In</button>
    </div>
</form>
</div>
`;
}

/**
 * this function is used to navigte to summary
 */
async function goToSummary() {
  await setItem('userInitial', 'G');
  await setItem('userName', 'Guest');
  window.location.href = "./summary.html";
}

/**
 * this function is used to show the button connecting log in tosign up
 */
function signUpBtns() {
  const logIn = document.getElementById("logIn");
  setTimeout(() => {
    logIn.innerHTML += /*html*/ `
        <div id="signUpBtnContainer">
            <div>Not a join user?</div>
            <button class="btn btn-primary" onclick="signUpPage()">sign up</button>
        </div>
        `;
  }, 800);
}

/**
 * this function is used to navigte to signUp
 */
function signUpPage() {
  window.location.href = "./signUp.html";
}

/**
 * this function is used to create the footer  of the page logIn.html
 */
function footer() {
  const logIn = document.getElementById("logIn");
  setTimeout(() => {
    logIn.innerHTML += /*html*/ `
        <div id="footerContainer">
            <div class="privacyLegal"><a href="./privacyPolicy.html">Privacy Policy</a></div>
            <div class="privacyLegal"><a href="./legalNotice.html">Legal Notice</a></div>
        </div>
        `;
  }, 800);
}

/**
 * this function is used to log In
 */
async function logIn(){
    const email= document.getElementById("logInEmail");
    const password = document.getElementById("logInPassword");
    try {
        users = JSON.parse(await getItem('users'));
        user = users.find(u =>u.email==email.value && u.password== password.value)
        if(user){userInitial= user.name.split(' ').map(word => word[0].toUpperCase()).join('')
        await setItem('userInitial', userInitial);
        await setItem('userName', user.name);
        window.location.href = './summary.html';}
       else if (users.some(u => u.email === email.value)) {ifPasswortWorng(password);}
       else {ifNotFound(password,email)}
    } catch(e){console.error('Loading error:', e);}
}

/**
 * this function is used to style the password input if password is wrong
 * @param {string} password login password
 */
function ifPasswortWorng(password) {
  password.style.borderBottom = "1px solid red";
  password.style.color = "red";
}

/**
 * this function is used to style the fields if user does not exist
 * @param {string} password 
 * @param {string} email 
 */
function ifNotFound(password,email) {
  email.style.borderBottom = "1px solid red";
  email.style.color = "red";
  password.style.borderBottom = "1px solid red";
  password.style.color = "red";
}