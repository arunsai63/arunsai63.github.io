// Desktop Widgets — live info panels on the desktop
import { getYOE, profile, skills } from '../../shared/data.js'
import { icon } from '../../shared/icons.js'

const CAREER_START = new Date(2019, 0, 1)

export function initWidgets(desktopArea) {
  const container = document.createElement('div')
  container.className = 'widgets-container'
  desktopArea.appendChild(container)

  createUptimeWidget(container)
  createNowPlayingWidget(container)
  createVisitorIntelWidget(container)
  createWeatherWidget(container)
  createStickyNoteWidget(container)
}

// ─── Widget 1: System Uptime ────────────────────────────────

function createUptimeWidget(container) {
  const el = createWidgetShell('uptime-widget')
  el.innerHTML = `
    <div class="widget-header">
      <span class="widget-header-icon">${icon('clock', 14, '#10b981')}</span>
      <span>System Uptime</span>
    </div>
    <div class="uptime-counter" style="font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:700;color:#fff;margin:8px 0 4px;letter-spacing:0.5px;"></div>
    <div class="uptime-status" style="font-size:11px;color:rgba(255,255,255,0.4);height:16px;transition:opacity 0.5s;"></div>
    <div style="display:flex;align-items:center;gap:6px;margin-top:8px;">
      <span style="width:6px;height:6px;border-radius:50%;background:#10b981;animation:pulse 2s ease-in-out infinite;"></span>
      <span style="font-size:10px;color:#10b981;">ONLINE</span>
    </div>
  `
  container.appendChild(el)

  const counterEl = el.querySelector('.uptime-counter')
  const statusEl = el.querySelector('.uptime-status')

  const statuses = [
    '30+ repos deployed',
    '~$50M market cap built',
    '10+ microservices migrated',
    'Caffeine dependency: stable',
    '30k+ users served',
    'Zero production fires (today)',
    'Stack Overflow tabs: countless',
  ]
  let statusIdx = 0

  function tick() {
    const now = new Date()
    const diff = now - CAREER_START
    const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000))
    const rem = diff - years * 365.25 * 24 * 60 * 60 * 1000
    const months = Math.floor(rem / (30.44 * 24 * 60 * 60 * 1000))
    const rem2 = rem - months * 30.44 * 24 * 60 * 60 * 1000
    const days = Math.floor(rem2 / (24 * 60 * 60 * 1000))
    const hours = Math.floor((rem2 % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
    const mins = Math.floor((rem2 % (60 * 60 * 1000)) / (60 * 1000))
    const secs = Math.floor((rem2 % (60 * 1000)) / 1000)

    counterEl.textContent = `${years}y ${months}m ${days}d ${pad(hours)}:${pad(mins)}:${pad(secs)}`
  }

  function rotateStatus() {
    statusEl.style.opacity = '0'
    setTimeout(() => {
      statusEl.textContent = statuses[statusIdx % statuses.length]
      statusEl.style.opacity = '1'
      statusIdx++
    }, 300)
  }

  tick()
  rotateStatus()
  setInterval(tick, 1000)
  setInterval(rotateStatus, 4000)
}

// ─── Widget 2: Now Playing ──────────────────────────────────

