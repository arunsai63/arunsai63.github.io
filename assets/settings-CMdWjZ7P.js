const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DwjHNIXK.js","assets/index-BfiTSkJx.css"])))=>i.map(i=>d[i]);
import{_ as f}from"./index-DwjHNIXK.js";import{c as m}from"./window-manager-Cm3UCJuh.js";import{g as d,p as l}from"./data-CMMTyLTn.js";const c=[{name:"Default",bg:"#1a1a2e",gradient:"radial-gradient(ellipse at 20% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)"},{name:"Midnight",bg:"#0a0a1a",gradient:"radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 60%)"},{name:"Forest",bg:"#0a1a0a",gradient:"radial-gradient(ellipse at 30% 70%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)"},{name:"Sunset",bg:"#1a0a0a",gradient:"radial-gradient(ellipse at 50% 80%, rgba(239, 68, 68, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 60% 20%, rgba(245, 158, 11, 0.05) 0%, transparent 40%)"},{name:"Void",bg:"#000",gradient:"none"}];function x(e){let n="general";function i(){e.innerHTML=`
      <div class="stg">
        <div class="stg-sidebar">
          <div class="stg-sidebar-title">Settings</div>
          ${r("general","⚙️","General")}
          ${r("display","🎨","Display")}
          ${r("about","ℹ️","About")}
          ${r("switch","🔄","Switch OS")}
        </div>
        <div class="stg-content" id="stg-content">
          ${g()}
        </div>
      </div>

      <style>
        .stg {
          display: flex; height: 100%; font-family: 'Inter', -apple-system, sans-serif;
          overflow: hidden;
        }
        .stg-sidebar {
          width: 180px; flex-shrink: 0; padding: 16px 8px;
          border-right: 1px solid rgba(255,255,255,0.06);
          background: rgba(0,0,0,0.15);
          overflow-y: auto;
        }
        .stg-sidebar-title {
          font-size: 11px; font-weight: 600; color: #555;
          text-transform: uppercase; letter-spacing: 1px;
          padding: 0 10px 12px; margin-bottom: 4px;
        }
        .stg-nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 10px; border-radius: 8px;
          cursor: pointer; transition: background 0.15s;
          margin-bottom: 2px; font-size: 13px; color: #aaa;
        }
        .stg-nav-item:hover { background: rgba(255,255,255,0.04); }
        .stg-nav-item.stg-nav-active {
          background: rgba(16,185,129,0.1); color: #10b981;
        }
        .stg-nav-icon { font-size: 16px; width: 22px; text-align: center; }

        .stg-content {
          flex: 1; padding: 20px 24px; overflow-y: auto;
        }
        .stg-section-title {
          font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 20px;
        }
        .stg-group {
          margin-bottom: 20px;
        }
        .stg-group-label {
          font-size: 11px; font-weight: 600; color: #555;
          text-transform: uppercase; letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .stg-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.04);
          margin-bottom: -1px; font-size: 13px;
        }
        .stg-row:first-child { border-radius: 10px 10px 0 0; }
        .stg-row:last-child { border-radius: 0 0 10px 10px; margin-bottom: 0; }
        .stg-row:only-child { border-radius: 10px; }
        .stg-row-label { color: #ccc; }
        .stg-row-value { color: #666; font-size: 12px; }

        .stg-wp-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
        }
        .stg-wp-card {
          cursor: pointer; border-radius: 10px; overflow: hidden;
          border: 2px solid rgba(255,255,255,0.06); transition: border-color 0.2s;
        }
        .stg-wp-card:hover { border-color: rgba(255,255,255,0.15); }
        .stg-wp-card.stg-wp-active { border-color: #10b981; }
        .stg-wp-preview { height: 56px; }
        .stg-wp-name {
          padding: 6px; text-align: center; font-size: 11px;
          color: #888; background: rgba(0,0,0,0.3);
        }

        .stg-os-card {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05); border-radius: 12px;
          cursor: pointer; transition: background 0.15s, border-color 0.15s;
          margin-bottom: 8px;
        }
        .stg-os-card:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.1); }
        .stg-os-card-current { opacity: 0.4; cursor: default; }
        .stg-os-card-current:hover { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.05); }
        .stg-os-icon { font-size: 28px; }
        .stg-os-name { font-size: 14px; color: #ddd; font-weight: 500; }
        .stg-os-desc { font-size: 11px; color: #666; margin-top: 1px; }

        .stg-info-block {
          padding: 14px; background: rgba(0,0,0,0.2); border-radius: 10px;
          font-family: 'JetBrains Mono', monospace; font-size: 11px;
          line-height: 1.9; color: rgba(255,255,255,0.4);
        }
        .stg-info-label { color: #10b981; }

        @media (max-width: 600px) {
          .stg-sidebar { width: 56px; padding: 12px 4px; }
          .stg-sidebar-title { display: none; }
          .stg-nav-item { justify-content: center; padding: 10px 6px; }
          .stg-nav-item span:last-child { display: none; }
          .stg-content { padding: 16px; }
          .stg-wp-grid { grid-template-columns: repeat(2, 1fr); }
        }
      </style>
    `,e.querySelectorAll(".stg-nav-item").forEach(a=>{a.addEventListener("click",()=>{n=a.dataset.section,i()})}),e.querySelectorAll(".stg-wp-card").forEach(a=>{a.addEventListener("click",()=>{const t=c[parseInt(a.dataset.idx)],s=document.querySelector(".desktop");s&&(s.style.background=t.bg,s.style.backgroundImage=t.gradient),e.querySelectorAll(".stg-wp-card").forEach(u=>u.classList.remove("stg-wp-active")),a.classList.add("stg-wp-active")})}),e.querySelectorAll(".stg-os-card[data-os]").forEach(a=>{a.addEventListener("click",()=>{f(async()=>{const{switchToOS:t}=await import("./index-DwjHNIXK.js").then(s=>s.o);return{switchToOS:t}},__vite__mapDeps([0,1])).then(({switchToOS:t})=>{t(a.dataset.os)})})})}function r(a,t,s){return`<div class="stg-nav-item ${n===a?"stg-nav-active":""}" data-section="${a}">
      <span class="stg-nav-icon">${t}</span><span>${s}</span>
    </div>`}function g(){switch(n){case"general":return o();case"display":return p();case"about":return v();case"switch":return b();default:return o()}}function o(){return`
      <div class="stg-section-title">General</div>
      <div class="stg-group">
        <div class="stg-group-label">System</div>
        <div class="stg-row"><span class="stg-row-label">Version</span><span class="stg-row-value">ArunOS v${d()}</span></div>
        <div class="stg-row"><span class="stg-row-label">Build</span><span class="stg-row-value">Stable (debatable)</span></div>
        <div class="stg-row"><span class="stg-row-label">Framework</span><span class="stg-row-value">Exactly zero</span></div>
        <div class="stg-row"><span class="stg-row-label">Language</span><span class="stg-row-value">Vanilla JS</span></div>
      </div>
      <div class="stg-group">
        <div class="stg-group-label">Preferences</div>
        <div class="stg-row"><span class="stg-row-label">Theme</span><span class="stg-row-value">Dark (always)</span></div>
        <div class="stg-row"><span class="stg-row-label">Sound Effects</span><span class="stg-row-value" style="color:#f59e0b;">coming soon&trade;</span></div>
        <div class="stg-row"><span class="stg-row-label">Animations</span><span class="stg-row-value">Enabled (fancy)</span></div>
      </div>`}function p(){return`
      <div class="stg-section-title">Display</div>
      <div class="stg-group">
        <div class="stg-group-label">Wallpaper</div>
        <div class="stg-wp-grid">
          ${c.map((a,t)=>`
            <div class="stg-wp-card" data-idx="${t}">
              <div class="stg-wp-preview" style="background:${a.bg};background-image:${a.gradient};"></div>
              <div class="stg-wp-name">${a.name}</div>
            </div>
          `).join("")}
        </div>
      </div>`}function v(){return`
      <div class="stg-section-title">About This Device</div>
      <div class="stg-info-block">
        <div><span class="stg-info-label">Device:</span> ArunOS Portfolio Machine</div>
        <div><span class="stg-info-label">Processor:</span> 1x Overclocked Brain (thermal throttles under deadlines)</div>
        <div><span class="stg-info-label">RAM:</span> Not enough. Never enough.</div>
        <div><span class="stg-info-label">Storage:</span> 90% Stack Overflow bookmarks</div>
        <div><span class="stg-info-label">Uptime:</span> ${d()} years (and counting)</div>
        <div><span class="stg-info-label">Kernel:</span> Full Stack Engineering</div>
        <div><span class="stg-info-label">Shell:</span> coffee-driven-development</div>
        <div><span class="stg-info-label">User:</span> ${l.name}</div>
      </div>
      <div style="text-align:center;color:#444;font-size:11px;margin-top:16px;">
        Built with mass amounts of caffeine by ${l.name}.<br>
        No frameworks were harmed in the making of this OS.
      </div>`}function b(){const a=document.documentElement.dataset.os||"macos";return`
      <div class="stg-section-title">Switch OS</div>
      <p style="font-size:12px;color:#666;margin-bottom:16px;">Choose a different ArunOS experience. The page will reload.</p>
      ${[{id:"macos",icon:"🖥️",name:"macOS Desktop",desc:"Dock, windows, widgets, terminal"},{id:"android",icon:"📱",name:"Android Phone",desc:"Material You, notifications, app drawer"},{id:"ipados",icon:"📲",name:"iPadOS Tablet",desc:"Stage Manager, Control Center, dock"}].map(s=>`
        <div class="stg-os-card ${s.id===a?"stg-os-card-current":""}" ${s.id!==a?`data-os="${s.id}"`:""}>
          <span class="stg-os-icon">${s.icon}</span>
          <div>
            <div class="stg-os-name">${s.name}${s.id===a?" (current)":""}</div>
            <div class="stg-os-desc">${s.desc}</div>
          </div>
        </div>
      `).join("")}`}i()}function k(){m({id:"settings",title:"Settings",icon:"⚙️",width:560,height:440,content:e=>x(e)})}export{k as open,x as renderContent};
