// Desktop — icons, wallpaper, right-click context menu
import { createWindow } from './window-manager.js'
import { openApp } from '../apps/registry.js'
import { notify } from './notifications.js'
import { getYOE } from '../shared/data.js'
import { icon } from '../shared/icons.js'

// Each icon has a gradient background + white SVG icon — like macOS app icons
const desktopIcons = [
  { id: 'about', svg: 'user', label: 'About Me', bg: 'linear-gradient(135deg, #3b82f6, #2563eb)' },
  { id: 'experience', svg: 'briefcase', label: 'Experience', bg: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  { id: 'skills', svg: 'fileText', label: 'Skills.txt', bg: 'linear-gradient(135deg, #10b981, #059669)' },
  { id: 'terminal', svg: 'terminal', label: 'Terminal', bg: 'linear-gradient(135deg, #1e1e1e, #333)' },
  { id: 'projects', svg: 'folder', label: 'Projects', bg: 'linear-gradient(135deg, #6366f1, #4f46e5)' },
  { id: 'contact', svg: 'mail', label: 'Contact', bg: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' },
  { id: 'chat', svg: 'messageCircle', label: 'Chat', bg: 'linear-gradient(135deg, #22c55e, #16a34a)' },
  { id: 'calculator', svg: 'calculator', label: 'Calculator', bg: 'linear-gradient(135deg, #f97316, #ea580c)' },
  { id: 'recycle-bin', svg: 'trash', label: 'Recycle Bin', bg: 'linear-gradient(135deg, #64748b, #475569)' },
]

export function renderDesktop(container) {
  container.innerHTML = `
    <div class="desktop">
      <div class="desktop-area">
        <div class="desktop-icons"></div>
      </div>
    </div>
  `

  const iconsContainer = container.querySelector('.desktop-icons')

  desktopIcons.forEach(ic => {
    const el = document.createElement('div')
    el.className = 'desktop-icon'
    el.innerHTML = `
      <div class="desktop-icon-img" style="background:${ic.bg};box-shadow:0 4px 12px rgba(0,0,0,0.3);">${icon(ic.svg, 26, '#fff')}</div>
      <div class="desktop-icon-label">${ic.label}</div>
    `
    el.addEventListener('click', () => openApp(ic.id))
    iconsContainer.appendChild(el)
  })

  // Right-click context menu
  const desktop = container.querySelector('.desktop')
  desktop.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    if (!e.target.closest('.os-window')) {
      showContextMenu(e.clientX, e.clientY)
    }
  })

  // Close context menu on click
  document.addEventListener('click', () => closeContextMenu())
  document.addEventListener('contextmenu', () => closeContextMenu())

  return container.querySelector('.desktop')
}

function showContextMenu(x, y) {
  closeContextMenu()

  const menu = document.createElement('div')
  menu.className = 'context-menu'
  menu.id = 'desktop-context-menu'
  menu.style.left = x + 'px'
  menu.style.top = y + 'px'

  const items = [
    { svg: 'terminal', label: 'Open Terminal', shortcut: 'Ctrl+T', action: () => openApp('terminal') },
    { svg: 'folder', label: 'Open File Explorer', action: () => openApp('projects') },
    { separator: true },
    { svg: 'refresh', label: 'Refresh My Career', action: () => notify('Career Refresh', 'Still a Solutions Architect. Still awesome.') },
    { svg: 'clipboard', label: 'Paste (from Stack Overflow)', action: () => notify('Clipboard', 'Nothing to paste. But we both know that\'s where your code comes from.') },
    { separator: true },
    { svg: 'palette', label: 'Change Wallpaper', action: () => openApp('settings') },
    { svg: 'externalLink', label: 'View Source', action: () => window.open('https://github.com/arunsai63/arunsai63.github.io', '_blank') },
    { svg: 'info', label: 'About ArunOS', action: () => showAboutOS() },
  ]

  items.forEach(item => {
    if (item.separator) {
      const sep = document.createElement('div')
      sep.className = 'context-menu-separator'
      menu.appendChild(sep)
      return
    }
    const el = document.createElement('div')
    el.className = 'context-menu-item'
    el.innerHTML = `<span class="context-menu-icon">${icon(item.svg, 16, '#888')}</span> ${item.label}${item.shortcut ? `<span class="context-menu-shortcut">${item.shortcut}</span>` : ''}`
    el.addEventListener('click', (e) => {
      e.stopPropagation()
      closeContextMenu()
      item.action()
    })
    menu.appendChild(el)
  })

  document.body.appendChild(menu)

  // Keep in viewport
  const rect = menu.getBoundingClientRect()
  if (rect.right > window.innerWidth) menu.style.left = (x - rect.width) + 'px'
  if (rect.bottom > window.innerHeight) menu.style.top = (y - rect.height) + 'px'
}

function closeContextMenu() {
  const existing = document.getElementById('desktop-context-menu')
  if (existing) existing.remove()
}

function showAboutOS() {
  createWindow({
    id: 'about-os',
    title: 'About ArunOS',
    icon: icon('monitor', 16),
    width: 420,
    height: 380,
    content: `
      <div style="text-align:center;padding:20px;">
        <div style="margin-bottom:16px;">${icon('monitor', 56, '#10b981')}</div>
        <h2 style="color:#ddd;margin-bottom:4px;font-size:18px;">ArunOS v${getYOE()}</h2>
        <p style="color:#666;margin-bottom:16px;font-size:13px;">"Stable" Build (debatable)</p>
        <div style="text-align:left;background:rgba(0,0,0,0.3);padding:14px;border-radius:10px;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.8;color:rgba(255,255,255,0.6);">
          <div><span style="color:#10b981;">Processor:</span> 1x Overclocked Brain (thermal throttles under deadlines)</div>
          <div><span style="color:#10b981;">RAM:</span> Not enough. Never enough.</div>
          <div><span style="color:#10b981;">Storage:</span> 90% Stack Overflow bookmarks</div>
          <div><span style="color:#10b981;">Uptime:</span> ${getYOE()} years (and counting)</div>
          <div><span style="color:#10b981;">Kernel:</span> Full Stack Engineering</div>
          <div><span style="color:#10b981;">Shell:</span> coffee-driven-development</div>
        </div>
        <p style="color:#444;font-size:11px;margin-top:16px;">Built with mass amounts of caffeine by Arun Munaganti.<br>No frameworks were harmed in the making of this OS.</p>
      </div>
    `,
  })
}
