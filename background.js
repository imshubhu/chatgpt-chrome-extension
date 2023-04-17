chrome.runtime.onInstalled.addListener(() => {
    // Set the default API key in local storage
    chrome.storage.local.set({ apiKey: '' });
  });
  