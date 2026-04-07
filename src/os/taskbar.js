// Taskbar — start menu, running apps, system tray
import { getWindows, getActiveWindowId, toggleWindowFromTaskbar } from './window-manager.js'
import { openApp, appList } from '../apps/registry.js'

let startMenuOpen = false

export function renderTaskbar(desktopEl) {
  const taskbar = document.createElement('div')
  taskbar.className = 'taskbar'
  taskbar.innerHTML = `
    <button class="start-btn" title="Start Menu">🚀</button>
    <div class="taskbar-apps"></div>
    <div class="system-tray">
      <span class="tray-item tray-visitors" title="Visitors online">👥 1</span>
      <span class="tray-item" title="WiFi: FBI_Surveillance_Van_7 | Signal: vibes">📶</span>
      <span class="tray-item" title="Battery: 99% (it's been 99% since 2019)">🔋 99%</span>
      <span class="tray-item tray-clock"></span>
    </div>
  `

  desktopEl.appendChild(taskbar)

  // Start button
  taskbar.querySelector('.start-btn').addEventListener('click', (e) => {
    e.stopPropagation()
    toggleStartMenu(desktopEl)
  })

  // Close start menu on desktop click
  document.addEventListener('click', (e) => {
    if (startMenuOpen && !e.target.closest('.start-menu') && !e.target.closest('.start-btn')) {
      closeStartMenu()
    }
  })

  // Clock
  updateClock(taskbar.querySelector('.tray-clock'))
  setInterval(() => updateClock(taskbar.querySelector('.tray-clock')), 1000)

  // Global taskbar updater
  window.__updateTaskbar = () => updateTaskbarApps(taskbar.querySelector('.taskbar-apps'))
}

function updateTaskbarApps(container) {
  if (!container) return
  const wins = getWindows()
  const activeId = getActiveWindowId()

  container.innerHTML = ''
  wins.forEach(win => {
    const el = document.createElement('div')
    el.className = 'taskbar-app' + (win.id === activeId && !win.minimized ? ' active' : '')
    el.innerHTML = `<span class="taskbar-app-icon">${win.icon}</span> ${win.title}`
    el.addEventListener('click', () => toggleWindowFromTaskbar(win.id))
    container.appendChild(el)
  })
}

function updateClock(el) {
  if (!el) return
  const now = new Date()
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  el.textContent = time
  el.title = `Local: ${time}\nArun's Time: ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' })} IST\n(yes, he's probably coding right now)`
}

function toggleStartMenu(desktopEl) {
  if (startMenuOpen) {
    closeStartMenu()
  } else {
    openStartMenu(desktopEl)
  }
}

function openStartMenu(desktopEl) {
  closeStartMenu() // clean up any existing
  startMenuOpen = true

  const menu = document.createElement('div')
  menu.className = 'start-menu open'
  menu.id = 'start-menu'

  const apps = appList()

  menu.innerHTML = `
    <div class="start-menu-search">
      <input type="text" placeholder="Search apps... (try 'salary')" id="start-search" />
    </div>
    <div class="start-menu-apps">
      ${apps.map(app => `
        <div class="start-menu-app" data-app-id="${app.id}">
          <span class="start-menu-app-icon">${app.icon}</span>
          <span>${app.label}</span>
        </div>
      `).join('')}
    </div>
    <div class="start-menu-footer">
      <span>ArunOS v6.5.0</span>
      <span>⏻ Shut Down</span>
    </div>
  `

  desktopEl.appendChild(menu)

  // App clicks
  menu.querySelectorAll('.start-menu-app').forEach(el => {
    el.addEventListener('click', () => {
      openApp(el.dataset.appId)
      closeStartMenu()
    })
  })

  // Search easter eggs
  const searchInput = menu.querySelector('#start-search')
  searchInput.addEventListener('input', () => {
    const val = searchInput.value.toLowerCase().trim()
    handleStartSearch(val, menu)
  })
  searchInput.focus()

  // Shut down
  menu.querySelector('.start-menu-footer span:last-child').addEventListener('click', () => {
    import('../os/notifications.js').then(({ notify }) => {
      notify('Shut Down Failed', "Error: Cannot shut down. Have you considered that I'm a website?")
    })
    closeStartMenu()
  })
}

function handleStartSearch(query, menu) {
  const appsContainer = menu.querySelector('.start-menu-apps')
  const allApps = appList()

  // Easter egg searches
  const easterEggs = {
    'salary': '💰 Nice try, HR.',
    'password': '🔐 It\'s "password123". Just kidding. Or am I?',
    'bugs': '🐛 We don\'t have those here. Only undocumented features.',
    'fired': '🔥 Error 403: This search is above your pay grade.',
    'coffee': '☕ Now we\'re talking. Essential system resource.',
    'girlfriend': '💔 404: Not Found (insufficient time allocated)',
    'sleep': '😴 Module not found. Have you tried coffee instead?',
  }

  if (easterEggs[query]) {
    appsContainer.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:20px;color:#888;font-size:13px;">${easterEggs[query]}</div>`
    return
  }

  const filtered = query ? allApps.filter(a =>
    a.label.toLowerCase().includes(query) || a.id.toLowerCase().includes(query)
  ) : allApps

  appsContainer.innerHTML = filtered.length ? filtered.map(app => `
    <div class="start-menu-app" data-app-id="${app.id}">
      <span class="start-menu-app-icon">${app.icon}</span>
      <span>${app.label}</span>
    </div>
  `).join('') : `<div style="grid-column:1/-1;text-align:center;padding:20px;color:#666;font-size:13px;">No results. Like my dating life.</div>`

  appsContainer.querySelectorAll('.start-menu-app').forEach(el => {
    el.addEventListener('click', () => {
      openApp(el.dataset.appId)
      closeStartMenu()
    })
  })
}

function closeStartMenu() {
  startMenuOpen = false
  const menu = document.getElementById('start-menu')
  if (menu) menu.remove()
}
