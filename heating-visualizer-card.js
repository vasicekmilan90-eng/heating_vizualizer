function t(t,e,i,o){var n,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,o);else for(var s=t.length-1;s>=0;s--)(n=t[s])&&(a=(r<3?n(a):r>3?n(e,i,a):n(e,i))||a);return r>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),n=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new r(i,t,o)},s=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:d,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,v=globalThis,_=v.trustedTypes,y=_?_.emptyScript:"",m=v.reactiveElementPolyfillSupport,$=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},g=(t,e)=>!d(t,e),b={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:g};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&l(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const r=o?.call(this);n?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(s(t))}else void 0!==t&&e.push(s(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),n=e.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=o;const r=n.fromAttribute(e,t.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,e,i,o=!1,n){if(void 0!==t){const r=this.constructor;if(!1===o&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??g)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,m?.({ReactiveElement:x}),(v.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=t=>t,A=w.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,M="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,I=`<${C}>`,P=document,z=()=>P.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,L=Array.isArray,T="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,H=/>/g,D=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),K=/'/g,V=/"/g,R=/^(?:script|style|textarea|title)$/i,U=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),B=U(1),Z=U(2),q=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),W=new WeakMap,Y=P.createTreeWalker(P,129);function J(t,e){if(!L(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,o=[];let n,r=2===e?"<svg>":3===e?"<math>":"",a=O;for(let e=0;e<i;e++){const i=t[e];let s,d,l=-1,c=0;for(;c<i.length&&(a.lastIndex=c,d=a.exec(i),null!==d);)c=a.lastIndex,a===O?"!--"===d[1]?a=j:void 0!==d[1]?a=H:void 0!==d[2]?(R.test(d[2])&&(n=RegExp("</"+d[2],"g")),a=D):void 0!==d[3]&&(a=D):a===D?">"===d[0]?(a=n??O,l=-1):void 0===d[1]?l=-2:(l=a.lastIndex-d[2].length,s=d[1],a=void 0===d[3]?D:'"'===d[3]?V:K):a===V||a===K?a=D:a===j||a===H?a=O:(a=D,n=void 0);const p=a===D&&t[e+1].startsWith("/>")?" ":"";r+=a===O?i+I:l>=0?(o.push(s),i.slice(0,l)+M+i.slice(l)+E+p):i+E+(-2===l?e:p)}return[J(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Q{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let n=0,r=0;const a=t.length-1,s=this.parts,[d,l]=X(t,e);if(this.el=Q.createElement(d,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=Y.nextNode())&&s.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(M)){const e=l[r++],i=o.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);s.push({type:1,index:n,name:a[2],strings:i,ctor:"."===a[1]?ot:"?"===a[1]?nt:"@"===a[1]?rt:it}),o.removeAttribute(t)}else t.startsWith(E)&&(s.push({type:6,index:n}),o.removeAttribute(t));if(R.test(o.tagName)){const t=o.textContent.split(E),e=t.length-1;if(e>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],z()),Y.nextNode(),s.push({type:2,index:++n});o.append(t[e],z())}}}else if(8===o.nodeType)if(o.data===C)s.push({type:2,index:n});else{let t=-1;for(;-1!==(t=o.data.indexOf(E,t+1));)s.push({type:7,index:n}),t+=E.length-1}n++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,o){if(e===q)return e;let n=void 0!==o?i._$Co?.[o]:i._$Cl;const r=N(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=n:i._$Cl=n),void 0!==n&&(e=G(t,n._$AS(t,e.values),n,o)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??P).importNode(e,!0);Y.currentNode=o;let n=Y.nextNode(),r=0,a=0,s=i[0];for(;void 0!==s;){if(r===s.index){let e;2===s.type?e=new et(n,n.nextSibling,this,t):1===s.type?e=new s.ctor(n,s.name,s.strings,this,t):6===s.type&&(e=new at(n,this,t)),this._$AV.push(e),s=i[++a]}r!==s?.index&&(n=Y.nextNode(),r++)}return Y.currentNode=P,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),N(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>L(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new tt(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Q(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const n of t)o===e.length?e.push(i=new et(this.O(z()),this.O(z()),this,this.options)):i=e[o],i._$AI(n),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,n){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,o){const n=this.strings;let r=!1;if(void 0===n)t=G(this,t,e,0),r=!N(t)||t!==this._$AH&&t!==q,r&&(this._$AH=t);else{const o=t;let a,s;for(t=n[0],a=0;a<n.length-1;a++)s=G(this,o[i+a],e,a),s===q&&(s=this._$AH[a]),r||=!N(s)||s!==this._$AH[a],s===F?t=F:t!==F&&(t+=(s??"")+n[a+1]),this._$AH[a]=s}r&&!o&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class nt extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class rt extends it{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??F)===q)return;const i=this._$AH,o=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==F&&(i===F||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const st=w.litHtmlPolyfillSupport;st?.(Q,et),(w.litHtmlVersions??=[]).push("3.3.3");const dt=globalThis;class lt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let n=o._$litPart$;if(void 0===n){const t=i?.renderBefore??null;o._$litPart$=n=new et(e.insertBefore(z(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}lt._$litElement$=!0,lt.finalized=!0,dt.litElementHydrateSupport?.({LitElement:lt});const ct=dt.litElementPolyfillSupport;ct?.({LitElement:lt}),(dt.litElementVersions??=[]).push("4.2.2");const pt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:g},ut=(t=ht,e,i)=>{const{kind:o,metadata:n}=i;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,n,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const n=this[o];e.call(this,i),this.requestUpdate(o,n,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function vt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function _t(t){return vt({...t,state:!0,attribute:!1})}function yt(t){return`${t.nodeId}.${t.portId}`}function mt(t){const e=t.lastIndexOf(".");if(!(e<=0||e===t.length-1))return{nodeId:t.slice(0,e),portId:t.slice(e+1)}}function $t(t){return`${t.from}>${t.to}`}const ft={nodes:[],connections:[],overlays:[]};function gt(t){return{nodes:t.nodes??[],connections:t.connections??[],overlays:t.overlays??[]}}function bt(t){return"undefined"!=typeof crypto&&"function"==typeof crypto.randomUUID?`${t}_${crypto.randomUUID().slice(0,8)}`:`${t}_${Math.random().toString(36).slice(2,10)}`}const xt=["top","upper","middle","lower","bottom"],wt=["top","middle","bottom"],kt={type:"alarm",max:1},At={type:"mode",max:1},St={type:"setpoint",max:1},Mt=t=>({type:"value",max:t}),Et=(...t)=>({type:"temperature",max:t.length,slots:t}),Ct={type:"valve_3way",labelKey:"devices.valve_3way.name",width:100,height:100,ports:[{id:"in",labelKey:"devices.valve_3way.ports.in",kind:"inlet",position:{x:0,y:50}},{id:"out_a",labelKey:"devices.valve_3way.ports.out_a",kind:"outlet",position:{x:100,y:25}},{id:"out_b",labelKey:"devices.valve_3way.ports.out_b",kind:"outlet",position:{x:100,y:75}}],addons:[Mt(1),kt]};function It(t){const e=t&&t>0?t:200,i=110+38*Math.log2(e/50);return Math.round(Math.min(300,Math.max(100,i)))}const Pt=["source_in","coil_in","coil_out","coil2_in","coil2_out","source_out"],zt=["hot_out","supply_out","circulation_in","return_in","cold_in"],Nt=new Set(["source_out","coil_out","coil2_out","hot_out","supply_out"]);function Lt(t,e,i){return t.map((o,n)=>({id:o,labelKey:`devices.tank.ports.${o}`,kind:Nt.has(o)?"outlet":"inlet",position:{x:e,y:Math.round(i*(1===t.length?.5:.15+.7*n/(t.length-1)))}}))}function Tt(t){return t.addons?.some(t=>"dhw"===t.type)?"tank_dhw":"tank_buffer"}const Ot={type:"tank",labelKey:"devices.tank.name",width:100,height:It(void 0),ports:[],volume:!0,addons:[Et(...xt),Mt(2),{type:"electric_heater",max:2},{type:"pump",max:1},At,St,kt,{type:"heat_exchanger",max:2},{type:"direct_source",max:1},{type:"direct_heating",max:1},{type:"dhw",max:1},{type:"circulation",max:1}],resolve:t=>{const e=It(t.volume),i=function(t){const e=e=>t.addons?.filter(t=>t.type===e).length??0,i=new Set;return e("direct_source")&&["source_in","source_out"].forEach(t=>i.add(t)),e("heat_exchanger")>=1&&["coil_in","coil_out"].forEach(t=>i.add(t)),e("heat_exchanger")>=2&&["coil2_in","coil2_out"].forEach(t=>i.add(t)),e("dhw")&&["hot_out","cold_in"].forEach(t=>i.add(t)),e("direct_heating")&&["supply_out","return_in"].forEach(t=>i.add(t)),e("circulation")&&i.add("circulation_in"),i}(t);return{...Ot,labelKey:"devices.tank."+("tank_dhw"===Tt(t)?"name_dhw":i.size?"name_buffer":"name"),height:e,ports:[...Lt(Pt.filter(t=>i.has(t)),0,e),...Lt(zt.filter(t=>i.has(t)),100,e)]}}},jt={type:"junction",labelKey:"devices.junction.name",width:60,height:60,variants:["split","merge"],ports:[{id:"in",labelKey:"devices.junction.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out_top",labelKey:"devices.junction.ports.out_top",kind:"outlet",position:{x:60,y:15}},{id:"out_bottom",labelKey:"devices.junction.ports.out_bottom",kind:"outlet",position:{x:60,y:45}}],resolve:t=>"merge"===t.variant?{...jt,ports:[{id:"in_top",labelKey:"devices.junction.ports.in_top",kind:"inlet",position:{x:0,y:15}},{id:"in_bottom",labelKey:"devices.junction.ports.in_bottom",kind:"inlet",position:{x:0,y:45}},{id:"out",labelKey:"devices.junction.ports.out",kind:"outlet",position:{x:60,y:30}}]}:jt},Ht={type:"circulation_pump",labelKey:"devices.circulation_pump.name",width:90,height:90,ports:[{id:"in",labelKey:"devices.circulation_pump.ports.in",kind:"inlet",position:{x:0,y:45}},{id:"out",labelKey:"devices.circulation_pump.ports.out",kind:"outlet",position:{x:90,y:45}}],addons:[Mt(3),At,kt]},Dt={type:"floor_heating",labelKey:"devices.floor_heating.name",width:140,height:90,ports:[{id:"in",labelKey:"devices.floor_heating.ports.in",kind:"inlet",position:{x:0,y:45}},{id:"out",labelKey:"devices.floor_heating.ports.out",kind:"outlet",position:{x:140,y:45}}],addons:[Et("room","floor"),{type:"actuator",max:1},St,{type:"window",max:1}]};const Kt={type:"manifold",labelKey:"devices.manifold.name",width:184,height:130,ports:[{id:"supply_in",labelKey:"devices.manifold.ports.supply_in",kind:"inlet",position:{x:0,y:30}},{id:"return_out",labelKey:"devices.manifold.ports.return_out",kind:"outlet",position:{x:0,y:100}}],addons:[{type:"loop",max:12},Et("supply","return"),Mt(2),{type:"pump",max:1}],resolve:t=>function(t){const e=[];for(let i=0;i<t;i++){const t=50+36*i,o=String(i+1);e.push({id:`loop_${o}_out`,labelKey:"devices.manifold.ports.loop_out",labelArgs:[o],kind:"outlet",position:{x:t,y:0}},{id:`loop_${o}_in`,labelKey:"devices.manifold.ports.loop_in",labelArgs:[o],kind:"inlet",position:{x:t,y:130}})}return{...Kt,width:50+36*t-10,ports:[...Kt.ports,...e]}}(Math.max(1,t.addons?.filter(t=>"loop"===t.type).length??0))},Vt={type:"mixing_valve",labelKey:"devices.mixing_valve.name",width:100,height:110,ports:[{id:"hot_in",labelKey:"devices.mixing_valve.ports.hot_in",kind:"inlet",position:{x:0,y:70}},{id:"return_in",labelKey:"devices.mixing_valve.ports.return_in",kind:"inlet",position:{x:50,y:110}},{id:"mixed_out",labelKey:"devices.mixing_valve.ports.mixed_out",kind:"outlet",position:{x:100,y:70}}],addons:[Et("mixed","return"),Mt(1),St,kt]},Rt={type:"electric_heater",labelKey:"devices.electric_heater.name",width:120,height:60,ports:[{id:"in",labelKey:"devices.electric_heater.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out",labelKey:"devices.electric_heater.ports.out",kind:"outlet",position:{x:120,y:30}}],addons:[Et("inlet","outlet"),Mt(2),At,kt]},Ut={type:"heat_pump",labelKey:"devices.heat_pump.name",width:170,height:120,ports:[{id:"hot_out",labelKey:"devices.heat_pump.ports.hot_out",kind:"outlet",position:{x:170,y:40}},{id:"cold_in",labelKey:"devices.heat_pump.ports.cold_in",kind:"inlet",position:{x:170,y:90}}],addons:[Et("supply","return","outdoor","evaporator"),Mt(6),{type:"electric_heater",max:3},{type:"pump",max:1},{type:"fan",max:1},At,St,{type:"defrost",max:1},kt]};const Bt={type:Zt="pipe_sensor",labelKey:`devices.${Zt}.name`,width:80,height:44,ports:[{id:"in",labelKey:"devices.inline.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out",labelKey:"devices.inline.ports.out",kind:"outlet",position:{x:80,y:30}}],valueDisplay:"only"};var Zt;const qt={type:"outdoor_temperature",labelKey:"devices.outdoor_temperature.name",width:100,height:50,valueDisplay:"only",ports:[],addons:[Mt(1)]};const Ft={...function(t){return{type:t,labelKey:`devices.${t}.name`,width:100,height:130,valueDisplay:"with_state",ports:[{id:"supply_out",labelKey:"devices.heat_source.ports.supply_out",kind:"outlet",position:{x:100,y:35}},{id:"return_in",labelKey:"devices.heat_source.ports.return_in",kind:"inlet",position:{x:100,y:105}}]}}("heating_boiler"),addons:[Et("supply","return"),Mt(4),{type:"pump",max:1},At,St,kt]},Wt={type:"solar_collector",labelKey:"devices.solar_collector.name",width:150,height:100,valueDisplay:"with_state",ports:[{id:"hot_out",labelKey:"devices.solar_collector.ports.hot_out",kind:"outlet",position:{x:150,y:22}},{id:"cold_in",labelKey:"devices.solar_collector.ports.cold_in",kind:"inlet",position:{x:150,y:84}}],addons:[Et("collector"),Mt(2),{type:"pump",max:1},kt]};function Yt(t,e,i){const o=(t,e,i,o)=>({id:t,labelKey:`devices.four_port.ports.${t}`,kind:e,position:{x:i,y:o}});return{type:t,labelKey:`devices.${t}.name`,width:e,height:i,ports:[o("primary_in","inlet",0,30),o("primary_out","outlet",0,i-30),o("secondary_out","outlet",e,30),o("secondary_in","inlet",e,i-30)]}}const Jt=Et("primary_supply","primary_return","secondary_supply","secondary_return"),Xt={...Yt("hydraulic_separator",80,160),valueDisplay:"only",addons:[Jt,Mt(2)]},Qt={...Yt("plate_heat_exchanger",100,120),addons:[Jt,Mt(2)]},Gt={type:"expansion_vessel",labelKey:"devices.expansion_vessel.name",width:70,height:110,valueDisplay:"only",ports:[{id:"connection",labelKey:"devices.expansion_vessel.ports.connection",kind:"inlet",position:{x:35,y:110}}],addons:[Mt(1),kt]},te={type:"safety_valve",labelKey:"devices.safety_valve.name",width:70,height:90,ports:[{id:"in",labelKey:"devices.safety_valve.ports.in",kind:"inlet",position:{x:30,y:90}},{id:"discharge",labelKey:"devices.safety_valve.ports.discharge",kind:"outlet",position:{x:70,y:56}}],addons:[kt]},ee={type:"zone_valve",labelKey:"devices.zone_valve.name",width:80,height:70,ports:[{id:"in",labelKey:"devices.inline.ports.in",kind:"inlet",position:{x:0,y:50}},{id:"out",labelKey:"devices.inline.ports.out",kind:"outlet",position:{x:80,y:50}}],addons:[Et("room"),kt]};function ie(t){return{type:t,labelKey:`devices.${t}.name`,width:130,height:80,valueDisplay:"with_state",ports:[{id:"in",labelKey:"devices.terminal.ports.in",kind:"inlet",position:{x:0,y:66}},{id:"out",labelKey:"devices.terminal.ports.out",kind:"outlet",position:{x:130,y:66}}]}}const oe={...ie("radiator"),addons:[Et("room"),{type:"actuator",max:1},St,kt,{type:"window",max:1}]},ne={...ie("fancoil"),addons:[Et("room","supply"),{type:"actuator",max:1},{type:"fan",max:1},At,St,kt]},re={type:"water_supply",labelKey:"devices.water_supply.name",width:80,height:60,ports:[{id:"out",labelKey:"devices.inline.ports.out",kind:"outlet",position:{x:80,y:30}}],addons:[Mt(2),kt]},ae={type:"dhw_outlet",labelKey:"devices.dhw_outlet.name",width:80,height:60,ports:[{id:"in",labelKey:"devices.inline.ports.in",kind:"inlet",position:{x:0,y:30}}],addons:[Mt(2)]},se=[Ut,Ft,Wt,Ot,Xt,Qt,Gt,te,Ct,Vt,ee,Ht,Kt,Dt,oe,ne,Rt,jt,Bt,qt,re,ae];se.map(t=>t.type);const de=[{id:"tank_buffer",type:Ot.type,labelKey:"devices.tank.name_buffer",addons:[{type:"direct_source"},{type:"direct_heating"}]},{id:"tank_dhw",type:Ot.type,labelKey:"devices.tank.name_dhw",addons:[{type:"heat_exchanger"},{type:"dhw"}]}],le=se.flatMap(t=>t.type===Ot.type?de:[{id:t.type,type:t.type,labelKey:t.labelKey}]);function ce(t){return t.type===Ot.type?Tt(t):t.type}const pe=new Map(se.map(t=>[t.type,t]));function he(t){return pe.get(t)}function ue(t){const e=pe.get(t.type);return e?.resolve?e.resolve(t):e}const ve="custom:heating-visualizer-card",_e={outdoor_unit:"heat_pump",gas_boiler:"heating_boiler",electric_boiler:"heating_boiler",solid_fuel_boiler:"heating_boiler",flow_meter:"pipe_sensor",pressure_gauge:"pipe_sensor",heat_meter:"pipe_sensor",dhw_circulation_pump:"circulation_pump"},ye={1:["middle"],2:["top","bottom"],3:["top","middle","bottom"],4:["top","upper","lower","bottom"],5:[...xt]};function me(t){const e=_e[t.type]??t.type,i=[];return t.channels?.length&&i.push(...function(t,e){if("manifold"===t)return e.map(t=>({...t,type:"loop"}));const i=e.filter(t=>t.entity_id);if("buffer_tank"===t){const t=ye[Math.min(i.length,5)]??[];return i.slice(0,5).map((e,i)=>({...e,type:"temperature",slot:t[i]}))}if("boiler"===t){const t=[wt[0],wt[2]];return i.slice(0,2).map((e,i)=>({...e,type:"temperature",slot:t[i]}))}return i.map(t=>({...t,type:"value"}))}(e,t.channels)),"manifold"!==e||t.channels?.length||i.push(...Array.from({length:4},()=>({type:"loop"}))),t.heater?.entity_id&&i.push({...t.heater,type:"electric_heater"}),{id:t.id,type:e,name:t.name,position:t.position??{x:0,y:0},rotation:t.rotation,...t.state,addons:i.length?i:void 0}}function $e(t){const e=t,i=("number"==typeof e.schema_version?e.schema_version:e.schema?1:2)<2?function(t){const{schema:e,language:i,translations:o,...n}=t,r=(e?.edges??[]).map(t=>({from:`${t.from.nodeId}.${t.from.portId}`,to:`${t.to.nodeId}.${t.to.portId}`})),a=(e?.overlays??[]).map(({labelKey:t,...e})=>e);return{...n,type:ve,schema_version:2,nodes:(e?.nodes??[]).map(me),connections:r,overlays:a}}(e):{...e};return{...i,type:"string"==typeof e.type?e.type:ve,schema_version:2,nodes:(i.nodes??[]).map(t=>function(t){const e=t.addons??[];if("boiler"===t.type){const i=e.some(t=>"heat_exchanger"===t.type)?2:1;return{...t,type:"tank",addons:[...e.filter(t=>"heat_exchanger"!==t.type),...Array.from({length:i},()=>({type:"heat_exchanger"})),{type:"dhw"}]}}if("buffer_tank"===t.type)return{...t,type:"tank",addons:[...e,{type:"direct_source"},{type:"direct_heating"}]};return t}(_e[t.type]?{...t,type:_e[t.type]}:t)),connections:i.connections??[],overlays:i.overlays??[]}}const fe="en",ge={en:{devices:{heat_pump:{name:"Heat pump",ports:{cold_in:"Heating water return",hot_out:"Heating water out"}},valve_3way:{name:"3-way valve",ports:{in:"Inlet",out_a:"Outlet A",out_b:"Outlet B"}},tank:{name:"Tank",name_buffer:"Buffer tank",name_dhw:"DHW tank",ports:{source_in:"From heat source",source_out:"Back to heat source",coil_in:"Heat exchanger coil supply",coil_out:"Heat exchanger coil return",coil2_in:"Second coil supply",coil2_out:"Second coil return",hot_out:"Hot water outlet",supply_out:"To heating system",circulation_in:"Hot water circulation",return_in:"Return from heating system",cold_in:"Cold water inlet"}},junction:{name:"Junction",ports:{in:"Inlet",out_top:"Top outlet",out_bottom:"Bottom outlet",in_top:"Top inlet",in_bottom:"Bottom inlet",out:"Outlet"},variants:{split:"Split (1 → 2)",merge:"Merge (2 → 1)"}},circulation_pump:{name:"Circulation pump",ports:{in:"Inlet",out:"Outlet"}},floor_heating:{name:"Floor heating",ports:{in:"Supply",out:"Return"}},manifold:{name:"Floor heating manifold",ports:{supply_in:"Supply",return_out:"Return",loop_out:"Loop {0} supply",loop_in:"Loop {0} return"}},mixing_valve:{name:"Mixing valve",ports:{hot_in:"Hot branch",return_in:"Return (bypass)",mixed_out:"Mixed water"}},electric_heater:{name:"Electric flow heater",ports:{in:"Inlet",out:"Outlet"}},inline:{ports:{in:"Inlet",out:"Outlet"}},pipe_sensor:{name:"Sensor / meter"},heat_source:{ports:{supply_out:"Supply",return_in:"Return"}},heating_boiler:{name:"Heating boiler"},solar_collector:{name:"Solar collector",ports:{hot_out:"Hot outlet",cold_in:"Cold inlet"}},four_port:{ports:{primary_in:"Primary supply",primary_out:"Primary return",secondary_out:"Secondary supply",secondary_in:"Secondary return"}},hydraulic_separator:{name:"Hydraulic separator"},plate_heat_exchanger:{name:"Plate heat exchanger"},expansion_vessel:{name:"Expansion vessel",ports:{connection:"Connection"}},safety_valve:{name:"Safety valve",ports:{in:"Inlet",discharge:"Discharge"}},zone_valve:{name:"Zone valve"},terminal:{ports:{in:"Supply",out:"Return"}},radiator:{name:"Radiator"},fancoil:{name:"Fan coil / convector"},outdoor_temperature:{name:"Outdoor temperature"},water_supply:{name:"Cold water supply"},dhw_outlet:{name:"Hot water taps"}},addons:{temperature:{name:"Temperature sensor"},value:{name:"Value"},electric_heater:{name:"Electric immersion heater"},pump:{name:"Pump"},actuator:{name:"Actuator"},fan:{name:"Fan"},mode:{name:"Operating mode"},setpoint:{name:"Setpoint"},defrost:{name:"Defrost"},alarm:{name:"Alarm"},window:{name:"Window"},heat_exchanger:{name:"Heat exchanger coil",hint:"Coil heated by a heat source; adds its supply and return."},direct_source:{name:"Heat source connection",hint:"Heating water from the heat source flows straight into the tank."},direct_heating:{name:"Heating system connection",hint:"Supply to and return from the heating system."},dhw:{name:"Domestic hot water",hint:"Cold water inlet and hot water outlet."},circulation:{name:"Hot water circulation",hint:"Return of the hot water circulation loop."},loop:{name:"Loop"}},slots:{top:"top",upper:"upper",middle:"middle",lower:"lower",bottom:"bottom",supply:"supply",return:"return",outdoor:"outdoor",evaporator:"evaporator",room:"room",floor:"floor",mixed:"mixed water",inlet:"inlet",outlet:"outlet",collector:"collector",primary_supply:"primary supply",primary_return:"primary return",secondary_supply:"secondary supply",secondary_return:"secondary return"},templates:{heat_pump_floor:"Heat pump + floor heating",heat_pump_dhw_floor:"Heat pump + DHW tank + floor heating",heat_pump_buffer_radiators:"Heat pump + buffer tank + radiators",boiler_radiators:"Boiler + radiators"},editor:{schema_tab:"Schema",overlay_tab:"Overlays",device_type:"Device type",add_device:"Add device",add_from_entity:"Add from entity",add_from_entity_helper:"Pick the device's main entity; the device type is suggested",choose_type:"Choose device type",suggested_title:"Suggested add-ons",suggested_hint:"Other entities of the same Home Assistant device.",add_all:"Add all",template:"Template",insert_template:"Insert template",auto_layout:"Arrange automatically",undo_layout:"Undo arrangement",actions_title:"Actions",tap_action:"Tap",hold_action:"Hold",double_tap_action:"Double tap",action_default_tap:"Default (more info)",action_default:"Default (nothing)",action_more_info:"More info",action_toggle:"Toggle",action_navigate:"Navigate",action_none:"Nothing",navigation_path:"Navigation path",pipe_style:"Pipe style",pipe_style_orthogonal:"Right-angled pipes",pipe_style_curved:"Curved pipes",drawing_mode:"Drawing mode",drawing_hint:"Drag devices; click two ports to connect them.",select_hint:"Click a device to select it; arrow keys move it (Shift = faster).",move_left:"Move left",move_up:"Move up",move_down:"Move down",move_right:"Move right",empty_hint:"Add a device to start building your schema.",devices_title:"Devices",no_entity:"No entity",ports_connected:"{0}/{1} connected",addon_count:"{0} add-ons",back:"Back",name:"Name",name_helper:"Empty = device type name",variant:"Variant",volume:"Volume (l)",volume_helper:"Sets the size of the drawing.",entity:"Entity",state_entity:"State entity (optional)",state_entity_helper:"Shows whether the device is running (green frame, animation) and opens on tap. Leave empty if the device has no entity of its own – add-ons then show the activity.",value_entity:"Value entity",ha_device:"Home Assistant device (optional)",ha_device_helper:"Where the entities come from, e.g. the heat pump integration. Its entities are offered first and suggested as add-ons.",active_state:"Active state",active_state_helper:"Empty = hvac_action, otherwise on / heat / open",value_attribute:"Displayed attribute",value_attribute_helper:"Empty = entity state, e.g. current_temperature",actuator_entity:"Actuator entity",position_attribute:"Position attribute (%)",position_attribute_helper:"Empty = current_position or the entity state",valve_attribute:"Valve position attribute",valve_attribute_helper:"Default: position",branch_a:"Value for branch A",branch_a_helper:"Default: a",branch_b:"Value for branch B",branch_b_helper:"Default: b",loop_temperature:"Room temperature entity",addons_title:"Add-ons",addons_empty:"No add-ons yet.",addon_type:"Add-on type",add_addon:"Add add-on",remove_addon:"Remove add-on",remaining:"{0} left",slot:"Position",addon_name_helper:"Empty = add-on type and position",connections_title:"Connections",not_connected:"Not connected",connect_to:"Connect to",disconnect:"Disconnect",connection_pending:"Connecting from {0} — click a compatible port",delete_connection:"Delete selected connection",invalid_connections:"{0} connections point to missing or incompatible ports.",remove_invalid:"Remove",position_title:"Position",rotate:"Rotate",delete_device:"Delete device",add_overlay:"Add overlay",overlays_empty:"No overlays yet.",overlay_n:"Overlay {0}",remove_overlay:"Remove overlay"},overlay:{entity:"Entity",name:"Name",name_helper:"Empty = entity name",name_yaml:"The name is configured in YAML.",template:"Display template",template_helper:"Placeholders: {{ state }}, {{ attr('attribute') }}. Empty = formatted state",rules:"Conditional rules",add_rule:"Add rule",remove_rule:"Remove rule",rule:{condition:"Condition",condition_state:"State equals",condition_numeric:"Numeric value",entity:"Entity",entity_helper:"Empty = overlay entity",state:"State",above:"Above",below:"Below",color:"Text color",color_helper:"Home Assistant color name or any CSS color",hide:"Hide overlay"}},card:{empty:"No schema configured. Edit this card to design your heating layout."},a11y:{schema:"Heating schema",active:"running"}},cs:{devices:{heat_pump:{name:"Tepelné čerpadlo",ports:{cold_in:"Vratka topné vody",hot_out:"Výstup topné vody"}},valve_3way:{name:"Třícestný ventil",ports:{in:"Vstup",out_a:"Výstup A",out_b:"Výstup B"}},tank:{name:"Nádrž",name_buffer:"Akumulační nádrž",name_dhw:"Zásobník teplé vody (bojler)",ports:{source_in:"Od zdroje tepla",source_out:"Zpět ke zdroji tepla",coil_in:"Výměník – přívod",coil_out:"Výměník – vratka",coil2_in:"Druhý výměník – přívod",coil2_out:"Druhý výměník – vratka",hot_out:"Teplá voda – výstup",supply_out:"Do topného systému",circulation_in:"Cirkulace teplé vody",return_in:"Vratka z topného systému",cold_in:"Studená voda – vstup"}},junction:{name:"Uzel",ports:{in:"Vstup",out_top:"Horní výstup",out_bottom:"Spodní výstup",in_top:"Horní vstup",in_bottom:"Spodní vstup",out:"Výstup"},variants:{split:"Rozbočení (1 → 2)",merge:"Sloučení (2 → 1)"}},circulation_pump:{name:"Oběhové čerpadlo",ports:{in:"Vstup",out:"Výstup"}},floor_heating:{name:"Podlahové topení",ports:{in:"Přívod",out:"Vratka"}},manifold:{name:"Rozdělovač podlahového topení",ports:{supply_in:"Přívod",return_out:"Vratka",loop_out:"Okruh {0} – přívod",loop_in:"Okruh {0} – vratka"}},mixing_valve:{name:"Směšovací ventil",ports:{hot_in:"Teplá větev",return_in:"Vratka (bypass)",mixed_out:"Smíšená voda"}},electric_heater:{name:"Průtokový elektrický ohřívač",ports:{in:"Vstup",out:"Výstup"}},inline:{ports:{in:"Vstup",out:"Výstup"}},pipe_sensor:{name:"Čidlo / měřidlo"},heat_source:{ports:{supply_out:"Přívod",return_in:"Vratka"}},heating_boiler:{name:"Kotel"},solar_collector:{name:"Solární kolektor",ports:{hot_out:"Teplý výstup",cold_in:"Studený vstup"}},four_port:{ports:{primary_in:"Primár – přívod",primary_out:"Primár – vratka",secondary_out:"Sekundár – přívod",secondary_in:"Sekundár – vratka"}},hydraulic_separator:{name:"Hydraulický vyrovnávač"},plate_heat_exchanger:{name:"Deskový výměník"},expansion_vessel:{name:"Expanzní nádoba",ports:{connection:"Připojení"}},safety_valve:{name:"Pojistný ventil",ports:{in:"Vstup",discharge:"Výtok"}},zone_valve:{name:"Zónový ventil"},terminal:{ports:{in:"Přívod",out:"Vratka"}},radiator:{name:"Radiátor"},fancoil:{name:"Fancoil / konvektor"},outdoor_temperature:{name:"Venkovní teplota"},water_supply:{name:"Vodovodní přípojka"},dhw_outlet:{name:"Odběr teplé vody"}},addons:{temperature:{name:"Teplotní čidlo"},value:{name:"Hodnota"},electric_heater:{name:"Elektrická patrona"},pump:{name:"Čerpadlo"},actuator:{name:"Pohon"},fan:{name:"Ventilátor"},mode:{name:"Provozní režim"},setpoint:{name:"Požadovaná teplota"},defrost:{name:"Odmrazování"},alarm:{name:"Porucha"},window:{name:"Okno"},heat_exchanger:{name:"Výměník (topný had)",hint:"Had ohřívaný zdrojem tepla; přidá jeho přívod a vratku."},direct_source:{name:"Připojení zdroje tepla",hint:"Topná voda ze zdroje proudí přímo do nádrže."},direct_heating:{name:"Připojení topného systému",hint:"Přívod do topného systému a vratka z něj."},dhw:{name:"Teplá užitková voda",hint:"Vstup studené vody a výstup teplé vody."},circulation:{name:"Cirkulace teplé vody",hint:"Návrat cirkulačního okruhu teplé vody."},loop:{name:"Okruh"}},slots:{top:"nahoře",upper:"horní část",middle:"uprostřed",lower:"dolní část",bottom:"dole",supply:"přívod",return:"vratka",outdoor:"venkovní",evaporator:"výparník",room:"místnost",floor:"podlaha",mixed:"smíšená voda",inlet:"vstup",outlet:"výstup",collector:"kolektor",primary_supply:"primár – přívod",primary_return:"primár – vratka",secondary_supply:"sekundár – přívod",secondary_return:"sekundár – vratka"},templates:{heat_pump_floor:"Tepelné čerpadlo + podlahové topení",heat_pump_dhw_floor:"Tepelné čerpadlo + bojler + podlahové topení",heat_pump_buffer_radiators:"Tepelné čerpadlo + akumulační nádrž + radiátory",boiler_radiators:"Kotel + radiátory"},editor:{schema_tab:"Schéma",overlay_tab:"Popisky",device_type:"Typ zařízení",add_device:"Přidat zařízení",add_from_entity:"Přidat z entity",add_from_entity_helper:"Vyberte hlavní entitu zařízení, typ se navrhne sám",choose_type:"Vyberte typ zařízení",suggested_title:"Navržené doplňky",suggested_hint:"Další entity téhož zařízení v Home Assistantu.",add_all:"Přidat vše",template:"Šablona",insert_template:"Vložit šablonu",auto_layout:"Rozmístit automaticky",undo_layout:"Vrátit rozmístění",actions_title:"Akce",tap_action:"Klepnutí",hold_action:"Podržení",double_tap_action:"Dvojité klepnutí",action_default_tap:"Výchozí (více informací)",action_default:"Výchozí (nic)",action_more_info:"Více informací",action_toggle:"Přepnout",action_navigate:"Přejít na stránku",action_none:"Nic",navigation_path:"Cesta stránky",pipe_style:"Vzhled potrubí",pipe_style_orthogonal:"Pravoúhlé potrubí",pipe_style_curved:"Oblouky",drawing_mode:"Režim kreslení",drawing_hint:"Přetáhněte zařízení; kliknutím na dva porty je propojíte.",select_hint:"Kliknutím vyberete zařízení, šipkami ho posunete (Shift = rychleji).",move_left:"Posunout vlevo",move_up:"Posunout nahoru",move_down:"Posunout dolů",move_right:"Posunout vpravo",empty_hint:"Přidejte zařízení a začněte sestavovat schéma.",devices_title:"Zařízení",no_entity:"Bez entity",ports_connected:"připojeno {0}/{1}",addon_count:"doplňky: {0}",back:"Zpět",name:"Název",name_helper:"Prázdné = název typu zařízení",variant:"Provedení",volume:"Objem (l)",volume_helper:"Určuje velikost výkresu.",entity:"Entita",state_entity:"Stavová entita (volitelné)",state_entity_helper:"Určuje, zda zařízení běží (zelený rámeček, animace), a otevře se po klepnutí. Nemá-li zařízení vlastní entitu, nechte prázdné – činnost pak ukazují doplňky.",value_entity:"Entita hodnoty",ha_device:"Zařízení v Home Assistantu (volitelné)",ha_device_helper:"Odkud entity pocházejí, např. integrace tepelného čerpadla. Jeho entity se nabízejí jako první a navrhnou se jako doplňky.",active_state:"Aktivní stav",active_state_helper:"Prázdné = podle hvac_action, jinak on / heat / open",value_attribute:"Zobrazený atribut",value_attribute_helper:"Prázdné = stav entity, např. current_temperature",actuator_entity:"Entita pohonu",position_attribute:"Atribut polohy (%)",position_attribute_helper:"Prázdné = current_position nebo stav entity",valve_attribute:"Atribut polohy ventilu",valve_attribute_helper:"Výchozí: position",branch_a:"Hodnota pro větev A",branch_a_helper:"Výchozí: a",branch_b:"Hodnota pro větev B",branch_b_helper:"Výchozí: b",loop_temperature:"Entita teploty místnosti",addons_title:"Doplňky",addons_empty:"Zatím žádné doplňky.",addon_type:"Typ doplňku",add_addon:"Přidat doplněk",remove_addon:"Odebrat doplněk",remaining:"zbývá {0}",slot:"Umístění",addon_name_helper:"Prázdné = typ doplňku a umístění",connections_title:"Propojení",not_connected:"Nepřipojeno",connect_to:"Připojit k",disconnect:"Odpojit",connection_pending:"Napojování z {0} — klikněte na kompatibilní port",delete_connection:"Smazat vybrané propojení",invalid_connections:"Propojení s neexistujícím nebo nekompatibilním portem: {0}",remove_invalid:"Odstranit",position_title:"Poloha",rotate:"Otočit",delete_device:"Smazat zařízení",add_overlay:"Přidat popisek",overlays_empty:"Zatím žádné popisky.",overlay_n:"Popisek {0}",remove_overlay:"Odebrat popisek"},overlay:{entity:"Entita",name:"Název",name_helper:"Prázdné = název entity",name_yaml:"Název je nastaven v YAML.",template:"Šablona zobrazení",template_helper:"Zástupné symboly: {{ state }}, {{ attr('atribut') }}. Prázdné = formátovaný stav",rules:"Podmíněná pravidla",add_rule:"Přidat pravidlo",remove_rule:"Odebrat pravidlo",rule:{condition:"Podmínka",condition_state:"Stav je roven",condition_numeric:"Číselná hodnota",entity:"Entita",entity_helper:"Prázdné = entita popisku",state:"Stav",above:"Nad",below:"Pod",color:"Barva textu",color_helper:"Název barvy Home Assistantu nebo libovolná barva CSS",hide:"Skrýt popisek"}},card:{empty:"Schéma není nakonfigurováno. Upravte kartu a navrhněte topné schéma."},a11y:{schema:"Schéma vytápění",active:"v provozu"}}};function be(t,e){let i=t;for(const t of e.split(".")){if(void 0===i||"string"==typeof i)return;i=i[t]}return"string"==typeof i?i:void 0}class xe{constructor(t){this.language=t}t(t,...e){let i=be(ge[this.language],t)??be(ge[fe],t)??t;return e.forEach((t,e)=>{i=i.replace(`{${e}}`,t)}),i}}function we(t){return new xe(function(t){if(!t)return fe;if(ge[t])return t;const e=t.split("-")[0];return ge[e]?e:fe}(t))}const ke="states",Ae="hassFormatters",Se="hassInternationalization";class Me{constructor(t,e){this._host=t,this._context=e,this._callback=(t,e)=>{this._unsubscribe&&this._unsubscribe!==e&&this._unsubscribe(),this._unsubscribe=e,t!==this.value&&(this.value=t,this._host.requestUpdate())},t.addController(this)}hostConnected(){const t=new Event("context-request",{bubbles:!0,composed:!0});t.context=this._context,t.contextTarget=this._host,t.callback=this._callback,t.subscribe=!0,this._host.dispatchEvent(t)}hostDisconnected(){this._unsubscribe?.(),this._unsubscribe=void 0}}function Ee(t){return((t??0)%360+360)%360}function Ce(t,e){const i=e*Math.PI/180,o=Math.cos(i),n=Math.sin(i);return{x:Math.round(1e3*(t.x*o-t.y*n))/1e3||0,y:Math.round(1e3*(t.x*n+t.y*o))/1e3||0}}function Ie(t,e){const{x:i,y:o}=e.position,n=[[i,{x:-1,y:0}],[t.width-i,{x:1,y:0}],[o,{x:0,y:-1}],[t.height-o,{x:0,y:1}]];return n.sort((t,e)=>t[0]-e[0]),n[0][1]}function Pe(t,e){const i=ue(t);if(!i)return;const o=i.ports.find(t=>t.id===e);if(!o)return;const n=Ee(t.rotation),r=i.width/2,a=i.height/2,s=Ce({x:o.position.x-r,y:o.position.y-a},n);return{nodeId:t.id,portId:o.id,x:t.position.x+r+s.x,y:t.position.y+a+s.y,kind:o.kind,direction:Ce(Ie(i,o),n)}}function ze(t,e){const i=Ee(t.rotation)%180!=0,o=i?e.height:e.width,n=i?e.width:e.height;return{x:t.position.x+(e.width-o)/2,y:t.position.y+(e.height-n)/2,width:o,height:n}}const Ne=(t,e,i)=>(t-e)*i>=0;function Le(t,e,i,o){const n=0!==e.x,r=0!==o.x;if(n&&r){const n=(t.x+i.x)/2;if(Ne(n,t.x,e.x)&&Ne(n,i.x,o.x))return[{x:n,y:t.y},{x:n,y:i.y}];const r=(t.y+i.y)/2;return[{x:t.x,y:r},{x:i.x,y:r}]}if(!n&&!r){const n=(t.y+i.y)/2;if(Ne(n,t.y,e.y)&&Ne(n,i.y,o.y))return[{x:t.x,y:n},{x:i.x,y:n}];const r=(t.x+i.x)/2;return[{x:r,y:t.y},{x:r,y:i.y}]}if(n){const n={x:i.x,y:t.y};return Ne(n.x,t.x,e.x)&&Ne(n.y,i.y,o.y)?[n]:[{x:t.x,y:i.y}]}const a={x:t.x,y:i.y};return Ne(a.y,t.y,e.y)&&Ne(a.x,i.x,o.x)?[a]:[{x:i.x,y:t.y}]}function Te(t,e){const i=function(t,e){const i={x:t.x+20*t.direction.x,y:t.y+20*t.direction.y},o={x:e.x+20*e.direction.x,y:e.y+20*e.direction.y};return function(t){const e=t.filter((e,i)=>0===i||e.x!==t[i-1].x||e.y!==t[i-1].y);return e.filter((t,i)=>{if(0===i||i===e.length-1)return!0;const o=e[i-1],n=e[i+1];return(o.x-t.x)*(n.y-t.y)!==(o.y-t.y)*(n.x-t.x)})}([{x:t.x,y:t.y},i,...Le(i,t.direction,o,e.direction),o,{x:e.x,y:e.y}])}(t,e);let o=`M ${i[0].x} ${i[0].y}`;for(let t=1;t<i.length-1;t++){const[e,n,r]=[i[t-1],i[t],i[t+1]],a=Math.hypot(n.x-e.x,n.y-e.y),s=Math.hypot(r.x-n.x,r.y-n.y),d=Math.min(8,a/2,s/2),l={x:n.x-(n.x-e.x)/a*d,y:n.y-(n.y-e.y)/a*d},c={x:n.x+(r.x-n.x)/s*d,y:n.y+(r.y-n.y)/s*d};o+=` L ${l.x} ${l.y} Q ${n.x} ${n.y} ${c.x} ${c.y}`}const n=i[i.length-1];return`${o} L ${n.x} ${n.y}`}function Oe(t,e=10){return Math.round(t/e)*e}function je(t,e,i){if(!t||!i.entity_id)return"—";const o=t[i.entity_id];if(!o)return"—";if(i.template)return function(t,e,i){return t.replace(/\{\{\s*state\s*\}\}/g,e).replace(/\{\{\s*attr\(['"](\w+)['"]\)\s*\}\}/g,(t,e)=>String(i[e]??""))}(i.template,o.state,o.attributes);if(e)return e.formatEntityState(o);const n=o.attributes.unit_of_measurement;return n?`${o.state} ${n}`:o.state}const He=new Set(["primary","accent","disabled","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"]);function De(t){return He.has(t)?`var(--${t}-color)`:t}function Ke(t,e,i){const o=t[e.entity||i];if(!o)return!1;if("state"===e.condition)return void 0!==e.state&&o.state===e.state;if(void 0===e.above&&void 0===e.below)return!1;const n=Number(o.state);return!Number.isNaN(n)&&((void 0===e.above||n>e.above)&&(void 0===e.below||n<e.below))}const Ve=new Set(["heating","preheating"]);function Re(t,e,i){if(!t||!e?.entity_id)return{active:!1};const o=t[e.entity_id];if(!o)return{active:!1};const n=e.value_attribute,r=void 0!==n?o.attributes[n]:void 0,a=void 0!==r,s=a?r:o.state,d=Number(s),l=o.attributes.unit_of_measurement;let c;c=void 0!==n&&a?i?i.formatEntityAttributeValue(o,n):String(r):i?i.formatEntityState(o):l?`${o.state} ${l}`:o.state;const p=function(t,e){if(void 0!==e)return t.state===e;const i=t.attributes.hvac_action;return"string"==typeof i?Ve.has(i):"on"===t.state||"heat"===t.state||"open"===t.state}(o,e.active_state),h=e.mode_attribute??"position",u=String(o.attributes[h]??o.state??"");let v;return u===(e.branch_a_value??"a")&&(v="a"),u===(e.branch_b_value??"b")&&(v="b"),{active:p,valveBranch:v,value:c,numeric:""!==String(s??"").trim()&&Number.isFinite(d)?d:void 0,position:Ue(o,e.mode_attribute),unit:l,fromAttribute:a,deviceClass:o.attributes.device_class}}function Ue(t,e){const i=e?t.attributes[e]:t.attributes.current_position??t.state,o=Number(i);if(null!=i&&""!==i&&Number.isFinite(o))return Math.min(100,Math.max(0,o))}function Be(t){return void 0!==t&&"none"!==t.action}function Ze(t){return t.tap_action?Be(t.tap_action):Boolean(t.entity)}function qe(t,e){if(e.overlayId){const i=t.overlays.find(t=>t.id===e.overlayId);if(!i)return;return{entity:i.entity_id||void 0,tap_action:i.tap_action,hold_action:i.hold_action,double_tap_action:i.double_tap_action}}const i=t.nodes.find(t=>t.id===e.nodeId);if(!i)return;const o=void 0!==e.addonIndex?i.addons?.[e.addonIndex]:void 0;return o?.entity_id?{entity:o.entity_id}:{entity:i.entity_id,tap_action:i.tap_action,hold_action:i.hold_action,double_tap_action:i.double_tap_action}}function Fe(t,e){return(t.addons??[]).filter(t=>t.config.type===e).map(t=>t.state)}function We(t){return(t.addons??[]).filter(t=>"electric_heater"===t.config.type).map(t=>t.state)}function Ye(t,e){return void 0!==t.active_state||void 0===e.numeric?e:{...e,active:e.numeric>0}}function Je(t,e){return Fe(t,e).some(t=>t.active)}const Xe=["pump","fan","electric_heater","loop"];const Qe="#ef5350",Ge="#42a5f5",ti="#4caf50",ei="#ff7043",ii="var(--card-background-color, #1c1c1c)",oi="var(--divider-color, #888)",ni="var(--primary-color, #03a9f4)",ri=20,ai=60;function si(t){if(void 0===t)return oi;const e=Math.min(1,Math.max(0,(t-ri)/(ai-ri)));return`hsl(${Math.round(220*(1-e))}, 75%, 50%)`}function di(t,e,i=ti){return t.active?i:e?ni:oi}function li(t){return t?2.5:1.5}function ci(t,e){return t.ports.map(t=>Z`
    <circle
      class="port port-${t.kind}"
      data-port-id="${t.id}"
      cx="${t.position.x}" cy="${t.position.y}" r="5"
      fill="${ii}"
      stroke="${"inlet"===t.kind?"#4fc3f7":"#ff8a65"}"
      stroke-width="2"
    ><title>${e.t(t.labelKey,...t.labelArgs??[])}</title></circle>
  `)}function pi(t,e,i,o){const n=i/6;let r=`M ${t} ${e}`;for(let i=1;i<=6;i++)r+=` L ${t+i*n} ${e+(i%2==0?0:-8)}`;const a=o.active?ei:oi;return Z`
    <path class="heater ${o.active?"active":""}" d="${r}" fill="none"
      stroke="${a}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
  `}function hi(t,e){return t.ports.map(i=>{const{x:o,y:n}=i.position,r=0===o?e:o===t.width?-e:0,a=0===n?e:n===t.height?-e:0;return Z`<line x1="${o}" y1="${n}" x2="${o+r}" y2="${n+a}" stroke="${oi}" stroke-width="2" />`})}function ui(t){return void 0!==t.numeric||t.fromAttribute?t.value:void 0}const vi="#ffb300";function _i(t,e){return`M ${t} ${e-7} C ${t+5} ${e-1}, ${t+5} ${e+6}, ${t} ${e+6} C ${t-5} ${e+6}, ${t-5} ${e-1}, ${t} ${e-7} Z`}function yi(t,e,i,o,n){switch(t){case"heating_boiler":return function(t,e,i,o){const n=t.width/2-4,r=t.height/2+14,a=ui(o),s=o.active?ei:oi,d=[-14,0,14].map(t=>{const e=n+t;return Z`
      <path d="M ${e} ${r+18} C ${e-6} ${r+10}, ${e+6} ${r+2}, ${e} ${r-6}
        C ${e-6} ${r-14}, ${e+6} ${r-20}, ${e} ${r-26}"
        fill="none" stroke="${s}" stroke-width="2.5" stroke-linecap="round" />
    `});return Z`
    <g class="device device-heat-source">
      ${hi(t,12)}
      <rect x="8" y="10" width="${t.width-20}" height="${t.height-20}" rx="8"
        fill="${ii}" stroke="${di(o,i,ei)}"
        stroke-width="${li(i)}" />
      ${a?Z`<text x="${n}" y="30" text-anchor="middle" class="device-value">${a}</text>`:Z``}
      ${d}
      ${ci(t,e)}
    </g>
  `}(e,i,o,n);case"solar_collector":return function(t,e,i,o){const n=di(o,i,vi),r=ui(o);return Z`
    <g class="device device-solar-collector">
      <path d="M 124 22 L ${t.width} 22 M 100 84 L ${t.width} 84" stroke="${oi}" stroke-width="2" />
      <path d="M 10 84 L 36 22 L 124 22 L 100 84 Z" fill="${ii}"
        stroke="${n}" stroke-width="${li(i)}" stroke-linejoin="round" />
      <path d="M 58 22 L 32 84 M 80 22 L 54 84 M 102 22 L 76 84 M 23 53 L 112 53"
        stroke="${oi}" stroke-width="1" />
      <circle cx="20" cy="14" r="6" fill="${o.active?vi:"none"}" stroke="${vi}" stroke-width="1.5" />
      ${r?Z`<text x="67" y="${t.height-2}" text-anchor="middle" class="device-value">${r}</text>`:Z``}
      ${ci(t,e)}
    </g>
  `}(e,i,o,n);case"hydraulic_separator":return function(t,e,i,o){const n=25,r=t.width-25,a=t.height-8,s=t.height/2,d=ui(o);return Z`
    <g class="device device-hydraulic-separator">
      ${hi(t,n)}
      <rect x="${n}" y="${8}" width="${r-n}" height="${s-8}" fill="${Qe}" opacity="0.25" />
      <rect x="${n}" y="${s}" width="${r-n}" height="${a-s}" fill="${Ge}" opacity="0.25" />
      <rect x="${n}" y="${8}" width="${r-n}" height="${a-8}" rx="${(r-n)/2}"
        fill="none" stroke="${di(o,i)}" stroke-width="${li(i)}" />
      ${d?Z`<text x="${t.width/2}" y="${s+4}" text-anchor="middle" class="device-value">${d}</text>`:Z``}
      ${ci(t,e)}
    </g>
  `}(e,i,o,n);case"plate_heat_exchanger":return function(t,e,i,o){const n=t.width-22,r=[];for(let e=29,i=0;e<n-3;e+=7,i++)r.push(Z`<line x1="${e}" y1="18" x2="${e}" y2="${t.height-18}"
      stroke="${i%2==0?Qe:Ge}" stroke-width="2" opacity="0.8" />`);return Z`
    <g class="device device-plate-heat-exchanger">
      ${hi(t,22)}
      <rect x="${22}" y="10" width="${n-22}" height="${t.height-20}" rx="4"
        fill="${ii}" stroke="${di(o,i)}" stroke-width="${li(i)}" />
      ${r}
      ${ci(t,e)}
    </g>
  `}(e,i,o,n);case"expansion_vessel":return function(t,e,i,o){const n=t.width/2,r=47,a=ui(o);return Z`
    <g class="device device-expansion-vessel">
      <line x1="${n}" y1="${86}" x2="${n}" y2="${t.height}" stroke="${oi}" stroke-width="2" />
      <rect x="13" y="${r}" width="${t.width-26}" height="${31}" fill="${Ge}" opacity="0.2" />
      <rect x="12" y="${8}" width="${t.width-24}" height="${78}" rx="${(t.width-24)/2}"
        fill="none" stroke="${di(o,i)}" stroke-width="${li(i)}" />
      <path d="M 13 ${r} Q ${n} ${55} ${t.width-13} ${r}"
        fill="none" stroke="${oi}" stroke-width="1.5" stroke-dasharray="3 2" />
      ${a?Z`<text x="${n}" y="${37}" text-anchor="middle" class="device-value">${a}</text>`:Z``}
      ${ci(t,e)}
    </g>
  `}(e,i,o,n);case"safety_valve":return function(t,e,i,o){const n=di(o,i,Qe),r=li(i),a=30,s=56;return Z`
    <g class="device device-safety-valve">
      <line x1="${a}" y1="${70}" x2="${a}" y2="${t.height}" stroke="${oi}" stroke-width="2" />
      <line x1="${44}" y1="${s}" x2="${t.width}" y2="${s}" stroke="${oi}" stroke-width="2" />
      <path d="M ${18} ${70} L ${42} ${70} L ${a} ${s} Z M ${44} ${44} L ${44} ${68} L ${a} ${s} Z"
        fill="${o.active?Qe:ii}" fill-opacity="${o.active?.5:1}"
        stroke="${n}" stroke-width="${r}" stroke-linejoin="round" />
      <path d="M ${a} ${s} L ${a} ${48} L ${23} ${44} L ${37} ${38} L ${23} ${32}
        L ${37} ${26} L ${23} ${20} L ${a} ${16}"
        fill="none" stroke="${n}" stroke-width="1.5" stroke-linejoin="round" />
      ${ci(t,e)}
    </g>
  `}(e,i,o,n);case"zone_valve":return function(t,e,i,o){const n=di(o,i),r=li(i),a=t.width/2,s=50;return Z`
    <g class="device device-zone-valve">
      <line x1="0" y1="${s}" x2="${a-16}" y2="${s}" stroke="${oi}" stroke-width="2" />
      <line x1="${a+16}" y1="${s}" x2="${t.width}" y2="${s}" stroke="${oi}" stroke-width="2" />
      <path d="M ${a-16} ${39} L ${a} ${s} L ${a-16} ${61} Z M ${a+16} ${39} L ${a} ${s} L ${a+16} ${61} Z"
        fill="${o.active?ti:ii}" fill-opacity="${o.active?.45:1}"
        stroke="${n}" stroke-width="${r}" stroke-linejoin="round" />
      <line x1="${a}" y1="${s}" x2="${a}" y2="30" stroke="${n}" stroke-width="2" />
      <rect x="${a-12}" y="10" width="24" height="20" rx="3"
        fill="${o.active?ti:ii}" stroke="${n}" stroke-width="${r}" />
      ${ci(t,e)}
    </g>
  `}(e,i,o,n);case"radiator":return function(t,e,i,o){const n=ui(o),r=[];for(let e=26;e<=t.width-24;e+=10)r.push(Z`<line x1="${e}" y1="22" x2="${e}" y2="58" stroke="${oi}" stroke-width="1.5" />`);return Z`
    <g class="device device-radiator">
      <path d="M 0 66 L 16 66 L 16 62 M ${t.width-16} 62 L ${t.width-16} 66 L ${t.width} 66"
        fill="none" stroke="${oi}" stroke-width="2" />
      <rect x="16" y="16" width="${t.width-32}" height="46" rx="4"
        fill="${o.active?ei:ii}" fill-opacity="${o.active?.2:1}"
        stroke="${di(o,i,ei)}" stroke-width="${li(i)}" />
      ${r}
      <rect x="4" y="26" width="10" height="18" rx="3" fill="${ii}" stroke="${oi}" stroke-width="1.5" />
      ${n?Z`<text x="${t.width/2}" y="10" text-anchor="middle" class="device-value">${n}</text>`:Z``}
      ${ci(t,e)}
    </g>
  `}(e,i,o,n);case"fancoil":return function(t,e,i,o){const n=ui(o);return Z`
    <g class="device device-fancoil">
      <path d="M 0 66 L 16 66 M ${t.width-16} 66 L ${t.width} 66" stroke="${oi}" stroke-width="2" />
      <rect x="16" y="12" width="${t.width-32}" height="54" rx="6"
        fill="${ii}" stroke="${di(o,i)}" stroke-width="${li(i)}" />
      <circle cx="${46}" cy="${38}" r="20" fill="none" stroke="${oi}" stroke-width="1.5" />
      <g class="fan ${o.active?"spinning":""}">
        ${[0,90,180,270].map(t=>Z`
          <path d="${"M 0 0 C 4 -7, 13 -9, 17 -4 C 12 -1, 5 0, 0 0 Z"}" transform="translate(${46} ${38}) rotate(${t})" fill="${ni}" opacity="0.75" />
        `)}
        <circle cx="${46}" cy="${38}" r="3.5" fill="${ni}" />
      </g>
      <path d="M 76 50 L 104 50 M 76 56 L 104 56" stroke="${oi}" stroke-width="1.5" />
      ${n?Z`<text x="90" y="36" text-anchor="middle" class="device-value">${n}</text>`:Z``}
      ${ci(t,e)}
    </g>
  `}(e,i,o,n);case"outdoor_temperature":return function(t,e,i){const o=e?ni:oi;return Z`
    <g class="device device-outdoor-temperature">
      <rect x="2" y="6" width="${t.width-4}" height="${t.height-12}" rx="${(t.height-12)/2}"
        fill="${ii}" stroke="${o}" stroke-width="${li(e)}" />
      <circle cx="22" cy="${t.height/2}" r="6" fill="none" stroke="#ffb300" stroke-width="1.5" />
      <path d="M 22 13 V 16 M 22 34 V 37 M 10 25 H 13 M 31 25 H 34 M 14 17 L 16 19 M 28 31 L 30 33 M 14 33 L 16 31 M 28 19 L 30 17"
        stroke="#ffb300" stroke-width="1.5" stroke-linecap="round" />
      <text x="${t.width/2+14}" y="${t.height/2+4}" text-anchor="middle" class="device-value">
        ${i.value??"—"}
      </text>
    </g>
  `}(e,o,n);case"water_supply":return function(t,e,i,o){const n=t.height/2;return Z`
    <g class="device device-water-supply">
      <line x1="36" y1="${n}" x2="${t.width}" y2="${n}" stroke="${Ge}" stroke-width="3" />
      <circle cx="22" cy="${n}" r="16" fill="${ii}" stroke="${di(o,i,Ge)}"
        stroke-width="${li(i)}" />
      <path d="${_i(22,n)}" fill="${Ge}" opacity="0.85" />
      <path d="M 50 ${n-8} L 62 ${n+8} M 50 ${n+8} L 62 ${n-8} M 50 ${n-8} V ${n+8} M 62 ${n-8} V ${n+8}"
        stroke="${oi}" stroke-width="1.5" />
      ${ci(t,e)}
    </g>
  `}(e,i,o,n);case"dhw_outlet":return function(t,e,i,o){const n=t.height/2,r=o.active?Qe:oi;return Z`
    <g class="device device-dhw-outlet">
      <line x1="0" y1="${n}" x2="40" y2="${n}" stroke="${Qe}" stroke-width="3" />
      <path d="M 40 ${n-6} H 58 Q 66 ${n-6} 66 ${n+2} V ${n+6} M 40 ${n+6} H 54 Q 58 ${n+6} 58 ${n+10}"
        fill="none" stroke="${i?ni:oi}" stroke-width="${li(i)+1}" stroke-linecap="round" />
      <path d="M 46 ${n-6} V ${n-14} M 42 ${n-14} H 50" stroke="${oi}" stroke-width="2" stroke-linecap="round" />
      <path d="${_i(62,n+18)}" fill="${r}" opacity="0.85" />
      ${ci(t,e)}
    </g>
  `}(e,i,o,n);default:return}}const mi=14;function $i(t,e,i,o,n,r){const a=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",s=i?2.5:1.5,d=t.height-10,l=(d-16-36)/(xt.length-1),c=xt.map((t,e)=>({y:34+e*l,state:n.get(t)})).filter(t=>void 0!==t.state),p=e=>t.ports.find(t=>t.id===e)?.position.y,h=[["coil_in","coil_out"],["coil2_in","coil2_out"]].map(([t,e])=>[p(t),p(e)]).filter(t=>void 0!==t[0]&&void 0!==t[1]),u=[d-22,(16+d)/2];return Z`
    <g class="device device-tank">
      ${t.ports.map(t=>Z`
        <line x1="${t.position.x}" y1="${t.position.y}" x2="${0===t.position.x?mi:86}" y2="${t.position.y}"
          stroke="var(--divider-color, #888)" stroke-width="2" />
      `)}
      <rect x="${mi}" y="10" width="${72}" height="${t.height-14}" rx="12"
        fill="var(--card-background-color, #1c1c1c)" stroke="${a}" stroke-width="${s}" />
      ${function(t,e,i,o,n){return n.map((r,a)=>{const s=0===a?i:(n[a-1].y+r.y)/2,d=a===n.length-1?o:(r.y+n[a+1].y)/2;return Z`<rect class="water" x="${t}" y="${s}" width="${e}" height="${d-s}"
      fill="${si(r.state.numeric)}" opacity="0.3" />`})}(17,66,16,d,c)}
      ${c.map(t=>Z`<circle cx="${18}" cy="${t.y}" r="3" fill="${si(t.state.numeric)}" />`)}
      ${h.map(([t,e],i)=>Z`
        <path class="coil" d="${function(t,e){const i=Math.max(2,Math.floor((e-t)/8)),o=(e-t)/i;let n=`M 14 ${t}`;for(let e=1;e<i;e++)n+=` L ${e%2?46:18} ${t+e*o}`;return`${n} L 14 ${e}`}(t,e)}" fill="none" stroke="${Qe}"
          stroke-width="2" stroke-linejoin="round" opacity="${0===i?.85:.65}" />
      `)}
      ${r.slice(0,2).map((t,e)=>function(t,e,i,o){const n=o.active?ei:oi;return Z`
    <g class="heating-rod ${o.active?"active":""}">
      <title>${o.label??""}</title>
      <rect x="${t-4}" y="${e-6}" width="8" height="12" rx="2" fill="${ii}" stroke="${n}" stroke-width="1.5" />
      ${pi(t-4-i,e+4,i,o)}
    </g>
  `}(86,u[e],30,t))}
      ${c.map(t=>function(t,e,i,o=!1){const n=i.value??"—",r=6.5*n.length+8,a=o&&void 0!==i.numeric?`fill: ${si(i.numeric)}`:"";return Z`
    <rect x="${t-r/2}" y="${e-11}" width="${r}" height="15" rx="3" fill="${ii}" opacity="0.85" />
    <text x="${t}" y="${e}" text-anchor="middle" class="device-value" style="${a}">
      <title>${i.label??""}</title>${n}
    </text>
  `}(58,t.y+4,t.state,!0))}
      ${ci(t,e)}
    </g>
  `}function fi(t,e,i,o,n){const r=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",a=i?2.5:1.5,s=58,d=60,l=Je(n,"defrost"),c=Fe(n,"fan")[0],p=(o.active||Je(n,"fan"))&&!l,h=c?function(t){const e=t.numeric;if(void 0===e||e<=0)return;const i="%"===t.unit?.25+1.75*Math.min(e,100)/100:e/600;return Math.round(100*Math.min(4,Math.max(.25,1/i)))/100}(c):void 0,u=l?"#4fc3f7":"var(--primary-color, #03a9f4)",v=We(n),_=(n.addons??[]).filter(t=>t.config.entity_id&&("temperature"===t.config.type||"value"===t.config.type));return Z`
    <g class="device device-outdoor-unit">
      <rect x="10" y="12" width="${t.width-20}" height="${t.height-24}" rx="6"
        fill="var(--card-background-color, #1c1c1c)" stroke="${r}" stroke-width="${a}" />
      <circle cx="${s}" cy="${d}" r="34" fill="none" stroke="${l?u:"var(--divider-color, #888)"}" stroke-width="1.5" />
      <g class="fan ${p?"spinning":""}" style="${h?`animation-duration: ${h}s`:""}">
        ${[0,90,180,270].map(t=>Z`
          <path d="${"M 0 0 C 6 -10, 20 -14, 26 -6 C 18 -2, 8 0, 0 0 Z"}" transform="translate(${s} ${d}) rotate(${t})"
            fill="${u}" opacity="0.75" />
        `)}
        <circle cx="${s}" cy="${d}" r="5" fill="${u}" />
      </g>
      ${l?Z`<path class="defrost" d="M ${s} ${16} v 14 M ${52} ${20} l 12 6 M ${52} ${26} l 12 -6"
            stroke="${u}" stroke-width="2" stroke-linecap="round" />`:Z``}
      ${_.slice(0,6).map((t,i)=>{const o="temperature"===t.config.type?si(t.state.numeric):"",n=t.config.name??(t.config.slot?e.t(`slots.${t.config.slot}`):"");return Z`
          <text x="104" y="${30+15*i}" class="device-value" style="${o?`fill: ${o}`:""}">
            <title>${n}</title>${t.state.value??"—"}
          </text>
        `})}
      ${v.slice(0,3).map((e,i)=>Z`
        <g class="heating-rod ${e.active?"active":""}">
          ${pi(24+34*i,t.height-18,26,e)}
        </g>
      `)}
      ${ci(t,e)}
    </g>
  `}const gi={temperature:"temperature",pressure:"pressure",volume_flow_rate:"flow",energy:"energy",power:"energy"};function bi(t,e,i,o){const n=function(t){const e=t.deviceClass?gi[t.deviceClass]:void 0;return e||(t.unit?.includes("°")?"temperature":"generic")}(o),r=t.width/2,a=t.height-14,s=i?"var(--primary-color, #03a9f4)":"temperature"===n?si(o.numeric):"var(--primary-color, #03a9f4)",d="energy"===n||"generic"===n;return Z`
    <g class="device device-inline-sensor">
      <line x1="0" y1="${a}" x2="${t.width}" y2="${a}" stroke="var(--divider-color, #888)" stroke-width="3" />
      <circle cx="${r}" cy="${a}" r="11" fill="var(--card-background-color, #1c1c1c)"
        stroke="${s}" stroke-width="${i?2.5:2}" />
      <path d="${function(t,e,i){switch(t){case"temperature":return`M ${e-1.5} ${i+2} V ${i-6} A 1.5 1.5 0 0 1 ${e+1.5} ${i-6} V ${i+2} M ${e-3} ${i+4.5} A 3 3 0 1 0 ${e+3} ${i+4.5} A 3 3 0 1 0 ${e-3} ${i+4.5}`;case"flow":return`M ${e-6} ${i} L ${e+5} ${i} M ${e+1} ${i-4} L ${e+5} ${i} L ${e+1} ${i+4}`;case"pressure":return`M ${e-6} ${i+3} A 6 6 0 1 1 ${e+6} ${i+3} M ${e} ${i+1} L ${e+4} ${i-4}`;case"energy":return`M ${e+1} ${i-7} L ${e-4} ${i+1} L ${e} ${i+1} L ${e-1} ${i+7} L ${e+4} ${i-1} L ${e} ${i-1} Z`;case"generic":return`M ${e-3} ${i} A 3 3 0 1 0 ${e+3} ${i} A 3 3 0 1 0 ${e-3} ${i} Z`}}(n,r,a)}" fill="${d?s:"none"}"
        stroke="${s}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <text x="${r}" y="${a-17}" text-anchor="middle" class="device-value">${o.value??"—"}</text>
      ${ci(t,e)}
    </g>
  `}function xi(t,e,i,o,n,r={}){switch(t){case"heat_pump":return fi(e,i,o,n,r);case"valve_3way":return function(t,e,i,o){const n=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",r=i?2.5:1.5,a="a"===o.valveBranch?"#4caf50":"var(--divider-color, #555)",s="b"===o.valveBranch?"#4caf50":"var(--divider-color, #555)";return Z`
    <g class="device device-valve-3way">
      <polygon
        points="10,50 45,15 45,35 90,35 90,65 45,65 45,85"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${n}" stroke-width="${r}"
      />
      <line x1="45" y1="50" x2="90" y2="25" stroke="${a}" stroke-width="3" />
      <line x1="45" y1="50" x2="90" y2="75" stroke="${s}" stroke-width="3" />
      ${ci(t,e)}
    </g>
  `}(e,i,o,n);case"tank":return $i(e,i,o,n,function(t){const e=new Map;for(const i of t.addons??[])"temperature"===i.config.type&&i.config.slot&&e.set(i.config.slot,i.state);return e}(r),We(r));case"junction":return function(t,e,i,o){const n=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return Z`
    <g class="device device-junction">
      <circle
        cx="30" cy="30" r="18"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${n}" stroke-width="${i?2.5:1.5}"
      />
      ${ci(t,e)}
    </g>
  `}(e,i,o,n);case"circulation_pump":return function(t,e,i,o){const n=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return Z`
    <g class="device device-circulation-pump">
      <circle
        cx="45" cy="45" r="28"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${n}" stroke-width="${i?2.5:1.5}"
      />
      <g class="${o.active?"spinning":""}">
        <path d="M 32 52 A 14 14 0 0 1 58 38"
          fill="none" stroke="var(--primary-color, #03a9f4)" stroke-width="2" stroke-linecap="round" />
        <polygon points="58,38 52,38 56,32" fill="var(--primary-color, #03a9f4)" />
      </g>
      ${ci(t,e)}
    </g>
  `}(e,i,o,n);case"floor_heating":return function(t,e,i,o){const n=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return Z`
    <g class="device device-floor-heating">
      <rect
        x="10" y="18" width="120" height="55" rx="8"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${n}" stroke-width="${i?2.5:1.5}"
      />
      <path d="M 20 40 C 35 30, 50 50, 65 40 C 80 30, 95 50, 110 40 C 115 37, 120 37, 126 40"
        fill="none" stroke="var(--primary-color, #03a9f4)" stroke-width="2" />
      ${ci(t,e)}
    </g>
  `}(e,i,o,n);case"manifold":return function(t,e,i,o,n){const r=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",a=i?2.5:1.5,s=t.width-8,d=t.ports.filter(t=>t.id.startsWith("loop_")&&"outlet"===t.kind);return Z`
    <g class="device device-manifold">
      <rect x="2" y="18" width="${t.width-4}" height="94" rx="6"
        fill="none" stroke="${r}" stroke-width="${a}" stroke-dasharray="4 3" />
      <rect x="4" y="22" width="${s}" height="16" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${Qe}" stroke-width="2" />
      <rect x="4" y="92" width="${s}" height="16" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${Ge}" stroke-width="2" />
      ${d.map((e,i)=>{const o=e.position.x,r=n[i]?.active??!1;return Z`
          <line x1="${o}" y1="0" x2="${o}" y2="22" stroke="${Qe}" stroke-width="2" />
          <rect class="actuator ${r?"active":""}" x="${o-7}" y="6" width="14" height="11" rx="2"
            fill="${r?"#4caf50":"var(--card-background-color, #1c1c1c)"}"
            stroke="${r?"#4caf50":"var(--divider-color, #888)"}" stroke-width="1.5" />
          <line x1="${o}" y1="108" x2="${o}" y2="${t.height}" stroke="${Ge}" stroke-width="2" />
          <text x="${o}" y="69" text-anchor="middle" class="device-label">${i+1}</text>
        `})}
      ${ci(t,e)}
    </g>
  `}(e,i,o,n,Fe(r,"loop"));case"mixing_valve":return function(t,e,i,o){const n=i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",r=i?2.5:1.5,a=o.position,s=void 0===a?"var(--divider-color, #888)":`hsl(${Math.round(210*(1-a/100))}, 75%, 55%)`;return Z`
    <g class="device device-mixing-valve">
      <line x1="0" y1="70" x2="22" y2="70" stroke="${Qe}" stroke-width="3" />
      <line x1="50" y1="96" x2="50" y2="${t.height}" stroke="${Ge}" stroke-width="3" />
      <line x1="78" y1="70" x2="${t.width}" y2="70" stroke="${s}" stroke-width="3" />
      <path d="M 22 56 L 50 70 L 22 84 Z M 78 56 L 50 70 L 78 84 Z M 36 98 L 50 70 L 64 98 Z"
        fill="var(--card-background-color, #1c1c1c)" stroke="${n}" stroke-width="${r}"
        stroke-linejoin="round" />
      <line x1="50" y1="36" x2="50" y2="70" stroke="${n}" stroke-width="2" />
      <rect x="28" y="10" width="44" height="26" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${n}" stroke-width="${r}" />
      ${void 0===a?Z``:Z`<rect x="30" y="12" width="${40*a/100}" height="22" rx="3" fill="${s}" opacity="0.35" />`}
      <text x="50" y="27" text-anchor="middle" class="device-value">
        ${void 0===a?"—":`${Math.round(a)} %`}
      </text>
      ${ci(t,e)}
    </g>
  `}(e,i,o,n);case"electric_heater":return function(t,e,i,o){const n=o.active?ei:i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",r=i?2.5:1.5;return Z`
    <g class="device device-electric-heater">
      <rect x="10" y="12" width="${t.width-20}" height="${t.height-24}" rx="8"
        fill="var(--card-background-color, #1c1c1c)" stroke="${n}" stroke-width="${r}" />
      ${pi(24,t.height/2+4,t.width-48,o)}
      ${ci(t,e)}
    </g>
  `}(e,i,o,n);case"pipe_sensor":return bi(e,i,o,n);default:return yi(t,e,i,o,n)}}const wi={temperature:{type:"temperature",display:"value",domains:["sensor"],deviceClasses:["temperature"]},value:{type:"value",display:"value",domains:["sensor","number"]},electric_heater:{type:"electric_heater",display:"binary",domains:["switch","binary_sensor","sensor","input_boolean"],deviceClasses:["power","heat","running"]},pump:{type:"pump",display:"binary",domains:["switch","binary_sensor","sensor"],deviceClasses:["running"]},actuator:{type:"actuator",display:"position",domains:["valve","switch","binary_sensor","number","sensor"]},fan:{type:"fan",display:"binary",domains:["fan","sensor","binary_sensor"]},mode:{type:"mode",display:"text",domains:["select","sensor","input_select","climate","water_heater"],deviceClasses:["enum"]},setpoint:{type:"setpoint",display:"value",domains:["number","input_number","climate","water_heater","sensor"],deviceClasses:["temperature"]},defrost:{type:"defrost",display:"binary",domains:["binary_sensor","sensor"]},alarm:{type:"alarm",display:"binary",domains:["binary_sensor","sensor"],deviceClasses:["problem"]},window:{type:"window",display:"binary",domains:["binary_sensor"],deviceClasses:["window","opening"]},heat_exchanger:{type:"heat_exchanger",display:"none",entityless:!0},direct_source:{type:"direct_source",display:"none",entityless:!0},direct_heating:{type:"direct_heating",display:"none",entityless:!0},dhw:{type:"dhw",display:"none",entityless:!0},circulation:{type:"circulation",display:"none",entityless:!0},loop:{type:"loop",display:"binary",domains:["valve","switch","binary_sensor","climate"]}};function ki(t){return t.slots?t.slots.length:t.max}const Ai={heat_pump:["temperature","value","electric_heater","fan","defrost"],tank:["temperature","electric_heater"],manifold:["loop"]},Si={electric_heater:ei,defrost:"#4fc3f7",alarm:"var(--error-color, #db4437)",window:"var(--warning-color, #ffa600)"};function Mi(t,e){const i=Ai[t]??[];return e.filter(t=>t.config.entity_id&&!wi[t.config.type].entityless&&!i.includes(t.config.type))}function Ei(t){const{state:e}=t;switch(wi[t.config.type].display){case"binary":return;case"position":return void 0!==e.position?`${Math.round(e.position)} %`:e.value??"—";default:return e.value??"—"}}function Ci(t,e){if(t.config.name)return t.config.name;const i=e.t(`addons.${t.config.type}.name`);return t.config.slot?`${i} – ${e.t(`slots.${t.config.slot}`)}`:i}function Ii(t,e){const i=[];let o=0,n=0;for(const r of t){const t=Ei(r),a=16+(t?6.5*t.length+6:2);o>0&&o+a>e&&(o=0,n+=22),i.push({addon:r,text:t,x:o,y:n,width:a}),o+=a+4}return{boxes:i,height:i.length?n+18:0}}function Pi(t,e,i,o,n){const{boxes:r}=Ii(t,n);return Z`
    <g class="addon-badges" transform="translate(${i} ${o})">
      ${r.map(({addon:t,text:i,x:o,y:n,width:r})=>{const a=function(t){const{type:e}=t.config,i=wi[e].display;return"temperature"===e?si(t.state.numeric):"value"===i||"text"===i?ni:t.state.active||"position"===i&&(t.state.position??0)>0?Si[e]??ti:oi}(t),s=n+9,d="pump"===t.config.type||"alarm"===t.config.type;return Z`
          <g
            class="addon-badge addon-${t.config.type} ${t.state.active?"active":""}"
            data-addon-index="${t.index??""}"
          >
            <title>${Ci(t,e)}: ${t.state.value??"—"}</title>
            <rect x="${o}" y="${n}" width="${r}" height="${18}" rx="${9}"
              fill="${ii}" stroke="${a}" stroke-width="1" />
            <path d="${function(t,e,i){switch(t){case"temperature":return`M ${e-1.5} ${i+1} V ${i-5} A 1.5 1.5 0 0 1 ${e+1.5} ${i-5} V ${i+1} M ${e-3} ${i+3} A 3 3 0 1 0 ${e+3} ${i+3} A 3 3 0 1 0 ${e-3} ${i+3}`;case"setpoint":return`M ${e-5} ${i} A 5 5 0 1 0 ${e+5} ${i} A 5 5 0 1 0 ${e-5} ${i} M ${e-1.5} ${i} A 1.5 1.5 0 1 0 ${e+1.5} ${i} A 1.5 1.5 0 1 0 ${e-1.5} ${i}`;case"pump":return`M ${e-5} ${i} A 5 5 0 1 0 ${e+5} ${i} A 5 5 0 1 0 ${e-5} ${i} M ${e-2} ${i-3} L ${e+3} ${i} L ${e-2} ${i+3} Z`;case"fan":return`M ${e} ${i} L ${e} ${i-5} M ${e} ${i} L ${e+4.3} ${i+2.5} M ${e} ${i} L ${e-4.3} ${i+2.5}`;case"electric_heater":return`M ${e-5} ${i+2} L ${e-3} ${i-3} L ${e-1} ${i+2} L ${e+1} ${i-3} L ${e+3} ${i+2} L ${e+5} ${i-3}`;case"defrost":return`M ${e} ${i-5} V ${i+5} M ${e-4.3} ${i-2.5} L ${e+4.3} ${i+2.5} M ${e-4.3} ${i+2.5} L ${e+4.3} ${i-2.5}`;case"alarm":return`M ${e} ${i-5} L ${e+5} ${i+4} L ${e-5} ${i+4} Z M ${e} ${i-1.5} V ${i+1.5}`;case"window":return`M ${e-4} ${i-4} H ${e+4} V ${i+4} H ${e-4} Z M ${e} ${i-4} V ${i+4} M ${e-4} ${i} H ${e+4}`;case"actuator":return`M ${e-4} ${i+4} H ${e+4} M ${e} ${i+4} V ${i-2} M ${e-3} ${i-2} H ${e+3} V ${i-5} H ${e-3} Z`;case"mode":return`M ${e-5} ${i-3} H ${e+5} M ${e-5} ${i} H ${e+5} M ${e-5} ${i+3} H ${e+5}`;case"loop":return`M ${e-5} ${i-3} V ${i+3} H ${e+5} V ${i-3}`;default:return`M ${e-2.5} ${i} A 2.5 2.5 0 1 0 ${e+2.5} ${i} A 2.5 2.5 0 1 0 ${e-2.5} ${i} Z`}}(t.config.type,o+9,s)}" fill="${d&&t.state.active?a:"none"}"
              stroke="${a}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
            ${i?Z`<text x="${o+16}" y="${s+4}" class="device-value addon-value">${i}</text>`:Z``}
          </g>
        `})}
    </g>
  `}const zi=10,Ni={ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0},ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1}};let Li=class extends lt{constructor(){super(...arguments),this.schema={nodes:[],connections:[],overlays:[]},this.editable=!1,this.drawing=!1,this.pipeStyle="orthogonal",this._states=new Me(this,ke),this._formatters=new Me(this,Ae),this._i18n=new Me(this,Se)}updated(t){t.has("editable")&&this.toggleAttribute("editable",this.editable),(t.has("drawing")||t.has("editable"))&&this.toggleAttribute("drawing",this.editable&&this.drawing)}render(){const t=this._translator(),{nodes:e,connections:i,overlays:o}=this.schema,n=this._dragBounds??this._computeBounds(e);return B`
      <svg
        viewBox="${n.x} ${n.y} ${n.width} ${n.height}"
        role="group"
        aria-label="${t.t("a11y.schema")}"
        tabindex="${this.editable?"0":F}"
        @keydown="${this._onKeyDown}"
        @pointerdown="${this._onCanvasPointerDown}"
        @pointermove="${this._onCanvasPointerMove}"
        @pointerup="${this._onCanvasPointerUp}"
        @pointerleave="${this._onCanvasPointerLeave}"
        @pointercancel="${this._onCanvasPointerLeave}"
      >
        ${this.editable&&this.drawing?Z`
            <defs>
              <pattern id="grid" width="${20}" height="${20}" patternUnits="userSpaceOnUse">
                <circle class="grid-dot" cx="0" cy="0" r="1" />
              </pattern>
            </defs>
            <rect x="${n.x}" y="${n.y}" width="${n.width}" height="${n.height}" fill="url(#grid)" aria-hidden="true" />
          `:F}
        ${i.map(t=>this._renderConnection(t))}
        ${e.map(e=>this._renderNode(e,t))}
        ${o.map(t=>this._renderOverlay(t))}
      </svg>
    `}_translator(){return we(this._i18n.value?.language)}_computeBounds(t){if(!t.length)return{x:0,y:0,width:800,height:400};let e=1/0,i=1/0,o=-1/0,n=-1/0;for(const r of t){const t=ue(r);if(!t)continue;const a=ze(r,t),s=Ii(Mi(r.type,this._resolveAddons(r)),this._badgeWidth(a));e=Math.min(e,a.x),i=Math.min(i,a.y-20),o=Math.max(o,a.x+Math.max(a.width,s.height?this._badgeWidth(a):0)),n=Math.max(n,a.y+a.height+10+(s.height?s.height+6:0))}return{x:e-40,y:i-40,width:o-e+80,height:n-i+80}}_renderConnection(t){const e=mt(t.from),i=mt(t.to),o=this.schema.nodes.find(t=>t.id===e?.nodeId),n=this.schema.nodes.find(t=>t.id===i?.nodeId);if(!(e&&i&&o&&n))return B``;const r=Pe(o,e.portId),a=Pe(n,i.portId);if(!r||!a)return B``;const s="curved"===this.pipeStyle?function(t,e){const i=Math.hypot(e.x-t.x,e.y-t.y),o=Math.max(30,i/2),n=t.x+t.direction.x*o,r=t.y+t.direction.y*o,a=e.x+e.direction.x*o,s=e.y+e.direction.y*o;return`M ${t.x} ${t.y} C ${n} ${r}, ${a} ${s}, ${e.x} ${e.y}`}(r,a):Te(r,a),d=$t(t),l=this.selectedEdgeId===d;return Z`
      <path class="pipe ${l?"selected":""}" d="${s}" aria-hidden="true" />
      ${this.editable?Z`<path class="pipe-hit" data-edge-id="${d}" d="${s}" />`:F}
    `}_resolveAddons(t){const e=this._states.value,i=this._formatters.value;return(t.addons??[]).map((t,o)=>{const n={...Re(e,t,i),label:t.name};return{config:t,index:o,state:"binary"===wi[t.type]?.display?Ye(t,n):n}})}_isActionable(t){if(this.editable)return!1;const e=qe(this.schema,t);return void 0!==e&&(Ze(e)||Be(e.hold_action)||Be(e.double_tap_action))}_badgeWidth(t){return Math.max(t.width,120)}_renderNode(t,e){const i=ue(t);if(!i)return B``;const o=this.selectedNodeId===t.id,n=this._resolveAddons(t),r=Re(this._states.value,t,this._formatters.value);t.entity_id||(r.active=function(t){return t.some(t=>t.config.entity_id&&Xe.includes(t.config.type)&&t.state.active)}(n));const a=xi(t.type,i,e,o,r,{addons:n});if(!a)return B``;const s=Ee(t.rotation),d=ze(t,i),l=d.y-t.position.y-4,c=Mi(t.type,n),p=t.name||e.t(i.labelKey),h=this._isActionable({nodeId:t.id});return Z`
      <g
        class="node ${this._dragNodeId===t.id?"dragging":""} ${h?"actionable":""}"
        data-node-id="${t.id}"
        role="${h?"button":"img"}"
        tabindex="${h?"0":F}"
        aria-label="${function(t,e,i,o,n){let r=t;if(i){const t=[e.value,e.active?n.t("a11y.active"):void 0].filter(Boolean);t.length&&(r+=`: ${t.join(", ")}`)}const a=o.filter(t=>t.config.entity_id).map(t=>`${Ci(t,n)}: ${t.state.value??"—"}`);return[r,...a].join("; ")}(p,r,Boolean(t.entity_id),n,e)}"
        transform="translate(${t.position.x} ${t.position.y})"
      >
        <g transform="rotate(${s} ${i.width/2} ${i.height/2})">
          ${a}
        </g>
        <text x="${i.width/2}" y="${l}" text-anchor="middle" class="device-label">
          ${p}
        </text>
        ${c.length?Pi(c,e,d.x-t.position.x,d.y-t.position.y+d.height+6,this._badgeWidth(d)):F}
      </g>
    `}_renderOverlay(t){const e=this._states.value,i=this._formatters.value,o=je(e,i,t),n=function(t,e){let i,o,n=!0;if(!t||!e.rules?.length)return{color:i,className:o,visible:n};for(const r of e.rules)Ke(t,r,e.entity_id)&&(r.effect.color&&(i=De(r.effect.color)),r.effect.class&&(o=r.effect.class),void 0!==r.effect.visible&&(n=r.effect.visible));return{color:i,className:o,visible:n}}(e,t);if(!n.visible)return B``;const r=function(t,e,i){const o=t?.[i.entity_id];return o&&e?e.formatEntityName(o,i.name):"string"==typeof i.name?i.name:i.entity_id}(e,i,t),a=`${r}: ${o}`,s=Math.max(80,7*a.length+16),d=this._isActionable({overlayId:t.id});return Z`
      <g
        class="overlay-group ${n.className??""} ${d?"actionable":""}"
        data-overlay-id="${t.id}"
        role="${d?"button":"img"}"
        tabindex="${d?"0":F}"
        aria-label="${a}"
        transform="translate(${t.position.x} ${t.position.y})"
      >
        <rect class="overlay-bg" x="0" y="0" width="${s}" height="22" rx="4" />
        <text class="overlay-text" x="8" y="15" style="${n.color?`fill: ${n.color}`:""}">
          ${a}
        </text>
      </g>
    `}_onCanvasPointerDown(t){if(!this.editable)return void this._startPress(t);const e=t.target,i=e?.getAttribute?.("data-edge-id");if(i)return void this.dispatchEvent(new CustomEvent("edge-select",{detail:{edgeId:i},bubbles:!0,composed:!0}));const o=e?.closest?.("[data-node-id]");if(!o)return void this._dispatchSelect(void 0);const n=o.getAttribute("data-node-id");if(!n)return;const r=this.schema.nodes.find(t=>t.id===n);if(!r)return;const a=e?.closest?.("[data-port-id]");if(a&&this.drawing){const e=a.getAttribute("data-port-id");if(e)return this._dispatchPortClick(n,e),void t.stopPropagation()}if(!this.drawing)return void this._dispatchSelect(n);this._dragNodeId=n;const s=this._toLocal(t);this._dragOffset=s?{x:s.x-r.position.x,y:s.y-r.position.y}:{x:0,y:0},this._dragBounds=this._computeBounds(this.schema.nodes),o.setPointerCapture(t.pointerId),this._dispatchSelect(n),t.preventDefault()}_onKeyDown(t){if(!this.editable)return void this._onActionKey(t);const e=Ni[t.key],i=this.schema.nodes.find(t=>t.id===this.selectedNodeId);if(!this.editable||!e||!i)return;t.preventDefault();const o=t.shiftKey?50:10;this.dispatchEvent(new CustomEvent("node-move",{detail:{nodeId:i.id,position:{x:Oe(i.position.x+e.x*o,zi),y:Oe(i.position.y+e.y*o,zi)}},bubbles:!0,composed:!0}))}_onActionKey(t){if("Enter"!==t.key&&" "!==t.key)return;const e=t.target,i=e?.getAttribute?.("data-node-id")??void 0,o=e?.getAttribute?.("data-overlay-id")??void 0;if(!i&&!o)return;const n=qe(this.schema,{nodeId:i,overlayId:o});n&&Ze(n)&&(t.preventDefault(),this._fireAction(n,"tap"))}_toLocal(t){const e=this.renderRoot.querySelector("svg"),i=e?.getScreenCTM();if(!e||!i)return;const o=e.createSVGPoint();return o.x=t.clientX,o.y=t.clientY,o.matrixTransform(i.inverse())}_onCanvasPointerMove(t){const e=this._press;if(e&&Math.hypot(t.clientX-e.x,t.clientY-e.y)>10&&this._cancelPress(),!this.editable||!this._dragNodeId)return;const i=this.schema.nodes.find(t=>t.id===this._dragNodeId),o=this._toLocal(t);if(!i||!o)return;const n=this._dragOffset??{x:0,y:0},r={x:Oe(o.x-n.x,zi),y:Oe(o.y-n.y,zi)};r.x===i.position.x&&r.y===i.position.y||this.dispatchEvent(new CustomEvent("node-move",{detail:{nodeId:i.id,position:r},bubbles:!0,composed:!0}))}_onCanvasPointerUp(t){if(this._press)this._endPress();else if(this._dragNodeId){const e=this.renderRoot.querySelector(`[data-node-id="${this._dragNodeId}"]`);e?.releasePointerCapture(t.pointerId),this._dragNodeId=void 0,this._dragOffset=void 0,this._dragBounds=void 0,this.requestUpdate()}}_onCanvasPointerLeave(t){this._cancelPress(),this._onCanvasPointerUp(t)}_startPress(t){const e=t.target,i=e?.closest?.("[data-node-id]")?.getAttribute("data-node-id")??void 0,o=e?.closest?.("[data-overlay-id]")?.getAttribute("data-overlay-id")??void 0,n=e?.closest?.("[data-addon-index]")?.getAttribute("data-addon-index")??void 0,r=qe(this.schema,{nodeId:i,overlayId:o,addonIndex:void 0===n||""===n?void 0:Number(n)});if(!r)return;const a={key:`${o??i}/${n??""}`,config:r,x:t.clientX,y:t.clientY,held:!1};Be(r.hold_action)&&(a.timer=window.setTimeout(()=>{a.held=!0,this._fireAction(r,"hold")},500)),this._press=a}_cancelPress(){window.clearTimeout(this._press?.timer),this._press=void 0}_endPress(){const t=this._press;if(this._cancelPress(),!t||t.held)return;const{config:e,key:i}=t;if(Be(e.double_tap_action)){if(this._pendingTap?.key===i)return window.clearTimeout(this._pendingTap.timer),this._pendingTap=void 0,void this._fireAction(e,"double_tap");window.clearTimeout(this._pendingTap?.timer),this._pendingTap={key:i,timer:window.setTimeout(()=>{this._pendingTap=void 0,Ze(e)&&this._fireAction(e,"tap")},250)}}else Ze(e)&&this._fireAction(e,"tap")}_fireAction(t,e){this.dispatchEvent(new CustomEvent("hass-action",{detail:{config:t,action:e},bubbles:!0,composed:!0}))}disconnectedCallback(){super.disconnectedCallback(),this._cancelPress(),window.clearTimeout(this._pendingTap?.timer),this._pendingTap=void 0}_dispatchSelect(t){this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:t},bubbles:!0,composed:!0}))}_dispatchPortClick(t,e){this.dispatchEvent(new CustomEvent("port-click",{detail:{nodeId:t,portId:e},bubbles:!0,composed:!0}))}};function Ti(t,e){const i=t.nodes.find(t=>t.id===e.nodeId);return i?ue(i)?.ports.find(t=>t.id===e.portId):void 0}function Oi(t,e,i){if(e.nodeId===i.nodeId&&e.portId===i.portId)return;const o=Ti(t,e),n=Ti(t,i);return o&&n&&o.kind!==n.kind?"outlet"===o.kind?{from:yt(e),to:yt(i)}:{from:yt(i),to:yt(e)}:void 0}function ji(t,e){return t.connections.some(t=>t.from===e.from&&t.to===e.to)}function Hi(t,e){const i=yt(e);return t.connections.filter(t=>t.from===i||t.to===i)}function Di(t,e){const i=t.nodes.find(t=>t.id===e),o=new Set(i?(ue(i)?.ports??[]).map(t=>t.id):[]);return t.connections.filter(t=>[t.from,t.to].every(t=>{const i=mt(t);return!i||i.nodeId!==e||o.has(i.portId)}))}Li.styles=a`
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
    .actionable:focus {
      outline: none;
    }
    .actionable:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 4px;
    }
    .overlay-group {
      pointer-events: none;
    }
    :host(:not([editable])) .actionable {
      cursor: pointer;
    }
    :host(:not([editable])) .overlay-group.actionable {
      pointer-events: auto;
    }
    .addon-value {
      font-size: var(--ha-font-size-xs, 11px);
    }
    .heating-rod.active {
      filter: drop-shadow(0 0 3px #ff7043);
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
  `,t([vt({attribute:!1})],Li.prototype,"schema",void 0),t([vt({type:Boolean})],Li.prototype,"editable",void 0),t([vt({type:Boolean})],Li.prototype,"drawing",void 0),t([vt({attribute:!1})],Li.prototype,"pipeStyle",void 0),t([vt({attribute:!1})],Li.prototype,"selectedNodeId",void 0),t([vt({attribute:!1})],Li.prototype,"selectedEdgeId",void 0),t([vt({attribute:!1})],Li.prototype,"selectedPort",void 0),Li=t([pt("heating-schema-canvas")],Li);const Ki=/^loop_(\d+)_(in|out)$/;function Vi(t){const e="string"==typeof t.attributes.friendly_name?t.attributes.friendly_name:"";return Ri(`${t.entity_id} ${e}`)}function Ri(t){return` ${t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ")} `}const Ui=(t,e)=>new RegExp(` (?:${e})`).test(t);function Bi(t){return t.entity_id.split(".",1)[0]}function Zi(t){const e=t.attributes.device_class;return"string"==typeof e?e:void 0}const qi=[["heat ?pump|heatpump|tepeln\\w* cerpadl|tc ","heat_pump"],["buffer|akumul|nadrz","tank_buffer"],["boiler|dhw|hot ?water|tuv|bojler|zasobnik","tank_dhw"],["kotel|furnace|gas ","heating_boiler"],["solar|kolektor","solar_collector"],["manifold|rozdelovac","manifold"],["floor|podlah","floor_heating"],["fan ?coil|fancoil|konvektor","fancoil"],["radiator|trv|hlavic","radiator"],["mixing|smesov","mixing_valve"],["3 ?way|diverter|trojcest|tricest|prepinac","valve_3way"],["pump|cerpadl","circulation_pump"],["outdoor|outside|venkov","outdoor_temperature"]],Fi=new Set(["temperature","pressure","volume_flow_rate","energy","power"]),Wi=new Set(["circulation_pump","outdoor_temperature"]);function Yi(t){const e=qi.find(([e])=>Ui(t,e))?.[1];return e&&!Wi.has(e)?e:void 0}const Ji=new Set(["heat_pump","heating_boiler","solar_collector"]);function Xi(t){const e=Vi(t),i=Bi(t),o=Zi(t);return"problem"===o||Ui(e,"alarm|fault|error|porucha|chyba")?"alarm":"window"===o||"opening"===o||Ui(e,"window|okno")?"window":Ui(e,"defrost|odmraz|odtav")?"defrost":Ui(e,"heater|heating element|backup|booster|spiral|topn\\w* tyc|bivalen")?"electric_heater":Ui(e,"pump|cerpadl")?"pump":"fan"===i||Ui(e,"fan|ventilator")?"fan":"select"===i||"input_select"===i||"enum"===o||Ui(e,"mode|rezim")?"mode":"number"===i||"input_number"===i||Ui(e,"setpoint|target|pozadovan|zadan")?"setpoint":"valve"===i||Ui(e,"actuator|pohon|valve|ventil")?"actuator":"temperature"===o?"temperature":"sensor"===i&&Number.isFinite(Number(t.state))?"value":void 0}const Qi={top:"top|nahore|horni",upper:"upper",middle:"middle|stred|uprostred",lower:"lower",bottom:"bottom|dole|spodni|dolni",supply:"supply|flow|outlet|leaving|vystup|privod|topna voda",return:"return|inlet|entering|vratk|zpatec|vstup",outdoor:"outdoor|outside|ambient|venkov",evaporator:"evaporator|vyparnik",room:"room|indoor|inside|mistnost|pokoj|vnitrni",floor:"floor|podlah",mixed:"mixed|smis",inlet:"inlet|vstup",outlet:"outlet|vystup",collector:"collector|panel|kolektor"};function Gi(t,e,i){const o=Vi(t),n=e.filter(t=>!i.has(t));return n.find(t=>Qi[t]&&Ui(o,Qi[t]))??n[0]}const to=()=>Array.from({length:4},()=>({type:"loop"})),eo=[{id:"heat_pump_floor",nodes:[{id:"hp",type:"heat_pump",x:0,y:20},{id:"pump",type:"circulation_pump",x:240,y:15},{id:"manifold",type:"manifold",x:400,y:30,addons:to()}],connections:[["hp.hot_out","pump.in"],["pump.out","manifold.supply_in"],["manifold.return_out","hp.cold_in"]]},{id:"heat_pump_dhw_floor",nodes:[{id:"hp",type:"heat_pump",x:0,y:140},{id:"valve",type:"valve_3way",x:240,y:130},{id:"dhw",type:"tank",x:420,y:0,addons:[{type:"heat_exchanger"},{type:"dhw"}]},{id:"pump",type:"circulation_pump",x:420,y:220},{id:"manifold",type:"manifold",x:580,y:220,addons:to()}],connections:[["hp.hot_out","valve.in"],["valve.out_a","dhw.coil_in"],["dhw.coil_out","hp.cold_in"],["valve.out_b","pump.in"],["pump.out","manifold.supply_in"],["manifold.return_out","hp.cold_in"]]},{id:"heat_pump_buffer_radiators",nodes:[{id:"hp",type:"heat_pump",x:0,y:40},{id:"buffer",type:"tank",x:260,y:0,addons:[{type:"direct_source"},{type:"direct_heating"}]},{id:"pump",type:"circulation_pump",x:440,y:0},{id:"radiator",type:"radiator",x:600,y:20}],connections:[["hp.hot_out","buffer.source_in"],["buffer.source_out","hp.cold_in"],["buffer.supply_out","pump.in"],["pump.out","radiator.in"],["radiator.out","buffer.return_in"]]},{id:"boiler_radiators",nodes:[{id:"boiler",type:"heating_boiler",x:0,y:0},{id:"pump",type:"circulation_pump",x:180,y:0},{id:"radiator",type:"radiator",x:340,y:10}],connections:[["boiler.supply_out","pump.in"],["pump.out","radiator.in"],["radiator.out","boiler.return_in"]]}];function io(t,e,i){const o=new Set(e.nodes.map(t=>t.id)),n=new Map;for(const e of t.nodes){let t=i(e.id);for(;o.has(t);)t=i(e.id);o.add(t),n.set(e.id,t)}const r=function(t){return t.reduce((t,e)=>{const i=ue(e)?.height??0;return Math.max(t,e.position.y+i+60)},0)}(e.nodes),a=t.nodes.map(t=>({id:n.get(t.id)??t.id,type:t.type,position:{x:40+t.x,y:40+r+t.y},addons:t.addons?.map(t=>({...t}))})),s=t=>{const e=t.indexOf(".");return`${n.get(t.slice(0,e))??t.slice(0,e)}${t.slice(e)}`};return{nodes:a,connections:t.connections.map(([t,e])=>({from:s(t),to:s(e)}))}}const oo=new Set(["heat_pump","heating_boiler","solar_collector"]);function no(t){const e=function(t){const e=new Map(t.nodes.map(t=>[t.id,t])),i=[];for(const o of t.connections){const t=mt(o.from),n=mt(o.to),r=t&&e.get(t.nodeId);if(!(t&&n&&r&&e.has(n.nodeId)&&t.nodeId!==n.nodeId))continue;const a=ue(r)?.ports.find(e=>e.id===t.portId);i.push({from:t.nodeId,to:n.nodeId,order:a?.position.y??0})}return i}(t),i=new Map,o=new Set(e.map(t=>t.to)),n=new Set(e.flatMap(t=>[t.from,t.to]));for(const t of e)i.set(t.from,[...i.get(t.from)??[],t]);for(const t of i.values())t.sort((t,e)=>t.order-e.order);const r=new Map,a=t=>{let e=[t];for(r.set(t,0);e.length;){const t=[];for(const o of e)for(const e of i.get(o)??[])r.has(e.to)||(r.set(e.to,(r.get(o)??0)+1),t.push(e.to));e=t}},s=t.nodes.filter(t=>n.has(t.id)),d=[...s.filter(t=>oo.has(t.type)),...s.filter(t=>!o.has(t.id)),...s];for(const t of d)r.has(t.id)||a(t.id);const l=[];for(const[t,e]of r)l[e]=[...l[e]??[],t];return{columns:l.filter(t=>t.length),unconnected:t.nodes.filter(t=>!n.has(t.id)).map(t=>t.id)}}function ro(t,e,i){const o=ue(t);if(!o)return t;const n=ze({...t,position:{x:0,y:0}},o);return{...t,position:{x:Oe(e-n.x,10),y:Oe(i-n.y,10)}}}function ao(t){const e=ue(t);return e?ze(t,e):{width:0,height:0}}const so=new Set(["friendly_name","icon","entity_picture","supported_features","device_class","unit_of_measurement","state_class","attribution","assumed_state","restored","editable","id"]),lo=["on","off","heat","heating","open","idle"],co=["options","hvac_modes","operation_list","preset_modes","fan_modes"];function po(t){const e=t.attributes.friendly_name;return"string"==typeof e&&e?e:t.entity_id}function ho(t,e){return e?t.entities?.[e]?.device_id??void 0:void 0}function uo(t,e={}){if(!t)return[];const i=e.deviceId??ho(t,e.relatedTo),o=Object.values(t.states).map(o=>{const n=o.entity_id.split(".",1)[0],r=o.attributes.device_class;let a=0;return i&&ho(t,o.entity_id)===i&&(a+=4),e.domains?.includes(n)&&(a+=2),"string"==typeof r&&e.deviceClasses?.includes(r)&&(a+=1),{entity:o,score:a,name:po(o)}});return o.sort((t,e)=>e.score-t.score||t.name.localeCompare(e.name)),o.map(({entity:t,name:e})=>({value:t.entity_id,label:e}))}function vo(t,e){const i=e?t?.states[e]:void 0;return i?Object.keys(i.attributes).filter(t=>!so.has(t)).sort().map(t=>({value:t,label:String(i.attributes[t])})):[]}function _o(t,e,i){const o=e?t?.states[e]:void 0,n=new Set;if(o){const t=i?o.attributes[i]:o.state;if(null!=t&&n.add(String(t)),!i){for(const t of co){const e=o.attributes[t];Array.isArray(e)&&e.forEach(t=>n.add(String(t)))}const t=o.attributes.hvac_action;"string"==typeof t&&n.add(t)}}return lo.forEach(t=>n.add(t)),[...n].map(t=>({value:t}))}function yo(t,e){const i=t?ho(t,e):void 0,o=i?t?.devices?.[i]:void 0;return o?.name_by_user||o?.name||void 0}function mo(t,e){const i=e?t?.states[e]:void 0;if(!i||!t)return;const o="function"==typeof t.formatEntityState?t.formatEntityState(i):i.state;return`${po(i)} · ${o}`}function $o(t){return t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}function fo(t,e,i=50){const o=$o(e).split(/\s+/).filter(Boolean),n=o.length?t.filter(t=>{const e=$o(`${t.value} ${t.label??""}`);return o.every(t=>e.includes(t))}):t;return n.slice(0,i)}let go=0,bo=class extends lt{constructor(){super(...arguments),this.kind="text",this.label="",this.options=[],this.strict=!1,this._open=!1,this._query="",this._typed=!1,this._active=-1,this._listId="hv-list-"+ ++go,this._inputId=`hv-input-${go}`}render(){if("boolean"===this.kind)return B`
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
      `}return"combo"===this.kind?this._renderCombo():B`
      <label for="${this._inputId}">${this.label}</label>
      <input
        id="${this._inputId}"
        type="${"number"===this.kind?"number":"text"}"
        step="any"
        autocomplete="off"
        placeholder="${this.placeholder??""}"
        .value="${void 0===this.value?"":String(this.value)}"
        @change="${this._onInput}"
      />
      ${this._renderHelper()}
    `}_matches(){return fo(this.options,this._typed?this._query:"")}_renderCombo(){const t=this._open?this._matches():[],e=this._displayValue();return B`
      <label for="${this._inputId}">${this.label}</label>
      <input
        id="${this._inputId}"
        type="text"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-expanded="${this._open}"
        aria-controls="${this._listId}"
        aria-activedescendant="${this._active>=0?`${this._listId}-${this._active}`:F}"
        placeholder="${this.placeholder??""}"
        .value="${this._open?this._query:e}"
        @focus="${this._onFocus}"
        @input="${this._onType}"
        @keydown="${this._onKey}"
        @blur="${this._onBlur}"
      />
      ${this._open?B`<ul id="${this._listId}" class="listbox" role="listbox">
            ${t.length?t.map((t,e)=>B`<li
                    id="${this._listId}-${e}"
                    role="option"
                    class="${e===this._active?"active":""}"
                    aria-selected="${e===this._active}"
                    @mousedown="${t=>t.preventDefault()}"
                    @click="${()=>this._select(t.value)}"
                  >
                    <span>${t.label??t.value}</span>
                    ${t.label?B`<span class="option-value">${t.value}</span>`:F}
                  </li>`):B`<li class="empty" role="presentation">—</li>`}
          </ul>`:F}
      ${this._renderHelper()}
    `}updated(t){t.has("_active")&&this._active>=0&&this.renderRoot.querySelector("li.active")?.scrollIntoView({block:"nearest"})}_displayValue(){if(void 0===this.value)return"";const t=String(this.value);return this.strict?this.options.find(e=>e.value===t)?.label??t:t}_onFocus(){this._query=this._displayValue(),this._typed=!1,this._active=-1,this._open=!0}_onType(t){this._query=t.target.value,this._typed=!0,this._active=-1,this._open=!0}_onKey(t){const e=this._matches();switch(t.key){case"ArrowDown":t.preventDefault(),this._open=!0,this._active=Math.min(this._active+1,e.length-1);break;case"ArrowUp":t.preventDefault(),this._active=Math.max(this._active-1,0);break;case"Enter":t.preventDefault(),this._open&&this._active>=0&&e[this._active]?this._select(e[this._active].value):this._commitTyped();break;case"Escape":this._open&&(t.preventDefault(),t.stopPropagation(),this._open=!1)}}_onBlur(){this._open&&this._commitTyped()}_commitTyped(){if(this._open=!1,!this._typed)return;const t=this._query.trim();if(""===t)this._emit(void 0);else if(this.strict){const e=fo(this.options,t,1)[0];e&&this._emit(e.value)}else this._emit(t)}_select(t){this._query=t,this._typed=!1,this._open=!1,this._emit(t)}_renderHelper(){return this.helper?B`<div class="helper">${this.helper}</div>`:F}_onCheck(t){this._emit(t.target.checked)}_onInput(t){const e=t.target.value.trim();"number"===this.kind?this._emit(""===e?void 0:Number(e)):this._emit(""===e?void 0:e)}_emit(t){this.dispatchEvent(new CustomEvent("hv-change",{detail:{value:t}}))}};bo.styles=a`
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
    .listbox {
      max-height: 240px;
      margin: 4px 0 0;
      padding: 4px 0;
      overflow-y: auto;
      list-style: none;
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md, 8px);
      box-shadow: var(--ha-box-shadow-m, 0 2px 8px rgba(0, 0, 0, 0.3));
    }
    .listbox li {
      display: flex;
      flex-direction: column;
      padding: 6px 10px;
      cursor: pointer;
    }
    .listbox li.active,
    .listbox li:hover {
      background: var(--secondary-background-color);
    }
    .option-value {
      font-size: var(--ha-font-size-s, 12px);
      color: var(--secondary-text-color);
    }
    .empty {
      padding: 6px 10px;
      color: var(--secondary-text-color);
    }
  `,t([vt()],bo.prototype,"kind",void 0),t([vt()],bo.prototype,"label",void 0),t([vt()],bo.prototype,"helper",void 0),t([vt()],bo.prototype,"placeholder",void 0),t([vt({attribute:!1})],bo.prototype,"value",void 0),t([vt({attribute:!1})],bo.prototype,"options",void 0),t([vt({type:Boolean})],bo.prototype,"strict",void 0),t([_t()],bo.prototype,"_open",void 0),t([_t()],bo.prototype,"_query",void 0),t([_t()],bo.prototype,"_typed",void 0),t([_t()],bo.prototype,"_active",void 0),bo=t([pt("hv-field")],bo);const xo={key:"entity_id",label:"editor.entity"},wo={key:"entity_id",label:"editor.state_entity",helper:"editor.state_entity_helper"},ko={key:"entity_id",label:"editor.value_entity"},Ao={key:"active_state",label:"editor.active_state",helper:"editor.active_state_helper"},So={key:"value_attribute",label:"editor.value_attribute",helper:"editor.value_attribute_helper"},Mo={key:"mode_attribute",label:"editor.position_attribute",helper:"editor.position_attribute_helper"};const Eo=4,Co=200,Io=180,Po=40,zo=40,No=["orthogonal","curved"],Lo=["more-info","toggle","navigate","none"],To=["tap_action","hold_action","double_tap_action"];function Oo(t,e){const i={};return i[t]=e,i}const jo=["climate","water_heater","valve","fan","switch","sensor","binary_sensor"],Ho=["primary","accent","red","pink","purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","grey","blue-grey"],Do=t=>"string"==typeof t.detail.value?t.detail.value:void 0,Ko=t=>"number"==typeof t.detail.value&&Number.isFinite(t.detail.value)?t.detail.value:void 0;let Vo=class extends lt{constructor(){super(...arguments),this._tab="schema",this._view={kind:"list"},this._newDeviceType=Ut.type,this._templateId=eo[0].id,this._drawing=!1}set hass(t){this._hass=t}get hass(){return this._hass}setConfig(t){this._config=$e(t)}render(){if(!this._config)return B``;const t=we(this._hass?.language),e=gt(this._config);return B`
      <div class="editor">
        <div class="tabs" role="tablist">
          ${this._renderTab(t,"schema","editor.schema_tab")}
          ${this._renderTab(t,"overlays","editor.overlay_tab")}
        </div>
        ${"schema"===this._tab?this._renderSchemaTab(t,e):this._renderOverlaysTab(t,e)}
      </div>
    `}_renderTab(t,e,i){return B`
      <button
        type="button"
        role="tab"
        aria-selected="${this._tab===e}"
        @click="${()=>{this._tab=e}}"
      >${t.t(i)}</button>
    `}_renderSchemaTab(t,e){const i=this._view,o="list"===i.kind?void 0:e.nodes.find(t=>t.id===i.nodeId);if(o&&"addon"===i.kind){const n=o.addons?.[i.index];if(n)return this._renderAddonView(t,e,o,n,i.index)}return o?this._renderNodeView(t,e,o):this._renderListView(t,e)}_renderCanvas(t,e){return B`
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
    `}_renderListView(t,e){const i=function(t){return t.connections.filter(e=>{const i=mt(e.from),o=mt(e.to);return!i||!o||"outlet"!==Ti(t,i)?.kind||"inlet"!==Ti(t,o)?.kind})}(e);return B`
      <div class="toolbar">
        <select
          aria-label="${t.t("editor.device_type")}"
          @change="${t=>{this._newDeviceType=t.target.value}}"
        >
          ${le.map(e=>B`<option value="${e.id}" ?selected="${e.id===this._newDeviceType}">
              ${t.t(e.labelKey)}
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
          ${eo.map(e=>B`<option value="${e.id}" ?selected="${e.id===this._templateId}">
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
              ${No.map(e=>B`<option value="${e}" ?selected="${e===this._pipeStyle()}">
                  ${t.t(`editor.pipe_style_${e}`)}
                </option>`)}
            </select>
          </div>`:F}
      ${this._renderAddFromEntity(t)}

      ${this._renderCanvas(t,e)}

      ${i.length?B`<p class="warning" role="alert">
            ${t.t("editor.invalid_connections",String(i.length))}
            <button type="button" @click="${()=>this._removeConnections(i)}">
              ${t.t("editor.remove_invalid")}
            </button>
          </p>`:F}

      ${e.nodes.length?B`
            <h3>${t.t("editor.devices_title")}</h3>
            <ul class="list">
              ${e.nodes.map(i=>this._renderNodeRow(t,e,i))}
            </ul>
          `:B`<p class="hint">${t.t("editor.empty_hint")}</p>`}
    `}_renderAddFromEntity(t){const e=this._hass;if(!e)return F;const i=this._entityToAdd?e.states[this._entityToAdd]:void 0,o=this._entityDeviceType??(i?function(t){const e=Vi(t),i=Bi(t),o=qi.find(([t])=>Ui(e,t))?.[1];return o||("water_heater"===i?"tank_dhw":"climate"===i?"radiator":"valve"===i?"zone_valve":"fan"===i?"fancoil":"sensor"===i&&Fi.has(Zi(t)??"")?"pipe_sensor":void 0)}(i):void 0);return B`
      <section class="card">
        <hv-field
          kind="combo"
          .label="${t.t("editor.add_from_entity")}"
          .helper="${mo(e,this._entityToAdd)??t.t("editor.add_from_entity_helper")}"
          .options="${uo(e,{domains:jo})}"
          .value="${this._entityToAdd}"
          @hv-change="${t=>{this._entityToAdd=Do(t),this._entityDeviceType=void 0}}"
        ></hv-field>
        ${i?B`<div class="toolbar">
              <select
                aria-label="${t.t("editor.device_type")}"
                @change="${t=>{this._entityDeviceType=t.target.value||void 0}}"
              >
                ${o?F:B`<option value="" selected>${t.t("editor.choose_type")}</option>`}
                ${le.map(e=>B`<option value="${e.id}" ?selected="${e.id===o}">
                    ${t.t(e.labelKey)}
                  </option>`)}
              </select>
              <button
                type="button"
                class="primary"
                ?disabled="${!o}"
                @click="${()=>{o&&this._addDevice(o,i.entity_id)}}"
              >${t.t("editor.add_device")}</button>
            </div>`:F}
      </section>
    `}_renderNodeRow(t,e,i){const[o,n]=function(t,e){const i=ue(e)?.ports??[],o=i.filter(i=>Hi(t,{nodeId:e.id,portId:i.id}).length).length;return[o,i.length]}(e,i),r=[i.entity_id?mo(this._hass,i.entity_id)??i.entity_id:t.t("editor.no_entity")];return n&&r.push(t.t("editor.ports_connected",String(o),String(n))),i.addons?.length&&r.push(t.t("editor.addon_count",String(i.addons.length))),B`
      <li>
        <button
          type="button"
          class="row ${i.id===this._selectedNodeId?"selected":""}"
          @click="${()=>this._openNode(i.id)}"
        >
          <span class="row-main">
            <span>${this._nodeName(t,i)}</span>
            <span class="row-sub">${r.join(" · ")}</span>
          </span>
          <span aria-hidden="true">›</span>
        </button>
      </li>
    `}_renderHeader(t,e,i){return B`
      <div class="header">
        <button type="button" class="icon" aria-label="${t.t("editor.back")}" @click="${i}">‹</button>
        <h3>${e}</h3>
      </div>
    `}_renderNodeView(t,e,i){const o=i,n=ue(i);return B`
      ${this._renderHeader(t,this._nodeName(t,i),()=>this._openList())}
      ${this._renderCanvas(t,e)}

      <section class="card">
        <hv-field
          .label="${t.t("editor.name")}"
          .helper="${t.t("editor.name_helper")}"
          .placeholder="${t.t(n?.labelKey??`devices.${i.type}.name`)}"
          .value="${i.name}"
          @hv-change="${t=>this._patchNode(i.id,{name:Do(t)})}"
        ></hv-field>
        ${n?.variants?B`<hv-field
              kind="select"
              .label="${t.t("editor.variant")}"
              .options="${n.variants.map(e=>({value:e,label:t.t(`devices.${i.type}.variants.${e}`)}))}"
              .value="${i.variant??n.variants[0]}"
              @hv-change="${t=>this._setVariant(i.id,Do(t),n.variants?.[0])}"
            ></hv-field>`:F}
        ${n?.volume?B`<hv-field
              kind="number"
              .label="${t.t("editor.volume")}"
              .helper="${t.t("editor.volume_helper")}"
              .placeholder="${String(200)}"
              .value="${i.volume}"
              @hv-change="${t=>{const e=Ko(t);this._patchNode(i.id,{volume:e&&e>0?e:void 0})}}"
            ></hv-field>`:F}
        <hv-field
          kind="combo"
          strict
          .label="${t.t("editor.ha_device")}"
          .helper="${t.t("editor.ha_device_helper")}"
          .options="${function(t){if(!t?.devices)return[];const e=new Set(Object.values(t.entities??{}).map(t=>t.device_id));return Object.values(t.devices).filter(t=>e.has(t.id)).map(t=>({value:t.id,label:t.name_by_user||t.name||t.id})).sort((t,e)=>t.label.localeCompare(e.label))}(this._hass)}"
          .value="${i.device_id}"
          @hv-change="${t=>this._patchNode(i.id,{device_id:Do(t)})}"
        ></hv-field>
        ${this._renderBinding(t,o,function(t){const e=he(t)?.valueDisplay;return"only"===e?[ko,So]:"with_state"===e?[wo,Ao,So]:"mixing_valve"===t?[{...xo,label:"editor.actuator_entity"},Mo]:"valve_3way"===t?[xo,Ao,{key:"mode_attribute",label:"editor.valve_attribute",helper:"editor.valve_attribute_helper"},{key:"branch_a_value",label:"editor.branch_a",helper:"editor.branch_a_helper"},{key:"branch_b_value",label:"editor.branch_b",helper:"editor.branch_b_helper"}]:[wo,Ao]}(i.type),{deviceId:i.device_id},t=>this._patchNode(i.id,t))}
      </section>

      ${this._renderAddons(t,i)}
      ${this._renderSuggestions(t,i)}
      ${this._renderConnections(t,e,i)}
      ${this._renderActions(t,i,t=>this._patchNode(i.id,t))}

      <section class="card">
        <h3>${t.t("editor.position_title")}</h3>
        <div class="grid2">
          <hv-field
            kind="number"
            label="X"
            .value="${i.position.x}"
            @hv-change="${t=>this._moveNode(i.id,{x:Ko(t)})}"
          ></hv-field>
          <hv-field
            kind="number"
            label="Y"
            .value="${i.position.y}"
            @hv-change="${t=>this._moveNode(i.id,{y:Ko(t)})}"
          ></hv-field>
        </div>
        <div class="toolbar">
          <button type="button" class="icon" aria-label="${t.t("editor.move_left")}" @click="${()=>this._nudge(i,-1,0)}">←</button>
          <button type="button" class="icon" aria-label="${t.t("editor.move_up")}" @click="${()=>this._nudge(i,0,-1)}">↑</button>
          <button type="button" class="icon" aria-label="${t.t("editor.move_down")}" @click="${()=>this._nudge(i,0,1)}">↓</button>
          <button type="button" class="icon" aria-label="${t.t("editor.move_right")}" @click="${()=>this._nudge(i,1,0)}">→</button>
          <button type="button" @click="${()=>this._rotateNode(i.id)}">↻ ${t.t("editor.rotate")}</button>
          <button type="button" class="danger" @click="${()=>this._deleteNode(i.id)}">
            ${t.t("editor.delete_device")}
          </button>
        </div>
      </section>
    `}_renderBinding(t,e,i,o,n){return B`${i.map(i=>{const{kind:r,options:a,helper:s}=this._fieldSource(t,e,i,o);return B`
        <hv-field
          .kind="${r}"
          .label="${t.t(i.label)}"
          .helper="${s}"
          .options="${a}"
          .value="${e[i.key]}"
          @hv-change="${t=>n({[i.key]:Do(t)})}"
        ></hv-field>
      `})}`}_fieldSource(t,e,i,o){const n=this._hass,r=i.helper?t.t(i.helper):void 0;switch(i.key){case"entity_id":case"temperature_entity_id":return{kind:"combo",options:uo(n,o),helper:mo(n,e[i.key])??r};case"value_attribute":case"mode_attribute":return{kind:"combo",options:vo(n,e.entity_id),helper:r};case"branch_a_value":case"branch_b_value":return{kind:"combo",options:_o(n,e.entity_id,e.mode_attribute),helper:r};default:return{kind:"combo",options:_o(n,e.entity_id),helper:r}}}_renderActions(t,e,i){return B`
      <section class="card">
        <h3>${t.t("editor.actions_title")}</h3>
        ${To.map(o=>{const n=e[o],r=n&&!Lo.includes(n.action)?[...Lo,n.action]:Lo,a=[{value:"",label:t.t("tap_action"===o?"editor.action_default_tap":"editor.action_default")},...r.map(e=>({value:e,label:Lo.includes(e)?t.t(`editor.action_${e.replace("-","_")}`):e}))];return B`
            <hv-field
              kind="select"
              .label="${t.t(`editor.${o}`)}"
              .options="${a}"
              .value="${n?.action??""}"
              @hv-change="${t=>{const e=Do(t);i(Oo(o,e?{action:e}:void 0))}}"
            ></hv-field>
            ${"navigate"===n?.action?B`<hv-field
                  .label="${t.t("editor.navigation_path")}"
                  placeholder="/lovelace/heating"
                  .value="${"string"==typeof n.navigation_path?n.navigation_path:void 0}"
                  @hv-change="${t=>i(Oo(o,{...n,navigation_path:Do(t)}))}"
                ></hv-field>`:F}
          `})}
      </section>
    `}_renderAddons(t,e){const i=he(e.type)?.addons??[];if(!i.length)return F;const o=e.addons??[],n=i.filter(t=>this._remaining(e,t)>0),r=n.find(t=>t.type===this._newAddonType)?.type??n[0]?.type;return B`
      <section class="card">
        <h3>${t.t("editor.addons_title")}</h3>
        ${o.length?B`<ul class="list">
              ${o.map((i,o)=>B`
                <li>
                  <button type="button" class="row" @click="${()=>this._openAddon(e.id,o)}">
                    <span class="row-main">
                      <span>${this._addonName(t,e,i,o)}</span>
                      <span class="row-sub">${this._addonSummary(t,i)}</span>
                    </span>
                    <span aria-hidden="true">›</span>
                  </button>
                  <button
                    type="button"
                    class="icon danger"
                    aria-label="${t.t("editor.remove_addon")}"
                    @click="${()=>this._removeAddon(e.id,o)}"
                  >×</button>
                </li>
              `)}
            </ul>`:B`<p class="hint">${t.t("editor.addons_empty")}</p>`}
        ${r?B`<div class="toolbar" style="margin-top: 8px">
              <select
                aria-label="${t.t("editor.addon_type")}"
                @change="${t=>{this._newAddonType=t.target.value}}"
              >
                ${n.map(i=>B`
                  <option value="${i.type}" ?selected="${i.type===r}">
                    ${t.t(`addons.${i.type}.name`)} (${t.t("editor.remaining",String(this._remaining(e,i)))})
                  </option>
                `)}
              </select>
              <button type="button" @click="${()=>this._addAddon(e.id,r)}">
                ${t.t("editor.add_addon")}
              </button>
            </div>`:F}
      </section>
    `}_renderSuggestions(t,e){const i=this._config?gt(this._config):void 0,o=new Set((i?.nodes??[]).flatMap(t=>[t.entity_id,...(t.addons??[]).map(t=>t.entity_id)]).filter(t=>Boolean(t))),n=function(t,e,i=new Set){const o=e.device_id??(e.entity_id?t?.entities?.[e.entity_id]?.device_id:void 0),n=he(e.type)?.addons??[];if(!t||!o||!n.length)return[];const r=[...e.addons??[]],a=new Set([e.entity_id,...r.map(t=>t.entity_id),...r.map(t=>t.temperature_entity_id)]),s=[],d=t.devices?.[o],l=Yi(Ri(d?.name_by_user||d?.name||"")),c=l?ce(e)===l:Ji.has(e.type),p=Object.values(t.entities??{}).filter(t=>t.device_id===o&&!a.has(t.entity_id)&&!i.has(t.entity_id)).map(e=>t.states[e.entity_id]).filter(t=>void 0!==t).filter(t=>{const i=Yi(Vi(t));return i?i===ce(e):c}).sort((t,e)=>t.entity_id.localeCompare(e.entity_id));for(const t of p){const e=Xi(t),i="temperature"===e?["temperature","value"]:e?[e]:[];for(const e of i){const i=n.find(t=>t.type===e),o=r.filter(t=>t.type===e);if(!i||o.length>=ki(i))continue;const a={type:i.type,entity_id:t.entity_id};i.slots&&(a.slot=Gi(t,i.slots,new Set(o.map(t=>t.slot)))),r.push(a),s.push(a);break}}return s}(this._hass,e,o);if(!n.length)return F;return B`
      <section class="card">
        <div class="header">
          <h3>${t.t("editor.suggested_title")}</h3>
          <button type="button" @click="${()=>this._addAddons(e.id,n)}">
            ${t.t("editor.add_all")}
          </button>
        </div>
        <p class="hint">${t.t("editor.suggested_hint")}</p>
        <ul class="list" style="margin-top: 8px">
          ${n.map(i=>B`
            <li>
              <div class="row static">
                <span class="row-main">
                  <span>${(e=>e.slot?`${t.t(`addons.${e.type}.name`)} – ${t.t(`slots.${e.slot}`)}`:t.t(`addons.${e.type}.name`))(i)}</span>
                  <span class="row-sub">${mo(this._hass,i.entity_id)??i.entity_id}</span>
                </span>
              </div>
              <button
                type="button"
                class="icon"
                aria-label="${t.t("editor.add_addon")}"
                @click="${()=>this._addAddons(e.id,[i])}"
              >+</button>
            </li>
          `)}
        </ul>
      </section>
    `}_renderAddonView(t,e,i,o,n){const r=he(i.type)?.addons?.find(t=>t.type===o.type),a=wi[o.type],s=new Set((i.addons??[]).filter((t,e)=>e!==n&&t.type===o.type).map(t=>t.slot)),d=(r?.slots??[]).filter(t=>!s.has(t)).map(e=>({value:e,label:t.t(`slots.${e}`)})),l={domains:a.domains,deviceClasses:a.deviceClasses,deviceId:i.device_id,relatedTo:i.entity_id};return B`
      ${this._renderHeader(t,this._addonName(t,i,o,n),()=>this._openNode(i.id))}
      ${this._renderCanvas(t,e)}
      <section class="card">
        <p class="hint">${this._nodeName(t,i)} › ${t.t(`addons.${o.type}.name`)}</p>
        ${d.length?B`<hv-field
              kind="select"
              .label="${t.t("editor.slot")}"
              .options="${d}"
              .value="${o.slot}"
              @hv-change="${t=>this._patchAddon(i.id,n,{slot:Do(t)})}"
            ></hv-field>`:F}
        <hv-field
          .label="${t.t("editor.name")}"
          .helper="${t.t("editor.addon_name_helper")}"
          .value="${o.name}"
          @hv-change="${t=>this._patchAddon(i.id,n,{name:Do(t)})}"
        ></hv-field>
        ${a.entityless?B`<p class="hint">${t.t(`addons.${o.type}.hint`)}</p>`:this._renderBinding(t,o,function(t){if("loop"===t)return[{...xo,label:"editor.actuator_entity"},Ao,{key:"temperature_entity_id",label:"editor.loop_temperature"}];switch(wi[t].display){case"value":case"text":return[xo,So];case"binary":return[xo,Ao];case"position":return[xo,Mo];default:return[]}}(o.type),l,t=>this._patchAddon(i.id,n,t))}
      </section>
      <div class="toolbar">
        <button type="button" class="danger" @click="${()=>this._removeAddon(i.id,n)}">
          ${t.t("editor.remove_addon")}
        </button>
      </div>
    `}_renderConnections(t,e,i){const o=ue(i)?.ports??[];return o.length?B`
      <section class="card">
        <h3>${t.t("editor.connections_title")}</h3>
        ${o.map(o=>{const n={nodeId:i.id,portId:o.id},r=Hi(e,n),a=function(t,e){const i=Ti(t,e);if(!i)return[];const o=[];for(const n of t.nodes)if(n.id!==e.nodeId)for(const r of ue(n)?.ports??[]){if(r.kind===i.kind)continue;const a={nodeId:n.id,portId:r.id},s=Oi(t,e,a);s&&!ji(t,s)&&o.push(a)}return o}(e,n);return B`
            <div class="port">
              <div class="port-label">
                ${"outlet"===o.kind?"→":"←"} ${t.t(o.labelKey,...o.labelArgs??[])}
              </div>
              <div class="chips">
                ${r.length?r.map(i=>{const o=function(t,e){const i=yt(e);return mt(t.from===i?t.to:t.from)}(i,n);return B`<span class="chip">
                        ${o?this._portRefLabel(t,e,o):"?"}
                        <button
                          type="button"
                          aria-label="${t.t("editor.disconnect")}"
                          @click="${()=>this._removeConnections([i])}"
                        >×</button>
                      </span>`}):B`<span class="hint">${t.t("editor.not_connected")}</span>`}
              </div>
              ${a.length?B`<select
                    aria-label="${t.t("editor.connect_to")}"
                    @change="${t=>{const e=t.target,i=mt(e.value);e.value="",i&&this._connect(n,i)}}"
                  >
                    <option value="">${t.t("editor.connect_to")}…</option>
                    ${a.map(i=>B`<option value="${yt(i)}">${this._portRefLabel(t,e,i)}</option>`)}
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
      ${e.overlays.map((e,i)=>this._renderOverlay(t,e,i))}
    `}_renderOverlay(t,e,i){const o=this._hass,n=t=>this._patchOverlay(e.id,t),r=void 0!==e.name&&"string"!=typeof e.name;return B`
      <section class="card">
        <div class="header">
          <h3>${e.entity_id||t.t("editor.overlay_n",String(i+1))}</h3>
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
          .options="${uo(o)}"
          .helper="${mo(o,e.entity_id)}"
          .value="${e.entity_id}"
          @hv-change="${t=>n({entity_id:Do(t)??""})}"
        ></hv-field>
        <hv-field
          .label="${t.t("overlay.name")}"
          .helper="${r?t.t("overlay.name_yaml"):t.t("overlay.name_helper")}"
          .value="${"string"==typeof e.name?e.name:void 0}"
          @hv-change="${t=>n({name:Do(t)})}"
        ></hv-field>
        <hv-field
          .label="${t.t("overlay.template")}"
          .helper="${t.t("overlay.template_helper")}"
          .value="${e.template}"
          @hv-change="${t=>n({template:Do(t)})}"
        ></hv-field>
        <div class="grid2">
          <hv-field
            kind="number"
            label="X"
            .value="${e.position.x}"
            @hv-change="${t=>n({position:{...e.position,x:Ko(t)??0}})}"
          ></hv-field>
          <hv-field
            kind="number"
            label="Y"
            .value="${e.position.y}"
            @hv-change="${t=>n({position:{...e.position,y:Ko(t)??0}})}"
          ></hv-field>
        </div>

        <div class="header">
          <h3>${t.t("overlay.rules")}</h3>
          <button type="button" @click="${()=>this._addRule(e)}">${t.t("overlay.add_rule")}</button>
        </div>
        ${(e.rules??[]).map((i,o)=>this._renderRule(t,e,i,o))}
        ${this._renderActions(t,e,t=>n(t))}
      </section>
    `}_renderRule(t,e,i,o){const n=t=>this._updateRule(e.id,o,t),r=i.entity||e.entity_id;return B`
      <div class="rule">
        <div class="header">
          <hv-field
            style="flex: 1"
            kind="select"
            .label="${t.t("overlay.rule.condition")}"
            .options="${[{value:"state",label:t.t("overlay.rule.condition_state")},{value:"numeric",label:t.t("overlay.rule.condition_numeric")}]}"
            .value="${i.condition}"
            @hv-change="${t=>n(e=>({condition:"numeric"===Do(t)?"numeric":"state",entity:e.entity,effect:e.effect}))}"
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
          .options="${uo(this._hass)}"
          .value="${i.entity}"
          @hv-change="${t=>n(e=>({...e,entity:Do(t)}))}"
        ></hv-field>
        ${"state"===i.condition?B`<hv-field
              kind="combo"
              .label="${t.t("overlay.rule.state")}"
              .options="${_o(this._hass,r)}"
              .value="${i.state}"
              @hv-change="${t=>n(e=>({...e,state:Do(t)}))}"
            ></hv-field>`:B`<div class="grid2">
              <hv-field
                kind="number"
                .label="${t.t("overlay.rule.above")}"
                .value="${i.above}"
                @hv-change="${t=>n(e=>({...e,above:Ko(t)}))}"
              ></hv-field>
              <hv-field
                kind="number"
                .label="${t.t("overlay.rule.below")}"
                .value="${i.below}"
                @hv-change="${t=>n(e=>({...e,below:Ko(t)}))}"
              ></hv-field>
            </div>`}
        <hv-field
          kind="combo"
          .label="${t.t("overlay.rule.color")}"
          .helper="${t.t("overlay.rule.color_helper")}"
          .options="${Ho.map(t=>({value:t}))}"
          .value="${i.effect.color}"
          @hv-change="${t=>n(e=>({...e,effect:{...e.effect,color:Do(t)}}))}"
        ></hv-field>
        <hv-field
          kind="boolean"
          .label="${t.t("overlay.rule.hide")}"
          .value="${!1===i.effect.visible}"
          @hv-change="${t=>n(e=>({...e,effect:{...e.effect,visible:!t.detail.value&&void 0}}))}"
        ></hv-field>
      </div>
    `}_nodeName(t,e){return e.name||t.t(ue(e)?.labelKey??`devices.${e.type}.name`)}_addonName(t,e,i,o){if(i.name)return i.name;const n=t.t(`addons.${i.type}.name`);if(i.slot)return`${n} – ${t.t(`slots.${i.slot}`)}`;const r=(e.addons??[]).filter(t=>t.type===i.type);if(r.length<2)return n;const a=(e.addons??[]).slice(0,o+1).filter(t=>t.type===i.type).length;return`${n} ${a}`}_addonSummary(t,e){return wi[e.type].entityless?t.t(`addons.${e.type}.hint`):e.entity_id?mo(this._hass,e.entity_id)??e.entity_id:t.t("editor.no_entity")}_portRefLabel(t,e,i){const o=e.nodes.find(t=>t.id===i.nodeId),n=Ti(e,i),r=n?t.t(n.labelKey,...n.labelArgs??[]):i.portId;return o?`${this._nodeName(t,o)} › ${r}`:yt(i)}_openList(){this._view={kind:"list"}}_openNode(t){this._view={kind:"node",nodeId:t},this._selectedNodeId=t,this._selectedEdgeId=void 0}_openAddon(t,e){this._view={kind:"addon",nodeId:t,index:e}}_update(t){if(!this._config)return;this._layoutUndo=void 0;const e=structuredClone(gt(this._config));t(e),this._emit({...this._config,...e})}_emit(t){const e=JSON.parse(JSON.stringify({...t,schema_version:2}));this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_pipeStyle(){return this._config?.pipe_style??"orthogonal"}_setPipeStyle(t){this._config&&this._emit({...this._config,pipe_style:"orthogonal"===t?void 0:t})}_patchNode(t,e){this._update(i=>{const o=i.nodes.find(e=>e.id===t);o&&Object.assign(o,e)})}_moveNode(t,e){this._update(i=>{const o=i.nodes.find(e=>e.id===t);o&&(o.position={x:e.x??o.position.x,y:e.y??o.position.y})})}_setVariant(t,e,i){this._update(o=>{const n=o.nodes.find(e=>e.id===t);n&&(n.variant=e===i?void 0:e,o.connections=Di(o,t))})}_nudge(t,e,i){this._moveNode(t.id,{x:t.position.x+10*e,y:t.position.y+10*i})}_toggleDrawing(){this._drawing=!this._drawing,this._pendingPort=void 0}_rotateNode(t){this._update(e=>{const i=e.nodes.find(e=>e.id===t);i&&(i.rotation=Ee((i.rotation??0)+90)||void 0)})}_addDevice(t,e){const i=function(t){return le.find(e=>e.id===t)}(t);if(!i||!he(i.type))return;const{type:o}=i,n=bt(o);this._update(t=>{const r=t.nodes.length,a={id:n,type:o,name:yo(this._hass,e),entity_id:e,device_id:e?this._hass?.entities?.[e]?.device_id??void 0:void 0,position:{x:Po+r%Eo*Co,y:zo+Math.floor(r/Eo)*Io},addons:i.addons?.map(t=>({...t}))};o===Kt.type&&(a.addons=Array.from({length:4},()=>({type:"loop"}))),t.nodes.push(a)}),this._entityToAdd=void 0,this._entityDeviceType=void 0,this._openNode(n)}_autoLayout(){if(!this._config)return;const t=Object.fromEntries(gt(this._config).nodes.map(t=>[t.id,{...t.position}]));this._update(t=>{t.nodes=function(t){const e=new Map(t.nodes.map(t=>[t.id,t])),i=new Map,{columns:o,unconnected:n}=no(t);let r=40,a=40;for(const t of o){let o=40,n=0;for(const a of t){const t=e.get(a);if(!t)continue;const s=ao(t);i.set(a,ro(t,r,o)),o+=s.height+50,n=Math.max(n,s.width)}a=Math.max(a,o),r+=n+80}let s=40;for(const t of n){const o=e.get(t);o&&(i.set(t,ro(o,s,a)),s+=ao(o).width+80)}return t.nodes.map(t=>i.get(t.id)??t)}(t)}),this._layoutUndo=t}_undoLayout(){const t=this._layoutUndo;t&&this._update(e=>{for(const i of e.nodes)i.position=t[i.id]??i.position})}_insertTemplate(){const t=eo.find(t=>t.id===this._templateId);t&&this._update(e=>{const i=io(t,e,t=>bt(t));e.nodes.push(...i.nodes),e.connections.push(...i.connections)})}_addAddons(t,e){this._update(i=>{const o=i.nodes.find(e=>e.id===t);o&&(o.addons=[...o.addons??[],...e])})}_deleteNode(t){this._update(e=>{e.nodes=e.nodes.filter(e=>e.id!==t),e.connections=e.connections.filter(e=>mt(e.from)?.nodeId!==t&&mt(e.to)?.nodeId!==t)}),this._selectedNodeId=void 0,this._pendingPort=void 0,this._openList()}_remaining(t,e){const i=(t.addons??[]).filter(t=>t.type===e.type).length;return ki(e)-i}_addAddon(t,e){let i=-1;this._update(o=>{const n=o.nodes.find(e=>e.id===t),r=n&&he(n.type)?.addons?.find(t=>t.type===e);if(!n||!r||this._remaining(n,r)<=0)return;const a=new Set((n.addons??[]).filter(t=>t.type===e).map(t=>t.slot)),s={type:e,slot:r.slots?.find(t=>!a.has(t))};n.addons=[...n.addons??[],s],i=n.addons.length-1}),i>=0&&!wi[e].entityless&&this._openAddon(t,i)}_patchAddon(t,e,i){this._update(o=>{const n=o.nodes.find(e=>e.id===t)?.addons?.[e];n&&Object.assign(n,i)})}_removeAddon(t,e){this._update(i=>{const o=i.nodes.find(e=>e.id===t),n=o?.addons?.[e];if(o?.addons&&n){if("loop"===n.type){const n=o.addons.slice(0,e+1).filter(t=>"loop"===t.type).length;i.connections=function(t,e,i){const o=t=>{const o=mt(t),n=o?.nodeId===e?Ki.exec(o.portId):null;if(!o||!n)return t;const r=Number(n[1]);return r!==i?r<i?t:yt({nodeId:e,portId:`loop_${r-1}_${n[2]}`}):void 0},n=[];for(const e of t.connections){const t=o(e.from),i=o(e.to);t&&i&&n.push({from:t,to:i})}return n}(i,t,n)}o.addons=o.addons.filter((t,i)=>i!==e),o.addons.length||(o.addons=void 0),i.connections=Di(i,t)}}),this._openNode(t)}_connect(t,e){this._update(i=>{const o=Oi(i,t,e);o&&!ji(i,o)&&i.connections.push(o)})}_removeConnections(t){const e=new Set(t.map($t));this._update(t=>{t.connections=t.connections.filter(t=>!e.has($t(t)))})}_deleteSelectedConnection(){const t=this._selectedEdgeId;t&&(this._update(e=>{e.connections=e.connections.filter(e=>$t(e)!==t)}),this._selectedEdgeId=void 0)}_addOverlay(){this._update(t=>{t.overlays.push({id:bt("ov"),position:{x:40,y:40+30*t.overlays.length},entity_id:"",template:"{{ state }}"})})}_removeOverlay(t){this._update(e=>{e.overlays=e.overlays.filter(e=>e.id!==t)})}_patchOverlay(t,e){this._update(i=>{const o=i.overlays.find(e=>e.id===t);o&&Object.assign(o,e)})}_addRule(t){this._update(e=>{const i=e.overlays.find(e=>e.id===t.id);i&&(i.rules=[...i.rules??[],{condition:"state",effect:{}}])})}_updateRule(t,e,i){this._update(o=>{const n=o.overlays.find(e=>e.id===t),r=n?.rules?.[e];if(!n?.rules||!r)return;const a=i(r);n.rules=a?n.rules.map((t,i)=>i===e?a:t):n.rules.filter((t,i)=>i!==e),n.rules.length||(n.rules=void 0)})}_onNodeSelect(t){const{nodeId:e}=t.detail;this._selectedEdgeId=void 0,"list"!==this._view.kind&&e?e!==this._view.nodeId&&this._openNode(e):this._selectedNodeId=e}_onEdgeSelect(t){this._selectedEdgeId=t.detail.edgeId,this._pendingPort=void 0}_onNodeMove(t){this._moveNode(t.detail.nodeId,t.detail.position)}_onPortClick(t){const e={nodeId:t.detail.nodeId,portId:t.detail.portId},i=this._pendingPort;i?(this._pendingPort=void 0,i.nodeId===e.nodeId&&i.portId===e.portId||this._connect(i,e)):this._pendingPort=e}};Vo.styles=a`
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
  `,t([_t()],Vo.prototype,"_hass",void 0),t([_t()],Vo.prototype,"_config",void 0),t([_t()],Vo.prototype,"_tab",void 0),t([_t()],Vo.prototype,"_view",void 0),t([_t()],Vo.prototype,"_selectedNodeId",void 0),t([_t()],Vo.prototype,"_selectedEdgeId",void 0),t([_t()],Vo.prototype,"_pendingPort",void 0),t([_t()],Vo.prototype,"_newDeviceType",void 0),t([_t()],Vo.prototype,"_newAddonType",void 0),t([_t()],Vo.prototype,"_entityToAdd",void 0),t([_t()],Vo.prototype,"_entityDeviceType",void 0),t([_t()],Vo.prototype,"_templateId",void 0),t([_t()],Vo.prototype,"_layoutUndo",void 0),t([_t()],Vo.prototype,"_drawing",void 0),Vo=t([pt("heating-visualizer-editor")],Vo);let Ro=class extends lt{constructor(){super(...arguments),this._i18n=new Me(this,Se)}setConfig(t){if(!t||"object"!=typeof t)throw new Error("Invalid card configuration");this._config=$e(t)}getCardSize(){return 6}getGridOptions(){return{columns:12,min_columns:6}}static getConfigElement(){return document.createElement("heating-visualizer-editor")}static getStubConfig(){return{schema_version:2,...ft}}render(){if(!this._config)return B``;const t=gt(this._config),e=we(this._i18n.value?.language);return B`
      <ha-card>
        ${t.nodes.length||t.overlays.length?B`
            <heating-schema-canvas
              .schema="${t}"
              .pipeStyle="${this._config.pipe_style??"orthogonal"}"
              .editable="${!1}"
            ></heating-schema-canvas>
          `:B`<div class="empty">${e.t("card.empty")}</div>`}
      </ha-card>
    `}};Ro.styles=a`
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
  `,t([_t()],Ro.prototype,"_config",void 0),Ro=t([pt("heating-visualizer-card")],Ro),window.customCards=window.customCards??[],window.customCards.push({type:"heating-visualizer-card",name:"Heating Visualizer",description:"Design and visualize heating system schemas with live sensor overlays.",preview:!0,documentationURL:"https://github.com/vasicekmilan90-eng/heating_vizualizer"}),console.info("%c HEATING-VISUALIZER-CARD %c v0.5.0 ","color: white; background: #039be5; font-weight: bold;","color: #039be5; background: white; font-weight: bold;");export{Ro as HeatingVisualizerCard};
//# sourceMappingURL=heating-visualizer-card.js.map
