function t(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:d,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,g=_.trustedTypes,f=g?g.emptyScript:"",v=_.reactiveElementPolyfillSupport,m=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!d(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??$)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[m("elementProperties")]=new Map,A[m("finalized")]=new Map,v?.({ReactiveElement:A}),(_.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,E=t=>t,S=x.trustedTypes,w=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,I=`<${P}>`,N=document,O=()=>N.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,M="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,R=/>/g,j=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,L=/"/g,B=/^(?:script|style|textarea|title)$/i,q=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=q(1),K=q(2),W=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),J=new WeakMap,G=N.createTreeWalker(N,129);function X(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=H;for(let e=0;e<i;e++){const i=t[e];let a,d,l=-1,c=0;for(;c<i.length&&(r.lastIndex=c,d=r.exec(i),null!==d);)c=r.lastIndex,r===H?"!--"===d[1]?r=z:void 0!==d[1]?r=R:void 0!==d[2]?(B.test(d[2])&&(o=RegExp("</"+d[2],"g")),r=j):void 0!==d[3]&&(r=j):r===j?">"===d[0]?(r=o??H,l=-1):void 0===d[1]?l=-2:(l=r.lastIndex-d[2].length,a=d[1],r=void 0===d[3]?j:'"'===d[3]?L:D):r===L||r===D?r=j:r===z||r===R?r=H:(r=j,o=void 0);const h=r===j&&t[e+1].startsWith("/>")?" ":"";n+=r===H?i+I:l>=0?(s.push(a),i.slice(0,l)+C+i.slice(l)+k+h):i+k+(-2===l?e:h)}return[X(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class F{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[d,l]=Y(t,e);if(this.el=F.createElement(d,i),G.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=G.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=l[n++],i=s.getAttribute(t).split(k),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?st:"?"===r[1]?ot:"@"===r[1]?nt:it}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:o}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),G.nextNode(),a.push({type:2,index:++o});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const i=N.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===W)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=T(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Q(t,o._$AS(t,e.values),o,s)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??N).importNode(e,!0);G.currentNode=s;let o=G.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new et(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new rt(o,this,t)),this._$AV.push(e),a=i[++r]}n!==a?.index&&(o=G.nextNode(),n++)}return G.currentNode=N,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),T(t)?t===Z||null==t||""===t?(this._$AH!==Z&&this._$AR(),this._$AH=Z):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Z&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(N.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=F.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new tt(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=J.get(t.strings);return void 0===e&&J.set(t.strings,e=new F(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new et(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=E(t).nextSibling;E(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class it{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Z}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=Q(this,t,e,0),n=!T(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const s=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=Q(this,s[i+r],e,r),a===W&&(a=this._$AH[r]),n||=!T(a)||a!==this._$AH[r],a===Z?t=Z:t!==Z&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(t)}j(t){t===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends it{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Z?void 0:t}}class ot extends it{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Z)}}class nt extends it{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??Z)===W)return;const i=this._$AH,s=t===Z&&i!==Z||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==Z&&(i===Z||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const at=x.litHtmlPolyfillSupport;at?.(F,et),(x.litHtmlVersions??=[]).push("3.3.3");const dt=globalThis;class lt extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new et(e.insertBefore(O(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}lt._$litElement$=!0,lt.finalized=!0,dt.litElementHydrateSupport?.({LitElement:lt});const ct=dt.litElementPolyfillSupport;ct?.({LitElement:lt}),(dt.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},pt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:$},ut=(t=pt,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function _t(t){return(e,i)=>"object"==typeof i?ut(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function gt(t){return _t({...t,state:!0,attribute:!1})}const ft="en",vt={nodes:[],edges:[],overlays:[]};function mt(t){return{type:"custom:heating-visualizer-card",schema:t.schema??vt,language:t.language??ft,translations:t.translations??{}}}function yt(t){return`${t}_${crypto.randomUUID().slice(0,8)}`}const $t={en:{"devices.heat_pump.name":"Heat pump","devices.heat_pump.ports.cold_in":"Cold inlet","devices.heat_pump.ports.hot_out":"Hot outlet","editor.title":"Schema editor","editor.add_device":"Add device","editor.add_heat_pump":"Heat pump","editor.delete_selected":"Delete selected","editor.empty_hint":"Add a heat pump to start building your schema.","editor.language":"Language","editor.translations":"Translations","editor.schema_tab":"Schema","editor.overlay_tab":"Overlays","editor.overlays_empty":"No overlays yet. Switch to overlay tab to add sensor labels.","editor.add_overlay":"Add overlay","editor.connection_pending":"Connecting from {0} — click a compatible port","overlay.entity":"Entity","overlay.template":"Display template","card.empty":"No schema configured. Edit this card to design your heating layout."},cs:{"devices.heat_pump.name":"Tepelné čerpadlo","devices.heat_pump.ports.cold_in":"Studená voda – vstup","devices.heat_pump.ports.hot_out":"Teplá voda – výstup","editor.title":"Editor schématu","editor.add_device":"Přidat zařízení","editor.add_heat_pump":"Tepelné čerpadlo","editor.delete_selected":"Smazat vybrané","editor.empty_hint":"Přidejte tepelné čerpadlo a začněte sestavovat schéma.","editor.language":"Jazyk","editor.translations":"Překlady","editor.schema_tab":"Schéma","editor.overlay_tab":"Popisky","editor.overlays_empty":"Zatím žádné popisky. Přepněte na záložku Popisky.","editor.add_overlay":"Přidat popisek","editor.connection_pending":"Napojování z {0} — klikněte na kompatibilní port","overlay.entity":"Entita","overlay.template":"Šablona zobrazení","card.empty":"Schéma není nakonfigurováno. Upravte kartu a navrhněte topné schéma."}};class bt{constructor(t,e={}){this._language=t,this._userTranslations=e}get language(){return this._language}t(t,...e){let i=this._lookup(t);return e.forEach((t,e)=>{i=i.replace(`{${e}}`,t)}),i}_lookup(t){const e=this._userTranslations[this._language]?.[t];if(void 0!==e)return e;const i=$t[this._language]?.[t];if(void 0!==i)return i;const s=this._userTranslations[ft]?.[t];if(void 0!==s)return s;const o=$t[ft]?.[t];return void 0!==o?o:t}getAvailableLanguages(){return[...new Set([...Object.keys($t),...Object.keys(this._userTranslations)])].sort()}getEditableTranslations(){return{...$t[this._language]??{},...$t[ft]??{},...this._userTranslations[this._language]??{}}}}function At(t,e){return new bt(t??ft,e??{})}const xt={type:"heat_pump",labelKey:"devices.heat_pump.name",width:120,height:100,ports:[{id:"cold_in",labelKey:"devices.heat_pump.ports.cold_in",kind:"inlet",position:{x:0,y:70}},{id:"hot_out",labelKey:"devices.heat_pump.ports.hot_out",kind:"outlet",position:{x:120,y:30}}]},Et=new Map([[xt.type,xt]]);function St(t){return Et.get(t)}function wt(t,e){const i=St(t.type);if(!i)return;const s=i.ports.find(t=>t.id===e);return s?{nodeId:t.id,portId:s.id,x:t.position.x+s.position.x,y:t.position.y+s.position.y,kind:s.kind}:void 0}function Ct(t,e){return t.nodeId===e.nodeId&&t.portId===e.portId}function kt(t,e){if(!t||!e.entity_id)return"—";const i=t.states[e.entity_id];if(!i)return"—";if(e.template)return function(t,e,i){return t.replace(/\{\{\s*state\s*\}\}/g,e).replace(/\{\{\s*attr\(['"](\w+)['"]\)\s*\}\}/g,(t,e)=>String(i[e]??""))}(e.template,i.state,i.attributes);const s=i.attributes.unit_of_measurement;return s?`${i.state} ${s}`:i.state}function Pt(t,e){const i=t.states[e.entity];if(!i)return!1;if("state"===e.condition)return void 0!==e.state&&i.state===e.state;const s=Number(i.state);return!Number.isNaN(s)&&(void 0!==e.below&&s<e.below||void 0!==e.above&&s>e.above)}function It(t,e,i,s){if("heat_pump"===t)return function(t,e,i){const s=i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",o=i?2.5:1.5;return K`
    <g class="device device-heat-pump">
      <rect
        x="10" y="15" width="100" height="70" rx="8"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${s}" stroke-width="${o}"
      />
      <circle cx="60" cy="50" r="22"
        fill="none" stroke="${s}" stroke-width="${o}"
      />
      <path d="M 48 50 L 72 50 M 60 38 L 60 62"
        stroke="var(--primary-color, #03a9f4)" stroke-width="2" stroke-linecap="round"
      />
      <text x="60" y="8" text-anchor="middle" class="device-label">
        ${e.t(t.labelKey)}
      </text>
      ${t.ports.map(t=>K`
        <circle
          class="port port-${t.kind}"
          data-port-id="${t.id}"
          cx="${t.position.x}" cy="${t.position.y}" r="5"
          fill="var(--card-background-color, #1c1c1c)"
          stroke="${"inlet"===t.kind?"#4fc3f7":"#ff8a65"}"
          stroke-width="2"
        />
        <title>${e.t(t.labelKey)}</title>
      `)}
    </g>
  `}(e,i,s)}let Nt=class extends lt{constructor(){super(...arguments),this.schema={nodes:[],edges:[],overlays:[]},this.editable=!1}updated(t){t.has("editable")&&this.toggleAttribute("editable",this.editable)}render(){const t=this._translator(),{nodes:e,edges:i,overlays:s}=this.schema,o=this._computeBounds(e);return V`
      <svg
        viewBox="${o.x} ${o.y} ${o.width} ${o.height}"
        @pointerdown="${this._onCanvasPointerDown}"
        @pointermove="${this._onCanvasPointerMove}"
        @pointerup="${this._onCanvasPointerUp}"
        @pointerleave="${this._onCanvasPointerUp}"
      >
        ${i.map(t=>this._renderEdge(t))}
        ${e.map(e=>this._renderNode(e,t))}
        ${s.map(e=>this._renderOverlay(e,t))}
      </svg>
    `}_translator(){return At(this.config?.language,this.config?.translations)}_computeBounds(t){if(!t.length)return{x:0,y:0,width:800,height:400};let e=1/0,i=1/0,s=-1/0,o=-1/0;for(const n of t){const t=St(n.type);t&&(e=Math.min(e,n.position.x),i=Math.min(i,n.position.y-20),s=Math.max(s,n.position.x+t.width),o=Math.max(o,n.position.y+t.height+10))}return{x:e-40,y:i-40,width:s-e+80,height:o-i+80}}_renderEdge(t){const e=this.schema.nodes.find(e=>e.id===t.from.nodeId),i=this.schema.nodes.find(e=>e.id===t.to.nodeId);if(!e||!i)return V``;const s=wt(e,t.from.portId),o=wt(i,t.to.portId);return s&&o?K`<path class="pipe" d="${function(t,e){const i=(t.x+e.x)/2;return`M ${t.x} ${t.y} C ${i} ${t.y}, ${i} ${e.y}, ${e.x} ${e.y}`}(s,o)}" />`:V``}_renderNode(t,e){const i=St(t.type);if(!i)return V``;const s=this.selectedNodeId===t.id,o=It(t.type,i,e,s);return o?K`
      <g
        class="node ${this._dragNodeId===t.id?"dragging":""}"
        data-node-id="${t.id}"
        transform="translate(${t.position.x} ${t.position.y})"
      >
        ${o}
      </g>
    `:V``}_renderOverlay(t,e){const i=kt(this.hass,t),s=function(t,e){let i,s,o=!0;if(!t||!e.rules?.length)return{color:i,className:s,visible:o};for(const n of e.rules)Pt(t,n)&&(n.effect.color&&(i=n.effect.color),n.effect.class&&(s=n.effect.class),void 0!==n.effect.visible&&(o=n.effect.visible));return{color:i,className:s,visible:o}}(this.hass,t);if(!s.visible)return V``;const o=`${t.labelKey?e.t(t.labelKey):t.entity_id}: ${i}`,n=Math.max(80,7*o.length+16);return K`
      <g class="overlay-group ${s.className??""}" transform="translate(${t.position.x} ${t.position.y})">
        <rect class="overlay-bg" x="0" y="0" width="${n}" height="22" rx="4" />
        <text class="overlay-text" x="8" y="15" fill="${s.color??"var(--primary-text-color, #e0e0e0)"}">
          ${o}
        </text>
      </g>
    `}_onCanvasPointerDown(t){if(!this.editable)return;const e=t.target,i=e?.closest?.("[data-node-id]");if(!i)return void this._dispatchSelect(void 0);const s=i.getAttribute("data-node-id");if(!s)return;const o=this.schema.nodes.find(t=>t.id===s);if(!o)return;const n=e?.closest?.("[data-port-id]");if(n){const e=n.getAttribute("data-port-id");if(e)return this._dispatchPortClick(s,e),void t.stopPropagation()}this._dragNodeId=s,i.setPointerCapture(t.pointerId),this._dispatchSelect(s),t.preventDefault()}_onCanvasPointerMove(t){if(!this.editable||!this._dragNodeId)return;const e=this.schema.nodes.find(t=>t.id===this._dragNodeId);if(!e)return;const i=this.renderRoot.querySelector("svg");if(!i)return;const s=i.createSVGPoint();s.x=t.clientX,s.y=t.clientY;const o=i.getScreenCTM();if(!o)return;const n=s.matrixTransform(o.inverse());this.dispatchEvent(new CustomEvent("node-move",{detail:{nodeId:e.id,position:{x:Math.round(n.x),y:Math.round(n.y)}},bubbles:!0,composed:!0}))}_onCanvasPointerUp(t){if(this._dragNodeId){const e=this.renderRoot.querySelector(`[data-node-id="${this._dragNodeId}"]`);e?.releasePointerCapture(t.pointerId),this._dragNodeId=void 0}}_dispatchSelect(t){this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:t},bubbles:!0,composed:!0}))}_dispatchPortClick(t,e){this.dispatchEvent(new CustomEvent("port-click",{detail:{nodeId:t,portId:e},bubbles:!0,composed:!0}))}};Nt.styles=r`
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
  `,t([_t({attribute:!1})],Nt.prototype,"hass",void 0),t([_t({attribute:!1})],Nt.prototype,"schema",void 0),t([_t({attribute:!1})],Nt.prototype,"config",void 0),t([_t({type:Boolean})],Nt.prototype,"editable",void 0),t([_t({attribute:!1})],Nt.prototype,"selectedNodeId",void 0),t([_t({attribute:!1})],Nt.prototype,"selectedPort",void 0),Nt=t([ht("heating-schema-canvas")],Nt);let Ot=class extends lt{constructor(){super(...arguments),this._tab="schema",this._translationEdits={}}set hass(t){this._hass=t,this.requestUpdate()}get hass(){return this._hass}setConfig(t){this._config=mt(t);const e=At(this._config.language,this._config.translations);this._translationEdits={...e.getEditableTranslations()},this.requestUpdate()}render(){if(!this._config)return V``;const t=At(this._config.language,this._config.translations);return V`
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

        ${"schema"===this._tab?this._renderSchemaTab(t):Z}
        ${"overlays"===this._tab?this._renderOverlaysTab(t):Z}
        ${"translations"===this._tab?this._renderTranslationsTab(t):Z}
      </div>
    `}_renderSchemaTab(t){const e=this._config.schema;return V`
      <div class="toolbar">
        <select
          .value="${this._config.language??"en"}"
          @change="${this._onLanguageChange}"
        >
          ${t.getAvailableLanguages().map(t=>V`<option value="${t}">${t}</option>`)}
        </select>
        <button class="primary" @click="${this._addHeatPump}">
          ${t.t("editor.add_heat_pump")}
        </button>
        ${this._selectedNodeId?V`
            <button class="danger" @click="${this._deleteSelected}">
              ${t.t("editor.delete_selected")}
            </button>
          `:Z}
      </div>

      ${this._pendingPort?V`<p class="connection-hint">
            ${t.t("editor.connection_pending",this._portLabel(t,this._pendingPort))}
          </p>`:Z}

      ${e.nodes.length?Z:V`<p class="hint">${t.t("editor.empty_hint")}</p>`}

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
    `}_renderOverlaysTab(t){const e=this._config.schema?.overlays??[];return V`
      <div class="toolbar">
        <button class="primary" @click="${this._addOverlay}">
          ${t.t("editor.add_overlay")}
        </button>
      </div>

      ${e.length?Z:V`<p class="hint">${t.t("editor.overlays_empty")}</p>`}

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
    `}_emitConfig(t,e){const i={...this._config,...e,schema:t};this._config=i,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}_addHeatPump(){const t=this._cloneSchema(),e=30*t.nodes.length,i={id:yt("hp"),type:xt.type,position:{x:80+e,y:80+e}};t.nodes.push(i),this._selectedNodeId=i.id,this._emitConfig(t)}_deleteSelected(){if(!this._selectedNodeId)return;const t=this._selectedNodeId,e=this._cloneSchema();e.nodes=e.nodes.filter(e=>e.id!==t),e.edges=e.edges.filter(e=>e.from.nodeId!==t&&e.to.nodeId!==t),this._selectedNodeId=void 0,this._pendingPort=void 0,this._emitConfig(e)}_addOverlay(){const t=this._cloneSchema(),e={id:yt("ov"),position:{x:40,y:40+30*t.overlays.length},entity_id:"",template:"{{ state }}"};t.overlays.push(e),this._emitConfig(t)}_removeOverlay(t){const e=this._cloneSchema();e.overlays=e.overlays.filter(e=>e.id!==t),this._emitConfig(e)}_updateOverlay(t,e){const i=this._cloneSchema();i.overlays=i.overlays.map(i=>i.id===t?{...i,...e}:i),this._emitConfig(i)}_onLanguageChange(t){const e=t.target.value,i=At(e,this._config.translations);this._translationEdits={...i.getEditableTranslations()},this._emitConfig(this._cloneSchema(),{language:e})}_onTranslationInput(t,e){this._translationEdits={...this._translationEdits,[t]:e};const i=this._config.language??"en",s={...this._config.translations,[i]:{...this._config.translations?.[i]??{},[t]:e}};this._emitConfig(this._cloneSchema(),{translations:s})}_onNodeSelect(t){this._selectedNodeId=t.detail.nodeId}_onNodeMove(t){const e=this._cloneSchema();e.nodes=e.nodes.map(e=>e.id===t.detail.nodeId?{...e,position:t.detail.position}:e),this._emitConfig(e)}_onPortClick(t){const{nodeId:e,portId:i}=t.detail,s={nodeId:e,portId:i};if(!this._pendingPort)return void(this._pendingPort=s);if(Ct(this._pendingPort,s))return void(this._pendingPort=void 0);const o=this._cloneSchema(),n=this._createEdge(this._pendingPort,s,o.edges);n&&(o.edges.push(n),this._emitConfig(o)),this._pendingPort=void 0}_createEdge(t,e,i){const s=this._orderPorts(t,e);if(!s)return;const o=i.some(t=>Ct(t.from,s.from)&&Ct(t.to,s.to));return o?void 0:{id:yt("edge"),from:s.from,to:s.to}}_orderPorts(t,e){const i=this._config.schema?.nodes.find(e=>e.id===t.nodeId),s=this._config.schema?.nodes.find(t=>t.id===e.nodeId);if(!i||!s)return;const o=St(i.type),n=St(s.type);if(!o||!n)return;const r=o.ports.find(e=>e.id===t.portId),a=n.ports.find(t=>t.id===e.portId);return r&&a?"outlet"===r.kind&&"inlet"===a.kind?{from:t,to:e}:"outlet"===a.kind&&"inlet"===r.kind?{from:e,to:t}:void 0:void 0}_portLabel(t,e){const i=this._config.schema?.nodes.find(t=>t.id===e.nodeId);if(!i)return e.portId;const s=St(i.type),o=s?.ports.find(t=>t.id===e.portId);return o?t.t(o.labelKey):e.portId}_cloneSchema(){const t=this._config.schema;return{nodes:t.nodes.map(t=>({...t,position:{...t.position}})),edges:t.edges.map(t=>({...t,from:{...t.from},to:{...t.to}})),overlays:t.overlays.map(t=>({...t,position:{...t.position},rules:t.rules?.map(t=>({...t,effect:{...t.effect}}))}))}}};Ot.styles=r`
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
  `,t([gt()],Ot.prototype,"_config",void 0),t([gt()],Ot.prototype,"_tab",void 0),t([gt()],Ot.prototype,"_selectedNodeId",void 0),t([gt()],Ot.prototype,"_pendingPort",void 0),t([gt()],Ot.prototype,"_translationEdits",void 0),Ot=t([ht("heating-visualizer-editor")],Ot);let Tt=class extends lt{setConfig(t){if(!t||"object"!=typeof t)throw new Error("Invalid card configuration");this._config=mt(t)}getCardSize(){return 1}static getConfigElement(){return document.createElement("heating-visualizer-editor")}static getStubConfig(){return{type:"custom:heating-visualizer-card",language:"cs",schema:vt,translations:{}}}render(){if(!this._config)return V``;const t=this._config.schema,e=At(this._config.language,this._config.translations);return V`
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
    `}};Tt.styles=r`
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
  `,t([_t({attribute:!1})],Tt.prototype,"hass",void 0),t([gt()],Tt.prototype,"_config",void 0),Tt=t([ht("heating-visualizer-card")],Tt),window.customCards=window.customCards??[],window.customCards.push({type:"heating-visualizer-card",name:"Heating Visualizer",description:"Design and visualize heating system schemas with live sensor overlays.",preview:!0}),window.HeatingVisualizerCard=Tt,console.info("%c HEATING-VISUALIZER-CARD %c v0.1.0 · HA 2026.7 ","color: white; background: #039be5; font-weight: bold;","color: #039be5; background: white; font-weight: bold;");export{Tt as HeatingVisualizerCard};
//# sourceMappingURL=heating-visualizer-card.js.map
