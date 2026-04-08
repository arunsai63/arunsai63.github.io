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

  // Close on tap on backdrop or outside content
  shadeEl.addEventListener('click', (e) => {
    if (e.target === shadeEl || e.target.classList.contains('shade-backdrop')) {
      hideShade()
    }
  })

  container.appendChild(shadeEl)

  // Wire up quick settings
  wireQuickSettings()

  return shadeEl
}

const QS_SVGS = {
  wifi: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>`,
  bluetooth: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/></svg>`,
  bellOff: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>`,
  moon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>`,
  airplay: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>`,
  power: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/></svg>`,
  mapPin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
  zap: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>`,
}

function buildShadeHTML(expanded) {
  return `
    <div class="shade-backdrop"></div>
    <div class="shade-content ${expanded ? 'shade-expanded' : ''}">
      <div class="shade-handle" id="shade-handle">
        <div class="shade-handle-bar"></div>
      </div>

      <!-- Date + brightness -->
      <div class="shade-date-row">
        <span class="shade-date">${new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
        <span class="shade-brightness-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)"><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/></svg>
        </span>
      </div>

      <div class="shade-quick-settings ${expanded ? 'qs-expanded' : 'qs-collapsed'}">
        ${QUICK_SETTINGS.map(qs => `
          <div class="qs-tile ${qs.active ? 'qs-active' : ''}" data-qs-id="${qs.id}">
            <div class="qs-tile-icon">${QS_SVGS[qs.icon] || qs.icon}</div>
            <div class="qs-tile-text">
              <div class="qs-tile-label">${qs.label}</div>
              ${expanded ? `<div class="qs-tile-subtitle">${qs.subtitle}</div>` : ''}
            </div>
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
            <div class="shade-notif-icon-circle">${notif.icon}</div>
            <div class="shade-notif-body">
              <div class="shade-notif-app-row">
                <span class="shade-notif-app">${notif.app}</span>
                <span class="shade-notif-time">${notif.time}</span>
              </div>
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
