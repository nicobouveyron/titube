import{a as n,b as s,c as i,d as c,e as S}from"./chunk-ITMSBQFM.js";import{a as o}from"./chunk-XBKZSOMQ.js";var p="participants-store",d={usernames:[],isLoading:!1},m=t=>{localStorage.setItem(p,JSON.stringify(t))},g=s({providedIn:"root"},S(d),c(t=>({addParticipant(e){n(t,a=>{let r={usernames:[...a.usernames,e]};return m(o(o({},a),r)),r})},removeParticipant(e){n(t,a=>{let r={usernames:a.usernames.filter(l=>l!==e)};return m(o(o({},a),r)),r})}})),i({onInit:t=>{let e=localStorage.getItem(p);e&&n(t,JSON.parse(e))}}));export{g as a};
