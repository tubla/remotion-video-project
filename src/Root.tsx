import { Composition } from 'remotion';
import {
  BlackParticleMovingBackground,
  EmeraldParticleMovingBackground,
  DarkerWineParticleMovingBackground,
} from './ParticleMovingBackground';

export const RemotionRoot: React.FC = () => {
  const THREE_MINUTES_IN_FRAMES = 3 * 60 * 30; // 5400 frames

  return (
    <>
      <Composition
        id="BlackParticleBackground"
        component={BlackParticleMovingBackground}
        durationInFrames={THREE_MINUTES_IN_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="EmeraldGreenParticleBackground"
        component={EmeraldParticleMovingBackground}
        durationInFrames={THREE_MINUTES_IN_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="DarkWineParticleBackground"
        component={DarkerWineParticleMovingBackground}
        durationInFrames={THREE_MINUTES_IN_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};