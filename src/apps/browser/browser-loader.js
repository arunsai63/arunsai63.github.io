// Browser Loader — routes to the correct browser chrome based on current OS
const os = document.documentElement.dataset.os

export async function renderContent(el) {
  if (os === 'android') {
    const mod = await import('./browser-chrome-android.js')
    mod.renderContent(el)
  } else if (os === 'ipados') {
    const mod = await import('./browser-safari-ipados.js')
    mod.renderContent(el)
  } else {
    const mod = await import('./browser-safari-macos.js')
    mod.renderContent(el)
  }
}

export async function open() {
  const { open } = await import('./browser-safari-macos.js')
  open()
}
