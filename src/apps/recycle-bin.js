import { createWindow } from '../os/window-manager.js'

const trash = [
  { name: 'jquery-spaghetti-2019.js', size: '847 KB', date: '2019-06-14', desc: 'My first production code. No one should see this.' },
  { name: 'my-first-blockchain.sol', size: '2.1 KB', date: '2020-03-22', desc: 'DO NOT DEPLOY. I repeat, DO NOT DEPLOY.' },
  { name: 'node_modules/', size: '∞', date: 'every single day', desc: 'It keeps coming back. Like a horror movie villain.' },
  { name: 'todo-app-tutorial/', size: '156 KB', date: '2019-01-15', desc: 'The required rite of passage. Completed. Never looked at again.' },
  { name: 'fix-bug-attempt-1.patch', size: '3 KB', date: '2021-08-03', desc: 'Spoiler: it did not fix the bug.' },
  { name: 'fix-bug-attempt-2.patch', size: '3 KB', date: '2021-08-03', desc: 'Spoiler: neither did this one.' },
  { name: 'fix-bug-attempt-FINAL.patch', size: '12 KB', date: '2021-08-04', desc: 'This one worked. By mass-deleting the feature.' },
  { name: 'credentials.env', size: '1 KB', date: '2020-01-02', desc: 'Committed to git once. Once was enough.' },
]

export function open() {
  createWindow({
    id: 'recycle-bin',
    title: 'Recycle Bin — My Past Mistakes',
    icon: '🗑️',
    width: 550,
    height: 400,
    content: (el) => {
      el.style.cssText = 'padding:0;font-family:"JetBrains Mono",monospace;font-size:12px;'

      el.innerHTML = `
        <div style="padding:8px 16px;background:#111;border-bottom:1px solid #222;color:#666;font-size:11px;">
          ⚠️ WARNING: Contents of this bin may cause secondhand embarrassment. Viewer discretion advised.
        </div>
        <div style="overflow-y:auto;flex:1;">
          ${trash.map(item => `
            <div style="display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:1px solid #1a1a2a;cursor:default;">
              <span style="font-size:20px;">${item.name.endsWith('/') ? '📁' : '📄'}</span>
              <div style="flex:1;">
                <div style="color:#ccc;">${item.name}</div>
                <div style="color:#555;font-size:11px;">${item.desc}</div>
              </div>
              <div style="text-align:right;">
                <div style="color:#666;">${item.size}</div>
                <div style="color:#444;font-size:10px;">${item.date}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="padding:8px 16px;background:#111;border-top:1px solid #222;display:flex;justify-content:space-between;align-items:center;">
          <span style="color:#555;font-size:11px;">${trash.length} items | Total size: mass amounts</span>
          <button id="empty-trash" style="padding:4px 12px;background:#1a1a1a;border:1px solid #ef444444;border-radius:4px;color:#ef4444;font-size:11px;cursor:pointer;font-family:inherit;">Empty Trash</button>
        </div>
      `

      el.querySelector('#empty-trash').addEventListener('click', function() {
        this.textContent = 'Nice try. These mistakes are permanent. Like tattoos, but worse.'
        this.style.borderColor = '#555'
        this.style.color = '#666'
      })
    }
  })
}
