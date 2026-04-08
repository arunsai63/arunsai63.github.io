// iPadOS Stage Manager — windowed multitasking with sidebar strip
import { getAppById } from '../../shared/app-manifest.js'
import { icon } from '../../shared/icons.js'

const MAX_VISIBLE = 4
let windows = []
let focusedId = null
let stageContainer = null
let sidebarEl = null
let windowLayer = null
let onAllClosedCallback = null
let windowCounter = 0

// Stagger offsets for cascading windows
const OFFSETS = [
  { x: 80, y: 60 },
  { x: 140, y: 90 },
  { x: 200, y: 60 },
  { x: 120, y: 120 },
]

export function initStageManager(container, callbacks = {}) {
  stageContainer = container
  onAllClosedCallback = callbacks.onAllClosed

  // Sidebar strip (left)
  sidebarEl = document.createElement('div')
  sidebarEl.className = 'ipados-stage-sidebar'
  container.appendChild(sidebarEl)

  // Window layer
  windowLayer = document.createElement('div')
  windowLayer.className = 'ipados-stage-window-layer'
  container.appendChild(windowLayer)

  updateSidebar()
}

export async function openWindow(appId) {
  const appDef = getAppById(appId)
  if (!appDef) return

  // If already open, focus it
  const existing = windows.find(w => w.appId === appId)
  if (existing) {
    focusWindow(existing.id)
    return
  }

  // Enforce max visible
  if (windows.length >= MAX_VISIBLE) {
    const oldest = windows[0]
    removeWindow(oldest.id)
  }

  windowCounter++
  const wid = `stage-win-${windowCounter}`

  const offset = OFFSETS[(windowCounter - 1) % OFFSETS.length]
  const vw = window.innerWidth
  const vh = window.innerHeight
  const winW = Math.min(Math.max(vw * 0.55, 400), 800)
  const winH = Math.min(Math.max(vh * 0.6, 350), 650)
  const startX = Math.min(offset.x + 60, vw - winW - 20)
  const startY = Math.min(offset.y + 28, vh - winH - 80)

  const label = appDef.platforms?.ipados?.label || appDef.label

  const win = document.createElement('div')
  win.className = 'ipados-stage-window'
  win.id = wid
  win.style.cssText = `
    width: ${winW}px;
    height: ${winH}px;
    left: ${startX}px;
    top: ${startY}px;
  `

  win.innerHTML = `
    <div class="ipados-stage-titlebar" data-wid="${wid}">
      <div class="ipados-stage-titlebar-left">
        <div class="ipados-stage-titlebar-icon" style="background:${appDef.iconBg}">
          ${icon(appDef.iconName, 14, '#fff')}
        </div>
        <span class="ipados-stage-titlebar-label">${label}</span>
      </div>
      <button class="ipados-stage-close-btn" data-wid="${wid}" aria-label="Close">&times;</button>
    </div>
    <div class="ipados-stage-content" id="${wid}-content"></div>
  `

  windowLayer.appendChild(win)

  // Record
  const entry = { id: wid, appId, el: win, label, appDef }
  windows.push(entry)
  focusWindow(wid)

  // Load app content
  const contentEl = win.querySelector(`#${wid}-content`)
  try {
    const mod = await appDef.module()
    if (mod.renderContent) {
      mod.renderContent(contentEl)
    } else if (mod.open) {
      contentEl.innerHTML = `<div style="padding:24px;color:rgba(255,255,255,0.5);font-family:Inter,sans-serif;">Loading ${label}...</div>`
    }
  } catch {
    contentEl.innerHTML = `<div style="padding:24px;color:#FF3B30;font-family:Inter,sans-serif;">Failed to load ${label}</div>`
  }

  // Wire close button
  win.querySelector('.ipados-stage-close-btn').addEventListener('click', (e) => {
    e.stopPropagation()
    closeWindow(wid)
  })

  // Wire focus on click
  win.addEventListener('mousedown', () => focusWindow(wid))
  win.addEventListener('touchstart', () => focusWindow(wid), { passive: true })

  // Wire drag on title bar
  initDrag(win, wid)

  // Animate in
  requestAnimationFrame(() => {
    win.classList.add('ipados-stage-window-enter')
  })

  updateSidebar()
  return win
}

