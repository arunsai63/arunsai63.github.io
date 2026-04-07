import{c as g,g as d,p as c,e as u,s as v,f as w}from"./index-BwLrzomA.js";function S(){g({id:"terminal",title:"Terminal",icon:"🖥️",width:700,height:480,content:s=>{s.style.cssText='padding:0;background:#0d0d1a;font-family:"JetBrains Mono",monospace;font-size:13px;display:flex;flex-direction:column;',s.innerHTML=`
        <div id="term-output" style="flex:1;overflow-y:auto;padding:12px;line-height:1.7;"></div>
        <div style="display:flex;align-items:center;padding:8px 12px;border-top:1px solid #1a1a1a;flex-shrink:0;">
          <span style="color:#10b981;margin-right:8px;white-space:nowrap;">arun@portfolio:~$</span>
          <input id="term-input" type="text" autocomplete="off" spellcheck="false" style="flex:1;background:none;border:none;color:#ccc;font-family:inherit;font-size:13px;outline:none;" />
        </div>
      `;const e=s.querySelector("#term-output"),o=s.querySelector("#term-input");let a=[],t=-1,i="~";n(e,`<span style="color:#10b981;">Welcome to ArunOS Terminal v${d()}</span>
<span style="color:#666;">Type 'help' to see commands, or just start typing random stuff. I won't judge.</span>
`),o.addEventListener("keydown",l=>{if(l.key==="Enter"){const p=o.value.trim();if(!p)return;a.unshift(p),t=-1,n(e,`<span style="color:#10b981;">arun@portfolio:${i}$</span> ${r(p)}`),k(p,e),o.value="",e.scrollTop=e.scrollHeight}else if(l.key==="ArrowUp")l.preventDefault(),t<a.length-1&&(t++,o.value=a[t]);else if(l.key==="ArrowDown")l.preventDefault(),t>0?(t--,o.value=a[t]):(t=-1,o.value="");else if(l.key==="Tab"){l.preventDefault();const p=o.value,m=Object.keys(f).filter(b=>b.startsWith(p));m.length===1&&(o.value=m[0]+" ")}}),s.addEventListener("click",()=>o.focus()),setTimeout(()=>o.focus(),100)}})}function n(s,e){const o=document.createElement("div");o.innerHTML=e,s.appendChild(o),s.scrollTop=s.scrollHeight}function r(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}const f={help:(s,e)=>{n(e,`<span style="color:#888;">
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
</span>`)},whoami:(s,e)=>{n(e,`<span style="color:#fff;">${c.name}</span> <span style="color:#666;">— ${c.title} @ ${c.company}</span>
<span style="color:#555;">Also known as: "that guy who mass-deploys on Fridays"</span>`)},about:(s,e)=>{n(e,`<span style="color:#fff;">${c.name}</span>
<span style="color:#10b981;">${c.title} @ ${c.company}</span>
<span style="color:#888;">${c.yoe} YOE | Full Stack | AWS | DevOps | Blockchain
Currently leading the engineering team. Building things that scale.
Previously: mass-built crypto platforms worth ~$50M, mass-migrated 10+ microservices,
and mass-consumed mass amounts of coffee.</span>`)},neofetch:(s,e)=>{n(e,`<pre style="color:#888;">
  <span style="color:#10b981;">       .---.        </span>  <span style="color:#fff;">arun</span>@<span style="color:#fff;">portfolio</span>
  <span style="color:#10b981;">      /     \\       </span>  ──────────────────
  <span style="color:#10b981;">      \\.@-@./       </span>  <span style="color:#10b981;">OS:</span>       Solutions Architect v${d()}
  <span style="color:#10b981;">      /\`\\_/\`\\       </span>  <span style="color:#10b981;">Host:</span>     Echor Tech
  <span style="color:#10b981;">     //  _  \\\\      </span>  <span style="color:#10b981;">Kernel:</span>   Full Stack Engineering
  <span style="color:#10b981;">    | \\     )|_     </span>  <span style="color:#10b981;">Uptime:</span>   ${d()} years (and mass counting)
  <span style="color:#10b981;">   /\`\\_\`>  <_/ \\    </span>  <span style="color:#10b981;">Packages:</span> 30+ technologies installed
  <span style="color:#10b981;">   \\__/'---'\\__/    </span>  <span style="color:#10b981;">Shell:</span>    coffee-driven-dev
                       <span style="color:#10b981;">Editor:</span>   VS Code (with mass extensions)
                       <span style="color:#10b981;">Terminal:</span>  This one (obviously)
                       <span style="color:#10b981;">CPU:</span>      Problem Solving @ 3.8GHz
                       <span style="color:#10b981;">Memory:</span>   JNTUH CSE, B.Tech
                       <span style="color:#10b981;">Disk:</span>     90% node_modules
</pre>`)},experience:(s,e)=>{const o=u.map(a=>`  <span style="color:#f59e0b;">${a.year}</span>  <span style="color:#fff;">${a.title}</span> <span style="color:#666;">@ ${a.company}</span>  <span style="color:#555;">(${a.dates})</span>`).join(`
`);n(e,`<span style="color:#888;">Career Timeline (newest first):
${o}

Type 'git log' for the dramatic version.</span>`)},skills:(s,e)=>{const o=Object.entries(v).map(([a,t])=>`  <span style="color:#10b981;">${a}:</span> ${t.join(", ")}`).join(`
`);n(e,`<span style="color:#888;">${o}</span>`)},projects:(s,e)=>{n(e,`<span style="color:#888;">
  <span style="color:#3b82f6;">📁 crypto-platform/</span>   VC-backed decentralized creator platform (~$50M mcap)
  <span style="color:#3b82f6;">📁 landwey/</span>           Scaled to 30k+ users. Infrastructure: optimized.
  <span style="color:#3b82f6;">📁 trading-bot/</span>       Advanced trading automation. Real-time algorithms.
  <span style="color:#3b82f6;">📁 content-platform/</span>  Multi-media marketing with crypto incentives + AI/ML
  <span style="color:#3b82f6;">📁 employee-mgmt/</span>     Internal system, 10k+ users (at GGK Tech)

Use 'ls projects/' to browse or double-click Projects on the desktop.</span>`)},contact:(s,e)=>{n(e,`<span style="color:#888;">
  <span style="color:#10b981;">📧 Email:</span>    <a href="mailto:${c.email}" style="color:#3b82f6;">${c.email}</a>
  <span style="color:#10b981;">💼 LinkedIn:</span> <a href="${c.linkedin}" target="_blank" style="color:#3b82f6;">linkedin.com/in/arunmunaganti</a>
  <span style="color:#10b981;">🐙 GitHub:</span>   <a href="${c.github}" target="_blank" style="color:#3b82f6;">github.com/arunsai63</a>
  <span style="color:#10b981;">🌐 Portfolio:</span> <a href="${c.portfolio}" target="_blank" style="color:#3b82f6;">arunsai63.github.io/portfolio</a>

Or just yell into the void. I'll probably hear you.</span>`)},resume:(s,e)=>{n(e,`<span style="color:#10b981;">Downloading resume...</span>
<span style="color:#888;">Just kidding, opening in new tab. You mass have a PDF viewer, right?</span>`),setTimeout(()=>window.open("/resume.pdf","_blank"),500)},clear:(s,e)=>{e.innerHTML=""},uptime:(s,e)=>{n(e,`<span style="color:#888;">${d()} years, mass counting.
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
</pre>`)},ls:(s,e)=>{const o=s[0]||"~",a=h(o);if(!a||a.type!=="dir"){n(e,`<span style="color:#ef4444;">ls: cannot access '${r(o)}': No such directory</span>`);return}const t=Object.entries(a.children).map(([i,l])=>l.type==="dir"?`<span style="color:#3b82f6;">${i}/</span>`:`<span style="color:#ccc;">${i}</span>`);n(e,t.join("  "))},cat:(s,e)=>{const o=s[0];if(!o){n(e,'<span style="color:#ef4444;">cat: missing file operand</span>');return}const a=h(o);if(!a||a.type!=="file"){n(e,`<span style="color:#ef4444;">cat: ${r(o)}: No such file</span>`);return}n(e,`<span style="color:#888;">${r(a.content)}</span>`)},pwd:(s,e)=>{n(e,"/home/arun")},sudo:(s,e)=>{const o=s.join(" ");o.startsWith("hire")?n(e,`<span style="color:#10b981;">[sudo] Verifying credentials...
Permission granted. ✅
Sending offer letter to ${c.email}...
Just kidding. But seriously, you should.</span>`):o.startsWith("rm")?n(e,`<span style="color:#ef4444;">Permission denied: You cannot delete ${d()} years of experience.
Also, I have mass backups. Unlike your last client. 😏</span>`):n(e,`<span style="color:#ef4444;">[sudo] You're not in the sudoers file. This incident will be reported.
...to no one. I don't even have a sysadmin.</span>`)},rm:(s,e)=>{s.join(" ").includes("-rf")?n(e,`<span style="color:#ef4444;">Nice try. I'm not falling for that again.
Last time I lost all my Kubernetes configs. 😤</span>`):n(e,'<span style="color:#ef4444;">rm: permission denied (this is a portfolio, not a playground)</span>')},git:(s,e)=>{if(s[0]==="log"){const o=u.map((a,t)=>`<span style="color:#f59e0b;">* ${Math.random().toString(16).substr(2,7)}</span>${t===0?' <span style="color:#10b981;">(HEAD -> career)</span>':""} <span style="color:#fff;">${a.title}</span> <span style="color:#666;">(${a.dates})</span>
<span style="color:#555;">|   ${a.company} — ${a.bullets[0]}</span>`).join(`
<span style="color:#555;">|</span>
`);n(e,`<pre>${o}</pre>`)}else s[0]==="status"?n(e,`<span style="color:#888;">On branch <span style="color:#10b981;">career</span>
Your branch is ahead of 'origin/junior-dev' by 6 commits.
  (use "git push" to share your mass awesomeness)

Changes to be committed:
  <span style="color:#10b981;">modified:   skills/cloud.txt</span> (leveled up)
  <span style="color:#10b981;">modified:   experience/echortech.md</span> (promoted)
  <span style="color:#ef4444;">deleted:    imposter-syndrome.txt</span> (finally)</span>`):n(e,`<span style="color:#888;">git: '${r(s[0]||"")}' is not a git command. Try 'git log' or 'git status'.</span>`)},matrix:(s,e)=>{n(e,'<span style="color:#10b981;">Entering the Matrix...</span>');const o=document.createElement("div");o.style.cssText="position:fixed;inset:0;background:#000;z-index:999999;overflow:hidden;";const a=document.createElement("canvas");o.appendChild(a),document.body.appendChild(o),a.width=window.innerWidth,a.height=window.innerHeight;const t=a.getContext("2d"),i=Math.floor(a.width/14),l=Array(i).fill(1),p=setInterval(()=>{t.fillStyle="rgba(0,0,0,0.05)",t.fillRect(0,0,a.width,a.height),t.fillStyle="#10b981",t.font="14px JetBrains Mono";for(let y=0;y<l.length;y++){const m=String.fromCharCode(12448+Math.random()*96);t.fillText(m,y*14,l[y]*14),l[y]*14>a.height&&Math.random()>.975&&(l[y]=0),l[y]++}},33);o.addEventListener("click",()=>{clearInterval(p),o.remove()}),setTimeout(()=>{clearInterval(p),o.remove()},5e3)},ping:(s,e)=>{const o=s[0]||"localhost";n(e,`<span style="color:#888;">PING ${r(o)} (127.0.0.1): 56 data bytes
64 bytes from ${r(o)}: time=0ms (always responsive)
64 bytes from ${r(o)}: time=0ms (still responsive)

--- ${r(o)} ping statistics ---
Why are you pinging ${r(o)} from my portfolio? Focus.</span>`)},vim:(s,e)=>{n(e,`<span style="color:#ef4444;">Error: Real developers use VS Code.
Just kidding. Use whatever makes you mass happy.
(But seriously, VS Code.)</span>`)},man:(s,e)=>{s[0]==="arun"||!s[0]?n(e,`<pre style="color:#888;">
<span style="color:#fff;">ARUN(1)                    ArunOS Manual                    ARUN(1)</span>

<span style="color:#f59e0b;">NAME</span>
       arun - solutions architect, mass coffee enthusiast

<span style="color:#f59e0b;">SYNOPSIS</span>
       arun [--hire] [--collaborate] [--coffee]

<span style="color:#f59e0b;">DESCRIPTION</span>
       Arun is a solutions architect with ${c.yoe} years of
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
</pre>`):n(e,`<span style="color:#ef4444;">No manual entry for ${r(s[0])}. Try 'man arun'.</span>`)},cowsay:(s,e)=>{const o=s.join(" ")||"hire me",a="-".repeat(o.length+2);n(e,`<pre style="color:#888;">
 ${a}
< ${r(o)} >
 ${a}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
</pre>`)},fortune:(s,e)=>{const o=['"The best code is no code." — Every architect who deleted a service','"It works on my machine." — The last words before a production incident',`"We'll fix it in the next sprint." — Said every sprint, every team, everywhere`,'"This should be a quick fix." — Narrator: It was not a quick fix.',`"Let's not over-engineer this." — Proceeds to build a microservice mesh`,'"The documentation is self-explanatory." — The documentation:',`"Premature optimization is the root of all evil." — But mass-cached Redis is just... chef's kiss`,`"I'll add tests later." — Narrator: Tests were never added.`,'"Works on my machine" is technically a valid deployment strategy if your machine IS the server.'];n(e,`<span style="color:#f59e0b;">${o[Math.floor(Math.random()*o.length)]}</span>`)},date:(s,e)=>{n(e,`<span style="color:#888;">${new Date().toString()}</span>
<span style="color:#555;">Fun fact: it's always mass deploy o'clock somewhere.</span>`)},echo:(s,e)=>{n(e,`<span style="color:#888;">${r(s.join(" "))}</span>`)},konami:(s,e)=>{n(e,`<span style="color:#10b981;">🎮 ↑↑↓↓←→←→BA — Konami code activated!</span>
<span style="color:#888;">Achievement unlocked: "knows the classics"
You've earned... absolutely nothing. But the nostalgia is priceless.</span>`)},docker:(s,e)=>{s[0]==="ps"?n(e,`<span style="color:#888;">CONTAINER ID   IMAGE                STATUS         PORTS                  NAMES
a1b2c3d4e5f6   arun/portfolio:v${d()}   Up 24/7        0.0.0.0:443->443/tcp   this-website
f6e5d4c3b2a1   arun/brain:latest     Up ${d()}y        0.0.0.0:*->*/tcp       always-thinking
1234abcd5678   arun/coffee:∞         Up forever     0.0.0.0:☕->☕/tcp    essential-service</span>`):n(e,`<span style="color:#888;">docker: '${r(s[0]||"")}' try 'docker ps' to see running containers.</span>`)},htop:(s,e)=>{n(e,`<pre style="color:#888;">
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
node_modules size: ∞</span>`):n(e,`<span style="color:#888;">npm: try 'npm install' for the full experience</span>`)}};function k(s,e,o,a){const t=s.split(/\s+/),i=t[0].toLowerCase(),l=t.slice(1);if(i==="git"){f.git(l,e);return}if(i==="sudo"){f.sudo(l,e);return}if(f[i])f[i](l,e);else{const p=Object.keys(f).filter(y=>y.startsWith(i.charAt(0)));n(e,`<span style="color:#ef4444;">Command not found: '${r(i)}'</span>
<span style="color:#555;">${p.length?`Did you mean: ${p.slice(0,3).join(", ")}?`:"Type 'help' to see available commands."}</span>`)}}function h(s){const e=s.replace(/^~\/?/,"").replace(/\/+$/,"");let o=w["~"];if(!e)return o;const a=e.split("/");for(const t of a){if(!o||o.type!=="dir"||!o.children[t])return null;o=o.children[t]}return o}export{S as open};
