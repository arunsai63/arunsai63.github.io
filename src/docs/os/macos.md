# macOS Architecture

> Last updated: 2026-04-08 | Design target: macOS-inspired desktop

## Overview

The macOS experience is the original ArunOS — a desktop with dock magnification, draggable/resizable windows, taskbar with start menu, desktop widgets, and a live canvas wallpaper.

## Component Breakdown

| Component | File | Purpose |
|-----------|------|---------|
| Entry point | `macos/main-macos.js` | Orchestrates 10-phase boot |
| Boot | `macos/boot/boot.js` | Terminal-style BIOS boot messages |
| Desktop | `macos/os/desktop.js` | Dock (11 icons), context menu |
| Window Manager | `macos/os/window-manager.js` | Draggable, resizable, focusable windows |
| Taskbar | `macos/os/taskbar.js` | Start menu, system tray, clock |
| Widgets | `macos/os/widgets.js` | 5 desktop widgets (uptime, music, weather, etc.) |
| Wallpaper | `macos/os/wallpaper.js` | Canvas aurora blob animation |
| Screensaver | `macos/os/screensaver.js` | "HIRE ME" bouncing DVD logo |
| Notifications | `macos/os/notifications.js` | Toast notifications |
| First Run | `macos/os/first-run.js` | Welcome wizard |
| Easter Eggs | `macos/os/easter-eggs.js` | Konami code, window count |

## Boot Sequence (10 Phases)

1. Terminal boot messages (BIOS style)
2. Render desktop + dock
3. Initialize canvas wallpaper
4. Render taskbar
5. Initialize desktop widgets
6. Firebase multiplayer (non-blocking)
7. Open About Me by default
8. Show first-run wizard
9. Start notification loop
10. Initialize screensaver + easter eggs

## Window Management

Apps call `createWindow()` from `macos/os/window-manager.js`:
- Draggable via titlebar
- Resizable via 5 handles (e, s, se, w, n)
- Minimize/maximize/close buttons (macOS traffic lights)
- Z-index stacking with focus management
- Min size: 300x200px

## Dock Magnification

Real macOS-style cosine interpolation:
- Base: 48px, Max: 72px, Range: 140px
- Smooth lerp animation via requestAnimationFrame
- Bounce animation on app launch

## OS Switcher Access

- Desktop right-click context menu → "Restart Into..."

## Key Files

- `src/macos/main-macos.js` — Entry point
- `src/macos/os/window-manager.js` — Window lifecycle
- `src/macos/os/desktop.js` — Dock + context menu
- `src/macos/styles/` — All macOS CSS

## Related Docs

- [Android](android.md)
- [iPadOS](ipados.md)
