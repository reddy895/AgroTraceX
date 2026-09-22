// src/components/ui/Tabs.jsx
import React from 'react';

export const Tabs = ({
  tabs = [],
  activeTab,
  onChange,
  variant = 'underline', // underline | pills
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-1 border-b border-white/[0.08] overflow-x-auto no-scrollbar ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        if (variant === 'pills') {
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.15)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`ml-2 px-1.5 py-0.5 rounded-full text-3xs font-mono ${
                    isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-neutral-300'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative py-3 px-4 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              isActive
                ? 'text-white font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-3xs font-mono ${
                    isActive ? 'bg-white/15 text-white border border-white/20' : 'bg-white/5 text-neutral-400'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </div>
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)] rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};
