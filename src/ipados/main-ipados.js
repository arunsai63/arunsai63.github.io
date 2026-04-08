// ArunOS — iPadOS entry point
import './styles/ipados.css'

import { ipadosBootSequence } from './boot/boot-ipados.js'
import { renderStatusBar } from './os/status-bar.js'
import { renderDock, setDockCallbacks, addRecentApp } from './os/dock.js'
import { renderHomeScreen, setHomeCallbacks } from './os/home-screen.js'
import { initStageManager, openWindow, closeAllWindows, hasOpenWindows } from './os/stage-manager.js'
import { initControlCenter, showControlCenter, hideControlCenter, isControlCenterVisible } from './os/control-center.js'
import { onSwipe } from '../shared/gestures.js'
import { initFirebase } from '../multiplayer/firebase-config.js'
import { initConsoleEasterEggs } from '../shared/console-easter-egg.js'

export async function boot(root) {
  // Phase 1: Boot animation
  await ipadosBootSequence(root)

  // Phase 2: Build iPadOS shell
  root.innerHTML = ''
  const shell = document.createElement('div')
  shell.className = 'ipados-shell'
  root.appendChild(shell)

  // Wallpaper layer
  const wallpaper = document.createElement('div')
  wallpaper.className = 'ipados-wallpaper'
  shell.appendChild(wallpaper)

  // Status bar
  renderStatusBar(shell)

  // Main content area
  const mainArea = document.createElement('div')
  mainArea.className = 'ipados-main-area'
  shell.appendChild(mainArea)

  // Home screen layer
  const homeLayer = document.createElement('div')
  homeLayer.className = 'ipados-home-layer'
  mainArea.appendChild(homeLayer)

  // Stage Manager layer (for windowed apps)
  const stageLayer = document.createElement('div')
  stageLayer.className = 'ipados-stage-layer'
  mainArea.appendChild(stageLayer)

  // Dock
  renderDock(shell)

  // Phase 3: Wire app opening (no lock screen)
  const handleAppOpen = (appId) => {
    addRecentApp(appId)
    openWindow(appId)
  }

  setDockCallbacks({ onAppOpen: handleAppOpen })
  setHomeCallbacks({ onAppOpen: handleAppOpen })

  // Phase 5: Home screen
  renderHomeScreen(homeLayer)

  // Phase 6: Stage Manager
  initStageManager(stageLayer, {
    onAllClosed: () => {
      // Show home layer when all windows close
      homeLayer.style.opacity = '1'
      homeLayer.style.pointerEvents = ''
    },
  })

  // Phase 7: Control Center
  initControlCenter(shell)

  // Phase 8: Control Center trigger — top-right area
  const statusBar = shell.querySelector('.ipados-status-bar')
  if (statusBar) {
    const sbRight = statusBar.querySelector('.ipados-sb-right')
    if (sbRight) {
      sbRight.style.cursor = 'pointer'
      sbRight.addEventListener('click', (e) => {
        e.stopPropagation()
        if (isControlCenterVisible()) {
          hideControlCenter()
        } else {
          showControlCenter()
        }
      })
    }
  }

  // Pull down from top edge (mouse + touch) to open Control Center
  let pullStartY = null
  let pullStartX = null
  const PULL_ZONE = 40 // px from top edge

  shell.addEventListener('mousedown', (e) => {
    if (e.clientY < PULL_ZONE) {
      pullStartY = e.clientY
      pullStartX = e.clientX
    }
  })
  shell.addEventListener('mousemove', (e) => {
    if (pullStartY !== null && e.clientY - pullStartY > 50) {
      pullStartY = null
      if (!isControlCenterVisible()) showControlCenter()
    }
  })
  shell.addEventListener('mouseup', () => { pullStartY = null })

  shell.addEventListener('touchstart', (e) => {
    const t = e.touches[0]
    if (t.clientY < PULL_ZONE) {
      pullStartY = t.clientY
      pullStartX = t.clientX
    }
  }, { passive: true })
  shell.addEventListener('touchmove', (e) => {
    if (pullStartY === null) return
    const t = e.touches[0]
    if (t.clientY - pullStartY > 50) {
      pullStartY = null
      if (!isControlCenterVisible()) showControlCenter()
    }
  }, { passive: true })
  shell.addEventListener('touchend', () => { pullStartY = null }, { passive: true })

  // Phase 9: Firebase (non-blocking)
  initFirebase().catch(() => {})

  // Phase 10: Console easter eggs
  initConsoleEasterEggs()
}

