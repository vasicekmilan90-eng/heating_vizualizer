function e(e,t,i,o){var r,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(s=(n<3?r(s):n>3?r(t,i,s):r(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),r=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(t,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new n(i,e,o)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,o))(t)})(e):e,{is:d,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:u,getPrototypeOf:p}=Object,v=globalThis,_=v.trustedTypes,y=_?_.emptyScript:"",m=v.reactiveElementPolyfillSupport,f=(e,t)=>e,g={toAttribute(e,t){switch(t){case Boolean:e=e?y:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},$=(e,t)=>!d(e,t),b={attribute:!0,type:String,converter:g,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),v.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&l(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:r}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const n=o?.call(this);r?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(f("elementProperties")))return;const e=p(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(f("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(f("properties"))){const e=this.properties,t=[...h(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,o)=>{if(i)e.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of o){const o=document.createElement("style"),r=t.litNonce;void 0!==r&&o.setAttribute("nonce",r),o.textContent=i.cssText,e.appendChild(o)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:g).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=i.getPropertyOptions(o),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:g;this._$Em=o;const n=r.fromAttribute(t,e.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(e,t,i,o=!1,r){if(void 0!==e){const n=this.constructor;if(!1===o&&(r=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??$)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:r},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==r||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[f("elementProperties")]=new Map,x[f("finalized")]=new Map,m?.({ReactiveElement:x}),(v.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,w=e=>e,A=k.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,I=`<${P}>`,M=document,N=()=>M.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,z="[ \t\n\f\r]",K=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,U=/>/g,H=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,R=/"/g,D=/^(?:script|style|textarea|title)$/i,V=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),B=V(1),F=V(2),q=Symbol.for("lit-noChange"),Z=Symbol.for("lit-nothing"),W=new WeakMap,J=M.createTreeWalker(M,129);function G(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const X=(e,t)=>{const i=e.length-1,o=[];let r,n=2===t?"<svg>":3===t?"<math>":"",s=K;for(let t=0;t<i;t++){const i=e[t];let a,d,l=-1,c=0;for(;c<i.length&&(s.lastIndex=c,d=s.exec(i),null!==d);)c=s.lastIndex,s===K?"!--"===d[1]?s=L:void 0!==d[1]?s=U:void 0!==d[2]?(D.test(d[2])&&(r=RegExp("</"+d[2],"g")),s=H):void 0!==d[3]&&(s=H):s===H?">"===d[0]?(s=r??K,l=-1):void 0===d[1]?l=-2:(l=s.lastIndex-d[2].length,a=d[1],s=void 0===d[3]?H:'"'===d[3]?R:j):s===R||s===j?s=H:s===L||s===U?s=K:(s=H,r=void 0);const h=s===H&&e[t+1].startsWith("/>")?" ":"";n+=s===K?i+I:l>=0?(o.push(a),i.slice(0,l)+E+i.slice(l)+C+h):i+C+(-2===l?t:h)}return[G(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class Y{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,n=0;const s=e.length-1,a=this.parts,[d,l]=X(e,t);if(this.el=Y.createElement(d,i),J.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=J.nextNode())&&a.length<s;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(E)){const t=l[n++],i=o.getAttribute(e).split(C),s=/([.?@])?(.*)/.exec(t);a.push({type:1,index:r,name:s[2],strings:i,ctor:"."===s[1]?oe:"?"===s[1]?re:"@"===s[1]?ne:ie}),o.removeAttribute(e)}else e.startsWith(C)&&(a.push({type:6,index:r}),o.removeAttribute(e));if(D.test(o.tagName)){const e=o.textContent.split(C),t=e.length-1;if(t>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],N()),J.nextNode(),a.push({type:2,index:++r});o.append(e[t],N())}}}else if(8===o.nodeType)if(o.data===P)a.push({type:2,index:r});else{let e=-1;for(;-1!==(e=o.data.indexOf(C,e+1));)a.push({type:7,index:r}),e+=C.length-1}r++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,o){if(t===q)return t;let r=void 0!==o?i._$Co?.[o]:i._$Cl;const n=O(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(e),r._$AT(e,i,o)),void 0!==o?(i._$Co??=[])[o]=r:i._$Cl=r),void 0!==r&&(t=Q(e,r._$AS(e,t.values),r,o)),t}class ee{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??M).importNode(t,!0);J.currentNode=o;let r=J.nextNode(),n=0,s=0,a=i[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new te(r,r.nextSibling,this,e):1===a.type?t=new a.ctor(r,a.name,a.strings,this,e):6===a.type&&(t=new se(r,this,e)),this._$AV.push(t),a=i[++s]}n!==a?.index&&(r=J.nextNode(),n++)}return J.currentNode=M,o}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=Z,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),O(e)?e===Z||null==e||""===e?(this._$AH!==Z&&this._$AR(),this._$AH=Z):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>T(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Z&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Y.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new ee(o,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new Y(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const r of e)o===t.length?t.push(i=new te(this.O(N()),this.O(N()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=w(e).nextSibling;w(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ie{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,r){this.type=1,this._$AH=Z,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Z}_$AI(e,t=this,i,o){const r=this.strings;let n=!1;if(void 0===r)e=Q(this,e,t,0),n=!O(e)||e!==this._$AH&&e!==q,n&&(this._$AH=e);else{const o=e;let s,a;for(e=r[0],s=0;s<r.length-1;s++)a=Q(this,o[i+s],t,s),a===q&&(a=this._$AH[s]),n||=!O(a)||a!==this._$AH[s],a===Z?e=Z:e!==Z&&(e+=(a??"")+r[s+1]),this._$AH[s]=a}n&&!o&&this.j(e)}j(e){e===Z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class oe extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Z?void 0:e}}class re extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Z)}}class ne extends ie{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??Z)===q)return;const i=this._$AH,o=e===Z&&i!==Z||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==Z&&(i===Z||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const ae=k.litHtmlPolyfillSupport;ae?.(Y,te),(k.litHtmlVersions??=[]).push("3.3.3");const de=globalThis;class le extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const o=i?.renderBefore??t;let r=o._$litPart$;if(void 0===r){const e=i?.renderBefore??null;o._$litPart$=r=new te(t.insertBefore(N(),e),e,void 0,i??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}le._$litElement$=!0,le.finalized=!0,de.litElementHydrateSupport?.({LitElement:le});const ce=de.litElementPolyfillSupport;ce?.({LitElement:le}),(de.litElementVersions??=[]).push("4.2.2");const he=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ue={attribute:!0,type:String,converter:g,reflect:!1,hasChanged:$},pe=(e=ue,t,i)=>{const{kind:o,metadata:r}=i;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===o){const{name:o}=i;return{set(i){const r=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,r,e,!0,i)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=i;return function(i){const r=this[o];t.call(this,i),this.requestUpdate(o,r,e,!0,i)}}throw Error("Unsupported decorator location: "+o)};function ve(e){return(t,i)=>"object"==typeof i?pe(e,t,i):((e,t,i)=>{const o=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),o?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function _e(e){return ve({...e,state:!0,attribute:!1})}const ye="en",me={nodes:[],edges:[],overlays:[]};function fe(e){return{...e,type:"custom:heating-visualizer-card",schema:(t=e.schema,{nodes:[...t?.nodes??[]],edges:[...t?.edges??[]],overlays:[...t?.overlays??[]]})};var t}function ge(e){return"undefined"!=typeof crypto&&"function"==typeof crypto.randomUUID?`${e}_${crypto.randomUUID().slice(0,8)}`:`${e}_${Math.random().toString(36).slice(2,10)}`}const $e={en:{"devices.heat_pump.name":"Heat pump","devices.heat_pump.ports.cold_in":"Cold inlet","devices.heat_pump.ports.hot_out":"Hot outlet","devices.valve_3way.name":"3-way valve","devices.valve_3way.ports.in":"Inlet","devices.valve_3way.ports.out_a":"Outlet A","devices.valve_3way.ports.out_b":"Outlet B","devices.boiler.name":"Boiler","devices.boiler.ports.cold_in":"Cold inlet","devices.boiler.ports.hot_out":"Hot outlet","devices.junction.name":"Junction","devices.junction.ports.in":"Inlet","devices.junction.ports.out_top":"Top outlet","devices.junction.ports.out_bottom":"Bottom outlet","devices.circulation_pump.name":"Circulation pump","devices.circulation_pump.ports.in":"Inlet","devices.circulation_pump.ports.out":"Outlet","devices.floor_heating.name":"Floor heating","devices.floor_heating.ports.in":"Supply","devices.floor_heating.ports.out":"Return","devices.manifold.name":"Floor heating manifold","devices.manifold.ports.supply_in":"Supply","devices.manifold.ports.return_out":"Return","devices.manifold.ports.loop_out":"Loop {0} supply","devices.manifold.ports.loop_in":"Loop {0} return","devices.manifold.channels":"Loops (actuators)","devices.manifold.channel":"Loop {0}","devices.buffer_tank.name":"Buffer tank","devices.buffer_tank.ports.source_in":"From heat source","devices.buffer_tank.ports.source_out":"Back to heat source","devices.buffer_tank.ports.supply_out":"To heating system","devices.buffer_tank.ports.return_in":"Return from heating system","devices.buffer_tank.channels":"Temperature sensors (top → bottom)","devices.buffer_tank.channel":"Sensor {0}","devices.mixing_valve.name":"Mixing valve","devices.mixing_valve.ports.hot_in":"Hot branch","devices.mixing_valve.ports.return_in":"Return (bypass)","devices.mixing_valve.ports.mixed_out":"Mixed water","devices.electric_heater.name":"Electric flow heater","devices.electric_heater.ports.in":"Inlet","devices.electric_heater.ports.out":"Outlet","editor.heater_title":"Electric heating element","devices.outdoor_unit.name":"Heat pump outdoor unit","devices.outdoor_unit.ports.hot_out":"Heating water out","devices.outdoor_unit.ports.cold_in":"Heating water return","devices.outdoor_unit.channels":"Displayed values","devices.outdoor_unit.channel":"Value {0}","devices.inline.ports.in":"Inlet","devices.inline.ports.out":"Outlet","devices.pipe_sensor.name":"Pipe sensor","editor.node_value_entity":"Value entity","editor.node_value_attribute":"Displayed attribute","editor.node_value_attribute_helper":"Empty = entity state, e.g. current_temperature","devices.heat_source.ports.supply_out":"Supply","devices.heat_source.ports.return_in":"Return","devices.gas_boiler.name":"Gas boiler","devices.electric_boiler.name":"Electric boiler","devices.solid_fuel_boiler.name":"Solid fuel boiler / stove","devices.solar_collector.name":"Solar collector","devices.solar_collector.ports.hot_out":"Hot outlet","devices.solar_collector.ports.cold_in":"Cold inlet","devices.four_port.ports.primary_in":"Primary supply","devices.four_port.ports.primary_out":"Primary return","devices.four_port.ports.secondary_out":"Secondary supply","devices.four_port.ports.secondary_in":"Secondary return","devices.hydraulic_separator.name":"Hydraulic separator","devices.plate_heat_exchanger.name":"Plate heat exchanger","editor.node_state_position_entity":"Actuator entity","editor.node_state_position_attribute":"Position attribute (%)","editor.node_state_position_helper":"Empty = current_position or the entity state","editor.channel_name":"Name","editor.title":"Schema editor","editor.add_device":"Add device","editor.device_type":"Device type","editor.add_selected_device":"Add selected device","editor.add_heat_pump":"Heat pump","editor.delete_selected":"Delete selected","editor.rotate_selected":"Rotate","editor.empty_hint":"Add a device to start building your schema.","editor.language":"Language","editor.translations":"Translations","editor.schema_tab":"Schema","editor.overlay_tab":"Overlays","editor.overlays_empty":"No overlays yet. Switch to overlay tab to add sensor labels.","editor.add_overlay":"Add overlay","editor.connection_pending":"Connecting from {0} — click a compatible port","editor.node_state_title":"Selected device state binding","editor.node_state_entity":"State entity","editor.node_state_active":"Active state","editor.node_state_mode_attribute":"Valve mode attribute","editor.node_state_branch_a":"Valve branch A value","editor.node_state_branch_b":"Valve branch B value","editor.language_auto":"Home Assistant language","editor.default_value":"Default: {0}","overlay.entity":"Entity","overlay.name":"Name","overlay.template":"Display template","overlay.rules":"Conditional rules","overlay.add_rule":"Add rule","overlay.rule.condition":"Condition","overlay.rule.condition_state":"State equals","overlay.rule.condition_numeric":"Numeric value","overlay.rule.entity":"Entity","overlay.rule.entity_helper":"Empty = overlay entity","overlay.rule.state":"State","overlay.rule.above":"Above","overlay.rule.below":"Below","overlay.rule.color":"Text color","overlay.rule.hide":"Hide overlay","card.empty":"No schema configured. Edit this card to design your heating layout."},cs:{"devices.heat_pump.name":"Tepelné čerpadlo","devices.heat_pump.ports.cold_in":"Studená voda – vstup","devices.heat_pump.ports.hot_out":"Teplá voda – výstup","devices.valve_3way.name":"Třícestný ventil","devices.valve_3way.ports.in":"Vstup","devices.valve_3way.ports.out_a":"Výstup A","devices.valve_3way.ports.out_b":"Výstup B","devices.boiler.name":"Bojler","devices.boiler.ports.cold_in":"Studená voda – vstup","devices.boiler.ports.hot_out":"Teplá voda – výstup","devices.junction.name":"Uzel","devices.junction.ports.in":"Vstup","devices.junction.ports.out_top":"Horní výstup","devices.junction.ports.out_bottom":"Spodní výstup","devices.circulation_pump.name":"Oběhové čerpadlo","devices.circulation_pump.ports.in":"Vstup","devices.circulation_pump.ports.out":"Výstup","devices.floor_heating.name":"Podlahové topení","devices.floor_heating.ports.in":"Přívod","devices.floor_heating.ports.out":"Vratka","devices.manifold.name":"Rozdělovač podlahového topení","devices.manifold.ports.supply_in":"Přívod","devices.manifold.ports.return_out":"Vratka","devices.manifold.ports.loop_out":"Okruh {0} – přívod","devices.manifold.ports.loop_in":"Okruh {0} – vratka","devices.manifold.channels":"Okruhy (termopohony)","devices.manifold.channel":"Okruh {0}","devices.buffer_tank.name":"Akumulační nádrž","devices.buffer_tank.ports.source_in":"Od zdroje tepla","devices.buffer_tank.ports.source_out":"Zpět ke zdroji tepla","devices.buffer_tank.ports.supply_out":"Do topného systému","devices.buffer_tank.ports.return_in":"Vratka z topného systému","devices.buffer_tank.channels":"Teplotní čidla (shora dolů)","devices.buffer_tank.channel":"Čidlo {0}","devices.mixing_valve.name":"Směšovací ventil","devices.mixing_valve.ports.hot_in":"Teplá větev","devices.mixing_valve.ports.return_in":"Vratka (bypass)","devices.mixing_valve.ports.mixed_out":"Smíšená voda","devices.electric_heater.name":"Průtokový elektrický ohřívač","devices.electric_heater.ports.in":"Vstup","devices.electric_heater.ports.out":"Výstup","editor.heater_title":"Elektrická topná spirála","devices.outdoor_unit.name":"Venkovní jednotka TČ","devices.outdoor_unit.ports.hot_out":"Výstup topné vody","devices.outdoor_unit.ports.cold_in":"Vratka topné vody","devices.outdoor_unit.channels":"Zobrazené hodnoty","devices.outdoor_unit.channel":"Hodnota {0}","devices.inline.ports.in":"Vstup","devices.inline.ports.out":"Výstup","devices.pipe_sensor.name":"Čidlo na potrubí","editor.node_value_entity":"Entita hodnoty","editor.node_value_attribute":"Zobrazený atribut","editor.node_value_attribute_helper":"Prázdné = stav entity, např. current_temperature","devices.heat_source.ports.supply_out":"Přívod","devices.heat_source.ports.return_in":"Vratka","devices.gas_boiler.name":"Plynový kotel","devices.electric_boiler.name":"Elektrokotel","devices.solid_fuel_boiler.name":"Kotel na tuhá paliva / krb","devices.solar_collector.name":"Solární kolektor","devices.solar_collector.ports.hot_out":"Teplý výstup","devices.solar_collector.ports.cold_in":"Studený vstup","devices.four_port.ports.primary_in":"Primár – přívod","devices.four_port.ports.primary_out":"Primár – vratka","devices.four_port.ports.secondary_out":"Sekundár – přívod","devices.four_port.ports.secondary_in":"Sekundár – vratka","devices.hydraulic_separator.name":"Hydraulický vyrovnávač","devices.plate_heat_exchanger.name":"Deskový výměník","editor.node_state_position_entity":"Entita pohonu","editor.node_state_position_attribute":"Atribut polohy (%)","editor.node_state_position_helper":"Prázdné = current_position nebo stav entity","editor.channel_name":"Název","editor.title":"Editor schématu","editor.add_device":"Přidat zařízení","editor.device_type":"Typ zařízení","editor.add_selected_device":"Přidat vybrané zařízení","editor.add_heat_pump":"Tepelné čerpadlo","editor.delete_selected":"Smazat vybrané","editor.rotate_selected":"Otočit","editor.empty_hint":"Přidejte zařízení a začněte sestavovat schéma.","editor.language":"Jazyk","editor.translations":"Překlady","editor.schema_tab":"Schéma","editor.overlay_tab":"Popisky","editor.overlays_empty":"Zatím žádné popisky. Přepněte na záložku Popisky.","editor.add_overlay":"Přidat popisek","editor.connection_pending":"Napojování z {0} — klikněte na kompatibilní port","editor.node_state_title":"Stavové napojení vybraného zařízení","editor.node_state_entity":"Entita stavu","editor.node_state_active":"Aktivní stav","editor.node_state_mode_attribute":"Atribut režimu ventilu","editor.node_state_branch_a":"Hodnota větve A","editor.node_state_branch_b":"Hodnota větve B","editor.language_auto":"Jazyk Home Assistantu","editor.default_value":"Výchozí: {0}","overlay.entity":"Entita","overlay.name":"Název","overlay.template":"Šablona zobrazení","overlay.rules":"Podmíněná pravidla","overlay.add_rule":"Přidat pravidlo","overlay.rule.condition":"Podmínka","overlay.rule.condition_state":"Stav je roven","overlay.rule.condition_numeric":"Číselná hodnota","overlay.rule.entity":"Entita","overlay.rule.entity_helper":"Prázdné = entita popisku","overlay.rule.state":"Stav","overlay.rule.above":"Nad","overlay.rule.below":"Pod","overlay.rule.color":"Barva textu","overlay.rule.hide":"Skrýt popisek","card.empty":"Schéma není nakonfigurováno. Upravte kartu a navrhněte topné schéma."}};class be{constructor(e,t={}){this._language=e,this._userTranslations=t}get language(){return this._language}t(e,...t){let i=this._lookup(e);return t.forEach((e,t)=>{i=i.replace(`{${t}}`,e)}),i}_lookup(e){const t=this._userTranslations[this._language]?.[e];if(void 0!==t)return t;const i=$e[this._language]?.[e];if(void 0!==i)return i;const o=this._userTranslations[ye]?.[e];if(void 0!==o)return o;const r=$e[ye]?.[e];return void 0!==r?r:e}getAvailableLanguages(){return[...new Set([...Object.keys($e),...Object.keys(this._userTranslations)])].sort()}getEditableTranslations(){return{...$e[ye]??{},...$e[this._language]??{},...this._userTranslations[this._language]??{}}}}function xe(e,t){const i=t??{};return new be(function(e,t){if(!e)return ye;if($e[e]||t[e])return e;const i=e.split("-")[0];return $e[i]||t[i]?i:e}(e,i),i)}const ke="states",we="hassFormatters",Ae="hassInternationalization";class Se{constructor(e,t){this._host=e,this._context=t,this._callback=(e,t)=>{this._unsubscribe&&this._unsubscribe!==t&&this._unsubscribe(),this._unsubscribe=t,e!==this.value&&(this.value=e,this._host.requestUpdate())},e.addController(this)}hostConnected(){const e=new Event("context-request",{bubbles:!0,composed:!0});e.context=this._context,e.contextTarget=this._host,e.callback=this._callback,e.subscribe=!0,this._host.dispatchEvent(e)}hostDisconnected(){this._unsubscribe?.(),this._unsubscribe=void 0}}const Ee={type:"heat_pump",labelKey:"devices.heat_pump.name",width:120,height:100,ports:[{id:"cold_in",labelKey:"devices.heat_pump.ports.cold_in",kind:"inlet",position:{x:0,y:70}},{id:"hot_out",labelKey:"devices.heat_pump.ports.hot_out",kind:"outlet",position:{x:120,y:30}}]};const Ce={type:"manifold",labelKey:"devices.manifold.name",width:184,height:130,ports:[{id:"supply_in",labelKey:"devices.manifold.ports.supply_in",kind:"inlet",position:{x:0,y:30}},{id:"return_out",labelKey:"devices.manifold.ports.return_out",kind:"outlet",position:{x:0,y:100}}],channels:{kind:"switch",titleKey:"devices.manifold.channels",itemKey:"devices.manifold.channel",min:1,max:12,default:4},resolve:e=>function(e){const t=[];for(let i=0;i<e;i++){const e=50+36*i,o=String(i+1);t.push({id:`loop_${o}_out`,labelKey:"devices.manifold.ports.loop_out",labelArgs:[o],kind:"outlet",position:{x:e,y:0}},{id:`loop_${o}_in`,labelKey:"devices.manifold.ports.loop_in",labelArgs:[o],kind:"inlet",position:{x:e,y:130}})}return{...Ce,width:50+36*e-10,ports:[...Ce.ports,...t]}}(e.channels?.length||4)};const Pe={type:Ie="pipe_sensor",labelKey:`devices.${Ie}.name`,width:80,height:44,ports:[{id:"in",labelKey:"devices.inline.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out",labelKey:"devices.inline.ports.out",kind:"outlet",position:{x:80,y:30}}],valueDisplay:"only"};var Ie;function Me(e){return{type:e,labelKey:`devices.${e}.name`,width:100,height:130,valueDisplay:"with_state",ports:[{id:"supply_out",labelKey:"devices.heat_source.ports.supply_out",kind:"outlet",position:{x:100,y:35}},{id:"return_in",labelKey:"devices.heat_source.ports.return_in",kind:"inlet",position:{x:100,y:105}}]}}const Ne=Me("gas_boiler"),Oe=Me("electric_boiler"),Te=Me("solid_fuel_boiler");function ze(e,t,i){const o=(e,t,i,o)=>({id:e,labelKey:`devices.four_port.ports.${e}`,kind:t,position:{x:i,y:o}});return{type:e,labelKey:`devices.${e}.name`,width:t,height:i,ports:[o("primary_in","inlet",0,30),o("primary_out","outlet",0,i-30),o("secondary_out","outlet",t,30),o("secondary_in","inlet",t,i-30)]}}const Ke={...ze("hydraulic_separator",80,160),valueDisplay:"only"},Le=ze("plate_heat_exchanger",100,120),Ue=[Ee,{type:"outdoor_unit",labelKey:"devices.outdoor_unit.name",width:170,height:120,ports:[{id:"hot_out",labelKey:"devices.outdoor_unit.ports.hot_out",kind:"outlet",position:{x:170,y:40}},{id:"cold_in",labelKey:"devices.outdoor_unit.ports.cold_in",kind:"inlet",position:{x:170,y:90}}],channels:{kind:"sensor",titleKey:"devices.outdoor_unit.channels",itemKey:"devices.outdoor_unit.channel",min:0,max:4,default:0}},Ne,Oe,Te,{type:"solar_collector",labelKey:"devices.solar_collector.name",width:150,height:100,valueDisplay:"with_state",ports:[{id:"hot_out",labelKey:"devices.solar_collector.ports.hot_out",kind:"outlet",position:{x:150,y:22}},{id:"cold_in",labelKey:"devices.solar_collector.ports.cold_in",kind:"inlet",position:{x:150,y:84}}]},{type:"boiler",labelKey:"devices.boiler.name",width:90,height:140,heater:!0,ports:[{id:"cold_in",labelKey:"devices.boiler.ports.cold_in",kind:"inlet",position:{x:0,y:110}},{id:"hot_out",labelKey:"devices.boiler.ports.hot_out",kind:"outlet",position:{x:90,y:30}}]},{type:"buffer_tank",labelKey:"devices.buffer_tank.name",width:100,height:186,heater:!0,ports:[{id:"source_in",labelKey:"devices.buffer_tank.ports.source_in",kind:"inlet",position:{x:0,y:40}},{id:"source_out",labelKey:"devices.buffer_tank.ports.source_out",kind:"outlet",position:{x:0,y:150}},{id:"supply_out",labelKey:"devices.buffer_tank.ports.supply_out",kind:"outlet",position:{x:100,y:40}},{id:"return_in",labelKey:"devices.buffer_tank.ports.return_in",kind:"inlet",position:{x:100,y:150}}],channels:{kind:"sensor",titleKey:"devices.buffer_tank.channels",itemKey:"devices.buffer_tank.channel",min:1,max:5,default:3}},Ke,Le,{type:"valve_3way",labelKey:"devices.valve_3way.name",width:100,height:100,ports:[{id:"in",labelKey:"devices.valve_3way.ports.in",kind:"inlet",position:{x:0,y:50}},{id:"out_a",labelKey:"devices.valve_3way.ports.out_a",kind:"outlet",position:{x:100,y:25}},{id:"out_b",labelKey:"devices.valve_3way.ports.out_b",kind:"outlet",position:{x:100,y:75}}]},{type:"mixing_valve",labelKey:"devices.mixing_valve.name",width:100,height:110,ports:[{id:"hot_in",labelKey:"devices.mixing_valve.ports.hot_in",kind:"inlet",position:{x:0,y:70}},{id:"return_in",labelKey:"devices.mixing_valve.ports.return_in",kind:"inlet",position:{x:50,y:110}},{id:"mixed_out",labelKey:"devices.mixing_valve.ports.mixed_out",kind:"outlet",position:{x:100,y:70}}]},{type:"circulation_pump",labelKey:"devices.circulation_pump.name",width:90,height:90,ports:[{id:"in",labelKey:"devices.circulation_pump.ports.in",kind:"inlet",position:{x:0,y:45}},{id:"out",labelKey:"devices.circulation_pump.ports.out",kind:"outlet",position:{x:90,y:45}}]},Ce,{type:"floor_heating",labelKey:"devices.floor_heating.name",width:140,height:90,ports:[{id:"in",labelKey:"devices.floor_heating.ports.in",kind:"inlet",position:{x:0,y:45}},{id:"out",labelKey:"devices.floor_heating.ports.out",kind:"outlet",position:{x:140,y:45}}]},{type:"electric_heater",labelKey:"devices.electric_heater.name",width:120,height:60,ports:[{id:"in",labelKey:"devices.electric_heater.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out",labelKey:"devices.electric_heater.ports.out",kind:"outlet",position:{x:120,y:30}}]},{type:"junction",labelKey:"devices.junction.name",width:60,height:60,ports:[{id:"in",labelKey:"devices.junction.ports.in",kind:"inlet",position:{x:0,y:30}},{id:"out_top",labelKey:"devices.junction.ports.out_top",kind:"outlet",position:{x:60,y:15}},{id:"out_bottom",labelKey:"devices.junction.ports.out_bottom",kind:"outlet",position:{x:60,y:45}}]},Pe],He=Ue.map(e=>e.type),je=new Map(Ue.map(e=>[e.type,e]));function Re(e){return je.get(e)}function De(e){const t=je.get(e.type);return t?.resolve?t.resolve(e):t}function Ve(e){return((e??0)%360+360)%360}function Be(e,t){const i=t*Math.PI/180,o=Math.cos(i),r=Math.sin(i);return{x:Math.round(1e3*(e.x*o-e.y*r))/1e3,y:Math.round(1e3*(e.x*r+e.y*o))/1e3}}function Fe(e,t){const{x:i,y:o}=t.position,r=[[i,{x:-1,y:0}],[e.width-i,{x:1,y:0}],[o,{x:0,y:-1}],[e.height-o,{x:0,y:1}]];return r.sort((e,t)=>e[0]-t[0]),r[0][1]}function qe(e,t){const i=De(e);if(!i)return;const o=i.ports.find(e=>e.id===t);if(!o)return;const r=Ve(e.rotation),n=i.width/2,s=i.height/2,a=Be({x:o.position.x-n,y:o.position.y-s},r);return{nodeId:e.id,portId:o.id,x:e.position.x+n+a.x,y:e.position.y+s+a.y,kind:o.kind,direction:Be(Fe(i,o),r)}}function Ze(e,t){const i=Ve(e.rotation)%180!=0,o=i?t.height:t.width,r=i?t.width:t.height;return{x:e.position.x+(t.width-o)/2,y:e.position.y+(t.height-r)/2,width:o,height:r}}function We(e,t){return e.nodeId===t.nodeId&&e.portId===t.portId}function Je(e,t=10){return Math.round(e/t)*t}function Ge(e,t,i){if(!e||!i.entity_id)return"—";const o=e[i.entity_id];if(!o)return"—";if(i.template)return function(e,t,i){return e.replace(/\{\{\s*state\s*\}\}/g,t).replace(/\{\{\s*attr\(['"](\w+)['"]\)\s*\}\}/g,(e,t)=>String(i[t]??""))}(i.template,o.state,o.attributes);if(t)return t.formatEntityState(o);const r=o.attributes.unit_of_measurement;return r?`${o.state} ${r}`:o.state}const Xe=new Set(["primary","accent","disabled","red","pink","purple","deep-purple","indigo","blue","light-blue","cyan","teal","green","light-green","lime","yellow","amber","orange","deep-orange","brown","light-grey","grey","dark-grey","blue-grey","black","white"]);function Ye(e){return Xe.has(e)?`var(--${e}-color)`:e}function Qe(e,t,i){const o=e[t.entity||i];if(!o)return!1;if("state"===t.condition)return void 0!==t.state&&o.state===t.state;if(void 0===t.above&&void 0===t.below)return!1;const r=Number(o.state);return!Number.isNaN(r)&&((void 0===t.above||r>t.above)&&(void 0===t.below||r<t.below))}const et=new Set(["heating","preheating"]);function tt(e,t,i){if(!e||!t?.entity_id)return{active:!1};const o=e[t.entity_id];if(!o)return{active:!1};const r=t.value_attribute,n=void 0!==r?o.attributes[r]:void 0,s=void 0!==n,a=s?n:o.state,d=Number(a),l=o.attributes.unit_of_measurement;let c;c=void 0!==r&&s?i?i.formatEntityAttributeValue(o,r):String(n):i?i.formatEntityState(o):l?`${o.state} ${l}`:o.state;const h=function(e,t){if(void 0!==t)return e.state===t;const i=e.attributes.hvac_action;return"string"==typeof i?et.has(i):"on"===e.state||"heat"===e.state}(o,t.active_state),u=t.mode_attribute??"position",p=String(o.attributes[u]??o.state??"");let v;return p===(t.branch_a_value??"a")&&(v="a"),p===(t.branch_b_value??"b")&&(v="b"),{active:h,valveBranch:v,value:c,numeric:""!==String(a??"").trim()&&Number.isFinite(d)?d:void 0,position:it(o,t.mode_attribute),unit:l,fromAttribute:s}}function it(e,t){const i=t?e.attributes[t]:e.attributes.current_position??e.state,o=Number(i);if(null!=i&&""!==i&&Number.isFinite(o))return Math.min(100,Math.max(0,o))}const ot="#ef5350",rt="#42a5f5",nt="#ff7043",st="var(--card-background-color, #1c1c1c)",at="var(--divider-color, #888)";function dt(e){if(void 0===e)return at;const t=Math.min(1,Math.max(0,(e-20)/40));return`hsl(${Math.round(220*(1-t))}, 75%, 50%)`}function lt(e,t,i="#4caf50"){return e.active?i:t?"var(--primary-color, #03a9f4)":at}function ct(e){return e?2.5:1.5}function ht(e,t){return e.ports.map(e=>F`
    <circle
      class="port port-${e.kind}"
      data-port-id="${e.id}"
      cx="${e.position.x}" cy="${e.position.y}" r="5"
      fill="${st}"
      stroke="${"inlet"===e.kind?"#4fc3f7":"#ff8a65"}"
      stroke-width="2"
    ><title>${t.t(e.labelKey,...e.labelArgs??[])}</title></circle>
  `)}function ut(e,t,i,o){const r=i/6;let n=`M ${e} ${t}`;for(let i=1;i<=6;i++)n+=` L ${e+i*r} ${t+(i%2==0?0:-8)}`;const s=o.active?nt:at;return F`
    <path class="heater ${o.active?"active":""}" d="${n}" fill="none"
      stroke="${s}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />
  `}function pt(e,t){return e.ports.map(i=>{const{x:o,y:r}=i.position,n=0===o?t:o===e.width?-t:0,s=0===r?t:r===e.height?-t:0;return F`<line x1="${o}" y1="${r}" x2="${o+n}" y2="${r+s}" stroke="${at}" stroke-width="2" />`})}function vt(e){return void 0!==e.numeric||e.fromAttribute?e.value:void 0}function _t(e,t,i,o=1){return F`
    <path d="${function(e,t,i=1){const o=e=>e*i;return`M ${e} ${t+o(16)} C ${e-o(13)} ${t+o(16)}, ${e-o(13)} ${t}, ${e-o(4)} ${t-o(16)}\n    C ${e-o(2)} ${t-o(6)}, ${e+o(4)} ${t-o(4)}, ${e+o(4)} ${t-o(10)}\n    C ${e+o(12)} ${t-o(2)}, ${e+o(13)} ${t+o(16)}, ${e} ${t+o(16)} Z`}(e,t,o)}"
      fill="${i?nt:"none"}" fill-opacity="0.85"
      stroke="${i?nt:at}" stroke-width="1.5" stroke-linejoin="round" />
  `}function yt(e,t,i,o,r){const n=e.width/2-4,s=e.height/2+14,a=vt(o);let d;return d="coil"===r?ut(n-20,s+6,40,o):"logs"===r?F`
      ${_t(n,s-6,o.active,.8)}
      <path d="M ${n-18} ${s+18} L ${n+18} ${s+10} M ${n-18} ${s+10} L ${n+18} ${s+18}"
        stroke="#8d6e63" stroke-width="5" stroke-linecap="round" />
    `:_t(n,s,o.active),F`
    <g class="device device-heat-source">
      ${pt(e,12)}
      <rect x="8" y="10" width="${e.width-20}" height="${e.height-20}" rx="8"
        fill="${st}" stroke="${lt(o,i,nt)}"
        stroke-width="${ct(i)}" />
      ${a?F`<text x="${n}" y="34" text-anchor="middle" class="device-value">${a}</text>`:F``}
      ${d}
      ${ht(e,t)}
    </g>
  `}const mt="#ffb300";function ft(e,t,i,o,r){switch(e){case"gas_boiler":return yt(t,i,o,r,"flame");case"electric_boiler":return yt(t,i,o,r,"coil");case"solid_fuel_boiler":return yt(t,i,o,r,"logs");case"solar_collector":return function(e,t,i,o){const r=lt(o,i,mt),n=vt(o);return F`
    <g class="device device-solar-collector">
      <path d="M 124 22 L ${e.width} 22 M 100 84 L ${e.width} 84" stroke="${at}" stroke-width="2" />
      <path d="M 10 84 L 36 22 L 124 22 L 100 84 Z" fill="${st}"
        stroke="${r}" stroke-width="${ct(i)}" stroke-linejoin="round" />
      <path d="M 58 22 L 32 84 M 80 22 L 54 84 M 102 22 L 76 84 M 23 53 L 112 53"
        stroke="${at}" stroke-width="1" />
      <circle cx="20" cy="14" r="6" fill="${o.active?mt:"none"}" stroke="${mt}" stroke-width="1.5" />
      ${n?F`<text x="67" y="${e.height-2}" text-anchor="middle" class="device-value">${n}</text>`:F``}
      ${ht(e,t)}
    </g>
  `}(t,i,o,r);case"hydraulic_separator":return function(e,t,i,o){const r=25,n=e.width-25,s=e.height-8,a=e.height/2,d=vt(o);return F`
    <g class="device device-hydraulic-separator">
      ${pt(e,r)}
      <rect x="${r}" y="${8}" width="${n-r}" height="${a-8}" fill="${ot}" opacity="0.25" />
      <rect x="${r}" y="${a}" width="${n-r}" height="${s-a}" fill="${rt}" opacity="0.25" />
      <rect x="${r}" y="${8}" width="${n-r}" height="${s-8}" rx="${(n-r)/2}"
        fill="none" stroke="${lt(o,i)}" stroke-width="${ct(i)}" />
      ${d?F`<text x="${e.width/2}" y="${a+4}" text-anchor="middle" class="device-value">${d}</text>`:F``}
      ${ht(e,t)}
    </g>
  `}(t,i,o,r);case"plate_heat_exchanger":return function(e,t,i,o){const r=e.width-22,n=[];for(let t=29,i=0;t<r-3;t+=7,i++)n.push(F`<line x1="${t}" y1="18" x2="${t}" y2="${e.height-18}"
      stroke="${i%2==0?ot:rt}" stroke-width="2" opacity="0.8" />`);return F`
    <g class="device device-plate-heat-exchanger">
      ${pt(e,22)}
      <rect x="${22}" y="10" width="${r-22}" height="${e.height-20}" rx="4"
        fill="${st}" stroke="${lt(o,i)}" stroke-width="${ct(i)}" />
      ${n}
      ${ht(e,t)}
    </g>
  `}(t,i,o,r);default:return}}function gt(e,t,i,o,r,n={}){const s=n.channels??[];switch(e){case"heat_pump":return function(e,t,i,o){const r=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",n=i?2.5:1.5;return F`
    <g class="device device-heat-pump">
      <rect
        x="10" y="15" width="100" height="70" rx="8"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${r}" stroke-width="${n}"
      />
      <circle cx="60" cy="50" r="22"
        fill="none" stroke="${r}" stroke-width="${n}"
      />
      <path d="M 48 50 L 72 50 M 60 38 L 60 62"
        stroke="var(--primary-color, #03a9f4)" stroke-width="2" stroke-linecap="round"
      />
      ${ht(e,t)}
    </g>
  `}(t,i,o,r);case"valve_3way":return function(e,t,i,o){const r=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",n=i?2.5:1.5,s="a"===o.valveBranch?"#4caf50":"var(--divider-color, #555)",a="b"===o.valveBranch?"#4caf50":"var(--divider-color, #555)";return F`
    <g class="device device-valve-3way">
      <polygon
        points="10,50 45,15 45,35 90,35 90,65 45,65 45,85"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${r}" stroke-width="${n}"
      />
      <line x1="45" y1="50" x2="90" y2="25" stroke="${s}" stroke-width="3" />
      <line x1="45" y1="50" x2="90" y2="75" stroke="${a}" stroke-width="3" />
      ${ht(e,t)}
    </g>
  `}(t,i,o,r);case"boiler":return function(e,t,i,o,r){const n=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return F`
    <g class="device device-boiler">
      <rect
        x="10" y="10" width="70" height="120" rx="18"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${n}" stroke-width="${i?2.5:1.5}"
      />
      <path d="M 30 35 L 60 35 M 30 55 L 60 55 M 30 75 L 60 75"
        stroke="var(--primary-color, #03a9f4)" stroke-width="2" stroke-linecap="round" />
      ${r?ut(24,100,42,r):F``}
      ${ht(e,t)}
    </g>
  `}(t,i,o,r,n.heater);case"junction":return function(e,t,i,o){const r=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return F`
    <g class="device device-junction">
      <circle
        cx="30" cy="30" r="18"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${r}" stroke-width="${i?2.5:1.5}"
      />
      ${ht(e,t)}
    </g>
  `}(t,i,o,r);case"circulation_pump":return function(e,t,i,o){const r=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return F`
    <g class="device device-circulation-pump">
      <circle
        cx="45" cy="45" r="28"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${r}" stroke-width="${i?2.5:1.5}"
      />
      <path d="M 32 52 A 14 14 0 0 1 58 38"
        fill="none" stroke="var(--primary-color, #03a9f4)" stroke-width="2" stroke-linecap="round" />
      <polygon points="58,38 52,38 56,32" fill="var(--primary-color, #03a9f4)" />
      ${ht(e,t)}
    </g>
  `}(t,i,o,r);case"floor_heating":return function(e,t,i,o){const r=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)";return F`
    <g class="device device-floor-heating">
      <rect
        x="10" y="18" width="120" height="55" rx="8"
        fill="var(--card-background-color, #1c1c1c)"
        stroke="${r}" stroke-width="${i?2.5:1.5}"
      />
      <path d="M 20 40 C 35 30, 50 50, 65 40 C 80 30, 95 50, 110 40 C 115 37, 120 37, 126 40"
        fill="none" stroke="var(--primary-color, #03a9f4)" stroke-width="2" />
      ${ht(e,t)}
    </g>
  `}(t,i,o,r);case"manifold":return function(e,t,i,o,r){const n=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",s=i?2.5:1.5,a=e.width-8,d=e.ports.filter(e=>e.id.startsWith("loop_")&&"outlet"===e.kind);return F`
    <g class="device device-manifold">
      <rect x="2" y="18" width="${e.width-4}" height="94" rx="6"
        fill="none" stroke="${n}" stroke-width="${s}" stroke-dasharray="4 3" />
      <rect x="4" y="22" width="${a}" height="16" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${ot}" stroke-width="2" />
      <rect x="4" y="92" width="${a}" height="16" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${rt}" stroke-width="2" />
      ${d.map((t,i)=>{const o=t.position.x,n=r[i]?.active??!1;return F`
          <line x1="${o}" y1="0" x2="${o}" y2="22" stroke="${ot}" stroke-width="2" />
          <rect class="actuator ${n?"active":""}" x="${o-7}" y="6" width="14" height="11" rx="2"
            fill="${n?"#4caf50":"var(--card-background-color, #1c1c1c)"}"
            stroke="${n?"#4caf50":"var(--divider-color, #888)"}" stroke-width="1.5" />
          <line x1="${o}" y1="108" x2="${o}" y2="${e.height}" stroke="${rt}" stroke-width="2" />
          <text x="${o}" y="69" text-anchor="middle" class="device-label">${i+1}</text>
        `})}
      ${ht(e,t)}
    </g>
  `}(t,i,o,r,s);case"buffer_tank":return function(e,t,i,o,r,n){const s=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",a=i?2.5:1.5,d=e.height-10,l=r.length,c=r.map((e,t)=>1===l?(16+d)/2:34+t*(d-16-36)/(l-1));return F`
    <g class="device device-buffer-tank">
      ${e.ports.map(e=>F`
        <line x1="${e.position.x}" y1="${e.position.y}" x2="${0===e.position.x?14:86}" y2="${e.position.y}"
          stroke="var(--divider-color, #888)" stroke-width="2" />
      `)}
      <rect x="14" y="10" width="72" height="${e.height-14}" rx="10"
        fill="var(--card-background-color, #1c1c1c)" stroke="${s}" stroke-width="${a}" />
      ${r.map((e,t)=>{const i=0===t?16:(c[t-1]+c[t])/2,o=t===l-1?d:(c[t]+c[t+1])/2,r=dt(e.numeric);return F`
          <rect x="17" y="${i}" width="66" height="${o-i}" fill="${r}" opacity="0.3" />
          <circle cx="18" cy="${c[t]}" r="3" fill="${r}" />
          <text x="52" y="${c[t]+4}" text-anchor="middle" class="device-value">
            ${e.value??"—"}
          </text>
        `})}
      ${n?ut(28,d-8,44,n):F``}
      ${ht(e,t)}
    </g>
  `}(t,i,o,r,s,n.heater);case"mixing_valve":return function(e,t,i,o){const r=i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",n=i?2.5:1.5,s=o.position,a=void 0===s?"var(--divider-color, #888)":`hsl(${Math.round(210*(1-s/100))}, 75%, 55%)`;return F`
    <g class="device device-mixing-valve">
      <line x1="0" y1="70" x2="22" y2="70" stroke="${ot}" stroke-width="3" />
      <line x1="50" y1="96" x2="50" y2="${e.height}" stroke="${rt}" stroke-width="3" />
      <line x1="78" y1="70" x2="${e.width}" y2="70" stroke="${a}" stroke-width="3" />
      <path d="M 22 56 L 50 70 L 22 84 Z M 78 56 L 50 70 L 78 84 Z M 36 98 L 50 70 L 64 98 Z"
        fill="var(--card-background-color, #1c1c1c)" stroke="${r}" stroke-width="${n}"
        stroke-linejoin="round" />
      <line x1="50" y1="36" x2="50" y2="70" stroke="${r}" stroke-width="2" />
      <rect x="28" y="10" width="44" height="26" rx="4"
        fill="var(--card-background-color, #1c1c1c)" stroke="${r}" stroke-width="${n}" />
      ${void 0===s?F``:F`<rect x="30" y="12" width="${40*s/100}" height="22" rx="3" fill="${a}" opacity="0.35" />`}
      <text x="50" y="27" text-anchor="middle" class="device-value">
        ${void 0===s?"—":`${Math.round(s)} %`}
      </text>
      ${ht(e,t)}
    </g>
  `}(t,i,o,r);case"electric_heater":return function(e,t,i,o){const r=o.active?nt:i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",n=i?2.5:1.5;return F`
    <g class="device device-electric-heater">
      <rect x="10" y="12" width="${e.width-20}" height="${e.height-24}" rx="8"
        fill="var(--card-background-color, #1c1c1c)" stroke="${r}" stroke-width="${n}" />
      ${ut(24,e.height/2+4,e.width-48,o)}
      ${ht(e,t)}
    </g>
  `}(t,i,o,r);case"outdoor_unit":return function(e,t,i,o,r){const n=o.active?"#4caf50":i?"var(--primary-color, #03a9f4)":"var(--divider-color, #888)",s=i?2.5:1.5;return F`
    <g class="device device-outdoor-unit">
      <rect x="10" y="12" width="${e.width-20}" height="${e.height-24}" rx="6"
        fill="var(--card-background-color, #1c1c1c)" stroke="${n}" stroke-width="${s}" />
      <circle cx="${58}" cy="${60}" r="34" fill="none" stroke="var(--divider-color, #888)" stroke-width="1.5" />
      <g class="fan ${o.active?"spinning":""}">
        ${[0,90,180,270].map(e=>F`
          <path d="${"M 0 0 C 6 -10, 20 -14, 26 -6 C 18 -2, 8 0, 0 0 Z"}" transform="translate(${58} ${60}) rotate(${e})"
            fill="var(--primary-color, #03a9f4)" opacity="0.75" />
        `)}
        <circle cx="${58}" cy="${60}" r="5" fill="var(--primary-color, #03a9f4)" />
      </g>
      ${r.map((e,t)=>F`
        <text x="104" y="${36+18*t}" class="device-value">
          <title>${e.label??""}</title>${e.value??"—"}
        </text>
      `)}
      ${ht(e,t)}
    </g>
  `}(t,i,o,r,s);case"pipe_sensor":return function(e,t,i,o,r){const n=e.width/2,s=e.height-14,a=o.unit?.includes("°")??!1,d=i?"var(--primary-color, #03a9f4)":a?dt(o.numeric):"var(--primary-color, #03a9f4)";return F`
    <g class="device device-inline-sensor">
      <line x1="0" y1="${s}" x2="${e.width}" y2="${s}" stroke="var(--divider-color, #888)" stroke-width="3" />
      <circle cx="${n}" cy="${s}" r="11" fill="var(--card-background-color, #1c1c1c)"
        stroke="${d}" stroke-width="${i?2.5:2}" />
      <path d="${function(e,t,i){switch(e){case"temperature":return`M ${t-1.5} ${i+2} V ${i-6} A 1.5 1.5 0 0 1 ${t+1.5} ${i-6} V ${i+2} M ${t-3} ${i+4.5} A 3 3 0 1 0 ${t+3} ${i+4.5} A 3 3 0 1 0 ${t-3} ${i+4.5}`;case"flow":return`M ${t-6} ${i} L ${t+5} ${i} M ${t+1} ${i-4} L ${t+5} ${i} L ${t+1} ${i+4}`;case"pressure":return`M ${t-6} ${i+3} A 6 6 0 1 1 ${t+6} ${i+3} M ${t} ${i+1} L ${t+4} ${i-4}`;case"energy":return`M ${t+1} ${i-7} L ${t-4} ${i+1} L ${t} ${i+1} L ${t-1} ${i+7} L ${t+4} ${i-1} L ${t} ${i-1} Z`}}(r,n,s)}" fill="${"none"}"
        stroke="${d}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <text x="${n}" y="${s-17}" text-anchor="middle" class="device-value">${o.value??"—"}</text>
      ${ht(e,t)}
    </g>
  `}(t,i,o,r,"temperature");default:return ft(e,t,i,o,r)}}let $t=class extends le{constructor(){super(...arguments),this.schema={nodes:[],edges:[],overlays:[]},this.editable=!1,this._states=new Se(this,ke),this._formatters=new Se(this,we),this._i18n=new Se(this,Ae)}updated(e){e.has("editable")&&this.toggleAttribute("editable",this.editable)}render(){const e=this._translator(),{nodes:t,edges:i,overlays:o}=this.schema,r=this._dragBounds??this._computeBounds(t);return B`
      <svg
        viewBox="${r.x} ${r.y} ${r.width} ${r.height}"
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
            <rect x="${r.x}" y="${r.y}" width="${r.width}" height="${r.height}" fill="url(#grid)" />
          `:Z}
        ${i.map(e=>this._renderEdge(e))}
        ${t.map(t=>this._renderNode(t,e))}
        ${o.map(t=>this._renderOverlay(t,e))}
      </svg>
    `}_translator(){return xe(this.config?.language??this._i18n.value?.language,this.config?.translations)}_computeBounds(e){if(!e.length)return{x:0,y:0,width:800,height:400};let t=1/0,i=1/0,o=-1/0,r=-1/0;for(const n of e){const e=De(n);if(!e)continue;const s=Ze(n,e);t=Math.min(t,s.x),i=Math.min(i,s.y-20),o=Math.max(o,s.x+s.width),r=Math.max(r,s.y+s.height+10)}return{x:t-40,y:i-40,width:o-t+80,height:r-i+80}}_renderEdge(e){const t=this.schema.nodes.find(t=>t.id===e.from.nodeId),i=this.schema.nodes.find(t=>t.id===e.to.nodeId);if(!t||!i)return B``;const o=qe(t,e.from.portId),r=qe(i,e.to.portId);if(!o||!r)return B``;const n=function(e,t){const i=Math.hypot(t.x-e.x,t.y-e.y),o=Math.max(30,i/2),r=e.x+e.direction.x*o,n=e.y+e.direction.y*o,s=t.x+t.direction.x*o,a=t.y+t.direction.y*o;return`M ${e.x} ${e.y} C ${r} ${n}, ${s} ${a}, ${t.x} ${t.y}`}(o,r),s=this.selectedEdgeId===e.id;return F`
      <path class="pipe ${s?"selected":""}" d="${n}" />
      ${this.editable?F`<path class="pipe-hit" data-edge-id="${e.id}" d="${n}" />`:Z}
    `}_renderNode(e,t){const i=De(e);if(!i)return B``;const o=this.selectedNodeId===e.id,r=this._states.value,n=this._formatters.value,s=tt(r,e.state,n),a=(e.channels??[]).map(e=>({...tt(r,e,n),label:e.name})),d=e.heater?.entity_id?tt(r,e.heater,n):void 0,l=gt(e.type,i,t,o,s,{channels:a,heater:d});if(!l)return B``;const c=Ve(e.rotation),h=Ze(e,i).y-e.position.y-4;return F`
      <g
        class="node ${this._dragNodeId===e.id?"dragging":""}"
        data-node-id="${e.id}"
        transform="translate(${e.position.x} ${e.position.y})"
      >
        <g transform="rotate(${c} ${i.width/2} ${i.height/2})">
          ${l}
        </g>
        <text x="${i.width/2}" y="${h}" text-anchor="middle" class="device-label">
          ${t.t(i.labelKey)}
        </text>
      </g>
    `}_renderOverlay(e,t){const i=this._states.value,o=this._formatters.value,r=Ge(i,o,e),n=function(e,t){let i,o,r=!0;if(!e||!t.rules?.length)return{color:i,className:o,visible:r};for(const n of t.rules)Qe(e,n,t.entity_id)&&(n.effect.color&&(i=Ye(n.effect.color)),n.effect.class&&(o=n.effect.class),void 0!==n.effect.visible&&(r=n.effect.visible));return{color:i,className:o,visible:r}}(i,e);if(!n.visible)return B``;const s=e.labelKey?t.t(e.labelKey):function(e,t,i){const o=e?.[i.entity_id];return o&&t?t.formatEntityName(o,i.name):"string"==typeof i.name?i.name:i.entity_id}(i,o,e),a=`${s}: ${r}`,d=Math.max(80,7*a.length+16);return F`
      <g class="overlay-group ${n.className??""}" transform="translate(${e.position.x} ${e.position.y})">
        <rect class="overlay-bg" x="0" y="0" width="${d}" height="22" rx="4" />
        <text class="overlay-text" x="8" y="15" fill="${n.color??"var(--primary-text-color, #e0e0e0)"}">
          ${a}
        </text>
      </g>
    `}_onCanvasPointerDown(e){if(!this.editable)return;const t=e.target,i=t?.getAttribute?.("data-edge-id");if(i)return void this.dispatchEvent(new CustomEvent("edge-select",{detail:{edgeId:i},bubbles:!0,composed:!0}));const o=t?.closest?.("[data-node-id]");if(!o)return void this._dispatchSelect(void 0);const r=o.getAttribute("data-node-id");if(!r)return;const n=this.schema.nodes.find(e=>e.id===r);if(!n)return;const s=t?.closest?.("[data-port-id]");if(s){const t=s.getAttribute("data-port-id");if(t)return this._dispatchPortClick(r,t),void e.stopPropagation()}this._dragNodeId=r;const a=this._toLocal(e);this._dragOffset=a?{x:a.x-n.position.x,y:a.y-n.position.y}:{x:0,y:0},this._dragBounds=this._computeBounds(this.schema.nodes),o.setPointerCapture(e.pointerId),this._dispatchSelect(r),e.preventDefault()}_toLocal(e){const t=this.renderRoot.querySelector("svg"),i=t?.getScreenCTM();if(!t||!i)return;const o=t.createSVGPoint();return o.x=e.clientX,o.y=e.clientY,o.matrixTransform(i.inverse())}_onCanvasPointerMove(e){if(!this.editable||!this._dragNodeId)return;const t=this.schema.nodes.find(e=>e.id===this._dragNodeId),i=this._toLocal(e);if(!t||!i)return;const o=this._dragOffset??{x:0,y:0},r={x:Je(i.x-o.x,10),y:Je(i.y-o.y,10)};r.x===t.position.x&&r.y===t.position.y||this.dispatchEvent(new CustomEvent("node-move",{detail:{nodeId:t.id,position:r},bubbles:!0,composed:!0}))}_onCanvasPointerUp(e){if(this._dragNodeId){const t=this.renderRoot.querySelector(`[data-node-id="${this._dragNodeId}"]`);t?.releasePointerCapture(e.pointerId),this._dragNodeId=void 0,this._dragOffset=void 0,this._dragBounds=void 0,this.requestUpdate()}}_dispatchSelect(e){this.dispatchEvent(new CustomEvent("node-select",{detail:{nodeId:e},bubbles:!0,composed:!0}))}_dispatchPortClick(e,t){this.dispatchEvent(new CustomEvent("port-click",{detail:{nodeId:e,portId:t},bubbles:!0,composed:!0}))}};$t.styles=s`
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
  `,e([ve({attribute:!1})],$t.prototype,"schema",void 0),e([ve({attribute:!1})],$t.prototype,"config",void 0),e([ve({type:Boolean})],$t.prototype,"editable",void 0),e([ve({attribute:!1})],$t.prototype,"selectedNodeId",void 0),e([ve({attribute:!1})],$t.prototype,"selectedEdgeId",void 0),e([ve({attribute:!1})],$t.prototype,"selectedPort",void 0),$t=e([he("heating-schema-canvas")],$t);const bt={entity_id:"editor.node_state_entity",active_state:"editor.node_state_active",mode_attribute:"editor.node_state_mode_attribute",branch_a_value:"editor.node_state_branch_a",branch_b_value:"editor.node_state_branch_b"},xt={active_state:"on",mode_attribute:"position",branch_a_value:"a",branch_b_value:"b"},kt={name:"value_attribute",selector:{attribute:{}},context:{filter_entity:"entity_id"}},wt={...bt,value_attribute:"editor.node_value_attribute"},At={value_attribute:"editor.node_value_attribute_helper"},St={...bt,entity_id:"editor.node_state_position_entity",mode_attribute:"editor.node_state_position_attribute"},Et={mode_attribute:"editor.node_state_position_helper"},Ct={...bt,name:"editor.channel_name"},Pt=[{name:"name",selector:{text:{}}},{name:"entity_id",selector:{entity:{}}},{name:"active_state",selector:{state:{}},context:{filter_entity:"entity_id"}}],It=[{name:"name",selector:{text:{}}},{name:"entity_id",selector:{entity:{}}}],Mt=[{name:"entity_id",selector:{entity:{}}},{name:"active_state",selector:{state:{}},context:{filter_entity:"entity_id"}}];function Nt(e,t){const i=(e.channels??[]).map(e=>({...e})),o=i.length||t.default;for(;i.length<o;)i.push({});return i}const Ot={entity_id:"overlay.entity",name:"overlay.name",template:"overlay.template"},Tt=[{name:"entity_id",selector:{entity:{}}},{name:"name",selector:{entity_name:{}},context:{entity:"entity_id"}},{name:"template",selector:{text:{}}},{type:"grid",name:"position",schema:[{name:"x",selector:{number:{mode:"box"}}},{name:"y",selector:{number:{mode:"box"}}}]}];function zt(e){return Object.fromEntries(Object.entries(e).filter(([,e])=>null!=e&&""!==e))}const Kt={condition:"overlay.rule.condition",entity:"overlay.rule.entity",state:"overlay.rule.state",above:"overlay.rule.above",below:"overlay.rule.below",color:"overlay.rule.color",hide:"overlay.rule.hide"},Lt={entity:"overlay.rule.entity_helper"};let Ut=class extends le{constructor(){super(...arguments),this._tab="schema",this._selectedDeviceType=Ee.type,this._translationEdits={},this._formReady=void 0!==customElements.get("ha-form")}set hass(e){this._hass=e,this.requestUpdate()}get hass(){return this._hass}connectedCallback(){super.connectedCallback(),this._formReady||this._loadHaForm()}setConfig(e){this._config=fe(e),this._translationEdits={...this._translator().getEditableTranslations()},this.requestUpdate()}render(){if(!this._config)return B``;const e=this._translator();return B`
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
          <button
            type="button"
            class="${"translations"===this._tab?"active":""}"
            @click="${()=>{this._tab="translations"}}"
          >${e.t("editor.translations")}</button>
        </div>

        ${"schema"===this._tab?this._renderSchemaTab(e):Z}
        ${"overlays"===this._tab?this._renderOverlaysTab(e):Z}
        ${"translations"===this._tab?this._renderTranslationsTab(e):Z}
      </div>
    `}_renderSchemaTab(e){const t=this._config.schema,i=t.nodes.find(e=>e.id===this._selectedNodeId);return B`
      <div class="toolbar">
        <label>${e.t("editor.device_type")}</label>
        <select
          .value="${this._selectedDeviceType}"
          @change="${e=>{this._selectedDeviceType=e.target.value}}"
        >
          ${He.map(t=>B`
            <option value="${t}">
              ${e.t(`devices.${t}.name`)}
            </option>
          `)}
        </select>
        <select
          .value="${this._config.language??""}"
          @change="${this._onLanguageChange}"
        >
          <option value="">${e.t("editor.language_auto")}</option>
          ${e.getAvailableLanguages().map(e=>B`<option value="${e}">${e}</option>`)}
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
          `:Z}
        ${this._selectedNodeId||this._selectedEdgeId?B`
            <button type="button" class="danger" @click="${e=>this._onDeleteSelectedClick(e)}">
              ${e.t("editor.delete_selected")}
            </button>
          `:Z}
      </div>

      ${this._pendingPort?B`<p class="connection-hint">
            ${e.t("editor.connection_pending",this._portLabel(e,this._pendingPort))}
          </p>`:Z}

      ${t.nodes.length?Z:B`<p class="hint">${e.t("editor.empty_hint")}</p>`}

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
            ${this._renderNodeStateForm(e,i)}
            ${this._renderChannels(e,i)}
            ${Re(i.type)?.heater?B`
                <div class="rules">
                  <header><span>${e.t("editor.heater_title")}</span></header>
                  ${this._renderForm(e,Mt,{...i.heater??{}},bt,e=>this._setNodeHeater(i.id,e))}
                </div>
              `:Z}
          </div>
        `:Z}
    `}_renderNodeStateForm(e,t){const i=function(e){const t={name:"entity_id",selector:{entity:{}}},i={name:"active_state",selector:{state:{}},context:{filter_entity:"entity_id"}},o=Re(e)?.valueDisplay;if("only"===o)return{schema:[t,kt],labels:{...wt,entity_id:"editor.node_value_entity"},helpers:At};if("with_state"===o)return{schema:[t,i,kt],labels:wt,helpers:At};if("mixing_valve"===e)return{schema:[t,{name:"mode_attribute",selector:{attribute:{}},context:{filter_entity:"entity_id"}}],labels:St,helpers:Et};const r=[t,i];if("valve_3way"===e){const e={filter_entity:"entity_id",filter_attribute:"mode_attribute"};r.push({name:"mode_attribute",selector:{attribute:{}},context:{filter_entity:"entity_id"}},{name:"branch_a_value",selector:{state:{}},context:e},{name:"branch_b_value",selector:{state:{}},context:e})}return{schema:r,labels:bt,helpers:{}}}(t.type);return this._renderForm(e,i.schema,{...t.state??{}},i.labels,e=>this._setNodeState(t.id,e),i.helpers)}_renderChannels(e,t){const i=Re(t.type)?.channels;if(!i)return Z;const o=Nt(t,i);return B`
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
        ${o.map((o,r)=>B`
          <div class="rule">
            <strong>${o.name||e.t(i.itemKey,String(r+1))}</strong>
            ${this._renderForm(e,"sensor"===i.kind?It:Pt,{...o},Ct,e=>this._setChannel(t.id,r,e))}
          </div>
        `)}
      </div>
    `}_renderOverlaysTab(e){const t=this._config.schema?.overlays??[];return B`
      <div class="toolbar">
        <button type="button" class="primary" @click="${this._addOverlay}">
          ${e.t("editor.add_overlay")}
        </button>
      </div>

      ${t.length?Z:B`<p class="hint">${e.t("editor.overlays_empty")}</p>`}

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
          ${this._renderForm(e,Tt,{entity_id:t.entity_id,name:t.name,template:t.template,position:t.position},Ot,e=>this._onOverlayFormChange(t.id,e))}
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
                ${this._renderForm(e,function(e){const t={field:"condition",value:"numeric"};return[{name:"condition",selector:{select:{mode:"dropdown",options:[{value:"state",label:e.t("overlay.rule.condition_state")},{value:"numeric",label:e.t("overlay.rule.condition_numeric")}]}}},{name:"entity",selector:{entity:{}}},{name:"state",selector:{state:{}},context:{filter_entity:"entity"},visible:{field:"condition",value:"state"}},{name:"above",selector:{number:{mode:"box",step:"any"}},visible:t},{name:"below",selector:{number:{mode:"box",step:"any"}},visible:t},{name:"color",selector:{ui_color:{}}},{name:"hide",selector:{boolean:{}}}]}(e),function(e){return{condition:e.condition,entity:e.entity,state:e.state,above:e.above,below:e.below,color:e.effect.color,hide:!1===e.effect.visible}}(i),Kt,e=>this._updateRules(t.id,t=>t.map((t,i)=>i===o?function(e,t){const i=zt(e),o=i.condition??"state",r=e=>void 0===e?void 0:Number(e);return{condition:o,entity:i.entity,state:"state"===o?i.state:void 0,above:"numeric"===o?r(i.above):void 0,below:"numeric"===o?r(i.below):void 0,effect:{...t.effect,color:i.color,visible:!i.hide&&void 0}}}(e,t):t)),Lt)}
              </div>
            `)}
          </div>
        </div>
      `)}
    `}_renderForm(e,t,i,o,r,n={}){const s=t=>o[t.name]?e.t(o[t.name]):t.name.toUpperCase(),a=t=>{if(n[t.name])return e.t(n[t.name]);const i=xt[t.name];return void 0!==i?e.t("editor.default_value",i):void 0};return this._formReady&&this._hass?B`
        <ha-form
          .hass="${this._hass}"
          .data="${i}"
          .schema="${t}"
          .computeLabel="${s}"
          .computeHelper="${a}"
          @value-changed="${e=>{e.stopPropagation(),r(e.detail.value)}}"
        ></ha-form>
      `:B`${t.map(e=>"schema"in e?e.schema.map(t=>this._renderFallbackField(t,e.name,i,s,r)):this._renderFallbackField(e,void 0,i,s,r))}`}_renderFallbackField(e,t,i,o,r){if("entity_name"in e.selector)return Z;if(e.visible&&i[e.visible.field]!==e.visible.value)return Z;const n=t?i[t]??{}:i,s=o=>{const s={...n,[e.name]:o};r(t?{...i,[t]:s}:s)};if("boolean"in e.selector)return B`
        <div class="field">
          <label>
            <input
              type="checkbox"
              .checked="${Boolean(n[e.name])}"
              @change="${e=>s(e.target.checked)}"
            />
            ${o(e)}
          </label>
        </div>
      `;const a=e.selector.select;if(a)return B`
        <div class="field">
          <label>${o(e)}</label>
          <select
            .value="${String(n[e.name]??"")}"
            @change="${e=>s(e.target.value)}"
          >
            ${a.options.map(e=>B`<option value="${e.value}">${e.label}</option>`)}
          </select>
        </div>
      `;const d="number"in e.selector;return B`
      <div class="field">
        <label>${o(e)}</label>
        <input
          type="${d?"number":"text"}"
          .value="${String(n[e.name]??"")}"
          @change="${e=>{const t=e.target.value;s(d&&""!==t?Number(t):t)}}"
        />
      </div>
    `}_renderTranslationsTab(e){const t=Object.entries(this._translationEdits).sort(([e],[t])=>e.localeCompare(t));return B`
      <p class="hint">${e.t("editor.language")}: ${e.language}</p>
      ${t.map(([e,t])=>B`
        <div class="translation-item">
          <header><code>${e}</code></header>
          <input
            .value="${t}"
            @input="${t=>this._onTranslationInput(e,t.target.value)}"
          />
        </div>
      `)}
    `}_emitConfig(e,t){const i=JSON.parse(JSON.stringify(fe({...this._config,...t,schema:e})));this._config=i,this.requestUpdate(),this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}_onAddDeviceClick(e){e.preventDefault(),e.stopPropagation(),this._addDevice(this._selectedDeviceType)}_onAddHeatPumpClick(e){e.preventDefault(),e.stopPropagation(),this._selectedDeviceType=Ee.type,this._addDevice(Ee.type)}_onDeleteSelectedClick(e){e.preventDefault(),e.stopPropagation(),this._deleteSelected()}_onRotateSelectedClick(e){e.preventDefault(),e.stopPropagation();const t=this._selectedNodeId;if(!t)return;const i=this._cloneSchema();i.nodes=i.nodes.map(e=>{if(e.id!==t)return e;const i=Ve((e.rotation??0)+90);return{...e,rotation:i||void 0}}),this._emitConfig(i)}_addDevice(e){const t=Re(e);if(!t)return;const i=this._cloneSchema(),o=30*i.nodes.length,r={id:ge(e),type:e,position:{x:80+o,y:80+o}};t.channels?.default&&(r.channels=Array.from({length:t.channels.default},()=>({}))),i.nodes.push(r),this._selectedNodeId=r.id,this._emitConfig(i)}_setNodeHeater(e,t){const i=zt(t),o=this._cloneSchema();o.nodes=o.nodes.map(t=>t.id===e?{...t,heater:Object.keys(i).length?i:void 0}:t),this._emitConfig(o)}_setChannelCount(e,t){const i=this._cloneSchema(),o=i.nodes.find(t=>t.id===e),r=o&&Re(o.type)?.channels;if(!o||!r||t<r.min||t>r.max)return;const n=Nt(o,r).slice(0,t);for(;n.length<t;)n.push({});o.channels=n;const s=new Set(De(o)?.ports.map(e=>e.id));i.edges=i.edges.filter(t=>!(t.from.nodeId===e&&!s.has(t.from.portId)||t.to.nodeId===e&&!s.has(t.to.portId))),this._emitConfig(i)}_setChannel(e,t,i){const o=this._cloneSchema(),r=o.nodes.find(t=>t.id===e),n=r&&Re(r.type)?.channels;if(!r||!n)return;const s=Nt(r,n);s[t]=zt(i),r.channels=s,this._emitConfig(o)}_deleteSelected(){const e=this._cloneSchema();if(this._selectedEdgeId){const t=this._selectedEdgeId;return e.edges=e.edges.filter(e=>e.id!==t),this._selectedEdgeId=void 0,void this._emitConfig(e)}if(!this._selectedNodeId)return;const t=this._selectedNodeId;e.nodes=e.nodes.filter(e=>e.id!==t),e.edges=e.edges.filter(e=>e.from.nodeId!==t&&e.to.nodeId!==t),this._selectedNodeId=void 0,this._pendingPort=void 0,this._emitConfig(e)}_addOverlay(){const e=this._cloneSchema(),t={id:ge("ov"),position:{x:40,y:40+30*e.overlays.length},entity_id:"",template:"{{ state }}"};e.overlays.push(t),this._emitConfig(e)}_removeOverlay(e){const t=this._cloneSchema();t.overlays=t.overlays.filter(t=>t.id!==e),this._emitConfig(t)}_updateOverlay(e,t){const i=this._cloneSchema();i.overlays=i.overlays.map(i=>i.id===e?{...i,...t}:i),this._emitConfig(i)}_onLanguageChange(e){const t=e.target.value,i={...this._config};t?i.language=t:delete i.language,this._config=i,this._translationEdits={...this._translator().getEditableTranslations()},this._emitConfig(this._cloneSchema())}_onTranslationInput(e,t){this._translationEdits={...this._translationEdits,[e]:t};const i=this._translator().language,o={...this._config.translations,[i]:{...this._config.translations?.[i]??{},[e]:t}};this._emitConfig(this._cloneSchema(),{translations:o})}_onNodeSelect(e){this._selectedNodeId=e.detail.nodeId,this._selectedEdgeId=void 0}_onEdgeSelect(e){this._selectedEdgeId=e.detail.edgeId,this._selectedNodeId=void 0,this._pendingPort=void 0}_onNodeMove(e){const t=this._cloneSchema();t.nodes=t.nodes.map(t=>t.id===e.detail.nodeId?{...t,position:e.detail.position}:t),this._emitConfig(t)}_setNodeState(e,t){const i=zt(t),o=this._cloneSchema();o.nodes=o.nodes.map(t=>t.id===e?{...t,state:Object.keys(i).length?i:void 0}:t),this._emitConfig(o)}_addRule(e){this._updateRules(e.id,t=>[...t,{condition:"state",entity:e.entity_id||void 0,effect:{}}])}_updateRules(e,t){const i=this._config.schema?.overlays.find(t=>t.id===e);if(!i)return;const o=t([...i.rules??[]]);this._updateOverlay(e,{rules:o.length?o:void 0})}_onOverlayFormChange(e,t){const i=zt(t),o=i.position??{};this._updateOverlay(e,{entity_id:i.entity_id??"",name:i.name,template:i.template,position:{x:Number(o.x??0),y:Number(o.y??0)}})}_translator(){return xe(this._config?.language??this._hass?.language,this._config?.translations)}async _loadHaForm(){try{const e=await(window.loadCardHelpers?.()),t=e?.createCardElement({type:"button"}),i=t?.constructor;await(i?.getConfigElement?.()),await customElements.whenDefined("ha-form"),this._formReady=!0}catch{}}_onPortClick(e){const{nodeId:t,portId:i}=e.detail,o={nodeId:t,portId:i};if(!this._pendingPort)return void(this._pendingPort=o);if(We(this._pendingPort,o))return void(this._pendingPort=void 0);const r=this._cloneSchema(),n=this._createEdge(this._pendingPort,o,r.edges);n&&(r.edges.push(n),this._emitConfig(r)),this._pendingPort=void 0}_createEdge(e,t,i){const o=this._orderPorts(e,t);if(!o)return;const r=i.some(e=>We(e.from,o.from)&&We(e.to,o.to));return r?void 0:{id:ge("edge"),from:o.from,to:o.to}}_orderPorts(e,t){const i=this._config.schema?.nodes.find(t=>t.id===e.nodeId),o=this._config.schema?.nodes.find(e=>e.id===t.nodeId);if(!i||!o)return;const r=De(i),n=De(o);if(!r||!n)return;const s=r.ports.find(t=>t.id===e.portId),a=n.ports.find(e=>e.id===t.portId);return s&&a?"outlet"===s.kind&&"inlet"===a.kind?{from:e,to:t}:"outlet"===a.kind&&"inlet"===s.kind?{from:t,to:e}:void 0:void 0}_portLabel(e,t){const i=this._config.schema?.nodes.find(e=>e.id===t.nodeId);if(!i)return t.portId;const o=De(i),r=o?.ports.find(e=>e.id===t.portId);return r?e.t(r.labelKey,...r.labelArgs??[]):t.portId}_cloneSchema(){const e=this._config.schema??{nodes:[],edges:[],overlays:[]};return{nodes:(e.nodes??[]).map(e=>({...e,position:{...e.position},state:e.state?{...e.state}:void 0,channels:e.channels?.map(e=>({...e})),heater:e.heater?{...e.heater}:void 0})),edges:(e.edges??[]).map(e=>({...e,from:{...e.from},to:{...e.to}})),overlays:(e.overlays??[]).map(e=>({...e,position:{...e.position},rules:e.rules?.map(e=>({...e,effect:{...e.effect}}))}))}}};Ut.styles=s`
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
  `,e([_e()],Ut.prototype,"_config",void 0),e([_e()],Ut.prototype,"_tab",void 0),e([_e()],Ut.prototype,"_selectedNodeId",void 0),e([_e()],Ut.prototype,"_selectedEdgeId",void 0),e([_e()],Ut.prototype,"_pendingPort",void 0),e([_e()],Ut.prototype,"_selectedDeviceType",void 0),e([_e()],Ut.prototype,"_translationEdits",void 0),e([_e()],Ut.prototype,"_formReady",void 0),Ut=e([he("heating-visualizer-editor")],Ut);let Ht=class extends le{constructor(){super(...arguments),this._i18n=new Se(this,Ae)}setConfig(e){if(!e||"object"!=typeof e)throw new Error("Invalid card configuration");this._config=fe(e)}getCardSize(){return 6}getGridOptions(){return{columns:12,min_columns:6}}static getConfigElement(){return document.createElement("heating-visualizer-editor")}static getStubConfig(){return{schema:me}}render(){if(!this._config)return B``;const e=this._config.schema,t=xe(this._config.language??this._i18n.value?.language,this._config.translations);return B`
      <ha-card>
        ${e.nodes.length||e.overlays.length?B`
            <heating-schema-canvas
              .config="${this._config}"
              .schema="${e}"
              .editable="${!1}"
            ></heating-schema-canvas>
          `:B`<div class="empty">${t.t("card.empty")}</div>`}
      </ha-card>
    `}};Ht.styles=s`
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
  `,e([_e()],Ht.prototype,"_config",void 0),Ht=e([he("heating-visualizer-card")],Ht),window.customCards=window.customCards??[],window.customCards.push({type:"heating-visualizer-card",name:"Heating Visualizer",description:"Design and visualize heating system schemas with live sensor overlays.",preview:!0,documentationURL:"https://github.com/vasicekmilan90-eng/heating_vizualizer"}),console.info("%c HEATING-VISUALIZER-CARD %c v0.2.0 ","color: white; background: #039be5; font-weight: bold;","color: #039be5; background: white; font-weight: bold;");export{Ht as HeatingVisualizerCard};
//# sourceMappingURL=heating-visualizer-card.js.map
