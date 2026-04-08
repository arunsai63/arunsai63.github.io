// FaceTime — iPadOS only (stub)
export function renderContent(el) {
  el.innerHTML = '<div style="padding:20px;color:#888;">FaceTime coming soon...</div>'
}
export function open() { renderContent(document.createElement('div')) }
