# OS Switcher

> Last updated: 2026-04-08 | Applies to: all OSes

## Overview

The OS switcher lets users switch between macOS, Android, and iPadOS experiences. It uses a "Restart Into..." metaphor with a shutdown → boot transition.

## Detection Logic (`shared/os-detect.js`)

Priority order:
1. URL `?os=android|ipados|macos` (highest)
2. `localStorage('arunos-preferred-os')` — user previously chose
3. Auto-detect:
   - Width < 768px + touch/mobile UA → android
   - Width 768-1024px + touch/tablet UA → ipados
   - Width > 1024px → macos
   - iPad Safari (reports desktop UA): check `navigator.maxTouchPoints > 1`

## Access Points

| OS | Primary | Secondary |
|----|---------|-----------|
| macOS | Desktop right-click → "Restart Into..." | Settings app |
| Android | Notification shade → Power tile | Settings → About Phone |
| iPadOS | Control Center → "Switch Device" tile | Settings → General |
| All | URL param `?os=android\|ipados\|macos` | |

## Transition Animation

1. **Shutdown** (~800ms): Dark overlay, "Restarting..." text
2. **Switch**: `setOSPreference()` + `window.location.reload()` with `?os=` param
3. **Boot** (~1200ms): New OS's boot animation plays

## State Handling

**Preserved across switches:**
- OS preference (`localStorage`)
- Wizard completion
- Chat display name

**Reset on switch:**
- Open apps/windows
- Animation timers
- Screensaver state

## Key Files

- `src/shared/os-detect.js` — Detection + preference storage
- `src/shared/os-switcher.js` — Switcher modal UI + transition

## Related Docs

- [Architecture](architecture.md)
