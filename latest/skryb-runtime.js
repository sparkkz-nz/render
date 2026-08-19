"use strict";(()=>{var pe=["background","pale","light","neutral","dark","accent-soft","accent","accent-strong","note","success","warning","danger","highlight"],Ke=["flowchart","sequence"],Le=["rounded-rectangle","circle","oval","database","diamond","rhombus","flattened-hexagon","chevron","right-chevron","document"],J=["top","right","bottom","left"],Pe=["orthogonal","straight","curved"],X=["none","arrow","circle"],Ze={start:"none",end:"arrow"},Yt=["top","center"],_t=["left","center","right"],At={width:50,height:20},Mt={width:50,height:20},P={shape:"rounded-rectangle",label:"New node",width:190,height:80},be=(r,e,t,n,o,i,s,a,d,l,u,c,g)=>({background:r,pale:e,light:t,neutral:n,dark:o,"accent-soft":i,accent:s,"accent-strong":a,note:d,success:l,warning:u,danger:c,highlight:g}),m=(r,e,t,n,o,i)=>({label:r,fill:e,stroke:t,text:n,gradient:o,glow:i}),ae={classic:{label:"Classic",light:be(m("Background","#FFFFFF","#D1D5DB","#111827"),m("Pale","#F3F4F6","#9CA3AF","#1F2937"),m("Light","#E5E7EB","#6B7280","#1F2937"),m("Neutral","#D1D5DB","#4B5563","#111827"),m("Dark","#374151","#111827","#F9FAFB"),m("Soft","#DBEAFE","#60A5FA","#1E3A8A"),m("Accent","#BFDBFE","#2563EB","#1E3A8A","#EFF6FF"),m("Strong","#2563EB","#1D4ED8","#FFFFFF","#3B82F6","#60A5FA"),m("Note","#DBEAFE","#2563EB","#1E3A8A"),m("Success","#DCFCE7","#16A34A","#14532D"),m("Warning","#FFEDD5","#EA580C","#7C2D12"),m("Danger","#FEE2E2","#DC2626","#7F1D1D"),m("Highlight","#FEF9C3","#CA8A04","#713F12")),dark:be(m("Background","#111827","#374151","#F9FAFB"),m("Pale","#1F2937","#4B5563","#F3F4F6"),m("Light","#374151","#6B7280","#F9FAFB"),m("Neutral","#4B5563","#9CA3AF","#FFFFFF"),m("Dark","#9CA3AF","#D1D5DB","#111827"),m("Soft","#172554","#3B82F6","#DBEAFE"),m("Accent","#1E3A8A","#60A5FA","#EFF6FF","#172554"),m("Strong","#2563EB","#93C5FD","#FFFFFF","#1D4ED8","#60A5FA"),m("Note","#172554","#60A5FA","#DBEAFE"),m("Success","#052E16","#4ADE80","#DCFCE7"),m("Warning","#431407","#FB923C","#FFEDD5"),m("Danger","#450A0A","#F87171","#FEE2E2"),m("Highlight","#422006","#FACC15","#FEF9C3"))},ice:{label:"Ice",light:be(m("Background","#F8FCFF","#D8EAF4","#123040"),m("Pale","#EDF8FC","#B8DCEB","#123040"),m("Light","#D9F2FF","#88BED7","#123040"),m("Neutral","#B8DCEB","#4A8BAA","#123040"),m("Dark","#21536C","#123040","#F4FBFF"),m("Soft","#DDF5FF","#75C6E8","#0F4C67"),m("Accent","#BDEAFF","#2E91BF","#083B55","#E8F9FF"),m("Strong","#1976A3","#0E5E85","#FFFFFF","#43B3E8","#8DDBF7"),m("Note","#DCEFFF","#3182CE","#123A63"),m("Success","#DDF7EE","#1E9B68","#104B35"),m("Warning","#FFF0D8","#D97918","#6B3510"),m("Danger","#FFE4E7","#D9485F","#651C2A"),m("Highlight","#FFF8C9","#C69A13","#5E4900")),dark:be(m("Background","#0C1D29","#26475A","#E8F7FF"),m("Pale","#112B3A","#376176","#E8F7FF"),m("Light","#173B4D","#4A7B92","#F0FAFF"),m("Neutral","#28576B","#79AFC3","#F4FBFF"),m("Dark","#A3D6E9","#D4F2FF","#0C1D29"),m("Soft","#10384E","#4AB5DF","#DDF7FF"),m("Accent","#15526D","#72CEF2","#ECFBFF","#123C52"),m("Strong","#2186B5","#94DCF5","#FFFFFF","#176A91","#64CEF2"),m("Note","#122E4B","#62A9F5","#DCEFFF"),m("Success","#103D32","#4DD69A","#DDF7EE"),m("Warning","#4B2C0D","#F3A34C","#FFF0D8"),m("Danger","#4B1923","#F07A8C","#FFE4E7"),m("Highlight","#4A3D0A","#E6C54B","#FFF8C9"))},midnight:{label:"Midnight",light:be(m("Background","#F5F7FC","#CAD3E4","#101D38"),m("Pale","#E9EEF8","#B6C4DC","#172744"),m("Light","#D9E2F2","#91A5C5","#172744"),m("Neutral","#C1CEE1","#6F85A6","#14223C"),m("Dark","#243B63","#1B3155","#F5F8FF"),m("Soft","#DCE7FA","#93A9CE","#1A3158"),m("Accent","#C9DBFA","#5E7FB4","#152D54","#D6E3F8"),m("Strong","#345F9D","#2C548D","#FFFFFF","#416EAE","#6F91C2"),m("Note","#DBE7F8","#5277AE","#1D355D"),m("Success","#DDEFE8","#3E886A","#173F31"),m("Warning","#F8E9D1","#B9702D","#5D3513"),m("Danger","#F4E0E5","#AD5570","#591F30"),m("Highlight","#F8F0C9","#A88222","#554300")),dark:be(m("Background","#081426","#1F3554","#E8F0FF"),m("Pale","#0D1C32","#2A4265","#E5EEFF"),m("Light","#132843","#3A557A","#EDF4FF"),m("Neutral","#1E385B","#59779E","#EEF5FF"),m("Dark","#91A9C9","#AFC2DB","#0A172A"),m("Soft","#112B4D","#527AA9","#E1EEFF"),m("Accent","#173B68","#6389BA","#ECF4FF","#1B416E"),m("Strong","#2C629F","#6D98CD","#FFFFFF","#356FAF","#6D98CD"),m("Note","#132A4A","#6D96C8","#DDEAFF"),m("Success","#123B31","#5FBA91","#DDF3E8"),m("Warning","#422C14","#D09150","#FBEAD1"),m("Danger","#431E2B","#D27691","#F8E1E8"),m("Highlight","#403710","#C5A543","#FAF2CA"))},paper:{label:"Paper",light:be(m("Background","#FFFDF7","#E0D8C8","#332D24"),m("Pale","#F7F1E5","#D4C5AD","#40372C"),m("Light","#EEE3D0","#BBA98B","#40372C"),m("Neutral","#D8C8AF","#8C765A","#332D24"),m("Dark","#514536","#332D24","#FFFCF5"),m("Soft","#EEE8DC","#A99879","#44392B"),m("Accent","#E8DDC7","#947044","#3E2D1D","#F7F0E4"),m("Strong","#81592F","#62401F","#FFFFFF","#A77A44","#D3B37B"),m("Note","#E5EFF4","#517B98","#233E50"),m("Success","#E4F0DF","#5D8A54","#294527"),m("Warning","#F9E8CD","#B96B28","#64350D"),m("Danger","#F5E0DA","#AD5342","#5D251C"),m("Highlight","#F8F0BD","#A78216","#584600")),dark:be(m("Background","#29251F","#554B3E","#F9F2E6"),m("Pale","#373027","#6F6250","#F9F2E6"),m("Light","#4A4033","#8B7B64","#FFF9EE"),m("Neutral","#675947","#A89880","#FFF9EE"),m("Dark","#CBBCA4","#E8DBC7","#30291F"),m("Soft","#463B2D","#B6A080","#FFF8E9"),m("Accent","#5C482F","#D1B98A","#FFF9EE","#483622"),m("Strong","#916C3C","#E0C28B","#FFFFFF","#705029","#CFAA69"),m("Note","#273A46","#7DB2D0","#E5EFF4"),m("Success","#31452B","#9BC58F","#E4F0DF"),m("Warning","#503016","#E3A060","#F9E8CD"),m("Danger","#51281F","#DA8A79","#F5E0DA"),m("Highlight","#4A3D12","#D6BC48","#F8F0BD"))}},ct={light:{edge:{stroke:"#52616B",strokeWidth:2,text:"#3E4A54"},node:{fill:"#EAF2FF",stroke:"#3574C7",strokeWidth:2,text:"#17202A"}},dark:{edge:{stroke:"#B8C7D5",strokeWidth:2,text:"#D9E4ED"},node:{fill:"#193A61",stroke:"#71AEF7",strokeWidth:2,text:"#F3F8FC"}}};var Xt=["note","info","warning","success"],Kt={2:"repeat(2, minmax(0, 1fr))",3:"repeat(3, minmax(0, 1fr))","2fr 1fr":"minmax(0, 2fr) minmax(0, 1fr)","1fr 2fr":"minmax(0, 1fr) minmax(0, 2fr)"};var Sr=["nodes","edges","participants","messages","activations","notes","groups"],$r=["id","label","shape","position","size","style","palette","subtitle","textVAlign","textHAlign","children"],vr=["source","target","sourceAnchor","targetAnchor","route","label","style","start","end"],Jt=["fill","stroke","strokeWidth","text"],kr=["stroke","strokeWidth","text"],Fr=["id","label","kind","palette","style","size"],Dr=["actor"],Nr=["from","to","label","style"],Ar=["solid","dashed"],Mr=["participant","from","to"],Tr=["at","after","label","palette","style","size"],Cr=["label","from","to"],qr=["width","height","participantSpacing","participantSize"];function S(r){return String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ze(r){let e=r.trim();if(e.startsWith('"')&&e.endsWith('"'))try{return JSON.parse(e)}catch{throw new Error(`Invalid quoted scalar: ${e}`)}if(e.startsWith("'")&&e.endsWith("'"))return e.slice(1,-1);if(/^-?\d+(\.\d+)?$/.test(e))return Number(e);if(e==="true"||e==="false")return e==="true";if(e.startsWith("{")&&e.endsWith("}")){let t=e.slice(1,-1).trim();if(!t)return{};let n=t.split(","),o={};for(let i of n){let s=i.indexOf(":");if(s===-1)throw new Error(`Invalid inline mapping: ${e}`);let a=i.slice(0,s).trim();o[a]=ze(i.slice(s+1))}return o}return e}function Se(r,e="classic"){let n=r.replace(/\r\n/g,`
`).split(`
`).filter(g=>g.trim()&&!g.trimStart().startsWith("#"));for(let g of n){if(g.trimStart()!==g||!g.trimEnd().endsWith(":"))continue;let x=g.trim().slice(0,-1);if(x!=="canvas"&&!Sr.includes(x))throw new Error(`Unsupported diagram section: ${x}`)}let o=0,i=g=>g.length-g.trimStart().length,s=g=>g.trim().match(/^([^:]+):\s*(.*)$/),a=g=>g.trim().match(/^- ([^:]+):\s*(.*)$/),d=g=>o>=n.length||i(n[o])<=g?{}:n[o].trimStart().startsWith("- ")?u(i(n[o])):l(i(n[o])),l=g=>{let x={};for(;o<n.length&&i(n[o])===g;){let f=n[o],h=s(f);if(!h)throw new Error(`Cannot parse diagram line: ${f}`);o+=1,x[h[1]]=h[2]?ze(h[2]):d(g)}return x},u=g=>{let x=[];for(;o<n.length&&i(n[o])===g;){let f=n[o],h=a(f);if(!h)throw new Error(`Cannot parse diagram line: ${f}`);o+=1;let v={[h[1]]:h[2]?ze(h[2]):d(g)};for(;o<n.length&&i(n[o])>g;){let w=i(n[o]),p=s(n[o]);if(!p)throw new Error(`Cannot parse diagram line: ${n[o]}`);o+=1,v[p[1]]=p[2]?ze(p[2]):d(w)}x.push(v)}return x},c=l(0);if(!c.type)throw new Error(`Diagram type is required and must be one of: ${Ke.join(", ")}.`);if(typeof c.type!="string"||!Ke.includes(c.type))throw new Error(`Unsupported diagram type: ${String(c.type)}`);return c.type==="flowchart"?Lr(c,e):Pr(c,e)}function Lr(r,e="classic"){return r.canvas=r.canvas||{},Array.isArray(r.nodes)||(r.nodes=[]),Array.isArray(r.edges)||(r.edges=[]),zr(r,e),r}function Pr(r,e="classic"){return Br(r,e),r}function le(r,e,t){for(let n of Object.keys(r||{}))if(!e.includes(n))throw new Error(`Unsupported ${t} field: ${n}`)}function Tt(r,e,t){if(r){for(let n of Object.keys(r))if(!e.includes(n))throw new Error(`Unsupported ${t} style field: ${n}`)}}function zr(r,e="classic"){if(r.participants!==void 0||r.messages!==void 0||r.activations!==void 0||r.notes!==void 0||r.groups!==void 0)throw new Error("Flowchart diagrams do not support sequence sections.");let t=new Set,n=o=>{if("type"in o)throw new Error(`Node "${o.id||"unknown"}" uses removed field "type".`);if(le(o,$r,`node "${o.id||"unknown"}"`),!o.id||typeof o.label!="string")throw new Error("Every node requires an id and a string label.");if(!o.shape)throw new Error(`Node "${o.id}" requires a shape.`);if(!Le.includes(o.shape))throw new Error(`Unsupported node shape: ${o.shape}`);if(o.textVAlign!==void 0&&!Yt.includes(o.textVAlign))throw new Error(`Unsupported node textVAlign: ${o.textVAlign}`);if(o.textHAlign!==void 0&&!_t.includes(o.textHAlign))throw new Error(`Unsupported node textHAlign: ${o.textHAlign}`);if(o.palette!==void 0&&(typeof o.palette!="string"||!pe.includes(o.palette)))throw new Error(`Unsupported node palette: ${String(o.palette||"unknown")}`);if(o.style?.width!==void 0)throw new Error("Node style.width is not supported; use style.strokeWidth.");if(Tt(o.style,Jt,`node "${o.id}"`),t.has(o.id))throw new Error(`Duplicate flowchart node id: ${o.id}`);if(t.add(o.id),o.children!==void 0&&!Array.isArray(o.children))throw new Error(`Children for node "${o.id}" must be a list.`);for(let i of o.children||[])n(i)};for(let o of r.nodes)n(o);for(let o of r.edges){if(le(o,vr,`edge "${o.source||"unknown"}" -> "${o.target||"unknown"}"`),!o.sourceAnchor)throw new Error(`Edge "${o.source||"unknown"}" -> "${o.target||"unknown"}" requires a sourceAnchor.`);if(!o.targetAnchor)throw new Error(`Edge "${o.source||"unknown"}" -> "${o.target||"unknown"}" requires a targetAnchor.`);if(!J.includes(o.sourceAnchor))throw new Error(`Unsupported edge sourceAnchor: ${o.sourceAnchor}`);if(!J.includes(o.targetAnchor))throw new Error(`Unsupported edge targetAnchor: ${o.targetAnchor}`);if(o.route!==void 0&&!Pe.includes(o.route))throw new Error(`Unsupported edge route: ${o.route}`);if(o.start!==void 0&&!X.includes(o.start))throw new Error(`Unsupported edge start marker: ${o.start}`);if(o.end!==void 0&&!X.includes(o.end))throw new Error(`Unsupported edge end marker: ${o.end}`);if(o.style?.width!==void 0)throw new Error("Edge style.width is not supported; use style.strokeWidth.");Tt(o.style,kr,`edge "${o.source||"unknown"}" -> "${o.target||"unknown"}"`)}}function Br(r,e="classic"){if(r.nodes!==void 0||r.edges!==void 0)throw new Error("Sequence diagrams do not support flowchart sections.");if(!Array.isArray(r.participants)||!Array.isArray(r.messages))throw new Error("Sequence diagrams require participants and messages sections.");if(r.activations!==void 0&&!Array.isArray(r.activations))throw new Error("Sequence diagram activations must be a list.");if(r.notes!==void 0&&!Array.isArray(r.notes))throw new Error("Sequence diagram notes must be a list.");if(r.groups!==void 0&&!Array.isArray(r.groups))throw new Error("Sequence diagram groups must be a list.");if(r.canvas!==void 0&&(typeof r.canvas!="object"||Array.isArray(r.canvas)))throw new Error("Sequence canvas must be a mapping.");le(r.canvas,qr,"sequence canvas");for(let n of["width","height","participantSpacing"]){let o=r.canvas?.[n];if(o!==void 0&&(!Number.isFinite(o)||Number(o)<=0))throw new Error(`Sequence canvas.${n} must be a positive number.`)}if(r.canvas?.participantSize!==void 0){if(typeof r.canvas.participantSize!="object"||Array.isArray(r.canvas.participantSize))throw new Error("Sequence canvas.participantSize must be a mapping.");le(r.canvas.participantSize,["width","height"],"sequence canvas participantSize");for(let n of["width","height"]){let o=r.canvas.participantSize[n];if(o!==void 0&&(!Number.isFinite(o)||Number(o)<=0))throw new Error(`Sequence canvas.participantSize.${n} must be a positive number.`)}}let t=new Set;for(let n of r.participants){if(le(n,Fr,`participant "${n.id||"unknown"}"`),!n.id||!n.label)throw new Error("Every sequence participant requires an id and label.");if(n.kind!==void 0&&!Dr.includes(n.kind))throw new Error(`Unsupported sequence participant kind: ${n.kind}`);if(Zt(n,`participant "${n.id}"`,e),t.has(n.id))throw new Error(`Duplicate sequence participant id: ${n.id}`);t.add(n.id)}for(let[n,o]of r.messages.entries()){if(le(o,Nr,`message ${n}`),!o.from||!o.to||!o.label)throw new Error(`Sequence message ${n} requires from, to, and label.`);if(!t.has(o.from)||!t.has(o.to))throw new Error(`Sequence message ${n} references an unknown participant.`);if(o.style!==void 0&&!Ar.includes(o.style))throw new Error(`Unsupported sequence message style: ${o.style}`)}for(let[n,o]of(r.activations||[]).entries()){if(le(o,Mr,`activation ${n}`),!o.participant||!Number.isInteger(o.from)||!Number.isInteger(o.to))throw new Error(`Sequence activation ${n} requires participant and integer from and to message positions.`);if(!t.has(o.participant))throw new Error(`Sequence activation ${n} references an unknown participant.`);if(o.from<1||o.to<o.from||o.to>r.messages.length)throw new Error(`Sequence activation ${n} range is out of bounds.`)}for(let[n,o]of(r.notes||[]).entries()){le(o,Tr,`note ${n}`);let i=o.after;if(!o.at||!Number.isInteger(i)||!o.label)throw new Error(`Sequence note ${n} requires at, after, and label.`);if(Zt(o,`note ${n}`,e),!t.has(o.at))throw new Error(`Sequence note ${n} references an unknown participant.`);if(i<0||i>r.messages.length)throw new Error(`Sequence note ${n} after position is out of bounds.`)}for(let[n,o]of(r.groups||[]).entries()){if(le(o,Cr,`group ${n}`),!o.label&&o.label!=="")throw new Error(`Sequence group ${n} requires a label.`);if(!Number.isInteger(o.from)||!Number.isInteger(o.to))throw new Error(`Sequence group ${n} requires integer from and to indices.`);if(o.from<1||o.to<o.from||o.to>r.messages.length)throw new Error(`Sequence group ${n} range is out of bounds.`)}}function Zt(r,e,t="classic"){if(r.palette!==void 0){let n=String(r.palette||"");if(!pe.includes(n))throw new Error(`Unsupported ${e} palette: ${n||"unknown"}`)}if(Tt(r.style,Jt,e),r.size){le(r.size,["width","height"],`size for ${e}`);for(let n of["width","height"]){let o=r.size[n];if(o!==void 0&&(!Number.isFinite(o)||Number(o)<=0))throw new Error(`${e} size.${n} must be a positive number.`)}}}function $e(r){return typeof r=="number"||typeof r=="boolean"?String(r):r&&typeof r=="object"?Object.keys(r).length?`{ ${Object.entries(r).map(([e,t])=>`${e}: ${$e(t)}`).join(", ")} }`:"{}":/^[\w./-]+(?: [\w./-]+)*$/.test(String(r))?String(r):JSON.stringify(String(r))}function ye(r,e=2){let t=Object.entries(r),[n,o]=t[0],i=[`${" ".repeat(e)}- ${n}: ${$e(o)}`];for(let[s,a]of t.slice(1))if(!(s==="children"&&Array.isArray(a)&&!a.length))if(s==="children"&&Array.isArray(a)){i.push(`${" ".repeat(e+2)}children:`);for(let d of a)i.push(...ye(d,e+4))}else i.push(`${" ".repeat(e+2)}${s}: ${$e(a)}`);return i}function lt(r){let e=[`type: ${$e(r.type)}`];for(let[t,n]of Object.entries(r))t==="type"||t==="canvas"||t==="nodes"||t==="edges"||t==="participants"||t==="messages"||t==="activations"||t==="notes"||t==="groups"||e.push(`${t}: ${$e(n)}`);if(r.type==="sequence"){if(r.canvas!==void 0){e.push("canvas:");for(let[t,n]of Object.entries(r.canvas))e.push(`  ${t}: ${$e(n)}`)}e.push("participants:");for(let t of r.participants||[])e.push(...ye(t));e.push("messages:");for(let t of r.messages||[])e.push(...ye(t));if(r.activations!==void 0){e.push("activations:");for(let t of r.activations||[])e.push(...ye(t))}if(r.notes!==void 0){e.push("notes:");for(let t of r.notes||[])e.push(...ye(t))}if(r.groups!==void 0){e.push("groups:");for(let t of r.groups||[])e.push(...ye(t))}return e.join(`
`)}e.push("canvas:");for(let[t,n]of Object.entries(r.canvas||{}))e.push(`  ${t}: ${$e(n)}`);e.push("nodes:");for(let t of r.nodes||[])e.push(...ye(t));e.push("edges:");for(let t of r.edges||[])e.push(...ye(t));return e.join(`
`)}function Qt(r){return{width:Number(r.size?.width)||P.width,height:Number(r.size?.height)||P.height}}function V(r){let e=[],t=(n,o,i,s)=>{for(let a of n){let d={x:i.x+(Number(a.position?.x)||0),y:i.y+(Number(a.position?.y)||0)};e.push({node:a,parent:o,siblings:n,position:d,depth:s}),t(a.children||[],a,d,s+1)}};return t(r.nodes,null,{x:0,y:0},0),e}function G(r,e){return V(r).find(t=>t.node.id===e)||null}function Ct(r,e){return V(r).find(t=>t.node===e)?.position||{x:0,y:0}}function _(r,e){return{...Ct(r,e),...Qt(e)}}function er(r,e){return(e.children||[]).some(t=>t===r||er(r,t))}function ut(r,e){var g;let t=G(r,e);if(!t)return null;let{node:n,siblings:o,position:i}=t,{width:s,height:a}=Qt(n),d={x:i.x+s/2,y:i.y+a/2},u=V(r).filter(x=>x.node!==n&&!er(x.node,n)).filter(x=>{let f=_(r,x.node);return d.x>=f.x&&d.x<=f.x+f.width&&d.y>=f.y&&d.y<=f.y+f.height}).reduce((x,f)=>!x||f.depth>=x.depth?f:x,null),c=u?(g=u.node).children||(g.children=[]):r.nodes;return o===c||(o.splice(o.indexOf(n),1),n.position={x:i.x-(u?.position.x||0),y:i.y-(u?.position.y||0)},c.push(n)),n}function mt(r){if(r==="light"||r==="dark")return r;if(r==="auto")return globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches?"dark":"light";throw new Error(`Unsupported document theme: ${r}`)}function ke(r,e="light"){let t=mt(e),n=ct[t];if(!n)throw new Error(`Unsupported diagram theme: ${t}`);return n}function Q(r,e,t){return ae[r]?.[mt(e)]?.[t]||null}function ve(r,e){return{...r,...e||{}}}function xe(r,e,t="light",n="classic"){let i=ke(r,t).node,s=e.palette?Q(n,t,e.palette):null;return ve(ve(i,s),e.style)}function Be(r,e,t="light",n="classic"){let o=ke(r,t),i=e.palette?Q(n,t,e.palette):null;return ve(ve(o.node,i),e.style)}function Ie(r,e,t="light"){let n=ke(r,t);return ve(n.edge,e.style)}function Je(r,e){let t=e==="start"?r.start:r.end;return typeof t=="string"&&X.includes(t)?t:Ze[e]}function se(r){let e=Number(r.canvas?.grid);return Number.isFinite(e)&&e>0?e:0}function ee(r,e){return e?Math.round(r/e)*e:Math.round(r)}function Re(r,e,t){let n=ee(r,t),o=t?Math.ceil(e/t)*t:e;return Math.max(o,n)}function tr(r){return{x:Number(r.position?.x)||0,y:Number(r.position?.y)||0,width:Number(r.size?.width)||P.width,height:Number(r.size?.height)||P.height}}function He(r,e,t=40){let n=Number(r.canvas?.width)||1e3,o=Number(r.canvas?.height)||560,i=new Set(V(r).map(f=>f.node)),s=[...i];s.includes(e)||s.push(e);let a=f=>i.has(f)?_(r,f):tr(f),d=s.map(a),l=Math.min(0,...d.map(f=>f.x)),u=Math.min(0,...d.map(f=>f.y)),c=l<0?t-l:0,g=u<0?t-u:0;if(c||g)for(let f of V(r).filter(h=>h.parent===null)){let h=f.node;h.position={...h.position,x:(Number(h.position?.x)||0)+c,y:(Number(h.position?.y)||0)+g}}let x=s.map(a);return r.canvas={...r.canvas,width:Math.max(n+c,...x.map(f=>f.x+f.width+t)),height:Math.max(o+g,...x.map(f=>f.y+f.height+t))},r}function rr(r,e){return r.x<e.x+e.width&&r.x+r.width>e.x&&r.y<e.y+e.height&&r.y+r.height>e.y}function qt(r,e="new-node"){let t=i=>i.flatMap(s=>[s.id,...t(s.children||[])]),n=new Set(t(r));if(!n.has(e))return e;let o=2;for(;n.has(`${e}-${o}`);)o+=1;return`${e}-${o}`}function Ir(r,e){let t=e.replace(/[^a-z0-9]/gi,"").toLowerCase()||"node",n=1,o="";do o=`${t}${String(n).padStart(2,"0")}`,n+=1;while(r.has(o));return r.add(o),o}function Rr(r,e,t,n){let o=Number(r.canvas?.width)||1e3,i=Number(r.canvas?.height)||560,s=se(r),a=s||20,d={x:ee(n.x,s),y:ee(n.y,s)};for(let u=a;u<=Math.max(o,i);u+=a)for(let c of[{x:d.x+u,y:d.y+u},{x:d.x+u,y:d.y-u},{x:d.x-u,y:d.y+u},{x:d.x-u,y:d.y-u}])if(!(c.x<0||c.y<0||c.x+e>o||c.y+t>i)&&!V(r).some(({node:g})=>rr({...c,width:e,height:t},_(r,g))))return c;let l=Math.max(0,...V(r).map(({node:u})=>{let c=_(r,u);return c.x+c.width}));return{x:ee(l+a,s),y:0}}function Lt(r){let e=Number(r.canvas?.width)||1e3,t=Number(r.canvas?.height)||560,n=se(r),o={x:ee(Math.max(0,(e-P.width)/2),n),y:ee(Math.max(0,(t-P.height)/2),n)},i=n||20;for(let s=0;s<=Math.max(e,t);s+=i)for(let a of[{x:o.x+s,y:o.y},{x:o.x-s,y:o.y},{x:o.x,y:o.y+s},{x:o.x,y:o.y-s}])if(!(a.x<0||a.y<0||a.x+P.width>e||a.y+P.height>t)&&!V(r).some(({node:d})=>rr({...a,width:P.width,height:P.height},tr(d))))return a;return o}function Pt(r){let e={id:qt(r.nodes),label:P.label,shape:P.shape,position:Lt(r),size:{width:P.width,height:P.height}};return r.nodes.push(e),e}function je(r,e){let t=G(r,e);if(!t)return null;let n=new Set(V(r).map(({node:l})=>l.id)),o=l=>({id:Ir(n,l.shape),label:l.label,shape:l.shape,...l.position?{position:{...l.position}}:{},...l.size?{size:{...l.size}}:{},...l.style?{style:{...l.style}}:{},...l.palette?{palette:l.palette}:{},...l.subtitle!==void 0?{subtitle:l.subtitle}:{},...l.textVAlign!==void 0?{textVAlign:l.textVAlign}:{},...l.textHAlign!==void 0?{textHAlign:l.textHAlign}:{},...l.children?{children:l.children.map(o)}:{}}),i=o(t.node),s=_(r,t.node),a=Rr(r,Number(i.size?.width)||P.width,Number(i.size?.height)||P.height,s),d=t.parent?Ct(r,t.parent):{x:0,y:0};return i.position={x:a.x-d.x,y:a.y-d.y},t.siblings.push(i),He(r,i),i}function gt(r,e,t,n,o){let i={source:e,target:n,sourceAnchor:t,targetAnchor:o,route:"orthogonal",end:"arrow"};return r.edges.push(i),i}function ht(r,e,t,n){return e==="source"?(r.source=t,r.sourceAnchor=n):(r.target=t,r.targetAnchor=n),r}function Oe(r,e){return e<0||e>=r.edges.length?null:r.edges.splice(e,1)[0]}function Ve(r,e){let t=G(r,e);if(!t)return{node:null,deletedEdges:[]};let n=new Set([t.node,...t.node.children||[]].flatMap(function i(s){return[s,...(s.children||[]).flatMap(i)]}).map(i=>i.id)),o=r.edges.filter(i=>n.has(i.source)||n.has(i.target));return t.siblings.splice(t.siblings.indexOf(t.node),1),r.edges=r.edges.filter(i=>!n.has(i.source)&&!n.has(i.target)),{node:e,deletedEdges:o}}function Ge(r,e){return r.label=String(e).trim(),r}function pt(r,e){return r.shape=e,r}function ft(r,e){return r.subtitle=String(e??"").trim(),r}function Qe(r,e,t){return e==="textVAlign"&&(t==="top"||t==="center")&&(r.textVAlign=t),e==="textHAlign"&&(t==="left"||t==="center"||t==="right")&&(r.textHAlign=t),r}function Fe(r,e,t){return r.style={...r.style,[e]:t},r}function et(r,e,t="classic"){if(!Q(t,"light",e))return r;let{fill:o,stroke:i,text:s,...a}=r.style||{};return Object.keys(a).length?r.style=a:delete r.style,r.palette=e,r}function or(r){return r==="document"?Mt:At}function tt(r){return{position:{x:Number(r.position?.x)||0,y:Number(r.position?.y)||0},size:{width:Number(r.size?.width)||P.width,height:Number(r.size?.height)||P.height},childPositions:new Map((r.children||[]).map(e=>[e,{x:Number(e.position?.x)||0,y:Number(e.position?.y)||0}]))}}function bt(r,e,t,n,o,i=tt(e)){let s=se(r),a=or(e.shape),d=t.endsWith("left"),l=t.startsWith("top"),u=Re(i.size.width+(d?-n:n),a.width,s),c=Re(i.size.height+(l?-o:o),a.height,s);if(e.shape==="circle"){let h=Math.max(u,c);u=h,c=h}let g={...e.position,x:d?i.position.x+i.size.width-u:i.position.x,y:l?i.position.y+i.size.height-c:i.position.y},x=i.position.x-g.x,f=i.position.y-g.y;for(let h of e.children||[]){let v=i.childPositions.get(h)||h.position||{x:0,y:0};h.position={...h.position,x:v.x+x,y:v.y+f}}return e.position=g,e.size={...e.size,width:u,height:c},e}function rt(r,e,t,n){let o=se(r),i=or(e.shape),s=t==="width"?i.width:i.height,a=Re(Number(n)||s,s,o);return e.size=e.shape==="circle"?{...e.size,width:a,height:a}:{...e.size,[t]:a},e}function We(r,e){return r.label=String(e).trim(),r}function yt(r,e){return r.route=e,r}function ot(r,e,t){return e==="source"?r.sourceAnchor=t:r.targetAnchor=t,r}function nt(r,e,t){return r.style={...r.style,[e]:t},r}function it(r,e){let t=Math.max(1,Math.round(Number(e))||1);return r.style={...r.style,strokeWidth:t},r}function xt(r,e){return r.start=X.includes(e)?e:Ze.start,r}function wt(r,e){return r.end=X.includes(e)?e:Ze.end,r}function zt(r){return Math.max(25,Number(r)||100)}function de(r){return String(r??"").replace(/\r\n/g,`
`).split(`
`)}function te(r,e,t,n,o,i,s="middle"){if(!t.length)return"";let a=t.map((d,l)=>{let u=l===0?"":` dy="${n}"`;return`<tspan x="${r}"${u}>${S(d)||" "}</tspan>`}).join("");return`<text x="${r}" y="${e}" text-anchor="${s}" class="${o}" fill="${S(i)}">${a}</text>`}function fe(r,e,t,n,o){let i=r.shape,s=e+n/2,a=t+o/2,d={x:e+12,y:t+12,width:n-24,height:o-24},l={top:{x:s,y:t},right:{x:e+n,y:a},bottom:{x:s,y:t+o},left:{x:e,y:a}},u;if(i==="circle"){let c=Math.min(n,o),g=s-c/2,x=a-c/2,f=c/2;d.x=g+f*.3,d.y=x+f*.3,d.width=f*1.4,d.height=f*1.4,l.top.y=x,l.right.x=g+c,l.bottom.y=x+c,l.left.x=g,u=`<circle class="docdiagram-node-body" cx="${s}" cy="${a}" r="${f}"/>`}else if(i==="oval")d.x+=n*.1,d.width-=n*.2,u=`<ellipse class="docdiagram-node-body" cx="${s}" cy="${a}" rx="${n/2}" ry="${o/2}"/>`;else if(i==="database"){let c=Math.min(o*.22,18);d.y+=c/2,d.height-=c,u=`<path class="docdiagram-node-body" d="M ${e} ${t+c} C ${e} ${t-c/3} ${e+n} ${t-c/3} ${e+n} ${t+c} V ${t+o-c} C ${e+n} ${t+o+c/3} ${e} ${t+o+c/3} ${e} ${t+o-c} Z"/><path class="docdiagram-node-detail" d="M ${e} ${t+c} C ${e} ${t+c*2.3} ${e+n} ${t+c*2.3} ${e+n} ${t+c}" fill="none"/>`}else if(i==="diamond")d.x+=n*.25,d.y+=o*.25,d.width-=n*.5,d.height-=o*.5,l.top={x:s,y:t},l.right={x:e+n,y:a},l.bottom={x:s,y:t+o},l.left={x:e,y:a},u=`<polygon class="docdiagram-node-body" points="${s},${t} ${e+n},${a} ${s},${t+o} ${e},${a}"/>`;else if(i==="rhombus"){let c=Math.min(n*.2,o*.6);d.x+=c,d.width-=c*2,l.left.x=e+c/2,l.right.x=e+n-c/2,u=`<polygon class="docdiagram-node-body" points="${e+c},${t} ${e+n},${t} ${e+n-c},${t+o} ${e},${t+o}"/>`}else if(i==="flattened-hexagon"){let c=Math.min(n*.18,o*.7);d.x+=c,d.width-=c*2,u=`<polygon class="docdiagram-node-body" points="${e+c},${t} ${e+n-c},${t} ${e+n},${a} ${e+n-c},${t+o} ${e+c},${t+o} ${e},${a}"/>`}else if(i==="chevron"){let c=Math.min(n*.16,o*.45);d.x+=c*1.175,d.width-=c*1.35,l.left.x=e+c,u=`<polygon class="docdiagram-node-body" points="${e},${t} ${e+n-c},${t} ${e+n},${a} ${e+n-c},${t+o} ${e},${t+o} ${e+c},${a}"/>`}else if(i==="right-chevron"){let c=Math.min(n*.16,o*.45);d.width-=c,u=`<polygon class="docdiagram-node-body" points="${e},${t} ${e+n-c},${t} ${e+n},${a} ${e+n-c},${t+o} ${e},${t+o}"/>`}else if(i==="document"){let c=Math.max(12,Math.min(26,Math.min(n,o)*.18));d.width-=c*.45,d.y+=2,d.height-=2,u=`<path class="docdiagram-node-body" d="M ${e} ${t} H ${e+n-c} L ${e+n} ${t+c} V ${t+o} H ${e} Z M ${e+n-c} ${t} V ${t+c} H ${e+n}"/>`}else u=`<rect class="docdiagram-node-body" x="${e}" y="${t}" width="${n}" height="${o}" rx="12"/>`;return{bodyMarkup:u,textBounds:d,anchors:l}}function Ue(r,e,t,n,o){let i,s;typeof r=="number"?(i={x:r,y:e,width:t||0,height:n||0},s=o):(i=r,s=e);let a=20,d=15,l=de(s.label),u=s.subtitle?de(s.subtitle):[],c=u.length?6:0,g=l.length*a,x=u.length*d,f=g+c+x,h=s.textHAlign||"center",v=h==="left"?i.x:h==="right"?i.x+i.width:i.x+i.width/2,w=h==="left"?"start":h==="right"?"end":"middle",p=i.y+i.height/2,$=s.textVAlign==="top"?i.y:p-f/2;return{centerX:v,textAnchor:w,labelLines:l,subtitleLines:u,labelLineHeight:a,subtitleLineHeight:d,labelStartY:$+a*.72,subtitleStartY:$+g+c+d*.72}}function Ye(r,e,t){return r.bodyMarkup.replace("/>",` fill="${S(e.fill||"")}" stroke="${S(e.stroke||"")}" stroke-width="${t}"/>`).replace('class="docdiagram-node-detail"',`class="docdiagram-node-detail" stroke="${S(e.stroke||"")}" stroke-width="${t}"`)}function nr(r){return{top:{x:0,y:-1},right:{x:1,y:0},bottom:{x:0,y:1},left:{x:-1,y:0}}[r]}function we(r){return`${r.x} ${r.y}`}function Hr(r){let e=r.slice(1).map((o,i)=>{let s=r[i];return{start:s,end:o,length:Math.hypot(o.x-s.x,o.y-s.y)}}),n=e.reduce((o,i)=>o+i.length,0)/2;for(let o of e){if(n<=o.length||o===e[e.length-1]){let i=o.length?n/o.length:0;return{x:o.start.x+(o.end.x-o.start.x)*i,y:o.start.y+(o.end.y-o.start.y)*i}}n-=o.length}return r[0]}function De(r,e,t,n,o="orthogonal"){let i=nr(t),s=nr(n),a=i.x!==0,d,l,u,c;if(o==="straight")d=`M ${we(r)} L ${we(e)}`,l={x:(r.x+e.x)/2,y:(r.y+e.y)/2},u={x:e.x-r.x,y:e.y-r.y},c=u;else if(o==="curved"){let g=Math.max(Math.abs(e.x-r.x),Math.abs(e.y-r.y),80),x=Math.min(g/2,140),f={x:r.x+i.x*x,y:r.y+i.y*x},h={x:e.x+s.x*x,y:e.y+s.y*x};d=`M ${we(r)} C ${we(f)} ${we(h)} ${we(e)}`,l={x:(r.x+3*f.x+3*h.x+e.x)/8,y:(r.y+3*f.y+3*h.y+e.y)/8},u={x:f.x-r.x,y:f.y-r.y},c={x:e.x-h.x,y:e.y-h.y}}else{let g=s.x!==0,x=a===g,f=i.x===s.x&&i.y===s.y,h=Math.max(Math.abs(e.x-r.x),Math.abs(e.y-r.y)),v;if(x){let $=a?r.x:r.y,b=a?e.x:e.y,D=a?i.x:i.y,T=a?s.x:s.y,M=f?D>0?Math.max($,b)+h/2:Math.min($,b)-h/2:($+b)/2,B=Math.sign(M-$),E=Math.sign(b-M);if(!f&&(B!==D||E!==-T)){let A=h/2,F={x:r.x+i.x*A,y:r.y+i.y*A},z={x:e.x+s.x*A,y:e.y+s.y*A};v=a?[r,F,{x:F.x,y:Math.min(r.y,e.y)-A},{x:z.x,y:Math.min(r.y,e.y)-A},z,e]:[r,F,{x:Math.min(r.x,e.x)-A,y:F.y},{x:Math.min(r.x,e.x)-A,y:z.y},z,e]}else v=a?[r,{x:M,y:r.y},{x:M,y:e.y},e]:[r,{x:r.x,y:M},{x:e.x,y:M},e]}else{let $=h/4,b={x:r.x+i.x*$,y:r.y+i.y*$},D={x:e.x+s.x*$,y:e.y+s.y*$};v=a?[r,b,{x:D.x,y:b.y},D,e]:[r,b,{x:b.x,y:D.y},D,e]}let w=v.filter(($,b)=>b===0||$.x!==v[b-1].x||$.y!==v[b-1].y);w.length===1&&(w=[r,e]),d=`M ${we(w[0])}${w.slice(1).map($=>` L ${we($)}`).join("")}`,l=Hr(w),u={x:w[1].x-w[0].x,y:w[1].y-w[0].y};let p=w.slice(-2);c={x:p[1].x-p[0].x,y:p[1].y-p[0].y}}return{path:d,midpoint:l,startTangent:u,endTangent:c,hitPath:d}}function Bt(r){let e=Math.max(1,Number(r)||2),t=6+e*2.5,n=Math.max(t*.38,e/2+1);return{size:t,circleRadius:n}}function at(r,e,t,n,o){let i=S(n),{size:s,circleRadius:a}=Bt(o),d=s/2;return e==="arrow"?`<marker id="${r}" markerWidth="${s}" markerHeight="${s}" refX="${s}" refY="${d}" markerUnits="userSpaceOnUse" orient="${t==="start"?"auto-start-reverse":"auto"}"><path fill="${i}" stroke="${i}" d="M 0 0 L ${s} ${d} L 0 ${s} z"/></marker>`:e==="circle"?`<marker id="${r}" markerWidth="${s}" markerHeight="${s}" refX="${d}" refY="${d}" markerUnits="userSpaceOnUse"><circle cx="${d}" cy="${d}" r="${a}" fill="${i}" stroke="${i}"/></marker>`:""}function It(r){let e=r.replace(/\r\n/g,`
`).split(`
`),t=e.findIndex(i=>i.trim()!=="");if(t===-1||e[t]!=="---")return{content:r,frontmatter:{}};let n=e.indexOf("---",t+1);if(n===-1)return{content:r,frontmatter:{}};let o={};for(let i of e.slice(t+1,n)){if(!i.trim()||i.trimStart().startsWith("#"))continue;let s=i.match(/^([^:]+):\s*(.*)$/);if(!s)throw new Error(`Cannot parse document frontmatter line: ${i}`);o[s[1]]=ze(s[2])}return{content:e.slice(n+1).join(`
`),frontmatter:o}}function Et(r){let e=It(r),t=String(e.frontmatter.theme||"auto"),n=String(e.frontmatter.colourScheme||"classic"),o;try{o=mt(t)}catch{throw new Error(`Unsupported document theme: ${t}`)}if(!ae[n])throw new Error(`Unsupported document colour scheme: ${n}`);return{...e,theme:t,resolvedTheme:o,colourScheme:n}}function Rt(r){let e=Et(r),t=e.content.replace(/\r\n/g,`
`).split(`
`),n=0,o=new Set,i=!1,s=!1;for(let a of t){let d=a.replace(/^(?: {0,3}> ?)+/,"");if(/^```/.test(d)){s=!s;continue}if(!s&&/^:::diagram\s+\{\s*id=/.test(d)){i=!0;break}}for(;n<t.length;){let d=t[n].replace(/^(?: {0,3}> ?)+/,"").match(/^```([\w-]*)\s*$/);if(!d){n+=1;continue}let l=t.slice(n+1).findIndex(c=>/^```\s*$/.test(c.replace(/^(?: {0,3}> ?)+/,"")));if(l===-1)throw new Error("Unclosed code block.");let u=n+l+1;if(d[1]==="diagram"){let c=t.slice(n+1,u).map(x=>x.replace(/^(?: {0,3}> ?)+/,"")).join(`
`);Se(c,e.colourScheme);let g=c.match(/^id:\s*(?:"([^"]+)"|([^\s#]+))\s*$/m)?.slice(1).find(Boolean);if(g){if(o.has(g))throw new Error(`Duplicate diagram id: ${g}`);o.add(g)}else if(i)throw new Error("Every diagram requires an id when using diagram references.")}n=u+1}return e}function ir(r,e,t){let n=r.replace(/\r\n/g,`
`),o=n.split(`
`),i=o.findIndex(u=>u.trim()!==""),s=i!==-1&&o[i]==="---",a=s?o.indexOf("---",i+1):-1;if(!s||a===-1)return`---
${e}: ${t}
---
${n}`;let d=!1,l=o.slice(i+1,a).map(u=>{if(!u.trim()||u.trimStart().startsWith("#"))return u;let c=u.match(/^([^:]+):\s*(.*)$/);return c&&c[1]===e?(d=!0,`${e}: ${t}`):u});return d||l.push(`${e}: ${t}`),[...o.slice(0,i+1),...l,...o.slice(a)].join(`
`)}function Ht(r,e){return ir(r,"theme",e)}function ar(r,e){return ir(r,"colourScheme",e)}function St(r,e){let t=e.trim(),n=t?r.indexOf(t):-1;return n===-1?null:{start:n,end:n+t.length}}function $t(r,e){let t=Number.parseFloat(globalThis.getComputedStyle(r).lineHeight)||20,n=r.value.slice(0,e.start).split(`
`).length-1,o=Math.max(1,Math.floor(r.clientHeight/t));r.scrollTop=Math.max(0,(n-Math.floor(o/2))*t)}function jt(r){let e=[],t="",n=!1,o=r.trim().replace(/^\||\|$/g,"");for(let i of o)n?(t+=i,n=!1):i==="\\"?n=!0:i==="|"?(e.push(t.trim()),t=""):t+=i;return e.push(t.trim()),e}function sr(r){let e=jt(r);return!e.length||!e.every(t=>/^:?-{3,}:?$/.test(t))?null:e.map(t=>t.startsWith(":")&&t.endsWith(":")?"center":t.startsWith(":")?"left":t.endsWith(":")?"right":"")}function Ne(r){return r.match(/^(\s*)([-+*]|\d+[.)])\s+(.+)$/)}function Ot(r){let e=r.match(/^:::(section|panel|callout|grid|stack)(?:\s+\{(.*)\})?\s*$/);if(!e)return null;let t={},n=e[2];if(n!==void 0){let o=0,i=/\s*([a-z][\w-]*)=(?:"([^"]*)"|([^\s}]+))/gi,s;for(;s=i.exec(n);){if(s.index!==o||t[s[1]]!==void 0)return null;t[s[1]]=s[2]??s[3],o=i.lastIndex}if(n.slice(o).trim())return null}return{name:e[1],attributes:t}}function dr(r){let e=r.match(/^:::diagram\s+\{\s*id=(?:"([^"]+)"|([^\s}]+))\s*\}\s*$/),t=e?.[1]??e?.[2];return t?{id:t}:null}function cr(r){let e=r.match(/^id:\s*(?:"([^"]+)"|([^\s#]+))\s*$/m);return e?.[1]??e?.[2]??null}function jr(r){return r.replace(/^(?: {0,3}> ?)+/,"")}function Or(r){return/^:::(?:\s+.*)?$/.test(r)}function Vr(r,e,t){let n=1,o=!1;for(let i=e+1;i<t;i+=1){if(/^```/.test(r[i])){o=!o;continue}if(!o){if(Ot(r[i]))n+=1;else if(Or(r[i])&&(n-=1,!n))return i}}return-1}function Gr(r){return/^#[\da-f]{3,8}$/i.test(r)}function Wr(r,e="classic",t="light"){let n=r.palette!==void 0;if(n&&!pe.includes(r.palette))return null;for(let a of["fill","stroke","text"])if(r[a]!==void 0&&!Gr(r[a]))return null;let o=n?Q(e,t,r.palette):null,i=Object.fromEntries(["fill","stroke","text"].filter(a=>r[a]!==void 0).map(a=>[a,r[a]])),s=ve(o||{},i);return Object.entries(s).filter(([,a])=>a!==void 0).map(([a,d])=>`--docdiagram-component-${a}:${d}`).join(";")}function vt(r,e=!1){let t=String(r).trim();if(t.startsWith("//")||t.startsWith("\\"))return!1;if(!t||t.startsWith("#")||t.startsWith("/")||t.startsWith("./")||t.startsWith("../")||t.startsWith("?")||e&&/^data:image\/(?:gif|jpeg|png|webp);base64,/i.test(t))return!0;let n=t.match(/^([a-z][a-z\d+.-]*):/i);return!n||["http","https","mailto"].includes(n[1].toLowerCase())}function Ee(r){let e=[],t=String(r).replace(/`([^`]+)`/g,(n,o)=>{let i=`\0${e.length}\0`;return e.push(`<code>${S(o)}</code>`),i});return t=S(t),t=t.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,(n,o,i)=>{let s=i.replace(/&amp;/g,"&");return vt(s,!0)?`<img src="${S(s)}" alt="${o}">`:`![${o}](${S(i)})`}),t=t.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,(n,o,i)=>{let s=i.replace(/&amp;/g,"&");return vt(s)?`<a href="${S(s)}">${o}</a>`:`[${o}](${S(i)})`}),t=t.replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g,"<strong>$2</strong>").replace(/~~(?=\S)([\s\S]*?\S)~~/g,"<del>$1</del>").replace(/(?<!\*)\*(?=\S)([\s\S]*?\S)\*(?!\*)/g,"<em>$1</em>").replace(/(?<!_)_(?=\S)([\s\S]*?\S)_(?!_)/g,"<em>$1</em>"),t.replace(/\u0000(\d+)\u0000/g,(n,o)=>e[Number(o)])}function Vt(r,e={diagramIndex:0},t){let n=r.replace(/\r\n/g,`
`).split(`
`),o=t?.renderDiagram??((h,v)=>{throw new Error("renderDiagram callback is required for diagram blocks.")}),i=t?.documentColorScheme||"classic",s=t?.documentTheme||"light",a=t?.diagramReferenceRegistry||(()=>{let h=new Map,v=new Set,w=new Map,p=n.map(jr);for(let b=0;b<p.length;b+=1){if(!/^```diagram\s*$/.test(p[b]))continue;let D=p.slice(b+1).findIndex(B=>/^```\s*$/.test(B));if(D===-1)break;let T=p.slice(b+1,b+D+1).join(`
`),M=cr(T);M&&(h.has(M)?v.add(M):h.set(M,{id:M,source:T})),b+=D+1}let $=!1;for(let b of p){if(/^```/.test(b)){$=!$;continue}if(!$){let D=dr(b);D&&w.set(D.id,(w.get(D.id)||0)+1)}}return{definitions:h,duplicateDefinitionIds:v,referenceCounts:w}})(),{definitions:d,duplicateDefinitionIds:l,referenceCounts:u}=a;function c(h){let v=n[h]||"";return!v.trim()||/^```/.test(v)||/^(#{1,6})\s+/.test(v)||/^ {0,3}&gt;|^ {0,3}>/.test(v)||/^ {0,3}(?:[-*_]\s*){3,}$/.test(v)||/^:::/.test(v)||!!Ne(v)||h+1<n.length&&!!sr(n[h+1])}function g(h,v){let w=Ne(n[h]),p=/^\d/.test(w[2]),$=[],b=h,D=p?Number.parseInt(w[2],10):null;for(;b<n.length;){let E=Ne(n[b]);if(!E||E[1].length!==v||/^\d/.test(E[2])!==p)break;let k={content:[E[3]],children:[]};for(b+=1;b<n.length;){let A=Ne(n[b]);if(A&&A[1].length>v){let F=g(b,A[1].length);k.children.push(F.html),b=F.index;continue}if(!n[b].trim()){b+=1;let F=b<n.length?Ne(n[b]):null;if(b>=n.length||!F||F[1].length<=v)break;continue}if(/^\s+/.test(n[b])&&!Ne(n[b])){k.content.push(n[b].trim()),b+=1;continue}break}$.push(k)}let T=p?"ol":"ul",M=p&&D!==1?` start="${D}"`:"",B=$.map(E=>{let k=!p&&E.content.length===1&&E.content[0].match(/^\[([ xX])\]\s+(.*)$/),A=k?`<input type="checkbox" disabled${k[1].toLowerCase()==="x"?" checked":""}> ${Ee(k[2])}`:Ee(E.content.join(" "));return`<li${k?' class="docdiagram-task-list-item"':""}>${A}${E.children.join("")}</li>`}).join("");return{html:`<${T}${M}>${B}</${T}>`,index:b}}function x(h,v){let w=Ot(n[h]),p=w?Vr(n,h,v):-1;if(!w||p===-1)return null;let{name:$,attributes:b}=w,D={section:["title","palette","fill","stroke","text"],panel:["title","palette","fill","stroke","text"],callout:["kind","title","palette","fill","stroke","text"],grid:["columns"],stack:[]};if(Object.keys(b).some(k=>!D[$].includes(k)))return null;if($==="grid"){let k=Kt[b.columns];if(!k)return null;let A=[],F=h+1;for(;F<p;){if(!n[F].trim()){F+=1;continue}let z=Ot(n[F]);if(!z||!["panel","callout","stack"].includes(z.name))return null;let U=x(F,p);if(!U)return null;A.push(`<div class="docdiagram-grid-item">${U.html}</div>`),F=U.next}return{html:`<div class="docdiagram-grid" style="--docdiagram-grid-columns:${k}">${A.join("")}</div>`,next:p+1}}if($==="stack")return Object.keys(b).length?null:{html:`<div class="docdiagram-stack">${f(h+1,p)}</div>`,next:p+1};let T=Wr(b,i,s);if(T===null||$==="callout"&&b.kind!==void 0&&!Xt.includes(b.kind))return null;let M=b.title?`<div class="docdiagram-component-title">${Ee(b.title)}</div>`:"",B=f(h+1,p),E=`docdiagram-component${$==="callout"?"":` docdiagram-${$}`}${T?" docdiagram-component-styled":""}`;if($==="callout"){let k=b.kind||"info";return{html:`<aside class="${E} docdiagram-callout docdiagram-callout-${k}"${T?` style="${T}"`:""} aria-label="${S(b.title||k)} callout"><div class="docdiagram-callout-kind">${S(k)}</div>${M}${B}</aside>`,next:p+1}}return{html:`<section class="${E}"${T?` style="${T}"`:""}>${M}${B}</section>`,next:p+1}}function f(h=0,v=n.length){let w=[],p=h;for(;p<v;){let $=n[p];if(!$.trim()){p+=1;continue}if(/^:::/.test($)){let E=dr($);if(E){let A=d.get(E.id),F=u.get(E.id)||0;A?l.has(E.id)?w.push(`<section class="docdiagram-error"><strong>Diagram "${S(E.id)}" has multiple definitions.</strong></section>`):F>1?w.push(`<section class="docdiagram-error"><strong>Diagram "${S(E.id)}" is referenced more than once.</strong></section>`):(w.push(o(A.source,e.diagramIndex)),e.diagramIndex+=1):w.push(`<section class="docdiagram-error"><strong>Diagram "${S(E.id)}" could not be found.</strong></section>`),p+=1;continue}let k=x(p,v);k?(w.push(k.html),p=k.next):(w.push(`<pre class="docdiagram-literal-source"><code>${S($)}</code></pre>`),p+=1);continue}let b=$.match(/^```([\w-]*)\s*$/);if(b){let E=n.slice(p+1,v).findIndex(F=>/^```\s*$/.test(F));if(E===-1){w.push('<section class="docdiagram-error"><strong>Unclosed code block.</strong></section>');break}let k=p+E+1,A=n.slice(p+1,k).join(`
`);if(b[1]==="diagram"){let F=cr(A);F&&l.has(F)?w.push(`<section class="docdiagram-error"><strong>Diagram "${S(F)}" has multiple definitions.</strong></section>`):(!F||!u.has(F))&&(w.push(o(A,e.diagramIndex)),e.diagramIndex+=1)}else{let F=b[1]?` class="language-${S(b[1])}"`:"";w.push(`<pre><code${F}>${S(A)}</code></pre>`)}p=k+1;continue}let D=$.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);if(D){w.push(`<h${D[1].length}>${Ee(D[2])}</h${D[1].length}>`),p+=1;continue}if(/^ {0,3}(?:[-*_]\s*){3,}$/.test($)){w.push("<hr>"),p+=1;continue}if(/^ {0,3}>/.test($)){let E=[];for(;p<v&&/^ {0,3}>/.test(n[p]);)E.push(n[p].replace(/^ {0,3}> ?/,"")),p+=1;w.push(`<blockquote>${Vt(E.join(`
`),e,{...t,diagramReferenceRegistry:a})}</blockquote>`);continue}let T=Ne($);if(T){let E=g(p,T[1].length);w.push(E.html),p=E.index;continue}let M=p+1<v?sr(n[p+1]):null;if(M){let E=jt($),k=[];for(p+=2;p<v&&n[p].includes("|")&&n[p].trim();)k.push(jt(n[p])),p+=1;let A=(F,z)=>z.map((U,ue)=>`<${F}${M[ue]?` style="text-align:${M[ue]}"`:""}>${Ee(U||"")}</${F}>`).join("");w.push(`<table><thead><tr>${A("th",E)}</tr></thead><tbody>${k.map(F=>`<tr>${A("td",F)}</tr>`).join("")}</tbody></table>`);continue}let B=[$.trim()];for(p+=1;p<v&&!c(p);)B.push(n[p].trim()),p+=1;w.push(`<p>${Ee(B.join(" "))}</p>`)}return w.join("")}return f()}function Gt(r,e,t){let n=e!=="none",o=e==="flowchart";return['<div class="docdiagram-diagram-toolbar" role="toolbar" aria-label="Diagram controls">',`<button type="button" class="docdiagram-icon-button docdiagram-zoom-in" data-diagram-index="${r}" aria-label="Zoom in" title="Zoom in">+</button>`,`<button type="button" class="docdiagram-icon-button docdiagram-zoom-out" data-diagram-index="${r}" aria-label="Zoom out" title="Zoom out">\u2212</button>`,`<button type="button" class="docdiagram-icon-button docdiagram-fit" data-diagram-index="${r}" aria-label="Zoom to fit" title="Zoom to fit">\u22A1</button>`,n?t.editingDiagramIndex===r?`<button type="button" class="docdiagram-icon-button docdiagram-done-editing" aria-label="Done editing" title="Done editing">\u2713</button><button type="button" class="docdiagram-icon-button docdiagram-cancel-editing" aria-label="Cancel editing and discard changes" title="Cancel editing and discard changes">\xD7</button>${o?`<button type="button" class="docdiagram-icon-button docdiagram-create-node" data-diagram-index="${r}" aria-label="New node" title="New node">+</button>`:""}`:t.editingDiagramIndex===null?'<button type="button" class="docdiagram-icon-button docdiagram-start-editing" aria-label="Edit diagram" title="Edit diagram">\u270E</button>':"":"","</div>"].join("")}function lr(r,e,t,n){let{selectedNode:o,selectedEdge:i,editingNode:s,editingEdge:a,connectionDrag:d,diagramZooms:l}=t,u=t.editingDiagramIndex===e,c=V(r),g=new Map(c.map(E=>[E.node.id,E])),x=16,f=[],h=[],w=ae[t.documentColorScheme]?.[t.documentTheme==="dark"?"dark":"light"],p=w?Object.entries(w).filter(([,E])=>E.gradient).map(([E,k])=>`<linearGradient id="docdiagram-${t.documentColorScheme}-${e}-${E}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${S(k.gradient||k.fill)}"/><stop offset="1" stop-color="${S(k.fill)}"/></linearGradient>`).join(""):"",$=r.edges.map((E,k)=>{let A=g.get(E.source),F=g.get(E.target);if(!A||!F)return"";let z=A.node,U=F.node,ue=fe(z,A.position.x,A.position.y,Number(z.size?.width)||190,Number(z.size?.height)||80),oe=fe(U,F.position.x,F.position.y,Number(U.size?.width)||190,Number(U.size?.height)||80),Y=E.sourceAnchor||"right",O=E.targetAnchor||"left",I=ue.anchors[Y],K=oe.anchors[O],ne=E.route||"orthogonal",R=De(I,K,Y,O,ne),ie=R.midpoint.x,me=R.midpoint.y-10,ge=Ie(r,E,t.documentTheme),Ce=i?.diagramIndex===e&&i.edgeIndex===k,Nt=Ce&&a?.diagramIndex===e&&a.edgeIndex===k,_e=(Number(ge.strokeWidth)||2)+(Ce?2:0),st=220,dt=72,Xe=E.label?de(E.label):[],y=Xe.length*x,N=me-y/2+x*.72,L=Je(E,"start"),C=Je(E,"end"),H=`docdiagram-marker-${e}-${k}-start`,Z=`docdiagram-marker-${e}-${k}-end`;L!=="none"&&f.push(at(H,L,"start",ge.stroke||"",_e)),C!=="none"&&f.push(at(Z,C,"end",ge.stroke||"",_e)),Ce&&u&&h.push(`<circle class="docdiagram-edge-endpoint" data-diagram-index="${e}" data-edge-index="${k}" data-endpoint="source" cx="${I.x}" cy="${I.y}" r="7"/>`,`<circle class="docdiagram-edge-endpoint" data-diagram-index="${e}" data-edge-index="${k}" data-endpoint="target" cx="${K.x}" cy="${K.y}" r="7"/>`);let j=[L!=="none"?` marker-start="url(#${H})"`:"",C!=="none"?` marker-end="url(#${Z})"`:""].join("");return[`<g class="docdiagram-edge-group${Ce?" docdiagram-edge-selected":""}" data-diagram-index="${e}" data-edge-index="${k}">`,`<path class="docdiagram-edge-hit" d="${R.hitPath}" fill="none" stroke="transparent" stroke-width="16"/>`,`<path class="docdiagram-edge" d="${R.path}"${j} stroke="${S(ge.stroke||"")}" stroke-width="${_e}"/>`,Nt?`<foreignObject class="docdiagram-inline-editor-host" x="${ie-st/2}" y="${me-dt/2}" width="${st}" height="${dt}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-edge" aria-label="Edit edge label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${S(E.label||"")}</textarea></foreignObject>`:Xe.length?te(ie,N,Xe,x,"docdiagram-edge-label",ge.text||""):"","</g>"].join("")}).join(""),b=c.map(({node:E,position:k})=>{let A=k.x,F=k.y,z=Number(E.size?.width)||190,U=Number(E.size?.height)||80,ue=xe(r,E,t.documentTheme,t.documentColorScheme),oe=E.palette,Y=oe&&w?.[oe]?.gradient?{...ue,fill:`url(#docdiagram-${t.documentColorScheme}-${e}-${oe})`}:ue,O=o?.diagramIndex===e&&o.nodeId===E.id,I=O&&s?.diagramIndex===e&&s.nodeId===E.id,K=(Number(Y.strokeWidth)||2)+(O?2:0),ne=fe(E,A,F,z,U),R=Ue(ne.textBounds,E);return[`<g class="docdiagram-node${O?" docdiagram-node-selected":""}" data-diagram-index="${e}" data-node-id="${S(E.id)}">`,Ye(ne,Y,K),I?`<foreignObject class="docdiagram-inline-editor-host" x="${ne.textBounds.x}" y="${ne.textBounds.y}" width="${ne.textBounds.width}" height="${ne.textBounds.height}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-node" aria-label="Edit node label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${S(E.label)}</textarea></foreignObject>`:te(R.centerX,R.labelStartY,R.labelLines,R.labelLineHeight,"docdiagram-node-label",Y.text||"",R.textAnchor),!I&&R.subtitleLines.length?te(R.centerX,R.subtitleStartY,R.subtitleLines,R.subtitleLineHeight,"docdiagram-node-subtitle",Y.text||"",R.textAnchor):"",O&&u&&!I?[["top-left",A-7,F-7],["top-right",A+z-7,F-7],["bottom-left",A-7,F+U-7],["bottom-right",A+z-7,F+U-7]].map(([ie,me,ge])=>`<rect class="docdiagram-resize-handle" data-resize-corner="${ie}" x="${me}" y="${ge}" width="14" height="14" rx="3"/>`).join(""):"",O&&u&&!I?J.map(ie=>{let me=ne.anchors[ie];return`<circle class="docdiagram-connection-port" data-anchor="${ie}" cx="${me.x}" cy="${me.y}" r="7" aria-label="${ie} connection port"/>`}).join(""):"","</g>"].join("")}).join(""),D=Number(r.canvas.width)||1e3,T=Number(r.canvas.height)||560,M=t.diagramViewportHeights.get(e),B=M?` style="box-sizing: border-box; height: ${M}px"`:"";return[`<figure class="docdiagram" data-diagram-index="${e}" data-diagram-type="flowchart" data-editing="${u}"${B}>`,n(e,"flowchart",t),`<svg viewBox="0 0 ${D} ${T}" role="img" aria-label="Architecture diagram" data-diagram-index="${e}" style="width: ${l.get(e)||100}%">`,`<defs>${p}${f.join("")}</defs>`,b,$,d?.diagramIndex===e?`<path class="docdiagram-connection-preview${d.invalid?" docdiagram-connection-invalid":""}" d="${De(d.start,d.current,d.sourceAnchor,d.targetAnchor||d.sourceAnchor,"straight").path}"/>`:"",h.join(""),"</svg>","</figure>"].join("")}function ur(r,e,t,n){let o=ke(r,t.documentTheme),i=Number(r.canvas?.width)||1e3,s=Number(r.canvas?.height)||560,a=r.participants||[],d=r.messages||[],l=r.activations||[],u=r.notes||[],c=r.groups||[],g=90,x=90,f=28,h=Number(r.canvas?.participantSize?.width)||180,v=Number(r.canvas?.participantSize?.height)||42,w=Number(r.canvas?.participantSpacing)||220,p=16,$=74+Math.max(0,...a.filter(y=>y.kind==="actor").map(y=>de(y.label||"").length-1))*p,b=48,D=18,T=56,M=t.diagramViewportHeights.get(e),B=M?` style="box-sizing: border-box; height: ${M}px"`:"",E=`docdiagram-sequence-arrow-${e}`,k=f+$+12,A=a[0],F=a[a.length-1],z=Number(A?.size?.width)||h,U=Number(F?.size?.width)||h,ue=a.length>1?z/2+w*(a.length-1)+U/2:h+g+x,oe=Math.max(i,ue,g+x),Y=new Map;a.forEach((y,N)=>{Y.set(y.id,a.length===1?oe/2:z/2+w*N)});let O=k+40,I=d.map((y,N)=>({...y,index:N,y:O+N*T})),K=u.map(y=>{let N=de(y.label||""),L=Math.max(b,N.length*16+22,Number(y.size?.height)||0),H=((y.after?I[Number(y.after)-1]:null)?.y||k)+D,Z=Y.get(y.at||"")||oe/2,j=Math.max(160,Number(y.size?.width)||0),he=Math.min(oe-j/2-24,Math.max(j/2+24,Z));return{...y,lines:N,x:he-j/2,y:H,width:j,height:L}}),ne=c.map(y=>I[y.to-1]?.y+34||O),R=Math.max(k+140,K.length?K[K.length-1].y+K[K.length-1].height:0,I.length?I[I.length-1].y+44:O,...ne),ie=Math.max(s,R+56),me=ie-36,ge=l.map((y,N)=>({participantId:y.participant,depth:l.slice(0,N).filter(L=>L.participant===y.participant&&L.from<=y.from&&L.to>=y.from).length,startY:(I[y.from-1]?.y||O)-10,endY:(I[y.to-1]?.y||O)+18})),Ce=a.map(y=>{let N=Y.get(y.id)||0,L=de(y.label||""),C=Be(r,y,t.documentTheme,t.documentColorScheme),H=Number(y.size?.width)||h,Z=Number(y.size?.height)||v;if(y.kind==="actor"){let j=f+10,he=j+18,qe=he+18;return[`<g class="docdiagram-sequence-participant docdiagram-sequence-actor" data-diagram-index="${e}" data-participant-id="${S(y.id)}">`,`<circle cx="${N}" cy="${j}" r="8" fill="none" stroke="${S(C.stroke||"")}" stroke-width="${Number(C.strokeWidth)||2}"/>`,`<path d="M ${N} ${j+8} V ${qe} M ${N-14} ${he} H ${N+14} M ${N} ${qe} L ${N-12} ${qe+18} M ${N} ${qe} L ${N+12} ${qe+18}" fill="none" stroke="${S(C.stroke||"")}" stroke-width="${Number(C.strokeWidth)||2}" stroke-linecap="round" stroke-linejoin="round"/>`,te(N,f+$-4-(L.length-1)*p,L,p,"docdiagram-node-label",C.text||""),"</g>"].join("")}return[`<g class="docdiagram-sequence-participant" data-diagram-index="${e}" data-participant-id="${S(y.id)}">`,`<rect x="${N-H/2}" y="${f}" width="${H}" height="${Z}" rx="12" fill="${S(C.fill||"")}" stroke="${S(C.stroke||"")}" stroke-width="${Number(C.strokeWidth)||2}"/>`,te(N,f+Z/2+6-(L.length-1)*p/2,L,p,"docdiagram-node-label",C.text||""),"</g>"].join("")}).join(""),Nt=a.map(y=>{let N=Y.get(y.id)||0;return`<path class="docdiagram-sequence-lifeline" d="M ${N} ${k} L ${N} ${me}" fill="none" stroke="${S(o.edge.stroke)}" stroke-width="2" stroke-dasharray="8 6"/>`}).join(""),_e=c.map(y=>{let N=(I[y.from-1]?.y||O)-24,L=(I[y.to-1]?.y||O)+30,C=Math.min(220,Math.max(110,String(y.label).length*8+28));return['<g class="docdiagram-sequence-group">',`<rect x="42" y="${N}" width="${oe-84}" height="${L-N}" rx="12" fill="none" stroke="${S(o.edge.stroke)}" stroke-width="2" stroke-dasharray="10 6" opacity="0.8"/>`,`<rect x="54" y="${N-16}" width="${C}" height="24" rx="6" fill="${S(o.node.fill)}" stroke="${S(o.edge.stroke)}" stroke-width="1.5"/>`,`<text x="${54+C/2}" y="${N+1}" text-anchor="middle" class="docdiagram-edge-label" fill="${S(o.edge.text)}">${S(y.label||"")}</text>`,"</g>"].join("")}).join(""),st=K.map((y,N)=>{let C=y.y+18,H=Be(r,y,t.documentTheme,t.documentColorScheme);return[`<g class="docdiagram-sequence-note" data-diagram-index="${e}" data-note-index="${N}">`,`<rect x="${y.x}" y="${y.y}" width="${y.width}" height="${y.height}" rx="10" fill="${S(H.fill||"")}" stroke="${S(H.stroke||"")}" stroke-width="${Number(H.strokeWidth)||2}"/>`,te(y.x+y.width/2,C,y.lines,16,"docdiagram-node-subtitle",H.text||""),"</g>"].join("")}).join(""),dt=ge.map(y=>{let N=Y.get(y.participantId)||0,L=y.depth*7,C=12,H=Math.max(20,y.endY-y.startY),Z=a.find(he=>he.id===y.participantId),j=Z?Be(r,Z,t.documentTheme,t.documentColorScheme):o.node;return`<rect class="docdiagram-sequence-activation" x="${N-C/2+L}" y="${y.startY}" width="${C}" height="${H}" rx="4" fill="${S(j.fill||"")}" stroke="${S(j.stroke||"")}" stroke-width="${Number(j.strokeWidth)||2}"/>`}).join(""),Xe=I.map(y=>{let N=Y.get(y.from)||0,L=Y.get(y.to)||0,C=y.style==="dashed",H=de(y.label||""),Z=H.length*15,j=y.y-12-Z/2+11,he=` marker-end="url(#${E})"`;return y.from===y.to?[`<g class="docdiagram-sequence-message" data-diagram-index="${e}" data-message-index="${y.index}">`,`<path d="M ${N} ${y.y} L ${N+48} ${y.y} L ${N+48} ${y.y+28} L ${N} ${y.y+28}" fill="none" stroke="${S(o.edge.stroke)}" stroke-width="2"${he}${C?' stroke-dasharray="8 5"':""}/>`,te(N+48/2,j,H,15,"docdiagram-edge-label",o.edge.text),"</g>"].join(""):[`<g class="docdiagram-sequence-message" data-diagram-index="${e}" data-message-index="${y.index}">`,`<path d="M ${N} ${y.y} L ${L} ${y.y}" fill="none" stroke="${S(o.edge.stroke)}" stroke-width="2"${he}${C?' stroke-dasharray="8 5"':""}/>`,te((N+L)/2,j,H,15,"docdiagram-edge-label",o.edge.text),"</g>"].join("")}).join("");return[`<figure class="docdiagram" data-diagram-index="${e}" data-diagram-type="sequence" data-editing="${t.editingDiagramIndex===e}"${B}>`,n(e,"sequence",t),`<svg viewBox="0 0 ${oe} ${ie}" role="img" aria-label="Sequence diagram" data-diagram-index="${e}" style="width: ${t.diagramZooms.get(e)||100}%">`,`<defs>${at(E,"arrow","end",o.edge.stroke,2)}</defs>`,_e,Ce,Nt,dt,st,Xe,"</svg>","</figure>"].join("")}function mr(r,e,t){try{let n=Se(r,t.colourScheme);return t.onDiagram(e,n),n.type==="sequence"?ur(n,e,t.state,Gt):lr(n,e,t.state,Gt)}catch(n){let o=n instanceof Error?n.message:String(n);return`<section class="docdiagram-error"><strong>Diagram could not be rendered.</strong><br>${S(o)}</section>`}}function gr(){if(document.querySelector("style[data-docdiagram-runtime-styles]"))return;let r=document.createElement("style");r.dataset.docdiagramRuntimeStyles="true",r.textContent=`
    html,
    body {
      margin: 0;
      min-height: 100%;
    }
    html[data-docdiagram-theme="light"],
    body[data-docdiagram-theme="light"] {
      background: var(--docdiagram-page-background, #ffffff);
      color: var(--docdiagram-page-text, #17202a);
    }
    html[data-docdiagram-theme="dark"],
    body[data-docdiagram-theme="dark"] {
      background: var(--docdiagram-page-background, #17202a);
      color: var(--docdiagram-page-text, #f3f8fc);
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
      background: linear-gradient(
        135deg,
        var(--docdiagram-component-gradient, var(--docdiagram-component-fill, var(--docdiagram-code-background))),
        var(--docdiagram-component-fill, var(--docdiagram-code-background))
      );
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
    .docdiagram-source-actions {
      align-items: center;
      display: flex;
      gap: .5rem;
      position: relative;
    }
    .docdiagram-source-menu-toggle {
      background: var(--docdiagram-control-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 6px;
      color: var(--docdiagram-text);
      cursor: pointer;
      font: inherit;
      padding: .35rem .55rem;
    }
    .docdiagram-source-menu {
      background: var(--docdiagram-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgb(21 41 62 / 18%);
      display: flex;
      flex-direction: column;
      gap: .3rem;
      padding: .5rem;
      position: absolute;
      right: 2.5rem;
      bottom: calc(100% + .35rem);
      width: max-content;
      z-index: 50;
    }
    .docdiagram-source-menu[hidden] {
      display: none;
    }
    .docdiagram-source-menu button {
      background: var(--docdiagram-control-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 5px;
      color: var(--docdiagram-text);
      cursor: pointer;
      font: inherit;
      padding: .35rem .55rem;
      text-align: left;
    }
    .docdiagram-source-menu-heading {
      color: var(--docdiagram-muted);
      font-size: .8rem;
      font-weight: 700;
      padding: .1rem .2rem;
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
      display: flex;
      flex-direction: column;
      gap: .2rem;
    }
    .docdiagram-palette-group {
      border: 0;
      display: grid;
      gap: .4rem;
      grid-template-columns: repeat(3, minmax(4.8rem, 1fr));
      margin: .35rem 0;
      padding: 0;
    }
    .docdiagram-palette-group legend {
      font-size: .8em;
      font-weight: 700;
      width: 100%;
    }
    .docdiagram-palette-swatch {
      cursor: pointer;
      display: block;
    }
    .docdiagram-palette-swatch input {
      inline-size: 1px;
      margin: -1px;
      opacity: 0;
      position: absolute;
    }
    .docdiagram-palette-swatch span {
      background: var(--docdiagram-swatch-fill);
      border: 2px solid var(--docdiagram-swatch-stroke);
      border-radius: 5px;
      color: var(--docdiagram-swatch-text);
      display: block;
      font-size: .7rem;
      font-weight: 700;
      line-height: 1.05;
      min-height: .9rem;
      padding: .18rem .3rem;
      text-align: center;
    }
    .docdiagram-palette-swatch input:checked + span {
      box-shadow: 0 0 0 2px var(--docdiagram-background), 0 0 0 4px var(--docdiagram-accent);
    }
    .docdiagram-palette-swatch input:focus-visible + span {
      outline: 2px solid var(--docdiagram-accent);
      outline-offset: 2px;
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
      box-sizing: border-box;
      box-shadow: 0 4px 12px rgb(21 41 62 / 18%);
      display: flex;
      flex-direction: column;
      gap: .6rem;
      max-height: calc(100vh - 5.5rem);
      overflow-x: hidden;
      overflow-y: auto;
      padding: 1rem;
      position: fixed;
      right: 1rem;
      top: 1rem;
      width: min(21rem, calc(100vw - 2rem));
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
      min-width: 0;
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
    .docdiagram-inspector-row {
      align-items: center;
      color: var(--docdiagram-muted);
      display: flex;
      font-size: .9rem;
      gap: .4rem;
      min-width: 0;
    }
    .docdiagram-inspector-row > span:first-child {
      min-width: 2.8rem;
    }
    .docdiagram-inspector-row .docdiagram-field {
      gap: .35rem;
    }
    .docdiagram-inspector-row .docdiagram-field-compact {
      max-width: 4.6rem;
    }
    .docdiagram-inspector-row select,
    .docdiagram-inspector-row input {
      min-width: 0;
      width: 4.6rem;
    }
    .docdiagram-inspector-row select {
      width: auto;
    }
    .docdiagram-inspector-actions {
      display: flex;
      gap: .5rem;
      justify-content: flex-end;
      margin-top: .2rem;
    }
    .docdiagram-inspector-actions button {
      background: var(--docdiagram-control-background);
      border: 1px solid var(--docdiagram-border);
      border-radius: 6px;
      color: var(--docdiagram-text);
      cursor: pointer;
      font: inherit;
      padding: .35rem .55rem;
    }
    .docdiagram-inspector-actions .docdiagram-inspector-delete {
      color: #b42318;
    }
    .docdiagram-visually-hidden {
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
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
    .docdiagram {
      scrollbar-width: none;
    }
    .docdiagram::-webkit-scrollbar {
      display: none;
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
  `,document.head.append(r)}function hr(){return{diagramModels:[],editingDiagramIndex:null,selectedNode:null,selectedEdge:null,selectedSequenceElement:null,editingNode:null,editingEdge:null,connectionDrag:null,documentTheme:"light",documentThemeSetting:"auto",documentColorScheme:"classic",documentFormat:"centered",savedSource:"",editSessionDiagram:null,diagramZooms:new Map,diagramViewportHeights:new Map}}function Ae(r){r.selectedNode=null,r.selectedEdge=null,r.selectedSequenceElement=null,r.editingNode=null,r.editingEdge=null}function Me(r,e){return r.editingDiagramIndex===e}function ce(r,e){return r.target instanceof Element?r.target.closest(e):null}function re(r,e){let t=r.diagramModels[e];return t?.type==="flowchart"?t:null}function W(r){return Number(r)}var kt=class{constructor(e){this.host=e;this.editingShortcutsBound=!1}enableCanvasPanning(){for(let e of this.host.outputElement.querySelectorAll(".docdiagram svg"))e.addEventListener("pointerdown",t=>{t.target===e&&this.beginCanvasPan(e,t)})}enableSequenceSelection(){for(let e of this.host.outputElement.querySelectorAll('.docdiagram[data-diagram-type="sequence"] svg'))e.addEventListener("click",t=>{if(!Me(this.host.state,W(e.dataset.diagramIndex)))return;let n=ce(t,".docdiagram-sequence-participant"),o=ce(t,".docdiagram-sequence-note"),i=ce(t,".docdiagram-sequence-message");n?this.host.state.selectedSequenceElement={diagramIndex:W(n.getAttribute("data-diagram-index")||void 0),kind:"participant",id:n.getAttribute("data-participant-id")||""}:o?this.host.state.selectedSequenceElement={diagramIndex:W(o.getAttribute("data-diagram-index")||void 0),kind:"note",index:W(o.getAttribute("data-note-index")||void 0)}:i?this.host.state.selectedSequenceElement={diagramIndex:W(i.getAttribute("data-diagram-index")||void 0),kind:"message",index:W(i.getAttribute("data-message-index")||void 0)}:this.host.state.selectedSequenceElement=null,this.host.state.selectedNode=null,this.host.state.selectedEdge=null,this.host.renderDocument()})}enableEditing(){for(let e of this.host.outputElement.querySelectorAll(".docdiagram svg"))Me(this.host.state,W(e.dataset.diagramIndex))&&(e.addEventListener("click",t=>this.handleDiagramClick(e,t)),e.addEventListener("pointerdown",t=>this.handleDiagramPointerDown(e,t)));for(let e of this.host.outputElement.querySelectorAll(".docdiagram-inline-editor"))this.wireInlineEditor(e);this.editingShortcutsBound||(this.editingShortcutsBound=!0,document.addEventListener("keydown",e=>{if(this.host.state.editingDiagramIndex===null)return;let t=document.activeElement;t instanceof Element&&t.matches("input, textarea, select, [contenteditable]")||((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="d"&&this.host.state.selectedNode?(e.preventDefault(),this.duplicateSelectedNode()):(e.key==="Delete"||e.key==="Backspace")&&(this.host.state.selectedNode||this.host.state.selectedEdge)&&(e.preventDefault(),this.deleteSelected()))},!0))}selectNode(e,t){this.host.state.selectedNode={diagramIndex:e,nodeId:t},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}selectEdge(e,t){this.host.state.selectedEdge={diagramIndex:e,edgeIndex:t},this.host.state.selectedNode=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}handleDiagramClick(e,t){if(ce(t,".docdiagram-inline-editor"))return;let n=ce(t,".docdiagram-node");if(n){this.selectNode(W(n.getAttribute("data-diagram-index")||void 0),n.getAttribute("data-node-id")||"");return}let o=ce(t,".docdiagram-edge-group");if(o){let i=W(o.getAttribute("data-diagram-index")||void 0),s=W(o.getAttribute("data-edge-index")||void 0),a=this.host.state.selectedEdge?.diagramIndex===i&&this.host.state.selectedEdge.edgeIndex===s,d=this.host.state.editingEdge?.diagramIndex===i&&this.host.state.editingEdge.edgeIndex===s;a&&!d?(this.host.state.editingEdge={diagramIndex:i,edgeIndex:s},this.host.renderDocument()):this.selectEdge(i,s);return}(this.host.state.selectedNode||this.host.state.selectedEdge)&&this.clearSelection()}handleDiagramPointerDown(e,t){let n=ce(t,".docdiagram-connection-port");if(n){let w=n.closest(".docdiagram-node"),p=W(w?.getAttribute("data-diagram-index")||e.dataset.diagramIndex),$=n.getAttribute("data-node-id")||w?.getAttribute("data-node-id")||"",b=re(this.host.state,p),D=b?G(b,$)?.node:null,T=n.getAttribute("data-anchor")||"";D&&this.beginConnectionDrag(e,t,{diagramIndex:p,sourceNodeId:$,sourceAnchor:T,start:this.getNodePortPoint(D,T),current:this.getNodePortPoint(D,T),invalid:!1});return}let o=ce(t,".docdiagram-edge-endpoint");if(o){let w=W(o.getAttribute("data-diagram-index")||void 0),p=W(o.getAttribute("data-edge-index")||void 0),$=re(this.host.state,w),b=$?.edges[p],D=o.getAttribute("data-endpoint");if(!b||D!=="source"&&D!=="target")return;let T=D==="source"?b.source:b.target,M=D==="source"?b.sourceAnchor:b.targetAnchor,B=$?G($,T)?.node:null;if(!B||!M)return;this.beginConnectionDrag(e,t,{diagramIndex:w,edgeIndex:p,endpoint:D,reconnect:!0,sourceNodeId:T,sourceAnchor:M,start:this.getNodePortPoint(B,M),current:this.getNodePortPoint(B,M),invalid:!1});return}let i=ce(t,".docdiagram-resize-handle");if(i){let w=i.closest(".docdiagram-node"),p=i.getAttribute("data-resize-corner");w&&(p==="top-left"||p==="top-right"||p==="bottom-left"||p==="bottom-right")&&this.resizeNode(e,t,w,p);return}if(ce(t,".docdiagram-inline-editor"))return;let s=ce(t,".docdiagram-node");if(!s)return;let a=W(s.getAttribute("data-diagram-index")||void 0),d=s.getAttribute("data-node-id")||"",l=re(this.host.state,a),u=l?G(l,d)?.node:null;if(!l||!u)return;t.preventDefault();let c=this.svgPoint(e,t),g=_(l,u),x=se(l),f=!1;this.capturePointer(e,t);let h=w=>{let p=this.svgPoint(e,w),$=ee(g.x+p.x-c.x,x),b=ee(g.y+p.y-c.y,x);f=f||$!==g.x||b!==g.y,s.setAttribute("transform",`translate(${$-g.x} ${b-g.y})`);let D=G(l,d);u.position={...u.position,x:$-(D?.parent?_(l,D.parent).x:0),y:b-(D?.parent?_(l,D.parent).y:0)}},v=w=>{this.releasePointer(e,w),e.removeEventListener("pointermove",h),e.removeEventListener("pointerup",v),e.removeEventListener("pointercancel",v),f?(ut(l,d),He(l,u),this.host.state.selectedNode={diagramIndex:a,nodeId:d},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.persistDiagramModels(),this.host.renderDocument()):this.host.state.selectedNode?.diagramIndex===a&&this.host.state.selectedNode.nodeId===d?(this.host.state.editingNode={diagramIndex:a,nodeId:d},this.host.renderDocument()):this.selectNode(a,d)};e.addEventListener("pointermove",h),e.addEventListener("pointerup",v),e.addEventListener("pointercancel",v)}getSelectedNode(){let e=this.host.state.selectedNode,t=e?re(this.host.state,e.diagramIndex):null;return e&&t&&G(t,e.nodeId)?.node||null}getSelectedEdge(){let e=this.host.state.selectedEdge,t=e?re(this.host.state,e.diagramIndex):null;return e&&t?.edges[e.edgeIndex]||null}clearSelection(){this.host.state.selectedNode=null,this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}deleteSelected(){let e=this.host.state.selectedNode,t=this.host.state.selectedEdge;if(e){let n=re(this.host.state,e.diagramIndex);if(!n)return;let o=n.edges.filter(i=>i.source===e.nodeId||i.target===e.nodeId);if(o.length&&!globalThis.confirm(`Delete this node and its ${o.length} attached connector${o.length===1?"":"s"}?`))return;Ve(n,e.nodeId)}else if(t){let n=re(this.host.state,t.diagramIndex);if(!n)return;Oe(n,t.edgeIndex)}else return;Ae(this.host.state),this.host.persistDiagramModels(),this.host.renderDocument()}duplicateSelectedNode(){let e=this.host.state.selectedNode;if(!e)return;let t=re(this.host.state,e.diagramIndex);if(!t)return;let n=je(t,e.nodeId);n&&(this.host.state.selectedNode={diagramIndex:e.diagramIndex,nodeId:n.id},this.host.state.selectedEdge=null,this.host.persistDiagramModels(),this.host.renderDocument())}wireInlineEditor(e){let t=!1,n=()=>{if(!t){if(t=!0,e.classList.contains("docdiagram-inline-editor-edge")){let i=this.getSelectedEdge();i&&(We(i,e.value),this.host.persistDiagramModels()),this.host.state.editingEdge=null}else{let i=this.getSelectedNode();i&&(Ge(i,e.value),this.host.persistDiagramModels()),this.host.state.editingNode=null}this.host.renderDocument()}},o=()=>{t||(t=!0,e.classList.contains("docdiagram-inline-editor-edge")?this.host.state.editingEdge=null:this.host.state.editingNode=null,this.host.renderDocument())};e.addEventListener("pointerdown",i=>i.stopPropagation()),e.addEventListener("click",i=>i.stopPropagation()),e.addEventListener("keydown",i=>{i.key==="Enter"&&(i.metaKey||i.ctrlKey)?(i.preventDefault(),n()):i.key==="Escape"&&(i.preventDefault(),o())}),e.addEventListener("blur",n,{once:!0}),e.focus(),e.select()}resizeNode(e,t,n,o){t.preventDefault();let i=W(n.getAttribute("data-diagram-index")||void 0),s=n.getAttribute("data-node-id")||"",a=re(this.host.state,i),d=a?G(a,s)?.node:null;if(!a||!d)return;let l=this.svgPoint(e,t),u=tt(d),c=!1;this.capturePointer(e,t);let g=f=>{let h=this.svgPoint(e,f);bt(a,d,o,h.x-l.x,h.y-l.y,u);let v=Number(d.size?.width)||190,w=Number(d.size?.height)||80;c=c||v!==u.size.width||w!==u.size.height,this.updateNodeSizeMarkup(n,d,v,w)},x=f=>{this.releasePointer(e,f),e.removeEventListener("pointermove",g),e.removeEventListener("pointerup",x),e.removeEventListener("pointercancel",x),c&&(He(a,d),this.host.state.selectedNode={diagramIndex:i,nodeId:s},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.persistDiagramModels(),this.host.renderDocument())};e.addEventListener("pointermove",g),e.addEventListener("pointerup",x),e.addEventListener("pointercancel",x)}updateNodeSizeMarkup(e,t,n,o){let i=re(this.host.state,W(e.getAttribute("data-diagram-index")||void 0));if(!i)return;let{x:s,y:a}=_(i,t),d=e.querySelector(".docdiagram-node-body"),l=e.querySelector(".docdiagram-node-label"),u=e.querySelector(".docdiagram-node-subtitle"),c=e.querySelectorAll(".docdiagram-resize-handle");if(!d)return;let g=xe(i,t),x=fe(t,s,a,n,o),f=Ue(x.textBounds,t);for(let h of e.querySelectorAll(".docdiagram-node-detail"))h.remove();d.outerHTML=Ye(x,g,Number(g.strokeWidth)||2);for(let h of[l,u])if(h){h.setAttribute("x",String(f.centerX)),h.setAttribute("y",String(h===l?f.labelStartY:f.subtitleStartY)),h.setAttribute("text-anchor",f.textAnchor);for(let v of h.querySelectorAll("tspan"))v.setAttribute("x",String(f.centerX))}for(let h of c){let v=h.getAttribute("data-resize-corner");h.setAttribute("x",String(v?.endsWith("left")?s-7:s+n-7)),h.setAttribute("y",String(v?.startsWith("top")?a-7:a+o-7))}}getNodePortPoint(e,t){let n=this.host.state.diagramModels.find(i=>i.type==="flowchart"&&G(i,e.id)?.node===e);if(!n)return{x:0,y:0};let o=_(n,e);return fe(e,o.x,o.y,o.width,o.height).anchors[t]}addConnectionTargetPorts(e,t){let n=re(this.host.state,t);if(n)for(let{node:o}of V(n))for(let i of J){let s=this.getNodePortPoint(o,i),a=document.createElementNS("http://www.w3.org/2000/svg","circle");a.setAttribute("class","docdiagram-connection-port docdiagram-connection-target-port"),a.dataset.nodeId=o.id,a.dataset.anchor=i,a.setAttribute("cx",String(s.x)),a.setAttribute("cy",String(s.y)),a.setAttribute("r","7"),e.append(a)}}beginConnectionDrag(e,t,n){t.preventDefault(),t.stopPropagation(),this.host.state.connectionDrag={...n,current:this.svgPoint(e,t),invalid:!1},this.addConnectionTargetPorts(e,n.diagramIndex);let o=document.createElementNS("http://www.w3.org/2000/svg","path");o.setAttribute("class","docdiagram-connection-preview"),e.append(o),this.capturePointer(e,t);let i=d=>{let u=document.elementFromPoint(d.clientX,d.clientY)?.closest(".docdiagram-connection-port");return u||[...e.querySelectorAll(".docdiagram-connection-port")].find(c=>{let g=c.getBoundingClientRect();return d.clientX>=g.left&&d.clientX<=g.right&&d.clientY>=g.top&&d.clientY<=g.bottom})||null},s=d=>{let l=this.host.state.connectionDrag;if(!l)return;let u=this.svgPoint(e,d),c=i(d);l.current=u,l.invalid=!c;let g=c?.getAttribute("data-anchor")||l.sourceAnchor;o.setAttribute("d",De(l.start,u,l.sourceAnchor,g,"straight").path),o.classList.toggle("docdiagram-connection-invalid",l.invalid)},a=d=>{this.releasePointer(e,d),e.removeEventListener("pointermove",s),e.removeEventListener("pointerup",a),e.removeEventListener("pointercancel",a);let l=i(d),u=this.host.state.connectionDrag;if(this.host.state.connectionDrag=null,l&&u){let c=re(this.host.state,u.diagramIndex),g=l.getAttribute("data-node-id")||l.closest(".docdiagram-node")?.getAttribute("data-node-id"),x=l.getAttribute("data-anchor")||"";if(c&&g){if(u.reconnect&&u.edgeIndex!==void 0&&u.endpoint){let f=c.edges[u.edgeIndex];f&&(ht(f,u.endpoint,g,x),this.host.state.selectedEdge={diagramIndex:u.diagramIndex,edgeIndex:u.edgeIndex},this.host.state.selectedNode=null)}else{let f=gt(c,u.sourceNodeId,u.sourceAnchor,g,x);this.host.state.selectedEdge={diagramIndex:u.diagramIndex,edgeIndex:c.edges.indexOf(f)},this.host.state.selectedNode=null}this.host.persistDiagramModels()}}this.host.renderDocument()};e.addEventListener("pointermove",s),e.addEventListener("pointerup",a),e.addEventListener("pointercancel",a)}beginCanvasPan(e,t){let n=e.closest(".docdiagram");if(!n)return;t.preventDefault();let o={clientX:t.clientX,clientY:t.clientY,scrollLeft:n.scrollLeft,scrollTop:n.scrollTop};n.classList.add("docdiagram-panning"),this.capturePointer(e,t);let i=a=>{n.scrollLeft=o.scrollLeft-(a.clientX-o.clientX),n.scrollTop=o.scrollTop-(a.clientY-o.clientY)},s=a=>{this.releasePointer(e,a),n.classList.remove("docdiagram-panning"),e.removeEventListener("pointermove",i),e.removeEventListener("pointerup",s),e.removeEventListener("pointercancel",s)};e.addEventListener("pointermove",i),e.addEventListener("pointerup",s),e.addEventListener("pointercancel",s)}svgPoint(e,t){let n=e.getBoundingClientRect(),o=e.viewBox.baseVal;return{x:(t.clientX-n.left)*o.width/n.width,y:(t.clientY-n.top)*o.height/n.height}}capturePointer(e,t){t.isTrusted&&e.setPointerCapture(t.pointerId)}releasePointer(e,t){t.isTrusted&&e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId)}};function pr(r,e,t,n){let o=ae[r]?.[e==="dark"?"dark":"light"];return[["Structure",pe.slice(0,5)],["Accent",pe.slice(5,8)],["Status",pe.slice(8)]].map(([i,s])=>`<fieldset class="docdiagram-palette-group"><legend>${i}</legend>${s.map(a=>{let d=o?.[a];return`<label class="docdiagram-palette-swatch"><input type="radio" name="${n}" value="${a}"${a===t?" checked":""}><span style="--docdiagram-swatch-fill:${d?.fill};--docdiagram-swatch-stroke:${d?.stroke};--docdiagram-swatch-text:${d?.text}">${d?.label||a}</span></label>`}).join("")}</fieldset>`).join("")}function fr(r,e,t="classic",n="light"){let o=se(r),i=xe(r,e,n,t),s=Number(e.size?.width)||190,a=Number(e.size?.height)||80,d=e.shape==="document"?{width:140,height:84}:{width:120,height:60},l=o?Math.ceil(d.width/o)*o:d.width,u=o?Math.ceil(d.height/o)*o:d.height,c=o||1,g=e.palette||"accent";return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${S(e.label)}</textarea></label>`,`<label class="docdiagram-field docdiagram-field-wide">Subtitle<textarea class="docdiagram-inspector-subtitle docdiagram-inspector-textarea" rows="2">${S(e.subtitle||"")}</textarea></label>`,`<div class="docdiagram-field docdiagram-field-wide"><span>Palette</span><div class="docdiagram-inspector-palette">${pr(t,n,g,"node-palette")}</div></div>`,`<label class="docdiagram-field">Shape<select class="docdiagram-inspector-shape">${Le.map(x=>`<option value="${x}"${x===e.shape?" selected":""}>${x}</option>`).join("")}</select></label>`,`<div class="docdiagram-inspector-row"><label class="docdiagram-field">Fill<input type="color" class="docdiagram-inspector-fill" value="${S(i.fill||"")}"></label><label class="docdiagram-field">Stroke<input type="color" class="docdiagram-inspector-stroke" value="${S(i.stroke||"")}"></label><label class="docdiagram-field docdiagram-field-compact"><span class="docdiagram-visually-hidden">Stroke width</span><input type="number" aria-label="Stroke width" class="docdiagram-inspector-stroke-width" value="${Number(i.strokeWidth)||2}" min="1" step="1"></label></div>`,`<label class="docdiagram-field">Text<input type="color" class="docdiagram-inspector-text" value="${S(i.text||"")}"></label>`,`<div class="docdiagram-inspector-row"><span>Align</span><label class="docdiagram-visually-hidden" for="docdiagram-inspector-text-v-align">Vertical alignment</label><select id="docdiagram-inspector-text-v-align" class="docdiagram-inspector-text-v-align" aria-label="Vertical alignment"><option value="top"${e.textVAlign==="top"?" selected":""}>Top</option><option value="center"${e.textVAlign!=="top"?" selected":""}>Middle</option></select><label class="docdiagram-visually-hidden" for="docdiagram-inspector-text-h-align">Horizontal alignment</label><select id="docdiagram-inspector-text-h-align" class="docdiagram-inspector-text-h-align" aria-label="Horizontal alignment"><option value="left"${e.textHAlign==="left"?" selected":""}>Left</option><option value="center"${e.textHAlign!=="left"&&e.textHAlign!=="right"?" selected":""}>Center</option><option value="right"${e.textHAlign==="right"?" selected":""}>Right</option></select></div>`,`<div class="docdiagram-inspector-row"><span>Size</span><label class="docdiagram-visually-hidden" for="docdiagram-inspector-width">Width</label><input id="docdiagram-inspector-width" type="number" aria-label="Width" class="docdiagram-inspector-width" value="${s}" min="${l}" step="${c}"><span>\xD7</span><label class="docdiagram-visually-hidden" for="docdiagram-inspector-height">Height</label><input id="docdiagram-inspector-height" type="number" aria-label="Height" class="docdiagram-inspector-height" value="${a}" min="${u}" step="${c}"></div>`,'<div class="docdiagram-inspector-actions"><button type="button" class="docdiagram-inspector-delete">Delete</button><button type="button" class="docdiagram-inspector-duplicate">Duplicate</button></div>'].join("")}function Wt(r,e){let t=Ie(r,e),n=Number(t.strokeWidth)||2,o=e.route||"orthogonal",i=e.start||"none",s=e.end||"arrow";return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${S(e.label||"")}</textarea></label>`,`<label class="docdiagram-field">Route<select class="docdiagram-inspector-route">${Pe.map(a=>`<option value="${a}"${a===o?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Source side<select class="docdiagram-inspector-source-anchor">${J.map(a=>`<option value="${a}"${a===e.sourceAnchor?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Target side<select class="docdiagram-inspector-target-anchor">${J.map(a=>`<option value="${a}"${a===e.targetAnchor?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Start<select class="docdiagram-inspector-marker-start">${X.map(a=>`<option value="${a}"${a===i?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">End<select class="docdiagram-inspector-marker-end">${X.map(a=>`<option value="${a}"${a===s?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Stroke<input type="color" class="docdiagram-inspector-stroke" value="${S(t.stroke||"")}"></label>`,`<label class="docdiagram-field">Label colour<input type="color" class="docdiagram-inspector-text" value="${S(t.text||"")}"></label>`,`<label class="docdiagram-field">Stroke width<input type="number" class="docdiagram-inspector-stroke-width" value="${n}" min="1" step="1"></label>`,'<div class="docdiagram-inspector-actions"><button type="button" class="docdiagram-inspector-delete">Delete</button></div>'].join("")}function br(r,e,t,n="classic",o="light"){let i="from"in t?null:Be(r,t,o,n),s=e.kind!=="message",a=s?t:null;return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-sequence-inspector-label docdiagram-inspector-textarea" rows="2">${S(t.label||"")}</textarea></label>`,e.kind==="message"?`<label class="docdiagram-field">Style<select class="docdiagram-sequence-inspector-message-style"><option value="solid"${t.style!=="dashed"?" selected":""}>Solid</option><option value="dashed"${t.style==="dashed"?" selected":""}>Dashed</option></select></label>`:"",s?`<div class="docdiagram-field docdiagram-field-wide"><span>Palette</span><div class="docdiagram-sequence-inspector-palette">${pr(n,o,a?.palette||"accent","sequence-palette")}</div></div>`:"",s?`<label class="docdiagram-field">Fill<input type="color" class="docdiagram-sequence-inspector-fill" value="${S(i?.fill||"")}"></label><label class="docdiagram-field">Border<input type="color" class="docdiagram-sequence-inspector-stroke" value="${S(i?.stroke||"")}"></label><label class="docdiagram-field">Text<input type="color" class="docdiagram-sequence-inspector-text" value="${S(i?.text||"")}"></label><label class="docdiagram-field">Width<input type="number" min="1" class="docdiagram-sequence-inspector-width" value="${Number(a?.size?.width)||""}"></label><label class="docdiagram-field">Height<input type="number" min="1" class="docdiagram-sequence-inspector-height" value="${Number(a?.size?.height)||""}"></label>`:""].join("")}function Ur(r,e){return r.querySelector(e)}function q(r,e,t){Ur(r,e)?.addEventListener("change",n=>{t(n.currentTarget.value)})}function Te(r,e){e(),r.persistDiagramModels(),r.renderDocument()}function yr(r,e,t,n){let o=i=>{let s=r.state.diagramModels[t];if(!s||s.type!=="flowchart")return;let a=G(s,n)?.node;a&&Te(r,()=>i(s,a))};q(e,".docdiagram-inspector-label",i=>o((s,a)=>Ge(a,i))),q(e,".docdiagram-inspector-subtitle",i=>o((s,a)=>ft(a,i)));for(let i of e.querySelectorAll(".docdiagram-inspector-palette input"))i.addEventListener("change",()=>o((s,a)=>et(a,i.value,r.state.documentColorScheme)));q(e,".docdiagram-inspector-shape",i=>o((s,a)=>pt(a,i))),q(e,".docdiagram-inspector-fill",i=>o((s,a)=>Fe(a,"fill",i))),q(e,".docdiagram-inspector-stroke",i=>o((s,a)=>Fe(a,"stroke",i))),q(e,".docdiagram-inspector-text",i=>o((s,a)=>Fe(a,"text",i))),q(e,".docdiagram-inspector-text-v-align",i=>o((s,a)=>Qe(a,"textVAlign",i))),q(e,".docdiagram-inspector-text-h-align",i=>o((s,a)=>Qe(a,"textHAlign",i))),q(e,".docdiagram-inspector-stroke-width",i=>o((s,a)=>it(a,i))),q(e,".docdiagram-inspector-width",i=>o((s,a)=>rt(s,a,"width",i))),q(e,".docdiagram-inspector-height",i=>o((s,a)=>rt(s,a,"height",i))),e.querySelector(".docdiagram-inspector-delete")?.addEventListener("click",()=>{o((i,s)=>{Ve(i,s.id),r.state.selectedNode=null})}),e.querySelector(".docdiagram-inspector-duplicate")?.addEventListener("click",()=>{o((i,s)=>{let a=je(i,s.id);a&&(r.state.selectedNode={diagramIndex:t,nodeId:a.id})})})}function xr(r,e,t,n){let o=i=>{let s=r.state.diagramModels[t];if(!s||s.type!=="flowchart")return;let a=s.edges[n];a&&Te(r,()=>i(s,a))};q(e,".docdiagram-inspector-label",i=>o((s,a)=>We(a,i))),q(e,".docdiagram-inspector-route",i=>o((s,a)=>yt(a,i))),q(e,".docdiagram-inspector-source-anchor",i=>o((s,a)=>ot(a,"source",i))),q(e,".docdiagram-inspector-target-anchor",i=>o((s,a)=>ot(a,"target",i))),q(e,".docdiagram-inspector-marker-start",i=>o((s,a)=>xt(a,i))),q(e,".docdiagram-inspector-marker-end",i=>o((s,a)=>wt(a,i))),q(e,".docdiagram-inspector-stroke",i=>o((s,a)=>nt(a,"stroke",i))),q(e,".docdiagram-inspector-text",i=>o((s,a)=>nt(a,"text",i))),q(e,".docdiagram-inspector-stroke-width",i=>o((s,a)=>it(a,i))),e.querySelector(".docdiagram-inspector-delete")?.addEventListener("click",()=>{o(i=>{Oe(i,n),r.state.selectedEdge=null})})}function wr(r,e,t){let n=r.state.selectedSequenceElement;if(!n)return;if(q(e,".docdiagram-sequence-inspector-label",i=>Te(r,()=>{t.label=i.trim()||t.label})),n.kind==="message"){q(e,".docdiagram-sequence-inspector-message-style",i=>Te(r,()=>{t.style=i}));return}let o=t;for(let i of e.querySelectorAll(".docdiagram-sequence-inspector-palette input"))i.addEventListener("change",()=>Te(r,()=>et(o,i.value,r.state.documentColorScheme)));for(let[i,s]of[[".docdiagram-sequence-inspector-fill","fill"],[".docdiagram-sequence-inspector-stroke","stroke"],[".docdiagram-sequence-inspector-text","text"]])q(e,i,a=>Te(r,()=>Fe(o,s,a)));for(let[i,s]of[[".docdiagram-sequence-inspector-width","width"],[".docdiagram-sequence-inspector-height","height"]])q(e,i,a=>Te(r,()=>{let d=Number(a);Number.isFinite(d)&&d>0&&(o.size={...o.size,[s]:d})}))}var Yr="https://sparkkz-nz.github.io/skryb/docs/reference.html",_r={flowchart:["```diagram","id: new-flowchart","type: flowchart","canvas:","  width: 600","  height: 300","nodes:","  - id: first-node","    label: First node","    shape: rounded-rectangle","    position: { x: 80, y: 110 }","  - id: second-node","    label: Second node","    shape: rounded-rectangle","    position: { x: 330, y: 110 }","edges:","  - source: first-node","    target: second-node","    sourceAnchor: right","    targetAnchor: left","```"].join(`
`),sequence:["```diagram","id: new-sequence","type: sequence","participants:","  - id: first-participant","    label: First participant","  - id: second-participant","    label: Second participant","messages:","  - from: first-participant","    to: second-participant","    label: Request","```"].join(`
`),"diagram-reference":":::diagram { id=diagram-id }",panel:[':::panel { title="New panel" palette=accent }',"Panel content.",":::"].join(`
`),grid:[":::grid { columns=2 }",':::panel { title="First panel" }',"First panel content.",":::","",':::panel { title="Second panel" }',"Second panel content.",":::",":::"].join(`
`)};function Ut(r,e){let t=new Set([...r.matchAll(/(?:\bid:\s*|:::diagram\s+\{\s*id=)(?:"([^"]+)"|([^\s}\n#]+))/g)].map(i=>i[1]||i[2])),n=1,o=e;for(;t.has(o);)n+=1,o=`${e}-${n}`;return o}function Xr(r,e){let t=_r[r];if(!t)return null;if(r==="flowchart")return t.replace("id: new-flowchart",`id: ${Ut(e,"new-flowchart")}`);if(r==="sequence")return t.replace("id: new-sequence",`id: ${Ut(e,"new-sequence")}`);if(r==="diagram-reference"){let n=Ut(e,"diagram-reference");return t.replace("diagram-id",n)}return t}var Ft=class{constructor(e){this.host=e;this.renderTimer=null;this.resizeObserver=null;this.openState=!1;this.draft="";this.error=""}get isOpen(){return this.openState}get hasUnsavedDraft(){return this.openState&&this.draft!==this.host.getSource()}get hasError(){return this.error.length>0}get draftSource(){return this.draft}setError(e){this.error=e,this.updateStatus()}clearError(){this.error=""}open(){globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=null,this.draft=this.host.getSource(),this.error="",this.openState=!0,this.host.stopDiagramEditing(),this.host.renderDocument();let e=()=>this.focus();globalThis.requestAnimationFrame?.(e)??e()}close(){this.flushRender(),!(this.error&&this.draft!==this.host.getSource()&&!globalThis.confirm("Discard the invalid source changes?"))&&(this.openState=!1,this.draft="",this.error="",this.renderTray(),document.querySelector(".docdiagram-menu-toggle")?.focus())}flushRender(){return this.renderTimer===null?!0:this.renderDraft()}syncSource(e){if(!this.openState)return;this.draft=e,this.error="";let t=document.querySelector(".docdiagram-source-editor");if(!t)return;let n=t.selectionStart,o=t.selectionEnd,i=t.scrollTop;t.value=e,t.setSelectionRange(Math.min(n,e.length),Math.min(o,e.length)),t.scrollTop=i,this.updateStatus()}reveal(e){let t=St(this.host.getSource(),e);if(!t||this.hasUnsavedDraft)return!1;this.openState||this.open();let n=()=>{let o=document.querySelector(".docdiagram-source-editor");o&&(o.focus(),o.setSelectionRange(t.start,t.end),$t(o,t))};return globalThis.requestAnimationFrame?.(n)??n(),!0}renderTray(){let e=document.querySelector(".docdiagram-source-tray");if(!this.openState){this.resizeObserver?.disconnect(),this.resizeObserver=null,e?.remove(),delete this.host.outputElement.dataset.sourceEditorOpen,this.host.outputElement.style.removeProperty("--docdiagram-source-tray-height");return}if(e){e.dataset.theme=this.host.getDocumentTheme(),this.host.outputElement.dataset.sourceEditorOpen="true",this.updateStatus();return}e=document.createElement("section"),e.className="docdiagram-source-tray",e.dataset.theme=this.host.getDocumentTheme(),e.setAttribute("aria-label","Document source editor"),e.innerHTML=['<header class="docdiagram-source-header">','<div><strong>Source</strong><span class="docdiagram-source-shortcut">Cmd/Ctrl+Shift+E to close</span></div>','<div class="docdiagram-source-actions">','<button type="button" class="docdiagram-source-menu-toggle" aria-label="Source editor menu" aria-expanded="false" title="Source editor menu">\u2630</button>','<div class="docdiagram-source-menu" hidden>','<div class="docdiagram-source-menu-heading">Insert</div>','<button type="button" data-source-template="flowchart">Flowchart</button>','<button type="button" data-source-template="sequence">Sequence</button>','<button type="button" data-source-template="diagram-reference">Diagram Reference</button>','<button type="button" data-source-template="panel">Panel</button>','<button type="button" data-source-template="grid">Grid</button>','<button type="button" class="docdiagram-source-help">Help</button>',"</div>",'<button type="button" class="docdiagram-source-close" aria-label="Close source editor" title="Close source editor">\xD7</button>',"</div>","</header>",'<label class="docdiagram-source-label">Canonical Markdown<textarea class="docdiagram-source-editor" spellcheck="false"></textarea></label>','<p class="docdiagram-source-status" aria-live="polite"></p>','<p class="docdiagram-source-error" role="alert"></p>'].join("");let t=e.querySelector(".docdiagram-source-editor"),n=e.querySelector(".docdiagram-source-close"),o=e.querySelector(".docdiagram-source-menu-toggle"),i=e.querySelector(".docdiagram-source-menu");if(!t||!n||!o||!i)return;t.value=this.draft,t.addEventListener("input",()=>{this.draft=t.value,this.error="",this.updateStatus(),this.scheduleRender()}),n.addEventListener("click",()=>this.close()),o.addEventListener("click",()=>{let a=i.hidden;i.hidden=!a,o.setAttribute("aria-expanded",String(a))});for(let a of e.querySelectorAll("[data-source-template]"))a.addEventListener("click",()=>{let d=Xr(a.dataset.sourceTemplate||"",t.value);d&&(this.insertTemplate(t,d),i.hidden=!0,o.setAttribute("aria-expanded","false"))});e.querySelector(".docdiagram-source-help")?.addEventListener("click",()=>{globalThis.open(Yr,"_blank","noopener")}),e.addEventListener("keydown",a=>{a.key==="Escape"&&!i.hidden&&(a.preventDefault(),i.hidden=!0,o.setAttribute("aria-expanded","false"),o.focus())}),this.host.outputElement.after(e),this.host.outputElement.dataset.sourceEditorOpen="true";let s=()=>{this.host.outputElement.style.setProperty("--docdiagram-source-tray-height",`${e?.offsetHeight||0}px`)};this.resizeObserver?.disconnect(),globalThis.ResizeObserver&&(this.resizeObserver=new globalThis.ResizeObserver(s),this.resizeObserver.observe(e)),s(),this.updateStatus()}scheduleRender(){globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=globalThis.setTimeout(()=>{this.renderTimer=null,this.renderDraft()},250)}renderDraft(){return globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=null,this.host.renderDocument(this.draft,{preserveOnError:!0})}updateStatus(){let e=document.querySelector(".docdiagram-source-tray");if(!e)return;let t=e.querySelector(".docdiagram-source-status"),n=e.querySelector(".docdiagram-source-error");!t||!n||(t.textContent=this.error?"Source has errors; showing the last valid render.":"Changes render automatically.",n.hidden=!this.error,n.textContent=this.error)}insertTemplate(e,t){let n=e.selectionStart,o=e.selectionEnd,i=e.value.lastIndexOf(`
`,n-1)+1,s=e.value.indexOf(`
`,n),a=s===-1?e.value.length:s,d=e.value.slice(i,a),l=/^\s*$/.test(d)?n:a,u=/^\s*$/.test(d)?o:a,c=l===a?`
${t}`:t;e.setRangeText(c,l,u,"end"),this.draft=e.value,this.error="",this.updateStatus(),this.scheduleRender(),e.focus()}focus(){let e=document.querySelector(".docdiagram-source-editor");e&&(e.focus(),e.setSelectionRange(e.value.length,e.value.length))}};function Kr(r){return r instanceof Element&&r.matches("input, textarea, select, [contenteditable]")}var Dt=class{constructor(e,t){this.sourceElement=e;this.outputElement=t;this.state=hr();this.sourceEditor=t?new Ft({outputElement:t,getSource:()=>this.getSource(),getDocumentTheme:()=>this.getDocumentTheme(),renderDocument:(n,o)=>this.renderDocument(n,o),stopDiagramEditing:()=>this.stopDiagramEditing(),closeDocumentMenu:()=>this.closeDocumentMenu()}):null,this.diagramEditor=t?new kt({outputElement:t,state:this.state,persistDiagramModels:()=>this.persistDiagramModels(),renderDocument:()=>this.renderDocument()}):null}getSource(){return this.sourceElement?.content.textContent||""}setSource(e){this.sourceElement?.content.replaceChildren(document.createTextNode(e))}getDocumentTheme(){return this.state.documentTheme}stopDiagramEditing(){this.state.editingDiagramIndex!==null&&(this.state.editingDiagramIndex=null,this.state.editSessionDiagram=null,Ae(this.state))}renderDiagram(e,t){return mr(e,t,{colourScheme:this.state.documentColorScheme,state:{...this.state,documentTheme:this.state.documentTheme,documentColorScheme:this.state.documentColorScheme},onDiagram:(n,o)=>{this.state.diagramModels[n]=o}})}renderMarkdown(e,t={diagramIndex:0}){return Vt(e,t,{renderDiagram:(n,o)=>this.renderDiagram(n,o),documentColorScheme:this.state.documentColorScheme,documentTheme:this.state.documentTheme})}persistDiagramModels(){let e=0,t=this.getSource().replace(/\r\n/g,`
`),n=new Map;for(let s of this.state.diagramModels){let a=s.id;typeof a=="string"&&n.set(a,[...n.get(a)||[],s])}let o=new Map([...n].flatMap(([s,a])=>a.length===1?[[s,a[0]]]:[])),i=t.replace(/^((?: {0,3}> ?)*)```diagram\s*\n([\s\S]*?)^((?: {0,3}> ?)*)```$/gm,(s,a,d,l)=>{let c=d.replace(/^(?: {0,3}> ?)+/gm,"").match(/^id:\s*(?:"([^"]+)"|([^\s#]+))\s*$/m)?.slice(1).find(Boolean),g=c&&o.get(c)||this.state.diagramModels[e];e+=1;let x=g?lt(g):"",f=x?x.split(`
`).map(h=>`${a}${h}`).join(`
`):"";return`${a}\`\`\`diagram
${f?`${f}
`:""}${l}\`\`\``});this.setSource(i),this.sourceEditor?.syncSource(i)}renderDocument(e=this.getSource(),{preserveOnError:t=!1}={}){if(!this.outputElement)return!1;let n=new Map([...this.outputElement.querySelectorAll(".docdiagram")].map(c=>[Number(c.dataset.diagramIndex),{left:c.scrollLeft,top:c.scrollTop}]));for(let c of this.outputElement.querySelectorAll(".docdiagram"))this.state.diagramViewportHeights.set(Number(c.dataset.diagramIndex),c.offsetHeight);let o={x:globalThis.scrollX||0,y:globalThis.scrollY||0},i=[...this.state.diagramModels],s=this.state.documentTheme,a=this.state.documentThemeSetting,d=this.state.documentColorScheme;this.state.diagramModels.length=0;let l;try{let c=t?Rt(e):Et(e);this.state.documentTheme=c.resolvedTheme,this.state.documentThemeSetting=c.theme,this.state.documentColorScheme=c.colourScheme,l=this.renderMarkdown(c.content)}catch(c){let g=c instanceof Error?c.message:String(c);return this.state.diagramModels.length=0,this.state.diagramModels.push(...i),t?(this.state.documentTheme=s,this.state.documentThemeSetting=a,this.state.documentColorScheme=d,this.sourceEditor?.setError(g),!1):(this.applyPageTheme(this.state.documentTheme),this.removeToolbarChrome(),this.outputElement.innerHTML=`<section class="docdiagram-error"><strong>Document could not be rendered.</strong><br>${S(g)}</section>`,this.sourceEditor?.renderTray(),!1)}this.setSource(e),this.sourceEditor?.clearError(),this.outputElement.dataset.theme=this.state.documentTheme,this.outputElement.dataset.colourScheme=this.state.documentColorScheme,this.applyDocumentColourScheme(this.outputElement),this.outputElement.dataset.format=this.state.documentFormat,this.applyPageTheme(this.state.documentTheme),this.outputElement.innerHTML=l,this.removeToolbarChrome(),this.createToolbar(),this.sourceEditor?.renderTray();let u=document.querySelector(".docdiagram-source-tray");u&&this.applyDocumentColourScheme(u),this.diagramEditor?.enableCanvasPanning(),this.diagramEditor?.enableSequenceSelection(),this.state.editingDiagramIndex!==null&&this.diagramEditor?.enableEditing();for(let c of this.outputElement.querySelectorAll(".docdiagram")){let g=n.get(Number(c.dataset.diagramIndex));g&&(c.scrollLeft=g.left,c.scrollTop=g.top)}return globalThis.scrollTo?.(o.x,o.y),!0}closeDocumentMenu(){let e=document.querySelector(".docdiagram-menu"),t=document.querySelector(".docdiagram-menu-toggle");!e||!t||(e.hidden=!0,t.setAttribute("aria-expanded","false"))}downloadDocument(){if(this.sourceEditor?.flushRender(),this.sourceEditor?.hasError&&this.sourceEditor.hasUnsavedDraft&&!globalThis.confirm("Source has errors. Save the last valid version instead?"))return;let e=document.documentElement.cloneNode(!0),t=e.querySelector("#source"),n=e.querySelector(".docdiagram-toolbar"),o=e.querySelector(".docdiagram-source-tray"),i=e.querySelector("#rendered-document");t?.content.replaceChildren(document.createTextNode(this.getSource())),n?.remove(),o?.remove();for(let l of e.querySelectorAll("style"))(l.dataset.docdiagramRuntimeStyles==="true"||l.textContent?.includes(".docdiagram-inline-editor")&&l.textContent.includes(".docdiagram-toolbar"))&&l.remove();i?.replaceChildren(),i?.removeAttribute("data-editing-shortcuts-bound");for(let l of[...i?.attributes||[]])(l.name==="style"||l.name.startsWith("data-"))&&i?.removeAttribute(l.name);let s=new Blob([`<!doctype html>
${e.outerHTML}`],{type:"text/html;charset=utf-8"}),a=document.createElement("a"),d=document.title.toLowerCase().replace(/[^\w]+/g,"-").replace(/^-|-$/g,"");a.href=URL.createObjectURL(s),a.download=`${d||"document"}-edited.html`,a.click(),URL.revokeObjectURL(a.href),this.state.savedSource=this.getSource()}boot(){!this.sourceElement||!this.outputElement||(gr(),this.state.savedSource=this.getSource(),globalThis.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener("change",()=>{this.state.documentThemeSetting==="auto"&&this.renderDocument()}),globalThis.addEventListener("beforeunload",e=>{this.getSource()===this.state.savedSource&&!this.sourceEditor?.hasUnsavedDraft||(e.preventDefault(),e.returnValue="")}),document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.shiftKey&&e.key.toLowerCase()==="e"&&(this.sourceEditor?.isOpen||!Kr(e.target))){e.preventDefault(),this.sourceEditor?.isOpen?this.sourceEditor.close():this.sourceEditor?.open();return}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="s"){e.preventDefault(),this.downloadDocument();return}e.key==="Escape"&&this.closeDocumentMenu()}),document.addEventListener("pointerdown",e=>{let t=document.activeElement;t instanceof HTMLTextAreaElement&&t.matches(".docdiagram-inline-editor")&&!(e.target instanceof Node&&t.contains(e.target))&&t.blur();let n=document.querySelector(".docdiagram-toolbar");n&&e.target instanceof Node&&!n.contains(e.target)&&this.closeDocumentMenu(),!(!(e.target instanceof Element)||e.target.closest(".docdiagram-toolbar, .docdiagram-node, .docdiagram-edge-group, .docdiagram-connection-port, .docdiagram-edge-endpoint, .docdiagram-inline-editor, .docdiagram-sequence-participant, .docdiagram-sequence-note, .docdiagram-sequence-message")||!this.state.selectedNode&&!this.state.selectedEdge&&!this.state.selectedSequenceElement)&&(Ae(this.state),this.renderDocument())}),this.outputElement.addEventListener("dblclick",e=>{e.target instanceof Element&&e.target.closest("button, input, textarea, select, [contenteditable]")||this.sourceEditor?.reveal(globalThis.getSelection?.()?.toString()||"")}),this.renderDocument())}getCoreApi(){return{diagramThemes:ct,colourSchemes:ae,supportedDiagramTypes:Ke,nodeShapes:Le,edgeAnchors:J,edgeRoutes:Pe,edgeMarkerStyles:X,getTheme:e=>ke(e,this.state.documentTheme),getGridSize:se,expandCanvasForNode:He,flattenFlowchartNodes:V,getFlowchartNodeBounds:_,reparentFlowchartNode:ut,createUniqueNodeId:qt,getDefaultNodePosition:Lt,duplicateNode:je,createNode:Pt,getResizeNodeOrigin:tt,createConnector:gt,reconnectConnector:ht,resizeFlowchartNode:bt,deleteConnector:Oe,deleteNode:Ve,getNodeEffectiveStyle:(e,t)=>xe(e,t,this.state.documentTheme,this.state.documentColorScheme),getEdgeEffectiveStyle:(e,t)=>Ie(e,t,this.state.documentTheme),getEdgeMarkerStyle:Je,getEdgeMarkerDimensions:Bt,parseDiagram:e=>Se(e,this.state.documentColorScheme),parseDocumentFrontmatter:It,resolveDocument:Et,setFrontmatterTheme:Ht,isSafeUrl:vt,renderInline:Ee,renderMarkdown:(e,t)=>this.renderMarkdown(e,t),renderDiagram:(e,t)=>this.renderDiagram(e,t),snapToGrid:ee,clampNodeSize:Re,serializeDiagram:lt,setNodeLabel:Ge,setNodeShape:pt,setNodeSubtitle:ft,setNodeTextAlignment:Qe,setNodeStyleOverride:Fe,setNodeColorPalette:et,setNodeSize:rt,setEdgeLabel:We,setEdgeRoute:yt,setEdgeAnchor:ot,setEdgeStyleOverride:nt,setStyleStrokeWidth:it,setEdgeMarkerStart:xt,setEdgeMarkerEnd:wt,validateDocumentSource:Rt,findSourceTextRange:St,scrollSourceEditorToRange:$t,splitTextLines:de,renderTextBlock:te,computeNodeTextLayout:Ue,getNodeGeometry:fe,renderNodeBody:Ye,buildEdgePath:De,buildEdgeInspectorFields:Wt,clampZoom:zt}}createToolbar(){if(!this.outputElement)return;let e=document.createElement("section");e.className="docdiagram-toolbar",e.dataset.editing=String(this.state.editingDiagramIndex!==null),e.dataset.theme=this.state.documentTheme,e.dataset.colourScheme=this.state.documentColorScheme,e.dataset.format=this.state.documentFormat;let t=this.getSelectedNode(),n=t?null:this.getSelectedEdge(),o=!t&&!n?this.getSelectedSequenceElement():null,i=t&&this.state.selectedNode?this.state.diagramModels[this.state.selectedNode.diagramIndex]:n&&this.state.selectedEdge?this.state.diagramModels[this.state.selectedEdge.diagramIndex]:o&&this.state.selectedSequenceElement?this.state.diagramModels[this.state.selectedSequenceElement.diagramIndex]:null;e.innerHTML=['<button type="button" class="docdiagram-menu-toggle" aria-label="Document menu" aria-expanded="false" title="Document menu">\u2630</button>','<div class="docdiagram-menu" hidden>','<label class="docdiagram-theme-control">Theme<select class="docdiagram-theme-select">',`<option value="auto"${this.state.documentThemeSetting==="auto"?" selected":""}>Auto</option>`,`<option value="light"${this.state.documentThemeSetting==="light"?" selected":""}>Light</option>`,`<option value="dark"${this.state.documentThemeSetting==="dark"?" selected":""}>Dark</option>`,"</select></label>",`<label class="docdiagram-theme-control">Colour scheme<select class="docdiagram-colour-scheme-select">${Object.entries(ae).map(([d,l])=>`<option value="${d}"${this.state.documentColorScheme===d?" selected":""}>${l.label}</option>`).join("")}</select></label>`,'<label class="docdiagram-theme-control">Format<select class="docdiagram-format-select">',`<option value="centered"${this.state.documentFormat==="centered"?" selected":""}>Centered</option>`,`<option value="full-width"${this.state.documentFormat==="full-width"?" selected":""}>Full width</option>`,"</select></label>",'<button type="button" class="docdiagram-edit-source">Edit source</button>','<button type="button" class="docdiagram-save">Save As</button>','<button type="button" class="docdiagram-offline-save" disabled>Save for Offline (coming soon)</button>',"</div>",t&&i?.type==="flowchart"?`<div class="docdiagram-inspector" data-kind="node">${fr(i,t,this.state.documentColorScheme,this.state.documentTheme)}</div>`:n&&i?`<div class="docdiagram-inspector" data-kind="edge">${Wt(i,n)}</div>`:o&&i?`<div class="docdiagram-inspector" data-kind="sequence">${br(i,this.state.selectedSequenceElement,o,this.state.documentColorScheme,this.state.documentTheme)}</div>`:""].join("");let s=e.querySelector(".docdiagram-menu-toggle"),a=e.querySelector(".docdiagram-menu");s?.addEventListener("click",()=>{if(!a)return;let d=a.hidden;a.hidden=!d,s.setAttribute("aria-expanded",String(d))}),e.querySelector(".docdiagram-save")?.addEventListener("click",()=>this.downloadDocument()),e.querySelector(".docdiagram-edit-source")?.addEventListener("click",()=>{this.closeDocumentMenu(),this.sourceEditor?.open()}),e.querySelector(".docdiagram-theme-select")?.addEventListener("change",d=>{this.setSource(Ht(this.getSource(),d.currentTarget.value)),this.renderDocument()}),e.querySelector(".docdiagram-colour-scheme-select")?.addEventListener("change",d=>{this.setSource(ar(this.getSource(),d.currentTarget.value)),this.renderDocument()}),e.querySelector(".docdiagram-format-select")?.addEventListener("change",d=>{this.state.documentFormat=d.currentTarget.value==="full-width"?"full-width":"centered",this.renderDocument()}),this.outputElement.before(e),this.applyDocumentColourScheme(e),t&&this.state.selectedNode?yr(this,e,this.state.selectedNode.diagramIndex,this.state.selectedNode.nodeId):n&&this.state.selectedEdge?xr(this,e,this.state.selectedEdge.diagramIndex,this.state.selectedEdge.edgeIndex):o&&this.state.selectedSequenceElement&&wr(this,e,o),this.wireChromeControls()}getSelectedNode(){let e=this.state.selectedNode,t=e?this.state.diagramModels[e.diagramIndex]:null;return e&&t?.type==="flowchart"&&Me(this.state,e.diagramIndex)&&G(t,e.nodeId)?.node||null}getSelectedEdge(){let e=this.state.selectedEdge,t=e?this.state.diagramModels[e.diagramIndex]:null;return e&&t?.type==="flowchart"&&Me(this.state,e.diagramIndex)&&t.edges[e.edgeIndex]||null}getSelectedSequenceElement(){let e=this.state.selectedSequenceElement,t=e?this.state.diagramModels[e.diagramIndex]:null;return!e||t?.type!=="sequence"||!Me(this.state,e.diagramIndex)?null:e.kind==="participant"?t.participants?.find(n=>n.id===e.id)||null:e.kind==="message"?t.messages?.[e.index]||null:t.notes?.[e.index]||null}applyDocumentColourScheme(e){let t=Q(this.state.documentColorScheme,this.state.documentTheme,"background"),n=Q(this.state.documentColorScheme,this.state.documentTheme,"pale"),o=Q(this.state.documentColorScheme,this.state.documentTheme,"neutral"),i=Q(this.state.documentColorScheme,this.state.documentTheme,"accent");!t||!n||!o||!i||(e.style.setProperty("--docdiagram-background",t.fill||""),e.style.setProperty("--docdiagram-border",o.stroke||""),e.style.setProperty("--docdiagram-control-background",n.fill||""),e.style.setProperty("--docdiagram-control-hover",o.fill||""),e.style.setProperty("--docdiagram-code-background",n.fill||""),e.style.setProperty("--docdiagram-text",t.text||""),e.style.setProperty("--docdiagram-muted",o.text||""),e.style.setProperty("--docdiagram-accent",i.stroke||""))}wireChromeControls(){if(this.outputElement){for(let e of this.outputElement.querySelectorAll(".docdiagram-zoom-in, .docdiagram-zoom-out"))e.addEventListener("click",()=>{let t=Number(e.dataset.diagramIndex),n=this.state.diagramZooms.get(t)||100,o=e.classList.contains("docdiagram-zoom-in")?25:-25;this.state.diagramZooms.set(t,zt(n+o)),this.renderDocument()});for(let e of this.outputElement.querySelectorAll(".docdiagram-fit"))e.addEventListener("click",()=>{this.state.diagramZooms.set(Number(e.dataset.diagramIndex),100),this.renderDocument()});for(let e of this.outputElement.querySelectorAll(".docdiagram-start-editing"))e.addEventListener("click",()=>{let t=Number(e.closest(".docdiagram")?.getAttribute("data-diagram-index")),n=this.state.diagramModels[t];n&&(this.state.editSessionDiagram=Se(lt(n),this.state.documentColorScheme),this.state.editingDiagramIndex=t,Ae(this.state),this.renderDocument())});for(let e of this.outputElement.querySelectorAll(".docdiagram-done-editing"))e.addEventListener("click",()=>this.exitEditing(this.state.editingDiagramIndex,!1));for(let e of this.outputElement.querySelectorAll(".docdiagram-cancel-editing"))e.addEventListener("click",()=>this.exitEditing(this.state.editingDiagramIndex,!0));for(let e of this.outputElement.querySelectorAll(".docdiagram-create-node"))e.addEventListener("click",()=>this.createNewNode(Number(e.dataset.diagramIndex)))}}exitEditing(e,t){e!==null&&(t&&this.state.editSessionDiagram&&(this.state.diagramModels[e]=this.state.editSessionDiagram,this.persistDiagramModels()),this.state.editingDiagramIndex=null,this.state.editSessionDiagram=null,Ae(this.state),this.renderDocument())}createNewNode(e){let t=this.state.diagramModels[e];if(!t||t.type!=="flowchart")return;let n=Pt(t);this.state.selectedNode={diagramIndex:e,nodeId:n.id},this.state.selectedEdge=null,this.persistDiagramModels(),this.renderDocument()}applyPageTheme(e){let t=Q(this.state.documentColorScheme,e,"background"),n=t?.text;document.documentElement.dataset.docdiagramTheme=e,document.documentElement.style.setProperty("--docdiagram-page-background",t?.fill||""),document.documentElement.style.setProperty("--docdiagram-page-text",n||""),document.body?.dataset&&(document.body.dataset.docdiagramTheme=e)}removeToolbarChrome(){if(this.outputElement)for(;this.outputElement.previousElementSibling?.classList.contains("docdiagram-toolbar");)this.outputElement.previousElementSibling.remove()}};var Zr=document.querySelector("#source"),Jr=document.querySelector("#rendered-document"),Er=new Dt(Zr,Jr),Qr=globalThis;Qr.DocDiagramCore=Er.getCoreApi();Er.boot();})();
