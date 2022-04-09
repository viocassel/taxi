import t from"@unseenco/e";const e=new DOMParser;function r(t){const e=new URL(t,window.location.origin);let r=null;return e.hash.length&&(r=t.replace(e.hash,"")),{hasHash:e.hash.length>0,pathname:e.pathname,raw:t,href:r||e.href}}function n(t){"HEAD"===t.parentNode.tagName?document.head.appendChild(i(t)):document.body.appendChild(i(t))}function i(t){const e=document.createElement("SCRIPT");for(let r=0;r<t.attributes.length;r++){const n=t.attributes[r];e.setAttribute(n.nodeName,n.nodeValue)}return t.innerHTML&&(e.innerHTML=t.innerHTML),e}class a{constructor(){this.data=new Map,this.regexCache=new Map}add(t,e,r){this.data.has(t)||(this.data.set(t,new Map),this.regexCache.set(t,new RegExp(`^${t}$`))),this.data.get(t).set(e,r),this.regexCache.set(e,new RegExp(`^${e}$`))}findMatch(t,e){for(const[r,n]of this.data)if(t.pathname.match(this.regexCache.get(r))){for(const[t,r]of n)if(e.pathname.match(this.regexCache.get(t)))return r;break}return null}}class o{constructor(t={}){this.isTransitioning=!1,this.currentCacheEntry=null,this.cache=new Map,this.onClick=t=>{if(!t.metaKey&&!t.ctrlKey){const e=r(t.currentTarget.href);if(this.currentLocation=r(window.location.href),this.currentLocation.href!==e.href||this.currentLocation.hasHash&&!e.hasHash)return t.preventDefault(),void this.navigateTo(e.raw,t.currentTarget.dataset.transition||!1,t.currentTarget);this.currentLocation.hasHash||e.hasHash||t.preventDefault()}},this.onPopstate=()=>window.location.pathname!==this.currentLocation.pathname&&(this.isTransitioning?(window.history.pushState({},"",this.currentLocation.href),!1):void this.navigateTo(window.location.href,!1,"popstate"));const{links:e="a:not([target]):not([href^=\\#]):not([data-taxi-ignore])",removeOldContent:n=!0,renderers:i={default:c},transitions:a={default:h},reloadJsFilter:o=function(t){return!("__bs_script__"===(null==t?void 0:t.id)||null!=t&&t.src.includes("browser-sync-client.js"))}}=t;this.renderers=i,this.transitions=a,this.defaultRenderer=this.renderers.default||c,this.defaultTransition=this.transitions.default||h,this.wrapper=document.querySelector("[data-taxi]"),this.reloadJsFilter=o,this.removeOldContent=n,this.cache=new Map,this.attachEvents(e),this.currentLocation=r(window.location.href),this.cache.set(this.currentLocation.href,this.createCacheEntry(document.cloneNode(!0))),this.currentCacheEntry=this.cache.get(this.currentLocation.href),this.currentCacheEntry.renderer.initialLoad()}setDefaultRenderer(t){this.defaultRenderer=this.renderers[t]}setDefaultTransition(t){this.defaultTransition=this.transitions[t]}addRoute(t,e,r){this.router||(this.router=new a),this.router.add(t,e,r)}preload(t){var e=this;return t=r(t).href,this.cache.has(t)?Promise.resolve():this.fetch(t).then(async function(r){e.cache.set(t,e.createCacheEntry(r))})}updateCache(){const t=r(window.location.href).href;this.cache.has(t)&&(this.cache.delete(t),this.cache.set(t,this.createCacheEntry(document.cloneNode(!0))))}clearCache(t){const e=r(t||window.location.href).href;this.cache.has(e)&&this.cache.delete(e)}navigateTo(t,e=!1,n=!1){var i=this;return new Promise((a,o)=>{if(this.isTransitioning)return void o(new Error("A transition is currently in progress"));this.targetLocation=r(t);const s=new(this.chooseTransition(e))({wrapper:this.wrapper});this.beforeFetch(this.targetLocation,s,n).then(async function(){return i.cache.has(i.targetLocation.href)?await i.afterFetch(i.targetLocation,s,i.cache.get(i.targetLocation.href),n):i.fetch(i.targetLocation.raw).then(async function(t){return await i.afterFetch(i.targetLocation,s,i.createCacheEntry(t),n)})}).then(()=>{a()})})}on(e,r){t.on(e,r)}off(e,r){t.off(e,r)}beforeFetch(e,r,n){return this.isTransitioning=!0,t.emit("NAVIGATE_OUT",{from:this.currentCacheEntry,trigger:n}),new Promise(t=>{this.currentCacheEntry.renderer.leave(r,n,this.removeOldContent).then(()=>{"popstate"!==n&&window.history.pushState({},"",e.raw),t()})})}afterFetch(e,r,n,i){return this.cache.has(e.href)||this.cache.set(e.href,n),this.currentLocation=e,t.emit("NAVIGATE_IN",{from:this.currentCacheEntry,to:n,trigger:i}),new Promise(e=>{n.renderer.update(),this.loadScripts(n.scripts),n.renderer.enter(r,i).then(()=>{t.emit("NAVIGATE_END",{from:this.currentCacheEntry,to:n,trigger:i}),this.currentCacheEntry=n,this.isTransitioning=!1,e()})})}loadScripts(t){const e=[...t],r=[...document.querySelectorAll("script:not([data-no-reload])")].filter(this.reloadJsFilter);for(let t=0;t<r.length;t++)for(let n=0;n<e.length;n++)if(r[t].outerHTML===e[n].outerHTML){(a=r[t]).parentNode.replaceChild(i(a),a),e.splice(n,1);break}var a;for(const t of e)n(t)}attachEvents(e){t.delegate("click",e,this.onClick),t.on("popstate",window,this.onPopstate)}fetch(t){return new Promise(r=>{fetch(t,{mode:"same-origin",method:"GET",headers:{"X-Requested-With":"Taxi"},credentials:"same-origin"}).then(e=>(e.ok||(console.warn("Taxi encountered a non 2xx HTTP status code"),window.location.href=t),e.text())).then(t=>{var n;r("string"==typeof(n=t)?e.parseFromString(n,"text/html"):n)}).catch(e=>{console.warn(e),window.location.href=t})})}chooseTransition(t){var e;if(t)return this.transitions[t];const r=null==(e=this.router)?void 0:e.findMatch(this.currentLocation,this.targetLocation);return r?this.transitions[r]:this.defaultTransition}createCacheEntry(t){const e=t.querySelector("[data-taxi-view]"),r=e.dataset.taxiView.length?this.renderers[e.dataset.taxiView]:this.defaultRenderer;return{page:t,content:e,scripts:[...t.querySelectorAll("script:not([data-no-reload])")].filter(this.reloadJsFilter),title:t.title,renderer:new r({wrapper:this.wrapper,title:t.title,content:e,page:t})}}}function s(){return s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},s.apply(this,arguments)}class h{constructor({wrapper:t}){this.wrapper=t}leave(t){return new Promise(e=>{this.onLeave(s({},t,{done:e}))})}enter(t){return new Promise(e=>{this.onEnter(s({},t,{done:e}))})}onLeave({done:t}){t()}onEnter({done:t}){t()}}class c{constructor({content:t,page:e,title:r,wrapper:n}){this._contentString=t.outerHTML,this.page=e,this.title=r,this.wrapper=n,this.content=this.wrapper.lastElementChild}onEnter(){}onEnterCompleted(){}onLeave(){}onLeaveCompleted(){}initialLoad(){this.onEnter(),this.onEnterCompleted()}update(){document.title=this.title,this.wrapper.insertAdjacentHTML("beforeend",this._contentString),this.content=this.wrapper.lastElementChild}remove(){this.wrapper.firstElementChild.remove()}enter(t,e){return new Promise(r=>{this.onEnter(),t.enter({trigger:e,to:this.content}).then(()=>{this.onEnterCompleted(),r()})})}leave(t,e,r){return new Promise(n=>{this.onLeave(),t.leave({trigger:e,from:this.content}).then(()=>{r&&this.remove(),this.onLeaveCompleted(),n()})})}}export{o as Core,c as Renderer,h as Transition};
//# sourceMappingURL=taxi.modern.js.map
