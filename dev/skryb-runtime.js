"use strict";(()=>{var Ie=["flowchart","sequence"],ke=["rounded-rectangle","circle","oval","database","diamond","rhombus","flattened-hexagon","chevron","right-chevron","document"],Y=["top","right","bottom","left"],ve=["orthogonal","straight","curved"],B=["none","arrow","circle"],je={start:"none",end:"arrow"},Pt=["top","center"],zt=["left","center","right"],Ne={width:120,height:60},wt={width:140,height:84},C={shape:"rounded-rectangle",label:"New node",width:190,height:80},O={classic:{pink:{label:"Pink",light:{fill:"#F6C5D8",stroke:"#9D174D",text:"#9D174D"},dark:{fill:"#9D174D",stroke:"#FBCFE8",text:"#FBCFE8"}},red:{label:"Red",light:{fill:"#FECACA",stroke:"#B91C1C",text:"#B91C1C"},dark:{fill:"#B91C1C",stroke:"#FEE2E2",text:"#FEE2E2"}},orange:{label:"Orange",light:{fill:"#FED7AA",stroke:"#C2410C",text:"#9A3412"},dark:{fill:"#C2410C",stroke:"#FFEDD5",text:"#FFEDD5"}},yellow:{label:"Yellow",light:{fill:"#FEF08A",stroke:"#A16207",text:"#854D0E"},dark:{fill:"#A16207",stroke:"#FEF9C3",text:"#FEF9C3"}},green:{label:"Green",light:{fill:"#BBF7D0",stroke:"#15803D",text:"#166534"},dark:{fill:"#15803D",stroke:"#DCFCE7",text:"#DCFCE7"}},cyan:{label:"Cyan",light:{fill:"#A5F3FC",stroke:"#0E7490",text:"#155E75"},dark:{fill:"#0E7490",stroke:"#CFFAFE",text:"#CFFAFE"}},blue:{label:"Blue",light:{fill:"#BFDBFE",stroke:"#1D4ED8",text:"#1E3A8A"},dark:{fill:"#1D4ED8",stroke:"#DBEAFE",text:"#DBEAFE"}},purple:{label:"Purple",light:{fill:"#DDD6FE",stroke:"#6D28D9",text:"#5B21B6"},dark:{fill:"#6D28D9",stroke:"#EDE9FE",text:"#EDE9FE"}},grey:{label:"Grey",light:{fill:"#E5E7EB",stroke:"#4B5563",text:"#374151"},dark:{fill:"#4B5563",stroke:"#E5E7EB",text:"#F9FAFB"}},bw:{label:"Black and white",light:{fill:"#FFFFFF",stroke:"#111827",text:"#111827"},dark:{fill:"#111827",stroke:"#FFFFFF",text:"#FFFFFF"}}}},It=O.classic,oe={light:{edge:{stroke:"#52616B",strokeWidth:2,text:"#3E4A54"},node:{fill:"#EAF2FF",stroke:"#3574C7",strokeWidth:2,text:"#17202A"}},dark:{edge:{stroke:"#B8C7D5",strokeWidth:2,text:"#D9E4ED"},node:{fill:"#193A61",stroke:"#71AEF7",strokeWidth:2,text:"#F3F8FC"}}};var jt=["pink","red","orange","yellow","green","cyan","blue","purple","grey","bw"],Rt=["note","info","warning","success"],Ht={2:"repeat(2, minmax(0, 1fr))",3:"repeat(3, minmax(0, 1fr))","2fr 1fr":"minmax(0, 2fr) minmax(0, 1fr)","1fr 2fr":"minmax(0, 1fr) minmax(0, 2fr)"};var sr=["nodes","edges","participants","messages","activations","notes","groups"],dr=["id","label","shape","position","size","style","palette","subtitle","textVAlign","textHAlign","children"],cr=["source","target","sourceAnchor","targetAnchor","route","label","style","start","end"],Ot=["fill","stroke","strokeWidth","text"],lr=["stroke","strokeWidth","text"],Gt=["tone","colour"],ur=["id","label","kind","palette","style","size"],mr=["actor"],gr=["from","to","label","style"],hr=["solid","dashed"],pr=["participant","from","to"],fr=["at","after","label","palette","style","size"],br=["label","from","to"],xr=["width","height","participantSpacing","participantSize"];function x(r){return String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function De(r){let e=r.trim();if(e.startsWith('"')&&e.endsWith('"'))try{return JSON.parse(e)}catch{throw new Error(`Invalid quoted scalar: ${e}`)}if(e.startsWith("'")&&e.endsWith("'"))return e.slice(1,-1);if(/^-?\d+(\.\d+)?$/.test(e))return Number(e);if(e==="true"||e==="false")return e==="true";if(e.startsWith("{")&&e.endsWith("}")){let t=e.slice(1,-1).trim();if(!t)return{};let o=t.split(","),i={};for(let a of o){let n=a.indexOf(":");if(n===-1)throw new Error(`Invalid inline mapping: ${e}`);let s=a.slice(0,n).trim();i[s]=De(a.slice(n+1))}return i}return e}function me(r,e="classic"){let o=r.replace(/\r\n/g,`
`).split(`
`).filter(h=>h.trim()&&!h.trimStart().startsWith("#"));for(let h of o){if(h.trimStart()!==h||!h.trimEnd().endsWith(":"))continue;let m=h.trim().slice(0,-1);if(m!=="canvas"&&!sr.includes(m))throw new Error(`Unsupported diagram section: ${m}`)}let i=0,a=h=>h.length-h.trimStart().length,n=h=>h.trim().match(/^([^:]+):\s*(.*)$/),s=h=>h.trim().match(/^- ([^:]+):\s*(.*)$/),d=h=>i>=o.length||a(o[i])<=h?{}:o[i].trimStart().startsWith("- ")?l(a(o[i])):u(a(o[i])),u=h=>{let m={};for(;i<o.length&&a(o[i])===h;){let g=o[i],p=n(g);if(!p)throw new Error(`Cannot parse diagram line: ${g}`);i+=1,m[p[1]]=p[2]?De(p[2]):d(h)}return m},l=h=>{let m=[];for(;i<o.length&&a(o[i])===h;){let g=o[i],p=s(g);if(!p)throw new Error(`Cannot parse diagram line: ${g}`);i+=1;let S={[p[1]]:p[2]?De(p[2]):d(h)};for(;i<o.length&&a(o[i])>h;){let y=a(o[i]),k=n(o[i]);if(!k)throw new Error(`Cannot parse diagram line: ${o[i]}`);i+=1,S[k[1]]=k[2]?De(k[2]):d(y)}m.push(S)}return m},c=u(0);if(!c.type)throw new Error(`Diagram type is required and must be one of: ${Ie.join(", ")}.`);if(typeof c.type!="string"||!Ie.includes(c.type))throw new Error(`Unsupported diagram type: ${String(c.type)}`);return c.type==="flowchart"?yr(c,e):wr(c,e)}function yr(r,e="classic"){return r.canvas=r.canvas||{},Array.isArray(r.nodes)||(r.nodes=[]),Array.isArray(r.edges)||(r.edges=[]),Er(r,e),r}function wr(r,e="classic"){return Sr(r,e),r}function _(r,e,t){for(let o of Object.keys(r||{}))if(!e.includes(o))throw new Error(`Unsupported ${t} field: ${o}`)}function Et(r,e,t){if(r){for(let o of Object.keys(r))if(!e.includes(o))throw new Error(`Unsupported ${t} style field: ${o}`)}}function Er(r,e="classic"){if(r.participants!==void 0||r.messages!==void 0||r.activations!==void 0||r.notes!==void 0||r.groups!==void 0)throw new Error("Flowchart diagrams do not support sequence sections.");let t=new Set,o=n=>{if("type"in n)throw new Error(`Node "${n.id||"unknown"}" uses removed field "type".`);if(_(n,dr,`node "${n.id||"unknown"}"`),!n.id||!n.label)throw new Error("Every node requires an id and label.");if(!n.shape)throw new Error(`Node "${n.id}" requires a shape.`);if(!ke.includes(n.shape))throw new Error(`Unsupported node shape: ${n.shape}`);if(n.textVAlign!==void 0&&!Pt.includes(n.textVAlign))throw new Error(`Unsupported node textVAlign: ${n.textVAlign}`);if(n.textHAlign!==void 0&&!zt.includes(n.textHAlign))throw new Error(`Unsupported node textHAlign: ${n.textHAlign}`);if(n.palette&&(_(n.palette,Gt,`palette for node "${n.id}"`),!(O[e]?.[n.palette.colour]?.[n.palette.tone]||null)))throw new Error(`Unsupported node palette: ${n.palette.tone||"unknown"} ${n.palette.colour||"unknown"}`);if(n.style?.width!==void 0)throw new Error("Node style.width is not supported; use style.strokeWidth.");if(Et(n.style,Ot,`node "${n.id}"`),t.has(n.id))throw new Error(`Duplicate flowchart node id: ${n.id}`);if(t.add(n.id),n.children!==void 0&&!Array.isArray(n.children))throw new Error(`Children for node "${n.id}" must be a list.`);for(let s of n.children||[])o(s)};for(let n of r.nodes)o(n);for(let n of r.edges){if(_(n,cr,`edge "${n.source||"unknown"}" -> "${n.target||"unknown"}"`),!n.sourceAnchor)throw new Error(`Edge "${n.source||"unknown"}" -> "${n.target||"unknown"}" requires a sourceAnchor.`);if(!n.targetAnchor)throw new Error(`Edge "${n.source||"unknown"}" -> "${n.target||"unknown"}" requires a targetAnchor.`);if(!Y.includes(n.sourceAnchor))throw new Error(`Unsupported edge sourceAnchor: ${n.sourceAnchor}`);if(!Y.includes(n.targetAnchor))throw new Error(`Unsupported edge targetAnchor: ${n.targetAnchor}`);if(n.route!==void 0&&!ve.includes(n.route))throw new Error(`Unsupported edge route: ${n.route}`);if(n.start!==void 0&&!B.includes(n.start))throw new Error(`Unsupported edge start marker: ${n.start}`);if(n.end!==void 0&&!B.includes(n.end))throw new Error(`Unsupported edge end marker: ${n.end}`);if(n.style?.width!==void 0)throw new Error("Edge style.width is not supported; use style.strokeWidth.");Et(n.style,lr,`edge "${n.source||"unknown"}" -> "${n.target||"unknown"}"`)}let i=r.theme||"light";if(!oe[i])throw new Error(`Unsupported diagram theme: ${i}`)}function Sr(r,e="classic"){if(r.nodes!==void 0||r.edges!==void 0)throw new Error("Sequence diagrams do not support flowchart sections.");if(!Array.isArray(r.participants)||!Array.isArray(r.messages))throw new Error("Sequence diagrams require participants and messages sections.");if(r.activations!==void 0&&!Array.isArray(r.activations))throw new Error("Sequence diagram activations must be a list.");if(r.notes!==void 0&&!Array.isArray(r.notes))throw new Error("Sequence diagram notes must be a list.");if(r.groups!==void 0&&!Array.isArray(r.groups))throw new Error("Sequence diagram groups must be a list.");if(r.canvas!==void 0&&(typeof r.canvas!="object"||Array.isArray(r.canvas)))throw new Error("Sequence canvas must be a mapping.");_(r.canvas,xr,"sequence canvas");for(let a of["width","height","participantSpacing"]){let n=r.canvas?.[a];if(n!==void 0&&(!Number.isFinite(n)||Number(n)<=0))throw new Error(`Sequence canvas.${a} must be a positive number.`)}if(r.canvas?.participantSize!==void 0){if(typeof r.canvas.participantSize!="object"||Array.isArray(r.canvas.participantSize))throw new Error("Sequence canvas.participantSize must be a mapping.");_(r.canvas.participantSize,["width","height"],"sequence canvas participantSize");for(let a of["width","height"]){let n=r.canvas.participantSize[a];if(n!==void 0&&(!Number.isFinite(n)||Number(n)<=0))throw new Error(`Sequence canvas.participantSize.${a} must be a positive number.`)}}let t=new Set;for(let a of r.participants){if(_(a,ur,`participant "${a.id||"unknown"}"`),!a.id||!a.label)throw new Error("Every sequence participant requires an id and label.");if(a.kind!==void 0&&!mr.includes(a.kind))throw new Error(`Unsupported sequence participant kind: ${a.kind}`);if(Bt(a,`participant "${a.id}"`,e),t.has(a.id))throw new Error(`Duplicate sequence participant id: ${a.id}`);t.add(a.id)}for(let[a,n]of r.messages.entries()){if(_(n,gr,`message ${a}`),!n.from||!n.to||!n.label)throw new Error(`Sequence message ${a} requires from, to, and label.`);if(!t.has(n.from)||!t.has(n.to))throw new Error(`Sequence message ${a} references an unknown participant.`);if(n.style!==void 0&&!hr.includes(n.style))throw new Error(`Unsupported sequence message style: ${n.style}`)}for(let[a,n]of(r.activations||[]).entries()){if(_(n,pr,`activation ${a}`),!n.participant||!Number.isInteger(n.from)||!Number.isInteger(n.to))throw new Error(`Sequence activation ${a} requires participant and integer from and to message positions.`);if(!t.has(n.participant))throw new Error(`Sequence activation ${a} references an unknown participant.`);if(n.from<1||n.to<n.from||n.to>r.messages.length)throw new Error(`Sequence activation ${a} range is out of bounds.`)}for(let[a,n]of(r.notes||[]).entries()){_(n,fr,`note ${a}`);let s=n.after;if(!n.at||!Number.isInteger(s)||!n.label)throw new Error(`Sequence note ${a} requires at, after, and label.`);if(Bt(n,`note ${a}`,e),!t.has(n.at))throw new Error(`Sequence note ${a} references an unknown participant.`);if(s<0||s>r.messages.length)throw new Error(`Sequence note ${a} after position is out of bounds.`)}for(let[a,n]of(r.groups||[]).entries()){if(_(n,br,`group ${a}`),!n.label&&n.label!=="")throw new Error(`Sequence group ${a} requires a label.`);if(!Number.isInteger(n.from)||!Number.isInteger(n.to))throw new Error(`Sequence group ${a} requires integer from and to indices.`);if(n.from<1||n.to<n.from||n.to>r.messages.length)throw new Error(`Sequence group ${a} range is out of bounds.`)}let o=r.theme||"light";if(!oe[o])throw new Error(`Unsupported diagram theme: ${o}`)}function Bt(r,e,t="classic"){if(r.palette&&(_(r.palette,Gt,`palette for ${e}`),!O[t]?.[String(r.palette.colour)]?.[String(r.palette.tone)]))throw new Error(`Unsupported ${e} palette: ${String(r.palette.tone||"unknown")} ${String(r.palette.colour||"unknown")}`);if(Et(r.style,Ot,e),r.size){_(r.size,["width","height"],`size for ${e}`);for(let o of["width","height"]){let i=r.size[o];if(i!==void 0&&(!Number.isFinite(i)||Number(i)<=0))throw new Error(`${e} size.${o} must be a positive number.`)}}}function ge(r){return typeof r=="number"||typeof r=="boolean"?String(r):r&&typeof r=="object"?Object.keys(r).length?`{ ${Object.entries(r).map(([e,t])=>`${e}: ${ge(t)}`).join(", ")} }`:"{}":/^[\w./-]+(?: [\w./-]+)*$/.test(String(r))?String(r):JSON.stringify(String(r))}function de(r,e=2){let t=Object.entries(r),[o,i]=t[0],a=[`${" ".repeat(e)}- ${o}: ${ge(i)}`];for(let[n,s]of t.slice(1))if(!(n==="children"&&Array.isArray(s)&&!s.length))if(n==="children"&&Array.isArray(s)){a.push(`${" ".repeat(e+2)}children:`);for(let d of s)a.push(...de(d,e+4))}else a.push(`${" ".repeat(e+2)}${n}: ${ge(s)}`);return a}function Qe(r){let e=[`type: ${ge(r.type)}`];for(let[t,o]of Object.entries(r))t==="type"||t==="canvas"||t==="nodes"||t==="edges"||t==="participants"||t==="messages"||t==="activations"||t==="notes"||t==="groups"||e.push(`${t}: ${ge(o)}`);if(r.type==="sequence"){if(r.canvas!==void 0){e.push("canvas:");for(let[t,o]of Object.entries(r.canvas))e.push(`  ${t}: ${ge(o)}`)}e.push("participants:");for(let t of r.participants||[])e.push(...de(t));e.push("messages:");for(let t of r.messages||[])e.push(...de(t));if(r.activations!==void 0){e.push("activations:");for(let t of r.activations||[])e.push(...de(t))}if(r.notes!==void 0){e.push("notes:");for(let t of r.notes||[])e.push(...de(t))}if(r.groups!==void 0){e.push("groups:");for(let t of r.groups||[])e.push(...de(t))}return e.join(`
`)}e.push("canvas:");for(let[t,o]of Object.entries(r.canvas||{}))e.push(`  ${t}: ${ge(o)}`);e.push("nodes:");for(let t of r.nodes||[])e.push(...de(t));e.push("edges:");for(let t of r.edges||[])e.push(...de(t));return e.join(`
`)}function Vt(r){return{width:Number(r.size?.width)||C.width,height:Number(r.size?.height)||C.height}}function G(r){let e=[],t=(o,i,a,n)=>{for(let s of o){let d={x:a.x+(Number(s.position?.x)||0),y:a.y+(Number(s.position?.y)||0)};e.push({node:s,parent:i,siblings:o,position:d,depth:n}),t(s.children||[],s,d,n+1)}};return t(r.nodes,null,{x:0,y:0},0),e}function I(r,e){return G(r).find(t=>t.node.id===e)||null}function $r(r,e){return G(r).find(t=>t.node===e)?.position||{x:0,y:0}}function W(r,e){return{...$r(r,e),...Vt(e)}}function Ut(r,e){return(e.children||[]).some(t=>t===r||Ut(r,t))}function et(r,e){var h;let t=I(r,e);if(!t)return null;let{node:o,siblings:i,position:a}=t,{width:n,height:s}=Vt(o),d={x:a.x+n/2,y:a.y+s/2},l=G(r).filter(m=>m.node!==o&&!Ut(m.node,o)).filter(m=>{let g=W(r,m.node);return d.x>=g.x&&d.x<=g.x+g.width&&d.y>=g.y&&d.y<=g.y+g.height}).reduce((m,g)=>!m||g.depth>=m.depth?g:m,null),c=l?(h=l.node).children||(h.children=[]):r.nodes;return i===c||(i.splice(i.indexOf(o),1),o.position={x:a.x-(l?.position.x||0),y:a.y-(l?.position.y||0)},c.push(o)),o}function pe(r,e="light"){let t=r.theme||e,o=oe[t];if(!o)throw new Error(`Unsupported diagram theme: ${t}`);return o}function Fe(r,e,t){return O[r]?.[t]?.[e]||null}function he(r,e){return{...r,...e||{}}}function ce(r,e,t="light",o="classic"){let a=pe(r,t).node,n=e.palette?Fe(o,e.palette.tone,e.palette.colour):null;return he(he(a,n),e.style)}function Me(r,e,t="light",o="classic"){let i=pe(r,t),a=e.palette?Fe(o,e.palette.tone,e.palette.colour):null;return he(he(i.node,a),e.style)}function Te(r,e,t="light"){let o=pe(r,t);return he(o.edge,e.style)}function Re(r,e){let t=e==="start"?r.start:r.end;return typeof t=="string"&&B.includes(t)?t:je[e]}function Q(r){let e=Number(r.canvas?.grid);return Number.isFinite(e)&&e>0?e:0}function ne(r,e){return e?Math.round(r/e)*e:Math.round(r)}function fe(r,e,t){let o=ne(r,t),i=t?Math.ceil(e/t)*t:e;return Math.max(i,o)}function Yt(r){return{x:Number(r.position?.x)||0,y:Number(r.position?.y)||0,width:Number(r.size?.width)||C.width,height:Number(r.size?.height)||C.height}}function He(r,e,t=40){let o=Number(r.canvas?.width)||1e3,i=Number(r.canvas?.height)||560,a=new Set(G(r).map(g=>g.node)),n=[...a];n.includes(e)||n.push(e);let s=g=>a.has(g)?W(r,g):Yt(g),d=n.map(s),u=Math.min(0,...d.map(g=>g.x)),l=Math.min(0,...d.map(g=>g.y)),c=u<0?t-u:0,h=l<0?t-l:0;if(c||h)for(let g of G(r).filter(p=>p.parent===null)){let p=g.node;p.position={...p.position,x:(Number(p.position?.x)||0)+c,y:(Number(p.position?.y)||0)+h}}let m=n.map(s);return r.canvas={...r.canvas,width:Math.max(o+c,...m.map(g=>g.x+g.width+t)),height:Math.max(i+h,...m.map(g=>g.y+g.height+t))},r}function kr(r,e){return r.x<e.x+e.width&&r.x+r.width>e.x&&r.y<e.y+e.height&&r.y+r.height>e.y}function St(r,e="new-node"){let t=a=>a.flatMap(n=>[n.id,...t(n.children||[])]),o=new Set(t(r));if(!o.has(e))return e;let i=2;for(;o.has(`${e}-${i}`);)i+=1;return`${e}-${i}`}function $t(r){let e=Number(r.canvas?.width)||1e3,t=Number(r.canvas?.height)||560,o=Q(r),i={x:ne(Math.max(0,(e-C.width)/2),o),y:ne(Math.max(0,(t-C.height)/2),o)},a=o||20;for(let n=0;n<=Math.max(e,t);n+=a)for(let s of[{x:i.x+n,y:i.y},{x:i.x-n,y:i.y},{x:i.x,y:i.y+n},{x:i.x,y:i.y-n}])if(!(s.x<0||s.y<0||s.x+C.width>e||s.y+C.height>t)&&!G(r).some(({node:d})=>kr({...s,width:C.width,height:C.height},Yt(d))))return s;return i}function kt(r){let e={id:St(r.nodes),label:C.label,shape:C.shape,position:$t(r),size:{width:C.width,height:C.height}};return r.nodes.push(e),e}function tt(r,e,t,o,i){let a={source:e,target:o,sourceAnchor:t,targetAnchor:i,route:"orthogonal",end:"arrow"};return r.edges.push(a),a}function rt(r,e,t,o){return e==="source"?(r.source=t,r.sourceAnchor=o):(r.target=t,r.targetAnchor=o),r}function ot(r,e){return e<0||e>=r.edges.length?null:r.edges.splice(e,1)[0]}function nt(r,e){let t=I(r,e);if(!t)return{node:null,deletedEdges:[]};let o=new Set([t.node,...t.node.children||[]].flatMap(function a(n){return[n,...(n.children||[]).flatMap(a)]}).map(a=>a.id)),i=r.edges.filter(a=>o.has(a.source)||o.has(a.target));return t.siblings.splice(t.siblings.indexOf(t.node),1),r.edges=r.edges.filter(a=>!o.has(a.source)&&!o.has(a.target)),{node:e,deletedEdges:i}}function qe(r,e){return r.label=String(e).trim()||r.label,r}function it(r,e){return r.shape=e,r}function at(r,e){return r.subtitle=String(e??"").trim(),r}function Be(r,e,t){return e==="textVAlign"&&(t==="top"||t==="center")&&(r.textVAlign=t),e==="textHAlign"&&(t==="left"||t==="center"||t==="right")&&(r.textHAlign=t),r}function be(r,e,t){return r.style={...r.style,[e]:t},r}function Oe(r,e,t,o="classic"){if(!Fe(o,e,t))return r;let{fill:a,stroke:n,text:s,...d}=r.style||{};return Object.keys(d).length?r.style=d:delete r.style,r.palette={tone:e,colour:t},r}function vr(r){return r==="document"?wt:Ne}function Ge(r,e,t,o){let i=Q(r),a=vr(e.shape),n=t==="width"?a.width:a.height,s=fe(Number(o)||n,n,i);return e.size=e.shape==="circle"?{...e.size,width:s,height:s}:{...e.size,[t]:s},e}function Ae(r,e){return r.label=String(e).trim(),r}function st(r,e){return r.route=e,r}function Ve(r,e,t){return e==="source"?r.sourceAnchor=t:r.targetAnchor=t,r}function Ue(r,e,t){return r.style={...r.style,[e]:t},r}function Ye(r,e){let t=Math.max(1,Math.round(Number(e))||1);return r.style={...r.style,strokeWidth:t},r}function dt(r,e){return r.start=B.includes(e)?e:je.start,r}function ct(r,e){return r.end=B.includes(e)?e:je.end,r}function vt(r){return Math.max(25,Number(r)||100)}function ie(r){return String(r??"").replace(/\r\n/g,`
`).split(`
`)}function ee(r,e,t,o,i,a,n="middle"){if(!t.length)return"";let s=t.map((d,u)=>{let l=u===0?"":` dy="${o}"`;return`<tspan x="${r}"${l}>${x(d)||" "}</tspan>`}).join("");return`<text x="${r}" y="${e}" text-anchor="${n}" class="${i}" fill="${x(a)}">${s}</text>`}function ae(r,e,t,o,i){let a=r.shape,n=e+o/2,s=t+i/2,d={x:e+12,y:t+12,width:o-24,height:i-24},u={top:{x:n,y:t},right:{x:e+o,y:s},bottom:{x:n,y:t+i},left:{x:e,y:s}},l;if(a==="circle"){let c=Math.min(o,i),h=n-c/2,m=s-c/2,g=c/2;d.x=h+g*.3,d.y=m+g*.3,d.width=g*1.4,d.height=g*1.4,u.top.y=m,u.right.x=h+c,u.bottom.y=m+c,u.left.x=h,l=`<circle class="docdiagram-node-body" cx="${n}" cy="${s}" r="${g}"/>`}else if(a==="oval")d.x+=o*.1,d.width-=o*.2,l=`<ellipse class="docdiagram-node-body" cx="${n}" cy="${s}" rx="${o/2}" ry="${i/2}"/>`;else if(a==="database"){let c=Math.min(i*.22,18);d.y+=c/2,d.height-=c,l=`<path class="docdiagram-node-body" d="M ${e} ${t+c} C ${e} ${t-c/3} ${e+o} ${t-c/3} ${e+o} ${t+c} V ${t+i-c} C ${e+o} ${t+i+c/3} ${e} ${t+i+c/3} ${e} ${t+i-c} Z"/><path class="docdiagram-node-detail" d="M ${e} ${t+c} C ${e} ${t+c*2.3} ${e+o} ${t+c*2.3} ${e+o} ${t+c}" fill="none"/>`}else if(a==="diamond")d.x+=o*.25,d.y+=i*.25,d.width-=o*.5,d.height-=i*.5,u.top={x:n,y:t},u.right={x:e+o,y:s},u.bottom={x:n,y:t+i},u.left={x:e,y:s},l=`<polygon class="docdiagram-node-body" points="${n},${t} ${e+o},${s} ${n},${t+i} ${e},${s}"/>`;else if(a==="rhombus"){let c=Math.min(o*.2,i*.6);d.x+=c,d.width-=c*2,u.left.x=e+c/2,u.right.x=e+o-c/2,l=`<polygon class="docdiagram-node-body" points="${e+c},${t} ${e+o},${t} ${e+o-c},${t+i} ${e},${t+i}"/>`}else if(a==="flattened-hexagon"){let c=Math.min(o*.18,i*.7);d.x+=c,d.width-=c*2,l=`<polygon class="docdiagram-node-body" points="${e+c},${t} ${e+o-c},${t} ${e+o},${s} ${e+o-c},${t+i} ${e+c},${t+i} ${e},${s}"/>`}else if(a==="chevron"){let c=Math.min(o*.16,i*.45);d.x+=c*1.175,d.width-=c*1.35,u.left.x=e+c,l=`<polygon class="docdiagram-node-body" points="${e},${t} ${e+o-c},${t} ${e+o},${s} ${e+o-c},${t+i} ${e},${t+i} ${e+c},${s}"/>`}else if(a==="right-chevron"){let c=Math.min(o*.16,i*.45);d.width-=c,l=`<polygon class="docdiagram-node-body" points="${e},${t} ${e+o-c},${t} ${e+o},${s} ${e+o-c},${t+i} ${e},${t+i}"/>`}else if(a==="document"){let c=Math.max(12,Math.min(26,Math.min(o,i)*.18));d.width-=c*.45,d.y+=2,d.height-=2,l=`<path class="docdiagram-node-body" d="M ${e} ${t} H ${e+o-c} L ${e+o} ${t+c} V ${t+i} H ${e} Z M ${e+o-c} ${t} V ${t+c} H ${e+o}"/>`}else l=`<rect class="docdiagram-node-body" x="${e}" y="${t}" width="${o}" height="${i}" rx="12"/>`;return{bodyMarkup:l,textBounds:d,anchors:u}}function Le(r,e,t,o,i){let a,n;typeof r=="number"?(a={x:r,y:e,width:t||0,height:o||0},n=i):(a=r,n=e);let s=20,d=15,u=ie(n.label),l=n.subtitle?ie(n.subtitle):[],c=l.length?6:0,h=u.length*s,m=l.length*d,g=h+c+m,p=n.textHAlign||"center",S=p==="left"?a.x:p==="right"?a.x+a.width:a.x+a.width/2,y=p==="left"?"start":p==="right"?"end":"middle",k=a.y+a.height/2,N=n.textVAlign==="top"?a.y:k-g/2;return{centerX:S,textAnchor:y,labelLines:u,subtitleLines:l,labelLineHeight:s,subtitleLineHeight:d,labelStartY:N+s*.72,subtitleStartY:N+h+c+d*.72}}function Ce(r,e,t){return r.bodyMarkup.replace("/>",` fill="${x(e.fill||"")}" stroke="${x(e.stroke||"")}" stroke-width="${t}"/>`).replace('class="docdiagram-node-detail"',`class="docdiagram-node-detail" stroke="${x(e.stroke||"")}" stroke-width="${t}"`)}function _t(r){return{top:{x:0,y:-1},right:{x:1,y:0},bottom:{x:0,y:1},left:{x:-1,y:0}}[r]}function le(r){return`${r.x} ${r.y}`}function Nr(r){let e=r.slice(1).map((i,a)=>{let n=r[a];return{start:n,end:i,length:Math.hypot(i.x-n.x,i.y-n.y)}}),o=e.reduce((i,a)=>i+a.length,0)/2;for(let i of e){if(o<=i.length||i===e[e.length-1]){let a=i.length?o/i.length:0;return{x:i.start.x+(i.end.x-i.start.x)*a,y:i.start.y+(i.end.y-i.start.y)*a}}o-=i.length}return r[0]}function xe(r,e,t,o,i="orthogonal"){let a=_t(t),n=_t(o),s=a.x!==0,d,u,l,c;if(i==="straight")d=`M ${le(r)} L ${le(e)}`,u={x:(r.x+e.x)/2,y:(r.y+e.y)/2},l={x:e.x-r.x,y:e.y-r.y},c=l;else if(i==="curved"){let h=Math.max(Math.abs(e.x-r.x),Math.abs(e.y-r.y),80),m=Math.min(h/2,140),g={x:r.x+a.x*m,y:r.y+a.y*m},p={x:e.x+n.x*m,y:e.y+n.y*m};d=`M ${le(r)} C ${le(g)} ${le(p)} ${le(e)}`,u={x:(r.x+3*g.x+3*p.x+e.x)/8,y:(r.y+3*g.y+3*p.y+e.y)/8},l={x:g.x-r.x,y:g.y-r.y},c={x:e.x-p.x,y:e.y-p.y}}else{let m={x:r.x+a.x*40,y:r.y+a.y*40},g={x:e.x+n.x*40,y:e.y+n.y*40},p=s?{x:g.x,y:m.y}:{x:m.x,y:g.y},S=[r,m,p,g,e],y=S.filter((N,b)=>b===0||N.x!==S[b-1].x||N.y!==S[b-1].y);y.length===1&&(y=[r,{x:r.x+a.x*40,y:r.y+a.y*40},e]),d=`M ${le(y[0])}${y.slice(1).map(N=>` L ${le(N)}`).join("")}`,u=Nr(y),l={x:y[1].x-y[0].x,y:y[1].y-y[0].y};let k=y.slice(-2);c={x:k[1].x-k[0].x,y:k[1].y-k[0].y}}return{path:d,midpoint:u,startTangent:l,endTangent:c,hitPath:d}}function Nt(r){let e=Math.max(1,Number(r)||2),t=6+e*2.5,o=Math.max(t*.38,e/2+1);return{size:t,circleRadius:o}}function _e(r,e,t,o,i){let a=x(o),{size:n,circleRadius:s}=Nt(i),d=n/2;return e==="arrow"?`<marker id="${r}" markerWidth="${n}" markerHeight="${n}" refX="${n}" refY="${d}" markerUnits="userSpaceOnUse" orient="${t==="start"?"auto-start-reverse":"auto"}"><path fill="${a}" stroke="${a}" d="M 0 0 L ${n} ${d} L 0 ${n} z"/></marker>`:e==="circle"?`<marker id="${r}" markerWidth="${n}" markerHeight="${n}" refX="${d}" refY="${d}" markerUnits="userSpaceOnUse"><circle cx="${d}" cy="${d}" r="${s}" fill="${a}" stroke="${a}"/></marker>`:""}function Dt(r){let e=r.replace(/\r\n/g,`
`).split(`
`),t=e.findIndex(a=>a.trim()!=="");if(t===-1||e[t]!=="---")return{content:r,frontmatter:{}};let o=e.indexOf("---",t+1);if(o===-1)return{content:r,frontmatter:{}};let i={};for(let a of e.slice(t+1,o)){if(!a.trim()||a.trimStart().startsWith("#"))continue;let n=a.match(/^([^:]+):\s*(.*)$/);if(!n)throw new Error(`Cannot parse document frontmatter line: ${a}`);i[n[1]]=De(n[2])}return{content:e.slice(o+1).join(`
`),frontmatter:i}}function lt(r){let e=Dt(r),t=String(e.frontmatter.theme||"light"),o=String(e.frontmatter.colourScheme||"classic");if(!oe[t])throw new Error(`Unsupported document theme: ${t}`);if(!O[o])throw new Error(`Unsupported document colour scheme: ${o}`);return{...e,theme:t,colourScheme:o}}function Ft(r){let e=lt(r),t=e.content.replace(/\r\n/g,`
`).split(`
`),o=0;for(;o<t.length;){let a=t[o].replace(/^(?: {0,3}> ?)+/,"").match(/^```([\w-]*)\s*$/);if(!a){o+=1;continue}let n=t.slice(o+1).findIndex(d=>/^```\s*$/.test(d.replace(/^(?: {0,3}> ?)+/,"")));if(n===-1)throw new Error("Unclosed code block.");let s=o+n+1;if(a[1]==="diagram"){let d=t.slice(o+1,s).map(u=>u.replace(/^(?: {0,3}> ?)+/,"")).join(`
`);me(d,e.colourScheme)}o=s+1}return e}function Mt(r,e){let t=r.replace(/\r\n/g,`
`),o=t.split(`
`),i=o.findIndex(u=>u.trim()!==""),a=i!==-1&&o[i]==="---",n=a?o.indexOf("---",i+1):-1;if(!a||n===-1)return`---
theme: ${e}
---
${t}`;let s=!1,d=o.slice(i+1,n).map(u=>{if(!u.trim()||u.trimStart().startsWith("#"))return u;let l=u.match(/^([^:]+):\s*(.*)$/);return l&&l[1]==="theme"?(s=!0,`theme: ${e}`):u});return s||d.push(`theme: ${e}`),[...o.slice(0,i+1),...d,...o.slice(n)].join(`
`)}function ut(r,e){let t=e.trim(),o=t?r.indexOf(t):-1;return o===-1?null:{start:o,end:o+t.length}}function mt(r,e){let t=Number.parseFloat(globalThis.getComputedStyle(r).lineHeight)||20,o=r.value.slice(0,e.start).split(`
`).length-1,i=Math.max(1,Math.floor(r.clientHeight/t));r.scrollTop=Math.max(0,(o-Math.floor(i/2))*t)}function Tt(r){let e=[],t="",o=!1,i=r.trim().replace(/^\||\|$/g,"");for(let a of i)o?(t+=a,o=!1):a==="\\"?o=!0:a==="|"?(e.push(t.trim()),t=""):t+=a;return e.push(t.trim()),e}function Wt(r){let e=Tt(r);return!e.length||!e.every(t=>/^:?-{3,}:?$/.test(t))?null:e.map(t=>t.startsWith(":")&&t.endsWith(":")?"center":t.startsWith(":")?"left":t.endsWith(":")?"right":"")}function ye(r){return r.match(/^(\s*)([-+*]|\d+[.)])\s+(.+)$/)}function qt(r){let e=r.match(/^:::(section|panel|callout|grid|stack)(?:\s+\{(.*)\})?\s*$/);if(!e)return null;let t={},o=e[2];if(o!==void 0){let i=0,a=/\s*([a-z][\w-]*)=(?:"([^"]*)"|([^\s}]+))/gi,n;for(;n=a.exec(o);){if(n.index!==i||t[n[1]]!==void 0)return null;t[n[1]]=n[2]??n[3],i=a.lastIndex}if(o.slice(i).trim())return null}return{name:e[1],attributes:t}}function Dr(r){return/^:::(?:\s+.*)?$/.test(r)}function Fr(r,e,t){let o=1,i=!1;for(let a=e+1;a<t;a+=1){if(/^```/.test(r[a])){i=!i;continue}if(!i){if(qt(r[a]))o+=1;else if(Dr(r[a])&&(o-=1,!o))return a}}return-1}function Mr(r){return/^#[\da-f]{3,8}$/i.test(r)}function Tr(r,e="classic"){let t=r.tone!==void 0||r.colour!==void 0;if(t&&(!["light","dark"].includes(r.tone)||!jt.includes(r.colour)))return null;for(let n of["fill","stroke","text"])if(r[n]!==void 0&&!Mr(r[n]))return null;let o=t?Fe(e,r.tone,r.colour):null,i=Object.fromEntries(["fill","stroke","text"].filter(n=>r[n]!==void 0).map(n=>[n,r[n]])),a=he(o||{},i);return Object.entries(a).filter(([,n])=>n!==void 0).map(([n,s])=>`--docdiagram-component-${n}:${s}`).join(";")}function gt(r,e=!1){let t=String(r).trim();if(t.startsWith("//")||t.startsWith("\\"))return!1;if(!t||t.startsWith("#")||t.startsWith("/")||t.startsWith("./")||t.startsWith("../")||t.startsWith("?")||e&&/^data:image\/(?:gif|jpeg|png|webp);base64,/i.test(t))return!0;let o=t.match(/^([a-z][a-z\d+.-]*):/i);return!o||["http","https","mailto"].includes(o[1].toLowerCase())}function ue(r){let e=[],t=String(r).replace(/`([^`]+)`/g,(o,i)=>{let a=`\0${e.length}\0`;return e.push(`<code>${x(i)}</code>`),a});return t=x(t),t=t.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,(o,i,a)=>{let n=a.replace(/&amp;/g,"&");return gt(n,!0)?`<img src="${x(n)}" alt="${i}">`:`![${i}](${x(a)})`}),t=t.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,(o,i,a)=>{let n=a.replace(/&amp;/g,"&");return gt(n)?`<a href="${x(n)}">${i}</a>`:`[${i}](${x(a)})`}),t=t.replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g,"<strong>$2</strong>").replace(/~~(?=\S)([\s\S]*?\S)~~/g,"<del>$1</del>").replace(/(?<!\*)\*(?=\S)([\s\S]*?\S)\*(?!\*)/g,"<em>$1</em>").replace(/(?<!_)_(?=\S)([\s\S]*?\S)_(?!_)/g,"<em>$1</em>"),t.replace(/\u0000(\d+)\u0000/g,(o,i)=>e[Number(i)])}function At(r,e={diagramIndex:0},t){let o=r.replace(/\r\n/g,`
`).split(`
`),i=t?.renderDiagram??((l,c)=>{throw new Error("renderDiagram callback is required for diagram blocks.")}),a=t?.documentColorScheme||"classic";function n(l){let c=o[l]||"";return!c.trim()||/^```/.test(c)||/^(#{1,6})\s+/.test(c)||/^ {0,3}&gt;|^ {0,3}>/.test(c)||/^ {0,3}(?:[-*_]\s*){3,}$/.test(c)||/^:::/.test(c)||!!ye(c)||l+1<o.length&&!!Wt(o[l+1])}function s(l,c){let h=ye(o[l]),m=/^\d/.test(h[2]),g=[],p=l,S=m?Number.parseInt(h[2],10):null;for(;p<o.length;){let b=ye(o[p]);if(!b||b[1].length!==c||/^\d/.test(b[2])!==m)break;let w={content:[b[3]],children:[]};for(p+=1;p<o.length;){let v=ye(o[p]);if(v&&v[1].length>c){let $=s(p,v[1].length);w.children.push($.html),p=$.index;continue}if(!o[p].trim()){p+=1;let $=p<o.length?ye(o[p]):null;if(p>=o.length||!$||$[1].length<=c)break;continue}if(/^\s+/.test(o[p])&&!ye(o[p])){w.content.push(o[p].trim()),p+=1;continue}break}g.push(w)}let y=m?"ol":"ul",k=m&&S!==1?` start="${S}"`:"",N=g.map(b=>{let w=!m&&b.content.length===1&&b.content[0].match(/^\[([ xX])\]\s+(.*)$/),v=w?`<input type="checkbox" disabled${w[1].toLowerCase()==="x"?" checked":""}> ${ue(w[2])}`:ue(b.content.join(" "));return`<li${w?' class="docdiagram-task-list-item"':""}>${v}${b.children.join("")}</li>`}).join("");return{html:`<${y}${k}>${N}</${y}>`,index:p}}function d(l,c){let h=qt(o[l]),m=h?Fr(o,l,c):-1;if(!h||m===-1)return null;let{name:g,attributes:p}=h,S={section:["title","tone","colour","fill","stroke","text"],panel:["title","tone","colour","fill","stroke","text"],callout:["kind","title","tone","colour","fill","stroke","text"],grid:["columns"],stack:[]};if(Object.keys(p).some(w=>!S[g].includes(w)))return null;if(g==="grid"){let w=Ht[p.columns];if(!w)return null;let v=[],$=l+1;for(;$<m;){if(!o[$].trim()){$+=1;continue}let q=qt(o[$]);if(!q||!["panel","callout","stack"].includes(q.name))return null;let j=d($,m);if(!j)return null;v.push(`<div class="docdiagram-grid-item">${j.html}</div>`),$=j.next}return{html:`<div class="docdiagram-grid" style="--docdiagram-grid-columns:${w}">${v.join("")}</div>`,next:m+1}}if(g==="stack")return Object.keys(p).length?null:{html:`<div class="docdiagram-stack">${u(l+1,m)}</div>`,next:m+1};let y=Tr(p,a);if(y===null||g==="callout"&&p.kind!==void 0&&!Rt.includes(p.kind))return null;let k=p.title?`<div class="docdiagram-component-title">${ue(p.title)}</div>`:"",N=u(l+1,m),b=`docdiagram-component${g==="callout"?"":` docdiagram-${g}`}${y?" docdiagram-component-styled":""}`;if(g==="callout"){let w=p.kind||"info";return{html:`<aside class="${b} docdiagram-callout docdiagram-callout-${w}"${y?` style="${y}"`:""} aria-label="${x(p.title||w)} callout"><div class="docdiagram-callout-kind">${x(w)}</div>${k}${N}</aside>`,next:m+1}}return{html:`<section class="${b}"${y?` style="${y}"`:""}>${k}${N}</section>`,next:m+1}}function u(l=0,c=o.length){let h=[],m=l;for(;m<c;){let g=o[m];if(!g.trim()){m+=1;continue}if(/^:::/.test(g)){let b=d(m,c);b?(h.push(b.html),m=b.next):(h.push(`<pre class="docdiagram-literal-source"><code>${x(g)}</code></pre>`),m+=1);continue}let p=g.match(/^```([\w-]*)\s*$/);if(p){let b=o.slice(m+1,c).findIndex($=>/^```\s*$/.test($));if(b===-1){h.push('<section class="docdiagram-error"><strong>Unclosed code block.</strong></section>');break}let w=m+b+1,v=o.slice(m+1,w).join(`
`);if(p[1]==="diagram")h.push(i(v,e.diagramIndex)),e.diagramIndex+=1;else{let $=p[1]?` class="language-${x(p[1])}"`:"";h.push(`<pre><code${$}>${x(v)}</code></pre>`)}m=w+1;continue}let S=g.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);if(S){h.push(`<h${S[1].length}>${ue(S[2])}</h${S[1].length}>`),m+=1;continue}if(/^ {0,3}(?:[-*_]\s*){3,}$/.test(g)){h.push("<hr>"),m+=1;continue}if(/^ {0,3}>/.test(g)){let b=[];for(;m<c&&/^ {0,3}>/.test(o[m]);)b.push(o[m].replace(/^ {0,3}> ?/,"")),m+=1;h.push(`<blockquote>${At(b.join(`
`),e,t)}</blockquote>`);continue}let y=ye(g);if(y){let b=s(m,y[1].length);h.push(b.html),m=b.index;continue}let k=m+1<c?Wt(o[m+1]):null;if(k){let b=Tt(g),w=[];for(m+=2;m<c&&o[m].includes("|")&&o[m].trim();)w.push(Tt(o[m])),m+=1;let v=($,q)=>q.map((j,V)=>`<${$}${k[V]?` style="text-align:${k[V]}"`:""}>${ue(j||"")}</${$}>`).join("");h.push(`<table><thead><tr>${v("th",b)}</tr></thead><tbody>${w.map($=>`<tr>${v("td",$)}</tr>`).join("")}</tbody></table>`);continue}let N=[g.trim()];for(m+=1;m<c&&!n(m);)N.push(o[m].trim()),m+=1;h.push(`<p>${ue(N.join(" "))}</p>`)}return h.join("")}return u()}function Lt(r,e,t){let o=e!=="none",i=e==="flowchart";return['<div class="docdiagram-diagram-toolbar" role="toolbar" aria-label="Diagram controls">',`<button type="button" class="docdiagram-icon-button docdiagram-zoom-in" data-diagram-index="${r}" aria-label="Zoom in" title="Zoom in">+</button>`,`<button type="button" class="docdiagram-icon-button docdiagram-zoom-out" data-diagram-index="${r}" aria-label="Zoom out" title="Zoom out">\u2212</button>`,`<button type="button" class="docdiagram-icon-button docdiagram-fit" data-diagram-index="${r}" aria-label="Zoom to fit" title="Zoom to fit">\u22A1</button>`,o?t.editingDiagramIndex===r?`<button type="button" class="docdiagram-icon-button docdiagram-done-editing" aria-label="Done editing" title="Done editing">\u2713</button><button type="button" class="docdiagram-icon-button docdiagram-cancel-editing" aria-label="Cancel editing and discard changes" title="Cancel editing and discard changes">\xD7</button>${i?`<button type="button" class="docdiagram-icon-button docdiagram-create-node" data-diagram-index="${r}" aria-label="New node" title="New node">+</button>`:""}`:t.editingDiagramIndex===null?'<button type="button" class="docdiagram-icon-button docdiagram-start-editing" aria-label="Edit diagram" title="Edit diagram">\u270E</button>':"":"","</div>"].join("")}function Xt(r,e,t,o){let{selectedNode:i,selectedEdge:a,editingNode:n,editingEdge:s,connectionDrag:d,diagramZooms:u}=t,l=t.editingDiagramIndex===e,c=G(r),h=new Map(c.map(b=>[b.node.id,b])),m=16,g=[],p=[],S=r.edges.map((b,w)=>{let v=h.get(b.source),$=h.get(b.target);if(!v||!$)return"";let q=v.node,j=$.node,V=ae(q,v.position.x,v.position.y,Number(q.size?.width)||190,Number(q.size?.height)||80),te=ae(j,$.position.x,$.position.y,Number(j.size?.width)||190,Number(j.size?.height)||80),re=b.sourceAnchor||"right",K=b.targetAnchor||"left",T=V.anchors[re],M=te.anchors[K],P=b.route||"orthogonal",R=xe(T,M,re,K,P),Xe=R.midpoint.x,Ze=R.midpoint.y-10,se=Te(r,b,t.documentTheme),$e=a?.diagramIndex===e&&a.edgeIndex===w,bt=$e&&s?.diagramIndex===e&&s.edgeIndex===w,Pe=(Number(se.strokeWidth)||2)+($e?2:0),Ke=220,Je=72,ze=b.label?ie(b.label):[],xt=ze.length*m,yt=Ze-xt/2+m*.72,f=Re(b,"start"),E=Re(b,"end"),D=`docdiagram-marker-${e}-${w}-start`,A=`docdiagram-marker-${e}-${w}-end`;f!=="none"&&g.push(_e(D,f,"start",se.stroke||"",Pe)),E!=="none"&&g.push(_e(A,E,"end",se.stroke||"",Pe)),$e&&l&&p.push(`<circle class="docdiagram-edge-endpoint" data-diagram-index="${e}" data-edge-index="${w}" data-endpoint="source" cx="${T.x}" cy="${T.y}" r="7"/>`,`<circle class="docdiagram-edge-endpoint" data-diagram-index="${e}" data-edge-index="${w}" data-endpoint="target" cx="${M.x}" cy="${M.y}" r="7"/>`);let L=[f!=="none"?` marker-start="url(#${D})"`:"",E!=="none"?` marker-end="url(#${A})"`:""].join("");return[`<g class="docdiagram-edge-group${$e?" docdiagram-edge-selected":""}" data-diagram-index="${e}" data-edge-index="${w}">`,`<path class="docdiagram-edge-hit" d="${R.hitPath}" fill="none" stroke="transparent" stroke-width="16"/>`,`<path class="docdiagram-edge" d="${R.path}"${L} stroke="${x(se.stroke||"")}" stroke-width="${Pe}"/>`,bt?`<foreignObject class="docdiagram-inline-editor-host" x="${Xe-Ke/2}" y="${Ze-Je/2}" width="${Ke}" height="${Je}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-edge" aria-label="Edit edge label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${x(b.label||"")}</textarea></foreignObject>`:ze.length?ee(Xe,yt,ze,m,"docdiagram-edge-label",se.text||""):"","</g>"].join("")}).join(""),y=c.map(({node:b,position:w})=>{let v=w.x,$=w.y,q=Number(b.size?.width)||190,j=Number(b.size?.height)||80,V=ce(r,b,t.documentTheme,t.documentColorScheme),te=i?.diagramIndex===e&&i.nodeId===b.id,re=te&&n?.diagramIndex===e&&n.nodeId===b.id,K=(Number(V.strokeWidth)||2)+(te?2:0),T=ae(b,v,$,q,j),M=Le(T.textBounds,b);return[`<g class="docdiagram-node${te?" docdiagram-node-selected":""}" data-diagram-index="${e}" data-node-id="${x(b.id)}">`,Ce(T,V,K),re?`<foreignObject class="docdiagram-inline-editor-host" x="${T.textBounds.x}" y="${T.textBounds.y}" width="${T.textBounds.width}" height="${T.textBounds.height}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-node" aria-label="Edit node label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${x(b.label)}</textarea></foreignObject>`:ee(M.centerX,M.labelStartY,M.labelLines,M.labelLineHeight,"docdiagram-node-label",V.text||"",M.textAnchor),!re&&M.subtitleLines.length?ee(M.centerX,M.subtitleStartY,M.subtitleLines,M.subtitleLineHeight,"docdiagram-node-subtitle",V.text||"",M.textAnchor):"",te&&l&&!re?`<rect class="docdiagram-resize-handle" x="${v+q-7}" y="${$+j-7}" width="14" height="14" rx="3"/>`:"",te&&l&&!re?Y.map(P=>{let R=T.anchors[P];return`<circle class="docdiagram-connection-port" data-anchor="${P}" cx="${R.x}" cy="${R.y}" r="7" aria-label="${P} connection port"/>`}).join(""):"","</g>"].join("")}).join(""),k=Number(r.canvas.width)||1e3,N=Number(r.canvas.height)||560;return[`<figure class="docdiagram" data-diagram-index="${e}" data-diagram-type="flowchart" data-editing="${l}">`,o(e,"flowchart",t),`<svg viewBox="0 0 ${k} ${N}" role="img" aria-label="Architecture diagram" data-diagram-index="${e}" style="width: ${u.get(e)||100}%">`,`<defs>${g.join("")}</defs>`,y,S,d?.diagramIndex===e?`<path class="docdiagram-connection-preview${d.invalid?" docdiagram-connection-invalid":""}" d="${xe(d.start,d.current,d.sourceAnchor,d.targetAnchor||d.sourceAnchor,"straight").path}"/>`:"",p.join(""),"</svg>","</figure>"].join("")}function Zt(r,e,t,o){let i=pe(r,t.documentTheme),a=Number(r.canvas?.width)||1e3,n=Number(r.canvas?.height)||560,s=r.participants||[],d=r.messages||[],u=r.activations||[],l=r.notes||[],c=r.groups||[],h=90,m=90,g=28,p=Number(r.canvas?.participantSize?.width)||180,S=Number(r.canvas?.participantSize?.height)||42,y=Number(r.canvas?.participantSpacing)||220,k=74,N=48,b=18,w=56,v=`docdiagram-sequence-arrow-${e}`,$=g+k+12,q=s[0],j=s[s.length-1],V=Number(q?.size?.width)||p,te=Number(j?.size?.width)||p,re=s.length>1?V/2+y*(s.length-1)+te/2:p+h+m,K=Math.max(a,re,h+m),T=new Map;s.forEach((f,E)=>{T.set(f.id,s.length===1?K/2:V/2+y*E)});let M=$+40,P=d.map((f,E)=>({...f,index:E,y:M+E*w})),R=l.map(f=>{let E=ie(f.label||""),D=Math.max(N,E.length*16+22,Number(f.size?.height)||0),L=((f.after?P[Number(f.after)-1]:null)?.y||$)+b,J=T.get(f.at||"")||K/2,H=Math.max(160,Number(f.size?.width)||0),U=Math.min(K-H/2-24,Math.max(H/2+24,J));return{...f,lines:E,x:U-H/2,y:L,width:H,height:D}}),Xe=c.map(f=>P[f.to-1]?.y+34||M),Ze=Math.max($+140,R.length?R[R.length-1].y+R[R.length-1].height:0,P.length?P[P.length-1].y+44:M,...Xe),se=Math.max(n,Ze+56),$e=se-36,bt=u.map((f,E)=>({participantId:f.participant,depth:u.slice(0,E).filter(D=>D.participant===f.participant&&D.from<=f.from&&D.to>=f.from).length,startY:(P[f.from-1]?.y||M)-10,endY:(P[f.to-1]?.y||M)+18})),Pe=s.map(f=>{let E=T.get(f.id)||0,D=Me(r,f,t.documentTheme,t.documentColorScheme),A=Number(f.size?.width)||p,L=Number(f.size?.height)||S;if(f.kind==="actor"){let J=g+10,H=J+18,U=H+18;return[`<g class="docdiagram-sequence-participant docdiagram-sequence-actor" data-diagram-index="${e}" data-participant-id="${x(f.id)}">`,`<circle cx="${E}" cy="${J}" r="8" fill="none" stroke="${x(D.stroke||"")}" stroke-width="${Number(D.strokeWidth)||2}"/>`,`<path d="M ${E} ${J+8} V ${U} M ${E-14} ${H} H ${E+14} M ${E} ${U} L ${E-12} ${U+18} M ${E} ${U} L ${E+12} ${U+18}" fill="none" stroke="${x(D.stroke||"")}" stroke-width="${Number(D.strokeWidth)||2}" stroke-linecap="round" stroke-linejoin="round"/>`,`<text x="${E}" y="${g+k-4}" text-anchor="middle" class="docdiagram-node-label" fill="${x(D.text||"")}">${x(f.label||"")}</text>`,"</g>"].join("")}return[`<g class="docdiagram-sequence-participant" data-diagram-index="${e}" data-participant-id="${x(f.id)}">`,`<rect x="${E-A/2}" y="${g}" width="${A}" height="${L}" rx="12" fill="${x(D.fill||"")}" stroke="${x(D.stroke||"")}" stroke-width="${Number(D.strokeWidth)||2}"/>`,`<text x="${E}" y="${g+L/2+6}" text-anchor="middle" class="docdiagram-node-label" fill="${x(D.text||"")}">${x(f.label||"")}</text>`,"</g>"].join("")}).join(""),Ke=s.map(f=>{let E=T.get(f.id)||0;return`<path class="docdiagram-sequence-lifeline" d="M ${E} ${$} L ${E} ${$e}" fill="none" stroke="${x(i.edge.stroke)}" stroke-width="2" stroke-dasharray="8 6"/>`}).join(""),Je=c.map(f=>{let E=(P[f.from-1]?.y||M)-24,D=(P[f.to-1]?.y||M)+30,A=Math.min(220,Math.max(110,String(f.label).length*8+28));return['<g class="docdiagram-sequence-group">',`<rect x="42" y="${E}" width="${K-84}" height="${D-E}" rx="12" fill="none" stroke="${x(i.edge.stroke)}" stroke-width="2" stroke-dasharray="10 6" opacity="0.8"/>`,`<rect x="54" y="${E-16}" width="${A}" height="24" rx="6" fill="${x(i.node.fill)}" stroke="${x(i.edge.stroke)}" stroke-width="1.5"/>`,`<text x="${54+A/2}" y="${E+1}" text-anchor="middle" class="docdiagram-edge-label" fill="${x(i.edge.text)}">${x(f.label||"")}</text>`,"</g>"].join("")}).join(""),ze=R.map((f,E)=>{let A=f.y+18,L=Me(r,f,t.documentTheme,t.documentColorScheme);return[`<g class="docdiagram-sequence-note" data-diagram-index="${e}" data-note-index="${E}">`,`<rect x="${f.x}" y="${f.y}" width="${f.width}" height="${f.height}" rx="10" fill="${x(L.fill||"")}" stroke="${x(L.stroke||"")}" stroke-width="${Number(L.strokeWidth)||2}"/>`,ee(f.x+f.width/2,A,f.lines,16,"docdiagram-node-subtitle",L.text||""),"</g>"].join("")}).join(""),xt=bt.map(f=>{let E=T.get(f.participantId)||0,D=f.depth*7,A=12,L=Math.max(20,f.endY-f.startY),J=s.find(U=>U.id===f.participantId),H=J?Me(r,J,t.documentTheme,t.documentColorScheme):i.node;return`<rect class="docdiagram-sequence-activation" x="${E-A/2+D}" y="${f.startY}" width="${A}" height="${L}" rx="4" fill="${x(H.fill||"")}" stroke="${x(H.stroke||"")}" stroke-width="${Number(H.strokeWidth)||2}"/>`}).join(""),yt=P.map(f=>{let E=T.get(f.from)||0,D=T.get(f.to)||0,A=f.style==="dashed",L=ie(f.label||""),J=L.length*15,H=f.y-12-J/2+11,U=` marker-end="url(#${v})"`;return f.from===f.to?[`<g class="docdiagram-sequence-message" data-diagram-index="${e}" data-message-index="${f.index}">`,`<path d="M ${E} ${f.y} L ${E+48} ${f.y} L ${E+48} ${f.y+28} L ${E} ${f.y+28}" fill="none" stroke="${x(i.edge.stroke)}" stroke-width="2"${U}${A?' stroke-dasharray="8 5"':""}/>`,ee(E+48/2,H,L,15,"docdiagram-edge-label",i.edge.text),"</g>"].join(""):[`<g class="docdiagram-sequence-message" data-diagram-index="${e}" data-message-index="${f.index}">`,`<path d="M ${E} ${f.y} L ${D} ${f.y}" fill="none" stroke="${x(i.edge.stroke)}" stroke-width="2"${U}${A?' stroke-dasharray="8 5"':""}/>`,ee((E+D)/2,H,L,15,"docdiagram-edge-label",i.edge.text),"</g>"].join("")}).join("");return[`<figure class="docdiagram" data-diagram-index="${e}" data-diagram-type="sequence" data-editing="${t.editingDiagramIndex===e}">`,o(e,"sequence",t),`<svg viewBox="0 0 ${K} ${se}" role="img" aria-label="Sequence diagram" data-diagram-index="${e}" style="width: ${t.diagramZooms.get(e)||100}%">`,`<defs>${_e(v,"arrow","end",i.edge.stroke,2)}</defs>`,Je,Pe,Ke,xt,ze,yt,"</svg>","</figure>"].join("")}function Kt(r,e,t){try{let o=me(r,t.colourScheme);return t.onDiagram(e,o),o.type==="sequence"?Zt(o,e,t.state,Lt):Xt(o,e,t.state,Lt)}catch(o){let i=o instanceof Error?o.message:String(o);return`<section class="docdiagram-error"><strong>Diagram could not be rendered.</strong><br>${x(i)}</section>`}}function Jt(){let r=document.createElement("style");r.textContent=`
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
  `,document.head.append(r)}function Qt(){return{diagramModels:[],editingDiagramIndex:null,selectedNode:null,selectedEdge:null,selectedSequenceElement:null,editingNode:null,editingEdge:null,connectionDrag:null,documentTheme:"light",documentColorScheme:"classic",documentFormat:"centered",savedSource:"",editSessionDiagram:null,diagramZooms:new Map}}function we(r){r.selectedNode=null,r.selectedEdge=null,r.selectedSequenceElement=null,r.editingNode=null,r.editingEdge=null}function Ee(r,e){return r.editingDiagramIndex===e}function X(r,e){return r.target instanceof Element?r.target.closest(e):null}function Z(r,e){let t=r.diagramModels[e];return t?.type==="flowchart"?t:null}function z(r){return Number(r)}var ht=class{constructor(e){this.host=e}enableCanvasPanning(){for(let e of this.host.outputElement.querySelectorAll(".docdiagram svg"))e.addEventListener("pointerdown",t=>{t.target===e&&this.beginCanvasPan(e,t)})}enableSequenceSelection(){for(let e of this.host.outputElement.querySelectorAll('.docdiagram[data-diagram-type="sequence"] svg'))e.addEventListener("click",t=>{if(!Ee(this.host.state,z(e.dataset.diagramIndex)))return;let o=X(t,".docdiagram-sequence-participant"),i=X(t,".docdiagram-sequence-note"),a=X(t,".docdiagram-sequence-message");o?this.host.state.selectedSequenceElement={diagramIndex:z(o.getAttribute("data-diagram-index")||void 0),kind:"participant",id:o.getAttribute("data-participant-id")||""}:i?this.host.state.selectedSequenceElement={diagramIndex:z(i.getAttribute("data-diagram-index")||void 0),kind:"note",index:z(i.getAttribute("data-note-index")||void 0)}:a?this.host.state.selectedSequenceElement={diagramIndex:z(a.getAttribute("data-diagram-index")||void 0),kind:"message",index:z(a.getAttribute("data-message-index")||void 0)}:this.host.state.selectedSequenceElement=null,this.host.state.selectedNode=null,this.host.state.selectedEdge=null,this.host.renderDocument()})}enableEditing(){for(let e of this.host.outputElement.querySelectorAll(".docdiagram svg"))Ee(this.host.state,z(e.dataset.diagramIndex))&&(e.addEventListener("click",t=>this.handleDiagramClick(e,t)),e.addEventListener("pointerdown",t=>this.handleDiagramPointerDown(e,t)));for(let e of this.host.outputElement.querySelectorAll(".docdiagram-inline-editor"))this.wireInlineEditor(e);this.host.outputElement.dataset.deleteShortcutBound||(this.host.outputElement.dataset.deleteShortcutBound="true",document.addEventListener("keydown",e=>{this.host.state.editingDiagramIndex===null||e.key!=="Delete"&&e.key!=="Backspace"||e.target instanceof Element&&e.target.matches("input, textarea, select, [contenteditable]")||(this.host.state.selectedNode||this.host.state.selectedEdge)&&(e.preventDefault(),this.deleteSelected())}))}selectNode(e,t){this.host.state.selectedNode={diagramIndex:e,nodeId:t},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}selectEdge(e,t){this.host.state.selectedEdge={diagramIndex:e,edgeIndex:t},this.host.state.selectedNode=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}handleDiagramClick(e,t){if(X(t,".docdiagram-inline-editor"))return;let o=X(t,".docdiagram-node");if(o){this.selectNode(z(o.getAttribute("data-diagram-index")||void 0),o.getAttribute("data-node-id")||"");return}let i=X(t,".docdiagram-edge-group");if(i){let a=z(i.getAttribute("data-diagram-index")||void 0),n=z(i.getAttribute("data-edge-index")||void 0),s=this.host.state.selectedEdge?.diagramIndex===a&&this.host.state.selectedEdge.edgeIndex===n,d=this.host.state.editingEdge?.diagramIndex===a&&this.host.state.editingEdge.edgeIndex===n;s&&!d?(this.host.state.editingEdge={diagramIndex:a,edgeIndex:n},this.host.renderDocument()):this.selectEdge(a,n);return}(this.host.state.selectedNode||this.host.state.selectedEdge)&&this.clearSelection()}handleDiagramPointerDown(e,t){let o=X(t,".docdiagram-connection-port");if(o){let y=o.closest(".docdiagram-node"),k=z(y?.getAttribute("data-diagram-index")||e.dataset.diagramIndex),N=o.getAttribute("data-node-id")||y?.getAttribute("data-node-id")||"",b=Z(this.host.state,k),w=b?I(b,N)?.node:null,v=o.getAttribute("data-anchor")||"";w&&this.beginConnectionDrag(e,t,{diagramIndex:k,sourceNodeId:N,sourceAnchor:v,start:this.getNodePortPoint(w,v),current:this.getNodePortPoint(w,v),invalid:!1});return}let i=X(t,".docdiagram-edge-endpoint");if(i){let y=z(i.getAttribute("data-diagram-index")||void 0),k=z(i.getAttribute("data-edge-index")||void 0),N=Z(this.host.state,y),b=N?.edges[k],w=i.getAttribute("data-endpoint");if(!b||w!=="source"&&w!=="target")return;let v=w==="source"?b.source:b.target,$=w==="source"?b.sourceAnchor:b.targetAnchor,q=N?I(N,v)?.node:null;if(!q||!$)return;this.beginConnectionDrag(e,t,{diagramIndex:y,edgeIndex:k,endpoint:w,reconnect:!0,sourceNodeId:v,sourceAnchor:$,start:this.getNodePortPoint(q,$),current:this.getNodePortPoint(q,$),invalid:!1});return}let a=X(t,".docdiagram-resize-handle");if(a){let y=a.closest(".docdiagram-node");y&&this.resizeNode(e,t,y);return}if(X(t,".docdiagram-inline-editor"))return;let n=X(t,".docdiagram-node");if(!n)return;let s=z(n.getAttribute("data-diagram-index")||void 0),d=n.getAttribute("data-node-id")||"",u=Z(this.host.state,s),l=u?I(u,d)?.node:null;if(!u||!l)return;t.preventDefault();let c=this.svgPoint(e,t),h=W(u,l),m=Q(u),g=!1;this.capturePointer(e,t);let p=y=>{let k=this.svgPoint(e,y),N=ne(h.x+k.x-c.x,m),b=ne(h.y+k.y-c.y,m);g=g||N!==h.x||b!==h.y,n.setAttribute("transform",`translate(${N-h.x} ${b-h.y})`);let w=I(u,d);l.position={...l.position,x:N-(w?.parent?W(u,w.parent).x:0),y:b-(w?.parent?W(u,w.parent).y:0)}},S=y=>{this.releasePointer(e,y),e.removeEventListener("pointermove",p),e.removeEventListener("pointerup",S),e.removeEventListener("pointercancel",S),g?(et(u,d),He(u,l),this.host.state.selectedNode={diagramIndex:s,nodeId:d},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.persistDiagramModels(),this.host.renderDocument()):this.host.state.selectedNode?.diagramIndex===s&&this.host.state.selectedNode.nodeId===d?(this.host.state.editingNode={diagramIndex:s,nodeId:d},this.host.renderDocument()):this.selectNode(s,d)};e.addEventListener("pointermove",p),e.addEventListener("pointerup",S),e.addEventListener("pointercancel",S)}getSelectedNode(){let e=this.host.state.selectedNode,t=e?Z(this.host.state,e.diagramIndex):null;return e&&t&&I(t,e.nodeId)?.node||null}getSelectedEdge(){let e=this.host.state.selectedEdge,t=e?Z(this.host.state,e.diagramIndex):null;return e&&t?.edges[e.edgeIndex]||null}clearSelection(){this.host.state.selectedNode=null,this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}deleteSelected(){let e=this.host.state.selectedNode,t=this.host.state.selectedEdge;if(e){let o=Z(this.host.state,e.diagramIndex);if(!o)return;let i=o.edges.filter(a=>a.source===e.nodeId||a.target===e.nodeId);if(i.length&&!globalThis.confirm(`Delete this node and its ${i.length} attached connector${i.length===1?"":"s"}?`))return;nt(o,e.nodeId)}else if(t){let o=Z(this.host.state,t.diagramIndex);if(!o)return;ot(o,t.edgeIndex)}else return;we(this.host.state),this.host.persistDiagramModels(),this.host.renderDocument()}wireInlineEditor(e){let t=!1,o=()=>{if(!t){if(t=!0,e.classList.contains("docdiagram-inline-editor-edge")){let a=this.getSelectedEdge();a&&(Ae(a,e.value),this.host.persistDiagramModels()),this.host.state.editingEdge=null}else{let a=this.getSelectedNode();a&&(qe(a,e.value),this.host.persistDiagramModels()),this.host.state.editingNode=null}this.host.renderDocument()}},i=()=>{t||(t=!0,e.classList.contains("docdiagram-inline-editor-edge")?this.host.state.editingEdge=null:this.host.state.editingNode=null,this.host.renderDocument())};e.addEventListener("pointerdown",a=>a.stopPropagation()),e.addEventListener("click",a=>a.stopPropagation()),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.metaKey||a.ctrlKey)?(a.preventDefault(),o()):a.key==="Escape"&&(a.preventDefault(),i())}),e.addEventListener("blur",o,{once:!0}),e.focus(),e.select()}resizeNode(e,t,o){t.preventDefault();let i=z(o.getAttribute("data-diagram-index")||void 0),a=o.getAttribute("data-node-id")||"",n=Z(this.host.state,i),s=n?I(n,a)?.node:null;if(!n||!s)return;let d=this.svgPoint(e,t),u={width:Number(s.size?.width)||190,height:Number(s.size?.height)||80},l=Q(n),c=!1;this.capturePointer(e,t);let h=g=>{let p=this.svgPoint(e,g),S=fe(u.width+p.x-d.x,Ne.width,l),y=fe(u.height+p.y-d.y,Ne.height,l);if(s.shape==="circle"){let k=Math.max(S,y);S=k,y=k}c=c||S!==u.width||y!==u.height,s.size={...s.size,width:S,height:y},this.updateNodeSizeMarkup(o,s,S,y)},m=g=>{this.releasePointer(e,g),e.removeEventListener("pointermove",h),e.removeEventListener("pointerup",m),e.removeEventListener("pointercancel",m),c&&(He(n,s),this.host.state.selectedNode={diagramIndex:i,nodeId:a},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.persistDiagramModels(),this.host.renderDocument())};e.addEventListener("pointermove",h),e.addEventListener("pointerup",m),e.addEventListener("pointercancel",m)}updateNodeSizeMarkup(e,t,o,i){let a=Z(this.host.state,z(e.getAttribute("data-diagram-index")||void 0));if(!a)return;let{x:n,y:s}=W(a,t),d=e.querySelector(".docdiagram-node-body"),u=e.querySelector(".docdiagram-node-label"),l=e.querySelector(".docdiagram-node-subtitle"),c=e.querySelector(".docdiagram-resize-handle");if(!d)return;let h=ce(a,t),m=ae(t,n,s,o,i),g=Le(m.textBounds,t);for(let p of e.querySelectorAll(".docdiagram-node-detail"))p.remove();d.outerHTML=Ce(m,h,Number(h.strokeWidth)||2);for(let p of[u,l])if(p){p.setAttribute("x",String(g.centerX)),p.setAttribute("y",String(p===u?g.labelStartY:g.subtitleStartY)),p.setAttribute("text-anchor",g.textAnchor);for(let S of p.querySelectorAll("tspan"))S.setAttribute("x",String(g.centerX))}c?.setAttribute("x",String(n+o-7)),c?.setAttribute("y",String(s+i-7))}getNodePortPoint(e,t){let o=this.host.state.diagramModels.find(a=>a.type==="flowchart"&&I(a,e.id)?.node===e);if(!o)return{x:0,y:0};let i=W(o,e);return ae(e,i.x,i.y,i.width,i.height).anchors[t]}addConnectionTargetPorts(e,t){let o=Z(this.host.state,t);if(o)for(let{node:i}of G(o))for(let a of Y){let n=this.getNodePortPoint(i,a),s=document.createElementNS("http://www.w3.org/2000/svg","circle");s.setAttribute("class","docdiagram-connection-port docdiagram-connection-target-port"),s.dataset.nodeId=i.id,s.dataset.anchor=a,s.setAttribute("cx",String(n.x)),s.setAttribute("cy",String(n.y)),s.setAttribute("r","7"),e.append(s)}}beginConnectionDrag(e,t,o){t.preventDefault(),t.stopPropagation(),this.host.state.connectionDrag={...o,current:this.svgPoint(e,t),invalid:!1},this.addConnectionTargetPorts(e,o.diagramIndex);let i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("class","docdiagram-connection-preview"),e.append(i),this.capturePointer(e,t);let a=d=>{let l=document.elementFromPoint(d.clientX,d.clientY)?.closest(".docdiagram-connection-port");return l||[...e.querySelectorAll(".docdiagram-connection-port")].find(c=>{let h=c.getBoundingClientRect();return d.clientX>=h.left&&d.clientX<=h.right&&d.clientY>=h.top&&d.clientY<=h.bottom})||null},n=d=>{let u=this.host.state.connectionDrag;if(!u)return;let l=this.svgPoint(e,d),c=a(d);u.current=l,u.invalid=!c;let h=c?.getAttribute("data-anchor")||u.sourceAnchor;i.setAttribute("d",xe(u.start,l,u.sourceAnchor,h,"straight").path),i.classList.toggle("docdiagram-connection-invalid",u.invalid)},s=d=>{this.releasePointer(e,d),e.removeEventListener("pointermove",n),e.removeEventListener("pointerup",s),e.removeEventListener("pointercancel",s);let u=a(d),l=this.host.state.connectionDrag;if(this.host.state.connectionDrag=null,u&&l){let c=Z(this.host.state,l.diagramIndex),h=u.getAttribute("data-node-id")||u.closest(".docdiagram-node")?.getAttribute("data-node-id"),m=u.getAttribute("data-anchor")||"";if(c&&h){if(l.reconnect&&l.edgeIndex!==void 0&&l.endpoint){let g=c.edges[l.edgeIndex];g&&(rt(g,l.endpoint,h,m),this.host.state.selectedEdge={diagramIndex:l.diagramIndex,edgeIndex:l.edgeIndex},this.host.state.selectedNode=null)}else{let g=tt(c,l.sourceNodeId,l.sourceAnchor,h,m);this.host.state.selectedEdge={diagramIndex:l.diagramIndex,edgeIndex:c.edges.indexOf(g)},this.host.state.selectedNode=null}this.host.persistDiagramModels()}}this.host.renderDocument()};e.addEventListener("pointermove",n),e.addEventListener("pointerup",s),e.addEventListener("pointercancel",s)}beginCanvasPan(e,t){let o=e.closest(".docdiagram");if(!o)return;t.preventDefault();let i={clientX:t.clientX,clientY:t.clientY,scrollLeft:o.scrollLeft,scrollTop:o.scrollTop};o.classList.add("docdiagram-panning"),this.capturePointer(e,t);let a=s=>{o.scrollLeft=i.scrollLeft-(s.clientX-i.clientX),o.scrollTop=i.scrollTop-(s.clientY-i.clientY)},n=s=>{this.releasePointer(e,s),o.classList.remove("docdiagram-panning"),e.removeEventListener("pointermove",a),e.removeEventListener("pointerup",n),e.removeEventListener("pointercancel",n)};e.addEventListener("pointermove",a),e.addEventListener("pointerup",n),e.addEventListener("pointercancel",n)}svgPoint(e,t){let o=e.getBoundingClientRect(),i=e.viewBox.baseVal;return{x:(t.clientX-o.left)*i.width/o.width,y:(t.clientY-o.top)*i.height/o.height}}capturePointer(e,t){t.isTrusted&&e.setPointerCapture(t.pointerId)}releasePointer(e,t){t.isTrusted&&e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId)}};function er(r,e){return Object.entries(O[r]||{}).map(([t,o])=>`<option value="${t}"${t===e?" selected":""}>${o.label}</option>`).join("")}function tr(r,e,t="classic"){let o=Q(r),i=ce(r,e),a=Number(e.size?.width)||190,n=Number(e.size?.height)||80,s=e.shape==="document"?{width:140,height:84}:{width:120,height:60},d=o?Math.ceil(s.width/o)*o:s.width,u=o?Math.ceil(s.height/o)*o:s.height,l=o||1,c=O[t]||{},h=Object.entries(c).find(([,p])=>[p.light,p.dark].some(S=>S.fill.toLowerCase()===(i.fill||"").toLowerCase()&&S.stroke.toLowerCase()===(i.stroke||"").toLowerCase()&&S.text.toLowerCase()===(i.text||"").toLowerCase())),m=e.palette?.colour||h?.[0]||"blue",g=e.palette?.tone||(h&&h[1].light.fill.toLowerCase()===(i.fill||"").toLowerCase()?"light":"dark");return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${x(e.label)}</textarea></label>`,`<label class="docdiagram-field docdiagram-field-wide">Subtitle<textarea class="docdiagram-inspector-subtitle docdiagram-inspector-textarea" rows="2">${x(e.subtitle||"")}</textarea></label>`,`<label class="docdiagram-field">Tone<select class="docdiagram-inspector-tone"><option value="light"${g==="light"?" selected":""}>Light</option><option value="dark"${g==="dark"?" selected":""}>Dark</option></select></label>`,`<label class="docdiagram-field">Colour<select class="docdiagram-inspector-colour">${er(t,m)}</select></label>`,`<label class="docdiagram-field">Shape<select class="docdiagram-inspector-shape">${ke.map(p=>`<option value="${p}"${p===e.shape?" selected":""}>${p}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Fill<input type="color" class="docdiagram-inspector-fill" value="${x(i.fill||"")}"></label>`,`<label class="docdiagram-field">Border<input type="color" class="docdiagram-inspector-stroke" value="${x(i.stroke||"")}"></label>`,`<label class="docdiagram-field">Border width<input type="number" class="docdiagram-inspector-stroke-width" value="${Number(i.strokeWidth)||2}" min="1" step="1"></label>`,`<label class="docdiagram-field">Text<input type="color" class="docdiagram-inspector-text" value="${x(i.text||"")}"></label>`,`<label class="docdiagram-field">Vertical text<select class="docdiagram-inspector-text-v-align"><option value="top"${e.textVAlign==="top"?" selected":""}>Top</option><option value="center"${e.textVAlign!=="top"?" selected":""}>Center</option></select></label>`,`<label class="docdiagram-field">Horizontal text<select class="docdiagram-inspector-text-h-align"><option value="left"${e.textHAlign==="left"?" selected":""}>Left</option><option value="center"${e.textHAlign!=="left"&&e.textHAlign!=="right"?" selected":""}>Center</option><option value="right"${e.textHAlign==="right"?" selected":""}>Right</option></select></label>`,`<label class="docdiagram-field">Width<input type="number" class="docdiagram-inspector-width" value="${a}" min="${d}" step="${l}"></label>`,`<label class="docdiagram-field">Height<input type="number" class="docdiagram-inspector-height" value="${n}" min="${u}" step="${l}"></label>`].join("")}function Ct(r,e){let t=Te(r,e),o=Number(t.strokeWidth)||2,i=e.route||"orthogonal",a=e.start||"none",n=e.end||"arrow";return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${x(e.label||"")}</textarea></label>`,`<label class="docdiagram-field">Route<select class="docdiagram-inspector-route">${ve.map(s=>`<option value="${s}"${s===i?" selected":""}>${s}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Source side<select class="docdiagram-inspector-source-anchor">${Y.map(s=>`<option value="${s}"${s===e.sourceAnchor?" selected":""}>${s}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Target side<select class="docdiagram-inspector-target-anchor">${Y.map(s=>`<option value="${s}"${s===e.targetAnchor?" selected":""}>${s}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Start<select class="docdiagram-inspector-marker-start">${B.map(s=>`<option value="${s}"${s===a?" selected":""}>${s}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">End<select class="docdiagram-inspector-marker-end">${B.map(s=>`<option value="${s}"${s===n?" selected":""}>${s}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Stroke<input type="color" class="docdiagram-inspector-stroke" value="${x(t.stroke||"")}"></label>`,`<label class="docdiagram-field">Label colour<input type="color" class="docdiagram-inspector-text" value="${x(t.text||"")}"></label>`,`<label class="docdiagram-field">Stroke width<input type="number" class="docdiagram-inspector-stroke-width" value="${o}" min="1" step="1"></label>`].join("")}function rr(r,e,t,o="classic"){let i="from"in t?null:Me(r,t),a=e.kind!=="message",n=a?t:null;return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-sequence-inspector-label docdiagram-inspector-textarea" rows="2">${x(t.label||"")}</textarea></label>`,e.kind==="message"?`<label class="docdiagram-field">Style<select class="docdiagram-sequence-inspector-message-style"><option value="solid"${t.style!=="dashed"?" selected":""}>Solid</option><option value="dashed"${t.style==="dashed"?" selected":""}>Dashed</option></select></label>`:"",a?`<label class="docdiagram-field">Tone<select class="docdiagram-sequence-inspector-tone"><option value="light"${n?.palette?.tone!=="dark"?" selected":""}>Light</option><option value="dark"${n?.palette?.tone==="dark"?" selected":""}>Dark</option></select></label>`:"",a?`<label class="docdiagram-field">Colour<select class="docdiagram-sequence-inspector-colour">${er(o,n?.palette?.colour||"blue")}</select></label>`:"",a?`<label class="docdiagram-field">Fill<input type="color" class="docdiagram-sequence-inspector-fill" value="${x(i?.fill||"")}"></label><label class="docdiagram-field">Border<input type="color" class="docdiagram-sequence-inspector-stroke" value="${x(i?.stroke||"")}"></label><label class="docdiagram-field">Text<input type="color" class="docdiagram-sequence-inspector-text" value="${x(i?.text||"")}"></label><label class="docdiagram-field">Width<input type="number" min="1" class="docdiagram-sequence-inspector-width" value="${Number(n?.size?.width)||""}"></label><label class="docdiagram-field">Height<input type="number" min="1" class="docdiagram-sequence-inspector-height" value="${Number(n?.size?.height)||""}"></label>`:""].join("")}function We(r,e){return r.querySelector(e)}function F(r,e,t){We(r,e)?.addEventListener("change",o=>{t(o.currentTarget.value)})}function Se(r,e){e(),r.persistDiagramModels(),r.renderDocument()}function or(r,e,t,o){let i=d=>{let u=r.state.diagramModels[t];if(!u||u.type!=="flowchart")return;let l=I(u,o)?.node;l&&Se(r,()=>d(u,l))};F(e,".docdiagram-inspector-label",d=>i((u,l)=>qe(l,d))),F(e,".docdiagram-inspector-subtitle",d=>i((u,l)=>at(l,d)));let a=We(e,".docdiagram-inspector-tone"),n=We(e,".docdiagram-inspector-colour"),s=()=>{a&&n&&i((d,u)=>Oe(u,a.value,n.value,r.state.documentColorScheme))};a?.addEventListener("change",s),n?.addEventListener("change",s),F(e,".docdiagram-inspector-shape",d=>i((u,l)=>it(l,d))),F(e,".docdiagram-inspector-fill",d=>i((u,l)=>be(l,"fill",d))),F(e,".docdiagram-inspector-stroke",d=>i((u,l)=>be(l,"stroke",d))),F(e,".docdiagram-inspector-text",d=>i((u,l)=>be(l,"text",d))),F(e,".docdiagram-inspector-text-v-align",d=>i((u,l)=>Be(l,"textVAlign",d))),F(e,".docdiagram-inspector-text-h-align",d=>i((u,l)=>Be(l,"textHAlign",d))),F(e,".docdiagram-inspector-stroke-width",d=>i((u,l)=>Ye(l,d))),F(e,".docdiagram-inspector-width",d=>i((u,l)=>Ge(u,l,"width",d))),F(e,".docdiagram-inspector-height",d=>i((u,l)=>Ge(u,l,"height",d)))}function nr(r,e,t,o){let i=a=>{let n=r.state.diagramModels[t];if(!n||n.type!=="flowchart")return;let s=n.edges[o];s&&Se(r,()=>a(n,s))};F(e,".docdiagram-inspector-label",a=>i((n,s)=>Ae(s,a))),F(e,".docdiagram-inspector-route",a=>i((n,s)=>st(s,a))),F(e,".docdiagram-inspector-source-anchor",a=>i((n,s)=>Ve(s,"source",a))),F(e,".docdiagram-inspector-target-anchor",a=>i((n,s)=>Ve(s,"target",a))),F(e,".docdiagram-inspector-marker-start",a=>i((n,s)=>dt(s,a))),F(e,".docdiagram-inspector-marker-end",a=>i((n,s)=>ct(s,a))),F(e,".docdiagram-inspector-stroke",a=>i((n,s)=>Ue(s,"stroke",a))),F(e,".docdiagram-inspector-text",a=>i((n,s)=>Ue(s,"text",a))),F(e,".docdiagram-inspector-stroke-width",a=>i((n,s)=>Ye(s,a)))}function ir(r,e,t){let o=r.state.selectedSequenceElement;if(!o)return;if(F(e,".docdiagram-sequence-inspector-label",d=>Se(r,()=>{t.label=d.trim()||t.label})),o.kind==="message"){F(e,".docdiagram-sequence-inspector-message-style",d=>Se(r,()=>{t.style=d}));return}let i=t,a=We(e,".docdiagram-sequence-inspector-tone"),n=We(e,".docdiagram-sequence-inspector-colour"),s=()=>{a&&n&&Se(r,()=>Oe(i,a.value,n.value,r.state.documentColorScheme))};a?.addEventListener("change",s),n?.addEventListener("change",s);for(let[d,u]of[[".docdiagram-sequence-inspector-fill","fill"],[".docdiagram-sequence-inspector-stroke","stroke"],[".docdiagram-sequence-inspector-text","text"]])F(e,d,l=>Se(r,()=>be(i,u,l)));for(let[d,u]of[[".docdiagram-sequence-inspector-width","width"],[".docdiagram-sequence-inspector-height","height"]])F(e,d,l=>Se(r,()=>{let c=Number(l);Number.isFinite(c)&&c>0&&(i.size={...i.size,[u]:c})}))}var pt=class{constructor(e){this.host=e;this.renderTimer=null;this.resizeObserver=null;this.openState=!1;this.draft="";this.error=""}get isOpen(){return this.openState}get hasUnsavedDraft(){return this.openState&&this.draft!==this.host.getSource()}get hasError(){return this.error.length>0}get draftSource(){return this.draft}setError(e){this.error=e,this.updateStatus()}clearError(){this.error=""}open(){globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=null,this.draft=this.host.getSource(),this.error="",this.openState=!0,this.host.stopDiagramEditing(),this.host.renderDocument();let e=()=>this.focus();globalThis.requestAnimationFrame?.(e)??e()}close(){this.flushRender(),!(this.error&&this.draft!==this.host.getSource()&&!globalThis.confirm("Discard the invalid source changes?"))&&(this.openState=!1,this.draft="",this.error="",this.renderTray(),document.querySelector(".docdiagram-menu-toggle")?.focus())}flushRender(){return this.renderTimer===null?!0:this.renderDraft()}syncSource(e){if(!this.openState)return;this.draft=e,this.error="";let t=document.querySelector(".docdiagram-source-editor");if(!t)return;let o=t.selectionStart,i=t.selectionEnd,a=t.scrollTop;t.value=e,t.setSelectionRange(Math.min(o,e.length),Math.min(i,e.length)),t.scrollTop=a,this.updateStatus()}reveal(e){let t=ut(this.host.getSource(),e);if(!t||this.hasUnsavedDraft)return!1;this.openState||this.open();let o=()=>{let i=document.querySelector(".docdiagram-source-editor");i&&(i.focus(),i.setSelectionRange(t.start,t.end),mt(i,t))};return globalThis.requestAnimationFrame?.(o)??o(),!0}renderTray(){let e=document.querySelector(".docdiagram-source-tray");if(!this.openState){this.resizeObserver?.disconnect(),this.resizeObserver=null,e?.remove(),delete this.host.outputElement.dataset.sourceEditorOpen,this.host.outputElement.style.removeProperty("--docdiagram-source-tray-height");return}if(e){e.dataset.theme=this.host.getDocumentTheme(),this.host.outputElement.dataset.sourceEditorOpen="true",this.updateStatus();return}e=document.createElement("section"),e.className="docdiagram-source-tray",e.dataset.theme=this.host.getDocumentTheme(),e.setAttribute("aria-label","Document source editor"),e.innerHTML=['<header class="docdiagram-source-header">','<div><strong>Source</strong><span class="docdiagram-source-shortcut">Cmd/Ctrl+Shift+E to close</span></div>','<button type="button" class="docdiagram-source-close">Close source editor</button>',"</header>",'<label class="docdiagram-source-label">Canonical Markdown<textarea class="docdiagram-source-editor" spellcheck="false"></textarea></label>','<p class="docdiagram-source-status" aria-live="polite"></p>','<p class="docdiagram-source-error" role="alert"></p>'].join("");let t=e.querySelector(".docdiagram-source-editor"),o=e.querySelector(".docdiagram-source-close");if(!t||!o)return;t.value=this.draft,t.addEventListener("input",()=>{this.draft=t.value,this.error="",this.updateStatus(),this.scheduleRender()}),o.addEventListener("click",()=>this.close()),this.host.outputElement.after(e),this.host.outputElement.dataset.sourceEditorOpen="true";let i=()=>{this.host.outputElement.style.setProperty("--docdiagram-source-tray-height",`${e?.offsetHeight||0}px`)};this.resizeObserver?.disconnect(),globalThis.ResizeObserver&&(this.resizeObserver=new globalThis.ResizeObserver(i),this.resizeObserver.observe(e)),i(),this.updateStatus()}scheduleRender(){globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=globalThis.setTimeout(()=>{this.renderTimer=null,this.renderDraft()},250)}renderDraft(){return globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=null,this.host.renderDocument(this.draft,{preserveOnError:!0})}updateStatus(){let e=document.querySelector(".docdiagram-source-tray");if(!e)return;let t=e.querySelector(".docdiagram-source-status"),o=e.querySelector(".docdiagram-source-error");!t||!o||(t.textContent=this.error?"Source has errors; showing the last valid render.":"Changes render automatically.",o.hidden=!this.error,o.textContent=this.error)}focus(){let e=document.querySelector(".docdiagram-source-editor");e&&(e.focus(),e.setSelectionRange(e.value.length,e.value.length))}};function qr(r){return r instanceof Element&&r.matches("input, textarea, select, [contenteditable]")}var ft=class{constructor(e,t){this.sourceElement=e;this.outputElement=t;this.state=Qt();this.sourceEditor=t?new pt({outputElement:t,getSource:()=>this.getSource(),getDocumentTheme:()=>this.getDocumentTheme(),renderDocument:(o,i)=>this.renderDocument(o,i),stopDiagramEditing:()=>this.stopDiagramEditing(),closeDocumentMenu:()=>this.closeDocumentMenu()}):null,this.diagramEditor=t?new ht({outputElement:t,state:this.state,persistDiagramModels:()=>this.persistDiagramModels(),renderDocument:()=>this.renderDocument()}):null}getSource(){return this.sourceElement?.content.textContent||""}setSource(e){this.sourceElement?.content.replaceChildren(document.createTextNode(e))}getDocumentTheme(){return this.state.documentTheme}stopDiagramEditing(){this.state.editingDiagramIndex!==null&&(this.state.editingDiagramIndex=null,this.state.editSessionDiagram=null,we(this.state))}renderDiagram(e,t){return Kt(e,t,{colourScheme:this.state.documentColorScheme,state:{...this.state,documentTheme:this.state.documentTheme,documentColorScheme:this.state.documentColorScheme},onDiagram:(o,i)=>{this.state.diagramModels[o]=i}})}renderMarkdown(e,t={diagramIndex:0}){return At(e,t,{renderDiagram:(o,i)=>this.renderDiagram(o,i),documentColorScheme:this.state.documentColorScheme})}persistDiagramModels(){let e=0,t=this.getSource().replace(/\r\n/g,`
`).replace(/^```diagram\s*\n([\s\S]*?)^```$/gm,()=>{let o=this.state.diagramModels[e];return e+=1,o?`\`\`\`diagram
${Qe(o)}
\`\`\``:"```diagram\n```"});this.setSource(t),this.sourceEditor?.syncSource(t)}renderDocument(e=this.getSource(),{preserveOnError:t=!1}={}){if(!this.outputElement)return!1;let o=new Map([...this.outputElement.querySelectorAll(".docdiagram")].map(u=>[Number(u.dataset.diagramIndex),{left:u.scrollLeft,top:u.scrollTop}])),i={x:globalThis.scrollX||0,y:globalThis.scrollY||0},a=[...this.state.diagramModels],n=this.state.documentTheme,s=this.state.documentColorScheme;this.state.diagramModels.length=0;let d;try{let u=t?Ft(e):lt(e);this.state.documentTheme=u.theme,this.state.documentColorScheme=u.colourScheme,d=this.renderMarkdown(u.content)}catch(u){let l=u instanceof Error?u.message:String(u);return this.state.diagramModels.length=0,this.state.diagramModels.push(...a),t?(this.state.documentTheme=n,this.state.documentColorScheme=s,this.sourceEditor?.setError(l),!1):(this.applyPageTheme(this.state.documentTheme),this.removeToolbarChrome(),this.outputElement.innerHTML=`<section class="docdiagram-error"><strong>Document could not be rendered.</strong><br>${x(l)}</section>`,this.sourceEditor?.renderTray(),!1)}this.setSource(e),this.sourceEditor?.clearError(),this.outputElement.dataset.theme=this.state.documentTheme,this.outputElement.dataset.format=this.state.documentFormat,this.applyPageTheme(this.state.documentTheme),this.outputElement.innerHTML=d,this.removeToolbarChrome(),this.createToolbar(),this.sourceEditor?.renderTray(),this.diagramEditor?.enableCanvasPanning(),this.diagramEditor?.enableSequenceSelection(),this.state.editingDiagramIndex!==null&&this.diagramEditor?.enableEditing();for(let u of this.outputElement.querySelectorAll(".docdiagram")){let l=o.get(Number(u.dataset.diagramIndex));l&&(u.scrollLeft=l.left,u.scrollTop=l.top)}return globalThis.scrollTo?.(i.x,i.y),!0}closeDocumentMenu(){let e=document.querySelector(".docdiagram-menu"),t=document.querySelector(".docdiagram-menu-toggle");!e||!t||(e.hidden=!0,t.setAttribute("aria-expanded","false"))}downloadDocument(){if(this.sourceEditor?.flushRender(),this.sourceEditor?.hasError&&this.sourceEditor.hasUnsavedDraft&&!globalThis.confirm("Source has errors. Save the last valid version instead?"))return;let e=document.documentElement.cloneNode(!0),t=e.querySelector("#source"),o=e.querySelector(".docdiagram-toolbar"),i=e.querySelector(".docdiagram-source-tray"),a=e.querySelector("#rendered-document");t?.content.replaceChildren(document.createTextNode(this.getSource())),o?.remove(),i?.remove(),a?.replaceChildren();let n=new Blob([`<!doctype html>
${e.outerHTML}`],{type:"text/html;charset=utf-8"}),s=document.createElement("a"),d=document.title.toLowerCase().replace(/[^\w]+/g,"-").replace(/^-|-$/g,"");s.href=URL.createObjectURL(n),s.download=`${d||"document"}-edited.html`,s.click(),URL.revokeObjectURL(s.href),this.state.savedSource=this.getSource()}boot(){!this.sourceElement||!this.outputElement||(Jt(),this.state.savedSource=this.getSource(),globalThis.addEventListener("beforeunload",e=>{this.getSource()===this.state.savedSource&&!this.sourceEditor?.hasUnsavedDraft||(e.preventDefault(),e.returnValue="")}),document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.shiftKey&&e.key.toLowerCase()==="e"&&(this.sourceEditor?.isOpen||!qr(e.target))){e.preventDefault(),this.sourceEditor?.isOpen?this.sourceEditor.close():this.sourceEditor?.open();return}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="s"){e.preventDefault(),this.downloadDocument();return}e.key==="Escape"&&this.closeDocumentMenu()}),document.addEventListener("pointerdown",e=>{let t=document.querySelector(".docdiagram-toolbar");t&&e.target instanceof Node&&!t.contains(e.target)&&this.closeDocumentMenu(),!(!(e.target instanceof Element)||e.target.closest(".docdiagram-toolbar, .docdiagram-node, .docdiagram-edge-group, .docdiagram-connection-port, .docdiagram-edge-endpoint, .docdiagram-inline-editor, .docdiagram-sequence-participant, .docdiagram-sequence-note, .docdiagram-sequence-message")||!this.state.selectedNode&&!this.state.selectedEdge&&!this.state.selectedSequenceElement)&&(we(this.state),this.renderDocument())}),this.outputElement.addEventListener("dblclick",e=>{e.target instanceof Element&&e.target.closest("button, input, textarea, select, [contenteditable]")||this.sourceEditor?.reveal(globalThis.getSelection?.()?.toString()||"")}),this.renderDocument())}getCoreApi(){return{diagramThemes:oe,nodeColorSchemes:O,supportedDiagramTypes:Ie,nodeColorPalettes:It,nodeShapes:ke,edgeAnchors:Y,edgeRoutes:ve,edgeMarkerStyles:B,getTheme:e=>pe(e,this.state.documentTheme),getGridSize:Q,expandCanvasForNode:He,flattenFlowchartNodes:G,getFlowchartNodeBounds:W,reparentFlowchartNode:et,createUniqueNodeId:St,getDefaultNodePosition:$t,createNode:kt,createConnector:tt,reconnectConnector:rt,deleteConnector:ot,deleteNode:nt,getNodeEffectiveStyle:(e,t)=>ce(e,t,this.state.documentTheme,this.state.documentColorScheme),getEdgeEffectiveStyle:(e,t)=>Te(e,t,this.state.documentTheme),getEdgeMarkerStyle:Re,getEdgeMarkerDimensions:Nt,parseDiagram:e=>me(e,this.state.documentColorScheme),parseDocumentFrontmatter:Dt,resolveDocument:lt,setFrontmatterTheme:Mt,isSafeUrl:gt,renderInline:ue,renderMarkdown:(e,t)=>this.renderMarkdown(e,t),renderDiagram:(e,t)=>this.renderDiagram(e,t),snapToGrid:ne,clampNodeSize:fe,serializeDiagram:Qe,setNodeLabel:qe,setNodeShape:it,setNodeSubtitle:at,setNodeTextAlignment:Be,setNodeStyleOverride:be,setNodeColorPalette:Oe,setNodeSize:Ge,setEdgeLabel:Ae,setEdgeRoute:st,setEdgeAnchor:Ve,setEdgeStyleOverride:Ue,setStyleStrokeWidth:Ye,setEdgeMarkerStart:dt,setEdgeMarkerEnd:ct,validateDocumentSource:Ft,findSourceTextRange:ut,scrollSourceEditorToRange:mt,splitTextLines:ie,renderTextBlock:ee,computeNodeTextLayout:Le,getNodeGeometry:ae,renderNodeBody:Ce,buildEdgePath:xe,buildEdgeInspectorFields:Ct,clampZoom:vt}}createToolbar(){if(!this.outputElement)return;let e=document.createElement("section");e.className="docdiagram-toolbar",e.dataset.editing=String(this.state.editingDiagramIndex!==null),e.dataset.theme=this.state.documentTheme,e.dataset.format=this.state.documentFormat;let t=this.getSelectedNode(),o=t?null:this.getSelectedEdge(),i=!t&&!o?this.getSelectedSequenceElement():null,a=t&&this.state.selectedNode?this.state.diagramModels[this.state.selectedNode.diagramIndex]:o&&this.state.selectedEdge?this.state.diagramModels[this.state.selectedEdge.diagramIndex]:i&&this.state.selectedSequenceElement?this.state.diagramModels[this.state.selectedSequenceElement.diagramIndex]:null;e.innerHTML=['<button type="button" class="docdiagram-menu-toggle" aria-label="Document menu" aria-expanded="false" title="Document menu">\u2630</button>','<div class="docdiagram-menu" hidden>','<label class="docdiagram-theme-control">Theme<select class="docdiagram-theme-select">',`<option value="light"${this.state.documentTheme==="light"?" selected":""}>Light</option>`,`<option value="dark"${this.state.documentTheme==="dark"?" selected":""}>Dark</option>`,"</select></label>",'<label class="docdiagram-theme-control">Format<select class="docdiagram-format-select">',`<option value="centered"${this.state.documentFormat==="centered"?" selected":""}>Centered</option>`,`<option value="full-width"${this.state.documentFormat==="full-width"?" selected":""}>Full width</option>`,"</select></label>",'<button type="button" class="docdiagram-edit-source">Edit source</button>','<button type="button" class="docdiagram-save">Save As</button>','<button type="button" class="docdiagram-offline-save" disabled>Save for Offline (coming soon)</button>',"</div>",t&&a?.type==="flowchart"?`<div class="docdiagram-inspector" data-kind="node">${tr(a,t,this.state.documentColorScheme)}</div>`:o&&a?`<div class="docdiagram-inspector" data-kind="edge">${Ct(a,o)}</div>`:i&&a?`<div class="docdiagram-inspector" data-kind="sequence">${rr(a,this.state.selectedSequenceElement,i,this.state.documentColorScheme)}</div>`:""].join("");let n=e.querySelector(".docdiagram-menu-toggle"),s=e.querySelector(".docdiagram-menu");n?.addEventListener("click",()=>{if(!s)return;let d=s.hidden;s.hidden=!d,n.setAttribute("aria-expanded",String(d))}),e.querySelector(".docdiagram-save")?.addEventListener("click",()=>this.downloadDocument()),e.querySelector(".docdiagram-edit-source")?.addEventListener("click",()=>{this.closeDocumentMenu(),this.sourceEditor?.open()}),e.querySelector(".docdiagram-theme-select")?.addEventListener("change",d=>{this.setSource(Mt(this.getSource(),d.currentTarget.value)),this.renderDocument()}),e.querySelector(".docdiagram-format-select")?.addEventListener("change",d=>{this.state.documentFormat=d.currentTarget.value==="full-width"?"full-width":"centered",this.renderDocument()}),this.outputElement.before(e),t&&this.state.selectedNode?(or(this,e,this.state.selectedNode.diagramIndex,this.state.selectedNode.nodeId),this.positionInspector(this.state.selectedNode.diagramIndex)):o&&this.state.selectedEdge?(nr(this,e,this.state.selectedEdge.diagramIndex,this.state.selectedEdge.edgeIndex),this.positionInspector(this.state.selectedEdge.diagramIndex)):i&&this.state.selectedSequenceElement&&(ir(this,e,i),this.positionInspector(this.state.selectedSequenceElement.diagramIndex)),this.wireChromeControls()}getSelectedNode(){let e=this.state.selectedNode,t=e?this.state.diagramModels[e.diagramIndex]:null;return e&&t?.type==="flowchart"&&Ee(this.state,e.diagramIndex)&&I(t,e.nodeId)?.node||null}getSelectedEdge(){let e=this.state.selectedEdge,t=e?this.state.diagramModels[e.diagramIndex]:null;return e&&t?.type==="flowchart"&&Ee(this.state,e.diagramIndex)&&t.edges[e.edgeIndex]||null}getSelectedSequenceElement(){let e=this.state.selectedSequenceElement,t=e?this.state.diagramModels[e.diagramIndex]:null;return!e||t?.type!=="sequence"||!Ee(this.state,e.diagramIndex)?null:e.kind==="participant"?t.participants?.find(o=>o.id===e.id)||null:e.kind==="message"?t.messages?.[e.index]||null:t.notes?.[e.index]||null}wireChromeControls(){if(this.outputElement){for(let e of this.outputElement.querySelectorAll(".docdiagram-zoom-in, .docdiagram-zoom-out"))e.addEventListener("click",()=>{let t=Number(e.dataset.diagramIndex),o=this.state.diagramZooms.get(t)||100,i=e.classList.contains("docdiagram-zoom-in")?25:-25;this.state.diagramZooms.set(t,vt(o+i)),this.renderDocument()});for(let e of this.outputElement.querySelectorAll(".docdiagram-fit"))e.addEventListener("click",()=>{this.state.diagramZooms.set(Number(e.dataset.diagramIndex),100),this.renderDocument()});for(let e of this.outputElement.querySelectorAll(".docdiagram-start-editing"))e.addEventListener("click",()=>{let t=Number(e.closest(".docdiagram")?.getAttribute("data-diagram-index")),o=this.state.diagramModels[t];o&&(this.state.editSessionDiagram=me(Qe(o),this.state.documentColorScheme),this.state.editingDiagramIndex=t,we(this.state),this.renderDocument())});for(let e of this.outputElement.querySelectorAll(".docdiagram-done-editing"))e.addEventListener("click",()=>this.exitEditing(this.state.editingDiagramIndex,!1));for(let e of this.outputElement.querySelectorAll(".docdiagram-cancel-editing"))e.addEventListener("click",()=>this.exitEditing(this.state.editingDiagramIndex,!0));for(let e of this.outputElement.querySelectorAll(".docdiagram-create-node"))e.addEventListener("click",()=>this.createNewNode(Number(e.dataset.diagramIndex)))}}exitEditing(e,t){e!==null&&(t&&this.state.editSessionDiagram&&(this.state.diagramModels[e]=this.state.editSessionDiagram,this.persistDiagramModels()),this.state.editingDiagramIndex=null,this.state.editSessionDiagram=null,we(this.state),this.renderDocument())}createNewNode(e){let t=this.state.diagramModels[e];if(!t||t.type!=="flowchart")return;let o=kt(t);this.state.selectedNode={diagramIndex:e,nodeId:o.id},this.state.selectedEdge=null,this.persistDiagramModels(),this.renderDocument()}positionInspector(e){if(!this.outputElement)return;let t=document.querySelector(".docdiagram-inspector"),o=this.outputElement.querySelector(`.docdiagram[data-diagram-index="${e}"]`);!t||!o||(t.style.top=`${Math.max(16,o.getBoundingClientRect().top)}px`)}applyPageTheme(e){document.documentElement.dataset.docdiagramTheme=e,document.body?.dataset&&(document.body.dataset.docdiagramTheme=e)}removeToolbarChrome(){if(this.outputElement)for(;this.outputElement.previousElementSibling?.classList.contains("docdiagram-toolbar");)this.outputElement.previousElementSibling.remove()}};var Ar=document.querySelector("#source"),Lr=document.querySelector("#rendered-document"),ar=new ft(Ar,Lr),Cr=globalThis;Cr.DocDiagramCore=ar.getCoreApi();ar.boot();})();
