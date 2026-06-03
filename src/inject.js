const emitBrowserGlassEvent = (event) => {
  window.postMessage(
    {
      source: "BrowserGlass",
      timestamp: Date.now(),
      ...event,
    },
    "*"
  );
};

if (!window.__BROWSERGLASS_PATCHES__) {
  window.__BROWSERGLASS_PATCHES__ = {};
}

if (!window.__BROWSERGLASS_PATCHES__.hardwareConcurrency) {
  window.__BROWSERGLASS_PATCHES__.hardwareConcurrency = true;

  const descriptor = Object.getOwnPropertyDescriptor(
    Navigator.prototype,
    "hardwareConcurrency"
  );

  if (descriptor && typeof descriptor.get === "function") {
    Object.defineProperty(Navigator.prototype, "hardwareConcurrency", {
      get() {
        emitBrowserGlassEvent({
          type: "fingerprint_signal",
          api: "navigator.hardwareConcurrency",
          label: "CPU core count read",
          risk: "medium",
        });

        return descriptor.get.call(this);
      },
      configurable: true,
    });
  }
}
