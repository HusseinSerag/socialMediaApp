import{i}from"./index-BfS1IFI6.js";function a(t,s){for(var o=0;o<s.length;o++){const e=s[o];if(typeof e!="string"&&!Array.isArray(e)){for(const r in e)if(r!=="default"&&!(r in t)){const n=Object.getOwnPropertyDescriptor(e,r);n&&Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:()=>e[r]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}var c=function(){throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object")};const f=i(c),u=a({__proto__:null,default:f},[c]);export{u as b};