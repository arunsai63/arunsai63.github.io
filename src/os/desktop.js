// Desktop — icons, wallpaper, right-click context menu
import { createWindow } from './window-manager.js'
import { openApp } from '../apps/registry.js'
import { notify } from './notifications.js'
import { getYOE } from '../shared/data.js'

const desktopIcons = [
  { id: 'about', icon: 'i', label: 'About Me' },
  { id: 'experience', icon: '%', label: 'Experience' },
  { id: 'skills', icon: '#', label: 'Skills.txt' },
  { id: 'terminal', icon: '>', label: 'Terminal' },
  { id: 'projects', icon: '~', label: 'Projects' },
  { id: 'contact', icon: '@', label: 'Contact' },
  { id: 'chat', icon: '&', label: 'Chat' },
  { id: 'calculator', icon: '+', label: 'Calculator' },
  { id: 'recycle-bin', icon: 'x', label: 'Recycle Bin' },
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

  desktopIcons.forEach(icon => {
    const el = document.createElement('div')
    el.className = 'desktop-icon'
    el.innerHTML = `
      <div class="desktop-icon-img">${icon.icon}</div>
      <div class="desktop-icon-label">${icon.label}</div>
    `
    el.addEventListener('click', () => openApp(icon.id))
    iconsContainer.appendChild(el)
  })

  // Right-click context menu
  const desktop = container.querySelector('.desktop')
  desktop.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    // Only show on desktop-area, not on windows
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
    { icon: '>', label: 'Open Terminal', shortcut: 'Ctrl+T', action: () => openApp('terminal') },
    { icon: '~', label: 'Open File Explorer', action: () => openApp('projects') },
    { separator: true },
    { icon: '#', label: 'Refresh My Career', action: () => notify('Career Refresh', 'Still a Solutions Architect. Still awesome.') },
    { icon: '^', label: 'Paste (from Stack Overflow)', action: () => notify('Clipboard', 'Nothing to paste. But we both know that\'s where your code comes from.') },
    { separator: true },
    { icon: '*', label: 'Change Wallpaper', action: () => openApp('settings') },
    { icon: '/', label: 'View Source', action: () => window.open('https://github.com/arunsai63/arunsai63.github.io', '_blank') },
    { icon: '?', label: 'About ArunOS', action: () => showAboutOS() },
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
    el.innerHTML = `<span>${item.icon}</span> ${item.label}${item.shortcut ? `<span class="context-menu-shortcut">${item.shortcut}</span>` : ''}`
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
    icon: '?',
    width: 420,
    height: 350,
    content: `
      <div style="text-align:center;padding:20px;">
        <div style="font-size:48px;margin-bottom:12px;font-family:'JetBrains Mono',monospace;color:#10b981;">A:</div>
        <h2 style="color:#ddd;margin-bottom:4px;font-size:18px;">ArunOS v${getYOE()}</h2>
        <p style="color:#666;margin-bottom:16px;font-size:13px;">"Stable" Build (debatable)</p>
        <div style="text-align:left;background:#111;padding:14px;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.8;color:#888;">
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
