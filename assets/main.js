const settingsBtn = document.querySelector("#settings-btn");
const settings = document.querySelector("#settings");
const closeSettings = document.querySelectorAll(".close-settings");

console.log(closeSettings);

settingsBtn.addEventListener(
    'click',
    (e) => {settings.style.display = "grid";}
)

const closeSettingsEvent = function() {
    for (let i = 0; i < closeSettings.length; i++) {
        closeSettings[i].addEventListener(
            "click",
            (e) => settings.style.display = "none"
        )
    }
}

closeSettingsEvent();