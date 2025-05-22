const form = document.getElementById('logForm');
const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const logsList = document.getElementById('logsList');
const streakDisplay = document.getElementById('streak');

function getLogs() {
  return JSON.parse(localStorage.getItem('logs') || '[]');
}

function saveLogs(logs) {
  localStorage.setItem('logs', JSON.stringify(logs));
}

function calculateStreak(logs) {
  let today = new Date().toISOString().slice(0, 10);
  let streak = 0;
  for (let i = logs.length - 1; i >= 0; i--) {
    const date = logs[i].date;
    const expected = new Date();
    expected.setDate(expected.getDate() - streak);
    if (date === expected.toISOString().slice(0, 10)) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function renderLogs() {
  logsList.innerHTML = '';
  const logs = getLogs();
  logs.forEach(log => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${log.title}</strong><br>${log.description}<br><small>${log.date}</small>`;
    logsList.appendChild(li);
  });
  streakDisplay.textContent = calculateStreak(logs);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const logs = getLogs();
  logs.push({
    title: titleInput.value,
    description: descInput.value,
    date: new Date().toISOString().slice(0, 10)
  });
  saveLogs(logs);
  renderLogs();
  titleInput.value = '';
  descInput.value = '';
});

window.onload = renderLogs;