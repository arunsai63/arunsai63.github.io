// Notification system
import { icon } from '../shared/icons.js'

let container = null

function ensureContainer() {
  if (container) return container
  container = document.createElement('div')
  container.className = 'notification-container'
  document.body.appendChild(container)
  return container
}

export function notify(title, body, duration = 4000, iconName = null) {
  const c = ensureContainer()

  const toast = document.createElement('div')
  toast.className = 'notification-toast'
  const iconHtml = iconName ? `<span class="notification-icon">${icon(iconName, 18, '#10b981')}</span>` : ''
  toast.innerHTML = `
    <div class="notification-header">
      ${iconHtml}
      <div class="notification-title">${title}</div>
    </div>
    <div class="notification-body">${body}</div>
  `

  toast.addEventListener('click', () => toast.remove())

  c.appendChild(toast)

  setTimeout(() => {
    toast.style.opacity = '0'
    setTimeout(() => toast.remove(), 300)
  }, duration)
}

// Scheduled fun notifications
export function startNotificationLoop() {
  const funNotifications = [
    { title: 'AWS Cost Alert', body: "Your free tier expired 4 years ago. You owe mass amounts. Just kidding. Or am I?", delay: 45000, icon: 'cloud' },
    { title: 'ArunOS Update Available', body: "What's new: Fixed a typo in the changelog. That's it. That's the update.", delay: 90000, icon: 'download' },
    { title: 'Pro Tip', body: "Try typing 'sudo hire arun' in the Terminal. It's never been rejected.", delay: 60000, icon: 'lightbulb' },
    { title: 'Battery Warning', body: "Battery at 99%. It's been at 99% since 2019. I'm afraid to unplug it.", delay: 120000, icon: 'alertTriangle' },
    { title: 'WiFi Status', body: "Connected to FBI_Surveillance_Van_7. Signal: vibes.", delay: 150000, icon: 'radio' },
  ]

  funNotifications.forEach(n => {
    setTimeout(() => notify(n.title, n.body, 5000, n.icon), n.delay)
  })
}
