import Timer from './timer';
import chimeSfx from '../assets/audio/meditation-bell.mp3';

const timer = Timer(undefined, displayTime, {
  startCallback: playChime,
  endCallback: playChime,
});

function appInit() {
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

function settingsInit() {
  const timerInput = document.querySelector('.settings-timer-input');
  const timerInputDisplay = document.querySelector('.settings-timer-value');

  timerInput.addEventListener('input', () => {
    if (timerInput.value == 1) {
      timerInputDisplay.nextElementSibling.textContent = 'Min';
    } else {
      timerInputDisplay.nextElementSibling.textContent = 'Mins';
    }
    timerInputDisplay.textContent = timerInput.value;
  });

  const StartBtn = document.querySelector('.launch-timer-btn');
  StartBtn.addEventListener('click', launchTimer);
}

// =============== //
// Timer Functions //
// =============== //
function resetTimer() {
  timer.stopTimer();
  togglePauseBtnIcon();
  timer.resetTimer();
  displayTime(timer.getTimerLength());
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

function playChime() {
  const chimeAudio = new Audio(chimeSfx);
  chimeAudio.play();
}

function displayTime(time) {
  const timeSpan = document.querySelector('.time');
  timeSpan.innerHTML = time;
}

function timerInit() {
  const resetBtn = document.querySelector('.timer-reset-btn');
  resetBtn.addEventListener('click', resetTimer);

  const pauseBtn = document.querySelector('.timer-pause-btn');
  pauseBtn.addEventListener('click', toggleTimerState);
}

export { appInit };
