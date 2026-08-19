"use strict";(()=>{var Oe=["flowchart","sequence"],De=["rounded-rectangle","circle","oval","database","diamond","rhombus","flattened-hexagon","chevron","right-chevron","document"],K=["top","right","bottom","left"],Fe=["orthogonal","straight","curved"],W=["none","arrow","circle"],Ve={start:"none",end:"arrow"},Vt=["top","center"],Gt=["left","center","right"],Nt={width:50,height:20},Dt={width:50,height:20},z={shape:"rounded-rectangle",label:"New node",width:190,height:80},_={classic:{pink:{label:"Pink",light:{fill:"#F6C5D8",stroke:"#9D174D",text:"#9D174D"},dark:{fill:"#9D174D",stroke:"#FBCFE8",text:"#FBCFE8"}},red:{label:"Red",light:{fill:"#FECACA",stroke:"#B91C1C",text:"#B91C1C"},dark:{fill:"#B91C1C",stroke:"#FEE2E2",text:"#FEE2E2"}},orange:{label:"Orange",light:{fill:"#FED7AA",stroke:"#C2410C",text:"#9A3412"},dark:{fill:"#C2410C",stroke:"#FFEDD5",text:"#FFEDD5"}},yellow:{label:"Yellow",light:{fill:"#FEF08A",stroke:"#A16207",text:"#854D0E"},dark:{fill:"#A16207",stroke:"#FEF9C3",text:"#FEF9C3"}},green:{label:"Green",light:{fill:"#BBF7D0",stroke:"#15803D",text:"#166534"},dark:{fill:"#15803D",stroke:"#DCFCE7",text:"#DCFCE7"}},cyan:{label:"Cyan",light:{fill:"#A5F3FC",stroke:"#0E7490",text:"#155E75"},dark:{fill:"#0E7490",stroke:"#CFFAFE",text:"#CFFAFE"}},blue:{label:"Blue",light:{fill:"#BFDBFE",stroke:"#1D4ED8",text:"#1E3A8A"},dark:{fill:"#1D4ED8",stroke:"#DBEAFE",text:"#DBEAFE"}},purple:{label:"Purple",light:{fill:"#DDD6FE",stroke:"#6D28D9",text:"#5B21B6"},dark:{fill:"#6D28D9",stroke:"#EDE9FE",text:"#EDE9FE"}},grey:{label:"Grey",light:{fill:"#E5E7EB",stroke:"#4B5563",text:"#374151"},dark:{fill:"#4B5563",stroke:"#E5E7EB",text:"#F9FAFB"}},bw:{label:"Black and white",light:{fill:"#FFFFFF",stroke:"#111827",text:"#111827"},dark:{fill:"#111827",stroke:"#FFFFFF",text:"#FFFFFF"}}}},Ut=_.classic,ae={light:{edge:{stroke:"#52616B",strokeWidth:2,text:"#3E4A54"},node:{fill:"#EAF2FF",stroke:"#3574C7",strokeWidth:2,text:"#17202A"}},dark:{edge:{stroke:"#B8C7D5",strokeWidth:2,text:"#D9E4ED"},node:{fill:"#193A61",stroke:"#71AEF7",strokeWidth:2,text:"#F3F8FC"}}};var Yt=["pink","red","orange","yellow","green","cyan","blue","purple","grey","bw"],Wt=["note","info","warning","success"],_t={2:"repeat(2, minmax(0, 1fr))",3:"repeat(3, minmax(0, 1fr))","2fr 1fr":"minmax(0, 2fr) minmax(0, 1fr)","1fr 2fr":"minmax(0, 1fr) minmax(0, 2fr)"};var yr=["nodes","edges","participants","messages","activations","notes","groups"],wr=["id","label","shape","position","size","style","palette","subtitle","textVAlign","textHAlign","children"],Er=["source","target","sourceAnchor","targetAnchor","route","label","style","start","end"],Kt=["fill","stroke","strokeWidth","text"],Sr=["stroke","strokeWidth","text"],Zt=["tone","colour"],$r=["id","label","kind","palette","style","size"],kr=["actor"],vr=["from","to","label","style"],Nr=["solid","dashed"],Dr=["participant","from","to"],Fr=["at","after","label","palette","style","size"],Mr=["label","from","to"],Tr=["width","height","participantSpacing","participantSize"];function y(r){return String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Me(r){let e=r.trim();if(e.startsWith('"')&&e.endsWith('"'))try{return JSON.parse(e)}catch{throw new Error(`Invalid quoted scalar: ${e}`)}if(e.startsWith("'")&&e.endsWith("'"))return e.slice(1,-1);if(/^-?\d+(\.\d+)?$/.test(e))return Number(e);if(e==="true"||e==="false")return e==="true";if(e.startsWith("{")&&e.endsWith("}")){let t=e.slice(1,-1).trim();if(!t)return{};let o=t.split(","),n={};for(let s of o){let i=s.indexOf(":");if(i===-1)throw new Error(`Invalid inline mapping: ${e}`);let a=s.slice(0,i).trim();n[a]=Me(s.slice(i+1))}return n}return e}function pe(r,e="classic"){let o=r.replace(/\r\n/g,`
`).split(`
`).filter(h=>h.trim()&&!h.trimStart().startsWith("#"));for(let h of o){if(h.trimStart()!==h||!h.trimEnd().endsWith(":"))continue;let b=h.trim().slice(0,-1);if(b!=="canvas"&&!yr.includes(b))throw new Error(`Unsupported diagram section: ${b}`)}let n=0,s=h=>h.length-h.trimStart().length,i=h=>h.trim().match(/^([^:]+):\s*(.*)$/),a=h=>h.trim().match(/^- ([^:]+):\s*(.*)$/),d=h=>n>=o.length||s(o[n])<=h?{}:o[n].trimStart().startsWith("- ")?l(s(o[n])):c(s(o[n])),c=h=>{let b={};for(;n<o.length&&s(o[n])===h;){let m=o[n],g=i(m);if(!g)throw new Error(`Cannot parse diagram line: ${m}`);n+=1,b[g[1]]=g[2]?Me(g[2]):d(h)}return b},l=h=>{let b=[];for(;n<o.length&&s(o[n])===h;){let m=o[n],g=a(m);if(!g)throw new Error(`Cannot parse diagram line: ${m}`);n+=1;let w={[g[1]]:g[2]?Me(g[2]):d(h)};for(;n<o.length&&s(o[n])>h;){let p=s(o[n]),E=i(o[n]);if(!E)throw new Error(`Cannot parse diagram line: ${o[n]}`);n+=1,w[E[1]]=E[2]?Me(E[2]):d(p)}b.push(w)}return b},u=c(0);if(!u.type)throw new Error(`Diagram type is required and must be one of: ${Oe.join(", ")}.`);if(typeof u.type!="string"||!Oe.includes(u.type))throw new Error(`Unsupported diagram type: ${String(u.type)}`);return u.type==="flowchart"?qr(u,e):Ar(u,e)}function qr(r,e="classic"){return r.canvas=r.canvas||{},Array.isArray(r.nodes)||(r.nodes=[]),Array.isArray(r.edges)||(r.edges=[]),Lr(r,e),r}function Ar(r,e="classic"){return Cr(r,e),r}function Z(r,e,t){for(let o of Object.keys(r||{}))if(!e.includes(o))throw new Error(`Unsupported ${t} field: ${o}`)}function Ft(r,e,t){if(r){for(let o of Object.keys(r))if(!e.includes(o))throw new Error(`Unsupported ${t} style field: ${o}`)}}function Lr(r,e="classic"){if(r.participants!==void 0||r.messages!==void 0||r.activations!==void 0||r.notes!==void 0||r.groups!==void 0)throw new Error("Flowchart diagrams do not support sequence sections.");let t=new Set,o=i=>{if("type"in i)throw new Error(`Node "${i.id||"unknown"}" uses removed field "type".`);if(Z(i,wr,`node "${i.id||"unknown"}"`),!i.id||!i.label)throw new Error("Every node requires an id and label.");if(!i.shape)throw new Error(`Node "${i.id}" requires a shape.`);if(!De.includes(i.shape))throw new Error(`Unsupported node shape: ${i.shape}`);if(i.textVAlign!==void 0&&!Vt.includes(i.textVAlign))throw new Error(`Unsupported node textVAlign: ${i.textVAlign}`);if(i.textHAlign!==void 0&&!Gt.includes(i.textHAlign))throw new Error(`Unsupported node textHAlign: ${i.textHAlign}`);if(i.palette&&(Z(i.palette,Zt,`palette for node "${i.id}"`),!(_[e]?.[i.palette.colour]?.[i.palette.tone]||null)))throw new Error(`Unsupported node palette: ${i.palette.tone||"unknown"} ${i.palette.colour||"unknown"}`);if(i.style?.width!==void 0)throw new Error("Node style.width is not supported; use style.strokeWidth.");if(Ft(i.style,Kt,`node "${i.id}"`),t.has(i.id))throw new Error(`Duplicate flowchart node id: ${i.id}`);if(t.add(i.id),i.children!==void 0&&!Array.isArray(i.children))throw new Error(`Children for node "${i.id}" must be a list.`);for(let a of i.children||[])o(a)};for(let i of r.nodes)o(i);for(let i of r.edges){if(Z(i,Er,`edge "${i.source||"unknown"}" -> "${i.target||"unknown"}"`),!i.sourceAnchor)throw new Error(`Edge "${i.source||"unknown"}" -> "${i.target||"unknown"}" requires a sourceAnchor.`);if(!i.targetAnchor)throw new Error(`Edge "${i.source||"unknown"}" -> "${i.target||"unknown"}" requires a targetAnchor.`);if(!K.includes(i.sourceAnchor))throw new Error(`Unsupported edge sourceAnchor: ${i.sourceAnchor}`);if(!K.includes(i.targetAnchor))throw new Error(`Unsupported edge targetAnchor: ${i.targetAnchor}`);if(i.route!==void 0&&!Fe.includes(i.route))throw new Error(`Unsupported edge route: ${i.route}`);if(i.start!==void 0&&!W.includes(i.start))throw new Error(`Unsupported edge start marker: ${i.start}`);if(i.end!==void 0&&!W.includes(i.end))throw new Error(`Unsupported edge end marker: ${i.end}`);if(i.style?.width!==void 0)throw new Error("Edge style.width is not supported; use style.strokeWidth.");Ft(i.style,Sr,`edge "${i.source||"unknown"}" -> "${i.target||"unknown"}"`)}let n=r.theme||"light";if(!ae[n])throw new Error(`Unsupported diagram theme: ${n}`)}function Cr(r,e="classic"){if(r.nodes!==void 0||r.edges!==void 0)throw new Error("Sequence diagrams do not support flowchart sections.");if(!Array.isArray(r.participants)||!Array.isArray(r.messages))throw new Error("Sequence diagrams require participants and messages sections.");if(r.activations!==void 0&&!Array.isArray(r.activations))throw new Error("Sequence diagram activations must be a list.");if(r.notes!==void 0&&!Array.isArray(r.notes))throw new Error("Sequence diagram notes must be a list.");if(r.groups!==void 0&&!Array.isArray(r.groups))throw new Error("Sequence diagram groups must be a list.");if(r.canvas!==void 0&&(typeof r.canvas!="object"||Array.isArray(r.canvas)))throw new Error("Sequence canvas must be a mapping.");Z(r.canvas,Tr,"sequence canvas");for(let s of["width","height","participantSpacing"]){let i=r.canvas?.[s];if(i!==void 0&&(!Number.isFinite(i)||Number(i)<=0))throw new Error(`Sequence canvas.${s} must be a positive number.`)}if(r.canvas?.participantSize!==void 0){if(typeof r.canvas.participantSize!="object"||Array.isArray(r.canvas.participantSize))throw new Error("Sequence canvas.participantSize must be a mapping.");Z(r.canvas.participantSize,["width","height"],"sequence canvas participantSize");for(let s of["width","height"]){let i=r.canvas.participantSize[s];if(i!==void 0&&(!Number.isFinite(i)||Number(i)<=0))throw new Error(`Sequence canvas.participantSize.${s} must be a positive number.`)}}let t=new Set;for(let s of r.participants){if(Z(s,$r,`participant "${s.id||"unknown"}"`),!s.id||!s.label)throw new Error("Every sequence participant requires an id and label.");if(s.kind!==void 0&&!kr.includes(s.kind))throw new Error(`Unsupported sequence participant kind: ${s.kind}`);if(Xt(s,`participant "${s.id}"`,e),t.has(s.id))throw new Error(`Duplicate sequence participant id: ${s.id}`);t.add(s.id)}for(let[s,i]of r.messages.entries()){if(Z(i,vr,`message ${s}`),!i.from||!i.to||!i.label)throw new Error(`Sequence message ${s} requires from, to, and label.`);if(!t.has(i.from)||!t.has(i.to))throw new Error(`Sequence message ${s} references an unknown participant.`);if(i.style!==void 0&&!Nr.includes(i.style))throw new Error(`Unsupported sequence message style: ${i.style}`)}for(let[s,i]of(r.activations||[]).entries()){if(Z(i,Dr,`activation ${s}`),!i.participant||!Number.isInteger(i.from)||!Number.isInteger(i.to))throw new Error(`Sequence activation ${s} requires participant and integer from and to message positions.`);if(!t.has(i.participant))throw new Error(`Sequence activation ${s} references an unknown participant.`);if(i.from<1||i.to<i.from||i.to>r.messages.length)throw new Error(`Sequence activation ${s} range is out of bounds.`)}for(let[s,i]of(r.notes||[]).entries()){Z(i,Fr,`note ${s}`);let a=i.after;if(!i.at||!Number.isInteger(a)||!i.label)throw new Error(`Sequence note ${s} requires at, after, and label.`);if(Xt(i,`note ${s}`,e),!t.has(i.at))throw new Error(`Sequence note ${s} references an unknown participant.`);if(a<0||a>r.messages.length)throw new Error(`Sequence note ${s} after position is out of bounds.`)}for(let[s,i]of(r.groups||[]).entries()){if(Z(i,Mr,`group ${s}`),!i.label&&i.label!=="")throw new Error(`Sequence group ${s} requires a label.`);if(!Number.isInteger(i.from)||!Number.isInteger(i.to))throw new Error(`Sequence group ${s} requires integer from and to indices.`);if(i.from<1||i.to<i.from||i.to>r.messages.length)throw new Error(`Sequence group ${s} range is out of bounds.`)}let o=r.theme||"light";if(!ae[o])throw new Error(`Unsupported diagram theme: ${o}`)}function Xt(r,e,t="classic"){if(r.palette&&(Z(r.palette,Zt,`palette for ${e}`),!_[t]?.[String(r.palette.colour)]?.[String(r.palette.tone)]))throw new Error(`Unsupported ${e} palette: ${String(r.palette.tone||"unknown")} ${String(r.palette.colour||"unknown")}`);if(Ft(r.style,Kt,e),r.size){Z(r.size,["width","height"],`size for ${e}`);for(let o of["width","height"]){let n=r.size[o];if(n!==void 0&&(!Number.isFinite(n)||Number(n)<=0))throw new Error(`${e} size.${o} must be a positive number.`)}}}function fe(r){return typeof r=="number"||typeof r=="boolean"?String(r):r&&typeof r=="object"?Object.keys(r).length?`{ ${Object.entries(r).map(([e,t])=>`${e}: ${fe(t)}`).join(", ")} }`:"{}":/^[\w./-]+(?: [\w./-]+)*$/.test(String(r))?String(r):JSON.stringify(String(r))}function ce(r,e=2){let t=Object.entries(r),[o,n]=t[0],s=[`${" ".repeat(e)}- ${o}: ${fe(n)}`];for(let[i,a]of t.slice(1))if(!(i==="children"&&Array.isArray(a)&&!a.length))if(i==="children"&&Array.isArray(a)){s.push(`${" ".repeat(e+2)}children:`);for(let d of a)s.push(...ce(d,e+4))}else s.push(`${" ".repeat(e+2)}${i}: ${fe(a)}`);return s}function ot(r){let e=[`type: ${fe(r.type)}`];for(let[t,o]of Object.entries(r))t==="type"||t==="canvas"||t==="nodes"||t==="edges"||t==="participants"||t==="messages"||t==="activations"||t==="notes"||t==="groups"||e.push(`${t}: ${fe(o)}`);if(r.type==="sequence"){if(r.canvas!==void 0){e.push("canvas:");for(let[t,o]of Object.entries(r.canvas))e.push(`  ${t}: ${fe(o)}`)}e.push("participants:");for(let t of r.participants||[])e.push(...ce(t));e.push("messages:");for(let t of r.messages||[])e.push(...ce(t));if(r.activations!==void 0){e.push("activations:");for(let t of r.activations||[])e.push(...ce(t))}if(r.notes!==void 0){e.push("notes:");for(let t of r.notes||[])e.push(...ce(t))}if(r.groups!==void 0){e.push("groups:");for(let t of r.groups||[])e.push(...ce(t))}return e.join(`
`)}e.push("canvas:");for(let[t,o]of Object.entries(r.canvas||{}))e.push(`  ${t}: ${fe(o)}`);e.push("nodes:");for(let t of r.nodes||[])e.push(...ce(t));e.push("edges:");for(let t of r.edges||[])e.push(...ce(t));return e.join(`
`)}function Jt(r){return{width:Number(r.size?.width)||z.width,height:Number(r.size?.height)||z.height}}function H(r){let e=[],t=(o,n,s,i)=>{for(let a of o){let d={x:s.x+(Number(a.position?.x)||0),y:s.y+(Number(a.position?.y)||0)};e.push({node:a,parent:n,siblings:o,position:d,depth:i}),t(a.children||[],a,d,i+1)}};return t(r.nodes,null,{x:0,y:0},0),e}function j(r,e){return H(r).find(t=>t.node.id===e)||null}function Mt(r,e){return H(r).find(t=>t.node===e)?.position||{x:0,y:0}}function U(r,e){return{...Mt(r,e),...Jt(e)}}function Qt(r,e){return(e.children||[]).some(t=>t===r||Qt(r,t))}function nt(r,e){var h;let t=j(r,e);if(!t)return null;let{node:o,siblings:n,position:s}=t,{width:i,height:a}=Jt(o),d={x:s.x+i/2,y:s.y+a/2},l=H(r).filter(b=>b.node!==o&&!Qt(b.node,o)).filter(b=>{let m=U(r,b.node);return d.x>=m.x&&d.x<=m.x+m.width&&d.y>=m.y&&d.y<=m.y+m.height}).reduce((b,m)=>!b||m.depth>=b.depth?m:b,null),u=l?(h=l.node).children||(h.children=[]):r.nodes;return n===u||(n.splice(n.indexOf(o),1),o.position={x:s.x-(l?.position.x||0),y:s.y-(l?.position.y||0)},u.push(o)),o}function xe(r,e="light"){let t=r.theme||e,o=ae[t];if(!o)throw new Error(`Unsupported diagram theme: ${t}`);return o}function Te(r,e,t){return _[r]?.[t]?.[e]||null}function be(r,e){return{...r,...e||{}}}function le(r,e,t="light",o="classic"){let s=xe(r,t).node,i=e.palette?Te(o,e.palette.tone,e.palette.colour):null;return be(be(s,i),e.style)}function qe(r,e,t="light",o="classic"){let n=xe(r,t),s=e.palette?Te(o,e.palette.tone,e.palette.colour):null;return be(be(n.node,s),e.style)}function Ae(r,e,t="light"){let o=xe(r,t);return be(o.edge,e.style)}function Ge(r,e){let t=e==="start"?r.start:r.end;return typeof t=="string"&&W.includes(t)?t:Ve[e]}function re(r){let e=Number(r.canvas?.grid);return Number.isFinite(e)&&e>0?e:0}function J(r,e){return e?Math.round(r/e)*e:Math.round(r)}function Le(r,e,t){let o=J(r,t),n=t?Math.ceil(e/t)*t:e;return Math.max(n,o)}function er(r){return{x:Number(r.position?.x)||0,y:Number(r.position?.y)||0,width:Number(r.size?.width)||z.width,height:Number(r.size?.height)||z.height}}function Ce(r,e,t=40){let o=Number(r.canvas?.width)||1e3,n=Number(r.canvas?.height)||560,s=new Set(H(r).map(m=>m.node)),i=[...s];i.includes(e)||i.push(e);let a=m=>s.has(m)?U(r,m):er(m),d=i.map(a),c=Math.min(0,...d.map(m=>m.x)),l=Math.min(0,...d.map(m=>m.y)),u=c<0?t-c:0,h=l<0?t-l:0;if(u||h)for(let m of H(r).filter(g=>g.parent===null)){let g=m.node;g.position={...g.position,x:(Number(g.position?.x)||0)+u,y:(Number(g.position?.y)||0)+h}}let b=i.map(a);return r.canvas={...r.canvas,width:Math.max(o+u,...b.map(m=>m.x+m.width+t)),height:Math.max(n+h,...b.map(m=>m.y+m.height+t))},r}function tr(r,e){return r.x<e.x+e.width&&r.x+r.width>e.x&&r.y<e.y+e.height&&r.y+r.height>e.y}function Tt(r,e="new-node"){let t=s=>s.flatMap(i=>[i.id,...t(i.children||[])]),o=new Set(t(r));if(!o.has(e))return e;let n=2;for(;o.has(`${e}-${n}`);)n+=1;return`${e}-${n}`}function zr(r,e){let t=e.replace(/[^a-z0-9]/gi,"").toLowerCase()||"node",o=1,n="";do n=`${t}${String(o).padStart(2,"0")}`,o+=1;while(r.has(n));return r.add(n),n}function Pr(r,e,t,o){let n=Number(r.canvas?.width)||1e3,s=Number(r.canvas?.height)||560,i=re(r),a=i||20,d={x:J(o.x,i),y:J(o.y,i)};for(let l=a;l<=Math.max(n,s);l+=a)for(let u of[{x:d.x+l,y:d.y+l},{x:d.x+l,y:d.y-l},{x:d.x-l,y:d.y+l},{x:d.x-l,y:d.y-l}])if(!(u.x<0||u.y<0||u.x+e>n||u.y+t>s)&&!H(r).some(({node:h})=>tr({...u,width:e,height:t},U(r,h))))return u;let c=Math.max(0,...H(r).map(({node:l})=>{let u=U(r,l);return u.x+u.width}));return{x:J(c+a,i),y:0}}function qt(r){let e=Number(r.canvas?.width)||1e3,t=Number(r.canvas?.height)||560,o=re(r),n={x:J(Math.max(0,(e-z.width)/2),o),y:J(Math.max(0,(t-z.height)/2),o)},s=o||20;for(let i=0;i<=Math.max(e,t);i+=s)for(let a of[{x:n.x+i,y:n.y},{x:n.x-i,y:n.y},{x:n.x,y:n.y+i},{x:n.x,y:n.y-i}])if(!(a.x<0||a.y<0||a.x+z.width>e||a.y+z.height>t)&&!H(r).some(({node:d})=>tr({...a,width:z.width,height:z.height},er(d))))return a;return n}function At(r){let e={id:Tt(r.nodes),label:z.label,shape:z.shape,position:qt(r),size:{width:z.width,height:z.height}};return r.nodes.push(e),e}function it(r,e){let t=j(r,e);if(!t)return null;let o=new Set(H(r).map(({node:c})=>c.id)),n=c=>({id:zr(o,c.shape),label:c.label,shape:c.shape,...c.position?{position:{...c.position}}:{},...c.size?{size:{...c.size}}:{},...c.style?{style:{...c.style}}:{},...c.palette?{palette:{...c.palette}}:{},...c.subtitle!==void 0?{subtitle:c.subtitle}:{},...c.textVAlign!==void 0?{textVAlign:c.textVAlign}:{},...c.textHAlign!==void 0?{textHAlign:c.textHAlign}:{},...c.children?{children:c.children.map(n)}:{}}),s=n(t.node),i=U(r,t.node),a=Pr(r,Number(s.size?.width)||z.width,Number(s.size?.height)||z.height,i),d=t.parent?Mt(r,t.parent):{x:0,y:0};return s.position={x:a.x-d.x,y:a.y-d.y},t.siblings.push(s),Ce(r,s),s}function st(r,e,t,o,n){let s={source:e,target:o,sourceAnchor:t,targetAnchor:n,route:"orthogonal",end:"arrow"};return r.edges.push(s),s}function at(r,e,t,o){return e==="source"?(r.source=t,r.sourceAnchor=o):(r.target=t,r.targetAnchor=o),r}function dt(r,e){return e<0||e>=r.edges.length?null:r.edges.splice(e,1)[0]}function ct(r,e){let t=j(r,e);if(!t)return{node:null,deletedEdges:[]};let o=new Set([t.node,...t.node.children||[]].flatMap(function s(i){return[i,...(i.children||[]).flatMap(s)]}).map(s=>s.id)),n=r.edges.filter(s=>o.has(s.source)||o.has(s.target));return t.siblings.splice(t.siblings.indexOf(t.node),1),r.edges=r.edges.filter(s=>!o.has(s.source)&&!o.has(s.target)),{node:e,deletedEdges:n}}function ze(r,e){return r.label=String(e).trim()||r.label,r}function lt(r,e){return r.shape=e,r}function ut(r,e){return r.subtitle=String(e??"").trim(),r}function Ue(r,e,t){return e==="textVAlign"&&(t==="top"||t==="center")&&(r.textVAlign=t),e==="textHAlign"&&(t==="left"||t==="center"||t==="right")&&(r.textHAlign=t),r}function ye(r,e,t){return r.style={...r.style,[e]:t},r}function Ye(r,e,t,o="classic"){if(!Te(o,e,t))return r;let{fill:s,stroke:i,text:a,...d}=r.style||{};return Object.keys(d).length?r.style=d:delete r.style,r.palette={tone:e,colour:t},r}function rr(r){return r==="document"?Dt:Nt}function We(r){return{position:{x:Number(r.position?.x)||0,y:Number(r.position?.y)||0},size:{width:Number(r.size?.width)||z.width,height:Number(r.size?.height)||z.height},childPositions:new Map((r.children||[]).map(e=>[e,{x:Number(e.position?.x)||0,y:Number(e.position?.y)||0}]))}}function mt(r,e,t,o,n,s=We(e)){let i=re(r),a=rr(e.shape),d=t.endsWith("left"),c=t.startsWith("top"),l=Le(s.size.width+(d?-o:o),a.width,i),u=Le(s.size.height+(c?-n:n),a.height,i);if(e.shape==="circle"){let g=Math.max(l,u);l=g,u=g}let h={...e.position,x:d?s.position.x+s.size.width-l:s.position.x,y:c?s.position.y+s.size.height-u:s.position.y},b=s.position.x-h.x,m=s.position.y-h.y;for(let g of e.children||[]){let w=s.childPositions.get(g)||g.position||{x:0,y:0};g.position={...g.position,x:w.x+b,y:w.y+m}}return e.position=h,e.size={...e.size,width:l,height:u},e}function _e(r,e,t,o){let n=re(r),s=rr(e.shape),i=t==="width"?s.width:s.height,a=Le(Number(o)||i,i,n);return e.size=e.shape==="circle"?{...e.size,width:a,height:a}:{...e.size,[t]:a},e}function Pe(r,e){return r.label=String(e).trim(),r}function gt(r,e){return r.route=e,r}function Xe(r,e,t){return e==="source"?r.sourceAnchor=t:r.targetAnchor=t,r}function Ke(r,e,t){return r.style={...r.style,[e]:t},r}function Ze(r,e){let t=Math.max(1,Math.round(Number(e))||1);return r.style={...r.style,strokeWidth:t},r}function ht(r,e){return r.start=W.includes(e)?e:Ve.start,r}function pt(r,e){return r.end=W.includes(e)?e:Ve.end,r}function Lt(r){return Math.max(25,Number(r)||100)}function oe(r){return String(r??"").replace(/\r\n/g,`
`).split(`
`)}function Q(r,e,t,o,n,s,i="middle"){if(!t.length)return"";let a=t.map((d,c)=>{let l=c===0?"":` dy="${o}"`;return`<tspan x="${r}"${l}>${y(d)||" "}</tspan>`}).join("");return`<text x="${r}" y="${e}" text-anchor="${i}" class="${n}" fill="${y(s)}">${a}</text>`}function de(r,e,t,o,n){let s=r.shape,i=e+o/2,a=t+n/2,d={x:e+12,y:t+12,width:o-24,height:n-24},c={top:{x:i,y:t},right:{x:e+o,y:a},bottom:{x:i,y:t+n},left:{x:e,y:a}},l;if(s==="circle"){let u=Math.min(o,n),h=i-u/2,b=a-u/2,m=u/2;d.x=h+m*.3,d.y=b+m*.3,d.width=m*1.4,d.height=m*1.4,c.top.y=b,c.right.x=h+u,c.bottom.y=b+u,c.left.x=h,l=`<circle class="docdiagram-node-body" cx="${i}" cy="${a}" r="${m}"/>`}else if(s==="oval")d.x+=o*.1,d.width-=o*.2,l=`<ellipse class="docdiagram-node-body" cx="${i}" cy="${a}" rx="${o/2}" ry="${n/2}"/>`;else if(s==="database"){let u=Math.min(n*.22,18);d.y+=u/2,d.height-=u,l=`<path class="docdiagram-node-body" d="M ${e} ${t+u} C ${e} ${t-u/3} ${e+o} ${t-u/3} ${e+o} ${t+u} V ${t+n-u} C ${e+o} ${t+n+u/3} ${e} ${t+n+u/3} ${e} ${t+n-u} Z"/><path class="docdiagram-node-detail" d="M ${e} ${t+u} C ${e} ${t+u*2.3} ${e+o} ${t+u*2.3} ${e+o} ${t+u}" fill="none"/>`}else if(s==="diamond")d.x+=o*.25,d.y+=n*.25,d.width-=o*.5,d.height-=n*.5,c.top={x:i,y:t},c.right={x:e+o,y:a},c.bottom={x:i,y:t+n},c.left={x:e,y:a},l=`<polygon class="docdiagram-node-body" points="${i},${t} ${e+o},${a} ${i},${t+n} ${e},${a}"/>`;else if(s==="rhombus"){let u=Math.min(o*.2,n*.6);d.x+=u,d.width-=u*2,c.left.x=e+u/2,c.right.x=e+o-u/2,l=`<polygon class="docdiagram-node-body" points="${e+u},${t} ${e+o},${t} ${e+o-u},${t+n} ${e},${t+n}"/>`}else if(s==="flattened-hexagon"){let u=Math.min(o*.18,n*.7);d.x+=u,d.width-=u*2,l=`<polygon class="docdiagram-node-body" points="${e+u},${t} ${e+o-u},${t} ${e+o},${a} ${e+o-u},${t+n} ${e+u},${t+n} ${e},${a}"/>`}else if(s==="chevron"){let u=Math.min(o*.16,n*.45);d.x+=u*1.175,d.width-=u*1.35,c.left.x=e+u,l=`<polygon class="docdiagram-node-body" points="${e},${t} ${e+o-u},${t} ${e+o},${a} ${e+o-u},${t+n} ${e},${t+n} ${e+u},${a}"/>`}else if(s==="right-chevron"){let u=Math.min(o*.16,n*.45);d.width-=u,l=`<polygon class="docdiagram-node-body" points="${e},${t} ${e+o-u},${t} ${e+o},${a} ${e+o-u},${t+n} ${e},${t+n}"/>`}else if(s==="document"){let u=Math.max(12,Math.min(26,Math.min(o,n)*.18));d.width-=u*.45,d.y+=2,d.height-=2,l=`<path class="docdiagram-node-body" d="M ${e} ${t} H ${e+o-u} L ${e+o} ${t+u} V ${t+n} H ${e} Z M ${e+o-u} ${t} V ${t+u} H ${e+o}"/>`}else l=`<rect class="docdiagram-node-body" x="${e}" y="${t}" width="${o}" height="${n}" rx="12"/>`;return{bodyMarkup:l,textBounds:d,anchors:c}}function Ie(r,e,t,o,n){let s,i;typeof r=="number"?(s={x:r,y:e,width:t||0,height:o||0},i=n):(s=r,i=e);let a=20,d=15,c=oe(i.label),l=i.subtitle?oe(i.subtitle):[],u=l.length?6:0,h=c.length*a,b=l.length*d,m=h+u+b,g=i.textHAlign||"center",w=g==="left"?s.x:g==="right"?s.x+s.width:s.x+s.width/2,p=g==="left"?"start":g==="right"?"end":"middle",E=s.y+s.height/2,x=i.textVAlign==="top"?s.y:E-m/2;return{centerX:w,textAnchor:p,labelLines:c,subtitleLines:l,labelLineHeight:a,subtitleLineHeight:d,labelStartY:x+a*.72,subtitleStartY:x+h+u+d*.72}}function Re(r,e,t){return r.bodyMarkup.replace("/>",` fill="${y(e.fill||"")}" stroke="${y(e.stroke||"")}" stroke-width="${t}"/>`).replace('class="docdiagram-node-detail"',`class="docdiagram-node-detail" stroke="${y(e.stroke||"")}" stroke-width="${t}"`)}function or(r){return{top:{x:0,y:-1},right:{x:1,y:0},bottom:{x:0,y:1},left:{x:-1,y:0}}[r]}function ue(r){return`${r.x} ${r.y}`}function Ir(r){let e=r.slice(1).map((n,s)=>{let i=r[s];return{start:i,end:n,length:Math.hypot(n.x-i.x,n.y-i.y)}}),o=e.reduce((n,s)=>n+s.length,0)/2;for(let n of e){if(o<=n.length||n===e[e.length-1]){let s=n.length?o/n.length:0;return{x:n.start.x+(n.end.x-n.start.x)*s,y:n.start.y+(n.end.y-n.start.y)*s}}o-=n.length}return r[0]}function we(r,e,t,o,n="orthogonal"){let s=or(t),i=or(o),a=s.x!==0,d,c,l,u;if(n==="straight")d=`M ${ue(r)} L ${ue(e)}`,c={x:(r.x+e.x)/2,y:(r.y+e.y)/2},l={x:e.x-r.x,y:e.y-r.y},u=l;else if(n==="curved"){let h=Math.max(Math.abs(e.x-r.x),Math.abs(e.y-r.y),80),b=Math.min(h/2,140),m={x:r.x+s.x*b,y:r.y+s.y*b},g={x:e.x+i.x*b,y:e.y+i.y*b};d=`M ${ue(r)} C ${ue(m)} ${ue(g)} ${ue(e)}`,c={x:(r.x+3*m.x+3*g.x+e.x)/8,y:(r.y+3*m.y+3*g.y+e.y)/8},l={x:m.x-r.x,y:m.y-r.y},u={x:e.x-g.x,y:e.y-g.y}}else{let b={x:r.x+s.x*40,y:r.y+s.y*40},m={x:e.x+i.x*40,y:e.y+i.y*40},g=a?{x:m.x,y:b.y}:{x:b.x,y:m.y},w=[r,b,g,m,e],p=w.filter((x,N)=>N===0||x.x!==w[N-1].x||x.y!==w[N-1].y);p.length===1&&(p=[r,{x:r.x+s.x*40,y:r.y+s.y*40},e]),d=`M ${ue(p[0])}${p.slice(1).map(x=>` L ${ue(x)}`).join("")}`,c=Ir(p),l={x:p[1].x-p[0].x,y:p[1].y-p[0].y};let E=p.slice(-2);u={x:E[1].x-E[0].x,y:E[1].y-E[0].y}}return{path:d,midpoint:c,startTangent:l,endTangent:u,hitPath:d}}function Ct(r){let e=Math.max(1,Number(r)||2),t=6+e*2.5,o=Math.max(t*.38,e/2+1);return{size:t,circleRadius:o}}function Je(r,e,t,o,n){let s=y(o),{size:i,circleRadius:a}=Ct(n),d=i/2;return e==="arrow"?`<marker id="${r}" markerWidth="${i}" markerHeight="${i}" refX="${i}" refY="${d}" markerUnits="userSpaceOnUse" orient="${t==="start"?"auto-start-reverse":"auto"}"><path fill="${s}" stroke="${s}" d="M 0 0 L ${i} ${d} L 0 ${i} z"/></marker>`:e==="circle"?`<marker id="${r}" markerWidth="${i}" markerHeight="${i}" refX="${d}" refY="${d}" markerUnits="userSpaceOnUse"><circle cx="${d}" cy="${d}" r="${a}" fill="${s}" stroke="${s}"/></marker>`:""}function zt(r){let e=r.replace(/\r\n/g,`
`).split(`
`),t=e.findIndex(s=>s.trim()!=="");if(t===-1||e[t]!=="---")return{content:r,frontmatter:{}};let o=e.indexOf("---",t+1);if(o===-1)return{content:r,frontmatter:{}};let n={};for(let s of e.slice(t+1,o)){if(!s.trim()||s.trimStart().startsWith("#"))continue;let i=s.match(/^([^:]+):\s*(.*)$/);if(!i)throw new Error(`Cannot parse document frontmatter line: ${s}`);n[i[1]]=Me(i[2])}return{content:e.slice(o+1).join(`
`),frontmatter:n}}function ft(r){let e=zt(r),t=String(e.frontmatter.theme||"light"),o=String(e.frontmatter.colourScheme||"classic");if(!ae[t])throw new Error(`Unsupported document theme: ${t}`);if(!_[o])throw new Error(`Unsupported document colour scheme: ${o}`);return{...e,theme:t,colourScheme:o}}function Pt(r){let e=ft(r),t=e.content.replace(/\r\n/g,`
`).split(`
`),o=0,n=new Set,s=!1,i=!1;for(let a of t){let d=a.replace(/^(?: {0,3}> ?)+/,"");if(/^```/.test(d)){i=!i;continue}if(!i&&/^:::diagram\s+\{\s*id=/.test(d)){s=!0;break}}for(;o<t.length;){let d=t[o].replace(/^(?: {0,3}> ?)+/,"").match(/^```([\w-]*)\s*$/);if(!d){o+=1;continue}let c=t.slice(o+1).findIndex(u=>/^```\s*$/.test(u.replace(/^(?: {0,3}> ?)+/,"")));if(c===-1)throw new Error("Unclosed code block.");let l=o+c+1;if(d[1]==="diagram"){let u=t.slice(o+1,l).map(b=>b.replace(/^(?: {0,3}> ?)+/,"")).join(`
`);pe(u,e.colourScheme);let h=u.match(/^id:\s*(?:"([^"]+)"|([^\s#]+))\s*$/m)?.slice(1).find(Boolean);if(h){if(n.has(h))throw new Error(`Duplicate diagram id: ${h}`);n.add(h)}else if(s)throw new Error("Every diagram requires an id when using diagram references.")}o=l+1}return e}function It(r,e){let t=r.replace(/\r\n/g,`
`),o=t.split(`
`),n=o.findIndex(c=>c.trim()!==""),s=n!==-1&&o[n]==="---",i=s?o.indexOf("---",n+1):-1;if(!s||i===-1)return`---
theme: ${e}
---
${t}`;let a=!1,d=o.slice(n+1,i).map(c=>{if(!c.trim()||c.trimStart().startsWith("#"))return c;let l=c.match(/^([^:]+):\s*(.*)$/);return l&&l[1]==="theme"?(a=!0,`theme: ${e}`):c});return a||d.push(`theme: ${e}`),[...o.slice(0,n+1),...d,...o.slice(i)].join(`
`)}function bt(r,e){let t=e.trim(),o=t?r.indexOf(t):-1;return o===-1?null:{start:o,end:o+t.length}}function xt(r,e){let t=Number.parseFloat(globalThis.getComputedStyle(r).lineHeight)||20,o=r.value.slice(0,e.start).split(`
`).length-1,n=Math.max(1,Math.floor(r.clientHeight/t));r.scrollTop=Math.max(0,(o-Math.floor(n/2))*t)}function Rt(r){let e=[],t="",o=!1,n=r.trim().replace(/^\||\|$/g,"");for(let s of n)o?(t+=s,o=!1):s==="\\"?o=!0:s==="|"?(e.push(t.trim()),t=""):t+=s;return e.push(t.trim()),e}function nr(r){let e=Rt(r);return!e.length||!e.every(t=>/^:?-{3,}:?$/.test(t))?null:e.map(t=>t.startsWith(":")&&t.endsWith(":")?"center":t.startsWith(":")?"left":t.endsWith(":")?"right":"")}function Ee(r){return r.match(/^(\s*)([-+*]|\d+[.)])\s+(.+)$/)}function Ht(r){let e=r.match(/^:::(section|panel|callout|grid|stack)(?:\s+\{(.*)\})?\s*$/);if(!e)return null;let t={},o=e[2];if(o!==void 0){let n=0,s=/\s*([a-z][\w-]*)=(?:"([^"]*)"|([^\s}]+))/gi,i;for(;i=s.exec(o);){if(i.index!==n||t[i[1]]!==void 0)return null;t[i[1]]=i[2]??i[3],n=s.lastIndex}if(o.slice(n).trim())return null}return{name:e[1],attributes:t}}function ir(r){let e=r.match(/^:::diagram\s+\{\s*id=(?:"([^"]+)"|([^\s}]+))\s*\}\s*$/),t=e?.[1]??e?.[2];return t?{id:t}:null}function sr(r){let e=r.match(/^id:\s*(?:"([^"]+)"|([^\s#]+))\s*$/m);return e?.[1]??e?.[2]??null}function Rr(r){return r.replace(/^(?: {0,3}> ?)+/,"")}function Hr(r){return/^:::(?:\s+.*)?$/.test(r)}function jr(r,e,t){let o=1,n=!1;for(let s=e+1;s<t;s+=1){if(/^```/.test(r[s])){n=!n;continue}if(!n){if(Ht(r[s]))o+=1;else if(Hr(r[s])&&(o-=1,!o))return s}}return-1}function Br(r){return/^#[\da-f]{3,8}$/i.test(r)}function Or(r,e="classic"){let t=r.tone!==void 0||r.colour!==void 0;if(t&&(!["light","dark"].includes(r.tone)||!Yt.includes(r.colour)))return null;for(let i of["fill","stroke","text"])if(r[i]!==void 0&&!Br(r[i]))return null;let o=t?Te(e,r.tone,r.colour):null,n=Object.fromEntries(["fill","stroke","text"].filter(i=>r[i]!==void 0).map(i=>[i,r[i]])),s=be(o||{},n);return Object.entries(s).filter(([,i])=>i!==void 0).map(([i,a])=>`--docdiagram-component-${i}:${a}`).join(";")}function yt(r,e=!1){let t=String(r).trim();if(t.startsWith("//")||t.startsWith("\\"))return!1;if(!t||t.startsWith("#")||t.startsWith("/")||t.startsWith("./")||t.startsWith("../")||t.startsWith("?")||e&&/^data:image\/(?:gif|jpeg|png|webp);base64,/i.test(t))return!0;let o=t.match(/^([a-z][a-z\d+.-]*):/i);return!o||["http","https","mailto"].includes(o[1].toLowerCase())}function me(r){let e=[],t=String(r).replace(/`([^`]+)`/g,(o,n)=>{let s=`\0${e.length}\0`;return e.push(`<code>${y(n)}</code>`),s});return t=y(t),t=t.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,(o,n,s)=>{let i=s.replace(/&amp;/g,"&");return yt(i,!0)?`<img src="${y(i)}" alt="${n}">`:`![${n}](${y(s)})`}),t=t.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,(o,n,s)=>{let i=s.replace(/&amp;/g,"&");return yt(i)?`<a href="${y(i)}">${n}</a>`:`[${n}](${y(s)})`}),t=t.replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g,"<strong>$2</strong>").replace(/~~(?=\S)([\s\S]*?\S)~~/g,"<del>$1</del>").replace(/(?<!\*)\*(?=\S)([\s\S]*?\S)\*(?!\*)/g,"<em>$1</em>").replace(/(?<!_)_(?=\S)([\s\S]*?\S)_(?!_)/g,"<em>$1</em>"),t.replace(/\u0000(\d+)\u0000/g,(o,n)=>e[Number(n)])}function jt(r,e={diagramIndex:0},t){let o=r.replace(/\r\n/g,`
`).split(`
`),n=t?.renderDiagram??((m,g)=>{throw new Error("renderDiagram callback is required for diagram blocks.")}),s=t?.documentColorScheme||"classic",i=t?.diagramReferenceRegistry||(()=>{let m=new Map,g=new Set,w=new Map,p=o.map(Rr);for(let x=0;x<p.length;x+=1){if(!/^```diagram\s*$/.test(p[x]))continue;let N=p.slice(x+1).findIndex(T=>/^```\s*$/.test(T));if(N===-1)break;let F=p.slice(x+1,x+N+1).join(`
`),S=sr(F);S&&(m.has(S)?g.add(S):m.set(S,{id:S,source:F})),x+=N+1}let E=!1;for(let x of p){if(/^```/.test(x)){E=!E;continue}if(!E){let N=ir(x);N&&w.set(N.id,(w.get(N.id)||0)+1)}}return{definitions:m,duplicateDefinitionIds:g,referenceCounts:w}})(),{definitions:a,duplicateDefinitionIds:d,referenceCounts:c}=i;function l(m){let g=o[m]||"";return!g.trim()||/^```/.test(g)||/^(#{1,6})\s+/.test(g)||/^ {0,3}&gt;|^ {0,3}>/.test(g)||/^ {0,3}(?:[-*_]\s*){3,}$/.test(g)||/^:::/.test(g)||!!Ee(g)||m+1<o.length&&!!nr(o[m+1])}function u(m,g){let w=Ee(o[m]),p=/^\d/.test(w[2]),E=[],x=m,N=p?Number.parseInt(w[2],10):null;for(;x<o.length;){let $=Ee(o[x]);if(!$||$[1].length!==g||/^\d/.test($[2])!==p)break;let v={content:[$[3]],children:[]};for(x+=1;x<o.length;){let M=Ee(o[x]);if(M&&M[1].length>g){let D=u(x,M[1].length);v.children.push(D.html),x=D.index;continue}if(!o[x].trim()){x+=1;let D=x<o.length?Ee(o[x]):null;if(x>=o.length||!D||D[1].length<=g)break;continue}if(/^\s+/.test(o[x])&&!Ee(o[x])){v.content.push(o[x].trim()),x+=1;continue}break}E.push(v)}let F=p?"ol":"ul",S=p&&N!==1?` start="${N}"`:"",T=E.map($=>{let v=!p&&$.content.length===1&&$.content[0].match(/^\[([ xX])\]\s+(.*)$/),M=v?`<input type="checkbox" disabled${v[1].toLowerCase()==="x"?" checked":""}> ${me(v[2])}`:me($.content.join(" "));return`<li${v?' class="docdiagram-task-list-item"':""}>${M}${$.children.join("")}</li>`}).join("");return{html:`<${F}${S}>${T}</${F}>`,index:x}}function h(m,g){let w=Ht(o[m]),p=w?jr(o,m,g):-1;if(!w||p===-1)return null;let{name:E,attributes:x}=w,N={section:["title","tone","colour","fill","stroke","text"],panel:["title","tone","colour","fill","stroke","text"],callout:["kind","title","tone","colour","fill","stroke","text"],grid:["columns"],stack:[]};if(Object.keys(x).some(v=>!N[E].includes(v)))return null;if(E==="grid"){let v=_t[x.columns];if(!v)return null;let M=[],D=m+1;for(;D<p;){if(!o[D].trim()){D+=1;continue}let Y=Ht(o[D]);if(!Y||!["panel","callout","stack"].includes(Y.name))return null;let R=h(D,p);if(!R)return null;M.push(`<div class="docdiagram-grid-item">${R.html}</div>`),D=R.next}return{html:`<div class="docdiagram-grid" style="--docdiagram-grid-columns:${v}">${M.join("")}</div>`,next:p+1}}if(E==="stack")return Object.keys(x).length?null:{html:`<div class="docdiagram-stack">${b(m+1,p)}</div>`,next:p+1};let F=Or(x,s);if(F===null||E==="callout"&&x.kind!==void 0&&!Wt.includes(x.kind))return null;let S=x.title?`<div class="docdiagram-component-title">${me(x.title)}</div>`:"",T=b(m+1,p),$=`docdiagram-component${E==="callout"?"":` docdiagram-${E}`}${F?" docdiagram-component-styled":""}`;if(E==="callout"){let v=x.kind||"info";return{html:`<aside class="${$} docdiagram-callout docdiagram-callout-${v}"${F?` style="${F}"`:""} aria-label="${y(x.title||v)} callout"><div class="docdiagram-callout-kind">${y(v)}</div>${S}${T}</aside>`,next:p+1}}return{html:`<section class="${$}"${F?` style="${F}"`:""}>${S}${T}</section>`,next:p+1}}function b(m=0,g=o.length){let w=[],p=m;for(;p<g;){let E=o[p];if(!E.trim()){p+=1;continue}if(/^:::/.test(E)){let $=ir(E);if($){let M=a.get($.id),D=c.get($.id)||0;M?d.has($.id)?w.push(`<section class="docdiagram-error"><strong>Diagram "${y($.id)}" has multiple definitions.</strong></section>`):D>1?w.push(`<section class="docdiagram-error"><strong>Diagram "${y($.id)}" is referenced more than once.</strong></section>`):(w.push(n(M.source,e.diagramIndex)),e.diagramIndex+=1):w.push(`<section class="docdiagram-error"><strong>Diagram "${y($.id)}" could not be found.</strong></section>`),p+=1;continue}let v=h(p,g);v?(w.push(v.html),p=v.next):(w.push(`<pre class="docdiagram-literal-source"><code>${y(E)}</code></pre>`),p+=1);continue}let x=E.match(/^```([\w-]*)\s*$/);if(x){let $=o.slice(p+1,g).findIndex(D=>/^```\s*$/.test(D));if($===-1){w.push('<section class="docdiagram-error"><strong>Unclosed code block.</strong></section>');break}let v=p+$+1,M=o.slice(p+1,v).join(`
`);if(x[1]==="diagram"){let D=sr(M);D&&d.has(D)?w.push(`<section class="docdiagram-error"><strong>Diagram "${y(D)}" has multiple definitions.</strong></section>`):(!D||!c.has(D))&&(w.push(n(M,e.diagramIndex)),e.diagramIndex+=1)}else{let D=x[1]?` class="language-${y(x[1])}"`:"";w.push(`<pre><code${D}>${y(M)}</code></pre>`)}p=v+1;continue}let N=E.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);if(N){w.push(`<h${N[1].length}>${me(N[2])}</h${N[1].length}>`),p+=1;continue}if(/^ {0,3}(?:[-*_]\s*){3,}$/.test(E)){w.push("<hr>"),p+=1;continue}if(/^ {0,3}>/.test(E)){let $=[];for(;p<g&&/^ {0,3}>/.test(o[p]);)$.push(o[p].replace(/^ {0,3}> ?/,"")),p+=1;w.push(`<blockquote>${jt($.join(`
`),e,{...t,diagramReferenceRegistry:i})}</blockquote>`);continue}let F=Ee(E);if(F){let $=u(p,F[1].length);w.push($.html),p=$.index;continue}let S=p+1<g?nr(o[p+1]):null;if(S){let $=Rt(E),v=[];for(p+=2;p<g&&o[p].includes("|")&&o[p].trim();)v.push(Rt(o[p])),p+=1;let M=(D,Y)=>Y.map((R,X)=>`<${D}${S[X]?` style="text-align:${S[X]}"`:""}>${me(R||"")}</${D}>`).join("");w.push(`<table><thead><tr>${M("th",$)}</tr></thead><tbody>${v.map(D=>`<tr>${M("td",D)}</tr>`).join("")}</tbody></table>`);continue}let T=[E.trim()];for(p+=1;p<g&&!l(p);)T.push(o[p].trim()),p+=1;w.push(`<p>${me(T.join(" "))}</p>`)}return w.join("")}return b()}function Bt(r,e,t){let o=e!=="none",n=e==="flowchart";return['<div class="docdiagram-diagram-toolbar" role="toolbar" aria-label="Diagram controls">',`<button type="button" class="docdiagram-icon-button docdiagram-zoom-in" data-diagram-index="${r}" aria-label="Zoom in" title="Zoom in">+</button>`,`<button type="button" class="docdiagram-icon-button docdiagram-zoom-out" data-diagram-index="${r}" aria-label="Zoom out" title="Zoom out">\u2212</button>`,`<button type="button" class="docdiagram-icon-button docdiagram-fit" data-diagram-index="${r}" aria-label="Zoom to fit" title="Zoom to fit">\u22A1</button>`,o?t.editingDiagramIndex===r?`<button type="button" class="docdiagram-icon-button docdiagram-done-editing" aria-label="Done editing" title="Done editing">\u2713</button><button type="button" class="docdiagram-icon-button docdiagram-cancel-editing" aria-label="Cancel editing and discard changes" title="Cancel editing and discard changes">\xD7</button>${n?`<button type="button" class="docdiagram-icon-button docdiagram-create-node" data-diagram-index="${r}" aria-label="New node" title="New node">+</button>`:""}`:t.editingDiagramIndex===null?'<button type="button" class="docdiagram-icon-button docdiagram-start-editing" aria-label="Edit diagram" title="Edit diagram">\u270E</button>':"":"","</div>"].join("")}function ar(r,e,t,o){let{selectedNode:n,selectedEdge:s,editingNode:i,editingEdge:a,connectionDrag:d,diagramZooms:c}=t,l=t.editingDiagramIndex===e,u=H(r),h=new Map(u.map(S=>[S.node.id,S])),b=16,m=[],g=[],w=r.edges.map((S,T)=>{let $=h.get(S.source),v=h.get(S.target);if(!$||!v)return"";let M=$.node,D=v.node,Y=de(M,$.position.x,$.position.y,Number(M.size?.width)||190,Number(M.size?.height)||80),R=de(D,v.position.x,v.position.y,Number(D.size?.width)||190,Number(D.size?.height)||80),X=S.sourceAnchor||"right",ve=S.targetAnchor||"left",I=Y.anchors[X],A=R.anchors[ve],O=S.route||"orthogonal",P=we(I,A,X,ve,O),te=P.midpoint.x,et=P.midpoint.y-10,ge=Ae(r,S,t.documentTheme),he=s?.diagramIndex===e&&s.edgeIndex===T,$t=he&&a?.diagramIndex===e&&a.edgeIndex===T,He=(Number(ge.strokeWidth)||2)+(he?2:0),tt=220,rt=72,je=S.label?oe(S.label):[],kt=je.length*b,vt=et-kt/2+b*.72,Be=Ge(S,"start"),f=Ge(S,"end"),k=`docdiagram-marker-${e}-${T}-start`,C=`docdiagram-marker-${e}-${T}-end`;Be!=="none"&&m.push(Je(k,Be,"start",ge.stroke||"",He)),f!=="none"&&m.push(Je(C,f,"end",ge.stroke||"",He)),he&&l&&g.push(`<circle class="docdiagram-edge-endpoint" data-diagram-index="${e}" data-edge-index="${T}" data-endpoint="source" cx="${I.x}" cy="${I.y}" r="7"/>`,`<circle class="docdiagram-edge-endpoint" data-diagram-index="${e}" data-edge-index="${T}" data-endpoint="target" cx="${A.x}" cy="${A.y}" r="7"/>`);let L=[Be!=="none"?` marker-start="url(#${k})"`:"",f!=="none"?` marker-end="url(#${C})"`:""].join("");return[`<g class="docdiagram-edge-group${he?" docdiagram-edge-selected":""}" data-diagram-index="${e}" data-edge-index="${T}">`,`<path class="docdiagram-edge-hit" d="${P.hitPath}" fill="none" stroke="transparent" stroke-width="16"/>`,`<path class="docdiagram-edge" d="${P.path}"${L} stroke="${y(ge.stroke||"")}" stroke-width="${He}"/>`,$t?`<foreignObject class="docdiagram-inline-editor-host" x="${te-tt/2}" y="${et-rt/2}" width="${tt}" height="${rt}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-edge" aria-label="Edit edge label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${y(S.label||"")}</textarea></foreignObject>`:je.length?Q(te,vt,je,b,"docdiagram-edge-label",ge.text||""):"","</g>"].join("")}).join(""),p=u.map(({node:S,position:T})=>{let $=T.x,v=T.y,M=Number(S.size?.width)||190,D=Number(S.size?.height)||80,Y=le(r,S,t.documentTheme,t.documentColorScheme),R=n?.diagramIndex===e&&n.nodeId===S.id,X=R&&i?.diagramIndex===e&&i.nodeId===S.id,ve=(Number(Y.strokeWidth)||2)+(R?2:0),I=de(S,$,v,M,D),A=Ie(I.textBounds,S);return[`<g class="docdiagram-node${R?" docdiagram-node-selected":""}" data-diagram-index="${e}" data-node-id="${y(S.id)}">`,Re(I,Y,ve),X?`<foreignObject class="docdiagram-inline-editor-host" x="${I.textBounds.x}" y="${I.textBounds.y}" width="${I.textBounds.width}" height="${I.textBounds.height}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-node" aria-label="Edit node label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${y(S.label)}</textarea></foreignObject>`:Q(A.centerX,A.labelStartY,A.labelLines,A.labelLineHeight,"docdiagram-node-label",Y.text||"",A.textAnchor),!X&&A.subtitleLines.length?Q(A.centerX,A.subtitleStartY,A.subtitleLines,A.subtitleLineHeight,"docdiagram-node-subtitle",Y.text||"",A.textAnchor):"",R&&l&&!X?[["top-left",$-7,v-7],["top-right",$+M-7,v-7],["bottom-left",$-7,v+D-7],["bottom-right",$+M-7,v+D-7]].map(([O,P,te])=>`<rect class="docdiagram-resize-handle" data-resize-corner="${O}" x="${P}" y="${te}" width="14" height="14" rx="3"/>`).join(""):"",R&&l&&!X?K.map(O=>{let P=I.anchors[O];return`<circle class="docdiagram-connection-port" data-anchor="${O}" cx="${P.x}" cy="${P.y}" r="7" aria-label="${O} connection port"/>`}).join(""):"","</g>"].join("")}).join(""),E=Number(r.canvas.width)||1e3,x=Number(r.canvas.height)||560,N=t.diagramViewportHeights.get(e),F=N?` style="box-sizing: border-box; height: ${N}px"`:"";return[`<figure class="docdiagram" data-diagram-index="${e}" data-diagram-type="flowchart" data-editing="${l}"${F}>`,o(e,"flowchart",t),`<svg viewBox="0 0 ${E} ${x}" role="img" aria-label="Architecture diagram" data-diagram-index="${e}" style="width: ${c.get(e)||100}%">`,`<defs>${m.join("")}</defs>`,p,w,d?.diagramIndex===e?`<path class="docdiagram-connection-preview${d.invalid?" docdiagram-connection-invalid":""}" d="${we(d.start,d.current,d.sourceAnchor,d.targetAnchor||d.sourceAnchor,"straight").path}"/>`:"",g.join(""),"</svg>","</figure>"].join("")}function dr(r,e,t,o){let n=xe(r,t.documentTheme),s=Number(r.canvas?.width)||1e3,i=Number(r.canvas?.height)||560,a=r.participants||[],d=r.messages||[],c=r.activations||[],l=r.notes||[],u=r.groups||[],h=90,b=90,m=28,g=Number(r.canvas?.participantSize?.width)||180,w=Number(r.canvas?.participantSize?.height)||42,p=Number(r.canvas?.participantSpacing)||220,E=16,x=74+Math.max(0,...a.filter(f=>f.kind==="actor").map(f=>oe(f.label||"").length-1))*E,N=48,F=18,S=56,T=t.diagramViewportHeights.get(e),$=T?` style="box-sizing: border-box; height: ${T}px"`:"",v=`docdiagram-sequence-arrow-${e}`,M=m+x+12,D=a[0],Y=a[a.length-1],R=Number(D?.size?.width)||g,X=Number(Y?.size?.width)||g,ve=a.length>1?R/2+p*(a.length-1)+X/2:g+h+b,I=Math.max(s,ve,h+b),A=new Map;a.forEach((f,k)=>{A.set(f.id,a.length===1?I/2:R/2+p*k)});let O=M+40,P=d.map((f,k)=>({...f,index:k,y:O+k*S})),te=l.map(f=>{let k=oe(f.label||""),C=Math.max(N,k.length*16+22,Number(f.size?.height)||0),V=((f.after?P[Number(f.after)-1]:null)?.y||M)+F,ie=A.get(f.at||"")||I/2,G=Math.max(160,Number(f.size?.width)||0),se=Math.min(I-G/2-24,Math.max(G/2+24,ie));return{...f,lines:k,x:se-G/2,y:V,width:G,height:C}}),et=u.map(f=>P[f.to-1]?.y+34||O),ge=Math.max(M+140,te.length?te[te.length-1].y+te[te.length-1].height:0,P.length?P[P.length-1].y+44:O,...et),he=Math.max(i,ge+56),$t=he-36,He=c.map((f,k)=>({participantId:f.participant,depth:c.slice(0,k).filter(C=>C.participant===f.participant&&C.from<=f.from&&C.to>=f.from).length,startY:(P[f.from-1]?.y||O)-10,endY:(P[f.to-1]?.y||O)+18})),tt=a.map(f=>{let k=A.get(f.id)||0,C=oe(f.label||""),L=qe(r,f,t.documentTheme,t.documentColorScheme),V=Number(f.size?.width)||g,ie=Number(f.size?.height)||w;if(f.kind==="actor"){let G=m+10,se=G+18,Ne=se+18;return[`<g class="docdiagram-sequence-participant docdiagram-sequence-actor" data-diagram-index="${e}" data-participant-id="${y(f.id)}">`,`<circle cx="${k}" cy="${G}" r="8" fill="none" stroke="${y(L.stroke||"")}" stroke-width="${Number(L.strokeWidth)||2}"/>`,`<path d="M ${k} ${G+8} V ${Ne} M ${k-14} ${se} H ${k+14} M ${k} ${Ne} L ${k-12} ${Ne+18} M ${k} ${Ne} L ${k+12} ${Ne+18}" fill="none" stroke="${y(L.stroke||"")}" stroke-width="${Number(L.strokeWidth)||2}" stroke-linecap="round" stroke-linejoin="round"/>`,Q(k,m+x-4-(C.length-1)*E,C,E,"docdiagram-node-label",L.text||""),"</g>"].join("")}return[`<g class="docdiagram-sequence-participant" data-diagram-index="${e}" data-participant-id="${y(f.id)}">`,`<rect x="${k-V/2}" y="${m}" width="${V}" height="${ie}" rx="12" fill="${y(L.fill||"")}" stroke="${y(L.stroke||"")}" stroke-width="${Number(L.strokeWidth)||2}"/>`,Q(k,m+ie/2+6-(C.length-1)*E/2,C,E,"docdiagram-node-label",L.text||""),"</g>"].join("")}).join(""),rt=a.map(f=>{let k=A.get(f.id)||0;return`<path class="docdiagram-sequence-lifeline" d="M ${k} ${M} L ${k} ${$t}" fill="none" stroke="${y(n.edge.stroke)}" stroke-width="2" stroke-dasharray="8 6"/>`}).join(""),je=u.map(f=>{let k=(P[f.from-1]?.y||O)-24,C=(P[f.to-1]?.y||O)+30,L=Math.min(220,Math.max(110,String(f.label).length*8+28));return['<g class="docdiagram-sequence-group">',`<rect x="42" y="${k}" width="${I-84}" height="${C-k}" rx="12" fill="none" stroke="${y(n.edge.stroke)}" stroke-width="2" stroke-dasharray="10 6" opacity="0.8"/>`,`<rect x="54" y="${k-16}" width="${L}" height="24" rx="6" fill="${y(n.node.fill)}" stroke="${y(n.edge.stroke)}" stroke-width="1.5"/>`,`<text x="${54+L/2}" y="${k+1}" text-anchor="middle" class="docdiagram-edge-label" fill="${y(n.edge.text)}">${y(f.label||"")}</text>`,"</g>"].join("")}).join(""),kt=te.map((f,k)=>{let L=f.y+18,V=qe(r,f,t.documentTheme,t.documentColorScheme);return[`<g class="docdiagram-sequence-note" data-diagram-index="${e}" data-note-index="${k}">`,`<rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" rx="10" fill="${y(V.fill||"")}" stroke="${y(V.stroke||"")}" stroke-width="${Number(V.strokeWidth)||2}"/>`,Q(f.x+f.width/2,L,f.lines,16,"docdiagram-node-subtitle",V.text||""),"</g>"].join("")}).join(""),vt=He.map(f=>{let k=A.get(f.participantId)||0,C=f.depth*7,L=12,V=Math.max(20,f.endY-f.startY),ie=a.find(se=>se.id===f.participantId),G=ie?qe(r,ie,t.documentTheme,t.documentColorScheme):n.node;return`<rect class="docdiagram-sequence-activation" x="${k-L/2+C}" y="${f.startY}" width="${L}" height="${V}" rx="4" fill="${y(G.fill||"")}" stroke="${y(G.stroke||"")}" stroke-width="${Number(G.strokeWidth)||2}"/>`}).join(""),Be=P.map(f=>{let k=A.get(f.from)||0,C=A.get(f.to)||0,L=f.style==="dashed",V=oe(f.label||""),ie=V.length*15,G=f.y-12-ie/2+11,se=` marker-end="url(#${v})"`;return f.from===f.to?[`<g class="docdiagram-sequence-message" data-diagram-index="${e}" data-message-index="${f.index}">`,`<path d="M ${k} ${f.y} L ${k+48} ${f.y} L ${k+48} ${f.y+28} L ${k} ${f.y+28}" fill="none" stroke="${y(n.edge.stroke)}" stroke-width="2"${se}${L?' stroke-dasharray="8 5"':""}/>`,Q(k+48/2,G,V,15,"docdiagram-edge-label",n.edge.text),"</g>"].join(""):[`<g class="docdiagram-sequence-message" data-diagram-index="${e}" data-message-index="${f.index}">`,`<path d="M ${k} ${f.y} L ${C} ${f.y}" fill="none" stroke="${y(n.edge.stroke)}" stroke-width="2"${se}${L?' stroke-dasharray="8 5"':""}/>`,Q((k+C)/2,G,V,15,"docdiagram-edge-label",n.edge.text),"</g>"].join("")}).join("");return[`<figure class="docdiagram" data-diagram-index="${e}" data-diagram-type="sequence" data-editing="${t.editingDiagramIndex===e}"${$}>`,o(e,"sequence",t),`<svg viewBox="0 0 ${I} ${he}" role="img" aria-label="Sequence diagram" data-diagram-index="${e}" style="width: ${t.diagramZooms.get(e)||100}%">`,`<defs>${Je(v,"arrow","end",n.edge.stroke,2)}</defs>`,je,tt,rt,vt,kt,Be,"</svg>","</figure>"].join("")}function cr(r,e,t){try{let o=pe(r,t.colourScheme);return t.onDiagram(e,o),o.type==="sequence"?dr(o,e,t.state,Bt):ar(o,e,t.state,Bt)}catch(o){let n=o instanceof Error?o.message:String(o);return`<section class="docdiagram-error"><strong>Diagram could not be rendered.</strong><br>${y(n)}</section>`}}function lr(){let r=document.createElement("style");r.textContent=`
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
  `,document.head.append(r)}function ur(){return{diagramModels:[],editingDiagramIndex:null,selectedNode:null,selectedEdge:null,selectedSequenceElement:null,editingNode:null,editingEdge:null,connectionDrag:null,documentTheme:"light",documentColorScheme:"classic",documentFormat:"centered",savedSource:"",editSessionDiagram:null,diagramZooms:new Map,diagramViewportHeights:new Map}}function Se(r){r.selectedNode=null,r.selectedEdge=null,r.selectedSequenceElement=null,r.editingNode=null,r.editingEdge=null}function $e(r,e){return r.editingDiagramIndex===e}function ne(r,e){return r.target instanceof Element?r.target.closest(e):null}function ee(r,e){let t=r.diagramModels[e];return t?.type==="flowchart"?t:null}function B(r){return Number(r)}var wt=class{constructor(e){this.host=e}enableCanvasPanning(){for(let e of this.host.outputElement.querySelectorAll(".docdiagram svg"))e.addEventListener("pointerdown",t=>{t.target===e&&this.beginCanvasPan(e,t)})}enableSequenceSelection(){for(let e of this.host.outputElement.querySelectorAll('.docdiagram[data-diagram-type="sequence"] svg'))e.addEventListener("click",t=>{if(!$e(this.host.state,B(e.dataset.diagramIndex)))return;let o=ne(t,".docdiagram-sequence-participant"),n=ne(t,".docdiagram-sequence-note"),s=ne(t,".docdiagram-sequence-message");o?this.host.state.selectedSequenceElement={diagramIndex:B(o.getAttribute("data-diagram-index")||void 0),kind:"participant",id:o.getAttribute("data-participant-id")||""}:n?this.host.state.selectedSequenceElement={diagramIndex:B(n.getAttribute("data-diagram-index")||void 0),kind:"note",index:B(n.getAttribute("data-note-index")||void 0)}:s?this.host.state.selectedSequenceElement={diagramIndex:B(s.getAttribute("data-diagram-index")||void 0),kind:"message",index:B(s.getAttribute("data-message-index")||void 0)}:this.host.state.selectedSequenceElement=null,this.host.state.selectedNode=null,this.host.state.selectedEdge=null,this.host.renderDocument()})}enableEditing(){for(let e of this.host.outputElement.querySelectorAll(".docdiagram svg"))$e(this.host.state,B(e.dataset.diagramIndex))&&(e.addEventListener("click",t=>this.handleDiagramClick(e,t)),e.addEventListener("pointerdown",t=>this.handleDiagramPointerDown(e,t)));for(let e of this.host.outputElement.querySelectorAll(".docdiagram-inline-editor"))this.wireInlineEditor(e);this.host.outputElement.dataset.editingShortcutsBound||(this.host.outputElement.dataset.editingShortcutsBound="true",document.addEventListener("keydown",e=>{this.host.state.editingDiagramIndex!==null&&(e.target instanceof Element&&e.target.matches("input, textarea, select, [contenteditable]")||((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="d"&&this.host.state.selectedNode?(e.preventDefault(),this.duplicateSelectedNode()):(e.key==="Delete"||e.key==="Backspace")&&(this.host.state.selectedNode||this.host.state.selectedEdge)&&(e.preventDefault(),this.deleteSelected())))}))}selectNode(e,t){this.host.state.selectedNode={diagramIndex:e,nodeId:t},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}selectEdge(e,t){this.host.state.selectedEdge={diagramIndex:e,edgeIndex:t},this.host.state.selectedNode=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}handleDiagramClick(e,t){if(ne(t,".docdiagram-inline-editor"))return;let o=ne(t,".docdiagram-node");if(o){this.selectNode(B(o.getAttribute("data-diagram-index")||void 0),o.getAttribute("data-node-id")||"");return}let n=ne(t,".docdiagram-edge-group");if(n){let s=B(n.getAttribute("data-diagram-index")||void 0),i=B(n.getAttribute("data-edge-index")||void 0),a=this.host.state.selectedEdge?.diagramIndex===s&&this.host.state.selectedEdge.edgeIndex===i,d=this.host.state.editingEdge?.diagramIndex===s&&this.host.state.editingEdge.edgeIndex===i;a&&!d?(this.host.state.editingEdge={diagramIndex:s,edgeIndex:i},this.host.renderDocument()):this.selectEdge(s,i);return}(this.host.state.selectedNode||this.host.state.selectedEdge)&&this.clearSelection()}handleDiagramPointerDown(e,t){let o=ne(t,".docdiagram-connection-port");if(o){let p=o.closest(".docdiagram-node"),E=B(p?.getAttribute("data-diagram-index")||e.dataset.diagramIndex),x=o.getAttribute("data-node-id")||p?.getAttribute("data-node-id")||"",N=ee(this.host.state,E),F=N?j(N,x)?.node:null,S=o.getAttribute("data-anchor")||"";F&&this.beginConnectionDrag(e,t,{diagramIndex:E,sourceNodeId:x,sourceAnchor:S,start:this.getNodePortPoint(F,S),current:this.getNodePortPoint(F,S),invalid:!1});return}let n=ne(t,".docdiagram-edge-endpoint");if(n){let p=B(n.getAttribute("data-diagram-index")||void 0),E=B(n.getAttribute("data-edge-index")||void 0),x=ee(this.host.state,p),N=x?.edges[E],F=n.getAttribute("data-endpoint");if(!N||F!=="source"&&F!=="target")return;let S=F==="source"?N.source:N.target,T=F==="source"?N.sourceAnchor:N.targetAnchor,$=x?j(x,S)?.node:null;if(!$||!T)return;this.beginConnectionDrag(e,t,{diagramIndex:p,edgeIndex:E,endpoint:F,reconnect:!0,sourceNodeId:S,sourceAnchor:T,start:this.getNodePortPoint($,T),current:this.getNodePortPoint($,T),invalid:!1});return}let s=ne(t,".docdiagram-resize-handle");if(s){let p=s.closest(".docdiagram-node"),E=s.getAttribute("data-resize-corner");p&&(E==="top-left"||E==="top-right"||E==="bottom-left"||E==="bottom-right")&&this.resizeNode(e,t,p,E);return}if(ne(t,".docdiagram-inline-editor"))return;let i=ne(t,".docdiagram-node");if(!i)return;let a=B(i.getAttribute("data-diagram-index")||void 0),d=i.getAttribute("data-node-id")||"",c=ee(this.host.state,a),l=c?j(c,d)?.node:null;if(!c||!l)return;t.preventDefault();let u=this.svgPoint(e,t),h=U(c,l),b=re(c),m=!1;this.capturePointer(e,t);let g=p=>{let E=this.svgPoint(e,p),x=J(h.x+E.x-u.x,b),N=J(h.y+E.y-u.y,b);m=m||x!==h.x||N!==h.y,i.setAttribute("transform",`translate(${x-h.x} ${N-h.y})`);let F=j(c,d);l.position={...l.position,x:x-(F?.parent?U(c,F.parent).x:0),y:N-(F?.parent?U(c,F.parent).y:0)}},w=p=>{this.releasePointer(e,p),e.removeEventListener("pointermove",g),e.removeEventListener("pointerup",w),e.removeEventListener("pointercancel",w),m?(nt(c,d),Ce(c,l),this.host.state.selectedNode={diagramIndex:a,nodeId:d},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.persistDiagramModels(),this.host.renderDocument()):this.host.state.selectedNode?.diagramIndex===a&&this.host.state.selectedNode.nodeId===d?(this.host.state.editingNode={diagramIndex:a,nodeId:d},this.host.renderDocument()):this.selectNode(a,d)};e.addEventListener("pointermove",g),e.addEventListener("pointerup",w),e.addEventListener("pointercancel",w)}getSelectedNode(){let e=this.host.state.selectedNode,t=e?ee(this.host.state,e.diagramIndex):null;return e&&t&&j(t,e.nodeId)?.node||null}getSelectedEdge(){let e=this.host.state.selectedEdge,t=e?ee(this.host.state,e.diagramIndex):null;return e&&t?.edges[e.edgeIndex]||null}clearSelection(){this.host.state.selectedNode=null,this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}deleteSelected(){let e=this.host.state.selectedNode,t=this.host.state.selectedEdge;if(e){let o=ee(this.host.state,e.diagramIndex);if(!o)return;let n=o.edges.filter(s=>s.source===e.nodeId||s.target===e.nodeId);if(n.length&&!globalThis.confirm(`Delete this node and its ${n.length} attached connector${n.length===1?"":"s"}?`))return;ct(o,e.nodeId)}else if(t){let o=ee(this.host.state,t.diagramIndex);if(!o)return;dt(o,t.edgeIndex)}else return;Se(this.host.state),this.host.persistDiagramModels(),this.host.renderDocument()}duplicateSelectedNode(){let e=this.host.state.selectedNode;if(!e)return;let t=ee(this.host.state,e.diagramIndex);if(!t)return;let o=it(t,e.nodeId);o&&(this.host.state.selectedNode={diagramIndex:e.diagramIndex,nodeId:o.id},this.host.state.selectedEdge=null,this.host.persistDiagramModels(),this.host.renderDocument())}wireInlineEditor(e){let t=!1,o=()=>{if(!t){if(t=!0,e.classList.contains("docdiagram-inline-editor-edge")){let s=this.getSelectedEdge();s&&(Pe(s,e.value),this.host.persistDiagramModels()),this.host.state.editingEdge=null}else{let s=this.getSelectedNode();s&&(ze(s,e.value),this.host.persistDiagramModels()),this.host.state.editingNode=null}this.host.renderDocument()}},n=()=>{t||(t=!0,e.classList.contains("docdiagram-inline-editor-edge")?this.host.state.editingEdge=null:this.host.state.editingNode=null,this.host.renderDocument())};e.addEventListener("pointerdown",s=>s.stopPropagation()),e.addEventListener("click",s=>s.stopPropagation()),e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.metaKey||s.ctrlKey)?(s.preventDefault(),o()):s.key==="Escape"&&(s.preventDefault(),n())}),e.addEventListener("blur",o,{once:!0}),e.focus(),e.select()}resizeNode(e,t,o,n){t.preventDefault();let s=B(o.getAttribute("data-diagram-index")||void 0),i=o.getAttribute("data-node-id")||"",a=ee(this.host.state,s),d=a?j(a,i)?.node:null;if(!a||!d)return;let c=this.svgPoint(e,t),l=We(d),u=!1;this.capturePointer(e,t);let h=m=>{let g=this.svgPoint(e,m);mt(a,d,n,g.x-c.x,g.y-c.y,l);let w=Number(d.size?.width)||190,p=Number(d.size?.height)||80;u=u||w!==l.size.width||p!==l.size.height,this.updateNodeSizeMarkup(o,d,w,p)},b=m=>{this.releasePointer(e,m),e.removeEventListener("pointermove",h),e.removeEventListener("pointerup",b),e.removeEventListener("pointercancel",b),u&&(Ce(a,d),this.host.state.selectedNode={diagramIndex:s,nodeId:i},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.persistDiagramModels(),this.host.renderDocument())};e.addEventListener("pointermove",h),e.addEventListener("pointerup",b),e.addEventListener("pointercancel",b)}updateNodeSizeMarkup(e,t,o,n){let s=ee(this.host.state,B(e.getAttribute("data-diagram-index")||void 0));if(!s)return;let{x:i,y:a}=U(s,t),d=e.querySelector(".docdiagram-node-body"),c=e.querySelector(".docdiagram-node-label"),l=e.querySelector(".docdiagram-node-subtitle"),u=e.querySelectorAll(".docdiagram-resize-handle");if(!d)return;let h=le(s,t),b=de(t,i,a,o,n),m=Ie(b.textBounds,t);for(let g of e.querySelectorAll(".docdiagram-node-detail"))g.remove();d.outerHTML=Re(b,h,Number(h.strokeWidth)||2);for(let g of[c,l])if(g){g.setAttribute("x",String(m.centerX)),g.setAttribute("y",String(g===c?m.labelStartY:m.subtitleStartY)),g.setAttribute("text-anchor",m.textAnchor);for(let w of g.querySelectorAll("tspan"))w.setAttribute("x",String(m.centerX))}for(let g of u){let w=g.getAttribute("data-resize-corner");g.setAttribute("x",String(w?.endsWith("left")?i-7:i+o-7)),g.setAttribute("y",String(w?.startsWith("top")?a-7:a+n-7))}}getNodePortPoint(e,t){let o=this.host.state.diagramModels.find(s=>s.type==="flowchart"&&j(s,e.id)?.node===e);if(!o)return{x:0,y:0};let n=U(o,e);return de(e,n.x,n.y,n.width,n.height).anchors[t]}addConnectionTargetPorts(e,t){let o=ee(this.host.state,t);if(o)for(let{node:n}of H(o))for(let s of K){let i=this.getNodePortPoint(n,s),a=document.createElementNS("http://www.w3.org/2000/svg","circle");a.setAttribute("class","docdiagram-connection-port docdiagram-connection-target-port"),a.dataset.nodeId=n.id,a.dataset.anchor=s,a.setAttribute("cx",String(i.x)),a.setAttribute("cy",String(i.y)),a.setAttribute("r","7"),e.append(a)}}beginConnectionDrag(e,t,o){t.preventDefault(),t.stopPropagation(),this.host.state.connectionDrag={...o,current:this.svgPoint(e,t),invalid:!1},this.addConnectionTargetPorts(e,o.diagramIndex);let n=document.createElementNS("http://www.w3.org/2000/svg","path");n.setAttribute("class","docdiagram-connection-preview"),e.append(n),this.capturePointer(e,t);let s=d=>{let l=document.elementFromPoint(d.clientX,d.clientY)?.closest(".docdiagram-connection-port");return l||[...e.querySelectorAll(".docdiagram-connection-port")].find(u=>{let h=u.getBoundingClientRect();return d.clientX>=h.left&&d.clientX<=h.right&&d.clientY>=h.top&&d.clientY<=h.bottom})||null},i=d=>{let c=this.host.state.connectionDrag;if(!c)return;let l=this.svgPoint(e,d),u=s(d);c.current=l,c.invalid=!u;let h=u?.getAttribute("data-anchor")||c.sourceAnchor;n.setAttribute("d",we(c.start,l,c.sourceAnchor,h,"straight").path),n.classList.toggle("docdiagram-connection-invalid",c.invalid)},a=d=>{this.releasePointer(e,d),e.removeEventListener("pointermove",i),e.removeEventListener("pointerup",a),e.removeEventListener("pointercancel",a);let c=s(d),l=this.host.state.connectionDrag;if(this.host.state.connectionDrag=null,c&&l){let u=ee(this.host.state,l.diagramIndex),h=c.getAttribute("data-node-id")||c.closest(".docdiagram-node")?.getAttribute("data-node-id"),b=c.getAttribute("data-anchor")||"";if(u&&h){if(l.reconnect&&l.edgeIndex!==void 0&&l.endpoint){let m=u.edges[l.edgeIndex];m&&(at(m,l.endpoint,h,b),this.host.state.selectedEdge={diagramIndex:l.diagramIndex,edgeIndex:l.edgeIndex},this.host.state.selectedNode=null)}else{let m=st(u,l.sourceNodeId,l.sourceAnchor,h,b);this.host.state.selectedEdge={diagramIndex:l.diagramIndex,edgeIndex:u.edges.indexOf(m)},this.host.state.selectedNode=null}this.host.persistDiagramModels()}}this.host.renderDocument()};e.addEventListener("pointermove",i),e.addEventListener("pointerup",a),e.addEventListener("pointercancel",a)}beginCanvasPan(e,t){let o=e.closest(".docdiagram");if(!o)return;t.preventDefault();let n={clientX:t.clientX,clientY:t.clientY,scrollLeft:o.scrollLeft,scrollTop:o.scrollTop};o.classList.add("docdiagram-panning"),this.capturePointer(e,t);let s=a=>{o.scrollLeft=n.scrollLeft-(a.clientX-n.clientX),o.scrollTop=n.scrollTop-(a.clientY-n.clientY)},i=a=>{this.releasePointer(e,a),o.classList.remove("docdiagram-panning"),e.removeEventListener("pointermove",s),e.removeEventListener("pointerup",i),e.removeEventListener("pointercancel",i)};e.addEventListener("pointermove",s),e.addEventListener("pointerup",i),e.addEventListener("pointercancel",i)}svgPoint(e,t){let o=e.getBoundingClientRect(),n=e.viewBox.baseVal;return{x:(t.clientX-o.left)*n.width/o.width,y:(t.clientY-o.top)*n.height/o.height}}capturePointer(e,t){t.isTrusted&&e.setPointerCapture(t.pointerId)}releasePointer(e,t){t.isTrusted&&e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId)}};function mr(r,e){return Object.entries(_[r]||{}).map(([t,o])=>`<option value="${t}"${t===e?" selected":""}>${o.label}</option>`).join("")}function gr(r,e,t="classic"){let o=re(r),n=le(r,e),s=Number(e.size?.width)||190,i=Number(e.size?.height)||80,a=e.shape==="document"?{width:140,height:84}:{width:120,height:60},d=o?Math.ceil(a.width/o)*o:a.width,c=o?Math.ceil(a.height/o)*o:a.height,l=o||1,u=_[t]||{},h=Object.entries(u).find(([,g])=>[g.light,g.dark].some(w=>w.fill.toLowerCase()===(n.fill||"").toLowerCase()&&w.stroke.toLowerCase()===(n.stroke||"").toLowerCase()&&w.text.toLowerCase()===(n.text||"").toLowerCase())),b=e.palette?.colour||h?.[0]||"blue",m=e.palette?.tone||(h&&h[1].light.fill.toLowerCase()===(n.fill||"").toLowerCase()?"light":"dark");return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${y(e.label)}</textarea></label>`,`<label class="docdiagram-field docdiagram-field-wide">Subtitle<textarea class="docdiagram-inspector-subtitle docdiagram-inspector-textarea" rows="2">${y(e.subtitle||"")}</textarea></label>`,`<label class="docdiagram-field">Tone<select class="docdiagram-inspector-tone"><option value="light"${m==="light"?" selected":""}>Light</option><option value="dark"${m==="dark"?" selected":""}>Dark</option></select></label>`,`<label class="docdiagram-field">Colour<select class="docdiagram-inspector-colour">${mr(t,b)}</select></label>`,`<label class="docdiagram-field">Shape<select class="docdiagram-inspector-shape">${De.map(g=>`<option value="${g}"${g===e.shape?" selected":""}>${g}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Fill<input type="color" class="docdiagram-inspector-fill" value="${y(n.fill||"")}"></label>`,`<label class="docdiagram-field">Border<input type="color" class="docdiagram-inspector-stroke" value="${y(n.stroke||"")}"></label>`,`<label class="docdiagram-field">Border width<input type="number" class="docdiagram-inspector-stroke-width" value="${Number(n.strokeWidth)||2}" min="1" step="1"></label>`,`<label class="docdiagram-field">Text<input type="color" class="docdiagram-inspector-text" value="${y(n.text||"")}"></label>`,`<label class="docdiagram-field">Vertical text<select class="docdiagram-inspector-text-v-align"><option value="top"${e.textVAlign==="top"?" selected":""}>Top</option><option value="center"${e.textVAlign!=="top"?" selected":""}>Center</option></select></label>`,`<label class="docdiagram-field">Horizontal text<select class="docdiagram-inspector-text-h-align"><option value="left"${e.textHAlign==="left"?" selected":""}>Left</option><option value="center"${e.textHAlign!=="left"&&e.textHAlign!=="right"?" selected":""}>Center</option><option value="right"${e.textHAlign==="right"?" selected":""}>Right</option></select></label>`,`<label class="docdiagram-field">Width<input type="number" class="docdiagram-inspector-width" value="${s}" min="${d}" step="${l}"></label>`,`<label class="docdiagram-field">Height<input type="number" class="docdiagram-inspector-height" value="${i}" min="${c}" step="${l}"></label>`].join("")}function Ot(r,e){let t=Ae(r,e),o=Number(t.strokeWidth)||2,n=e.route||"orthogonal",s=e.start||"none",i=e.end||"arrow";return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${y(e.label||"")}</textarea></label>`,`<label class="docdiagram-field">Route<select class="docdiagram-inspector-route">${Fe.map(a=>`<option value="${a}"${a===n?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Source side<select class="docdiagram-inspector-source-anchor">${K.map(a=>`<option value="${a}"${a===e.sourceAnchor?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Target side<select class="docdiagram-inspector-target-anchor">${K.map(a=>`<option value="${a}"${a===e.targetAnchor?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Start<select class="docdiagram-inspector-marker-start">${W.map(a=>`<option value="${a}"${a===s?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">End<select class="docdiagram-inspector-marker-end">${W.map(a=>`<option value="${a}"${a===i?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Stroke<input type="color" class="docdiagram-inspector-stroke" value="${y(t.stroke||"")}"></label>`,`<label class="docdiagram-field">Label colour<input type="color" class="docdiagram-inspector-text" value="${y(t.text||"")}"></label>`,`<label class="docdiagram-field">Stroke width<input type="number" class="docdiagram-inspector-stroke-width" value="${o}" min="1" step="1"></label>`].join("")}function hr(r,e,t,o="classic"){let n="from"in t?null:qe(r,t),s=e.kind!=="message",i=s?t:null;return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-sequence-inspector-label docdiagram-inspector-textarea" rows="2">${y(t.label||"")}</textarea></label>`,e.kind==="message"?`<label class="docdiagram-field">Style<select class="docdiagram-sequence-inspector-message-style"><option value="solid"${t.style!=="dashed"?" selected":""}>Solid</option><option value="dashed"${t.style==="dashed"?" selected":""}>Dashed</option></select></label>`:"",s?`<label class="docdiagram-field">Tone<select class="docdiagram-sequence-inspector-tone"><option value="light"${i?.palette?.tone!=="dark"?" selected":""}>Light</option><option value="dark"${i?.palette?.tone==="dark"?" selected":""}>Dark</option></select></label>`:"",s?`<label class="docdiagram-field">Colour<select class="docdiagram-sequence-inspector-colour">${mr(o,i?.palette?.colour||"blue")}</select></label>`:"",s?`<label class="docdiagram-field">Fill<input type="color" class="docdiagram-sequence-inspector-fill" value="${y(n?.fill||"")}"></label><label class="docdiagram-field">Border<input type="color" class="docdiagram-sequence-inspector-stroke" value="${y(n?.stroke||"")}"></label><label class="docdiagram-field">Text<input type="color" class="docdiagram-sequence-inspector-text" value="${y(n?.text||"")}"></label><label class="docdiagram-field">Width<input type="number" min="1" class="docdiagram-sequence-inspector-width" value="${Number(i?.size?.width)||""}"></label><label class="docdiagram-field">Height<input type="number" min="1" class="docdiagram-sequence-inspector-height" value="${Number(i?.size?.height)||""}"></label>`:""].join("")}function Qe(r,e){return r.querySelector(e)}function q(r,e,t){Qe(r,e)?.addEventListener("change",o=>{t(o.currentTarget.value)})}function ke(r,e){e(),r.persistDiagramModels(),r.renderDocument()}function pr(r,e,t,o){let n=d=>{let c=r.state.diagramModels[t];if(!c||c.type!=="flowchart")return;let l=j(c,o)?.node;l&&ke(r,()=>d(c,l))};q(e,".docdiagram-inspector-label",d=>n((c,l)=>ze(l,d))),q(e,".docdiagram-inspector-subtitle",d=>n((c,l)=>ut(l,d)));let s=Qe(e,".docdiagram-inspector-tone"),i=Qe(e,".docdiagram-inspector-colour"),a=()=>{s&&i&&n((d,c)=>Ye(c,s.value,i.value,r.state.documentColorScheme))};s?.addEventListener("change",a),i?.addEventListener("change",a),q(e,".docdiagram-inspector-shape",d=>n((c,l)=>lt(l,d))),q(e,".docdiagram-inspector-fill",d=>n((c,l)=>ye(l,"fill",d))),q(e,".docdiagram-inspector-stroke",d=>n((c,l)=>ye(l,"stroke",d))),q(e,".docdiagram-inspector-text",d=>n((c,l)=>ye(l,"text",d))),q(e,".docdiagram-inspector-text-v-align",d=>n((c,l)=>Ue(l,"textVAlign",d))),q(e,".docdiagram-inspector-text-h-align",d=>n((c,l)=>Ue(l,"textHAlign",d))),q(e,".docdiagram-inspector-stroke-width",d=>n((c,l)=>Ze(l,d))),q(e,".docdiagram-inspector-width",d=>n((c,l)=>_e(c,l,"width",d))),q(e,".docdiagram-inspector-height",d=>n((c,l)=>_e(c,l,"height",d)))}function fr(r,e,t,o){let n=s=>{let i=r.state.diagramModels[t];if(!i||i.type!=="flowchart")return;let a=i.edges[o];a&&ke(r,()=>s(i,a))};q(e,".docdiagram-inspector-label",s=>n((i,a)=>Pe(a,s))),q(e,".docdiagram-inspector-route",s=>n((i,a)=>gt(a,s))),q(e,".docdiagram-inspector-source-anchor",s=>n((i,a)=>Xe(a,"source",s))),q(e,".docdiagram-inspector-target-anchor",s=>n((i,a)=>Xe(a,"target",s))),q(e,".docdiagram-inspector-marker-start",s=>n((i,a)=>ht(a,s))),q(e,".docdiagram-inspector-marker-end",s=>n((i,a)=>pt(a,s))),q(e,".docdiagram-inspector-stroke",s=>n((i,a)=>Ke(a,"stroke",s))),q(e,".docdiagram-inspector-text",s=>n((i,a)=>Ke(a,"text",s))),q(e,".docdiagram-inspector-stroke-width",s=>n((i,a)=>Ze(a,s)))}function br(r,e,t){let o=r.state.selectedSequenceElement;if(!o)return;if(q(e,".docdiagram-sequence-inspector-label",d=>ke(r,()=>{t.label=d.trim()||t.label})),o.kind==="message"){q(e,".docdiagram-sequence-inspector-message-style",d=>ke(r,()=>{t.style=d}));return}let n=t,s=Qe(e,".docdiagram-sequence-inspector-tone"),i=Qe(e,".docdiagram-sequence-inspector-colour"),a=()=>{s&&i&&ke(r,()=>Ye(n,s.value,i.value,r.state.documentColorScheme))};s?.addEventListener("change",a),i?.addEventListener("change",a);for(let[d,c]of[[".docdiagram-sequence-inspector-fill","fill"],[".docdiagram-sequence-inspector-stroke","stroke"],[".docdiagram-sequence-inspector-text","text"]])q(e,d,l=>ke(r,()=>ye(n,c,l)));for(let[d,c]of[[".docdiagram-sequence-inspector-width","width"],[".docdiagram-sequence-inspector-height","height"]])q(e,d,l=>ke(r,()=>{let u=Number(l);Number.isFinite(u)&&u>0&&(n.size={...n.size,[c]:u})}))}var Et=class{constructor(e){this.host=e;this.renderTimer=null;this.resizeObserver=null;this.openState=!1;this.draft="";this.error=""}get isOpen(){return this.openState}get hasUnsavedDraft(){return this.openState&&this.draft!==this.host.getSource()}get hasError(){return this.error.length>0}get draftSource(){return this.draft}setError(e){this.error=e,this.updateStatus()}clearError(){this.error=""}open(){globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=null,this.draft=this.host.getSource(),this.error="",this.openState=!0,this.host.stopDiagramEditing(),this.host.renderDocument();let e=()=>this.focus();globalThis.requestAnimationFrame?.(e)??e()}close(){this.flushRender(),!(this.error&&this.draft!==this.host.getSource()&&!globalThis.confirm("Discard the invalid source changes?"))&&(this.openState=!1,this.draft="",this.error="",this.renderTray(),document.querySelector(".docdiagram-menu-toggle")?.focus())}flushRender(){return this.renderTimer===null?!0:this.renderDraft()}syncSource(e){if(!this.openState)return;this.draft=e,this.error="";let t=document.querySelector(".docdiagram-source-editor");if(!t)return;let o=t.selectionStart,n=t.selectionEnd,s=t.scrollTop;t.value=e,t.setSelectionRange(Math.min(o,e.length),Math.min(n,e.length)),t.scrollTop=s,this.updateStatus()}reveal(e){let t=bt(this.host.getSource(),e);if(!t||this.hasUnsavedDraft)return!1;this.openState||this.open();let o=()=>{let n=document.querySelector(".docdiagram-source-editor");n&&(n.focus(),n.setSelectionRange(t.start,t.end),xt(n,t))};return globalThis.requestAnimationFrame?.(o)??o(),!0}renderTray(){let e=document.querySelector(".docdiagram-source-tray");if(!this.openState){this.resizeObserver?.disconnect(),this.resizeObserver=null,e?.remove(),delete this.host.outputElement.dataset.sourceEditorOpen,this.host.outputElement.style.removeProperty("--docdiagram-source-tray-height");return}if(e){e.dataset.theme=this.host.getDocumentTheme(),this.host.outputElement.dataset.sourceEditorOpen="true",this.updateStatus();return}e=document.createElement("section"),e.className="docdiagram-source-tray",e.dataset.theme=this.host.getDocumentTheme(),e.setAttribute("aria-label","Document source editor"),e.innerHTML=['<header class="docdiagram-source-header">','<div><strong>Source</strong><span class="docdiagram-source-shortcut">Cmd/Ctrl+Shift+E to close</span></div>','<button type="button" class="docdiagram-source-close">Close source editor</button>',"</header>",'<label class="docdiagram-source-label">Canonical Markdown<textarea class="docdiagram-source-editor" spellcheck="false"></textarea></label>','<p class="docdiagram-source-status" aria-live="polite"></p>','<p class="docdiagram-source-error" role="alert"></p>'].join("");let t=e.querySelector(".docdiagram-source-editor"),o=e.querySelector(".docdiagram-source-close");if(!t||!o)return;t.value=this.draft,t.addEventListener("input",()=>{this.draft=t.value,this.error="",this.updateStatus(),this.scheduleRender()}),o.addEventListener("click",()=>this.close()),this.host.outputElement.after(e),this.host.outputElement.dataset.sourceEditorOpen="true";let n=()=>{this.host.outputElement.style.setProperty("--docdiagram-source-tray-height",`${e?.offsetHeight||0}px`)};this.resizeObserver?.disconnect(),globalThis.ResizeObserver&&(this.resizeObserver=new globalThis.ResizeObserver(n),this.resizeObserver.observe(e)),n(),this.updateStatus()}scheduleRender(){globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=globalThis.setTimeout(()=>{this.renderTimer=null,this.renderDraft()},250)}renderDraft(){return globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=null,this.host.renderDocument(this.draft,{preserveOnError:!0})}updateStatus(){let e=document.querySelector(".docdiagram-source-tray");if(!e)return;let t=e.querySelector(".docdiagram-source-status"),o=e.querySelector(".docdiagram-source-error");!t||!o||(t.textContent=this.error?"Source has errors; showing the last valid render.":"Changes render automatically.",o.hidden=!this.error,o.textContent=this.error)}focus(){let e=document.querySelector(".docdiagram-source-editor");e&&(e.focus(),e.setSelectionRange(e.value.length,e.value.length))}};function Vr(r){return r instanceof Element&&r.matches("input, textarea, select, [contenteditable]")}var St=class{constructor(e,t){this.sourceElement=e;this.outputElement=t;this.state=ur();this.sourceEditor=t?new Et({outputElement:t,getSource:()=>this.getSource(),getDocumentTheme:()=>this.getDocumentTheme(),renderDocument:(o,n)=>this.renderDocument(o,n),stopDiagramEditing:()=>this.stopDiagramEditing(),closeDocumentMenu:()=>this.closeDocumentMenu()}):null,this.diagramEditor=t?new wt({outputElement:t,state:this.state,persistDiagramModels:()=>this.persistDiagramModels(),renderDocument:()=>this.renderDocument()}):null}getSource(){return this.sourceElement?.content.textContent||""}setSource(e){this.sourceElement?.content.replaceChildren(document.createTextNode(e))}getDocumentTheme(){return this.state.documentTheme}stopDiagramEditing(){this.state.editingDiagramIndex!==null&&(this.state.editingDiagramIndex=null,this.state.editSessionDiagram=null,Se(this.state))}renderDiagram(e,t){return cr(e,t,{colourScheme:this.state.documentColorScheme,state:{...this.state,documentTheme:this.state.documentTheme,documentColorScheme:this.state.documentColorScheme},onDiagram:(o,n)=>{this.state.diagramModels[o]=n}})}renderMarkdown(e,t={diagramIndex:0}){return jt(e,t,{renderDiagram:(o,n)=>this.renderDiagram(o,n),documentColorScheme:this.state.documentColorScheme})}persistDiagramModels(){let e=0,t=this.getSource().replace(/\r\n/g,`
`),o=new Map;for(let i of this.state.diagramModels){let a=i.id;typeof a=="string"&&o.set(a,[...o.get(a)||[],i])}let n=new Map([...o].flatMap(([i,a])=>a.length===1?[[i,a[0]]]:[])),s=t.replace(/^((?: {0,3}> ?)*)```diagram\s*\n([\s\S]*?)^((?: {0,3}> ?)*)```$/gm,(i,a,d,c)=>{let u=d.replace(/^(?: {0,3}> ?)+/gm,"").match(/^id:\s*(?:"([^"]+)"|([^\s#]+))\s*$/m)?.slice(1).find(Boolean),h=u&&n.get(u)||this.state.diagramModels[e];e+=1;let b=h?ot(h):"",m=b?b.split(`
`).map(g=>`${a}${g}`).join(`
`):"";return`${a}\`\`\`diagram
${m?`${m}
`:""}${c}\`\`\``});this.setSource(s),this.sourceEditor?.syncSource(s)}renderDocument(e=this.getSource(),{preserveOnError:t=!1}={}){if(!this.outputElement)return!1;let o=new Map([...this.outputElement.querySelectorAll(".docdiagram")].map(c=>[Number(c.dataset.diagramIndex),{left:c.scrollLeft,top:c.scrollTop}]));for(let c of this.outputElement.querySelectorAll(".docdiagram"))this.state.diagramViewportHeights.set(Number(c.dataset.diagramIndex),c.offsetHeight);let n={x:globalThis.scrollX||0,y:globalThis.scrollY||0},s=[...this.state.diagramModels],i=this.state.documentTheme,a=this.state.documentColorScheme;this.state.diagramModels.length=0;let d;try{let c=t?Pt(e):ft(e);this.state.documentTheme=c.theme,this.state.documentColorScheme=c.colourScheme,d=this.renderMarkdown(c.content)}catch(c){let l=c instanceof Error?c.message:String(c);return this.state.diagramModels.length=0,this.state.diagramModels.push(...s),t?(this.state.documentTheme=i,this.state.documentColorScheme=a,this.sourceEditor?.setError(l),!1):(this.applyPageTheme(this.state.documentTheme),this.removeToolbarChrome(),this.outputElement.innerHTML=`<section class="docdiagram-error"><strong>Document could not be rendered.</strong><br>${y(l)}</section>`,this.sourceEditor?.renderTray(),!1)}this.setSource(e),this.sourceEditor?.clearError(),this.outputElement.dataset.theme=this.state.documentTheme,this.outputElement.dataset.format=this.state.documentFormat,this.applyPageTheme(this.state.documentTheme),this.outputElement.innerHTML=d,this.removeToolbarChrome(),this.createToolbar(),this.sourceEditor?.renderTray(),this.diagramEditor?.enableCanvasPanning(),this.diagramEditor?.enableSequenceSelection(),this.state.editingDiagramIndex!==null&&this.diagramEditor?.enableEditing();for(let c of this.outputElement.querySelectorAll(".docdiagram")){let l=o.get(Number(c.dataset.diagramIndex));l&&(c.scrollLeft=l.left,c.scrollTop=l.top)}return globalThis.scrollTo?.(n.x,n.y),!0}closeDocumentMenu(){let e=document.querySelector(".docdiagram-menu"),t=document.querySelector(".docdiagram-menu-toggle");!e||!t||(e.hidden=!0,t.setAttribute("aria-expanded","false"))}downloadDocument(){if(this.sourceEditor?.flushRender(),this.sourceEditor?.hasError&&this.sourceEditor.hasUnsavedDraft&&!globalThis.confirm("Source has errors. Save the last valid version instead?"))return;let e=document.documentElement.cloneNode(!0),t=e.querySelector("#source"),o=e.querySelector(".docdiagram-toolbar"),n=e.querySelector(".docdiagram-source-tray"),s=e.querySelector("#rendered-document");t?.content.replaceChildren(document.createTextNode(this.getSource())),o?.remove(),n?.remove(),s?.replaceChildren();let i=new Blob([`<!doctype html>
${e.outerHTML}`],{type:"text/html;charset=utf-8"}),a=document.createElement("a"),d=document.title.toLowerCase().replace(/[^\w]+/g,"-").replace(/^-|-$/g,"");a.href=URL.createObjectURL(i),a.download=`${d||"document"}-edited.html`,a.click(),URL.revokeObjectURL(a.href),this.state.savedSource=this.getSource()}boot(){!this.sourceElement||!this.outputElement||(lr(),this.state.savedSource=this.getSource(),globalThis.addEventListener("beforeunload",e=>{this.getSource()===this.state.savedSource&&!this.sourceEditor?.hasUnsavedDraft||(e.preventDefault(),e.returnValue="")}),document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.shiftKey&&e.key.toLowerCase()==="e"&&(this.sourceEditor?.isOpen||!Vr(e.target))){e.preventDefault(),this.sourceEditor?.isOpen?this.sourceEditor.close():this.sourceEditor?.open();return}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="s"){e.preventDefault(),this.downloadDocument();return}e.key==="Escape"&&this.closeDocumentMenu()}),document.addEventListener("pointerdown",e=>{let t=document.querySelector(".docdiagram-toolbar");t&&e.target instanceof Node&&!t.contains(e.target)&&this.closeDocumentMenu(),!(!(e.target instanceof Element)||e.target.closest(".docdiagram-toolbar, .docdiagram-node, .docdiagram-edge-group, .docdiagram-connection-port, .docdiagram-edge-endpoint, .docdiagram-inline-editor, .docdiagram-sequence-participant, .docdiagram-sequence-note, .docdiagram-sequence-message")||!this.state.selectedNode&&!this.state.selectedEdge&&!this.state.selectedSequenceElement)&&(Se(this.state),this.renderDocument())}),this.outputElement.addEventListener("dblclick",e=>{e.target instanceof Element&&e.target.closest("button, input, textarea, select, [contenteditable]")||this.sourceEditor?.reveal(globalThis.getSelection?.()?.toString()||"")}),this.renderDocument())}getCoreApi(){return{diagramThemes:ae,nodeColorSchemes:_,supportedDiagramTypes:Oe,nodeColorPalettes:Ut,nodeShapes:De,edgeAnchors:K,edgeRoutes:Fe,edgeMarkerStyles:W,getTheme:e=>xe(e,this.state.documentTheme),getGridSize:re,expandCanvasForNode:Ce,flattenFlowchartNodes:H,getFlowchartNodeBounds:U,reparentFlowchartNode:nt,createUniqueNodeId:Tt,getDefaultNodePosition:qt,duplicateNode:it,createNode:At,getResizeNodeOrigin:We,createConnector:st,reconnectConnector:at,resizeFlowchartNode:mt,deleteConnector:dt,deleteNode:ct,getNodeEffectiveStyle:(e,t)=>le(e,t,this.state.documentTheme,this.state.documentColorScheme),getEdgeEffectiveStyle:(e,t)=>Ae(e,t,this.state.documentTheme),getEdgeMarkerStyle:Ge,getEdgeMarkerDimensions:Ct,parseDiagram:e=>pe(e,this.state.documentColorScheme),parseDocumentFrontmatter:zt,resolveDocument:ft,setFrontmatterTheme:It,isSafeUrl:yt,renderInline:me,renderMarkdown:(e,t)=>this.renderMarkdown(e,t),renderDiagram:(e,t)=>this.renderDiagram(e,t),snapToGrid:J,clampNodeSize:Le,serializeDiagram:ot,setNodeLabel:ze,setNodeShape:lt,setNodeSubtitle:ut,setNodeTextAlignment:Ue,setNodeStyleOverride:ye,setNodeColorPalette:Ye,setNodeSize:_e,setEdgeLabel:Pe,setEdgeRoute:gt,setEdgeAnchor:Xe,setEdgeStyleOverride:Ke,setStyleStrokeWidth:Ze,setEdgeMarkerStart:ht,setEdgeMarkerEnd:pt,validateDocumentSource:Pt,findSourceTextRange:bt,scrollSourceEditorToRange:xt,splitTextLines:oe,renderTextBlock:Q,computeNodeTextLayout:Ie,getNodeGeometry:de,renderNodeBody:Re,buildEdgePath:we,buildEdgeInspectorFields:Ot,clampZoom:Lt}}createToolbar(){if(!this.outputElement)return;let e=document.createElement("section");e.className="docdiagram-toolbar",e.dataset.editing=String(this.state.editingDiagramIndex!==null),e.dataset.theme=this.state.documentTheme,e.dataset.format=this.state.documentFormat;let t=this.getSelectedNode(),o=t?null:this.getSelectedEdge(),n=!t&&!o?this.getSelectedSequenceElement():null,s=t&&this.state.selectedNode?this.state.diagramModels[this.state.selectedNode.diagramIndex]:o&&this.state.selectedEdge?this.state.diagramModels[this.state.selectedEdge.diagramIndex]:n&&this.state.selectedSequenceElement?this.state.diagramModels[this.state.selectedSequenceElement.diagramIndex]:null;e.innerHTML=['<button type="button" class="docdiagram-menu-toggle" aria-label="Document menu" aria-expanded="false" title="Document menu">\u2630</button>','<div class="docdiagram-menu" hidden>','<label class="docdiagram-theme-control">Theme<select class="docdiagram-theme-select">',`<option value="light"${this.state.documentTheme==="light"?" selected":""}>Light</option>`,`<option value="dark"${this.state.documentTheme==="dark"?" selected":""}>Dark</option>`,"</select></label>",'<label class="docdiagram-theme-control">Format<select class="docdiagram-format-select">',`<option value="centered"${this.state.documentFormat==="centered"?" selected":""}>Centered</option>`,`<option value="full-width"${this.state.documentFormat==="full-width"?" selected":""}>Full width</option>`,"</select></label>",'<button type="button" class="docdiagram-edit-source">Edit source</button>','<button type="button" class="docdiagram-save">Save As</button>','<button type="button" class="docdiagram-offline-save" disabled>Save for Offline (coming soon)</button>',"</div>",t&&s?.type==="flowchart"?`<div class="docdiagram-inspector" data-kind="node">${gr(s,t,this.state.documentColorScheme)}</div>`:o&&s?`<div class="docdiagram-inspector" data-kind="edge">${Ot(s,o)}</div>`:n&&s?`<div class="docdiagram-inspector" data-kind="sequence">${hr(s,this.state.selectedSequenceElement,n,this.state.documentColorScheme)}</div>`:""].join("");let i=e.querySelector(".docdiagram-menu-toggle"),a=e.querySelector(".docdiagram-menu");i?.addEventListener("click",()=>{if(!a)return;let d=a.hidden;a.hidden=!d,i.setAttribute("aria-expanded",String(d))}),e.querySelector(".docdiagram-save")?.addEventListener("click",()=>this.downloadDocument()),e.querySelector(".docdiagram-edit-source")?.addEventListener("click",()=>{this.closeDocumentMenu(),this.sourceEditor?.open()}),e.querySelector(".docdiagram-theme-select")?.addEventListener("change",d=>{this.setSource(It(this.getSource(),d.currentTarget.value)),this.renderDocument()}),e.querySelector(".docdiagram-format-select")?.addEventListener("change",d=>{this.state.documentFormat=d.currentTarget.value==="full-width"?"full-width":"centered",this.renderDocument()}),this.outputElement.before(e),t&&this.state.selectedNode?(pr(this,e,this.state.selectedNode.diagramIndex,this.state.selectedNode.nodeId),this.positionInspector(this.state.selectedNode.diagramIndex)):o&&this.state.selectedEdge?(fr(this,e,this.state.selectedEdge.diagramIndex,this.state.selectedEdge.edgeIndex),this.positionInspector(this.state.selectedEdge.diagramIndex)):n&&this.state.selectedSequenceElement&&(br(this,e,n),this.positionInspector(this.state.selectedSequenceElement.diagramIndex)),this.wireChromeControls()}getSelectedNode(){let e=this.state.selectedNode,t=e?this.state.diagramModels[e.diagramIndex]:null;return e&&t?.type==="flowchart"&&$e(this.state,e.diagramIndex)&&j(t,e.nodeId)?.node||null}getSelectedEdge(){let e=this.state.selectedEdge,t=e?this.state.diagramModels[e.diagramIndex]:null;return e&&t?.type==="flowchart"&&$e(this.state,e.diagramIndex)&&t.edges[e.edgeIndex]||null}getSelectedSequenceElement(){let e=this.state.selectedSequenceElement,t=e?this.state.diagramModels[e.diagramIndex]:null;return!e||t?.type!=="sequence"||!$e(this.state,e.diagramIndex)?null:e.kind==="participant"?t.participants?.find(o=>o.id===e.id)||null:e.kind==="message"?t.messages?.[e.index]||null:t.notes?.[e.index]||null}wireChromeControls(){if(this.outputElement){for(let e of this.outputElement.querySelectorAll(".docdiagram-zoom-in, .docdiagram-zoom-out"))e.addEventListener("click",()=>{let t=Number(e.dataset.diagramIndex),o=this.state.diagramZooms.get(t)||100,n=e.classList.contains("docdiagram-zoom-in")?25:-25;this.state.diagramZooms.set(t,Lt(o+n)),this.renderDocument()});for(let e of this.outputElement.querySelectorAll(".docdiagram-fit"))e.addEventListener("click",()=>{this.state.diagramZooms.set(Number(e.dataset.diagramIndex),100),this.renderDocument()});for(let e of this.outputElement.querySelectorAll(".docdiagram-start-editing"))e.addEventListener("click",()=>{let t=Number(e.closest(".docdiagram")?.getAttribute("data-diagram-index")),o=this.state.diagramModels[t];o&&(this.state.editSessionDiagram=pe(ot(o),this.state.documentColorScheme),this.state.editingDiagramIndex=t,Se(this.state),this.renderDocument())});for(let e of this.outputElement.querySelectorAll(".docdiagram-done-editing"))e.addEventListener("click",()=>this.exitEditing(this.state.editingDiagramIndex,!1));for(let e of this.outputElement.querySelectorAll(".docdiagram-cancel-editing"))e.addEventListener("click",()=>this.exitEditing(this.state.editingDiagramIndex,!0));for(let e of this.outputElement.querySelectorAll(".docdiagram-create-node"))e.addEventListener("click",()=>this.createNewNode(Number(e.dataset.diagramIndex)))}}exitEditing(e,t){e!==null&&(t&&this.state.editSessionDiagram&&(this.state.diagramModels[e]=this.state.editSessionDiagram,this.persistDiagramModels()),this.state.editingDiagramIndex=null,this.state.editSessionDiagram=null,Se(this.state),this.renderDocument())}createNewNode(e){let t=this.state.diagramModels[e];if(!t||t.type!=="flowchart")return;let o=At(t);this.state.selectedNode={diagramIndex:e,nodeId:o.id},this.state.selectedEdge=null,this.persistDiagramModels(),this.renderDocument()}positionInspector(e){if(!this.outputElement)return;let t=document.querySelector(".docdiagram-inspector"),o=this.outputElement.querySelector(`.docdiagram[data-diagram-index="${e}"]`);!t||!o||(t.style.top=`${Math.max(16,o.getBoundingClientRect().top)}px`)}applyPageTheme(e){document.documentElement.dataset.docdiagramTheme=e,document.body?.dataset&&(document.body.dataset.docdiagramTheme=e)}removeToolbarChrome(){if(this.outputElement)for(;this.outputElement.previousElementSibling?.classList.contains("docdiagram-toolbar");)this.outputElement.previousElementSibling.remove()}};var Gr=document.querySelector("#source"),Ur=document.querySelector("#rendered-document"),xr=new St(Gr,Ur),Yr=globalThis;Yr.DocDiagramCore=xr.getCoreApi();xr.boot();})();
