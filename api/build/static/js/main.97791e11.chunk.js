(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{287:function(e,t,a){e.exports=a(412)},292:function(e,t,a){},294:function(e,t,a){},412:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(88),r=a.n(l),c=(a(292),a(293),a(294),a(167)),i=a(168),s=a(197),m=a(192),u=a(274),h=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(e=t.call.apply(t,[this].concat(o))).state={color:e.props.color},e}return Object(i.a)(a,[{key:"rgbToHex",value:function(e){return"#"+((1<<24)+(e.r<<16)+(e.g<<8)+e.b).toString(16).slice(1)}},{key:"colorChanged",value:function(e){console.log(e.hex);var t=this.state;t.color=e.rgb,this.setState(t),this.props.onChangeComplete(e)}},{key:"colorChangedSingleValue",value:function(e){var t=this.state;t.color[e.target.name]=e.target.value,this.setState(t),this.props.onChangeComplete(t.color)}},{key:"render",value:function(){return console.log(this.state.color),o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{style:{backgroundColor:this.rgbToHex(this.state.color),border:"solid thin black",width:"238px",height:"50px",marginBottom:"10px"}}),o.a.createElement(u.a,{onChange:this.colorChanged.bind(this)}),o.a.createElement("div",{style:{float:"left",paddingTop:"10px"}},o.a.createElement("input",{max:255,min:0,name:"r",type:"number",style:{width:"80px"},value:this.state.color.r,onChange:this.colorChangedSingleValue.bind(this)}),o.a.createElement("input",{max:255,min:0,name:"g",type:"number",style:{width:"80px"},value:this.state.color.g,onChange:this.colorChangedSingleValue.bind(this)}),o.a.createElement("input",{max:255,min:0,name:"b",type:"number",style:{width:"80px"},value:this.state.color.b,onChange:this.colorChangedSingleValue.bind(this)})))}}]),a}(o.a.Component);function p(e){console.log(e.hex);var t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({state:{color:e.rgb}})};fetch("/api/v0/state",t).then((function(e){return e.json()})).then((function(e){console.log(e)}))}function g(){return o.a.createElement("div",{className:"App"},o.a.createElement(h,{color:{r:255,g:255,b:255},onChangeComplete:p}))}var d=a(459),f=a(156);function E(){j({mode:"solid_rainbow"})}function b(){j({mode:"sliding_rainbow"})}function v(){j({mode:"off"})}function C(){j({mode:"per_step"})}function y(){j({mode:"nyan_cat"})}function S(){j({mode:"nyan_cats"})}function k(){j({mode:"halloween"})}function w(){j({mode:"solid_sparkly",primary:{r:0,g:50,b:0},sparkles:{r:255,g:255,b:255}})}function O(){j({mode:"chaos_colors"})}function j(e){var t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({state:e})};fetch("/api/v0/state",t).then((function(e){return e.json()})).then((function(e){console.log(e)}))}function x(){return o.a.createElement("div",{className:"App"},o.a.createElement(d.a,null,o.a.createElement(d.a.Item,null,o.a.createElement(f.a,{onClick:E},"Solid Rainbow")),o.a.createElement(d.a.Item,null,o.a.createElement(f.a,{onClick:b},"Sliding Rainbow")),o.a.createElement(d.a.Item,null,o.a.createElement(f.a,{onClick:k},"Halloween")),o.a.createElement(d.a.Item,null,o.a.createElement(f.a,{onClick:C},"Per Step")),o.a.createElement(d.a.Item,null,o.a.createElement(f.a,{onClick:y},"Nyan Cat")),o.a.createElement(d.a.Item,null,o.a.createElement(f.a,{onClick:S},"Nyan Cats")),o.a.createElement(d.a.Item,null,o.a.createElement(f.a,{onClick:w},"Solid Sparkly")),o.a.createElement(d.a.Item,null,o.a.createElement(f.a,{onClick:O},"Chaos Colors")),o.a.createElement(d.a.Item,null,o.a.createElement(f.a,{onClick:v},"Off"))))}var I=a(268),T=function(e){Object(s.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,o=new Array(n),l=0;l<n;l++)o[l]=arguments[l];return(e=t.call.apply(t,[this].concat(o))).state={serverState:{mode:"fading",colors:[{r:255,g:255,b:255},{r:0,g:0,b:0}]}},e}return Object(i.a)(a,[{key:"pushStateChange",value:function(){var e={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({state:this.state.serverState})};fetch("/api/v0/state",e).then((function(e){return e.json()})).then((function(e){console.log(e)}))}},{key:"rgbToHex",value:function(e){return"#"+((1<<24)+(e.r<<16)+(e.g<<8)+e.b).toString(16).slice(1)}},{key:"color1Changed",value:function(e){console.log(e.hex);var t=this.state;t.serverState.colors[0]=e.rgb,this.setState(t),this.pushStateChange()}},{key:"color2Changed",value:function(e){console.log(e.hex);var t=this.state;t.serverState.colors[1]=e.rgb,this.setState(t),this.pushStateChange()}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(I.a,null,o.a.createElement(I.a.Row,{columns:2},o.a.createElement(I.a.Column,null,o.a.createElement(h,{color:this.state.serverState.colors[0],onChangeComplete:this.color1Changed.bind(this)})),o.a.createElement(I.a.Column,null,o.a.createElement(h,{color:this.state.serverState.colors[1],onChangeComplete:this.color2Changed.bind(this)})))))}}]),a}(o.a.Component),N=a(270),_=a(461),A=a(226),P=a(460),J=a(82),M=a(23),F=a(225),H=a.n(F),R=a(269);function V(){var e=function(){var e=Object(R.a)(H.a.mark((function e(t){var a,n;return H.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(t.target.files[0]),a={method:"POST"},n={name:t.target.files[0].name,file:t.target.files[0]},console.log(n),fetch("http://localhost:5000/api/v0/file",a,n=n);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return o.a.createElement("div",{className:"App"},o.a.createElement("div",null,"Pick an image that is 300 pixels tall"),o.a.createElement("input",{type:"file",name:"image",onChange:e}))}var B=a(119),W=a(223),U=a.n(W);function $(e,t){var a={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({state:{mode:"solid_rough",color:e,variance:t}})};fetch("/api/v0/state",a).then((function(e){return e.json()})).then((function(e){console.log(e)}))}function q(){var e=Object(n.useState)(10),t=Object(B.a)(e,2),a=t[0],l=t[1],r=Object(n.useState)({r:0,b:0,g:0}),c=Object(B.a)(r,2),i=c[0],s=c[1];return o.a.createElement("div",{className:"App"},o.a.createElement(h,{color:{r:255,g:255,b:255},onChangeComplete:function(e){s(e.rgb),$(i,a)}}),o.a.createElement("br",null),o.a.createElement(U.a,{value:a,onChange:function(e){l(e),$(i,a)}}))}function z(){var e=Object(n.useState)(10),t=Object(B.a)(e,2),a=(t[0],t[1],Object(n.useState)({r:0,b:0,g:0})),l=Object(B.a)(a,2);l[0],l[1];return o.a.createElement("div",{className:"App"},"new logic goes here")}var D=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(J.a,null,o.a.createElement(N.a,{attached:"top"},o.a.createElement(_.a,{item:!0,icon:"wrench",simple:!0},o.a.createElement(_.a.Menu,null,o.a.createElement(_.a.Item,{as:J.b,to:"/solid"},"Solid"),o.a.createElement(_.a.Item,{as:J.b,to:"/solid_rough"},"Solid Rough"),o.a.createElement(_.a.Item,{as:J.b,to:"/fading"},"Fading"),o.a.createElement(_.a.Item,{as:J.b,to:"/prebuilt"},"Prebuilt Modes"),o.a.createElement(_.a.Item,{as:J.b,to:"/muffin"},"Muffin Mode"),o.a.createElement(_.a.Item,{as:J.b,to:"/file"},"File Upload")))),o.a.createElement(A.a,{attached:"bottom"},o.a.createElement(P.a,null,o.a.createElement(M.c,null,o.a.createElement(M.a,{path:"/file"},o.a.createElement(V,null)),o.a.createElement(M.a,{path:"/solid"},o.a.createElement(g,null)),o.a.createElement(M.a,{path:"/solid_rough"},o.a.createElement(q,null)),o.a.createElement(M.a,{path:"/prebuilt"},o.a.createElement(x,null)),o.a.createElement(M.a,{path:"/fading"},o.a.createElement(T,null)),o.a.createElement(M.a,{path:"/muffin"},o.a.createElement(z,null)),o.a.createElement(M.a,{path:"/"},o.a.createElement(g,null)))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[287,1,2]]]);
//# sourceMappingURL=main.97791e11.chunk.js.map