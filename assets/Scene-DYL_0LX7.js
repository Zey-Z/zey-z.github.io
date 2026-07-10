import{r as o,j as e}from"./motion-DcH5GCl6.js";import{u as F,C as h,V as N,a as V,b as T,O as X,L as W,S as Y,d as H,D as J,M,e as K}from"./three-AwMx1Qmh.js";import{w as I,c as w}from"./index-CufsWWNV.js";const Q=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.9999, 1.0);
  }
`,Z=`
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;
  uniform vec3 uTint;
  uniform vec2 uRes;

  // hash + value noise + fbm
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  // 3 octaves (was 4) and a single warp layer (was two) — this shader runs
  // per-pixel, per-frame, so trimming iterations here is the cheapest way to
  // buy back frame time without changing how the background looks.
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 3; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 p = vec2(uv.x * aspect, uv.y);

    float t = uTime * 0.03;
    // liquid displacement: warp the field with itself (single warp pass)
    vec2 q = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 - t * 0.7 + 4.0));
    float field = fbm(p * 1.4 + q * 1.5 - uScroll * 0.8);

    // dawn palette
    vec3 navy   = vec3(0.028, 0.04, 0.10);
    vec3 deep   = vec3(0.055, 0.07, 0.16);
    vec3 gold   = vec3(0.96, 0.72, 0.26);
    vec3 pink   = vec3(1.0, 0.49, 0.71);
    vec3 violet = vec3(0.55, 0.48, 1.0);

    vec3 col = mix(navy, deep, uv.y);
    // horizon glow rising with scroll
    float horizon = smoothstep(0.9, -0.25, uv.y + field * 0.35 - uScroll * 0.25);
    col = mix(col, mix(violet, pink, field) * 0.35, horizon * 0.55);
    // golden bloom pockets
    float pocket = smoothstep(0.62, 0.95, field);
    col += gold * pocket * 0.16;
    // chapter tint wash
    col = mix(col, col + uTint * 0.10, 0.9);
    // gentle vignette for readability
    float vig = smoothstep(1.25, 0.35, length(uv - 0.5));
    col *= mix(0.75, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;function $(){const s=o.useRef(null),{size:n}=F(),r=o.useMemo(()=>new h("#f5b942"),[]),t=o.useMemo(()=>new h,[]),l=o.useMemo(()=>({uTime:{value:0},uScroll:{value:0},uTint:{value:new V(.9,.7,.3)},uRes:{value:new N(1,1)}}),[]);return T((S,d)=>{if(!s.current)return;const a=s.current.uniforms;a.uTime.value+=d,a.uScroll.value+=(I.scroll-a.uScroll.value)*.04,a.uRes.value.set(n.width,n.height),t.set(w[I.section].coreColor),r.lerp(t,.02),a.uTint.value.set(r.r,r.g,r.b)}),e.jsxs("mesh",{frustumCulled:!1,children:[e.jsx("planeGeometry",{args:[2,2]}),e.jsx("shaderMaterial",{ref:s,vertexShader:Q,fragmentShader:Z,uniforms:l,depthWrite:!1,depthTest:!1})]})}const O=6;function ee(){const s=o.useMemo(()=>{const r=document.createElement("canvas");r.width=256,r.height=160;const t=r.getContext("2d");t.fillStyle="rgba(255,255,255,0.92)",t.beginPath(),t.roundRect(4,4,248,152,18),t.fill(),t.strokeStyle="rgba(20,25,50,0.25)",t.lineWidth=3,t.stroke(),t.fillStyle="#ff5c9d",t.font="bold 76px Georgia",t.fillText("?",34,108),t.strokeStyle="#0a0e1f",t.lineWidth=6,t.beginPath(),t.moveTo(120,80),t.lineTo(190,80),t.lineTo(176,64),t.moveTo(190,80),t.lineTo(176,96),t.stroke(),t.fillStyle="#0a0e1f",t.font="500 22px monospace",t.fillText("system",194,88);const l=new H(r);return l.anisotropy=4,l},[]),n=o.useRef(null);return T(({clock:r})=>{if(!n.current)return;const t=r.elapsedTime;n.current.position.y=-1.85+Math.sin(t*.8)*.08,n.current.rotation.z=Math.sin(t*.5)*.08-.12}),e.jsxs("mesh",{ref:n,position:[-.7,-1.85,.3],rotation:[0,.3,-.12],scale:.8,children:[e.jsx("planeGeometry",{args:[.9,.56]}),e.jsx("meshBasicMaterial",{map:s,transparent:!0,side:J})]})}function te(){const s=o.useRef(null);return T(({clock:n})=>{if(!s.current)return;const r=n.elapsedTime;s.current.position.y=1.55+Math.sin(r*.6+1)*.1,s.current.rotation.y=r*.15}),e.jsxs("group",{ref:s,position:[1.3,1.55,-.3],scale:.55,children:[e.jsxs("mesh",{rotation:[0,Math.PI/4,0],children:[e.jsx("boxGeometry",{args:[1.4,.06,1.4]}),e.jsx("meshStandardMaterial",{color:"#141a36",metalness:.4,roughness:.35})]}),e.jsxs("mesh",{position:[0,-.22,0],children:[e.jsx("cylinderGeometry",{args:[.34,.4,.38,6]}),e.jsx("meshStandardMaterial",{color:"#1b2244",metalness:.3,roughness:.5})]}),e.jsxs("mesh",{position:[0,.06,0],children:[e.jsx("sphereGeometry",{args:[.06,12,12]}),e.jsx("meshStandardMaterial",{color:"#f5b942",metalness:.8,roughness:.25,emissive:"#f5b942",emissiveIntensity:.4})]}),e.jsx(W,{points:[[0,.06,0],[.55,.02,.55],[.6,-.5,.6]],color:"#f5b942",lineWidth:1.5}),e.jsxs("mesh",{position:[.6,-.56,.6],children:[e.jsx("coneGeometry",{args:[.05,.16,8]}),e.jsx("meshStandardMaterial",{color:"#f5b942",metalness:.8,roughness:.3})]})]})}function se(){const s=o.useRef(null),n=o.useRef(null),r=o.useRef(null),t=o.useRef(null),l=o.useRef(null),S=o.useMemo(()=>new h("#f5b942"),[]),d=o.useMemo(()=>new h("#ffd57e"),[]),a=o.useMemo(()=>new h,[]),R=o.useMemo(()=>new h,[]),v=o.useMemo(()=>new X,[]),P=[2.6,2.92,2.78,3,2.84,2.72,2.9,2.66],z=[.25,.16,.08,.18,.06,.12,.2,.1],C=28;o.useMemo(()=>null,[]);const U=o.useMemo(()=>new Array(O).fill(0).map((f,i)=>({angle:i/O*Math.PI*2,radius:1.75+i%3*.22,speed:.4+i%3*.12,y:(i%2===0?1:-1)*(.2+i%3*.12)})),[]),D=o.useRef([]);return T(({clock:f,pointer:i},x)=>{const g=f.elapsedTime,E=Math.max(0,Math.min(w.length-1,I.chapter)),y=Math.floor(E),k=Math.min(w.length-1,y+1),p=E-y,j=w[y],b=w[k],L=1-Math.exp(-x*3.2),G=1-Math.exp(-x*2.8),_=M.lerp(j.speed,b.speed,p),B=M.lerp(j.spread,b.spread,p),q=M.lerp(j.bloom,b.bloom,p);if(s.current){const c=i.y*.12,u=i.x*.25+g*.04;s.current.rotation.x+=(c-s.current.rotation.x)*.04,s.current.rotation.y+=(u-s.current.rotation.y)*.03;const m=M.lerp(P[y],P[k],p),A=M.lerp(z[y],z[k],p);s.current.position.x+=(m-s.current.position.x)*G,s.current.position.y+=(A-s.current.position.y)*G}if(r.current&&(a.set(j.coreColor),R.set(b.coreColor),a.lerp(R,p),S.lerp(a,L),r.current.color.copy(S),r.current.emissive.copy(S),r.current.emissiveIntensity=.1*q),t.current&&(a.set(j.orbitColor),R.set(b.orbitColor),a.lerp(R,p),d.lerp(a,L),t.current.color.copy(d),t.current.emissive.copy(d)),n.current){n.current.rotation.y+=x*_;const c=n.current.scale.x+(B-n.current.scale.x)*G;n.current.scale.setScalar(c)}if(U.forEach((c,u)=>{const m=D.current[u];m&&(m.position.y=c.y+Math.sin(g*c.speed*2+u)*.1,m.rotation.x=g*.6+u,m.rotation.z=g*.4)}),l.current){for(let c=0;c<C;c++){const u=c/C*Math.PI*2+g*.05;v.position.set(Math.cos(u)*2.6,-1.15,Math.sin(u)*2.6),v.rotation.set(0,-u,0),v.scale.setScalar(1),v.updateMatrix(),l.current.setMatrixAt(c,v.matrix)}l.current.instanceMatrix.needsUpdate=!0}}),e.jsxs("group",{ref:s,position:[2.6,.25,0],children:[e.jsxs("mesh",{children:[e.jsx("icosahedronGeometry",{args:[.88,1]}),e.jsx("meshPhysicalMaterial",{ref:r,color:"#f5b942",metalness:0,roughness:.22,iridescence:.9,iridescenceIOR:1.3,clearcoat:1,clearcoatRoughness:.15,emissive:"#f5b942",emissiveIntensity:.1,transparent:!0,opacity:.72})]}),e.jsx("pointLight",{intensity:6,distance:6,color:"#ffd57e"}),e.jsx("group",{ref:n,children:U.map((f,i)=>e.jsxs("group",{rotation:[0,f.angle,0],children:[e.jsxs("mesh",{ref:x=>{D.current[i]=x},position:[f.radius,f.y,0],children:[e.jsx("octahedronGeometry",{args:[.14,0]}),e.jsx("meshStandardMaterial",{ref:i===0?t:void 0,color:"#ffd57e",metalness:.85,roughness:.2,emissive:"#ffd57e",emissiveIntensity:.5})]}),e.jsx(W,{points:[[0,0,0],[f.radius,f.y,0]],color:"#ffffff",transparent:!0,opacity:.08,lineWidth:1})]},i))}),e.jsxs("instancedMesh",{ref:l,args:[void 0,void 0,C],children:[e.jsx("boxGeometry",{args:[.02,.02,.3]}),e.jsx("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.28})]}),e.jsx(te,{}),e.jsx(ee,{}),e.jsx(Y,{count:40,scale:7,size:1.6,speed:.25,opacity:.5,color:"#ffd57e"})]})}function ae({lite:s}){return e.jsx("div",{className:"stage","aria-hidden":"true",children:e.jsxs(K,{dpr:s?[1,1.25]:[1,1.5],camera:{position:[0,0,7],fov:42},gl:{antialias:!s,alpha:!1,powerPreference:"high-performance"},frameloop:"always",children:[e.jsx("color",{attach:"background",args:["#0a0e1f"]}),e.jsxs(o.Suspense,{fallback:null,children:[e.jsx($,{}),!s&&e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.5}),e.jsx("directionalLight",{position:[4,6,3],intensity:1.4,color:"#ffe4b0"}),e.jsx("directionalLight",{position:[-5,-2,4],intensity:.5,color:"#8b7bff"}),e.jsx(se,{})]})]})]})})}export{ae as default};
