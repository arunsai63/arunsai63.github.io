import{c as g,D as u}from"./browser-engine-B2DaZHvC.js";const a={back:'<svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',forward:'<svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M6 12l4-4-4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',share:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1v8M5 4l3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 8v5a2 2 0 002 2h6a2 2 0 002-2V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',lock:'<svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 7V5.5a2.5 2.5 0 015 0V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',plus:'<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><line x1="8" y1="3" x2="8" y2="13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',reload:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M13.5 8A5.5 5.5 0 112.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13.5 3v5h-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'};function c(r,i){r.innerHTML=`
    <div class="ips-start">
      <div class="ips-start-inner">
        <div class="ips-start-search-wrap">
          <input class="ips-start-search" type="text" placeholder="Search or enter website name" spellcheck="false" />
        </div>
        <div class="ips-favorites-label">Favorites</div>
        <div class="ips-favorites-grid">
          ${u.map(t=>`
            <div class="ips-favorite" data-url="${t.url}">
              <div class="ips-favorite-icon" style="background:${t.color}">
                <span>${t.letter}</span>
              </div>
              <div class="ips-favorite-label">${t.label}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `,r.querySelector(".ips-start-search").addEventListener("keydown",t=>{t.key==="Enter"&&t.target.value.trim()&&i.navigate(t.target.value)}),r.querySelectorAll(".ips-favorite").forEach(t=>{t.addEventListener("click",()=>i.navigate(t.dataset.url))})}function v(r){const i=g(),t=i.createIframe();r.style.cssText="padding:0;height:100%;display:flex;flex-direction:column;overflow:hidden;",r.innerHTML=`
    <div class="ips-tab-bar">
      <div class="ips-nav-btns">
        <button class="ips-btn ips-btn-back" title="Back" disabled>${a.back}</button>
        <button class="ips-btn ips-btn-forward" title="Forward" disabled>${a.forward}</button>
      </div>
      <div class="ips-tab-strip">
        <div class="ips-tab ips-tab-active">
          <span class="ips-tab-lock">${a.lock}</span>
          <input class="ips-tab-url" type="text" placeholder="Search or enter website" spellcheck="false" />
          <button class="ips-btn ips-btn-reload">${a.reload}</button>
        </div>
      </div>
      <div class="ips-tab-actions">
        <button class="ips-btn" title="Share">${a.share}</button>
        <button class="ips-btn" title="New Tab">${a.plus}</button>
      </div>
    </div>
    <div class="ips-loading-bar"><div class="ips-loading-progress"></div></div>
    <div class="ips-content-area"></div>

    <style>
      .ips-tab-bar {
        display: flex; align-items: center; gap: 8px;
        padding: 6px 12px; height: 44px; box-sizing: border-box;
        background: rgba(44,44,46,0.85);
        -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px);
        border-bottom: 0.5px solid rgba(255,255,255,0.1);
        flex-shrink: 0; user-select: none;
      }
      .ips-nav-btns {
        display: flex; align-items: center; gap: 2px; flex-shrink: 0;
      }
      .ips-btn {
        background: none; border: none; color: var(--ios-blue, #007AFF);
        cursor: pointer; padding: 6px; border-radius: 6px;
        display: flex; align-items: center; min-width: 32px; min-height: 32px;
        justify-content: center; transition: opacity 0.15s, background 0.15s;
      }
      .ips-btn:active { background: rgba(255,255,255,0.06); }
      .ips-btn:disabled { opacity: 0.3; cursor: default; }
      .ips-btn:disabled:active { background: none; }

      .ips-tab-strip { flex: 1; display: flex; gap: 4px; min-width: 0; }
      .ips-tab {
        flex: 1; display: flex; align-items: center; gap: 6px;
        background: rgba(255,255,255,0.08);
        border-radius: 8px; padding: 0 10px; height: 32px;
        min-width: 0; transition: background 0.15s;
      }
      .ips-tab-active { background: rgba(255,255,255,0.12); }
      .ips-tab-lock { color: #8e8e93; display: flex; flex-shrink: 0; }
      .ips-tab-url {
        flex: 1; background: none; border: none; outline: none;
        color: #e5e5e7; font-size: 13px;
        font-family: -apple-system, 'SF Pro Text', 'Inter', sans-serif;
        text-align: center; min-width: 0;
      }
      .ips-tab-url::placeholder { color: #636366; }
      .ips-tab-url:focus { text-align: left; }
      .ips-btn-reload { padding: 4px; color: #8e8e93; min-width: auto; min-height: auto; }

      .ips-tab-actions {
        display: flex; align-items: center; gap: 2px; flex-shrink: 0;
      }

      .ips-loading-bar {
        height: 2px; background: transparent; flex-shrink: 0;
        overflow: hidden; position: relative;
      }
      .ips-loading-progress {
        position: absolute; top: 0; left: 0; height: 100%;
        width: 0; background: var(--ios-blue, #007AFF);
        transition: width 0.3s ease;
      }
      .ips-loading-bar.ips-loading .ips-loading-progress {
        width: 70%;
        transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .ips-loading-bar.ips-loaded .ips-loading-progress {
        width: 100%;
        transition: width 0.2s ease;
      }

      .ips-content-area {
        flex: 1; position: relative; overflow: hidden;
        display: flex; flex-direction: column;
        background: #1c1c1e;
      }

      /* Start page */
      .ips-start {
        flex: 1; display: flex; justify-content: center; align-items: flex-start;
        padding: 48px 24px 24px;
        background: radial-gradient(ellipse at 50% 0%, rgba(0,122,255,0.05), transparent 60%),
                    #1c1c1e;
        overflow-y: auto;
      }
      .ips-start-inner { width: 100%; max-width: 560px; }
      .ips-start-search-wrap { margin-bottom: 36px; }
      .ips-start-search {
        width: 100%; padding: 12px 18px; border-radius: 12px;
        background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.08);
        color: #e5e5e7; font-size: 16px; outline: none;
        font-family: -apple-system, 'SF Pro Text', 'Inter', sans-serif;
        box-sizing: border-box; transition: border-color 0.2s;
        -webkit-appearance: none;
      }
      .ips-start-search:focus { border-color: rgba(0,122,255,0.5); }
      .ips-start-search::placeholder { color: #636366; }
      .ips-favorites-label {
        font-size: 22px; font-weight: 600; color: #e5e5e7;
        margin-bottom: 18px;
      }
      .ips-favorites-grid {
        display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
      }
      .ips-favorite {
        display: flex; flex-direction: column; align-items: center;
        gap: 10px; cursor: pointer; -webkit-tap-highlight-color: transparent;
      }
      .ips-favorite-icon {
        width: 60px; height: 60px; border-radius: 16px;
        display: flex; align-items: center; justify-content: center;
        font-size: 24px; font-weight: 700; color: #fff;
        transition: transform 0.15s;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      }
      .ips-favorite:active .ips-favorite-icon { transform: scale(0.92); }
      .ips-favorite-label {
        font-size: 12px; color: #8e8e93; text-align: center;
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        max-width: 80px;
      }
    </style>
  `;const o=r.querySelector(".ips-content-area"),s=r.querySelector(".ips-tab-url"),d=r.querySelector(".ips-btn-back"),p=r.querySelector(".ips-btn-forward"),b=r.querySelector(".ips-btn-reload"),n=r.querySelector(".ips-loading-bar");c(o,i),o.appendChild(t),s.addEventListener("keydown",e=>{e.key==="Enter"&&e.target.value.trim()&&(i.navigate(e.target.value),e.target.blur())}),s.addEventListener("focus",()=>{const e=i.getState();e.url&&(s.value=e.url),s.select()}),s.addEventListener("blur",()=>{const e=i.getState();s.value=e.isStartPage?"":e.displayUrl}),d.addEventListener("click",()=>i.goBack()),p.addEventListener("click",()=>i.goForward()),b.addEventListener("click",()=>i.refresh()),i.onStateChange(e=>{d.disabled=!e.canGoBack,p.disabled=!e.canGoForward,document.activeElement!==s&&(s.value=e.isStartPage?"":e.displayUrl),n.classList.remove("ips-loading","ips-loaded"),e.loading?n.classList.add("ips-loading"):e.url&&(n.classList.add("ips-loaded"),setTimeout(()=>n.classList.remove("ips-loaded"),400));const l=o.querySelector(".ips-start");e.isStartPage?(l||(c(o,i),o.appendChild(t)),t.style.display="none"):(l&&l.remove(),t.style.display="block")})}export{v as renderContent};
