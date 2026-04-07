(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Al="modulepreload",Rl=function(n){return"/"+n},zs={},B=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){let o=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));s=o(t.map(c=>{if(c=Rl(c),c in zs)return;zs[c]=!0;const d=c.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":Al,d||(h.as="script"),h.crossOrigin="",h.href=c,l&&h.setAttribute("nonce",l),document.head.appendChild(h),d)return new Promise((f,m)=>{h.addEventListener("load",f),h.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})};let U=[],ho=100,J=null;function Nl(){return U}function Pl(){return J}function fo({id:n,title:e,icon:t,content:i,width:s=700,height:r=500,x:o,y:a,onClose:l}){const c=U.find(T=>T.id===n);if(c)return Le(n),c.minimized&&go(n),c;const d=document.querySelector(".desktop-area");if(!d)return null;const u=d.getBoundingClientRect(),h=o??Math.max(20,(u.width-s)/2+Math.random()*40-20),f=a??Math.max(20,(u.height-r)/2+Math.random()*40-20),m={id:n,title:e,icon:t||"📁",width:s,height:r,x:h,y:f,minimized:!1,maximized:!1,prevBounds:null,zIndex:++ho,onClose:l};U.push(m);const g=Ml(m,i);return d.appendChild(g),Le(n),Gt(),m}function po(n){const e=U.findIndex(s=>s.id===n);if(e===-1)return;const t=U[e];t.onClose&&t.onClose();const i=document.getElementById(`window-${n}`);i&&i.remove(),U.splice(e,1),J===n&&(J=U.length?U[U.length-1].id:null,J&&Le(J)),Gt()}function Le(n){const e=U.find(t=>t.id===n);e&&(J=n,e.zIndex=++ho,U.forEach(t=>{const i=document.getElementById(`window-${t.id}`);i&&(i.style.zIndex=t.zIndex,i.classList.toggle("focused",t.id===n))}),Gt())}function mo(n){const e=U.find(i=>i.id===n);if(!e)return;e.minimized=!0;const t=document.getElementById(`window-${n}`);if(t&&t.classList.add("minimized"),J===n){const i=U.filter(s=>!s.minimized);J=i.length?i[i.length-1].id:null,J&&Le(J)}Gt()}function go(n){const e=U.find(i=>i.id===n);if(!e)return;e.minimized=!1;const t=document.getElementById(`window-${n}`);t&&t.classList.remove("minimized"),Le(n),Gt()}function Vs(n){const e=U.find(i=>i.id===n);if(!e)return;const t=document.getElementById(`window-${n}`);t&&(e.maximized?(e.maximized=!1,t.classList.remove("maximized"),e.prevBounds&&(Object.assign(t.style,{left:e.prevBounds.x+"px",top:e.prevBounds.y+"px",width:e.prevBounds.width+"px",height:e.prevBounds.height+"px"}),e.x=e.prevBounds.x,e.y=e.prevBounds.y,e.width=e.prevBounds.width,e.height=e.prevBounds.height)):(e.prevBounds={x:e.x,y:e.y,width:e.width,height:e.height},e.maximized=!0,t.classList.add("maximized"),Object.assign(t.style,{left:"0",top:"0",width:"100%",height:"100%"})))}function Ol(n){const e=U.find(t=>t.id===n);e&&(e.minimized?go(n):J===n?mo(n):Le(n))}function Ml(n,e){const t=document.createElement("div");t.id=`window-${n.id}`,t.className="os-window focused",t.style.cssText=`left:${n.x}px;top:${n.y}px;width:${n.width}px;height:${n.height}px;z-index:${n.zIndex};`,t.innerHTML=`
    <div class="window-titlebar" data-window-id="${n.id}">
      <div class="window-buttons">
        <div class="window-btn window-btn-close" data-action="close" data-window-id="${n.id}"></div>
        <div class="window-btn window-btn-minimize" data-action="minimize" data-window-id="${n.id}"></div>
        <div class="window-btn window-btn-maximize" data-action="maximize" data-window-id="${n.id}"></div>
      </div>
      <span class="window-icon">${n.icon}</span>
      <span class="window-title">${n.title}</span>
    </div>
    <div class="window-content" id="window-content-${n.id}"></div>
    <div class="resize-handle resize-handle-e" data-resize="e"></div>
    <div class="resize-handle resize-handle-s" data-resize="s"></div>
    <div class="resize-handle resize-handle-se" data-resize="se"></div>
    <div class="resize-handle resize-handle-w" data-resize="w"></div>
    <div class="resize-handle resize-handle-n" data-resize="n"></div>
  `;const i=t.querySelector(".window-content");typeof e=="string"?i.innerHTML=e:e instanceof HTMLElement?i.appendChild(e):typeof e=="function"&&e(i),t.addEventListener("mousedown",()=>Le(n.id)),t.querySelectorAll(".window-btn").forEach(r=>{r.addEventListener("click",o=>{o.stopPropagation();const a=r.dataset.action,l=r.dataset.windowId;a==="close"?po(l):a==="minimize"?mo(l):a==="maximize"&&Vs(l)})});const s=t.querySelector(".window-titlebar");return s.addEventListener("dblclick",()=>Vs(n.id)),Dl(t,n,s),t.querySelectorAll(".resize-handle").forEach(r=>{Ll(t,n,r)}),t}function Dl(n,e,t){let i=!1,s,r,o,a;t.addEventListener("mousedown",l=>{l.target.classList.contains("window-btn")||e.maximized||(i=!0,s=l.clientX,r=l.clientY,o=e.x,a=e.y,l.preventDefault())}),document.addEventListener("mousemove",l=>{if(!i)return;const c=l.clientX-s,d=l.clientY-r;e.x=o+c,e.y=Math.max(0,a+d),n.style.left=e.x+"px",n.style.top=e.y+"px"}),document.addEventListener("mouseup",()=>{i=!1})}function Ll(n,e,t){const i=t.dataset.resize;let s=!1,r,o,a,l,c,d;t.addEventListener("mousedown",u=>{e.maximized||(s=!0,r=u.clientX,o=u.clientY,a=e.width,l=e.height,c=e.x,d=e.y,u.preventDefault(),u.stopPropagation())}),document.addEventListener("mousemove",u=>{if(!s)return;const h=u.clientX-r,f=u.clientY-o;if(i.includes("e")&&(e.width=Math.max(300,a+h)),i.includes("s")&&(e.height=Math.max(200,l+f)),i.includes("w")){const m=Math.max(300,a-h);e.x=c+(a-m),e.width=m,n.style.left=e.x+"px"}if(i.includes("n")){const m=Math.max(200,l-f);e.y=Math.max(0,d+(l-m)),e.height=m,n.style.top=e.y+"px"}n.style.width=e.width+"px",n.style.height=e.height+"px"}),document.addEventListener("mouseup",()=>{s=!1})}function Gt(){typeof window.__updateTaskbar=="function"&&window.__updateTaskbar()}const w=(n,e={})=>{const t=e.fill||"none",i=e.stroke||"currentColor",s=e.strokeWidth||1.5;return`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${t}" stroke="${i}" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round">${n}</svg>`},qs={user:w('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),briefcase:w('<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'),fileText:w('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>'),terminal:w('<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>'),folder:w('<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>'),mail:w('<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>'),messageCircle:w('<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>'),calculator:w('<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/>'),trash:w('<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>'),settings:w('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>'),refresh:w('<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>'),clipboard:w('<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>'),palette:w('<circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12" r="1.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>'),code:w('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),info:w('<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'),externalLink:w('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'),wifi:w('<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>'),battery:w('<rect x="1" y="6" width="18" height="12" rx="2" ry="2"/><line x1="23" y1="13" x2="23" y2="11"/><rect x="3" y="8" width="14" height="8" rx="1" fill="currentColor" opacity="0.3"/>'),users:w('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),clock:w('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),power:w('<path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/>'),grid:w('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>'),search:w('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),zap:w('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/>'),monitor:w('<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>'),rocket:w('<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>'),cloud:w('<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>'),download:w('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'),lightbulb:w('<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>'),alertTriangle:w('<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'),radio:w('<circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/>'),gamepad:w('<line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/>'),briefcaseSmall:w('<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'),eye:w('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'),compass:w('<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>'),mapPin:w('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'),home:w('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'),layout:w('<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>'),book:w('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>')};function v(n,e=24,t="currentColor"){return(qs[n]||qs.info).replace('width="24"',`width="${e}"`).replace('height="24"',`height="${e}"`).replace(/stroke="currentColor"/g,`stroke="${t}"`).replace(/fill="currentColor"/g,`fill="${t}"`)}const _o={about:{id:"about",label:"About Me",icon:v("user",16),module:()=>B(()=>import("./about-C4zTeAyL.js"),[])},experience:{id:"experience",label:"Experience",icon:v("briefcase",16),module:()=>B(()=>import("./experience-Bi_VY8Tp.js"),[])},skills:{id:"skills",label:"Skills.txt",icon:v("fileText",16),module:()=>B(()=>import("./skills-D-0PTIGt.js"),[])},terminal:{id:"terminal",label:"Terminal",icon:v("terminal",16),module:()=>B(()=>import("./terminal-BexmNNPX.js"),[])},projects:{id:"projects",label:"Projects",icon:v("folder",16),module:()=>B(()=>import("./file-explorer-CdBfA955.js"),[])},contact:{id:"contact",label:"Contact",icon:v("mail",16),module:()=>B(()=>import("./contact-D5EX_k2p.js"),[])},chat:{id:"chat",label:"Chat",icon:v("messageCircle",16),module:()=>B(()=>import("./chat-BF6hzJhQ.js"),[])},calculator:{id:"calculator",label:"Calculator",icon:v("calculator",16),module:()=>B(()=>import("./calculator-EsKS55A9.js"),[])},settings:{id:"settings",label:"Settings",icon:v("settings",16),module:()=>B(()=>import("./settings-vKFmaqUC.js"),[])},"recycle-bin":{id:"recycle-bin",label:"Recycle Bin",icon:v("trash",16),module:()=>B(()=>import("./recycle-bin-BUzgKl4g.js"),[])},portfolio:{id:"portfolio",label:"Portfolio",icon:v("layout",16),module:()=>B(()=>import("./iframe-app-BSjtBAtG.js"),[]).then(n=>({open:()=>n.openIframeApp("portfolio","Portfolio","https://arunsai63.github.io/portfolio","layout")}))},blog:{id:"blog",label:"Blog",icon:v("book",16),module:()=>B(()=>import("./iframe-app-BSjtBAtG.js"),[]).then(n=>({open:()=>n.openIframeApp("blog","Blog","https://arunsai63.github.io/blogs/","book")}))}};function Qi(){return Object.values(_o)}async function De(n){const e=_o[n];if(!e)return;(await e.module()).open()}const Gs=Object.freeze(Object.defineProperty({__proto__:null,appList:Qi,openApp:De},Symbol.toStringTag,{value:"Module"}));let Ge=null;function Fl(){return Ge||(Ge=document.createElement("div"),Ge.className="notification-container",document.body.appendChild(Ge),Ge)}function Te(n,e,t=4e3,i=null){const s=Fl(),r=document.createElement("div");r.className="notification-toast";const o=i?`<span class="notification-icon">${v(i,18,"#10b981")}</span>`:"";r.innerHTML=`
    <div class="notification-header">
      ${o}
      <div class="notification-title">${n}</div>
    </div>
    <div class="notification-body">${e}</div>
  `,r.addEventListener("click",()=>r.remove()),s.appendChild(r),setTimeout(()=>{r.style.opacity="0",setTimeout(()=>r.remove(),300)},t)}function yo(){[{title:"AWS Cost Alert",body:"Your free tier expired 4 years ago. You owe mass amounts. Just kidding. Or am I?",delay:45e3,icon:"cloud"},{title:"ArunOS Update Available",body:"What's new: Fixed a typo in the changelog. That's it. That's the update.",delay:9e4,icon:"download"},{title:"Pro Tip",body:"Try typing 'sudo hire arun' in the Terminal. It's never been rejected.",delay:6e4,icon:"lightbulb"},{title:"Battery Warning",body:"Battery at 99%. It's been at 99% since 2019. I'm afraid to unplug it.",delay:12e4,icon:"alertTriangle"},{title:"WiFi Status",body:"Connected to FBI_Surveillance_Van_7. Signal: vibes.",delay:15e4,icon:"radio"}].forEach(e=>{setTimeout(()=>Te(e.title,e.body,5e3,e.icon),e.delay)})}const Ul=Object.freeze(Object.defineProperty({__proto__:null,notify:Te,startNotificationLoop:yo},Symbol.toStringTag,{value:"Module"})),Wl=new Date(2019,0,1);function ot(){return((new Date-Wl)/(1e3*60*60*24*365.25)).toFixed(1)}const oi={name:"Arun Munaganti",title:"Solutions Architect",company:"Echor Tech",get yoe(){return ot()},email:"arunsai63@gmail.com",github:"https://github.com/arunsai63",linkedin:"https://linkedin.com/in/arunmunaganti",portfolio:"https://arunsai63.github.io/portfolio",blog:"https://arunsai63.github.io/blogs"},Ng=[{company:"Echor Tech",title:"Solutions Architect",dates:"09/2024 - Present",year:2024,bullets:["Leading technical initiatives across frontend, backend, mobile apps, databases, and cloud.","Heading DevOps and backend operations, ensuring infrastructure efficiency, security and scalability.","Building and leading a VC backed decentralized creator monetization platform.","Implemented open-source solutions saving costs while maintaining performance."],tech:["Kafka","Python","NestJS","AWS","ECS","Fargate","FastAPI","CloudFormation","Docker","Linux","React","NodeJS","New Relic"],processName:"solutions-architect.exe",cpu:"110%",mem:"ALL OF IT",status:"CANNOT BE KILLED"},{company:"Echor Tech",title:"Software Engineer 3",dates:"01/2023 - 09/2024",year:2023,bullets:["Built and scaled three high-impact crypto projects from scratch (~$50M market cap).","Owned and managed crypto projects end-to-end, listed on OpenSea, MEXC, HTX.","Built and owned landwey.in, scaling to 30k+ users, optimizing infrastructure costs."],tech:["Solidity","Python","AWS","Node","Redis","NextJS","React","Rust","GitHub Actions","Docker","Web3","Svelte"],processName:"crypto-wizard.exe",cpu:"89%",mem:"4.2GB",status:"PRINTING MONEY"},{company:"Echor Tech",title:"Lead Developer",dates:"12/2021 - 01/2023",year:2021,bullets:["Led end-to-end development of an advanced trading automation platform.","Built a multi-media content marketing platform with crypto incentives and AI/ML integration.","Built scalable backend systems for real-time apps (payments, algorithms).","Established core tech workflows (Jira, GitHub) and managed technical hiring/training."],tech:["RabbitMQ","Python","Flask","Node","Express","MongoDB","Postgres","Docker","Serverless","Lambda","AWS","React","Solidity","Web3"],processName:"lead-dev.exe",cpu:"78%",mem:"3.1GB",status:"RUNNING"},{company:"Grow Indigo Pvt. Ltd.",title:"Software Development Engineer",dates:"04/2021 - 12/2021",year:2021,bullets:["Migrated internal dashboards from asp.net to react and .net core microservices.","Migrated services from on-prem to AWS with CI/CD setup (10+ microservices).","Fixed critical security vulnerabilities and implemented proper IAM.","Built and owned a referral and offers microservice, scaling to tens of thousands of users."],tech:[".NET Core","C#","AWS","MongoDB","MySQL","Microservices","Python","TypeScript","React"],processName:"migration-bot.exe",cpu:"65%",mem:"2.8GB",status:"COMPLETED"},{company:"GGK Tech",title:"Software Engineer",dates:"08/2020 - 04/2021",year:2020,bullets:["Worked as a full stack developer (.net core, react, mysql, redis).","Worked on Azure (CI/CD, deployments, serverless, multi-environment setup).","Improved application load times significantly (query optimization & cache) for 100k+ users."],tech:["C#","Azure","Serverless",".NET Core","React","MySQL","Redis","Azure Service Bus","Python","SQL Server"],processName:"fullstack-grind.exe",cpu:"55%",mem:"2.1GB",status:"COMPLETED"},{company:"GGK Tech",title:"Associate Software Engineer",dates:"01/2019 - 08/2020",year:2019,bullets:["Worked as a full stack developer (.net core, react, oracle).","Worked on a large migration project ($10M), migrating DB & .net projects.","Built and owned an internal employee management system (10k+ users)."],tech:["React","C#",".NET","Oracle","Sybase","Python"],processName:"baby-dev.exe",cpu:"42%",mem:"1.5GB",status:"COMPLETED (with dignity)"}],Pg={languages:["Python","Node.js","Rust","C#","TypeScript","JavaScript"],frontend:["React","Next.js","Svelte","HTML","CSS"],cloud:["AWS","Azure","Docker","CloudFormation (IaC)","Linux","Serverless","Microservices"],databases:["MongoDB","PostgreSQL","MySQL","DynamoDB","DocumentDB","Aurora","Redis"],messaging:["Kafka","RabbitMQ","SQS","Azure Service Bus"],devops:["CI/CD","GitHub Actions","Docker","New Relic","Security"],blockchain:["Solidity","Web3","Blockchain"],other:["Quant","LLM","Git"]};function Bl(){const n=ot();return[{text:`ArunOS BIOS v${n}`,type:"info"},{text:"Detecting hardware...",type:"info"},{text:"CPU: Solutions Architect @ 3.2GHz (4.5GHz with coffee boost)",type:"ok"},{text:`RAM: ${n} Years Experience (non-refundable)`,type:"ok"},{text:"DISK: 30+ repositories (mostly node_modules)",type:"ok"},{text:"GPU: Problem Solving v3.8",type:"ok"},{text:"",type:"blank"},{text:"Loading personality module... (warning: unfiltered)",type:"ok"},{text:"Mounting /dev/humor...",type:"ok"},{text:"Calibrating imposter syndrome... levels nominal",type:"ok"},{text:`Loading ${n} years of mass caffeine dependency...`,type:"ok"},{text:"Loading work-life-balance... module not found",type:"fail"},{text:"Falling back to coffee-driven-development...",type:"ok"},{text:"Starting cursor-surveillance daemon...",type:"ok"},{text:"Initializing ArunOS desktop...",type:"ok"},{text:"",type:"blank"},{text:`Welcome to ArunOS v${n} (Stable Build)`,type:"success"}]}const Og={"~":{type:"dir",children:{"README.md":{type:"file",content:`# Arun Munaganti

> Solutions Architect | ${ot()}+ YOE | Full Stack | AWS | Blockchain

I'm a solutions architect who thinks in systems, not just code.
Currently leading the engineering team at EchorTech.

I've mass-deployed crypto projects worth ~$50M, mass-migrated
more microservices than I can count, and mass-consumed enough
coffee to concern medical professionals.

When I'm not architecting solutions, I'm probably:
- Arguing about tabs vs spaces (spaces, fight me)
- Over-engineering my personal projects
- Pretending to understand Kubernetes`},"resume.pdf":{type:"file",content:'[binary - use "resume" command to download]'},projects:{type:"dir",children:{"crypto-platform":{type:"dir",children:{"README.md":{type:"file",content:"VC-backed decentralized creator platform. ~$50M market cap. Yes, really."}}},landwey:{type:"dir",children:{"README.md":{type:"file",content:"Scaled to 30k+ users. Infrastructure costs? Optimized. Hotel? Trivago."}}},"trading-bot":{type:"dir",children:{"README.md":{type:"file",content:"Advanced trading automation platform. Real-time algorithms. Real-time anxiety."}}}}},experience:{type:"dir",children:{"echortech.md":{type:"file",content:"Current home. Solutions Architect. Leading technical initiatives across... basically everything."},"grow-indigo.md":{type:"file",content:"Migrated 10+ microservices to AWS. The cloud migration era."},"ggk-tech.md":{type:"file",content:"Where it all began. .NET, React, and the innocence of youth."}}},".secrets":{type:"file",content:`password: konami

...you really just cat'd a secrets file. Classic.`}}}},$l=[{id:"about",svg:"user",label:"About Me",bg:"linear-gradient(135deg, #3b82f6, #2563eb)"},{id:"experience",svg:"briefcase",label:"Experience",bg:"linear-gradient(135deg, #f59e0b, #d97706)"},{id:"skills",svg:"fileText",label:"Skills.txt",bg:"linear-gradient(135deg, #10b981, #059669)"},{id:"terminal",svg:"terminal",label:"Terminal",bg:"linear-gradient(135deg, #1e1e1e, #333)"},{id:"projects",svg:"folder",label:"Projects",bg:"linear-gradient(135deg, #6366f1, #4f46e5)"},{id:"contact",svg:"mail",label:"Contact",bg:"linear-gradient(135deg, #3b82f6, #1d4ed8)"},{id:"chat",svg:"messageCircle",label:"Chat",bg:"linear-gradient(135deg, #22c55e, #16a34a)"},{id:"calculator",svg:"calculator",label:"Calculator",bg:"linear-gradient(135deg, #f97316, #ea580c)"},{id:"portfolio",svg:"layout",label:"Portfolio",bg:"linear-gradient(135deg, #8b5cf6, #7c3aed)"},{id:"blog",svg:"book",label:"Blog",bg:"linear-gradient(135deg, #ec4899, #db2777)"},{id:"recycle-bin",svg:"trash",label:"Recycle Bin",bg:"linear-gradient(135deg, #64748b, #475569)"}];function Hl(n){n.innerHTML=`
    <div class="desktop">
      <div class="desktop-area"></div>
      <div class="dock-wrapper">
        <div class="dock"></div>
      </div>
    </div>
  `;const e=n.querySelector(".dock");return $l.forEach(i=>{const s=document.createElement("div");s.className="dock-item",s.dataset.label=i.label,s.innerHTML=`
      <div class="dock-icon" style="background:${i.bg};">${v(i.svg,26,"#fff")}</div>
      <div class="dock-tooltip">${i.label}</div>
      <div class="dock-dot"></div>
    `,s.addEventListener("click",()=>{s.classList.add("bouncing"),s.addEventListener("animationend",()=>s.classList.remove("bouncing"),{once:!0}),De(i.id)}),e.appendChild(s)}),Vl(e),n.querySelector(".desktop").addEventListener("contextmenu",i=>{i.preventDefault(),i.target.closest(".os-window")||zl(i.clientX,i.clientY)}),document.addEventListener("click",()=>mn()),document.addEventListener("contextmenu",()=>mn()),n.querySelector(".desktop")}function zl(n,e){mn();const t=document.createElement("div");t.className="context-menu",t.id="desktop-context-menu",t.style.left=n+"px",t.style.top=e+"px",[{svg:"terminal",label:"Open Terminal",shortcut:"Ctrl+T",action:()=>De("terminal")},{svg:"folder",label:"Open File Explorer",action:()=>De("projects")},{separator:!0},{svg:"refresh",label:"Refresh My Career",action:()=>Te("Career Refresh","Still a Solutions Architect. Still awesome.")},{svg:"clipboard",label:"Paste (from Stack Overflow)",action:()=>Te("Clipboard","Nothing to paste. But we both know that's where your code comes from.")},{separator:!0},{svg:"palette",label:"Change Wallpaper",action:()=>De("settings")},{svg:"externalLink",label:"View Source",action:()=>window.open("https://github.com/arunsai63/arunsai63.github.io","_blank")},{svg:"info",label:"About ArunOS",action:()=>ql()}].forEach(r=>{if(r.separator){const a=document.createElement("div");a.className="context-menu-separator",t.appendChild(a);return}const o=document.createElement("div");o.className="context-menu-item",o.innerHTML=`<span class="context-menu-icon">${v(r.svg,16,"#888")}</span> ${r.label}${r.shortcut?`<span class="context-menu-shortcut">${r.shortcut}</span>`:""}`,o.addEventListener("click",a=>{a.stopPropagation(),mn(),r.action()}),t.appendChild(o)}),document.body.appendChild(t);const s=t.getBoundingClientRect();s.right>window.innerWidth&&(t.style.left=n-s.width+"px"),s.bottom>window.innerHeight&&(t.style.top=e-s.height+"px")}function mn(){const n=document.getElementById("desktop-context-menu");n&&n.remove()}function Vl(n){const e=[...n.querySelectorAll(".dock-item")],t=48,i=72,s=140,r=e.map(()=>t);let o=!1,a=0,l=null;function c(){return e.map((h,f)=>{if(!o)return t;const g=h.querySelector(".dock-icon").getBoundingClientRect(),T=g.left+g.width/2,L=Math.abs(a-T),K=Math.max(0,1-L/s);return t+(i-t)*(.5+.5*Math.cos(Math.PI*(1-K)))})}function d(){const h=c();let f=!1;e.forEach((m,g)=>{const T=o?.45:.2;r[g]+=(h[g]-r[g])*T,Math.abs(r[g]-h[g])<.3?r[g]=h[g]:f=!0;const L=r[g],K=m.querySelector(".dock-icon");K.style.width=L+"px",K.style.height=L+"px"}),f||o?l=requestAnimationFrame(d):l=null}function u(){l||(l=requestAnimationFrame(d))}n.addEventListener("mouseenter",()=>{o=!0,u()}),n.addEventListener("mousemove",h=>{a=h.clientX,o||(o=!0,u())}),n.addEventListener("mouseleave",()=>{o=!1,u()})}function ql(){fo({id:"about-os",title:"About ArunOS",icon:v("monitor",16),width:420,height:380,content:`
      <div style="text-align:center;padding:20px;">
        <div style="margin-bottom:16px;">${v("monitor",56,"#10b981")}</div>
        <h2 style="color:#ddd;margin-bottom:4px;font-size:18px;">ArunOS v${ot()}</h2>
        <p style="color:#666;margin-bottom:16px;font-size:13px;">"Stable" Build (debatable)</p>
        <div style="text-align:left;background:rgba(0,0,0,0.3);padding:14px;border-radius:10px;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.8;color:rgba(255,255,255,0.6);">
          <div><span style="color:#10b981;">Processor:</span> 1x Overclocked Brain (thermal throttles under deadlines)</div>
          <div><span style="color:#10b981;">RAM:</span> Not enough. Never enough.</div>
          <div><span style="color:#10b981;">Storage:</span> 90% Stack Overflow bookmarks</div>
          <div><span style="color:#10b981;">Uptime:</span> ${ot()} years (and counting)</div>
          <div><span style="color:#10b981;">Kernel:</span> Full Stack Engineering</div>
          <div><span style="color:#10b981;">Shell:</span> coffee-driven-development</div>
        </div>
        <p style="color:#444;font-size:11px;margin-top:16px;">Built with mass amounts of caffeine by Arun Munaganti.<br>No frameworks were harmed in the making of this OS.</p>
      </div>
    `})}let $n=!1;function Gl(n){const e=document.createElement("div");e.className="taskbar",e.innerHTML=`
    <button class="start-btn" title="Start Menu">${v("grid",18,"#3478f6")}</button>
    <div class="taskbar-apps"></div>
    <div class="system-tray">
      <span class="tray-item tray-visitors" title="Visitors online">${v("users",14)} <span class="tray-visitors-count">1</span></span>
      <span class="tray-item tray-location" title="Detecting location...">${v("mapPin",14)} <span class="tray-location-text">...</span></span>
      <span class="tray-item tray-wifi" title="WiFi: FBI_Surveillance_Van_7 | Signal: vibes">${v("wifi",14)}</span>
      <span class="tray-item tray-battery" title="Battery info">${v("battery",14)} <span class="tray-battery-text">--</span></span>
      <span class="tray-item tray-clock">${v("clock",14)} <span class="tray-clock-time"></span></span>
    </div>
  `,n.appendChild(e),e.querySelector(".start-btn").addEventListener("click",t=>{t.stopPropagation(),Ql(n)}),document.addEventListener("click",t=>{$n&&!t.target.closest(".start-menu")&&!t.target.closest(".start-btn")&&Ze()}),js(e.querySelector(".tray-clock-time")),setInterval(()=>js(e.querySelector(".tray-clock-time")),1e3),jl(e),Kl(e),window.__updateTaskbar=()=>Yl(e.querySelector(".taskbar-apps"))}async function jl(n){const e=n.querySelector(".tray-battery-text"),t=n.querySelector(".tray-battery");try{if("getBattery"in navigator){const i=await navigator.getBattery(),s=()=>{const r=Math.round(i.level*100),o=i.charging;e.textContent=`${r}%`,t.title=o?`Battery: ${r}% (charging — good, you'll need the energy)`:`Battery: ${r}%${r<20?" (you live dangerously)":r>95?" (still afraid to unplug)":""}`};s(),i.addEventListener("levelchange",s),i.addEventListener("chargingchange",s)}else e.textContent="99%",t.title="Battery: 99% — your browser won't tell me the real number"}catch{e.textContent="99%",t.title="Battery: unknown (I tried)"}}async function Kl(n){const e=n.querySelector(".tray-location-text"),t=n.querySelector(".tray-location");try{const i=new AbortController;setTimeout(()=>i.abort(),4e3);const s=await fetch("https://ipapi.co/json/",{signal:i.signal});if(!s.ok)throw new Error;const r=await s.json();r.city?(e.textContent=r.city,t.title=`Location: ${r.city}, ${r.region}, ${r.country_name}
IP: ${r.ip}
ISP: ${r.org||"unknown"}
(Yes, we can see this. No, we don't store it.)`):(e.textContent="Earth",t.title="Location: Somewhere on Earth")}catch{e.textContent="Earth",t.title="Location: Could not detect — you might be a VPN user"}}function Yl(n){if(!n)return;const e=Nl(),t=Pl();n.innerHTML="",e.forEach(i=>{const s=document.createElement("div");s.className="taskbar-app"+(i.id===t&&!i.minimized?" active":""),s.innerHTML=`<span class="taskbar-app-icon">${i.icon}</span> ${i.title}`,s.addEventListener("click",()=>Ol(i.id)),n.appendChild(s)})}function js(n){if(!n)return;const e=new Date,t=e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0});n.textContent=t,n.parentElement.title=`Local: ${t}
Arun's Time: ${e.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!0,timeZone:"Asia/Kolkata"})} IST
(yes, he's probably coding right now)`}function Ql(n){$n?Ze():Jl(n)}function Jl(n){Ze(),$n=!0;const e=document.createElement("div");e.className="start-menu open",e.id="start-menu";const t=Qi();e.innerHTML=`
    <div class="start-menu-search">
      <div style="position:relative;">
        <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);opacity:0.3;">${v("search",14)}</span>
        <input type="text" placeholder="Search apps... (try 'salary')" id="start-search" style="padding-left:32px;" />
      </div>
    </div>
    <div class="start-menu-apps">
      ${t.map(s=>`
        <div class="start-menu-app" data-app-id="${s.id}">
          <span class="start-menu-app-icon">${s.icon}</span>
          <span>${s.label}</span>
        </div>
      `).join("")}
    </div>
    <div class="start-menu-footer">
      <span>ArunOS v${ot()}</span>
      <span class="start-menu-shutdown" style="cursor:pointer;display:flex;align-items:center;gap:4px;">${v("power",12)} Shut Down</span>
    </div>
  `,n.appendChild(e),e.querySelectorAll(".start-menu-app").forEach(s=>{s.addEventListener("click",()=>{De(s.dataset.appId),Ze()})});const i=e.querySelector("#start-search");i.addEventListener("input",()=>{const s=i.value.toLowerCase().trim();Xl(s,e)}),i.focus(),e.querySelector(".start-menu-shutdown").addEventListener("click",()=>{B(async()=>{const{notify:s}=await Promise.resolve().then(()=>Ul);return{notify:s}},void 0).then(({notify:s})=>{s("Shut Down Failed","Error: Cannot shut down. Have you considered that I'm a website?")}),Ze()})}function Xl(n,e){const t=e.querySelector(".start-menu-apps"),i=Qi(),s={salary:"Nice try, HR.",password:`It's "password123". Just kidding. Or am I?`,bugs:"We don't have those here. Only undocumented features.",fired:"Error 403: This search is above your pay grade.",coffee:"Now we're talking. Essential system resource.",girlfriend:"404: Not Found (insufficient time allocated)",sleep:"Module not found. Have you tried coffee instead?"};if(s[n]){t.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:20px;color:rgba(255,255,255,0.5);font-size:13px;">${s[n]}</div>`;return}const r=n?i.filter(o=>o.label.toLowerCase().includes(n)||o.id.toLowerCase().includes(n)):i;t.innerHTML=r.length?r.map(o=>`
    <div class="start-menu-app" data-app-id="${o.id}">
      <span class="start-menu-app-icon">${o.icon}</span>
      <span>${o.label}</span>
    </div>
  `).join(""):'<div style="grid-column:1/-1;text-align:center;padding:20px;color:rgba(255,255,255,0.35);font-size:13px;">No results. Like my dating life.</div>',t.querySelectorAll(".start-menu-app").forEach(o=>{o.addEventListener("click",()=>{De(o.dataset.appId),Ze()})})}function Ze(){$n=!1;const n=document.getElementById("start-menu");n&&n.remove()}function Zl(n){return new Promise(e=>{let t=!1;const i=document.createElement("div");i.style.cssText="position:fixed;inset:0;z-index:100000;overflow:hidden;",n.appendChild(i),nc(i).then(()=>{t||(i.style.transition="opacity 0.375s",i.style.opacity="0",setTimeout(()=>{i.remove(),e()},375))});function s(){t=!0,i.style.transition="opacity 0.225s",i.style.opacity="0",setTimeout(()=>{i.remove(),e()},225)}i.__skip=s})}function ec(){const n=navigator.userAgent,e=[];n.includes("Firefox")?e.push({text:"Browser: Firefox detected. A developer of culture.",type:"ok"}):n.includes("Edg")?e.push({text:"Browser: Edge? Bold. Microsoft would be proud.",type:"ok"}):n.includes("OPR")||n.includes("Opera")?e.push({text:"Browser: Opera? You are a rare breed.",type:"ok"}):n.includes("Chrome")?e.push({text:"Browser: Chrome detected. RIP your RAM.",type:"ok"}):n.includes("Safari")?e.push({text:"Browser: Safari. Fancy Apple user detected.",type:"ok"}):e.push({text:"Browser: Unknown... respect for the obscure choice.",type:"ok"}),/iPhone|iPad|iPod/.test(n)?e.push({text:"Host OS: iOS — browsing portfolios on the go",type:"ok"}):n.includes("Android")?e.push({text:"Host OS: Android — a person of the people",type:"ok"}):n.includes("Mac")?e.push({text:"Host OS: macOS — good taste, expensive taste",type:"ok"}):n.includes("Windows")?e.push({text:"Host OS: Windows — a fellow sufferer",type:"ok"}):n.includes("Linux")?e.push({text:"Host OS: Linux — bet you compile your own kernels",type:"ok"}):e.push({text:"Host OS: Unknown — running ArunOS inside a mystery",type:"ok"});const t=window.screen.width,i=window.screen.height,s=window.devicePixelRatio||1;return e.push({text:`Display: ${t}x${i} @ ${s}x DPI`,type:"ok"}),e}async function tc(){try{const n=new AbortController,e=setTimeout(()=>n.abort(),3e3),t=await fetch("https://ipapi.co/json/",{signal:n.signal});if(clearTimeout(e),!t.ok)return null;const i=await t.json();return{city:i.city,region:i.region,country:i.country_name,ip:i.ip}}catch{return null}}function nc(n){return new Promise(async e=>{n.style.background="#0a0a0a",n.innerHTML=`
      <div style="display:flex;flex-direction:column;justify-content:center;height:100%;padding:40px;font-family:'JetBrains Mono',monospace;font-size:14px;">
        <div id="boot-log" style="max-width:700px;margin:0 auto;width:100%;"></div>
        <div style="position:fixed;bottom:20px;right:20px;color:#333;font-size:12px;cursor:pointer;" id="boot-skip">Click to skip</div>
      </div>
    `;const t=n.querySelector("#boot-log"),i=n.querySelector("#boot-skip");let s=!1;i.addEventListener("click",()=>{s=!0,e()});const r=tc(),o=Bl(),a=ec(),l=o.findIndex(d=>d.type==="blank"),c=[...o.slice(0,l>=0?l:6),...a,{text:"",type:"blank"},...o.slice(l>=0?l+1:6)];for(const d of c){if(s){e();return}if(d.type==="blank"){const h=document.createElement("div");h.innerHTML="&nbsp;",t.appendChild(h)}else{const h=document.createElement("div");d.type==="ok"?h.innerHTML=`<span style="color:#10b981;">[OK]</span> <span style="color:#888;">${d.text}</span>`:d.type==="fail"?h.innerHTML=`<span style="color:#ef4444;">[FAIL]</span> <span style="color:#888;">${d.text}</span>`:d.type==="success"?h.innerHTML=`<span style="color:#10b981;font-weight:700;">${d.text}</span>`:h.innerHTML=`<span style="color:#666;">${d.text}</span>`,t.appendChild(h)}t.scrollTop=t.scrollHeight;const u=d.type==="blank"?150:d.type==="fail"?450:d.type==="success"?300:Math.random()*90+45;await ai(u)}if(!s){const d=await r;if(d&&d.city){const u=document.createElement("div");u.innerHTML=`<span style="color:#10b981;">[OK]</span> <span style="color:#888;">Visitor location: ${d.city}, ${d.country} — welcome!</span>`;const h=t.lastElementChild;t.insertBefore(u,h),t.scrollTop=t.scrollHeight,await ai(225)}}s||(await ai(450),e())})}function ai(n){return new Promise(e=>setTimeout(e,n))}const ic=()=>{};var Ks={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vo={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p=function(n,e){if(!n)throw pt(e)},pt=function(n){return new Error("Firebase Database ("+vo.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wo=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},sc=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Ji={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,d=r>>2,u=(r&3)<<4|a>>4;let h=(a&15)<<2|c>>6,f=c&63;l||(f=64,o||(h=64)),i.push(t[d],t[u],t[h],t[f])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(wo(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):sc(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const u=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||c==null||u==null)throw new rc;const h=r<<2|a>>4;if(i.push(h),c!==64){const f=a<<4&240|c>>2;if(i.push(f),u!==64){const m=c<<6&192|u;i.push(m)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class rc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const bo=function(n){const e=wo(n);return Ji.encodeByteArray(e,!0)},gn=function(n){return bo(n).replace(/\./g,"")},_n=function(n){try{return Ji.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oc(n){return Eo(void 0,n)}function Eo(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!ac(t)||(n[t]=Eo(n[t],e[t]));return n}function ac(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cc=()=>lc().__FIREBASE_DEFAULTS__,dc=()=>{if(typeof process>"u"||typeof Ks>"u")return;const n=Ks.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},uc=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&_n(n[1]);return e&&JSON.parse(e)},Xi=()=>{try{return ic()||cc()||dc()||uc()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Io=n=>{var e,t;return(t=(e=Xi())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},hc=n=>{const e=Io(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Co=()=>{var n;return(n=Xi())==null?void 0:n.config},To=n=>{var e;return(e=Xi())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fc(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[gn(JSON.stringify(t)),gn(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Zi(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test($())}function pc(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function mc(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function So(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function gc(){const n=$();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function _c(){return vo.NODE_ADMIN===!0}function yc(){try{return typeof indexedDB=="object"}catch{return!1}}function vc(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)==null?void 0:r.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wc="FirebaseError";class Ae extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=wc,Object.setPrototypeOf(this,Ae.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,jt.prototype.create)}}class jt{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?bc(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new Ae(s,a,i)}}function bc(n,e){return n.replace(Ec,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Ec=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mt(n){return JSON.parse(n)}function D(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ko=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=Mt(_n(r[0])||""),t=Mt(_n(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Ic=function(n){const e=ko(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Cc=function(n){const e=ko(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function at(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function yn(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function vn(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Fe(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(Ys(r)&&Ys(o)){if(!Fe(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Ys(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mt(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tc{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let u=0;u<16;u++)i[u]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let u=0;u<16;u++)i[u]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let u=16;u<80;u++){const h=i[u-3]^i[u-8]^i[u-14]^i[u-16];i[u]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,d;for(let u=0;u<80;u++){u<40?u<20?(c=a^r&(o^a),d=1518500249):(c=r^o^a,d=1859775393):u<60?(c=r&o|a&(r|o),d=2400959708):(c=r^o^a,d=3395469782);const h=(s<<5|s>>>27)+c+l+d+i[u]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Sc(n,e){const t=new kc(n,e);return t.subscribe.bind(t)}class kc{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");xc(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=li),s.error===void 0&&(s.error=li),s.complete===void 0&&(s.complete=li);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function xc(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function li(){}function lt(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ac=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,p(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Hn=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function xo(n){return(await fetch(n,{credentials:"include"})).ok}class Ue{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ne="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rc{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new re;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Pc(e))try{this.getOrInitializeService({instanceIdentifier:Ne})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Ne){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ne){return this.instances.has(e)}getOptions(e=Ne){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Nc(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Ne){return this.component?this.component.multipleInstances?e:Ne:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Nc(n){return n===Ne?void 0:n}function Pc(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oc{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Rc(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var k;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(k||(k={}));const Mc={debug:k.DEBUG,verbose:k.VERBOSE,info:k.INFO,warn:k.WARN,error:k.ERROR,silent:k.SILENT},Dc=k.INFO,Lc={[k.DEBUG]:"log",[k.VERBOSE]:"log",[k.INFO]:"info",[k.WARN]:"warn",[k.ERROR]:"error"},Fc=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Lc[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class es{constructor(e){this.name=e,this._logLevel=Dc,this._logHandler=Fc,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in k))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Mc[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,k.DEBUG,...e),this._logHandler(this,k.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,k.VERBOSE,...e),this._logHandler(this,k.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,k.INFO,...e),this._logHandler(this,k.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,k.WARN,...e),this._logHandler(this,k.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,k.ERROR,...e),this._logHandler(this,k.ERROR,...e)}}const Uc=(n,e)=>e.some(t=>n instanceof t);let Qs,Js;function Wc(){return Qs||(Qs=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Bc(){return Js||(Js=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ao=new WeakMap,Ci=new WeakMap,Ro=new WeakMap,ci=new WeakMap,ts=new WeakMap;function $c(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(we(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Ao.set(t,n)}).catch(()=>{}),ts.set(e,n),e}function Hc(n){if(Ci.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Ci.set(n,e)}let Ti={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ci.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Ro.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return we(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function zc(n){Ti=n(Ti)}function Vc(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(di(this),e,...t);return Ro.set(i,e.sort?e.sort():[e]),we(i)}:Bc().includes(n)?function(...e){return n.apply(di(this),e),we(Ao.get(this))}:function(...e){return we(n.apply(di(this),e))}}function qc(n){return typeof n=="function"?Vc(n):(n instanceof IDBTransaction&&Hc(n),Uc(n,Wc())?new Proxy(n,Ti):n)}function we(n){if(n instanceof IDBRequest)return $c(n);if(ci.has(n))return ci.get(n);const e=qc(n);return e!==n&&(ci.set(n,e),ts.set(e,n)),e}const di=n=>ts.get(n);function Gc(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=we(o);return i&&o.addEventListener("upgradeneeded",l=>{i(we(o.result),l.oldVersion,l.newVersion,we(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const jc=["get","getKey","getAll","getAllKeys","count"],Kc=["put","add","delete","clear"],ui=new Map;function Xs(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ui.get(e))return ui.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Kc.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||jc.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return ui.set(e,r),r}zc(n=>({...n,get:(e,t,i)=>Xs(e,t)||n.get(e,t,i),has:(e,t)=>!!Xs(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yc{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Qc(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Qc(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Si="@firebase/app",Zs="0.14.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const de=new es("@firebase/app"),Jc="@firebase/app-compat",Xc="@firebase/analytics-compat",Zc="@firebase/analytics",ed="@firebase/app-check-compat",td="@firebase/app-check",nd="@firebase/auth",id="@firebase/auth-compat",sd="@firebase/database",rd="@firebase/data-connect",od="@firebase/database-compat",ad="@firebase/functions",ld="@firebase/functions-compat",cd="@firebase/installations",dd="@firebase/installations-compat",ud="@firebase/messaging",hd="@firebase/messaging-compat",fd="@firebase/performance",pd="@firebase/performance-compat",md="@firebase/remote-config",gd="@firebase/remote-config-compat",_d="@firebase/storage",yd="@firebase/storage-compat",vd="@firebase/firestore",wd="@firebase/ai",bd="@firebase/firestore-compat",Ed="firebase",Id="12.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ki="[DEFAULT]",Cd={[Si]:"fire-core",[Jc]:"fire-core-compat",[Zc]:"fire-analytics",[Xc]:"fire-analytics-compat",[td]:"fire-app-check",[ed]:"fire-app-check-compat",[nd]:"fire-auth",[id]:"fire-auth-compat",[sd]:"fire-rtdb",[rd]:"fire-data-connect",[od]:"fire-rtdb-compat",[ad]:"fire-fn",[ld]:"fire-fn-compat",[cd]:"fire-iid",[dd]:"fire-iid-compat",[ud]:"fire-fcm",[hd]:"fire-fcm-compat",[fd]:"fire-perf",[pd]:"fire-perf-compat",[md]:"fire-rc",[gd]:"fire-rc-compat",[_d]:"fire-gcs",[yd]:"fire-gcs-compat",[vd]:"fire-fst",[bd]:"fire-fst-compat",[wd]:"fire-vertex","fire-js":"fire-js",[Ed]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wn=new Map,Td=new Map,xi=new Map;function er(n,e){try{n.container.addComponent(e)}catch(t){de.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ct(n){const e=n.name;if(xi.has(e))return de.debug(`There were multiple attempts to register component ${e}.`),!1;xi.set(e,n);for(const t of wn.values())er(t,n);for(const t of Td.values())er(t,n);return!0}function ns(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Y(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sd={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},be=new jt("app","Firebase",Sd);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kd{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Ue("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw be.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gt=Id;function No(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:ki,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw be.create("bad-app-name",{appName:String(s)});if(t||(t=Co()),!t)throw be.create("no-options");const r=wn.get(s);if(r){if(Fe(t,r.options)&&Fe(i,r.config))return r;throw be.create("duplicate-app",{appName:s})}const o=new Oc(s);for(const l of xi.values())o.addComponent(l);const a=new kd(t,i,o);return wn.set(s,a),a}function Po(n=ki){const e=wn.get(n);if(!e&&n===ki&&Co())return No();if(!e)throw be.create("no-app",{appName:n});return e}function Ee(n,e,t){let i=Cd[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),de.warn(o.join(" "));return}ct(new Ue(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xd="firebase-heartbeat-database",Ad=1,Dt="firebase-heartbeat-store";let hi=null;function Oo(){return hi||(hi=Gc(xd,Ad,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Dt)}catch(t){console.warn(t)}}}}).catch(n=>{throw be.create("idb-open",{originalErrorMessage:n.message})})),hi}async function Rd(n){try{const t=(await Oo()).transaction(Dt),i=await t.objectStore(Dt).get(Mo(n));return await t.done,i}catch(e){if(e instanceof Ae)de.warn(e.message);else{const t=be.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});de.warn(t.message)}}}async function tr(n,e){try{const i=(await Oo()).transaction(Dt,"readwrite");await i.objectStore(Dt).put(e,Mo(n)),await i.done}catch(t){if(t instanceof Ae)de.warn(t.message);else{const i=be.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});de.warn(i.message)}}}function Mo(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nd=1024,Pd=30;class Od{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Dd(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=nr();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats.length>Pd){const o=Ld(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){de.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=nr(),{heartbeatsToSend:i,unsentEntries:s}=Md(this._heartbeatsCache.heartbeats),r=gn(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return de.warn(t),""}}}function nr(){return new Date().toISOString().substring(0,10)}function Md(n,e=Nd){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),ir(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),ir(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Dd{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return yc()?vc().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Rd(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return tr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return tr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function ir(n){return gn(JSON.stringify({version:2,heartbeats:n})).length}function Ld(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fd(n){ct(new Ue("platform-logger",e=>new Yc(e),"PRIVATE")),ct(new Ue("heartbeat",e=>new Od(e),"PRIVATE")),Ee(Si,Zs,n),Ee(Si,Zs,"esm2020"),Ee("fire-js","")}Fd("");var Ud="firebase",Wd="12.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ee(Ud,Wd,"app");var sr={};const rr="@firebase/database",or="1.1.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Do="";function Bd(n){Do=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),D(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Mt(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return se(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lo=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new $d(e)}}catch{}return new Hd},Oe=Lo("localStorage"),zd=Lo("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const et=new es("@firebase/database"),Vd=function(){let n=1;return function(){return n++}}(),Fo=function(n){const e=Ac(n),t=new Tc;t.update(e);const i=t.digest();return Ji.encodeByteArray(i)},Yt=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Yt.apply(null,i):typeof i=="object"?e+=D(i):e+=i,e+=" "}return e};let kt=null,ar=!0;const qd=function(n,e){p(!0,"Can't turn on custom loggers persistently."),et.logLevel=k.VERBOSE,kt=et.log.bind(et)},F=function(...n){if(ar===!0&&(ar=!1,kt===null&&zd.get("logging_enabled")===!0&&qd()),kt){const e=Yt.apply(null,n);kt(e)}},Qt=function(n){return function(...e){F(n,...e)}},Ai=function(...n){const e="FIREBASE INTERNAL ERROR: "+Yt(...n);et.error(e)},ue=function(...n){const e=`FIREBASE FATAL ERROR: ${Yt(...n)}`;throw et.error(e),new Error(e)},V=function(...n){const e="FIREBASE WARNING: "+Yt(...n);et.warn(e)},Gd=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&V("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},zn=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},jd=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},dt="[MIN_NAME]",We="[MAX_NAME]",Ve=function(n,e){if(n===e)return 0;if(n===dt||e===We)return-1;if(e===dt||n===We)return 1;{const t=lr(n),i=lr(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},Kd=function(n,e){return n===e?0:n<e?-1:1},bt=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+D(e))},is=function(n){if(typeof n!="object"||n===null)return D(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=D(e[i]),t+=":",t+=is(n[e[i]]);return t+="}",t},Uo=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function W(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const Wo=function(n){p(!zn(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,l;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const d=c.join("");let u="";for(l=0;l<64;l+=8){let h=parseInt(d.substr(l,8),2).toString(16);h.length===1&&(h="0"+h),u=u+h}return u.toLowerCase()},Yd=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Qd=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Jd(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const Xd=new RegExp("^-?(0*)\\d{1,10}$"),Zd=-2147483648,eu=2147483647,lr=function(n){if(Xd.test(n)){const e=Number(n);if(e>=Zd&&e<=eu)return e}return null},_t=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw V("Exception was thrown by user callback.",t),e},Math.floor(0))}},tu=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},xt=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,Y(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)==null||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){V(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(F("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',V(e)}}class an{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}an.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ss="5",Bo="v",$o="s",Ho="r",zo="f",Vo=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,qo="ls",Go="p",Ri="ac",jo="websocket",Ko="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo{constructor(e,t,i,s,r=!1,o="",a=!1,l=!1,c=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Oe.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Oe.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function su(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Qo(n,e,t){p(typeof e=="string","typeof type must == string"),p(typeof t=="object","typeof params must == object");let i;if(e===jo)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Ko)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);su(n)&&(t.ns=n.namespace);const s=[];return W(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(){this.counters_={}}incrementCounter(e,t=1){se(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return oc(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fi={},pi={};function rs(n){const e=n.toString();return fi[e]||(fi[e]=new ru),fi[e]}function ou(n,e){const t=n.toString();return pi[t]||(pi[t]=e()),pi[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&_t(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cr="start",lu="close",cu="pLPCommand",du="pRTLPCB",Jo="id",Xo="pw",Zo="ser",uu="cb",hu="seg",fu="ts",pu="d",mu="dframe",ea=1870,ta=30,gu=ea-ta,_u=25e3,yu=3e4;class Ye{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Qt(e),this.stats_=rs(t),this.urlFn=l=>(this.appCheckToken&&(l[Ri]=this.appCheckToken),Qo(t,Ko,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new au(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(yu)),jd(()=>{if(this.isClosed_)return;this.scriptTagHolder=new os((...r)=>{const[o,a,l,c,d]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===cr)this.id=a,this.password=l;else if(o===lu)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[cr]="t",i[Zo]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[uu]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Bo]=ss,this.transportSessionId&&(i[$o]=this.transportSessionId),this.lastSessionId&&(i[qo]=this.lastSessionId),this.applicationId&&(i[Go]=this.applicationId),this.appCheckToken&&(i[Ri]=this.appCheckToken),typeof location<"u"&&location.hostname&&Vo.test(location.hostname)&&(i[Ho]=zo);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Ye.forceAllow_=!0}static forceDisallow(){Ye.forceDisallow_=!0}static isAvailable(){return Ye.forceAllow_?!0:!Ye.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Yd()&&!Qd()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=D(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=bo(t),s=Uo(i,gu);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[mu]="t",i[Jo]=e,i[Xo]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=D(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class os{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Vd(),window[cu+this.uniqueCallbackIdentifier]=e,window[du+this.uniqueCallbackIdentifier]=t,this.myIFrame=os.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){F("frame writing exception"),a.stack&&F(a.stack),F(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||F("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Jo]=this.myID,e[Xo]=this.myPW,e[Zo]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+ta+i.length<=ea;){const o=this.pendingSegs.shift();i=i+"&"+hu+s+"="+o.seg+"&"+fu+s+"="+o.ts+"&"+pu+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(_u)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{F("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vu=16384,wu=45e3;let bn=null;typeof MozWebSocket<"u"?bn=MozWebSocket:typeof WebSocket<"u"&&(bn=WebSocket);class Q{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Qt(this.connId),this.stats_=rs(t),this.connURL=Q.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[Bo]=ss,typeof location<"u"&&location.hostname&&Vo.test(location.hostname)&&(o[Ho]=zo),t&&(o[$o]=t),i&&(o[qo]=i),s&&(o[Ri]=s),r&&(o[Go]=r),Qo(e,jo,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Oe.set("previous_websocket_failure",!0);try{let i;_c(),this.mySock=new bn(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Q.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&bn!==null&&!Q.forceDisallow_}static previouslyFailed(){return Oe.isInMemoryStorage||Oe.get("previous_websocket_failure")===!0}markConnectionHealthy(){Oe.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=Mt(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(p(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=D(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Uo(t,vu);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(wu))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Q.responsesRequiredToBeHealthy=2;Q.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{static get ALL_TRANSPORTS(){return[Ye,Q]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Q&&Q.isAvailable();let i=t&&!Q.previouslyFailed();if(e.webSocketOnly&&(t||V("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[Q];else{const s=this.transports_=[];for(const r of Lt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Lt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Lt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bu=6e4,Eu=5e3,Iu=10*1024,Cu=100*1024,mi="t",dr="d",Tu="s",ur="r",Su="e",hr="o",fr="a",pr="n",mr="p",ku="h";class xu{constructor(e,t,i,s,r,o,a,l,c,d){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=d,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Qt("c:"+this.id+":"),this.transportManager_=new Lt(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=xt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Cu?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Iu?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(mi in e){const t=e[mi];t===fr?this.upgradeIfSecondaryHealthy_():t===ur?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===hr&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=bt("t",e),i=bt("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:mr,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:fr,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:pr,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=bt("t",e),i=bt("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=bt(mi,e);if(dr in e){const i=e[dr];if(t===ku){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===pr){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===Tu?this.onConnectionShutdown_(i):t===ur?this.onReset_(i):t===Su?Ai("Server Error: "+i):t===hr?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Ai("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),ss!==i&&V("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),xt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(bu))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):xt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Eu))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:mr,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Oe.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ia{constructor(e){this.allowedEvents_=e,this.listeners_={},p(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){p(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En extends ia{static getInstance(){return new En}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Zi()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return p(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gr=32,_r=768;class S{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function C(){return new S("")}function b(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Se(n){return n.pieces_.length-n.pieceNum_}function x(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new S(n.pieces_,e)}function as(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function Au(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Ft(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function sa(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new S(e,0)}function N(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof S)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new S(t,0)}function E(n){return n.pieceNum_>=n.pieces_.length}function H(n,e){const t=b(n),i=b(e);if(t===null)return e;if(t===i)return H(x(n),x(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function Ru(n,e){const t=Ft(n,0),i=Ft(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=Ve(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function ls(n,e){if(Se(n)!==Se(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function j(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(Se(n)>Se(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class Nu{constructor(e,t){this.errorPrefix_=t,this.parts_=Ft(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Hn(this.parts_[i]);ra(this)}}function Pu(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Hn(e),ra(n)}function Ou(n){const e=n.parts_.pop();n.byteLength_-=Hn(e),n.parts_.length>0&&(n.byteLength_-=1)}function ra(n){if(n.byteLength_>_r)throw new Error(n.errorPrefix_+"has a key path longer than "+_r+" bytes ("+n.byteLength_+").");if(n.parts_.length>gr)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+gr+") or object contains a cycle "+Pe(n))}function Pe(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs extends ia{static getInstance(){return new cs}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return p(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Et=1e3,Mu=60*5*1e3,yr=30*1e3,Du=1.3,Lu=3e4,Fu="server_kill",vr=3;class ce extends na{constructor(e,t,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=ce.nextPersistentConnectionId_++,this.log_=Qt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Et,this.maxReconnectDelay_=Mu,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");cs.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&En.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(D(r)),p(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new re,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),p(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;ce.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&se(e,"w")){const i=at(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();V(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Cc(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=yr)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Ic(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),p(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+D(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Ai("Unrecognized action received from server: "+D(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){p(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Et,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Et,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Lu&&(this.reconnectDelay_=Et),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Du)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+ce.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(u){p(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(u)};this.realtime_={close:l,sendRequest:c};const d=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,h]=await Promise.all([this.authTokenProvider_.getToken(d),this.appCheckTokenProvider_.getToken(d)]);o?F("getToken() completed but was canceled"):(F("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=h&&h.token,a=new xu(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,f=>{V(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(Fu)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&V(u),l())}}}interrupt(e){F("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){F("Resuming connection for reason: "+e),delete this.interruptReasons_[e],yn(this.interruptReasons_)&&(this.reconnectDelay_=Et,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>is(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new S(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){F("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=vr&&(this.reconnectDelay_=yr,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){F("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=vr&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Do.replace(/\./g,"-")]=1,Zi()?e["framework.cordova"]=1:So()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=En.getInstance().currentlyOnline();return yn(this.interruptReasons_)&&e}}ce.nextPersistentConnectionId_=0;ce.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new I(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new I(dt,e),s=new I(dt,t);return this.compare(i,s)!==0}minPost(){return I.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sn;class oa extends Vn{static get __EMPTY_NODE(){return sn}static set __EMPTY_NODE(e){sn=e}compare(e,t){return Ve(e.name,t.name)}isDefinedOn(e){throw pt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return I.MIN}maxPost(){return new I(We,sn)}makePost(e,t){return p(typeof e=="string","KeyIndex indexValue must always be a string."),new I(e,sn)}toString(){return".key"}}const tt=new oa;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class M{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??M.RED,this.left=s??z.EMPTY_NODE,this.right=r??z.EMPTY_NODE}copy(e,t,i,s,r){return new M(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return z.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return z.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,M.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,M.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}M.RED=!0;M.BLACK=!1;class Uu{copy(e,t,i,s,r){return this}insert(e,t,i){return new M(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class z{constructor(e,t=z.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new z(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,M.BLACK,null,null))}remove(e){return new z(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,M.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new rn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new rn(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new rn(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new rn(this.root_,null,this.comparator_,!0,e)}}z.EMPTY_NODE=new Uu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wu(n,e){return Ve(n.name,e.name)}function ds(n,e){return Ve(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ni;function Bu(n){Ni=n}const aa=function(n){return typeof n=="number"?"number:"+Wo(n):"string:"+n},la=function(n){if(n.isLeafNode()){const e=n.val();p(typeof e=="string"||typeof e=="number"||typeof e=="object"&&se(e,".sv"),"Priority must be a string or number.")}else p(n===Ni||n.isEmpty(),"priority of unexpected type.");p(n===Ni||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let wr;class O{static set __childrenNodeConstructor(e){wr=e}static get __childrenNodeConstructor(){return wr}constructor(e,t=O.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,p(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),la(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new O(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:O.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return E(e)?this:b(e)===".priority"?this.priorityNode_:O.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:O.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=b(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(p(i!==".priority"||Se(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,O.__childrenNodeConstructor.EMPTY_NODE.updateChild(x(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+aa(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Wo(this.value_):e+=this.value_,this.lazyHash_=Fo(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===O.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof O.__childrenNodeConstructor?-1:(p(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=O.VALUE_TYPE_ORDER.indexOf(t),r=O.VALUE_TYPE_ORDER.indexOf(i);return p(s>=0,"Unknown leaf type: "+t),p(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}O.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ca,da;function $u(n){ca=n}function Hu(n){da=n}class zu extends Vn{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?Ve(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return I.MIN}maxPost(){return new I(We,new O("[PRIORITY-POST]",da))}makePost(e,t){const i=ca(e);return new I(t,new O("[PRIORITY-POST]",i))}toString(){return".priority"}}const R=new zu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vu=Math.log(2);class qu{constructor(e){const t=r=>parseInt(Math.log(r)/Vu,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const In=function(n,e,t,i){n.sort(e);const s=function(l,c){const d=c-l;let u,h;if(d===0)return null;if(d===1)return u=n[l],h=t?t(u):u,new M(h,u.node,M.BLACK,null,null);{const f=parseInt(d/2,10)+l,m=s(l,f),g=s(f+1,c);return u=n[f],h=t?t(u):u,new M(h,u.node,M.BLACK,m,g)}},r=function(l){let c=null,d=null,u=n.length;const h=function(m,g){const T=u-m,L=u;u-=m;const K=s(T+1,L),ri=n[T],xl=t?t(ri):ri;f(new M(xl,ri.node,g,null,K))},f=function(m){c?(c.left=m,c=m):(d=m,c=m)};for(let m=0;m<l.count;++m){const g=l.nextBitIsOne(),T=Math.pow(2,l.count-(m+1));g?h(T,M.BLACK):(h(T,M.BLACK),h(T,M.RED))}return d},o=new qu(n.length),a=r(o);return new z(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gi;const je={};class oe{static get Default(){return p(je&&R,"ChildrenNode.ts has not been loaded"),gi=gi||new oe({".priority":je},{".priority":R}),gi}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=at(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof z?t:null}hasIndex(e){return se(this.indexSet_,e.toString())}addIndex(e,t){p(e!==tt,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(I.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=In(i,e.getCompare()):a=je;const l=e.toString(),c={...this.indexSet_};c[l]=e;const d={...this.indexes_};return d[l]=a,new oe(d,c)}addToIndexes(e,t){const i=vn(this.indexes_,(s,r)=>{const o=at(this.indexSet_,r);if(p(o,"Missing index implementation for "+r),s===je)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(I.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),In(a,o.getCompare())}else return je;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new I(e.name,a))),l.insert(e,e.node)}});return new oe(i,this.indexSet_)}removeFromIndexes(e,t){const i=vn(this.indexes_,s=>{if(s===je)return s;{const r=t.get(e.name);return r?s.remove(new I(e.name,r)):s}});return new oe(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let It;class _{static get EMPTY_NODE(){return It||(It=new _(new z(ds),null,oe.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&la(this.priorityNode_),this.children_.isEmpty()&&p(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||It}updatePriority(e){return this.children_.isEmpty()?this:new _(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?It:t}}getChild(e){const t=b(e);return t===null?this:this.getImmediateChild(t).getChild(x(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(p(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new I(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?It:this.priorityNode_;return new _(s,o,r)}}updateChild(e,t){const i=b(e);if(i===null)return t;{p(b(e)!==".priority"||Se(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(x(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(R,(o,a)=>{t[o]=a.val(e),i++,r&&_.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+aa(this.getPriority().val())+":"),this.forEachChild(R,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":Fo(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new I(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new I(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new I(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,I.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,I.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Jt?-1:0}withIndex(e){if(e===tt||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new _(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===tt||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(R),s=t.getIterator(R);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===tt?null:this.indexMap_.get(e.toString())}}_.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Gu extends _{constructor(){super(new z(ds),_.EMPTY_NODE,oe.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return _.EMPTY_NODE}isEmpty(){return!1}}const Jt=new Gu;Object.defineProperties(I,{MIN:{value:new I(dt,_.EMPTY_NODE)},MAX:{value:new I(We,Jt)}});oa.__EMPTY_NODE=_.EMPTY_NODE;O.__childrenNodeConstructor=_;Bu(Jt);Hu(Jt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ju=!0;function P(n,e=null){if(n===null)return _.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),p(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new O(t,P(e))}if(!(n instanceof Array)&&ju){const t=[];let i=!1;if(W(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=P(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new I(o,l)))}}),t.length===0)return _.EMPTY_NODE;const r=In(t,Wu,o=>o.name,ds);if(i){const o=In(t,R.getCompare());return new _(r,P(e),new oe({".priority":o},{".priority":R}))}else return new _(r,P(e),oe.Default)}else{let t=_.EMPTY_NODE;return W(n,(i,s)=>{if(se(n,i)&&i.substring(0,1)!=="."){const r=P(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(P(e))}}$u(P);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ku extends Vn{constructor(e){super(),this.indexPath_=e,p(!E(e)&&b(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?Ve(e.name,t.name):r}makePost(e,t){const i=P(e),s=_.EMPTY_NODE.updateChild(this.indexPath_,i);return new I(t,s)}maxPost(){const e=_.EMPTY_NODE.updateChild(this.indexPath_,Jt);return new I(We,e)}toString(){return Ft(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yu extends Vn{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Ve(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return I.MIN}maxPost(){return I.MAX}makePost(e,t){const i=P(e);return new I(t,i)}toString(){return".value"}}const Qu=new Yu;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ua(n){return{type:"value",snapshotNode:n}}function ut(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Ut(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Wt(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Ju(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){p(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(Ut(t,a)):p(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(ut(t,i)):o.trackChildChange(Wt(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(R,(s,r)=>{t.hasChild(s)||i.trackChildChange(Ut(s,r))}),t.isLeafNode()||t.forEachChild(R,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(Wt(s,r,o))}else i.trackChildChange(ut(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?_.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt{constructor(e){this.indexedFilter_=new us(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Bt.getStartPost_(e),this.endPost_=Bt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new I(t,i))||(i=_.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=_.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(_.EMPTY_NODE);const r=this;return t.forEachChild(R,(o,a)=>{r.matches(new I(o,a))||(s=s.updateImmediateChild(o,_.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xu{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new Bt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new I(t,i))||(i=_.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=_.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=_.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(_.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,_.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(h,f)=>u(f,h)}else o=this.index_.getCompare();const a=e;p(a.numChildren()===this.limit_,"");const l=new I(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),d=this.rangedFilter_.matches(l);if(a.hasChild(t)){const u=a.getImmediateChild(t);let h=s.getChildAfterChild(this.index_,c,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,l);if(d&&!i.isEmpty()&&f>=0)return r!=null&&r.trackChildChange(Wt(t,i,u)),a.updateImmediateChild(t,i);{r!=null&&r.trackChildChange(Ut(t,u));const g=a.updateImmediateChild(t,_.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r!=null&&r.trackChildChange(ut(h.name,h.node)),g.updateImmediateChild(h.name,h.node)):g}}else return i.isEmpty()?e:d&&o(c,l)>=0?(r!=null&&(r.trackChildChange(Ut(c.name,c.node)),r.trackChildChange(ut(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,_.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=R}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return p(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return p(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:dt}hasEnd(){return this.endSet_}getIndexEndValue(){return p(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return p(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:We}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return p(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===R}copy(){const e=new hs;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Zu(n){return n.loadsAllData()?new us(n.getIndex()):n.hasLimit()?new Xu(n):new Bt(n)}function eh(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="r",t}function br(n){const e={};if(n.isDefault())return e;let t;if(n.index_===R?t="$priority":n.index_===Qu?t="$value":n.index_===tt?t="$key":(p(n.index_ instanceof Ku,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=D(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=D(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+D(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=D(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+D(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Er(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==R&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn extends na{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(p(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Qt("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Cn.getListenId_(e,i),a={};this.listens_[o]=a;const l=br(e._queryParams);this.restRequest_(r+".json",l,(c,d)=>{let u=d;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,i),at(this.listens_,o)===a){let h;c?c===401?h="permission_denied":h="rest_error:"+c:h="ok",s(h,null)}})}unlisten(e,t){const i=Cn.getListenId_(e,t);delete this.listens_[i]}get(e){const t=br(e._queryParams),i=e._path.toString(),s=new re;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+mt(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=Mt(a.responseText)}catch{V("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&V("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class th{constructor(){this.rootNode_=_.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tn(){return{value:null,children:new Map}}function yt(n,e,t){if(E(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=b(e);n.children.has(i)||n.children.set(i,Tn());const s=n.children.get(i);e=x(e),yt(s,e,t)}}function Pi(n,e){if(E(e))return n.value=null,n.children.clear(),!0;if(n.value!==null){if(n.value.isLeafNode())return!1;{const t=n.value;return n.value=null,t.forEachChild(R,(i,s)=>{yt(n,new S(i),s)}),Pi(n,e)}}else if(n.children.size>0){const t=b(e);return e=x(e),n.children.has(t)&&Pi(n.children.get(t),e)&&n.children.delete(t),n.children.size===0}else return!0}function Oi(n,e,t){n.value!==null?t(e,n.value):nh(n,(i,s)=>{const r=new S(e.toString()+"/"+i);Oi(s,r,t)})}function nh(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ih{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&W(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ir=10*1e3,sh=30*1e3,rh=5*60*1e3;class oh{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new ih(e);const i=Ir+(sh-Ir)*Math.random();xt(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;W(e,(s,r)=>{r>0&&se(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),xt(this.reportStats_.bind(this),Math.floor(Math.random()*2*rh))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var X;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(X||(X={}));function ha(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function fs(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function ps(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=X.ACK_USER_WRITE,this.source=ha()}operationForChild(e){if(E(this.path)){if(this.affectedTree.value!=null)return p(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new S(e));return new Sn(C(),t,this.revert)}}else return p(b(this.path)===e,"operationForChild called for unrelated child."),new Sn(x(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e,t){this.source=e,this.path=t,this.type=X.LISTEN_COMPLETE}operationForChild(e){return E(this.path)?new $t(this.source,C()):new $t(this.source,x(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=X.OVERWRITE}operationForChild(e){return E(this.path)?new Be(this.source,C(),this.snap.getImmediateChild(e)):new Be(this.source,x(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=X.MERGE}operationForChild(e){if(E(this.path)){const t=this.children.subtree(new S(e));return t.isEmpty()?null:t.value?new Be(this.source,C(),t.value):new Ht(this.source,C(),t)}else return p(b(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ht(this.source,x(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(E(e))return this.isFullyInitialized()&&!this.filtered_;const t=b(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function lh(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Ju(o.childName,o.snapshotNode))}),Ct(n,s,"child_removed",e,i,t),Ct(n,s,"child_added",e,i,t),Ct(n,s,"child_moved",r,i,t),Ct(n,s,"child_changed",e,i,t),Ct(n,s,"value",e,i,t),s}function Ct(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,l)=>dh(n,a,l)),o.forEach(a=>{const l=ch(n,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function ch(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function dh(n,e,t){if(e.childName==null||t.childName==null)throw pt("Should only compare child_ events.");const i=new I(e.childName,e.snapshotNode),s=new I(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qn(n,e){return{eventCache:n,serverCache:e}}function At(n,e,t,i){return qn(new $e(e,t,i),n.serverCache)}function fa(n,e,t,i){return qn(n.eventCache,new $e(e,t,i))}function Mi(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function He(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _i;const uh=()=>(_i||(_i=new z(Kd)),_i);class A{static fromObject(e){let t=new A(null);return W(e,(i,s)=>{t=t.set(new S(i),s)}),t}constructor(e,t=uh()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:C(),value:this.value};if(E(e))return null;{const i=b(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(x(e),t);return r!=null?{path:N(new S(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(E(e))return this;{const t=b(e),i=this.children.get(t);return i!==null?i.subtree(x(e)):new A(null)}}set(e,t){if(E(e))return new A(t,this.children);{const i=b(e),r=(this.children.get(i)||new A(null)).set(x(e),t),o=this.children.insert(i,r);return new A(this.value,o)}}remove(e){if(E(e))return this.children.isEmpty()?new A(null):new A(null,this.children);{const t=b(e),i=this.children.get(t);if(i){const s=i.remove(x(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new A(null):new A(this.value,r)}else return this}}get(e){if(E(e))return this.value;{const t=b(e),i=this.children.get(t);return i?i.get(x(e)):null}}setTree(e,t){if(E(e))return t;{const i=b(e),r=(this.children.get(i)||new A(null)).setTree(x(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new A(this.value,o)}}fold(e){return this.fold_(C(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(N(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,C(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(E(e))return null;{const r=b(e),o=this.children.get(r);return o?o.findOnPath_(x(e),N(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,C(),t)}foreachOnPath_(e,t,i){if(E(e))return this;{this.value&&i(t,this.value);const s=b(e),r=this.children.get(s);return r?r.foreachOnPath_(x(e),N(t,s),i):new A(null)}}foreach(e){this.foreach_(C(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(N(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{constructor(e){this.writeTree_=e}static empty(){return new ee(new A(null))}}function Rt(n,e,t){if(E(e))return new ee(new A(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=H(s,e);return r=r.updateChild(o,t),new ee(n.writeTree_.set(s,r))}else{const s=new A(t),r=n.writeTree_.setTree(e,s);return new ee(r)}}}function Cr(n,e,t){let i=n;return W(t,(s,r)=>{i=Rt(i,N(e,s),r)}),i}function Tr(n,e){if(E(e))return ee.empty();{const t=n.writeTree_.setTree(e,new A(null));return new ee(t)}}function Di(n,e){return qe(n,e)!=null}function qe(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(H(t.path,e)):null}function Sr(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(R,(i,s)=>{e.push(new I(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new I(i,s.value))}),e}function Ie(n,e){if(E(e))return n;{const t=qe(n,e);return t!=null?new ee(new A(t)):new ee(n.writeTree_.subtree(e))}}function Li(n){return n.writeTree_.isEmpty()}function ht(n,e){return pa(C(),n.writeTree_,e)}function pa(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(p(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=pa(N(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(N(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ms(n,e){return ya(e,n)}function hh(n,e,t,i,s){p(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=Rt(n.visibleWrites,e,t)),n.lastWriteId=i}function fh(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function ph(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);p(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&mh(a,i.path)?s=!1:j(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return gh(n),!0;if(i.snap)n.visibleWrites=Tr(n.visibleWrites,i.path);else{const a=i.children;W(a,l=>{n.visibleWrites=Tr(n.visibleWrites,N(i.path,l))})}return!0}else return!1}function mh(n,e){if(n.snap)return j(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&j(N(n.path,t),e))return!0;return!1}function gh(n){n.visibleWrites=ma(n.allWrites,_h,C()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function _h(n){return n.visible}function ma(n,e,t){let i=ee.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)j(t,o)?(a=H(t,o),i=Rt(i,a,r.snap)):j(o,t)&&(a=H(o,t),i=Rt(i,C(),r.snap.getChild(a)));else if(r.children){if(j(t,o))a=H(t,o),i=Cr(i,a,r.children);else if(j(o,t))if(a=H(o,t),E(a))i=Cr(i,C(),r.children);else{const l=at(r.children,b(a));if(l){const c=l.getChild(x(a));i=Rt(i,C(),c)}}}else throw pt("WriteRecord should have .snap or .children")}}return i}function ga(n,e,t,i,s){if(!i&&!s){const r=qe(n.visibleWrites,e);if(r!=null)return r;{const o=Ie(n.visibleWrites,e);if(Li(o))return t;if(t==null&&!Di(o,C()))return null;{const a=t||_.EMPTY_NODE;return ht(o,a)}}}else{const r=Ie(n.visibleWrites,e);if(!s&&Li(r))return t;if(!s&&t==null&&!Di(r,C()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(j(c.path,e)||j(e,c.path))},a=ma(n.allWrites,o,e),l=t||_.EMPTY_NODE;return ht(a,l)}}}function yh(n,e,t){let i=_.EMPTY_NODE;const s=qe(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(R,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=Ie(n.visibleWrites,e);return t.forEachChild(R,(o,a)=>{const l=ht(Ie(r,new S(o)),a);i=i.updateImmediateChild(o,l)}),Sr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Ie(n.visibleWrites,e);return Sr(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function vh(n,e,t,i,s){p(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=N(e,t);if(Di(n.visibleWrites,r))return null;{const o=Ie(n.visibleWrites,r);return Li(o)?s.getChild(t):ht(o,s.getChild(t))}}function wh(n,e,t,i){const s=N(e,t),r=qe(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=Ie(n.visibleWrites,s);return ht(o,i.getNode().getImmediateChild(t))}else return null}function bh(n,e){return qe(n.visibleWrites,e)}function Eh(n,e,t,i,s,r,o){let a;const l=Ie(n.visibleWrites,e),c=qe(l,C());if(c!=null)a=c;else if(t!=null)a=ht(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const d=[],u=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=h.getNext();for(;f&&d.length<s;)u(f,i)!==0&&d.push(f),f=h.getNext();return d}else return[]}function Ih(){return{visibleWrites:ee.empty(),allWrites:[],lastWriteId:-1}}function kn(n,e,t,i){return ga(n.writeTree,n.treePath,e,t,i)}function gs(n,e){return yh(n.writeTree,n.treePath,e)}function kr(n,e,t,i){return vh(n.writeTree,n.treePath,e,t,i)}function xn(n,e){return bh(n.writeTree,N(n.treePath,e))}function Ch(n,e,t,i,s,r){return Eh(n.writeTree,n.treePath,e,t,i,s,r)}function _s(n,e,t){return wh(n.writeTree,n.treePath,e,t)}function _a(n,e){return ya(N(n.treePath,e),n.writeTree)}function ya(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;p(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),p(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,Wt(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,Ut(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,ut(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,Wt(i,e.snapshotNode,s.oldSnap));else throw pt("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sh{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const va=new Sh;class ys{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new $e(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return _s(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:He(this.viewCache_),r=Ch(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kh(n){return{filter:n}}function xh(n,e){p(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),p(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Ah(n,e,t,i,s){const r=new Th;let o,a;if(t.type===X.OVERWRITE){const c=t;c.source.fromUser?o=Fi(n,e,c.path,c.snap,i,s,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!E(c.path),o=An(n,e,c.path,c.snap,i,s,a,r))}else if(t.type===X.MERGE){const c=t;c.source.fromUser?o=Nh(n,e,c.path,c.children,i,s,r):(p(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Ui(n,e,c.path,c.children,i,s,a,r))}else if(t.type===X.ACK_USER_WRITE){const c=t;c.revert?o=Mh(n,e,c.path,i,s,r):o=Ph(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===X.LISTEN_COMPLETE)o=Oh(n,e,t.path,i,r);else throw pt("Unknown operation type: "+t.type);const l=r.getChanges();return Rh(e,o,l),{viewCache:o,changes:l}}function Rh(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Mi(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(ua(Mi(e)))}}function wa(n,e,t,i,s,r){const o=e.eventCache;if(xn(i,t)!=null)return e;{let a,l;if(E(t))if(p(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=He(e),d=c instanceof _?c:_.EMPTY_NODE,u=gs(i,d);a=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=kn(i,He(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=b(t);if(c===".priority"){p(Se(t)===1,"Can't have a priority with additional path components");const d=o.getNode();l=e.serverCache.getNode();const u=kr(i,t,d,l);u!=null?a=n.filter.updatePriority(d,u):a=o.getNode()}else{const d=x(t);let u;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const h=kr(i,t,o.getNode(),l);h!=null?u=o.getNode().getImmediateChild(c).updateChild(d,h):u=o.getNode().getImmediateChild(c)}else u=_s(i,c,e.serverCache);u!=null?a=n.filter.updateChild(o.getNode(),c,u,d,s,r):a=o.getNode()}}return At(e,a,o.isFullyInitialized()||E(t),n.filter.filtersNodes())}}function An(n,e,t,i,s,r,o,a){const l=e.serverCache;let c;const d=o?n.filter:n.filter.getIndexedFilter();if(E(t))c=d.updateFullNode(l.getNode(),i,null);else if(d.filtersNodes()&&!l.isFiltered()){const f=l.getNode().updateChild(t,i);c=d.updateFullNode(l.getNode(),f,null)}else{const f=b(t);if(!l.isCompleteForPath(t)&&Se(t)>1)return e;const m=x(t),T=l.getNode().getImmediateChild(f).updateChild(m,i);f===".priority"?c=d.updatePriority(l.getNode(),T):c=d.updateChild(l.getNode(),f,T,m,va,null)}const u=fa(e,c,l.isFullyInitialized()||E(t),d.filtersNodes()),h=new ys(s,u,r);return wa(n,u,t,s,h,a)}function Fi(n,e,t,i,s,r,o){const a=e.eventCache;let l,c;const d=new ys(s,e,r);if(E(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),l=At(e,c,!0,n.filter.filtersNodes());else{const u=b(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=At(e,c,a.isFullyInitialized(),a.isFiltered());else{const h=x(t),f=a.getNode().getImmediateChild(u);let m;if(E(h))m=i;else{const g=d.getCompleteChild(u);g!=null?as(h)===".priority"&&g.getChild(sa(h)).isEmpty()?m=g:m=g.updateChild(h,i):m=_.EMPTY_NODE}if(f.equals(m))l=e;else{const g=n.filter.updateChild(a.getNode(),u,m,h,d,o);l=At(e,g,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function xr(n,e){return n.eventCache.isCompleteForChild(e)}function Nh(n,e,t,i,s,r,o){let a=e;return i.foreach((l,c)=>{const d=N(t,l);xr(e,b(d))&&(a=Fi(n,a,d,c,s,r,o))}),i.foreach((l,c)=>{const d=N(t,l);xr(e,b(d))||(a=Fi(n,a,d,c,s,r,o))}),a}function Ar(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Ui(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;E(t)?c=i:c=new A(null).setTree(t,i);const d=e.serverCache.getNode();return c.children.inorderTraversal((u,h)=>{if(d.hasChild(u)){const f=e.serverCache.getNode().getImmediateChild(u),m=Ar(n,f,h);l=An(n,l,new S(u),m,s,r,o,a)}}),c.children.inorderTraversal((u,h)=>{const f=!e.serverCache.isCompleteForChild(u)&&h.value===null;if(!d.hasChild(u)&&!f){const m=e.serverCache.getNode().getImmediateChild(u),g=Ar(n,m,h);l=An(n,l,new S(u),g,s,r,o,a)}}),l}function Ph(n,e,t,i,s,r,o){if(xn(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(E(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return An(n,e,t,l.getNode().getChild(t),s,r,a,o);if(E(t)){let c=new A(null);return l.getNode().forEachChild(tt,(d,u)=>{c=c.set(new S(d),u)}),Ui(n,e,t,c,s,r,a,o)}else return e}else{let c=new A(null);return i.foreach((d,u)=>{const h=N(t,d);l.isCompleteForPath(h)&&(c=c.set(d,l.getNode().getChild(h)))}),Ui(n,e,t,c,s,r,a,o)}}function Oh(n,e,t,i,s){const r=e.serverCache,o=fa(e,r.getNode(),r.isFullyInitialized()||E(t),r.isFiltered());return wa(n,o,t,i,va,s)}function Mh(n,e,t,i,s,r){let o;if(xn(i,t)!=null)return e;{const a=new ys(i,e,s),l=e.eventCache.getNode();let c;if(E(t)||b(t)===".priority"){let d;if(e.serverCache.isFullyInitialized())d=kn(i,He(e));else{const u=e.serverCache.getNode();p(u instanceof _,"serverChildren would be complete if leaf node"),d=gs(i,u)}d=d,c=n.filter.updateFullNode(l,d,r)}else{const d=b(t);let u=_s(i,d,e.serverCache);u==null&&e.serverCache.isCompleteForChild(d)&&(u=l.getImmediateChild(d)),u!=null?c=n.filter.updateChild(l,d,u,x(t),a,r):e.eventCache.getNode().hasChild(d)?c=n.filter.updateChild(l,d,_.EMPTY_NODE,x(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=kn(i,He(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||xn(i,C())!=null,At(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new us(i.getIndex()),r=Zu(i);this.processor_=kh(r);const o=t.serverCache,a=t.eventCache,l=s.updateFullNode(_.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(_.EMPTY_NODE,a.getNode(),null),d=new $e(l,o.isFullyInitialized(),s.filtersNodes()),u=new $e(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=qn(u,d),this.eventGenerator_=new ah(this.query_)}get query(){return this.query_}}function Lh(n){return n.viewCache_.serverCache.getNode()}function Fh(n,e){const t=He(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!E(e)&&!t.getImmediateChild(b(e)).isEmpty())?t.getChild(e):null}function Rr(n){return n.eventRegistrations_.length===0}function Uh(n,e){n.eventRegistrations_.push(e)}function Nr(n,e,t){const i=[];if(t){p(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Pr(n,e,t,i){e.type===X.MERGE&&e.source.queryId!==null&&(p(He(n.viewCache_),"We should always have a full cache before handling merges"),p(Mi(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=Ah(n.processor_,s,e,t,i);return xh(n.processor_,r.viewCache),p(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,ba(n,r.changes,r.viewCache.eventCache.getNode(),null)}function Wh(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(R,(r,o)=>{i.push(ut(r,o))}),t.isFullyInitialized()&&i.push(ua(t.getNode())),ba(n,i,t.getNode(),e)}function ba(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return lh(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rn;class Bh{constructor(){this.views=new Map}}function $h(n){p(!Rn,"__referenceConstructor has already been defined"),Rn=n}function Hh(){return p(Rn,"Reference.ts has not been loaded"),Rn}function zh(n){return n.views.size===0}function vs(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return p(r!=null,"SyncTree gave us an op for an invalid query."),Pr(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(Pr(o,e,t,i));return r}}function Vh(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=kn(t,s?i:null),l=!1;a?l=!0:i instanceof _?(a=gs(t,i),l=!1):(a=_.EMPTY_NODE,l=!1);const c=qn(new $e(a,l,!1),new $e(i,s,!1));return new Dh(e,c)}return o}function qh(n,e,t,i,s,r){const o=Vh(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),Uh(o,t),Wh(o,t)}function Gh(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=ke(n);if(s==="default")for(const[l,c]of n.views.entries())o=o.concat(Nr(c,t,i)),Rr(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(s);l&&(o=o.concat(Nr(l,t,i)),Rr(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!ke(n)&&r.push(new(Hh())(e._repo,e._path)),{removed:r,events:o}}function Ea(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function nt(n,e){let t=null;for(const i of n.views.values())t=t||Fh(i,e);return t}function Ia(n,e){if(e._queryParams.loadsAllData())return Gn(n);{const i=e._queryIdentifier;return n.views.get(i)}}function Ca(n,e){return Ia(n,e)!=null}function ke(n){return Gn(n)!=null}function Gn(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Nn;function jh(n){p(!Nn,"__referenceConstructor has already been defined"),Nn=n}function Kh(){return p(Nn,"Reference.ts has not been loaded"),Nn}let Yh=1;class Or{constructor(e){this.listenProvider_=e,this.syncPointTree_=new A(null),this.pendingWriteTree_=Ih(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Ta(n,e,t,i,s){return hh(n.pendingWriteTree_,e,t,i,s),s?Xt(n,new Be(ha(),e,t)):[]}function Me(n,e,t=!1){const i=fh(n.pendingWriteTree_,e);if(ph(n.pendingWriteTree_,e)){let r=new A(null);return i.snap!=null?r=r.set(C(),!0):W(i.children,o=>{r=r.set(new S(o),!0)}),Xt(n,new Sn(i.path,r,t))}else return[]}function jn(n,e,t){return Xt(n,new Be(fs(),e,t))}function Qh(n,e,t){const i=A.fromObject(t);return Xt(n,new Ht(fs(),e,i))}function Jh(n,e){return Xt(n,new $t(fs(),e))}function Xh(n,e,t){const i=bs(n,t);if(i){const s=Es(i),r=s.path,o=s.queryId,a=H(r,e),l=new $t(ps(o),a);return Is(n,r,l)}else return[]}function Wi(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Ca(o,e))){const l=Gh(o,e,t,i);zh(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const d=c.findIndex(h=>h._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(h,f)=>ke(f));if(d&&!u){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const f=tf(h);for(let m=0;m<f.length;++m){const g=f[m],T=g.query,L=xa(n,g);n.listenProvider_.startListening(Nt(T),Pn(n,T),L.hashFn,L.onComplete)}}}!u&&c.length>0&&!i&&(d?n.listenProvider_.stopListening(Nt(e),null):c.forEach(h=>{const f=n.queryToTagMap.get(Kn(h));n.listenProvider_.stopListening(Nt(h),f)}))}nf(n,c)}return a}function Zh(n,e,t,i){const s=bs(n,i);if(s!=null){const r=Es(s),o=r.path,a=r.queryId,l=H(o,e),c=new Be(ps(a),l,t);return Is(n,o,c)}else return[]}function ef(n,e,t,i){const s=bs(n,i);if(s){const r=Es(s),o=r.path,a=r.queryId,l=H(o,e),c=A.fromObject(t),d=new Ht(ps(a),l,c);return Is(n,o,d)}else return[]}function Mr(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(h,f)=>{const m=H(h,s);r=r||nt(f,m),o=o||ke(f)});let a=n.syncPointTree_.get(s);a?(o=o||ke(a),r=r||nt(a,C())):(a=new Bh,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=_.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((f,m)=>{const g=nt(m,C());g&&(r=r.updateImmediateChild(f,g))}));const c=Ca(a,e);if(!c&&!e._queryParams.loadsAllData()){const h=Kn(e);p(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=sf();n.queryToTagMap.set(h,f),n.tagToQueryMap.set(f,h)}const d=ms(n.pendingWriteTree_,s);let u=qh(a,e,t,d,r,l);if(!c&&!o&&!i){const h=Ia(a,e);u=u.concat(rf(n,e,h))}return u}function ws(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=H(o,e),c=nt(a,l);if(c)return c});return ga(s,e,r,t,!0)}function Xt(n,e){return Sa(e,n.syncPointTree_,null,ms(n.pendingWriteTree_,C()))}function Sa(n,e,t,i){if(E(n.path))return ka(n,e,t,i);{const s=e.get(C());t==null&&s!=null&&(t=nt(s,C()));let r=[];const o=b(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,d=_a(i,o);r=r.concat(Sa(a,l,c,d))}return s&&(r=r.concat(vs(s,n,i,t))),r}}function ka(n,e,t,i){const s=e.get(C());t==null&&s!=null&&(t=nt(s,C()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=_a(i,o),d=n.operationForChild(o);d&&(r=r.concat(ka(d,a,l,c)))}),s&&(r=r.concat(vs(s,n,i,t))),r}function xa(n,e){const t=e.query,i=Pn(n,t);return{hashFn:()=>(Lh(e)||_.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Xh(n,t._path,i):Jh(n,t._path);{const r=Jd(s,t);return Wi(n,t,null,r)}}}}function Pn(n,e){const t=Kn(e);return n.queryToTagMap.get(t)}function Kn(n){return n._path.toString()+"$"+n._queryIdentifier}function bs(n,e){return n.tagToQueryMap.get(e)}function Es(n){const e=n.indexOf("$");return p(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new S(n.substr(0,e))}}function Is(n,e,t){const i=n.syncPointTree_.get(e);p(i,"Missing sync point for query tag that we're tracking");const s=ms(n.pendingWriteTree_,e);return vs(i,t,s,null)}function tf(n){return n.fold((e,t,i)=>{if(t&&ke(t))return[Gn(t)];{let s=[];return t&&(s=Ea(t)),W(i,(r,o)=>{s=s.concat(o)}),s}})}function Nt(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Kh())(n._repo,n._path):n}function nf(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=Kn(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function sf(){return Yh++}function rf(n,e,t){const i=e._path,s=Pn(n,e),r=xa(n,t),o=n.listenProvider_.startListening(Nt(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)p(!ke(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,d,u)=>{if(!E(c)&&d&&ke(d))return[Gn(d).query];{let h=[];return d&&(h=h.concat(Ea(d).map(f=>f.query))),W(u,(f,m)=>{h=h.concat(m)}),h}});for(let c=0;c<l.length;++c){const d=l[c];n.listenProvider_.stopListening(Nt(d),Pn(n,d))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Cs(t)}node(){return this.node_}}class Ts{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=N(this.path_,e);return new Ts(this.syncTree_,t)}node(){return ws(this.syncTree_,this.path_)}}const of=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Dr=function(n,e,t){if(!n||typeof n!="object")return n;if(p(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return af(n[".sv"],e,t);if(typeof n[".sv"]=="object")return lf(n[".sv"],e);p(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},af=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:p(!1,"Unexpected server value: "+n)}},lf=function(n,e,t){n.hasOwnProperty("increment")||p(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&p(!1,"Unexpected increment value: "+i);const s=e.node();if(p(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},cf=function(n,e,t,i){return Ss(e,new Ts(t,n),i)},Aa=function(n,e,t){return Ss(n,new Cs(e),t)};function Ss(n,e,t){const i=n.getPriority().val(),s=Dr(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Dr(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new O(a,P(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new O(s))),o.forEachChild(R,(a,l)=>{const c=Ss(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function xs(n,e){let t=e instanceof S?e:new S(e),i=n,s=b(t);for(;s!==null;){const r=at(i.node.children,s)||{children:{},childCount:0};i=new ks(s,i,r),t=x(t),s=b(t)}return i}function vt(n){return n.node.value}function Ra(n,e){n.node.value=e,Bi(n)}function Na(n){return n.node.childCount>0}function df(n){return vt(n)===void 0&&!Na(n)}function Yn(n,e){W(n.node.children,(t,i)=>{e(new ks(t,n,i))})}function Pa(n,e,t,i){t&&e(n),Yn(n,s=>{Pa(s,e,!0)})}function uf(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Zt(n){return new S(n.parent===null?n.name:Zt(n.parent)+"/"+n.name)}function Bi(n){n.parent!==null&&hf(n.parent,n.name,n)}function hf(n,e,t){const i=df(t),s=se(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Bi(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Bi(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ff=/[\[\].#$\/\u0000-\u001F\u007F]/,pf=/[\[\].#$\u0000-\u001F\u007F]/,yi=10*1024*1024,As=function(n){return typeof n=="string"&&n.length!==0&&!ff.test(n)},Oa=function(n){return typeof n=="string"&&n.length!==0&&!pf.test(n)},mf=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Oa(n)},Ma=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!zn(n)||n&&typeof n=="object"&&se(n,".sv")},On=function(n,e,t,i){i&&e===void 0||Qn(lt(n,"value"),e,t)},Qn=function(n,e,t){const i=t instanceof S?new Nu(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Pe(i));if(typeof e=="function")throw new Error(n+"contains a function "+Pe(i)+" with contents = "+e.toString());if(zn(e))throw new Error(n+"contains "+e.toString()+" "+Pe(i));if(typeof e=="string"&&e.length>yi/3&&Hn(e)>yi)throw new Error(n+"contains a string greater than "+yi+" utf8 bytes "+Pe(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(W(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!As(o)))throw new Error(n+" contains an invalid key ("+o+") "+Pe(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Pu(i,o),Qn(n,a,i),Ou(i)}),s&&r)throw new Error(n+' contains ".value" child '+Pe(i)+" in addition to actual children.")}},gf=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=Ft(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!As(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(Ru);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&j(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},_f=function(n,e,t,i){const s=lt(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];W(e,(o,a)=>{const l=new S(o);if(Qn(s,a,N(t,l)),as(l)===".priority"&&!Ma(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),gf(s,r)},yf=function(n,e,t){if(zn(e))throw new Error(lt(n,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Ma(e))throw new Error(lt(n,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},Da=function(n,e,t,i){if(!Oa(t))throw new Error(lt(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},vf=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Da(n,e,t)},Qe=function(n,e){if(b(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},wf=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!As(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!mf(t))throw new Error(lt(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bf{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Rs(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!ls(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function La(n,e,t){Rs(n,t),Fa(n,i=>ls(i,e))}function he(n,e,t){Rs(n,t),Fa(n,i=>j(i,e)||j(e,i))}function Fa(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(Ef(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Ef(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();kt&&F("event: "+t.toString()),_t(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const If="repo_interrupt",Cf=25;class Tf{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new bf,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Tn(),this.transactionQueueTree_=new ks,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Sf(n,e,t){if(n.stats_=rs(n.repoInfo_),n.forceRestClient_||tu())n.server_=new Cn(n.repoInfo_,(i,s,r,o)=>{Lr(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Fr(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{D(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new ce(n.repoInfo_,e,(i,s,r,o)=>{Lr(n,i,s,r,o)},i=>{Fr(n,i)},i=>{kf(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=ou(n.repoInfo_,()=>new oh(n.stats_,n.server_)),n.infoData_=new th,n.infoSyncTree_=new Or({startListening:(i,s,r,o)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=jn(n.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Ps(n,"connected",!1),n.serverSyncTree_=new Or({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);he(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function Ua(n){const t=n.infoData_.getNode(new S(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Ns(n){return of({timestamp:Ua(n)})}function Lr(n,e,t,i,s){n.dataUpdateCount++;const r=new S(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const l=vn(t,c=>P(c));o=ef(n.serverSyncTree_,r,l,s)}else{const l=P(t);o=Zh(n.serverSyncTree_,r,l,s)}else if(i){const l=vn(t,c=>P(c));o=Qh(n.serverSyncTree_,r,l)}else{const l=P(t);o=jn(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=Jn(n,r)),he(n.eventQueue_,a,o)}function Fr(n,e){Ps(n,"connected",e),e===!1&&Af(n)}function kf(n,e){W(e,(t,i)=>{Ps(n,t,i)})}function Ps(n,e,t){const i=new S("/.info/"+e),s=P(t);n.infoData_.updateSnapshot(i,s);const r=jn(n.infoSyncTree_,i,s);he(n.eventQueue_,i,r)}function Wa(n){return n.nextWriteId_++}function xf(n,e,t,i,s){Os(n,"set",{path:e.toString(),value:t,priority:i});const r=Ns(n),o=P(t,i),a=ws(n.serverSyncTree_,e),l=Aa(o,a,r),c=Wa(n),d=Ta(n.serverSyncTree_,e,l,c,!0);Rs(n.eventQueue_,d),n.server_.put(e.toString(),o.val(!0),(h,f)=>{const m=h==="ok";m||V("set at "+e+" failed: "+h);const g=Me(n.serverSyncTree_,c,!m);he(n.eventQueue_,e,g),ft(n,s,h,f)});const u=Va(n,e);Jn(n,u),he(n.eventQueue_,u,[])}function Af(n){Os(n,"onDisconnectEvents");const e=Ns(n),t=Tn();Oi(n.onDisconnect_,C(),(s,r)=>{const o=cf(s,r,n.serverSyncTree_,e);yt(t,s,o)});let i=[];Oi(t,C(),(s,r)=>{i=i.concat(jn(n.serverSyncTree_,s,r));const o=Va(n,s);Jn(n,o)}),n.onDisconnect_=Tn(),he(n.eventQueue_,C(),i)}function Rf(n,e,t){n.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&Pi(n.onDisconnect_,e),ft(n,t,i,s)})}function Ur(n,e,t,i){const s=P(t);n.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&yt(n.onDisconnect_,e,s),ft(n,i,r,o)})}function Nf(n,e,t,i,s){const r=P(t,i);n.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&yt(n.onDisconnect_,e,r),ft(n,s,o,a)})}function Pf(n,e,t,i){if(yn(t)){F("onDisconnect().update() called with empty data.  Don't do anything."),ft(n,i,"ok",void 0);return}n.server_.onDisconnectMerge(e.toString(),t,(s,r)=>{s==="ok"&&W(t,(o,a)=>{const l=P(a);yt(n.onDisconnect_,N(e,o),l)}),ft(n,i,s,r)})}function Of(n,e,t){let i;b(e._path)===".info"?i=Mr(n.infoSyncTree_,e,t):i=Mr(n.serverSyncTree_,e,t),La(n.eventQueue_,e._path,i)}function Mf(n,e,t){let i;b(e._path)===".info"?i=Wi(n.infoSyncTree_,e,t):i=Wi(n.serverSyncTree_,e,t),La(n.eventQueue_,e._path,i)}function Df(n){n.persistentConnection_&&n.persistentConnection_.interrupt(If)}function Os(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),F(t,...e)}function ft(n,e,t,i){e&&_t(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Ba(n,e,t){return ws(n.serverSyncTree_,e,t)||_.EMPTY_NODE}function Ms(n,e=n.transactionQueueTree_){if(e||Xn(n,e),vt(e)){const t=Ha(n,e);p(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&Lf(n,Zt(e),t)}else Na(e)&&Yn(e,t=>{Ms(n,t)})}function Lf(n,e,t){const i=t.map(c=>c.currentWriteId),s=Ba(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const d=t[c];p(d.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),d.status=1,d.retryCount++;const u=H(e,d.path);r=r.updateChild(u,d.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{Os(n,"transaction put response",{path:l.toString(),status:c});let d=[];if(c==="ok"){const u=[];for(let h=0;h<t.length;h++)t[h].status=2,d=d.concat(Me(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&u.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();Xn(n,xs(n.transactionQueueTree_,e)),Ms(n,n.transactionQueueTree_),he(n.eventQueue_,e,d);for(let h=0;h<u.length;h++)_t(u[h])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{V("transaction at "+l.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}Jn(n,e)}},o)}function Jn(n,e){const t=$a(n,e),i=Zt(t),s=Ha(n,t);return Ff(n,s,i),i}function Ff(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=H(t,l.path);let d=!1,u;if(p(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)d=!0,u=l.abortReason,s=s.concat(Me(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Cf)d=!0,u="maxretry",s=s.concat(Me(n.serverSyncTree_,l.currentWriteId,!0));else{const h=Ba(n,l.path,o);l.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){Qn("transaction failed: Data returned ",f,l.path);let m=P(f);typeof f=="object"&&f!=null&&se(f,".priority")||(m=m.updatePriority(h.getPriority()));const T=l.currentWriteId,L=Ns(n),K=Aa(m,h,L);l.currentOutputSnapshotRaw=m,l.currentOutputSnapshotResolved=K,l.currentWriteId=Wa(n),o.splice(o.indexOf(T),1),s=s.concat(Ta(n.serverSyncTree_,l.path,K,l.currentWriteId,l.applyLocally)),s=s.concat(Me(n.serverSyncTree_,T,!0))}else d=!0,u="nodata",s=s.concat(Me(n.serverSyncTree_,l.currentWriteId,!0))}he(n.eventQueue_,t,s),s=[],d&&(e[a].status=2,function(h){setTimeout(h,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(u==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(u),!1,null))))}Xn(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)_t(i[a]);Ms(n,n.transactionQueueTree_)}function $a(n,e){let t,i=n.transactionQueueTree_;for(t=b(e);t!==null&&vt(i)===void 0;)i=xs(i,t),e=x(e),t=b(e);return i}function Ha(n,e){const t=[];return za(n,e,t),t.sort((i,s)=>i.order-s.order),t}function za(n,e,t){const i=vt(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);Yn(e,s=>{za(n,s,t)})}function Xn(n,e){const t=vt(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,Ra(e,t.length>0?t:void 0)}Yn(e,i=>{Xn(n,i)})}function Va(n,e){const t=Zt($a(n,e)),i=xs(n.transactionQueueTree_,e);return uf(i,s=>{vi(n,s)}),vi(n,i),Pa(i,s=>{vi(n,s)}),t}function vi(n,e){const t=vt(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(p(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(p(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(Me(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Ra(e,void 0):t.length=r+1,he(n.eventQueue_,Zt(e),s);for(let o=0;o<i.length;o++)_t(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uf(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Wf(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):V(`Invalid query segment '${t}' in query '${n}'`)}return e}const Wr=function(n,e){const t=Bf(n),i=t.namespace;t.domain==="firebase.com"&&ue(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&ue("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Gd();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Yo(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new S(t.pathString)}},Bf=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let d=n.indexOf("/");d===-1&&(d=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(d,u)),d<u&&(s=Uf(n.substring(d,u)));const h=Wf(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const f=e.slice(0,c);if(f.toLowerCase()==="localhost")t="localhost";else if(f.split(".").length<=2)t=f;else{const m=e.indexOf(".");i=e.substring(0,m).toLowerCase(),t=e.substring(m+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Br="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",$f=function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=Br.charAt(t%64),t=Math.floor(t/64);p(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=Br.charAt(e[s]);return p(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hf{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+D(this.snapshot.exportVal())}}class zf{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vf{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return p(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new re;return Rf(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){Qe("OnDisconnect.remove",this._path);const e=new re;return Ur(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){Qe("OnDisconnect.set",this._path),On("OnDisconnect.set",e,this._path,!1);const t=new re;return Ur(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){Qe("OnDisconnect.setWithPriority",this._path),On("OnDisconnect.setWithPriority",e,this._path,!1),yf("OnDisconnect.setWithPriority",t);const i=new re;return Nf(this._repo,this._path,e,t,i.wrapCallback(()=>{})),i.promise}update(e){Qe("OnDisconnect.update",this._path),_f("OnDisconnect.update",e,this._path);const t=new re;return Pf(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return E(this._path)?null:as(this._path)}get ref(){return new Re(this._repo,this._path)}get _queryIdentifier(){const e=Er(this._queryParams),t=is(e);return t==="{}"?"default":t}get _queryObject(){return Er(this._queryParams)}isEqual(e){if(e=q(e),!(e instanceof Zn))return!1;const t=this._repo===e._repo,i=ls(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+Au(this._path)}}class Re extends Zn{constructor(e,t){super(e,t,new hs,!1)}get parent(){const e=sa(this._path);return e===null?null:new Re(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Mn{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new S(e),i=zt(this.ref,e);return new Mn(this._node.getChild(t),i,R)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Mn(s,zt(this.ref,i),R)))}hasChild(e){const t=new S(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function $i(n,e){return n=q(n),n._checkNotDeleted("ref"),e!==void 0?zt(n._root,e):n._root}function zt(n,e){return n=q(n),b(n._path)===null?vf("child","path",e):Da("child","path",e),new Re(n._repo,N(n._path,e))}function Gf(n){return n=q(n),new qf(n._repo,n._path)}function Mg(n,e){n=q(n),Qe("push",n._path),On("push",e,n._path,!0);const t=Ua(n._repo),i=$f(t),s=zt(n,i),r=zt(n,i);let o;return e!=null?o=qa(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function qa(n,e){n=q(n),Qe("set",n._path),On("set",e,n._path,!1);const t=new re;return xf(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}class Ds{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new Hf("value",this,new Mn(e.snapshotNode,new Re(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new zf(this,e,t):null}matches(e){return e instanceof Ds?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function jf(n,e,t,i,s){const r=new Vf(t,void 0),o=new Ds(r);return Of(n._repo,n,o),()=>Mf(n._repo,n,o)}function Kf(n,e,t,i){return jf(n,"value",e)}class Yf{}class Qf extends Yf{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new Zn(e._repo,e._path,eh(e._queryParams,this._limit),e._orderByCalled)}}function Dg(n){if(Math.floor(n)!==n||n<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new Qf(n)}function Lg(n,...e){let t=q(n);for(const i of e)t=i._apply(t);return t}$h(Re);jh(Re);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jf="FIREBASE_DATABASE_EMULATOR_HOST",Hi={};let Xf=!1;function Zf(n,e,t,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=Kt(r);n.repoInfo_=new Yo(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function ep(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||ue("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),F("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Wr(r,s),a=o.repoInfo,l;typeof process<"u"&&sr&&(l=sr[Jf]),l?(r=`http://${l}?ns=${a.namespace}`,o=Wr(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new iu(n.name,n.options,e);wf("Invalid Firebase Database URL",o),E(o.path)||ue("Database URL must point to the root of a Firebase Database (not including a child path).");const d=np(a,n,c,new nu(n,t));return new ip(d,n)}function tp(n,e){const t=Hi[e];(!t||t[n.key]!==n)&&ue(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Df(n),delete t[n.key]}function np(n,e,t,i){let s=Hi[e.name];s||(s={},Hi[e.name]=s);let r=s[n.toURLString()];return r&&ue("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Tf(n,Xf,t,i),s[n.toURLString()]=r,r}class ip{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Sf(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Re(this._repo,C())),this._rootInternal}_delete(){return this._rootInternal!==null&&(tp(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ue("Cannot call "+e+" on a deleted database.")}}function sp(n=Po(),e){const t=ns(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=hc("database");i&&rp(t,...i)}return t}function rp(n,e,t,i={}){n=q(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&Fe(i,r.repoInfo_.emulatorOptions))return;ue("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&ue('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new an(an.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:fc(i.mockUserToken,n.app.options.projectId);o=new an(a)}Kt(e)&&xo(e),Zf(r,s,i,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function op(n){Bd(gt),ct(new Ue("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return ep(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),Ee(rr,or,n),Ee(rr,or,"esm2020")}ce.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};ce.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};op();function Ga(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ap=Ga,ja=new jt("auth","Firebase",Ga());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dn=new es("@firebase/auth");function lp(n,...e){Dn.logLevel<=k.WARN&&Dn.warn(`Auth (${gt}): ${n}`,...e)}function ln(n,...e){Dn.logLevel<=k.ERROR&&Dn.error(`Auth (${gt}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(n,...e){throw Ls(n,...e)}function ne(n,...e){return Ls(n,...e)}function Ka(n,e,t){const i={...ap(),[e]:t};return new jt("auth","Firebase",i).create(e,{appName:n.name})}function Ce(n){return Ka(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ls(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return ja.create(n,...e)}function y(n,e,...t){if(!n)throw Ls(e,...t)}function ae(n){const e="INTERNAL ASSERTION FAILED: "+n;throw ln(e),new Error(e)}function pe(n,e){n||ae(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zi(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function cp(){return $r()==="http:"||$r()==="https:"}function $r(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(cp()||mc()||"connection"in navigator)?navigator.onLine:!0}function up(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(e,t){this.shortDelay=e,this.longDelay=t,pe(t>e,"Short delay should be less than long delay!"),this.isMobile=Zi()||So()}get(){return dp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fs(n,e){pe(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ya{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ae("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ae("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ae("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hp={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fp=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],pp=new en(3e4,6e4);function ei(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function wt(n,e,t,i,s={}){return Qa(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=mt({key:n.config.apiKey,...o}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const c={method:e,headers:l,...r};return pc()||(c.referrerPolicy="no-referrer"),n.emulatorConfig&&Kt(n.emulatorConfig.host)&&(c.credentials="include"),Ya.fetch()(await Xa(n,n.config.apiHost,t,a),c)})}async function Qa(n,e,t){n._canInitEmulator=!1;const i={...hp,...e};try{const s=new mp(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw on(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw on(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw on(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw on(n,"user-disabled",o);const d=i[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Ka(n,d,c);fe(n,d)}}catch(s){if(s instanceof Ae)throw s;fe(n,"network-request-failed",{message:String(s)})}}async function Ja(n,e,t,i,s={}){const r=await wt(n,e,t,i,s);return"mfaPendingCredential"in r&&fe(n,"multi-factor-auth-required",{_serverResponse:r}),r}async function Xa(n,e,t,i){const s=`${e}${t}?${i}`,r=n,o=r.config.emulator?Fs(n.config,s):`${n.config.apiScheme}://${s}`;return fp.includes(t)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class mp{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(ne(this.auth,"network-request-failed")),pp.get())})}}function on(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=ne(n,e,i);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gp(n,e){return wt(n,"POST","/v1/accounts:delete",e)}async function Ln(n,e){return wt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function _p(n,e=!1){const t=q(n),i=await t.getIdToken(e),s=Us(i);y(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:i,authTime:Pt(wi(s.auth_time)),issuedAtTime:Pt(wi(s.iat)),expirationTime:Pt(wi(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function wi(n){return Number(n)*1e3}function Us(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return ln("JWT malformed, contained fewer than 3 sections"),null;try{const s=_n(t);return s?JSON.parse(s):(ln("Failed to decode base64 JWT payload"),null)}catch(s){return ln("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Hr(n){const e=Us(n);return y(e,"internal-error"),y(typeof e.exp<"u","internal-error"),y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vt(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof Ae&&yp(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function yp({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Pt(this.lastLoginAt),this.creationTime=Pt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fn(n){var u;const e=n.auth,t=await n.getIdToken(),i=await Vt(n,Ln(e,{idToken:t}));y(i==null?void 0:i.users.length,e,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const r=(u=s.providerUserInfo)!=null&&u.length?Za(s.providerUserInfo):[],o=bp(n.providerData,r),a=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!(o!=null&&o.length),c=a?l:!1,d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Vi(s.createdAt,s.lastLoginAt),isAnonymous:c};Object.assign(n,d)}async function wp(n){const e=q(n);await Fn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function bp(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function Za(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ep(n,e){const t=await Qa(n,{},async()=>{const i=mt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=await Xa(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:a,body:i};return n.emulatorConfig&&Kt(n.emulatorConfig.host)&&(l.credentials="include"),Ya.fetch()(o,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Ip(n,e){return wt(n,"POST","/v2/accounts:revokeToken",ei(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){y(e.idToken,"internal-error"),y(typeof e.idToken<"u","internal-error"),y(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Hr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){y(e.length!==0,"internal-error");const t=Hr(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await Ep(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new it;return i&&(y(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(y(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(y(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new it,this.toJSON())}_performRefresh(){return ae("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(n,e){y(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Z{constructor({uid:e,auth:t,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new vp(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Vi(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Vt(this,this.stsTokenManager.getToken(this.auth,e));return y(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return _p(this,e)}reload(){return wp(this)}_assign(e){this!==e&&(y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Z({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Fn(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Y(this.auth.app))return Promise.reject(Ce(this.auth));const e=await this.getIdToken();return await Vt(this,gp(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const i=t.displayName??void 0,s=t.email??void 0,r=t.phoneNumber??void 0,o=t.photoURL??void 0,a=t.tenantId??void 0,l=t._redirectEventId??void 0,c=t.createdAt??void 0,d=t.lastLoginAt??void 0,{uid:u,emailVerified:h,isAnonymous:f,providerData:m,stsTokenManager:g}=t;y(u&&g,e,"internal-error");const T=it.fromJSON(this.name,g);y(typeof u=="string",e,"internal-error"),me(i,e.name),me(s,e.name),y(typeof h=="boolean",e,"internal-error"),y(typeof f=="boolean",e,"internal-error"),me(r,e.name),me(o,e.name),me(a,e.name),me(l,e.name),me(c,e.name),me(d,e.name);const L=new Z({uid:u,auth:e,email:s,emailVerified:h,displayName:i,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:T,createdAt:c,lastLoginAt:d});return m&&Array.isArray(m)&&(L.providerData=m.map(K=>({...K}))),l&&(L._redirectEventId=l),L}static async _fromIdTokenResponse(e,t,i=!1){const s=new it;s.updateFromServerResponse(t);const r=new Z({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await Fn(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];y(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?Za(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(r!=null&&r.length),a=new it;a.updateFromIdToken(i);const l=new Z({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Vi(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(r!=null&&r.length)};return Object.assign(l,c),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zr=new Map;function le(n){pe(n instanceof Function,"Expected a class definition");let e=zr.get(n);return e?(pe(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,zr.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}el.type="NONE";const Vr=el;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cn(n,e,t){return`firebase:${n}:${e}:${t}`}class st{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=cn(this.userKey,s.apiKey,r),this.fullPersistenceKey=cn("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ln(this.auth,{idToken:e}).catch(()=>{});return t?Z._fromGetAccountInfoResponse(this.auth,t,e):null}return Z._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new st(le(Vr),e,i);const s=(await Promise.all(t.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=s[0]||le(Vr);const o=cn(i,e.config.apiKey,e.name);let a=null;for(const c of t)try{const d=await c._get(o);if(d){let u;if(typeof d=="string"){const h=await Ln(e,{idToken:d}).catch(()=>{});if(!h)break;u=await Z._fromGetAccountInfoResponse(e,h,d)}else u=Z._fromJSON(e,d);c!==r&&(a=u),r=c;break}}catch{}const l=s.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new st(r,e,i):(r=l[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async c=>{if(c!==r)try{await c._remove(o)}catch{}})),new st(r,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qr(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(sl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(tl(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ol(e))return"Blackberry";if(al(e))return"Webos";if(nl(e))return"Safari";if((e.includes("chrome/")||il(e))&&!e.includes("edge/"))return"Chrome";if(rl(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function tl(n=$()){return/firefox\//i.test(n)}function nl(n=$()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function il(n=$()){return/crios\//i.test(n)}function sl(n=$()){return/iemobile/i.test(n)}function rl(n=$()){return/android/i.test(n)}function ol(n=$()){return/blackberry/i.test(n)}function al(n=$()){return/webos/i.test(n)}function Ws(n=$()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Cp(n=$()){var e;return Ws(n)&&!!((e=window.navigator)!=null&&e.standalone)}function Tp(){return gc()&&document.documentMode===10}function ll(n=$()){return Ws(n)||rl(n)||al(n)||ol(n)||/windows phone/i.test(n)||sl(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cl(n,e=[]){let t;switch(n){case"Browser":t=qr($());break;case"Worker":t=`${qr($())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${gt}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sp{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,a)=>{try{const l=e(r);o(l)}catch(l){a(l)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kp(n,e={}){return wt(n,"GET","/v2/passwordPolicy",ei(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xp=6;class Ap{constructor(e){var i;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??xp,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((i=e.allowedNonAlphanumericCharacters)==null?void 0:i.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rp{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Gr(this),this.idTokenSubscription=new Gr(this),this.beforeStateQueue=new Sp(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ja,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=le(t)),this._initializationPromise=this.queue(async()=>{var i,s,r;if(!this._deleted&&(this.persistenceManager=await st.create(this,e),(i=this._resolvePersistenceManagerAvailable)==null||i.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((r=this.currentUser)==null?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ln(this,{idToken:e}),i=await Z._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var r;if(Y(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let i=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(r=this.redirectUser)==null?void 0:r._redirectEventId,a=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Fn(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=up()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Y(this.app))return Promise.reject(Ce(this));const t=e?q(e):null;return t&&y(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Y(this.app)?Promise.reject(Ce(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Y(this.app)?Promise.reject(Ce(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(le(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await kp(this),t=new Ap(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new jt("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Ip(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&le(e)||this._popupRedirectResolver;y(t,this,"argument-error"),this.redirectPersistenceManager=await st.create(this,[le(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)==null?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(y(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,i,s);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=cl(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){var t;if(Y(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&lp(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function ti(n){return q(n)}class Gr{constructor(e){this.auth=e,this.observer=null,this.addObserver=Sc(t=>this.observer=t)}get next(){return y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Np(n){Bs=n}function Pp(n){return Bs.loadJS(n)}function Op(){return Bs.gapiScript}function Mp(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dp(n,e){const t=ns(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(Fe(r,e??{}))return s;fe(s,"already-initialized")}return t.initialize({options:e})}function Lp(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(le);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function Fp(n,e,t){const i=ti(n);y(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=dl(e),{host:o,port:a}=Up(e),l=a===null?"":`:${a}`,c={url:`${r}//${o}${l}/`},d=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){y(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),y(Fe(c,i.config.emulator)&&Fe(d,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=c,i.emulatorConfig=d,i.settings.appVerificationDisabledForTesting=!0,Kt(o)?xo(`${r}//${o}${l}`):Wp()}function dl(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Up(n){const e=dl(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:jr(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:jr(o)}}}function jr(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Wp(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ul{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ae("not implemented")}_getIdTokenResponse(e){return ae("not implemented")}_linkToIdToken(e,t){return ae("not implemented")}_getReauthenticationResolver(e){return ae("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rt(n,e){return Ja(n,"POST","/v1/accounts:signInWithIdp",ei(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bp="http://localhost";class ze extends ul{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ze(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):fe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...r}=t;if(!i||!s)return null;const o=new ze(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return rt(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,rt(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,rt(e,t)}buildRequest(){const e={requestUri:Bp,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=mt(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hl{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn extends hl{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge extends tn{constructor(){super("facebook.com")}static credential(e){return ze._fromParams({providerId:ge.PROVIDER_ID,signInMethod:ge.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ge.credentialFromTaggedObject(e)}static credentialFromError(e){return ge.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ge.credential(e.oauthAccessToken)}catch{return null}}}ge.FACEBOOK_SIGN_IN_METHOD="facebook.com";ge.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e extends tn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ze._fromParams({providerId:_e.PROVIDER_ID,signInMethod:_e.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return _e.credentialFromTaggedObject(e)}static credentialFromError(e){return _e.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return _e.credential(t,i)}catch{return null}}}_e.GOOGLE_SIGN_IN_METHOD="google.com";_e.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye extends tn{constructor(){super("github.com")}static credential(e){return ze._fromParams({providerId:ye.PROVIDER_ID,signInMethod:ye.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ye.credentialFromTaggedObject(e)}static credentialFromError(e){return ye.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ye.credential(e.oauthAccessToken)}catch{return null}}}ye.GITHUB_SIGN_IN_METHOD="github.com";ye.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve extends tn{constructor(){super("twitter.com")}static credential(e,t){return ze._fromParams({providerId:ve.PROVIDER_ID,signInMethod:ve.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return ve.credentialFromTaggedObject(e)}static credentialFromError(e){return ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return ve.credential(t,i)}catch{return null}}}ve.TWITTER_SIGN_IN_METHOD="twitter.com";ve.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $p(n,e){return Ja(n,"POST","/v1/accounts:signUp",ei(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await Z._fromIdTokenResponse(e,i,s),o=Kr(i);return new xe({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=Kr(i);return new xe({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function Kr(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hp(n){var s;if(Y(n.app))return Promise.reject(Ce(n));const e=ti(n);if(await e._initializationPromise,(s=e.currentUser)!=null&&s.isAnonymous)return new xe({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await $p(e,{returnSecureToken:!0}),i=await xe._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un extends Ae{constructor(e,t,i,s){super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Un.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new Un(e,t,i,s)}}function fl(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Un._fromErrorAndOperation(n,r,e,i):r})}async function zp(n,e,t=!1){const i=await Vt(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return xe._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vp(n,e,t=!1){const{auth:i}=n;if(Y(i.app))return Promise.reject(Ce(i));const s="reauthenticate";try{const r=await Vt(n,fl(i,s,e,n),t);y(r.idToken,i,"internal-error");const o=Us(r.idToken);y(o,i,"internal-error");const{sub:a}=o;return y(n.uid===a,i,"user-mismatch"),xe._forOperation(n,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&fe(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qp(n,e,t=!1){if(Y(n.app))return Promise.reject(Ce(n));const i="signIn",s=await fl(n,i,e),r=await xe._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}function Gp(n,e,t,i){return q(n).onIdTokenChanged(e,t,i)}function jp(n,e,t){return q(n).beforeAuthStateChanged(e,t)}const Wn="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pl{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Wn,"1"),this.storage.removeItem(Wn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kp=1e3,Yp=10;class ml extends pl{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ll(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);Tp()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Yp):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Kp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}ml.type="LOCAL";const Qp=ml;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl extends pl{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}gl.type="SESSION";const _l=gl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jp(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new ni(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async c=>c(t.origin,r)),l=await Jp(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ni.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $s(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xp{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,l)=>{const c=$s("",20);s.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(u){const h=u;if(h.data.eventId===c)switch(h.data.status){case"ack":clearTimeout(d),r=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(d),clearTimeout(r),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ie(){return window}function Zp(n){ie().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yl(){return typeof ie().WorkerGlobalScope<"u"&&typeof ie().importScripts=="function"}async function em(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function tm(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function nm(){return yl()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vl="firebaseLocalStorageDb",im=1,Bn="firebaseLocalStorage",wl="fbase_key";class nn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ii(n,e){return n.transaction([Bn],e?"readwrite":"readonly").objectStore(Bn)}function sm(){const n=indexedDB.deleteDatabase(vl);return new nn(n).toPromise()}function qi(){const n=indexedDB.open(vl,im);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(Bn,{keyPath:wl})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(Bn)?e(i):(i.close(),await sm(),e(await qi()))})})}async function Yr(n,e,t){const i=ii(n,!0).put({[wl]:e,value:t});return new nn(i).toPromise()}async function rm(n,e){const t=ii(n,!1).get(e),i=await new nn(t).toPromise();return i===void 0?null:i.value}function Qr(n,e){const t=ii(n,!0).delete(e);return new nn(t).toPromise()}const om=800,am=3;class bl{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await qi(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>am)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return yl()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ni._getInstance(nm()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,i;if(this.activeServiceWorker=await em(),!this.activeServiceWorker)return;this.sender=new Xp(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(i=e[0])!=null&&i.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||tm()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await qi();return await Yr(e,Wn,"1"),await Qr(e,Wn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Yr(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>rm(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Qr(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=ii(s,!1).getAll();return new nn(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),om)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}bl.type="LOCAL";const lm=bl;new en(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cm(n,e){return e?le(e):(y(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hs extends ul{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return rt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return rt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return rt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function dm(n){return qp(n.auth,new Hs(n),n.bypassAuthState)}function um(n){const{auth:e,user:t}=n;return y(t,e,"internal-error"),Vp(t,new Hs(n),n.bypassAuthState)}async function hm(n){const{auth:e,user:t}=n;return y(t,e,"internal-error"),zp(t,new Hs(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return dm;case"linkViaPopup":case"linkViaRedirect":return hm;case"reauthViaPopup":case"reauthViaRedirect":return um;default:fe(this.auth,"internal-error")}}resolve(e){pe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){pe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fm=new en(2e3,1e4);class Je extends El{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Je.currentPopupAction&&Je.currentPopupAction.cancel(),Je.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return y(e,this.auth,"internal-error"),e}async onExecution(){pe(this.filter.length===1,"Popup operations only handle one event");const e=$s();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ne(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(ne(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Je.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if((i=(t=this.authWindow)==null?void 0:t.window)!=null&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ne(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,fm.get())};e()}}Je.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pm="pendingRedirect",dn=new Map;class mm extends El{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=dn.get(this.auth._key());if(!e){try{const i=await gm(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}dn.set(this.auth._key(),e)}return this.bypassAuthState||dn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function gm(n,e){const t=vm(e),i=ym(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function _m(n,e){dn.set(n._key(),e)}function ym(n){return le(n._redirectPersistence)}function vm(n){return cn(pm,n.config.apiKey,n.name)}async function wm(n,e,t=!1){if(Y(n.app))return Promise.reject(Ce(n));const i=ti(n),s=cm(i,e),o=await new mm(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bm=10*60*1e3;class Em{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Im(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!Il(e)){const s=((i=e.error.code)==null?void 0:i.split("auth/")[1])||"internal-error";t.onError(ne(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=bm&&this.cachedEventUids.clear(),this.cachedEventUids.has(Jr(e))}saveEventToCache(e){this.cachedEventUids.add(Jr(e)),this.lastProcessedEventTime=Date.now()}}function Jr(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Il({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Im(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Il(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cm(n,e={}){return wt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tm=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Sm=/^https?/;async function km(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Cm(n);for(const t of e)try{if(xm(t))return}catch{}fe(n,"unauthorized-domain")}function xm(n){const e=zi(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!Sm.test(t))return!1;if(Tm.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Am=new en(3e4,6e4);function Xr(){const n=ie().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Rm(n){return new Promise((e,t)=>{var s,r,o;function i(){Xr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Xr(),t(ne(n,"network-request-failed"))},timeout:Am.get()})}if((r=(s=ie().gapi)==null?void 0:s.iframes)!=null&&r.Iframe)e(gapi.iframes.getContext());else if((o=ie().gapi)!=null&&o.load)i();else{const a=Mp("iframefcb");return ie()[a]=()=>{gapi.load?i():t(ne(n,"network-request-failed"))},Pp(`${Op()}?onload=${a}`).catch(l=>t(l))}}).catch(e=>{throw un=null,e})}let un=null;function Nm(n){return un=un||Rm(n),un}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pm=new en(5e3,15e3),Om="__/auth/iframe",Mm="emulator/auth/iframe",Dm={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Lm=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Fm(n){const e=n.config;y(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Fs(e,Mm):`https://${n.config.authDomain}/${Om}`,i={apiKey:e.apiKey,appName:n.name,v:gt},s=Lm.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${mt(i).slice(1)}`}async function Um(n){const e=await Nm(n),t=ie().gapi;return y(t,n,"internal-error"),e.open({where:document.body,url:Fm(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Dm,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=ne(n,"network-request-failed"),a=ie().setTimeout(()=>{r(o)},Pm.get());function l(){ie().clearTimeout(a),s(i)}i.ping(l).then(l,()=>{r(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wm={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Bm=500,$m=600,Hm="_blank",zm="http://localhost";class Zr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Vm(n,e,t,i=Bm,s=$m){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const l={...Wm,width:i.toString(),height:s.toString(),top:r,left:o},c=$().toLowerCase();t&&(a=il(c)?Hm:t),tl(c)&&(e=e||zm,l.scrollbars="yes");const d=Object.entries(l).reduce((h,[f,m])=>`${h}${f}=${m},`,"");if(Cp(c)&&a!=="_self")return qm(e||"",a),new Zr(null);const u=window.open(e||"",a,d);y(u,n,"popup-blocked");try{u.focus()}catch{}return new Zr(u)}function qm(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gm="__/auth/handler",jm="emulator/auth/handler",Km=encodeURIComponent("fac");async function eo(n,e,t,i,s,r){y(n.config.authDomain,n,"auth-domain-config-required"),y(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:gt,eventId:s};if(e instanceof hl){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",yn(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,u]of Object.entries({}))o[d]=u}if(e instanceof tn){const d=e.getScopes().filter(u=>u!=="");d.length>0&&(o.scopes=d.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const d of Object.keys(a))a[d]===void 0&&delete a[d];const l=await n._getAppCheckToken(),c=l?`#${Km}=${encodeURIComponent(l)}`:"";return`${Ym(n)}?${mt(a).slice(1)}${c}`}function Ym({config:n}){return n.emulator?Fs(n,jm):`https://${n.authDomain}/${Gm}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bi="webStorageSupport";class Qm{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=_l,this._completeRedirectFn=wm,this._overrideRedirectResult=_m}async _openPopup(e,t,i,s){var o;pe((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const r=await eo(e,t,i,zi(),s);return Vm(e,r,$s())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await eo(e,t,i,zi(),s);return Zp(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(pe(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await Um(e),i=new Em(e);return t.register("authEvent",s=>(y(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(bi,{type:bi},s=>{var o;const r=(o=s==null?void 0:s[0])==null?void 0:o[bi];r!==void 0&&t(!!r),fe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=km(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ll()||nl()||Ws()}}const Jm=Qm;var to="@firebase/auth",no="1.12.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xm{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zm(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function eg(n){ct(new Ue("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;y(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const l={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:cl(n)},c=new Rp(i,s,r,l);return Lp(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),ct(new Ue("auth-internal",e=>{const t=ti(e.getProvider("auth").getImmediate());return(i=>new Xm(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ee(to,no,Zm(n)),Ee(to,no,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tg=5*60,ng=To("authIdTokenMaxAge")||tg;let io=null;const ig=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>ng)return;const s=t==null?void 0:t.token;io!==s&&(io=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function sg(n=Po()){const e=ns(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Dp(n,{popupRedirectResolver:Jm,persistence:[lm,Qp,_l]}),i=To("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=ig(r.toString());jp(t,o,()=>o(t.currentUser)),Gp(t,a=>o(a))}}const s=Io("auth");return s&&Fp(t,`http://${s}`),t}function rg(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Np({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=ne("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",rg().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});eg("Browser");const og={apiKey:"AIzaSyB76jyOWvklhhg28CbKGridktq2sC7eXpI",authDomain:"arun-os-fc275.firebaseapp.com",databaseURL:"https://arun-os-fc275-default-rtdb.asia-southeast1.firebasedatabase.app",projectId:"arun-os-fc275",storageBucket:"arun-os-fc275.firebasestorage.app",messagingSenderId:"120774503513",appId:"1:120774503513:web:5ff5c09915e850a1079548"};let Ei=null,Gi=null,so=null,hn=null;async function ag(){try{return Ei=No(og),Gi=sp(Ei),so=sg(Ei),hn=(await Hp(so)).user.uid,console.log("[ArunOS] Firebase connected. Visitor ID:",hn),{db:Gi,userId:hn}}catch(n){return console.warn("[ArunOS] Firebase init failed (offline mode):",n.message),null}}function Fg(){return Gi}function Ug(){return hn}const ro=["#10b981","#3b82f6","#f59e0b","#ef4444","#8b5cf6","#ec4899","#06b6d4","#f97316"],oo=["Curious Fox","Swift Eagle","Silent Panda","Brave Wolf","Chill Cat","Busy Bee","Wise Owl","Happy Duck","Sneaky Raccoon","Zen Turtle","Code Monkey","Debug Dragon","Deploy Dolphin","Merge Moose","Rebase Rabbit"];let Ot=null,Xe=null,fn=null,qt={},Cl=null,Tl=null,Ii=null;function lg(n,e){Ot=n,Xe=e,Cl=ro[Math.floor(Math.random()*ro.length)],Tl=oo[Math.floor(Math.random()*oo.length)],fn=document.createElement("div"),fn.style.cssText="position:fixed;inset:0;pointer-events:none;z-index:99990;",document.body.appendChild(fn),document.addEventListener("mousemove",cg);const t=$i(Ot,"cursors");Kf(t,s=>{const r=s.val()||{};Object.entries(r).forEach(([l,c])=>{l!==Xe&&(Date.now()-c.t>1e4||dg(l,c))}),Object.keys(qt).forEach(l=>{(!r[l]||l===Xe)&&ug(l)});const o=Object.keys(r).filter(l=>{var c;return Date.now()-(((c=r[l])==null?void 0:c.t)||0)<1e4}).length,a=document.querySelector(".tray-visitors-count");a&&(a.textContent=o)});const i=$i(Ot,`cursors/${Xe}`);Gf(i).remove()}function cg(n){if(!Ot||!Xe||Ii)return;Ii=setTimeout(()=>{Ii=null},100);const e=(n.clientX/window.innerWidth*100).toFixed(1),t=(n.clientY/window.innerHeight*100).toFixed(1);qa($i(Ot,`cursors/${Xe}`),{x:parseFloat(e),y:parseFloat(t),c:Cl,n:Tl,t:Date.now()})}function dg(n,e){let t=qt[n];t||(t=document.createElement("div"),t.style.cssText="position:fixed;pointer-events:none;transition:left 0.1s linear,top 0.1s linear;z-index:99991;",t.innerHTML=`
      <svg width="16" height="20" viewBox="0 0 16 20" fill="${e.c}" style="filter:drop-shadow(0 1px 3px rgba(0,0,0,0.5));">
        <path d="M0 0L16 12L8 12L12 20L8 18L4 12L0 16Z"/>
      </svg>
      <span style="position:absolute;top:18px;left:12px;background:${e.c};color:#000;padding:1px 6px;border-radius:4px;font-size:10px;font-family:'Inter',sans-serif;white-space:nowrap;font-weight:600;">${e.n}</span>
    `,fn.appendChild(t),qt[n]=t),t.style.left=`${e.x}%`,t.style.top=`${e.y}%`}function ug(n){const e=qt[n];e&&(e.remove(),delete qt[n])}let ao=null,te=null,ji=null;const hg=12e4;function fg(){Tt(),document.addEventListener("mousemove",Tt),document.addEventListener("keydown",Tt),document.addEventListener("click",Tt),document.addEventListener("scroll",Tt)}function Tt(){te&&Ki(),clearTimeout(ao),ao=setTimeout(pg,hg)}function pg(){te=document.createElement("div"),te.style.cssText=`
    position:fixed;inset:0;background:#000;z-index:999998;
    cursor:pointer;overflow:hidden;
  `;const n=document.createElement("div");n.style.cssText=`
    position:absolute;
    font-family:'JetBrains Mono',monospace;
    font-size:36px;font-weight:700;
    white-space:nowrap;
    transition:color 0.5s;
  `,n.textContent="HIRE ME",te.appendChild(n),document.body.appendChild(te);let e=Math.random()*(window.innerWidth-200),t=Math.random()*(window.innerHeight-60),i=2,s=1.5;const r=["#10b981","#3b82f6","#f59e0b","#ef4444","#8b5cf6","#ec4899"];let o=0;function a(){e+=i,t+=s,(e<=0||e>=window.innerWidth-180)&&(i=-i,o=(o+1)%r.length,n.style.color=r[o]),(t<=0||t>=window.innerHeight-50)&&(s=-s,o=(o+1)%r.length,n.style.color=r[o]),n.style.left=e+"px",n.style.top=t+"px",ji=requestAnimationFrame(a)}n.style.color=r[0],a(),te.addEventListener("click",Ki),te.addEventListener("mousemove",Ki)}function Ki(){ji&&cancelAnimationFrame(ji),te&&(te.remove(),te=null)}function mg(){console.log("%c🖥️ ArunOS v"+gg()+" %c— If you're reading this, you're my kind of person.","font-size:20px;font-weight:bold;color:#10b981;","font-size:14px;color:#888;"),console.log("%cNo bugs here. Only undocumented features.","font-size:12px;color:#666;font-style:italic;"),console.log("%cBuilt with: vanilla JS, zero frameworks, mass amounts of caffeine.","font-size:12px;color:#555;"),console.log('%c🤫 Psst... try typing "konami" in the terminal.',"font-size:12px;color:#3b82f6;"),console.warn("WARNING: This developer mass-deploys on Fridays.")}function gg(){const n=new Date(2019,0,1);return((Date.now()-n)/(365.25*24*60*60*1e3)).toFixed(1)}const lo=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];let St=0,co=0;function _g(){document.addEventListener("keydown",t=>{t.key===lo[St]?(St++,St===lo.length&&(St=0,yg())):St=0});const n=new MutationObserver(()=>{const t=document.querySelectorAll(".os-window:not(.minimized)");t.length>=8&&t.length>co&&Te("Memory Warning","You have "+t.length+" windows open. Your RAM is fine. Your screen real estate is not.",4e3,"alertTriangle"),co=t.length}),e=document.querySelector(".desktop-area");e&&n.observe(e,{childList:!0,subtree:!0})}function yg(){Te("Konami Code Activated",'You found the secret. Achievement unlocked: "retro gamer"',4e3,"gamepad");const n=document.querySelector(".desktop");n&&(n.style.transition="box-shadow 0.5s",n.style.boxShadow="inset 0 0 100px rgba(16, 185, 129, 0.3)",document.querySelectorAll(".desktop-icon").forEach((e,t)=>{e.style.transition="transform 0.1s",setTimeout(()=>{e.style.transform=`rotate(${Math.random()*10-5}deg)`},t*50),setTimeout(()=>{e.style.transform=""},1e3+t*50)}),setTimeout(()=>{n.style.boxShadow=""},2e3))}function vg(){localStorage.getItem("arunos-wizard-done")||setTimeout(()=>{fo({id:"first-run",title:"Welcome to ArunOS — Setup Wizard (1 of 1, I promise)",icon:v("rocket",16),width:460,height:400,content:n=>{n.innerHTML=`
          <div style="text-align:center;padding:8px;">
            <div style="margin-bottom:12px;">${v("rocket",48,"#10b981")}</div>
            <h2 style="color:#ddd;font-size:18px;margin-bottom:4px;">Welcome to ArunOS</h2>
            <p style="color:#555;font-size:13px;margin-bottom:20px;">The only portfolio that's also an operating system.</p>

            <div style="text-align:left;background:rgba(0,0,0,0.25);padding:16px;border-radius:8px;margin-bottom:16px;">
              <p style="color:#888;font-size:13px;margin-bottom:12px;">What brings you here today?</p>
              <div style="display:flex;flex-direction:column;gap:8px;" id="wizard-options">
                <label style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;cursor:pointer;transition:all 0.15s;color:#aaa;font-size:13px;">
                  <input type="radio" name="reason" value="hiring" style="accent-color:#10b981;">
                  <span style="display:flex;align-items:center;gap:8px;">${v("briefcase",16,"#888")} I'm hiring</span>
                </label>
                <label style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;cursor:pointer;transition:all 0.15s;color:#aaa;font-size:13px;">
                  <input type="radio" name="reason" value="browsing" style="accent-color:#10b981;">
                  <span style="display:flex;align-items:center;gap:8px;">${v("eye",16,"#888")} Just browsing</span>
                </label>
                <label style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;cursor:pointer;transition:all 0.15s;color:#aaa;font-size:13px;">
                  <input type="radio" name="reason" value="linkedin" style="accent-color:#10b981;">
                  <span style="display:flex;align-items:center;gap:8px;">${v("compass",16,"#888")} Stalking from LinkedIn</span>
                </label>
                <label style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;cursor:pointer;transition:all 0.15s;color:#aaa;font-size:13px;">
                  <input type="radio" name="reason" value="lost" style="accent-color:#10b981;">
                  <span style="display:flex;align-items:center;gap:8px;">${v("mapPin",16,"#888")} I clicked the wrong link</span>
                </label>
                <label style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;cursor:pointer;transition:all 0.15s;color:#aaa;font-size:13px;">
                  <input type="radio" name="reason" value="arun" style="accent-color:#10b981;">
                  <span style="display:flex;align-items:center;gap:8px;">${v("home",16,"#888")} I'm Arun and I forgot my own site</span>
                </label>
              </div>
            </div>

            <button id="wizard-continue" style="padding:10px 28px;background:#10b981;color:#000;border:none;border-radius:8px;font-weight:600;font-size:14px;cursor:pointer;font-family:inherit;">Let's Go</button>
          </div>
        `,n.querySelectorAll("label").forEach(e=>{e.addEventListener("click",()=>{n.querySelectorAll("label").forEach(t=>t.style.borderColor="#262626"),e.style.borderColor="#3478f6"})}),n.querySelector("#wizard-continue").addEventListener("click",()=>{const e=n.querySelector('input[name="reason"]:checked'),t=e?e.value:"browsing";localStorage.setItem("arunos-wizard-done","1");const s={hiring:{title:"Welcome, Recruiter",body:"Resume is on the desktop. I promise my code is better than my interview skills.",icon:"briefcase"},browsing:{title:"Welcome, Explorer",body:"Feel free to snoop around. Try the Terminal for the full experience.",icon:"eye"},linkedin:{title:"Busted",body:"We've been expecting you. Your LinkedIn stalking session has been logged. (Not really.)",icon:"compass"},lost:{title:"Welcome Anyway",body:"You're here now. Might as well look around. It's better than whatever you were doing.",icon:"mapPin"},arun:{title:"Welcome Home, Boss",body:"Everything is running smoothly. Except the coffee machine. As usual.",icon:"home"}}[t];po("first-run"),setTimeout(()=>Te(s.title,s.body,5e3,s.icon),300)})}})},2e3)}const wg=[{x:.15,y:.85,r:.4,color:[99,102,241],speed:15e-5,phase:0},{x:.85,y:.15,r:.35,color:[244,114,182],speed:12e-5,phase:1.5},{x:.5,y:.5,r:.45,color:[56,189,248],speed:1e-4,phase:3},{x:.3,y:.2,r:.3,color:[167,139,250],speed:18e-5,phase:4.5},{x:.7,y:.75,r:.35,color:[52,211,153],speed:14e-5,phase:2},{x:.9,y:.45,r:.25,color:[251,146,60],speed:16e-5,phase:5.5}];let G=null,Ke=null,Sl=0,Yi=0;function bg(n){G=document.createElement("canvas"),G.className="live-wallpaper",G.style.cssText="position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;";const e=n.querySelector(".desktop-area");if(e){e.style.position="relative",e.insertBefore(G,e.firstChild);const t=e.querySelector(".desktop-icons");t&&(t.style.position="relative")}Ke=G.getContext("2d"),uo(),window.addEventListener("resize",uo),Yi=performance.now(),kl()}function uo(){if(!G)return;const n=Math.min(window.devicePixelRatio||1,2);G.width=Math.floor(G.offsetWidth*n*.5),G.height=Math.floor(G.offsetHeight*n*.5)}function kl(){const n=performance.now(),e=n-Yi;Yi=n,Sl+=e,Eg(),requestAnimationFrame(kl)}function Eg(){const n=G.width,e=G.height;if(!(!n||!e)){Ke.fillStyle="#0a0e1a",Ke.fillRect(0,0,n,e);for(const t of wg){const i=Sl*t.speed+t.phase,s=(t.x+Math.sin(i)*.08+Math.cos(i*.7)*.05)*n,r=(t.y+Math.cos(i*1.1)*.08+Math.sin(i*.6)*.05)*e,o=t.r*Math.max(n,e)*(.9+Math.sin(i*.5)*.1),[a,l,c]=t.color,d=Ke.createRadialGradient(s,r,0,s,r,o);d.addColorStop(0,`rgba(${a}, ${l}, ${c}, 0.45)`),d.addColorStop(.4,`rgba(${a}, ${l}, ${c}, 0.2)`),d.addColorStop(1,`rgba(${a}, ${l}, ${c}, 0)`),Ke.fillStyle=d,Ke.fillRect(0,0,n,e)}}}const Ig=new Date(2019,0,1);function Cg(n){const e=document.createElement("div");e.className="widgets-container",n.appendChild(e),Tg(e),Sg(e),kg(e),xg(e),Ag(e)}function Tg(n){const e=si("uptime-widget");e.innerHTML=`
    <div class="widget-header">
      <span class="widget-header-icon">${v("clock",14,"#10b981")}</span>
      <span>System Uptime</span>
    </div>
    <div class="uptime-counter" style="font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:700;color:#fff;margin:8px 0 4px;letter-spacing:0.5px;"></div>
    <div class="uptime-status" style="font-size:11px;color:rgba(255,255,255,0.4);height:16px;transition:opacity 0.5s;"></div>
    <div style="display:flex;align-items:center;gap:6px;margin-top:8px;">
      <span style="width:6px;height:6px;border-radius:50%;background:#10b981;animation:pulse 2s ease-in-out infinite;"></span>
      <span style="font-size:10px;color:#10b981;">ONLINE</span>
    </div>
  `,n.appendChild(e);const t=e.querySelector(".uptime-counter"),i=e.querySelector(".uptime-status"),s=["30+ repos deployed","~$50M market cap built","10+ microservices migrated","Caffeine dependency: stable","30k+ users served","Zero production fires (today)","Stack Overflow tabs: countless"];let r=0;function o(){const c=new Date-Ig,d=Math.floor(c/(365.25*24*60*60*1e3)),u=c-d*365.25*24*60*60*1e3,h=Math.floor(u/(30.44*24*60*60*1e3)),f=u-h*30.44*24*60*60*1e3,m=Math.floor(f/(24*60*60*1e3)),g=Math.floor(f%(24*60*60*1e3)/(60*60*1e3)),T=Math.floor(f%(60*60*1e3)/(60*1e3)),L=Math.floor(f%(60*1e3)/1e3);t.textContent=`${d}y ${h}m ${m}d ${pn(g)}:${pn(T)}:${pn(L)}`}function a(){i.style.opacity="0",setTimeout(()=>{i.textContent=s[r%s.length],i.style.opacity="1",r++},300)}o(),a(),setInterval(o,1e3),setInterval(a,4e3)}function Sg(n){const e=[{title:"Undefined Is Not a Function",artist:"TypeError ft. Console.log",album:"Runtime Errors Vol. 3",color:"#e74c3c"},{title:"It Works on My Machine",artist:"Docker",album:"Container Therapy",color:"#3498db"},{title:"sudo rm -rf /my-problems",artist:"Bash Shell",album:"Pipe Dreams",color:"#2ecc71"},{title:"404 Love Not Found",artist:"HTTP Client",album:"Status Codes of the Heart",color:"#9b59b6"},{title:"Merge Conflict",artist:"Git & The Rebases",album:"Branch Management",color:"#f39c12"},{title:"Deploying on Friday",artist:"CI/CD Pipeline",album:"Living Dangerously",color:"#e67e22"},{title:"Stack Overflow Lullaby",artist:"Copy Paste",album:"Greatest Hits",color:"#1abc9c"}],t=si("nowplaying-widget");t.innerHTML=`
    <div style="display:flex;gap:12px;align-items:center;">
      <div class="np-art" style="width:52px;height:52px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:background 0.8s;">${v("zap",24,"rgba(255,255,255,0.7)")}</div>
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
  `,n.appendChild(t);const i=t.querySelector(".np-art"),s=t.querySelector(".np-title"),r=t.querySelector(".np-artist"),o=t.querySelector(".np-album"),a=t.querySelector(".np-progress"),l=t.querySelector(".np-elapsed");let c=Math.floor(Math.random()*e.length),d=Date.now();const u=18e3;function h(){const m=e[c%e.length];s.style.opacity="0",r.style.opacity="0",o.style.opacity="0",setTimeout(()=>{s.textContent=m.title,r.textContent=m.artist,o.textContent=m.album,i.style.background=`linear-gradient(135deg, ${m.color}, ${m.color}88)`,a.style.background=m.color,s.style.opacity="1",r.style.opacity="1",o.style.opacity="1"},300),d=Date.now(),c++}function f(){const m=Date.now()-d,g=Math.min(m/u*100,100);a.style.width=g+"%";const T=Math.floor(m/1e3);l.textContent=`${Math.floor(T/60)}:${pn(T%60)}`,m>=u&&h()}h(),setInterval(f,500)}function kg(n){const e=si("intel-widget");e.innerHTML=`
    <div class="widget-header">
      <span class="widget-header-icon">${v("eye",14,"#f59e0b")}</span>
      <span>Visitor Intel</span>
      <span style="margin-left:auto;font-size:9px;color:rgba(255,255,255,0.2);letter-spacing:1px;">CLASSIFIED</span>
    </div>
    <div class="intel-rows" style="font-family:'JetBrains Mono',monospace;font-size:11px;margin-top:8px;display:flex;flex-direction:column;gap:4px;color:rgba(255,255,255,0.5);"></div>
    <div class="intel-verdict" style="margin-top:10px;padding:6px 10px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.15);border-radius:6px;font-size:11px;color:#f59e0b;text-align:center;transition:opacity 0.5s;"></div>
  `,n.appendChild(e);const t=e.querySelector(".intel-rows"),i=e.querySelector(".intel-verdict"),s=navigator.userAgent;let r="Unknown";s.includes("Firefox")?r="Firefox":s.includes("Edg")?r="Edge":s.includes("OPR")||s.includes("Opera")?r="Opera":s.includes("Chrome")?r="Chrome":s.includes("Safari")&&(r="Safari");let o="Unknown";/iPhone|iPad|iPod/.test(s)?o="iOS":s.includes("Android")?o="Android":s.includes("Mac")?o="macOS":s.includes("Windows")?o="Windows":s.includes("Linux")&&(o="Linux");const a=`${window.screen.width}x${window.screen.height}`;t.innerHTML=`
    <div><span style="color:rgba(255,255,255,0.3);">Browser:</span> ${r}</div>
    <div><span style="color:rgba(255,255,255,0.3);">OS:</span> ${o}</div>
    <div><span style="color:rgba(255,255,255,0.3);">Screen:</span> ${a}</div>
    <div><span style="color:rgba(255,255,255,0.3);">Location:</span> <span class="intel-location">detecting...</span></div>
    <div><span style="color:rgba(255,255,255,0.3);">Battery:</span> <span class="intel-battery">--</span></div>
  `,fetch("https://ipapi.co/json/",{signal:AbortSignal.timeout(4e3)}).then(u=>u.json()).then(u=>{u.city&&(e.querySelector(".intel-location").textContent=`${u.city}, ${u.country_name}`)}).catch(()=>{e.querySelector(".intel-location").textContent="Classified"}),"getBattery"in navigator&&navigator.getBattery().then(u=>{e.querySelector(".intel-battery").textContent=`${Math.round(u.level*100)}%${u.charging?" (charging)":""}`}).catch(()=>{});const l=["Threat Level: Recruiter (High Priority)","Assessment: Should hire Arun immediately","Status: Probably has 47 Chrome tabs open","Risk: May spend too long on this site","Classified: This visitor has good taste","Note: Cursor movements being tracked"];let c=0;function d(){i.style.opacity="0",setTimeout(()=>{i.textContent=l[c%l.length],i.style.opacity="1",c++},300)}d(),setInterval(d,5e3)}function xg(n){const e=si("weather-widget"),t={sun:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',cloud:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',storm:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>',fog:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="1.5" stroke-linecap="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><line x1="4" y1="22" x2="20" y2="22" opacity="0.4"/></svg>',bolt:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-linecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>'},i=[{day:"Mon",icon:"sun",desc:"Sprint planning",temp:"24°"},{day:"Tue",icon:"storm",desc:"Prod hotfix",temp:"38°"},{day:"Wed",icon:"cloud",desc:"Code review",temp:"21°"},{day:"Thu",icon:"fog",desc:"Unclear reqs",temp:"??°"},{day:"Fri",icon:"bolt",desc:"Demo day",temp:"42°"}];e.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:flex-start;">
      <div>
        <div class="widget-header" style="margin-bottom:4px;">
          <span class="widget-header-icon">${v("cloud",14,"#3b82f6")}</span>
          <span>Career Weather</span>
        </div>
        <div style="font-size:32px;font-weight:700;color:#fff;">27°</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.4);">Partly cloudy with a chance of deployments</div>
      </div>
      <div>${t.sun}</div>
    </div>
    <div style="display:flex;gap:4px;font-size:10px;color:rgba(255,255,255,0.3);margin-top:6px;">
      <span>Humidity: 100% (imposter syndrome)</span>
      <span style="margin-left:auto;">Wind: scope creep</span>
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:12px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.06);">
      ${i.map(s=>`
        <div style="text-align:center;flex:1;">
          <div style="font-size:10px;color:rgba(255,255,255,0.35);margin-bottom:4px;">${s.day}</div>
          ${t[s.icon]}
          <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:2px;">${s.temp}</div>
          <div style="font-size:9px;color:rgba(255,255,255,0.25);margin-top:1px;">${s.desc}</div>
        </div>
      `).join("")}
    </div>
  `,n.appendChild(e)}function Ag(n){const e=document.createElement("div");e.className="widget sticky-note-widget",e.innerHTML=`
    <div style="font-size:14px;color:rgba(0,0,0,0.7);font-weight:600;margin-bottom:8px;">Hey! Thanks for visiting.</div>
    <div style="font-size:12px;color:rgba(0,0,0,0.5);line-height:1.6;margin-bottom:12px;">Quick links:</div>
    <div style="display:flex;flex-direction:column;gap:4px;font-size:12px;margin-bottom:14px;">
      <a href="/resume.pdf" target="_blank" style="color:#1d4ed8;text-decoration:none;display:flex;align-items:center;gap:6px;">${v("fileText",14,"#1d4ed8")} Resume</a>
      <a href="${oi.github}" target="_blank" style="color:#1d4ed8;text-decoration:none;display:flex;align-items:center;gap:6px;">${v("code",14,"#1d4ed8")} GitHub</a>
      <a href="${oi.linkedin}" target="_blank" style="color:#1d4ed8;text-decoration:none;display:flex;align-items:center;gap:6px;">${v("externalLink",14,"#1d4ed8")} LinkedIn</a>
      <a href="mailto:${oi.email}" style="color:#1d4ed8;text-decoration:none;display:flex;align-items:center;gap:6px;">${v("mail",14,"#1d4ed8")} Email</a>
    </div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(0,0,0,0.4);line-height:1.8;">
      <div>[x] Build portfolio OS</div>
      <div>[x] Add developer humor</div>
      <div>[ ] Get mass hired</div>
      <div>[ ] Fix sleep schedule</div>
    </div>
  `,n.appendChild(e)}function si(n){const e=document.createElement("div");return e.className=`widget ${n}`,e}function pn(n){return n.toString().padStart(2,"0")}async function Rg(){const n=document.getElementById("arun-os");await Zl(n);const e=Hl(n);bg(e),Gl(e);const t=e.querySelector(".desktop-area");t&&Cg(t),ag().then(i=>{i&&(lg(i.db,i.userId),Te("Connected","Multiplayer enabled. Other visitors can see your cursor.",4e3,"wifi"))}).catch(()=>{}),B(async()=>{const{openApp:i}=await Promise.resolve().then(()=>Gs);return{openApp:i}},void 0).then(({openApp:i})=>i("about")),vg(),yo(),fg(),mg(),_g(),document.addEventListener("keydown",i=>{(i.ctrlKey||i.metaKey)&&i.key==="t"&&(i.preventDefault(),B(async()=>{const{openApp:s}=await Promise.resolve().then(()=>Gs);return{openApp:s}},void 0).then(({openApp:s})=>s("terminal")))})}Rg();export{Fg as a,Ug as b,fo as c,Mg as d,Ng as e,Og as f,ot as g,v as i,Dg as l,Kf as o,oi as p,Lg as q,$i as r,Pg as s};
