// Multiplayer cursors — see other visitors in real-time
import { ref, set, onValue, onDisconnect, serverTimestamp } from 'firebase/database'

const CURSOR_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316']
const NAMES = [
  'Curious Fox', 'Swift Eagle', 'Silent Panda', 'Brave Wolf', 'Chill Cat',
  'Busy Bee', 'Wise Owl', 'Happy Duck', 'Sneaky Raccoon', 'Zen Turtle',
  'Code Monkey', 'Debug Dragon', 'Deploy Dolphin', 'Merge Moose', 'Rebase Rabbit',
]

let db = null
let userId = null
let cursorsContainer = null
let remoteCursors = {}
let localColor = null
let localName = null
let updateThrottle = null

export function initCursors(database, uid) {
  db = database
  userId = uid
  localColor = CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)]
  localName = NAMES[Math.floor(Math.random() * NAMES.length)]

  // Create cursors overlay
  cursorsContainer = document.createElement('div')
  cursorsContainer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99990;'
  document.body.appendChild(cursorsContainer)

  // Track local mouse
  document.addEventListener('mousemove', onMouseMove)

  // Listen for remote cursors
  const cursorsRef = ref(db, 'cursors')
  onValue(cursorsRef, (snapshot) => {
    const data = snapshot.val() || {}
    Object.entries(data).forEach(([uid, cursor]) => {
      if (uid === userId) return // skip self
      if (Date.now() - cursor.t > 10000) return // stale cursor (>10s)
      updateRemoteCursor(uid, cursor)
    })

    // Clean up cursors that are no longer in the data
    Object.keys(remoteCursors).forEach(uid => {
      if (!data[uid] || uid === userId) {
        removeRemoteCursor(uid)
      }
    })

    // Update visitor count in taskbar
    const visitorCount = Object.keys(data).filter(uid => Date.now() - (data[uid]?.t || 0) < 10000).length
    const trayEl = document.querySelector('.tray-visitors')
    if (trayEl) trayEl.textContent = `👥 ${visitorCount}`
  })

  // Set up presence cleanup
  const myRef = ref(db, `cursors/${userId}`)
  onDisconnect(myRef).remove()
}

function onMouseMove(e) {
  if (!db || !userId) return

  // Throttle to ~10fps
  if (updateThrottle) return
  updateThrottle = setTimeout(() => { updateThrottle = null }, 100)

  const x = (e.clientX / window.innerWidth * 100).toFixed(1)
  const y = (e.clientY / window.innerHeight * 100).toFixed(1)

  set(ref(db, `cursors/${userId}`), {
    x: parseFloat(x),
    y: parseFloat(y),
    c: localColor,
    n: localName,
    t: Date.now(),
  })
}

function updateRemoteCursor(uid, data) {
  let el = remoteCursors[uid]
  if (!el) {
    el = document.createElement('div')
    el.style.cssText = `position:fixed;pointer-events:none;transition:left 0.1s linear,top 0.1s linear;z-index:99991;`
    el.innerHTML = `
      <svg width="16" height="20" viewBox="0 0 16 20" fill="${data.c}" style="filter:drop-shadow(0 1px 3px rgba(0,0,0,0.5));">
        <path d="M0 0L16 12L8 12L12 20L8 18L4 12L0 16Z"/>
      </svg>
      <span style="position:absolute;top:18px;left:12px;background:${data.c};color:#000;padding:1px 6px;border-radius:4px;font-size:10px;font-family:'Inter',sans-serif;white-space:nowrap;font-weight:600;">${data.n}</span>
    `
    cursorsContainer.appendChild(el)
    remoteCursors[uid] = el
  }

  el.style.left = `${data.x}%`
  el.style.top = `${data.y}%`
}

function removeRemoteCursor(uid) {
  const el = remoteCursors[uid]
  if (el) {
    el.remove()
    delete remoteCursors[uid]
  }
}
