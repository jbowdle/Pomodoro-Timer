const settingsBtn = document.querySelector("#settings-btn");
const settings = document.querySelector("#settings");
const closeSettings = document.querySelectorAll(".close-settings");
const timer = document.querySelector("#timer");

let minutes = 25;
let seconds = 00;

let buttonStatus = false;

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

// test value
buttonStatus = true;
const countdown = function() {
    if (buttonStatus) {
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
}

countdown();