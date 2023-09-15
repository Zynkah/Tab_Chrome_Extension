// Initialize the extension state. You can set it to true or false based on your default preference.
let isEnabled = false;

// Listen for messages from the popup.js and content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Check if the message is from the popup to toggle the extension state
  if (request.toggleExtension !== undefined) {
    isEnabled = request.toggleExtension;

    // Send the new state to content scripts
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        const tabId = tabs[0].id;
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          function: setExtensionState,
          args: [isEnabled],
        });
      }
    });
  }
});

// A function to send the current extension state to content scripts
function setExtensionState(isEnabled) {
  chrome.runtime.sendMessage({ isEnabled: isEnabled });
}

// Initialize the context menu item to reset the extension state
chrome.contextMenus.create({
  id: "resetExtension",
  title: "Reset Extension",
  contexts: ["browser_action"],
});

// Add a click event listener to the context menu item
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "myContextMenuId") {
    console.log("Clicked on menu item in tab: " + tab.url);
  }
  if (info.menuItemId === "resetExtension") {
    isEnabled = false; // Reset the extension state
    chrome.storage.sync.set({ isEnabled: isEnabled });
    chrome.runtime.sendMessage({ isEnabled: isEnabled }); // Notify content scripts

    // Update the popup's toggle switch
    chrome.runtime.sendMessage({ updatePopup: isEnabled });
  }
});
