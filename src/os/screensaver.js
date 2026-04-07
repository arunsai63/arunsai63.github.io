// Screensaver — "HIRE ME" bouncing like DVD logo after 60s idle

let idleTimer = null
let screensaverEl = null
let animFrame = null
const IDLE_TIMEOUT = 60000 // 60 seconds

export function initScreensaver() {
  resetTimer()
  document.addEventListener('mousemove', resetTimer)
  document.addEventListener('keydown', resetTimer)
  document.addEventListener('click', resetTimer)
  document.addEventListener('scroll', resetTimer)
}

function resetTimer() {
  if (screensaverEl) hideScreensaver()
  clearTimeout(idleTimer)
  idleTimer = setTimeout(showScreensaver, IDLE_TIMEOUT)
}

function showScreensaver() {
  screensaverEl = document.createElement('div')
  screensaverEl.style.cssText = `
    position:fixed;inset:0;background:#000;z-index:999998;
    cursor:pointer;overflow:hidden;
  `

  const logo = document.createElement('div')
  logo.style.cssText = `
    position:absolute;
    font-family:'JetBrains Mono',monospace;
    font-size:36px;font-weight:700;
    white-space:nowrap;
    transition:color 0.5s;
  `
  logo.textContent = 'HIRE ME'

  screensaverEl.appendChild(logo)
  document.body.appendChild(screensaverEl)

  let x = Math.random() * (window.innerWidth - 200)
  let y = Math.random() * (window.innerHeight - 60)
  let dx = 2
  let dy = 1.5
  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
  let colorIdx = 0

  function animate() {
    x += dx
    y += dy

    if (x <= 0 || x >= window.innerWidth - 180) {
      dx = -dx
      colorIdx = (colorIdx + 1) % colors.length
      logo.style.color = colors[colorIdx]
    }
    if (y <= 0 || y >= window.innerHeight - 50) {
      dy = -dy
      colorIdx = (colorIdx + 1) % colors.length
      logo.style.color = colors[colorIdx]
    }

    logo.style.left = x + 'px'
    logo.style.top = y + 'px'
    animFrame = requestAnimationFrame(animate)
  }

  logo.style.color = colors[0]
  animate()

  screensaverEl.addEventListener('click', hideScreensaver)
  screensaverEl.addEventListener('mousemove', hideScreensaver)
}

function hideScreensaver() {
  if (animFrame) cancelAnimationFrame(animFrame)
  if (screensaverEl) {
    screensaverEl.remove()
    screensaverEl = null
  }
}
