import{c as n}from"./window-manager-Cm3UCJuh.js";import{p as t,g as l}from"./data-CMMTyLTn.js";function d(a){a.innerHTML=`
    <div class="abt">
      <!-- Hero -->
      <div class="abt-hero">
        <div class="abt-avatar">
          <div class="abt-avatar-ring">
            <div class="abt-avatar-inner">🧑‍💻</div>
          </div>
          <div class="abt-status-dot"></div>
        </div>
        <div class="abt-name">${t.name}</div>
        <div class="abt-title">${t.title}</div>
        <div class="abt-company">@ ${t.company} &middot; ${t.yoe}y</div>
        <div class="abt-links">
          <a href="${t.github}" target="_blank" class="abt-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="${t.linkedin}" target="_blank" class="abt-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="${t.blog}" target="_blank" class="abt-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </a>
          <a href="mailto:${t.email}" class="abt-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </a>
        </div>
      </div>

      <!-- Bio -->
      <div class="abt-bio">
        I'm a solutions architect who thinks in systems, not just code. Currently leading engineering at EchorTech — built crypto platforms worth ~$50M, migrated more microservices than I can count, mass-consumed enough coffee to concern medical professionals.
      </div>

      <!-- Tabs -->
      <div class="abt-tabs">
        <button class="abt-tab abt-tab-active" data-tab="hot-takes">Hot Takes</button>
        <button class="abt-tab" data-tab="unpopular-opinions">Opinions</button>
        <button class="abt-tab" data-tab="stats">Stats</button>
        <button class="abt-tab" data-tab="quirks">Quirks</button>
      </div>

      <div class="abt-tab-content" id="about-tab-content">
        ${o()}
      </div>
    </div>

    <style>
      .abt { font-family: 'Inter', -apple-system, sans-serif; overflow-y: auto; }

      .abt-hero {
        display: flex; flex-direction: column; align-items: center;
        padding: 28px 20px 20px;
        background: linear-gradient(180deg, rgba(16,185,129,0.08) 0%, transparent 100%);
      }
      .abt-avatar { position: relative; margin-bottom: 14px; }
      .abt-avatar-ring {
        width: 80px; height: 80px; border-radius: 50%;
        background: linear-gradient(135deg, #10b981, #3b82f6);
        padding: 3px;
      }
      .abt-avatar-inner {
        width: 100%; height: 100%; border-radius: 50%;
        background: #1a1a2e;
        display: flex; align-items: center; justify-content: center;
        font-size: 36px;
      }
      .abt-status-dot {
        position: absolute; bottom: 4px; right: 4px;
        width: 14px; height: 14px; border-radius: 50%;
        background: #10b981; border: 3px solid #1a1a2e;
      }
      .abt-name { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 2px; }
      .abt-title { font-size: 14px; font-weight: 500; color: #10b981; }
      .abt-company { font-size: 12px; color: #666; margin-top: 2px; }
      .abt-links {
        display: flex; gap: 8px; margin-top: 14px;
      }
      .abt-link {
        width: 36px; height: 36px; border-radius: 50%;
        background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);
        display: flex; align-items: center; justify-content: center;
        color: #888; text-decoration: none; transition: all 0.2s;
      }
      .abt-link:hover { background: rgba(255,255,255,0.12); color: #fff; border-color: rgba(255,255,255,0.15); }

      .abt-bio {
        padding: 16px 20px;
        font-size: 13px; line-height: 1.7; color: #999;
        border-bottom: 1px solid rgba(255,255,255,0.05);
      }

      .abt-tabs {
        display: flex; padding: 0 16px;
        border-bottom: 1px solid rgba(255,255,255,0.06);
        overflow-x: auto;
      }
      .abt-tab {
        padding: 12px 16px; font-size: 12px; font-weight: 600;
        color: #666; background: none; border: none;
        border-bottom: 2px solid transparent;
        cursor: pointer; font-family: inherit; white-space: nowrap;
        transition: color 0.2s, border-color 0.2s;
      }
      .abt-tab:hover { color: #aaa; }
      .abt-tab-active { color: #10b981; border-bottom-color: #10b981; }

      .abt-tab-content {
        padding: 16px 20px;
        font-size: 13px; line-height: 1.8; color: #aaa;
        animation: abtFadeIn 0.25s ease;
      }
      @keyframes abtFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }

      .abt-tab-content ul { padding-left: 18px; list-style: none; }
      .abt-tab-content li { position: relative; padding-left: 4px; margin-bottom: 6px; }
      .abt-tab-content li::before {
        content: ''; position: absolute; left: -14px; top: 9px;
        width: 5px; height: 5px; border-radius: 50%;
        background: #10b981;
      }

      .abt-stats-grid {
        display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;
      }
      .abt-stat {
        text-align: center; padding: 16px 8px;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.05);
        border-radius: 12px; transition: border-color 0.2s;
      }
      .abt-stat:hover { border-color: rgba(255,255,255,0.1); }
      .abt-stat-val { font-size: 28px; font-weight: 700; line-height: 1.2; }
      .abt-stat-label { font-size: 11px; color: #555; margin-top: 4px; }

      .abt-quirk-list { display: flex; flex-direction: column; gap: 8px; }
      .abt-quirk {
        display: flex; align-items: flex-start; gap: 10px;
        padding: 10px 12px; background: rgba(255,255,255,0.02);
        border-radius: 10px; border: 1px solid rgba(255,255,255,0.04);
      }
      .abt-quirk-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
      .abt-quirk-text { font-size: 12px; color: #999; line-height: 1.5; }
    </style>
  `,a.querySelectorAll(".abt-tab").forEach(s=>{s.addEventListener("click",()=>{a.querySelectorAll(".abt-tab").forEach(r=>{r.classList.remove("abt-tab-active")}),s.classList.add("abt-tab-active");const i=a.querySelector("#about-tab-content"),e=s.dataset.tab;e==="hot-takes"?i.innerHTML=o():e==="unpopular-opinions"?i.innerHTML=b():e==="stats"?i.innerHTML=c():e==="quirks"&&(i.innerHTML=p())})})}function g(){n({id:"about",title:"About Me — README.md",icon:"👤",width:520,height:560,content:a=>d(a)})}function o(){return`<ul>
    <li>Microservices are just distributed monoliths with extra anxiety</li>
    <li>The best code is code you delete</li>
    <li>"It works on my machine" should be a valid deployment strategy</li>
    <li>If you're not deploying on Fridays, are you even living?</li>
    <li>Docker solves every problem except the one you actually have</li>
    <li>The cloud is just someone else's computer that you overpay for</li>
  </ul>`}function b(){return`<ul>
    <li>JavaScript is actually... fine. There. I said it.</li>
    <li>Most "10x engineers" are just 1x engineers who skip meetings</li>
    <li>YAML is worse than XML and I will die on this hill</li>
    <li>You don't need Kubernetes. You probably don't even need Docker.</li>
    <li>The best architecture diagram is a napkin sketch</li>
    <li>Rust's borrow checker is just a very aggressive code reviewer</li>
  </ul>`}function c(){return`<div class="abt-stats-grid">
    <div class="abt-stat"><div class="abt-stat-val" style="color:#10b981;">${l()}+</div><div class="abt-stat-label">Years of Experience</div></div>
    <div class="abt-stat"><div class="abt-stat-val" style="color:#3b82f6;">~$50M</div><div class="abt-stat-label">Crypto Market Cap</div></div>
    <div class="abt-stat"><div class="abt-stat-val" style="color:#f59e0b;">30k+</div><div class="abt-stat-label">Users Scaled To</div></div>
    <div class="abt-stat"><div class="abt-stat-val" style="color:#ef4444;">&infin;</div><div class="abt-stat-label">Coffee Consumed</div></div>
    <div class="abt-stat"><div class="abt-stat-val" style="color:#8b5cf6;">30+</div><div class="abt-stat-label">Technologies</div></div>
    <div class="abt-stat"><div class="abt-stat-val" style="color:#ec4899;">0</div><div class="abt-stat-label">Bugs (allegedly)</div></div>
  </div>`}function p(){return`<div class="abt-quirk-list">
    <div class="abt-quirk"><span class="abt-quirk-icon">⌨️</span><div class="abt-quirk-text">Spaces over tabs. Fight me.</div></div>
    <div class="abt-quirk"><span class="abt-quirk-icon">🏗️</span><div class="abt-quirk-text">Will over-engineer personal projects "for fun" and regret it 3 sprints later.</div></div>
    <div class="abt-quirk"><span class="abt-quirk-icon">📖</span><div class="abt-quirk-text">Pretends to understand the Kubernetes docs. Nobody actually does.</div></div>
    <div class="abt-quirk"><span class="abt-quirk-icon">🚀</span><div class="abt-quirk-text">Deploys on Fridays. Sleeps fine. (Lies.)</div></div>
    <div class="abt-quirk"><span class="abt-quirk-icon">☕</span><div class="abt-quirk-text">Coffee intake correlates directly with code quality. Inversely.</div></div>
    <div class="abt-quirk"><span class="abt-quirk-icon">💻</span><div class="abt-quirk-text">"It works on my machine" — certified deployment strategy since 2019.</div></div>
  </div>`}export{g as open,d as renderContent};
