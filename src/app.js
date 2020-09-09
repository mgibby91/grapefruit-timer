
// Global variables for DOM elements
const progressBar = document.querySelector('.progress-bar');
const timerButtons = document.querySelector('.timer-buttons');

const minutesEl = document.querySelector('#minutes');
const secondsEl = document.querySelector('#seconds');

const startButton = document.querySelector('#start-btn');
const stopButton = document.querySelector('#stop-btn');
const resetButton = document.querySelector('#reset-btn');

const shortBreakButton = document.querySelector('.short-break-button');
const longBreakButton = document.querySelector('.long-break-button');
const pompelmoButton = document.querySelector('.pompelmo-btn');

const pompelmoTimerInput = document.querySelector('#pompelmo-time');
const shortBreakTimerInput = document.querySelector('#short-break-time');
const longBreakTimerInput = document.querySelector('#long-break-time');

const settingsButton = document.querySelector('.show-settings-button');
const mainContainer = document.querySelector('.main-container');


// *****************************************************************************
// Start, Stop + Reset Button Event Listeners / Functions
// *****************************************************************************

startButton.addEventListener('click', startGeneralTimer);
function startGeneralTimer() {

  disableButtonsMomentarily();

  countdownTimer(true);

}


stopButton.addEventListener('click', stopGeneralTimer);
function stopGeneralTimer() {

  disableButtonsMomentarily();

}


resetButton.addEventListener('click', resetGeneralTimer);
function resetGeneralTimer() {

  progressBar.style.width = '0%';

  disableButtonsMomentarily();

  if (pompelmoButton.className === 'pompelmo-btn selected') {
    Number(pompelmoTimerInput.value) < 10 ? minutesEl.textContent = '0' + pompelmoTimerInput.value : minutesEl.textContent = pompelmoTimerInput.value;
  } else if (shortBreakButton.className === 'short-break-button selected') {
    Number(shortBreakTimerInput.value) < 10 ? minutesEl.textContent = '0' + shortBreakTimerInput.value : minutesEl.textContent = shortBreakTimerInput.value;
  } else if (longBreakButton.className === 'long-break-button selected') {
    Number(longBreakTimerInput.value) < 10 ? minutesEl.textContent = '0' + longBreakTimerInput.value : minutesEl.textContent = longBreakTimerInput.value;
  }

  secondsEl.textContent = '00';

}


// *****************************************************************************
// Pompelmo, Short Break + Long Break Event Listeners / Functions
// *****************************************************************************

const buttonsArray = [pompelmoButton, shortBreakButton, longBreakButton];

let timerValue;

pompelmoButton.addEventListener('click', startPompelmo);
function startPompelmo() {

  timerValue = Number(pompelmoTimerInput.value);

  startTimer(pompelmoButton, 'rgba(25, 210, 80, 1)', true, timerValue);

}


shortBreakButton.addEventListener('click', startShortBreak);
function startShortBreak() {

  timerValue = Number(shortBreakTimerInput.value);

  startTimer(shortBreakButton, 'rgba(25, 180, 250, 1)', false, timerValue);

}


longBreakButton.addEventListener('click', startLongBreak);
function startLongBreak() {

  timerValue = Number(longBreakTimerInput.value);

  startTimer(longBreakButton, 'rgba(25, 180, 250, 1)', false, timerValue);

}



// *****************************************************************************
// General Functions
// *****************************************************************************

function startTimer(whatButton, themeColor, countdownBoolean, minutesTime) {

  document.body.style.background = themeColor;
  timerButtons.style.color = themeColor;
  document.querySelectorAll('.sort-btns')[0].style.color = themeColor;
  document.querySelectorAll('.sort-btns')[1].style.color = themeColor;

  progressBar.style.width = '0%';

  for (let button of buttonsArray) {
    if (whatButton !== button) {
      button.style.pointerEvents = 'none';
      button.classList.remove('selected');
    }
  }

  whatButton.classList.add('selected');

  minutesEl.textContent = minutesTime;
  secondsEl.textContent = 00;

  countdownTimer(countdownBoolean);

  setTimeout(function () {

    for (let button of buttonsArray) {
      if (whatButton !== button) {
        button.style.pointerEvents = 'all';
      }
    }

  }, 1500);

}

