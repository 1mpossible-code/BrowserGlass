const eventsByTab = new Map();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "page_event") {
    const tabId = sender.tab?.id;
    if (typeof tabId !== "number") return;

    const existing = eventsByTab.get(tabId) || [];

    eventsByTab.set(tabId, [message.payload, ...existing].slice(0, 100));
    return;
  }

  if (message.type === "get_events_for_tab") {
    const tabId = message.tabId;
    sendResponse({
      events: eventsByTab.get(tabId) || [],
    });
  }
});
