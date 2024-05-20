function triggerButtonAction(button) {
    const events = ['mousedown', 'mouseup', 'click'];
    events.forEach(eventType => {
        const event = new MouseEvent(eventType, {
            bubbles: true,
            cancelable: true,
            view: window
        });
        button.dispatchEvent(event);
    });
}


//NETFLIX
function clickNetflixSkipIntroButton() {
    const skipIntroButton = document.querySelector('[data-uia="player-skip-intro"]');
    if (skipIntroButton) {
        triggerButtonAction(skipIntroButton);
    }
}

function clickNetflixSkipEpisodeButton() {
    const skipEpisodeButton = document.querySelector('[data-uia="next-episode-seamless-button"]');
    const skipEpisodeButton2 = document.querySelector('[data-uia="next-episode-seamless-button-draining"]');
    if (skipEpisodeButton) {
        triggerButtonAction(skipEpisodeButton);
    }
    else if(skipEpisodeButton2){
        triggerButtonAction(skipEpisodeButton2);
    }
}

//AMAZON
function clickAmazonSkipIntroButton() {
    const skipIntroAmazonButton = document.querySelector('.fqye4e3.f1ly7q5u.fk9c3ap.fz9ydgy.f1xrlb00.f1hy0e6n.fgbpje3.f1uteees.f1h2a8xb.atvwebplayersdk-skipelement-button.fjgzbz9.fiqc9rt.fg426ew.f1ekwadg');
    if (skipIntroAmazonButton) {
        triggerButtonAction(skipIntroAmazonButton);
    }
}

function clickAmazonEpisodeIntroButton() {
    const skipEpisodeAmazonButton = document.querySelector('.fuorrko.fjyb7y2');
    if (skipEpisodeAmazonButton) {
        triggerButtonAction(skipEpisodeAmazonButton);
    }
}

chrome.storage.local.get(['extensionEnabled'], function(result) {
    if (result.extensionEnabled) {
        setInterval(() => {
            if (window.location.hostname.includes('netflix.com')) {
                clickNetflixSkipIntroButton();
                clickNetflixSkipEpisodeButton();
            }
            else if(window.location.hostname.includes('primevideo.com')){
                clickAmazonSkipIntroButton();
                clickAmazonEpisodeIntroButton();
            }
            else if(window.location.hostname.includes('crunchyroll.com')){
                clickCrunchySkipIntroButton();
            }
        }, 1000);
    }
});
