// Listen for messages from the background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.isEnabled !== undefined) {
        if (request.isEnabled) {
            // Enable URL hiding
            hideSpecificURLs();
        } else {
            // Disable URL hiding
            showAllURLs();
        }
    }
});

// Function to hide specific URLs
function hideSpecificURLs() {
    const results = document.querySelectorAll('.g'); // Assuming search results are in class "g"

    // Replace specific URLs you want to hide with an empty string
    results.forEach(function(result) {
        const link = result.querySelector('a');
        if (link) {
            const url = link.href;
            
            // Add conditions to identify and hide specific URLs
            if (shouldHideURL(url)) {
                result.style.display = 'none';
            }
        }
    });
}

// Function to show all URLs
function showAllURLs() {
    const results = document.querySelectorAll('.g');

    results.forEach(function(result) {
        result.style.display = 'block'; // Display all results
    });
}

// Define conditions to identify specific URLs to hide
function shouldHideURL(url) {
    // Add your conditions here to specify which URLs to hide
    // For example, you can check for keywords, domains, or other criteria
    // Example: return url.includes('example.com');
    return false;
}
