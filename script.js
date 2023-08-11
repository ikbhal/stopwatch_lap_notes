const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const timeDisplay = document.getElementById('timeDisplay');
const lapTable = document.getElementById('lapTable');
let startTime;
let interval;
let lapNumber = 1;

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);

function startTimer() {
  startTime = Date.now() - (startTime ? startTime : 0);
  interval = setInterval(updateTime, 10);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopTimer() {
  clearInterval(interval);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function resetTimer() {
  clearInterval(interval);
  startTime = undefined;
  lapNumber = 1;
  timeDisplay.textContent = '00:00:00';
  lapTable.innerHTML = '';
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function lapTimer() {
  const lapTime = calculateTime();
  const newRow = document.createElement('div');
  newRow.classList.add('lap-row');
  newRow.innerHTML = `Lap ${lapNumber}: <span class="lap-time">${lapTime}</span>`;
  lapTable.appendChild(newRow);
  lapNumber++;
}

function updateTime() {
  const time = calculateTime();
  timeDisplay.innerHTML = time;
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
