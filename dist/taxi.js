function t(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var e=/*#__PURE__*/t(require("@unseenco/e"));function n(){return n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},n.apply(this,arguments)}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function i(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(n)return(n=n.call(t)).next.bind(n);if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var i=0;return function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o=new DOMParser;function a(t){var e=new URL(t,window.location.origin),n=null;return e.hash.length&&(n=t.replace(e.hash,"")),{hasHash:e.hash.length>0,pathname:e.pathname,raw:t,href:n||e.href}}function c(t){"HEAD"===t.parentNode.tagName?document.head.appendChild(s(t)):document.body.appendChild(s(t))}function s(t){for(var e=document.createElement("SCRIPT"),n=0;n<t.attributes.length;n++){var r=t.attributes[n];e.setAttribute(r.nodeName,r.nodeValue)}return t.innerHTML&&(e.innerHTML=t.innerHTML),e}var h=/*#__PURE__*/function(){function t(){this.data=new Map,this.regexCache=new Map}var e=t.prototype;return e.add=function(t,e,n){this.data.has(t)||(this.data.set(t,new Map),this.regexCache.set(t,new RegExp("^"+t+"$"))),this.data.get(t).set(e,n),this.regexCache.set(e,new RegExp("^"+e+"$"))},e.findMatch=function(t,e){for(var n,r=i(this.data);!(n=r()).done;){var o=n.value,a=o[1];if(t.pathname.match(this.regexCache.get(o[0]))){for(var c,s=i(a);!(c=s()).done;){var h=c.value,u=h[1];if(e.pathname.match(this.regexCache.get(h[0])))return u}break}}return null},t}(),u=/*#__PURE__*/function(){function t(t){var e=this;void 0===t&&(t={}),this.isTransitioning=!1,this.currentCacheEntry=null,this.cache=new Map,this.onClick=function(t){if(!t.metaKey&&!t.ctrlKey){var n=a(t.currentTarget.href);if(e.currentLocation=a(window.location.href),e.currentLocation.href!==n.href||e.currentLocation.hasHash&&!n.hasHash)return t.preventDefault(),void e.navigateTo(n.raw,t.currentTarget.dataset.transition||!1,t.currentTarget);e.currentLocation.hasHash||n.hasHash||t.preventDefault()}},this.onPopstate=function(){return window.location.pathname!==e.currentLocation.pathname&&(e.isTransitioning?(window.history.pushState({},"",e.currentLocation.href),!1):void e.navigateTo(window.location.href,!1,"popstate"))};var n=t.links,r=void 0===n?"a:not([target]):not([href^=\\#]):not([data-taxi-ignore])":n,i=t.removeOldContent,o=void 0===i||i,c=t.renderers,s=t.transitions,h=void 0===s?{default:f}:s,u=t.reloadJsFilter,d=void 0===u?function(t){return!("__bs_script__"===(null==t?void 0:t.id)||null!=t&&t.src.includes("browser-sync-client.js"))}:u;this.renderers=void 0===c?{default:l}:c,this.transitions=h,this.defaultRenderer=this.renderers.default||l,this.defaultTransition=this.transitions.default||f,this.wrapper=document.querySelector("[data-taxi]"),this.reloadJsFilter=d,this.removeOldContent=o,this.cache=new Map,this.attachEvents(r),this.currentLocation=a(window.location.href),this.cache.set(this.currentLocation.href,this.createCacheEntry(document.cloneNode(!0))),this.currentCacheEntry=this.cache.get(this.currentLocation.href),this.currentCacheEntry.renderer.initialLoad()}var n=t.prototype;return n.setDefaultRenderer=function(t){this.defaultRenderer=this.renderers[t]},n.setDefaultTransition=function(t){this.defaultTransition=this.transitions[t]},n.addRoute=function(t,e,n){this.router||(this.router=new h),this.router.add(t,e,n)},n.preload=function(t){var e=this;return t=a(t).href,this.cache.has(t)?Promise.resolve():this.fetch(t).then(function(n){try{return e.cache.set(t,e.createCacheEntry(n)),Promise.resolve()}catch(t){return Promise.reject(t)}})},n.updateCache=function(){var t=a(window.location.href).href;this.cache.has(t)&&(this.cache.delete(t),this.cache.set(t,this.createCacheEntry(document.cloneNode(!0))))},n.clearCache=function(t){var e=a(t||window.location.href).href;this.cache.has(e)&&this.cache.delete(e)},n.navigateTo=function(t,e,n){var r=this;return void 0===e&&(e=!1),void 0===n&&(n=!1),new Promise(function(i,o){if(r.isTransitioning)o(new Error("A transition is currently in progress"));else{r.targetLocation=a(t);var c=new(r.chooseTransition(e))({wrapper:r.wrapper});r.beforeFetch(r.targetLocation,c,n).then(function(){try{return r.cache.has(r.targetLocation.href)?Promise.resolve(r.afterFetch(r.targetLocation,c,r.cache.get(r.targetLocation.href),n)):Promise.resolve(r.fetch(r.targetLocation.raw).then(function(t){try{return Promise.resolve(r.afterFetch(r.targetLocation,c,r.createCacheEntry(t),n))}catch(t){return Promise.reject(t)}}))}catch(t){return Promise.reject(t)}}).then(function(){i()})}})},n.on=function(t,n){e.default.on(t,n)},n.off=function(t,n){e.default.off(t,n)},n.beforeFetch=function(t,n,r){var i=this;return this.isTransitioning=!0,e.default.emit("NAVIGATE_OUT",{from:this.currentCacheEntry,trigger:r}),new Promise(function(e){i.currentCacheEntry.renderer.leave(n,r,i.removeOldContent).then(function(){"popstate"!==r&&window.history.pushState({},"",t.raw),e()})})},n.afterFetch=function(t,n,r,i){var o=this;return this.cache.has(t.href)||this.cache.set(t.href,r),this.currentLocation=t,e.default.emit("NAVIGATE_IN",{from:this.currentCacheEntry,to:r,trigger:i}),new Promise(function(t){r.renderer.update(),o.loadScripts(r.scripts),r.renderer.enter(n,i).then(function(){e.default.emit("NAVIGATE_END",{from:o.currentCacheEntry,to:r,trigger:i}),o.currentCacheEntry=r,o.isTransitioning=!1,t()})})},n.loadScripts=function(t){for(var e,n=[].concat(t),r=[].concat(document.querySelectorAll("script:not([data-no-reload])")).filter(this.reloadJsFilter),o=0;o<r.length;o++)for(var a=0;a<n.length;a++)if(r[o].outerHTML===n[a].outerHTML){(e=r[o]).parentNode.replaceChild(s(e),e),n.splice(a,1);break}for(var h,u=i(n);!(h=u()).done;)c(h.value)},n.attachEvents=function(t){e.default.delegate("click",t,this.onClick),e.default.on("popstate",window,this.onPopstate)},n.fetch=function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return new Promise(function(e){fetch(t,{mode:"same-origin",method:"GET",headers:{"X-Requested-With":"Taxi"},credentials:"same-origin"}).then(function(e){return e.ok||(console.warn("Taxi encountered a non 2xx HTTP status code"),window.location.href=t),e.text()}).then(function(t){var n;e("string"==typeof(n=t)?o.parseFromString(n,"text/html"):n)}).catch(function(e){console.warn(e),window.location.href=t})})}),n.chooseTransition=function(t){var e;if(t)return this.transitions[t];var n=null==(e=this.router)?void 0:e.findMatch(this.currentLocation,this.targetLocation);return n?this.transitions[n]:this.defaultTransition},n.createCacheEntry=function(t){var e=t.querySelector("[data-taxi-view]"),n=e.dataset.taxiView.length?this.renderers[e.dataset.taxiView]:this.defaultRenderer;return{page:t,content:e,scripts:[].concat(t.querySelectorAll("script:not([data-no-reload])")).filter(this.reloadJsFilter),title:t.title,renderer:new n({wrapper:this.wrapper,title:t.title,content:e,page:t})}},t}(),f=/*#__PURE__*/function(){function t(t){this.wrapper=t.wrapper}var e=t.prototype;return e.leave=function(t){var e=this;return new Promise(function(r){e.onLeave(n({},t,{done:r}))})},e.enter=function(t){var e=this;return new Promise(function(r){e.onEnter(n({},t,{done:r}))})},e.onLeave=function(t){(0,t.done)()},e.onEnter=function(t){(0,t.done)()},t}(),l=/*#__PURE__*/function(){function t(t){var e=t.page,n=t.title,r=t.wrapper;this._contentString=t.content.outerHTML,this.page=e,this.title=n,this.wrapper=r,this.content=this.wrapper.lastElementChild}var e=t.prototype;return e.onEnter=function(){},e.onEnterCompleted=function(){},e.onLeave=function(){},e.onLeaveCompleted=function(){},e.initialLoad=function(){this.onEnter(),this.onEnterCompleted()},e.update=function(){document.title=this.title,this.wrapper.insertAdjacentHTML("beforeend",this._contentString),this.content=this.wrapper.lastElementChild},e.remove=function(){this.wrapper.firstElementChild.remove()},e.enter=function(t,e){var n=this;return new Promise(function(r){n.onEnter(),t.enter({trigger:e,to:n.content}).then(function(){n.onEnterCompleted(),r()})})},e.leave=function(t,e,n){var r=this;return new Promise(function(i){r.onLeave(),t.leave({trigger:e,from:r.content}).then(function(){n&&r.remove(),r.onLeaveCompleted(),i()})})},t}();exports.Core=u,exports.Renderer=l,exports.Transition=f;
//# sourceMappingURL=taxi.js.map
