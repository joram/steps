(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{197:function(e,n,t){e.exports=t(475)},202:function(e,n,t){},204:function(e,n,t){},475:function(e,n,t){"use strict";t.r(n);var o=t(0),a=t.n(o),r=t(41),c=t.n(r),i=(t(202),t(203),t(204),t(64));function l(e){console.log(e.hex);var n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({state:{color:e.rgb}})};fetch("/api/v0/state",n).then((function(e){return e.json()})).then((function(e){console.log(e)}))}function s(){return a.a.createElement("div",{className:"App"},a.a.createElement(i.CirclePicker,{onChangeComplete:l}))}var h=t(488);function u(e){console.log(e.hex);var n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({state:{mode:"rainbow"}})};fetch("/api/v0/state",n).then((function(e){return e.json()})).then((function(e){console.log(e)}))}function m(){return a.a.createElement("div",{className:"App"},a.a.createElement(h.a,{onClick:u},"Do Rainbow"))}var f={mode:"fading",colors:[{r:255,g:255,b:255},{r:0,g:0,b:0}]};function p(e){console.log(e.hex),f.colors[0]=e.rgb;var n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(f)};fetch("/api/v0/state",n).then((function(e){return e.json()})).then((function(e){console.log(e)}))}function g(e){console.log(e.hex),f.colors[1]=e.rgb;var n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(f)};fetch("/api/v0/state",n).then((function(e){return e.json()})).then((function(e){console.log(e)}))}function d(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(i.CirclePicker,{onChangeComplete:p}),a.a.createElement(i.CirclePicker,{onChangeComplete:g}))}var v=t(487);var E=function(){return a.a.createElement("div",{className:"App"},a.a.createElement(v.a,{horizontal:!0}),a.a.createElement(s,null),a.a.createElement(v.a,{horizontal:!0}),a.a.createElement(m,null),a.a.createElement(v.a,{horizontal:!0}),a.a.createElement(d,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[197,1,2]]]);
//# sourceMappingURL=main.2e38b6bb.chunk.js.map