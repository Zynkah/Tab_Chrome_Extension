// Listen for messages from the background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
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
  const results = document.querySelectorAll(".g"); // Assuming search results are in class "g"

  // Replace specific URLs you want to hide with an empty string
  results.forEach(function (result) {
    const link = result.querySelector("a");
    if (link) {
      const url = link.href;

      // Add conditions to identify and hide specific URLs
      if (shouldHideURL(url)) {
        result.style.display = "none";
      }
    }
  });
}

// Function to show all URLs
function showAllURLs() {
  const results = document.querySelectorAll(".g");

  results.forEach(function (result) {
    result.style.display = "block"; // Display all results
  });
}

function shouldHideURL(url) {
  // Get the list of all open tabs
  chrome.tabs.query({}, function (tabs) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return false; // Handle the error as needed
    }

    // Iterate through the open tabs and check if the URL matches any of them
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].url === url) {
        // If a matching URL is found in an open tab, return true to hide it
        return true;
      }
    }

    // If no matching URL is found, return false to not hide it
    return false;
  });
}
