// src/components/ui/EmptyState.jsx
import React from 'react';
import { Sparkles } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Sparkles,
  title = "No items found",
  description = "Get started by creating your first entry to track field operations.",
  action,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
        <Icon className="w-5 h-5 text-neutral-300" />
      </div>
      <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
      <p className="mt-1.5 text-xs text-neutral-400 max-w-sm leading-relaxed">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};
