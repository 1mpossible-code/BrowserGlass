const script = document.createElement("script");
script.src = chrome.runtime.getURL("src/inject.js");
script.onload = () => script.remove();
(document.documentElement || document.head).appendChild(script);

const isBrowserGlassEvent = (data) =>
  data &&
  data.source === "BrowserGlass" &&
  data.type === "fingerprint_signal" &&
  typeof data.timestamp === "number" &&
  typeof data.api === "string";

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (!isBrowserGlassEvent(event.data)) return;

  chrome.runtime.sendMessage({
    type: "page_event",
    payload: {
      ...event.data,
      page: {
        domain: location.hostname,
        url: location.href,
        title: document.title,
      },
    },
  });
});

