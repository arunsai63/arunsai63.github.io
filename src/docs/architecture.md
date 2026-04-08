# Architecture Overview

> Last updated: 2026-04-08 | Applies to: all OSes

## Overview

ArunOS uses a multi-OS architecture where three separate OS experiences share a common data and app layer. Each OS is code-split into its own Vite chunk.

## Data Flow

```
shared/data.js ──────┐
shared/icons.js ─────┤
shared/app-manifest.js ─┤
                     │
                     ├── apps/about.js ─── renderContent(el)
                     ├── apps/terminal.js ─ renderContent(el)
                     ├── apps/...
                     │
                     ├── macos/  → createWindow(content)
                     ├── android/ → openActivity(container)
                     └── ipados/  → stageManager.open(container)
```

## Key Design Decisions

1. **Full reload on OS switch** — Each OS has completely different DOM, CSS, and event listeners. A clean reload via `?os=` param avoids memory leaks. The boot animation makes it feel intentional.

2. **No shared CSS between OSes** — Each OS has its own complete stylesheet. Only `reset.css` is shared. This prevents visual contamination.

3. **App content via renderContent(el)** — Apps export a `renderContent(container)` function that fills a given DOM element. The OS provides the container (macOS window, Android activity, iPadOS Stage Manager window). Apps don't know which OS they're running on.

4. **App manifest for availability** — `shared/app-manifest.js` declares which apps exist on which OS and platform-specific labels/categories.

5. **Vite code-splitting** — Dynamic imports in `main.js` ensure each OS is a separate chunk. Mobile visitors don't download macOS code.

## Module Dependency Map

```
main.js
  ├── shared/os-detect.js
  └── [dynamic] macos/main-macos.js
        ├── macos/os/desktop.js
        ├── macos/os/taskbar.js
        ├── macos/os/window-manager.js
        ├── macos/os/widgets.js
        ├── macos/os/wallpaper.js
        ├── macos/boot/boot.js
        └── [dynamic] apps/*.js
  └── [dynamic] android/main-android.js
        ├── android/os/status-bar.js
        ├── android/os/navigation-bar.js
        ├── android/os/home-screen.js
        ├── android/os/activity-manager.js
        ├── android/os/notification-shade.js
        ├── android/os/app-drawer.js
        ├── android/os/lock-screen.js
        ├── android/boot/boot-android.js
        └── [dynamic] apps/*.js
  └── [dynamic] ipados/main-ipados.js
        ├── ipados/os/dock.js
        ├── ipados/os/home-screen.js
        ├── ipados/os/stage-manager.js
        ├── ipados/os/control-center.js
        ├── ipados/boot/boot-ipados.js
        └── [dynamic] apps/*.js
```

## localStorage Keys

| Key | Purpose |
|-----|---------|
| `arunos-preferred-os` | User's chosen OS (survives reload) |
| `arunos-wizard-done` | First-run wizard completed (macOS) |
| `arunos-chat-name` | Chat display name |

## Key Files

- `src/main.js` — OS router entry point
- `src/shared/os-detect.js` — Device detection logic
- `src/shared/app-manifest.js` — App registry with per-OS availability
- `src/shared/data.js` — All portfolio content
- `src/shared/os-switcher.js` — OS switching transition UI

## Related Docs
- [OS Switcher](os-switcher.md)
- [Adding an App](guides/adding-an-app.md)
