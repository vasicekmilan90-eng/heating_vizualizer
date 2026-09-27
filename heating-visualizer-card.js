function t(t,e,i,o){var s,r=arguments.length,n=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(r<3?s(n):r>3?s(e,i,n):s(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new r(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:d,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,v=globalThis,_=v.trustedTypes,y=_?_.emptyScript:"",m=v.reactiveElementPolyfillSupport,g=(t,e)=>t,f={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!d(t,e),$={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&l(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const r=o?.call(this);s?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),s=e.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:f).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:f;this._$Em=o;const r=s.fromAttribute(e,t.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,e,i,o=!1,s){if(void 0!==t){const r=this.constructor;if(!1===o&&(s=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??b)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==s||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[g("elementProperties")]=new Map,x[g("finalized")]=new Map,m?.({ReactiveElement:x}),(v.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,k=t=>t,A=w.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,I=`<${P}>`,N=document,O=()=>N.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,U="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,R=/>/g,j=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,B=/"/g,L=/^(?:script|style|textarea|title)$/i,K=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=K(1),q=K(2),F=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),J=new WeakMap,Z=N.createTreeWalker(N,129);function G(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,o=[];let s,r=2===e?"<svg>":3===e?"<math>":"",n=z;for(let e=0;e<i;e++){const i=t[e];let a,d,l=-1,c=0;for(;c<i.length&&(n.lastIndex=c,d=n.exec(i),null!==d);)c=n.lastIndex,n===z?"!--"===d[1]?n=H:void 0!==d[1]?n=R:void 0!==d[2]?(L.test(d[2])&&(s=RegExp("</"+d[2],"g")),n=j):void 0!==d[3]&&(n=j):n===j?">"===d[0]?(n=s??z,l=-1):void 0===d[1]?l=-2:(l=n.lastIndex-d[2].length,a=d[1],n=void 0===d[3]?j:'"'===d[3]?B:D):n===B||n===D?n=j:n===H||n===R?n=z:(n=j,s=void 0);const h=n===j&&t[e+1].startsWith("/>")?" ":"";r+=n===z?i+I:l>=0?(o.push(a),i.slice(0,l)+S+i.slice(l)+C+h):i+C+(-2===l?e:h)}return[G(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Y{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,r=0;const n=t.length-1,a=this.parts,[d,l]=X(t,e);if(this.el=Y.createElement(d,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=Z.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(S)){const e=l[r++],i=o.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?ot:"?"===n[1]?st:"@"===n[1]?rt:it}),o.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:s}),o.removeAttribute(t));if(L.test(o.tagName)){const t=o.textContent.split(C),e=t.length-1;if(e>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],O()),Z.nextNode(),a.push({type:2,index:++s});o.append(t[e],O())}}}else if(8===o.nodeType)if(o.data===P)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(C,t+1));)a.push({type:7,index:s}),t+=C.length-1}s++}}static createElement(t,e){const i=N.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,o){if(e===F)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const r=T(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t),s._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,o)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??N).importNode(e,!0);Z.currentNode=o;let s=Z.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new et(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new nt(s,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(s=Z.nextNode(),r++)}return Z.currentNode=N,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),T(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new tt(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new Y(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new et(this.O(O()),this.O(O()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,o){const s=this.strings;let r=!1;if(void 0===s)t=Q(this,t,e,0),r=!T(t)||t!==this._$AH&&t!==F,r&&(this._$AH=t);else{const o=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=Q(this,o[i+n],e,n),a===F&&(a=this._$AH[n]),r||=!T(a)||a!==this._$AH[n],a===W?t=W:t!==W&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}r&&!o&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class st extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class rt extends it{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??W)===F)return;const i=this._$AH,o=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==W&&(i===W||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(Y,et),(w.litHtmlVersions??=[]).push("3.3.3");const dt=globalThis;class lt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let s=o._$litPart$;if(void 0===s){const t=i?.renderBefore??null;o._$litPart$=s=new et(e.insertBefore(O(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}lt._$litElement$=!0,lt.finalized=!0,dt.litElementHydrateSupport?.({LitElement:lt});const ct=dt.litElementPolyfillSupport;ct?.({LitElement:lt}),(dt.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:b},ut=(t=pt,e,i)=>{const{kind:o,metadata:s}=i;let r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,s,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const s=this[o];e.call(this,i),this.requestUpdate(o,s,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function vt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function _t(t){return vt({...t,state:!0,attribute:!1})}const yt="en",mt={nodes:[],edges:[],overlays:[]};function gt(t){return{...t,type:"custom:heating-visualizer-card",schema:(e=t.schema,{nodes:[...e?.nodes??[]],edges:[...e?.edges??[]],overlays:[...e?.overlays??[]]})};var e}function ft(t){return"undefined"!=typeof crypto&&"function"==typeof crypto.randomUUID?`${t}_${crypto.randomUUID().slice(0,8)}`:`${t}_${Math.random().toString(36).slice(2,10)}`}const bt={en:{"devices.heat_pump.name":"Heat pump","devices.heat_pump.ports.cold_in":"Cold inlet","devices.heat_pump.ports.hot_out":"Hot outlet","devices.valve_3way.name":"3-way valve","devices.valve_3way.ports.in":"Inlet","devices.valve_3way.ports.out_a":"Outlet A","devices.valve_3way.ports.out_b":"Outlet B","devices.boiler.name":"Boiler","devices.boiler.ports.cold_in":"Cold inlet","devices.boiler.ports.hot_out":"Hot outlet","devices.junction.name":"Junction","devices.junction.ports.in":"Inlet","devices.junction.ports.out_top":"Top outlet","devices.junction.ports.out_bottom":"Bottom outlet","devices.circulation_pump.name":"Circulation pump","devices.circulation_pump.ports.in":"Inlet","devices.circulation_pump.ports.out":"Outlet","devices.floor_heating.name":"Floor heating","devices.floor_heating.ports.in":"Supply","devices.floor_heating.ports.out":"Return","editor.title":"Schema editor","editor.add_device":"Add device","editor.device_type":"Device type","editor.add_selected_device":"Add selected device","editor.add_heat_pump":"Heat pump","editor.delete_selected":"Delete selected","editor.rotate_selected":"Rotate","editor.empty_hint":"Add a device to start building your schema.","editor.language":"Language","editor.translations":"Translations","editor.schema_tab":"Schema","editor.overlay_tab":"Overlays","editor.overlays_empty":"No overlays yet. Switch to overlay tab to add sensor labels.","editor.add_overlay":"Add overlay","editor.connection_pending":"Connecting from {0} — click a compatible port","editor.node_state_title":"Selected device state binding","editor.node_state_entity":"State entity","editor.node_state_active":"Active state","editor.node_state_mode_attribute":"Valve mode attribute","editor.node_state_branch_a":"Valve branch A value","editor.node_state_branch_b":"Valve branch B value","editor.language_auto":"Home Assistant language","editor.default_value":"Default: {0}","overlay.entity":"Entity","overlay.name":"Name","overlay.template":"Display template","overlay.rules":"Conditional rules","overlay.add_rule":"Add rule","overlay.rule.condition":"Condition","overlay.rule.condition_state":"State equals","overlay.rule.condition_numeric":"Numeric value","overlay.rule.entity":"Entity","overlay.rule.entity_helper":"Empty = overlay entity","overlay.rule.state":"State","overlay.rule.above":"Above","overlay.rule.below":"Below","overlay.rule.color":"Text color","overlay.rule.hide":"Hide overlay","card.empty":"No schema configured. Edit this card to design your heating layout."},cs:{"devices.heat_pump.name":"Tepelné čerpadlo","devices.heat_pump.ports.cold_in":"Studená voda – vstup","devices.heat_pump.ports.hot_out":"Teplá voda – výstup","devices.valve_3way.name":"Třícestný ventil","devices.valve_3way.ports.in":"Vstup","devices.valve_3way.ports.out_a":"Výstup A","devices.valve_3way.ports.out_b":"Výstup B","devices.boiler.name":"Bojler","devices.boiler.ports.cold_in":"Studená voda – vstup","devices.boiler.ports.hot_out":"Teplá voda – výstup","devices.junction.name":"Uzel","devices.junction.ports.in":"Vstup","devices.junction.ports.out_top":"Horní výstup","devices.junction.ports.out_bottom":"Spodní výstup","devices.circulation_pump.name":"Oběhové čerpadlo","devices.circulation_pump.ports.in":"Vstup","devices.circulation_pump.ports.out":"Výstup","devices.floor_heating.name":"Podlahové topení","devices.floor_heating.ports.in":"Přívod","devices.floor_heating.ports.out":"Vratka","editor.title":"Editor schématu","editor.add_device":"Přidat zařízení","editor.device_type":"Typ zařízení","editor.add_selected_device":"Přidat vybrané zařízení","editor.add_heat_pump":"Tepelné čerpadlo","editor.delete_selected":"Smazat vybrané","editor.rotate_selected":"Otočit","editor.empty_hint":"Přidejte zařízení a začněte sestavovat schéma.","editor.language":"Jazyk","editor.translations":"Překlady","editor.schema_tab":"Schéma","editor.overlay_tab":"Popisky","editor.overlays_empty":"Zatím žádné popisky. Přepněte na záložku Popisky.","editor.add_overlay":"Přidat popisek","editor.connection_pending":"Napojování z {0} — klikněte na kompatibilní port","editor.node_state_title":"Stavové napojení vybraného zařízení","editor.node_state_entity":"Entita stavu","editor.node_state_active":"Aktivní stav","editor.node_state_mode_attribute":"Atribut režimu ventilu","editor.node_state_branch_a":"Hodnota větve A","editor.node_state_branch_b":"Hodnota větve B","editor.language_auto":"Jazyk Home Assistantu","editor.default_value":"Výchozí: {0}","overlay.entity":"Entita","overlay.name":"Název","overlay.template":"Šablona zobrazení","overlay.rules":"Podmíněná pravidla","overlay.add_rule":"Přidat pravidlo","overlay.rule.condition":"Podmínka","overlay.rule.condition_state":"Stav je roven","overlay.rule.condition_numeric":"Číselná hodnota","overlay.rule.entity":"Entita","overlay.rule.entity_helper":"Prázdné = entita popisku","overlay.rule.state":"Stav","overlay.rule.above":"Nad","overlay.rule.below":"Pod","overlay.rule.color":"Barva textu","overlay.rule.hide":"Skrýt popisek","card.empty":"Schéma není nakonfigurováno. Upravte kartu a navrhněte topné schéma."}};class $t{constructor(t,e={}){this._language=t,this._userTranslations=e}get language(){return this._language}t(t,...e){let i=this._lookup(t);return e.forEach((t,e)=>{i=i.replace(`{${e}}`,t)}),i}_lookup(t){const e=this._userTranslations[this._language]?.[t];if(void 0!==e)return e;const i=bt[this._language]?.[t];if(void 0!==i)return i;const o=this._userTranslations[yt]?.[t];if(void 0!==o)return o;const s=bt[yt]?.[t];return void 0!==s?s:t}getAvailableLanguages(){return[...new Set([...Object.keys(bt),...Object.keys(this._userTranslations)])].sort()}getEditableTranslations(){return{...bt[yt]??{},...bt[this._language]??{},...this._userTranslations[this._language]??{}}}}function xt(t,e){const i=e??{};return new $t(function(t,e){if(!t)return yt;if(bt[t]||e[t])return t;const i=t.split("-")[0];return bt[i]||e[i]?i:t}(t,i),i)}const wt="states",kt="hassFormatters",At="hassInternationalization";class Et{constructor(t,e){this._host=t,this._context=e,this._callback=(t,e)=>{this._unsubscribe&&this._unsubscribe!==e&&this._unsubscribe(),this._unsubscribe=e,t!==this.value&&(this.value=t,this._host.requestUpdate())},t.addController(this)}hostConnected(){const t=new Event("context-request",{bubbles:!0,composed:!0});t.context=this._context,t.contextTarget=this._host,t.callback=this._callback,t.subscribe=!0,this._host.dispatchEvent(t)}hostDisconnected(){this._unsubscribe?.(),this._unsubscribe=void 0}}const St={type:"heat_pump",labelKey:"devices.heat_pump.name",width:120,height:100,ports:[{id:"cold_in",labelKey:"devices.heat_pump.ports.cold_in",kind:"inlet",position:{x:0,y:70}},{id:"hot_out",labelKey:"devices.heat_pump.ports.hot_out",kind:"outlet",position:{x:120,y:30}}]},Ct={type:"valve_3way",labelKey:"devices.valve_3way.name",width:100,height:100,ports:[{id:"in",labelKey:"devices.valve_3way.ports.in",kind:"inlet",position:{x:0,y:50}},{id:"out_a",labelKey:"devices.valve_3way.ports.out_a",kind:"outlet",position:{x:100,y:25}},{id:"out_b",labelKey:"devices.valve_3way.ports.out_b",kind:"outlet",position:{x:100,y:75}}]},Pt={type:"boiler",labelKey:"devices.boiler.name",width:90,height:140,ports:[{id:"cold_in",labelKey:"devices.boiler.ports.cold_in",kind:"inlet",position:{x:0,y:110}},{id:"hot_out",labelKey:"devices.boiler.ports.hot_out",kind:"outlet",position:{x:90,y:30}}]},It={type:"junction",labelKey:"devices.junction.name",width:60,height:60,ports:[{id:"in",labelKey:"devices.junction.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out_top",labelKey:"devices.junction.ports.out_top",kind:"outlet",position:{x:60,y:15}},{id:"out_bottom",labelKey:"devices.junction.ports.out_bottom",kind:"outlet",position:{x:60,y:45}}]},Nt={type:"circulation_pump",labelKey:"devices.circulation_pump.name",width:90,height:90,ports:[{id:"in",labelKey:"devices.circulation_pump.ports.in",kind:"inlet",position:{x:0,y:45}},{id:"out",labelKey:"devices.circulation_pump.ports.out",kind:"outlet",position:{x:90,y:45}}]},Ot={type:"floor_heating",labelKey:"devices.floor_heating.name",width:140,height:90,ports:[{id:"in",labelKey:"devices.floor_heating.ports.in",kind:"inlet",position:{x:0,y:45}},{id:"out",labelKey:"devices.floor_heating.ports.out",kind:"outlet",position:{x:140,y:45}}]},Tt=[St.type,Ct.type,Pt.type,It.type,Nt.type,Ot.type],Mt=new Map([[St.type,St],[Ct.type,Ct],[Pt.type,Pt],[It.type,It],[Nt.type,Nt],[Ot.type,Ot]]);function Ut(t){return Mt.get(t)}function zt(t){return((t??0)%360+360)%360}function Ht(t,e){const i=e*Math.PI/180,o=Math.cos(i),s=Math.sin(i);return{x:Math.round(1e3*(t.x*o-t.y*s))/1e3,y:Math.round(1e3*(t.x*s+t.y*o))/1e3}}function Rt(t,e){const{x:i,y:o}=e.position,s=[[i,{x:-1,y:0}],[t.width-i,{x:1,y:0}],[o,{x:0,y:-1}],[t.height-o,{x:0,y:1}]];return s.sort((t,e)=>t[0]-e[0]),s[0][1]}function jt(t,e){const i=Ut(t.type);if(!i)return;const o=i.ports.find(t=>t.id===e);if(!o)return;const s=zt(t.rotation),r=i.width/2,n=i.height/2,a=Ht({x:o.position.x-r,y:o.position.y-n},s);return{nodeId:t.id,portId:o.id,x:t.position.x+r+a.x,y:t.position.y+n+a.y,kind:o.kind,direction:Ht(Rt(i,o),s)}}function Dt(t,e){const i=zt(t.rotation)%180!=0,o=i?e.height:e.width,s=i?e.width:e.height;return{x:t.position.x+(e.width-o)/2,y:t.position.y+(e.height-s)/2,width:o,height:s}}function Bt(t,e){return t.nodeId===e.nodeId&&t.portId===e.portId}function Lt(t,e=10){return Math.round(t/e)*e}function Kt(t,e,i){if(!t||!i.entity_id)return"—";const o=t[i.entity_id];if(!o)return"—";if(i.template)return function(t,e,i){return t.replace(/\{\{\s*state\s*\}\}/g,e).replace(/\{\{\s*attr\(['"](\w+)['"]\)\s*\}\}/g,(t,e)=>String(i[e]??""))}(i.template,o.state,o.attributes);if(e)return e.formatEntityState(o);const s=o.attributes.unit_of_measurement;return s?`${o.state} ${s}`:o.state}const Vt=new Set(["primary","accent","disabled","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"]);function qt(t){return Vt.has(t)?`var(--${t}-color)`:t}function Ft(t,e,i){const o=t[e.entity||i];if(!o)return!1;if("state"===e.condition)return void 0!==e.state&&o.state===e.state;if(void 0===e.above&&void 0===e.below)return!1;const s=Number(o.state);return!Number.isNaN(s)&&((void 0===e.above||s>e.above)&&(void 0===e.below||s<e.below))}function Wt(t,e){return t.ports.map(t=>q`
    <circle
      class="port port-${t.kind}"
      data-port-id="${t.id}"
      cx="${t.position.x}" cy="${t.position.y}" r="5"
      fill="var(--card-background-color, #1c1c1c)"
      stroke="${"inlet"===t.kind?"#4fc3f7":"#ff8a65"}"
      stroke-width="2"
    />
    <title>${e.t(t.labelKey)}</title>
  `)}function Jt(t,e,i,o,s){switch(t){case"heat_pump":return function(t,e,i,o){const s=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",r=i?2.5:1.5;return q`
    <g class="device device-heat-pump">
      <rect
        x="10" y="15" width="100" height="70" rx="8"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${s}" stroke-width="${r}"
      />
      <circle cx="60" cy="50" r="22"
        fill="none" stroke="${s}" stroke-width="${r}"
      />
      <path d="M 48 50 L 72 50 M 60 38 L 60 62"
        stroke="var(--primary-color, #03a9f4)" stroke-width="2" stroke-linecap="round"
      />
      ${Wt(t,e)}
    </g>
  `}(e,i,o,s);case"valve_3way":return function(t,e,i,o){const s=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",r=i?2.5:1.5,n="a"===o.valveBranch?"#4caf50":"var(--divider-color, #555)",a="b"===o.valveBranch?"#4caf50":"var(--divider-color, #555)";return q`
    <g class="device device-valve-3way">
      <polygon
        points="10,50 45,15 45,35 90,35 90,65 45,65 45,85"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${s}" stroke-width="${r}"
      />
      <line x1="45" y1="50" x2="90" y2="25" stroke="${n}" stroke-width="3" />
      <line x1="45" y1="50" x2="90" y2="75" stroke="${a}" stroke-width="3" />
      ${Wt(t,e)}
    </g>
  `}(e,i,o,s);case"boiler":return function(t,e,i,o){const s=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return q`
    <g class="device device-boiler">
      <rect
        x="10" y="10" width="70" height="120" rx="18"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${s}" stroke-width="${i?2.5:1.5}"
      />
      <path d="M 30 35 L 60 35 M 30 55 L 60 55 M 30 75 L 60 75"
        stroke="var(--primary-color, #03a9f4)" stroke-width="2" stroke-linecap="round" />
      ${Wt(t,e)}
    </g>
  `}(e,i,o,s);case"junction":return function(t,e,i,o){const s=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return q`
    <g class="device device-junction">
      <circle
        cx="30" cy="30" r="18"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${s}" stroke-width="${i?2.5:1.5}"
      />
      ${Wt(t,e)}
    </g>
  `}(e,i,o,s);case"circulation_pump":return function(t,e,i,o){const s=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return q`
    <g class="device device-circulation-pump">
      <circle
        cx="45" cy="45" r="28"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${s}" stroke-width="${i?2.5:1.5}"
      />
      <path d="M 32 52 A 14 14 0 0 1 58 38"
        fill="none" stroke="var(--primary-color, #03a9f4)" stroke-width="2" stroke-linecap="round" />
      <polygon points="58,38 52,38 56,32" fill="var(--primary-color, #03a9f4)" />
      ${Wt(t,e)}
    </g>
  `}(e,i,o,s);case"floor_heating":return function(t,e,i,o){const s=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return q`
    <g class="device device-floor-heating">
      <rect
        x="10" y="18" width="120" height="55" rx="8"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${s}" stroke-width="${i?2.5:1.5}"
      />
      <path d="M 20 40 C 35 30, 50 50, 65 40 C 80 30, 95 50, 110 40 C 115 37, 120 37, 126 40"
        fill="none" stroke="var(--primary-color, #03a9f4)" stroke-width="2" />
      ${Wt(t,e)}
    </g>
  `}(e,i,o,s);default:return}}let Zt=class extends lt{constructor(){super(...arguments),this.schema={nodes:[],edges:[],overlays:[]},this.editable=!1,this._states=new Et(this,wt),this._formatters=new Et(this,kt),this._i18n=new Et(this,At)}updated(t){t.has("editable")&&this.toggleAttribute("editable",this.editable)}render(){const t=this._translator(),{nodes:e,edges:i,overlays:o}=this.schema,s=this._dragBounds??this._computeBounds(e);return V`
      <svg
        viewBox="${s.x} ${s.y} ${s.width} ${s.height}"
        @pointerdown="${this._onCanvasPointerDown}"
        @pointermove="${this._onCanvasPointerMove}"
        @pointerup="${this._onCanvasPointerUp}"
        @pointerleave="${this._onCanvasPointerUp}"
      >
        ${this.editable?q`
            <defs>
              <pattern id="grid" width="${20}" height="${20}" patternUnits="userSpaceOnUse">
                <circle class="grid-dot" cx="0" cy="0" r="1" />
              </pattern>
            </defs>
            <rect x="${s.x}" y="${s.y}" width="${s.width}" height="${s.height}" fill="url(#grid)" />
          `:W}
        ${i.map(t=>this._renderEdge(t))}
        ${e.map(e=>this._renderNode(e,t))}
        ${o.map(e=>this._renderOverlay(e,t))}
      </svg>
    `}_translator(){return xt(this.config?.language??this._i18n.value?.language,this.config?.translations)}_computeBounds(t){if(!t.length)return{x:0,y:0,width:800,height:400};let e=1/0,i=1/0,o=-1/0,s=-1/0;for(const r of t){const t=Ut(r.type);if(!t)continue;const n=Dt(r,t);e=Math.min(e,n.x),i=Math.min(i,n.y-20),o=Math.max(o,n.x+n.width),s=Math.max(s,n.y+n.height+10)}return{x:e-40,y:i-40,width:o-e+80,height:s-i+80}}_renderEdge(t){const e=this.schema.nodes.find(e=>e.id===t.from.nodeId),i=this.schema.nodes.find(e=>e.id===t.to.nodeId);if(!e||!i)return V``;const o=jt(e,t.from.portId),s=jt(i,t.to.portId);if(!o||!s)return V``;const r=function(t,e){const i=Math.hypot(e.x-t.x,e.y-t.y),o=Math.max(30,i/2),s=t.x+t.direction.x*o,r=t.y+t.direction.y*o,n=e.x+e.direction.x*o,a=e.y+e.direction.y*o;return`M ${t.x} ${t.y} C ${s} ${r}, ${n} ${a}, ${e.x} ${e.y}`}(o,s),n=this.selectedEdgeId===t.id;return q`
      <path class="pipe ${n?"selected":""}" d="${r}" />
      ${this.editable?q`<path class="pipe-hit" data-edge-id="${t.id}" d="${r}" />`:W}
    `}_renderNode(t,e){const i=Ut(t.type);if(!i)return V``;const o=this.selectedNodeId===t.id,s=function(t,e){if(!t||!e?.entity_id)return{active:!1};const i=t[e.entity_id];if(!i)return{active:!1};const o=e.active_state??"on",s=i.state===o||"on"===o&&"heat"===i.state,r=e.mode_attribute??"position",n=String(i.attributes[r]??i.state??"");let a;return n===(e.branch_a_value??"a")&&(a="a"),n===(e.branch_b_value??"b")&&(a="b"),{active:s,valveBranch:a}}(this._states.value,t.state),r=Jt(t.type,i,e,o,s);if(!r)return V``;const n=zt(t.rotation),a=Dt(t,i).y-t.position.y-4;return q`
      <g
        class="node ${this._dragNodeId===t.id?"dragging":""}"
        data-node-id="${t.id}"
        transform="translate(${t.position.x} ${t.position.y})"
      >
        <g transform="rotate(${n} ${i.width/2} ${i.height/2})">
          ${r}
        </g>
        <text x="${i.width/2}" y="${a}" text-anchor="middle" class="device-label">
          ${e.t(i.labelKey)}
        </text>
      </g>
    `}_renderOverlay(t,e){const i=this._states.value,o=this._formatters.value,s=Kt(i,o,t),r=function(t,e){let i,o,s=!0;if(!t||!e.rules?.length)return{color:i,className:o,visible:s};for(const r of e.rules)Ft(t,r,e.entity_id)&&(r.effect.color&&(i=qt(r.effect.color)),r.effect.class&&(o=r.effect.class),void 0!==r.effect.visible&&(s=r.effect.visible));return{color:i,className:o,visible:s}}(i,t);if(!r.visible)return V``;const n=t.labelKey?e.t(t.labelKey):function(t,e,i){const o=t?.[i.entity_id];return o&&e?e.formatEntityName(o,i.name):"string"==typeof i.name?i.name:i.entity_id}(i,o,t),a=`${n}: ${s}`,d=Math.max(80,7*a.length+16);return q`
      <g class="overlay-group ${r.className??""}" transform="translate(${t.position.x} ${t.position.y})">
        <rect class="overlay-bg" x="0" y="0" width="${d}" height="22" rx="4" />
        <text class="overlay-text" x="8" y="15" fill="${r.color??"var(--primary-text-color, #e0e0e0)"}">
          ${a}
        </text>
      </g>
    `}_onCanvasPointerDown(t){if(!this.editable)return;const e=t.target,i=e?.getAttribute?.("data-edge-id");if(i)return void this.dispatchEvent(new CustomEvent("edge-select",{detail:{edgeId:i},bubbles:!0,composed:!0}));const o=e?.closest?.("[data-node-id]");if(!o)return void this._dispatchSelect(void 0);const s=o.getAttribute("data-node-id");if(!s)return;const r=this.schema.nodes.find(t=>t.id===s);if(!r)return;const n=e?.closest?.("[data-port-id]");if(n){const e=n.getAttribute("data-port-id");if(e)return this._dispatchPortClick(s,e),void t.stopPropagation()}this._dragNodeId=s;const a=this._toLocal(t);this._dragOffset=a?{x:a.x-r.position.x,y:a.y-r.position.y}:{x:0,y:0},this._dragBounds=this._computeBounds(this.schema.nodes),o.setPointerCapture(t.pointerId),this._dispatchSelect(s),t.preventDefault()}_toLocal(t){const e=this.renderRoot.querySelector("svg"),i=e?.getScreenCTM();if(!e||!i)return;const o=e.createSVGPoint();return o.x=t.clientX,o.y=t.clientY,o.matrixTransform(i.inverse())}_onCanvasPointerMove(t){if(!this.editable||!this._dragNodeId)return;const e=this.schema.nodes.find(t=>t.id===this._dragNodeId),i=this._toLocal(t);if(!e||!i)return;const o=this._dragOffset??{x:0,y:0},s={x:Lt(i.x-o.x,10),y:Lt(i.y-o.y,10)};s.x===e.position.x&&s.y===e.position.y||this.dispatchEvent(new CustomEvent("node-move",{detail:{nodeId:e.id,position:s},bubbles:!0,composed:!0}))}_onCanvasPointerUp(t){if(this._dragNodeId){const e=this.renderRoot.querySelector(`[data-node-id="${this._dragNodeId}"]`);e?.releasePointerCapture(t.pointerId),this._dragNodeId=void 0,this._dragOffset=void 0,this._dragBounds=void 0,this.requestUpdate()}}_dispatchSelect(t){this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:t},bubbles:!0,composed:!0}))}_dispatchPortClick(t,e){this.dispatchEvent(new CustomEvent("port-click",{detail:{nodeId:t,portId:e},bubbles:!0,composed:!0}))}};Zt.styles=n`
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
    .device-label {
      fill: var(--primary-text-color, #e0e0e0);
      font-size: var(--ha-font-size-xs, 11px);
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
  `,t([vt({attribute:!1})],Zt.prototype,"schema",void 0),t([vt({attribute:!1})],Zt.prototype,"config",void 0),t([vt({type:Boolean})],Zt.prototype,"editable",void 0),t([vt({attribute:!1})],Zt.prototype,"selectedNodeId",void 0),t([vt({attribute:!1})],Zt.prototype,"selectedEdgeId",void 0),t([vt({attribute:!1})],Zt.prototype,"selectedPort",void 0),Zt=t([ht("heating-schema-canvas")],Zt);const Gt={entity_id:"editor.node_state_entity",active_state:"editor.node_state_active",mode_attribute:"editor.node_state_mode_attribute",branch_a_value:"editor.node_state_branch_a",branch_b_value:"editor.node_state_branch_b"},Xt={active_state:"on",mode_attribute:"position",branch_a_value:"a",branch_b_value:"b"},Yt={entity_id:"overlay.entity",name:"overlay.name",template:"overlay.template"},Qt=[{name:"entity_id",selector:{entity:{}}},{name:"name",selector:{entity_name:{}},context:{entity:"entity_id"}},{name:"template",selector:{text:{}}},{type:"grid",name:"position",schema:[{name:"x",selector:{number:{mode:"box"}}},{name:"y",selector:{number:{mode:"box"}}}]}];function te(t){return Object.fromEntries(Object.entries(t).filter(([,t])=>null!=t&&""!==t))}const ee={condition:"overlay.rule.condition",entity:"overlay.rule.entity",state:"overlay.rule.state",above:"overlay.rule.above",below:"overlay.rule.below",color:"overlay.rule.color",hide:"overlay.rule.hide"},ie={entity:"overlay.rule.entity_helper"};let oe=class extends lt{constructor(){super(...arguments),this._tab="schema",this._selectedDeviceType=St.type,this._translationEdits={},this._formReady=void 0!==customElements.get("ha-form")}set hass(t){this._hass=t,this.requestUpdate()}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this._formReady||this._loadHaForm()}setConfig(t){this._config=gt(t),this._translationEdits={...this._translator().getEditableTranslations()},this.requestUpdate()}render(){if(!this._config)return V``;const t=this._translator();return V`
      <div class="editor">
        <div class="tabs">
          <button
            type="button"
            class="${"schema"===this._tab?"active":""}"
            @click="${()=>{this._tab="schema"}}"
          >${t.t("editor.schema_tab")}</button>
          <button
            type="button"
            class="${"overlays"===this._tab?"active":""}"
            @click="${()=>{this._tab="overlays"}}"
          >${t.t("editor.overlay_tab")}</button>
          <button
            type="button"
            class="${"translations"===this._tab?"active":""}"
            @click="${()=>{this._tab="translations"}}"
          >${t.t("editor.translations")}</button>
        </div>

        ${"schema"===this._tab?this._renderSchemaTab(t):W}
        ${"overlays"===this._tab?this._renderOverlaysTab(t):W}
        ${"translations"===this._tab?this._renderTranslationsTab(t):W}
      </div>
    `}_renderSchemaTab(t){const e=this._config.schema,i=e.nodes.find(t=>t.id===this._selectedNodeId);return V`
      <div class="toolbar">
        <label>${t.t("editor.device_type")}</label>
        <select
          .value="${this._selectedDeviceType}"
          @change="${t=>{this._selectedDeviceType=t.target.value}}"
        >
          ${Tt.map(e=>V`
            <option value="${e}">
              ${t.t(`devices.${e}.name`)}
            </option>
          `)}
        </select>
        <select
          .value="${this._config.language??""}"
          @change="${this._onLanguageChange}"
        >
          <option value="">${t.t("editor.language_auto")}</option>
          ${t.getAvailableLanguages().map(t=>V`<option value="${t}">${t}</option>`)}
        </select>
        <button
          type="button"
          class="primary"
          @click="${t=>this._onAddDeviceClick(t)}"
        >
          ${t.t("editor.add_selected_device")}
        </button>
        <button
          type="button"
          class="primary"
          @click="${t=>this._onAddHeatPumpClick(t)}"
        >
          ${t.t("editor.add_heat_pump")}
        </button>
        ${this._selectedNodeId?V`
            <button type="button" @click="${t=>this._onRotateSelectedClick(t)}">
              ↻ ${t.t("editor.rotate_selected")}
            </button>
          `:W}
        ${this._selectedNodeId||this._selectedEdgeId?V`
            <button type="button" class="danger" @click="${t=>this._onDeleteSelectedClick(t)}">
              ${t.t("editor.delete_selected")}
            </button>
          `:W}
      </div>

      ${this._pendingPort?V`<p class="connection-hint">
            ${t.t("editor.connection_pending",this._portLabel(t,this._pendingPort))}
          </p>`:W}

      ${e.nodes.length?W:V`<p class="hint">${t.t("editor.empty_hint")}</p>`}

      <heating-schema-canvas
        .config="${this._config}"
        .schema="${e}"
        .editable="${!0}"
        .selectedNodeId="${this._selectedNodeId}"
        .selectedEdgeId="${this._selectedEdgeId}"
        @node-select="${this._onNodeSelect}"
        @edge-select="${this._onEdgeSelect}"
        @node-move="${this._onNodeMove}"
        @port-click="${this._onPortClick}"
      ></heating-schema-canvas>

      ${i?V`
          <div class="overlay-item">
            <header>
              <span>${t.t("editor.node_state_title")}</span>
              <span>${t.t(`devices.${i.type}.name`)}</span>
            </header>
            ${this._renderForm(t,function(t){const e=[{name:"entity_id",selector:{entity:{}}},{name:"active_state",selector:{state:{}},context:{filter_entity:"entity_id"}}];if("valve_3way"===t){const t={filter_entity:"entity_id",filter_attribute:"mode_attribute"};e.push({name:"mode_attribute",selector:{attribute:{}},context:{filter_entity:"entity_id"}},{name:"branch_a_value",selector:{state:{}},context:t},{name:"branch_b_value",selector:{state:{}},context:t})}return e}(i.type),{...i.state??{}},Gt,t=>this._setNodeState(i.id,t))}
          </div>
        `:W}
    `}_renderOverlaysTab(t){const e=this._config.schema?.overlays??[];return V`
      <div class="toolbar">
        <button type="button" class="primary" @click="${this._addOverlay}">
          ${t.t("editor.add_overlay")}
        </button>
      </div>

      ${e.length?W:V`<p class="hint">${t.t("editor.overlays_empty")}</p>`}

      <heating-schema-canvas
        .config="${this._config}"
        .schema="${this._config.schema}"
        .editable="${!1}"
      ></heating-schema-canvas>

      ${e.map((e,i)=>V`
        <div class="overlay-item">
          <header>
            <span>${e.entity_id||`Overlay ${i+1}`}</span>
            <button type="button" class="danger" @click="${()=>this._removeOverlay(e.id)}">×</button>
          </header>
          ${this._renderForm(t,Qt,{entity_id:e.entity_id,name:e.name,template:e.template,position:e.position},Yt,t=>this._onOverlayFormChange(e.id,t))}
          <div class="rules">
            <header>
              <span>${t.t("overlay.rules")}</span>
              <button type="button" @click="${()=>this._addRule(e)}">
                ${t.t("overlay.add_rule")}
              </button>
            </header>
            ${(e.rules??[]).map((i,o)=>V`
              <div class="rule">
                <button
                  type="button"
                  class="danger remove-rule"
                  @click="${()=>this._updateRules(e.id,t=>t.filter((t,e)=>e!==o))}"
                >×</button>
                ${this._renderForm(t,function(t){const e={field:"condition",value:"numeric"};return[{name:"condition",selector:{select:{mode:"dropdown",options:[{value:"state",label:t.t("overlay.rule.condition_state")},{value:"numeric",label:t.t("overlay.rule.condition_numeric")}]}}},{name:"entity",selector:{entity:{}}},{name:"state",selector:{state:{}},context:{filter_entity:"entity"},visible:{field:"condition",value:"state"}},{name:"above",selector:{number:{mode:"box",step:"any"}},visible:e},{name:"below",selector:{number:{mode:"box",step:"any"}},visible:e},{name:"color",selector:{ui_color:{}}},{name:"hide",selector:{boolean:{}}}]}(t),function(t){return{condition:t.condition,entity:t.entity,state:t.state,above:t.above,below:t.below,color:t.effect.color,hide:!1===t.effect.visible}}(i),ee,t=>this._updateRules(e.id,e=>e.map((e,i)=>i===o?function(t,e){const i=te(t),o=i.condition??"state",s=t=>void 0===t?void 0:Number(t);return{condition:o,entity:i.entity,state:"state"===o?i.state:void 0,above:"numeric"===o?s(i.above):void 0,below:"numeric"===o?s(i.below):void 0,effect:{...e.effect,color:i.color,visible:!i.hide&&void 0}}}(t,e):e)),ie)}
              </div>
            `)}
          </div>
        </div>
      `)}
    `}_renderForm(t,e,i,o,s,r={}){const n=e=>o[e.name]?t.t(o[e.name]):e.name.toUpperCase(),a=e=>{if(r[e.name])return t.t(r[e.name]);const i=Xt[e.name];return void 0!==i?t.t("editor.default_value",i):void 0};return this._formReady&&this._hass?V`
        <ha-form
          .hass="${this._hass}"
          .data="${i}"
          .schema="${e}"
          .computeLabel="${n}"
          .computeHelper="${a}"
          @value-changed="${t=>{t.stopPropagation(),s(t.detail.value)}}"
        ></ha-form>
      `:V`${e.map(t=>"schema"in t?t.schema.map(e=>this._renderFallbackField(e,t.name,i,n,s)):this._renderFallbackField(t,void 0,i,n,s))}`}_renderFallbackField(t,e,i,o,s){if("entity_name"in t.selector)return W;if(t.visible&&i[t.visible.field]!==t.visible.value)return W;const r=e?i[e]??{}:i,n=o=>{const n={...r,[t.name]:o};s(e?{...i,[e]:n}:n)};if("boolean"in t.selector)return V`
        <div class="field">
          <label>
            <input
              type="checkbox"
              .checked="${Boolean(r[t.name])}"
              @change="${t=>n(t.target.checked)}"
            />
            ${o(t)}
          </label>
        </div>
      `;const a=t.selector.select;if(a)return V`
        <div class="field">
          <label>${o(t)}</label>
          <select
            .value="${String(r[t.name]??"")}"
            @change="${t=>n(t.target.value)}"
          >
            ${a.options.map(t=>V`<option value="${t.value}">${t.label}</option>`)}
          </select>
        </div>
      `;const d="number"in t.selector;return V`
      <div class="field">
        <label>${o(t)}</label>
        <input
          type="${d?"number":"text"}"
          .value="${String(r[t.name]??"")}"
          @change="${t=>{const e=t.target.value;n(d&&""!==e?Number(e):e)}}"
        />
      </div>
    `}_renderTranslationsTab(t){const e=Object.entries(this._translationEdits).sort(([t],[e])=>t.localeCompare(e));return V`
      <p class="hint">${t.t("editor.language")}: ${t.language}</p>
      ${e.map(([t,e])=>V`
        <div class="translation-item">
          <header><code>${t}</code></header>
          <input
            .value="${e}"
            @input="${e=>this._onTranslationInput(t,e.target.value)}"
          />
        </div>
      `)}
    `}_emitConfig(t,e){const i=JSON.parse(JSON.stringify(gt({...this._config,...e,schema:t})));this._config=i,this.requestUpdate(),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}_onAddDeviceClick(t){t.preventDefault(),t.stopPropagation(),this._addDevice(this._selectedDeviceType)}_onAddHeatPumpClick(t){t.preventDefault(),t.stopPropagation(),this._selectedDeviceType=St.type,this._addDevice(St.type)}_onDeleteSelectedClick(t){t.preventDefault(),t.stopPropagation(),this._deleteSelected()}_onRotateSelectedClick(t){t.preventDefault(),t.stopPropagation();const e=this._selectedNodeId;if(!e)return;const i=this._cloneSchema();i.nodes=i.nodes.map(t=>{if(t.id!==e)return t;const i=zt((t.rotation??0)+90);return{...t,rotation:i||void 0}}),this._emitConfig(i)}_addDevice(t){if(!Ut(t))return;const e=this._cloneSchema(),i=30*e.nodes.length,o={id:ft(t),type:t,position:{x:80+i,y:80+i}};e.nodes.push(o),this._selectedNodeId=o.id,this._emitConfig(e)}_deleteSelected(){const t=this._cloneSchema();if(this._selectedEdgeId){const e=this._selectedEdgeId;return t.edges=t.edges.filter(t=>t.id!==e),this._selectedEdgeId=void 0,void this._emitConfig(t)}if(!this._selectedNodeId)return;const e=this._selectedNodeId;t.nodes=t.nodes.filter(t=>t.id!==e),t.edges=t.edges.filter(t=>t.from.nodeId!==e&&t.to.nodeId!==e),this._selectedNodeId=void 0,this._pendingPort=void 0,this._emitConfig(t)}_addOverlay(){const t=this._cloneSchema(),e={id:ft("ov"),position:{x:40,y:40+30*t.overlays.length},entity_id:"",template:"{{ state }}"};t.overlays.push(e),this._emitConfig(t)}_removeOverlay(t){const e=this._cloneSchema();e.overlays=e.overlays.filter(e=>e.id!==t),this._emitConfig(e)}_updateOverlay(t,e){const i=this._cloneSchema();i.overlays=i.overlays.map(i=>i.id===t?{...i,...e}:i),this._emitConfig(i)}_onLanguageChange(t){const e=t.target.value,i={...this._config};e?i.language=e:delete i.language,this._config=i,this._translationEdits={...this._translator().getEditableTranslations()},this._emitConfig(this._cloneSchema())}_onTranslationInput(t,e){this._translationEdits={...this._translationEdits,[t]:e};const i=this._translator().language,o={...this._config.translations,[i]:{...this._config.translations?.[i]??{},[t]:e}};this._emitConfig(this._cloneSchema(),{translations:o})}_onNodeSelect(t){this._selectedNodeId=t.detail.nodeId,this._selectedEdgeId=void 0}_onEdgeSelect(t){this._selectedEdgeId=t.detail.edgeId,this._selectedNodeId=void 0,this._pendingPort=void 0}_onNodeMove(t){const e=this._cloneSchema();e.nodes=e.nodes.map(e=>e.id===t.detail.nodeId?{...e,position:t.detail.position}:e),this._emitConfig(e)}_setNodeState(t,e){const i=te(e),o=this._cloneSchema();o.nodes=o.nodes.map(e=>e.id===t?{...e,state:Object.keys(i).length?i:void 0}:e),this._emitConfig(o)}_addRule(t){this._updateRules(t.id,e=>[...e,{condition:"state",entity:t.entity_id||void 0,effect:{}}])}_updateRules(t,e){const i=this._config.schema?.overlays.find(e=>e.id===t);if(!i)return;const o=e([...i.rules??[]]);this._updateOverlay(t,{rules:o.length?o:void 0})}_onOverlayFormChange(t,e){const i=te(e),o=i.position??{};this._updateOverlay(t,{entity_id:i.entity_id??"",name:i.name,template:i.template,position:{x:Number(o.x??0),y:Number(o.y??0)}})}_translator(){return xt(this._config?.language??this._hass?.language,this._config?.translations)}async _loadHaForm(){try{const t=await(window.loadCardHelpers?.()),e=t?.createCardElement({type:"button"}),i=e?.constructor;await(i?.getConfigElement?.()),await customElements.whenDefined("ha-form"),this._formReady=!0}catch{}}_onPortClick(t){const{nodeId:e,portId:i}=t.detail,o={nodeId:e,portId:i};if(!this._pendingPort)return void(this._pendingPort=o);if(Bt(this._pendingPort,o))return void(this._pendingPort=void 0);const s=this._cloneSchema(),r=this._createEdge(this._pendingPort,o,s.edges);r&&(s.edges.push(r),this._emitConfig(s)),this._pendingPort=void 0}_createEdge(t,e,i){const o=this._orderPorts(t,e);if(!o)return;const s=i.some(t=>Bt(t.from,o.from)&&Bt(t.to,o.to));return s?void 0:{id:ft("edge"),from:o.from,to:o.to}}_orderPorts(t,e){const i=this._config.schema?.nodes.find(e=>e.id===t.nodeId),o=this._config.schema?.nodes.find(t=>t.id===e.nodeId);if(!i||!o)return;const s=Ut(i.type),r=Ut(o.type);if(!s||!r)return;const n=s.ports.find(e=>e.id===t.portId),a=r.ports.find(t=>t.id===e.portId);return n&&a?"outlet"===n.kind&&"inlet"===a.kind?{from:t,to:e}:"outlet"===a.kind&&"inlet"===n.kind?{from:e,to:t}:void 0:void 0}_portLabel(t,e){const i=this._config.schema?.nodes.find(t=>t.id===e.nodeId);if(!i)return e.portId;const o=Ut(i.type),s=o?.ports.find(t=>t.id===e.portId);return s?t.t(s.labelKey):e.portId}_cloneSchema(){const t=this._config.schema??{nodes:[],edges:[],overlays:[]};return{nodes:(t.nodes??[]).map(t=>({...t,position:{...t.position},state:t.state?{...t.state}:void 0})),edges:(t.edges??[]).map(t=>({...t,from:{...t.from},to:{...t.to}})),overlays:(t.overlays??[]).map(t=>({...t,position:{...t.position},rules:t.rules?.map(t=>({...t,effect:{...t.effect}}))}))}}};oe.styles=n`
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
  `,t([_t()],oe.prototype,"_config",void 0),t([_t()],oe.prototype,"_tab",void 0),t([_t()],oe.prototype,"_selectedNodeId",void 0),t([_t()],oe.prototype,"_selectedEdgeId",void 0),t([_t()],oe.prototype,"_pendingPort",void 0),t([_t()],oe.prototype,"_selectedDeviceType",void 0),t([_t()],oe.prototype,"_translationEdits",void 0),t([_t()],oe.prototype,"_formReady",void 0),oe=t([ht("heating-visualizer-editor")],oe);let se=class extends lt{constructor(){super(...arguments),this._i18n=new Et(this,At)}setConfig(t){if(!t||"object"!=typeof t)throw new Error("Invalid card configuration");this._config=gt(t)}getCardSize(){return 6}getGridOptions(){return{columns:12,min_columns:6}}static getConfigElement(){return document.createElement("heating-visualizer-editor")}static getStubConfig(){return{schema:mt}}render(){if(!this._config)return V``;const t=this._config.schema,e=xt(this._config.language??this._i18n.value?.language,this._config.translations);return V`
      <ha-card>
        ${t.nodes.length||t.overlays.length?V`
            <heating-schema-canvas
              .config="${this._config}"
              .schema="${t}"
              .editable="${!1}"
            ></heating-schema-canvas>
          `:V`<div class="empty">${e.t("card.empty")}</div>`}
      </ha-card>
    `}};se.styles=n`
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
  `,t([_t()],se.prototype,"_config",void 0),se=t([ht("heating-visualizer-card")],se),window.customCards=window.customCards??[],window.customCards.push({type:"heating-visualizer-card",name:"Heating Visualizer",description:"Design and visualize heating system schemas with live sensor overlays.",preview:!0,documentationURL:"https://github.com/vasicekmilan90-eng/heating_vizualizer"}),console.info("%c HEATING-VISUALIZER-CARD %c v0.2.0 ","color: white; background: #039be5; font-weight: bold;","color: #039be5; background: white; font-weight: bold;");export{se as HeatingVisualizerCard};
//# sourceMappingURL=heating-visualizer-card.js.map
