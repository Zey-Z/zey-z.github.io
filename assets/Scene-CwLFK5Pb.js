import{r,j as e}from"./motion-DcH5GCl6.js";import{u as k,C as x,V as G,a as I,b as j,O as P,L as T,S as z,d as E,D as L,e as U}from"./three-CHeUyYmw.js";import{w as y,c as C}from"./index-BD1Vjemh.js";const D=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.9999, 1.0);
  }
`,O=`
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
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 p = vec2(uv.x * aspect, uv.y);

    float t = uTime * 0.03;
    // liquid displacement: warp the field with itself
    vec2 q = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 - t * 0.7 + 4.0));
    vec2 r = vec2(fbm(p * 1.8 + q * 1.3 + t * 0.5), fbm(p * 1.8 + q * 1.1 - t * 0.4 + 8.0));
    float field = fbm(p * 1.4 + r * 1.5 - uScroll * 0.8);

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
`;function W(){const s=r.useRef(null),{size:n}=k(),o=r.useMemo(()=>new x("#f5b942"),[]),t=r.useMemo(()=>new x,[]),l=r.useMemo(()=>({uTime:{value:0},uScroll:{value:0},uTint:{value:new I(.9,.7,.3)},uRes:{value:new G(1,1)}}),[]);return j((g,h)=>{if(!s.current)return;const c=s.current.uniforms;c.uTime.value+=h,c.uScroll.value+=(y.scroll-c.uScroll.value)*.04,c.uRes.value.set(n.width,n.height),t.set(C[y.section].coreColor),o.lerp(t,.02),c.uTint.value.set(o.r,o.g,o.b)}),e.jsxs("mesh",{frustumCulled:!1,children:[e.jsx("planeGeometry",{args:[2,2]}),e.jsx("shaderMaterial",{ref:s,vertexShader:D,fragmentShader:O,uniforms:l,depthWrite:!1,depthTest:!1})]})}const w=6;function _(){const s=r.useMemo(()=>{const o=document.createElement("canvas");o.width=256,o.height=160;const t=o.getContext("2d");t.fillStyle="rgba(255,255,255,0.92)",t.beginPath(),t.roundRect(4,4,248,152,18),t.fill(),t.strokeStyle="rgba(20,25,50,0.25)",t.lineWidth=3,t.stroke(),t.fillStyle="#ff5c9d",t.font="bold 84px Georgia",t.fillText("D",36,112),t.strokeStyle="#0a0e1f",t.lineWidth=6,t.beginPath(),t.moveTo(120,80),t.lineTo(190,80),t.lineTo(176,64),t.moveTo(190,80),t.lineTo(176,96),t.stroke(),t.fillStyle="#0a0e1f",t.font="500 26px monospace",t.fillText("sys",198,90);const l=new E(o);return l.anisotropy=4,l},[]),n=r.useRef(null);return j(({clock:o})=>{if(!n.current)return;const t=o.elapsedTime;n.current.position.y=-1.85+Math.sin(t*.8)*.08,n.current.rotation.z=Math.sin(t*.5)*.08-.12}),e.jsxs("mesh",{ref:n,position:[-.7,-1.85,.3],rotation:[0,.3,-.12],scale:.8,children:[e.jsx("planeGeometry",{args:[.9,.56]}),e.jsx("meshBasicMaterial",{map:s,transparent:!0,side:L})]})}function q(){const s=r.useRef(null);return j(({clock:n})=>{if(!s.current)return;const o=n.elapsedTime;s.current.position.y=1.55+Math.sin(o*.6+1)*.1,s.current.rotation.y=o*.15}),e.jsxs("group",{ref:s,position:[1.3,1.55,-.3],scale:.55,children:[e.jsxs("mesh",{rotation:[0,Math.PI/4,0],children:[e.jsx("boxGeometry",{args:[1.4,.06,1.4]}),e.jsx("meshStandardMaterial",{color:"#141a36",metalness:.4,roughness:.35})]}),e.jsxs("mesh",{position:[0,-.22,0],children:[e.jsx("cylinderGeometry",{args:[.34,.4,.38,6]}),e.jsx("meshStandardMaterial",{color:"#1b2244",metalness:.3,roughness:.5})]}),e.jsxs("mesh",{position:[0,.06,0],children:[e.jsx("sphereGeometry",{args:[.06,12,12]}),e.jsx("meshStandardMaterial",{color:"#f5b942",metalness:.8,roughness:.25,emissive:"#f5b942",emissiveIntensity:.4})]}),e.jsx(T,{points:[[0,.06,0],[.55,.02,.55],[.6,-.5,.6]],color:"#f5b942",lineWidth:1.5}),e.jsxs("mesh",{position:[.6,-.56,.6],children:[e.jsx("coneGeometry",{args:[.05,.16,8]}),e.jsx("meshStandardMaterial",{color:"#f5b942",metalness:.8,roughness:.3})]})]})}function B(){const s=r.useRef(null),n=r.useRef(null),o=r.useRef(null),t=r.useRef(null),l=r.useRef(null),g=r.useMemo(()=>new x("#f5b942"),[]),h=r.useMemo(()=>new x("#ffd57e"),[]),c=r.useMemo(()=>new x,[]),p=r.useMemo(()=>new P,[]),b=28;r.useMemo(()=>null,[]);const S=r.useMemo(()=>new Array(w).fill(0).map((f,i)=>({angle:i/w*Math.PI*2,radius:1.75+i%3*.22,speed:.4+i%3*.12,y:(i%2===0?1:-1)*(.2+i%3*.12)})),[]),R=r.useRef([]);return j(({clock:f,pointer:i},M)=>{const d=f.elapsedTime,v=C[y.section];if(s.current){const a=i.y*.12,u=i.x*.25+d*.04;s.current.rotation.x+=(a-s.current.rotation.x)*.04,s.current.rotation.y+=(u-s.current.rotation.y)*.03;const m=y.section===0?2.6:3;s.current.position.x+=(m-s.current.position.x)*.02}if(o.current&&(c.set(v.coreColor),g.lerp(c,.025),o.current.color.copy(g),o.current.emissive.copy(g),o.current.emissiveIntensity=.1*v.bloom),t.current&&(c.set(v.orbitColor),h.lerp(c,.025),t.current.color.copy(h),t.current.emissive.copy(h)),n.current){n.current.rotation.y+=M*v.speed;const a=n.current.scale.x+(v.spread-n.current.scale.x)*.03;n.current.scale.setScalar(a)}if(S.forEach((a,u)=>{const m=R.current[u];m&&(m.position.y=a.y+Math.sin(d*a.speed*2+u)*.1,m.rotation.x=d*.6+u,m.rotation.z=d*.4)}),l.current){for(let a=0;a<b;a++){const u=a/b*Math.PI*2+d*.05;p.position.set(Math.cos(u)*2.6,-1.15,Math.sin(u)*2.6),p.rotation.set(0,-u,0),p.scale.setScalar(1),p.updateMatrix(),l.current.setMatrixAt(a,p.matrix)}l.current.instanceMatrix.needsUpdate=!0}}),e.jsxs("group",{ref:s,position:[2.6,.25,0],children:[e.jsxs("mesh",{children:[e.jsx("icosahedronGeometry",{args:[.88,1]}),e.jsx("meshPhysicalMaterial",{ref:o,color:"#f5b942",metalness:0,roughness:.18,transmission:.92,thickness:1.6,ior:1.4,iridescence:.9,iridescenceIOR:1.3,clearcoat:1,clearcoatRoughness:.15,emissive:"#f5b942",emissiveIntensity:.1,transparent:!0,opacity:.92})]}),e.jsx("pointLight",{intensity:6,distance:6,color:"#ffd57e"}),e.jsx("group",{ref:n,children:S.map((f,i)=>e.jsxs("group",{rotation:[0,f.angle,0],children:[e.jsxs("mesh",{ref:M=>{R.current[i]=M},position:[f.radius,f.y,0],children:[e.jsx("octahedronGeometry",{args:[.14,0]}),e.jsx("meshStandardMaterial",{ref:i===0?t:void 0,color:"#ffd57e",metalness:.85,roughness:.2,emissive:"#ffd57e",emissiveIntensity:.5})]}),e.jsx(T,{points:[[0,0,0],[f.radius,f.y,0]],color:"#ffffff",transparent:!0,opacity:.08,lineWidth:1})]},i))}),e.jsxs("instancedMesh",{ref:l,args:[void 0,void 0,b],children:[e.jsx("boxGeometry",{args:[.02,.02,.3]}),e.jsx("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:.28})]}),e.jsx(q,{}),e.jsx(_,{}),e.jsx(z,{count:70,scale:7,size:1.6,speed:.25,opacity:.5,color:"#ffd57e"})]})}function A({lite:s}){return e.jsx("div",{className:"stage","aria-hidden":"true",children:e.jsxs(U,{dpr:s?[1,1.25]:[1,1.75],camera:{position:[0,0,7],fov:42},gl:{antialias:!s,alpha:!1,powerPreference:"high-performance"},frameloop:"always",children:[e.jsx("color",{attach:"background",args:["#0a0e1f"]}),e.jsxs(r.Suspense,{fallback:null,children:[e.jsx(W,{}),!s&&e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.5}),e.jsx("directionalLight",{position:[4,6,3],intensity:1.4,color:"#ffe4b0"}),e.jsx("directionalLight",{position:[-5,-2,4],intensity:.5,color:"#8b7bff"}),e.jsx(B,{})]})]})]})})}export{A as default};
