// src/components/ui/StatCard.jsx
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend, // positive | negative | neutral
  trendValue,
  accent = 'green', // green | blue | amber | slate
  className = '',
  onClick
}) => {
  const accentStyles = {
    green: "bg-emerald-50 text-emerald-800 border-emerald-100",
    blue: "bg-blue-50 text-blue-800 border-blue-100",
    amber: "bg-amber-50 text-amber-800 border-amber-100",
    slate: "bg-slate-100 text-slate-700 border-slate-200"
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={(event) => {
        if (onClick && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onClick(event);
        }
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`bg-[#fffdf7] border border-slate-200/90 rounded-[10px] p-4 sm:p-5 min-h-[132px] shadow-xs transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-[#556D3F]/30 ${
        onClick ? 'cursor-pointer hover:border-slate-300' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-2xs font-semibold text-slate-500 uppercase tracking-[0.08em] truncate">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight leading-none text-slate-900">{value}</span>
            {trendValue && (
              <span
                className={`inline-flex items-center text-xs font-medium px-1.5 py-0.5 rounded ${
                  trend === 'positive'
                    ? 'text-emerald-700 bg-emerald-50'
                    : trend === 'negative'
                    ? 'text-red-700 bg-red-50'
                    : 'text-slate-600 bg-slate-100'
                }`}
              >
                {trend === 'positive' && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
                {trend === 'negative' && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                {trendValue}
              </span>
            )}
          </div>
          {subtitle && <p className="text-2xs text-slate-500 mt-2 leading-relaxed line-clamp-2">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg border shrink-0 ${accentStyles[accent] || accentStyles.green}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};
