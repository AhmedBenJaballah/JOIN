loadAmount();
setTimeout(() => {
    let summarySiebar=document.getElementById('summarySiebar');
    summarySiebar.style.backgroundColor='#D2E3FF';
    summarySiebar.style.borderRadius='8px';
}, 200);
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
        const goodMornig = document.getElementById('goodMornig');
        goodMornig.innerHTML += `, <span style="color: #4589FF; font-weight: bold;font-size: 60px;">${userName}</span>`;

    } catch (e) {
        console.error('Loading error:', e);
    }
}

function goToBoard(){
    window.location.href = 'board.html';
}
