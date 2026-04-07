import{c,f as y}from"./index-BwLrzomA.js";function b(){c({id:"projects",title:"File Explorer — ~/projects",icon:"📁",width:600,height:420,content:o=>{o.style.cssText='padding:0;font-family:"JetBrains Mono",monospace;font-size:13px;display:flex;flex-direction:column;';let r="~";function t(i){r=i;const s=p(i);if(!s||s.type!=="dir")return;const f=i.split("/").map((e,n,d)=>`<span class="breadcrumb" data-path="${d.slice(0,n+1).join("/")}" style="cursor:pointer;color:#3b82f6;">${e}</span>`).join(' <span style="color:#555;">/</span> ');o.innerHTML=`
          <div style="padding:8px 16px;background:rgba(0,0,0,0.25);border-bottom:1px solid #222;display:flex;align-items:center;gap:8px;">
            <button class="nav-back" style="color:#666;font-size:16px;cursor:pointer;background:none;border:none;font-family:inherit;" ${i==="~"?"disabled":""}>←</button>
            <div style="flex:1;color:#888;font-size:12px;">📁 ${f}</div>
          </div>
          <div style="flex:1;overflow-y:auto;padding:8px;">
            ${Object.entries(s.children).map(([e,n])=>`
              <div class="file-item" data-name="${e}" data-type="${n.type}" style="display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:6px;cursor:pointer;transition:background 0.15s;">
                <span style="font-size:20px;">${n.type==="dir"?"📁":e.endsWith(".pdf")?"📄":e.endsWith(".md")?"📝":"📃"}</span>
                <div style="flex:1;">
                  <div style="color:#ccc;">${e}</div>
                  <div style="color:#555;font-size:11px;">${n.type==="dir"?Object.keys(n.children).length+" items":Math.floor(Math.random()*50+5)+" KB"}</div>
                </div>
                ${e==="resume.pdf"?'<span style="color:#10b981;font-size:11px;">⬇ Download</span>':""}
              </div>
            `).join("")}
          </div>
          <div style="padding:6px 16px;background:rgba(0,0,0,0.25);border-top:1px solid #222;font-size:11px;color:#555;">
            ${Object.keys(s.children).length} items | Path: ${i.replace("~","/home/arun")}
          </div>
        `,o.querySelectorAll(".file-item").forEach(e=>{e.addEventListener("dblclick",()=>{const n=e.dataset.name;if(e.dataset.type==="dir")t(r+"/"+n);else if(n==="resume.pdf")window.open("/resume.pdf","_blank");else{const a=p(r+"/"+n);a&&a.content&&c({id:"file-"+n,title:n,icon:"📝",width:500,height:350,content:`<pre style="white-space:pre-wrap;color:#aaa;font-family:'JetBrains Mono',monospace;font-size:13px;">${a.content}</pre>`})}}),e.addEventListener("mouseenter",()=>e.style.background="rgba(255,255,255,0.04)"),e.addEventListener("mouseleave",()=>e.style.background="")});const l=o.querySelector(".nav-back");l&&l.addEventListener("click",()=>{const e=r.split("/");e.length>1&&(e.pop(),t(e.join("/")))}),o.querySelectorAll(".breadcrumb").forEach(e=>{e.addEventListener("click",()=>t(e.dataset.path))})}t("~")}})}function p(o){const r=o.replace(/^~\/?/,"").replace(/\/+$/,"");let t=y["~"];if(!r)return t;const i=r.split("/");for(const s of i){if(!t||t.type!=="dir"||!t.children[s])return null;t=t.children[s]}return t}export{b as open};
