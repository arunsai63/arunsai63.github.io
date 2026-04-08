// Desktop — icons, wallpaper, right-click context menu
import { createWindow } from './window-manager.js'
import { openApp } from '../../apps/registry.js'
import { notify } from './notifications.js'
import { getYOE } from '../../shared/data.js'
import { icon } from '../../shared/icons.js'

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
  { id: 'portfolio', svg: 'layout', label: 'Portfolio', bg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' },
  { id: 'blog', svg: 'book', label: 'Blog', bg: 'linear-gradient(135deg, #ec4899, #db2777)' },
  { id: 'recycle-bin', svg: 'trash', label: 'Recycle Bin', bg: 'linear-gradient(135deg, #64748b, #475569)' },
]

export function renderDesktop(container) {
  container.innerHTML = `
    <div class="desktop">
      <div class="desktop-area"></div>
      <div class="dock-wrapper">
        <div class="dock"></div>
      </div>
    </div>
  `

  const dock = container.querySelector('.dock')

  desktopIcons.forEach(ic => {
    const el = document.createElement('div')
    el.className = 'dock-item'
    el.dataset.label = ic.label
    el.innerHTML = `
      <div class="dock-icon" style="background:${ic.bg};">${icon(ic.svg, 26, '#fff')}</div>
      <div class="dock-tooltip">${ic.label}</div>
      <div class="dock-dot"></div>
    `
    el.addEventListener('click', () => {
      el.classList.add('bouncing')
      el.addEventListener('animationend', () => el.classList.remove('bouncing'), { once: true })
      openApp(ic.id)
    })
    dock.appendChild(el)
  })

  // macOS-style magnification effect
  initDockMagnification(dock)

  // Right-click context menu
  const desktop = container.querySelector('.desktop')
  desktop.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    e.stopPropagation()
    closeContextMenu()
    if (!e.target.closest('.os-window')) {
      showContextMenu(e.clientX, e.clientY)
    }
  })

  // Close context menu on click or right-click elsewhere
  document.addEventListener('click', () => closeContextMenu())
  document.addEventListener('contextmenu', (e) => {
    if (!e.target.closest('.context-menu')) {
      closeContextMenu()
    }
  })

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
    { separator: true },
    { svg: 'monitor', label: 'Restart Into...', action: () => {
      import('../../shared/os-switcher.js').then(({ showOSSwitcher }) => showOSSwitcher('macos'))
    }},
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

function initDockMagnification(dock) {
  const items = [...dock.querySelectorAll('.dock-item')]
  const BASE = 48
  const MAX = 72
  const RANGE = 140

  // Track current sizes for smooth interpolation
  const sizes = items.map(() => BASE)
  let hovering = false
  let mouseX = 0
  let rafId = null

  function getTargets() {
    return items.map((item, i) => {
      if (!hovering) return BASE
      const iconEl = item.querySelector('.dock-icon')
      const rect = iconEl.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const dist = Math.abs(mouseX - centerX)
      const t = Math.max(0, 1 - dist / RANGE)
      // smooth cosine curve like real macOS
      return BASE + (MAX - BASE) * (0.5 + 0.5 * Math.cos(Math.PI * (1 - t)))
    })
  }

  function tick() {
    const targets = getTargets()
    let needsUpdate = false

    items.forEach((item, i) => {
      // Lerp toward target — instant when hovering, smooth ease-out when leaving
      const speed = hovering ? 0.45 : 0.2
      sizes[i] += (targets[i] - sizes[i]) * speed

      // Snap if close enough
      if (Math.abs(sizes[i] - targets[i]) < 0.3) {
        sizes[i] = targets[i]
      } else {
        needsUpdate = true
      }

      const s = sizes[i]
      const iconEl = item.querySelector('.dock-icon')
      iconEl.style.width = s + 'px'
      iconEl.style.height = s + 'px'
    })

    if (needsUpdate || hovering) {
      rafId = requestAnimationFrame(tick)
    } else {
      rafId = null
    }
  }

  function startLoop() {
    if (!rafId) rafId = requestAnimationFrame(tick)
  }

  dock.addEventListener('mouseenter', () => {
    hovering = true
    startLoop()
  })

  dock.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    if (!hovering) {
      hovering = true
      startLoop()
    }
  })

  dock.addEventListener('mouseleave', () => {
    hovering = false
    startLoop() // keep loop going to animate back to rest
  })
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
