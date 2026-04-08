// Android Home Screen — hyper-realistic Android 14 Material You
import { getAppsForPlatform } from '../../shared/app-manifest.js'
import { icon } from '../../shared/icons.js'
import { androidIcon } from './android-icons.js'
import { onSwipe, onLongPress } from '../../shared/gestures.js'

let onAppOpen = null
let onDrawerOpen = null

export function setHomeCallbacks(cbs) {
  onAppOpen = cbs.onAppOpen
  onDrawerOpen = cbs.onDrawerOpen
}

export function renderHomeScreen(container) {
  const home = document.createElement('div')
  home.className = 'android-home-screen'

  const apps = getAppsForPlatform('android')

  // Split apps into pages (max 20 per page = 4 cols x 5 rows)
  const PAGE_SIZE = 20
  const pages = []
  for (let i = 0; i < apps.length; i += PAGE_SIZE) {
    pages.push(apps.slice(i, i + PAGE_SIZE))
  }

  let currentPage = 0

  home.innerHTML = `
    <div class="home-search-bar">
      <div class="home-search-pill">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#888"/>
        </svg>
        <span class="home-search-text">Search apps & more</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" fill="#888"/>
        </svg>
      </div>
    </div>

    <div class="home-pages-wrapper">
      <div class="home-pages" id="home-pages">
        ${pages.map((pageApps, pageIdx) => `
          <div class="home-page" data-page="${pageIdx}">
            <div class="home-app-grid">
              ${pageApps.map(app => `
                <div class="home-app-icon" data-app-id="${app.id}">
                  <div class="home-icon-bg" style="background:${app.iconBg}">
                    ${androidIcon(app.iconName, 28)}
                  </div>
                  <span class="home-app-label">${app.label}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="home-page-dots">
      ${pages.map((_, i) => `<div class="home-dot ${i === 0 ? 'active' : ''}"></div>`).join('')}
    </div>
  `

  // App icon clicks
  home.querySelectorAll('.home-app-icon').forEach(iconEl => {
    iconEl.addEventListener('click', () => {
      const appId = iconEl.dataset.appId
      // Ripple effect
      iconEl.querySelector('.home-icon-bg').classList.add('icon-pressed')
      setTimeout(() => {
        iconEl.querySelector('.home-icon-bg').classList.remove('icon-pressed')
      }, 150)
      if (onAppOpen) onAppOpen(appId)
    })

    // Long press animation
    onLongPress(iconEl, () => {
      iconEl.classList.add('icon-wiggle')
      setTimeout(() => iconEl.classList.remove('icon-wiggle'), 600)
    }, 400)
  })

  // Page swiping
  const pagesEl = home.querySelector('#home-pages')
  onSwipe(pagesEl, {
    left: () => {
      if (currentPage < pages.length - 1) {
        currentPage++
        updatePage()
      }
    },
    right: () => {
      if (currentPage > 0) {
        currentPage--
        updatePage()
      }
    },
    up: () => {
      if (onDrawerOpen) onDrawerOpen()
    }
  })

  function updatePage() {
    pagesEl.style.transform = `translateX(-${currentPage * 100}%)`
    home.querySelectorAll('.home-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentPage)
    })
  }

  container.appendChild(home)
  return home
}
