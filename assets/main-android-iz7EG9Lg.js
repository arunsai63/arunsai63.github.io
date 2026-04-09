const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-Dui7f6k8.js","assets/index-BfiTSkJx.css"])))=>i.map(i=>d[i]);
import{g as k,o as P,a as V,b as R}from"./gestures-owX_xKfK.js";import{i as F,a as Y}from"./console-easter-egg-DB4rPIQL.js";import{_ as G}from"./index-Dui7f6k8.js";function j(t){return new Promise(e=>{const i=document.createElement("div");i.className="android-boot-overlay",i.innerHTML=`
      <div class="android-boot-logo">
        <img src="/wallpapers/android-logo.svg" alt="" class="android-boot-logo-img" />
      </div>
      <div class="android-boot-text">android</div>
    `,t.appendChild(i),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.querySelector(".android-boot-logo-img").classList.add("android-boot-visible"),i.querySelector(".android-boot-text").classList.add("android-boot-visible")})});let n=!1;const s=()=>{n||(n=!0,i.style.opacity="0",i.style.transition="opacity 0.4s ease",setTimeout(()=>{i.remove(),e()},400))};i.addEventListener("click",s,{once:!0}),i.addEventListener("touchstart",s,{once:!0}),setTimeout(s,2500)})}const U='<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>',W='<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M2 22h20V2L2 22zm18-2h-3V9.83l3-3V20z" opacity="0.3"/><path d="M17 20h3V6.83l-3 3V20zM2 22h20V2L2 22zm18-2H6.83L20 6.83V20z"/></svg>';function Q(t){const e=document.createElement("div");e.className="android-status-bar";function i(){const l=new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1});e.innerHTML=`
      <div class="status-bar-left">
        <span class="status-bar-time">${l}</span>
      </div>
      <div class="status-bar-right">
        ${U}
        ${W}
        <span class="status-bar-battery" id="android-battery"></span>
      </div>
    `,n()}async function n(){const s=e.querySelector("#android-battery");if(s)try{if("getBattery"in navigator){const l=await navigator.getBattery(),c=Math.round(l.level*100);s.innerHTML=`
          <span style="font-size:11px;margin-right:2px;">${c}%</span>
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
            <rect x="0.5" y="0.5" width="18" height="11" rx="2" stroke="white" stroke-width="1"/>
            <rect x="19" y="3" width="2" height="5" rx="1" fill="white"/>
            <rect x="2" y="2" width="${c/100*15}" height="7" rx="1" fill="${c<20?"#ef4444":"#fff"}"/>
          </svg>
        `}else s.innerHTML=`
          <span style="font-size:11px;margin-right:2px;">87%</span>
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
            <rect x="0.5" y="0.5" width="18" height="11" rx="2" stroke="white" stroke-width="1"/>
            <rect x="19" y="3" width="2" height="5" rx="1" fill="white"/>
            <rect x="2" y="2" width="13" height="7" rx="1" fill="#fff"/>
          </svg>
        `}catch{s.textContent="87%"}}return i(),setInterval(i,3e4),t.appendChild(e),e}let u={};const K='<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="rgba(255,255,255,0.8)"/></svg>',Z='<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2"/></svg>',J='<svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)"><circle cx="6" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="18" cy="12" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="12" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>';function X(t){const e=document.createElement("div");return e.className="android-nav-bar",e.innerHTML=`
    <button class="android-nav-btn" id="nav-back" aria-label="Back">${K}</button>
    <button class="android-nav-btn android-nav-home-btn" id="nav-home" aria-label="Home">${Z}</button>
    <button class="android-nav-btn" id="nav-recents" aria-label="Recent Apps">${J}</button>
  `,e.querySelector("#nav-back").addEventListener("click",()=>{u.onBack&&u.onBack()}),e.querySelector("#nav-home").addEventListener("click",()=>{u.onHome&&u.onHome()}),e.querySelector("#nav-recents").addEventListener("click",()=>{u.onRecents&&u.onRecents()}),t.appendChild(e),e}function ee(t){u=t}const $={user:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',briefcase:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>',fileText:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',terminal:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-8-2h6v-2h-6v2zM7.5 17l1.41-1.41L6.33 13l2.58-2.59L7.5 9l-4 4 4 4z"/></svg>',folder:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',mail:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',messageCircle:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',calculator:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4V7h4v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm-10 8H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2z"/></svg>',settings:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',trash:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',layout:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zM13 3h8v8h-8V3zm0 10h8v8h-8v-8z" opacity="0.85"/></svg>',book:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>',phone:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>',shoppingBag:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"/></svg>',star:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/></svg>',video:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>',edit:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',zap:'<svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.97 17.55 11 21 11 21z"/></svg>'};function O(t,e=28){const i=$[t];return i?e===28?i:i.replace(/width="\d+"/,`width="${e}"`).replace(/height="\d+"/,`height="${e}"`):$.star}let S=null,f=null;function te(t){S=t.onAppOpen,f=t.onDrawerOpen}function ie(t){const e=document.createElement("div");e.className="android-home-screen";const i=k("android"),n=20,s=[];for(let a=0;a<i.length;a+=n)s.push(i.slice(a,a+n));let l=0;e.innerHTML=`
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
        ${s.map((a,p)=>`
          <div class="home-page" data-page="${p}">
            <div class="home-app-grid">
              ${a.map(y=>`
                <div class="home-app-icon" data-app-id="${y.id}">
                  <div class="home-icon-bg" style="background:${y.iconBg}">
                    ${O(y.iconName,28)}
                  </div>
                  <span class="home-app-label">${y.label}</span>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="home-page-dots">
      ${s.map((a,p)=>`<div class="home-dot ${p===0?"active":""}"></div>`).join("")}
    </div>
  `;const c=e.querySelector(".home-search-pill");c&&c.addEventListener("click",()=>{f&&f()}),e.querySelectorAll(".home-app-icon").forEach(a=>{a.addEventListener("click",()=>{const p=a.dataset.appId;a.querySelector(".home-icon-bg").classList.add("icon-pressed"),setTimeout(()=>{a.querySelector(".home-icon-bg").classList.remove("icon-pressed")},150),S&&S(p)}),P(a,()=>{a.classList.add("icon-wiggle"),setTimeout(()=>a.classList.remove("icon-wiggle"),600)},400)});const d=e.querySelector("#home-pages");V(d,{left:()=>{l<s.length-1&&(l++,v())},right:()=>{l>0&&(l--,v())},up:()=>{f&&f()}});function v(){d.style.transform=`translateX(-${l*100}%)`,e.querySelectorAll(".home-dot").forEach((a,p)=>{a.classList.toggle("active",p===l)})}return t.appendChild(e),e}let g=[],h=null,D=null,M=null;function ae(t,e){D=t,M=e.onClose}async function q(t){var l;const e=R(t);if(!e)return;const i=document.createElement("div");i.className="android-activity",i.dataset.appId=t;const n=document.createElement("div");n.className="activity-app-bar",n.innerHTML=`
    <button class="activity-back-btn">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
    </button>
    <span class="activity-title">${((l=e.platforms.android)==null?void 0:l.label)||e.label}</span>
  `;const s=document.createElement("div");s.className="activity-content",i.appendChild(n),i.appendChild(s);try{const c=await e.module();c.renderContent?c.renderContent(s):c.open&&(s.innerHTML='<div style="padding:20px;color:#888;">App loading...</div>')}catch{s.innerHTML=`<div style="padding:20px;color:#ef4444;">Failed to load app: ${t}</div>`}return n.querySelector(".activity-back-btn").addEventListener("click",()=>{C()}),V(i,{right:c=>{c.dx>80&&C()}},{threshold:40}),D.appendChild(i),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.classList.add("activity-enter")})}),h&&(h.style.display="none"),g.push(i),h=i,i}function C(){if(!h)return;const t=h;t.classList.add("activity-exit"),t.classList.remove("activity-enter"),setTimeout(()=>{t.remove(),g.pop(),g.length>0?(h=g[g.length-1],h.style.display=""):(h=null,M&&M())},300)}function se(){g.forEach(t=>t.remove()),g=[],h=null}function A(){return h!==null}const ne=[{id:"wifi",icon:"wifi",label:"Wi-Fi",subtitle:"FBI_Surveillance_Van_7",active:!0},{id:"bluetooth",icon:"bluetooth",label:"Bluetooth",subtitle:"mechanical keyboard",active:!0},{id:"dnd",icon:"bellOff",label:"DND",subtitle:"Do Not Deploy",active:!1},{id:"dark",icon:"moon",label:"Dark Mode",subtitle:"Always.",active:!0},{id:"airplane",icon:"airplay",label:"Airplane",subtitle:"Career on Autopilot",active:!1},{id:"power",icon:"power",label:"Restart",subtitle:"Switch OS",active:!1},{id:"location",icon:"mapPin",label:"Location",subtitle:"Detecting...",active:!0},{id:"flashlight",icon:"zap",label:"Flashlight",subtitle:"Spotlight on Career",active:!1}],le=[{app:"GitHub",icon:"🐙",text:"3 new stars on arun-os (we both know it's you)",time:"2m"},{app:"LinkedIn",icon:"💼",text:"47 recruiters viewed your profile (none will message back)",time:"15m"},{app:"Stack Overflow",icon:"📚",text:"Your answer got 10 upvotes",time:"1h"},{app:"Gmail",icon:"📧",text:"RE: RE: RE: FWD: RE: Urgent Production Issue",time:"3h"},{app:"Calendar",icon:"📅",text:"Standup in 5 minutes (prepare your excuses)",time:"4h"}];let r=null,L=!1;function ce(t){return r=document.createElement("div"),r.className="android-notification-shade",r.innerHTML=I(!1),r.addEventListener("click",e=>{(e.target===r||e.target.classList.contains("shade-backdrop"))&&b()}),t.appendChild(r),_(),r}const oe={wifi:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>',bluetooth:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/></svg>',bellOff:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>',moon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>',airplay:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>',power:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/></svg>',mapPin:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',zap:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>'};function I(t){return`
    <div class="shade-backdrop"></div>
    <div class="shade-content ${t?"shade-expanded":""}">
      <div class="shade-handle" id="shade-handle">
        <div class="shade-handle-bar"></div>
      </div>

      <!-- Date + brightness -->
      <div class="shade-date-row">
        <span class="shade-date">${new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}</span>
        <span class="shade-brightness-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)"><path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/></svg>
        </span>
      </div>

      <div class="shade-quick-settings ${t?"qs-expanded":"qs-collapsed"}">
        ${ne.map(e=>`
          <div class="qs-tile ${e.active?"qs-active":""}" data-qs-id="${e.id}">
            <div class="qs-tile-icon">${oe[e.icon]||e.icon}</div>
            <div class="qs-tile-text">
              <div class="qs-tile-label">${e.label}</div>
              ${t?`<div class="qs-tile-subtitle">${e.subtitle}</div>`:""}
            </div>
          </div>
        `).join("")}
      </div>

      <div class="shade-notifications">
        <div class="shade-notif-header">
          <span>Notifications</span>
          <button class="shade-clear-all" id="shade-clear-all">Clear all</button>
        </div>
        ${le.map((e,i)=>`
          <div class="shade-notification" data-notif-idx="${i}">
            <div class="shade-notif-icon-circle">${e.icon}</div>
            <div class="shade-notif-body">
              <div class="shade-notif-app-row">
                <span class="shade-notif-app">${e.app}</span>
                <span class="shade-notif-time">${e.time}</span>
              </div>
              <div class="shade-notif-text">${e.text}</div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `}function _(){if(!r)return;const t=r.querySelector("#shade-handle");t&&t.addEventListener("click",()=>{L=!L,r.innerHTML=I(L),_()}),r.querySelectorAll(".qs-tile").forEach(i=>{i.addEventListener("click",()=>{const n=i.dataset.qsId;if(n==="power"){re();return}if(n==="dark"){const s=i.querySelector(".qs-tile-subtitle");s&&(s.textContent="Light mode not available. Your eyes will thank me.");return}i.classList.toggle("qs-active")})});const e=r.querySelector("#shade-clear-all");e&&e.addEventListener("click",()=>{const i=r.querySelector(".shade-notifications");i&&(i.innerHTML=`
          <div style="text-align:center;padding:40px 20px;color:rgba(255,255,255,0.4);font-size:14px;">
            Notifications cleared.<br>Your anxiety wasn't.
          </div>
        `)})}function re(){b(),G(async()=>{const{switchToOS:t}=await import("./index-Dui7f6k8.js").then(e=>e.o);return{switchToOS:t}},__vite__mapDeps([0,1])).then(({switchToOS:t})=>{const e=document.createElement("div");e.className="android-power-menu",e.innerHTML=`
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
    `,e.querySelector("#power-menu-close").addEventListener("click",()=>e.remove()),e.querySelectorAll(".power-menu-btn[data-os]").forEach(i=>{i.addEventListener("click",()=>{t(i.dataset.os)})}),document.body.appendChild(e)})}function x(){r&&r.classList.add("shade-visible")}function b(){r&&(r.classList.remove("shade-visible"),L=!1)}function w(){return r==null?void 0:r.classList.contains("shade-visible")}const T={salary:"Nice try, HR.",password:"It's 'password123'. Just kidding. Or am I?",bugs:"We don't have those here. Only undocumented features.",girlfriend:"404: Not Found (insufficient time allocated)",sleep:"Module not found. Have you tried coffee instead?",fired:"sudo: permission denied. You are unfireable.",coffee:"Brewing... ☕ Always available."};let o=null,E=null;function de(t,e){E=e.onAppOpen,o=document.createElement("div"),o.className="android-app-drawer";const i=k("android");o.innerHTML=`
    <div class="drawer-backdrop"></div>
    <div class="drawer-panel">
      <div class="drawer-handle">
        <div class="drawer-handle-bar"></div>
      </div>
      <div class="drawer-search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        <input type="text" class="drawer-search-input" placeholder="Search apps" />
      </div>
      <div class="drawer-grid" id="drawer-grid">
        ${H(i)}
      </div>
    </div>
  `;const n=o.querySelector(".drawer-search-input");return n.addEventListener("input",()=>{const l=n.value.toLowerCase().trim(),c=o.querySelector("#drawer-grid");if(T[l]){c.innerHTML=`
        <div class="drawer-easter-egg">${T[l]}</div>
      `;return}const d=l?i.filter(v=>v.label.toLowerCase().includes(l)):i;c.innerHTML=d.length?H(d):`<div class="drawer-easter-egg">No apps found for "${n.value}"</div>`,B(c)}),o.querySelector(".drawer-backdrop").addEventListener("click",()=>m()),o.querySelector(".drawer-handle").addEventListener("click",()=>m()),V(o.querySelector(".drawer-panel"),{down:()=>m()}),B(o),t.appendChild(o),o}function H(t){return t.map(e=>`
    <div class="drawer-grid-item" data-app-id="${e.id}">
      <div class="drawer-grid-icon" style="background:${e.iconBg}">
        ${O(e.iconName,28)}
      </div>
      <span class="drawer-grid-label">${e.label}</span>
    </div>
  `).join("")}function B(t){t.querySelectorAll(".drawer-grid-item").forEach(e=>{e.addEventListener("click",()=>{const i=e.dataset.appId,n=e.querySelector(".drawer-grid-icon");n.style.transform="scale(0.88)",setTimeout(()=>{n.style.transform=""},150),setTimeout(()=>{m(),E&&E(i)},100)})})}function N(){o&&(o.classList.add("drawer-visible"),setTimeout(()=>{const t=o.querySelector(".drawer-search-input");t&&t.focus()},350))}function m(){if(o){o.classList.remove("drawer-visible");const t=o.querySelector(".drawer-search-input");t&&(t.value="");const e=o.querySelector("#drawer-grid");if(e){const i=k("android");e.innerHTML=H(i),B(e)}}}function z(){return o==null?void 0:o.classList.contains("drawer-visible")}async function ue(t){await j(t),t.innerHTML="";const e=document.createElement("div");e.className="android-shell",t.appendChild(e);const i=document.createElement("div");i.className="android-wallpaper",e.appendChild(i),Q(e);const n=document.createElement("div");n.className="android-main-area",e.appendChild(n);const s=document.createElement("div");s.className="android-home-layer",n.appendChild(s);const l=document.createElement("div");l.className="android-activity-layer",n.appendChild(l),X(e),te({onAppOpen:a=>q(a),onDrawerOpen:()=>N()}),ie(s),ae(l,{onClose:()=>{s.style.display=""}}),ce(e),de(e,{onAppOpen:a=>q(a)}),ee({onBack:()=>{w()?b():z()?m():A()&&C()},onHome:()=>{w()?b():z()?m():A()&&se()},onRecents:()=>{z()?m():N()}});const c=e.querySelector(".android-status-bar");c&&(c.addEventListener("click",()=>{w()?b():x()}),c.style.cursor="pointer");let d=null;const v=40;e.addEventListener("mousedown",a=>{a.clientY<v&&(d=a.clientY)}),e.addEventListener("mousemove",a=>{d!==null&&a.clientY-d>50&&(d=null,w()||x())}),e.addEventListener("mouseup",()=>{d=null}),e.addEventListener("touchstart",a=>{a.touches[0].clientY<v&&(d=a.touches[0].clientY)},{passive:!0}),e.addEventListener("touchmove",a=>{d!==null&&a.touches[0].clientY-d>50&&(d=null,w()||x())},{passive:!0}),e.addEventListener("touchend",()=>{d=null},{passive:!0}),F().catch(()=>{}),Y()}export{ue as boot};
