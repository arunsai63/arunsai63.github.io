import{V as s,s as a}from"./index-Dui7f6k8.js";const n={macos:{name:"macOS Desktop",icon:"🖥️",desc:"Full desktop experience with dock, windows, and widgets"},android:{name:"Android Mobile",icon:"📱",desc:"Material You phone experience with apps and notifications"},ipados:{name:"iPadOS Tablet",icon:"📲",desc:"Stage Manager, split view, and Apple-style multitasking"}};function l(e){const t=document.createElement("div");t.style.cssText=`
    position:fixed;inset:0;z-index:999999;
    display:flex;align-items:center;justify-content:center;
    background:rgba(0,0,0,0.7);backdrop-filter:blur(12px);
    animation:osSwitcherFadeIn 0.3s ease;
  `,t.innerHTML=`
    <style>
      @keyframes osSwitcherFadeIn { from { opacity:0; } to { opacity:1; } }
      @keyframes osSwitcherCardIn { from { transform:scale(0.9);opacity:0; } to { transform:scale(1);opacity:1; } }
      .os-switch-card {
        animation: osSwitcherCardIn 0.3s cubic-bezier(0.2, 0, 0, 1);
        background: rgba(40,40,50,0.95);
        border-radius: 20px;
        padding: 32px;
        max-width: 400px;
        width: 90%;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.08);
      }
      .os-switch-option {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        border-radius: 14px;
        cursor: pointer;
        transition: background 0.2s;
        margin-bottom: 8px;
        border: 1px solid rgba(255,255,255,0.04);
      }
      .os-switch-option:hover { background: rgba(255,255,255,0.06); }
      .os-switch-option:active { background: rgba(255,255,255,0.1); }
      .os-switch-option.current {
        opacity: 0.4;
        cursor: default;
        border-color: rgba(255,255,255,0.1);
      }
      .os-switch-option.current:hover { background: transparent; }
    </style>
    <div class="os-switch-card">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="font-size:20px;font-weight:500;color:#fff;margin-bottom:6px;">Restart Into...</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.4);">Choose your ArunOS experience</div>
      </div>
      ${s.map(o=>{const i=n[o],r=o===e;return`
          <div class="os-switch-option ${r?"current":""}" data-os="${o}">
            <div style="font-size:32px;">${i.icon}</div>
            <div style="flex:1;">
              <div style="font-size:15px;color:#fff;margin-bottom:2px;">${i.name}${r?" (current)":""}</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.4);">${i.desc}</div>
            </div>
          </div>
        `}).join("")}
      <div style="text-align:center;margin-top:16px;">
        <button id="os-switch-cancel" style="padding:8px 24px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:20px;color:rgba(255,255,255,0.6);font-size:13px;cursor:pointer;font-family:inherit;">Cancel</button>
      </div>
    </div>
  `,t.addEventListener("click",o=>{o.target===t&&t.remove()}),t.querySelector("#os-switch-cancel").addEventListener("click",()=>t.remove()),t.querySelectorAll(".os-switch-option:not(.current)").forEach(o=>{o.addEventListener("click",()=>{const i=o.dataset.os;c(t,i)})}),document.body.appendChild(t)}function c(e,t){e.innerHTML=`
    <div style="text-align:center;color:#fff;font-family:'JetBrains Mono',monospace;">
      <div style="font-size:14px;color:rgba(255,255,255,0.5);margin-bottom:16px;">Restarting...</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.3);">Switching to ${n[t].name}</div>
    </div>
  `,e.style.background="#000",e.style.backdropFilter="none",setTimeout(()=>{a(t)},1200)}export{l as showOSSwitcher};
