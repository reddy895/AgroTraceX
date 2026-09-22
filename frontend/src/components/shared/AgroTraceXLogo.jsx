// src/components/shared/AgroTraceXLogo.jsx
import React, { useState } from 'react';

export const AgroTraceXLogo = ({
  size = 'md', // sm | md | lg
  showTagline = false,
  showTooltip = true,
  className = ''
}) => {
  const [hovered, setHovered] = useState(false);

  const sizeClasses = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-xl sm:text-2xl"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div
      className={`relative inline-flex flex-col ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-2.5 font-bold tracking-tight select-none cursor-pointer group">
        {/* Brand Icon: Crisp White Geometric Frame with Seedling Node */}
        <div className="flex items-center justify-center rounded-xl bg-white text-black p-1.5 shadow-[0_0_15px_rgba(255,255,255,0.25)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] group-hover:scale-105 transition-all duration-200 shrink-0">
          <svg
            className={iconSizes[size] || iconSizes.md}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Agronomic leaf stem and tracking node */}
            <path d="M12 22V12" />
            <path
              d="M12 12C12 7 16 3 21 3C21 8 17 12 12 12Z"
              fill="currentColor"
              fillOpacity="0.25"
            />
            <path
              d="M12 16C12 13 9 10 4 10C4 13 7 16 12 16Z"
              fill="currentColor"
              fillOpacity="0.25"
            />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        </div>

        {/* Wordmark with futuristic X */}
        <span
          className={`${
            sizeClasses[size] || sizeClasses.md
          } font-extrabold tracking-[-0.03em] text-white font-sans flex items-center`}
        >
          AgroTrace
          <span className="relative inline-block text-white ml-0.5 font-mono">
            X
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_6px_#ffffff] animate-pulse" />
          </span>
        </span>
      </div>

      {showTagline && (
        <span className="text-3xs font-mono tracking-widest uppercase mt-0.5 text-neutral-400">
          FIELD TRIALS. REAL IMPACT.
        </span>
      )}

      {/* Elegant Hover Tooltip */}
      {showTooltip && (
        <div
          className={`absolute left-0 top-full mt-2 pointer-events-none z-50 px-2.5 py-1 rounded-lg bg-black/90 text-white text-3xs font-mono uppercase tracking-wider border border-white/20 shadow-2xl backdrop-blur-md transition-all duration-200 ${
            hovered
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 -translate-y-1'
          }`}
        >
          AgroTraceX
        </div>
      )}
    </div>
  );
};
