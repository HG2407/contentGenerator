(function(){"use strict";var t={4696:function(t,e,n){var r=n(9242),o=n(3396);function i(t,e,n,r,i,s){const a=(0,o.up)("contentGenerator");return(0,o.wg)(),(0,o.j4)(a)}var s=n(7139);const a={class:"container"},u={class:"chatBox",ref:"chatBox"},c={key:0,class:"wait"};function l(t,e,n,i,l,p){return(0,o.wg)(),(0,o.iD)("div",a,[(0,o._)("div",u,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.storedMessage.length,(t=>((0,o.wg)(),(0,o.iD)("p",{key:t},(0,s.zw)(l.storedMessage[t-1]),1)))),128))],512),l.wait?((0,o.wg)(),(0,o.iD)("p",c,"Please Wait...")):(0,o.kq)("",!0),l.firstMsg?(0,o.wy)(((0,o.wg)(),(0,o.iD)("input",{key:1,type:"text",onKeydown:e[0]||(e[0]=(0,r.D2)(((...t)=>p.send&&p.send(...t)),["enter"])),"onUpdate:modelValue":e[1]||(e[1]=t=>l.input=t),placeholder:"enter Youtube url"},null,544)),[[r.nr,l.input]]):(0,o.wy)(((0,o.wg)(),(0,o.iD)("input",{key:2,type:"text",onKeydown:e[2]||(e[2]=(0,r.D2)(((...t)=>p.send&&p.send(...t)),["enter"])),"onUpdate:modelValue":e[3]||(e[3]=t=>l.input=t),placeholder:"ask something"},null,544)),[[r.nr,l.input]]),(0,o.wy)((0,o._)("input",{type:"text","onUpdate:modelValue":e[4]||(e[4]=t=>l.topic=t),placeholder:"enter the topic to ask"},null,512),[[r.nr,l.topic]])])}n(7658);var p=n(4135),f={name:"contentGenerator",data(){return{input:"",storedMessage:[],firstMsg:!0,topic:"",wait:!1}},methods:{async send(){let t;this.storedMessage.push(this.input),this.input="",this.$nextTick((()=>{this.$refs["chatBox"].scrollTop=this.$refs["chatBox"].scrollHeight})),this.wait=!0;try{this.firstMsg?(t=await p.Z.post("/input",{input:this.storedMessage[this.storedMessage.length-1],topic:this.topic,firstMsg:!0}),this.firstMsg=!1):t=await p.Z.post("/input",{input:this.storedMessage[this.storedMessage.length-1],topic:this.topic})}catch(e){console.log(e)}this.wait=!1,this.storedMessage.push(t.data.text),this.$nextTick((()=>{this.$refs["chatBox"].scrollTop=this.$refs["chatBox"].scrollHeight}))}}},h=n(89);const d=(0,h.Z)(f,[["render",l]]);var g=d,w={name:"App",components:{contentGenerator:g}};const v=(0,h.Z)(w,[["render",i]]);var y=v;(0,r.ri)(y).mount("#app")}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r].call(i.exports,i,i.exports,n),i.exports}n.m=t,function(){var t=[];n.O=function(e,r,o,i){if(!r){var s=1/0;for(l=0;l<t.length;l++){r=t[l][0],o=t[l][1],i=t[l][2];for(var a=!0,u=0;u<r.length;u++)(!1&i||s>=i)&&Object.keys(n.O).every((function(t){return n.O[t](r[u])}))?r.splice(u--,1):(a=!1,i<s&&(s=i));if(a){t.splice(l--,1);var c=o();void 0!==c&&(e=c)}}return e}i=i||0;for(var l=t.length;l>0&&t[l-1][2]>i;l--)t[l]=t[l-1];t[l]=[r,o,i]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,r){var o,i,s=r[0],a=r[1],u=r[2],c=0;if(s.some((function(e){return 0!==t[e]}))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(u)var l=u(n)}for(e&&e(r);c<s.length;c++)i=s[c],n.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return n.O(l)},r=self["webpackChunkfront_end"]=self["webpackChunkfront_end"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(4696)}));r=n.O(r)})();
//# sourceMappingURL=app.be6aaa9b.js.map