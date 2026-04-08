import { createWindow } from '../macos/os/window-manager.js'
import { experience } from '../shared/data.js'

export function renderContent(el) {
  el.style.cssText = 'padding:0;font-family:"JetBrains Mono",monospace;font-size:13px;overflow-y:auto;'

  el.innerHTML = `
    <div class="exp-container">
      <div class="exp-header">
        <div class="exp-header-title">Career Timeline</div>
        <div class="exp-header-sub">${experience.length} roles &middot; ${experience[0].dates.split(' - ')[1] === 'Present' ? 'Currently active' : ''}</div>
      </div>
      <div class="exp-timeline">
        ${experience.map((exp, i) => `
          <div class="exp-card" data-idx="${i}">
            <div class="exp-card-dot" style="background:${i === 0 ? '#10b981' : i < 3 ? '#3b82f6' : '#666'};"></div>
            <div class="exp-card-line"></div>
            <div class="exp-card-body">
              <div class="exp-card-top">
                <div class="exp-card-role">${exp.title}</div>
                <span class="exp-card-status" style="color:${exp.status.includes('CANNOT') || exp.status.includes('PRINTING') ? '#10b981' : exp.status === 'RUNNING' ? '#3b82f6' : '#666'};">${exp.status}</span>
              </div>
              <div class="exp-card-company">${exp.company} &middot; ${exp.dates}</div>
              <div class="exp-card-metrics">
                <span class="exp-metric"><span class="exp-metric-label">CPU</span> ${exp.cpu}</span>
                <span class="exp-metric"><span class="exp-metric-label">MEM</span> ${exp.mem}</span>
                <span class="exp-metric"><span class="exp-metric-label">PID</span> ${1000 + i}</span>
              </div>
              <div class="exp-card-detail" id="exp-detail-${i}" style="display:none;">
                <ul class="exp-bullets">
                  ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
                </ul>
                <div class="exp-tech-tags">
                  ${exp.tech.map(t => `<span class="exp-tech-tag">${t}</span>`).join('')}
                </div>
                <button class="exp-kill-btn" data-idx="${i}">Kill Process</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    <style>
      .exp-container { padding: 0; }
      .exp-header {
        padding: 16px 20px 12px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
        background: rgba(0,0,0,0.2);
      }
      .exp-header-title { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 2px; }
      .exp-header-sub { font-size: 11px; color: #666; }
      .exp-timeline { padding: 8px 16px 20px; }
      .exp-card {
        display: flex;
        gap: 14px;
        position: relative;
        padding: 14px 0;
        cursor: pointer;
        transition: background 0.15s;
        border-radius: 8px;
      }
      .exp-card:hover { background: rgba(255,255,255,0.02); }
      .exp-card-dot {
        width: 10px; height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
        margin-top: 5px;
        z-index: 1;
      }
      .exp-card-line {
        position: absolute;
        left: 4.5px;
        top: 28px;
        bottom: -14px;
        width: 1px;
        background: rgba(255,255,255,0.08);
      }
      .exp-card:last-child .exp-card-line { display: none; }
      .exp-card-body { flex: 1; min-width: 0; }
      .exp-card-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 2px;
      }
      .exp-card-role {
        font-size: 14px;
        font-weight: 600;
        color: #eee;
      }
      .exp-card-status {
        font-size: 10px;
        font-weight: 500;
        white-space: nowrap;
        padding: 2px 8px;
        border-radius: 10px;
        background: rgba(255,255,255,0.04);
        flex-shrink: 0;
      }
      .exp-card-company {
        font-size: 12px;
        color: #888;
        margin-bottom: 6px;
      }
      .exp-card-metrics {
        display: flex;
        gap: 12px;
        font-size: 11px;
      }
      .exp-metric { color: #666; }
      .exp-metric-label { color: #10b981; margin-right: 3px; }
      .exp-card-detail {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid rgba(255,255,255,0.06);
        animation: expDetailIn 0.25s ease;
      }
      @keyframes expDetailIn {
        from { opacity: 0; transform: translateY(-6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .exp-bullets {
        padding-left: 16px;
        list-style: disc;
        color: #aaa;
        font-size: 12px;
        line-height: 1.8;
        margin-bottom: 10px;
      }
      .exp-tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-bottom: 10px;
      }
      .exp-tech-tag {
        padding: 2px 8px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 4px;
        font-size: 10px;
        color: #888;
      }
      .exp-kill-btn {
        color: #ef4444;
        border: 1px solid rgba(239,68,68,0.3);
        border-radius: 4px;
        padding: 3px 10px;
        font-size: 11px;
        cursor: pointer;
        background: none;
        font-family: inherit;
        transition: background 0.15s;
      }
      .exp-kill-btn:hover { background: rgba(239,68,68,0.08); }
    </style>
  `

  // Click to expand/collapse
  el.querySelectorAll('.exp-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.exp-kill-btn')) return
      const idx = card.dataset.idx
      const detail = el.querySelector(`#exp-detail-${idx}`)
      const isOpen = detail.style.display !== 'none'

      // Close all
      el.querySelectorAll('.exp-card-detail').forEach(d => d.style.display = 'none')
      el.querySelectorAll('.exp-card').forEach(c => c.style.background = '')

      if (!isOpen) {
        detail.style.display = 'block'
        card.style.background = 'rgba(16, 185, 129, 0.04)'
      }
    })
  })

  // Kill process buttons
  el.querySelectorAll('.exp-kill-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      btn.textContent = "Nice try. I'm still employed."
      btn.style.borderColor = '#555'
      btn.style.color = '#666'
    })
  })
}

export function open() {
  createWindow({
    id: 'experience',
    title: 'System Monitor — Experience.exe',
    icon: '📊',
    width: 600,
    height: 520,
    content: (el) => renderContent(el),
  })
}
