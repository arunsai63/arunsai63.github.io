import{c as d}from"./window-manager-Cm3UCJuh.js";import{e as s}from"./data-CMMTyLTn.js";function l(t){t.style.cssText='padding:0;font-family:"JetBrains Mono",monospace;font-size:13px;overflow-y:auto;',t.innerHTML=`
    <div class="exp-container">
      <div class="exp-header">
        <div class="exp-header-title">Career Timeline</div>
        <div class="exp-header-sub">${s.length} roles &middot; ${s[0].dates.split(" - ")[1]==="Present"?"Currently active":""}</div>
      </div>
      <div class="exp-timeline">
        ${s.map((e,a)=>`
          <div class="exp-card" data-idx="${a}">
            <div class="exp-card-dot" style="background:${a===0?"#10b981":a<3?"#3b82f6":"#666"};"></div>
            <div class="exp-card-line"></div>
            <div class="exp-card-body">
              <div class="exp-card-top">
                <div class="exp-card-role">${e.title}</div>
                <span class="exp-card-status" style="color:${e.status.includes("CANNOT")||e.status.includes("PRINTING")?"#10b981":e.status==="RUNNING"?"#3b82f6":"#666"};">${e.status}</span>
              </div>
              <div class="exp-card-company">${e.company} &middot; ${e.dates}</div>
              <div class="exp-card-metrics">
                <span class="exp-metric"><span class="exp-metric-label">CPU</span> ${e.cpu}</span>
                <span class="exp-metric"><span class="exp-metric-label">MEM</span> ${e.mem}</span>
                <span class="exp-metric"><span class="exp-metric-label">PID</span> ${1e3+a}</span>
              </div>
              <div class="exp-card-detail" id="exp-detail-${a}" style="display:none;">
                <ul class="exp-bullets">
                  ${e.bullets.map(i=>`<li>${i}</li>`).join("")}
                </ul>
                <div class="exp-tech-tags">
                  ${e.tech.map(i=>`<span class="exp-tech-tag">${i}</span>`).join("")}
                </div>
                <button class="exp-kill-btn" data-idx="${a}">Kill Process</button>
              </div>
            </div>
          </div>
        `).join("")}
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
  `,t.querySelectorAll(".exp-card").forEach(e=>{e.addEventListener("click",a=>{if(a.target.closest(".exp-kill-btn"))return;const i=e.dataset.idx,p=t.querySelector(`#exp-detail-${i}`),o=p.style.display!=="none";t.querySelectorAll(".exp-card-detail").forEach(r=>r.style.display="none"),t.querySelectorAll(".exp-card").forEach(r=>r.style.background=""),o||(p.style.display="block",e.style.background="rgba(16, 185, 129, 0.04)")})}),t.querySelectorAll(".exp-kill-btn").forEach(e=>{e.addEventListener("click",a=>{a.stopPropagation(),e.textContent="Nice try. I'm still employed.",e.style.borderColor="#555",e.style.color="#666"})})}function x(){d({id:"experience",title:"System Monitor — Experience.exe",icon:"📊",width:600,height:520,content:t=>l(t)})}export{x as open,l as renderContent};
