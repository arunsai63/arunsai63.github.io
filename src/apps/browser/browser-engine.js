// Browser Engine — shared navigation, history, and iframe management

const DEFAULT_BOOKMARKS = [
  { label: 'Portfolio', url: 'https://arunsai63.github.io/portfolio', icon: '🎨', letter: 'P', color: '#8b5cf6' },
  { label: 'Blog', url: 'https://arunsai63.github.io/blogs/', icon: '📝', letter: 'B', color: '#ec4899' },
  { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Main_Page', icon: '🌐', letter: 'W', color: '#636363' },
  { label: 'MDN Docs', url: 'https://developer.mozilla.org/', icon: '📖', letter: 'M', color: '#1a73e8' },
]

export { DEFAULT_BOOKMARKS }

export function createBrowserEngine() {
  const history = []
  let historyIndex = -1
  let currentUrl = ''
  let loading = false
  let iframe = null
  let loadTimeout = null
  const listeners = []

  function notify() {
    const state = getState()
    listeners.forEach(cb => cb(state))
  }

  function getState() {
    return {
      url: currentUrl,
      displayUrl: getDisplayUrl(currentUrl),
      loading,
      canGoBack: historyIndex > 0,
      canGoForward: historyIndex < history.length - 1,
      isStartPage: !currentUrl,
    }
  }

  function getDisplayUrl(url) {
    if (!url) return ''
    try {
      const u = new URL(url)
      return u.hostname.replace(/^www\./, '')
    } catch {
      return url
    }
  }

  function normalizeUrl(input) {
    if (!input || !input.trim()) return ''
    let url = input.trim()

    // If it looks like a search query (no dots, no protocol)
    if (!url.includes('.') && !url.startsWith('http')) {
      return `https://duckduckgo.com/?q=${encodeURIComponent(url)}`
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url
    }

    try {
      new URL(url) // validate
      return url
    } catch {
      return `https://duckduckgo.com/?q=${encodeURIComponent(input.trim())}`
    }
  }

  function navigate(input) {
    const url = normalizeUrl(input)
    if (!url) return

    // Truncate forward history
    if (historyIndex < history.length - 1) {
      history.splice(historyIndex + 1)
    }
    history.push(url)
    historyIndex = history.length - 1
    currentUrl = url

    loadUrl(url)
  }

  function goBack() {
    if (historyIndex <= 0) return
    historyIndex--
    currentUrl = history[historyIndex]
    loadUrl(currentUrl)
  }

  function goForward() {
    if (historyIndex >= history.length - 1) return
    historyIndex++
    currentUrl = history[historyIndex]
    loadUrl(currentUrl)
  }

  function refresh() {
    if (currentUrl && iframe) {
      loadUrl(currentUrl)
    }
  }

  function goHome() {
    currentUrl = ''
    loading = false
    if (iframe) iframe.style.display = 'none'
    notify()
  }

  function loadUrl(url) {
    if (!iframe) return
    loading = true
    notify()

    clearTimeout(loadTimeout)
    iframe.style.display = 'block'
    iframe.src = url

    // Timeout fallback — some blocked sites never fire load
    loadTimeout = setTimeout(() => {
      loading = false
      notify()
    }, 6000)
  }

  function createIframe() {
    iframe = document.createElement('iframe')
    iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox'
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    iframe.style.cssText = 'border:none;width:100%;height:100%;flex:1;background:#fff;display:none;'

    iframe.addEventListener('load', () => {
      clearTimeout(loadTimeout)
      loading = false
      notify()
    })

    iframe.addEventListener('error', () => {
      clearTimeout(loadTimeout)
      loading = false
      notify()
    })

    return iframe
  }

  function onStateChange(cb) {
    listeners.push(cb)
    return () => {
      const idx = listeners.indexOf(cb)
      if (idx >= 0) listeners.splice(idx, 1)
    }
  }

  function destroy() {
    clearTimeout(loadTimeout)
    listeners.length = 0
    if (iframe) {
      iframe.src = 'about:blank'
      iframe = null
    }
  }

  return {
    navigate,
    goBack,
    goForward,
    refresh,
    goHome,
    getState,
    createIframe,
    onStateChange,
    destroy,
  }
}
