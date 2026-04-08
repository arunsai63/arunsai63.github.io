const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-BPVmKUjw.js","assets/index-BfiTSkJx.css"])))=>i.map(i=>d[i]);
import"./data-CMMTyLTn.js";import{o as m,g as T,a as O,b as z}from"./app-manifest-rDb5Koko.js";import{i as M,a as I,b as D}from"./console-easter-egg-Ch-v8MMI.js";import{_}from"./index-BPVmKUjw.js";function P(i){return new Promise(e=>{const t=document.createElement("div");t.className="android-boot-overlay",t.innerHTML=`
      <div class="android-boot-logo">ArunOS</div>
      <div class="android-boot-spinner">
        <svg viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="80 200" stroke-linecap="round">
            <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1.2s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
      <div class="android-boot-subtitle">Powered by mass caffeine</div>
    `,i.appendChild(t);const n=()=>{t.style.opacity="0",t.style.transition="opacity 0.4s ease",setTimeout(()=>{t.remove(),e()},400)};t.addEventListener("click",n,{once:!0}),t.addEventListener("touchstart",n,{once:!0}),setTimeout(n,2500)})}const R='<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>',V='<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M2 22h20V2L2 22zm18-2h-3V9.83l3-3V20z" opacity="0.3"/><path d="M17 20h3V6.83l-3 3V20zM2 22h20V2L2 22zm18-2H6.83L20 6.83V20z"/></svg>';function F(i){const e=document.createElement("div");e.className="android-status-bar";function t(){const s=new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1});e.innerHTML=`
      <div class="status-bar-left">
        <span class="status-bar-time">${s}</span>
      </div>
      <div class="status-bar-right">
        ${R}
        ${V}
        <span class="status-bar-battery" id="android-battery"></span>
      </div>
    `,n()}async function n(){const a=e.querySelector("#android-battery");if(a)try{if("getBattery"in navigator){const s=await navigator.getBattery(),l=Math.round(s.level*100);a.innerHTML=`
          <span style="font-size:11px;margin-right:2px;">${l}%</span>
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
            <rect x="0.5" y="0.5" width="18" height="11" rx="2" stroke="white" stroke-width="1"/>
            <rect x="19" y="3" width="2" height="5" rx="1" fill="white"/>
            <rect x="2" y="2" width="${l/100*15}" height="7" rx="1" fill="${l<20?"#ef4444":"#fff"}"/>
          </svg>
        `}else a.innerHTML=`
          <span style="font-size:11px;margin-right:2px;">87%</span>
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
            <rect x="0.5" y="0.5" width="18" height="11" rx="2" stroke="white" stroke-width="1"/>
            <rect x="19" y="3" width="2" height="5" rx="1" fill="white"/>
            <rect x="2" y="2" width="13" height="7" rx="1" fill="#fff"/>
          </svg>
        `}catch{a.textContent="87%"}}return t(),setInterval(t,3e4),i.appendChild(e),e}let u={};function j(i){const e=document.createElement("div");e.className="android-nav-bar",e.innerHTML='<div class="android-nav-pill"></div>',i.appendChild(e);const t=e.querySelector(".android-nav-pill");return m(t,{up:()=>{u.onHome&&u.onHome()}}),m(i,{up:n=>{n.dy<-100?u.onRecents&&u.onRecents():u.onHome&&u.onHome()}},{threshold:30}),e}function G(i){u=i}let b=null,y=null;function U(i){b=i.onAppOpen,y=i.onDrawerOpen}function W(i){const e=document.createElement("div");e.className="android-home-screen";const t=T("android"),n=20,a=[];for(let r=0;r<t.length;r+=n)a.push(t.slice(r,r+n));let s=0;e.innerHTML=`
    <div class="home-search-bar">
      <div class="home-search-pill">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="#888"/>
        </svg>
        <span class="home-search-text">Search apps & more</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" fill="#888"/>
        </svg>
      </div>
    </div>

    <div class="home-pages-wrapper">
      <div class="home-pages" id="home-pages">
        ${a.map((r,v)=>`
          <div class="home-page" data-page="${v}">
            <div class="home-app-grid">
              ${r.map(f=>`
                <div class="home-app-icon" data-app-id="${f.id}">
                  <div class="home-icon-bg" style="background:${f.iconBg}">
                    ${M(f.iconName,28,"#fff")}
                  </div>
                  <span class="home-app-label">${f.label}</span>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="home-page-dots">
      ${a.map((r,v)=>`<div class="home-dot ${v===0?"active":""}"></div>`).join("")}
    </div>
  `,e.querySelectorAll(".home-app-icon").forEach(r=>{r.addEventListener("click",()=>{const v=r.dataset.appId;r.querySelector(".home-icon-bg").classList.add("icon-pressed"),setTimeout(()=>{r.querySelector(".home-icon-bg").classList.remove("icon-pressed")},150),b&&b(v)}),O(r,()=>{r.classList.add("icon-wiggle"),setTimeout(()=>r.classList.remove("icon-wiggle"),600)},400)});const l=e.querySelector("#home-pages");m(l,{left:()=>{s<a.length-1&&(s++,p())},right:()=>{s>0&&(s--,p())},up:()=>{y&&y()}});function p(){l.style.transform=`translateX(-${s*100}%)`,e.querySelectorAll(".home-dot").forEach((r,v)=>{r.classList.toggle("active",v===s)})}return i.appendChild(e),e}let h=[],c=null,N=null,L=null;function Y(i,e){N=i,L=e.onClose}async function E(i){var s;const e=z(i);if(!e)return;const t=document.createElement("div");t.className="android-activity",t.dataset.appId=i;const n=document.createElement("div");n.className="activity-app-bar",n.innerHTML=`
    <button class="activity-back-btn">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
    </button>
    <span class="activity-title">${((s=e.platforms.android)==null?void 0:s.label)||e.label}</span>
  `;const a=document.createElement("div");a.className="activity-content",t.appendChild(n),t.appendChild(a);try{const l=await e.module();l.renderContent?l.renderContent(a):l.open&&(a.innerHTML='<div style="padding:20px;color:#888;">App loading...</div>')}catch{a.innerHTML=`<div style="padding:20px;color:#ef4444;">Failed to load app: ${i}</div>`}return n.querySelector(".activity-back-btn").addEventListener("click",()=>{C()}),m(t,{right:l=>{l.dx>80&&C()}},{threshold:40}),N.appendChild(t),requestAnimationFrame(()=>{t.classList.add("activity-enter")}),c&&(c.style.display="none"),h.push(t),c=t,t}function C(){if(!c)return;const i=c;i.classList.add("activity-exit"),i.classList.remove("activity-enter"),setTimeout(()=>{i.remove(),h.pop(),h.length>0?(c=h[h.length-1],c.style.display=""):(c=null,L&&L())},300)}function Q(){h.forEach(i=>i.remove()),h=[],c=null}function J(){return c!==null}const K=[{id:"wifi",icon:"wifi",label:"Wi-Fi",subtitle:"FBI_Surveillance_Van_7",active:!0},{id:"bluetooth",icon:"bluetooth",label:"Bluetooth",subtitle:"mechanical keyboard",active:!0},{id:"dnd",icon:"bellOff",label:"DND",subtitle:"Do Not Deploy",active:!1},{id:"dark",icon:"moon",label:"Dark Mode",subtitle:"Always.",active:!0},{id:"airplane",icon:"airplay",label:"Airplane",subtitle:"Career on Autopilot",active:!1},{id:"power",icon:"power",label:"Restart",subtitle:"Switch OS",active:!1},{id:"location",icon:"mapPin",label:"Location",subtitle:"Detecting...",active:!0},{id:"flashlight",icon:"zap",label:"Flashlight",subtitle:"Spotlight on Career",active:!1}],X=[{app:"GitHub",icon:"🐙",text:"3 new stars on arun-os (we both know it's you)",time:"2m"},{app:"LinkedIn",icon:"💼",text:"47 recruiters viewed your profile (none will message back)",time:"15m"},{app:"Stack Overflow",icon:"📚",text:"Your answer got 10 upvotes",time:"1h"},{app:"Gmail",icon:"📧",text:"RE: RE: RE: FWD: RE: Urgent Production Issue",time:"3h"},{app:"Calendar",icon:"📅",text:"Standup in 5 minutes (prepare your excuses)",time:"4h"}];let o=null,g=!1;function Z(i){return o=document.createElement("div"),o.className="android-notification-shade",o.innerHTML=q(!1),o.addEventListener("click",e=>{e.target===o&&w()}),i.appendChild(o),B(),o}function q(i){return`
    <div class="shade-content ${i?"shade-expanded":""}">
      <div class="shade-handle" id="shade-handle">
        <div class="shade-handle-bar"></div>
      </div>

      <div class="shade-quick-settings ${i?"qs-expanded":"qs-collapsed"}">
        ${K.map(e=>`
          <div class="qs-tile ${e.active?"qs-active":""}" data-qs-id="${e.id}">
            <div class="qs-tile-icon">${e.icon==="power"?"⏻":e.icon==="wifi"?"📶":e.icon==="bluetooth"?"🔵":e.icon==="bellOff"?"🔕":e.icon==="moon"?"🌙":e.icon==="airplay"?"✈️":e.icon==="mapPin"?"📍":"⚡"}</div>
            ${i?`
              <div class="qs-tile-label">${e.label}</div>
              <div class="qs-tile-subtitle">${e.subtitle}</div>
            `:""}
          </div>
        `).join("")}
      </div>

      <div class="shade-notifications">
        <div class="shade-notif-header">
          <span>Notifications</span>
          <button class="shade-clear-all" id="shade-clear-all">Clear all</button>
        </div>
        ${X.map((e,t)=>`
          <div class="shade-notification" data-notif-idx="${t}">
            <div class="shade-notif-icon">${e.icon}</div>
            <div class="shade-notif-body">
              <div class="shade-notif-app">${e.app} <span class="shade-notif-time">${e.time}</span></div>
              <div class="shade-notif-text">${e.text}</div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `}function B(){if(!o)return;const i=o.querySelector("#shade-handle");i&&i.addEventListener("click",()=>{g=!g,o.innerHTML=q(g),B()}),o.querySelectorAll(".qs-tile").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.qsId;if(n==="power"){ee();return}if(n==="dark"){const a=t.querySelector(".qs-tile-subtitle");a&&(a.textContent="Light mode not available. Your eyes will thank me.");return}t.classList.toggle("qs-active")})});const e=o.querySelector("#shade-clear-all");e&&e.addEventListener("click",()=>{const t=o.querySelector(".shade-notifications");t&&(t.innerHTML=`
          <div style="text-align:center;padding:40px 20px;color:rgba(255,255,255,0.4);font-size:14px;">
            Notifications cleared.<br>Your anxiety wasn't.
          </div>
        `)})}function ee(){w(),_(async()=>{const{switchToOS:i}=await import("./index-BPVmKUjw.js").then(e=>e.o);return{switchToOS:i}},__vite__mapDeps([0,1])).then(({switchToOS:i})=>{const e=document.createElement("div");e.className="android-power-menu",e.innerHTML=`
      <div class="power-menu-overlay" id="power-menu-close"></div>
      <div class="power-menu-content">
        <div class="power-menu-title">Restart into...</div>
        <button class="power-menu-btn" data-os="macos">
          <span class="power-menu-icon">🖥️</span>
          <span>macOS Desktop</span>
        </button>
        <button class="power-menu-btn" data-os="ipados">
          <span class="power-menu-icon">📱</span>
          <span>iPadOS Tablet</span>
        </button>
        <button class="power-menu-btn power-menu-current">
          <span class="power-menu-icon">📲</span>
          <span>Android (current)</span>
        </button>
      </div>
    `,e.querySelector("#power-menu-close").addEventListener("click",()=>e.remove()),e.querySelectorAll(".power-menu-btn[data-os]").forEach(t=>{t.addEventListener("click",()=>{i(t.dataset.os)})}),document.body.appendChild(e)})}function te(){o&&o.classList.add("shade-visible")}function w(){o&&(o.classList.remove("shade-visible"),g=!1)}function k(){return o==null?void 0:o.classList.contains("shade-visible")}const $={salary:"Nice try, HR.",password:"It's 'password123'. Just kidding. Or am I?",bugs:"We don't have those here. Only undocumented features.",girlfriend:"404: Not Found (insufficient time allocated)",sleep:"Module not found. Have you tried coffee instead?",fired:"sudo: permission denied. You are unfireable.",coffee:"Brewing... ☕ Always available."};let d=null,x=null;function ie(i,e){x=e.onAppOpen,d=document.createElement("div"),d.className="android-app-drawer";const t=T("android").sort((a,s)=>a.label.localeCompare(s.label));d.innerHTML=`
    <div class="drawer-handle">
      <div class="drawer-handle-bar"></div>
    </div>
    <div class="drawer-search">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#888"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
      <input type="text" class="drawer-search-input" placeholder="Search apps" />
    </div>
    <div class="drawer-app-list" id="drawer-app-list">
      ${A(t)}
    </div>
  `;const n=d.querySelector(".drawer-search-input");return n.addEventListener("input",()=>{const a=n.value.toLowerCase().trim(),s=d.querySelector("#drawer-app-list");if($[a]){s.innerHTML=`
        <div style="text-align:center;padding:60px 20px;color:rgba(255,255,255,0.5);font-size:14px;">
          ${$[a]}
        </div>
      `;return}const l=a?t.filter(p=>p.label.toLowerCase().includes(a)):t;s.innerHTML=A(l),H(s)}),m(d,{down:()=>S()}),H(d),i.appendChild(d),d}function A(i){if(i.length===0)return'<div style="text-align:center;padding:60px 20px;color:rgba(255,255,255,0.4);font-size:14px;">No apps found</div>';const e={};return i.forEach(t=>{const n=t.label[0].toUpperCase();e[n]||(e[n]=[]),e[n].push(t)}),Object.entries(e).map(([t,n])=>`
    <div class="drawer-letter-header">${t}</div>
    <div class="drawer-letter-group">
      ${n.map(a=>`
        <div class="drawer-app-item" data-app-id="${a.id}">
          <div class="drawer-app-icon" style="background:${a.iconBg}">
            ${M(a.iconName,24,"#fff")}
          </div>
          <span class="drawer-app-name">${a.label}</span>
        </div>
      `).join("")}
    </div>
  `).join("")}function H(i){i.querySelectorAll(".drawer-app-item").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.appId;S(),x&&x(t)})})}function ae(){d&&d.classList.add("drawer-visible")}function S(){d&&d.classList.remove("drawer-visible")}function ne(){return d==null?void 0:d.classList.contains("drawer-visible")}async function de(i){await P(i),i.innerHTML="";const e=document.createElement("div");e.className="android-shell",i.appendChild(e);const t=document.createElement("div");t.className="android-wallpaper",e.appendChild(t),F(e);const n=document.createElement("div");n.className="android-main-area",e.appendChild(n);const a=document.createElement("div");a.className="android-home-layer",n.appendChild(a);const s=document.createElement("div");s.className="android-activity-layer",n.appendChild(s),j(e),U({onAppOpen:p=>E(p),onDrawerOpen:()=>ae()}),W(a),Y(s,{onClose:()=>{a.style.display=""}}),Z(e),ie(e,{onAppOpen:p=>E(p)}),G({onHome:()=>{k()?w():ne()?S():J()&&Q()},onRecents:()=>{}});const l=e.querySelector(".android-status-bar");l&&(l.addEventListener("click",()=>{k()?w():te()}),l.style.cursor="pointer"),I().catch(()=>{}),D()}export{de as boot};
