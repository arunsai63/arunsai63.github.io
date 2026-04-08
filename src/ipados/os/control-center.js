// iPadOS Control Center — swipe from top-right
import { switchToOS } from '../../shared/os-detect.js'

const TOGGLES = [
  { id: 'wifi',       icon: '📶', label: 'Wi-Fi',           subtitle: 'FBI_Surveillance_Van_7', active: true },
  { id: 'bluetooth',  icon: '🔵', label: 'Bluetooth',       subtitle: "Arun's AirPods (Battery: \u221E)", active: true },
  { id: 'airplane',   icon: '✈️', label: 'Airplane Mode',   subtitle: 'Career on Cruise Altitude', active: false },
  { id: 'focus',      icon: '🌙', label: 'Focus',           subtitle: 'Coding Mode', active: true },
  { id: 'airdrop',    icon: '📡', label: 'AirDrop',         subtitle: 'Receiving from: Everyone', active: false },
  { id: 'mirror',     icon: '📺', label: 'Screen Mirroring', subtitle: 'ArunOS TV (connecting... forever)', active: false },
  { id: 'switch',     icon: '🔄', label: 'Switch Device',   subtitle: 'Change OS', active: false },
]

let ccEl = null
let ccVisible = false

export function initControlCenter(container) {
  ccEl = document.createElement('div')
  ccEl.className = 'ipados-cc'

  ccEl.innerHTML = `
    <div class="ipados-cc-backdrop"></div>
    <div class="ipados-cc-panel">
      <div class="ipados-cc-grid">
        ${TOGGLES.map(t => `
          <div class="ipados-cc-tile ${t.active ? 'ipados-cc-active' : ''}" data-cc-id="${t.id}">
            <div class="ipados-cc-tile-icon">${t.icon}</div>
            <div class="ipados-cc-tile-label">${t.label}</div>
            <div class="ipados-cc-tile-sub">${t.subtitle}</div>
          </div>
        `).join('')}
      </div>

      <div class="ipados-cc-sliders">
        <div class="ipados-cc-slider-row">
          <span class="ipados-cc-slider-icon">☀️</span>
          <div class="ipados-cc-slider-track">
            <div class="ipados-cc-slider-fill" style="width:72%"></div>
          </div>
        </div>
        <div class="ipados-cc-slider-row">
          <span class="ipados-cc-slider-icon">🔊</span>
          <div class="ipados-cc-slider-track">
            <div class="ipados-cc-slider-fill" style="width:50%"></div>
          </div>
        </div>
      </div>
    </div>
  `

  // Backdrop closes
  ccEl.querySelector('.ipados-cc-backdrop').addEventListener('click', () => hideControlCenter())

  // Tile interactions
  ccEl.querySelectorAll('.ipados-cc-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const id = tile.dataset.ccId

      if (id === 'switch') {
        hideControlCenter()
        showOSSwitcher()
        return
      }

      if (id === 'focus') {
        const sub = tile.querySelector('.ipados-cc-tile-sub')
        if (tile.classList.contains('ipados-cc-active')) {
          sub.textContent = 'Coding Mode: OFF (good luck)'
        } else {
          sub.textContent = 'Coding Mode'
        }
      }

      if (id === 'airplane') {
        const sub = tile.querySelector('.ipados-cc-tile-sub')
        if (!tile.classList.contains('ipados-cc-active')) {
          sub.textContent = 'Career ascending...'
        } else {
          sub.textContent = 'Career on Cruise Altitude'
        }
      }

      if (id === 'mirror') {
        const sub = tile.querySelector('.ipados-cc-tile-sub')
        sub.textContent = 'ArunOS TV (connecting... forever)'
        // Fun animation
        let dots = 0
        const iv = setInterval(() => {
          dots = (dots + 1) % 4
          sub.textContent = `Searching${'.'.repeat(dots)}`
        }, 400)
        setTimeout(() => {
          clearInterval(iv)
          sub.textContent = 'No devices found. As expected.'
        }, 3000)
        return
      }

      tile.classList.toggle('ipados-cc-active')
    })
  })

  // Decorative slider drag
  ccEl.querySelectorAll('.ipados-cc-slider-track').forEach(track => {
    track.addEventListener('click', (e) => {
      const rect = track.getBoundingClientRect()
      const pct = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100))
      track.querySelector('.ipados-cc-slider-fill').style.width = `${pct}%`
    })
  })

  container.appendChild(ccEl)
}

export function showControlCenter() {
  if (!ccEl) return
  ccVisible = true
  ccEl.classList.add('ipados-cc-visible')
}

export function hideControlCenter() {
  if (!ccEl) return
  ccVisible = false
  ccEl.classList.remove('ipados-cc-visible')
}

export function toggleControlCenter() {
  ccVisible ? hideControlCenter() : showControlCenter()
}

export function isControlCenterVisible() {
  return ccVisible
}

function showOSSwitcher() {
  const menu = document.createElement('div')
  menu.className = 'ipados-os-switcher'
  menu.innerHTML = `
    <div class="ipados-os-switcher-backdrop"></div>
    <div class="ipados-os-switcher-content">
      <div class="ipados-os-switcher-title">Switch Device</div>
      <button class="ipados-os-switcher-btn" data-os="macos">
        <span>🖥️</span>
        <span>macOS Desktop</span>
      </button>
      <button class="ipados-os-switcher-btn" data-os="android">
        <span>📱</span>
        <span>Android Phone</span>
      </button>
      <button class="ipados-os-switcher-btn ipados-os-switcher-current">
        <span>📲</span>
        <span>iPadOS (current)</span>
      </button>
    </div>
  `

  menu.querySelector('.ipados-os-switcher-backdrop').addEventListener('click', () => menu.remove())
  menu.querySelectorAll('.ipados-os-switcher-btn[data-os]').forEach(btn => {
    btn.addEventListener('click', () => switchToOS(btn.dataset.os))
  })

  document.body.appendChild(menu)
}
