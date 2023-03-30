export default function Timer(
  length,
  renderCallBack,
  { startCallback, endCallback } = {},
) {
  let timerLength = length;
  let timeRemaining = timerLength;
  let timePassed = 0;
  let timeOutId = null;
  let lastTime = null;
  let running = false;

  function setTimerLength(length) {
    timerLength = length;
    timeRemaining = timerLength;
  }

  function getTimerLength(formatted = true) {
    return formatted === true ? formatTime(timerLength) : timerLength;
  }

  function isRunning() {
    return running;
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  function calculateTime() {
    timePassed += 1;
    timeRemaining = timerLength - timePassed;
    return formatTime(timeRemaining);
  }

  function startTimer() {
    if (timeRemaining === 0) {
      return;
    }
    if (timeOutId === null && typeof startCallback !== 'undefined') {
      startCallback();
    }

    timeOutId = setTimeout(countdownLoop, 0);
    running = true;
    lastTime = Date.now();
  }

  function resetTimer() {
    timeRemaining = timerLength;
    timeOutId = null;
    lastTime = null;
    timePassed = 0;
  }

  function stopTimer() {
    clearTimeout(timeOutId);
    running = false;
  }

  function countdownLoop() {
    const thisTime = Date.now();
    const deltaTime = thisTime - lastTime;
    const delay = Math.max(1000 - deltaTime, 0);

    timeOutId = setTimeout(countdownLoop, delay);
    lastTime = thisTime + delay;

    renderCallBack(calculateTime());
    if (timeRemaining === 0) {
      stopTimer();
      if (typeof startCallback !== 'undefined') {
        endCallback();
      }
    }
  }
  return {
    isRunning,
    getTimerLength,
    setTimerLength,
    startTimer,
    resetTimer,
    stopTimer,
  };
}
