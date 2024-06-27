var gs=Object.defineProperty;var ms=(f,O,H)=>O in f?gs(f,O,{enumerable:!0,configurable:!0,writable:!0,value:H}):f[O]=H;var C=(f,O,H)=>ms(f,typeof O!="symbol"?O+"":O,H);(function(f,O){typeof exports=="object"&&typeof module<"u"?O(require("vue")):typeof define=="function"&&define.amd?define(["vue"],O):(f=typeof globalThis<"u"?globalThis:f||self,O(f.Vue))})(this,function(f){"use strict";/*!
 * vue-global-events v3.0.1
 * (c) 2019-2023 Eduardo San Martin Morote, Damian Dulisz
 * Released under the MIT License.
 */let O;function H(){return O??(O=/msie|trident/.test(window.navigator.userAgent.toLowerCase()))}const fe=/^on(\w+?)((?:Once|Capture|Passive)*)$/,he=/[OCP]/g;function de(t){return t?H()?t.includes("Capture"):t.replace(he,",$&").toLowerCase().slice(1).split(",").reduce((r,n)=>(r[n]=!0,r),{}):void 0}const pe=f.defineComponent({name:"GlobalEvents",props:{target:{type:String,default:"document"},filter:{type:[Function,Array],default:()=>()=>!0},stop:Boolean,prevent:Boolean},setup(t,{attrs:e}){let r=Object.create(null);const n=f.ref(!0);return f.onActivated(()=>{n.value=!0}),f.onDeactivated(()=>{n.value=!1}),f.onMounted(()=>{Object.keys(e).filter(i=>i.startsWith("on")).forEach(i=>{const l=e[i],u=Array.isArray(l)?l:[l],c=i.match(fe);if(!c){__DEV__&&console.warn(`[vue-global-events] Unable to parse "${i}". If this should work, you should probably open a new issue on https://github.com/shentao/vue-global-events.`);return}let[,h,g]=c;h=h.toLowerCase();const _=u.map(m=>v=>{const F=Array.isArray(t.filter)?t.filter:[t.filter];n.value&&F.every(T=>T(v,m,h))&&(t.stop&&v.stopPropagation(),t.prevent&&v.preventDefault(),m(v))}),p=de(g);_.forEach(m=>{window[t.target].addEventListener(h,m,p)}),r[i]=[_,h,p]})}),f.onBeforeUnmount(()=>{for(const i in r){const[l,u,c]=r[i];l.forEach(h=>{window[t.target].removeEventListener(u,h,c)})}r={}}),()=>null}});var B=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function at(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function ye(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var Q=ye,ge=typeof B=="object"&&B&&B.Object===Object&&B,me=ge,_e=me,ve=typeof self=="object"&&self&&self.Object===Object&&self,be=_e||ve||Function("return this")(),W=be,Se=W,$e=function(){return Se.Date.now()},we=$e,Oe=/\s/;function Fe(t){for(var e=t.length;e--&&Oe.test(t.charAt(e)););return e}var je=Fe,Ce=je,Ae=/^\s+/;function Te(t){return t&&t.slice(0,Ce(t)+1).replace(Ae,"")}var Ie=Te,Ee=W,xe=Ee.Symbol,st=xe,St=st,$t=Object.prototype,Re=$t.hasOwnProperty,Pe=$t.toString,Y=St?St.toStringTag:void 0;function Le(t){var e=Re.call(t,Y),r=t[Y];try{t[Y]=void 0;var n=!0}catch{}var i=Pe.call(t);return n&&(e?t[Y]=r:delete t[Y]),i}var De=Le,Me=Object.prototype,ke=Me.toString;function Ue(t){return ke.call(t)}var qe=Ue,wt=st,He=De,Be=qe,Ge="[object Null]",Ne="[object Undefined]",Ot=wt?wt.toStringTag:void 0;function ze(t){return t==null?t===void 0?Ne:Ge:Ot&&Ot in Object(t)?He(t):Be(t)}var lt=ze;function Ve(t){return t!=null&&typeof t=="object"}var X=Ve,Ke=lt,Je=X,We="[object Symbol]";function Ye(t){return typeof t=="symbol"||Je(t)&&Ke(t)==We}var Ze=Ye,Qe=Ie,Ft=Q,Xe=Ze,jt=NaN,tr=/^[-+]0x[0-9a-f]+$/i,er=/^0b[01]+$/i,rr=/^0o[0-7]+$/i,nr=parseInt;function ir(t){if(typeof t=="number")return t;if(Xe(t))return jt;if(Ft(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=Ft(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=Qe(t);var r=er.test(t);return r||rr.test(t)?nr(t.slice(2),r?2:8):tr.test(t)?jt:+t}var or=ir,ar=Q,ct=we,Ct=or,sr="Expected a function",lr=Math.max,cr=Math.min;function ur(t,e,r){var n,i,l,u,c,h,g=0,_=!1,p=!1,m=!0;if(typeof t!="function")throw new TypeError(sr);e=Ct(e)||0,ar(r)&&(_=!!r.leading,p="maxWait"in r,l=p?lr(Ct(r.maxWait)||0,e):l,m="trailing"in r?!!r.trailing:m);function v(b){var j=n,E=i;return n=i=void 0,g=b,u=t.apply(E,j),u}function F(b){return g=b,c=setTimeout(K,e),_?v(b):u}function T(b){var j=b-h,E=b-g,Z=e-j;return p?cr(Z,l-E):Z}function V(b){var j=b-h,E=b-g;return h===void 0||j>=e||j<0||p&&E>=l}function K(){var b=ct();if(V(b))return J(b);c=setTimeout(K,T(b))}function J(b){return c=void 0,m&&n?v(b):(n=i=void 0,u)}function k(){c!==void 0&&clearTimeout(c),g=0,n=h=i=c=void 0}function _t(){return c===void 0?u:J(ct())}function U(){var b=ct(),j=V(b);if(n=arguments,i=this,h=b,j){if(c===void 0)return F(h);if(p)return clearTimeout(c),c=setTimeout(K,e),v(h)}return c===void 0&&(c=setTimeout(K,e)),u}return U.cancel=k,U.flush=_t,U}var fr=ur;const At=at(fr),hr=f.defineComponent({__name:"go-plaid-scope",props:{init:{},formInit:{},useDebounce:{},observers:{}},emits:["change-debounced"],setup(t,{emit:e}){const r=t,n=e;let i=r.init;Array.isArray(i)&&(i=Object.assign({},...i));const l=f.reactive({...i});let u=r.formInit;Array.isArray(u)&&(u=Object.assign({},...u));const c=f.reactive({...u}),h=f.inject("vars"),g=f.inject("plaid");function _(){!r.observers||r.observers.length==0||f.watch(()=>h==null?void 0:h.__notification,p=>{var m;p&&((m=r.observers)==null||m.forEach(v=>{if((p==null?void 0:p.name)===v.name){let F;try{F=typeof p.payload=="string"?JSON.parse(p.payload):p.payload}catch{F=p.payload}try{new Function("name","payload","vars","locals","form","plaid",v.script)(v.name,F,h,l,c,g)}catch(T){console.error("Error executing observer script:",T)}}}))})}return f.onMounted(()=>{setTimeout(()=>{if(r.useDebounce){const p=r.useDebounce,m=At(v=>{n("change-debounced",v)},p);console.log("watched"),f.watch(l,(v,F)=>{m({locals:v,form:c,oldLocals:F,oldForm:c})}),f.watch(c,(v,F)=>{m({locals:l,form:v,oldLocals:l,oldForm:F})})}},0),_()}),(p,m)=>f.renderSlot(p.$slots,"default",{locals:l,form:c,plaid:f.unref(g),vars:f.unref(h)})}});/*! formdata-polyfill. MIT License. Jimmy W?rting <https://jimmy.warting.se/opensource> */(function(){var t;function e(o){var a=0;return function(){return a<o.length?{done:!1,value:o[a++]}:{done:!0}}}var r=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,a,s){return o==Array.prototype||o==Object.prototype||(o[a]=s.value),o};function n(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof B=="object"&&B];for(var a=0;a<o.length;++a){var s=o[a];if(s&&s.Math==Math)return s}throw Error("Cannot find global object")}var i=n(this);function l(o,a){if(a)t:{var s=i;o=o.split(".");for(var d=0;d<o.length-1;d++){var y=o[d];if(!(y in s))break t;s=s[y]}o=o[o.length-1],d=s[o],a=a(d),a!=d&&a!=null&&r(s,o,{configurable:!0,writable:!0,value:a})}}l("Symbol",function(o){function a($){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new s(d+($||"")+"_"+y++,$)}function s($,A){this.A=$,r(this,"description",{configurable:!0,writable:!0,value:A})}if(o)return o;s.prototype.toString=function(){return this.A};var d="jscomp_symbol_"+(1e9*Math.random()>>>0)+"_",y=0;return a}),l("Symbol.iterator",function(o){if(o)return o;o=Symbol("Symbol.iterator");for(var a="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),s=0;s<a.length;s++){var d=i[a[s]];typeof d=="function"&&typeof d.prototype[o]!="function"&&r(d.prototype,o,{configurable:!0,writable:!0,value:function(){return u(e(this))}})}return o});function u(o){return o={next:o},o[Symbol.iterator]=function(){return this},o}function c(o){var a=typeof Symbol<"u"&&Symbol.iterator&&o[Symbol.iterator];return a?a.call(o):{next:e(o)}}var h;if(typeof Object.setPrototypeOf=="function")h=Object.setPrototypeOf;else{var g;t:{var _={a:!0},p={};try{p.__proto__=_,g=p.a;break t}catch{}g=!1}h=g?function(o,a){if(o.__proto__=a,o.__proto__!==a)throw new TypeError(o+" is not extensible");return o}:null}var m=h;function v(){this.m=!1,this.j=null,this.v=void 0,this.h=1,this.u=this.C=0,this.l=null}function F(o){if(o.m)throw new TypeError("Generator is already running");o.m=!0}v.prototype.o=function(o){this.v=o},v.prototype.s=function(o){this.l={D:o,F:!0},this.h=this.C||this.u},v.prototype.return=function(o){this.l={return:o},this.h=this.u};function T(o,a){return o.h=3,{value:a}}function V(o){this.g=new v,this.G=o}V.prototype.o=function(o){return F(this.g),this.g.j?J(this,this.g.j.next,o,this.g.o):(this.g.o(o),k(this))};function K(o,a){F(o.g);var s=o.g.j;return s?J(o,"return"in s?s.return:function(d){return{value:d,done:!0}},a,o.g.return):(o.g.return(a),k(o))}V.prototype.s=function(o){return F(this.g),this.g.j?J(this,this.g.j.throw,o,this.g.o):(this.g.s(o),k(this))};function J(o,a,s,d){try{var y=a.call(o.g.j,s);if(!(y instanceof Object))throw new TypeError("Iterator result "+y+" is not an object");if(!y.done)return o.g.m=!1,y;var $=y.value}catch(A){return o.g.j=null,o.g.s(A),k(o)}return o.g.j=null,d.call(o.g,$),k(o)}function k(o){for(;o.g.h;)try{var a=o.G(o.g);if(a)return o.g.m=!1,{value:a.value,done:!1}}catch(s){o.g.v=void 0,o.g.s(s)}if(o.g.m=!1,o.g.l){if(a=o.g.l,o.g.l=null,a.F)throw a.D;return{value:a.return,done:!0}}return{value:void 0,done:!0}}function _t(o){this.next=function(a){return o.o(a)},this.throw=function(a){return o.s(a)},this.return=function(a){return K(o,a)},this[Symbol.iterator]=function(){return this}}function U(o,a){return a=new _t(new V(a)),m&&o.prototype&&m(a,o.prototype),a}function b(o,a){o instanceof String&&(o+="");var s=0,d=!1,y={next:function(){if(!d&&s<o.length){var $=s++;return{value:a($,o[$]),done:!1}}return d=!0,{done:!0,value:void 0}}};return y[Symbol.iterator]=function(){return y},y}if(l("Array.prototype.entries",function(o){return o||function(){return b(this,function(a,s){return[a,s]})}}),typeof Blob<"u"&&(typeof FormData>"u"||!FormData.prototype.keys)){var j=function(o,a){for(var s=0;s<o.length;s++)a(o[s])},E=function(o){return o.replace(/\r?\n|\r/g,`\r
`)},Z=function(o,a,s){return a instanceof Blob?(s=s!==void 0?s+"":typeof a.name=="string"?a.name:"blob",(a.name!==s||Object.prototype.toString.call(a)==="[object Blob]")&&(a=new File([a],s)),[String(o),a]):[String(o),String(a)]},q=function(o,a){if(o.length<a)throw new TypeError(a+" argument required, but only "+o.length+" present.")},w=typeof globalThis=="object"?globalThis:typeof window=="object"?window:typeof self=="object"?self:this,ps=w.FormData,vt=w.XMLHttpRequest&&w.XMLHttpRequest.prototype.send,ce=w.Request&&w.fetch,ue=w.navigator&&w.navigator.sendBeacon,L=w.Element&&w.Element.prototype,P=w.Symbol&&Symbol.toStringTag;P&&(Blob.prototype[P]||(Blob.prototype[P]="Blob"),"File"in w&&!File.prototype[P]&&(File.prototype[P]="File"));try{new File([],"")}catch{w.File=function(a,s,d){return a=new Blob(a,d||{}),Object.defineProperties(a,{name:{value:s},lastModified:{value:+(d&&d.lastModified!==void 0?new Date(d.lastModified):new Date)},toString:{value:function(){return"[object File]"}}}),P&&Object.defineProperty(a,P,{value:"File"}),a}}var bt=function(o){return o.replace(/\n/g,"%0A").replace(/\r/g,"%0D").replace(/"/g,"%22")},x=function(o){this.i=[];var a=this;o&&j(o.elements,function(s){if(s.name&&!s.disabled&&s.type!=="submit"&&s.type!=="button"&&!s.matches("form fieldset[disabled] *"))if(s.type==="file"){var d=s.files&&s.files.length?s.files:[new File([],"",{type:"application/octet-stream"})];j(d,function(y){a.append(s.name,y)})}else s.type==="select-multiple"||s.type==="select-one"?j(s.options,function(y){!y.disabled&&y.selected&&a.append(s.name,y.value)}):s.type==="checkbox"||s.type==="radio"?s.checked&&a.append(s.name,s.value):(d=s.type==="textarea"?E(s.value):s.value,a.append(s.name,d))})};if(t=x.prototype,t.append=function(o,a,s){q(arguments,2),this.i.push(Z(o,a,s))},t.delete=function(o){q(arguments,1);var a=[];o=String(o),j(this.i,function(s){s[0]!==o&&a.push(s)}),this.i=a},t.entries=function o(){var a,s=this;return U(o,function(d){if(d.h==1&&(a=0),d.h!=3)return a<s.i.length?d=T(d,s.i[a]):(d.h=0,d=void 0),d;a++,d.h=2})},t.forEach=function(o,a){q(arguments,1);for(var s=c(this),d=s.next();!d.done;d=s.next()){var y=c(d.value);d=y.next().value,y=y.next().value,o.call(a,y,d,this)}},t.get=function(o){q(arguments,1);var a=this.i;o=String(o);for(var s=0;s<a.length;s++)if(a[s][0]===o)return a[s][1];return null},t.getAll=function(o){q(arguments,1);var a=[];return o=String(o),j(this.i,function(s){s[0]===o&&a.push(s[1])}),a},t.has=function(o){q(arguments,1),o=String(o);for(var a=0;a<this.i.length;a++)if(this.i[a][0]===o)return!0;return!1},t.keys=function o(){var a=this,s,d,y,$,A;return U(o,function(I){if(I.h==1&&(s=c(a),d=s.next()),I.h!=3){if(d.done){I.h=0;return}return y=d.value,$=c(y),A=$.next().value,T(I,A)}d=s.next(),I.h=2})},t.set=function(o,a,s){q(arguments,2),o=String(o);var d=[],y=Z(o,a,s),$=!0;j(this.i,function(A){A[0]===o?$&&($=!d.push(y)):d.push(A)}),$&&d.push(y),this.i=d},t.values=function o(){var a=this,s,d,y,$,A;return U(o,function(I){if(I.h==1&&(s=c(a),d=s.next()),I.h!=3){if(d.done){I.h=0;return}return y=d.value,$=c(y),$.next(),A=$.next().value,T(I,A)}d=s.next(),I.h=2})},x.prototype._asNative=function(){for(var o=new ps,a=c(this),s=a.next();!s.done;s=a.next()){var d=c(s.value);s=d.next().value,d=d.next().value,o.append(s,d)}return o},x.prototype._blob=function(){var o="----formdata-polyfill-"+Math.random(),a=[],s="--"+o+`\r
Content-Disposition: form-data; name="`;return this.forEach(function(d,y){return typeof d=="string"?a.push(s+bt(E(y))+(`"\r
\r
`+E(d)+`\r
`)):a.push(s+bt(E(y))+('"; filename="'+bt(d.name)+`"\r
Content-Type: `+(d.type||"application/octet-stream")+`\r
\r
`),d,`\r
`)}),a.push("--"+o+"--"),new Blob(a,{type:"multipart/form-data; boundary="+o})},x.prototype[Symbol.iterator]=function(){return this.entries()},x.prototype.toString=function(){return"[object FormData]"},L&&!L.matches&&(L.matches=L.matchesSelector||L.mozMatchesSelector||L.msMatchesSelector||L.oMatchesSelector||L.webkitMatchesSelector||function(o){o=(this.document||this.ownerDocument).querySelectorAll(o);for(var a=o.length;0<=--a&&o.item(a)!==this;);return-1<a}),P&&(x.prototype[P]="FormData"),vt){var ys=w.XMLHttpRequest.prototype.setRequestHeader;w.XMLHttpRequest.prototype.setRequestHeader=function(o,a){ys.call(this,o,a),o.toLowerCase()==="content-type"&&(this.B=!0)},w.XMLHttpRequest.prototype.send=function(o){o instanceof x?(o=o._blob(),this.B||this.setRequestHeader("Content-Type",o.type),vt.call(this,o)):vt.call(this,o)}}ce&&(w.fetch=function(o,a){return a&&a.body&&a.body instanceof x&&(a.body=a.body._blob()),ce.call(this,o,a)}),ue&&(w.navigator.sendBeacon=function(o,a){return a instanceof x&&(a=a._asNative()),ue.call(this,o,a)}),w.FormData=x}})();const Tt="%[a-f0-9]{2}",It=new RegExp("("+Tt+")|([^%]+?)","gi"),Et=new RegExp("("+Tt+")+","gi");function ut(t,e){try{return[decodeURIComponent(t.join(""))]}catch{}if(t.length===1)return t;e=e||1;const r=t.slice(0,e),n=t.slice(e);return Array.prototype.concat.call([],ut(r),ut(n))}function dr(t){try{return decodeURIComponent(t)}catch{let e=t.match(It)||[];for(let r=1;r<e.length;r++)t=ut(e,r).join(""),e=t.match(It)||[];return t}}function pr(t){const e={"%FE%FF":"��","%FF%FE":"��"};let r=Et.exec(t);for(;r;){try{e[r[0]]=decodeURIComponent(r[0])}catch{const i=dr(r[0]);i!==r[0]&&(e[r[0]]=i)}r=Et.exec(t)}e["%C2"]="�";const n=Object.keys(e);for(const i of n)t=t.replace(new RegExp(i,"g"),e[i]);return t}function yr(t){if(typeof t!="string")throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof t+"`");try{return decodeURIComponent(t)}catch{return pr(t)}}function xt(t,e){if(!(typeof t=="string"&&typeof e=="string"))throw new TypeError("Expected the arguments to be of type `string`");if(t===""||e==="")return[];const r=t.indexOf(e);return r===-1?[]:[t.slice(0,r),t.slice(r+e.length)]}function gr(t,e){const r={};if(Array.isArray(e))for(const n of e){const i=Object.getOwnPropertyDescriptor(t,n);i!=null&&i.enumerable&&Object.defineProperty(r,n,i)}else for(const n of Reflect.ownKeys(t)){const i=Object.getOwnPropertyDescriptor(t,n);if(i.enumerable){const l=t[n];e(n,l,t)&&Object.defineProperty(r,n,i)}}return r}const mr=t=>t==null,_r=t=>encodeURIComponent(t).replaceAll(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`),ft=Symbol("encodeFragmentIdentifier");function vr(t){switch(t.arrayFormat){case"index":return e=>(r,n)=>{const i=r.length;return n===void 0||t.skipNull&&n===null||t.skipEmptyString&&n===""?r:n===null?[...r,[S(e,t),"[",i,"]"].join("")]:[...r,[S(e,t),"[",S(i,t),"]=",S(n,t)].join("")]};case"bracket":return e=>(r,n)=>n===void 0||t.skipNull&&n===null||t.skipEmptyString&&n===""?r:n===null?[...r,[S(e,t),"[]"].join("")]:[...r,[S(e,t),"[]=",S(n,t)].join("")];case"colon-list-separator":return e=>(r,n)=>n===void 0||t.skipNull&&n===null||t.skipEmptyString&&n===""?r:n===null?[...r,[S(e,t),":list="].join("")]:[...r,[S(e,t),":list=",S(n,t)].join("")];case"comma":case"separator":case"bracket-separator":{const e=t.arrayFormat==="bracket-separator"?"[]=":"=";return r=>(n,i)=>i===void 0||t.skipNull&&i===null||t.skipEmptyString&&i===""?n:(i=i===null?"":i,n.length===0?[[S(r,t),e,S(i,t)].join("")]:[[n,S(i,t)].join(t.arrayFormatSeparator)])}default:return e=>(r,n)=>n===void 0||t.skipNull&&n===null||t.skipEmptyString&&n===""?r:n===null?[...r,S(e,t)]:[...r,[S(e,t),"=",S(n,t)].join("")]}}function br(t){let e;switch(t.arrayFormat){case"index":return(r,n,i)=>{if(e=/\[(\d*)]$/.exec(r),r=r.replace(/\[\d*]$/,""),!e){i[r]=n;return}i[r]===void 0&&(i[r]={}),i[r][e[1]]=n};case"bracket":return(r,n,i)=>{if(e=/(\[])$/.exec(r),r=r.replace(/\[]$/,""),!e){i[r]=n;return}if(i[r]===void 0){i[r]=[n];return}i[r]=[...i[r],n]};case"colon-list-separator":return(r,n,i)=>{if(e=/(:list)$/.exec(r),r=r.replace(/:list$/,""),!e){i[r]=n;return}if(i[r]===void 0){i[r]=[n];return}i[r]=[...i[r],n]};case"comma":case"separator":return(r,n,i)=>{const l=typeof n=="string"&&n.includes(t.arrayFormatSeparator),u=typeof n=="string"&&!l&&R(n,t).includes(t.arrayFormatSeparator);n=u?R(n,t):n;const c=l||u?n.split(t.arrayFormatSeparator).map(h=>R(h,t)):n===null?n:R(n,t);i[r]=c};case"bracket-separator":return(r,n,i)=>{const l=/(\[])$/.test(r);if(r=r.replace(/\[]$/,""),!l){i[r]=n&&R(n,t);return}const u=n===null?[]:n.split(t.arrayFormatSeparator).map(c=>R(c,t));if(i[r]===void 0){i[r]=u;return}i[r]=[...i[r],...u]};default:return(r,n,i)=>{if(i[r]===void 0){i[r]=n;return}i[r]=[...[i[r]].flat(),n]}}}function Rt(t){if(typeof t!="string"||t.length!==1)throw new TypeError("arrayFormatSeparator must be single character string")}function S(t,e){return e.encode?e.strict?_r(t):encodeURIComponent(t):t}function R(t,e){return e.decode?yr(t):t}function Pt(t){return Array.isArray(t)?t.sort():typeof t=="object"?Pt(Object.keys(t)).sort((e,r)=>Number(e)-Number(r)).map(e=>t[e]):t}function Lt(t){const e=t.indexOf("#");return e!==-1&&(t=t.slice(0,e)),t}function Sr(t){let e="";const r=t.indexOf("#");return r!==-1&&(e=t.slice(r)),e}function Dt(t,e){return e.parseNumbers&&!Number.isNaN(Number(t))&&typeof t=="string"&&t.trim()!==""?t=Number(t):e.parseBooleans&&t!==null&&(t.toLowerCase()==="true"||t.toLowerCase()==="false")&&(t=t.toLowerCase()==="true"),t}function ht(t){t=Lt(t);const e=t.indexOf("?");return e===-1?"":t.slice(e+1)}function dt(t,e){e={decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1,...e},Rt(e.arrayFormatSeparator);const r=br(e),n=Object.create(null);if(typeof t!="string"||(t=t.trim().replace(/^[?#&]/,""),!t))return n;for(const i of t.split("&")){if(i==="")continue;const l=e.decode?i.replaceAll("+"," "):i;let[u,c]=xt(l,"=");u===void 0&&(u=l),c=c===void 0?null:["comma","separator","bracket-separator"].includes(e.arrayFormat)?c:R(c,e),r(R(u,e),c,n)}for(const[i,l]of Object.entries(n))if(typeof l=="object"&&l!==null)for(const[u,c]of Object.entries(l))l[u]=Dt(c,e);else n[i]=Dt(l,e);return e.sort===!1?n:(e.sort===!0?Object.keys(n).sort():Object.keys(n).sort(e.sort)).reduce((i,l)=>{const u=n[l];return i[l]=u&&typeof u=="object"&&!Array.isArray(u)?Pt(u):u,i},Object.create(null))}function Mt(t,e){if(!t)return"";e={encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:",",...e},Rt(e.arrayFormatSeparator);const r=u=>e.skipNull&&mr(t[u])||e.skipEmptyString&&t[u]==="",n=vr(e),i={};for(const[u,c]of Object.entries(t))r(u)||(i[u]=c);const l=Object.keys(i);return e.sort!==!1&&l.sort(e.sort),l.map(u=>{const c=t[u];return c===void 0?"":c===null?S(u,e):Array.isArray(c)?c.length===0&&e.arrayFormat==="bracket-separator"?S(u,e)+"[]":c.reduce(n(u),[]).join("&"):S(u,e)+"="+S(c,e)}).filter(u=>u.length>0).join("&")}function kt(t,e){var i;e={decode:!0,...e};let[r,n]=xt(t,"#");return r===void 0&&(r=t),{url:((i=r==null?void 0:r.split("?"))==null?void 0:i[0])??"",query:dt(ht(t),e),...e&&e.parseFragmentIdentifier&&n?{fragmentIdentifier:R(n,e)}:{}}}function Ut(t,e){e={encode:!0,strict:!0,[ft]:!0,...e};const r=Lt(t.url).split("?")[0]||"",n=ht(t.url),i={...dt(n,{sort:!1}),...t.query};let l=Mt(i,e);l&&(l=`?${l}`);let u=Sr(t.url);if(typeof t.fragmentIdentifier=="string"){const c=new URL(r);c.hash=t.fragmentIdentifier,u=e[ft]?c.hash:`#${t.fragmentIdentifier}`}return`${r}${l}${u}`}function qt(t,e,r){r={parseFragmentIdentifier:!0,[ft]:!1,...r};const{url:n,query:i,fragmentIdentifier:l}=kt(t,r);return Ut({url:n,query:gr(i,e),fragmentIdentifier:l},r)}function $r(t,e,r){const n=Array.isArray(e)?i=>!e.includes(i):(i,l)=>!e(i,l);return qt(t,n,r)}const D=Object.freeze(Object.defineProperty({__proto__:null,exclude:$r,extract:ht,parse:dt,parseUrl:kt,pick:qt,stringify:Mt,stringifyUrl:Ut},Symbol.toStringTag,{value:"Module"}));function wr(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}var Or=wr,Fr=lt,jr=X,Cr="[object Arguments]";function Ar(t){return jr(t)&&Fr(t)==Cr}var Tr=Ar,Ht=Tr,Ir=X,Bt=Object.prototype,Er=Bt.hasOwnProperty,xr=Bt.propertyIsEnumerable,Rr=Ht(function(){return arguments}())?Ht:function(t){return Ir(t)&&Er.call(t,"callee")&&!xr.call(t,"callee")},Pr=Rr,Lr=Array.isArray,Dr=Lr,Gt=st,Mr=Pr,kr=Dr,Nt=Gt?Gt.isConcatSpreadable:void 0;function Ur(t){return kr(t)||Mr(t)||!!(Nt&&t&&t[Nt])}var qr=Ur,Hr=Or,Br=qr;function zt(t,e,r,n,i){var l=-1,u=t.length;for(r||(r=Br),i||(i=[]);++l<u;){var c=t[l];e>0&&r(c)?e>1?zt(c,e-1,r,n,i):Hr(i,c):n||(i[i.length]=c)}return i}var Gr=zt;function Nr(t){return t}var Vt=Nr;function zr(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}var Vr=zr,Kr=Vr,Kt=Math.max;function Jr(t,e,r){return e=Kt(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,l=Kt(n.length-e,0),u=Array(l);++i<l;)u[i]=n[e+i];i=-1;for(var c=Array(e+1);++i<e;)c[i]=n[i];return c[e]=r(u),Kr(t,this,c)}}var Wr=Jr;function Yr(t){return function(){return t}}var Zr=Yr,Qr=lt,Xr=Q,tn="[object AsyncFunction]",en="[object Function]",rn="[object GeneratorFunction]",nn="[object Proxy]";function on(t){if(!Xr(t))return!1;var e=Qr(t);return e==en||e==rn||e==tn||e==nn}var Jt=on,an=W,sn=an["__core-js_shared__"],ln=sn,pt=ln,Wt=function(){var t=/[^.]+$/.exec(pt&&pt.keys&&pt.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function cn(t){return!!Wt&&Wt in t}var un=cn,fn=Function.prototype,hn=fn.toString;function dn(t){if(t!=null){try{return hn.call(t)}catch{}try{return t+""}catch{}}return""}var pn=dn,yn=Jt,gn=un,mn=Q,_n=pn,vn=/[\\^$.*+?()[\]{}|]/g,bn=/^\[object .+?Constructor\]$/,Sn=Function.prototype,$n=Object.prototype,wn=Sn.toString,On=$n.hasOwnProperty,Fn=RegExp("^"+wn.call(On).replace(vn,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function jn(t){if(!mn(t)||gn(t))return!1;var e=yn(t)?Fn:bn;return e.test(_n(t))}var Cn=jn;function An(t,e){return t==null?void 0:t[e]}var Tn=An,In=Cn,En=Tn;function xn(t,e){var r=En(t,e);return In(r)?r:void 0}var tt=xn,Rn=tt,Pn=function(){try{var t=Rn(Object,"defineProperty");return t({},"",{}),t}catch{}}(),Ln=Pn,Dn=Zr,Yt=Ln,Mn=Vt,kn=Yt?function(t,e){return Yt(t,"toString",{configurable:!0,enumerable:!1,value:Dn(e),writable:!0})}:Mn,Un=kn,qn=800,Hn=16,Bn=Date.now;function Gn(t){var e=0,r=0;return function(){var n=Bn(),i=Hn-(n-r);if(r=n,i>0){if(++e>=qn)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var Nn=Gn,zn=Un,Vn=Nn,Kn=Vn(zn),Jn=Kn,Wn=Vt,Yn=Wr,Zn=Jn;function Qn(t,e){return Zn(Yn(t,e,Wn),t+"")}var Zt=Qn,Xn=tt,ti=Xn(Object,"create"),et=ti,Qt=et;function ei(){this.__data__=Qt?Qt(null):{},this.size=0}var ri=ei;function ni(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var ii=ni,oi=et,ai="__lodash_hash_undefined__",si=Object.prototype,li=si.hasOwnProperty;function ci(t){var e=this.__data__;if(oi){var r=e[t];return r===ai?void 0:r}return li.call(e,t)?e[t]:void 0}var ui=ci,fi=et,hi=Object.prototype,di=hi.hasOwnProperty;function pi(t){var e=this.__data__;return fi?e[t]!==void 0:di.call(e,t)}var yi=pi,gi=et,mi="__lodash_hash_undefined__";function _i(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=gi&&e===void 0?mi:e,this}var vi=_i,bi=ri,Si=ii,$i=ui,wi=yi,Oi=vi;function G(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}G.prototype.clear=bi,G.prototype.delete=Si,G.prototype.get=$i,G.prototype.has=wi,G.prototype.set=Oi;var Fi=G;function ji(){this.__data__=[],this.size=0}var Ci=ji;function Ai(t,e){return t===e||t!==t&&e!==e}var Ti=Ai,Ii=Ti;function Ei(t,e){for(var r=t.length;r--;)if(Ii(t[r][0],e))return r;return-1}var rt=Ei,xi=rt,Ri=Array.prototype,Pi=Ri.splice;function Li(t){var e=this.__data__,r=xi(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():Pi.call(e,r,1),--this.size,!0}var Di=Li,Mi=rt;function ki(t){var e=this.__data__,r=Mi(e,t);return r<0?void 0:e[r][1]}var Ui=ki,qi=rt;function Hi(t){return qi(this.__data__,t)>-1}var Bi=Hi,Gi=rt;function Ni(t,e){var r=this.__data__,n=Gi(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}var zi=Ni,Vi=Ci,Ki=Di,Ji=Ui,Wi=Bi,Yi=zi;function N(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}N.prototype.clear=Vi,N.prototype.delete=Ki,N.prototype.get=Ji,N.prototype.has=Wi,N.prototype.set=Yi;var Zi=N,Qi=tt,Xi=W,to=Qi(Xi,"Map"),eo=to,Xt=Fi,ro=Zi,no=eo;function io(){this.size=0,this.__data__={hash:new Xt,map:new(no||ro),string:new Xt}}var oo=io;function ao(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}var so=ao,lo=so;function co(t,e){var r=t.__data__;return lo(e)?r[typeof e=="string"?"string":"hash"]:r.map}var nt=co,uo=nt;function fo(t){var e=uo(this,t).delete(t);return this.size-=e?1:0,e}var ho=fo,po=nt;function yo(t){return po(this,t).get(t)}var go=yo,mo=nt;function _o(t){return mo(this,t).has(t)}var vo=_o,bo=nt;function So(t,e){var r=bo(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}var $o=So,wo=oo,Oo=ho,Fo=go,jo=vo,Co=$o;function z(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}z.prototype.clear=wo,z.prototype.delete=Oo,z.prototype.get=Fo,z.prototype.has=jo,z.prototype.set=Co;var Ao=z,To="__lodash_hash_undefined__";function Io(t){return this.__data__.set(t,To),this}var Eo=Io;function xo(t){return this.__data__.has(t)}var Ro=xo,Po=Ao,Lo=Eo,Do=Ro;function it(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new Po;++e<r;)this.add(t[e])}it.prototype.add=it.prototype.push=Lo,it.prototype.has=Do;var te=it;function Mo(t,e,r,n){for(var i=t.length,l=r+(n?1:-1);n?l--:++l<i;)if(e(t[l],l,t))return l;return-1}var ko=Mo;function Uo(t){return t!==t}var qo=Uo;function Ho(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}var Bo=Ho,Go=ko,No=qo,zo=Bo;function Vo(t,e,r){return e===e?zo(t,e,r):Go(t,No,r)}var Ko=Vo,Jo=Ko;function Wo(t,e){var r=t==null?0:t.length;return!!r&&Jo(t,e,0)>-1}var ee=Wo;function Yo(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}var re=Yo;function Zo(t,e){return t.has(e)}var ne=Zo,Qo=tt,Xo=W,ta=Qo(Xo,"Set"),ea=ta;function ra(){}var na=ra;function ia(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}var ie=ia,yt=ea,oa=na,aa=ie,sa=1/0,la=yt&&1/aa(new yt([,-0]))[1]==sa?function(t){return new yt(t)}:oa,ca=la,ua=te,fa=ee,ha=re,da=ne,pa=ca,ya=ie,ga=200;function ma(t,e,r){var n=-1,i=fa,l=t.length,u=!0,c=[],h=c;if(r)u=!1,i=ha;else if(l>=ga){var g=e?null:pa(t);if(g)return ya(g);u=!1,i=da,h=new ua}else h=e?[]:c;t:for(;++n<l;){var _=t[n],p=e?e(_):_;if(_=r||_!==0?_:0,u&&p===p){for(var m=h.length;m--;)if(h[m]===p)continue t;e&&h.push(p),c.push(_)}else i(h,p,r)||(h!==c&&h.push(p),c.push(_))}return c}var _a=ma,va=9007199254740991;function ba(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=va}var Sa=ba,$a=Jt,wa=Sa;function Oa(t){return t!=null&&wa(t.length)&&!$a(t)}var Fa=Oa,ja=Fa,Ca=X;function Aa(t){return Ca(t)&&ja(t)}var oe=Aa,Ta=Gr,Ia=Zt,Ea=_a,xa=oe,Ra=Ia(function(t){return Ea(Ta(t,1,xa,!0))}),Pa=Ra;const La=at(Pa);function Da(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}var Ma=Da;function ka(t){return function(e){return t(e)}}var Ua=ka,qa=te,Ha=ee,Ba=re,Ga=Ma,Na=Ua,za=ne,Va=200;function Ka(t,e,r,n){var i=-1,l=Ha,u=!0,c=t.length,h=[],g=e.length;if(!c)return h;r&&(e=Ga(e,Na(r))),n?(l=Ba,u=!1):e.length>=Va&&(l=za,u=!1,e=new qa(e));t:for(;++i<c;){var _=t[i],p=r==null?_:r(_);if(_=n||_!==0?_:0,u&&p===p){for(var m=g;m--;)if(e[m]===p)continue t;h.push(_)}else l(e,p,n)||h.push(_)}return h}var Ja=Ka,Wa=Ja,Ya=Zt,Za=oe,Qa=Ya(function(t,e){return Za(t)?Wa(t,e):[]}),Xa=Qa;const ts=at(Xa);function es(t,e){const r=t.location,n=D.parseUrl((r==null?void 0:r.url)||e,{arrayFormat:"comma",parseFragmentIdentifier:!0}),i={};let l;if(r){if(r.stringQuery){const p=D.parse(r.stringQuery,{arrayFormat:"comma"});r.query={...p,...r.query}}if(r.mergeQuery){const p=r.clearMergeQueryKeys||[];for(const[m,v]of Object.entries(n.query))p.indexOf(m.split(".")[0])<0&&(i[m]=v);r.query||(r.query={})}l=r.query}const u=l||n.query;let c="";for(const[p,m]of Object.entries(u))Array.isArray(m)?i[p]=m:typeof m=="object"?rs(i,p,m):i[p]=m;const h={...i,__execute_event__:t.id};c=D.stringify(i,{arrayFormat:"comma"}),c.length>0&&(c=`?${c}`);let g=n.url+c;return n.fragmentIdentifier&&(g=g+"#"+n.fragmentIdentifier),{pushStateArgs:[{query:i,url:g},"",g],eventURL:`${n.url}?${D.stringify(h,{arrayFormat:"comma"})}`}}function rs(t,e,r){if(!r.value)return;let n=r.value;Array.isArray(r.value)||(n=[r.value]);let i=t[e];if(i&&!Array.isArray(i)&&(i=[i]),r.add){t[e]=La(i,n);return}if(r.remove){const l=ts(i,...n);l.length===0?delete t[e]:t[e]=l}}function ot(t,e,r){if(!e||e.length===0)return!1;if(r instanceof Event)return ot(t,e,r.target);if(r instanceof HTMLInputElement){if(r.files)return ot(t,e,r.files);switch(r.type){case"checkbox":return r.checked?M(t,e,r.value):t.has(e)?(t.delete(e),!0):!1;case"radio":return r.checked?M(t,e,r.value):!1;default:return M(t,e,r.value)}}if(r instanceof HTMLTextAreaElement||r instanceof HTMLSelectElement)return M(t,e,r.value);if(r==null)return M(t,e,"");let n=!1;if(t.has(e)&&(n=!0,t.delete(e)),Array.isArray(r)||r instanceof FileList){for(let i=0;i<r.length;i++)r[i]instanceof File?(n=!0,t.append(e,r[i],r[i].name)):(n=!0,t.append(e,r[i]));return n}return r instanceof File?(t.set(e,r,r.name),!0):M(t,e,r)}function M(t,e,r){return t.get(e)===r?!1:(t.set(e,r),!0)}function gt(t,e,r={},n=f.ref()){return f.defineComponent({setup(){return{plaid:f.inject("plaid"),vars:f.inject("vars"),isFetching:f.inject("isFetching"),updateRootTemplate:f.inject("updateRootTemplate"),form:e,locals:r}},mounted(){this.$nextTick(()=>{this.$el&&this.$el.style&&this.$el.style.height&&(n.value.style.height=this.$el.style.height)})},template:t})}function ae(t,e,r=""){if(t==null)return;const n=Array.isArray(t);if(n&&t.length>0&&(t[0]instanceof File||t[0]instanceof Blob||typeof t[0]=="string")){ot(e,r,t);return}return Object.keys(t).forEach(i=>{const l=t[i],u=r?n?`${r}[${i}]`:`${r}.${i}`:i;typeof l=="object"&&!(l instanceof File)&&!(l instanceof Date)?ae(l,e,u):ot(e,u,l)}),e}const ns=f.defineComponent({__name:"go-plaid-portal",props:{loader:Object,locals:Object,form:Object,visible:Boolean,afterLoaded:Function,portalName:String,autoReloadInterval:[String,Number]},setup(t){window.__goplaid=window.__goplaid??{},window.__goplaid.portals=window.__goplaid.portals??{};const e=f.ref(),r=t,n=f.shallowRef(null),i=f.ref(0),l=h=>{n.value=gt(h,r.form,r.locals,e)},u=f.useSlots(),c=()=>{if(u.default){n.value=gt('<slot :form="form" :locals="locals"></slot>',r.locals,e);return}const h=r.loader;h&&h.loadPortalBody(!0).form(r.form).go().then(g=>{g&&l(g.body)})};return f.onMounted(()=>{const h=r.portalName;h&&(window.__goplaid.portals[h]={updatePortalTemplate:l,reload:c}),c()}),f.onUpdated(()=>{if(r.autoReloadInterval&&i.value==0){const h=parseInt(r.autoReloadInterval+"");if(h==0)return;i.value=setInterval(()=>{c()},h)}i.value&&i.value>0&&r.autoReloadInterval==0&&(clearInterval(i.value),i.value=0)}),f.onBeforeUnmount(()=>{i.value&&i.value>0&&clearInterval(i.value)}),(h,g)=>t.visible?(f.openBlock(),f.createElementBlock("div",{key:0,class:"go-plaid-portal",ref_key:"portal",ref:e},[n.value?(f.openBlock(),f.createBlock(f.resolveDynamicComponent(n.value),{key:0},{default:f.withCtx(()=>[f.renderSlot(h.$slots,"default",{form:t.form,locals:t.locals})]),_:3})):f.createCommentVNode("",!0)],512)):f.createCommentVNode("",!0)}}),is=f.defineComponent({__name:"go-plaid-run-script",props:{script:{type:Function,required:!0}},setup(t){const e=t;return f.onMounted(()=>{e.script()}),(r,n)=>null}}),os=f.defineComponent({__name:"go-plaid-observer",props:{notificationName:{type:String,required:!0},handler:{type:Function,required:!0}},setup(t){const e=t,r=f.inject("vars");return f.onMounted(()=>{f.watch(()=>r==null?void 0:r.__notification,n=>{if(!n||(n==null?void 0:n.name)!==e.notificationName)return;let i;try{i=typeof n.payload=="string"?JSON.parse(n.payload):n.payload}catch{i=n.payload}try{e.handler({notificationName:e.notificationName,payload:i})}catch(l){console.error("Error executing observer script:",l)}})}),(n,i)=>f.renderSlot(n.$slots,"default")}});class as{constructor(){C(this,"_eventFuncID",{id:"__reload__"});C(this,"_url");C(this,"_method");C(this,"_vars");C(this,"_locals");C(this,"_loadPortalBody",!1);C(this,"_form",{});C(this,"_popstate");C(this,"_pushState");C(this,"_location");C(this,"_updateRootTemplate");C(this,"_buildPushStateResult");C(this,"ignoreErrors",["Failed to fetch","NetworkError when attempting to fetch resource.","The Internet connection appears to be offline.","Network request failed"]);C(this,"isIgnoreError",e=>{var r;return e instanceof Error?(r=this.ignoreErrors)==null?void 0:r.includes(e.message):!1})}eventFunc(e){return this._eventFuncID.id=e,this}updateRootTemplate(e){return this._updateRootTemplate=e,this}eventFuncID(e){return this._eventFuncID=e,this}reload(){return this._eventFuncID.id="__reload__",this}url(e){return this._url=e,this}vars(e){return this._vars=e,this}loadPortalBody(e){return this._loadPortalBody=e,this}locals(e){return this._locals=e,this}query(e,r){return this._location||(this._location={}),this._location.query||(this._location.query={}),this._location.query[e]=r,this}mergeQuery(e){return this._location||(this._location={}),this._location.mergeQuery=e,this}clearMergeQuery(e){return this._location||(this._location={}),this._location.mergeQuery=!0,this._location.clearMergeQueryKeys=e,this}location(e){return this._location=e,this}stringQuery(e){return this._location||(this._location={}),this._location.stringQuery=e,this}pushState(e){return this._pushState=e,this}queries(e){return this._location||(this._location={}),this._location.query=e,this}pushStateURL(e){return this._location||(this._location={}),this._location.url=e,this.pushState(!0),this}form(e){return this._form=e,this}fieldValue(e,r){if(!this._form)throw new Error("form not exist");return this._form[e]=r,this}popstate(e){return this._popstate=e,this}run(e){return new Function(e).apply(this),this}method(e){return this._method=e,this}buildFetchURL(){return this.ensurePushStateResult(),this._buildPushStateResult.eventURL}buildPushStateArgs(){return this.ensurePushStateResult(),this._buildPushStateResult.pushStateArgs}onpopstate(e){return e.state?this.popstate(!0).location(e.state).reload().go():Promise.reject("event state is undefined")}runPushState(){if(this._popstate!==!0&&this._pushState===!0){window.history.length<=2&&window.history.pushState({url:window.location.href},"",window.location.href);const e=this.buildPushStateArgs();e&&window.history.pushState(...e)}}go(){this._eventFuncID.id=="__reload__"&&(this._buildPushStateResult=null),this.runPushState();const e={method:"POST",redirect:"follow"};if(this._method&&(e.method=this._method),e.method==="POST"){const n=new FormData;ae(this._form,n),e.body=n}window.dispatchEvent(new Event("fetchStart"));const r=this.buildFetchURL();return fetch(r,e).then(n=>n.redirected?(document.location.replace(n.url),{}):n.json()).then(n=>(n.runScript&&new Function("vars","locals","form","plaid",n.runScript).apply(this,[this._vars,this._locals,this._form,()=>mt().vars(this._vars).locals(this._locals).form(this._form).updateRootTemplate(this._updateRootTemplate)]),n)).then(n=>{if(n.pageTitle&&(document.title=n.pageTitle),n.redirectURL&&document.location.replace(n.redirectURL),n.reloadPortals&&n.reloadPortals.length>0)for(const i of n.reloadPortals){const l=window.__goplaid.portals[i];l&&l.reload()}if(n.updatePortals&&n.updatePortals.length>0)for(const i of n.updatePortals){const{updatePortalTemplate:l}=window.__goplaid.portals[i.name];l&&l(i.body)}return n.pushState?mt().updateRootTemplate(this._updateRootTemplate).reload().pushState(!0).location(n.pushState).go():(this._loadPortalBody&&n.body||n.body&&this._updateRootTemplate(n.body),n)}).catch(n=>{console.log(n),this.isIgnoreError(n)||alert("Unknown Error")}).finally(()=>{window.dispatchEvent(new Event("fetchEnd"))})}ensurePushStateResult(){if(this._buildPushStateResult)return;const e=window.location.href;this._buildPushStateResult=es({...this._eventFuncID,location:this._location},this._url||e)}}function mt(){return new as}const ss={mounted:(t,e,r)=>{var g,_;let n=t;r.component&&(n=(_=(g=r.component)==null?void 0:g.proxy)==null?void 0:_.$el);const i=e.arg||"scroll",u=D.parse(location.hash)[i];let c="";Array.isArray(u)?c=u[0]||"":c=u||"";const h=c.split("_");h.length>=2&&(n.scrollTop=parseInt(h[0]),n.scrollLeft=parseInt(h[1])),n.addEventListener("scroll",At(function(){const p=D.parse(location.hash);p[i]=n.scrollTop+"_"+n.scrollLeft,location.hash=D.stringify(p)},200))}},ls={mounted:(t,e)=>{const[r,n]=e.value;Object.assign(r,n)}},cs={mounted:(t,e,r)=>{e.value(t,e,r)}},us=f.defineComponent({props:{initialTemplate:{type:String,required:!0}},setup(t,{emit:e}){const r=f.shallowRef(null),n=f.reactive({});f.provide("form",n);const i=h=>{r.value=gt(h,n)};f.provide("updateRootTemplate",i);const l=f.reactive({__notification:{},__sendNotification:function(h,g){l.__notification={id:`notification-${Date.now()}-${Math.random().toString(36).slice(2,11)}`,name:h,payload:g}}}),u=()=>mt().updateRootTemplate(i).vars(l);f.provide("plaid",u),f.provide("vars",l);const c=f.ref(!1);return f.provide("isFetching",c),f.onMounted(()=>{i(t.initialTemplate),window.addEventListener("fetchStart",h=>{c.value=!0}),window.addEventListener("fetchEnd",h=>{c.value=!1}),window.addEventListener("popstate",h=>{h&&h.state!=null&&u().onpopstate(h)})}),{current:r}},template:`
      <div id="app" v-cloak>
        <component :is="current"></component>
      </div>
    `}),fs={install(t){t.component("GoPlaidScope",hr),t.component("GoPlaidPortal",ns),t.component("GoPlaidRunScript",is),t.component("GoPlaidObserver",os),t.directive("keep-scroll",ss),t.directive("assign",ls),t.directive("run",cs),t.component("GlobalEvents",pe)}};function hs(t){const e=f.createApp(us,{initialTemplate:t});return e.use(fs),e}const se=document.getElementById("app");if(!se)throw new Error("#app required");const ds={},le=hs(se.innerHTML);for(const t of window.__goplaidVueComponentRegisters||[])t(le,ds);le.mount("#app")});
