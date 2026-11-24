import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { THEME_INIT_SCRIPT, ThemeProvider } from "@/lib/theme";
import { PawCursorProvider } from "@/components/mascot/PawCursorProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { SkipLink } from "@/components/site/SkipLink";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lucas (Wai Phyo Aung) · Product & Motion Designer",
  description:
    "Curious by nature, careful by habit. Product & Motion Designer portfolio at lucas.pawprint.design.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_INIT_SCRIPT,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-text font-body">
        <ThemeProvider>
          <PawCursorProvider>
            <ToastProvider>
              <SkipLink />
              {children}
            </ToastProvider>
          </PawCursorProvider>
        </ThemeProvider>
        {/* luci:toolbar (dev only: Luci's dev toolbar from `luci serve` on this machine; remove with `luci toolbar remove`) */}
        {process.env.NODE_ENV === 'development' && <script dangerouslySetInnerHTML={{ __html: "if (/^(localhost|127\\.0\\.0\\.1|\\[::1\\])$/.test(location.hostname)) (function(){var u='http://127.0.0.1:4546/toolbar.js',k='luci.offline.dismissed',b=0,d=0,a=0,h=null,t=0,rb=null,rt=0;function pos(){try{var p=JSON.parse(localStorage.getItem('luci.ui')||'{}'),v=p.devPlace;if(v&&typeof v.x==='number'&&typeof v.y==='number')return(v.h==='left'?'left':'right')+':min('+v.x+'px,calc(100vw - 260px));'+(v.v==='top'?'top':'bottom')+':min('+v.y+'px,calc(100vh - 120px))';if(p.dock==='left')return'left:12px;bottom:12px'}catch(e){}return'right:12px;bottom:12px'}function cp(s){if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(s).then(function(){return true},function(){return fb(s)});return Promise.resolve(fb(s))}function fb(s){var e=document.createElement('textarea');e.value=s;e.setAttribute('readonly','');e.style.cssText='position:fixed;top:-9999px;opacity:0';(document.body||document.documentElement).appendChild(e);e.select();var ok=false;try{ok=document.execCommand('copy')}catch(x){}e.remove();return Boolean(ok)}function rm(){if(h){h.remove();h=null;rb=null}}function off(){if(typeof window!=='undefined'){window.removeEventListener('focus',onVis);document.removeEventListener('visibilitychange',onVis)}}function onVis(){if(d||b||a)return;if(document.visibilityState&&document.visibilityState!=='visible')return;a=1;ld()}function show(){if(d||h)return;try{if(sessionStorage.getItem(k)==='1')return}catch(e){}if(!document.documentElement)return;h=document.createElement('luci-offline');h.setAttribute('data-luci-ui','');var r=h.attachShadow({mode:'open'});var st=document.createElement('style');st.textContent=':host{all:initial}*,*::before,*::after{box-sizing:border-box}'+'.card{position:fixed;'+pos()+';z-index:2147483647;display:flex;flex-direction:column;gap:8px;max-width:calc(100vw - 24px);padding:12px 14px;border-radius:16px;background:#2B2B2B;color:#F5EFEA;font:400 13px/18px Inter,system-ui,-apple-system,sans-serif;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 0 0 1px rgba(255,255,255,.05),0 1px 2px rgba(0,0,0,.24),0 8px 24px rgba(0,0,0,.28)}'+'.top{display:flex;align-items:center;justify-content:space-between;gap:12px}'+'.title{display:inline-flex;align-items:center;gap:8px;font-weight:600;color:#F5EFEA}'+'.dot{width:8px;height:8px;border-radius:50%;background:#E6D17A;flex:none}'+'.sub{margin:0;color:#C2BCB8;font-size:12px;line-height:16px}'+'.actions{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:2px}'+'button{appearance:none;border:0;margin:0;font:600 12px/16px Inter,system-ui,-apple-system,sans-serif;cursor:pointer;border-radius:8px;padding:6px 10px;transition:background-color .15s ease-out}'+'button:focus-visible{outline:2px solid #F5EFEA;outline-offset:2px}'+'.copy{background:#EC862B;color:#2B2B2B}.copy:hover{background:#D86D1D}'+'.retry{background:#3B3A39;color:#F5EFEA;font-weight:500}.retry:hover{background:#4F4D4B}'+'.close{padding:2px 6px;border-radius:9999px;background:transparent;color:#C2BCB8;font:600 15px/1 Inter,system-ui,sans-serif}.close:hover{background:#3B3A39;color:#F5EFEA}';var box=document.createElement('div');box.className='card';box.setAttribute('role','status');box.setAttribute('aria-live','polite');box.setAttribute('data-part','offline-badge');var top=document.createElement('div');top.className='top';var ttl=document.createElement('span');ttl.className='title';var dot=document.createElement('i');dot.className='dot';dot.setAttribute('aria-hidden','true');var tx=document.createElement('span');tx.textContent=\"Luci isn't running\";ttl.append(dot,tx);var x=document.createElement('button');x.type='button';x.className='close';x.setAttribute('aria-label','Close Luci status');x.setAttribute('data-action','close');x.textContent='\\u00d7';x.onclick=function(){try{sessionStorage.setItem(k,'1')}catch(e){}rm();off()};top.append(ttl,x);var sub=document.createElement('p');sub.className='sub';sub.textContent='Start luci serve in this project.';var act=document.createElement('div');act.className='actions';var cb=document.createElement('button');cb.type='button';cb.className='copy';cb.setAttribute('data-action','copy-fix');cb.textContent='Copy fix for my agent';cb.onclick=function(){cp(\"Luci's dev toolbar can't connect. In this project, start `luci serve --port 4546` and keep it running in the background. If `luci` isn't found, install it with `npm install -g @luci-dev/cli`. On Windows, if PowerShell blocks `luci`, use `luci.cmd`. Don't change any system setting without asking me. Then tell me when it's running.\").then(function(ok){clearTimeout(t);if(ok){cb.textContent='Copied';t=setTimeout(function(){cb.textContent='Copy fix for my agent'},2000)}else{cb.textContent=\"Couldn't copy\";sub.textContent='Run in project: '+\"luci serve --port 4546\";t=setTimeout(function(){cb.textContent='Copy fix for my agent'},3000)}})};rb=document.createElement('button');rb.type='button';rb.className='retry';rb.setAttribute('data-action','retry');rb.textContent='Retry';rb.onclick=function(){ld()};act.append(cb,rb);box.append(top,sub,act);r.append(st,box);document.documentElement.appendChild(h)}function ld(){if(b||d)return;b=1;if(rb){rb.disabled=true;rb.textContent='Checking\\u2026'}var s=Object.assign(document.createElement('script'),{src:u,onload:function(){b=0;d=1;rm();off()},onerror:function(){b=0;if(s.remove)s.remove();show();if(rb){rb.disabled=false;rb.textContent='Still not running';clearTimeout(rt);rt=setTimeout(function(){if(rb)rb.textContent='Retry'},2000)}}});document.head.appendChild(s)}if(typeof window!=='undefined'&&window.addEventListener){window.addEventListener('focus',onVis);document.addEventListener('visibilitychange',onVis);window.addEventListener('blur',function(){a=0});document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')a=0})}ld()})();" }} />}
        {/* /luci:toolbar */}
      </body>
    </html>
  );
}
