"use strict";(()=>{var Oe=["flowchart","sequence"],De=["rounded-rectangle","circle","oval","database","diamond","rhombus","flattened-hexagon","chevron","right-chevron","document"],Y=["top","right","bottom","left"],Fe=["orthogonal","straight","curved"],G=["none","arrow","circle"],Ve={start:"none",end:"arrow"},Vt=["top","center"],Gt=["left","center","right"],Nt={width:50,height:20},Dt={width:50,height:20},A={shape:"rounded-rectangle",label:"New node",width:190,height:80},U={classic:{pink:{label:"Pink",light:{fill:"#F6C5D8",stroke:"#9D174D",text:"#9D174D"},dark:{fill:"#9D174D",stroke:"#FBCFE8",text:"#FBCFE8"}},red:{label:"Red",light:{fill:"#FECACA",stroke:"#B91C1C",text:"#B91C1C"},dark:{fill:"#B91C1C",stroke:"#FEE2E2",text:"#FEE2E2"}},orange:{label:"Orange",light:{fill:"#FED7AA",stroke:"#C2410C",text:"#9A3412"},dark:{fill:"#C2410C",stroke:"#FFEDD5",text:"#FFEDD5"}},yellow:{label:"Yellow",light:{fill:"#FEF08A",stroke:"#A16207",text:"#854D0E"},dark:{fill:"#A16207",stroke:"#FEF9C3",text:"#FEF9C3"}},green:{label:"Green",light:{fill:"#BBF7D0",stroke:"#15803D",text:"#166534"},dark:{fill:"#15803D",stroke:"#DCFCE7",text:"#DCFCE7"}},cyan:{label:"Cyan",light:{fill:"#A5F3FC",stroke:"#0E7490",text:"#155E75"},dark:{fill:"#0E7490",stroke:"#CFFAFE",text:"#CFFAFE"}},blue:{label:"Blue",light:{fill:"#BFDBFE",stroke:"#1D4ED8",text:"#1E3A8A"},dark:{fill:"#1D4ED8",stroke:"#DBEAFE",text:"#DBEAFE"}},purple:{label:"Purple",light:{fill:"#DDD6FE",stroke:"#6D28D9",text:"#5B21B6"},dark:{fill:"#6D28D9",stroke:"#EDE9FE",text:"#EDE9FE"}},grey:{label:"Grey",light:{fill:"#E5E7EB",stroke:"#4B5563",text:"#374151"},dark:{fill:"#4B5563",stroke:"#E5E7EB",text:"#F9FAFB"}},bw:{label:"Black and white",light:{fill:"#FFFFFF",stroke:"#111827",text:"#111827"},dark:{fill:"#111827",stroke:"#FFFFFF",text:"#FFFFFF"}}}},Ut=U.classic,se={light:{edge:{stroke:"#52616B",strokeWidth:2,text:"#3E4A54"},node:{fill:"#EAF2FF",stroke:"#3574C7",strokeWidth:2,text:"#17202A"}},dark:{edge:{stroke:"#B8C7D5",strokeWidth:2,text:"#D9E4ED"},node:{fill:"#193A61",stroke:"#71AEF7",strokeWidth:2,text:"#F3F8FC"}}};var Yt=["pink","red","orange","yellow","green","cyan","blue","purple","grey","bw"],Wt=["note","info","warning","success"],_t={2:"repeat(2, minmax(0, 1fr))",3:"repeat(3, minmax(0, 1fr))","2fr 1fr":"minmax(0, 2fr) minmax(0, 1fr)","1fr 2fr":"minmax(0, 1fr) minmax(0, 2fr)"};var br=["nodes","edges","participants","messages","activations","notes","groups"],xr=["id","label","shape","position","size","style","palette","subtitle","textVAlign","textHAlign","children"],yr=["source","target","sourceAnchor","targetAnchor","route","label","style","start","end"],Kt=["fill","stroke","strokeWidth","text"],wr=["stroke","strokeWidth","text"],Zt=["tone","colour"],Er=["id","label","kind","palette","style","size"],Sr=["actor"],$r=["from","to","label","style"],kr=["solid","dashed"],vr=["participant","from","to"],Nr=["at","after","label","palette","style","size"],Dr=["label","from","to"],Fr=["width","height","participantSpacing","participantSize"];function b(r){return String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Me(r){let e=r.trim();if(e.startsWith('"')&&e.endsWith('"'))try{return JSON.parse(e)}catch{throw new Error(`Invalid quoted scalar: ${e}`)}if(e.startsWith("'")&&e.endsWith("'"))return e.slice(1,-1);if(/^-?\d+(\.\d+)?$/.test(e))return Number(e);if(e==="true"||e==="false")return e==="true";if(e.startsWith("{")&&e.endsWith("}")){let t=e.slice(1,-1).trim();if(!t)return{};let o=t.split(","),n={};for(let s of o){let i=s.indexOf(":");if(i===-1)throw new Error(`Invalid inline mapping: ${e}`);let a=s.slice(0,i).trim();n[a]=Me(s.slice(i+1))}return n}return e}function pe(r,e="classic"){let o=r.replace(/\r\n/g,`
`).split(`
`).filter(p=>p.trim()&&!p.trimStart().startsWith("#"));for(let p of o){if(p.trimStart()!==p||!p.trimEnd().endsWith(":"))continue;let m=p.trim().slice(0,-1);if(m!=="canvas"&&!br.includes(m))throw new Error(`Unsupported diagram section: ${m}`)}let n=0,s=p=>p.length-p.trimStart().length,i=p=>p.trim().match(/^([^:]+):\s*(.*)$/),a=p=>p.trim().match(/^- ([^:]+):\s*(.*)$/),d=p=>n>=o.length||s(o[n])<=p?{}:o[n].trimStart().startsWith("- ")?l(s(o[n])):c(s(o[n])),c=p=>{let m={};for(;n<o.length&&s(o[n])===p;){let g=o[n],h=i(g);if(!h)throw new Error(`Cannot parse diagram line: ${g}`);n+=1,m[h[1]]=h[2]?Me(h[2]):d(p)}return m},l=p=>{let m=[];for(;n<o.length&&s(o[n])===p;){let g=o[n],h=a(g);if(!h)throw new Error(`Cannot parse diagram line: ${g}`);n+=1;let $={[h[1]]:h[2]?Me(h[2]):d(p)};for(;n<o.length&&s(o[n])>p;){let y=s(o[n]),S=i(o[n]);if(!S)throw new Error(`Cannot parse diagram line: ${o[n]}`);n+=1,$[S[1]]=S[2]?Me(S[2]):d(y)}m.push($)}return m},u=c(0);if(!u.type)throw new Error(`Diagram type is required and must be one of: ${Oe.join(", ")}.`);if(typeof u.type!="string"||!Oe.includes(u.type))throw new Error(`Unsupported diagram type: ${String(u.type)}`);return u.type==="flowchart"?Mr(u,e):Tr(u,e)}function Mr(r,e="classic"){return r.canvas=r.canvas||{},Array.isArray(r.nodes)||(r.nodes=[]),Array.isArray(r.edges)||(r.edges=[]),qr(r,e),r}function Tr(r,e="classic"){return Ar(r,e),r}function W(r,e,t){for(let o of Object.keys(r||{}))if(!e.includes(o))throw new Error(`Unsupported ${t} field: ${o}`)}function Ft(r,e,t){if(r){for(let o of Object.keys(r))if(!e.includes(o))throw new Error(`Unsupported ${t} style field: ${o}`)}}function qr(r,e="classic"){if(r.participants!==void 0||r.messages!==void 0||r.activations!==void 0||r.notes!==void 0||r.groups!==void 0)throw new Error("Flowchart diagrams do not support sequence sections.");let t=new Set,o=i=>{if("type"in i)throw new Error(`Node "${i.id||"unknown"}" uses removed field "type".`);if(W(i,xr,`node "${i.id||"unknown"}"`),!i.id||!i.label)throw new Error("Every node requires an id and label.");if(!i.shape)throw new Error(`Node "${i.id}" requires a shape.`);if(!De.includes(i.shape))throw new Error(`Unsupported node shape: ${i.shape}`);if(i.textVAlign!==void 0&&!Vt.includes(i.textVAlign))throw new Error(`Unsupported node textVAlign: ${i.textVAlign}`);if(i.textHAlign!==void 0&&!Gt.includes(i.textHAlign))throw new Error(`Unsupported node textHAlign: ${i.textHAlign}`);if(i.palette&&(W(i.palette,Zt,`palette for node "${i.id}"`),!(U[e]?.[i.palette.colour]?.[i.palette.tone]||null)))throw new Error(`Unsupported node palette: ${i.palette.tone||"unknown"} ${i.palette.colour||"unknown"}`);if(i.style?.width!==void 0)throw new Error("Node style.width is not supported; use style.strokeWidth.");if(Ft(i.style,Kt,`node "${i.id}"`),t.has(i.id))throw new Error(`Duplicate flowchart node id: ${i.id}`);if(t.add(i.id),i.children!==void 0&&!Array.isArray(i.children))throw new Error(`Children for node "${i.id}" must be a list.`);for(let a of i.children||[])o(a)};for(let i of r.nodes)o(i);for(let i of r.edges){if(W(i,yr,`edge "${i.source||"unknown"}" -> "${i.target||"unknown"}"`),!i.sourceAnchor)throw new Error(`Edge "${i.source||"unknown"}" -> "${i.target||"unknown"}" requires a sourceAnchor.`);if(!i.targetAnchor)throw new Error(`Edge "${i.source||"unknown"}" -> "${i.target||"unknown"}" requires a targetAnchor.`);if(!Y.includes(i.sourceAnchor))throw new Error(`Unsupported edge sourceAnchor: ${i.sourceAnchor}`);if(!Y.includes(i.targetAnchor))throw new Error(`Unsupported edge targetAnchor: ${i.targetAnchor}`);if(i.route!==void 0&&!Fe.includes(i.route))throw new Error(`Unsupported edge route: ${i.route}`);if(i.start!==void 0&&!G.includes(i.start))throw new Error(`Unsupported edge start marker: ${i.start}`);if(i.end!==void 0&&!G.includes(i.end))throw new Error(`Unsupported edge end marker: ${i.end}`);if(i.style?.width!==void 0)throw new Error("Edge style.width is not supported; use style.strokeWidth.");Ft(i.style,wr,`edge "${i.source||"unknown"}" -> "${i.target||"unknown"}"`)}let n=r.theme||"light";if(!se[n])throw new Error(`Unsupported diagram theme: ${n}`)}function Ar(r,e="classic"){if(r.nodes!==void 0||r.edges!==void 0)throw new Error("Sequence diagrams do not support flowchart sections.");if(!Array.isArray(r.participants)||!Array.isArray(r.messages))throw new Error("Sequence diagrams require participants and messages sections.");if(r.activations!==void 0&&!Array.isArray(r.activations))throw new Error("Sequence diagram activations must be a list.");if(r.notes!==void 0&&!Array.isArray(r.notes))throw new Error("Sequence diagram notes must be a list.");if(r.groups!==void 0&&!Array.isArray(r.groups))throw new Error("Sequence diagram groups must be a list.");if(r.canvas!==void 0&&(typeof r.canvas!="object"||Array.isArray(r.canvas)))throw new Error("Sequence canvas must be a mapping.");W(r.canvas,Fr,"sequence canvas");for(let s of["width","height","participantSpacing"]){let i=r.canvas?.[s];if(i!==void 0&&(!Number.isFinite(i)||Number(i)<=0))throw new Error(`Sequence canvas.${s} must be a positive number.`)}if(r.canvas?.participantSize!==void 0){if(typeof r.canvas.participantSize!="object"||Array.isArray(r.canvas.participantSize))throw new Error("Sequence canvas.participantSize must be a mapping.");W(r.canvas.participantSize,["width","height"],"sequence canvas participantSize");for(let s of["width","height"]){let i=r.canvas.participantSize[s];if(i!==void 0&&(!Number.isFinite(i)||Number(i)<=0))throw new Error(`Sequence canvas.participantSize.${s} must be a positive number.`)}}let t=new Set;for(let s of r.participants){if(W(s,Er,`participant "${s.id||"unknown"}"`),!s.id||!s.label)throw new Error("Every sequence participant requires an id and label.");if(s.kind!==void 0&&!Sr.includes(s.kind))throw new Error(`Unsupported sequence participant kind: ${s.kind}`);if(Xt(s,`participant "${s.id}"`,e),t.has(s.id))throw new Error(`Duplicate sequence participant id: ${s.id}`);t.add(s.id)}for(let[s,i]of r.messages.entries()){if(W(i,$r,`message ${s}`),!i.from||!i.to||!i.label)throw new Error(`Sequence message ${s} requires from, to, and label.`);if(!t.has(i.from)||!t.has(i.to))throw new Error(`Sequence message ${s} references an unknown participant.`);if(i.style!==void 0&&!kr.includes(i.style))throw new Error(`Unsupported sequence message style: ${i.style}`)}for(let[s,i]of(r.activations||[]).entries()){if(W(i,vr,`activation ${s}`),!i.participant||!Number.isInteger(i.from)||!Number.isInteger(i.to))throw new Error(`Sequence activation ${s} requires participant and integer from and to message positions.`);if(!t.has(i.participant))throw new Error(`Sequence activation ${s} references an unknown participant.`);if(i.from<1||i.to<i.from||i.to>r.messages.length)throw new Error(`Sequence activation ${s} range is out of bounds.`)}for(let[s,i]of(r.notes||[]).entries()){W(i,Nr,`note ${s}`);let a=i.after;if(!i.at||!Number.isInteger(a)||!i.label)throw new Error(`Sequence note ${s} requires at, after, and label.`);if(Xt(i,`note ${s}`,e),!t.has(i.at))throw new Error(`Sequence note ${s} references an unknown participant.`);if(a<0||a>r.messages.length)throw new Error(`Sequence note ${s} after position is out of bounds.`)}for(let[s,i]of(r.groups||[]).entries()){if(W(i,Dr,`group ${s}`),!i.label&&i.label!=="")throw new Error(`Sequence group ${s} requires a label.`);if(!Number.isInteger(i.from)||!Number.isInteger(i.to))throw new Error(`Sequence group ${s} requires integer from and to indices.`);if(i.from<1||i.to<i.from||i.to>r.messages.length)throw new Error(`Sequence group ${s} range is out of bounds.`)}let o=r.theme||"light";if(!se[o])throw new Error(`Unsupported diagram theme: ${o}`)}function Xt(r,e,t="classic"){if(r.palette&&(W(r.palette,Zt,`palette for ${e}`),!U[t]?.[String(r.palette.colour)]?.[String(r.palette.tone)]))throw new Error(`Unsupported ${e} palette: ${String(r.palette.tone||"unknown")} ${String(r.palette.colour||"unknown")}`);if(Ft(r.style,Kt,e),r.size){W(r.size,["width","height"],`size for ${e}`);for(let o of["width","height"]){let n=r.size[o];if(n!==void 0&&(!Number.isFinite(n)||Number(n)<=0))throw new Error(`${e} size.${o} must be a positive number.`)}}}function fe(r){return typeof r=="number"||typeof r=="boolean"?String(r):r&&typeof r=="object"?Object.keys(r).length?`{ ${Object.entries(r).map(([e,t])=>`${e}: ${fe(t)}`).join(", ")} }`:"{}":/^[\w./-]+(?: [\w./-]+)*$/.test(String(r))?String(r):JSON.stringify(String(r))}function ce(r,e=2){let t=Object.entries(r),[o,n]=t[0],s=[`${" ".repeat(e)}- ${o}: ${fe(n)}`];for(let[i,a]of t.slice(1))if(!(i==="children"&&Array.isArray(a)&&!a.length))if(i==="children"&&Array.isArray(a)){s.push(`${" ".repeat(e+2)}children:`);for(let d of a)s.push(...ce(d,e+4))}else s.push(`${" ".repeat(e+2)}${i}: ${fe(a)}`);return s}function ot(r){let e=[`type: ${fe(r.type)}`];for(let[t,o]of Object.entries(r))t==="type"||t==="canvas"||t==="nodes"||t==="edges"||t==="participants"||t==="messages"||t==="activations"||t==="notes"||t==="groups"||e.push(`${t}: ${fe(o)}`);if(r.type==="sequence"){if(r.canvas!==void 0){e.push("canvas:");for(let[t,o]of Object.entries(r.canvas))e.push(`  ${t}: ${fe(o)}`)}e.push("participants:");for(let t of r.participants||[])e.push(...ce(t));e.push("messages:");for(let t of r.messages||[])e.push(...ce(t));if(r.activations!==void 0){e.push("activations:");for(let t of r.activations||[])e.push(...ce(t))}if(r.notes!==void 0){e.push("notes:");for(let t of r.notes||[])e.push(...ce(t))}if(r.groups!==void 0){e.push("groups:");for(let t of r.groups||[])e.push(...ce(t))}return e.join(`
`)}e.push("canvas:");for(let[t,o]of Object.entries(r.canvas||{}))e.push(`  ${t}: ${fe(o)}`);e.push("nodes:");for(let t of r.nodes||[])e.push(...ce(t));e.push("edges:");for(let t of r.edges||[])e.push(...ce(t));return e.join(`
`)}function Jt(r){return{width:Number(r.size?.width)||A.width,height:Number(r.size?.height)||A.height}}function P(r){let e=[],t=(o,n,s,i)=>{for(let a of o){let d={x:s.x+(Number(a.position?.x)||0),y:s.y+(Number(a.position?.y)||0)};e.push({node:a,parent:n,siblings:o,position:d,depth:i}),t(a.children||[],a,d,i+1)}};return t(r.nodes,null,{x:0,y:0},0),e}function I(r,e){return P(r).find(t=>t.node.id===e)||null}function Mt(r,e){return P(r).find(t=>t.node===e)?.position||{x:0,y:0}}function V(r,e){return{...Mt(r,e),...Jt(e)}}function Qt(r,e){return(e.children||[]).some(t=>t===r||Qt(r,t))}function nt(r,e){var p;let t=I(r,e);if(!t)return null;let{node:o,siblings:n,position:s}=t,{width:i,height:a}=Jt(o),d={x:s.x+i/2,y:s.y+a/2},l=P(r).filter(m=>m.node!==o&&!Qt(m.node,o)).filter(m=>{let g=V(r,m.node);return d.x>=g.x&&d.x<=g.x+g.width&&d.y>=g.y&&d.y<=g.y+g.height}).reduce((m,g)=>!m||g.depth>=m.depth?g:m,null),u=l?(p=l.node).children||(p.children=[]):r.nodes;return n===u||(n.splice(n.indexOf(o),1),o.position={x:s.x-(l?.position.x||0),y:s.y-(l?.position.y||0)},u.push(o)),o}function xe(r,e="light"){let t=r.theme||e,o=se[t];if(!o)throw new Error(`Unsupported diagram theme: ${t}`);return o}function Te(r,e,t){return U[r]?.[t]?.[e]||null}function be(r,e){return{...r,...e||{}}}function le(r,e,t="light",o="classic"){let s=xe(r,t).node,i=e.palette?Te(o,e.palette.tone,e.palette.colour):null;return be(be(s,i),e.style)}function qe(r,e,t="light",o="classic"){let n=xe(r,t),s=e.palette?Te(o,e.palette.tone,e.palette.colour):null;return be(be(n.node,s),e.style)}function Ae(r,e,t="light"){let o=xe(r,t);return be(o.edge,e.style)}function Ge(r,e){let t=e==="start"?r.start:r.end;return typeof t=="string"&&G.includes(t)?t:Ve[e]}function J(r){let e=Number(r.canvas?.grid);return Number.isFinite(e)&&e>0?e:0}function _(r,e){return e?Math.round(r/e)*e:Math.round(r)}function Le(r,e,t){let o=_(r,t),n=t?Math.ceil(e/t)*t:e;return Math.max(n,o)}function er(r){return{x:Number(r.position?.x)||0,y:Number(r.position?.y)||0,width:Number(r.size?.width)||A.width,height:Number(r.size?.height)||A.height}}function Ce(r,e,t=40){let o=Number(r.canvas?.width)||1e3,n=Number(r.canvas?.height)||560,s=new Set(P(r).map(g=>g.node)),i=[...s];i.includes(e)||i.push(e);let a=g=>s.has(g)?V(r,g):er(g),d=i.map(a),c=Math.min(0,...d.map(g=>g.x)),l=Math.min(0,...d.map(g=>g.y)),u=c<0?t-c:0,p=l<0?t-l:0;if(u||p)for(let g of P(r).filter(h=>h.parent===null)){let h=g.node;h.position={...h.position,x:(Number(h.position?.x)||0)+u,y:(Number(h.position?.y)||0)+p}}let m=i.map(a);return r.canvas={...r.canvas,width:Math.max(o+u,...m.map(g=>g.x+g.width+t)),height:Math.max(n+p,...m.map(g=>g.y+g.height+t))},r}function tr(r,e){return r.x<e.x+e.width&&r.x+r.width>e.x&&r.y<e.y+e.height&&r.y+r.height>e.y}function Tt(r,e="new-node"){let t=s=>s.flatMap(i=>[i.id,...t(i.children||[])]),o=new Set(t(r));if(!o.has(e))return e;let n=2;for(;o.has(`${e}-${n}`);)n+=1;return`${e}-${n}`}function Lr(r,e){let t=e.replace(/[^a-z0-9]/gi,"").toLowerCase()||"node",o=1,n="";do n=`${t}${String(o).padStart(2,"0")}`,o+=1;while(r.has(n));return r.add(n),n}function Cr(r,e,t,o){let n=Number(r.canvas?.width)||1e3,s=Number(r.canvas?.height)||560,i=J(r),a=i||20,d={x:_(o.x,i),y:_(o.y,i)};for(let l=a;l<=Math.max(n,s);l+=a)for(let u of[{x:d.x+l,y:d.y+l},{x:d.x+l,y:d.y-l},{x:d.x-l,y:d.y+l},{x:d.x-l,y:d.y-l}])if(!(u.x<0||u.y<0||u.x+e>n||u.y+t>s)&&!P(r).some(({node:p})=>tr({...u,width:e,height:t},V(r,p))))return u;let c=Math.max(0,...P(r).map(({node:l})=>{let u=V(r,l);return u.x+u.width}));return{x:_(c+a,i),y:0}}function qt(r){let e=Number(r.canvas?.width)||1e3,t=Number(r.canvas?.height)||560,o=J(r),n={x:_(Math.max(0,(e-A.width)/2),o),y:_(Math.max(0,(t-A.height)/2),o)},s=o||20;for(let i=0;i<=Math.max(e,t);i+=s)for(let a of[{x:n.x+i,y:n.y},{x:n.x-i,y:n.y},{x:n.x,y:n.y+i},{x:n.x,y:n.y-i}])if(!(a.x<0||a.y<0||a.x+A.width>e||a.y+A.height>t)&&!P(r).some(({node:d})=>tr({...a,width:A.width,height:A.height},er(d))))return a;return n}function At(r){let e={id:Tt(r.nodes),label:A.label,shape:A.shape,position:qt(r),size:{width:A.width,height:A.height}};return r.nodes.push(e),e}function it(r,e){let t=I(r,e);if(!t)return null;let o=new Set(P(r).map(({node:c})=>c.id)),n=c=>({id:Lr(o,c.shape),label:c.label,shape:c.shape,...c.position?{position:{...c.position}}:{},...c.size?{size:{...c.size}}:{},...c.style?{style:{...c.style}}:{},...c.palette?{palette:{...c.palette}}:{},...c.subtitle!==void 0?{subtitle:c.subtitle}:{},...c.textVAlign!==void 0?{textVAlign:c.textVAlign}:{},...c.textHAlign!==void 0?{textHAlign:c.textHAlign}:{},...c.children?{children:c.children.map(n)}:{}}),s=n(t.node),i=V(r,t.node),a=Cr(r,Number(s.size?.width)||A.width,Number(s.size?.height)||A.height,i),d=t.parent?Mt(r,t.parent):{x:0,y:0};return s.position={x:a.x-d.x,y:a.y-d.y},t.siblings.push(s),Ce(r,s),s}function st(r,e,t,o,n){let s={source:e,target:o,sourceAnchor:t,targetAnchor:n,route:"orthogonal",end:"arrow"};return r.edges.push(s),s}function at(r,e,t,o){return e==="source"?(r.source=t,r.sourceAnchor=o):(r.target=t,r.targetAnchor=o),r}function dt(r,e){return e<0||e>=r.edges.length?null:r.edges.splice(e,1)[0]}function ct(r,e){let t=I(r,e);if(!t)return{node:null,deletedEdges:[]};let o=new Set([t.node,...t.node.children||[]].flatMap(function s(i){return[i,...(i.children||[]).flatMap(s)]}).map(s=>s.id)),n=r.edges.filter(s=>o.has(s.source)||o.has(s.target));return t.siblings.splice(t.siblings.indexOf(t.node),1),r.edges=r.edges.filter(s=>!o.has(s.source)&&!o.has(s.target)),{node:e,deletedEdges:n}}function ze(r,e){return r.label=String(e).trim()||r.label,r}function lt(r,e){return r.shape=e,r}function ut(r,e){return r.subtitle=String(e??"").trim(),r}function Ue(r,e,t){return e==="textVAlign"&&(t==="top"||t==="center")&&(r.textVAlign=t),e==="textHAlign"&&(t==="left"||t==="center"||t==="right")&&(r.textHAlign=t),r}function ye(r,e,t){return r.style={...r.style,[e]:t},r}function Ye(r,e,t,o="classic"){if(!Te(o,e,t))return r;let{fill:s,stroke:i,text:a,...d}=r.style||{};return Object.keys(d).length?r.style=d:delete r.style,r.palette={tone:e,colour:t},r}function rr(r){return r==="document"?Dt:Nt}function We(r){return{position:{x:Number(r.position?.x)||0,y:Number(r.position?.y)||0},size:{width:Number(r.size?.width)||A.width,height:Number(r.size?.height)||A.height},childPositions:new Map((r.children||[]).map(e=>[e,{x:Number(e.position?.x)||0,y:Number(e.position?.y)||0}]))}}function mt(r,e,t,o,n,s=We(e)){let i=J(r),a=rr(e.shape),d=t.endsWith("left"),c=t.startsWith("top"),l=Le(s.size.width+(d?-o:o),a.width,i),u=Le(s.size.height+(c?-n:n),a.height,i);if(e.shape==="circle"){let h=Math.max(l,u);l=h,u=h}let p={...e.position,x:d?s.position.x+s.size.width-l:s.position.x,y:c?s.position.y+s.size.height-u:s.position.y},m=s.position.x-p.x,g=s.position.y-p.y;for(let h of e.children||[]){let $=s.childPositions.get(h)||h.position||{x:0,y:0};h.position={...h.position,x:$.x+m,y:$.y+g}}return e.position=p,e.size={...e.size,width:l,height:u},e}function _e(r,e,t,o){let n=J(r),s=rr(e.shape),i=t==="width"?s.width:s.height,a=Le(Number(o)||i,i,n);return e.size=e.shape==="circle"?{...e.size,width:a,height:a}:{...e.size,[t]:a},e}function Pe(r,e){return r.label=String(e).trim(),r}function gt(r,e){return r.route=e,r}function Xe(r,e,t){return e==="source"?r.sourceAnchor=t:r.targetAnchor=t,r}function Ke(r,e,t){return r.style={...r.style,[e]:t},r}function Ze(r,e){let t=Math.max(1,Math.round(Number(e))||1);return r.style={...r.style,strokeWidth:t},r}function ht(r,e){return r.start=G.includes(e)?e:Ve.start,r}function pt(r,e){return r.end=G.includes(e)?e:Ve.end,r}function Lt(r){return Math.max(25,Number(r)||100)}function Q(r){return String(r??"").replace(/\r\n/g,`
`).split(`
`)}function X(r,e,t,o,n,s,i="middle"){if(!t.length)return"";let a=t.map((d,c)=>{let l=c===0?"":` dy="${o}"`;return`<tspan x="${r}"${l}>${b(d)||" "}</tspan>`}).join("");return`<text x="${r}" y="${e}" text-anchor="${i}" class="${n}" fill="${b(s)}">${a}</text>`}function ae(r,e,t,o,n){let s=r.shape,i=e+o/2,a=t+n/2,d={x:e+12,y:t+12,width:o-24,height:n-24},c={top:{x:i,y:t},right:{x:e+o,y:a},bottom:{x:i,y:t+n},left:{x:e,y:a}},l;if(s==="circle"){let u=Math.min(o,n),p=i-u/2,m=a-u/2,g=u/2;d.x=p+g*.3,d.y=m+g*.3,d.width=g*1.4,d.height=g*1.4,c.top.y=m,c.right.x=p+u,c.bottom.y=m+u,c.left.x=p,l=`<circle class="docdiagram-node-body" cx="${i}" cy="${a}" r="${g}"/>`}else if(s==="oval")d.x+=o*.1,d.width-=o*.2,l=`<ellipse class="docdiagram-node-body" cx="${i}" cy="${a}" rx="${o/2}" ry="${n/2}"/>`;else if(s==="database"){let u=Math.min(n*.22,18);d.y+=u/2,d.height-=u,l=`<path class="docdiagram-node-body" d="M ${e} ${t+u} C ${e} ${t-u/3} ${e+o} ${t-u/3} ${e+o} ${t+u} V ${t+n-u} C ${e+o} ${t+n+u/3} ${e} ${t+n+u/3} ${e} ${t+n-u} Z"/><path class="docdiagram-node-detail" d="M ${e} ${t+u} C ${e} ${t+u*2.3} ${e+o} ${t+u*2.3} ${e+o} ${t+u}" fill="none"/>`}else if(s==="diamond")d.x+=o*.25,d.y+=n*.25,d.width-=o*.5,d.height-=n*.5,c.top={x:i,y:t},c.right={x:e+o,y:a},c.bottom={x:i,y:t+n},c.left={x:e,y:a},l=`<polygon class="docdiagram-node-body" points="${i},${t} ${e+o},${a} ${i},${t+n} ${e},${a}"/>`;else if(s==="rhombus"){let u=Math.min(o*.2,n*.6);d.x+=u,d.width-=u*2,c.left.x=e+u/2,c.right.x=e+o-u/2,l=`<polygon class="docdiagram-node-body" points="${e+u},${t} ${e+o},${t} ${e+o-u},${t+n} ${e},${t+n}"/>`}else if(s==="flattened-hexagon"){let u=Math.min(o*.18,n*.7);d.x+=u,d.width-=u*2,l=`<polygon class="docdiagram-node-body" points="${e+u},${t} ${e+o-u},${t} ${e+o},${a} ${e+o-u},${t+n} ${e+u},${t+n} ${e},${a}"/>`}else if(s==="chevron"){let u=Math.min(o*.16,n*.45);d.x+=u*1.175,d.width-=u*1.35,c.left.x=e+u,l=`<polygon class="docdiagram-node-body" points="${e},${t} ${e+o-u},${t} ${e+o},${a} ${e+o-u},${t+n} ${e},${t+n} ${e+u},${a}"/>`}else if(s==="right-chevron"){let u=Math.min(o*.16,n*.45);d.width-=u,l=`<polygon class="docdiagram-node-body" points="${e},${t} ${e+o-u},${t} ${e+o},${a} ${e+o-u},${t+n} ${e},${t+n}"/>`}else if(s==="document"){let u=Math.max(12,Math.min(26,Math.min(o,n)*.18));d.width-=u*.45,d.y+=2,d.height-=2,l=`<path class="docdiagram-node-body" d="M ${e} ${t} H ${e+o-u} L ${e+o} ${t+u} V ${t+n} H ${e} Z M ${e+o-u} ${t} V ${t+u} H ${e+o}"/>`}else l=`<rect class="docdiagram-node-body" x="${e}" y="${t}" width="${o}" height="${n}" rx="12"/>`;return{bodyMarkup:l,textBounds:d,anchors:c}}function Ie(r,e,t,o,n){let s,i;typeof r=="number"?(s={x:r,y:e,width:t||0,height:o||0},i=n):(s=r,i=e);let a=20,d=15,c=Q(i.label),l=i.subtitle?Q(i.subtitle):[],u=l.length?6:0,p=c.length*a,m=l.length*d,g=p+u+m,h=i.textHAlign||"center",$=h==="left"?s.x:h==="right"?s.x+s.width:s.x+s.width/2,y=h==="left"?"start":h==="right"?"end":"middle",S=s.y+s.height/2,N=i.textVAlign==="top"?s.y:S-g/2;return{centerX:$,textAnchor:y,labelLines:c,subtitleLines:l,labelLineHeight:a,subtitleLineHeight:d,labelStartY:N+a*.72,subtitleStartY:N+p+u+d*.72}}function He(r,e,t){return r.bodyMarkup.replace("/>",` fill="${b(e.fill||"")}" stroke="${b(e.stroke||"")}" stroke-width="${t}"/>`).replace('class="docdiagram-node-detail"',`class="docdiagram-node-detail" stroke="${b(e.stroke||"")}" stroke-width="${t}"`)}function or(r){return{top:{x:0,y:-1},right:{x:1,y:0},bottom:{x:0,y:1},left:{x:-1,y:0}}[r]}function ue(r){return`${r.x} ${r.y}`}function zr(r){let e=r.slice(1).map((n,s)=>{let i=r[s];return{start:i,end:n,length:Math.hypot(n.x-i.x,n.y-i.y)}}),o=e.reduce((n,s)=>n+s.length,0)/2;for(let n of e){if(o<=n.length||n===e[e.length-1]){let s=n.length?o/n.length:0;return{x:n.start.x+(n.end.x-n.start.x)*s,y:n.start.y+(n.end.y-n.start.y)*s}}o-=n.length}return r[0]}function we(r,e,t,o,n="orthogonal"){let s=or(t),i=or(o),a=s.x!==0,d,c,l,u;if(n==="straight")d=`M ${ue(r)} L ${ue(e)}`,c={x:(r.x+e.x)/2,y:(r.y+e.y)/2},l={x:e.x-r.x,y:e.y-r.y},u=l;else if(n==="curved"){let p=Math.max(Math.abs(e.x-r.x),Math.abs(e.y-r.y),80),m=Math.min(p/2,140),g={x:r.x+s.x*m,y:r.y+s.y*m},h={x:e.x+i.x*m,y:e.y+i.y*m};d=`M ${ue(r)} C ${ue(g)} ${ue(h)} ${ue(e)}`,c={x:(r.x+3*g.x+3*h.x+e.x)/8,y:(r.y+3*g.y+3*h.y+e.y)/8},l={x:g.x-r.x,y:g.y-r.y},u={x:e.x-h.x,y:e.y-h.y}}else{let m={x:r.x+s.x*40,y:r.y+s.y*40},g={x:e.x+i.x*40,y:e.y+i.y*40},h=a?{x:g.x,y:m.y}:{x:m.x,y:g.y},$=[r,m,h,g,e],y=$.filter((N,x)=>x===0||N.x!==$[x-1].x||N.y!==$[x-1].y);y.length===1&&(y=[r,{x:r.x+s.x*40,y:r.y+s.y*40},e]),d=`M ${ue(y[0])}${y.slice(1).map(N=>` L ${ue(N)}`).join("")}`,c=zr(y),l={x:y[1].x-y[0].x,y:y[1].y-y[0].y};let S=y.slice(-2);u={x:S[1].x-S[0].x,y:S[1].y-S[0].y}}return{path:d,midpoint:c,startTangent:l,endTangent:u,hitPath:d}}function Ct(r){let e=Math.max(1,Number(r)||2),t=6+e*2.5,o=Math.max(t*.38,e/2+1);return{size:t,circleRadius:o}}function Je(r,e,t,o,n){let s=b(o),{size:i,circleRadius:a}=Ct(n),d=i/2;return e==="arrow"?`<marker id="${r}" markerWidth="${i}" markerHeight="${i}" refX="${i}" refY="${d}" markerUnits="userSpaceOnUse" orient="${t==="start"?"auto-start-reverse":"auto"}"><path fill="${s}" stroke="${s}" d="M 0 0 L ${i} ${d} L 0 ${i} z"/></marker>`:e==="circle"?`<marker id="${r}" markerWidth="${i}" markerHeight="${i}" refX="${d}" refY="${d}" markerUnits="userSpaceOnUse"><circle cx="${d}" cy="${d}" r="${a}" fill="${s}" stroke="${s}"/></marker>`:""}function zt(r){let e=r.replace(/\r\n/g,`
`).split(`
`),t=e.findIndex(s=>s.trim()!=="");if(t===-1||e[t]!=="---")return{content:r,frontmatter:{}};let o=e.indexOf("---",t+1);if(o===-1)return{content:r,frontmatter:{}};let n={};for(let s of e.slice(t+1,o)){if(!s.trim()||s.trimStart().startsWith("#"))continue;let i=s.match(/^([^:]+):\s*(.*)$/);if(!i)throw new Error(`Cannot parse document frontmatter line: ${s}`);n[i[1]]=Me(i[2])}return{content:e.slice(o+1).join(`
`),frontmatter:n}}function ft(r){let e=zt(r),t=String(e.frontmatter.theme||"light"),o=String(e.frontmatter.colourScheme||"classic");if(!se[t])throw new Error(`Unsupported document theme: ${t}`);if(!U[o])throw new Error(`Unsupported document colour scheme: ${o}`);return{...e,theme:t,colourScheme:o}}function Pt(r){let e=ft(r),t=e.content.replace(/\r\n/g,`
`).split(`
`),o=0;for(;o<t.length;){let s=t[o].replace(/^(?: {0,3}> ?)+/,"").match(/^```([\w-]*)\s*$/);if(!s){o+=1;continue}let i=t.slice(o+1).findIndex(d=>/^```\s*$/.test(d.replace(/^(?: {0,3}> ?)+/,"")));if(i===-1)throw new Error("Unclosed code block.");let a=o+i+1;if(s[1]==="diagram"){let d=t.slice(o+1,a).map(c=>c.replace(/^(?: {0,3}> ?)+/,"")).join(`
`);pe(d,e.colourScheme)}o=a+1}return e}function It(r,e){let t=r.replace(/\r\n/g,`
`),o=t.split(`
`),n=o.findIndex(c=>c.trim()!==""),s=n!==-1&&o[n]==="---",i=s?o.indexOf("---",n+1):-1;if(!s||i===-1)return`---
theme: ${e}
---
${t}`;let a=!1,d=o.slice(n+1,i).map(c=>{if(!c.trim()||c.trimStart().startsWith("#"))return c;let l=c.match(/^([^:]+):\s*(.*)$/);return l&&l[1]==="theme"?(a=!0,`theme: ${e}`):c});return a||d.push(`theme: ${e}`),[...o.slice(0,n+1),...d,...o.slice(i)].join(`
`)}function bt(r,e){let t=e.trim(),o=t?r.indexOf(t):-1;return o===-1?null:{start:o,end:o+t.length}}function xt(r,e){let t=Number.parseFloat(globalThis.getComputedStyle(r).lineHeight)||20,o=r.value.slice(0,e.start).split(`
`).length-1,n=Math.max(1,Math.floor(r.clientHeight/t));r.scrollTop=Math.max(0,(o-Math.floor(n/2))*t)}function Ht(r){let e=[],t="",o=!1,n=r.trim().replace(/^\||\|$/g,"");for(let s of n)o?(t+=s,o=!1):s==="\\"?o=!0:s==="|"?(e.push(t.trim()),t=""):t+=s;return e.push(t.trim()),e}function nr(r){let e=Ht(r);return!e.length||!e.every(t=>/^:?-{3,}:?$/.test(t))?null:e.map(t=>t.startsWith(":")&&t.endsWith(":")?"center":t.startsWith(":")?"left":t.endsWith(":")?"right":"")}function Ee(r){return r.match(/^(\s*)([-+*]|\d+[.)])\s+(.+)$/)}function Rt(r){let e=r.match(/^:::(section|panel|callout|grid|stack)(?:\s+\{(.*)\})?\s*$/);if(!e)return null;let t={},o=e[2];if(o!==void 0){let n=0,s=/\s*([a-z][\w-]*)=(?:"([^"]*)"|([^\s}]+))/gi,i;for(;i=s.exec(o);){if(i.index!==n||t[i[1]]!==void 0)return null;t[i[1]]=i[2]??i[3],n=s.lastIndex}if(o.slice(n).trim())return null}return{name:e[1],attributes:t}}function Pr(r){return/^:::(?:\s+.*)?$/.test(r)}function Ir(r,e,t){let o=1,n=!1;for(let s=e+1;s<t;s+=1){if(/^```/.test(r[s])){n=!n;continue}if(!n){if(Rt(r[s]))o+=1;else if(Pr(r[s])&&(o-=1,!o))return s}}return-1}function Hr(r){return/^#[\da-f]{3,8}$/i.test(r)}function Rr(r,e="classic"){let t=r.tone!==void 0||r.colour!==void 0;if(t&&(!["light","dark"].includes(r.tone)||!Yt.includes(r.colour)))return null;for(let i of["fill","stroke","text"])if(r[i]!==void 0&&!Hr(r[i]))return null;let o=t?Te(e,r.tone,r.colour):null,n=Object.fromEntries(["fill","stroke","text"].filter(i=>r[i]!==void 0).map(i=>[i,r[i]])),s=be(o||{},n);return Object.entries(s).filter(([,i])=>i!==void 0).map(([i,a])=>`--docdiagram-component-${i}:${a}`).join(";")}function yt(r,e=!1){let t=String(r).trim();if(t.startsWith("//")||t.startsWith("\\"))return!1;if(!t||t.startsWith("#")||t.startsWith("/")||t.startsWith("./")||t.startsWith("../")||t.startsWith("?")||e&&/^data:image\/(?:gif|jpeg|png|webp);base64,/i.test(t))return!0;let o=t.match(/^([a-z][a-z\d+.-]*):/i);return!o||["http","https","mailto"].includes(o[1].toLowerCase())}function me(r){let e=[],t=String(r).replace(/`([^`]+)`/g,(o,n)=>{let s=`\0${e.length}\0`;return e.push(`<code>${b(n)}</code>`),s});return t=b(t),t=t.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,(o,n,s)=>{let i=s.replace(/&amp;/g,"&");return yt(i,!0)?`<img src="${b(i)}" alt="${n}">`:`![${n}](${b(s)})`}),t=t.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,(o,n,s)=>{let i=s.replace(/&amp;/g,"&");return yt(i)?`<a href="${b(i)}">${n}</a>`:`[${n}](${b(s)})`}),t=t.replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g,"<strong>$2</strong>").replace(/~~(?=\S)([\s\S]*?\S)~~/g,"<del>$1</del>").replace(/(?<!\*)\*(?=\S)([\s\S]*?\S)\*(?!\*)/g,"<em>$1</em>").replace(/(?<!_)_(?=\S)([\s\S]*?\S)_(?!_)/g,"<em>$1</em>"),t.replace(/\u0000(\d+)\u0000/g,(o,n)=>e[Number(n)])}function jt(r,e={diagramIndex:0},t){let o=r.replace(/\r\n/g,`
`).split(`
`),n=t?.renderDiagram??((l,u)=>{throw new Error("renderDiagram callback is required for diagram blocks.")}),s=t?.documentColorScheme||"classic";function i(l){let u=o[l]||"";return!u.trim()||/^```/.test(u)||/^(#{1,6})\s+/.test(u)||/^ {0,3}&gt;|^ {0,3}>/.test(u)||/^ {0,3}(?:[-*_]\s*){3,}$/.test(u)||/^:::/.test(u)||!!Ee(u)||l+1<o.length&&!!nr(o[l+1])}function a(l,u){let p=Ee(o[l]),m=/^\d/.test(p[2]),g=[],h=l,$=m?Number.parseInt(p[2],10):null;for(;h<o.length;){let x=Ee(o[h]);if(!x||x[1].length!==u||/^\d/.test(x[2])!==m)break;let k={content:[x[3]],children:[]};for(h+=1;h<o.length;){let w=Ee(o[h]);if(w&&w[1].length>u){let v=a(h,w[1].length);k.children.push(v.html),h=v.index;continue}if(!o[h].trim()){h+=1;let v=h<o.length?Ee(o[h]):null;if(h>=o.length||!v||v[1].length<=u)break;continue}if(/^\s+/.test(o[h])&&!Ee(o[h])){k.content.push(o[h].trim()),h+=1;continue}break}g.push(k)}let y=m?"ol":"ul",S=m&&$!==1?` start="${$}"`:"",N=g.map(x=>{let k=!m&&x.content.length===1&&x.content[0].match(/^\[([ xX])\]\s+(.*)$/),w=k?`<input type="checkbox" disabled${k[1].toLowerCase()==="x"?" checked":""}> ${me(k[2])}`:me(x.content.join(" "));return`<li${k?' class="docdiagram-task-list-item"':""}>${w}${x.children.join("")}</li>`}).join("");return{html:`<${y}${S}>${N}</${y}>`,index:h}}function d(l,u){let p=Rt(o[l]),m=p?Ir(o,l,u):-1;if(!p||m===-1)return null;let{name:g,attributes:h}=p,$={section:["title","tone","colour","fill","stroke","text"],panel:["title","tone","colour","fill","stroke","text"],callout:["kind","title","tone","colour","fill","stroke","text"],grid:["columns"],stack:[]};if(Object.keys(h).some(k=>!$[g].includes(k)))return null;if(g==="grid"){let k=_t[h.columns];if(!k)return null;let w=[],v=l+1;for(;v<m;){if(!o[v].trim()){v+=1;continue}let T=Rt(o[v]);if(!T||!["panel","callout","stack"].includes(T.name))return null;let C=d(v,m);if(!C)return null;w.push(`<div class="docdiagram-grid-item">${C.html}</div>`),v=C.next}return{html:`<div class="docdiagram-grid" style="--docdiagram-grid-columns:${k}">${w.join("")}</div>`,next:m+1}}if(g==="stack")return Object.keys(h).length?null:{html:`<div class="docdiagram-stack">${c(l+1,m)}</div>`,next:m+1};let y=Rr(h,s);if(y===null||g==="callout"&&h.kind!==void 0&&!Wt.includes(h.kind))return null;let S=h.title?`<div class="docdiagram-component-title">${me(h.title)}</div>`:"",N=c(l+1,m),x=`docdiagram-component${g==="callout"?"":` docdiagram-${g}`}${y?" docdiagram-component-styled":""}`;if(g==="callout"){let k=h.kind||"info";return{html:`<aside class="${x} docdiagram-callout docdiagram-callout-${k}"${y?` style="${y}"`:""} aria-label="${b(h.title||k)} callout"><div class="docdiagram-callout-kind">${b(k)}</div>${S}${N}</aside>`,next:m+1}}return{html:`<section class="${x}"${y?` style="${y}"`:""}>${S}${N}</section>`,next:m+1}}function c(l=0,u=o.length){let p=[],m=l;for(;m<u;){let g=o[m];if(!g.trim()){m+=1;continue}if(/^:::/.test(g)){let x=d(m,u);x?(p.push(x.html),m=x.next):(p.push(`<pre class="docdiagram-literal-source"><code>${b(g)}</code></pre>`),m+=1);continue}let h=g.match(/^```([\w-]*)\s*$/);if(h){let x=o.slice(m+1,u).findIndex(v=>/^```\s*$/.test(v));if(x===-1){p.push('<section class="docdiagram-error"><strong>Unclosed code block.</strong></section>');break}let k=m+x+1,w=o.slice(m+1,k).join(`
`);if(h[1]==="diagram")p.push(n(w,e.diagramIndex)),e.diagramIndex+=1;else{let v=h[1]?` class="language-${b(h[1])}"`:"";p.push(`<pre><code${v}>${b(w)}</code></pre>`)}m=k+1;continue}let $=g.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);if($){p.push(`<h${$[1].length}>${me($[2])}</h${$[1].length}>`),m+=1;continue}if(/^ {0,3}(?:[-*_]\s*){3,}$/.test(g)){p.push("<hr>"),m+=1;continue}if(/^ {0,3}>/.test(g)){let x=[];for(;m<u&&/^ {0,3}>/.test(o[m]);)x.push(o[m].replace(/^ {0,3}> ?/,"")),m+=1;p.push(`<blockquote>${jt(x.join(`
`),e,t)}</blockquote>`);continue}let y=Ee(g);if(y){let x=a(m,y[1].length);p.push(x.html),m=x.index;continue}let S=m+1<u?nr(o[m+1]):null;if(S){let x=Ht(g),k=[];for(m+=2;m<u&&o[m].includes("|")&&o[m].trim();)k.push(Ht(o[m])),m+=1;let w=(v,T)=>T.map((C,R)=>`<${v}${S[R]?` style="text-align:${S[R]}"`:""}>${me(C||"")}</${v}>`).join("");p.push(`<table><thead><tr>${w("th",x)}</tr></thead><tbody>${k.map(v=>`<tr>${w("td",v)}</tr>`).join("")}</tbody></table>`);continue}let N=[g.trim()];for(m+=1;m<u&&!i(m);)N.push(o[m].trim()),m+=1;p.push(`<p>${me(N.join(" "))}</p>`)}return p.join("")}return c()}function Bt(r,e,t){let o=e!=="none",n=e==="flowchart";return['<div class="docdiagram-diagram-toolbar" role="toolbar" aria-label="Diagram controls">',`<button type="button" class="docdiagram-icon-button docdiagram-zoom-in" data-diagram-index="${r}" aria-label="Zoom in" title="Zoom in">+</button>`,`<button type="button" class="docdiagram-icon-button docdiagram-zoom-out" data-diagram-index="${r}" aria-label="Zoom out" title="Zoom out">\u2212</button>`,`<button type="button" class="docdiagram-icon-button docdiagram-fit" data-diagram-index="${r}" aria-label="Zoom to fit" title="Zoom to fit">\u22A1</button>`,o?t.editingDiagramIndex===r?`<button type="button" class="docdiagram-icon-button docdiagram-done-editing" aria-label="Done editing" title="Done editing">\u2713</button><button type="button" class="docdiagram-icon-button docdiagram-cancel-editing" aria-label="Cancel editing and discard changes" title="Cancel editing and discard changes">\xD7</button>${n?`<button type="button" class="docdiagram-icon-button docdiagram-create-node" data-diagram-index="${r}" aria-label="New node" title="New node">+</button>`:""}`:t.editingDiagramIndex===null?'<button type="button" class="docdiagram-icon-button docdiagram-start-editing" aria-label="Edit diagram" title="Edit diagram">\u270E</button>':"":"","</div>"].join("")}function ir(r,e,t,o){let{selectedNode:n,selectedEdge:s,editingNode:i,editingEdge:a,connectionDrag:d,diagramZooms:c}=t,l=t.editingDiagramIndex===e,u=P(r),p=new Map(u.map(w=>[w.node.id,w])),m=16,g=[],h=[],$=r.edges.map((w,v)=>{let T=p.get(w.source),C=p.get(w.target);if(!T||!C)return"";let R=T.node,re=C.node,de=ae(R,T.position.x,T.position.y,Number(R.size?.width)||190,Number(R.size?.height)||80),te=ae(re,C.position.x,C.position.y,Number(re.size?.width)||190,Number(re.size?.height)||80),oe=w.sourceAnchor||"right",ve=w.targetAnchor||"left",z=de.anchors[oe],F=te.anchors[ve],j=w.route||"orthogonal",L=we(z,F,oe,ve,j),Z=L.midpoint.x,et=L.midpoint.y-10,ge=Ae(r,w,t.documentTheme),he=s?.diagramIndex===e&&s.edgeIndex===v,$t=he&&a?.diagramIndex===e&&a.edgeIndex===v,Re=(Number(ge.strokeWidth)||2)+(he?2:0),tt=220,rt=72,je=w.label?Q(w.label):[],kt=je.length*m,vt=et-kt/2+m*.72,Be=Ge(w,"start"),f=Ge(w,"end"),E=`docdiagram-marker-${e}-${v}-start`,q=`docdiagram-marker-${e}-${v}-end`;Be!=="none"&&g.push(Je(E,Be,"start",ge.stroke||"",Re)),f!=="none"&&g.push(Je(q,f,"end",ge.stroke||"",Re)),he&&l&&h.push(`<circle class="docdiagram-edge-endpoint" data-diagram-index="${e}" data-edge-index="${v}" data-endpoint="source" cx="${z.x}" cy="${z.y}" r="7"/>`,`<circle class="docdiagram-edge-endpoint" data-diagram-index="${e}" data-edge-index="${v}" data-endpoint="target" cx="${F.x}" cy="${F.y}" r="7"/>`);let M=[Be!=="none"?` marker-start="url(#${E})"`:"",f!=="none"?` marker-end="url(#${q})"`:""].join("");return[`<g class="docdiagram-edge-group${he?" docdiagram-edge-selected":""}" data-diagram-index="${e}" data-edge-index="${v}">`,`<path class="docdiagram-edge-hit" d="${L.hitPath}" fill="none" stroke="transparent" stroke-width="16"/>`,`<path class="docdiagram-edge" d="${L.path}"${M} stroke="${b(ge.stroke||"")}" stroke-width="${Re}"/>`,$t?`<foreignObject class="docdiagram-inline-editor-host" x="${Z-tt/2}" y="${et-rt/2}" width="${tt}" height="${rt}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-edge" aria-label="Edit edge label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${b(w.label||"")}</textarea></foreignObject>`:je.length?X(Z,vt,je,m,"docdiagram-edge-label",ge.text||""):"","</g>"].join("")}).join(""),y=u.map(({node:w,position:v})=>{let T=v.x,C=v.y,R=Number(w.size?.width)||190,re=Number(w.size?.height)||80,de=le(r,w,t.documentTheme,t.documentColorScheme),te=n?.diagramIndex===e&&n.nodeId===w.id,oe=te&&i?.diagramIndex===e&&i.nodeId===w.id,ve=(Number(de.strokeWidth)||2)+(te?2:0),z=ae(w,T,C,R,re),F=Ie(z.textBounds,w);return[`<g class="docdiagram-node${te?" docdiagram-node-selected":""}" data-diagram-index="${e}" data-node-id="${b(w.id)}">`,He(z,de,ve),oe?`<foreignObject class="docdiagram-inline-editor-host" x="${z.textBounds.x}" y="${z.textBounds.y}" width="${z.textBounds.width}" height="${z.textBounds.height}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-node" aria-label="Edit node label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${b(w.label)}</textarea></foreignObject>`:X(F.centerX,F.labelStartY,F.labelLines,F.labelLineHeight,"docdiagram-node-label",de.text||"",F.textAnchor),!oe&&F.subtitleLines.length?X(F.centerX,F.subtitleStartY,F.subtitleLines,F.subtitleLineHeight,"docdiagram-node-subtitle",de.text||"",F.textAnchor):"",te&&l&&!oe?[["top-left",T-7,C-7],["top-right",T+R-7,C-7],["bottom-left",T-7,C+re-7],["bottom-right",T+R-7,C+re-7]].map(([j,L,Z])=>`<rect class="docdiagram-resize-handle" data-resize-corner="${j}" x="${L}" y="${Z}" width="14" height="14" rx="3"/>`).join(""):"",te&&l&&!oe?Y.map(j=>{let L=z.anchors[j];return`<circle class="docdiagram-connection-port" data-anchor="${j}" cx="${L.x}" cy="${L.y}" r="7" aria-label="${j} connection port"/>`}).join(""):"","</g>"].join("")}).join(""),S=Number(r.canvas.width)||1e3,N=Number(r.canvas.height)||560,x=t.diagramViewportHeights.get(e),k=x?` style="box-sizing: border-box; height: ${x}px"`:"";return[`<figure class="docdiagram" data-diagram-index="${e}" data-diagram-type="flowchart" data-editing="${l}"${k}>`,o(e,"flowchart",t),`<svg viewBox="0 0 ${S} ${N}" role="img" aria-label="Architecture diagram" data-diagram-index="${e}" style="width: ${c.get(e)||100}%">`,`<defs>${g.join("")}</defs>`,y,$,d?.diagramIndex===e?`<path class="docdiagram-connection-preview${d.invalid?" docdiagram-connection-invalid":""}" d="${we(d.start,d.current,d.sourceAnchor,d.targetAnchor||d.sourceAnchor,"straight").path}"/>`:"",h.join(""),"</svg>","</figure>"].join("")}function sr(r,e,t,o){let n=xe(r,t.documentTheme),s=Number(r.canvas?.width)||1e3,i=Number(r.canvas?.height)||560,a=r.participants||[],d=r.messages||[],c=r.activations||[],l=r.notes||[],u=r.groups||[],p=90,m=90,g=28,h=Number(r.canvas?.participantSize?.width)||180,$=Number(r.canvas?.participantSize?.height)||42,y=Number(r.canvas?.participantSpacing)||220,S=16,N=74+Math.max(0,...a.filter(f=>f.kind==="actor").map(f=>Q(f.label||"").length-1))*S,x=48,k=18,w=56,v=t.diagramViewportHeights.get(e),T=v?` style="box-sizing: border-box; height: ${v}px"`:"",C=`docdiagram-sequence-arrow-${e}`,R=g+N+12,re=a[0],de=a[a.length-1],te=Number(re?.size?.width)||h,oe=Number(de?.size?.width)||h,ve=a.length>1?te/2+y*(a.length-1)+oe/2:h+p+m,z=Math.max(s,ve,p+m),F=new Map;a.forEach((f,E)=>{F.set(f.id,a.length===1?z/2:te/2+y*E)});let j=R+40,L=d.map((f,E)=>({...f,index:E,y:j+E*w})),Z=l.map(f=>{let E=Q(f.label||""),q=Math.max(x,E.length*16+22,Number(f.size?.height)||0),B=((f.after?L[Number(f.after)-1]:null)?.y||R)+k,ne=F.get(f.at||"")||z/2,O=Math.max(160,Number(f.size?.width)||0),ie=Math.min(z-O/2-24,Math.max(O/2+24,ne));return{...f,lines:E,x:ie-O/2,y:B,width:O,height:q}}),et=u.map(f=>L[f.to-1]?.y+34||j),ge=Math.max(R+140,Z.length?Z[Z.length-1].y+Z[Z.length-1].height:0,L.length?L[L.length-1].y+44:j,...et),he=Math.max(i,ge+56),$t=he-36,Re=c.map((f,E)=>({participantId:f.participant,depth:c.slice(0,E).filter(q=>q.participant===f.participant&&q.from<=f.from&&q.to>=f.from).length,startY:(L[f.from-1]?.y||j)-10,endY:(L[f.to-1]?.y||j)+18})),tt=a.map(f=>{let E=F.get(f.id)||0,q=Q(f.label||""),M=qe(r,f,t.documentTheme,t.documentColorScheme),B=Number(f.size?.width)||h,ne=Number(f.size?.height)||$;if(f.kind==="actor"){let O=g+10,ie=O+18,Ne=ie+18;return[`<g class="docdiagram-sequence-participant docdiagram-sequence-actor" data-diagram-index="${e}" data-participant-id="${b(f.id)}">`,`<circle cx="${E}" cy="${O}" r="8" fill="none" stroke="${b(M.stroke||"")}" stroke-width="${Number(M.strokeWidth)||2}"/>`,`<path d="M ${E} ${O+8} V ${Ne} M ${E-14} ${ie} H ${E+14} M ${E} ${Ne} L ${E-12} ${Ne+18} M ${E} ${Ne} L ${E+12} ${Ne+18}" fill="none" stroke="${b(M.stroke||"")}" stroke-width="${Number(M.strokeWidth)||2}" stroke-linecap="round" stroke-linejoin="round"/>`,X(E,g+N-4-(q.length-1)*S,q,S,"docdiagram-node-label",M.text||""),"</g>"].join("")}return[`<g class="docdiagram-sequence-participant" data-diagram-index="${e}" data-participant-id="${b(f.id)}">`,`<rect x="${E-B/2}" y="${g}" width="${B}" height="${ne}" rx="12" fill="${b(M.fill||"")}" stroke="${b(M.stroke||"")}" stroke-width="${Number(M.strokeWidth)||2}"/>`,X(E,g+ne/2+6-(q.length-1)*S/2,q,S,"docdiagram-node-label",M.text||""),"</g>"].join("")}).join(""),rt=a.map(f=>{let E=F.get(f.id)||0;return`<path class="docdiagram-sequence-lifeline" d="M ${E} ${R} L ${E} ${$t}" fill="none" stroke="${b(n.edge.stroke)}" stroke-width="2" stroke-dasharray="8 6"/>`}).join(""),je=u.map(f=>{let E=(L[f.from-1]?.y||j)-24,q=(L[f.to-1]?.y||j)+30,M=Math.min(220,Math.max(110,String(f.label).length*8+28));return['<g class="docdiagram-sequence-group">',`<rect x="42" y="${E}" width="${z-84}" height="${q-E}" rx="12" fill="none" stroke="${b(n.edge.stroke)}" stroke-width="2" stroke-dasharray="10 6" opacity="0.8"/>`,`<rect x="54" y="${E-16}" width="${M}" height="24" rx="6" fill="${b(n.node.fill)}" stroke="${b(n.edge.stroke)}" stroke-width="1.5"/>`,`<text x="${54+M/2}" y="${E+1}" text-anchor="middle" class="docdiagram-edge-label" fill="${b(n.edge.text)}">${b(f.label||"")}</text>`,"</g>"].join("")}).join(""),kt=Z.map((f,E)=>{let M=f.y+18,B=qe(r,f,t.documentTheme,t.documentColorScheme);return[`<g class="docdiagram-sequence-note" data-diagram-index="${e}" data-note-index="${E}">`,`<rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" rx="10" fill="${b(B.fill||"")}" stroke="${b(B.stroke||"")}" stroke-width="${Number(B.strokeWidth)||2}"/>`,X(f.x+f.width/2,M,f.lines,16,"docdiagram-node-subtitle",B.text||""),"</g>"].join("")}).join(""),vt=Re.map(f=>{let E=F.get(f.participantId)||0,q=f.depth*7,M=12,B=Math.max(20,f.endY-f.startY),ne=a.find(ie=>ie.id===f.participantId),O=ne?qe(r,ne,t.documentTheme,t.documentColorScheme):n.node;return`<rect class="docdiagram-sequence-activation" x="${E-M/2+q}" y="${f.startY}" width="${M}" height="${B}" rx="4" fill="${b(O.fill||"")}" stroke="${b(O.stroke||"")}" stroke-width="${Number(O.strokeWidth)||2}"/>`}).join(""),Be=L.map(f=>{let E=F.get(f.from)||0,q=F.get(f.to)||0,M=f.style==="dashed",B=Q(f.label||""),ne=B.length*15,O=f.y-12-ne/2+11,ie=` marker-end="url(#${C})"`;return f.from===f.to?[`<g class="docdiagram-sequence-message" data-diagram-index="${e}" data-message-index="${f.index}">`,`<path d="M ${E} ${f.y} L ${E+48} ${f.y} L ${E+48} ${f.y+28} L ${E} ${f.y+28}" fill="none" stroke="${b(n.edge.stroke)}" stroke-width="2"${ie}${M?' stroke-dasharray="8 5"':""}/>`,X(E+48/2,O,B,15,"docdiagram-edge-label",n.edge.text),"</g>"].join(""):[`<g class="docdiagram-sequence-message" data-diagram-index="${e}" data-message-index="${f.index}">`,`<path d="M ${E} ${f.y} L ${q} ${f.y}" fill="none" stroke="${b(n.edge.stroke)}" stroke-width="2"${ie}${M?' stroke-dasharray="8 5"':""}/>`,X((E+q)/2,O,B,15,"docdiagram-edge-label",n.edge.text),"</g>"].join("")}).join("");return[`<figure class="docdiagram" data-diagram-index="${e}" data-diagram-type="sequence" data-editing="${t.editingDiagramIndex===e}"${T}>`,o(e,"sequence",t),`<svg viewBox="0 0 ${z} ${he}" role="img" aria-label="Sequence diagram" data-diagram-index="${e}" style="width: ${t.diagramZooms.get(e)||100}%">`,`<defs>${Je(C,"arrow","end",n.edge.stroke,2)}</defs>`,je,tt,rt,vt,kt,Be,"</svg>","</figure>"].join("")}function ar(r,e,t){try{let o=pe(r,t.colourScheme);return t.onDiagram(e,o),o.type==="sequence"?sr(o,e,t.state,Bt):ir(o,e,t.state,Bt)}catch(o){let n=o instanceof Error?o.message:String(o);return`<section class="docdiagram-error"><strong>Diagram could not be rendered.</strong><br>${b(n)}</section>`}}function dr(){let r=document.createElement("style");r.textContent=`
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
      border-left-width: 8px;
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
      min-height: 16rem;
      overflow: auto;
      padding: 1rem;
      position: relative;
      resize: vertical;
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
      fill: #ffffff;
      stroke: #3574c7;
      stroke-width: 2;
    }
    .docdiagram-resize-handle[data-resize-corner="top-left"],
    .docdiagram-resize-handle[data-resize-corner="bottom-right"] {
      cursor: nwse-resize;
    }
    .docdiagram-resize-handle[data-resize-corner="top-right"],
    .docdiagram-resize-handle[data-resize-corner="bottom-left"] {
      cursor: nesw-resize;
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
  `,document.head.append(r)}function cr(){return{diagramModels:[],editingDiagramIndex:null,selectedNode:null,selectedEdge:null,selectedSequenceElement:null,editingNode:null,editingEdge:null,connectionDrag:null,documentTheme:"light",documentColorScheme:"classic",documentFormat:"centered",savedSource:"",editSessionDiagram:null,diagramZooms:new Map,diagramViewportHeights:new Map}}function Se(r){r.selectedNode=null,r.selectedEdge=null,r.selectedSequenceElement=null,r.editingNode=null,r.editingEdge=null}function $e(r,e){return r.editingDiagramIndex===e}function ee(r,e){return r.target instanceof Element?r.target.closest(e):null}function K(r,e){let t=r.diagramModels[e];return t?.type==="flowchart"?t:null}function H(r){return Number(r)}var wt=class{constructor(e){this.host=e}enableCanvasPanning(){for(let e of this.host.outputElement.querySelectorAll(".docdiagram svg"))e.addEventListener("pointerdown",t=>{t.target===e&&this.beginCanvasPan(e,t)})}enableSequenceSelection(){for(let e of this.host.outputElement.querySelectorAll('.docdiagram[data-diagram-type="sequence"] svg'))e.addEventListener("click",t=>{if(!$e(this.host.state,H(e.dataset.diagramIndex)))return;let o=ee(t,".docdiagram-sequence-participant"),n=ee(t,".docdiagram-sequence-note"),s=ee(t,".docdiagram-sequence-message");o?this.host.state.selectedSequenceElement={diagramIndex:H(o.getAttribute("data-diagram-index")||void 0),kind:"participant",id:o.getAttribute("data-participant-id")||""}:n?this.host.state.selectedSequenceElement={diagramIndex:H(n.getAttribute("data-diagram-index")||void 0),kind:"note",index:H(n.getAttribute("data-note-index")||void 0)}:s?this.host.state.selectedSequenceElement={diagramIndex:H(s.getAttribute("data-diagram-index")||void 0),kind:"message",index:H(s.getAttribute("data-message-index")||void 0)}:this.host.state.selectedSequenceElement=null,this.host.state.selectedNode=null,this.host.state.selectedEdge=null,this.host.renderDocument()})}enableEditing(){for(let e of this.host.outputElement.querySelectorAll(".docdiagram svg"))$e(this.host.state,H(e.dataset.diagramIndex))&&(e.addEventListener("click",t=>this.handleDiagramClick(e,t)),e.addEventListener("pointerdown",t=>this.handleDiagramPointerDown(e,t)));for(let e of this.host.outputElement.querySelectorAll(".docdiagram-inline-editor"))this.wireInlineEditor(e);this.host.outputElement.dataset.editingShortcutsBound||(this.host.outputElement.dataset.editingShortcutsBound="true",document.addEventListener("keydown",e=>{this.host.state.editingDiagramIndex!==null&&(e.target instanceof Element&&e.target.matches("input, textarea, select, [contenteditable]")||((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="d"&&this.host.state.selectedNode?(e.preventDefault(),this.duplicateSelectedNode()):(e.key==="Delete"||e.key==="Backspace")&&(this.host.state.selectedNode||this.host.state.selectedEdge)&&(e.preventDefault(),this.deleteSelected())))}))}selectNode(e,t){this.host.state.selectedNode={diagramIndex:e,nodeId:t},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}selectEdge(e,t){this.host.state.selectedEdge={diagramIndex:e,edgeIndex:t},this.host.state.selectedNode=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}handleDiagramClick(e,t){if(ee(t,".docdiagram-inline-editor"))return;let o=ee(t,".docdiagram-node");if(o){this.selectNode(H(o.getAttribute("data-diagram-index")||void 0),o.getAttribute("data-node-id")||"");return}let n=ee(t,".docdiagram-edge-group");if(n){let s=H(n.getAttribute("data-diagram-index")||void 0),i=H(n.getAttribute("data-edge-index")||void 0),a=this.host.state.selectedEdge?.diagramIndex===s&&this.host.state.selectedEdge.edgeIndex===i,d=this.host.state.editingEdge?.diagramIndex===s&&this.host.state.editingEdge.edgeIndex===i;a&&!d?(this.host.state.editingEdge={diagramIndex:s,edgeIndex:i},this.host.renderDocument()):this.selectEdge(s,i);return}(this.host.state.selectedNode||this.host.state.selectedEdge)&&this.clearSelection()}handleDiagramPointerDown(e,t){let o=ee(t,".docdiagram-connection-port");if(o){let y=o.closest(".docdiagram-node"),S=H(y?.getAttribute("data-diagram-index")||e.dataset.diagramIndex),N=o.getAttribute("data-node-id")||y?.getAttribute("data-node-id")||"",x=K(this.host.state,S),k=x?I(x,N)?.node:null,w=o.getAttribute("data-anchor")||"";k&&this.beginConnectionDrag(e,t,{diagramIndex:S,sourceNodeId:N,sourceAnchor:w,start:this.getNodePortPoint(k,w),current:this.getNodePortPoint(k,w),invalid:!1});return}let n=ee(t,".docdiagram-edge-endpoint");if(n){let y=H(n.getAttribute("data-diagram-index")||void 0),S=H(n.getAttribute("data-edge-index")||void 0),N=K(this.host.state,y),x=N?.edges[S],k=n.getAttribute("data-endpoint");if(!x||k!=="source"&&k!=="target")return;let w=k==="source"?x.source:x.target,v=k==="source"?x.sourceAnchor:x.targetAnchor,T=N?I(N,w)?.node:null;if(!T||!v)return;this.beginConnectionDrag(e,t,{diagramIndex:y,edgeIndex:S,endpoint:k,reconnect:!0,sourceNodeId:w,sourceAnchor:v,start:this.getNodePortPoint(T,v),current:this.getNodePortPoint(T,v),invalid:!1});return}let s=ee(t,".docdiagram-resize-handle");if(s){let y=s.closest(".docdiagram-node"),S=s.getAttribute("data-resize-corner");y&&(S==="top-left"||S==="top-right"||S==="bottom-left"||S==="bottom-right")&&this.resizeNode(e,t,y,S);return}if(ee(t,".docdiagram-inline-editor"))return;let i=ee(t,".docdiagram-node");if(!i)return;let a=H(i.getAttribute("data-diagram-index")||void 0),d=i.getAttribute("data-node-id")||"",c=K(this.host.state,a),l=c?I(c,d)?.node:null;if(!c||!l)return;t.preventDefault();let u=this.svgPoint(e,t),p=V(c,l),m=J(c),g=!1;this.capturePointer(e,t);let h=y=>{let S=this.svgPoint(e,y),N=_(p.x+S.x-u.x,m),x=_(p.y+S.y-u.y,m);g=g||N!==p.x||x!==p.y,i.setAttribute("transform",`translate(${N-p.x} ${x-p.y})`);let k=I(c,d);l.position={...l.position,x:N-(k?.parent?V(c,k.parent).x:0),y:x-(k?.parent?V(c,k.parent).y:0)}},$=y=>{this.releasePointer(e,y),e.removeEventListener("pointermove",h),e.removeEventListener("pointerup",$),e.removeEventListener("pointercancel",$),g?(nt(c,d),Ce(c,l),this.host.state.selectedNode={diagramIndex:a,nodeId:d},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.persistDiagramModels(),this.host.renderDocument()):this.host.state.selectedNode?.diagramIndex===a&&this.host.state.selectedNode.nodeId===d?(this.host.state.editingNode={diagramIndex:a,nodeId:d},this.host.renderDocument()):this.selectNode(a,d)};e.addEventListener("pointermove",h),e.addEventListener("pointerup",$),e.addEventListener("pointercancel",$)}getSelectedNode(){let e=this.host.state.selectedNode,t=e?K(this.host.state,e.diagramIndex):null;return e&&t&&I(t,e.nodeId)?.node||null}getSelectedEdge(){let e=this.host.state.selectedEdge,t=e?K(this.host.state,e.diagramIndex):null;return e&&t?.edges[e.edgeIndex]||null}clearSelection(){this.host.state.selectedNode=null,this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}deleteSelected(){let e=this.host.state.selectedNode,t=this.host.state.selectedEdge;if(e){let o=K(this.host.state,e.diagramIndex);if(!o)return;let n=o.edges.filter(s=>s.source===e.nodeId||s.target===e.nodeId);if(n.length&&!globalThis.confirm(`Delete this node and its ${n.length} attached connector${n.length===1?"":"s"}?`))return;ct(o,e.nodeId)}else if(t){let o=K(this.host.state,t.diagramIndex);if(!o)return;dt(o,t.edgeIndex)}else return;Se(this.host.state),this.host.persistDiagramModels(),this.host.renderDocument()}duplicateSelectedNode(){let e=this.host.state.selectedNode;if(!e)return;let t=K(this.host.state,e.diagramIndex);if(!t)return;let o=it(t,e.nodeId);o&&(this.host.state.selectedNode={diagramIndex:e.diagramIndex,nodeId:o.id},this.host.state.selectedEdge=null,this.host.persistDiagramModels(),this.host.renderDocument())}wireInlineEditor(e){let t=!1,o=()=>{if(!t){if(t=!0,e.classList.contains("docdiagram-inline-editor-edge")){let s=this.getSelectedEdge();s&&(Pe(s,e.value),this.host.persistDiagramModels()),this.host.state.editingEdge=null}else{let s=this.getSelectedNode();s&&(ze(s,e.value),this.host.persistDiagramModels()),this.host.state.editingNode=null}this.host.renderDocument()}},n=()=>{t||(t=!0,e.classList.contains("docdiagram-inline-editor-edge")?this.host.state.editingEdge=null:this.host.state.editingNode=null,this.host.renderDocument())};e.addEventListener("pointerdown",s=>s.stopPropagation()),e.addEventListener("click",s=>s.stopPropagation()),e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.metaKey||s.ctrlKey)?(s.preventDefault(),o()):s.key==="Escape"&&(s.preventDefault(),n())}),e.addEventListener("blur",o,{once:!0}),e.focus(),e.select()}resizeNode(e,t,o,n){t.preventDefault();let s=H(o.getAttribute("data-diagram-index")||void 0),i=o.getAttribute("data-node-id")||"",a=K(this.host.state,s),d=a?I(a,i)?.node:null;if(!a||!d)return;let c=this.svgPoint(e,t),l=We(d),u=!1;this.capturePointer(e,t);let p=g=>{let h=this.svgPoint(e,g);mt(a,d,n,h.x-c.x,h.y-c.y,l);let $=Number(d.size?.width)||190,y=Number(d.size?.height)||80;u=u||$!==l.size.width||y!==l.size.height,this.updateNodeSizeMarkup(o,d,$,y)},m=g=>{this.releasePointer(e,g),e.removeEventListener("pointermove",p),e.removeEventListener("pointerup",m),e.removeEventListener("pointercancel",m),u&&(Ce(a,d),this.host.state.selectedNode={diagramIndex:s,nodeId:i},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.persistDiagramModels(),this.host.renderDocument())};e.addEventListener("pointermove",p),e.addEventListener("pointerup",m),e.addEventListener("pointercancel",m)}updateNodeSizeMarkup(e,t,o,n){let s=K(this.host.state,H(e.getAttribute("data-diagram-index")||void 0));if(!s)return;let{x:i,y:a}=V(s,t),d=e.querySelector(".docdiagram-node-body"),c=e.querySelector(".docdiagram-node-label"),l=e.querySelector(".docdiagram-node-subtitle"),u=e.querySelectorAll(".docdiagram-resize-handle");if(!d)return;let p=le(s,t),m=ae(t,i,a,o,n),g=Ie(m.textBounds,t);for(let h of e.querySelectorAll(".docdiagram-node-detail"))h.remove();d.outerHTML=He(m,p,Number(p.strokeWidth)||2);for(let h of[c,l])if(h){h.setAttribute("x",String(g.centerX)),h.setAttribute("y",String(h===c?g.labelStartY:g.subtitleStartY)),h.setAttribute("text-anchor",g.textAnchor);for(let $ of h.querySelectorAll("tspan"))$.setAttribute("x",String(g.centerX))}for(let h of u){let $=h.getAttribute("data-resize-corner");h.setAttribute("x",String($?.endsWith("left")?i-7:i+o-7)),h.setAttribute("y",String($?.startsWith("top")?a-7:a+n-7))}}getNodePortPoint(e,t){let o=this.host.state.diagramModels.find(s=>s.type==="flowchart"&&I(s,e.id)?.node===e);if(!o)return{x:0,y:0};let n=V(o,e);return ae(e,n.x,n.y,n.width,n.height).anchors[t]}addConnectionTargetPorts(e,t){let o=K(this.host.state,t);if(o)for(let{node:n}of P(o))for(let s of Y){let i=this.getNodePortPoint(n,s),a=document.createElementNS("http://www.w3.org/2000/svg","circle");a.setAttribute("class","docdiagram-connection-port docdiagram-connection-target-port"),a.dataset.nodeId=n.id,a.dataset.anchor=s,a.setAttribute("cx",String(i.x)),a.setAttribute("cy",String(i.y)),a.setAttribute("r","7"),e.append(a)}}beginConnectionDrag(e,t,o){t.preventDefault(),t.stopPropagation(),this.host.state.connectionDrag={...o,current:this.svgPoint(e,t),invalid:!1},this.addConnectionTargetPorts(e,o.diagramIndex);let n=document.createElementNS("http://www.w3.org/2000/svg","path");n.setAttribute("class","docdiagram-connection-preview"),e.append(n),this.capturePointer(e,t);let s=d=>{let l=document.elementFromPoint(d.clientX,d.clientY)?.closest(".docdiagram-connection-port");return l||[...e.querySelectorAll(".docdiagram-connection-port")].find(u=>{let p=u.getBoundingClientRect();return d.clientX>=p.left&&d.clientX<=p.right&&d.clientY>=p.top&&d.clientY<=p.bottom})||null},i=d=>{let c=this.host.state.connectionDrag;if(!c)return;let l=this.svgPoint(e,d),u=s(d);c.current=l,c.invalid=!u;let p=u?.getAttribute("data-anchor")||c.sourceAnchor;n.setAttribute("d",we(c.start,l,c.sourceAnchor,p,"straight").path),n.classList.toggle("docdiagram-connection-invalid",c.invalid)},a=d=>{this.releasePointer(e,d),e.removeEventListener("pointermove",i),e.removeEventListener("pointerup",a),e.removeEventListener("pointercancel",a);let c=s(d),l=this.host.state.connectionDrag;if(this.host.state.connectionDrag=null,c&&l){let u=K(this.host.state,l.diagramIndex),p=c.getAttribute("data-node-id")||c.closest(".docdiagram-node")?.getAttribute("data-node-id"),m=c.getAttribute("data-anchor")||"";if(u&&p){if(l.reconnect&&l.edgeIndex!==void 0&&l.endpoint){let g=u.edges[l.edgeIndex];g&&(at(g,l.endpoint,p,m),this.host.state.selectedEdge={diagramIndex:l.diagramIndex,edgeIndex:l.edgeIndex},this.host.state.selectedNode=null)}else{let g=st(u,l.sourceNodeId,l.sourceAnchor,p,m);this.host.state.selectedEdge={diagramIndex:l.diagramIndex,edgeIndex:u.edges.indexOf(g)},this.host.state.selectedNode=null}this.host.persistDiagramModels()}}this.host.renderDocument()};e.addEventListener("pointermove",i),e.addEventListener("pointerup",a),e.addEventListener("pointercancel",a)}beginCanvasPan(e,t){let o=e.closest(".docdiagram");if(!o)return;t.preventDefault();let n={clientX:t.clientX,clientY:t.clientY,scrollLeft:o.scrollLeft,scrollTop:o.scrollTop};o.classList.add("docdiagram-panning"),this.capturePointer(e,t);let s=a=>{o.scrollLeft=n.scrollLeft-(a.clientX-n.clientX),o.scrollTop=n.scrollTop-(a.clientY-n.clientY)},i=a=>{this.releasePointer(e,a),o.classList.remove("docdiagram-panning"),e.removeEventListener("pointermove",s),e.removeEventListener("pointerup",i),e.removeEventListener("pointercancel",i)};e.addEventListener("pointermove",s),e.addEventListener("pointerup",i),e.addEventListener("pointercancel",i)}svgPoint(e,t){let o=e.getBoundingClientRect(),n=e.viewBox.baseVal;return{x:(t.clientX-o.left)*n.width/o.width,y:(t.clientY-o.top)*n.height/o.height}}capturePointer(e,t){t.isTrusted&&e.setPointerCapture(t.pointerId)}releasePointer(e,t){t.isTrusted&&e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId)}};function lr(r,e){return Object.entries(U[r]||{}).map(([t,o])=>`<option value="${t}"${t===e?" selected":""}>${o.label}</option>`).join("")}function ur(r,e,t="classic"){let o=J(r),n=le(r,e),s=Number(e.size?.width)||190,i=Number(e.size?.height)||80,a=e.shape==="document"?{width:140,height:84}:{width:120,height:60},d=o?Math.ceil(a.width/o)*o:a.width,c=o?Math.ceil(a.height/o)*o:a.height,l=o||1,u=U[t]||{},p=Object.entries(u).find(([,h])=>[h.light,h.dark].some($=>$.fill.toLowerCase()===(n.fill||"").toLowerCase()&&$.stroke.toLowerCase()===(n.stroke||"").toLowerCase()&&$.text.toLowerCase()===(n.text||"").toLowerCase())),m=e.palette?.colour||p?.[0]||"blue",g=e.palette?.tone||(p&&p[1].light.fill.toLowerCase()===(n.fill||"").toLowerCase()?"light":"dark");return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${b(e.label)}</textarea></label>`,`<label class="docdiagram-field docdiagram-field-wide">Subtitle<textarea class="docdiagram-inspector-subtitle docdiagram-inspector-textarea" rows="2">${b(e.subtitle||"")}</textarea></label>`,`<label class="docdiagram-field">Tone<select class="docdiagram-inspector-tone"><option value="light"${g==="light"?" selected":""}>Light</option><option value="dark"${g==="dark"?" selected":""}>Dark</option></select></label>`,`<label class="docdiagram-field">Colour<select class="docdiagram-inspector-colour">${lr(t,m)}</select></label>`,`<label class="docdiagram-field">Shape<select class="docdiagram-inspector-shape">${De.map(h=>`<option value="${h}"${h===e.shape?" selected":""}>${h}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Fill<input type="color" class="docdiagram-inspector-fill" value="${b(n.fill||"")}"></label>`,`<label class="docdiagram-field">Border<input type="color" class="docdiagram-inspector-stroke" value="${b(n.stroke||"")}"></label>`,`<label class="docdiagram-field">Border width<input type="number" class="docdiagram-inspector-stroke-width" value="${Number(n.strokeWidth)||2}" min="1" step="1"></label>`,`<label class="docdiagram-field">Text<input type="color" class="docdiagram-inspector-text" value="${b(n.text||"")}"></label>`,`<label class="docdiagram-field">Vertical text<select class="docdiagram-inspector-text-v-align"><option value="top"${e.textVAlign==="top"?" selected":""}>Top</option><option value="center"${e.textVAlign!=="top"?" selected":""}>Center</option></select></label>`,`<label class="docdiagram-field">Horizontal text<select class="docdiagram-inspector-text-h-align"><option value="left"${e.textHAlign==="left"?" selected":""}>Left</option><option value="center"${e.textHAlign!=="left"&&e.textHAlign!=="right"?" selected":""}>Center</option><option value="right"${e.textHAlign==="right"?" selected":""}>Right</option></select></label>`,`<label class="docdiagram-field">Width<input type="number" class="docdiagram-inspector-width" value="${s}" min="${d}" step="${l}"></label>`,`<label class="docdiagram-field">Height<input type="number" class="docdiagram-inspector-height" value="${i}" min="${c}" step="${l}"></label>`].join("")}function Ot(r,e){let t=Ae(r,e),o=Number(t.strokeWidth)||2,n=e.route||"orthogonal",s=e.start||"none",i=e.end||"arrow";return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${b(e.label||"")}</textarea></label>`,`<label class="docdiagram-field">Route<select class="docdiagram-inspector-route">${Fe.map(a=>`<option value="${a}"${a===n?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Source side<select class="docdiagram-inspector-source-anchor">${Y.map(a=>`<option value="${a}"${a===e.sourceAnchor?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Target side<select class="docdiagram-inspector-target-anchor">${Y.map(a=>`<option value="${a}"${a===e.targetAnchor?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Start<select class="docdiagram-inspector-marker-start">${G.map(a=>`<option value="${a}"${a===s?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">End<select class="docdiagram-inspector-marker-end">${G.map(a=>`<option value="${a}"${a===i?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Stroke<input type="color" class="docdiagram-inspector-stroke" value="${b(t.stroke||"")}"></label>`,`<label class="docdiagram-field">Label colour<input type="color" class="docdiagram-inspector-text" value="${b(t.text||"")}"></label>`,`<label class="docdiagram-field">Stroke width<input type="number" class="docdiagram-inspector-stroke-width" value="${o}" min="1" step="1"></label>`].join("")}function mr(r,e,t,o="classic"){let n="from"in t?null:qe(r,t),s=e.kind!=="message",i=s?t:null;return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-sequence-inspector-label docdiagram-inspector-textarea" rows="2">${b(t.label||"")}</textarea></label>`,e.kind==="message"?`<label class="docdiagram-field">Style<select class="docdiagram-sequence-inspector-message-style"><option value="solid"${t.style!=="dashed"?" selected":""}>Solid</option><option value="dashed"${t.style==="dashed"?" selected":""}>Dashed</option></select></label>`:"",s?`<label class="docdiagram-field">Tone<select class="docdiagram-sequence-inspector-tone"><option value="light"${i?.palette?.tone!=="dark"?" selected":""}>Light</option><option value="dark"${i?.palette?.tone==="dark"?" selected":""}>Dark</option></select></label>`:"",s?`<label class="docdiagram-field">Colour<select class="docdiagram-sequence-inspector-colour">${lr(o,i?.palette?.colour||"blue")}</select></label>`:"",s?`<label class="docdiagram-field">Fill<input type="color" class="docdiagram-sequence-inspector-fill" value="${b(n?.fill||"")}"></label><label class="docdiagram-field">Border<input type="color" class="docdiagram-sequence-inspector-stroke" value="${b(n?.stroke||"")}"></label><label class="docdiagram-field">Text<input type="color" class="docdiagram-sequence-inspector-text" value="${b(n?.text||"")}"></label><label class="docdiagram-field">Width<input type="number" min="1" class="docdiagram-sequence-inspector-width" value="${Number(i?.size?.width)||""}"></label><label class="docdiagram-field">Height<input type="number" min="1" class="docdiagram-sequence-inspector-height" value="${Number(i?.size?.height)||""}"></label>`:""].join("")}function Qe(r,e){return r.querySelector(e)}function D(r,e,t){Qe(r,e)?.addEventListener("change",o=>{t(o.currentTarget.value)})}function ke(r,e){e(),r.persistDiagramModels(),r.renderDocument()}function gr(r,e,t,o){let n=d=>{let c=r.state.diagramModels[t];if(!c||c.type!=="flowchart")return;let l=I(c,o)?.node;l&&ke(r,()=>d(c,l))};D(e,".docdiagram-inspector-label",d=>n((c,l)=>ze(l,d))),D(e,".docdiagram-inspector-subtitle",d=>n((c,l)=>ut(l,d)));let s=Qe(e,".docdiagram-inspector-tone"),i=Qe(e,".docdiagram-inspector-colour"),a=()=>{s&&i&&n((d,c)=>Ye(c,s.value,i.value,r.state.documentColorScheme))};s?.addEventListener("change",a),i?.addEventListener("change",a),D(e,".docdiagram-inspector-shape",d=>n((c,l)=>lt(l,d))),D(e,".docdiagram-inspector-fill",d=>n((c,l)=>ye(l,"fill",d))),D(e,".docdiagram-inspector-stroke",d=>n((c,l)=>ye(l,"stroke",d))),D(e,".docdiagram-inspector-text",d=>n((c,l)=>ye(l,"text",d))),D(e,".docdiagram-inspector-text-v-align",d=>n((c,l)=>Ue(l,"textVAlign",d))),D(e,".docdiagram-inspector-text-h-align",d=>n((c,l)=>Ue(l,"textHAlign",d))),D(e,".docdiagram-inspector-stroke-width",d=>n((c,l)=>Ze(l,d))),D(e,".docdiagram-inspector-width",d=>n((c,l)=>_e(c,l,"width",d))),D(e,".docdiagram-inspector-height",d=>n((c,l)=>_e(c,l,"height",d)))}function hr(r,e,t,o){let n=s=>{let i=r.state.diagramModels[t];if(!i||i.type!=="flowchart")return;let a=i.edges[o];a&&ke(r,()=>s(i,a))};D(e,".docdiagram-inspector-label",s=>n((i,a)=>Pe(a,s))),D(e,".docdiagram-inspector-route",s=>n((i,a)=>gt(a,s))),D(e,".docdiagram-inspector-source-anchor",s=>n((i,a)=>Xe(a,"source",s))),D(e,".docdiagram-inspector-target-anchor",s=>n((i,a)=>Xe(a,"target",s))),D(e,".docdiagram-inspector-marker-start",s=>n((i,a)=>ht(a,s))),D(e,".docdiagram-inspector-marker-end",s=>n((i,a)=>pt(a,s))),D(e,".docdiagram-inspector-stroke",s=>n((i,a)=>Ke(a,"stroke",s))),D(e,".docdiagram-inspector-text",s=>n((i,a)=>Ke(a,"text",s))),D(e,".docdiagram-inspector-stroke-width",s=>n((i,a)=>Ze(a,s)))}function pr(r,e,t){let o=r.state.selectedSequenceElement;if(!o)return;if(D(e,".docdiagram-sequence-inspector-label",d=>ke(r,()=>{t.label=d.trim()||t.label})),o.kind==="message"){D(e,".docdiagram-sequence-inspector-message-style",d=>ke(r,()=>{t.style=d}));return}let n=t,s=Qe(e,".docdiagram-sequence-inspector-tone"),i=Qe(e,".docdiagram-sequence-inspector-colour"),a=()=>{s&&i&&ke(r,()=>Ye(n,s.value,i.value,r.state.documentColorScheme))};s?.addEventListener("change",a),i?.addEventListener("change",a);for(let[d,c]of[[".docdiagram-sequence-inspector-fill","fill"],[".docdiagram-sequence-inspector-stroke","stroke"],[".docdiagram-sequence-inspector-text","text"]])D(e,d,l=>ke(r,()=>ye(n,c,l)));for(let[d,c]of[[".docdiagram-sequence-inspector-width","width"],[".docdiagram-sequence-inspector-height","height"]])D(e,d,l=>ke(r,()=>{let u=Number(l);Number.isFinite(u)&&u>0&&(n.size={...n.size,[c]:u})}))}var Et=class{constructor(e){this.host=e;this.renderTimer=null;this.resizeObserver=null;this.openState=!1;this.draft="";this.error=""}get isOpen(){return this.openState}get hasUnsavedDraft(){return this.openState&&this.draft!==this.host.getSource()}get hasError(){return this.error.length>0}get draftSource(){return this.draft}setError(e){this.error=e,this.updateStatus()}clearError(){this.error=""}open(){globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=null,this.draft=this.host.getSource(),this.error="",this.openState=!0,this.host.stopDiagramEditing(),this.host.renderDocument();let e=()=>this.focus();globalThis.requestAnimationFrame?.(e)??e()}close(){this.flushRender(),!(this.error&&this.draft!==this.host.getSource()&&!globalThis.confirm("Discard the invalid source changes?"))&&(this.openState=!1,this.draft="",this.error="",this.renderTray(),document.querySelector(".docdiagram-menu-toggle")?.focus())}flushRender(){return this.renderTimer===null?!0:this.renderDraft()}syncSource(e){if(!this.openState)return;this.draft=e,this.error="";let t=document.querySelector(".docdiagram-source-editor");if(!t)return;let o=t.selectionStart,n=t.selectionEnd,s=t.scrollTop;t.value=e,t.setSelectionRange(Math.min(o,e.length),Math.min(n,e.length)),t.scrollTop=s,this.updateStatus()}reveal(e){let t=bt(this.host.getSource(),e);if(!t||this.hasUnsavedDraft)return!1;this.openState||this.open();let o=()=>{let n=document.querySelector(".docdiagram-source-editor");n&&(n.focus(),n.setSelectionRange(t.start,t.end),xt(n,t))};return globalThis.requestAnimationFrame?.(o)??o(),!0}renderTray(){let e=document.querySelector(".docdiagram-source-tray");if(!this.openState){this.resizeObserver?.disconnect(),this.resizeObserver=null,e?.remove(),delete this.host.outputElement.dataset.sourceEditorOpen,this.host.outputElement.style.removeProperty("--docdiagram-source-tray-height");return}if(e){e.dataset.theme=this.host.getDocumentTheme(),this.host.outputElement.dataset.sourceEditorOpen="true",this.updateStatus();return}e=document.createElement("section"),e.className="docdiagram-source-tray",e.dataset.theme=this.host.getDocumentTheme(),e.setAttribute("aria-label","Document source editor"),e.innerHTML=['<header class="docdiagram-source-header">','<div><strong>Source</strong><span class="docdiagram-source-shortcut">Cmd/Ctrl+Shift+E to close</span></div>','<button type="button" class="docdiagram-source-close">Close source editor</button>',"</header>",'<label class="docdiagram-source-label">Canonical Markdown<textarea class="docdiagram-source-editor" spellcheck="false"></textarea></label>','<p class="docdiagram-source-status" aria-live="polite"></p>','<p class="docdiagram-source-error" role="alert"></p>'].join("");let t=e.querySelector(".docdiagram-source-editor"),o=e.querySelector(".docdiagram-source-close");if(!t||!o)return;t.value=this.draft,t.addEventListener("input",()=>{this.draft=t.value,this.error="",this.updateStatus(),this.scheduleRender()}),o.addEventListener("click",()=>this.close()),this.host.outputElement.after(e),this.host.outputElement.dataset.sourceEditorOpen="true";let n=()=>{this.host.outputElement.style.setProperty("--docdiagram-source-tray-height",`${e?.offsetHeight||0}px`)};this.resizeObserver?.disconnect(),globalThis.ResizeObserver&&(this.resizeObserver=new globalThis.ResizeObserver(n),this.resizeObserver.observe(e)),n(),this.updateStatus()}scheduleRender(){globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=globalThis.setTimeout(()=>{this.renderTimer=null,this.renderDraft()},250)}renderDraft(){return globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=null,this.host.renderDocument(this.draft,{preserveOnError:!0})}updateStatus(){let e=document.querySelector(".docdiagram-source-tray");if(!e)return;let t=e.querySelector(".docdiagram-source-status"),o=e.querySelector(".docdiagram-source-error");!t||!o||(t.textContent=this.error?"Source has errors; showing the last valid render.":"Changes render automatically.",o.hidden=!this.error,o.textContent=this.error)}focus(){let e=document.querySelector(".docdiagram-source-editor");e&&(e.focus(),e.setSelectionRange(e.value.length,e.value.length))}};function jr(r){return r instanceof Element&&r.matches("input, textarea, select, [contenteditable]")}var St=class{constructor(e,t){this.sourceElement=e;this.outputElement=t;this.state=cr();this.sourceEditor=t?new Et({outputElement:t,getSource:()=>this.getSource(),getDocumentTheme:()=>this.getDocumentTheme(),renderDocument:(o,n)=>this.renderDocument(o,n),stopDiagramEditing:()=>this.stopDiagramEditing(),closeDocumentMenu:()=>this.closeDocumentMenu()}):null,this.diagramEditor=t?new wt({outputElement:t,state:this.state,persistDiagramModels:()=>this.persistDiagramModels(),renderDocument:()=>this.renderDocument()}):null}getSource(){return this.sourceElement?.content.textContent||""}setSource(e){this.sourceElement?.content.replaceChildren(document.createTextNode(e))}getDocumentTheme(){return this.state.documentTheme}stopDiagramEditing(){this.state.editingDiagramIndex!==null&&(this.state.editingDiagramIndex=null,this.state.editSessionDiagram=null,Se(this.state))}renderDiagram(e,t){return ar(e,t,{colourScheme:this.state.documentColorScheme,state:{...this.state,documentTheme:this.state.documentTheme,documentColorScheme:this.state.documentColorScheme},onDiagram:(o,n)=>{this.state.diagramModels[o]=n}})}renderMarkdown(e,t={diagramIndex:0}){return jt(e,t,{renderDiagram:(o,n)=>this.renderDiagram(o,n),documentColorScheme:this.state.documentColorScheme})}persistDiagramModels(){let e=0,t=this.getSource().replace(/\r\n/g,`
`).replace(/^```diagram\s*\n([\s\S]*?)^```$/gm,()=>{let o=this.state.diagramModels[e];return e+=1,o?`\`\`\`diagram
${ot(o)}
\`\`\``:"```diagram\n```"});this.setSource(t),this.sourceEditor?.syncSource(t)}renderDocument(e=this.getSource(),{preserveOnError:t=!1}={}){if(!this.outputElement)return!1;let o=new Map([...this.outputElement.querySelectorAll(".docdiagram")].map(c=>[Number(c.dataset.diagramIndex),{left:c.scrollLeft,top:c.scrollTop}]));for(let c of this.outputElement.querySelectorAll(".docdiagram"))this.state.diagramViewportHeights.set(Number(c.dataset.diagramIndex),c.offsetHeight);let n={x:globalThis.scrollX||0,y:globalThis.scrollY||0},s=[...this.state.diagramModels],i=this.state.documentTheme,a=this.state.documentColorScheme;this.state.diagramModels.length=0;let d;try{let c=t?Pt(e):ft(e);this.state.documentTheme=c.theme,this.state.documentColorScheme=c.colourScheme,d=this.renderMarkdown(c.content)}catch(c){let l=c instanceof Error?c.message:String(c);return this.state.diagramModels.length=0,this.state.diagramModels.push(...s),t?(this.state.documentTheme=i,this.state.documentColorScheme=a,this.sourceEditor?.setError(l),!1):(this.applyPageTheme(this.state.documentTheme),this.removeToolbarChrome(),this.outputElement.innerHTML=`<section class="docdiagram-error"><strong>Document could not be rendered.</strong><br>${b(l)}</section>`,this.sourceEditor?.renderTray(),!1)}this.setSource(e),this.sourceEditor?.clearError(),this.outputElement.dataset.theme=this.state.documentTheme,this.outputElement.dataset.format=this.state.documentFormat,this.applyPageTheme(this.state.documentTheme),this.outputElement.innerHTML=d,this.removeToolbarChrome(),this.createToolbar(),this.sourceEditor?.renderTray(),this.diagramEditor?.enableCanvasPanning(),this.diagramEditor?.enableSequenceSelection(),this.state.editingDiagramIndex!==null&&this.diagramEditor?.enableEditing();for(let c of this.outputElement.querySelectorAll(".docdiagram")){let l=o.get(Number(c.dataset.diagramIndex));l&&(c.scrollLeft=l.left,c.scrollTop=l.top)}return globalThis.scrollTo?.(n.x,n.y),!0}closeDocumentMenu(){let e=document.querySelector(".docdiagram-menu"),t=document.querySelector(".docdiagram-menu-toggle");!e||!t||(e.hidden=!0,t.setAttribute("aria-expanded","false"))}downloadDocument(){if(this.sourceEditor?.flushRender(),this.sourceEditor?.hasError&&this.sourceEditor.hasUnsavedDraft&&!globalThis.confirm("Source has errors. Save the last valid version instead?"))return;let e=document.documentElement.cloneNode(!0),t=e.querySelector("#source"),o=e.querySelector(".docdiagram-toolbar"),n=e.querySelector(".docdiagram-source-tray"),s=e.querySelector("#rendered-document");t?.content.replaceChildren(document.createTextNode(this.getSource())),o?.remove(),n?.remove(),s?.replaceChildren();let i=new Blob([`<!doctype html>
${e.outerHTML}`],{type:"text/html;charset=utf-8"}),a=document.createElement("a"),d=document.title.toLowerCase().replace(/[^\w]+/g,"-").replace(/^-|-$/g,"");a.href=URL.createObjectURL(i),a.download=`${d||"document"}-edited.html`,a.click(),URL.revokeObjectURL(a.href),this.state.savedSource=this.getSource()}boot(){!this.sourceElement||!this.outputElement||(dr(),this.state.savedSource=this.getSource(),globalThis.addEventListener("beforeunload",e=>{this.getSource()===this.state.savedSource&&!this.sourceEditor?.hasUnsavedDraft||(e.preventDefault(),e.returnValue="")}),document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.shiftKey&&e.key.toLowerCase()==="e"&&(this.sourceEditor?.isOpen||!jr(e.target))){e.preventDefault(),this.sourceEditor?.isOpen?this.sourceEditor.close():this.sourceEditor?.open();return}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="s"){e.preventDefault(),this.downloadDocument();return}e.key==="Escape"&&this.closeDocumentMenu()}),document.addEventListener("pointerdown",e=>{let t=document.querySelector(".docdiagram-toolbar");t&&e.target instanceof Node&&!t.contains(e.target)&&this.closeDocumentMenu(),!(!(e.target instanceof Element)||e.target.closest(".docdiagram-toolbar, .docdiagram-node, .docdiagram-edge-group, .docdiagram-connection-port, .docdiagram-edge-endpoint, .docdiagram-inline-editor, .docdiagram-sequence-participant, .docdiagram-sequence-note, .docdiagram-sequence-message")||!this.state.selectedNode&&!this.state.selectedEdge&&!this.state.selectedSequenceElement)&&(Se(this.state),this.renderDocument())}),this.outputElement.addEventListener("dblclick",e=>{e.target instanceof Element&&e.target.closest("button, input, textarea, select, [contenteditable]")||this.sourceEditor?.reveal(globalThis.getSelection?.()?.toString()||"")}),this.renderDocument())}getCoreApi(){return{diagramThemes:se,nodeColorSchemes:U,supportedDiagramTypes:Oe,nodeColorPalettes:Ut,nodeShapes:De,edgeAnchors:Y,edgeRoutes:Fe,edgeMarkerStyles:G,getTheme:e=>xe(e,this.state.documentTheme),getGridSize:J,expandCanvasForNode:Ce,flattenFlowchartNodes:P,getFlowchartNodeBounds:V,reparentFlowchartNode:nt,createUniqueNodeId:Tt,getDefaultNodePosition:qt,duplicateNode:it,createNode:At,getResizeNodeOrigin:We,createConnector:st,reconnectConnector:at,resizeFlowchartNode:mt,deleteConnector:dt,deleteNode:ct,getNodeEffectiveStyle:(e,t)=>le(e,t,this.state.documentTheme,this.state.documentColorScheme),getEdgeEffectiveStyle:(e,t)=>Ae(e,t,this.state.documentTheme),getEdgeMarkerStyle:Ge,getEdgeMarkerDimensions:Ct,parseDiagram:e=>pe(e,this.state.documentColorScheme),parseDocumentFrontmatter:zt,resolveDocument:ft,setFrontmatterTheme:It,isSafeUrl:yt,renderInline:me,renderMarkdown:(e,t)=>this.renderMarkdown(e,t),renderDiagram:(e,t)=>this.renderDiagram(e,t),snapToGrid:_,clampNodeSize:Le,serializeDiagram:ot,setNodeLabel:ze,setNodeShape:lt,setNodeSubtitle:ut,setNodeTextAlignment:Ue,setNodeStyleOverride:ye,setNodeColorPalette:Ye,setNodeSize:_e,setEdgeLabel:Pe,setEdgeRoute:gt,setEdgeAnchor:Xe,setEdgeStyleOverride:Ke,setStyleStrokeWidth:Ze,setEdgeMarkerStart:ht,setEdgeMarkerEnd:pt,validateDocumentSource:Pt,findSourceTextRange:bt,scrollSourceEditorToRange:xt,splitTextLines:Q,renderTextBlock:X,computeNodeTextLayout:Ie,getNodeGeometry:ae,renderNodeBody:He,buildEdgePath:we,buildEdgeInspectorFields:Ot,clampZoom:Lt}}createToolbar(){if(!this.outputElement)return;let e=document.createElement("section");e.className="docdiagram-toolbar",e.dataset.editing=String(this.state.editingDiagramIndex!==null),e.dataset.theme=this.state.documentTheme,e.dataset.format=this.state.documentFormat;let t=this.getSelectedNode(),o=t?null:this.getSelectedEdge(),n=!t&&!o?this.getSelectedSequenceElement():null,s=t&&this.state.selectedNode?this.state.diagramModels[this.state.selectedNode.diagramIndex]:o&&this.state.selectedEdge?this.state.diagramModels[this.state.selectedEdge.diagramIndex]:n&&this.state.selectedSequenceElement?this.state.diagramModels[this.state.selectedSequenceElement.diagramIndex]:null;e.innerHTML=['<button type="button" class="docdiagram-menu-toggle" aria-label="Document menu" aria-expanded="false" title="Document menu">\u2630</button>','<div class="docdiagram-menu" hidden>','<label class="docdiagram-theme-control">Theme<select class="docdiagram-theme-select">',`<option value="light"${this.state.documentTheme==="light"?" selected":""}>Light</option>`,`<option value="dark"${this.state.documentTheme==="dark"?" selected":""}>Dark</option>`,"</select></label>",'<label class="docdiagram-theme-control">Format<select class="docdiagram-format-select">',`<option value="centered"${this.state.documentFormat==="centered"?" selected":""}>Centered</option>`,`<option value="full-width"${this.state.documentFormat==="full-width"?" selected":""}>Full width</option>`,"</select></label>",'<button type="button" class="docdiagram-edit-source">Edit source</button>','<button type="button" class="docdiagram-save">Save As</button>','<button type="button" class="docdiagram-offline-save" disabled>Save for Offline (coming soon)</button>',"</div>",t&&s?.type==="flowchart"?`<div class="docdiagram-inspector" data-kind="node">${ur(s,t,this.state.documentColorScheme)}</div>`:o&&s?`<div class="docdiagram-inspector" data-kind="edge">${Ot(s,o)}</div>`:n&&s?`<div class="docdiagram-inspector" data-kind="sequence">${mr(s,this.state.selectedSequenceElement,n,this.state.documentColorScheme)}</div>`:""].join("");let i=e.querySelector(".docdiagram-menu-toggle"),a=e.querySelector(".docdiagram-menu");i?.addEventListener("click",()=>{if(!a)return;let d=a.hidden;a.hidden=!d,i.setAttribute("aria-expanded",String(d))}),e.querySelector(".docdiagram-save")?.addEventListener("click",()=>this.downloadDocument()),e.querySelector(".docdiagram-edit-source")?.addEventListener("click",()=>{this.closeDocumentMenu(),this.sourceEditor?.open()}),e.querySelector(".docdiagram-theme-select")?.addEventListener("change",d=>{this.setSource(It(this.getSource(),d.currentTarget.value)),this.renderDocument()}),e.querySelector(".docdiagram-format-select")?.addEventListener("change",d=>{this.state.documentFormat=d.currentTarget.value==="full-width"?"full-width":"centered",this.renderDocument()}),this.outputElement.before(e),t&&this.state.selectedNode?(gr(this,e,this.state.selectedNode.diagramIndex,this.state.selectedNode.nodeId),this.positionInspector(this.state.selectedNode.diagramIndex)):o&&this.state.selectedEdge?(hr(this,e,this.state.selectedEdge.diagramIndex,this.state.selectedEdge.edgeIndex),this.positionInspector(this.state.selectedEdge.diagramIndex)):n&&this.state.selectedSequenceElement&&(pr(this,e,n),this.positionInspector(this.state.selectedSequenceElement.diagramIndex)),this.wireChromeControls()}getSelectedNode(){let e=this.state.selectedNode,t=e?this.state.diagramModels[e.diagramIndex]:null;return e&&t?.type==="flowchart"&&$e(this.state,e.diagramIndex)&&I(t,e.nodeId)?.node||null}getSelectedEdge(){let e=this.state.selectedEdge,t=e?this.state.diagramModels[e.diagramIndex]:null;return e&&t?.type==="flowchart"&&$e(this.state,e.diagramIndex)&&t.edges[e.edgeIndex]||null}getSelectedSequenceElement(){let e=this.state.selectedSequenceElement,t=e?this.state.diagramModels[e.diagramIndex]:null;return!e||t?.type!=="sequence"||!$e(this.state,e.diagramIndex)?null:e.kind==="participant"?t.participants?.find(o=>o.id===e.id)||null:e.kind==="message"?t.messages?.[e.index]||null:t.notes?.[e.index]||null}wireChromeControls(){if(this.outputElement){for(let e of this.outputElement.querySelectorAll(".docdiagram-zoom-in, .docdiagram-zoom-out"))e.addEventListener("click",()=>{let t=Number(e.dataset.diagramIndex),o=this.state.diagramZooms.get(t)||100,n=e.classList.contains("docdiagram-zoom-in")?25:-25;this.state.diagramZooms.set(t,Lt(o+n)),this.renderDocument()});for(let e of this.outputElement.querySelectorAll(".docdiagram-fit"))e.addEventListener("click",()=>{this.state.diagramZooms.set(Number(e.dataset.diagramIndex),100),this.renderDocument()});for(let e of this.outputElement.querySelectorAll(".docdiagram-start-editing"))e.addEventListener("click",()=>{let t=Number(e.closest(".docdiagram")?.getAttribute("data-diagram-index")),o=this.state.diagramModels[t];o&&(this.state.editSessionDiagram=pe(ot(o),this.state.documentColorScheme),this.state.editingDiagramIndex=t,Se(this.state),this.renderDocument())});for(let e of this.outputElement.querySelectorAll(".docdiagram-done-editing"))e.addEventListener("click",()=>this.exitEditing(this.state.editingDiagramIndex,!1));for(let e of this.outputElement.querySelectorAll(".docdiagram-cancel-editing"))e.addEventListener("click",()=>this.exitEditing(this.state.editingDiagramIndex,!0));for(let e of this.outputElement.querySelectorAll(".docdiagram-create-node"))e.addEventListener("click",()=>this.createNewNode(Number(e.dataset.diagramIndex)))}}exitEditing(e,t){e!==null&&(t&&this.state.editSessionDiagram&&(this.state.diagramModels[e]=this.state.editSessionDiagram,this.persistDiagramModels()),this.state.editingDiagramIndex=null,this.state.editSessionDiagram=null,Se(this.state),this.renderDocument())}createNewNode(e){let t=this.state.diagramModels[e];if(!t||t.type!=="flowchart")return;let o=At(t);this.state.selectedNode={diagramIndex:e,nodeId:o.id},this.state.selectedEdge=null,this.persistDiagramModels(),this.renderDocument()}positionInspector(e){if(!this.outputElement)return;let t=document.querySelector(".docdiagram-inspector"),o=this.outputElement.querySelector(`.docdiagram[data-diagram-index="${e}"]`);!t||!o||(t.style.top=`${Math.max(16,o.getBoundingClientRect().top)}px`)}applyPageTheme(e){document.documentElement.dataset.docdiagramTheme=e,document.body?.dataset&&(document.body.dataset.docdiagramTheme=e)}removeToolbarChrome(){if(this.outputElement)for(;this.outputElement.previousElementSibling?.classList.contains("docdiagram-toolbar");)this.outputElement.previousElementSibling.remove()}};var Br=document.querySelector("#source"),Or=document.querySelector("#rendered-document"),fr=new St(Br,Or),Vr=globalThis;Vr.DocDiagramCore=fr.getCoreApi();fr.boot();})();
