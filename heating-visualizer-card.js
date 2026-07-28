function t(t,e,i,o){var s,n=arguments.length,r=n<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,o);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(n<3?s(r):n>3?s(e,i,r):s(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new n(i,t,o)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:d,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,v=globalThis,_=v.trustedTypes,y=_?_.emptyScript:"",g=v.reactiveElementPolyfillSupport,f=(t,e)=>t,m={toAttribute(t,e){switch(e){case Boolean:t=t?y:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!d(t,e),b={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&l(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){const{get:o,set:s}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const n=o?.call(this);s?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of o){const o=document.createElement("style"),s=e.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:m).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:m;this._$Em=o;const n=s.fromAttribute(e,t.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(t,e,i,o=!1,s){if(void 0!==t){const n=this.constructor;if(!1===o&&(s=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??$)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==s||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[f("elementProperties")]=new Map,x[f("finalized")]=new Map,g?.({ReactiveElement:x}),(v.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,w=t=>t,k=A.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,N=`<${P}>`,I=document,T=()=>I.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,U="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,j=/>/g,R=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,K=/"/g,L=/^(?:script|style|textarea|title)$/i,B=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=B(1),q=B(2),W=Symbol.for("lit-noChange"),J=Symbol.for("lit-nothing"),Z=new WeakMap,F=I.createTreeWalker(I,129);function G(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const X=(t,e)=>{const i=t.length-1,o=[];let s,n=2===e?"<svg>":3===e?"<math>":"",r=z;for(let e=0;e<i;e++){const i=t[e];let a,d,l=-1,c=0;for(;c<i.length&&(r.lastIndex=c,d=r.exec(i),null!==d);)c=r.lastIndex,r===z?"!--"===d[1]?r=H:void 0!==d[1]?r=j:void 0!==d[2]?(L.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=R):void 0!==d[3]&&(r=R):r===R?">"===d[0]?(r=s??z,l=-1):void 0===d[1]?l=-2:(l=r.lastIndex-d[2].length,a=d[1],r=void 0===d[3]?R:'"'===d[3]?K:D):r===K||r===D?r=R:r===H||r===j?r=z:(r=R,s=void 0);const h=r===R&&t[e+1].startsWith("/>")?" ":"";n+=r===z?i+N:l>=0?(o.push(a),i.slice(0,l)+E+i.slice(l)+C+h):i+C+(-2===l?e:h)}return[G(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class Y{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,n=0;const r=t.length-1,a=this.parts,[d,l]=X(t,e);if(this.el=Y.createElement(d,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=F.nextNode())&&a.length<r;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(E)){const e=l[n++],i=o.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:r[2],strings:i,ctor:"."===r[1]?ot:"?"===r[1]?st:"@"===r[1]?nt:it}),o.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:s}),o.removeAttribute(t));if(L.test(o.tagName)){const t=o.textContent.split(C),e=t.length-1;if(e>0){o.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],T()),F.nextNode(),a.push({type:2,index:++s});o.append(t[e],T())}}}else if(8===o.nodeType)if(o.data===P)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(C,t+1));)a.push({type:7,index:s}),t+=C.length-1}s++}}static createElement(t,e){const i=I.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,o){if(e===W)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const n=O(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(t),s._$AT(t,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,o)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??I).importNode(e,!0);F.currentNode=o;let s=F.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new et(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new rt(s,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(s=F.nextNode(),n++)}return F.currentNode=I,o}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=J,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),O(t)?t===J||null==t||""===t?(this._$AH!==J&&this._$AR(),this._$AH=J):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==J&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(I.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new tt(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new Y(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const s of t)o===e.length?e.push(i=new et(this.O(T()),this.O(T()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=J,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=J}_$AI(t,e=this,i,o){const s=this.strings;let n=!1;if(void 0===s)t=Q(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const o=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=Q(this,o[i+r],e,r),a===W&&(a=this._$AH[r]),n||=!O(a)||a!==this._$AH[r],a===J?t=J:t!==J&&(t+=(a??"")+s[r+1]),this._$AH[r]=a}n&&!o&&this.j(t)}j(t){t===J?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ot extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===J?void 0:t}}class st extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==J)}}class nt extends it{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??J)===W)return;const i=this._$AH,o=t===J&&i!==J||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==J&&(i===J||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=A.litHtmlPolyfillSupport;at?.(Y,et),(A.litHtmlVersions??=[]).push("3.3.3");const dt=globalThis;class lt extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const o=i?.renderBefore??e;let s=o._$litPart$;if(void 0===s){const t=i?.renderBefore??null;o._$litPart$=s=new et(e.insertBefore(T(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}lt._$litElement$=!0,lt.finalized=!0,dt.litElementHydrateSupport?.({LitElement:lt});const ct=dt.litElementPolyfillSupport;ct?.({LitElement:lt}),(dt.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:$},ut=(t=pt,e,i)=>{const{kind:o,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===o){const{name:o}=i;return{set(i){const s=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,s,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=i;return function(i){const s=this[o];e.call(this,i),this.requestUpdate(o,s,t,!0,i)}}throw Error("Unsupported decorator location: "+o)};function vt(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const o=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function _t(t){return vt({...t,state:!0,attribute:!1})}const yt="en",gt={nodes:[],edges:[],overlays:[]};function ft(t){return{type:"custom:heating-visualizer-card",schema:t.schema??gt,language:t.language??yt,translations:t.translations??{}}}function mt(t){return`${t}_${crypto.randomUUID().slice(0,8)}`}const $t={en:{"devices.heat_pump.name":"Heat pump","devices.heat_pump.ports.cold_in":"Cold inlet","devices.heat_pump.ports.hot_out":"Hot outlet","devices.valve_3way.name":"3-way valve","devices.valve_3way.ports.in":"Inlet","devices.valve_3way.ports.out_a":"Outlet A","devices.valve_3way.ports.out_b":"Outlet B","devices.boiler.name":"Boiler","devices.boiler.ports.cold_in":"Cold inlet","devices.boiler.ports.hot_out":"Hot outlet","devices.junction.name":"Junction","devices.junction.ports.in":"Inlet","devices.junction.ports.out_top":"Top outlet","devices.junction.ports.out_bottom":"Bottom outlet","devices.circulation_pump.name":"Circulation pump","devices.circulation_pump.ports.in":"Inlet","devices.circulation_pump.ports.out":"Outlet","devices.floor_heating.name":"Floor heating","devices.floor_heating.ports.in":"Supply","devices.floor_heating.ports.out":"Return","editor.title":"Schema editor","editor.add_device":"Add device","editor.device_type":"Device type","editor.add_selected_device":"Add selected device","editor.delete_selected":"Delete selected","editor.empty_hint":"Add a device to start building your schema.","editor.language":"Language","editor.translations":"Translations","editor.schema_tab":"Schema","editor.overlay_tab":"Overlays","editor.overlays_empty":"No overlays yet. Switch to overlay tab to add sensor labels.","editor.add_overlay":"Add overlay","editor.connection_pending":"Connecting from {0} — click a compatible port","editor.node_state_title":"Selected device state binding","editor.node_state_entity":"State entity","editor.node_state_active":"Active state","editor.node_state_mode_attribute":"Valve mode attribute","editor.node_state_branch_a":"Valve branch A value","editor.node_state_branch_b":"Valve branch B value","overlay.entity":"Entity","overlay.template":"Display template","card.empty":"No schema configured. Edit this card to design your heating layout."},cs:{"devices.heat_pump.name":"Tepelné čerpadlo","devices.heat_pump.ports.cold_in":"Studená voda – vstup","devices.heat_pump.ports.hot_out":"Teplá voda – výstup","devices.valve_3way.name":"Třícestný ventil","devices.valve_3way.ports.in":"Vstup","devices.valve_3way.ports.out_a":"Výstup A","devices.valve_3way.ports.out_b":"Výstup B","devices.boiler.name":"Bojler","devices.boiler.ports.cold_in":"Studená voda – vstup","devices.boiler.ports.hot_out":"Teplá voda – výstup","devices.junction.name":"Uzel","devices.junction.ports.in":"Vstup","devices.junction.ports.out_top":"Horní výstup","devices.junction.ports.out_bottom":"Spodní výstup","devices.circulation_pump.name":"Oběhové čerpadlo","devices.circulation_pump.ports.in":"Vstup","devices.circulation_pump.ports.out":"Výstup","devices.floor_heating.name":"Podlahové topení","devices.floor_heating.ports.in":"Přívod","devices.floor_heating.ports.out":"Vratka","editor.title":"Editor schématu","editor.add_device":"Přidat zařízení","editor.device_type":"Typ zařízení","editor.add_selected_device":"Přidat vybrané zařízení","editor.delete_selected":"Smazat vybrané","editor.empty_hint":"Přidejte zařízení a začněte sestavovat schéma.","editor.language":"Jazyk","editor.translations":"Překlady","editor.schema_tab":"Schéma","editor.overlay_tab":"Popisky","editor.overlays_empty":"Zatím žádné popisky. Přepněte na záložku Popisky.","editor.add_overlay":"Přidat popisek","editor.connection_pending":"Napojování z {0} — klikněte na kompatibilní port","editor.node_state_title":"Stavové napojení vybraného zařízení","editor.node_state_entity":"Entita stavu","editor.node_state_active":"Aktivní stav","editor.node_state_mode_attribute":"Atribut režimu ventilu","editor.node_state_branch_a":"Hodnota větve A","editor.node_state_branch_b":"Hodnota větve B","overlay.entity":"Entita","overlay.template":"Šablona zobrazení","card.empty":"Schéma není nakonfigurováno. Upravte kartu a navrhněte topné schéma."}};class bt{constructor(t,e={}){this._language=t,this._userTranslations=e}get language(){return this._language}t(t,...e){let i=this._lookup(t);return e.forEach((t,e)=>{i=i.replace(`{${e}}`,t)}),i}_lookup(t){const e=this._userTranslations[this._language]?.[t];if(void 0!==e)return e;const i=$t[this._language]?.[t];if(void 0!==i)return i;const o=this._userTranslations[yt]?.[t];if(void 0!==o)return o;const s=$t[yt]?.[t];return void 0!==s?s:t}getAvailableLanguages(){return[...new Set([...Object.keys($t),...Object.keys(this._userTranslations)])].sort()}getEditableTranslations(){return{...$t[this._language]??{},...$t[yt]??{},...this._userTranslations[this._language]??{}}}}function xt(t,e){return new bt(t??yt,e??{})}const At={type:"heat_pump",labelKey:"devices.heat_pump.name",width:120,height:100,ports:[{id:"cold_in",labelKey:"devices.heat_pump.ports.cold_in",kind:"inlet",position:{x:0,y:70}},{id:"hot_out",labelKey:"devices.heat_pump.ports.hot_out",kind:"outlet",position:{x:120,y:30}}]},wt={type:"valve_3way",labelKey:"devices.valve_3way.name",width:100,height:100,ports:[{id:"in",labelKey:"devices.valve_3way.ports.in",kind:"inlet",position:{x:0,y:50}},{id:"out_a",labelKey:"devices.valve_3way.ports.out_a",kind:"outlet",position:{x:100,y:25}},{id:"out_b",labelKey:"devices.valve_3way.ports.out_b",kind:"outlet",position:{x:100,y:75}}]},kt={type:"boiler",labelKey:"devices.boiler.name",width:90,height:140,ports:[{id:"cold_in",labelKey:"devices.boiler.ports.cold_in",kind:"inlet",position:{x:0,y:110}},{id:"hot_out",labelKey:"devices.boiler.ports.hot_out",kind:"outlet",position:{x:90,y:30}}]},St={type:"junction",labelKey:"devices.junction.name",width:60,height:60,ports:[{id:"in",labelKey:"devices.junction.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out_top",labelKey:"devices.junction.ports.out_top",kind:"outlet",position:{x:60,y:15}},{id:"out_bottom",labelKey:"devices.junction.ports.out_bottom",kind:"outlet",position:{x:60,y:45}}]},Et={type:"circulation_pump",labelKey:"devices.circulation_pump.name",width:90,height:90,ports:[{id:"in",labelKey:"devices.circulation_pump.ports.in",kind:"inlet",position:{x:0,y:45}},{id:"out",labelKey:"devices.circulation_pump.ports.out",kind:"outlet",position:{x:90,y:45}}]},Ct={type:"floor_heating",labelKey:"devices.floor_heating.name",width:140,height:90,ports:[{id:"in",labelKey:"devices.floor_heating.ports.in",kind:"inlet",position:{x:0,y:45}},{id:"out",labelKey:"devices.floor_heating.ports.out",kind:"outlet",position:{x:140,y:45}}]},Pt=[At.type,wt.type,kt.type,St.type,Et.type,Ct.type],Nt=new Map([[At.type,At],[wt.type,wt],[kt.type,kt],[St.type,St],[Et.type,Et],[Ct.type,Ct]]);function It(t){return Nt.get(t)}function Tt(t,e){const i=It(t.type);if(!i)return;const o=i.ports.find(t=>t.id===e);return o?{nodeId:t.id,portId:o.id,x:t.position.x+o.position.x,y:t.position.y+o.position.y,kind:o.kind}:void 0}function Ot(t,e){return t.nodeId===e.nodeId&&t.portId===e.portId}function Mt(t,e){if(!t||!e.entity_id)return"—";const i=t.states[e.entity_id];if(!i)return"—";if(e.template)return function(t,e,i){return t.replace(/\{\{\s*state\s*\}\}/g,e).replace(/\{\{\s*attr\(['"](\w+)['"]\)\s*\}\}/g,(t,e)=>String(i[e]??""))}(e.template,i.state,i.attributes);const o=i.attributes.unit_of_measurement;return o?`${i.state} ${o}`:i.state}function Ut(t,e){const i=t.states[e.entity];if(!i)return!1;if("state"===e.condition)return void 0!==e.state&&i.state===e.state;const o=Number(i.state);return!Number.isNaN(o)&&(void 0!==e.below&&o<e.below||void 0!==e.above&&o>e.above)}function zt(t,e){return t.ports.map(t=>q`
    <circle
      class="port port-${t.kind}"
      data-port-id="${t.id}"
      cx="${t.position.x}" cy="${t.position.y}" r="5"
      fill="var(--card-background-color, #1c1c1c)"
      stroke="${"inlet"===t.kind?"#4fc3f7":"#ff8a65"}"
      stroke-width="2"
    />
    <title>${e.t(t.labelKey)}</title>
  `)}function Ht(t,e,i,o,s){switch(t){case"heat_pump":return function(t,e,i,o){const s=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",n=i?2.5:1.5;return q`
    <g class="device device-heat-pump">
      <rect
        x="10" y="15" width="100" height="70" rx="8"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${s}" stroke-width="${n}"
      />
      <circle cx="60" cy="50" r="22"
        fill="none" stroke="${s}" stroke-width="${n}"
      />
      <path d="M 48 50 L 72 50 M 60 38 L 60 62"
        stroke="var(--primary-color, #03a9f4)" stroke-width="2" stroke-linecap="round"
      />
      <text x="60" y="8" text-anchor="middle" class="device-label">
        ${e.t(t.labelKey)}
      </text>
      ${zt(t,e)}
    </g>
  `}(e,i,o,s);case"valve_3way":return function(t,e,i,o){const s=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",n=i?2.5:1.5,r="a"===o.valveBranch?"#4caf50":"var(--divider-color, #555)",a="b"===o.valveBranch?"#4caf50":"var(--divider-color, #555)";return q`
    <g class="device device-valve-3way">
      <polygon
        points="10,50 45,15 45,35 90,35 90,65 45,65 45,85"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${s}" stroke-width="${n}"
      />
      <line x1="45" y1="50" x2="90" y2="25" stroke="${r}" stroke-width="3" />
      <line x1="45" y1="50" x2="90" y2="75" stroke="${a}" stroke-width="3" />
      <text x="50" y="8" text-anchor="middle" class="device-label">${e.t(t.labelKey)}</text>
      ${zt(t,e)}
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
      <text x="45" y="8" text-anchor="middle" class="device-label">${e.t(t.labelKey)}</text>
      ${zt(t,e)}
    </g>
  `}(e,i,o,s);case"junction":return function(t,e,i,o){const s=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return q`
    <g class="device device-junction">
      <circle
        cx="30" cy="30" r="18"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${s}" stroke-width="${i?2.5:1.5}"
      />
      <text x="30" y="8" text-anchor="middle" class="device-label">${e.t(t.labelKey)}</text>
      ${zt(t,e)}
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
      <text x="45" y="8" text-anchor="middle" class="device-label">${e.t(t.labelKey)}</text>
      ${zt(t,e)}
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
      <text x="70" y="8" text-anchor="middle" class="device-label">${e.t(t.labelKey)}</text>
      ${zt(t,e)}
    </g>
  `}(e,i,o,s);default:return}}let jt=class extends lt{constructor(){super(...arguments),this.schema={nodes:[],edges:[],overlays:[]},this.editable=!1}updated(t){t.has("editable")&&this.toggleAttribute("editable",this.editable)}render(){const t=this._translator(),{nodes:e,edges:i,overlays:o}=this.schema,s=this._computeBounds(e);return V`
      <svg
        viewBox="${s.x} ${s.y} ${s.width} ${s.height}"
        @pointerdown="${this._onCanvasPointerDown}"
        @pointermove="${this._onCanvasPointerMove}"
        @pointerup="${this._onCanvasPointerUp}"
        @pointerleave="${this._onCanvasPointerUp}"
      >
        ${i.map(t=>this._renderEdge(t))}
        ${e.map(e=>this._renderNode(e,t))}
        ${o.map(e=>this._renderOverlay(e,t))}
      </svg>
    `}_translator(){return xt(this.config?.language,this.config?.translations)}_computeBounds(t){if(!t.length)return{x:0,y:0,width:800,height:400};let e=1/0,i=1/0,o=-1/0,s=-1/0;for(const n of t){const t=It(n.type);t&&(e=Math.min(e,n.position.x),i=Math.min(i,n.position.y-20),o=Math.max(o,n.position.x+t.width),s=Math.max(s,n.position.y+t.height+10))}return{x:e-40,y:i-40,width:o-e+80,height:s-i+80}}_renderEdge(t){const e=this.schema.nodes.find(e=>e.id===t.from.nodeId),i=this.schema.nodes.find(e=>e.id===t.to.nodeId);if(!e||!i)return V``;const o=Tt(e,t.from.portId),s=Tt(i,t.to.portId);return o&&s?q`<path class="pipe" d="${function(t,e){const i=(t.x+e.x)/2;return`M ${t.x} ${t.y} C ${i} ${t.y}, ${i} ${e.y}, ${e.x} ${e.y}`}(o,s)}" />`:V``}_renderNode(t,e){const i=It(t.type);if(!i)return V``;const o=this.selectedNodeId===t.id,s=function(t,e){if(!t||!e?.entity_id)return{active:!1};const i=t.states[e.entity_id];if(!i)return{active:!1};const o=e.active_state??"on",s=i.state===o||"on"===o&&"heat"===i.state,n=e.mode_attribute??"position",r=String(i.attributes[n]??i.state??"");let a;return r===(e.branch_a_value??"a")&&(a="a"),r===(e.branch_b_value??"b")&&(a="b"),{active:s,valveBranch:a}}(this.hass,t.state),n=Ht(t.type,i,e,o,s);return n?q`
      <g
        class="node ${this._dragNodeId===t.id?"dragging":""}"
        data-node-id="${t.id}"
        transform="translate(${t.position.x} ${t.position.y})"
      >
        ${n}
      </g>
    `:V``}_renderOverlay(t,e){const i=Mt(this.hass,t),o=function(t,e){let i,o,s=!0;if(!t||!e.rules?.length)return{color:i,className:o,visible:s};for(const n of e.rules)Ut(t,n)&&(n.effect.color&&(i=n.effect.color),n.effect.class&&(o=n.effect.class),void 0!==n.effect.visible&&(s=n.effect.visible));return{color:i,className:o,visible:s}}(this.hass,t);if(!o.visible)return V``;const s=`${t.labelKey?e.t(t.labelKey):t.entity_id}: ${i}`,n=Math.max(80,7*s.length+16);return q`
      <g class="overlay-group ${o.className??""}" transform="translate(${t.position.x} ${t.position.y})">
        <rect class="overlay-bg" x="0" y="0" width="${n}" height="22" rx="4" />
        <text class="overlay-text" x="8" y="15" fill="${o.color??"var(--primary-text-color, #e0e0e0)"}">
          ${s}
        </text>
      </g>
    `}_onCanvasPointerDown(t){if(!this.editable)return;const e=t.target,i=e?.closest?.("[data-node-id]");if(!i)return void this._dispatchSelect(void 0);const o=i.getAttribute("data-node-id");if(!o)return;const s=this.schema.nodes.find(t=>t.id===o);if(!s)return;const n=e?.closest?.("[data-port-id]");if(n){const e=n.getAttribute("data-port-id");if(e)return this._dispatchPortClick(o,e),void t.stopPropagation()}this._dragNodeId=o,i.setPointerCapture(t.pointerId),this._dispatchSelect(o),t.preventDefault()}_onCanvasPointerMove(t){if(!this.editable||!this._dragNodeId)return;const e=this.schema.nodes.find(t=>t.id===this._dragNodeId);if(!e)return;const i=this.renderRoot.querySelector("svg");if(!i)return;const o=i.createSVGPoint();o.x=t.clientX,o.y=t.clientY;const s=i.getScreenCTM();if(!s)return;const n=o.matrixTransform(s.inverse());this.dispatchEvent(new CustomEvent("node-move",{detail:{nodeId:e.id,position:{x:Math.round(n.x),y:Math.round(n.y)}},bubbles:!0,composed:!0}))}_onCanvasPointerUp(t){if(this._dragNodeId){const e=this.renderRoot.querySelector(`[data-node-id="${this._dragNodeId}"]`);e?.releasePointerCapture(t.pointerId),this._dragNodeId=void 0}}_dispatchSelect(t){this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:t},bubbles:!0,composed:!0}))}_dispatchPortClick(t,e){this.dispatchEvent(new CustomEvent("port-click",{detail:{nodeId:t,portId:e},bubbles:!0,composed:!0}))}};jt.styles=r`
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
    .device-label {
      fill: var(--primary-text-color, #e0e0e0);
      font-size: 11px;
      font-family: var(--ha-font-family, sans-serif);
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
      font-size: 12px;
      font-family: var(--ha-font-family, monospace);
    }
    .port-highlight {
      stroke: var(--primary-color, #03a9f4) !important;
      stroke-width: 3 !important;
    }
  `,t([vt({attribute:!1})],jt.prototype,"hass",void 0),t([vt({attribute:!1})],jt.prototype,"schema",void 0),t([vt({attribute:!1})],jt.prototype,"config",void 0),t([vt({type:Boolean})],jt.prototype,"editable",void 0),t([vt({attribute:!1})],jt.prototype,"selectedNodeId",void 0),t([vt({attribute:!1})],jt.prototype,"selectedPort",void 0),jt=t([ht("heating-schema-canvas")],jt);let Rt=class extends lt{constructor(){super(...arguments),this._tab="schema",this._selectedDeviceType=At.type,this._translationEdits={}}set hass(t){this._hass=t,this.requestUpdate()}get hass(){return this._hass}setConfig(t){this._config=ft(t);const e=xt(this._config.language,this._config.translations);this._translationEdits={...e.getEditableTranslations()},this.requestUpdate()}render(){if(!this._config)return V``;const t=xt(this._config.language,this._config.translations);return V`
      <div class="editor">
        <div class="tabs">
          <button
            class="${"schema"===this._tab?"active":""}"
            @click="${()=>{this._tab="schema"}}"
          >${t.t("editor.schema_tab")}</button>
          <button
            class="${"overlays"===this._tab?"active":""}"
            @click="${()=>{this._tab="overlays"}}"
          >${t.t("editor.overlay_tab")}</button>
          <button
            class="${"translations"===this._tab?"active":""}"
            @click="${()=>{this._tab="translations"}}"
          >${t.t("editor.translations")}</button>
        </div>

        ${"schema"===this._tab?this._renderSchemaTab(t):J}
        ${"overlays"===this._tab?this._renderOverlaysTab(t):J}
        ${"translations"===this._tab?this._renderTranslationsTab(t):J}
      </div>
    `}_renderSchemaTab(t){const e=this._config.schema,i=e.nodes.find(t=>t.id===this._selectedNodeId);return V`
      <div class="toolbar">
        <label>${t.t("editor.device_type")}</label>
        <select
          .value="${this._selectedDeviceType}"
          @change="${t=>{this._selectedDeviceType=t.target.value}}"
        >
          ${Pt.map(e=>V`
            <option value="${e}">
              ${t.t(`devices.${e}.name`)}
            </option>
          `)}
        </select>
        <select
          .value="${this._config.language??yt}"
          @change="${this._onLanguageChange}"
        >
          ${t.getAvailableLanguages().map(t=>V`<option value="${t}">${t}</option>`)}
        </select>
        <button class="primary" @click="${this._addDevice}">
          ${t.t("editor.add_selected_device")}
        </button>
        ${this._selectedNodeId?V`
            <button class="danger" @click="${this._deleteSelected}">
              ${t.t("editor.delete_selected")}
            </button>
          `:J}
      </div>

      ${this._pendingPort?V`<p class="connection-hint">
            ${t.t("editor.connection_pending",this._portLabel(t,this._pendingPort))}
          </p>`:J}

      ${e.nodes.length?J:V`<p class="hint">${t.t("editor.empty_hint")}</p>`}

      <heating-schema-canvas
        .hass="${this.hass}"
        .config="${this._config}"
        .schema="${e}"
        .editable="${!0}"
        .selectedNodeId="${this._selectedNodeId}"
        @node-select="${this._onNodeSelect}"
        @node-move="${this._onNodeMove}"
        @port-click="${this._onPortClick}"
      ></heating-schema-canvas>

      ${i?V`
          <div class="overlay-item">
            <header>
              <span>${t.t("editor.node_state_title")}</span>
              <span>${t.t(`devices.${i.type}.name`)}</span>
            </header>
            <div class="field">
              <label>${t.t("editor.node_state_entity")}</label>
              ${this._hass?V`
                  <ha-entity-picker
                    .hass="${this._hass}"
                    .value="${i.state?.entity_id??""}"
                    allow-custom-entity
                    @value-changed="${t=>this._updateNodeState(i.id,{entity_id:t.detail.value??""})}"
                  ></ha-entity-picker>
                `:V`
                  <input
                    .value="${i.state?.entity_id??""}"
                    @change="${t=>this._updateNodeState(i.id,{entity_id:t.target.value})}"
                  />
                `}
            </div>
            <div class="field">
              <label>${t.t("editor.node_state_active")}</label>
              <input
                .value="${i.state?.active_state??"on"}"
                @change="${t=>this._updateNodeState(i.id,{active_state:t.target.value})}"
              />
            </div>
            ${"valve_3way"===i.type?V`
                <div class="field">
                  <label>${t.t("editor.node_state_mode_attribute")}</label>
                  <input
                    .value="${i.state?.mode_attribute??"position"}"
                    @change="${t=>this._updateNodeState(i.id,{mode_attribute:t.target.value})}"
                  />
                </div>
                <div class="field">
                  <label>${t.t("editor.node_state_branch_a")}</label>
                  <input
                    .value="${i.state?.branch_a_value??"a"}"
                    @change="${t=>this._updateNodeState(i.id,{branch_a_value:t.target.value})}"
                  />
                </div>
                <div class="field">
                  <label>${t.t("editor.node_state_branch_b")}</label>
                  <input
                    .value="${i.state?.branch_b_value??"b"}"
                    @change="${t=>this._updateNodeState(i.id,{branch_b_value:t.target.value})}"
                  />
                </div>
              `:J}
          </div>
        `:J}
    `}_renderOverlaysTab(t){const e=this._config.schema?.overlays??[];return V`
      <div class="toolbar">
        <button class="primary" @click="${this._addOverlay}">
          ${t.t("editor.add_overlay")}
        </button>
      </div>

      ${e.length?J:V`<p class="hint">${t.t("editor.overlays_empty")}</p>`}

      <heating-schema-canvas
        .hass="${this.hass}"
        .config="${this._config}"
        .schema="${this._config.schema}"
        .editable="${!1}"
      ></heating-schema-canvas>

      ${e.map((e,i)=>V`
        <div class="overlay-item">
          <header>
            <span>${e.entity_id||`Overlay ${i+1}`}</span>
            <button class="danger" @click="${()=>this._removeOverlay(e.id)}">×</button>
          </header>
          <div class="field">
            <label>${t.t("overlay.entity")}</label>
            ${this._hass?V`
                <ha-entity-picker
                  .hass="${this._hass}"
                  .value="${e.entity_id}"
                  allow-custom-entity
                  @value-changed="${t=>this._updateOverlay(e.id,{entity_id:t.detail.value??""})}"
                ></ha-entity-picker>
              `:V`
                <input
                  .value="${e.entity_id}"
                  @change="${t=>this._updateOverlay(e.id,{entity_id:t.target.value})}"
                />
              `}
          </div>
          <div class="field">
            <label>${t.t("overlay.template")}</label>
            <input
              placeholder="{{ state }} °C"
              .value="${e.template??""}"
              @change="${t=>this._updateOverlay(e.id,{template:t.target.value||void 0})}"
            />
          </div>
          <div class="field">
            <label>X / Y</label>
            <input
              type="number"
              .value="${String(e.position.x)}"
              @change="${t=>this._updateOverlay(e.id,{position:{...e.position,x:Number(t.target.value)}})}"
            />
            <input
              type="number"
              .value="${String(e.position.y)}"
              @change="${t=>this._updateOverlay(e.id,{position:{...e.position,y:Number(t.target.value)}})}"
            />
          </div>
        </div>
      `)}
    `}_renderTranslationsTab(t){const e=Object.entries(this._translationEdits).sort(([t],[e])=>t.localeCompare(e));return V`
      <p class="hint">${t.t("editor.language")}: ${this._config.language}</p>
      ${e.map(([t,e])=>V`
        <div class="translation-item">
          <header><code>${t}</code></header>
          <input
            .value="${e}"
            @input="${e=>this._onTranslationInput(t,e.target.value)}"
          />
        </div>
      `)}
    `}_emitConfig(t,e){const i={...this._config,...e,schema:t};this._config=i,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}_addDevice(){const t=this._cloneSchema(),e=30*t.nodes.length,i=this._selectedDeviceType,o={id:mt(i),type:i,position:{x:80+e,y:80+e}};t.nodes.push(o),this._selectedNodeId=o.id,this._emitConfig(t)}_deleteSelected(){if(!this._selectedNodeId)return;const t=this._selectedNodeId,e=this._cloneSchema();e.nodes=e.nodes.filter(e=>e.id!==t),e.edges=e.edges.filter(e=>e.from.nodeId!==t&&e.to.nodeId!==t),this._selectedNodeId=void 0,this._pendingPort=void 0,this._emitConfig(e)}_addOverlay(){const t=this._cloneSchema(),e={id:mt("ov"),position:{x:40,y:40+30*t.overlays.length},entity_id:"",template:"{{ state }}"};t.overlays.push(e),this._emitConfig(t)}_removeOverlay(t){const e=this._cloneSchema();e.overlays=e.overlays.filter(e=>e.id!==t),this._emitConfig(e)}_updateOverlay(t,e){const i=this._cloneSchema();i.overlays=i.overlays.map(i=>i.id===t?{...i,...e}:i),this._emitConfig(i)}_onLanguageChange(t){const e=t.target.value,i=xt(e,this._config.translations);this._translationEdits={...i.getEditableTranslations()},this._emitConfig(this._cloneSchema(),{language:e})}_onTranslationInput(t,e){this._translationEdits={...this._translationEdits,[t]:e};const i=this._config.language??"en",o={...this._config.translations,[i]:{...this._config.translations?.[i]??{},[t]:e}};this._emitConfig(this._cloneSchema(),{translations:o})}_onNodeSelect(t){this._selectedNodeId=t.detail.nodeId}_onNodeMove(t){const e=this._cloneSchema();e.nodes=e.nodes.map(e=>e.id===t.detail.nodeId?{...e,position:t.detail.position}:e),this._emitConfig(e)}_updateNodeState(t,e){const i=this._cloneSchema();i.nodes=i.nodes.map(i=>i.id!==t?i:{...i,state:{...i.state??{},...e}}),this._emitConfig(i)}_onPortClick(t){const{nodeId:e,portId:i}=t.detail,o={nodeId:e,portId:i};if(!this._pendingPort)return void(this._pendingPort=o);if(Ot(this._pendingPort,o))return void(this._pendingPort=void 0);const s=this._cloneSchema(),n=this._createEdge(this._pendingPort,o,s.edges);n&&(s.edges.push(n),this._emitConfig(s)),this._pendingPort=void 0}_createEdge(t,e,i){const o=this._orderPorts(t,e);if(!o)return;const s=i.some(t=>Ot(t.from,o.from)&&Ot(t.to,o.to));return s?void 0:{id:mt("edge"),from:o.from,to:o.to}}_orderPorts(t,e){const i=this._config.schema?.nodes.find(e=>e.id===t.nodeId),o=this._config.schema?.nodes.find(t=>t.id===e.nodeId);if(!i||!o)return;const s=It(i.type),n=It(o.type);if(!s||!n)return;const r=s.ports.find(e=>e.id===t.portId),a=n.ports.find(t=>t.id===e.portId);return r&&a?"outlet"===r.kind&&"inlet"===a.kind?{from:t,to:e}:"outlet"===a.kind&&"inlet"===r.kind?{from:e,to:t}:void 0:void 0}_portLabel(t,e){const i=this._config.schema?.nodes.find(t=>t.id===e.nodeId);if(!i)return e.portId;const o=It(i.type),s=o?.ports.find(t=>t.id===e.portId);return s?t.t(s.labelKey):e.portId}_cloneSchema(){const t=this._config.schema;return{nodes:t.nodes.map(t=>({...t,position:{...t.position},state:t.state?{...t.state}:void 0})),edges:t.edges.map(t=>({...t,from:{...t.from},to:{...t.to}})),overlays:t.overlays.map(t=>({...t,position:{...t.position},rules:t.rules?.map(t=>({...t,effect:{...t.effect}}))}))}}};Rt.styles=r`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 8px 0;
      font-family: var(--ha-font-family, sans-serif);
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
  `,t([_t()],Rt.prototype,"_config",void 0),t([_t()],Rt.prototype,"_tab",void 0),t([_t()],Rt.prototype,"_selectedNodeId",void 0),t([_t()],Rt.prototype,"_pendingPort",void 0),t([_t()],Rt.prototype,"_selectedDeviceType",void 0),t([_t()],Rt.prototype,"_translationEdits",void 0),Rt=t([ht("heating-visualizer-editor")],Rt);let Dt=class extends lt{setConfig(t){if(!t||"object"!=typeof t)throw new Error("Invalid card configuration");this._config=ft(t)}getCardSize(){return 1}static getConfigElement(){return document.createElement("heating-visualizer-editor")}static getStubConfig(){return{type:"custom:heating-visualizer-card",language:"cs",schema:gt,translations:{}}}render(){if(!this._config)return V``;const t=this._config.schema,e=xt(this._config.language,this._config.translations);return V`
      <ha-card>
        ${t.nodes.length||t.overlays.length?V`
            <heating-schema-canvas
              .hass="${this.hass}"
              .config="${this._config}"
              .schema="${t}"
              .editable="${!1}"
            ></heating-schema-canvas>
          `:V`<div class="empty">${e.t("card.empty")}</div>`}
      </ha-card>
    `}};Dt.styles=r`
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
      font-family: var(--ha-font-family, sans-serif);
      color: var(--primary-text-color, #e0e0e0);
    }
  `,t([vt({attribute:!1})],Dt.prototype,"hass",void 0),t([_t()],Dt.prototype,"_config",void 0),Dt=t([ht("heating-visualizer-card")],Dt),window.customCards=window.customCards??[],window.customCards.push({type:"heating-visualizer-card",name:"Heating Visualizer",description:"Design and visualize heating system schemas with live sensor overlays.",preview:!0}),window.HeatingVisualizerCard=Dt,console.info("%c HEATING-VISUALIZER-CARD %c v0.1.0 · HA 2026.7 ","color: white; background: #039be5; font-weight: bold;","color: #039be5; background: white; font-weight: bold;");export{Dt as HeatingVisualizerCard};
//# sourceMappingURL=heating-visualizer-card.js.map
