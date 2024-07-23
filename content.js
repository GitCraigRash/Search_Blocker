chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  console.log('User typed: ' + text);
  const blockedKeywords = ["example", "test", "blocked"];
  const containsBlockedKeyword = blockedKeywords.some(keyword => text.toLowerCase().includes(keyword));

  if (containsBlockedKeyword) {
    chrome.omnibox.setDefaultSuggestion({
      description: "Search blocked due to prohibited content."
    });
  } else {
    chrome.omnibox.setDefaultSuggestion({
      description: "Search allowed: " + text
    });
  }
});

chrome.omnibox.onInputEntered.addListener((text) => {
  const blockedKeywords = ["example", "test", "blocked"];
  const containsBlockedKeyword = blockedKeywords.some(keyword => text.toLowerCase().includes(keyword));

  if (containsBlockedKeyword) {
    alert("Your search contains blocked keywords and has been prevented.");
  } else {
    // Perform the search or redirect
    chrome.tabs.update({ url: "https://www.google.com/search?q=" + encodeURIComponent(text) });
  }
});
