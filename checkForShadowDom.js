function hasShadowRoot(element) {
    return element.shadowRoot !== null && element.shadowRoot !== undefined;
}

// Function to recursively traverse the DOM and check for shadow roots
function findShadowDOMElements(node, shadowDOMElements) {
    if (node.nodeType === Node.ELEMENT_NODE) {
        if (hasShadowRoot(node)) {
            shadowDOMElements.push(node);
        }

        // Recursively check children
        for (let i = 0; i < node.childNodes.length; i++) {
            findShadowDOMElements(node.childNodes[i], shadowDOMElements);
        }
    }
}

// Entry point
function checkForShadowDOM() {
    const shadowDOMElements = [];
    findShadowDOMElements(document.body, shadowDOMElements);

    if (shadowDOMElements.length > 0) {
        return("The page contains instances of Shadow DOM. Elements with Shadow DOM:", shadowDOMElements);
    } else {
        return("The page does not contain any instances of Shadow DOM.");
    }
}

// Call the function to check for shadow DOM elements
checkForShadowDOM();
