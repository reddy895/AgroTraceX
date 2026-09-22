// src/components/landing/HeroPlantCanvas.jsx
import React from 'react';

export const HeroPlantCanvas = () => {
  return (
    <div className="relative w-full h-[450px] sm:h-[520px] lg:h-[600px] flex items-center justify-center">
      {/* Subtle Atmospheric Backdrop Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 70%)'
        }}
      />

      {/* Supavoxel 3D Embed */}
      <iframe
        src="https://supavoxel.com/embed/cmucxfa0f05h9hs3cswx7x844"
        width="100%"
        height="100%"
        style={{ border: 'none', background: 'transparent' }}
        allowFullScreen
        title="AgroTraceX 3D Model"
        className="w-full h-full relative z-10 rounded-2xl"
      />
    </div>
  );
};
