import{e as h,g as u,p as s}from"./data-CMMTyLTn.js";const f=["Tell me about Arun","What's Arun's experience?","Is Arun available for hire?","What's the weather?","Set a reminder","What's 9 + 10?"],a={about:`${s.name} is a ${s.title} at ${s.company} with ${u()} years of experience. Known for mass-deploying on Fridays and mass-consuming unreasonable amounts of coffee. Currently leading engineering initiatives across frontend, backend, mobile, databases, and cloud. Basically, he does everything. And somehow it all works. Usually.`,experience:`Arun has worked at:
${h.slice(0,3).map(n=>`• ${n.title} @ ${n.company} (${n.dates})`).join(`
`)}

...and more. That's ${u()} years of mass caffeine-driven development.`,hire:`I've added "hire Arun" to your to-do list. Please follow up at ${s.email}. He's worth it. I'm an AI and even I can tell.`,weather:`Career forecast: Partly cloudy with a chance of deployments.
🌡️ 27°C (imposter syndrome humidity: 100%)
💨 Wind: Scope creep from the north

5-Day Outlook:
Mon: Sprint Planning ☀️ 24°
Tue: Prod Hotfix ⛈️ 38°
Wed: Code Review ☁️ 21°
Thu: Unclear Reqs 🌫️ ??°
Fri: Deploy Day ⚡ 42°`,reminder:`Reminder set: "Hire Arun" — Due: Yesterday.

You're already behind schedule on this one.`,math:"9 + 10 = 21. This is not a bug. This is a feature. The calculator app confirms it.",default:`I'm not sure how to help with that. But I know someone who can:

📧 ${s.email}
💼 ${s.linkedin}
🐙 ${s.github}

Or just type "tell me about Arun" to get started.`};function m(n){n.innerHTML=`
    <div style="font-family:var(--md-font,'Inter',sans-serif);display:flex;flex-direction:column;height:100%;">
      <!-- Assistant header with dots -->
      <div style="text-align:center;padding:24px 16px;">
        <div style="display:flex;justify-content:center;gap:6px;margin-bottom:16px;">
          <div style="width:10px;height:10px;border-radius:50%;background:#4285f4;animation:assistDot 1.2s ease infinite;"></div>
          <div style="width:10px;height:10px;border-radius:50%;background:#ea4335;animation:assistDot 1.2s ease 0.2s infinite;"></div>
          <div style="width:10px;height:10px;border-radius:50%;background:#fbbc05;animation:assistDot 1.2s ease 0.4s infinite;"></div>
          <div style="width:10px;height:10px;border-radius:50%;background:#34a853;animation:assistDot 1.2s ease 0.6s infinite;"></div>
        </div>
        <div style="font-size:20px;color:var(--md-on-surface,#e6e1e5);font-weight:400;">Hi, how can I help?</div>
      </div>

      <!-- Chat area -->
      <div id="assistant-chat" style="flex:1;overflow-y:auto;padding:0 16px;display:flex;flex-direction:column;gap:12px;"></div>

      <!-- Suggestions -->
      <div id="assistant-suggestions" style="padding:12px 16px;display:flex;flex-wrap:wrap;gap:8px;">
        ${f.map(t=>`
          <button class="assist-suggestion" style="padding:8px 16px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:20px;color:var(--md-on-surface,#e6e1e5);font-size:13px;cursor:pointer;font-family:inherit;">${t}</button>
        `).join("")}
      </div>

      <!-- Input -->
      <div style="padding:12px 16px;display:flex;gap:8px;">
        <input type="text" id="assistant-input" placeholder="Ask me anything..." style="flex:1;padding:12px 16px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:24px;color:var(--md-on-surface,#e6e1e5);font-size:14px;font-family:inherit;outline:none;" />
        <button id="assistant-send" style="width:44px;height:44px;border-radius:50%;background:var(--md-primary,#80cbc4);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#003731"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
    <style>
      @keyframes assistDot {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
    </style>
  `;const l=n.querySelector("#assistant-chat"),r=n.querySelector("#assistant-input"),p=n.querySelector("#assistant-send");function o(t){c(l,t,!0);const e=t.toLowerCase();let i;e.includes("about")||e.includes("who")||e.includes("tell me")?i=a.about:e.includes("experience")||e.includes("work")||e.includes("career")?i=a.experience:e.includes("hire")||e.includes("available")||e.includes("job")?i=a.hire:e.includes("weather")||e.includes("forecast")?i=a.weather:e.includes("reminder")||e.includes("remind")?i=a.reminder:e.includes("9")&&e.includes("10")?i=a.math:i=a.default,setTimeout(()=>c(l,i,!1),500+Math.random()*500)}function c(t,e,i){const d=document.createElement("div");d.style.cssText=`max-width:85%;padding:12px 16px;border-radius:16px;font-size:14px;line-height:1.6;white-space:pre-line;${i?"align-self:flex-end;background:var(--md-primary-container,#00504a);color:var(--md-on-primary-container,#a2f2e8);border-bottom-right-radius:4px;":"align-self:flex-start;background:var(--md-surface-container-high,#2b292d);color:var(--md-on-surface,#e6e1e5);border-bottom-left-radius:4px;"}`,d.textContent=e,t.appendChild(d),t.scrollTop=t.scrollHeight}n.querySelectorAll(".assist-suggestion").forEach(t=>{t.addEventListener("click",()=>{o(t.textContent),n.querySelector("#assistant-suggestions").style.display="none"})}),p.addEventListener("click",()=>{const t=r.value.trim();t&&(o(t),r.value="")}),r.addEventListener("keydown",t=>{if(t.key==="Enter"){const e=r.value.trim();if(!e)return;o(e),r.value=""}})}function x(){m(document.createElement("div"))}export{x as open,m as renderContent};
