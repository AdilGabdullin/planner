(this.webpackJsonpplanner=this.webpackJsonpplanner||[]).push([[0],{63:function(e,t,n){},64:function(e,t,n){"use strict";n.r(t);var r,i=n(4),c=n(35),a=n(25),o=n(17),s=n(24),f=n(40),l=n(19);!function(e){e[e.Seat=0]="Seat",e[e.LeftCorner=1]="LeftCorner",e[e.RightCorner=2]="RightCorner",e[e.Complex=3]="Complex"}(r||(r={}));var u={ppmArtboard:100,ppmSelector:40,width:8,height:6,gridStep:.2,padding:.37,furniture:[{file:"BS1.png",size:[.8,.8],type:r.Seat,code:"BS1-A",price:799,name:"(0.8x0.8m)",parts:[0]},{file:"BS2.png",size:[1.6,.8],type:r.Seat,code:"BS2-A",price:1329,name:"(1.6x0.8m)",parts:[1]},{file:"BS3.png",size:[2.4,.8],type:r.Seat,code:"BS3-A",price:1869,name:"(2.4x0.8m)",parts:[2]},{file:"BA1.png",size:[.93,.93],type:r.LeftCorner,code:"BA1-A",price:899,name:"(0.8x0.8m)",parts:[3]},{file:"BA2-L.png",size:[1.76,.93],type:r.LeftCorner,code:"BA2L-A",price:1269,name:"(1.6x0.8m)",parts:[4]},{file:"BA2-R.png",size:[1.76,.93],type:r.RightCorner,code:"BA2R-A",price:1269,name:"(1.6x0.8m)",parts:[5]},{file:"BS1+BA1.png",size:[.93,.93],type:r.Complex,code:"BS1+BA1",price:1698,name:"(0.8x0.8m)",parts:[0,3],offset:[-.1,-.11,0,0]},{file:"BS2+BA1.png",size:[1.7,.93],type:r.Complex,code:"BS2+BA1",price:2228,name:"(1.6x0.8m)",parts:[1,3],offset:[0,-.13,-.1,0]},{file:"BS2+BA2L.png",size:[1.76,.93],type:r.Complex,code:"BS2+BA2L",price:2598,name:"(1.6x0.8m)",parts:[1,4],offset:[-.05,-.13,-.11,0]},{file:"BS2+BA2R.png",size:[1.76,.93],type:r.Complex,code:"BS2+BA2R",price:2598,name:"(1.6x0.8m)",parts:[1,5],offset:[-.1,-.13,-.06,0]},{file:"BS2+BA1+BA1.png",size:[1.86,.93],type:r.Complex,code:"BS2+BA1+BA1",price:3127,name:"(1.6x0.8m)",parts:[1,3,3],offset:[-.12,-.11,-.14,-.02]},{file:"BS2+BS2+BA2L.png",size:[2.55,1.76],type:r.Complex,code:"BS2+BS2+BA2L",price:3927,name:"(2.4x1.6m)",parts:[1,1,4],offset:[.01,-.14,-.16,-.02]},{file:"BS2+BS2+BA2R.png",size:[2.55,1.76],type:r.Complex,code:"BS2+BS2+BA2R",price:3927,name:"(2.4x1.6m)",parts:[1,1,5],offset:[-.16,-.15,0,0]},{file:"BS3+BA1.png",size:[2.55,.93],type:r.Complex,code:"BS3+BA1",price:2768,name:"(2.4x0.8m)",parts:[2,3],offset:[-.14,-.12,0,0]},{file:"BS3+BA1+BA2R.png",size:[2.68,.93],type:r.Complex,code:"BS3+BA1+BA2R",price:4037,name:"(2.4x0.8m)",parts:[2,3,5],offset:[-.14,-.12,-.14,0]},{file:"BS3+BA1_flip.png",size:[2.55,.93],type:r.Complex,code:"BS3+BA1",price:2768,name:"(2.4x0.8m)",parts:[2,3],offset:[0,-.12,-.15,0]},{file:"BS3+BA2L.png",size:[2.55,.93],type:r.Complex,code:"BS3+BA2L",price:3138,name:"(2.4x0.8m)",parts:[2,4],offset:[0,-.12,-.15,0]},{file:"BS3+BA2R.png",size:[2.55,.93],type:r.Complex,code:"BS3+BA2R",price:3138,name:"(2.4x0.8m)",parts:[2,5],offset:[-.14,-.12,0,0]}]},d=n(16),p=n(1),h=function(e){return e*u.ppmArtboard},x=u.furniture.map((function(e){var t=e.size,n=e.file,r=e.offset,i=h(t[0]),c=h(t[1]),a=new Image;return a.width=i,a.height=c,a.src="".concat("/planner","/images/").concat(n),Object(l.a)(Object(l.a)({},e),{},{image:a,width:i,height:c,selectorWidth:t[0]*u.ppmSelector,selectorHeight:t[1]*u.ppmSelector,offset:(null!==r&&void 0!==r?r:[0,0,0,0]).map(h)})})),g=h(u.width),b=h(u.height),m=h(u.gridStep),j=h(u.padding),v=function(e){return Math.round((e-j)/m)*m+j},y={width:g,height:b,gridStep:m,padding:j,round:v},O=Object(f.b)({name:"artboard",initialState:{placement:[],drop:{id:0,visible:!1,type:r.Seat},stageRect:{x:0,y:0,width:0,height:0},magnets:[]},reducers:{place:function(e,t){var n=t.payload,r=n.id,i=n.x,c=n.y,a=n.rotation,s=x[r],f=s.width,l=s.height,u=s.type,d=s.offset,p=Object(o.a)(d,4),h=p[0],g=p[1],b=((null!==a&&void 0!==a?a:0)+360)%360,m={x:i-h,y:c-g,width:f+h+p[2],height:l+g+p[3]};90===b?(m.x-=l,m.width+=l-f,m.height+=f-l):180===b?(m.y-=l,m.x-=f):270===b&&(m.y-=f,m.width+=l-f,m.height+=f-l),e.placement.push({id:r,x:i-h,y:c-g,rotation:b,selected:!1,rect:m,offset:d,type:u})},move:function(e,t){var n=e.placement,i=t.payload,c=i.selected,a=i.movementX,o=i.movementY,s=c.find((function(e){var t=n[e].type;return t===r.Seat||t===r.Complex}));if(void 0===s)return e;var f=n[s].rect,l=f.x,u=f.y,d=v(l+a)-l,p=v(u+o)-u;c.forEach((function(e){var t=n[e];t.x+=d,t.y+=p,t.rect.x+=d,t.rect.y+=p}))},rotate:function(e,t){var n=e.placement,r=t.payload,i=r.selected,c=r.groupRect,a=c.x,s=c.y,f=c.height;i.forEach((function(e){var t=n[e],r=Object(d.a)(t),i=r.rotation,c=r.rect,l=Object(o.a)(r.offset,2),u=l[0],p=l[1],h=c.x,x=c.y,g=c.height,b=c.width,m=a+s+f-h-x-g,j=-a+s+h-x;t.rect.x+=m,t.rect.y+=j,t.rect.height=b,t.rect.width=g,t.rotation=(t.rotation+90)%360,0===i?(t.x=t.rect.x+g-u-p,t.y=t.rect.y-p+u):90===i?(t.x=t.rect.x+g-u-u,t.y=t.rect.y+b-p-p):180===i?(t.x=t.rect.x-u+p,t.y=t.rect.y+b-p-u):(t.x=t.rect.x,t.y=t.rect.y)}))},remove:function(e,t){var n=t.payload.selected;console.log(n),console.log(Object(d.a)(e.placement)),e.placement=e.placement.filter((function(e,t){return!n.includes(t)}))},setSelected:function(e,t){for(var n=Object(d.a)(e.placement),r=n.map((function(e,t){return t})),i=function(e){return r.filter((function(t){return function(e,t){var r=function(e){return{x:e.x+4,y:e.y+4,width:e.width-8,height:e.height-8}};return p.b.haveIntersection(r(n[e].rect),r(n[t].rect))}(e,t)}))},c=function e(t){var n,r=(n=t.flatMap(i),Array.from(new Set(n)));return r.length===t.length?r:e(r)}(t.payload),a=0;a<n.length;a++)e.placement[a].selected=c.includes(a)},setStageRect:function(e,t){e.stageRect=t.payload},setDrop:function(e,t){var n=t.payload,r=n.id,i=n.visible;void 0!==r&&(e.drop.id=r,e.drop.type=x[r].type),void 0!==i&&(e.drop.visible=i)},addMagnets:function(e){e.placement.filter((function(e){return e.type===r.Seat})).forEach((function(t){var n=t.rect,r=n.x,i=n.y,c=n.width,a=n.height;e.magnets.push({x:r,y:i,rotation:0},{x:r+c,y:i,rotation:90},{x:r+c,y:i+a,rotation:180},{x:r,y:i+a,rotation:270})}))},removeMagnets:function(e){e.magnets=[]}}}),A=O.actions,B=A.place,S=A.move,w=A.rotate,R=A.remove,C=A.setSelected,M=A.setStageRect,k=A.setDrop,z=A.addMagnets,E=A.removeMagnets,L=function(e){return x},D=function(e){return y},I=function(e){return e.artboard.placement},F=function(e){return e.artboard.stageRect},T=function(e){var t=function(e){var t=e.x,n=e.y,r=e.width,i=e.height,c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:4;return{x:t+c,y:n+c,width:r-2*c,height:i-2*c}},n=e.artboard,r=n.placement,i=n.drop,c=x[i.id],a=c.width,o=c.height;return Object(l.a)(Object(l.a)({},e.artboard.drop),{},{possible:function(e,n){return r.every((function(r){return i=r.rect,c={x:e,y:n,width:a,height:o},!p.b.haveIntersection(t(i),t(c));var i,c}))}})},Q=function(e){return e.artboard.magnets},X=O.reducer,W=Object(f.a)({reducer:{artboard:X}}),Y=function(){return Object(s.b)()},G=s.c,H=n(26),J=n(13),P=n(5);function U(){for(var e=G(D),t=e.width,n=e.height,r=e.gridStep,i=e.padding,c=[],a=0,o="#cccccc",s=function(e){return Object(P.jsx)(J.e,{stroke:o,x:e,y:i,points:[0,-1,0,n+1]},a)},f=function(e){return Object(P.jsx)(J.e,{stroke:o,x:i,y:e,points:[-1,0,t+1,0]},a)},l=i;l<=t+i;a+=1,l+=r)c.push(s(l));for(var u=i;u<=n+i;a+=1,u+=r)c.push(f(u));o="#999999";for(var d=i;d<=t+i;a+=1,d+=5*r)c.push(s(d));for(var p=i;p<=n+i;a+=1,p+=5*r)c.push(f(p));return Object(P.jsx)(P.Fragment,{children:c})}var q=n(39),_=document.createElement("img");_.src="".concat("/planner","/images/icons/rotate.svg");var K=document.createElement("img");function N(e){var t=e.x,n=e.y,r=e.onRotate,i=e.onDelete;return Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)(V,{x:t,y:n,image:_,onClick:r}),Object(P.jsx)(V,{x:t,y:n+45,image:K,onClick:i})]})}function V(e){var t=e.x,n=e.y,r=e.image,c=e.onClick,a=Object(i.useState)(!1),s=Object(o.a)(a,2),f=s[0],l=s[1];return Object(P.jsxs)(J.b,{onClick:c,onMouseEnter:function(){return l(!0)},onMouseLeave:function(){return l(!1)},children:[Object(P.jsx)(J.a,{x:t-22.5,y:n+15,radius:15,stroke:f?"#f5f5f5":"black",strokeWidth:1,fill:f?"#f5f5f5":"white"}),Object(P.jsx)(J.c,{x:t-34.5,y:n+3,image:r,width:24,height:24})]})}function Z(e){var t=e.rectMode,n=Object(s.b)(),c=G(D),a=c.padding,f=c.round,u=G(L),d=G(I),p=G(F),h=Object(i.useState)({x:0,y:0}),x=Object(o.a)(h,2),g=x[0],b=x[1],m=d.filter((function(e){return e.selected})),j=[];d.forEach((function(e,t){e.selected&&j.push(t)}));var v=function(e,t){var n,i=1/0,c=1/0,a=-1/0,o=-1/0,s=function(e){return e.type===r.Seat||e.type===r.Complex},f=Object(q.a)(e.filter(s));try{for(f.s();!(n=f.n()).done;){var l=n.value.rect,u=l.x,d=l.y,p=l.width,h=l.height;u<i&&(i=u),d<c&&(c=d),u+p>a&&(a=u+p),d+h>o&&(o=d+h)}}catch(b){f.e(b)}finally{f.f()}var x=t(i),g=t(c);return{x:x,y:g,width:t(a)-x,height:t(o)-g,visible:e.length>0}}(m,f),y=v.width,O=v.height,A=[p.x+a-v.x,p.x+p.width-y-a-v.x],B=[a-v.y,p.height-O-a-v.y],M=function(e){return function(r){t||n(C([e]))}};return Object(P.jsxs)(P.Fragment,{children:[d.map((function(e,n){var r=e.id,i=e.x,c=e.y,a=e.rotation;if(e.selected&&!t)return null;var o=u[r].offset;return Object(P.jsx)(J.c,{key:n,x:i+o[0],y:c+o[1],rotation:a,image:u[r].image,onMouseEnter:M(n)})})),m.length>0&&!t&&Object(P.jsxs)(J.b,{draggable:!0,onDragStart:function(e){var t=e.target.getClientRect(),n=t.x,r=t.y;b({x:n,y:r})},onDragEnd:function(e){var t=e.target.getClientRect(),r=t.x,i=t.y;n(S({selected:j,movementX:r-g.x,movementY:i-g.y})),n(C([])),n(C(j))},dragBoundFunc:function(e){return{x:$(e.x,A),y:$(e.y,B)}},children:[m.map((function(e,t){var n=e.id,r=e.x,i=e.y,c=e.rotation,a=u[n].offset;return Object(P.jsx)(J.c,{key:t,x:r+a[0],y:i+a[1],rotation:c,image:u[n].image})})),v.visible&&Object(P.jsx)(J.f,Object(l.a)(Object(l.a)({},v),{},{stroke:"black"})),Object(P.jsx)(N,{x:v.x,y:v.y,onRotate:function(){n(w({selected:j,groupRect:v}))},onDelete:function(){n(R({selected:j}))}})]})]})}function $(e,t){var n=Object(o.a)(t,2),r=n[0],i=n[1];return e<r?r:e>i?i:e}function ee(e){var t=e.dropRef,n=G(T),r=n.id,c=n.visible,a=G(L),o=G(Q);if(!c)return null;var s=a[r].image;return Object(P.jsxs)(P.Fragment,{children:[o.map((function(e,t){return Object(i.createElement)(J.e,Object(l.a)(Object(l.a)(Object(l.a)({},ne),e),{},{key:t}))})),Object(P.jsx)(J.c,{ref:t,y:-200,image:s})]})}K.src="".concat("/planner","/images/icons/delete.svg");var te=36,ne={points:[0,0,te,0,te,18,18,18,18,te,0,te],fill:"#00FF00",opacity:.5,strokeWidth:0,closed:!0};function re(){var e=G(T),t=G(D),n=t.width,r=t.height,i=t.padding;return e.visible?Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)(J.e,{x:i,y:i,stroke:"black",points:[0,-1,0,r+1]}),Object(P.jsx)(J.e,{x:i,y:i,stroke:"black",points:[-1,0,n,0]}),Object(P.jsx)(J.e,{x:i,y:i+r,stroke:"black",points:[-1,0,n,0]}),Object(P.jsx)(J.e,{x:i+n,y:i,stroke:"black",points:[0,-1,0,r+1]})]}):null}var ie,ce=n(29),ae=n(33);function oe(e){var t=e.dropRef,n=Y(),r=Object(i.useRef)(null),c=G(I),a={x1:0,y1:0,x2:0,y2:0,rectMode:!1},f=Object(i.useState)(a),u=Object(o.a)(f,2),d=u[0],h=d.x1,x=d.y1,g=d.x2,b=d.y2,m=d.rectMode,j=u[1],v={x:Math.min(h,g),y:Math.min(x,b),width:Math.abs(g-h),height:Math.abs(b-x)},y=G(D),O=y.width,A=y.height,B=y.padding;return Object(P.jsx)(J.g,{onMouseDown:function(e){var t=e.target;if(t instanceof ae.a||t instanceof ce.a){var r=se(e),i=r.x,c=r.y;j({x1:i,y1:c,x2:i,y2:c,rectMode:!0}),n(C([]))}},onMouseMove:function(e){if(m){var t=se(e),n=t.x,r=t.y;j({x1:h,y1:x,x2:n,y2:r,rectMode:!0})}},onMouseUp:function(e){if(m){var t=[];c.forEach((function(e,n){p.b.haveIntersection(v,e.rect)&&t.push(n)})),n(C(t)),j(a)}},width:O+2*B,height:A+2*B,children:Object(P.jsx)(s.a,{store:Object(s.d)(),children:Object(P.jsxs)(J.d,{children:[Object(P.jsx)(U,{}),Object(P.jsx)(re,{}),Object(P.jsx)(Z,{rectMode:m}),Object(P.jsx)(ee,{dropRef:t}),Object(P.jsx)(J.f,Object(l.a)(Object(l.a)({},v),{},{ref:r,fill:"rgba(0,0,255,0.5)",visible:m}))]})})})}function se(e){var t=e.evt,n=t.clientX,r=t.clientY,i=e.currentTarget.attrs.container.getBoundingClientRect();return{x:n-i.x,y:r-i.y}}function fe(){var e=Y(),t=G(D),n=t.round,c=t.padding,a=Object(i.useRef)(null),s=G(F),f=G(T),l=f.type,u=l===r.Seat||l===r.Complex,d=l===r.LeftCorner||l===r.RightCorner,p=G(L),h=Object(i.useRef)(null),x=G(Q),g=function(t){f.visible!==t&&e(k({visible:t}))};Object(i.useEffect)((function(){if(null!==a.current){var t=a.current.getBoundingClientRect(),n=t.x,r=t.y,i=t.width,c=t.height;s.x===n&&s.width===i||e(M({x:n,y:r,width:i,height:c}))}}));return Object(P.jsx)(ve,{ref:a,onDragOver:function(e){e.preventDefault();var t=h.current,i=e.target;if(null!==t&&i instanceof Element){var a=i.getBoundingClientRect(),s=a.x,d=a.y,b=a.width,m=a.height,j=e.clientX-s,v=e.clientY-d,y=p[f.id].width,O=p[f.id].height;if(u){var A=p[f.id].offset,B=Object(o.a)(A,4),S=B[0],w=B[1],R=B[2],C=B[3],M=n(le(j,[c,b-c-y-S-R]))+S,k=n(le(v,[c,m-c-O-w-C]))+w;t.setAttrs({x:M,y:k,visible:!0,opacity:.7,fill:f.possible(M,k)?void 0:"rgb(255,0,0,0.5)"})}else{var z=function(e,t,n){var r=100,i=n.map((function(n){var i=e-n.x,c=t-n.y,a=Math.sqrt(i*i+c*c);return a<r?a:1/0})),c=i.reduce((function(e,t,n){return i[e]>t?n:e}),0);return i[c]===1/0?void 0:n[c]}(j,v,x);if(void 0!==z)if(l!==r.LeftCorner)if(l!==r.RightCorner);else{var E=z.x,L=z.y,D=z.rotation;t.setAttrs({x:E+12*de(D-135)*Math.SQRT2+pe(-D)*y,y:L+12*pe(D-135)*Math.SQRT2+de(-D)*y,visible:!0,rotation:D-90})}else{var I=z.x,F=z.y,T=z.rotation;t.setAttrs({x:I+12*de(T-135)*Math.SQRT2,y:F+12*pe(T-135)*Math.SQRT2,visible:!0,rotation:T})}else t.setAttrs({visible:!1})}}else g(!0)},onDrop:function(t){t.preventDefault();var n=h.current;if(null!==n){var r=n.attrs,i=r.x,c=r.y,a=r.rotation,o=r.visible;(u&&f.possible(i,c)||d&&o)&&e(B({id:f.id,x:i,y:c,rotation:a}))}},onDragLeave:function(e){g(!1)},children:Object(P.jsx)(oe,{dropRef:h})})}function le(e,t){var n=Object(o.a)(t,2),r=n[0],i=n[1];return e<r?r:e>i?i:e}var ue=Math.PI/180;function de(e){return Math.cos(e*ue)}function pe(e){return Math.sin(e*ue)}var he,xe,ge,be,me,je,ve=H.a.div(ie||(ie=Object(a.a)(["\n    display: table;\n"])));function ye(){var e=Object(i.useState)({shift:0,chevrons:[!1,!0]}),t=Object(o.a)(e,2),n=t[0],c=t[1],a=143,s=G(L),f=Object(i.useRef)(null),l=a*s.length,u=Y(),d=function(e){if(null!==f.current){var t=f.current.getBoundingClientRect().width,r=Math.floor(t/a),i=r*a-l,o=n.shift+r*a*e;o>0&&(o=0),o<i&&(o=i),c({shift:o,chevrons:[0!==o,o!==i]})}},p=function(e){var t=e.target;if(t instanceof Element){var n=t.getAttribute("data-furniture-id");if(null!==n){!function(e){e.dataTransfer.setDragImage(Oe,0,0)}(e),u(k({id:+n})),u(C([]));var i=s[+n].type;i!==r.LeftCorner&&i!==r.RightCorner||u(z())}}},h=function(e){u(k({visible:!1})),u(E())};return Object(P.jsxs)(Ae,{children:[Object(P.jsx)(Be,{visible:n.chevrons[0],children:Object(P.jsx)("img",{src:"".concat("/planner","/images/icons/arrow.svg"),alt:"left",onClick:function(){return d(1)}})}),Object(P.jsx)(we,{ref:f,children:Object(P.jsx)(Re,{width:l,shift:n.shift,children:s.map((function(e,t){var n=e.file,r=e.name,i=e.code,c=e.price,a=e.selectorWidth;return Object(P.jsxs)(Ce,{draggable:"true",onDragStart:p,onDragEnd:h,"data-furniture-id":t,children:[Object(P.jsx)("img",{src:"".concat("/planner","/images/").concat(n),alt:r,width:a,"data-furniture-id":t}),Object(P.jsxs)("figcaption",{children:[r," ",Object(P.jsx)("br",{})," ",i," ",Object(P.jsx)("br",{})," ",c," EUR"," "]})]},t)}))})}),Object(P.jsx)(Se,{visible:n.chevrons[1],children:Object(P.jsx)("img",{src:"".concat("/planner","/images/icons/arrow.svg"),alt:"right",onClick:function(){return d(-1)}})})]})}var Oe=new Image;Oe.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";var Ae=H.a.div(he||(he=Object(a.a)(["\n    display: flex;\n"]))),Be=H.a.div(xe||(xe=Object(a.a)(["\n    transform: rotate(180deg);\n    align-self: center;\n    opacity: ",";\n"])),(function(e){return e.visible?1:0})),Se=Object(H.a)(Be)(ge||(ge=Object(a.a)(["\n    transform: none;\n"]))),we=H.a.div(be||(be=Object(a.a)(["\n    margin: 0 5px;\n    overflow: hidden;\n"]))),Re=H.a.div(me||(me=Object(a.a)(["\n    transition: transform 1s;\n    margin: 20px -15px;\n    width: ","px;\n    transform: translateX(","px);\n"])),(function(e){return e.width}),(function(e){return e.shift})),Ce=H.a.figure(je||(je=Object(a.a)(["\n    display: block;\n    position: relative;\n    width: 113px;\n    height: 141px;\n    float: left;\n    margin: 0 15px;\n    text-align: center;\n    background-color: #f7f7f7;\n    text-align: left;\n    figcaption {\n        position: absolute;\n        font: 12px AtlasGrotesk-Regular;\n        left: 2px;\n        bottom: 3px;\n    }\n"])));function Me(){return Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)(ye,{}),Object(P.jsx)(fe,{})]})}n(63);c.render(Object(P.jsx)(i.StrictMode,{children:Object(P.jsx)(s.a,{store:W,children:Object(P.jsx)(Me,{})})}),document.getElementById("root"))}},[[64,1,2]]]);
//# sourceMappingURL=main.fe437820.chunk.js.map