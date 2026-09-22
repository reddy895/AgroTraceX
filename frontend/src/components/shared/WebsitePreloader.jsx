// src/components/shared/WebsitePreloader.jsx
import React, { useState, useEffect } from 'react';

export const WebsitePreloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING PLATFORM TELEMETRY...');
  const [fadeout, setFadeout] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Progress counter
    const startTime = Date.now();
    const duration = 1800; // 1.8 seconds total intro loading

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100));

      setProgress(nextProgress);

      if (nextProgress < 25) {
        setStatusText('INITIALIZING AGRICULTURAL INTELLIGENCE...');
      } else if (nextProgress < 50) {
        setStatusText('CALIBRATING SUB-METER FIELD GEOFENCES...');
      } else if (nextProgress < 75) {
        setStatusText('SYNCHRONIZING SEED TRACEABILITY LEDGERS...');
      } else if (nextProgress < 99) {
        setStatusText('CONNECTING VERIFIED SCIENTIFIC TELEMETRY...');
      } else {
        setStatusText('PLATFORM VERIFIED • WELCOME');
      }

      if (nextProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setFadeout(true);
          setTimeout(() => {
            setMounted(false);
            if (onComplete) onComplete();
          }, 700); // fade duration
        }, 300);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!mounted) return null;

  // Circumference for r=88 in 200x200 viewBox: 2 * Math.PI * 88 ~= 552.92
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#000000] text-white flex flex-col items-center justify-center select-none transition-all duration-700 ease-out ${
        fadeout ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Radial Glow */}
      <div className="absolute w-[450px] h-[450px] bg-white/[0.04] blur-[100px] rounded-full pointer-events-none" />

      {/* Center Circular Logo & Loading Animation Stage */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Circular Wrapper */}
        <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
          {/* SVG Circular Loading Animations */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 200 200"
          >
            {/* 1. Track Circle (subtle background circular guide) */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="3"
              fill="none"
            />

            {/* 2. Dynamic Animated Circular Progress Loader */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-75 origin-center -rotate-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            />
          </svg>

          {/* Logo Container in Center */}
          <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden bg-black flex items-center justify-center ag-pulse-logo shadow-[0_0_40px_rgba(255,255,255,0.15)]">
            <img
              src="/agrotracex-logo.png"
              alt="AgroTraceX ATX Logo"
              className="w-full h-full object-contain p-1"
            />
          </div>
        </div>

        {/* Brand Text & Telemetry Progress */}
        <div className="mt-8 text-center space-y-2.5 z-10">
          <div className="flex items-center justify-center gap-2">
            <span className="font-extrabold text-lg sm:text-xl font-sans tracking-[0.25em] text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              AgroTrace<span className="font-mono">X</span>
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 font-mono text-3xs tracking-widest text-neutral-400">
            <span>{statusText}</span>
          </div>

          {/* Progress Percentage Display */}
          <div className="pt-1">
            <span className="font-mono text-xs font-bold text-white bg-white/10 px-3 py-1 rounded-full border border-white/20 shadow-[0_0_12px_rgba(255,255,255,0.15)]">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
