import{c as i}from"./window-manager-Cm3UCJuh.js";import{p as o}from"./data-CMMTyLTn.js";function r(e){e.style.cssText="padding:0;font-size:13px;display:flex;flex-direction:column;",e.innerHTML=`
        <div style="padding:12px 16px;background:rgba(0,0,0,0.25);border-bottom:1px solid #222;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <span style="color:#666;width:40px;">To:</span>
            <span style="color:#10b981;">${o.email}</span>
            <span style="color:#444;font-size:11px;">(read-only, obviously)</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="color:#666;width:40px;">Subj:</span>
            <input id="contact-subject" type="text" placeholder="Type or pick a suggestion..." style="flex:1;background:rgba(255,255,255,0.04);border:1px solid #333;border-radius:4px;padding:6px 10px;color:#ccc;font-family:inherit;font-size:13px;outline:none;" />
          </div>
          <div id="subject-suggestions" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
            ${["Job Opportunity","Freelance Gig","You're a Genius","Found a Bug (unlikely)","Want to Collaborate","Just Saying Hi"].map(t=>`<button class="subject-btn" style="padding:3px 10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;font-size:11px;color:#888;cursor:pointer;font-family:inherit;">${t}</button>`).join("")}
          </div>
        </div>
        <textarea id="contact-body" placeholder="Write your message here...

(This will open your email client. I won't read your mind. Yet.)" style="flex:1;background:#0d0d1a;border:none;padding:16px;color:#ccc;font-family:inherit;font-size:13px;resize:none;outline:none;line-height:1.6;"></textarea>
        <div style="padding:8px 16px;background:rgba(0,0,0,0.25);border-top:1px solid #222;display:flex;justify-content:space-between;align-items:center;">
          <button id="send-btn" style="padding:8px 20px;background:#10b981;color:#000;border-radius:6px;font-weight:600;font-size:13px;font-family:inherit;cursor:pointer;">Send ✉️</button>
          <div style="display:flex;gap:12px;">
            <a href="${o.linkedin}" target="_blank" style="color:#666;font-size:12px;">💼 LinkedIn</a>
            <a href="${o.github}" target="_blank" style="color:#666;font-size:12px;">🐙 GitHub</a>
            <a href="/resume.pdf" target="_blank" style="color:#666;font-size:12px;">📄 Resume</a>
          </div>
        </div>
      `,e.querySelectorAll(".subject-btn").forEach(t=>{t.addEventListener("click",()=>{e.querySelector("#contact-subject").value=t.textContent})}),e.querySelector("#send-btn").addEventListener("click",()=>{const t=e.querySelector("#contact-subject").value||"Hello from ArunOS",n=e.querySelector("#contact-body").value||"";window.open(`mailto:${o.email}?subject=${encodeURIComponent(t)}&body=${encodeURIComponent(n)}`)})}function s(){i({id:"contact",title:"Mail — New Message",icon:"📧",width:550,height:420,content:e=>r(e)})}export{s as open,r as renderContent};
