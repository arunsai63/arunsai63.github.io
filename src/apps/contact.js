import { createWindow } from '../os/window-manager.js'
import { profile } from '../shared/data.js'

export function open() {
  createWindow({
    id: 'contact',
    title: 'Mail — New Message',
    icon: '📧',
    width: 550,
    height: 420,
    content: (el) => {
      el.style.cssText = 'padding:0;font-size:13px;display:flex;flex-direction:column;'

      el.innerHTML = `
        <div style="padding:12px 16px;background:#111;border-bottom:1px solid #222;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <span style="color:#666;width:40px;">To:</span>
            <span style="color:#10b981;">${profile.email}</span>
            <span style="color:#444;font-size:11px;">(read-only, obviously)</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="color:#666;width:40px;">Subj:</span>
            <input id="contact-subject" type="text" placeholder="Type or pick a suggestion..." style="flex:1;background:#1a1a1a;border:1px solid #333;border-radius:4px;padding:6px 10px;color:#ccc;font-family:inherit;font-size:13px;outline:none;" />
          </div>
          <div id="subject-suggestions" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
            ${['Job Opportunity', 'Freelance Gig', "You're a Genius", 'Found a Bug (unlikely)', 'Want to Collaborate', 'Just Saying Hi'].map(s =>
              `<button class="subject-btn" style="padding:3px 10px;background:#1a1a1a;border:1px solid #262626;border-radius:12px;font-size:11px;color:#888;cursor:pointer;font-family:inherit;">${s}</button>`
            ).join('')}
          </div>
        </div>
        <textarea id="contact-body" placeholder="Write your message here...\n\n(This will open your email client. I won't read your mind. Yet.)" style="flex:1;background:#0d0d1a;border:none;padding:16px;color:#ccc;font-family:inherit;font-size:13px;resize:none;outline:none;line-height:1.6;"></textarea>
        <div style="padding:8px 16px;background:#111;border-top:1px solid #222;display:flex;justify-content:space-between;align-items:center;">
          <button id="send-btn" style="padding:8px 20px;background:#10b981;color:#000;border-radius:6px;font-weight:600;font-size:13px;font-family:inherit;cursor:pointer;">Send ✉️</button>
          <div style="display:flex;gap:12px;">
            <a href="${profile.linkedin}" target="_blank" style="color:#666;font-size:12px;">💼 LinkedIn</a>
            <a href="${profile.github}" target="_blank" style="color:#666;font-size:12px;">🐙 GitHub</a>
            <a href="/resume.pdf" target="_blank" style="color:#666;font-size:12px;">📄 Resume</a>
          </div>
        </div>
      `

      // Subject suggestions
      el.querySelectorAll('.subject-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          el.querySelector('#contact-subject').value = btn.textContent
        })
      })

      // Send button
      el.querySelector('#send-btn').addEventListener('click', () => {
        const subject = el.querySelector('#contact-subject').value || 'Hello from ArunOS'
        const body = el.querySelector('#contact-body').value || ''
        window.open(`mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
      })
    }
  })
}
