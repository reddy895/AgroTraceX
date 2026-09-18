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
      className={`bg-white border border-slate-200/90 rounded-xl p-5 shadow-xs transition-all hover:shadow-sm ${
        onClick ? 'cursor-pointer hover:border-slate-300' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">{value}</span>
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
          {subtitle && <p className="text-xs text-slate-500 mt-1 truncate">{subtitle}</p>}
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