function createNowPlayingWidget(container) {
  const tracks = [
    { title: 'Undefined Is Not a Function', artist: 'TypeError ft. Console.log', album: 'Runtime Errors Vol. 3', color: '#e74c3c' },
    { title: 'It Works on My Machine', artist: 'Docker', album: 'Container Therapy', color: '#3498db' },
    { title: 'sudo rm -rf /my-problems', artist: 'Bash Shell', album: 'Pipe Dreams', color: '#2ecc71' },
    { title: '404 Love Not Found', artist: 'HTTP Client', album: 'Status Codes of the Heart', color: '#9b59b6' },
    { title: 'Merge Conflict', artist: 'Git & The Rebases', album: 'Branch Management', color: '#f39c12' },
    { title: 'Deploying on Friday', artist: 'CI/CD Pipeline', album: 'Living Dangerously', color: '#e67e22' },
    { title: 'Stack Overflow Lullaby', artist: 'Copy Paste', album: 'Greatest Hits', color: '#1abc9c' },
  ]

  const el = createWidgetShell('nowplaying-widget')
  el.innerHTML = `
    <div style="display:flex;gap:12px;align-items:center;">
      <div class="np-art" style="width:52px;height:52px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:background 0.8s;">${icon('zap', 24, 'rgba(255,255,255,0.7)')}</div>
      <div style="flex:1;min-width:0;">
        <div class="np-title" style="font-size:13px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:opacity 0.5s;"></div>
        <div class="np-artist" style="font-size:11px;color:rgba(255,255,255,0.45);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:opacity 0.5s;"></div>
        <div class="np-album" style="font-size:10px;color:rgba(255,255,255,0.3);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:opacity 0.5s;"></div>
      </div>
    </div>
    <div style="margin-top:10px;height:3px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden;">
      <div class="np-progress" style="height:100%;width:0%;border-radius:2px;transition:width 0.5s linear,background 0.8s;"></div>
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:4px;font-size:10px;color:rgba(255,255,255,0.25);">
      <span class="np-elapsed">0:00</span>
      <span class="np-duration">3:30</span>
    </div>
  `
  container.appendChild(el)

  const art = el.querySelector('.np-art')
  const title = el.querySelector('.np-title')
  const artist = el.querySelector('.np-artist')
  const album = el.querySelector('.np-album')
  const progress = el.querySelector('.np-progress')
  const elapsed = el.querySelector('.np-elapsed')

  let trackIdx = Math.floor(Math.random() * tracks.length)
  let startTime = Date.now()
  const TRACK_DURATION = 18000 // 18s per "track"

  function setTrack() {
    const t = tracks[trackIdx % tracks.length]
    title.style.opacity = '0'
    artist.style.opacity = '0'
    album.style.opacity = '0'
    setTimeout(() => {
      title.textContent = t.title
      artist.textContent = t.artist
      album.textContent = t.album
      art.style.background = `linear-gradient(135deg, ${t.color}, ${t.color}88)`
      progress.style.background = t.color
      title.style.opacity = '1'
      artist.style.opacity = '1'
      album.style.opacity = '1'
    }, 300)
    startTime = Date.now()
    trackIdx++
  }

  function updateProgress() {
    const e = Date.now() - startTime
    const pct = Math.min((e / TRACK_DURATION) * 100, 100)
    progress.style.width = pct + '%'
    const secs = Math.floor(e / 1000)
    elapsed.textContent = `${Math.floor(secs / 60)}:${pad(secs % 60)}`
    if (e >= TRACK_DURATION) setTrack()
  }

  setTrack()
  setInterval(updateProgress, 500)
}

// ─── Widget 3: Visitor Intel ────────────────────────────────

function createVisitorIntelWidget(container) {
  const el = createWidgetShell('intel-widget')
  el.innerHTML = `
    <div class="widget-header">
      <span class="widget-header-icon">${icon('eye', 14, '#f59e0b')}</span>
      <span>Visitor Intel</span>
      <span style="margin-left:auto;font-size:9px;color:rgba(255,255,255,0.2);letter-spacing:1px;">CLASSIFIED</span>
    </div>
    <div class="intel-rows" style="font-family:'JetBrains Mono',monospace;font-size:11px;margin-top:8px;display:flex;flex-direction:column;gap:4px;color:rgba(255,255,255,0.5);"></div>
    <div class="intel-verdict" style="margin-top:10px;padding:6px 10px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.15);border-radius:6px;font-size:11px;color:#f59e0b;text-align:center;transition:opacity 0.5s;"></div>
  `
  container.appendChild(el)

  const rows = el.querySelector('.intel-rows')
  const verdict = el.querySelector('.intel-verdict')

  // Detect info
  const ua = navigator.userAgent
  let browser = 'Unknown'
  if (ua.includes('Firefox')) browser = 'Firefox'
  else if (ua.includes('Edg')) browser = 'Edge'
  else if (ua.includes('OPR') || ua.includes('Opera')) browser = 'Opera'
  else if (ua.includes('Chrome')) browser = 'Chrome'
  else if (ua.includes('Safari')) browser = 'Safari'

  let os = 'Unknown'
  if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS'
  else if (ua.includes('Android')) os = 'Android'
  else if (ua.includes('Mac')) os = 'macOS'
  else if (ua.includes('Windows')) os = 'Windows'
  else if (ua.includes('Linux')) os = 'Linux'

  const screen = `${window.screen.width}x${window.screen.height}`

  rows.innerHTML = `
    <div><span style="color:rgba(255,255,255,0.3);">Browser:</span> ${browser}</div>
    <div><span style="color:rgba(255,255,255,0.3);">OS:</span> ${os}</div>
    <div><span style="color:rgba(255,255,255,0.3);">Screen:</span> ${screen}</div>
    <div><span style="color:rgba(255,255,255,0.3);">Location:</span> <span class="intel-location">detecting...</span></div>
    <div><span style="color:rgba(255,255,255,0.3);">Battery:</span> <span class="intel-battery">--</span></div>
  `

  // Fetch location
  fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) })
    .then(r => r.json())
    .then(d => { if (d.city) el.querySelector('.intel-location').textContent = `${d.city}, ${d.country_name}` })
    .catch(() => { el.querySelector('.intel-location').textContent = 'Classified' })

  // Battery
  if ('getBattery' in navigator) {
    navigator.getBattery().then(b => {
      el.querySelector('.intel-battery').textContent = `${Math.round(b.level * 100)}%${b.charging ? ' (charging)' : ''}`
    }).catch(() => {})
  }

  const verdicts = [
    'Threat Level: Recruiter (High Priority)',
    'Assessment: Should hire Arun immediately',
    'Status: Probably has 47 Chrome tabs open',
    'Risk: May spend too long on this site',
    'Classified: This visitor has good taste',
    'Note: Cursor movements being tracked',
  ]
  let vIdx = 0
  function rotateVerdict() {
    verdict.style.opacity = '0'
    setTimeout(() => {
      verdict.textContent = verdicts[vIdx % verdicts.length]
      verdict.style.opacity = '1'
      vIdx++
    }, 300)
  }
  rotateVerdict()
  setInterval(rotateVerdict, 5000)
}

