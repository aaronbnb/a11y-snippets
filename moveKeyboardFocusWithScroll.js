document.addEventListener('DOMContentLoaded', function () {
    // Listen for clicks on the document
    document.addEventListener('click', function (e) {
        // Check if the clicked element is a link and if it has a hash (in-page link)
        if (e.target.tagName === 'A' && e.target.hash) {
            const targetId = e.target.hash; // Get the hash value which includes the '#'
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Prevent the default action
                e.preventDefault();
                // Scroll to the target element
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Set focus to the target element
                targetElement.focus();
            }
        }
    });
});
