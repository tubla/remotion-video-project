import {Composition} from "remotion";
import {BlackParticleMovingBackground,EmeraldParticleMovingBackground,DarkerWineParticleMovingBackground} from "./commonComponentLibs/ParticleBackground";
import {Scene01} from "./videos/2026/01_Find_Your_Niche/Scene01";

export const RemotionRoot:React.FC=()=> <>
  <Composition id="BlackParticleBackground" component={BlackParticleMovingBackground} durationInFrames={5400} fps={30} width={1920} height={1080}/>
  <Composition id="EmeraldGreenParticleBackground" component={EmeraldParticleMovingBackground} durationInFrames={5400} fps={30} width={1920} height={1080}/>
  <Composition id="DarkWineParticleBackground" component={DarkerWineParticleMovingBackground} durationInFrames={5400} fps={30} width={1920} height={1080}/>
  <Composition id="FindYourNiche-Scene01" component={Scene01} durationInFrames={199} fps={30} width={1920} height={1080}/>
</>;