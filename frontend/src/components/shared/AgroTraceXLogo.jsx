// src/components/shared/AgroTraceXLogo.jsx
import React from 'react';

export const AgroTraceXLogo = ({
  size = 'md', // sm | md | lg
  showTagline = false,
  inverted = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <div className="flex items-center gap-2 font-bold tracking-tight">
        {/* Brand Icon: Seedling emerging with precision geometric node */}
        <div className={`flex items-center justify-center rounded-lg ${inverted ? 'bg-white text-[#0F4A2A]' : 'bg-[#0F4A2A] text-white'} p-1.5 shadow-xs`}>
          <svg
            className={iconSizes[size] || iconSizes.md}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Agronomic leaf and tracking node */}
            <path d="M12 22V12" />
            <path d="M12 12C12 7 16 3 21 3C21 8 17 12 12 12Z" fill="currentColor" fillOpacity="0.25" />
            <path d="M12 16C12 13 9 10 4 10C4 13 7 16 12 16Z" fill="currentColor" fillOpacity="0.25" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          </svg>
        </div>

        {/* Wordmark with leaf integrated in 'X' */}
        <span className={`${sizeClasses[size] || sizeClasses.md} font-extrabold tracking-tight ${inverted ? 'text-white' : 'text-slate-900'} font-sans`}>
          AgroTrace
          <span className="relative inline-block text-emerald-600 ml-0.5">
            X
            {/* Subtle scientific leaf tick atop X */}
            <span className="absolute -top-1 -right-0.5 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          </span>
        </span>
      </div>

      {showTagline && (
        <span className={`text-2xs font-semibold tracking-wider uppercase mt-0.5 ${inverted ? 'text-emerald-300' : 'text-slate-500'}`}>
          Track Every Trial. From Seed to Result.
        </span>
      )}
    </div>
  );
};
