// ArunOS v6.5.0 — Main entry point
import './styles/reset.css'
import './styles/desktop.css'
import './styles/windows.css'
import './styles/taskbar.css'
import './styles/mobile.css'
import './styles/animations.css'

import { renderDesktop } from './os/desktop.js'
import { renderTaskbar } from './os/taskbar.js'
import { notify, startNotificationLoop } from './os/notifications.js'
import { bootSequence } from './boot/boot.js'
import { initFirebase } from './multiplayer/firebase-config.js'
import { initCursors } from './multiplayer/cursors.js'
import { initScreensaver } from './os/screensaver.js'
import { initConsoleEasterEggs } from './shared/console-easter-egg.js'
import { initEasterEggs } from './os/easter-eggs.js'
import { showFirstRunWizard } from './os/first-run.js'

async function main() {
  const root = document.getElementById('arun-os')

  // Phase 1: Boot sequence
  await bootSequence(root)

  // Phase 2: Render desktop
  const desktop = renderDesktop(root)

  // Phase 3: Render taskbar
  renderTaskbar(desktop)

  // Phase 4: Firebase multiplayer (non-blocking)
  initFirebase().then((result) => {
    if (result) {
      initCursors(result.db, result.userId)
      notify('Connected', `Multiplayer enabled. Other visitors can see your cursor.`, 4000, 'wifi')
    }
  }).catch(() => {
    // Offline mode — no multiplayer, no problem
  })

  // Phase 5: First run wizard or welcome
  showFirstRunWizard()

  // Phase 6: Fun notifications on a timer
  startNotificationLoop()

  // Phase 7: Screensaver (60s idle)
  initScreensaver()

  // Phase 8: Easter eggs
  initConsoleEasterEggs()
  initEasterEggs()

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
      e.preventDefault()
      import('./apps/registry.js').then(({ openApp }) => openApp('terminal'))
    }
  })
}

main()
