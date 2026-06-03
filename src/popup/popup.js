const status = document.getElementById("status");

const getActiveTab = async () => {
  const tabs = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  return tabs[0];
};

const getEventsForTab = async (tabId) => {
  return await chrome.runtime.sendMessage({
    type: "get_events_for_tab",
    tabId,
  });
};

const renderStatus = (events) => {
  const cpuEvent = events.find(
    (event) => event.api === "navigator.hardwareConcurrency"
  );

  status.textContent = cpuEvent
    ? "CPU core count read"
    : "No browser inspection detected yet.";
};

const init = async () => {
  const tab = await getActiveTab();

  if (!tab?.id) {
    renderStatus([]);
    return;
  }

  const response = await getEventsForTab(tab.id);
  renderStatus(response?.events || []);
};

init();
