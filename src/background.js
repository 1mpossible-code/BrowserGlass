chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.type != "page_event") return;

    console.log("[BrowserGlass] background received:", {
        tabId: sender.tab?.id,
        url: sender.tab?.url,
        payload: message.payload
    })
})
