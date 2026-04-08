// Android Boot Animation — real Android-style with bugdroid logo

export function androidBootSequence(root) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div')
    overlay.className = 'android-boot-overlay'
    overlay.innerHTML = `
      <div class="android-boot-logo">
        <img src="/wallpapers/android-logo.svg" alt="" class="android-boot-logo-img" />
      </div>
      <div class="android-boot-text">android</div>
    `
    root.appendChild(overlay)

    // Fade in the logo
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.querySelector('.android-boot-logo-img').classList.add('android-boot-visible')
        overlay.querySelector('.android-boot-text').classList.add('android-boot-visible')
      })
    })

    let done = false
    const skip = () => {
      if (done) return
      done = true
      overlay.style.opacity = '0'
      overlay.style.transition = 'opacity 0.4s ease'
      setTimeout(() => { overlay.remove(); resolve() }, 400)
    }
    overlay.addEventListener('click', skip, { once: true })
    overlay.addEventListener('touchstart', skip, { once: true })

    setTimeout(skip, 2500)
  })
}
