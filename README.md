# BrowserGlass

BrowserGlass is a small Chrome extension that shows when a website reads browser fingerprinting signals from the page.

The first detector in this build instruments `navigator.hardwareConcurrency`, records when the page asks for the device CPU core count, and surfaces the event in the extension popup.

## Why it exists

Many fingerprinting and anti-bot scripts collect browser/device attributes without making that behavior visible to users. BrowserGlass is a lightweight proof-of-concept for making those reads observable from a browser extension.

## Features

- Manifest V3 Chrome extension
- Injected page-context script for observing browser API access
- Content-script bridge that forwards page events to the extension runtime
- Background service worker that stores recent events per tab
- Popup UI that reports whether the active page inspected a tracked API

## How it works

```text
page script reads browser API
        ↓
injected BrowserGlass hook emits an event
        ↓
content script validates and forwards it
        ↓
background worker stores events by tab
        ↓
popup renders the active tab status
```

The extension currently tracks:

| API | Signal | Risk |
| --- | --- | --- |
| `navigator.hardwareConcurrency` | CPU core count read | Medium |

## Install locally

1. Open Chrome or a Chromium-based browser.
2. Navigate to `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select this repository directory.
6. Visit a site and open the BrowserGlass extension popup.

## Project structure

```text
manifest.json              # Manifest V3 extension config
src/background.js          # Per-tab event storage
src/content.js             # Page-to-extension event bridge
src/inject.js              # Browser API instrumentation
src/popup/popup.html       # Popup shell
src/popup/popup.js         # Popup status rendering
```

## Roadmap

- Track more high-signal fingerprinting APIs, such as canvas, WebGL, audio, fonts, and screen metrics
- Show a timeline of events instead of a single status message
- Add severity grouping and per-domain summaries
- Add automated extension tests

## Status

Prototype. The architecture is intentionally small so new browser API detectors can be added quickly.
