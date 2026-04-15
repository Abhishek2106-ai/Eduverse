import Particles from "@tsparticles/react";

export default function ParticlesBg() {
  return (
    <Particles
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        particles: {
          number: { value: 60 },
          size: { value: 2 },
          move: { speed: 1 },
          opacity: { value: 0.5 },
        },
      }}
    />
  );
}