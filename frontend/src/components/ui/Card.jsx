// src/components/ui/Card.jsx
import React from 'react';

export const Card = ({
  children,
  className = '',
  title,
  subtitle,
  action,
  headerClassName = '',
  bodyClassName = '',
  footer,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`ag-glass rounded-2xl transition-all duration-250 ${
        onClick
          ? 'cursor-pointer hover:bg-white/[0.05] hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] hover:-translate-y-0.5'
          : ''
      } ${className}`}
    >
      {(title || subtitle || action) && (
        <div
          className={`px-6 py-5 border-b border-white/[0.08] flex items-center justify-between gap-4 ${headerClassName}`}
        >
          <div>
            {title && (
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className={`p-6 ${bodyClassName}`}>{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-white/[0.02] border-t border-white/[0.08] rounded-b-2xl text-xs text-neutral-400">
          {footer}
        </div>
      )}
    </div>
  );
};
