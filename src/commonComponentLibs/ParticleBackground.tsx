import React from "react";
import {useCurrentFrame} from "remotion";

export type ParticleBackgroundVariant = "black" | "emerald" | "darker-wine";

type Props = {
  variant: ParticleBackgroundVariant;
  left?: number; top?: number; width?: number; height?: number;
  count?: number; frameOffset?: number;
};

const PRESETS = {
  black: {background:"radial-gradient(circle at 50% 50%, #2b303c 0%, #0d0f13 40%, #000 100%)",particleColor:"#ffaa00",haze:["rgba(255,170,0,.06)","rgba(255,212,128,.04)"]},
  emerald: {background:"radial-gradient(circle at 50% 50%, #38a149 0%, #124d20 38%, #031c15 100%)",particleColor:"#ffbf69",haze:["rgba(56,161,73,.18)","rgba(255,191,105,.08)"]},
  "darker-wine": {background:"radial-gradient(circle at 50% 50%, #800f2f 0%, #3d0515 42%, #0e0004 100%)",particleColor:"#ffd166",haze:["rgba(128,15,47,.22)","rgba(255,209,102,.08)"]}
} as const;

const hash=(value:number)=>{const x=Math.sin(value*127.1+311.7)*43758.5453123;return x-Math.floor(x)};
const mod=(value:number,divisor:number)=>((value%divisor)+divisor)%divisor;

export const ParticleMovingBackground:React.FC<Props>=({variant,left=0,top=0,width=1920,height=1080,count=35,frameOffset=0})=>{
 const frame=useCurrentFrame()+frameOffset; const preset=PRESETS[variant];
 return <div style={{position:"absolute",left,top,width,height,overflow:"hidden",background:preset.background}}>
  {preset.haze.map((color,index)=><div key={index} style={{position:"absolute",left:`${30+index*30+Math.sin(frame/(180+index*40))*5}%`,top:`${25+index*35+Math.cos(frame/(200+index*30))*5}%`,width:width*.5,height:height*.5,translate:"-50% -50%",borderRadius:"50%",background:color,filter:`blur(${Math.min(width,height)*.12}px)`}}/>)}
  {Array.from({length:count},(_,index)=>{const a=hash(index+1),b=hash(index+101),c=hash(index+211),d=hash(index+307);const lifetime=250+Math.floor(d*200),age=mod(frame+Math.floor(b*lifetime),lifetime),life=age/lifetime;const angle=c*Math.PI*2,travel=age*(.15+d*.35),margin=50;const x=mod(a*width+Math.cos(angle)*travel+margin,width+margin*2)-margin;const y=mod(b*height+Math.sin(angle)*travel+margin,height+margin*2)-margin;const size=c>.8?5.5+a*3:2+a*2;const opacity=Math.pow(Math.sin(Math.PI*life),.8)*(.8+Math.sin(frame/(25+a*15)+index)*.2)*(.6+a*.4);return <div key={index} style={{position:"absolute",left:x,top:y,width:size,height:size,borderRadius:"50%",background:"#fff",opacity,boxShadow:`0 0 ${4+size*2}px ${preset.particleColor}, 0 0 ${12+size*4}px ${preset.particleColor}`}}/>;})}
 </div>;
};
export const BlackParticleMovingBackground:React.FC<Omit<Props,"variant">>=p=><ParticleMovingBackground {...p} variant="black"/>;
export const EmeraldParticleMovingBackground:React.FC<Omit<Props,"variant">>=p=><ParticleMovingBackground {...p} variant="emerald"/>;
export const DarkerWineParticleMovingBackground:React.FC<Omit<Props,"variant">>=p=><ParticleMovingBackground {...p} variant="darker-wine"/>;