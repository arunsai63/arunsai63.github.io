// Touch Gesture System — shared recognizer for Android + iPadOS

const SWIPE_THRESHOLD = 50    // min px to count as swipe
const SWIPE_VELOCITY = 0.3    // min px/ms velocity
const LONG_PRESS_MS = 500     // ms to trigger long press
const PINCH_THRESHOLD = 0.1   // min scale delta

/**
 * Register a swipe listener on an element
 * @param {HTMLElement} el
 * @param {Object} callbacks - { up, down, left, right } — each optional
 * @param {Object} opts - { threshold, velocity, passive }
 * @returns {Function} cleanup function
 */
export function onSwipe(el, callbacks, opts = {}) {
  const threshold = opts.threshold || SWIPE_THRESHOLD
  const minVelocity = opts.velocity || SWIPE_VELOCITY

  let startX, startY, startTime

  function handleStart(e) {
    const touch = e.touches[0]
    startX = touch.clientX
    startY = touch.clientY
    startTime = Date.now()
  }

  function handleEnd(e) {
    if (startX === undefined) return
    const touch = e.changedTouches[0]
    const dx = touch.clientX - startX
    const dy = touch.clientY - startY
    const dt = Date.now() - startTime
    const vx = Math.abs(dx) / dt
    const vy = Math.abs(dy) / dt

    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)

    if (absDx > absDy && absDx > threshold && vx > minVelocity) {
      if (dx > 0 && callbacks.right) callbacks.right({ dx, dy, velocity: vx })
      if (dx < 0 && callbacks.left) callbacks.left({ dx, dy, velocity: vx })
    } else if (absDy > absDx && absDy > threshold && vy > minVelocity) {
      if (dy > 0 && callbacks.down) callbacks.down({ dx, dy, velocity: vy })
      if (dy < 0 && callbacks.up) callbacks.up({ dx, dy, velocity: vy })
    }

    startX = startY = undefined
  }

  el.addEventListener('touchstart', handleStart, { passive: true })
  el.addEventListener('touchend', handleEnd, { passive: true })

  return () => {
    el.removeEventListener('touchstart', handleStart)
    el.removeEventListener('touchend', handleEnd)
  }
}

/**
 * Track a drag/swipe with continuous updates
 * @param {HTMLElement} el
 * @param {Object} callbacks - { start, move, end }
 * @returns {Function} cleanup
 */
export function onDrag(el, callbacks) {
  let startX, startY, startTime, active = false

  function handleStart(e) {
    const touch = e.touches[0]
    startX = touch.clientX
    startY = touch.clientY
    startTime = Date.now()
    active = true
    if (callbacks.start) callbacks.start({ x: startX, y: startY })
  }

  function handleMove(e) {
    if (!active) return
    const touch = e.touches[0]
    const dx = touch.clientX - startX
    const dy = touch.clientY - startY
    const dt = Date.now() - startTime
    if (callbacks.move) {
      callbacks.move({
        x: touch.clientX,
        y: touch.clientY,
        dx, dy,
        startX, startY,
        velocity: Math.sqrt(dx * dx + dy * dy) / (dt || 1),
      })
    }
  }

  function handleEnd(e) {
    if (!active) return
    active = false
    const touch = e.changedTouches[0]
    const dx = touch.clientX - startX
    const dy = touch.clientY - startY
    const dt = Date.now() - startTime
    if (callbacks.end) {
      callbacks.end({
        x: touch.clientX,
        y: touch.clientY,
        dx, dy,
        startX, startY,
        velocity: Math.sqrt(dx * dx + dy * dy) / (dt || 1),
      })
    }
    startX = startY = undefined
  }

  el.addEventListener('touchstart', handleStart, { passive: true })
  el.addEventListener('touchmove', handleMove, { passive: false })
  el.addEventListener('touchend', handleEnd, { passive: true })
  el.addEventListener('touchcancel', handleEnd, { passive: true })

  return () => {
    el.removeEventListener('touchstart', handleStart)
    el.removeEventListener('touchmove', handleMove)
    el.removeEventListener('touchend', handleEnd)
    el.removeEventListener('touchcancel', handleEnd)
  }
}

