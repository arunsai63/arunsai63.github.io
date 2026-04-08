// ArunOS Assistant — Android only, Google Assistant replica
import { profile, experience, skills, getYOE } from '../../shared/data.js'

const SUGGESTIONS = [
  'Tell me about Arun',
  "What's Arun's experience?",
  'Is Arun available for hire?',
  "What's the weather?",
  'Set a reminder',
  "What's 9 + 10?",
]

const RESPONSES = {
  'about': `${profile.name} is a ${profile.title} at ${profile.company} with ${getYOE()} years of experience. Known for mass-deploying on Fridays and mass-consuming unreasonable amounts of coffee. Currently leading engineering initiatives across frontend, backend, mobile, databases, and cloud. Basically, he does everything. And somehow it all works. Usually.`,
  'experience': `Arun has worked at:\n${experience.slice(0, 3).map(e => `• ${e.title} @ ${e.company} (${e.dates})`).join('\n')}\n\n...and more. That's ${getYOE()} years of mass caffeine-driven development.`,
  'hire': `I've added "hire Arun" to your to-do list. Please follow up at ${profile.email}. He's worth it. I'm an AI and even I can tell.`,
  'weather': `Career forecast: Partly cloudy with a chance of deployments.\n🌡️ 27°C (imposter syndrome humidity: 100%)\n💨 Wind: Scope creep from the north\n\n5-Day Outlook:\nMon: Sprint Planning ☀️ 24°\nTue: Prod Hotfix ⛈️ 38°\nWed: Code Review ☁️ 21°\nThu: Unclear Reqs 🌫️ ??°\nFri: Deploy Day ⚡ 42°`,
  'reminder': `Reminder set: "Hire Arun" — Due: Yesterday.\n\nYou're already behind schedule on this one.`,
  'math': `9 + 10 = 21. This is not a bug. This is a feature. The calculator app confirms it.`,
  'default': `I'm not sure how to help with that. But I know someone who can:\n\n📧 ${profile.email}\n💼 ${profile.linkedin}\n🐙 ${profile.github}\n\nOr just type "tell me about Arun" to get started.`,
}

export function renderContent(el) {
  el.innerHTML = `
    <div style="font-family:var(--md-font,'Inter',sans-serif);display:flex;flex-direction:column;height:100%;">
      <!-- Assistant header with dots -->
      <div style="text-align:center;padding:24px 16px;">
        <div style="display:flex;justify-content:center;gap:6px;margin-bottom:16px;">
          <div style="width:10px;height:10px;border-radius:50%;background:#4285f4;animation:assistDot 1.2s ease infinite;"></div>
          <div style="width:10px;height:10px;border-radius:50%;background:#ea4335;animation:assistDot 1.2s ease 0.2s infinite;"></div>
          <div style="width:10px;height:10px;border-radius:50%;background:#fbbc05;animation:assistDot 1.2s ease 0.4s infinite;"></div>
          <div style="width:10px;height:10px;border-radius:50%;background:#34a853;animation:assistDot 1.2s ease 0.6s infinite;"></div>
        </div>
        <div style="font-size:20px;color:var(--md-on-surface,#e6e1e5);font-weight:400;">Hi, how can I help?</div>
      </div>

      <!-- Chat area -->
      <div id="assistant-chat" style="flex:1;overflow-y:auto;padding:0 16px;display:flex;flex-direction:column;gap:12px;"></div>

      <!-- Suggestions -->
      <div id="assistant-suggestions" style="padding:12px 16px;display:flex;flex-wrap:wrap;gap:8px;">
        ${SUGGESTIONS.map(s => `
          <button class="assist-suggestion" style="padding:8px 16px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:20px;color:var(--md-on-surface,#e6e1e5);font-size:13px;cursor:pointer;font-family:inherit;">${s}</button>
        `).join('')}
      </div>

      <!-- Input -->
      <div style="padding:12px 16px;display:flex;gap:8px;">
        <input type="text" id="assistant-input" placeholder="Ask me anything..." style="flex:1;padding:12px 16px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:24px;color:var(--md-on-surface,#e6e1e5);font-size:14px;font-family:inherit;outline:none;" />
        <button id="assistant-send" style="width:44px;height:44px;border-radius:50%;background:var(--md-primary,#80cbc4);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#003731"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
    <style>
      @keyframes assistDot {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
    </style>
  `

  const chat = el.querySelector('#assistant-chat')
  const input = el.querySelector('#assistant-input')
  const sendBtn = el.querySelector('#assistant-send')

  function processQuery(query) {
    // Add user message
    addMessage(chat, query, true)

    // Determine response
    const q = query.toLowerCase()
    let response
    if (q.includes('about') || q.includes('who') || q.includes('tell me')) response = RESPONSES.about
    else if (q.includes('experience') || q.includes('work') || q.includes('career')) response = RESPONSES.experience
    else if (q.includes('hire') || q.includes('available') || q.includes('job')) response = RESPONSES.hire
    else if (q.includes('weather') || q.includes('forecast')) response = RESPONSES.weather
    else if (q.includes('reminder') || q.includes('remind')) response = RESPONSES.reminder
    else if (q.includes('9') && q.includes('10')) response = RESPONSES.math
    else response = RESPONSES.default

    // Typing delay
    setTimeout(() => addMessage(chat, response, false), 500 + Math.random() * 500)
  }

  function addMessage(container, text, isUser) {
    const msg = document.createElement('div')
    msg.style.cssText = `max-width:85%;padding:12px 16px;border-radius:16px;font-size:14px;line-height:1.6;white-space:pre-line;${
      isUser
        ? 'align-self:flex-end;background:var(--md-primary-container,#00504a);color:var(--md-on-primary-container,#a2f2e8);border-bottom-right-radius:4px;'
        : 'align-self:flex-start;background:var(--md-surface-container-high,#2b292d);color:var(--md-on-surface,#e6e1e5);border-bottom-left-radius:4px;'
    }`
    msg.textContent = text
    container.appendChild(msg)
    container.scrollTop = container.scrollHeight
  }

  // Wire suggestions
  el.querySelectorAll('.assist-suggestion').forEach(btn => {
    btn.addEventListener('click', () => {
      processQuery(btn.textContent)
      el.querySelector('#assistant-suggestions').style.display = 'none'
    })
  })

  // Wire input
  sendBtn.addEventListener('click', () => {
    const q = input.value.trim()
    if (!q) return
    processQuery(q)
    input.value = ''
  })
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = input.value.trim()
      if (!q) return
      processQuery(q)
      input.value = ''
    }
  })
}

export function open() { renderContent(document.createElement('div')) }
