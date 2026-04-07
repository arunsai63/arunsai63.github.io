// App Registry — central registry of all apps
import { createWindow } from '../os/window-manager.js'
import { icon } from '../shared/icons.js'

const apps = {
  about: { id: 'about', label: 'About Me', icon: icon('user', 16), module: () => import('./about.js') },
  experience: { id: 'experience', label: 'Experience', icon: icon('briefcase', 16), module: () => import('./experience.js') },
  skills: { id: 'skills', label: 'Skills.txt', icon: icon('fileText', 16), module: () => import('./skills.js') },
  terminal: { id: 'terminal', label: 'Terminal', icon: icon('terminal', 16), module: () => import('./terminal.js') },
  projects: { id: 'projects', label: 'Projects', icon: icon('folder', 16), module: () => import('./file-explorer.js') },
  contact: { id: 'contact', label: 'Contact', icon: icon('mail', 16), module: () => import('./contact.js') },
  chat: { id: 'chat', label: 'Chat', icon: icon('messageCircle', 16), module: () => import('./chat.js') },
  calculator: { id: 'calculator', label: 'Calculator', icon: icon('calculator', 16), module: () => import('./calculator.js') },
  settings: { id: 'settings', label: 'Settings', icon: icon('settings', 16), module: () => import('./settings.js') },
  'recycle-bin': { id: 'recycle-bin', label: 'Recycle Bin', icon: icon('trash', 16), module: () => import('./recycle-bin.js') },
}

export function appList() {
  return Object.values(apps)
}

export async function openApp(id) {
  const app = apps[id]
  if (!app) return

  const mod = await app.module()
  mod.open()
}
