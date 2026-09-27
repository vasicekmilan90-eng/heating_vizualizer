function e(e,t,i,o){var n,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),n=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(t,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new r(i,e,o)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,o))(t)})(e):e,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,v=globalThis,_=v.trustedTypes,y=_?_.emptyScript:"",m=v.reactiveElementPolyfillSupport,$=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?y:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},g=(e,t)=>!l(e,t),b={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:g};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&d(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:n}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const r=o?.call(this);n?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,o)=>{if(i)e.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of o){const o=document.createElement("style"),n=t.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=i.cssText,e.appendChild(o)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(t,i.type);this._$Em=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=i.getPropertyOptions(o),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=o;const r=n.fromAttribute(t,e.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(e,t,i,o=!1,n){if(void 0!==e){const r=this.constructor;if(!1===o&&(n=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??g)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:n},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==n||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,m?.({ReactiveElement:x}),(v.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,w=e=>e,A=k.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,M=`<${P}>`,N=document,I=()=>N.createComment(""),L=e=>null===e||"object"!=typeof e&&"function"!=typeof e,O=Array.isArray,z="[ \t\n\f\r]",K=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,U=/>/g,T=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,R=/"/g,j=/^(?:script|style|textarea|title)$/i,V=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),B=V(1),F=V(2),Z=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),W=new WeakMap,J=N.createTreeWalker(N,129);function G(e,t){if(!O(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const Q=(e,t)=>{const i=e.length-1,o=[];let n,r=2===t?"<svg>":3===t?"<math>":"",s=K;for(let t=0;t<i;t++){const i=e[t];let a,l,d=-1,c=0;for(;c<i.length&&(s.lastIndex=c,l=s.exec(i),null!==l);)c=s.lastIndex,s===K?"!--"===l[1]?s=H:void 0!==l[1]?s=U:void 0!==l[2]?(j.test(l[2])&&(n=RegExp("</"+l[2],"g")),s=T):void 0!==l[3]&&(s=T):s===T?">"===l[0]?(s=n??K,d=-1):void 0===l[1]?d=-2:(d=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?T:'"'===l[3]?R:D):s===R||s===D?s=T:s===H||s===U?s=K:(s=T,n=void 0);const h=s===T&&e[t+1].startsWith("/>")?" ":"";r+=s===K?i+M:d>=0?(o.push(a),i.slice(0,d)+E+i.slice(d)+C+h):i+C+(-2===d?t:h)}return[G(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class X{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let n=0,r=0;const s=e.length-1,a=this.parts,[l,d]=Q(e,t);if(this.el=X.createElement(l,i),J.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=J.nextNode())&&a.length<s;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(E)){const t=d[r++],i=o.getAttribute(e).split(C),s=/([.?@])?(.*)/.exec(t);a.push({type:1,index:n,name:s[2],strings:i,ctor:"."===s[1]?oe:"?"===s[1]?ne:"@"===s[1]?re:ie}),o.removeAttribute(e)}else e.startsWith(C)&&(a.push({type:6,index:n}),o.removeAttribute(e));if(j.test(o.tagName)){const e=o.textContent.split(C),t=e.length-1;if(t>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],I()),J.nextNode(),a.push({type:2,index:++n});o.append(e[t],I())}}}else if(8===o.nodeType)if(o.data===P)a.push({type:2,index:n});else{let e=-1;for(;-1!==(e=o.data.indexOf(C,e+1));)a.push({type:7,index:n}),e+=C.length-1}n++}}static createElement(e,t){const i=N.createElement("template");return i.innerHTML=e,i}}function Y(e,t,i=e,o){if(t===Z)return t;let n=void 0!==o?i._$Co?.[o]:i._$Cl;const r=L(t)?void 0:t._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(e),n._$AT(e,i,o)),void 0!==o?(i._$Co??=[])[o]=n:i._$Cl=n),void 0!==n&&(t=Y(e,n._$AS(e,t.values),n,o)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??N).importNode(t,!0);J.currentNode=o;let n=J.nextNode(),r=0,s=0,a=i[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new te(n,n.nextSibling,this,e):1===a.type?t=new a.ctor(n,a.name,a.strings,this,e):6===a.type&&(t=new se(n,this,e)),this._$AV.push(t),a=i[++s]}r!==a?.index&&(n=J.nextNode(),r++)}return J.currentNode=N,o}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),L(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==Z&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>O(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(N.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new ee(o,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new X(e)),t}k(e){O(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const n of e)o===t.length?t.push(i=new te(this.O(I()),this.O(I()),this,this.options)):i=t[o],i._$AI(n),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=w(e).nextSibling;w(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(e,t=this,i,o){const n=this.strings;let r=!1;if(void 0===n)e=Y(this,e,t,0),r=!L(e)||e!==this._$AH&&e!==Z,r&&(this._$AH=e);else{const o=e;let s,a;for(e=n[0],s=0;s<n.length-1;s++)a=Y(this,o[i+s],t,s),a===Z&&(a=this._$AH[s]),r||=!L(a)||a!==this._$AH[s],a===q?e=q:e!==q&&(e+=(a??"")+n[s+1]),this._$AH[s]=a}r&&!o&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class oe extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class ne extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class re extends ie{constructor(e,t,i,o,n){super(e,t,i,o,n),this.type=5}_$AI(e,t=this){if((e=Y(this,e,t,0)??q)===Z)return;const i=this._$AH,o=e===q&&i!==q||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==q&&(i===q||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}}const ae=k.litHtmlPolyfillSupport;ae?.(X,te),(k.litHtmlVersions??=[]).push("3.3.3");const le=globalThis;class de extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const o=i?.renderBefore??t;let n=o._$litPart$;if(void 0===n){const e=i?.renderBefore??null;o._$litPart$=n=new te(t.insertBefore(I(),e),e,void 0,i??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}}de._$litElement$=!0,de.finalized=!0,le.litElementHydrateSupport?.({LitElement:de});const ce=le.litElementPolyfillSupport;ce?.({LitElement:de}),(le.litElementVersions??=[]).push("4.2.2");const he=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},pe={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:g},ue=(e=pe,t,i)=>{const{kind:o,metadata:n}=i;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===o){const{name:o}=i;return{set(i){const n=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,n,e,!0,i)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=i;return function(i){const n=this[o];t.call(this,i),this.requestUpdate(o,n,e,!0,i)}}throw Error("Unsupported decorator location: "+o)};function ve(e){return(t,i)=>"object"==typeof i?ue(e,t,i):((e,t,i)=>{const o=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),o?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function _e(e){return ve({...e,state:!0,attribute:!1})}const ye={nodes:[],edges:[],overlays:[]},me={outdoor_unit:"heat_pump",gas_boiler:"heating_boiler",electric_boiler:"heating_boiler",solid_fuel_boiler:"heating_boiler",flow_meter:"pipe_sensor",pressure_gauge:"pipe_sensor",heat_meter:"pipe_sensor",dhw_circulation_pump:"circulation_pump"};function $e(e){return{...e,type:"custom:heating-visualizer-card",schema:(t=e.schema,{nodes:(t?.nodes??[]).map(e=>me[e.type]?{...e,type:me[e.type]}:e),edges:[...t?.edges??[]],overlays:[...t?.overlays??[]]})};var t}function fe(e){return"undefined"!=typeof crypto&&"function"==typeof crypto.randomUUID?`${e}_${crypto.randomUUID().slice(0,8)}`:`${e}_${Math.random().toString(36).slice(2,10)}`}const ge="en",be={en:{devices:{heat_pump:{name:"Heat pump",ports:{cold_in:"Heating water return",hot_out:"Heating water out"},channels:"Displayed values",channel:"Value {0}"},valve_3way:{name:"3-way valve",ports:{in:"Inlet",out_a:"Outlet A",out_b:"Outlet B"}},boiler:{name:"DHW tank",ports:{cold_in:"Cold water inlet",hot_out:"Hot water outlet",coil_in:"Heat exchanger supply",coil_out:"Heat exchanger return"},channels:"Temperature sensors (top, bottom)",channel:"Sensor {0}"},junction:{name:"Junction",ports:{in:"Inlet",out_top:"Top outlet",out_bottom:"Bottom outlet"}},circulation_pump:{name:"Circulation pump",ports:{in:"Inlet",out:"Outlet"}},floor_heating:{name:"Floor heating",ports:{in:"Supply",out:"Return"}},manifold:{name:"Floor heating manifold",ports:{supply_in:"Supply",return_out:"Return",loop_out:"Loop {0} supply",loop_in:"Loop {0} return"},channels:"Loops (actuators)",channel:"Loop {0}"},buffer_tank:{name:"Buffer tank",ports:{source_in:"From heat source",source_out:"Back to heat source",supply_out:"To heating system",return_in:"Return from heating system"},channels:"Temperature sensors (top → bottom)",channel:"Sensor {0}"},mixing_valve:{name:"Mixing valve",ports:{hot_in:"Hot branch",return_in:"Return (bypass)",mixed_out:"Mixed water"}},electric_heater:{name:"Electric flow heater",ports:{in:"Inlet",out:"Outlet"}},inline:{ports:{in:"Inlet",out:"Outlet"}},pipe_sensor:{name:"Sensor / meter"},heat_source:{ports:{supply_out:"Supply",return_in:"Return"}},heating_boiler:{name:"Heating boiler"},solar_collector:{name:"Solar collector",ports:{hot_out:"Hot outlet",cold_in:"Cold inlet"}},four_port:{ports:{primary_in:"Primary supply",primary_out:"Primary return",secondary_out:"Secondary supply",secondary_in:"Secondary return"}},hydraulic_separator:{name:"Hydraulic separator"},plate_heat_exchanger:{name:"Plate heat exchanger"},expansion_vessel:{name:"Expansion vessel",ports:{connection:"Connection"}},safety_valve:{name:"Safety valve",ports:{in:"Inlet",discharge:"Discharge"}},zone_valve:{name:"Zone valve"},terminal:{ports:{in:"Supply",out:"Return"}},radiator:{name:"Radiator"},fancoil:{name:"Fan coil / convector"},outdoor_temperature:{name:"Outdoor temperature"}},editor:{node_name:"Name",node_name_helper:"Empty = device type name",heater_title:"Electric heating element",node_value_entity:"Value entity",node_value_attribute:"Displayed attribute",node_value_attribute_helper:"Empty = entity state, e.g. current_temperature",node_state_position_entity:"Actuator entity",node_state_position_attribute:"Position attribute (%)",node_state_position_helper:"Empty = current_position or the entity state",channel_name:"Name",title:"Schema editor",add_device:"Add device",device_type:"Device type",add_selected_device:"Add selected device",add_heat_pump:"Heat pump",delete_selected:"Delete selected",rotate_selected:"Rotate",empty_hint:"Add a device to start building your schema.",schema_tab:"Schema",overlay_tab:"Overlays",overlays_empty:"No overlays yet. Switch to overlay tab to add sensor labels.",add_overlay:"Add overlay",connection_pending:"Connecting from {0} — click a compatible port",node_state_title:"Selected device state binding",node_state_entity:"State entity",node_state_active:"Active state",node_state_mode_attribute:"Valve mode attribute",node_state_branch_a:"Valve branch A value",node_state_branch_b:"Valve branch B value",default_value:"Default: {0}"},overlay:{entity:"Entity",name:"Name",template:"Display template",rules:"Conditional rules",add_rule:"Add rule",rule:{condition:"Condition",condition_state:"State equals",condition_numeric:"Numeric value",entity:"Entity",entity_helper:"Empty = overlay entity",state:"State",above:"Above",below:"Below",color:"Text color",hide:"Hide overlay"}},card:{empty:"No schema configured. Edit this card to design your heating layout."}},cs:{devices:{heat_pump:{name:"Tepelné čerpadlo",ports:{cold_in:"Vratka topné vody",hot_out:"Výstup topné vody"},channels:"Zobrazené hodnoty",channel:"Hodnota {0}"},valve_3way:{name:"Třícestný ventil",ports:{in:"Vstup",out_a:"Výstup A",out_b:"Výstup B"}},boiler:{name:"Bojler",ports:{cold_in:"Studená voda – vstup",hot_out:"Teplá voda – výstup",coil_in:"Výměník – přívod od zdroje",coil_out:"Výměník – vratka ke zdroji"},channels:"Teplotní čidla (nahoře, dole)",channel:"Čidlo {0}"},junction:{name:"Uzel",ports:{in:"Vstup",out_top:"Horní výstup",out_bottom:"Spodní výstup"}},circulation_pump:{name:"Oběhové čerpadlo",ports:{in:"Vstup",out:"Výstup"}},floor_heating:{name:"Podlahové topení",ports:{in:"Přívod",out:"Vratka"}},manifold:{name:"Rozdělovač podlahového topení",ports:{supply_in:"Přívod",return_out:"Vratka",loop_out:"Okruh {0} – přívod",loop_in:"Okruh {0} – vratka"},channels:"Okruhy (termopohony)",channel:"Okruh {0}"},buffer_tank:{name:"Akumulační nádrž",ports:{source_in:"Od zdroje tepla",source_out:"Zpět ke zdroji tepla",supply_out:"Do topného systému",return_in:"Vratka z topného systému"},channels:"Teplotní čidla (shora dolů)",channel:"Čidlo {0}"},mixing_valve:{name:"Směšovací ventil",ports:{hot_in:"Teplá větev",return_in:"Vratka (bypass)",mixed_out:"Smíšená voda"}},electric_heater:{name:"Průtokový elektrický ohřívač",ports:{in:"Vstup",out:"Výstup"}},inline:{ports:{in:"Vstup",out:"Výstup"}},pipe_sensor:{name:"Čidlo / měřidlo"},heat_source:{ports:{supply_out:"Přívod",return_in:"Vratka"}},heating_boiler:{name:"Kotel"},solar_collector:{name:"Solární kolektor",ports:{hot_out:"Teplý výstup",cold_in:"Studený vstup"}},four_port:{ports:{primary_in:"Primár – přívod",primary_out:"Primár – vratka",secondary_out:"Sekundár – přívod",secondary_in:"Sekundár – vratka"}},hydraulic_separator:{name:"Hydraulický vyrovnávač"},plate_heat_exchanger:{name:"Deskový výměník"},expansion_vessel:{name:"Expanzní nádoba",ports:{connection:"Připojení"}},safety_valve:{name:"Pojistný ventil",ports:{in:"Vstup",discharge:"Výtok"}},zone_valve:{name:"Zónový ventil"},terminal:{ports:{in:"Přívod",out:"Vratka"}},radiator:{name:"Radiátor"},fancoil:{name:"Fancoil / konvektor"},outdoor_temperature:{name:"Venkovní teplota"}},editor:{node_name:"Název",node_name_helper:"Prázdné = název typu zařízení",heater_title:"Elektrická topná spirála",node_value_entity:"Entita hodnoty",node_value_attribute:"Zobrazený atribut",node_value_attribute_helper:"Prázdné = stav entity, např. current_temperature",node_state_position_entity:"Entita pohonu",node_state_position_attribute:"Atribut polohy (%)",node_state_position_helper:"Prázdné = current_position nebo stav entity",channel_name:"Název",title:"Editor schématu",add_device:"Přidat zařízení",device_type:"Typ zařízení",add_selected_device:"Přidat vybrané zařízení",add_heat_pump:"Tepelné čerpadlo",delete_selected:"Smazat vybrané",rotate_selected:"Otočit",empty_hint:"Přidejte zařízení a začněte sestavovat schéma.",schema_tab:"Schéma",overlay_tab:"Popisky",overlays_empty:"Zatím žádné popisky. Přepněte na záložku Popisky.",add_overlay:"Přidat popisek",connection_pending:"Napojování z {0} — klikněte na kompatibilní port",node_state_title:"Stavové napojení vybraného zařízení",node_state_entity:"Entita stavu",node_state_active:"Aktivní stav",node_state_mode_attribute:"Atribut režimu ventilu",node_state_branch_a:"Hodnota větve A",node_state_branch_b:"Hodnota větve B",default_value:"Výchozí: {0}"},overlay:{entity:"Entita",name:"Název",template:"Šablona zobrazení",rules:"Podmíněná pravidla",add_rule:"Přidat pravidlo",rule:{condition:"Podmínka",condition_state:"Stav je roven",condition_numeric:"Číselná hodnota",entity:"Entita",entity_helper:"Prázdné = entita popisku",state:"Stav",above:"Nad",below:"Pod",color:"Barva textu",hide:"Skrýt popisek"}},card:{empty:"Schéma není nakonfigurováno. Upravte kartu a navrhněte topné schéma."}}};function xe(e,t){let i=e;for(const e of t.split(".")){if(void 0===i||"string"==typeof i)return;i=i[e]}return"string"==typeof i?i:void 0}class ke{constructor(e){this.language=e}t(e,...t){let i=xe(be[this.language],e)??xe(be[ge],e)??e;return t.forEach((e,t)=>{i=i.replace(`{${t}}`,e)}),i}}function we(e){return new ke(function(e){if(!e)return ge;if(be[e])return e;const t=e.split("-")[0];return be[t]?t:ge}(e))}const Ae="states",Se="hassFormatters",Ee="hassInternationalization";class Ce{constructor(e,t){this._host=e,this._context=t,this._callback=(e,t)=>{this._unsubscribe&&this._unsubscribe!==t&&this._unsubscribe(),this._unsubscribe=t,e!==this.value&&(this.value=e,this._host.requestUpdate())},e.addController(this)}hostConnected(){const e=new Event("context-request",{bubbles:!0,composed:!0});e.context=this._context,e.contextTarget=this._host,e.callback=this._callback,e.subscribe=!0,this._host.dispatchEvent(e)}hostDisconnected(){this._unsubscribe?.(),this._unsubscribe=void 0}}const Pe={type:"manifold",labelKey:"devices.manifold.name",width:184,height:130,ports:[{id:"supply_in",labelKey:"devices.manifold.ports.supply_in",kind:"inlet",position:{x:0,y:30}},{id:"return_out",labelKey:"devices.manifold.ports.return_out",kind:"outlet",position:{x:0,y:100}}],channels:{kind:"switch",titleKey:"devices.manifold.channels",itemKey:"devices.manifold.channel",min:1,max:12,default:4},resolve:e=>function(e){const t=[];for(let i=0;i<e;i++){const e=50+36*i,o=String(i+1);t.push({id:`loop_${o}_out`,labelKey:"devices.manifold.ports.loop_out",labelArgs:[o],kind:"outlet",position:{x:e,y:0}},{id:`loop_${o}_in`,labelKey:"devices.manifold.ports.loop_in",labelArgs:[o],kind:"inlet",position:{x:e,y:130}})}return{...Pe,width:50+36*e-10,ports:[...Pe.ports,...t]}}(e.channels?.length||4)},Me={type:"heat_pump",labelKey:"devices.heat_pump.name",width:170,height:120,ports:[{id:"hot_out",labelKey:"devices.heat_pump.ports.hot_out",kind:"outlet",position:{x:170,y:40}},{id:"cold_in",labelKey:"devices.heat_pump.ports.cold_in",kind:"inlet",position:{x:170,y:90}}],channels:{kind:"sensor",titleKey:"devices.heat_pump.channels",itemKey:"devices.heat_pump.channel",min:0,max:4,default:0}};const Ne={type:Ie="pipe_sensor",labelKey:`devices.${Ie}.name`,width:80,height:44,ports:[{id:"in",labelKey:"devices.inline.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out",labelKey:"devices.inline.ports.out",kind:"outlet",position:{x:80,y:30}}],valueDisplay:"only"};var Ie;const Le=function(e){return{type:e,labelKey:`devices.${e}.name`,width:100,height:130,valueDisplay:"with_state",ports:[{id:"supply_out",labelKey:"devices.heat_source.ports.supply_out",kind:"outlet",position:{x:100,y:35}},{id:"return_in",labelKey:"devices.heat_source.ports.return_in",kind:"inlet",position:{x:100,y:105}}]}}("heating_boiler");function Oe(e,t,i){const o=(e,t,i,o)=>({id:e,labelKey:`devices.four_port.ports.${e}`,kind:t,position:{x:i,y:o}});return{type:e,labelKey:`devices.${e}.name`,width:t,height:i,ports:[o("primary_in","inlet",0,30),o("primary_out","outlet",0,i-30),o("secondary_out","outlet",t,30),o("secondary_in","inlet",t,i-30)]}}const ze={...Oe("hydraulic_separator",80,160),valueDisplay:"only"},Ke=Oe("plate_heat_exchanger",100,120);function He(e){return{type:e,labelKey:`devices.${e}.name`,width:130,height:80,valueDisplay:"with_state",ports:[{id:"in",labelKey:"devices.terminal.ports.in",kind:"inlet",position:{x:0,y:66}},{id:"out",labelKey:"devices.terminal.ports.out",kind:"outlet",position:{x:130,y:66}}]}}const Ue=He("radiator"),Te=He("fancoil"),De=[Me,Le,{type:"solar_collector",labelKey:"devices.solar_collector.name",width:150,height:100,valueDisplay:"with_state",ports:[{id:"hot_out",labelKey:"devices.solar_collector.ports.hot_out",kind:"outlet",position:{x:150,y:22}},{id:"cold_in",labelKey:"devices.solar_collector.ports.cold_in",kind:"inlet",position:{x:150,y:84}}]},{type:"boiler",labelKey:"devices.boiler.name",width:100,height:140,heater:!0,ports:[{id:"coil_in",labelKey:"devices.boiler.ports.coil_in",kind:"inlet",position:{x:0,y:50}},{id:"coil_out",labelKey:"devices.boiler.ports.coil_out",kind:"outlet",position:{x:0,y:100}},{id:"hot_out",labelKey:"devices.boiler.ports.hot_out",kind:"outlet",position:{x:100,y:30}},{id:"cold_in",labelKey:"devices.boiler.ports.cold_in",kind:"inlet",position:{x:100,y:118}}],channels:{kind:"sensor",titleKey:"devices.boiler.channels",itemKey:"devices.boiler.channel",min:0,max:2,default:1}},{type:"buffer_tank",labelKey:"devices.buffer_tank.name",width:100,height:186,heater:!0,ports:[{id:"source_in",labelKey:"devices.buffer_tank.ports.source_in",kind:"inlet",position:{x:0,y:40}},{id:"source_out",labelKey:"devices.buffer_tank.ports.source_out",kind:"outlet",position:{x:0,y:150}},{id:"supply_out",labelKey:"devices.buffer_tank.ports.supply_out",kind:"outlet",position:{x:100,y:40}},{id:"return_in",labelKey:"devices.buffer_tank.ports.return_in",kind:"inlet",position:{x:100,y:150}}],channels:{kind:"sensor",titleKey:"devices.buffer_tank.channels",itemKey:"devices.buffer_tank.channel",min:1,max:5,default:3}},ze,Ke,{type:"expansion_vessel",labelKey:"devices.expansion_vessel.name",width:70,height:110,valueDisplay:"only",ports:[{id:"connection",labelKey:"devices.expansion_vessel.ports.connection",kind:"inlet",position:{x:35,y:110}}]},{type:"safety_valve",labelKey:"devices.safety_valve.name",width:70,height:90,ports:[{id:"in",labelKey:"devices.safety_valve.ports.in",kind:"inlet",position:{x:30,y:90}},{id:"discharge",labelKey:"devices.safety_valve.ports.discharge",kind:"outlet",position:{x:70,y:56}}]},{type:"valve_3way",labelKey:"devices.valve_3way.name",width:100,height:100,ports:[{id:"in",labelKey:"devices.valve_3way.ports.in",kind:"inlet",position:{x:0,y:50}},{id:"out_a",labelKey:"devices.valve_3way.ports.out_a",kind:"outlet",position:{x:100,y:25}},{id:"out_b",labelKey:"devices.valve_3way.ports.out_b",kind:"outlet",position:{x:100,y:75}}]},{type:"mixing_valve",labelKey:"devices.mixing_valve.name",width:100,height:110,ports:[{id:"hot_in",labelKey:"devices.mixing_valve.ports.hot_in",kind:"inlet",position:{x:0,y:70}},{id:"return_in",labelKey:"devices.mixing_valve.ports.return_in",kind:"inlet",position:{x:50,y:110}},{id:"mixed_out",labelKey:"devices.mixing_valve.ports.mixed_out",kind:"outlet",position:{x:100,y:70}}]},{type:"zone_valve",labelKey:"devices.zone_valve.name",width:80,height:70,ports:[{id:"in",labelKey:"devices.inline.ports.in",kind:"inlet",position:{x:0,y:50}},{id:"out",labelKey:"devices.inline.ports.out",kind:"outlet",position:{x:80,y:50}}]},{type:"circulation_pump",labelKey:"devices.circulation_pump.name",width:90,height:90,ports:[{id:"in",labelKey:"devices.circulation_pump.ports.in",kind:"inlet",position:{x:0,y:45}},{id:"out",labelKey:"devices.circulation_pump.ports.out",kind:"outlet",position:{x:90,y:45}}]},Pe,{type:"floor_heating",labelKey:"devices.floor_heating.name",width:140,height:90,ports:[{id:"in",labelKey:"devices.floor_heating.ports.in",kind:"inlet",position:{x:0,y:45}},{id:"out",labelKey:"devices.floor_heating.ports.out",kind:"outlet",position:{x:140,y:45}}]},Ue,Te,{type:"electric_heater",labelKey:"devices.electric_heater.name",width:120,height:60,ports:[{id:"in",labelKey:"devices.electric_heater.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out",labelKey:"devices.electric_heater.ports.out",kind:"outlet",position:{x:120,y:30}}]},{type:"junction",labelKey:"devices.junction.name",width:60,height:60,ports:[{id:"in",labelKey:"devices.junction.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out_top",labelKey:"devices.junction.ports.out_top",kind:"outlet",position:{x:60,y:15}},{id:"out_bottom",labelKey:"devices.junction.ports.out_bottom",kind:"outlet",position:{x:60,y:45}}]},Ne,{type:"outdoor_temperature",labelKey:"devices.outdoor_temperature.name",width:100,height:50,valueDisplay:"only",ports:[]}],Re=De.map(e=>e.type),je=new Map(De.map(e=>[e.type,e]));function Ve(e){return je.get(e)}function Be(e){const t=je.get(e.type);return t?.resolve?t.resolve(e):t}function Fe(e){return((e??0)%360+360)%360}function Ze(e,t){const i=t*Math.PI/180,o=Math.cos(i),n=Math.sin(i);return{x:Math.round(1e3*(e.x*o-e.y*n))/1e3,y:Math.round(1e3*(e.x*n+e.y*o))/1e3}}function qe(e,t){const{x:i,y:o}=t.position,n=[[i,{x:-1,y:0}],[e.width-i,{x:1,y:0}],[o,{x:0,y:-1}],[e.height-o,{x:0,y:1}]];return n.sort((e,t)=>e[0]-t[0]),n[0][1]}function We(e,t){const i=Be(e);if(!i)return;const o=i.ports.find(e=>e.id===t);if(!o)return;const n=Fe(e.rotation),r=i.width/2,s=i.height/2,a=Ze({x:o.position.x-r,y:o.position.y-s},n);return{nodeId:e.id,portId:o.id,x:e.position.x+r+a.x,y:e.position.y+s+a.y,kind:o.kind,direction:Ze(qe(i,o),n)}}function Je(e,t){const i=Fe(e.rotation)%180!=0,o=i?t.height:t.width,n=i?t.width:t.height;return{x:e.position.x+(t.width-o)/2,y:e.position.y+(t.height-n)/2,width:o,height:n}}function Ge(e,t){return e.nodeId===t.nodeId&&e.portId===t.portId}function Qe(e,t=10){return Math.round(e/t)*t}function Xe(e,t,i){if(!e||!i.entity_id)return"—";const o=e[i.entity_id];if(!o)return"—";if(i.template)return function(e,t,i){return e.replace(/\{\{\s*state\s*\}\}/g,t).replace(/\{\{\s*attr\(['"](\w+)['"]\)\s*\}\}/g,(e,t)=>String(i[t]??""))}(i.template,o.state,o.attributes);if(t)return t.formatEntityState(o);const n=o.attributes.unit_of_measurement;return n?`${o.state} ${n}`:o.state}const Ye=new Set(["primary","accent","disabled","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"]);function et(e){return Ye.has(e)?`var(--${e}-color)`:e}function tt(e,t,i){const o=e[t.entity||i];if(!o)return!1;if("state"===t.condition)return void 0!==t.state&&o.state===t.state;if(void 0===t.above&&void 0===t.below)return!1;const n=Number(o.state);return!Number.isNaN(n)&&((void 0===t.above||n>t.above)&&(void 0===t.below||n<t.below))}const it=new Set(["heating","preheating"]);function ot(e,t,i){if(!e||!t?.entity_id)return{active:!1};const o=e[t.entity_id];if(!o)return{active:!1};const n=t.value_attribute,r=void 0!==n?o.attributes[n]:void 0,s=void 0!==r,a=s?r:o.state,l=Number(a),d=o.attributes.unit_of_measurement;let c;c=void 0!==n&&s?i?i.formatEntityAttributeValue(o,n):String(r):i?i.formatEntityState(o):d?`${o.state} ${d}`:o.state;const h=function(e,t){if(void 0!==t)return e.state===t;const i=e.attributes.hvac_action;return"string"==typeof i?it.has(i):"on"===e.state||"heat"===e.state||"open"===e.state}(o,t.active_state),p=t.mode_attribute??"position",u=String(o.attributes[p]??o.state??"");let v;return u===(t.branch_a_value??"a")&&(v="a"),u===(t.branch_b_value??"b")&&(v="b"),{active:h,valveBranch:v,value:c,numeric:""!==String(a??"").trim()&&Number.isFinite(l)?l:void 0,position:nt(o,t.mode_attribute),unit:d,fromAttribute:s,deviceClass:o.attributes.device_class}}function nt(e,t){const i=t?e.attributes[t]:e.attributes.current_position??e.state,o=Number(i);if(null!=i&&""!==i&&Number.isFinite(o))return Math.min(100,Math.max(0,o))}const rt="#ef5350",st="#42a5f5",at="#4caf50",lt="#ff7043",dt="var(--card-background-color, #1c1c1c)",ct="var(--divider-color, #888)",ht="var(--primary-color, #03a9f4)";function pt(e){if(void 0===e)return ct;const t=Math.min(1,Math.max(0,(e-20)/40));return`hsl(${Math.round(220*(1-t))}, 75%, 50%)`}function ut(e,t,i=at){return e.active?i:t?ht:ct}function vt(e){return e?2.5:1.5}function _t(e,t){return e.ports.map(e=>F`
    <circle
      class="port port-${e.kind}"
      data-port-id="${e.id}"
      cx="${e.position.x}" cy="${e.position.y}" r="5"
      fill="${dt}"
      stroke="${"inlet"===e.kind?"#4fc3f7":"#ff8a65"}"
      stroke-width="2"
    ><title>${t.t(e.labelKey,...e.labelArgs??[])}</title></circle>
  `)}function yt(e,t,i,o){const n=i/6;let r=`M ${e} ${t}`;for(let i=1;i<=6;i++)r+=` L ${e+i*n} ${t+(i%2==0?0:-8)}`;const s=o.active?lt:ct;return F`
    <path class="heater ${o.active?"active":""}" d="${r}" fill="none"
      stroke="${s}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
  `}function mt(e,t){return e.ports.map(i=>{const{x:o,y:n}=i.position,r=0===o?t:o===e.width?-t:0,s=0===n?t:n===e.height?-t:0;return F`<line x1="${o}" y1="${n}" x2="${o+r}" y2="${n+s}" stroke="${ct}" stroke-width="2" />`})}function $t(e){return void 0!==e.numeric||e.fromAttribute?e.value:void 0}const ft="#ffb300";function gt(e,t,i,o,n){switch(e){case"heating_boiler":return function(e,t,i,o){const n=e.width/2-4,r=e.height/2+14,s=$t(o),a=o.active?lt:ct,l=[-14,0,14].map(e=>{const t=n+e;return F`
      <path d="M ${t} ${r+18} C ${t-6} ${r+10}, ${t+6} ${r+2}, ${t} ${r-6}
        C ${t-6} ${r-14}, ${t+6} ${r-20}, ${t} ${r-26}"
        fill="none" stroke="${a}" stroke-width="2.5" stroke-linecap="round" />
    `});return F`
    <g class="device device-heat-source">
      ${mt(e,12)}
      <rect x="8" y="10" width="${e.width-20}" height="${e.height-20}" rx="8"
        fill="${dt}" stroke="${ut(o,i,lt)}"
        stroke-width="${vt(i)}" />
      ${s?F`<text x="${n}" y="30" text-anchor="middle" class="device-value">${s}</text>`:F``}
      ${l}
      ${_t(e,t)}
    </g>
  `}(t,i,o,n);case"solar_collector":return function(e,t,i,o){const n=ut(o,i,ft),r=$t(o);return F`
    <g class="device device-solar-collector">
      <path d="M 124 22 L ${e.width} 22 M 100 84 L ${e.width} 84" stroke="${ct}" stroke-width="2" />
      <path d="M 10 84 L 36 22 L 124 22 L 100 84 Z" fill="${dt}"
        stroke="${n}" stroke-width="${vt(i)}" stroke-linejoin="round" />
      <path d="M 58 22 L 32 84 M 80 22 L 54 84 M 102 22 L 76 84 M 23 53 L 112 53"
        stroke="${ct}" stroke-width="1" />
      <circle cx="20" cy="14" r="6" fill="${o.active?ft:"none"}" stroke="${ft}" stroke-width="1.5" />
      ${r?F`<text x="67" y="${e.height-2}" text-anchor="middle" class="device-value">${r}</text>`:F``}
      ${_t(e,t)}
    </g>
  `}(t,i,o,n);case"hydraulic_separator":return function(e,t,i,o){const n=25,r=e.width-25,s=e.height-8,a=e.height/2,l=$t(o);return F`
    <g class="device device-hydraulic-separator">
      ${mt(e,n)}
      <rect x="${n}" y="${8}" width="${r-n}" height="${a-8}" fill="${rt}" opacity="0.25" />
      <rect x="${n}" y="${a}" width="${r-n}" height="${s-a}" fill="${st}" opacity="0.25" />
      <rect x="${n}" y="${8}" width="${r-n}" height="${s-8}" rx="${(r-n)/2}"
        fill="none" stroke="${ut(o,i)}" stroke-width="${vt(i)}" />
      ${l?F`<text x="${e.width/2}" y="${a+4}" text-anchor="middle" class="device-value">${l}</text>`:F``}
      ${_t(e,t)}
    </g>
  `}(t,i,o,n);case"plate_heat_exchanger":return function(e,t,i,o){const n=e.width-22,r=[];for(let t=29,i=0;t<n-3;t+=7,i++)r.push(F`<line x1="${t}" y1="18" x2="${t}" y2="${e.height-18}"
      stroke="${i%2==0?rt:st}" stroke-width="2" opacity="0.8" />`);return F`
    <g class="device device-plate-heat-exchanger">
      ${mt(e,22)}
      <rect x="${22}" y="10" width="${n-22}" height="${e.height-20}" rx="4"
        fill="${dt}" stroke="${ut(o,i)}" stroke-width="${vt(i)}" />
      ${r}
      ${_t(e,t)}
    </g>
  `}(t,i,o,n);case"expansion_vessel":return function(e,t,i,o){const n=e.width/2,r=47,s=$t(o);return F`
    <g class="device device-expansion-vessel">
      <line x1="${n}" y1="${86}" x2="${n}" y2="${e.height}" stroke="${ct}" stroke-width="2" />
      <rect x="13" y="${r}" width="${e.width-26}" height="${31}" fill="${st}" opacity="0.2" />
      <rect x="12" y="${8}" width="${e.width-24}" height="${78}" rx="${(e.width-24)/2}"
        fill="none" stroke="${ut(o,i)}" stroke-width="${vt(i)}" />
      <path d="M 13 ${r} Q ${n} ${55} ${e.width-13} ${r}"
        fill="none" stroke="${ct}" stroke-width="1.5" stroke-dasharray="3 2" />
      ${s?F`<text x="${n}" y="${37}" text-anchor="middle" class="device-value">${s}</text>`:F``}
      ${_t(e,t)}
    </g>
  `}(t,i,o,n);case"safety_valve":return function(e,t,i,o){const n=ut(o,i,rt),r=vt(i),s=30,a=56;return F`
    <g class="device device-safety-valve">
      <line x1="${s}" y1="${70}" x2="${s}" y2="${e.height}" stroke="${ct}" stroke-width="2" />
      <line x1="${44}" y1="${a}" x2="${e.width}" y2="${a}" stroke="${ct}" stroke-width="2" />
      <path d="M ${18} ${70} L ${42} ${70} L ${s} ${a} Z M ${44} ${44} L ${44} ${68} L ${s} ${a} Z"
        fill="${o.active?rt:dt}" fill-opacity="${o.active?.5:1}"
        stroke="${n}" stroke-width="${r}" stroke-linejoin="round" />
      <path d="M ${s} ${a} L ${s} ${48} L ${23} ${44} L ${37} ${38} L ${23} ${32}
        L ${37} ${26} L ${23} ${20} L ${s} ${16}"
        fill="none" stroke="${n}" stroke-width="1.5" stroke-linejoin="round" />
      ${_t(e,t)}
    </g>
  `}(t,i,o,n);case"zone_valve":return function(e,t,i,o){const n=ut(o,i),r=vt(i),s=e.width/2,a=50;return F`
    <g class="device device-zone-valve">
      <line x1="0" y1="${a}" x2="${s-16}" y2="${a}" stroke="${ct}" stroke-width="2" />
      <line x1="${s+16}" y1="${a}" x2="${e.width}" y2="${a}" stroke="${ct}" stroke-width="2" />
      <path d="M ${s-16} ${39} L ${s} ${a} L ${s-16} ${61} Z M ${s+16} ${39} L ${s} ${a} L ${s+16} ${61} Z"
        fill="${o.active?at:dt}" fill-opacity="${o.active?.45:1}"
        stroke="${n}" stroke-width="${r}" stroke-linejoin="round" />
      <line x1="${s}" y1="${a}" x2="${s}" y2="30" stroke="${n}" stroke-width="2" />
      <rect x="${s-12}" y="10" width="24" height="20" rx="3"
        fill="${o.active?at:dt}" stroke="${n}" stroke-width="${r}" />
      ${_t(e,t)}
    </g>
  `}(t,i,o,n);case"radiator":return function(e,t,i,o){const n=$t(o),r=[];for(let t=26;t<=e.width-24;t+=10)r.push(F`<line x1="${t}" y1="22" x2="${t}" y2="58" stroke="${ct}" stroke-width="1.5" />`);return F`
    <g class="device device-radiator">
      <path d="M 0 66 L 16 66 L 16 62 M ${e.width-16} 62 L ${e.width-16} 66 L ${e.width} 66"
        fill="none" stroke="${ct}" stroke-width="2" />
      <rect x="16" y="16" width="${e.width-32}" height="46" rx="4"
        fill="${o.active?lt:dt}" fill-opacity="${o.active?.2:1}"
        stroke="${ut(o,i,lt)}" stroke-width="${vt(i)}" />
      ${r}
      <rect x="4" y="26" width="10" height="18" rx="3" fill="${dt}" stroke="${ct}" stroke-width="1.5" />
      ${n?F`<text x="${e.width/2}" y="10" text-anchor="middle" class="device-value">${n}</text>`:F``}
      ${_t(e,t)}
    </g>
  `}(t,i,o,n);case"fancoil":return function(e,t,i,o){const n=$t(o);return F`
    <g class="device device-fancoil">
      <path d="M 0 66 L 16 66 M ${e.width-16} 66 L ${e.width} 66" stroke="${ct}" stroke-width="2" />
      <rect x="16" y="12" width="${e.width-32}" height="54" rx="6"
        fill="${dt}" stroke="${ut(o,i)}" stroke-width="${vt(i)}" />
      <circle cx="${46}" cy="${38}" r="20" fill="none" stroke="${ct}" stroke-width="1.5" />
      <g class="fan ${o.active?"spinning":""}">
        ${[0,90,180,270].map(e=>F`
          <path d="${"M 0 0 C 4 -7, 13 -9, 17 -4 C 12 -1, 5 0, 0 0 Z"}" transform="translate(${46} ${38}) rotate(${e})" fill="${ht}" opacity="0.75" />
        `)}
        <circle cx="${46}" cy="${38}" r="3.5" fill="${ht}" />
      </g>
      <path d="M 76 50 L 104 50 M 76 56 L 104 56" stroke="${ct}" stroke-width="1.5" />
      ${n?F`<text x="90" y="36" text-anchor="middle" class="device-value">${n}</text>`:F``}
      ${_t(e,t)}
    </g>
  `}(t,i,o,n);case"outdoor_temperature":return function(e,t,i){const o=t?ht:ct;return F`
    <g class="device device-outdoor-temperature">
      <rect x="2" y="6" width="${e.width-4}" height="${e.height-12}" rx="${(e.height-12)/2}"
        fill="${dt}" stroke="${o}" stroke-width="${vt(t)}" />
      <circle cx="22" cy="${e.height/2}" r="6" fill="none" stroke="#ffb300" stroke-width="1.5" />
      <path d="M 22 13 V 16 M 22 34 V 37 M 10 25 H 13 M 31 25 H 34 M 14 17 L 16 19 M 28 31 L 30 33 M 14 33 L 16 31 M 28 19 L 30 17"
        stroke="#ffb300" stroke-width="1.5" stroke-linecap="round" />
      <text x="${e.width/2+14}" y="${e.height/2+4}" text-anchor="middle" class="device-value">
        ${i.value??"—"}
      </text>
    </g>
  `}(t,o,n);default:return}}const bt={temperature:"temperature",pressure:"pressure",volume_flow_rate:"flow",energy:"energy",power:"energy"};function xt(e,t,i,o){const n=function(e){const t=e.deviceClass?bt[e.deviceClass]:void 0;return t||(e.unit?.includes("°")?"temperature":"generic")}(o),r=e.width/2,s=e.height-14,a=i?"var(--primary-color, #03a9f4)":"temperature"===n?pt(o.numeric):"var(--primary-color, #03a9f4)",l="energy"===n||"generic"===n;return F`
    <g class="device device-inline-sensor">
      <line x1="0" y1="${s}" x2="${e.width}" y2="${s}" stroke="var(--divider-color, #888)" stroke-width="3" />
      <circle cx="${r}" cy="${s}" r="11" fill="var(--card-background-color, #1c1c1c)"
        stroke="${a}" stroke-width="${i?2.5:2}" />
      <path d="${function(e,t,i){switch(e){case"temperature":return`M ${t-1.5} ${i+2} V ${i-6} A 1.5 1.5 0 0 1 ${t+1.5} ${i-6} V ${i+2} M ${t-3} ${i+4.5} A 3 3 0 1 0 ${t+3} ${i+4.5} A 3 3 0 1 0 ${t-3} ${i+4.5}`;case"flow":return`M ${t-6} ${i} L ${t+5} ${i} M ${t+1} ${i-4} L ${t+5} ${i} L ${t+1} ${i+4}`;case"pressure":return`M ${t-6} ${i+3} A 6 6 0 1 1 ${t+6} ${i+3} M ${t} ${i+1} L ${t+4} ${i-4}`;case"energy":return`M ${t+1} ${i-7} L ${t-4} ${i+1} L ${t} ${i+1} L ${t-1} ${i+7} L ${t+4} ${i-1} L ${t} ${i-1} Z`;case"generic":return`M ${t-3} ${i} A 3 3 0 1 0 ${t+3} ${i} A 3 3 0 1 0 ${t-3} ${i} Z`}}(n,r,s)}" fill="${l?a:"none"}"
        stroke="${a}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <text x="${r}" y="${s-17}" text-anchor="middle" class="device-value">${o.value??"—"}</text>
      ${_t(e,t)}
    </g>
  `}function kt(e,t,i,o,n,r={}){const s=r.channels??[];switch(e){case"heat_pump":return function(e,t,i,o,n){const r=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",s=i?2.5:1.5;return F`
    <g class="device device-outdoor-unit">
      <rect x="10" y="12" width="${e.width-20}" height="${e.height-24}" rx="6"
        fill="var(--card-background-color, #1c1c1c)" stroke="${r}" stroke-width="${s}" />
      <circle cx="${58}" cy="${60}" r="34" fill="none" stroke="var(--divider-color, #888)" stroke-width="1.5" />
      <g class="fan ${o.active?"spinning":""}">
        ${[0,90,180,270].map(e=>F`
          <path d="${"M 0 0 C 6 -10, 20 -14, 26 -6 C 18 -2, 8 0, 0 0 Z"}" transform="translate(${58} ${60}) rotate(${e})"
            fill="var(--primary-color, #03a9f4)" opacity="0.75" />
        `)}
        <circle cx="${58}" cy="${60}" r="5" fill="var(--primary-color, #03a9f4)" />
      </g>
      ${n.map((e,t)=>F`
        <text x="104" y="${36+18*t}" class="device-value">
          <title>${e.label??""}</title>${e.value??"—"}
        </text>
      `)}
      ${_t(e,t)}
    </g>
  `}(t,i,o,n,s);case"valve_3way":return function(e,t,i,o){const n=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",r=i?2.5:1.5,s="a"===o.valveBranch?"#4caf50":"var(--divider-color, #555)",a="b"===o.valveBranch?"#4caf50":"var(--divider-color, #555)";return F`
    <g class="device device-valve-3way">
      <polygon
        points="10,50 45,15 45,35 90,35 90,65 45,65 45,85"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${n}" stroke-width="${r}"
      />
      <line x1="45" y1="50" x2="90" y2="25" stroke="${s}" stroke-width="3" />
      <line x1="45" y1="50" x2="90" y2="75" stroke="${a}" stroke-width="3" />
      ${_t(e,t)}
    </g>
  `}(t,i,o,n);case"boiler":return function(e,t,i,o,n,r){const s=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",a=i?2.5:1.5,l=[34,114];return F`
    <g class="device device-boiler">
      <path d="M 88 30 H ${e.width} M 88 118 H ${e.width}" stroke="var(--divider-color, #888)" stroke-width="2" />
      <rect
        x="12" y="8" width="76" height="124" rx="18"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${s}" stroke-width="${a}"
      />
      <path d="${"M 0 50 H 24 L 58 58 L 24 66 L 58 74 L 24 82 L 58 90 L 24 98 L 24 100 H 0"}" fill="none" stroke="${rt}" stroke-width="2" stroke-linejoin="round" opacity="0.8" />
      ${r.slice(0,l.length).map((e,t)=>F`
        <text x="50" y="${l[t]}" text-anchor="middle" class="device-value"
          style="${void 0===e.numeric?"":`fill: ${pt(e.numeric)}`}">
          <title>${e.label??""}</title>${e.value??"—"}
        </text>
      `)}
      ${n?yt(30,126,40,n):F``}
      ${_t(e,t)}
    </g>
  `}(t,i,o,n,r.heater,s);case"junction":return function(e,t,i,o){const n=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return F`
    <g class="device device-junction">
      <circle
        cx="30" cy="30" r="18"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${n}" stroke-width="${i?2.5:1.5}"
      />
      ${_t(e,t)}
    </g>
  `}(t,i,o,n);case"circulation_pump":return function(e,t,i,o){const n=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return F`
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
      ${_t(e,t)}
    </g>
  `}(t,i,o,n);case"floor_heating":return function(e,t,i,o){const n=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return F`
    <g class="device device-floor-heating">
      <rect
        x="10" y="18" width="120" height="55" rx="8"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${n}" stroke-width="${i?2.5:1.5}"
      />
      <path d="M 20 40 C 35 30, 50 50, 65 40 C 80 30, 95 50, 110 40 C 115 37, 120 37, 126 40"
        fill="none" stroke="var(--primary-color, #03a9f4)" stroke-width="2" />
      ${_t(e,t)}
    </g>
  `}(t,i,o,n);case"manifold":return function(e,t,i,o,n){const r=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",s=i?2.5:1.5,a=e.width-8,l=e.ports.filter(e=>e.id.startsWith("loop_")&&"outlet"===e.kind);return F`
    <g class="device device-manifold">
      <rect x="2" y="18" width="${e.width-4}" height="94" rx="6"
        fill="none" stroke="${r}" stroke-width="${s}" stroke-dasharray="4 3" />
      <rect x="4" y="22" width="${a}" height="16" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${rt}" stroke-width="2" />
      <rect x="4" y="92" width="${a}" height="16" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${st}" stroke-width="2" />
      ${l.map((t,i)=>{const o=t.position.x,r=n[i]?.active??!1;return F`
          <line x1="${o}" y1="0" x2="${o}" y2="22" stroke="${rt}" stroke-width="2" />
          <rect class="actuator ${r?"active":""}" x="${o-7}" y="6" width="14" height="11" rx="2"
            fill="${r?"#4caf50":"var(--card-background-color, #1c1c1c)"}"
            stroke="${r?"#4caf50":"var(--divider-color, #888)"}" stroke-width="1.5" />
          <line x1="${o}" y1="108" x2="${o}" y2="${e.height}" stroke="${st}" stroke-width="2" />
          <text x="${o}" y="69" text-anchor="middle" class="device-label">${i+1}</text>
        `})}
      ${_t(e,t)}
    </g>
  `}(t,i,o,n,s);case"buffer_tank":return function(e,t,i,o,n,r){const s=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",a=i?2.5:1.5,l=e.height-10,d=n.length,c=n.map((e,t)=>1===d?(16+l)/2:34+t*(l-16-36)/(d-1));return F`
    <g class="device device-buffer-tank">
      ${e.ports.map(e=>F`
        <line x1="${e.position.x}" y1="${e.position.y}" x2="${0===e.position.x?14:86}" y2="${e.position.y}"
          stroke="var(--divider-color, #888)" stroke-width="2" />
      `)}
      <rect x="14" y="10" width="72" height="${e.height-14}" rx="10"
        fill="var(--card-background-color, #1c1c1c)" stroke="${s}" stroke-width="${a}" />
      ${n.map((e,t)=>{const i=0===t?16:(c[t-1]+c[t])/2,o=t===d-1?l:(c[t]+c[t+1])/2,n=pt(e.numeric);return F`
          <rect x="17" y="${i}" width="66" height="${o-i}" fill="${n}" opacity="0.3" />
          <circle cx="18" cy="${c[t]}" r="3" fill="${n}" />
          <text x="52" y="${c[t]+4}" text-anchor="middle" class="device-value">
            ${e.value??"—"}
          </text>
        `})}
      ${r?yt(28,l-8,44,r):F``}
      ${_t(e,t)}
    </g>
  `}(t,i,o,n,s,r.heater);case"mixing_valve":return function(e,t,i,o){const n=i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",r=i?2.5:1.5,s=o.position,a=void 0===s?"var(--divider-color, #888)":`hsl(${Math.round(210*(1-s/100))}, 75%, 55%)`;return F`
    <g class="device device-mixing-valve">
      <line x1="0" y1="70" x2="22" y2="70" stroke="${rt}" stroke-width="3" />
      <line x1="50" y1="96" x2="50" y2="${e.height}" stroke="${st}" stroke-width="3" />
      <line x1="78" y1="70" x2="${e.width}" y2="70" stroke="${a}" stroke-width="3" />
      <path d="M 22 56 L 50 70 L 22 84 Z M 78 56 L 50 70 L 78 84 Z M 36 98 L 50 70 L 64 98 Z"
        fill="var(--card-background-color, #1c1c1c)" stroke="${n}" stroke-width="${r}"
        stroke-linejoin="round" />
      <line x1="50" y1="36" x2="50" y2="70" stroke="${n}" stroke-width="2" />
      <rect x="28" y="10" width="44" height="26" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${n}" stroke-width="${r}" />
      ${void 0===s?F``:F`<rect x="30" y="12" width="${40*s/100}" height="22" rx="3" fill="${a}" opacity="0.35" />`}
      <text x="50" y="27" text-anchor="middle" class="device-value">
        ${void 0===s?"—":`${Math.round(s)} %`}
      </text>
      ${_t(e,t)}
    </g>
  `}(t,i,o,n);case"electric_heater":return function(e,t,i,o){const n=o.active?lt:i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",r=i?2.5:1.5;return F`
    <g class="device device-electric-heater">
      <rect x="10" y="12" width="${e.width-20}" height="${e.height-24}" rx="8"
        fill="var(--card-background-color, #1c1c1c)" stroke="${n}" stroke-width="${r}" />
      ${yt(24,e.height/2+4,e.width-48,o)}
      ${_t(e,t)}
    </g>
  `}(t,i,o,n);case"pipe_sensor":return xt(t,i,o,n);default:return gt(e,t,i,o,n)}}let wt=class extends de{constructor(){super(...arguments),this.schema={nodes:[],edges:[],overlays:[]},this.editable=!1,this._states=new Ce(this,Ae),this._formatters=new Ce(this,Se),this._i18n=new Ce(this,Ee)}updated(e){e.has("editable")&&this.toggleAttribute("editable",this.editable)}render(){const e=this._translator(),{nodes:t,edges:i,overlays:o}=this.schema,n=this._dragBounds??this._computeBounds(t);return B`
      <svg
        viewBox="${n.x} ${n.y} ${n.width} ${n.height}"
        @pointerdown="${this._onCanvasPointerDown}"
        @pointermove="${this._onCanvasPointerMove}"
        @pointerup="${this._onCanvasPointerUp}"
        @pointerleave="${this._onCanvasPointerUp}"
      >
        ${this.editable?F`
            <defs>
              <pattern id="grid" width="${20}" height="${20}" patternUnits="userSpaceOnUse">
                <circle class="grid-dot" cx="0" cy="0" r="1" />
              </pattern>
            </defs>
            <rect x="${n.x}" y="${n.y}" width="${n.width}" height="${n.height}" fill="url(#grid)" />
          `:q}
        ${i.map(e=>this._renderEdge(e))}
        ${t.map(t=>this._renderNode(t,e))}
        ${o.map(e=>this._renderOverlay(e))}
      </svg>
    `}_translator(){return we(this._i18n.value?.language)}_computeBounds(e){if(!e.length)return{x:0,y:0,width:800,height:400};let t=1/0,i=1/0,o=-1/0,n=-1/0;for(const r of e){const e=Be(r);if(!e)continue;const s=Je(r,e);t=Math.min(t,s.x),i=Math.min(i,s.y-20),o=Math.max(o,s.x+s.width),n=Math.max(n,s.y+s.height+10)}return{x:t-40,y:i-40,width:o-t+80,height:n-i+80}}_renderEdge(e){const t=this.schema.nodes.find(t=>t.id===e.from.nodeId),i=this.schema.nodes.find(t=>t.id===e.to.nodeId);if(!t||!i)return B``;const o=We(t,e.from.portId),n=We(i,e.to.portId);if(!o||!n)return B``;const r=function(e,t){const i=Math.hypot(t.x-e.x,t.y-e.y),o=Math.max(30,i/2),n=e.x+e.direction.x*o,r=e.y+e.direction.y*o,s=t.x+t.direction.x*o,a=t.y+t.direction.y*o;return`M ${e.x} ${e.y} C ${n} ${r}, ${s} ${a}, ${t.x} ${t.y}`}(o,n),s=this.selectedEdgeId===e.id;return F`
      <path class="pipe ${s?"selected":""}" d="${r}" />
      ${this.editable?F`<path class="pipe-hit" data-edge-id="${e.id}" d="${r}" />`:q}
    `}_renderNode(e,t){const i=Be(e);if(!i)return B``;const o=this.selectedNodeId===e.id,n=this._states.value,r=this._formatters.value,s=ot(n,e.state,r),a=(e.channels??[]).map(e=>({...ot(n,e,r),label:e.name})),l=e.heater?.entity_id?ot(n,e.heater,r):void 0,d=kt(e.type,i,t,o,s,{channels:a,heater:l});if(!d)return B``;const c=Fe(e.rotation),h=Je(e,i).y-e.position.y-4;return F`
      <g
        class="node ${this._dragNodeId===e.id?"dragging":""}"
        data-node-id="${e.id}"
        transform="translate(${e.position.x} ${e.position.y})"
      >
        <g transform="rotate(${c} ${i.width/2} ${i.height/2})">
          ${d}
        </g>
        <text x="${i.width/2}" y="${h}" text-anchor="middle" class="device-label">
          ${e.name||t.t(i.labelKey)}
        </text>
      </g>
    `}_renderOverlay(e){const t=this._states.value,i=this._formatters.value,o=Xe(t,i,e),n=function(e,t){let i,o,n=!0;if(!e||!t.rules?.length)return{color:i,className:o,visible:n};for(const r of t.rules)tt(e,r,t.entity_id)&&(r.effect.color&&(i=et(r.effect.color)),r.effect.class&&(o=r.effect.class),void 0!==r.effect.visible&&(n=r.effect.visible));return{color:i,className:o,visible:n}}(t,e);if(!n.visible)return B``;const r=function(e,t,i){const o=e?.[i.entity_id];return o&&t?t.formatEntityName(o,i.name):"string"==typeof i.name?i.name:i.entity_id}(t,i,e),s=`${r}: ${o}`,a=Math.max(80,7*s.length+16);return F`
      <g class="overlay-group ${n.className??""}" transform="translate(${e.position.x} ${e.position.y})">
        <rect class="overlay-bg" x="0" y="0" width="${a}" height="22" rx="4" />
        <text class="overlay-text" x="8" y="15" fill="${n.color??"var(--primary-text-color, #e0e0e0)"}">
          ${s}
        </text>
      </g>
    `}_onCanvasPointerDown(e){if(!this.editable)return;const t=e.target,i=t?.getAttribute?.("data-edge-id");if(i)return void this.dispatchEvent(new CustomEvent("edge-select",{detail:{edgeId:i},bubbles:!0,composed:!0}));const o=t?.closest?.("[data-node-id]");if(!o)return void this._dispatchSelect(void 0);const n=o.getAttribute("data-node-id");if(!n)return;const r=this.schema.nodes.find(e=>e.id===n);if(!r)return;const s=t?.closest?.("[data-port-id]");if(s){const t=s.getAttribute("data-port-id");if(t)return this._dispatchPortClick(n,t),void e.stopPropagation()}this._dragNodeId=n;const a=this._toLocal(e);this._dragOffset=a?{x:a.x-r.position.x,y:a.y-r.position.y}:{x:0,y:0},this._dragBounds=this._computeBounds(this.schema.nodes),o.setPointerCapture(e.pointerId),this._dispatchSelect(n),e.preventDefault()}_toLocal(e){const t=this.renderRoot.querySelector("svg"),i=t?.getScreenCTM();if(!t||!i)return;const o=t.createSVGPoint();return o.x=e.clientX,o.y=e.clientY,o.matrixTransform(i.inverse())}_onCanvasPointerMove(e){if(!this.editable||!this._dragNodeId)return;const t=this.schema.nodes.find(e=>e.id===this._dragNodeId),i=this._toLocal(e);if(!t||!i)return;const o=this._dragOffset??{x:0,y:0},n={x:Qe(i.x-o.x,10),y:Qe(i.y-o.y,10)};n.x===t.position.x&&n.y===t.position.y||this.dispatchEvent(new CustomEvent("node-move",{detail:{nodeId:t.id,position:n},bubbles:!0,composed:!0}))}_onCanvasPointerUp(e){if(this._dragNodeId){const t=this.renderRoot.querySelector(`[data-node-id="${this._dragNodeId}"]`);t?.releasePointerCapture(e.pointerId),this._dragNodeId=void 0,this._dragOffset=void 0,this._dragBounds=void 0,this.requestUpdate()}}_dispatchSelect(e){this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:e},bubbles:!0,composed:!0}))}_dispatchPortClick(e,t){this.dispatchEvent(new CustomEvent("port-click",{detail:{nodeId:e,portId:t},bubbles:!0,composed:!0}))}};wt.styles=s`
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
      cursor: grab;
    }
    :host([editable]) .node.dragging {
      cursor: grabbing;
    }
    .overlay-group {
      pointer-events: none;
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
  `,e([ve({attribute:!1})],wt.prototype,"schema",void 0),e([ve({attribute:!1})],wt.prototype,"config",void 0),e([ve({type:Boolean})],wt.prototype,"editable",void 0),e([ve({attribute:!1})],wt.prototype,"selectedNodeId",void 0),e([ve({attribute:!1})],wt.prototype,"selectedEdgeId",void 0),e([ve({attribute:!1})],wt.prototype,"selectedPort",void 0),wt=e([he("heating-schema-canvas")],wt);const At={entity_id:"editor.node_state_entity",active_state:"editor.node_state_active",mode_attribute:"editor.node_state_mode_attribute",branch_a_value:"editor.node_state_branch_a",branch_b_value:"editor.node_state_branch_b"},St={active_state:"on",mode_attribute:"position",branch_a_value:"a",branch_b_value:"b"},Et={name:"value_attribute",selector:{attribute:{}},context:{filter_entity:"entity_id"}},Ct={...At,value_attribute:"editor.node_value_attribute"},Pt={value_attribute:"editor.node_value_attribute_helper"},Mt={...At,entity_id:"editor.node_state_position_entity",mode_attribute:"editor.node_state_position_attribute"},Nt={mode_attribute:"editor.node_state_position_helper"},It={...At,name:"editor.channel_name"},Lt=[{name:"name",selector:{text:{}}},{name:"entity_id",selector:{entity:{}}},{name:"active_state",selector:{state:{}},context:{filter_entity:"entity_id"}}],Ot=[{name:"name",selector:{text:{}}},{name:"entity_id",selector:{entity:{}}}],zt=[{name:"name",selector:{text:{}}}],Kt=[{name:"entity_id",selector:{entity:{}}},{name:"active_state",selector:{state:{}},context:{filter_entity:"entity_id"}}];function Ht(e,t){const i=(e.channels??[]).map(e=>({...e})),o=i.length||t.default;for(;i.length<o;)i.push({});return i}const Ut={entity_id:"overlay.entity",name:"overlay.name",template:"overlay.template"},Tt=[{name:"entity_id",selector:{entity:{}}},{name:"name",selector:{entity_name:{}},context:{entity:"entity_id"}},{name:"template",selector:{text:{}}},{type:"grid",name:"position",schema:[{name:"x",selector:{number:{mode:"box"}}},{name:"y",selector:{number:{mode:"box"}}}]}];function Dt(e){return Object.fromEntries(Object.entries(e).filter(([,e])=>null!=e&&""!==e))}const Rt={condition:"overlay.rule.condition",entity:"overlay.rule.entity",state:"overlay.rule.state",above:"overlay.rule.above",below:"overlay.rule.below",color:"overlay.rule.color",hide:"overlay.rule.hide"},jt={entity:"overlay.rule.entity_helper"};let Vt=class extends de{constructor(){super(...arguments),this._tab="schema",this._selectedDeviceType=Me.type,this._formReady=void 0!==customElements.get("ha-form")}set hass(e){this._hass=e,this.requestUpdate()}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this._formReady||this._loadHaForm()}setConfig(e){this._config=$e(e),this.requestUpdate()}render(){if(!this._config)return B``;const e=this._translator();return B`
      <div class="editor">
        <div class="tabs">
          <button
            type="button"
            class="${"schema"===this._tab?"active":""}"
            @click="${()=>{this._tab="schema"}}"
          >${e.t("editor.schema_tab")}</button>
          <button
            type="button"
            class="${"overlays"===this._tab?"active":""}"
            @click="${()=>{this._tab="overlays"}}"
          >${e.t("editor.overlay_tab")}</button>
        </div>

        ${"schema"===this._tab?this._renderSchemaTab(e):q}
        ${"overlays"===this._tab?this._renderOverlaysTab(e):q}
      </div>
    `}_renderSchemaTab(e){const t=this._config.schema,i=t.nodes.find(e=>e.id===this._selectedNodeId);return B`
      <div class="toolbar">
        <label>${e.t("editor.device_type")}</label>
        <select
          .value="${this._selectedDeviceType}"
          @change="${e=>{this._selectedDeviceType=e.target.value}}"
        >
          ${Re.map(t=>B`
            <option value="${t}">
              ${e.t(`devices.${t}.name`)}
            </option>
          `)}
        </select>
        <button
          type="button"
          class="primary"
          @click="${e=>this._onAddDeviceClick(e)}"
        >
          ${e.t("editor.add_selected_device")}
        </button>
        <button
          type="button"
          class="primary"
          @click="${e=>this._onAddHeatPumpClick(e)}"
        >
          ${e.t("editor.add_heat_pump")}
        </button>
        ${this._selectedNodeId?B`
            <button type="button" @click="${e=>this._onRotateSelectedClick(e)}">
              ↻ ${e.t("editor.rotate_selected")}
            </button>
          `:q}
        ${this._selectedNodeId||this._selectedEdgeId?B`
            <button type="button" class="danger" @click="${e=>this._onDeleteSelectedClick(e)}">
              ${e.t("editor.delete_selected")}
            </button>
          `:q}
      </div>

      ${this._pendingPort?B`<p class="connection-hint">
            ${e.t("editor.connection_pending",this._portLabel(e,this._pendingPort))}
          </p>`:q}

      ${t.nodes.length?q:B`<p class="hint">${e.t("editor.empty_hint")}</p>`}

      <heating-schema-canvas
        .config="${this._config}"
        .schema="${t}"
        .editable="${!0}"
        .selectedNodeId="${this._selectedNodeId}"
        .selectedEdgeId="${this._selectedEdgeId}"
        @node-select="${this._onNodeSelect}"
        @edge-select="${this._onEdgeSelect}"
        @node-move="${this._onNodeMove}"
        @port-click="${this._onPortClick}"
      ></heating-schema-canvas>

      ${i?B`
          <div class="overlay-item">
            <header>
              <span>${e.t("editor.node_state_title")}</span>
              <span>${e.t(`devices.${i.type}.name`)}</span>
            </header>
            ${this._renderForm(e,zt,{name:i.name},{name:"editor.node_name"},e=>this._setNodeName(i.id,e.name),{name:"editor.node_name_helper"})}
            ${this._renderNodeStateForm(e,i)}
            ${this._renderChannels(e,i)}
            ${Ve(i.type)?.heater?B`
                <div class="rules">
                  <header><span>${e.t("editor.heater_title")}</span></header>
                  ${this._renderForm(e,Kt,{...i.heater??{}},At,e=>this._setNodeHeater(i.id,e))}
                </div>
              `:q}
          </div>
        `:q}
    `}_renderNodeStateForm(e,t){const i=function(e){const t={name:"entity_id",selector:{entity:{}}},i={name:"active_state",selector:{state:{}},context:{filter_entity:"entity_id"}},o=Ve(e)?.valueDisplay;if("only"===o)return{schema:[t,Et],labels:{...Ct,entity_id:"editor.node_value_entity"},helpers:Pt};if("with_state"===o)return{schema:[t,i,Et],labels:Ct,helpers:Pt};if("mixing_valve"===e)return{schema:[t,{name:"mode_attribute",selector:{attribute:{}},context:{filter_entity:"entity_id"}}],labels:Mt,helpers:Nt};const n=[t,i];if("valve_3way"===e){const e={filter_entity:"entity_id",filter_attribute:"mode_attribute"};n.push({name:"mode_attribute",selector:{attribute:{}},context:{filter_entity:"entity_id"}},{name:"branch_a_value",selector:{state:{}},context:e},{name:"branch_b_value",selector:{state:{}},context:e})}return{schema:n,labels:At,helpers:{}}}(t.type);return this._renderForm(e,i.schema,{...t.state??{}},i.labels,e=>this._setNodeState(t.id,e),i.helpers)}_renderChannels(e,t){const i=Ve(t.type)?.channels;if(!i)return q;const o=Ht(t,i);return B`
      <div class="rules">
        <header>
          <span>${e.t(i.titleKey)} (${o.length})</span>
          <span>
            <button
              type="button"
              ?disabled="${o.length<=i.min}"
              @click="${()=>this._setChannelCount(t.id,o.length-1)}"
            >−</button>
            <button
              type="button"
              ?disabled="${o.length>=i.max}"
              @click="${()=>this._setChannelCount(t.id,o.length+1)}"
            >+</button>
          </span>
        </header>
        ${o.map((o,n)=>B`
          <div class="rule">
            <strong>${o.name||e.t(i.itemKey,String(n+1))}</strong>
            ${this._renderForm(e,"sensor"===i.kind?Ot:Lt,{...o},It,e=>this._setChannel(t.id,n,e))}
          </div>
        `)}
      </div>
    `}_renderOverlaysTab(e){const t=this._config.schema?.overlays??[];return B`
      <div class="toolbar">
        <button type="button" class="primary" @click="${this._addOverlay}">
          ${e.t("editor.add_overlay")}
        </button>
      </div>

      ${t.length?q:B`<p class="hint">${e.t("editor.overlays_empty")}</p>`}

      <heating-schema-canvas
        .config="${this._config}"
        .schema="${this._config.schema}"
        .editable="${!1}"
      ></heating-schema-canvas>

      ${t.map((t,i)=>B`
        <div class="overlay-item">
          <header>
            <span>${t.entity_id||`Overlay ${i+1}`}</span>
            <button type="button" class="danger" @click="${()=>this._removeOverlay(t.id)}">×</button>
          </header>
          ${this._renderForm(e,Tt,{entity_id:t.entity_id,name:t.name,template:t.template,position:t.position},Ut,e=>this._onOverlayFormChange(t.id,e))}
          <div class="rules">
            <header>
              <span>${e.t("overlay.rules")}</span>
              <button type="button" @click="${()=>this._addRule(t)}">
                ${e.t("overlay.add_rule")}
              </button>
            </header>
            ${(t.rules??[]).map((i,o)=>B`
              <div class="rule">
                <button
                  type="button"
                  class="danger remove-rule"
                  @click="${()=>this._updateRules(t.id,e=>e.filter((e,t)=>t!==o))}"
                >×</button>
                ${this._renderForm(e,function(e){const t={field:"condition",value:"numeric"};return[{name:"condition",selector:{select:{mode:"dropdown",options:[{value:"state",label:e.t("overlay.rule.condition_state")},{value:"numeric",label:e.t("overlay.rule.condition_numeric")}]}}},{name:"entity",selector:{entity:{}}},{name:"state",selector:{state:{}},context:{filter_entity:"entity"},visible:{field:"condition",value:"state"}},{name:"above",selector:{number:{mode:"box",step:"any"}},visible:t},{name:"below",selector:{number:{mode:"box",step:"any"}},visible:t},{name:"color",selector:{ui_color:{}}},{name:"hide",selector:{boolean:{}}}]}(e),function(e){return{condition:e.condition,entity:e.entity,state:e.state,above:e.above,below:e.below,color:e.effect.color,hide:!1===e.effect.visible}}(i),Rt,e=>this._updateRules(t.id,t=>t.map((t,i)=>i===o?function(e,t){const i=Dt(e),o=i.condition??"state",n=e=>void 0===e?void 0:Number(e);return{condition:o,entity:i.entity,state:"state"===o?i.state:void 0,above:"numeric"===o?n(i.above):void 0,below:"numeric"===o?n(i.below):void 0,effect:{...t.effect,color:i.color,visible:!i.hide&&void 0}}}(e,t):t)),jt)}
              </div>
            `)}
          </div>
        </div>
      `)}
    `}_renderForm(e,t,i,o,n,r={}){const s=t=>o[t.name]?e.t(o[t.name]):t.name.toUpperCase(),a=t=>{if(r[t.name])return e.t(r[t.name]);const i=St[t.name];return void 0!==i?e.t("editor.default_value",i):void 0};return this._formReady&&this._hass?B`
        <ha-form
          .hass="${this._hass}"
          .data="${i}"
          .schema="${t}"
          .computeLabel="${s}"
          .computeHelper="${a}"
          @value-changed="${e=>{e.stopPropagation(),n(e.detail.value)}}"
        ></ha-form>
      `:B`${t.map(e=>"schema"in e?e.schema.map(t=>this._renderFallbackField(t,e.name,i,s,n)):this._renderFallbackField(e,void 0,i,s,n))}`}_renderFallbackField(e,t,i,o,n){if("entity_name"in e.selector)return q;if(e.visible&&i[e.visible.field]!==e.visible.value)return q;const r=t?i[t]??{}:i,s=o=>{const s={...r,[e.name]:o};n(t?{...i,[t]:s}:s)};if("boolean"in e.selector)return B`
        <div class="field">
          <label>
            <input
              type="checkbox"
              .checked="${Boolean(r[e.name])}"
              @change="${e=>s(e.target.checked)}"
            />
            ${o(e)}
          </label>
        </div>
      `;const a=e.selector.select;if(a)return B`
        <div class="field">
          <label>${o(e)}</label>
          <select
            .value="${String(r[e.name]??"")}"
            @change="${e=>s(e.target.value)}"
          >
            ${a.options.map(e=>B`<option value="${e.value}">${e.label}</option>`)}
          </select>
        </div>
      `;const l="number"in e.selector;return B`
      <div class="field">
        <label>${o(e)}</label>
        <input
          type="${l?"number":"text"}"
          .value="${String(r[e.name]??"")}"
          @change="${e=>{const t=e.target.value;s(l&&""!==t?Number(t):t)}}"
        />
      </div>
    `}_emitConfig(e,t){const i=JSON.parse(JSON.stringify($e({...this._config,...t,schema:e})));this._config=i,this.requestUpdate(),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}_onAddDeviceClick(e){e.preventDefault(),e.stopPropagation(),this._addDevice(this._selectedDeviceType)}_onAddHeatPumpClick(e){e.preventDefault(),e.stopPropagation(),this._selectedDeviceType=Me.type,this._addDevice(Me.type)}_onDeleteSelectedClick(e){e.preventDefault(),e.stopPropagation(),this._deleteSelected()}_onRotateSelectedClick(e){e.preventDefault(),e.stopPropagation();const t=this._selectedNodeId;if(!t)return;const i=this._cloneSchema();i.nodes=i.nodes.map(e=>{if(e.id!==t)return e;const i=Fe((e.rotation??0)+90);return{...e,rotation:i||void 0}}),this._emitConfig(i)}_addDevice(e){const t=Ve(e);if(!t)return;const i=this._cloneSchema(),o=30*i.nodes.length,n={id:fe(e),type:e,position:{x:80+o,y:80+o}};t.channels?.default&&(n.channels=Array.from({length:t.channels.default},()=>({}))),i.nodes.push(n),this._selectedNodeId=n.id,this._emitConfig(i)}_setNodeName(e,t){const i=this._cloneSchema();i.nodes=i.nodes.map(i=>i.id===e?{...i,name:t?.trim()||void 0}:i),this._emitConfig(i)}_setNodeHeater(e,t){const i=Dt(t),o=this._cloneSchema();o.nodes=o.nodes.map(t=>t.id===e?{...t,heater:Object.keys(i).length?i:void 0}:t),this._emitConfig(o)}_setChannelCount(e,t){const i=this._cloneSchema(),o=i.nodes.find(t=>t.id===e),n=o&&Ve(o.type)?.channels;if(!o||!n||t<n.min||t>n.max)return;const r=Ht(o,n).slice(0,t);for(;r.length<t;)r.push({});o.channels=r;const s=new Set(Be(o)?.ports.map(e=>e.id));i.edges=i.edges.filter(t=>!(t.from.nodeId===e&&!s.has(t.from.portId)||t.to.nodeId===e&&!s.has(t.to.portId))),this._emitConfig(i)}_setChannel(e,t,i){const o=this._cloneSchema(),n=o.nodes.find(t=>t.id===e),r=n&&Ve(n.type)?.channels;if(!n||!r)return;const s=Ht(n,r);s[t]=Dt(i),n.channels=s,this._emitConfig(o)}_deleteSelected(){const e=this._cloneSchema();if(this._selectedEdgeId){const t=this._selectedEdgeId;return e.edges=e.edges.filter(e=>e.id!==t),this._selectedEdgeId=void 0,void this._emitConfig(e)}if(!this._selectedNodeId)return;const t=this._selectedNodeId;e.nodes=e.nodes.filter(e=>e.id!==t),e.edges=e.edges.filter(e=>e.from.nodeId!==t&&e.to.nodeId!==t),this._selectedNodeId=void 0,this._pendingPort=void 0,this._emitConfig(e)}_addOverlay(){const e=this._cloneSchema(),t={id:fe("ov"),position:{x:40,y:40+30*e.overlays.length},entity_id:"",template:"{{ state }}"};e.overlays.push(t),this._emitConfig(e)}_removeOverlay(e){const t=this._cloneSchema();t.overlays=t.overlays.filter(t=>t.id!==e),this._emitConfig(t)}_updateOverlay(e,t){const i=this._cloneSchema();i.overlays=i.overlays.map(i=>i.id===e?{...i,...t}:i),this._emitConfig(i)}_onNodeSelect(e){this._selectedNodeId=e.detail.nodeId,this._selectedEdgeId=void 0}_onEdgeSelect(e){this._selectedEdgeId=e.detail.edgeId,this._selectedNodeId=void 0,this._pendingPort=void 0}_onNodeMove(e){const t=this._cloneSchema();t.nodes=t.nodes.map(t=>t.id===e.detail.nodeId?{...t,position:e.detail.position}:t),this._emitConfig(t)}_setNodeState(e,t){const i=Dt(t),o=this._cloneSchema();o.nodes=o.nodes.map(t=>t.id===e?{...t,state:Object.keys(i).length?i:void 0}:t),this._emitConfig(o)}_addRule(e){this._updateRules(e.id,t=>[...t,{condition:"state",entity:e.entity_id||void 0,effect:{}}])}_updateRules(e,t){const i=this._config.schema?.overlays.find(t=>t.id===e);if(!i)return;const o=t([...i.rules??[]]);this._updateOverlay(e,{rules:o.length?o:void 0})}_onOverlayFormChange(e,t){const i=Dt(t),o=i.position??{};this._updateOverlay(e,{entity_id:i.entity_id??"",name:i.name,template:i.template,position:{x:Number(o.x??0),y:Number(o.y??0)}})}_translator(){return we(this._hass?.language)}async _loadHaForm(){try{const e=await(window.loadCardHelpers?.()),t=e?.createCardElement({type:"button"}),i=t?.constructor;await(i?.getConfigElement?.()),await customElements.whenDefined("ha-form"),this._formReady=!0}catch{}}_onPortClick(e){const{nodeId:t,portId:i}=e.detail,o={nodeId:t,portId:i};if(!this._pendingPort)return void(this._pendingPort=o);if(Ge(this._pendingPort,o))return void(this._pendingPort=void 0);const n=this._cloneSchema(),r=this._createEdge(this._pendingPort,o,n.edges);r&&(n.edges.push(r),this._emitConfig(n)),this._pendingPort=void 0}_createEdge(e,t,i){const o=this._orderPorts(e,t);if(!o)return;const n=i.some(e=>Ge(e.from,o.from)&&Ge(e.to,o.to));return n?void 0:{id:fe("edge"),from:o.from,to:o.to}}_orderPorts(e,t){const i=this._config.schema?.nodes.find(t=>t.id===e.nodeId),o=this._config.schema?.nodes.find(e=>e.id===t.nodeId);if(!i||!o)return;const n=Be(i),r=Be(o);if(!n||!r)return;const s=n.ports.find(t=>t.id===e.portId),a=r.ports.find(e=>e.id===t.portId);return s&&a?"outlet"===s.kind&&"inlet"===a.kind?{from:e,to:t}:"outlet"===a.kind&&"inlet"===s.kind?{from:t,to:e}:void 0:void 0}_portLabel(e,t){const i=this._config.schema?.nodes.find(e=>e.id===t.nodeId);if(!i)return t.portId;const o=Be(i),n=o?.ports.find(e=>e.id===t.portId);return n?e.t(n.labelKey,...n.labelArgs??[]):t.portId}_cloneSchema(){const e=this._config.schema??{nodes:[],edges:[],overlays:[]};return{nodes:(e.nodes??[]).map(e=>({...e,position:{...e.position},state:e.state?{...e.state}:void 0,channels:e.channels?.map(e=>({...e})),heater:e.heater?{...e.heater}:void 0})),edges:(e.edges??[]).map(e=>({...e,from:{...e.from},to:{...e.to}})),overlays:(e.overlays??[]).map(e=>({...e,position:{...e.position},rules:e.rules?.map(e=>({...e,effect:{...e.effect}}))}))}}};Vt.styles=s`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 0;
    }
    .tabs {
      display: flex;
      gap: 4px;
      border-bottom: 1px solid var(--divider-color, #444);
      padding-bottom: 8px;
    }
    .tabs button {
      flex: 1;
      padding: 8px;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: var(--primary-text-color, #e0e0e0);
      cursor: pointer;
    }
    .tabs button.active {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }
    .toolbar button,
    .toolbar select,
    .field input,
    .field select,
    .field textarea {
      font: inherit;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #555);
      background: var(--card-background-color, #1c1c1c);
      color: var(--primary-text-color, #e0e0e0);
    }
    .toolbar button {
      cursor: pointer;
    }
    .toolbar button.primary {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #fff;
    }
    .hint {
      opacity: 0.75;
      font-size: 0.9em;
      margin: 0;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 8px;
    }
    .field label {
      font-size: 0.85em;
      opacity: 0.85;
    }
    .overlay-item,
    .translation-item {
      border: 1px solid var(--divider-color, #444);
      border-radius: 8px;
      padding: 10px;
      margin-bottom: 8px;
    }
    .overlay-item header,
    .translation-item header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      font-size: 0.9em;
    }
    .overlay-item button.danger,
    .toolbar button.danger {
      background: transparent;
      border-color: #e57373;
      color: #e57373;
    }
    .connection-hint {
      font-size: 0.85em;
      color: var(--primary-color, #03a9f4);
      margin: 0;
    }
    .rules {
      margin-top: 8px;
      border-top: 1px solid var(--divider-color, #444);
      padding-top: 8px;
    }
    .rules header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9em;
    }
    .rule {
      position: relative;
      margin-top: 8px;
      padding: 8px 32px 8px 8px;
      border-radius: 8px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
    }
    .rule .remove-rule {
      position: absolute;
      top: 4px;
      right: 4px;
    }
    .rules button {
      font: inherit;
      padding: 4px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, #555);
      background: transparent;
      color: var(--primary-text-color, #e0e0e0);
      cursor: pointer;
    }
    .rules button.danger {
      border-color: #e57373;
      color: #e57373;
    }
  `,e([_e()],Vt.prototype,"_config",void 0),e([_e()],Vt.prototype,"_tab",void 0),e([_e()],Vt.prototype,"_selectedNodeId",void 0),e([_e()],Vt.prototype,"_selectedEdgeId",void 0),e([_e()],Vt.prototype,"_pendingPort",void 0),e([_e()],Vt.prototype,"_selectedDeviceType",void 0),e([_e()],Vt.prototype,"_formReady",void 0),Vt=e([he("heating-visualizer-editor")],Vt);let Bt=class extends de{constructor(){super(...arguments),this._i18n=new Ce(this,Ee)}setConfig(e){if(!e||"object"!=typeof e)throw new Error("Invalid card configuration");this._config=$e(e)}getCardSize(){return 6}getGridOptions(){return{columns:12,min_columns:6}}static getConfigElement(){return document.createElement("heating-visualizer-editor")}static getStubConfig(){return{schema:ye}}render(){if(!this._config)return B``;const e=this._config.schema,t=we(this._i18n.value?.language);return B`
      <ha-card>
        ${e.nodes.length||e.overlays.length?B`
            <heating-schema-canvas
              .config="${this._config}"
              .schema="${e}"
              .editable="${!1}"
            ></heating-schema-canvas>
          `:B`<div class="empty">${t.t("card.empty")}</div>`}
      </ha-card>
    `}};Bt.styles=s`
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
  `,e([_e()],Bt.prototype,"_config",void 0),Bt=e([he("heating-visualizer-card")],Bt),window.customCards=window.customCards??[],window.customCards.push({type:"heating-visualizer-card",name:"Heating Visualizer",description:"Design and visualize heating system schemas with live sensor overlays.",preview:!0,documentationURL:"https://github.com/vasicekmilan90-eng/heating_vizualizer"}),console.info("%c HEATING-VISUALIZER-CARD %c v0.3.1 ","color: white; background: #039be5; font-weight: bold;","color: #039be5; background: white; font-weight: bold;");export{Bt as HeatingVisualizerCard};
//# sourceMappingURL=heating-visualizer-card.js.map
