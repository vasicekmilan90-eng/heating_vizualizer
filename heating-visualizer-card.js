function t(t,e,o,i){var n,r=arguments.length,s=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,i);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(s=(r<3?n(s):r>3?n(e,o,s):n(e,o))||s);return r>3&&s&&Object.defineProperty(e,o,s),s}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,o=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let r=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const o=void 0!==e&&1===e.length;o&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&n.set(e,t))}return t}toString(){return this.cssText}};const s=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,o,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[i+1],t[0]);return new r(o,t,i)},a=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:d,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,y=globalThis,v=y.trustedTypes,_=v?v.emptyScript:"",m=y.reactiveElementPolyfillSupport,$=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=null!==t;break;case Number:o=null===t?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch(t){o=null}}return o}},g=(t,e)=>!d(t,e),b={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:g};Symbol.metadata??=Symbol("metadata"),y.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(t,o,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,o){const{get:i,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);n?.call(this,e),this.requestUpdate(t,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const o of e)this.createProperty(o,t[o])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const o=this._$Eu(t,e);void 0!==o&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const t of o)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const o=e.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(o)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const o of i){const i=document.createElement("style"),n=e.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=o.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){const o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(void 0!==i&&!0===o.reflect){const n=(void 0!==o.converter?.toAttribute?o.converter:f).toAttribute(e,o.type);this._$Em=t,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const o=this.constructor,i=o._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=o.getPropertyOptions(i),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=i;const r=n.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,o,i=!1,n){if(void 0!==t){const r=this.constructor;if(!1===i&&(n=this[t]),o??=r.getPropertyOptions(t),!((o.hasChanged??g)(n,e)||o.useDefault&&o.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,o))))return;this.C(t,e,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:i,wrapped:n},r){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,o]of t){const{wrapped:t}=o,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,o,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,m?.({ReactiveElement:x}),(y.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,w=t=>t,A=k.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,M="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,P=`<${C}>`,I=document,z=()=>I.createComment(""),L=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,O="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,j=/>/g,K=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,R=/"/g,V=/^(?:script|style|textarea|title)$/i,U=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),B=U(1),Z=U(2),W=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),q=new WeakMap,J=I.createTreeWalker(I,129);function Y(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const G=(t,e)=>{const o=t.length-1,i=[];let n,r=2===e?"<svg>":3===e?"<math>":"",s=H;for(let e=0;e<o;e++){const o=t[e];let a,d,l=-1,c=0;for(;c<o.length&&(s.lastIndex=c,d=s.exec(o),null!==d);)c=s.lastIndex,s===H?"!--"===d[1]?s=T:void 0!==d[1]?s=j:void 0!==d[2]?(V.test(d[2])&&(n=RegExp("</"+d[2],"g")),s=K):void 0!==d[3]&&(s=K):s===K?">"===d[0]?(s=n??H,l=-1):void 0===d[1]?l=-2:(l=s.lastIndex-d[2].length,a=d[1],s=void 0===d[3]?K:'"'===d[3]?R:D):s===R||s===D?s=K:s===T||s===j?s=H:(s=K,n=void 0);const p=s===K&&t[e+1].startsWith("/>")?" ":"";r+=s===H?o+P:l>=0?(i.push(a),o.slice(0,l)+M+o.slice(l)+E+p):o+E+(-2===l?e:p)}return[Y(t,r+(t[o]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class X{constructor({strings:t,_$litType$:e},o){let i;this.parts=[];let n=0,r=0;const s=t.length-1,a=this.parts,[d,l]=G(t,e);if(this.el=X.createElement(d,o),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=J.nextNode())&&a.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(M)){const e=l[r++],o=i.getAttribute(t).split(E),s=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:s[2],strings:o,ctor:"."===s[1]?it:"?"===s[1]?nt:"@"===s[1]?rt:ot}),i.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:n}),i.removeAttribute(t));if(V.test(i.tagName)){const t=i.textContent.split(E),e=t.length-1;if(e>0){i.textContent=A?A.emptyScript:"";for(let o=0;o<e;o++)i.append(t[o],z()),J.nextNode(),a.push({type:2,index:++n});i.append(t[e],z())}}}else if(8===i.nodeType)if(i.data===C)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(E,t+1));)a.push({type:7,index:n}),t+=E.length-1}n++}}static createElement(t,e){const o=I.createElement("template");return o.innerHTML=t,o}}function Q(t,e,o=t,i){if(e===W)return e;let n=void 0!==i?o._$Co?.[i]:o._$Cl;const r=L(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,o,i)),void 0!==i?(o._$Co??=[])[i]=n:o._$Cl=n),void 0!==n&&(e=Q(t,n._$AS(t,e.values),n,i)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:o}=this._$AD,i=(t?.creationScope??I).importNode(e,!0);J.currentNode=i;let n=J.nextNode(),r=0,s=0,a=o[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new et(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new st(n,this,t)),this._$AV.push(e),a=o[++s]}r!==a?.index&&(n=J.nextNode(),r++)}return J.currentNode=I,i}p(t){let e=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,i){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),L(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(I.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=X.createElement(Y(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new tt(i,this),o=t.u(this.options);t.p(e),this.T(o),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new X(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let o,i=0;for(const n of t)i===e.length?e.push(o=new et(this.O(z()),this.O(z()),this,this.options)):o=e[i],o._$AI(n),i++;i<e.length&&(this._$AR(o&&o._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class ot{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,i,n){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=F}_$AI(t,e=this,o,i){const n=this.strings;let r=!1;if(void 0===n)t=Q(this,t,e,0),r=!L(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const i=t;let s,a;for(t=n[0],s=0;s<n.length-1;s++)a=Q(this,i[o+s],e,s),a===W&&(a=this._$AH[s]),r||=!L(a)||a!==this._$AH[s],a===F?t=F:t!==F&&(t+=(a??"")+n[s+1]),this._$AH[s]=a}r&&!i&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends ot{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class nt extends ot{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class rt extends ot{constructor(t,e,o,i,n){super(t,e,o,i,n),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??F)===W)return;const o=this._$AH,i=t===F&&o!==F||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==F&&(o===F||i);i&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=k.litHtmlPolyfillSupport;at?.(X,et),(k.litHtmlVersions??=[]).push("3.3.3");const dt=globalThis;class lt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,o)=>{const i=o?.renderBefore??e;let n=i._$litPart$;if(void 0===n){const t=o?.renderBefore??null;i._$litPart$=n=new et(e.insertBefore(z(),t),t,void 0,o??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}lt._$litElement$=!0,lt.finalized=!0,dt.litElementHydrateSupport?.({LitElement:lt});const ct=dt.litElementPolyfillSupport;ct?.({LitElement:lt}),(dt.litElementVersions??=[]).push("4.2.2");const pt=t=>(e,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:g},ut=(t=ht,e,o)=>{const{kind:i,metadata:n}=o;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(o.name,t),"accessor"===i){const{name:i}=o;return{set(o){const n=e.get.call(this);e.set.call(this,o),this.requestUpdate(i,n,t,!0,o)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=o;return function(o){const n=this[i];e.call(this,o),this.requestUpdate(i,n,t,!0,o)}}throw Error("Unsupported decorator location: "+i)};function yt(t){return(e,o)=>"object"==typeof o?ut(t,e,o):((t,e,o)=>{const i=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),i?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}function vt(t){return yt({...t,state:!0,attribute:!1})}function _t(t){return`${t.nodeId}.${t.portId}`}function mt(t){const e=t.lastIndexOf(".");if(!(e<=0||e===t.length-1))return{nodeId:t.slice(0,e),portId:t.slice(e+1)}}function $t(t){return`${t.from}>${t.to}`}const ft={nodes:[],connections:[],overlays:[]};function gt(t){return{nodes:t.nodes??[],connections:t.connections??[],overlays:t.overlays??[]}}function bt(t){return"undefined"!=typeof crypto&&"function"==typeof crypto.randomUUID?`${t}_${crypto.randomUUID().slice(0,8)}`:`${t}_${Math.random().toString(36).slice(2,10)}`}const xt=["top","upper","middle","lower","bottom"],kt=["top","middle","bottom"],wt={type:"alarm",max:1},At={type:"mode",max:1},St={type:"setpoint",max:1},Mt=t=>({type:"value",max:t}),Et=(...t)=>({type:"temperature",max:t.length,slots:t});function Ct(t,e){return t.addons?.some(t=>t.type===e)??!1}const Pt={type:"valve_3way",labelKey:"devices.valve_3way.name",width:100,height:100,ports:[{id:"in",labelKey:"devices.valve_3way.ports.in",kind:"inlet",position:{x:0,y:50}},{id:"out_a",labelKey:"devices.valve_3way.ports.out_a",kind:"outlet",position:{x:100,y:25}},{id:"out_b",labelKey:"devices.valve_3way.ports.out_b",kind:"outlet",position:{x:100,y:75}}],addons:[Mt(1),wt]},It={type:"boiler",labelKey:"devices.boiler.name",width:100,height:140,ports:[{id:"coil_in",labelKey:"devices.boiler.ports.coil_in",kind:"inlet",position:{x:0,y:50}},{id:"coil_out",labelKey:"devices.boiler.ports.coil_out",kind:"outlet",position:{x:0,y:100}},{id:"hot_out",labelKey:"devices.boiler.ports.hot_out",kind:"outlet",position:{x:100,y:30}},{id:"cold_in",labelKey:"devices.boiler.ports.cold_in",kind:"inlet",position:{x:100,y:118}}],addons:[Et(...kt),Mt(2),{type:"electric_heater",max:2},{type:"pump",max:1},At,St,wt,{type:"heat_exchanger",max:1}],resolve:t=>Ct(t,"heat_exchanger")?{...It,height:180,ports:[...It.ports.map(t=>"cold_in"===t.id?{...t,position:{x:100,y:158}}:t),{id:"coil2_in",labelKey:"devices.boiler.ports.coil2_in",kind:"inlet",position:{x:0,y:122}},{id:"coil2_out",labelKey:"devices.boiler.ports.coil2_out",kind:"outlet",position:{x:0,y:160}}]}:It},zt={type:"circulation_pump",labelKey:"devices.circulation_pump.name",width:90,height:90,ports:[{id:"in",labelKey:"devices.circulation_pump.ports.in",kind:"inlet",position:{x:0,y:45}},{id:"out",labelKey:"devices.circulation_pump.ports.out",kind:"outlet",position:{x:90,y:45}}],addons:[Mt(3),At,wt]},Lt={type:"floor_heating",labelKey:"devices.floor_heating.name",width:140,height:90,ports:[{id:"in",labelKey:"devices.floor_heating.ports.in",kind:"inlet",position:{x:0,y:45}},{id:"out",labelKey:"devices.floor_heating.ports.out",kind:"outlet",position:{x:140,y:45}}],addons:[Et("room","floor"),{type:"actuator",max:1},St,{type:"window",max:1}]};const Nt={type:"manifold",labelKey:"devices.manifold.name",width:184,height:130,ports:[{id:"supply_in",labelKey:"devices.manifold.ports.supply_in",kind:"inlet",position:{x:0,y:30}},{id:"return_out",labelKey:"devices.manifold.ports.return_out",kind:"outlet",position:{x:0,y:100}}],addons:[{type:"loop",max:12},Et("supply","return"),Mt(2),{type:"pump",max:1}],resolve:t=>function(t){const e=[];for(let o=0;o<t;o++){const t=50+36*o,i=String(o+1);e.push({id:`loop_${i}_out`,labelKey:"devices.manifold.ports.loop_out",labelArgs:[i],kind:"outlet",position:{x:t,y:0}},{id:`loop_${i}_in`,labelKey:"devices.manifold.ports.loop_in",labelArgs:[i],kind:"inlet",position:{x:t,y:130}})}return{...Nt,width:50+36*t-10,ports:[...Nt.ports,...e]}}(Math.max(1,t.addons?.filter(t=>"loop"===t.type).length??0))},Ot={type:"buffer_tank",labelKey:"devices.buffer_tank.name",width:100,height:186,ports:[{id:"source_in",labelKey:"devices.buffer_tank.ports.source_in",kind:"inlet",position:{x:0,y:40}},{id:"source_out",labelKey:"devices.buffer_tank.ports.source_out",kind:"outlet",position:{x:0,y:150}},{id:"supply_out",labelKey:"devices.buffer_tank.ports.supply_out",kind:"outlet",position:{x:100,y:40}},{id:"return_in",labelKey:"devices.buffer_tank.ports.return_in",kind:"inlet",position:{x:100,y:150}}],addons:[Et(...xt),Mt(2),{type:"electric_heater",max:2},wt,{type:"heat_exchanger",max:1}],resolve:t=>Ct(t,"heat_exchanger")?{...Ot,ports:[...Ot.ports,{id:"coil_in",labelKey:"devices.buffer_tank.ports.coil_in",kind:"inlet",position:{x:0,y:80}},{id:"coil_out",labelKey:"devices.buffer_tank.ports.coil_out",kind:"outlet",position:{x:0,y:118}}]}:Ot},Ht={type:"mixing_valve",labelKey:"devices.mixing_valve.name",width:100,height:110,ports:[{id:"hot_in",labelKey:"devices.mixing_valve.ports.hot_in",kind:"inlet",position:{x:0,y:70}},{id:"return_in",labelKey:"devices.mixing_valve.ports.return_in",kind:"inlet",position:{x:50,y:110}},{id:"mixed_out",labelKey:"devices.mixing_valve.ports.mixed_out",kind:"outlet",position:{x:100,y:70}}],addons:[Et("mixed","return"),Mt(1),St,wt]},Tt={type:"electric_heater",labelKey:"devices.electric_heater.name",width:120,height:60,ports:[{id:"in",labelKey:"devices.electric_heater.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out",labelKey:"devices.electric_heater.ports.out",kind:"outlet",position:{x:120,y:30}}],addons:[Et("inlet","outlet"),Mt(2),At,wt]},jt={type:"heat_pump",labelKey:"devices.heat_pump.name",width:170,height:120,ports:[{id:"hot_out",labelKey:"devices.heat_pump.ports.hot_out",kind:"outlet",position:{x:170,y:40}},{id:"cold_in",labelKey:"devices.heat_pump.ports.cold_in",kind:"inlet",position:{x:170,y:90}}],addons:[Et("supply","return","outdoor","evaporator"),Mt(6),{type:"electric_heater",max:3},{type:"pump",max:1},{type:"fan",max:1},At,St,{type:"defrost",max:1},wt]};const Kt={type:Dt="pipe_sensor",labelKey:`devices.${Dt}.name`,width:80,height:44,ports:[{id:"in",labelKey:"devices.inline.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out",labelKey:"devices.inline.ports.out",kind:"outlet",position:{x:80,y:30}}],valueDisplay:"only"};var Dt;const Rt={type:"outdoor_temperature",labelKey:"devices.outdoor_temperature.name",width:100,height:50,valueDisplay:"only",ports:[],addons:[Mt(1)]};const Vt={...function(t){return{type:t,labelKey:`devices.${t}.name`,width:100,height:130,valueDisplay:"with_state",ports:[{id:"supply_out",labelKey:"devices.heat_source.ports.supply_out",kind:"outlet",position:{x:100,y:35}},{id:"return_in",labelKey:"devices.heat_source.ports.return_in",kind:"inlet",position:{x:100,y:105}}]}}("heating_boiler"),addons:[Et("supply","return"),Mt(4),{type:"pump",max:1},At,St,wt]},Ut={type:"solar_collector",labelKey:"devices.solar_collector.name",width:150,height:100,valueDisplay:"with_state",ports:[{id:"hot_out",labelKey:"devices.solar_collector.ports.hot_out",kind:"outlet",position:{x:150,y:22}},{id:"cold_in",labelKey:"devices.solar_collector.ports.cold_in",kind:"inlet",position:{x:150,y:84}}],addons:[Et("collector"),Mt(2),{type:"pump",max:1},wt]};function Bt(t,e,o){const i=(t,e,o,i)=>({id:t,labelKey:`devices.four_port.ports.${t}`,kind:e,position:{x:o,y:i}});return{type:t,labelKey:`devices.${t}.name`,width:e,height:o,ports:[i("primary_in","inlet",0,30),i("primary_out","outlet",0,o-30),i("secondary_out","outlet",e,30),i("secondary_in","inlet",e,o-30)]}}const Zt=Et("primary_supply","primary_return","secondary_supply","secondary_return"),Wt={...Bt("hydraulic_separator",80,160),valueDisplay:"only",addons:[Zt,Mt(2)]},Ft={...Bt("plate_heat_exchanger",100,120),addons:[Zt,Mt(2)]},qt={type:"expansion_vessel",labelKey:"devices.expansion_vessel.name",width:70,height:110,valueDisplay:"only",ports:[{id:"connection",labelKey:"devices.expansion_vessel.ports.connection",kind:"inlet",position:{x:35,y:110}}],addons:[Mt(1),wt]},Jt={type:"safety_valve",labelKey:"devices.safety_valve.name",width:70,height:90,ports:[{id:"in",labelKey:"devices.safety_valve.ports.in",kind:"inlet",position:{x:30,y:90}},{id:"discharge",labelKey:"devices.safety_valve.ports.discharge",kind:"outlet",position:{x:70,y:56}}],addons:[wt]},Yt={type:"zone_valve",labelKey:"devices.zone_valve.name",width:80,height:70,ports:[{id:"in",labelKey:"devices.inline.ports.in",kind:"inlet",position:{x:0,y:50}},{id:"out",labelKey:"devices.inline.ports.out",kind:"outlet",position:{x:80,y:50}}],addons:[Et("room"),wt]};function Gt(t){return{type:t,labelKey:`devices.${t}.name`,width:130,height:80,valueDisplay:"with_state",ports:[{id:"in",labelKey:"devices.terminal.ports.in",kind:"inlet",position:{x:0,y:66}},{id:"out",labelKey:"devices.terminal.ports.out",kind:"outlet",position:{x:130,y:66}}]}}const Xt={...Gt("radiator"),addons:[Et("room"),{type:"actuator",max:1},St,wt,{type:"window",max:1}]},Qt={...Gt("fancoil"),addons:[Et("room","supply"),{type:"actuator",max:1},{type:"fan",max:1},At,St,wt]},te=[jt,Vt,Ut,It,Ot,Wt,Ft,qt,Jt,Pt,Ht,Yt,zt,Nt,Lt,Xt,Qt,Tt,{type:"junction",labelKey:"devices.junction.name",width:60,height:60,ports:[{id:"in",labelKey:"devices.junction.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out_top",labelKey:"devices.junction.ports.out_top",kind:"outlet",position:{x:60,y:15}},{id:"out_bottom",labelKey:"devices.junction.ports.out_bottom",kind:"outlet",position:{x:60,y:45}}]},Kt,Rt],ee=te.map(t=>t.type),oe=new Map(te.map(t=>[t.type,t]));function ie(t){return oe.get(t)}function ne(t){const e=oe.get(t.type);return e?.resolve?e.resolve(t):e}const re="custom:heating-visualizer-card",se={outdoor_unit:"heat_pump",gas_boiler:"heating_boiler",electric_boiler:"heating_boiler",solid_fuel_boiler:"heating_boiler",flow_meter:"pipe_sensor",pressure_gauge:"pipe_sensor",heat_meter:"pipe_sensor",dhw_circulation_pump:"circulation_pump"},ae={1:["middle"],2:["top","bottom"],3:["top","middle","bottom"],4:["top","upper","lower","bottom"],5:[...xt]};function de(t){const e=se[t.type]??t.type,o=[];return t.channels?.length&&o.push(...function(t,e){if("manifold"===t)return e.map(t=>({...t,type:"loop"}));const o=e.filter(t=>t.entity_id);if("buffer_tank"===t){const t=ae[Math.min(o.length,5)]??[];return o.slice(0,5).map((e,o)=>({...e,type:"temperature",slot:t[o]}))}if("boiler"===t){const t=[kt[0],kt[2]];return o.slice(0,2).map((e,o)=>({...e,type:"temperature",slot:t[o]}))}return o.map(t=>({...t,type:"value"}))}(e,t.channels)),"manifold"!==e||t.channels?.length||o.push(...Array.from({length:4},()=>({type:"loop"}))),t.heater?.entity_id&&o.push({...t.heater,type:"electric_heater"}),{id:t.id,type:e,name:t.name,position:t.position??{x:0,y:0},rotation:t.rotation,...t.state,addons:o.length?o:void 0}}function le(t){const e=t,o=("number"==typeof e.schema_version?e.schema_version:e.schema?1:2)<2?function(t){const{schema:e,language:o,translations:i,...n}=t,r=(e?.edges??[]).map(t=>({from:`${t.from.nodeId}.${t.from.portId}`,to:`${t.to.nodeId}.${t.to.portId}`})),s=(e?.overlays??[]).map(({labelKey:t,...e})=>e);return{...n,type:re,schema_version:2,nodes:(e?.nodes??[]).map(de),connections:r,overlays:s}}(e):{...e};return{...o,type:"string"==typeof e.type?e.type:re,schema_version:2,nodes:(o.nodes??[]).map(t=>se[t.type]?{...t,type:se[t.type]}:t),connections:o.connections??[],overlays:o.overlays??[]}}const ce="en",pe={en:{devices:{heat_pump:{name:"Heat pump",ports:{cold_in:"Heating water return",hot_out:"Heating water out"}},valve_3way:{name:"3-way valve",ports:{in:"Inlet",out_a:"Outlet A",out_b:"Outlet B"}},boiler:{name:"DHW tank",ports:{cold_in:"Cold water inlet",hot_out:"Hot water outlet",coil_in:"Heat exchanger supply",coil_out:"Heat exchanger return",coil2_in:"Second heat exchanger supply",coil2_out:"Second heat exchanger return"}},junction:{name:"Junction",ports:{in:"Inlet",out_top:"Top outlet",out_bottom:"Bottom outlet"}},circulation_pump:{name:"Circulation pump",ports:{in:"Inlet",out:"Outlet"}},floor_heating:{name:"Floor heating",ports:{in:"Supply",out:"Return"}},manifold:{name:"Floor heating manifold",ports:{supply_in:"Supply",return_out:"Return",loop_out:"Loop {0} supply",loop_in:"Loop {0} return"}},buffer_tank:{name:"Buffer tank",ports:{source_in:"From heat source",source_out:"Back to heat source",supply_out:"To heating system",return_in:"Return from heating system",coil_in:"Heat exchanger supply",coil_out:"Heat exchanger return"}},mixing_valve:{name:"Mixing valve",ports:{hot_in:"Hot branch",return_in:"Return (bypass)",mixed_out:"Mixed water"}},electric_heater:{name:"Electric flow heater",ports:{in:"Inlet",out:"Outlet"}},inline:{ports:{in:"Inlet",out:"Outlet"}},pipe_sensor:{name:"Sensor / meter"},heat_source:{ports:{supply_out:"Supply",return_in:"Return"}},heating_boiler:{name:"Heating boiler"},solar_collector:{name:"Solar collector",ports:{hot_out:"Hot outlet",cold_in:"Cold inlet"}},four_port:{ports:{primary_in:"Primary supply",primary_out:"Primary return",secondary_out:"Secondary supply",secondary_in:"Secondary return"}},hydraulic_separator:{name:"Hydraulic separator"},plate_heat_exchanger:{name:"Plate heat exchanger"},expansion_vessel:{name:"Expansion vessel",ports:{connection:"Connection"}},safety_valve:{name:"Safety valve",ports:{in:"Inlet",discharge:"Discharge"}},zone_valve:{name:"Zone valve"},terminal:{ports:{in:"Supply",out:"Return"}},radiator:{name:"Radiator"},fancoil:{name:"Fan coil / convector"},outdoor_temperature:{name:"Outdoor temperature"}},addons:{temperature:{name:"Temperature sensor"},value:{name:"Value"},electric_heater:{name:"Electric heater"},pump:{name:"Pump"},actuator:{name:"Actuator"},fan:{name:"Fan"},mode:{name:"Operating mode"},setpoint:{name:"Setpoint"},defrost:{name:"Defrost"},alarm:{name:"Alarm"},window:{name:"Window"},heat_exchanger:{name:"Heat exchanger",hint:"Adds the heat exchanger and its connections to the drawing."},loop:{name:"Loop"}},slots:{top:"top",upper:"upper",middle:"middle",lower:"lower",bottom:"bottom",supply:"supply",return:"return",outdoor:"outdoor",evaporator:"evaporator",room:"room",floor:"floor",mixed:"mixed water",inlet:"inlet",outlet:"outlet",collector:"collector",primary_supply:"primary supply",primary_return:"primary return",secondary_supply:"secondary supply",secondary_return:"secondary return"},templates:{heat_pump_floor:"Heat pump + floor heating",heat_pump_dhw_floor:"Heat pump + DHW tank + floor heating",heat_pump_buffer_radiators:"Heat pump + buffer tank + radiators",boiler_radiators:"Boiler + radiators"},editor:{schema_tab:"Schema",overlay_tab:"Overlays",device_type:"Device type",add_device:"Add device",add_from_entity:"Add from entity",add_from_entity_helper:"Pick the device's main entity; the device type is suggested",choose_type:"Choose device type",suggested_title:"Suggested add-ons",suggested_hint:"Other entities of the same Home Assistant device.",add_all:"Add all",template:"Template",insert_template:"Insert template",auto_layout:"Arrange automatically",undo_layout:"Undo arrangement",pipe_style:"Pipe style",pipe_style_orthogonal:"Right-angled pipes",pipe_style_curved:"Curved pipes",drawing_mode:"Drawing mode",drawing_hint:"Drag devices; click two ports to connect them.",select_hint:"Click a device to select it; arrow keys move it (Shift = faster).",move_left:"Move left",move_up:"Move up",move_down:"Move down",move_right:"Move right",empty_hint:"Add a device to start building your schema.",devices_title:"Devices",no_entity:"No entity",ports_connected:"{0}/{1} connected",addon_count:"{0} add-ons",back:"Back",name:"Name",name_helper:"Empty = device type name",entity:"Entity",active_state:"Active state",active_state_helper:"Empty = hvac_action, otherwise on / heat / open",value_attribute:"Displayed attribute",value_attribute_helper:"Empty = entity state, e.g. current_temperature",actuator_entity:"Actuator entity",position_attribute:"Position attribute (%)",position_attribute_helper:"Empty = current_position or the entity state",valve_attribute:"Valve position attribute",valve_attribute_helper:"Default: position",branch_a:"Value for branch A",branch_a_helper:"Default: a",branch_b:"Value for branch B",branch_b_helper:"Default: b",loop_temperature:"Room temperature entity",addons_title:"Add-ons",addons_empty:"No add-ons yet.",addon_type:"Add-on type",add_addon:"Add add-on",remove_addon:"Remove add-on",remaining:"{0} left",slot:"Position",addon_name_helper:"Empty = add-on type and position",connections_title:"Connections",not_connected:"Not connected",connect_to:"Connect to",disconnect:"Disconnect",connection_pending:"Connecting from {0} — click a compatible port",delete_connection:"Delete selected connection",invalid_connections:"{0} connections point to missing or incompatible ports.",remove_invalid:"Remove",position_title:"Position",rotate:"Rotate",delete_device:"Delete device",add_overlay:"Add overlay",overlays_empty:"No overlays yet.",overlay_n:"Overlay {0}",remove_overlay:"Remove overlay"},overlay:{entity:"Entity",name:"Name",name_helper:"Empty = entity name",name_yaml:"The name is configured in YAML.",template:"Display template",template_helper:"Placeholders: {{ state }}, {{ attr('attribute') }}. Empty = formatted state",rules:"Conditional rules",add_rule:"Add rule",remove_rule:"Remove rule",rule:{condition:"Condition",condition_state:"State equals",condition_numeric:"Numeric value",entity:"Entity",entity_helper:"Empty = overlay entity",state:"State",above:"Above",below:"Below",color:"Text color",color_helper:"Home Assistant color name or any CSS color",hide:"Hide overlay"}},card:{empty:"No schema configured. Edit this card to design your heating layout."}},cs:{devices:{heat_pump:{name:"Tepelné čerpadlo",ports:{cold_in:"Vratka topné vody",hot_out:"Výstup topné vody"}},valve_3way:{name:"Třícestný ventil",ports:{in:"Vstup",out_a:"Výstup A",out_b:"Výstup B"}},boiler:{name:"Bojler",ports:{cold_in:"Studená voda – vstup",hot_out:"Teplá voda – výstup",coil_in:"Výměník – přívod od zdroje",coil_out:"Výměník – vratka ke zdroji",coil2_in:"Druhý výměník – přívod",coil2_out:"Druhý výměník – vratka"}},junction:{name:"Uzel",ports:{in:"Vstup",out_top:"Horní výstup",out_bottom:"Spodní výstup"}},circulation_pump:{name:"Oběhové čerpadlo",ports:{in:"Vstup",out:"Výstup"}},floor_heating:{name:"Podlahové topení",ports:{in:"Přívod",out:"Vratka"}},manifold:{name:"Rozdělovač podlahového topení",ports:{supply_in:"Přívod",return_out:"Vratka",loop_out:"Okruh {0} – přívod",loop_in:"Okruh {0} – vratka"}},buffer_tank:{name:"Akumulační nádrž",ports:{source_in:"Od zdroje tepla",source_out:"Zpět ke zdroji tepla",supply_out:"Do topného systému",return_in:"Vratka z topného systému",coil_in:"Výměník – přívod",coil_out:"Výměník – vratka"}},mixing_valve:{name:"Směšovací ventil",ports:{hot_in:"Teplá větev",return_in:"Vratka (bypass)",mixed_out:"Smíšená voda"}},electric_heater:{name:"Průtokový elektrický ohřívač",ports:{in:"Vstup",out:"Výstup"}},inline:{ports:{in:"Vstup",out:"Výstup"}},pipe_sensor:{name:"Čidlo / měřidlo"},heat_source:{ports:{supply_out:"Přívod",return_in:"Vratka"}},heating_boiler:{name:"Kotel"},solar_collector:{name:"Solární kolektor",ports:{hot_out:"Teplý výstup",cold_in:"Studený vstup"}},four_port:{ports:{primary_in:"Primár – přívod",primary_out:"Primár – vratka",secondary_out:"Sekundár – přívod",secondary_in:"Sekundár – vratka"}},hydraulic_separator:{name:"Hydraulický vyrovnávač"},plate_heat_exchanger:{name:"Deskový výměník"},expansion_vessel:{name:"Expanzní nádoba",ports:{connection:"Připojení"}},safety_valve:{name:"Pojistný ventil",ports:{in:"Vstup",discharge:"Výtok"}},zone_valve:{name:"Zónový ventil"},terminal:{ports:{in:"Přívod",out:"Vratka"}},radiator:{name:"Radiátor"},fancoil:{name:"Fancoil / konvektor"},outdoor_temperature:{name:"Venkovní teplota"}},addons:{temperature:{name:"Teplotní čidlo"},value:{name:"Hodnota"},electric_heater:{name:"Elektrická topná spirála"},pump:{name:"Čerpadlo"},actuator:{name:"Pohon"},fan:{name:"Ventilátor"},mode:{name:"Provozní režim"},setpoint:{name:"Požadovaná teplota"},defrost:{name:"Odmrazování"},alarm:{name:"Porucha"},window:{name:"Okno"},heat_exchanger:{name:"Výměník",hint:"Přidá do výkresu výměník a jeho připojení."},loop:{name:"Okruh"}},slots:{top:"nahoře",upper:"horní část",middle:"uprostřed",lower:"dolní část",bottom:"dole",supply:"přívod",return:"vratka",outdoor:"venkovní",evaporator:"výparník",room:"místnost",floor:"podlaha",mixed:"smíšená voda",inlet:"vstup",outlet:"výstup",collector:"kolektor",primary_supply:"primár – přívod",primary_return:"primár – vratka",secondary_supply:"sekundár – přívod",secondary_return:"sekundár – vratka"},templates:{heat_pump_floor:"Tepelné čerpadlo + podlahové topení",heat_pump_dhw_floor:"Tepelné čerpadlo + bojler + podlahové topení",heat_pump_buffer_radiators:"Tepelné čerpadlo + akumulační nádrž + radiátory",boiler_radiators:"Kotel + radiátory"},editor:{schema_tab:"Schéma",overlay_tab:"Popisky",device_type:"Typ zařízení",add_device:"Přidat zařízení",add_from_entity:"Přidat z entity",add_from_entity_helper:"Vyberte hlavní entitu zařízení, typ se navrhne sám",choose_type:"Vyberte typ zařízení",suggested_title:"Navržené doplňky",suggested_hint:"Další entity téhož zařízení v Home Assistantu.",add_all:"Přidat vše",template:"Šablona",insert_template:"Vložit šablonu",auto_layout:"Rozmístit automaticky",undo_layout:"Vrátit rozmístění",pipe_style:"Vzhled potrubí",pipe_style_orthogonal:"Pravoúhlé potrubí",pipe_style_curved:"Oblouky",drawing_mode:"Režim kreslení",drawing_hint:"Přetáhněte zařízení; kliknutím na dva porty je propojíte.",select_hint:"Kliknutím vyberete zařízení, šipkami ho posunete (Shift = rychleji).",move_left:"Posunout vlevo",move_up:"Posunout nahoru",move_down:"Posunout dolů",move_right:"Posunout vpravo",empty_hint:"Přidejte zařízení a začněte sestavovat schéma.",devices_title:"Zařízení",no_entity:"Bez entity",ports_connected:"připojeno {0}/{1}",addon_count:"doplňky: {0}",back:"Zpět",name:"Název",name_helper:"Prázdné = název typu zařízení",entity:"Entita",active_state:"Aktivní stav",active_state_helper:"Prázdné = podle hvac_action, jinak on / heat / open",value_attribute:"Zobrazený atribut",value_attribute_helper:"Prázdné = stav entity, např. current_temperature",actuator_entity:"Entita pohonu",position_attribute:"Atribut polohy (%)",position_attribute_helper:"Prázdné = current_position nebo stav entity",valve_attribute:"Atribut polohy ventilu",valve_attribute_helper:"Výchozí: position",branch_a:"Hodnota pro větev A",branch_a_helper:"Výchozí: a",branch_b:"Hodnota pro větev B",branch_b_helper:"Výchozí: b",loop_temperature:"Entita teploty místnosti",addons_title:"Doplňky",addons_empty:"Zatím žádné doplňky.",addon_type:"Typ doplňku",add_addon:"Přidat doplněk",remove_addon:"Odebrat doplněk",remaining:"zbývá {0}",slot:"Umístění",addon_name_helper:"Prázdné = typ doplňku a umístění",connections_title:"Propojení",not_connected:"Nepřipojeno",connect_to:"Připojit k",disconnect:"Odpojit",connection_pending:"Napojování z {0} — klikněte na kompatibilní port",delete_connection:"Smazat vybrané propojení",invalid_connections:"Propojení s neexistujícím nebo nekompatibilním portem: {0}",remove_invalid:"Odstranit",position_title:"Poloha",rotate:"Otočit",delete_device:"Smazat zařízení",add_overlay:"Přidat popisek",overlays_empty:"Zatím žádné popisky.",overlay_n:"Popisek {0}",remove_overlay:"Odebrat popisek"},overlay:{entity:"Entita",name:"Název",name_helper:"Prázdné = název entity",name_yaml:"Název je nastaven v YAML.",template:"Šablona zobrazení",template_helper:"Zástupné symboly: {{ state }}, {{ attr('atribut') }}. Prázdné = formátovaný stav",rules:"Podmíněná pravidla",add_rule:"Přidat pravidlo",remove_rule:"Odebrat pravidlo",rule:{condition:"Podmínka",condition_state:"Stav je roven",condition_numeric:"Číselná hodnota",entity:"Entita",entity_helper:"Prázdné = entita popisku",state:"Stav",above:"Nad",below:"Pod",color:"Barva textu",color_helper:"Název barvy Home Assistantu nebo libovolná barva CSS",hide:"Skrýt popisek"}},card:{empty:"Schéma není nakonfigurováno. Upravte kartu a navrhněte topné schéma."}}};function he(t,e){let o=t;for(const t of e.split(".")){if(void 0===o||"string"==typeof o)return;o=o[t]}return"string"==typeof o?o:void 0}class ue{constructor(t){this.language=t}t(t,...e){let o=he(pe[this.language],t)??he(pe[ce],t)??t;return e.forEach((t,e)=>{o=o.replace(`{${e}}`,t)}),o}}function ye(t){return new ue(function(t){if(!t)return ce;if(pe[t])return t;const e=t.split("-")[0];return pe[e]?e:ce}(t))}const ve="states",_e="hassFormatters",me="hassInternationalization";class $e{constructor(t,e){this._host=t,this._context=e,this._callback=(t,e)=>{this._unsubscribe&&this._unsubscribe!==e&&this._unsubscribe(),this._unsubscribe=e,t!==this.value&&(this.value=t,this._host.requestUpdate())},t.addController(this)}hostConnected(){const t=new Event("context-request",{bubbles:!0,composed:!0});t.context=this._context,t.contextTarget=this._host,t.callback=this._callback,t.subscribe=!0,this._host.dispatchEvent(t)}hostDisconnected(){this._unsubscribe?.(),this._unsubscribe=void 0}}function fe(t){return((t??0)%360+360)%360}function ge(t,e){const o=e*Math.PI/180,i=Math.cos(o),n=Math.sin(o);return{x:Math.round(1e3*(t.x*i-t.y*n))/1e3||0,y:Math.round(1e3*(t.x*n+t.y*i))/1e3||0}}function be(t,e){const{x:o,y:i}=e.position,n=[[o,{x:-1,y:0}],[t.width-o,{x:1,y:0}],[i,{x:0,y:-1}],[t.height-i,{x:0,y:1}]];return n.sort((t,e)=>t[0]-e[0]),n[0][1]}function xe(t,e){const o=ne(t);if(!o)return;const i=o.ports.find(t=>t.id===e);if(!i)return;const n=fe(t.rotation),r=o.width/2,s=o.height/2,a=ge({x:i.position.x-r,y:i.position.y-s},n);return{nodeId:t.id,portId:i.id,x:t.position.x+r+a.x,y:t.position.y+s+a.y,kind:i.kind,direction:ge(be(o,i),n)}}function ke(t,e){const o=fe(t.rotation)%180!=0,i=o?e.height:e.width,n=o?e.width:e.height;return{x:t.position.x+(e.width-i)/2,y:t.position.y+(e.height-n)/2,width:i,height:n}}const we=(t,e,o)=>(t-e)*o>=0;function Ae(t,e,o,i){const n=0!==e.x,r=0!==i.x;if(n&&r){const n=(t.x+o.x)/2;if(we(n,t.x,e.x)&&we(n,o.x,i.x))return[{x:n,y:t.y},{x:n,y:o.y}];const r=(t.y+o.y)/2;return[{x:t.x,y:r},{x:o.x,y:r}]}if(!n&&!r){const n=(t.y+o.y)/2;if(we(n,t.y,e.y)&&we(n,o.y,i.y))return[{x:t.x,y:n},{x:o.x,y:n}];const r=(t.x+o.x)/2;return[{x:r,y:t.y},{x:r,y:o.y}]}if(n){const n={x:o.x,y:t.y};return we(n.x,t.x,e.x)&&we(n.y,o.y,i.y)?[n]:[{x:t.x,y:o.y}]}const s={x:t.x,y:o.y};return we(s.y,t.y,e.y)&&we(s.x,o.x,i.x)?[s]:[{x:o.x,y:t.y}]}function Se(t,e){const o=function(t,e){const o={x:t.x+20*t.direction.x,y:t.y+20*t.direction.y},i={x:e.x+20*e.direction.x,y:e.y+20*e.direction.y};return function(t){const e=t.filter((e,o)=>0===o||e.x!==t[o-1].x||e.y!==t[o-1].y);return e.filter((t,o)=>{if(0===o||o===e.length-1)return!0;const i=e[o-1],n=e[o+1];return(i.x-t.x)*(n.y-t.y)!==(i.y-t.y)*(n.x-t.x)})}([{x:t.x,y:t.y},o,...Ae(o,t.direction,i,e.direction),i,{x:e.x,y:e.y}])}(t,e);let i=`M ${o[0].x} ${o[0].y}`;for(let t=1;t<o.length-1;t++){const[e,n,r]=[o[t-1],o[t],o[t+1]],s=Math.hypot(n.x-e.x,n.y-e.y),a=Math.hypot(r.x-n.x,r.y-n.y),d=Math.min(8,s/2,a/2),l={x:n.x-(n.x-e.x)/s*d,y:n.y-(n.y-e.y)/s*d},c={x:n.x+(r.x-n.x)/a*d,y:n.y+(r.y-n.y)/a*d};i+=` L ${l.x} ${l.y} Q ${n.x} ${n.y} ${c.x} ${c.y}`}const n=o[o.length-1];return`${i} L ${n.x} ${n.y}`}function Me(t,e=10){return Math.round(t/e)*e}function Ee(t,e,o){if(!t||!o.entity_id)return"—";const i=t[o.entity_id];if(!i)return"—";if(o.template)return function(t,e,o){return t.replace(/\{\{\s*state\s*\}\}/g,e).replace(/\{\{\s*attr\(['"](\w+)['"]\)\s*\}\}/g,(t,e)=>String(o[e]??""))}(o.template,i.state,i.attributes);if(e)return e.formatEntityState(i);const n=i.attributes.unit_of_measurement;return n?`${i.state} ${n}`:i.state}const Ce=new Set(["primary","accent","disabled","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"]);function Pe(t){return Ce.has(t)?`var(--${t}-color)`:t}function Ie(t,e,o){const i=t[e.entity||o];if(!i)return!1;if("state"===e.condition)return void 0!==e.state&&i.state===e.state;if(void 0===e.above&&void 0===e.below)return!1;const n=Number(i.state);return!Number.isNaN(n)&&((void 0===e.above||n>e.above)&&(void 0===e.below||n<e.below))}const ze=new Set(["heating","preheating"]);function Le(t,e,o){if(!t||!e?.entity_id)return{active:!1};const i=t[e.entity_id];if(!i)return{active:!1};const n=e.value_attribute,r=void 0!==n?i.attributes[n]:void 0,s=void 0!==r,a=s?r:i.state,d=Number(a),l=i.attributes.unit_of_measurement;let c;c=void 0!==n&&s?o?o.formatEntityAttributeValue(i,n):String(r):o?o.formatEntityState(i):l?`${i.state} ${l}`:i.state;const p=function(t,e){if(void 0!==e)return t.state===e;const o=t.attributes.hvac_action;return"string"==typeof o?ze.has(o):"on"===t.state||"heat"===t.state||"open"===t.state}(i,e.active_state),h=e.mode_attribute??"position",u=String(i.attributes[h]??i.state??"");let y;return u===(e.branch_a_value??"a")&&(y="a"),u===(e.branch_b_value??"b")&&(y="b"),{active:p,valveBranch:y,value:c,numeric:""!==String(a??"").trim()&&Number.isFinite(d)?d:void 0,position:Ne(i,e.mode_attribute),unit:l,fromAttribute:s,deviceClass:i.attributes.device_class}}function Ne(t,e){const o=e?t.attributes[e]:t.attributes.current_position??t.state,i=Number(o);if(null!=o&&""!==o&&Number.isFinite(i))return Math.min(100,Math.max(0,i))}function Oe(t,e){return(t.addons??[]).filter(t=>t.config.type===e).map(t=>t.state)}function He(t){const e=new Map;for(const o of t.addons??[])"temperature"===o.config.type&&o.config.slot&&e.set(o.config.slot,o.state);return e}function Te(t){const e=(t.addons??[]).filter(t=>"electric_heater"===t.config.type&&t.config.entity_id);if(e.length)return{active:e.some(t=>t.state.active)}}const je="#ef5350",Ke="#42a5f5",De="#4caf50",Re="#ff7043",Ve="var(--card-background-color, #1c1c1c)",Ue="var(--divider-color, #888)",Be="var(--primary-color, #03a9f4)";function Ze(t){if(void 0===t)return Ue;const e=Math.min(1,Math.max(0,(t-20)/40));return`hsl(${Math.round(220*(1-e))}, 75%, 50%)`}function We(t,e,o=De){return t.active?o:e?Be:Ue}function Fe(t){return t?2.5:1.5}function qe(t,e){return t.ports.map(t=>Z`
    <circle
      class="port port-${t.kind}"
      data-port-id="${t.id}"
      cx="${t.position.x}" cy="${t.position.y}" r="5"
      fill="${Ve}"
      stroke="${"inlet"===t.kind?"#4fc3f7":"#ff8a65"}"
      stroke-width="2"
    ><title>${e.t(t.labelKey,...t.labelArgs??[])}</title></circle>
  `)}function Je(t,e,o,i){const n=o/6;let r=`M ${t} ${e}`;for(let o=1;o<=6;o++)r+=` L ${t+o*n} ${e+(o%2==0?0:-8)}`;const s=i.active?Re:Ue;return Z`
    <path class="heater ${i.active?"active":""}" d="${r}" fill="none"
      stroke="${s}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
  `}function Ye(t,e){return t.ports.map(o=>{const{x:i,y:n}=o.position,r=0===i?e:i===t.width?-e:0,s=0===n?e:n===t.height?-e:0;return Z`<line x1="${i}" y1="${n}" x2="${i+r}" y2="${n+s}" stroke="${Ue}" stroke-width="2" />`})}function Ge(t){return void 0!==t.numeric||t.fromAttribute?t.value:void 0}function Xe(t,e,o,i=!1){const n=o.value??"—",r=6.5*n.length+8,s=i&&void 0!==o.numeric?`fill: ${Ze(o.numeric)}`:"";return Z`
    <rect x="${t-r/2}" y="${e-11}" width="${r}" height="15" rx="3" fill="${Ve}" opacity="0.85" />
    <text x="${t}" y="${e}" text-anchor="middle" class="device-value" style="${s}">
      <title>${o.label??""}</title>${n}
    </text>
  `}const Qe="#ffb300";function to(t,e,o,i,n){switch(t){case"heating_boiler":return function(t,e,o,i){const n=t.width/2-4,r=t.height/2+14,s=Ge(i),a=i.active?Re:Ue,d=[-14,0,14].map(t=>{const e=n+t;return Z`
      <path d="M ${e} ${r+18} C ${e-6} ${r+10}, ${e+6} ${r+2}, ${e} ${r-6}
        C ${e-6} ${r-14}, ${e+6} ${r-20}, ${e} ${r-26}"
        fill="none" stroke="${a}" stroke-width="2.5" stroke-linecap="round" />
    `});return Z`
    <g class="device device-heat-source">
      ${Ye(t,12)}
      <rect x="8" y="10" width="${t.width-20}" height="${t.height-20}" rx="8"
        fill="${Ve}" stroke="${We(i,o,Re)}"
        stroke-width="${Fe(o)}" />
      ${s?Z`<text x="${n}" y="30" text-anchor="middle" class="device-value">${s}</text>`:Z``}
      ${d}
      ${qe(t,e)}
    </g>
  `}(e,o,i,n);case"solar_collector":return function(t,e,o,i){const n=We(i,o,Qe),r=Ge(i);return Z`
    <g class="device device-solar-collector">
      <path d="M 124 22 L ${t.width} 22 M 100 84 L ${t.width} 84" stroke="${Ue}" stroke-width="2" />
      <path d="M 10 84 L 36 22 L 124 22 L 100 84 Z" fill="${Ve}"
        stroke="${n}" stroke-width="${Fe(o)}" stroke-linejoin="round" />
      <path d="M 58 22 L 32 84 M 80 22 L 54 84 M 102 22 L 76 84 M 23 53 L 112 53"
        stroke="${Ue}" stroke-width="1" />
      <circle cx="20" cy="14" r="6" fill="${i.active?Qe:"none"}" stroke="${Qe}" stroke-width="1.5" />
      ${r?Z`<text x="67" y="${t.height-2}" text-anchor="middle" class="device-value">${r}</text>`:Z``}
      ${qe(t,e)}
    </g>
  `}(e,o,i,n);case"hydraulic_separator":return function(t,e,o,i){const n=25,r=t.width-25,s=t.height-8,a=t.height/2,d=Ge(i);return Z`
    <g class="device device-hydraulic-separator">
      ${Ye(t,n)}
      <rect x="${n}" y="${8}" width="${r-n}" height="${a-8}" fill="${je}" opacity="0.25" />
      <rect x="${n}" y="${a}" width="${r-n}" height="${s-a}" fill="${Ke}" opacity="0.25" />
      <rect x="${n}" y="${8}" width="${r-n}" height="${s-8}" rx="${(r-n)/2}"
        fill="none" stroke="${We(i,o)}" stroke-width="${Fe(o)}" />
      ${d?Z`<text x="${t.width/2}" y="${a+4}" text-anchor="middle" class="device-value">${d}</text>`:Z``}
      ${qe(t,e)}
    </g>
  `}(e,o,i,n);case"plate_heat_exchanger":return function(t,e,o,i){const n=t.width-22,r=[];for(let e=29,o=0;e<n-3;e+=7,o++)r.push(Z`<line x1="${e}" y1="18" x2="${e}" y2="${t.height-18}"
      stroke="${o%2==0?je:Ke}" stroke-width="2" opacity="0.8" />`);return Z`
    <g class="device device-plate-heat-exchanger">
      ${Ye(t,22)}
      <rect x="${22}" y="10" width="${n-22}" height="${t.height-20}" rx="4"
        fill="${Ve}" stroke="${We(i,o)}" stroke-width="${Fe(o)}" />
      ${r}
      ${qe(t,e)}
    </g>
  `}(e,o,i,n);case"expansion_vessel":return function(t,e,o,i){const n=t.width/2,r=47,s=Ge(i);return Z`
    <g class="device device-expansion-vessel">
      <line x1="${n}" y1="${86}" x2="${n}" y2="${t.height}" stroke="${Ue}" stroke-width="2" />
      <rect x="13" y="${r}" width="${t.width-26}" height="${31}" fill="${Ke}" opacity="0.2" />
      <rect x="12" y="${8}" width="${t.width-24}" height="${78}" rx="${(t.width-24)/2}"
        fill="none" stroke="${We(i,o)}" stroke-width="${Fe(o)}" />
      <path d="M 13 ${r} Q ${n} ${55} ${t.width-13} ${r}"
        fill="none" stroke="${Ue}" stroke-width="1.5" stroke-dasharray="3 2" />
      ${s?Z`<text x="${n}" y="${37}" text-anchor="middle" class="device-value">${s}</text>`:Z``}
      ${qe(t,e)}
    </g>
  `}(e,o,i,n);case"safety_valve":return function(t,e,o,i){const n=We(i,o,je),r=Fe(o),s=30,a=56;return Z`
    <g class="device device-safety-valve">
      <line x1="${s}" y1="${70}" x2="${s}" y2="${t.height}" stroke="${Ue}" stroke-width="2" />
      <line x1="${44}" y1="${a}" x2="${t.width}" y2="${a}" stroke="${Ue}" stroke-width="2" />
      <path d="M ${18} ${70} L ${42} ${70} L ${s} ${a} Z M ${44} ${44} L ${44} ${68} L ${s} ${a} Z"
        fill="${i.active?je:Ve}" fill-opacity="${i.active?.5:1}"
        stroke="${n}" stroke-width="${r}" stroke-linejoin="round" />
      <path d="M ${s} ${a} L ${s} ${48} L ${23} ${44} L ${37} ${38} L ${23} ${32}
        L ${37} ${26} L ${23} ${20} L ${s} ${16}"
        fill="none" stroke="${n}" stroke-width="1.5" stroke-linejoin="round" />
      ${qe(t,e)}
    </g>
  `}(e,o,i,n);case"zone_valve":return function(t,e,o,i){const n=We(i,o),r=Fe(o),s=t.width/2,a=50;return Z`
    <g class="device device-zone-valve">
      <line x1="0" y1="${a}" x2="${s-16}" y2="${a}" stroke="${Ue}" stroke-width="2" />
      <line x1="${s+16}" y1="${a}" x2="${t.width}" y2="${a}" stroke="${Ue}" stroke-width="2" />
      <path d="M ${s-16} ${39} L ${s} ${a} L ${s-16} ${61} Z M ${s+16} ${39} L ${s} ${a} L ${s+16} ${61} Z"
        fill="${i.active?De:Ve}" fill-opacity="${i.active?.45:1}"
        stroke="${n}" stroke-width="${r}" stroke-linejoin="round" />
      <line x1="${s}" y1="${a}" x2="${s}" y2="30" stroke="${n}" stroke-width="2" />
      <rect x="${s-12}" y="10" width="24" height="20" rx="3"
        fill="${i.active?De:Ve}" stroke="${n}" stroke-width="${r}" />
      ${qe(t,e)}
    </g>
  `}(e,o,i,n);case"radiator":return function(t,e,o,i){const n=Ge(i),r=[];for(let e=26;e<=t.width-24;e+=10)r.push(Z`<line x1="${e}" y1="22" x2="${e}" y2="58" stroke="${Ue}" stroke-width="1.5" />`);return Z`
    <g class="device device-radiator">
      <path d="M 0 66 L 16 66 L 16 62 M ${t.width-16} 62 L ${t.width-16} 66 L ${t.width} 66"
        fill="none" stroke="${Ue}" stroke-width="2" />
      <rect x="16" y="16" width="${t.width-32}" height="46" rx="4"
        fill="${i.active?Re:Ve}" fill-opacity="${i.active?.2:1}"
        stroke="${We(i,o,Re)}" stroke-width="${Fe(o)}" />
      ${r}
      <rect x="4" y="26" width="10" height="18" rx="3" fill="${Ve}" stroke="${Ue}" stroke-width="1.5" />
      ${n?Z`<text x="${t.width/2}" y="10" text-anchor="middle" class="device-value">${n}</text>`:Z``}
      ${qe(t,e)}
    </g>
  `}(e,o,i,n);case"fancoil":return function(t,e,o,i){const n=Ge(i);return Z`
    <g class="device device-fancoil">
      <path d="M 0 66 L 16 66 M ${t.width-16} 66 L ${t.width} 66" stroke="${Ue}" stroke-width="2" />
      <rect x="16" y="12" width="${t.width-32}" height="54" rx="6"
        fill="${Ve}" stroke="${We(i,o)}" stroke-width="${Fe(o)}" />
      <circle cx="${46}" cy="${38}" r="20" fill="none" stroke="${Ue}" stroke-width="1.5" />
      <g class="fan ${i.active?"spinning":""}">
        ${[0,90,180,270].map(t=>Z`
          <path d="${"M 0 0 C 4 -7, 13 -9, 17 -4 C 12 -1, 5 0, 0 0 Z"}" transform="translate(${46} ${38}) rotate(${t})" fill="${Be}" opacity="0.75" />
        `)}
        <circle cx="${46}" cy="${38}" r="3.5" fill="${Be}" />
      </g>
      <path d="M 76 50 L 104 50 M 76 56 L 104 56" stroke="${Ue}" stroke-width="1.5" />
      ${n?Z`<text x="90" y="36" text-anchor="middle" class="device-value">${n}</text>`:Z``}
      ${qe(t,e)}
    </g>
  `}(e,o,i,n);case"outdoor_temperature":return function(t,e,o){const i=e?Be:Ue;return Z`
    <g class="device device-outdoor-temperature">
      <rect x="2" y="6" width="${t.width-4}" height="${t.height-12}" rx="${(t.height-12)/2}"
        fill="${Ve}" stroke="${i}" stroke-width="${Fe(e)}" />
      <circle cx="22" cy="${t.height/2}" r="6" fill="none" stroke="#ffb300" stroke-width="1.5" />
      <path d="M 22 13 V 16 M 22 34 V 37 M 10 25 H 13 M 31 25 H 34 M 14 17 L 16 19 M 28 31 L 30 33 M 14 33 L 16 31 M 28 19 L 30 17"
        stroke="#ffb300" stroke-width="1.5" stroke-linecap="round" />
      <text x="${t.width/2+14}" y="${t.height/2+4}" text-anchor="middle" class="device-value">
        ${o.value??"—"}
      </text>
    </g>
  `}(e,i,n);default:return}}const eo={temperature:"temperature",pressure:"pressure",volume_flow_rate:"flow",energy:"energy",power:"energy"};function oo(t,e,o,i){const n=function(t){const e=t.deviceClass?eo[t.deviceClass]:void 0;return e||(t.unit?.includes("°")?"temperature":"generic")}(i),r=t.width/2,s=t.height-14,a=o?"var(--primary-color, #03a9f4)":"temperature"===n?Ze(i.numeric):"var(--primary-color, #03a9f4)",d="energy"===n||"generic"===n;return Z`
    <g class="device device-inline-sensor">
      <line x1="0" y1="${s}" x2="${t.width}" y2="${s}" stroke="var(--divider-color, #888)" stroke-width="3" />
      <circle cx="${r}" cy="${s}" r="11" fill="var(--card-background-color, #1c1c1c)"
        stroke="${a}" stroke-width="${o?2.5:2}" />
      <path d="${function(t,e,o){switch(t){case"temperature":return`M ${e-1.5} ${o+2} V ${o-6} A 1.5 1.5 0 0 1 ${e+1.5} ${o-6} V ${o+2} M ${e-3} ${o+4.5} A 3 3 0 1 0 ${e+3} ${o+4.5} A 3 3 0 1 0 ${e-3} ${o+4.5}`;case"flow":return`M ${e-6} ${o} L ${e+5} ${o} M ${e+1} ${o-4} L ${e+5} ${o} L ${e+1} ${o+4}`;case"pressure":return`M ${e-6} ${o+3} A 6 6 0 1 1 ${e+6} ${o+3} M ${e} ${o+1} L ${e+4} ${o-4}`;case"energy":return`M ${e+1} ${o-7} L ${e-4} ${o+1} L ${e} ${o+1} L ${e-1} ${o+7} L ${e+4} ${o-1} L ${e} ${o-1} Z`;case"generic":return`M ${e-3} ${o} A 3 3 0 1 0 ${e+3} ${o} A 3 3 0 1 0 ${e-3} ${o} Z`}}(n,r,s)}" fill="${d?a:"none"}"
        stroke="${a}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <text x="${r}" y="${s-17}" text-anchor="middle" class="device-value">${i.value??"—"}</text>
      ${qe(t,e)}
    </g>
  `}function io(t,e,o,i,n,r={}){switch(t){case"heat_pump":return function(t,e,o,i,n){const r=i.active?"#4caf50":o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",s=o?2.5:1.5;return Z`
    <g class="device device-outdoor-unit">
      <rect x="10" y="12" width="${t.width-20}" height="${t.height-24}" rx="6"
        fill="var(--card-background-color, #1c1c1c)" stroke="${r}" stroke-width="${s}" />
      <circle cx="${58}" cy="${60}" r="34" fill="none" stroke="var(--divider-color, #888)" stroke-width="1.5" />
      <g class="fan ${i.active?"spinning":""}">
        ${[0,90,180,270].map(t=>Z`
          <path d="${"M 0 0 C 6 -10, 20 -14, 26 -6 C 18 -2, 8 0, 0 0 Z"}" transform="translate(${58} ${60}) rotate(${t})"
            fill="var(--primary-color, #03a9f4)" opacity="0.75" />
        `)}
        <circle cx="${58}" cy="${60}" r="5" fill="var(--primary-color, #03a9f4)" />
      </g>
      ${n.slice(0,6).map((t,e)=>Z`
        <text x="104" y="${30+15*e}" class="device-value">
          <title>${t.label??""}</title>${t.value??"—"}
        </text>
      `)}
      ${qe(t,e)}
    </g>
  `}(e,o,i,n,[...Oe(r,"temperature"),...Oe(r,"value")]);case"valve_3way":return function(t,e,o,i){const n=i.active?"#4caf50":o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",r=o?2.5:1.5,s="a"===i.valveBranch?"#4caf50":"var(--divider-color, #555)",a="b"===i.valveBranch?"#4caf50":"var(--divider-color, #555)";return Z`
    <g class="device device-valve-3way">
      <polygon
        points="10,50 45,15 45,35 90,35 90,65 45,65 45,85"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${n}" stroke-width="${r}"
      />
      <line x1="45" y1="50" x2="90" y2="25" stroke="${s}" stroke-width="3" />
      <line x1="45" y1="50" x2="90" y2="75" stroke="${a}" stroke-width="3" />
      ${qe(t,e)}
    </g>
  `}(e,o,i,n);case"boiler":return function(t,e,o,i,n,r){const s=i.active?"#4caf50":o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",a=o?2.5:1.5,d=t.ports.some(t=>"coil2_in"===t.id),l=t.ports.find(t=>"cold_in"===t.id)?.position.y??118,c={[kt[0]]:34,[kt[1]]:78,[kt[2]]:t.height-26};return Z`
    <g class="device device-boiler">
      <path d="M 88 30 H ${t.width} M 88 ${l} H ${t.width}" stroke="var(--divider-color, #888)" stroke-width="2" />
      <rect
        x="12" y="8" width="76" height="${t.height-16}" rx="18"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${s}" stroke-width="${a}"
      />
      <path d="${"M 0 50 H 24 L 58 58 L 24 66 L 58 74 L 24 82 L 58 90 L 24 98 L 24 100 H 0"}" fill="none" stroke="${je}" stroke-width="2" stroke-linejoin="round" opacity="0.8" />
      ${d?Z`<path d="${"M 0 122 H 24 L 58 130 L 24 138 L 58 146 L 24 154 L 24 160 H 0"}" fill="none" stroke="${je}" stroke-width="2" stroke-linejoin="round" opacity="0.6" />`:Z``}
      ${kt.map(t=>{const e=r.get(t);return e?Xe(50,c[t],e,!0):Z``})}
      ${n?Je(30,t.height-14,40,n):Z``}
      ${qe(t,e)}
    </g>
  `}(e,o,i,n,Te(r),He(r));case"junction":return function(t,e,o,i){const n=i.active?"#4caf50":o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return Z`
    <g class="device device-junction">
      <circle
        cx="30" cy="30" r="18"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${n}" stroke-width="${o?2.5:1.5}"
      />
      ${qe(t,e)}
    </g>
  `}(e,o,i,n);case"circulation_pump":return function(t,e,o,i){const n=i.active?"#4caf50":o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return Z`
    <g class="device device-circulation-pump">
      <circle
        cx="45" cy="45" r="28"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${n}" stroke-width="${o?2.5:1.5}"
      />
      <g class="${i.active?"spinning":""}">
        <path d="M 32 52 A 14 14 0 0 1 58 38"
          fill="none" stroke="var(--primary-color, #03a9f4)" stroke-width="2" stroke-linecap="round" />
        <polygon points="58,38 52,38 56,32" fill="var(--primary-color, #03a9f4)" />
      </g>
      ${qe(t,e)}
    </g>
  `}(e,o,i,n);case"floor_heating":return function(t,e,o,i){const n=i.active?"#4caf50":o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return Z`
    <g class="device device-floor-heating">
      <rect
        x="10" y="18" width="120" height="55" rx="8"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${n}" stroke-width="${o?2.5:1.5}"
      />
      <path d="M 20 40 C 35 30, 50 50, 65 40 C 80 30, 95 50, 110 40 C 115 37, 120 37, 126 40"
        fill="none" stroke="var(--primary-color, #03a9f4)" stroke-width="2" />
      ${qe(t,e)}
    </g>
  `}(e,o,i,n);case"manifold":return function(t,e,o,i,n){const r=i.active?"#4caf50":o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",s=o?2.5:1.5,a=t.width-8,d=t.ports.filter(t=>t.id.startsWith("loop_")&&"outlet"===t.kind);return Z`
    <g class="device device-manifold">
      <rect x="2" y="18" width="${t.width-4}" height="94" rx="6"
        fill="none" stroke="${r}" stroke-width="${s}" stroke-dasharray="4 3" />
      <rect x="4" y="22" width="${a}" height="16" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${je}" stroke-width="2" />
      <rect x="4" y="92" width="${a}" height="16" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${Ke}" stroke-width="2" />
      ${d.map((e,o)=>{const i=e.position.x,r=n[o]?.active??!1;return Z`
          <line x1="${i}" y1="0" x2="${i}" y2="22" stroke="${je}" stroke-width="2" />
          <rect class="actuator ${r?"active":""}" x="${i-7}" y="6" width="14" height="11" rx="2"
            fill="${r?"#4caf50":"var(--card-background-color, #1c1c1c)"}"
            stroke="${r?"#4caf50":"var(--divider-color, #888)"}" stroke-width="1.5" />
          <line x1="${i}" y1="108" x2="${i}" y2="${t.height}" stroke="${Ke}" stroke-width="2" />
          <text x="${i}" y="69" text-anchor="middle" class="device-label">${o+1}</text>
        `})}
      ${qe(t,e)}
    </g>
  `}(e,o,i,n,Oe(r,"loop"));case"buffer_tank":return function(t,e,o,i,n,r){const s=i.active?"#4caf50":o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",a=o?2.5:1.5,d=t.height-10,l=(d-16-36)/(xt.length-1),c=xt.map((t,e)=>({y:34+e*l,state:n.get(t)})).filter(t=>void 0!==t.state),p=t.ports.some(t=>"coil_in"===t.id);return Z`
    <g class="device device-buffer-tank">
      ${t.ports.map(t=>Z`
        <line x1="${t.position.x}" y1="${t.position.y}" x2="${0===t.position.x?14:86}" y2="${t.position.y}"
          stroke="var(--divider-color, #888)" stroke-width="2" />
      `)}
      <rect x="14" y="10" width="72" height="${t.height-14}" rx="10"
        fill="var(--card-background-color, #1c1c1c)" stroke="${s}" stroke-width="${a}" />
      ${c.map((t,e)=>{const o=0===e?16:(c[e-1].y+t.y)/2,i=e===c.length-1?d:(t.y+c[e+1].y)/2,n=Ze(t.state.numeric);return Z`
          <rect x="17" y="${o}" width="66" height="${i-o}" fill="${n}" opacity="0.3" />
          <circle cx="18" cy="${t.y}" r="3" fill="${n}" />
        `})}
      ${p?Z`<path d="M 14 80 L 46 88 L 18 96 L 46 104 L 18 112 L 14 118" fill="none"
            stroke="${je}" stroke-width="2" stroke-linejoin="round" opacity="0.8" />`:Z``}
      ${c.map(t=>Xe(56,t.y+4,t.state))}
      ${r?Je(28,d-8,44,r):Z``}
      ${qe(t,e)}
    </g>
  `}(e,o,i,n,He(r),Te(r));case"mixing_valve":return function(t,e,o,i){const n=o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",r=o?2.5:1.5,s=i.position,a=void 0===s?"var(--divider-color, #888)":`hsl(${Math.round(210*(1-s/100))}, 75%, 55%)`;return Z`
    <g class="device device-mixing-valve">
      <line x1="0" y1="70" x2="22" y2="70" stroke="${je}" stroke-width="3" />
      <line x1="50" y1="96" x2="50" y2="${t.height}" stroke="${Ke}" stroke-width="3" />
      <line x1="78" y1="70" x2="${t.width}" y2="70" stroke="${a}" stroke-width="3" />
      <path d="M 22 56 L 50 70 L 22 84 Z M 78 56 L 50 70 L 78 84 Z M 36 98 L 50 70 L 64 98 Z"
        fill="var(--card-background-color, #1c1c1c)" stroke="${n}" stroke-width="${r}"
        stroke-linejoin="round" />
      <line x1="50" y1="36" x2="50" y2="70" stroke="${n}" stroke-width="2" />
      <rect x="28" y="10" width="44" height="26" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${n}" stroke-width="${r}" />
      ${void 0===s?Z``:Z`<rect x="30" y="12" width="${40*s/100}" height="22" rx="3" fill="${a}" opacity="0.35" />`}
      <text x="50" y="27" text-anchor="middle" class="device-value">
        ${void 0===s?"—":`${Math.round(s)} %`}
      </text>
      ${qe(t,e)}
    </g>
  `}(e,o,i,n);case"electric_heater":return function(t,e,o,i){const n=i.active?Re:o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",r=o?2.5:1.5;return Z`
    <g class="device device-electric-heater">
      <rect x="10" y="12" width="${t.width-20}" height="${t.height-24}" rx="8"
        fill="var(--card-background-color, #1c1c1c)" stroke="${n}" stroke-width="${r}" />
      ${Je(24,t.height/2+4,t.width-48,i)}
      ${qe(t,e)}
    </g>
  `}(e,o,i,n);case"pipe_sensor":return oo(e,o,i,n);default:return to(t,e,o,i,n)}}const no={temperature:{type:"temperature",display:"value",domains:["sensor"],deviceClasses:["temperature"]},value:{type:"value",display:"value",domains:["sensor","number"]},electric_heater:{type:"electric_heater",display:"binary",domains:["switch","binary_sensor","sensor","input_boolean"],deviceClasses:["power","heat","running"]},pump:{type:"pump",display:"binary",domains:["switch","binary_sensor","sensor"],deviceClasses:["running"]},actuator:{type:"actuator",display:"position",domains:["valve","switch","binary_sensor","number","sensor"]},fan:{type:"fan",display:"binary",domains:["fan","sensor","binary_sensor"]},mode:{type:"mode",display:"text",domains:["select","sensor","input_select","climate","water_heater"],deviceClasses:["enum"]},setpoint:{type:"setpoint",display:"value",domains:["number","input_number","climate","water_heater","sensor"],deviceClasses:["temperature"]},defrost:{type:"defrost",display:"binary",domains:["binary_sensor","sensor"]},alarm:{type:"alarm",display:"binary",domains:["binary_sensor","sensor"],deviceClasses:["problem"]},window:{type:"window",display:"binary",domains:["binary_sensor"],deviceClasses:["window","opening"]},heat_exchanger:{type:"heat_exchanger",display:"none",entityless:!0},loop:{type:"loop",display:"binary",domains:["valve","switch","binary_sensor","climate"]}};function ro(t){return t.slots?t.slots.length:t.max}const so={heat_pump:["temperature","value"],boiler:["temperature","electric_heater"],buffer_tank:["temperature","electric_heater"],manifold:["loop"]},ao={electric_heater:Re,defrost:"#4fc3f7",alarm:"var(--error-color, #db4437)",window:"var(--warning-color, #ffa600)"};function lo(t,e){const o=so[t]??[];return e.filter(t=>t.config.entity_id&&!no[t.config.type].entityless&&!o.includes(t.config.type))}function co(t){const{state:e}=t;switch(no[t.config.type].display){case"binary":return;case"position":return void 0!==e.position?`${Math.round(e.position)} %`:e.value??"—";default:return e.value??"—"}}function po(t,e){const o=[];let i=0,n=0;for(const r of t){const t=co(r),s=16+(t?6.5*t.length+6:2);i>0&&i+s>e&&(i=0,n+=22),o.push({addon:r,text:t,x:i,y:n,width:s}),i+=s+4}return{boxes:o,height:o.length?n+18:0}}function ho(t,e,o,i,n){const{boxes:r}=po(t,n);return Z`
    <g class="addon-badges" transform="translate(${o} ${i})">
      ${r.map(({addon:t,text:o,x:i,y:n,width:r})=>{const s=function(t){const{type:e}=t.config,o=no[e].display;return"temperature"===e?Ze(t.state.numeric):"value"===o||"text"===o?Be:t.state.active||"position"===o&&(t.state.position??0)>0?ao[e]??De:Ue}(t),a=n+9,d="pump"===t.config.type||"alarm"===t.config.type;return Z`
          <g class="addon-badge addon-${t.config.type} ${t.state.active?"active":""}">
            <title>${function(t,e){if(t.config.name)return t.config.name;const o=e.t(`addons.${t.config.type}.name`);return t.config.slot?`${o} – ${e.t(`slots.${t.config.slot}`)}`:o}(t,e)}: ${t.state.value??"—"}</title>
            <rect x="${i}" y="${n}" width="${r}" height="${18}" rx="${9}"
              fill="${Ve}" stroke="${s}" stroke-width="1" />
            <path d="${function(t,e,o){switch(t){case"temperature":return`M ${e-1.5} ${o+1} V ${o-5} A 1.5 1.5 0 0 1 ${e+1.5} ${o-5} V ${o+1} M ${e-3} ${o+3} A 3 3 0 1 0 ${e+3} ${o+3} A 3 3 0 1 0 ${e-3} ${o+3}`;case"setpoint":return`M ${e-5} ${o} A 5 5 0 1 0 ${e+5} ${o} A 5 5 0 1 0 ${e-5} ${o} M ${e-1.5} ${o} A 1.5 1.5 0 1 0 ${e+1.5} ${o} A 1.5 1.5 0 1 0 ${e-1.5} ${o}`;case"pump":return`M ${e-5} ${o} A 5 5 0 1 0 ${e+5} ${o} A 5 5 0 1 0 ${e-5} ${o} M ${e-2} ${o-3} L ${e+3} ${o} L ${e-2} ${o+3} Z`;case"fan":return`M ${e} ${o} L ${e} ${o-5} M ${e} ${o} L ${e+4.3} ${o+2.5} M ${e} ${o} L ${e-4.3} ${o+2.5}`;case"electric_heater":return`M ${e-5} ${o+2} L ${e-3} ${o-3} L ${e-1} ${o+2} L ${e+1} ${o-3} L ${e+3} ${o+2} L ${e+5} ${o-3}`;case"defrost":return`M ${e} ${o-5} V ${o+5} M ${e-4.3} ${o-2.5} L ${e+4.3} ${o+2.5} M ${e-4.3} ${o+2.5} L ${e+4.3} ${o-2.5}`;case"alarm":return`M ${e} ${o-5} L ${e+5} ${o+4} L ${e-5} ${o+4} Z M ${e} ${o-1.5} V ${o+1.5}`;case"window":return`M ${e-4} ${o-4} H ${e+4} V ${o+4} H ${e-4} Z M ${e} ${o-4} V ${o+4} M ${e-4} ${o} H ${e+4}`;case"actuator":return`M ${e-4} ${o+4} H ${e+4} M ${e} ${o+4} V ${o-2} M ${e-3} ${o-2} H ${e+3} V ${o-5} H ${e-3} Z`;case"mode":return`M ${e-5} ${o-3} H ${e+5} M ${e-5} ${o} H ${e+5} M ${e-5} ${o+3} H ${e+5}`;case"loop":return`M ${e-5} ${o-3} V ${o+3} H ${e+5} V ${o-3}`;default:return`M ${e-2.5} ${o} A 2.5 2.5 0 1 0 ${e+2.5} ${o} A 2.5 2.5 0 1 0 ${e-2.5} ${o} Z`}}(t.config.type,i+9,a)}" fill="${d&&t.state.active?s:"none"}"
              stroke="${s}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
            ${o?Z`<text x="${i+16}" y="${a+4}" class="device-value addon-value">${o}</text>`:Z``}
          </g>
        `})}
    </g>
  `}const uo=10,yo={ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0},ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1}};let vo=class extends lt{constructor(){super(...arguments),this.schema={nodes:[],connections:[],overlays:[]},this.editable=!1,this.drawing=!1,this.pipeStyle="orthogonal",this._states=new $e(this,ve),this._formatters=new $e(this,_e),this._i18n=new $e(this,me)}updated(t){t.has("editable")&&this.toggleAttribute("editable",this.editable),(t.has("drawing")||t.has("editable"))&&this.toggleAttribute("drawing",this.editable&&this.drawing)}render(){const t=this._translator(),{nodes:e,connections:o,overlays:i}=this.schema,n=this._dragBounds??this._computeBounds(e);return B`
      <svg
        viewBox="${n.x} ${n.y} ${n.width} ${n.height}"
        tabindex="${this.editable?"0":F}"
        @keydown="${this._onKeyDown}"
        @pointerdown="${this._onCanvasPointerDown}"
        @pointermove="${this._onCanvasPointerMove}"
        @pointerup="${this._onCanvasPointerUp}"
        @pointerleave="${this._onCanvasPointerUp}"
      >
        ${this.editable&&this.drawing?Z`
            <defs>
              <pattern id="grid" width="${20}" height="${20}" patternUnits="userSpaceOnUse">
                <circle class="grid-dot" cx="0" cy="0" r="1" />
              </pattern>
            </defs>
            <rect x="${n.x}" y="${n.y}" width="${n.width}" height="${n.height}" fill="url(#grid)" />
          `:F}
        ${o.map(t=>this._renderConnection(t))}
        ${e.map(e=>this._renderNode(e,t))}
        ${i.map(t=>this._renderOverlay(t))}
      </svg>
    `}_translator(){return ye(this._i18n.value?.language)}_computeBounds(t){if(!t.length)return{x:0,y:0,width:800,height:400};let e=1/0,o=1/0,i=-1/0,n=-1/0;for(const r of t){const t=ne(r);if(!t)continue;const s=ke(r,t),a=po(lo(r.type,this._resolveAddons(r)),this._badgeWidth(s));e=Math.min(e,s.x),o=Math.min(o,s.y-20),i=Math.max(i,s.x+Math.max(s.width,a.height?this._badgeWidth(s):0)),n=Math.max(n,s.y+s.height+10+(a.height?a.height+6:0))}return{x:e-40,y:o-40,width:i-e+80,height:n-o+80}}_renderConnection(t){const e=mt(t.from),o=mt(t.to),i=this.schema.nodes.find(t=>t.id===e?.nodeId),n=this.schema.nodes.find(t=>t.id===o?.nodeId);if(!(e&&o&&i&&n))return B``;const r=xe(i,e.portId),s=xe(n,o.portId);if(!r||!s)return B``;const a="curved"===this.pipeStyle?function(t,e){const o=Math.hypot(e.x-t.x,e.y-t.y),i=Math.max(30,o/2),n=t.x+t.direction.x*i,r=t.y+t.direction.y*i,s=e.x+e.direction.x*i,a=e.y+e.direction.y*i;return`M ${t.x} ${t.y} C ${n} ${r}, ${s} ${a}, ${e.x} ${e.y}`}(r,s):Se(r,s),d=$t(t),l=this.selectedEdgeId===d;return Z`
      <path class="pipe ${l?"selected":""}" d="${a}" />
      ${this.editable?Z`<path class="pipe-hit" data-edge-id="${d}" d="${a}" />`:F}
    `}_resolveAddons(t){const e=this._states.value,o=this._formatters.value;return(t.addons??[]).map(t=>({config:t,state:{...Le(e,t,o),label:t.name}}))}_badgeWidth(t){return Math.max(t.width,120)}_renderNode(t,e){const o=ne(t);if(!o)return B``;const i=this.selectedNodeId===t.id,n=Le(this._states.value,t,this._formatters.value),r=this._resolveAddons(t),s=io(t.type,o,e,i,n,{addons:r});if(!s)return B``;const a=fe(t.rotation),d=ke(t,o),l=d.y-t.position.y-4,c=lo(t.type,r);return Z`
      <g
        class="node ${this._dragNodeId===t.id?"dragging":""}"
        data-node-id="${t.id}"
        transform="translate(${t.position.x} ${t.position.y})"
      >
        <g transform="rotate(${a} ${o.width/2} ${o.height/2})">
          ${s}
        </g>
        <text x="${o.width/2}" y="${l}" text-anchor="middle" class="device-label">
          ${t.name||e.t(o.labelKey)}
        </text>
        ${c.length?ho(c,e,d.x-t.position.x,d.y-t.position.y+d.height+6,this._badgeWidth(d)):F}
      </g>
    `}_renderOverlay(t){const e=this._states.value,o=this._formatters.value,i=Ee(e,o,t),n=function(t,e){let o,i,n=!0;if(!t||!e.rules?.length)return{color:o,className:i,visible:n};for(const r of e.rules)Ie(t,r,e.entity_id)&&(r.effect.color&&(o=Pe(r.effect.color)),r.effect.class&&(i=r.effect.class),void 0!==r.effect.visible&&(n=r.effect.visible));return{color:o,className:i,visible:n}}(e,t);if(!n.visible)return B``;const r=function(t,e,o){const i=t?.[o.entity_id];return i&&e?e.formatEntityName(i,o.name):"string"==typeof o.name?o.name:o.entity_id}(e,o,t),s=`${r}: ${i}`,a=Math.max(80,7*s.length+16);return Z`
      <g class="overlay-group ${n.className??""}" transform="translate(${t.position.x} ${t.position.y})">
        <rect class="overlay-bg" x="0" y="0" width="${a}" height="22" rx="4" />
        <text class="overlay-text" x="8" y="15" style="${n.color?`fill: ${n.color}`:""}">
          ${s}
        </text>
      </g>
    `}_onCanvasPointerDown(t){if(!this.editable)return;const e=t.target,o=e?.getAttribute?.("data-edge-id");if(o)return void this.dispatchEvent(new CustomEvent("edge-select",{detail:{edgeId:o},bubbles:!0,composed:!0}));const i=e?.closest?.("[data-node-id]");if(!i)return void this._dispatchSelect(void 0);const n=i.getAttribute("data-node-id");if(!n)return;const r=this.schema.nodes.find(t=>t.id===n);if(!r)return;const s=e?.closest?.("[data-port-id]");if(s&&this.drawing){const e=s.getAttribute("data-port-id");if(e)return this._dispatchPortClick(n,e),void t.stopPropagation()}if(!this.drawing)return void this._dispatchSelect(n);this._dragNodeId=n;const a=this._toLocal(t);this._dragOffset=a?{x:a.x-r.position.x,y:a.y-r.position.y}:{x:0,y:0},this._dragBounds=this._computeBounds(this.schema.nodes),i.setPointerCapture(t.pointerId),this._dispatchSelect(n),t.preventDefault()}_onKeyDown(t){const e=yo[t.key],o=this.schema.nodes.find(t=>t.id===this.selectedNodeId);if(!this.editable||!e||!o)return;t.preventDefault();const i=t.shiftKey?50:10;this.dispatchEvent(new CustomEvent("node-move",{detail:{nodeId:o.id,position:{x:Me(o.position.x+e.x*i,uo),y:Me(o.position.y+e.y*i,uo)}},bubbles:!0,composed:!0}))}_toLocal(t){const e=this.renderRoot.querySelector("svg"),o=e?.getScreenCTM();if(!e||!o)return;const i=e.createSVGPoint();return i.x=t.clientX,i.y=t.clientY,i.matrixTransform(o.inverse())}_onCanvasPointerMove(t){if(!this.editable||!this._dragNodeId)return;const e=this.schema.nodes.find(t=>t.id===this._dragNodeId),o=this._toLocal(t);if(!e||!o)return;const i=this._dragOffset??{x:0,y:0},n={x:Me(o.x-i.x,uo),y:Me(o.y-i.y,uo)};n.x===e.position.x&&n.y===e.position.y||this.dispatchEvent(new CustomEvent("node-move",{detail:{nodeId:e.id,position:n},bubbles:!0,composed:!0}))}_onCanvasPointerUp(t){if(this._dragNodeId){const e=this.renderRoot.querySelector(`[data-node-id="${this._dragNodeId}"]`);e?.releasePointerCapture(t.pointerId),this._dragNodeId=void 0,this._dragOffset=void 0,this._dragBounds=void 0,this.requestUpdate()}}_dispatchSelect(t){this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:t},bubbles:!0,composed:!0}))}_dispatchPortClick(t,e){this.dispatchEvent(new CustomEvent("port-click",{detail:{nodeId:t,portId:e},bubbles:!0,composed:!0}))}};function _o(t,e){const o=t.nodes.find(t=>t.id===e.nodeId);return o?ne(o)?.ports.find(t=>t.id===e.portId):void 0}function mo(t,e,o){if(e.nodeId===o.nodeId&&e.portId===o.portId)return;const i=_o(t,e),n=_o(t,o);return i&&n&&i.kind!==n.kind?"outlet"===i.kind?{from:_t(e),to:_t(o)}:{from:_t(o),to:_t(e)}:void 0}function $o(t,e){return t.connections.some(t=>t.from===e.from&&t.to===e.to)}function fo(t,e){const o=_t(e);return t.connections.filter(t=>t.from===o||t.to===o)}vo.styles=s`
    :host {
      display: block;
      width: 100%;
      overflow: auto;
    }
    svg {
      width: 100%;
      min-height: 280px;
      background: var(--ha-card-background, var(--card-background-color, #1c1c1c));
      border-radius: var(--ha-card-border-radius, 12px);
      user-select: none;
    }
    .pipe {
      fill: none;
      stroke: #78909c;
      stroke-width: 4;
      stroke-linecap: round;
    }
    .pipe.selected {
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 6;
    }
    .pipe-hit {
      fill: none;
      stroke: transparent;
      stroke-width: 16;
      pointer-events: stroke;
      cursor: pointer;
    }
    .grid-dot {
      fill: var(--divider-color, #555);
    }
    .spinning {
      transform-box: fill-box;
      transform-origin: center;
      animation: spin 1.6s linear infinite;
    }
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .spinning {
        animation: none;
      }
    }
    .device-label {
      fill: var(--primary-text-color, #e0e0e0);
      font-size: var(--ha-font-size-xs, 11px);
      pointer-events: none;
    }
    .device-value {
      fill: var(--primary-text-color, #e0e0e0);
      font-size: var(--ha-font-size-s, 12px);
      font-weight: var(--ha-font-weight-medium, 500);
      pointer-events: none;
    }
    .node {
      cursor: default;
    }
    :host([editable]) .node {
      cursor: pointer;
    }
    :host([drawing]) .node {
      cursor: grab;
    }
    :host([drawing]) .node.dragging {
      cursor: grabbing;
    }
    :host([drawing]) svg {
      touch-action: none;
    }
    svg:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 2px;
    }
    .overlay-group {
      pointer-events: none;
    }
    .addon-value {
      font-size: var(--ha-font-size-xs, 11px);
    }
    .overlay-bg {
      fill: var(--card-background-color, #1c1c1c);
      stroke: var(--divider-color, #555);
      stroke-width: 1;
      opacity: 0.92;
    }
    .overlay-text {
      fill: var(--primary-text-color, #e0e0e0);
      font-size: var(--ha-font-size-s, 12px);
    }
    .port-highlight {
      stroke: var(--primary-color, #03a9f4) !important;
      stroke-width: 3 !important;
    }
  `,t([yt({attribute:!1})],vo.prototype,"schema",void 0),t([yt({type:Boolean})],vo.prototype,"editable",void 0),t([yt({type:Boolean})],vo.prototype,"drawing",void 0),t([yt({attribute:!1})],vo.prototype,"pipeStyle",void 0),t([yt({attribute:!1})],vo.prototype,"selectedNodeId",void 0),t([yt({attribute:!1})],vo.prototype,"selectedEdgeId",void 0),t([yt({attribute:!1})],vo.prototype,"selectedPort",void 0),vo=t([pt("heating-schema-canvas")],vo);const go=/^loop_(\d+)_(in|out)$/;function bo(t){const e="string"==typeof t.attributes.friendly_name?t.attributes.friendly_name:"";return` ${`${t.entity_id} ${e}`.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ")} `}const xo=(t,e)=>new RegExp(` (?:${e})`).test(t);function ko(t){return t.entity_id.split(".",1)[0]}function wo(t){const e=t.attributes.device_class;return"string"==typeof e?e:void 0}const Ao=[["heat ?pump|heatpump|tepeln\\w* cerpadl|tc ","heat_pump"],["buffer|akumul|nadrz","buffer_tank"],["boiler|dhw|hot ?water|tuv|bojler|zasobnik","boiler"],["kotel|furnace|gas ","heating_boiler"],["solar|kolektor","solar_collector"],["manifold|rozdelovac","manifold"],["floor|podlah","floor_heating"],["fan ?coil|fancoil|konvektor","fancoil"],["radiator|trv|hlavic","radiator"],["mixing|smesov","mixing_valve"],["3 ?way|diverter|trojcest|tricest|prepinac","valve_3way"],["pump|cerpadl","circulation_pump"],["outdoor|outside|venkov","outdoor_temperature"]],So=new Set(["temperature","pressure","volume_flow_rate","energy","power"]);function Mo(t){const e=bo(t),o=ko(t),i=wo(t);return"problem"===i||xo(e,"alarm|fault|error|porucha|chyba")?"alarm":"window"===i||"opening"===i||xo(e,"window|okno")?"window":xo(e,"defrost|odmraz|odtav")?"defrost":xo(e,"heater|heating element|backup|booster|spiral|topn\\w* tyc|bivalen")?"electric_heater":xo(e,"pump|cerpadl")?"pump":"fan"===o||xo(e,"fan|ventilator")?"fan":"select"===o||"input_select"===o||"enum"===i||xo(e,"mode|rezim")?"mode":"number"===o||"input_number"===o||xo(e,"setpoint|target|pozadovan|zadan")?"setpoint":"valve"===o||xo(e,"actuator|pohon|valve|ventil")?"actuator":"temperature"===i?"temperature":"sensor"===o&&Number.isFinite(Number(t.state))?"value":void 0}const Eo={top:"top|nahore|horni",upper:"upper",middle:"middle|mid|stred|uprostred",lower:"lower",bottom:"bottom|dole|spodni|dolni",supply:"supply|flow|outlet|leaving|vystup|privod|topna voda",return:"return|inlet|entering|vratk|zpatec|vstup",outdoor:"outdoor|outside|ambient|venkov",evaporator:"evaporator|vyparnik",room:"room|indoor|inside|mistnost|pokoj|vnitrni",floor:"floor|podlah",mixed:"mixed|smis",inlet:"inlet|vstup",outlet:"outlet|vystup",collector:"collector|panel|kolektor"};function Co(t,e,o){const i=bo(t),n=e.filter(t=>!o.has(t));return n.find(t=>Eo[t]&&xo(i,Eo[t]))??n[0]}const Po=()=>Array.from({length:4},()=>({type:"loop"})),Io=[{id:"heat_pump_floor",nodes:[{id:"hp",type:"heat_pump",x:0,y:20},{id:"pump",type:"circulation_pump",x:240,y:15},{id:"manifold",type:"manifold",x:400,y:30,addons:Po()}],connections:[["hp.hot_out","pump.in"],["pump.out","manifold.supply_in"],["manifold.return_out","hp.cold_in"]]},{id:"heat_pump_dhw_floor",nodes:[{id:"hp",type:"heat_pump",x:0,y:140},{id:"valve",type:"valve_3way",x:240,y:130},{id:"dhw",type:"boiler",x:420,y:0},{id:"pump",type:"circulation_pump",x:420,y:220},{id:"manifold",type:"manifold",x:580,y:220,addons:Po()}],connections:[["hp.hot_out","valve.in"],["valve.out_a","dhw.coil_in"],["dhw.coil_out","hp.cold_in"],["valve.out_b","pump.in"],["pump.out","manifold.supply_in"],["manifold.return_out","hp.cold_in"]]},{id:"heat_pump_buffer_radiators",nodes:[{id:"hp",type:"heat_pump",x:0,y:40},{id:"buffer",type:"buffer_tank",x:260,y:0},{id:"pump",type:"circulation_pump",x:440,y:0},{id:"radiator",type:"radiator",x:600,y:20}],connections:[["hp.hot_out","buffer.source_in"],["buffer.source_out","hp.cold_in"],["buffer.supply_out","pump.in"],["pump.out","radiator.in"],["radiator.out","buffer.return_in"]]},{id:"boiler_radiators",nodes:[{id:"boiler",type:"heating_boiler",x:0,y:0},{id:"pump",type:"circulation_pump",x:180,y:0},{id:"radiator",type:"radiator",x:340,y:10}],connections:[["boiler.supply_out","pump.in"],["pump.out","radiator.in"],["radiator.out","boiler.return_in"]]}];function zo(t,e,o){const i=new Set(e.nodes.map(t=>t.id)),n=new Map;for(const e of t.nodes){let t=o(e.id);for(;i.has(t);)t=o(e.id);i.add(t),n.set(e.id,t)}const r=function(t){return t.reduce((t,e)=>{const o=ne(e)?.height??0;return Math.max(t,e.position.y+o+60)},0)}(e.nodes),s=t.nodes.map(t=>({id:n.get(t.id)??t.id,type:t.type,position:{x:40+t.x,y:40+r+t.y},addons:t.addons?.map(t=>({...t}))})),a=t=>{const e=t.indexOf(".");return`${n.get(t.slice(0,e))??t.slice(0,e)}${t.slice(e)}`};return{nodes:s,connections:t.connections.map(([t,e])=>({from:a(t),to:a(e)}))}}const Lo=new Set(["heat_pump","heating_boiler","solar_collector"]);function No(t){const e=function(t){const e=new Map(t.nodes.map(t=>[t.id,t])),o=[];for(const i of t.connections){const t=mt(i.from),n=mt(i.to),r=t&&e.get(t.nodeId);if(!(t&&n&&r&&e.has(n.nodeId)&&t.nodeId!==n.nodeId))continue;const s=ne(r)?.ports.find(e=>e.id===t.portId);o.push({from:t.nodeId,to:n.nodeId,order:s?.position.y??0})}return o}(t),o=new Map,i=new Set(e.map(t=>t.to)),n=new Set(e.flatMap(t=>[t.from,t.to]));for(const t of e)o.set(t.from,[...o.get(t.from)??[],t]);for(const t of o.values())t.sort((t,e)=>t.order-e.order);const r=new Map,s=t=>{let e=[t];for(r.set(t,0);e.length;){const t=[];for(const i of e)for(const e of o.get(i)??[])r.has(e.to)||(r.set(e.to,(r.get(i)??0)+1),t.push(e.to));e=t}},a=t.nodes.filter(t=>n.has(t.id)),d=[...a.filter(t=>Lo.has(t.type)),...a.filter(t=>!i.has(t.id)),...a];for(const t of d)r.has(t.id)||s(t.id);const l=[];for(const[t,e]of r)l[e]=[...l[e]??[],t];return{columns:l.filter(t=>t.length),unconnected:t.nodes.filter(t=>!n.has(t.id)).map(t=>t.id)}}function Oo(t,e,o){const i=ne(t);if(!i)return t;const n=ke({...t,position:{x:0,y:0}},i);return{...t,position:{x:Me(e-n.x,10),y:Me(o-n.y,10)}}}function Ho(t){const e=ne(t);return e?ke(t,e):{width:0,height:0}}const To=new Set(["friendly_name","icon","entity_picture","supported_features","device_class","unit_of_measurement","state_class","attribution","assumed_state","restored","editable","id"]),jo=["on","off","heat","heating","open","idle"],Ko=["options","hvac_modes","operation_list","preset_modes","fan_modes"];function Do(t){const e=t.attributes.friendly_name;return"string"==typeof e&&e?e:t.entity_id}function Ro(t,e){return e?t.entities?.[e]?.device_id??void 0:void 0}function Vo(t,e={}){if(!t)return[];const o=Ro(t,e.relatedTo),i=Object.values(t.states).map(i=>{const n=i.entity_id.split(".",1)[0],r=i.attributes.device_class;let s=0;return o&&Ro(t,i.entity_id)===o&&(s+=4),e.domains?.includes(n)&&(s+=2),"string"==typeof r&&e.deviceClasses?.includes(r)&&(s+=1),{entity:i,score:s,name:Do(i)}});return i.sort((t,e)=>e.score-t.score||t.name.localeCompare(e.name)),i.slice(0,300).map(({entity:t,name:e})=>({value:t.entity_id,label:e}))}function Uo(t,e){const o=e?t?.states[e]:void 0;return o?Object.keys(o.attributes).filter(t=>!To.has(t)).sort().map(t=>({value:t,label:String(o.attributes[t])})):[]}function Bo(t,e,o){const i=e?t?.states[e]:void 0,n=new Set;if(i){const t=o?i.attributes[o]:i.state;if(null!=t&&n.add(String(t)),!o){for(const t of Ko){const e=i.attributes[t];Array.isArray(e)&&e.forEach(t=>n.add(String(t)))}const t=i.attributes.hvac_action;"string"==typeof t&&n.add(t)}}return jo.forEach(t=>n.add(t)),[...n].map(t=>({value:t}))}function Zo(t,e){const o=t?Ro(t,e):void 0,i=o?t?.devices?.[o]:void 0;return i?.name_by_user||i?.name||void 0}function Wo(t,e){const o=e?t?.states[e]:void 0;if(!o||!t)return;const i="function"==typeof t.formatEntityState?t.formatEntityState(o):o.state;return`${Do(o)} · ${i}`}let Fo=0,qo=class extends lt{constructor(){super(...arguments),this.kind="text",this.label="",this.options=[],this._listId="hv-list-"+ ++Fo,this._inputId=`hv-input-${Fo}`}render(){if("boolean"===this.kind)return B`
        <label class="check">
          <input type="checkbox" .checked="${Boolean(this.value)}" @change="${this._onCheck}" />
          ${this.label}
        </label>
        ${this._renderHelper()}
      `;if("select"===this.kind){const t=void 0===this.value?"":String(this.value);return B`
        <label for="${this._inputId}">${this.label}</label>
        <select id="${this._inputId}" @change="${this._onInput}">
          ${this.options.map(e=>B`<option value="${e.value}" ?selected="${e.value===t}">${e.label??e.value}</option>`)}
        </select>
        ${this._renderHelper()}
      `}return B`
      <label for="${this._inputId}">${this.label}</label>
      <input
        id="${this._inputId}"
        type="${"number"===this.kind?"number":"text"}"
        step="any"
        autocomplete="off"
        placeholder="${this.placeholder??""}"
        list="${"combo"===this.kind?this._listId:""}"
        .value="${void 0===this.value?"":String(this.value)}"
        @change="${this._onInput}"
      />
      ${"combo"===this.kind?B`<datalist id="${this._listId}">
            ${this.options.map(t=>B`<option value="${t.value}">${t.label??""}</option>`)}
          </datalist>`:F}
      ${this._renderHelper()}
    `}_renderHelper(){return this.helper?B`<div class="helper">${this.helper}</div>`:F}_onCheck(t){this._emit(t.target.checked)}_onInput(t){const e=t.target.value.trim();"number"===this.kind?this._emit(""===e?void 0:Number(e)):this._emit(""===e?void 0:e)}_emit(t){this.dispatchEvent(new CustomEvent("hv-change",{detail:{value:t}}))}};qo.styles=s`
    :host {
      display: block;
      margin-bottom: 10px;
    }
    label {
      display: block;
      margin-bottom: 4px;
      font-size: var(--ha-font-size-s, 12px);
      color: var(--secondary-text-color);
    }
    input:not([type="checkbox"]),
    select {
      box-sizing: border-box;
      width: 100%;
      min-height: 40px;
      padding: 8px 10px;
      font: inherit;
      color: var(--primary-text-color);
      background: var(--ha-color-form-background, var(--secondary-background-color));
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
    }
    input:focus-visible,
    select:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -1px;
    }
    .check {
      display: flex;
      gap: 8px;
      align-items: center;
      font-size: inherit;
      color: var(--primary-text-color);
    }
    .check input {
      width: 18px;
      height: 18px;
      accent-color: var(--primary-color);
    }
    .helper {
      margin-top: 3px;
      font-size: var(--ha-font-size-s, 12px);
      color: var(--secondary-text-color);
    }
  `,t([yt()],qo.prototype,"kind",void 0),t([yt()],qo.prototype,"label",void 0),t([yt()],qo.prototype,"helper",void 0),t([yt()],qo.prototype,"placeholder",void 0),t([yt({attribute:!1})],qo.prototype,"value",void 0),t([yt({attribute:!1})],qo.prototype,"options",void 0),qo=t([pt("hv-field")],qo);const Jo={key:"entity_id",label:"editor.entity"},Yo={key:"active_state",label:"editor.active_state",helper:"editor.active_state_helper"},Go={key:"value_attribute",label:"editor.value_attribute",helper:"editor.value_attribute_helper"},Xo={key:"mode_attribute",label:"editor.position_attribute",helper:"editor.position_attribute_helper"};const Qo=4,ti=200,ei=180,oi=40,ii=40,ni=["orthogonal","curved"],ri=["climate","water_heater","valve","fan","switch","sensor","binary_sensor"],si=["primary","accent","red","pink","purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","grey","blue-grey"],ai=t=>"string"==typeof t.detail.value?t.detail.value:void 0,di=t=>"number"==typeof t.detail.value&&Number.isFinite(t.detail.value)?t.detail.value:void 0;let li=class extends lt{constructor(){super(...arguments),this._tab="schema",this._view={kind:"list"},this._newDeviceType=jt.type,this._templateId=Io[0].id,this._drawing=!1}set hass(t){this._hass=t}get hass(){return this._hass}setConfig(t){this._config=le(t)}render(){if(!this._config)return B``;const t=ye(this._hass?.language),e=gt(this._config);return B`
      <div class="editor">
        <div class="tabs" role="tablist">
          ${this._renderTab(t,"schema","editor.schema_tab")}
          ${this._renderTab(t,"overlays","editor.overlay_tab")}
        </div>
        ${"schema"===this._tab?this._renderSchemaTab(t,e):this._renderOverlaysTab(t,e)}
      </div>
    `}_renderTab(t,e,o){return B`
      <button
        type="button"
        role="tab"
        aria-selected="${this._tab===e}"
        @click="${()=>{this._tab=e}}"
      >${t.t(o)}</button>
    `}_renderSchemaTab(t,e){const o=this._view,i="list"===o.kind?void 0:e.nodes.find(t=>t.id===o.nodeId);if(i&&"addon"===o.kind){const n=i.addons?.[o.index];if(n)return this._renderAddonView(t,e,i,n,o.index)}return i?this._renderNodeView(t,e,i):this._renderListView(t,e)}_renderCanvas(t,e){return B`
      <div class="toolbar">
        <button
          type="button"
          class="${this._drawing?"primary":""}"
          aria-pressed="${this._drawing}"
          @click="${this._toggleDrawing}"
        >✎ ${t.t("editor.drawing_mode")}</button>
        <span class="hint" style="flex: 1">
          ${t.t(this._drawing?"editor.drawing_hint":"editor.select_hint")}
        </span>
      </div>
      <heating-schema-canvas
        .schema="${e}"
        .editable="${!0}"
        .drawing="${this._drawing}"
        .pipeStyle="${this._pipeStyle()}"
        .selectedNodeId="${this._selectedNodeId}"
        .selectedEdgeId="${this._selectedEdgeId}"
        .selectedPort="${this._pendingPort}"
        @node-select="${this._onNodeSelect}"
        @edge-select="${this._onEdgeSelect}"
        @node-move="${this._onNodeMove}"
        @port-click="${this._onPortClick}"
      ></heating-schema-canvas>
      ${this._pendingPort?B`<p class="notice" role="status">
            ${t.t("editor.connection_pending",this._portRefLabel(t,e,this._pendingPort))}
          </p>`:F}
      ${this._selectedEdgeId?B`<div class="toolbar">
            <button type="button" class="danger" @click="${this._deleteSelectedConnection}">
              ${t.t("editor.delete_connection")}
            </button>
          </div>`:F}
    `}_renderListView(t,e){const o=function(t){return t.connections.filter(e=>{const o=mt(e.from),i=mt(e.to);return!o||!i||"outlet"!==_o(t,o)?.kind||"inlet"!==_o(t,i)?.kind})}(e);return B`
      <div class="toolbar">
        <select
          aria-label="${t.t("editor.device_type")}"
          @change="${t=>{this._newDeviceType=t.target.value}}"
        >
          ${ee.map(e=>B`<option value="${e}" ?selected="${e===this._newDeviceType}">
              ${t.t(`devices.${e}.name`)}
            </option>`)}
        </select>
        <button type="button" class="primary" @click="${()=>this._addDevice(this._newDeviceType)}">
          ${t.t("editor.add_device")}
        </button>
      </div>
      <div class="toolbar">
        <select
          aria-label="${t.t("editor.template")}"
          @change="${t=>{this._templateId=t.target.value}}"
        >
          ${Io.map(e=>B`<option value="${e.id}" ?selected="${e.id===this._templateId}">
              ${t.t(`templates.${e.id}`)}
            </option>`)}
        </select>
        <button type="button" @click="${this._insertTemplate}">${t.t("editor.insert_template")}</button>
      </div>
      ${e.nodes.length>1?B`<div class="toolbar">
            <button type="button" @click="${this._autoLayout}">${t.t("editor.auto_layout")}</button>
            ${this._layoutUndo?B`<button type="button" @click="${this._undoLayout}">${t.t("editor.undo_layout")}</button>`:F}
            <select
              aria-label="${t.t("editor.pipe_style")}"
              @change="${t=>this._setPipeStyle(t.target.value)}"
            >
              ${ni.map(e=>B`<option value="${e}" ?selected="${e===this._pipeStyle()}">
                  ${t.t(`editor.pipe_style_${e}`)}
                </option>`)}
            </select>
          </div>`:F}
      ${this._renderAddFromEntity(t)}

      ${this._renderCanvas(t,e)}

      ${o.length?B`<p class="warning" role="alert">
            ${t.t("editor.invalid_connections",String(o.length))}
            <button type="button" @click="${()=>this._removeConnections(o)}">
              ${t.t("editor.remove_invalid")}
            </button>
          </p>`:F}

      ${e.nodes.length?B`
            <h3>${t.t("editor.devices_title")}</h3>
            <ul class="list">
              ${e.nodes.map(o=>this._renderNodeRow(t,e,o))}
            </ul>
          `:B`<p class="hint">${t.t("editor.empty_hint")}</p>`}
    `}_renderAddFromEntity(t){const e=this._hass;if(!e)return F;const o=this._entityToAdd?e.states[this._entityToAdd]:void 0,i=this._entityDeviceType??(o?function(t){const e=bo(t),o=ko(t),i=Ao.find(([t])=>xo(e,t))?.[1];return i||("water_heater"===o?"boiler":"climate"===o?"radiator":"valve"===o?"zone_valve":"fan"===o?"fancoil":"sensor"===o&&So.has(wo(t)??"")?"pipe_sensor":void 0)}(o):void 0);return B`
      <section class="card">
        <hv-field
          kind="combo"
          .label="${t.t("editor.add_from_entity")}"
          .helper="${Wo(e,this._entityToAdd)??t.t("editor.add_from_entity_helper")}"
          .options="${Vo(e,{domains:ri})}"
          .value="${this._entityToAdd}"
          @hv-change="${t=>{this._entityToAdd=ai(t),this._entityDeviceType=void 0}}"
        ></hv-field>
        ${o?B`<div class="toolbar">
              <select
                aria-label="${t.t("editor.device_type")}"
                @change="${t=>{this._entityDeviceType=t.target.value||void 0}}"
              >
                ${i?F:B`<option value="" selected>${t.t("editor.choose_type")}</option>`}
                ${ee.map(e=>B`<option value="${e}" ?selected="${e===i}">
                    ${t.t(`devices.${e}.name`)}
                  </option>`)}
              </select>
              <button
                type="button"
                class="primary"
                ?disabled="${!i}"
                @click="${()=>{i&&this._addDevice(i,o.entity_id)}}"
              >${t.t("editor.add_device")}</button>
            </div>`:F}
      </section>
    `}_renderNodeRow(t,e,o){const[i,n]=function(t,e){const o=ne(e)?.ports??[],i=o.filter(o=>fo(t,{nodeId:e.id,portId:o.id}).length).length;return[i,o.length]}(e,o),r=[o.entity_id?Wo(this._hass,o.entity_id)??o.entity_id:t.t("editor.no_entity")];return n&&r.push(t.t("editor.ports_connected",String(i),String(n))),o.addons?.length&&r.push(t.t("editor.addon_count",String(o.addons.length))),B`
      <li>
        <button
          type="button"
          class="row ${o.id===this._selectedNodeId?"selected":""}"
          @click="${()=>this._openNode(o.id)}"
        >
          <span class="row-main">
            <span>${this._nodeName(t,o)}</span>
            <span class="row-sub">${r.join(" · ")}</span>
          </span>
          <span aria-hidden="true">›</span>
        </button>
      </li>
    `}_renderHeader(t,e,o){return B`
      <div class="header">
        <button type="button" class="icon" aria-label="${t.t("editor.back")}" @click="${o}">‹</button>
        <h3>${e}</h3>
      </div>
    `}_renderNodeView(t,e,o){const i=o;return B`
      ${this._renderHeader(t,this._nodeName(t,o),()=>this._openList())}
      ${this._renderCanvas(t,e)}

      <section class="card">
        <hv-field
          .label="${t.t("editor.name")}"
          .helper="${t.t("editor.name_helper")}"
          .placeholder="${t.t(`devices.${o.type}.name`)}"
          .value="${o.name}"
          @hv-change="${t=>this._patchNode(o.id,{name:ai(t)})}"
        ></hv-field>
        ${this._renderBinding(t,i,function(t){const e=ie(t)?.valueDisplay;return"only"===e?[Jo,Go]:"with_state"===e?[Jo,Yo,Go]:"mixing_valve"===t?[{...Jo,label:"editor.actuator_entity"},Xo]:"valve_3way"===t?[Jo,Yo,{key:"mode_attribute",label:"editor.valve_attribute",helper:"editor.valve_attribute_helper"},{key:"branch_a_value",label:"editor.branch_a",helper:"editor.branch_a_helper"},{key:"branch_b_value",label:"editor.branch_b",helper:"editor.branch_b_helper"}]:[Jo,Yo]}(o.type),{},t=>this._patchNode(o.id,t))}
      </section>

      ${this._renderAddons(t,o)}
      ${this._renderSuggestions(t,o)}
      ${this._renderConnections(t,e,o)}

      <section class="card">
        <h3>${t.t("editor.position_title")}</h3>
        <div class="grid2">
          <hv-field
            kind="number"
            label="X"
            .value="${o.position.x}"
            @hv-change="${t=>this._moveNode(o.id,{x:di(t)})}"
          ></hv-field>
          <hv-field
            kind="number"
            label="Y"
            .value="${o.position.y}"
            @hv-change="${t=>this._moveNode(o.id,{y:di(t)})}"
          ></hv-field>
        </div>
        <div class="toolbar">
          <button type="button" class="icon" aria-label="${t.t("editor.move_left")}" @click="${()=>this._nudge(o,-1,0)}">←</button>
          <button type="button" class="icon" aria-label="${t.t("editor.move_up")}" @click="${()=>this._nudge(o,0,-1)}">↑</button>
          <button type="button" class="icon" aria-label="${t.t("editor.move_down")}" @click="${()=>this._nudge(o,0,1)}">↓</button>
          <button type="button" class="icon" aria-label="${t.t("editor.move_right")}" @click="${()=>this._nudge(o,1,0)}">→</button>
          <button type="button" @click="${()=>this._rotateNode(o.id)}">↻ ${t.t("editor.rotate")}</button>
          <button type="button" class="danger" @click="${()=>this._deleteNode(o.id)}">
            ${t.t("editor.delete_device")}
          </button>
        </div>
      </section>
    `}_renderBinding(t,e,o,i,n){return B`${o.map(o=>{const{kind:r,options:s,helper:a}=this._fieldSource(t,e,o,i);return B`
        <hv-field
          .kind="${r}"
          .label="${t.t(o.label)}"
          .helper="${a}"
          .options="${s}"
          .value="${e[o.key]}"
          @hv-change="${t=>n({[o.key]:ai(t)})}"
        ></hv-field>
      `})}`}_fieldSource(t,e,o,i){const n=this._hass,r=o.helper?t.t(o.helper):void 0;switch(o.key){case"entity_id":case"temperature_entity_id":return{kind:"combo",options:Vo(n,i),helper:Wo(n,e[o.key])??r};case"value_attribute":case"mode_attribute":return{kind:"combo",options:Uo(n,e.entity_id),helper:r};case"branch_a_value":case"branch_b_value":return{kind:"combo",options:Bo(n,e.entity_id,e.mode_attribute),helper:r};default:return{kind:"combo",options:Bo(n,e.entity_id),helper:r}}}_renderAddons(t,e){const o=ie(e.type)?.addons??[];if(!o.length)return F;const i=e.addons??[],n=o.filter(t=>this._remaining(e,t)>0),r=n.find(t=>t.type===this._newAddonType)?.type??n[0]?.type;return B`
      <section class="card">
        <h3>${t.t("editor.addons_title")}</h3>
        ${i.length?B`<ul class="list">
              ${i.map((o,i)=>B`
                <li>
                  <button type="button" class="row" @click="${()=>this._openAddon(e.id,i)}">
                    <span class="row-main">
                      <span>${this._addonName(t,e,o,i)}</span>
                      <span class="row-sub">${this._addonSummary(t,o)}</span>
                    </span>
                    <span aria-hidden="true">›</span>
                  </button>
                  <button
                    type="button"
                    class="icon danger"
                    aria-label="${t.t("editor.remove_addon")}"
                    @click="${()=>this._removeAddon(e.id,i)}"
                  >×</button>
                </li>
              `)}
            </ul>`:B`<p class="hint">${t.t("editor.addons_empty")}</p>`}
        ${r?B`<div class="toolbar" style="margin-top: 8px">
              <select
                aria-label="${t.t("editor.addon_type")}"
                @change="${t=>{this._newAddonType=t.target.value}}"
              >
                ${n.map(o=>B`
                  <option value="${o.type}" ?selected="${o.type===r}">
                    ${t.t(`addons.${o.type}.name`)} (${t.t("editor.remaining",String(this._remaining(e,o)))})
                  </option>
                `)}
              </select>
              <button type="button" @click="${()=>this._addAddon(e.id,r)}">
                ${t.t("editor.add_addon")}
              </button>
            </div>`:F}
      </section>
    `}_renderSuggestions(t,e){const o=function(t,e){const o=e.entity_id?t?.entities?.[e.entity_id]?.device_id:void 0,i=ie(e.type)?.addons??[];if(!t||!o||!i.length)return[];const n=[...e.addons??[]],r=new Set([e.entity_id,...n.map(t=>t.entity_id),...n.map(t=>t.temperature_entity_id)]),s=[],a=Object.values(t.entities??{}).filter(t=>t.device_id===o&&!r.has(t.entity_id)).map(e=>t.states[e.entity_id]).filter(t=>void 0!==t).sort((t,e)=>t.entity_id.localeCompare(e.entity_id));for(const t of a){const e=Mo(t),o="temperature"===e?["temperature","value"]:e?[e]:[];for(const e of o){const o=i.find(t=>t.type===e),r=n.filter(t=>t.type===e);if(!o||r.length>=ro(o))continue;const a={type:o.type,entity_id:t.entity_id};o.slots&&(a.slot=Co(t,o.slots,new Set(r.map(t=>t.slot)))),n.push(a),s.push(a);break}}return s}(this._hass,e);if(!o.length)return F;return B`
      <section class="card">
        <div class="header">
          <h3>${t.t("editor.suggested_title")}</h3>
          <button type="button" @click="${()=>this._addAddons(e.id,o)}">
            ${t.t("editor.add_all")}
          </button>
        </div>
        <p class="hint">${t.t("editor.suggested_hint")}</p>
        <ul class="list" style="margin-top: 8px">
          ${o.map(o=>B`
            <li>
              <div class="row static">
                <span class="row-main">
                  <span>${(e=>e.slot?`${t.t(`addons.${e.type}.name`)} – ${t.t(`slots.${e.slot}`)}`:t.t(`addons.${e.type}.name`))(o)}</span>
                  <span class="row-sub">${Wo(this._hass,o.entity_id)??o.entity_id}</span>
                </span>
              </div>
              <button
                type="button"
                class="icon"
                aria-label="${t.t("editor.add_addon")}"
                @click="${()=>this._addAddons(e.id,[o])}"
              >+</button>
            </li>
          `)}
        </ul>
      </section>
    `}_renderAddonView(t,e,o,i,n){const r=ie(o.type)?.addons?.find(t=>t.type===i.type),s=no[i.type],a=new Set((o.addons??[]).filter((t,e)=>e!==n&&t.type===i.type).map(t=>t.slot)),d=(r?.slots??[]).filter(t=>!a.has(t)).map(e=>({value:e,label:t.t(`slots.${e}`)})),l={domains:s.domains,deviceClasses:s.deviceClasses,relatedTo:o.entity_id};return B`
      ${this._renderHeader(t,this._addonName(t,o,i,n),()=>this._openNode(o.id))}
      ${this._renderCanvas(t,e)}
      <section class="card">
        <p class="hint">${this._nodeName(t,o)} › ${t.t(`addons.${i.type}.name`)}</p>
        ${d.length?B`<hv-field
              kind="select"
              .label="${t.t("editor.slot")}"
              .options="${d}"
              .value="${i.slot}"
              @hv-change="${t=>this._patchAddon(o.id,n,{slot:ai(t)})}"
            ></hv-field>`:F}
        <hv-field
          .label="${t.t("editor.name")}"
          .helper="${t.t("editor.addon_name_helper")}"
          .value="${i.name}"
          @hv-change="${t=>this._patchAddon(o.id,n,{name:ai(t)})}"
        ></hv-field>
        ${s.entityless?B`<p class="hint">${t.t(`addons.${i.type}.hint`)}</p>`:this._renderBinding(t,i,function(t){if("loop"===t)return[{...Jo,label:"editor.actuator_entity"},Yo,{key:"temperature_entity_id",label:"editor.loop_temperature"}];switch(no[t].display){case"value":case"text":return[Jo,Go];case"binary":return[Jo,Yo];case"position":return[Jo,Xo];default:return[]}}(i.type),l,t=>this._patchAddon(o.id,n,t))}
      </section>
      <div class="toolbar">
        <button type="button" class="danger" @click="${()=>this._removeAddon(o.id,n)}">
          ${t.t("editor.remove_addon")}
        </button>
      </div>
    `}_renderConnections(t,e,o){const i=ne(o)?.ports??[];return i.length?B`
      <section class="card">
        <h3>${t.t("editor.connections_title")}</h3>
        ${i.map(i=>{const n={nodeId:o.id,portId:i.id},r=fo(e,n),s=function(t,e){const o=_o(t,e);if(!o)return[];const i=[];for(const n of t.nodes)if(n.id!==e.nodeId)for(const r of ne(n)?.ports??[]){if(r.kind===o.kind)continue;const s={nodeId:n.id,portId:r.id},a=mo(t,e,s);a&&!$o(t,a)&&i.push(s)}return i}(e,n);return B`
            <div class="port">
              <div class="port-label">
                ${"outlet"===i.kind?"→":"←"} ${t.t(i.labelKey,...i.labelArgs??[])}
              </div>
              <div class="chips">
                ${r.length?r.map(o=>{const i=function(t,e){const o=_t(e);return mt(t.from===o?t.to:t.from)}(o,n);return B`<span class="chip">
                        ${i?this._portRefLabel(t,e,i):"?"}
                        <button
                          type="button"
                          aria-label="${t.t("editor.disconnect")}"
                          @click="${()=>this._removeConnections([o])}"
                        >×</button>
                      </span>`}):B`<span class="hint">${t.t("editor.not_connected")}</span>`}
              </div>
              ${s.length?B`<select
                    aria-label="${t.t("editor.connect_to")}"
                    @change="${t=>{const e=t.target,o=mt(e.value);e.value="",o&&this._connect(n,o)}}"
                  >
                    <option value="">${t.t("editor.connect_to")}…</option>
                    ${s.map(o=>B`<option value="${_t(o)}">${this._portRefLabel(t,e,o)}</option>`)}
                  </select>`:F}
            </div>
          `})}
      </section>
    `:F}_renderOverlaysTab(t,e){return B`
      <div class="toolbar">
        <button type="button" class="primary" @click="${this._addOverlay}">${t.t("editor.add_overlay")}</button>
      </div>
      <heating-schema-canvas
        .schema="${e}"
        .pipeStyle="${this._pipeStyle()}"
        .editable="${!1}"
      ></heating-schema-canvas>
      ${e.overlays.length?F:B`<p class="hint">${t.t("editor.overlays_empty")}</p>`}
      ${e.overlays.map((e,o)=>this._renderOverlay(t,e,o))}
    `}_renderOverlay(t,e,o){const i=this._hass,n=t=>this._patchOverlay(e.id,t),r=void 0!==e.name&&"string"!=typeof e.name;return B`
      <section class="card">
        <div class="header">
          <h3>${e.entity_id||t.t("editor.overlay_n",String(o+1))}</h3>
          <button
            type="button"
            class="icon danger"
            aria-label="${t.t("editor.remove_overlay")}"
            @click="${()=>this._removeOverlay(e.id)}"
          >×</button>
        </div>
        <hv-field
          kind="combo"
          .label="${t.t("overlay.entity")}"
          .options="${Vo(i)}"
          .helper="${Wo(i,e.entity_id)}"
          .value="${e.entity_id}"
          @hv-change="${t=>n({entity_id:ai(t)??""})}"
        ></hv-field>
        <hv-field
          .label="${t.t("overlay.name")}"
          .helper="${r?t.t("overlay.name_yaml"):t.t("overlay.name_helper")}"
          .value="${"string"==typeof e.name?e.name:void 0}"
          @hv-change="${t=>n({name:ai(t)})}"
        ></hv-field>
        <hv-field
          .label="${t.t("overlay.template")}"
          .helper="${t.t("overlay.template_helper")}"
          .value="${e.template}"
          @hv-change="${t=>n({template:ai(t)})}"
        ></hv-field>
        <div class="grid2">
          <hv-field
            kind="number"
            label="X"
            .value="${e.position.x}"
            @hv-change="${t=>n({position:{...e.position,x:di(t)??0}})}"
          ></hv-field>
          <hv-field
            kind="number"
            label="Y"
            .value="${e.position.y}"
            @hv-change="${t=>n({position:{...e.position,y:di(t)??0}})}"
          ></hv-field>
        </div>

        <div class="header">
          <h3>${t.t("overlay.rules")}</h3>
          <button type="button" @click="${()=>this._addRule(e)}">${t.t("overlay.add_rule")}</button>
        </div>
        ${(e.rules??[]).map((o,i)=>this._renderRule(t,e,o,i))}
      </section>
    `}_renderRule(t,e,o,i){const n=t=>this._updateRule(e.id,i,t),r=o.entity||e.entity_id;return B`
      <div class="rule">
        <div class="header">
          <hv-field
            style="flex: 1"
            kind="select"
            .label="${t.t("overlay.rule.condition")}"
            .options="${[{value:"state",label:t.t("overlay.rule.condition_state")},{value:"numeric",label:t.t("overlay.rule.condition_numeric")}]}"
            .value="${o.condition}"
            @hv-change="${t=>n(e=>({condition:"numeric"===ai(t)?"numeric":"state",entity:e.entity,effect:e.effect}))}"
          ></hv-field>
          <button
            type="button"
            class="icon danger"
            aria-label="${t.t("overlay.remove_rule")}"
            @click="${()=>n(()=>{})}"
          >×</button>
        </div>
        <hv-field
          kind="combo"
          .label="${t.t("overlay.rule.entity")}"
          .helper="${t.t("overlay.rule.entity_helper")}"
          .options="${Vo(this._hass)}"
          .value="${o.entity}"
          @hv-change="${t=>n(e=>({...e,entity:ai(t)}))}"
        ></hv-field>
        ${"state"===o.condition?B`<hv-field
              kind="combo"
              .label="${t.t("overlay.rule.state")}"
              .options="${Bo(this._hass,r)}"
              .value="${o.state}"
              @hv-change="${t=>n(e=>({...e,state:ai(t)}))}"
            ></hv-field>`:B`<div class="grid2">
              <hv-field
                kind="number"
                .label="${t.t("overlay.rule.above")}"
                .value="${o.above}"
                @hv-change="${t=>n(e=>({...e,above:di(t)}))}"
              ></hv-field>
              <hv-field
                kind="number"
                .label="${t.t("overlay.rule.below")}"
                .value="${o.below}"
                @hv-change="${t=>n(e=>({...e,below:di(t)}))}"
              ></hv-field>
            </div>`}
        <hv-field
          kind="combo"
          .label="${t.t("overlay.rule.color")}"
          .helper="${t.t("overlay.rule.color_helper")}"
          .options="${si.map(t=>({value:t}))}"
          .value="${o.effect.color}"
          @hv-change="${t=>n(e=>({...e,effect:{...e.effect,color:ai(t)}}))}"
        ></hv-field>
        <hv-field
          kind="boolean"
          .label="${t.t("overlay.rule.hide")}"
          .value="${!1===o.effect.visible}"
          @hv-change="${t=>n(e=>({...e,effect:{...e.effect,visible:!t.detail.value&&void 0}}))}"
        ></hv-field>
      </div>
    `}_nodeName(t,e){return e.name||t.t(`devices.${e.type}.name`)}_addonName(t,e,o,i){if(o.name)return o.name;const n=t.t(`addons.${o.type}.name`);if(o.slot)return`${n} – ${t.t(`slots.${o.slot}`)}`;const r=(e.addons??[]).filter(t=>t.type===o.type);if(r.length<2)return n;const s=(e.addons??[]).slice(0,i+1).filter(t=>t.type===o.type).length;return`${n} ${s}`}_addonSummary(t,e){return no[e.type].entityless?t.t(`addons.${e.type}.hint`):e.entity_id?Wo(this._hass,e.entity_id)??e.entity_id:t.t("editor.no_entity")}_portRefLabel(t,e,o){const i=e.nodes.find(t=>t.id===o.nodeId),n=_o(e,o),r=n?t.t(n.labelKey,...n.labelArgs??[]):o.portId;return i?`${this._nodeName(t,i)} › ${r}`:_t(o)}_openList(){this._view={kind:"list"}}_openNode(t){this._view={kind:"node",nodeId:t},this._selectedNodeId=t,this._selectedEdgeId=void 0}_openAddon(t,e){this._view={kind:"addon",nodeId:t,index:e}}_update(t){if(!this._config)return;this._layoutUndo=void 0;const e=structuredClone(gt(this._config));t(e),this._emit({...this._config,...e})}_emit(t){const e=JSON.parse(JSON.stringify({...t,schema_version:2}));this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_pipeStyle(){return this._config?.pipe_style??"orthogonal"}_setPipeStyle(t){this._config&&this._emit({...this._config,pipe_style:"orthogonal"===t?void 0:t})}_patchNode(t,e){this._update(o=>{const i=o.nodes.find(e=>e.id===t);i&&Object.assign(i,e)})}_moveNode(t,e){this._update(o=>{const i=o.nodes.find(e=>e.id===t);i&&(i.position={x:e.x??i.position.x,y:e.y??i.position.y})})}_nudge(t,e,o){this._moveNode(t.id,{x:t.position.x+10*e,y:t.position.y+10*o})}_toggleDrawing(){this._drawing=!this._drawing,this._pendingPort=void 0}_rotateNode(t){this._update(e=>{const o=e.nodes.find(e=>e.id===t);o&&(o.rotation=fe((o.rotation??0)+90)||void 0)})}_addDevice(t,e){if(!ie(t))return;const o=bt(t);this._update(i=>{const n=i.nodes.length,r={id:o,type:t,name:Zo(this._hass,e),entity_id:e,position:{x:oi+n%Qo*ti,y:ii+Math.floor(n/Qo)*ei}};t===Nt.type&&(r.addons=Array.from({length:4},()=>({type:"loop"}))),i.nodes.push(r)}),this._entityToAdd=void 0,this._entityDeviceType=void 0,this._openNode(o)}_autoLayout(){if(!this._config)return;const t=Object.fromEntries(gt(this._config).nodes.map(t=>[t.id,{...t.position}]));this._update(t=>{t.nodes=function(t){const e=new Map(t.nodes.map(t=>[t.id,t])),o=new Map,{columns:i,unconnected:n}=No(t);let r=40,s=40;for(const t of i){let i=40,n=0;for(const s of t){const t=e.get(s);if(!t)continue;const a=Ho(t);o.set(s,Oo(t,r,i)),i+=a.height+50,n=Math.max(n,a.width)}s=Math.max(s,i),r+=n+80}let a=40;for(const t of n){const i=e.get(t);i&&(o.set(t,Oo(i,a,s)),a+=Ho(i).width+80)}return t.nodes.map(t=>o.get(t.id)??t)}(t)}),this._layoutUndo=t}_undoLayout(){const t=this._layoutUndo;t&&this._update(e=>{for(const o of e.nodes)o.position=t[o.id]??o.position})}_insertTemplate(){const t=Io.find(t=>t.id===this._templateId);t&&this._update(e=>{const o=zo(t,e,t=>bt(t));e.nodes.push(...o.nodes),e.connections.push(...o.connections)})}_addAddons(t,e){this._update(o=>{const i=o.nodes.find(e=>e.id===t);i&&(i.addons=[...i.addons??[],...e])})}_deleteNode(t){this._update(e=>{e.nodes=e.nodes.filter(e=>e.id!==t),e.connections=e.connections.filter(e=>mt(e.from)?.nodeId!==t&&mt(e.to)?.nodeId!==t)}),this._selectedNodeId=void 0,this._pendingPort=void 0,this._openList()}_remaining(t,e){const o=(t.addons??[]).filter(t=>t.type===e.type).length;return ro(e)-o}_addAddon(t,e){let o=-1;this._update(i=>{const n=i.nodes.find(e=>e.id===t),r=n&&ie(n.type)?.addons?.find(t=>t.type===e);if(!n||!r||this._remaining(n,r)<=0)return;const s=new Set((n.addons??[]).filter(t=>t.type===e).map(t=>t.slot)),a={type:e,slot:r.slots?.find(t=>!s.has(t))};n.addons=[...n.addons??[],a],o=n.addons.length-1}),o>=0&&!no[e].entityless&&this._openAddon(t,o)}_patchAddon(t,e,o){this._update(i=>{const n=i.nodes.find(e=>e.id===t)?.addons?.[e];n&&Object.assign(n,o)})}_removeAddon(t,e){this._update(o=>{const i=o.nodes.find(e=>e.id===t),n=i?.addons?.[e];if(i?.addons&&n){if("loop"===n.type){const n=i.addons.slice(0,e+1).filter(t=>"loop"===t.type).length;o.connections=function(t,e,o){const i=t=>{const i=mt(t),n=i?.nodeId===e?go.exec(i.portId):null;if(!i||!n)return t;const r=Number(n[1]);return r!==o?r<o?t:_t({nodeId:e,portId:`loop_${r-1}_${n[2]}`}):void 0},n=[];for(const e of t.connections){const t=i(e.from),o=i(e.to);t&&o&&n.push({from:t,to:o})}return n}(o,t,n)}i.addons=i.addons.filter((t,o)=>o!==e),i.addons.length||(i.addons=void 0),o.connections=function(t,e){const o=t.nodes.find(t=>t.id===e),i=new Set(o?(ne(o)?.ports??[]).map(t=>t.id):[]);return t.connections.filter(t=>[t.from,t.to].every(t=>{const o=mt(t);return!o||o.nodeId!==e||i.has(o.portId)}))}(o,t)}}),this._openNode(t)}_connect(t,e){this._update(o=>{const i=mo(o,t,e);i&&!$o(o,i)&&o.connections.push(i)})}_removeConnections(t){const e=new Set(t.map($t));this._update(t=>{t.connections=t.connections.filter(t=>!e.has($t(t)))})}_deleteSelectedConnection(){const t=this._selectedEdgeId;t&&(this._update(e=>{e.connections=e.connections.filter(e=>$t(e)!==t)}),this._selectedEdgeId=void 0)}_addOverlay(){this._update(t=>{t.overlays.push({id:bt("ov"),position:{x:40,y:40+30*t.overlays.length},entity_id:"",template:"{{ state }}"})})}_removeOverlay(t){this._update(e=>{e.overlays=e.overlays.filter(e=>e.id!==t)})}_patchOverlay(t,e){this._update(o=>{const i=o.overlays.find(e=>e.id===t);i&&Object.assign(i,e)})}_addRule(t){this._update(e=>{const o=e.overlays.find(e=>e.id===t.id);o&&(o.rules=[...o.rules??[],{condition:"state",effect:{}}])})}_updateRule(t,e,o){this._update(i=>{const n=i.overlays.find(e=>e.id===t),r=n?.rules?.[e];if(!n?.rules||!r)return;const s=o(r);n.rules=s?n.rules.map((t,o)=>o===e?s:t):n.rules.filter((t,o)=>o!==e),n.rules.length||(n.rules=void 0)})}_onNodeSelect(t){const{nodeId:e}=t.detail;this._selectedEdgeId=void 0,"list"!==this._view.kind&&e?e!==this._view.nodeId&&this._openNode(e):this._selectedNodeId=e}_onEdgeSelect(t){this._selectedEdgeId=t.detail.edgeId,this._pendingPort=void 0}_onNodeMove(t){this._moveNode(t.detail.nodeId,t.detail.position)}_onPortClick(t){const e={nodeId:t.detail.nodeId,portId:t.detail.portId},o=this._pendingPort;o?(this._pendingPort=void 0,o.nodeId===e.nodeId&&o.portId===e.portId||this._connect(o,e)):this._pendingPort=e}};li.styles=s`
    :host {
      display: block;
    }
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 0;
    }
    h3 {
      margin: 8px 0 6px;
      font-size: var(--ha-font-size-m, 14px);
      font-weight: var(--ha-font-weight-medium, 500);
      color: var(--primary-text-color);
    }
    button {
      min-height: 36px;
      padding: 6px 12px;
      font: inherit;
      color: var(--primary-text-color);
      background: transparent;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
      cursor: pointer;
    }
    button:focus-visible,
    select:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
    button.primary {
      color: var(--text-primary-color, #fff);
      background: var(--primary-color);
      border-color: var(--primary-color);
    }
    button.danger {
      color: var(--error-color, #db4437);
      border-color: var(--error-color, #db4437);
    }
    button.icon {
      min-width: 36px;
      padding: 4px 8px;
    }
    select {
      min-height: 36px;
      padding: 6px 10px;
      font: inherit;
      color: var(--primary-text-color);
      background: var(--ha-color-form-background, var(--secondary-background-color));
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
    }
    .tabs {
      display: flex;
      gap: 4px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--divider-color);
    }
    .tabs button {
      flex: 1;
      border: none;
    }
    .tabs button[aria-selected="true"] {
      color: var(--text-primary-color, #fff);
      background: var(--primary-color);
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }
    .toolbar select {
      flex: 1;
      min-width: 160px;
    }
    .header {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .header h3 {
      flex: 1;
      margin: 0;
    }
    .hint {
      margin: 0;
      font-size: var(--ha-font-size-s, 12px);
      color: var(--secondary-text-color);
    }
    .notice {
      margin: 0;
      font-size: var(--ha-font-size-s, 12px);
      color: var(--primary-color);
    }
    .warning {
      display: flex;
      gap: 8px;
      align-items: center;
      justify-content: space-between;
      margin: 0;
      color: var(--warning-color, #ffa600);
    }
    ul.list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    ul.list li {
      display: flex;
      gap: 6px;
    }
    .row {
      display: flex;
      flex: 1;
      gap: 8px;
      align-items: center;
      text-align: start;
    }
    .row.selected {
      border-color: var(--primary-color);
    }
    .row.static {
      padding: 6px 12px;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
    }
    .row-main {
      display: flex;
      flex: 1;
      flex-direction: column;
      min-width: 0;
    }
    .row-sub {
      overflow: hidden;
      font-size: var(--ha-font-size-s, 12px);
      color: var(--secondary-text-color);
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    section.card {
      padding: 10px;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px);
    }
    .grid2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .port {
      padding: 6px 0;
      border-top: 1px solid var(--divider-color);
    }
    .port-label {
      margin-bottom: 4px;
      font-size: var(--ha-font-size-s, 12px);
      color: var(--secondary-text-color);
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 6px;
    }
    .chip {
      display: inline-flex;
      gap: 4px;
      align-items: center;
      padding: 2px 4px 2px 10px;
      background: var(--secondary-background-color);
      border-radius: 16px;
    }
    .chip button {
      min-width: 28px;
      min-height: 28px;
      padding: 0;
      border: none;
      border-radius: 50%;
    }
    .port select {
      width: 100%;
    }
    .rule {
      margin-top: 8px;
      padding: 8px;
      background: var(--secondary-background-color);
      border-radius: var(--ha-border-radius-md, 8px);
    }
  `,t([vt()],li.prototype,"_hass",void 0),t([vt()],li.prototype,"_config",void 0),t([vt()],li.prototype,"_tab",void 0),t([vt()],li.prototype,"_view",void 0),t([vt()],li.prototype,"_selectedNodeId",void 0),t([vt()],li.prototype,"_selectedEdgeId",void 0),t([vt()],li.prototype,"_pendingPort",void 0),t([vt()],li.prototype,"_newDeviceType",void 0),t([vt()],li.prototype,"_newAddonType",void 0),t([vt()],li.prototype,"_entityToAdd",void 0),t([vt()],li.prototype,"_entityDeviceType",void 0),t([vt()],li.prototype,"_templateId",void 0),t([vt()],li.prototype,"_layoutUndo",void 0),t([vt()],li.prototype,"_drawing",void 0),li=t([pt("heating-visualizer-editor")],li);let ci=class extends lt{constructor(){super(...arguments),this._i18n=new $e(this,me)}setConfig(t){if(!t||"object"!=typeof t)throw new Error("Invalid card configuration");this._config=le(t)}getCardSize(){return 6}getGridOptions(){return{columns:12,min_columns:6}}static getConfigElement(){return document.createElement("heating-visualizer-editor")}static getStubConfig(){return{schema_version:2,...ft}}render(){if(!this._config)return B``;const t=gt(this._config),e=ye(this._i18n.value?.language);return B`
      <ha-card>
        ${t.nodes.length||t.overlays.length?B`
            <heating-schema-canvas
              .schema="${t}"
              .pipeStyle="${this._config.pipe_style??"orthogonal"}"
              .editable="${!1}"
            ></heating-schema-canvas>
          `:B`<div class="empty">${e.t("card.empty")}</div>`}
      </ha-card>
    `}};ci.styles=s`
    :host {
      display: block;
    }
    ha-card {
      overflow: hidden;
    }
    .empty {
      padding: 24px;
      text-align: center;
      opacity: 0.8;
      color: var(--primary-text-color, #e0e0e0);
    }
  `,t([vt()],ci.prototype,"_config",void 0),ci=t([pt("heating-visualizer-card")],ci),window.customCards=window.customCards??[],window.customCards.push({type:"heating-visualizer-card",name:"Heating Visualizer",description:"Design and visualize heating system schemas with live sensor overlays.",preview:!0,documentationURL:"https://github.com/vasicekmilan90-eng/heating_vizualizer"}),console.info("%c HEATING-VISUALIZER-CARD %c v0.3.1 ","color: white; background: #039be5; font-weight: bold;","color: #039be5; background: white; font-weight: bold;");export{ci as HeatingVisualizerCard};
//# sourceMappingURL=heating-visualizer-card.js.map
