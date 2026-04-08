# Adding a New App

> Last updated: 2026-04-08 | Applies to: all OSes

## Overview

Adding a new app to ArunOS requires creating an app module and registering it in the manifest. The app automatically appears on all enabled platforms.

## Step-by-Step

### 1. Create the app module

Create `src/apps/my-app.js`:

```javascript
import { createWindow } from '../macos/os/window-manager.js'

// Content renderer (used by all OSes)
export function renderContent(el) {
  el.innerHTML = `
    <div style="padding:16px;color:#ccc;">
      <h2>My App</h2>
      <p>App content here...</p>
    </div>
  `
  // Add event listeners, interactivity, etc.
}

// macOS window wrapper
export function open() {
  createWindow({
    id: 'my-app',
    title: 'My App',
    icon: '🎯',
    width: 500,
    height: 400,
    content: (el) => renderContent(el),
  })
}
```

### 2. Register in the app manifest

Add to `src/shared/app-manifest.js`:

```javascript
'my-app': {
  id: 'my-app',
  label: 'My App',
  iconName: 'star',           // from shared/icons.js
  iconBg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  module: () => import('../apps/my-app.js'),
  platforms: {
    macos:   { enabled: true },
    android: { enabled: true, label: 'My App', category: 'tools' },
    ipados:  { enabled: true },
  },
},
```

### 3. Add icon (if needed)

If your app needs a new icon, add it to `src/shared/icons.js`.

### 4. That's it

Each OS reads from `getAppsForPlatform()` and automatically includes the new app in:
- macOS: dock icons + start menu
- Android: home screen grid + app drawer
- iPadOS: home screen grid + dock (if space)

### Platform-specific behavior

Set `enabled: false` to exclude from a platform:

```javascript
platforms: {
  macos:   { enabled: true },
  android: { enabled: false },  // Not on Android
  ipados:  { enabled: true },
},
```

### OS-only apps

For OS-specific apps (e.g., Phone dialer for Android only), place the module in the OS directory:

```javascript
module: () => import('../android/apps/phone.js'),
```

## Key Files

- `src/shared/app-manifest.js` — App registry
- `src/shared/icons.js` — SVG icon library
- `src/apps/` — Shared app modules

## Related Docs

- [Architecture](../architecture.md)
- [Styling Guide](styling-guide.md)
