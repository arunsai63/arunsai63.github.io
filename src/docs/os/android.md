# Android OS Architecture

> Last updated: 2026-04-08 | Design target: Android 14 / Material You

## Overview

The Android experience simulates a hyper-realistic Android 14 phone with Material You design system. Apps run as full-screen activities. Gesture navigation via a bottom pill.

## Component Breakdown

| Component | File | Purpose |
|-----------|------|---------|
| Entry point | `android/main-android.js` | Orchestrates boot + shell rendering |
| Boot animation | `android/boot/boot-android.js` | Logo + spinner, tap to skip |
| Status bar | `android/os/status-bar.js` | Clock, wifi, signal, battery (24px) |
| Navigation bar | `android/os/navigation-bar.js` | Gesture pill, swipe up = home |
| Lock screen | `android/os/lock-screen.js` | Two-line clock, notifications, swipe up |
| Home screen | `android/os/home-screen.js` | 4x5 app grid, search bar, page dots |
| Activity manager | `android/os/activity-manager.js` | Full-screen app container + back stack |
| Notification shade | `android/os/notification-shade.js` | Quick settings + notification cards |
| App drawer | `android/os/app-drawer.js` | Alphabetical app list, search |

## Boot Sequence

1. Black screen (300ms)
2. "ArunOS" logo + circular spinner
3. Subtitle: "Powered by mass caffeine"
4. Lock screen (swipe up to unlock)
5. Home screen

## App Lifecycle

```
Home screen → tap icon → openActivity(appId)
  → create full-screen activity element
  → load app module → renderContent(container)
  → push to activity stack
  
Back gesture → closeActivity()
  → pop from stack
  → show previous activity or home screen
```

## OS Switcher Access

- Notification shade → Power/Restart quick setting tile
- Settings app → About Phone → Restart Into...

## Android-Only Apps

- **Phone** (`android/apps/phone.js`) — Dialer with call log
- **Play Store** (`android/apps/play-store.js`) — App store parody
- **Assistant** (`android/apps/assistant.js`) — Google Assistant replica

## Material You Design Tokens

```css
--md-primary: #80cbc4
--md-surface: #1c1b1f
--md-surface-container-high: #2b292d
--md-on-surface: #e6e1e5
--md-corner-lg: 16px
--md-corner-xl: 28px
--md-corner-full: 9999px
```

## Key Files

- `src/android/main-android.js` — Entry point
- `src/android/styles/android.css` — Complete Material You CSS
- `src/android/os/activity-manager.js` — App container system

## Related Docs

- [macOS](macos.md)
- [iPadOS](ipados.md)
- [Adding an App](../guides/adding-an-app.md)
