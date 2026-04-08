// App Manifest — central registry of all apps and per-OS availability
import { icon } from './icons.js'

export const APP_MANIFEST = {
  about: {
    id: 'about',
    label: 'About Me',
    iconName: 'user',
    iconBg: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    module: () => import('../apps/about.js'),
    platforms: {
      macos:   { enabled: true },
      android: { enabled: true, label: 'About', category: 'social' },
      ipados:  { enabled: true },
    },
  },
  experience: {
    id: 'experience',
    label: 'Experience',
    iconName: 'briefcase',
    iconBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
    module: () => import('../apps/experience.js'),
    platforms: {
      macos:   { enabled: true },
      android: { enabled: true, label: 'Experience', category: 'productivity' },
      ipados:  { enabled: true },
    },
  },
  skills: {
    id: 'skills',
    label: 'Skills.txt',
    iconName: 'fileText',
    iconBg: 'linear-gradient(135deg, #10b981, #059669)',
    module: () => import('../apps/skills.js'),
    platforms: {
      macos:   { enabled: true },
      android: { enabled: true, label: 'Skills', category: 'productivity' },
      ipados:  { enabled: true },
    },
  },
  terminal: {
    id: 'terminal',
    label: 'Terminal',
    iconName: 'terminal',
    iconBg: 'linear-gradient(135deg, #1e1e1e, #333)',
    module: () => import('../apps/terminal.js'),
    platforms: {
      macos:   { enabled: true },
      android: { enabled: true, label: 'Termux', category: 'tools' },
      ipados:  { enabled: true, label: 'Terminal' },
    },
  },
  projects: {
    id: 'projects',
    label: 'Projects',
    iconName: 'folder',
    iconBg: 'linear-gradient(135deg, #6366f1, #4f46e5)',
    module: () => import('../apps/file-explorer.js'),
    platforms: {
      macos:   { enabled: true },
      android: { enabled: true, label: 'Files', category: 'tools' },
      ipados:  { enabled: true, label: 'Files' },
    },
  },
  contact: {
    id: 'contact',
    label: 'Contact',
    iconName: 'mail',
    iconBg: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    module: () => import('../apps/contact.js'),
    platforms: {
      macos:   { enabled: true },
      android: { enabled: true, label: 'Gmail', category: 'social' },
      ipados:  { enabled: true, label: 'Mail' },
    },
  },
  chat: {
    id: 'chat',
    label: 'Chat',
    iconName: 'messageCircle',
    iconBg: 'linear-gradient(135deg, #22c55e, #16a34a)',
    module: () => import('../apps/chat.js'),
    platforms: {
      macos:   { enabled: true },
      android: { enabled: true, label: 'Messages', category: 'social' },
      ipados:  { enabled: true, label: 'iMessage' },
    },
  },
  calculator: {
    id: 'calculator',
    label: 'Calculator',
    iconName: 'calculator',
    iconBg: 'linear-gradient(135deg, #f97316, #ea580c)',
    module: () => import('../apps/calculator.js'),
    platforms: {
      macos:   { enabled: true },
      android: { enabled: true, label: 'Calculator', category: 'tools' },
      ipados:  { enabled: false, hidden: true }, // The iPadOS calculator joke
    },
  },
  settings: {
    id: 'settings',
    label: 'Settings',
    iconName: 'settings',
    iconBg: 'linear-gradient(135deg, #64748b, #475569)',
    module: () => import('../apps/settings.js'),
    platforms: {
      macos:   { enabled: true },
      android: { enabled: true, label: 'Settings', category: 'tools' },
      ipados:  { enabled: true, label: 'Settings' },
    },
  },
  'recycle-bin': {
    id: 'recycle-bin',
    label: 'Recycle Bin',
    iconName: 'trash',
    iconBg: 'linear-gradient(135deg, #64748b, #475569)',
    module: () => import('../apps/recycle-bin.js'),
    platforms: {
      macos:   { enabled: true },
      android: { enabled: true, label: 'Recently Deleted', category: 'tools' },
      ipados:  { enabled: true, label: 'Recently Deleted' },
    },
  },
  portfolio: {
    id: 'portfolio',
    label: 'Portfolio',
    iconName: 'layout',
    iconBg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    module: () => import('../apps/iframe-app.js').then(m => ({
      open: () => m.openIframeApp('portfolio', 'Portfolio', 'https://arunsai63.github.io/portfolio', 'layout'),
      renderContent: m.renderIframeContent ? (el) => m.renderIframeContent(el, 'https://arunsai63.github.io/portfolio') : undefined,
    })),
    platforms: {
      macos:   { enabled: true },
      android: { enabled: true, label: 'Portfolio', category: 'productivity' },
      ipados:  { enabled: true },
    },
  },
  blog: {
    id: 'blog',
    label: 'Blog',
    iconName: 'book',
    iconBg: 'linear-gradient(135deg, #ec4899, #db2777)',
    module: () => import('../apps/iframe-app.js').then(m => ({
      open: () => m.openIframeApp('blog', 'Blog', 'https://arunsai63.github.io/blogs/', 'book'),
      renderContent: m.renderIframeContent ? (el) => m.renderIframeContent(el, 'https://arunsai63.github.io/blogs/') : undefined,
    })),
    platforms: {
      macos:   { enabled: true },
      android: { enabled: true, label: 'Blog', category: 'productivity' },
      ipados:  { enabled: true },
    },
  },
  // Android-only apps
  phone: {
    id: 'phone',
    label: 'Phone',
    iconName: 'phone',
    iconBg: 'linear-gradient(135deg, #22c55e, #16a34a)',
    module: () => import('../android/apps/phone.js'),
    platforms: {
      macos:   { enabled: false },
      android: { enabled: true, label: 'Phone', category: 'social' },
      ipados:  { enabled: false },
    },
  },
  'play-store': {
    id: 'play-store',
    label: 'Play Store',
    iconName: 'shoppingBag',
    iconBg: 'linear-gradient(135deg, #4285f4, #34a853)',
    module: () => import('../android/apps/play-store.js'),
    platforms: {
      macos:   { enabled: false },
      android: { enabled: true, label: 'Play Store', category: 'productivity' },
      ipados:  { enabled: false },
    },
  },
  assistant: {
    id: 'assistant',
    label: 'Assistant',
    iconName: 'messageCircle',
    iconBg: 'linear-gradient(135deg, #4285f4, #ea4335)',
    module: () => import('../android/apps/assistant.js'),
    platforms: {
      macos:   { enabled: false },
      android: { enabled: true, label: 'Assistant', category: 'tools' },
      ipados:  { enabled: false },
    },
  },
  // iPadOS-only apps
  facetime: {
    id: 'facetime',
    label: 'FaceTime',
    iconName: 'video',
    iconBg: 'linear-gradient(135deg, #34C759, #30B350)',
    module: () => import('../ipados/apps/facetime.js'),
    platforms: {
      macos:   { enabled: false },
      android: { enabled: false },
      ipados:  { enabled: true, label: 'FaceTime' },
    },
  },
  'notes-pencil': {
    id: 'notes-pencil',
    label: 'Sketch Pad',
    iconName: 'edit',
    iconBg: 'linear-gradient(135deg, #FFCC02, #F5A623)',
    module: () => import('../ipados/apps/notes-pencil.js'),
    platforms: {
      macos:   { enabled: false },
      android: { enabled: false },
      ipados:  { enabled: true, label: 'Notes' },
    },
  },
  shortcuts: {
    id: 'shortcuts',
    label: 'Shortcuts',
    iconName: 'zap',
    iconBg: 'linear-gradient(135deg, #FF2D55, #FF375F)',
    module: () => import('../ipados/apps/shortcuts.js'),
    platforms: {
      macos:   { enabled: false },
      android: { enabled: false },
      ipados:  { enabled: true, label: 'Shortcuts' },
    },
  },
}

export function getAppsForPlatform(platform) {
  return Object.values(APP_MANIFEST)
    .filter(app => app.platforms[platform]?.enabled)
    .map(app => ({
      ...app,
      label: app.platforms[platform]?.label || app.label,
      category: app.platforms[platform]?.category || 'other',
    }))
}

export function getAppById(id) {
  return APP_MANIFEST[id] || null
}

export function isAppAvailable(id, platform) {
  const app = APP_MANIFEST[id]
  return app?.platforms[platform]?.enabled || false
}
