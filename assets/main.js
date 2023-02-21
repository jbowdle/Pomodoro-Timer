// TODO: add cycle tracker and adjust selectChange function based on which cycle the pomodoro is in
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

let pomoMinutes = pomoSelect.value.slice(0, pomoSelect.value.indexOf(":"));
let pomoSeconds = 00; 
let shortMinutes = shortSelect.value.slice(0, shortSelect.value.indexOf(":"));;
let shortSeconds = 00;
let longMinutes = longSelect.value.slice(0, longSelect.value.indexOf(":"));;
let longSeconds = 00;

let minutes = 25;
let seconds = 00;


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

function countdown() {
    playTimer = setInterval(function() {
        // Rollover minutes once seconds hit zero
        if (seconds === 0) {
             minutes--;
            seconds = 60;
        }  
        // Reduce seconds by one every interval
        seconds--;
            
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

        // Stops timer at 00:00
        if (minutes === 0 && seconds === 0) {
            clearInterval(playTimer);
        }
    }, 1000);
}

const startTimer = function() {
    countdown();
    begin.style.display = "none";
    skipBack.style.display = "inline";
    startStop.style.display = "inline";
    skipForward.style.display = "inline";
}

begin.addEventListener("click", startTimer);