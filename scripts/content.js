var isCountPrinted = false;

function displayTestPropmt(header, targetElements) {
    if (!isCountPrinted) {
        const countElement = document.createElement('p');
        countElement.textContent = `YT  Chrome Extension is enebaled and removed ${targetElements.length} elements !`;
        countElement.style.fontSize = '12px';
        countElement.style.fontWeight = 'medium';
        countElement.style.color = 'white';
        countElement.style.marginTop = '10px';
        header.insertBefore(countElement, header.firstChild);
    }
    isCountPrinted = true;
}

function applyOverlayElements() {
    // get all thumnial wrappers
    let targetElements = document.querySelectorAll('ytd-rich-grid-row');

    // target /parent DOM element - YT home screen
    let header = document.querySelector('ytd-rich-grid-renderer');

    // test display prompt - item count
    displayTestPropmt(header, targetElements);

    let addBannerElement = document.querySelector('masthead-ad');
    if (addBannerElement) {
        addBannerElement.style.opacity = 0;
    }

    if (header) {
        for (let index = 0; index < targetElements.length; index++) {
            // overlay element
            let thumbnailOverlayElement = document.createElement('div');
            // add stylings
            thumbnailOverlayElement.classList.add('thumbnail-overlay-props');
            targetElements[index].style.position = 'relative';
            // injecting
            targetElements[index].insertAdjacentElement('afterbegin', thumbnailOverlayElement);
        }
    } else {
        console.error('ytd-rich-grid-renderer element not found');
    }
}

function startFechingElements(selector, applyOverlayElements) {
    // wait till YT DOM fully loads
    const waitingTime = 200;

    const injectTimeout = setTimeout(() => {
        // overlay elements
        let filterChipsOverlayElement = document.createElement('div');
        // add stylings
        filterChipsOverlayElement.classList.add('filter-chips-overlay-props');

        // injecting the overlay
        const ytdFeedFilterElement = document.querySelectorAll('ytd-feed-filter-chip-bar-renderer');
        ytdFeedFilterElement[0].style.position = 'relative';
        ytdFeedFilterElement[0].style.opacity = .3;
        ytdFeedFilterElement[0].insertAdjacentElement('afterbegin', filterChipsOverlayElement)
    }, waitingTime);

    const injectInterval = setInterval(() => {
        if (document.querySelector(selector)) {
            // clearInterval(injectInterval);
            applyOverlayElements();
        }
    }, waitingTime);
}
startFechingElements('ytd-rich-grid-renderer', applyOverlayElements);
