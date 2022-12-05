import t from"@unseenco/e";function e(){return e=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},e.apply(this,arguments)}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function r(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(r)return(r=r.call(t)).next.bind(r);if(Array.isArray(t)||(r=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var i=0;return function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i=new DOMParser;function o(t){var e=new URL(t,window.location.origin),n=null;return e.hash.length&&(n=t.replace(e.hash,"")),{hasHash:e.hash.length>0,pathname:e.pathname,host:e.host,raw:t,href:n||e.href}}function a(t){"HEAD"===t.parentNode.tagName?document.head.appendChild(c(t)):document.body.appendChild(c(t))}function c(t){for(var e=document.createElement("SCRIPT"),n=0;n<t.attributes.length;n++){var r=t.attributes[n];e.setAttribute(r.nodeName,r.nodeValue)}return t.innerHTML&&(e.innerHTML=t.innerHTML),e}var s=/*#__PURE__*/function(){function t(t){this.wrapper=t.wrapper}var n=t.prototype;return n.leave=function(t){var n=this;return new Promise(function(r){n.onLeave(e({},t,{done:r}))})},n.enter=function(t){var n=this;return new Promise(function(r){n.onEnter(e({},t,{done:r}))})},n.onLeave=function(t){(0,t.done)()},n.onEnter=function(t){(0,t.done)()},t}(),h=/*#__PURE__*/function(){function t(t){var e=t.page,n=t.title,r=t.wrapper;this._contentString=t.content.outerHTML,this._DOM=null,this.page=e,this.title=n,this.wrapper=r,this.content=this.wrapper.lastElementChild}var e=t.prototype;return e.onEnter=function(){},e.onEnterCompleted=function(){},e.onLeave=function(){},e.onLeaveCompleted=function(){},e.initialLoad=function(){this.onEnter(),this.onEnterCompleted()},e.update=function(){document.title=this.title,this.wrapper.appendChild(this._DOM.firstElementChild),this.content=this.wrapper.lastElementChild,this._DOM=null},e.createDom=function(){this._DOM||(this._DOM=document.createElement("div"),this._DOM.innerHTML=this._contentString)},e.remove=function(){this.wrapper.firstElementChild.remove()},e.enter=function(t,e){var n=this;return new Promise(function(r){n.onEnter(),t.enter({trigger:e,to:n.content}).then(function(){n.onEnterCompleted(),r()})})},e.leave=function(t,e,n){var r=this;return new Promise(function(i){r.onLeave(),t.leave({trigger:e,from:r.content}).then(function(){n&&r.remove(),r.onLeaveCompleted(),i()})})},t}(),u=/*#__PURE__*/function(){function t(){this.data=new Map,this.regexCache=new Map}var e=t.prototype;return e.add=function(t,e,n){this.data.has(t)||(this.data.set(t,new Map),this.regexCache.set(t,new RegExp("^"+t+"$"))),this.data.get(t).set(e,n),this.regexCache.set(e,new RegExp("^"+e+"$"))},e.findMatch=function(t,e){for(var n,i=r(this.data);!(n=i()).done;){var o=n.value,a=o[1];if(t.pathname.match(this.regexCache.get(o[0]))){for(var c,s=r(a);!(c=s()).done;){var h=c.value,u=h[1];if(e.pathname.match(this.regexCache.get(h[0])))return u}break}}return null},t}(),f="A transition is currently in progress",l=/*#__PURE__*/function(){function e(t){var e=this;void 0===t&&(t={}),this.isTransitioning=!1,this.currentCacheEntry=null,this.cache=new Map,this.onClick=function(t){if(!t.metaKey&&!t.ctrlKey){var n=o(t.currentTarget.href);if(e.currentLocation=o(window.location.href),e.currentLocation.host!==n.host)return;if(e.currentLocation.href!==n.href||e.currentLocation.hasHash&&!n.hasHash)return t.preventDefault(),void e.navigateTo(n.raw,t.currentTarget.dataset.transition||!1,t.currentTarget).catch(function(t){return console.warn(t)});e.currentLocation.hasHash||n.hasHash||t.preventDefault()}},this.onPopstate=function(){return!(window.location.pathname===e.currentLocation.pathname&&!e.isPopping)&&(e.allowInterruption||!e.isTransitioning&&!e.isPopping?(e.isPopping||(e.popTarget=window.location.href),e.isPopping=!0,void e.navigateTo(window.location.href,!1,"popstate")):(window.history.pushState({},"",e.popTarget),console.warn(f),!1))};var n=t.links,r=void 0===n?"a:not([target]):not([href^=\\#]):not([data-taxi-ignore])":n,i=t.removeOldContent,a=void 0===i||i,c=t.allowInterruption,u=void 0!==c&&c,l=t.bypassCache,d=void 0!==l&&l,p=t.renderers,g=t.transitions,v=void 0===g?{default:s}:g,m=t.reloadJsFilter,w=void 0===m?function(t){return void 0!==t.dataset.taxiReload}:m;this.renderers=void 0===p?{default:h}:p,this.transitions=v,this.defaultRenderer=this.renderers.default||h,this.defaultTransition=this.transitions.default||s,this.wrapper=document.querySelector("[data-taxi]"),this.reloadJsFilter=w,this.removeOldContent=a,this.allowInterruption=u,this.bypassCache=d,this.cache=new Map,this.isPopping=!1,this.attachEvents(r),this.currentLocation=o(window.location.href),this.cache.set(this.currentLocation.href,this.createCacheEntry(document.cloneNode(!0))),this.currentCacheEntry=this.cache.get(this.currentLocation.href),this.currentCacheEntry.renderer.initialLoad()}var n=e.prototype;return n.setDefaultRenderer=function(t){this.defaultRenderer=this.renderers[t]},n.setDefaultTransition=function(t){this.defaultTransition=this.transitions[t]},n.addRoute=function(t,e,n){this.router||(this.router=new u),this.router.add(t,e,n)},n.preload=function(t,e){var n=this;return void 0===e&&(e=!1),t=o(t).href,this.cache.has(t)?Promise.resolve():this.fetch(t,!1).then(function(r){try{return n.cache.set(t,n.createCacheEntry(r)),e&&n.cache.get(t).renderer.createDom(),Promise.resolve()}catch(t){return Promise.reject(t)}})},n.updateCache=function(){var t=o(window.location.href).href;this.cache.has(t)&&(this.cache.delete(t),this.cache.set(t,this.createCacheEntry(document.cloneNode(!0))))},n.clearCache=function(t){var e=o(t||window.location.href).href;this.cache.has(e)&&this.cache.delete(e)},n.navigateTo=function(t,e,n){var r=this;return void 0===e&&(e=!1),void 0===n&&(n=!1),new Promise(function(i,a){if(r.allowInterruption||!r.isTransitioning){r.isTransitioning=!0,r.isPopping=!0,r.targetLocation=o(t),r.popTarget=window.location.href;var c,s=new(r.chooseTransition(e))({wrapper:r.wrapper});if(r.bypassCache||!r.cache.has(r.targetLocation.href)||r.cache.get(r.targetLocation.href).skipCache){var h=r.fetch(r.targetLocation.raw).then(function(t){r.cache.set(r.targetLocation.href,r.createCacheEntry(t)),r.cache.get(r.targetLocation.href).renderer.createDom()});c=r.beforeFetch(r.targetLocation,s,n).then(function(){try{return Promise.resolve(h.then(function(t){try{return Promise.resolve(r.afterFetch(r.targetLocation,s,r.cache.get(r.targetLocation.href),n))}catch(t){return Promise.reject(t)}}))}catch(t){return Promise.reject(t)}})}else r.cache.get(r.targetLocation.href).renderer.createDom(),c=r.beforeFetch(r.targetLocation,s,n).then(function(){try{return Promise.resolve(r.afterFetch(r.targetLocation,s,r.cache.get(r.targetLocation.href),n))}catch(t){return Promise.reject(t)}});c.then(function(){i()})}else a(new Error(f))})},n.on=function(e,n){t.on(e,n)},n.off=function(e,n){t.off(e,n)},n.beforeFetch=function(e,n,r){var i=this;return t.emit("NAVIGATE_OUT",{from:this.currentCacheEntry,trigger:r}),new Promise(function(t){i.currentCacheEntry.renderer.leave(n,r,i.removeOldContent).then(function(){"popstate"!==r&&window.history.pushState({},"",e.raw),t()})})},n.afterFetch=function(e,n,r,i){var o=this;return this.currentLocation=e,this.popTarget=this.currentLocation.href,new Promise(function(e){r.renderer.update(),t.emit("NAVIGATE_IN",{from:o.currentCacheEntry,to:r,trigger:i}),o.reloadJsFilter&&o.loadScripts(r.scripts),r.renderer.enter(n,i).then(function(){t.emit("NAVIGATE_END",{from:o.currentCacheEntry,to:r,trigger:i}),o.currentCacheEntry=r,o.isTransitioning=!1,o.isPopping=!1,e()})})},n.loadScripts=function(t){for(var e,n=[].concat(t),i=Array.from(document.querySelectorAll("script")).filter(this.reloadJsFilter),o=0;o<i.length;o++)for(var s=0;s<n.length;s++)if(i[o].outerHTML===n[s].outerHTML){(e=i[o]).parentNode.replaceChild(c(e),e),n.splice(s,1);break}for(var h,u=r(n);!(h=u()).done;)a(h.value)},n.attachEvents=function(e){t.delegate("click",e,this.onClick),t.on("popstate",window,this.onPopstate)},n.fetch=function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t,e){return void 0===e&&(e=!0),new Promise(function(n,r){fetch(t,{mode:"same-origin",method:"GET",headers:{"X-Requested-With":"Taxi"},credentials:"same-origin"}).then(function(n){return n.ok||(r("Taxi encountered a non 2xx HTTP status code"),e&&(window.location.href=t)),n.text()}).then(function(t){var e;n("string"==typeof(e=t)?i.parseFromString(e,"text/html"):e)}).catch(function(n){r(n),e&&(window.location.href=t)})})}),n.chooseTransition=function(t){var e;if(t)return this.transitions[t];var n=null==(e=this.router)?void 0:e.findMatch(this.currentLocation,this.targetLocation);return n?this.transitions[n]:this.defaultTransition},n.createCacheEntry=function(t){var e=t.querySelector("[data-taxi-view]"),n=e.dataset.taxiView.length?this.renderers[e.dataset.taxiView]:this.defaultRenderer;return n||console.warn('The Renderer "'+e.dataset.taxiView+'" was set in the data-taxi-view of the requested page, but not registered in Taxi.'),{page:t,content:e,skipCache:e.hasAttribute("data-taxi-nocache"),scripts:this.reloadJsFilter?Array.from(t.querySelectorAll("script")).filter(this.reloadJsFilter):[],title:t.title,renderer:new n({wrapper:this.wrapper,title:t.title,content:e,page:t})}},e}();export{l as Core,h as Renderer,s as Transition};
//# sourceMappingURL=taxi.esm.js.map
