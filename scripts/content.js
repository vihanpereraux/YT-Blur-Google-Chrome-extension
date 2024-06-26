// get all thumnial wrappers
const targetElements = document.querySelectorAll('ytd-rich-item-renderer');

function injectCount() {
    // target /parent DOM element - YT home screen
    const header = document.querySelector('ytd-rich-grid-renderer');

    // test display prompt - item count
    displayTestPropmt(header);

    if (header) {
        for (let index = 0; index < targetElements.length; index++) {
            // overlay element
            let shaderElement = document.createElement('div');
            // add stylings
            shaderElement.classList.add('blur-props');
            targetElements[index].style.position = 'relative';
            // injecting
            targetElements[index].insertAdjacentElement('afterbegin', shaderElement);
        }
    } else {
        console.error('ytd-rich-grid-renderer element not found');
    }
}

function displayTestPropmt(header) {
    const countElement = document.createElement('p');
    countElement.textContent = `Number of rich item renderers: ${targetElements.length}`;
    countElement.style.fontSize = '16px';
    countElement.style.fontWeight = 'bold';
    countElement.style.color = '#ff0000';
    countElement.style.marginTop = '10px';
    header.insertBefore(countElement, header.firstChild);
}
 
function waitForElements(selector, injectCount) {
    // wait till YT DOM fully loads
    const waitingTime = 10;
    const injectInterval = setInterval(() => {
        if (document.querySelector(selector)) {
            clearInterval(injectInterval);
            injectCount();
        }
    }, waitingTime);
}
waitForElements('ytd-rich-grid-renderer', injectCount);
