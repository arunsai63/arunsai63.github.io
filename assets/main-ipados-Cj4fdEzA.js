import{i as m,a as X,b as z}from"./console-easter-egg-Ch-v8MMI.js";import{g as H,b as R,o as x,A as G}from"./app-manifest-rDb5Koko.js";import{s as V}from"./index-BPVmKUjw.js";function Y(s){return new Promise(e=>{const i=document.createElement("div");i.className="ipados-boot-overlay",i.innerHTML=`
      <div class="ipados-boot-logo">
        ${m("monitor",48,"#fff")}
      </div>
      <div class="ipados-boot-progress-track">
        <div class="ipados-boot-progress-fill"></div>
      </div>
    `,s.appendChild(i),requestAnimationFrame(()=>{i.querySelector(".ipados-boot-logo").classList.add("ipados-boot-logo-visible")}),setTimeout(()=>{const a=i.querySelector(".ipados-boot-progress-fill");a&&a.classList.add("ipados-boot-filling")},400);const t=()=>{i.classList.add("ipados-boot-flash"),setTimeout(()=>{i.remove(),e()},300)},d=()=>t();i.addEventListener("click",d,{once:!0}),i.addEventListener("touchstart",d,{once:!0,passive:!0}),setTimeout(t,2500)})}const U='<svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>';function J(s){const e=document.createElement("div");e.className="ipados-status-bar";function i(){const d=new Date,a=d.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"}),o=d.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0});e.innerHTML=`
      <div class="ipados-sb-left">
        <span class="ipados-sb-date">${a}  ${o}</span>
      </div>
      <div class="ipados-sb-right">
        ${U}
        <span class="ipados-sb-battery-wrap" id="ipados-battery"></span>
      </div>
    `,t()}async function t(){const d=e.querySelector("#ipados-battery");if(!d)return;let a=87,o=!1;try{if("getBattery"in navigator){const c=await navigator.getBattery();a=Math.round(c.level*100),o=c.charging}}catch{}const l=Math.max(1,a/100*18),n=a<20?"#FF3B30":o?"#34C759":"#fff";d.innerHTML=`
      <span class="ipados-sb-battery-pct">${a}%</span>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
        <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
        <rect x="21.5" y="3.5" width="2" height="5" rx="1" fill="rgba(255,255,255,0.4)"/>
        <rect x="2" y="2" width="${l}" height="8" rx="1.5" fill="${n}"/>
      </svg>
    `}return i(),setInterval(i,3e4),s.appendChild(e),e}const K=10,W=3;let T=[],A=null;function Z(s){A=s.onAppOpen}function Q(s){const e=document.createElement("div");e.className="ipados-dock-wrapper";const t=H("ipados").slice(0,K);function d(){const a=T.filter(o=>!t.find(l=>l.id===o)).slice(0,W).map(o=>{var n,c;const l=R(o);return l?{...l,label:((c=(n=l.platforms)==null?void 0:n.ipados)==null?void 0:c.label)||l.label}:null}).filter(Boolean);e.innerHTML=`
      <div class="ipados-dock">
        <div class="ipados-dock-icons ipados-dock-pinned">
          ${t.map(o=>`
            <div class="ipados-dock-icon" data-app-id="${o.id}" title="${o.label}">
              <div class="ipados-dock-icon-bg" style="background:${o.iconBg}">
                ${m(o.iconName,28,"#fff")}
              </div>
            </div>
          `).join("")}
        </div>
        ${a.length>0?`
          <div class="ipados-dock-divider"></div>
          <div class="ipados-dock-icons ipados-dock-recent">
            ${a.map(o=>`
              <div class="ipados-dock-icon" data-app-id="${o.id}" title="${o.label}">
                <div class="ipados-dock-icon-bg" style="background:${o.iconBg}">
                  ${m(o.iconName,28,"#fff")}
                </div>
              </div>
            `).join("")}
          </div>
        `:""}
      </div>
    `,e.querySelectorAll(".ipados-dock-icon").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.appId,n=o.querySelector(".ipados-dock-icon-bg");n.classList.add("ipados-icon-pressed"),setTimeout(()=>n.classList.remove("ipados-icon-pressed"),200),A&&A(l)})})}return d(),s.appendChild(e),e}function ee(s){T=[s,...T.filter(e=>e!==s)].slice(0,W+2)}let L=null,k=0;const F={salary:"Error 402: Payment Required. Have you tried negotiating?",password:"Nice try. It's 'password123'. Just kidding. Or am I?",bugs:"Found 2,147,483,647 results. Showing first 0.",girlfriend:`No results found. Try 'git commit -m "forever alone"'`,sleep:"Sleep is not available on this device. Try coffee instead.",fired:"Relax. You can't get fired if you're the one deploying on Fridays.",coffee:"Brewing... This is the only search that actually returns results.",calculator:null};function se(s){L=s.onAppOpen}function te(s){const e=document.createElement("div");e.className="ipados-home-screen";const i=H("ipados"),t=24,d=[];for(let n=0;n<i.length;n+=t)d.push(i.slice(n,n+t));let a=0;function o(){e.innerHTML=`
      <div class="ipados-home-pages-wrapper">
        <div class="ipados-home-pages" id="ipados-home-pages">
          ${d.map((c,v)=>`
            <div class="ipados-home-page" data-page="${v}">
              <div class="ipados-home-grid">
                ${c.map(r=>`
                  <div class="ipados-home-app" data-app-id="${r.id}">
                    <div class="ipados-home-icon-bg" style="background:${r.iconBg}">
                      ${m(r.iconName,30,"#fff")}
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
          ${d.map((c,v)=>`<div class="ipados-home-dot ${v===0?"active":""}"></div>`).join("")}
        </div>
      `:""}
    `,e.querySelectorAll(".ipados-home-app").forEach(c=>{c.addEventListener("click",()=>{const v=c.dataset.appId,r=c.querySelector(".ipados-home-icon-bg");r.classList.add("ipados-icon-pressed"),setTimeout(()=>r.classList.remove("ipados-icon-pressed"),200),L&&L(v)})});const n=e.querySelector("#ipados-home-pages");n&&x(n,{left:()=>{a<d.length-1&&(a++,l())},right:()=>{a>0&&(a--,l())}}),x(e,{down:c=>{c.dy>60&&ie(e)}},{threshold:40})}function l(){const n=e.querySelector("#ipados-home-pages");n&&(n.style.transform=`translateX(-${a*100}%)`),e.querySelectorAll(".ipados-home-dot").forEach((c,v)=>{c.classList.toggle("active",v===a)})}return o(),s.appendChild(e),e}function ie(s){if(s.querySelector(".ipados-spotlight"))return;const e=document.createElement("div");e.className="ipados-spotlight",e.innerHTML=`
    <div class="ipados-spotlight-backdrop"></div>
    <div class="ipados-spotlight-content">
      <div class="ipados-spotlight-search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" class="ipados-spotlight-input" placeholder="Search" autofocus />
      </div>
      <div class="ipados-spotlight-results"></div>
    </div>
  `;const i=e.querySelector(".ipados-spotlight-input"),t=e.querySelector(".ipados-spotlight-results");e.querySelector(".ipados-spotlight-backdrop").addEventListener("click",()=>M(e)),i.addEventListener("input",()=>{const a=i.value.trim().toLowerCase();if(!a){t.innerHTML='<div class="ipados-spotlight-hint">Siri Suggestions, but Siri quit.</div>';return}const o=Object.keys(F).find(c=>a.includes(c));if(o==="calculator"){k++,k>=7?(t.innerHTML=`
          <div class="ipados-spotlight-easter">
            Fine. Here. Happy now?
          </div>
          <div class="ipados-spotlight-app-result" data-app-id="calculator">
            <div class="ipados-spotlight-app-icon" style="background:${G.calculator.iconBg}">
              ${m("calculator",22,"#fff")}
            </div>
            <span>Calculator</span>
          </div>
        `,D(e,t)):t.innerHTML=`
          <div class="ipados-spotlight-easter">
            Calculator is not available on iPad. Apple couldn't figure out how to make it bigger. Neither can we.
            <div class="ipados-spotlight-easter-sub">Tap count: ${k}/7 - keep trying</div>
          </div>
        `;return}if(o){t.innerHTML=`<div class="ipados-spotlight-easter">${F[o]}</div>`;return}const n=H("ipados").filter(c=>c.label.toLowerCase().includes(a));if(n.length===0){t.innerHTML=`<div class="ipados-spotlight-no-results">No results for "${i.value}"</div>`;return}t.innerHTML=`
      <div class="ipados-spotlight-section-label">Applications</div>
      ${n.map(c=>`
        <div class="ipados-spotlight-app-result" data-app-id="${c.id}">
          <div class="ipados-spotlight-app-icon" style="background:${c.iconBg}">
            ${m(c.iconName,22,"#fff")}
          </div>
          <span>${c.label}</span>
        </div>
      `).join("")}
    `,D(e,t)}),t.innerHTML='<div class="ipados-spotlight-hint">Siri Suggestions, but Siri quit.</div>',i.addEventListener("keydown",a=>{a.key==="Escape"&&M(e)}),s.appendChild(e),requestAnimationFrame(()=>{e.classList.add("ipados-spotlight-visible"),i.focus()})}function D(s,e){e.querySelectorAll(".ipados-spotlight-app-result").forEach(i=>{i.addEventListener("click",()=>{const t=i.dataset.appId;M(s),L&&L(t)})})}function M(s){s.classList.remove("ipados-spotlight-visible"),setTimeout(()=>s.remove(),300)}const ae=4;let u=[],y=null,h=null,S=null,q=null,C=0;const P=[{x:80,y:60},{x:140,y:90},{x:200,y:60},{x:120,y:120}];function oe(s,e={}){q=e.onAllClosed,h=document.createElement("div"),h.className="ipados-stage-sidebar",s.appendChild(h),S=document.createElement("div"),S.className="ipados-stage-window-layer",s.appendChild(S),E()}async function ne(s){var I,O;const e=R(s);if(!e)return;const i=u.find(f=>f.appId===s);if(i){b(i.id);return}if(u.length>=ae){const f=u[0];le(f.id)}C++;const t=`stage-win-${C}`,d=P[(C-1)%P.length],a=window.innerWidth,o=window.innerHeight,l=Math.min(Math.max(a*.55,400),800),n=Math.min(Math.max(o*.6,350),650),c=Math.min(d.x+60,a-l-20),v=Math.min(d.y+28,o-n-80),r=((O=(I=e.platforms)==null?void 0:I.ipados)==null?void 0:O.label)||e.label,p=document.createElement("div");p.className="ipados-stage-window",p.id=t,p.style.cssText=`
    width: ${l}px;
    height: ${n}px;
    left: ${c}px;
    top: ${v}px;
  `,p.innerHTML=`
    <div class="ipados-stage-titlebar" data-wid="${t}">
      <div class="ipados-stage-titlebar-left">
        <div class="ipados-stage-titlebar-icon" style="background:${e.iconBg}">
          ${m(e.iconName,14,"#fff")}
        </div>
        <span class="ipados-stage-titlebar-label">${r}</span>
      </div>
      <button class="ipados-stage-close-btn" data-wid="${t}" aria-label="Close">&times;</button>
    </div>
    <div class="ipados-stage-content" id="${t}-content"></div>
  `,S.appendChild(p);const $={id:t,appId:s,el:p,label:r,appDef:e};u.push($),b(t);const w=p.querySelector(`#${t}-content`);try{const f=await e.module();f.renderContent?f.renderContent(w):f.open&&(w.innerHTML=`<div style="padding:24px;color:rgba(255,255,255,0.5);font-family:Inter,sans-serif;">Loading ${r}...</div>`)}catch{w.innerHTML=`<div style="padding:24px;color:#FF3B30;font-family:Inter,sans-serif;">Failed to load ${r}</div>`}return p.querySelector(".ipados-stage-close-btn").addEventListener("click",f=>{f.stopPropagation(),ce(t)}),p.addEventListener("mousedown",()=>b(t)),p.addEventListener("touchstart",()=>b(t),{passive:!0}),de(p,t),requestAnimationFrame(()=>{p.classList.add("ipados-stage-window-enter")}),E(),p}function de(s,e){const i=s.querySelector(".ipados-stage-titlebar");let t=!1,d,a,o,l;function n(r){if(r.target.closest(".ipados-stage-close-btn"))return;t=!0;const p=r.touches?r.touches[0]:r;d=p.clientX,a=p.clientY,o=parseInt(s.style.left)||0,l=parseInt(s.style.top)||0,s.classList.add("ipados-stage-dragging"),b(e),r.preventDefault()}function c(r){if(!t)return;const p=r.touches?r.touches[0]:r,$=p.clientX-d,w=p.clientY-a;s.style.left=`${o+$}px`,s.style.top=`${Math.max(28,l+w)}px`}function v(){t&&(t=!1,s.classList.remove("ipados-stage-dragging"))}i.addEventListener("mousedown",n),document.addEventListener("mousemove",c),document.addEventListener("mouseup",v),i.addEventListener("touchstart",n,{passive:!1}),document.addEventListener("touchmove",c,{passive:!1}),document.addEventListener("touchend",v)}function b(s){y=s;let e=100;u.forEach(i=>{i.id===s?(i.el.style.zIndex=e+u.length+1,i.el.classList.add("ipados-stage-focused")):(i.el.style.zIndex=e++,i.el.classList.remove("ipados-stage-focused"))}),E()}function ce(s){const e=u.findIndex(t=>t.id===s);if(e===-1)return;const i=u[e];i.el.classList.add("ipados-stage-window-exit"),i.el.classList.remove("ipados-stage-window-enter"),setTimeout(()=>{i.el.remove(),u.splice(e,1),y===s&&(y=u.length>0?u[u.length-1].id:null,y&&b(y)),E(),u.length===0&&q&&q()},250)}function le(s){const e=u.findIndex(i=>i.id===s);e!==-1&&(u[e].el.remove(),u.splice(e,1))}function E(){if(h){if(u.length===0){h.innerHTML="",h.classList.remove("ipados-stage-sidebar-visible");return}h.classList.add("ipados-stage-sidebar-visible"),h.innerHTML=u.map(s=>`
    <div class="ipados-stage-sidebar-thumb ${s.id===y?"ipados-stage-sidebar-active":""}" data-wid="${s.id}">
      <div class="ipados-stage-sidebar-icon" style="background:${s.appDef.iconBg}">
        ${m(s.appDef.iconName,18,"#fff")}
      </div>
    </div>
  `).join(""),h.querySelectorAll(".ipados-stage-sidebar-thumb").forEach(s=>{s.addEventListener("click",()=>{b(s.dataset.wid)})})}}const re=[{id:"wifi",icon:"📶",label:"Wi-Fi",subtitle:"FBI_Surveillance_Van_7",active:!0},{id:"bluetooth",icon:"🔵",label:"Bluetooth",subtitle:"Arun's AirPods (Battery: ∞)",active:!0},{id:"airplane",icon:"✈️",label:"Airplane Mode",subtitle:"Career on Cruise Altitude",active:!1},{id:"focus",icon:"🌙",label:"Focus",subtitle:"Coding Mode",active:!0},{id:"airdrop",icon:"📡",label:"AirDrop",subtitle:"Receiving from: Everyone",active:!1},{id:"mirror",icon:"📺",label:"Screen Mirroring",subtitle:"ArunOS TV (connecting... forever)",active:!1},{id:"switch",icon:"🔄",label:"Switch Device",subtitle:"Change OS",active:!1}];let g=null,B=!1;function pe(s){g=document.createElement("div"),g.className="ipados-cc",g.innerHTML=`
    <div class="ipados-cc-backdrop"></div>
    <div class="ipados-cc-panel">
      <div class="ipados-cc-grid">
        ${re.map(e=>`
          <div class="ipados-cc-tile ${e.active?"ipados-cc-active":""}" data-cc-id="${e.id}">
            <div class="ipados-cc-tile-icon">${e.icon}</div>
            <div class="ipados-cc-tile-label">${e.label}</div>
            <div class="ipados-cc-tile-sub">${e.subtitle}</div>
          </div>
        `).join("")}
      </div>

      <div class="ipados-cc-sliders">
        <div class="ipados-cc-slider-row">
          <span class="ipados-cc-slider-icon">☀️</span>
          <div class="ipados-cc-slider-track">
            <div class="ipados-cc-slider-fill" style="width:72%"></div>
          </div>
        </div>
        <div class="ipados-cc-slider-row">
          <span class="ipados-cc-slider-icon">🔊</span>
          <div class="ipados-cc-slider-track">
            <div class="ipados-cc-slider-fill" style="width:50%"></div>
          </div>
        </div>
      </div>
    </div>
  `,g.querySelector(".ipados-cc-backdrop").addEventListener("click",()=>N()),g.querySelectorAll(".ipados-cc-tile").forEach(e=>{e.addEventListener("click",()=>{const i=e.dataset.ccId;if(i==="switch"){N(),ue();return}if(i==="focus"){const t=e.querySelector(".ipados-cc-tile-sub");e.classList.contains("ipados-cc-active")?t.textContent="Coding Mode: OFF (good luck)":t.textContent="Coding Mode"}if(i==="airplane"){const t=e.querySelector(".ipados-cc-tile-sub");e.classList.contains("ipados-cc-active")?t.textContent="Career on Cruise Altitude":t.textContent="Career ascending..."}if(i==="mirror"){const t=e.querySelector(".ipados-cc-tile-sub");t.textContent="ArunOS TV (connecting... forever)";let d=0;const a=setInterval(()=>{d=(d+1)%4,t.textContent=`Searching${".".repeat(d)}`},400);setTimeout(()=>{clearInterval(a),t.textContent="No devices found. As expected."},3e3);return}e.classList.toggle("ipados-cc-active")})}),g.querySelectorAll(".ipados-cc-slider-track").forEach(e=>{e.addEventListener("click",i=>{const t=e.getBoundingClientRect(),d=Math.max(5,Math.min(95,(i.clientX-t.left)/t.width*100));e.querySelector(".ipados-cc-slider-fill").style.width=`${d}%`})}),s.appendChild(g)}function _(){g&&(B=!0,g.classList.add("ipados-cc-visible"))}function N(){g&&(B=!1,g.classList.remove("ipados-cc-visible"))}function j(){return B}function ue(){const s=document.createElement("div");s.className="ipados-os-switcher",s.innerHTML=`
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
  `,s.querySelector(".ipados-os-switcher-backdrop").addEventListener("click",()=>s.remove()),s.querySelectorAll(".ipados-os-switcher-btn[data-os]").forEach(e=>{e.addEventListener("click",()=>V(e.dataset.os))}),document.body.appendChild(s)}async function he(s){await Y(s),s.innerHTML="";const e=document.createElement("div");e.className="ipados-shell",s.appendChild(e);const i=document.createElement("div");i.className="ipados-wallpaper",e.appendChild(i),J(e);const t=document.createElement("div");t.className="ipados-main-area",e.appendChild(t);const d=document.createElement("div");d.className="ipados-home-layer",t.appendChild(d);const a=document.createElement("div");a.className="ipados-stage-layer",t.appendChild(a),Q(e);const o=n=>{ee(n),ne(n)};Z({onAppOpen:o}),se({onAppOpen:o}),te(d),oe(a,{onAllClosed:()=>{d.style.opacity="1",d.style.pointerEvents=""}}),pe(e);const l=e.querySelector(".ipados-status-bar");if(l){const n=l.querySelector(".ipados-sb-right");n&&(n.style.cursor="pointer",n.addEventListener("click",c=>{c.stopPropagation(),j()?N():_()}))}x(e,{down:n=>{n.dx,j()||_()}},{threshold:30}),X().catch(()=>{}),z()}export{he as boot};
