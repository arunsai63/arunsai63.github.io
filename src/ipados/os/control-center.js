// iPadOS Control Center — real iOS-style with proper SVG icons
import { switchToOS } from '../../shared/os-detect.js'

// SVG icons matching real iOS Control Center
const CC_ICONS = {
  wifi: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>`,
  bluetooth: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/></svg>`,
  airplane: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>`,
  focus: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>`,
  airdrop: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
  mirror: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM9.5 7.5l-5 5 5 5v-3.5h5v-3h-5z"/></svg>`,
  switchOS: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
  brightness: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/></svg>`,
  volume: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`,
}

const TOGGLES = [
  { id: 'wifi',      icon: 'wifi',      label: 'Wi-Fi',            subtitle: 'FBI_Surveillance_Van_7', active: true },
  { id: 'bluetooth', icon: 'bluetooth', label: 'Bluetooth',        subtitle: "Arun's AirPods (∞)", active: true },
  { id: 'airplane',  icon: 'airplane',  label: 'Airplane Mode',    subtitle: 'Career on Cruise Altitude', active: false },
  { id: 'focus',     icon: 'focus',     label: 'Focus',            subtitle: 'Coding Mode', active: true },
  { id: 'airdrop',   icon: 'airdrop',   label: 'AirDrop',          subtitle: 'Everyone (incl. recruiters)', active: false },
  { id: 'mirror',    icon: 'mirror',    label: 'Screen Mirroring', subtitle: 'ArunOS TV', active: false },
  { id: 'switch',    icon: 'switchOS',  label: 'Switch Device',    subtitle: 'Change OS experience', active: false },
]

let ccEl = null
let ccVisible = false

export function initControlCenter(container) {
  ccEl = document.createElement('div')
  ccEl.className = 'ipados-cc'

  buildCC()

  // Backdrop closes
  ccEl.querySelector('.ipados-cc-backdrop').addEventListener('click', () => hideControlCenter())

  wireTiles()

  container.appendChild(ccEl)
}

function buildCC() {
  ccEl.innerHTML = `
    <div class="ipados-cc-backdrop"></div>
    <div class="ipados-cc-panel">
      <!-- Top group: connectivity (2x2 block) -->
      <div class="ipados-cc-top-row">
        <div class="ipados-cc-connectivity">
          ${TOGGLES.slice(0, 4).map(t => `
            <div class="ipados-cc-round-tile ${t.active ? 'ipados-cc-active' : ''}" data-cc-id="${t.id}" title="${t.subtitle}">
              <div class="ipados-cc-round-icon">${CC_ICONS[t.icon]}</div>
              <div class="ipados-cc-round-label">${t.label}</div>
            </div>
          `).join('')}
        </div>
        <div class="ipados-cc-connectivity">
          ${TOGGLES.slice(4).map(t => `
            <div class="ipados-cc-round-tile ${t.active ? 'ipados-cc-active' : ''}" data-cc-id="${t.id}" title="${t.subtitle}">
              <div class="ipados-cc-round-icon">${CC_ICONS[t.icon]}</div>
              <div class="ipados-cc-round-label">${t.label}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Sliders -->
      <div class="ipados-cc-slider-group">
        <div class="ipados-cc-slider" data-slider="brightness">
          <span class="ipados-cc-slider-icon">${CC_ICONS.brightness}</span>
          <div class="ipados-cc-slider-track">
            <div class="ipados-cc-slider-fill" style="width:72%"></div>
          </div>
        </div>
        <div class="ipados-cc-slider" data-slider="volume">
          <span class="ipados-cc-slider-icon">${CC_ICONS.volume}</span>
          <div class="ipados-cc-slider-track">
            <div class="ipados-cc-slider-fill" style="width:45%"></div>
          </div>
        </div>
      </div>

      <!-- Now Playing mini widget -->
      <div class="ipados-cc-now-playing">
        <div class="ipados-cc-np-art">🎵</div>
        <div class="ipados-cc-np-info">
          <div class="ipados-cc-np-title">It Works on My Machine</div>
          <div class="ipados-cc-np-artist">Docker — ArunOS Radio</div>
        </div>
        <div class="ipados-cc-np-controls">
          <span class="ipados-cc-np-btn">⏮</span>
          <span class="ipados-cc-np-btn ipados-cc-np-play">▶</span>
          <span class="ipados-cc-np-btn">⏭</span>
        </div>
      </div>
    </div>
  `
}

function wireTiles() {
  ccEl.querySelectorAll('.ipados-cc-round-tile').forEach(tile => {
    tile.addEventListener('click', (e) => {
      e.stopPropagation()
      const id = tile.dataset.ccId

      if (id === 'switch') {
        hideControlCenter()
        showOSSwitcher()
        return
      }

      if (id === 'mirror') {
        const label = tile.querySelector('.ipados-cc-round-label')
        label.textContent = 'Searching...'
        let dots = 0
        const iv = setInterval(() => {
          dots = (dots + 1) % 4
          label.textContent = `Searching${'.'.repeat(dots)}`
        }, 400)
        setTimeout(() => {
          clearInterval(iv)
          label.textContent = 'No devices found'
          setTimeout(() => { label.textContent = 'Screen Mirroring' }, 2000)
        }, 3000)
        return
      }

      tile.classList.toggle('ipados-cc-active')
    })
  })

  // Slider click
  ccEl.querySelectorAll('.ipados-cc-slider-track').forEach(track => {
    track.addEventListener('click', (e) => {
      const rect = track.getBoundingClientRect()
      const pct = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100))
      track.querySelector('.ipados-cc-slider-fill').style.width = `${pct}%`
    })
  })
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