function countdownTimer(isPompelpo) {

  const minutesTime = Number(minutesEl.textContent);
  const secondsTime = Number(secondsEl.textContent);

  let totalSeconds = minutesTime * 60 + secondsTime;

  displayTime(totalSeconds);
  totalSeconds -= 1;

  var varTimer = setInterval(() => {

    if (pompelmoButton.className === 'pompelmo-btn selected') {
      changeBgOverPompelmo(totalSeconds);
    } else {
      changeBgOverBreak(totalSeconds);
    }

    disaplyProgressOverTime(totalSeconds);

    displayTime(totalSeconds);
    totalSeconds -= 1;

    // Need to clear timer for buttons
    startButton.addEventListener('click', stopTimer);
    pompelmoButton.addEventListener('click', stopTimer);
    shortBreakButton.addEventListener('click', stopTimer);
    longBreakButton.addEventListener('click', stopTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', stopTimer);
    settingsButton.addEventListener('click', stopTimer);

    function stopTimer() {
      clearInterval(varTimer)
    }

    if (totalSeconds < 0) {
      clearInterval(varTimer);

      if (isPompelpo) {
        addGrapefruit();
        addGrapefruitCountToLS();
      }

    }

  }, 1000);

  return varTimer;

}


function displayTime(totalTime) {
  let timeInMinutes = Math.floor(totalTime / 60);
  let timeInSeconds = Math.round((totalTime / 60 - timeInMinutes) * 60);

  const documentTitle = document.head.querySelector('title');

  let titleTimer = '(';

  timeInSeconds < 10 ? secondsEl.textContent = '0' + timeInSeconds : secondsEl.textContent = timeInSeconds;
  timeInMinutes < 10 ? minutesEl.textContent = '0' + timeInMinutes : minutesEl.textContent = timeInMinutes;

  timeInMinutes < 10 ? titleTimer += '0' + timeInMinutes : titleTimer += timeInMinutes;
  titleTimer += ':';
  timeInSeconds < 10 ? titleTimer += '0' + timeInSeconds : titleTimer += timeInSeconds;
  titleTimer += ') Grapefruit Timer | Pompelmo Technique';

  documentTitle.insertAdjacentText('afterbegin', titleTimer);

}


function addGrapefruit() {

  const grapefruitSection = document.querySelector('.grapefruit-container');
  const img = document.createElement('img');
  img.setAttribute('src', './grapefruit-icon.png');

  grapefruitSection.appendChild(img);

}

function addGrapefruitCountToLS() {

  let gfCount;
  if (localStorage.getItem('gfCount') === null) {
    gfCount = 0;
  } else {
    gfCount = JSON.parse(localStorage.getItem('gfCount'))
  }
  gfCount += 1;
  localStorage.setItem('gfCount', JSON.stringify(gfCount));

}

function getGrapefruitCountFromLS() {

  let gfCount;
  if (localStorage.getItem('gfCount') === null) {
    gfCount = 0;
  } else {
    gfCount = JSON.parse(localStorage.getItem('gfCount'))
  }

  for (let i = 0; i < gfCount; i++) {
    addGrapefruit()
  }

}
getGrapefruitCountFromLS();


function disableButtonsMomentarily() {
  pompelmoButton.style.pointerEvents = 'none';
  shortBreakButton.style.pointerEvents = 'none';
  longBreakButton.style.pointerEvents = 'none';

  setTimeout(function () {

    pompelmoButton.style.pointerEvents = 'all';
    shortBreakButton.style.pointerEvents = 'all';
    longBreakButton.style.pointerEvents = 'all';

  }, 1500);
}


function changeBgOverPompelmo(totalSeconds) {

  const startingTime = Number(pompelmoTimerInput.value * 60);

  const startGreen = 210;
  const endGreen = 180;
  const greenDifference = startGreen - endGreen;

  let newGreen = startGreen - ((greenDifference) - (totalSeconds / startingTime * greenDifference));

  const startBlue = 80;
  const endBlue = 250;
  const blueDifference = endBlue - startBlue;

  let newBlue = startBlue + (blueDifference * (1 - totalSeconds / startingTime));

  document.body.style.background = `rgba(25, ${newGreen}, ${newBlue}, 1)`;
  document.querySelector('.timer-buttons').style.color = `rgba(25, ${newGreen}, ${newBlue}, 1)`;
  document.querySelectorAll('.sort-btns')[0].style.color = `rgba(25, ${newGreen}, ${newBlue}, 1)`;
  document.querySelectorAll('.sort-btns')[1].style.color = `rgba(25, ${newGreen}, ${newBlue}, 1)`;

}

function changeBgOverBreak(totalSeconds) {

  let startingTime;

  if (shortBreakButton.className === 'short-break-button selected') {
    startingTime = Number(shortBreakTimerInput.value) * 60;
  }
  if (longBreakButton.className === 'long-break-button selected') {
    startingTime = Number(longBreakTimerInput.value) * 60;
  }

  const startGreen = 180;
  const endGreen = 210;
  const greenDifference = endGreen - startGreen;

  let newGreen = startGreen + (greenDifference * (1 - totalSeconds / startingTime));

  const startBlue = 250;
  const endBlue = 80;
  const blueDifference = startBlue - endBlue;

  let newBlue = startBlue - ((blueDifference) - (totalSeconds / startingTime * blueDifference));

  document.body.style.background = `rgba(25, ${newGreen}, ${newBlue}, 1)`;
  document.querySelector('.timer-buttons').style.color = `rgba(25, ${newGreen}, ${newBlue}, 1)`;
  document.querySelectorAll('.sort-btns')[0].style.color = `rgba(25, ${newGreen}, ${newBlue}, 1)`;
  document.querySelectorAll('.sort-btns')[1].style.color = `rgba(25, ${newGreen}, ${newBlue}, 1)`;

}



// Progress bar
function disaplyProgressOverTime(currentTime) {

  let totalTime;

  if (pompelmoButton.className === 'pompelmo-btn selected') {
    totalTime = Number(pompelmoTimerInput.value * 60);
  } else if (shortBreakButton.className === 'short-break-button selected') {
    totalTime = Number(shortBreakTimerInput.value * 60);
  } else if (longBreakButton.className === 'long-break-button selected') {
    totalTime = Number(longBreakTimerInput.value * 60);
  }

  progressBar.style.width = `${(1 - currentTime / totalTime) * 100}%`;

}



pompelmoTimerInput.addEventListener('change', updateMinuteDisplay);
shortBreakTimerInput.addEventListener('change', updateMinuteDisplay);
longBreakTimerInput.addEventListener('change', updateMinuteDisplay);

function updateMinuteDisplay() {


  if (pompelmoButton.className === 'pompelmo-btn selected') {
    Number(pompelmoTimerInput.value) < 10 ? minutesEl.textContent = '0' + pompelmoTimerInput.value : minutesEl.textContent = pompelmoTimerInput.value;
  } else if (shortBreakButton.className === 'short-break-button selected') {
    Number(shortBreakTimerInput.value) < 10 ? minutesEl.textContent = '0' + shortBreakTimerInput.value : minutesEl.textContent = shortBreakTimerInput.value;
  } else if (longBreakButton.className === 'long-break-button selected') {
    Number(longBreakTimerInput.value) < 10 ? minutesEl.textContent = '0' + longBreakTimerInput.value : minutesEl.textContent = longBreakTimerInput.value;
  }

}


// show settings on click
settingsButton.addEventListener('click', showSettings);

function showSettings() {

  const settingsInput = document.getElementsByClassName('timer-settings');

  for (let setting of settingsInput) {
    setting.classList.toggle('show-hide');
  }

  resetGeneralTimer();

  // mainContainer.classList.toggle('pointer-events-toggle');

}





// *****************************************************************************
// Task List
// *****************************************************************************


// QUESTION FOR LL - How can I click on document to exit out of submitTaskContainer
// I think it's not working because of event bubbling

const submitTaskContainer = document.querySelector('.submit-task-container');
const submitTaskPriority = document.querySelector('.submit-task-priority');
const addTaskButton = document.querySelector('.add-task');
const cancelSubmitTask = document.querySelector('#cancel');

addTaskButton.addEventListener('click', showTaskInput);
function showTaskInput() {

  addTaskButton.style.display = 'none';
  submitTaskContainer.style.display = 'flex';

}

cancelSubmitTask.addEventListener('click', hideTaskInput);
function hideTaskInput() {

  addTaskButton.style.display = 'flex';
  submitTaskContainer.style.display = 'none';

}

// submitTaskPriority.addEventListener('click', switchSelectedPriority);
// function switchSelectedPriority(e) {

//   if (e.target.className === 'priorities-scale') {
//     e.target.classList.add('priorities-selected');
//   } else if (e.target.parentElement.className === 'priorities-scale') {
//     e.target.parentElement.classList.add('priorities-selected');
//   }

// }

const priorityChoices = document.querySelectorAll('.priorities-scale');

function toggleSelectedPriorityClass() {

  for (let priority of priorityChoices) {
    priority.addEventListener('click', function () {

      const selectedPriority = document.querySelector('.priorities-scale.priorities-selected');

      selectedPriority.classList.remove('priorities-selected');
      priority.classList.add('priorities-selected');
    });
  }

}

toggleSelectedPriorityClass();

// Save task to list
const taskSaveButton = document.querySelector('#save');
const taskInput = document.querySelector('#task-input');
const tasksSection = document.querySelector('.tasks-section');


let taskListData = getTasksFromLS();

taskSaveButton.addEventListener('click', saveTaskToList);
function saveTaskToList() {

  if (taskInput.value) {

    const selectedPriority = document.querySelector('.priorities-scale.priorities-selected');

    const grapefruitNum = Number(selectedPriority.id[0]);
    let grapefruitImgHTML = '';

    for (let i = 0; i < grapefruitNum; i++) {
      grapefruitImgHTML += '<img src="./grapefruit-icon.png">\n';
    }

    const newTaskHMTL = `
    <div class="task-item">
        <div class="task-left">
          <i class="fa fa-check-circle fa-lg" aria-hidden="true"></i>
          <p class='task-name'>${taskInput.value}</p>
        </div>
        <div class="task-right">
          <div class='task-priority'>
            ${grapefruitImgHTML}
          </div>
          <p class='task-edit'>EDIT</p>
          <i class="fa fa-times-circle fa-lg" aria-hidden="true"></i>
        </div>
      </div>
    `;

    tasksSection.insertAdjacentHTML('beforeend', newTaskHMTL);

    taskListData.push({ task: taskInput.value, gfNum: grapefruitNum, isCompleted: false });

    addTaskToLS(taskInput.value, grapefruitNum, false);

    taskInput.value = '';

    addTaskButton.style.display = 'flex';
    submitTaskContainer.style.display = 'none';

  }

}

// Maybe add error message if click save and have no input


// Delete tasks
tasksSection.addEventListener('click', deleteTask);
function deleteTask(e) {

  if (e.target.className === 'fa fa-times-circle fa-lg' || e.target.className === 'task-edit') {
    e.target.parentElement.parentElement.remove();

    const taskToRemove = e.target.parentElement.parentElement.children[0].children[1].textContent;

    taskListData.forEach((task, index) => {
      if (task.task === taskToRemove) {
        taskListData.splice(index, 1);
      }
    });

    deleteTaskFromLS(taskToRemove);
  }

}


// Cross out task completed
tasksSection.addEventListener('click', completedTask);
function completedTask(e) {

  if (e.target.className === 'fa fa-check-circle fa-lg' || e.target.className === 'fa fa-check-circle fa-lg circle-checked') {
    e.target.parentElement.children[1].classList.toggle('task-completed');
    e.target.classList.toggle('circle-checked');

    for (let task of taskListData) {
      if (e.target.className === 'fa fa-check-circle fa-lg circle-checked') {
        if (e.target.parentElement.children[1].textContent === task.task) {
          task.isCompleted = true;
          deleteTaskFromLS(task.task);
          addTaskToLS(task.task, task.gfNum, true);
          console.log(taskListData);
        }
      }

      if (e.target.className === 'fa fa-check-circle fa-lg') {
        if (e.target.parentElement.children[1].textContent === task.task) {
          task.isCompleted = false;
          deleteTaskFromLS(task.task);
          addTaskToLS(task.task, task.gfNum, false);
          console.log(taskListData);
        }
      }
    }
  }


}


// Add task to LS
function addTaskToLS(taskText, priorityNum, completedBoolean) {

  let taskList;
  if (localStorage.getItem('taskList') === null) {
    taskList = [];
  } else {
    taskList = JSON.parse(localStorage.getItem('taskList'));
  }

  taskList.push({ task: taskText, gfNum: priorityNum, isCompleted: completedBoolean });
  localStorage.setItem('taskList', JSON.stringify(taskList));

}


// Remove task from LS
function deleteTaskFromLS(taskToDelete) {

  let taskList;
  if (localStorage.getItem('taskList') === null) {
    taskList = [];
  } else {
    taskList = JSON.parse(localStorage.getItem('taskList'));
  }

  taskList.forEach((task, index) => {
    if (task.task === taskToDelete) {
      taskList.splice(index, 1);
    }
  });

  localStorage.setItem('taskList', JSON.stringify(taskList));

}



function getTasksFromLS() {

  let taskList;
  if (localStorage.getItem('taskList') === null) {
    taskList = [];
  } else {
    taskList = JSON.parse(localStorage.getItem('taskList'));
  }

  addTasksToList(taskList);

  return taskList;
}

getTasksFromLS();
// Should add save and load if the task is checked off or not


// Sort by priority
const sortByPriorityButton = document.querySelector('#sort-priority');

sortByPriorityButton.addEventListener('click', sortByPriority);
function sortByPriority() {

  if (taskListData) {
    function compare(a, b) {

      const priorityOne = a.gfNum;
      const priorityTwo = b.gfNum;

      let comparison = 0;
      if (priorityOne < priorityTwo) {
        comparison = 1;
      } else if (priorityOne > priorityTwo) {
        comparison = -1;
      }
      return comparison;
    }

    taskListData.sort(compare);
  }

  addTasksToList(taskListData);

}

// Sort by completed
const sortByCompletedButton = document.querySelector('#sort-completed');

sortByCompletedButton.addEventListener('click', sortByCompleted);
function sortByCompleted() {

  if (taskListData) {
    function compare(a, b) {

      const priorityOne = a.isCompleted;
      const priorityTwo = b.isCompleted;

      let comparison = 0;
      if (priorityOne > priorityTwo) {
        comparison = 1;
      } else if (priorityOne < priorityTwo) {
        comparison = -1;
      }
      return comparison;
    }

    taskListData.sort(compare);
  }

  addTasksToList(taskListData);


}



function addTasksToList(taskList) {

  tasksSection.innerHTML = '';

  for (let task of taskList) {
    let grapefruitImgHTML = '';

    for (let i = 0; i < task.gfNum; i++) {
      grapefruitImgHTML += '<img src="./grapefruit-icon.png">\n';
    }

    let checkedHTML;

    if (task.isCompleted === false) {
      checkedHTML = `<i class="fa fa-check-circle fa-lg" aria-hidden="true"></i>
      <p class='task-name'>${task.task}</p>`
    } else if (task.isCompleted === true) {
      checkedHTML = `<i class="fa fa-check-circle fa-lg circle-checked" aria-hidden="true"></i>
      <p class='task-name task-completed'>${task.task}</p>`
    }

    const newTaskHMTL = `
    <div class="task-item">
        <div class="task-left">
          ${checkedHTML}
        </div>
        <div class="task-right">
          <div class='task-priority'>
            ${grapefruitImgHTML}
          </div>
          <p class='task-edit'>EDIT</p>
          <i class="fa fa-times-circle fa-lg" aria-hidden="true"></i>
        </div>
      </div>
    `;

    tasksSection.insertAdjacentHTML('beforeend', newTaskHMTL);

  }
}




// EDIT FUNCTION
tasksSection.addEventListener('click', editTask)
function editTask(e) {
  if (e.target.textContent === 'EDIT') {

    addTaskButton.style.display = 'none';
    submitTaskContainer.style.display = 'flex';

    taskInput.value = e.target.parentElement.parentElement.children[0].children[1].textContent;

  }

}



// function timeConverter(UNIX_timestamp) {
//   const a = new Date(UNIX_timestamp * 1000);
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   const year = a.getFullYear();
//   const month = months[a.getMonth()];
//   const date = a.getDate();
//   const hour = a.getHours();
//   const min = a.getMinutes();
//   const sec = a.getSeconds();
//   const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
//   return time;
// }
// console.log(timeConverter(1592506800));