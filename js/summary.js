loadAmount();
setSidebarStyles();
window.addEventListener("resize", setSidebarStyles);
setTimeout(() => {
  getInitials();
}, 1000);

/**
 * this function is used to style the Sidebar based on the screen resolution
 *
 */
function setSidebarStyles() {
  if (window.location.href.includes("summary")) {
    setTimeout(() => {
      let summarySidebar = document.getElementById("summarySiebar");
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
}

/**
 * this function is used to gethe the number of tasks in bord
 */
async function loadAmount() {
  try {
    const amount = JSON.parse(await getItem("amount"));
    const tasksToDo = document.getElementById("tasksToDo");
    const tasksInProgress = document.getElementById("tasksInProgress");
    const tasksAwaitFeedback = document.getElementById("tasksAwaitFeedback");
    const tasksDone = document.getElementById("tasksDone");
    const tasksInBoard = document.getElementById("tasksInBoard");

    tasksToDo.innerHTML = amount[0]["amountToDo"];
    tasksInProgress.innerHTML = amount[0]["amountInProgress"];
    tasksAwaitFeedback.innerHTML = amount[0]["amountAawaitFeedback"];
    tasksDone.innerHTML = amount[0]["amountDone"];
    tasksInBoard.innerHTML = amount[0]["totalTasks"];
    userName = await getItem("userName");
    greeting();
  } catch (e) {
    console.error("Loading error:", e);
  }
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
  const goodMorning = document.getElementById("goodMornig");
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Guten Morgen";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Guten Tag";
  } else if (currentHour >= 18 && currentHour < 22) {
    greeting = "Guten Abend";
  } else {
    greeting = "Gute Nacht";
  }

  goodMorning.innerHTML = `${greeting}, <span style="color: #4589FF; font-weight: bold; font-size: 60px;">${userName}</span>`;
}
