// Get the UI elements
const apiKeyInput = document.getElementById('apiKey');

// Load the saved API key from local storage, if available
chrome.storage.local.get(['apiKey'], result => {
  if (result.apiKey) {
    apiKeyInput.value = result.apiKey;
  }
});

// Add an event listener to the form to prevent it from submitting
const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();
  chrome.storage.local.set({ apiKey: apiKeyInput.value });
});
