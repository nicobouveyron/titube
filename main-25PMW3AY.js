import{a as x,b as l,c as S,d as o,f as D,g as a,h as R}from"./chunk-73A5MQFC.js";import{a as v,c as y,d as g,f as b}from"./chunk-MLQ3GEHR.js";import{f as A}from"./chunk-QEN5POR2.js";import{Fa as u,Gb as C,Ya as c,db as i,ea as r,eb as p,fb as s,rb as f,sb as h,zb as m}from"./chunk-YNM7QPU4.js";var H=[{path:"",redirectTo:"home",pathMatch:"full"},{path:"home",loadComponent:()=>import("./chunk-G7SXWBII.js").then(t=>t.HomeComponent),data:{animation:"lobby"}},{path:"lobby",loadComponent:()=>import("./chunk-2GXTKGAG.js").then(t=>t.LobbyComponent),data:{animation:"lobby"}},{path:"game",loadComponent:()=>import("./chunk-4BVYFFB4.js").then(t=>t.GameComponent),data:{animation:"game"}}];var M={providers:[C({eventCoalescing:!0}),b(H),A,R(),v()]};var w=(()=>{class t{static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=r({type:t,selectors:[["app-header"]],standalone:!0,features:[m],decls:3,vars:0,consts:[[1,"flex","header","w-full","h-[70pt]","justify-end","px-5"]],template:function(e,d){e&1&&(i(0,"div",0)(1,"button"),h(2,"GEAR"),p()())}})}}return t})();var F=x("routeAnimations",[D("* <=> *",[o({position:"relative"}),a(":enter, :leave",[o({position:"absolute",top:0,left:0,width:"100%",height:"100%"})],{optional:!0}),a(":enter",[o({opacity:0,transform:"translateX(100%)"})],{optional:!0}),S([a(":leave",[l("300ms ease-out",o({opacity:0,transform:"translateX(-100%)"}))],{optional:!0}),a(":enter",[l("300ms ease-out",o({opacity:1,transform:"translateX(0)"}))],{optional:!0})])])]);var E=(()=>{class t{getRouteState(n){return n?.activatedRouteData?.animation||"initial"}static{this.\u0275fac=function(e){return new(e||t)}}static{this.\u0275cmp=r({type:t,selectors:[["app-root"]],standalone:!0,features:[m],decls:4,vars:1,consts:[["outlet","outlet"]],template:function(e,d){if(e&1&&(s(0,"app-header"),i(1,"main"),s(2,"router-outlet",null,0),p()),e&2){let T=f(3);u(),c("@routeAnimations",d.getRouteState(T))}},dependencies:[g,w],encapsulation:2,data:{animation:[F]}})}}return t})();y(E,M).catch(t=>console.error(t));