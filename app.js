
const minutesEl = document.querySelector('#minutes');
const secondsEl = document.querySelector('#seconds');

const startButton = document.querySelector('#start-btn');
startButton.addEventListener('click', startGeneralTimer);

function startGeneralTimer() {

  disableButtonsMomentarily();
  countdownTimer(true);

}

const stopButton = document.querySelector('#stop-btn');
stopButton.addEventListener('click', stopGeneralTimer);

function stopGeneralTimer() {

  disableButtonsMomentarily();

}

const resetButton = document.querySelector('#reset-btn');
resetButton.addEventListener('click', resetGeneralTimer);

function resetGeneralTimer() {

  disableButtonsMomentarily()

  if (pompelmoButton.className === 'pompelmo-btn selected') {
    minutesEl.textContent = '25';
  } else if (shortBreakButton.className === 'short-break-button selected') {
    minutesEl.textContent = '05';
  } else if (longBreakButton.className === 'long-break-button selected') {
    minutesEl.textContent = '10';
  }

  secondsEl.textContent = '00';

}


const pompelmoButton = document.querySelector('.pompelmo-btn');
const shortBreakButton = document.querySelector('.short-break-button');
const longBreakButton = document.querySelector('.long-break-button');

pompelmoButton.addEventListener('click', startPompelmo);
shortBreakButton.addEventListener('click', startShortBreak);
longBreakButton.addEventListener('click', startLongBreak);



function startPompelmo() {

  shortBreakButton.style.pointerEvents = 'none';
  longBreakButton.style.pointerEvents = 'none';

  pompelmoButton.classList.add('selected');
  shortBreakButton.classList.remove('selected');
  longBreakButton.classList.remove('selected');

  minutesEl.textContent = 25;
  secondsEl.textContent = 00;

  countdownTimer(true);

  setTimeout(function () {

    shortBreakButton.style.pointerEvents = 'all';
    longBreakButton.style.pointerEvents = 'all';

  }, 1500);
}

function startShortBreak() {

  pompelmoButton.style.pointerEvents = 'none';
  longBreakButton.style.pointerEvents = 'none';

  pompelmoButton.classList.remove('selected');
  shortBreakButton.classList.add('selected');
  longBreakButton.classList.remove('selected');

  minutesEl.textContent = 5;
  secondsEl.textContent = 00;

  countdownTimer(false);

  setTimeout(function () {

    pompelmoButton.style.pointerEvents = 'all';
    longBreakButton.style.pointerEvents = 'all';

  }, 1500);

}

function startLongBreak() {

  pompelmoButton.style.pointerEvents = 'none';
  shortBreakButton.style.pointerEvents = 'none';

  pompelmoButton.classList.remove('selected');
  shortBreakButton.classList.remove('selected');
  longBreakButton.classList.add('selected');

  minutesEl.textContent = 10;
  secondsEl.textContent = 00;

  countdownTimer(false);

  setTimeout(function () {

    pompelmoButton.style.pointerEvents = 'all';
    shortBreakButton.style.pointerEvents = 'all';

  }, 1500);

}




function countdownTimer(isPompelpo) {

  const minutesTime = Number(minutesEl.textContent);
  const secondsTime = Number(secondsEl.textContent);

  let totalSeconds = minutesTime * 60 + secondsTime;

  displayTime(totalSeconds);
  totalSeconds -= 1;

  var varTimer = setInterval(() => {

    displayTime(totalSeconds);
    totalSeconds -= 1;

    // Need to clear timer for buttons
    startButton.addEventListener('click', stopTimer);
    pompelmoButton.addEventListener('click', stopTimer);
    shortBreakButton.addEventListener('click', stopTimer);
    longBreakButton.addEventListener('click', stopTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', stopTimer)

    function stopTimer() {
      clearInterval(varTimer)
    }

    if (totalSeconds < 0) {
      clearInterval(varTimer);

      if (isPompelpo) {
        addGrapefruit();
      }

    }

  }, 1000);

  return varTimer;

}


function displayTime(totalTime) {
  let timeInMinutes = Math.floor(totalTime / 60);
  let timeInSeconds = Math.round((totalTime / 60 - timeInMinutes) * 60);

  timeInSeconds < 10 ? seconds.textContent = '0' + timeInSeconds : seconds.textContent = timeInSeconds;
  timeInMinutes < 10 ? minutes.textContent = '0' + timeInMinutes : minutes.textContent = timeInMinutes;
}


function addGrapefruit() {

  const grapefruitSection = document.querySelector('.grapefruit-container');
  const img = document.createElement('img');
  img.setAttribute('src', './grapefruit-icon.png');

  grapefruitSection.appendChild(img);


}


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