const targetElements = document.querySelectorAll('ytd-rich-item-renderer');

function injectCount() {
    // const count = countRichItemRenderers();
    const countElement = document.createElement('p');
    countElement.textContent = `Number of rich item renderers: ${targetElements.length}`;
    countElement.style.fontSize = '16px';
    countElement.style.fontWeight = 'bold';
    countElement.style.color = '#ff0000';
    countElement.style.marginTop = '10px';

    const header = document.querySelector('ytd-rich-grid-renderer');
    
    if (header) {
        for (let index = 0; index < targetElements.length; index++) {
            let shaderElement = document.createElement('div');
            shaderElement.classList.add('blur-props');

            targetElements[index].style.position = 'relative';
            targetElements[index].style.opacity = .3;
            targetElements[index].insertAdjacentElement('afterbegin', shaderElement);
        }
        header.insertBefore(countElement, header.firstChild);
    } else {
        console.error('ytd-rich-grid-renderer element not found');
    }
}

function waitForElements(selector, injectCount) {
    const waitingTime = 10; 
    const injectInterval = setInterval(() => {
        if (document.querySelector(selector)) {
            clearInterval(injectInterval);
            injectCount();
        }
    }, waitingTime);
}

waitForElements('ytd-rich-grid-renderer', injectCount);
