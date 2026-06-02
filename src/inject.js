console.log("[BrowserGlass] injected script loaded");
if (!window.__BROWSERGLASS_INJECTED__) {
    window.__BROWSERGLASS_INJECTED__ = true;

    window.postMessage({
        source: "BrowserGlass",
        type: "injected_ready",
        timestamp: Date.now()
    }, "*")
}
