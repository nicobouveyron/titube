import{Ob as g,Pb as S,Sa as k,Ta as v,Z as p,a as e,b as f,da as b,va as j}from"./chunk-J47CFDLK.js";function w(t){let n=S(()=>t());return R(n)?new Proxy(t,{get(o,i){return i in n?(k(o[i])||Object.defineProperty(o,i,{value:g(()=>o()[i]),configurable:!0}),w(o[i])):o[i]}}):t}function R(t){return t?.constructor===Object}var C=new WeakMap,s=Symbol("STATE_SOURCE");function q(t,...n){t[s].update(o=>n.reduce((i,r)=>e(e({},i),typeof r=="function"?r(i):r),o)),A(t)}function E(t){return t[s]()}function W(t){return C.get(t[s])||[]}function A(t){let n=W(t);for(let o of n){let i=S(()=>E(t));o(i)}}function _(...t){let n=[...t],o=typeof n[0]=="function"?{}:n.shift(),i=n;return(()=>{class c{constructor(){let u=i.reduce((d,T)=>T(d),H()),{stateSignals:l,computedSignals:I,methods:D,hooks:M}=u,m=e(e(e({},l),I),D);this[s]=u[s];for(let d in m)this[d]=m[d];let{onInit:h,onDestroy:y}=M;h&&h(),y&&b(j).onDestroy(y)}static \u0275fac=function(l){return new(l||c)};static \u0275prov=p({token:c,factory:c.\u0275fac,providedIn:o.providedIn||null})}return c})()}function H(){return{[s]:v({}),stateSignals:{},computedSignals:{},methods:{},hooks:{}}}function z(t){return n=>{let o=e(e(e({[s]:n[s]},n.stateSignals),n.computedSignals),n.methods),i=typeof t=="function"?t(o):t,r=c=>{let a=i[c],u=n.hooks[c];return a?()=>{u&&u(),a(o)}:u};return f(e({},n),{hooks:{onInit:r("onInit"),onDestroy:r("onDestroy")}})}}function B(t){return n=>{let o=t(e(e(e({[s]:n[s]},n.stateSignals),n.computedSignals),n.methods));return Object.keys(o),f(e({},n),{methods:e(e({},n.methods),o)})}}function G(t){return n=>{let o=typeof t=="function"?t():t,i=Object.keys(o);n[s].update(c=>e(e({},c),o));let r=i.reduce((c,a)=>{let u=g(()=>n[s]()[a]);return f(e({},c),{[a]:w(u)})},{});return f(e({},n),{stateSignals:e(e({},n.stateSignals),r)})}}export{q as a,_ as b,z as c,B as d,G as e};