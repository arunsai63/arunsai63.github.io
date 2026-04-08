// Boot sequence — Terminal boot with user-agent & location detection → Desktop
import { getBootMessages, getYOE } from '../../shared/data.js'

export function bootSequence(container) {
  return new Promise((resolve) => {
    let skipped = false

    const overlay = document.createElement('div')
    overlay.style.cssText = `position:fixed;inset:0;z-index:100000;overflow:hidden;`

    container.appendChild(overlay)

    // Go straight to terminal boot (no README gate)
    showTerminalBoot(overlay).then(() => {
      if (!skipped) {
        overlay.style.transition = 'opacity 0.375s'
        overlay.style.opacity = '0'
        setTimeout(() => { overlay.remove(); resolve() }, 375)
      }
    })

    // Skip handler
    function skip() {
      skipped = true
      overlay.style.transition = 'opacity 0.225s'
      overlay.style.opacity = '0'
      setTimeout(() => { overlay.remove(); resolve() }, 225)
    }

    overlay.__skip = skip
  })
}

function detectEnvironment() {
  const ua = navigator.userAgent
  const lines = []

  // Browser detection
  if (ua.includes('Firefox')) {
    lines.push({ text: 'Browser: Firefox detected. A developer of culture.', type: 'ok' })
  } else if (ua.includes('Edg')) {
    lines.push({ text: 'Browser: Edge? Bold. Microsoft would be proud.', type: 'ok' })
  } else if (ua.includes('OPR') || ua.includes('Opera')) {
    lines.push({ text: 'Browser: Opera? You are a rare breed.', type: 'ok' })
  } else if (ua.includes('Chrome')) {
    lines.push({ text: 'Browser: Chrome detected. RIP your RAM.', type: 'ok' })
  } else if (ua.includes('Safari')) {
    lines.push({ text: 'Browser: Safari. Fancy Apple user detected.', type: 'ok' })
  } else {
    lines.push({ text: 'Browser: Unknown... respect for the obscure choice.', type: 'ok' })
  }

  // OS detection
  if (/iPhone|iPad|iPod/.test(ua)) {
    lines.push({ text: 'Host OS: iOS — browsing portfolios on the go', type: 'ok' })
  } else if (ua.includes('Android')) {
    lines.push({ text: 'Host OS: Android — a person of the people', type: 'ok' })
  } else if (ua.includes('Mac')) {
    lines.push({ text: 'Host OS: macOS — good taste, expensive taste', type: 'ok' })
  } else if (ua.includes('Windows')) {
    lines.push({ text: 'Host OS: Windows — a fellow sufferer', type: 'ok' })
  } else if (ua.includes('Linux')) {
    lines.push({ text: 'Host OS: Linux — bet you compile your own kernels', type: 'ok' })
  } else {
    lines.push({ text: 'Host OS: Unknown — running ArunOS inside a mystery', type: 'ok' })
  }

  // Screen
  const w = window.screen.width
  const h = window.screen.height
  const dpr = window.devicePixelRatio || 1
  lines.push({ text: `Display: ${w}x${h} @ ${dpr}x DPI`, type: 'ok' })

  return lines
}

async function fetchLocation() {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal })
    clearTimeout(timeout)
    if (!res.ok) return null
    const data = await res.json()
    return { city: data.city, region: data.region, country: data.country_name, ip: data.ip }
  } catch {
    return null
  }
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

    // Start location fetch in parallel (non-blocking)
    const locationPromise = fetchLocation()

    // Phase 1: Hardware detection (static boot messages)
    const bootMessages = getBootMessages()
    const envLines = detectEnvironment()

    // Insert environment lines after the hardware detection section
    const insertIdx = bootMessages.findIndex(m => m.type === 'blank')
    const allMessages = [
      ...bootMessages.slice(0, insertIdx >= 0 ? insertIdx : 6),
      ...envLines,
      { text: '', type: 'blank' },
      ...bootMessages.slice(insertIdx >= 0 ? insertIdx + 1 : 6),
    ]

    for (const msg of allMessages) {
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

      const delay = msg.type === 'blank' ? 150
        : msg.type === 'fail' ? 450
        : msg.type === 'success' ? 300
        : Math.random() * 90 + 45
      await sleep(delay)
    }

    // Add location line if it resolved
    if (!skipped) {
      const loc = await locationPromise
      if (loc && loc.city) {
        const locLine = document.createElement('div')
        locLine.innerHTML = `<span style="color:#10b981;">[OK]</span> <span style="color:#888;">Visitor location: ${loc.city}, ${loc.country} — welcome!</span>`
        // Insert before the last success line
        const lastChild = log.lastElementChild
        log.insertBefore(locLine, lastChild)
        log.scrollTop = log.scrollHeight
        await sleep(225)
      }
    }

    if (!skipped) {
      await sleep(450)
      resolve()
    }
  })
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}
