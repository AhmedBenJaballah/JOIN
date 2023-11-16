/**
 * this function is used to get the Initials of the user
 */
async function getInitials() {
  userInitial = await getItem("userInitial");
  const kanban = document.getElementById("kanban");
  kanban.innerHTML += `<div onclick="displayOptions()" id="initials">
    ${userInitial}
    </div>`;
}

/**
 * this function is used to display the options when clicking of the initials logo
 */
function displayOptions() {
  const options = document.getElementById("options");
  if (options.classList.contains("dNone")) {
    options.classList.remove("dNone");
    options.innerHTML = `
    <div class="option"><a href="/privacyPolicy.html">Privacy Policy</a></div>
    <div class="option"><a href="/legalNotice.html">Legal Notice</a></div>
    <div class="option" onclick="goToLogIn()">Log out</div>
    `;
  } else {
    options.classList.add("dNone");
  }
}

/**
 * this function is used to navigte to log In
 */
function goToLogIn() {
  window.location.href = "logIn.html";
}
