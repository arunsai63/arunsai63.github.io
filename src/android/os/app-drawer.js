// Android App Drawer — swipe up alphabetical app list
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

  const apps = getAppsForPlatform('android').sort((a, b) => a.label.localeCompare(b.label))

  drawerEl.innerHTML = `
    <div class="drawer-handle">
      <div class="drawer-handle-bar"></div>
    </div>
    <div class="drawer-search">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#888"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
      <input type="text" class="drawer-search-input" placeholder="Search apps" />
    </div>
    <div class="drawer-app-list" id="drawer-app-list">
      ${renderAppList(apps)}
    </div>
  `

  // Search
  const searchInput = drawerEl.querySelector('.drawer-search-input')
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim()
    const listEl = drawerEl.querySelector('#drawer-app-list')

    // Check easter eggs
    if (SEARCH_EASTER_EGGS[q]) {
      listEl.innerHTML = `
        <div style="text-align:center;padding:60px 20px;color:rgba(255,255,255,0.5);font-size:14px;">
          ${SEARCH_EASTER_EGGS[q]}
        </div>
      `
      return
    }

    const filtered = q ? apps.filter(a => a.label.toLowerCase().includes(q)) : apps
    listEl.innerHTML = renderAppList(filtered)
    wireAppClicks(listEl)
  })

  // Swipe down to close
  onSwipe(drawerEl, {
    down: () => hideDrawer()
  })

  wireAppClicks(drawerEl)

  container.appendChild(drawerEl)
  return drawerEl
}

function renderAppList(apps) {
  if (apps.length === 0) {
    return `<div style="text-align:center;padding:60px 20px;color:rgba(255,255,255,0.4);font-size:14px;">No apps found</div>`
  }

  // Group by first letter
  const groups = {}
  apps.forEach(app => {
    const letter = app.label[0].toUpperCase()
    if (!groups[letter]) groups[letter] = []
    groups[letter].push(app)
  })

  return Object.entries(groups).map(([letter, groupApps]) => `
    <div class="drawer-letter-header">${letter}</div>
    <div class="drawer-letter-group">
      ${groupApps.map(app => `
        <div class="drawer-app-item" data-app-id="${app.id}">
          <div class="drawer-app-icon" style="background:${app.iconBg}">
            ${androidIcon(app.iconName, 24)}
          </div>
          <span class="drawer-app-name">${app.label}</span>
        </div>
      `).join('')}
    </div>
  `).join('')
}

function wireAppClicks(container) {
  container.querySelectorAll('.drawer-app-item').forEach(item => {
    item.addEventListener('click', () => {
      const appId = item.dataset.appId
      hideDrawer()
      if (onAppOpen) onAppOpen(appId)
    })
  })
}

export function showDrawer() {
  if (drawerEl) drawerEl.classList.add('drawer-visible')
}

export function hideDrawer() {
  if (drawerEl) drawerEl.classList.remove('drawer-visible')
}

export function isDrawerVisible() {
  return drawerEl?.classList.contains('drawer-visible')
}
