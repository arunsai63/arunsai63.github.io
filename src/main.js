// ArunOS — OS Router
// Detects device type and loads the appropriate OS experience
import './styles/reset.css'
import { detectOS } from './shared/os-detect.js'

async function main() {
  const root = document.getElementById('arun-os')
  const os = detectOS()

  // Store current OS for reference
  document.documentElement.dataset.os = os

  switch (os) {
    case 'android': {
      const { boot } = await import('./android/main-android.js')
      await boot(root)
      break
    }
    case 'ipados': {
      const { boot } = await import('./ipados/main-ipados.js')
      await boot(root)
      break
    }
    case 'macos':
    default: {
      const { boot } = await import('./macos/main-macos.js')
      await boot(root)
      break
    }
  }
}

main()
