"use strict";(()=>{var ze=["flowchart","sequence"],Se=["rounded-rectangle","circle","oval","database","diamond","rhombus","flattened-hexagon","chevron","right-chevron","document"],_=["top","right","bottom","left"],$e=["orthogonal","straight","curved"],U=["none","arrow","circle"],Ie={start:"none",end:"arrow"},ke={width:120,height:60},pt={width:140,height:84},A={shape:"rounded-rectangle",label:"New node",width:190,height:80},Y={classic:{pink:{label:"Pink",light:{fill:"#F6C5D8",stroke:"#9D174D",text:"#9D174D"},dark:{fill:"#9D174D",stroke:"#FBCFE8",text:"#FBCFE8"}},red:{label:"Red",light:{fill:"#FECACA",stroke:"#B91C1C",text:"#B91C1C"},dark:{fill:"#B91C1C",stroke:"#FEE2E2",text:"#FEE2E2"}},orange:{label:"Orange",light:{fill:"#FED7AA",stroke:"#C2410C",text:"#9A3412"},dark:{fill:"#C2410C",stroke:"#FFEDD5",text:"#FFEDD5"}},yellow:{label:"Yellow",light:{fill:"#FEF08A",stroke:"#A16207",text:"#854D0E"},dark:{fill:"#A16207",stroke:"#FEF9C3",text:"#FEF9C3"}},green:{label:"Green",light:{fill:"#BBF7D0",stroke:"#15803D",text:"#166534"},dark:{fill:"#15803D",stroke:"#DCFCE7",text:"#DCFCE7"}},cyan:{label:"Cyan",light:{fill:"#A5F3FC",stroke:"#0E7490",text:"#155E75"},dark:{fill:"#0E7490",stroke:"#CFFAFE",text:"#CFFAFE"}},blue:{label:"Blue",light:{fill:"#BFDBFE",stroke:"#1D4ED8",text:"#1E3A8A"},dark:{fill:"#1D4ED8",stroke:"#DBEAFE",text:"#DBEAFE"}},purple:{label:"Purple",light:{fill:"#DDD6FE",stroke:"#6D28D9",text:"#5B21B6"},dark:{fill:"#6D28D9",stroke:"#EDE9FE",text:"#EDE9FE"}},grey:{label:"Grey",light:{fill:"#E5E7EB",stroke:"#4B5563",text:"#374151"},dark:{fill:"#4B5563",stroke:"#E5E7EB",text:"#F9FAFB"}},bw:{label:"Black and white",light:{fill:"#FFFFFF",stroke:"#111827",text:"#111827"},dark:{fill:"#111827",stroke:"#FFFFFF",text:"#FFFFFF"}}}},qt=Y.classic,te={light:{edge:{stroke:"#52616B",strokeWidth:2,text:"#3E4A54"},node:{fill:"#EAF2FF",stroke:"#3574C7",strokeWidth:2,text:"#17202A"}},dark:{edge:{stroke:"#B8C7D5",strokeWidth:2,text:"#D9E4ED"},node:{fill:"#193A61",stroke:"#71AEF7",strokeWidth:2,text:"#F3F8FC"}}};var Lt=["pink","red","orange","yellow","green","cyan","blue","purple","grey","bw"],Ct=["note","info","warning","success"],At={2:"repeat(2, minmax(0, 1fr))",3:"repeat(3, minmax(0, 1fr))","2fr 1fr":"minmax(0, 2fr) minmax(0, 1fr)","1fr 2fr":"minmax(0, 1fr) minmax(0, 2fr)"};var tr=["nodes","edges","participants","messages","activations","notes","groups"],rr=["id","label","shape","position","size","style","palette","subtitle","children"],or=["source","target","sourceAnchor","targetAnchor","route","label","style","start","end"],zt=["fill","stroke","strokeWidth","text"],nr=["stroke","strokeWidth","text"],It=["tone","colour"],ir=["id","label","kind","palette","style","size"],ar=["actor"],sr=["from","to","label","style"],dr=["solid","dashed"],cr=["participant","from","to"],lr=["at","after","label","palette","style","size"],ur=["label","from","to"];function x(r){return String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ve(r){let e=r.trim();if(e.startsWith('"')&&e.endsWith('"'))try{return JSON.parse(e)}catch{throw new Error(`Invalid quoted scalar: ${e}`)}if(e.startsWith("'")&&e.endsWith("'"))return e.slice(1,-1);if(/^-?\d+(\.\d+)?$/.test(e))return Number(e);if(e==="true"||e==="false")return e==="true";if(e.startsWith("{")&&e.endsWith("}")){let t=e.slice(1,-1).trim();if(!t)return{};let o=t.split(","),n={};for(let a of o){let i=a.indexOf(":");if(i===-1)throw new Error(`Invalid inline mapping: ${e}`);let s=a.slice(0,i).trim();n[s]=ve(a.slice(i+1))}return n}return e}function ue(r,e="classic"){let o=r.replace(/\r\n/g,`
`).split(`
`).filter(h=>h.trim()&&!h.trimStart().startsWith("#"));for(let h of o){if(h.trimStart()!==h||!h.trimEnd().endsWith(":"))continue;let m=h.trim().slice(0,-1);if(m!=="canvas"&&!tr.includes(m))throw new Error(`Unsupported diagram section: ${m}`)}let n=0,a=h=>h.length-h.trimStart().length,i=h=>h.trim().match(/^([^:]+):\s*(.*)$/),s=h=>h.trim().match(/^- ([^:]+):\s*(.*)$/),d=h=>n>=o.length||a(o[n])<=h?{}:o[n].trimStart().startsWith("- ")?u(a(o[n])):l(a(o[n])),l=h=>{let m={};for(;n<o.length&&a(o[n])===h;){let g=o[n],p=i(g);if(!p)throw new Error(`Cannot parse diagram line: ${g}`);n+=1,m[p[1]]=p[2]?ve(p[2]):d(h)}return m},u=h=>{let m=[];for(;n<o.length&&a(o[n])===h;){let g=o[n],p=s(g);if(!p)throw new Error(`Cannot parse diagram line: ${g}`);n+=1;let $={[p[1]]:p[2]?ve(p[2]):d(h)};for(;n<o.length&&a(o[n])>h;){let y=a(o[n]),k=i(o[n]);if(!k)throw new Error(`Cannot parse diagram line: ${o[n]}`);n+=1,$[k[1]]=k[2]?ve(k[2]):d(y)}m.push($)}return m},c=l(0);if(!c.type)throw new Error(`Diagram type is required and must be one of: ${ze.join(", ")}.`);if(typeof c.type!="string"||!ze.includes(c.type))throw new Error(`Unsupported diagram type: ${String(c.type)}`);return c.type==="flowchart"?mr(c,e):gr(c,e)}function mr(r,e="classic"){return r.canvas=r.canvas||{},Array.isArray(r.nodes)||(r.nodes=[]),Array.isArray(r.edges)||(r.edges=[]),hr(r,e),r}function gr(r,e="classic"){return pr(r,e),r}function K(r,e,t){for(let o of Object.keys(r||{}))if(!e.includes(o))throw new Error(`Unsupported ${t} field: ${o}`)}function ft(r,e,t){if(r){for(let o of Object.keys(r))if(!e.includes(o))throw new Error(`Unsupported ${t} style field: ${o}`)}}function hr(r,e="classic"){if(r.participants!==void 0||r.messages!==void 0||r.activations!==void 0||r.notes!==void 0||r.groups!==void 0)throw new Error("Flowchart diagrams do not support sequence sections.");let t=new Set,o=i=>{if("type"in i)throw new Error(`Node "${i.id||"unknown"}" uses removed field "type".`);if(K(i,rr,`node "${i.id||"unknown"}"`),!i.id||!i.label)throw new Error("Every node requires an id and label.");if(!i.shape)throw new Error(`Node "${i.id}" requires a shape.`);if(!Se.includes(i.shape))throw new Error(`Unsupported node shape: ${i.shape}`);if(i.palette&&(K(i.palette,It,`palette for node "${i.id}"`),!(Y[e]?.[i.palette.colour]?.[i.palette.tone]||null)))throw new Error(`Unsupported node palette: ${i.palette.tone||"unknown"} ${i.palette.colour||"unknown"}`);if(i.style?.width!==void 0)throw new Error("Node style.width is not supported; use style.strokeWidth.");if(ft(i.style,zt,`node "${i.id}"`),t.has(i.id))throw new Error(`Duplicate flowchart node id: ${i.id}`);if(t.add(i.id),i.children!==void 0&&!Array.isArray(i.children))throw new Error(`Children for node "${i.id}" must be a list.`);for(let s of i.children||[])o(s)};for(let i of r.nodes)o(i);for(let i of r.edges){if(K(i,or,`edge "${i.source||"unknown"}" -> "${i.target||"unknown"}"`),!i.sourceAnchor)throw new Error(`Edge "${i.source||"unknown"}" -> "${i.target||"unknown"}" requires a sourceAnchor.`);if(!i.targetAnchor)throw new Error(`Edge "${i.source||"unknown"}" -> "${i.target||"unknown"}" requires a targetAnchor.`);if(!_.includes(i.sourceAnchor))throw new Error(`Unsupported edge sourceAnchor: ${i.sourceAnchor}`);if(!_.includes(i.targetAnchor))throw new Error(`Unsupported edge targetAnchor: ${i.targetAnchor}`);if(i.route!==void 0&&!$e.includes(i.route))throw new Error(`Unsupported edge route: ${i.route}`);if(i.start!==void 0&&!U.includes(i.start))throw new Error(`Unsupported edge start marker: ${i.start}`);if(i.end!==void 0&&!U.includes(i.end))throw new Error(`Unsupported edge end marker: ${i.end}`);if(i.style?.width!==void 0)throw new Error("Edge style.width is not supported; use style.strokeWidth.");ft(i.style,nr,`edge "${i.source||"unknown"}" -> "${i.target||"unknown"}"`)}let n=r.theme||"light";if(!te[n])throw new Error(`Unsupported diagram theme: ${n}`)}function pr(r,e="classic"){if(r.canvas!==void 0||r.nodes!==void 0||r.edges!==void 0)throw new Error("Sequence diagrams do not support flowchart sections.");if(!Array.isArray(r.participants)||!Array.isArray(r.messages))throw new Error("Sequence diagrams require participants and messages sections.");if(r.activations!==void 0&&!Array.isArray(r.activations))throw new Error("Sequence diagram activations must be a list.");if(r.notes!==void 0&&!Array.isArray(r.notes))throw new Error("Sequence diagram notes must be a list.");if(r.groups!==void 0&&!Array.isArray(r.groups))throw new Error("Sequence diagram groups must be a list.");let t=new Set;for(let a of r.participants){if(K(a,ir,`participant "${a.id||"unknown"}"`),!a.id||!a.label)throw new Error("Every sequence participant requires an id and label.");if(a.kind!==void 0&&!ar.includes(a.kind))throw new Error(`Unsupported sequence participant kind: ${a.kind}`);if(Pt(a,`participant "${a.id}"`,e),t.has(a.id))throw new Error(`Duplicate sequence participant id: ${a.id}`);t.add(a.id)}for(let[a,i]of r.messages.entries()){if(K(i,sr,`message ${a}`),!i.from||!i.to||!i.label)throw new Error(`Sequence message ${a} requires from, to, and label.`);if(!t.has(i.from)||!t.has(i.to))throw new Error(`Sequence message ${a} references an unknown participant.`);if(i.style!==void 0&&!dr.includes(i.style))throw new Error(`Unsupported sequence message style: ${i.style}`)}for(let[a,i]of(r.activations||[]).entries()){if(K(i,cr,`activation ${a}`),!i.participant||!Number.isInteger(i.from)||!Number.isInteger(i.to))throw new Error(`Sequence activation ${a} requires participant and integer from and to message positions.`);if(!t.has(i.participant))throw new Error(`Sequence activation ${a} references an unknown participant.`);if(i.from<1||i.to<i.from||i.to>r.messages.length)throw new Error(`Sequence activation ${a} range is out of bounds.`)}for(let[a,i]of(r.notes||[]).entries()){K(i,lr,`note ${a}`);let s=i.after;if(!i.at||!Number.isInteger(s)||!i.label)throw new Error(`Sequence note ${a} requires at, after, and label.`);if(Pt(i,`note ${a}`,e),!t.has(i.at))throw new Error(`Sequence note ${a} references an unknown participant.`);if(s<0||s>r.messages.length)throw new Error(`Sequence note ${a} after position is out of bounds.`)}for(let[a,i]of(r.groups||[]).entries()){if(K(i,ur,`group ${a}`),!i.label&&i.label!=="")throw new Error(`Sequence group ${a} requires a label.`);if(!Number.isInteger(i.from)||!Number.isInteger(i.to))throw new Error(`Sequence group ${a} requires integer from and to indices.`);if(i.from<1||i.to<i.from||i.to>r.messages.length)throw new Error(`Sequence group ${a} range is out of bounds.`)}let o=r.theme||"light";if(!te[o])throw new Error(`Unsupported diagram theme: ${o}`)}function Pt(r,e,t="classic"){if(r.palette&&(K(r.palette,It,`palette for ${e}`),!Y[t]?.[String(r.palette.colour)]?.[String(r.palette.tone)]))throw new Error(`Unsupported ${e} palette: ${String(r.palette.tone||"unknown")} ${String(r.palette.colour||"unknown")}`);if(ft(r.style,zt,e),r.size){K(r.size,["width","height"],`size for ${e}`);for(let o of["width","height"]){let n=r.size[o];if(n!==void 0&&(!Number.isFinite(n)||Number(n)<=0))throw new Error(`${e} size.${o} must be a positive number.`)}}}function Ne(r){return typeof r=="number"||typeof r=="boolean"?String(r):r&&typeof r=="object"?Object.keys(r).length?`{ ${Object.entries(r).map(([e,t])=>`${e}: ${Ne(t)}`).join(", ")} }`:"{}":/^[\w./-]+(?: [\w./-]+)*$/.test(String(r))?String(r):JSON.stringify(String(r))}function ie(r,e=2){let t=Object.entries(r),[o,n]=t[0],a=[`${" ".repeat(e)}- ${o}: ${Ne(n)}`];for(let[i,s]of t.slice(1))if(!(i==="children"&&Array.isArray(s)&&!s.length))if(i==="children"&&Array.isArray(s)){a.push(`${" ".repeat(e+2)}children:`);for(let d of s)a.push(...ie(d,e+4))}else a.push(`${" ".repeat(e+2)}${i}: ${Ne(s)}`);return a}function Xe(r){let e=[`type: ${Ne(r.type)}`];for(let[t,o]of Object.entries(r))t==="type"||t==="canvas"||t==="nodes"||t==="edges"||t==="participants"||t==="messages"||t==="activations"||t==="notes"||t==="groups"||e.push(`${t}: ${Ne(o)}`);if(r.type==="sequence"){e.push("participants:");for(let t of r.participants||[])e.push(...ie(t));e.push("messages:");for(let t of r.messages||[])e.push(...ie(t));if(r.activations!==void 0){e.push("activations:");for(let t of r.activations||[])e.push(...ie(t))}if(r.notes!==void 0){e.push("notes:");for(let t of r.notes||[])e.push(...ie(t))}if(r.groups!==void 0){e.push("groups:");for(let t of r.groups||[])e.push(...ie(t))}return e.join(`
`)}e.push("canvas:");for(let[t,o]of Object.entries(r.canvas||{}))e.push(`  ${t}: ${Ne(o)}`);e.push("nodes:");for(let t of r.nodes||[])e.push(...ie(t));e.push("edges:");for(let t of r.edges||[])e.push(...ie(t));return e.join(`
`)}function Rt(r){return{width:Number(r.size?.width)||A.width,height:Number(r.size?.height)||A.height}}function V(r){let e=[],t=(o,n,a,i)=>{for(let s of o){let d={x:a.x+(Number(s.position?.x)||0),y:a.y+(Number(s.position?.y)||0)};e.push({node:s,parent:n,siblings:o,position:d,depth:i}),t(s.children||[],s,d,i+1)}};return t(r.nodes,null,{x:0,y:0},0),e}function j(r,e){return V(r).find(t=>t.node.id===e)||null}function fr(r,e){return V(r).find(t=>t.node===e)?.position||{x:0,y:0}}function W(r,e){return{...fr(r,e),...Rt(e)}}function jt(r,e){return(e.children||[]).some(t=>t===r||jt(r,t))}function Ze(r,e){var h;let t=j(r,e);if(!t)return null;let{node:o,siblings:n,position:a}=t,{width:i,height:s}=Rt(o),d={x:a.x+i/2,y:a.y+s/2},u=V(r).filter(m=>m.node!==o&&!jt(m.node,o)).filter(m=>{let g=W(r,m.node);return d.x>=g.x&&d.x<=g.x+g.width&&d.y>=g.y&&d.y<=g.y+g.height}).reduce((m,g)=>!m||g.depth>=m.depth?g:m,null),c=u?(h=u.node).children||(h.children=[]):r.nodes;return n===c||(n.splice(n.indexOf(o),1),o.position={x:a.x-(u?.position.x||0),y:a.y-(u?.position.y||0)},c.push(o)),o}function ge(r,e="light"){let t=r.theme||e,o=te[t];if(!o)throw new Error(`Unsupported diagram theme: ${t}`);return o}function De(r,e,t){return Y[r]?.[t]?.[e]||null}function me(r,e){return{...r,...e||{}}}function ae(r,e,t="light",o="classic"){let a=ge(r,t).node,i=e.palette?De(o,e.palette.tone,e.palette.colour):null;return me(me(a,i),e.style)}function Me(r,e,t="light",o="classic"){let n=ge(r,t),a=e.palette?De(o,e.palette.tone,e.palette.colour):null;return me(me(n.node,a),e.style)}function Fe(r,e,t="light"){let o=ge(r,t);return me(o.edge,e.style)}function Re(r,e){let t=e==="start"?r.start:r.end;return typeof t=="string"&&U.includes(t)?t:Ie[e]}function J(r){let e=Number(r.canvas?.grid);return Number.isFinite(e)&&e>0?e:0}function re(r,e){return e?Math.round(r/e)*e:Math.round(r)}function he(r,e,t){let o=re(r,t),n=t?Math.ceil(e/t)*t:e;return Math.max(n,o)}function Bt(r){return{x:Number(r.position?.x)||0,y:Number(r.position?.y)||0,width:Number(r.size?.width)||A.width,height:Number(r.size?.height)||A.height}}function je(r,e,t=40){let o=Number(r.canvas?.width)||1e3,n=Number(r.canvas?.height)||560,a=new Set(V(r).map(g=>g.node)),i=[...a];i.includes(e)||i.push(e);let s=g=>a.has(g)?W(r,g):Bt(g),d=i.map(s),l=Math.min(0,...d.map(g=>g.x)),u=Math.min(0,...d.map(g=>g.y)),c=l<0?t-l:0,h=u<0?t-u:0;if(c||h)for(let g of V(r).filter(p=>p.parent===null)){let p=g.node;p.position={...p.position,x:(Number(p.position?.x)||0)+c,y:(Number(p.position?.y)||0)+h}}let m=i.map(s);return r.canvas={...r.canvas,width:Math.max(o+c,...m.map(g=>g.x+g.width+t)),height:Math.max(n+h,...m.map(g=>g.y+g.height+t))},r}function br(r,e){return r.x<e.x+e.width&&r.x+r.width>e.x&&r.y<e.y+e.height&&r.y+r.height>e.y}function bt(r,e="new-node"){let t=a=>a.flatMap(i=>[i.id,...t(i.children||[])]),o=new Set(t(r));if(!o.has(e))return e;let n=2;for(;o.has(`${e}-${n}`);)n+=1;return`${e}-${n}`}function xt(r){let e=Number(r.canvas?.width)||1e3,t=Number(r.canvas?.height)||560,o=J(r),n={x:re(Math.max(0,(e-A.width)/2),o),y:re(Math.max(0,(t-A.height)/2),o)},a=o||20;for(let i=0;i<=Math.max(e,t);i+=a)for(let s of[{x:n.x+i,y:n.y},{x:n.x-i,y:n.y},{x:n.x,y:n.y+i},{x:n.x,y:n.y-i}])if(!(s.x<0||s.y<0||s.x+A.width>e||s.y+A.height>t)&&!V(r).some(({node:d})=>br({...s,width:A.width,height:A.height},Bt(d))))return s;return n}function yt(r){let e={id:bt(r.nodes),label:A.label,shape:A.shape,position:xt(r),size:{width:A.width,height:A.height}};return r.nodes.push(e),e}function Ke(r,e,t,o,n){let a={source:e,target:o,sourceAnchor:t,targetAnchor:n,route:"orthogonal",end:"arrow"};return r.edges.push(a),a}function Je(r,e,t,o){return e==="source"?(r.source=t,r.sourceAnchor=o):(r.target=t,r.targetAnchor=o),r}function Qe(r,e){return e<0||e>=r.edges.length?null:r.edges.splice(e,1)[0]}function et(r,e){let t=j(r,e);if(!t)return{node:null,deletedEdges:[]};let o=new Set([t.node,...t.node.children||[]].flatMap(function a(i){return[i,...(i.children||[]).flatMap(a)]}).map(a=>a.id)),n=r.edges.filter(a=>o.has(a.source)||o.has(a.target));return t.siblings.splice(t.siblings.indexOf(t.node),1),r.edges=r.edges.filter(a=>!o.has(a.source)&&!o.has(a.target)),{node:e,deletedEdges:n}}function Te(r,e){return r.label=String(e).trim()||r.label,r}function tt(r,e){return r.shape=e,r}function rt(r,e){return r.subtitle=String(e??"").trim(),r}function pe(r,e,t){return r.style={...r.style,[e]:t},r}function Be(r,e,t,o="classic"){if(!De(o,e,t))return r;let{fill:a,stroke:i,text:s,...d}=r.style||{};return Object.keys(d).length?r.style=d:delete r.style,r.palette={tone:e,colour:t},r}function xr(r){return r==="document"?pt:ke}function He(r,e,t,o){let n=J(r),a=xr(e.shape),i=t==="width"?a.width:a.height,s=he(Number(o)||i,i,n);return e.size=e.shape==="circle"?{...e.size,width:s,height:s}:{...e.size,[t]:s},e}function qe(r,e){return r.label=String(e).trim(),r}function ot(r,e){return r.route=e,r}function Oe(r,e,t){return e==="source"?r.sourceAnchor=t:r.targetAnchor=t,r}function Ge(r,e,t){return r.style={...r.style,[e]:t},r}function Ue(r,e){let t=Math.max(1,Math.round(Number(e))||1);return r.style={...r.style,strokeWidth:t},r}function nt(r,e){return r.start=U.includes(e)?e:Ie.start,r}function it(r,e){return r.end=U.includes(e)?e:Ie.end,r}function wt(r){return Math.min(200,Math.max(25,Number(r)||100))}function oe(r){return String(r??"").replace(/\r\n/g,`
`).split(`
`)}function Q(r,e,t,o,n,a){if(!t.length)return"";let i=t.map((s,d)=>{let l=d===0?"":` dy="${o}"`;return`<tspan x="${r}"${l}>${x(s)||" "}</tspan>`}).join("");return`<text x="${r}" y="${e}" text-anchor="middle" class="${n}" fill="${x(a)}">${i}</text>`}function ne(r,e,t,o,n){let a=r.shape,i=e+o/2,s=t+n/2,d={x:e+12,y:t+12,width:o-24,height:n-24},l={top:{x:i,y:t},right:{x:e+o,y:s},bottom:{x:i,y:t+n},left:{x:e,y:s}},u;if(a==="circle"){let c=Math.min(o,n),h=i-c/2,m=s-c/2,g=c/2;d.x=h+g*.3,d.y=m+g*.3,d.width=g*1.4,d.height=g*1.4,l.top.y=m,l.right.x=h+c,l.bottom.y=m+c,l.left.x=h,u=`<circle class="docdiagram-node-body" cx="${i}" cy="${s}" r="${g}"/>`}else if(a==="oval")d.x+=o*.1,d.width-=o*.2,u=`<ellipse class="docdiagram-node-body" cx="${i}" cy="${s}" rx="${o/2}" ry="${n/2}"/>`;else if(a==="database"){let c=Math.min(n*.22,18);d.y+=c/2,d.height-=c,u=`<path class="docdiagram-node-body" d="M ${e} ${t+c} C ${e} ${t-c/3} ${e+o} ${t-c/3} ${e+o} ${t+c} V ${t+n-c} C ${e+o} ${t+n+c/3} ${e} ${t+n+c/3} ${e} ${t+n-c} Z M ${e} ${t+c} C ${e} ${t+c*2.3} ${e+o} ${t+c*2.3} ${e+o} ${t+c}"/>`}else if(a==="diamond")d.x+=o*.25,d.y+=n*.25,d.width-=o*.5,d.height-=n*.5,l.top={x:i,y:t},l.right={x:e+o,y:s},l.bottom={x:i,y:t+n},l.left={x:e,y:s},u=`<polygon class="docdiagram-node-body" points="${i},${t} ${e+o},${s} ${i},${t+n} ${e},${s}"/>`;else if(a==="rhombus"){let c=Math.min(o*.2,n*.6);d.x+=c,d.width-=c*2,l.left.x=e+c/2,l.right.x=e+o-c/2,u=`<polygon class="docdiagram-node-body" points="${e+c},${t} ${e+o},${t} ${e+o-c},${t+n} ${e},${t+n}"/>`}else if(a==="flattened-hexagon"){let c=Math.min(o*.18,n*.7);d.x+=c,d.width-=c*2,u=`<polygon class="docdiagram-node-body" points="${e+c},${t} ${e+o-c},${t} ${e+o},${s} ${e+o-c},${t+n} ${e+c},${t+n} ${e},${s}"/>`}else if(a==="chevron"){let c=Math.min(o*.16,n*.45);d.x+=c*1.175,d.width-=c*1.35,l.left.x=e+c,u=`<polygon class="docdiagram-node-body" points="${e},${t} ${e+o-c},${t} ${e+o},${s} ${e+o-c},${t+n} ${e},${t+n} ${e+c},${s}"/>`}else if(a==="right-chevron"){let c=Math.min(o*.16,n*.45);d.width-=c,u=`<polygon class="docdiagram-node-body" points="${e},${t} ${e+o-c},${t} ${e+o},${s} ${e+o-c},${t+n} ${e},${t+n}"/>`}else if(a==="document"){let c=Math.max(12,Math.min(26,Math.min(o,n)*.18));d.width-=c*.45,d.y+=2,d.height-=2,u=`<path class="docdiagram-node-body" d="M ${e} ${t} H ${e+o-c} L ${e+o} ${t+c} V ${t+n} H ${e} Z M ${e+o-c} ${t} V ${t+c} H ${e+o}"/>`}else u=`<rect class="docdiagram-node-body" x="${e}" y="${t}" width="${o}" height="${n}" rx="12"/>`;return{bodyMarkup:u,textBounds:d,anchors:l}}function Le(r,e,t,o,n){let a,i;typeof r=="number"?(a={x:r,y:e,width:t||0,height:o||0},i=n):(a=r,i=e);let s=20,d=15,l=oe(i.label),u=i.subtitle?oe(i.subtitle):[],c=u.length?6:0,h=l.length*s,m=u.length*d,g=h+c+m,p=a.x+a.width/2,y=a.y+a.height/2-g/2;return{centerX:p,labelLines:l,subtitleLines:u,labelLineHeight:s,subtitleLineHeight:d,labelStartY:y+s*.72,subtitleStartY:y+h+c+d*.72}}function Ce(r,e,t){return r.bodyMarkup.replace("/>",` fill="${x(e.fill||"")}" stroke="${x(e.stroke||"")}" stroke-width="${t}"/>`)}function Ht(r){return{top:{x:0,y:-1},right:{x:1,y:0},bottom:{x:0,y:1},left:{x:-1,y:0}}[r]}function se(r){return`${r.x} ${r.y}`}function yr(r){let e=r.slice(1).map((n,a)=>{let i=r[a];return{start:i,end:n,length:Math.hypot(n.x-i.x,n.y-i.y)}}),o=e.reduce((n,a)=>n+a.length,0)/2;for(let n of e){if(o<=n.length||n===e[e.length-1]){let a=n.length?o/n.length:0;return{x:n.start.x+(n.end.x-n.start.x)*a,y:n.start.y+(n.end.y-n.start.y)*a}}o-=n.length}return r[0]}function fe(r,e,t,o,n="orthogonal"){let a=Ht(t),i=Ht(o),s=a.x!==0,d,l,u,c;if(n==="straight")d=`M ${se(r)} L ${se(e)}`,l={x:(r.x+e.x)/2,y:(r.y+e.y)/2},u={x:e.x-r.x,y:e.y-r.y},c=u;else if(n==="curved"){let h=Math.max(Math.abs(e.x-r.x),Math.abs(e.y-r.y),80),m=Math.min(h/2,140),g={x:r.x+a.x*m,y:r.y+a.y*m},p={x:e.x+i.x*m,y:e.y+i.y*m};d=`M ${se(r)} C ${se(g)} ${se(p)} ${se(e)}`,l={x:(r.x+3*g.x+3*p.x+e.x)/8,y:(r.y+3*g.y+3*p.y+e.y)/8},u={x:g.x-r.x,y:g.y-r.y},c={x:e.x-p.x,y:e.y-p.y}}else{let m={x:r.x+a.x*40,y:r.y+a.y*40},g={x:e.x+i.x*40,y:e.y+i.y*40},p=s?{x:g.x,y:m.y}:{x:m.x,y:g.y},$=[r,m,p,g,e],y=$.filter((N,b)=>b===0||N.x!==$[b-1].x||N.y!==$[b-1].y);y.length===1&&(y=[r,{x:r.x+a.x*40,y:r.y+a.y*40},e]),d=`M ${se(y[0])}${y.slice(1).map(N=>` L ${se(N)}`).join("")}`,l=yr(y),u={x:y[1].x-y[0].x,y:y[1].y-y[0].y};let k=y.slice(-2);c={x:k[1].x-k[0].x,y:k[1].y-k[0].y}}return{path:d,midpoint:l,startTangent:u,endTangent:c,hitPath:d}}function Et(r){let e=Math.max(1,Number(r)||2),t=6+e*2.5,o=Math.max(t*.38,e/2+1);return{size:t,circleRadius:o}}function Ye(r,e,t,o,n){let a=x(o),{size:i,circleRadius:s}=Et(n),d=i/2;return e==="arrow"?`<marker id="${r}" markerWidth="${i}" markerHeight="${i}" refX="${i}" refY="${d}" markerUnits="userSpaceOnUse" orient="${t==="start"?"auto-start-reverse":"auto"}"><path fill="${a}" stroke="${a}" d="M 0 0 L ${i} ${d} L 0 ${i} z"/></marker>`:e==="circle"?`<marker id="${r}" markerWidth="${i}" markerHeight="${i}" refX="${d}" refY="${d}" markerUnits="userSpaceOnUse"><circle cx="${d}" cy="${d}" r="${s}" fill="${a}" stroke="${a}"/></marker>`:""}function St(r){let e=r.replace(/\r\n/g,`
`).split(`
`),t=e.findIndex(a=>a.trim()!=="");if(t===-1||e[t]!=="---")return{content:r,frontmatter:{}};let o=e.indexOf("---",t+1);if(o===-1)return{content:r,frontmatter:{}};let n={};for(let a of e.slice(t+1,o)){if(!a.trim()||a.trimStart().startsWith("#"))continue;let i=a.match(/^([^:]+):\s*(.*)$/);if(!i)throw new Error(`Cannot parse document frontmatter line: ${a}`);n[i[1]]=ve(i[2])}return{content:e.slice(o+1).join(`
`),frontmatter:n}}function at(r){let e=St(r),t=String(e.frontmatter.theme||"light"),o=String(e.frontmatter.colourScheme||"classic");if(!te[t])throw new Error(`Unsupported document theme: ${t}`);if(!Y[o])throw new Error(`Unsupported document colour scheme: ${o}`);return{...e,theme:t,colourScheme:o}}function $t(r){let e=at(r),t=e.content.replace(/\r\n/g,`
`).split(`
`),o=0;for(;o<t.length;){let a=t[o].replace(/^(?: {0,3}> ?)+/,"").match(/^```([\w-]*)\s*$/);if(!a){o+=1;continue}let i=t.slice(o+1).findIndex(d=>/^```\s*$/.test(d.replace(/^(?: {0,3}> ?)+/,"")));if(i===-1)throw new Error("Unclosed code block.");let s=o+i+1;if(a[1]==="diagram"){let d=t.slice(o+1,s).map(l=>l.replace(/^(?: {0,3}> ?)+/,"")).join(`
`);ue(d,e.colourScheme)}o=s+1}return e}function kt(r,e){let t=r.replace(/\r\n/g,`
`),o=t.split(`
`),n=o.findIndex(l=>l.trim()!==""),a=n!==-1&&o[n]==="---",i=a?o.indexOf("---",n+1):-1;if(!a||i===-1)return`---
theme: ${e}
---
${t}`;let s=!1,d=o.slice(n+1,i).map(l=>{if(!l.trim()||l.trimStart().startsWith("#"))return l;let u=l.match(/^([^:]+):\s*(.*)$/);return u&&u[1]==="theme"?(s=!0,`theme: ${e}`):l});return s||d.push(`theme: ${e}`),[...o.slice(0,n+1),...d,...o.slice(i)].join(`
`)}function st(r,e){let t=e.trim(),o=t?r.indexOf(t):-1;return o===-1?null:{start:o,end:o+t.length}}function dt(r,e){let t=Number.parseFloat(globalThis.getComputedStyle(r).lineHeight)||20,o=r.value.slice(0,e.start).split(`
`).length-1,n=Math.max(1,Math.floor(r.clientHeight/t));r.scrollTop=Math.max(0,(o-Math.floor(n/2))*t)}function vt(r){let e=[],t="",o=!1,n=r.trim().replace(/^\||\|$/g,"");for(let a of n)o?(t+=a,o=!1):a==="\\"?o=!0:a==="|"?(e.push(t.trim()),t=""):t+=a;return e.push(t.trim()),e}function Ot(r){let e=vt(r);return!e.length||!e.every(t=>/^:?-{3,}:?$/.test(t))?null:e.map(t=>t.startsWith(":")&&t.endsWith(":")?"center":t.startsWith(":")?"left":t.endsWith(":")?"right":"")}function be(r){return r.match(/^(\s*)([-+*]|\d+[.)])\s+(.+)$/)}function Nt(r){let e=r.match(/^:::(section|panel|callout|grid|stack)(?:\s+\{(.*)\})?\s*$/);if(!e)return null;let t={},o=e[2];if(o!==void 0){let n=0,a=/\s*([a-z][\w-]*)=(?:"([^"]*)"|([^\s}]+))/gi,i;for(;i=a.exec(o);){if(i.index!==n||t[i[1]]!==void 0)return null;t[i[1]]=i[2]??i[3],n=a.lastIndex}if(o.slice(n).trim())return null}return{name:e[1],attributes:t}}function wr(r){return/^:::(?:\s+.*)?$/.test(r)}function Er(r,e,t){let o=1,n=!1;for(let a=e+1;a<t;a+=1){if(/^```/.test(r[a])){n=!n;continue}if(!n){if(Nt(r[a]))o+=1;else if(wr(r[a])&&(o-=1,!o))return a}}return-1}function Sr(r){return/^#[\da-f]{3,8}$/i.test(r)}function $r(r,e="classic"){let t=r.tone!==void 0||r.colour!==void 0;if(t&&(!["light","dark"].includes(r.tone)||!Lt.includes(r.colour)))return null;for(let i of["fill","stroke","text"])if(r[i]!==void 0&&!Sr(r[i]))return null;let o=t?De(e,r.tone,r.colour):null,n=Object.fromEntries(["fill","stroke","text"].filter(i=>r[i]!==void 0).map(i=>[i,r[i]])),a=me(o||{},n);return Object.entries(a).filter(([,i])=>i!==void 0).map(([i,s])=>`--docdiagram-component-${i}:${s}`).join(";")}function ct(r,e=!1){let t=String(r).trim();if(t.startsWith("//")||t.startsWith("\\"))return!1;if(!t||t.startsWith("#")||t.startsWith("/")||t.startsWith("./")||t.startsWith("../")||t.startsWith("?")||e&&/^data:image\/(?:gif|jpeg|png|webp);base64,/i.test(t))return!0;let o=t.match(/^([a-z][a-z\d+.-]*):/i);return!o||["http","https","mailto"].includes(o[1].toLowerCase())}function de(r){let e=[],t=String(r).replace(/`([^`]+)`/g,(o,n)=>{let a=`\0${e.length}\0`;return e.push(`<code>${x(n)}</code>`),a});return t=x(t),t=t.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,(o,n,a)=>{let i=a.replace(/&amp;/g,"&");return ct(i,!0)?`<img src="${x(i)}" alt="${n}">`:`![${n}](${x(a)})`}),t=t.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,(o,n,a)=>{let i=a.replace(/&amp;/g,"&");return ct(i)?`<a href="${x(i)}">${n}</a>`:`[${n}](${x(a)})`}),t=t.replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g,"<strong>$2</strong>").replace(/~~(?=\S)([\s\S]*?\S)~~/g,"<del>$1</del>").replace(/(?<!\*)\*(?=\S)([\s\S]*?\S)\*(?!\*)/g,"<em>$1</em>").replace(/(?<!_)_(?=\S)([\s\S]*?\S)_(?!_)/g,"<em>$1</em>"),t.replace(/\u0000(\d+)\u0000/g,(o,n)=>e[Number(n)])}function Dt(r,e={diagramIndex:0},t){let o=r.replace(/\r\n/g,`
`).split(`
`),n=t?.renderDiagram??((u,c)=>{throw new Error("renderDiagram callback is required for diagram blocks.")}),a=t?.documentColorScheme||"classic";function i(u){let c=o[u]||"";return!c.trim()||/^```/.test(c)||/^(#{1,6})\s+/.test(c)||/^ {0,3}&gt;|^ {0,3}>/.test(c)||/^ {0,3}(?:[-*_]\s*){3,}$/.test(c)||/^:::/.test(c)||!!be(c)||u+1<o.length&&!!Ot(o[u+1])}function s(u,c){let h=be(o[u]),m=/^\d/.test(h[2]),g=[],p=u,$=m?Number.parseInt(h[2],10):null;for(;p<o.length;){let b=be(o[p]);if(!b||b[1].length!==c||/^\d/.test(b[2])!==m)break;let w={content:[b[3]],children:[]};for(p+=1;p<o.length;){let v=be(o[p]);if(v&&v[1].length>c){let S=s(p,v[1].length);w.children.push(S.html),p=S.index;continue}if(!o[p].trim()){p+=1;let S=p<o.length?be(o[p]):null;if(p>=o.length||!S||S[1].length<=c)break;continue}if(/^\s+/.test(o[p])&&!be(o[p])){w.content.push(o[p].trim()),p+=1;continue}break}g.push(w)}let y=m?"ol":"ul",k=m&&$!==1?` start="${$}"`:"",N=g.map(b=>{let w=!m&&b.content.length===1&&b.content[0].match(/^\[([ xX])\]\s+(.*)$/),v=w?`<input type="checkbox" disabled${w[1].toLowerCase()==="x"?" checked":""}> ${de(w[2])}`:de(b.content.join(" "));return`<li${w?' class="docdiagram-task-list-item"':""}>${v}${b.children.join("")}</li>`}).join("");return{html:`<${y}${k}>${N}</${y}>`,index:p}}function d(u,c){let h=Nt(o[u]),m=h?Er(o,u,c):-1;if(!h||m===-1)return null;let{name:g,attributes:p}=h,$={section:["title","tone","colour","fill","stroke","text"],panel:["title","tone","colour","fill","stroke","text"],callout:["kind","title","tone","colour","fill","stroke","text"],grid:["columns"],stack:[]};if(Object.keys(p).some(w=>!$[g].includes(w)))return null;if(g==="grid"){let w=At[p.columns];if(!w)return null;let v=[],S=u+1;for(;S<m;){if(!o[S].trim()){S+=1;continue}let F=Nt(o[S]);if(!F||!["panel","callout","stack"].includes(F.name))return null;let B=d(S,m);if(!B)return null;v.push(`<div class="docdiagram-grid-item">${B.html}</div>`),S=B.next}return{html:`<div class="docdiagram-grid" style="--docdiagram-grid-columns:${w}">${v.join("")}</div>`,next:m+1}}if(g==="stack")return Object.keys(p).length?null:{html:`<div class="docdiagram-stack">${l(u+1,m)}</div>`,next:m+1};let y=$r(p,a);if(y===null||g==="callout"&&p.kind!==void 0&&!Ct.includes(p.kind))return null;let k=p.title?`<div class="docdiagram-component-title">${de(p.title)}</div>`:"",N=l(u+1,m),b=`docdiagram-component${g==="callout"?"":` docdiagram-${g}`}${y?" docdiagram-component-styled":""}`;if(g==="callout"){let w=p.kind||"info";return{html:`<aside class="${b} docdiagram-callout docdiagram-callout-${w}"${y?` style="${y}"`:""} aria-label="${x(p.title||w)} callout"><div class="docdiagram-callout-kind">${x(w)}</div>${k}${N}</aside>`,next:m+1}}return{html:`<section class="${b}"${y?` style="${y}"`:""}>${k}${N}</section>`,next:m+1}}function l(u=0,c=o.length){let h=[],m=u;for(;m<c;){let g=o[m];if(!g.trim()){m+=1;continue}if(/^:::/.test(g)){let b=d(m,c);b?(h.push(b.html),m=b.next):(h.push(`<pre class="docdiagram-literal-source"><code>${x(g)}</code></pre>`),m+=1);continue}let p=g.match(/^```([\w-]*)\s*$/);if(p){let b=o.slice(m+1,c).findIndex(S=>/^```\s*$/.test(S));if(b===-1){h.push('<section class="docdiagram-error"><strong>Unclosed code block.</strong></section>');break}let w=m+b+1,v=o.slice(m+1,w).join(`
`);if(p[1]==="diagram")h.push(n(v,e.diagramIndex)),e.diagramIndex+=1;else{let S=p[1]?` class="language-${x(p[1])}"`:"";h.push(`<pre><code${S}>${x(v)}</code></pre>`)}m=w+1;continue}let $=g.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);if($){h.push(`<h${$[1].length}>${de($[2])}</h${$[1].length}>`),m+=1;continue}if(/^ {0,3}(?:[-*_]\s*){3,}$/.test(g)){h.push("<hr>"),m+=1;continue}if(/^ {0,3}>/.test(g)){let b=[];for(;m<c&&/^ {0,3}>/.test(o[m]);)b.push(o[m].replace(/^ {0,3}> ?/,"")),m+=1;h.push(`<blockquote>${Dt(b.join(`
`),e,t)}</blockquote>`);continue}let y=be(g);if(y){let b=s(m,y[1].length);h.push(b.html),m=b.index;continue}let k=m+1<c?Ot(o[m+1]):null;if(k){let b=vt(g),w=[];for(m+=2;m<c&&o[m].includes("|")&&o[m].trim();)w.push(vt(o[m])),m+=1;let v=(S,F)=>F.map((B,L)=>`<${S}${k[L]?` style="text-align:${k[L]}"`:""}>${de(B||"")}</${S}>`).join("");h.push(`<table><thead><tr>${v("th",b)}</tr></thead><tbody>${w.map(S=>`<tr>${v("td",S)}</tr>`).join("")}</tbody></table>`);continue}let N=[g.trim()];for(m+=1;m<c&&!i(m);)N.push(o[m].trim()),m+=1;h.push(`<p>${de(N.join(" "))}</p>`)}return h.join("")}return l()}function Mt(r,e,t){let o=e!=="none",n=e==="flowchart";return['<div class="docdiagram-diagram-toolbar" role="toolbar" aria-label="Diagram controls">',`<button type="button" class="docdiagram-icon-button docdiagram-zoom-in" data-diagram-index="${r}" aria-label="Zoom in" title="Zoom in">+</button>`,`<button type="button" class="docdiagram-icon-button docdiagram-zoom-out" data-diagram-index="${r}" aria-label="Zoom out" title="Zoom out">\u2212</button>`,`<button type="button" class="docdiagram-icon-button docdiagram-fit" data-diagram-index="${r}" aria-label="Zoom to fit" title="Zoom to fit">\u22A1</button>`,o?t.editingDiagramIndex===r?`<button type="button" class="docdiagram-icon-button docdiagram-done-editing" aria-label="Done editing" title="Done editing">\u2713</button><button type="button" class="docdiagram-icon-button docdiagram-cancel-editing" aria-label="Cancel editing and discard changes" title="Cancel editing and discard changes">\xD7</button>${n?`<button type="button" class="docdiagram-icon-button docdiagram-create-node" data-diagram-index="${r}" aria-label="New node" title="New node">+</button>`:""}`:t.editingDiagramIndex===null?'<button type="button" class="docdiagram-icon-button docdiagram-start-editing" aria-label="Edit diagram" title="Edit diagram">\u270E</button>':"":"","</div>"].join("")}function Gt(r,e,t,o){let{selectedNode:n,selectedEdge:a,editingNode:i,editingEdge:s,connectionDrag:d,diagramZooms:l}=t,u=t.editingDiagramIndex===e,c=V(r),h=new Map(c.map(b=>[b.node.id,b])),m=16,g=[],p=[],$=r.edges.map((b,w)=>{let v=h.get(b.source),S=h.get(b.target);if(!v||!S)return"";let F=v.node,B=S.node,L=ne(F,v.position.x,v.position.y,Number(F.size?.width)||190,Number(F.size?.height)||80),T=ne(B,S.position.x,S.position.y,Number(B.size?.width)||190,Number(B.size?.height)||80),H=b.sourceAnchor||"right",we=b.targetAnchor||"left",G=L.anchors[H],P=T.anchors[we],ce=b.route||"orthogonal",ee=fe(G,P,H,we,ce),_e=ee.midpoint.x,We=ee.midpoint.y-10,le=Fe(r,b,t.documentTheme),Ee=a?.diagramIndex===e&&a.edgeIndex===w,gt=Ee&&s?.diagramIndex===e&&s.edgeIndex===w,Pe=(Number(le.strokeWidth)||2)+(Ee?2:0),f=220,E=72,D=b.label?oe(b.label):[],z=D.length*m,C=We-z/2+m*.72,O=Re(b,"start"),q=Re(b,"end"),R=`docdiagram-marker-${e}-${w}-start`,ht=`docdiagram-marker-${e}-${w}-end`;O!=="none"&&g.push(Ye(R,O,"start",le.stroke||"",Pe)),q!=="none"&&g.push(Ye(ht,q,"end",le.stroke||"",Pe)),Ee&&u&&p.push(`<circle class="docdiagram-edge-endpoint" data-diagram-index="${e}" data-edge-index="${w}" data-endpoint="source" cx="${G.x}" cy="${G.y}" r="7"/>`,`<circle class="docdiagram-edge-endpoint" data-diagram-index="${e}" data-edge-index="${w}" data-endpoint="target" cx="${P.x}" cy="${P.y}" r="7"/>`);let Tt=[O!=="none"?` marker-start="url(#${R})"`:"",q!=="none"?` marker-end="url(#${ht})"`:""].join("");return[`<g class="docdiagram-edge-group${Ee?" docdiagram-edge-selected":""}" data-diagram-index="${e}" data-edge-index="${w}">`,`<path class="docdiagram-edge-hit" d="${ee.hitPath}" fill="none" stroke="transparent" stroke-width="16"/>`,`<path class="docdiagram-edge" d="${ee.path}"${Tt} stroke="${x(le.stroke||"")}" stroke-width="${Pe}"/>`,gt?`<foreignObject class="docdiagram-inline-editor-host" x="${_e-f/2}" y="${We-E/2}" width="${f}" height="${E}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-edge" aria-label="Edit edge label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${x(b.label||"")}</textarea></foreignObject>`:D.length?Q(_e,C,D,m,"docdiagram-edge-label",le.text||""):"","</g>"].join("")}).join(""),y=c.map(({node:b,position:w})=>{let v=w.x,S=w.y,F=Number(b.size?.width)||190,B=Number(b.size?.height)||80,L=ae(r,b,t.documentTheme,t.documentColorScheme),T=n?.diagramIndex===e&&n.nodeId===b.id,H=T&&i?.diagramIndex===e&&i.nodeId===b.id,we=(Number(L.strokeWidth)||2)+(T?2:0),G=ne(b,v,S,F,B),P=Le(G.textBounds,b);return[`<g class="docdiagram-node${T?" docdiagram-node-selected":""}" data-diagram-index="${e}" data-node-id="${x(b.id)}">`,Ce(G,L,we),H?`<foreignObject class="docdiagram-inline-editor-host" x="${G.textBounds.x}" y="${G.textBounds.y}" width="${G.textBounds.width}" height="${G.textBounds.height}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-node" aria-label="Edit node label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${x(b.label)}</textarea></foreignObject>`:Q(P.centerX,P.labelStartY,P.labelLines,P.labelLineHeight,"docdiagram-node-label",L.text||""),!H&&P.subtitleLines.length?Q(P.centerX,P.subtitleStartY,P.subtitleLines,P.subtitleLineHeight,"docdiagram-node-subtitle",L.text||""):"",T&&u&&!H?`<rect class="docdiagram-resize-handle" x="${v+F-7}" y="${S+B-7}" width="14" height="14" rx="3"/>`:"",T&&u&&!H?_.map(ce=>{let ee=G.anchors[ce];return`<circle class="docdiagram-connection-port" data-anchor="${ce}" cx="${ee.x}" cy="${ee.y}" r="7" aria-label="${ce} connection port"/>`}).join(""):"","</g>"].join("")}).join(""),k=Number(r.canvas.width)||1e3,N=Number(r.canvas.height)||560;return[`<figure class="docdiagram" data-diagram-index="${e}" data-diagram-type="flowchart" data-editing="${u}">`,o(e,"flowchart",t),`<svg viewBox="0 0 ${k} ${N}" role="img" aria-label="Architecture diagram" data-diagram-index="${e}" style="width: ${l.get(e)||100}%">`,`<defs>${g.join("")}</defs>`,y,$,d?.diagramIndex===e?`<path class="docdiagram-connection-preview${d.invalid?" docdiagram-connection-invalid":""}" d="${fe(d.start,d.current,d.sourceAnchor,d.targetAnchor||d.sourceAnchor,"straight").path}"/>`:"",p.join(""),"</svg>","</figure>"].join("")}function Ut(r,e,t,o){let n=ge(r,t.documentTheme),a=Number(r.canvas?.width)||1e3,i=Number(r.canvas?.height)||560,s=r.participants||[],d=r.messages||[],l=r.activations||[],u=r.notes||[],c=r.groups||[],h=90,m=90,g=28,p=160,$=42,y=74,k=48,N=18,b=56,w=`docdiagram-sequence-arrow-${e}`,v=g+y+12,S=new Map,F=Math.max(0,a-h-m),B=s.length>1?F/(s.length-1):0;s.forEach((f,E)=>{S.set(f.id,s.length===1?h+F/2:h+B*E)});let L=v+40,T=d.map((f,E)=>({...f,index:E,y:L+E*b})),H=u.map(f=>{let E=oe(f.label||""),D=Math.max(k,E.length*16+22,Number(f.size?.height)||0),C=((f.after?T[Number(f.after)-1]:null)?.y||v)+N,O=S.get(f.at||"")||a/2,q=Math.max(160,Number(f.size?.width)||0),R=Math.min(a-q/2-24,Math.max(q/2+24,O));return{...f,lines:E,x:R-q/2,y:C,width:q,height:D}}),we=c.map(f=>T[f.to-1]?.y+34||L),G=Math.max(v+140,H.length?H[H.length-1].y+H[H.length-1].height:0,T.length?T[T.length-1].y+44:L,...we),P=Math.max(i,G+56),ce=P-36,ee=l.map((f,E)=>({participantId:f.participant,depth:l.slice(0,E).filter(D=>D.participant===f.participant&&D.from<=f.from&&D.to>=f.from).length,startY:(T[f.from-1]?.y||L)-10,endY:(T[f.to-1]?.y||L)+18})),_e=s.map(f=>{let E=S.get(f.id)||0,D=Me(r,f,t.documentTheme,t.documentColorScheme),z=Math.max(p,Number(f.size?.width)||0),C=Math.max($,Number(f.size?.height)||0);if(f.kind==="actor"){let O=g+10,q=O+18,R=q+18;return[`<g class="docdiagram-sequence-participant docdiagram-sequence-actor" data-diagram-index="${e}" data-participant-id="${x(f.id)}">`,`<circle cx="${E}" cy="${O}" r="8" fill="none" stroke="${x(D.stroke||"")}" stroke-width="${Number(D.strokeWidth)||2}"/>`,`<path d="M ${E} ${O+8} V ${R} M ${E-14} ${q} H ${E+14} M ${E} ${R} L ${E-12} ${R+18} M ${E} ${R} L ${E+12} ${R+18}" fill="none" stroke="${x(D.stroke||"")}" stroke-width="${Number(D.strokeWidth)||2}" stroke-linecap="round" stroke-linejoin="round"/>`,`<text x="${E}" y="${g+y-4}" text-anchor="middle" class="docdiagram-node-label" fill="${x(D.text||"")}">${x(f.label||"")}</text>`,"</g>"].join("")}return[`<g class="docdiagram-sequence-participant" data-diagram-index="${e}" data-participant-id="${x(f.id)}">`,`<rect x="${E-z/2}" y="${g}" width="${z}" height="${C}" rx="12" fill="${x(D.fill||"")}" stroke="${x(D.stroke||"")}" stroke-width="${Number(D.strokeWidth)||2}"/>`,`<text x="${E}" y="${g+C/2+6}" text-anchor="middle" class="docdiagram-node-label" fill="${x(D.text||"")}">${x(f.label||"")}</text>`,"</g>"].join("")}).join(""),We=s.map(f=>{let E=S.get(f.id)||0;return`<path class="docdiagram-sequence-lifeline" d="M ${E} ${v} L ${E} ${ce}" fill="none" stroke="${x(n.edge.stroke)}" stroke-width="2" stroke-dasharray="8 6"/>`}).join(""),le=c.map(f=>{let E=(T[f.from-1]?.y||L)-24,D=(T[f.to-1]?.y||L)+30,z=Math.min(220,Math.max(110,String(f.label).length*8+28));return['<g class="docdiagram-sequence-group">',`<rect x="42" y="${E}" width="${a-84}" height="${D-E}" rx="12" fill="none" stroke="${x(n.edge.stroke)}" stroke-width="2" stroke-dasharray="10 6" opacity="0.8"/>`,`<rect x="54" y="${E-16}" width="${z}" height="24" rx="6" fill="${x(n.node.fill)}" stroke="${x(n.edge.stroke)}" stroke-width="1.5"/>`,`<text x="${54+z/2}" y="${E+1}" text-anchor="middle" class="docdiagram-edge-label" fill="${x(n.edge.text)}">${x(f.label||"")}</text>`,"</g>"].join("")}).join(""),Ee=H.map((f,E)=>{let z=f.y+18,C=Me(r,f,t.documentTheme,t.documentColorScheme);return[`<g class="docdiagram-sequence-note" data-diagram-index="${e}" data-note-index="${E}">`,`<rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" rx="10" fill="${x(C.fill||"")}" stroke="${x(C.stroke||"")}" stroke-width="${Number(C.strokeWidth)||2}"/>`,Q(f.x+f.width/2,z,f.lines,16,"docdiagram-node-subtitle",C.text||""),"</g>"].join("")}).join(""),gt=ee.map(f=>{let E=S.get(f.participantId)||0,D=f.depth*7,z=12,C=Math.max(20,f.endY-f.startY),O=s.find(R=>R.id===f.participantId),q=O?Me(r,O,t.documentTheme,t.documentColorScheme):n.node;return`<rect class="docdiagram-sequence-activation" x="${E-z/2+D}" y="${f.startY}" width="${z}" height="${C}" rx="4" fill="${x(q.fill||"")}" stroke="${x(q.stroke||"")}" stroke-width="${Number(q.strokeWidth)||2}"/>`}).join(""),Pe=T.map(f=>{let E=S.get(f.from)||0,D=S.get(f.to)||0,z=f.style==="dashed",C=oe(f.label||""),O=C.length*15,q=f.y-12-O/2+11,R=` marker-end="url(#${w})"`;return f.from===f.to?[`<g class="docdiagram-sequence-message" data-diagram-index="${e}" data-message-index="${f.index}">`,`<path d="M ${E} ${f.y} L ${E+48} ${f.y} L ${E+48} ${f.y+28} L ${E} ${f.y+28}" fill="none" stroke="${x(n.edge.stroke)}" stroke-width="2"${R}${z?' stroke-dasharray="8 5"':""}/>`,Q(E+48/2,q,C,15,"docdiagram-edge-label",n.edge.text),"</g>"].join(""):[`<g class="docdiagram-sequence-message" data-diagram-index="${e}" data-message-index="${f.index}">`,`<path d="M ${E} ${f.y} L ${D} ${f.y}" fill="none" stroke="${x(n.edge.stroke)}" stroke-width="2"${R}${z?' stroke-dasharray="8 5"':""}/>`,Q((E+D)/2,q,C,15,"docdiagram-edge-label",n.edge.text),"</g>"].join("")}).join("");return[`<figure class="docdiagram" data-diagram-index="${e}" data-diagram-type="sequence" data-editing="${t.editingDiagramIndex===e}">`,o(e,"sequence",t),`<svg viewBox="0 0 ${a} ${P}" role="img" aria-label="Sequence diagram" data-diagram-index="${e}" style="width: ${t.diagramZooms.get(e)||100}%">`,`<defs>${Ye(w,"arrow","end",n.edge.stroke,2)}</defs>`,le,_e,We,gt,Ee,Pe,"</svg>","</figure>"].join("")}function Yt(r,e,t){try{let o=ue(r,t.colourScheme);return t.onDiagram(e,o),o.type==="sequence"?Ut(o,e,t.state,Mt):Gt(o,e,t.state,Mt)}catch(o){let n=o instanceof Error?o.message:String(o);return`<section class="docdiagram-error"><strong>Diagram could not be rendered.</strong><br>${x(n)}</section>`}}function Vt(){let r=document.createElement("style");r.textContent=`
    html,
    body {
      margin: 0;
      min-height: 100%;
    }
    html[data-docdiagram-theme="light"],
    body[data-docdiagram-theme="light"] {
      background: #ffffff;
      color: #17202a;
    }
    html[data-docdiagram-theme="dark"],
    body[data-docdiagram-theme="dark"] {
      background: #17202a;
      color: #f3f8fc;
    }
    #rendered-document {
      background: var(--docdiagram-background);
      box-sizing: border-box;
      color: var(--docdiagram-text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.55;
      margin: 0 auto;
      max-width: 1100px;
      padding: 2rem;
    }
    #rendered-document[data-format="full-width"] {
      margin: 0;
      max-width: none;
    }
    #rendered-document[data-source-editor-open="true"] {
      padding-bottom: calc(2rem + var(--docdiagram-source-tray-height, 0px));
    }
    #rendered-document pre {
      background: var(--docdiagram-code-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 8px;
      overflow: auto;
      padding: 1rem;
    }
    #rendered-document :not(pre) > code {
      background: var(--docdiagram-code-background);
      border-radius: 4px;
      font-size: .9em;
      padding: .12em .3em;
    }
    #rendered-document blockquote {
      border-left: 4px solid var(--docdiagram-border);
      color: var(--docdiagram-muted);
      margin-left: 0;
      padding-left: 1rem;
    }
    #rendered-document hr {
      border: 0;
      border-top: 1px solid var(--docdiagram-border);
      margin: 2rem 0;
    }
    #rendered-document a {
      color: inherit;
      text-decoration-thickness: .1em;
      text-underline-offset: .15em;
    }
    #rendered-document img {
      height: auto;
      max-width: 100%;
    }
    #rendered-document table {
      border-collapse: collapse;
      display: block;
      max-width: 100%;
      overflow-x: auto;
      white-space: nowrap;
    }
    #rendered-document th,
    #rendered-document td {
      border: 1px solid var(--docdiagram-border);
      padding: .55rem .75rem;
    }
    #rendered-document th {
      background: var(--docdiagram-code-background);
      font-weight: 600;
    }
    #rendered-document .docdiagram-task-list-item {
      list-style: none;
    }
    #rendered-document .docdiagram-task-list-item input {
      accent-color: currentColor;
      margin: 0 .45rem 0 0;
    }
    #rendered-document .docdiagram-component {
      background: var(--docdiagram-component-fill, var(--docdiagram-code-background));
      border: 1px solid var(--docdiagram-component-stroke, var(--docdiagram-border));
      border-radius: 8px;
      color: var(--docdiagram-component-text, var(--docdiagram-text));
      margin: 1rem 0;
      padding: 1rem;
    }
    #rendered-document .docdiagram-section:not(.docdiagram-component-styled) {
      background: transparent;
    }
    #rendered-document .docdiagram-component-title {
      font-size: 1.1em;
      font-weight: 700;
      margin-bottom: .5rem;
    }
    #rendered-document .docdiagram-component > :last-child {
      margin-bottom: 0;
    }
    #rendered-document .docdiagram-component a {
      color: inherit;
    }
    #rendered-document .docdiagram-component :not(pre) > code {
      background: transparent;
      border: 1px solid currentColor;
    }
    #rendered-document .docdiagram-component pre,
    #rendered-document .docdiagram-component th {
      background: transparent;
      border-color: currentColor;
      color: inherit;
    }
    #rendered-document .docdiagram-component blockquote {
      border-color: currentColor;
      color: inherit;
    }
    #rendered-document .docdiagram-callout {
      border-left-width: 4px;
    }
    #rendered-document .docdiagram-callout-kind {
      font-size: .78em;
      font-weight: 700;
      letter-spacing: .06em;
      margin-bottom: .35rem;
      text-transform: uppercase;
    }
    #rendered-document .docdiagram-grid {
      display: grid;
      gap: 1rem;
      grid-template-columns: var(--docdiagram-grid-columns);
      margin: 1rem 0;
    }
    #rendered-document .docdiagram-grid-item > .docdiagram-component,
    #rendered-document .docdiagram-grid-item > .docdiagram-stack {
      margin: 0;
    }
    #rendered-document .docdiagram-grid-item > .docdiagram-component {
      box-sizing: border-box;
      height: 100%;
    }
    #rendered-document .docdiagram-stack {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    #rendered-document .docdiagram-stack > * {
      margin: 0;
    }
    #rendered-document .docdiagram-literal-source {
      margin: 1rem 0;
    }
    @media (max-width: 700px) {
      #rendered-document .docdiagram-grid {
        grid-template-columns: 1fr;
      }
    }
    #rendered-document[data-theme="light"],
    .docdiagram-toolbar[data-theme="light"],
    .docdiagram-source-tray[data-theme="light"] {
      --docdiagram-background: #ffffff;
      --docdiagram-border: #dce3ea;
      --docdiagram-control-background: #ffffff;
      --docdiagram-control-hover: #eef4f8;
      --docdiagram-code-background: #f5f8fa;
      --docdiagram-text: #17202a;
      --docdiagram-muted: #52616b;
    }
    #rendered-document[data-theme="dark"],
    .docdiagram-toolbar[data-theme="dark"],
    .docdiagram-source-tray[data-theme="dark"] {
      --docdiagram-background: #17202a;
      --docdiagram-border: #3b5263;
      --docdiagram-control-background: #263947;
      --docdiagram-control-hover: #344c5d;
      --docdiagram-code-background: #101a22;
      --docdiagram-text: #f3f8fc;
      --docdiagram-muted: #c5d5e5;
    }
    .docdiagram-toolbar {
      align-items: center;
      background: var(--docdiagram-background);
      color: var(--docdiagram-text);
      display: flex;
      justify-content: flex-end;
      margin: 0;
      max-width: 1100px;
      padding: .5rem 2rem;
      position: fixed;
      right: 0;
      top: 0;
      z-index: 40;
    }
    .docdiagram-toolbar[data-format="full-width"] {
      margin-left: 0;
      margin-right: 0;
      max-width: none;
    }
    .docdiagram-toolbar button,
    .docdiagram-toolbar input,
    .docdiagram-toolbar select {
      background: var(--docdiagram-control-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 6px;
      color: var(--docdiagram-text);
      font: inherit;
      padding: .45rem .65rem;
    }
    .docdiagram-toolbar button {
      cursor: pointer;
    }
    .docdiagram-toolbar button:hover {
      background: var(--docdiagram-control-hover);
    }
    .docdiagram-toolbar button:disabled {
      cursor: not-allowed;
      opacity: .6;
    }
    .docdiagram-menu {
      background: var(--docdiagram-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgb(21 41 62 / 18%);
      display: flex;
      flex-direction: column;
      gap: .6rem;
      padding: .75rem;
      position: absolute;
      right: 2rem;
      top: calc(100% + .25rem);
      z-index: 20;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 1rem;
    }
    .docdiagram-menu[hidden] {
      display: none;
    }
    .docdiagram-source-tray {
      background: var(--docdiagram-background);
      border: 1px solid var(--docdiagram-border);
      border-bottom: 0;
      box-shadow: 0 -4px 16px rgb(21 41 62 / 20%);
      box-sizing: border-box;
      color: var(--docdiagram-text);
      display: flex;
      flex-direction: column;
      height: min(42vh, 32rem);
      min-height: 12rem;
      padding: .75rem 1rem 1rem;
      position: fixed;
      resize: vertical;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 40;
      font-family: Arial, Helvetica, sans-serif;
    }
    .docdiagram-source-header {
      align-items: center;
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      margin-bottom: .5rem;
    }
    .docdiagram-source-shortcut {
      color: var(--docdiagram-muted);
      font-size: .8rem;
      margin-left: .75rem;
    }
    .docdiagram-source-close {
      background: var(--docdiagram-control-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 6px;
      color: var(--docdiagram-text);
      cursor: pointer;
      font: inherit;
      padding: .35rem .55rem;
    }
    .docdiagram-source-label {
      display: flex;
      flex: 1;
      flex-direction: column;
      font-size: .85rem;
      gap: .35rem;
      min-height: 0;
    }
    .docdiagram-source-editor {
      background: var(--docdiagram-code-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 6px;
      box-sizing: border-box;
      color: var(--docdiagram-text);
      flex: 1;
      font: .85rem/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      min-height: 0;
      padding: .65rem;
      resize: none;
      width: 100%;
    }
    .docdiagram-source-status,
    .docdiagram-source-error {
      font-size: .8rem;
      margin: .45rem 0 0;
    }
    .docdiagram-source-status {
      color: var(--docdiagram-muted);
    }
    .docdiagram-source-error {
      color: #c2410c;
    }
    .docdiagram-theme-control {
      align-items: center;
      color: var(--docdiagram-muted);
      display: flex;
      font-size: .9rem;
      gap: .75rem;
      justify-content: space-between;
    }
    .docdiagram-inspector {
      background: var(--docdiagram-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgb(21 41 62 / 18%);
      display: flex;
      flex-direction: column;
      gap: .6rem;
      max-height: calc(100vh - 5.5rem);
      overflow-y: auto;
      padding: 1rem;
      position: fixed;
      right: 1rem;
      top: 1rem;
      width: min(19rem, calc(100vw - 2rem));
      z-index: 30;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 1rem;
    }
    .docdiagram-field {
      align-items: center;
      color: var(--docdiagram-muted);
      display: flex;
      flex-direction: row;
      font-size: .9rem;
      gap: .75rem;
      justify-content: space-between;
      width: 100%;
    }
    .docdiagram-field-wide {
      width: 100%;
    }
    .docdiagram-field input,
    .docdiagram-field select,
    .docdiagram-field textarea {
      background: var(--docdiagram-control-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 6px;
      color: var(--docdiagram-text);
      font-size: .85rem;
      padding: .3rem .4rem;
    }
    .docdiagram-field select,
    .docdiagram-field input:not([type="color"]) {
      min-width: 9rem;
    }
    .docdiagram-field input[type="color"] {
      height: 1.9rem;
      padding: 2px;
      width: 2.6rem;
    }
    .docdiagram-field input[type="number"] {
      width: 4.6rem;
    }
    .docdiagram-inspector-textarea {
      box-sizing: border-box;
      font-family: inherit;
      min-height: 2.4rem;
      resize: vertical;
      width: 100%;
    }
    .docdiagram {
      background: var(--docdiagram-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 12px;
      box-shadow: 0 2px 8px rgb(21 41 62 / 8%);
      margin: 1.5rem 0;
      height: min(70vh, 42rem);
      overflow: auto;
      padding: 1rem;
      position: relative;
    }
    .docdiagram-panning svg {
      cursor: grabbing;
    }
    .docdiagram-diagram-toolbar {
      display: flex;
      gap: .35rem;
      justify-content: flex-end;
      margin-bottom: .5rem;
      box-sizing: border-box;
      left: 0;
      position: sticky;
      right: 0;
      top: 0;
      width: 100%;
      z-index: 10;
    }
    .docdiagram-icon-button {
      background: var(--docdiagram-control-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 6px;
      color: var(--docdiagram-text);
      cursor: pointer;
      font: inherit;
      height: 2rem;
      padding: 0;
      width: 2rem;
    }
    .docdiagram-icon-button:hover {
      background: var(--docdiagram-control-hover);
    }
    .docdiagram svg {
      display: block;
    }
    .docdiagram-edge {
      fill: none;
    }
    .docdiagram-edge-hit {
      fill: none;
    }
    .docdiagram-edge-group {
      cursor: default;
    }
    .docdiagram[data-editing="true"] .docdiagram-edge-group {
      cursor: pointer;
    }
    .docdiagram[data-editing="true"] .docdiagram-edge-group:has(.docdiagram-inline-editor) {
      cursor: text;
    }
    .docdiagram-edge-selected .docdiagram-edge {
      filter: drop-shadow(0 0 4px rgb(39 117 197 / 65%));
    }
    .docdiagram-edge-label {
      filter: drop-shadow(0 0 4px var(--docdiagram-background));
      font-size: 15px;
    }
    .docdiagram-node-selected .docdiagram-node-body {
      filter: drop-shadow(0 0 4px rgb(39 117 197 / 65%));
    }
    .docdiagram-resize-handle {
      cursor: nwse-resize;
      fill: #ffffff;
      stroke: #3574c7;
      stroke-width: 2;
    }
    .docdiagram-connection-port,
    .docdiagram-edge-endpoint {
      cursor: crosshair;
      fill: #ffffff;
      stroke: #3574c7;
      stroke-width: 2;
    }
    .docdiagram-connection-target-port {
      fill: #eaf2ff;
    }
    .docdiagram-connection-preview {
      fill: none;
      pointer-events: none;
      stroke: #3574c7;
      stroke-dasharray: 6 4;
      stroke-width: 2;
    }
    .docdiagram-connection-preview.docdiagram-connection-invalid {
      stroke: #d53f3f;
    }
    .docdiagram-node {
      cursor: default;
    }
    .docdiagram[data-editing="true"] .docdiagram-node {
      cursor: grab;
    }
    #rendered-document .docdiagram svg {
      cursor: grab;
    }
    .docdiagram[data-editing="true"] .docdiagram-node:has(.docdiagram-inline-editor) {
      cursor: text;
    }
    .docdiagram-node-label {
      font-size: 16px;
      font-weight: 650;
    }
    .docdiagram-node-subtitle {
      font-size: 13px;
    }
    .docdiagram-inline-editor {
      box-sizing: border-box;
      border: 1px solid #3574c7;
      border-radius: 4px;
      font: 650 16px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      padding: 4px 6px;
      resize: none;
      text-align: center;
      width: 100%;
    }
    .docdiagram-inline-editor-node {
      height: 100%;
    }
    .docdiagram-inline-editor-edge {
      font-size: 14px;
      font-weight: 500;
      height: 100%;
    }
    .docdiagram-error {
      background: #fff0f0;
      border: 1px solid #d53f3f;
      border-radius: 8px;
      color: #8b1c1c;
      margin: 1rem 0;
      padding: 1rem;
    }
  `,document.head.append(r)}function _t(){return{diagramModels:[],editingDiagramIndex:null,selectedNode:null,selectedEdge:null,selectedSequenceElement:null,editingNode:null,editingEdge:null,connectionDrag:null,documentTheme:"light",documentColorScheme:"classic",documentFormat:"centered",savedSource:"",editSessionDiagram:null,diagramZooms:new Map}}function Ae(r){r.selectedNode=null,r.selectedEdge=null,r.selectedSequenceElement=null,r.editingNode=null,r.editingEdge=null}function xe(r,e){return r.editingDiagramIndex===e}function X(r,e){return r.target instanceof Element?r.target.closest(e):null}function Z(r,e){let t=r.diagramModels[e];return t?.type==="flowchart"?t:null}function I(r){return Number(r)}var lt=class{constructor(e){this.host=e}enableCanvasPanning(){for(let e of this.host.outputElement.querySelectorAll(".docdiagram svg"))e.addEventListener("pointerdown",t=>{t.target===e&&this.beginCanvasPan(e,t)})}enableSequenceSelection(){for(let e of this.host.outputElement.querySelectorAll('.docdiagram[data-diagram-type="sequence"] svg'))e.addEventListener("click",t=>{if(!xe(this.host.state,I(e.dataset.diagramIndex)))return;let o=X(t,".docdiagram-sequence-participant"),n=X(t,".docdiagram-sequence-note"),a=X(t,".docdiagram-sequence-message");o?this.host.state.selectedSequenceElement={diagramIndex:I(o.getAttribute("data-diagram-index")||void 0),kind:"participant",id:o.getAttribute("data-participant-id")||""}:n?this.host.state.selectedSequenceElement={diagramIndex:I(n.getAttribute("data-diagram-index")||void 0),kind:"note",index:I(n.getAttribute("data-note-index")||void 0)}:a?this.host.state.selectedSequenceElement={diagramIndex:I(a.getAttribute("data-diagram-index")||void 0),kind:"message",index:I(a.getAttribute("data-message-index")||void 0)}:this.host.state.selectedSequenceElement=null,this.host.state.selectedNode=null,this.host.state.selectedEdge=null,this.host.renderDocument()})}enableEditing(){for(let e of this.host.outputElement.querySelectorAll(".docdiagram svg"))xe(this.host.state,I(e.dataset.diagramIndex))&&(e.addEventListener("click",t=>this.handleDiagramClick(e,t)),e.addEventListener("pointerdown",t=>this.handleDiagramPointerDown(e,t)));for(let e of this.host.outputElement.querySelectorAll(".docdiagram-inline-editor"))this.wireInlineEditor(e);this.host.outputElement.dataset.deleteShortcutBound||(this.host.outputElement.dataset.deleteShortcutBound="true",document.addEventListener("keydown",e=>{this.host.state.editingDiagramIndex===null||e.key!=="Delete"&&e.key!=="Backspace"||e.target instanceof Element&&e.target.matches("input, textarea, select, [contenteditable]")||(this.host.state.selectedNode||this.host.state.selectedEdge)&&(e.preventDefault(),this.deleteSelected())}))}selectNode(e,t){this.host.state.selectedNode={diagramIndex:e,nodeId:t},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}selectEdge(e,t){this.host.state.selectedEdge={diagramIndex:e,edgeIndex:t},this.host.state.selectedNode=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}handleDiagramClick(e,t){if(X(t,".docdiagram-inline-editor"))return;let o=X(t,".docdiagram-node");if(o){this.selectNode(I(o.getAttribute("data-diagram-index")||void 0),o.getAttribute("data-node-id")||"");return}let n=X(t,".docdiagram-edge-group");if(n){let a=I(n.getAttribute("data-diagram-index")||void 0),i=I(n.getAttribute("data-edge-index")||void 0),s=this.host.state.selectedEdge?.diagramIndex===a&&this.host.state.selectedEdge.edgeIndex===i,d=this.host.state.editingEdge?.diagramIndex===a&&this.host.state.editingEdge.edgeIndex===i;s&&!d?(this.host.state.editingEdge={diagramIndex:a,edgeIndex:i},this.host.renderDocument()):this.selectEdge(a,i);return}(this.host.state.selectedNode||this.host.state.selectedEdge)&&this.clearSelection()}handleDiagramPointerDown(e,t){let o=X(t,".docdiagram-connection-port");if(o){let y=o.closest(".docdiagram-node"),k=I(y?.getAttribute("data-diagram-index")||e.dataset.diagramIndex),N=o.getAttribute("data-node-id")||y?.getAttribute("data-node-id")||"",b=Z(this.host.state,k),w=b?j(b,N)?.node:null,v=o.getAttribute("data-anchor")||"";w&&this.beginConnectionDrag(e,t,{diagramIndex:k,sourceNodeId:N,sourceAnchor:v,start:this.getNodePortPoint(w,v),current:this.getNodePortPoint(w,v),invalid:!1});return}let n=X(t,".docdiagram-edge-endpoint");if(n){let y=I(n.getAttribute("data-diagram-index")||void 0),k=I(n.getAttribute("data-edge-index")||void 0),N=Z(this.host.state,y),b=N?.edges[k],w=n.getAttribute("data-endpoint");if(!b||w!=="source"&&w!=="target")return;let v=w==="source"?b.source:b.target,S=w==="source"?b.sourceAnchor:b.targetAnchor,F=N?j(N,v)?.node:null;if(!F||!S)return;this.beginConnectionDrag(e,t,{diagramIndex:y,edgeIndex:k,endpoint:w,reconnect:!0,sourceNodeId:v,sourceAnchor:S,start:this.getNodePortPoint(F,S),current:this.getNodePortPoint(F,S),invalid:!1});return}let a=X(t,".docdiagram-resize-handle");if(a){let y=a.closest(".docdiagram-node");y&&this.resizeNode(e,t,y);return}if(X(t,".docdiagram-inline-editor"))return;let i=X(t,".docdiagram-node");if(!i)return;let s=I(i.getAttribute("data-diagram-index")||void 0),d=i.getAttribute("data-node-id")||"",l=Z(this.host.state,s),u=l?j(l,d)?.node:null;if(!l||!u)return;t.preventDefault();let c=this.svgPoint(e,t),h=W(l,u),m=J(l),g=!1;this.capturePointer(e,t);let p=y=>{let k=this.svgPoint(e,y),N=re(h.x+k.x-c.x,m),b=re(h.y+k.y-c.y,m);g=g||N!==h.x||b!==h.y,i.setAttribute("transform",`translate(${N-h.x} ${b-h.y})`);let w=j(l,d);u.position={...u.position,x:N-(w?.parent?W(l,w.parent).x:0),y:b-(w?.parent?W(l,w.parent).y:0)}},$=y=>{this.releasePointer(e,y),e.removeEventListener("pointermove",p),e.removeEventListener("pointerup",$),e.removeEventListener("pointercancel",$),g?(Ze(l,d),je(l,u),this.host.state.selectedNode={diagramIndex:s,nodeId:d},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.persistDiagramModels(),this.host.renderDocument()):this.host.state.selectedNode?.diagramIndex===s&&this.host.state.selectedNode.nodeId===d?(this.host.state.editingNode={diagramIndex:s,nodeId:d},this.host.renderDocument()):this.selectNode(s,d)};e.addEventListener("pointermove",p),e.addEventListener("pointerup",$),e.addEventListener("pointercancel",$)}getSelectedNode(){let e=this.host.state.selectedNode,t=e?Z(this.host.state,e.diagramIndex):null;return e&&t&&j(t,e.nodeId)?.node||null}getSelectedEdge(){let e=this.host.state.selectedEdge,t=e?Z(this.host.state,e.diagramIndex):null;return e&&t?.edges[e.edgeIndex]||null}clearSelection(){this.host.state.selectedNode=null,this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}deleteSelected(){let e=this.host.state.selectedNode,t=this.host.state.selectedEdge;if(e){let o=Z(this.host.state,e.diagramIndex);if(!o)return;let n=o.edges.filter(a=>a.source===e.nodeId||a.target===e.nodeId);if(n.length&&!globalThis.confirm(`Delete this node and its ${n.length} attached connector${n.length===1?"":"s"}?`))return;et(o,e.nodeId)}else if(t){let o=Z(this.host.state,t.diagramIndex);if(!o)return;Qe(o,t.edgeIndex)}else return;Ae(this.host.state),this.host.persistDiagramModels(),this.host.renderDocument()}wireInlineEditor(e){let t=!1,o=()=>{if(!t){if(t=!0,e.classList.contains("docdiagram-inline-editor-edge")){let a=this.getSelectedEdge();a&&(qe(a,e.value),this.host.persistDiagramModels()),this.host.state.editingEdge=null}else{let a=this.getSelectedNode();a&&(Te(a,e.value),this.host.persistDiagramModels()),this.host.state.editingNode=null}this.host.renderDocument()}},n=()=>{t||(t=!0,e.classList.contains("docdiagram-inline-editor-edge")?this.host.state.editingEdge=null:this.host.state.editingNode=null,this.host.renderDocument())};e.addEventListener("pointerdown",a=>a.stopPropagation()),e.addEventListener("click",a=>a.stopPropagation()),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.metaKey||a.ctrlKey)?(a.preventDefault(),o()):a.key==="Escape"&&(a.preventDefault(),n())}),e.addEventListener("blur",o,{once:!0}),e.focus(),e.select()}resizeNode(e,t,o){t.preventDefault();let n=I(o.getAttribute("data-diagram-index")||void 0),a=o.getAttribute("data-node-id")||"",i=Z(this.host.state,n),s=i?j(i,a)?.node:null;if(!i||!s)return;let d=this.svgPoint(e,t),l={width:Number(s.size?.width)||190,height:Number(s.size?.height)||80},u=J(i),c=!1;this.capturePointer(e,t);let h=g=>{let p=this.svgPoint(e,g),$=he(l.width+p.x-d.x,ke.width,u),y=he(l.height+p.y-d.y,ke.height,u);if(s.shape==="circle"){let k=Math.max($,y);$=k,y=k}c=c||$!==l.width||y!==l.height,s.size={...s.size,width:$,height:y},this.updateNodeSizeMarkup(o,s,$,y)},m=g=>{this.releasePointer(e,g),e.removeEventListener("pointermove",h),e.removeEventListener("pointerup",m),e.removeEventListener("pointercancel",m),c&&(je(i,s),this.host.state.selectedNode={diagramIndex:n,nodeId:a},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.persistDiagramModels(),this.host.renderDocument())};e.addEventListener("pointermove",h),e.addEventListener("pointerup",m),e.addEventListener("pointercancel",m)}updateNodeSizeMarkup(e,t,o,n){let a=Z(this.host.state,I(e.getAttribute("data-diagram-index")||void 0));if(!a)return;let{x:i,y:s}=W(a,t),d=e.querySelector(".docdiagram-node-body"),l=e.querySelector(".docdiagram-node-label"),u=e.querySelector(".docdiagram-node-subtitle"),c=e.querySelector(".docdiagram-resize-handle");if(!d)return;let h=ae(a,t),m=ne(t,i,s,o,n),g=Le(m.textBounds,t);d.outerHTML=Ce(m,h,Number(h.strokeWidth)||2);for(let p of[l,u])if(p){p.setAttribute("x",String(g.centerX)),p.setAttribute("y",String(p===l?g.labelStartY:g.subtitleStartY));for(let $ of p.querySelectorAll("tspan"))$.setAttribute("x",String(g.centerX))}c?.setAttribute("x",String(i+o-7)),c?.setAttribute("y",String(s+n-7))}getNodePortPoint(e,t){let o=this.host.state.diagramModels.find(a=>a.type==="flowchart"&&j(a,e.id)?.node===e);if(!o)return{x:0,y:0};let n=W(o,e);return ne(e,n.x,n.y,n.width,n.height).anchors[t]}addConnectionTargetPorts(e,t){let o=Z(this.host.state,t);if(o)for(let{node:n}of V(o))for(let a of _){let i=this.getNodePortPoint(n,a),s=document.createElementNS("http://www.w3.org/2000/svg","circle");s.setAttribute("class","docdiagram-connection-port docdiagram-connection-target-port"),s.dataset.nodeId=n.id,s.dataset.anchor=a,s.setAttribute("cx",String(i.x)),s.setAttribute("cy",String(i.y)),s.setAttribute("r","7"),e.append(s)}}beginConnectionDrag(e,t,o){t.preventDefault(),t.stopPropagation(),this.host.state.connectionDrag={...o,current:this.svgPoint(e,t),invalid:!1},this.addConnectionTargetPorts(e,o.diagramIndex);let n=document.createElementNS("http://www.w3.org/2000/svg","path");n.setAttribute("class","docdiagram-connection-preview"),e.append(n),this.capturePointer(e,t);let a=d=>{let u=document.elementFromPoint(d.clientX,d.clientY)?.closest(".docdiagram-connection-port");return u||[...e.querySelectorAll(".docdiagram-connection-port")].find(c=>{let h=c.getBoundingClientRect();return d.clientX>=h.left&&d.clientX<=h.right&&d.clientY>=h.top&&d.clientY<=h.bottom})||null},i=d=>{let l=this.host.state.connectionDrag;if(!l)return;let u=this.svgPoint(e,d),c=a(d);l.current=u,l.invalid=!c;let h=c?.getAttribute("data-anchor")||l.sourceAnchor;n.setAttribute("d",fe(l.start,u,l.sourceAnchor,h,"straight").path),n.classList.toggle("docdiagram-connection-invalid",l.invalid)},s=d=>{this.releasePointer(e,d),e.removeEventListener("pointermove",i),e.removeEventListener("pointerup",s),e.removeEventListener("pointercancel",s);let l=a(d),u=this.host.state.connectionDrag;if(this.host.state.connectionDrag=null,l&&u){let c=Z(this.host.state,u.diagramIndex),h=l.getAttribute("data-node-id")||l.closest(".docdiagram-node")?.getAttribute("data-node-id"),m=l.getAttribute("data-anchor")||"";if(c&&h){if(u.reconnect&&u.edgeIndex!==void 0&&u.endpoint){let g=c.edges[u.edgeIndex];g&&(Je(g,u.endpoint,h,m),this.host.state.selectedEdge={diagramIndex:u.diagramIndex,edgeIndex:u.edgeIndex},this.host.state.selectedNode=null)}else{let g=Ke(c,u.sourceNodeId,u.sourceAnchor,h,m);this.host.state.selectedEdge={diagramIndex:u.diagramIndex,edgeIndex:c.edges.indexOf(g)},this.host.state.selectedNode=null}this.host.persistDiagramModels()}}this.host.renderDocument()};e.addEventListener("pointermove",i),e.addEventListener("pointerup",s),e.addEventListener("pointercancel",s)}beginCanvasPan(e,t){let o=e.closest(".docdiagram");if(!o)return;t.preventDefault();let n={clientX:t.clientX,clientY:t.clientY,scrollLeft:o.scrollLeft,scrollTop:o.scrollTop};o.classList.add("docdiagram-panning"),this.capturePointer(e,t);let a=s=>{o.scrollLeft=n.scrollLeft-(s.clientX-n.clientX),o.scrollTop=n.scrollTop-(s.clientY-n.clientY)},i=s=>{this.releasePointer(e,s),o.classList.remove("docdiagram-panning"),e.removeEventListener("pointermove",a),e.removeEventListener("pointerup",i),e.removeEventListener("pointercancel",i)};e.addEventListener("pointermove",a),e.addEventListener("pointerup",i),e.addEventListener("pointercancel",i)}svgPoint(e,t){let o=e.getBoundingClientRect(),n=e.viewBox.baseVal;return{x:(t.clientX-o.left)*n.width/o.width,y:(t.clientY-o.top)*n.height/o.height}}capturePointer(e,t){t.isTrusted&&e.setPointerCapture(t.pointerId)}releasePointer(e,t){t.isTrusted&&e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId)}};function Wt(r,e){return Object.entries(Y[r]||{}).map(([t,o])=>`<option value="${t}"${t===e?" selected":""}>${o.label}</option>`).join("")}function Xt(r,e,t="classic"){let o=J(r),n=ae(r,e),a=Number(e.size?.width)||190,i=Number(e.size?.height)||80,s=e.shape==="document"?{width:140,height:84}:{width:120,height:60},d=o?Math.ceil(s.width/o)*o:s.width,l=o?Math.ceil(s.height/o)*o:s.height,u=o||1,c=Y[t]||{},h=Object.entries(c).find(([,p])=>[p.light,p.dark].some($=>$.fill.toLowerCase()===(n.fill||"").toLowerCase()&&$.stroke.toLowerCase()===(n.stroke||"").toLowerCase()&&$.text.toLowerCase()===(n.text||"").toLowerCase())),m=e.palette?.colour||h?.[0]||"blue",g=e.palette?.tone||(h&&h[1].light.fill.toLowerCase()===(n.fill||"").toLowerCase()?"light":"dark");return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${x(e.label)}</textarea></label>`,`<label class="docdiagram-field docdiagram-field-wide">Subtitle<textarea class="docdiagram-inspector-subtitle docdiagram-inspector-textarea" rows="2">${x(e.subtitle||"")}</textarea></label>`,`<label class="docdiagram-field">Tone<select class="docdiagram-inspector-tone"><option value="light"${g==="light"?" selected":""}>Light</option><option value="dark"${g==="dark"?" selected":""}>Dark</option></select></label>`,`<label class="docdiagram-field">Colour<select class="docdiagram-inspector-colour">${Wt(t,m)}</select></label>`,`<label class="docdiagram-field">Shape<select class="docdiagram-inspector-shape">${Se.map(p=>`<option value="${p}"${p===e.shape?" selected":""}>${p}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Fill<input type="color" class="docdiagram-inspector-fill" value="${x(n.fill||"")}"></label>`,`<label class="docdiagram-field">Border<input type="color" class="docdiagram-inspector-stroke" value="${x(n.stroke||"")}"></label>`,`<label class="docdiagram-field">Border width<input type="number" class="docdiagram-inspector-stroke-width" value="${Number(n.strokeWidth)||2}" min="1" step="1"></label>`,`<label class="docdiagram-field">Text<input type="color" class="docdiagram-inspector-text" value="${x(n.text||"")}"></label>`,`<label class="docdiagram-field">Width<input type="number" class="docdiagram-inspector-width" value="${a}" min="${d}" step="${u}"></label>`,`<label class="docdiagram-field">Height<input type="number" class="docdiagram-inspector-height" value="${i}" min="${l}" step="${u}"></label>`].join("")}function Ft(r,e){let t=Fe(r,e),o=Number(t.strokeWidth)||2,n=e.route||"orthogonal",a=e.start||"none",i=e.end||"arrow";return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${x(e.label||"")}</textarea></label>`,`<label class="docdiagram-field">Route<select class="docdiagram-inspector-route">${$e.map(s=>`<option value="${s}"${s===n?" selected":""}>${s}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Source side<select class="docdiagram-inspector-source-anchor">${_.map(s=>`<option value="${s}"${s===e.sourceAnchor?" selected":""}>${s}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Target side<select class="docdiagram-inspector-target-anchor">${_.map(s=>`<option value="${s}"${s===e.targetAnchor?" selected":""}>${s}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Start<select class="docdiagram-inspector-marker-start">${U.map(s=>`<option value="${s}"${s===a?" selected":""}>${s}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">End<select class="docdiagram-inspector-marker-end">${U.map(s=>`<option value="${s}"${s===i?" selected":""}>${s}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Stroke<input type="color" class="docdiagram-inspector-stroke" value="${x(t.stroke||"")}"></label>`,`<label class="docdiagram-field">Label colour<input type="color" class="docdiagram-inspector-text" value="${x(t.text||"")}"></label>`,`<label class="docdiagram-field">Stroke width<input type="number" class="docdiagram-inspector-stroke-width" value="${o}" min="1" step="1"></label>`].join("")}function Zt(r,e,t,o="classic"){let n="from"in t?null:Me(r,t),a=e.kind!=="message",i=a?t:null;return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-sequence-inspector-label docdiagram-inspector-textarea" rows="2">${x(t.label||"")}</textarea></label>`,e.kind==="message"?`<label class="docdiagram-field">Style<select class="docdiagram-sequence-inspector-message-style"><option value="solid"${t.style!=="dashed"?" selected":""}>Solid</option><option value="dashed"${t.style==="dashed"?" selected":""}>Dashed</option></select></label>`:"",a?`<label class="docdiagram-field">Tone<select class="docdiagram-sequence-inspector-tone"><option value="light"${i?.palette?.tone!=="dark"?" selected":""}>Light</option><option value="dark"${i?.palette?.tone==="dark"?" selected":""}>Dark</option></select></label>`:"",a?`<label class="docdiagram-field">Colour<select class="docdiagram-sequence-inspector-colour">${Wt(o,i?.palette?.colour||"blue")}</select></label>`:"",a?`<label class="docdiagram-field">Fill<input type="color" class="docdiagram-sequence-inspector-fill" value="${x(n?.fill||"")}"></label><label class="docdiagram-field">Border<input type="color" class="docdiagram-sequence-inspector-stroke" value="${x(n?.stroke||"")}"></label><label class="docdiagram-field">Text<input type="color" class="docdiagram-sequence-inspector-text" value="${x(n?.text||"")}"></label><label class="docdiagram-field">Width<input type="number" min="1" class="docdiagram-sequence-inspector-width" value="${Number(i?.size?.width)||""}"></label><label class="docdiagram-field">Height<input type="number" min="1" class="docdiagram-sequence-inspector-height" value="${Number(i?.size?.height)||""}"></label>`:""].join("")}function Ve(r,e){return r.querySelector(e)}function M(r,e,t){Ve(r,e)?.addEventListener("change",o=>{t(o.currentTarget.value)})}function ye(r,e){e(),r.persistDiagramModels(),r.renderDocument()}function Kt(r,e,t,o){let n=d=>{let l=r.state.diagramModels[t];if(!l||l.type!=="flowchart")return;let u=j(l,o)?.node;u&&ye(r,()=>d(l,u))};M(e,".docdiagram-inspector-label",d=>n((l,u)=>Te(u,d))),M(e,".docdiagram-inspector-subtitle",d=>n((l,u)=>rt(u,d)));let a=Ve(e,".docdiagram-inspector-tone"),i=Ve(e,".docdiagram-inspector-colour"),s=()=>{a&&i&&n((d,l)=>Be(l,a.value,i.value,r.state.documentColorScheme))};a?.addEventListener("change",s),i?.addEventListener("change",s),M(e,".docdiagram-inspector-shape",d=>n((l,u)=>tt(u,d))),M(e,".docdiagram-inspector-fill",d=>n((l,u)=>pe(u,"fill",d))),M(e,".docdiagram-inspector-stroke",d=>n((l,u)=>pe(u,"stroke",d))),M(e,".docdiagram-inspector-text",d=>n((l,u)=>pe(u,"text",d))),M(e,".docdiagram-inspector-stroke-width",d=>n((l,u)=>Ue(u,d))),M(e,".docdiagram-inspector-width",d=>n((l,u)=>He(l,u,"width",d))),M(e,".docdiagram-inspector-height",d=>n((l,u)=>He(l,u,"height",d)))}function Jt(r,e,t,o){let n=a=>{let i=r.state.diagramModels[t];if(!i||i.type!=="flowchart")return;let s=i.edges[o];s&&ye(r,()=>a(i,s))};M(e,".docdiagram-inspector-label",a=>n((i,s)=>qe(s,a))),M(e,".docdiagram-inspector-route",a=>n((i,s)=>ot(s,a))),M(e,".docdiagram-inspector-source-anchor",a=>n((i,s)=>Oe(s,"source",a))),M(e,".docdiagram-inspector-target-anchor",a=>n((i,s)=>Oe(s,"target",a))),M(e,".docdiagram-inspector-marker-start",a=>n((i,s)=>nt(s,a))),M(e,".docdiagram-inspector-marker-end",a=>n((i,s)=>it(s,a))),M(e,".docdiagram-inspector-stroke",a=>n((i,s)=>Ge(s,"stroke",a))),M(e,".docdiagram-inspector-text",a=>n((i,s)=>Ge(s,"text",a))),M(e,".docdiagram-inspector-stroke-width",a=>n((i,s)=>Ue(s,a)))}function Qt(r,e,t){let o=r.state.selectedSequenceElement;if(!o)return;if(M(e,".docdiagram-sequence-inspector-label",d=>ye(r,()=>{t.label=d.trim()||t.label})),o.kind==="message"){M(e,".docdiagram-sequence-inspector-message-style",d=>ye(r,()=>{t.style=d}));return}let n=t,a=Ve(e,".docdiagram-sequence-inspector-tone"),i=Ve(e,".docdiagram-sequence-inspector-colour"),s=()=>{a&&i&&ye(r,()=>Be(n,a.value,i.value,r.state.documentColorScheme))};a?.addEventListener("change",s),i?.addEventListener("change",s);for(let[d,l]of[[".docdiagram-sequence-inspector-fill","fill"],[".docdiagram-sequence-inspector-stroke","stroke"],[".docdiagram-sequence-inspector-text","text"]])M(e,d,u=>ye(r,()=>pe(n,l,u)));for(let[d,l]of[[".docdiagram-sequence-inspector-width","width"],[".docdiagram-sequence-inspector-height","height"]])M(e,d,u=>ye(r,()=>{let c=Number(u);Number.isFinite(c)&&c>0&&(n.size={...n.size,[l]:c})}))}var ut=class{constructor(e){this.host=e;this.renderTimer=null;this.resizeObserver=null;this.openState=!1;this.draft="";this.error=""}get isOpen(){return this.openState}get hasUnsavedDraft(){return this.openState&&this.draft!==this.host.getSource()}get hasError(){return this.error.length>0}get draftSource(){return this.draft}setError(e){this.error=e,this.updateStatus()}clearError(){this.error=""}open(){globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=null,this.draft=this.host.getSource(),this.error="",this.openState=!0,this.host.stopDiagramEditing(),this.host.renderDocument();let e=()=>this.focus();globalThis.requestAnimationFrame?.(e)??e()}close(){this.flushRender(),!(this.error&&this.draft!==this.host.getSource()&&!globalThis.confirm("Discard the invalid source changes?"))&&(this.openState=!1,this.draft="",this.error="",this.renderTray(),document.querySelector(".docdiagram-menu-toggle")?.focus())}flushRender(){return this.renderTimer===null?!0:this.renderDraft()}syncSource(e){if(!this.openState)return;this.draft=e,this.error="";let t=document.querySelector(".docdiagram-source-editor");if(!t)return;let o=t.selectionStart,n=t.selectionEnd,a=t.scrollTop;t.value=e,t.setSelectionRange(Math.min(o,e.length),Math.min(n,e.length)),t.scrollTop=a,this.updateStatus()}reveal(e){let t=st(this.host.getSource(),e);if(!t||this.hasUnsavedDraft)return!1;this.openState||this.open();let o=()=>{let n=document.querySelector(".docdiagram-source-editor");n&&(n.focus(),n.setSelectionRange(t.start,t.end),dt(n,t))};return globalThis.requestAnimationFrame?.(o)??o(),!0}renderTray(){let e=document.querySelector(".docdiagram-source-tray");if(!this.openState){this.resizeObserver?.disconnect(),this.resizeObserver=null,e?.remove(),delete this.host.outputElement.dataset.sourceEditorOpen,this.host.outputElement.style.removeProperty("--docdiagram-source-tray-height");return}if(e){e.dataset.theme=this.host.getDocumentTheme(),this.host.outputElement.dataset.sourceEditorOpen="true",this.updateStatus();return}e=document.createElement("section"),e.className="docdiagram-source-tray",e.dataset.theme=this.host.getDocumentTheme(),e.setAttribute("aria-label","Document source editor"),e.innerHTML=['<header class="docdiagram-source-header">','<div><strong>Source</strong><span class="docdiagram-source-shortcut">Cmd/Ctrl+Shift+E to close</span></div>','<button type="button" class="docdiagram-source-close">Close source editor</button>',"</header>",'<label class="docdiagram-source-label">Canonical Markdown<textarea class="docdiagram-source-editor" spellcheck="false"></textarea></label>','<p class="docdiagram-source-status" aria-live="polite"></p>','<p class="docdiagram-source-error" role="alert"></p>'].join("");let t=e.querySelector(".docdiagram-source-editor"),o=e.querySelector(".docdiagram-source-close");if(!t||!o)return;t.value=this.draft,t.addEventListener("input",()=>{this.draft=t.value,this.error="",this.updateStatus(),this.scheduleRender()}),o.addEventListener("click",()=>this.close()),this.host.outputElement.after(e),this.host.outputElement.dataset.sourceEditorOpen="true";let n=()=>{this.host.outputElement.style.setProperty("--docdiagram-source-tray-height",`${e?.offsetHeight||0}px`)};this.resizeObserver?.disconnect(),globalThis.ResizeObserver&&(this.resizeObserver=new globalThis.ResizeObserver(n),this.resizeObserver.observe(e)),n(),this.updateStatus()}scheduleRender(){globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=globalThis.setTimeout(()=>{this.renderTimer=null,this.renderDraft()},250)}renderDraft(){return globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=null,this.host.renderDocument(this.draft,{preserveOnError:!0})}updateStatus(){let e=document.querySelector(".docdiagram-source-tray");if(!e)return;let t=e.querySelector(".docdiagram-source-status"),o=e.querySelector(".docdiagram-source-error");!t||!o||(t.textContent=this.error?"Source has errors; showing the last valid render.":"Changes render automatically.",o.hidden=!this.error,o.textContent=this.error)}focus(){let e=document.querySelector(".docdiagram-source-editor");e&&(e.focus(),e.setSelectionRange(e.value.length,e.value.length))}};function kr(r){return r instanceof Element&&r.matches("input, textarea, select, [contenteditable]")}var mt=class{constructor(e,t){this.sourceElement=e;this.outputElement=t;this.state=_t();this.sourceEditor=t?new ut({outputElement:t,getSource:()=>this.getSource(),getDocumentTheme:()=>this.getDocumentTheme(),renderDocument:(o,n)=>this.renderDocument(o,n),stopDiagramEditing:()=>this.stopDiagramEditing(),closeDocumentMenu:()=>this.closeDocumentMenu()}):null,this.diagramEditor=t?new lt({outputElement:t,state:this.state,persistDiagramModels:()=>this.persistDiagramModels(),renderDocument:()=>this.renderDocument()}):null}getSource(){return this.sourceElement?.content.textContent||""}setSource(e){this.sourceElement?.content.replaceChildren(document.createTextNode(e))}getDocumentTheme(){return this.state.documentTheme}stopDiagramEditing(){this.state.editingDiagramIndex!==null&&(this.state.editingDiagramIndex=null,this.state.editSessionDiagram=null,Ae(this.state))}renderDiagram(e,t){return Yt(e,t,{colourScheme:this.state.documentColorScheme,state:{...this.state,documentTheme:this.state.documentTheme,documentColorScheme:this.state.documentColorScheme},onDiagram:(o,n)=>{this.state.diagramModels[o]=n}})}renderMarkdown(e,t={diagramIndex:0}){return Dt(e,t,{renderDiagram:(o,n)=>this.renderDiagram(o,n),documentColorScheme:this.state.documentColorScheme})}persistDiagramModels(){let e=0,t=this.getSource().replace(/\r\n/g,`
`).replace(/^```diagram\s*\n([\s\S]*?)^```$/gm,()=>{let o=this.state.diagramModels[e];return e+=1,o?`\`\`\`diagram
${Xe(o)}
\`\`\``:"```diagram\n```"});this.setSource(t),this.sourceEditor?.syncSource(t)}renderDocument(e=this.getSource(),{preserveOnError:t=!1}={}){if(!this.outputElement)return!1;let o=new Map([...this.outputElement.querySelectorAll(".docdiagram")].map(l=>[Number(l.dataset.diagramIndex),{left:l.scrollLeft,top:l.scrollTop}])),n={x:globalThis.scrollX||0,y:globalThis.scrollY||0},a=[...this.state.diagramModels],i=this.state.documentTheme,s=this.state.documentColorScheme;this.state.diagramModels.length=0;let d;try{let l=t?$t(e):at(e);this.state.documentTheme=l.theme,this.state.documentColorScheme=l.colourScheme,d=this.renderMarkdown(l.content)}catch(l){let u=l instanceof Error?l.message:String(l);return this.state.diagramModels.length=0,this.state.diagramModels.push(...a),t?(this.state.documentTheme=i,this.state.documentColorScheme=s,this.sourceEditor?.setError(u),!1):(this.applyPageTheme(this.state.documentTheme),this.removeToolbarChrome(),this.outputElement.innerHTML=`<section class="docdiagram-error"><strong>Document could not be rendered.</strong><br>${x(u)}</section>`,this.sourceEditor?.renderTray(),!1)}this.setSource(e),this.sourceEditor?.clearError(),this.outputElement.dataset.theme=this.state.documentTheme,this.outputElement.dataset.format=this.state.documentFormat,this.applyPageTheme(this.state.documentTheme),this.outputElement.innerHTML=d,this.removeToolbarChrome(),this.createToolbar(),this.sourceEditor?.renderTray(),this.diagramEditor?.enableCanvasPanning(),this.diagramEditor?.enableSequenceSelection(),this.state.editingDiagramIndex!==null&&this.diagramEditor?.enableEditing();for(let l of this.outputElement.querySelectorAll(".docdiagram")){let u=o.get(Number(l.dataset.diagramIndex));u&&(l.scrollLeft=u.left,l.scrollTop=u.top)}return globalThis.scrollTo?.(n.x,n.y),!0}closeDocumentMenu(){let e=document.querySelector(".docdiagram-menu"),t=document.querySelector(".docdiagram-menu-toggle");!e||!t||(e.hidden=!0,t.setAttribute("aria-expanded","false"))}downloadDocument(){if(this.sourceEditor?.flushRender(),this.sourceEditor?.hasError&&this.sourceEditor.hasUnsavedDraft&&!globalThis.confirm("Source has errors. Save the last valid version instead?"))return;let e=document.documentElement.cloneNode(!0),t=e.querySelector("#source"),o=e.querySelector(".docdiagram-toolbar"),n=e.querySelector(".docdiagram-source-tray"),a=e.querySelector("#rendered-document");t?.content.replaceChildren(document.createTextNode(this.getSource())),o?.remove(),n?.remove(),a?.replaceChildren();let i=new Blob([`<!doctype html>
${e.outerHTML}`],{type:"text/html;charset=utf-8"}),s=document.createElement("a"),d=document.title.toLowerCase().replace(/[^\w]+/g,"-").replace(/^-|-$/g,"");s.href=URL.createObjectURL(i),s.download=`${d||"document"}-edited.html`,s.click(),URL.revokeObjectURL(s.href),this.state.savedSource=this.getSource()}boot(){!this.sourceElement||!this.outputElement||(Vt(),this.state.savedSource=this.getSource(),globalThis.addEventListener("beforeunload",e=>{this.getSource()===this.state.savedSource&&!this.sourceEditor?.hasUnsavedDraft||(e.preventDefault(),e.returnValue="")}),document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.shiftKey&&e.key.toLowerCase()==="e"&&(this.sourceEditor?.isOpen||!kr(e.target))){e.preventDefault(),this.sourceEditor?.isOpen?this.sourceEditor.close():this.sourceEditor?.open();return}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="s"){e.preventDefault(),this.downloadDocument();return}e.key==="Escape"&&this.closeDocumentMenu()}),document.addEventListener("pointerdown",e=>{let t=document.querySelector(".docdiagram-toolbar");t&&e.target instanceof Node&&!t.contains(e.target)&&this.closeDocumentMenu()}),this.outputElement.addEventListener("dblclick",e=>{e.target instanceof Element&&e.target.closest("button, input, textarea, select, [contenteditable]")||this.sourceEditor?.reveal(globalThis.getSelection?.()?.toString()||"")}),this.renderDocument())}getCoreApi(){return{diagramThemes:te,nodeColorSchemes:Y,supportedDiagramTypes:ze,nodeColorPalettes:qt,nodeShapes:Se,edgeAnchors:_,edgeRoutes:$e,edgeMarkerStyles:U,getTheme:e=>ge(e,this.state.documentTheme),getGridSize:J,expandCanvasForNode:je,flattenFlowchartNodes:V,getFlowchartNodeBounds:W,reparentFlowchartNode:Ze,createUniqueNodeId:bt,getDefaultNodePosition:xt,createNode:yt,createConnector:Ke,reconnectConnector:Je,deleteConnector:Qe,deleteNode:et,getNodeEffectiveStyle:(e,t)=>ae(e,t,this.state.documentTheme,this.state.documentColorScheme),getEdgeEffectiveStyle:(e,t)=>Fe(e,t,this.state.documentTheme),getEdgeMarkerStyle:Re,getEdgeMarkerDimensions:Et,parseDiagram:e=>ue(e,this.state.documentColorScheme),parseDocumentFrontmatter:St,resolveDocument:at,setFrontmatterTheme:kt,isSafeUrl:ct,renderInline:de,renderMarkdown:(e,t)=>this.renderMarkdown(e,t),renderDiagram:(e,t)=>this.renderDiagram(e,t),snapToGrid:re,clampNodeSize:he,serializeDiagram:Xe,setNodeLabel:Te,setNodeShape:tt,setNodeSubtitle:rt,setNodeStyleOverride:pe,setNodeColorPalette:Be,setNodeSize:He,setEdgeLabel:qe,setEdgeRoute:ot,setEdgeAnchor:Oe,setEdgeStyleOverride:Ge,setStyleStrokeWidth:Ue,setEdgeMarkerStart:nt,setEdgeMarkerEnd:it,validateDocumentSource:$t,findSourceTextRange:st,scrollSourceEditorToRange:dt,splitTextLines:oe,renderTextBlock:Q,computeNodeTextLayout:Le,getNodeGeometry:ne,renderNodeBody:Ce,buildEdgePath:fe,buildEdgeInspectorFields:Ft,clampZoom:wt}}createToolbar(){if(!this.outputElement)return;let e=document.createElement("section");e.className="docdiagram-toolbar",e.dataset.editing=String(this.state.editingDiagramIndex!==null),e.dataset.theme=this.state.documentTheme,e.dataset.format=this.state.documentFormat;let t=this.getSelectedNode(),o=t?null:this.getSelectedEdge(),n=!t&&!o?this.getSelectedSequenceElement():null,a=t&&this.state.selectedNode?this.state.diagramModels[this.state.selectedNode.diagramIndex]:o&&this.state.selectedEdge?this.state.diagramModels[this.state.selectedEdge.diagramIndex]:n&&this.state.selectedSequenceElement?this.state.diagramModels[this.state.selectedSequenceElement.diagramIndex]:null;e.innerHTML=['<button type="button" class="docdiagram-menu-toggle" aria-label="Document menu" aria-expanded="false" title="Document menu">\u2630</button>','<div class="docdiagram-menu" hidden>','<label class="docdiagram-theme-control">Theme<select class="docdiagram-theme-select">',`<option value="light"${this.state.documentTheme==="light"?" selected":""}>Light</option>`,`<option value="dark"${this.state.documentTheme==="dark"?" selected":""}>Dark</option>`,"</select></label>",'<label class="docdiagram-theme-control">Format<select class="docdiagram-format-select">',`<option value="centered"${this.state.documentFormat==="centered"?" selected":""}>Centered</option>`,`<option value="full-width"${this.state.documentFormat==="full-width"?" selected":""}>Full width</option>`,"</select></label>",'<button type="button" class="docdiagram-edit-source">Edit source</button>','<button type="button" class="docdiagram-save">Save As</button>','<button type="button" class="docdiagram-offline-save" disabled>Save for Offline (coming soon)</button>',"</div>",t&&a?.type==="flowchart"?`<div class="docdiagram-inspector" data-kind="node">${Xt(a,t,this.state.documentColorScheme)}</div>`:o&&a?`<div class="docdiagram-inspector" data-kind="edge">${Ft(a,o)}</div>`:n&&a?`<div class="docdiagram-inspector" data-kind="sequence">${Zt(a,this.state.selectedSequenceElement,n,this.state.documentColorScheme)}</div>`:""].join("");let i=e.querySelector(".docdiagram-menu-toggle"),s=e.querySelector(".docdiagram-menu");i?.addEventListener("click",()=>{if(!s)return;let d=s.hidden;s.hidden=!d,i.setAttribute("aria-expanded",String(d))}),e.querySelector(".docdiagram-save")?.addEventListener("click",()=>this.downloadDocument()),e.querySelector(".docdiagram-edit-source")?.addEventListener("click",()=>{this.closeDocumentMenu(),this.sourceEditor?.open()}),e.querySelector(".docdiagram-theme-select")?.addEventListener("change",d=>{this.setSource(kt(this.getSource(),d.currentTarget.value)),this.renderDocument()}),e.querySelector(".docdiagram-format-select")?.addEventListener("change",d=>{this.state.documentFormat=d.currentTarget.value==="full-width"?"full-width":"centered",this.renderDocument()}),this.outputElement.before(e),t&&this.state.selectedNode?(Kt(this,e,this.state.selectedNode.diagramIndex,this.state.selectedNode.nodeId),this.positionInspector(this.state.selectedNode.diagramIndex)):o&&this.state.selectedEdge?(Jt(this,e,this.state.selectedEdge.diagramIndex,this.state.selectedEdge.edgeIndex),this.positionInspector(this.state.selectedEdge.diagramIndex)):n&&this.state.selectedSequenceElement&&(Qt(this,e,n),this.positionInspector(this.state.selectedSequenceElement.diagramIndex)),this.wireChromeControls()}getSelectedNode(){let e=this.state.selectedNode,t=e?this.state.diagramModels[e.diagramIndex]:null;return e&&t?.type==="flowchart"&&xe(this.state,e.diagramIndex)&&j(t,e.nodeId)?.node||null}getSelectedEdge(){let e=this.state.selectedEdge,t=e?this.state.diagramModels[e.diagramIndex]:null;return e&&t?.type==="flowchart"&&xe(this.state,e.diagramIndex)&&t.edges[e.edgeIndex]||null}getSelectedSequenceElement(){let e=this.state.selectedSequenceElement,t=e?this.state.diagramModels[e.diagramIndex]:null;return!e||t?.type!=="sequence"||!xe(this.state,e.diagramIndex)?null:e.kind==="participant"?t.participants?.find(o=>o.id===e.id)||null:e.kind==="message"?t.messages?.[e.index]||null:t.notes?.[e.index]||null}wireChromeControls(){if(this.outputElement){for(let e of this.outputElement.querySelectorAll(".docdiagram-zoom-in, .docdiagram-zoom-out"))e.addEventListener("click",()=>{let t=Number(e.dataset.diagramIndex),o=this.state.diagramZooms.get(t)||100,n=e.classList.contains("docdiagram-zoom-in")?25:-25;this.state.diagramZooms.set(t,wt(o+n)),this.renderDocument()});for(let e of this.outputElement.querySelectorAll(".docdiagram-fit"))e.addEventListener("click",()=>{this.state.diagramZooms.set(Number(e.dataset.diagramIndex),100),this.renderDocument()});for(let e of this.outputElement.querySelectorAll(".docdiagram-start-editing"))e.addEventListener("click",()=>{let t=Number(e.closest(".docdiagram")?.getAttribute("data-diagram-index")),o=this.state.diagramModels[t];o&&(this.state.editSessionDiagram=ue(Xe(o),this.state.documentColorScheme),this.state.editingDiagramIndex=t,Ae(this.state),this.renderDocument())});for(let e of this.outputElement.querySelectorAll(".docdiagram-done-editing"))e.addEventListener("click",()=>this.exitEditing(this.state.editingDiagramIndex,!1));for(let e of this.outputElement.querySelectorAll(".docdiagram-cancel-editing"))e.addEventListener("click",()=>this.exitEditing(this.state.editingDiagramIndex,!0));for(let e of this.outputElement.querySelectorAll(".docdiagram-create-node"))e.addEventListener("click",()=>this.createNewNode(Number(e.dataset.diagramIndex)))}}exitEditing(e,t){e!==null&&(t&&this.state.editSessionDiagram&&(this.state.diagramModels[e]=this.state.editSessionDiagram,this.persistDiagramModels()),this.state.editingDiagramIndex=null,this.state.editSessionDiagram=null,Ae(this.state),this.renderDocument())}createNewNode(e){let t=this.state.diagramModels[e];if(!t||t.type!=="flowchart")return;let o=yt(t);this.state.selectedNode={diagramIndex:e,nodeId:o.id},this.state.selectedEdge=null,this.persistDiagramModels(),this.renderDocument()}positionInspector(e){if(!this.outputElement)return;let t=document.querySelector(".docdiagram-inspector"),o=this.outputElement.querySelector(`.docdiagram[data-diagram-index="${e}"]`);!t||!o||(t.style.top=`${Math.max(16,o.getBoundingClientRect().top)}px`)}applyPageTheme(e){document.documentElement.dataset.docdiagramTheme=e,document.body?.dataset&&(document.body.dataset.docdiagramTheme=e)}removeToolbarChrome(){if(this.outputElement)for(;this.outputElement.previousElementSibling?.classList.contains("docdiagram-toolbar");)this.outputElement.previousElementSibling.remove()}};var vr=document.querySelector("#source"),Nr=document.querySelector("#rendered-document"),er=new mt(vr,Nr),Dr=globalThis;Dr.DocDiagramCore=er.getCoreApi();er.boot();})();
