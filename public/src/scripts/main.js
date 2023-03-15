// register service workers
var appInstaller;
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorkers.js')
    .then(function () {
      console.log('service worker registred');
    });
}

window.addEventListener('beforeinstallprompt', function (event) {
  event.preventDefault();
  appInstaller = event;
  return false;
});

let interval;
const startBtn = document.getElementById('btn-init');
const modeButtons = document.getElementById('mode-buttons');
modeButtons.addEventListener('click', handleMode);
document.addEventListener('DOMContentLoaded', () => {
  switchMode('pomodoro');
});

const timer = {
  pomodoro: 25,
  longBreak: 15,
  shortBreak: 5,
  longBreakInterval: 4,
  sessions: 0,
};

startBtn.addEventListener('click', () => {
  const { action } = startBtn.dataset;
  if (action === 'start') {
    startTimer();
  } else {
    stopTimer();
  }
});

function handleMode(event) {
  const { mode } = event.target.dataset;
  if (!mode) return;
  switchMode(mode);
  stopTimer();
}

function switchMode(mode) {
  timer.mode = mode;
  timer.remainingTime = {
    total: timer[mode] * 60,
    minutes: timer[mode],
    seconds: 0,
  };

  document
    .querySelectorAll('button[data-mode]')
    .forEach(e => e.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
  document.body.style.backgroundColor = `var(--${mode})`;

  updateClock();
}

// SET CLOCK INTERVAL

function startTimer() {
  let { total } = timer.remainingTime;
  const endTime = Date.parse(new Date()) + total * 1000;

  if (timer.mode === 'pomodoro') timer.sessions++;

  startBtn.dataset.action = 'stop';
  startBtn.textContent = 'parar';
  startBtn.classList.add('active');

  interval = setInterval(function () {
    timer.remainingTime = getRemainingTime(endTime);
    updateClock();

    total = timer.remainingTime.total;
    if (total <= 0) {
      clearInterval(interval);

      switch (timer.mode) {
        case 'pomodoro':
          if (timer.sessions % timer.longBreakInterval === 0) {
            switchMode('longBreak');
          } else {
            switchMode('shortBreak');
          }
          break;
        default:
          switchMode('pomodoro');
      }

      if (Notification.permission === 'granted') {
        const text =
          timer.mode === 'pomodoro' ? 'Foco total!' : 'Faça uma pausa!';
        new Notification(text);
        if (timer.mode === 'pomodoro') {
          var WORKSOUND = '/src/assets/sounds/worktime.mp3';
          new Audio(WORKSOUND).play();
        }
        if (timer.mode === '') {
          var WORKSOUND = '/src/assets/sounds/worktime.mp3';
          new Audio(WORKSOUND).play();
        }
      }

      startTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);

  startBtn.dataset.action = 'start';
  startBtn.textContent = 'iniciar';
  startBtn.classList.remove('active');
}

function updateClock() {
  const { remainingTime } = timer;
  const minutes = `${remainingTime.minutes}`.padStart(2, '0');
  const seconds = `${remainingTime.seconds}`.padStart(2, '0');

  const min = document.getElementById('minutes');
  const sec = document.getElementById('seconds');
  min.textContent = minutes;
  sec.textContent = seconds;

  const text =
    timer.mode === 'pomodoro' ? 'Foco total!' : 'Faça uma pausa!';
  document.title = `${minutes}:${seconds} — ${text}`;

}

function getRemainingTime(endTime) {
  const currentTime = Date.parse(new Date());
  const difference = endTime - currentTime;

  const total = Number.parseInt(difference / 1000, 10);
  const minutes = Number.parseInt((total / 60) % 60, 10);
  const seconds = Number.parseInt(total % 60, 10);

  return {
    total,
    minutes,
    seconds,
  };
}

document.addEventListener('DOMContentLoaded', () => {
  if ('Notification' in window) {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          new Notification(
            'Muito bem! Você será notificado ao inicio de cada sessão'
          );
        }
      });
    }
  }
  switchMode('pomodoro');
});