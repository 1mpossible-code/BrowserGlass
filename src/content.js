console.log("[BrowserGlass] content script loaded");
const script = document.createElement("script");
script.src = chrome.runtime.getURL("src/inject.js");
(document.documentElement || document.head).appendChild(script);
script.remove();

const isBrowserGlassEvent = (data) => data && data.source == "BrowserGlass" 
    && typeof data.type == "string" && typeof data.timestamp == "number";

window.addEventListener("message", (event) => {
    if (event.source != window) return;
    if (event.data?.source != "BrowserGlass") return;

    chrome.runtime.sendMessage({
        type: "page_event",
        payload: {
            ...event.data,
            page: {
                domain: location.hostname,
                url: location.href,
                title: document.title
            }
        }
    });
})


