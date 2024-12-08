import{a as ie,b as F,c as se,d as m,f as ae,g as v,h as pe}from"./chunk-WGIQGEB7.js";import{a as ee,c as te,d as re,f as ne}from"./chunk-UXKZ7L7I.js";import{f as oe}from"./chunk-NO22D3TL.js";import{$ as A,$a as q,$b as N,A as M,B as O,C as d,Ca as D,Cb as T,D as h,Gb as Y,Ia as G,Ib as k,J as l,Kb as J,L,Lb as Q,Qa as X,R as V,W as g,Y as H,a as U,ca as B,ea as R,gb as C,ha as y,hb as S,ib as P,ka as K,l as W,p as w,q as j,ta as Z,u as c,ub as $,vb as z,x,y as I}from"./chunk-5GNSEE5T.js";var ce=[{path:"",redirectTo:"home",pathMatch:"full"},{path:"home",loadComponent:()=>import("./chunk-DM23CYVI.js").then(t=>t.HomeComponent),data:{animation:"lobby"}},{path:"lobby",loadComponent:()=>import("./chunk-4I73SX5T.js").then(t=>t.LobbyComponent),data:{animation:"lobby"}},{path:"game",loadComponent:()=>import("./chunk-RAT7UHRE.js").then(t=>t.GameComponent),data:{animation:"game"}}];var E="Service workers are disabled or not supported by this browser";function Ee(t){return I(()=>j(new Error(t)))}var f=class{constructor(n){if(this.serviceWorker=n,!n)this.worker=this.events=this.registration=Ee(E);else{let r=M(n,"controllerchange").pipe(c(()=>n.controller)),o=I(()=>w(n.controller)),s=x(o,r);this.worker=s.pipe(h(u=>!!u)),this.registration=this.worker.pipe(g(()=>n.getRegistration()));let _=M(n,"message").pipe(c(u=>u.data)).pipe(h(u=>u&&u.type)).pipe(V());_.connect(),this.events=_}}postMessage(n,e){return this.worker.pipe(l(1),H(r=>{r.postMessage(U({action:n},e))})).toPromise().then(()=>{})}postMessageWithOperation(n,e,r){let o=this.waitForOperationCompleted(r),s=this.postMessage(n,e);return Promise.all([s,o]).then(([,i])=>i)}generateNonce(){return Math.round(Math.random()*1e7)}eventsOfType(n){let e;return typeof n=="string"?e=r=>r.type===n:e=r=>n.includes(r.type),this.events.pipe(h(e))}nextEventOfType(n){return this.eventsOfType(n).pipe(l(1))}waitForOperationCompleted(n){return this.eventsOfType("OPERATION_COMPLETED").pipe(h(e=>e.nonce===n),l(1),c(e=>{if(e.result!==void 0)return e.result;throw new Error(e.error)})).toPromise()}get isEnabled(){return!!this.serviceWorker}},we=(()=>{class t{get isEnabled(){return this.sw.isEnabled}constructor(e){if(this.sw=e,this.pushManager=null,this.subscriptionChanges=new W,!e.isEnabled){this.messages=d,this.notificationClicks=d,this.subscription=d;return}this.messages=this.sw.eventsOfType("PUSH").pipe(c(o=>o.data)),this.notificationClicks=this.sw.eventsOfType("NOTIFICATION_CLICK").pipe(c(o=>o.data)),this.pushManager=this.sw.registration.pipe(c(o=>o.pushManager));let r=this.pushManager.pipe(g(o=>o.getSubscription()));this.subscription=O(r,this.subscriptionChanges)}requestSubscription(e){if(!this.sw.isEnabled||this.pushManager===null)return Promise.reject(new Error(E));let r={userVisibleOnly:!0},o=this.decodeBase64(e.serverPublicKey.replace(/_/g,"/").replace(/-/g,"+")),s=new Uint8Array(new ArrayBuffer(o.length));for(let i=0;i<o.length;i++)s[i]=o.charCodeAt(i);return r.applicationServerKey=s,this.pushManager.pipe(g(i=>i.subscribe(r)),l(1)).toPromise().then(i=>(this.subscriptionChanges.next(i),i))}unsubscribe(){if(!this.sw.isEnabled)return Promise.reject(new Error(E));let e=r=>{if(r===null)throw new Error("Not subscribed to push notifications.");return r.unsubscribe().then(o=>{if(!o)throw new Error("Unsubscribe failed!");this.subscriptionChanges.next(null)})};return this.subscription.pipe(l(1),g(e)).toPromise()}decodeBase64(e){return atob(e)}static{this.\u0275fac=function(r){return new(r||t)(R(f))}}static{this.\u0275prov=A({token:t,factory:t.\u0275fac})}}return t})(),ye=(()=>{class t{get isEnabled(){return this.sw.isEnabled}constructor(e){if(this.sw=e,!e.isEnabled){this.versionUpdates=d,this.unrecoverable=d;return}this.versionUpdates=this.sw.eventsOfType(["VERSION_DETECTED","VERSION_INSTALLATION_FAILED","VERSION_READY","NO_NEW_VERSION_DETECTED"]),this.unrecoverable=this.sw.eventsOfType("UNRECOVERABLE_STATE")}checkForUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(E));let e=this.sw.generateNonce();return this.sw.postMessageWithOperation("CHECK_FOR_UPDATES",{nonce:e},e)}activateUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(E));let e=this.sw.generateNonce();return this.sw.postMessageWithOperation("ACTIVATE_UPDATE",{nonce:e},e)}static{this.\u0275fac=function(r){return new(r||t)(R(f))}}static{this.\u0275prov=A({token:t,factory:t.\u0275fac})}}return t})();var le=new B("");function Ce(t,n,e,r){return()=>{if(!(N(r)&&"serviceWorker"in navigator&&e.enabled!==!1))return;let o=t.get(X),s=t.get(k);o.runOutsideAngular(()=>{let a=navigator.serviceWorker,p=()=>a.controller?.postMessage({action:"INITIALIZE"});a.addEventListener("controllerchange",p),s.onDestroy(()=>{a.removeEventListener("controllerchange",p)})});let i;if(typeof e.registrationStrategy=="function")i=e.registrationStrategy();else{let[a,...p]=(e.registrationStrategy||"registerWhenStable:30000").split(":");switch(a){case"registerImmediately":i=w(null);break;case"registerWithDelay":i=ue(+p[0]||0);break;case"registerWhenStable":i=p[0]?O(de(t),ue(+p[0])):de(t);break;default:throw new Error(`Unknown ServiceWorker registration strategy: ${e.registrationStrategy}`)}}o.runOutsideAngular(()=>i.pipe(l(1)).subscribe(()=>navigator.serviceWorker.register(n,{scope:e.scope}).catch(a=>console.error("Service worker registration failed with:",a))))}}function ue(t){return w(null).pipe(L(t))}function de(t){return t.get(k).isStable.pipe(h(e=>e))}function Se(t,n){return new f(N(n)&&t.enabled!==!1?navigator.serviceWorker:void 0)}var b=class{};function me(t,n={}){return K([we,ye,{provide:le,useValue:t},{provide:b,useValue:n},{provide:f,useFactory:Se,deps:[b,D]},{provide:Y,useFactory:Ce,deps:[Z,le,b,D],multi:!0}])}var fe={providers:[J({eventCoalescing:!0}),ne(ce),oe,pe(),ee(),me("ngsw-worker.js",{enabled:!Q(),registrationStrategy:"registerWhenStable:30000"})]};var ge=(()=>{class t{static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275cmp=y({type:t,selectors:[["app-header"]],standalone:!0,features:[T],decls:3,vars:0,consts:[[1,"flex","header","w-full","h-[70pt]","justify-end","px-5"]],template:function(r,o){r&1&&(C(0,"div",0)(1,"button"),z(2,"GEAR"),S()())}})}}return t})();var ve=ie("routeAnimations",[ae("* <=> *",[m({position:"relative"}),v(":enter, :leave",[m({position:"absolute",top:0,left:0,width:"100%",height:"100%"})],{optional:!0}),v(":enter",[m({opacity:0,transform:"translateX(100%)"})],{optional:!0}),se([v(":leave",[F("300ms ease-out",m({opacity:0,transform:"translateX(-100%)"}))],{optional:!0}),v(":enter",[F("300ms ease-out",m({opacity:1,transform:"translateX(0)"}))],{optional:!0})])])]);var be=(()=>{class t{getRouteState(e){return e?.activatedRouteData?.animation||"initial"}static{this.\u0275fac=function(r){return new(r||t)}}static{this.\u0275cmp=y({type:t,selectors:[["app-root"]],standalone:!0,features:[T],decls:4,vars:1,consts:[["outlet","outlet"]],template:function(r,o){if(r&1&&(P(0,"app-header"),C(1,"main"),P(2,"router-outlet",null,0),S()),r&2){let s=$(3);G(),q("@routeAnimations",o.getRouteState(s))}},dependencies:[re,ge],encapsulation:2,data:{animation:[ve]}})}}return t})();te(be,fe).catch(t=>console.error(t));
