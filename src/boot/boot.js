// Boot sequence — terminal-style boot log with jokes
import { bootMessages } from '../shared/data.js'

export function bootSequence(container) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div')
    overlay.style.cssText = `
      position:fixed;inset:0;background:#0a0a0a;z-index:100000;
      display:flex;flex-direction:column;justify-content:center;
      padding:40px;font-family:'JetBrains Mono',monospace;font-size:14px;
      overflow:hidden;cursor:pointer;
    `

    const log = document.createElement('div')
    log.style.cssText = 'max-width:700px;margin:0 auto;width:100%;'
    overlay.appendChild(log)

    const skipHint = document.createElement('div')
    skipHint.style.cssText = 'position:fixed;bottom:20px;right:20px;color:#444;font-size:12px;'
    skipHint.textContent = 'Click anywhere to skip'
    overlay.appendChild(skipHint)

    container.appendChild(overlay)

    let skipped = false
    overlay.addEventListener('click', () => {
      skipped = true
      overlay.style.transition = 'opacity 0.3s'
      overlay.style.opacity = '0'
      setTimeout(() => { overlay.remove(); resolve() }, 300)
    })

    async function runBoot() {
      for (const msg of bootMessages) {
        if (skipped) return

        if (msg.type === 'blank') {
          const line = document.createElement('div')
          line.innerHTML = '&nbsp;'
          log.appendChild(line)
        } else {
          const line = document.createElement('div')
          const prefix = msg.type === 'ok' ? '<span style="color:#10b981;">[OK]</span>'
            : msg.type === 'fail' ? '<span style="color:#ef4444;">[FAIL]</span>'
            : msg.type === 'success' ? '<span style="color:#10b981;font-weight:700;">'
            : '<span style="color:#666;">'
          const suffix = (msg.type === 'success' || msg.type === 'info') ? '</span>' : ''

          if (msg.type === 'ok' || msg.type === 'fail') {
            line.innerHTML = `${prefix} ${msg.text}`
          } else if (msg.type === 'success') {
            line.innerHTML = `${prefix}${msg.text}</span>`
          } else {
            line.innerHTML = `<span style="color:#888;">${msg.text}</span>`
          }

          log.appendChild(line)
        }

        // Scroll to bottom
        log.scrollTop = log.scrollHeight

        // Variable delay for realism
        const delay = msg.type === 'blank' ? 200
          : msg.type === 'fail' ? 600
          : msg.type === 'success' ? 400
          : Math.random() * 150 + 80
        await sleep(delay)
      }

      if (!skipped) {
        await sleep(800)
        overlay.style.transition = 'opacity 0.5s'
        overlay.style.opacity = '0'
        setTimeout(() => { overlay.remove(); resolve() }, 500)
      }
    }

    runBoot()
  })
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}
