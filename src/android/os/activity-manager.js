// Android Activity Manager — full-screen app rendering
import { getAppById } from '../../shared/app-manifest.js'
import { icon } from '../../shared/icons.js'
import { onSwipe } from '../../shared/gestures.js'

let activityStack = []
let activeActivity = null
let activityContainer = null
let onClose = null

export function initActivityManager(container, callbacks) {
  activityContainer = container
  onClose = callbacks.onClose
}

export async function openActivity(appId) {
  const appDef = getAppById(appId)
  if (!appDef) return

  // Create activity container
  const activity = document.createElement('div')
  activity.className = 'android-activity'
  activity.dataset.appId = appId

  // App bar (top)
  const appBar = document.createElement('div')
  appBar.className = 'activity-app-bar'
  appBar.innerHTML = `
    <button class="activity-back-btn">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
    </button>
    <span class="activity-title">${appDef.platforms.android?.label || appDef.label}</span>
  `

  // Content area
  const content = document.createElement('div')
  content.className = 'activity-content'

  activity.appendChild(appBar)
  activity.appendChild(content)

  // Load app content
  try {
    const mod = await appDef.module()
    if (mod.renderContent) {
      mod.renderContent(content)
    } else if (mod.open) {
      // Fallback: some apps only have open()
      content.innerHTML = '<div style="padding:20px;color:#888;">App loading...</div>'
    }
  } catch (e) {
    content.innerHTML = `<div style="padding:20px;color:#ef4444;">Failed to load app: ${appId}</div>`
  }

  // Back button
  appBar.querySelector('.activity-back-btn').addEventListener('click', () => {
    closeActivity()
  })

  // Back gesture (swipe from left edge)
  onSwipe(activity, {
    right: (data) => {
      if (data.dx > 80) closeActivity()
    }
  }, { threshold: 40 })

  // Animate in
  activityContainer.appendChild(activity)
  requestAnimationFrame(() => {
    activity.classList.add('activity-enter')
  })

  // Push to stack
  if (activeActivity) {
    activeActivity.style.display = 'none'
  }
  activityStack.push(activity)
  activeActivity = activity

  return activity
}

export function closeActivity() {
  if (!activeActivity) return

  const activity = activeActivity
  activity.classList.add('activity-exit')
  activity.classList.remove('activity-enter')

  setTimeout(() => {
    activity.remove()
    activityStack.pop()

    if (activityStack.length > 0) {
      activeActivity = activityStack[activityStack.length - 1]
      activeActivity.style.display = ''
    } else {
      activeActivity = null
      if (onClose) onClose()
    }
  }, 300)
}

export function closeAllActivities() {
  activityStack.forEach(a => a.remove())
  activityStack = []
  activeActivity = null
}

export function getActivityStack() {
  return [...activityStack]
}

export function hasActiveActivity() {
  return activeActivity !== null
}
