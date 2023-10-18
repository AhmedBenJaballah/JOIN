loadAmount();
setTimeout(() => {
    getInitials();
}, 1000);

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
        userName= (await getItem('userName'));
        const goodMornig=document.getElementById('goodMornig')
        goodMornig.innerHTML+=`, ${userName}`
    } catch (e) {
        console.error('Loading error:', e);
    }
}

function goToBoard(){
    window.location.href = 'board.html';
}
