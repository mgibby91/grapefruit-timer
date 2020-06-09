
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
// Pompelmo, Short Break + Long Breal Event Listeners / Functions
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
