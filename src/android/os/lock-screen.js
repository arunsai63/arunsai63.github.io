// Android Lock Screen — hyper-realistic Android 14
import { onSwipe } from '../../shared/gestures.js'

export function showLockScreen(container) {
  return new Promise((resolve) => {
    const lock = document.createElement('div')
    lock.className = 'android-lock-screen'

    function updateClock() {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const mins = now.getMinutes().toString().padStart(2, '0')
      const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

      lock.innerHTML = `
        <div class="lock-screen-content">
          <div class="lock-clock">
            <div class="lock-clock-hours">${hours}</div>
            <div class="lock-clock-minutes">${mins}</div>
          </div>
          <div class="lock-date">${dateStr}</div>

          <div class="lock-notifications">
            <div class="lock-notification">
              <div class="lock-notif-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </div>
              <div class="lock-notif-content">
                <div class="lock-notif-app">Gmail</div>
                <div class="lock-notif-text">RE: RE: RE: FWD: Urgent Production Issue</div>
              </div>
              <div class="lock-notif-time">2m ago</div>
            </div>
            <div class="lock-notification">
              <div class="lock-notif-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              </div>
              <div class="lock-notif-content">
                <div class="lock-notif-app">GitHub</div>
                <div class="lock-notif-text">3 new stars on arun-os (we both know it's you)</div>
              </div>
              <div class="lock-notif-time">15m ago</div>
            </div>
          </div>

          <div class="lock-bottom">
            <div class="lock-shortcut lock-shortcut-flashlight">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" opacity="0.5"><path d="M6 14l3 3v5h6v-5l3-3V9H6v5zm5-12h2v3h-2V2zM3.5 5.88l1.41-1.41 2.12 2.12-1.41 1.41L3.5 5.88zm13.46.71l2.12-2.12 1.41 1.41-2.12 2.12-1.41-1.41z"/></svg>
            </div>
            <div class="lock-swipe-hint">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z"/></svg>
              <span>Swipe up to unlock</span>
            </div>
            <div class="lock-shortcut lock-shortcut-camera">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" opacity="0.5"><path d="M12 15.2c1.77 0 3.2-1.43 3.2-3.2S13.77 8.8 12 8.8 8.8 10.23 8.8 12s1.43 3.2 3.2 3.2zm7-8.2h-2.59l-1.83-2H9.41L7.59 7H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z"/></svg>
            </div>
          </div>
        </div>
      `
    }

    updateClock()
    const clockInterval = setInterval(updateClock, 30000)

    container.appendChild(lock)

    // Unlock on swipe up or click
    const unlock = () => {
      clearInterval(clockInterval)
      lock.classList.add('lock-screen-unlocking')
      setTimeout(() => {
        lock.remove()
        resolve()
      }, 400)
    }

    onSwipe(lock, { up: unlock })
    lock.addEventListener('click', unlock)
  })
}
