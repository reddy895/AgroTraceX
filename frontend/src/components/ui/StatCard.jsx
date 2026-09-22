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
  accent = 'slate',
  className = '',
  onClick
}) => {
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
      className={`ag-glass rounded-2xl p-4 sm:p-5 min-h-[132px] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.055] hover:border-white/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.03)] group ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-2xs font-semibold text-neutral-400 uppercase tracking-[0.1em] truncate">
            {title}
          </p>
          <div className="mt-2.5 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-none text-white">
              {value}
            </span>
            {trendValue && (
              <span
                className={`inline-flex items-center text-3xs font-mono font-semibold px-2 py-0.5 rounded-full border ${
                  trend === 'positive'
                    ? 'text-white bg-white/10 border-white/20'
                    : trend === 'negative'
                    ? 'text-neutral-300 bg-neutral-800/80 border-neutral-700'
                    : 'text-neutral-400 bg-white/5 border-white/10'
                }`}
              >
                {trend === 'positive' && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
                {trend === 'negative' && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                {trendValue}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-3xs sm:text-2xs text-neutral-400 mt-2 leading-relaxed line-clamp-2">
              {subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-white shrink-0 group-hover:border-white/25 group-hover:bg-white/[0.08] transition-all">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-200" />
          </div>
        )}
      </div>
    </div>
  );
};
