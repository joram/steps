(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{255:function(e,t,a){e.exports=a(534)},260:function(e,t,a){},262:function(e,t,a){},534:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(63),l=a.n(r),c=(a(260),a(261),a(262),a(117)),i=a(118),s=a(137),u=a(142),m=a(240),h=function(e){Object(u.a)(a,e);var t=Object(s.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={color:e.props.color},e}return Object(i.a)(a,[{key:"rgbToHex",value:function(e){return"#"+((1<<24)+(e.r<<16)+(e.g<<8)+e.b).toString(16).slice(1)}},{key:"colorChanged",value:function(e){console.log(e.hex);var t=this.state;t.color=e.rgb,this.setState(t),this.props.onChangeComplete(e)}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{style:{backgroundColor:this.rgbToHex(this.state.color),border:"solid thin black",width:"238px",height:"50px",marginBottom:"10px"}}),o.a.createElement(m.BlockPicker,{onChange:this.colorChanged.bind(this)}))}}]),a}(o.a.Component);function g(e){console.log(e.hex);var t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({state:{color:e.rgb}})};fetch("/api/v0/state",t).then((function(e){return e.json()})).then((function(e){console.log(e)}))}function d(){return o.a.createElement("div",{className:"App"},o.a.createElement(h,{color:{r:255,g:255,b:255},onChangeComplete:g}))}var p=a(546),f=a(548);function E(){k({mode:"solid_rainbow"})}function b(){k({mode:"sliding_rainbow"})}function v(){k({mode:"off"})}function C(){k({mode:"per_step"})}function y(){k({mode:"nyan_cat"})}function S(){k({mode:"fading",colors:[{r:255,g:0,b:0},{r:255,g:66,b:0}]})}function k(e){var t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({state:e})};fetch("/api/v0/state",t).then((function(e){return e.json()})).then((function(e){console.log(e)}))}function w(){return o.a.createElement("div",{className:"App"},o.a.createElement(p.a,null,o.a.createElement(p.a.Item,null,o.a.createElement(f.a,{onClick:E},"Solid Rainbow")),o.a.createElement(p.a.Item,null,o.a.createElement(f.a,{onClick:b},"Sliding Rainbow")),o.a.createElement(p.a.Item,null,o.a.createElement(f.a,{onClick:S},"Halloween")),o.a.createElement(p.a.Item,null,o.a.createElement(f.a,{onClick:C},"Per Step")),o.a.createElement(p.a.Item,null,o.a.createElement(f.a,{onClick:y},"Nyan Cat")),o.a.createElement(p.a.Item,null,o.a.createElement(f.a,{onClick:v},"Off"))))}var O=a(549),j=function(e){Object(u.a)(a,e);var t=Object(s.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={serverState:{mode:"fading",colors:[{r:255,g:255,b:255},{r:0,g:0,b:0}]}},e}return Object(i.a)(a,[{key:"pushStateChange",value:function(){var e={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({state:this.state.serverState})};fetch("/api/v0/state",e).then((function(e){return e.json()})).then((function(e){console.log(e)}))}},{key:"rgbToHex",value:function(e){return"#"+((1<<24)+(e.r<<16)+(e.g<<8)+e.b).toString(16).slice(1)}},{key:"color1Changed",value:function(e){console.log(e.hex);var t=this.state;t.serverState.colors[0]=e.rgb,this.setState(t),this.pushStateChange()}},{key:"color2Changed",value:function(e){console.log(e.hex);var t=this.state;t.serverState.colors[1]=e.rgb,this.setState(t),this.pushStateChange()}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(O.a,null,o.a.createElement(O.a.Row,{columns:2},o.a.createElement(O.a.Column,null,o.a.createElement(h,{color:this.state.serverState.colors[0],onChangeComplete:this.color1Changed.bind(this)})),o.a.createElement(O.a.Column,null,o.a.createElement(h,{color:this.state.serverState.colors[1],onChangeComplete:this.color2Changed.bind(this)})))))}}]),a}(o.a.Component),x=a(545),I=a(544),T=a(550),N=a(543),P=a(97),A=a(11);var J=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(P.a,null,o.a.createElement(x.a,{attached:"top"},o.a.createElement(I.a,{item:!0,icon:"wrench",simple:!0},o.a.createElement(I.a.Menu,null,o.a.createElement(I.a.Item,{as:P.b,to:"/solid"},"Solid"),o.a.createElement(I.a.Item,{as:P.b,to:"/fading"},"Fading"),o.a.createElement(I.a.Item,{as:P.b,to:"/prebuilt"},"Prebuilt Modes")))),o.a.createElement(T.a,{attached:"bottom"},o.a.createElement(N.a,null,o.a.createElement(A.c,null,o.a.createElement(A.a,{path:"/solid"},o.a.createElement(d,null)),o.a.createElement(A.a,{path:"/prebuilt"},o.a.createElement(w,null)),o.a.createElement(A.a,{path:"/fading"},o.a.createElement(j,null)),o.a.createElement(A.a,{path:"/"},o.a.createElement(d,null)))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(J,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[255,1,2]]]);
//# sourceMappingURL=main.d4251429.chunk.js.map