// OS Detection — determines which OS experience to load

const VALID_OS = ['macos', 'android', 'ipados']
const STORAGE_KEY = 'arunos-preferred-os'

/**
 * Detect which OS to show, priority:
 * 1. URL param ?os=android|ipados|macos
 * 2. localStorage preference (user chose via switcher)
 * 3. Auto-detect based on device
 */
export function detectOS() {
  // 1. URL parameter override
  const params = new URLSearchParams(window.location.search)
  const urlOS = params.get('os')
  if (urlOS && VALID_OS.includes(urlOS)) {
    return urlOS
  }

  // 2. Stored preference
  const stored = getOSPreference()
  if (stored) return stored

  // 3. Auto-detect
  return autoDetect()
}

function autoDetect() {
  const width = window.innerWidth
  const isTouch = isTouchDevice()
  const ua = navigator.userAgent

  // Mobile: narrow screen + touch or mobile UA
  const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  if (width < 768 && (isTouch || isMobileUA)) {
    return 'android'
  }

  // Tablet: mid-range screen + touch
  // iPadOS Safari reports desktop UA, so check maxTouchPoints
  const isTabletUA = /iPad/i.test(ua)
  const isIPadOS = navigator.maxTouchPoints > 1 && /Macintosh/i.test(ua)
  if ((width >= 768 && width <= 1024 && isTouch) || isTabletUA || isIPadOS) {
    return 'ipados'
  }

  // Desktop
  return 'macos'
}

function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  )
}

export function getOSPreference() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && VALID_OS.includes(stored)) return stored
  } catch (e) { /* localStorage unavailable */ }
  return null
}

export function setOSPreference(osType) {
  if (!VALID_OS.includes(osType)) return
  try {
    localStorage.setItem(STORAGE_KEY, osType)
  } catch (e) { /* localStorage unavailable */ }
}

export function clearOSPreference() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) { /* localStorage unavailable */ }
}

export function switchToOS(osType) {
  if (!VALID_OS.includes(osType)) return
  setOSPreference(osType)
  // Clean reload with OS param
  const url = new URL(window.location.href)
  url.searchParams.set('os', osType)
  window.location.href = url.toString()
}

export { VALID_OS }
