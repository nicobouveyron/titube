import{a as H,b as Re,c as M,d as ke,e as Te,f as Oe,g as Pe,h as Ae,j as Le,k as Fe,l as je,m as Ne,n as Ue,o as We,p as Ve,q as Ge,r as Q,s as z,t as ze}from"./chunk-DNCBWZHO.js";import{a as _e,b as G,d as Ee}from"./chunk-BA5F4LKL.js";import{a as B}from"./chunk-GU5EQDAC.js";import{a as qe}from"./chunk-PLCGH6FH.js";import{h as xe,i as J,j as Me,k as x,m as Ie,n as A,o as De}from"./chunk-DOHPSOPW.js";import{a as we,c as Se}from"./chunk-Z6EXQRYZ.js";import{a as Be}from"./chunk-WBQDXDG7.js";import{f as He,g as Qe}from"./chunk-PP2JOY7W.js";import{Ab as c,B as K,Cb as P,D as Z,E as S,Eb as u,F as _,Ga as $,Ib as ve,Kb as X,L as y,Ma as f,Mb as be,N as ae,Na as O,Nb as Ce,T as se,Ta as ue,X as R,Z as le,a as te,aa as k,ab as fe,ac as ye,cb as E,da as ce,db as he,dc as Y,e as ne,f as v,fa as T,ga as p,ja as d,l as ie,lb as o,ma as pe,mb as s,na as de,nb as m,q as j,qb as h,r as re,u as N,v as C,wa as me,wb as U,xb as W,y as oe,yb as V,z as q,zb as ge}from"./chunk-IUI3B2L4.js";var Ke=[{path:"",redirectTo:"home",pathMatch:"full"},{path:"home",loadComponent:()=>import("./chunk-LJKOFEEB.js").then(t=>t.HomeComponent),data:{animation:"lobby"}},{path:"lobby",loadComponent:()=>import("./chunk-OZA7NVWL.js").then(t=>t.LobbyComponent),data:{animation:"lobby"}},{path:"game",loadComponent:()=>import("./chunk-DFEJJG7E.js").then(t=>t.GameComponent),data:{animation:"game"}},{path:"rules",loadComponent:()=>import("./chunk-HGDGFFQ7.js").then(t=>t.RulesViewComponent),data:{animation:"rules"}}];var F="Service workers are disabled or not supported by this browser";function ct(t){return q(()=>re(new Error(t)))}var I=class{constructor(r){if(this.serviceWorker=r,!r)this.worker=this.events=this.registration=ct(F);else{let n=K(r,"controllerchange").pipe(C(()=>r.controller)),i=q(()=>j(r.controller)),a=oe(i,n);this.worker=a.pipe(_(w=>!!w)),this.registration=this.worker.pipe(R(()=>r.getRegistration()));let ee=K(r,"message").pipe(C(w=>w.data)).pipe(_(w=>w&&w.type)).pipe(se());ee.connect(),this.events=ee}}postMessage(r,e){return this.worker.pipe(y(1),le(n=>{n.postMessage(te({action:r},e))})).toPromise().then(()=>{})}postMessageWithOperation(r,e,n){let i=this.waitForOperationCompleted(n),a=this.postMessage(r,e);return Promise.all([a,i]).then(([,l])=>l)}generateNonce(){return Math.round(Math.random()*1e7)}eventsOfType(r){let e;return typeof r=="string"?e=n=>n.type===r:e=n=>r.includes(n.type),this.events.pipe(_(e))}nextEventOfType(r){return this.eventsOfType(r).pipe(y(1))}waitForOperationCompleted(r){return this.eventsOfType("OPERATION_COMPLETED").pipe(_(e=>e.nonce===r),y(1),C(e=>{if(e.result!==void 0)return e.result;throw new Error(e.error)})).toPromise()}get isEnabled(){return!!this.serviceWorker}},pt=(()=>{class t{get isEnabled(){return this.sw.isEnabled}constructor(e){if(this.sw=e,this.pushManager=null,this.subscriptionChanges=new ie,!e.isEnabled){this.messages=S,this.notificationClicks=S,this.subscription=S;return}this.messages=this.sw.eventsOfType("PUSH").pipe(C(i=>i.data)),this.notificationClicks=this.sw.eventsOfType("NOTIFICATION_CLICK").pipe(C(i=>i.data)),this.pushManager=this.sw.registration.pipe(C(i=>i.pushManager));let n=this.pushManager.pipe(R(i=>i.getSubscription()));this.subscription=Z(n,this.subscriptionChanges)}requestSubscription(e){if(!this.sw.isEnabled||this.pushManager===null)return Promise.reject(new Error(F));let n={userVisibleOnly:!0},i=this.decodeBase64(e.serverPublicKey.replace(/_/g,"/").replace(/-/g,"+")),a=new Uint8Array(new ArrayBuffer(i.length));for(let l=0;l<i.length;l++)a[l]=i.charCodeAt(l);return n.applicationServerKey=a,this.pushManager.pipe(R(l=>l.subscribe(n)),y(1)).toPromise().then(l=>(this.subscriptionChanges.next(l),l))}unsubscribe(){if(!this.sw.isEnabled)return Promise.reject(new Error(F));let e=n=>{if(n===null)throw new Error("Not subscribed to push notifications.");return n.unsubscribe().then(i=>{if(!i)throw new Error("Unsubscribe failed!");this.subscriptionChanges.next(null)})};return this.subscription.pipe(y(1),R(e)).toPromise()}decodeBase64(e){return atob(e)}static{this.\u0275fac=function(n){return new(n||t)(T(I))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})(),dt=(()=>{class t{get isEnabled(){return this.sw.isEnabled}constructor(e){if(this.sw=e,!e.isEnabled){this.versionUpdates=S,this.unrecoverable=S;return}this.versionUpdates=this.sw.eventsOfType(["VERSION_DETECTED","VERSION_INSTALLATION_FAILED","VERSION_READY","NO_NEW_VERSION_DETECTED"]),this.unrecoverable=this.sw.eventsOfType("UNRECOVERABLE_STATE")}checkForUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(F));let e=this.sw.generateNonce();return this.sw.postMessageWithOperation("CHECK_FOR_UPDATES",{nonce:e},e)}activateUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(F));let e=this.sw.generateNonce();return this.sw.postMessageWithOperation("ACTIVATE_UPDATE",{nonce:e},e)}static{this.\u0275fac=function(n){return new(n||t)(T(I))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac})}}return t})();var Ze=new ce("");function mt(t,r,e,n){return()=>{if(!(Y(n)&&"serviceWorker"in navigator&&e.enabled!==!1))return;let i=t.get(ue),a=t.get(X);i.runOutsideAngular(()=>{let g=navigator.serviceWorker,b=()=>g.controller?.postMessage({action:"INITIALIZE"});g.addEventListener("controllerchange",b),a.onDestroy(()=>{g.removeEventListener("controllerchange",b)})});let l;if(typeof e.registrationStrategy=="function")l=e.registrationStrategy();else{let[g,...b]=(e.registrationStrategy||"registerWhenStable:30000").split(":");switch(g){case"registerImmediately":l=j(null);break;case"registerWithDelay":l=$e(+b[0]||0);break;case"registerWhenStable":l=b[0]?Z(Xe(t),$e(+b[0])):Xe(t);break;default:throw new Error(`Unknown ServiceWorker registration strategy: ${e.registrationStrategy}`)}}i.runOutsideAngular(()=>l.pipe(y(1)).subscribe(()=>navigator.serviceWorker.register(r,{scope:e.scope}).catch(g=>console.error("Service worker registration failed with:",g))))}}function $e(t){return j(null).pipe(ae(t))}function Xe(t){return t.get(X).isStable.pipe(_(e=>e))}function ut(t,r){return new I(Y(r)&&t.enabled!==!1?navigator.serviceWorker:void 0)}var L=class{};function Ye(t,r={}){return pe([pt,dt,{provide:Ze,useValue:t},{provide:L,useValue:r},{provide:I,useFactory:ut,deps:[L,$]},{provide:ve,useFactory:mt,deps:[me,Ze,L,$],multi:!0}])}var Je={providers:[be({eventCoalescing:!0}),Ee(Ke),B,De(),we(),de(Q.pick({Home:je,Search:Ne,ChevronLeft:Le,Settings:Ue,UserRoundPlus:Ve,SquareX:We,GripVertical:Fe})),Ye("ngsw-worker.js",{enabled:!Ce(),registrationStrategy:"registerWhenStable:30000"})]};var ft=(()=>{class t{constructor(e,n){this.dialogRef=e,this.data=n}static{this.\u0275fac=function(n){return new(n||t)(O(H),O(Re))}}static{this.\u0275cmp=d({type:t,selectors:[["app-confirmation-dialog"]],standalone:!0,features:[u],decls:11,vars:6,consts:[["mat-dialog-title","",1,"text-xl","font-bold","mb-4"],[1,"mb-6"],["align","end",1,"space-x-2"],["mat-button","",1,"hover:bg-gray-100",3,"mat-dialog-close"],["mat-raised-button","","color","primary",1,"hover:opacity-90",3,"mat-dialog-close"]],template:function(n,i){n&1&&(o(0,"div")(1,"h2",0),c(2),s(),o(3,"mat-dialog-content",1)(4,"p"),c(5),s()(),o(6,"mat-dialog-actions",2)(7,"button",3),c(8),s(),o(9,"button",4),c(10),s()()()),n&2&&(f(2),P(" ",i.data.title||"Confirmation"," "),f(3),P(" ",i.data.message||"\xCAtes-vous s\xFBr de vouloir effectuer cette action ?"," "),f(2),E("mat-dialog-close",!1),f(),P(" ",i.data.cancelLabel||"Non"," "),f(),E("mat-dialog-close",!0),f(),P(" ",i.data.confirmLabel||"Oui"," "))},dependencies:[Ae,ke,Te,Pe,Oe],encapsulation:2})}}return t})(),et=(()=>{class t{constructor(e){this.dialog=e}confirm(e){return this.dialog.open(ft,{data:e||{}}).afterClosed()}static{this.\u0275fac=function(n){return new(n||t)(T(M))}}static{this.\u0275prov=k({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();var tt=(()=>{class t{constructor(){this.router=p(G),this.participantsStore=p(B),this.gameStore=p(He),this.deckService=p(Qe),this.loaderService=p(z),this.confirmationService=p(et),this.dialogRef=p(H),this.dialog=p(M)}onResumeGame(){this.dialogRef.close()}onRestartGame(){this.loaderService.show(),setTimeout(()=>{this.loaderService.hide(),this.gameStore.reset(),this.gameStore.addCarteOut(this.gameStore.cards()[this.deckService.getNextCardIndex()]),this.gameStore.setCurrentPlayer(this.participantsStore.usernames()[0]),this.dialogRef.close()},2e3)}onLeaveGame(){return v(this,null,function*(){(yield N(this.confirmationService.confirm({title:"Quitter la partie",message:"Etes-vous sur de vouloir quitter la partie ?"})))&&(this.loaderService.show(),this.router.navigate(["lobby"]),this.gameStore.reset(),this.loaderService.hide(),this.dialogRef.close())})}onShowCardsList(){return v(this,null,function*(){N(this.dialog.open(qe,{width:"100svw",maxWidth:"100svw"}).afterClosed())})}onShowPlayersList(){return v(this,null,function*(){N(this.dialog.open(ze,{width:"100svw",maxWidth:"100svw"}).afterClosed())})}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=d({type:t,selectors:[["app-settings-dialog"]],standalone:!0,features:[u],decls:18,vars:0,consts:[[1,"text-center","text-4xl","text-orange-500"],[1,"flex","flex-col","gap-2","items-center","justify-center","h-full","p-5"],[1,"w-full","max-w-[300px]","border","border-solid","border-orange-500","rounded-lg","py-2",3,"click"]],template:function(n,i){n&1&&(o(0,"h1",0),c(1,"Parame\u0300tres de la partie"),s(),o(2,"div",1)(3,"button",2),h("click",function(){return i.onResumeGame()}),o(4,"span"),c(5," Reprendre la partie "),s()(),o(6,"button",2),h("click",function(){return i.onShowPlayersList()}),o(7,"span"),c(8," Listes joueurs "),s()(),o(9,"button",2),h("click",function(){return i.onShowCardsList()}),o(10,"span"),c(11," Liste des cartes "),s()(),o(12,"button",2),h("click",function(){return i.onRestartGame()}),o(13,"span"),c(14," Relancer une partie "),s()(),o(15,"button",2),h("click",function(){return i.onLeaveGame()}),o(16,"span"),c(17," Quitter la partie "),s()()())},styles:['button[_ngcontent-%COMP%]{padding:12px 24px;background:linear-gradient(45deg,#c26b3b,#e88c5e);border:none;border-radius:8px;color:#faf4e4;font-weight:600;position:relative;overflow:hidden;transition:all .3s ease;cursor:pointer}button[_ngcontent-%COMP%]:before{content:"";position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:linear-gradient(45deg,transparent,rgba(255,255,255,.2),transparent);transform:rotate(45deg);transition:all .3s ease}button[_ngcontent-%COMP%]:hover{transform:translateY(-2px);box-shadow:0 4px 15px #c26b3b66}button[_ngcontent-%COMP%]:hover:before{animation:_ngcontent-%COMP%_shine 1s}@keyframes _ngcontent-%COMP%_shine{0%{left:-50%}to{left:100%}}']})}}return t})();var nt=(()=>{class t{constructor(){this.dialog=p(M)}goBack(){window.history.back()}onClickSettings(){this.dialog.open(tt,{minWidth:"500px",maxWidth:"800px"}).afterClosed().subscribe(e=>{console.log(`Dialog result: ${e}`)})}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=d({type:t,selectors:[["app-header"]],standalone:!0,features:[u],decls:5,vars:0,consts:[[1,"flex","header","w-full","h-[10svh]","justify-between","px-5"],[1,"my-2","flex","items-center","justify-center","rounded-xl","w-[40pt]","h-[40pt]","text-3xl","bg-orange-500","text-white",3,"click"],["name","chevron-left"],["name","settings"]],template:function(n,i){n&1&&(o(0,"div",0)(1,"button",1),h("click",function(){return i.goBack()}),m(2,"lucide-icon",2),s(),o(3,"button",1),h("click",function(){return i.onClickSettings()}),m(4,"lucide-icon",3),s()())},dependencies:[Q,Ge]})}}return t})();var it=xe("routeAnimations",[Ie("* <=> *",[x({position:"relative"}),A(":enter, :leave",[x({position:"absolute",top:0,left:0,width:"100%",height:"100%"})],{optional:!0}),A(":enter",[x({opacity:0,transform:"translateX(100%)"})],{optional:!0}),Me([A(":leave",[J("300ms ease-out",x({opacity:0,transform:"translateX(-100%)"}))],{optional:!0}),A(":enter",[J("300ms ease-out",x({opacity:1,transform:"translateX(0)"}))],{optional:!0})])])]);var rt=ne(Be());var ht=["riveCanvas"],ot=(()=>{class t{constructor(){this.riveUrl="le_titube.riv",this.riveInstance=null}ngAfterViewInit(){setTimeout(()=>{this.loadRiveAnimation()})}loadRiveAnimation(){return v(this,null,function*(){if(this.canvas)try{this.riveInstance=new rt.Rive({canvas:this.canvas.nativeElement,src:this.riveUrl,autoplay:!0,artboard:"logo",onLoad:()=>{console.log("Rive file loaded!",this.riveInstance?.contents),console.log(this.riveInstance?.contents.artboards)},onLoadError:e=>{console.error("Rive file error:",e)}}),this.riveInstance.resizeToCanvas(),this.riveInstance.resizeDrawingSurfaceToCanvas()}catch(e){console.error("Erreur lors du chargement de l'animation Rive:",e)}})}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=d({type:t,selectors:[["app-splash-screen"]],viewQuery:function(n,i){if(n&1&&U(ht,5),n&2){let a;W(a=V())&&(i.canvas=a.first)}},standalone:!0,features:[u],decls:3,vars:0,consts:[["riveCanvas",""],[1,"splash-container"],["id","riveCanvas",1,"w-full","h-full","max-h-[250pt]"]],template:function(n,i){n&1&&(o(0,"div",1),m(1,"canvas",2,0),s())},styles:[".splash-container[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100svw;height:100svh;display:flex;flex-direction:column;justify-content:center;align-items:center;background-color:#faf4e4;z-index:9999}.loader[_ngcontent-%COMP%]{border:5px solid #f3f3f3;border-radius:50%;border-top:5px solid #3498db;width:50px;height:50px;animation:_ngcontent-%COMP%_spin 1s linear infinite}@keyframes _ngcontent-%COMP%_spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}"]})}}return t})();var at=ne(Be());var gt=["riveCanvas"],st=(()=>{class t{constructor(e){this.loaderService=e,this.riveUrl="le_titube.riv",this.riveInstance=null}ngAfterViewInit(){this.loadRiveAnimation()}loadRiveAnimation(e){return v(this,null,function*(){if(this.canvas)try{this.riveInstance=new at.Rive({canvas:this.canvas.nativeElement,src:this.riveUrl,autoplay:!0,artboard:"titouLoading",onLoad:()=>{e&&this.riveInstance?.play(e)}}),this.riveInstance.resizeToCanvas(),this.riveInstance.resizeDrawingSurfaceToCanvas(),console.log(this.riveInstance)}catch(n){console.error("Erreur lors du chargement de l'animation Rive:",n)}})}static{this.\u0275fac=function(n){return new(n||t)(O(z))}}static{this.\u0275cmp=d({type:t,selectors:[["app-loader"]],viewQuery:function(n,i){if(n&1&&U(gt,5),n&2){let a;W(a=V())&&(i.canvas=a.first)}},standalone:!0,features:[u],decls:5,vars:4,consts:[["riveCanvas",""],[1,"loader-overlay"],["id","riveCanvas"],[1,"bg-orange-500"]],template:function(n,i){n&1&&(o(0,"div",1),m(1,"canvas",2,0),o(3,"p",3),c(4,"Chargement en cours..."),s()()),n&2&&he("z-index",i.loaderService.isLoading$()?"9999":"-1")("opacity",i.loaderService.isLoading$()?"1":"0")},styles:["canvas[_ngcontent-%COMP%]{max-width:300pt}p[_ngcontent-%COMP%]{font-size:18pt;color:#fff;border-radius:6px;padding:15px}.loader-overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%;background:#faf4e4a8;z-index:9999;display:flex;flex-direction:column;justify-content:center;align-items:center;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);gap:20px}.loader[_ngcontent-%COMP%]{width:50px;height:50px;border:5px solid #f3f3f3;border-radius:50%;border-top:5px solid #3498db;animation:_ngcontent-%COMP%_spin 1s linear infinite}@keyframes _ngcontent-%COMP%_spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}"]})}}return t})();function vt(t,r){t&1&&m(0,"app-splash-screen")}var lt=(()=>{class t{constructor(){this.router=p(G),this.showSplash=!0}ngOnInit(){setTimeout(()=>{this.showSplash=!1},3e3)}getRouteState(e){return e?.activatedRouteData?.animation||"initial"}static{this.\u0275fac=function(n){return new(n||t)}}static{this.\u0275cmp=d({type:t,selectors:[["app-root"]],standalone:!0,features:[u],decls:6,vars:2,consts:[["outlet","outlet"],[4,"ngIf"],[1,"max-w-[1000pt]","h-[90svh]","mx-auto"]],template:function(n,i){if(n&1&&(m(0,"app-loader"),fe(1,vt,1,0,"app-splash-screen",1),m(2,"app-header"),o(3,"main",2),m(4,"router-outlet",null,0),s()),n&2){let a=ge(5);f(),E("ngIf",i.showSplash),f(2),E("@routeAnimations",i.getRouteState(a))}},dependencies:[_e,nt,ot,ye,st],encapsulation:2,data:{animation:[it]}})}}return t})();Se(lt,Je).catch(t=>console.error(t));