import t from"@unseenco/e";const e=new DOMParser;function r(t){const e=new URL(t,window.location.origin);let r=null;return e.hash.length&&(r=t.replace(e.hash,"")),{hasHash:e.hash.length>0,pathname:e.pathname,host:e.host,raw:t,href:r||e.href}}function n(t){"HEAD"===t.parentNode.tagName?document.head.appendChild(i(t)):document.body.appendChild(i(t))}function i(t){const e=document.createElement("SCRIPT");for(let r=0;r<t.attributes.length;r++){const n=t.attributes[r];e.setAttribute(n.nodeName,n.nodeValue)}return t.innerHTML&&(e.innerHTML=t.innerHTML),e}function a(){return a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},a.apply(this,arguments)}class s{constructor({wrapper:t}){this.wrapper=t}leave(t){return new Promise(e=>{this.onLeave(a({},t,{done:e}))})}enter(t){return new Promise(e=>{this.onEnter(a({},t,{done:e}))})}onLeave({done:t}){t()}onEnter({done:t}){t()}}class o{constructor({content:t,page:e,title:r,wrapper:n}){this._contentString=t.outerHTML,this._DOM=null,this.page=e,this.title=r,this.wrapper=n,this.content=this.wrapper.lastElementChild}onEnter(){}onEnterCompleted(){}onLeave(){}onLeaveCompleted(){}initialLoad(){this.onEnter(),this.onEnterCompleted()}update(){document.title=this.title,this.wrapper.appendChild(this._DOM.firstElementChild),this.content=this.wrapper.lastElementChild,this._DOM=null}createDom(){this._DOM||(this._DOM=document.createElement("div"),this._DOM.innerHTML=this._contentString)}remove(){this.wrapper.firstElementChild.remove()}enter(t,e){return new Promise(r=>{this.onEnter(),t.enter({trigger:e,to:this.content}).then(()=>{this.onEnterCompleted(),r()})})}leave(t,e,r){return new Promise(n=>{this.onLeave(),t.leave({trigger:e,from:this.content}).then(()=>{r&&this.remove(),this.onLeaveCompleted(),n()})})}}class h{constructor(){this.data=new Map,this.regexCache=new Map}add(t,e,r){this.data.has(t)||(this.data.set(t,new Map),this.regexCache.set(t,new RegExp(`^${t}$`))),this.data.get(t).set(e,r),this.regexCache.set(e,new RegExp(`^${e}$`))}findMatch(t,e){for(const[r,n]of this.data)if(t.pathname.match(this.regexCache.get(r))){for(const[t,r]of n)if(e.pathname.match(this.regexCache.get(t)))return r;break}return null}}const c="A transition is currently in progress";class l{constructor(t={}){this.isTransitioning=!1,this.currentCacheEntry=null,this.cache=new Map,this.onClick=t=>{if(!t.metaKey&&!t.ctrlKey){const e=r(t.currentTarget.href);if(this.currentLocation=r(window.location.href),this.currentLocation.host!==e.host)return;if(this.currentLocation.href!==e.href||this.currentLocation.hasHash&&!e.hasHash)return t.preventDefault(),void this.navigateTo(e.raw,t.currentTarget.dataset.transition||!1,t.currentTarget).catch(t=>console.warn(t));this.currentLocation.hasHash||e.hasHash||t.preventDefault()}},this.onPopstate=()=>!(window.location.pathname===this.currentLocation.pathname&&!this.isPopping)&&(this.allowInterruption||!this.isTransitioning&&!this.isPopping?(this.isPopping||(this.popTarget=window.location.href),this.isPopping=!0,void this.navigateTo(window.location.href,!1,"popstate")):(window.history.pushState({},"",this.popTarget),console.warn(c),!1));const{links:e="a:not([target]):not([href^=\\#]):not([data-taxi-ignore])",removeOldContent:n=!0,allowInterruption:i=!1,bypassCache:a=!1,renderers:h={default:o},transitions:l={default:s},reloadJsFilter:d=(t=>void 0!==t.dataset.taxiReload)}=t;this.renderers=h,this.transitions=l,this.defaultRenderer=this.renderers.default||o,this.defaultTransition=this.transitions.default||s,this.wrapper=document.querySelector("[data-taxi]"),this.reloadJsFilter=d,this.removeOldContent=n,this.allowInterruption=i,this.bypassCache=a,this.cache=new Map,this.isPopping=!1,this.attachEvents(e),this.currentLocation=r(window.location.href),this.cache.set(this.currentLocation.href,this.createCacheEntry(document.cloneNode(!0))),this.currentCacheEntry=this.cache.get(this.currentLocation.href),this.currentCacheEntry.renderer.initialLoad()}setDefaultRenderer(t){this.defaultRenderer=this.renderers[t]}setDefaultTransition(t){this.defaultTransition=this.transitions[t]}addRoute(t,e,r){this.router||(this.router=new h),this.router.add(t,e,r)}preload(t,e=!1){var n=this;return t=r(t).href,this.cache.has(t)?Promise.resolve():this.fetch(t,!1).then(async function(r){n.cache.set(t,n.createCacheEntry(r)),e&&n.cache.get(t).renderer.createDom()})}updateCache(){const t=r(window.location.href).href;this.cache.has(t)&&(this.cache.delete(t),this.cache.set(t,this.createCacheEntry(document.cloneNode(!0))))}clearCache(t){const e=r(t||window.location.href).href;this.cache.has(e)&&this.cache.delete(e)}navigateTo(t,e=!1,n=!1){var i=this;return new Promise((a,s)=>{if(!this.allowInterruption&&this.isTransitioning)return void s(new Error(c));this.isTransitioning=!0,this.isPopping=!0,this.targetLocation=r(t),this.popTarget=window.location.href;const o=new(this.chooseTransition(e))({wrapper:this.wrapper});let h;if(this.bypassCache||!this.cache.has(this.targetLocation.href)||this.cache.get(this.targetLocation.href).skipCache){const t=this.fetch(this.targetLocation.raw).then(t=>{this.cache.set(this.targetLocation.href,this.createCacheEntry(t)),this.cache.get(this.targetLocation.href).renderer.createDom()});h=this.beforeFetch(this.targetLocation,o,n).then(async function(){return t.then(async function(t){return await i.afterFetch(i.targetLocation,o,i.cache.get(i.targetLocation.href),n)})})}else this.cache.get(this.targetLocation.href).renderer.createDom(),h=this.beforeFetch(this.targetLocation,o,n).then(async function(){return await i.afterFetch(i.targetLocation,o,i.cache.get(i.targetLocation.href),n)});h.then(()=>{a()})})}on(e,r){t.on(e,r)}off(e,r){t.off(e,r)}beforeFetch(e,r,n){return t.emit("NAVIGATE_OUT",{from:this.currentCacheEntry,trigger:n}),new Promise(t=>{this.currentCacheEntry.renderer.leave(r,n,this.removeOldContent).then(()=>{"popstate"!==n&&window.history.pushState({},"",e.raw),t()})})}afterFetch(e,r,n,i){return this.currentLocation=e,this.popTarget=this.currentLocation.href,new Promise(e=>{n.renderer.update(),t.emit("NAVIGATE_IN",{from:this.currentCacheEntry,to:n,trigger:i}),this.reloadJsFilter&&this.loadScripts(n.scripts),n.renderer.enter(r,i).then(()=>{t.emit("NAVIGATE_END",{from:this.currentCacheEntry,to:n,trigger:i}),this.currentCacheEntry=n,this.isTransitioning=!1,this.isPopping=!1,e()})})}loadScripts(t){const e=[...t],r=Array.from(document.querySelectorAll("script")).filter(this.reloadJsFilter);for(let t=0;t<r.length;t++)for(let n=0;n<e.length;n++)if(r[t].outerHTML===e[n].outerHTML){(a=r[t]).parentNode.replaceChild(i(a),a),e.splice(n,1);break}var a;for(const t of e)n(t)}attachEvents(e){t.delegate("click",e,this.onClick),t.on("popstate",window,this.onPopstate)}fetch(t,r=!0){return new Promise((n,i)=>{fetch(t,{mode:"same-origin",method:"GET",headers:{"X-Requested-With":"Taxi"},credentials:"same-origin"}).then(e=>(e.ok||(i("Taxi encountered a non 2xx HTTP status code"),r&&(window.location.href=t)),e.text())).then(t=>{var r;n("string"==typeof(r=t)?e.parseFromString(r,"text/html"):r)}).catch(e=>{i(e),r&&(window.location.href=t)})})}chooseTransition(t){var e;if(t)return this.transitions[t];const r=null==(e=this.router)?void 0:e.findMatch(this.currentLocation,this.targetLocation);return r?this.transitions[r]:this.defaultTransition}createCacheEntry(t){const e=t.querySelector("[data-taxi-view]"),r=e.dataset.taxiView.length?this.renderers[e.dataset.taxiView]:this.defaultRenderer;return r||console.warn(`The Renderer "${e.dataset.taxiView}" was set in the data-taxi-view of the requested page, but not registered in Taxi.`),{page:t,content:e,skipCache:e.hasAttribute("data-taxi-nocache"),scripts:this.reloadJsFilter?Array.from(t.querySelectorAll("script")).filter(this.reloadJsFilter):[],title:t.title,renderer:new r({wrapper:this.wrapper,title:t.title,content:e,page:t})}}}export{l as Core,o as Renderer,s as Transition};
//# sourceMappingURL=taxi.modern.js.map
