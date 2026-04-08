// iPadOS Boot Animation — Apple-style minimal boot
import { icon } from '../../shared/icons.js'

export function ipadosBootSequence(root) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div')
    overlay.className = 'ipados-boot-overlay'

    // White Apple-esque logo (monitor icon as ArunOS logo) on black
    overlay.innerHTML = `
      <div class="ipados-boot-logo">
        ${icon('monitor', 48, '#fff')}
      </div>
      <div class="ipados-boot-progress-track">
        <div class="ipados-boot-progress-fill"></div>
      </div>
    `
    root.appendChild(overlay)

    // Animate logo fade-in
    requestAnimationFrame(() => {
      const logo = overlay.querySelector('.ipados-boot-logo')
      logo.classList.add('ipados-boot-logo-visible')
    })

    // Start progress bar after logo fade
    setTimeout(() => {
      const fill = overlay.querySelector('.ipados-boot-progress-fill')
      if (fill) fill.classList.add('ipados-boot-filling')
    }, 400)

    const finish = () => {
      // Brief white flash then remove
      overlay.classList.add('ipados-boot-flash')
      setTimeout(() => {
        overlay.remove()
        resolve()
      }, 300)
    }

    // Tap to skip
    const skip = () => finish()
    overlay.addEventListener('click', skip, { once: true })
    overlay.addEventListener('touchstart', skip, { once: true, passive: true })

    // Auto-proceed after ~2.5s
    setTimeout(finish, 2500)
  })
}
