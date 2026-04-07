import { createWindow } from '../os/window-manager.js'
import { filesys, profile } from '../shared/data.js'

export function open() {
  createWindow({
    id: 'projects',
    title: 'File Explorer — ~/projects',
    icon: '📁',
    width: 600,
    height: 420,
    content: (el) => {
      el.style.cssText = 'padding:0;font-family:"JetBrains Mono",monospace;font-size:13px;display:flex;flex-direction:column;'
      let currentPath = '~'

      function render(path) {
        currentPath = path
        const node = resolvePath(path)
        if (!node || node.type !== 'dir') return

        const breadcrumbs = path.split('/').map((part, i, arr) => {
          const fullPath = arr.slice(0, i + 1).join('/')
          return `<span class="breadcrumb" data-path="${fullPath}" style="cursor:pointer;color:#3b82f6;">${part}</span>`
        }).join(' <span style="color:#555;">/</span> ')

        el.innerHTML = `
          <div style="padding:8px 16px;background:#12122a;border-bottom:1px solid #222;display:flex;align-items:center;gap:8px;">
            <button class="nav-back" style="color:#666;font-size:16px;cursor:pointer;background:none;border:none;font-family:inherit;" ${path === '~' ? 'disabled' : ''}>←</button>
            <div style="flex:1;color:#888;font-size:12px;">📁 ${breadcrumbs}</div>
          </div>
          <div style="flex:1;overflow-y:auto;padding:8px;">
            ${Object.entries(node.children).map(([name, child]) => `
              <div class="file-item" data-name="${name}" data-type="${child.type}" style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:6px;cursor:pointer;transition:background 0.15s;">
                <span style="font-size:20px;">${child.type === 'dir' ? '📁' : name.endsWith('.pdf') ? '📄' : name.endsWith('.md') ? '📝' : '📃'}</span>
                <div style="flex:1;">
                  <div style="color:#ccc;">${name}</div>
                  <div style="color:#555;font-size:11px;">${child.type === 'dir' ? Object.keys(child.children).length + ' items' : Math.floor(Math.random() * 50 + 5) + ' KB'}</div>
                </div>
                ${name === 'resume.pdf' ? '<span style="color:#10b981;font-size:11px;">⬇ Download</span>' : ''}
              </div>
            `).join('')}
          </div>
          <div style="padding:6px 16px;background:#12122a;border-top:1px solid #222;font-size:11px;color:#555;">
            ${Object.keys(node.children).length} items | Path: ${path.replace('~', '/home/arun')}
          </div>
        `

        // File clicks
        el.querySelectorAll('.file-item').forEach(item => {
          item.addEventListener('dblclick', () => {
            const name = item.dataset.name
            const type = item.dataset.type
            if (type === 'dir') {
              render(currentPath + '/' + name)
            } else if (name === 'resume.pdf') {
              window.open('/resume.pdf', '_blank')
            } else {
              // Open file in a new window
              const child = resolvePath(currentPath + '/' + name)
              if (child && child.content) {
                createWindow({
                  id: 'file-' + name,
                  title: name,
                  icon: '📝',
                  width: 500,
                  height: 350,
                  content: `<pre style="white-space:pre-wrap;color:#aaa;font-family:'JetBrains Mono',monospace;font-size:13px;">${child.content}</pre>`,
                })
              }
            }
          })
          item.addEventListener('mouseenter', () => item.style.background = 'rgba(255,255,255,0.04)')
          item.addEventListener('mouseleave', () => item.style.background = '')
        })

        // Back button
        const backBtn = el.querySelector('.nav-back')
        if (backBtn) {
          backBtn.addEventListener('click', () => {
            const parts = currentPath.split('/')
            if (parts.length > 1) {
              parts.pop()
              render(parts.join('/'))
            }
          })
        }

        // Breadcrumb clicks
        el.querySelectorAll('.breadcrumb').forEach(bc => {
          bc.addEventListener('click', () => render(bc.dataset.path))
        })
      }

      render('~')
    }
  })
}

function resolvePath(path) {
  const clean = path.replace(/^~\/?/, '').replace(/\/+$/, '')
  let node = filesys['~']
  if (!clean) return node
  const parts = clean.split('/')
  for (const part of parts) {
    if (!node || node.type !== 'dir' || !node.children[part]) return null
    node = node.children[part]
  }
  return node
}
