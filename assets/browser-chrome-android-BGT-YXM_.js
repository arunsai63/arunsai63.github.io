import{c as h,D as g}from"./browser-engine-B2DaZHvC.js";const a={home:'<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',tabs:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" stroke-width="2"/><text x="12" y="16" text-anchor="middle" fill="currentColor" font-size="11" font-weight="700" font-family="sans-serif">1</text></svg>',menu:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>',search:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',lock:'<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>'};function l(o,t){o.innerHTML=`
    <div class="chr-start">
      <div class="chr-start-inner">
        <div class="chr-logo-area">
          <div class="chr-logo-text">ArunOS</div>
          <div class="chr-logo-sub">Browse the web</div>
        </div>
        <div class="chr-search-wrap">
          <span class="chr-search-icon">${a.search}</span>
          <input class="chr-search-input" type="text" placeholder="Search or type URL" spellcheck="false" />
        </div>
        <div class="chr-shortcuts">
          ${g.map(r=>`
            <div class="chr-shortcut" data-url="${r.url}">
              <div class="chr-shortcut-icon" style="background:${r.color}">
                <span>${r.letter}</span>
              </div>
              <div class="chr-shortcut-label">${r.label}</div>
            </div>
          `).join("")}
        </div>
        <div class="chr-discover-label">Discover</div>
        <div class="chr-discover-card">
          <div class="chr-discover-img"></div>
          <div class="chr-discover-text">
            <div class="chr-discover-title">Welcome to ArunOS Browser</div>
            <div class="chr-discover-desc">Built with zero frameworks and mass amounts of caffeine</div>
          </div>
        </div>
      </div>
    </div>
  `,o.querySelector(".chr-search-input").addEventListener("keydown",r=>{r.key==="Enter"&&r.target.value.trim()&&t.navigate(r.target.value)}),o.querySelectorAll(".chr-shortcut").forEach(r=>{r.addEventListener("click",()=>t.navigate(r.dataset.url))})}function u(o){const t=h(),r=t.createIframe();o.style.cssText="padding:0;height:100%;display:flex;flex-direction:column;overflow:hidden;background:#1c1b1f;",o.innerHTML=`
    <div class="chr-loading-bar"><div class="chr-loading-progress"></div></div>
    <div class="chr-content-area"></div>
    <div class="chr-bottom-bar">
      <button class="chr-bar-btn chr-btn-home" title="Home">${a.home}</button>
      <div class="chr-url-pill" tabindex="0">
        <span class="chr-url-lock">${a.lock}</span>
        <input class="chr-url-text" type="text" placeholder="Search or type URL" spellcheck="false" />
      </div>
      <button class="chr-bar-btn chr-btn-tabs" title="Tabs">${a.tabs}</button>
      <button class="chr-bar-btn chr-btn-menu" title="Menu">${a.menu}</button>
    </div>

    <style>
      .chr-loading-bar {
        height: 3px; background: transparent; flex-shrink: 0;
        overflow: hidden; position: relative; z-index: 2;
      }
      .chr-loading-progress {
        position: absolute; top: 0; left: 0; height: 100%;
        width: 0; background: var(--md-primary, #80cbc4);
        transition: width 0.3s ease;
      }
      .chr-loading-bar.chr-loading .chr-loading-progress {
        width: 70%;
        transition: width 2.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .chr-loading-bar.chr-loaded .chr-loading-progress {
        width: 100%;
        transition: width 0.2s ease;
      }

      .chr-content-area {
        flex: 1; position: relative; overflow: hidden;
        display: flex; flex-direction: column;
        background: var(--md-surface, #1c1b1f);
      }

      .chr-bottom-bar {
        display: flex; align-items: center; gap: 6px;
        padding: 6px 10px; height: 52px; box-sizing: border-box;
        background: var(--md-surface, #1c1b1f);
        border-top: 1px solid rgba(255,255,255,0.06);
        flex-shrink: 0; user-select: none;
      }
      .chr-bar-btn {
        background: none; border: none; padding: 8px;
        color: var(--md-on-surface, #e6e1e5); cursor: pointer;
        border-radius: 50%; display: flex; align-items: center;
        transition: background 0.15s; flex-shrink: 0;
      }
      .chr-bar-btn:active { background: rgba(255,255,255,0.1); }
      .chr-url-pill {
        flex: 1; display: flex; align-items: center; gap: 8px;
        background: var(--md-surface-container-high, #2b292d);
        border-radius: 24px; padding: 0 14px; height: 38px;
        min-width: 0; cursor: text;
        transition: background 0.15s;
      }
      .chr-url-pill:focus-within {
        background: var(--md-surface-container-high, #383640);
      }
      .chr-url-lock { color: var(--md-on-surface, #e6e1e5); opacity: 0.5; display: flex; flex-shrink: 0; }
      .chr-url-text {
        flex: 1; background: none; border: none; outline: none;
        color: var(--md-on-surface, #e6e1e5); font-size: 14px;
        font-family: 'Roboto', 'Inter', sans-serif; min-width: 0;
      }
      .chr-url-text::placeholder { color: rgba(230,225,229,0.4); }

      /* Start page */
      .chr-start {
        flex: 1; overflow-y: auto; padding: 20px 16px;
        background: var(--md-surface, #1c1b1f);
      }
      .chr-start-inner { max-width: 400px; margin: 0 auto; }
      .chr-logo-area { text-align: center; margin-bottom: 24px; padding-top: 20px; }
      .chr-logo-text {
        font-size: 28px; font-weight: 700;
        background: linear-gradient(135deg, #4285f4, #ea4335, #fbbc05, #34a853);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .chr-logo-sub { font-size: 13px; color: rgba(230,225,229,0.4); margin-top: 4px; }

      .chr-search-wrap {
        display: flex; align-items: center; gap: 10px;
        background: var(--md-surface-container-high, #2b292d);
        border-radius: 28px; padding: 0 16px; height: 48px;
        margin-bottom: 28px;
      }
      .chr-search-icon { color: rgba(230,225,229,0.4); display: flex; flex-shrink: 0; }
      .chr-search-input {
        flex: 1; background: none; border: none; outline: none;
        color: var(--md-on-surface, #e6e1e5); font-size: 15px;
        font-family: 'Roboto', 'Inter', sans-serif;
      }
      .chr-search-input::placeholder { color: rgba(230,225,229,0.35); }

      .chr-shortcuts {
        display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
        margin-bottom: 28px;
      }
      .chr-shortcut {
        display: flex; flex-direction: column; align-items: center;
        gap: 6px; cursor: pointer;
      }
      .chr-shortcut-icon {
        width: 48px; height: 48px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 18px; font-weight: 700; color: #fff;
        transition: transform 0.15s;
      }
      .chr-shortcut:active .chr-shortcut-icon { transform: scale(0.9); }
      .chr-shortcut-label {
        font-size: 11px; color: rgba(230,225,229,0.6); text-align: center;
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        max-width: 64px;
      }

      .chr-discover-label {
        font-size: 14px; font-weight: 500; color: rgba(230,225,229,0.5);
        margin-bottom: 10px;
      }
      .chr-discover-card {
        background: var(--md-surface-container-high, #2b292d);
        border-radius: var(--md-corner-lg, 16px); overflow: hidden;
      }
      .chr-discover-img {
        height: 100px;
        background: linear-gradient(135deg, #4285f4 0%, #34a853 50%, #fbbc05 100%);
        opacity: 0.3;
      }
      .chr-discover-text { padding: 14px 16px; }
      .chr-discover-title {
        font-size: 14px; font-weight: 500; color: var(--md-on-surface, #e6e1e5);
        margin-bottom: 4px;
      }
      .chr-discover-desc {
        font-size: 12px; color: rgba(230,225,229,0.4);
      }
    </style>
  `;const c=o.querySelector(".chr-content-area"),i=o.querySelector(".chr-url-text"),d=o.querySelector(".chr-btn-home"),n=o.querySelector(".chr-loading-bar");l(c,t),c.appendChild(r),i.addEventListener("keydown",e=>{e.key==="Enter"&&e.target.value.trim()&&(t.navigate(e.target.value),e.target.blur())}),i.addEventListener("focus",()=>{const e=t.getState();e.url&&(i.value=e.url),i.select()}),i.addEventListener("blur",()=>{const e=t.getState();i.value=e.isStartPage?"":e.displayUrl}),d.addEventListener("click",()=>{t.goHome(),l(c,t),c.appendChild(r)}),t.onStateChange(e=>{document.activeElement!==i&&(i.value=e.isStartPage?"":e.displayUrl),n.classList.remove("chr-loading","chr-loaded"),e.loading?n.classList.add("chr-loading"):e.url&&(n.classList.add("chr-loaded"),setTimeout(()=>n.classList.remove("chr-loaded"),400));const s=c.querySelector(".chr-start");e.isStartPage?(s||(l(c,t),c.appendChild(r)),r.style.display="none"):(s&&s.remove(),r.style.display="block")})}export{u as renderContent};
