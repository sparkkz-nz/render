"use strict";(()=>{var je=["flowchart","sequence"],ve=["rounded-rectangle","circle","oval","database","diamond","rhombus","flattened-hexagon","chevron","right-chevron","document"],V=["top","right","bottom","left"],Ne=["orthogonal","straight","curved"],B=["none","arrow","circle"],He={start:"none",end:"arrow"},jt=["top","center"],Ht=["left","center","right"],$t={width:120,height:60},kt={width:140,height:84},L={shape:"rounded-rectangle",label:"New node",width:190,height:80},O={classic:{pink:{label:"Pink",light:{fill:"#F6C5D8",stroke:"#9D174D",text:"#9D174D"},dark:{fill:"#9D174D",stroke:"#FBCFE8",text:"#FBCFE8"}},red:{label:"Red",light:{fill:"#FECACA",stroke:"#B91C1C",text:"#B91C1C"},dark:{fill:"#B91C1C",stroke:"#FEE2E2",text:"#FEE2E2"}},orange:{label:"Orange",light:{fill:"#FED7AA",stroke:"#C2410C",text:"#9A3412"},dark:{fill:"#C2410C",stroke:"#FFEDD5",text:"#FFEDD5"}},yellow:{label:"Yellow",light:{fill:"#FEF08A",stroke:"#A16207",text:"#854D0E"},dark:{fill:"#A16207",stroke:"#FEF9C3",text:"#FEF9C3"}},green:{label:"Green",light:{fill:"#BBF7D0",stroke:"#15803D",text:"#166534"},dark:{fill:"#15803D",stroke:"#DCFCE7",text:"#DCFCE7"}},cyan:{label:"Cyan",light:{fill:"#A5F3FC",stroke:"#0E7490",text:"#155E75"},dark:{fill:"#0E7490",stroke:"#CFFAFE",text:"#CFFAFE"}},blue:{label:"Blue",light:{fill:"#BFDBFE",stroke:"#1D4ED8",text:"#1E3A8A"},dark:{fill:"#1D4ED8",stroke:"#DBEAFE",text:"#DBEAFE"}},purple:{label:"Purple",light:{fill:"#DDD6FE",stroke:"#6D28D9",text:"#5B21B6"},dark:{fill:"#6D28D9",stroke:"#EDE9FE",text:"#EDE9FE"}},grey:{label:"Grey",light:{fill:"#E5E7EB",stroke:"#4B5563",text:"#374151"},dark:{fill:"#4B5563",stroke:"#E5E7EB",text:"#F9FAFB"}},bw:{label:"Black and white",light:{fill:"#FFFFFF",stroke:"#111827",text:"#111827"},dark:{fill:"#111827",stroke:"#FFFFFF",text:"#FFFFFF"}}}},Bt=O.classic,ne={light:{edge:{stroke:"#52616B",strokeWidth:2,text:"#3E4A54"},node:{fill:"#EAF2FF",stroke:"#3574C7",strokeWidth:2,text:"#17202A"}},dark:{edge:{stroke:"#B8C7D5",strokeWidth:2,text:"#D9E4ED"},node:{fill:"#193A61",stroke:"#71AEF7",strokeWidth:2,text:"#F3F8FC"}}};var Ot=["pink","red","orange","yellow","green","cyan","blue","purple","grey","bw"],Gt=["note","info","warning","success"],Vt={2:"repeat(2, minmax(0, 1fr))",3:"repeat(3, minmax(0, 1fr))","2fr 1fr":"minmax(0, 2fr) minmax(0, 1fr)","1fr 2fr":"minmax(0, 1fr) minmax(0, 2fr)"};var mr=["nodes","edges","participants","messages","activations","notes","groups"],gr=["id","label","shape","position","size","style","palette","subtitle","textVAlign","textHAlign","children"],hr=["source","target","sourceAnchor","targetAnchor","route","label","style","start","end"],Yt=["fill","stroke","strokeWidth","text"],pr=["stroke","strokeWidth","text"],Wt=["tone","colour"],fr=["id","label","kind","palette","style","size"],br=["actor"],xr=["from","to","label","style"],yr=["solid","dashed"],wr=["participant","from","to"],Er=["at","after","label","palette","style","size"],Sr=["label","from","to"],$r=["width","height","participantSpacing","participantSize"];function x(r){return String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function De(r){let e=r.trim();if(e.startsWith('"')&&e.endsWith('"'))try{return JSON.parse(e)}catch{throw new Error(`Invalid quoted scalar: ${e}`)}if(e.startsWith("'")&&e.endsWith("'"))return e.slice(1,-1);if(/^-?\d+(\.\d+)?$/.test(e))return Number(e);if(e==="true"||e==="false")return e==="true";if(e.startsWith("{")&&e.endsWith("}")){let t=e.slice(1,-1).trim();if(!t)return{};let o=t.split(","),n={};for(let a of o){let i=a.indexOf(":");if(i===-1)throw new Error(`Invalid inline mapping: ${e}`);let s=a.slice(0,i).trim();n[s]=De(a.slice(i+1))}return n}return e}function ge(r,e="classic"){let o=r.replace(/\r\n/g,`
`).split(`
`).filter(p=>p.trim()&&!p.trimStart().startsWith("#"));for(let p of o){if(p.trimStart()!==p||!p.trimEnd().endsWith(":"))continue;let m=p.trim().slice(0,-1);if(m!=="canvas"&&!mr.includes(m))throw new Error(`Unsupported diagram section: ${m}`)}let n=0,a=p=>p.length-p.trimStart().length,i=p=>p.trim().match(/^([^:]+):\s*(.*)$/),s=p=>p.trim().match(/^- ([^:]+):\s*(.*)$/),d=p=>n>=o.length||a(o[n])<=p?{}:o[n].trimStart().startsWith("- ")?c(a(o[n])):u(a(o[n])),u=p=>{let m={};for(;n<o.length&&a(o[n])===p;){let g=o[n],h=i(g);if(!h)throw new Error(`Cannot parse diagram line: ${g}`);n+=1,m[h[1]]=h[2]?De(h[2]):d(p)}return m},c=p=>{let m=[];for(;n<o.length&&a(o[n])===p;){let g=o[n],h=s(g);if(!h)throw new Error(`Cannot parse diagram line: ${g}`);n+=1;let $={[h[1]]:h[2]?De(h[2]):d(p)};for(;n<o.length&&a(o[n])>p;){let w=a(o[n]),S=i(o[n]);if(!S)throw new Error(`Cannot parse diagram line: ${o[n]}`);n+=1,$[S[1]]=S[2]?De(S[2]):d(w)}m.push($)}return m},l=u(0);if(!l.type)throw new Error(`Diagram type is required and must be one of: ${je.join(", ")}.`);if(typeof l.type!="string"||!je.includes(l.type))throw new Error(`Unsupported diagram type: ${String(l.type)}`);return l.type==="flowchart"?kr(l,e):vr(l,e)}function kr(r,e="classic"){return r.canvas=r.canvas||{},Array.isArray(r.nodes)||(r.nodes=[]),Array.isArray(r.edges)||(r.edges=[]),Nr(r,e),r}function vr(r,e="classic"){return Dr(r,e),r}function U(r,e,t){for(let o of Object.keys(r||{}))if(!e.includes(o))throw new Error(`Unsupported ${t} field: ${o}`)}function vt(r,e,t){if(r){for(let o of Object.keys(r))if(!e.includes(o))throw new Error(`Unsupported ${t} style field: ${o}`)}}function Nr(r,e="classic"){if(r.participants!==void 0||r.messages!==void 0||r.activations!==void 0||r.notes!==void 0||r.groups!==void 0)throw new Error("Flowchart diagrams do not support sequence sections.");let t=new Set,o=i=>{if("type"in i)throw new Error(`Node "${i.id||"unknown"}" uses removed field "type".`);if(U(i,gr,`node "${i.id||"unknown"}"`),!i.id||!i.label)throw new Error("Every node requires an id and label.");if(!i.shape)throw new Error(`Node "${i.id}" requires a shape.`);if(!ve.includes(i.shape))throw new Error(`Unsupported node shape: ${i.shape}`);if(i.textVAlign!==void 0&&!jt.includes(i.textVAlign))throw new Error(`Unsupported node textVAlign: ${i.textVAlign}`);if(i.textHAlign!==void 0&&!Ht.includes(i.textHAlign))throw new Error(`Unsupported node textHAlign: ${i.textHAlign}`);if(i.palette&&(U(i.palette,Wt,`palette for node "${i.id}"`),!(O[e]?.[i.palette.colour]?.[i.palette.tone]||null)))throw new Error(`Unsupported node palette: ${i.palette.tone||"unknown"} ${i.palette.colour||"unknown"}`);if(i.style?.width!==void 0)throw new Error("Node style.width is not supported; use style.strokeWidth.");if(vt(i.style,Yt,`node "${i.id}"`),t.has(i.id))throw new Error(`Duplicate flowchart node id: ${i.id}`);if(t.add(i.id),i.children!==void 0&&!Array.isArray(i.children))throw new Error(`Children for node "${i.id}" must be a list.`);for(let s of i.children||[])o(s)};for(let i of r.nodes)o(i);for(let i of r.edges){if(U(i,hr,`edge "${i.source||"unknown"}" -> "${i.target||"unknown"}"`),!i.sourceAnchor)throw new Error(`Edge "${i.source||"unknown"}" -> "${i.target||"unknown"}" requires a sourceAnchor.`);if(!i.targetAnchor)throw new Error(`Edge "${i.source||"unknown"}" -> "${i.target||"unknown"}" requires a targetAnchor.`);if(!V.includes(i.sourceAnchor))throw new Error(`Unsupported edge sourceAnchor: ${i.sourceAnchor}`);if(!V.includes(i.targetAnchor))throw new Error(`Unsupported edge targetAnchor: ${i.targetAnchor}`);if(i.route!==void 0&&!Ne.includes(i.route))throw new Error(`Unsupported edge route: ${i.route}`);if(i.start!==void 0&&!B.includes(i.start))throw new Error(`Unsupported edge start marker: ${i.start}`);if(i.end!==void 0&&!B.includes(i.end))throw new Error(`Unsupported edge end marker: ${i.end}`);if(i.style?.width!==void 0)throw new Error("Edge style.width is not supported; use style.strokeWidth.");vt(i.style,pr,`edge "${i.source||"unknown"}" -> "${i.target||"unknown"}"`)}let n=r.theme||"light";if(!ne[n])throw new Error(`Unsupported diagram theme: ${n}`)}function Dr(r,e="classic"){if(r.nodes!==void 0||r.edges!==void 0)throw new Error("Sequence diagrams do not support flowchart sections.");if(!Array.isArray(r.participants)||!Array.isArray(r.messages))throw new Error("Sequence diagrams require participants and messages sections.");if(r.activations!==void 0&&!Array.isArray(r.activations))throw new Error("Sequence diagram activations must be a list.");if(r.notes!==void 0&&!Array.isArray(r.notes))throw new Error("Sequence diagram notes must be a list.");if(r.groups!==void 0&&!Array.isArray(r.groups))throw new Error("Sequence diagram groups must be a list.");if(r.canvas!==void 0&&(typeof r.canvas!="object"||Array.isArray(r.canvas)))throw new Error("Sequence canvas must be a mapping.");U(r.canvas,$r,"sequence canvas");for(let a of["width","height","participantSpacing"]){let i=r.canvas?.[a];if(i!==void 0&&(!Number.isFinite(i)||Number(i)<=0))throw new Error(`Sequence canvas.${a} must be a positive number.`)}if(r.canvas?.participantSize!==void 0){if(typeof r.canvas.participantSize!="object"||Array.isArray(r.canvas.participantSize))throw new Error("Sequence canvas.participantSize must be a mapping.");U(r.canvas.participantSize,["width","height"],"sequence canvas participantSize");for(let a of["width","height"]){let i=r.canvas.participantSize[a];if(i!==void 0&&(!Number.isFinite(i)||Number(i)<=0))throw new Error(`Sequence canvas.participantSize.${a} must be a positive number.`)}}let t=new Set;for(let a of r.participants){if(U(a,fr,`participant "${a.id||"unknown"}"`),!a.id||!a.label)throw new Error("Every sequence participant requires an id and label.");if(a.kind!==void 0&&!br.includes(a.kind))throw new Error(`Unsupported sequence participant kind: ${a.kind}`);if(Ut(a,`participant "${a.id}"`,e),t.has(a.id))throw new Error(`Duplicate sequence participant id: ${a.id}`);t.add(a.id)}for(let[a,i]of r.messages.entries()){if(U(i,xr,`message ${a}`),!i.from||!i.to||!i.label)throw new Error(`Sequence message ${a} requires from, to, and label.`);if(!t.has(i.from)||!t.has(i.to))throw new Error(`Sequence message ${a} references an unknown participant.`);if(i.style!==void 0&&!yr.includes(i.style))throw new Error(`Unsupported sequence message style: ${i.style}`)}for(let[a,i]of(r.activations||[]).entries()){if(U(i,wr,`activation ${a}`),!i.participant||!Number.isInteger(i.from)||!Number.isInteger(i.to))throw new Error(`Sequence activation ${a} requires participant and integer from and to message positions.`);if(!t.has(i.participant))throw new Error(`Sequence activation ${a} references an unknown participant.`);if(i.from<1||i.to<i.from||i.to>r.messages.length)throw new Error(`Sequence activation ${a} range is out of bounds.`)}for(let[a,i]of(r.notes||[]).entries()){U(i,Er,`note ${a}`);let s=i.after;if(!i.at||!Number.isInteger(s)||!i.label)throw new Error(`Sequence note ${a} requires at, after, and label.`);if(Ut(i,`note ${a}`,e),!t.has(i.at))throw new Error(`Sequence note ${a} references an unknown participant.`);if(s<0||s>r.messages.length)throw new Error(`Sequence note ${a} after position is out of bounds.`)}for(let[a,i]of(r.groups||[]).entries()){if(U(i,Sr,`group ${a}`),!i.label&&i.label!=="")throw new Error(`Sequence group ${a} requires a label.`);if(!Number.isInteger(i.from)||!Number.isInteger(i.to))throw new Error(`Sequence group ${a} requires integer from and to indices.`);if(i.from<1||i.to<i.from||i.to>r.messages.length)throw new Error(`Sequence group ${a} range is out of bounds.`)}let o=r.theme||"light";if(!ne[o])throw new Error(`Unsupported diagram theme: ${o}`)}function Ut(r,e,t="classic"){if(r.palette&&(U(r.palette,Wt,`palette for ${e}`),!O[t]?.[String(r.palette.colour)]?.[String(r.palette.tone)]))throw new Error(`Unsupported ${e} palette: ${String(r.palette.tone||"unknown")} ${String(r.palette.colour||"unknown")}`);if(vt(r.style,Yt,e),r.size){U(r.size,["width","height"],`size for ${e}`);for(let o of["width","height"]){let n=r.size[o];if(n!==void 0&&(!Number.isFinite(n)||Number(n)<=0))throw new Error(`${e} size.${o} must be a positive number.`)}}}function he(r){return typeof r=="number"||typeof r=="boolean"?String(r):r&&typeof r=="object"?Object.keys(r).length?`{ ${Object.entries(r).map(([e,t])=>`${e}: ${he(t)}`).join(", ")} }`:"{}":/^[\w./-]+(?: [\w./-]+)*$/.test(String(r))?String(r):JSON.stringify(String(r))}function se(r,e=2){let t=Object.entries(r),[o,n]=t[0],a=[`${" ".repeat(e)}- ${o}: ${he(n)}`];for(let[i,s]of t.slice(1))if(!(i==="children"&&Array.isArray(s)&&!s.length))if(i==="children"&&Array.isArray(s)){a.push(`${" ".repeat(e+2)}children:`);for(let d of s)a.push(...se(d,e+4))}else a.push(`${" ".repeat(e+2)}${i}: ${he(s)}`);return a}function tt(r){let e=[`type: ${he(r.type)}`];for(let[t,o]of Object.entries(r))t==="type"||t==="canvas"||t==="nodes"||t==="edges"||t==="participants"||t==="messages"||t==="activations"||t==="notes"||t==="groups"||e.push(`${t}: ${he(o)}`);if(r.type==="sequence"){if(r.canvas!==void 0){e.push("canvas:");for(let[t,o]of Object.entries(r.canvas))e.push(`  ${t}: ${he(o)}`)}e.push("participants:");for(let t of r.participants||[])e.push(...se(t));e.push("messages:");for(let t of r.messages||[])e.push(...se(t));if(r.activations!==void 0){e.push("activations:");for(let t of r.activations||[])e.push(...se(t))}if(r.notes!==void 0){e.push("notes:");for(let t of r.notes||[])e.push(...se(t))}if(r.groups!==void 0){e.push("groups:");for(let t of r.groups||[])e.push(...se(t))}return e.join(`
`)}e.push("canvas:");for(let[t,o]of Object.entries(r.canvas||{}))e.push(`  ${t}: ${he(o)}`);e.push("nodes:");for(let t of r.nodes||[])e.push(...se(t));e.push("edges:");for(let t of r.edges||[])e.push(...se(t));return e.join(`
`)}function _t(r){return{width:Number(r.size?.width)||L.width,height:Number(r.size?.height)||L.height}}function G(r){let e=[],t=(o,n,a,i)=>{for(let s of o){let d={x:a.x+(Number(s.position?.x)||0),y:a.y+(Number(s.position?.y)||0)};e.push({node:s,parent:n,siblings:o,position:d,depth:i}),t(s.children||[],s,d,i+1)}};return t(r.nodes,null,{x:0,y:0},0),e}function H(r,e){return G(r).find(t=>t.node.id===e)||null}function Fr(r,e){return G(r).find(t=>t.node===e)?.position||{x:0,y:0}}function X(r,e){return{...Fr(r,e),..._t(e)}}function Xt(r,e){return(e.children||[]).some(t=>t===r||Xt(r,t))}function rt(r,e){var p;let t=H(r,e);if(!t)return null;let{node:o,siblings:n,position:a}=t,{width:i,height:s}=_t(o),d={x:a.x+i/2,y:a.y+s/2},c=G(r).filter(m=>m.node!==o&&!Xt(m.node,o)).filter(m=>{let g=X(r,m.node);return d.x>=g.x&&d.x<=g.x+g.width&&d.y>=g.y&&d.y<=g.y+g.height}).reduce((m,g)=>!m||g.depth>=m.depth?g:m,null),l=c?(p=c.node).children||(p.children=[]):r.nodes;return n===l||(n.splice(n.indexOf(o),1),o.position={x:a.x-(c?.position.x||0),y:a.y-(c?.position.y||0)},l.push(o)),o}function fe(r,e="light"){let t=r.theme||e,o=ne[t];if(!o)throw new Error(`Unsupported diagram theme: ${t}`);return o}function Fe(r,e,t){return O[r]?.[t]?.[e]||null}function pe(r,e){return{...r,...e||{}}}function de(r,e,t="light",o="classic"){let a=fe(r,t).node,i=e.palette?Fe(o,e.palette.tone,e.palette.colour):null;return pe(pe(a,i),e.style)}function Me(r,e,t="light",o="classic"){let n=fe(r,t),a=e.palette?Fe(o,e.palette.tone,e.palette.colour):null;return pe(pe(n.node,a),e.style)}function Te(r,e,t="light"){let o=fe(r,t);return pe(o.edge,e.style)}function Be(r,e){let t=e==="start"?r.start:r.end;return typeof t=="string"&&B.includes(t)?t:He[e]}function ee(r){let e=Number(r.canvas?.grid);return Number.isFinite(e)&&e>0?e:0}function ie(r,e){return e?Math.round(r/e)*e:Math.round(r)}function qe(r,e,t){let o=ie(r,t),n=t?Math.ceil(e/t)*t:e;return Math.max(n,o)}function Zt(r){return{x:Number(r.position?.x)||0,y:Number(r.position?.y)||0,width:Number(r.size?.width)||L.width,height:Number(r.size?.height)||L.height}}function Oe(r,e,t=40){let o=Number(r.canvas?.width)||1e3,n=Number(r.canvas?.height)||560,a=new Set(G(r).map(g=>g.node)),i=[...a];i.includes(e)||i.push(e);let s=g=>a.has(g)?X(r,g):Zt(g),d=i.map(s),u=Math.min(0,...d.map(g=>g.x)),c=Math.min(0,...d.map(g=>g.y)),l=u<0?t-u:0,p=c<0?t-c:0;if(l||p)for(let g of G(r).filter(h=>h.parent===null)){let h=g.node;h.position={...h.position,x:(Number(h.position?.x)||0)+l,y:(Number(h.position?.y)||0)+p}}let m=i.map(s);return r.canvas={...r.canvas,width:Math.max(o+l,...m.map(g=>g.x+g.width+t)),height:Math.max(n+p,...m.map(g=>g.y+g.height+t))},r}function Mr(r,e){return r.x<e.x+e.width&&r.x+r.width>e.x&&r.y<e.y+e.height&&r.y+r.height>e.y}function Nt(r,e="new-node"){let t=a=>a.flatMap(i=>[i.id,...t(i.children||[])]),o=new Set(t(r));if(!o.has(e))return e;let n=2;for(;o.has(`${e}-${n}`);)n+=1;return`${e}-${n}`}function Dt(r){let e=Number(r.canvas?.width)||1e3,t=Number(r.canvas?.height)||560,o=ee(r),n={x:ie(Math.max(0,(e-L.width)/2),o),y:ie(Math.max(0,(t-L.height)/2),o)},a=o||20;for(let i=0;i<=Math.max(e,t);i+=a)for(let s of[{x:n.x+i,y:n.y},{x:n.x-i,y:n.y},{x:n.x,y:n.y+i},{x:n.x,y:n.y-i}])if(!(s.x<0||s.y<0||s.x+L.width>e||s.y+L.height>t)&&!G(r).some(({node:d})=>Mr({...s,width:L.width,height:L.height},Zt(d))))return s;return n}function Ft(r){let e={id:Nt(r.nodes),label:L.label,shape:L.shape,position:Dt(r),size:{width:L.width,height:L.height}};return r.nodes.push(e),e}function ot(r,e,t,o,n){let a={source:e,target:o,sourceAnchor:t,targetAnchor:n,route:"orthogonal",end:"arrow"};return r.edges.push(a),a}function nt(r,e,t,o){return e==="source"?(r.source=t,r.sourceAnchor=o):(r.target=t,r.targetAnchor=o),r}function it(r,e){return e<0||e>=r.edges.length?null:r.edges.splice(e,1)[0]}function at(r,e){let t=H(r,e);if(!t)return{node:null,deletedEdges:[]};let o=new Set([t.node,...t.node.children||[]].flatMap(function a(i){return[i,...(i.children||[]).flatMap(a)]}).map(a=>a.id)),n=r.edges.filter(a=>o.has(a.source)||o.has(a.target));return t.siblings.splice(t.siblings.indexOf(t.node),1),r.edges=r.edges.filter(a=>!o.has(a.source)&&!o.has(a.target)),{node:e,deletedEdges:n}}function Ae(r,e){return r.label=String(e).trim()||r.label,r}function st(r,e){return r.shape=e,r}function dt(r,e){return r.subtitle=String(e??"").trim(),r}function Ge(r,e,t){return e==="textVAlign"&&(t==="top"||t==="center")&&(r.textVAlign=t),e==="textHAlign"&&(t==="left"||t==="center"||t==="right")&&(r.textHAlign=t),r}function be(r,e,t){return r.style={...r.style,[e]:t},r}function Ve(r,e,t,o="classic"){if(!Fe(o,e,t))return r;let{fill:a,stroke:i,text:s,...d}=r.style||{};return Object.keys(d).length?r.style=d:delete r.style,r.palette={tone:e,colour:t},r}function Kt(r){return r==="document"?kt:$t}function Ue(r){return{position:{x:Number(r.position?.x)||0,y:Number(r.position?.y)||0},size:{width:Number(r.size?.width)||L.width,height:Number(r.size?.height)||L.height},childPositions:new Map((r.children||[]).map(e=>[e,{x:Number(e.position?.x)||0,y:Number(e.position?.y)||0}]))}}function ct(r,e,t,o,n,a=Ue(e)){let i=ee(r),s=Kt(e.shape),d=t.endsWith("left"),u=t.startsWith("top"),c=qe(a.size.width+(d?-o:o),s.width,i),l=qe(a.size.height+(u?-n:n),s.height,i);if(e.shape==="circle"){let h=Math.max(c,l);c=h,l=h}let p={...e.position,x:d?a.position.x+a.size.width-c:a.position.x,y:u?a.position.y+a.size.height-l:a.position.y},m=a.position.x-p.x,g=a.position.y-p.y;for(let h of e.children||[]){let $=a.childPositions.get(h)||h.position||{x:0,y:0};h.position={...h.position,x:$.x+m,y:$.y+g}}return e.position=p,e.size={...e.size,width:c,height:l},e}function Ye(r,e,t,o){let n=ee(r),a=Kt(e.shape),i=t==="width"?a.width:a.height,s=qe(Number(o)||i,i,n);return e.size=e.shape==="circle"?{...e.size,width:s,height:s}:{...e.size,[t]:s},e}function Le(r,e){return r.label=String(e).trim(),r}function lt(r,e){return r.route=e,r}function We(r,e,t){return e==="source"?r.sourceAnchor=t:r.targetAnchor=t,r}function _e(r,e,t){return r.style={...r.style,[e]:t},r}function Xe(r,e){let t=Math.max(1,Math.round(Number(e))||1);return r.style={...r.style,strokeWidth:t},r}function ut(r,e){return r.start=B.includes(e)?e:He.start,r}function mt(r,e){return r.end=B.includes(e)?e:He.end,r}function Mt(r){return Math.max(25,Number(r)||100)}function Z(r){return String(r??"").replace(/\r\n/g,`
`).split(`
`)}function Y(r,e,t,o,n,a,i="middle"){if(!t.length)return"";let s=t.map((d,u)=>{let c=u===0?"":` dy="${o}"`;return`<tspan x="${r}"${c}>${x(d)||" "}</tspan>`}).join("");return`<text x="${r}" y="${e}" text-anchor="${i}" class="${n}" fill="${x(a)}">${s}</text>`}function ae(r,e,t,o,n){let a=r.shape,i=e+o/2,s=t+n/2,d={x:e+12,y:t+12,width:o-24,height:n-24},u={top:{x:i,y:t},right:{x:e+o,y:s},bottom:{x:i,y:t+n},left:{x:e,y:s}},c;if(a==="circle"){let l=Math.min(o,n),p=i-l/2,m=s-l/2,g=l/2;d.x=p+g*.3,d.y=m+g*.3,d.width=g*1.4,d.height=g*1.4,u.top.y=m,u.right.x=p+l,u.bottom.y=m+l,u.left.x=p,c=`<circle class="docdiagram-node-body" cx="${i}" cy="${s}" r="${g}"/>`}else if(a==="oval")d.x+=o*.1,d.width-=o*.2,c=`<ellipse class="docdiagram-node-body" cx="${i}" cy="${s}" rx="${o/2}" ry="${n/2}"/>`;else if(a==="database"){let l=Math.min(n*.22,18);d.y+=l/2,d.height-=l,c=`<path class="docdiagram-node-body" d="M ${e} ${t+l} C ${e} ${t-l/3} ${e+o} ${t-l/3} ${e+o} ${t+l} V ${t+n-l} C ${e+o} ${t+n+l/3} ${e} ${t+n+l/3} ${e} ${t+n-l} Z"/><path class="docdiagram-node-detail" d="M ${e} ${t+l} C ${e} ${t+l*2.3} ${e+o} ${t+l*2.3} ${e+o} ${t+l}" fill="none"/>`}else if(a==="diamond")d.x+=o*.25,d.y+=n*.25,d.width-=o*.5,d.height-=n*.5,u.top={x:i,y:t},u.right={x:e+o,y:s},u.bottom={x:i,y:t+n},u.left={x:e,y:s},c=`<polygon class="docdiagram-node-body" points="${i},${t} ${e+o},${s} ${i},${t+n} ${e},${s}"/>`;else if(a==="rhombus"){let l=Math.min(o*.2,n*.6);d.x+=l,d.width-=l*2,u.left.x=e+l/2,u.right.x=e+o-l/2,c=`<polygon class="docdiagram-node-body" points="${e+l},${t} ${e+o},${t} ${e+o-l},${t+n} ${e},${t+n}"/>`}else if(a==="flattened-hexagon"){let l=Math.min(o*.18,n*.7);d.x+=l,d.width-=l*2,c=`<polygon class="docdiagram-node-body" points="${e+l},${t} ${e+o-l},${t} ${e+o},${s} ${e+o-l},${t+n} ${e+l},${t+n} ${e},${s}"/>`}else if(a==="chevron"){let l=Math.min(o*.16,n*.45);d.x+=l*1.175,d.width-=l*1.35,u.left.x=e+l,c=`<polygon class="docdiagram-node-body" points="${e},${t} ${e+o-l},${t} ${e+o},${s} ${e+o-l},${t+n} ${e},${t+n} ${e+l},${s}"/>`}else if(a==="right-chevron"){let l=Math.min(o*.16,n*.45);d.width-=l,c=`<polygon class="docdiagram-node-body" points="${e},${t} ${e+o-l},${t} ${e+o},${s} ${e+o-l},${t+n} ${e},${t+n}"/>`}else if(a==="document"){let l=Math.max(12,Math.min(26,Math.min(o,n)*.18));d.width-=l*.45,d.y+=2,d.height-=2,c=`<path class="docdiagram-node-body" d="M ${e} ${t} H ${e+o-l} L ${e+o} ${t+l} V ${t+n} H ${e} Z M ${e+o-l} ${t} V ${t+l} H ${e+o}"/>`}else c=`<rect class="docdiagram-node-body" x="${e}" y="${t}" width="${o}" height="${n}" rx="12"/>`;return{bodyMarkup:c,textBounds:d,anchors:u}}function Ce(r,e,t,o,n){let a,i;typeof r=="number"?(a={x:r,y:e,width:t||0,height:o||0},i=n):(a=r,i=e);let s=20,d=15,u=Z(i.label),c=i.subtitle?Z(i.subtitle):[],l=c.length?6:0,p=u.length*s,m=c.length*d,g=p+l+m,h=i.textHAlign||"center",$=h==="left"?a.x:h==="right"?a.x+a.width:a.x+a.width/2,w=h==="left"?"start":h==="right"?"end":"middle",S=a.y+a.height/2,N=i.textVAlign==="top"?a.y:S-g/2;return{centerX:$,textAnchor:w,labelLines:u,subtitleLines:c,labelLineHeight:s,subtitleLineHeight:d,labelStartY:N+s*.72,subtitleStartY:N+p+l+d*.72}}function ze(r,e,t){return r.bodyMarkup.replace("/>",` fill="${x(e.fill||"")}" stroke="${x(e.stroke||"")}" stroke-width="${t}"/>`).replace('class="docdiagram-node-detail"',`class="docdiagram-node-detail" stroke="${x(e.stroke||"")}" stroke-width="${t}"`)}function Jt(r){return{top:{x:0,y:-1},right:{x:1,y:0},bottom:{x:0,y:1},left:{x:-1,y:0}}[r]}function ce(r){return`${r.x} ${r.y}`}function Tr(r){let e=r.slice(1).map((n,a)=>{let i=r[a];return{start:i,end:n,length:Math.hypot(n.x-i.x,n.y-i.y)}}),o=e.reduce((n,a)=>n+a.length,0)/2;for(let n of e){if(o<=n.length||n===e[e.length-1]){let a=n.length?o/n.length:0;return{x:n.start.x+(n.end.x-n.start.x)*a,y:n.start.y+(n.end.y-n.start.y)*a}}o-=n.length}return r[0]}function xe(r,e,t,o,n="orthogonal"){let a=Jt(t),i=Jt(o),s=a.x!==0,d,u,c,l;if(n==="straight")d=`M ${ce(r)} L ${ce(e)}`,u={x:(r.x+e.x)/2,y:(r.y+e.y)/2},c={x:e.x-r.x,y:e.y-r.y},l=c;else if(n==="curved"){let p=Math.max(Math.abs(e.x-r.x),Math.abs(e.y-r.y),80),m=Math.min(p/2,140),g={x:r.x+a.x*m,y:r.y+a.y*m},h={x:e.x+i.x*m,y:e.y+i.y*m};d=`M ${ce(r)} C ${ce(g)} ${ce(h)} ${ce(e)}`,u={x:(r.x+3*g.x+3*h.x+e.x)/8,y:(r.y+3*g.y+3*h.y+e.y)/8},c={x:g.x-r.x,y:g.y-r.y},l={x:e.x-h.x,y:e.y-h.y}}else{let m={x:r.x+a.x*40,y:r.y+a.y*40},g={x:e.x+i.x*40,y:e.y+i.y*40},h=s?{x:g.x,y:m.y}:{x:m.x,y:g.y},$=[r,m,h,g,e],w=$.filter((N,b)=>b===0||N.x!==$[b-1].x||N.y!==$[b-1].y);w.length===1&&(w=[r,{x:r.x+a.x*40,y:r.y+a.y*40},e]),d=`M ${ce(w[0])}${w.slice(1).map(N=>` L ${ce(N)}`).join("")}`,u=Tr(w),c={x:w[1].x-w[0].x,y:w[1].y-w[0].y};let S=w.slice(-2);l={x:S[1].x-S[0].x,y:S[1].y-S[0].y}}return{path:d,midpoint:u,startTangent:c,endTangent:l,hitPath:d}}function Tt(r){let e=Math.max(1,Number(r)||2),t=6+e*2.5,o=Math.max(t*.38,e/2+1);return{size:t,circleRadius:o}}function Ze(r,e,t,o,n){let a=x(o),{size:i,circleRadius:s}=Tt(n),d=i/2;return e==="arrow"?`<marker id="${r}" markerWidth="${i}" markerHeight="${i}" refX="${i}" refY="${d}" markerUnits="userSpaceOnUse" orient="${t==="start"?"auto-start-reverse":"auto"}"><path fill="${a}" stroke="${a}" d="M 0 0 L ${i} ${d} L 0 ${i} z"/></marker>`:e==="circle"?`<marker id="${r}" markerWidth="${i}" markerHeight="${i}" refX="${d}" refY="${d}" markerUnits="userSpaceOnUse"><circle cx="${d}" cy="${d}" r="${s}" fill="${a}" stroke="${a}"/></marker>`:""}function qt(r){let e=r.replace(/\r\n/g,`
`).split(`
`),t=e.findIndex(a=>a.trim()!=="");if(t===-1||e[t]!=="---")return{content:r,frontmatter:{}};let o=e.indexOf("---",t+1);if(o===-1)return{content:r,frontmatter:{}};let n={};for(let a of e.slice(t+1,o)){if(!a.trim()||a.trimStart().startsWith("#"))continue;let i=a.match(/^([^:]+):\s*(.*)$/);if(!i)throw new Error(`Cannot parse document frontmatter line: ${a}`);n[i[1]]=De(i[2])}return{content:e.slice(o+1).join(`
`),frontmatter:n}}function gt(r){let e=qt(r),t=String(e.frontmatter.theme||"light"),o=String(e.frontmatter.colourScheme||"classic");if(!ne[t])throw new Error(`Unsupported document theme: ${t}`);if(!O[o])throw new Error(`Unsupported document colour scheme: ${o}`);return{...e,theme:t,colourScheme:o}}function At(r){let e=gt(r),t=e.content.replace(/\r\n/g,`
`).split(`
`),o=0;for(;o<t.length;){let a=t[o].replace(/^(?: {0,3}> ?)+/,"").match(/^```([\w-]*)\s*$/);if(!a){o+=1;continue}let i=t.slice(o+1).findIndex(d=>/^```\s*$/.test(d.replace(/^(?: {0,3}> ?)+/,"")));if(i===-1)throw new Error("Unclosed code block.");let s=o+i+1;if(a[1]==="diagram"){let d=t.slice(o+1,s).map(u=>u.replace(/^(?: {0,3}> ?)+/,"")).join(`
`);ge(d,e.colourScheme)}o=s+1}return e}function Lt(r,e){let t=r.replace(/\r\n/g,`
`),o=t.split(`
`),n=o.findIndex(u=>u.trim()!==""),a=n!==-1&&o[n]==="---",i=a?o.indexOf("---",n+1):-1;if(!a||i===-1)return`---
theme: ${e}
---
${t}`;let s=!1,d=o.slice(n+1,i).map(u=>{if(!u.trim()||u.trimStart().startsWith("#"))return u;let c=u.match(/^([^:]+):\s*(.*)$/);return c&&c[1]==="theme"?(s=!0,`theme: ${e}`):u});return s||d.push(`theme: ${e}`),[...o.slice(0,n+1),...d,...o.slice(i)].join(`
`)}function ht(r,e){let t=e.trim(),o=t?r.indexOf(t):-1;return o===-1?null:{start:o,end:o+t.length}}function pt(r,e){let t=Number.parseFloat(globalThis.getComputedStyle(r).lineHeight)||20,o=r.value.slice(0,e.start).split(`
`).length-1,n=Math.max(1,Math.floor(r.clientHeight/t));r.scrollTop=Math.max(0,(o-Math.floor(n/2))*t)}function Ct(r){let e=[],t="",o=!1,n=r.trim().replace(/^\||\|$/g,"");for(let a of n)o?(t+=a,o=!1):a==="\\"?o=!0:a==="|"?(e.push(t.trim()),t=""):t+=a;return e.push(t.trim()),e}function Qt(r){let e=Ct(r);return!e.length||!e.every(t=>/^:?-{3,}:?$/.test(t))?null:e.map(t=>t.startsWith(":")&&t.endsWith(":")?"center":t.startsWith(":")?"left":t.endsWith(":")?"right":"")}function ye(r){return r.match(/^(\s*)([-+*]|\d+[.)])\s+(.+)$/)}function zt(r){let e=r.match(/^:::(section|panel|callout|grid|stack)(?:\s+\{(.*)\})?\s*$/);if(!e)return null;let t={},o=e[2];if(o!==void 0){let n=0,a=/\s*([a-z][\w-]*)=(?:"([^"]*)"|([^\s}]+))/gi,i;for(;i=a.exec(o);){if(i.index!==n||t[i[1]]!==void 0)return null;t[i[1]]=i[2]??i[3],n=a.lastIndex}if(o.slice(n).trim())return null}return{name:e[1],attributes:t}}function qr(r){return/^:::(?:\s+.*)?$/.test(r)}function Ar(r,e,t){let o=1,n=!1;for(let a=e+1;a<t;a+=1){if(/^```/.test(r[a])){n=!n;continue}if(!n){if(zt(r[a]))o+=1;else if(qr(r[a])&&(o-=1,!o))return a}}return-1}function Lr(r){return/^#[\da-f]{3,8}$/i.test(r)}function Cr(r,e="classic"){let t=r.tone!==void 0||r.colour!==void 0;if(t&&(!["light","dark"].includes(r.tone)||!Ot.includes(r.colour)))return null;for(let i of["fill","stroke","text"])if(r[i]!==void 0&&!Lr(r[i]))return null;let o=t?Fe(e,r.tone,r.colour):null,n=Object.fromEntries(["fill","stroke","text"].filter(i=>r[i]!==void 0).map(i=>[i,r[i]])),a=pe(o||{},n);return Object.entries(a).filter(([,i])=>i!==void 0).map(([i,s])=>`--docdiagram-component-${i}:${s}`).join(";")}function ft(r,e=!1){let t=String(r).trim();if(t.startsWith("//")||t.startsWith("\\"))return!1;if(!t||t.startsWith("#")||t.startsWith("/")||t.startsWith("./")||t.startsWith("../")||t.startsWith("?")||e&&/^data:image\/(?:gif|jpeg|png|webp);base64,/i.test(t))return!0;let o=t.match(/^([a-z][a-z\d+.-]*):/i);return!o||["http","https","mailto"].includes(o[1].toLowerCase())}function le(r){let e=[],t=String(r).replace(/`([^`]+)`/g,(o,n)=>{let a=`\0${e.length}\0`;return e.push(`<code>${x(n)}</code>`),a});return t=x(t),t=t.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,(o,n,a)=>{let i=a.replace(/&amp;/g,"&");return ft(i,!0)?`<img src="${x(i)}" alt="${n}">`:`![${n}](${x(a)})`}),t=t.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,(o,n,a)=>{let i=a.replace(/&amp;/g,"&");return ft(i)?`<a href="${x(i)}">${n}</a>`:`[${n}](${x(a)})`}),t=t.replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g,"<strong>$2</strong>").replace(/~~(?=\S)([\s\S]*?\S)~~/g,"<del>$1</del>").replace(/(?<!\*)\*(?=\S)([\s\S]*?\S)\*(?!\*)/g,"<em>$1</em>").replace(/(?<!_)_(?=\S)([\s\S]*?\S)_(?!_)/g,"<em>$1</em>"),t.replace(/\u0000(\d+)\u0000/g,(o,n)=>e[Number(n)])}function Pt(r,e={diagramIndex:0},t){let o=r.replace(/\r\n/g,`
`).split(`
`),n=t?.renderDiagram??((c,l)=>{throw new Error("renderDiagram callback is required for diagram blocks.")}),a=t?.documentColorScheme||"classic";function i(c){let l=o[c]||"";return!l.trim()||/^```/.test(l)||/^(#{1,6})\s+/.test(l)||/^ {0,3}&gt;|^ {0,3}>/.test(l)||/^ {0,3}(?:[-*_]\s*){3,}$/.test(l)||/^:::/.test(l)||!!ye(l)||c+1<o.length&&!!Qt(o[c+1])}function s(c,l){let p=ye(o[c]),m=/^\d/.test(p[2]),g=[],h=c,$=m?Number.parseInt(p[2],10):null;for(;h<o.length;){let b=ye(o[h]);if(!b||b[1].length!==l||/^\d/.test(b[2])!==m)break;let y={content:[b[3]],children:[]};for(h+=1;h<o.length;){let v=ye(o[h]);if(v&&v[1].length>l){let k=s(h,v[1].length);y.children.push(k.html),h=k.index;continue}if(!o[h].trim()){h+=1;let k=h<o.length?ye(o[h]):null;if(h>=o.length||!k||k[1].length<=l)break;continue}if(/^\s+/.test(o[h])&&!ye(o[h])){y.content.push(o[h].trim()),h+=1;continue}break}g.push(y)}let w=m?"ol":"ul",S=m&&$!==1?` start="${$}"`:"",N=g.map(b=>{let y=!m&&b.content.length===1&&b.content[0].match(/^\[([ xX])\]\s+(.*)$/),v=y?`<input type="checkbox" disabled${y[1].toLowerCase()==="x"?" checked":""}> ${le(y[2])}`:le(b.content.join(" "));return`<li${y?' class="docdiagram-task-list-item"':""}>${v}${b.children.join("")}</li>`}).join("");return{html:`<${w}${S}>${N}</${w}>`,index:h}}function d(c,l){let p=zt(o[c]),m=p?Ar(o,c,l):-1;if(!p||m===-1)return null;let{name:g,attributes:h}=p,$={section:["title","tone","colour","fill","stroke","text"],panel:["title","tone","colour","fill","stroke","text"],callout:["kind","title","tone","colour","fill","stroke","text"],grid:["columns"],stack:[]};if(Object.keys(h).some(y=>!$[g].includes(y)))return null;if(g==="grid"){let y=Vt[h.columns];if(!y)return null;let v=[],k=c+1;for(;k<m;){if(!o[k].trim()){k+=1;continue}let T=zt(o[k]);if(!T||!["panel","callout","stack"].includes(T.name))return null;let P=d(k,m);if(!P)return null;v.push(`<div class="docdiagram-grid-item">${P.html}</div>`),k=P.next}return{html:`<div class="docdiagram-grid" style="--docdiagram-grid-columns:${y}">${v.join("")}</div>`,next:m+1}}if(g==="stack")return Object.keys(h).length?null:{html:`<div class="docdiagram-stack">${u(c+1,m)}</div>`,next:m+1};let w=Cr(h,a);if(w===null||g==="callout"&&h.kind!==void 0&&!Gt.includes(h.kind))return null;let S=h.title?`<div class="docdiagram-component-title">${le(h.title)}</div>`:"",N=u(c+1,m),b=`docdiagram-component${g==="callout"?"":` docdiagram-${g}`}${w?" docdiagram-component-styled":""}`;if(g==="callout"){let y=h.kind||"info";return{html:`<aside class="${b} docdiagram-callout docdiagram-callout-${y}"${w?` style="${w}"`:""} aria-label="${x(h.title||y)} callout"><div class="docdiagram-callout-kind">${x(y)}</div>${S}${N}</aside>`,next:m+1}}return{html:`<section class="${b}"${w?` style="${w}"`:""}>${S}${N}</section>`,next:m+1}}function u(c=0,l=o.length){let p=[],m=c;for(;m<l;){let g=o[m];if(!g.trim()){m+=1;continue}if(/^:::/.test(g)){let b=d(m,l);b?(p.push(b.html),m=b.next):(p.push(`<pre class="docdiagram-literal-source"><code>${x(g)}</code></pre>`),m+=1);continue}let h=g.match(/^```([\w-]*)\s*$/);if(h){let b=o.slice(m+1,l).findIndex(k=>/^```\s*$/.test(k));if(b===-1){p.push('<section class="docdiagram-error"><strong>Unclosed code block.</strong></section>');break}let y=m+b+1,v=o.slice(m+1,y).join(`
`);if(h[1]==="diagram")p.push(n(v,e.diagramIndex)),e.diagramIndex+=1;else{let k=h[1]?` class="language-${x(h[1])}"`:"";p.push(`<pre><code${k}>${x(v)}</code></pre>`)}m=y+1;continue}let $=g.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);if($){p.push(`<h${$[1].length}>${le($[2])}</h${$[1].length}>`),m+=1;continue}if(/^ {0,3}(?:[-*_]\s*){3,}$/.test(g)){p.push("<hr>"),m+=1;continue}if(/^ {0,3}>/.test(g)){let b=[];for(;m<l&&/^ {0,3}>/.test(o[m]);)b.push(o[m].replace(/^ {0,3}> ?/,"")),m+=1;p.push(`<blockquote>${Pt(b.join(`
`),e,t)}</blockquote>`);continue}let w=ye(g);if(w){let b=s(m,w[1].length);p.push(b.html),m=b.index;continue}let S=m+1<l?Qt(o[m+1]):null;if(S){let b=Ct(g),y=[];for(m+=2;m<l&&o[m].includes("|")&&o[m].trim();)y.push(Ct(o[m])),m+=1;let v=(k,T)=>T.map((P,W)=>`<${k}${S[W]?` style="text-align:${S[W]}"`:""}>${le(P||"")}</${k}>`).join("");p.push(`<table><thead><tr>${v("th",b)}</tr></thead><tbody>${y.map(k=>`<tr>${v("td",k)}</tr>`).join("")}</tbody></table>`);continue}let N=[g.trim()];for(m+=1;m<l&&!i(m);)N.push(o[m].trim()),m+=1;p.push(`<p>${le(N.join(" "))}</p>`)}return p.join("")}return u()}function It(r,e,t){let o=e!=="none",n=e==="flowchart";return['<div class="docdiagram-diagram-toolbar" role="toolbar" aria-label="Diagram controls">',`<button type="button" class="docdiagram-icon-button docdiagram-zoom-in" data-diagram-index="${r}" aria-label="Zoom in" title="Zoom in">+</button>`,`<button type="button" class="docdiagram-icon-button docdiagram-zoom-out" data-diagram-index="${r}" aria-label="Zoom out" title="Zoom out">\u2212</button>`,`<button type="button" class="docdiagram-icon-button docdiagram-fit" data-diagram-index="${r}" aria-label="Zoom to fit" title="Zoom to fit">\u22A1</button>`,o?t.editingDiagramIndex===r?`<button type="button" class="docdiagram-icon-button docdiagram-done-editing" aria-label="Done editing" title="Done editing">\u2713</button><button type="button" class="docdiagram-icon-button docdiagram-cancel-editing" aria-label="Cancel editing and discard changes" title="Cancel editing and discard changes">\xD7</button>${n?`<button type="button" class="docdiagram-icon-button docdiagram-create-node" data-diagram-index="${r}" aria-label="New node" title="New node">+</button>`:""}`:t.editingDiagramIndex===null?'<button type="button" class="docdiagram-icon-button docdiagram-start-editing" aria-label="Edit diagram" title="Edit diagram">\u270E</button>':"":"","</div>"].join("")}function er(r,e,t,o){let{selectedNode:n,selectedEdge:a,editingNode:i,editingEdge:s,connectionDrag:d,diagramZooms:u}=t,c=t.editingDiagramIndex===e,l=G(r),p=new Map(l.map(b=>[b.node.id,b])),m=16,g=[],h=[],$=r.edges.map((b,y)=>{let v=p.get(b.source),k=p.get(b.target);if(!v||!k)return"";let T=v.node,P=k.node,W=ae(T,v.position.x,v.position.y,Number(T.size?.width)||190,Number(T.size?.height)||80),Q=ae(P,k.position.x,k.position.y,Number(P.size?.width)||190,Number(P.size?.height)||80),te=b.sourceAnchor||"right",$e=b.targetAnchor||"left",C=W.anchors[te],F=Q.anchors[$e],I=b.route||"orthogonal",A=xe(C,F,te,$e,I),_=A.midpoint.x,Je=A.midpoint.y-10,ue=Te(r,b,t.documentTheme),me=a?.diagramIndex===e&&a.edgeIndex===y,wt=me&&s?.diagramIndex===e&&s.edgeIndex===y,Pe=(Number(ue.strokeWidth)||2)+(me?2:0),Qe=220,et=72,Ie=b.label?Z(b.label):[],Et=Ie.length*m,St=Je-Et/2+m*.72,Re=Be(b,"start"),f=Be(b,"end"),E=`docdiagram-marker-${e}-${y}-start`,q=`docdiagram-marker-${e}-${y}-end`;Re!=="none"&&g.push(Ze(E,Re,"start",ue.stroke||"",Pe)),f!=="none"&&g.push(Ze(q,f,"end",ue.stroke||"",Pe)),me&&c&&h.push(`<circle class="docdiagram-edge-endpoint" data-diagram-index="${e}" data-edge-index="${y}" data-endpoint="source" cx="${C.x}" cy="${C.y}" r="7"/>`,`<circle class="docdiagram-edge-endpoint" data-diagram-index="${e}" data-edge-index="${y}" data-endpoint="target" cx="${F.x}" cy="${F.y}" r="7"/>`);let M=[Re!=="none"?` marker-start="url(#${E})"`:"",f!=="none"?` marker-end="url(#${q})"`:""].join("");return[`<g class="docdiagram-edge-group${me?" docdiagram-edge-selected":""}" data-diagram-index="${e}" data-edge-index="${y}">`,`<path class="docdiagram-edge-hit" d="${A.hitPath}" fill="none" stroke="transparent" stroke-width="16"/>`,`<path class="docdiagram-edge" d="${A.path}"${M} stroke="${x(ue.stroke||"")}" stroke-width="${Pe}"/>`,wt?`<foreignObject class="docdiagram-inline-editor-host" x="${_-Qe/2}" y="${Je-et/2}" width="${Qe}" height="${et}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-edge" aria-label="Edit edge label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${x(b.label||"")}</textarea></foreignObject>`:Ie.length?Y(_,St,Ie,m,"docdiagram-edge-label",ue.text||""):"","</g>"].join("")}).join(""),w=l.map(({node:b,position:y})=>{let v=y.x,k=y.y,T=Number(b.size?.width)||190,P=Number(b.size?.height)||80,W=de(r,b,t.documentTheme,t.documentColorScheme),Q=n?.diagramIndex===e&&n.nodeId===b.id,te=Q&&i?.diagramIndex===e&&i.nodeId===b.id,$e=(Number(W.strokeWidth)||2)+(Q?2:0),C=ae(b,v,k,T,P),F=Ce(C.textBounds,b);return[`<g class="docdiagram-node${Q?" docdiagram-node-selected":""}" data-diagram-index="${e}" data-node-id="${x(b.id)}">`,ze(C,W,$e),te?`<foreignObject class="docdiagram-inline-editor-host" x="${C.textBounds.x}" y="${C.textBounds.y}" width="${C.textBounds.width}" height="${C.textBounds.height}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-node" aria-label="Edit node label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${x(b.label)}</textarea></foreignObject>`:Y(F.centerX,F.labelStartY,F.labelLines,F.labelLineHeight,"docdiagram-node-label",W.text||"",F.textAnchor),!te&&F.subtitleLines.length?Y(F.centerX,F.subtitleStartY,F.subtitleLines,F.subtitleLineHeight,"docdiagram-node-subtitle",W.text||"",F.textAnchor):"",Q&&c&&!te?[["top-left",v-7,k-7],["top-right",v+T-7,k-7],["bottom-left",v-7,k+P-7],["bottom-right",v+T-7,k+P-7]].map(([I,A,_])=>`<rect class="docdiagram-resize-handle" data-resize-corner="${I}" x="${A}" y="${_}" width="14" height="14" rx="3"/>`).join(""):"",Q&&c&&!te?V.map(I=>{let A=C.anchors[I];return`<circle class="docdiagram-connection-port" data-anchor="${I}" cx="${A.x}" cy="${A.y}" r="7" aria-label="${I} connection port"/>`}).join(""):"","</g>"].join("")}).join(""),S=Number(r.canvas.width)||1e3,N=Number(r.canvas.height)||560;return[`<figure class="docdiagram" data-diagram-index="${e}" data-diagram-type="flowchart" data-editing="${c}">`,o(e,"flowchart",t),`<svg viewBox="0 0 ${S} ${N}" role="img" aria-label="Architecture diagram" data-diagram-index="${e}" style="width: ${u.get(e)||100}%">`,`<defs>${g.join("")}</defs>`,w,$,d?.diagramIndex===e?`<path class="docdiagram-connection-preview${d.invalid?" docdiagram-connection-invalid":""}" d="${xe(d.start,d.current,d.sourceAnchor,d.targetAnchor||d.sourceAnchor,"straight").path}"/>`:"",h.join(""),"</svg>","</figure>"].join("")}function tr(r,e,t,o){let n=fe(r,t.documentTheme),a=Number(r.canvas?.width)||1e3,i=Number(r.canvas?.height)||560,s=r.participants||[],d=r.messages||[],u=r.activations||[],c=r.notes||[],l=r.groups||[],p=90,m=90,g=28,h=Number(r.canvas?.participantSize?.width)||180,$=Number(r.canvas?.participantSize?.height)||42,w=Number(r.canvas?.participantSpacing)||220,S=16,N=74+Math.max(0,...s.filter(f=>f.kind==="actor").map(f=>Z(f.label||"").length-1))*S,b=48,y=18,v=56,k=`docdiagram-sequence-arrow-${e}`,T=g+N+12,P=s[0],W=s[s.length-1],Q=Number(P?.size?.width)||h,te=Number(W?.size?.width)||h,$e=s.length>1?Q/2+w*(s.length-1)+te/2:h+p+m,C=Math.max(a,$e,p+m),F=new Map;s.forEach((f,E)=>{F.set(f.id,s.length===1?C/2:Q/2+w*E)});let I=T+40,A=d.map((f,E)=>({...f,index:E,y:I+E*v})),_=c.map(f=>{let E=Z(f.label||""),q=Math.max(b,E.length*16+22,Number(f.size?.height)||0),R=((f.after?A[Number(f.after)-1]:null)?.y||T)+y,re=F.get(f.at||"")||C/2,j=Math.max(160,Number(f.size?.width)||0),oe=Math.min(C-j/2-24,Math.max(j/2+24,re));return{...f,lines:E,x:oe-j/2,y:R,width:j,height:q}}),Je=l.map(f=>A[f.to-1]?.y+34||I),ue=Math.max(T+140,_.length?_[_.length-1].y+_[_.length-1].height:0,A.length?A[A.length-1].y+44:I,...Je),me=Math.max(i,ue+56),wt=me-36,Pe=u.map((f,E)=>({participantId:f.participant,depth:u.slice(0,E).filter(q=>q.participant===f.participant&&q.from<=f.from&&q.to>=f.from).length,startY:(A[f.from-1]?.y||I)-10,endY:(A[f.to-1]?.y||I)+18})),Qe=s.map(f=>{let E=F.get(f.id)||0,q=Z(f.label||""),M=Me(r,f,t.documentTheme,t.documentColorScheme),R=Number(f.size?.width)||h,re=Number(f.size?.height)||$;if(f.kind==="actor"){let j=g+10,oe=j+18,ke=oe+18;return[`<g class="docdiagram-sequence-participant docdiagram-sequence-actor" data-diagram-index="${e}" data-participant-id="${x(f.id)}">`,`<circle cx="${E}" cy="${j}" r="8" fill="none" stroke="${x(M.stroke||"")}" stroke-width="${Number(M.strokeWidth)||2}"/>`,`<path d="M ${E} ${j+8} V ${ke} M ${E-14} ${oe} H ${E+14} M ${E} ${ke} L ${E-12} ${ke+18} M ${E} ${ke} L ${E+12} ${ke+18}" fill="none" stroke="${x(M.stroke||"")}" stroke-width="${Number(M.strokeWidth)||2}" stroke-linecap="round" stroke-linejoin="round"/>`,Y(E,g+N-4-(q.length-1)*S,q,S,"docdiagram-node-label",M.text||""),"</g>"].join("")}return[`<g class="docdiagram-sequence-participant" data-diagram-index="${e}" data-participant-id="${x(f.id)}">`,`<rect x="${E-R/2}" y="${g}" width="${R}" height="${re}" rx="12" fill="${x(M.fill||"")}" stroke="${x(M.stroke||"")}" stroke-width="${Number(M.strokeWidth)||2}"/>`,Y(E,g+re/2+6-(q.length-1)*S/2,q,S,"docdiagram-node-label",M.text||""),"</g>"].join("")}).join(""),et=s.map(f=>{let E=F.get(f.id)||0;return`<path class="docdiagram-sequence-lifeline" d="M ${E} ${T} L ${E} ${wt}" fill="none" stroke="${x(n.edge.stroke)}" stroke-width="2" stroke-dasharray="8 6"/>`}).join(""),Ie=l.map(f=>{let E=(A[f.from-1]?.y||I)-24,q=(A[f.to-1]?.y||I)+30,M=Math.min(220,Math.max(110,String(f.label).length*8+28));return['<g class="docdiagram-sequence-group">',`<rect x="42" y="${E}" width="${C-84}" height="${q-E}" rx="12" fill="none" stroke="${x(n.edge.stroke)}" stroke-width="2" stroke-dasharray="10 6" opacity="0.8"/>`,`<rect x="54" y="${E-16}" width="${M}" height="24" rx="6" fill="${x(n.node.fill)}" stroke="${x(n.edge.stroke)}" stroke-width="1.5"/>`,`<text x="${54+M/2}" y="${E+1}" text-anchor="middle" class="docdiagram-edge-label" fill="${x(n.edge.text)}">${x(f.label||"")}</text>`,"</g>"].join("")}).join(""),Et=_.map((f,E)=>{let M=f.y+18,R=Me(r,f,t.documentTheme,t.documentColorScheme);return[`<g class="docdiagram-sequence-note" data-diagram-index="${e}" data-note-index="${E}">`,`<rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" rx="10" fill="${x(R.fill||"")}" stroke="${x(R.stroke||"")}" stroke-width="${Number(R.strokeWidth)||2}"/>`,Y(f.x+f.width/2,M,f.lines,16,"docdiagram-node-subtitle",R.text||""),"</g>"].join("")}).join(""),St=Pe.map(f=>{let E=F.get(f.participantId)||0,q=f.depth*7,M=12,R=Math.max(20,f.endY-f.startY),re=s.find(oe=>oe.id===f.participantId),j=re?Me(r,re,t.documentTheme,t.documentColorScheme):n.node;return`<rect class="docdiagram-sequence-activation" x="${E-M/2+q}" y="${f.startY}" width="${M}" height="${R}" rx="4" fill="${x(j.fill||"")}" stroke="${x(j.stroke||"")}" stroke-width="${Number(j.strokeWidth)||2}"/>`}).join(""),Re=A.map(f=>{let E=F.get(f.from)||0,q=F.get(f.to)||0,M=f.style==="dashed",R=Z(f.label||""),re=R.length*15,j=f.y-12-re/2+11,oe=` marker-end="url(#${k})"`;return f.from===f.to?[`<g class="docdiagram-sequence-message" data-diagram-index="${e}" data-message-index="${f.index}">`,`<path d="M ${E} ${f.y} L ${E+48} ${f.y} L ${E+48} ${f.y+28} L ${E} ${f.y+28}" fill="none" stroke="${x(n.edge.stroke)}" stroke-width="2"${oe}${M?' stroke-dasharray="8 5"':""}/>`,Y(E+48/2,j,R,15,"docdiagram-edge-label",n.edge.text),"</g>"].join(""):[`<g class="docdiagram-sequence-message" data-diagram-index="${e}" data-message-index="${f.index}">`,`<path d="M ${E} ${f.y} L ${q} ${f.y}" fill="none" stroke="${x(n.edge.stroke)}" stroke-width="2"${oe}${M?' stroke-dasharray="8 5"':""}/>`,Y((E+q)/2,j,R,15,"docdiagram-edge-label",n.edge.text),"</g>"].join("")}).join("");return[`<figure class="docdiagram" data-diagram-index="${e}" data-diagram-type="sequence" data-editing="${t.editingDiagramIndex===e}">`,o(e,"sequence",t),`<svg viewBox="0 0 ${C} ${me}" role="img" aria-label="Sequence diagram" data-diagram-index="${e}" style="width: ${t.diagramZooms.get(e)||100}%">`,`<defs>${Ze(k,"arrow","end",n.edge.stroke,2)}</defs>`,Ie,Qe,et,St,Et,Re,"</svg>","</figure>"].join("")}function rr(r,e,t){try{let o=ge(r,t.colourScheme);return t.onDiagram(e,o),o.type==="sequence"?tr(o,e,t.state,It):er(o,e,t.state,It)}catch(o){let n=o instanceof Error?o.message:String(o);return`<section class="docdiagram-error"><strong>Diagram could not be rendered.</strong><br>${x(n)}</section>`}}function or(){let r=document.createElement("style");r.textContent=`
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
  `,document.head.append(r)}function nr(){return{diagramModels:[],editingDiagramIndex:null,selectedNode:null,selectedEdge:null,selectedSequenceElement:null,editingNode:null,editingEdge:null,connectionDrag:null,documentTheme:"light",documentColorScheme:"classic",documentFormat:"centered",savedSource:"",editSessionDiagram:null,diagramZooms:new Map}}function we(r){r.selectedNode=null,r.selectedEdge=null,r.selectedSequenceElement=null,r.editingNode=null,r.editingEdge=null}function Ee(r,e){return r.editingDiagramIndex===e}function K(r,e){return r.target instanceof Element?r.target.closest(e):null}function J(r,e){let t=r.diagramModels[e];return t?.type==="flowchart"?t:null}function z(r){return Number(r)}var bt=class{constructor(e){this.host=e}enableCanvasPanning(){for(let e of this.host.outputElement.querySelectorAll(".docdiagram svg"))e.addEventListener("pointerdown",t=>{t.target===e&&this.beginCanvasPan(e,t)})}enableSequenceSelection(){for(let e of this.host.outputElement.querySelectorAll('.docdiagram[data-diagram-type="sequence"] svg'))e.addEventListener("click",t=>{if(!Ee(this.host.state,z(e.dataset.diagramIndex)))return;let o=K(t,".docdiagram-sequence-participant"),n=K(t,".docdiagram-sequence-note"),a=K(t,".docdiagram-sequence-message");o?this.host.state.selectedSequenceElement={diagramIndex:z(o.getAttribute("data-diagram-index")||void 0),kind:"participant",id:o.getAttribute("data-participant-id")||""}:n?this.host.state.selectedSequenceElement={diagramIndex:z(n.getAttribute("data-diagram-index")||void 0),kind:"note",index:z(n.getAttribute("data-note-index")||void 0)}:a?this.host.state.selectedSequenceElement={diagramIndex:z(a.getAttribute("data-diagram-index")||void 0),kind:"message",index:z(a.getAttribute("data-message-index")||void 0)}:this.host.state.selectedSequenceElement=null,this.host.state.selectedNode=null,this.host.state.selectedEdge=null,this.host.renderDocument()})}enableEditing(){for(let e of this.host.outputElement.querySelectorAll(".docdiagram svg"))Ee(this.host.state,z(e.dataset.diagramIndex))&&(e.addEventListener("click",t=>this.handleDiagramClick(e,t)),e.addEventListener("pointerdown",t=>this.handleDiagramPointerDown(e,t)));for(let e of this.host.outputElement.querySelectorAll(".docdiagram-inline-editor"))this.wireInlineEditor(e);this.host.outputElement.dataset.deleteShortcutBound||(this.host.outputElement.dataset.deleteShortcutBound="true",document.addEventListener("keydown",e=>{this.host.state.editingDiagramIndex===null||e.key!=="Delete"&&e.key!=="Backspace"||e.target instanceof Element&&e.target.matches("input, textarea, select, [contenteditable]")||(this.host.state.selectedNode||this.host.state.selectedEdge)&&(e.preventDefault(),this.deleteSelected())}))}selectNode(e,t){this.host.state.selectedNode={diagramIndex:e,nodeId:t},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}selectEdge(e,t){this.host.state.selectedEdge={diagramIndex:e,edgeIndex:t},this.host.state.selectedNode=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}handleDiagramClick(e,t){if(K(t,".docdiagram-inline-editor"))return;let o=K(t,".docdiagram-node");if(o){this.selectNode(z(o.getAttribute("data-diagram-index")||void 0),o.getAttribute("data-node-id")||"");return}let n=K(t,".docdiagram-edge-group");if(n){let a=z(n.getAttribute("data-diagram-index")||void 0),i=z(n.getAttribute("data-edge-index")||void 0),s=this.host.state.selectedEdge?.diagramIndex===a&&this.host.state.selectedEdge.edgeIndex===i,d=this.host.state.editingEdge?.diagramIndex===a&&this.host.state.editingEdge.edgeIndex===i;s&&!d?(this.host.state.editingEdge={diagramIndex:a,edgeIndex:i},this.host.renderDocument()):this.selectEdge(a,i);return}(this.host.state.selectedNode||this.host.state.selectedEdge)&&this.clearSelection()}handleDiagramPointerDown(e,t){let o=K(t,".docdiagram-connection-port");if(o){let w=o.closest(".docdiagram-node"),S=z(w?.getAttribute("data-diagram-index")||e.dataset.diagramIndex),N=o.getAttribute("data-node-id")||w?.getAttribute("data-node-id")||"",b=J(this.host.state,S),y=b?H(b,N)?.node:null,v=o.getAttribute("data-anchor")||"";y&&this.beginConnectionDrag(e,t,{diagramIndex:S,sourceNodeId:N,sourceAnchor:v,start:this.getNodePortPoint(y,v),current:this.getNodePortPoint(y,v),invalid:!1});return}let n=K(t,".docdiagram-edge-endpoint");if(n){let w=z(n.getAttribute("data-diagram-index")||void 0),S=z(n.getAttribute("data-edge-index")||void 0),N=J(this.host.state,w),b=N?.edges[S],y=n.getAttribute("data-endpoint");if(!b||y!=="source"&&y!=="target")return;let v=y==="source"?b.source:b.target,k=y==="source"?b.sourceAnchor:b.targetAnchor,T=N?H(N,v)?.node:null;if(!T||!k)return;this.beginConnectionDrag(e,t,{diagramIndex:w,edgeIndex:S,endpoint:y,reconnect:!0,sourceNodeId:v,sourceAnchor:k,start:this.getNodePortPoint(T,k),current:this.getNodePortPoint(T,k),invalid:!1});return}let a=K(t,".docdiagram-resize-handle");if(a){let w=a.closest(".docdiagram-node"),S=a.getAttribute("data-resize-corner");w&&(S==="top-left"||S==="top-right"||S==="bottom-left"||S==="bottom-right")&&this.resizeNode(e,t,w,S);return}if(K(t,".docdiagram-inline-editor"))return;let i=K(t,".docdiagram-node");if(!i)return;let s=z(i.getAttribute("data-diagram-index")||void 0),d=i.getAttribute("data-node-id")||"",u=J(this.host.state,s),c=u?H(u,d)?.node:null;if(!u||!c)return;t.preventDefault();let l=this.svgPoint(e,t),p=X(u,c),m=ee(u),g=!1;this.capturePointer(e,t);let h=w=>{let S=this.svgPoint(e,w),N=ie(p.x+S.x-l.x,m),b=ie(p.y+S.y-l.y,m);g=g||N!==p.x||b!==p.y,i.setAttribute("transform",`translate(${N-p.x} ${b-p.y})`);let y=H(u,d);c.position={...c.position,x:N-(y?.parent?X(u,y.parent).x:0),y:b-(y?.parent?X(u,y.parent).y:0)}},$=w=>{this.releasePointer(e,w),e.removeEventListener("pointermove",h),e.removeEventListener("pointerup",$),e.removeEventListener("pointercancel",$),g?(rt(u,d),Oe(u,c),this.host.state.selectedNode={diagramIndex:s,nodeId:d},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.persistDiagramModels(),this.host.renderDocument()):this.host.state.selectedNode?.diagramIndex===s&&this.host.state.selectedNode.nodeId===d?(this.host.state.editingNode={diagramIndex:s,nodeId:d},this.host.renderDocument()):this.selectNode(s,d)};e.addEventListener("pointermove",h),e.addEventListener("pointerup",$),e.addEventListener("pointercancel",$)}getSelectedNode(){let e=this.host.state.selectedNode,t=e?J(this.host.state,e.diagramIndex):null;return e&&t&&H(t,e.nodeId)?.node||null}getSelectedEdge(){let e=this.host.state.selectedEdge,t=e?J(this.host.state,e.diagramIndex):null;return e&&t?.edges[e.edgeIndex]||null}clearSelection(){this.host.state.selectedNode=null,this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}deleteSelected(){let e=this.host.state.selectedNode,t=this.host.state.selectedEdge;if(e){let o=J(this.host.state,e.diagramIndex);if(!o)return;let n=o.edges.filter(a=>a.source===e.nodeId||a.target===e.nodeId);if(n.length&&!globalThis.confirm(`Delete this node and its ${n.length} attached connector${n.length===1?"":"s"}?`))return;at(o,e.nodeId)}else if(t){let o=J(this.host.state,t.diagramIndex);if(!o)return;it(o,t.edgeIndex)}else return;we(this.host.state),this.host.persistDiagramModels(),this.host.renderDocument()}wireInlineEditor(e){let t=!1,o=()=>{if(!t){if(t=!0,e.classList.contains("docdiagram-inline-editor-edge")){let a=this.getSelectedEdge();a&&(Le(a,e.value),this.host.persistDiagramModels()),this.host.state.editingEdge=null}else{let a=this.getSelectedNode();a&&(Ae(a,e.value),this.host.persistDiagramModels()),this.host.state.editingNode=null}this.host.renderDocument()}},n=()=>{t||(t=!0,e.classList.contains("docdiagram-inline-editor-edge")?this.host.state.editingEdge=null:this.host.state.editingNode=null,this.host.renderDocument())};e.addEventListener("pointerdown",a=>a.stopPropagation()),e.addEventListener("click",a=>a.stopPropagation()),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.metaKey||a.ctrlKey)?(a.preventDefault(),o()):a.key==="Escape"&&(a.preventDefault(),n())}),e.addEventListener("blur",o,{once:!0}),e.focus(),e.select()}resizeNode(e,t,o,n){t.preventDefault();let a=z(o.getAttribute("data-diagram-index")||void 0),i=o.getAttribute("data-node-id")||"",s=J(this.host.state,a),d=s?H(s,i)?.node:null;if(!s||!d)return;let u=this.svgPoint(e,t),c=Ue(d),l=!1;this.capturePointer(e,t);let p=g=>{let h=this.svgPoint(e,g);ct(s,d,n,h.x-u.x,h.y-u.y,c);let $=Number(d.size?.width)||190,w=Number(d.size?.height)||80;l=l||$!==c.size.width||w!==c.size.height,this.updateNodeSizeMarkup(o,d,$,w)},m=g=>{this.releasePointer(e,g),e.removeEventListener("pointermove",p),e.removeEventListener("pointerup",m),e.removeEventListener("pointercancel",m),l&&(Oe(s,d),this.host.state.selectedNode={diagramIndex:a,nodeId:i},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.persistDiagramModels(),this.host.renderDocument())};e.addEventListener("pointermove",p),e.addEventListener("pointerup",m),e.addEventListener("pointercancel",m)}updateNodeSizeMarkup(e,t,o,n){let a=J(this.host.state,z(e.getAttribute("data-diagram-index")||void 0));if(!a)return;let{x:i,y:s}=X(a,t),d=e.querySelector(".docdiagram-node-body"),u=e.querySelector(".docdiagram-node-label"),c=e.querySelector(".docdiagram-node-subtitle"),l=e.querySelectorAll(".docdiagram-resize-handle");if(!d)return;let p=de(a,t),m=ae(t,i,s,o,n),g=Ce(m.textBounds,t);for(let h of e.querySelectorAll(".docdiagram-node-detail"))h.remove();d.outerHTML=ze(m,p,Number(p.strokeWidth)||2);for(let h of[u,c])if(h){h.setAttribute("x",String(g.centerX)),h.setAttribute("y",String(h===u?g.labelStartY:g.subtitleStartY)),h.setAttribute("text-anchor",g.textAnchor);for(let $ of h.querySelectorAll("tspan"))$.setAttribute("x",String(g.centerX))}for(let h of l){let $=h.getAttribute("data-resize-corner");h.setAttribute("x",String($?.endsWith("left")?i-7:i+o-7)),h.setAttribute("y",String($?.startsWith("top")?s-7:s+n-7))}}getNodePortPoint(e,t){let o=this.host.state.diagramModels.find(a=>a.type==="flowchart"&&H(a,e.id)?.node===e);if(!o)return{x:0,y:0};let n=X(o,e);return ae(e,n.x,n.y,n.width,n.height).anchors[t]}addConnectionTargetPorts(e,t){let o=J(this.host.state,t);if(o)for(let{node:n}of G(o))for(let a of V){let i=this.getNodePortPoint(n,a),s=document.createElementNS("http://www.w3.org/2000/svg","circle");s.setAttribute("class","docdiagram-connection-port docdiagram-connection-target-port"),s.dataset.nodeId=n.id,s.dataset.anchor=a,s.setAttribute("cx",String(i.x)),s.setAttribute("cy",String(i.y)),s.setAttribute("r","7"),e.append(s)}}beginConnectionDrag(e,t,o){t.preventDefault(),t.stopPropagation(),this.host.state.connectionDrag={...o,current:this.svgPoint(e,t),invalid:!1},this.addConnectionTargetPorts(e,o.diagramIndex);let n=document.createElementNS("http://www.w3.org/2000/svg","path");n.setAttribute("class","docdiagram-connection-preview"),e.append(n),this.capturePointer(e,t);let a=d=>{let c=document.elementFromPoint(d.clientX,d.clientY)?.closest(".docdiagram-connection-port");return c||[...e.querySelectorAll(".docdiagram-connection-port")].find(l=>{let p=l.getBoundingClientRect();return d.clientX>=p.left&&d.clientX<=p.right&&d.clientY>=p.top&&d.clientY<=p.bottom})||null},i=d=>{let u=this.host.state.connectionDrag;if(!u)return;let c=this.svgPoint(e,d),l=a(d);u.current=c,u.invalid=!l;let p=l?.getAttribute("data-anchor")||u.sourceAnchor;n.setAttribute("d",xe(u.start,c,u.sourceAnchor,p,"straight").path),n.classList.toggle("docdiagram-connection-invalid",u.invalid)},s=d=>{this.releasePointer(e,d),e.removeEventListener("pointermove",i),e.removeEventListener("pointerup",s),e.removeEventListener("pointercancel",s);let u=a(d),c=this.host.state.connectionDrag;if(this.host.state.connectionDrag=null,u&&c){let l=J(this.host.state,c.diagramIndex),p=u.getAttribute("data-node-id")||u.closest(".docdiagram-node")?.getAttribute("data-node-id"),m=u.getAttribute("data-anchor")||"";if(l&&p){if(c.reconnect&&c.edgeIndex!==void 0&&c.endpoint){let g=l.edges[c.edgeIndex];g&&(nt(g,c.endpoint,p,m),this.host.state.selectedEdge={diagramIndex:c.diagramIndex,edgeIndex:c.edgeIndex},this.host.state.selectedNode=null)}else{let g=ot(l,c.sourceNodeId,c.sourceAnchor,p,m);this.host.state.selectedEdge={diagramIndex:c.diagramIndex,edgeIndex:l.edges.indexOf(g)},this.host.state.selectedNode=null}this.host.persistDiagramModels()}}this.host.renderDocument()};e.addEventListener("pointermove",i),e.addEventListener("pointerup",s),e.addEventListener("pointercancel",s)}beginCanvasPan(e,t){let o=e.closest(".docdiagram");if(!o)return;t.preventDefault();let n={clientX:t.clientX,clientY:t.clientY,scrollLeft:o.scrollLeft,scrollTop:o.scrollTop};o.classList.add("docdiagram-panning"),this.capturePointer(e,t);let a=s=>{o.scrollLeft=n.scrollLeft-(s.clientX-n.clientX),o.scrollTop=n.scrollTop-(s.clientY-n.clientY)},i=s=>{this.releasePointer(e,s),o.classList.remove("docdiagram-panning"),e.removeEventListener("pointermove",a),e.removeEventListener("pointerup",i),e.removeEventListener("pointercancel",i)};e.addEventListener("pointermove",a),e.addEventListener("pointerup",i),e.addEventListener("pointercancel",i)}svgPoint(e,t){let o=e.getBoundingClientRect(),n=e.viewBox.baseVal;return{x:(t.clientX-o.left)*n.width/o.width,y:(t.clientY-o.top)*n.height/o.height}}capturePointer(e,t){t.isTrusted&&e.setPointerCapture(t.pointerId)}releasePointer(e,t){t.isTrusted&&e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId)}};function ir(r,e){return Object.entries(O[r]||{}).map(([t,o])=>`<option value="${t}"${t===e?" selected":""}>${o.label}</option>`).join("")}function ar(r,e,t="classic"){let o=ee(r),n=de(r,e),a=Number(e.size?.width)||190,i=Number(e.size?.height)||80,s=e.shape==="document"?{width:140,height:84}:{width:120,height:60},d=o?Math.ceil(s.width/o)*o:s.width,u=o?Math.ceil(s.height/o)*o:s.height,c=o||1,l=O[t]||{},p=Object.entries(l).find(([,h])=>[h.light,h.dark].some($=>$.fill.toLowerCase()===(n.fill||"").toLowerCase()&&$.stroke.toLowerCase()===(n.stroke||"").toLowerCase()&&$.text.toLowerCase()===(n.text||"").toLowerCase())),m=e.palette?.colour||p?.[0]||"blue",g=e.palette?.tone||(p&&p[1].light.fill.toLowerCase()===(n.fill||"").toLowerCase()?"light":"dark");return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${x(e.label)}</textarea></label>`,`<label class="docdiagram-field docdiagram-field-wide">Subtitle<textarea class="docdiagram-inspector-subtitle docdiagram-inspector-textarea" rows="2">${x(e.subtitle||"")}</textarea></label>`,`<label class="docdiagram-field">Tone<select class="docdiagram-inspector-tone"><option value="light"${g==="light"?" selected":""}>Light</option><option value="dark"${g==="dark"?" selected":""}>Dark</option></select></label>`,`<label class="docdiagram-field">Colour<select class="docdiagram-inspector-colour">${ir(t,m)}</select></label>`,`<label class="docdiagram-field">Shape<select class="docdiagram-inspector-shape">${ve.map(h=>`<option value="${h}"${h===e.shape?" selected":""}>${h}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Fill<input type="color" class="docdiagram-inspector-fill" value="${x(n.fill||"")}"></label>`,`<label class="docdiagram-field">Border<input type="color" class="docdiagram-inspector-stroke" value="${x(n.stroke||"")}"></label>`,`<label class="docdiagram-field">Border width<input type="number" class="docdiagram-inspector-stroke-width" value="${Number(n.strokeWidth)||2}" min="1" step="1"></label>`,`<label class="docdiagram-field">Text<input type="color" class="docdiagram-inspector-text" value="${x(n.text||"")}"></label>`,`<label class="docdiagram-field">Vertical text<select class="docdiagram-inspector-text-v-align"><option value="top"${e.textVAlign==="top"?" selected":""}>Top</option><option value="center"${e.textVAlign!=="top"?" selected":""}>Center</option></select></label>`,`<label class="docdiagram-field">Horizontal text<select class="docdiagram-inspector-text-h-align"><option value="left"${e.textHAlign==="left"?" selected":""}>Left</option><option value="center"${e.textHAlign!=="left"&&e.textHAlign!=="right"?" selected":""}>Center</option><option value="right"${e.textHAlign==="right"?" selected":""}>Right</option></select></label>`,`<label class="docdiagram-field">Width<input type="number" class="docdiagram-inspector-width" value="${a}" min="${d}" step="${c}"></label>`,`<label class="docdiagram-field">Height<input type="number" class="docdiagram-inspector-height" value="${i}" min="${u}" step="${c}"></label>`].join("")}function Rt(r,e){let t=Te(r,e),o=Number(t.strokeWidth)||2,n=e.route||"orthogonal",a=e.start||"none",i=e.end||"arrow";return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${x(e.label||"")}</textarea></label>`,`<label class="docdiagram-field">Route<select class="docdiagram-inspector-route">${Ne.map(s=>`<option value="${s}"${s===n?" selected":""}>${s}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Source side<select class="docdiagram-inspector-source-anchor">${V.map(s=>`<option value="${s}"${s===e.sourceAnchor?" selected":""}>${s}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Target side<select class="docdiagram-inspector-target-anchor">${V.map(s=>`<option value="${s}"${s===e.targetAnchor?" selected":""}>${s}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Start<select class="docdiagram-inspector-marker-start">${B.map(s=>`<option value="${s}"${s===a?" selected":""}>${s}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">End<select class="docdiagram-inspector-marker-end">${B.map(s=>`<option value="${s}"${s===i?" selected":""}>${s}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Stroke<input type="color" class="docdiagram-inspector-stroke" value="${x(t.stroke||"")}"></label>`,`<label class="docdiagram-field">Label colour<input type="color" class="docdiagram-inspector-text" value="${x(t.text||"")}"></label>`,`<label class="docdiagram-field">Stroke width<input type="number" class="docdiagram-inspector-stroke-width" value="${o}" min="1" step="1"></label>`].join("")}function sr(r,e,t,o="classic"){let n="from"in t?null:Me(r,t),a=e.kind!=="message",i=a?t:null;return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-sequence-inspector-label docdiagram-inspector-textarea" rows="2">${x(t.label||"")}</textarea></label>`,e.kind==="message"?`<label class="docdiagram-field">Style<select class="docdiagram-sequence-inspector-message-style"><option value="solid"${t.style!=="dashed"?" selected":""}>Solid</option><option value="dashed"${t.style==="dashed"?" selected":""}>Dashed</option></select></label>`:"",a?`<label class="docdiagram-field">Tone<select class="docdiagram-sequence-inspector-tone"><option value="light"${i?.palette?.tone!=="dark"?" selected":""}>Light</option><option value="dark"${i?.palette?.tone==="dark"?" selected":""}>Dark</option></select></label>`:"",a?`<label class="docdiagram-field">Colour<select class="docdiagram-sequence-inspector-colour">${ir(o,i?.palette?.colour||"blue")}</select></label>`:"",a?`<label class="docdiagram-field">Fill<input type="color" class="docdiagram-sequence-inspector-fill" value="${x(n?.fill||"")}"></label><label class="docdiagram-field">Border<input type="color" class="docdiagram-sequence-inspector-stroke" value="${x(n?.stroke||"")}"></label><label class="docdiagram-field">Text<input type="color" class="docdiagram-sequence-inspector-text" value="${x(n?.text||"")}"></label><label class="docdiagram-field">Width<input type="number" min="1" class="docdiagram-sequence-inspector-width" value="${Number(i?.size?.width)||""}"></label><label class="docdiagram-field">Height<input type="number" min="1" class="docdiagram-sequence-inspector-height" value="${Number(i?.size?.height)||""}"></label>`:""].join("")}function Ke(r,e){return r.querySelector(e)}function D(r,e,t){Ke(r,e)?.addEventListener("change",o=>{t(o.currentTarget.value)})}function Se(r,e){e(),r.persistDiagramModels(),r.renderDocument()}function dr(r,e,t,o){let n=d=>{let u=r.state.diagramModels[t];if(!u||u.type!=="flowchart")return;let c=H(u,o)?.node;c&&Se(r,()=>d(u,c))};D(e,".docdiagram-inspector-label",d=>n((u,c)=>Ae(c,d))),D(e,".docdiagram-inspector-subtitle",d=>n((u,c)=>dt(c,d)));let a=Ke(e,".docdiagram-inspector-tone"),i=Ke(e,".docdiagram-inspector-colour"),s=()=>{a&&i&&n((d,u)=>Ve(u,a.value,i.value,r.state.documentColorScheme))};a?.addEventListener("change",s),i?.addEventListener("change",s),D(e,".docdiagram-inspector-shape",d=>n((u,c)=>st(c,d))),D(e,".docdiagram-inspector-fill",d=>n((u,c)=>be(c,"fill",d))),D(e,".docdiagram-inspector-stroke",d=>n((u,c)=>be(c,"stroke",d))),D(e,".docdiagram-inspector-text",d=>n((u,c)=>be(c,"text",d))),D(e,".docdiagram-inspector-text-v-align",d=>n((u,c)=>Ge(c,"textVAlign",d))),D(e,".docdiagram-inspector-text-h-align",d=>n((u,c)=>Ge(c,"textHAlign",d))),D(e,".docdiagram-inspector-stroke-width",d=>n((u,c)=>Xe(c,d))),D(e,".docdiagram-inspector-width",d=>n((u,c)=>Ye(u,c,"width",d))),D(e,".docdiagram-inspector-height",d=>n((u,c)=>Ye(u,c,"height",d)))}function cr(r,e,t,o){let n=a=>{let i=r.state.diagramModels[t];if(!i||i.type!=="flowchart")return;let s=i.edges[o];s&&Se(r,()=>a(i,s))};D(e,".docdiagram-inspector-label",a=>n((i,s)=>Le(s,a))),D(e,".docdiagram-inspector-route",a=>n((i,s)=>lt(s,a))),D(e,".docdiagram-inspector-source-anchor",a=>n((i,s)=>We(s,"source",a))),D(e,".docdiagram-inspector-target-anchor",a=>n((i,s)=>We(s,"target",a))),D(e,".docdiagram-inspector-marker-start",a=>n((i,s)=>ut(s,a))),D(e,".docdiagram-inspector-marker-end",a=>n((i,s)=>mt(s,a))),D(e,".docdiagram-inspector-stroke",a=>n((i,s)=>_e(s,"stroke",a))),D(e,".docdiagram-inspector-text",a=>n((i,s)=>_e(s,"text",a))),D(e,".docdiagram-inspector-stroke-width",a=>n((i,s)=>Xe(s,a)))}function lr(r,e,t){let o=r.state.selectedSequenceElement;if(!o)return;if(D(e,".docdiagram-sequence-inspector-label",d=>Se(r,()=>{t.label=d.trim()||t.label})),o.kind==="message"){D(e,".docdiagram-sequence-inspector-message-style",d=>Se(r,()=>{t.style=d}));return}let n=t,a=Ke(e,".docdiagram-sequence-inspector-tone"),i=Ke(e,".docdiagram-sequence-inspector-colour"),s=()=>{a&&i&&Se(r,()=>Ve(n,a.value,i.value,r.state.documentColorScheme))};a?.addEventListener("change",s),i?.addEventListener("change",s);for(let[d,u]of[[".docdiagram-sequence-inspector-fill","fill"],[".docdiagram-sequence-inspector-stroke","stroke"],[".docdiagram-sequence-inspector-text","text"]])D(e,d,c=>Se(r,()=>be(n,u,c)));for(let[d,u]of[[".docdiagram-sequence-inspector-width","width"],[".docdiagram-sequence-inspector-height","height"]])D(e,d,c=>Se(r,()=>{let l=Number(c);Number.isFinite(l)&&l>0&&(n.size={...n.size,[u]:l})}))}var xt=class{constructor(e){this.host=e;this.renderTimer=null;this.resizeObserver=null;this.openState=!1;this.draft="";this.error=""}get isOpen(){return this.openState}get hasUnsavedDraft(){return this.openState&&this.draft!==this.host.getSource()}get hasError(){return this.error.length>0}get draftSource(){return this.draft}setError(e){this.error=e,this.updateStatus()}clearError(){this.error=""}open(){globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=null,this.draft=this.host.getSource(),this.error="",this.openState=!0,this.host.stopDiagramEditing(),this.host.renderDocument();let e=()=>this.focus();globalThis.requestAnimationFrame?.(e)??e()}close(){this.flushRender(),!(this.error&&this.draft!==this.host.getSource()&&!globalThis.confirm("Discard the invalid source changes?"))&&(this.openState=!1,this.draft="",this.error="",this.renderTray(),document.querySelector(".docdiagram-menu-toggle")?.focus())}flushRender(){return this.renderTimer===null?!0:this.renderDraft()}syncSource(e){if(!this.openState)return;this.draft=e,this.error="";let t=document.querySelector(".docdiagram-source-editor");if(!t)return;let o=t.selectionStart,n=t.selectionEnd,a=t.scrollTop;t.value=e,t.setSelectionRange(Math.min(o,e.length),Math.min(n,e.length)),t.scrollTop=a,this.updateStatus()}reveal(e){let t=ht(this.host.getSource(),e);if(!t||this.hasUnsavedDraft)return!1;this.openState||this.open();let o=()=>{let n=document.querySelector(".docdiagram-source-editor");n&&(n.focus(),n.setSelectionRange(t.start,t.end),pt(n,t))};return globalThis.requestAnimationFrame?.(o)??o(),!0}renderTray(){let e=document.querySelector(".docdiagram-source-tray");if(!this.openState){this.resizeObserver?.disconnect(),this.resizeObserver=null,e?.remove(),delete this.host.outputElement.dataset.sourceEditorOpen,this.host.outputElement.style.removeProperty("--docdiagram-source-tray-height");return}if(e){e.dataset.theme=this.host.getDocumentTheme(),this.host.outputElement.dataset.sourceEditorOpen="true",this.updateStatus();return}e=document.createElement("section"),e.className="docdiagram-source-tray",e.dataset.theme=this.host.getDocumentTheme(),e.setAttribute("aria-label","Document source editor"),e.innerHTML=['<header class="docdiagram-source-header">','<div><strong>Source</strong><span class="docdiagram-source-shortcut">Cmd/Ctrl+Shift+E to close</span></div>','<button type="button" class="docdiagram-source-close">Close source editor</button>',"</header>",'<label class="docdiagram-source-label">Canonical Markdown<textarea class="docdiagram-source-editor" spellcheck="false"></textarea></label>','<p class="docdiagram-source-status" aria-live="polite"></p>','<p class="docdiagram-source-error" role="alert"></p>'].join("");let t=e.querySelector(".docdiagram-source-editor"),o=e.querySelector(".docdiagram-source-close");if(!t||!o)return;t.value=this.draft,t.addEventListener("input",()=>{this.draft=t.value,this.error="",this.updateStatus(),this.scheduleRender()}),o.addEventListener("click",()=>this.close()),this.host.outputElement.after(e),this.host.outputElement.dataset.sourceEditorOpen="true";let n=()=>{this.host.outputElement.style.setProperty("--docdiagram-source-tray-height",`${e?.offsetHeight||0}px`)};this.resizeObserver?.disconnect(),globalThis.ResizeObserver&&(this.resizeObserver=new globalThis.ResizeObserver(n),this.resizeObserver.observe(e)),n(),this.updateStatus()}scheduleRender(){globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=globalThis.setTimeout(()=>{this.renderTimer=null,this.renderDraft()},250)}renderDraft(){return globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=null,this.host.renderDocument(this.draft,{preserveOnError:!0})}updateStatus(){let e=document.querySelector(".docdiagram-source-tray");if(!e)return;let t=e.querySelector(".docdiagram-source-status"),o=e.querySelector(".docdiagram-source-error");!t||!o||(t.textContent=this.error?"Source has errors; showing the last valid render.":"Changes render automatically.",o.hidden=!this.error,o.textContent=this.error)}focus(){let e=document.querySelector(".docdiagram-source-editor");e&&(e.focus(),e.setSelectionRange(e.value.length,e.value.length))}};function zr(r){return r instanceof Element&&r.matches("input, textarea, select, [contenteditable]")}var yt=class{constructor(e,t){this.sourceElement=e;this.outputElement=t;this.state=nr();this.sourceEditor=t?new xt({outputElement:t,getSource:()=>this.getSource(),getDocumentTheme:()=>this.getDocumentTheme(),renderDocument:(o,n)=>this.renderDocument(o,n),stopDiagramEditing:()=>this.stopDiagramEditing(),closeDocumentMenu:()=>this.closeDocumentMenu()}):null,this.diagramEditor=t?new bt({outputElement:t,state:this.state,persistDiagramModels:()=>this.persistDiagramModels(),renderDocument:()=>this.renderDocument()}):null}getSource(){return this.sourceElement?.content.textContent||""}setSource(e){this.sourceElement?.content.replaceChildren(document.createTextNode(e))}getDocumentTheme(){return this.state.documentTheme}stopDiagramEditing(){this.state.editingDiagramIndex!==null&&(this.state.editingDiagramIndex=null,this.state.editSessionDiagram=null,we(this.state))}renderDiagram(e,t){return rr(e,t,{colourScheme:this.state.documentColorScheme,state:{...this.state,documentTheme:this.state.documentTheme,documentColorScheme:this.state.documentColorScheme},onDiagram:(o,n)=>{this.state.diagramModels[o]=n}})}renderMarkdown(e,t={diagramIndex:0}){return Pt(e,t,{renderDiagram:(o,n)=>this.renderDiagram(o,n),documentColorScheme:this.state.documentColorScheme})}persistDiagramModels(){let e=0,t=this.getSource().replace(/\r\n/g,`
`).replace(/^```diagram\s*\n([\s\S]*?)^```$/gm,()=>{let o=this.state.diagramModels[e];return e+=1,o?`\`\`\`diagram
${tt(o)}
\`\`\``:"```diagram\n```"});this.setSource(t),this.sourceEditor?.syncSource(t)}renderDocument(e=this.getSource(),{preserveOnError:t=!1}={}){if(!this.outputElement)return!1;let o=new Map([...this.outputElement.querySelectorAll(".docdiagram")].map(u=>[Number(u.dataset.diagramIndex),{left:u.scrollLeft,top:u.scrollTop}])),n={x:globalThis.scrollX||0,y:globalThis.scrollY||0},a=[...this.state.diagramModels],i=this.state.documentTheme,s=this.state.documentColorScheme;this.state.diagramModels.length=0;let d;try{let u=t?At(e):gt(e);this.state.documentTheme=u.theme,this.state.documentColorScheme=u.colourScheme,d=this.renderMarkdown(u.content)}catch(u){let c=u instanceof Error?u.message:String(u);return this.state.diagramModels.length=0,this.state.diagramModels.push(...a),t?(this.state.documentTheme=i,this.state.documentColorScheme=s,this.sourceEditor?.setError(c),!1):(this.applyPageTheme(this.state.documentTheme),this.removeToolbarChrome(),this.outputElement.innerHTML=`<section class="docdiagram-error"><strong>Document could not be rendered.</strong><br>${x(c)}</section>`,this.sourceEditor?.renderTray(),!1)}this.setSource(e),this.sourceEditor?.clearError(),this.outputElement.dataset.theme=this.state.documentTheme,this.outputElement.dataset.format=this.state.documentFormat,this.applyPageTheme(this.state.documentTheme),this.outputElement.innerHTML=d,this.removeToolbarChrome(),this.createToolbar(),this.sourceEditor?.renderTray(),this.diagramEditor?.enableCanvasPanning(),this.diagramEditor?.enableSequenceSelection(),this.state.editingDiagramIndex!==null&&this.diagramEditor?.enableEditing();for(let u of this.outputElement.querySelectorAll(".docdiagram")){let c=o.get(Number(u.dataset.diagramIndex));c&&(u.scrollLeft=c.left,u.scrollTop=c.top)}return globalThis.scrollTo?.(n.x,n.y),!0}closeDocumentMenu(){let e=document.querySelector(".docdiagram-menu"),t=document.querySelector(".docdiagram-menu-toggle");!e||!t||(e.hidden=!0,t.setAttribute("aria-expanded","false"))}downloadDocument(){if(this.sourceEditor?.flushRender(),this.sourceEditor?.hasError&&this.sourceEditor.hasUnsavedDraft&&!globalThis.confirm("Source has errors. Save the last valid version instead?"))return;let e=document.documentElement.cloneNode(!0),t=e.querySelector("#source"),o=e.querySelector(".docdiagram-toolbar"),n=e.querySelector(".docdiagram-source-tray"),a=e.querySelector("#rendered-document");t?.content.replaceChildren(document.createTextNode(this.getSource())),o?.remove(),n?.remove(),a?.replaceChildren();let i=new Blob([`<!doctype html>
${e.outerHTML}`],{type:"text/html;charset=utf-8"}),s=document.createElement("a"),d=document.title.toLowerCase().replace(/[^\w]+/g,"-").replace(/^-|-$/g,"");s.href=URL.createObjectURL(i),s.download=`${d||"document"}-edited.html`,s.click(),URL.revokeObjectURL(s.href),this.state.savedSource=this.getSource()}boot(){!this.sourceElement||!this.outputElement||(or(),this.state.savedSource=this.getSource(),globalThis.addEventListener("beforeunload",e=>{this.getSource()===this.state.savedSource&&!this.sourceEditor?.hasUnsavedDraft||(e.preventDefault(),e.returnValue="")}),document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.shiftKey&&e.key.toLowerCase()==="e"&&(this.sourceEditor?.isOpen||!zr(e.target))){e.preventDefault(),this.sourceEditor?.isOpen?this.sourceEditor.close():this.sourceEditor?.open();return}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="s"){e.preventDefault(),this.downloadDocument();return}e.key==="Escape"&&this.closeDocumentMenu()}),document.addEventListener("pointerdown",e=>{let t=document.querySelector(".docdiagram-toolbar");t&&e.target instanceof Node&&!t.contains(e.target)&&this.closeDocumentMenu(),!(!(e.target instanceof Element)||e.target.closest(".docdiagram-toolbar, .docdiagram-node, .docdiagram-edge-group, .docdiagram-connection-port, .docdiagram-edge-endpoint, .docdiagram-inline-editor, .docdiagram-sequence-participant, .docdiagram-sequence-note, .docdiagram-sequence-message")||!this.state.selectedNode&&!this.state.selectedEdge&&!this.state.selectedSequenceElement)&&(we(this.state),this.renderDocument())}),this.outputElement.addEventListener("dblclick",e=>{e.target instanceof Element&&e.target.closest("button, input, textarea, select, [contenteditable]")||this.sourceEditor?.reveal(globalThis.getSelection?.()?.toString()||"")}),this.renderDocument())}getCoreApi(){return{diagramThemes:ne,nodeColorSchemes:O,supportedDiagramTypes:je,nodeColorPalettes:Bt,nodeShapes:ve,edgeAnchors:V,edgeRoutes:Ne,edgeMarkerStyles:B,getTheme:e=>fe(e,this.state.documentTheme),getGridSize:ee,expandCanvasForNode:Oe,flattenFlowchartNodes:G,getFlowchartNodeBounds:X,reparentFlowchartNode:rt,createUniqueNodeId:Nt,getDefaultNodePosition:Dt,createNode:Ft,getResizeNodeOrigin:Ue,createConnector:ot,reconnectConnector:nt,resizeFlowchartNode:ct,deleteConnector:it,deleteNode:at,getNodeEffectiveStyle:(e,t)=>de(e,t,this.state.documentTheme,this.state.documentColorScheme),getEdgeEffectiveStyle:(e,t)=>Te(e,t,this.state.documentTheme),getEdgeMarkerStyle:Be,getEdgeMarkerDimensions:Tt,parseDiagram:e=>ge(e,this.state.documentColorScheme),parseDocumentFrontmatter:qt,resolveDocument:gt,setFrontmatterTheme:Lt,isSafeUrl:ft,renderInline:le,renderMarkdown:(e,t)=>this.renderMarkdown(e,t),renderDiagram:(e,t)=>this.renderDiagram(e,t),snapToGrid:ie,clampNodeSize:qe,serializeDiagram:tt,setNodeLabel:Ae,setNodeShape:st,setNodeSubtitle:dt,setNodeTextAlignment:Ge,setNodeStyleOverride:be,setNodeColorPalette:Ve,setNodeSize:Ye,setEdgeLabel:Le,setEdgeRoute:lt,setEdgeAnchor:We,setEdgeStyleOverride:_e,setStyleStrokeWidth:Xe,setEdgeMarkerStart:ut,setEdgeMarkerEnd:mt,validateDocumentSource:At,findSourceTextRange:ht,scrollSourceEditorToRange:pt,splitTextLines:Z,renderTextBlock:Y,computeNodeTextLayout:Ce,getNodeGeometry:ae,renderNodeBody:ze,buildEdgePath:xe,buildEdgeInspectorFields:Rt,clampZoom:Mt}}createToolbar(){if(!this.outputElement)return;let e=document.createElement("section");e.className="docdiagram-toolbar",e.dataset.editing=String(this.state.editingDiagramIndex!==null),e.dataset.theme=this.state.documentTheme,e.dataset.format=this.state.documentFormat;let t=this.getSelectedNode(),o=t?null:this.getSelectedEdge(),n=!t&&!o?this.getSelectedSequenceElement():null,a=t&&this.state.selectedNode?this.state.diagramModels[this.state.selectedNode.diagramIndex]:o&&this.state.selectedEdge?this.state.diagramModels[this.state.selectedEdge.diagramIndex]:n&&this.state.selectedSequenceElement?this.state.diagramModels[this.state.selectedSequenceElement.diagramIndex]:null;e.innerHTML=['<button type="button" class="docdiagram-menu-toggle" aria-label="Document menu" aria-expanded="false" title="Document menu">\u2630</button>','<div class="docdiagram-menu" hidden>','<label class="docdiagram-theme-control">Theme<select class="docdiagram-theme-select">',`<option value="light"${this.state.documentTheme==="light"?" selected":""}>Light</option>`,`<option value="dark"${this.state.documentTheme==="dark"?" selected":""}>Dark</option>`,"</select></label>",'<label class="docdiagram-theme-control">Format<select class="docdiagram-format-select">',`<option value="centered"${this.state.documentFormat==="centered"?" selected":""}>Centered</option>`,`<option value="full-width"${this.state.documentFormat==="full-width"?" selected":""}>Full width</option>`,"</select></label>",'<button type="button" class="docdiagram-edit-source">Edit source</button>','<button type="button" class="docdiagram-save">Save As</button>','<button type="button" class="docdiagram-offline-save" disabled>Save for Offline (coming soon)</button>',"</div>",t&&a?.type==="flowchart"?`<div class="docdiagram-inspector" data-kind="node">${ar(a,t,this.state.documentColorScheme)}</div>`:o&&a?`<div class="docdiagram-inspector" data-kind="edge">${Rt(a,o)}</div>`:n&&a?`<div class="docdiagram-inspector" data-kind="sequence">${sr(a,this.state.selectedSequenceElement,n,this.state.documentColorScheme)}</div>`:""].join("");let i=e.querySelector(".docdiagram-menu-toggle"),s=e.querySelector(".docdiagram-menu");i?.addEventListener("click",()=>{if(!s)return;let d=s.hidden;s.hidden=!d,i.setAttribute("aria-expanded",String(d))}),e.querySelector(".docdiagram-save")?.addEventListener("click",()=>this.downloadDocument()),e.querySelector(".docdiagram-edit-source")?.addEventListener("click",()=>{this.closeDocumentMenu(),this.sourceEditor?.open()}),e.querySelector(".docdiagram-theme-select")?.addEventListener("change",d=>{this.setSource(Lt(this.getSource(),d.currentTarget.value)),this.renderDocument()}),e.querySelector(".docdiagram-format-select")?.addEventListener("change",d=>{this.state.documentFormat=d.currentTarget.value==="full-width"?"full-width":"centered",this.renderDocument()}),this.outputElement.before(e),t&&this.state.selectedNode?(dr(this,e,this.state.selectedNode.diagramIndex,this.state.selectedNode.nodeId),this.positionInspector(this.state.selectedNode.diagramIndex)):o&&this.state.selectedEdge?(cr(this,e,this.state.selectedEdge.diagramIndex,this.state.selectedEdge.edgeIndex),this.positionInspector(this.state.selectedEdge.diagramIndex)):n&&this.state.selectedSequenceElement&&(lr(this,e,n),this.positionInspector(this.state.selectedSequenceElement.diagramIndex)),this.wireChromeControls()}getSelectedNode(){let e=this.state.selectedNode,t=e?this.state.diagramModels[e.diagramIndex]:null;return e&&t?.type==="flowchart"&&Ee(this.state,e.diagramIndex)&&H(t,e.nodeId)?.node||null}getSelectedEdge(){let e=this.state.selectedEdge,t=e?this.state.diagramModels[e.diagramIndex]:null;return e&&t?.type==="flowchart"&&Ee(this.state,e.diagramIndex)&&t.edges[e.edgeIndex]||null}getSelectedSequenceElement(){let e=this.state.selectedSequenceElement,t=e?this.state.diagramModels[e.diagramIndex]:null;return!e||t?.type!=="sequence"||!Ee(this.state,e.diagramIndex)?null:e.kind==="participant"?t.participants?.find(o=>o.id===e.id)||null:e.kind==="message"?t.messages?.[e.index]||null:t.notes?.[e.index]||null}wireChromeControls(){if(this.outputElement){for(let e of this.outputElement.querySelectorAll(".docdiagram-zoom-in, .docdiagram-zoom-out"))e.addEventListener("click",()=>{let t=Number(e.dataset.diagramIndex),o=this.state.diagramZooms.get(t)||100,n=e.classList.contains("docdiagram-zoom-in")?25:-25;this.state.diagramZooms.set(t,Mt(o+n)),this.renderDocument()});for(let e of this.outputElement.querySelectorAll(".docdiagram-fit"))e.addEventListener("click",()=>{this.state.diagramZooms.set(Number(e.dataset.diagramIndex),100),this.renderDocument()});for(let e of this.outputElement.querySelectorAll(".docdiagram-start-editing"))e.addEventListener("click",()=>{let t=Number(e.closest(".docdiagram")?.getAttribute("data-diagram-index")),o=this.state.diagramModels[t];o&&(this.state.editSessionDiagram=ge(tt(o),this.state.documentColorScheme),this.state.editingDiagramIndex=t,we(this.state),this.renderDocument())});for(let e of this.outputElement.querySelectorAll(".docdiagram-done-editing"))e.addEventListener("click",()=>this.exitEditing(this.state.editingDiagramIndex,!1));for(let e of this.outputElement.querySelectorAll(".docdiagram-cancel-editing"))e.addEventListener("click",()=>this.exitEditing(this.state.editingDiagramIndex,!0));for(let e of this.outputElement.querySelectorAll(".docdiagram-create-node"))e.addEventListener("click",()=>this.createNewNode(Number(e.dataset.diagramIndex)))}}exitEditing(e,t){e!==null&&(t&&this.state.editSessionDiagram&&(this.state.diagramModels[e]=this.state.editSessionDiagram,this.persistDiagramModels()),this.state.editingDiagramIndex=null,this.state.editSessionDiagram=null,we(this.state),this.renderDocument())}createNewNode(e){let t=this.state.diagramModels[e];if(!t||t.type!=="flowchart")return;let o=Ft(t);this.state.selectedNode={diagramIndex:e,nodeId:o.id},this.state.selectedEdge=null,this.persistDiagramModels(),this.renderDocument()}positionInspector(e){if(!this.outputElement)return;let t=document.querySelector(".docdiagram-inspector"),o=this.outputElement.querySelector(`.docdiagram[data-diagram-index="${e}"]`);!t||!o||(t.style.top=`${Math.max(16,o.getBoundingClientRect().top)}px`)}applyPageTheme(e){document.documentElement.dataset.docdiagramTheme=e,document.body?.dataset&&(document.body.dataset.docdiagramTheme=e)}removeToolbarChrome(){if(this.outputElement)for(;this.outputElement.previousElementSibling?.classList.contains("docdiagram-toolbar");)this.outputElement.previousElementSibling.remove()}};var Pr=document.querySelector("#source"),Ir=document.querySelector("#rendered-document"),ur=new yt(Pr,Ir),Rr=globalThis;Rr.DocDiagramCore=ur.getCoreApi();ur.boot();})();