// ─── Widget 4: Career Weather ───────────────────────────────

function createWeatherWidget(container) {
  const el = createWidgetShell('weather-widget')

  const weatherIcons = {
    sun: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
    cloud: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
    storm: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>`,
    fog: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="1.5" stroke-linecap="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><line x1="4" y1="22" x2="20" y2="22" opacity="0.4"/></svg>`,
    bolt: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>`,
  }

  const forecast = [
    { day: 'Mon', icon: 'sun', desc: 'Sprint planning', temp: '24°' },
    { day: 'Tue', icon: 'storm', desc: 'Prod hotfix', temp: '38°' },
    { day: 'Wed', icon: 'cloud', desc: 'Code review', temp: '21°' },
    { day: 'Thu', icon: 'fog', desc: 'Unclear reqs', temp: '??°' },
    { day: 'Fri', icon: 'bolt', desc: 'Demo day', temp: '42°' },
  ]

  el.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
      <div>
        <div class="widget-header" style="margin-bottom:4px;">
          <span class="widget-header-icon">${icon('cloud', 14, '#3b82f6')}</span>
          <span>Career Weather</span>
        </div>
        <div style="font-size:32px;font-weight:700;color:#fff;">27°</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.4);">Partly cloudy with a chance of deployments</div>
      </div>
      <div>${weatherIcons.sun}</div>
    </div>
    <div style="display:flex;gap:4px;font-size:10px;color:rgba(255,255,255,0.3);margin-top:6px;">
      <span>Humidity: 100% (imposter syndrome)</span>
      <span style="margin-left:auto;">Wind: scope creep</span>
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:12px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.06);">
      ${forecast.map(f => `
        <div style="text-align:center;flex:1;">
          <div style="font-size:10px;color:rgba(255,255,255,0.35);margin-bottom:4px;">${f.day}</div>
          ${weatherIcons[f.icon]}
          <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:2px;">${f.temp}</div>
          <div style="font-size:9px;color:rgba(255,255,255,0.25);margin-top:1px;">${f.desc}</div>
        </div>
      `).join('')}
    </div>
  `
  container.appendChild(el)
}

// ─── Widget 5: Sticky Note ──────────────────────────────────

function createStickyNoteWidget(container) {
  const el = document.createElement('div')
  el.className = 'widget sticky-note-widget'
  el.innerHTML = `
    <div style="font-size:14px;color:rgba(0,0,0,0.7);font-weight:600;margin-bottom:8px;">Hey! Thanks for visiting.</div>
    <div style="font-size:12px;color:rgba(0,0,0,0.5);line-height:1.6;margin-bottom:12px;">Quick links:</div>
    <div style="display:flex;flex-direction:column;gap:4px;font-size:12px;margin-bottom:14px;">
      <a href="/resume.pdf" target="_blank" style="color:#1d4ed8;text-decoration:none;display:flex;align-items:center;gap:6px;">${icon('fileText', 14, '#1d4ed8')} Resume</a>
      <a href="${profile.github}" target="_blank" style="color:#1d4ed8;text-decoration:none;display:flex;align-items:center;gap:6px;">${icon('code', 14, '#1d4ed8')} GitHub</a>
      <a href="${profile.linkedin}" target="_blank" style="color:#1d4ed8;text-decoration:none;display:flex;align-items:center;gap:6px;">${icon('externalLink', 14, '#1d4ed8')} LinkedIn</a>
      <a href="mailto:${profile.email}" style="color:#1d4ed8;text-decoration:none;display:flex;align-items:center;gap:6px;">${icon('mail', 14, '#1d4ed8')} Email</a>
    </div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(0,0,0,0.4);line-height:1.8;">
      <div>[x] Build portfolio OS</div>
      <div>[x] Add developer humor</div>
      <div>[ ] Get mass hired</div>
      <div>[ ] Fix sleep schedule</div>
    </div>
  `
  container.appendChild(el)
}

// ─── Helpers ────────────────────────────────────────────────

function createWidgetShell(className) {
  const el = document.createElement('div')
  el.className = `widget ${className}`
  return el
}

function pad(n) {
  return n.toString().padStart(2, '0')
}
