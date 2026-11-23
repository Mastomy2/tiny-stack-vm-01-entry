import{readdirSync as R,readFileSync as F,mkdirSync as M,writeFileSync as W}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
const G=[(a,b)=>a+b|0,(a,b)=>a-b|0,(a,b)=>Math.imul(a,b),(a,b)=>a/b|0,(a,b)=>b+1?a%b|0:0,(a,b)=>Math.floor((a>>>0)/(b>>>0))|0,(a,b)=>(a>>>0)%(b>>>0)|0,,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>a>>>(b&31)|0,,(a,b)=>a===b?1:0,(a,b)=>a<b?1:0,(a,b)=>(a>>>0)<(b>>>0)?1:0];
for(const d of R(I).sort()){
const p=F(I+'/'+d+'/program.bin'),n=F(I+'/'+d+'/input.bin'),S=new Int32Array(256),C=new Int32Array(64),m=new Int32Array(256),o=Buffer.alloc(65536);
let s=0,c=0,l=0,i=0,q=0,t=0,e=0;
for(;;){
if(t===1e6){e=10;break}
if(q<0||q>=p.length){e=9;break}
const x=p[q];
if(!(x<8||x>15&&x<35&&x!==31||x>47&&x<53||x===64||x===65||x>79&&x<84)){e=5;break}
const y=x===1?1:x===2?4:x>47&&x<52?2:0;
if(q+y>=p.length){e=9;break}
t++;
const z=q+1+y,b=x>15&&x<35&&x!==23&&x!==27;
const u=x===7?3:b||x===5||x===6||x===65?2:x===3||x===4||x===23||x===27||x===64||x>48&&x<51||x>79&&x<84&&x!==82?1:0;
const v=x===6||x===7?3:x===4||x===5?2:x<3||x===82||b||x===23||x===27||x===64?1:0;
if(s<u){e=2;break}
if(s-u+v>256){e=3;break}
q=z;
if(x===0){e=0;break}
if(x===1){S[s++]=p.readInt8(z-1);continue}
if(x===2){S[s++]=p.readInt32LE(z-4);continue}
if(x===3){s--;continue}
if(x===4){S[s]=S[s-1];s++;continue}
if(x===5){const w=S[s-1];S[s-1]=S[s-2];S[s-2]=w;continue}
if(x===6){S[s]=S[s-2];s++;continue}
if(x===7){const a=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=a;continue}
if(x===23){S[s-1]=-S[s-1]|0;continue}
if(x===27){S[s-1]=~S[s-1];continue}
if(b){
const B=S[s-1],A=S[s-2];
if(x>18&&x<23&&!B){e=4;break}
const r=G[x-16](A,B);s-=2;S[s++]=r;continue}
if(x>47&&x<51){
const g=p.readInt16LE(z-2);let k=1;
if(x!==48){const v=S[--s];k=x===49?v===0:v!==0}
if(k)q=z+g;continue}
if(x===51){if(c===64){e=7;break}C[c++]=z;q=p.readUInt16LE(z-2);continue}
if(x===52){if(!c){e=8;break}q=C[--c];continue}
if(x===64){const a=S[s-1];if(a<0||a>255){e=6;break}S[s-1]=m[a];continue}
if(x===65){const a=S[s-1],v=S[s-2];if(a<0||a>255){e=6;break}s-=2;m[a]=v;continue}
if(x===80){const w=''+S[s-1];if(l+w.length>65536){e=11;break}s--;o.set(Buffer.from(w),l);l+=w.length;continue}
if(x===81){if(l+1>65536){e=11;break}o[l++]=S[--s]&255;continue}
if(x===82){S[s++]=i<n.length?n[i++]:-1;continue}
e=S[--s]&255;break}
M(O+'/'+d,{recursive:!0});W(O+'/'+d+'/stdout.bin',o.subarray(0,l));W(O+'/'+d+'/exit.txt',e+'\n')}
