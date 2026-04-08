import{c as i}from"./window-manager-Cm3UCJuh.js";import{g as s}from"./data-CMMTyLTn.js";const n=[{name:"Default",bg:"#1a1a2e",gradient:"radial-gradient(ellipse at 20% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)"},{name:"Midnight",bg:"#0a0a1a",gradient:"radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 60%)"},{name:"Forest",bg:"#0a1a0a",gradient:"radial-gradient(ellipse at 30% 70%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)"},{name:"Sunset",bg:"#1a0a0a",gradient:"radial-gradient(ellipse at 50% 80%, rgba(239, 68, 68, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 60% 20%, rgba(245, 158, 11, 0.05) 0%, transparent 40%)"},{name:"Void",bg:"#000000",gradient:"none"}];function d(a){a.innerHTML=`
        <h3 style="color:#fff;font-size:15px;margin-bottom:16px;">🎨 Wallpaper</h3>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px;">
          ${n.map((e,t)=>`
            <div class="wp-option" data-idx="${t}" style="cursor:pointer;border-radius:8px;overflow:hidden;border:2px solid #262626;transition:border-color 0.2s;">
              <div style="height:60px;background:${e.bg};background-image:${e.gradient};"></div>
              <div style="padding:6px;text-align:center;font-size:11px;color:#888;background:rgba(0,0,0,0.25);">${e.name}</div>
            </div>
          `).join("")}
        </div>

        <h3 style="color:#fff;font-size:15px;margin-bottom:12px;">🔊 Sound</h3>
        <p style="color:#555;font-size:12px;margin-bottom:16px;">Sound effects are currently: <span style="color:#f59e0b;">coming soon™</span></p>

        <h3 style="color:#fff;font-size:15px;margin-bottom:12px;">ℹ️ System Info</h3>
        <div style="background:rgba(0,0,0,0.25);padding:12px;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:11px;color:#666;line-height:1.8;">
          ArunOS v${s()} (Stable)<br>
          Built with: mass amounts of caffeine, Vite, vanilla JS<br>
          Frameworks used: exactly zero (flex)<br>
          Bundle size: smaller than your node_modules<br>
          Bugs: feature requests in disguise
        </div>
      `,a.querySelectorAll(".wp-option").forEach(e=>{e.addEventListener("click",()=>{const t=n[parseInt(e.dataset.idx)],r=document.querySelector(".desktop");r&&(r.style.background=t.bg,r.style.backgroundImage=t.gradient),a.querySelectorAll(".wp-option").forEach(o=>o.style.borderColor="#262626"),e.style.borderColor="#10b981"})})}function p(){i({id:"settings",title:"Settings",icon:"⚙️",width:480,height:380,content:a=>d(a)})}export{p as open,d as renderContent};
