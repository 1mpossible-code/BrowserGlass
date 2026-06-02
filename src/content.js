console.log("[BrowserGlass] content script loaded");
const script = document.createElement("script");
script.src = chrome.runtime.getURL("src/injected.js")

window.addEventListener("message", (event) => {
    if (event.source != window) return;
    if (event.data?.source != "BrowserGlass") return;

    console.log("[BrowserGlass] page event:", event.data);
    chrome.runtime.sendMessage({
        type: "page_event",
        payload: event.data
    });
})


