import{g as N,b as W,a as P,A as X}from"./gestures-D4_EayYY.js";import{b,i as G,a as U}from"./console-easter-egg-DLHUFXsG.js";import{s as Z}from"./index-DwjHNIXK.js";function J(e){return new Promise(i=>{const s=document.createElement("div");s.className="ipados-boot-overlay",s.innerHTML=`
      <div class="ipados-boot-logo">
        <img src="/wallpapers/ios-logo.svg" alt="" class="ipados-boot-logo-img" />
      </div>
      <div class="ipados-boot-progress-track">
        <div class="ipados-boot-progress-fill"></div>
      </div>
    `,e.appendChild(s),requestAnimationFrame(()=>{requestAnimationFrame(()=>{s.querySelector(".ipados-boot-logo-img").classList.add("ipados-boot-logo-visible")})}),setTimeout(()=>{const o=s.querySelector(".ipados-boot-progress-fill");o&&o.classList.add("ipados-boot-filling")},400);let t=!1;const d=()=>{t||(t=!0,s.classList.add("ipados-boot-flash"),setTimeout(()=>{s.remove(),i()},300))};s.addEventListener("click",d,{once:!0}),s.addEventListener("touchstart",d,{once:!0,passive:!0}),setTimeout(d,2500)})}const K='<svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>';function Q(e){const i=document.createElement("div");i.className="ipados-status-bar";function s(){const d=new Date,o=d.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}),n=d.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0});i.innerHTML=`
      <div class="ipados-sb-left">
        <span class="ipados-sb-date">${o}  ${n}</span>
      </div>
      <div class="ipados-sb-right">
        ${K}
        <span class="ipados-sb-battery-wrap" id="ipados-battery"></span>
      </div>
    `,t()}async function t(){const d=i.querySelector("#ipados-battery");if(!d)return;let o=87,n=!1;try{if("getBattery"in navigator){const c=await navigator.getBattery();o=Math.round(c.level*100),n=c.charging}}catch{}const p=Math.max(1,o/100*18),a=o<20?"#FF3B30":n?"#34C759":"#fff";d.innerHTML=`
      <span class="ipados-sb-battery-pct">${o}%</span>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
        <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
        <rect x="21.5" y="3.5" width="2" height="5" rx="1" fill="rgba(255,255,255,0.4)"/>
        <rect x="2" y="2" width="${p}" height="8" rx="1.5" fill="${a}"/>
      </svg>
    `}return s(),setInterval(s,3e4),e.appendChild(i),i}const ee=10,R=3;let A=[],q=null;function ie(e){q=e.onAppOpen}function te(e){const i=document.createElement("div");i.className="ipados-dock-wrapper";const t=N("ipados").slice(0,ee);function d(){const o=A.filter(n=>!t.find(p=>p.id===n)).slice(0,R).map(n=>{var a,c;const p=W(n);return p?{...p,label:((c=(a=p.platforms)==null?void 0:a.ipados)==null?void 0:c.label)||p.label}:null}).filter(Boolean);i.innerHTML=`
      <div class="ipados-dock">
        <div class="ipados-dock-icons ipados-dock-pinned">
          ${t.map(n=>`
            <div class="ipados-dock-icon" data-app-id="${n.id}" title="${n.label}">
              <div class="ipados-dock-icon-bg" style="background:${n.iconBg}">
                ${b(n.iconName,28,"#fff")}
              </div>
            </div>
          `).join("")}
        </div>
        ${o.length>0?`
          <div class="ipados-dock-divider"></div>
          <div class="ipados-dock-icons ipados-dock-recent">
            ${o.map(n=>`
              <div class="ipados-dock-icon" data-app-id="${n.id}" title="${n.label}">
                <div class="ipados-dock-icon-bg" style="background:${n.iconBg}">
                  ${b(n.iconName,28,"#fff")}
                </div>
              </div>
            `).join("")}
          </div>
        `:""}
      </div>
    `,i.querySelectorAll(".ipados-dock-icon").forEach(n=>{n.addEventListener("click",()=>{const p=n.dataset.appId,a=n.querySelector(".ipados-dock-icon-bg");a.classList.add("ipados-icon-pressed"),setTimeout(()=>a.classList.remove("ipados-icon-pressed"),200),q&&q(p)})})}return d(),e.appendChild(i),i}function se(e){A=[e,...A.filter(i=>i!==e)].slice(0,R+2)}let L=null,k=0;const D={salary:"Error 402: Payment Required. Have you tried negotiating?",password:"Nice try. It's 'password123'. Just kidding. Or am I?",bugs:"Found 2,147,483,647 results. Showing first 0.",girlfriend:`No results found. Try 'git commit -m "forever alone"'`,sleep:"Sleep is not available on this device. Try coffee instead.",fired:"Relax. You can't get fired if you're the one deploying on Fridays.",coffee:"Brewing... This is the only search that actually returns results.",calculator:null};function ae(e){L=e.onAppOpen}function oe(e){const i=document.createElement("div");i.className="ipados-home-screen";const s=N("ipados"),t=24,d=[];for(let a=0;a<s.length;a+=t)d.push(s.slice(a,a+t));let o=0;function n(){i.innerHTML=`
      <div class="ipados-home-pages-wrapper">
        <div class="ipados-home-pages" id="ipados-home-pages">
          ${d.map((c,l)=>`
            <div class="ipados-home-page" data-page="${l}">
              <div class="ipados-home-grid">
                ${c.map(r=>`
                  <div class="ipados-home-app" data-app-id="${r.id}">
                    <div class="ipados-home-icon-bg" style="background:${r.iconBg}">
                      ${b(r.iconName,30,"#fff")}
                    </div>
                    <span class="ipados-home-app-label">${r.label}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
      ${d.length>1?`
        <div class="ipados-home-dots">
          ${d.map((c,l)=>`<div class="ipados-home-dot ${l===0?"active":""}"></div>`).join("")}
        </div>
      `:""}
    `,i.querySelectorAll(".ipados-home-app").forEach(c=>{c.addEventListener("click",()=>{const l=c.dataset.appId,r=c.querySelector(".ipados-home-icon-bg");r.classList.add("ipados-icon-pressed"),setTimeout(()=>r.classList.remove("ipados-icon-pressed"),200),L&&L(l)})});const a=i.querySelector("#ipados-home-pages");a&&P(a,{left:()=>{o<d.length-1&&(o++,p())},right:()=>{o>0&&(o--,p())}}),P(i,{down:c=>{c.dy>60&&ne(i)}},{threshold:40})}function p(){const a=i.querySelector("#ipados-home-pages");a&&(a.style.transform=`translateX(-${o*100}%)`),i.querySelectorAll(".ipados-home-dot").forEach((c,l)=>{c.classList.toggle("active",l===o)})}return n(),e.appendChild(i),i}function ne(e){if(e.querySelector(".ipados-spotlight"))return;const i=document.createElement("div");i.className="ipados-spotlight",i.innerHTML=`
    <div class="ipados-spotlight-backdrop"></div>
    <div class="ipados-spotlight-content">
      <div class="ipados-spotlight-search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" class="ipados-spotlight-input" placeholder="Search" autofocus />
      </div>
      <div class="ipados-spotlight-results"></div>
    </div>
  `;const s=i.querySelector(".ipados-spotlight-input"),t=i.querySelector(".ipados-spotlight-results");i.querySelector(".ipados-spotlight-backdrop").addEventListener("click",()=>H(i)),s.addEventListener("input",()=>{const o=s.value.trim().toLowerCase();if(!o){t.innerHTML='<div class="ipados-spotlight-hint">Siri Suggestions, but Siri quit.</div>';return}const n=Object.keys(D).find(c=>o.includes(c));if(n==="calculator"){k++,k>=7?(t.innerHTML=`
          <div class="ipados-spotlight-easter">
            Fine. Here. Happy now?
          </div>
          <div class="ipados-spotlight-app-result" data-app-id="calculator">
            <div class="ipados-spotlight-app-icon" style="background:${X.calculator.iconBg}">
              ${b("calculator",22,"#fff")}
            </div>
            <span>Calculator</span>
          </div>
        `,V(i,t)):t.innerHTML=`
          <div class="ipados-spotlight-easter">
            Calculator is not available on iPad. Apple couldn't figure out how to make it bigger. Neither can we.
            <div class="ipados-spotlight-easter-sub">Tap count: ${k}/7 - keep trying</div>
          </div>
        `;return}if(n){t.innerHTML=`<div class="ipados-spotlight-easter">${D[n]}</div>`;return}const a=N("ipados").filter(c=>c.label.toLowerCase().includes(o));if(a.length===0){t.innerHTML=`<div class="ipados-spotlight-no-results">No results for "${s.value}"</div>`;return}t.innerHTML=`
      <div class="ipados-spotlight-section-label">Applications</div>
      ${a.map(c=>`
        <div class="ipados-spotlight-app-result" data-app-id="${c.id}">
          <div class="ipados-spotlight-app-icon" style="background:${c.iconBg}">
            ${b(c.iconName,22,"#fff")}
          </div>
          <span>${c.label}</span>
        </div>
      `).join("")}
    `,V(i,t)}),t.innerHTML='<div class="ipados-spotlight-hint">Siri Suggestions, but Siri quit.</div>',s.addEventListener("keydown",o=>{o.key==="Escape"&&H(i)}),e.appendChild(i),requestAnimationFrame(()=>{i.classList.add("ipados-spotlight-visible"),s.focus()})}function V(e,i){i.querySelectorAll(".ipados-spotlight-app-result").forEach(s=>{s.addEventListener("click",()=>{const t=s.dataset.appId;H(e),L&&L(t)})})}function H(e){e.classList.remove("ipados-spotlight-visible"),setTimeout(()=>e.remove(),300)}const de=4;let u=[],y=null,f=null,E=null,B=null,x=0;const _=[{x:80,y:60},{x:140,y:90},{x:200,y:60},{x:120,y:120}];function ce(e,i={}){B=i.onAllClosed,f=document.createElement("div"),f.className="ipados-stage-sidebar",e.appendChild(f),E=document.createElement("div"),E.className="ipados-stage-window-layer",e.appendChild(E),C()}async function le(e){var O,F;const i=W(e);if(!i)return;const s=u.find(h=>h.appId===e);if(s){m(s.id);return}if(u.length>=de){const h=u[0];pe(h.id)}x++;const t=`stage-win-${x}`,d=_[(x-1)%_.length],o=window.innerWidth,n=window.innerHeight,p=Math.min(Math.max(o*.55,400),800),a=Math.min(Math.max(n*.6,350),650),c=Math.min(d.x+60,o-p-20),l=Math.min(d.y+28,n-a-80),r=((F=(O=i.platforms)==null?void 0:O.ipados)==null?void 0:F.label)||i.label,v=document.createElement("div");v.className="ipados-stage-window",v.id=t,v.style.cssText=`
    width: ${p}px;
    height: ${a}px;
    left: ${c}px;
    top: ${l}px;
  `,v.innerHTML=`
    <div class="ipados-stage-titlebar" data-wid="${t}">
      <div class="ipados-stage-traffic-lights">
        <button class="ipados-tl-btn ipados-tl-close" data-wid="${t}" aria-label="Close"></button>
        <button class="ipados-tl-btn ipados-tl-minimize" aria-label="Minimize"></button>
        <button class="ipados-tl-btn ipados-tl-maximize" aria-label="Maximize"></button>
      </div>
      <div class="ipados-stage-titlebar-center">
        <div class="ipados-stage-titlebar-icon" style="background:${i.iconBg}">
          ${b(i.iconName,12,"#fff")}
        </div>
        <span class="ipados-stage-titlebar-label">${r}</span>
      </div>
      <div class="ipados-stage-titlebar-spacer"></div>
    </div>
    <div class="ipados-stage-content" id="${t}-content"></div>
  `,E.appendChild(v);const $={id:t,appId:e,el:v,label:r,appDef:i};u.push($),m(t);const w=v.querySelector(`#${t}-content`);try{const h=await i.module();h.renderContent?h.renderContent(w):h.open&&(w.innerHTML=`<div style="padding:24px;color:rgba(255,255,255,0.5);font-family:Inter,sans-serif;">Loading ${r}...</div>`)}catch{w.innerHTML=`<div style="padding:24px;color:#FF3B30;font-family:Inter,sans-serif;">Failed to load ${r}</div>`}return v.querySelector(".ipados-tl-close").addEventListener("click",h=>{h.stopPropagation(),Y(t)}),v.querySelector(".ipados-tl-minimize").addEventListener("click",h=>{h.stopPropagation(),Y(t)}),v.addEventListener("mousedown",()=>m(t)),v.addEventListener("touchstart",()=>m(t),{passive:!0}),re(v,t),requestAnimationFrame(()=>{requestAnimationFrame(()=>{v.classList.add("ipados-stage-window-enter")})}),C(),v}function re(e,i){const s=e.querySelector(".ipados-stage-titlebar");let t=!1,d,o,n,p;function a(r){if(r.target.closest(".ipados-tl-btn"))return;t=!0;const v=r.touches?r.touches[0]:r;d=v.clientX,o=v.clientY,n=parseInt(e.style.left)||0,p=parseInt(e.style.top)||0,e.classList.add("ipados-stage-dragging"),m(i),r.preventDefault()}function c(r){if(!t)return;const v=r.touches?r.touches[0]:r,$=v.clientX-d,w=v.clientY-o;e.style.left=`${n+$}px`,e.style.top=`${Math.max(28,p+w)}px`}function l(){t&&(t=!1,e.classList.remove("ipados-stage-dragging"))}s.addEventListener("mousedown",a),document.addEventListener("mousemove",c),document.addEventListener("mouseup",l),s.addEventListener("touchstart",a,{passive:!1}),document.addEventListener("touchmove",c,{passive:!1}),document.addEventListener("touchend",l)}function m(e){y=e;let i=100;u.forEach(s=>{s.id===e?(s.el.style.zIndex=i+u.length+1,s.el.classList.add("ipados-stage-focused")):(s.el.style.zIndex=i++,s.el.classList.remove("ipados-stage-focused"))}),C()}function Y(e){const i=u.findIndex(t=>t.id===e);if(i===-1)return;const s=u[i];s.el.classList.add("ipados-stage-window-exit"),s.el.classList.remove("ipados-stage-window-enter"),setTimeout(()=>{s.el.remove(),u.splice(i,1),y===e&&(y=u.length>0?u[u.length-1].id:null,y&&m(y)),C(),u.length===0&&B&&B()},250)}function pe(e){const i=u.findIndex(s=>s.id===e);i!==-1&&(u[i].el.remove(),u.splice(i,1))}function C(){if(f){if(u.length===0){f.innerHTML="",f.classList.remove("ipados-stage-sidebar-visible");return}f.classList.add("ipados-stage-sidebar-visible"),f.innerHTML=u.map(e=>`
    <div class="ipados-stage-sidebar-thumb ${e.id===y?"ipados-stage-sidebar-active":""}" data-wid="${e.id}">
      <div class="ipados-stage-sidebar-icon" style="background:${e.appDef.iconBg}">
        ${b(e.appDef.iconName,18,"#fff")}
      </div>
    </div>
  `).join(""),f.querySelectorAll(".ipados-stage-sidebar-thumb").forEach(e=>{e.addEventListener("click",()=>{m(e.dataset.wid)})})}}const S={wifi:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>',bluetooth:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/></svg>',airplane:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>',focus:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>',airdrop:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',mirror:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM9.5 7.5l-5 5 5 5v-3.5h5v-3h-5z"/></svg>',switchOS:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',brightness:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/></svg>',volume:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>'},j=[{id:"wifi",icon:"wifi",label:"Wi-Fi",subtitle:"FBI_Surveillance_Van_7",active:!0},{id:"bluetooth",icon:"bluetooth",label:"Bluetooth",subtitle:"Arun's AirPods (∞)",active:!0},{id:"airplane",icon:"airplane",label:"Airplane Mode",subtitle:"Career on Cruise Altitude",active:!1},{id:"focus",icon:"focus",label:"Focus",subtitle:"Coding Mode",active:!0},{id:"airdrop",icon:"airdrop",label:"AirDrop",subtitle:"Everyone (incl. recruiters)",active:!1},{id:"mirror",icon:"mirror",label:"Screen Mirroring",subtitle:"ArunOS TV",active:!1},{id:"switch",icon:"switchOS",label:"Switch Device",subtitle:"Change OS experience",active:!1}];let g=null,z=!1;function ve(e){g=document.createElement("div"),g.className="ipados-cc",ue(),g.querySelector(".ipados-cc-backdrop").addEventListener("click",()=>I()),he(),e.appendChild(g)}function ue(){g.innerHTML=`
    <div class="ipados-cc-backdrop"></div>
    <div class="ipados-cc-panel">
      <!-- Top group: connectivity (2x2 block) -->
      <div class="ipados-cc-top-row">
        <div class="ipados-cc-connectivity">
          ${j.slice(0,4).map(e=>`
            <div class="ipados-cc-round-tile ${e.active?"ipados-cc-active":""}" data-cc-id="${e.id}" title="${e.subtitle}">
              <div class="ipados-cc-round-icon">${S[e.icon]}</div>
              <div class="ipados-cc-round-label">${e.label}</div>
            </div>
          `).join("")}
        </div>
        <div class="ipados-cc-connectivity">
          ${j.slice(4).map(e=>`
            <div class="ipados-cc-round-tile ${e.active?"ipados-cc-active":""}" data-cc-id="${e.id}" title="${e.subtitle}">
              <div class="ipados-cc-round-icon">${S[e.icon]}</div>
              <div class="ipados-cc-round-label">${e.label}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Sliders -->
      <div class="ipados-cc-slider-group">
        <div class="ipados-cc-slider" data-slider="brightness">
          <span class="ipados-cc-slider-icon">${S.brightness}</span>
          <div class="ipados-cc-slider-track">
            <div class="ipados-cc-slider-fill" style="width:72%"></div>
          </div>
        </div>
        <div class="ipados-cc-slider" data-slider="volume">
          <span class="ipados-cc-slider-icon">${S.volume}</span>
          <div class="ipados-cc-slider-track">
            <div class="ipados-cc-slider-fill" style="width:45%"></div>
          </div>
        </div>
      </div>

      <!-- Now Playing mini widget -->
      <div class="ipados-cc-now-playing">
        <div class="ipados-cc-np-art">🎵</div>
        <div class="ipados-cc-np-info">
          <div class="ipados-cc-np-title">It Works on My Machine</div>
          <div class="ipados-cc-np-artist">Docker — ArunOS Radio</div>
        </div>
        <div class="ipados-cc-np-controls">
          <span class="ipados-cc-np-btn">⏮</span>
          <span class="ipados-cc-np-btn ipados-cc-np-play">▶</span>
          <span class="ipados-cc-np-btn">⏭</span>
        </div>
      </div>
    </div>
  `}function he(){g.querySelectorAll(".ipados-cc-round-tile").forEach(e=>{e.addEventListener("click",i=>{i.stopPropagation();const s=e.dataset.ccId;if(s==="switch"){I(),ge();return}if(s==="mirror"){const t=e.querySelector(".ipados-cc-round-label");t.textContent="Searching...";let d=0;const o=setInterval(()=>{d=(d+1)%4,t.textContent=`Searching${".".repeat(d)}`},400);setTimeout(()=>{clearInterval(o),t.textContent="No devices found",setTimeout(()=>{t.textContent="Screen Mirroring"},2e3)},3e3);return}e.classList.toggle("ipados-cc-active")})}),g.querySelectorAll(".ipados-cc-slider-track").forEach(e=>{e.addEventListener("click",i=>{const s=e.getBoundingClientRect(),t=Math.max(5,Math.min(95,(i.clientX-s.left)/s.width*100));e.querySelector(".ipados-cc-slider-fill").style.width=`${t}%`})})}function M(){g&&(z=!0,g.classList.add("ipados-cc-visible"))}function I(){g&&(z=!1,g.classList.remove("ipados-cc-visible"))}function T(){return z}function ge(){const e=document.createElement("div");e.className="ipados-os-switcher",e.innerHTML=`
    <div class="ipados-os-switcher-backdrop"></div>
    <div class="ipados-os-switcher-content">
      <div class="ipados-os-switcher-title">Switch Device</div>
      <button class="ipados-os-switcher-btn" data-os="macos">
        <span>🖥️</span>
        <span>macOS Desktop</span>
      </button>
      <button class="ipados-os-switcher-btn" data-os="android">
        <span>📱</span>
        <span>Android Phone</span>
      </button>
      <button class="ipados-os-switcher-btn ipados-os-switcher-current">
        <span>📲</span>
        <span>iPadOS (current)</span>
      </button>
    </div>
  `,e.querySelector(".ipados-os-switcher-backdrop").addEventListener("click",()=>e.remove()),e.querySelectorAll(".ipados-os-switcher-btn[data-os]").forEach(i=>{i.addEventListener("click",()=>Z(i.dataset.os))}),document.body.appendChild(e)}async function ye(e){await J(e),e.innerHTML="";const i=document.createElement("div");i.className="ipados-shell",e.appendChild(i);const s=document.createElement("div");s.className="ipados-wallpaper",i.appendChild(s),Q(i);const t=document.createElement("div");t.className="ipados-main-area",i.appendChild(t);const d=document.createElement("div");d.className="ipados-home-layer",t.appendChild(d);const o=document.createElement("div");o.className="ipados-stage-layer",t.appendChild(o),te(i);const n=l=>{se(l),le(l)};ie({onAppOpen:n}),ae({onAppOpen:n}),oe(d),ce(o,{onAllClosed:()=>{d.style.opacity="1",d.style.pointerEvents=""}}),ve(i);const p=i.querySelector(".ipados-status-bar");if(p){const l=p.querySelector(".ipados-sb-right");l&&(l.style.cursor="pointer",l.addEventListener("click",r=>{r.stopPropagation(),T()?I():M()}))}let a=null;const c=40;i.addEventListener("mousedown",l=>{l.clientY<c&&(a=l.clientY,l.clientX)}),i.addEventListener("mousemove",l=>{a!==null&&l.clientY-a>50&&(a=null,T()||M())}),i.addEventListener("mouseup",()=>{a=null}),i.addEventListener("touchstart",l=>{const r=l.touches[0];r.clientY<c&&(a=r.clientY,r.clientX)},{passive:!0}),i.addEventListener("touchmove",l=>{if(a===null)return;l.touches[0].clientY-a>50&&(a=null,T()||M())},{passive:!0}),i.addEventListener("touchend",()=>{a=null},{passive:!0}),G().catch(()=>{}),U()}export{ye as boot};
