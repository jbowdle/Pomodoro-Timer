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
const boxes = document.querySelectorAll(".box");

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

const updateTimer = function() {
    // Updates the timer paragraph, ensures that it looks proper
    if ((seconds < 10) && (minutes >= 10)) {
        timer.textContent =  `${minutes}:0${seconds}`;
    } else if ((seconds < 10) && (minutes < 10)) {
        timer.textContent =  `0${minutes}:0${seconds}`;
    } else if ((seconds >= 10) && (minutes < 10)) {
        timer.textContent =  `0${minutes}:${seconds}`;
    } else {
        timer.textContent =  `${minutes}:${seconds}`;
    }
}

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

    // Adds highlight class to current section in progress bar, removes highlight from
    // previous box
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i]
        if (currentCycle === i) {
            // TODO: implement this without nested if statements
            if ((currentCycle % 2) === 0) {
                box.classList.add("pomo");
            } else if ((currentCycle === 1) ||
                (currentCycle === 3) ||
                (currentCycle === 5)) {
                box.classList.add("short");
            } else {
                box.classList.add("long");
            }
        } else if (box.classList.contains("pomo")) {
            box.classList.remove("pomo");
        } else if (box.classList.contains("short")) {
            box.classList.remove("short");
        } else if (box.classList.contains("long")) {
            box.classList.remove("long");
        }
    }
}

// is-active variables are used by the countdown function to make the controls functional
let isTimerActive = false;
let skipForwardActive = false;
let skipBackActive = false;

// This function runs the timer
function countdown() {
    timerInterval = setInterval(function() {
        // Rollover minutes once seconds hit zero
        if (seconds === 0) {
            minutes--;
            seconds = 60;
        }  
        // Reduce seconds by one every interval
        seconds--;

        // This interval watches for changes in the is-active variables and makes the controls functional.
        // It is on a separate, shorter interval to avoid a laggy effect.
        stopTimer = setInterval (function() {
            if (isTimerActive === false) {
                clearInterval(timerInterval);
            }   

            // Skips forward one cycle and resets the is-active variables
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

            // Skips back one cycle and resets the is-active variables
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

// When the begin button is clicked, this starts the timer, highlights the cycle in the progress bar, removes the begin button, and sets up the timer controls.
const startTimer = function() {
    cycleTracker();
    countdown();
    isTimerActive = true;
    begin.style.display = "none";
    skipBack.style.display = "inline";
    startStop.style.display = "inline";
    skipForward.style.display = "inline";
}

// This holds event listeners and statements to be used when the page loads.
const init = function() {
    timer.textContent = `${minutes}:0${seconds}`;

    // Opens settings
    settingsBtn.addEventListener(
        'click',
        (e) => {settings.style.display = "grid";}
    );

    // Closes settings by clicking outside of the window
    for (let i = 0; i < closeSettings.length; i++) {
        closeSettings[i].addEventListener(
            "click",
            (e) => settings.style.display = "none"
        )
    }

    // Next three listen for changes in the settings and update their cycle times accordingly
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

    // Starts the first cycle
    begin.addEventListener("click", startTimer);

    // Pauses current cycle
    startStop.addEventListener("click", function() {
        if (isTimerActive === false) {
            isTimerActive = true;
            countdown();
            startStopImg.setAttribute("src", "./assets/icons/pause.png");
        } else {
            isTimerActive = false;
            startStopImg.setAttribute("src", "./assets/icons/play.png");
        }
    });

    // Next two event listeners skip to the next or the previous cycle
    skipForward.addEventListener("click", function() {
        skipForwardActive = true;
    });

    skipBack.addEventListener("click", function() {
        skipBackActive = true;
    });
}

init();