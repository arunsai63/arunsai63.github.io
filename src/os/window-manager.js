// Window Manager — handles creating, moving, resizing, focusing, minimizing, maximizing windows

let windows = []
let zCounter = 100
let activeWindowId = null

export function getWindows() { return windows }
export function getActiveWindowId() { return activeWindowId }

export function createWindow({ id, title, icon, content, width = 700, height = 500, x, y, onClose }) {
  // Don't create duplicate windows — focus existing one instead
  const existing = windows.find(w => w.id === id)
  if (existing) {
    focusWindow(id)
    if (existing.minimized) restoreWindow(id)
    return existing
  }

  const desktopArea = document.querySelector('.desktop-area')
  if (!desktopArea) return null
  const bounds = desktopArea.getBoundingClientRect()

  // Center window or use provided coords
  const winX = x ?? Math.max(20, (bounds.width - width) / 2 + Math.random() * 40 - 20)
  const winY = y ?? Math.max(20, (bounds.height - height) / 2 + Math.random() * 40 - 20)

  const win = {
    id,
    title,
    icon: icon || '📁',
    width,
    height,
    x: winX,
    y: winY,
    minimized: false,
    maximized: false,
    prevBounds: null,
    zIndex: ++zCounter,
    onClose,
  }

  windows.push(win)

  const el = buildWindowElement(win, content)
  desktopArea.appendChild(el)
  focusWindow(id)
  updateTaskbar()
  return win
}

export function closeWindow(id) {
  const idx = windows.findIndex(w => w.id === id)
  if (idx === -1) return
  const win = windows[idx]
  if (win.onClose) win.onClose()
  const el = document.getElementById(`window-${id}`)
  if (el) el.remove()
  windows.splice(idx, 1)
  if (activeWindowId === id) {
    activeWindowId = windows.length ? windows[windows.length - 1].id : null
    if (activeWindowId) focusWindow(activeWindowId)
  }
  updateTaskbar()
}

export function focusWindow(id) {
  const win = windows.find(w => w.id === id)
  if (!win) return
  activeWindowId = id
  win.zIndex = ++zCounter
  windows.forEach(w => {
    const el = document.getElementById(`window-${w.id}`)
    if (!el) return
    el.style.zIndex = w.zIndex
    el.classList.toggle('focused', w.id === id)
  })
  updateTaskbar()
}

export function minimizeWindow(id) {
  const win = windows.find(w => w.id === id)
  if (!win) return
  win.minimized = true
  const el = document.getElementById(`window-${id}`)
  if (el) el.classList.add('minimized')
  if (activeWindowId === id) {
    const visible = windows.filter(w => !w.minimized)
    activeWindowId = visible.length ? visible[visible.length - 1].id : null
    if (activeWindowId) focusWindow(activeWindowId)
  }
  updateTaskbar()
}

export function restoreWindow(id) {
  const win = windows.find(w => w.id === id)
  if (!win) return
  win.minimized = false
  const el = document.getElementById(`window-${id}`)
  if (el) el.classList.remove('minimized')
  focusWindow(id)
  updateTaskbar()
}

export function maximizeWindow(id) {
  const win = windows.find(w => w.id === id)
  if (!win) return
  const el = document.getElementById(`window-${id}`)
  if (!el) return

  if (win.maximized) {
    // Restore
    win.maximized = false
    el.classList.remove('maximized')
    if (win.prevBounds) {
      Object.assign(el.style, {
        left: win.prevBounds.x + 'px',
        top: win.prevBounds.y + 'px',
        width: win.prevBounds.width + 'px',
        height: win.prevBounds.height + 'px',
      })
      win.x = win.prevBounds.x
      win.y = win.prevBounds.y
      win.width = win.prevBounds.width
      win.height = win.prevBounds.height
    }
  } else {
    // Maximize
    win.prevBounds = { x: win.x, y: win.y, width: win.width, height: win.height }
    win.maximized = true
    el.classList.add('maximized')
    Object.assign(el.style, { left: '0', top: '0', width: '100%', height: '100%' })
  }
}

export function toggleWindowFromTaskbar(id) {
  const win = windows.find(w => w.id === id)
  if (!win) return
  if (win.minimized) {
    restoreWindow(id)
  } else if (activeWindowId === id) {
    minimizeWindow(id)
  } else {
    focusWindow(id)
  }
}

// -- Internal DOM builder --