function initDrag(win, wid) {
  const titlebar = win.querySelector('.ipados-stage-titlebar')
  let isDragging = false
  let startX, startY, origLeft, origTop

  function onStart(e) {
    // Don't drag from close button
    if (e.target.closest('.ipados-stage-close-btn')) return
    isDragging = true
    const ev = e.touches ? e.touches[0] : e
    startX = ev.clientX
    startY = ev.clientY
    origLeft = parseInt(win.style.left) || 0
    origTop = parseInt(win.style.top) || 0
    win.classList.add('ipados-stage-dragging')
    focusWindow(wid)
    e.preventDefault()
  }

  function onMove(e) {
    if (!isDragging) return
    const ev = e.touches ? e.touches[0] : e
    const dx = ev.clientX - startX
    const dy = ev.clientY - startY
    win.style.left = `${origLeft + dx}px`
    win.style.top = `${Math.max(28, origTop + dy)}px` // Don't go above status bar
  }

  function onEnd() {
    if (!isDragging) return
    isDragging = false
    win.classList.remove('ipados-stage-dragging')
  }

  titlebar.addEventListener('mousedown', onStart)
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onEnd)
  titlebar.addEventListener('touchstart', onStart, { passive: false })
  document.addEventListener('touchmove', onMove, { passive: false })
  document.addEventListener('touchend', onEnd)
}

function focusWindow(wid) {
  focusedId = wid
  let zBase = 100
  windows.forEach(w => {
    if (w.id === wid) {
      w.el.style.zIndex = zBase + windows.length + 1
      w.el.classList.add('ipados-stage-focused')
    } else {
      w.el.style.zIndex = zBase++
      w.el.classList.remove('ipados-stage-focused')
    }
  })
  updateSidebar()
}

export function closeWindow(wid) {
  const idx = windows.findIndex(w => w.id === wid)
  if (idx === -1) return

  const win = windows[idx]
  win.el.classList.add('ipados-stage-window-exit')
  win.el.classList.remove('ipados-stage-window-enter')

  setTimeout(() => {
    win.el.remove()
    windows.splice(idx, 1)
    if (focusedId === wid) {
      focusedId = windows.length > 0 ? windows[windows.length - 1].id : null
      if (focusedId) focusWindow(focusedId)
    }
    updateSidebar()
    if (windows.length === 0 && onAllClosedCallback) onAllClosedCallback()
  }, 250)
}

function removeWindow(wid) {
  const idx = windows.findIndex(w => w.id === wid)
  if (idx === -1) return
  windows[idx].el.remove()
  windows.splice(idx, 1)
}

export function closeAllWindows() {
  windows.forEach(w => w.el.remove())
  windows = []
  focusedId = null
  updateSidebar()
}

export function hasOpenWindows() {
  return windows.length > 0
}

function updateSidebar() {
  if (!sidebarEl) return

  if (windows.length === 0) {
    sidebarEl.innerHTML = ''
    sidebarEl.classList.remove('ipados-stage-sidebar-visible')
    return
  }

  sidebarEl.classList.add('ipados-stage-sidebar-visible')
  sidebarEl.innerHTML = windows.map(w => `
    <div class="ipados-stage-sidebar-thumb ${w.id === focusedId ? 'ipados-stage-sidebar-active' : ''}" data-wid="${w.id}">
      <div class="ipados-stage-sidebar-icon" style="background:${w.appDef.iconBg}">
        ${icon(w.appDef.iconName, 18, '#fff')}
      </div>
    </div>
  `).join('')

  sidebarEl.querySelectorAll('.ipados-stage-sidebar-thumb').forEach(el => {
    el.addEventListener('click', () => {
      focusWindow(el.dataset.wid)
    })
  })
}
