// Fun console messages for fellow devs who open DevTools

export function initConsoleEasterEggs() {
  console.log(
    '%c🖥️ ArunOS v' + getYOE() + ' %c— If you\'re reading this, you\'re my kind of person.',
    'font-size:20px;font-weight:bold;color:#10b981;',
    'font-size:14px;color:#888;'
  )
  console.log(
    '%cNo bugs here. Only undocumented features.',
    'font-size:12px;color:#666;font-style:italic;'
  )
  console.log(
    '%cBuilt with: vanilla JS, zero frameworks, mass amounts of caffeine.',
    'font-size:12px;color:#555;'
  )
  console.log(
    '%c🤫 Psst... try typing "konami" in the terminal.',
    'font-size:12px;color:#3b82f6;'
  )
  console.warn(
    'WARNING: This developer mass-deploys on Fridays.'
  )
}

function getYOE() {
  const start = new Date(2019, 0, 1)
  return ((Date.now() - start) / (365.25 * 24 * 60 * 60 * 1000)).toFixed(1)
}
