// ArunOS — macOS Desktop entry point
import './styles/desktop.css'
import './styles/windows.css'
import './styles/taskbar.css'
import './styles/mobile.css'
import './styles/animations.css'
import './styles/widgets.css'

import { renderDesktop } from './os/desktop.js'
import { renderTaskbar } from './os/taskbar.js'
import { notify, startNotificationLoop } from './os/notifications.js'
import { bootSequence } from './boot/boot.js'
import { initFirebase } from '../multiplayer/firebase-config.js'
import { initCursors } from '../multiplayer/cursors.js'
import { initScreensaver } from './os/screensaver.js'
import { initConsoleEasterEggs } from '../shared/console-easter-egg.js'
import { initEasterEggs } from './os/easter-eggs.js'
import { showFirstRunWizard } from './os/first-run.js'
import { initLiveWallpaper } from './os/wallpaper.js'
import { initWidgets } from './os/widgets.js'

export async function boot(root) {
  // Phase 1: Boot sequence
  await bootSequence(root)

  // Phase 2: Render desktop
  const desktop = renderDesktop(root)

  // Phase 3: Live wallpaper
  initLiveWallpaper(desktop)

  // Phase 4: Render taskbar
  renderTaskbar(desktop)

  // Phase 5: Desktop widgets
  const desktopArea = desktop.querySelector('.desktop-area')
  if (desktopArea) initWidgets(desktopArea)

  // Phase 6: Firebase multiplayer (non-blocking)
  initFirebase().then((result) => {
    if (result) {
      initCursors(result.db, result.userId)
      notify('Connected', `Multiplayer enabled. Other visitors can see your cursor.`, 4000, 'wifi')
    }
  }).catch(() => {
    // Offline mode — no multiplayer, no problem
  })

  // Open About Me by default
  import('../apps/registry.js').then(({ openApp }) => openApp('about'))

  // Phase 7: First run wizard or welcome
  showFirstRunWizard()

  // Phase 8: Fun notifications on a timer
  startNotificationLoop()

  // Phase 9: Screensaver (60s idle)
  initScreensaver()

  // Phase 10: Easter eggs
  initConsoleEasterEggs()
  initEasterEggs()

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
      e.preventDefault()
      import('../apps/registry.js').then(({ openApp }) => openApp('terminal'))
    }
  })
}
