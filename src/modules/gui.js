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

function showElement(elementQuery) {
  const elementToHide = document.querySelector(elementQuery);
  elementToHide.classList.remove('hide');
}

function hideElement(elementQuery) {
  const elementToHide = document.querySelector(elementQuery);
  elementToHide.classList.add('hide');
}

function startTimer() {
  const timerLength = getTimerLength();
  hideElement('.timer-config');
  showElement('.app');
  timer.setTimeLimit(timerLength);
  timer.startTimer();
}

function toggleTimerState(event) {
  const icon = event.target.firstElementChild;
  if (timer.isRunning()) {
    icon.textContent = 'play_arrow';
    timer.stopTimer();
    return;
  }
  icon.textContent = 'pause';
  timer.startTimer();
}

function resetTimer() {
  timer.stopTimer();
  timer.resetTimer();
  timer.startTimer();
}

function getTimerLength() {
  const length = document.getElementById('timer-length-input').value;
  return length * 60;
}

function playChime() {
  const chimeAudio = new Audio(chimeSfx);
  chimeAudio.play();
}

function displayTime(time) {
  const timeSpan = document.querySelector('.time');
  timeSpan.innerHTML = time;
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
  StartBtn.addEventListener('click', startTimer);
}

function timerInit() {
  const resetBtn = document.querySelector('.timer-reset-btn');
  resetBtn.addEventListener('click', resetTimer);

  const pauseBtn = document.querySelector('.timer-pause-btn');
  pauseBtn.addEventListener('click', toggleTimerState);
}

export { appInit };
