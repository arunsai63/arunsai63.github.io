// iPadOS Status Bar — hyper-realistic iPadOS 17

const svgWifi = `<svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>`

export function renderStatusBar(container) {
  const bar = document.createElement('div')
  bar.className = 'ipados-status-bar'

  function update() {
    const now = new Date()
    const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

    bar.innerHTML = `
      <div class="ipados-sb-left">
        <span class="ipados-sb-date">${dateStr}  ${timeStr}</span>
      </div>
      <div class="ipados-sb-right">
        ${svgWifi}
        <span class="ipados-sb-battery-wrap" id="ipados-battery"></span>
      </div>
    `
    updateBattery()
  }

  async function updateBattery() {
    const wrap = bar.querySelector('#ipados-battery')
    if (!wrap) return

    let level = 87
    let charging = false
    try {
      if ('getBattery' in navigator) {
        const battery = await navigator.getBattery()
        level = Math.round(battery.level * 100)
        charging = battery.charging
      }
    } catch {}

    const fillW = Math.max(1, (level / 100) * 18)
    const fillColor = level < 20 ? '#FF3B30' : (charging ? '#34C759' : '#fff')

    wrap.innerHTML = `
      <span class="ipados-sb-battery-pct">${level}%</span>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
        <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
        <rect x="21.5" y="3.5" width="2" height="5" rx="1" fill="rgba(255,255,255,0.4)"/>
        <rect x="2" y="2" width="${fillW}" height="8" rx="1.5" fill="${fillColor}"/>
      </svg>
    `
  }

  update()
  setInterval(update, 30000)

  container.appendChild(bar)
  return bar
}