/**
 * Register a long-press listener
 * @param {HTMLElement} el
 * @param {Function} callback - called with { x, y } on long press
 * @param {number} duration - ms to hold (default 500)
 * @returns {Function} cleanup
 */
export function onLongPress(el, callback, duration = LONG_PRESS_MS) {
  let timer = null
  let startX, startY

  function handleStart(e) {
    const touch = e.touches[0]
    startX = touch.clientX
    startY = touch.clientY
    timer = setTimeout(() => {
      callback({ x: startX, y: startY })
      timer = null
    }, duration)
  }

  function handleMove(e) {
    if (!timer) return
    const touch = e.touches[0]
    const dx = Math.abs(touch.clientX - startX)
    const dy = Math.abs(touch.clientY - startY)
    // Cancel if finger moved too much
    if (dx > 10 || dy > 10) {
      clearTimeout(timer)
      timer = null
    }
  }

  function handleEnd() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  el.addEventListener('touchstart', handleStart, { passive: true })
  el.addEventListener('touchmove', handleMove, { passive: true })
  el.addEventListener('touchend', handleEnd, { passive: true })
  el.addEventListener('touchcancel', handleEnd, { passive: true })

  return () => {
    if (timer) clearTimeout(timer)
    el.removeEventListener('touchstart', handleStart)
    el.removeEventListener('touchmove', handleMove)
    el.removeEventListener('touchend', handleEnd)
    el.removeEventListener('touchcancel', handleEnd)
  }
}

/**
 * Register a pinch listener (two-finger zoom)
 * @param {HTMLElement} el
 * @param {Function} callback - called with { scale, centerX, centerY }
 * @returns {Function} cleanup
 */
export function onPinch(el, callback) {
  let initialDist = null

  function getDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  function getCenter(touches) {
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2,
    }
  }

  function handleStart(e) {
    if (e.touches.length === 2) {
      initialDist = getDistance(e.touches)
    }
  }

  function handleMove(e) {
    if (e.touches.length !== 2 || !initialDist) return
    const currentDist = getDistance(e.touches)
    const scale = currentDist / initialDist
    const center = getCenter(e.touches)

    if (Math.abs(scale - 1) > PINCH_THRESHOLD) {
      callback({ scale, centerX: center.x, centerY: center.y })
    }
  }

  function handleEnd() {
    initialDist = null
  }

  el.addEventListener('touchstart', handleStart, { passive: true })
  el.addEventListener('touchmove', handleMove, { passive: false })
  el.addEventListener('touchend', handleEnd, { passive: true })

  return () => {
    el.removeEventListener('touchstart', handleStart)
    el.removeEventListener('touchmove', handleMove)
    el.removeEventListener('touchend', handleEnd)
  }
}

/**
 * Add Material You ripple effect on tap
 * @param {HTMLElement} el
 * @returns {Function} cleanup
 */
export function addRipple(el) {
  el.style.position = el.style.position || 'relative'
  el.style.overflow = 'hidden'

  function handleClick(e) {
    const rect = el.getBoundingClientRect()
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
    const size = Math.max(rect.width, rect.height) * 2

    const ripple = document.createElement('span')
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${size}px; height:${size}px;
      left:${x - size / 2}px; top:${y - size / 2}px;
      background:rgba(255,255,255,0.2);
      transform:scale(0); opacity:1;
      animation: ripple-expand 0.5s cubic-bezier(0.2, 0, 0, 1) forwards;
    `
    el.appendChild(ripple)
    ripple.addEventListener('animationend', () => ripple.remove())
  }

  el.addEventListener('touchstart', handleClick, { passive: true })
  el.addEventListener('click', handleClick)

  return () => {
    el.removeEventListener('touchstart', handleClick)
    el.removeEventListener('click', handleClick)
  }
}
