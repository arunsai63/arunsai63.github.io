// Boot sequence — GitHub README → "Run" button → Terminal boot → Desktop
import { bootMessages } from '../shared/data.js'

export function bootSequence(container) {
  return new Promise((resolve) => {
    let skipped = false

    const overlay = document.createElement('div')
    overlay.style.cssText = `position:fixed;inset:0;z-index:100000;overflow:hidden;`

    container.appendChild(overlay)

    // PHASE 1: GitHub README
    showReadme(overlay).then(() => {
      if (skipped) return
      // PHASE 2: Terminal boot
      return showTerminalBoot(overlay)
    }).then(() => {
      if (!skipped) {
        overlay.style.transition = 'opacity 0.5s'
        overlay.style.opacity = '0'
        setTimeout(() => { overlay.remove(); resolve() }, 500)
      }
    })

    // Skip handler (click skip button only)
    function skip() {
      skipped = true
      overlay.style.transition = 'opacity 0.3s'
      overlay.style.opacity = '0'
      setTimeout(() => { overlay.remove(); resolve() }, 300)
    }

    overlay.__skip = skip
  })
}

function showReadme(overlay) {
  return new Promise((resolve) => {
    overlay.style.background = '#0d1117'

    overlay.innerHTML = `
      <div style="max-width:900px;margin:0 auto;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
        <!-- GitHub-style header -->
        <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:#161b22;border:1px solid #30363d;border-radius:6px 6px 0 0;margin-bottom:0;">
          <span style="color:#8b949e;font-size:14px;">📄</span>
          <span style="color:#c9d1d9;font-size:14px;font-weight:600;">README.md</span>
          <span style="color:#484f58;font-size:12px;margin-left:auto;">Raw</span>
          <span style="color:#484f58;font-size:12px;">Blame</span>
          <span style="color:#484f58;font-size:12px;">History</span>
        </div>

        <!-- README content -->
        <div style="background:#0d1117;border:1px solid #30363d;border-top:none;border-radius:0 0 6px 6px;padding:32px;color:#c9d1d9;font-size:15px;line-height:1.7;">
          <h1 style="font-size:28px;border-bottom:1px solid #21262d;padding-bottom:12px;margin-bottom:16px;color:#f0f6fc;">Arun Munaganti</h1>

          <blockquote style="border-left:3px solid #3b82f6;padding-left:16px;color:#8b949e;margin:16px 0;">
            Solutions Architect | 6.5+ YOE | Full Stack | AWS | Blockchain
          </blockquote>

          <p style="margin:12px 0;">I'm a solutions architect who thinks in systems, not just code. Currently leading the engineering team at <strong style="color:#f0f6fc;">EchorTech</strong>.</p>

          <h2 style="font-size:20px;border-bottom:1px solid #21262d;padding-bottom:8px;margin:24px 0 12px;color:#f0f6fc;">Quick Start</h2>

          <!-- The magic code block -->
          <div style="background:#161b22;border:1px solid #30363d;border-radius:6px;overflow:hidden;margin:16px 0;">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 16px;border-bottom:1px solid #30363d;">
              <span style="color:#8b949e;font-size:12px;">bash</span>
              <button id="readme-run-btn" style="padding:4px 12px;background:#238636;color:#fff;border:none;border-radius:4px;font-size:12px;cursor:pointer;font-weight:600;transition:all 0.2s;">
                ▶ Run
              </button>
            </div>
            <pre style="padding:16px;margin:0;color:#c9d1d9;font-family:'JetBrains Mono',monospace;font-size:14px;"><code id="readme-code">$ npx arun-os --boot</code></pre>
          </div>

          <p style="color:#484f58;font-size:13px;margin-top:20px;" id="readme-hint"></p>
        </div>

        <!-- Skip -->
        <div style="text-align:center;margin-top:16px;">
          <button id="readme-skip" style="color:#484f58;font-size:12px;background:none;border:none;cursor:pointer;font-family:inherit;">Skip intro →</button>
        </div>
      </div>
    `

    const runBtn = overlay.querySelector('#readme-run-btn')
    const hint = overlay.querySelector('#readme-hint')
    const skip = overlay.querySelector('#readme-skip')

    skip.addEventListener('click', () => overlay.__skip())

    // Auto-hint after 3s
    const hintTimer = setTimeout(() => {
      hint.textContent = "↑ Click 'Run' to boot ArunOS. Or don't. I'm a README, not a cop."
      hint.style.transition = 'opacity 0.5s'
    }, 3000)

    // Auto-run after 8s
    const autoTimer = setTimeout(() => {
      hint.textContent = "Oh come on, you weren't going to click it? Fine, I'll do it myself."
      setTimeout(() => clickRun(), 1500)
    }, 8000)

    function clickRun() {
      clearTimeout(hintTimer)
      clearTimeout(autoTimer)
      runBtn.textContent = '⏳ Running...'
      runBtn.style.background = '#1a7f37'

      // Glitch transition
      setTimeout(() => {
        const readmeContent = overlay.querySelector('div')
        readmeContent.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        readmeContent.style.transform = 'scale(0.95)'
        readmeContent.style.opacity = '0'
        readmeContent.style.filter = 'blur(4px)'

        setTimeout(resolve, 600)
      }, 500)
    }

    runBtn.addEventListener('click', clickRun)
  })
}

function showTerminalBoot(overlay) {
  return new Promise(async (resolve) => {
    overlay.style.background = '#0a0a0a'
    overlay.innerHTML = `
      <div style="display:flex;flex-direction:column;justify-content:center;height:100%;padding:40px;font-family:'JetBrains Mono',monospace;font-size:14px;">
        <div id="boot-log" style="max-width:700px;margin:0 auto;width:100%;"></div>
        <div style="position:fixed;bottom:20px;right:20px;color:#333;font-size:12px;cursor:pointer;" id="boot-skip">Click to skip</div>
      </div>
    `

    const log = overlay.querySelector('#boot-log')
    const skipBtn = overlay.querySelector('#boot-skip')
    let skipped = false

    skipBtn.addEventListener('click', () => { skipped = true; resolve() })

    for (const msg of bootMessages) {
      if (skipped) { resolve(); return }

      if (msg.type === 'blank') {
        const line = document.createElement('div')
        line.innerHTML = '&nbsp;'
        log.appendChild(line)
      } else {
        const line = document.createElement('div')
        if (msg.type === 'ok') {
          line.innerHTML = `<span style="color:#10b981;">[OK]</span> <span style="color:#888;">${msg.text}</span>`
        } else if (msg.type === 'fail') {
          line.innerHTML = `<span style="color:#ef4444;">[FAIL]</span> <span style="color:#888;">${msg.text}</span>`
        } else if (msg.type === 'success') {
          line.innerHTML = `<span style="color:#10b981;font-weight:700;">${msg.text}</span>`
        } else {
          line.innerHTML = `<span style="color:#666;">${msg.text}</span>`
        }
        log.appendChild(line)
      }

      log.scrollTop = log.scrollHeight

      const delay = msg.type === 'blank' ? 200
        : msg.type === 'fail' ? 600
        : msg.type === 'success' ? 400
        : Math.random() * 120 + 60
      await sleep(delay)
    }

    if (!skipped) {
      await sleep(600)
      resolve()
    }
  })
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}
