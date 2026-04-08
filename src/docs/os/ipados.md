# iPadOS Architecture

> Last updated: 2026-04-08 | Design target: iPadOS 17

## Overview

The iPadOS experience simulates a hyper-realistic iPad with Stage Manager windowed multitasking, a persistent glass-morphism dock, Control Center, Spotlight search, and Apple design language.

## Component Breakdown

| Component | File | Purpose |
|-----------|------|---------|
| Entry point | `ipados/main-ipados.js` | Orchestrates boot + shell |
| Boot | `ipados/boot/boot-ipados.js` | Apple logo + progress bar |
| Status bar | `ipados/os/status-bar.js` | Date/time, wifi, battery (28px) |
| Dock | `ipados/os/dock.js` | Persistent glass dock, 10+ apps |
| Home screen | `ipados/os/home-screen.js` | 6x4 grid, Spotlight search |
| Stage Manager | `ipados/os/stage-manager.js` | Windowed multitasking |
| Control Center | `ipados/os/control-center.js` | Toggle tiles, OS switcher |

## Boot Sequence

1. Black screen (500ms)
2. ArunOS logo fades in (white on black)
3. Thin progress bar fills
4. Lock screen (swipe up)
5. Home screen + dock

## Stage Manager

iPadOS 16+ Stage Manager replica:
- Floating windows with rounded corners + shadow
- Thin title bar (icon + name + close button)
- Draggable via title bar
- Left sidebar with thumbnails of open apps
- Max 4 windows visible

## Dock

- Glass morphism: `backdrop-filter: blur(40px) saturate(180%)`
- 10 pinned apps + divider + 3 recent apps
- No magnification (real iPadOS behavior)
- Persistent — visible even over apps

## The Calculator Joke

Calculator is `enabled: false` in the app manifest for iPadOS. When searched in Spotlight, it shows: "Calculator is not available on iPad. Apple couldn't figure out how to make it bigger. Neither can we." After 7+ attempts, reveals it with "Fine. Here. Happy now?"

## OS Switcher Access

- Control Center → "Switch Device" tile
- Settings → General → Switch Device

## iPadOS-Only Apps

- **FaceTime** (`ipados/apps/facetime.js`) — Call log parody
- **Notes/Pencil** (`ipados/apps/notes-pencil.js`) — Canvas drawing pad
- **Shortcuts** (`ipados/apps/shortcuts.js`) — Automation parody

## Apple Design Tokens

```css
iOS Blue: #007AFF
iOS Green: #34C759
iOS Red: #FF3B30
iOS Orange: #FF9500
Spring curve: cubic-bezier(0.28, 0.11, 0.32, 1)
Glass: backdrop-filter: blur(40px) saturate(180%)
Corners: 22px (icons), 16px (cards)
Touch targets: minimum 44px
```

## Key Files

- `src/ipados/main-ipados.js` — Entry point
- `src/ipados/os/stage-manager.js` — Windowed multitasking
- `src/ipados/styles/ipados.css` — Apple design system CSS

## Related Docs

- [macOS](macos.md)
- [Android](android.md)
