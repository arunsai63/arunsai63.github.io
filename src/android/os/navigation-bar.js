// Android Navigation Bar — gesture pill (Android 12+ style)
import { onSwipe, onDrag } from '../../shared/gestures.js'

let callbacks = {}

export function renderNavigationBar(container) {
  const nav = document.createElement('div')
  nav.className = 'android-nav-bar'
  nav.innerHTML = `<div class="android-nav-pill"></div>`

  container.appendChild(nav)

  // Gesture handling on the pill
  const pill = nav.querySelector('.android-nav-pill')

  // Swipe up from pill = go home
  onSwipe(pill, {
    up: () => { if (callbacks.onHome) callbacks.onHome() },
  })

  // Also handle swipe from bottom edge of screen
  onSwipe(container, {
    up: (data) => {
      if (data.dy < -100) {
        // Long swipe = recents
        if (callbacks.onRecents) callbacks.onRecents()
      } else {
        // Short swipe = home
        if (callbacks.onHome) callbacks.onHome()
      }
    }
  }, { threshold: 30 })

  return nav
}

export function setNavCallbacks(cbs) {
  callbacks = cbs
}
