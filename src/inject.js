console.log("[BrowserGlass] injected script loaded");
window.postMessage({
    source: "BrowserGlass",
    type: "injected_ready",
    timestamp: Date.now()
}, "*")
