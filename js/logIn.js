function startJoin() {
    const logIn=document.getElementById("logIn");
    logIn.innerHTML = /*html*/ `
        <img src="grafiken/Capa 2 (1).png" id="joinStartImage">
    `;
    setTimeout(() => {
        putImageAside();
        createLogInContainer();
        signUpBtns();
        footer();
    }, 200);
}

function putImageAside() {
    const joinStartImage = document.getElementById("joinStartImage");
    const logIn = document.getElementById("logIn");
    joinStartImage.style.transition = "position 1s ease, top 1s ease, left 1s ease, width 1s ease, transform 1s ease"; // Hier wurde die Breite (width) hinzugefügt.
    joinStartImage.style.position = "absolute";
    joinStartImage.style.top = "40px";
    joinStartImage.style.left = "40px";
    joinStartImage.style.width = "80px"; 
    joinStartImage.style.transform="none";
    setTimeout(() => {
        joinStartImage.src="grafiken/Capa 2.png"
    }, 800);
    logIn.style.transition = "background-color 1s ease"
    logIn.style.backgroundColor="white"
}

function createLogInContainer(){
    const logIn = document.getElementById("logIn");
    setTimeout(() => {
        logIn.innerHTML+=/*html*/`
        <div id="logInContainer">
            <div id="logInTitle">Log in</div>
            <input type="email" id="logInEmail" placeholder="Email" class="inputLogIn" required>
            <input type="password" id="logInPassword" placeholder="Password" class="inputLogIn" required>
            <div id="rememberMeContainer">
                <input type="checkbox" id="rememberMe">
                <label for="rememberMe">Remember me</label>
            </div>
            <div id="logInBtns">
                <button class="btn btn-primary">Log In</button>
                <button class="btn btn-light" onclick="goToSummary()"> Guest Log In</button>
            </div>
        </div>
        `
    }, 800);
}

function goToSummary(){
    window.location.href = '/summary.html';
}

function signUpBtns(){
    const logIn = document.getElementById("logIn");
    setTimeout(() => {
        logIn.innerHTML+=/*html*/`
        <div id="signUpBtnContainer">
            <div>Not a join user?</div>
            <button class="btn btn-primary" onclick="signUpPage()">sign up</button>
        </div>
        `
    }, 800);
}

function signUpPage() {
    window.location.href = '/signUp.html';
}

function footer(){
    const logIn = document.getElementById("logIn");
    setTimeout(() => {
        logIn.innerHTML+=/*html*/`
        <div id="footerContainer">
            <div class="privacyLegal">Privacy Policy</div>
            <div class="privacyLegal">Legal Notice</div>
        </div>
        `
    }, 800);
}