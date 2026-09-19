import {Easing,interpolate} from "remotion";

export const easeOut=(frame:number,from:number,to:number,start:number,duration:number)=>
  interpolate(frame,[start,start+duration],[from,to],{
    extrapolateLeft:"clamp",
    extrapolateRight:"clamp",
    easing:Easing.out(Easing.cubic)
  });

export const springScale=(frame:number,start:number,duration:number,peak=1.06)=>{
  if(frame<start)return 0;
  const t=Math.min(1,(frame-start)/duration);
  return Math.min(1.08,Math.max(0,1+(peak-1)*Math.exp(-7*t)*Math.cos(t*Math.PI*2.2)));
};