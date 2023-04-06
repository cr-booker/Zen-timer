import Timer from './timer';
import chimeSfx from '../assets/audio/meditation-bell.mp3';

const chimeAudio = new Audio(chimeSfx);
chimeAudio.preload = 'auto';
console.log(chimeAudio);

const timer = Timer(undefined, displayTime, {
  startCallback: playChime,
  endCallback: playChime,
});

function appInit() {
  setGreeting();
  settingsInit();
  timerInit();
}

// ========= //
// Utilities //
// ========= //
function showElement(elementQuery) {
  const elementToHide = document.querySelector(elementQuery);
  elementToHide.classList.remove('hide');
}

function hideElement(elementQuery) {
  const elementToHide = document.querySelector(elementQuery);
  elementToHide.classList.add('hide');
}

// ======================== //
// Timer Settings functions //
// ======================== //
function getTimerLength() {
  const length = document.getElementById('timer-length-input').value;
  return length * 60;
}

function launchTimer() {
  hideElement('.timer-config');
  showElement('.app');
  const timerLength = getTimerLength();
  timer.setTimerLength(timerLength);
  displayTime(timer.getTimerLength());
  setTimeout(timer.startTimer, 350);
}

function getGreeting() {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour <= 11) {
    return {
      icon: 'sunny',
      greeting: 'Good Morning',
      message: 'Hope your day is as wonderful as you are.',
    };
  }
  if (currentHour >= 12 && currentHour <= 17) {
    return {
      icon: 'wb_twilight',
      greeting: 'Good Afternoon',
      message: "Don't let anything dull your shine",
    };
  }
  return {
    icon: 'bedtime',
    greeting: 'Good Evening',
    message: 'Remember, every sunset promises a new dawn.',
  };
}

function setGreeting() {
  const greetingObj = getGreeting();
  const icon = document.getElementById('greeting-icon');
  const greeting = document.getElementById('timed-greeting');
  const message = document.getElementById('greeting-message');
  icon.textContent = greetingObj.icon;
  greeting.textContent = greetingObj.greeting;
  message.textContent = greetingObj.message;
}

function changeInputAbbr() {
  const timerInput = document.querySelector('.settings-timer-input');
  const timerInputDisplay = document.querySelector('.settings-timer-value');
  if (timerInput.value == 1) {
    timerInputDisplay.nextElementSibling.textContent = 'Min';
  } else {
    timerInputDisplay.nextElementSibling.textContent = 'Mins';
  }
  timerInputDisplay.textContent = timerInput.value;
}

function settingsInit() {
  const timerInput = document.querySelector('.settings-timer-input');
  timerInput.addEventListener('input', changeInputAbbr);

  const StartBtn = document.querySelector('.launch-timer-btn');
  StartBtn.addEventListener('click', launchTimer);
}

// =============== //
// Timer Functions //
// =============== //
function closeTimer() {
  chimeAudio.pause();
  chimeAudio.currentTime = 0;
  timer.stopTimer();
  timer.resetTimer();
  hideElement('.app');
  showElement('.timer-config');
}

function resetTimer() {
  timer.stopTimer();
  togglePauseBtnIcon();
  timer.resetTimer();
  displayTime(timer.getTimerLength());
}

function playChime() {
  if (chimeAudio.paused) {
    chimeAudio.play();
  } else {
    chimeAudio.currentTime = 0;
  }
}

function displayTime(time) {
  const timeSpan = document.querySelector('.time');
  timeSpan.innerHTML = time;
}

function togglePauseBtnIcon() {
  const icon = document.querySelector('.timer-pause-btn').firstElementChild;
  icon.textContent = timer.isRunning() ? 'pause ' : 'play_arrow';
}

function toggleTimerState() {
  if (timer.isRunning()) {
    timer.stopTimer();
    togglePauseBtnIcon();
    return;
  }
  timer.startTimer();
  togglePauseBtnIcon();
}

function timerInit() {
  const resetBtn = document.querySelector('.timer-reset-btn');
  resetBtn.addEventListener('click', resetTimer);

  const pauseBtn = document.querySelector('.timer-pause-btn');
  pauseBtn.addEventListener('click', toggleTimerState);

  const homeBtn = document.querySelector('.home-btn');
  homeBtn.addEventListener('click', closeTimer);
}

export { appInit };
