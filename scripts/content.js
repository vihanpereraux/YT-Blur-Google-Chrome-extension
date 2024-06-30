var isCountPrinted = false;
var isPageReloaded = false;

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
    // get all thumbnial wrappers
    let targetElements = document.querySelectorAll('ytd-rich-grid-row');
    // get the top news wrapper
    let topNewsWrapperElement = document.querySelectorAll('ytd-rich-shelf-renderer');
    // target /parent DOM element - YT home screen
    let header = document.querySelector('ytd-rich-grid-renderer');

    // test display prompt - item count
    displayTestPropmt(header, targetElements);

    let addBannerElement = document.querySelector('masthead-ad');
    if (addBannerElement) {
        addBannerElement.style.opacity = 0;
    }

    if (targetElements) {
        for (let index = 0; index < targetElements.length; index++) {
            // overlay element
            let thumbnailOverlayElement = document.createElement('div');
            thumbnailOverlayElement.classList.add('thumbnail-overlay-props');
            targetElements[index].style.position = 'relative';
            // injecting
            targetElements[index].insertAdjacentElement('afterbegin', thumbnailOverlayElement);
        }
    } else {
        console.error('ytd-rich-grid-renderer element not found');
    }

    if (topNewsWrapperElement) {
        // overlay element
        let topNewsOverlayElement = document.createElement('div');
        topNewsOverlayElement.classList.add('filter-chips-overlay-props');
        topNewsWrapperElement[0].style.position = 'relative';
        // injecting
        topNewsWrapperElement[0].insertAdjacentElement('afterbegin', topNewsOverlayElement)
    } else {
        console.error('ytd-rich-shelf-renderer element not found');
    }
}

function startFechingElements(selector, applyOverlayElements) {
    // wait till YT DOM fully loads
    const waitingTime = 50;

    // for the home page chips
    const injectTimeout = setTimeout(() => {
        const ytdFeedFilterElement = document.querySelectorAll('ytd-feed-filter-chip-bar-renderer');
        ytdFeedFilterElement[0].style.display = 'none';
    }, waitingTime);

    // for the home page thumbnails
    const injectInterval = setInterval(() => {
        if (document.querySelector(selector)) {
            clearInterval(injectInterval);
            applyOverlayElements();
        }
    }, waitingTime);
}
startFechingElements('ytd-rich-grid-renderer', applyOverlayElements);
