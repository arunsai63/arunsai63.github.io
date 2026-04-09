import{c as C}from"./window-manager-Cm3UCJuh.js";import{q as S,l as E,r as x,g as k,o as z,d as T,p as w}from"./console-easter-egg-DLHUFXsG.js";const f=["#10b981","#3b82f6","#f59e0b","#ef4444","#8b5cf6","#ec4899"];function M(e){const n=f[Math.floor(Math.random()*f.length)],o=localStorage.getItem("arunos-chat-name")||"Anonymous Visitor";e.style.cssText="padding:0;display:flex;flex-direction:column;font-size:13px;",e.innerHTML=`
        <div style="padding:8px 12px;background:rgba(0,0,0,0.25);border-bottom:1px solid #222;display:flex;align-items:center;gap:8px;">
          <span style="font-size:16px;">💬</span>
          <span style="color:#888;font-size:12px;">ArunOS Global Chat</span>
          <span style="margin-left:auto;color:#555;font-size:11px;" id="chat-status">Connecting...</span>
        </div>

        <div id="chat-messages" style="flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;"></div>

        <div style="padding:8px 12px;background:rgba(0,0,0,0.25);border-top:1px solid #222;">
          <div style="margin-bottom:6px;display:flex;gap:6px;align-items:center;">
            <input id="chat-name" type="text" value="${o}" placeholder="Your name" style="width:140px;padding:4px 8px;background:rgba(255,255,255,0.04);border:1px solid #333;border-radius:4px;color:#ccc;font-size:11px;font-family:inherit;outline:none;" />
            <span style="color:#444;font-size:10px;">← your display name</span>
          </div>
          <div style="display:flex;gap:6px;">
            <input id="chat-input" type="text" placeholder="Type a message..." maxlength="200" style="flex:1;padding:8px 12px;background:rgba(255,255,255,0.04);border:1px solid #333;border-radius:6px;color:#ccc;font-family:inherit;font-size:13px;outline:none;" />
            <button id="chat-send" style="padding:8px 14px;background:#10b981;color:#000;border-radius:6px;font-weight:600;font-size:13px;font-family:inherit;cursor:pointer;border:none;">Send</button>
          </div>
          <div style="color:#444;font-size:10px;margin-top:4px;">Messages are ephemeral. Be nice. Or don't. I'm not your mom.</div>
        </div>
      `;const t=e.querySelector("#chat-messages"),i=e.querySelector("#chat-input"),y=e.querySelector("#chat-send"),c=e.querySelector("#chat-name"),r=e.querySelector("#chat-status");c.addEventListener("change",()=>{localStorage.setItem("arunos-chat-name",c.value)});const p=k(),m=T();if(!p||!m){r.textContent="Offline mode",r.style.color="#ef4444",d(t,"Firebase not connected. Chat is unavailable in offline mode."),d(t,"But hey, you can still talk to yourself. We've all been there.");return}r.textContent="Connected",r.style.color="#10b981",d(t,"Welcome to ArunOS Global Chat! 🎉"),d(t,"Everyone currently on the site can see your messages.");const h=S(x(p,"chat/messages"),E(50));z(h,a=>{const l=a.val();if(!l)return;const b=t.querySelectorAll(".system-msg");t.innerHTML="",b.forEach(s=>t.appendChild(s)),Object.values(l).sort((s,v)=>s.timestamp-v.timestamp).forEach(s=>{L(t,s,s.uid===m)}),t.scrollTop=t.scrollHeight});function u(){const a=i.value.trim();if(!a||a.length>200)return;const l=c.value.trim()||"Anonymous";w(x(p,"chat/messages"),{text:a,name:l,color:n,uid:m,timestamp:Date.now()}),i.value=""}y.addEventListener("click",u),i.addEventListener("keydown",a=>{a.key==="Enter"&&u()}),i.focus()}function H(){C({id:"chat",title:"ArunOS Messenger",icon:"💬",width:420,height:500,content:e=>M(e)})}function L(e,n,o){const t=document.createElement("div");t.style.cssText=`display:flex;flex-direction:column;${o?"align-items:flex-end;":"align-items:flex-start;"}`,t.innerHTML=`
    <span style="font-size:10px;color:${n.color||"#888"};margin-bottom:2px;">${g(n.name)}</span>
    <div style="max-width:75%;padding:8px 12px;border-radius:12px;${o?"background:#10b981;color:#000;border-bottom-right-radius:4px;":"background:rgba(255,255,255,0.04);color:#ccc;border-bottom-left-radius:4px;"}font-size:13px;line-height:1.4;word-break:break-word;">${g(n.text)}</div>
    <span style="font-size:9px;color:#444;margin-top:2px;">${q(n.timestamp)}</span>
  `,e.appendChild(t)}function d(e,n){const o=document.createElement("div");o.className="system-msg",o.style.cssText="text-align:center;color:#555;font-size:11px;padding:4px;",o.textContent=n,e.appendChild(o)}function q(e){return new Date(e).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}function g(e){const n=document.createElement("div");return n.textContent=e,n.innerHTML}export{H as open,M as renderContent};
