// Phone Dialer — Android only, Google Phone app replica
import { profile } from '../../shared/data.js'

const CALL_LOG = [
  { name: 'Production Server', type: 'missed', count: 47, time: '2h ago', icon: '🔴' },
  { name: 'Stack Overflow', type: 'outgoing', duration: '2h 31m', time: '3h ago', icon: '🟢' },
  { name: 'Recruiter', type: 'incoming', status: 'declined', time: '5h ago', icon: '🔵' },
  { name: 'Sleep Schedule', type: 'missed', count: 99, time: 'permanently', icon: '🔴' },
  { name: 'Mom', type: 'incoming', duration: '45m', time: 'yesterday', icon: '🟢' },
  { name: 'Coffee Machine', type: 'outgoing', duration: '0:03', time: 'today', icon: '🟢' },
  { name: 'Imposter Syndrome', type: 'incoming', status: 'blocked', time: '3 AM', icon: '⚫' },
]

export function renderContent(el) {
  let activeTab = 'recents'
  let dialValue = ''

  function render() {
    el.innerHTML = `
      <div style="height:100%;display:flex;flex-direction:column;background:var(--md-surface,#1c1b1f);font-family:var(--md-font,'Inter',sans-serif);">
        <!-- Content -->
        <div style="flex:1;overflow-y:auto;padding:16px;" id="phone-content">
          ${activeTab === 'recents' ? renderRecents() : activeTab === 'contacts' ? renderContacts() : renderDialer()}
        </div>

        <!-- Tab bar -->
        <div style="display:flex;border-top:1px solid rgba(255,255,255,0.06);padding:8px 0;">
          ${['recents', 'contacts', 'dialpad'].map(tab => `
            <button class="phone-tab" data-tab="${tab}" style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px;background:none;border:none;cursor:pointer;">
              <span style="font-size:20px;">${tab === 'recents' ? '🕐' : tab === 'contacts' ? '👤' : '🔢'}</span>
              <span style="font-size:11px;color:${activeTab === tab ? 'var(--md-primary,#80cbc4)' : 'rgba(255,255,255,0.5)'};">${tab[0].toUpperCase() + tab.slice(1)}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `

    el.querySelectorAll('.phone-tab').forEach(t => {
      t.addEventListener('click', () => { activeTab = t.dataset.tab; render() })
    })

    // Wire dialpad buttons
    if (activeTab === 'dialpad') {
      el.querySelectorAll('.dial-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          dialValue += btn.dataset.val
          const display = el.querySelector('#dial-display')
          if (display) display.textContent = dialValue
        })
      })
      const callBtn = el.querySelector('#dial-call')
      if (callBtn) {
        callBtn.addEventListener('click', () => {
          const result = el.querySelector('#dial-result')
          if (result) {
            result.textContent = 'Call failed: This is a website, not a phone. Try the Contact app instead.'
            result.style.display = 'block'
          }
        })
      }
    }
  }

  function renderRecents() {
    return CALL_LOG.map(call => `
      <div style="display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
        <div style="width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;font-size:20px;">
          ${call.name[0]}
        </div>
        <div style="flex:1;">
          <div style="color:${call.type === 'missed' ? '#f2b8b5' : 'var(--md-on-surface,#e6e1e5)'};font-size:15px;">${call.name}</div>
          <div style="color:rgba(255,255,255,0.4);font-size:12px;">
            ${call.icon} ${call.type}${call.count ? ` (${call.count} times)` : ''}${call.duration ? ` — ${call.duration}` : ''}${call.status ? ` — ${call.status}` : ''}
          </div>
        </div>
        <span style="color:rgba(255,255,255,0.3);font-size:12px;">${call.time}</span>
      </div>
    `).join('') + `
      <div style="text-align:center;padding:24px;color:rgba(255,255,255,0.3);font-size:13px;">
        Voicemail: "Hi, this is your imposter syndrome calling..."
      </div>
    `
  }

  function renderContacts() {
    return `
      <div style="padding:16px;text-align:center;">
        <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#10b981,#3b82f6);display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 16px;">🧑‍💻</div>
        <div style="font-size:20px;color:var(--md-on-surface,#e6e1e5);margin-bottom:4px;">${profile.name}</div>
        <div style="font-size:14px;color:rgba(255,255,255,0.5);margin-bottom:20px;">${profile.title}</div>
        <div style="display:flex;justify-content:center;gap:16px;">
          <a href="mailto:${profile.email}" style="display:flex;flex-direction:column;align-items:center;gap:4px;color:var(--md-primary,#80cbc4);text-decoration:none;">
            <div style="width:48px;height:48px;border-radius:50%;background:rgba(128,203,196,0.15);display:flex;align-items:center;justify-content:center;font-size:20px;">📧</div>
            <span style="font-size:11px;">Email</span>
          </a>
          <a href="${profile.linkedin}" target="_blank" style="display:flex;flex-direction:column;align-items:center;gap:4px;color:var(--md-primary,#80cbc4);text-decoration:none;">
            <div style="width:48px;height:48px;border-radius:50%;background:rgba(128,203,196,0.15);display:flex;align-items:center;justify-content:center;font-size:20px;">💼</div>
            <span style="font-size:11px;">LinkedIn</span>
          </a>
          <a href="${profile.github}" target="_blank" style="display:flex;flex-direction:column;align-items:center;gap:4px;color:var(--md-primary,#80cbc4);text-decoration:none;">
            <div style="width:48px;height:48px;border-radius:50%;background:rgba(128,203,196,0.15);display:flex;align-items:center;justify-content:center;font-size:20px;">🐙</div>
            <span style="font-size:11px;">GitHub</span>
          </a>
        </div>
      </div>
    `
  }

  function renderDialer() {
    const buttons = ['1','2','3','4','5','6','7','8','9','*','0','#']
    return `
      <div style="display:flex;flex-direction:column;align-items:center;height:100%;">
        <div id="dial-display" style="font-size:32px;color:var(--md-on-surface,#e6e1e5);padding:20px;font-weight:300;min-height:60px;">${dialValue || ''}</div>
        <div id="dial-result" style="display:none;color:#f2b8b5;font-size:13px;padding:8px 16px;text-align:center;margin-bottom:12px;"></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:280px;width:100%;">
          ${buttons.map(b => `
            <button class="dial-btn" data-val="${b}" style="width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.06);border:none;color:var(--md-on-surface,#e6e1e5);font-size:24px;cursor:pointer;margin:0 auto;font-family:inherit;">${b}</button>
          `).join('')}
        </div>
        <button id="dial-call" style="width:64px;height:64px;border-radius:50%;background:#34C759;border:none;cursor:pointer;margin-top:16px;font-size:24px;">📞</button>
      </div>
    `
  }

  render()
}

export function open() { renderContent(document.createElement('div')) }
