import{c as p,s as l}from"./index-BwLrzomA.js";function u(){p({id:"skills",title:"Skills.txt — Notepad",icon:"⚡",width:600,height:480,content:e=>{e.style.cssText='padding:0;display:flex;flex-direction:column;font-family:"JetBrains Mono",monospace;',e.innerHTML=`
        <div style="padding:4px 12px;background:#121212;border-bottom:1px solid #222;font-size:11px;color:#666;display:flex;gap:16px;">
          <span>File</span><span>Edit</span><span>Format</span><span style="cursor:pointer;color:#10b981;" id="skills-view-toggle">View: 📝 Text → 📊 Visual</span>
        </div>
        <div id="skills-content" style="flex:1;overflow-y:auto;padding:16px;font-size:13px;line-height:1.7;"></div>
      `;let i=!1;const t=e.querySelector("#skills-content"),s=e.querySelector("#skills-view-toggle");r(t),s.addEventListener("click",()=>{i=!i,s.textContent=i?"View: 📊 Visual → 📝 Text":"View: 📝 Text → 📊 Visual",i?c(t):r(t)})}})}function r(e){const i=Object.entries(l).map(([t,s])=>`<span style="color:#10b981;"># ${t.toUpperCase()}</span>
${s.map(o=>`  - ${o}`).join(`
`)}`).join(`

`);e.innerHTML=`<pre style="color:#aaa;white-space:pre-wrap;">${i}

<span style="color:#555;"># NOTE: This list is non-exhaustive.
# New skills acquired approximately every mass sprint.
# Old skills deprecated approximately never.
# Skills marked * are mass overrepresented in my imposter syndrome.</span></pre>`}function c(e){const i=Object.entries(l);e.innerHTML=`
    <div style="display:flex;flex-direction:column;gap:20px;">
      ${i.map(([t,s])=>`
        <div>
          <div style="font-size:12px;color:#10b981;margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;">${t}</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            ${s.map(o=>{const n=d(o),a=n>85?"#10b981":n>70?"#3b82f6":n>55?"#f59e0b":"#8b5cf6";return`
                <div style="background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:8px 12px;position:relative;overflow:hidden;cursor:default;" title="${o}: ${n}% proficiency">
                  <div style="position:absolute;bottom:0;left:0;height:3px;background:${a};width:${n}%;border-radius:0 2px 0 0;transition:width 1s;"></div>
                  <span style="color:#ccc;font-size:12px;">${o}</span>
                </div>`}).join("")}
          </div>
        </div>
      `).join("")}
    </div>
    <p style="color:#555;font-size:11px;margin-top:16px;text-align:center;">Proficiency bars are self-assessed and definitely not mass inflated. Definitely.</p>
  `}function d(e){return{Python:92,"Node.js":88,Rust:65,"C#":82,TypeScript:87,JavaScript:90,React:90,"Next.js":80,Svelte:70,HTML:95,CSS:88,AWS:93,Azure:60,Docker:88,"CloudFormation (IaC)":82,Linux:85,Serverless:82,Microservices:85,MongoDB:85,PostgreSQL:88,MySQL:80,DynamoDB:78,DocumentDB:72,Aurora:70,Redis:85,Kafka:80,RabbitMQ:75,SQS:78,"Azure Service Bus":60,"CI/CD":85,"GitHub Actions":82,"New Relic":75,Security:78,Solidity:75,Web3:78,Blockchain:80,Quant:60,LLM:65,Git:90}[e]||70}export{u as open};
