// Notification system

let container = null

function ensureContainer() {
  if (container) return container
  container = document.createElement('div')
  container.className = 'notification-container'
  document.body.appendChild(container)
  return container
}

export function notify(title, body, duration = 4000) {
  const c = ensureContainer()

  const toast = document.createElement('div')
  toast.className = 'notification-toast'
  toast.innerHTML = `
    <div class="notification-title">${title}</div>
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
    { title: '☁️ AWS Cost Alert', body: "Your free tier expired 4 years ago. You owe mass amounts. Just kidding. Or am I?", delay: 45000 },
    { title: '🔄 ArunOS Update Available', body: "v6.5.1 — What's new: Fixed a typo in the changelog.", delay: 90000 },
    { title: '💡 Pro Tip', body: "Try typing 'sudo hire arun' in the Terminal. It's never been rejected.", delay: 60000 },
    { title: '🔋 Battery Warning', body: "Battery at 99%. It's been at 99% since 2019. I'm afraid to unplug it.", delay: 120000 },
    { title: '📡 WiFi Status', body: "Connected to FBI_Surveillance_Van_7. Signal: vibes.", delay: 150000 },
  ]

  funNotifications.forEach(n => {
    setTimeout(() => notify(n.title, n.body, 5000), n.delay)
  })
}
