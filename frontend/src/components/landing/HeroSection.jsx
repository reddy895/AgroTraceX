// src/components/landing/HeroSection.jsx
import React, { useState } from 'react';
import { ArrowRight, Play, Sparkles, ShieldCheck } from 'lucide-react';
import { HeroPlantCanvas } from './HeroPlantCanvas';
import { VideoModal } from './VideoModal';

export const HeroSection = ({ onGetStarted }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const stats = [
    { value: '10K+', label: 'Farmers Connected' },
    { value: '500+', label: 'Field Trials' },
    { value: '100+', label: 'Agri Companies' },
    { value: '34.6 Ha', label: 'Verified Trials' }
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-28 pb-12 overflow-hidden">
      {/* Background Radial Glow Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/[0.025] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 z-10 text-left">
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-3xs sm:text-2xs font-mono font-medium tracking-[0.16em] uppercase text-neutral-300 shadow-[0_0_20px_rgba(255,255,255,0.03)]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>TRACE TODAY. A HEALTHIER TOMORROW.</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.035em] text-white leading-[0.95] uppercase">
              FIELD TRIALS.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
                REAL IMPACT.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-xl font-normal leading-relaxed">
              Connecting science, farmers, and a sustainable future through transparent, data-driven agricultural trials.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-200 transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.35)] active:scale-[0.98] cursor-pointer"
              >
                <span>GET STARTED</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/[0.04] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider border border-white/15 hover:border-white/35 hover:bg-white/[0.08] backdrop-blur-md transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current text-white" />
                <span>WATCH VIDEO</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Interactive Plant */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <HeroPlantCanvas />
          </div>
        </div>

        {/* Minimal Statistics Row (Section 8) */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-white/[0.08]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((st, idx) => (
              <div
                key={st.label}
                className={`flex flex-col ${
                  idx > 0 ? 'md:border-l md:border-white/[0.08] md:pl-8' : ''
                }`}
              >
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white font-mono">
                  {st.value}
                </span>
                <span className="text-3xs sm:text-2xs font-mono uppercase tracking-[0.12em] text-neutral-400 mt-1">
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Walkthrough Modal */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
};
