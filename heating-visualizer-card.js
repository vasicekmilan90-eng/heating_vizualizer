function e(e,t,o,i){var n,r=arguments.length,s=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(r<3?n(s):r>3?n(t,o,s):n(t,o))||s);return r>3&&s&&Object.defineProperty(t,o,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,o=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),n=new WeakMap;let r=class{constructor(e,t,o){if(this._$cssResult$=!0,o!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(o&&void 0===e){const o=void 0!==t&&1===t.length;o&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&n.set(t,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const o=1===e.length?e[0]:t.reduce((t,o,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[i+1],e[0]);return new r(o,e,i)},a=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const o of e.cssRules)t+=o.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:d,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,v=globalThis,y=v.trustedTypes,_=y?y.emptyScript:"",m=v.reactiveElementPolyfillSupport,$=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},b=(e,t)=>!d(e,t),g={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=g){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,t);void 0!==i&&l(this.prototype,e,i)}}static getPropertyDescriptor(e,t,o){const{get:i,set:n}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const r=i?.call(this);n?.call(this,t),this.requestUpdate(e,r,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??g}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const e=this.properties,t=[...p(e),...h(e)];for(const o of t)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,o]of t)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const o=this._$Eu(e,t);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const o=t.attribute;return!1===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const o of t.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(o)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const o of i){const i=document.createElement("style"),n=t.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=o.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,o){this._$AK(e,o)}_$ET(e,t){const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(void 0!==i&&!0===o.reflect){const n=(void 0!==o.converter?.toAttribute?o.converter:f).toAttribute(t,o.type);this._$Em=e,null==n?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){const o=this.constructor,i=o._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=o.getPropertyOptions(i),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=i;const r=n.fromAttribute(t,e.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(e,t,o,i=!1,n){if(void 0!==e){const r=this.constructor;if(!1===i&&(n=this[e]),o??=r.getPropertyOptions(e),!((o.hasChanged??b)(n,t)||o.useDefault&&o.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,o))))return;this.C(e,t,o)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:o,reflect:i,wrapped:n},r){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==n||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||o||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,o]of e){const{wrapped:e}=o,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,o,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,m?.({ReactiveElement:x}),(v.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,w=e=>e,A=k.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,I="?"+C,P=`<${I}>`,M=document,N=()=>M.createComment(""),z=e=>null===e||"object"!=typeof e&&"function"!=typeof e,L=Array.isArray,O="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,K=/>/g,j=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,R=/"/g,U=/^(?:script|style|textarea|title)$/i,V=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),B=V(1),Z=V(2),F=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),W=new WeakMap,J=M.createTreeWalker(M,129);function Y(e,t){if(!L(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const G=(e,t)=>{const o=e.length-1,i=[];let n,r=2===t?"<svg>":3===t?"<math>":"",s=T;for(let t=0;t<o;t++){const o=e[t];let a,d,l=-1,c=0;for(;c<o.length&&(s.lastIndex=c,d=s.exec(o),null!==d);)c=s.lastIndex,s===T?"!--"===d[1]?s=H:void 0!==d[1]?s=K:void 0!==d[2]?(U.test(d[2])&&(n=RegExp("</"+d[2],"g")),s=j):void 0!==d[3]&&(s=j):s===j?">"===d[0]?(s=n??T,l=-1):void 0===d[1]?l=-2:(l=s.lastIndex-d[2].length,a=d[1],s=void 0===d[3]?j:'"'===d[3]?R:D):s===R||s===D?s=j:s===H||s===K?s=T:(s=j,n=void 0);const p=s===j&&e[t+1].startsWith("/>")?" ":"";r+=s===T?o+P:l>=0?(i.push(a),o.slice(0,l)+E+o.slice(l)+C+p):o+C+(-2===l?t:p)}return[Y(e,r+(e[o]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class X{constructor({strings:e,_$litType$:t},o){let i;this.parts=[];let n=0,r=0;const s=e.length-1,a=this.parts,[d,l]=G(e,t);if(this.el=X.createElement(d,o),J.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=J.nextNode())&&a.length<s;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(E)){const t=l[r++],o=i.getAttribute(e).split(C),s=/([.?@])?(.*)/.exec(t);a.push({type:1,index:n,name:s[2],strings:o,ctor:"."===s[1]?ie:"?"===s[1]?ne:"@"===s[1]?re:oe}),i.removeAttribute(e)}else e.startsWith(C)&&(a.push({type:6,index:n}),i.removeAttribute(e));if(U.test(i.tagName)){const e=i.textContent.split(C),t=e.length-1;if(t>0){i.textContent=A?A.emptyScript:"";for(let o=0;o<t;o++)i.append(e[o],N()),J.nextNode(),a.push({type:2,index:++n});i.append(e[t],N())}}}else if(8===i.nodeType)if(i.data===I)a.push({type:2,index:n});else{let e=-1;for(;-1!==(e=i.data.indexOf(C,e+1));)a.push({type:7,index:n}),e+=C.length-1}n++}}static createElement(e,t){const o=M.createElement("template");return o.innerHTML=e,o}}function Q(e,t,o=e,i){if(t===F)return t;let n=void 0!==i?o._$Co?.[i]:o._$Cl;const r=z(t)?void 0:t._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(e),n._$AT(e,o,i)),void 0!==i?(o._$Co??=[])[i]=n:o._$Cl=n),void 0!==n&&(t=Q(e,n._$AS(e,t.values),n,i)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:o}=this._$AD,i=(e?.creationScope??M).importNode(t,!0);J.currentNode=i;let n=J.nextNode(),r=0,s=0,a=o[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new te(n,n.nextSibling,this,e):1===a.type?t=new a.ctor(n,a.name,a.strings,this,e):6===a.type&&(t=new se(n,this,e)),this._$AV.push(t),a=o[++s]}r!==a?.index&&(n=J.nextNode(),r++)}return J.currentNode=M,i}p(e){let t=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,t),t+=o.strings.length-2):o._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,o,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),z(e)?e===q||null==e||""===e?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==F&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>L(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==q&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:o}=e,i="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=X.createElement(Y(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new ee(i,this),o=e.u(this.options);e.p(t),this.T(o),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new X(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let o,i=0;for(const n of e)i===t.length?t.push(o=new te(this.O(N()),this.O(N()),this,this.options)):o=t[i],o._$AI(n),i++;i<t.length&&(this._$AR(o&&o._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=w(e).nextSibling;w(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class oe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,o,i,n){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=q}_$AI(e,t=this,o,i){const n=this.strings;let r=!1;if(void 0===n)e=Q(this,e,t,0),r=!z(e)||e!==this._$AH&&e!==F,r&&(this._$AH=e);else{const i=e;let s,a;for(e=n[0],s=0;s<n.length-1;s++)a=Q(this,i[o+s],t,s),a===F&&(a=this._$AH[s]),r||=!z(a)||a!==this._$AH[s],a===q?e=q:e!==q&&(e+=(a??"")+n[s+1]),this._$AH[s]=a}r&&!i&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends oe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}}class ne extends oe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==q)}}class re extends oe{constructor(e,t,o,i,n){super(e,t,o,i,n),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??q)===F)return;const o=this._$AH,i=e===q&&o!==q||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==q&&(o===q||i);i&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const ae=k.litHtmlPolyfillSupport;ae?.(X,te),(k.litHtmlVersions??=[]).push("3.3.3");const de=globalThis;class le extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,o)=>{const i=o?.renderBefore??t;let n=i._$litPart$;if(void 0===n){const e=o?.renderBefore??null;i._$litPart$=n=new te(t.insertBefore(N(),e),e,void 0,o??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}le._$litElement$=!0,le.finalized=!0,de.litElementHydrateSupport?.({LitElement:le});const ce=de.litElementPolyfillSupport;ce?.({LitElement:le}),(de.litElementVersions??=[]).push("4.2.2");const pe=e=>(t,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:b},ue=(e=he,t,o)=>{const{kind:i,metadata:n}=o;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),r.set(o.name,e),"accessor"===i){const{name:i}=o;return{set(o){const n=t.get.call(this);t.set.call(this,o),this.requestUpdate(i,n,e,!0,o)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=o;return function(o){const n=this[i];t.call(this,o),this.requestUpdate(i,n,e,!0,o)}}throw Error("Unsupported decorator location: "+i)};function ve(e){return(t,o)=>"object"==typeof o?ue(e,t,o):((e,t,o)=>{const i=t.hasOwnProperty(o);return t.constructor.createProperty(o,e),i?Object.getOwnPropertyDescriptor(t,o):void 0})(e,t,o)}function ye(e){return ve({...e,state:!0,attribute:!1})}function _e(e){return`${e.nodeId}.${e.portId}`}function me(e){const t=e.lastIndexOf(".");if(!(t<=0||t===e.length-1))return{nodeId:e.slice(0,t),portId:e.slice(t+1)}}function $e(e){return`${e.from}>${e.to}`}const fe={nodes:[],connections:[],overlays:[]};function be(e){return{nodes:e.nodes??[],connections:e.connections??[],overlays:e.overlays??[]}}function ge(e){return"undefined"!=typeof crypto&&"function"==typeof crypto.randomUUID?`${e}_${crypto.randomUUID().slice(0,8)}`:`${e}_${Math.random().toString(36).slice(2,10)}`}const xe=["top","upper","middle","lower","bottom"],ke=["top","middle","bottom"],we={type:"alarm",max:1},Ae={type:"mode",max:1},Se={type:"setpoint",max:1},Ee=e=>({type:"value",max:e}),Ce=(...e)=>({type:"temperature",max:e.length,slots:e});function Ie(e,t){return e.addons?.some(e=>e.type===t)??!1}const Pe={type:"valve_3way",labelKey:"devices.valve_3way.name",width:100,height:100,ports:[{id:"in",labelKey:"devices.valve_3way.ports.in",kind:"inlet",position:{x:0,y:50}},{id:"out_a",labelKey:"devices.valve_3way.ports.out_a",kind:"outlet",position:{x:100,y:25}},{id:"out_b",labelKey:"devices.valve_3way.ports.out_b",kind:"outlet",position:{x:100,y:75}}],addons:[Ee(1),we]},Me={type:"boiler",labelKey:"devices.boiler.name",width:100,height:140,ports:[{id:"coil_in",labelKey:"devices.boiler.ports.coil_in",kind:"inlet",position:{x:0,y:50}},{id:"coil_out",labelKey:"devices.boiler.ports.coil_out",kind:"outlet",position:{x:0,y:100}},{id:"hot_out",labelKey:"devices.boiler.ports.hot_out",kind:"outlet",position:{x:100,y:30}},{id:"cold_in",labelKey:"devices.boiler.ports.cold_in",kind:"inlet",position:{x:100,y:118}}],addons:[Ce(...ke),Ee(2),{type:"electric_heater",max:2},{type:"pump",max:1},Ae,Se,we,{type:"heat_exchanger",max:1}],resolve:e=>Ie(e,"heat_exchanger")?{...Me,height:180,ports:[...Me.ports.map(e=>"cold_in"===e.id?{...e,position:{x:100,y:158}}:e),{id:"coil2_in",labelKey:"devices.boiler.ports.coil2_in",kind:"inlet",position:{x:0,y:122}},{id:"coil2_out",labelKey:"devices.boiler.ports.coil2_out",kind:"outlet",position:{x:0,y:160}}]}:Me},Ne={type:"circulation_pump",labelKey:"devices.circulation_pump.name",width:90,height:90,ports:[{id:"in",labelKey:"devices.circulation_pump.ports.in",kind:"inlet",position:{x:0,y:45}},{id:"out",labelKey:"devices.circulation_pump.ports.out",kind:"outlet",position:{x:90,y:45}}],addons:[Ee(3),Ae,we]},ze={type:"floor_heating",labelKey:"devices.floor_heating.name",width:140,height:90,ports:[{id:"in",labelKey:"devices.floor_heating.ports.in",kind:"inlet",position:{x:0,y:45}},{id:"out",labelKey:"devices.floor_heating.ports.out",kind:"outlet",position:{x:140,y:45}}],addons:[Ce("room","floor"),{type:"actuator",max:1},Se,{type:"window",max:1}]};const Le={type:"manifold",labelKey:"devices.manifold.name",width:184,height:130,ports:[{id:"supply_in",labelKey:"devices.manifold.ports.supply_in",kind:"inlet",position:{x:0,y:30}},{id:"return_out",labelKey:"devices.manifold.ports.return_out",kind:"outlet",position:{x:0,y:100}}],addons:[{type:"loop",max:12},Ce("supply","return"),Ee(2),{type:"pump",max:1}],resolve:e=>function(e){const t=[];for(let o=0;o<e;o++){const e=50+36*o,i=String(o+1);t.push({id:`loop_${i}_out`,labelKey:"devices.manifold.ports.loop_out",labelArgs:[i],kind:"outlet",position:{x:e,y:0}},{id:`loop_${i}_in`,labelKey:"devices.manifold.ports.loop_in",labelArgs:[i],kind:"inlet",position:{x:e,y:130}})}return{...Le,width:50+36*e-10,ports:[...Le.ports,...t]}}(Math.max(1,e.addons?.filter(e=>"loop"===e.type).length??0))},Oe={type:"buffer_tank",labelKey:"devices.buffer_tank.name",width:100,height:186,ports:[{id:"source_in",labelKey:"devices.buffer_tank.ports.source_in",kind:"inlet",position:{x:0,y:40}},{id:"source_out",labelKey:"devices.buffer_tank.ports.source_out",kind:"outlet",position:{x:0,y:150}},{id:"supply_out",labelKey:"devices.buffer_tank.ports.supply_out",kind:"outlet",position:{x:100,y:40}},{id:"return_in",labelKey:"devices.buffer_tank.ports.return_in",kind:"inlet",position:{x:100,y:150}}],addons:[Ce(...xe),Ee(2),{type:"electric_heater",max:2},we,{type:"heat_exchanger",max:1}],resolve:e=>Ie(e,"heat_exchanger")?{...Oe,ports:[...Oe.ports,{id:"coil_in",labelKey:"devices.buffer_tank.ports.coil_in",kind:"inlet",position:{x:0,y:80}},{id:"coil_out",labelKey:"devices.buffer_tank.ports.coil_out",kind:"outlet",position:{x:0,y:118}}]}:Oe},Te={type:"mixing_valve",labelKey:"devices.mixing_valve.name",width:100,height:110,ports:[{id:"hot_in",labelKey:"devices.mixing_valve.ports.hot_in",kind:"inlet",position:{x:0,y:70}},{id:"return_in",labelKey:"devices.mixing_valve.ports.return_in",kind:"inlet",position:{x:50,y:110}},{id:"mixed_out",labelKey:"devices.mixing_valve.ports.mixed_out",kind:"outlet",position:{x:100,y:70}}],addons:[Ce("mixed","return"),Ee(1),Se,we]},He={type:"electric_heater",labelKey:"devices.electric_heater.name",width:120,height:60,ports:[{id:"in",labelKey:"devices.electric_heater.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out",labelKey:"devices.electric_heater.ports.out",kind:"outlet",position:{x:120,y:30}}],addons:[Ce("inlet","outlet"),Ee(2),Ae,we]},Ke={type:"heat_pump",labelKey:"devices.heat_pump.name",width:170,height:120,ports:[{id:"hot_out",labelKey:"devices.heat_pump.ports.hot_out",kind:"outlet",position:{x:170,y:40}},{id:"cold_in",labelKey:"devices.heat_pump.ports.cold_in",kind:"inlet",position:{x:170,y:90}}],addons:[Ce("supply","return","outdoor","evaporator"),Ee(6),{type:"electric_heater",max:3},{type:"pump",max:1},{type:"fan",max:1},Ae,Se,{type:"defrost",max:1},we]};const je={type:De="pipe_sensor",labelKey:`devices.${De}.name`,width:80,height:44,ports:[{id:"in",labelKey:"devices.inline.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out",labelKey:"devices.inline.ports.out",kind:"outlet",position:{x:80,y:30}}],valueDisplay:"only"};var De;const Re={type:"outdoor_temperature",labelKey:"devices.outdoor_temperature.name",width:100,height:50,valueDisplay:"only",ports:[],addons:[Ee(1)]};const Ue={...function(e){return{type:e,labelKey:`devices.${e}.name`,width:100,height:130,valueDisplay:"with_state",ports:[{id:"supply_out",labelKey:"devices.heat_source.ports.supply_out",kind:"outlet",position:{x:100,y:35}},{id:"return_in",labelKey:"devices.heat_source.ports.return_in",kind:"inlet",position:{x:100,y:105}}]}}("heating_boiler"),addons:[Ce("supply","return"),Ee(4),{type:"pump",max:1},Ae,Se,we]},Ve={type:"solar_collector",labelKey:"devices.solar_collector.name",width:150,height:100,valueDisplay:"with_state",ports:[{id:"hot_out",labelKey:"devices.solar_collector.ports.hot_out",kind:"outlet",position:{x:150,y:22}},{id:"cold_in",labelKey:"devices.solar_collector.ports.cold_in",kind:"inlet",position:{x:150,y:84}}],addons:[Ce("collector"),Ee(2),{type:"pump",max:1},we]};function Be(e,t,o){const i=(e,t,o,i)=>({id:e,labelKey:`devices.four_port.ports.${e}`,kind:t,position:{x:o,y:i}});return{type:e,labelKey:`devices.${e}.name`,width:t,height:o,ports:[i("primary_in","inlet",0,30),i("primary_out","outlet",0,o-30),i("secondary_out","outlet",t,30),i("secondary_in","inlet",t,o-30)]}}const Ze=Ce("primary_supply","primary_return","secondary_supply","secondary_return"),Fe={...Be("hydraulic_separator",80,160),valueDisplay:"only",addons:[Ze,Ee(2)]},qe={...Be("plate_heat_exchanger",100,120),addons:[Ze,Ee(2)]},We={type:"expansion_vessel",labelKey:"devices.expansion_vessel.name",width:70,height:110,valueDisplay:"only",ports:[{id:"connection",labelKey:"devices.expansion_vessel.ports.connection",kind:"inlet",position:{x:35,y:110}}],addons:[Ee(1),we]},Je={type:"safety_valve",labelKey:"devices.safety_valve.name",width:70,height:90,ports:[{id:"in",labelKey:"devices.safety_valve.ports.in",kind:"inlet",position:{x:30,y:90}},{id:"discharge",labelKey:"devices.safety_valve.ports.discharge",kind:"outlet",position:{x:70,y:56}}],addons:[we]},Ye={type:"zone_valve",labelKey:"devices.zone_valve.name",width:80,height:70,ports:[{id:"in",labelKey:"devices.inline.ports.in",kind:"inlet",position:{x:0,y:50}},{id:"out",labelKey:"devices.inline.ports.out",kind:"outlet",position:{x:80,y:50}}],addons:[Ce("room"),we]};function Ge(e){return{type:e,labelKey:`devices.${e}.name`,width:130,height:80,valueDisplay:"with_state",ports:[{id:"in",labelKey:"devices.terminal.ports.in",kind:"inlet",position:{x:0,y:66}},{id:"out",labelKey:"devices.terminal.ports.out",kind:"outlet",position:{x:130,y:66}}]}}const Xe={...Ge("radiator"),addons:[Ce("room"),{type:"actuator",max:1},Se,we,{type:"window",max:1}]},Qe={...Ge("fancoil"),addons:[Ce("room","supply"),{type:"actuator",max:1},{type:"fan",max:1},Ae,Se,we]},et=[Ke,Ue,Ve,Me,Oe,Fe,qe,We,Je,Pe,Te,Ye,Ne,Le,ze,Xe,Qe,He,{type:"junction",labelKey:"devices.junction.name",width:60,height:60,ports:[{id:"in",labelKey:"devices.junction.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out_top",labelKey:"devices.junction.ports.out_top",kind:"outlet",position:{x:60,y:15}},{id:"out_bottom",labelKey:"devices.junction.ports.out_bottom",kind:"outlet",position:{x:60,y:45}}]},je,Re],tt=et.map(e=>e.type),ot=new Map(et.map(e=>[e.type,e]));function it(e){return ot.get(e)}function nt(e){const t=ot.get(e.type);return t?.resolve?t.resolve(e):t}const rt="custom:heating-visualizer-card",st={outdoor_unit:"heat_pump",gas_boiler:"heating_boiler",electric_boiler:"heating_boiler",solid_fuel_boiler:"heating_boiler",flow_meter:"pipe_sensor",pressure_gauge:"pipe_sensor",heat_meter:"pipe_sensor",dhw_circulation_pump:"circulation_pump"},at={1:["middle"],2:["top","bottom"],3:["top","middle","bottom"],4:["top","upper","lower","bottom"],5:[...xe]};function dt(e){const t=st[e.type]??e.type,o=[];return e.channels?.length&&o.push(...function(e,t){if("manifold"===e)return t.map(e=>({...e,type:"loop"}));const o=t.filter(e=>e.entity_id);if("buffer_tank"===e){const e=at[Math.min(o.length,5)]??[];return o.slice(0,5).map((t,o)=>({...t,type:"temperature",slot:e[o]}))}if("boiler"===e){const e=[ke[0],ke[2]];return o.slice(0,2).map((t,o)=>({...t,type:"temperature",slot:e[o]}))}return o.map(e=>({...e,type:"value"}))}(t,e.channels)),"manifold"!==t||e.channels?.length||o.push(...Array.from({length:4},()=>({type:"loop"}))),e.heater?.entity_id&&o.push({...e.heater,type:"electric_heater"}),{id:e.id,type:t,name:e.name,position:e.position??{x:0,y:0},rotation:e.rotation,...e.state,addons:o.length?o:void 0}}function lt(e){const t=e,o=("number"==typeof t.schema_version?t.schema_version:t.schema?1:2)<2?function(e){const{schema:t,language:o,translations:i,...n}=e,r=(t?.edges??[]).map(e=>({from:`${e.from.nodeId}.${e.from.portId}`,to:`${e.to.nodeId}.${e.to.portId}`})),s=(t?.overlays??[]).map(({labelKey:e,...t})=>t);return{...n,type:rt,schema_version:2,nodes:(t?.nodes??[]).map(dt),connections:r,overlays:s}}(t):{...t};return{...o,type:"string"==typeof t.type?t.type:rt,schema_version:2,nodes:(o.nodes??[]).map(e=>st[e.type]?{...e,type:st[e.type]}:e),connections:o.connections??[],overlays:o.overlays??[]}}const ct="en",pt={en:{devices:{heat_pump:{name:"Heat pump",ports:{cold_in:"Heating water return",hot_out:"Heating water out"}},valve_3way:{name:"3-way valve",ports:{in:"Inlet",out_a:"Outlet A",out_b:"Outlet B"}},boiler:{name:"DHW tank",ports:{cold_in:"Cold water inlet",hot_out:"Hot water outlet",coil_in:"Heat exchanger supply",coil_out:"Heat exchanger return",coil2_in:"Second heat exchanger supply",coil2_out:"Second heat exchanger return"}},junction:{name:"Junction",ports:{in:"Inlet",out_top:"Top outlet",out_bottom:"Bottom outlet"}},circulation_pump:{name:"Circulation pump",ports:{in:"Inlet",out:"Outlet"}},floor_heating:{name:"Floor heating",ports:{in:"Supply",out:"Return"}},manifold:{name:"Floor heating manifold",ports:{supply_in:"Supply",return_out:"Return",loop_out:"Loop {0} supply",loop_in:"Loop {0} return"}},buffer_tank:{name:"Buffer tank",ports:{source_in:"From heat source",source_out:"Back to heat source",supply_out:"To heating system",return_in:"Return from heating system",coil_in:"Heat exchanger supply",coil_out:"Heat exchanger return"}},mixing_valve:{name:"Mixing valve",ports:{hot_in:"Hot branch",return_in:"Return (bypass)",mixed_out:"Mixed water"}},electric_heater:{name:"Electric flow heater",ports:{in:"Inlet",out:"Outlet"}},inline:{ports:{in:"Inlet",out:"Outlet"}},pipe_sensor:{name:"Sensor / meter"},heat_source:{ports:{supply_out:"Supply",return_in:"Return"}},heating_boiler:{name:"Heating boiler"},solar_collector:{name:"Solar collector",ports:{hot_out:"Hot outlet",cold_in:"Cold inlet"}},four_port:{ports:{primary_in:"Primary supply",primary_out:"Primary return",secondary_out:"Secondary supply",secondary_in:"Secondary return"}},hydraulic_separator:{name:"Hydraulic separator"},plate_heat_exchanger:{name:"Plate heat exchanger"},expansion_vessel:{name:"Expansion vessel",ports:{connection:"Connection"}},safety_valve:{name:"Safety valve",ports:{in:"Inlet",discharge:"Discharge"}},zone_valve:{name:"Zone valve"},terminal:{ports:{in:"Supply",out:"Return"}},radiator:{name:"Radiator"},fancoil:{name:"Fan coil / convector"},outdoor_temperature:{name:"Outdoor temperature"}},addons:{temperature:{name:"Temperature sensor"},value:{name:"Value"},electric_heater:{name:"Electric heater"},pump:{name:"Pump"},actuator:{name:"Actuator"},fan:{name:"Fan"},mode:{name:"Operating mode"},setpoint:{name:"Setpoint"},defrost:{name:"Defrost"},alarm:{name:"Alarm"},window:{name:"Window"},heat_exchanger:{name:"Heat exchanger",hint:"Adds the heat exchanger and its connections to the drawing."},loop:{name:"Loop"}},slots:{top:"top",upper:"upper",middle:"middle",lower:"lower",bottom:"bottom",supply:"supply",return:"return",outdoor:"outdoor",evaporator:"evaporator",room:"room",floor:"floor",mixed:"mixed water",inlet:"inlet",outlet:"outlet",collector:"collector",primary_supply:"primary supply",primary_return:"primary return",secondary_supply:"secondary supply",secondary_return:"secondary return"},templates:{heat_pump_floor:"Heat pump + floor heating",heat_pump_dhw_floor:"Heat pump + DHW tank + floor heating",heat_pump_buffer_radiators:"Heat pump + buffer tank + radiators",boiler_radiators:"Boiler + radiators"},editor:{schema_tab:"Schema",overlay_tab:"Overlays",device_type:"Device type",add_device:"Add device",add_from_entity:"Add from entity",add_from_entity_helper:"Pick the device's main entity; the device type is suggested",choose_type:"Choose device type",suggested_title:"Suggested add-ons",suggested_hint:"Other entities of the same Home Assistant device.",add_all:"Add all",template:"Template",insert_template:"Insert template",empty_hint:"Add a device to start building your schema.",devices_title:"Devices",no_entity:"No entity",ports_connected:"{0}/{1} connected",addon_count:"{0} add-ons",back:"Back",name:"Name",name_helper:"Empty = device type name",entity:"Entity",active_state:"Active state",active_state_helper:"Empty = hvac_action, otherwise on / heat / open",value_attribute:"Displayed attribute",value_attribute_helper:"Empty = entity state, e.g. current_temperature",actuator_entity:"Actuator entity",position_attribute:"Position attribute (%)",position_attribute_helper:"Empty = current_position or the entity state",valve_attribute:"Valve position attribute",valve_attribute_helper:"Default: position",branch_a:"Value for branch A",branch_a_helper:"Default: a",branch_b:"Value for branch B",branch_b_helper:"Default: b",loop_temperature:"Room temperature entity",addons_title:"Add-ons",addons_empty:"No add-ons yet.",addon_type:"Add-on type",add_addon:"Add add-on",remove_addon:"Remove add-on",remaining:"{0} left",slot:"Position",addon_name_helper:"Empty = add-on type and position",connections_title:"Connections",not_connected:"Not connected",connect_to:"Connect to",disconnect:"Disconnect",connection_pending:"Connecting from {0} — click a compatible port",delete_connection:"Delete selected connection",invalid_connections:"{0} connections point to missing or incompatible ports.",remove_invalid:"Remove",position_title:"Position",rotate:"Rotate",delete_device:"Delete device",add_overlay:"Add overlay",overlays_empty:"No overlays yet.",overlay_n:"Overlay {0}",remove_overlay:"Remove overlay"},overlay:{entity:"Entity",name:"Name",name_helper:"Empty = entity name",name_yaml:"The name is configured in YAML.",template:"Display template",template_helper:"Placeholders: {{ state }}, {{ attr('attribute') }}. Empty = formatted state",rules:"Conditional rules",add_rule:"Add rule",remove_rule:"Remove rule",rule:{condition:"Condition",condition_state:"State equals",condition_numeric:"Numeric value",entity:"Entity",entity_helper:"Empty = overlay entity",state:"State",above:"Above",below:"Below",color:"Text color",color_helper:"Home Assistant color name or any CSS color",hide:"Hide overlay"}},card:{empty:"No schema configured. Edit this card to design your heating layout."}},cs:{devices:{heat_pump:{name:"Tepelné čerpadlo",ports:{cold_in:"Vratka topné vody",hot_out:"Výstup topné vody"}},valve_3way:{name:"Třícestný ventil",ports:{in:"Vstup",out_a:"Výstup A",out_b:"Výstup B"}},boiler:{name:"Bojler",ports:{cold_in:"Studená voda – vstup",hot_out:"Teplá voda – výstup",coil_in:"Výměník – přívod od zdroje",coil_out:"Výměník – vratka ke zdroji",coil2_in:"Druhý výměník – přívod",coil2_out:"Druhý výměník – vratka"}},junction:{name:"Uzel",ports:{in:"Vstup",out_top:"Horní výstup",out_bottom:"Spodní výstup"}},circulation_pump:{name:"Oběhové čerpadlo",ports:{in:"Vstup",out:"Výstup"}},floor_heating:{name:"Podlahové topení",ports:{in:"Přívod",out:"Vratka"}},manifold:{name:"Rozdělovač podlahového topení",ports:{supply_in:"Přívod",return_out:"Vratka",loop_out:"Okruh {0} – přívod",loop_in:"Okruh {0} – vratka"}},buffer_tank:{name:"Akumulační nádrž",ports:{source_in:"Od zdroje tepla",source_out:"Zpět ke zdroji tepla",supply_out:"Do topného systému",return_in:"Vratka z topného systému",coil_in:"Výměník – přívod",coil_out:"Výměník – vratka"}},mixing_valve:{name:"Směšovací ventil",ports:{hot_in:"Teplá větev",return_in:"Vratka (bypass)",mixed_out:"Smíšená voda"}},electric_heater:{name:"Průtokový elektrický ohřívač",ports:{in:"Vstup",out:"Výstup"}},inline:{ports:{in:"Vstup",out:"Výstup"}},pipe_sensor:{name:"Čidlo / měřidlo"},heat_source:{ports:{supply_out:"Přívod",return_in:"Vratka"}},heating_boiler:{name:"Kotel"},solar_collector:{name:"Solární kolektor",ports:{hot_out:"Teplý výstup",cold_in:"Studený vstup"}},four_port:{ports:{primary_in:"Primár – přívod",primary_out:"Primár – vratka",secondary_out:"Sekundár – přívod",secondary_in:"Sekundár – vratka"}},hydraulic_separator:{name:"Hydraulický vyrovnávač"},plate_heat_exchanger:{name:"Deskový výměník"},expansion_vessel:{name:"Expanzní nádoba",ports:{connection:"Připojení"}},safety_valve:{name:"Pojistný ventil",ports:{in:"Vstup",discharge:"Výtok"}},zone_valve:{name:"Zónový ventil"},terminal:{ports:{in:"Přívod",out:"Vratka"}},radiator:{name:"Radiátor"},fancoil:{name:"Fancoil / konvektor"},outdoor_temperature:{name:"Venkovní teplota"}},addons:{temperature:{name:"Teplotní čidlo"},value:{name:"Hodnota"},electric_heater:{name:"Elektrická topná spirála"},pump:{name:"Čerpadlo"},actuator:{name:"Pohon"},fan:{name:"Ventilátor"},mode:{name:"Provozní režim"},setpoint:{name:"Požadovaná teplota"},defrost:{name:"Odmrazování"},alarm:{name:"Porucha"},window:{name:"Okno"},heat_exchanger:{name:"Výměník",hint:"Přidá do výkresu výměník a jeho připojení."},loop:{name:"Okruh"}},slots:{top:"nahoře",upper:"horní část",middle:"uprostřed",lower:"dolní část",bottom:"dole",supply:"přívod",return:"vratka",outdoor:"venkovní",evaporator:"výparník",room:"místnost",floor:"podlaha",mixed:"smíšená voda",inlet:"vstup",outlet:"výstup",collector:"kolektor",primary_supply:"primár – přívod",primary_return:"primár – vratka",secondary_supply:"sekundár – přívod",secondary_return:"sekundár – vratka"},templates:{heat_pump_floor:"Tepelné čerpadlo + podlahové topení",heat_pump_dhw_floor:"Tepelné čerpadlo + bojler + podlahové topení",heat_pump_buffer_radiators:"Tepelné čerpadlo + akumulační nádrž + radiátory",boiler_radiators:"Kotel + radiátory"},editor:{schema_tab:"Schéma",overlay_tab:"Popisky",device_type:"Typ zařízení",add_device:"Přidat zařízení",add_from_entity:"Přidat z entity",add_from_entity_helper:"Vyberte hlavní entitu zařízení, typ se navrhne sám",choose_type:"Vyberte typ zařízení",suggested_title:"Navržené doplňky",suggested_hint:"Další entity téhož zařízení v Home Assistantu.",add_all:"Přidat vše",template:"Šablona",insert_template:"Vložit šablonu",empty_hint:"Přidejte zařízení a začněte sestavovat schéma.",devices_title:"Zařízení",no_entity:"Bez entity",ports_connected:"připojeno {0}/{1}",addon_count:"doplňky: {0}",back:"Zpět",name:"Název",name_helper:"Prázdné = název typu zařízení",entity:"Entita",active_state:"Aktivní stav",active_state_helper:"Prázdné = podle hvac_action, jinak on / heat / open",value_attribute:"Zobrazený atribut",value_attribute_helper:"Prázdné = stav entity, např. current_temperature",actuator_entity:"Entita pohonu",position_attribute:"Atribut polohy (%)",position_attribute_helper:"Prázdné = current_position nebo stav entity",valve_attribute:"Atribut polohy ventilu",valve_attribute_helper:"Výchozí: position",branch_a:"Hodnota pro větev A",branch_a_helper:"Výchozí: a",branch_b:"Hodnota pro větev B",branch_b_helper:"Výchozí: b",loop_temperature:"Entita teploty místnosti",addons_title:"Doplňky",addons_empty:"Zatím žádné doplňky.",addon_type:"Typ doplňku",add_addon:"Přidat doplněk",remove_addon:"Odebrat doplněk",remaining:"zbývá {0}",slot:"Umístění",addon_name_helper:"Prázdné = typ doplňku a umístění",connections_title:"Propojení",not_connected:"Nepřipojeno",connect_to:"Připojit k",disconnect:"Odpojit",connection_pending:"Napojování z {0} — klikněte na kompatibilní port",delete_connection:"Smazat vybrané propojení",invalid_connections:"Propojení s neexistujícím nebo nekompatibilním portem: {0}",remove_invalid:"Odstranit",position_title:"Poloha",rotate:"Otočit",delete_device:"Smazat zařízení",add_overlay:"Přidat popisek",overlays_empty:"Zatím žádné popisky.",overlay_n:"Popisek {0}",remove_overlay:"Odebrat popisek"},overlay:{entity:"Entita",name:"Název",name_helper:"Prázdné = název entity",name_yaml:"Název je nastaven v YAML.",template:"Šablona zobrazení",template_helper:"Zástupné symboly: {{ state }}, {{ attr('atribut') }}. Prázdné = formátovaný stav",rules:"Podmíněná pravidla",add_rule:"Přidat pravidlo",remove_rule:"Odebrat pravidlo",rule:{condition:"Podmínka",condition_state:"Stav je roven",condition_numeric:"Číselná hodnota",entity:"Entita",entity_helper:"Prázdné = entita popisku",state:"Stav",above:"Nad",below:"Pod",color:"Barva textu",color_helper:"Název barvy Home Assistantu nebo libovolná barva CSS",hide:"Skrýt popisek"}},card:{empty:"Schéma není nakonfigurováno. Upravte kartu a navrhněte topné schéma."}}};function ht(e,t){let o=e;for(const e of t.split(".")){if(void 0===o||"string"==typeof o)return;o=o[e]}return"string"==typeof o?o:void 0}class ut{constructor(e){this.language=e}t(e,...t){let o=ht(pt[this.language],e)??ht(pt[ct],e)??e;return t.forEach((e,t)=>{o=o.replace(`{${t}}`,e)}),o}}function vt(e){return new ut(function(e){if(!e)return ct;if(pt[e])return e;const t=e.split("-")[0];return pt[t]?t:ct}(e))}const yt="states",_t="hassFormatters",mt="hassInternationalization";class $t{constructor(e,t){this._host=e,this._context=t,this._callback=(e,t)=>{this._unsubscribe&&this._unsubscribe!==t&&this._unsubscribe(),this._unsubscribe=t,e!==this.value&&(this.value=e,this._host.requestUpdate())},e.addController(this)}hostConnected(){const e=new Event("context-request",{bubbles:!0,composed:!0});e.context=this._context,e.contextTarget=this._host,e.callback=this._callback,e.subscribe=!0,this._host.dispatchEvent(e)}hostDisconnected(){this._unsubscribe?.(),this._unsubscribe=void 0}}function ft(e){return((e??0)%360+360)%360}function bt(e,t){const o=t*Math.PI/180,i=Math.cos(o),n=Math.sin(o);return{x:Math.round(1e3*(e.x*i-e.y*n))/1e3||0,y:Math.round(1e3*(e.x*n+e.y*i))/1e3||0}}function gt(e,t){const{x:o,y:i}=t.position,n=[[o,{x:-1,y:0}],[e.width-o,{x:1,y:0}],[i,{x:0,y:-1}],[e.height-i,{x:0,y:1}]];return n.sort((e,t)=>e[0]-t[0]),n[0][1]}function xt(e,t){const o=nt(e);if(!o)return;const i=o.ports.find(e=>e.id===t);if(!i)return;const n=ft(e.rotation),r=o.width/2,s=o.height/2,a=bt({x:i.position.x-r,y:i.position.y-s},n);return{nodeId:e.id,portId:i.id,x:e.position.x+r+a.x,y:e.position.y+s+a.y,kind:i.kind,direction:bt(gt(o,i),n)}}function kt(e,t){const o=ft(e.rotation)%180!=0,i=o?t.height:t.width,n=o?t.width:t.height;return{x:e.position.x+(t.width-i)/2,y:e.position.y+(t.height-n)/2,width:i,height:n}}function wt(e,t=10){return Math.round(e/t)*t}function At(e,t,o){if(!e||!o.entity_id)return"—";const i=e[o.entity_id];if(!i)return"—";if(o.template)return function(e,t,o){return e.replace(/\{\{\s*state\s*\}\}/g,t).replace(/\{\{\s*attr\(['"](\w+)['"]\)\s*\}\}/g,(e,t)=>String(o[t]??""))}(o.template,i.state,i.attributes);if(t)return t.formatEntityState(i);const n=i.attributes.unit_of_measurement;return n?`${i.state} ${n}`:i.state}const St=new Set(["primary","accent","disabled","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"]);function Et(e){return St.has(e)?`var(--${e}-color)`:e}function Ct(e,t,o){const i=e[t.entity||o];if(!i)return!1;if("state"===t.condition)return void 0!==t.state&&i.state===t.state;if(void 0===t.above&&void 0===t.below)return!1;const n=Number(i.state);return!Number.isNaN(n)&&((void 0===t.above||n>t.above)&&(void 0===t.below||n<t.below))}const It=new Set(["heating","preheating"]);function Pt(e,t,o){if(!e||!t?.entity_id)return{active:!1};const i=e[t.entity_id];if(!i)return{active:!1};const n=t.value_attribute,r=void 0!==n?i.attributes[n]:void 0,s=void 0!==r,a=s?r:i.state,d=Number(a),l=i.attributes.unit_of_measurement;let c;c=void 0!==n&&s?o?o.formatEntityAttributeValue(i,n):String(r):o?o.formatEntityState(i):l?`${i.state} ${l}`:i.state;const p=function(e,t){if(void 0!==t)return e.state===t;const o=e.attributes.hvac_action;return"string"==typeof o?It.has(o):"on"===e.state||"heat"===e.state||"open"===e.state}(i,t.active_state),h=t.mode_attribute??"position",u=String(i.attributes[h]??i.state??"");let v;return u===(t.branch_a_value??"a")&&(v="a"),u===(t.branch_b_value??"b")&&(v="b"),{active:p,valveBranch:v,value:c,numeric:""!==String(a??"").trim()&&Number.isFinite(d)?d:void 0,position:Mt(i,t.mode_attribute),unit:l,fromAttribute:s,deviceClass:i.attributes.device_class}}function Mt(e,t){const o=t?e.attributes[t]:e.attributes.current_position??e.state,i=Number(o);if(null!=o&&""!==o&&Number.isFinite(i))return Math.min(100,Math.max(0,i))}function Nt(e,t){return(e.addons??[]).filter(e=>e.config.type===t).map(e=>e.state)}function zt(e){const t=new Map;for(const o of e.addons??[])"temperature"===o.config.type&&o.config.slot&&t.set(o.config.slot,o.state);return t}function Lt(e){const t=(e.addons??[]).filter(e=>"electric_heater"===e.config.type&&e.config.entity_id);if(t.length)return{active:t.some(e=>e.state.active)}}const Ot="#ef5350",Tt="#42a5f5",Ht="#4caf50",Kt="#ff7043",jt="var(--card-background-color, #1c1c1c)",Dt="var(--divider-color, #888)",Rt="var(--primary-color, #03a9f4)";function Ut(e){if(void 0===e)return Dt;const t=Math.min(1,Math.max(0,(e-20)/40));return`hsl(${Math.round(220*(1-t))}, 75%, 50%)`}function Vt(e,t,o=Ht){return e.active?o:t?Rt:Dt}function Bt(e){return e?2.5:1.5}function Zt(e,t){return e.ports.map(e=>Z`
    <circle
      class="port port-${e.kind}"
      data-port-id="${e.id}"
      cx="${e.position.x}" cy="${e.position.y}" r="5"
      fill="${jt}"
      stroke="${"inlet"===e.kind?"#4fc3f7":"#ff8a65"}"
      stroke-width="2"
    ><title>${t.t(e.labelKey,...e.labelArgs??[])}</title></circle>
  `)}function Ft(e,t,o,i){const n=o/6;let r=`M ${e} ${t}`;for(let o=1;o<=6;o++)r+=` L ${e+o*n} ${t+(o%2==0?0:-8)}`;const s=i.active?Kt:Dt;return Z`
    <path class="heater ${i.active?"active":""}" d="${r}" fill="none"
      stroke="${s}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
  `}function qt(e,t){return e.ports.map(o=>{const{x:i,y:n}=o.position,r=0===i?t:i===e.width?-t:0,s=0===n?t:n===e.height?-t:0;return Z`<line x1="${i}" y1="${n}" x2="${i+r}" y2="${n+s}" stroke="${Dt}" stroke-width="2" />`})}function Wt(e){return void 0!==e.numeric||e.fromAttribute?e.value:void 0}function Jt(e,t,o,i=!1){const n=o.value??"—",r=6.5*n.length+8,s=i&&void 0!==o.numeric?`fill: ${Ut(o.numeric)}`:"";return Z`
    <rect x="${e-r/2}" y="${t-11}" width="${r}" height="15" rx="3" fill="${jt}" opacity="0.85" />
    <text x="${e}" y="${t}" text-anchor="middle" class="device-value" style="${s}">
      <title>${o.label??""}</title>${n}
    </text>
  `}const Yt="#ffb300";function Gt(e,t,o,i,n){switch(e){case"heating_boiler":return function(e,t,o,i){const n=e.width/2-4,r=e.height/2+14,s=Wt(i),a=i.active?Kt:Dt,d=[-14,0,14].map(e=>{const t=n+e;return Z`
      <path d="M ${t} ${r+18} C ${t-6} ${r+10}, ${t+6} ${r+2}, ${t} ${r-6}
        C ${t-6} ${r-14}, ${t+6} ${r-20}, ${t} ${r-26}"
        fill="none" stroke="${a}" stroke-width="2.5" stroke-linecap="round" />
    `});return Z`
    <g class="device device-heat-source">
      ${qt(e,12)}
      <rect x="8" y="10" width="${e.width-20}" height="${e.height-20}" rx="8"
        fill="${jt}" stroke="${Vt(i,o,Kt)}"
        stroke-width="${Bt(o)}" />
      ${s?Z`<text x="${n}" y="30" text-anchor="middle" class="device-value">${s}</text>`:Z``}
      ${d}
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n);case"solar_collector":return function(e,t,o,i){const n=Vt(i,o,Yt),r=Wt(i);return Z`
    <g class="device device-solar-collector">
      <path d="M 124 22 L ${e.width} 22 M 100 84 L ${e.width} 84" stroke="${Dt}" stroke-width="2" />
      <path d="M 10 84 L 36 22 L 124 22 L 100 84 Z" fill="${jt}"
        stroke="${n}" stroke-width="${Bt(o)}" stroke-linejoin="round" />
      <path d="M 58 22 L 32 84 M 80 22 L 54 84 M 102 22 L 76 84 M 23 53 L 112 53"
        stroke="${Dt}" stroke-width="1" />
      <circle cx="20" cy="14" r="6" fill="${i.active?Yt:"none"}" stroke="${Yt}" stroke-width="1.5" />
      ${r?Z`<text x="67" y="${e.height-2}" text-anchor="middle" class="device-value">${r}</text>`:Z``}
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n);case"hydraulic_separator":return function(e,t,o,i){const n=25,r=e.width-25,s=e.height-8,a=e.height/2,d=Wt(i);return Z`
    <g class="device device-hydraulic-separator">
      ${qt(e,n)}
      <rect x="${n}" y="${8}" width="${r-n}" height="${a-8}" fill="${Ot}" opacity="0.25" />
      <rect x="${n}" y="${a}" width="${r-n}" height="${s-a}" fill="${Tt}" opacity="0.25" />
      <rect x="${n}" y="${8}" width="${r-n}" height="${s-8}" rx="${(r-n)/2}"
        fill="none" stroke="${Vt(i,o)}" stroke-width="${Bt(o)}" />
      ${d?Z`<text x="${e.width/2}" y="${a+4}" text-anchor="middle" class="device-value">${d}</text>`:Z``}
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n);case"plate_heat_exchanger":return function(e,t,o,i){const n=e.width-22,r=[];for(let t=29,o=0;t<n-3;t+=7,o++)r.push(Z`<line x1="${t}" y1="18" x2="${t}" y2="${e.height-18}"
      stroke="${o%2==0?Ot:Tt}" stroke-width="2" opacity="0.8" />`);return Z`
    <g class="device device-plate-heat-exchanger">
      ${qt(e,22)}
      <rect x="${22}" y="10" width="${n-22}" height="${e.height-20}" rx="4"
        fill="${jt}" stroke="${Vt(i,o)}" stroke-width="${Bt(o)}" />
      ${r}
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n);case"expansion_vessel":return function(e,t,o,i){const n=e.width/2,r=47,s=Wt(i);return Z`
    <g class="device device-expansion-vessel">
      <line x1="${n}" y1="${86}" x2="${n}" y2="${e.height}" stroke="${Dt}" stroke-width="2" />
      <rect x="13" y="${r}" width="${e.width-26}" height="${31}" fill="${Tt}" opacity="0.2" />
      <rect x="12" y="${8}" width="${e.width-24}" height="${78}" rx="${(e.width-24)/2}"
        fill="none" stroke="${Vt(i,o)}" stroke-width="${Bt(o)}" />
      <path d="M 13 ${r} Q ${n} ${55} ${e.width-13} ${r}"
        fill="none" stroke="${Dt}" stroke-width="1.5" stroke-dasharray="3 2" />
      ${s?Z`<text x="${n}" y="${37}" text-anchor="middle" class="device-value">${s}</text>`:Z``}
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n);case"safety_valve":return function(e,t,o,i){const n=Vt(i,o,Ot),r=Bt(o),s=30,a=56;return Z`
    <g class="device device-safety-valve">
      <line x1="${s}" y1="${70}" x2="${s}" y2="${e.height}" stroke="${Dt}" stroke-width="2" />
      <line x1="${44}" y1="${a}" x2="${e.width}" y2="${a}" stroke="${Dt}" stroke-width="2" />
      <path d="M ${18} ${70} L ${42} ${70} L ${s} ${a} Z M ${44} ${44} L ${44} ${68} L ${s} ${a} Z"
        fill="${i.active?Ot:jt}" fill-opacity="${i.active?.5:1}"
        stroke="${n}" stroke-width="${r}" stroke-linejoin="round" />
      <path d="M ${s} ${a} L ${s} ${48} L ${23} ${44} L ${37} ${38} L ${23} ${32}
        L ${37} ${26} L ${23} ${20} L ${s} ${16}"
        fill="none" stroke="${n}" stroke-width="1.5" stroke-linejoin="round" />
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n);case"zone_valve":return function(e,t,o,i){const n=Vt(i,o),r=Bt(o),s=e.width/2,a=50;return Z`
    <g class="device device-zone-valve">
      <line x1="0" y1="${a}" x2="${s-16}" y2="${a}" stroke="${Dt}" stroke-width="2" />
      <line x1="${s+16}" y1="${a}" x2="${e.width}" y2="${a}" stroke="${Dt}" stroke-width="2" />
      <path d="M ${s-16} ${39} L ${s} ${a} L ${s-16} ${61} Z M ${s+16} ${39} L ${s} ${a} L ${s+16} ${61} Z"
        fill="${i.active?Ht:jt}" fill-opacity="${i.active?.45:1}"
        stroke="${n}" stroke-width="${r}" stroke-linejoin="round" />
      <line x1="${s}" y1="${a}" x2="${s}" y2="30" stroke="${n}" stroke-width="2" />
      <rect x="${s-12}" y="10" width="24" height="20" rx="3"
        fill="${i.active?Ht:jt}" stroke="${n}" stroke-width="${r}" />
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n);case"radiator":return function(e,t,o,i){const n=Wt(i),r=[];for(let t=26;t<=e.width-24;t+=10)r.push(Z`<line x1="${t}" y1="22" x2="${t}" y2="58" stroke="${Dt}" stroke-width="1.5" />`);return Z`
    <g class="device device-radiator">
      <path d="M 0 66 L 16 66 L 16 62 M ${e.width-16} 62 L ${e.width-16} 66 L ${e.width} 66"
        fill="none" stroke="${Dt}" stroke-width="2" />
      <rect x="16" y="16" width="${e.width-32}" height="46" rx="4"
        fill="${i.active?Kt:jt}" fill-opacity="${i.active?.2:1}"
        stroke="${Vt(i,o,Kt)}" stroke-width="${Bt(o)}" />
      ${r}
      <rect x="4" y="26" width="10" height="18" rx="3" fill="${jt}" stroke="${Dt}" stroke-width="1.5" />
      ${n?Z`<text x="${e.width/2}" y="10" text-anchor="middle" class="device-value">${n}</text>`:Z``}
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n);case"fancoil":return function(e,t,o,i){const n=Wt(i);return Z`
    <g class="device device-fancoil">
      <path d="M 0 66 L 16 66 M ${e.width-16} 66 L ${e.width} 66" stroke="${Dt}" stroke-width="2" />
      <rect x="16" y="12" width="${e.width-32}" height="54" rx="6"
        fill="${jt}" stroke="${Vt(i,o)}" stroke-width="${Bt(o)}" />
      <circle cx="${46}" cy="${38}" r="20" fill="none" stroke="${Dt}" stroke-width="1.5" />
      <g class="fan ${i.active?"spinning":""}">
        ${[0,90,180,270].map(e=>Z`
          <path d="${"M 0 0 C 4 -7, 13 -9, 17 -4 C 12 -1, 5 0, 0 0 Z"}" transform="translate(${46} ${38}) rotate(${e})" fill="${Rt}" opacity="0.75" />
        `)}
        <circle cx="${46}" cy="${38}" r="3.5" fill="${Rt}" />
      </g>
      <path d="M 76 50 L 104 50 M 76 56 L 104 56" stroke="${Dt}" stroke-width="1.5" />
      ${n?Z`<text x="90" y="36" text-anchor="middle" class="device-value">${n}</text>`:Z``}
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n);case"outdoor_temperature":return function(e,t,o){const i=t?Rt:Dt;return Z`
    <g class="device device-outdoor-temperature">
      <rect x="2" y="6" width="${e.width-4}" height="${e.height-12}" rx="${(e.height-12)/2}"
        fill="${jt}" stroke="${i}" stroke-width="${Bt(t)}" />
      <circle cx="22" cy="${e.height/2}" r="6" fill="none" stroke="#ffb300" stroke-width="1.5" />
      <path d="M 22 13 V 16 M 22 34 V 37 M 10 25 H 13 M 31 25 H 34 M 14 17 L 16 19 M 28 31 L 30 33 M 14 33 L 16 31 M 28 19 L 30 17"
        stroke="#ffb300" stroke-width="1.5" stroke-linecap="round" />
      <text x="${e.width/2+14}" y="${e.height/2+4}" text-anchor="middle" class="device-value">
        ${o.value??"—"}
      </text>
    </g>
  `}(t,i,n);default:return}}const Xt={temperature:"temperature",pressure:"pressure",volume_flow_rate:"flow",energy:"energy",power:"energy"};function Qt(e,t,o,i){const n=function(e){const t=e.deviceClass?Xt[e.deviceClass]:void 0;return t||(e.unit?.includes("°")?"temperature":"generic")}(i),r=e.width/2,s=e.height-14,a=o?"var(--primary-color, #03a9f4)":"temperature"===n?Ut(i.numeric):"var(--primary-color, #03a9f4)",d="energy"===n||"generic"===n;return Z`
    <g class="device device-inline-sensor">
      <line x1="0" y1="${s}" x2="${e.width}" y2="${s}" stroke="var(--divider-color, #888)" stroke-width="3" />
      <circle cx="${r}" cy="${s}" r="11" fill="var(--card-background-color, #1c1c1c)"
        stroke="${a}" stroke-width="${o?2.5:2}" />
      <path d="${function(e,t,o){switch(e){case"temperature":return`M ${t-1.5} ${o+2} V ${o-6} A 1.5 1.5 0 0 1 ${t+1.5} ${o-6} V ${o+2} M ${t-3} ${o+4.5} A 3 3 0 1 0 ${t+3} ${o+4.5} A 3 3 0 1 0 ${t-3} ${o+4.5}`;case"flow":return`M ${t-6} ${o} L ${t+5} ${o} M ${t+1} ${o-4} L ${t+5} ${o} L ${t+1} ${o+4}`;case"pressure":return`M ${t-6} ${o+3} A 6 6 0 1 1 ${t+6} ${o+3} M ${t} ${o+1} L ${t+4} ${o-4}`;case"energy":return`M ${t+1} ${o-7} L ${t-4} ${o+1} L ${t} ${o+1} L ${t-1} ${o+7} L ${t+4} ${o-1} L ${t} ${o-1} Z`;case"generic":return`M ${t-3} ${o} A 3 3 0 1 0 ${t+3} ${o} A 3 3 0 1 0 ${t-3} ${o} Z`}}(n,r,s)}" fill="${d?a:"none"}"
        stroke="${a}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <text x="${r}" y="${s-17}" text-anchor="middle" class="device-value">${i.value??"—"}</text>
      ${Zt(e,t)}
    </g>
  `}function eo(e,t,o,i,n,r={}){switch(e){case"heat_pump":return function(e,t,o,i,n){const r=i.active?"#4caf50":o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",s=o?2.5:1.5;return Z`
    <g class="device device-outdoor-unit">
      <rect x="10" y="12" width="${e.width-20}" height="${e.height-24}" rx="6"
        fill="var(--card-background-color, #1c1c1c)" stroke="${r}" stroke-width="${s}" />
      <circle cx="${58}" cy="${60}" r="34" fill="none" stroke="var(--divider-color, #888)" stroke-width="1.5" />
      <g class="fan ${i.active?"spinning":""}">
        ${[0,90,180,270].map(e=>Z`
          <path d="${"M 0 0 C 6 -10, 20 -14, 26 -6 C 18 -2, 8 0, 0 0 Z"}" transform="translate(${58} ${60}) rotate(${e})"
            fill="var(--primary-color, #03a9f4)" opacity="0.75" />
        `)}
        <circle cx="${58}" cy="${60}" r="5" fill="var(--primary-color, #03a9f4)" />
      </g>
      ${n.slice(0,6).map((e,t)=>Z`
        <text x="104" y="${30+15*t}" class="device-value">
          <title>${e.label??""}</title>${e.value??"—"}
        </text>
      `)}
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n,[...Nt(r,"temperature"),...Nt(r,"value")]);case"valve_3way":return function(e,t,o,i){const n=i.active?"#4caf50":o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",r=o?2.5:1.5,s="a"===i.valveBranch?"#4caf50":"var(--divider-color, #555)",a="b"===i.valveBranch?"#4caf50":"var(--divider-color, #555)";return Z`
    <g class="device device-valve-3way">
      <polygon
        points="10,50 45,15 45,35 90,35 90,65 45,65 45,85"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${n}" stroke-width="${r}"
      />
      <line x1="45" y1="50" x2="90" y2="25" stroke="${s}" stroke-width="3" />
      <line x1="45" y1="50" x2="90" y2="75" stroke="${a}" stroke-width="3" />
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n);case"boiler":return function(e,t,o,i,n,r){const s=i.active?"#4caf50":o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",a=o?2.5:1.5,d=e.ports.some(e=>"coil2_in"===e.id),l=e.ports.find(e=>"cold_in"===e.id)?.position.y??118,c={[ke[0]]:34,[ke[1]]:78,[ke[2]]:e.height-26};return Z`
    <g class="device device-boiler">
      <path d="M 88 30 H ${e.width} M 88 ${l} H ${e.width}" stroke="var(--divider-color, #888)" stroke-width="2" />
      <rect
        x="12" y="8" width="76" height="${e.height-16}" rx="18"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${s}" stroke-width="${a}"
      />
      <path d="${"M 0 50 H 24 L 58 58 L 24 66 L 58 74 L 24 82 L 58 90 L 24 98 L 24 100 H 0"}" fill="none" stroke="${Ot}" stroke-width="2" stroke-linejoin="round" opacity="0.8" />
      ${d?Z`<path d="${"M 0 122 H 24 L 58 130 L 24 138 L 58 146 L 24 154 L 24 160 H 0"}" fill="none" stroke="${Ot}" stroke-width="2" stroke-linejoin="round" opacity="0.6" />`:Z``}
      ${ke.map(e=>{const t=r.get(e);return t?Jt(50,c[e],t,!0):Z``})}
      ${n?Ft(30,e.height-14,40,n):Z``}
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n,Lt(r),zt(r));case"junction":return function(e,t,o,i){const n=i.active?"#4caf50":o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return Z`
    <g class="device device-junction">
      <circle
        cx="30" cy="30" r="18"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${n}" stroke-width="${o?2.5:1.5}"
      />
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n);case"circulation_pump":return function(e,t,o,i){const n=i.active?"#4caf50":o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return Z`
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
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n);case"floor_heating":return function(e,t,o,i){const n=i.active?"#4caf50":o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return Z`
    <g class="device device-floor-heating">
      <rect
        x="10" y="18" width="120" height="55" rx="8"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${n}" stroke-width="${o?2.5:1.5}"
      />
      <path d="M 20 40 C 35 30, 50 50, 65 40 C 80 30, 95 50, 110 40 C 115 37, 120 37, 126 40"
        fill="none" stroke="var(--primary-color, #03a9f4)" stroke-width="2" />
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n);case"manifold":return function(e,t,o,i,n){const r=i.active?"#4caf50":o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",s=o?2.5:1.5,a=e.width-8,d=e.ports.filter(e=>e.id.startsWith("loop_")&&"outlet"===e.kind);return Z`
    <g class="device device-manifold">
      <rect x="2" y="18" width="${e.width-4}" height="94" rx="6"
        fill="none" stroke="${r}" stroke-width="${s}" stroke-dasharray="4 3" />
      <rect x="4" y="22" width="${a}" height="16" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${Ot}" stroke-width="2" />
      <rect x="4" y="92" width="${a}" height="16" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${Tt}" stroke-width="2" />
      ${d.map((t,o)=>{const i=t.position.x,r=n[o]?.active??!1;return Z`
          <line x1="${i}" y1="0" x2="${i}" y2="22" stroke="${Ot}" stroke-width="2" />
          <rect class="actuator ${r?"active":""}" x="${i-7}" y="6" width="14" height="11" rx="2"
            fill="${r?"#4caf50":"var(--card-background-color, #1c1c1c)"}"
            stroke="${r?"#4caf50":"var(--divider-color, #888)"}" stroke-width="1.5" />
          <line x1="${i}" y1="108" x2="${i}" y2="${e.height}" stroke="${Tt}" stroke-width="2" />
          <text x="${i}" y="69" text-anchor="middle" class="device-label">${o+1}</text>
        `})}
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n,Nt(r,"loop"));case"buffer_tank":return function(e,t,o,i,n,r){const s=i.active?"#4caf50":o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",a=o?2.5:1.5,d=e.height-10,l=(d-16-36)/(xe.length-1),c=xe.map((e,t)=>({y:34+t*l,state:n.get(e)})).filter(e=>void 0!==e.state),p=e.ports.some(e=>"coil_in"===e.id);return Z`
    <g class="device device-buffer-tank">
      ${e.ports.map(e=>Z`
        <line x1="${e.position.x}" y1="${e.position.y}" x2="${0===e.position.x?14:86}" y2="${e.position.y}"
          stroke="var(--divider-color, #888)" stroke-width="2" />
      `)}
      <rect x="14" y="10" width="72" height="${e.height-14}" rx="10"
        fill="var(--card-background-color, #1c1c1c)" stroke="${s}" stroke-width="${a}" />
      ${c.map((e,t)=>{const o=0===t?16:(c[t-1].y+e.y)/2,i=t===c.length-1?d:(e.y+c[t+1].y)/2,n=Ut(e.state.numeric);return Z`
          <rect x="17" y="${o}" width="66" height="${i-o}" fill="${n}" opacity="0.3" />
          <circle cx="18" cy="${e.y}" r="3" fill="${n}" />
        `})}
      ${p?Z`<path d="M 14 80 L 46 88 L 18 96 L 46 104 L 18 112 L 14 118" fill="none"
            stroke="${Ot}" stroke-width="2" stroke-linejoin="round" opacity="0.8" />`:Z``}
      ${c.map(e=>Jt(56,e.y+4,e.state))}
      ${r?Ft(28,d-8,44,r):Z``}
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n,zt(r),Lt(r));case"mixing_valve":return function(e,t,o,i){const n=o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",r=o?2.5:1.5,s=i.position,a=void 0===s?"var(--divider-color, #888)":`hsl(${Math.round(210*(1-s/100))}, 75%, 55%)`;return Z`
    <g class="device device-mixing-valve">
      <line x1="0" y1="70" x2="22" y2="70" stroke="${Ot}" stroke-width="3" />
      <line x1="50" y1="96" x2="50" y2="${e.height}" stroke="${Tt}" stroke-width="3" />
      <line x1="78" y1="70" x2="${e.width}" y2="70" stroke="${a}" stroke-width="3" />
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
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n);case"electric_heater":return function(e,t,o,i){const n=i.active?Kt:o?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",r=o?2.5:1.5;return Z`
    <g class="device device-electric-heater">
      <rect x="10" y="12" width="${e.width-20}" height="${e.height-24}" rx="8"
        fill="var(--card-background-color, #1c1c1c)" stroke="${n}" stroke-width="${r}" />
      ${Ft(24,e.height/2+4,e.width-48,i)}
      ${Zt(e,t)}
    </g>
  `}(t,o,i,n);case"pipe_sensor":return Qt(t,o,i,n);default:return Gt(e,t,o,i,n)}}let to=class extends le{constructor(){super(...arguments),this.schema={nodes:[],connections:[],overlays:[]},this.editable=!1,this._states=new $t(this,yt),this._formatters=new $t(this,_t),this._i18n=new $t(this,mt)}updated(e){e.has("editable")&&this.toggleAttribute("editable",this.editable)}render(){const e=this._translator(),{nodes:t,connections:o,overlays:i}=this.schema,n=this._dragBounds??this._computeBounds(t);return B`
      <svg
        viewBox="${n.x} ${n.y} ${n.width} ${n.height}"
        @pointerdown="${this._onCanvasPointerDown}"
        @pointermove="${this._onCanvasPointerMove}"
        @pointerup="${this._onCanvasPointerUp}"
        @pointerleave="${this._onCanvasPointerUp}"
      >
        ${this.editable?Z`
            <defs>
              <pattern id="grid" width="${20}" height="${20}" patternUnits="userSpaceOnUse">
                <circle class="grid-dot" cx="0" cy="0" r="1" />
              </pattern>
            </defs>
            <rect x="${n.x}" y="${n.y}" width="${n.width}" height="${n.height}" fill="url(#grid)" />
          `:q}
        ${o.map(e=>this._renderConnection(e))}
        ${t.map(t=>this._renderNode(t,e))}
        ${i.map(e=>this._renderOverlay(e))}
      </svg>
    `}_translator(){return vt(this._i18n.value?.language)}_computeBounds(e){if(!e.length)return{x:0,y:0,width:800,height:400};let t=1/0,o=1/0,i=-1/0,n=-1/0;for(const r of e){const e=nt(r);if(!e)continue;const s=kt(r,e);t=Math.min(t,s.x),o=Math.min(o,s.y-20),i=Math.max(i,s.x+s.width),n=Math.max(n,s.y+s.height+10)}return{x:t-40,y:o-40,width:i-t+80,height:n-o+80}}_renderConnection(e){const t=me(e.from),o=me(e.to),i=this.schema.nodes.find(e=>e.id===t?.nodeId),n=this.schema.nodes.find(e=>e.id===o?.nodeId);if(!(t&&o&&i&&n))return B``;const r=xt(i,t.portId),s=xt(n,o.portId);if(!r||!s)return B``;const a=function(e,t){const o=Math.hypot(t.x-e.x,t.y-e.y),i=Math.max(30,o/2),n=e.x+e.direction.x*i,r=e.y+e.direction.y*i,s=t.x+t.direction.x*i,a=t.y+t.direction.y*i;return`M ${e.x} ${e.y} C ${n} ${r}, ${s} ${a}, ${t.x} ${t.y}`}(r,s),d=$e(e),l=this.selectedEdgeId===d;return Z`
      <path class="pipe ${l?"selected":""}" d="${a}" />
      ${this.editable?Z`<path class="pipe-hit" data-edge-id="${d}" d="${a}" />`:q}
    `}_renderNode(e,t){const o=nt(e);if(!o)return B``;const i=this.selectedNodeId===e.id,n=this._states.value,r=this._formatters.value,s=Pt(n,e,r),a=(e.addons??[]).map(e=>({config:e,state:{...Pt(n,e,r),label:e.name}})),d=eo(e.type,o,t,i,s,{addons:a});if(!d)return B``;const l=ft(e.rotation),c=kt(e,o).y-e.position.y-4;return Z`
      <g
        class="node ${this._dragNodeId===e.id?"dragging":""}"
        data-node-id="${e.id}"
        transform="translate(${e.position.x} ${e.position.y})"
      >
        <g transform="rotate(${l} ${o.width/2} ${o.height/2})">
          ${d}
        </g>
        <text x="${o.width/2}" y="${c}" text-anchor="middle" class="device-label">
          ${e.name||t.t(o.labelKey)}
        </text>
      </g>
    `}_renderOverlay(e){const t=this._states.value,o=this._formatters.value,i=At(t,o,e),n=function(e,t){let o,i,n=!0;if(!e||!t.rules?.length)return{color:o,className:i,visible:n};for(const r of t.rules)Ct(e,r,t.entity_id)&&(r.effect.color&&(o=Et(r.effect.color)),r.effect.class&&(i=r.effect.class),void 0!==r.effect.visible&&(n=r.effect.visible));return{color:o,className:i,visible:n}}(t,e);if(!n.visible)return B``;const r=function(e,t,o){const i=e?.[o.entity_id];return i&&t?t.formatEntityName(i,o.name):"string"==typeof o.name?o.name:o.entity_id}(t,o,e),s=`${r}: ${i}`,a=Math.max(80,7*s.length+16);return Z`
      <g class="overlay-group ${n.className??""}" transform="translate(${e.position.x} ${e.position.y})">
        <rect class="overlay-bg" x="0" y="0" width="${a}" height="22" rx="4" />
        <text class="overlay-text" x="8" y="15" style="${n.color?`fill: ${n.color}`:""}">
          ${s}
        </text>
      </g>
    `}_onCanvasPointerDown(e){if(!this.editable)return;const t=e.target,o=t?.getAttribute?.("data-edge-id");if(o)return void this.dispatchEvent(new CustomEvent("edge-select",{detail:{edgeId:o},bubbles:!0,composed:!0}));const i=t?.closest?.("[data-node-id]");if(!i)return void this._dispatchSelect(void 0);const n=i.getAttribute("data-node-id");if(!n)return;const r=this.schema.nodes.find(e=>e.id===n);if(!r)return;const s=t?.closest?.("[data-port-id]");if(s){const t=s.getAttribute("data-port-id");if(t)return this._dispatchPortClick(n,t),void e.stopPropagation()}this._dragNodeId=n;const a=this._toLocal(e);this._dragOffset=a?{x:a.x-r.position.x,y:a.y-r.position.y}:{x:0,y:0},this._dragBounds=this._computeBounds(this.schema.nodes),i.setPointerCapture(e.pointerId),this._dispatchSelect(n),e.preventDefault()}_toLocal(e){const t=this.renderRoot.querySelector("svg"),o=t?.getScreenCTM();if(!t||!o)return;const i=t.createSVGPoint();return i.x=e.clientX,i.y=e.clientY,i.matrixTransform(o.inverse())}_onCanvasPointerMove(e){if(!this.editable||!this._dragNodeId)return;const t=this.schema.nodes.find(e=>e.id===this._dragNodeId),o=this._toLocal(e);if(!t||!o)return;const i=this._dragOffset??{x:0,y:0},n={x:wt(o.x-i.x,10),y:wt(o.y-i.y,10)};n.x===t.position.x&&n.y===t.position.y||this.dispatchEvent(new CustomEvent("node-move",{detail:{nodeId:t.id,position:n},bubbles:!0,composed:!0}))}_onCanvasPointerUp(e){if(this._dragNodeId){const t=this.renderRoot.querySelector(`[data-node-id="${this._dragNodeId}"]`);t?.releasePointerCapture(e.pointerId),this._dragNodeId=void 0,this._dragOffset=void 0,this._dragBounds=void 0,this.requestUpdate()}}_dispatchSelect(e){this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:e},bubbles:!0,composed:!0}))}_dispatchPortClick(e,t){this.dispatchEvent(new CustomEvent("port-click",{detail:{nodeId:e,portId:t},bubbles:!0,composed:!0}))}};to.styles=s`
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
  `,e([ve({attribute:!1})],to.prototype,"schema",void 0),e([ve({type:Boolean})],to.prototype,"editable",void 0),e([ve({attribute:!1})],to.prototype,"selectedNodeId",void 0),e([ve({attribute:!1})],to.prototype,"selectedEdgeId",void 0),e([ve({attribute:!1})],to.prototype,"selectedPort",void 0),to=e([pe("heating-schema-canvas")],to);const oo={temperature:{type:"temperature",display:"value",domains:["sensor"],deviceClasses:["temperature"]},value:{type:"value",display:"value",domains:["sensor","number"]},electric_heater:{type:"electric_heater",display:"binary",domains:["switch","binary_sensor","sensor","input_boolean"],deviceClasses:["power","heat","running"]},pump:{type:"pump",display:"binary",domains:["switch","binary_sensor","sensor"],deviceClasses:["running"]},actuator:{type:"actuator",display:"position",domains:["valve","switch","binary_sensor","number","sensor"]},fan:{type:"fan",display:"binary",domains:["fan","sensor","binary_sensor"]},mode:{type:"mode",display:"text",domains:["select","sensor","input_select","climate","water_heater"],deviceClasses:["enum"]},setpoint:{type:"setpoint",display:"value",domains:["number","input_number","climate","water_heater","sensor"],deviceClasses:["temperature"]},defrost:{type:"defrost",display:"binary",domains:["binary_sensor","sensor"]},alarm:{type:"alarm",display:"binary",domains:["binary_sensor","sensor"],deviceClasses:["problem"]},window:{type:"window",display:"binary",domains:["binary_sensor"],deviceClasses:["window","opening"]},heat_exchanger:{type:"heat_exchanger",display:"none",entityless:!0},loop:{type:"loop",display:"binary",domains:["valve","switch","binary_sensor","climate"]}};function io(e){return e.slots?e.slots.length:e.max}function no(e,t){const o=e.nodes.find(e=>e.id===t.nodeId);return o?nt(o)?.ports.find(e=>e.id===t.portId):void 0}function ro(e,t,o){if(t.nodeId===o.nodeId&&t.portId===o.portId)return;const i=no(e,t),n=no(e,o);return i&&n&&i.kind!==n.kind?"outlet"===i.kind?{from:_e(t),to:_e(o)}:{from:_e(o),to:_e(t)}:void 0}function so(e,t){return e.connections.some(e=>e.from===t.from&&e.to===t.to)}function ao(e,t){const o=_e(t);return e.connections.filter(e=>e.from===o||e.to===o)}const lo=/^loop_(\d+)_(in|out)$/;function co(e){const t="string"==typeof e.attributes.friendly_name?e.attributes.friendly_name:"";return` ${`${e.entity_id} ${t}`.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ")} `}const po=(e,t)=>new RegExp(` (?:${t})`).test(e);function ho(e){return e.entity_id.split(".",1)[0]}function uo(e){const t=e.attributes.device_class;return"string"==typeof t?t:void 0}const vo=[["heat ?pump|heatpump|tepeln\\w* cerpadl|tc ","heat_pump"],["buffer|akumul|nadrz","buffer_tank"],["boiler|dhw|hot ?water|tuv|bojler|zasobnik","boiler"],["kotel|furnace|gas ","heating_boiler"],["solar|kolektor","solar_collector"],["manifold|rozdelovac","manifold"],["floor|podlah","floor_heating"],["fan ?coil|fancoil|konvektor","fancoil"],["radiator|trv|hlavic","radiator"],["mixing|smesov","mixing_valve"],["3 ?way|diverter|trojcest|tricest|prepinac","valve_3way"],["pump|cerpadl","circulation_pump"],["outdoor|outside|venkov","outdoor_temperature"]],yo=new Set(["temperature","pressure","volume_flow_rate","energy","power"]);function _o(e){const t=co(e),o=ho(e),i=uo(e);return"problem"===i||po(t,"alarm|fault|error|porucha|chyba")?"alarm":"window"===i||"opening"===i||po(t,"window|okno")?"window":po(t,"defrost|odmraz|odtav")?"defrost":po(t,"heater|heating element|backup|booster|spiral|topn\\w* tyc|bivalen")?"electric_heater":po(t,"pump|cerpadl")?"pump":"fan"===o||po(t,"fan|ventilator")?"fan":"select"===o||"input_select"===o||"enum"===i||po(t,"mode|rezim")?"mode":"number"===o||"input_number"===o||po(t,"setpoint|target|pozadovan|zadan")?"setpoint":"valve"===o||po(t,"actuator|pohon|valve|ventil")?"actuator":"temperature"===i?"temperature":"sensor"===o&&Number.isFinite(Number(e.state))?"value":void 0}const mo={top:"top|nahore|horni",upper:"upper",middle:"middle|mid|stred|uprostred",lower:"lower",bottom:"bottom|dole|spodni|dolni",supply:"supply|flow|outlet|leaving|vystup|privod|topna voda",return:"return|inlet|entering|vratk|zpatec|vstup",outdoor:"outdoor|outside|ambient|venkov",evaporator:"evaporator|vyparnik",room:"room|indoor|inside|mistnost|pokoj|vnitrni",floor:"floor|podlah",mixed:"mixed|smis",inlet:"inlet|vstup",outlet:"outlet|vystup",collector:"collector|panel|kolektor"};function $o(e,t,o){const i=co(e),n=t.filter(e=>!o.has(e));return n.find(e=>mo[e]&&po(i,mo[e]))??n[0]}const fo=()=>Array.from({length:4},()=>({type:"loop"})),bo=[{id:"heat_pump_floor",nodes:[{id:"hp",type:"heat_pump",x:0,y:20},{id:"pump",type:"circulation_pump",x:240,y:15},{id:"manifold",type:"manifold",x:400,y:30,addons:fo()}],connections:[["hp.hot_out","pump.in"],["pump.out","manifold.supply_in"],["manifold.return_out","hp.cold_in"]]},{id:"heat_pump_dhw_floor",nodes:[{id:"hp",type:"heat_pump",x:0,y:140},{id:"valve",type:"valve_3way",x:240,y:130},{id:"dhw",type:"boiler",x:420,y:0},{id:"pump",type:"circulation_pump",x:420,y:220},{id:"manifold",type:"manifold",x:580,y:220,addons:fo()}],connections:[["hp.hot_out","valve.in"],["valve.out_a","dhw.coil_in"],["dhw.coil_out","hp.cold_in"],["valve.out_b","pump.in"],["pump.out","manifold.supply_in"],["manifold.return_out","hp.cold_in"]]},{id:"heat_pump_buffer_radiators",nodes:[{id:"hp",type:"heat_pump",x:0,y:40},{id:"buffer",type:"buffer_tank",x:260,y:0},{id:"pump",type:"circulation_pump",x:440,y:0},{id:"radiator",type:"radiator",x:600,y:20}],connections:[["hp.hot_out","buffer.source_in"],["buffer.source_out","hp.cold_in"],["buffer.supply_out","pump.in"],["pump.out","radiator.in"],["radiator.out","buffer.return_in"]]},{id:"boiler_radiators",nodes:[{id:"boiler",type:"heating_boiler",x:0,y:0},{id:"pump",type:"circulation_pump",x:180,y:0},{id:"radiator",type:"radiator",x:340,y:10}],connections:[["boiler.supply_out","pump.in"],["pump.out","radiator.in"],["radiator.out","boiler.return_in"]]}];function go(e,t,o){const i=new Set(t.nodes.map(e=>e.id)),n=new Map;for(const t of e.nodes){let e=o(t.id);for(;i.has(e);)e=o(t.id);i.add(e),n.set(t.id,e)}const r=function(e){return e.reduce((e,t)=>{const o=nt(t)?.height??0;return Math.max(e,t.position.y+o+60)},0)}(t.nodes),s=e.nodes.map(e=>({id:n.get(e.id)??e.id,type:e.type,position:{x:40+e.x,y:40+r+e.y},addons:e.addons?.map(e=>({...e}))})),a=e=>{const t=e.indexOf(".");return`${n.get(e.slice(0,t))??e.slice(0,t)}${e.slice(t)}`};return{nodes:s,connections:e.connections.map(([e,t])=>({from:a(e),to:a(t)}))}}const xo=new Set(["friendly_name","icon","entity_picture","supported_features","device_class","unit_of_measurement","state_class","attribution","assumed_state","restored","editable","id"]),ko=["on","off","heat","heating","open","idle"],wo=["options","hvac_modes","operation_list","preset_modes","fan_modes"];function Ao(e){const t=e.attributes.friendly_name;return"string"==typeof t&&t?t:e.entity_id}function So(e,t){return t?e.entities?.[t]?.device_id??void 0:void 0}function Eo(e,t={}){if(!e)return[];const o=So(e,t.relatedTo),i=Object.values(e.states).map(i=>{const n=i.entity_id.split(".",1)[0],r=i.attributes.device_class;let s=0;return o&&So(e,i.entity_id)===o&&(s+=4),t.domains?.includes(n)&&(s+=2),"string"==typeof r&&t.deviceClasses?.includes(r)&&(s+=1),{entity:i,score:s,name:Ao(i)}});return i.sort((e,t)=>t.score-e.score||e.name.localeCompare(t.name)),i.slice(0,300).map(({entity:e,name:t})=>({value:e.entity_id,label:t}))}function Co(e,t){const o=t?e?.states[t]:void 0;return o?Object.keys(o.attributes).filter(e=>!xo.has(e)).sort().map(e=>({value:e,label:String(o.attributes[e])})):[]}function Io(e,t,o){const i=t?e?.states[t]:void 0,n=new Set;if(i){const e=o?i.attributes[o]:i.state;if(null!=e&&n.add(String(e)),!o){for(const e of wo){const t=i.attributes[e];Array.isArray(t)&&t.forEach(e=>n.add(String(e)))}const e=i.attributes.hvac_action;"string"==typeof e&&n.add(e)}}return ko.forEach(e=>n.add(e)),[...n].map(e=>({value:e}))}function Po(e,t){const o=e?So(e,t):void 0,i=o?e?.devices?.[o]:void 0;return i?.name_by_user||i?.name||void 0}function Mo(e,t){const o=t?e?.states[t]:void 0;if(!o||!e)return;const i="function"==typeof e.formatEntityState?e.formatEntityState(o):o.state;return`${Ao(o)} · ${i}`}let No=0,zo=class extends le{constructor(){super(...arguments),this.kind="text",this.label="",this.options=[],this._listId="hv-list-"+ ++No,this._inputId=`hv-input-${No}`}render(){if("boolean"===this.kind)return B`
        <label class="check">
          <input type="checkbox" .checked="${Boolean(this.value)}" @change="${this._onCheck}" />
          ${this.label}
        </label>
        ${this._renderHelper()}
      `;if("select"===this.kind){const e=void 0===this.value?"":String(this.value);return B`
        <label for="${this._inputId}">${this.label}</label>
        <select id="${this._inputId}" @change="${this._onInput}">
          ${this.options.map(t=>B`<option value="${t.value}" ?selected="${t.value===e}">${t.label??t.value}</option>`)}
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
            ${this.options.map(e=>B`<option value="${e.value}">${e.label??""}</option>`)}
          </datalist>`:q}
      ${this._renderHelper()}
    `}_renderHelper(){return this.helper?B`<div class="helper">${this.helper}</div>`:q}_onCheck(e){this._emit(e.target.checked)}_onInput(e){const t=e.target.value.trim();"number"===this.kind?this._emit(""===t?void 0:Number(t)):this._emit(""===t?void 0:t)}_emit(e){this.dispatchEvent(new CustomEvent("hv-change",{detail:{value:e}}))}};zo.styles=s`
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
  `,e([ve()],zo.prototype,"kind",void 0),e([ve()],zo.prototype,"label",void 0),e([ve()],zo.prototype,"helper",void 0),e([ve()],zo.prototype,"placeholder",void 0),e([ve({attribute:!1})],zo.prototype,"value",void 0),e([ve({attribute:!1})],zo.prototype,"options",void 0),zo=e([pe("hv-field")],zo);const Lo={key:"entity_id",label:"editor.entity"},Oo={key:"active_state",label:"editor.active_state",helper:"editor.active_state_helper"},To={key:"value_attribute",label:"editor.value_attribute",helper:"editor.value_attribute_helper"},Ho={key:"mode_attribute",label:"editor.position_attribute",helper:"editor.position_attribute_helper"};const Ko=4,jo=200,Do=180,Ro=40,Uo=40,Vo=["climate","water_heater","valve","fan","switch","sensor","binary_sensor"],Bo=["primary","accent","red","pink","purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","grey","blue-grey"],Zo=e=>"string"==typeof e.detail.value?e.detail.value:void 0,Fo=e=>"number"==typeof e.detail.value&&Number.isFinite(e.detail.value)?e.detail.value:void 0;let qo=class extends le{constructor(){super(...arguments),this._tab="schema",this._view={kind:"list"},this._newDeviceType=Ke.type,this._templateId=bo[0].id}set hass(e){this._hass=e}get hass(){return this._hass}setConfig(e){this._config=lt(e)}render(){if(!this._config)return B``;const e=vt(this._hass?.language),t=be(this._config);return B`
      <div class="editor">
        <div class="tabs" role="tablist">
          ${this._renderTab(e,"schema","editor.schema_tab")}
          ${this._renderTab(e,"overlays","editor.overlay_tab")}
        </div>
        ${"schema"===this._tab?this._renderSchemaTab(e,t):this._renderOverlaysTab(e,t)}
      </div>
    `}_renderTab(e,t,o){return B`
      <button
        type="button"
        role="tab"
        aria-selected="${this._tab===t}"
        @click="${()=>{this._tab=t}}"
      >${e.t(o)}</button>
    `}_renderSchemaTab(e,t){const o=this._view,i="list"===o.kind?void 0:t.nodes.find(e=>e.id===o.nodeId);if(i&&"addon"===o.kind){const n=i.addons?.[o.index];if(n)return this._renderAddonView(e,t,i,n,o.index)}return i?this._renderNodeView(e,t,i):this._renderListView(e,t)}_renderCanvas(e,t){return B`
      <heating-schema-canvas
        .schema="${t}"
        .editable="${!0}"
        .selectedNodeId="${this._selectedNodeId}"
        .selectedEdgeId="${this._selectedEdgeId}"
        .selectedPort="${this._pendingPort}"
        @node-select="${this._onNodeSelect}"
        @edge-select="${this._onEdgeSelect}"
        @node-move="${this._onNodeMove}"
        @port-click="${this._onPortClick}"
      ></heating-schema-canvas>
      ${this._pendingPort?B`<p class="notice" role="status">
            ${e.t("editor.connection_pending",this._portRefLabel(e,t,this._pendingPort))}
          </p>`:q}
      ${this._selectedEdgeId?B`<div class="toolbar">
            <button type="button" class="danger" @click="${this._deleteSelectedConnection}">
              ${e.t("editor.delete_connection")}
            </button>
          </div>`:q}
    `}_renderListView(e,t){const o=function(e){return e.connections.filter(t=>{const o=me(t.from),i=me(t.to);return!o||!i||"outlet"!==no(e,o)?.kind||"inlet"!==no(e,i)?.kind})}(t);return B`
      <div class="toolbar">
        <select
          aria-label="${e.t("editor.device_type")}"
          @change="${e=>{this._newDeviceType=e.target.value}}"
        >
          ${tt.map(t=>B`<option value="${t}" ?selected="${t===this._newDeviceType}">
              ${e.t(`devices.${t}.name`)}
            </option>`)}
        </select>
        <button type="button" class="primary" @click="${()=>this._addDevice(this._newDeviceType)}">
          ${e.t("editor.add_device")}
        </button>
      </div>
      <div class="toolbar">
        <select
          aria-label="${e.t("editor.template")}"
          @change="${e=>{this._templateId=e.target.value}}"
        >
          ${bo.map(t=>B`<option value="${t.id}" ?selected="${t.id===this._templateId}">
              ${e.t(`templates.${t.id}`)}
            </option>`)}
        </select>
        <button type="button" @click="${this._insertTemplate}">${e.t("editor.insert_template")}</button>
      </div>
      ${this._renderAddFromEntity(e)}

      ${this._renderCanvas(e,t)}

      ${o.length?B`<p class="warning" role="alert">
            ${e.t("editor.invalid_connections",String(o.length))}
            <button type="button" @click="${()=>this._removeConnections(o)}">
              ${e.t("editor.remove_invalid")}
            </button>
          </p>`:q}

      ${t.nodes.length?B`
            <h3>${e.t("editor.devices_title")}</h3>
            <ul class="list">
              ${t.nodes.map(o=>this._renderNodeRow(e,t,o))}
            </ul>
          `:B`<p class="hint">${e.t("editor.empty_hint")}</p>`}
    `}_renderAddFromEntity(e){const t=this._hass;if(!t)return q;const o=this._entityToAdd?t.states[this._entityToAdd]:void 0,i=this._entityDeviceType??(o?function(e){const t=co(e),o=ho(e),i=vo.find(([e])=>po(t,e))?.[1];return i||("water_heater"===o?"boiler":"climate"===o?"radiator":"valve"===o?"zone_valve":"fan"===o?"fancoil":"sensor"===o&&yo.has(uo(e)??"")?"pipe_sensor":void 0)}(o):void 0);return B`
      <section class="card">
        <hv-field
          kind="combo"
          .label="${e.t("editor.add_from_entity")}"
          .helper="${Mo(t,this._entityToAdd)??e.t("editor.add_from_entity_helper")}"
          .options="${Eo(t,{domains:Vo})}"
          .value="${this._entityToAdd}"
          @hv-change="${e=>{this._entityToAdd=Zo(e),this._entityDeviceType=void 0}}"
        ></hv-field>
        ${o?B`<div class="toolbar">
              <select
                aria-label="${e.t("editor.device_type")}"
                @change="${e=>{this._entityDeviceType=e.target.value||void 0}}"
              >
                ${i?q:B`<option value="" selected>${e.t("editor.choose_type")}</option>`}
                ${tt.map(t=>B`<option value="${t}" ?selected="${t===i}">
                    ${e.t(`devices.${t}.name`)}
                  </option>`)}
              </select>
              <button
                type="button"
                class="primary"
                ?disabled="${!i}"
                @click="${()=>{i&&this._addDevice(i,o.entity_id)}}"
              >${e.t("editor.add_device")}</button>
            </div>`:q}
      </section>
    `}_renderNodeRow(e,t,o){const[i,n]=function(e,t){const o=nt(t)?.ports??[],i=o.filter(o=>ao(e,{nodeId:t.id,portId:o.id}).length).length;return[i,o.length]}(t,o),r=[o.entity_id?Mo(this._hass,o.entity_id)??o.entity_id:e.t("editor.no_entity")];return n&&r.push(e.t("editor.ports_connected",String(i),String(n))),o.addons?.length&&r.push(e.t("editor.addon_count",String(o.addons.length))),B`
      <li>
        <button
          type="button"
          class="row ${o.id===this._selectedNodeId?"selected":""}"
          @click="${()=>this._openNode(o.id)}"
        >
          <span class="row-main">
            <span>${this._nodeName(e,o)}</span>
            <span class="row-sub">${r.join(" · ")}</span>
          </span>
          <span aria-hidden="true">›</span>
        </button>
      </li>
    `}_renderHeader(e,t,o){return B`
      <div class="header">
        <button type="button" class="icon" aria-label="${e.t("editor.back")}" @click="${o}">‹</button>
        <h3>${t}</h3>
      </div>
    `}_renderNodeView(e,t,o){const i=o;return B`
      ${this._renderHeader(e,this._nodeName(e,o),()=>this._openList())}
      ${this._renderCanvas(e,t)}

      <section class="card">
        <hv-field
          .label="${e.t("editor.name")}"
          .helper="${e.t("editor.name_helper")}"
          .placeholder="${e.t(`devices.${o.type}.name`)}"
          .value="${o.name}"
          @hv-change="${e=>this._patchNode(o.id,{name:Zo(e)})}"
        ></hv-field>
        ${this._renderBinding(e,i,function(e){const t=it(e)?.valueDisplay;return"only"===t?[Lo,To]:"with_state"===t?[Lo,Oo,To]:"mixing_valve"===e?[{...Lo,label:"editor.actuator_entity"},Ho]:"valve_3way"===e?[Lo,Oo,{key:"mode_attribute",label:"editor.valve_attribute",helper:"editor.valve_attribute_helper"},{key:"branch_a_value",label:"editor.branch_a",helper:"editor.branch_a_helper"},{key:"branch_b_value",label:"editor.branch_b",helper:"editor.branch_b_helper"}]:[Lo,Oo]}(o.type),{},e=>this._patchNode(o.id,e))}
      </section>

      ${this._renderAddons(e,o)}
      ${this._renderSuggestions(e,o)}
      ${this._renderConnections(e,t,o)}

      <section class="card">
        <h3>${e.t("editor.position_title")}</h3>
        <div class="grid2">
          <hv-field
            kind="number"
            label="X"
            .value="${o.position.x}"
            @hv-change="${e=>this._moveNode(o.id,{x:Fo(e)})}"
          ></hv-field>
          <hv-field
            kind="number"
            label="Y"
            .value="${o.position.y}"
            @hv-change="${e=>this._moveNode(o.id,{y:Fo(e)})}"
          ></hv-field>
        </div>
        <div class="toolbar">
          <button type="button" @click="${()=>this._rotateNode(o.id)}">↻ ${e.t("editor.rotate")}</button>
          <button type="button" class="danger" @click="${()=>this._deleteNode(o.id)}">
            ${e.t("editor.delete_device")}
          </button>
        </div>
      </section>
    `}_renderBinding(e,t,o,i,n){return B`${o.map(o=>{const{kind:r,options:s,helper:a}=this._fieldSource(e,t,o,i);return B`
        <hv-field
          .kind="${r}"
          .label="${e.t(o.label)}"
          .helper="${a}"
          .options="${s}"
          .value="${t[o.key]}"
          @hv-change="${e=>n({[o.key]:Zo(e)})}"
        ></hv-field>
      `})}`}_fieldSource(e,t,o,i){const n=this._hass,r=o.helper?e.t(o.helper):void 0;switch(o.key){case"entity_id":case"temperature_entity_id":return{kind:"combo",options:Eo(n,i),helper:Mo(n,t[o.key])??r};case"value_attribute":case"mode_attribute":return{kind:"combo",options:Co(n,t.entity_id),helper:r};case"branch_a_value":case"branch_b_value":return{kind:"combo",options:Io(n,t.entity_id,t.mode_attribute),helper:r};default:return{kind:"combo",options:Io(n,t.entity_id),helper:r}}}_renderAddons(e,t){const o=it(t.type)?.addons??[];if(!o.length)return q;const i=t.addons??[],n=o.filter(e=>this._remaining(t,e)>0),r=n.find(e=>e.type===this._newAddonType)?.type??n[0]?.type;return B`
      <section class="card">
        <h3>${e.t("editor.addons_title")}</h3>
        ${i.length?B`<ul class="list">
              ${i.map((o,i)=>B`
                <li>
                  <button type="button" class="row" @click="${()=>this._openAddon(t.id,i)}">
                    <span class="row-main">
                      <span>${this._addonName(e,t,o,i)}</span>
                      <span class="row-sub">${this._addonSummary(e,o)}</span>
                    </span>
                    <span aria-hidden="true">›</span>
                  </button>
                  <button
                    type="button"
                    class="icon danger"
                    aria-label="${e.t("editor.remove_addon")}"
                    @click="${()=>this._removeAddon(t.id,i)}"
                  >×</button>
                </li>
              `)}
            </ul>`:B`<p class="hint">${e.t("editor.addons_empty")}</p>`}
        ${r?B`<div class="toolbar" style="margin-top: 8px">
              <select
                aria-label="${e.t("editor.addon_type")}"
                @change="${e=>{this._newAddonType=e.target.value}}"
              >
                ${n.map(o=>B`
                  <option value="${o.type}" ?selected="${o.type===r}">
                    ${e.t(`addons.${o.type}.name`)} (${e.t("editor.remaining",String(this._remaining(t,o)))})
                  </option>
                `)}
              </select>
              <button type="button" @click="${()=>this._addAddon(t.id,r)}">
                ${e.t("editor.add_addon")}
              </button>
            </div>`:q}
      </section>
    `}_renderSuggestions(e,t){const o=function(e,t){const o=t.entity_id?e?.entities?.[t.entity_id]?.device_id:void 0,i=it(t.type)?.addons??[];if(!e||!o||!i.length)return[];const n=[...t.addons??[]],r=new Set([t.entity_id,...n.map(e=>e.entity_id),...n.map(e=>e.temperature_entity_id)]),s=[],a=Object.values(e.entities??{}).filter(e=>e.device_id===o&&!r.has(e.entity_id)).map(t=>e.states[t.entity_id]).filter(e=>void 0!==e).sort((e,t)=>e.entity_id.localeCompare(t.entity_id));for(const e of a){const t=_o(e),o="temperature"===t?["temperature","value"]:t?[t]:[];for(const t of o){const o=i.find(e=>e.type===t),r=n.filter(e=>e.type===t);if(!o||r.length>=io(o))continue;const a={type:o.type,entity_id:e.entity_id};o.slots&&(a.slot=$o(e,o.slots,new Set(r.map(e=>e.slot)))),n.push(a),s.push(a);break}}return s}(this._hass,t);if(!o.length)return q;return B`
      <section class="card">
        <div class="header">
          <h3>${e.t("editor.suggested_title")}</h3>
          <button type="button" @click="${()=>this._addAddons(t.id,o)}">
            ${e.t("editor.add_all")}
          </button>
        </div>
        <p class="hint">${e.t("editor.suggested_hint")}</p>
        <ul class="list" style="margin-top: 8px">
          ${o.map(o=>B`
            <li>
              <div class="row static">
                <span class="row-main">
                  <span>${(t=>t.slot?`${e.t(`addons.${t.type}.name`)} – ${e.t(`slots.${t.slot}`)}`:e.t(`addons.${t.type}.name`))(o)}</span>
                  <span class="row-sub">${Mo(this._hass,o.entity_id)??o.entity_id}</span>
                </span>
              </div>
              <button
                type="button"
                class="icon"
                aria-label="${e.t("editor.add_addon")}"
                @click="${()=>this._addAddons(t.id,[o])}"
              >+</button>
            </li>
          `)}
        </ul>
      </section>
    `}_renderAddonView(e,t,o,i,n){const r=it(o.type)?.addons?.find(e=>e.type===i.type),s=oo[i.type],a=new Set((o.addons??[]).filter((e,t)=>t!==n&&e.type===i.type).map(e=>e.slot)),d=(r?.slots??[]).filter(e=>!a.has(e)).map(t=>({value:t,label:e.t(`slots.${t}`)})),l={domains:s.domains,deviceClasses:s.deviceClasses,relatedTo:o.entity_id};return B`
      ${this._renderHeader(e,this._addonName(e,o,i,n),()=>this._openNode(o.id))}
      ${this._renderCanvas(e,t)}
      <section class="card">
        <p class="hint">${this._nodeName(e,o)} › ${e.t(`addons.${i.type}.name`)}</p>
        ${d.length?B`<hv-field
              kind="select"
              .label="${e.t("editor.slot")}"
              .options="${d}"
              .value="${i.slot}"
              @hv-change="${e=>this._patchAddon(o.id,n,{slot:Zo(e)})}"
            ></hv-field>`:q}
        <hv-field
          .label="${e.t("editor.name")}"
          .helper="${e.t("editor.addon_name_helper")}"
          .value="${i.name}"
          @hv-change="${e=>this._patchAddon(o.id,n,{name:Zo(e)})}"
        ></hv-field>
        ${s.entityless?B`<p class="hint">${e.t(`addons.${i.type}.hint`)}</p>`:this._renderBinding(e,i,function(e){if("loop"===e)return[{...Lo,label:"editor.actuator_entity"},Oo,{key:"temperature_entity_id",label:"editor.loop_temperature"}];switch(oo[e].display){case"value":case"text":return[Lo,To];case"binary":return[Lo,Oo];case"position":return[Lo,Ho];default:return[]}}(i.type),l,e=>this._patchAddon(o.id,n,e))}
      </section>
      <div class="toolbar">
        <button type="button" class="danger" @click="${()=>this._removeAddon(o.id,n)}">
          ${e.t("editor.remove_addon")}
        </button>
      </div>
    `}_renderConnections(e,t,o){const i=nt(o)?.ports??[];return i.length?B`
      <section class="card">
        <h3>${e.t("editor.connections_title")}</h3>
        ${i.map(i=>{const n={nodeId:o.id,portId:i.id},r=ao(t,n),s=function(e,t){const o=no(e,t);if(!o)return[];const i=[];for(const n of e.nodes)if(n.id!==t.nodeId)for(const r of nt(n)?.ports??[]){if(r.kind===o.kind)continue;const s={nodeId:n.id,portId:r.id},a=ro(e,t,s);a&&!so(e,a)&&i.push(s)}return i}(t,n);return B`
            <div class="port">
              <div class="port-label">
                ${"outlet"===i.kind?"→":"←"} ${e.t(i.labelKey,...i.labelArgs??[])}
              </div>
              <div class="chips">
                ${r.length?r.map(o=>{const i=function(e,t){const o=_e(t);return me(e.from===o?e.to:e.from)}(o,n);return B`<span class="chip">
                        ${i?this._portRefLabel(e,t,i):"?"}
                        <button
                          type="button"
                          aria-label="${e.t("editor.disconnect")}"
                          @click="${()=>this._removeConnections([o])}"
                        >×</button>
                      </span>`}):B`<span class="hint">${e.t("editor.not_connected")}</span>`}
              </div>
              ${s.length?B`<select
                    aria-label="${e.t("editor.connect_to")}"
                    @change="${e=>{const t=e.target,o=me(t.value);t.value="",o&&this._connect(n,o)}}"
                  >
                    <option value="">${e.t("editor.connect_to")}…</option>
                    ${s.map(o=>B`<option value="${_e(o)}">${this._portRefLabel(e,t,o)}</option>`)}
                  </select>`:q}
            </div>
          `})}
      </section>
    `:q}_renderOverlaysTab(e,t){return B`
      <div class="toolbar">
        <button type="button" class="primary" @click="${this._addOverlay}">${e.t("editor.add_overlay")}</button>
      </div>
      <heating-schema-canvas .schema="${t}" .editable="${!1}"></heating-schema-canvas>
      ${t.overlays.length?q:B`<p class="hint">${e.t("editor.overlays_empty")}</p>`}
      ${t.overlays.map((t,o)=>this._renderOverlay(e,t,o))}
    `}_renderOverlay(e,t,o){const i=this._hass,n=e=>this._patchOverlay(t.id,e),r=void 0!==t.name&&"string"!=typeof t.name;return B`
      <section class="card">
        <div class="header">
          <h3>${t.entity_id||e.t("editor.overlay_n",String(o+1))}</h3>
          <button
            type="button"
            class="icon danger"
            aria-label="${e.t("editor.remove_overlay")}"
            @click="${()=>this._removeOverlay(t.id)}"
          >×</button>
        </div>
        <hv-field
          kind="combo"
          .label="${e.t("overlay.entity")}"
          .options="${Eo(i)}"
          .helper="${Mo(i,t.entity_id)}"
          .value="${t.entity_id}"
          @hv-change="${e=>n({entity_id:Zo(e)??""})}"
        ></hv-field>
        <hv-field
          .label="${e.t("overlay.name")}"
          .helper="${r?e.t("overlay.name_yaml"):e.t("overlay.name_helper")}"
          .value="${"string"==typeof t.name?t.name:void 0}"
          @hv-change="${e=>n({name:Zo(e)})}"
        ></hv-field>
        <hv-field
          .label="${e.t("overlay.template")}"
          .helper="${e.t("overlay.template_helper")}"
          .value="${t.template}"
          @hv-change="${e=>n({template:Zo(e)})}"
        ></hv-field>
        <div class="grid2">
          <hv-field
            kind="number"
            label="X"
            .value="${t.position.x}"
            @hv-change="${e=>n({position:{...t.position,x:Fo(e)??0}})}"
          ></hv-field>
          <hv-field
            kind="number"
            label="Y"
            .value="${t.position.y}"
            @hv-change="${e=>n({position:{...t.position,y:Fo(e)??0}})}"
          ></hv-field>
        </div>

        <div class="header">
          <h3>${e.t("overlay.rules")}</h3>
          <button type="button" @click="${()=>this._addRule(t)}">${e.t("overlay.add_rule")}</button>
        </div>
        ${(t.rules??[]).map((o,i)=>this._renderRule(e,t,o,i))}
      </section>
    `}_renderRule(e,t,o,i){const n=e=>this._updateRule(t.id,i,e),r=o.entity||t.entity_id;return B`
      <div class="rule">
        <div class="header">
          <hv-field
            style="flex: 1"
            kind="select"
            .label="${e.t("overlay.rule.condition")}"
            .options="${[{value:"state",label:e.t("overlay.rule.condition_state")},{value:"numeric",label:e.t("overlay.rule.condition_numeric")}]}"
            .value="${o.condition}"
            @hv-change="${e=>n(t=>({condition:"numeric"===Zo(e)?"numeric":"state",entity:t.entity,effect:t.effect}))}"
          ></hv-field>
          <button
            type="button"
            class="icon danger"
            aria-label="${e.t("overlay.remove_rule")}"
            @click="${()=>n(()=>{})}"
          >×</button>
        </div>
        <hv-field
          kind="combo"
          .label="${e.t("overlay.rule.entity")}"
          .helper="${e.t("overlay.rule.entity_helper")}"
          .options="${Eo(this._hass)}"
          .value="${o.entity}"
          @hv-change="${e=>n(t=>({...t,entity:Zo(e)}))}"
        ></hv-field>
        ${"state"===o.condition?B`<hv-field
              kind="combo"
              .label="${e.t("overlay.rule.state")}"
              .options="${Io(this._hass,r)}"
              .value="${o.state}"
              @hv-change="${e=>n(t=>({...t,state:Zo(e)}))}"
            ></hv-field>`:B`<div class="grid2">
              <hv-field
                kind="number"
                .label="${e.t("overlay.rule.above")}"
                .value="${o.above}"
                @hv-change="${e=>n(t=>({...t,above:Fo(e)}))}"
              ></hv-field>
              <hv-field
                kind="number"
                .label="${e.t("overlay.rule.below")}"
                .value="${o.below}"
                @hv-change="${e=>n(t=>({...t,below:Fo(e)}))}"
              ></hv-field>
            </div>`}
        <hv-field
          kind="combo"
          .label="${e.t("overlay.rule.color")}"
          .helper="${e.t("overlay.rule.color_helper")}"
          .options="${Bo.map(e=>({value:e}))}"
          .value="${o.effect.color}"
          @hv-change="${e=>n(t=>({...t,effect:{...t.effect,color:Zo(e)}}))}"
        ></hv-field>
        <hv-field
          kind="boolean"
          .label="${e.t("overlay.rule.hide")}"
          .value="${!1===o.effect.visible}"
          @hv-change="${e=>n(t=>({...t,effect:{...t.effect,visible:!e.detail.value&&void 0}}))}"
        ></hv-field>
      </div>
    `}_nodeName(e,t){return t.name||e.t(`devices.${t.type}.name`)}_addonName(e,t,o,i){if(o.name)return o.name;const n=e.t(`addons.${o.type}.name`);if(o.slot)return`${n} – ${e.t(`slots.${o.slot}`)}`;const r=(t.addons??[]).filter(e=>e.type===o.type);if(r.length<2)return n;const s=(t.addons??[]).slice(0,i+1).filter(e=>e.type===o.type).length;return`${n} ${s}`}_addonSummary(e,t){return oo[t.type].entityless?e.t(`addons.${t.type}.hint`):t.entity_id?Mo(this._hass,t.entity_id)??t.entity_id:e.t("editor.no_entity")}_portRefLabel(e,t,o){const i=t.nodes.find(e=>e.id===o.nodeId),n=no(t,o),r=n?e.t(n.labelKey,...n.labelArgs??[]):o.portId;return i?`${this._nodeName(e,i)} › ${r}`:_e(o)}_openList(){this._view={kind:"list"}}_openNode(e){this._view={kind:"node",nodeId:e},this._selectedNodeId=e,this._selectedEdgeId=void 0}_openAddon(e,t){this._view={kind:"addon",nodeId:e,index:t}}_update(e){if(!this._config)return;const t=structuredClone(be(this._config));e(t);const o=JSON.parse(JSON.stringify({...this._config,...t,schema_version:2}));this._config=o,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:o},bubbles:!0,composed:!0}))}_patchNode(e,t){this._update(o=>{const i=o.nodes.find(t=>t.id===e);i&&Object.assign(i,t)})}_moveNode(e,t){this._update(o=>{const i=o.nodes.find(t=>t.id===e);i&&(i.position={x:t.x??i.position.x,y:t.y??i.position.y})})}_rotateNode(e){this._update(t=>{const o=t.nodes.find(t=>t.id===e);o&&(o.rotation=ft((o.rotation??0)+90)||void 0)})}_addDevice(e,t){if(!it(e))return;const o=ge(e);this._update(i=>{const n=i.nodes.length,r={id:o,type:e,name:Po(this._hass,t),entity_id:t,position:{x:Ro+n%Ko*jo,y:Uo+Math.floor(n/Ko)*Do}};e===Le.type&&(r.addons=Array.from({length:4},()=>({type:"loop"}))),i.nodes.push(r)}),this._entityToAdd=void 0,this._entityDeviceType=void 0,this._openNode(o)}_insertTemplate(){const e=bo.find(e=>e.id===this._templateId);e&&this._update(t=>{const o=go(e,t,e=>ge(e));t.nodes.push(...o.nodes),t.connections.push(...o.connections)})}_addAddons(e,t){this._update(o=>{const i=o.nodes.find(t=>t.id===e);i&&(i.addons=[...i.addons??[],...t])})}_deleteNode(e){this._update(t=>{t.nodes=t.nodes.filter(t=>t.id!==e),t.connections=t.connections.filter(t=>me(t.from)?.nodeId!==e&&me(t.to)?.nodeId!==e)}),this._selectedNodeId=void 0,this._pendingPort=void 0,this._openList()}_remaining(e,t){const o=(e.addons??[]).filter(e=>e.type===t.type).length;return io(t)-o}_addAddon(e,t){let o=-1;this._update(i=>{const n=i.nodes.find(t=>t.id===e),r=n&&it(n.type)?.addons?.find(e=>e.type===t);if(!n||!r||this._remaining(n,r)<=0)return;const s=new Set((n.addons??[]).filter(e=>e.type===t).map(e=>e.slot)),a={type:t,slot:r.slots?.find(e=>!s.has(e))};n.addons=[...n.addons??[],a],o=n.addons.length-1}),o>=0&&!oo[t].entityless&&this._openAddon(e,o)}_patchAddon(e,t,o){this._update(i=>{const n=i.nodes.find(t=>t.id===e)?.addons?.[t];n&&Object.assign(n,o)})}_removeAddon(e,t){this._update(o=>{const i=o.nodes.find(t=>t.id===e),n=i?.addons?.[t];if(i?.addons&&n){if("loop"===n.type){const n=i.addons.slice(0,t+1).filter(e=>"loop"===e.type).length;o.connections=function(e,t,o){const i=e=>{const i=me(e),n=i?.nodeId===t?lo.exec(i.portId):null;if(!i||!n)return e;const r=Number(n[1]);return r!==o?r<o?e:_e({nodeId:t,portId:`loop_${r-1}_${n[2]}`}):void 0},n=[];for(const t of e.connections){const e=i(t.from),o=i(t.to);e&&o&&n.push({from:e,to:o})}return n}(o,e,n)}i.addons=i.addons.filter((e,o)=>o!==t),i.addons.length||(i.addons=void 0),o.connections=function(e,t){const o=e.nodes.find(e=>e.id===t),i=new Set(o?(nt(o)?.ports??[]).map(e=>e.id):[]);return e.connections.filter(e=>[e.from,e.to].every(e=>{const o=me(e);return!o||o.nodeId!==t||i.has(o.portId)}))}(o,e)}}),this._openNode(e)}_connect(e,t){this._update(o=>{const i=ro(o,e,t);i&&!so(o,i)&&o.connections.push(i)})}_removeConnections(e){const t=new Set(e.map($e));this._update(e=>{e.connections=e.connections.filter(e=>!t.has($e(e)))})}_deleteSelectedConnection(){const e=this._selectedEdgeId;e&&(this._update(t=>{t.connections=t.connections.filter(t=>$e(t)!==e)}),this._selectedEdgeId=void 0)}_addOverlay(){this._update(e=>{e.overlays.push({id:ge("ov"),position:{x:40,y:40+30*e.overlays.length},entity_id:"",template:"{{ state }}"})})}_removeOverlay(e){this._update(t=>{t.overlays=t.overlays.filter(t=>t.id!==e)})}_patchOverlay(e,t){this._update(o=>{const i=o.overlays.find(t=>t.id===e);i&&Object.assign(i,t)})}_addRule(e){this._update(t=>{const o=t.overlays.find(t=>t.id===e.id);o&&(o.rules=[...o.rules??[],{condition:"state",effect:{}}])})}_updateRule(e,t,o){this._update(i=>{const n=i.overlays.find(t=>t.id===e),r=n?.rules?.[t];if(!n?.rules||!r)return;const s=o(r);n.rules=s?n.rules.map((e,o)=>o===t?s:e):n.rules.filter((e,o)=>o!==t),n.rules.length||(n.rules=void 0)})}_onNodeSelect(e){const{nodeId:t}=e.detail;this._selectedEdgeId=void 0,"list"!==this._view.kind&&t?t!==this._view.nodeId&&this._openNode(t):this._selectedNodeId=t}_onEdgeSelect(e){this._selectedEdgeId=e.detail.edgeId,this._pendingPort=void 0}_onNodeMove(e){this._moveNode(e.detail.nodeId,e.detail.position)}_onPortClick(e){const t={nodeId:e.detail.nodeId,portId:e.detail.portId},o=this._pendingPort;o?(this._pendingPort=void 0,o.nodeId===t.nodeId&&o.portId===t.portId||this._connect(o,t)):this._pendingPort=t}};qo.styles=s`
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
  `,e([ye()],qo.prototype,"_hass",void 0),e([ye()],qo.prototype,"_config",void 0),e([ye()],qo.prototype,"_tab",void 0),e([ye()],qo.prototype,"_view",void 0),e([ye()],qo.prototype,"_selectedNodeId",void 0),e([ye()],qo.prototype,"_selectedEdgeId",void 0),e([ye()],qo.prototype,"_pendingPort",void 0),e([ye()],qo.prototype,"_newDeviceType",void 0),e([ye()],qo.prototype,"_newAddonType",void 0),e([ye()],qo.prototype,"_entityToAdd",void 0),e([ye()],qo.prototype,"_entityDeviceType",void 0),e([ye()],qo.prototype,"_templateId",void 0),qo=e([pe("heating-visualizer-editor")],qo);let Wo=class extends le{constructor(){super(...arguments),this._i18n=new $t(this,mt)}setConfig(e){if(!e||"object"!=typeof e)throw new Error("Invalid card configuration");this._config=lt(e)}getCardSize(){return 6}getGridOptions(){return{columns:12,min_columns:6}}static getConfigElement(){return document.createElement("heating-visualizer-editor")}static getStubConfig(){return{schema_version:2,...fe}}render(){if(!this._config)return B``;const e=be(this._config),t=vt(this._i18n.value?.language);return B`
      <ha-card>
        ${e.nodes.length||e.overlays.length?B`
            <heating-schema-canvas
              .schema="${e}"
              .editable="${!1}"
            ></heating-schema-canvas>
          `:B`<div class="empty">${t.t("card.empty")}</div>`}
      </ha-card>
    `}};Wo.styles=s`
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
  `,e([ye()],Wo.prototype,"_config",void 0),Wo=e([pe("heating-visualizer-card")],Wo),window.customCards=window.customCards??[],window.customCards.push({type:"heating-visualizer-card",name:"Heating Visualizer",description:"Design and visualize heating system schemas with live sensor overlays.",preview:!0,documentationURL:"https://github.com/vasicekmilan90-eng/heating_vizualizer"}),console.info("%c HEATING-VISUALIZER-CARD %c v0.3.1 ","color: white; background: #039be5; font-weight: bold;","color: #039be5; background: white; font-weight: bold;");export{Wo as HeatingVisualizerCard};
//# sourceMappingURL=heating-visualizer-card.js.map
