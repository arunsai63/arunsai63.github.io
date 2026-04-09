import{g as p}from"./gestures-D4_EayYY.js";import{g as a}from"./data-CMMTyLTn.js";import{b as g}from"./console-easter-egg-DLHUFXsG.js";import"./index-DwjHNIXK.js";const c=[{user:"Definitely Not Arun",rating:5,text:"Works on my machine. 10/10 would deploy again."},{user:"Anonymous Recruiter",rating:5,text:"Impressive portfolio. Still won't respond to my LinkedIn message though."},{user:"A Coffee Machine",rating:5,text:"My best customer. 5 stars for loyalty."},{user:"Production Server",rating:1,text:"He keeps deploying on Fridays. Please make him stop."},{user:"node_modules/",rating:5,text:"I take up all the space and he still keeps me around. True love."}];function m(r){const d=p("android");let t="";function o(){r.innerHTML=`
      <div style="font-family:var(--md-font,'Inter',sans-serif);color:var(--md-on-surface,#e6e1e5);">
        <!-- Search bar -->
        <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--md-surface-container-high,#2b292d);border-radius:28px;margin-bottom:16px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <input type="text" placeholder="Search ArunOS Store" value="${t}" style="flex:1;background:none;border:none;color:var(--md-on-surface,#e6e1e5);font-size:15px;font-family:inherit;outline:none;" id="store-search" />
        </div>

        ${t?l():s()}
      </div>
    `;const e=r.querySelector("#store-search");e&&(e.addEventListener("input",n=>{t=n.target.value,t.length>2&&o()}),e.addEventListener("keydown",n=>{n.key==="Enter"&&o()}));const i=r.querySelector("#store-update-all");i&&i.addEventListener("click",()=>{i.textContent="All apps are already perfect. No updates needed.",i.style.background="rgba(255,255,255,0.04)",i.style.color="rgba(255,255,255,0.4)"})}function s(){return`
      <!-- Featured Banner -->
      <div style="background:linear-gradient(135deg,#00504a,#003731);padding:24px;border-radius:16px;margin-bottom:20px;">
        <div style="font-size:20px;font-weight:500;margin-bottom:8px;">ArunOS v${a()}</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.6);margin-bottom:16px;">Now with 100% more imposter syndrome!</div>
        <button id="store-update-all" style="padding:8px 20px;background:var(--md-primary,#80cbc4);color:#003731;border:none;border-radius:20px;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;">Update All</button>
      </div>

      <!-- Apps grid -->
      <div style="margin-bottom:16px;">
        <div style="font-size:16px;font-weight:500;margin-bottom:12px;">Installed Apps</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
          ${d.slice(0,9).map(e=>`
            <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
              <div style="width:56px;height:56px;border-radius:14px;background:${e.iconBg};display:flex;align-items:center;justify-content:center;">
                ${g(e.iconName,24,"#fff")}
              </div>
              <div style="font-size:11px;text-align:center;color:rgba(255,255,255,0.7);">${e.label}</div>
              <div style="font-size:9px;color:rgba(255,255,255,0.3);">⭐ 5.0</div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Reviews -->
      <div>
        <div style="font-size:16px;font-weight:500;margin-bottom:12px;">Reviews</div>
        ${c.map(e=>`
          <div style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <span style="font-size:13px;color:var(--md-on-surface,#e6e1e5);">${e.user}</span>
              <span style="font-size:11px;color:#f59e0b;">${"⭐".repeat(e.rating)}</span>
            </div>
            <div style="font-size:13px;color:rgba(255,255,255,0.5);line-height:1.4;">${e.text}</div>
          </div>
        `).join("")}
      </div>

      <div style="text-align:center;padding:20px;font-size:11px;color:rgba(255,255,255,0.2);">
        ArunOS Store v${a()} | Downloads: 1 (it's me, testing)
      </div>
    `}function l(){return`
      <div style="text-align:center;padding:60px 20px;">
        <div style="font-size:48px;margin-bottom:16px;">🔍</div>
        <div style="font-size:16px;color:var(--md-on-surface,#e6e1e5);margin-bottom:8px;">Did you mean: hire Arun?</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.4);">No results for "${t}". All the good apps are already installed.</div>
      </div>
    `}o()}function y(){m(document.createElement("div"))}export{y as open,m as renderContent};
