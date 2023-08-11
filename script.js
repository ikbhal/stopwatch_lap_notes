$(document).ready(function() {
  const startBtn = $('#startBtn');
  const pauseBtn = $('#pauseBtn');
  const resumeBtn = $('#resumeBtn');
  const resetBtn = $('#resetBtn');
  const lapBtn = $('#lapBtn');
  const timeDisplay = $('#timeDisplay');
  const lapTable = $('#lapTable');
  let startTime;
  let interval;
  let lapNumber = 1;

  startBtn.click(startTimer);
  pauseBtn.click(pauseTimer);
  resumeBtn.click(resumeTimer);
  resetBtn.click(resetTimer);
  lapBtn.click(lapTimer);

  function startTimer() {
    startTime = Date.now() - (startTime ? startTime : 0);
    interval = setInterval(updateTime, 10);
    startBtn.prop('disabled', true);
    pauseBtn.prop('disabled', false);
  }

  function pauseTimer() {
    clearInterval(interval);
    startBtn.prop('disabled', true);
    pauseBtn.prop('disabled', true);
    resumeBtn.prop('disabled', false);
  }

  function resumeTimer() {
    interval = setInterval(updateTime, 10);
    startBtn.prop('disabled', true);
    pauseBtn.prop('disabled', false);
    resumeBtn.prop('disabled', true);
  }

  function resetTimer() {
    clearInterval(interval);
    startTime = undefined;
    lapNumber = 1;
    timeDisplay.html('00:00:00');
    lapTable.html('');
    startBtn.prop('disabled', false);
    pauseBtn.prop('disabled', true);
    resumeBtn.prop('disabled', true);
  }

  function lapTimer() {
    const lapTime = calculateTime();
    const newRow = $('<div>').addClass('lap-row').html(`Lap ${lapNumber}: <span class="lap-time">${lapTime}</span>`);
    lapTable.append(newRow);
    lapNumber++;
  }

  function updateTime() {
    const time = calculateTime();
    timeDisplay.html(time);
  }

  function calculateTime() {
    const currentTime = Date.now() - startTime;
    const milliseconds = Math.floor((currentTime % 1000) / 10);
    const seconds = Math.floor((currentTime / 1000) % 60);
    const minutes = Math.floor((currentTime / 1000 / 60) % 60);
    const hours = Math.floor(currentTime / 1000 / 60 / 60);

    return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)} <span class="milliseconds">${formatTime(milliseconds)}</span>`;
  }

  function formatTime(time) {
    return time.toString().padStart(2, '0');
  }
});
