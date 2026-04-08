// Taskbar — start menu, running apps, system tray with real device info
import { getWindows, getActiveWindowId, toggleWindowFromTaskbar } from './window-manager.js'
import { openApp, appList } from '../../apps/registry.js'
import { getYOE } from '../../shared/data.js'
import { icon } from '../../shared/icons.js'

let startMenuOpen = false

export function renderTaskbar(desktopEl) {
  const taskbar = document.createElement('div')
  taskbar.className = 'taskbar'
  taskbar.innerHTML = `
    <button class="start-btn" title="Start Menu">${icon('grid', 18, '#3478f6')}</button>
    <div class="taskbar-apps"></div>
    <div class="system-tray">
      <span class="tray-item tray-visitors" title="Visitors online">${icon('users', 14)} <span class="tray-visitors-count">1</span></span>
      <span class="tray-item tray-location" title="Detecting location...">${icon('mapPin', 14)} <span class="tray-location-text">...</span></span>
      <span class="tray-item tray-wifi" title="WiFi: FBI_Surveillance_Van_7 | Signal: vibes">${icon('wifi', 14)}</span>
      <span class="tray-item tray-battery" title="Battery info">${icon('battery', 14)} <span class="tray-battery-text">--</span></span>
      <span class="tray-item tray-clock">${icon('clock', 14)} <span class="tray-clock-time"></span></span>
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
  updateClock(taskbar.querySelector('.tray-clock-time'))
  setInterval(() => updateClock(taskbar.querySelector('.tray-clock-time')), 1000)

  // Real battery API
  initBattery(taskbar)

  // Location from IP
  initLocation(taskbar)

  // Global taskbar updater
  window.__updateTaskbar = () => updateTaskbarApps(taskbar.querySelector('.taskbar-apps'))
}

async function initBattery(taskbar) {
  const textEl = taskbar.querySelector('.tray-battery-text')
  const trayEl = taskbar.querySelector('.tray-battery')
  try {
    if ('getBattery' in navigator) {
      const battery = await navigator.getBattery()
      const update = () => {
        const pct = Math.round(battery.level * 100)
        const charging = battery.charging
        textEl.textContent = `${pct}%`
        trayEl.title = charging
          ? `Battery: ${pct}% (charging — good, you'll need the energy)`
          : `Battery: ${pct}%${pct < 20 ? ' (you live dangerously)' : pct > 95 ? ' (still afraid to unplug)' : ''}`
      }
      update()
      battery.addEventListener('levelchange', update)
      battery.addEventListener('chargingchange', update)
    } else {
      // No Battery API (iOS Safari, Firefox)
      textEl.textContent = '99%'
      trayEl.title = "Battery: 99% — your browser won't tell me the real number"
    }
  } catch {
    textEl.textContent = '99%'
    trayEl.title = "Battery: unknown (I tried)"
  }
}

async function initLocation(taskbar) {
  const textEl = taskbar.querySelector('.tray-location-text')
  const trayEl = taskbar.querySelector('.tray-location')
  try {
    const controller = new AbortController()
    setTimeout(() => controller.abort(), 4000)
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal })
    if (!res.ok) throw new Error()
    const data = await res.json()
    if (data.city) {
      textEl.textContent = data.city
      trayEl.title = `Location: ${data.city}, ${data.region}, ${data.country_name}\nIP: ${data.ip}\nISP: ${data.org || 'unknown'}\n(Yes, we can see this. No, we don't store it.)`
    } else {
      textEl.textContent = 'Earth'
      trayEl.title = 'Location: Somewhere on Earth'
    }
  } catch {
    textEl.textContent = 'Earth'
    trayEl.title = 'Location: Could not detect — you might be a VPN user'
  }
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
  el.parentElement.title = `Local: ${time}\nArun's Time: ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' })} IST\n(yes, he's probably coding right now)`
}

function toggleStartMenu(desktopEl) {
  if (startMenuOpen) {
    closeStartMenu()
  } else {
    openStartMenu(desktopEl)
  }
}

function openStartMenu(desktopEl) {
  closeStartMenu()
  startMenuOpen = true

  const menu = document.createElement('div')
  menu.className = 'start-menu open'
  menu.id = 'start-menu'

  const apps = appList()

  menu.innerHTML = `
    <div class="start-menu-search">
      <div style="position:relative;">
        <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);opacity:0.3;">${icon('search', 14)}</span>
        <input type="text" placeholder="Search apps... (try 'salary')" id="start-search" style="padding-left:32px;" />
      </div>
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
      <span>ArunOS v${getYOE()}</span>
      <span class="start-menu-shutdown" style="cursor:pointer;display:flex;align-items:center;gap:4px;">${icon('power', 12)} Shut Down</span>
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
  menu.querySelector('.start-menu-shutdown').addEventListener('click', () => {
    import('../os/notifications.js').then(({ notify }) => {
      notify('Shut Down Failed', "Error: Cannot shut down. Have you considered that I'm a website?")
    })
    closeStartMenu()
  })
}

function handleStartSearch(query, menu) {
  const appsContainer = menu.querySelector('.start-menu-apps')
  const allApps = appList()

  const easterEggs = {
    'salary': 'Nice try, HR.',
    'password': 'It\'s "password123". Just kidding. Or am I?',
    'bugs': 'We don\'t have those here. Only undocumented features.',
    'fired': 'Error 403: This search is above your pay grade.',
    'coffee': 'Now we\'re talking. Essential system resource.',
    'girlfriend': '404: Not Found (insufficient time allocated)',
    'sleep': 'Module not found. Have you tried coffee instead?',
  }

  if (easterEggs[query]) {
    appsContainer.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:20px;color:rgba(255,255,255,0.5);font-size:13px;">${easterEggs[query]}</div>`
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
  `).join('') : `<div style="grid-column:1/-1;text-align:center;padding:20px;color:rgba(255,255,255,0.35);font-size:13px;">No results. Like my dating life.</div>`

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
