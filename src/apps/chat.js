// Chat App — MSN Messenger style, real-time with Firebase
import { createWindow } from '../macos/os/window-manager.js'
import { getDb, getUserId } from '../multiplayer/firebase-config.js'
import { ref, push, onValue, query, limitToLast } from 'firebase/database'

const CHAT_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export function renderContent(el) {
  const myColor = CHAT_COLORS[Math.floor(Math.random() * CHAT_COLORS.length)]
  const myName = localStorage.getItem('arunos-chat-name') || 'Anonymous Visitor'

  el.style.cssText = 'padding:0;display:flex;flex-direction:column;font-size:13px;'

  el.innerHTML = `
        <div style="padding:8px 12px;background:rgba(0,0,0,0.25);border-bottom:1px solid #222;display:flex;align-items:center;gap:8px;">
          <span style="font-size:16px;">💬</span>
          <span style="color:#888;font-size:12px;">ArunOS Global Chat</span>
          <span style="margin-left:auto;color:#555;font-size:11px;" id="chat-status">Connecting...</span>
        </div>

        <div id="chat-messages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;"></div>

        <div style="padding:8px 12px;background:rgba(0,0,0,0.25);border-top:1px solid #222;">
          <div style="margin-bottom:6px;display:flex;gap:6px;align-items:center;">
            <input id="chat-name" type="text" value="${myName}" placeholder="Your name" style="width:140px;padding:4px 8px;background:rgba(255,255,255,0.04);border:1px solid #333;border-radius:4px;color:#ccc;font-size:11px;font-family:inherit;outline:none;" />
            <span style="color:#444;font-size:10px;">← your display name</span>
          </div>
          <div style="display:flex;gap:6px;">
            <input id="chat-input" type="text" placeholder="Type a message..." maxlength="200" style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid #333;border-radius:6px;color:#ccc;font-family:inherit;font-size:13px;outline:none;" />
            <button id="chat-send" style="padding:8px 14px;background:#10b981;color:#000;border-radius:6px;font-weight:600;font-size:13px;font-family:inherit;cursor:pointer;border:none;">Send</button>
          </div>
          <div style="color:#444;font-size:10px;margin-top:4px;">Messages are ephemeral. Be nice. Or don't. I'm not your mom.</div>
        </div>
      `

      const messagesEl = el.querySelector('#chat-messages')
      const inputEl = el.querySelector('#chat-input')
      const sendBtn = el.querySelector('#chat-send')
      const nameEl = el.querySelector('#chat-name')
      const statusEl = el.querySelector('#chat-status')

      // Save name on change
      nameEl.addEventListener('change', () => {
        localStorage.setItem('arunos-chat-name', nameEl.value)
      })

      const db = getDb()
      const uid = getUserId()

      if (!db || !uid) {
        statusEl.textContent = 'Offline mode'
        statusEl.style.color = '#ef4444'
        addSystemMessage(messagesEl, 'Firebase not connected. Chat is unavailable in offline mode.')
        addSystemMessage(messagesEl, "But hey, you can still talk to yourself. We've all been there.")
        return
      }

      statusEl.textContent = 'Connected'
      statusEl.style.color = '#10b981'

      // Welcome messages
      addSystemMessage(messagesEl, 'Welcome to ArunOS Global Chat! 🎉')
      addSystemMessage(messagesEl, 'Everyone currently on the site can see your messages.')

      // Listen for messages
      const msgsRef = query(ref(db, 'chat/messages'), limitToLast(50))
      onValue(msgsRef, (snapshot) => {
        const data = snapshot.val()
        if (!data) return

        // Clear and re-render (simple approach)
        const systemMsgs = messagesEl.querySelectorAll('.system-msg')
        messagesEl.innerHTML = ''
        systemMsgs.forEach(m => messagesEl.appendChild(m))

        Object.values(data).sort((a, b) => a.timestamp - b.timestamp).forEach(msg => {
          addChatMessage(messagesEl, msg, msg.uid === uid)
        })

        messagesEl.scrollTop = messagesEl.scrollHeight
      })

      // Send message
      function sendMessage() {
        const text = inputEl.value.trim()
        if (!text) return
        if (text.length > 200) return

        const name = nameEl.value.trim() || 'Anonymous'
        push(ref(db, 'chat/messages'), {
          text,
          name,
          color: myColor,
          uid,
          timestamp: Date.now(),
        })

        inputEl.value = ''
      }

      sendBtn.addEventListener('click', sendMessage)
      inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendMessage()
      })

  inputEl.focus()
}

export function open() {
  createWindow({
    id: 'chat',
    title: 'ArunOS Messenger',
    icon: '💬',
    width: 420,
    height: 500,
    content: (el) => renderContent(el),
  })
}

function addChatMessage(container, msg, isMine) {
  const el = document.createElement('div')
  el.style.cssText = `display:flex;flex-direction:column;${isMine ? 'align-items:flex-end;' : 'align-items:flex-start;'}`
  el.innerHTML = `
    <span style="font-size:10px;color:${msg.color || '#888'};margin-bottom:2px;">${escapeHtml(msg.name)}</span>
    <div style="max-width:75%;padding:8px 12px;border-radius:12px;${isMine
      ? 'background:#10b981;color:#000;border-bottom-right-radius:4px;'
      : 'background:rgba(255,255,255,0.04);color:#ccc;border-bottom-left-radius:4px;'
    }font-size:13px;line-height:1.4;word-break:break-word;">${escapeHtml(msg.text)}</div>
    <span style="font-size:9px;color:#444;margin-top:2px;">${formatTime(msg.timestamp)}</span>
  `
  container.appendChild(el)
}

function addSystemMessage(container, text) {
  const el = document.createElement('div')
  el.className = 'system-msg'
  el.style.cssText = 'text-align:center;color:#555;font-size:11px;padding:4px;'
  el.textContent = text
  container.appendChild(el)
}

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

function escapeHtml(s) {
  const div = document.createElement('div')
  div.textContent = s
  return div.innerHTML
}
