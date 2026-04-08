// iPadOS Home Screen — 6x4 grid with Spotlight search
import { getAppsForPlatform, getAppById, APP_MANIFEST } from '../../shared/app-manifest.js'
import { icon } from '../../shared/icons.js'
import { onSwipe } from '../../shared/gestures.js'

let onAppOpenCallback = null

// Calculator joke state
let calcTapCount = 0

const SPOTLIGHT_EASTER_EGGS = {
  salary: "Error 402: Payment Required. Have you tried negotiating?",
  password: "Nice try. It's 'password123'. Just kidding. Or am I?",
  bugs: "Found 2,147,483,647 results. Showing first 0.",
  girlfriend: "No results found. Try 'git commit -m \"forever alone\"'",
  sleep: "Sleep is not available on this device. Try coffee instead.",
  fired: "Relax. You can't get fired if you're the one deploying on Fridays.",
  coffee: "Brewing... This is the only search that actually returns results.",
  calculator: null, // handled specially
}

export function setHomeCallbacks(cbs) {
  onAppOpenCallback = cbs.onAppOpen
}

export function renderHomeScreen(container) {
  const home = document.createElement('div')
  home.className = 'ipados-home-screen'

  const apps = getAppsForPlatform('ipados')

  // 6x4 = 24 per page
  const PAGE_SIZE = 24
  const pages = []
  for (let i = 0; i < apps.length; i += PAGE_SIZE) {
    pages.push(apps.slice(i, i + PAGE_SIZE))
  }

  let currentPage = 0

  function buildHome() {
    home.innerHTML = `
      <div class="ipados-home-pages-wrapper">
        <div class="ipados-home-pages" id="ipados-home-pages">
          ${pages.map((pageApps, idx) => `
            <div class="ipados-home-page" data-page="${idx}">
              <div class="ipados-home-grid">
                ${pageApps.map(app => `
                  <div class="ipados-home-app" data-app-id="${app.id}">
                    <div class="ipados-home-icon-bg" style="background:${app.iconBg}">
                      ${icon(app.iconName, 30, '#fff')}
                    </div>
                    <span class="ipados-home-app-label">${app.label}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      ${pages.length > 1 ? `
        <div class="ipados-home-dots">
          ${pages.map((_, i) => `<div class="ipados-home-dot ${i === 0 ? 'active' : ''}"></div>`).join('')}
        </div>
      ` : ''}
    `

    // Wire app clicks
    home.querySelectorAll('.ipados-home-app').forEach(el => {
      el.addEventListener('click', () => {
        const appId = el.dataset.appId
        const bg = el.querySelector('.ipados-home-icon-bg')
        bg.classList.add('ipados-icon-pressed')
        setTimeout(() => bg.classList.remove('ipados-icon-pressed'), 200)
        if (onAppOpenCallback) onAppOpenCallback(appId)
      })
    })

    // Page swiping
    const pagesEl = home.querySelector('#ipados-home-pages')
    if (pagesEl) {
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
      })
    }

    // Swipe down from center -> Spotlight
    onSwipe(home, {
      down: (data) => {
        // Only trigger from center area (not edges)
        if (data.dy > 60) showSpotlight(home)
      },
    }, { threshold: 40 })
  }

  function updatePage() {
    const pagesEl = home.querySelector('#ipados-home-pages')
    if (pagesEl) pagesEl.style.transform = `translateX(-${currentPage * 100}%)`
    home.querySelectorAll('.ipados-home-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentPage)
    })
  }

  buildHome()
  container.appendChild(home)
  return home
}

function showSpotlight(homeEl) {
  // Don't stack spotlights
  if (homeEl.querySelector('.ipados-spotlight')) return

  const spotlight = document.createElement('div')
  spotlight.className = 'ipados-spotlight'
  spotlight.innerHTML = `
    <div class="ipados-spotlight-backdrop"></div>
    <div class="ipados-spotlight-content">
      <div class="ipados-spotlight-search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" class="ipados-spotlight-input" placeholder="Search" autofocus />
      </div>
      <div class="ipados-spotlight-results"></div>
    </div>
  `

  const input = spotlight.querySelector('.ipados-spotlight-input')
  const results = spotlight.querySelector('.ipados-spotlight-results')
  const backdrop = spotlight.querySelector('.ipados-spotlight-backdrop')

  // Close on backdrop tap
  backdrop.addEventListener('click', () => closeSpotlight(spotlight))

  // Search logic
  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase()
    if (!query) {
      results.innerHTML = '<div class="ipados-spotlight-hint">Siri Suggestions, but Siri quit.</div>'
      return
    }

    // Check easter eggs first
    const easterKey = Object.keys(SPOTLIGHT_EASTER_EGGS).find(k => query.includes(k))

    if (easterKey === 'calculator') {
      calcTapCount++
      if (calcTapCount >= 7) {
        results.innerHTML = `
          <div class="ipados-spotlight-easter">
            Fine. Here. Happy now?
          </div>
          <div class="ipados-spotlight-app-result" data-app-id="calculator">
            <div class="ipados-spotlight-app-icon" style="background:${APP_MANIFEST.calculator.iconBg}">
              ${icon('calculator', 22, '#fff')}
            </div>
            <span>Calculator</span>
          </div>
        `
        wireSpotlightResults(spotlight, results)
      } else {
        results.innerHTML = `
          <div class="ipados-spotlight-easter">
            Calculator is not available on iPad. Apple couldn't figure out how to make it bigger. Neither can we.
            <div class="ipados-spotlight-easter-sub">Tap count: ${calcTapCount}/7 - keep trying</div>
          </div>
        `
      }
      return
    }

    if (easterKey) {
      results.innerHTML = `<div class="ipados-spotlight-easter">${SPOTLIGHT_EASTER_EGGS[easterKey]}</div>`
      return
    }

    // Search apps
    const allApps = getAppsForPlatform('ipados')
    const matches = allApps.filter(app => app.label.toLowerCase().includes(query))

    if (matches.length === 0) {
      results.innerHTML = `<div class="ipados-spotlight-no-results">No results for "${input.value}"</div>`
      return
    }

    results.innerHTML = `
      <div class="ipados-spotlight-section-label">Applications</div>
      ${matches.map(app => `
        <div class="ipados-spotlight-app-result" data-app-id="${app.id}">
          <div class="ipados-spotlight-app-icon" style="background:${app.iconBg}">
            ${icon(app.iconName, 22, '#fff')}
          </div>
          <span>${app.label}</span>
        </div>
      `).join('')}
    `
    wireSpotlightResults(spotlight, results)
  })

  // Initial hint
  results.innerHTML = '<div class="ipados-spotlight-hint">Siri Suggestions, but Siri quit.</div>'

  // Escape key closes
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSpotlight(spotlight)
  })

  homeEl.appendChild(spotlight)
  requestAnimationFrame(() => {
    spotlight.classList.add('ipados-spotlight-visible')
    input.focus()
  })
}

function wireSpotlightResults(spotlight, results) {
  results.querySelectorAll('.ipados-spotlight-app-result').forEach(el => {
    el.addEventListener('click', () => {
      const appId = el.dataset.appId
      closeSpotlight(spotlight)
      if (onAppOpenCallback) onAppOpenCallback(appId)
    })
  })
}

function closeSpotlight(spotlight) {
  spotlight.classList.remove('ipados-spotlight-visible')
  setTimeout(() => spotlight.remove(), 300)
}
