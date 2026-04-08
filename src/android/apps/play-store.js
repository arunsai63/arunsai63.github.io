// ArunOS Play Store — Android only, Google Play Store replica
import { getAppsForPlatform } from '../../shared/app-manifest.js'
import { getYOE } from '../../shared/data.js'
import { icon } from '../../shared/icons.js'

const REVIEWS = [
  { user: 'Definitely Not Arun', rating: 5, text: 'Works on my machine. 10/10 would deploy again.' },
  { user: 'Anonymous Recruiter', rating: 5, text: 'Impressive portfolio. Still won\'t respond to my LinkedIn message though.' },
  { user: 'A Coffee Machine', rating: 5, text: 'My best customer. 5 stars for loyalty.' },
  { user: 'Production Server', rating: 1, text: 'He keeps deploying on Fridays. Please make him stop.' },
  { user: 'node_modules/', rating: 5, text: 'I take up all the space and he still keeps me around. True love.' },
]

export function renderContent(el) {
  const apps = getAppsForPlatform('android')
  let view = 'home'
  let searchQuery = ''

  function render() {
    el.innerHTML = `
      <div style="font-family:var(--md-font,'Inter',sans-serif);color:var(--md-on-surface,#e6e1e5);">
        <!-- Search bar -->
        <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--md-surface-container-high,#2b292d);border-radius:28px;margin-bottom:16px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <input type="text" placeholder="Search ArunOS Store" value="${searchQuery}" style="flex:1;background:none;border:none;color:var(--md-on-surface,#e6e1e5);font-size:15px;font-family:inherit;outline:none;" id="store-search" />
        </div>

        ${searchQuery ? renderSearchResults() : renderHome()}
      </div>
    `

    const searchInput = el.querySelector('#store-search')
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value
        if (searchQuery.length > 2) render()
      })
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') render()
      })
    }

    // Update all button
    const updateBtn = el.querySelector('#store-update-all')
    if (updateBtn) {
      updateBtn.addEventListener('click', () => {
        updateBtn.textContent = 'All apps are already perfect. No updates needed.'
        updateBtn.style.background = 'rgba(255,255,255,0.04)'
        updateBtn.style.color = 'rgba(255,255,255,0.4)'
      })
    }
  }

  function renderHome() {
    return `
      <!-- Featured Banner -->
      <div style="background:linear-gradient(135deg,#00504a,#003731);padding:24px;border-radius:16px;margin-bottom:20px;">
        <div style="font-size:20px;font-weight:500;margin-bottom:8px;">ArunOS v${getYOE()}</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:16px;">Now with 100% more imposter syndrome!</div>
        <button id="store-update-all" style="padding:8px 20px;background:var(--md-primary,#80cbc4);color:#003731;border:none;border-radius:20px;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;">Update All</button>
      </div>

      <!-- Apps grid -->
      <div style="margin-bottom:16px;">
        <div style="font-size:16px;font-weight:500;margin-bottom:12px;">Installed Apps</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
          ${apps.slice(0, 9).map(app => `
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
              <div style="width:56px;height:56px;border-radius:14px;background:${app.iconBg};display:flex;align-items:center;justify-content:center;">
                ${icon(app.iconName, 24, '#fff')}
              </div>
              <div style="font-size:11px;text-align:center;color:rgba(255,255,255,0.7);">${app.label}</div>
              <div style="font-size:9px;color:rgba(255,255,255,0.3);">⭐ 5.0</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Reviews -->
      <div>
        <div style="font-size:16px;font-weight:500;margin-bottom:12px;">Reviews</div>
        ${REVIEWS.map(r => `
          <div style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <span style="font-size:13px;color:var(--md-on-surface,#e6e1e5);">${r.user}</span>
              <span style="font-size:11px;color:#f59e0b;">${'⭐'.repeat(r.rating)}</span>
            </div>
            <div style="font-size:13px;color:rgba(255,255,255,0.5);line-height:1.4;">${r.text}</div>
          </div>
        `).join('')}
      </div>

      <div style="text-align:center;padding:20px;font-size:11px;color:rgba(255,255,255,0.2);">
        ArunOS Store v${getYOE()} | Downloads: 1 (it's me, testing)
      </div>
    `
  }

  function renderSearchResults() {
    return `
      <div style="text-align:center;padding:60px 20px;">
        <div style="font-size:48px;margin-bottom:16px;">🔍</div>
        <div style="font-size:16px;color:var(--md-on-surface,#e6e1e5);margin-bottom:8px;">Did you mean: hire Arun?</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.4);">No results for "${searchQuery}". All the good apps are already installed.</div>
      </div>
    `
  }

  render()
}

export function open() { renderContent(document.createElement('div')) }
