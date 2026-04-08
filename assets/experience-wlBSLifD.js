import{c as d}from"./window-manager-Cm3UCJuh.js";import{e as n}from"./data-CMMTyLTn.js";function p(s){s.style.padding="0",s.innerHTML=`
        <div style="font-family:'JetBrains Mono',monospace;font-size:12px;">
          <!-- Header bars -->
          <div style="padding:12px 16px;background:#0d0d1a;border-bottom:1px solid #222;">
            <div style="display:flex;gap:24px;margin-bottom:8px;">
              <div>
                <span style="color:#666;">CPU:</span>
                <span style="color:#10b981;">Solutions Architecture</span>
                <div style="height:4px;background:rgba(255,255,255,0.04);border-radius:2px;margin-top:4px;width:200px;overflow:hidden;">
                  <div style="height:100%;width:87%;background:linear-gradient(90deg,#10b981,#3b82f6);border-radius:2px;"></div>
                </div>
              </div>
              <div>
                <span style="color:#666;">MEM:</span>
                <span style="color:#3b82f6;">Experience Cache</span>
                <div style="height:4px;background:rgba(255,255,255,0.04);border-radius:2px;margin-top:4px;width:200px;overflow:hidden;">
                  <div style="height:100%;width:65%;background:linear-gradient(90deg,#3b82f6,#8b5cf6);border-radius:2px;"></div>
                </div>
              </div>
            </div>
            <div style="color:#555;font-size:11px;">Tasks: ${n.length} | Running: 1 | Completed: ${n.length-1} | Coffee consumed: yes</div>
          </div>

          <!-- Process table header -->
          <div style="display:grid;grid-template-columns:40px 1fr 180px 100px 70px 70px 120px;padding:8px 16px;background:rgba(0,0,0,0.25)128;color:#666;font-size:11px;border-bottom:1px solid #1a1a1a;position:sticky;top:0;">
            <span>PID</span>
            <span>PROCESS</span>
            <span>COMPANY</span>
            <span>DATES</span>
            <span>CPU%</span>
            <span>MEM</span>
            <span>STATUS</span>
          </div>

          <!-- Process rows -->
          <div id="process-list">
            ${n.map((e,i)=>`
              <div class="process-row" data-idx="${i}" style="display:grid;grid-template-columns:40px 1fr 180px 100px 70px 70px 120px;padding:10px 16px;border-bottom:1px solid #1a1a2a;cursor:pointer;transition:background 0.15s;align-items:center;">
                <span style="color:#555;">${1e3+i}</span>
                <span style="color:#ccc;">${e.processName}</span>
                <span style="color:#888;">${e.company}</span>
                <span style="color:#666;font-size:11px;">${e.dates.split(" - ")[0]}</span>
                <span style="color:${parseFloat(e.cpu)>80?"#ef4444":parseFloat(e.cpu)>50?"#f59e0b":"#10b981"};">${e.cpu}</span>
                <span style="color:#888;">${e.mem}</span>
                <span style="color:${e.status.includes("CANNOT")||e.status.includes("PRINTING")?"#10b981":e.status==="RUNNING"?"#3b82f6":"#666"};font-size:11px;">${e.status}</span>
              </div>
            `).join("")}
          </div>

          <!-- Expanded detail -->
          <div id="process-detail" style="display:none;padding:16px;background:#0d0d1a;border-top:2px solid #10b981;"></div>
        </div>
      `,s.querySelectorAll(".process-row").forEach(e=>{e.addEventListener("click",()=>{const i=parseInt(e.dataset.idx),t=n[i],a=s.querySelector("#process-detail");s.querySelectorAll(".process-row").forEach(o=>o.style.background=""),e.style.background="rgba(16, 185, 129, 0.08)",a.style.display="block",a.innerHTML=`
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
              <div>
                <h3 style="color:#fff;font-size:15px;margin-bottom:2px;">${t.title}</h3>
                <p style="color:#10b981;font-size:13px;">${t.company} | ${t.dates}</p>
              </div>
              <button onclick="this.closest('#process-detail').style.display='none'" style="color:#666;font-size:16px;cursor:pointer;background:none;border:none;">✕</button>
            </div>
            <ul style="padding-left:16px;list-style:disc;margin-bottom:12px;color:#aaa;line-height:1.8;">
              ${t.bullets.map(o=>`<li>${o}</li>`).join("")}
            </ul>
            <div style="display:flex;flex-wrap:wrap;gap:6px;">
              ${t.tech.map(o=>`<span style="padding:2px 8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:4px;font-size:11px;color:#888;">${o}</span>`).join("")}
            </div>
            <div style="margin-top:12px;color:#555;font-size:11px;">
              <button style="color:#ef4444;border:1px solid #ef444444;border-radius:4px;padding:3px 10px;font-size:11px;cursor:pointer;background:none;font-family:inherit;" onclick="this.textContent='Nice try. I\\'m still employed. 😏';">Kill Process</button>
            </div>
          `}),e.addEventListener("mouseenter",()=>{e.style.background||(e.style.background="rgba(255,255,255,0.03)")}),e.addEventListener("mouseleave",()=>{e.style.background==="rgba(255, 255, 255, 0.03)"&&(e.style.background="")})})}function c(){d({id:"experience",title:"System Monitor — Experience.exe",icon:"📊",width:750,height:550,content:s=>p(s)})}export{c as open,p as renderContent};
