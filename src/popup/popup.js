const domain = document.getElementById("domain");

async function showCurrentDomain() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab?.url ? new URL(tab.url) : null;

  domain.textContent = url?.hostname ?? "No domain";
}

showCurrentDomain();
