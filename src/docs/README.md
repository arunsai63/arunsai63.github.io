# ArunOS Documentation

> Last updated: 2026-04-08

## Overview

ArunOS is a multi-OS portfolio website that simulates three operating systems: macOS (desktop), Android (mobile), and iPadOS (tablet). Each OS is a completely separate experience with its own UI shell, styling, and interaction patterns. They share a common data layer and app content.

## Tech Stack

- **Build:** Vite 6.x
- **Language:** Vanilla JavaScript (ES modules, zero frameworks)
- **Styling:** Plain CSS per OS (no CSS-in-JS, no Tailwind)
- **Real-time:** Firebase (Realtime Database + Anonymous Auth)
- **Deploy:** GitHub Pages via `gh-pages`

## Quick Start

```bash
npm install
npm run dev     # Start dev server
npm run build   # Production build
npm run deploy  # Deploy to GitHub Pages
```

Visit `?os=android` or `?os=ipados` to force a specific OS.

## Architecture

```
Browser → main.js → detectOS() → dynamic import
                                     ├── macos/main-macos.js
                                     ├── android/main-android.js
                                     └── ipados/main-ipados.js
```

Each OS module is self-contained and code-split by Vite. A mobile visitor only downloads the Android bundle.

## Directory Structure

```
src/
  main.js                    # OS router
  shared/                    # Shared across all OSes
    data.js                  # Portfolio content (single source of truth)
    icons.js                 # SVG icon library
    os-detect.js             # Device detection + OS preference
    os-switcher.js           # Restart-into transition UI
    app-manifest.js          # Per-OS app availability registry
    gestures.js              # Touch gesture recognizer
  apps/                      # App content modules (OS-agnostic)
  multiplayer/               # Firebase cursors + chat
  macos/                     # macOS desktop experience
  android/                   # Android mobile experience
  ipados/                    # iPadOS tablet experience
  styles/reset.css           # Global CSS reset
```

## Documentation Index

### Architecture
- [Architecture Overview](architecture.md) — Data flow, module dependencies, design decisions
- [OS Switcher](os-switcher.md) — Detection logic, switching mechanism, transitions

### Per-OS Guides
- [macOS](os/macos.md) — Dock, taskbar, window manager, widgets
- [Android](os/android.md) — Status bar, home screen, activities, notification shade
- [iPadOS](os/ipados.md) — Dock, Stage Manager, Control Center, split view

### How-To Guides
- [Adding an App](guides/adding-an-app.md) — Step-by-step for all OSes
- [Adding a Widget](guides/adding-a-widget.md) — Per-OS widget creation
- [Boot Sequence](guides/boot-sequence.md) — Per-OS boot customization
- [Styling Guide](guides/styling-guide.md) — Colors, typography, animations per OS
