// Android Notification Shade — pull-down quick settings + notifications
import { onDrag } from '../../shared/gestures.js'
import { switchToOS } from '../../shared/os-detect.js'

const QUICK_SETTINGS = [
  { id: 'wifi', icon: 'wifi', label: 'Wi-Fi', subtitle: 'FBI_Surveillance_Van_7', active: true },
  { id: 'bluetooth', icon: 'bluetooth', label: 'Bluetooth', subtitle: 'mechanical keyboard', active: true },
  { id: 'dnd', icon: 'bellOff', label: 'DND', subtitle: 'Do Not Deploy', active: false },
  { id: 'dark', icon: 'moon', label: 'Dark Mode', subtitle: 'Always.', active: true },
  { id: 'airplane', icon: 'airplay', label: 'Airplane', subtitle: 'Career on Autopilot', active: false },
  { id: 'power', icon: 'power', label: 'Restart', subtitle: 'Switch OS', active: false },
  { id: 'location', icon: 'mapPin', label: 'Location', subtitle: 'Detecting...', active: true },
  { id: 'flashlight', icon: 'zap', label: 'Flashlight', subtitle: 'Spotlight on Career', active: false },
]

const NOTIFICATIONS = [
  { app: 'GitHub', icon: '🐙', text: '3 new stars on arun-os (we both know it\'s you)', time: '2m' },
  { app: 'LinkedIn', icon: '💼', text: '47 recruiters viewed your profile (none will message back)', time: '15m' },
  { app: 'Stack Overflow', icon: '📚', text: 'Your answer got 10 upvotes', time: '1h' },
  { app: 'Gmail', icon: '📧', text: 'RE: RE: RE: FWD: RE: Urgent Production Issue', time: '3h' },
  { app: 'Calendar', icon: '📅', text: 'Standup in 5 minutes (prepare your excuses)', time: '4h' },
]

let shadeEl = null
let isExpanded = false

export function initNotificationShade(container) {
  shadeEl = document.createElement('div')
  shadeEl.className = 'android-notification-shade'
  shadeEl.innerHTML = buildShadeHTML(false)

  // Close on tap outside content
  shadeEl.addEventListener('click', (e) => {
    if (e.target === shadeEl) hideShade()
  })

  container.appendChild(shadeEl)

  // Wire up quick settings
  wireQuickSettings()

  return shadeEl
}

function buildShadeHTML(expanded) {
  const icon = (name) => `<span class="qs-icon">${name}</span>`

  return `
    <div class="shade-content ${expanded ? 'shade-expanded' : ''}">
      <div class="shade-handle" id="shade-handle">
        <div class="shade-handle-bar"></div>
      </div>

      <div class="shade-quick-settings ${expanded ? 'qs-expanded' : 'qs-collapsed'}">
        ${QUICK_SETTINGS.map(qs => `
          <div class="qs-tile ${qs.active ? 'qs-active' : ''}" data-qs-id="${qs.id}">
            <div class="qs-tile-icon">${qs.icon === 'power' ? '⏻' : qs.icon === 'wifi' ? '📶' : qs.icon === 'bluetooth' ? '🔵' : qs.icon === 'bellOff' ? '🔕' : qs.icon === 'moon' ? '🌙' : qs.icon === 'airplay' ? '✈️' : qs.icon === 'mapPin' ? '📍' : '⚡'}</div>
            ${expanded ? `
              <div class="qs-tile-label">${qs.label}</div>
              <div class="qs-tile-subtitle">${qs.subtitle}</div>
            ` : ''}
          </div>
        `).join('')}
      </div>

      <div class="shade-notifications">
        <div class="shade-notif-header">
          <span>Notifications</span>
          <button class="shade-clear-all" id="shade-clear-all">Clear all</button>
        </div>
        ${NOTIFICATIONS.map((notif, i) => `
          <div class="shade-notification" data-notif-idx="${i}">
            <div class="shade-notif-icon">${notif.icon}</div>
            <div class="shade-notif-body">
              <div class="shade-notif-app">${notif.app} <span class="shade-notif-time">${notif.time}</span></div>
              <div class="shade-notif-text">${notif.text}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `
}

function wireQuickSettings() {
  if (!shadeEl) return

  // Toggle expand/collapse
  const handle = shadeEl.querySelector('#shade-handle')
  if (handle) {
    handle.addEventListener('click', () => {
      isExpanded = !isExpanded
      shadeEl.innerHTML = buildShadeHTML(isExpanded)
      wireQuickSettings()
    })
  }

  // Quick settings tile clicks
  shadeEl.querySelectorAll('.qs-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const id = tile.dataset.qsId
      if (id === 'power') {
        // OS Switcher
        showPowerMenu()
        return
      }
      if (id === 'dark') {
        // Always dark mode joke
        const label = tile.querySelector('.qs-tile-subtitle')
        if (label) label.textContent = 'Light mode not available. Your eyes will thank me.'
        return
      }
      tile.classList.toggle('qs-active')
    })
  })

  // Clear all
  const clearBtn = shadeEl.querySelector('#shade-clear-all')
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      const notifs = shadeEl.querySelector('.shade-notifications')
      if (notifs) {
        notifs.innerHTML = `
          <div style="text-align:center;padding:40px 20px;color:rgba(255,255,255,0.4);font-size:14px;">
            Notifications cleared.<br>Your anxiety wasn't.
          </div>
        `
      }
    })
  }
}

function showPowerMenu() {
  hideShade()
  // Import and show OS switcher
  import('../../shared/os-detect.js').then(({ switchToOS }) => {
    const menu = document.createElement('div')
    menu.className = 'android-power-menu'
    menu.innerHTML = `
      <div class="power-menu-overlay" id="power-menu-close"></div>
      <div class="power-menu-content">
        <div class="power-menu-title">Restart into...</div>
        <button class="power-menu-btn" data-os="macos">
          <span class="power-menu-icon">🖥️</span>
          <span>macOS Desktop</span>
        </button>
        <button class="power-menu-btn" data-os="ipados">
          <span class="power-menu-icon">📱</span>
          <span>iPadOS Tablet</span>
        </button>
        <button class="power-menu-btn power-menu-current">
          <span class="power-menu-icon">📲</span>
          <span>Android (current)</span>
        </button>
      </div>
    `

    menu.querySelector('#power-menu-close').addEventListener('click', () => menu.remove())
    menu.querySelectorAll('.power-menu-btn[data-os]').forEach(btn => {
      btn.addEventListener('click', () => {
        switchToOS(btn.dataset.os)
      })
    })

    document.body.appendChild(menu)
  })
}

export function showShade() {
  if (!shadeEl) return
  shadeEl.classList.add('shade-visible')
}

export function hideShade() {
  if (!shadeEl) return
  shadeEl.classList.remove('shade-visible')
  isExpanded = false
}

export function isShadeVisible() {
  return shadeEl?.classList.contains('shade-visible')
}
