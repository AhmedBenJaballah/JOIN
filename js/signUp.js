let users = [];

function goToLogIn(){
    window.location.href = 'logIn.html';
}

async function init(){
    loadUsers();
}

async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}


async function register() {
    const registerBtn= document.getElementById("registerBtn")
    registerBtn.disabled = true;
    users.push({
        name:signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value,
    });
    await setItem('users', JSON.stringify(users));
    resetForm();
}

function resetForm() {
    const registerBtn= document.getElementById("registerBtn")
    signUpName.value= '';
    signUpEmail.value = '';
    signUpPassword.value = '';
    signUpPasswordConfirmation.value='';
    registerBtn.disabled = false;
}