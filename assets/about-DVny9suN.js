import{c as s,p as i,g as l}from"./index-CeLzqF6v.js";function g(){s({id:"about",title:"About Me — README.md",icon:"👤",width:620,height:520,content:e=>{e.innerHTML=`
        <div style="font-family:'JetBrains Mono',monospace;">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
            <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#10b981,#3b82f6);display:flex;align-items:center;justify-content:center;font-size:32px;flex-shrink:0;">🧑‍💻</div>
            <div>
              <h1 style="color:#fff;font-size:22px;margin-bottom:2px;">${i.name}</h1>
              <p style="color:#10b981;font-size:14px;">${i.title} @ ${i.company}</p>
              <p style="color:#666;font-size:12px;">${i.yoe} years of mass caffeinated development</p>
            </div>
          </div>

          <div style="background:rgba(0,0,0,0.25);padding:14px;border-radius:8px;margin-bottom:16px;font-size:13px;line-height:1.7;color:#aaa;">
            <p>I'm a solutions architect who thinks in systems, not just code.</p>
            <p style="margin-top:8px;">Currently leading the engineering team at EchorTech, where I've built crypto projects worth ~$50M, migrated more microservices than I can count, and mass-consumed enough coffee to concern medical professionals.</p>
            <p style="margin-top:8px;">When I'm not architecting solutions, I'm probably:</p>
            <ul style="margin-top:4px;padding-left:16px;list-style:disc;">
              <li>Arguing about tabs vs spaces (spaces, fight me)</li>
              <li>Over-engineering my personal projects</li>
              <li>Pretending to understand the Kubernetes docs</li>
              <li>Telling people "it works on my machine"</li>
            </ul>
          </div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;">
            ${a("🔥 Hot Takes")}
            ${a("🤔 Unpopular Opinions")}
            ${a("📊 Stats")}
          </div>

          <div id="about-tab-content" style="background:rgba(0,0,0,0.25);padding:14px;border-radius:8px;font-size:13px;line-height:1.7;color:#aaa;">
            ${r()}
          </div>

          <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap;">
            <a href="${i.github}" target="_blank" style="padding:6px 12px;background:rgba(255,255,255,0.04);border:1px solid #333;border-radius:6px;font-size:12px;color:#aaa;transition:all 0.15s;">🐙 GitHub</a>
            <a href="${i.linkedin}" target="_blank" style="padding:6px 12px;background:rgba(255,255,255,0.04);border:1px solid #333;border-radius:6px;font-size:12px;color:#aaa;transition:all 0.15s;">💼 LinkedIn</a>
            <a href="${i.blog}" target="_blank" style="padding:6px 12px;background:rgba(255,255,255,0.04);border:1px solid #333;border-radius:6px;font-size:12px;color:#aaa;transition:all 0.15s;">📝 Blog</a>
          </div>
        </div>
      `,e.querySelectorAll(".about-tab").forEach(t=>{t.addEventListener("click",()=>{e.querySelectorAll(".about-tab").forEach(n=>n.style.background="#1a1a1a"),t.style.background="#2a2a4e";const o=e.querySelector("#about-tab-content");t.dataset.tab==="hot-takes"?o.innerHTML=r():t.dataset.tab==="unpopular-opinions"?o.innerHTML=d():t.dataset.tab==="stats"&&(o.innerHTML=p())})}),e.querySelector(".about-tab").style.background="#2a2a4e"}})}function a(e){return`<button class="about-tab" data-tab="${e.replace(/[^a-z]/gi,"-").toLowerCase().replace(/-+/g,"-").replace(/^-|-$/g,"")}" style="padding:6px 12px;background:rgba(255,255,255,0.04);border:1px solid #333;border-radius:6px;font-size:12px;color:#ccc;cursor:pointer;">${e}</button>`}function r(){return`
    <ul style="padding-left:16px;list-style:disc;">
      <li>Microservices are just distributed monoliths with extra anxiety</li>
      <li>The best code is code you mass-delete</li>
      <li>"It works on my machine" should be a valid deployment strategy</li>
      <li>If you're not mass-deploying on Fridays, are you even living?</li>
      <li>Docker solves every problem except the one you actually have</li>
      <li>The cloud is just someone else's computer (that you mass-pay for)</li>
    </ul>
  `}function d(){return`
    <ul style="padding-left:16px;list-style:disc;">
      <li>JavaScript is actually... fine. There. I said it.</li>
      <li>Most "10x engineers" are just "1x engineers" who don't go to meetings</li>
      <li>YAML is worse than XML and I will die on this hill</li>
      <li>You don't need Kubernetes. You probably don't even need Docker.</li>
      <li>The best architecture diagram is a napkin sketch</li>
      <li>Rust's borrow checker is just a very aggressive code reviewer</li>
    </ul>
  `}function p(){return`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <div style="text-align:center;padding:12px;background:rgba(255,255,255,0.04);border-radius:8px;">
        <div style="font-size:28px;color:#10b981;font-weight:700;">${l()}+</div>
        <div style="font-size:11px;color:#666;">Years of Experience</div>
      </div>
      <div style="text-align:center;padding:12px;background:rgba(255,255,255,0.04);border-radius:8px;">
        <div style="font-size:28px;color:#3b82f6;font-weight:700;">~$50M</div>
        <div style="font-size:11px;color:#666;">Crypto Market Cap Built</div>
      </div>
      <div style="text-align:center;padding:12px;background:rgba(255,255,255,0.04);border-radius:8px;">
        <div style="font-size:28px;color:#f59e0b;font-weight:700;">30k+</div>
        <div style="font-size:11px;color:#666;">Users Scaled To</div>
      </div>
      <div style="text-align:center;padding:12px;background:rgba(255,255,255,0.04);border-radius:8px;">
        <div style="font-size:28px;color:#ef4444;font-weight:700;">∞</div>
        <div style="font-size:11px;color:#666;">Coffee Consumed</div>
      </div>
      <div style="text-align:center;padding:12px;background:rgba(255,255,255,0.04);border-radius:8px;">
        <div style="font-size:28px;color:#8b5cf6;font-weight:700;">30+</div>
        <div style="font-size:11px;color:#666;">Technologies</div>
      </div>
      <div style="text-align:center;padding:12px;background:rgba(255,255,255,0.04);border-radius:8px;">
        <div style="font-size:28px;color:#ec4899;font-weight:700;">0</div>
        <div style="font-size:11px;color:#666;">Bugs (allegedly)</div>
      </div>
    </div>
  `}export{g as open};
