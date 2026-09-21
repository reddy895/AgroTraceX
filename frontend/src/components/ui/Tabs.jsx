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
    <div className={`flex items-center gap-1 border-b border-slate-200 overflow-x-auto no-scrollbar ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        if (variant === 'pills') {
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#556D3F] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`ml-2 px-1.5 py-0.2 rounded-full text-2xs ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
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
            className={`relative py-3 px-4 text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              isActive
                ? 'text-[#556D3F] font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-xs ${
                    isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </div>
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#556D3F] rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};
