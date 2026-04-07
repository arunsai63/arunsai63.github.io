// Easter eggs — Konami code, hidden interactions, fun surprises
import { notify } from './notifications.js'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
let konamiIdx = 0
let windowCount = 0

export function initEasterEggs() {
  // Konami code listener
  document.addEventListener('keydown', (e) => {
    if (e.key === KONAMI[konamiIdx]) {
      konamiIdx++
      if (konamiIdx === KONAMI.length) {
        konamiIdx = 0
        activateKonamiCode()
      }
    } else {
      konamiIdx = 0
    }
  })

  // Track window opens for "too many windows" joke
  const observer = new MutationObserver(() => {
    const wins = document.querySelectorAll('.os-window:not(.minimized)')
    if (wins.length >= 8 && wins.length > windowCount) {
      notify('Memory Warning', "You have " + wins.length + " windows open. Your RAM is fine. Your screen real estate is not.", 4000, 'alertTriangle')
    }
    windowCount = wins.length
  })

  const desktopArea = document.querySelector('.desktop-area')
  if (desktopArea) {
    observer.observe(desktopArea, { childList: true, subtree: true })
  }
}

function activateKonamiCode() {
  notify('Konami Code Activated', 'You found the secret. Achievement unlocked: "retro gamer"', 4000, 'gamepad')

  const desktop = document.querySelector('.desktop')
  if (!desktop) return

  // Rainbow border animation
  desktop.style.transition = 'box-shadow 0.5s'
  desktop.style.boxShadow = 'inset 0 0 100px rgba(16, 185, 129, 0.3)'

  // Shake all desktop icons briefly
  document.querySelectorAll('.desktop-icon').forEach((icon, i) => {
    icon.style.transition = 'transform 0.1s'
    setTimeout(() => {
      icon.style.transform = `rotate(${Math.random() * 10 - 5}deg)`
    }, i * 50)
    setTimeout(() => {
      icon.style.transform = ''
    }, 1000 + i * 50)
  })

  // Reset glow
  setTimeout(() => {
    desktop.style.boxShadow = ''
  }, 2000)
}
