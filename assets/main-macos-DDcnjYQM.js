const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/os-switcher-nwxZZ4Ch.js","assets/index-DwjHNIXK.js","assets/index-BfiTSkJx.css","assets/registry-BkBxvpgy.js","assets/console-easter-egg-DLHUFXsG.js"])))=>i.map(i=>d[i]);
import{_ as H}from"./index-DwjHNIXK.js";import{c as Q,g as ae,t as re,a as le,b as ce}from"./window-manager-Cm3UCJuh.js";import{openApp as C,appList as ee}from"./registry-BkBxvpgy.js";import{b as c,r as D,o as de,c as pe,s as ue,i as ye,a as ge}from"./console-easter-egg-DLHUFXsG.js";import{g as F,a as fe,p as q}from"./data-CMMTyLTn.js";let k=null;function me(){return k||(k=document.createElement("div"),k.className="notification-container",document.body.appendChild(k),k)}function x(t,e,n=4e3,o=null){const i=me(),s=document.createElement("div");s.className="notification-toast";const a=o?`<span class="notification-icon">${c(o,18,"#10b981")}</span>`:"";s.innerHTML=`
    <div class="notification-header">
      ${a}
      <div class="notification-title">${t}</div>
    </div>
    <div class="notification-body">${e}</div>
  `,s.addEventListener("click",()=>s.remove()),i.appendChild(s),setTimeout(()=>{s.style.opacity="0",setTimeout(()=>s.remove(),300)},n)}function te(){[{title:"AWS Cost Alert",body:"Your free tier expired 4 years ago. You owe mass amounts. Just kidding. Or am I?",delay:45e3,icon:"cloud"},{title:"ArunOS Update Available",body:"What's new: Fixed a typo in the changelog. That's it. That's the update.",delay:9e4,icon:"download"},{title:"Pro Tip",body:"Try typing 'sudo hire arun' in the Terminal. It's never been rejected.",delay:6e4,icon:"lightbulb"},{title:"Battery Warning",body:"Battery at 99%. It's been at 99% since 2019. I'm afraid to unplug it.",delay:12e4,icon:"alertTriangle"},{title:"WiFi Status",body:"Connected to FBI_Surveillance_Van_7. Signal: vibes.",delay:15e4,icon:"radio"}].forEach(e=>{setTimeout(()=>x(e.title,e.body,5e3,e.icon),e.delay)})}const he=Object.freeze(Object.defineProperty({__proto__:null,notify:x,startNotificationLoop:te},Symbol.toStringTag,{value:"Module"})),be=[{id:"about",svg:"user",label:"About Me",bg:"linear-gradient(135deg, #3b82f6, #2563eb)"},{id:"experience",svg:"briefcase",label:"Experience",bg:"linear-gradient(135deg, #f59e0b, #d97706)"},{id:"skills",svg:"fileText",label:"Skills.txt",bg:"linear-gradient(135deg, #10b981, #059669)"},{id:"terminal",svg:"terminal",label:"Terminal",bg:"linear-gradient(135deg, #1e1e1e, #333)"},{id:"projects",svg:"folder",label:"Projects",bg:"linear-gradient(135deg, #6366f1, #4f46e5)"},{id:"contact",svg:"mail",label:"Contact",bg:"linear-gradient(135deg, #3b82f6, #1d4ed8)"},{id:"chat",svg:"messageCircle",label:"Chat",bg:"linear-gradient(135deg, #22c55e, #16a34a)"},{id:"calculator",svg:"calculator",label:"Calculator",bg:"linear-gradient(135deg, #f97316, #ea580c)"},{id:"portfolio",svg:"layout",label:"Portfolio",bg:"linear-gradient(135deg, #8b5cf6, #7c3aed)"},{id:"blog",svg:"book",label:"Blog",bg:"linear-gradient(135deg, #ec4899, #db2777)"},{id:"browser",svg:"safari",label:"Safari",bg:"linear-gradient(135deg, #007AFF, #5856D6)"},{id:"recycle-bin",svg:"trash",label:"Recycle Bin",bg:"linear-gradient(135deg, #64748b, #475569)"}];function ve(t){t.innerHTML=`
    <div class="desktop">
      <div class="desktop-area"></div>
      <div class="dock-wrapper">
        <div class="dock"></div>
      </div>
    </div>
  `;const e=t.querySelector(".dock");return be.forEach(o=>{const i=document.createElement("div");i.className="dock-item",i.dataset.label=o.label,i.innerHTML=`
      <div class="dock-icon" style="background:${o.bg};">${c(o.svg,26,"#fff")}</div>
      <div class="dock-tooltip">${o.label}</div>
      <div class="dock-dot"></div>
    `,i.addEventListener("click",()=>{i.classList.add("bouncing"),i.addEventListener("animationend",()=>i.classList.remove("bouncing"),{once:!0}),C(o.id)}),e.appendChild(i)}),we(e),t.querySelector(".desktop").addEventListener("contextmenu",o=>{o.preventDefault(),o.stopPropagation(),T(),o.target.closest(".os-window")||xe(o.clientX,o.clientY)}),document.addEventListener("click",()=>T()),document.addEventListener("contextmenu",o=>{o.target.closest(".context-menu")||T()}),t.querySelector(".desktop")}function xe(t,e){T();const n=document.createElement("div");n.className="context-menu",n.id="desktop-context-menu",n.style.left=t+"px",n.style.top=e+"px",[{svg:"terminal",label:"Open Terminal",shortcut:"Ctrl+T",action:()=>C("terminal")},{svg:"folder",label:"Open File Explorer",action:()=>C("projects")},{separator:!0},{svg:"refresh",label:"Refresh My Career",action:()=>x("Career Refresh","Still a Solutions Architect. Still awesome.")},{svg:"clipboard",label:"Paste (from Stack Overflow)",action:()=>x("Clipboard","Nothing to paste. But we both know that's where your code comes from.")},{separator:!0},{svg:"palette",label:"Change Wallpaper",action:()=>C("settings")},{svg:"externalLink",label:"View Source",action:()=>window.open("https://github.com/arunsai63/arunsai63.github.io","_blank")},{svg:"info",label:"About ArunOS",action:()=>ke()},{separator:!0},{svg:"monitor",label:"Restart Into...",action:()=>{H(async()=>{const{showOSSwitcher:s}=await import("./os-switcher-nwxZZ4Ch.js");return{showOSSwitcher:s}},__vite__mapDeps([0,1,2])).then(({showOSSwitcher:s})=>s("macos"))}}].forEach(s=>{if(s.separator){const d=document.createElement("div");d.className="context-menu-separator",n.appendChild(d);return}const a=document.createElement("div");a.className="context-menu-item",a.innerHTML=`<span class="context-menu-icon">${c(s.svg,16,"#888")}</span> ${s.label}${s.shortcut?`<span class="context-menu-shortcut">${s.shortcut}</span>`:""}`,a.addEventListener("click",d=>{d.stopPropagation(),T(),s.action()}),n.appendChild(a)}),document.body.appendChild(n);const i=n.getBoundingClientRect();i.right>window.innerWidth&&(n.style.left=t-i.width+"px"),i.bottom>window.innerHeight&&(n.style.top=e-i.height+"px")}function T(){const t=document.getElementById("desktop-context-menu");t&&t.remove()}function we(t){const e=[...t.querySelectorAll(".dock-item")],n=48,o=72,i=140,s=e.map(()=>n);let a=!1,d=0,l=null;function y(){return e.map((p,h)=>{if(!a)return n;const f=p.querySelector(".dock-icon").getBoundingClientRect(),v=f.left+f.width/2,w=Math.abs(d-v),O=Math.max(0,1-w/i);return n+(o-n)*(.5+.5*Math.cos(Math.PI*(1-O)))})}function r(){const p=y();let h=!1;e.forEach((g,f)=>{const v=a?.45:.2;s[f]+=(p[f]-s[f])*v,Math.abs(s[f]-p[f])<.3?s[f]=p[f]:h=!0;const w=s[f],O=g.querySelector(".dock-icon");O.style.width=w+"px",O.style.height=w+"px"}),h||a?l=requestAnimationFrame(r):l=null}function u(){l||(l=requestAnimationFrame(r))}t.addEventListener("mouseenter",()=>{a=!0,u()}),t.addEventListener("mousemove",p=>{d=p.clientX,a||(a=!0,u())}),t.addEventListener("mouseleave",()=>{a=!1,u()})}function ke(){Q({id:"about-os",title:"About ArunOS",icon:c("monitor",16),width:420,height:380,content:`
      <div style="text-align:center;padding:20px;">
        <div style="margin-bottom:16px;">${c("monitor",56,"#10b981")}</div>
        <h2 style="color:#ddd;margin-bottom:4px;font-size:18px;">ArunOS v${F()}</h2>
        <p style="color:#666;margin-bottom:16px;font-size:13px;">"Stable" Build (debatable)</p>
        <div style="text-align:left;background:rgba(0,0,0,0.3);padding:14px;border-radius:10px;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.8;color:rgba(255,255,255,0.6);">
          <div><span style="color:#10b981;">Processor:</span> 1x Overclocked Brain (thermal throttles under deadlines)</div>
          <div><span style="color:#10b981;">RAM:</span> Not enough. Never enough.</div>
          <div><span style="color:#10b981;">Storage:</span> 90% Stack Overflow bookmarks</div>
          <div><span style="color:#10b981;">Uptime:</span> ${F()} years (and counting)</div>
          <div><span style="color:#10b981;">Kernel:</span> Full Stack Engineering</div>
          <div><span style="color:#10b981;">Shell:</span> coffee-driven-development</div>
        </div>
        <p style="color:#444;font-size:11px;margin-top:16px;">Built with mass amounts of caffeine by Arun Munaganti.<br>No frameworks were harmed in the making of this OS.</p>
      </div>
    `})}let P=!1;function Se(t){const e=document.createElement("div");e.className="taskbar",e.innerHTML=`
    <button class="start-btn" title="Start Menu">${c("grid",18,"#3478f6")}</button>
    <div class="taskbar-apps"></div>
    <div class="system-tray">
      <span class="tray-item tray-visitors" title="Visitors online">${c("users",14)} <span class="tray-visitors-count">1</span></span>
      <span class="tray-item tray-location" title="Detecting location...">${c("mapPin",14)} <span class="tray-location-text">...</span></span>
      <span class="tray-item tray-wifi" title="WiFi: FBI_Surveillance_Van_7 | Signal: vibes">${c("wifi",14)}</span>
      <span class="tray-item tray-battery" title="Battery info">${c("battery",14)} <span class="tray-battery-text">--</span></span>
      <span class="tray-item tray-clock">${c("clock",14)} <span class="tray-clock-time"></span></span>
    </div>
  `,t.appendChild(e),e.querySelector(".start-btn").addEventListener("click",n=>{n.stopPropagation(),Me(t)}),document.addEventListener("click",n=>{P&&!n.target.closest(".start-menu")&&!n.target.closest(".start-btn")&&$()}),V(e.querySelector(".tray-clock-time")),setInterval(()=>V(e.querySelector(".tray-clock-time")),1e3),Ee(e),Ce(e),window.__updateTaskbar=()=>$e(e.querySelector(".taskbar-apps"))}async function Ee(t){const e=t.querySelector(".tray-battery-text"),n=t.querySelector(".tray-battery");try{if("getBattery"in navigator){const o=await navigator.getBattery(),i=()=>{const s=Math.round(o.level*100),a=o.charging;e.textContent=`${s}%`,n.title=a?`Battery: ${s}% (charging — good, you'll need the energy)`:`Battery: ${s}%${s<20?" (you live dangerously)":s>95?" (still afraid to unplug)":""}`};i(),o.addEventListener("levelchange",i),o.addEventListener("chargingchange",i)}else e.textContent="99%",n.title="Battery: 99% — your browser won't tell me the real number"}catch{e.textContent="99%",n.title="Battery: unknown (I tried)"}}async function Ce(t){const e=t.querySelector(".tray-location-text"),n=t.querySelector(".tray-location");try{const o=new AbortController;setTimeout(()=>o.abort(),4e3);const i=await fetch("https://ipapi.co/json/",{signal:o.signal});if(!i.ok)throw new Error;const s=await i.json();s.city?(e.textContent=s.city,n.title=`Location: ${s.city}, ${s.region}, ${s.country_name}
IP: ${s.ip}
ISP: ${s.org||"unknown"}
(Yes, we can see this. No, we don't store it.)`):(e.textContent="Earth",n.title="Location: Somewhere on Earth")}catch{e.textContent="Earth",n.title="Location: Could not detect — you might be a VPN user"}}function $e(t){if(!t)return;const e=ae(),n=le();t.innerHTML="",e.forEach(o=>{const i=document.createElement("div");i.className="taskbar-app"+(o.id===n&&!o.minimized?" active":""),i.innerHTML=`<span class="taskbar-app-icon">${o.icon}</span> ${o.title}`,i.addEventListener("click",()=>re(o.id)),t.appendChild(i)})}function V(t){if(!t)return;const e=new Date,n=e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0});t.textContent=n,t.parentElement.title=`Local: ${n}
Arun's Time: ${e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:"Asia/Kolkata"})} IST
(yes, he's probably coding right now)`}function Me(t){P?$():Le(t)}function Le(t){$(),P=!0;const e=document.createElement("div");e.className="start-menu open",e.id="start-menu";const n=ee();e.innerHTML=`
    <div class="start-menu-search">
      <div style="position:relative;">
        <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);opacity:0.3;">${c("search",14)}</span>
        <input type="text" placeholder="Search apps... (try 'salary')" id="start-search" style="padding-left:32px;" />
      </div>
    </div>
    <div class="start-menu-apps">
      ${n.map(i=>`
        <div class="start-menu-app" data-app-id="${i.id}">
          <span class="start-menu-app-icon">${i.icon}</span>
          <span>${i.label}</span>
        </div>
      `).join("")}
    </div>
    <div class="start-menu-footer">
      <span>ArunOS v${F()}</span>
      <span class="start-menu-shutdown" style="cursor:pointer;display:flex;align-items:center;gap:4px;">${c("power",12)} Shut Down</span>
    </div>
  `,t.appendChild(e),e.querySelectorAll(".start-menu-app").forEach(i=>{i.addEventListener("click",()=>{C(i.dataset.appId),$()})});const o=e.querySelector("#start-search");o.addEventListener("input",()=>{const i=o.value.toLowerCase().trim();Te(i,e)}),o.focus(),e.querySelector(".start-menu-shutdown").addEventListener("click",()=>{H(async()=>{const{notify:i}=await Promise.resolve().then(()=>he);return{notify:i}},void 0).then(({notify:i})=>{i("Shut Down Failed","Error: Cannot shut down. Have you considered that I'm a website?")}),$()})}function Te(t,e){const n=e.querySelector(".start-menu-apps"),o=ee(),i={salary:"Nice try, HR.",password:`It's "password123". Just kidding. Or am I?`,bugs:"We don't have those here. Only undocumented features.",fired:"Error 403: This search is above your pay grade.",coffee:"Now we're talking. Essential system resource.",girlfriend:"404: Not Found (insufficient time allocated)",sleep:"Module not found. Have you tried coffee instead?"};if(i[t]){n.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:20px;color:rgba(255,255,255,0.5);font-size:13px;">${i[t]}</div>`;return}const s=t?o.filter(a=>a.label.toLowerCase().includes(t)||a.id.toLowerCase().includes(t)):o;n.innerHTML=s.length?s.map(a=>`
    <div class="start-menu-app" data-app-id="${a.id}">
      <span class="start-menu-app-icon">${a.icon}</span>
      <span>${a.label}</span>
    </div>
  `).join(""):'<div style="grid-column:1/-1;text-align:center;padding:20px;color:rgba(255,255,255,0.35);font-size:13px;">No results. Like my dating life.</div>',n.querySelectorAll(".start-menu-app").forEach(a=>{a.addEventListener("click",()=>{C(a.dataset.appId),$()})})}function $(){P=!1;const t=document.getElementById("start-menu");t&&t.remove()}function Ae(t){return new Promise(e=>{let n=!1;const o=document.createElement("div");o.style.cssText="position:fixed;inset:0;z-index:100000;overflow:hidden;",t.appendChild(o),Be(o).then(()=>{n||(o.style.transition="opacity 0.375s",o.style.opacity="0",setTimeout(()=>{o.remove(),e()},375))});function i(){n=!0,o.style.transition="opacity 0.225s",o.style.opacity="0",setTimeout(()=>{o.remove(),e()},225)}o.__skip=i})}function Ie(){const t=navigator.userAgent,e=[];t.includes("Firefox")?e.push({text:"Browser: Firefox detected. A developer of culture.",type:"ok"}):t.includes("Edg")?e.push({text:"Browser: Edge? Bold. Microsoft would be proud.",type:"ok"}):t.includes("OPR")||t.includes("Opera")?e.push({text:"Browser: Opera? You are a rare breed.",type:"ok"}):t.includes("Chrome")?e.push({text:"Browser: Chrome detected. RIP your RAM.",type:"ok"}):t.includes("Safari")?e.push({text:"Browser: Safari. Fancy Apple user detected.",type:"ok"}):e.push({text:"Browser: Unknown... respect for the obscure choice.",type:"ok"}),/iPhone|iPad|iPod/.test(t)?e.push({text:"Host OS: iOS — browsing portfolios on the go",type:"ok"}):t.includes("Android")?e.push({text:"Host OS: Android — a person of the people",type:"ok"}):t.includes("Mac")?e.push({text:"Host OS: macOS — good taste, expensive taste",type:"ok"}):t.includes("Windows")?e.push({text:"Host OS: Windows — a fellow sufferer",type:"ok"}):t.includes("Linux")?e.push({text:"Host OS: Linux — bet you compile your own kernels",type:"ok"}):e.push({text:"Host OS: Unknown — running ArunOS inside a mystery",type:"ok"});const n=window.screen.width,o=window.screen.height,i=window.devicePixelRatio||1;return e.push({text:`Display: ${n}x${o} @ ${i}x DPI`,type:"ok"}),e}async function Oe(){try{const t=new AbortController,e=setTimeout(()=>t.abort(),3e3),n=await fetch("https://ipapi.co/json/",{signal:t.signal});if(clearTimeout(e),!n.ok)return null;const o=await n.json();return{city:o.city,region:o.region,country:o.country_name,ip:o.ip}}catch{return null}}function Be(t){return new Promise(async e=>{t.style.background="#0a0a0a",t.innerHTML=`
      <div style="display:flex;flex-direction:column;justify-content:center;height:100%;padding:40px;font-family:'JetBrains Mono',monospace;font-size:14px;">
        <div id="boot-log" style="max-width:700px;margin:0 auto;width:100%;"></div>
        <div style="position:fixed;bottom:20px;right:20px;color:#333;font-size:12px;cursor:pointer;" id="boot-skip">Click to skip</div>
      </div>
    `;const n=t.querySelector("#boot-log"),o=t.querySelector("#boot-skip");let i=!1;o.addEventListener("click",()=>{i=!0,e()});const s=Oe(),a=fe(),d=Ie(),l=a.findIndex(r=>r.type==="blank"),y=[...a.slice(0,l>=0?l:6),...d,{text:"",type:"blank"},...a.slice(l>=0?l+1:6)];for(const r of y){if(i){e();return}if(r.type==="blank"){const p=document.createElement("div");p.innerHTML="&nbsp;",n.appendChild(p)}else{const p=document.createElement("div");r.type==="ok"?p.innerHTML=`<span style="color:#10b981;">[OK]</span> <span style="color:#888;">${r.text}</span>`:r.type==="fail"?p.innerHTML=`<span style="color:#ef4444;">[FAIL]</span> <span style="color:#888;">${r.text}</span>`:r.type==="success"?p.innerHTML=`<span style="color:#10b981;font-weight:700;">${r.text}</span>`:p.innerHTML=`<span style="color:#666;">${r.text}</span>`,n.appendChild(p)}n.scrollTop=n.scrollHeight;const u=r.type==="blank"?150:r.type==="fail"?450:r.type==="success"?300:Math.random()*90+45;await _(u)}if(!i){const r=await s;if(r&&r.city){const u=document.createElement("div");u.innerHTML=`<span style="color:#10b981;">[OK]</span> <span style="color:#888;">Visitor location: ${r.city}, ${r.country} — welcome!</span>`;const p=n.lastElementChild;n.insertBefore(u,p),n.scrollTop=n.scrollHeight,await _(225)}}i||(await _(450),e())})}function _(t){return new Promise(e=>setTimeout(e,t))}const Y=["#10b981","#3b82f6","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4","#f97316"],K=["Curious Fox","Swift Eagle","Silent Panda","Brave Wolf","Chill Cat","Busy Bee","Wise Owl","Happy Duck","Sneaky Raccoon","Zen Turtle","Code Monkey","Debug Dragon","Deploy Dolphin","Merge Moose","Rebase Rabbit"];let A=null,E=null,B=null,I={},ne=null,oe=null,W=null;function ze(t,e){A=t,E=e,ne=Y[Math.floor(Math.random()*Y.length)],oe=K[Math.floor(Math.random()*K.length)],B=document.createElement("div"),B.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:99990;",document.body.appendChild(B),document.addEventListener("mousemove",He);const n=D(A,"cursors");de(n,i=>{const s=i.val()||{};Object.entries(s).forEach(([l,y])=>{l!==E&&(Date.now()-y.t>1e4||Pe(l,y))}),Object.keys(I).forEach(l=>{(!s[l]||l===E)&&Re(l)});const a=Object.keys(s).filter(l=>{var y;return Date.now()-(((y=s[l])==null?void 0:y.t)||0)<1e4}).length,d=document.querySelector(".tray-visitors-count");d&&(d.textContent=a)});const o=D(A,`cursors/${E}`);pe(o).remove()}function He(t){if(!A||!E||W)return;W=setTimeout(()=>{W=null},100);const e=(t.clientX/window.innerWidth*100).toFixed(1),n=(t.clientY/window.innerHeight*100).toFixed(1);ue(D(A,`cursors/${E}`),{x:parseFloat(e),y:parseFloat(n),c:ne,n:oe,t:Date.now()})}function Pe(t,e){let n=I[t];n||(n=document.createElement("div"),n.style.cssText="position:fixed;pointer-events:none;transition:left 0.1s linear,top 0.1s linear;z-index:99991;",n.innerHTML=`
      <svg width="16" height="20" viewBox="0 0 16 20" fill="${e.c}" style="filter:drop-shadow(0 1px 3px rgba(0,0,0,0.5));">
        <path d="M0 0L16 12L8 12L12 20L8 18L4 12L0 16Z"/>
      </svg>
      <span style="position:absolute;top:18px;left:12px;background:${e.c};color:#000;padding:1px 6px;border-radius:4px;font-size:10px;font-family:'Inter',sans-serif;white-space:nowrap;font-weight:600;">${e.n}</span>
    `,B.appendChild(n),I[t]=n),n.style.left=`${e.x}%`,n.style.top=`${e.y}%`}function Re(t){const e=I[t];e&&(e.remove(),delete I[t])}let J=null,b=null,N=null;const qe=12e4;function _e(){M(),document.addEventListener("mousemove",M),document.addEventListener("keydown",M),document.addEventListener("click",M),document.addEventListener("scroll",M)}function M(){b&&j(),clearTimeout(J),J=setTimeout(We,qe)}function We(){b=document.createElement("div"),b.style.cssText=`
    position:fixed;inset:0;background:#000;z-index:999998;
    cursor:pointer;overflow:hidden;
  `;const t=document.createElement("div");t.style.cssText=`
    position:absolute;
    font-family:'JetBrains Mono',monospace;
    font-size:36px;font-weight:700;
    white-space:nowrap;
    transition:color 0.5s;
  `,t.textContent="HIRE ME",b.appendChild(t),document.body.appendChild(b);let e=Math.random()*(window.innerWidth-200),n=Math.random()*(window.innerHeight-60),o=2,i=1.5;const s=["#10b981","#3b82f6","#f59e0b","#ef4444","#8b5cf6","#ec4899"];let a=0;function d(){e+=o,n+=i,(e<=0||e>=window.innerWidth-180)&&(o=-o,a=(a+1)%s.length,t.style.color=s[a]),(n<=0||n>=window.innerHeight-50)&&(i=-i,a=(a+1)%s.length,t.style.color=s[a]),t.style.left=e+"px",t.style.top=n+"px",N=requestAnimationFrame(d)}t.style.color=s[0],d(),b.addEventListener("click",j),b.addEventListener("mousemove",j)}function j(){N&&cancelAnimationFrame(N),b&&(b.remove(),b=null)}const G=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];let L=0,X=0;function De(){document.addEventListener("keydown",n=>{n.key===G[L]?(L++,L===G.length&&(L=0,Fe())):L=0});const t=new MutationObserver(()=>{const n=document.querySelectorAll(".os-window:not(.minimized)");n.length>=8&&n.length>X&&x("Memory Warning","You have "+n.length+" windows open. Your RAM is fine. Your screen real estate is not.",4e3,"alertTriangle"),X=n.length}),e=document.querySelector(".desktop-area");e&&t.observe(e,{childList:!0,subtree:!0})}function Fe(){x("Konami Code Activated",'You found the secret. Achievement unlocked: "retro gamer"',4e3,"gamepad");const t=document.querySelector(".desktop");t&&(t.style.transition="box-shadow 0.5s",t.style.boxShadow="inset 0 0 100px rgba(16, 185, 129, 0.3)",document.querySelectorAll(".desktop-icon").forEach((e,n)=>{e.style.transition="transform 0.1s",setTimeout(()=>{e.style.transform=`rotate(${Math.random()*10-5}deg)`},n*50),setTimeout(()=>{e.style.transform=""},1e3+n*50)}),setTimeout(()=>{t.style.boxShadow=""},2e3))}function Ne(){localStorage.getItem("arunos-wizard-done")||setTimeout(()=>{Q({id:"first-run",title:"Welcome to ArunOS — Setup Wizard (1 of 1, I promise)",icon:c("rocket",16),width:460,height:400,content:t=>{t.innerHTML=`
          <div style="text-align:center;padding:8px;">
            <div style="margin-bottom:12px;">${c("rocket",48,"#10b981")}</div>
            <h2 style="color:#ddd;font-size:18px;margin-bottom:4px;">Welcome to ArunOS</h2>
            <p style="color:#555;font-size:13px;margin-bottom:20px;">The only portfolio that's also an operating system.</p>

            <div style="text-align:left;background:rgba(0,0,0,0.25);padding:16px;border-radius:8px;margin-bottom:16px;">
              <p style="color:#888;font-size:13px;margin-bottom:12px;">What brings you here today?</p>
              <div style="display:flex;flex-direction:column;gap:8px;" id="wizard-options">
                <label style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;cursor:pointer;transition:all 0.15s;color:#aaa;font-size:13px;">
                  <input type="radio" name="reason" value="hiring" style="accent-color:#10b981;">
                  <span style="display:flex;align-items:center;gap:8px;">${c("briefcase",16,"#888")} I'm hiring</span>
                </label>
                <label style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;cursor:pointer;transition:all 0.15s;color:#aaa;font-size:13px;">
                  <input type="radio" name="reason" value="browsing" style="accent-color:#10b981;">
                  <span style="display:flex;align-items:center;gap:8px;">${c("eye",16,"#888")} Just browsing</span>
                </label>
                <label style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;cursor:pointer;transition:all 0.15s;color:#aaa;font-size:13px;">
                  <input type="radio" name="reason" value="linkedin" style="accent-color:#10b981;">
                  <span style="display:flex;align-items:center;gap:8px;">${c("compass",16,"#888")} Stalking from LinkedIn</span>
                </label>
                <label style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;cursor:pointer;transition:all 0.15s;color:#aaa;font-size:13px;">
                  <input type="radio" name="reason" value="lost" style="accent-color:#10b981;">
                  <span style="display:flex;align-items:center;gap:8px;">${c("mapPin",16,"#888")} I clicked the wrong link</span>
                </label>
                <label style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;cursor:pointer;transition:all 0.15s;color:#aaa;font-size:13px;">
                  <input type="radio" name="reason" value="arun" style="accent-color:#10b981;">
                  <span style="display:flex;align-items:center;gap:8px;">${c("home",16,"#888")} I'm Arun and I forgot my own site</span>
                </label>
              </div>
            </div>

            <button id="wizard-continue" style="padding:10px 28px;background:#10b981;color:#000;border:none;border-radius:8px;font-weight:600;font-size:14px;cursor:pointer;font-family:inherit;">Let's Go</button>
          </div>
        `,t.querySelectorAll("label").forEach(e=>{e.addEventListener("click",()=>{t.querySelectorAll("label").forEach(n=>n.style.borderColor="#262626"),e.style.borderColor="#3478f6"})}),t.querySelector("#wizard-continue").addEventListener("click",()=>{const e=t.querySelector('input[name="reason"]:checked'),n=e?e.value:"browsing";localStorage.setItem("arunos-wizard-done","1");const i={hiring:{title:"Welcome, Recruiter",body:"Resume is on the desktop. I promise my code is better than my interview skills.",icon:"briefcase"},browsing:{title:"Welcome, Explorer",body:"Feel free to snoop around. Try the Terminal for the full experience.",icon:"eye"},linkedin:{title:"Busted",body:"We've been expecting you. Your LinkedIn stalking session has been logged. (Not really.)",icon:"compass"},lost:{title:"Welcome Anyway",body:"You're here now. Might as well look around. It's better than whatever you were doing.",icon:"mapPin"},arun:{title:"Welcome Home, Boss",body:"Everything is running smoothly. Except the coffee machine. As usual.",icon:"home"}}[n];ce("first-run"),setTimeout(()=>x(i.title,i.body,5e3,i.icon),300)})}})},2e3)}const je=[{x:.15,y:.85,r:.4,color:[99,102,241],speed:15e-5,phase:0},{x:.85,y:.15,r:.35,color:[244,114,182],speed:12e-5,phase:1.5},{x:.5,y:.5,r:.45,color:[56,189,248],speed:1e-4,phase:3},{x:.3,y:.2,r:.3,color:[167,139,250],speed:18e-5,phase:4.5},{x:.7,y:.75,r:.35,color:[52,211,153],speed:14e-5,phase:2},{x:.9,y:.45,r:.25,color:[251,146,60],speed:16e-5,phase:5.5}];let m=null,S=null,ie=0,U=0;function Ue(t){m=document.createElement("canvas"),m.className="live-wallpaper",m.style.cssText="position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;";const e=t.querySelector(".desktop-area");if(e){e.style.position="relative",e.insertBefore(m,e.firstChild);const n=e.querySelector(".desktop-icons");n&&(n.style.position="relative")}S=m.getContext("2d"),Z(),window.addEventListener("resize",Z),U=performance.now(),se()}function Z(){if(!m)return;const t=Math.min(window.devicePixelRatio||1,2);m.width=Math.floor(m.offsetWidth*t*.5),m.height=Math.floor(m.offsetHeight*t*.5)}function se(){const t=performance.now(),e=t-U;U=t,ie+=e,Ve(),requestAnimationFrame(se)}function Ve(){const t=m.width,e=m.height;if(!(!t||!e)){S.fillStyle="#0a0e1a",S.fillRect(0,0,t,e);for(const n of je){const o=ie*n.speed+n.phase,i=(n.x+Math.sin(o)*.08+Math.cos(o*.7)*.05)*t,s=(n.y+Math.cos(o*1.1)*.08+Math.sin(o*.6)*.05)*e,a=n.r*Math.max(t,e)*(.9+Math.sin(o*.5)*.1),[d,l,y]=n.color,r=S.createRadialGradient(i,s,0,i,s,a);r.addColorStop(0,`rgba(${d}, ${l}, ${y}, 0.45)`),r.addColorStop(.4,`rgba(${d}, ${l}, ${y}, 0.2)`),r.addColorStop(1,`rgba(${d}, ${l}, ${y}, 0)`),S.fillStyle=r,S.fillRect(0,0,t,e)}}}const Ye=new Date(2019,0,1);function Ke(t){const e=document.createElement("div");e.className="widgets-container",t.appendChild(e),Je(e),Ge(e),Xe(e),Ze(e),Qe(e)}function Je(t){const e=R("uptime-widget");e.innerHTML=`
    <div class="widget-header">
      <span class="widget-header-icon">${c("clock",14,"#10b981")}</span>
      <span>System Uptime</span>
    </div>
    <div class="uptime-counter" style="font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:700;color:#fff;margin:8px 0 4px;letter-spacing:0.5px;"></div>
    <div class="uptime-status" style="font-size:11px;color:rgba(255,255,255,0.4);height:16px;transition:opacity 0.5s;"></div>
    <div style="display:flex;align-items:center;gap:6px;margin-top:8px;">
      <span style="width:6px;height:6px;border-radius:50%;background:#10b981;animation:pulse 2s ease-in-out infinite;"></span>
      <span style="font-size:10px;color:#10b981;">ONLINE</span>
    </div>
  `,t.appendChild(e);const n=e.querySelector(".uptime-counter"),o=e.querySelector(".uptime-status"),i=["30+ repos deployed","~$50M market cap built","10+ microservices migrated","Caffeine dependency: stable","30k+ users served","Zero production fires (today)","Stack Overflow tabs: countless"];let s=0;function a(){const y=new Date-Ye,r=Math.floor(y/(365.25*24*60*60*1e3)),u=y-r*365.25*24*60*60*1e3,p=Math.floor(u/(30.44*24*60*60*1e3)),h=u-p*30.44*24*60*60*1e3,g=Math.floor(h/(24*60*60*1e3)),f=Math.floor(h%(24*60*60*1e3)/(60*60*1e3)),v=Math.floor(h%(60*60*1e3)/(60*1e3)),w=Math.floor(h%(60*1e3)/1e3);n.textContent=`${r}y ${p}m ${g}d ${z(f)}:${z(v)}:${z(w)}`}function d(){o.style.opacity="0",setTimeout(()=>{o.textContent=i[s%i.length],o.style.opacity="1",s++},300)}a(),d(),setInterval(a,1e3),setInterval(d,4e3)}function Ge(t){const e=[{title:"Undefined Is Not a Function",artist:"TypeError ft. Console.log",album:"Runtime Errors Vol. 3",color:"#e74c3c"},{title:"It Works on My Machine",artist:"Docker",album:"Container Therapy",color:"#3498db"},{title:"sudo rm -rf /my-problems",artist:"Bash Shell",album:"Pipe Dreams",color:"#2ecc71"},{title:"404 Love Not Found",artist:"HTTP Client",album:"Status Codes of the Heart",color:"#9b59b6"},{title:"Merge Conflict",artist:"Git & The Rebases",album:"Branch Management",color:"#f39c12"},{title:"Deploying on Friday",artist:"CI/CD Pipeline",album:"Living Dangerously",color:"#e67e22"},{title:"Stack Overflow Lullaby",artist:"Copy Paste",album:"Greatest Hits",color:"#1abc9c"}],n=R("nowplaying-widget");n.innerHTML=`
    <div style="display:flex;gap:12px;align-items:center;">
      <div class="np-art" style="width:52px;height:52px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:background 0.8s;">${c("zap",24,"rgba(255,255,255,0.7)")}</div>
      <div style="flex:1;min-width:0;">
        <div class="np-title" style="font-size:13px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:opacity 0.5s;"></div>
        <div class="np-artist" style="font-size:11px;color:rgba(255,255,255,0.45);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:opacity 0.5s;"></div>
        <div class="np-album" style="font-size:10px;color:rgba(255,255,255,0.3);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:opacity 0.5s;"></div>
      </div>
    </div>
    <div style="margin-top:10px;height:3px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden;">
      <div class="np-progress" style="height:100%;width:0%;border-radius:2px;transition:width 0.5s linear,background 0.8s;"></div>
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:4px;font-size:10px;color:rgba(255,255,255,0.25);">
      <span class="np-elapsed">0:00</span>
      <span class="np-duration">3:30</span>
    </div>
  `,t.appendChild(n);const o=n.querySelector(".np-art"),i=n.querySelector(".np-title"),s=n.querySelector(".np-artist"),a=n.querySelector(".np-album"),d=n.querySelector(".np-progress"),l=n.querySelector(".np-elapsed");let y=Math.floor(Math.random()*e.length),r=Date.now();const u=18e3;function p(){const g=e[y%e.length];i.style.opacity="0",s.style.opacity="0",a.style.opacity="0",setTimeout(()=>{i.textContent=g.title,s.textContent=g.artist,a.textContent=g.album,o.style.background=`linear-gradient(135deg, ${g.color}, ${g.color}88)`,d.style.background=g.color,i.style.opacity="1",s.style.opacity="1",a.style.opacity="1"},300),r=Date.now(),y++}function h(){const g=Date.now()-r,f=Math.min(g/u*100,100);d.style.width=f+"%";const v=Math.floor(g/1e3);l.textContent=`${Math.floor(v/60)}:${z(v%60)}`,g>=u&&p()}p(),setInterval(h,500)}function Xe(t){const e=R("intel-widget");e.innerHTML=`
    <div class="widget-header">
      <span class="widget-header-icon">${c("eye",14,"#f59e0b")}</span>
      <span>Visitor Intel</span>
      <span style="margin-left:auto;font-size:9px;color:rgba(255,255,255,0.2);letter-spacing:1px;">CLASSIFIED</span>
    </div>
    <div class="intel-rows" style="font-family:'JetBrains Mono',monospace;font-size:11px;margin-top:8px;display:flex;flex-direction:column;gap:4px;color:rgba(255,255,255,0.5);"></div>
    <div class="intel-verdict" style="margin-top:10px;padding:6px 10px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.15);border-radius:6px;font-size:11px;color:#f59e0b;text-align:center;transition:opacity 0.5s;"></div>
  `,t.appendChild(e);const n=e.querySelector(".intel-rows"),o=e.querySelector(".intel-verdict"),i=navigator.userAgent;let s="Unknown";i.includes("Firefox")?s="Firefox":i.includes("Edg")?s="Edge":i.includes("OPR")||i.includes("Opera")?s="Opera":i.includes("Chrome")?s="Chrome":i.includes("Safari")&&(s="Safari");let a="Unknown";/iPhone|iPad|iPod/.test(i)?a="iOS":i.includes("Android")?a="Android":i.includes("Mac")?a="macOS":i.includes("Windows")?a="Windows":i.includes("Linux")&&(a="Linux");const d=`${window.screen.width}x${window.screen.height}`;n.innerHTML=`
    <div><span style="color:rgba(255,255,255,0.3);">Browser:</span> ${s}</div>
    <div><span style="color:rgba(255,255,255,0.3);">OS:</span> ${a}</div>
    <div><span style="color:rgba(255,255,255,0.3);">Screen:</span> ${d}</div>
    <div><span style="color:rgba(255,255,255,0.3);">Location:</span> <span class="intel-location">detecting...</span></div>
    <div><span style="color:rgba(255,255,255,0.3);">Battery:</span> <span class="intel-battery">--</span></div>
  `,fetch("https://ipapi.co/json/",{signal:AbortSignal.timeout(4e3)}).then(u=>u.json()).then(u=>{u.city&&(e.querySelector(".intel-location").textContent=`${u.city}, ${u.country_name}`)}).catch(()=>{e.querySelector(".intel-location").textContent="Classified"}),"getBattery"in navigator&&navigator.getBattery().then(u=>{e.querySelector(".intel-battery").textContent=`${Math.round(u.level*100)}%${u.charging?" (charging)":""}`}).catch(()=>{});const l=["Threat Level: Recruiter (High Priority)","Assessment: Should hire Arun immediately","Status: Probably has 47 Chrome tabs open","Risk: May spend too long on this site","Classified: This visitor has good taste","Note: Cursor movements being tracked"];let y=0;function r(){o.style.opacity="0",setTimeout(()=>{o.textContent=l[y%l.length],o.style.opacity="1",y++},300)}r(),setInterval(r,5e3)}function Ze(t){const e=R("weather-widget"),n={sun:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',cloud:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',storm:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>',fog:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="1.5" stroke-linecap="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><line x1="4" y1="22" x2="20" y2="22" opacity="0.4"/></svg>',bolt:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>'},o=[{day:"Mon",icon:"sun",desc:"Sprint planning",temp:"24°"},{day:"Tue",icon:"storm",desc:"Prod hotfix",temp:"38°"},{day:"Wed",icon:"cloud",desc:"Code review",temp:"21°"},{day:"Thu",icon:"fog",desc:"Unclear reqs",temp:"??°"},{day:"Fri",icon:"bolt",desc:"Demo day",temp:"42°"}];e.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
      <div>
        <div class="widget-header" style="margin-bottom:4px;">
          <span class="widget-header-icon">${c("cloud",14,"#3b82f6")}</span>
          <span>Career Weather</span>
        </div>
        <div style="font-size:32px;font-weight:700;color:#fff;">27°</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.4);">Partly cloudy with a chance of deployments</div>
      </div>
      <div>${n.sun}</div>
    </div>
    <div style="display:flex;gap:4px;font-size:10px;color:rgba(255,255,255,0.3);margin-top:6px;">
      <span>Humidity: 100% (imposter syndrome)</span>
      <span style="margin-left:auto;">Wind: scope creep</span>
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:12px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.06);">
      ${o.map(i=>`
        <div style="text-align:center;flex:1;">
          <div style="font-size:10px;color:rgba(255,255,255,0.35);margin-bottom:4px;">${i.day}</div>
          ${n[i.icon]}
          <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:2px;">${i.temp}</div>
          <div style="font-size:9px;color:rgba(255,255,255,0.25);margin-top:1px;">${i.desc}</div>
        </div>
      `).join("")}
    </div>
  `,t.appendChild(e)}function Qe(t){const e=document.createElement("div");e.className="widget sticky-note-widget",e.innerHTML=`
    <div style="font-size:14px;color:rgba(0,0,0,0.7);font-weight:600;margin-bottom:8px;">Hey! Thanks for visiting.</div>
    <div style="font-size:12px;color:rgba(0,0,0,0.5);line-height:1.6;margin-bottom:12px;">Quick links:</div>
    <div style="display:flex;flex-direction:column;gap:4px;font-size:12px;margin-bottom:14px;">
      <a href="/resume.pdf" target="_blank" style="color:#1d4ed8;text-decoration:none;display:flex;align-items:center;gap:6px;">${c("fileText",14,"#1d4ed8")} Resume</a>
      <a href="${q.github}" target="_blank" style="color:#1d4ed8;text-decoration:none;display:flex;align-items:center;gap:6px;">${c("code",14,"#1d4ed8")} GitHub</a>
      <a href="${q.linkedin}" target="_blank" style="color:#1d4ed8;text-decoration:none;display:flex;align-items:center;gap:6px;">${c("externalLink",14,"#1d4ed8")} LinkedIn</a>
      <a href="mailto:${q.email}" style="color:#1d4ed8;text-decoration:none;display:flex;align-items:center;gap:6px;">${c("mail",14,"#1d4ed8")} Email</a>
    </div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(0,0,0,0.4);line-height:1.8;">
      <div>[x] Build portfolio OS</div>
      <div>[x] Add developer humor</div>
      <div>[ ] Get mass hired</div>
      <div>[ ] Fix sleep schedule</div>
    </div>
  `,t.appendChild(e)}function R(t){const e=document.createElement("div");return e.className=`widget ${t}`,e}function z(t){return t.toString().padStart(2,"0")}async function st(t){await Ae(t);const e=ve(t);Ue(e),Se(e);const n=e.querySelector(".desktop-area");n&&Ke(n),ye().then(o=>{o&&(ze(o.db,o.userId),x("Connected","Multiplayer enabled. Other visitors can see your cursor.",4e3,"wifi"))}).catch(()=>{}),H(async()=>{const{openApp:o}=await import("./registry-BkBxvpgy.js");return{openApp:o}},__vite__mapDeps([3,1,2,4])).then(({openApp:o})=>o("about")),Ne(),te(),_e(),ge(),De(),document.addEventListener("keydown",o=>{(o.ctrlKey||o.metaKey)&&o.key==="t"&&(o.preventDefault(),H(async()=>{const{openApp:i}=await import("./registry-BkBxvpgy.js");return{openApp:i}},__vite__mapDeps([3,1,2,4])).then(({openApp:i})=>i("terminal")))})}export{st as boot};
