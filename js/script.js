function startJoin() {
    const logIn=document.getElementById("logIn");
    logIn.innerHTML = /*html*/ `
        <img src="grafiken/Capa 2 (1).png" id="joinStartImage">
    `;
    setTimeout(() => {
        putImageAside();
        createLogInContainer();
        signUpBtns();
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
    }, 500);
    logIn.style.transition = "background-color 1s ease"
    logIn.style.backgroundColor="white"
}

function createLogInContainer(){
    const logIn = document.getElementById("logIn");
    setTimeout(() => {
        logIn.innerHTML+=/*html*/`
        <div id="logInContainer">
            <div id="logInTitle">Log in</div>
            <input type="email" id="logInEmail" placeholder="Email" class="inputLogIn">
            <input type="password" id="logInPassword" placeholder="Password" class="inputLogIn">
            <div id="rememberMeContainer">
                <input type="checkbox" id="rememberMe">
                <label for="rememberMe">Remember me</label>
            </div>
            <div id="logInBtns">
                <button class="btn btn-primary">Log In</button>
                <button class="btn btn-light"> Guest Log In</button>
            </div>
        </div>
        `
    }, 500);
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
    }, 500);
}

function signUpPage() {
    window.location.href = 'signUp.html';
}