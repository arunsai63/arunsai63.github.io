// First Run Wizard — parody setup wizard on first visit
import { createWindow, closeWindow } from './window-manager.js'
import { notify } from './notifications.js'
import { icon } from '../shared/icons.js'

export function showFirstRunWizard() {
  // Only show once per session
  if (sessionStorage.getItem('arunos-wizard-done')) return

  setTimeout(() => {
    createWindow({
      id: 'first-run',
      title: 'Welcome to ArunOS — Setup Wizard (1 of 1, I promise)',
      icon: icon('rocket', 16),
      width: 460,
      height: 400,
      content: (el) => {
        el.innerHTML = `
          <div style="text-align:center;padding:8px;">
            <div style="margin-bottom:12px;">${icon('rocket', 48, '#10b981')}</div>
            <h2 style="color:#ddd;font-size:18px;margin-bottom:4px;">Welcome to ArunOS</h2>
            <p style="color:#555;font-size:13px;margin-bottom:20px;">The only portfolio that's also an operating system.</p>

            <div style="text-align:left;background:rgba(0,0,0,0.25);padding:16px;border-radius:8px;margin-bottom:16px;">
              <p style="color:#888;font-size:13px;margin-bottom:12px;">What brings you here today?</p>
              <div style="display:flex;flex-direction:column;gap:8px;" id="wizard-options">
                <label style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;cursor:pointer;transition:all 0.15s;color:#aaa;font-size:13px;">
                  <input type="radio" name="reason" value="hiring" style="accent-color:#10b981;">
                  <span style="display:flex;align-items:center;gap:8px;">${icon('briefcase', 16, '#888')} I'm hiring</span>
                </label>
                <label style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;cursor:pointer;transition:all 0.15s;color:#aaa;font-size:13px;">
                  <input type="radio" name="reason" value="browsing" style="accent-color:#10b981;">
                  <span style="display:flex;align-items:center;gap:8px;">${icon('eye', 16, '#888')} Just browsing</span>
                </label>
                <label style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;cursor:pointer;transition:all 0.15s;color:#aaa;font-size:13px;">
                  <input type="radio" name="reason" value="linkedin" style="accent-color:#10b981;">
                  <span style="display:flex;align-items:center;gap:8px;">${icon('compass', 16, '#888')} Stalking from LinkedIn</span>
                </label>
                <label style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;cursor:pointer;transition:all 0.15s;color:#aaa;font-size:13px;">
                  <input type="radio" name="reason" value="lost" style="accent-color:#10b981;">
                  <span style="display:flex;align-items:center;gap:8px;">${icon('mapPin', 16, '#888')} I clicked the wrong link</span>
                </label>
                <label style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;cursor:pointer;transition:all 0.15s;color:#aaa;font-size:13px;">
                  <input type="radio" name="reason" value="arun" style="accent-color:#10b981;">
                  <span style="display:flex;align-items:center;gap:8px;">${icon('home', 16, '#888')} I'm Arun and I forgot my own site</span>
                </label>
              </div>
            </div>

            <button id="wizard-continue" style="padding:10px 28px;background:#10b981;color:#000;border:none;border-radius:8px;font-weight:600;font-size:14px;cursor:pointer;font-family:inherit;">Let's Go</button>
          </div>
        `

        // Highlight selected option
        el.querySelectorAll('label').forEach(label => {
          label.addEventListener('click', () => {
            el.querySelectorAll('label').forEach(l => l.style.borderColor = '#262626')
            label.style.borderColor = '#3478f6'
          })
        })

        el.querySelector('#wizard-continue').addEventListener('click', () => {
          const selected = el.querySelector('input[name="reason"]:checked')
          const reason = selected ? selected.value : 'browsing'

          sessionStorage.setItem('arunos-wizard-done', '1')

          const responses = {
            hiring: { title: 'Welcome, Recruiter', body: "Resume is on the desktop. I promise my code is better than my interview skills.", icon: 'briefcase' },
            browsing: { title: 'Welcome, Explorer', body: "Feel free to snoop around. Try the Terminal for the full experience.", icon: 'eye' },
            linkedin: { title: 'Busted', body: "We've been expecting you. Your LinkedIn stalking session has been logged. (Not really.)", icon: 'compass' },
            lost: { title: 'Welcome Anyway', body: "You're here now. Might as well look around. It's better than whatever you were doing.", icon: 'mapPin' },
            arun: { title: 'Welcome Home, Boss', body: "Everything is running smoothly. Except the coffee machine. As usual.", icon: 'home' },
          }

          const resp = responses[reason]
          closeWindow('first-run')
          setTimeout(() => notify(resp.title, resp.body, 5000, resp.icon), 300)
        })
      }
    })
  }, 2000)
}
