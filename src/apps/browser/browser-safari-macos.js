// Safari Browser — macOS variant (dark mode, Ventura+ style)
import { createWindow } from '../../macos/os/window-manager.js'
import { createBrowserEngine, DEFAULT_BOOKMARKS } from './browser-engine.js'

const SAFARI_ICONS = {
  back: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  forward: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 12l4-4-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  share: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1v8M5 4l3-3 3 3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 8v5a2 2 0 002 2h6a2 2 0 002-2V8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  lock: `<svg width="10" height="10" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 7V5.5a2.5 2.5 0 015 0V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  reload: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13.5 8A5.5 5.5 0 112.5 8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M13.5 3v5h-5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  plus: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  sidebar: `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.3"/><line x1="6" y1="2" x2="6" y2="14" stroke="currentColor" stroke-width="1.3"/></svg>`,
}

function renderStartPage(container, engine) {
  container.innerHTML = `
    <div class="sfr-start">
      <div class="sfr-start-inner">
        <div class="sfr-start-search-wrap">
          <input class="sfr-start-search" type="text" placeholder="Search or enter website name" spellcheck="false" />
        </div>
        <div class="sfr-favorites-label">Favorites</div>
        <div class="sfr-favorites-grid">
          ${DEFAULT_BOOKMARKS.map(b => `
            <div class="sfr-favorite" data-url="${b.url}">
              <div class="sfr-favorite-icon" style="background:${b.color}">
                <span>${b.letter}</span>
              </div>
              <div class="sfr-favorite-label">${b.label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `

  container.querySelector('.sfr-start-search').addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      engine.navigate(e.target.value)
    }
  })

  container.querySelectorAll('.sfr-favorite').forEach(el => {
    el.addEventListener('click', () => engine.navigate(el.dataset.url))
  })
}

export function renderContent(el) {
  const engine = createBrowserEngine()
  const iframe = engine.createIframe()
  iframe.style.borderRadius = '0 0 12px 12px'

  el.style.cssText = 'padding:0;height:100%;display:flex;flex-direction:column;overflow:hidden;'
  el.innerHTML = `
    <div class="sfr-toolbar">
      <div class="sfr-toolbar-left">
        <button class="sfr-btn sfr-btn-back" title="Back" disabled>${SAFARI_ICONS.back}</button>
        <button class="sfr-btn sfr-btn-forward" title="Forward" disabled>${SAFARI_ICONS.forward}</button>
      </div>
      <div class="sfr-url-bar">
        <span class="sfr-url-lock">${SAFARI_ICONS.lock}</span>
        <input class="sfr-url-input" type="text" placeholder="Search or enter website name" spellcheck="false" />
        <button class="sfr-btn sfr-btn-reload" title="Reload">${SAFARI_ICONS.reload}</button>
      </div>
      <div class="sfr-toolbar-right">
        <button class="sfr-btn" title="Share">${SAFARI_ICONS.share}</button>
        <button class="sfr-btn" title="New Tab">${SAFARI_ICONS.plus}</button>
      </div>
    </div>
    <div class="sfr-tab-bar">
      <div class="sfr-tab sfr-tab-active">
        <span class="sfr-tab-title">Start Page</span>
        <button class="sfr-tab-close">&times;</button>
      </div>
      <button class="sfr-tab-new" title="New Tab">${SAFARI_ICONS.plus}</button>
    </div>
    <div class="sfr-loading-bar"><div class="sfr-loading-progress"></div></div>
    <div class="sfr-content-area"></div>

    <style>
      .sfr-toolbar {
        display: flex; align-items: center; gap: 8px;
        padding: 8px 12px; height: 40px; box-sizing: border-box;
        background: #323234; border-bottom: 1px solid rgba(255,255,255,0.08);
        flex-shrink: 0; user-select: none;
      }
      .sfr-toolbar-left, .sfr-toolbar-right {
        display: flex; align-items: center; gap: 2px; flex-shrink: 0;
      }
      .sfr-btn {
        background: none; border: none; color: #8e8e93; cursor: pointer;
        padding: 4px 6px; border-radius: 4px; display: flex; align-items: center;
        transition: color 0.15s, background 0.15s;
      }
      .sfr-btn:hover:not(:disabled) { color: #fff; background: rgba(255,255,255,0.08); }
      .sfr-btn:disabled { opacity: 0.3; cursor: default; }
      .sfr-url-bar {
        flex: 1; display: flex; align-items: center; gap: 6px;
        background: #1c1c1e; border-radius: 8px; padding: 0 10px;
        height: 28px; min-width: 0;
        border: 1px solid rgba(255,255,255,0.06);
        transition: border-color 0.2s;
      }
      .sfr-url-bar:focus-within { border-color: rgba(0,122,255,0.5); }
      .sfr-url-lock { color: #8e8e93; display: flex; align-items: center; flex-shrink: 0; }
      .sfr-url-input {
        flex: 1; background: none; border: none; outline: none;
        color: #e5e5e7; font-size: 12.5px; font-family: -apple-system, 'SF Pro Text', 'Inter', sans-serif;
        text-align: center; min-width: 0;
      }
      .sfr-url-input::placeholder { color: #636366; }
      .sfr-url-input:focus { text-align: left; }
      .sfr-btn-reload { padding: 2px; }

      .sfr-tab-bar {
        display: flex; align-items: center; gap: 2px;
        padding: 4px 12px; height: 30px; box-sizing: border-box;
        background: #2c2c2e; border-bottom: 1px solid rgba(255,255,255,0.06);
        flex-shrink: 0; user-select: none;
      }
      .sfr-tab {
        display: flex; align-items: center; gap: 6px;
        padding: 3px 10px; border-radius: 6px; font-size: 11px;
        color: #8e8e93; cursor: pointer; max-width: 200px;
        transition: background 0.15s;
      }
      .sfr-tab:hover { background: rgba(255,255,255,0.05); }
      .sfr-tab-active {
        background: rgba(255,255,255,0.1); color: #e5e5e7;
      }
      .sfr-tab-title {
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      }
      .sfr-tab-close {
        background: none; border: none; color: #636366; cursor: pointer;
        font-size: 14px; line-height: 1; padding: 0 2px;
        border-radius: 3px; transition: color 0.15s, background 0.15s;
      }
      .sfr-tab-close:hover { color: #fff; background: rgba(255,255,255,0.1); }
      .sfr-tab-new {
        background: none; border: none; color: #636366; cursor: pointer;
        padding: 2px 4px; border-radius: 4px; display: flex; align-items: center;
        transition: color 0.15s;
      }
      .sfr-tab-new:hover { color: #aaa; }

      .sfr-loading-bar {
        height: 2px; background: transparent; flex-shrink: 0;
        overflow: hidden; position: relative;
      }
      .sfr-loading-progress {
        position: absolute; top: 0; left: 0; height: 100%;
        width: 0; background: #007AFF;
        transition: width 0.3s ease;
      }
      .sfr-loading-bar.sfr-loading .sfr-loading-progress {
        width: 70%;
        transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .sfr-loading-bar.sfr-loaded .sfr-loading-progress {
        width: 100%;
        transition: width 0.2s ease;
      }

      .sfr-content-area {
        flex: 1; position: relative; overflow: hidden;
        display: flex; flex-direction: column;
        background: #1c1c1e;
      }
      .sfr-content-area iframe { border-radius: 0 0 12px 12px; }

      /* Start page */
      .sfr-start {
        flex: 1; display: flex; justify-content: center; align-items: flex-start;
        padding: 60px 20px 20px;
        background: radial-gradient(ellipse at 50% 0%, rgba(0,122,255,0.06), transparent 60%),
                    #1c1c1e;
        overflow-y: auto;
      }
      .sfr-start-inner { width: 100%; max-width: 480px; }
      .sfr-start-search-wrap { margin-bottom: 36px; }
      .sfr-start-search {
        width: 100%; padding: 10px 16px; border-radius: 10px;
        background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.08);
        color: #e5e5e7; font-size: 14px; outline: none;
        font-family: -apple-system, 'SF Pro Text', 'Inter', sans-serif;
        box-sizing: border-box; transition: border-color 0.2s;
      }
      .sfr-start-search:focus { border-color: rgba(0,122,255,0.5); }
      .sfr-start-search::placeholder { color: #636366; }
      .sfr-favorites-label {
        font-size: 20px; font-weight: 600; color: #e5e5e7;
        margin-bottom: 16px;
      }
      .sfr-favorites-grid {
        display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
      }
      .sfr-favorite {
        display: flex; flex-direction: column; align-items: center;
        gap: 8px; cursor: pointer;
      }
      .sfr-favorite-icon {
        width: 52px; height: 52px; border-radius: 14px;
        display: flex; align-items: center; justify-content: center;
        font-size: 22px; font-weight: 700; color: #fff;
        transition: transform 0.15s;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      }
      .sfr-favorite:hover .sfr-favorite-icon { transform: scale(1.08); }
      .sfr-favorite-label {
        font-size: 11px; color: #8e8e93; text-align: center;
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        max-width: 80px;
      }

      @media (max-width: 600px) {
        .sfr-toolbar-right { display: none; }
        .sfr-favorites-grid { grid-template-columns: repeat(2, 1fr); }
      }
    </style>
  `

  const contentArea = el.querySelector('.sfr-content-area')
  const urlInput = el.querySelector('.sfr-url-input')
  const backBtn = el.querySelector('.sfr-btn-back')
  const fwdBtn = el.querySelector('.sfr-btn-forward')
  const reloadBtn = el.querySelector('.sfr-btn-reload')
  const loadingBar = el.querySelector('.sfr-loading-bar')
  const tabTitle = el.querySelector('.sfr-tab-title')

  // Show start page initially
  renderStartPage(contentArea, engine)

  // Append iframe (hidden initially)
  contentArea.appendChild(iframe)

  // URL bar navigation
  urlInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      engine.navigate(e.target.value)
      e.target.blur()
    }
  })
  urlInput.addEventListener('focus', () => {
    const state = engine.getState()
    if (state.url) urlInput.value = state.url
    urlInput.select()
  })
  urlInput.addEventListener('blur', () => {
    const state = engine.getState()
    urlInput.value = state.displayUrl
  })

  // Nav buttons
  backBtn.addEventListener('click', () => engine.goBack())
  fwdBtn.addEventListener('click', () => engine.goForward())
  reloadBtn.addEventListener('click', () => engine.refresh())

  // State updates
  engine.onStateChange(state => {
    backBtn.disabled = !state.canGoBack
    fwdBtn.disabled = !state.canGoForward
    urlInput.value = document.activeElement === urlInput ? state.url : state.displayUrl
    tabTitle.textContent = state.isStartPage ? 'Start Page' : (state.displayUrl || 'Loading...')

    // Loading bar
    loadingBar.classList.remove('sfr-loading', 'sfr-loaded')
    if (state.loading) {
      loadingBar.classList.add('sfr-loading')
    } else if (state.url) {
      loadingBar.classList.add('sfr-loaded')
      setTimeout(() => loadingBar.classList.remove('sfr-loaded'), 400)
    }

    // Toggle start page vs iframe
    const startPage = contentArea.querySelector('.sfr-start')
    if (state.isStartPage) {
      if (!startPage) renderStartPage(contentArea, engine)
      iframe.style.display = 'none'
    } else {
      if (startPage) startPage.remove()
      iframe.style.display = 'block'
    }
  })
}

export function open() {
  createWindow({
    id: 'browser',
    title: 'Safari',
    icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#007AFF" stroke-width="1.2"/><polygon points="8,3.5 9.5,6.5 12.5,8 9.5,9.5 8,12.5 6.5,9.5 3.5,8 6.5,6.5" fill="#007AFF" opacity="0.6"/><line x1="8" y1="3" x2="8" y2="5" stroke="#FF3B30" stroke-width="1" stroke-linecap="round"/><line x1="8" y1="11" x2="8" y2="13" stroke="#fff" stroke-width="1" stroke-linecap="round"/></svg>`,
    width: 960,
    height: 640,
    content: (contentEl) => renderContent(contentEl),
  })
}
