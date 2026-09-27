function e(e,t,i,o){var n,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),n=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(t,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new r(i,e,o)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,o))(t)})(e):e,{is:d,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,v=globalThis,y=v.trustedTypes,_=y?y.emptyScript:"",m=v.reactiveElementPolyfillSupport,$=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},g=(e,t)=>!d(e,t),b={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:g};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&l(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:n}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const r=o?.call(this);n?.call(this,t),this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const e=this.properties,t=[...p(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,o)=>{if(i)e.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of o){const o=document.createElement("style"),n=t.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=i.cssText,e.appendChild(o)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(t,i.type);this._$Em=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=i.getPropertyOptions(o),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=o;const r=n.fromAttribute(t,e.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(e,t,i,o=!1,n){if(void 0!==e){const r=this.constructor;if(!1===o&&(n=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??g)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:n},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),!0!==n||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[$("elementProperties")]=new Map,x[$("finalized")]=new Map,m?.({ReactiveElement:x}),(v.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,w=e=>e,A=k.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,I=`<${P}>`,M=document,N=()=>M.createComment(""),L=e=>null===e||"object"!=typeof e&&"function"!=typeof e,z=Array.isArray,O="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,K=/-->/g,j=/>/g,T=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,U=/"/g,D=/^(?:script|style|textarea|title)$/i,V=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),B=V(1),Z=V(2),q=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),W=new WeakMap,J=M.createTreeWalker(M,129);function Y(e,t){if(!z(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const G=(e,t)=>{const i=e.length-1,o=[];let n,r=2===t?"<svg>":3===t?"<math>":"",s=H;for(let t=0;t<i;t++){const i=e[t];let a,d,l=-1,c=0;for(;c<i.length&&(s.lastIndex=c,d=s.exec(i),null!==d);)c=s.lastIndex,s===H?"!--"===d[1]?s=K:void 0!==d[1]?s=j:void 0!==d[2]?(D.test(d[2])&&(n=RegExp("</"+d[2],"g")),s=T):void 0!==d[3]&&(s=T):s===T?">"===d[0]?(s=n??H,l=-1):void 0===d[1]?l=-2:(l=s.lastIndex-d[2].length,a=d[1],s=void 0===d[3]?T:'"'===d[3]?U:R):s===U||s===R?s=T:s===K||s===j?s=H:(s=T,n=void 0);const p=s===T&&e[t+1].startsWith("/>")?" ":"";r+=s===H?i+I:l>=0?(o.push(a),i.slice(0,l)+E+i.slice(l)+C+p):i+C+(-2===l?t:p)}return[Y(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class X{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let n=0,r=0;const s=e.length-1,a=this.parts,[d,l]=G(e,t);if(this.el=X.createElement(d,i),J.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=J.nextNode())&&a.length<s;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(E)){const t=l[r++],i=o.getAttribute(e).split(C),s=/([.?@])?(.*)/.exec(t);a.push({type:1,index:n,name:s[2],strings:i,ctor:"."===s[1]?oe:"?"===s[1]?ne:"@"===s[1]?re:ie}),o.removeAttribute(e)}else e.startsWith(C)&&(a.push({type:6,index:n}),o.removeAttribute(e));if(D.test(o.tagName)){const e=o.textContent.split(C),t=e.length-1;if(t>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],N()),J.nextNode(),a.push({type:2,index:++n});o.append(e[t],N())}}}else if(8===o.nodeType)if(o.data===P)a.push({type:2,index:n});else{let e=-1;for(;-1!==(e=o.data.indexOf(C,e+1));)a.push({type:7,index:n}),e+=C.length-1}n++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,o){if(t===q)return t;let n=void 0!==o?i._$Co?.[o]:i._$Cl;const r=L(t)?void 0:t._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(e),n._$AT(e,i,o)),void 0!==o?(i._$Co??=[])[o]=n:i._$Cl=n),void 0!==n&&(t=Q(e,n._$AS(e,t.values),n,o)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??M).importNode(t,!0);J.currentNode=o;let n=J.nextNode(),r=0,s=0,a=i[0];for(;void 0!==a;){if(r===a.index){let t;2===a.type?t=new te(n,n.nextSibling,this,e):1===a.type?t=new a.ctor(n,a.name,a.strings,this,e):6===a.type&&(t=new se(n,this,e)),this._$AV.push(t),a=i[++s]}r!==a?.index&&(n=J.nextNode(),r++)}return J.currentNode=M,o}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),L(e)?e===F||null==e||""===e?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>z(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=X.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new ee(o,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new X(e)),t}k(e){z(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const n of e)o===t.length?t.push(i=new te(this.O(N()),this.O(N()),this,this.options)):i=t[o],i._$AI(n),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=w(e).nextSibling;w(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,n){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(e,t=this,i,o){const n=this.strings;let r=!1;if(void 0===n)e=Q(this,e,t,0),r=!L(e)||e!==this._$AH&&e!==q,r&&(this._$AH=e);else{const o=e;let s,a;for(e=n[0],s=0;s<n.length-1;s++)a=Q(this,o[i+s],t,s),a===q&&(a=this._$AH[s]),r||=!L(a)||a!==this._$AH[s],a===F?e=F:e!==F&&(e+=(a??"")+n[s+1]),this._$AH[s]=a}r&&!o&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class oe extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}}class ne extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}}class re extends ie{constructor(e,t,i,o,n){super(e,t,i,o,n),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??F)===q)return;const i=this._$AH,o=e===F&&i!==F||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==F&&(i===F||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const ae=k.litHtmlPolyfillSupport;ae?.(X,te),(k.litHtmlVersions??=[]).push("3.3.3");const de=globalThis;class le extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const o=i?.renderBefore??t;let n=o._$litPart$;if(void 0===n){const e=i?.renderBefore??null;o._$litPart$=n=new te(t.insertBefore(N(),e),e,void 0,i??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}le._$litElement$=!0,le.finalized=!0,de.litElementHydrateSupport?.({LitElement:le});const ce=de.litElementPolyfillSupport;ce?.({LitElement:le}),(de.litElementVersions??=[]).push("4.2.2");const pe=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:g},ue=(e=he,t,i)=>{const{kind:o,metadata:n}=i;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===o){const{name:o}=i;return{set(i){const n=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,n,e,!0,i)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=i;return function(i){const n=this[o];t.call(this,i),this.requestUpdate(o,n,e,!0,i)}}throw Error("Unsupported decorator location: "+o)};function ve(e){return(t,i)=>"object"==typeof i?ue(e,t,i):((e,t,i)=>{const o=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),o?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ye(e){return ve({...e,state:!0,attribute:!1})}function _e(e){return`${e.nodeId}.${e.portId}`}function me(e){const t=e.lastIndexOf(".");if(!(t<=0||t===e.length-1))return{nodeId:e.slice(0,t),portId:e.slice(t+1)}}function $e(e){return`${e.from}>${e.to}`}const fe={nodes:[],connections:[],overlays:[]};function ge(e){return{nodes:e.nodes??[],connections:e.connections??[],overlays:e.overlays??[]}}function be(e){return"undefined"!=typeof crypto&&"function"==typeof crypto.randomUUID?`${e}_${crypto.randomUUID().slice(0,8)}`:`${e}_${Math.random().toString(36).slice(2,10)}`}const xe=["top","upper","middle","lower","bottom"],ke=["top","middle","bottom"],we={type:"alarm",max:1},Ae={type:"mode",max:1},Se={type:"setpoint",max:1},Ee=e=>({type:"value",max:e}),Ce=(...e)=>({type:"temperature",max:e.length,slots:e});function Pe(e,t){return e.addons?.some(e=>e.type===t)??!1}const Ie={type:"valve_3way",labelKey:"devices.valve_3way.name",width:100,height:100,ports:[{id:"in",labelKey:"devices.valve_3way.ports.in",kind:"inlet",position:{x:0,y:50}},{id:"out_a",labelKey:"devices.valve_3way.ports.out_a",kind:"outlet",position:{x:100,y:25}},{id:"out_b",labelKey:"devices.valve_3way.ports.out_b",kind:"outlet",position:{x:100,y:75}}],addons:[Ee(1),we]},Me={type:"boiler",labelKey:"devices.boiler.name",width:100,height:140,ports:[{id:"coil_in",labelKey:"devices.boiler.ports.coil_in",kind:"inlet",position:{x:0,y:50}},{id:"coil_out",labelKey:"devices.boiler.ports.coil_out",kind:"outlet",position:{x:0,y:100}},{id:"hot_out",labelKey:"devices.boiler.ports.hot_out",kind:"outlet",position:{x:100,y:30}},{id:"cold_in",labelKey:"devices.boiler.ports.cold_in",kind:"inlet",position:{x:100,y:118}}],addons:[Ce(...ke),Ee(2),{type:"electric_heater",max:2},{type:"pump",max:1},Ae,Se,we,{type:"heat_exchanger",max:1}],resolve:e=>Pe(e,"heat_exchanger")?{...Me,height:180,ports:[...Me.ports.map(e=>"cold_in"===e.id?{...e,position:{x:100,y:158}}:e),{id:"coil2_in",labelKey:"devices.boiler.ports.coil2_in",kind:"inlet",position:{x:0,y:122}},{id:"coil2_out",labelKey:"devices.boiler.ports.coil2_out",kind:"outlet",position:{x:0,y:160}}]}:Me},Ne={type:"circulation_pump",labelKey:"devices.circulation_pump.name",width:90,height:90,ports:[{id:"in",labelKey:"devices.circulation_pump.ports.in",kind:"inlet",position:{x:0,y:45}},{id:"out",labelKey:"devices.circulation_pump.ports.out",kind:"outlet",position:{x:90,y:45}}],addons:[Ee(3),Ae,we]},Le={type:"floor_heating",labelKey:"devices.floor_heating.name",width:140,height:90,ports:[{id:"in",labelKey:"devices.floor_heating.ports.in",kind:"inlet",position:{x:0,y:45}},{id:"out",labelKey:"devices.floor_heating.ports.out",kind:"outlet",position:{x:140,y:45}}],addons:[Ce("room","floor"),{type:"actuator",max:1},Se,{type:"window",max:1}]};const ze={type:"manifold",labelKey:"devices.manifold.name",width:184,height:130,ports:[{id:"supply_in",labelKey:"devices.manifold.ports.supply_in",kind:"inlet",position:{x:0,y:30}},{id:"return_out",labelKey:"devices.manifold.ports.return_out",kind:"outlet",position:{x:0,y:100}}],addons:[{type:"loop",max:12},Ce("supply","return"),Ee(2),{type:"pump",max:1}],resolve:e=>function(e){const t=[];for(let i=0;i<e;i++){const e=50+36*i,o=String(i+1);t.push({id:`loop_${o}_out`,labelKey:"devices.manifold.ports.loop_out",labelArgs:[o],kind:"outlet",position:{x:e,y:0}},{id:`loop_${o}_in`,labelKey:"devices.manifold.ports.loop_in",labelArgs:[o],kind:"inlet",position:{x:e,y:130}})}return{...ze,width:50+36*e-10,ports:[...ze.ports,...t]}}(Math.max(1,e.addons?.filter(e=>"loop"===e.type).length??0))},Oe={type:"buffer_tank",labelKey:"devices.buffer_tank.name",width:100,height:186,ports:[{id:"source_in",labelKey:"devices.buffer_tank.ports.source_in",kind:"inlet",position:{x:0,y:40}},{id:"source_out",labelKey:"devices.buffer_tank.ports.source_out",kind:"outlet",position:{x:0,y:150}},{id:"supply_out",labelKey:"devices.buffer_tank.ports.supply_out",kind:"outlet",position:{x:100,y:40}},{id:"return_in",labelKey:"devices.buffer_tank.ports.return_in",kind:"inlet",position:{x:100,y:150}}],addons:[Ce(...xe),Ee(2),{type:"electric_heater",max:2},we,{type:"heat_exchanger",max:1}],resolve:e=>Pe(e,"heat_exchanger")?{...Oe,ports:[...Oe.ports,{id:"coil_in",labelKey:"devices.buffer_tank.ports.coil_in",kind:"inlet",position:{x:0,y:80}},{id:"coil_out",labelKey:"devices.buffer_tank.ports.coil_out",kind:"outlet",position:{x:0,y:118}}]}:Oe},He={type:"mixing_valve",labelKey:"devices.mixing_valve.name",width:100,height:110,ports:[{id:"hot_in",labelKey:"devices.mixing_valve.ports.hot_in",kind:"inlet",position:{x:0,y:70}},{id:"return_in",labelKey:"devices.mixing_valve.ports.return_in",kind:"inlet",position:{x:50,y:110}},{id:"mixed_out",labelKey:"devices.mixing_valve.ports.mixed_out",kind:"outlet",position:{x:100,y:70}}],addons:[Ce("mixed","return"),Ee(1),Se,we]},Ke={type:"electric_heater",labelKey:"devices.electric_heater.name",width:120,height:60,ports:[{id:"in",labelKey:"devices.electric_heater.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out",labelKey:"devices.electric_heater.ports.out",kind:"outlet",position:{x:120,y:30}}],addons:[Ce("inlet","outlet"),Ee(2),Ae,we]},je={type:"heat_pump",labelKey:"devices.heat_pump.name",width:170,height:120,ports:[{id:"hot_out",labelKey:"devices.heat_pump.ports.hot_out",kind:"outlet",position:{x:170,y:40}},{id:"cold_in",labelKey:"devices.heat_pump.ports.cold_in",kind:"inlet",position:{x:170,y:90}}],addons:[Ce("supply","return","outdoor","evaporator"),Ee(6),{type:"electric_heater",max:3},{type:"pump",max:1},{type:"fan",max:1},Ae,Se,{type:"defrost",max:1},we]};const Te={type:Re="pipe_sensor",labelKey:`devices.${Re}.name`,width:80,height:44,ports:[{id:"in",labelKey:"devices.inline.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out",labelKey:"devices.inline.ports.out",kind:"outlet",position:{x:80,y:30}}],valueDisplay:"only"};var Re;const Ue={type:"outdoor_temperature",labelKey:"devices.outdoor_temperature.name",width:100,height:50,valueDisplay:"only",ports:[],addons:[Ee(1)]};const De={...function(e){return{type:e,labelKey:`devices.${e}.name`,width:100,height:130,valueDisplay:"with_state",ports:[{id:"supply_out",labelKey:"devices.heat_source.ports.supply_out",kind:"outlet",position:{x:100,y:35}},{id:"return_in",labelKey:"devices.heat_source.ports.return_in",kind:"inlet",position:{x:100,y:105}}]}}("heating_boiler"),addons:[Ce("supply","return"),Ee(4),{type:"pump",max:1},Ae,Se,we]},Ve={type:"solar_collector",labelKey:"devices.solar_collector.name",width:150,height:100,valueDisplay:"with_state",ports:[{id:"hot_out",labelKey:"devices.solar_collector.ports.hot_out",kind:"outlet",position:{x:150,y:22}},{id:"cold_in",labelKey:"devices.solar_collector.ports.cold_in",kind:"inlet",position:{x:150,y:84}}],addons:[Ce("collector"),Ee(2),{type:"pump",max:1},we]};function Be(e,t,i){const o=(e,t,i,o)=>({id:e,labelKey:`devices.four_port.ports.${e}`,kind:t,position:{x:i,y:o}});return{type:e,labelKey:`devices.${e}.name`,width:t,height:i,ports:[o("primary_in","inlet",0,30),o("primary_out","outlet",0,i-30),o("secondary_out","outlet",t,30),o("secondary_in","inlet",t,i-30)]}}const Ze=Ce("primary_supply","primary_return","secondary_supply","secondary_return"),qe={...Be("hydraulic_separator",80,160),valueDisplay:"only",addons:[Ze,Ee(2)]},Fe={...Be("plate_heat_exchanger",100,120),addons:[Ze,Ee(2)]},We={type:"expansion_vessel",labelKey:"devices.expansion_vessel.name",width:70,height:110,valueDisplay:"only",ports:[{id:"connection",labelKey:"devices.expansion_vessel.ports.connection",kind:"inlet",position:{x:35,y:110}}],addons:[Ee(1),we]},Je={type:"safety_valve",labelKey:"devices.safety_valve.name",width:70,height:90,ports:[{id:"in",labelKey:"devices.safety_valve.ports.in",kind:"inlet",position:{x:30,y:90}},{id:"discharge",labelKey:"devices.safety_valve.ports.discharge",kind:"outlet",position:{x:70,y:56}}],addons:[we]},Ye={type:"zone_valve",labelKey:"devices.zone_valve.name",width:80,height:70,ports:[{id:"in",labelKey:"devices.inline.ports.in",kind:"inlet",position:{x:0,y:50}},{id:"out",labelKey:"devices.inline.ports.out",kind:"outlet",position:{x:80,y:50}}],addons:[Ce("room"),we]};function Ge(e){return{type:e,labelKey:`devices.${e}.name`,width:130,height:80,valueDisplay:"with_state",ports:[{id:"in",labelKey:"devices.terminal.ports.in",kind:"inlet",position:{x:0,y:66}},{id:"out",labelKey:"devices.terminal.ports.out",kind:"outlet",position:{x:130,y:66}}]}}const Xe={...Ge("radiator"),addons:[Ce("room"),{type:"actuator",max:1},Se,we,{type:"window",max:1}]},Qe={...Ge("fancoil"),addons:[Ce("room","supply"),{type:"actuator",max:1},{type:"fan",max:1},Ae,Se,we]},et=[je,De,Ve,Me,Oe,qe,Fe,We,Je,Ie,He,Ye,Ne,ze,Le,Xe,Qe,Ke,{type:"junction",labelKey:"devices.junction.name",width:60,height:60,ports:[{id:"in",labelKey:"devices.junction.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out_top",labelKey:"devices.junction.ports.out_top",kind:"outlet",position:{x:60,y:15}},{id:"out_bottom",labelKey:"devices.junction.ports.out_bottom",kind:"outlet",position:{x:60,y:45}}]},Te,Ue],tt=et.map(e=>e.type),it=new Map(et.map(e=>[e.type,e]));function ot(e){return it.get(e)}function nt(e){const t=it.get(e.type);return t?.resolve?t.resolve(e):t}const rt="custom:heating-visualizer-card",st={outdoor_unit:"heat_pump",gas_boiler:"heating_boiler",electric_boiler:"heating_boiler",solid_fuel_boiler:"heating_boiler",flow_meter:"pipe_sensor",pressure_gauge:"pipe_sensor",heat_meter:"pipe_sensor",dhw_circulation_pump:"circulation_pump"},at={1:["middle"],2:["top","bottom"],3:["top","middle","bottom"],4:["top","upper","lower","bottom"],5:[...xe]};function dt(e){const t=st[e.type]??e.type,i=[];return e.channels?.length&&i.push(...function(e,t){if("manifold"===e)return t.map(e=>({...e,type:"loop"}));const i=t.filter(e=>e.entity_id);if("buffer_tank"===e){const e=at[Math.min(i.length,5)]??[];return i.slice(0,5).map((t,i)=>({...t,type:"temperature",slot:e[i]}))}if("boiler"===e){const e=[ke[0],ke[2]];return i.slice(0,2).map((t,i)=>({...t,type:"temperature",slot:e[i]}))}return i.map(e=>({...e,type:"value"}))}(t,e.channels)),"manifold"!==t||e.channels?.length||i.push(...Array.from({length:4},()=>({type:"loop"}))),e.heater?.entity_id&&i.push({...e.heater,type:"electric_heater"}),{id:e.id,type:t,name:e.name,position:e.position??{x:0,y:0},rotation:e.rotation,...e.state,addons:i.length?i:void 0}}function lt(e){const t=e,i=("number"==typeof t.schema_version?t.schema_version:t.schema?1:2)<2?function(e){const{schema:t,language:i,translations:o,...n}=e,r=(t?.edges??[]).map(e=>({from:`${e.from.nodeId}.${e.from.portId}`,to:`${e.to.nodeId}.${e.to.portId}`})),s=(t?.overlays??[]).map(({labelKey:e,...t})=>t);return{...n,type:rt,schema_version:2,nodes:(t?.nodes??[]).map(dt),connections:r,overlays:s}}(t):{...t};return{...i,type:"string"==typeof t.type?t.type:rt,schema_version:2,nodes:(i.nodes??[]).map(e=>st[e.type]?{...e,type:st[e.type]}:e),connections:i.connections??[],overlays:i.overlays??[]}}const ct="en",pt={en:{devices:{heat_pump:{name:"Heat pump",ports:{cold_in:"Heating water return",hot_out:"Heating water out"}},valve_3way:{name:"3-way valve",ports:{in:"Inlet",out_a:"Outlet A",out_b:"Outlet B"}},boiler:{name:"DHW tank",ports:{cold_in:"Cold water inlet",hot_out:"Hot water outlet",coil_in:"Heat exchanger supply",coil_out:"Heat exchanger return",coil2_in:"Second heat exchanger supply",coil2_out:"Second heat exchanger return"}},junction:{name:"Junction",ports:{in:"Inlet",out_top:"Top outlet",out_bottom:"Bottom outlet"}},circulation_pump:{name:"Circulation pump",ports:{in:"Inlet",out:"Outlet"}},floor_heating:{name:"Floor heating",ports:{in:"Supply",out:"Return"}},manifold:{name:"Floor heating manifold",ports:{supply_in:"Supply",return_out:"Return",loop_out:"Loop {0} supply",loop_in:"Loop {0} return"}},buffer_tank:{name:"Buffer tank",ports:{source_in:"From heat source",source_out:"Back to heat source",supply_out:"To heating system",return_in:"Return from heating system",coil_in:"Heat exchanger supply",coil_out:"Heat exchanger return"}},mixing_valve:{name:"Mixing valve",ports:{hot_in:"Hot branch",return_in:"Return (bypass)",mixed_out:"Mixed water"}},electric_heater:{name:"Electric flow heater",ports:{in:"Inlet",out:"Outlet"}},inline:{ports:{in:"Inlet",out:"Outlet"}},pipe_sensor:{name:"Sensor / meter"},heat_source:{ports:{supply_out:"Supply",return_in:"Return"}},heating_boiler:{name:"Heating boiler"},solar_collector:{name:"Solar collector",ports:{hot_out:"Hot outlet",cold_in:"Cold inlet"}},four_port:{ports:{primary_in:"Primary supply",primary_out:"Primary return",secondary_out:"Secondary supply",secondary_in:"Secondary return"}},hydraulic_separator:{name:"Hydraulic separator"},plate_heat_exchanger:{name:"Plate heat exchanger"},expansion_vessel:{name:"Expansion vessel",ports:{connection:"Connection"}},safety_valve:{name:"Safety valve",ports:{in:"Inlet",discharge:"Discharge"}},zone_valve:{name:"Zone valve"},terminal:{ports:{in:"Supply",out:"Return"}},radiator:{name:"Radiator"},fancoil:{name:"Fan coil / convector"},outdoor_temperature:{name:"Outdoor temperature"}},addons:{temperature:{name:"Temperature sensor"},value:{name:"Value"},electric_heater:{name:"Electric heater"},pump:{name:"Pump"},actuator:{name:"Actuator"},fan:{name:"Fan"},mode:{name:"Operating mode"},setpoint:{name:"Setpoint"},defrost:{name:"Defrost"},alarm:{name:"Alarm"},window:{name:"Window"},heat_exchanger:{name:"Heat exchanger",hint:"Adds the heat exchanger and its connections to the drawing."},loop:{name:"Loop"}},slots:{top:"top",upper:"upper",middle:"middle",lower:"lower",bottom:"bottom",supply:"supply",return:"return",outdoor:"outdoor",evaporator:"evaporator",room:"room",floor:"floor",mixed:"mixed water",inlet:"inlet",outlet:"outlet",collector:"collector",primary_supply:"primary supply",primary_return:"primary return",secondary_supply:"secondary supply",secondary_return:"secondary return"},editor:{schema_tab:"Schema",overlay_tab:"Overlays",device_type:"Device type",add_device:"Add device",empty_hint:"Add a device to start building your schema.",devices_title:"Devices",no_entity:"No entity",ports_connected:"{0}/{1} connected",addon_count:"{0} add-ons",back:"Back",name:"Name",name_helper:"Empty = device type name",entity:"Entity",active_state:"Active state",active_state_helper:"Empty = hvac_action, otherwise on / heat / open",value_attribute:"Displayed attribute",value_attribute_helper:"Empty = entity state, e.g. current_temperature",actuator_entity:"Actuator entity",position_attribute:"Position attribute (%)",position_attribute_helper:"Empty = current_position or the entity state",valve_attribute:"Valve position attribute",valve_attribute_helper:"Default: position",branch_a:"Value for branch A",branch_a_helper:"Default: a",branch_b:"Value for branch B",branch_b_helper:"Default: b",loop_temperature:"Room temperature entity",addons_title:"Add-ons",addons_empty:"No add-ons yet.",addon_type:"Add-on type",add_addon:"Add add-on",remove_addon:"Remove add-on",remaining:"{0} left",slot:"Position",addon_name_helper:"Empty = add-on type and position",connections_title:"Connections",not_connected:"Not connected",connect_to:"Connect to",disconnect:"Disconnect",connection_pending:"Connecting from {0} — click a compatible port",delete_connection:"Delete selected connection",invalid_connections:"{0} connections point to missing or incompatible ports.",remove_invalid:"Remove",position_title:"Position",rotate:"Rotate",delete_device:"Delete device",add_overlay:"Add overlay",overlays_empty:"No overlays yet.",overlay_n:"Overlay {0}",remove_overlay:"Remove overlay"},overlay:{entity:"Entity",name:"Name",name_helper:"Empty = entity name",name_yaml:"The name is configured in YAML.",template:"Display template",template_helper:"Placeholders: {{ state }}, {{ attr('attribute') }}. Empty = formatted state",rules:"Conditional rules",add_rule:"Add rule",remove_rule:"Remove rule",rule:{condition:"Condition",condition_state:"State equals",condition_numeric:"Numeric value",entity:"Entity",entity_helper:"Empty = overlay entity",state:"State",above:"Above",below:"Below",color:"Text color",color_helper:"Home Assistant color name or any CSS color",hide:"Hide overlay"}},card:{empty:"No schema configured. Edit this card to design your heating layout."}},cs:{devices:{heat_pump:{name:"Tepelné čerpadlo",ports:{cold_in:"Vratka topné vody",hot_out:"Výstup topné vody"}},valve_3way:{name:"Třícestný ventil",ports:{in:"Vstup",out_a:"Výstup A",out_b:"Výstup B"}},boiler:{name:"Bojler",ports:{cold_in:"Studená voda – vstup",hot_out:"Teplá voda – výstup",coil_in:"Výměník – přívod od zdroje",coil_out:"Výměník – vratka ke zdroji",coil2_in:"Druhý výměník – přívod",coil2_out:"Druhý výměník – vratka"}},junction:{name:"Uzel",ports:{in:"Vstup",out_top:"Horní výstup",out_bottom:"Spodní výstup"}},circulation_pump:{name:"Oběhové čerpadlo",ports:{in:"Vstup",out:"Výstup"}},floor_heating:{name:"Podlahové topení",ports:{in:"Přívod",out:"Vratka"}},manifold:{name:"Rozdělovač podlahového topení",ports:{supply_in:"Přívod",return_out:"Vratka",loop_out:"Okruh {0} – přívod",loop_in:"Okruh {0} – vratka"}},buffer_tank:{name:"Akumulační nádrž",ports:{source_in:"Od zdroje tepla",source_out:"Zpět ke zdroji tepla",supply_out:"Do topného systému",return_in:"Vratka z topného systému",coil_in:"Výměník – přívod",coil_out:"Výměník – vratka"}},mixing_valve:{name:"Směšovací ventil",ports:{hot_in:"Teplá větev",return_in:"Vratka (bypass)",mixed_out:"Smíšená voda"}},electric_heater:{name:"Průtokový elektrický ohřívač",ports:{in:"Vstup",out:"Výstup"}},inline:{ports:{in:"Vstup",out:"Výstup"}},pipe_sensor:{name:"Čidlo / měřidlo"},heat_source:{ports:{supply_out:"Přívod",return_in:"Vratka"}},heating_boiler:{name:"Kotel"},solar_collector:{name:"Solární kolektor",ports:{hot_out:"Teplý výstup",cold_in:"Studený vstup"}},four_port:{ports:{primary_in:"Primár – přívod",primary_out:"Primár – vratka",secondary_out:"Sekundár – přívod",secondary_in:"Sekundár – vratka"}},hydraulic_separator:{name:"Hydraulický vyrovnávač"},plate_heat_exchanger:{name:"Deskový výměník"},expansion_vessel:{name:"Expanzní nádoba",ports:{connection:"Připojení"}},safety_valve:{name:"Pojistný ventil",ports:{in:"Vstup",discharge:"Výtok"}},zone_valve:{name:"Zónový ventil"},terminal:{ports:{in:"Přívod",out:"Vratka"}},radiator:{name:"Radiátor"},fancoil:{name:"Fancoil / konvektor"},outdoor_temperature:{name:"Venkovní teplota"}},addons:{temperature:{name:"Teplotní čidlo"},value:{name:"Hodnota"},electric_heater:{name:"Elektrická topná spirála"},pump:{name:"Čerpadlo"},actuator:{name:"Pohon"},fan:{name:"Ventilátor"},mode:{name:"Provozní režim"},setpoint:{name:"Požadovaná teplota"},defrost:{name:"Odmrazování"},alarm:{name:"Porucha"},window:{name:"Okno"},heat_exchanger:{name:"Výměník",hint:"Přidá do výkresu výměník a jeho připojení."},loop:{name:"Okruh"}},slots:{top:"nahoře",upper:"horní část",middle:"uprostřed",lower:"dolní část",bottom:"dole",supply:"přívod",return:"vratka",outdoor:"venkovní",evaporator:"výparník",room:"místnost",floor:"podlaha",mixed:"smíšená voda",inlet:"vstup",outlet:"výstup",collector:"kolektor",primary_supply:"primár – přívod",primary_return:"primár – vratka",secondary_supply:"sekundár – přívod",secondary_return:"sekundár – vratka"},editor:{schema_tab:"Schéma",overlay_tab:"Popisky",device_type:"Typ zařízení",add_device:"Přidat zařízení",empty_hint:"Přidejte zařízení a začněte sestavovat schéma.",devices_title:"Zařízení",no_entity:"Bez entity",ports_connected:"připojeno {0}/{1}",addon_count:"doplňky: {0}",back:"Zpět",name:"Název",name_helper:"Prázdné = název typu zařízení",entity:"Entita",active_state:"Aktivní stav",active_state_helper:"Prázdné = podle hvac_action, jinak on / heat / open",value_attribute:"Zobrazený atribut",value_attribute_helper:"Prázdné = stav entity, např. current_temperature",actuator_entity:"Entita pohonu",position_attribute:"Atribut polohy (%)",position_attribute_helper:"Prázdné = current_position nebo stav entity",valve_attribute:"Atribut polohy ventilu",valve_attribute_helper:"Výchozí: position",branch_a:"Hodnota pro větev A",branch_a_helper:"Výchozí: a",branch_b:"Hodnota pro větev B",branch_b_helper:"Výchozí: b",loop_temperature:"Entita teploty místnosti",addons_title:"Doplňky",addons_empty:"Zatím žádné doplňky.",addon_type:"Typ doplňku",add_addon:"Přidat doplněk",remove_addon:"Odebrat doplněk",remaining:"zbývá {0}",slot:"Umístění",addon_name_helper:"Prázdné = typ doplňku a umístění",connections_title:"Propojení",not_connected:"Nepřipojeno",connect_to:"Připojit k",disconnect:"Odpojit",connection_pending:"Napojování z {0} — klikněte na kompatibilní port",delete_connection:"Smazat vybrané propojení",invalid_connections:"Propojení s neexistujícím nebo nekompatibilním portem: {0}",remove_invalid:"Odstranit",position_title:"Poloha",rotate:"Otočit",delete_device:"Smazat zařízení",add_overlay:"Přidat popisek",overlays_empty:"Zatím žádné popisky.",overlay_n:"Popisek {0}",remove_overlay:"Odebrat popisek"},overlay:{entity:"Entita",name:"Název",name_helper:"Prázdné = název entity",name_yaml:"Název je nastaven v YAML.",template:"Šablona zobrazení",template_helper:"Zástupné symboly: {{ state }}, {{ attr('atribut') }}. Prázdné = formátovaný stav",rules:"Podmíněná pravidla",add_rule:"Přidat pravidlo",remove_rule:"Odebrat pravidlo",rule:{condition:"Podmínka",condition_state:"Stav je roven",condition_numeric:"Číselná hodnota",entity:"Entita",entity_helper:"Prázdné = entita popisku",state:"Stav",above:"Nad",below:"Pod",color:"Barva textu",color_helper:"Název barvy Home Assistantu nebo libovolná barva CSS",hide:"Skrýt popisek"}},card:{empty:"Schéma není nakonfigurováno. Upravte kartu a navrhněte topné schéma."}}};function ht(e,t){let i=e;for(const e of t.split(".")){if(void 0===i||"string"==typeof i)return;i=i[e]}return"string"==typeof i?i:void 0}class ut{constructor(e){this.language=e}t(e,...t){let i=ht(pt[this.language],e)??ht(pt[ct],e)??e;return t.forEach((e,t)=>{i=i.replace(`{${t}}`,e)}),i}}function vt(e){return new ut(function(e){if(!e)return ct;if(pt[e])return e;const t=e.split("-")[0];return pt[t]?t:ct}(e))}const yt="states",_t="hassFormatters",mt="hassInternationalization";class $t{constructor(e,t){this._host=e,this._context=t,this._callback=(e,t)=>{this._unsubscribe&&this._unsubscribe!==t&&this._unsubscribe(),this._unsubscribe=t,e!==this.value&&(this.value=e,this._host.requestUpdate())},e.addController(this)}hostConnected(){const e=new Event("context-request",{bubbles:!0,composed:!0});e.context=this._context,e.contextTarget=this._host,e.callback=this._callback,e.subscribe=!0,this._host.dispatchEvent(e)}hostDisconnected(){this._unsubscribe?.(),this._unsubscribe=void 0}}function ft(e){return((e??0)%360+360)%360}function gt(e,t){const i=t*Math.PI/180,o=Math.cos(i),n=Math.sin(i);return{x:Math.round(1e3*(e.x*o-e.y*n))/1e3||0,y:Math.round(1e3*(e.x*n+e.y*o))/1e3||0}}function bt(e,t){const{x:i,y:o}=t.position,n=[[i,{x:-1,y:0}],[e.width-i,{x:1,y:0}],[o,{x:0,y:-1}],[e.height-o,{x:0,y:1}]];return n.sort((e,t)=>e[0]-t[0]),n[0][1]}function xt(e,t){const i=nt(e);if(!i)return;const o=i.ports.find(e=>e.id===t);if(!o)return;const n=ft(e.rotation),r=i.width/2,s=i.height/2,a=gt({x:o.position.x-r,y:o.position.y-s},n);return{nodeId:e.id,portId:o.id,x:e.position.x+r+a.x,y:e.position.y+s+a.y,kind:o.kind,direction:gt(bt(i,o),n)}}function kt(e,t){const i=ft(e.rotation)%180!=0,o=i?t.height:t.width,n=i?t.width:t.height;return{x:e.position.x+(t.width-o)/2,y:e.position.y+(t.height-n)/2,width:o,height:n}}function wt(e,t=10){return Math.round(e/t)*t}function At(e,t,i){if(!e||!i.entity_id)return"—";const o=e[i.entity_id];if(!o)return"—";if(i.template)return function(e,t,i){return e.replace(/\{\{\s*state\s*\}\}/g,t).replace(/\{\{\s*attr\(['"](\w+)['"]\)\s*\}\}/g,(e,t)=>String(i[t]??""))}(i.template,o.state,o.attributes);if(t)return t.formatEntityState(o);const n=o.attributes.unit_of_measurement;return n?`${o.state} ${n}`:o.state}const St=new Set(["primary","accent","disabled","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"]);function Et(e){return St.has(e)?`var(--${e}-color)`:e}function Ct(e,t,i){const o=e[t.entity||i];if(!o)return!1;if("state"===t.condition)return void 0!==t.state&&o.state===t.state;if(void 0===t.above&&void 0===t.below)return!1;const n=Number(o.state);return!Number.isNaN(n)&&((void 0===t.above||n>t.above)&&(void 0===t.below||n<t.below))}const Pt=new Set(["heating","preheating"]);function It(e,t,i){if(!e||!t?.entity_id)return{active:!1};const o=e[t.entity_id];if(!o)return{active:!1};const n=t.value_attribute,r=void 0!==n?o.attributes[n]:void 0,s=void 0!==r,a=s?r:o.state,d=Number(a),l=o.attributes.unit_of_measurement;let c;c=void 0!==n&&s?i?i.formatEntityAttributeValue(o,n):String(r):i?i.formatEntityState(o):l?`${o.state} ${l}`:o.state;const p=function(e,t){if(void 0!==t)return e.state===t;const i=e.attributes.hvac_action;return"string"==typeof i?Pt.has(i):"on"===e.state||"heat"===e.state||"open"===e.state}(o,t.active_state),h=t.mode_attribute??"position",u=String(o.attributes[h]??o.state??"");let v;return u===(t.branch_a_value??"a")&&(v="a"),u===(t.branch_b_value??"b")&&(v="b"),{active:p,valveBranch:v,value:c,numeric:""!==String(a??"").trim()&&Number.isFinite(d)?d:void 0,position:Mt(o,t.mode_attribute),unit:l,fromAttribute:s,deviceClass:o.attributes.device_class}}function Mt(e,t){const i=t?e.attributes[t]:e.attributes.current_position??e.state,o=Number(i);if(null!=i&&""!==i&&Number.isFinite(o))return Math.min(100,Math.max(0,o))}function Nt(e,t){return(e.addons??[]).filter(e=>e.config.type===t).map(e=>e.state)}function Lt(e){const t=new Map;for(const i of e.addons??[])"temperature"===i.config.type&&i.config.slot&&t.set(i.config.slot,i.state);return t}function zt(e){const t=(e.addons??[]).filter(e=>"electric_heater"===e.config.type&&e.config.entity_id);if(t.length)return{active:t.some(e=>e.state.active)}}const Ot="#ef5350",Ht="#42a5f5",Kt="#4caf50",jt="#ff7043",Tt="var(--card-background-color, #1c1c1c)",Rt="var(--divider-color, #888)",Ut="var(--primary-color, #03a9f4)";function Dt(e){if(void 0===e)return Rt;const t=Math.min(1,Math.max(0,(e-20)/40));return`hsl(${Math.round(220*(1-t))}, 75%, 50%)`}function Vt(e,t,i=Kt){return e.active?i:t?Ut:Rt}function Bt(e){return e?2.5:1.5}function Zt(e,t){return e.ports.map(e=>Z`
    <circle
      class="port port-${e.kind}"
      data-port-id="${e.id}"
      cx="${e.position.x}" cy="${e.position.y}" r="5"
      fill="${Tt}"
      stroke="${"inlet"===e.kind?"#4fc3f7":"#ff8a65"}"
      stroke-width="2"
    ><title>${t.t(e.labelKey,...e.labelArgs??[])}</title></circle>
  `)}function qt(e,t,i,o){const n=i/6;let r=`M ${e} ${t}`;for(let i=1;i<=6;i++)r+=` L ${e+i*n} ${t+(i%2==0?0:-8)}`;const s=o.active?jt:Rt;return Z`
    <path class="heater ${o.active?"active":""}" d="${r}" fill="none"
      stroke="${s}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
  `}function Ft(e,t){return e.ports.map(i=>{const{x:o,y:n}=i.position,r=0===o?t:o===e.width?-t:0,s=0===n?t:n===e.height?-t:0;return Z`<line x1="${o}" y1="${n}" x2="${o+r}" y2="${n+s}" stroke="${Rt}" stroke-width="2" />`})}function Wt(e){return void 0!==e.numeric||e.fromAttribute?e.value:void 0}function Jt(e,t,i,o=!1){const n=i.value??"—",r=6.5*n.length+8,s=o&&void 0!==i.numeric?`fill: ${Dt(i.numeric)}`:"";return Z`
    <rect x="${e-r/2}" y="${t-11}" width="${r}" height="15" rx="3" fill="${Tt}" opacity="0.85" />
    <text x="${e}" y="${t}" text-anchor="middle" class="device-value" style="${s}">
      <title>${i.label??""}</title>${n}
    </text>
  `}const Yt="#ffb300";function Gt(e,t,i,o,n){switch(e){case"heating_boiler":return function(e,t,i,o){const n=e.width/2-4,r=e.height/2+14,s=Wt(o),a=o.active?jt:Rt,d=[-14,0,14].map(e=>{const t=n+e;return Z`
      <path d="M ${t} ${r+18} C ${t-6} ${r+10}, ${t+6} ${r+2}, ${t} ${r-6}
        C ${t-6} ${r-14}, ${t+6} ${r-20}, ${t} ${r-26}"
        fill="none" stroke="${a}" stroke-width="2.5" stroke-linecap="round" />
    `});return Z`
    <g class="device device-heat-source">
      ${Ft(e,12)}
      <rect x="8" y="10" width="${e.width-20}" height="${e.height-20}" rx="8"
        fill="${Tt}" stroke="${Vt(o,i,jt)}"
        stroke-width="${Bt(i)}" />
      ${s?Z`<text x="${n}" y="30" text-anchor="middle" class="device-value">${s}</text>`:Z``}
      ${d}
      ${Zt(e,t)}
    </g>
  `}(t,i,o,n);case"solar_collector":return function(e,t,i,o){const n=Vt(o,i,Yt),r=Wt(o);return Z`
    <g class="device device-solar-collector">
      <path d="M 124 22 L ${e.width} 22 M 100 84 L ${e.width} 84" stroke="${Rt}" stroke-width="2" />
      <path d="M 10 84 L 36 22 L 124 22 L 100 84 Z" fill="${Tt}"
        stroke="${n}" stroke-width="${Bt(i)}" stroke-linejoin="round" />
      <path d="M 58 22 L 32 84 M 80 22 L 54 84 M 102 22 L 76 84 M 23 53 L 112 53"
        stroke="${Rt}" stroke-width="1" />
      <circle cx="20" cy="14" r="6" fill="${o.active?Yt:"none"}" stroke="${Yt}" stroke-width="1.5" />
      ${r?Z`<text x="67" y="${e.height-2}" text-anchor="middle" class="device-value">${r}</text>`:Z``}
      ${Zt(e,t)}
    </g>
  `}(t,i,o,n);case"hydraulic_separator":return function(e,t,i,o){const n=25,r=e.width-25,s=e.height-8,a=e.height/2,d=Wt(o);return Z`
    <g class="device device-hydraulic-separator">
      ${Ft(e,n)}
      <rect x="${n}" y="${8}" width="${r-n}" height="${a-8}" fill="${Ot}" opacity="0.25" />
      <rect x="${n}" y="${a}" width="${r-n}" height="${s-a}" fill="${Ht}" opacity="0.25" />
      <rect x="${n}" y="${8}" width="${r-n}" height="${s-8}" rx="${(r-n)/2}"
        fill="none" stroke="${Vt(o,i)}" stroke-width="${Bt(i)}" />
      ${d?Z`<text x="${e.width/2}" y="${a+4}" text-anchor="middle" class="device-value">${d}</text>`:Z``}
      ${Zt(e,t)}
    </g>
  `}(t,i,o,n);case"plate_heat_exchanger":return function(e,t,i,o){const n=e.width-22,r=[];for(let t=29,i=0;t<n-3;t+=7,i++)r.push(Z`<line x1="${t}" y1="18" x2="${t}" y2="${e.height-18}"
      stroke="${i%2==0?Ot:Ht}" stroke-width="2" opacity="0.8" />`);return Z`
    <g class="device device-plate-heat-exchanger">
      ${Ft(e,22)}
      <rect x="${22}" y="10" width="${n-22}" height="${e.height-20}" rx="4"
        fill="${Tt}" stroke="${Vt(o,i)}" stroke-width="${Bt(i)}" />
      ${r}
      ${Zt(e,t)}
    </g>
  `}(t,i,o,n);case"expansion_vessel":return function(e,t,i,o){const n=e.width/2,r=47,s=Wt(o);return Z`
    <g class="device device-expansion-vessel">
      <line x1="${n}" y1="${86}" x2="${n}" y2="${e.height}" stroke="${Rt}" stroke-width="2" />
      <rect x="13" y="${r}" width="${e.width-26}" height="${31}" fill="${Ht}" opacity="0.2" />
      <rect x="12" y="${8}" width="${e.width-24}" height="${78}" rx="${(e.width-24)/2}"
        fill="none" stroke="${Vt(o,i)}" stroke-width="${Bt(i)}" />
      <path d="M 13 ${r} Q ${n} ${55} ${e.width-13} ${r}"
        fill="none" stroke="${Rt}" stroke-width="1.5" stroke-dasharray="3 2" />
      ${s?Z`<text x="${n}" y="${37}" text-anchor="middle" class="device-value">${s}</text>`:Z``}
      ${Zt(e,t)}
    </g>
  `}(t,i,o,n);case"safety_valve":return function(e,t,i,o){const n=Vt(o,i,Ot),r=Bt(i),s=30,a=56;return Z`
    <g class="device device-safety-valve">
      <line x1="${s}" y1="${70}" x2="${s}" y2="${e.height}" stroke="${Rt}" stroke-width="2" />
      <line x1="${44}" y1="${a}" x2="${e.width}" y2="${a}" stroke="${Rt}" stroke-width="2" />
      <path d="M ${18} ${70} L ${42} ${70} L ${s} ${a} Z M ${44} ${44} L ${44} ${68} L ${s} ${a} Z"
        fill="${o.active?Ot:Tt}" fill-opacity="${o.active?.5:1}"
        stroke="${n}" stroke-width="${r}" stroke-linejoin="round" />
      <path d="M ${s} ${a} L ${s} ${48} L ${23} ${44} L ${37} ${38} L ${23} ${32}
        L ${37} ${26} L ${23} ${20} L ${s} ${16}"
        fill="none" stroke="${n}" stroke-width="1.5" stroke-linejoin="round" />
      ${Zt(e,t)}
    </g>
  `}(t,i,o,n);case"zone_valve":return function(e,t,i,o){const n=Vt(o,i),r=Bt(i),s=e.width/2,a=50;return Z`
    <g class="device device-zone-valve">
      <line x1="0" y1="${a}" x2="${s-16}" y2="${a}" stroke="${Rt}" stroke-width="2" />
      <line x1="${s+16}" y1="${a}" x2="${e.width}" y2="${a}" stroke="${Rt}" stroke-width="2" />
      <path d="M ${s-16} ${39} L ${s} ${a} L ${s-16} ${61} Z M ${s+16} ${39} L ${s} ${a} L ${s+16} ${61} Z"
        fill="${o.active?Kt:Tt}" fill-opacity="${o.active?.45:1}"
        stroke="${n}" stroke-width="${r}" stroke-linejoin="round" />
      <line x1="${s}" y1="${a}" x2="${s}" y2="30" stroke="${n}" stroke-width="2" />
      <rect x="${s-12}" y="10" width="24" height="20" rx="3"
        fill="${o.active?Kt:Tt}" stroke="${n}" stroke-width="${r}" />
      ${Zt(e,t)}
    </g>
  `}(t,i,o,n);case"radiator":return function(e,t,i,o){const n=Wt(o),r=[];for(let t=26;t<=e.width-24;t+=10)r.push(Z`<line x1="${t}" y1="22" x2="${t}" y2="58" stroke="${Rt}" stroke-width="1.5" />`);return Z`
    <g class="device device-radiator">
      <path d="M 0 66 L 16 66 L 16 62 M ${e.width-16} 62 L ${e.width-16} 66 L ${e.width} 66"
        fill="none" stroke="${Rt}" stroke-width="2" />
      <rect x="16" y="16" width="${e.width-32}" height="46" rx="4"
        fill="${o.active?jt:Tt}" fill-opacity="${o.active?.2:1}"
        stroke="${Vt(o,i,jt)}" stroke-width="${Bt(i)}" />
      ${r}
      <rect x="4" y="26" width="10" height="18" rx="3" fill="${Tt}" stroke="${Rt}" stroke-width="1.5" />
      ${n?Z`<text x="${e.width/2}" y="10" text-anchor="middle" class="device-value">${n}</text>`:Z``}
      ${Zt(e,t)}
    </g>
  `}(t,i,o,n);case"fancoil":return function(e,t,i,o){const n=Wt(o);return Z`
    <g class="device device-fancoil">
      <path d="M 0 66 L 16 66 M ${e.width-16} 66 L ${e.width} 66" stroke="${Rt}" stroke-width="2" />
      <rect x="16" y="12" width="${e.width-32}" height="54" rx="6"
        fill="${Tt}" stroke="${Vt(o,i)}" stroke-width="${Bt(i)}" />
      <circle cx="${46}" cy="${38}" r="20" fill="none" stroke="${Rt}" stroke-width="1.5" />
      <g class="fan ${o.active?"spinning":""}">
        ${[0,90,180,270].map(e=>Z`
          <path d="${"M 0 0 C 4 -7, 13 -9, 17 -4 C 12 -1, 5 0, 0 0 Z"}" transform="translate(${46} ${38}) rotate(${e})" fill="${Ut}" opacity="0.75" />
        `)}
        <circle cx="${46}" cy="${38}" r="3.5" fill="${Ut}" />
      </g>
      <path d="M 76 50 L 104 50 M 76 56 L 104 56" stroke="${Rt}" stroke-width="1.5" />
      ${n?Z`<text x="90" y="36" text-anchor="middle" class="device-value">${n}</text>`:Z``}
      ${Zt(e,t)}
    </g>
  `}(t,i,o,n);case"outdoor_temperature":return function(e,t,i){const o=t?Ut:Rt;return Z`
    <g class="device device-outdoor-temperature">
      <rect x="2" y="6" width="${e.width-4}" height="${e.height-12}" rx="${(e.height-12)/2}"
        fill="${Tt}" stroke="${o}" stroke-width="${Bt(t)}" />
      <circle cx="22" cy="${e.height/2}" r="6" fill="none" stroke="#ffb300" stroke-width="1.5" />
      <path d="M 22 13 V 16 M 22 34 V 37 M 10 25 H 13 M 31 25 H 34 M 14 17 L 16 19 M 28 31 L 30 33 M 14 33 L 16 31 M 28 19 L 30 17"
        stroke="#ffb300" stroke-width="1.5" stroke-linecap="round" />
      <text x="${e.width/2+14}" y="${e.height/2+4}" text-anchor="middle" class="device-value">
        ${i.value??"—"}
      </text>
    </g>
  `}(t,o,n);default:return}}const Xt={temperature:"temperature",pressure:"pressure",volume_flow_rate:"flow",energy:"energy",power:"energy"};function Qt(e,t,i,o){const n=function(e){const t=e.deviceClass?Xt[e.deviceClass]:void 0;return t||(e.unit?.includes("°")?"temperature":"generic")}(o),r=e.width/2,s=e.height-14,a=i?"var(--primary-color, #03a9f4)":"temperature"===n?Dt(o.numeric):"var(--primary-color, #03a9f4)",d="energy"===n||"generic"===n;return Z`
    <g class="device device-inline-sensor">
      <line x1="0" y1="${s}" x2="${e.width}" y2="${s}" stroke="var(--divider-color, #888)" stroke-width="3" />
      <circle cx="${r}" cy="${s}" r="11" fill="var(--card-background-color, #1c1c1c)"
        stroke="${a}" stroke-width="${i?2.5:2}" />
      <path d="${function(e,t,i){switch(e){case"temperature":return`M ${t-1.5} ${i+2} V ${i-6} A 1.5 1.5 0 0 1 ${t+1.5} ${i-6} V ${i+2} M ${t-3} ${i+4.5} A 3 3 0 1 0 ${t+3} ${i+4.5} A 3 3 0 1 0 ${t-3} ${i+4.5}`;case"flow":return`M ${t-6} ${i} L ${t+5} ${i} M ${t+1} ${i-4} L ${t+5} ${i} L ${t+1} ${i+4}`;case"pressure":return`M ${t-6} ${i+3} A 6 6 0 1 1 ${t+6} ${i+3} M ${t} ${i+1} L ${t+4} ${i-4}`;case"energy":return`M ${t+1} ${i-7} L ${t-4} ${i+1} L ${t} ${i+1} L ${t-1} ${i+7} L ${t+4} ${i-1} L ${t} ${i-1} Z`;case"generic":return`M ${t-3} ${i} A 3 3 0 1 0 ${t+3} ${i} A 3 3 0 1 0 ${t-3} ${i} Z`}}(n,r,s)}" fill="${d?a:"none"}"
        stroke="${a}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <text x="${r}" y="${s-17}" text-anchor="middle" class="device-value">${o.value??"—"}</text>
      ${Zt(e,t)}
    </g>
  `}function ei(e,t,i,o,n,r={}){switch(e){case"heat_pump":return function(e,t,i,o,n){const r=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",s=i?2.5:1.5;return Z`
    <g class="device device-outdoor-unit">
      <rect x="10" y="12" width="${e.width-20}" height="${e.height-24}" rx="6"
        fill="var(--card-background-color, #1c1c1c)" stroke="${r}" stroke-width="${s}" />
      <circle cx="${58}" cy="${60}" r="34" fill="none" stroke="var(--divider-color, #888)" stroke-width="1.5" />
      <g class="fan ${o.active?"spinning":""}">
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
  `}(t,i,o,n,[...Nt(r,"temperature"),...Nt(r,"value")]);case"valve_3way":return function(e,t,i,o){const n=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",r=i?2.5:1.5,s="a"===o.valveBranch?"#4caf50":"var(--divider-color, #555)",a="b"===o.valveBranch?"#4caf50":"var(--divider-color, #555)";return Z`
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
  `}(t,i,o,n);case"boiler":return function(e,t,i,o,n,r){const s=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",a=i?2.5:1.5,d=e.ports.some(e=>"coil2_in"===e.id),l=e.ports.find(e=>"cold_in"===e.id)?.position.y??118,c={[ke[0]]:34,[ke[1]]:78,[ke[2]]:e.height-26};return Z`
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
      ${n?qt(30,e.height-14,40,n):Z``}
      ${Zt(e,t)}
    </g>
  `}(t,i,o,n,zt(r),Lt(r));case"junction":return function(e,t,i,o){const n=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return Z`
    <g class="device device-junction">
      <circle
        cx="30" cy="30" r="18"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${n}" stroke-width="${i?2.5:1.5}"
      />
      ${Zt(e,t)}
    </g>
  `}(t,i,o,n);case"circulation_pump":return function(e,t,i,o){const n=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return Z`
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
      ${Zt(e,t)}
    </g>
  `}(t,i,o,n);case"floor_heating":return function(e,t,i,o){const n=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return Z`
    <g class="device device-floor-heating">
      <rect
        x="10" y="18" width="120" height="55" rx="8"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${n}" stroke-width="${i?2.5:1.5}"
      />
      <path d="M 20 40 C 35 30, 50 50, 65 40 C 80 30, 95 50, 110 40 C 115 37, 120 37, 126 40"
        fill="none" stroke="var(--primary-color, #03a9f4)" stroke-width="2" />
      ${Zt(e,t)}
    </g>
  `}(t,i,o,n);case"manifold":return function(e,t,i,o,n){const r=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",s=i?2.5:1.5,a=e.width-8,d=e.ports.filter(e=>e.id.startsWith("loop_")&&"outlet"===e.kind);return Z`
    <g class="device device-manifold">
      <rect x="2" y="18" width="${e.width-4}" height="94" rx="6"
        fill="none" stroke="${r}" stroke-width="${s}" stroke-dasharray="4 3" />
      <rect x="4" y="22" width="${a}" height="16" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${Ot}" stroke-width="2" />
      <rect x="4" y="92" width="${a}" height="16" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${Ht}" stroke-width="2" />
      ${d.map((t,i)=>{const o=t.position.x,r=n[i]?.active??!1;return Z`
          <line x1="${o}" y1="0" x2="${o}" y2="22" stroke="${Ot}" stroke-width="2" />
          <rect class="actuator ${r?"active":""}" x="${o-7}" y="6" width="14" height="11" rx="2"
            fill="${r?"#4caf50":"var(--card-background-color, #1c1c1c)"}"
            stroke="${r?"#4caf50":"var(--divider-color, #888)"}" stroke-width="1.5" />
          <line x1="${o}" y1="108" x2="${o}" y2="${e.height}" stroke="${Ht}" stroke-width="2" />
          <text x="${o}" y="69" text-anchor="middle" class="device-label">${i+1}</text>
        `})}
      ${Zt(e,t)}
    </g>
  `}(t,i,o,n,Nt(r,"loop"));case"buffer_tank":return function(e,t,i,o,n,r){const s=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",a=i?2.5:1.5,d=e.height-10,l=(d-16-36)/(xe.length-1),c=xe.map((e,t)=>({y:34+t*l,state:n.get(e)})).filter(e=>void 0!==e.state),p=e.ports.some(e=>"coil_in"===e.id);return Z`
    <g class="device device-buffer-tank">
      ${e.ports.map(e=>Z`
        <line x1="${e.position.x}" y1="${e.position.y}" x2="${0===e.position.x?14:86}" y2="${e.position.y}"
          stroke="var(--divider-color, #888)" stroke-width="2" />
      `)}
      <rect x="14" y="10" width="72" height="${e.height-14}" rx="10"
        fill="var(--card-background-color, #1c1c1c)" stroke="${s}" stroke-width="${a}" />
      ${c.map((e,t)=>{const i=0===t?16:(c[t-1].y+e.y)/2,o=t===c.length-1?d:(e.y+c[t+1].y)/2,n=Dt(e.state.numeric);return Z`
          <rect x="17" y="${i}" width="66" height="${o-i}" fill="${n}" opacity="0.3" />
          <circle cx="18" cy="${e.y}" r="3" fill="${n}" />
        `})}
      ${p?Z`<path d="M 14 80 L 46 88 L 18 96 L 46 104 L 18 112 L 14 118" fill="none"
            stroke="${Ot}" stroke-width="2" stroke-linejoin="round" opacity="0.8" />`:Z``}
      ${c.map(e=>Jt(56,e.y+4,e.state))}
      ${r?qt(28,d-8,44,r):Z``}
      ${Zt(e,t)}
    </g>
  `}(t,i,o,n,Lt(r),zt(r));case"mixing_valve":return function(e,t,i,o){const n=i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",r=i?2.5:1.5,s=o.position,a=void 0===s?"var(--divider-color, #888)":`hsl(${Math.round(210*(1-s/100))}, 75%, 55%)`;return Z`
    <g class="device device-mixing-valve">
      <line x1="0" y1="70" x2="22" y2="70" stroke="${Ot}" stroke-width="3" />
      <line x1="50" y1="96" x2="50" y2="${e.height}" stroke="${Ht}" stroke-width="3" />
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
  `}(t,i,o,n);case"electric_heater":return function(e,t,i,o){const n=o.active?jt:i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",r=i?2.5:1.5;return Z`
    <g class="device device-electric-heater">
      <rect x="10" y="12" width="${e.width-20}" height="${e.height-24}" rx="8"
        fill="var(--card-background-color, #1c1c1c)" stroke="${n}" stroke-width="${r}" />
      ${qt(24,e.height/2+4,e.width-48,o)}
      ${Zt(e,t)}
    </g>
  `}(t,i,o,n);case"pipe_sensor":return Qt(t,i,o,n);default:return Gt(e,t,i,o,n)}}let ti=class extends le{constructor(){super(...arguments),this.schema={nodes:[],connections:[],overlays:[]},this.editable=!1,this._states=new $t(this,yt),this._formatters=new $t(this,_t),this._i18n=new $t(this,mt)}updated(e){e.has("editable")&&this.toggleAttribute("editable",this.editable)}render(){const e=this._translator(),{nodes:t,connections:i,overlays:o}=this.schema,n=this._dragBounds??this._computeBounds(t);return B`
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
          `:F}
        ${i.map(e=>this._renderConnection(e))}
        ${t.map(t=>this._renderNode(t,e))}
        ${o.map(e=>this._renderOverlay(e))}
      </svg>
    `}_translator(){return vt(this._i18n.value?.language)}_computeBounds(e){if(!e.length)return{x:0,y:0,width:800,height:400};let t=1/0,i=1/0,o=-1/0,n=-1/0;for(const r of e){const e=nt(r);if(!e)continue;const s=kt(r,e);t=Math.min(t,s.x),i=Math.min(i,s.y-20),o=Math.max(o,s.x+s.width),n=Math.max(n,s.y+s.height+10)}return{x:t-40,y:i-40,width:o-t+80,height:n-i+80}}_renderConnection(e){const t=me(e.from),i=me(e.to),o=this.schema.nodes.find(e=>e.id===t?.nodeId),n=this.schema.nodes.find(e=>e.id===i?.nodeId);if(!(t&&i&&o&&n))return B``;const r=xt(o,t.portId),s=xt(n,i.portId);if(!r||!s)return B``;const a=function(e,t){const i=Math.hypot(t.x-e.x,t.y-e.y),o=Math.max(30,i/2),n=e.x+e.direction.x*o,r=e.y+e.direction.y*o,s=t.x+t.direction.x*o,a=t.y+t.direction.y*o;return`M ${e.x} ${e.y} C ${n} ${r}, ${s} ${a}, ${t.x} ${t.y}`}(r,s),d=$e(e),l=this.selectedEdgeId===d;return Z`
      <path class="pipe ${l?"selected":""}" d="${a}" />
      ${this.editable?Z`<path class="pipe-hit" data-edge-id="${d}" d="${a}" />`:F}
    `}_renderNode(e,t){const i=nt(e);if(!i)return B``;const o=this.selectedNodeId===e.id,n=this._states.value,r=this._formatters.value,s=It(n,e,r),a=(e.addons??[]).map(e=>({config:e,state:{...It(n,e,r),label:e.name}})),d=ei(e.type,i,t,o,s,{addons:a});if(!d)return B``;const l=ft(e.rotation),c=kt(e,i).y-e.position.y-4;return Z`
      <g
        class="node ${this._dragNodeId===e.id?"dragging":""}"
        data-node-id="${e.id}"
        transform="translate(${e.position.x} ${e.position.y})"
      >
        <g transform="rotate(${l} ${i.width/2} ${i.height/2})">
          ${d}
        </g>
        <text x="${i.width/2}" y="${c}" text-anchor="middle" class="device-label">
          ${e.name||t.t(i.labelKey)}
        </text>
      </g>
    `}_renderOverlay(e){const t=this._states.value,i=this._formatters.value,o=At(t,i,e),n=function(e,t){let i,o,n=!0;if(!e||!t.rules?.length)return{color:i,className:o,visible:n};for(const r of t.rules)Ct(e,r,t.entity_id)&&(r.effect.color&&(i=Et(r.effect.color)),r.effect.class&&(o=r.effect.class),void 0!==r.effect.visible&&(n=r.effect.visible));return{color:i,className:o,visible:n}}(t,e);if(!n.visible)return B``;const r=function(e,t,i){const o=e?.[i.entity_id];return o&&t?t.formatEntityName(o,i.name):"string"==typeof i.name?i.name:i.entity_id}(t,i,e),s=`${r}: ${o}`,a=Math.max(80,7*s.length+16);return Z`
      <g class="overlay-group ${n.className??""}" transform="translate(${e.position.x} ${e.position.y})">
        <rect class="overlay-bg" x="0" y="0" width="${a}" height="22" rx="4" />
        <text class="overlay-text" x="8" y="15" style="${n.color?`fill: ${n.color}`:""}">
          ${s}
        </text>
      </g>
    `}_onCanvasPointerDown(e){if(!this.editable)return;const t=e.target,i=t?.getAttribute?.("data-edge-id");if(i)return void this.dispatchEvent(new CustomEvent("edge-select",{detail:{edgeId:i},bubbles:!0,composed:!0}));const o=t?.closest?.("[data-node-id]");if(!o)return void this._dispatchSelect(void 0);const n=o.getAttribute("data-node-id");if(!n)return;const r=this.schema.nodes.find(e=>e.id===n);if(!r)return;const s=t?.closest?.("[data-port-id]");if(s){const t=s.getAttribute("data-port-id");if(t)return this._dispatchPortClick(n,t),void e.stopPropagation()}this._dragNodeId=n;const a=this._toLocal(e);this._dragOffset=a?{x:a.x-r.position.x,y:a.y-r.position.y}:{x:0,y:0},this._dragBounds=this._computeBounds(this.schema.nodes),o.setPointerCapture(e.pointerId),this._dispatchSelect(n),e.preventDefault()}_toLocal(e){const t=this.renderRoot.querySelector("svg"),i=t?.getScreenCTM();if(!t||!i)return;const o=t.createSVGPoint();return o.x=e.clientX,o.y=e.clientY,o.matrixTransform(i.inverse())}_onCanvasPointerMove(e){if(!this.editable||!this._dragNodeId)return;const t=this.schema.nodes.find(e=>e.id===this._dragNodeId),i=this._toLocal(e);if(!t||!i)return;const o=this._dragOffset??{x:0,y:0},n={x:wt(i.x-o.x,10),y:wt(i.y-o.y,10)};n.x===t.position.x&&n.y===t.position.y||this.dispatchEvent(new CustomEvent("node-move",{detail:{nodeId:t.id,position:n},bubbles:!0,composed:!0}))}_onCanvasPointerUp(e){if(this._dragNodeId){const t=this.renderRoot.querySelector(`[data-node-id="${this._dragNodeId}"]`);t?.releasePointerCapture(e.pointerId),this._dragNodeId=void 0,this._dragOffset=void 0,this._dragBounds=void 0,this.requestUpdate()}}_dispatchSelect(e){this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:e},bubbles:!0,composed:!0}))}_dispatchPortClick(e,t){this.dispatchEvent(new CustomEvent("port-click",{detail:{nodeId:e,portId:t},bubbles:!0,composed:!0}))}};ti.styles=s`
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
  `,e([ve({attribute:!1})],ti.prototype,"schema",void 0),e([ve({type:Boolean})],ti.prototype,"editable",void 0),e([ve({attribute:!1})],ti.prototype,"selectedNodeId",void 0),e([ve({attribute:!1})],ti.prototype,"selectedEdgeId",void 0),e([ve({attribute:!1})],ti.prototype,"selectedPort",void 0),ti=e([pe("heating-schema-canvas")],ti);const ii={temperature:{type:"temperature",display:"value",domains:["sensor"],deviceClasses:["temperature"]},value:{type:"value",display:"value",domains:["sensor","number"]},electric_heater:{type:"electric_heater",display:"binary",domains:["switch","binary_sensor","sensor","input_boolean"],deviceClasses:["power","heat","running"]},pump:{type:"pump",display:"binary",domains:["switch","binary_sensor","sensor"],deviceClasses:["running"]},actuator:{type:"actuator",display:"position",domains:["valve","switch","binary_sensor","number","sensor"]},fan:{type:"fan",display:"binary",domains:["fan","sensor","binary_sensor"]},mode:{type:"mode",display:"text",domains:["select","sensor","input_select","climate","water_heater"],deviceClasses:["enum"]},setpoint:{type:"setpoint",display:"value",domains:["number","input_number","climate","water_heater","sensor"],deviceClasses:["temperature"]},defrost:{type:"defrost",display:"binary",domains:["binary_sensor","sensor"]},alarm:{type:"alarm",display:"binary",domains:["binary_sensor","sensor"],deviceClasses:["problem"]},window:{type:"window",display:"binary",domains:["binary_sensor"],deviceClasses:["window","opening"]},heat_exchanger:{type:"heat_exchanger",display:"none",entityless:!0},loop:{type:"loop",display:"binary",domains:["valve","switch","binary_sensor","climate"]}};function oi(e,t){const i=e.nodes.find(e=>e.id===t.nodeId);return i?nt(i)?.ports.find(e=>e.id===t.portId):void 0}function ni(e,t,i){if(t.nodeId===i.nodeId&&t.portId===i.portId)return;const o=oi(e,t),n=oi(e,i);return o&&n&&o.kind!==n.kind?"outlet"===o.kind?{from:_e(t),to:_e(i)}:{from:_e(i),to:_e(t)}:void 0}function ri(e,t){return e.connections.some(e=>e.from===t.from&&e.to===t.to)}function si(e,t){const i=_e(t);return e.connections.filter(e=>e.from===i||e.to===i)}const ai=/^loop_(\d+)_(in|out)$/;const di=new Set(["friendly_name","icon","entity_picture","supported_features","device_class","unit_of_measurement","state_class","attribution","assumed_state","restored","editable","id"]),li=["on","off","heat","heating","open","idle"],ci=["options","hvac_modes","operation_list","preset_modes","fan_modes"];function pi(e){const t=e.attributes.friendly_name;return"string"==typeof t&&t?t:e.entity_id}function hi(e,t){return t?e.entities?.[t]?.device_id??void 0:void 0}function ui(e,t={}){if(!e)return[];const i=hi(e,t.relatedTo),o=Object.values(e.states).map(o=>{const n=o.entity_id.split(".",1)[0],r=o.attributes.device_class;let s=0;return i&&hi(e,o.entity_id)===i&&(s+=4),t.domains?.includes(n)&&(s+=2),"string"==typeof r&&t.deviceClasses?.includes(r)&&(s+=1),{entity:o,score:s,name:pi(o)}});return o.sort((e,t)=>t.score-e.score||e.name.localeCompare(t.name)),o.slice(0,300).map(({entity:e,name:t})=>({value:e.entity_id,label:t}))}function vi(e,t){const i=t?e?.states[t]:void 0;return i?Object.keys(i.attributes).filter(e=>!di.has(e)).sort().map(e=>({value:e,label:String(i.attributes[e])})):[]}function yi(e,t,i){const o=t?e?.states[t]:void 0,n=new Set;if(o){const e=i?o.attributes[i]:o.state;if(null!=e&&n.add(String(e)),!i){for(const e of ci){const t=o.attributes[e];Array.isArray(t)&&t.forEach(e=>n.add(String(e)))}const e=o.attributes.hvac_action;"string"==typeof e&&n.add(e)}}return li.forEach(e=>n.add(e)),[...n].map(e=>({value:e}))}function _i(e,t){const i=t?e?.states[t]:void 0;if(!i||!e)return;const o="function"==typeof e.formatEntityState?e.formatEntityState(i):i.state;return`${pi(i)} · ${o}`}let mi=0,$i=class extends le{constructor(){super(...arguments),this.kind="text",this.label="",this.options=[],this._listId="hv-list-"+ ++mi,this._inputId=`hv-input-${mi}`}render(){if("boolean"===this.kind)return B`
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
          </datalist>`:F}
      ${this._renderHelper()}
    `}_renderHelper(){return this.helper?B`<div class="helper">${this.helper}</div>`:F}_onCheck(e){this._emit(e.target.checked)}_onInput(e){const t=e.target.value.trim();"number"===this.kind?this._emit(""===t?void 0:Number(t)):this._emit(""===t?void 0:t)}_emit(e){this.dispatchEvent(new CustomEvent("hv-change",{detail:{value:e}}))}};$i.styles=s`
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
  `,e([ve()],$i.prototype,"kind",void 0),e([ve()],$i.prototype,"label",void 0),e([ve()],$i.prototype,"helper",void 0),e([ve()],$i.prototype,"placeholder",void 0),e([ve({attribute:!1})],$i.prototype,"value",void 0),e([ve({attribute:!1})],$i.prototype,"options",void 0),$i=e([pe("hv-field")],$i);const fi={key:"entity_id",label:"editor.entity"},gi={key:"active_state",label:"editor.active_state",helper:"editor.active_state_helper"},bi={key:"value_attribute",label:"editor.value_attribute",helper:"editor.value_attribute_helper"},xi={key:"mode_attribute",label:"editor.position_attribute",helper:"editor.position_attribute_helper"};const ki=4,wi=200,Ai=180,Si=40,Ei=40,Ci=["primary","accent","red","pink","purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","grey","blue-grey"],Pi=e=>"string"==typeof e.detail.value?e.detail.value:void 0,Ii=e=>"number"==typeof e.detail.value&&Number.isFinite(e.detail.value)?e.detail.value:void 0;let Mi=class extends le{constructor(){super(...arguments),this._tab="schema",this._view={kind:"list"},this._newDeviceType=je.type}set hass(e){this._hass=e}get hass(){return this._hass}setConfig(e){this._config=lt(e)}render(){if(!this._config)return B``;const e=vt(this._hass?.language),t=ge(this._config);return B`
      <div class="editor">
        <div class="tabs" role="tablist">
          ${this._renderTab(e,"schema","editor.schema_tab")}
          ${this._renderTab(e,"overlays","editor.overlay_tab")}
        </div>
        ${"schema"===this._tab?this._renderSchemaTab(e,t):this._renderOverlaysTab(e,t)}
      </div>
    `}_renderTab(e,t,i){return B`
      <button
        type="button"
        role="tab"
        aria-selected="${this._tab===t}"
        @click="${()=>{this._tab=t}}"
      >${e.t(i)}</button>
    `}_renderSchemaTab(e,t){const i=this._view,o="list"===i.kind?void 0:t.nodes.find(e=>e.id===i.nodeId);if(o&&"addon"===i.kind){const n=o.addons?.[i.index];if(n)return this._renderAddonView(e,t,o,n,i.index)}return o?this._renderNodeView(e,t,o):this._renderListView(e,t)}_renderCanvas(e,t){return B`
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
          </p>`:F}
      ${this._selectedEdgeId?B`<div class="toolbar">
            <button type="button" class="danger" @click="${this._deleteSelectedConnection}">
              ${e.t("editor.delete_connection")}
            </button>
          </div>`:F}
    `}_renderListView(e,t){const i=function(e){return e.connections.filter(t=>{const i=me(t.from),o=me(t.to);return!i||!o||"outlet"!==oi(e,i)?.kind||"inlet"!==oi(e,o)?.kind})}(t);return B`
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

      ${this._renderCanvas(e,t)}

      ${i.length?B`<p class="warning" role="alert">
            ${e.t("editor.invalid_connections",String(i.length))}
            <button type="button" @click="${()=>this._removeConnections(i)}">
              ${e.t("editor.remove_invalid")}
            </button>
          </p>`:F}

      ${t.nodes.length?B`
            <h3>${e.t("editor.devices_title")}</h3>
            <ul class="list">
              ${t.nodes.map(i=>this._renderNodeRow(e,t,i))}
            </ul>
          `:B`<p class="hint">${e.t("editor.empty_hint")}</p>`}
    `}_renderNodeRow(e,t,i){const[o,n]=function(e,t){const i=nt(t)?.ports??[],o=i.filter(i=>si(e,{nodeId:t.id,portId:i.id}).length).length;return[o,i.length]}(t,i),r=[i.entity_id?_i(this._hass,i.entity_id)??i.entity_id:e.t("editor.no_entity")];return n&&r.push(e.t("editor.ports_connected",String(o),String(n))),i.addons?.length&&r.push(e.t("editor.addon_count",String(i.addons.length))),B`
      <li>
        <button
          type="button"
          class="row ${i.id===this._selectedNodeId?"selected":""}"
          @click="${()=>this._openNode(i.id)}"
        >
          <span class="row-main">
            <span>${this._nodeName(e,i)}</span>
            <span class="row-sub">${r.join(" · ")}</span>
          </span>
          <span aria-hidden="true">›</span>
        </button>
      </li>
    `}_renderHeader(e,t,i){return B`
      <div class="header">
        <button type="button" class="icon" aria-label="${e.t("editor.back")}" @click="${i}">‹</button>
        <h3>${t}</h3>
      </div>
    `}_renderNodeView(e,t,i){const o=i;return B`
      ${this._renderHeader(e,this._nodeName(e,i),()=>this._openList())}
      ${this._renderCanvas(e,t)}

      <section class="card">
        <hv-field
          .label="${e.t("editor.name")}"
          .helper="${e.t("editor.name_helper")}"
          .placeholder="${e.t(`devices.${i.type}.name`)}"
          .value="${i.name}"
          @hv-change="${e=>this._patchNode(i.id,{name:Pi(e)})}"
        ></hv-field>
        ${this._renderBinding(e,o,function(e){const t=ot(e)?.valueDisplay;return"only"===t?[fi,bi]:"with_state"===t?[fi,gi,bi]:"mixing_valve"===e?[{...fi,label:"editor.actuator_entity"},xi]:"valve_3way"===e?[fi,gi,{key:"mode_attribute",label:"editor.valve_attribute",helper:"editor.valve_attribute_helper"},{key:"branch_a_value",label:"editor.branch_a",helper:"editor.branch_a_helper"},{key:"branch_b_value",label:"editor.branch_b",helper:"editor.branch_b_helper"}]:[fi,gi]}(i.type),{},e=>this._patchNode(i.id,e))}
      </section>

      ${this._renderAddons(e,i)}
      ${this._renderConnections(e,t,i)}

      <section class="card">
        <h3>${e.t("editor.position_title")}</h3>
        <div class="grid2">
          <hv-field
            kind="number"
            label="X"
            .value="${i.position.x}"
            @hv-change="${e=>this._moveNode(i.id,{x:Ii(e)})}"
          ></hv-field>
          <hv-field
            kind="number"
            label="Y"
            .value="${i.position.y}"
            @hv-change="${e=>this._moveNode(i.id,{y:Ii(e)})}"
          ></hv-field>
        </div>
        <div class="toolbar">
          <button type="button" @click="${()=>this._rotateNode(i.id)}">↻ ${e.t("editor.rotate")}</button>
          <button type="button" class="danger" @click="${()=>this._deleteNode(i.id)}">
            ${e.t("editor.delete_device")}
          </button>
        </div>
      </section>
    `}_renderBinding(e,t,i,o,n){return B`${i.map(i=>{const{kind:r,options:s,helper:a}=this._fieldSource(e,t,i,o);return B`
        <hv-field
          .kind="${r}"
          .label="${e.t(i.label)}"
          .helper="${a}"
          .options="${s}"
          .value="${t[i.key]}"
          @hv-change="${e=>n({[i.key]:Pi(e)})}"
        ></hv-field>
      `})}`}_fieldSource(e,t,i,o){const n=this._hass,r=i.helper?e.t(i.helper):void 0;switch(i.key){case"entity_id":case"temperature_entity_id":return{kind:"combo",options:ui(n,o),helper:_i(n,t[i.key])??r};case"value_attribute":case"mode_attribute":return{kind:"combo",options:vi(n,t.entity_id),helper:r};case"branch_a_value":case"branch_b_value":return{kind:"combo",options:yi(n,t.entity_id,t.mode_attribute),helper:r};default:return{kind:"combo",options:yi(n,t.entity_id),helper:r}}}_renderAddons(e,t){const i=ot(t.type)?.addons??[];if(!i.length)return F;const o=t.addons??[],n=i.filter(e=>this._remaining(t,e)>0),r=n.find(e=>e.type===this._newAddonType)?.type??n[0]?.type;return B`
      <section class="card">
        <h3>${e.t("editor.addons_title")}</h3>
        ${o.length?B`<ul class="list">
              ${o.map((i,o)=>B`
                <li>
                  <button type="button" class="row" @click="${()=>this._openAddon(t.id,o)}">
                    <span class="row-main">
                      <span>${this._addonName(e,t,i,o)}</span>
                      <span class="row-sub">${this._addonSummary(e,i)}</span>
                    </span>
                    <span aria-hidden="true">›</span>
                  </button>
                  <button
                    type="button"
                    class="icon danger"
                    aria-label="${e.t("editor.remove_addon")}"
                    @click="${()=>this._removeAddon(t.id,o)}"
                  >×</button>
                </li>
              `)}
            </ul>`:B`<p class="hint">${e.t("editor.addons_empty")}</p>`}
        ${r?B`<div class="toolbar" style="margin-top: 8px">
              <select
                aria-label="${e.t("editor.addon_type")}"
                @change="${e=>{this._newAddonType=e.target.value}}"
              >
                ${n.map(i=>B`
                  <option value="${i.type}" ?selected="${i.type===r}">
                    ${e.t(`addons.${i.type}.name`)} (${e.t("editor.remaining",String(this._remaining(t,i)))})
                  </option>
                `)}
              </select>
              <button type="button" @click="${()=>this._addAddon(t.id,r)}">
                ${e.t("editor.add_addon")}
              </button>
            </div>`:F}
      </section>
    `}_renderAddonView(e,t,i,o,n){const r=ot(i.type)?.addons?.find(e=>e.type===o.type),s=ii[o.type],a=new Set((i.addons??[]).filter((e,t)=>t!==n&&e.type===o.type).map(e=>e.slot)),d=(r?.slots??[]).filter(e=>!a.has(e)).map(t=>({value:t,label:e.t(`slots.${t}`)})),l={domains:s.domains,deviceClasses:s.deviceClasses,relatedTo:i.entity_id};return B`
      ${this._renderHeader(e,this._addonName(e,i,o,n),()=>this._openNode(i.id))}
      ${this._renderCanvas(e,t)}
      <section class="card">
        <p class="hint">${this._nodeName(e,i)} › ${e.t(`addons.${o.type}.name`)}</p>
        ${d.length?B`<hv-field
              kind="select"
              .label="${e.t("editor.slot")}"
              .options="${d}"
              .value="${o.slot}"
              @hv-change="${e=>this._patchAddon(i.id,n,{slot:Pi(e)})}"
            ></hv-field>`:F}
        <hv-field
          .label="${e.t("editor.name")}"
          .helper="${e.t("editor.addon_name_helper")}"
          .value="${o.name}"
          @hv-change="${e=>this._patchAddon(i.id,n,{name:Pi(e)})}"
        ></hv-field>
        ${s.entityless?B`<p class="hint">${e.t(`addons.${o.type}.hint`)}</p>`:this._renderBinding(e,o,function(e){if("loop"===e)return[{...fi,label:"editor.actuator_entity"},gi,{key:"temperature_entity_id",label:"editor.loop_temperature"}];switch(ii[e].display){case"value":case"text":return[fi,bi];case"binary":return[fi,gi];case"position":return[fi,xi];default:return[]}}(o.type),l,e=>this._patchAddon(i.id,n,e))}
      </section>
      <div class="toolbar">
        <button type="button" class="danger" @click="${()=>this._removeAddon(i.id,n)}">
          ${e.t("editor.remove_addon")}
        </button>
      </div>
    `}_renderConnections(e,t,i){const o=nt(i)?.ports??[];return o.length?B`
      <section class="card">
        <h3>${e.t("editor.connections_title")}</h3>
        ${o.map(o=>{const n={nodeId:i.id,portId:o.id},r=si(t,n),s=function(e,t){const i=oi(e,t);if(!i)return[];const o=[];for(const n of e.nodes)if(n.id!==t.nodeId)for(const r of nt(n)?.ports??[]){if(r.kind===i.kind)continue;const s={nodeId:n.id,portId:r.id},a=ni(e,t,s);a&&!ri(e,a)&&o.push(s)}return o}(t,n);return B`
            <div class="port">
              <div class="port-label">
                ${"outlet"===o.kind?"→":"←"} ${e.t(o.labelKey,...o.labelArgs??[])}
              </div>
              <div class="chips">
                ${r.length?r.map(i=>{const o=function(e,t){const i=_e(t);return me(e.from===i?e.to:e.from)}(i,n);return B`<span class="chip">
                        ${o?this._portRefLabel(e,t,o):"?"}
                        <button
                          type="button"
                          aria-label="${e.t("editor.disconnect")}"
                          @click="${()=>this._removeConnections([i])}"
                        >×</button>
                      </span>`}):B`<span class="hint">${e.t("editor.not_connected")}</span>`}
              </div>
              ${s.length?B`<select
                    aria-label="${e.t("editor.connect_to")}"
                    @change="${e=>{const t=e.target,i=me(t.value);t.value="",i&&this._connect(n,i)}}"
                  >
                    <option value="">${e.t("editor.connect_to")}…</option>
                    ${s.map(i=>B`<option value="${_e(i)}">${this._portRefLabel(e,t,i)}</option>`)}
                  </select>`:F}
            </div>
          `})}
      </section>
    `:F}_renderOverlaysTab(e,t){return B`
      <div class="toolbar">
        <button type="button" class="primary" @click="${this._addOverlay}">${e.t("editor.add_overlay")}</button>
      </div>
      <heating-schema-canvas .schema="${t}" .editable="${!1}"></heating-schema-canvas>
      ${t.overlays.length?F:B`<p class="hint">${e.t("editor.overlays_empty")}</p>`}
      ${t.overlays.map((t,i)=>this._renderOverlay(e,t,i))}
    `}_renderOverlay(e,t,i){const o=this._hass,n=e=>this._patchOverlay(t.id,e),r=void 0!==t.name&&"string"!=typeof t.name;return B`
      <section class="card">
        <div class="header">
          <h3>${t.entity_id||e.t("editor.overlay_n",String(i+1))}</h3>
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
          .options="${ui(o)}"
          .helper="${_i(o,t.entity_id)}"
          .value="${t.entity_id}"
          @hv-change="${e=>n({entity_id:Pi(e)??""})}"
        ></hv-field>
        <hv-field
          .label="${e.t("overlay.name")}"
          .helper="${r?e.t("overlay.name_yaml"):e.t("overlay.name_helper")}"
          .value="${"string"==typeof t.name?t.name:void 0}"
          @hv-change="${e=>n({name:Pi(e)})}"
        ></hv-field>
        <hv-field
          .label="${e.t("overlay.template")}"
          .helper="${e.t("overlay.template_helper")}"
          .value="${t.template}"
          @hv-change="${e=>n({template:Pi(e)})}"
        ></hv-field>
        <div class="grid2">
          <hv-field
            kind="number"
            label="X"
            .value="${t.position.x}"
            @hv-change="${e=>n({position:{...t.position,x:Ii(e)??0}})}"
          ></hv-field>
          <hv-field
            kind="number"
            label="Y"
            .value="${t.position.y}"
            @hv-change="${e=>n({position:{...t.position,y:Ii(e)??0}})}"
          ></hv-field>
        </div>

        <div class="header">
          <h3>${e.t("overlay.rules")}</h3>
          <button type="button" @click="${()=>this._addRule(t)}">${e.t("overlay.add_rule")}</button>
        </div>
        ${(t.rules??[]).map((i,o)=>this._renderRule(e,t,i,o))}
      </section>
    `}_renderRule(e,t,i,o){const n=e=>this._updateRule(t.id,o,e),r=i.entity||t.entity_id;return B`
      <div class="rule">
        <div class="header">
          <hv-field
            style="flex: 1"
            kind="select"
            .label="${e.t("overlay.rule.condition")}"
            .options="${[{value:"state",label:e.t("overlay.rule.condition_state")},{value:"numeric",label:e.t("overlay.rule.condition_numeric")}]}"
            .value="${i.condition}"
            @hv-change="${e=>n(t=>({condition:"numeric"===Pi(e)?"numeric":"state",entity:t.entity,effect:t.effect}))}"
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
          .options="${ui(this._hass)}"
          .value="${i.entity}"
          @hv-change="${e=>n(t=>({...t,entity:Pi(e)}))}"
        ></hv-field>
        ${"state"===i.condition?B`<hv-field
              kind="combo"
              .label="${e.t("overlay.rule.state")}"
              .options="${yi(this._hass,r)}"
              .value="${i.state}"
              @hv-change="${e=>n(t=>({...t,state:Pi(e)}))}"
            ></hv-field>`:B`<div class="grid2">
              <hv-field
                kind="number"
                .label="${e.t("overlay.rule.above")}"
                .value="${i.above}"
                @hv-change="${e=>n(t=>({...t,above:Ii(e)}))}"
              ></hv-field>
              <hv-field
                kind="number"
                .label="${e.t("overlay.rule.below")}"
                .value="${i.below}"
                @hv-change="${e=>n(t=>({...t,below:Ii(e)}))}"
              ></hv-field>
            </div>`}
        <hv-field
          kind="combo"
          .label="${e.t("overlay.rule.color")}"
          .helper="${e.t("overlay.rule.color_helper")}"
          .options="${Ci.map(e=>({value:e}))}"
          .value="${i.effect.color}"
          @hv-change="${e=>n(t=>({...t,effect:{...t.effect,color:Pi(e)}}))}"
        ></hv-field>
        <hv-field
          kind="boolean"
          .label="${e.t("overlay.rule.hide")}"
          .value="${!1===i.effect.visible}"
          @hv-change="${e=>n(t=>({...t,effect:{...t.effect,visible:!e.detail.value&&void 0}}))}"
        ></hv-field>
      </div>
    `}_nodeName(e,t){return t.name||e.t(`devices.${t.type}.name`)}_addonName(e,t,i,o){if(i.name)return i.name;const n=e.t(`addons.${i.type}.name`);if(i.slot)return`${n} – ${e.t(`slots.${i.slot}`)}`;const r=(t.addons??[]).filter(e=>e.type===i.type);if(r.length<2)return n;const s=(t.addons??[]).slice(0,o+1).filter(e=>e.type===i.type).length;return`${n} ${s}`}_addonSummary(e,t){return ii[t.type].entityless?e.t(`addons.${t.type}.hint`):t.entity_id?_i(this._hass,t.entity_id)??t.entity_id:e.t("editor.no_entity")}_portRefLabel(e,t,i){const o=t.nodes.find(e=>e.id===i.nodeId),n=oi(t,i),r=n?e.t(n.labelKey,...n.labelArgs??[]):i.portId;return o?`${this._nodeName(e,o)} › ${r}`:_e(i)}_openList(){this._view={kind:"list"}}_openNode(e){this._view={kind:"node",nodeId:e},this._selectedNodeId=e,this._selectedEdgeId=void 0}_openAddon(e,t){this._view={kind:"addon",nodeId:e,index:t}}_update(e){if(!this._config)return;const t=structuredClone(ge(this._config));e(t);const i=JSON.parse(JSON.stringify({...this._config,...t,schema_version:2}));this._config=i,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}_patchNode(e,t){this._update(i=>{const o=i.nodes.find(t=>t.id===e);o&&Object.assign(o,t)})}_moveNode(e,t){this._update(i=>{const o=i.nodes.find(t=>t.id===e);o&&(o.position={x:t.x??o.position.x,y:t.y??o.position.y})})}_rotateNode(e){this._update(t=>{const i=t.nodes.find(t=>t.id===e);i&&(i.rotation=ft((i.rotation??0)+90)||void 0)})}_addDevice(e){if(!ot(e))return;const t=be(e);this._update(i=>{const o=i.nodes.length,n={id:t,type:e,position:{x:Si+o%ki*wi,y:Ei+Math.floor(o/ki)*Ai}};e===ze.type&&(n.addons=Array.from({length:4},()=>({type:"loop"}))),i.nodes.push(n)}),this._openNode(t)}_deleteNode(e){this._update(t=>{t.nodes=t.nodes.filter(t=>t.id!==e),t.connections=t.connections.filter(t=>me(t.from)?.nodeId!==e&&me(t.to)?.nodeId!==e)}),this._selectedNodeId=void 0,this._pendingPort=void 0,this._openList()}_remaining(e,t){const i=(e.addons??[]).filter(e=>e.type===t.type).length;return function(e){return e.slots?e.slots.length:e.max}(t)-i}_addAddon(e,t){let i=-1;this._update(o=>{const n=o.nodes.find(t=>t.id===e),r=n&&ot(n.type)?.addons?.find(e=>e.type===t);if(!n||!r||this._remaining(n,r)<=0)return;const s=new Set((n.addons??[]).filter(e=>e.type===t).map(e=>e.slot)),a={type:t,slot:r.slots?.find(e=>!s.has(e))};n.addons=[...n.addons??[],a],i=n.addons.length-1}),i>=0&&!ii[t].entityless&&this._openAddon(e,i)}_patchAddon(e,t,i){this._update(o=>{const n=o.nodes.find(t=>t.id===e)?.addons?.[t];n&&Object.assign(n,i)})}_removeAddon(e,t){this._update(i=>{const o=i.nodes.find(t=>t.id===e),n=o?.addons?.[t];if(o?.addons&&n){if("loop"===n.type){const n=o.addons.slice(0,t+1).filter(e=>"loop"===e.type).length;i.connections=function(e,t,i){const o=e=>{const o=me(e),n=o?.nodeId===t?ai.exec(o.portId):null;if(!o||!n)return e;const r=Number(n[1]);return r!==i?r<i?e:_e({nodeId:t,portId:`loop_${r-1}_${n[2]}`}):void 0},n=[];for(const t of e.connections){const e=o(t.from),i=o(t.to);e&&i&&n.push({from:e,to:i})}return n}(i,e,n)}o.addons=o.addons.filter((e,i)=>i!==t),o.addons.length||(o.addons=void 0),i.connections=function(e,t){const i=e.nodes.find(e=>e.id===t),o=new Set(i?(nt(i)?.ports??[]).map(e=>e.id):[]);return e.connections.filter(e=>[e.from,e.to].every(e=>{const i=me(e);return!i||i.nodeId!==t||o.has(i.portId)}))}(i,e)}}),this._openNode(e)}_connect(e,t){this._update(i=>{const o=ni(i,e,t);o&&!ri(i,o)&&i.connections.push(o)})}_removeConnections(e){const t=new Set(e.map($e));this._update(e=>{e.connections=e.connections.filter(e=>!t.has($e(e)))})}_deleteSelectedConnection(){const e=this._selectedEdgeId;e&&(this._update(t=>{t.connections=t.connections.filter(t=>$e(t)!==e)}),this._selectedEdgeId=void 0)}_addOverlay(){this._update(e=>{e.overlays.push({id:be("ov"),position:{x:40,y:40+30*e.overlays.length},entity_id:"",template:"{{ state }}"})})}_removeOverlay(e){this._update(t=>{t.overlays=t.overlays.filter(t=>t.id!==e)})}_patchOverlay(e,t){this._update(i=>{const o=i.overlays.find(t=>t.id===e);o&&Object.assign(o,t)})}_addRule(e){this._update(t=>{const i=t.overlays.find(t=>t.id===e.id);i&&(i.rules=[...i.rules??[],{condition:"state",effect:{}}])})}_updateRule(e,t,i){this._update(o=>{const n=o.overlays.find(t=>t.id===e),r=n?.rules?.[t];if(!n?.rules||!r)return;const s=i(r);n.rules=s?n.rules.map((e,i)=>i===t?s:e):n.rules.filter((e,i)=>i!==t),n.rules.length||(n.rules=void 0)})}_onNodeSelect(e){const{nodeId:t}=e.detail;this._selectedEdgeId=void 0,"list"!==this._view.kind&&t?t!==this._view.nodeId&&this._openNode(t):this._selectedNodeId=t}_onEdgeSelect(e){this._selectedEdgeId=e.detail.edgeId,this._pendingPort=void 0}_onNodeMove(e){this._moveNode(e.detail.nodeId,e.detail.position)}_onPortClick(e){const t={nodeId:e.detail.nodeId,portId:e.detail.portId},i=this._pendingPort;i?(this._pendingPort=void 0,i.nodeId===t.nodeId&&i.portId===t.portId||this._connect(i,t)):this._pendingPort=t}};Mi.styles=s`
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
  `,e([ye()],Mi.prototype,"_hass",void 0),e([ye()],Mi.prototype,"_config",void 0),e([ye()],Mi.prototype,"_tab",void 0),e([ye()],Mi.prototype,"_view",void 0),e([ye()],Mi.prototype,"_selectedNodeId",void 0),e([ye()],Mi.prototype,"_selectedEdgeId",void 0),e([ye()],Mi.prototype,"_pendingPort",void 0),e([ye()],Mi.prototype,"_newDeviceType",void 0),e([ye()],Mi.prototype,"_newAddonType",void 0),Mi=e([pe("heating-visualizer-editor")],Mi);let Ni=class extends le{constructor(){super(...arguments),this._i18n=new $t(this,mt)}setConfig(e){if(!e||"object"!=typeof e)throw new Error("Invalid card configuration");this._config=lt(e)}getCardSize(){return 6}getGridOptions(){return{columns:12,min_columns:6}}static getConfigElement(){return document.createElement("heating-visualizer-editor")}static getStubConfig(){return{schema_version:2,...fe}}render(){if(!this._config)return B``;const e=ge(this._config),t=vt(this._i18n.value?.language);return B`
      <ha-card>
        ${e.nodes.length||e.overlays.length?B`
            <heating-schema-canvas
              .schema="${e}"
              .editable="${!1}"
            ></heating-schema-canvas>
          `:B`<div class="empty">${t.t("card.empty")}</div>`}
      </ha-card>
    `}};Ni.styles=s`
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
  `,e([ye()],Ni.prototype,"_config",void 0),Ni=e([pe("heating-visualizer-card")],Ni),window.customCards=window.customCards??[],window.customCards.push({type:"heating-visualizer-card",name:"Heating Visualizer",description:"Design and visualize heating system schemas with live sensor overlays.",preview:!0,documentationURL:"https://github.com/vasicekmilan90-eng/heating_vizualizer"}),console.info("%c HEATING-VISUALIZER-CARD %c v0.3.1 ","color: white; background: #039be5; font-weight: bold;","color: #039be5; background: white; font-weight: bold;");export{Ni as HeatingVisualizerCard};
//# sourceMappingURL=heating-visualizer-card.js.map
