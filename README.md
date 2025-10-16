<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Edplore Sales Catalogue

This project now runs as a single Expo application, so the same codebase powers mobile devices (via Expo Go or native builds) and the web. The UI has been rebuilt with React Native primitives so it renders consistently across platforms without relying on an Android-specific WebView wrapper.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- The Expo Go application on an Android or iOS device (optional, for live mobile previews)

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run start
```

When the Expo CLI starts you can:

- Press **w** to launch the web version in your browser.
- Use the Expo Go app to scan the QR code and open the catalogue on a mobile device.

### Direct web preview

If you only need the browser build you can run:

```bash
npm run web
```

Expo uses the same Metro bundler for every platform, so no additional asset sync steps are required.
