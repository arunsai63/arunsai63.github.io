// iPadOS Dock — persistent glass morphism bottom dock
import { getAppsForPlatform, getAppById } from '../../shared/app-manifest.js'
import { icon } from '../../shared/icons.js'

// 10 pinned apps (first 10 from manifest) + divider + 3 recent slots
const PINNED_COUNT = 10
const RECENT_COUNT = 3

let recentApps = []
let onAppOpenCallback = null

export function setDockCallbacks(cbs) {
  onAppOpenCallback = cbs.onAppOpen
}

export function renderDock(container) {
  const dock = document.createElement('div')
  dock.className = 'ipados-dock-wrapper'

  const apps = getAppsForPlatform('ipados')
  const pinned = apps.slice(0, PINNED_COUNT)

  function buildDock() {
    const recentSlots = recentApps
      .filter(id => !pinned.find(a => a.id === id))
      .slice(0, RECENT_COUNT)
      .map(id => {
        const app = getAppById(id)
        return app ? { ...app, label: app.platforms?.ipados?.label || app.label } : null
      })
      .filter(Boolean)

    dock.innerHTML = `
      <div class="ipados-dock">
        <div class="ipados-dock-icons ipados-dock-pinned">
          ${pinned.map(app => `
            <div class="ipados-dock-icon" data-app-id="${app.id}" title="${app.label}">
              <div class="ipados-dock-icon-bg" style="background:${app.iconBg}">
                ${icon(app.iconName, 28, '#fff')}
              </div>
            </div>
          `).join('')}
        </div>
        ${recentSlots.length > 0 ? `
          <div class="ipados-dock-divider"></div>
          <div class="ipados-dock-icons ipados-dock-recent">
            ${recentSlots.map(app => `
              <div class="ipados-dock-icon" data-app-id="${app.id}" title="${app.label}">
                <div class="ipados-dock-icon-bg" style="background:${app.iconBg}">
                  ${icon(app.iconName, 28, '#fff')}
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `

    // Wire icon taps
    dock.querySelectorAll('.ipados-dock-icon').forEach(el => {
      el.addEventListener('click', () => {
        const appId = el.dataset.appId
        // Press animation
        const bg = el.querySelector('.ipados-dock-icon-bg')
        bg.classList.add('ipados-icon-pressed')
        setTimeout(() => bg.classList.remove('ipados-icon-pressed'), 200)
        if (onAppOpenCallback) onAppOpenCallback(appId)
      })
    })
  }

  buildDock()
  container.appendChild(dock)

  return dock
}

export function addRecentApp(appId) {
  recentApps = [appId, ...recentApps.filter(id => id !== appId)].slice(0, RECENT_COUNT + 2)
}
