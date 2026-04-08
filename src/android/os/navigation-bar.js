// Android Navigation Bar — classic 3-button (back, home, recents)

let callbacks = {}

// Real Android nav bar SVG icons (triangle, circle, square)
const NAV_BACK = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="rgba(255,255,255,0.8)"/></svg>`
const NAV_HOME = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2"/></svg>`
const NAV_RECENTS = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2"/></svg>`

export function renderNavigationBar(container) {
  const nav = document.createElement('div')
  nav.className = 'android-nav-bar'
  nav.innerHTML = `
    <button class="android-nav-btn" id="nav-back" aria-label="Back">${NAV_BACK}</button>
    <button class="android-nav-btn android-nav-home-btn" id="nav-home" aria-label="Home">${NAV_HOME}</button>
    <button class="android-nav-btn" id="nav-recents" aria-label="Recent Apps">${NAV_RECENTS}</button>
  `

  nav.querySelector('#nav-back').addEventListener('click', () => {
    if (callbacks.onBack) callbacks.onBack()
  })

  nav.querySelector('#nav-home').addEventListener('click', () => {
    if (callbacks.onHome) callbacks.onHome()
  })

  nav.querySelector('#nav-recents').addEventListener('click', () => {
    if (callbacks.onRecents) callbacks.onRecents()
  })

  container.appendChild(nav)
  return nav
}

export function setNavCallbacks(cbs) {
  callbacks = cbs
}
