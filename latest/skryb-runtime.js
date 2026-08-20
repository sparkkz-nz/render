"use strict";(()=>{var xe=["background","pale","light","neutral","dark","accent-soft","accent","accent-strong","note","success","warning","danger","highlight"],Je=["flowchart","sequence"],Be=["rounded-rectangle","circle","oval","database","diamond","rhombus","flattened-hexagon","chevron","right-chevron","document"],ne=["top","right","bottom","left"],Ie=["orthogonal","straight","curved"],Q=["none","arrow","circle"],Qe={start:"none",end:"arrow"},_t=["top","center"],Xt=["left","center","right"],At={width:50,height:20},Mt={width:50,height:20},I={shape:"rounded-rectangle",label:"New node",width:190,height:80},Se=(r,e,t,n,o,i,s,a,d,u,l,c,h)=>({background:r,pale:e,light:t,neutral:n,dark:o,"accent-soft":i,accent:s,"accent-strong":a,note:d,success:u,warning:l,danger:c,highlight:h}),m=(r,e,t,n,o,i)=>({label:r,fill:e,stroke:t,text:n,gradient:o,glow:i}),ce={classic:{label:"Classic",light:Se(m("Background","#FFFFFF","#D1D5DB","#111827"),m("Pale","#F3F4F6","#9CA3AF","#1F2937"),m("Light","#E5E7EB","#6B7280","#1F2937"),m("Neutral","#D1D5DB","#4B5563","#111827"),m("Dark","#374151","#111827","#F9FAFB"),m("Soft","#DBEAFE","#60A5FA","#1E3A8A"),m("Accent","#BFDBFE","#2563EB","#1E3A8A","#EFF6FF"),m("Strong","#2563EB","#1D4ED8","#FFFFFF","#3B82F6","#60A5FA"),m("Note","#DBEAFE","#2563EB","#1E3A8A"),m("Success","#DCFCE7","#16A34A","#14532D"),m("Warning","#FFEDD5","#EA580C","#7C2D12"),m("Danger","#FEE2E2","#DC2626","#7F1D1D"),m("Highlight","#FEF9C3","#CA8A04","#713F12")),dark:Se(m("Background","#111827","#374151","#F9FAFB"),m("Pale","#1F2937","#4B5563","#F3F4F6"),m("Light","#374151","#6B7280","#F9FAFB"),m("Neutral","#4B5563","#9CA3AF","#FFFFFF"),m("Dark","#9CA3AF","#D1D5DB","#111827"),m("Soft","#172554","#3B82F6","#DBEAFE"),m("Accent","#1E3A8A","#60A5FA","#EFF6FF","#172554"),m("Strong","#2563EB","#93C5FD","#FFFFFF","#1D4ED8","#60A5FA"),m("Note","#172554","#60A5FA","#DBEAFE"),m("Success","#052E16","#4ADE80","#DCFCE7"),m("Warning","#431407","#FB923C","#FFEDD5"),m("Danger","#450A0A","#F87171","#FEE2E2"),m("Highlight","#422006","#FACC15","#FEF9C3"))},ice:{label:"Ice",light:Se(m("Background","#F8FCFF","#D8EAF4","#123040"),m("Pale","#EDF8FC","#B8DCEB","#123040"),m("Light","#D9F2FF","#88BED7","#123040"),m("Neutral","#B8DCEB","#4A8BAA","#123040"),m("Dark","#21536C","#123040","#F4FBFF"),m("Soft","#DDF5FF","#75C6E8","#0F4C67"),m("Accent","#BDEAFF","#2E91BF","#083B55","#E8F9FF"),m("Strong","#1976A3","#0E5E85","#FFFFFF","#43B3E8","#8DDBF7"),m("Note","#DCEFFF","#3182CE","#123A63"),m("Success","#DDF7EE","#1E9B68","#104B35"),m("Warning","#FFF0D8","#D97918","#6B3510"),m("Danger","#FFE4E7","#D9485F","#651C2A"),m("Highlight","#FFF8C9","#C69A13","#5E4900")),dark:Se(m("Background","#0C1D29","#26475A","#E8F7FF"),m("Pale","#112B3A","#376176","#E8F7FF"),m("Light","#173B4D","#4A7B92","#F0FAFF"),m("Neutral","#28576B","#79AFC3","#F4FBFF"),m("Dark","#A3D6E9","#D4F2FF","#0C1D29"),m("Soft","#10384E","#4AB5DF","#DDF7FF"),m("Accent","#15526D","#72CEF2","#ECFBFF","#123C52"),m("Strong","#2186B5","#94DCF5","#FFFFFF","#176A91","#64CEF2"),m("Note","#122E4B","#62A9F5","#DCEFFF"),m("Success","#103D32","#4DD69A","#DDF7EE"),m("Warning","#4B2C0D","#F3A34C","#FFF0D8"),m("Danger","#4B1923","#F07A8C","#FFE4E7"),m("Highlight","#4A3D0A","#E6C54B","#FFF8C9"))},midnight:{label:"Midnight",light:Se(m("Background","#F5F7FC","#CAD3E4","#101D38"),m("Pale","#E9EEF8","#B6C4DC","#172744"),m("Light","#D9E2F2","#91A5C5","#172744"),m("Neutral","#C1CEE1","#6F85A6","#14223C"),m("Dark","#243B63","#1B3155","#F5F8FF"),m("Soft","#DCE7FA","#93A9CE","#1A3158"),m("Accent","#C9DBFA","#5E7FB4","#152D54","#D6E3F8"),m("Strong","#345F9D","#2C548D","#FFFFFF","#416EAE","#6F91C2"),m("Note","#DBE7F8","#5277AE","#1D355D"),m("Success","#DDEFE8","#3E886A","#173F31"),m("Warning","#F8E9D1","#B9702D","#5D3513"),m("Danger","#F4E0E5","#AD5570","#591F30"),m("Highlight","#F8F0C9","#A88222","#554300")),dark:Se(m("Background","#081426","#1F3554","#E8F0FF"),m("Pale","#0D1C32","#2A4265","#E5EEFF"),m("Light","#132843","#3A557A","#EDF4FF"),m("Neutral","#1E385B","#59779E","#EEF5FF"),m("Dark","#91A9C9","#AFC2DB","#0A172A"),m("Soft","#112B4D","#527AA9","#E1EEFF"),m("Accent","#173B68","#6389BA","#ECF4FF","#1B416E"),m("Strong","#2C629F","#6D98CD","#FFFFFF","#356FAF","#6D98CD"),m("Note","#132A4A","#6D96C8","#DDEAFF"),m("Success","#123B31","#5FBA91","#DDF3E8"),m("Warning","#422C14","#D09150","#FBEAD1"),m("Danger","#431E2B","#D27691","#F8E1E8"),m("Highlight","#403710","#C5A543","#FAF2CA"))},paper:{label:"Paper",light:Se(m("Background","#FFFDF7","#E0D8C8","#332D24"),m("Pale","#F7F1E5","#D4C5AD","#40372C"),m("Light","#EEE3D0","#BBA98B","#40372C"),m("Neutral","#D8C8AF","#8C765A","#332D24"),m("Dark","#514536","#332D24","#FFFCF5"),m("Soft","#EEE8DC","#A99879","#44392B"),m("Accent","#E8DDC7","#947044","#3E2D1D","#F7F0E4"),m("Strong","#81592F","#62401F","#FFFFFF","#A77A44","#D3B37B"),m("Note","#E5EFF4","#517B98","#233E50"),m("Success","#E4F0DF","#5D8A54","#294527"),m("Warning","#F9E8CD","#B96B28","#64350D"),m("Danger","#F5E0DA","#AD5342","#5D251C"),m("Highlight","#F8F0BD","#A78216","#584600")),dark:Se(m("Background","#29251F","#554B3E","#F9F2E6"),m("Pale","#373027","#6F6250","#F9F2E6"),m("Light","#4A4033","#8B7B64","#FFF9EE"),m("Neutral","#675947","#A89880","#FFF9EE"),m("Dark","#CBBCA4","#E8DBC7","#30291F"),m("Soft","#463B2D","#B6A080","#FFF8E9"),m("Accent","#5C482F","#D1B98A","#FFF9EE","#483622"),m("Strong","#916C3C","#E0C28B","#FFFFFF","#705029","#CFAA69"),m("Note","#273A46","#7DB2D0","#E5EFF4"),m("Success","#31452B","#9BC58F","#E4F0DF"),m("Warning","#503016","#E3A060","#F9E8CD"),m("Danger","#51281F","#DA8A79","#F5E0DA"),m("Highlight","#4A3D12","#D6BC48","#F8F0BD"))}},ct={light:{edge:{stroke:"#52616B",strokeWidth:2,text:"#3E4A54"},node:{fill:"#EAF2FF",stroke:"#3574C7",strokeWidth:2,text:"#17202A"}},dark:{edge:{stroke:"#B8C7D5",strokeWidth:2,text:"#D9E4ED"},node:{fill:"#193A61",stroke:"#71AEF7",strokeWidth:2,text:"#F3F8FC"}}};var Kt=["note","info","warning","success"],Zt={2:"repeat(2, minmax(0, 1fr))",3:"repeat(3, minmax(0, 1fr))","2fr 1fr":"minmax(0, 2fr) minmax(0, 1fr)","1fr 2fr":"minmax(0, 1fr) minmax(0, 2fr)"};var vr=["nodes","edges","participants","messages","activations","notes","groups"],kr=["id","label","shape","position","size","style","palette","subtitle","textVAlign","textHAlign","children"],Fr=["source","target","sourceAnchor","targetAnchor","route","label","style","start","end","waypoint"],Qt=["fill","stroke","strokeWidth","text"],Dr=["stroke","strokeWidth","text"],Nr=["id","label","kind","palette","style","size"],Ar=["actor"],Mr=["from","to","label","style"],Cr=["solid","dashed"],Tr=["participant","from","to"],qr=["at","after","label","palette","style","size"],Pr=["label","from","to"],Lr=["width","height","participantSpacing","participantSize"];function w(r){return String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Re(r){let e=r.trim();if(e.startsWith('"')&&e.endsWith('"'))try{return JSON.parse(e)}catch{throw new Error(`Invalid quoted scalar: ${e}`)}if(e.startsWith("'")&&e.endsWith("'"))return e.slice(1,-1);if(/^-?\d+(\.\d+)?$/.test(e))return Number(e);if(e==="true"||e==="false")return e==="true";if(e.startsWith("{")&&e.endsWith("}")){let t=e.slice(1,-1).trim();if(!t)return{};let n=t.split(","),o={};for(let i of n){let s=i.indexOf(":");if(s===-1)throw new Error(`Invalid inline mapping: ${e}`);let a=i.slice(0,s).trim();o[a]=Re(i.slice(s+1))}return o}return e}function De(r,e="classic"){let n=r.replace(/\r\n/g,`
`).split(`
`).filter(h=>h.trim()&&!h.trimStart().startsWith("#"));for(let h of n){if(h.trimStart()!==h||!h.trimEnd().endsWith(":"))continue;let y=h.trim().slice(0,-1);if(y!=="canvas"&&!vr.includes(y))throw new Error(`Unsupported diagram section: ${y}`)}let o=0,i=h=>h.length-h.trimStart().length,s=h=>h.trim().match(/^([^:]+):\s*(.*)$/),a=h=>h.trim().match(/^- ([^:]+):\s*(.*)$/),d=h=>o>=n.length||i(n[o])<=h?{}:n[o].trimStart().startsWith("- ")?l(i(n[o])):u(i(n[o])),u=h=>{let y={};for(;o<n.length&&i(n[o])===h;){let f=n[o],p=s(f);if(!p)throw new Error(`Cannot parse diagram line: ${f}`);o+=1,y[p[1]]=p[2]?Re(p[2]):d(h)}return y},l=h=>{let y=[];for(;o<n.length&&i(n[o])===h;){let f=n[o],p=a(f);if(!p)throw new Error(`Cannot parse diagram line: ${f}`);o+=1;let $={[p[1]]:p[2]?Re(p[2]):d(h)};for(;o<n.length&&i(n[o])>h;){let v=i(n[o]),g=s(n[o]);if(!g)throw new Error(`Cannot parse diagram line: ${n[o]}`);o+=1,$[g[1]]=g[2]?Re(g[2]):d(v)}y.push($)}return y},c=u(0);if(!c.type)throw new Error(`Diagram type is required and must be one of: ${Je.join(", ")}.`);if(typeof c.type!="string"||!Je.includes(c.type))throw new Error(`Unsupported diagram type: ${String(c.type)}`);return c.type==="flowchart"?zr(c,e):Br(c,e)}function zr(r,e="classic"){return r.canvas=r.canvas||{},Array.isArray(r.nodes)||(r.nodes=[]),Array.isArray(r.edges)||(r.edges=[]),Ir(r,e),r}function Br(r,e="classic"){return Rr(r,e),r}function le(r,e,t){for(let n of Object.keys(r||{}))if(!e.includes(n))throw new Error(`Unsupported ${t} field: ${n}`)}function Ct(r,e,t){if(r){for(let n of Object.keys(r))if(!e.includes(n))throw new Error(`Unsupported ${t} style field: ${n}`)}}function Ir(r,e="classic"){if(r.participants!==void 0||r.messages!==void 0||r.activations!==void 0||r.notes!==void 0||r.groups!==void 0)throw new Error("Flowchart diagrams do not support sequence sections.");let t=new Set,n=o=>{if("type"in o)throw new Error(`Node "${o.id||"unknown"}" uses removed field "type".`);if(le(o,kr,`node "${o.id||"unknown"}"`),!o.id||typeof o.label!="string")throw new Error("Every node requires an id and a string label.");if(!o.shape)throw new Error(`Node "${o.id}" requires a shape.`);if(!Be.includes(o.shape))throw new Error(`Unsupported node shape: ${o.shape}`);if(o.textVAlign!==void 0&&!_t.includes(o.textVAlign))throw new Error(`Unsupported node textVAlign: ${o.textVAlign}`);if(o.textHAlign!==void 0&&!Xt.includes(o.textHAlign))throw new Error(`Unsupported node textHAlign: ${o.textHAlign}`);if(o.palette!==void 0&&(typeof o.palette!="string"||!xe.includes(o.palette)))throw new Error(`Unsupported node palette: ${String(o.palette||"unknown")}`);if(o.style?.width!==void 0)throw new Error("Node style.width is not supported; use style.strokeWidth.");if(Ct(o.style,Qt,`node "${o.id}"`),t.has(o.id))throw new Error(`Duplicate flowchart node id: ${o.id}`);if(t.add(o.id),o.children!==void 0&&!Array.isArray(o.children))throw new Error(`Children for node "${o.id}" must be a list.`);for(let i of o.children||[])n(i)};for(let o of r.nodes)n(o);for(let o of r.edges){if(le(o,Fr,`edge "${o.source||"unknown"}" -> "${o.target||"unknown"}"`),!o.sourceAnchor)throw new Error(`Edge "${o.source||"unknown"}" -> "${o.target||"unknown"}" requires a sourceAnchor.`);if(!o.targetAnchor)throw new Error(`Edge "${o.source||"unknown"}" -> "${o.target||"unknown"}" requires a targetAnchor.`);if(!ne.includes(o.sourceAnchor))throw new Error(`Unsupported edge sourceAnchor: ${o.sourceAnchor}`);if(!ne.includes(o.targetAnchor))throw new Error(`Unsupported edge targetAnchor: ${o.targetAnchor}`);if(o.route!==void 0&&!Ie.includes(o.route))throw new Error(`Unsupported edge route: ${o.route}`);if(o.waypoint!==void 0){if(typeof o.waypoint!="object"||Array.isArray(o.waypoint))throw new Error(`Edge "${o.source}" -> "${o.target}" waypoint must be a mapping.`);let i=o.waypoint;if(!Number.isFinite(i.x)||!Number.isFinite(i.y))throw new Error(`Edge "${o.source}" -> "${o.target}" waypoint requires finite x and y coordinates.`);le(o.waypoint,["x","y"],`edge "${o.source}" -> "${o.target}" waypoint`)}if(o.start!==void 0&&!Q.includes(o.start))throw new Error(`Unsupported edge start marker: ${o.start}`);if(o.end!==void 0&&!Q.includes(o.end))throw new Error(`Unsupported edge end marker: ${o.end}`);if(o.style?.width!==void 0)throw new Error("Edge style.width is not supported; use style.strokeWidth.");Ct(o.style,Dr,`edge "${o.source||"unknown"}" -> "${o.target||"unknown"}"`)}}function Rr(r,e="classic"){if(r.nodes!==void 0||r.edges!==void 0)throw new Error("Sequence diagrams do not support flowchart sections.");if(!Array.isArray(r.participants)||!Array.isArray(r.messages))throw new Error("Sequence diagrams require participants and messages sections.");if(r.activations!==void 0&&!Array.isArray(r.activations))throw new Error("Sequence diagram activations must be a list.");if(r.notes!==void 0&&!Array.isArray(r.notes))throw new Error("Sequence diagram notes must be a list.");if(r.groups!==void 0&&!Array.isArray(r.groups))throw new Error("Sequence diagram groups must be a list.");if(r.canvas!==void 0&&(typeof r.canvas!="object"||Array.isArray(r.canvas)))throw new Error("Sequence canvas must be a mapping.");le(r.canvas,Lr,"sequence canvas");for(let n of["width","height","participantSpacing"]){let o=r.canvas?.[n];if(o!==void 0&&(!Number.isFinite(o)||Number(o)<=0))throw new Error(`Sequence canvas.${n} must be a positive number.`)}if(r.canvas?.participantSize!==void 0){if(typeof r.canvas.participantSize!="object"||Array.isArray(r.canvas.participantSize))throw new Error("Sequence canvas.participantSize must be a mapping.");le(r.canvas.participantSize,["width","height"],"sequence canvas participantSize");for(let n of["width","height"]){let o=r.canvas.participantSize[n];if(o!==void 0&&(!Number.isFinite(o)||Number(o)<=0))throw new Error(`Sequence canvas.participantSize.${n} must be a positive number.`)}}let t=new Set;for(let n of r.participants){if(le(n,Nr,`participant "${n.id||"unknown"}"`),!n.id||!n.label)throw new Error("Every sequence participant requires an id and label.");if(n.kind!==void 0&&!Ar.includes(n.kind))throw new Error(`Unsupported sequence participant kind: ${n.kind}`);if(Jt(n,`participant "${n.id}"`,e),t.has(n.id))throw new Error(`Duplicate sequence participant id: ${n.id}`);t.add(n.id)}for(let[n,o]of r.messages.entries()){if(le(o,Mr,`message ${n}`),!o.from||!o.to||!o.label)throw new Error(`Sequence message ${n} requires from, to, and label.`);if(!t.has(o.from)||!t.has(o.to))throw new Error(`Sequence message ${n} references an unknown participant.`);if(o.style!==void 0&&!Cr.includes(o.style))throw new Error(`Unsupported sequence message style: ${o.style}`)}for(let[n,o]of(r.activations||[]).entries()){if(le(o,Tr,`activation ${n}`),!o.participant||!Number.isInteger(o.from)||!Number.isInteger(o.to))throw new Error(`Sequence activation ${n} requires participant and integer from and to message positions.`);if(!t.has(o.participant))throw new Error(`Sequence activation ${n} references an unknown participant.`);if(o.from<1||o.to<o.from||o.to>r.messages.length)throw new Error(`Sequence activation ${n} range is out of bounds.`)}for(let[n,o]of(r.notes||[]).entries()){le(o,qr,`note ${n}`);let i=o.after;if(!o.at||!Number.isInteger(i)||!o.label)throw new Error(`Sequence note ${n} requires at, after, and label.`);if(Jt(o,`note ${n}`,e),!t.has(o.at))throw new Error(`Sequence note ${n} references an unknown participant.`);if(i<0||i>r.messages.length)throw new Error(`Sequence note ${n} after position is out of bounds.`)}for(let[n,o]of(r.groups||[]).entries()){if(le(o,Pr,`group ${n}`),!o.label&&o.label!=="")throw new Error(`Sequence group ${n} requires a label.`);if(!Number.isInteger(o.from)||!Number.isInteger(o.to))throw new Error(`Sequence group ${n} requires integer from and to indices.`);if(o.from<1||o.to<o.from||o.to>r.messages.length)throw new Error(`Sequence group ${n} range is out of bounds.`)}}function Jt(r,e,t="classic"){if(r.palette!==void 0){let n=String(r.palette||"");if(!xe.includes(n))throw new Error(`Unsupported ${e} palette: ${n||"unknown"}`)}if(Ct(r.style,Qt,e),r.size){le(r.size,["width","height"],`size for ${e}`);for(let n of["width","height"]){let o=r.size[n];if(o!==void 0&&(!Number.isFinite(o)||Number(o)<=0))throw new Error(`${e} size.${n} must be a positive number.`)}}}function Ne(r){return typeof r=="number"||typeof r=="boolean"?String(r):r&&typeof r=="object"?Object.keys(r).length?`{ ${Object.entries(r).map(([e,t])=>`${e}: ${Ne(t)}`).join(", ")} }`:"{}":/^[\w./-]+(?: [\w./-]+)*$/.test(String(r))?String(r):JSON.stringify(String(r))}function $e(r,e=2){let t=Object.entries(r),[n,o]=t[0],i=[`${" ".repeat(e)}- ${n}: ${Ne(o)}`];for(let[s,a]of t.slice(1))if(!(s==="children"&&Array.isArray(a)&&!a.length))if(s==="children"&&Array.isArray(a)){i.push(`${" ".repeat(e+2)}children:`);for(let d of a)i.push(...$e(d,e+4))}else i.push(`${" ".repeat(e+2)}${s}: ${Ne(a)}`);return i}function lt(r){let e=[`type: ${Ne(r.type)}`];for(let[t,n]of Object.entries(r))t==="type"||t==="canvas"||t==="nodes"||t==="edges"||t==="participants"||t==="messages"||t==="activations"||t==="notes"||t==="groups"||e.push(`${t}: ${Ne(n)}`);if(r.type==="sequence"){if(r.canvas!==void 0){e.push("canvas:");for(let[t,n]of Object.entries(r.canvas))e.push(`  ${t}: ${Ne(n)}`)}e.push("participants:");for(let t of r.participants||[])e.push(...$e(t));e.push("messages:");for(let t of r.messages||[])e.push(...$e(t));if(r.activations!==void 0){e.push("activations:");for(let t of r.activations||[])e.push(...$e(t))}if(r.notes!==void 0){e.push("notes:");for(let t of r.notes||[])e.push(...$e(t))}if(r.groups!==void 0){e.push("groups:");for(let t of r.groups||[])e.push(...$e(t))}return e.join(`
`)}e.push("canvas:");for(let[t,n]of Object.entries(r.canvas||{}))e.push(`  ${t}: ${Ne(n)}`);e.push("nodes:");for(let t of r.nodes||[])e.push(...$e(t));e.push("edges:");for(let t of r.edges||[])e.push(...$e(t));return e.join(`
`)}function er(r){return{width:Number(r.size?.width)||I.width,height:Number(r.size?.height)||I.height}}function U(r){let e=[],t=(n,o,i,s)=>{for(let a of n){let d={x:i.x+(Number(a.position?.x)||0),y:i.y+(Number(a.position?.y)||0)};e.push({node:a,parent:o,siblings:n,position:d,depth:s}),t(a.children||[],a,d,s+1)}};return t(r.nodes,null,{x:0,y:0},0),e}function V(r,e){return U(r).find(t=>t.node.id===e)||null}function Tt(r,e){return U(r).find(t=>t.node===e)?.position||{x:0,y:0}}function X(r,e){return{...Tt(r,e),...er(e)}}function tr(r,e){return(e.children||[]).some(t=>t===r||tr(r,t))}function ut(r,e){var h;let t=V(r,e);if(!t)return null;let{node:n,siblings:o,position:i}=t,{width:s,height:a}=er(n),d={x:i.x+s/2,y:i.y+a/2},l=U(r).filter(y=>y.node!==n&&!tr(y.node,n)).filter(y=>{let f=X(r,y.node);return d.x>=f.x&&d.x<=f.x+f.width&&d.y>=f.y&&d.y<=f.y+f.height}).reduce((y,f)=>!y||f.depth>=y.depth?f:y,null),c=l?(h=l.node).children||(h.children=[]):r.nodes;return o===c||(o.splice(o.indexOf(n),1),n.position={x:i.x-(l?.position.x||0),y:i.y-(l?.position.y||0)},c.push(n)),n}function mt(r){if(r==="light"||r==="dark")return r;if(r==="auto")return globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches?"dark":"light";throw new Error(`Unsupported document theme: ${r}`)}function Me(r,e="light"){let t=mt(e),n=ct[t];if(!n)throw new Error(`Unsupported diagram theme: ${t}`);return n}function ie(r,e,t){return ce[r]?.[mt(e)]?.[t]||null}function Ae(r,e){return{...r,...e||{}}}function ve(r,e,t="light",n="classic"){let i=Me(r,t).node,s=e.palette?ie(n,t,e.palette):null;return Ae(Ae(i,s),e.style)}function He(r,e,t="light",n="classic"){let o=Me(r,t),i=e.palette?ie(n,t,e.palette):null;return Ae(Ae(o.node,i),e.style)}function je(r,e,t="light"){let n=Me(r,t);return Ae(n.edge,e.style)}function et(r,e){let t=e==="start"?r.start:r.end;return typeof t=="string"&&Q.includes(t)?t:Qe[e]}function ee(r){let e=Number(r.canvas?.grid);return Number.isFinite(e)&&e>0?e:0}function K(r,e){return e?Math.round(r/e)*e:Math.round(r)}function Oe(r,e,t){let n=K(r,t),o=t?Math.ceil(e/t)*t:e;return Math.max(o,n)}function rr(r){return{x:Number(r.position?.x)||0,y:Number(r.position?.y)||0,width:Number(r.size?.width)||I.width,height:Number(r.size?.height)||I.height}}function Ve(r,e,t=40){let n=Number(r.canvas?.width)||1e3,o=Number(r.canvas?.height)||560,i=new Set(U(r).map(f=>f.node)),s=[...i];s.includes(e)||s.push(e);let a=f=>i.has(f)?X(r,f):rr(f),d=s.map(a),u=Math.min(0,...d.map(f=>f.x)),l=Math.min(0,...d.map(f=>f.y)),c=u<0?t-u:0,h=l<0?t-l:0;if(c||h)for(let f of U(r).filter(p=>p.parent===null)){let p=f.node;p.position={...p.position,x:(Number(p.position?.x)||0)+c,y:(Number(p.position?.y)||0)+h}}let y=s.map(a);return r.canvas={...r.canvas,width:Math.max(n+c,...y.map(f=>f.x+f.width+t)),height:Math.max(o+h,...y.map(f=>f.y+f.height+t))},r}function or(r,e){return r.x<e.x+e.width&&r.x+r.width>e.x&&r.y<e.y+e.height&&r.y+r.height>e.y}function qt(r,e="new-node"){let t=i=>i.flatMap(s=>[s.id,...t(s.children||[])]),n=new Set(t(r));if(!n.has(e))return e;let o=2;for(;n.has(`${e}-${o}`);)o+=1;return`${e}-${o}`}function Hr(r,e){let t=e.replace(/[^a-z0-9]/gi,"").toLowerCase()||"node",n=1,o="";do o=`${t}${String(n).padStart(2,"0")}`,n+=1;while(r.has(o));return r.add(o),o}function jr(r,e,t,n){let o=Number(r.canvas?.width)||1e3,i=Number(r.canvas?.height)||560,s=ee(r),a=s||20,d={x:K(n.x,s),y:K(n.y,s)};for(let l=a;l<=Math.max(o,i);l+=a)for(let c of[{x:d.x+l,y:d.y+l},{x:d.x+l,y:d.y-l},{x:d.x-l,y:d.y+l},{x:d.x-l,y:d.y-l}])if(!(c.x<0||c.y<0||c.x+e>o||c.y+t>i)&&!U(r).some(({node:h})=>or({...c,width:e,height:t},X(r,h))))return c;let u=Math.max(0,...U(r).map(({node:l})=>{let c=X(r,l);return c.x+c.width}));return{x:K(u+a,s),y:0}}function Pt(r){let e=Number(r.canvas?.width)||1e3,t=Number(r.canvas?.height)||560,n=ee(r),o={x:K(Math.max(0,(e-I.width)/2),n),y:K(Math.max(0,(t-I.height)/2),n)},i=n||20;for(let s=0;s<=Math.max(e,t);s+=i)for(let a of[{x:o.x+s,y:o.y},{x:o.x-s,y:o.y},{x:o.x,y:o.y+s},{x:o.x,y:o.y-s}])if(!(a.x<0||a.y<0||a.x+I.width>e||a.y+I.height>t)&&!U(r).some(({node:d})=>or({...a,width:I.width,height:I.height},rr(d))))return a;return o}function Lt(r){let e={id:qt(r.nodes),label:I.label,shape:I.shape,position:Pt(r),size:{width:I.width,height:I.height}};return r.nodes.push(e),e}function Ge(r,e){let t=V(r,e);if(!t)return null;let n=new Set(U(r).map(({node:u})=>u.id)),o=u=>({id:Hr(n,u.shape),label:u.label,shape:u.shape,...u.position?{position:{...u.position}}:{},...u.size?{size:{...u.size}}:{},...u.style?{style:{...u.style}}:{},...u.palette?{palette:u.palette}:{},...u.subtitle!==void 0?{subtitle:u.subtitle}:{},...u.textVAlign!==void 0?{textVAlign:u.textVAlign}:{},...u.textHAlign!==void 0?{textHAlign:u.textHAlign}:{},...u.children?{children:u.children.map(o)}:{}}),i=o(t.node),s=X(r,t.node),a=jr(r,Number(i.size?.width)||I.width,Number(i.size?.height)||I.height,s),d=t.parent?Tt(r,t.parent):{x:0,y:0};return i.position={x:a.x-d.x,y:a.y-d.y},t.siblings.push(i),Ve(r,i),i}function gt(r,e,t,n,o){let i={source:e,target:n,sourceAnchor:t,targetAnchor:o,route:"orthogonal",end:"arrow"};return r.edges.push(i),i}function ht(r,e,t,n){return e==="source"?(r.source=t,r.sourceAnchor=n):(r.target=t,r.targetAnchor=n),r}function We(r,e){return e<0||e>=r.edges.length?null:r.edges.splice(e,1)[0]}function Ue(r,e){let t=V(r,e);if(!t)return{node:null,deletedEdges:[]};let n=new Set([t.node,...t.node.children||[]].flatMap(function i(s){return[s,...(s.children||[]).flatMap(i)]}).map(i=>i.id)),o=r.edges.filter(i=>n.has(i.source)||n.has(i.target));return t.siblings.splice(t.siblings.indexOf(t.node),1),r.edges=r.edges.filter(i=>!n.has(i.source)&&!n.has(i.target)),{node:e,deletedEdges:o}}function Ye(r,e){return r.label=String(e).trim(),r}function pt(r,e){return r.shape=e,r}function ft(r,e){return r.subtitle=String(e??"").trim(),r}function tt(r,e,t){return e==="textVAlign"&&(t==="top"||t==="center")&&(r.textVAlign=t),e==="textHAlign"&&(t==="left"||t==="center"||t==="right")&&(r.textHAlign=t),r}function Ce(r,e,t){return r.style={...r.style,[e]:t},r}function rt(r,e,t="classic"){if(!ie(t,"light",e))return r;let{fill:o,stroke:i,text:s,...a}=r.style||{};return Object.keys(a).length?r.style=a:delete r.style,r.palette=e,r}function nr(r){return r==="document"?Mt:At}function ot(r){return{position:{x:Number(r.position?.x)||0,y:Number(r.position?.y)||0},size:{width:Number(r.size?.width)||I.width,height:Number(r.size?.height)||I.height},childPositions:new Map((r.children||[]).map(e=>[e,{x:Number(e.position?.x)||0,y:Number(e.position?.y)||0}]))}}function bt(r,e,t,n,o,i=ot(e)){let s=ee(r),a=nr(e.shape),d=t.endsWith("left"),u=t.startsWith("top"),l=Oe(i.size.width+(d?-n:n),a.width,s),c=Oe(i.size.height+(u?-o:o),a.height,s);if(e.shape==="circle"){let p=Math.max(l,c);l=p,c=p}let h={...e.position,x:d?i.position.x+i.size.width-l:i.position.x,y:u?i.position.y+i.size.height-c:i.position.y},y=i.position.x-h.x,f=i.position.y-h.y;for(let p of e.children||[]){let $=i.childPositions.get(p)||p.position||{x:0,y:0};p.position={...p.position,x:$.x+y,y:$.y+f}}return e.position=h,e.size={...e.size,width:l,height:c},e}function nt(r,e,t,n){let o=ee(r),i=nr(e.shape),s=t==="width"?i.width:i.height,a=Oe(Number(n)||s,s,o);return e.size=e.shape==="circle"?{...e.size,width:a,height:a}:{...e.size,[t]:a},e}function _e(r,e){return r.label=String(e).trim(),r}function yt(r,e){return r.route=e,r}function it(r,e,t){return e==="source"?r.sourceAnchor=t:r.targetAnchor=t,r}function at(r,e,t){return r.style={...r.style,[e]:t},r}function st(r,e){let t=Math.max(1,Math.round(Number(e))||1);return r.style={...r.style,strokeWidth:t},r}function xt(r,e){return r.start=Q.includes(e)?e:Qe.start,r}function wt(r,e){return r.end=Q.includes(e)?e:Qe.end,r}function zt(r){return Math.max(25,Number(r)||100)}function ue(r){return String(r??"").replace(/\r\n/g,`
`).split(`
`)}function ae(r,e,t,n,o,i,s="middle"){if(!t.length)return"";let a=t.map((d,u)=>{let l=u===0?"":` dy="${n}"`;return`<tspan x="${r}"${l}>${w(d)||" "}</tspan>`}).join("");return`<text x="${r}" y="${e}" text-anchor="${s}" class="${o}" fill="${w(i)}">${a}</text>`}function we(r,e,t,n,o){let i=r.shape,s=e+n/2,a=t+o/2,d={x:e+12,y:t+12,width:n-24,height:o-24},u={top:{x:s,y:t},right:{x:e+n,y:a},bottom:{x:s,y:t+o},left:{x:e,y:a}},l;if(i==="circle"){let c=Math.min(n,o),h=s-c/2,y=a-c/2,f=c/2;d.x=h+f*.3,d.y=y+f*.3,d.width=f*1.4,d.height=f*1.4,u.top.y=y,u.right.x=h+c,u.bottom.y=y+c,u.left.x=h,l=`<circle class="docdiagram-node-body" cx="${s}" cy="${a}" r="${f}"/>`}else if(i==="oval")d.x+=n*.1,d.width-=n*.2,l=`<ellipse class="docdiagram-node-body" cx="${s}" cy="${a}" rx="${n/2}" ry="${o/2}"/>`;else if(i==="database"){let c=Math.min(o*.22,18);d.y+=c/2,d.height-=c,l=`<path class="docdiagram-node-body" d="M ${e} ${t+c} C ${e} ${t-c/3} ${e+n} ${t-c/3} ${e+n} ${t+c} V ${t+o-c} C ${e+n} ${t+o+c/3} ${e} ${t+o+c/3} ${e} ${t+o-c} Z"/><path class="docdiagram-node-detail" d="M ${e} ${t+c} C ${e} ${t+c*2.3} ${e+n} ${t+c*2.3} ${e+n} ${t+c}" fill="none"/>`}else if(i==="diamond")d.x+=n*.25,d.y+=o*.25,d.width-=n*.5,d.height-=o*.5,u.top={x:s,y:t},u.right={x:e+n,y:a},u.bottom={x:s,y:t+o},u.left={x:e,y:a},l=`<polygon class="docdiagram-node-body" points="${s},${t} ${e+n},${a} ${s},${t+o} ${e},${a}"/>`;else if(i==="rhombus"){let c=Math.min(n*.2,o*.6);d.x+=c,d.width-=c*2,u.left.x=e+c/2,u.right.x=e+n-c/2,l=`<polygon class="docdiagram-node-body" points="${e+c},${t} ${e+n},${t} ${e+n-c},${t+o} ${e},${t+o}"/>`}else if(i==="flattened-hexagon"){let c=Math.min(n*.18,o*.7);d.x+=c,d.width-=c*2,l=`<polygon class="docdiagram-node-body" points="${e+c},${t} ${e+n-c},${t} ${e+n},${a} ${e+n-c},${t+o} ${e+c},${t+o} ${e},${a}"/>`}else if(i==="chevron"){let c=Math.min(n*.16,o*.45);d.x+=c*1.175,d.width-=c*1.35,u.left.x=e+c,l=`<polygon class="docdiagram-node-body" points="${e},${t} ${e+n-c},${t} ${e+n},${a} ${e+n-c},${t+o} ${e},${t+o} ${e+c},${a}"/>`}else if(i==="right-chevron"){let c=Math.min(n*.16,o*.45);d.width-=c,l=`<polygon class="docdiagram-node-body" points="${e},${t} ${e+n-c},${t} ${e+n},${a} ${e+n-c},${t+o} ${e},${t+o}"/>`}else if(i==="document"){let c=Math.max(12,Math.min(26,Math.min(n,o)*.18));d.width-=c*.45,d.y+=2,d.height-=2,l=`<path class="docdiagram-node-body" d="M ${e} ${t} H ${e+n-c} L ${e+n} ${t+c} V ${t+o} H ${e} Z M ${e+n-c} ${t} V ${t+c} H ${e+n}"/>`}else l=`<rect class="docdiagram-node-body" x="${e}" y="${t}" width="${n}" height="${o}" rx="12"/>`;return{bodyMarkup:l,textBounds:d,anchors:u}}function Xe(r,e,t,n,o){let i,s;typeof r=="number"?(i={x:r,y:e,width:t||0,height:n||0},s=o):(i=r,s=e);let a=20,d=15,u=ue(s.label),l=s.subtitle?ue(s.subtitle):[],c=l.length?6:0,h=u.length*a,y=l.length*d,f=h+c+y,p=s.textHAlign||"center",$=p==="left"?i.x:p==="right"?i.x+i.width:i.x+i.width/2,v=p==="left"?"start":p==="right"?"end":"middle",g=i.y+i.height/2,E=s.textVAlign==="top"?i.y:g-f/2;return{centerX:$,textAnchor:v,labelLines:u,subtitleLines:l,labelLineHeight:a,subtitleLineHeight:d,labelStartY:E+a*.72,subtitleStartY:E+h+c+d*.72}}function Ke(r,e,t){return r.bodyMarkup.replace("/>",` fill="${w(e.fill||"")}" stroke="${w(e.stroke||"")}" stroke-width="${t}"/>`).replace('class="docdiagram-node-detail"',`class="docdiagram-node-detail" stroke="${w(e.stroke||"")}" stroke-width="${t}"`)}function ir(r){return{top:{x:0,y:-1},right:{x:1,y:0},bottom:{x:0,y:1},left:{x:-1,y:0}}[r]}function pe(r){return`${r.x} ${r.y}`}function ar(r){let e=r.slice(1).map((o,i)=>{let s=r[i];return{start:s,end:o,length:Math.hypot(o.x-s.x,o.y-s.y)}}),n=e.reduce((o,i)=>o+i.length,0)/2;for(let o of e){if(n<=o.length||o===e[e.length-1]){let i=o.length?n/o.length:0;return{x:o.start.x+(o.end.x-o.start.x)*i,y:o.start.y+(o.end.y-o.start.y)*i}}n-=o.length}return r[0]}function ke(r,e,t,n,o="orthogonal",i){let s=ir(t),a=ir(n),d=s.x!==0,u=a.x!==0,l,c,h,y;if(i){let p=(i.x-r.x)*s.x+(i.y-r.y)*s.y<=0,$=(i.x-e.x)*a.x+(i.y-e.y)*a.y<=0,v={x:r.x+s.x*24,y:r.y+s.y*24},g={x:e.x+a.x*24,y:e.y+a.y*24},E=p?[r,v,d?{x:v.x,y:i.y}:{x:i.x,y:v.y},i]:[r,d?{x:i.x,y:r.y}:{x:r.x,y:i.y},i],x=$?[u?{x:g.x,y:i.y}:{x:i.x,y:g.y},g,e]:[u?{x:i.x,y:e.y}:{x:e.x,y:i.y},e],k=[...E,...x].filter((A,T,D)=>T===0||A.x!==D[T-1].x||A.y!==D[T-1].y);l=`M ${pe(k[0])}${k.slice(1).map(A=>` L ${pe(A)}`).join("")}`,c=ar(k),h={x:k[1].x-k[0].x,y:k[1].y-k[0].y};let F=k.slice(-2);y={x:F[1].x-F[0].x,y:F[1].y-F[0].y}}else if(o==="straight")l=`M ${pe(r)} L ${pe(e)}`,c={x:(r.x+e.x)/2,y:(r.y+e.y)/2},h={x:e.x-r.x,y:e.y-r.y},y=h;else if(o==="curved"){let f=Math.max(Math.abs(e.x-r.x),Math.abs(e.y-r.y),80),p=Math.min(f/2,140),$={x:r.x+s.x*p,y:r.y+s.y*p},v={x:e.x+a.x*p,y:e.y+a.y*p};l=`M ${pe(r)} C ${pe($)} ${pe(v)} ${pe(e)}`,c={x:(r.x+3*$.x+3*v.x+e.x)/8,y:(r.y+3*$.y+3*v.y+e.y)/8},h={x:$.x-r.x,y:$.y-r.y},y={x:e.x-v.x,y:e.y-v.y}}else{let f=a.x!==0,p=d===f,$=s.x===a.x&&s.y===a.y,v=Math.max(Math.abs(e.x-r.x),Math.abs(e.y-r.y)),g;if(p){let k=d?r.x:r.y,F=d?e.x:e.y,A=d?s.x:s.y,T=d?a.x:a.y,D=$?A>0?Math.max(k,F)+v/2:Math.min(k,F)-v/2:(k+F)/2,M=Math.sign(D-k),q=Math.sign(F-D);if(!$&&(M!==A||q!==-T)){let C=v/2,L={x:r.x+s.x*C,y:r.y+s.y*C},R={x:e.x+a.x*C,y:e.y+a.y*C};g=d?[r,L,{x:L.x,y:Math.min(r.y,e.y)-C},{x:R.x,y:Math.min(r.y,e.y)-C},R,e]:[r,L,{x:Math.min(r.x,e.x)-C,y:L.y},{x:Math.min(r.x,e.x)-C,y:R.y},R,e]}else g=d?[r,{x:D,y:r.y},{x:D,y:e.y},e]:[r,{x:r.x,y:D},{x:e.x,y:D},e]}else{let k=v/4,F={x:r.x+s.x*k,y:r.y+s.y*k},A={x:e.x+a.x*k,y:e.y+a.y*k};g=d?[r,F,{x:A.x,y:F.y},A,e]:[r,F,{x:F.x,y:A.y},A,e]}let E=g.filter((k,F)=>F===0||k.x!==g[F-1].x||k.y!==g[F-1].y);E.length===1&&(E=[r,e]),l=`M ${pe(E[0])}${E.slice(1).map(k=>` L ${pe(k)}`).join("")}`,c=ar(E),h={x:E[1].x-E[0].x,y:E[1].y-E[0].y};let x=E.slice(-2);y={x:x[1].x-x[0].x,y:x[1].y-x[0].y}}return{path:l,midpoint:c,startTangent:h,endTangent:y,hitPath:l}}function Bt(r){let e=Math.max(1,Number(r)||2),t=6+e*2.5,n=Math.max(t*.38,e/2+1);return{size:t,circleRadius:n}}function dt(r,e,t,n,o){let i=w(n),{size:s,circleRadius:a}=Bt(o),d=s/2;return e==="arrow"?`<marker id="${r}" markerWidth="${s}" markerHeight="${s}" refX="${s}" refY="${d}" markerUnits="userSpaceOnUse" orient="${t==="start"?"auto-start-reverse":"auto"}"><path fill="${i}" stroke="${i}" d="M 0 0 L ${s} ${d} L 0 ${s} z"/></marker>`:e==="circle"?`<marker id="${r}" markerWidth="${s}" markerHeight="${s}" refX="${d}" refY="${d}" markerUnits="userSpaceOnUse"><circle cx="${d}" cy="${d}" r="${a}" fill="${i}" stroke="${i}"/></marker>`:""}function It(r){let e=r.replace(/\r\n/g,`
`).split(`
`),t=e.findIndex(i=>i.trim()!=="");if(t===-1||e[t]!=="---")return{content:r,frontmatter:{}};let n=e.indexOf("---",t+1);if(n===-1)return{content:r,frontmatter:{}};let o={};for(let i of e.slice(t+1,n)){if(!i.trim()||i.trimStart().startsWith("#"))continue;let s=i.match(/^([^:]+):\s*(.*)$/);if(!s)throw new Error(`Cannot parse document frontmatter line: ${i}`);o[s[1]]=Re(s[2])}return{content:e.slice(n+1).join(`
`),frontmatter:o}}function Et(r){let e=It(r),t=String(e.frontmatter.theme||"auto"),n=String(e.frontmatter.colourScheme||"classic"),o;try{o=mt(t)}catch{throw new Error(`Unsupported document theme: ${t}`)}if(!ce[n])throw new Error(`Unsupported document colour scheme: ${n}`);return{...e,theme:t,resolvedTheme:o,colourScheme:n}}function Rt(r){let e=Et(r),t=e.content.replace(/\r\n/g,`
`).split(`
`),n=0,o=new Set,i=!1,s=!1;for(let a of t){let d=a.replace(/^(?: {0,3}> ?)+/,"");if(/^```/.test(d)){s=!s;continue}if(!s&&/^:::diagram\s+\{\s*id=/.test(d)){i=!0;break}}for(;n<t.length;){let d=t[n].replace(/^(?: {0,3}> ?)+/,"").match(/^```([\w-]*)\s*$/);if(!d){n+=1;continue}let u=t.slice(n+1).findIndex(c=>/^```\s*$/.test(c.replace(/^(?: {0,3}> ?)+/,"")));if(u===-1)throw new Error("Unclosed code block.");let l=n+u+1;if(d[1]==="diagram"){let c=t.slice(n+1,l).map(y=>y.replace(/^(?: {0,3}> ?)+/,"")).join(`
`);De(c,e.colourScheme);let h=c.match(/^id:\s*(?:"([^"]+)"|([^\s#]+))\s*$/m)?.slice(1).find(Boolean);if(h){if(o.has(h))throw new Error(`Duplicate diagram id: ${h}`);o.add(h)}else if(i)throw new Error("Every diagram requires an id when using diagram references.")}n=l+1}return e}function sr(r,e,t){let n=r.replace(/\r\n/g,`
`),o=n.split(`
`),i=o.findIndex(l=>l.trim()!==""),s=i!==-1&&o[i]==="---",a=s?o.indexOf("---",i+1):-1;if(!s||a===-1)return`---
${e}: ${t}
---
${n}`;let d=!1,u=o.slice(i+1,a).map(l=>{if(!l.trim()||l.trimStart().startsWith("#"))return l;let c=l.match(/^([^:]+):\s*(.*)$/);return c&&c[1]===e?(d=!0,`${e}: ${t}`):l});return d||u.push(`${e}: ${t}`),[...o.slice(0,i+1),...u,...o.slice(a)].join(`
`)}function Ht(r,e){return sr(r,"theme",e)}function dr(r,e){return sr(r,"colourScheme",e)}function St(r,e){let t=e.trim(),n=t?r.indexOf(t):-1;return n===-1?null:{start:n,end:n+t.length}}function $t(r,e){let t=Number.parseFloat(globalThis.getComputedStyle(r).lineHeight)||20,n=r.value.slice(0,e.start).split(`
`).length-1,o=Math.max(1,Math.floor(r.clientHeight/t));r.scrollTop=Math.max(0,(n-Math.floor(o/2))*t)}function jt(r){let e=[],t="",n=!1,o=r.trim().replace(/^\||\|$/g,"");for(let i of o)n?(t+=i,n=!1):i==="\\"?n=!0:i==="|"?(e.push(t.trim()),t=""):t+=i;return e.push(t.trim()),e}function cr(r){let e=jt(r);return!e.length||!e.every(t=>/^:?-{3,}:?$/.test(t))?null:e.map(t=>t.startsWith(":")&&t.endsWith(":")?"center":t.startsWith(":")?"left":t.endsWith(":")?"right":"")}function Te(r){return r.match(/^(\s*)([-+*]|\d+[.)])\s+(.+)$/)}function Ot(r){let e=r.match(/^:::(section|panel|callout|grid|stack)(?:\s+\{(.*)\})?\s*$/);if(!e)return null;let t={},n=e[2];if(n!==void 0){let o=0,i=/\s*([a-z][\w-]*)=(?:"([^"]*)"|([^\s}]+))/gi,s;for(;s=i.exec(n);){if(s.index!==o||t[s[1]]!==void 0)return null;t[s[1]]=s[2]??s[3],o=i.lastIndex}if(n.slice(o).trim())return null}return{name:e[1],attributes:t}}function lr(r){let e=r.match(/^:::diagram\s+\{\s*id=(?:"([^"]+)"|([^\s}]+))\s*\}\s*$/),t=e?.[1]??e?.[2];return t?{id:t}:null}function ur(r){let e=r.match(/^id:\s*(?:"([^"]+)"|([^\s#]+))\s*$/m);return e?.[1]??e?.[2]??null}function Or(r){return r.replace(/^(?: {0,3}> ?)+/,"")}function Vr(r){return/^:::(?:\s+.*)?$/.test(r)}function Gr(r,e,t){let n=1,o=!1;for(let i=e+1;i<t;i+=1){if(/^```/.test(r[i])){o=!o;continue}if(!o){if(Ot(r[i]))n+=1;else if(Vr(r[i])&&(n-=1,!n))return i}}return-1}function Wr(r){return/^#[\da-f]{3,8}$/i.test(r)}function Ur(r,e="classic",t="light"){let n=r.palette!==void 0;if(n&&!xe.includes(r.palette))return null;for(let a of["fill","stroke","text"])if(r[a]!==void 0&&!Wr(r[a]))return null;let o=n?ie(e,t,r.palette):null,i=Object.fromEntries(["fill","stroke","text"].filter(a=>r[a]!==void 0).map(a=>[a,r[a]])),s=Ae(o||{},i);return Object.entries(s).filter(([,a])=>a!==void 0).map(([a,d])=>`--docdiagram-component-${a}:${d}`).join(";")}function vt(r,e=!1){let t=String(r).trim();if(t.startsWith("//")||t.startsWith("\\"))return!1;if(!t||t.startsWith("#")||t.startsWith("/")||t.startsWith("./")||t.startsWith("../")||t.startsWith("?")||e&&/^data:image\/(?:gif|jpeg|png|webp);base64,/i.test(t))return!0;let n=t.match(/^([a-z][a-z\d+.-]*):/i);return!n||["http","https","mailto"].includes(n[1].toLowerCase())}function Fe(r){let e=[],t=String(r).replace(/`([^`]+)`/g,(n,o)=>{let i=`\0${e.length}\0`;return e.push(`<code>${w(o)}</code>`),i});return t=w(t),t=t.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,(n,o,i)=>{let s=i.replace(/&amp;/g,"&");return vt(s,!0)?`<img src="${w(s)}" alt="${o}">`:`![${o}](${w(i)})`}),t=t.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,(n,o,i)=>{let s=i.replace(/&amp;/g,"&");return vt(s)?`<a href="${w(s)}">${o}</a>`:`[${o}](${w(i)})`}),t=t.replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g,"<strong>$2</strong>").replace(/~~(?=\S)([\s\S]*?\S)~~/g,"<del>$1</del>").replace(/(?<!\*)\*(?=\S)([\s\S]*?\S)\*(?!\*)/g,"<em>$1</em>").replace(/(?<!_)_(?=\S)([\s\S]*?\S)_(?!_)/g,"<em>$1</em>"),t.replace(/\u0000(\d+)\u0000/g,(n,o)=>e[Number(o)])}function Vt(r,e={diagramIndex:0},t){let n=r.replace(/\r\n/g,`
`).split(`
`),o=t?.renderDiagram??((p,$)=>{throw new Error("renderDiagram callback is required for diagram blocks.")}),i=t?.documentColorScheme||"classic",s=t?.documentTheme||"light",a=t?.diagramReferenceRegistry||(()=>{let p=new Map,$=new Set,v=new Map,g=n.map(Or);for(let x=0;x<g.length;x+=1){if(!/^```diagram\s*$/.test(g[x]))continue;let k=g.slice(x+1).findIndex(T=>/^```\s*$/.test(T));if(k===-1)break;let F=g.slice(x+1,x+k+1).join(`
`),A=ur(F);A&&(p.has(A)?$.add(A):p.set(A,{id:A,source:F})),x+=k+1}let E=!1;for(let x of g){if(/^```/.test(x)){E=!E;continue}if(!E){let k=lr(x);k&&v.set(k.id,(v.get(k.id)||0)+1)}}return{definitions:p,duplicateDefinitionIds:$,referenceCounts:v}})(),{definitions:d,duplicateDefinitionIds:u,referenceCounts:l}=a;function c(p){let $=n[p]||"";return!$.trim()||/^```/.test($)||/^(#{1,6})\s+/.test($)||/^ {0,3}&gt;|^ {0,3}>/.test($)||/^ {0,3}(?:[-*_]\s*){3,}$/.test($)||/^:::/.test($)||!!Te($)||p+1<n.length&&!!cr(n[p+1])}function h(p,$){let v=Te(n[p]),g=/^\d/.test(v[2]),E=[],x=p,k=g?Number.parseInt(v[2],10):null;for(;x<n.length;){let D=Te(n[x]);if(!D||D[1].length!==$||/^\d/.test(D[2])!==g)break;let M={content:[D[3]],children:[]};for(x+=1;x<n.length;){let q=Te(n[x]);if(q&&q[1].length>$){let S=h(x,q[1].length);M.children.push(S.html),x=S.index;continue}if(!n[x].trim()){x+=1;let S=x<n.length?Te(n[x]):null;if(x>=n.length||!S||S[1].length<=$)break;continue}if(/^\s+/.test(n[x])&&!Te(n[x])){M.content.push(n[x].trim()),x+=1;continue}break}E.push(M)}let F=g?"ol":"ul",A=g&&k!==1?` start="${k}"`:"",T=E.map(D=>{let M=!g&&D.content.length===1&&D.content[0].match(/^\[([ xX])\]\s+(.*)$/),q=M?`<input type="checkbox" disabled${M[1].toLowerCase()==="x"?" checked":""}> ${Fe(M[2])}`:Fe(D.content.join(" "));return`<li${M?' class="docdiagram-task-list-item"':""}>${q}${D.children.join("")}</li>`}).join("");return{html:`<${F}${A}>${T}</${F}>`,index:x}}function y(p,$){let v=Ot(n[p]),g=v?Gr(n,p,$):-1;if(!v||g===-1)return null;let{name:E,attributes:x}=v,k={section:["title","palette","fill","stroke","text"],panel:["title","palette","fill","stroke","text"],callout:["kind","title","palette","fill","stroke","text"],grid:["columns"],stack:[]};if(Object.keys(x).some(M=>!k[E].includes(M)))return null;if(E==="grid"){let M=Zt[x.columns];if(!M)return null;let q=[],S=p+1;for(;S<g;){if(!n[S].trim()){S+=1;continue}let C=Ot(n[S]);if(!C||!["panel","callout","stack"].includes(C.name))return null;let L=y(S,g);if(!L)return null;q.push(`<div class="docdiagram-grid-item">${L.html}</div>`),S=L.next}return{html:`<div class="docdiagram-grid" style="--docdiagram-grid-columns:${M}">${q.join("")}</div>`,next:g+1}}if(E==="stack")return Object.keys(x).length?null:{html:`<div class="docdiagram-stack">${f(p+1,g)}</div>`,next:g+1};let F=Ur(x,i,s);if(F===null||E==="callout"&&x.kind!==void 0&&!Kt.includes(x.kind))return null;let A=x.title?`<div class="docdiagram-component-title">${Fe(x.title)}</div>`:"",T=f(p+1,g),D=`docdiagram-component${E==="callout"?"":` docdiagram-${E}`}${F?" docdiagram-component-styled":""}`;if(E==="callout"){let M=x.kind||"info";return{html:`<aside class="${D} docdiagram-callout docdiagram-callout-${M}"${F?` style="${F}"`:""} aria-label="${w(x.title||M)} callout"><div class="docdiagram-callout-kind">${w(M)}</div>${A}${T}</aside>`,next:g+1}}return{html:`<section class="${D}"${F?` style="${F}"`:""}>${A}${T}</section>`,next:g+1}}function f(p=0,$=n.length){let v=[],g=p;for(;g<$;){let E=n[g];if(!E.trim()){g+=1;continue}if(/^:::/.test(E)){let D=lr(E);if(D){let q=d.get(D.id),S=l.get(D.id)||0;q?u.has(D.id)?v.push(`<section class="docdiagram-error"><strong>Diagram "${w(D.id)}" has multiple definitions.</strong></section>`):S>1?v.push(`<section class="docdiagram-error"><strong>Diagram "${w(D.id)}" is referenced more than once.</strong></section>`):(v.push(o(q.source,e.diagramIndex)),e.diagramIndex+=1):v.push(`<section class="docdiagram-error"><strong>Diagram "${w(D.id)}" could not be found.</strong></section>`),g+=1;continue}let M=y(g,$);M?(v.push(M.html),g=M.next):(v.push(`<pre class="docdiagram-literal-source"><code>${w(E)}</code></pre>`),g+=1);continue}let x=E.match(/^```([\w-]*)\s*$/);if(x){let D=n.slice(g+1,$).findIndex(S=>/^```\s*$/.test(S));if(D===-1){v.push('<section class="docdiagram-error"><strong>Unclosed code block.</strong></section>');break}let M=g+D+1,q=n.slice(g+1,M).join(`
`);if(x[1]==="diagram"){let S=ur(q);S&&u.has(S)?v.push(`<section class="docdiagram-error"><strong>Diagram "${w(S)}" has multiple definitions.</strong></section>`):(!S||!l.has(S))&&(v.push(o(q,e.diagramIndex)),e.diagramIndex+=1)}else{let S=x[1]?` class="language-${w(x[1])}"`:"";v.push(`<pre><code${S}>${w(q)}</code></pre>`)}g=M+1;continue}let k=E.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);if(k){v.push(`<h${k[1].length}>${Fe(k[2])}</h${k[1].length}>`),g+=1;continue}if(/^ {0,3}(?:[-*_]\s*){3,}$/.test(E)){v.push("<hr>"),g+=1;continue}if(/^ {0,3}>/.test(E)){let D=[];for(;g<$&&/^ {0,3}>/.test(n[g]);)D.push(n[g].replace(/^ {0,3}> ?/,"")),g+=1;v.push(`<blockquote>${Vt(D.join(`
`),e,{...t,diagramReferenceRegistry:a})}</blockquote>`);continue}let F=Te(E);if(F){let D=h(g,F[1].length);v.push(D.html),g=D.index;continue}let A=g+1<$?cr(n[g+1]):null;if(A){let D=jt(E),M=[];for(g+=2;g<$&&n[g].includes("|")&&n[g].trim();)M.push(jt(n[g])),g+=1;let q=(S,C)=>C.map((L,R)=>`<${S}${A[R]?` style="text-align:${A[R]}"`:""}>${Fe(L||"")}</${S}>`).join("");v.push(`<table><thead><tr>${q("th",D)}</tr></thead><tbody>${M.map(S=>`<tr>${q("td",S)}</tr>`).join("")}</tbody></table>`);continue}let T=[E.trim()];for(g+=1;g<$&&!c(g);)T.push(n[g].trim()),g+=1;v.push(`<p>${Fe(T.join(" "))}</p>`)}return v.join("")}return f()}function Gt(r,e,t){let n=e!=="none",o=e==="flowchart";return['<div class="docdiagram-diagram-toolbar" role="toolbar" aria-label="Diagram controls">',`<button type="button" class="docdiagram-icon-button docdiagram-zoom-in" data-diagram-index="${r}" aria-label="Zoom in" title="Zoom in">+</button>`,`<button type="button" class="docdiagram-icon-button docdiagram-zoom-out" data-diagram-index="${r}" aria-label="Zoom out" title="Zoom out">\u2212</button>`,`<button type="button" class="docdiagram-icon-button docdiagram-fit" data-diagram-index="${r}" aria-label="Zoom to fit" title="Zoom to fit">\u22A1</button>`,n?t.editingDiagramIndex===r?`<button type="button" class="docdiagram-icon-button docdiagram-done-editing" aria-label="Done editing" title="Done editing">\u2713</button><button type="button" class="docdiagram-icon-button docdiagram-cancel-editing" aria-label="Cancel editing and discard changes" title="Cancel editing and discard changes">\xD7</button>${o?`<button type="button" class="docdiagram-icon-button docdiagram-create-node" data-diagram-index="${r}" aria-label="New node" title="New node">+</button>`:""}`:t.editingDiagramIndex===null?'<button type="button" class="docdiagram-icon-button docdiagram-start-editing" aria-label="Edit diagram" title="Edit diagram">\u270E</button>':"":"","</div>"].join("")}function mr(r,e,t,n){let{selectedNode:o,selectedEdge:i,editingNode:s,editingEdge:a,connectionDrag:d,diagramZooms:u,diagramCameraOffsets:l}=t,c=t.editingDiagramIndex===e,h=U(r),y=new Map(h.map(S=>[S.node.id,S])),f=16,p=[],$=[],g=ce[t.documentColorScheme]?.[t.documentTheme==="dark"?"dark":"light"],E=g?Object.entries(g).filter(([,S])=>S.gradient).map(([S,C])=>`<linearGradient id="docdiagram-${t.documentColorScheme}-${e}-${S}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${w(C.gradient||C.fill)}"/><stop offset="1" stop-color="${w(C.fill)}"/></linearGradient>`).join(""):"",x=r.edges.map((S,C)=>{let L=y.get(S.source),R=y.get(S.target);if(!L||!R)return"";let Z=L.node,Y=R.node,re=we(Z,L.position.x,L.position.y,Number(Z.size?.width)||190,Number(Z.size?.height)||80),W=we(Y,R.position.x,R.position.y,Number(Y.size?.width)||190,Number(Y.size?.height)||80),_=S.sourceAnchor||"right",me=S.targetAnchor||"left",ge=re.anchors[_],Ee=W.anchors[me],de=S.route||"orthogonal",H=ke(ge,Ee,_,me,de,S.waypoint),he=H.midpoint.x,fe=H.midpoint.y-10,be=je(r,S,t.documentTheme),ze=i?.diagramIndex===e&&i.edgeIndex===C,Nt=ze&&a?.diagramIndex===e&&a.edgeIndex===C,Ze=(Number(be.strokeWidth)||2)+(ze?2:0),b=220,N=72,B=S.label?ue(S.label):[],z=B.length*f,G=fe-z/2+f*.72,J=et(S,"start"),j=et(S,"end"),oe=`docdiagram-marker-${e}-${C}-start`,ye=`docdiagram-marker-${e}-${C}-end`;J!=="none"&&p.push(dt(oe,J,"start",be.stroke||"",Ze)),j!=="none"&&p.push(dt(ye,j,"end",be.stroke||"",Ze)),ze&&c&&$.push(`<circle class="docdiagram-edge-endpoint" data-diagram-index="${e}" data-edge-index="${C}" data-endpoint="source" cx="${ge.x}" cy="${ge.y}" r="7"/>`,`<circle class="docdiagram-edge-endpoint" data-diagram-index="${e}" data-edge-index="${C}" data-endpoint="target" cx="${Ee.x}" cy="${Ee.y}" r="7"/>`,`<circle class="docdiagram-edge-waypoint" data-diagram-index="${e}" data-edge-index="${C}" cx="${S.waypoint?.x??H.midpoint.x}" cy="${S.waypoint?.y??H.midpoint.y}" r="8" aria-label="Edge waypoint"/>`);let Yt=[J!=="none"?` marker-start="url(#${oe})"`:"",j!=="none"?` marker-end="url(#${ye})"`:""].join("");return[`<g class="docdiagram-edge-group${ze?" docdiagram-edge-selected":""}" data-diagram-index="${e}" data-edge-index="${C}">`,`<path class="docdiagram-edge-hit" d="${H.hitPath}" fill="none" stroke="transparent" stroke-width="16"/>`,`<path class="docdiagram-edge" d="${H.path}"${Yt} stroke="${w(be.stroke||"")}" stroke-width="${Ze}"/>`,Nt?`<foreignObject class="docdiagram-inline-editor-host" x="${he-b/2}" y="${fe-N/2}" width="${b}" height="${N}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-edge" aria-label="Edit edge label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${w(S.label||"")}</textarea></foreignObject>`:B.length?ae(he,G,B,f,"docdiagram-edge-label",be.text||""):"","</g>"].join("")}).join(""),k=h.map(({node:S,position:C})=>{let L=C.x,R=C.y,Z=Number(S.size?.width)||190,Y=Number(S.size?.height)||80,re=ve(r,S,t.documentTheme,t.documentColorScheme),W=S.palette,_=W&&g?.[W]?.gradient?{...re,fill:`url(#docdiagram-${t.documentColorScheme}-${e}-${W})`}:re,me=o?.diagramIndex===e&&o.nodeId===S.id,ge=me&&s?.diagramIndex===e&&s.nodeId===S.id,Ee=(Number(_.strokeWidth)||2)+(me?2:0),de=we(S,L,R,Z,Y),H=Xe(de.textBounds,S);return[`<g class="docdiagram-node${me?" docdiagram-node-selected":""}" data-diagram-index="${e}" data-node-id="${w(S.id)}">`,Ke(de,_,Ee),ge?`<foreignObject class="docdiagram-inline-editor-host" x="${de.textBounds.x}" y="${de.textBounds.y}" width="${de.textBounds.width}" height="${de.textBounds.height}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-node" aria-label="Edit node label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${w(S.label)}</textarea></foreignObject>`:ae(H.centerX,H.labelStartY,H.labelLines,H.labelLineHeight,"docdiagram-node-label",_.text||"",H.textAnchor),!ge&&H.subtitleLines.length?ae(H.centerX,H.subtitleStartY,H.subtitleLines,H.subtitleLineHeight,"docdiagram-node-subtitle",_.text||"",H.textAnchor):"",me&&c&&!ge?[["top-left",L-7,R-7],["top-right",L+Z-7,R-7],["bottom-left",L-7,R+Y-7],["bottom-right",L+Z-7,R+Y-7]].map(([he,fe,be])=>`<rect class="docdiagram-resize-handle" data-resize-corner="${he}" x="${fe}" y="${be}" width="14" height="14" rx="3"/>`).join(""):"",me&&c&&!ge?ne.map(he=>{let fe=de.anchors[he];return`<circle class="docdiagram-connection-port" data-anchor="${he}" cx="${fe.x}" cy="${fe.y}" r="7" aria-label="${he} connection port"/>`}).join(""):"","</g>"].join("")}).join(""),F=Number(r.canvas.width)||1e3,A=Number(r.canvas.height)||560,T=t.diagramViewportHeights.get(e),D=T?` style="box-sizing: border-box; height: ${T}px"`:"",M=l.get(e)||{x:0,y:0},q=`width: ${u.get(e)||100}%; transform: translate(${M.x}px, ${M.y}px)`;return[`<figure class="docdiagram" data-diagram-index="${e}" data-diagram-type="flowchart" data-editing="${c}"${D}>`,n(e,"flowchart",t),`<svg viewBox="0 0 ${F} ${A}" role="img" aria-label="Architecture diagram" data-diagram-index="${e}" style="${q}">`,`<defs>${E}${p.join("")}</defs>`,k,x,d?.diagramIndex===e?`<path class="docdiagram-connection-preview${d.invalid?" docdiagram-connection-invalid":""}" d="${ke(d.start,d.current,d.sourceAnchor,d.targetAnchor||d.sourceAnchor,"straight").path}"/>`:"",$.join(""),"</svg>","</figure>"].join("")}function gr(r,e,t,n){let o=Me(r,t.documentTheme),i=Number(r.canvas?.width)||1e3,s=Number(r.canvas?.height)||560,a=r.participants||[],d=r.messages||[],u=r.activations||[],l=r.notes||[],c=r.groups||[],h=90,y=90,f=28,p=Number(r.canvas?.participantSize?.width)||180,$=Number(r.canvas?.participantSize?.height)||42,v=Number(r.canvas?.participantSpacing)||220,g=16,E=74+Math.max(0,...a.filter(b=>b.kind==="actor").map(b=>ue(b.label||"").length-1))*g,x=48,k=18,F=56,A=t.diagramViewportHeights.get(e),T=A?` style="box-sizing: border-box; height: ${A}px"`:"",D=`docdiagram-sequence-arrow-${e}`,M=f+E+12,q=a[0],S=a[a.length-1],C=Number(q?.size?.width)||p,L=Number(S?.size?.width)||p,R=a.length>1?C/2+v*(a.length-1)+L/2:p+h+y,Z=Math.max(i,R,h+y),Y=new Map;a.forEach((b,N)=>{Y.set(b.id,a.length===1?Z/2:C/2+v*N)});let re=M+40,W=d.map((b,N)=>({...b,index:N,y:re+N*F})),_=l.map(b=>{let N=ue(b.label||""),B=Math.max(x,N.length*16+22,Number(b.size?.height)||0),G=((b.after?W[Number(b.after)-1]:null)?.y||M)+k,J=Y.get(b.at||"")||Z/2,j=Math.max(160,Number(b.size?.width)||0),oe=Math.min(Z-j/2-24,Math.max(j/2+24,J));return{...b,lines:N,x:oe-j/2,y:G,width:j,height:B}}),me=c.map(b=>W[b.to-1]?.y+34||re),ge=Math.max(M+140,_.length?_[_.length-1].y+_[_.length-1].height:0,W.length?W[W.length-1].y+44:re,...me),Ee=Math.max(s,ge+56),de=Ee-36,H=u.map((b,N)=>({participantId:b.participant,depth:u.slice(0,N).filter(B=>B.participant===b.participant&&B.from<=b.from&&B.to>=b.from).length,startY:(W[b.from-1]?.y||re)-10,endY:(W[b.to-1]?.y||re)+18})),he=a.map(b=>{let N=Y.get(b.id)||0,B=ue(b.label||""),z=He(r,b,t.documentTheme,t.documentColorScheme),G=Number(b.size?.width)||p,J=Number(b.size?.height)||$;if(b.kind==="actor"){let j=f+10,oe=j+18,ye=oe+18;return[`<g class="docdiagram-sequence-participant docdiagram-sequence-actor" data-diagram-index="${e}" data-participant-id="${w(b.id)}">`,`<circle cx="${N}" cy="${j}" r="8" fill="none" stroke="${w(z.stroke||"")}" stroke-width="${Number(z.strokeWidth)||2}"/>`,`<path d="M ${N} ${j+8} V ${ye} M ${N-14} ${oe} H ${N+14} M ${N} ${ye} L ${N-12} ${ye+18} M ${N} ${ye} L ${N+12} ${ye+18}" fill="none" stroke="${w(z.stroke||"")}" stroke-width="${Number(z.strokeWidth)||2}" stroke-linecap="round" stroke-linejoin="round"/>`,ae(N,f+E-4-(B.length-1)*g,B,g,"docdiagram-node-label",z.text||""),"</g>"].join("")}return[`<g class="docdiagram-sequence-participant" data-diagram-index="${e}" data-participant-id="${w(b.id)}">`,`<rect x="${N-G/2}" y="${f}" width="${G}" height="${J}" rx="12" fill="${w(z.fill||"")}" stroke="${w(z.stroke||"")}" stroke-width="${Number(z.strokeWidth)||2}"/>`,ae(N,f+J/2+6-(B.length-1)*g/2,B,g,"docdiagram-node-label",z.text||""),"</g>"].join("")}).join(""),fe=a.map(b=>{let N=Y.get(b.id)||0;return`<path class="docdiagram-sequence-lifeline" d="M ${N} ${M} L ${N} ${de}" fill="none" stroke="${w(o.edge.stroke)}" stroke-width="2" stroke-dasharray="8 6"/>`}).join(""),be=c.map(b=>{let N=(W[b.from-1]?.y||re)-24,B=(W[b.to-1]?.y||re)+30,z=Math.min(220,Math.max(110,String(b.label).length*8+28));return['<g class="docdiagram-sequence-group">',`<rect x="42" y="${N}" width="${Z-84}" height="${B-N}" rx="12" fill="none" stroke="${w(o.edge.stroke)}" stroke-width="2" stroke-dasharray="10 6" opacity="0.8"/>`,`<rect x="54" y="${N-16}" width="${z}" height="24" rx="6" fill="${w(o.node.fill)}" stroke="${w(o.edge.stroke)}" stroke-width="1.5"/>`,`<text x="${54+z/2}" y="${N+1}" text-anchor="middle" class="docdiagram-edge-label" fill="${w(o.edge.text)}">${w(b.label||"")}</text>`,"</g>"].join("")}).join(""),ze=_.map((b,N)=>{let z=b.y+18,G=He(r,b,t.documentTheme,t.documentColorScheme);return[`<g class="docdiagram-sequence-note" data-diagram-index="${e}" data-note-index="${N}">`,`<rect x="${b.x}" y="${b.y}" width="${b.width}" height="${b.height}" rx="10" fill="${w(G.fill||"")}" stroke="${w(G.stroke||"")}" stroke-width="${Number(G.strokeWidth)||2}"/>`,ae(b.x+b.width/2,z,b.lines,16,"docdiagram-node-subtitle",G.text||""),"</g>"].join("")}).join(""),Nt=H.map(b=>{let N=Y.get(b.participantId)||0,B=b.depth*7,z=12,G=Math.max(20,b.endY-b.startY),J=a.find(oe=>oe.id===b.participantId),j=J?He(r,J,t.documentTheme,t.documentColorScheme):o.node;return`<rect class="docdiagram-sequence-activation" x="${N-z/2+B}" y="${b.startY}" width="${z}" height="${G}" rx="4" fill="${w(j.fill||"")}" stroke="${w(j.stroke||"")}" stroke-width="${Number(j.strokeWidth)||2}"/>`}).join(""),Ze=W.map(b=>{let N=Y.get(b.from)||0,B=Y.get(b.to)||0,z=b.style==="dashed",G=ue(b.label||""),J=G.length*15,j=b.y-12-J/2+11,oe=` marker-end="url(#${D})"`;return b.from===b.to?[`<g class="docdiagram-sequence-message" data-diagram-index="${e}" data-message-index="${b.index}">`,`<path d="M ${N} ${b.y} L ${N+48} ${b.y} L ${N+48} ${b.y+28} L ${N} ${b.y+28}" fill="none" stroke="${w(o.edge.stroke)}" stroke-width="2"${oe}${z?' stroke-dasharray="8 5"':""}/>`,ae(N+48/2,j,G,15,"docdiagram-edge-label",o.edge.text),"</g>"].join(""):[`<g class="docdiagram-sequence-message" data-diagram-index="${e}" data-message-index="${b.index}">`,`<path d="M ${N} ${b.y} L ${B} ${b.y}" fill="none" stroke="${w(o.edge.stroke)}" stroke-width="2"${oe}${z?' stroke-dasharray="8 5"':""}/>`,ae((N+B)/2,j,G,15,"docdiagram-edge-label",o.edge.text),"</g>"].join("")}).join("");return[`<figure class="docdiagram" data-diagram-index="${e}" data-diagram-type="sequence" data-editing="${t.editingDiagramIndex===e}"${T}>`,n(e,"sequence",t),`<svg viewBox="0 0 ${Z} ${Ee}" role="img" aria-label="Sequence diagram" data-diagram-index="${e}" style="width: ${t.diagramZooms.get(e)||100}%">`,`<defs>${dt(D,"arrow","end",o.edge.stroke,2)}</defs>`,be,he,fe,Nt,ze,Ze,"</svg>","</figure>"].join("")}function hr(r,e,t){try{let n=De(r,t.colourScheme);return t.onDiagram(e,n),n.type==="sequence"?gr(n,e,t.state,Gt):mr(n,e,t.state,Gt)}catch(n){let o=n instanceof Error?n.message:String(n);return`<section class="docdiagram-error"><strong>Diagram could not be rendered.</strong><br>${w(o)}</section>`}}function pr(){if(document.querySelector("style[data-docdiagram-runtime-styles]"))return;let r=document.createElement("style");r.dataset.docdiagramRuntimeStyles="true",r.textContent=`
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
    .docdiagram-edge-endpoint,
    .docdiagram-edge-waypoint {
      cursor: crosshair;
      fill: #ffffff;
      stroke: #3574c7;
      stroke-width: 2;
    }
    .docdiagram-connection-target-port {
      fill: #eaf2ff;
    }
    .docdiagram-edge-waypoint {
      cursor: move;
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
  `,document.head.append(r)}function fr(){return{diagramModels:[],editingDiagramIndex:null,selectedNode:null,selectedEdge:null,selectedSequenceElement:null,editingNode:null,editingEdge:null,connectionDrag:null,documentTheme:"light",documentThemeSetting:"auto",documentColorScheme:"classic",documentFormat:"centered",savedSource:"",editSessionDiagram:null,diagramZooms:new Map,diagramCameraOffsets:new Map,diagramViewportHeights:new Map}}function qe(r){r.selectedNode=null,r.selectedEdge=null,r.selectedSequenceElement=null,r.editingNode=null,r.editingEdge=null}function Pe(r,e){return r.editingDiagramIndex===e}function se(r,e){return r.target instanceof Element?r.target.closest(e):null}function te(r,e){let t=r.diagramModels[e];return t?.type==="flowchart"?t:null}function O(r){return Number(r)}var kt=class{constructor(e){this.host=e;this.editingShortcutsBound=!1}enableCanvasPanning(){for(let e of this.host.outputElement.querySelectorAll(".docdiagram")){let t=e.querySelector("svg");t&&e.addEventListener("pointerdown",n=>{(n.target===e||n.target===t)&&this.beginCanvasPan(t,n)})}}enableSequenceSelection(){for(let e of this.host.outputElement.querySelectorAll('.docdiagram[data-diagram-type="sequence"] svg'))e.addEventListener("click",t=>{if(!Pe(this.host.state,O(e.dataset.diagramIndex)))return;let n=se(t,".docdiagram-sequence-participant"),o=se(t,".docdiagram-sequence-note"),i=se(t,".docdiagram-sequence-message");n?this.host.state.selectedSequenceElement={diagramIndex:O(n.getAttribute("data-diagram-index")||void 0),kind:"participant",id:n.getAttribute("data-participant-id")||""}:o?this.host.state.selectedSequenceElement={diagramIndex:O(o.getAttribute("data-diagram-index")||void 0),kind:"note",index:O(o.getAttribute("data-note-index")||void 0)}:i?this.host.state.selectedSequenceElement={diagramIndex:O(i.getAttribute("data-diagram-index")||void 0),kind:"message",index:O(i.getAttribute("data-message-index")||void 0)}:this.host.state.selectedSequenceElement=null,this.host.state.selectedNode=null,this.host.state.selectedEdge=null,this.host.renderDocument()})}enableEditing(){for(let e of this.host.outputElement.querySelectorAll(".docdiagram svg"))Pe(this.host.state,O(e.dataset.diagramIndex))&&(e.addEventListener("click",t=>this.handleDiagramClick(e,t)),e.addEventListener("pointerdown",t=>this.handleDiagramPointerDown(e,t)));for(let e of this.host.outputElement.querySelectorAll(".docdiagram-inline-editor"))this.wireInlineEditor(e);this.editingShortcutsBound||(this.editingShortcutsBound=!0,document.addEventListener("keydown",e=>{if(this.host.state.editingDiagramIndex===null)return;let t=document.activeElement;t instanceof Element&&t.matches("input, textarea, select, [contenteditable]")||((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="d"&&this.host.state.selectedNode?(e.preventDefault(),this.duplicateSelectedNode()):(e.key==="Delete"||e.key==="Backspace")&&(this.host.state.selectedNode||this.host.state.selectedEdge)&&(e.preventDefault(),this.deleteSelected()))},!0))}selectNode(e,t){this.host.state.selectedNode={diagramIndex:e,nodeId:t},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}selectEdge(e,t){this.host.state.selectedEdge={diagramIndex:e,edgeIndex:t},this.host.state.selectedNode=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}handleDiagramClick(e,t){if(se(t,".docdiagram-inline-editor"))return;let n=se(t,".docdiagram-node");if(n){this.selectNode(O(n.getAttribute("data-diagram-index")||void 0),n.getAttribute("data-node-id")||"");return}let o=se(t,".docdiagram-edge-group");if(o){let i=O(o.getAttribute("data-diagram-index")||void 0),s=O(o.getAttribute("data-edge-index")||void 0),a=this.host.state.selectedEdge?.diagramIndex===i&&this.host.state.selectedEdge.edgeIndex===s,d=this.host.state.editingEdge?.diagramIndex===i&&this.host.state.editingEdge.edgeIndex===s;a&&!d?(this.host.state.editingEdge={diagramIndex:i,edgeIndex:s},this.host.renderDocument()):this.selectEdge(i,s);return}(this.host.state.selectedNode||this.host.state.selectedEdge)&&this.clearSelection()}handleDiagramPointerDown(e,t){let n=se(t,".docdiagram-edge-waypoint");if(n){this.moveEdgeWaypoint(e,t,n);return}let o=se(t,".docdiagram-connection-port");if(o){let g=o.closest(".docdiagram-node"),E=O(g?.getAttribute("data-diagram-index")||e.dataset.diagramIndex),x=o.getAttribute("data-node-id")||g?.getAttribute("data-node-id")||"",k=te(this.host.state,E),F=k?V(k,x)?.node:null,A=o.getAttribute("data-anchor")||"";F&&this.beginConnectionDrag(e,t,{diagramIndex:E,sourceNodeId:x,sourceAnchor:A,start:this.getNodePortPoint(F,A),current:this.getNodePortPoint(F,A),invalid:!1});return}let i=se(t,".docdiagram-edge-endpoint");if(i){let g=O(i.getAttribute("data-diagram-index")||void 0),E=O(i.getAttribute("data-edge-index")||void 0),x=te(this.host.state,g),k=x?.edges[E],F=i.getAttribute("data-endpoint");if(!k||F!=="source"&&F!=="target")return;let A=F==="source"?k.source:k.target,T=F==="source"?k.sourceAnchor:k.targetAnchor,D=x?V(x,A)?.node:null;if(!D||!T)return;this.beginConnectionDrag(e,t,{diagramIndex:g,edgeIndex:E,endpoint:F,reconnect:!0,sourceNodeId:A,sourceAnchor:T,start:this.getNodePortPoint(D,T),current:this.getNodePortPoint(D,T),invalid:!1});return}let s=se(t,".docdiagram-resize-handle");if(s){let g=s.closest(".docdiagram-node"),E=s.getAttribute("data-resize-corner");g&&(E==="top-left"||E==="top-right"||E==="bottom-left"||E==="bottom-right")&&this.resizeNode(e,t,g,E);return}if(se(t,".docdiagram-inline-editor"))return;let a=se(t,".docdiagram-node");if(!a)return;let d=O(a.getAttribute("data-diagram-index")||void 0),u=a.getAttribute("data-node-id")||"",l=te(this.host.state,d),c=l?V(l,u)?.node:null;if(!l||!c)return;t.preventDefault();let h=this.svgPoint(e,t),y=X(l,c),f=ee(l),p=!1;this.capturePointer(e,t);let $=g=>{let E=this.svgPoint(e,g),x=K(y.x+E.x-h.x,f),k=K(y.y+E.y-h.y,f);p=p||x!==y.x||k!==y.y,a.setAttribute("transform",`translate(${x-y.x} ${k-y.y})`);let F=V(l,u);c.position={...c.position,x:x-(F?.parent?X(l,F.parent).x:0),y:k-(F?.parent?X(l,F.parent).y:0)}},v=g=>{this.releasePointer(e,g),e.removeEventListener("pointermove",$),e.removeEventListener("pointerup",v),e.removeEventListener("pointercancel",v),p?(ut(l,u),Ve(l,c),this.host.state.selectedNode={diagramIndex:d,nodeId:u},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.persistDiagramModels(),this.host.renderDocument()):this.host.state.selectedNode?.diagramIndex===d&&this.host.state.selectedNode.nodeId===u?(this.host.state.editingNode={diagramIndex:d,nodeId:u},this.host.renderDocument()):this.selectNode(d,u)};e.addEventListener("pointermove",$),e.addEventListener("pointerup",v),e.addEventListener("pointercancel",v)}getSelectedNode(){let e=this.host.state.selectedNode,t=e?te(this.host.state,e.diagramIndex):null;return e&&t&&V(t,e.nodeId)?.node||null}getSelectedEdge(){let e=this.host.state.selectedEdge,t=e?te(this.host.state,e.diagramIndex):null;return e&&t?.edges[e.edgeIndex]||null}clearSelection(){this.host.state.selectedNode=null,this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}deleteSelected(){let e=this.host.state.selectedNode,t=this.host.state.selectedEdge;if(e){let n=te(this.host.state,e.diagramIndex);if(!n)return;let o=n.edges.filter(i=>i.source===e.nodeId||i.target===e.nodeId);if(o.length&&!globalThis.confirm(`Delete this node and its ${o.length} attached connector${o.length===1?"":"s"}?`))return;Ue(n,e.nodeId)}else if(t){let n=te(this.host.state,t.diagramIndex);if(!n)return;We(n,t.edgeIndex)}else return;qe(this.host.state),this.host.persistDiagramModels(),this.host.renderDocument()}duplicateSelectedNode(){let e=this.host.state.selectedNode;if(!e)return;let t=te(this.host.state,e.diagramIndex);if(!t)return;let n=Ge(t,e.nodeId);n&&(this.host.state.selectedNode={diagramIndex:e.diagramIndex,nodeId:n.id},this.host.state.selectedEdge=null,this.host.persistDiagramModels(),this.host.renderDocument())}wireInlineEditor(e){let t=!1,n=()=>{if(!t){if(t=!0,e.classList.contains("docdiagram-inline-editor-edge")){let i=this.getSelectedEdge();i&&(_e(i,e.value),this.host.persistDiagramModels()),this.host.state.editingEdge=null}else{let i=this.getSelectedNode();i&&(Ye(i,e.value),this.host.persistDiagramModels()),this.host.state.editingNode=null}this.host.renderDocument()}},o=()=>{t||(t=!0,e.classList.contains("docdiagram-inline-editor-edge")?this.host.state.editingEdge=null:this.host.state.editingNode=null,this.host.renderDocument())};e.addEventListener("pointerdown",i=>i.stopPropagation()),e.addEventListener("click",i=>i.stopPropagation()),e.addEventListener("keydown",i=>{i.key==="Enter"&&(i.metaKey||i.ctrlKey)?(i.preventDefault(),n()):i.key==="Escape"&&(i.preventDefault(),o())}),e.addEventListener("blur",n,{once:!0}),e.focus(),e.select()}resizeNode(e,t,n,o){t.preventDefault();let i=O(n.getAttribute("data-diagram-index")||void 0),s=n.getAttribute("data-node-id")||"",a=te(this.host.state,i),d=a?V(a,s)?.node:null;if(!a||!d)return;let u=this.svgPoint(e,t),l=ot(d),c=!1;this.capturePointer(e,t);let h=f=>{let p=this.svgPoint(e,f);bt(a,d,o,p.x-u.x,p.y-u.y,l);let $=Number(d.size?.width)||190,v=Number(d.size?.height)||80;c=c||$!==l.size.width||v!==l.size.height,this.updateNodeSizeMarkup(n,d,$,v)},y=f=>{this.releasePointer(e,f),e.removeEventListener("pointermove",h),e.removeEventListener("pointerup",y),e.removeEventListener("pointercancel",y),c&&(Ve(a,d),this.host.state.selectedNode={diagramIndex:i,nodeId:s},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.persistDiagramModels(),this.host.renderDocument())};e.addEventListener("pointermove",h),e.addEventListener("pointerup",y),e.addEventListener("pointercancel",y)}updateNodeSizeMarkup(e,t,n,o){let i=te(this.host.state,O(e.getAttribute("data-diagram-index")||void 0));if(!i)return;let{x:s,y:a}=X(i,t),d=e.querySelector(".docdiagram-node-body"),u=e.querySelector(".docdiagram-node-label"),l=e.querySelector(".docdiagram-node-subtitle"),c=e.querySelectorAll(".docdiagram-resize-handle");if(!d)return;let h=ve(i,t),y=we(t,s,a,n,o),f=Xe(y.textBounds,t);for(let p of e.querySelectorAll(".docdiagram-node-detail"))p.remove();d.outerHTML=Ke(y,h,Number(h.strokeWidth)||2);for(let p of[u,l])if(p){p.setAttribute("x",String(f.centerX)),p.setAttribute("y",String(p===u?f.labelStartY:f.subtitleStartY)),p.setAttribute("text-anchor",f.textAnchor);for(let $ of p.querySelectorAll("tspan"))$.setAttribute("x",String(f.centerX))}for(let p of c){let $=p.getAttribute("data-resize-corner");p.setAttribute("x",String($?.endsWith("left")?s-7:s+n-7)),p.setAttribute("y",String($?.startsWith("top")?a-7:a+o-7))}}getNodePortPoint(e,t){let n=this.host.state.diagramModels.find(i=>i.type==="flowchart"&&V(i,e.id)?.node===e);if(!n)return{x:0,y:0};let o=X(n,e);return we(e,o.x,o.y,o.width,o.height).anchors[t]}addConnectionTargetPorts(e,t){let n=te(this.host.state,t);if(n)for(let{node:o}of U(n))for(let i of ne){let s=this.getNodePortPoint(o,i),a=document.createElementNS("http://www.w3.org/2000/svg","circle");a.setAttribute("class","docdiagram-connection-port docdiagram-connection-target-port"),a.dataset.nodeId=o.id,a.dataset.anchor=i,a.setAttribute("cx",String(s.x)),a.setAttribute("cy",String(s.y)),a.setAttribute("r","7"),e.append(a)}}beginConnectionDrag(e,t,n){t.preventDefault(),t.stopPropagation(),this.host.state.connectionDrag={...n,current:this.svgPoint(e,t),invalid:!1},this.addConnectionTargetPorts(e,n.diagramIndex);let o=document.createElementNS("http://www.w3.org/2000/svg","path");o.setAttribute("class","docdiagram-connection-preview"),e.append(o),this.capturePointer(e,t);let i=d=>{let l=document.elementFromPoint(d.clientX,d.clientY)?.closest(".docdiagram-connection-port");return l||[...e.querySelectorAll(".docdiagram-connection-port")].find(c=>{let h=c.getBoundingClientRect();return d.clientX>=h.left&&d.clientX<=h.right&&d.clientY>=h.top&&d.clientY<=h.bottom})||null},s=d=>{let u=this.host.state.connectionDrag;if(!u)return;let l=this.svgPoint(e,d),c=i(d);u.current=l,u.invalid=!c;let h=c?.getAttribute("data-anchor")||u.sourceAnchor;o.setAttribute("d",ke(u.start,l,u.sourceAnchor,h,"straight").path),o.classList.toggle("docdiagram-connection-invalid",u.invalid)},a=d=>{this.releasePointer(e,d),e.removeEventListener("pointermove",s),e.removeEventListener("pointerup",a),e.removeEventListener("pointercancel",a);let u=i(d),l=this.host.state.connectionDrag;if(this.host.state.connectionDrag=null,u&&l){let c=te(this.host.state,l.diagramIndex),h=u.getAttribute("data-node-id")||u.closest(".docdiagram-node")?.getAttribute("data-node-id"),y=u.getAttribute("data-anchor")||"";if(c&&h){if(l.reconnect&&l.edgeIndex!==void 0&&l.endpoint){let f=c.edges[l.edgeIndex];f&&(ht(f,l.endpoint,h,y),this.host.state.selectedEdge={diagramIndex:l.diagramIndex,edgeIndex:l.edgeIndex},this.host.state.selectedNode=null)}else{let f=gt(c,l.sourceNodeId,l.sourceAnchor,h,y);this.host.state.selectedEdge={diagramIndex:l.diagramIndex,edgeIndex:c.edges.indexOf(f)},this.host.state.selectedNode=null}this.host.persistDiagramModels()}}this.host.renderDocument()};e.addEventListener("pointermove",s),e.addEventListener("pointerup",a),e.addEventListener("pointercancel",a)}beginCanvasPan(e,t){let n=e.closest(".docdiagram");if(!n)return;t.preventDefault();let o=O(e.dataset.diagramIndex),i=this.host.state.diagramCameraOffsets.get(o)||{x:0,y:0},s={clientX:t.clientX,clientY:t.clientY,offset:i};n.classList.add("docdiagram-panning"),this.capturePointer(e,t);let a=u=>{let l={x:s.offset.x+u.clientX-s.clientX,y:s.offset.y+u.clientY-s.clientY};this.host.state.diagramCameraOffsets.set(o,l),e.style.transform=`translate(${l.x}px, ${l.y}px)`},d=u=>{this.releasePointer(e,u),n.classList.remove("docdiagram-panning"),e.removeEventListener("pointermove",a),e.removeEventListener("pointerup",d),e.removeEventListener("pointercancel",d)};e.addEventListener("pointermove",a),e.addEventListener("pointerup",d),e.addEventListener("pointercancel",d)}moveEdgeWaypoint(e,t,n){let o=O(n.getAttribute("data-diagram-index")||void 0),i=O(n.getAttribute("data-edge-index")||void 0),s=te(this.host.state,o),a=s?.edges[i];if(!s||!a)return;t.preventDefault(),t.stopPropagation(),this.capturePointer(e,t);let d=l=>{let c=this.svgPoint(e,l);a.waypoint={x:K(c.x,ee(s)),y:K(c.y,ee(s))};let h=V(s,a.source)?.node,y=V(s,a.target)?.node;if(!h||!y)return;let f=a.sourceAnchor||"right",p=a.targetAnchor||"left",$=this.getNodePortPoint(h,f),v=this.getNodePortPoint(y,p),g=ke($,v,f,p,a.route||"orthogonal",a.waypoint);n.setAttribute("cx",String(a.waypoint.x)),n.setAttribute("cy",String(a.waypoint.y));let E=e.querySelector(`.docdiagram-edge-group[data-diagram-index="${o}"][data-edge-index="${i}"]`);E?.querySelector(".docdiagram-edge")?.setAttribute("d",g.path),E?.querySelector(".docdiagram-edge-hit")?.setAttribute("d",g.hitPath)},u=l=>{this.releasePointer(e,l),e.removeEventListener("pointermove",d),e.removeEventListener("pointerup",u),e.removeEventListener("pointercancel",u),this.host.persistDiagramModels(),this.host.renderDocument()};e.addEventListener("pointermove",d),e.addEventListener("pointerup",u),e.addEventListener("pointercancel",u)}svgPoint(e,t){let n=e.getBoundingClientRect(),o=e.viewBox.baseVal;return{x:(t.clientX-n.left)*o.width/n.width,y:(t.clientY-n.top)*o.height/n.height}}capturePointer(e,t){t.isTrusted&&e.setPointerCapture(t.pointerId)}releasePointer(e,t){t.isTrusted&&e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId)}};function br(r,e,t,n){let o=ce[r]?.[e==="dark"?"dark":"light"];return[["Structure",xe.slice(0,5)],["Accent",xe.slice(5,8)],["Status",xe.slice(8)]].map(([i,s])=>`<fieldset class="docdiagram-palette-group"><legend>${i}</legend>${s.map(a=>{let d=o?.[a];return`<label class="docdiagram-palette-swatch"><input type="radio" name="${n}" value="${a}"${a===t?" checked":""}><span style="--docdiagram-swatch-fill:${d?.fill};--docdiagram-swatch-stroke:${d?.stroke};--docdiagram-swatch-text:${d?.text}">${d?.label||a}</span></label>`}).join("")}</fieldset>`).join("")}function yr(r,e,t="classic",n="light"){let o=ee(r),i=ve(r,e,n,t),s=Number(e.size?.width)||190,a=Number(e.size?.height)||80,d=e.shape==="document"?{width:140,height:84}:{width:120,height:60},u=o?Math.ceil(d.width/o)*o:d.width,l=o?Math.ceil(d.height/o)*o:d.height,c=o||1,h=e.palette||"accent";return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${w(e.label)}</textarea></label>`,`<label class="docdiagram-field docdiagram-field-wide">Subtitle<textarea class="docdiagram-inspector-subtitle docdiagram-inspector-textarea" rows="2">${w(e.subtitle||"")}</textarea></label>`,`<div class="docdiagram-field docdiagram-field-wide"><span>Palette</span><div class="docdiagram-inspector-palette">${br(t,n,h,"node-palette")}</div></div>`,`<label class="docdiagram-field">Shape<select class="docdiagram-inspector-shape">${Be.map(y=>`<option value="${y}"${y===e.shape?" selected":""}>${y}</option>`).join("")}</select></label>`,`<div class="docdiagram-inspector-row"><label class="docdiagram-field">Fill<input type="color" class="docdiagram-inspector-fill" value="${w(i.fill||"")}"></label><label class="docdiagram-field">Stroke<input type="color" class="docdiagram-inspector-stroke" value="${w(i.stroke||"")}"></label><label class="docdiagram-field docdiagram-field-compact"><span class="docdiagram-visually-hidden">Stroke width</span><input type="number" aria-label="Stroke width" class="docdiagram-inspector-stroke-width" value="${Number(i.strokeWidth)||2}" min="1" step="1"></label></div>`,`<label class="docdiagram-field">Text<input type="color" class="docdiagram-inspector-text" value="${w(i.text||"")}"></label>`,`<div class="docdiagram-inspector-row"><span>Align</span><label class="docdiagram-visually-hidden" for="docdiagram-inspector-text-v-align">Vertical alignment</label><select id="docdiagram-inspector-text-v-align" class="docdiagram-inspector-text-v-align" aria-label="Vertical alignment"><option value="top"${e.textVAlign==="top"?" selected":""}>Top</option><option value="center"${e.textVAlign!=="top"?" selected":""}>Middle</option></select><label class="docdiagram-visually-hidden" for="docdiagram-inspector-text-h-align">Horizontal alignment</label><select id="docdiagram-inspector-text-h-align" class="docdiagram-inspector-text-h-align" aria-label="Horizontal alignment"><option value="left"${e.textHAlign==="left"?" selected":""}>Left</option><option value="center"${e.textHAlign!=="left"&&e.textHAlign!=="right"?" selected":""}>Center</option><option value="right"${e.textHAlign==="right"?" selected":""}>Right</option></select></div>`,`<div class="docdiagram-inspector-row"><span>Size</span><label class="docdiagram-visually-hidden" for="docdiagram-inspector-width">Width</label><input id="docdiagram-inspector-width" type="number" aria-label="Width" class="docdiagram-inspector-width" value="${s}" min="${u}" step="${c}"><span>\xD7</span><label class="docdiagram-visually-hidden" for="docdiagram-inspector-height">Height</label><input id="docdiagram-inspector-height" type="number" aria-label="Height" class="docdiagram-inspector-height" value="${a}" min="${l}" step="${c}"></div>`,'<div class="docdiagram-inspector-actions"><button type="button" class="docdiagram-inspector-delete">Delete</button><button type="button" class="docdiagram-inspector-duplicate">Duplicate</button></div>'].join("")}function Wt(r,e){let t=je(r,e),n=Number(t.strokeWidth)||2,o=e.route||"orthogonal",i=e.start||"none",s=e.end||"arrow";return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${w(e.label||"")}</textarea></label>`,`<label class="docdiagram-field">Route<select class="docdiagram-inspector-route">${Ie.map(a=>`<option value="${a}"${a===o?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Source side<select class="docdiagram-inspector-source-anchor">${ne.map(a=>`<option value="${a}"${a===e.sourceAnchor?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Target side<select class="docdiagram-inspector-target-anchor">${ne.map(a=>`<option value="${a}"${a===e.targetAnchor?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Start<select class="docdiagram-inspector-marker-start">${Q.map(a=>`<option value="${a}"${a===i?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">End<select class="docdiagram-inspector-marker-end">${Q.map(a=>`<option value="${a}"${a===s?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Stroke<input type="color" class="docdiagram-inspector-stroke" value="${w(t.stroke||"")}"></label>`,`<label class="docdiagram-field">Label colour<input type="color" class="docdiagram-inspector-text" value="${w(t.text||"")}"></label>`,`<label class="docdiagram-field">Stroke width<input type="number" class="docdiagram-inspector-stroke-width" value="${n}" min="1" step="1"></label>`,'<div class="docdiagram-inspector-actions"><button type="button" class="docdiagram-inspector-delete">Delete</button></div>'].join("")}function xr(r,e,t,n="classic",o="light"){let i="from"in t?null:He(r,t,o,n),s=e.kind!=="message",a=s?t:null;return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-sequence-inspector-label docdiagram-inspector-textarea" rows="2">${w(t.label||"")}</textarea></label>`,e.kind==="message"?`<label class="docdiagram-field">Style<select class="docdiagram-sequence-inspector-message-style"><option value="solid"${t.style!=="dashed"?" selected":""}>Solid</option><option value="dashed"${t.style==="dashed"?" selected":""}>Dashed</option></select></label>`:"",s?`<div class="docdiagram-field docdiagram-field-wide"><span>Palette</span><div class="docdiagram-sequence-inspector-palette">${br(n,o,a?.palette||"accent","sequence-palette")}</div></div>`:"",s?`<label class="docdiagram-field">Fill<input type="color" class="docdiagram-sequence-inspector-fill" value="${w(i?.fill||"")}"></label><label class="docdiagram-field">Border<input type="color" class="docdiagram-sequence-inspector-stroke" value="${w(i?.stroke||"")}"></label><label class="docdiagram-field">Text<input type="color" class="docdiagram-sequence-inspector-text" value="${w(i?.text||"")}"></label><label class="docdiagram-field">Width<input type="number" min="1" class="docdiagram-sequence-inspector-width" value="${Number(a?.size?.width)||""}"></label><label class="docdiagram-field">Height<input type="number" min="1" class="docdiagram-sequence-inspector-height" value="${Number(a?.size?.height)||""}"></label>`:""].join("")}function Yr(r,e){return r.querySelector(e)}function P(r,e,t){Yr(r,e)?.addEventListener("change",n=>{t(n.currentTarget.value)})}function Le(r,e){e(),r.persistDiagramModels(),r.renderDocument()}function wr(r,e,t,n){let o=i=>{let s=r.state.diagramModels[t];if(!s||s.type!=="flowchart")return;let a=V(s,n)?.node;a&&Le(r,()=>i(s,a))};P(e,".docdiagram-inspector-label",i=>o((s,a)=>Ye(a,i))),P(e,".docdiagram-inspector-subtitle",i=>o((s,a)=>ft(a,i)));for(let i of e.querySelectorAll(".docdiagram-inspector-palette input"))i.addEventListener("change",()=>o((s,a)=>rt(a,i.value,r.state.documentColorScheme)));P(e,".docdiagram-inspector-shape",i=>o((s,a)=>pt(a,i))),P(e,".docdiagram-inspector-fill",i=>o((s,a)=>Ce(a,"fill",i))),P(e,".docdiagram-inspector-stroke",i=>o((s,a)=>Ce(a,"stroke",i))),P(e,".docdiagram-inspector-text",i=>o((s,a)=>Ce(a,"text",i))),P(e,".docdiagram-inspector-text-v-align",i=>o((s,a)=>tt(a,"textVAlign",i))),P(e,".docdiagram-inspector-text-h-align",i=>o((s,a)=>tt(a,"textHAlign",i))),P(e,".docdiagram-inspector-stroke-width",i=>o((s,a)=>st(a,i))),P(e,".docdiagram-inspector-width",i=>o((s,a)=>nt(s,a,"width",i))),P(e,".docdiagram-inspector-height",i=>o((s,a)=>nt(s,a,"height",i))),e.querySelector(".docdiagram-inspector-delete")?.addEventListener("click",()=>{o((i,s)=>{Ue(i,s.id),r.state.selectedNode=null})}),e.querySelector(".docdiagram-inspector-duplicate")?.addEventListener("click",()=>{o((i,s)=>{let a=Ge(i,s.id);a&&(r.state.selectedNode={diagramIndex:t,nodeId:a.id})})})}function Er(r,e,t,n){let o=i=>{let s=r.state.diagramModels[t];if(!s||s.type!=="flowchart")return;let a=s.edges[n];a&&Le(r,()=>i(s,a))};P(e,".docdiagram-inspector-label",i=>o((s,a)=>_e(a,i))),P(e,".docdiagram-inspector-route",i=>o((s,a)=>yt(a,i))),P(e,".docdiagram-inspector-source-anchor",i=>o((s,a)=>it(a,"source",i))),P(e,".docdiagram-inspector-target-anchor",i=>o((s,a)=>it(a,"target",i))),P(e,".docdiagram-inspector-marker-start",i=>o((s,a)=>xt(a,i))),P(e,".docdiagram-inspector-marker-end",i=>o((s,a)=>wt(a,i))),P(e,".docdiagram-inspector-stroke",i=>o((s,a)=>at(a,"stroke",i))),P(e,".docdiagram-inspector-text",i=>o((s,a)=>at(a,"text",i))),P(e,".docdiagram-inspector-stroke-width",i=>o((s,a)=>st(a,i))),e.querySelector(".docdiagram-inspector-delete")?.addEventListener("click",()=>{o(i=>{We(i,n),r.state.selectedEdge=null})})}function Sr(r,e,t){let n=r.state.selectedSequenceElement;if(!n)return;if(P(e,".docdiagram-sequence-inspector-label",i=>Le(r,()=>{t.label=i.trim()||t.label})),n.kind==="message"){P(e,".docdiagram-sequence-inspector-message-style",i=>Le(r,()=>{t.style=i}));return}let o=t;for(let i of e.querySelectorAll(".docdiagram-sequence-inspector-palette input"))i.addEventListener("change",()=>Le(r,()=>rt(o,i.value,r.state.documentColorScheme)));for(let[i,s]of[[".docdiagram-sequence-inspector-fill","fill"],[".docdiagram-sequence-inspector-stroke","stroke"],[".docdiagram-sequence-inspector-text","text"]])P(e,i,a=>Le(r,()=>Ce(o,s,a)));for(let[i,s]of[[".docdiagram-sequence-inspector-width","width"],[".docdiagram-sequence-inspector-height","height"]])P(e,i,a=>Le(r,()=>{let d=Number(a);Number.isFinite(d)&&d>0&&(o.size={...o.size,[s]:d})}))}var _r="https://sparkkz-nz.github.io/skryb/docs/reference.html",Xr={flowchart:["```diagram","id: new-flowchart","type: flowchart","canvas:","  width: 600","  height: 300","nodes:","  - id: first-node","    label: First node","    shape: rounded-rectangle","    position: { x: 80, y: 110 }","  - id: second-node","    label: Second node","    shape: rounded-rectangle","    position: { x: 330, y: 110 }","edges:","  - source: first-node","    target: second-node","    sourceAnchor: right","    targetAnchor: left","```"].join(`
`),sequence:["```diagram","id: new-sequence","type: sequence","participants:","  - id: first-participant","    label: First participant","  - id: second-participant","    label: Second participant","messages:","  - from: first-participant","    to: second-participant","    label: Request","```"].join(`
`),"diagram-reference":":::diagram { id=diagram-id }",panel:[':::panel { title="New panel" palette=accent }',"Panel content.",":::"].join(`
`),grid:[":::grid { columns=2 }",':::panel { title="First panel" }',"First panel content.",":::","",':::panel { title="Second panel" }',"Second panel content.",":::",":::"].join(`
`)};function Ut(r,e){let t=new Set([...r.matchAll(/(?:\bid:\s*|:::diagram\s+\{\s*id=)(?:"([^"]+)"|([^\s}\n#]+))/g)].map(i=>i[1]||i[2])),n=1,o=e;for(;t.has(o);)n+=1,o=`${e}-${n}`;return o}function Kr(r,e){let t=Xr[r];if(!t)return null;if(r==="flowchart")return t.replace("id: new-flowchart",`id: ${Ut(e,"new-flowchart")}`);if(r==="sequence")return t.replace("id: new-sequence",`id: ${Ut(e,"new-sequence")}`);if(r==="diagram-reference"){let n=Ut(e,"diagram-reference");return t.replace("diagram-id",n)}return t}var Ft=class{constructor(e){this.host=e;this.renderTimer=null;this.resizeObserver=null;this.openState=!1;this.draft="";this.error=""}get isOpen(){return this.openState}get hasUnsavedDraft(){return this.openState&&this.draft!==this.host.getSource()}get hasError(){return this.error.length>0}get draftSource(){return this.draft}setError(e){this.error=e,this.updateStatus()}clearError(){this.error=""}open(){globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=null,this.draft=this.host.getSource(),this.error="",this.openState=!0,this.host.stopDiagramEditing(),this.host.renderDocument();let e=()=>this.focus();globalThis.requestAnimationFrame?.(e)??e()}close(){this.flushRender(),!(this.error&&this.draft!==this.host.getSource()&&!globalThis.confirm("Discard the invalid source changes?"))&&(this.openState=!1,this.draft="",this.error="",this.renderTray(),document.querySelector(".docdiagram-menu-toggle")?.focus())}flushRender(){return this.renderTimer===null?!0:this.renderDraft()}syncSource(e){if(!this.openState)return;this.draft=e,this.error="";let t=document.querySelector(".docdiagram-source-editor");if(!t)return;let n=t.selectionStart,o=t.selectionEnd,i=t.scrollTop;t.value=e,t.setSelectionRange(Math.min(n,e.length),Math.min(o,e.length)),t.scrollTop=i,this.updateStatus()}reveal(e){let t=St(this.host.getSource(),e);if(!t||this.hasUnsavedDraft)return!1;this.openState||this.open();let n=()=>{let o=document.querySelector(".docdiagram-source-editor");o&&(o.focus(),o.setSelectionRange(t.start,t.end),$t(o,t))};return globalThis.requestAnimationFrame?.(n)??n(),!0}renderTray(){let e=document.querySelector(".docdiagram-source-tray");if(!this.openState){this.resizeObserver?.disconnect(),this.resizeObserver=null,e?.remove(),delete this.host.outputElement.dataset.sourceEditorOpen,this.host.outputElement.style.removeProperty("--docdiagram-source-tray-height");return}if(e){e.dataset.theme=this.host.getDocumentTheme(),this.host.outputElement.dataset.sourceEditorOpen="true",this.updateStatus();return}e=document.createElement("section"),e.className="docdiagram-source-tray",e.dataset.theme=this.host.getDocumentTheme(),e.setAttribute("aria-label","Document source editor"),e.innerHTML=['<header class="docdiagram-source-header">','<div><strong>Source</strong><span class="docdiagram-source-shortcut">Cmd/Ctrl+Shift+E to close</span></div>','<div class="docdiagram-source-actions">','<button type="button" class="docdiagram-source-menu-toggle" aria-label="Source editor menu" aria-expanded="false" title="Source editor menu">\u2630</button>','<div class="docdiagram-source-menu" hidden>','<div class="docdiagram-source-menu-heading">Insert</div>','<button type="button" data-source-template="flowchart">Flowchart</button>','<button type="button" data-source-template="sequence">Sequence</button>','<button type="button" data-source-template="diagram-reference">Diagram Reference</button>','<button type="button" data-source-template="panel">Panel</button>','<button type="button" data-source-template="grid">Grid</button>','<button type="button" class="docdiagram-source-help">Help</button>',"</div>",'<button type="button" class="docdiagram-source-close" aria-label="Close source editor" title="Close source editor">\xD7</button>',"</div>","</header>",'<label class="docdiagram-source-label">Canonical Markdown<textarea class="docdiagram-source-editor" spellcheck="false"></textarea></label>','<p class="docdiagram-source-status" aria-live="polite"></p>','<p class="docdiagram-source-error" role="alert"></p>'].join("");let t=e.querySelector(".docdiagram-source-editor"),n=e.querySelector(".docdiagram-source-close"),o=e.querySelector(".docdiagram-source-menu-toggle"),i=e.querySelector(".docdiagram-source-menu");if(!t||!n||!o||!i)return;t.value=this.draft,t.addEventListener("input",()=>{this.draft=t.value,this.error="",this.updateStatus(),this.scheduleRender()}),n.addEventListener("click",()=>this.close()),o.addEventListener("click",()=>{let a=i.hidden;i.hidden=!a,o.setAttribute("aria-expanded",String(a))});for(let a of e.querySelectorAll("[data-source-template]"))a.addEventListener("click",()=>{let d=Kr(a.dataset.sourceTemplate||"",t.value);d&&(this.insertTemplate(t,d),i.hidden=!0,o.setAttribute("aria-expanded","false"))});e.querySelector(".docdiagram-source-help")?.addEventListener("click",()=>{globalThis.open(_r,"_blank","noopener")}),e.addEventListener("keydown",a=>{a.key==="Escape"&&!i.hidden&&(a.preventDefault(),i.hidden=!0,o.setAttribute("aria-expanded","false"),o.focus())}),this.host.outputElement.after(e),this.host.outputElement.dataset.sourceEditorOpen="true";let s=()=>{this.host.outputElement.style.setProperty("--docdiagram-source-tray-height",`${e?.offsetHeight||0}px`)};this.resizeObserver?.disconnect(),globalThis.ResizeObserver&&(this.resizeObserver=new globalThis.ResizeObserver(s),this.resizeObserver.observe(e)),s(),this.updateStatus()}scheduleRender(){globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=globalThis.setTimeout(()=>{this.renderTimer=null,this.renderDraft()},250)}renderDraft(){return globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=null,this.host.renderDocument(this.draft,{preserveOnError:!0})}updateStatus(){let e=document.querySelector(".docdiagram-source-tray");if(!e)return;let t=e.querySelector(".docdiagram-source-status"),n=e.querySelector(".docdiagram-source-error");!t||!n||(t.textContent=this.error?"Source has errors; showing the last valid render.":"Changes render automatically.",n.hidden=!this.error,n.textContent=this.error)}insertTemplate(e,t){let n=e.selectionStart,o=e.selectionEnd,i=e.value.lastIndexOf(`
`,n-1)+1,s=e.value.indexOf(`
`,n),a=s===-1?e.value.length:s,d=e.value.slice(i,a),u=/^\s*$/.test(d)?n:a,l=/^\s*$/.test(d)?o:a,c=u===a?`
${t}`:t;e.setRangeText(c,u,l,"end"),this.draft=e.value,this.error="",this.updateStatus(),this.scheduleRender(),e.focus()}focus(){let e=document.querySelector(".docdiagram-source-editor");e&&(e.focus(),e.setSelectionRange(e.value.length,e.value.length))}};function Zr(r){return r instanceof Element&&r.matches("input, textarea, select, [contenteditable]")}var Dt=class{constructor(e,t){this.sourceElement=e;this.outputElement=t;this.state=fr();this.sourceEditor=t?new Ft({outputElement:t,getSource:()=>this.getSource(),getDocumentTheme:()=>this.getDocumentTheme(),renderDocument:(n,o)=>this.renderDocument(n,o),stopDiagramEditing:()=>this.stopDiagramEditing(),closeDocumentMenu:()=>this.closeDocumentMenu()}):null,this.diagramEditor=t?new kt({outputElement:t,state:this.state,persistDiagramModels:()=>this.persistDiagramModels(),renderDocument:()=>this.renderDocument()}):null}getSource(){return this.sourceElement?.content.textContent||""}setSource(e){this.sourceElement?.content.replaceChildren(document.createTextNode(e))}getDocumentTheme(){return this.state.documentTheme}stopDiagramEditing(){this.state.editingDiagramIndex!==null&&(this.state.editingDiagramIndex=null,this.state.editSessionDiagram=null,qe(this.state))}renderDiagram(e,t){return hr(e,t,{colourScheme:this.state.documentColorScheme,state:{...this.state,documentTheme:this.state.documentTheme,documentColorScheme:this.state.documentColorScheme},onDiagram:(n,o)=>{this.state.diagramModels[n]=o}})}renderMarkdown(e,t={diagramIndex:0}){return Vt(e,t,{renderDiagram:(n,o)=>this.renderDiagram(n,o),documentColorScheme:this.state.documentColorScheme,documentTheme:this.state.documentTheme})}persistDiagramModels(){let e=0,t=this.getSource().replace(/\r\n/g,`
`),n=new Map;for(let s of this.state.diagramModels){let a=s.id;typeof a=="string"&&n.set(a,[...n.get(a)||[],s])}let o=new Map([...n].flatMap(([s,a])=>a.length===1?[[s,a[0]]]:[])),i=t.replace(/^((?: {0,3}> ?)*)```diagram\s*\n([\s\S]*?)^((?: {0,3}> ?)*)```$/gm,(s,a,d,u)=>{let c=d.replace(/^(?: {0,3}> ?)+/gm,"").match(/^id:\s*(?:"([^"]+)"|([^\s#]+))\s*$/m)?.slice(1).find(Boolean),h=c&&o.get(c)||this.state.diagramModels[e];e+=1;let y=h?lt(h):"",f=y?y.split(`
`).map(p=>`${a}${p}`).join(`
`):"";return`${a}\`\`\`diagram
${f?`${f}
`:""}${u}\`\`\``});this.setSource(i),this.sourceEditor?.syncSource(i)}renderDocument(e=this.getSource(),{preserveOnError:t=!1}={}){if(!this.outputElement)return!1;for(let l of this.outputElement.querySelectorAll(".docdiagram"))this.state.diagramViewportHeights.set(Number(l.dataset.diagramIndex),l.offsetHeight);let n={x:globalThis.scrollX||0,y:globalThis.scrollY||0},o=[...this.state.diagramModels],i=this.state.documentTheme,s=this.state.documentThemeSetting,a=this.state.documentColorScheme;this.state.diagramModels.length=0;let d;try{let l=t?Rt(e):Et(e);this.state.documentTheme=l.resolvedTheme,this.state.documentThemeSetting=l.theme,this.state.documentColorScheme=l.colourScheme,d=this.renderMarkdown(l.content)}catch(l){let c=l instanceof Error?l.message:String(l);return this.state.diagramModels.length=0,this.state.diagramModels.push(...o),t?(this.state.documentTheme=i,this.state.documentThemeSetting=s,this.state.documentColorScheme=a,this.sourceEditor?.setError(c),!1):(this.applyPageTheme(this.state.documentTheme),this.removeToolbarChrome(),this.outputElement.innerHTML=`<section class="docdiagram-error"><strong>Document could not be rendered.</strong><br>${w(c)}</section>`,this.sourceEditor?.renderTray(),!1)}this.setSource(e),this.sourceEditor?.clearError(),this.outputElement.dataset.theme=this.state.documentTheme,this.outputElement.dataset.colourScheme=this.state.documentColorScheme,this.applyDocumentColourScheme(this.outputElement),this.outputElement.dataset.format=this.state.documentFormat,this.applyPageTheme(this.state.documentTheme),this.outputElement.innerHTML=d,this.removeToolbarChrome(),this.createToolbar(),this.sourceEditor?.renderTray();let u=document.querySelector(".docdiagram-source-tray");return u&&this.applyDocumentColourScheme(u),this.diagramEditor?.enableCanvasPanning(),this.diagramEditor?.enableSequenceSelection(),this.state.editingDiagramIndex!==null&&this.diagramEditor?.enableEditing(),globalThis.scrollTo?.(n.x,n.y),!0}closeDocumentMenu(){let e=document.querySelector(".docdiagram-menu"),t=document.querySelector(".docdiagram-menu-toggle");!e||!t||(e.hidden=!0,t.setAttribute("aria-expanded","false"))}downloadDocument(){if(this.sourceEditor?.flushRender(),this.sourceEditor?.hasError&&this.sourceEditor.hasUnsavedDraft&&!globalThis.confirm("Source has errors. Save the last valid version instead?"))return;let e=document.documentElement.cloneNode(!0),t=e.querySelector("#source"),n=e.querySelector(".docdiagram-toolbar"),o=e.querySelector(".docdiagram-source-tray"),i=e.querySelector("#rendered-document");t?.content.replaceChildren(document.createTextNode(this.getSource())),n?.remove(),o?.remove();for(let u of e.querySelectorAll("style"))(u.dataset.docdiagramRuntimeStyles==="true"||u.textContent?.includes(".docdiagram-inline-editor")&&u.textContent.includes(".docdiagram-toolbar"))&&u.remove();i?.replaceChildren(),i?.removeAttribute("data-editing-shortcuts-bound");for(let u of[...i?.attributes||[]])(u.name==="style"||u.name.startsWith("data-"))&&i?.removeAttribute(u.name);let s=new Blob([`<!doctype html>
${e.outerHTML}`],{type:"text/html;charset=utf-8"}),a=document.createElement("a"),d=document.title.toLowerCase().replace(/[^\w]+/g,"-").replace(/^-|-$/g,"");a.href=URL.createObjectURL(s),a.download=`${d||"document"}-edited.html`,a.click(),URL.revokeObjectURL(a.href),this.state.savedSource=this.getSource()}boot(){!this.sourceElement||!this.outputElement||(pr(),this.state.savedSource=this.getSource(),globalThis.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener("change",()=>{this.state.documentThemeSetting==="auto"&&this.renderDocument()}),globalThis.addEventListener("beforeunload",e=>{this.getSource()===this.state.savedSource&&!this.sourceEditor?.hasUnsavedDraft||(e.preventDefault(),e.returnValue="")}),document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.shiftKey&&e.key.toLowerCase()==="e"&&(this.sourceEditor?.isOpen||!Zr(e.target))){e.preventDefault(),this.sourceEditor?.isOpen?this.sourceEditor.close():this.sourceEditor?.open();return}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="s"){e.preventDefault(),this.downloadDocument();return}e.key==="Escape"&&this.closeDocumentMenu()}),document.addEventListener("pointerdown",e=>{let t=document.activeElement;t instanceof HTMLTextAreaElement&&t.matches(".docdiagram-inline-editor")&&!(e.target instanceof Node&&t.contains(e.target))&&t.blur();let n=document.querySelector(".docdiagram-toolbar");n&&e.target instanceof Node&&!n.contains(e.target)&&this.closeDocumentMenu(),!(!(e.target instanceof Element)||e.target.closest(".docdiagram-toolbar, .docdiagram-node, .docdiagram-edge-group, .docdiagram-connection-port, .docdiagram-edge-endpoint, .docdiagram-edge-waypoint, .docdiagram-inline-editor, .docdiagram-sequence-participant, .docdiagram-sequence-note, .docdiagram-sequence-message")||!this.state.selectedNode&&!this.state.selectedEdge&&!this.state.selectedSequenceElement)&&(qe(this.state),this.renderDocument())}),this.outputElement.addEventListener("dblclick",e=>{e.target instanceof Element&&e.target.closest("button, input, textarea, select, [contenteditable]")||this.sourceEditor?.reveal(globalThis.getSelection?.()?.toString()||"")}),this.renderDocument())}getCoreApi(){return{diagramThemes:ct,colourSchemes:ce,supportedDiagramTypes:Je,nodeShapes:Be,edgeAnchors:ne,edgeRoutes:Ie,edgeMarkerStyles:Q,getTheme:e=>Me(e,this.state.documentTheme),getGridSize:ee,expandCanvasForNode:Ve,flattenFlowchartNodes:U,getFlowchartNodeBounds:X,reparentFlowchartNode:ut,createUniqueNodeId:qt,getDefaultNodePosition:Pt,duplicateNode:Ge,createNode:Lt,getResizeNodeOrigin:ot,createConnector:gt,reconnectConnector:ht,resizeFlowchartNode:bt,deleteConnector:We,deleteNode:Ue,getNodeEffectiveStyle:(e,t)=>ve(e,t,this.state.documentTheme,this.state.documentColorScheme),getEdgeEffectiveStyle:(e,t)=>je(e,t,this.state.documentTheme),getEdgeMarkerStyle:et,getEdgeMarkerDimensions:Bt,parseDiagram:e=>De(e,this.state.documentColorScheme),parseDocumentFrontmatter:It,resolveDocument:Et,setFrontmatterTheme:Ht,isSafeUrl:vt,renderInline:Fe,renderMarkdown:(e,t)=>this.renderMarkdown(e,t),renderDiagram:(e,t)=>this.renderDiagram(e,t),snapToGrid:K,clampNodeSize:Oe,serializeDiagram:lt,setNodeLabel:Ye,setNodeShape:pt,setNodeSubtitle:ft,setNodeTextAlignment:tt,setNodeStyleOverride:Ce,setNodeColorPalette:rt,setNodeSize:nt,setEdgeLabel:_e,setEdgeRoute:yt,setEdgeAnchor:it,setEdgeStyleOverride:at,setStyleStrokeWidth:st,setEdgeMarkerStart:xt,setEdgeMarkerEnd:wt,validateDocumentSource:Rt,findSourceTextRange:St,scrollSourceEditorToRange:$t,splitTextLines:ue,renderTextBlock:ae,computeNodeTextLayout:Xe,getNodeGeometry:we,renderNodeBody:Ke,buildEdgePath:ke,buildEdgeInspectorFields:Wt,clampZoom:zt}}createToolbar(){if(!this.outputElement)return;let e=document.createElement("section");e.className="docdiagram-toolbar",e.dataset.editing=String(this.state.editingDiagramIndex!==null),e.dataset.theme=this.state.documentTheme,e.dataset.colourScheme=this.state.documentColorScheme,e.dataset.format=this.state.documentFormat;let t=this.getSelectedNode(),n=t?null:this.getSelectedEdge(),o=!t&&!n?this.getSelectedSequenceElement():null,i=t&&this.state.selectedNode?this.state.diagramModels[this.state.selectedNode.diagramIndex]:n&&this.state.selectedEdge?this.state.diagramModels[this.state.selectedEdge.diagramIndex]:o&&this.state.selectedSequenceElement?this.state.diagramModels[this.state.selectedSequenceElement.diagramIndex]:null;e.innerHTML=['<button type="button" class="docdiagram-menu-toggle" aria-label="Document menu" aria-expanded="false" title="Document menu">\u2630</button>','<div class="docdiagram-menu" hidden>','<label class="docdiagram-theme-control">Theme<select class="docdiagram-theme-select">',`<option value="auto"${this.state.documentThemeSetting==="auto"?" selected":""}>Auto</option>`,`<option value="light"${this.state.documentThemeSetting==="light"?" selected":""}>Light</option>`,`<option value="dark"${this.state.documentThemeSetting==="dark"?" selected":""}>Dark</option>`,"</select></label>",`<label class="docdiagram-theme-control">Colour scheme<select class="docdiagram-colour-scheme-select">${Object.entries(ce).map(([d,u])=>`<option value="${d}"${this.state.documentColorScheme===d?" selected":""}>${u.label}</option>`).join("")}</select></label>`,'<label class="docdiagram-theme-control">Format<select class="docdiagram-format-select">',`<option value="centered"${this.state.documentFormat==="centered"?" selected":""}>Centered</option>`,`<option value="full-width"${this.state.documentFormat==="full-width"?" selected":""}>Full width</option>`,"</select></label>",'<button type="button" class="docdiagram-edit-source">Edit source</button>','<button type="button" class="docdiagram-save">Save As</button>','<button type="button" class="docdiagram-offline-save" disabled>Save for Offline (coming soon)</button>',"</div>",t&&i?.type==="flowchart"?`<div class="docdiagram-inspector" data-kind="node">${yr(i,t,this.state.documentColorScheme,this.state.documentTheme)}</div>`:n&&i?`<div class="docdiagram-inspector" data-kind="edge">${Wt(i,n)}</div>`:o&&i?`<div class="docdiagram-inspector" data-kind="sequence">${xr(i,this.state.selectedSequenceElement,o,this.state.documentColorScheme,this.state.documentTheme)}</div>`:""].join("");let s=e.querySelector(".docdiagram-menu-toggle"),a=e.querySelector(".docdiagram-menu");s?.addEventListener("click",()=>{if(!a)return;let d=a.hidden;a.hidden=!d,s.setAttribute("aria-expanded",String(d))}),e.querySelector(".docdiagram-save")?.addEventListener("click",()=>this.downloadDocument()),e.querySelector(".docdiagram-edit-source")?.addEventListener("click",()=>{this.closeDocumentMenu(),this.sourceEditor?.open()}),e.querySelector(".docdiagram-theme-select")?.addEventListener("change",d=>{this.setSource(Ht(this.getSource(),d.currentTarget.value)),this.renderDocument()}),e.querySelector(".docdiagram-colour-scheme-select")?.addEventListener("change",d=>{this.setSource(dr(this.getSource(),d.currentTarget.value)),this.renderDocument()}),e.querySelector(".docdiagram-format-select")?.addEventListener("change",d=>{this.state.documentFormat=d.currentTarget.value==="full-width"?"full-width":"centered",this.renderDocument()}),this.outputElement.before(e),this.applyDocumentColourScheme(e),t&&this.state.selectedNode?wr(this,e,this.state.selectedNode.diagramIndex,this.state.selectedNode.nodeId):n&&this.state.selectedEdge?Er(this,e,this.state.selectedEdge.diagramIndex,this.state.selectedEdge.edgeIndex):o&&this.state.selectedSequenceElement&&Sr(this,e,o),this.wireChromeControls()}getSelectedNode(){let e=this.state.selectedNode,t=e?this.state.diagramModels[e.diagramIndex]:null;return e&&t?.type==="flowchart"&&Pe(this.state,e.diagramIndex)&&V(t,e.nodeId)?.node||null}getSelectedEdge(){let e=this.state.selectedEdge,t=e?this.state.diagramModels[e.diagramIndex]:null;return e&&t?.type==="flowchart"&&Pe(this.state,e.diagramIndex)&&t.edges[e.edgeIndex]||null}getSelectedSequenceElement(){let e=this.state.selectedSequenceElement,t=e?this.state.diagramModels[e.diagramIndex]:null;return!e||t?.type!=="sequence"||!Pe(this.state,e.diagramIndex)?null:e.kind==="participant"?t.participants?.find(n=>n.id===e.id)||null:e.kind==="message"?t.messages?.[e.index]||null:t.notes?.[e.index]||null}applyDocumentColourScheme(e){let t=ie(this.state.documentColorScheme,this.state.documentTheme,"background"),n=ie(this.state.documentColorScheme,this.state.documentTheme,"pale"),o=ie(this.state.documentColorScheme,this.state.documentTheme,"neutral"),i=ie(this.state.documentColorScheme,this.state.documentTheme,"accent");!t||!n||!o||!i||(e.style.setProperty("--docdiagram-background",t.fill||""),e.style.setProperty("--docdiagram-border",o.stroke||""),e.style.setProperty("--docdiagram-control-background",n.fill||""),e.style.setProperty("--docdiagram-control-hover",o.fill||""),e.style.setProperty("--docdiagram-code-background",n.fill||""),e.style.setProperty("--docdiagram-text",t.text||""),e.style.setProperty("--docdiagram-muted",o.text||""),e.style.setProperty("--docdiagram-accent",i.stroke||""))}wireChromeControls(){if(this.outputElement){for(let e of this.outputElement.querySelectorAll(".docdiagram-zoom-in, .docdiagram-zoom-out"))e.addEventListener("click",()=>{let t=Number(e.dataset.diagramIndex),n=this.state.diagramZooms.get(t)||100,o=e.classList.contains("docdiagram-zoom-in")?25:-25;this.state.diagramZooms.set(t,zt(n+o)),this.renderDocument()});for(let e of this.outputElement.querySelectorAll(".docdiagram-fit"))e.addEventListener("click",()=>{let t=Number(e.dataset.diagramIndex);this.state.diagramZooms.set(t,100),this.state.diagramCameraOffsets.delete(t),this.renderDocument()});for(let e of this.outputElement.querySelectorAll(".docdiagram-start-editing"))e.addEventListener("click",()=>{let t=Number(e.closest(".docdiagram")?.getAttribute("data-diagram-index")),n=this.state.diagramModels[t];n&&(this.state.editSessionDiagram=De(lt(n),this.state.documentColorScheme),this.state.editingDiagramIndex=t,qe(this.state),this.renderDocument())});for(let e of this.outputElement.querySelectorAll(".docdiagram-done-editing"))e.addEventListener("click",()=>this.exitEditing(this.state.editingDiagramIndex,!1));for(let e of this.outputElement.querySelectorAll(".docdiagram-cancel-editing"))e.addEventListener("click",()=>this.exitEditing(this.state.editingDiagramIndex,!0));for(let e of this.outputElement.querySelectorAll(".docdiagram-create-node"))e.addEventListener("click",()=>this.createNewNode(Number(e.dataset.diagramIndex)))}}exitEditing(e,t){e!==null&&(t&&this.state.editSessionDiagram&&(this.state.diagramModels[e]=this.state.editSessionDiagram,this.persistDiagramModels()),this.state.editingDiagramIndex=null,this.state.editSessionDiagram=null,qe(this.state),this.renderDocument())}createNewNode(e){let t=this.state.diagramModels[e];if(!t||t.type!=="flowchart")return;let n=Lt(t);this.state.selectedNode={diagramIndex:e,nodeId:n.id},this.state.selectedEdge=null,this.persistDiagramModels(),this.renderDocument()}applyPageTheme(e){let t=ie(this.state.documentColorScheme,e,"background"),n=t?.text;document.documentElement.dataset.docdiagramTheme=e,document.documentElement.style.setProperty("--docdiagram-page-background",t?.fill||""),document.documentElement.style.setProperty("--docdiagram-page-text",n||""),document.body?.dataset&&(document.body.dataset.docdiagramTheme=e)}removeToolbarChrome(){if(this.outputElement)for(;this.outputElement.previousElementSibling?.classList.contains("docdiagram-toolbar");)this.outputElement.previousElementSibling.remove()}};var Jr=document.querySelector("#source"),Qr=document.querySelector("#rendered-document"),$r=new Dt(Jr,Qr),eo=globalThis;eo.DocDiagramCore=$r.getCoreApi();$r.boot();})();
