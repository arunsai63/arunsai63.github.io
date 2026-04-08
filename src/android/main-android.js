// ArunOS — Android OS entry point
import './styles/android.css'

import { androidBootSequence } from './boot/boot-android.js'
import { renderStatusBar } from './os/status-bar.js'
import { renderNavigationBar, setNavCallbacks } from './os/navigation-bar.js'
import { renderHomeScreen, setHomeCallbacks } from './os/home-screen.js'
import { initActivityManager, openActivity, closeActivity, closeAllActivities, hasActiveActivity } from './os/activity-manager.js'
import { initNotificationShade, showShade, hideShade, isShadeVisible } from './os/notification-shade.js'
import { initAppDrawer, showDrawer, hideDrawer, isDrawerVisible } from './os/app-drawer.js'
import { initFirebase } from '../multiplayer/firebase-config.js'
import { initConsoleEasterEggs } from '../shared/console-easter-egg.js'

export async function boot(root) {
  // Phase 1: Boot animation
  await androidBootSequence(root)

  // Phase 2: Build Android shell
  root.innerHTML = ''
  const shell = document.createElement('div')
  shell.className = 'android-shell'
  root.appendChild(shell)

  // Wallpaper layer
  const wallpaper = document.createElement('div')
  wallpaper.className = 'android-wallpaper'
  shell.appendChild(wallpaper)

  // Status bar
  renderStatusBar(shell)

  // Main content area (between status bar and nav bar)
  const mainArea = document.createElement('div')
  mainArea.className = 'android-main-area'
  shell.appendChild(mainArea)

  // Home screen layer
  const homeLayer = document.createElement('div')
  homeLayer.className = 'android-home-layer'
  mainArea.appendChild(homeLayer)

  // Activity layer (for full-screen apps)
  const activityLayer = document.createElement('div')
  activityLayer.className = 'android-activity-layer'
  mainArea.appendChild(activityLayer)

  // Navigation bar
  renderNavigationBar(shell)

  // Phase 3: Home screen (no lock screen)
  setHomeCallbacks({
    onAppOpen: (appId) => openActivity(appId),
    onDrawerOpen: () => showDrawer(),
  })
  renderHomeScreen(homeLayer)

  // Phase 5: Activity manager
  initActivityManager(activityLayer, {
    onClose: () => {
      // Show home screen when all activities closed
      homeLayer.style.display = ''
    }
  })

  // Phase 6: Notification shade
  initNotificationShade(shell)

  // Phase 7: App drawer
  initAppDrawer(shell, {
    onAppOpen: (appId) => openActivity(appId),
  })

  // Phase 8: Navigation callbacks
  setNavCallbacks({
    onBack: () => {
      if (isShadeVisible()) {
        hideShade()
      } else if (isDrawerVisible()) {
        hideDrawer()
      } else if (hasActiveActivity()) {
        closeActivity()
      }
    },
    onHome: () => {
      if (isShadeVisible()) {
        hideShade()
      } else if (isDrawerVisible()) {
        hideDrawer()
      } else if (hasActiveActivity()) {
        closeAllActivities()
      }
    },
    onRecents: () => {
      // TODO: Recents screen
    }
  })

  // Status bar click + pull-down from top for notification shade
  const statusBar = shell.querySelector('.android-status-bar')
  if (statusBar) {
    statusBar.addEventListener('click', () => {
      if (isShadeVisible()) hideShade()
      else showShade()
    })
    statusBar.style.cursor = 'pointer'
  }

  // Pull down from top edge (mouse + touch) to open notification shade
  let pullStartY = null
  const PULL_ZONE = 40
  shell.addEventListener('mousedown', (e) => {
    if (e.clientY < PULL_ZONE) pullStartY = e.clientY
  })
  shell.addEventListener('mousemove', (e) => {
    if (pullStartY !== null && e.clientY - pullStartY > 50) {
      pullStartY = null
      if (!isShadeVisible()) showShade()
    }
  })
  shell.addEventListener('mouseup', () => { pullStartY = null })
  shell.addEventListener('touchstart', (e) => {
    if (e.touches[0].clientY < PULL_ZONE) pullStartY = e.touches[0].clientY
  }, { passive: true })
  shell.addEventListener('touchmove', (e) => {
    if (pullStartY !== null && e.touches[0].clientY - pullStartY > 50) {
      pullStartY = null
      if (!isShadeVisible()) showShade()
    }
  }, { passive: true })
  shell.addEventListener('touchend', () => { pullStartY = null }, { passive: true })

  // Phase 9: Firebase (non-blocking)
  initFirebase().catch(() => {})

  // Phase 10: Console easter eggs
  initConsoleEasterEggs()
}
