import React from "react";
import {AbsoluteFill,Audio,Img,interpolate,staticFile,useCurrentFrame} from "remotion";
import {ParticleMovingBackground} from "../../../commonComponentLibs/ParticleBackground";
import {springScale} from "../../../commonComponentLibs/MotionPrimitives";

const channelPage=staticFile("images/Long_Channel_Page.png");
const commentAssets=[
  "images/YT_comment_1.png",
  "images/YT_comment_2.png",
  "images/YT_comment_3.png"
];

export const Scene01:React.FC=()=>{
  const frame=useCurrentFrame();
  const pageScale=interpolate(frame,[0,42,78,198],[1.08,1.02,1,1],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const pageY=interpolate(frame,[0,42,78],[55,8,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const highlight=interpolate(frame,[18,58,108,150,198],[0,.9,.52,.72,.45],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const pop=Math.min(1,Math.max(0,(frame-70)/18));
  const commentIndex=Math.min(2,Math.floor(Math.max(0,frame-88)/28));
  const commentOpacity=interpolate(frame,[86,98,170,184],[0,1,1,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});
  const commentY=interpolate(frame,[86,108],[70,0],{extrapolateLeft:"clamp",extrapolateRight:"clamp"});

  return <AbsoluteFill style={{background:"#07070a",fontFamily:"Inter Tight, Inter, Arial",color:"#fff",overflow:"hidden"}}>
    <ParticleMovingBackground variant="darker-wine" count={24}/>
    <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 48%,rgba(0,0,0,0) 35%,rgba(0,0,0,.74) 100%)"}}/>

    <div style={{position:"absolute",left:96,top:68,fontSize:25,letterSpacing:5,fontWeight:700,opacity:.7}}>FIND YOUR NICHE</div>
    <div style={{position:"absolute",right:96,top:70,fontSize:17,letterSpacing:3,opacity:.38}}>01 / THE REAL PROBLEM</div>

    <div style={{
      position:"absolute",left:145,top:142,width:1630,height:820,borderRadius:32,overflow:"hidden",
      background:"#11131a",
      boxShadow:`0 35px 90px rgba(0,0,0,.55),0 0 50px rgba(255,209,102,${highlight*.12})`,
      transform:`translateY(${pageY}px) scale(${pageScale})`,transformOrigin:"50% 50%"
    }}>
      <Img src={channelPage} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
      <div style={{position:"absolute",inset:0,background:"rgba(7,7,10,.5)"}}/>
    </div>

    <div style={{
      position:"absolute",left:390,top:330,width:700,height:430,
      border:"2px solid rgba(255,209,102,.76)",borderRadius:26,opacity:highlight,
      boxShadow:"0 0 35px rgba(255,209,102,.22),inset 0 0 30px rgba(255,209,102,.05)",
      transform:`scale(${1+.025*Math.sin(frame/7)})`
    }}/>

    <div style={{
      position:"absolute",left:1280,top:760,width:430,height:235,
      transform:`translate(${(1-pop)*110}px,${(1-pop)*65}px) scale(${.84+.16*springScale(frame,70,22)})`,
      opacity:pop,transformOrigin:"50% 50%"
    }}>
      <div style={{position:"absolute",inset:-16,borderRadius:28,border:"1px solid rgba(255,209,102,.72)",boxShadow:"0 0 40px rgba(255,209,102,.16)"}}/>
      <Img src={staticFile(commentAssets[commentIndex])} style={{width:"100%",height:"100%",objectFit:"contain",display:"block",filter:"drop-shadow(0 18px 28px rgba(0,0,0,.55))"}}/>
    </div>

    <div style={{position:"absolute",left:1280,top:940,fontSize:22,fontWeight:600,letterSpacing:1,opacity:commentOpacity,transform:`translateY(${commentY}px)`}}>
      <span style={{opacity:.55}}>Every creator starts with </span><span style={{color:"#ffd166"}}>one question.</span>
    </div>

    <Audio src={staticFile("voiceover/find-your-niche-03.wav")} volume={.95}/>
  </AbsoluteFill>;
};