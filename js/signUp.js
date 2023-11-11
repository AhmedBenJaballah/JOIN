let users = [];

/**
 * this function is used to navigte to log In
 */
function goToLogIn() {
  window.location.href = "logIn.html";
}

/**
 * this function is used to call the function loadUsers()
 */
async function init() {
  loadUsers();
}

/**
 * this function is used to navigte to log In
 */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * this function is used to register the user
 */
async function register() {
  const registerBtn = document.getElementById("registerBtn");
  registerBtn.disabled = true;
  users.push({
    name: signUpName.value,
    email: signUpEmail.value,
    password: signUpPassword.value,
  });
  await setItem("users", JSON.stringify(users));
  resetForm();
  successfullySignedUp();
  
}

/**
 * this function is used to navigte to reset the register form
 */
function resetForm() {
  const registerBtn = document.getElementById("registerBtn");
  signUpName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
  signUpPasswordConfirmation.value = "";
  registerBtn.disabled = false;
}

/**
 * this function is used register und the condition that the box is checked
 */
function handleCheckboxChange() {
  const acceptCheckbox = document.getElementById("acceptSignUp");
  const registerButton = document.getElementById("registerBtn");

  if (acceptCheckbox.checked) {
    registerButton.disabled = false;
  } else {
    registerButton.disabled = true;
  }
}

/**
 * this function is used to animate a div to confirm the adding of a new contact
 */
function successfullySignedUp() {
  const success = document.getElementById("signedUp");
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
  setTimeout(() => {
    window.location.href = "/logIn.html";
  }, 2000);
}
