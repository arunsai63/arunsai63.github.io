// Android App Drawer — grid-based app menu
import { getAppsForPlatform } from '../../shared/app-manifest.js'
import { icon } from '../../shared/icons.js'
import { androidIcon } from './android-icons.js'
import { onSwipe } from '../../shared/gestures.js'

const SEARCH_EASTER_EGGS = {
  salary: 'Nice try, HR.',
  password: "It's 'password123'. Just kidding. Or am I?",
  bugs: "We don't have those here. Only undocumented features.",
  girlfriend: '404: Not Found (insufficient time allocated)',
  sleep: 'Module not found. Have you tried coffee instead?',
  fired: 'sudo: permission denied. You are unfireable.',
  coffee: 'Brewing... ☕ Always available.',
}

let drawerEl = null
let onAppOpen = null

export function initAppDrawer(container, callbacks) {
  onAppOpen = callbacks.onAppOpen
  drawerEl = document.createElement('div')
  drawerEl.className = 'android-app-drawer'

  const apps = getAppsForPlatform('android')

  drawerEl.innerHTML = `
    <div class="drawer-backdrop"></div>
    <div class="drawer-panel">
      <div class="drawer-handle">
        <div class="drawer-handle-bar"></div>
      </div>
      <div class="drawer-search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        <input type="text" class="drawer-search-input" placeholder="Search apps" />
      </div>
      <div class="drawer-grid" id="drawer-grid">
        ${renderGrid(apps)}
      </div>
    </div>
  `

  // Search
  const searchInput = drawerEl.querySelector('.drawer-search-input')
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim()
    const gridEl = drawerEl.querySelector('#drawer-grid')

    if (SEARCH_EASTER_EGGS[q]) {
      gridEl.innerHTML = `
        <div class="drawer-easter-egg">${SEARCH_EASTER_EGGS[q]}</div>
      `
      return
    }

    const filtered = q ? apps.filter(a => a.label.toLowerCase().includes(q)) : apps
    gridEl.innerHTML = filtered.length ? renderGrid(filtered) : `<div class="drawer-easter-egg">No apps found for "${searchInput.value}"</div>`
    wireGridClicks(gridEl)
  })

  // Close on backdrop tap
  drawerEl.querySelector('.drawer-backdrop').addEventListener('click', () => hideDrawer())

  // Swipe down on handle to close
  const handle = drawerEl.querySelector('.drawer-handle')
  handle.addEventListener('click', () => hideDrawer())
  onSwipe(drawerEl.querySelector('.drawer-panel'), { down: () => hideDrawer() })

  wireGridClicks(drawerEl)

  container.appendChild(drawerEl)
  return drawerEl
}

function renderGrid(apps) {
  return apps.map(app => `
    <div class="drawer-grid-item" data-app-id="${app.id}">
      <div class="drawer-grid-icon" style="background:${app.iconBg}">
        ${androidIcon(app.iconName, 28)}
      </div>
      <span class="drawer-grid-label">${app.label}</span>
    </div>
  `).join('')
}

function wireGridClicks(container) {
  container.querySelectorAll('.drawer-grid-item').forEach(item => {
    item.addEventListener('click', () => {
      const appId = item.dataset.appId
      // Press feedback
      const ic = item.querySelector('.drawer-grid-icon')
      ic.style.transform = 'scale(0.88)'
      setTimeout(() => { ic.style.transform = '' }, 150)
      setTimeout(() => {
        hideDrawer()
        if (onAppOpen) onAppOpen(appId)
      }, 100)
    })
  })
}

export function showDrawer() {
  if (drawerEl) {
    drawerEl.classList.add('drawer-visible')
    // Focus search after animation
    setTimeout(() => {
      const input = drawerEl.querySelector('.drawer-search-input')
      if (input) input.focus()
    }, 350)
  }
}

export function hideDrawer() {
  if (drawerEl) {
    drawerEl.classList.remove('drawer-visible')
    // Clear search on close
    const input = drawerEl.querySelector('.drawer-search-input')
    if (input) input.value = ''
    const gridEl = drawerEl.querySelector('#drawer-grid')
    if (gridEl) {
      const apps = getAppsForPlatform('android')
      gridEl.innerHTML = renderGrid(apps)
      wireGridClicks(gridEl)
    }
  }
}

export function isDrawerVisible() {
  return drawerEl?.classList.contains('drawer-visible')
}
