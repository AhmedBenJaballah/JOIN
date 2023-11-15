loadAmount();
setSidebarStyles();
window.addEventListener("resize", setSidebarStyles);
setTimeout(() => {
  getInitials();
}, 1000);

/**
 * this function is used to style the Sidebar based on the screen resolution
 */
function setSidebarStyles() {
  if (window.location.href.includes("summary")) {
    setTimeout(() => {
      let summarySidebar = document.getElementById("summarySiebar");
      const windowWidth = window.innerWidth;
      if (summarySidebar)
      {
      if (windowWidth < 1040) {
        sidebarUnder(summarySidebar);
      } else {
        sidebarOver(summarySidebar);
      }}
    }, 200);
  }
}

/**
 * this function is used to style the sidebar if over 1040px
 * @param {div} summarySidebar sidebare in the summary.html
 */
function sidebarOver(summarySidebar) {
  summarySidebar.style.backgroundColor = "#D2E3FF";
  summarySidebar.style.borderRadius = "8px";
  summarySidebar.style.color = "#42526E";
}

/**
 * this function is used to style the sidebar if under 1040px
 * @param {div} summarySidebar sidebare in the summary.html
 */
function sidebarUnder(summarySidebar) {
  summarySidebar.style.backgroundColor = "transparent";
  summarySidebar.style.color = "#337aec";
}

/**
 * this function is used to get the the number of tasks in bord
 */
async function loadAmount() {
  try {
    let amount = JSON.parse(await getItem("amount"));
    const taskElements = getTaskElements();
    setSummary(amount, ...taskElements);
    userName = await getItem("userName");
    greeting();
    getCurrentDate();
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * this function is used to get all the tasks element in summary.html
 * @returns 
 */
function getTaskElements() {
  return [
    document.getElementById("tasksToDo"),
    document.getElementById("tasksInProgress"),
    document.getElementById("tasksAwaitFeedback"),
    document.getElementById("tasksDone"),
    document.getElementById("tasksInBoard"),
    document.getElementById("totalTasks")
  ];
}

/**
 * this function is used to set the values of catagories
 * @param {div} amount 
 * @param {div} tasksToDo 
 * @param {div} tasksInProgress 
 * @param {div} tasksAwaitFeedback 
 * @param {div} tasksDone 
 * @param {div} tasksInBoard 
 * @param {div} totalTasks 
 */
function setSummary(amount,tasksToDo,tasksInProgress,tasksAwaitFeedback,tasksDone,tasksInBoard,totalTasks){
  tasksToDo.innerHTML = amount[0]["amountToDo"];
  tasksInProgress.innerHTML = amount[0]["amountInProgress"];
  tasksAwaitFeedback.innerHTML = amount[0]["amountAawaitFeedback"];
  tasksDone.innerHTML = amount[0]["amountDone"];
  tasksInBoard.innerHTML = amount[0]["totalTasks"];
  totalTasks.innerHTML = amount[0]["totalTasks"];
}

/**
 * this function is used to navigate to board
 */
function goToBoard() {
  window.location.href = "board.html";
}

/**
 * this function is used to greet the user based on the day time
 */
function greeting() {
  const timeOfDay = getTimeOfDay();
  const userNameSpan = `<span style="color: #4589FF; font-weight: bold; font-size: 60px;">${userName}</span>`;
  const greetingMessage = `${timeOfDay}, ${userNameSpan}`;
  document.getElementById("goodMornig").innerHTML = greetingMessage;
}

/**
 * this function is used to get the time of the day
 * @returns 
 */
function getTimeOfDay() {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) return "Guten Morgen";
  if (currentHour >= 12 && currentHour < 18) return "Guten Tag";
  if (currentHour >= 18 && currentHour < 22) return "Guten Abend";
  return "Gute Nacht";
}

/**
 * this function is used to get the current date
 */
function getCurrentDate() {
  var currentDateElement = document.getElementById("currentDate");
    var currentDate = new Date();
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = currentDate.toLocaleDateString('de-DE', options);
}