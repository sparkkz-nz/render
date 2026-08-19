"use strict";(()=>{var pe=["background","pale","light","neutral","dark","accent-soft","accent","accent-strong","note","success","warning","danger","highlight"],Ye=["flowchart","sequence"],Pe=["rounded-rectangle","circle","oval","database","diamond","rhombus","flattened-hexagon","chevron","right-chevron","document"],J=["top","right","bottom","left"],Le=["orthogonal","straight","curved"],X=["none","arrow","circle"],_e={start:"none",end:"arrow"},Ut=["top","center"],Yt=["left","center","right"],At={width:50,height:20},Ct={width:50,height:20},L={shape:"rounded-rectangle",label:"New node",width:190,height:80},be=(r,e,t,n,o,i,s,a,c,l,u,d,g)=>({background:r,pale:e,light:t,neutral:n,dark:o,"accent-soft":i,accent:s,"accent-strong":a,note:c,success:l,warning:u,danger:d,highlight:g}),m=(r,e,t,n,o,i)=>({label:r,fill:e,stroke:t,text:n,gradient:o,glow:i}),ie={classic:{label:"Classic",light:be(m("Background","#FFFFFF","#D1D5DB","#111827"),m("Pale","#F3F4F6","#9CA3AF","#1F2937"),m("Light","#E5E7EB","#6B7280","#1F2937"),m("Neutral","#D1D5DB","#4B5563","#111827"),m("Dark","#374151","#111827","#F9FAFB"),m("Soft","#DBEAFE","#60A5FA","#1E3A8A"),m("Accent","#BFDBFE","#2563EB","#1E3A8A","#EFF6FF"),m("Strong","#2563EB","#1D4ED8","#FFFFFF","#3B82F6","#60A5FA"),m("Note","#DBEAFE","#2563EB","#1E3A8A"),m("Success","#DCFCE7","#16A34A","#14532D"),m("Warning","#FFEDD5","#EA580C","#7C2D12"),m("Danger","#FEE2E2","#DC2626","#7F1D1D"),m("Highlight","#FEF9C3","#CA8A04","#713F12")),dark:be(m("Background","#111827","#374151","#F9FAFB"),m("Pale","#1F2937","#4B5563","#F3F4F6"),m("Light","#374151","#6B7280","#F9FAFB"),m("Neutral","#4B5563","#9CA3AF","#FFFFFF"),m("Dark","#9CA3AF","#D1D5DB","#111827"),m("Soft","#172554","#3B82F6","#DBEAFE"),m("Accent","#1E3A8A","#60A5FA","#EFF6FF","#172554"),m("Strong","#2563EB","#93C5FD","#FFFFFF","#1D4ED8","#60A5FA"),m("Note","#172554","#60A5FA","#DBEAFE"),m("Success","#052E16","#4ADE80","#DCFCE7"),m("Warning","#431407","#FB923C","#FFEDD5"),m("Danger","#450A0A","#F87171","#FEE2E2"),m("Highlight","#422006","#FACC15","#FEF9C3"))},ice:{label:"Ice",light:be(m("Background","#F8FCFF","#D8EAF4","#123040"),m("Pale","#EDF8FC","#B8DCEB","#123040"),m("Light","#D9F2FF","#88BED7","#123040"),m("Neutral","#B8DCEB","#4A8BAA","#123040"),m("Dark","#21536C","#123040","#F4FBFF"),m("Soft","#DDF5FF","#75C6E8","#0F4C67"),m("Accent","#BDEAFF","#2E91BF","#083B55","#E8F9FF"),m("Strong","#1976A3","#0E5E85","#FFFFFF","#43B3E8","#8DDBF7"),m("Note","#DCEFFF","#3182CE","#123A63"),m("Success","#DDF7EE","#1E9B68","#104B35"),m("Warning","#FFF0D8","#D97918","#6B3510"),m("Danger","#FFE4E7","#D9485F","#651C2A"),m("Highlight","#FFF8C9","#C69A13","#5E4900")),dark:be(m("Background","#0C1D29","#26475A","#E8F7FF"),m("Pale","#112B3A","#376176","#E8F7FF"),m("Light","#173B4D","#4A7B92","#F0FAFF"),m("Neutral","#28576B","#79AFC3","#F4FBFF"),m("Dark","#A3D6E9","#D4F2FF","#0C1D29"),m("Soft","#10384E","#4AB5DF","#DDF7FF"),m("Accent","#15526D","#72CEF2","#ECFBFF","#123C52"),m("Strong","#2186B5","#94DCF5","#FFFFFF","#176A91","#64CEF2"),m("Note","#122E4B","#62A9F5","#DCEFFF"),m("Success","#103D32","#4DD69A","#DDF7EE"),m("Warning","#4B2C0D","#F3A34C","#FFF0D8"),m("Danger","#4B1923","#F07A8C","#FFE4E7"),m("Highlight","#4A3D0A","#E6C54B","#FFF8C9"))},midnight:{label:"Midnight",light:be(m("Background","#FAFAFF","#D9D8EE","#17152D"),m("Pale","#F0EFFF","#C6C2E8","#29234D"),m("Light","#E3E0FF","#958ED0","#29234D"),m("Neutral","#C8C2EF","#625BA3","#211B42"),m("Dark","#30275E","#201943","#F8F7FF"),m("Soft","#EAE5FF","#9D8CE7","#35276D"),m("Accent","#D7CEFF","#6754C7","#2D2364","#F0EDFF"),m("Strong","#5540B5","#3E2D98","#FFFFFF","#7563D6","#A99BFF"),m("Note","#E1E9FF","#5578C9","#243968"),m("Success","#DEF6EA","#338E68","#143F2C"),m("Warning","#FFF0D7","#C77624","#66350F"),m("Danger","#FCE1EB","#C84972","#661B36"),m("Highlight","#FFF5C9","#B48A18","#5F4500")),dark:be(m("Background","#131126","#393354","#F4F2FF"),m("Pale","#1E1938","#514878","#F0EEFF"),m("Light","#2B2450","#6B619A","#F8F7FF"),m("Neutral","#443B72","#9D92CC","#FFFFFF"),m("Dark","#B9B1E6","#DCD8F7","#18142E"),m("Soft","#2A2052","#A898F0","#F0ECFF"),m("Accent","#3B2E75","#B2A5FF","#F7F5FF","#2B205A"),m("Strong","#6954D0","#C4BAFF","#FFFFFF","#4D3AA9","#B2A5FF"),m("Note","#202C56","#82A1F0","#E1E9FF"),m("Success","#123D2E","#65D2A0","#DEF6EA"),m("Warning","#4A2B10","#F0A45C","#FFF0D7"),m("Danger","#4C172B","#EF7FA4","#FCE1EB"),m("Highlight","#4A390B","#DFC74F","#FFF5C9"))},paper:{label:"Paper",light:be(m("Background","#FFFDF7","#E0D8C8","#332D24"),m("Pale","#F7F1E5","#D4C5AD","#40372C"),m("Light","#EEE3D0","#BBA98B","#40372C"),m("Neutral","#D8C8AF","#8C765A","#332D24"),m("Dark","#514536","#332D24","#FFFCF5"),m("Soft","#EEE8DC","#A99879","#44392B"),m("Accent","#E8DDC7","#947044","#3E2D1D","#F7F0E4"),m("Strong","#81592F","#62401F","#FFFFFF","#A77A44","#D3B37B"),m("Note","#E5EFF4","#517B98","#233E50"),m("Success","#E4F0DF","#5D8A54","#294527"),m("Warning","#F9E8CD","#B96B28","#64350D"),m("Danger","#F5E0DA","#AD5342","#5D251C"),m("Highlight","#F8F0BD","#A78216","#584600")),dark:be(m("Background","#29251F","#554B3E","#F9F2E6"),m("Pale","#373027","#6F6250","#F9F2E6"),m("Light","#4A4033","#8B7B64","#FFF9EE"),m("Neutral","#675947","#A89880","#FFF9EE"),m("Dark","#CBBCA4","#E8DBC7","#30291F"),m("Soft","#463B2D","#B6A080","#FFF8E9"),m("Accent","#5C482F","#D1B98A","#FFF9EE","#483622"),m("Strong","#916C3C","#E0C28B","#FFFFFF","#705029","#CFAA69"),m("Note","#273A46","#7DB2D0","#E5EFF4"),m("Success","#31452B","#9BC58F","#E4F0DF"),m("Warning","#503016","#E3A060","#F9E8CD"),m("Danger","#51281F","#DA8A79","#F5E0DA"),m("Highlight","#4A3D12","#D6BC48","#F8F0BD"))}},at={light:{edge:{stroke:"#52616B",strokeWidth:2,text:"#3E4A54"},node:{fill:"#EAF2FF",stroke:"#3574C7",strokeWidth:2,text:"#17202A"}},dark:{edge:{stroke:"#B8C7D5",strokeWidth:2,text:"#D9E4ED"},node:{fill:"#193A61",stroke:"#71AEF7",strokeWidth:2,text:"#F3F8FC"}}};var _t=["note","info","warning","success"],Xt={2:"repeat(2, minmax(0, 1fr))",3:"repeat(3, minmax(0, 1fr))","2fr 1fr":"minmax(0, 2fr) minmax(0, 1fr)","1fr 2fr":"minmax(0, 1fr) minmax(0, 2fr)"};var Er=["nodes","edges","participants","messages","activations","notes","groups"],Sr=["id","label","shape","position","size","style","palette","subtitle","textVAlign","textHAlign","children"],$r=["source","target","sourceAnchor","targetAnchor","route","label","style","start","end"],Zt=["fill","stroke","strokeWidth","text"],Fr=["stroke","strokeWidth","text"],kr=["id","label","kind","palette","style","size"],vr=["actor"],Dr=["from","to","label","style"],Nr=["solid","dashed"],Ar=["participant","from","to"],Cr=["at","after","label","palette","style","size"],Mr=["label","from","to"],Tr=["width","height","participantSpacing","participantSize"];function w(r){return String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ze(r){let e=r.trim();if(e.startsWith('"')&&e.endsWith('"'))try{return JSON.parse(e)}catch{throw new Error(`Invalid quoted scalar: ${e}`)}if(e.startsWith("'")&&e.endsWith("'"))return e.slice(1,-1);if(/^-?\d+(\.\d+)?$/.test(e))return Number(e);if(e==="true"||e==="false")return e==="true";if(e.startsWith("{")&&e.endsWith("}")){let t=e.slice(1,-1).trim();if(!t)return{};let n=t.split(","),o={};for(let i of n){let s=i.indexOf(":");if(s===-1)throw new Error(`Invalid inline mapping: ${e}`);let a=i.slice(0,s).trim();o[a]=ze(i.slice(s+1))}return o}return e}function Se(r,e="classic"){let n=r.replace(/\r\n/g,`
`).split(`
`).filter(g=>g.trim()&&!g.trimStart().startsWith("#"));for(let g of n){if(g.trimStart()!==g||!g.trimEnd().endsWith(":"))continue;let y=g.trim().slice(0,-1);if(y!=="canvas"&&!Er.includes(y))throw new Error(`Unsupported diagram section: ${y}`)}let o=0,i=g=>g.length-g.trimStart().length,s=g=>g.trim().match(/^([^:]+):\s*(.*)$/),a=g=>g.trim().match(/^- ([^:]+):\s*(.*)$/),c=g=>o>=n.length||i(n[o])<=g?{}:n[o].trimStart().startsWith("- ")?u(i(n[o])):l(i(n[o])),l=g=>{let y={};for(;o<n.length&&i(n[o])===g;){let h=n[o],f=s(h);if(!f)throw new Error(`Cannot parse diagram line: ${h}`);o+=1,y[f[1]]=f[2]?ze(f[2]):c(g)}return y},u=g=>{let y=[];for(;o<n.length&&i(n[o])===g;){let h=n[o],f=a(h);if(!f)throw new Error(`Cannot parse diagram line: ${h}`);o+=1;let $={[f[1]]:f[2]?ze(f[2]):c(g)};for(;o<n.length&&i(n[o])>g;){let x=i(n[o]),p=s(n[o]);if(!p)throw new Error(`Cannot parse diagram line: ${n[o]}`);o+=1,$[p[1]]=p[2]?ze(p[2]):c(x)}y.push($)}return y},d=l(0);if(!d.type)throw new Error(`Diagram type is required and must be one of: ${Ye.join(", ")}.`);if(typeof d.type!="string"||!Ye.includes(d.type))throw new Error(`Unsupported diagram type: ${String(d.type)}`);return d.type==="flowchart"?qr(d,e):Pr(d,e)}function qr(r,e="classic"){return r.canvas=r.canvas||{},Array.isArray(r.nodes)||(r.nodes=[]),Array.isArray(r.edges)||(r.edges=[]),Lr(r,e),r}function Pr(r,e="classic"){return zr(r,e),r}function le(r,e,t){for(let n of Object.keys(r||{}))if(!e.includes(n))throw new Error(`Unsupported ${t} field: ${n}`)}function Mt(r,e,t){if(r){for(let n of Object.keys(r))if(!e.includes(n))throw new Error(`Unsupported ${t} style field: ${n}`)}}function Lr(r,e="classic"){if(r.participants!==void 0||r.messages!==void 0||r.activations!==void 0||r.notes!==void 0||r.groups!==void 0)throw new Error("Flowchart diagrams do not support sequence sections.");let t=new Set,n=o=>{if("type"in o)throw new Error(`Node "${o.id||"unknown"}" uses removed field "type".`);if(le(o,Sr,`node "${o.id||"unknown"}"`),!o.id||typeof o.label!="string")throw new Error("Every node requires an id and a string label.");if(!o.shape)throw new Error(`Node "${o.id}" requires a shape.`);if(!Pe.includes(o.shape))throw new Error(`Unsupported node shape: ${o.shape}`);if(o.textVAlign!==void 0&&!Ut.includes(o.textVAlign))throw new Error(`Unsupported node textVAlign: ${o.textVAlign}`);if(o.textHAlign!==void 0&&!Yt.includes(o.textHAlign))throw new Error(`Unsupported node textHAlign: ${o.textHAlign}`);if(o.palette!==void 0&&(typeof o.palette!="string"||!pe.includes(o.palette)))throw new Error(`Unsupported node palette: ${String(o.palette||"unknown")}`);if(o.style?.width!==void 0)throw new Error("Node style.width is not supported; use style.strokeWidth.");if(Mt(o.style,Zt,`node "${o.id}"`),t.has(o.id))throw new Error(`Duplicate flowchart node id: ${o.id}`);if(t.add(o.id),o.children!==void 0&&!Array.isArray(o.children))throw new Error(`Children for node "${o.id}" must be a list.`);for(let i of o.children||[])n(i)};for(let o of r.nodes)n(o);for(let o of r.edges){if(le(o,$r,`edge "${o.source||"unknown"}" -> "${o.target||"unknown"}"`),!o.sourceAnchor)throw new Error(`Edge "${o.source||"unknown"}" -> "${o.target||"unknown"}" requires a sourceAnchor.`);if(!o.targetAnchor)throw new Error(`Edge "${o.source||"unknown"}" -> "${o.target||"unknown"}" requires a targetAnchor.`);if(!J.includes(o.sourceAnchor))throw new Error(`Unsupported edge sourceAnchor: ${o.sourceAnchor}`);if(!J.includes(o.targetAnchor))throw new Error(`Unsupported edge targetAnchor: ${o.targetAnchor}`);if(o.route!==void 0&&!Le.includes(o.route))throw new Error(`Unsupported edge route: ${o.route}`);if(o.start!==void 0&&!X.includes(o.start))throw new Error(`Unsupported edge start marker: ${o.start}`);if(o.end!==void 0&&!X.includes(o.end))throw new Error(`Unsupported edge end marker: ${o.end}`);if(o.style?.width!==void 0)throw new Error("Edge style.width is not supported; use style.strokeWidth.");Mt(o.style,Fr,`edge "${o.source||"unknown"}" -> "${o.target||"unknown"}"`)}}function zr(r,e="classic"){if(r.nodes!==void 0||r.edges!==void 0)throw new Error("Sequence diagrams do not support flowchart sections.");if(!Array.isArray(r.participants)||!Array.isArray(r.messages))throw new Error("Sequence diagrams require participants and messages sections.");if(r.activations!==void 0&&!Array.isArray(r.activations))throw new Error("Sequence diagram activations must be a list.");if(r.notes!==void 0&&!Array.isArray(r.notes))throw new Error("Sequence diagram notes must be a list.");if(r.groups!==void 0&&!Array.isArray(r.groups))throw new Error("Sequence diagram groups must be a list.");if(r.canvas!==void 0&&(typeof r.canvas!="object"||Array.isArray(r.canvas)))throw new Error("Sequence canvas must be a mapping.");le(r.canvas,Tr,"sequence canvas");for(let n of["width","height","participantSpacing"]){let o=r.canvas?.[n];if(o!==void 0&&(!Number.isFinite(o)||Number(o)<=0))throw new Error(`Sequence canvas.${n} must be a positive number.`)}if(r.canvas?.participantSize!==void 0){if(typeof r.canvas.participantSize!="object"||Array.isArray(r.canvas.participantSize))throw new Error("Sequence canvas.participantSize must be a mapping.");le(r.canvas.participantSize,["width","height"],"sequence canvas participantSize");for(let n of["width","height"]){let o=r.canvas.participantSize[n];if(o!==void 0&&(!Number.isFinite(o)||Number(o)<=0))throw new Error(`Sequence canvas.participantSize.${n} must be a positive number.`)}}let t=new Set;for(let n of r.participants){if(le(n,kr,`participant "${n.id||"unknown"}"`),!n.id||!n.label)throw new Error("Every sequence participant requires an id and label.");if(n.kind!==void 0&&!vr.includes(n.kind))throw new Error(`Unsupported sequence participant kind: ${n.kind}`);if(Kt(n,`participant "${n.id}"`,e),t.has(n.id))throw new Error(`Duplicate sequence participant id: ${n.id}`);t.add(n.id)}for(let[n,o]of r.messages.entries()){if(le(o,Dr,`message ${n}`),!o.from||!o.to||!o.label)throw new Error(`Sequence message ${n} requires from, to, and label.`);if(!t.has(o.from)||!t.has(o.to))throw new Error(`Sequence message ${n} references an unknown participant.`);if(o.style!==void 0&&!Nr.includes(o.style))throw new Error(`Unsupported sequence message style: ${o.style}`)}for(let[n,o]of(r.activations||[]).entries()){if(le(o,Ar,`activation ${n}`),!o.participant||!Number.isInteger(o.from)||!Number.isInteger(o.to))throw new Error(`Sequence activation ${n} requires participant and integer from and to message positions.`);if(!t.has(o.participant))throw new Error(`Sequence activation ${n} references an unknown participant.`);if(o.from<1||o.to<o.from||o.to>r.messages.length)throw new Error(`Sequence activation ${n} range is out of bounds.`)}for(let[n,o]of(r.notes||[]).entries()){le(o,Cr,`note ${n}`);let i=o.after;if(!o.at||!Number.isInteger(i)||!o.label)throw new Error(`Sequence note ${n} requires at, after, and label.`);if(Kt(o,`note ${n}`,e),!t.has(o.at))throw new Error(`Sequence note ${n} references an unknown participant.`);if(i<0||i>r.messages.length)throw new Error(`Sequence note ${n} after position is out of bounds.`)}for(let[n,o]of(r.groups||[]).entries()){if(le(o,Mr,`group ${n}`),!o.label&&o.label!=="")throw new Error(`Sequence group ${n} requires a label.`);if(!Number.isInteger(o.from)||!Number.isInteger(o.to))throw new Error(`Sequence group ${n} requires integer from and to indices.`);if(o.from<1||o.to<o.from||o.to>r.messages.length)throw new Error(`Sequence group ${n} range is out of bounds.`)}}function Kt(r,e,t="classic"){if(r.palette!==void 0){let n=String(r.palette||"");if(!pe.includes(n))throw new Error(`Unsupported ${e} palette: ${n||"unknown"}`)}if(Mt(r.style,Zt,e),r.size){le(r.size,["width","height"],`size for ${e}`);for(let n of["width","height"]){let o=r.size[n];if(o!==void 0&&(!Number.isFinite(o)||Number(o)<=0))throw new Error(`${e} size.${n} must be a positive number.`)}}}function $e(r){return typeof r=="number"||typeof r=="boolean"?String(r):r&&typeof r=="object"?Object.keys(r).length?`{ ${Object.entries(r).map(([e,t])=>`${e}: ${$e(t)}`).join(", ")} }`:"{}":/^[\w./-]+(?: [\w./-]+)*$/.test(String(r))?String(r):JSON.stringify(String(r))}function ye(r,e=2){let t=Object.entries(r),[n,o]=t[0],i=[`${" ".repeat(e)}- ${n}: ${$e(o)}`];for(let[s,a]of t.slice(1))if(!(s==="children"&&Array.isArray(a)&&!a.length))if(s==="children"&&Array.isArray(a)){i.push(`${" ".repeat(e+2)}children:`);for(let c of a)i.push(...ye(c,e+4))}else i.push(`${" ".repeat(e+2)}${s}: ${$e(a)}`);return i}function st(r){let e=[`type: ${$e(r.type)}`];for(let[t,n]of Object.entries(r))t==="type"||t==="canvas"||t==="nodes"||t==="edges"||t==="participants"||t==="messages"||t==="activations"||t==="notes"||t==="groups"||e.push(`${t}: ${$e(n)}`);if(r.type==="sequence"){if(r.canvas!==void 0){e.push("canvas:");for(let[t,n]of Object.entries(r.canvas))e.push(`  ${t}: ${$e(n)}`)}e.push("participants:");for(let t of r.participants||[])e.push(...ye(t));e.push("messages:");for(let t of r.messages||[])e.push(...ye(t));if(r.activations!==void 0){e.push("activations:");for(let t of r.activations||[])e.push(...ye(t))}if(r.notes!==void 0){e.push("notes:");for(let t of r.notes||[])e.push(...ye(t))}if(r.groups!==void 0){e.push("groups:");for(let t of r.groups||[])e.push(...ye(t))}return e.join(`
`)}e.push("canvas:");for(let[t,n]of Object.entries(r.canvas||{}))e.push(`  ${t}: ${$e(n)}`);e.push("nodes:");for(let t of r.nodes||[])e.push(...ye(t));e.push("edges:");for(let t of r.edges||[])e.push(...ye(t));return e.join(`
`)}function Jt(r){return{width:Number(r.size?.width)||L.width,height:Number(r.size?.height)||L.height}}function O(r){let e=[],t=(n,o,i,s)=>{for(let a of n){let c={x:i.x+(Number(a.position?.x)||0),y:i.y+(Number(a.position?.y)||0)};e.push({node:a,parent:o,siblings:n,position:c,depth:s}),t(a.children||[],a,c,s+1)}};return t(r.nodes,null,{x:0,y:0},0),e}function V(r,e){return O(r).find(t=>t.node.id===e)||null}function Tt(r,e){return O(r).find(t=>t.node===e)?.position||{x:0,y:0}}function _(r,e){return{...Tt(r,e),...Jt(e)}}function Qt(r,e){return(e.children||[]).some(t=>t===r||Qt(r,t))}function ct(r,e){var g;let t=V(r,e);if(!t)return null;let{node:n,siblings:o,position:i}=t,{width:s,height:a}=Jt(n),c={x:i.x+s/2,y:i.y+a/2},u=O(r).filter(y=>y.node!==n&&!Qt(y.node,n)).filter(y=>{let h=_(r,y.node);return c.x>=h.x&&c.x<=h.x+h.width&&c.y>=h.y&&c.y<=h.y+h.height}).reduce((y,h)=>!y||h.depth>=y.depth?h:y,null),d=u?(g=u.node).children||(g.children=[]):r.nodes;return o===d||(o.splice(o.indexOf(n),1),n.position={x:i.x-(u?.position.x||0),y:i.y-(u?.position.y||0)},d.push(n)),n}function dt(r){if(r==="light"||r==="dark")return r;if(r==="auto")return globalThis.matchMedia?.("(prefers-color-scheme: dark)").matches?"dark":"light";throw new Error(`Unsupported document theme: ${r}`)}function ke(r,e="light"){let t=dt(e),n=at[t];if(!n)throw new Error(`Unsupported diagram theme: ${t}`);return n}function ae(r,e,t){return ie[r]?.[dt(e)]?.[t]||null}function Fe(r,e){return{...r,...e||{}}}function xe(r,e,t="light",n="classic"){let i=ke(r,t).node,s=e.palette?ae(n,t,e.palette):null;return Fe(Fe(i,s),e.style)}function Be(r,e,t="light",n="classic"){let o=ke(r,t),i=e.palette?ae(n,t,e.palette):null;return Fe(Fe(o.node,i),e.style)}function Ie(r,e,t="light"){let n=ke(r,t);return Fe(n.edge,e.style)}function Xe(r,e){let t=e==="start"?r.start:r.end;return typeof t=="string"&&X.includes(t)?t:_e[e]}function se(r){let e=Number(r.canvas?.grid);return Number.isFinite(e)&&e>0?e:0}function Q(r,e){return e?Math.round(r/e)*e:Math.round(r)}function Re(r,e,t){let n=Q(r,t),o=t?Math.ceil(e/t)*t:e;return Math.max(o,n)}function er(r){return{x:Number(r.position?.x)||0,y:Number(r.position?.y)||0,width:Number(r.size?.width)||L.width,height:Number(r.size?.height)||L.height}}function He(r,e,t=40){let n=Number(r.canvas?.width)||1e3,o=Number(r.canvas?.height)||560,i=new Set(O(r).map(h=>h.node)),s=[...i];s.includes(e)||s.push(e);let a=h=>i.has(h)?_(r,h):er(h),c=s.map(a),l=Math.min(0,...c.map(h=>h.x)),u=Math.min(0,...c.map(h=>h.y)),d=l<0?t-l:0,g=u<0?t-u:0;if(d||g)for(let h of O(r).filter(f=>f.parent===null)){let f=h.node;f.position={...f.position,x:(Number(f.position?.x)||0)+d,y:(Number(f.position?.y)||0)+g}}let y=s.map(a);return r.canvas={...r.canvas,width:Math.max(n+d,...y.map(h=>h.x+h.width+t)),height:Math.max(o+g,...y.map(h=>h.y+h.height+t))},r}function tr(r,e){return r.x<e.x+e.width&&r.x+r.width>e.x&&r.y<e.y+e.height&&r.y+r.height>e.y}function qt(r,e="new-node"){let t=i=>i.flatMap(s=>[s.id,...t(s.children||[])]),n=new Set(t(r));if(!n.has(e))return e;let o=2;for(;n.has(`${e}-${o}`);)o+=1;return`${e}-${o}`}function Br(r,e){let t=e.replace(/[^a-z0-9]/gi,"").toLowerCase()||"node",n=1,o="";do o=`${t}${String(n).padStart(2,"0")}`,n+=1;while(r.has(o));return r.add(o),o}function Ir(r,e,t,n){let o=Number(r.canvas?.width)||1e3,i=Number(r.canvas?.height)||560,s=se(r),a=s||20,c={x:Q(n.x,s),y:Q(n.y,s)};for(let u=a;u<=Math.max(o,i);u+=a)for(let d of[{x:c.x+u,y:c.y+u},{x:c.x+u,y:c.y-u},{x:c.x-u,y:c.y+u},{x:c.x-u,y:c.y-u}])if(!(d.x<0||d.y<0||d.x+e>o||d.y+t>i)&&!O(r).some(({node:g})=>tr({...d,width:e,height:t},_(r,g))))return d;let l=Math.max(0,...O(r).map(({node:u})=>{let d=_(r,u);return d.x+d.width}));return{x:Q(l+a,s),y:0}}function Pt(r){let e=Number(r.canvas?.width)||1e3,t=Number(r.canvas?.height)||560,n=se(r),o={x:Q(Math.max(0,(e-L.width)/2),n),y:Q(Math.max(0,(t-L.height)/2),n)},i=n||20;for(let s=0;s<=Math.max(e,t);s+=i)for(let a of[{x:o.x+s,y:o.y},{x:o.x-s,y:o.y},{x:o.x,y:o.y+s},{x:o.x,y:o.y-s}])if(!(a.x<0||a.y<0||a.x+L.width>e||a.y+L.height>t)&&!O(r).some(({node:c})=>tr({...a,width:L.width,height:L.height},er(c))))return a;return o}function Lt(r){let e={id:qt(r.nodes),label:L.label,shape:L.shape,position:Pt(r),size:{width:L.width,height:L.height}};return r.nodes.push(e),e}function lt(r,e){let t=V(r,e);if(!t)return null;let n=new Set(O(r).map(({node:l})=>l.id)),o=l=>({id:Br(n,l.shape),label:l.label,shape:l.shape,...l.position?{position:{...l.position}}:{},...l.size?{size:{...l.size}}:{},...l.style?{style:{...l.style}}:{},...l.palette?{palette:l.palette}:{},...l.subtitle!==void 0?{subtitle:l.subtitle}:{},...l.textVAlign!==void 0?{textVAlign:l.textVAlign}:{},...l.textHAlign!==void 0?{textHAlign:l.textHAlign}:{},...l.children?{children:l.children.map(o)}:{}}),i=o(t.node),s=_(r,t.node),a=Ir(r,Number(i.size?.width)||L.width,Number(i.size?.height)||L.height,s),c=t.parent?Tt(r,t.parent):{x:0,y:0};return i.position={x:a.x-c.x,y:a.y-c.y},t.siblings.push(i),He(r,i),i}function ut(r,e,t,n,o){let i={source:e,target:n,sourceAnchor:t,targetAnchor:o,route:"orthogonal",end:"arrow"};return r.edges.push(i),i}function mt(r,e,t,n){return e==="source"?(r.source=t,r.sourceAnchor=n):(r.target=t,r.targetAnchor=n),r}function gt(r,e){return e<0||e>=r.edges.length?null:r.edges.splice(e,1)[0]}function ht(r,e){let t=V(r,e);if(!t)return{node:null,deletedEdges:[]};let n=new Set([t.node,...t.node.children||[]].flatMap(function i(s){return[s,...(s.children||[]).flatMap(i)]}).map(i=>i.id)),o=r.edges.filter(i=>n.has(i.source)||n.has(i.target));return t.siblings.splice(t.siblings.indexOf(t.node),1),r.edges=r.edges.filter(i=>!n.has(i.source)&&!n.has(i.target)),{node:e,deletedEdges:o}}function je(r,e){return r.label=String(e).trim(),r}function pt(r,e){return r.shape=e,r}function ft(r,e){return r.subtitle=String(e??"").trim(),r}function Ke(r,e,t){return e==="textVAlign"&&(t==="top"||t==="center")&&(r.textVAlign=t),e==="textHAlign"&&(t==="left"||t==="center"||t==="right")&&(r.textHAlign=t),r}function ve(r,e,t){return r.style={...r.style,[e]:t},r}function Ze(r,e,t="classic"){if(!ae(t,"light",e))return r;let{fill:o,stroke:i,text:s,...a}=r.style||{};return Object.keys(a).length?r.style=a:delete r.style,r.palette=e,r}function rr(r){return r==="document"?Ct:At}function Je(r){return{position:{x:Number(r.position?.x)||0,y:Number(r.position?.y)||0},size:{width:Number(r.size?.width)||L.width,height:Number(r.size?.height)||L.height},childPositions:new Map((r.children||[]).map(e=>[e,{x:Number(e.position?.x)||0,y:Number(e.position?.y)||0}]))}}function bt(r,e,t,n,o,i=Je(e)){let s=se(r),a=rr(e.shape),c=t.endsWith("left"),l=t.startsWith("top"),u=Re(i.size.width+(c?-n:n),a.width,s),d=Re(i.size.height+(l?-o:o),a.height,s);if(e.shape==="circle"){let f=Math.max(u,d);u=f,d=f}let g={...e.position,x:c?i.position.x+i.size.width-u:i.position.x,y:l?i.position.y+i.size.height-d:i.position.y},y=i.position.x-g.x,h=i.position.y-g.y;for(let f of e.children||[]){let $=i.childPositions.get(f)||f.position||{x:0,y:0};f.position={...f.position,x:$.x+y,y:$.y+h}}return e.position=g,e.size={...e.size,width:u,height:d},e}function Qe(r,e,t,n){let o=se(r),i=rr(e.shape),s=t==="width"?i.width:i.height,a=Re(Number(n)||s,s,o);return e.size=e.shape==="circle"?{...e.size,width:a,height:a}:{...e.size,[t]:a},e}function Oe(r,e){return r.label=String(e).trim(),r}function yt(r,e){return r.route=e,r}function et(r,e,t){return e==="source"?r.sourceAnchor=t:r.targetAnchor=t,r}function tt(r,e,t){return r.style={...r.style,[e]:t},r}function rt(r,e){let t=Math.max(1,Math.round(Number(e))||1);return r.style={...r.style,strokeWidth:t},r}function xt(r,e){return r.start=X.includes(e)?e:_e.start,r}function wt(r,e){return r.end=X.includes(e)?e:_e.end,r}function zt(r){return Math.max(25,Number(r)||100)}function ce(r){return String(r??"").replace(/\r\n/g,`
`).split(`
`)}function ee(r,e,t,n,o,i,s="middle"){if(!t.length)return"";let a=t.map((c,l)=>{let u=l===0?"":` dy="${n}"`;return`<tspan x="${r}"${u}>${w(c)||" "}</tspan>`}).join("");return`<text x="${r}" y="${e}" text-anchor="${s}" class="${o}" fill="${w(i)}">${a}</text>`}function fe(r,e,t,n,o){let i=r.shape,s=e+n/2,a=t+o/2,c={x:e+12,y:t+12,width:n-24,height:o-24},l={top:{x:s,y:t},right:{x:e+n,y:a},bottom:{x:s,y:t+o},left:{x:e,y:a}},u;if(i==="circle"){let d=Math.min(n,o),g=s-d/2,y=a-d/2,h=d/2;c.x=g+h*.3,c.y=y+h*.3,c.width=h*1.4,c.height=h*1.4,l.top.y=y,l.right.x=g+d,l.bottom.y=y+d,l.left.x=g,u=`<circle class="docdiagram-node-body" cx="${s}" cy="${a}" r="${h}"/>`}else if(i==="oval")c.x+=n*.1,c.width-=n*.2,u=`<ellipse class="docdiagram-node-body" cx="${s}" cy="${a}" rx="${n/2}" ry="${o/2}"/>`;else if(i==="database"){let d=Math.min(o*.22,18);c.y+=d/2,c.height-=d,u=`<path class="docdiagram-node-body" d="M ${e} ${t+d} C ${e} ${t-d/3} ${e+n} ${t-d/3} ${e+n} ${t+d} V ${t+o-d} C ${e+n} ${t+o+d/3} ${e} ${t+o+d/3} ${e} ${t+o-d} Z"/><path class="docdiagram-node-detail" d="M ${e} ${t+d} C ${e} ${t+d*2.3} ${e+n} ${t+d*2.3} ${e+n} ${t+d}" fill="none"/>`}else if(i==="diamond")c.x+=n*.25,c.y+=o*.25,c.width-=n*.5,c.height-=o*.5,l.top={x:s,y:t},l.right={x:e+n,y:a},l.bottom={x:s,y:t+o},l.left={x:e,y:a},u=`<polygon class="docdiagram-node-body" points="${s},${t} ${e+n},${a} ${s},${t+o} ${e},${a}"/>`;else if(i==="rhombus"){let d=Math.min(n*.2,o*.6);c.x+=d,c.width-=d*2,l.left.x=e+d/2,l.right.x=e+n-d/2,u=`<polygon class="docdiagram-node-body" points="${e+d},${t} ${e+n},${t} ${e+n-d},${t+o} ${e},${t+o}"/>`}else if(i==="flattened-hexagon"){let d=Math.min(n*.18,o*.7);c.x+=d,c.width-=d*2,u=`<polygon class="docdiagram-node-body" points="${e+d},${t} ${e+n-d},${t} ${e+n},${a} ${e+n-d},${t+o} ${e+d},${t+o} ${e},${a}"/>`}else if(i==="chevron"){let d=Math.min(n*.16,o*.45);c.x+=d*1.175,c.width-=d*1.35,l.left.x=e+d,u=`<polygon class="docdiagram-node-body" points="${e},${t} ${e+n-d},${t} ${e+n},${a} ${e+n-d},${t+o} ${e},${t+o} ${e+d},${a}"/>`}else if(i==="right-chevron"){let d=Math.min(n*.16,o*.45);c.width-=d,u=`<polygon class="docdiagram-node-body" points="${e},${t} ${e+n-d},${t} ${e+n},${a} ${e+n-d},${t+o} ${e},${t+o}"/>`}else if(i==="document"){let d=Math.max(12,Math.min(26,Math.min(n,o)*.18));c.width-=d*.45,c.y+=2,c.height-=2,u=`<path class="docdiagram-node-body" d="M ${e} ${t} H ${e+n-d} L ${e+n} ${t+d} V ${t+o} H ${e} Z M ${e+n-d} ${t} V ${t+d} H ${e+n}"/>`}else u=`<rect class="docdiagram-node-body" x="${e}" y="${t}" width="${n}" height="${o}" rx="12"/>`;return{bodyMarkup:u,textBounds:c,anchors:l}}function Ve(r,e,t,n,o){let i,s;typeof r=="number"?(i={x:r,y:e,width:t||0,height:n||0},s=o):(i=r,s=e);let a=20,c=15,l=ce(s.label),u=s.subtitle?ce(s.subtitle):[],d=u.length?6:0,g=l.length*a,y=u.length*c,h=g+d+y,f=s.textHAlign||"center",$=f==="left"?i.x:f==="right"?i.x+i.width:i.x+i.width/2,x=f==="left"?"start":f==="right"?"end":"middle",p=i.y+i.height/2,F=s.textVAlign==="top"?i.y:p-h/2;return{centerX:$,textAnchor:x,labelLines:l,subtitleLines:u,labelLineHeight:a,subtitleLineHeight:c,labelStartY:F+a*.72,subtitleStartY:F+g+d+c*.72}}function Ge(r,e,t){return r.bodyMarkup.replace("/>",` fill="${w(e.fill||"")}" stroke="${w(e.stroke||"")}" stroke-width="${t}"/>`).replace('class="docdiagram-node-detail"',`class="docdiagram-node-detail" stroke="${w(e.stroke||"")}" stroke-width="${t}"`)}function or(r){return{top:{x:0,y:-1},right:{x:1,y:0},bottom:{x:0,y:1},left:{x:-1,y:0}}[r]}function we(r){return`${r.x} ${r.y}`}function Rr(r){let e=r.slice(1).map((o,i)=>{let s=r[i];return{start:s,end:o,length:Math.hypot(o.x-s.x,o.y-s.y)}}),n=e.reduce((o,i)=>o+i.length,0)/2;for(let o of e){if(n<=o.length||o===e[e.length-1]){let i=o.length?n/o.length:0;return{x:o.start.x+(o.end.x-o.start.x)*i,y:o.start.y+(o.end.y-o.start.y)*i}}n-=o.length}return r[0]}function De(r,e,t,n,o="orthogonal"){let i=or(t),s=or(n),a=i.x!==0,c,l,u,d;if(o==="straight")c=`M ${we(r)} L ${we(e)}`,l={x:(r.x+e.x)/2,y:(r.y+e.y)/2},u={x:e.x-r.x,y:e.y-r.y},d=u;else if(o==="curved"){let g=Math.max(Math.abs(e.x-r.x),Math.abs(e.y-r.y),80),y=Math.min(g/2,140),h={x:r.x+i.x*y,y:r.y+i.y*y},f={x:e.x+s.x*y,y:e.y+s.y*y};c=`M ${we(r)} C ${we(h)} ${we(f)} ${we(e)}`,l={x:(r.x+3*h.x+3*f.x+e.x)/8,y:(r.y+3*h.y+3*f.y+e.y)/8},u={x:h.x-r.x,y:h.y-r.y},d={x:e.x-f.x,y:e.y-f.y}}else{let y={x:r.x+i.x*40,y:r.y+i.y*40},h={x:e.x+s.x*40,y:e.y+s.y*40},f=a?{x:h.x,y:y.y}:{x:y.x,y:h.y},$=[r,y,f,h,e],x=$.filter((F,E)=>E===0||F.x!==$[E-1].x||F.y!==$[E-1].y);x.length===1&&(x=[r,{x:r.x+i.x*40,y:r.y+i.y*40},e]),c=`M ${we(x[0])}${x.slice(1).map(F=>` L ${we(F)}`).join("")}`,l=Rr(x),u={x:x[1].x-x[0].x,y:x[1].y-x[0].y};let p=x.slice(-2);d={x:p[1].x-p[0].x,y:p[1].y-p[0].y}}return{path:c,midpoint:l,startTangent:u,endTangent:d,hitPath:c}}function Bt(r){let e=Math.max(1,Number(r)||2),t=6+e*2.5,n=Math.max(t*.38,e/2+1);return{size:t,circleRadius:n}}function ot(r,e,t,n,o){let i=w(n),{size:s,circleRadius:a}=Bt(o),c=s/2;return e==="arrow"?`<marker id="${r}" markerWidth="${s}" markerHeight="${s}" refX="${s}" refY="${c}" markerUnits="userSpaceOnUse" orient="${t==="start"?"auto-start-reverse":"auto"}"><path fill="${i}" stroke="${i}" d="M 0 0 L ${s} ${c} L 0 ${s} z"/></marker>`:e==="circle"?`<marker id="${r}" markerWidth="${s}" markerHeight="${s}" refX="${c}" refY="${c}" markerUnits="userSpaceOnUse"><circle cx="${c}" cy="${c}" r="${a}" fill="${i}" stroke="${i}"/></marker>`:""}function It(r){let e=r.replace(/\r\n/g,`
`).split(`
`),t=e.findIndex(i=>i.trim()!=="");if(t===-1||e[t]!=="---")return{content:r,frontmatter:{}};let n=e.indexOf("---",t+1);if(n===-1)return{content:r,frontmatter:{}};let o={};for(let i of e.slice(t+1,n)){if(!i.trim()||i.trimStart().startsWith("#"))continue;let s=i.match(/^([^:]+):\s*(.*)$/);if(!s)throw new Error(`Cannot parse document frontmatter line: ${i}`);o[s[1]]=ze(s[2])}return{content:e.slice(n+1).join(`
`),frontmatter:o}}function Et(r){let e=It(r),t=String(e.frontmatter.theme||"auto"),n=String(e.frontmatter.colourScheme||"classic"),o;try{o=dt(t)}catch{throw new Error(`Unsupported document theme: ${t}`)}if(!ie[n])throw new Error(`Unsupported document colour scheme: ${n}`);return{...e,theme:t,resolvedTheme:o,colourScheme:n}}function Rt(r){let e=Et(r),t=e.content.replace(/\r\n/g,`
`).split(`
`),n=0,o=new Set,i=!1,s=!1;for(let a of t){let c=a.replace(/^(?: {0,3}> ?)+/,"");if(/^```/.test(c)){s=!s;continue}if(!s&&/^:::diagram\s+\{\s*id=/.test(c)){i=!0;break}}for(;n<t.length;){let c=t[n].replace(/^(?: {0,3}> ?)+/,"").match(/^```([\w-]*)\s*$/);if(!c){n+=1;continue}let l=t.slice(n+1).findIndex(d=>/^```\s*$/.test(d.replace(/^(?: {0,3}> ?)+/,"")));if(l===-1)throw new Error("Unclosed code block.");let u=n+l+1;if(c[1]==="diagram"){let d=t.slice(n+1,u).map(y=>y.replace(/^(?: {0,3}> ?)+/,"")).join(`
`);Se(d,e.colourScheme);let g=d.match(/^id:\s*(?:"([^"]+)"|([^\s#]+))\s*$/m)?.slice(1).find(Boolean);if(g){if(o.has(g))throw new Error(`Duplicate diagram id: ${g}`);o.add(g)}else if(i)throw new Error("Every diagram requires an id when using diagram references.")}n=u+1}return e}function nr(r,e,t){let n=r.replace(/\r\n/g,`
`),o=n.split(`
`),i=o.findIndex(u=>u.trim()!==""),s=i!==-1&&o[i]==="---",a=s?o.indexOf("---",i+1):-1;if(!s||a===-1)return`---
${e}: ${t}
---
${n}`;let c=!1,l=o.slice(i+1,a).map(u=>{if(!u.trim()||u.trimStart().startsWith("#"))return u;let d=u.match(/^([^:]+):\s*(.*)$/);return d&&d[1]===e?(c=!0,`${e}: ${t}`):u});return c||l.push(`${e}: ${t}`),[...o.slice(0,i+1),...l,...o.slice(a)].join(`
`)}function Ht(r,e){return nr(r,"theme",e)}function ir(r,e){return nr(r,"colourScheme",e)}function St(r,e){let t=e.trim(),n=t?r.indexOf(t):-1;return n===-1?null:{start:n,end:n+t.length}}function $t(r,e){let t=Number.parseFloat(globalThis.getComputedStyle(r).lineHeight)||20,n=r.value.slice(0,e.start).split(`
`).length-1,o=Math.max(1,Math.floor(r.clientHeight/t));r.scrollTop=Math.max(0,(n-Math.floor(o/2))*t)}function jt(r){let e=[],t="",n=!1,o=r.trim().replace(/^\||\|$/g,"");for(let i of o)n?(t+=i,n=!1):i==="\\"?n=!0:i==="|"?(e.push(t.trim()),t=""):t+=i;return e.push(t.trim()),e}function ar(r){let e=jt(r);return!e.length||!e.every(t=>/^:?-{3,}:?$/.test(t))?null:e.map(t=>t.startsWith(":")&&t.endsWith(":")?"center":t.startsWith(":")?"left":t.endsWith(":")?"right":"")}function Ne(r){return r.match(/^(\s*)([-+*]|\d+[.)])\s+(.+)$/)}function Ot(r){let e=r.match(/^:::(section|panel|callout|grid|stack)(?:\s+\{(.*)\})?\s*$/);if(!e)return null;let t={},n=e[2];if(n!==void 0){let o=0,i=/\s*([a-z][\w-]*)=(?:"([^"]*)"|([^\s}]+))/gi,s;for(;s=i.exec(n);){if(s.index!==o||t[s[1]]!==void 0)return null;t[s[1]]=s[2]??s[3],o=i.lastIndex}if(n.slice(o).trim())return null}return{name:e[1],attributes:t}}function sr(r){let e=r.match(/^:::diagram\s+\{\s*id=(?:"([^"]+)"|([^\s}]+))\s*\}\s*$/),t=e?.[1]??e?.[2];return t?{id:t}:null}function cr(r){let e=r.match(/^id:\s*(?:"([^"]+)"|([^\s#]+))\s*$/m);return e?.[1]??e?.[2]??null}function Hr(r){return r.replace(/^(?: {0,3}> ?)+/,"")}function jr(r){return/^:::(?:\s+.*)?$/.test(r)}function Or(r,e,t){let n=1,o=!1;for(let i=e+1;i<t;i+=1){if(/^```/.test(r[i])){o=!o;continue}if(!o){if(Ot(r[i]))n+=1;else if(jr(r[i])&&(n-=1,!n))return i}}return-1}function Vr(r){return/^#[\da-f]{3,8}$/i.test(r)}function Gr(r,e="classic",t="light"){let n=r.palette!==void 0;if(n&&!pe.includes(r.palette))return null;for(let a of["fill","stroke","text"])if(r[a]!==void 0&&!Vr(r[a]))return null;let o=n?ae(e,t,r.palette):null,i=Object.fromEntries(["fill","stroke","text"].filter(a=>r[a]!==void 0).map(a=>[a,r[a]])),s=Fe(o||{},i);return Object.entries(s).filter(([,a])=>a!==void 0).map(([a,c])=>`--docdiagram-component-${a}:${c}`).join(";")}function Ft(r,e=!1){let t=String(r).trim();if(t.startsWith("//")||t.startsWith("\\"))return!1;if(!t||t.startsWith("#")||t.startsWith("/")||t.startsWith("./")||t.startsWith("../")||t.startsWith("?")||e&&/^data:image\/(?:gif|jpeg|png|webp);base64,/i.test(t))return!0;let n=t.match(/^([a-z][a-z\d+.-]*):/i);return!n||["http","https","mailto"].includes(n[1].toLowerCase())}function Ee(r){let e=[],t=String(r).replace(/`([^`]+)`/g,(n,o)=>{let i=`\0${e.length}\0`;return e.push(`<code>${w(o)}</code>`),i});return t=w(t),t=t.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,(n,o,i)=>{let s=i.replace(/&amp;/g,"&");return Ft(s,!0)?`<img src="${w(s)}" alt="${o}">`:`![${o}](${w(i)})`}),t=t.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+&quot;[^&]*&quot;)?\)/g,(n,o,i)=>{let s=i.replace(/&amp;/g,"&");return Ft(s)?`<a href="${w(s)}">${o}</a>`:`[${o}](${w(i)})`}),t=t.replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g,"<strong>$2</strong>").replace(/~~(?=\S)([\s\S]*?\S)~~/g,"<del>$1</del>").replace(/(?<!\*)\*(?=\S)([\s\S]*?\S)\*(?!\*)/g,"<em>$1</em>").replace(/(?<!_)_(?=\S)([\s\S]*?\S)_(?!_)/g,"<em>$1</em>"),t.replace(/\u0000(\d+)\u0000/g,(n,o)=>e[Number(o)])}function Vt(r,e={diagramIndex:0},t){let n=r.replace(/\r\n/g,`
`).split(`
`),o=t?.renderDiagram??((f,$)=>{throw new Error("renderDiagram callback is required for diagram blocks.")}),i=t?.documentColorScheme||"classic",s=t?.documentTheme||"light",a=t?.diagramReferenceRegistry||(()=>{let f=new Map,$=new Set,x=new Map,p=n.map(Hr);for(let E=0;E<p.length;E+=1){if(!/^```diagram\s*$/.test(p[E]))continue;let N=p.slice(E+1).findIndex(R=>/^```\s*$/.test(R));if(N===-1)break;let C=p.slice(E+1,E+N+1).join(`
`),M=cr(C);M&&(f.has(M)?$.add(M):f.set(M,{id:M,source:C})),E+=N+1}let F=!1;for(let E of p){if(/^```/.test(E)){F=!F;continue}if(!F){let N=sr(E);N&&x.set(N.id,(x.get(N.id)||0)+1)}}return{definitions:f,duplicateDefinitionIds:$,referenceCounts:x}})(),{definitions:c,duplicateDefinitionIds:l,referenceCounts:u}=a;function d(f){let $=n[f]||"";return!$.trim()||/^```/.test($)||/^(#{1,6})\s+/.test($)||/^ {0,3}&gt;|^ {0,3}>/.test($)||/^ {0,3}(?:[-*_]\s*){3,}$/.test($)||/^:::/.test($)||!!Ne($)||f+1<n.length&&!!ar(n[f+1])}function g(f,$){let x=Ne(n[f]),p=/^\d/.test(x[2]),F=[],E=f,N=p?Number.parseInt(x[2],10):null;for(;E<n.length;){let S=Ne(n[E]);if(!S||S[1].length!==$||/^\d/.test(S[2])!==p)break;let k={content:[S[3]],children:[]};for(E+=1;E<n.length;){let A=Ne(n[E]);if(A&&A[1].length>$){let D=g(E,A[1].length);k.children.push(D.html),E=D.index;continue}if(!n[E].trim()){E+=1;let D=E<n.length?Ne(n[E]):null;if(E>=n.length||!D||D[1].length<=$)break;continue}if(/^\s+/.test(n[E])&&!Ne(n[E])){k.content.push(n[E].trim()),E+=1;continue}break}F.push(k)}let C=p?"ol":"ul",M=p&&N!==1?` start="${N}"`:"",R=F.map(S=>{let k=!p&&S.content.length===1&&S.content[0].match(/^\[([ xX])\]\s+(.*)$/),A=k?`<input type="checkbox" disabled${k[1].toLowerCase()==="x"?" checked":""}> ${Ee(k[2])}`:Ee(S.content.join(" "));return`<li${k?' class="docdiagram-task-list-item"':""}>${A}${S.children.join("")}</li>`}).join("");return{html:`<${C}${M}>${R}</${C}>`,index:E}}function y(f,$){let x=Ot(n[f]),p=x?Or(n,f,$):-1;if(!x||p===-1)return null;let{name:F,attributes:E}=x,N={section:["title","palette","fill","stroke","text"],panel:["title","palette","fill","stroke","text"],callout:["kind","title","palette","fill","stroke","text"],grid:["columns"],stack:[]};if(Object.keys(E).some(k=>!N[F].includes(k)))return null;if(F==="grid"){let k=Xt[E.columns];if(!k)return null;let A=[],D=f+1;for(;D<p;){if(!n[D].trim()){D+=1;continue}let W=Ot(n[D]);if(!W||!["panel","callout","stack"].includes(W.name))return null;let U=y(D,p);if(!U)return null;A.push(`<div class="docdiagram-grid-item">${U.html}</div>`),D=U.next}return{html:`<div class="docdiagram-grid" style="--docdiagram-grid-columns:${k}">${A.join("")}</div>`,next:p+1}}if(F==="stack")return Object.keys(E).length?null:{html:`<div class="docdiagram-stack">${h(f+1,p)}</div>`,next:p+1};let C=Gr(E,i,s);if(C===null||F==="callout"&&E.kind!==void 0&&!_t.includes(E.kind))return null;let M=E.title?`<div class="docdiagram-component-title">${Ee(E.title)}</div>`:"",R=h(f+1,p),S=`docdiagram-component${F==="callout"?"":` docdiagram-${F}`}${C?" docdiagram-component-styled":""}`;if(F==="callout"){let k=E.kind||"info";return{html:`<aside class="${S} docdiagram-callout docdiagram-callout-${k}"${C?` style="${C}"`:""} aria-label="${w(E.title||k)} callout"><div class="docdiagram-callout-kind">${w(k)}</div>${M}${R}</aside>`,next:p+1}}return{html:`<section class="${S}"${C?` style="${C}"`:""}>${M}${R}</section>`,next:p+1}}function h(f=0,$=n.length){let x=[],p=f;for(;p<$;){let F=n[p];if(!F.trim()){p+=1;continue}if(/^:::/.test(F)){let S=sr(F);if(S){let A=c.get(S.id),D=u.get(S.id)||0;A?l.has(S.id)?x.push(`<section class="docdiagram-error"><strong>Diagram "${w(S.id)}" has multiple definitions.</strong></section>`):D>1?x.push(`<section class="docdiagram-error"><strong>Diagram "${w(S.id)}" is referenced more than once.</strong></section>`):(x.push(o(A.source,e.diagramIndex)),e.diagramIndex+=1):x.push(`<section class="docdiagram-error"><strong>Diagram "${w(S.id)}" could not be found.</strong></section>`),p+=1;continue}let k=y(p,$);k?(x.push(k.html),p=k.next):(x.push(`<pre class="docdiagram-literal-source"><code>${w(F)}</code></pre>`),p+=1);continue}let E=F.match(/^```([\w-]*)\s*$/);if(E){let S=n.slice(p+1,$).findIndex(D=>/^```\s*$/.test(D));if(S===-1){x.push('<section class="docdiagram-error"><strong>Unclosed code block.</strong></section>');break}let k=p+S+1,A=n.slice(p+1,k).join(`
`);if(E[1]==="diagram"){let D=cr(A);D&&l.has(D)?x.push(`<section class="docdiagram-error"><strong>Diagram "${w(D)}" has multiple definitions.</strong></section>`):(!D||!u.has(D))&&(x.push(o(A,e.diagramIndex)),e.diagramIndex+=1)}else{let D=E[1]?` class="language-${w(E[1])}"`:"";x.push(`<pre><code${D}>${w(A)}</code></pre>`)}p=k+1;continue}let N=F.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);if(N){x.push(`<h${N[1].length}>${Ee(N[2])}</h${N[1].length}>`),p+=1;continue}if(/^ {0,3}(?:[-*_]\s*){3,}$/.test(F)){x.push("<hr>"),p+=1;continue}if(/^ {0,3}>/.test(F)){let S=[];for(;p<$&&/^ {0,3}>/.test(n[p]);)S.push(n[p].replace(/^ {0,3}> ?/,"")),p+=1;x.push(`<blockquote>${Vt(S.join(`
`),e,{...t,diagramReferenceRegistry:a})}</blockquote>`);continue}let C=Ne(F);if(C){let S=g(p,C[1].length);x.push(S.html),p=S.index;continue}let M=p+1<$?ar(n[p+1]):null;if(M){let S=jt(F),k=[];for(p+=2;p<$&&n[p].includes("|")&&n[p].trim();)k.push(jt(n[p])),p+=1;let A=(D,W)=>W.map((U,ue)=>`<${D}${M[ue]?` style="text-align:${M[ue]}"`:""}>${Ee(U||"")}</${D}>`).join("");x.push(`<table><thead><tr>${A("th",S)}</tr></thead><tbody>${k.map(D=>`<tr>${A("td",D)}</tr>`).join("")}</tbody></table>`);continue}let R=[F.trim()];for(p+=1;p<$&&!d(p);)R.push(n[p].trim()),p+=1;x.push(`<p>${Ee(R.join(" "))}</p>`)}return x.join("")}return h()}function Gt(r,e,t){let n=e!=="none",o=e==="flowchart";return['<div class="docdiagram-diagram-toolbar" role="toolbar" aria-label="Diagram controls">',`<button type="button" class="docdiagram-icon-button docdiagram-zoom-in" data-diagram-index="${r}" aria-label="Zoom in" title="Zoom in">+</button>`,`<button type="button" class="docdiagram-icon-button docdiagram-zoom-out" data-diagram-index="${r}" aria-label="Zoom out" title="Zoom out">\u2212</button>`,`<button type="button" class="docdiagram-icon-button docdiagram-fit" data-diagram-index="${r}" aria-label="Zoom to fit" title="Zoom to fit">\u22A1</button>`,n?t.editingDiagramIndex===r?`<button type="button" class="docdiagram-icon-button docdiagram-done-editing" aria-label="Done editing" title="Done editing">\u2713</button><button type="button" class="docdiagram-icon-button docdiagram-cancel-editing" aria-label="Cancel editing and discard changes" title="Cancel editing and discard changes">\xD7</button>${o?`<button type="button" class="docdiagram-icon-button docdiagram-create-node" data-diagram-index="${r}" aria-label="New node" title="New node">+</button>`:""}`:t.editingDiagramIndex===null?'<button type="button" class="docdiagram-icon-button docdiagram-start-editing" aria-label="Edit diagram" title="Edit diagram">\u270E</button>':"":"","</div>"].join("")}function dr(r,e,t,n){let{selectedNode:o,selectedEdge:i,editingNode:s,editingEdge:a,connectionDrag:c,diagramZooms:l}=t,u=t.editingDiagramIndex===e,d=O(r),g=new Map(d.map(S=>[S.node.id,S])),y=16,h=[],f=[],x=ie[t.documentColorScheme]?.[t.documentTheme==="dark"?"dark":"light"],p=x?Object.entries(x).filter(([,S])=>S.gradient).map(([S,k])=>`<linearGradient id="docdiagram-${t.documentColorScheme}-${e}-${S}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${w(k.gradient||k.fill)}"/><stop offset="1" stop-color="${w(k.fill)}"/></linearGradient>`).join(""):"",F=r.edges.map((S,k)=>{let A=g.get(S.source),D=g.get(S.target);if(!A||!D)return"";let W=A.node,U=D.node,ue=fe(W,A.position.x,A.position.y,Number(W.size?.width)||190,Number(W.size?.height)||80),re=fe(U,D.position.x,D.position.y,Number(U.size?.width)||190,Number(U.size?.height)||80),Y=S.sourceAnchor||"right",j=S.targetAnchor||"left",z=ue.anchors[Y],K=re.anchors[j],oe=S.route||"orthogonal",B=De(z,K,Y,j,oe),ne=B.midpoint.x,me=B.midpoint.y-10,ge=Ie(r,S,t.documentTheme),Te=i?.diagramIndex===e&&i.edgeIndex===k,Nt=Te&&a?.diagramIndex===e&&a.edgeIndex===k,We=(Number(ge.strokeWidth)||2)+(Te?2:0),nt=220,it=72,Ue=S.label?ce(S.label):[],b=Ue.length*y,v=me-b/2+y*.72,P=Xe(S,"start"),T=Xe(S,"end"),I=`docdiagram-marker-${e}-${k}-start`,Z=`docdiagram-marker-${e}-${k}-end`;P!=="none"&&h.push(ot(I,P,"start",ge.stroke||"",We)),T!=="none"&&h.push(ot(Z,T,"end",ge.stroke||"",We)),Te&&u&&f.push(`<circle class="docdiagram-edge-endpoint" data-diagram-index="${e}" data-edge-index="${k}" data-endpoint="source" cx="${z.x}" cy="${z.y}" r="7"/>`,`<circle class="docdiagram-edge-endpoint" data-diagram-index="${e}" data-edge-index="${k}" data-endpoint="target" cx="${K.x}" cy="${K.y}" r="7"/>`);let H=[P!=="none"?` marker-start="url(#${I})"`:"",T!=="none"?` marker-end="url(#${Z})"`:""].join("");return[`<g class="docdiagram-edge-group${Te?" docdiagram-edge-selected":""}" data-diagram-index="${e}" data-edge-index="${k}">`,`<path class="docdiagram-edge-hit" d="${B.hitPath}" fill="none" stroke="transparent" stroke-width="16"/>`,`<path class="docdiagram-edge" d="${B.path}"${H} stroke="${w(ge.stroke||"")}" stroke-width="${We}"/>`,Nt?`<foreignObject class="docdiagram-inline-editor-host" x="${ne-nt/2}" y="${me-it/2}" width="${nt}" height="${it}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-edge" aria-label="Edit edge label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${w(S.label||"")}</textarea></foreignObject>`:Ue.length?ee(ne,v,Ue,y,"docdiagram-edge-label",ge.text||""):"","</g>"].join("")}).join(""),E=d.map(({node:S,position:k})=>{let A=k.x,D=k.y,W=Number(S.size?.width)||190,U=Number(S.size?.height)||80,ue=xe(r,S,t.documentTheme,t.documentColorScheme),re=S.palette,Y=re&&x?.[re]?.gradient?{...ue,fill:`url(#docdiagram-${t.documentColorScheme}-${e}-${re})`}:ue,j=o?.diagramIndex===e&&o.nodeId===S.id,z=j&&s?.diagramIndex===e&&s.nodeId===S.id,K=(Number(Y.strokeWidth)||2)+(j?2:0),oe=fe(S,A,D,W,U),B=Ve(oe.textBounds,S);return[`<g class="docdiagram-node${j?" docdiagram-node-selected":""}" data-diagram-index="${e}" data-node-id="${w(S.id)}">`,Ge(oe,Y,K),z?`<foreignObject class="docdiagram-inline-editor-host" x="${oe.textBounds.x}" y="${oe.textBounds.y}" width="${oe.textBounds.width}" height="${oe.textBounds.height}"><textarea class="docdiagram-inline-editor docdiagram-inline-editor-node" aria-label="Edit node label. Press Enter for a new line. Press Control or Command plus Enter to save. Press Escape to cancel.">${w(S.label)}</textarea></foreignObject>`:ee(B.centerX,B.labelStartY,B.labelLines,B.labelLineHeight,"docdiagram-node-label",Y.text||"",B.textAnchor),!z&&B.subtitleLines.length?ee(B.centerX,B.subtitleStartY,B.subtitleLines,B.subtitleLineHeight,"docdiagram-node-subtitle",Y.text||"",B.textAnchor):"",j&&u&&!z?[["top-left",A-7,D-7],["top-right",A+W-7,D-7],["bottom-left",A-7,D+U-7],["bottom-right",A+W-7,D+U-7]].map(([ne,me,ge])=>`<rect class="docdiagram-resize-handle" data-resize-corner="${ne}" x="${me}" y="${ge}" width="14" height="14" rx="3"/>`).join(""):"",j&&u&&!z?J.map(ne=>{let me=oe.anchors[ne];return`<circle class="docdiagram-connection-port" data-anchor="${ne}" cx="${me.x}" cy="${me.y}" r="7" aria-label="${ne} connection port"/>`}).join(""):"","</g>"].join("")}).join(""),N=Number(r.canvas.width)||1e3,C=Number(r.canvas.height)||560,M=t.diagramViewportHeights.get(e),R=M?` style="box-sizing: border-box; height: ${M}px"`:"";return[`<figure class="docdiagram" data-diagram-index="${e}" data-diagram-type="flowchart" data-editing="${u}"${R}>`,n(e,"flowchart",t),`<svg viewBox="0 0 ${N} ${C}" role="img" aria-label="Architecture diagram" data-diagram-index="${e}" style="width: ${l.get(e)||100}%">`,`<defs>${p}${h.join("")}</defs>`,E,F,c?.diagramIndex===e?`<path class="docdiagram-connection-preview${c.invalid?" docdiagram-connection-invalid":""}" d="${De(c.start,c.current,c.sourceAnchor,c.targetAnchor||c.sourceAnchor,"straight").path}"/>`:"",f.join(""),"</svg>","</figure>"].join("")}function lr(r,e,t,n){let o=ke(r,t.documentTheme),i=Number(r.canvas?.width)||1e3,s=Number(r.canvas?.height)||560,a=r.participants||[],c=r.messages||[],l=r.activations||[],u=r.notes||[],d=r.groups||[],g=90,y=90,h=28,f=Number(r.canvas?.participantSize?.width)||180,$=Number(r.canvas?.participantSize?.height)||42,x=Number(r.canvas?.participantSpacing)||220,p=16,F=74+Math.max(0,...a.filter(b=>b.kind==="actor").map(b=>ce(b.label||"").length-1))*p,E=48,N=18,C=56,M=t.diagramViewportHeights.get(e),R=M?` style="box-sizing: border-box; height: ${M}px"`:"",S=`docdiagram-sequence-arrow-${e}`,k=h+F+12,A=a[0],D=a[a.length-1],W=Number(A?.size?.width)||f,U=Number(D?.size?.width)||f,ue=a.length>1?W/2+x*(a.length-1)+U/2:f+g+y,re=Math.max(i,ue,g+y),Y=new Map;a.forEach((b,v)=>{Y.set(b.id,a.length===1?re/2:W/2+x*v)});let j=k+40,z=c.map((b,v)=>({...b,index:v,y:j+v*C})),K=u.map(b=>{let v=ce(b.label||""),P=Math.max(E,v.length*16+22,Number(b.size?.height)||0),I=((b.after?z[Number(b.after)-1]:null)?.y||k)+N,Z=Y.get(b.at||"")||re/2,H=Math.max(160,Number(b.size?.width)||0),he=Math.min(re-H/2-24,Math.max(H/2+24,Z));return{...b,lines:v,x:he-H/2,y:I,width:H,height:P}}),oe=d.map(b=>z[b.to-1]?.y+34||j),B=Math.max(k+140,K.length?K[K.length-1].y+K[K.length-1].height:0,z.length?z[z.length-1].y+44:j,...oe),ne=Math.max(s,B+56),me=ne-36,ge=l.map((b,v)=>({participantId:b.participant,depth:l.slice(0,v).filter(P=>P.participant===b.participant&&P.from<=b.from&&P.to>=b.from).length,startY:(z[b.from-1]?.y||j)-10,endY:(z[b.to-1]?.y||j)+18})),Te=a.map(b=>{let v=Y.get(b.id)||0,P=ce(b.label||""),T=Be(r,b,t.documentTheme,t.documentColorScheme),I=Number(b.size?.width)||f,Z=Number(b.size?.height)||$;if(b.kind==="actor"){let H=h+10,he=H+18,qe=he+18;return[`<g class="docdiagram-sequence-participant docdiagram-sequence-actor" data-diagram-index="${e}" data-participant-id="${w(b.id)}">`,`<circle cx="${v}" cy="${H}" r="8" fill="none" stroke="${w(T.stroke||"")}" stroke-width="${Number(T.strokeWidth)||2}"/>`,`<path d="M ${v} ${H+8} V ${qe} M ${v-14} ${he} H ${v+14} M ${v} ${qe} L ${v-12} ${qe+18} M ${v} ${qe} L ${v+12} ${qe+18}" fill="none" stroke="${w(T.stroke||"")}" stroke-width="${Number(T.strokeWidth)||2}" stroke-linecap="round" stroke-linejoin="round"/>`,ee(v,h+F-4-(P.length-1)*p,P,p,"docdiagram-node-label",T.text||""),"</g>"].join("")}return[`<g class="docdiagram-sequence-participant" data-diagram-index="${e}" data-participant-id="${w(b.id)}">`,`<rect x="${v-I/2}" y="${h}" width="${I}" height="${Z}" rx="12" fill="${w(T.fill||"")}" stroke="${w(T.stroke||"")}" stroke-width="${Number(T.strokeWidth)||2}"/>`,ee(v,h+Z/2+6-(P.length-1)*p/2,P,p,"docdiagram-node-label",T.text||""),"</g>"].join("")}).join(""),Nt=a.map(b=>{let v=Y.get(b.id)||0;return`<path class="docdiagram-sequence-lifeline" d="M ${v} ${k} L ${v} ${me}" fill="none" stroke="${w(o.edge.stroke)}" stroke-width="2" stroke-dasharray="8 6"/>`}).join(""),We=d.map(b=>{let v=(z[b.from-1]?.y||j)-24,P=(z[b.to-1]?.y||j)+30,T=Math.min(220,Math.max(110,String(b.label).length*8+28));return['<g class="docdiagram-sequence-group">',`<rect x="42" y="${v}" width="${re-84}" height="${P-v}" rx="12" fill="none" stroke="${w(o.edge.stroke)}" stroke-width="2" stroke-dasharray="10 6" opacity="0.8"/>`,`<rect x="54" y="${v-16}" width="${T}" height="24" rx="6" fill="${w(o.node.fill)}" stroke="${w(o.edge.stroke)}" stroke-width="1.5"/>`,`<text x="${54+T/2}" y="${v+1}" text-anchor="middle" class="docdiagram-edge-label" fill="${w(o.edge.text)}">${w(b.label||"")}</text>`,"</g>"].join("")}).join(""),nt=K.map((b,v)=>{let T=b.y+18,I=Be(r,b,t.documentTheme,t.documentColorScheme);return[`<g class="docdiagram-sequence-note" data-diagram-index="${e}" data-note-index="${v}">`,`<rect x="${b.x}" y="${b.y}" width="${b.width}" height="${b.height}" rx="10" fill="${w(I.fill||"")}" stroke="${w(I.stroke||"")}" stroke-width="${Number(I.strokeWidth)||2}"/>`,ee(b.x+b.width/2,T,b.lines,16,"docdiagram-node-subtitle",I.text||""),"</g>"].join("")}).join(""),it=ge.map(b=>{let v=Y.get(b.participantId)||0,P=b.depth*7,T=12,I=Math.max(20,b.endY-b.startY),Z=a.find(he=>he.id===b.participantId),H=Z?Be(r,Z,t.documentTheme,t.documentColorScheme):o.node;return`<rect class="docdiagram-sequence-activation" x="${v-T/2+P}" y="${b.startY}" width="${T}" height="${I}" rx="4" fill="${w(H.fill||"")}" stroke="${w(H.stroke||"")}" stroke-width="${Number(H.strokeWidth)||2}"/>`}).join(""),Ue=z.map(b=>{let v=Y.get(b.from)||0,P=Y.get(b.to)||0,T=b.style==="dashed",I=ce(b.label||""),Z=I.length*15,H=b.y-12-Z/2+11,he=` marker-end="url(#${S})"`;return b.from===b.to?[`<g class="docdiagram-sequence-message" data-diagram-index="${e}" data-message-index="${b.index}">`,`<path d="M ${v} ${b.y} L ${v+48} ${b.y} L ${v+48} ${b.y+28} L ${v} ${b.y+28}" fill="none" stroke="${w(o.edge.stroke)}" stroke-width="2"${he}${T?' stroke-dasharray="8 5"':""}/>`,ee(v+48/2,H,I,15,"docdiagram-edge-label",o.edge.text),"</g>"].join(""):[`<g class="docdiagram-sequence-message" data-diagram-index="${e}" data-message-index="${b.index}">`,`<path d="M ${v} ${b.y} L ${P} ${b.y}" fill="none" stroke="${w(o.edge.stroke)}" stroke-width="2"${he}${T?' stroke-dasharray="8 5"':""}/>`,ee((v+P)/2,H,I,15,"docdiagram-edge-label",o.edge.text),"</g>"].join("")}).join("");return[`<figure class="docdiagram" data-diagram-index="${e}" data-diagram-type="sequence" data-editing="${t.editingDiagramIndex===e}"${R}>`,n(e,"sequence",t),`<svg viewBox="0 0 ${re} ${ne}" role="img" aria-label="Sequence diagram" data-diagram-index="${e}" style="width: ${t.diagramZooms.get(e)||100}%">`,`<defs>${ot(S,"arrow","end",o.edge.stroke,2)}</defs>`,We,Te,Nt,it,nt,Ue,"</svg>","</figure>"].join("")}function ur(r,e,t){try{let n=Se(r,t.colourScheme);return t.onDiagram(e,n),n.type==="sequence"?lr(n,e,t.state,Gt):dr(n,e,t.state,Gt)}catch(n){let o=n instanceof Error?n.message:String(n);return`<section class="docdiagram-error"><strong>Diagram could not be rendered.</strong><br>${w(o)}</section>`}}function mr(){let r=document.createElement("style");r.textContent=`
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
      font-size: .75rem;
      font-weight: 700;
      line-height: 1.15;
      min-height: 1.2rem;
      padding: .25rem .4rem;
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
  `,document.head.append(r)}function gr(){return{diagramModels:[],editingDiagramIndex:null,selectedNode:null,selectedEdge:null,selectedSequenceElement:null,editingNode:null,editingEdge:null,connectionDrag:null,documentTheme:"light",documentThemeSetting:"auto",documentColorScheme:"classic",documentFormat:"centered",savedSource:"",editSessionDiagram:null,diagramZooms:new Map,diagramViewportHeights:new Map}}function Ae(r){r.selectedNode=null,r.selectedEdge=null,r.selectedSequenceElement=null,r.editingNode=null,r.editingEdge=null}function Ce(r,e){return r.editingDiagramIndex===e}function de(r,e){return r.target instanceof Element?r.target.closest(e):null}function te(r,e){let t=r.diagramModels[e];return t?.type==="flowchart"?t:null}function G(r){return Number(r)}var kt=class{constructor(e){this.host=e;this.editingShortcutsBound=!1}enableCanvasPanning(){for(let e of this.host.outputElement.querySelectorAll(".docdiagram svg"))e.addEventListener("pointerdown",t=>{t.target===e&&this.beginCanvasPan(e,t)})}enableSequenceSelection(){for(let e of this.host.outputElement.querySelectorAll('.docdiagram[data-diagram-type="sequence"] svg'))e.addEventListener("click",t=>{if(!Ce(this.host.state,G(e.dataset.diagramIndex)))return;let n=de(t,".docdiagram-sequence-participant"),o=de(t,".docdiagram-sequence-note"),i=de(t,".docdiagram-sequence-message");n?this.host.state.selectedSequenceElement={diagramIndex:G(n.getAttribute("data-diagram-index")||void 0),kind:"participant",id:n.getAttribute("data-participant-id")||""}:o?this.host.state.selectedSequenceElement={diagramIndex:G(o.getAttribute("data-diagram-index")||void 0),kind:"note",index:G(o.getAttribute("data-note-index")||void 0)}:i?this.host.state.selectedSequenceElement={diagramIndex:G(i.getAttribute("data-diagram-index")||void 0),kind:"message",index:G(i.getAttribute("data-message-index")||void 0)}:this.host.state.selectedSequenceElement=null,this.host.state.selectedNode=null,this.host.state.selectedEdge=null,this.host.renderDocument()})}enableEditing(){for(let e of this.host.outputElement.querySelectorAll(".docdiagram svg"))Ce(this.host.state,G(e.dataset.diagramIndex))&&(e.addEventListener("click",t=>this.handleDiagramClick(e,t)),e.addEventListener("pointerdown",t=>this.handleDiagramPointerDown(e,t)));for(let e of this.host.outputElement.querySelectorAll(".docdiagram-inline-editor"))this.wireInlineEditor(e);this.editingShortcutsBound||(this.editingShortcutsBound=!0,document.addEventListener("keydown",e=>{if(this.host.state.editingDiagramIndex===null)return;let t=document.activeElement;t instanceof Element&&t.matches("input, textarea, select, [contenteditable]")||((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="d"&&this.host.state.selectedNode?(e.preventDefault(),this.duplicateSelectedNode()):(e.key==="Delete"||e.key==="Backspace")&&(this.host.state.selectedNode||this.host.state.selectedEdge)&&(e.preventDefault(),this.deleteSelected()))},!0))}selectNode(e,t){this.host.state.selectedNode={diagramIndex:e,nodeId:t},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}selectEdge(e,t){this.host.state.selectedEdge={diagramIndex:e,edgeIndex:t},this.host.state.selectedNode=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}handleDiagramClick(e,t){if(de(t,".docdiagram-inline-editor"))return;let n=de(t,".docdiagram-node");if(n){this.selectNode(G(n.getAttribute("data-diagram-index")||void 0),n.getAttribute("data-node-id")||"");return}let o=de(t,".docdiagram-edge-group");if(o){let i=G(o.getAttribute("data-diagram-index")||void 0),s=G(o.getAttribute("data-edge-index")||void 0),a=this.host.state.selectedEdge?.diagramIndex===i&&this.host.state.selectedEdge.edgeIndex===s,c=this.host.state.editingEdge?.diagramIndex===i&&this.host.state.editingEdge.edgeIndex===s;a&&!c?(this.host.state.editingEdge={diagramIndex:i,edgeIndex:s},this.host.renderDocument()):this.selectEdge(i,s);return}(this.host.state.selectedNode||this.host.state.selectedEdge)&&this.clearSelection()}handleDiagramPointerDown(e,t){let n=de(t,".docdiagram-connection-port");if(n){let x=n.closest(".docdiagram-node"),p=G(x?.getAttribute("data-diagram-index")||e.dataset.diagramIndex),F=n.getAttribute("data-node-id")||x?.getAttribute("data-node-id")||"",E=te(this.host.state,p),N=E?V(E,F)?.node:null,C=n.getAttribute("data-anchor")||"";N&&this.beginConnectionDrag(e,t,{diagramIndex:p,sourceNodeId:F,sourceAnchor:C,start:this.getNodePortPoint(N,C),current:this.getNodePortPoint(N,C),invalid:!1});return}let o=de(t,".docdiagram-edge-endpoint");if(o){let x=G(o.getAttribute("data-diagram-index")||void 0),p=G(o.getAttribute("data-edge-index")||void 0),F=te(this.host.state,x),E=F?.edges[p],N=o.getAttribute("data-endpoint");if(!E||N!=="source"&&N!=="target")return;let C=N==="source"?E.source:E.target,M=N==="source"?E.sourceAnchor:E.targetAnchor,R=F?V(F,C)?.node:null;if(!R||!M)return;this.beginConnectionDrag(e,t,{diagramIndex:x,edgeIndex:p,endpoint:N,reconnect:!0,sourceNodeId:C,sourceAnchor:M,start:this.getNodePortPoint(R,M),current:this.getNodePortPoint(R,M),invalid:!1});return}let i=de(t,".docdiagram-resize-handle");if(i){let x=i.closest(".docdiagram-node"),p=i.getAttribute("data-resize-corner");x&&(p==="top-left"||p==="top-right"||p==="bottom-left"||p==="bottom-right")&&this.resizeNode(e,t,x,p);return}if(de(t,".docdiagram-inline-editor"))return;let s=de(t,".docdiagram-node");if(!s)return;let a=G(s.getAttribute("data-diagram-index")||void 0),c=s.getAttribute("data-node-id")||"",l=te(this.host.state,a),u=l?V(l,c)?.node:null;if(!l||!u)return;t.preventDefault();let d=this.svgPoint(e,t),g=_(l,u),y=se(l),h=!1;this.capturePointer(e,t);let f=x=>{let p=this.svgPoint(e,x),F=Q(g.x+p.x-d.x,y),E=Q(g.y+p.y-d.y,y);h=h||F!==g.x||E!==g.y,s.setAttribute("transform",`translate(${F-g.x} ${E-g.y})`);let N=V(l,c);u.position={...u.position,x:F-(N?.parent?_(l,N.parent).x:0),y:E-(N?.parent?_(l,N.parent).y:0)}},$=x=>{this.releasePointer(e,x),e.removeEventListener("pointermove",f),e.removeEventListener("pointerup",$),e.removeEventListener("pointercancel",$),h?(ct(l,c),He(l,u),this.host.state.selectedNode={diagramIndex:a,nodeId:c},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.persistDiagramModels(),this.host.renderDocument()):this.host.state.selectedNode?.diagramIndex===a&&this.host.state.selectedNode.nodeId===c?(this.host.state.editingNode={diagramIndex:a,nodeId:c},this.host.renderDocument()):this.selectNode(a,c)};e.addEventListener("pointermove",f),e.addEventListener("pointerup",$),e.addEventListener("pointercancel",$)}getSelectedNode(){let e=this.host.state.selectedNode,t=e?te(this.host.state,e.diagramIndex):null;return e&&t&&V(t,e.nodeId)?.node||null}getSelectedEdge(){let e=this.host.state.selectedEdge,t=e?te(this.host.state,e.diagramIndex):null;return e&&t?.edges[e.edgeIndex]||null}clearSelection(){this.host.state.selectedNode=null,this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.renderDocument()}deleteSelected(){let e=this.host.state.selectedNode,t=this.host.state.selectedEdge;if(e){let n=te(this.host.state,e.diagramIndex);if(!n)return;let o=n.edges.filter(i=>i.source===e.nodeId||i.target===e.nodeId);if(o.length&&!globalThis.confirm(`Delete this node and its ${o.length} attached connector${o.length===1?"":"s"}?`))return;ht(n,e.nodeId)}else if(t){let n=te(this.host.state,t.diagramIndex);if(!n)return;gt(n,t.edgeIndex)}else return;Ae(this.host.state),this.host.persistDiagramModels(),this.host.renderDocument()}duplicateSelectedNode(){let e=this.host.state.selectedNode;if(!e)return;let t=te(this.host.state,e.diagramIndex);if(!t)return;let n=lt(t,e.nodeId);n&&(this.host.state.selectedNode={diagramIndex:e.diagramIndex,nodeId:n.id},this.host.state.selectedEdge=null,this.host.persistDiagramModels(),this.host.renderDocument())}wireInlineEditor(e){let t=!1,n=()=>{if(!t){if(t=!0,e.classList.contains("docdiagram-inline-editor-edge")){let i=this.getSelectedEdge();i&&(Oe(i,e.value),this.host.persistDiagramModels()),this.host.state.editingEdge=null}else{let i=this.getSelectedNode();i&&(je(i,e.value),this.host.persistDiagramModels()),this.host.state.editingNode=null}this.host.renderDocument()}},o=()=>{t||(t=!0,e.classList.contains("docdiagram-inline-editor-edge")?this.host.state.editingEdge=null:this.host.state.editingNode=null,this.host.renderDocument())};e.addEventListener("pointerdown",i=>i.stopPropagation()),e.addEventListener("click",i=>i.stopPropagation()),e.addEventListener("keydown",i=>{i.key==="Enter"&&(i.metaKey||i.ctrlKey)?(i.preventDefault(),n()):i.key==="Escape"&&(i.preventDefault(),o())}),e.addEventListener("blur",n,{once:!0}),e.focus(),e.select()}resizeNode(e,t,n,o){t.preventDefault();let i=G(n.getAttribute("data-diagram-index")||void 0),s=n.getAttribute("data-node-id")||"",a=te(this.host.state,i),c=a?V(a,s)?.node:null;if(!a||!c)return;let l=this.svgPoint(e,t),u=Je(c),d=!1;this.capturePointer(e,t);let g=h=>{let f=this.svgPoint(e,h);bt(a,c,o,f.x-l.x,f.y-l.y,u);let $=Number(c.size?.width)||190,x=Number(c.size?.height)||80;d=d||$!==u.size.width||x!==u.size.height,this.updateNodeSizeMarkup(n,c,$,x)},y=h=>{this.releasePointer(e,h),e.removeEventListener("pointermove",g),e.removeEventListener("pointerup",y),e.removeEventListener("pointercancel",y),d&&(He(a,c),this.host.state.selectedNode={diagramIndex:i,nodeId:s},this.host.state.selectedEdge=null,this.host.state.editingNode=null,this.host.state.editingEdge=null,this.host.persistDiagramModels(),this.host.renderDocument())};e.addEventListener("pointermove",g),e.addEventListener("pointerup",y),e.addEventListener("pointercancel",y)}updateNodeSizeMarkup(e,t,n,o){let i=te(this.host.state,G(e.getAttribute("data-diagram-index")||void 0));if(!i)return;let{x:s,y:a}=_(i,t),c=e.querySelector(".docdiagram-node-body"),l=e.querySelector(".docdiagram-node-label"),u=e.querySelector(".docdiagram-node-subtitle"),d=e.querySelectorAll(".docdiagram-resize-handle");if(!c)return;let g=xe(i,t),y=fe(t,s,a,n,o),h=Ve(y.textBounds,t);for(let f of e.querySelectorAll(".docdiagram-node-detail"))f.remove();c.outerHTML=Ge(y,g,Number(g.strokeWidth)||2);for(let f of[l,u])if(f){f.setAttribute("x",String(h.centerX)),f.setAttribute("y",String(f===l?h.labelStartY:h.subtitleStartY)),f.setAttribute("text-anchor",h.textAnchor);for(let $ of f.querySelectorAll("tspan"))$.setAttribute("x",String(h.centerX))}for(let f of d){let $=f.getAttribute("data-resize-corner");f.setAttribute("x",String($?.endsWith("left")?s-7:s+n-7)),f.setAttribute("y",String($?.startsWith("top")?a-7:a+o-7))}}getNodePortPoint(e,t){let n=this.host.state.diagramModels.find(i=>i.type==="flowchart"&&V(i,e.id)?.node===e);if(!n)return{x:0,y:0};let o=_(n,e);return fe(e,o.x,o.y,o.width,o.height).anchors[t]}addConnectionTargetPorts(e,t){let n=te(this.host.state,t);if(n)for(let{node:o}of O(n))for(let i of J){let s=this.getNodePortPoint(o,i),a=document.createElementNS("http://www.w3.org/2000/svg","circle");a.setAttribute("class","docdiagram-connection-port docdiagram-connection-target-port"),a.dataset.nodeId=o.id,a.dataset.anchor=i,a.setAttribute("cx",String(s.x)),a.setAttribute("cy",String(s.y)),a.setAttribute("r","7"),e.append(a)}}beginConnectionDrag(e,t,n){t.preventDefault(),t.stopPropagation(),this.host.state.connectionDrag={...n,current:this.svgPoint(e,t),invalid:!1},this.addConnectionTargetPorts(e,n.diagramIndex);let o=document.createElementNS("http://www.w3.org/2000/svg","path");o.setAttribute("class","docdiagram-connection-preview"),e.append(o),this.capturePointer(e,t);let i=c=>{let u=document.elementFromPoint(c.clientX,c.clientY)?.closest(".docdiagram-connection-port");return u||[...e.querySelectorAll(".docdiagram-connection-port")].find(d=>{let g=d.getBoundingClientRect();return c.clientX>=g.left&&c.clientX<=g.right&&c.clientY>=g.top&&c.clientY<=g.bottom})||null},s=c=>{let l=this.host.state.connectionDrag;if(!l)return;let u=this.svgPoint(e,c),d=i(c);l.current=u,l.invalid=!d;let g=d?.getAttribute("data-anchor")||l.sourceAnchor;o.setAttribute("d",De(l.start,u,l.sourceAnchor,g,"straight").path),o.classList.toggle("docdiagram-connection-invalid",l.invalid)},a=c=>{this.releasePointer(e,c),e.removeEventListener("pointermove",s),e.removeEventListener("pointerup",a),e.removeEventListener("pointercancel",a);let l=i(c),u=this.host.state.connectionDrag;if(this.host.state.connectionDrag=null,l&&u){let d=te(this.host.state,u.diagramIndex),g=l.getAttribute("data-node-id")||l.closest(".docdiagram-node")?.getAttribute("data-node-id"),y=l.getAttribute("data-anchor")||"";if(d&&g){if(u.reconnect&&u.edgeIndex!==void 0&&u.endpoint){let h=d.edges[u.edgeIndex];h&&(mt(h,u.endpoint,g,y),this.host.state.selectedEdge={diagramIndex:u.diagramIndex,edgeIndex:u.edgeIndex},this.host.state.selectedNode=null)}else{let h=ut(d,u.sourceNodeId,u.sourceAnchor,g,y);this.host.state.selectedEdge={diagramIndex:u.diagramIndex,edgeIndex:d.edges.indexOf(h)},this.host.state.selectedNode=null}this.host.persistDiagramModels()}}this.host.renderDocument()};e.addEventListener("pointermove",s),e.addEventListener("pointerup",a),e.addEventListener("pointercancel",a)}beginCanvasPan(e,t){let n=e.closest(".docdiagram");if(!n)return;t.preventDefault();let o={clientX:t.clientX,clientY:t.clientY,scrollLeft:n.scrollLeft,scrollTop:n.scrollTop};n.classList.add("docdiagram-panning"),this.capturePointer(e,t);let i=a=>{n.scrollLeft=o.scrollLeft-(a.clientX-o.clientX),n.scrollTop=o.scrollTop-(a.clientY-o.clientY)},s=a=>{this.releasePointer(e,a),n.classList.remove("docdiagram-panning"),e.removeEventListener("pointermove",i),e.removeEventListener("pointerup",s),e.removeEventListener("pointercancel",s)};e.addEventListener("pointermove",i),e.addEventListener("pointerup",s),e.addEventListener("pointercancel",s)}svgPoint(e,t){let n=e.getBoundingClientRect(),o=e.viewBox.baseVal;return{x:(t.clientX-n.left)*o.width/n.width,y:(t.clientY-n.top)*o.height/n.height}}capturePointer(e,t){t.isTrusted&&e.setPointerCapture(t.pointerId)}releasePointer(e,t){t.isTrusted&&e.hasPointerCapture(t.pointerId)&&e.releasePointerCapture(t.pointerId)}};function hr(r,e,t,n){let o=ie[r]?.[e==="dark"?"dark":"light"];return[["Structure",pe.slice(0,5)],["Accent",pe.slice(5,8)],["Status",pe.slice(8)]].map(([i,s])=>`<fieldset class="docdiagram-palette-group"><legend>${i}</legend>${s.map(a=>{let c=o?.[a];return`<label class="docdiagram-palette-swatch"><input type="radio" name="${n}" value="${a}"${a===t?" checked":""}><span style="--docdiagram-swatch-fill:${c?.fill};--docdiagram-swatch-stroke:${c?.stroke};--docdiagram-swatch-text:${c?.text}">${c?.label||a}</span></label>`}).join("")}</fieldset>`).join("")}function pr(r,e,t="classic",n="light"){let o=se(r),i=xe(r,e,n,t),s=Number(e.size?.width)||190,a=Number(e.size?.height)||80,c=e.shape==="document"?{width:140,height:84}:{width:120,height:60},l=o?Math.ceil(c.width/o)*o:c.width,u=o?Math.ceil(c.height/o)*o:c.height,d=o||1,g=e.palette||"accent";return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${w(e.label)}</textarea></label>`,`<label class="docdiagram-field docdiagram-field-wide">Subtitle<textarea class="docdiagram-inspector-subtitle docdiagram-inspector-textarea" rows="2">${w(e.subtitle||"")}</textarea></label>`,`<div class="docdiagram-field docdiagram-field-wide"><span>Palette</span><div class="docdiagram-inspector-palette">${hr(t,n,g,"node-palette")}</div></div>`,`<label class="docdiagram-field">Shape<select class="docdiagram-inspector-shape">${Pe.map(y=>`<option value="${y}"${y===e.shape?" selected":""}>${y}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Fill<input type="color" class="docdiagram-inspector-fill" value="${w(i.fill||"")}"></label>`,`<label class="docdiagram-field">Border<input type="color" class="docdiagram-inspector-stroke" value="${w(i.stroke||"")}"></label>`,`<label class="docdiagram-field">Border width<input type="number" class="docdiagram-inspector-stroke-width" value="${Number(i.strokeWidth)||2}" min="1" step="1"></label>`,`<label class="docdiagram-field">Text<input type="color" class="docdiagram-inspector-text" value="${w(i.text||"")}"></label>`,`<label class="docdiagram-field">Vertical text<select class="docdiagram-inspector-text-v-align"><option value="top"${e.textVAlign==="top"?" selected":""}>Top</option><option value="center"${e.textVAlign!=="top"?" selected":""}>Center</option></select></label>`,`<label class="docdiagram-field">Horizontal text<select class="docdiagram-inspector-text-h-align"><option value="left"${e.textHAlign==="left"?" selected":""}>Left</option><option value="center"${e.textHAlign!=="left"&&e.textHAlign!=="right"?" selected":""}>Center</option><option value="right"${e.textHAlign==="right"?" selected":""}>Right</option></select></label>`,`<label class="docdiagram-field">Width<input type="number" class="docdiagram-inspector-width" value="${s}" min="${l}" step="${d}"></label>`,`<label class="docdiagram-field">Height<input type="number" class="docdiagram-inspector-height" value="${a}" min="${u}" step="${d}"></label>`].join("")}function Wt(r,e){let t=Ie(r,e),n=Number(t.strokeWidth)||2,o=e.route||"orthogonal",i=e.start||"none",s=e.end||"arrow";return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-inspector-label docdiagram-inspector-textarea" rows="2">${w(e.label||"")}</textarea></label>`,`<label class="docdiagram-field">Route<select class="docdiagram-inspector-route">${Le.map(a=>`<option value="${a}"${a===o?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Source side<select class="docdiagram-inspector-source-anchor">${J.map(a=>`<option value="${a}"${a===e.sourceAnchor?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Target side<select class="docdiagram-inspector-target-anchor">${J.map(a=>`<option value="${a}"${a===e.targetAnchor?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Start<select class="docdiagram-inspector-marker-start">${X.map(a=>`<option value="${a}"${a===i?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">End<select class="docdiagram-inspector-marker-end">${X.map(a=>`<option value="${a}"${a===s?" selected":""}>${a}</option>`).join("")}</select></label>`,`<label class="docdiagram-field">Stroke<input type="color" class="docdiagram-inspector-stroke" value="${w(t.stroke||"")}"></label>`,`<label class="docdiagram-field">Label colour<input type="color" class="docdiagram-inspector-text" value="${w(t.text||"")}"></label>`,`<label class="docdiagram-field">Stroke width<input type="number" class="docdiagram-inspector-stroke-width" value="${n}" min="1" step="1"></label>`].join("")}function fr(r,e,t,n="classic",o="light"){let i="from"in t?null:Be(r,t,o,n),s=e.kind!=="message",a=s?t:null;return[`<label class="docdiagram-field docdiagram-field-wide">Label<textarea class="docdiagram-sequence-inspector-label docdiagram-inspector-textarea" rows="2">${w(t.label||"")}</textarea></label>`,e.kind==="message"?`<label class="docdiagram-field">Style<select class="docdiagram-sequence-inspector-message-style"><option value="solid"${t.style!=="dashed"?" selected":""}>Solid</option><option value="dashed"${t.style==="dashed"?" selected":""}>Dashed</option></select></label>`:"",s?`<div class="docdiagram-field docdiagram-field-wide"><span>Palette</span><div class="docdiagram-sequence-inspector-palette">${hr(n,o,a?.palette||"accent","sequence-palette")}</div></div>`:"",s?`<label class="docdiagram-field">Fill<input type="color" class="docdiagram-sequence-inspector-fill" value="${w(i?.fill||"")}"></label><label class="docdiagram-field">Border<input type="color" class="docdiagram-sequence-inspector-stroke" value="${w(i?.stroke||"")}"></label><label class="docdiagram-field">Text<input type="color" class="docdiagram-sequence-inspector-text" value="${w(i?.text||"")}"></label><label class="docdiagram-field">Width<input type="number" min="1" class="docdiagram-sequence-inspector-width" value="${Number(a?.size?.width)||""}"></label><label class="docdiagram-field">Height<input type="number" min="1" class="docdiagram-sequence-inspector-height" value="${Number(a?.size?.height)||""}"></label>`:""].join("")}function Wr(r,e){return r.querySelector(e)}function q(r,e,t){Wr(r,e)?.addEventListener("change",n=>{t(n.currentTarget.value)})}function Me(r,e){e(),r.persistDiagramModels(),r.renderDocument()}function br(r,e,t,n){let o=i=>{let s=r.state.diagramModels[t];if(!s||s.type!=="flowchart")return;let a=V(s,n)?.node;a&&Me(r,()=>i(s,a))};q(e,".docdiagram-inspector-label",i=>o((s,a)=>je(a,i))),q(e,".docdiagram-inspector-subtitle",i=>o((s,a)=>ft(a,i)));for(let i of e.querySelectorAll(".docdiagram-inspector-palette input"))i.addEventListener("change",()=>o((s,a)=>Ze(a,i.value,r.state.documentColorScheme)));q(e,".docdiagram-inspector-shape",i=>o((s,a)=>pt(a,i))),q(e,".docdiagram-inspector-fill",i=>o((s,a)=>ve(a,"fill",i))),q(e,".docdiagram-inspector-stroke",i=>o((s,a)=>ve(a,"stroke",i))),q(e,".docdiagram-inspector-text",i=>o((s,a)=>ve(a,"text",i))),q(e,".docdiagram-inspector-text-v-align",i=>o((s,a)=>Ke(a,"textVAlign",i))),q(e,".docdiagram-inspector-text-h-align",i=>o((s,a)=>Ke(a,"textHAlign",i))),q(e,".docdiagram-inspector-stroke-width",i=>o((s,a)=>rt(a,i))),q(e,".docdiagram-inspector-width",i=>o((s,a)=>Qe(s,a,"width",i))),q(e,".docdiagram-inspector-height",i=>o((s,a)=>Qe(s,a,"height",i)))}function yr(r,e,t,n){let o=i=>{let s=r.state.diagramModels[t];if(!s||s.type!=="flowchart")return;let a=s.edges[n];a&&Me(r,()=>i(s,a))};q(e,".docdiagram-inspector-label",i=>o((s,a)=>Oe(a,i))),q(e,".docdiagram-inspector-route",i=>o((s,a)=>yt(a,i))),q(e,".docdiagram-inspector-source-anchor",i=>o((s,a)=>et(a,"source",i))),q(e,".docdiagram-inspector-target-anchor",i=>o((s,a)=>et(a,"target",i))),q(e,".docdiagram-inspector-marker-start",i=>o((s,a)=>xt(a,i))),q(e,".docdiagram-inspector-marker-end",i=>o((s,a)=>wt(a,i))),q(e,".docdiagram-inspector-stroke",i=>o((s,a)=>tt(a,"stroke",i))),q(e,".docdiagram-inspector-text",i=>o((s,a)=>tt(a,"text",i))),q(e,".docdiagram-inspector-stroke-width",i=>o((s,a)=>rt(a,i)))}function xr(r,e,t){let n=r.state.selectedSequenceElement;if(!n)return;if(q(e,".docdiagram-sequence-inspector-label",i=>Me(r,()=>{t.label=i.trim()||t.label})),n.kind==="message"){q(e,".docdiagram-sequence-inspector-message-style",i=>Me(r,()=>{t.style=i}));return}let o=t;for(let i of e.querySelectorAll(".docdiagram-sequence-inspector-palette input"))i.addEventListener("change",()=>Me(r,()=>Ze(o,i.value,r.state.documentColorScheme)));for(let[i,s]of[[".docdiagram-sequence-inspector-fill","fill"],[".docdiagram-sequence-inspector-stroke","stroke"],[".docdiagram-sequence-inspector-text","text"]])q(e,i,a=>Me(r,()=>ve(o,s,a)));for(let[i,s]of[[".docdiagram-sequence-inspector-width","width"],[".docdiagram-sequence-inspector-height","height"]])q(e,i,a=>Me(r,()=>{let c=Number(a);Number.isFinite(c)&&c>0&&(o.size={...o.size,[s]:c})}))}var vt=class{constructor(e){this.host=e;this.renderTimer=null;this.resizeObserver=null;this.openState=!1;this.draft="";this.error=""}get isOpen(){return this.openState}get hasUnsavedDraft(){return this.openState&&this.draft!==this.host.getSource()}get hasError(){return this.error.length>0}get draftSource(){return this.draft}setError(e){this.error=e,this.updateStatus()}clearError(){this.error=""}open(){globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=null,this.draft=this.host.getSource(),this.error="",this.openState=!0,this.host.stopDiagramEditing(),this.host.renderDocument();let e=()=>this.focus();globalThis.requestAnimationFrame?.(e)??e()}close(){this.flushRender(),!(this.error&&this.draft!==this.host.getSource()&&!globalThis.confirm("Discard the invalid source changes?"))&&(this.openState=!1,this.draft="",this.error="",this.renderTray(),document.querySelector(".docdiagram-menu-toggle")?.focus())}flushRender(){return this.renderTimer===null?!0:this.renderDraft()}syncSource(e){if(!this.openState)return;this.draft=e,this.error="";let t=document.querySelector(".docdiagram-source-editor");if(!t)return;let n=t.selectionStart,o=t.selectionEnd,i=t.scrollTop;t.value=e,t.setSelectionRange(Math.min(n,e.length),Math.min(o,e.length)),t.scrollTop=i,this.updateStatus()}reveal(e){let t=St(this.host.getSource(),e);if(!t||this.hasUnsavedDraft)return!1;this.openState||this.open();let n=()=>{let o=document.querySelector(".docdiagram-source-editor");o&&(o.focus(),o.setSelectionRange(t.start,t.end),$t(o,t))};return globalThis.requestAnimationFrame?.(n)??n(),!0}renderTray(){let e=document.querySelector(".docdiagram-source-tray");if(!this.openState){this.resizeObserver?.disconnect(),this.resizeObserver=null,e?.remove(),delete this.host.outputElement.dataset.sourceEditorOpen,this.host.outputElement.style.removeProperty("--docdiagram-source-tray-height");return}if(e){e.dataset.theme=this.host.getDocumentTheme(),this.host.outputElement.dataset.sourceEditorOpen="true",this.updateStatus();return}e=document.createElement("section"),e.className="docdiagram-source-tray",e.dataset.theme=this.host.getDocumentTheme(),e.setAttribute("aria-label","Document source editor"),e.innerHTML=['<header class="docdiagram-source-header">','<div><strong>Source</strong><span class="docdiagram-source-shortcut">Cmd/Ctrl+Shift+E to close</span></div>','<button type="button" class="docdiagram-source-close">Close source editor</button>',"</header>",'<label class="docdiagram-source-label">Canonical Markdown<textarea class="docdiagram-source-editor" spellcheck="false"></textarea></label>','<p class="docdiagram-source-status" aria-live="polite"></p>','<p class="docdiagram-source-error" role="alert"></p>'].join("");let t=e.querySelector(".docdiagram-source-editor"),n=e.querySelector(".docdiagram-source-close");if(!t||!n)return;t.value=this.draft,t.addEventListener("input",()=>{this.draft=t.value,this.error="",this.updateStatus(),this.scheduleRender()}),n.addEventListener("click",()=>this.close()),this.host.outputElement.after(e),this.host.outputElement.dataset.sourceEditorOpen="true";let o=()=>{this.host.outputElement.style.setProperty("--docdiagram-source-tray-height",`${e?.offsetHeight||0}px`)};this.resizeObserver?.disconnect(),globalThis.ResizeObserver&&(this.resizeObserver=new globalThis.ResizeObserver(o),this.resizeObserver.observe(e)),o(),this.updateStatus()}scheduleRender(){globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=globalThis.setTimeout(()=>{this.renderTimer=null,this.renderDraft()},250)}renderDraft(){return globalThis.clearTimeout(this.renderTimer??void 0),this.renderTimer=null,this.host.renderDocument(this.draft,{preserveOnError:!0})}updateStatus(){let e=document.querySelector(".docdiagram-source-tray");if(!e)return;let t=e.querySelector(".docdiagram-source-status"),n=e.querySelector(".docdiagram-source-error");!t||!n||(t.textContent=this.error?"Source has errors; showing the last valid render.":"Changes render automatically.",n.hidden=!this.error,n.textContent=this.error)}focus(){let e=document.querySelector(".docdiagram-source-editor");e&&(e.focus(),e.setSelectionRange(e.value.length,e.value.length))}};function Ur(r){return r instanceof Element&&r.matches("input, textarea, select, [contenteditable]")}var Dt=class{constructor(e,t){this.sourceElement=e;this.outputElement=t;this.state=gr();this.sourceEditor=t?new vt({outputElement:t,getSource:()=>this.getSource(),getDocumentTheme:()=>this.getDocumentTheme(),renderDocument:(n,o)=>this.renderDocument(n,o),stopDiagramEditing:()=>this.stopDiagramEditing(),closeDocumentMenu:()=>this.closeDocumentMenu()}):null,this.diagramEditor=t?new kt({outputElement:t,state:this.state,persistDiagramModels:()=>this.persistDiagramModels(),renderDocument:()=>this.renderDocument()}):null}getSource(){return this.sourceElement?.content.textContent||""}setSource(e){this.sourceElement?.content.replaceChildren(document.createTextNode(e))}getDocumentTheme(){return this.state.documentTheme}stopDiagramEditing(){this.state.editingDiagramIndex!==null&&(this.state.editingDiagramIndex=null,this.state.editSessionDiagram=null,Ae(this.state))}renderDiagram(e,t){return ur(e,t,{colourScheme:this.state.documentColorScheme,state:{...this.state,documentTheme:this.state.documentTheme,documentColorScheme:this.state.documentColorScheme},onDiagram:(n,o)=>{this.state.diagramModels[n]=o}})}renderMarkdown(e,t={diagramIndex:0}){return Vt(e,t,{renderDiagram:(n,o)=>this.renderDiagram(n,o),documentColorScheme:this.state.documentColorScheme,documentTheme:this.state.documentTheme})}persistDiagramModels(){let e=0,t=this.getSource().replace(/\r\n/g,`
`),n=new Map;for(let s of this.state.diagramModels){let a=s.id;typeof a=="string"&&n.set(a,[...n.get(a)||[],s])}let o=new Map([...n].flatMap(([s,a])=>a.length===1?[[s,a[0]]]:[])),i=t.replace(/^((?: {0,3}> ?)*)```diagram\s*\n([\s\S]*?)^((?: {0,3}> ?)*)```$/gm,(s,a,c,l)=>{let d=c.replace(/^(?: {0,3}> ?)+/gm,"").match(/^id:\s*(?:"([^"]+)"|([^\s#]+))\s*$/m)?.slice(1).find(Boolean),g=d&&o.get(d)||this.state.diagramModels[e];e+=1;let y=g?st(g):"",h=y?y.split(`
`).map(f=>`${a}${f}`).join(`
`):"";return`${a}\`\`\`diagram
${h?`${h}
`:""}${l}\`\`\``});this.setSource(i),this.sourceEditor?.syncSource(i)}renderDocument(e=this.getSource(),{preserveOnError:t=!1}={}){if(!this.outputElement)return!1;let n=new Map([...this.outputElement.querySelectorAll(".docdiagram")].map(d=>[Number(d.dataset.diagramIndex),{left:d.scrollLeft,top:d.scrollTop}]));for(let d of this.outputElement.querySelectorAll(".docdiagram"))this.state.diagramViewportHeights.set(Number(d.dataset.diagramIndex),d.offsetHeight);let o={x:globalThis.scrollX||0,y:globalThis.scrollY||0},i=[...this.state.diagramModels],s=this.state.documentTheme,a=this.state.documentThemeSetting,c=this.state.documentColorScheme;this.state.diagramModels.length=0;let l;try{let d=t?Rt(e):Et(e);this.state.documentTheme=d.resolvedTheme,this.state.documentThemeSetting=d.theme,this.state.documentColorScheme=d.colourScheme,l=this.renderMarkdown(d.content)}catch(d){let g=d instanceof Error?d.message:String(d);return this.state.diagramModels.length=0,this.state.diagramModels.push(...i),t?(this.state.documentTheme=s,this.state.documentThemeSetting=a,this.state.documentColorScheme=c,this.sourceEditor?.setError(g),!1):(this.applyPageTheme(this.state.documentTheme),this.removeToolbarChrome(),this.outputElement.innerHTML=`<section class="docdiagram-error"><strong>Document could not be rendered.</strong><br>${w(g)}</section>`,this.sourceEditor?.renderTray(),!1)}this.setSource(e),this.sourceEditor?.clearError(),this.outputElement.dataset.theme=this.state.documentTheme,this.outputElement.dataset.colourScheme=this.state.documentColorScheme,this.applyDocumentColourScheme(this.outputElement),this.outputElement.dataset.format=this.state.documentFormat,this.applyPageTheme(this.state.documentTheme),this.outputElement.innerHTML=l,this.removeToolbarChrome(),this.createToolbar(),this.sourceEditor?.renderTray();let u=document.querySelector(".docdiagram-source-tray");u&&this.applyDocumentColourScheme(u),this.diagramEditor?.enableCanvasPanning(),this.diagramEditor?.enableSequenceSelection(),this.state.editingDiagramIndex!==null&&this.diagramEditor?.enableEditing();for(let d of this.outputElement.querySelectorAll(".docdiagram")){let g=n.get(Number(d.dataset.diagramIndex));g&&(d.scrollLeft=g.left,d.scrollTop=g.top)}return globalThis.scrollTo?.(o.x,o.y),!0}closeDocumentMenu(){let e=document.querySelector(".docdiagram-menu"),t=document.querySelector(".docdiagram-menu-toggle");!e||!t||(e.hidden=!0,t.setAttribute("aria-expanded","false"))}downloadDocument(){if(this.sourceEditor?.flushRender(),this.sourceEditor?.hasError&&this.sourceEditor.hasUnsavedDraft&&!globalThis.confirm("Source has errors. Save the last valid version instead?"))return;let e=document.documentElement.cloneNode(!0),t=e.querySelector("#source"),n=e.querySelector(".docdiagram-toolbar"),o=e.querySelector(".docdiagram-source-tray"),i=e.querySelector("#rendered-document");t?.content.replaceChildren(document.createTextNode(this.getSource())),n?.remove(),o?.remove(),i?.replaceChildren(),i?.removeAttribute("data-editing-shortcuts-bound");let s=new Blob([`<!doctype html>
${e.outerHTML}`],{type:"text/html;charset=utf-8"}),a=document.createElement("a"),c=document.title.toLowerCase().replace(/[^\w]+/g,"-").replace(/^-|-$/g,"");a.href=URL.createObjectURL(s),a.download=`${c||"document"}-edited.html`,a.click(),URL.revokeObjectURL(a.href),this.state.savedSource=this.getSource()}boot(){!this.sourceElement||!this.outputElement||(mr(),this.state.savedSource=this.getSource(),globalThis.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener("change",()=>{this.state.documentThemeSetting==="auto"&&this.renderDocument()}),globalThis.addEventListener("beforeunload",e=>{this.getSource()===this.state.savedSource&&!this.sourceEditor?.hasUnsavedDraft||(e.preventDefault(),e.returnValue="")}),document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.shiftKey&&e.key.toLowerCase()==="e"&&(this.sourceEditor?.isOpen||!Ur(e.target))){e.preventDefault(),this.sourceEditor?.isOpen?this.sourceEditor.close():this.sourceEditor?.open();return}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="s"){e.preventDefault(),this.downloadDocument();return}e.key==="Escape"&&this.closeDocumentMenu()}),document.addEventListener("pointerdown",e=>{let t=document.activeElement;t instanceof HTMLTextAreaElement&&t.matches(".docdiagram-inline-editor")&&!(e.target instanceof Node&&t.contains(e.target))&&t.blur();let n=document.querySelector(".docdiagram-toolbar");n&&e.target instanceof Node&&!n.contains(e.target)&&this.closeDocumentMenu(),!(!(e.target instanceof Element)||e.target.closest(".docdiagram-toolbar, .docdiagram-node, .docdiagram-edge-group, .docdiagram-connection-port, .docdiagram-edge-endpoint, .docdiagram-inline-editor, .docdiagram-sequence-participant, .docdiagram-sequence-note, .docdiagram-sequence-message")||!this.state.selectedNode&&!this.state.selectedEdge&&!this.state.selectedSequenceElement)&&(Ae(this.state),this.renderDocument())}),this.outputElement.addEventListener("dblclick",e=>{e.target instanceof Element&&e.target.closest("button, input, textarea, select, [contenteditable]")||this.sourceEditor?.reveal(globalThis.getSelection?.()?.toString()||"")}),this.renderDocument())}getCoreApi(){return{diagramThemes:at,colourSchemes:ie,supportedDiagramTypes:Ye,nodeShapes:Pe,edgeAnchors:J,edgeRoutes:Le,edgeMarkerStyles:X,getTheme:e=>ke(e,this.state.documentTheme),getGridSize:se,expandCanvasForNode:He,flattenFlowchartNodes:O,getFlowchartNodeBounds:_,reparentFlowchartNode:ct,createUniqueNodeId:qt,getDefaultNodePosition:Pt,duplicateNode:lt,createNode:Lt,getResizeNodeOrigin:Je,createConnector:ut,reconnectConnector:mt,resizeFlowchartNode:bt,deleteConnector:gt,deleteNode:ht,getNodeEffectiveStyle:(e,t)=>xe(e,t,this.state.documentTheme,this.state.documentColorScheme),getEdgeEffectiveStyle:(e,t)=>Ie(e,t,this.state.documentTheme),getEdgeMarkerStyle:Xe,getEdgeMarkerDimensions:Bt,parseDiagram:e=>Se(e,this.state.documentColorScheme),parseDocumentFrontmatter:It,resolveDocument:Et,setFrontmatterTheme:Ht,isSafeUrl:Ft,renderInline:Ee,renderMarkdown:(e,t)=>this.renderMarkdown(e,t),renderDiagram:(e,t)=>this.renderDiagram(e,t),snapToGrid:Q,clampNodeSize:Re,serializeDiagram:st,setNodeLabel:je,setNodeShape:pt,setNodeSubtitle:ft,setNodeTextAlignment:Ke,setNodeStyleOverride:ve,setNodeColorPalette:Ze,setNodeSize:Qe,setEdgeLabel:Oe,setEdgeRoute:yt,setEdgeAnchor:et,setEdgeStyleOverride:tt,setStyleStrokeWidth:rt,setEdgeMarkerStart:xt,setEdgeMarkerEnd:wt,validateDocumentSource:Rt,findSourceTextRange:St,scrollSourceEditorToRange:$t,splitTextLines:ce,renderTextBlock:ee,computeNodeTextLayout:Ve,getNodeGeometry:fe,renderNodeBody:Ge,buildEdgePath:De,buildEdgeInspectorFields:Wt,clampZoom:zt}}createToolbar(){if(!this.outputElement)return;let e=document.createElement("section");e.className="docdiagram-toolbar",e.dataset.editing=String(this.state.editingDiagramIndex!==null),e.dataset.theme=this.state.documentTheme,e.dataset.colourScheme=this.state.documentColorScheme,e.dataset.format=this.state.documentFormat;let t=this.getSelectedNode(),n=t?null:this.getSelectedEdge(),o=!t&&!n?this.getSelectedSequenceElement():null,i=t&&this.state.selectedNode?this.state.diagramModels[this.state.selectedNode.diagramIndex]:n&&this.state.selectedEdge?this.state.diagramModels[this.state.selectedEdge.diagramIndex]:o&&this.state.selectedSequenceElement?this.state.diagramModels[this.state.selectedSequenceElement.diagramIndex]:null;e.innerHTML=['<button type="button" class="docdiagram-menu-toggle" aria-label="Document menu" aria-expanded="false" title="Document menu">\u2630</button>','<div class="docdiagram-menu" hidden>','<label class="docdiagram-theme-control">Theme<select class="docdiagram-theme-select">',`<option value="auto"${this.state.documentThemeSetting==="auto"?" selected":""}>Auto</option>`,`<option value="light"${this.state.documentThemeSetting==="light"?" selected":""}>Light</option>`,`<option value="dark"${this.state.documentThemeSetting==="dark"?" selected":""}>Dark</option>`,"</select></label>",`<label class="docdiagram-theme-control">Colour scheme<select class="docdiagram-colour-scheme-select">${Object.entries(ie).map(([c,l])=>`<option value="${c}"${this.state.documentColorScheme===c?" selected":""}>${l.label}</option>`).join("")}</select></label>`,'<label class="docdiagram-theme-control">Format<select class="docdiagram-format-select">',`<option value="centered"${this.state.documentFormat==="centered"?" selected":""}>Centered</option>`,`<option value="full-width"${this.state.documentFormat==="full-width"?" selected":""}>Full width</option>`,"</select></label>",'<button type="button" class="docdiagram-edit-source">Edit source</button>','<button type="button" class="docdiagram-save">Save As</button>','<button type="button" class="docdiagram-offline-save" disabled>Save for Offline (coming soon)</button>',"</div>",t&&i?.type==="flowchart"?`<div class="docdiagram-inspector" data-kind="node">${pr(i,t,this.state.documentColorScheme,this.state.documentTheme)}</div>`:n&&i?`<div class="docdiagram-inspector" data-kind="edge">${Wt(i,n)}</div>`:o&&i?`<div class="docdiagram-inspector" data-kind="sequence">${fr(i,this.state.selectedSequenceElement,o,this.state.documentColorScheme,this.state.documentTheme)}</div>`:""].join("");let s=e.querySelector(".docdiagram-menu-toggle"),a=e.querySelector(".docdiagram-menu");s?.addEventListener("click",()=>{if(!a)return;let c=a.hidden;a.hidden=!c,s.setAttribute("aria-expanded",String(c))}),e.querySelector(".docdiagram-save")?.addEventListener("click",()=>this.downloadDocument()),e.querySelector(".docdiagram-edit-source")?.addEventListener("click",()=>{this.closeDocumentMenu(),this.sourceEditor?.open()}),e.querySelector(".docdiagram-theme-select")?.addEventListener("change",c=>{this.setSource(Ht(this.getSource(),c.currentTarget.value)),this.renderDocument()}),e.querySelector(".docdiagram-colour-scheme-select")?.addEventListener("change",c=>{this.setSource(ir(this.getSource(),c.currentTarget.value)),this.renderDocument()}),e.querySelector(".docdiagram-format-select")?.addEventListener("change",c=>{this.state.documentFormat=c.currentTarget.value==="full-width"?"full-width":"centered",this.renderDocument()}),this.outputElement.before(e),this.applyDocumentColourScheme(e),t&&this.state.selectedNode?(br(this,e,this.state.selectedNode.diagramIndex,this.state.selectedNode.nodeId),this.positionInspector(this.state.selectedNode.diagramIndex)):n&&this.state.selectedEdge?(yr(this,e,this.state.selectedEdge.diagramIndex,this.state.selectedEdge.edgeIndex),this.positionInspector(this.state.selectedEdge.diagramIndex)):o&&this.state.selectedSequenceElement&&(xr(this,e,o),this.positionInspector(this.state.selectedSequenceElement.diagramIndex)),this.wireChromeControls()}getSelectedNode(){let e=this.state.selectedNode,t=e?this.state.diagramModels[e.diagramIndex]:null;return e&&t?.type==="flowchart"&&Ce(this.state,e.diagramIndex)&&V(t,e.nodeId)?.node||null}getSelectedEdge(){let e=this.state.selectedEdge,t=e?this.state.diagramModels[e.diagramIndex]:null;return e&&t?.type==="flowchart"&&Ce(this.state,e.diagramIndex)&&t.edges[e.edgeIndex]||null}getSelectedSequenceElement(){let e=this.state.selectedSequenceElement,t=e?this.state.diagramModels[e.diagramIndex]:null;return!e||t?.type!=="sequence"||!Ce(this.state,e.diagramIndex)?null:e.kind==="participant"?t.participants?.find(n=>n.id===e.id)||null:e.kind==="message"?t.messages?.[e.index]||null:t.notes?.[e.index]||null}applyDocumentColourScheme(e){let t=ae(this.state.documentColorScheme,this.state.documentTheme,"background"),n=ae(this.state.documentColorScheme,this.state.documentTheme,"pale"),o=ae(this.state.documentColorScheme,this.state.documentTheme,"neutral"),i=ae(this.state.documentColorScheme,this.state.documentTheme,"accent");!t||!n||!o||!i||(e.style.setProperty("--docdiagram-background",t.fill||""),e.style.setProperty("--docdiagram-border",o.stroke||""),e.style.setProperty("--docdiagram-control-background",n.fill||""),e.style.setProperty("--docdiagram-control-hover",o.fill||""),e.style.setProperty("--docdiagram-code-background",n.fill||""),e.style.setProperty("--docdiagram-text",t.text||""),e.style.setProperty("--docdiagram-muted",o.text||""),e.style.setProperty("--docdiagram-accent",i.stroke||""))}wireChromeControls(){if(this.outputElement){for(let e of this.outputElement.querySelectorAll(".docdiagram-zoom-in, .docdiagram-zoom-out"))e.addEventListener("click",()=>{let t=Number(e.dataset.diagramIndex),n=this.state.diagramZooms.get(t)||100,o=e.classList.contains("docdiagram-zoom-in")?25:-25;this.state.diagramZooms.set(t,zt(n+o)),this.renderDocument()});for(let e of this.outputElement.querySelectorAll(".docdiagram-fit"))e.addEventListener("click",()=>{this.state.diagramZooms.set(Number(e.dataset.diagramIndex),100),this.renderDocument()});for(let e of this.outputElement.querySelectorAll(".docdiagram-start-editing"))e.addEventListener("click",()=>{let t=Number(e.closest(".docdiagram")?.getAttribute("data-diagram-index")),n=this.state.diagramModels[t];n&&(this.state.editSessionDiagram=Se(st(n),this.state.documentColorScheme),this.state.editingDiagramIndex=t,Ae(this.state),this.renderDocument())});for(let e of this.outputElement.querySelectorAll(".docdiagram-done-editing"))e.addEventListener("click",()=>this.exitEditing(this.state.editingDiagramIndex,!1));for(let e of this.outputElement.querySelectorAll(".docdiagram-cancel-editing"))e.addEventListener("click",()=>this.exitEditing(this.state.editingDiagramIndex,!0));for(let e of this.outputElement.querySelectorAll(".docdiagram-create-node"))e.addEventListener("click",()=>this.createNewNode(Number(e.dataset.diagramIndex)))}}exitEditing(e,t){e!==null&&(t&&this.state.editSessionDiagram&&(this.state.diagramModels[e]=this.state.editSessionDiagram,this.persistDiagramModels()),this.state.editingDiagramIndex=null,this.state.editSessionDiagram=null,Ae(this.state),this.renderDocument())}createNewNode(e){let t=this.state.diagramModels[e];if(!t||t.type!=="flowchart")return;let n=Lt(t);this.state.selectedNode={diagramIndex:e,nodeId:n.id},this.state.selectedEdge=null,this.persistDiagramModels(),this.renderDocument()}positionInspector(e){if(!this.outputElement)return;let t=document.querySelector(".docdiagram-inspector"),n=this.outputElement.querySelector(`.docdiagram[data-diagram-index="${e}"]`);!t||!n||(t.style.top=`${Math.max(16,n.getBoundingClientRect().top)}px`)}applyPageTheme(e){document.documentElement.dataset.docdiagramTheme=e,document.body?.dataset&&(document.body.dataset.docdiagramTheme=e)}removeToolbarChrome(){if(this.outputElement)for(;this.outputElement.previousElementSibling?.classList.contains("docdiagram-toolbar");)this.outputElement.previousElementSibling.remove()}};var Yr=document.querySelector("#source"),_r=document.querySelector("#rendered-document"),wr=new Dt(Yr,_r),Xr=globalThis;Xr.DocDiagramCore=wr.getCoreApi();wr.boot();})();
