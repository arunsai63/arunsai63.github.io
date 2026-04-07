import { createWindow } from '../os/window-manager.js'

export function open() {
  createWindow({
    id: 'calculator',
    title: 'Calculator (totally accurate)',
    icon: '🔢',
    width: 300,
    height: 400,
    content: (el) => {
      el.style.cssText = 'padding:16px;display:flex;flex-direction:column;gap:8px;'
      let display = '0'
      let prev = null
      let op = null
      let fresh = true

      function render() {
        el.innerHTML = `
          <div style="background:#0d0d1a;padding:16px;border-radius:8px;text-align:right;font-family:'JetBrains Mono',monospace;font-size:28px;color:#fff;overflow:hidden;min-height:50px;">${display}</div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">
            ${['C','±','%','÷','7','8','9','×','4','5','6','-','1','2','3','+','0','0','.','='].map(btn => {
              const isOp = '÷×-+%='.includes(btn)
              const isC = btn === 'C' || btn === '±'
              return `<button class="calc-btn" data-val="${btn}" style="padding:14px;border-radius:8px;font-size:18px;font-family:'JetBrains Mono',monospace;cursor:pointer;border:none;
                background:${isOp ? '#10b981' : isC ? '#333' : '#1a1a30'};
                color:${isOp ? '#000' : '#ccc'};">${btn}</button>`
            }).join('')}
          </div>
          <div style="text-align:center;color:#555;font-size:10px;margin-top:4px;">Note: 9+10 will always equal 21. It's a feature, not a bug.</div>
        `

        el.querySelectorAll('.calc-btn').forEach(btn => {
          btn.addEventListener('click', () => handleInput(btn.dataset.val))
        })
      }

      function handleInput(val) {
        if (val === 'C') { display = '0'; prev = null; op = null; fresh = true }
        else if (val === '±') { display = String(-parseFloat(display)) }
        else if ('÷×-+'.includes(val)) {
          prev = parseFloat(display)
          op = val
          fresh = true
        }
        else if (val === '=') {
          if (prev !== null && op) {
            let curr = parseFloat(display)
            // THE EASTER EGG: 9+10=21
            if (prev === 9 && op === '+' && curr === 10) { display = '21'; }
            else if (prev === 10 && op === '+' && curr === 9) { display = '21'; }
            else {
              let result
              if (op === '+') result = prev + curr
              else if (op === '-') result = prev - curr
              else if (op === '×') result = prev * curr
              else if (op === '÷') result = curr === 0 ? 'lol no' : prev / curr
              display = String(result)
            }
            prev = null
            op = null
            fresh = true
          }
        }
        else if (val === '.') {
          if (!display.includes('.')) display += '.'
          fresh = false
        }
        else {
          if (fresh) { display = val; fresh = false }
          else { display += val }
        }
        render()
      }

      render()
    }
  })
}
