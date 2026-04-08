// Live wallpaper — animated aurora blobs on canvas

const BLOBS = [
  { x: 0.15, y: 0.85, r: 0.4, color: [99, 102, 241], speed: 0.00015, phase: 0 },
  { x: 0.85, y: 0.15, r: 0.35, color: [244, 114, 182], speed: 0.00012, phase: 1.5 },
  { x: 0.5, y: 0.5, r: 0.45, color: [56, 189, 248], speed: 0.0001, phase: 3 },
  { x: 0.3, y: 0.2, r: 0.3, color: [167, 139, 250], speed: 0.00018, phase: 4.5 },
  { x: 0.7, y: 0.75, r: 0.35, color: [52, 211, 153], speed: 0.00014, phase: 2 },
  { x: 0.9, y: 0.45, r: 0.25, color: [251, 146, 60], speed: 0.00016, phase: 5.5 },
]

let canvas = null
let ctx = null
let animFrame = null
let time = 0
let lastFrame = 0

export function initLiveWallpaper(desktopEl) {
  canvas = document.createElement('canvas')
  canvas.className = 'live-wallpaper'
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;'

  // Insert as first child of desktop
  const desktopArea = desktopEl.querySelector('.desktop-area')
  if (desktopArea) {
    desktopArea.style.position = 'relative'
    desktopArea.insertBefore(canvas, desktopArea.firstChild)
    // Make icons sit above canvas
    const iconsEl = desktopArea.querySelector('.desktop-icons')
    if (iconsEl) iconsEl.style.position = 'relative'
  }

  ctx = canvas.getContext('2d')

  resize()
  window.addEventListener('resize', resize)

  lastFrame = performance.now()
  animate()
}

function resize() {
  if (!canvas) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  // Use lower resolution for performance
  canvas.width = Math.floor(canvas.offsetWidth * dpr * 0.5)
  canvas.height = Math.floor(canvas.offsetHeight * dpr * 0.5)
}

function animate() {
  const now = performance.now()
  const dt = now - lastFrame
  lastFrame = now
  time += dt

  draw()
  animFrame = requestAnimationFrame(animate)
}

function draw() {
  const w = canvas.width
  const h = canvas.height
  if (!w || !h) return

  // Dark base
  ctx.fillStyle = '#0a0e1a'
  ctx.fillRect(0, 0, w, h)

  // Draw each blob as a radial gradient circle that moves slowly
  for (const blob of BLOBS) {
    const t = time * blob.speed + blob.phase

    // Gentle orbit motion
    const cx = (blob.x + Math.sin(t) * 0.08 + Math.cos(t * 0.7) * 0.05) * w
    const cy = (blob.y + Math.cos(t * 1.1) * 0.08 + Math.sin(t * 0.6) * 0.05) * h
    const radius = blob.r * Math.max(w, h) * (0.9 + Math.sin(t * 0.5) * 0.1)

    const [r, g, b] = blob.color
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
    grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.45)`)
    grad.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, 0.2)`)
    grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
  }
}

export function destroyLiveWallpaper() {
  if (animFrame) cancelAnimationFrame(animFrame)
  if (canvas) canvas.remove()
  window.removeEventListener('resize', resize)
  canvas = null
  ctx = null
}
