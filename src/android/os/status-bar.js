// Android Status Bar — hyper-realistic Android 14

const CARRIERS = ['ArunTel 5G', 'T-Mobug', 'Debug Mobile', '404 Network', 'Veri-zone Out']

// SVG icons matching real Android status bar
const svgWifi = `<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>`
const svgSignal = `<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M2 22h20V2L2 22zm18-2h-3V9.83l3-3V20z" opacity="0.3"/><path d="M17 20h3V6.83l-3 3V20zM2 22h20V2L2 22zm18-2H6.83L20 6.83V20z"/></svg>`

export function renderStatusBar(container) {
  const bar = document.createElement('div')
  bar.className = 'android-status-bar'

  function update() {
    const now = new Date()
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })

    bar.innerHTML = `
      <div class="status-bar-left">
        <span class="status-bar-time">${time}</span>
      </div>
      <div class="status-bar-right">
        ${svgWifi}
        ${svgSignal}
        <span class="status-bar-battery" id="android-battery"></span>
      </div>
    `
    updateBattery()
  }

  async function updateBattery() {
    const batteryEl = bar.querySelector('#android-battery')
    if (!batteryEl) return
    try {
      if ('getBattery' in navigator) {
        const battery = await navigator.getBattery()
        const level = Math.round(battery.level * 100)
        batteryEl.innerHTML = `
          <span style="font-size:11px;margin-right:2px;">${level}%</span>
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
            <rect x="0.5" y="0.5" width="18" height="11" rx="2" stroke="white" stroke-width="1"/>
            <rect x="19" y="3" width="2" height="5" rx="1" fill="white"/>
            <rect x="2" y="2" width="${(level/100)*15}" height="7" rx="1" fill="${level < 20 ? '#ef4444' : '#fff'}"/>
          </svg>
        `
      } else {
        batteryEl.innerHTML = `
          <span style="font-size:11px;margin-right:2px;">87%</span>
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
            <rect x="0.5" y="0.5" width="18" height="11" rx="2" stroke="white" stroke-width="1"/>
            <rect x="19" y="3" width="2" height="5" rx="1" fill="white"/>
            <rect x="2" y="2" width="13" height="7" rx="1" fill="#fff"/>
          </svg>
        `
      }
    } catch {
      batteryEl.textContent = '87%'
    }
  }

  update()
  setInterval(update, 30000) // Update every 30s

  container.appendChild(bar)
  return bar
}
