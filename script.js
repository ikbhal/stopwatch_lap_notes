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
  let previousLapTime = 0; // Track the time of the previous lap

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
    previousLapTime = 0;
    timeDisplay.html('00:00:00');
    lapTable.html('');
    startBtn.prop('disabled', false);
    pauseBtn.prop('disabled', true);
    resumeBtn.prop('disabled', true);
  }

  function lapTimer() {
    const lapTime = calculateTime();
    const totalLapTime = lapNumber === 1 ? lapTime : calculateTotalLapTime(previousLapTime);
    const newRow = $('<div>').addClass('lap-row').html(`Lap ${lapNumber}: <span class="lap-time">${lapTime}</span> (Total: ${totalLapTime})`);
    lapTable.append(newRow);
    previousLapTime = lapTime;
    lapNumber++;
  }

  function calculateTime() {
    return Date.now() - startTime;
  }

  function calculateTotalLapTime(previousLapTime) {
    const currentLapTime = calculateTime();
    const totalTime = currentLapTime + previousLapTime;
    return formatTime(totalTime);
  }

  function updateTime() {
    const time = calculateTime();
    timeDisplay.html(formatTime(time));
  }

  function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor(time / 1000 / 60 / 60);

    return `${formatTimeSegment(hours)}:${formatTimeSegment(minutes)}:${formatTimeSegment(seconds)} <span class="milliseconds">${formatTimeSegment(milliseconds)}</span>`;
  }

  function formatTimeSegment(segment) {
    return segment.toString().padStart(2, '0');
  }
});
