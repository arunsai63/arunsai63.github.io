// iPadOS Boot Animation — Apple-style with real Apple logo

export function ipadosBootSequence(root) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div')
    overlay.className = 'ipados-boot-overlay'

    overlay.innerHTML = `
      <div class="ipados-boot-logo">
        <img src="/wallpapers/ios-logo.svg" alt="" class="ipados-boot-logo-img" />
      </div>
      <div class="ipados-boot-progress-track">
        <div class="ipados-boot-progress-fill"></div>
      </div>
    `
    root.appendChild(overlay)

    // Fade in logo
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.querySelector('.ipados-boot-logo-img').classList.add('ipados-boot-logo-visible')
      })
    })

    // Start progress bar after logo fade
    setTimeout(() => {
      const fill = overlay.querySelector('.ipados-boot-progress-fill')
      if (fill) fill.classList.add('ipados-boot-filling')
    }, 400)

    let done = false
    const finish = () => {
      if (done) return
      done = true
      overlay.classList.add('ipados-boot-flash')
      setTimeout(() => { overlay.remove(); resolve() }, 300)
    }

    overlay.addEventListener('click', finish, { once: true })
    overlay.addEventListener('touchstart', finish, { once: true, passive: true })

    setTimeout(finish, 2500)
  })
}
