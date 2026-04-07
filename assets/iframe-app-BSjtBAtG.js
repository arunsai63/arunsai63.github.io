import{c as r,i}from"./index-BwLrzomA.js";function s(t,o,e,a){r({id:t,title:o,icon:i(a,16),width:900,height:600,content:n=>{n.style.cssText="padding:0;height:100%;display:flex;flex-direction:column;",n.innerHTML=`
        <div style="display:flex;align-items:center;gap:8px;padding:6px 12px;background:rgba(0,0,0,0.2);border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;">
          <span style="color:#888;font-size:12px;font-family:'JetBrains Mono',monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${e}</span>
          <a href="${e}" target="_blank" style="margin-left:auto;color:#888;display:flex;align-items:center;text-decoration:none;font-size:11px;gap:4px;flex-shrink:0;" title="Open in new tab">${i("externalLink",12,"#888")}</a>
        </div>
        <iframe src="${e}" style="flex:1;border:none;width:100%;background:#fff;border-radius:0 0 12px 12px;"></iframe>
      `}})}export{s as openIframeApp};
