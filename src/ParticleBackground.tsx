import React from "react";
import { useCurrentFrame } from "remotion";

export type ParticleBackgroundVariant = "black" | "emerald" | "darker-wine";

type ParticleMovingBackgroundProps = {
  variant: ParticleBackgroundVariant;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  count?: number;
  frameOffset?: number;
};

const PRESETS: Record<
  ParticleBackgroundVariant,
  { background: string; particleColor: string; haze: readonly string[] }
> = {
  black: {
    background:
      "radial-gradient(circle at 50% 50%, #2b303c 0%, #0d0f13 40%, #000000 100%)",
    particleColor: "#ffaa00", // Single vibrant warm-gold ember
    haze: ["rgba(255,170,0,0.06)", "rgba(255,212,128,0.04)"],
  },
  emerald: {
    background:
      "radial-gradient(circle at 50% 50%, #38a149 0%, #124d20 38%, #031c15 100%)",
    particleColor: "#ffbf69", // Single vibrant warm-gold ember
    haze: ["rgba(56,161,73,0.18)", "rgba(255,191,105,0.08)"],
  },
  "darker-wine": {
    background:
      "radial-gradient(circle at 50% 50%, #800f2f 0%, #3d0515 42%, #0e0004 100%)",
    particleColor: "#ffd166", // Single vibrant warm-gold ember
    haze: ["rgba(128,15,47,0.22)", "rgba(255,209,102,0.08)"],
  },
};

// Deterministic seed hash function (no random frame flickers)
const hash = (value: number) => {
  const x = Math.sin(value * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
};

const mod = (value: number, divisor: number) =>
  ((value % divisor) + divisor) % divisor;

export const ParticleMovingBackground: React.FC<
  ParticleMovingBackgroundProps
> = ({
  variant,
  left = 0,
  top = 0,
  width = 1920,
  height = 1080,
  count = 35, // Clean, low particle count
  frameOffset = 0,
}) => {
  const frame = useCurrentFrame() + frameOffset;
  const preset = PRESETS[variant];

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        overflow: "hidden",
        background: preset.background,
      }}
    >
      {/* Background Haze Blobs */}
      {preset.haze.map((color, index) => (
        <div
          key={`haze-${index}`}
          style={{
            position: "absolute",
            left: `${30 + index * 30 + Math.sin(frame / (180 + index * 40)) * 5}%`,
            top: `${25 + index * 35 + Math.cos(frame / (200 + index * 30)) * 5}%`,
            width: width * 0.5,
            height: height * 0.5,
            translate: "-50% -50%",
            borderRadius: "50%",
            background: color,
            filter: `blur(${Math.min(width, height) * 0.12}px)`,
          }}
        />
      ))}

      {/* Floating Glowing Embers */}
      {Array.from({ length: count }, (_, index) => {
        const seedA = hash(index + 1);
        const seedB = hash(index + 101);
        const seedC = hash(index + 211);
        const seedD = hash(index + 307);

        const lifetime = 250 + Math.floor(seedD * 200);
        const age = mod(frame + Math.floor(seedB * lifetime), lifetime);
        const life = age / lifetime;
        
        // Very slow floating motion
        const angle = seedC * Math.PI * 2;
        const speed = 0.15 + seedD * 0.35; // Calm, slow speed
        const travel = age * speed;
        const margin = 50;

        const x = mod(seedA * width + Math.cos(angle) * travel + margin, width + margin * 2) - margin;
        const y = mod(seedB * height + Math.sin(angle) * travel + margin, height + margin * 2) - margin;

        // Size variation: mostly small dots with a few larger glowing embers
        const size = seedC > 0.8 ? 5.5 + seedA * 3 : 2.0 + seedA * 2;

        // Smooth fade in & out
        const lifeOpacity = Math.pow(Math.sin(Math.PI * life), 0.8);
        const twinkle = 0.8 + Math.sin(frame / (25 + seedA * 15) + index) * 0.2;
        const color = preset.particleColor;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: "#ffffff", // Crisp white core
              opacity: lifeOpacity * twinkle * (0.6 + seedA * 0.4),
              // Intense multi-layer glowing halo
              boxShadow: `0 0 ${4 + size * 2}px ${color}, 0 0 ${12 + size * 4}px ${color}, 0 0 ${24 + size * 6}px ${color}`,
            }}
          />
        );
      })}
    </div>
  );
};

export const BlackParticleMovingBackground: React.FC<
  Omit<ParticleMovingBackgroundProps, "variant">
> = (props) => <ParticleMovingBackground {...props} variant="black" />;

export const EmeraldParticleMovingBackground: React.FC<
  Omit<ParticleMovingBackgroundProps, "variant">
> = (props) => <ParticleMovingBackground {...props} variant="emerald" />;

export const DarkerWineParticleMovingBackground: React.FC<
  Omit<ParticleMovingBackgroundProps, "variant">
> = (props) => <ParticleMovingBackground {...props} variant="darker-wine" />;