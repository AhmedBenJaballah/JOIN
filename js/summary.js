loadAmount();


async function loadAmount() {
    try {
        const amount = JSON.parse(await getItem('amount'));
        const tasksToDo = document.getElementById("tasksToDo");
        const tasksInProgress = document.getElementById("tasksInProgress");
        const tasksAwaitFeedback = document.getElementById("tasksAwaitFeedback");
        const tasksDone = document.getElementById("tasksDone");
        const tasksInBoard = document.getElementById("tasksInBoard");
        
        tasksToDo.innerHTML = amount[0]['amountToDo'];
        tasksInProgress.innerHTML= amount[0]['amountInProgress'];
        tasksAwaitFeedback.innerHTML = amount[0]['amountAawaitFeedback'];
        tasksDone.innerHTML = amount[0]['amountDone'];
        tasksInBoard.innerHTML = amount[0]['totalTasks'];
    } catch (e) {
        console.error('Loading error:', e);
    }
}

