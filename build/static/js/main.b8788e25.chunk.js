(this.webpackJsonpplanner=this.webpackJsonpplanner||[]).push([[0],{63:function(e,t,n){},64:function(e,t,n){"use strict";n.r(t);var r,i=n(4),a=n(35),c=n(25),o=n(17),s=n(24),f=n(40),u=n(22);!function(e){e[e.Seat=0]="Seat",e[e.LeftCorner=1]="LeftCorner",e[e.RightCorner=2]="RightCorner",e[e.Complex=3]="Complex"}(r||(r={}));var l={ppmArtboard:100,ppmSelector:40,width:8,height:6,gridStep:.2,padding:.37,furniture:[{file:"BS1.png",size:[.8,.8],type:r.Seat,code:"BS1-A",price:799,name:"(0.8x0.8m)",parts:[0]},{file:"BS2.png",size:[1.6,.8],type:r.Seat,code:"BS2-A",price:1329,name:"(1.6x0.8m)",parts:[1]},{file:"BS3.png",size:[2.4,.8],type:r.Seat,code:"BS3-A",price:1869,name:"(2.4x0.8m)",parts:[2]},{file:"BA1.png",size:[.93,.93],type:r.LeftCorner,code:"BA1-A",price:899,name:"(0.8x0.8m)",parts:[3]},{file:"BA2-L.png",size:[1.76,.93],type:r.LeftCorner,code:"BA2L-A",price:1269,name:"(1.6x0.8m)",parts:[4]},{file:"BA2-R.png",size:[1.76,.93],type:r.RightCorner,code:"BA2R-A",price:1269,name:"(1.6x0.8m)",parts:[5]},{file:"BS1+BA1.png",size:[.93,.93],type:r.Complex,code:"BS1+BA1",price:1698,name:"(0.8x0.8m)",parts:[0,3],offset:[-.1,-.11,0,0]},{file:"BS2+BA1.png",size:[1.7,.93],type:r.Complex,code:"BS2+BA1",price:2228,name:"(1.6x0.8m)",parts:[1,3],offset:[0,-.13,-.1,0]},{file:"BS2+BA2L.png",size:[1.76,.93],type:r.Complex,code:"BS2+BA2L",price:2598,name:"(1.6x0.8m)",parts:[1,4],offset:[-.05,-.13,-.11,0]},{file:"BS2+BA2R.png",size:[1.76,.93],type:r.Complex,code:"BS2+BA2R",price:2598,name:"(1.6x0.8m)",parts:[1,5],offset:[-.1,-.13,-.06,0]},{file:"BS2+BA1+BA1.png",size:[1.86,.93],type:r.Complex,code:"BS2+BA1+BA1",price:3127,name:"(1.6x0.8m)",parts:[1,3,3],offset:[-.12,-.11,-.14,-.02]},{file:"BS2+BS2+BA2L.png",size:[2.55,1.76],type:r.Complex,code:"BS2+BS2+BA2L",price:3927,name:"(2.4x1.6m)",parts:[1,1,4],offset:[.01,-.14,-.16,-.02]},{file:"BS2+BS2+BA2R.png",size:[2.55,1.76],type:r.Complex,code:"BS2+BS2+BA2R",price:3927,name:"(2.4x1.6m)",parts:[1,1,5],offset:[-.16,-.15,0,0]},{file:"BS3+BA1.png",size:[2.55,.93],type:r.Complex,code:"BS3+BA1",price:2768,name:"(2.4x0.8m)",parts:[2,3],offset:[-.14,-.12,0,0]},{file:"BS3+BA1+BA2R.png",size:[2.68,.93],type:r.Complex,code:"BS3+BA1+BA2R",price:4037,name:"(2.4x0.8m)",parts:[2,3,5],offset:[-.14,-.12,-.14,0]},{file:"BS3+BA1_flip.png",size:[2.55,.93],type:r.Complex,code:"BS3+BA1",price:2768,name:"(2.4x0.8m)",parts:[2,3],offset:[0,-.12,-.15,0]},{file:"BS3+BA2L.png",size:[2.55,.93],type:r.Complex,code:"BS3+BA2L",price:3138,name:"(2.4x0.8m)",parts:[2,4],offset:[0,-.12,-.15,0]},{file:"BS3+BA2R.png",size:[2.55,.93],type:r.Complex,code:"BS3+BA2R",price:3138,name:"(2.4x0.8m)",parts:[2,5],offset:[-.14,-.12,0,0]}]},d=n(16),p=n(1),h=function(e){return e*l.ppmArtboard},x=l.furniture.map((function(e){var t=e.size,n=e.file,r=e.offset,i=h(t[0]),a=h(t[1]),c=new Image;return c.width=i,c.height=a,c.src="".concat("/planner","/images/").concat(n),console.log(c.src),Object(u.a)(Object(u.a)({},e),{},{image:c,width:i,height:a,selectorWidth:t[0]*l.ppmSelector,selectorHeight:t[1]*l.ppmSelector,offset:(null!==r&&void 0!==r?r:[0,0,0,0]).map(h)})})),g=h(l.width),b=h(l.height),j=h(l.gridStep),m=h(l.padding),y=function(e){return Math.round((e-m)/j)*j+m},v={width:g,height:b,gridStep:j,padding:m,round:y},O=Object(f.b)({name:"artboard",initialState:{placement:[],drop:{id:0,visible:!1,type:r.Seat},stageRect:{x:0,y:0,width:0,height:0},magnets:[]},reducers:{place:function(e,t){var n=t.payload,r=n.id,i=n.x,a=n.y,c=n.rotation,s=x[r],f=s.width,u=s.height,l=s.type,d=s.offset,p=Object(o.a)(d,4),h=p[0],g=p[1],b=((null!==c&&void 0!==c?c:0)+360)%360,j={x:i-h,y:a-g,width:f+h+p[2],height:u+g+p[3]};90===b?(j.x-=u,j.width+=u-f,j.height+=f-u):180===b?(j.y-=u,j.x-=f):270===b&&(j.y-=f,j.width+=u-f,j.height+=f-u),e.placement.push({id:r,x:i-h,y:a-g,rotation:b,selected:!1,rect:j,offset:d,type:l})},move:function(e,t){var n=e.placement,i=t.payload,a=i.selected,c=i.movementX,o=i.movementY,s=a.find((function(e){var t=n[e].type;return t===r.Seat||t===r.Complex}));if(void 0===s)return e;var f=n[s].rect,u=f.x,l=f.y,d=y(u+c)-u,p=y(l+o)-l;a.forEach((function(e){var t=n[e];t.x+=d,t.y+=p,t.rect.x+=d,t.rect.y+=p}))},rotate:function(e,t){var n=e.placement,r=t.payload,i=r.selected,a=r.groupRect,c=a.x,s=a.y,f=a.height;i.forEach((function(e){var t=n[e],r=Object(d.a)(t),i=r.rotation,a=r.rect,u=Object(o.a)(r.offset,2),l=u[0],p=u[1],h=a.x,x=a.y,g=a.height,b=a.width,j=c+s+f-h-x-g,m=-c+s+h-x;t.rect.x+=j,t.rect.y+=m,t.rect.height=b,t.rect.width=g,t.rotation=(t.rotation+90)%360,0===i?(t.x=t.rect.x+g-l-p,t.y=t.rect.y-p+l):90===i?(t.x=t.rect.x+g-l-l,t.y=t.rect.y+b-p-p):180===i?(t.x=t.rect.x-l+p,t.y=t.rect.y+b-p-l):(t.x=t.rect.x,t.y=t.rect.y)}))},setSelected:function(e,t){for(var n=Object(d.a)(e.placement),r=n.map((function(e,t){return t})),i=function(e){return r.filter((function(t){return function(e,t){var r=function(e){return{x:e.x+4,y:e.y+4,width:e.width-8,height:e.height-8}};return p.b.haveIntersection(r(n[e].rect),r(n[t].rect))}(e,t)}))},a=function e(t){var n,r=(n=t.flatMap(i),Array.from(new Set(n)));return r.length===t.length?r:e(r)}(t.payload),c=0;c<n.length;c++)e.placement[c].selected=a.includes(c)},setStageRect:function(e,t){e.stageRect=t.payload},setDrop:function(e,t){var n=t.payload,r=n.id,i=n.visible;void 0!==r&&(e.drop.id=r,e.drop.type=x[r].type),void 0!==i&&(e.drop.visible=i)},addMagnets:function(e){e.placement.filter((function(e){return e.type===r.Seat})).forEach((function(t){var n=t.rect,r=n.x,i=n.y,a=n.width,c=n.height;e.magnets.push({x:r,y:i,rotation:0},{x:r+a,y:i,rotation:90},{x:r+a,y:i+c,rotation:180},{x:r,y:i+c,rotation:270})}))},removeMagnets:function(e){e.magnets=[]}}}),B=O.actions,A=B.place,S=B.move,w=B.rotate,R=B.setSelected,C=B.setStageRect,M=B.setDrop,k=B.addMagnets,z=B.removeMagnets,E=function(e){return x},L=function(e){return v},D=function(e){return e.artboard.placement},I=function(e){return e.artboard.stageRect},F=function(e){return e.artboard.drop},T=function(e){return e.artboard.magnets},Q=O.reducer,X=Object(f.a)({reducer:{artboard:Q}}),W=function(){return Object(s.b)()},Y=s.c,G=n(26),H=n(13),J=n(5);function P(){for(var e=Y(L),t=e.width,n=e.height,r=e.gridStep,i=e.padding,a=[],c=0,o="#cccccc",s=function(e){return Object(J.jsx)(H.e,{stroke:o,x:e,y:i,points:[0,-1,0,n+1]},c)},f=function(e){return Object(J.jsx)(H.e,{stroke:o,x:i,y:e,points:[-1,0,t+1,0]},c)},u=i;u<=t+i;c+=1,u+=r)a.push(s(u));for(var l=i;l<=n+i;c+=1,l+=r)a.push(f(l));o="#999999";for(var d=i;d<=t+i;c+=1,d+=5*r)a.push(s(d));for(var p=i;p<=n+i;c+=1,p+=5*r)a.push(f(p));return Object(J.jsx)(J.Fragment,{children:a})}var U=n(39),_=document.createElement("img");function q(e){var t=e.x,n=e.y,r=e.onRotate,a=Object(i.useState)({hover:!1}),c=Object(o.a)(a,2),s=c[0],f=c[1],u=s.hover;return Object(J.jsxs)(H.b,{onClick:r,onMouseEnter:function(){return f({hover:!0})},onMouseLeave:function(){return f({hover:!1})},children:[Object(J.jsx)(H.a,{x:t-22.5,y:n+15,radius:15,stroke:u?"#f5f5f5":"black",strokeWidth:1,fill:u?"#f5f5f5":"white"}),Object(J.jsx)(H.c,{x:t-34.5,y:n+3,image:_,width:24,height:24})]})}function K(e){var t=e.rectMode,n=Object(s.b)(),a=Y(L),c=a.padding,f=a.round,l=Y(E),d=Y(D),p=Y(I),h=Object(i.useState)({x:0,y:0}),x=Object(o.a)(h,2),g=x[0],b=x[1],j=d.filter((function(e){return e.selected})),m=[];d.forEach((function(e,t){e.selected&&m.push(t)}));var y=function(e,t){var n,i=1/0,a=1/0,c=-1/0,o=-1/0,s=function(e){return e.type===r.Seat||e.type===r.Complex},f=Object(U.a)(e.filter(s));try{for(f.s();!(n=f.n()).done;){var u=n.value.rect,l=u.x,d=u.y,p=u.width,h=u.height;l<i&&(i=l),d<a&&(a=d),l+p>c&&(c=l+p),d+h>o&&(o=d+h)}}catch(b){f.e(b)}finally{f.f()}var x=t(i),g=t(a);return{x:x,y:g,width:t(c)-x,height:t(o)-g,visible:e.length>0}}(j,f),v=y.width,O=y.height,B=[p.x+c-y.x,p.x+p.width-v-c-y.x],A=[c-y.y,p.height-O-c-y.y],C=function(e){return function(r){t||n(R([e]))}};return Object(J.jsxs)(J.Fragment,{children:[d.map((function(e,n){var r=e.id,i=e.x,a=e.y,c=e.rotation;if(e.selected&&!t)return null;var o=l[r].offset;return Object(J.jsx)(H.c,{key:n,x:i+o[0],y:a+o[1],rotation:c,image:l[r].image,onMouseEnter:C(n)})})),j.length>0&&!t&&Object(J.jsxs)(H.b,{draggable:!0,onDragStart:function(e){var t=e.target.getClientRect(),n=t.x,r=t.y;b({x:n,y:r})},onDragEnd:function(e){var t=e.target.getClientRect(),r=t.x,i=t.y;n(S({selected:m,movementX:r-g.x,movementY:i-g.y})),n(R([])),n(R(m))},dragBoundFunc:function(e){return{x:N(e.x,B),y:N(e.y,A)}},children:[j.map((function(e,t){var n=e.id,r=e.x,i=e.y,a=e.rotation,c=l[n].offset;return Object(J.jsx)(H.c,{key:t,x:r+c[0],y:i+c[1],rotation:a,image:l[n].image})})),y.visible&&Object(J.jsx)(H.f,Object(u.a)(Object(u.a)({},y),{},{stroke:"black"})),Object(J.jsx)(q,{x:y.x,y:y.y,onRotate:function(){n(w({selected:m,groupRect:y}))}})]})]})}function N(e,t){var n=Object(o.a)(t,2),r=n[0],i=n[1];return e<r?r:e>i?i:e}function V(e){var t=e.dropRef,n=Y(F),r=n.id,a=n.visible,c=Y(E),o=Y(T);if(!a)return null;var s=c[r].image;return Object(J.jsxs)(J.Fragment,{children:[o.map((function(e,t){return Object(i.createElement)(H.e,Object(u.a)(Object(u.a)(Object(u.a)({},$),e),{},{key:t}))})),Object(J.jsx)(H.c,{ref:t,y:-200,image:s})]})}_.src="".concat("/planner","/images/icons/rotate.svg");var Z=36,$={points:[0,0,Z,0,Z,18,18,18,18,Z,0,Z],fill:"#00FF00",opacity:.5,strokeWidth:0,closed:!0};function ee(){var e=Y(F),t=Y(L),n=t.width,r=t.height,i=t.padding;return e.visible?Object(J.jsxs)(J.Fragment,{children:[Object(J.jsx)(H.e,{x:i,y:i,stroke:"black",points:[0,-1,0,r+1]}),Object(J.jsx)(H.e,{x:i,y:i,stroke:"black",points:[-1,0,n,0]}),Object(J.jsx)(H.e,{x:i,y:i+r,stroke:"black",points:[-1,0,n,0]}),Object(J.jsx)(H.e,{x:i+n,y:i,stroke:"black",points:[0,-1,0,r+1]})]}):null}var te,ne=n(29),re=n(33);function ie(e){var t=e.dropRef,n=W(),r=Object(i.useRef)(null),a=Y(D),c={x1:0,y1:0,x2:0,y2:0,rectMode:!1},f=Object(i.useState)(c),l=Object(o.a)(f,2),d=l[0],h=d.x1,x=d.y1,g=d.x2,b=d.y2,j=d.rectMode,m=l[1],y={x:Math.min(h,g),y:Math.min(x,b),width:Math.abs(g-h),height:Math.abs(b-x)},v=Y(L),O=v.width,B=v.height,A=v.padding;return Object(J.jsx)(H.g,{onMouseDown:function(e){var t=e.target;if(t instanceof re.a||t instanceof ne.a){var r=ae(e),i=r.x,a=r.y;m({x1:i,y1:a,x2:i,y2:a,rectMode:!0}),n(R([]))}},onMouseMove:function(e){if(j){var t=ae(e),n=t.x,r=t.y;m({x1:h,y1:x,x2:n,y2:r,rectMode:!0})}},onMouseUp:function(e){if(j){var t=[];a.forEach((function(e,n){p.b.haveIntersection(y,e.rect)&&t.push(n)})),n(R(t)),m(c)}},width:O+2*A,height:B+2*A,children:Object(J.jsx)(s.a,{store:Object(s.d)(),children:Object(J.jsxs)(H.d,{children:[Object(J.jsx)(P,{}),Object(J.jsx)(ee,{}),Object(J.jsx)(K,{rectMode:j}),Object(J.jsx)(V,{dropRef:t}),Object(J.jsx)(H.f,Object(u.a)(Object(u.a)({},y),{},{ref:r,fill:"rgba(0,0,255,0.5)",visible:j}))]})})})}function ae(e){var t=e.evt,n=t.clientX,r=t.clientY,i=e.currentTarget.attrs.container.getBoundingClientRect();return{x:n-i.x,y:r-i.y}}function ce(){var e=W(),t=Y(L),n=t.round,a=t.padding,c=Object(i.useRef)(null),s=Y(I),f=Y(F),u=Y(E),l=Object(i.useRef)(null),d=Y(T),p=function(t){f.visible!==t&&e(M({visible:t}))};Object(i.useEffect)((function(){if(null!==c.current){var t=c.current.getBoundingClientRect(),n=t.x,r=t.y,i=t.width,a=t.height;s.x===n&&s.width===i||e(C({x:n,y:r,width:i,height:a}))}}));return Object(J.jsx)(be,{ref:c,onDragOver:function(e){e.preventDefault();var t=l.current,i=e.target;if(null!==t&&i instanceof Element){var c=i.getBoundingClientRect(),s=c.x,h=c.y,x=c.width,g=c.height,b=e.clientX-s,j=e.clientY-h,m=u[f.id].width,y=u[f.id].height,v=f.type;if(v!==r.Seat&&v!==r.Complex){var O=function(e,t,n){var r=n.map((function(n){var r=e-n.x,i=t-n.y;return r*r+i*i})),i=r.reduce((function(e,t,n){return r[e]>t?n:e}),0);return n[i]}(b,j,d);if(v!==r.LeftCorner)if(v!==r.RightCorner);else{var B=O.x,A=O.y,S=O.rotation;t.setAttrs({x:B+12*fe(S-135)*Math.SQRT2+ue(-S)*m,y:A+12*ue(S-135)*Math.SQRT2+fe(-S)*m,rotation:S-90})}else{var w=O.x,R=O.y,C=O.rotation;t.setAttrs({x:w+12*fe(C-135)*Math.SQRT2,y:R+12*ue(C-135)*Math.SQRT2,rotation:C})}}else{var M=u[f.id].offset,k=Object(o.a)(M,4),z=k[0],E=k[1],L=k[2],D=k[3];t.setAttrs({x:n(oe(b,[a,x-a-m-z-L]))+z,y:n(oe(j,[a,g-a-y-E-D]))+E})}}else p(!0)},onDrop:function(t){t.preventDefault();var n=l.current;if(null!==n){var r=n.attrs,i=r.x,a=r.y,c=r.rotation;e(A({id:f.id,x:i,y:a,rotation:c}))}},onDragLeave:function(e){p(!1)},children:Object(J.jsx)(ie,{dropRef:l})})}function oe(e,t){var n=Object(o.a)(t,2),r=n[0],i=n[1];return e<r?r:e>i?i:e}var se=Math.PI/180;function fe(e){return Math.cos(e*se)}function ue(e){return Math.sin(e*se)}var le,de,pe,he,xe,ge,be=G.a.div(te||(te=Object(c.a)(["\n    display: table;\n"])));function je(){var e=Object(i.useState)({shift:0,chevrons:[!1,!0]}),t=Object(o.a)(e,2),n=t[0],a=t[1],c=143,s=Y(E),f=Object(i.useRef)(null),u=c*s.length,l=W(),d=function(e){if(null!==f.current){var t=f.current.getBoundingClientRect().width,r=Math.floor(t/c),i=r*c-u,o=n.shift+r*c*e;o>0&&(o=0),o<i&&(o=i),a({shift:o,chevrons:[0!==o,o!==i]})}},p=function(e){var t=e.target;if(t instanceof Element){var n=t.getAttribute("data-furniture-id");if(null!==n){!function(e){e.dataTransfer.setDragImage(me,0,0)}(e),l(M({id:+n})),l(R([]));var i=s[+n].type;i!==r.LeftCorner&&i!==r.RightCorner||l(k())}}},h=function(e){l(M({visible:!1})),l(z())};return Object(J.jsxs)(ye,{children:[Object(J.jsx)(ve,{visible:n.chevrons[0],children:Object(J.jsx)("img",{src:"".concat("/planner","/images/icons/arrow.svg"),alt:"left",onClick:function(){return d(1)}})}),Object(J.jsx)(Be,{ref:f,children:Object(J.jsx)(Ae,{width:u,shift:n.shift,children:s.map((function(e,t){var n=e.file,r=e.name,i=e.code,a=e.price,c=e.selectorWidth;return Object(J.jsxs)(Se,{draggable:"true",onDragStart:p,onDragEnd:h,"data-furniture-id":t,children:[Object(J.jsx)("img",{src:"/images/".concat(n),alt:r,width:c,"data-furniture-id":t}),Object(J.jsxs)("figcaption",{children:[r," ",Object(J.jsx)("br",{})," ",i," ",Object(J.jsx)("br",{})," ",a," EUR"," "]})]},t)}))})}),Object(J.jsx)(Oe,{visible:n.chevrons[1],children:Object(J.jsx)("img",{src:"".concat("/planner","/images/icons/arrow.svg"),alt:"right",onClick:function(){return d(-1)}})})]})}var me=new Image;me.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";var ye=G.a.div(le||(le=Object(c.a)(["\n    display: flex;\n"]))),ve=G.a.div(de||(de=Object(c.a)(["\n    transform: rotate(180deg);\n    align-self: center;\n    opacity: ",";\n"])),(function(e){return e.visible?1:0})),Oe=Object(G.a)(ve)(pe||(pe=Object(c.a)(["\n    transform: none;\n"]))),Be=G.a.div(he||(he=Object(c.a)(["\n    margin: 0 5px;\n    overflow: hidden;\n"]))),Ae=G.a.div(xe||(xe=Object(c.a)(["\n    transition: transform 1s;\n    margin: 20px -15px;\n    width: ","px;\n    transform: translateX(","px);\n"])),(function(e){return e.width}),(function(e){return e.shift})),Se=G.a.figure(ge||(ge=Object(c.a)(["\n    display: block;\n    position: relative;\n    width: 113px;\n    height: 141px;\n    float: left;\n    margin: 0 15px;\n    text-align: center;\n    background-color: #f7f7f7;\n    text-align: left;\n    figcaption {\n        position: absolute;\n        font: 12px AtlasGrotesk-Regular;\n        left: 2px;\n        bottom: 3px;\n    }\n"])));function we(){return Object(J.jsxs)(J.Fragment,{children:[Object(J.jsx)(je,{}),Object(J.jsx)(ce,{})]})}n(63);a.render(Object(J.jsx)(i.StrictMode,{children:Object(J.jsx)(s.a,{store:X,children:Object(J.jsx)(we,{})})}),document.getElementById("root"))}},[[64,1,2]]]);
//# sourceMappingURL=main.b8788e25.chunk.js.map