$(document).ready(function() {
  const startBtn = $('#startBtn');
  const pauseBtn = $('#pauseBtn');
  const resumeBtn = $('#resumeBtn');
  const resetBtn = $('#resetBtn');
  const lapBtn = $('#lapBtn');
  const timeDisplay = $('#timeDisplay');
  const lapTable = $('#lapTable');
  const noteInput = $('#noteInput'); // New note input
  let startTime;
  let interval;
  let lapNumber = 1;
  let previousLapTime = 0;
  let lapsData = []; // Store lap data

  startBtn.click(startTimer);
  pauseBtn.click(pauseTimer);
  resumeBtn.click(resumeTimer);
  resetBtn.click(resetTimer);
  lapBtn.click(lapTimer);

  loadLapsFromLocalStorage(); // Load saved laps on page load

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
    noteInput.val(''); // Reset note input
    startBtn.prop('disabled', false);
    pauseBtn.prop('disabled', true);
    resumeBtn.prop('disabled', true);
    lapsData = []; // Clear stored lap data
    saveLapsToLocalStorage(); // Save cleared laps
  }

  function lapTimer() {
    const lapTime = calculateTime();
    const totalLapTime = lapNumber === 1 ? lapTime : calculateTotalLapTime(previousLapTime);
    const note = noteInput.val(); // Get the note input
    const lapData = { lapNumber, lapTime, totalLapTime, note };
    lapsData.push(lapData); // Store lap data
    saveLapsToLocalStorage(); // Save updated laps
    const newRow = $('<div>').addClass('lap-row').html(`Lap ${lapNumber}: <span class="lap-time">${lapTime}</span> (Total: ${totalLapTime})<button class="note-btn">Note</button>`);
    lapTable.append(newRow);
    noteInput.val(''); // Reset note input
    previousLapTime = lapTime;
    lapNumber++;
  }

  lapTable.on('click', '.note-btn', function() {
    const lapIndex = $(this).closest('.lap-row').index();
    const note = prompt('Enter a note for this lap:', lapsData[lapIndex].note);
    if (note !== null) {
      lapsData[lapIndex].note = note;
      saveLapsToLocalStorage();
    }
  });

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

  function saveLapsToLocalStorage() {
    localStorage.setItem('lapsData', JSON.stringify(lapsData));
  }

  function loadLapsFromLocalStorage() {
    const storedLapsData = localStorage.getItem('lapsData');
    if (storedLapsData) {
      lapsData = JSON.parse(storedLapsData);
      lapNumber = lapsData.length + 1;
      for (const lapData of lapsData) {
        const newRow = $('<div>').addClass('lap-row').html(`Lap ${lapData.lapNumber}: <span class="lap-time">${lapData.lapTime}</span> (Total: ${lapData.totalLapTime})<button class="note-btn">Note</button>`);
        lapTable.append(newRow);
      }
    }
  }
});
