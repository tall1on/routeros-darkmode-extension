[![Version](https://img.shields.io/badge/version-7.20.3-blue)](https://github.com/tall1on/routeros-darkmode-extension/releases/tag/v7.20.2)
![Early Access](https://img.shields.io/badge/status-early%20access-orange)
![GitHub all releases](https://img.shields.io/github/downloads/tall1on/routeros-darkmode-extension/total.svg)
![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-coming%20soon-yellow)
![RouterOS](https://img.shields.io/badge/RouterOS-7.20.2-green)
# Mikrotik RouterOS Dark Mode Extension

![Screenshot](./github/screenshot-7.20.1.png)

Chrome extension that applies a dark theme to the MikroTik RouterOS (WebFig) web interface.

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm (bundled with Node.js)

## Installation

```bash
npm install
```

## Available Scripts

- `npm run clean` – Remove build artifacts (`dist/` and `.rollup.cache/`).
- `npm run build` – Produce production bundles for content script, background worker, styles, and copy static assets to `dist/`.
- `npm run watch` – Watch source files and rebuild on change.

All build artifacts are emitted to the `dist/` directory.

## License

See [`LICENSE`](LICENSE) for details.
