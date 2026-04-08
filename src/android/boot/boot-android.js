// Android Boot Animation — Material You style
import { getYOE } from '../../shared/data.js'

export function androidBootSequence(root) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div')
    overlay.className = 'android-boot-overlay'
    overlay.innerHTML = `
      <div class="android-boot-logo">ArunOS</div>
      <div class="android-boot-spinner">
        <svg viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="80 200" stroke-linecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1.2s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
      <div class="android-boot-subtitle">Powered by mass caffeine</div>
    `
    root.appendChild(overlay)

    // Tap to skip
    const skip = () => {
      overlay.style.opacity = '0'
      overlay.style.transition = 'opacity 0.4s ease'
      setTimeout(() => { overlay.remove(); resolve() }, 400)
    }
    overlay.addEventListener('click', skip, { once: true })
    overlay.addEventListener('touchstart', skip, { once: true })

    // Auto-proceed after 2.5s
    setTimeout(skip, 2500)
  })
}