function buildWindowElement(win, content) {
  const el = document.createElement('div')
  el.id = `window-${win.id}`
  el.className = 'os-window focused'
  el.style.cssText = `left:${win.x}px;top:${win.y}px;width:${win.width}px;height:${win.height}px;z-index:${win.zIndex};`

  el.innerHTML = `
    <div class="window-titlebar" data-window-id="${win.id}">
      <div class="window-buttons">
        <div class="window-btn window-btn-close" data-action="close" data-window-id="${win.id}"></div>
        <div class="window-btn window-btn-minimize" data-action="minimize" data-window-id="${win.id}"></div>
        <div class="window-btn window-btn-maximize" data-action="maximize" data-window-id="${win.id}"></div>
      </div>
      <span class="window-icon">${win.icon}</span>
      <span class="window-title">${win.title}</span>
    </div>
    <div class="window-content" id="window-content-${win.id}"></div>
    <div class="resize-handle resize-handle-e" data-resize="e"></div>
    <div class="resize-handle resize-handle-s" data-resize="s"></div>
    <div class="resize-handle resize-handle-se" data-resize="se"></div>
    <div class="resize-handle resize-handle-w" data-resize="w"></div>
    <div class="resize-handle resize-handle-n" data-resize="n"></div>
  `

  const contentArea = el.querySelector('.window-content')
  if (typeof content === 'string') {
    contentArea.innerHTML = content
  } else if (content instanceof HTMLElement) {
    contentArea.appendChild(content)
  } else if (typeof content === 'function') {
    content(contentArea)
  }

  // Focus on click
  el.addEventListener('mousedown', () => focusWindow(win.id))

  // Window button actions
  el.querySelectorAll('.window-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const action = btn.dataset.action
      const wid = btn.dataset.windowId
      if (action === 'close') closeWindow(wid)
      else if (action === 'minimize') minimizeWindow(wid)
      else if (action === 'maximize') maximizeWindow(wid)
    })
  })

  // Double-click titlebar to maximize
  const titlebar = el.querySelector('.window-titlebar')
  titlebar.addEventListener('dblclick', () => maximizeWindow(win.id))

  // Drag
  setupDrag(el, win, titlebar)

  // Resize
  el.querySelectorAll('.resize-handle').forEach(handle => {
    setupResize(el, win, handle)
  })

  return el
}

function setupDrag(el, win, titlebar) {
  let isDragging = false
  let startX, startY, startWinX, startWinY

  titlebar.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('window-btn')) return
    if (win.maximized) return
    isDragging = true
    startX = e.clientX
    startY = e.clientY
    startWinX = win.x
    startWinY = win.y
    e.preventDefault()
  })

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    win.x = startWinX + dx
    win.y = Math.max(0, startWinY + dy) // Don't drag above top
    el.style.left = win.x + 'px'
    el.style.top = win.y + 'px'
  })

  document.addEventListener('mouseup', () => {
    isDragging = false
  })
}

function setupResize(el, win, handle) {
  const dir = handle.dataset.resize
  let isResizing = false
  let startX, startY, startW, startH, startLeft, startTop

  handle.addEventListener('mousedown', (e) => {
    if (win.maximized) return
    isResizing = true
    startX = e.clientX
    startY = e.clientY
    startW = win.width
    startH = win.height
    startLeft = win.x
    startTop = win.y
    e.preventDefault()
    e.stopPropagation()
  })

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return
    const dx = e.clientX - startX
    const dy = e.clientY - startY

    if (dir.includes('e')) { win.width = Math.max(300, startW + dx) }
    if (dir.includes('s')) { win.height = Math.max(200, startH + dy) }
    if (dir.includes('w')) {
      const newW = Math.max(300, startW - dx)
      win.x = startLeft + (startW - newW)
      win.width = newW
      el.style.left = win.x + 'px'
    }
    if (dir.includes('n')) {
      const newH = Math.max(200, startH - dy)
      win.y = Math.max(0, startTop + (startH - newH))
      win.height = newH
      el.style.top = win.y + 'px'
    }

    el.style.width = win.width + 'px'
    el.style.height = win.height + 'px'
  })

  document.addEventListener('mouseup', () => {
    isResizing = false
  })
}

// Taskbar integration
function updateTaskbar() {
  if (typeof window.__updateTaskbar === 'function') {
    window.__updateTaskbar()
  }
}
