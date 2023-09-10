document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the current extension state from storage
    chrome.storage.sync.get('isEnabled', function(data) {
        const isEnabled = data.isEnabled;

        // Update the toggle switch based on the stored state
        const toggleSwitch = document.getElementById('toggleSwitch');
        toggleSwitch.checked = isEnabled;

        // Add an event listener to handle toggle switch changes
        toggleSwitch.addEventListener('change', function() {
            const newIsEnabled = toggleSwitch.checked;

            // Save the new state to storage
            chrome.storage.sync.set({ 'isEnabled': newIsEnabled }, function() {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                } else {
                    // Notify the background script about the state change
                    chrome.runtime.sendMessage({ toggleExtension: newIsEnabled });
                }
            });
        });
    });
});
