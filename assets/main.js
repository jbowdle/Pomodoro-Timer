// TODO: 
const settingsBtn = document.querySelector("#settings-btn");
const settings = document.querySelector("#settings");
const closeSettings = document.querySelectorAll(".close-settings");
const timer = document.querySelector("#timer");
const skipBack = document.querySelector("#skip-back");
const startStop = document.querySelector("#start-stop");
const skipForward = document.querySelector("#skip-forward");
const controls = document.querySelector("#controls");
const begin = document.querySelector("#begin");
const pomoSelect = document.querySelector("#pomo-select");
const shortSelect = document.querySelector("#short-select");
const longSelect = document.querySelector("#long-select");
const skipBackImg = document.querySelector("#skip-back-img");
const startStopImg = document.querySelector("#start-stop-img");
const skipForwardImg = document.querySelector("#skip-forward-img");

// Variables are used to store what each cycle's time is
let pomoMinutes = pomoSelect.value.slice(0, pomoSelect.value.indexOf(":"));
let pomoSeconds = 00; 
let shortMinutes = shortSelect.value.slice(0, shortSelect.value.indexOf(":"));
let shortSeconds = 00;
let longMinutes = longSelect.value.slice(0, longSelect.value.indexOf(":"));
let longSeconds = 00;

// These hold the current value for the timer
let minutes = 25;
let seconds = 00;

// Tracks the cycle
// Even numbers = pomodoro, 1 3 and 5 = short break, 7 = long break
// countdown function updates this variable and rolls it over after 7
let currentCycle = 0;

// For some reason, the following commented code block doesn't work because it uses a function with parameters in an addEventListener.
// pomoMinutes is changed locally, but that change isn't reflected globally?
// https://teamtreehouse.com/community/problem-updating-a-global-variable-using-event-listeners-functions
// look into: * prototype.bind   * currying functions

// const selectChange = function(selectType, minuteType, secondType) {
//     minuteType = selectType.value.slice(0, selectType.value.indexOf(":"));
//     secondType = 00;
// }
// pomoSelect.addEventListener("change", function(){selectChange(pomoSelect, pomoMinutes, pomoSeconds)});

pomoSelect.addEventListener("change", function() {
    pomoMinutes = pomoSelect.value.slice(0, pomoSelect.value.indexOf(":"));
    pomoSeconds = 00;    
});

shortSelect.addEventListener("change", function() {
    shortMinutes = shortSelect.value.slice(0, shortSelect.value.indexOf(":"));
    shortSeconds = 00;    
});

longSelect.addEventListener("change", function() {
    longMinutes = longSelect.value.slice(0, longSelect.value.indexOf(":"));
    longSeconds = 00;    
});

// debug function
const debugFunc = function() {
    console.log(pomoMinutes);
    console.log(shortMinutes);
    console.log(longMinutes);
}

timer.textContent = `${minutes}:0${seconds}`;

// Opens settings
settingsBtn.addEventListener(
    'click',
    (e) => {settings.style.display = "grid";}
)

// Closes settings by clicking outside of the window
const closeSettingsEvent = function() {
    for (let i = 0; i < closeSettings.length; i++) {
        closeSettings[i].addEventListener(
            "click",
            (e) => settings.style.display = "none"
        )
    }
}

closeSettingsEvent();

const updateTimer = function() {
    // Updates the timer paragraph, ensures that it looks proper
    if ((seconds < 10) && (minutes > 10)) {
        timer.textContent =  `${minutes}:0${seconds}`;
    } else if ((seconds < 10) && (minutes < 10)) {
        timer.textContent =  `0${minutes}:0${seconds}`;
    } else if ((seconds >= 10) && (minutes < 10)) {
        timer.textContent =  `0${minutes}:${seconds}`;
    } else {
        timer.textContent =  `${minutes}:${seconds}`;
    }
}

let isTimerActive = false;
let skipForwardActive = false;
let skipBackActive = false;

// Updates minutes based on the current cycle
const cycleTracker = function() {
    if ((currentCycle % 2) === 0) {
        minutes = pomoMinutes;
        seconds = pomoSeconds;
    } else if ((currentCycle === 1) ||
        (currentCycle === 3) ||
        (currentCycle === 5)) {
        minutes = shortMinutes;
        seconds = shortSeconds;
    } else {
        minutes = longMinutes;
        seconds = longSeconds;
    }
}

function countdown() {
    timerInterval = setInterval(function() {
        // Rollover minutes once seconds hit zero
        if (seconds === 0) {
            minutes--;
            seconds = 60;
        }  
        // Reduce seconds by one every interval
        seconds--;
        // This is on a separat, shorter interval to avoid a lagging effect
        stopTimer = setInterval (function() {
            if (isTimerActive === false) {
                clearInterval(timerInterval);
            }   

            if (skipForwardActive) {
                clearInterval(timerInterval);
                skipForwardActive = false;
                isTimerActive = false;
                startStopImg.setAttribute("src", "./assets/icons/play.png");
                 if (currentCycle < 7) {
                    currentCycle++;
                } else {
                    currentCycle = 0;
                }
                cycleTracker();
            }

            if (skipBackActive) {
                clearInterval(timerInterval);
                skipBackActive = false;
                isTimerActive = false;
                startStopImg.setAttribute("src", "./assets/icons/play.png");
                 if (currentCycle === 0) {
                    currentCycle = 7
                } else {
                    currentCycle--;
                }
                cycleTracker();
            }

            updateTimer();
        }, 50);
        
        // Stops timer at 00:00, increases cycle by one, change minutes and seconds using cycleTracker and updateTimer
        if (minutes === 0 && seconds === 0) {
            clearInterval(timerInterval);
            isTimerActive = false;
            startStopImg.setAttribute("src", "./assets/icons/play.png");
            if (currentCycle < 7) {
                currentCycle++;
            } else {
                currentCycle = 0;
            }
            cycleTracker();
            updateTimer();
        }
    }, 1000);
}

const startTimer = function() {
    countdown();
    isTimerActive = true;
    begin.style.display = "none";
    skipBack.style.display = "inline";
    startStop.style.display = "inline";
    skipForward.style.display = "inline";
}

begin.addEventListener("click", startTimer);

startStop.addEventListener("click", function() {
    if (isTimerActive === false) {
        isTimerActive = true;
        countdown();
        startStopImg.setAttribute("src", "./assets/icons/pause.png");
    } else {
        isTimerActive = false;
        startStopImg.setAttribute("src", "./assets/icons/play.png");
    }
    // debug
    console.log(isTimerActive);
})

skipForward.addEventListener("click", function() {
    skipForwardActive = true;
})

skipBack.addEventListener("click", function() {
    skipBackActive = true;
})