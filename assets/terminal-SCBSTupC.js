import{c as v}from"./window-manager-Cm3UCJuh.js";import{g as f,p,e as h,s as w,f as $}from"./data-CMMTyLTn.js";import"./registry-35ogkw64.js";import"./index-BPVmKUjw.js";import"./console-easter-egg-Ch-v8MMI.js";function k(s,e={}){const o=e.promptHost||"portfolio";s.style.cssText='padding:0;background:#0d0d1a;font-family:"JetBrains Mono",monospace;font-size:13px;display:flex;flex-direction:column;',s.innerHTML=`
        <div id="term-output" style="flex:1;overflow-y:auto;padding:12px;line-height:1.7;"></div>
        <div style="display:flex;align-items:center;padding:8px 12px;border-top:1px solid #1a1a1a;flex-shrink:0;">
          <span style="color:#10b981;margin-right:8px;white-space:nowrap;">arun@${o}:~$</span>
          <input id="term-input" type="text" autocomplete="off" spellcheck="false" style="flex:1;background:none;border:none;color:#ccc;font-family:inherit;font-size:13px;outline:none;" />
        </div>
      `;const t=s.querySelector("#term-output"),a=s.querySelector("#term-input");let r=[],l=-1,d="~";n(t,`<span style="color:#10b981;">Welcome to ArunOS Terminal v${f()}</span>
<span style="color:#666;">Type 'help' to see commands, or just start typing random stuff. I won't judge.</span>
`),a.addEventListener("keydown",i=>{if(i.key==="Enter"){const y=a.value.trim();if(!y)return;r.unshift(y),l=-1,n(t,`<span style="color:#10b981;">arun@${o}:${d}$</span> ${c(y)}`),S(y,t),a.value="",t.scrollTop=t.scrollHeight}else if(i.key==="ArrowUp")i.preventDefault(),l<r.length-1&&(l++,a.value=r[l]);else if(i.key==="ArrowDown")i.preventDefault(),l>0?(l--,a.value=r[l]):(l=-1,a.value="");else if(i.key==="Tab"){i.preventDefault();const y=a.value,u=Object.keys(m).filter(g=>g.startsWith(y));u.length===1&&(a.value=u[0]+" ")}}),s.addEventListener("click",()=>a.focus()),setTimeout(()=>a.focus(),100)}function C(){v({id:"terminal",title:"Terminal",icon:"🖥️",width:700,height:480,content:s=>k(s)})}function n(s,e){const o=document.createElement("div");o.innerHTML=e,s.appendChild(o),s.scrollTop=s.scrollHeight}function c(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const m={help:(s,e)=>{n(e,`<span style="color:#888;">
Available commands:
  <span style="color:#10b981;">about</span>          Who am I (the short version)
  <span style="color:#10b981;">neofetch</span>       System info (it's actually about me)
  <span style="color:#10b981;">experience</span>     Work history (it's a lot)
  <span style="color:#10b981;">skills</span>         What I'm good at (allegedly)
  <span style="color:#10b981;">projects</span>       Things I've built
  <span style="color:#10b981;">contact</span>        How to reach me
  <span style="color:#10b981;">resume</span>         Download my resume
  <span style="color:#10b981;">git log</span>        Career as git commits
  <span style="color:#10b981;">ls</span>             List stuff
  <span style="color:#10b981;">cat</span>            Read stuff
  <span style="color:#10b981;">whoami</span>         Identity crisis resolver
  <span style="color:#10b981;">uptime</span>         How long I've been at this
  <span style="color:#10b981;">clear</span>          Clean up
  <span style="color:#10b981;">sudo</span>           Nice try
  <span style="color:#10b981;">coffee</span>         Essential fuel
  <span style="color:#10b981;">exit</span>           You can't leave
</span>`)},whoami:(s,e)=>{n(e,`<span style="color:#fff;">${p.name}</span> <span style="color:#666;">— ${p.title} @ ${p.company}</span>
<span style="color:#555;">Also known as: "that guy who mass-deploys on Fridays"</span>`)},about:(s,e)=>{n(e,`<span style="color:#fff;">${p.name}</span>
<span style="color:#10b981;">${p.title} @ ${p.company}</span>
<span style="color:#888;">${p.yoe} YOE | Full Stack | AWS | DevOps | Blockchain
Currently leading the engineering team. Building things that scale.
Previously: mass-built crypto platforms worth ~$50M, mass-migrated 10+ microservices,
and mass-consumed mass amounts of coffee.</span>`)},neofetch:(s,e)=>{n(e,`<pre style="color:#888;">
  <span style="color:#10b981;">       .---.        </span>  <span style="color:#fff;">arun</span>@<span style="color:#fff;">portfolio</span>
  <span style="color:#10b981;">      /     \\       </span>  ──────────────────
  <span style="color:#10b981;">      \\.@-@./       </span>  <span style="color:#10b981;">OS:</span>       Solutions Architect v${f()}
  <span style="color:#10b981;">      /\`\\_/\`\\       </span>  <span style="color:#10b981;">Host:</span>     Echor Tech
  <span style="color:#10b981;">     //  _  \\\\      </span>  <span style="color:#10b981;">Kernel:</span>   Full Stack Engineering
  <span style="color:#10b981;">    | \\     )|_     </span>  <span style="color:#10b981;">Uptime:</span>   ${f()} years (and mass counting)
  <span style="color:#10b981;">   /\`\\_\`>  <_/ \\    </span>  <span style="color:#10b981;">Packages:</span> 30+ technologies installed
  <span style="color:#10b981;">   \\__/'---'\\__/    </span>  <span style="color:#10b981;">Shell:</span>    coffee-driven-dev
                       <span style="color:#10b981;">Editor:</span>   VS Code (with mass extensions)
                       <span style="color:#10b981;">Terminal:</span>  This one (obviously)
                       <span style="color:#10b981;">CPU:</span>      Problem Solving @ 3.8GHz
                       <span style="color:#10b981;">Memory:</span>   JNTUH CSE, B.Tech
                       <span style="color:#10b981;">Disk:</span>     90% node_modules
</pre>`)},experience:(s,e)=>{const o=h.map(t=>`  <span style="color:#f59e0b;">${t.year}</span>  <span style="color:#fff;">${t.title}</span> <span style="color:#666;">@ ${t.company}</span>  <span style="color:#555;">(${t.dates})</span>`).join(`
`);n(e,`<span style="color:#888;">Career Timeline (newest first):
${o}

Type 'git log' for the dramatic version.</span>`)},skills:(s,e)=>{const o=Object.entries(w).map(([t,a])=>`  <span style="color:#10b981;">${t}:</span> ${a.join(", ")}`).join(`
`);n(e,`<span style="color:#888;">${o}</span>`)},projects:(s,e)=>{n(e,`<span style="color:#888;">
  <span style="color:#3b82f6;">📁 crypto-platform/</span>   VC-backed decentralized creator platform (~$50M mcap)
  <span style="color:#3b82f6;">📁 landwey/</span>           Scaled to 30k+ users. Infrastructure: optimized.
  <span style="color:#3b82f6;">📁 trading-bot/</span>       Advanced trading automation. Real-time algorithms.
  <span style="color:#3b82f6;">📁 content-platform/</span>  Multi-media marketing with crypto incentives + AI/ML
  <span style="color:#3b82f6;">📁 employee-mgmt/</span>     Internal system, 10k+ users (at GGK Tech)

Use 'ls projects/' to browse or double-click Projects on the desktop.</span>`)},contact:(s,e)=>{n(e,`<span style="color:#888;">
  <span style="color:#10b981;">📧 Email:</span>    <a href="mailto:${p.email}" style="color:#3b82f6;">${p.email}</a>
  <span style="color:#10b981;">💼 LinkedIn:</span> <a href="${p.linkedin}" target="_blank" style="color:#3b82f6;">linkedin.com/in/arunmunaganti</a>
  <span style="color:#10b981;">🐙 GitHub:</span>   <a href="${p.github}" target="_blank" style="color:#3b82f6;">github.com/arunsai63</a>
  <span style="color:#10b981;">🌐 Portfolio:</span> <a href="${p.portfolio}" target="_blank" style="color:#3b82f6;">arunsai63.github.io/portfolio</a>

Or just yell into the void. I'll probably hear you.</span>`)},resume:(s,e)=>{n(e,`<span style="color:#10b981;">Downloading resume...</span>
<span style="color:#888;">Just kidding, opening in new tab. You mass have a PDF viewer, right?</span>`),setTimeout(()=>window.open("/resume.pdf","_blank"),500)},clear:(s,e)=>{e.innerHTML=""},uptime:(s,e)=>{n(e,`<span style="color:#888;">${f()} years, mass counting.
Last mass reboot: never (I don't believe in work-life balance)
Load average: high, higher, highest</span>`)},exit:(s,e)=>{n(e,`<span style="color:#ef4444;">Error: You can't leave. This is a website.</span>
<span style="color:#555;">I mean, you CAN close the tab. But can you mass really?</span>`)},coffee:(s,e)=>{n(e,`<pre style="color:#f59e0b;">
    ( (
     ) )
  ........
  |      |]
  \\      /
   \`----'

Brewing... ☕ done.
Caffeine levels: RESTORED.
Productivity: QUESTIONABLE.
</pre>`)},ls:(s,e)=>{const o=s[0]||"~",t=b(o);if(!t||t.type!=="dir"){n(e,`<span style="color:#ef4444;">ls: cannot access '${c(o)}': No such directory</span>`);return}const a=Object.entries(t.children).map(([r,l])=>l.type==="dir"?`<span style="color:#3b82f6;">${r}/</span>`:`<span style="color:#ccc;">${r}</span>`);n(e,a.join("  "))},cat:(s,e)=>{const o=s[0];if(!o){n(e,'<span style="color:#ef4444;">cat: missing file operand</span>');return}const t=b(o);if(!t||t.type!=="file"){n(e,`<span style="color:#ef4444;">cat: ${c(o)}: No such file</span>`);return}n(e,`<span style="color:#888;">${c(t.content)}</span>`)},pwd:(s,e)=>{n(e,"/home/arun")},sudo:(s,e)=>{const o=s.join(" ");o.startsWith("hire")?n(e,`<span style="color:#10b981;">[sudo] Verifying credentials...
Permission granted. ✅
Sending offer letter to ${p.email}...
Just kidding. But seriously, you should.</span>`):o.startsWith("rm")?n(e,`<span style="color:#ef4444;">Permission denied: You cannot delete ${f()} years of experience.
Also, I have mass backups. Unlike your last client. 😏</span>`):n(e,`<span style="color:#ef4444;">[sudo] You're not in the sudoers file. This incident will be reported.
...to no one. I don't even have a sysadmin.</span>`)},rm:(s,e)=>{s.join(" ").includes("-rf")?n(e,`<span style="color:#ef4444;">Nice try. I'm not falling for that again.
Last time I lost all my Kubernetes configs. 😤</span>`):n(e,'<span style="color:#ef4444;">rm: permission denied (this is a portfolio, not a playground)</span>')},git:(s,e)=>{if(s[0]==="log"){const o=h.map((t,a)=>`<span style="color:#f59e0b;">* ${Math.random().toString(16).substr(2,7)}</span>${a===0?' <span style="color:#10b981;">(HEAD -> career)</span>':""} <span style="color:#fff;">${t.title}</span> <span style="color:#666;">(${t.dates})</span>
<span style="color:#555;">|   ${t.company} — ${t.bullets[0]}</span>`).join(`
<span style="color:#555;">|</span>
`);n(e,`<pre>${o}</pre>`)}else s[0]==="status"?n(e,`<span style="color:#888;">On branch <span style="color:#10b981;">career</span>
Your branch is ahead of 'origin/junior-dev' by 6 commits.
  (use "git push" to share your mass awesomeness)

Changes to be committed:
  <span style="color:#10b981;">modified:   skills/cloud.txt</span> (leveled up)
  <span style="color:#10b981;">modified:   experience/echortech.md</span> (promoted)
  <span style="color:#ef4444;">deleted:    imposter-syndrome.txt</span> (finally)</span>`):n(e,`<span style="color:#888;">git: '${c(s[0]||"")}' is not a git command. Try 'git log' or 'git status'.</span>`)},matrix:(s,e)=>{n(e,'<span style="color:#10b981;">Entering the Matrix...</span>');const o=document.createElement("div");o.style.cssText="position:fixed;inset:0;background:#000;z-index:999999;overflow:hidden;";const t=document.createElement("canvas");o.appendChild(t),document.body.appendChild(o),t.width=window.innerWidth,t.height=window.innerHeight;const a=t.getContext("2d"),r=Math.floor(t.width/14),l=Array(r).fill(1),d=setInterval(()=>{a.fillStyle="rgba(0,0,0,0.05)",a.fillRect(0,0,t.width,t.height),a.fillStyle="#10b981",a.font="14px JetBrains Mono";for(let i=0;i<l.length;i++){const y=String.fromCharCode(12448+Math.random()*96);a.fillText(y,i*14,l[i]*14),l[i]*14>t.height&&Math.random()>.975&&(l[i]=0),l[i]++}},33);o.addEventListener("click",()=>{clearInterval(d),o.remove()}),setTimeout(()=>{clearInterval(d),o.remove()},5e3)},ping:(s,e)=>{const o=s[0]||"localhost";n(e,`<span style="color:#888;">PING ${c(o)} (127.0.0.1): 56 data bytes
64 bytes from ${c(o)}: time=0ms (always responsive)
64 bytes from ${c(o)}: time=0ms (still responsive)

--- ${c(o)} ping statistics ---
Why are you pinging ${c(o)} from my portfolio? Focus.</span>`)},vim:(s,e)=>{n(e,`<span style="color:#ef4444;">Error: Real developers use VS Code.
Just kidding. Use whatever makes you mass happy.
(But seriously, VS Code.)</span>`)},man:(s,e)=>{s[0]==="arun"||!s[0]?n(e,`<pre style="color:#888;">
<span style="color:#fff;">ARUN(1)                    ArunOS Manual                    ARUN(1)</span>

<span style="color:#f59e0b;">NAME</span>
       arun - solutions architect, mass coffee enthusiast

<span style="color:#f59e0b;">SYNOPSIS</span>
       arun [--hire] [--collaborate] [--coffee]

<span style="color:#f59e0b;">DESCRIPTION</span>
       Arun is a solutions architect with ${p.yoe} years of
       experience in building things that scale and occasionally
       work on the first try. Known for mass-deploying on Fridays
       and mass-consuming unreasonable amounts of coffee.

<span style="color:#f59e0b;">OPTIONS</span>
       --hire          Send job offer (recommended)
       --collaborate   Propose a project
       --coffee        Buy him a coffee (always accepted)

<span style="color:#f59e0b;">BUGS</span>
       None. Only undocumented features.

<span style="color:#f59e0b;">SEE ALSO</span>
       github.com/arunsai63, linkedin.com/in/arunmunaganti
</pre>`):n(e,`<span style="color:#ef4444;">No manual entry for ${c(s[0])}. Try 'man arun'.</span>`)},cowsay:(s,e)=>{const o=s.join(" ")||"hire me",t="-".repeat(o.length+2);n(e,`<pre style="color:#888;">
 ${t}
< ${c(o)} >
 ${t}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
</pre>`)},fortune:(s,e)=>{const o=['"The best code is no code." — Every architect who deleted a service','"It works on my machine." — The last words before a production incident',`"We'll fix it in the next sprint." — Said every sprint, every team, everywhere`,'"This should be a quick fix." — Narrator: It was not a quick fix.',`"Let's not over-engineer this." — Proceeds to build a microservice mesh`,'"The documentation is self-explanatory." — The documentation:',`"Premature optimization is the root of all evil." — But mass-cached Redis is just... chef's kiss`,`"I'll add tests later." — Narrator: Tests were never added.`,'"Works on my machine" is technically a valid deployment strategy if your machine IS the server.'];n(e,`<span style="color:#f59e0b;">${o[Math.floor(Math.random()*o.length)]}</span>`)},date:(s,e)=>{n(e,`<span style="color:#888;">${new Date().toString()}</span>
<span style="color:#555;">Fun fact: it's always mass deploy o'clock somewhere.</span>`)},echo:(s,e)=>{n(e,`<span style="color:#888;">${c(s.join(" "))}</span>`)},konami:(s,e)=>{n(e,`<span style="color:#10b981;">🎮 ↑↑↓↓←→←→BA — Konami code activated!</span>
<span style="color:#888;">Achievement unlocked: "knows the classics"
You've earned... absolutely nothing. But the nostalgia is priceless.</span>`)},docker:(s,e)=>{s[0]==="ps"?n(e,`<span style="color:#888;">CONTAINER ID   IMAGE                STATUS         PORTS                  NAMES
a1b2c3d4e5f6   arun/portfolio:v${f()}   Up 24/7        0.0.0.0:443->443/tcp   this-website
f6e5d4c3b2a1   arun/brain:latest     Up ${f()}y        0.0.0.0:*->*/tcp       always-thinking
1234abcd5678   arun/coffee:∞         Up forever     0.0.0.0:☕->☕/tcp    essential-service</span>`):n(e,`<span style="color:#888;">docker: '${c(s[0]||"")}' try 'docker ps' to see running containers.</span>`)},htop:(s,e)=>{n(e,`<pre style="color:#888;">
<span style="color:#10b981;">  CPU[||||||||||||||||||||    87%]</span>  Tasks: 47, running
<span style="color:#3b82f6;">  MEM[||||||||||||||         65%]</span>  Load avg: too high

  PID  PROCESS              CPU%   MEM    STATUS
  001  <span style="color:#10b981;">solutions-architect</span>  110%   ALL    <span style="color:#10b981;">RUNNING</span>
  002  <span style="color:#f59e0b;">overthinking</span>          89%   4.2G   <span style="color:#f59e0b;">RUNNING</span>
  003  <span style="color:#ef4444;">imposter-syndrome</span>     67%   3.1G   <span style="color:#ef4444;">RUNNING</span>
  004  <span style="color:#3b82f6;">coffee-intake</span>         99%   ∞      <span style="color:#3b82f6;">CRITICAL</span>
  005  actual-work           12%   1.0G   SLEEPING
  006  stackoverflow         45%   2.0G   RUNNING (always)
  007  debugging             78%   3.5G   RUNNING
  008  meetings              95%   0.1G   WASTING RESOURCES
</pre>`)},npm:(s,e)=>{s[0]==="install"?n(e,`<span style="color:#888;">Installing ${s.slice(1).join(" ")||"everything"}...
added 847 packages in 47s
<span style="color:#f59e0b;">23 vulnerabilities (2 moderate, 21 "it's fine")</span>
node_modules size: ∞</span>`):n(e,`<span style="color:#888;">npm: try 'npm install' for the full experience</span>`)}};function S(s,e,o,t){const a=s.split(/\s+/),r=a[0].toLowerCase(),l=a.slice(1);if(r==="git"){m.git(l,e);return}if(r==="sudo"){m.sudo(l,e);return}if(m[r])m[r](l,e);else{const d=Object.keys(m).filter(i=>i.startsWith(r.charAt(0)));n(e,`<span style="color:#ef4444;">Command not found: '${c(r)}'</span>
<span style="color:#555;">${d.length?`Did you mean: ${d.slice(0,3).join(", ")}?`:"Type 'help' to see available commands."}</span>`)}}function b(s){const e=s.replace(/^~\/?/,"").replace(/\/+$/,"");let o=$["~"];if(!e)return o;const t=e.split("/");for(const a of t){if(!o||o.type!=="dir"||!o.children[a])return null;o=o.children[a]}return o}export{C as open,k as renderContent};
