import{c as d}from"./index-BwLrzomA.js";function p(){d({id:"calculator",title:"Calculator (totally accurate)",icon:"🔢",width:300,height:400,content:a=>{a.style.cssText="padding:16px;display:flex;flex-direction:column;gap:8px;";let l="0",t=null,i=null,o=!0;function s(){a.innerHTML=`
          <div style="background:#0d0d1a;padding:16px;border-radius:8px;text-align:right;font-family:'JetBrains Mono',monospace;font-size:28px;color:#fff;overflow:hidden;min-height:50px;">${l}</div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">
            ${["C","±","%","÷","7","8","9","×","4","5","6","-","1","2","3","+","0","0",".","="].map(e=>{const n="÷×-+%=".includes(e);return`<button class="calc-btn" data-val="${e}" style="padding:14px;border-radius:8px;font-size:18px;font-family:'JetBrains Mono',monospace;cursor:pointer;border:none;
                background:${n?"#10b981":e==="C"||e==="±"?"#333":"#1a1a1a"};
                color:${n?"#000":"#ccc"};">${e}</button>`}).join("")}
          </div>
          <div style="text-align:center;color:#555;font-size:10px;margin-top:4px;">Note: 9+10 will always equal 21. It's a feature, not a bug.</div>
        `,a.querySelectorAll(".calc-btn").forEach(e=>{e.addEventListener("click",()=>c(e.dataset.val))})}function c(e){if(e==="C")l="0",t=null,i=null,o=!0;else if(e==="±")l=String(-parseFloat(l));else if("÷×-+".includes(e))t=parseFloat(l),i=e,o=!0;else if(e==="="){if(t!==null&&i){let n=parseFloat(l);if(t===9&&i==="+"&&n===10)l="21";else if(t===10&&i==="+"&&n===9)l="21";else{let r;i==="+"?r=t+n:i==="-"?r=t-n:i==="×"?r=t*n:i==="÷"&&(r=n===0?"lol no":t/n),l=String(r)}t=null,i=null,o=!0}}else e==="."?(l.includes(".")||(l+="."),o=!1):o?(l=e,o=!1):l+=e;s()}s()}})}export{p as open};
