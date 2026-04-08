# Styling Guide

> Last updated: 2026-04-08 | Applies to: all OSes

## Overview

Each OS has its own complete stylesheet. Only `reset.css` is shared globally. This prevents visual contamination between OS experiences.

## Color Palettes

### macOS
```
Background: #0a0e1a
Primary: #10b981 (green)
Secondary: #3b82f6 (blue)
Accent: #f59e0b (amber)
Error: #ef4444 (red)
Text: #ddd / #aaa / #666
```

### Android (Material You)
```
Primary: #80cbc4
Surface: #1c1b1f
Surface Container: #201f23 / #2b292d / #363438
On Surface: #e6e1e5
On Surface Variant: #cac4d0
Error: #f2b8b5
```

### iPadOS (Apple System)
```
Blue: #007AFF
Green: #34C759
Red: #FF3B30
Orange: #FF9500
Background: system dark
Glass: rgba(255,255,255,0.1) + blur(40px) saturate(180%)
```

## Typography

| OS | UI Font | Code Font |
|----|---------|-----------|
| macOS | Inter 300-700 | JetBrains Mono 400-700 |
| Android | Inter (Google Sans sub) | JetBrains Mono |
| iPadOS | Inter (SF Pro sub) | JetBrains Mono |

## Animation Curves

| OS | Default | Spring | Material |
|----|---------|--------|----------|
| macOS | `ease` 0.15-0.3s | — | — |
| Android | — | — | `cubic-bezier(0.2, 0, 0, 1)` |
| iPadOS | — | `cubic-bezier(0.28, 0.11, 0.32, 1)` | — |

## Border Radius

| OS | Icons | Cards | Buttons | Modals |
|----|-------|-------|---------|--------|
| macOS | 12px | 10px | 6px | 12px |
| Android | 16px (squircle) | 16px | 20px (pill) | 28px |
| iPadOS | 22px (superellipse) | 16px | 10px | 20px |

## Z-Index Layers

```
macOS:
  100-999     Windows
  8000        Dock
  9000        Taskbar
  99991       Multiplayer cursors
  999998      Screensaver
  999999      OS Switcher

Android:
  1           Home screen
  10          Activity layer
  9000        Status bar / nav bar
  15000       App drawer
  20000       Notification shade
  50000       Lock screen
  99999       Power menu / OS Switcher

iPadOS:
  1           Home screen
  10          Stage Manager
  9000        Status bar
  12000       Dock
  20000       Control Center
  50000       Lock screen
  99999       OS Switcher
```

## Key Files

- `src/styles/reset.css` — Global reset
- `src/macos/styles/` — macOS CSS (6 files)
- `src/android/styles/android.css` — Material You
- `src/ipados/styles/ipados.css` — Apple design

## Related Docs

- [Architecture](../architecture.md)
